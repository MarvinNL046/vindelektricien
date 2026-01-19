/**
 * Central Statistics Configuration for VindElektricien.nl
 *
 * Update these values in ONE place when data changes.
 * All components and pages import from here.
 *
 * Last update: 2025-01-18
 * - Initial setup for electrician directory in Netherlands
 */

export const SITE_STATS = {
  // Display values (formatted for UI)
  totalFacilitiesDisplay: '1.500',  // Estimated electricians
  totalFacilitiesExact: 1500,

  // Geographic coverage
  totalProvinces: 12,
  totalMunicipalities: 342,    // Dutch municipalities
  totalCities: 2500,           // Approximate

  // Dynamic placeholder (when API hasn't loaded yet)
  facilitiesPlaceholder: '1.500+',

  // Site info
  siteName: 'VindElektricien.nl',
  siteUrl: 'https://www.vindelektricien.nl',
  country: 'Nederland',
  countryShort: 'NL',

  // Service stats
  storingsdienstCount: 800,
  installatieCount: 1200,
  laadpaalCount: 600,
  zonnepanelenCount: 500,

  // Industry statistics
  electriciansInNL: '15.000',
  annualInstallations: '500.000',
  evChargersInstalled: '400.000',

  // Top provinces by electrician count
  topProvinces: {
    noordHolland: 250,
    zuidHolland: 280,
    noordBrabant: 200,
    gelderland: 180,
    utrecht: 120,
  },

  // Service types
  serviceTypesCount: 8,
  certificationsTracked: 10,
  totalReviewsDisplay: '5.000+',
} as const;

/**
 * Get formatted stats description for SEO and meta tags
 */
export function getStatsDescription(variant: 'short' | 'long' | 'seo' = 'short'): string {
  switch (variant) {
    case 'short':
      return `Vind elektriciens in alle ${SITE_STATS.totalProvinces} provincies.`;
    case 'long':
      return `Doorzoek onze uitgebreide database van ${SITE_STATS.totalFacilitiesDisplay}+ elektriciens, installateurs en storingsdiensten in alle ${SITE_STATS.totalProvinces} provincies van ${SITE_STATS.country}.`;
    case 'seo':
      return `Vind elektriciens bij jou in de buurt. Zoek op stad, provincie of postcode. Krijg geverifieerde informatie, diensten en contactgegevens van elektriciens door heel ${SITE_STATS.country}.`;
    default:
      return `Vind elektriciens in alle ${SITE_STATS.totalProvinces} provincies.`;
  }
}

/**
 * Get CTA stats text for blog pages and promotional sections
 */
export function getCtaStatsText(): string {
  return `Zoek direct naar elektriciens in onze uitgebreide database met meer dan ${SITE_STATS.totalFacilitiesDisplay} vakmannen.`;
}

/**
 * Get FAQ answer about electrician count
 */
export function getFaqFacilitiesAnswer(): string {
  return `${SITE_STATS.country} heeft ongeveer ${SITE_STATS.electriciansInNL} geregistreerde elektriciens en installatiebedrijven. Onze database bevat ${SITE_STATS.totalFacilitiesDisplay}+ geverifieerde elektriciens, verspreid over alle ${SITE_STATS.totalProvinces} provincies, met diverse specialisaties van storingsdienst tot laadpaal installatie.`;
}

/**
 * Get "why us" feature text
 */
export function getComprehensiveDataText(): string {
  return `Informatie over elektriciens in alle ${SITE_STATS.totalProvinces} provincies met geverifieerde gegevens, diensten en contactinformatie.`;
}

/**
 * Get provinces message for empty state pages
 */
export function getProvincesComingSoonText(): string {
  return `We voegen actief elektriciens toe voor alle ${SITE_STATS.totalProvinces} provincies. Kom snel terug voor updates!`;
}

/**
 * Get industry statistics text
 */
export function getIndustryStatsText(): string {
  return `In Nederland zijn er meer dan ${SITE_STATS.electriciansInNL} actieve elektriciens. Jaarlijks worden er ${SITE_STATS.annualInstallations} elektrische installaties uitgevoerd en zijn er inmiddels ${SITE_STATS.evChargersInstalled} laadpalen geinstalleerd.`;
}
