# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by emailing:

**Shaun Ulrich** - Shaun.Ulrich@UlrichEnergyAuditing.com

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Measures

### Implemented

- ✅ HTTPS-ready nginx configuration
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Gzip/Brotli compression
- ✅ Hidden file access denied
- ✅ Container health checks
- ✅ Automated dependency scanning
- ✅ Secret scanning with gitleaks

### Best Practices

1. **Dependencies**: Updated weekly via automated workflow
2. **Secrets**: Never commit to repository
3. **Access**: SSH key-based deployment only
4. **Monitoring**: Health checks every 5 minutes
5. **Backups**: Automatic before every deployment

## Security Checklist

### Daily
- [ ] Review health check logs for anomalies
- [ ] Monitor for unusual traffic patterns

### Weekly
- [ ] Review dependency update reports
- [ ] Check for security advisories

### Monthly
- [ ] Run full security audit
- [ ] Review access logs
- [ ] Rotate SSH keys if needed

### Quarterly
- [ ] Penetration testing
- [ ] Full security review
- [ ] Update security documentation
