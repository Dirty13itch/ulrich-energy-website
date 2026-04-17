#!/bin/bash
#
# Production Deployment Script for Ulrich Energy Auditing Website
# Usage: ./scripts/deploy.sh [environment]
# Environment: production (default) | staging
#

set -euo pipefail

# Configuration
DEPLOY_HOST="192.168.1.203"
DEPLOY_USER="root"
DEPLOY_PATH="/mnt/docker/ulrich-energy-website"
CONTAINER_NAME="ulrich-energy-website"
PROJECT_DIR="$(dirname "$(dirname "$(realpath "$0")")")"
ENVIRONMENT="${1:-production}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] INFO:${NC} $1"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARN:${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
    exit 1
}

# Pre-deployment checks
pre_deploy_checks() {
    log "Running pre-deployment checks..."
    
    # Check if we're in the right directory
    if [ ! -f "$PROJECT_DIR/web/package.json" ]; then
        error "package.json not found. Are you in the right directory?"
    fi
    
    # Check Node.js version
    node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$node_version" -lt 18 ]; then
        error "Node.js version 18+ required. Found: $(node --version)"
    fi
    
    # Check if server is reachable
    if ! ping -c 1 "$DEPLOY_HOST" &> /dev/null; then
        error "Cannot reach server at $DEPLOY_HOST"
    fi
    
    log "✅ Pre-deployment checks passed"
}

# Build application
build() {
    log "Building application..."
    
    cd "$PROJECT_DIR/web"
    
    # Clean install dependencies
    npm ci
    
    # Run TypeScript check
    npx tsc --noEmit
    
    # Build
    npm run build
    
    # Verify build
    if [ ! -f "dist/index.html" ]; then
        error "Build failed: index.html not found"
    fi
    
    log "✅ Build successful"
}

# Run tests
test() {
    log "Running tests..."
    
    cd "$PROJECT_DIR/web"
    
    # Check for broken links
    if command -v htmltest &> /dev/null; then
        htmltest dist/ || warn "Some link checks failed"
    fi
    
    log "✅ Tests completed"
}

# Create backup
create_backup() {
    log "Creating backup of current deployment..."
    
    backup_date=$(date +%Y%m%d_%H%M%S)
    ssh "${DEPLOY_USER}@${DEPLOY_HOST}" "
        if [ -d '${DEPLOY_PATH}' ]; then
            cp -r '${DEPLOY_PATH}' '${DEPLOY_PATH}.backup.${backup_date}'
            echo 'Backup created: ${DEPLOY_PATH}.backup.${backup_date}'
        fi
    "
    
    log "✅ Backup created"
}

# Deploy to server
deploy() {
    log "Deploying to ${ENVIRONMENT} environment..."
    
    # Sync files using rsync (if available) or scp
    if command -v rsync &> /dev/null; then
        rsync -avz --delete \
            --exclude='.netlify' \
            --exclude='C:' \
            --exclude='*.txt' \
            "$PROJECT_DIR/web/dist/" \
            "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"
    else
        # Fallback to scp
        scp -r "$PROJECT_DIR/web/dist/"* \
            "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"
    fi
    
    # Copy nginx config if it exists
    if [ -f "$PROJECT_DIR/nginx.conf" ]; then
        scp "$PROJECT_DIR/nginx.conf" \
            "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"
    fi
    
    log "✅ Files deployed"
}

# Restart container
restart_container() {
    log "Restarting container..."
    
    ssh "${DEPLOY_USER}@${DEPLOY_HOST}" "
        docker restart ${CONTAINER_NAME}
        sleep 3
        
        # Verify container is running
        if ! docker ps | grep -q ${CONTAINER_NAME}; then
            echo 'ERROR: Container failed to start'
            exit 1
        fi
    "
    
    log "✅ Container restarted"
}

# Post-deployment smoke test
smoke_test() {
    log "Running smoke tests..."
    
    sleep 5
    
    urls=(
        "http://${DEPLOY_HOST}:8088/"
        "http://${DEPLOY_HOST}:8088/about"
        "http://${DEPLOY_HOST}:8088/services"
        "http://${DEPLOY_HOST}:8088/contact"
    )
    
    for url in "${urls[@]}"; do
        if ! curl -sf "$url" > /dev/null; then
            error "Smoke test failed: $url"
        fi
        log "✅ $url is responding"
    done
    
    log "✅ All smoke tests passed"
}

# Cleanup old backups
cleanup_backups() {
    log "Cleaning up old backups (keeping last 5)..."
    
    ssh "${DEPLOY_USER}@${DEPLOY_HOST}" "
        ls -t ${DEPLOY_PATH}.backup.* 2>/dev/null | tail -n +6 | xargs -r rm -rf
    "
    
    log "✅ Cleanup completed"
}

# Rollback function
rollback() {
    warn "Initiating rollback..."
    
    ssh "${DEPLOY_USER}@${DEPLOY_HOST}" "
        # Find latest backup
        latest_backup=\$(ls -t ${DEPLOY_PATH}.backup.* 2>/dev/null | head -1)
        
        if [ -z \"\$latest_backup\" ]; then
            echo 'ERROR: No backup found for rollback'
            exit 1
        fi
        
        # Restore from backup
        rm -rf ${DEPLOY_PATH}
        cp -r \"\$latest_backup\" ${DEPLOY_PATH}
        docker restart ${CONTAINER_NAME}
        
        echo \"Rolled back to: \$latest_backup\"
    "
    
    log "✅ Rollback completed"
}

# Main deployment flow
main() {
    log "🚀 Starting deployment to ${ENVIRONMENT}..."
    log "Project directory: ${PROJECT_DIR}"
    
    # Trap errors for rollback
    trap 'error "Deployment failed. Consider running rollback."' ERR
    
    pre_deploy_checks
    build
    test
    create_backup
    deploy
    restart_container
    smoke_test
    cleanup_backups
    
    log "✅ Deployment completed successfully!"
    log "Website available at: http://${DEPLOY_HOST}:8088/"
}

# Handle rollback command
if [ "${1:-}" == "rollback" ]; then
    rollback
    exit 0
fi

# Run main deployment
main
