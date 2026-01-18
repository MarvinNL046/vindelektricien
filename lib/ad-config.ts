/**
 * AdSense Configuration
 *
 * Centralized configuration for all ad placements.
 * Each slot should be created in AdSense dashboard for proper tracking.
 *
 * Ad Slot Naming Convention:
 * - Format: {page}_{position}_{format}
 * - Example: home_hero_leaderboard, facility_sidebar_rectangle
 *
 * Performance Guidelines:
 * - Above fold: max 1 ad
 * - Per viewport: max 3 ads
 * - Minimum 300px content between ads
 */

// Publisher ID from environment or fallback
export const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-9667530069853985';

// Ad Slot IDs - Update these with actual slot IDs from AdSense
export const AD_SLOTS = {
  // Layout ads (appear on all pages)
  layout: {
    preFooter: '1122334455',       // Before footer on all pages
    anchorMobile: '2233445566',    // Mobile sticky footer
  },

  // Homepage
  home: {
    heroBelow: '3344556677',       // Below hero section
    afterStats: '4455667788',      // After statistics section
    beforeFooter: '5566778899',    // Before footer CTA
  },

  // Facility detail page
  facility: {
    afterInfo: '6677889900',       // After basic info
    sidebar: '7788990011',         // Sidebar sticky
    afterReviews: '8899001122',    // After reviews section
    afterMap: '9900112233',        // After map
  },

  // Search/listing pages
  search: {
    topLeaderboard: '1011121314',  // Top of results
    inFeed: '1112131415',          // Between results
    sidebar: '1213141516',         // Sidebar
  },

  // State/city pages
  state: {
    afterHero: '1314151617',       // Leaderboard after hero section
    inContent: '1415161718',       // Inline ad in content
    sidebar: '1516171819',
    beforeFooter: '1617181920',
  },

  city: {
    topLeaderboard: '1617181920',
    inFeed: '1718192021',
    sidebar: '1819202122',
  },

  county: {
    afterHero: '1920212223',       // Leaderboard after hero
    inContent: '2021222324',       // Inline ad in content
    sidebar: '2122232425',
  },

  // Blog/content pages
  blog: {
    topLeaderboard: '2122232425',
    inArticle1: '2223242526',      // After 2nd paragraph
    inArticle2: '2324252627',      // After 5th paragraph
    sidebar: '2425262728',
    afterContent: '2526272829',
  },

  // Guide pages
  guide: {
    topLeaderboard: '2627282930',
    inContent: '2728293031',
    sidebar: '2829303132',
    multiplex: '2930313233',       // Related content
  },

  // Generic fallbacks
  generic: {
    leaderboard: '3031323334',
    rectangle: '3132333435',
    vertical: '3233343536',
    inFeed: '3334353637',
    multiplex: '3435363738',
  },
} as const;

// Ad format configurations
export const AD_FORMATS = {
  leaderboard: {
    width: 728,
    height: 90,
    mobileWidth: 320,
    mobileHeight: 50,
  },
  rectangle: {
    width: 300,
    height: 250,
  },
  largeRectangle: {
    width: 336,
    height: 280,
  },
  vertical: {
    width: 300,
    height: 600,
  },
  inFeed: {
    width: 'auto',
    height: 'auto',
  },
  anchor: {
    position: 'bottom',
    height: 50,
  },
} as const;

// Page-specific ad placement rules
export const AD_PLACEMENT_RULES = {
  // Maximum ads per page type
  maxAdsPerPage: {
    home: 3,
    facility: 4,
    search: 5,
    state: 4,
    city: 4,
    county: 3,
    blog: 5,
    guide: 5,
  },

  // Minimum content between ads (in pixels)
  minContentBetweenAds: 300,

  // Above fold ad rules
  aboveFold: {
    enabled: true,
    maxAds: 1,
    delayMs: 0, // No delay for above fold
  },

  // Below fold ad rules
  belowFold: {
    lazyLoad: true,
    rootMargin: '200px', // Load when 200px from viewport
    delayMs: 100,
  },

  // Mobile specific
  mobile: {
    enableAnchor: true,
    maxAdsVisible: 2,
  },
} as const;

// Helper function to get slot for page and position
export function getAdSlot(
  page: keyof typeof AD_SLOTS,
  position: string
): string {
  const pageSlots = AD_SLOTS[page];
  if (pageSlots && position in pageSlots) {
    return (pageSlots as Record<string, string>)[position];
  }
  // Fallback to generic slots
  if (position in AD_SLOTS.generic) {
    return (AD_SLOTS.generic as Record<string, string>)[position];
  }
  return AD_SLOTS.generic.rectangle;
}

// Check if ads should be shown (based on consent, etc.)
export function shouldShowAds(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      const parsed = JSON.parse(consent);
      return parsed.advertising === true;
    }
  } catch {
    return false;
  }
  return false;
}

// Ad viewability tracking helper
export function trackAdViewability(slotId: string, isVisible: boolean): void {
  if (typeof window === 'undefined') return;

  // Can be connected to analytics
  if (isVisible) {
    console.debug(`Ad slot ${slotId} became viewable`);
  }
}
