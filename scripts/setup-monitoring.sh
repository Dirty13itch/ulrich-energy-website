#!/bin/bash
#
# Setup Monitoring on Unraid Server
# Run this once to initialize health check monitoring
#

set -e

SERVER="root@192.168.1.203"
LOG_FILE="/var/log/uea-health.log"
SCRIPT_PATH="/mnt/docker/ulrich-energy-auditing/health-check.sh"

echo "🔧 Setting up monitoring on Unraid server..."

# Create health check script on server
echo "Creating health check script..."
ssh $SERVER "cat > /tmp/health-check.sh << 'EOF'
#!/bin/bash
LOG_FILE=\"/var/log/uea-health.log\"
TIMESTAMP=\$(date '+%Y-%m-%d %H:%M:%S')
WEBSITE_URL=\"http://localhost:8088/\"
MAX_RESPONSE_TIME=5

# Function to log messages
log() {
    echo \"[\$TIMESTAMP] \$1\" >> \$LOG_FILE
}

# Check website response
response=\$(curl -s -o /dev/null -w \"%{http_code}\" -m \$MAX_RESPONSE_TIME \$WEBSITE_URL 2>/dev/null)

if [ \"\$response\" == \"200\" ]; then
    load_time=\$(curl -s -o /dev/null -w \"%{time_total}\" -m \$MAX_RESPONSE_TIME \$WEBSITE_URL 2>/dev/null)
    log \"[INFO] Website is healthy - Response time: \${load_time}s\"
    
    # Warning if slow
    if (( \$(echo \"\$load_time > 2.0\" | bc -l) )); then
        log \"[WARNING] Website response time high: \${load_time}s\"
    fi
else
    log \"[ERROR] Website unhealthy - HTTP \$response\"
fi

# Check container status
container_status=\$(docker ps --filter name=ulrich-energy-website --format '{{.Status}}' 2>/dev/null)
if [ -z \"\$container_status\" ]; then
    log \"[ERROR] Container not running!\"
else
    log \"[INFO] Container status: \$container_status\"
fi

# Check disk space
disk_usage=\$(df /mnt/docker | tail -1 | awk '{print \$5}' | sed 's/%//')
if [ \$disk_usage -gt 90 ]; then
    log \"[WARNING] Disk usage high: \${disk_usage}%\"
else
    log \"[INFO] Disk usage: \${disk_usage}%\"
fi
EOF
chmod +x /tmp/health-check.sh"

# Copy script to destination
echo "Installing health check script..."
ssh $SERVER "mkdir -p /mnt/docker/ulrich-energy-auditing && \
             mv /tmp/health-check.sh $SCRIPT_PATH && \
             chmod +x $SCRIPT_PATH"

# Create log file
echo "Setting up log file..."
ssh $SERVER "touch $LOG_FILE && chmod 644 $LOG_FILE"

# Add cron job for every 5 minutes
echo "Setting up cron job..."
ssh $SERVER "(crontab -l 2>/dev/null | grep -v ulrich-energy-auditing; echo \"*/5 * * * * $SCRIPT_PATH\") | crontab -"

# Create log rotation config
echo "Setting up log rotation..."
ssh $SERVER "cat > /etc/logrotate.d/uea-health << 'EOF'
/var/log/uea-health.log {
    weekly
    rotate 4
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
}
EOF"

echo ""
echo "✅ Monitoring setup complete!"
echo ""
echo "Health checks will run every 5 minutes."
echo "Logs: $LOG_FILE"
echo ""
echo "To view logs:"
echo "  ssh $SERVER 'tail -f $LOG_FILE'"
echo ""
echo "To manually run health check:"
echo "  ssh $SERVER '$SCRIPT_PATH'"
echo ""
