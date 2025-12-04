/**
 * HVAC Vertical Master Configuration
 *
 * This is the main configuration file for HVAC contractor websites.
 * Toggle features on/off and customize content for each client.
 *
 * PREREQUISITES are noted for features that depend on other features or external setup.
 */

import type { HomeServicesConfig } from './types';

export const hvacConfig: HomeServicesConfig = {
  // ============================================================================
  // VERTICAL IDENTITY
  // ============================================================================
  vertical: 'hvac',
  verticalLabel: 'HVAC',
  verticalTagline: 'Heating, Cooling & Indoor Air Quality',

  // ============================================================================
  // BUSINESS INFORMATION
  // Required: These must be filled out for the site to function
  // ============================================================================
  business: {
    name: 'Fire & Frost Mechanical',
    phone: '306-914-8194',
    email: 'clay@fireandfrostmechanical.ca',
    address: {
      street: '',
      city: 'Saskatoon',
      state: 'SK',
      zip: '',
    },
    license: 'Saskatchewan Licensed',
    yearEstablished: null,
  },

  // ============================================================================
  // FEATURE TOGGLES
  // Enable/disable major site features
  // ============================================================================
  features: {
    // Emergency Services Banner
    // Shows sticky banner with phone number for 24/7 service
    emergency: {
      enabled: true,
      // No prerequisites
    },

    // Service Area Map & Pages
    // Shows coverage map and generates city-specific pages
    serviceArea: {
      enabled: true,
      // No prerequisites
    },

    // Maintenance Plans
    // Displays maintenance plan cards and dedicated page
    maintenancePlans: {
      enabled: true,
      // No prerequisites
    },

    // Financing Options
    // Shows financing banners and dedicated financing page
    // PREREQUISITE: Must have financing partner account (Synchrony, GreenSky, etc.)
    financing: {
      enabled: true,
      prerequisite: 'Requires active financing partner account',
    },

    // Before/After Gallery
    // Photo gallery with slider comparisons
    // PREREQUISITE: Requires actual project photos from client
    gallery: {
      enabled: true,
      prerequisite: 'Requires minimum 3 project photos with before/after shots',
    },

    // Reviews Integration
    // Displays reviews from Google, Yelp, etc.
    // PREREQUISITE: Must have Google Business Profile with reviews
    reviews: {
      enabled: true,
      prerequisite: 'Requires Google Business Profile with minimum 5 reviews',
    },

    // Blog
    // Enables blog section with posts
    blog: {
      enabled: true,
      // No prerequisites
    },

    // Coupons/Specials Page
    // Dedicated page for current offers
    coupons: {
      enabled: false, // Less common for HVAC (maintenance plans preferred)
      // No prerequisites
    },

    // Online Scheduling
    // Embed scheduling widget
    // PREREQUISITE: Must have scheduling software (ServiceTitan, Housecall Pro, etc.)
    scheduling: {
      enabled: false,
      prerequisite: 'Requires scheduling software with embed capability',
    },

    // Live Chat
    // Chat widget integration
    // PREREQUISITE: Must have chat service account
    liveChat: {
      enabled: false,
      prerequisite: 'Requires chat service (Intercom, Drift, etc.)',
    },

    // Seasonal Messaging
    // Automatically adjusts headlines based on season
    seasonalMessaging: {
      enabled: true,
      // No prerequisites
    },
  },

  // ============================================================================
  // EMERGENCY CONFIGURATION
  // Only used if features.emergency.enabled = true
  // ============================================================================
  emergency: {
    headline: "Furnace Down? AC Not Working? We Can Help!",
    subheadline: 'HVAC & Refrigeration Service - Saskatoon',
    responseTime: '24/7 on-call service available',
    phone: '306-914-8194', // Can differ from main number

    // Banner styling
    variant: 'sticky', // 'sticky' | 'inline'
    colorScheme: 'urgent', // 'urgent' (red) | 'brand' (primary color)

    // Show on these pages (empty = all pages)
    showOnPages: [],

    // Hide on these pages
    hideOnPages: ['/maintenance-plans'], // Don't show emergency on sales pages
  },

  // ============================================================================
  // SERVICE AREA CONFIGURATION
  // Only used if features.serviceArea.enabled = true
  // ============================================================================
  serviceArea: {
    // Primary service radius
    radiusMiles: 50,

    // Cities served (used for local SEO and service area page)
    cities: [
      'Saskatoon',
    ],

    // Postal codes (optional, for more precise targeting)
    zipCodes: [
      'S7',
    ],

    // Google Maps embed URL (optional)
    // PREREQUISITE: Google Maps API key for custom map
    mapEmbedUrl: '',

    // Generate individual city pages for SEO
    generateCityPages: false,

    // City page template
    cityPageTemplate: {
      headlinePattern: 'HVAC Services in {city}, Saskatchewan',
      descriptionPattern: 'Professional heating, cooling, and refrigeration services for {city} and area. Contact for pricing.',
    },
  },

  // ============================================================================
  // MAINTENANCE PLANS CONFIGURATION
  // Only used if features.maintenancePlans.enabled = true
  // ============================================================================
  maintenancePlans: {
    // Program branding
    programName: 'Maintenance Plan',
    headline: 'Preventative Maintenance',
    description: 'Keep your HVAC system running smoothly through Saskatchewan\'s extreme seasons with regular maintenance.',

    // Plan tiers
    plans: [
      {
        id: 'basic',
        name: 'Basic',
        price: '$14.99/mo',
        priceAnnual: '$149/yr',
        features: [
          '1 tune-up per year',
          '10% off repairs',
          'Priority scheduling',
          'Email reminders',
        ],
        featured: false,
      },
      {
        id: 'premium',
        name: 'Premium',
        price: '$24.99/mo',
        priceAnnual: '$249/yr',
        features: [
          '2 tune-ups per year (heating + cooling)',
          '15% off repairs',
          'Priority scheduling',
          'No overtime charges',
          'Filter replacement included',
          '24/7 emergency priority',
        ],
        featured: true, // Highlighted as best value
      },
      {
        id: 'ultimate',
        name: 'Ultimate',
        price: '$39.99/mo',
        priceAnnual: '$399/yr',
        features: [
          '2 tune-ups per year',
          '20% off repairs',
          'Priority scheduling',
          'No overtime charges',
          'Filter replacement included',
          '24/7 emergency priority',
          'Indoor air quality check',
          'Duct inspection',
        ],
        featured: false,
      },
    ],

    // CTA
    ctaText: 'Join Now',
    ctaLink: '/maintenance-plans',

    // Show on homepage
    showOnHomepage: true,
  },

  // ============================================================================
  // FINANCING CONFIGURATION
  // Only used if features.financing.enabled = true
  // PREREQUISITE: Active financing partner account
  // ============================================================================
  financing: {
    headline: 'Flexible Financing Available',
    description: "Don't let budget stop you from comfort. Get the system you need today.",

    // Financing partners
    partners: [
      {
        name: 'Synchrony',
        logo: '/images/partners/synchrony.png', // Add to public/images/partners/
        applyUrl: 'https://example.com/apply', // Partner-provided URL
      },
    ],

    // Promotional offers
    offers: [
      {
        headline: '0% APR for 18 Months',
        description: 'On qualifying systems $2,000+',
        terms: 'With approved credit. See store for details.',
      },
      {
        headline: 'Payments as low as $89/mo',
        description: 'On new system installation',
        terms: 'Based on $8,000 system with 120-month term.',
      },
    ],

    // Dedicated page
    dedicatedPage: true,
    pageSlug: '/financing',
  },

  // ============================================================================
  // GALLERY CONFIGURATION
  // Only used if features.gallery.enabled = true
  // PREREQUISITE: Client must provide project photos
  // ============================================================================
  gallery: {
    headline: 'Our Work',
    description: 'See the quality of our installations and repairs.',

    // Gallery type
    type: 'before-after', // 'before-after' | 'grid' | 'masonry'

    // Projects (to be populated with actual client photos)
    projects: [
      {
        id: 'project-1',
        title: 'Furnace Installation',
        location: 'Saskatoon, SK',
        beforeImage: '/images/gallery/project-1-before.jpg',
        afterImage: '/images/gallery/project-1-after.jpg',
        description: 'New furnace installation for a Saskatoon home.',
        category: 'installation',
      },
      // Add more projects...
    ],

    // Show on homepage
    showOnHomepage: true,
    homepageLimit: 3, // Number of projects to show on homepage
  },

  // ============================================================================
  // REVIEWS CONFIGURATION
  // Only used if features.reviews.enabled = true
  // PREREQUISITE: Google Business Profile with reviews
  // ============================================================================
  reviews: {
    headline: 'What Our Customers Say',

    // Review sources
    sources: {
      google: {
        enabled: true,
        placeId: '', // Google Place ID for live integration
        // PREREQUISITE: Google Places API key for live reviews
      },
      yelp: {
        enabled: false,
        businessId: '',
      },
      facebook: {
        enabled: false,
        pageId: '',
      },
    },

    // Manual reviews (fallback or supplement to live reviews)
    manualReviews: [
      {
        rating: 5,
        text: "Clay was very professional when he inspected my furnace and A/C unit. He was able to diagnose the problem very quickly and explained what the issue was in a manner that I could understand. Honest and no upsell pressure. Will definitely use Fire & Frost Mechanical again in the future.",
        author: 'Jeremy Dela Cruz',
        location: 'Saskatoon, SK',
        source: 'Google',
        date: '2024-01-15',
      },
      {
        rating: 5,
        text: "Clay helped us when we moved to our new place to get our home and garage heaters serviced. Clay is very professional and easy to work with. I recommend giving him a call!",
        author: 'Andrew Owen',
        location: 'Saskatoon, SK',
        source: 'Google',
        date: '2024-06-22',
      },
      {
        rating: 5,
        text: "Didn't have hot water for two days trying to fix it myself, Clay came and in ten minutes fixed the issue. He is the best!",
        author: 'Calebhe Jordan',
        location: 'Saskatoon, SK',
        source: 'Google',
        date: '2024-07-28',
      },
    ],

    // Display settings
    showOnHomepage: true,
    homepageLimit: 3,
    minimumRating: 4, // Only show reviews with this rating or higher
  },

  // ============================================================================
  // BLOG CONFIGURATION
  // Only used if features.blog.enabled = true
  // ============================================================================
  blog: {
    enabled: true,
    headline: 'HVAC Tips & News',
    description: 'Expert advice to keep your home comfortable year-round.',

    // Show on homepage
    showOnHomepage: true,
    homepageLimit: 3,

    // Categories
    categories: [
      'Heating',
      'Cooling',
      'Maintenance Tips',
      'Energy Savings',
      'Indoor Air Quality',
    ],
  },

  // ============================================================================
  // COUPONS CONFIGURATION
  // Only used if features.coupons.enabled = true
  // ============================================================================
  coupons: {
    headline: 'Current Specials',
    description: 'Save on your next HVAC service.',

    offers: [
      {
        id: 'tuneup-special',
        title: '$79 AC Tune-Up',
        description: 'Regular $129. Limited time offer.',
        code: 'COOL79',
        expires: '2024-08-31',
        terms: 'New customers only. Cannot be combined with other offers.',
      },
    ],

    // Dedicated page
    dedicatedPage: true,
    pageSlug: '/specials',
  },

  // ============================================================================
  // SCHEDULING CONFIGURATION
  // Only used if features.scheduling.enabled = true
  // PREREQUISITE: Scheduling software account
  // ============================================================================
  scheduling: {
    provider: 'none', // 'servicetitan' | 'housecallpro' | 'jobber' | 'calendly' | 'none'
    embedCode: '', // Provided by scheduling software

    // Fallback if no embed
    fallbackPhone: true,
    fallbackForm: true,
  },

  // ============================================================================
  // LIVE CHAT CONFIGURATION
  // Only used if features.liveChat.enabled = true
  // PREREQUISITE: Chat service account
  // ============================================================================
  liveChat: {
    provider: 'none', // 'intercom' | 'drift' | 'livechat' | 'tawk' | 'none'
    embedCode: '', // Provided by chat service
  },

  // ============================================================================
  // SEASONAL MESSAGING
  // Only used if features.seasonalMessaging.enabled = true
  // ============================================================================
  seasonalMessaging: {
    // Define date ranges and messaging for each season
    seasons: {
      summer: {
        startMonth: 5, // June (0-indexed would be 5, but using 1-indexed for clarity)
        endMonth: 8,   // August
        headline: 'Beat the Heat This Summer',
        emphasis: 'cooling',
        services: ['AC Repair', 'AC Installation', 'AC Maintenance'],
        ctaText: 'Schedule AC Service',
      },
      winter: {
        startMonth: 11, // November
        endMonth: 2,    // February
        headline: 'Stay Warm All Winter',
        emphasis: 'heating',
        services: ['Furnace Repair', 'Furnace Installation', 'Heating Maintenance'],
        ctaText: 'Schedule Heating Service',
      },
      spring: {
        startMonth: 3, // March
        endMonth: 4,   // April
        headline: 'Spring Tune-Up Time',
        emphasis: 'maintenance',
        services: ['AC Tune-Up', 'System Inspection'],
        ctaText: 'Schedule Tune-Up',
      },
      fall: {
        startMonth: 9,  // September
        endMonth: 10,   // October
        headline: 'Prepare for Winter',
        emphasis: 'maintenance',
        services: ['Furnace Tune-Up', 'System Inspection'],
        ctaText: 'Schedule Tune-Up',
      },
    },
  },

  // ============================================================================
  // SERVICES CONFIGURATION
  // Define which services are offered and their details
  // ============================================================================
  services: {
    // Service categories to display
    categories: ['Heating', 'Cooling', 'Refrigeration'],

    // Featured services (shown prominently on homepage)
    featured: [
      'furnace-repair',
      'furnace-maintenance',
      'ac-repair',
      'ac-maintenance',
      'walk-in-cooler',
      'walk-in-freezer',
    ],

    // Emergency services (shown with emergency badge)
    emergency: [
      'furnace-repair',
      'ac-repair',
      'walk-in-cooler',
      'walk-in-freezer',
    ],

    // Services with financing available
    financingAvailable: [],
  },

  // ============================================================================
  // BRANDS SERVICED
  // Display brand logos and mention in copy
  // ============================================================================
  brands: {
    headline: 'Quality Equipment We Install',

    // Brands list
    list: [
      { name: 'Ducane', logo: '/images/brands/ducane.png', featured: true },
      { name: 'Lennox', logo: '/images/brands/lennox.png', featured: true },
      { name: 'Rheem', logo: '/images/brands/rheem.png', featured: true },
      { name: 'Carrier', logo: '/images/brands/carrier.png', featured: false },
      { name: 'Goodman', logo: '/images/brands/goodman.png', featured: false },
      { name: 'York', logo: '/images/brands/york.png', featured: false },
    ],

    // Show on homepage
    showOnHomepage: true,
    homepageLimit: 6, // Show only featured + fill to this number
  },

  // ============================================================================
  // TRUST BADGES
  // Credibility indicators shown prominently
  // ============================================================================
  trustBadges: {
    showOnHomepage: true,

    badges: [
      {
        id: 'professional',
        label: 'Professional',
        sublabel: 'Service',
        icon: 'shield-check',
        enabled: true,
      },
      {
        id: 'honest',
        label: 'Honest',
        sublabel: 'No Upselling',
        icon: 'check-circle',
        enabled: true,
      },
      {
        id: 'available',
        label: '24/7',
        sublabel: 'On-Call Service',
        icon: 'star',
        enabled: true,
      },
      {
        id: 'local',
        label: 'Local Business',
        sublabel: 'Saskatoon & Area',
        icon: 'home',
        enabled: true,
      },
    ],
  },

  // ============================================================================
  // SEO CONFIGURATION
  // ============================================================================
  seo: {
    // Title template
    titleTemplate: '{page} | {business} | Saskatoon HVAC',

    // Default meta description
    defaultDescription: 'Professional HVAC and refrigeration services in Saskatoon and area. Heating, cooling, walk-in cooler and freezer repair and maintenance. 24/7 on-call service.',

    // Schema.org type
    schemaType: 'HVACBusiness',

    // Local business schema
    localBusiness: {
      enabled: true,
      priceRange: '$$',
      areaServed: [], // Populated from serviceArea.cities
    },
  },

  // ============================================================================
  // PAGES CONFIGURATION
  // Control which pages are generated
  // ============================================================================
  pages: {
    home: { enabled: true, slug: '/' },
    about: { enabled: true, slug: '/about' },
    services: { enabled: true, slug: '/services' },
    contact: { enabled: true, slug: '/contact' },

    // Feature-dependent pages
    emergency: {
      enabled: true, // features.emergency.enabled
      slug: '/emergency',
    },
    serviceAreas: {
      enabled: true, // features.serviceArea.enabled
      slug: '/service-areas',
    },
    maintenancePlans: {
      enabled: true, // features.maintenancePlans.enabled
      slug: '/maintenance-plans',
    },
    financing: {
      enabled: true, // features.financing.enabled
      slug: '/financing',
    },
    gallery: {
      enabled: true, // features.gallery.enabled
      slug: '/gallery',
    },
    blog: {
      enabled: true, // features.blog.enabled
      slug: '/blog',
    },
    coupons: {
      enabled: false, // features.coupons.enabled
      slug: '/specials',
    },
  },
};

export default hvacConfig;
