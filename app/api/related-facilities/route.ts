import { NextRequest, NextResponse } from 'next/server';
import { getAllFacilities, type Facility } from '@/lib/data';

interface FacilityWithScore extends Facility {
  score: number;
  matchReason?: string;
  distance?: number;
}

// Haversine distance formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const excludeSlug = searchParams.get('exclude');
    const city = searchParams.get('city');
    const type = searchParams.get('type');
    const state = searchParams.get('state');
    const county = searchParams.get('county');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const allFacilities = await getAllFacilities();

    // Filter out current facility
    let candidates = allFacilities.filter(f => f.slug !== excludeSlug);

    // Score and categorize facilities
    const scoredFacilities: FacilityWithScore[] = candidates.map(facility => {
      let score = 0;
      let matchReason = '';
      let distance: number | undefined;

      // Priority 1: Same city (highest priority)
      if (city && facility.city?.toLowerCase() === city.toLowerCase()) {
        score += 100;
        matchReason = 'Same City';
      }

      // Priority 2: Same type + same county
      if (type && county) {
        const typeMatch = facility.type_slug?.toLowerCase() === type.toLowerCase() ||
                         facility.type?.toLowerCase().includes(type.toLowerCase());
        const countyMatch = facility.county?.toLowerCase() === county.toLowerCase();

        if (typeMatch && countyMatch) {
          score += 80;
          if (!matchReason) matchReason = 'Same Type & County';
        } else if (typeMatch) {
          score += 40;
          if (!matchReason) matchReason = 'Same Type';
        } else if (countyMatch) {
          score += 30;
          if (!matchReason) matchReason = 'Same County';
        }
      } else if (type) {
        const typeMatch = facility.type_slug?.toLowerCase() === type.toLowerCase() ||
                         facility.type?.toLowerCase().includes(type.toLowerCase());
        if (typeMatch) {
          score += 40;
          if (!matchReason) matchReason = 'Same Type';
        }
      }

      // Priority 3: Same type + same state
      if (type && state) {
        const typeMatch = facility.type_slug?.toLowerCase() === type.toLowerCase() ||
                         facility.type?.toLowerCase().includes(type.toLowerCase());
        const stateMatch = facility.state?.toLowerCase() === state.toLowerCase() ||
                          facility.state_abbr?.toLowerCase() === state.toLowerCase();

        if (typeMatch && stateMatch) {
          score += 50;
          if (!matchReason) matchReason = 'Same Type & State';
        }
      }

      // Priority 4: Same state (base relevance)
      if (state) {
        const stateMatch = facility.state?.toLowerCase() === state.toLowerCase() ||
                          facility.state_abbr?.toLowerCase() === state.toLowerCase();
        if (stateMatch) {
          score += 20;
          if (!matchReason) matchReason = 'Same State';
        }
      }

      // Distance bonus if coordinates provided
      if (lat && lng && facility.latitude && facility.longitude) {
        distance = calculateDistance(
          parseFloat(lat),
          parseFloat(lng),
          facility.latitude,
          facility.longitude
        );

        // Closer facilities get higher scores (max 50 points for <1 mile)
        if (distance < 1) score += 50;
        else if (distance < 5) score += 40;
        else if (distance < 10) score += 30;
        else if (distance < 25) score += 20;
        else if (distance < 50) score += 10;

        if (!matchReason && distance < 10) {
          matchReason = 'Nearby';
        }
      }

      // Bonus for facilities with ratings and photos
      if (facility.rating) score += 5;
      if (facility.photo || facility.photo_url) score += 5;
      if (facility.review_count && facility.review_count > 10) score += 5;

      return {
        ...facility,
        score,
        matchReason: matchReason || undefined,
        distance
      };
    });

    // Sort by score (descending), then by distance if available
    scoredFacilities.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }
      return 0;
    });

    // Take top results
    const results = scoredFacilities
      .filter(f => f.score > 0)
      .slice(0, limit)
      .map(({ score, ...rest }) => rest); // Remove score from response

    return NextResponse.json(
      { facilities: results },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching related facilities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch related facilities', facilities: [] },
      { status: 500 }
    );
  }
}
