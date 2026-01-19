import { getAllFacilities, getAllFacilityTypes, createStateSlug, createTypeSlug } from './data';

// Interfaces for footer data
export interface FooterState {
  name: string;
  slug: string;
  count: number;
}

export interface FooterType {
  name: string;
  slug: string;
  count: number;
}

export interface FooterGuide {
  href: string;
  label: string;
  description?: string;
}

// Service types section (Diensten)
export const serviceTypes: FooterGuide[] = [
  {
    href: '/dienst/storingen',
    label: 'Storingen & Reparaties',
    description: '24/7 hulp bij elektrische storingen'
  },
  {
    href: '/dienst/installatie',
    label: 'Installatie',
    description: 'Nieuwe elektrische installaties'
  },
  {
    href: '/dienst/meterkast',
    label: 'Meterkast & Groepenkast',
    description: 'Vervangen en uitbreiden van meterkasten'
  },
  {
    href: '/dienst/laadpaal',
    label: 'Laadpaal Installatie',
    description: 'Laadpunten voor elektrische voertuigen'
  },
  {
    href: '/dienst/zonnepanelen',
    label: 'Zonnepanelen',
    description: 'Installatie van zonnepanelen en omvormers'
  },
  {
    href: '/dienst/domotica',
    label: 'Domotica & Smart Home',
    description: 'Slimme huisautomatisering'
  }
];

// Backwards compatibility alias
export const treatmentTypes = serviceTypes;

// Information resources section (Informatie)
export const resources: FooterGuide[] = [
  {
    href: '/informatie/elektricien-kiezen',
    label: 'Elektricien Kiezen',
    description: 'Tips voor het kiezen van de juiste elektricien'
  },
  {
    href: '/informatie/kosten',
    label: 'Kosten & Tarieven',
    description: 'Wat kost een elektricien?'
  },
  {
    href: '/informatie/certificeringen',
    label: 'Certificeringen',
    description: 'Erkend, VCA, NEN en meer'
  },
  {
    href: '/informatie/storingen',
    label: 'Storingen Oplossen',
    description: 'Wat te doen bij stroomuitval'
  },
  {
    href: '/informatie/veiligheid',
    label: 'Elektrische Veiligheid',
    description: 'Veiligheidstips voor elektra'
  },
  {
    href: '/informatie/energiebesparing',
    label: 'Energiebesparing',
    description: 'Bespaar op uw energiekosten'
  }
];

// DIY and safety tips section
export const support: FooterGuide[] = [
  {
    href: '/informatie/noodgevallen',
    label: 'Noodgevallen',
    description: 'Wat te doen bij een elektrische noodsituatie'
  },
  {
    href: '/informatie/verhuizen',
    label: 'Verhuizen & Elektra',
    description: 'Elektriciteit bij verhuizing'
  },
  {
    href: '/informatie/verbouwen',
    label: 'Verbouwen',
    description: 'Elektrische planning bij verbouwingen'
  },
  {
    href: '/informatie/bedrijf',
    label: 'Zakelijke Klanten',
    description: 'Elektriciens voor bedrijven'
  },
  {
    href: '/informatie/subsidies',
    label: 'Subsidies',
    description: 'Subsidies voor verduurzaming'
  }
];

// Static guides content (pillar pages)
export const guides: FooterGuide[] = [
  {
    href: '/informatie/diensten-overzicht',
    label: 'Diensten Overzicht',
    description: 'Alle elektrische diensten uitgelegd'
  },
  {
    href: '/informatie/wat-verwachten',
    label: 'Wat te Verwachten',
    description: 'Een elektricien inhuren: de stappen'
  },
  {
    href: '/informatie/prijzen',
    label: 'Prijzen & Offertes',
    description: 'Tarieven en offerteaanvragen'
  },
  {
    href: '/informatie/keuring',
    label: 'NEN-keuringen',
    description: 'Elektrische keuringen en inspecties'
  },
  {
    href: '/informatie/verduurzamen',
    label: 'Verduurzamen',
    description: 'Uw huis elektrisch verduurzamen'
  }
];

// Cache for footer data
let provincesCacheFooter: FooterState[] | null = null;
let typesCacheFooter: FooterType[] | null = null;

