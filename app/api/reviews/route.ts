import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// Interface for Google reviews from JSON files
interface GoogleReviewJson {
  reviewer_name: string;
  rating: number;
  review_text: string;
  review_date: string;
  reviewer_image?: string;
}

// GET - Get reviews for a facility
export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const slug = searchParams.get('slug');
    const source = searchParams.get('source') || 'all'; // 'google', 'user', 'all'

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    let googleReviews: any[] = [];
    let userReviews: any[] = [];

    // Get Google reviews from static JSON file via HTTP (works on Vercel)
    if (source === 'all' || source === 'google') {
      try {
        // Fetch from public folder via HTTP
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin || 'https://www.rehabnearbyme.com';
        const reviewsUrl = `${baseUrl}/data/reviews/${slug}.json`;

        const response = await fetch(reviewsUrl, {
          cache: 'no-store',
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          const reviewsData: GoogleReviewJson[] = await response.json();
          googleReviews = reviewsData.map((review, index) => ({
            id: index + 1,
            reviewer_name: review.reviewer_name,
            reviewer_image_url: review.reviewer_image,
            rating: review.rating,
            content: review.review_text,
            review_date: review.review_date,
            source: 'google' as const,
          }));
        }
      } catch (err) {
        console.error('Error fetching Google reviews:', err);
      }
    }

    // Get user-submitted reviews (only approved) from database
    if (source === 'all' || source === 'user') {
      try {
        userReviews = await sql`
          SELECT
            id,
            author_name as reviewer_name,
            NULL as reviewer_image_url,
            rating,
            content,
            title,
            visit_date,
            created_at as review_date,
            'user' as source
          FROM facility_reviews
          WHERE facility_slug = ${slug} AND status = 'approved'
          ORDER BY created_at DESC
          LIMIT 20
        `;
      } catch (err) {
        // Database might not have this table yet, that's okay
        console.error('Error fetching user reviews:', err);
      }
    }

    // Combine and sort by date
    const allReviews = [...googleReviews, ...userReviews].sort((a, b) => {
      const dateA = a.review_date ? new Date(a.review_date).getTime() : 0;
      const dateB = b.review_date ? new Date(b.review_date).getTime() : 0;
      return dateB - dateA;
    });

    // Calculate stats
    const allRatings = allReviews.map(r => r.rating).filter(r => r != null);
    const avgRating = allRatings.length > 0
      ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1)
      : null;

    return NextResponse.json({
      reviews: allReviews,
      stats: {
        totalReviews: allReviews.length,
        googleReviews: googleReviews.length,
        userReviews: userReviews.length,
        averageRating: avgRating,
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// POST - Submit a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      facilitySlug,
      authorName,
      authorEmail,
      rating,
      title,
      content,
      visitDate,
    } = body;

    // Validation
    if (!facilitySlug) {
      return NextResponse.json({ error: 'Facility is required' }, { status: 400 });
    }
    if (!authorName || authorName.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required (minimum 2 characters)' }, { status: 400 });
    }
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }
    if (!content || content.trim().length < 20) {
      return NextResponse.json({ error: 'Review must be at least 20 characters' }, { status: 400 });
    }

    // Get IP hash for spam prevention
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const ipHash = Buffer.from(ip).toString('base64').substring(0, 64);

    // Check for recent reviews from same IP (spam prevention)
    const recentFromIp = await sql`
      SELECT COUNT(*) as count FROM facility_reviews
      WHERE ip_hash = ${ipHash}
      AND created_at > NOW() - INTERVAL '1 hour'
    `;

    if (recentFromIp[0]?.count > 3) {
      return NextResponse.json({
        error: 'You have submitted too many reviews. Please try again later.'
      }, { status: 429 });
    }

    // Insert review (status = pending for moderation)
    const result = await sql`
      INSERT INTO facility_reviews (
        facility_slug,
        author_name,
        author_email,
        rating,
        title,
        content,
        visit_date,
        status,
        ip_hash
      ) VALUES (
        ${facilitySlug},
        ${authorName.trim()},
        ${authorEmail || null},
        ${rating},
        ${title?.trim() || null},
        ${content.trim()},
        ${visitDate || null},
        'pending',
        ${ipHash}
      )
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      message: 'Thank you for your review! It will be published after moderation.',
      reviewId: result[0]?.id,
    });
  } catch (error) {
    console.error('Submit review error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
