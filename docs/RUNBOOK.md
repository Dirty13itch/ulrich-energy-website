# Ulrich Energy Auditing Website - Operations Runbook

## Quick Reference

| Item | Value |
|------|-------|
| **Live URL** | http://192.168.1.203:8088 |
| **Server** | 192.168.1.203 (Unraid) |
| **Container** | ulrich-energy-website |
| **Deploy Path** | /mnt/docker/ulrich-energy-website |
| **Last Updated** | March 2025 |

---

## Emergency Procedures

### 🚨 Website is Down

```bash
# 1. Check if container is running
ssh root@192.168.1.203 "docker ps | grep ulrich-energy-website"

# 2. If not running, start it
ssh root@192.168.1.203 "docker start ulrich-energy-website"

# 3. If it keeps failing, check logs
ssh root@192.168.1.203 "docker logs ulrich-energy-website --tail 50"

# 4. Check nginx config
ssh root@192.168.1.203 "docker exec ulrich-energy-website nginx -t"
```

### 🚨 403 Forbidden Error

```bash
# Fix permissions
ssh root@192.168.1.203 "chmod -R 755 /mnt/docker/ulrich-energy-website/"
ssh root@192.168.1.203 "docker restart ulrich-energy-website"
```

### 🚨 Rollback to Previous Version

```bash
# Local deployment with rollback
cd "Ulrich Energy Auditing Website"
./scripts/deploy.sh rollback

# Or manual rollback
BACKUP=$(ssh root@192.168.1.203 "ls -t /mnt/docker/ulrich-energy-website.backup.* | head -1")
ssh root@192.168.1.203 "cp -r $BACKUP/* /mnt/docker/ulrich-energy-website/ && docker restart ulrich-energy-website"
```

---

## Routine Operations

### Deploy New Version

```bash
cd "Ulrich Energy Auditing Website"
./scripts/deploy.sh
```

Output will show:
- Build progress
- Deployment status
- Health check results
- Cleanup confirmation

### Update Content (Stats, Contact, etc.)

```bash
cd "Ulrich Energy Auditing Website"

# Update statistics
./scripts/content-update.sh update-stats

# Update contact info
./scripts/content-update.sh update-contact

# Verify changes
./scripts/content-update.sh verify

# Deploy
./scripts/content-update.sh deploy
```

### Check Website Health

```bash
# Run health check
./scripts/health-check.sh

# Or check logs on server
ssh root@192.168.1.203 "tail -20 /var/log/uea-health.log"

# Or check manually
curl -s -o /dev/null -w "%{http_code}\n" http://192.168.1.203:8088/
```

---

## Monitoring & Logs

### View Logs

```bash
# Health check logs (on Unraid)
ssh root@192.168.1.203 "tail -f /var/log/uea-health.log"

# Container logs
ssh root@192.168.1.203 "docker logs ulrich-energy-website -f"

# Nginx access log
ssh root@192.168.1.203 "docker exec ulrich-energy-website tail -f /var/log/nginx/access.log"

# Nginx error log
ssh root@192.168.1.203 "docker exec ulrich-energy-website tail -f /var/log/nginx/error.log"
```

### Health Check Results

Results are logged with format:
```
[YYYY-MM-DD HH:MM:SS] [STATUS] Message
```

Statuses:
- ✅ INFO: Normal operation
- ⚠️ WARNING: Non-critical issue
- ❌ ERROR: Requires attention

---

## Maintenance Windows

### Weekly (Every Monday)

```bash
# Check for dependency updates
# (Automated via GitHub Actions)

# Review health check logs
ssh root@192.168.1.203 "tail -50 /var/log/uea-health.log"

# Check disk space
ssh root@192.168.1.203 "df -h | grep -E '(Filesystem|docker)'"
```

### Monthly

1. **Lighthouse Performance Audit**
   ```bash
   cd web
   npx lighthouse http://192.168.1.203:8088/ --output html --output-path report.html
   ```

2. **Log Rotation**
   ```bash
   ssh root@192.168.1.203 "echo '' > /var/log/uea-health.log"
   ```

3. **Backup Cleanup**
   ```bash
   # Keep last 10 backups
   ssh root@192.168.1.203 "ls -t /mnt/docker/ulrich-energy-website.backup.* | tail -n +11 | xargs rm -rf"
   ```

### Quarterly

1. **Full Security Review**
   - Review all dependencies
   - Run `npm audit`
   - Update base Docker image

2. **Content Audit**
   - Update statistics if needed
   - Review service offerings
   - Check for broken links

3. **Disaster Recovery Test**
   - Test backup restoration
   - Verify rollback procedure
   - Document any issues

---

## Server Configuration

### Docker Container Details

```yaml
# docker-compose.yml equivalent
version: '3.8'
services:
  ulrich-energy-website:
    image: nginx:alpine
    ports:
      - "8088:80"
    volumes:
      - /mnt/docker/ulrich-energy-website:/usr/share/nginx/html:ro
      - /path/to/nginx.conf:/etc/nginx/nginx.conf:ro
    restart: unless-stopped
```

### Nginx Configuration

Key settings in `nginx.conf`:
```nginx
# Clean URLs (critical!)
try_files $uri $uri.html $uri/ =404;

# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## Troubleshooting Guide

### Build Failures

| Symptom | Cause | Solution |
|---------|-------|----------|
| TypeScript errors | Type mismatch | Run `npx tsc --noEmit` |
| Module not found | Missing dependency | Run `npm ci` |
| Lint errors | Code style | Run `npx eslint --fix` |

### Deployment Failures

| Symptom | Cause | Solution |
|---------|-------|----------|
| SSH fails | Network/auth | Check SSH key, server status |
| Rsync fails | Permissions | Check remote directory permissions |
| 403 error | File permissions | Run `chmod 755` on remote dir |
| 404 on pages | Nginx config | Verify `try_files` directive |

### Performance Issues

| Symptom | Cause | Solution |
|---------|-------|----------|
| Slow load | Large assets | Optimize images, enable gzip |
| High memory | Memory leak | Restart container |
| 5xx errors | Nginx issue | Check error logs |

---

## Security Checklist

### Daily
- [ ] Review health check logs for anomalies

### Weekly
- [ ] Check for failed login attempts
- [ ] Review Docker container status

### Monthly
- [ ] Run `npm audit`
- [ ] Check for outdated dependencies
- [ ] Review server access logs

### Quarterly
- [ ] Rotate SSH keys if needed
- [ ] Review firewall rules
- [ ] Update Docker base image

---

## Contact Information

| Role | Contact |
|------|---------|
| **Primary Technical** | Shaun Ulrich - (952) 240-4369 |
| **Server Access** | root@192.168.1.203 |
| **Emergency** | Shaun Ulrich |

---

## Reference Links

- **Website**: http://192.168.1.203:8088
- **GitHub Repository**: [URL to be added]
- **Lighthouse CI**: [URL to be added]
- **Uptime Monitoring**: Check `/var/log/uea-health.log`

---

## Change Log

| Date | Change | By |
|------|--------|-----|
| 2025-03-10 | Initial deployment | Development Team |
| 2025-03-10 | Fixed 403 permissions | Development Team |
| 2025-03-10 | Fixed clean URLs with nginx | Development Team |
| 2025-03-10 | Added monitoring scripts | Development Team |

---

*Last Updated: March 10, 2025*
*Next Review: June 10, 2025*
