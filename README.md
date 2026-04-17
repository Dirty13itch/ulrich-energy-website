# Ulrich Energy Auditing Website

## 🌐 Professional Website for Twin Cities HERS Rating Services

**Live Site:** http://192.168.1.203:8088/

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | Custom + shadcn/ui |
| **Icons** | Lucide React |
| **Fonts** | Geist Sans/Mono |
| **Hosting** | Docker (nginx:alpine) on Unraid |

### Project Structure

```
Ulrich Energy Auditing Website/
├── web/          # Next.js application
│   ├── src/
│   │   ├── app/                     # Pages (Next.js App Router)
│   │   │   ├── page.tsx             # Homepage
│   │   │   ├── about/page.tsx       # About page
│   │   │   ├── services/page.tsx    # Services page
│   │   │   ├── contact/page.tsx     # Contact page
│   │   │   ├── layout.tsx           # Root layout
│   │   │   └── globals.css          # Global styles
│   │   ├── components/
│   │   │   ├── ui/                  # Reusable UI components
│   │   │   ├── navbar.tsx           # Navigation
│   │   │   └── footer.tsx           # Footer
│   │   └── lib/
│   │       └── utils.ts             # Utility functions
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
├── scripts/                         # Automation scripts
│   ├── deploy.sh                    # Deployment script
│   ├── health-check.sh              # Monitoring
│   └── content-update.sh            # Content management
├── .github/workflows/               # CI/CD pipelines
│   ├── ci-cd.yml                    # Main CI/CD
│   └── dependency-update.yml        # Automated updates
├── docs/
│   └── RUNBOOK.md                   # Operations guide
├── nginx.conf                       # Web server config
└── README.md                        # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- SSH access to 192.168.1.203 (Unraid server)

### Local Development

```bash
# Navigate to project
cd "Ulrich Energy Auditing Website/web"

# Install dependencies
npm ci

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build

# Output in dist/ directory
```

---

## 📦 Deployment

### Automated Deployment (Recommended)

```bash
# From project root
cd "Ulrich Energy Auditing Website"
./scripts/deploy.sh
```

This script will:
1. ✅ Run TypeScript checks
2. ✅ Build the application
3. ✅ Create backup of current deployment
4. ✅ Deploy to Unraid server
5. ✅ Run smoke tests
6. ✅ Clean up old backups

### Manual Deployment

```bash
# Build
cd web
npm ci
npm run build

# Deploy
scp -r dist/* root@192.168.1.203:/mnt/docker/ulrich-energy-website/
ssh root@192.168.1.203 "docker restart ulrich-energy-website"
```

### Rollback

```bash
# Using deploy script
./scripts/deploy.sh rollback

# Or manually
ssh root@192.168.1.203
cp -r /mnt/docker/ulrich-energy-website.backup.YYYYMMDD_HHMMSS/* \
      /mnt/docker/ulrich-energy-website/
docker restart ulrich-energy-website
```

---

## 🔄 Continuous Improvement

### CI/CD Pipeline

The project includes GitHub Actions workflows:

1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
   - Runs on every push to main/develop
   - Performs linting, type checking, building
   - Security scans with npm audit
   - Automated deployment on main branch
   - Performance budget checks with Lighthouse

2. **Dependency Updates** (`.github/workflows/dependency-update.yml`)
   - Runs weekly
   - Automatically checks for outdated packages
   - Creates PRs for updates
   - Security vulnerability scanning

### Monitoring

**Health Check Script:**
```bash
# Run manually
./scripts/health-check.sh

# Or set up cron (on Unraid server)
*/5 * * * * /mnt/docker/ulrich-energy-auditing/scripts/health-check.sh
```

Monitors:
- HTTP response codes
- Response times
- Container status
- Disk space
- Weekly Lighthouse scores

### Content Updates

Use the helper script for content changes:

```bash
# Update statistics
./scripts/content-update.sh update-stats

# Update contact information
./scripts/content-update.sh update-contact

# Verify changes before deploying
./scripts/content-update.sh verify

# Deploy changes
./scripts/content-update.sh deploy
```

---

## 🧪 Testing & Quality

### Code Quality

```bash
# TypeScript type checking
npx tsc --noEmit

# ESLint
npx eslint src --ext .ts,.tsx

# Formatting
npx prettier --check "src/**/*.{ts,tsx,css}"

# Fix formatting
npx prettier --write "src/**/*.{ts,tsx,css}"
```

### Performance Budget

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| First Contentful Paint | < 1.8s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |

---

## 📊 Monitoring & Alerts

### Log Locations

| Log | Location |
|-----|----------|
| Health Checks | `/var/log/uea-health.log` (on Unraid) |
| Container Logs | `docker logs ulrich-energy-website` |
| Nginx Access | Inside container: `/var/log/nginx/access.log` |
| Nginx Errors | Inside container: `/var/log/nginx/error.log` |

### Viewing Logs

```bash
# Health check logs (on Unraid)
tail -f /var/log/uea-health.log

# Container logs
docker logs ulrich-energy-website -f

# Nginx error log
docker exec ulrich-energy-website tail -f /var/log/nginx/error.log
```

---

## 🔧 Maintenance

### Weekly Tasks

- [ ] Review health check logs
- [ ] Check for failed deployments
- [ ] Verify backups exist
- [ ] Monitor performance metrics

### Monthly Tasks

- [ ] Run full Lighthouse audit
- [ ] Rotate logs if needed
- [ ] Review security scan results
- [ ] Update content if needed

### Quarterly Tasks

- [ ] Major dependency review
- [ ] Content audit
- [ ] SEO review
- [ ] Disaster recovery test

---

## 🆘 Troubleshooting

### Common Issues

**403 Forbidden:**
```bash
ssh root@192.168.1.203
chmod -R 755 /mnt/docker/ulrich-energy-website/
docker restart ulrich-energy-website
```

**404 on pages:**
- Ensure `nginx.conf` has `try_files $uri $uri.html $uri/ =404;`

**Container won't start:**
```bash
docker logs ulrich-energy-website
docker restart ulrich-energy-website
```

See [docs/RUNBOOK.md](docs/RUNBOOK.md) for complete troubleshooting guide.

---

## 📝 Content Guidelines

### Writing for Builders

- **Tone:** Professional, confident, builder-focused
- **Focus:** Benefits (time saved, money earned) not just features
- **CTAs:** Clear, action-oriented ("Discuss Your Community")
- **Evidence:** Stats, certifications, partnerships

### SEO Keywords

- Primary: "HERS rater Twin Cities"
- Secondary: "45L tax credit Minnesota", "ENERGY STAR certification"
- Long-tail: "blower door testing Minneapolis"

---

## 🤝 Contributing

### Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Run tests: `npm run test`
4. Build: `npm run build`
5. Create PR to `develop` branch
6. After review, merge to `main` for auto-deployment

### Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `chore:` Maintenance

---

## 📄 License

Copyright © 2024 Ulrich Energy Auditing. All rights reserved.

---

## 📞 Support

- **Technical Issues:** Check [docs/RUNBOOK.md](docs/RUNBOOK.md)
- **Website Down:** Call Shaun (952) 240-4369
- **Content Updates:** Use `./scripts/content-update.sh`

---

*Built with ❤️ for Twin Cities builders*
