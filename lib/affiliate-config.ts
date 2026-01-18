/**
 * Affiliate Partner Configuration
 *
 * Add affiliate partners here. Set 'active: true' when you have a partner.
 * Ads are only shown when there is at least one active partner.
 */

export interface AffiliatePartner {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
  buttonText: string;
  active: boolean;
  // Optional tracking parameters
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export const affiliatePartners: AffiliatePartner[] = [
  {
    id: 'treatment-insurance',
    name: 'Compare Treatment Insurance',
    description: 'Compare health insurance plans that cover addiction treatment and save on your recovery.',
    url: 'https://example.com/treatment-insurance',
    imageUrl: '/images/affiliates/treatment-insurance.png',
    buttonText: 'Compare now',
    active: false, // Set to true when you have a partner
    utmSource: 'rehabnearbyme',
    utmMedium: 'sidebar',
    utmCampaign: 'treatment-insurance',
  },
  {
    id: 'recovery-support',
    name: 'Recovery Support Services',
    description: 'Find aftercare support, sober living, and ongoing recovery resources.',
    url: 'https://example.com/recovery-support',
    imageUrl: '/images/affiliates/recovery-support.png',
    buttonText: 'Learn more',
    active: false,
    utmSource: 'rehabnearbyme',
    utmMedium: 'sidebar',
    utmCampaign: 'recovery-support',
  },
  {
    id: 'mental-health',
    name: 'Mental Health Services',
    description: 'Connect with licensed therapists and counselors specializing in addiction.',
    url: 'https://example.com/mental-health',
    imageUrl: '/images/affiliates/mental-health.png',
    buttonText: 'Get help',
    active: false,
    utmSource: 'rehabnearbyme',
    utmMedium: 'sidebar',
    utmCampaign: 'mental-health',
  },
  {
    id: 'intervention-services',
    name: 'Intervention Services',
    description: 'Professional intervention specialists to help your loved one get treatment.',
    url: 'https://example.com/intervention',
    imageUrl: '/images/affiliates/intervention.png',
    buttonText: 'Find specialist',
    active: false,
    utmSource: 'rehabnearbyme',
    utmMedium: 'sidebar',
    utmCampaign: 'intervention-services',
  },
];

/**
 * Helper function to get active partners
 */
export function getActivePartners(): AffiliatePartner[] {
  return affiliatePartners.filter(partner => partner.active);
}

/**
 * Helper function to check if there are active partners
 */
export function hasActivePartners(): boolean {
  return affiliatePartners.some(partner => partner.active);
}

/**
 * Helper function to build affiliate URL with UTM parameters
 */
export function buildAffiliateUrl(partner: AffiliatePartner): string {
  const url = new URL(partner.url);

  if (partner.utmSource) {
    url.searchParams.set('utm_source', partner.utmSource);
  }
  if (partner.utmMedium) {
    url.searchParams.set('utm_medium', partner.utmMedium);
  }
  if (partner.utmCampaign) {
    url.searchParams.set('utm_campaign', partner.utmCampaign);
  }

  return url.toString();
}
