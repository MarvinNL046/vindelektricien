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

// Treatment types section
export const treatmentTypes: FooterGuide[] = [
  {
    href: '/treatment/inpatient-rehab',
    label: 'Inpatient Rehab',
    description: 'Residential treatment programs'
  },
  {
    href: '/treatment/outpatient-programs',
    label: 'Outpatient Programs',
    description: 'Flexible treatment while living at home'
  },
  {
    href: '/treatment/detox-centers',
    label: 'Detox Centers',
    description: 'Medical detoxification services'
  },
  {
    href: '/treatment/sober-living',
    label: 'Sober Living Homes',
    description: 'Transitional housing for recovery'
  },
  {
    href: '/treatment/dual-diagnosis',
    label: 'Dual Diagnosis',
    description: 'Co-occurring mental health treatment'
  },
  {
    href: '/treatment/luxury-rehab',
    label: 'Luxury Rehab',
    description: 'Premium treatment facilities'
  }
];

// Addiction resources section
export const resources: FooterGuide[] = [
  {
    href: '/guides/alcohol-addiction',
    label: 'Alcohol Addiction',
    description: 'Understanding and treating alcoholism'
  },
  {
    href: '/guides/opioid-addiction',
    label: 'Opioid Addiction',
    description: 'Heroin, fentanyl, and prescription opioid treatment'
  },
  {
    href: '/guides/drug-addiction',
    label: 'Drug Addiction',
    description: 'Cocaine, meth, and substance abuse treatment'
  },
  {
    href: '/guides/prescription-drugs',
    label: 'Prescription Drug Abuse',
    description: 'Benzodiazepine and prescription addiction'
  },
  {
    href: '/guides/insurance-coverage',
    label: 'Insurance Coverage',
    description: 'Understanding rehab insurance options'
  },
  {
    href: '/guides/choosing-rehab',
    label: 'Choosing a Rehab',
    description: 'How to find the right treatment center'
  }
];

// Support resources section
export const support: FooterGuide[] = [
  {
    href: '/guides/family-support',
    label: 'Family Support',
    description: 'Resources for loved ones'
  },
  {
    href: '/guides/intervention',
    label: 'Intervention Guide',
    description: 'How to help someone get treatment'
  },
  {
    href: '/guides/aftercare',
    label: 'Aftercare & Relapse Prevention',
    description: 'Maintaining long-term recovery'
  },
  {
    href: '/guides/veterans-programs',
    label: 'Veterans Programs',
    description: 'Treatment for military veterans'
  },
  {
    href: '/guides/teen-treatment',
    label: 'Teen & Adolescent',
    description: 'Youth addiction treatment programs'
  }
];

// Static guides content (pillar pages)
export const guides: FooterGuide[] = [
  {
    href: '/guides/treatment-types',
    label: 'Types of Treatment',
    description: 'Understand different treatment options'
  },
  {
    href: '/guides/what-to-expect',
    label: 'What to Expect in Rehab',
    description: 'Guide to the treatment process'
  },
  {
    href: '/guides/paying-for-rehab',
    label: 'Paying for Rehab',
    description: 'Financial options and insurance'
  },
  {
    href: '/guides/signs-of-addiction',
    label: 'Signs of Addiction',
    description: 'Recognizing substance abuse'
  },
  {
    href: '/guides/recovery-success',
    label: 'Recovery Success Stories',
    description: 'Inspiring stories of recovery'
  }
];

// Cache for footer data
let statesCacheFooter: FooterState[] | null = null;
let typesCacheFooter: FooterType[] | null = null;

/**
 * Get top states by facility count
 * @param limit - Maximum number of states to return (default 8)
 * @returns Array of states sorted by facility count (descending)
 */
export async function getTopStatesByFacilityCount(limit: number = 8): Promise<FooterState[]> {
  if (statesCacheFooter && statesCacheFooter.length >= limit) {
    return statesCacheFooter.slice(0, limit);
  }

  try {
    const facilities = await getAllFacilities();

    // Count facilities per state
    const stateCounts = new Map<string, number>();

    for (const facility of facilities) {
      if (facility.state && facility.state.trim()) {
        const state = facility.state.trim();
        stateCounts.set(state, (stateCounts.get(state) || 0) + 1);
      }
    }

    // Convert to array and sort by count
    const sortedStates: FooterState[] = Array.from(stateCounts.entries())
      .map(([name, count]) => ({
        name,
        slug: createStateSlug(name),
        count
      }))
      .sort((a, b) => b.count - a.count);

    // Cache the full list
    statesCacheFooter = sortedStates;

    return sortedStates.slice(0, limit);
  } catch (error) {
    console.error('Error getting top states:', error);
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
export async function getFooterData(stateLimit: number = 8, typeLimit: number = 8) {
  const [topStates, topTypes] = await Promise.all([
    getTopStatesByFacilityCount(stateLimit),
    getTopTypesByFacilityCount(typeLimit)
  ]);

  return {
    states: topStates,
    types: topTypes,
    treatmentTypes,
    resources,
    support,
    guides
  };
}

/**
 * Clear cache (useful for development/testing)
 */
export function clearFooterCache() {
  statesCacheFooter = null;
  typesCacheFooter = null;
}
