import { NextResponse } from 'next/server';
import { getStats } from '@/lib/data';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const stats = await getStats();

    // Return stats in format expected by homepage
    return NextResponse.json({
      totalFacilities: stats.total_facilities,
      totalStates: stats.states_with_facilities,
      totalCities: stats.cities_with_facilities,
      totalCounties: stats.counties_with_facilities,
      totalTreatmentTypes: stats.total_treatment_types,
      totalFacilityTypes: stats.total_facility_types,
      withRatings: stats.with_ratings,
      withPhotos: stats.with_photos,
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
