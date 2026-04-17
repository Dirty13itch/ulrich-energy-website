# Troubleshooting Guide

## Quick Diagnostic Commands

```bash
# Check if website is up
curl -I http://192.168.1.203:8088/

# Check container status
ssh root@192.168.1.203 "docker ps | grep ulrich-energy"

# View recent logs
ssh root@192.168.1.203 "docker logs ulrich-energy-website --tail 50"

# Check disk space
ssh root@192.168.1.203 "df -h"

# Test health endpoint
curl http://192.168.1.203:8088/health
```

## Common Issues

### 1. Website Returns 403 Forbidden

**Symptoms:**
- Browser shows "403 Forbidden"
- nginx error logs show permission denied

**Causes:**
- Incorrect file permissions on server
- nginx user cannot read files

**Solution:**
```bash
ssh root@192.168.1.203 "chmod -R 755 /mnt/docker/ulrich-energy-website/"
ssh root@192.168.1.203 "docker restart ulrich-energy-website"
```

**Prevention:**
- Deploy script includes `chmod 755` automatically

---

### 2. 404 on All Pages

**Symptoms:**
- Home page works, but /about, /services return 404

**Causes:**
- Missing `try_files` directive in nginx.conf
- Next.js exports `about.html` but links use `/about`

**Solution:**
```bash
# Verify nginx.conf has this line:
# try_files $uri $uri.html $uri/ =404;

# If not, fix and restart:
ssh root@192.168.1.203 "docker restart ulrich-energy-website"
```

---

### 3. Container Won't Start

**Symptoms:**
- `docker ps` doesn't show container
- `docker logs` shows errors

**Causes:**
- nginx configuration error
- Port conflict
- Missing files

**Solution:**
```bash
# Check nginx config syntax
ssh root@192.168.1.203 "docker run --rm -v /mnt/docker/ulrich-energy-website/nginx.conf:/etc/nginx/nginx.conf:ro nginx:alpine nginx -t"

# Check for port conflicts
ssh root@192.168.1.203 "netstat -tlnp | grep 8088"

# View container logs
ssh root@192.168.1.203 "docker logs ulrich-energy-website"

# Manual restart
ssh root@192.168.1.203 "docker stop ulrich-energy-website; docker rm ulrich-energy-website"
ssh root@192.168.1.203 "docker run -d --name ulrich-energy-website -p 8088:80 -v /mnt/docker/ulrich-energy-website:/usr/share/nginx/html:ro -v /mnt/docker/ulrich-energy-website/nginx.conf:/etc/nginx/nginx.conf:ro --restart unless-stopped nginx:alpine"
```

---

### 4. Slow Page Load Times

**Symptoms:**
- Pages take >3 seconds to load
- High TTFB (Time to First Byte)

**Causes:**
- Large images not optimized
- Missing gzip compression
- Network issues

**Solution:**
```bash
# Check if gzip is enabled
curl -H "Accept-Encoding: gzip" -I http://192.168.1.203:8088/

# Verify Content-Encoding: gzip header

# Check image sizes
ssh root@192.168.1.203 "find /mnt/docker/ulrich-energy-website -name '*.jpg' -o -name '*.png' | xargs ls -lh"

# Restart to clear any issues
ssh root@192.168.1.203 "docker restart ulrich-energy-website"
```

**Prevention:**
- Optimize images before deployment
- Use WebP format when possible
- Enable gzip compression

---

### 5. Build Failures

**Symptoms:**
- `npm run build` fails
- TypeScript errors
- Out of memory errors

**Causes:**
- Type errors in code
- Missing dependencies
- Insufficient memory

**Solution:**
```bash
# Clean and reinstall
cd web
rm -rf node_modules .next dist
npm ci

# Run type check separately
npm run type-check

# Run build with more memory
node --max-old-space-size=4096 ./node_modules/.bin/next build

# Check for lint errors
npm run lint
```

---

### 6. SSH/Deployment Failures

