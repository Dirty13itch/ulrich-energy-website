#!/bin/bash
#
# SSL Certificate Setup Script
# Sets up Let's Encrypt SSL certificates (when ready for public domain)
#

set -e

DOMAIN="${1:-}"
EMAIL="${2:-Shaun.Ulrich@UlrichEnergyAuditing.com}"
SERVER="root@192.168.1.203"
NGINX_CONF="/mnt/docker/ulrich-energy-website/nginx.conf"

if [ -z "$DOMAIN" ]; then
    echo "Usage: $0 <domain> [email]"
    echo "Example: $0 ulrichenergyauditing.com"
    exit 1
fi

echo "🔒 Setting up SSL for $DOMAIN..."

# Install certbot on server
echo "Installing certbot..."
ssh $SERVER "
    if ! command -v certbot &> /dev/null; then
        apk add --no-cache certbot
    fi
"

# Get certificate
echo "Obtaining SSL certificate..."
ssh $SERVER "certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive"

# Update nginx config to use SSL
echo "Updating nginx configuration..."
ssh $SERVER "cat > $NGINX_CONF << 'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '\$remote_addr - \$remote_user [\$time_local] "\$request" '
                    '\$status \$body_bytes_sent "\$http_referer" '
                    '"\$http_user_agent" "\$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    server_tokens off;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN;
        return 301 https://\$server_name\$request_uri;
    }

    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name $DOMAIN www.$DOMAIN;
        root /usr/share/nginx/html;
        index index.html;

        # SSL certificates
        ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
        
        # SSL configuration
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Security headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

        # Clean URLs
        location / {
            try_files \$uri \$uri.html \$uri/ =404;
        }

        # Cache static assets
        location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)\$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Health check
        location /health {
            access_log off;
            return 200 "healthy\\n";
            add_header Content-Type text/plain;
        }
    }
}
EOF"

# Setup auto-renewal
echo "Setting up certificate auto-renewal..."
ssh $SERVER "(crontab -l 2>/dev/null | grep -v certbot; echo '0 12 * * * certbot renew --quiet') | crontab -"

# Reload nginx
echo "Reloading nginx..."
ssh $SERVER "docker restart ulrich-energy-website"

echo "✅ SSL setup complete!"
echo "🌐 https://$DOMAIN"
