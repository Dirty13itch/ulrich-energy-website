#!/bin/bash
#
# Backup Script for Ulrich Energy Auditing Website
# Creates compressed backups of website files and database (if any)
#

set -e

# Configuration
SERVER="root@192.168.1.203"
REMOTE_DIR="/mnt/docker/ulrich-energy-website"
BACKUP_DIR="/mnt/docker/backups/ulrich-energy-website"
LOCAL_BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARN: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

# Create backup directory on server
log "Creating backup directory on server..."
ssh $SERVER "mkdir -p $BACKUP_DIR"

# Create compressed backup
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
log "Creating backup: backup_$TIMESTAMP.tar.gz"

ssh $SERVER "cd $REMOTE_DIR && tar -czf $BACKUP_FILE ."

if [ $? -eq 0 ]; then
    log "✅ Backup created successfully: $BACKUP_FILE"
    
    # Show backup size
    SIZE=$(ssh $SERVER "du -h $BACKUP_FILE | cut -f1")
    log "Backup size: $SIZE"
else
    error "❌ Backup failed!"
    exit 1
fi

# Cleanup old backups
log "Cleaning up backups older than $RETENTION_DAYS days..."
DELETED=$(ssh $SERVER "find $BACKUP_DIR -name 'backup_*.tar.gz' -mtime +$RETENTION_DAYS -delete -print | wc -l")
log "✅ Removed $DELETED old backup(s)"

# List remaining backups
log "Current backups:"
ssh $SERVER "ls -lh $BACKUP_DIR | tail -n +2 | awk '{print \"  - \" \$9 \" (\" \$5 \")\"}'"

# Optional: Download backup locally
if [ "$1" == "--download" ]; then
    log "Downloading backup locally..."
    mkdir -p $LOCAL_BACKUP_DIR
    scp $SERVER:$BACKUP_FILE $LOCAL_BACKUP_DIR/
    log "✅ Backup downloaded to $LOCAL_BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
fi

log "Backup process completed!"
