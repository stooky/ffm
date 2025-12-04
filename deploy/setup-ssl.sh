#!/bin/bash
#
# Fire & Frost Mechanical - SSL Certificate Setup
# Uses Let's Encrypt via Certbot
#
# Usage: sudo ./setup-ssl.sh [email]
#

set -e

# Configuration
DOMAIN="fireandfrostmechanical.ca"
EMAIL="${1:-clay@fireandfrostmechanical.ca}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[*]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root (use sudo)"
   exit 1
fi

print_status "Setting up SSL certificate for ${DOMAIN}..."
echo ""

# Check if DNS is properly configured
print_status "Checking DNS configuration..."
SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(dig +short ${DOMAIN} | head -n1)

if [[ "$SERVER_IP" != "$DOMAIN_IP" ]]; then
    print_warning "DNS may not be configured correctly!"
    echo "  Server IP: ${SERVER_IP}"
    echo "  Domain resolves to: ${DOMAIN_IP:-'(not found)'}"
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Obtain SSL certificate
print_status "Obtaining SSL certificate from Let's Encrypt..."
certbot --nginx \
    -d ${DOMAIN} \
    -d www.${DOMAIN} \
    --non-interactive \
    --agree-tos \
    --email ${EMAIL} \
    --redirect

# Set up auto-renewal
print_status "Configuring automatic certificate renewal..."
systemctl enable certbot.timer
systemctl start certbot.timer

# Test renewal
print_status "Testing certificate renewal..."
certbot renew --dry-run

# Restart Nginx
print_status "Restarting Nginx..."
systemctl restart nginx

echo ""
print_status "============================================"
print_status "SSL setup complete!"
print_status "============================================"
echo ""
echo "Your site is now available at:"
echo "  https://${DOMAIN}"
echo "  https://www.${DOMAIN}"
echo ""
echo "Certificate details:"
certbot certificates --domain ${DOMAIN}
echo ""
echo "Auto-renewal is enabled. Certificates will renew automatically."
echo ""
