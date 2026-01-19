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
    id: 'energie-vergelijker',
    name: 'Energie Vergelijken',
    description: 'Vergelijk energieleveranciers en bespaar op uw energierekening.',
    url: 'https://example.com/energie-vergelijken',
    imageUrl: '/images/affiliates/energie-vergelijken.png',
    buttonText: 'Vergelijk nu',
    active: false, // Set to true when you have a partner
    utmSource: 'vindelektricien',
    utmMedium: 'sidebar',
    utmCampaign: 'energie-vergelijken',
  },
  {
    id: 'zonnepanelen-offerte',
    name: 'Zonnepanelen Offerte',
    description: 'Ontvang gratis offertes voor zonnepanelen van gecertificeerde installateurs.',
    url: 'https://example.com/zonnepanelen',
    imageUrl: '/images/affiliates/zonnepanelen.png',
    buttonText: 'Vraag offerte aan',
    active: false,
    utmSource: 'vindelektricien',
    utmMedium: 'sidebar',
    utmCampaign: 'zonnepanelen-offerte',
  },
  {
    id: 'laadpaal-kopen',
    name: 'Laadpaal Kopen',
    description: 'Vergelijk laadpalen en vind de beste deal voor uw elektrische auto.',
    url: 'https://example.com/laadpaal',
    imageUrl: '/images/affiliates/laadpaal.png',
    buttonText: 'Bekijk aanbod',
    active: false,
    utmSource: 'vindelektricien',
    utmMedium: 'sidebar',
    utmCampaign: 'laadpaal-kopen',
  },
  {
    id: 'gereedschap-shop',
    name: 'Elektrisch Gereedschap',
    description: 'Professioneel elektrisch gereedschap voor klussers en vakmensen.',
    url: 'https://example.com/gereedschap',
    imageUrl: '/images/affiliates/gereedschap.png',
    buttonText: 'Bekijk shop',
    active: false,
    utmSource: 'vindelektricien',
    utmMedium: 'sidebar',
    utmCampaign: 'gereedschap-shop',
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
