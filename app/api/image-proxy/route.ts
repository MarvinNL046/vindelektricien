import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Image proxy that fetches and caches external images
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  // Validate URL is from allowed domains
  const allowedDomains = [
    'lh3.googleusercontent.com',
    'maps.googleapis.com',
    'images.unsplash.com',
    'upload.wikimedia.org',
    'commons.wikimedia.org',
  ];

  try {
    const url = new URL(imageUrl);
    if (!allowedDomains.some(domain => url.hostname.includes(domain))) {
      return new NextResponse('Domain not allowed', { status: 403 });
    }
  } catch {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  try {
    // Fetch the image from the source
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RehabNearMe/1.0)',
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      // Return placeholder if image fetch fails
      const origin = request.nextUrl.origin;
      const placeholderResponse = await fetch(`${origin}/images/placeholder.svg`);
      return new NextResponse(placeholderResponse.body, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // Get content type from response
    const contentType = response.headers.get('Content-Type') || 'image/jpeg';

    // Return the fetched image
    return new NextResponse(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    // Return placeholder on error
    const origin = request.nextUrl.origin;
    const placeholderResponse = await fetch(`${origin}/images/placeholder.svg`);
    return new NextResponse(placeholderResponse.body, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}