**Symptoms:**
- Deploy script fails with connection errors
- Permission denied errors

**Causes:**
- SSH key not configured
- Wrong IP address
- Server down

**Solution:**
```bash
# Test SSH connection
ssh root@192.168.1.203 "echo 'Connected'"

# Check SSH key
ls -la ~/.ssh/

# Verify IP is correct
ping 192.168.1.203

# Check if SSH service is running
ssh root@192.168.1.203 "systemctl status sshd"
```

---

### 7. Health Check Failures

**Symptoms:**
- Monitoring shows website down
- Health check script reports errors

**Causes:**
- Website actually down
- Network issues between monitor and server
- Health check misconfiguration

**Solution:**
```bash
# Check if it's actually down
./scripts/health-check.sh

# Check from server itself
ssh root@192.168.1.203 "curl -s -o /dev/null -w '%{http_code}' http://localhost:8088/"

# View health check logs
ssh root@192.168.1.203 "tail -20 /var/log/uea-health.log"

# Restart health monitoring
ssh root@192.168.1.203 "crontab -l | grep health-check"
```

---

## Performance Diagnostics

### Lighthouse Audit
```bash
cd web
npx lighthouse http://192.168.1.203:8088/ --output html --output-path report.html
```

### Check Core Web Vitals
```bash
# Using curl for TTFB
curl -o /dev/null -s -w 'TTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n' http://192.168.1.203:8088/

# Using Chrome DevTools
# Open DevTools → Performance tab → Record → Analyze
```

### Check Resource Sizes
```bash
# Get all resource sizes
curl -s http://192.168.1.203:8088/ | grep -o 'href="[^"]*"\|src="[^"]*"' | sed 's/href=//;s/src=//;s/"//g'
```

## Emergency Procedures

### Complete Website Outage

1. **Verify the problem:**
   ```bash
   curl -I http://192.168.1.203:8088/
   ```

2. **Check server connectivity:**
   ```bash
   ping 192.168.1.203
   ssh root@192.168.1.203 "uptime"
   ```

3. **Check container status:**
   ```bash
   ssh root@192.168.1.203 "docker ps -a | grep ulrich"
   ```

4. **View logs:**
   ```bash
   ssh root@192.168.1.203 "docker logs ulrich-energy-website --tail 100"
   ```

5. **Restart container:**
   ```bash
   ssh root@192.168.1.203 "docker restart ulrich-energy-website"
   ```

6. **If still down, rollback:**
   ```bash
   ./scripts/deploy.sh rollback
   ```

7. **Contact:**
   - Shaun Ulrich: (952) 240-4369

### SSL Certificate Issues

1. **Check certificate expiry:**
   ```bash
   echo | openssl s_client -servername ulrichenergyauditing.com -connect 192.168.1.203:443 2>/dev/null | openssl x509 -noout -dates
   ```

2. **Renew certificate:**
   ```bash
   ssh root@192.168.1.203 "certbot renew"
   ```

3. **Force renewal:**
   ```bash
   ssh root@192.168.1.203 "certbot renew --force-renewal"
   ```

## Log Locations

| Log | Location | Access |
|-----|----------|--------|
| Health checks | `/var/log/uea-health.log` | `ssh root@192.168.1.203` |
| Nginx access | Inside container | `docker logs ulrich-energy-website` |
| Nginx error | Inside container | `docker exec ulrich-energy-website cat /var/log/nginx/error.log` |
| Deployment | Local terminal | Run deploy script |
| CI/CD | GitHub Actions | GitHub web interface |

## Getting Help

1. **Check this guide first**
2. **Review logs** - Most issues are obvious from logs
3. **Check GitHub Issues** - Known problems may be documented
4. **Contact support:**
   - Technical: Shaun Ulrich
   - Phone: (952) 240-4369
   - Email: Shaun.Ulrich@UlrichEnergyAuditing.com

---

*Last Updated: March 11, 2025*
