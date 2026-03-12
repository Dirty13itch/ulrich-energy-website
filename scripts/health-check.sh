#!/bin/bash
#
# Health Check & Monitoring Script for Ulrich Energy Auditing Website
# Run this as a cron job for continuous monitoring
# 
# Cron example (every 5 minutes):
# */5 * * * * /path/to/scripts/health-check.sh >> /var/log/uea-health.log 2>&1
#

set -euo pipefail

# Configuration
DEPLOY_HOST="192.168.1.203"
DEPLOY_PORT="8088"
ALERT_EMAIL="Shaun.Ulrich@UlrichEnergyAuditing.com"
LOG_FILE="/var/log/uea-health.log"
STATE_FILE="/tmp/uea-health-state"

# URLs to check
declare -A URLS=(
    ["home"]="http://${DEPLOY_HOST}:${DEPLOY_PORT}/"
    ["about"]="http://${DEPLOY_HOST}:${DEPLOY_PORT}/about"
    ["services"]="http://${DEPLOY_HOST}:${DEPLOY_PORT}/services"
    ["contact"]="http://${DEPLOY_HOST}:${DEPLOY_PORT}/contact"
)

# Performance thresholds
MAX_RESPONSE_TIME=3000  # milliseconds
MIN_STATUS_CODE=200
MAX_STATUS_CODE=399

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Send alert (customize based on your notification system)
send_alert() {
    local subject="$1"
    local message="$2"
    
    # Log alert
    log "ALERT: $subject - $message"
    
    # Optional: Send email (if mail is configured)
    # echo "$message" | mail -s "$subject" "$ALERT_EMAIL"
    
    # Optional: Send to Slack/Discord webhook
    # curl -X POST -H 'Content-type: application/json' \
    #     --data "{\"text\":\"$subject: $message\"}" \
    #     YOUR_WEBHOOK_URL
    
    # Optional: Pushover notification
    # curl -s \
    #     --form-string "token=YOUR_APP_TOKEN" \
    #     --form-string "user=YOUR_USER_KEY" \
    #     --form-string "message=$message" \
    #     https://api.pushover.net/1/messages.json
}

# Check if URL is accessible
check_url() {
    local name="$1"
    local url="$2"
    local start_time end_time response_time http_code
    
    # Measure response time
    start_time=$(date +%s%N)
    
    http_code=$(curl -s -o /dev/null -w "%{http_code}" \
        --max-time 10 \
        "$url" 2>/dev/null || echo "000")
    
    end_time=$(date +%s%N)
    response_time=$(( (end_time - start_time) / 1000000 ))  # Convert to ms
    
    # Check status code
    if [ "$http_code" -lt 200 ] || [ "$http_code" -gt 399 ]; then
        echo "FAIL|$name|$url|$http_code|$response_time"
        return 1
    fi
    
    # Check response time
    if [ "$response_time" -gt "$MAX_RESPONSE_TIME" ]; then
        echo "SLOW|$name|$url|$http_code|$response_time"
        return 0  # Still up, but slow
    fi
    
    echo "OK|$name|$url|$http_code|$response_time"
    return 0
}

