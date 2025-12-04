# Fire & Frost Mechanical

Professional HVAC and refrigeration services website for Saskatoon and area.

Built with **Astro 5**, **Tailwind CSS 4**, and **TypeScript**.

**Live site**: https://fireandfrostmechanical.ca

---

## Quick Start

```bash
# Clone
git clone https://github.com/yourusername/ffm2.git
cd ffm2

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit http://localhost:4321

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (localhost:4321) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Project Structure

```
ffm2/
├── deploy/                  # Deployment scripts & config
│   ├── install.sh          # Ubuntu server installation
│   ├── setup-ssl.sh        # Let's Encrypt SSL setup
│   ├── update.sh           # Redeploy script
│   ├── nginx.conf          # Nginx configuration
│   └── README.md           # Deployment guide
├── src/
│   ├── assets/
│   │   └── images/         # Optimized images (WebP)
│   ├── components/         # Reusable UI components
│   ├── config/
│   │   └── site.ts         # Site configuration
│   ├── content/
│   │   └── blog/           # Blog posts (markdown)
│   ├── layouts/
│   │   └── Layout.astro    # Main layout
│   ├── pages/              # Route pages
│   └── styles/
│       └── global.css      # Global styles
└── public/                 # Static assets
```

---

## Configuration

Edit `src/config/site.ts` to update business information:

```typescript
export const siteConfig = {
  name: 'Fire & Frost Mechanical',
  contact: {
    email: 'clay@fireandfrostmechanical.ca',
    phone: '306-914-8194',
    address: {
      city: 'Saskatoon',
      state: 'SK',
    },
  },
  hours: {
    weekdays: '7:30 AM - 7:30 PM',
    emergency: '24/7 On-Call Available',
  },
};
```

---

## Services

- **Heating** - Furnace repair and maintenance
- **Cooling** - AC repair and maintenance
- **Refrigeration** - Walk-in coolers and freezers

---

## Deployment (Ubuntu/Vultr)

Full deployment instructions in `deploy/README.md`.

### Quick Deploy

1. **Create server** on Vultr (Ubuntu 22.04/24.04, $5/mo)

2. **Configure DNS** - Point A records to server IP

3. **Upload files**:
   ```bash
   scp -r ./* root@YOUR_SERVER_IP:/var/www/fireandfrostmechanical.ca/
   ```

4. **Install**:
   ```bash
   ssh root@YOUR_SERVER_IP
   cd /var/www/fireandfrostmechanical.ca/deploy
   chmod +x *.sh
   ./install.sh
   ```

5. **Enable SSL** (after DNS propagates):
   ```bash
   ./setup-ssl.sh
   ```

### Update Site

After making changes:

```bash
# Upload changes
scp -r ./* root@YOUR_SERVER_IP:/var/www/fireandfrostmechanical.ca/

# Rebuild on server
ssh root@YOUR_SERVER_IP
cd /var/www/fireandfrostmechanical.ca/deploy
./update.sh
```

---

## Image Optimization

Images in `src/assets/images/` are automatically optimized during build:

- Converted to WebP format
- Resized to display dimensions
- Compressed with quality settings

| Image | Original | Optimized | Reduction |
|-------|----------|-----------|-----------|
| Logo | 181 KB | 4 KB | 97.8% |
| Photos | 960 KB | 3 KB | 99.7% |

---

## Tech Stack

- **[Astro 5](https://astro.build)** - Static site framework
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS
- **[TypeScript](https://typescriptlang.org)** - Type safety
- **[Sharp](https://sharp.pixelplumbing.com)** - Image optimization

---

## Contact

**Fire & Frost Mechanical**
Saskatoon, SK
Phone: 306-914-8194
Email: clay@fireandfrostmechanical.ca

---

## License

MIT
