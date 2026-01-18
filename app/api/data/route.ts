import { NextResponse } from 'next/server';
import { getAllStates, getAllCounties, getAllFacilityTypes } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    switch (type) {
      case 'states':
        const states = await getAllStates();
        return NextResponse.json(states);

      case 'counties':
        const counties = await getAllCounties();
        return NextResponse.json(counties);

      case 'types':
        const types = await getAllFacilityTypes();
        return NextResponse.json(types);

      default:
        return NextResponse.json({ error: 'Invalid type parameter. Use: states, counties, or types' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
