# Ulrich Energy Auditing Website - Makefile
# Quick commands for common operations

.PHONY: help install dev build test deploy clean backup monitor

# Default target
help:
	@echo "Ulrich Energy Auditing Website - Available Commands"
	@echo ""
	@echo "Development:"
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Start development server"
	@echo "  make build      - Build for production"
	@echo "  make clean      - Clean build artifacts"
	@echo ""
	@echo "Testing:"
	@echo "  make test       - Run unit tests"
	@echo "  make test:e2e   - Run E2E tests"
	@echo "  make test:all   - Run all tests"
	@echo "  make lint       - Run linter"
	@echo "  make typecheck  - Run TypeScript checks"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy     - Deploy to production"
	@echo "  make backup     - Create backup"
	@echo "  make rollback   - Rollback to previous version"
	@echo ""
	@echo "Monitoring:"
	@echo "  make monitor    - Setup monitoring"
	@echo "  make health     - Check health status"
	@echo "  make logs       - View logs"
	@echo ""
	@echo "Utilities:"
	@echo "  make ssl-setup  - Setup SSL certificates"
	@echo "  make update     - Update dependencies"

# Development
install:
	cd ulrich-energy-auditing && npm ci

dev:
	cd ulrich-energy-auditing && npm run dev

build:
	cd ulrich-energy-auditing && npm run build

clean:
	cd ulrich-energy-auditing && npm run clean

# Testing
test:
	cd ulrich-energy-auditing && npm test

test:e2e:
	cd ulrich-energy-auditing && npm run test:e2e

test:all: test lint typecheck
	@echo "✅ All tests passed!"

lint:
	cd ulrich-energy-auditing && npm run lint

typecheck:
	cd ulrich-energy-auditing && npm run type-check

# Deployment
deploy:
	./scripts/deploy.sh

backup:
	./scripts/backup.sh

rollback:
	./scripts/deploy.sh rollback

# Monitoring
monitor:
	./scripts/setup-monitoring.sh

health:
	./scripts/health-check.sh

logs:
	ssh root@192.168.1.203 "docker logs ulrich-energy-website -f"

# Utilities
ssl-setup:
	@echo "Usage: make ssl-setup DOMAIN=yourdomain.com"
	@if [ -z "$(DOMAIN)" ]; then \
		echo "❌ Please provide DOMAIN=yourdomain.com"; \
		exit 1; \
	fi
	./scripts/ssl-setup.sh $(DOMAIN)

update:
	cd ulrich-energy-auditing && npm update

# Content updates
update-stats:
	./scripts/content-update.sh update-stats

update-contact:
	./scripts/content-update.sh update-contact

# Lighthouse
lighthouse:
	cd ulrich-energy-auditing && npm run lighthouse:local
