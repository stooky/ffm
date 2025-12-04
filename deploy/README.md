# Fire & Frost Mechanical - Deployment Guide

Complete guide for deploying on Ubuntu (22.04/24.04 LTS) hosted on Vultr.

## Prerequisites

- Vultr account with an Ubuntu 22.04 or 24.04 LTS server
- Domain `fireandfrostmechanical.ca` with DNS access
- SSH access to your server

## Quick Start

### 1. Create Vultr Server

1. Log in to [Vultr](https://vultr.com)
2. Deploy new server:
   - **Type**: Cloud Compute (Shared CPU)
   - **Location**: Toronto (closest to Saskatoon)
   - **Image**: Ubuntu 22.04 LTS or 24.04 LTS
   - **Plan**: $5/mo (1 vCPU, 1GB RAM) is sufficient for static sites
   - **Additional Features**: Enable IPv6
3. Note the server IP address

### 2. Configure DNS

Add these DNS records at your domain registrar:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | `YOUR_SERVER_IP` | 300 |
| A | www | `YOUR_SERVER_IP` | 300 |
| AAAA | @ | `YOUR_SERVER_IPV6` | 300 |
| AAAA | www | `YOUR_SERVER_IPV6` | 300 |

### 3. Upload Files to Server

**Option A: Using SCP (from your local machine)**

```bash
# From the project root directory
scp -r ./* root@YOUR_SERVER_IP:/var/www/fireandfrostmechanical.ca/
```

**Option B: Using Git**

First, push your code to a Git repository, then on the server:

```bash
# SSH into server
ssh root@YOUR_SERVER_IP

# Create directory and clone
mkdir -p /var/www/fireandfrostmechanical.ca
cd /var/www/fireandfrostmechanical.ca
git clone YOUR_REPO_URL .
```

### 4. Run Installation Script

```bash
# SSH into server (if not already)
ssh root@YOUR_SERVER_IP

# Navigate to deploy directory
cd /var/www/fireandfrostmechanical.ca/deploy

# Make scripts executable
chmod +x *.sh

# Run installation
./install.sh
```

The script will:
- Update system packages
- Install Node.js 20, Nginx, Certbot
- Install npm dependencies
- Build the static site
- Configure Nginx
- Set up firewall (UFW)

### 5. Set Up SSL Certificate

Wait for DNS to propagate (usually 5-30 minutes), then:

```bash
cd /var/www/fireandfrostmechanical.ca/deploy
./setup-ssl.sh
```

This will:
- Obtain a free Let's Encrypt SSL certificate
- Configure Nginx for HTTPS
- Set up automatic certificate renewal

### 6. Verify Installation

Visit your site:
- https://fireandfrostmechanical.ca
- https://www.fireandfrostmechanical.ca

## Updating the Site

After making changes to the code:

**Option A: Manual Update**

```bash
# On your local machine - upload changes
scp -r ./* root@YOUR_SERVER_IP:/var/www/fireandfrostmechanical.ca/

# On the server - rebuild
ssh root@YOUR_SERVER_IP
cd /var/www/fireandfrostmechanical.ca/deploy
./update.sh
```

**Option B: Git-based Update**

```bash
# On your local machine
git add . && git commit -m "Update site" && git push

# On the server
ssh root@YOUR_SERVER_IP
cd /var/www/fireandfrostmechanical.ca/deploy
./update.sh
```

## File Structure

```
deploy/
├── README.md          # This file
├── install.sh         # Main installation script
├── setup-ssl.sh       # SSL certificate setup
├── update.sh          # Update/redeploy script
└── nginx.conf         # Nginx configuration template
```

## Server Management

### Check Nginx Status
```bash
systemctl status nginx
```

### View Logs
```bash
# Access logs
tail -f /var/log/nginx/fireandfrostmechanical.ca_access.log

# Error logs
tail -f /var/log/nginx/fireandfrostmechanical.ca_error.log
```

### Restart Services
```bash
systemctl restart nginx
```

### Check SSL Certificate
```bash
certbot certificates
```

### Manually Renew SSL
```bash
certbot renew
```

## Troubleshooting

### Site Not Loading

1. Check Nginx is running:
   ```bash
   systemctl status nginx
   ```

2. Check Nginx config:
   ```bash
   nginx -t
   ```

3. Check firewall:
   ```bash
   ufw status
   ```

### SSL Issues

1. Verify DNS is pointing to server:
   ```bash
   dig fireandfrostmechanical.ca
   ```

2. Check certificate status:
   ```bash
   certbot certificates
   ```

3. Re-run SSL setup:
   ```bash
   ./setup-ssl.sh
   ```

### Build Errors

1. Check Node.js version:
   ```bash
   node -v  # Should be v20.x
   ```

2. Clear npm cache and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

## Security Recommendations

1. **Set up SSH keys** instead of password authentication:
   ```bash
   # On your local machine
   ssh-copy-id root@YOUR_SERVER_IP
   ```

2. **Create a non-root user**:
   ```bash
   adduser deploy
   usermod -aG sudo deploy
   ```

3. **Disable root SSH login** (after setting up another user):
   ```bash
   # Edit /etc/ssh/sshd_config
   PermitRootLogin no
   systemctl restart sshd
   ```

4. **Keep system updated**:
   ```bash
   apt update && apt upgrade -y
   ```

## Performance Notes

The site is optimized for performance:
- Static HTML files served directly by Nginx
- Aggressive caching for Astro-generated assets (1 year)
- Gzip compression enabled
- Images optimized to WebP format during build
- Average page load: < 500ms

## Support

For issues with:
- **Vultr hosting**: https://www.vultr.com/docs/
- **Nginx**: https://nginx.org/en/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/
- **Astro**: https://docs.astro.build/
