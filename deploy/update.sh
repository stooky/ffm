#!/bin/bash
#
# Fire & Frost Mechanical - Update/Redeploy Script
# Run this after pushing changes to rebuild and deploy
#
# Usage: sudo ./update.sh
#

set -e

# Configuration
DOMAIN="fireandfrostmechanical.ca"
APP_DIR="/var/www/${DOMAIN}"
USER="www-data"
GROUP="www-data"

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[*]${NC} $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root (use sudo)"
   exit 1
fi

cd ${APP_DIR}

print_status "Pulling latest changes..."
git pull origin main 2>/dev/null || print_status "No git repo, skipping pull..."

print_status "Installing dependencies..."
npm ci --production=false

print_status "Building site..."
npm run build

print_status "Setting permissions..."
chown -R ${USER}:${GROUP} ${APP_DIR}
chmod -R 755 ${APP_DIR}/dist

print_status "Reloading Nginx..."
systemctl reload nginx

print_status "Update complete!"
echo ""
echo "Site is live at: https://${DOMAIN}"