/**
 * Get top provinces by facility count
 * @param limit - Maximum number of provinces to return (default 8)
 * @returns Array of provinces sorted by facility count (descending)
 */
export async function getTopStatesByFacilityCount(limit: number = 8): Promise<FooterState[]> {
  return getTopProvincesByFacilityCount(limit);
}

export async function getTopProvincesByFacilityCount(limit: number = 8): Promise<FooterState[]> {
  if (provincesCacheFooter && provincesCacheFooter.length >= limit) {
    return provincesCacheFooter.slice(0, limit);
  }

  try {
    const facilities = await getAllFacilities();

    // Count facilities per province
    const provinceCounts = new Map<string, number>();

    for (const facility of facilities) {
      const province = facility.province || (facility as unknown as { state?: string }).state;
      if (province && province.trim()) {
        const provinceName = province.trim();
        provinceCounts.set(provinceName, (provinceCounts.get(provinceName) || 0) + 1);
      }
    }

    // Convert to array and sort by count
    const sortedProvinces: FooterState[] = Array.from(provinceCounts.entries())
      .map(([name, count]) => ({
        name,
        slug: createStateSlug(name),
        count
      }))
      .sort((a, b) => b.count - a.count);

    // Cache the full list
    provincesCacheFooter = sortedProvinces;

    return sortedProvinces.slice(0, limit);
  } catch (error) {
    console.error('Error getting top provinces:', error);
    return [];
  }
}

/**
 * Get top facility types by count
 * @param limit - Maximum number of types to return (default 8)
 * @returns Array of types sorted by facility count (descending)
 */
export async function getTopTypesByFacilityCount(limit: number = 8): Promise<FooterType[]> {
  if (typesCacheFooter && typesCacheFooter.length >= limit) {
    return typesCacheFooter.slice(0, limit);
  }

  try {
    const facilities = await getAllFacilities();
    const allTypes = await getAllFacilityTypes();

    // Count facilities per type
    const typeCounts = new Map<string, number>();
    const typeNames = new Map<string, string>();

    // Build a lookup for type names
    for (const type of allTypes) {
      typeNames.set(type.slug, type.name);
    }

    for (const facility of facilities) {
      if (facility.type_slug && facility.type_slug.trim()) {
        const typeSlug = facility.type_slug.trim();
        typeCounts.set(typeSlug, (typeCounts.get(typeSlug) || 0) + 1);

        // Store display name if we have it
        if (facility.type && !typeNames.has(typeSlug)) {
          typeNames.set(typeSlug, facility.type);
        }
      } else if (facility.type && facility.type.trim()) {
        const typeSlug = createTypeSlug(facility.type.trim());
        typeCounts.set(typeSlug, (typeCounts.get(typeSlug) || 0) + 1);
        typeNames.set(typeSlug, facility.type.trim());
      }
    }

    // Convert to array and sort by count
    const sortedTypes: FooterType[] = Array.from(typeCounts.entries())
      .map(([slug, count]) => ({
        name: formatTypeName(typeNames.get(slug) || slug),
        slug,
        count
      }))
      .sort((a, b) => b.count - a.count);

    // Cache the full list
    typesCacheFooter = sortedTypes;

    return sortedTypes.slice(0, limit);
  } catch (error) {
    console.error('Error getting top types:', error);
    return [];
  }
}

/**
 * Format type name for display
 */
function formatTypeName(name: string): string {
  // Convert slug-style names to title case
  if (name.includes('-')) {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Capitalize first letter of each word
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Get all footer data in a single call (for server components)
 */
export async function getFooterData(provinceLimit: number = 8, typeLimit: number = 8) {
  const [topProvinces, topTypes] = await Promise.all([
    getTopProvincesByFacilityCount(provinceLimit),
    getTopTypesByFacilityCount(typeLimit)
  ]);

  return {
    states: topProvinces,  // Backwards compatibility
    provinces: topProvinces,
    types: topTypes,
    serviceTypes,
    treatmentTypes: serviceTypes,  // Backwards compatibility
    resources,
    support,
    guides
  };
}

/**
 * Clear cache (useful for development/testing)
 */
export function clearFooterCache() {
  provincesCacheFooter = null;
  typesCacheFooter = null;
}
