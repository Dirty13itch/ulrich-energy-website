# Architecture Documentation

## System Overview

The Ulrich Energy Auditing website is a modern, static website built with Next.js and deployed via Docker/nginx on an Unraid server.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT                                  │
│                    (Browser/Mobile)                              │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        │ HTTP/HTTPS
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                       UNRAID SERVER                              │
│                     (192.168.1.203)                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Docker Container: ulrich-energy-website                │    │
│  │  ┌─────────────────────────────────────────────────┐    │    │
│  │  │  nginx:alpine                                  │    │    │
│  │  │  ┌─────────────┐  ┌─────────────────────────┐  │    │    │
│  │  │  │  nginx.conf │──│  Static Files (dist/)   │  │    │    │
│  │  │  └─────────────┘  └─────────────────────────┘  │    │    │
│  │  └─────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│  ┌───────────────────────────┴─────────────────────────────┐    │
│  │  Monitoring & Health Checks                              │    │
│  │  • Cron job every 5 minutes                              │    │
│  │  • Log: /var/log/uea-health.log                         │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 16.1.6 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | shadcn/ui | Latest |
| Icons | Lucide React | 0.479.0 |
| Build Output | Static Export | - |

### Backend/Infrastructure
| Component | Technology | Purpose |
|-----------|------------|---------|
| Web Server | nginx | Static file serving |
| Container | Docker | Application isolation |
| OS | Alpine Linux | Lightweight base |
| Hosting | Unraid | Local server |

### Development Tools
| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| Jest | Unit testing |
| Playwright | E2E testing |
| Lighthouse CI | Performance monitoring |

## Directory Structure

```
Ulrich Energy Auditing Website/
├── web/      # Next.js application
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── about/page.tsx   # About page
│   │   │   ├── services/page.tsx # Services page
│   │   │   └── contact/page.tsx # Contact page
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   └── lib/
│   │       └── utils.ts
│   ├── public/                  # Static assets
│   ├── __tests__/               # Unit tests
│   ├── e2e/                     # E2E tests
│   └── dist/                    # Build output
├── scripts/                     # Automation scripts
├── monitoring/                  # Monitoring configs
├── .github/workflows/           # CI/CD pipelines
├── docs/                        # Documentation
└── nginx.conf                   # Web server config
```

## Data Flow

### Build Process
```
Source Files (TSX/TS/CSS)
         │
         ▼
   Next.js Build
   (Static Export)
         │
         ▼
   dist/ directory
   (HTML/CSS/JS/Assets)
         │
         ▼
   Docker/nginx
         │
         ▼
   Client Browser
```

### Deployment Process
```
Local Changes
      │
      ▼
  Git Commit
      │
      ▼
  GitHub Actions
  ├─ Lint
  ├─ Type Check
  ├─ Build
  ├─ Test
  └─ Lighthouse
      │
      ▼
  Deploy to Unraid
  ├─ Backup current
  ├─ rsync files
  ├─ Restart container
  └─ Health check
      │
      ▼
  Live Website
```

## Security Architecture

### Implemented Security Measures

1. **Container Security**
   - Read-only root filesystem where possible
   - Non-root user for nginx
   - Minimal base image (Alpine)

2. **Web Security**
   - HTTPS-ready configuration
   - Security headers (CSP, HSTS, X-Frame-Options)
   - Hidden file protection
   - Gzip/Brotli compression

3. **Access Control**
   - SSH key-based deployment
   - No password authentication
   - Container restart limits

4. **Monitoring**
   - Health checks every 5 minutes
   - Log aggregation
   - Automated alerting

## Performance Strategy

### Static Generation
- All pages pre-rendered at build time
- No server-side computation on requests
- Instant page loads

### Caching Strategy
| Resource Type | Cache Duration |
|---------------|----------------|
| HTML | 1 hour |
| CSS/JS | 1 year (immutable) |
| Images | 1 year (immutable) |
| Fonts | 1 year (immutable) |

### Optimization Techniques
- Gzip compression (level 6)
- Brotli compression (when available)
- Lazy loading for images
- Code splitting
- Tree shaking

## Scalability Considerations

### Current Architecture
- Single server (Unraid)
- Static file serving
- No database dependencies
- Stateless design

### Future Scalability Options
1. **CDN Integration**: CloudFlare, AWS CloudFront
2. **Load Balancing**: Multiple nginx instances
3. **Edge Deployment**: Vercel Edge Network

## Backup Strategy

### Automated Backups
- Before each deployment
- Daily compressed archives
- 30-day retention

### Recovery Time Objectives
- RTO: 5 minutes (rollback)
- RPO: Last deployment

## Monitoring & Observability

### Metrics Collected
- HTTP response times
- Error rates
- Container status
- Disk usage
- Lighthouse scores

### Alerting Channels
- Health check logs
- GitHub Actions notifications
- Optional: Slack integration

## Development Workflow

### Local Development
```
npm run dev → Turbopack dev server → localhost:3000
```

### Testing Strategy
| Test Type | Tool | Coverage |
|-----------|------|----------|
| Unit | Jest | Components, Utils |
| Integration | Jest | Component interactions |
| E2E | Playwright | Full user flows |
| Visual | Lighthouse | Performance, Accessibility |

### CI/CD Pipeline
See `.github/workflows/ci-cd.yml` for complete pipeline definition.

## Maintenance Windows

- **Deployments**: Any time (zero downtime)
- **Major updates**: Scheduled during low traffic
- **Monitoring**: 24/7 automated

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-03-10 | Static export vs SSR | Better performance, no server maintenance |
| 2025-03-10 | Docker/nginx vs Vercel | Cost control, local hosting preference |
| 2025-03-10 | Unraid vs Cloud VPS | Existing infrastructure |
| 2025-03-10 | GitHub Actions vs Jenkins | Native integration, no maintenance |

---

*Last Updated: March 11, 2025*
