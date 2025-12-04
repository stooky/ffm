#!/bin/bash
#
# Fire & Frost Mechanical - Ubuntu Server Installation Script
# Tested on Ubuntu 22.04/24.04 LTS on Vultr
#
# Usage: sudo ./install.sh
#

set -e

# Configuration
DOMAIN="fireandfrostmechanical.ca"
APP_DIR="/var/www/${DOMAIN}"
REPO_URL=""  # Set this if using git clone, otherwise leave empty for manual upload
NODE_VERSION="20"
USER="www-data"
GROUP="www-data"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

print_status "Starting Fire & Frost Mechanical website installation..."
echo ""

# Update system
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install required packages
print_status "Installing required packages..."
apt install -y curl wget git nginx certbot python3-certbot-nginx ufw

# Install Node.js
print_status "Installing Node.js ${NODE_VERSION}..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt install -y nodejs
else
    print_warning "Node.js already installed: $(node -v)"
fi

# Verify installations
print_status "Verifying installations..."
echo "  Node.js: $(node -v)"
echo "  npm: $(npm -v)"
echo "  Nginx: $(nginx -v 2>&1)"

# Create application directory
print_status "Creating application directory..."
mkdir -p ${APP_DIR}

# Check if we should clone from git or if files are already present
if [[ -n "$REPO_URL" ]]; then
    print_status "Cloning repository..."
    git clone ${REPO_URL} ${APP_DIR}
elif [[ ! -f "${APP_DIR}/package.json" ]]; then
    print_warning "No repository URL set and no files found in ${APP_DIR}"
    print_warning "Please copy your project files to ${APP_DIR} and run this script again"
    print_warning "Or set REPO_URL in this script and re-run"
    echo ""
    echo "Example: scp -r ./* root@your-server:${APP_DIR}/"
    exit 1
fi

# Navigate to app directory
cd ${APP_DIR}

# Install dependencies
print_status "Installing npm dependencies..."
npm ci --production=false

# Build the site
print_status "Building the static site..."
npm run build

# Set permissions
print_status "Setting file permissions..."
chown -R ${USER}:${GROUP} ${APP_DIR}
chmod -R 755 ${APP_DIR}/dist

# Configure Nginx
print_status "Configuring Nginx..."
cp ${APP_DIR}/deploy/nginx.conf /etc/nginx/sites-available/${DOMAIN}

# Update Nginx config with correct paths
sed -i "s|{{DOMAIN}}|${DOMAIN}|g" /etc/nginx/sites-available/${DOMAIN}
sed -i "s|{{APP_DIR}}|${APP_DIR}|g" /etc/nginx/sites-available/${DOMAIN}

# Enable site
ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
print_status "Testing Nginx configuration..."
nginx -t

# Configure firewall
print_status "Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

# Restart Nginx
print_status "Starting Nginx..."
systemctl restart nginx
systemctl enable nginx

echo ""
print_status "============================================"
print_status "Installation complete!"
print_status "============================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Point your DNS A record for ${DOMAIN} to this server's IP"
echo "   Also add an A record for www.${DOMAIN}"
echo ""
echo "2. Once DNS propagates, run the SSL setup script:"
echo "   sudo ${APP_DIR}/deploy/setup-ssl.sh"
echo ""
echo "3. Your site will be available at:"
echo "   http://${DOMAIN} (before SSL)"
echo "   https://${DOMAIN} (after SSL)"
echo ""
print_warning "Don't forget to set up SSL! Run setup-ssl.sh after DNS propagates."
echo ""
