/**
 * Central Statistics Configuration for RehabNearMe.com
 *
 * Update these values in ONE place when data changes.
 * All components and pages import from here.
 *
 * Last update: 2025-01-18
 * - Initial setup for addiction treatment facility directory
 */

export const SITE_STATS = {
  // Display values (formatted for UI)
  totalFacilitiesDisplay: '15,000',  // Estimated treatment facilities
  totalFacilitiesExact: 15000,

  // Geographic coverage
  totalStates: 50,
  totalStatesWithDC: 51,  // 50 states + DC
  totalCounties: 3143,    // US counties

  // Dynamic placeholder (when API hasn't loaded yet)
  facilitiesPlaceholder: '15,000+',

  // Site info
  siteName: 'RehabNearMe',
  siteUrl: 'https://www.rehabnearbyme.com',
  country: 'United States',
  countryShort: 'USA',

  // Treatment facility stats
  inpatientCentersCount: 4500,
  outpatientCentersCount: 8000,
  detoxCentersCount: 2500,
  soberLivingCount: 3000,

  // Recovery statistics (SAMHSA data)
  americansInRecovery: '23 million',
  annualAdmissions: '1.5 million',
  substanceUseDisorderRate: '10%',

  // Top states by facility count
  topStates: {
    california: 2100,
    florida: 1800,
    texas: 1200,
    newYork: 1100,
    pennsylvania: 900,
  },

  // Treatment types
  treatmentTypesCount: 12,
  insuranceProvidersAccepted: 500,
  totalReviewsDisplay: '25,000+',
} as const;

/**
 * Get formatted stats description for SEO and meta tags
 */
export function getStatsDescription(variant: 'short' | 'long' | 'seo' = 'short'): string {
  switch (variant) {
    case 'short':
      return `Find treatment facilities across all ${SITE_STATS.totalStates} states.`;
    case 'long':
      return `Search our comprehensive database of ${SITE_STATS.totalFacilitiesDisplay}+ addiction treatment centers, rehabilitation facilities, and detox programs across all ${SITE_STATS.totalStates} states in the ${SITE_STATS.country}.`;
    case 'seo':
      return `Find addiction treatment centers, rehab facilities, and detox programs near you. Search by state, city, or zip code. Get verified information, insurance details, and reviews for treatment centers across the ${SITE_STATS.country}.`;
    default:
      return `Find treatment facilities across all ${SITE_STATS.totalStates} states.`;
  }
}

/**
 * Get CTA stats text for blog pages and promotional sections
 */
export function getCtaStatsText(): string {
  return `Search directly for treatment centers in our extensive database with more than ${SITE_STATS.totalFacilitiesDisplay} facilities.`;
}

/**
 * Get FAQ answer about facility count
 */
export function getFaqFacilitiesAnswer(): string {
  return `The ${SITE_STATS.country} has approximately ${SITE_STATS.totalFacilitiesDisplay} addiction treatment facilities, including inpatient rehab centers, outpatient programs, detox centers, and sober living homes. These facilities are spread across all ${SITE_STATS.totalStates} states, offering various treatment approaches and specializations.`;
}

/**
 * Get "why us" feature text
 */
export function getComprehensiveDataText(): string {
  return `Information on treatment facilities across all ${SITE_STATS.totalStates} states with verified details, insurance information, and contact details.`;
}

/**
 * Get states message for empty state pages
 */
export function getStatesComingSoonText(): string {
  return `We're actively adding treatment facility data for all ${SITE_STATS.totalStates} states. Check back soon for updates!`;
}

/**
 * Get recovery statistics text
 */
export function getRecoveryStatsText(): string {
  return `Over ${SITE_STATS.americansInRecovery} Americans are in recovery from addiction. With ${SITE_STATS.annualAdmissions} treatment admissions annually, finding the right facility is crucial for successful recovery.`;
}
