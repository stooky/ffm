#!/bin/bash
#
# Change domain for an existing installation
# Usage: sudo ./change-domain.sh <new-domain>
#
# Example: sudo ./change-domain.sh crkid.com
#

set -e

OLD_DOMAIN="fireandfrostmechanical.ca"
NEW_DOMAIN="${1:-}"

if [[ -z "$NEW_DOMAIN" ]]; then
    echo "Usage: ./change-domain.sh <new-domain>"
    echo "Example: ./change-domain.sh crkid.com"
    exit 1
fi

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root (use sudo)"
   exit 1
fi

echo "[*] Changing domain from ${OLD_DOMAIN} to ${NEW_DOMAIN}..."

OLD_APP_DIR="/var/www/${OLD_DOMAIN}"
NEW_APP_DIR="/var/www/${NEW_DOMAIN}"

# Move app directory
if [[ -d "$OLD_APP_DIR" ]] && [[ "$OLD_APP_DIR" != "$NEW_APP_DIR" ]]; then
    echo "[*] Moving ${OLD_APP_DIR} to ${NEW_APP_DIR}..."
    mv "$OLD_APP_DIR" "$NEW_APP_DIR"
fi

# Remove old nginx config
echo "[*] Updating Nginx configuration..."
rm -f /etc/nginx/sites-enabled/${OLD_DOMAIN}
rm -f /etc/nginx/sites-available/${OLD_DOMAIN}

# Create new nginx config from template
cp ${NEW_APP_DIR}/deploy/nginx.conf /etc/nginx/sites-available/${NEW_DOMAIN}
sed -i "s|{{DOMAIN}}|${NEW_DOMAIN}|g" /etc/nginx/sites-available/${NEW_DOMAIN}
sed -i "s|{{APP_DIR}}|${NEW_APP_DIR}|g" /etc/nginx/sites-available/${NEW_DOMAIN}

# Enable new site
ln -sf /etc/nginx/sites-available/${NEW_DOMAIN} /etc/nginx/sites-enabled/

# Test and reload nginx
nginx -t
systemctl reload nginx

echo ""
echo "[*] Domain changed to ${NEW_DOMAIN}"
echo ""
echo "Next steps:"
echo "1. Point DNS A record for ${NEW_DOMAIN} to this server"
echo "2. Run SSL setup: ${NEW_APP_DIR}/deploy/setup-ssl.sh"
echo ""
echo "Note: Update the DOMAIN variable in these files for future deploys:"
echo "  - ${NEW_APP_DIR}/deploy/install.sh"
echo "  - ${NEW_APP_DIR}/deploy/setup-ssl.sh"
echo "  - ${NEW_APP_DIR}/deploy/update.sh"