# Check SSL certificate (if using HTTPS)
check_ssl() {
    local domain="$1"
    local port="${2:-443}"
    local expiry_date days_until_expiry
    
    expiry_date=$(echo | openssl s_client -servername "$domain" -connect "${domain}:${port}" 2>/dev/null | \
        openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
    
    if [ -z "$expiry_date" ]; then
        log "WARNING: Could not check SSL certificate for $domain"
        return
    fi
    
    days_until_expiry=$(( ($(date -d "$expiry_date" +%s) - $(date +%s)) / 86400 ))
    
    if [ "$days_until_expiry" -lt 7 ]; then
        send_alert "SSL Certificate Expiring Soon" "Certificate for $domain expires in $days_until_expiry days"
    elif [ "$days_until_expiry" -lt 30 ]; then
        log "WARNING: SSL certificate for $domain expires in $days_until_expiry days"
    fi
}

# Check Docker container
check_container() {
    local container_status
    
    container_status=$(ssh root@"$DEPLOY_HOST" "docker ps --filter 'name=ulrich-energy-website' --format '{{.Status}}'" 2>/dev/null || echo "")
    
    if [ -z "$container_status" ]; then
        echo "FAIL|container|Docker container not running"
        return 1
    fi
    
    echo "OK|container|$container_status"
    return 0
}

# Check disk space
check_disk_space() {
    local usage_percent
    
    usage_percent=$(ssh root@"$DEPLOY_HOST" "df /mnt/docker | tail -1 | awk '{print \$5}' | sed 's/%//'")
    
    if [ "$usage_percent" -gt 90 ]; then
        echo "CRITICAL|disk|Disk usage at ${usage_percent}%"
        return 1
    elif [ "$usage_percent" -gt 80 ]; then
        echo "WARNING|disk|Disk usage at ${usage_percent}%"
        return 0
    fi
    
    echo "OK|disk|Disk usage at ${usage_percent}%"
    return 0
}

# Run Lighthouse performance check (weekly)
run_lighthouse() {
    local url="$1"
    local output_file
    
    output_file="/tmp/lighthouse-$(date +%Y%m%d).json"
    
    if command -v lighthouse &> /dev/null; then
        lighthouse "$url" \
            --output=json \
            --output-path="$output_file" \
            --chrome-flags="--headless --no-sandbox" \
            2>/dev/null || true
        
        # Extract scores
        if [ -f "$output_file" ]; then
            local performance_score
            performance_score=$(cat "$output_file" | jq -r '.categories.performance.score // 0')
            
            if (( $(echo "$performance_score < 0.5" | bc -l) )); then
                send_alert "Poor Performance Score" "Performance score is ${performance_score} for $url"
            fi
        fi
    fi
}

# Main health check
main() {
    local failures=0
    local slow_count=0
    local results=""
    
    log "Starting health check..."
    
    # Check each URL
    for name in "${!URLS[@]}"; do
        url="${URLS[$name]}"
        result=$(check_url "$name" "$url")
        results="${results}\n${result}"
        
        status=$(echo "$result" | cut -d'|' -f1)
        
        case "$status" in
            "FAIL")
                ((failures++))
                ;;
            "SLOW")
                ((slow_count++))
                ;;
        esac
    done
    
    # Check container
    container_result=$(check_container)
    results="${results}\n${container_result}"
    if [ "$(echo "$container_result" | cut -d'|' -f1)" == "FAIL" ]; then
        ((failures++))
    fi
    
    # Check disk space
    disk_result=$(check_disk_space)
    results="${results}\n${disk_result}"
    
    # Log results
    echo -e "$results" | while IFS='|' read -r status name url code time; do
        case "$status" in
            "OK")
                log "✅ $name: HTTP $code (${time}ms)"
                ;;
            "FAIL")
                log "❌ $name: FAILED (HTTP $code)"
                ;;
            "SLOW")
                log "⚠️  $name: SLOW (${time}ms)"
                ;;
        esac
    done
    
    # Send alert if failures detected
    if [ "$failures" -gt 0 ]; then
        # Check if we already sent an alert recently (prevent spam)
        if [ -f "$STATE_FILE" ]; then
            last_alert=$(cat "$STATE_FILE")
            time_since_alert=$(( $(date +%s) - last_alert ))
            
            # Only alert every 15 minutes
            if [ "$time_since_alert" -lt 900 ]; then
                log "Alert suppressed (last alert $time_since_alert seconds ago)"
                exit 0
            fi
        fi
        
        send_alert "Website Health Check Failed" "$failures checks failed. Check logs at $LOG_FILE"
        date +%s > "$STATE_FILE"
    else
        # Clear alert state if all is well
        rm -f "$STATE_FILE"
    fi
    
    # Run weekly Lighthouse check (on Sundays)
    if [ "$(date +%u)" == "7" ] && [ "$(date +%H)" == "03" ]; then
        log "Running weekly Lighthouse performance check..."
        run_lighthouse "${URLS[home]}"
    fi
    
    log "Health check completed. Failures: $failures, Slow: $slow_count"
}

# Run main function
main
