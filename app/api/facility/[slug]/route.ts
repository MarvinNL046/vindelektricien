import { NextResponse } from 'next/server';
import { getFacilityBySlug } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const facility = await getFacilityBySlug(slug);

    if (!facility) {
      return NextResponse.json({ error: 'Facility not found' }, { status: 404 });
    }

    return NextResponse.json(facility);
  } catch (error) {
    console.error('Facility API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
