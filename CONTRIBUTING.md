# Contributing to Ulrich Energy Auditing Website

## Development Workflow

### Setting Up Local Development

```bash
# Clone repository
git clone <repository-url>
cd "Ulrich Energy Auditing Website/ulrich-energy-auditing"

# Install dependencies
npm ci

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Emergency fixes

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Tests
- `chore`: Maintenance

Examples:
```
feat(nav): add mobile menu animation
fix(contact): correct phone number formatting
docs(readme): update deployment instructions
```

### Pull Request Process

1. Create feature branch: `git checkout -b feature/description`
2. Make changes following code style
3. Run tests: `npm run type-check && npm run lint`
4. Build locally: `npm run build`
5. Push branch and create PR to `develop`
6. Wait for CI checks to pass
7. Request review
8. Merge after approval

### Code Style

- TypeScript strict mode
- ESLint rules enforced
- Prettier for formatting
- Component-based architecture

### Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build verification
npm run build

# Lighthouse CI
npm run lighthouse
```

## Content Updates

For content changes (stats, contact info), use:

```bash
./scripts/content-update.sh update-stats
./scripts/content-update.sh update-contact
```

## Questions?

Contact: Shaun Ulrich - Shaun.Ulrich@UlrichEnergyAuditing.com
