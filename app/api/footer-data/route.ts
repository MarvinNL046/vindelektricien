import { NextResponse } from 'next/server';
import { getFooterData } from '@/lib/footer-data';

export async function GET() {
  try {
    const data = await getFooterData(8, 8);

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer data' },
      { status: 500 }
    );
  }
}
