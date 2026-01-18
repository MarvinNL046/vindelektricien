import { NextResponse } from 'next/server';
import { getAllFacilities } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  const typeFilter = searchParams.get('type')?.toLowerCase().trim() || '';
  const stateFilter = searchParams.get('state')?.toLowerCase().trim() || '';

  try {
    const facilities = await getAllFacilities();

    // If empty query and no filters, return all facilities (for counting)
    if (query === '' && !typeFilter && !stateFilter) {
      return NextResponse.json(facilities);
    }

    // Filter facilities based on search criteria
    const results = facilities.filter(facility => {
      // Search query filter
      const matchesQuery = !query ||
        facility.name.toLowerCase().includes(query) ||
        facility.city.toLowerCase().includes(query) ||
        facility.state.toLowerCase().includes(query) ||
        facility.type.toLowerCase().includes(query) ||
        (facility.county && facility.county.toLowerCase().includes(query)) ||
        (facility.zipCode && facility.zipCode.toLowerCase().includes(query)) ||
        (facility.address && facility.address.toLowerCase().includes(query));

      // Type filter
      const typeSlug = facility.type_slug || facility.type.toLowerCase().replace(/ /g, '-');
      const matchesType = !typeFilter || typeFilter === 'all' || typeSlug === typeFilter;

      // State filter
      const matchesState = !stateFilter || stateFilter === 'all' ||
        facility.state.toLowerCase() === stateFilter.toLowerCase() ||
        facility.state_abbr.toLowerCase() === stateFilter.toLowerCase();

      return matchesQuery && matchesType && matchesState;
    });

    // Sort results by relevance (exact matches first)
    results.sort((a, b) => {
      const aExact = a.name.toLowerCase() === query ||
                     a.city.toLowerCase() === query;
      const bExact = b.name.toLowerCase() === query ||
                     b.city.toLowerCase() === query;

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      // Secondary sort by rating if available
      const aRating = a.rating || 0;
      const bRating = b.rating || 0;
      return bRating - aRating;
    });

    // Return all results (let the frontend handle pagination)
    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
