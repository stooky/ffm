/**
 * Site Configuration
 * Fire & Frost Mechanical - Saskatoon, SK
 */

export const siteConfig = {
  // Basic Info
  name: "Fire & Frost Mechanical",
  tagline: "Your Comfort, Our Priority",
  description: "Professional HVAC services in Saskatoon and area. Heating, cooling, and refrigeration repair, maintenance, and installation. 24/7 on-call service available.",
  url: "https://fireandfrostmechanical.ca",

  // Contact Information
  contact: {
    email: "clay@fireandfrostmechanical.ca",
    phone: "306-914-8194",
    address: {
      street: "",
      city: "Saskatoon",
      state: "SK",
      zip: "",
      country: "Canada",
    },
  },

  // Social Media Links
  social: {
    twitter: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },

  // Business Hours
  hours: {
    monday: "7:30 AM - 7:30 PM",
    tuesday: "7:30 AM - 7:30 PM",
    wednesday: "7:30 AM - 7:30 PM",
    thursday: "7:30 AM - 7:30 PM",
    friday: "7:30 AM - 7:30 PM",
    saturday: "7:30 AM - 7:30 PM",
    sunday: "7:30 AM - 7:30 PM",
  },

  // Navigation Links
  navigation: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],

  // Footer Navigation (additional links)
  footerLinks: {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about#team" },
      { name: "Service Areas", href: "/services#areas" },
    ],
    services: [
      { name: "Heating", href: "/services#heating" },
      { name: "Cooling", href: "/services#cooling" },
      { name: "Refrigeration", href: "/services#refrigeration" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },

  // Default SEO Image (for social sharing)
  defaultOgImage: "/og-image.png",

  // Google Analytics ID (leave empty to disable)
  googleAnalyticsId: "",

  // Copyright
  copyright: `© ${new Date().getFullYear()} Fire & Frost Heating & Cooling. All rights reserved.`,
};

export type SiteConfig = typeof siteConfig;
