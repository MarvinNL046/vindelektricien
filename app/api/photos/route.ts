import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import sharp from 'sharp';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const sql = neon(process.env.DATABASE_URL!);

// Max 3 photos per facility per IP per day
const DAILY_LIMIT = 3;
// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;
// Allowed formats
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip + process.env.IP_SALT || 'default-salt').digest('hex');
}

// GET: Fetch approved photos for a facility
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Facility slug is required' }, { status: 400 });
  }

  // Get current user's IP hash to check ownership
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  const currentIpHash = hashIP(ip);

  try {
    const photos = await sql`
      SELECT id, facility_slug, uploader_name, file_url, caption, created_at, ip_hash
      FROM facility_photos
      WHERE facility_slug = ${slug} AND status = 'approved'
      ORDER BY created_at DESC
      LIMIT 20
    `;

    // Add canDelete flag based on IP match
    const photosWithPermissions = photos.map(photo => ({
      id: photo.id,
      facility_slug: photo.facility_slug,
      uploader_name: photo.uploader_name,
      file_url: photo.file_url,
      caption: photo.caption,
      created_at: photo.created_at,
      canDelete: photo.ip_hash === currentIpHash
    }));

    return NextResponse.json({ photos: photosWithPermissions });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}

// POST: Upload a new photo
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const slug = formData.get('slug') as string | null;
    const uploaderName = formData.get('uploaderName') as string | null;
    const uploaderEmail = formData.get('uploaderEmail') as string | null;
    const caption = formData.get('caption') as string | null;

    // Validation
    if (!file || !slug || !uploaderName) {
      return NextResponse.json(
        { error: 'File, facility, and name are required' },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only JPG, PNG, WebP, and HEIC files are allowed' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File is too large (max 10MB)' },
        { status: 400 }
      );
    }

    // Rate limiting by IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    const ipHash = hashIP(ip);

    const today = new Date().toISOString().split('T')[0];
    const recentUploads = await sql`
      SELECT COUNT(*) as count FROM facility_photos
      WHERE ip_hash = ${ipHash}
      AND facility_slug = ${slug}
      AND created_at >= ${today}::timestamp
    `;

    if (parseInt(recentUploads[0].count) >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: `You can upload a maximum of ${DAILY_LIMIT} photos per day for this facility` },
        { status: 429 }
      );
    }

    // Process image with sharp - convert to WebP
    const buffer = Buffer.from(await file.arrayBuffer());

    const processedImage = await sharp(buffer)
      .rotate() // Auto-rotate based on EXIF
      .resize(1600, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: 80,
        effort: 6 // Higher compression effort
      })
      .toBuffer();

    // Log compression results
    const originalSizeKB = Math.round(buffer.length / 1024);
    const newSizeKB = Math.round(processedImage.length / 1024);
    console.log(`Photo compressed: ${originalSizeKB}KB → ${newSizeKB}KB (${Math.round((1 - newSizeKB/originalSizeKB) * 100)}% smaller)`);

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = crypto.randomBytes(8).toString('hex');
    const fileName = `${slug}-${timestamp}-${randomId}.webp`;

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'photos');
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, processedImage);

    // File URL for database
    const fileUrl = `/uploads/photos/${fileName}`;

    // Save to database (auto-approved for now)
    const result = await sql`
      INSERT INTO facility_photos (
        facility_slug, uploader_name, uploader_email,
        file_name, file_url, file_size, caption,
        status, ip_hash
      )
      VALUES (
        ${slug}, ${uploaderName}, ${uploaderEmail || null},
        ${fileName}, ${fileUrl}, ${processedImage.length}, ${caption || null},
        'approved', ${ipHash}
      )
      RETURNING id, file_url
    `;

    return NextResponse.json({
      success: true,
      message: 'Photo uploaded successfully!',
      photo: {
        id: result[0].id,
        fileUrl: result[0].file_url
      }
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { error: 'Something went wrong while uploading' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a photo (only by the same IP that uploaded it)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get('id');

    if (!photoId) {
      return NextResponse.json({ error: 'Photo ID is required' }, { status: 400 });
    }

    // Get uploader's IP hash
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    const ipHash = hashIP(ip);

    // Find the photo and verify ownership
    const photos = await sql`
      SELECT id, file_name, file_url, ip_hash
      FROM facility_photos
      WHERE id = ${parseInt(photoId)}
    `;

    if (photos.length === 0) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    const photo = photos[0];

    // Check if the requester is the original uploader
    if (photo.ip_hash !== ipHash) {
      return NextResponse.json(
        { error: 'You can only delete your own photos' },
        { status: 403 }
      );
    }

    // Delete file from filesystem
    try {
      const filePath = path.join(process.cwd(), 'public', 'uploads', 'photos', photo.file_name);
      await unlink(filePath);
    } catch (fileError) {
      console.error('Error deleting file:', fileError);
      // Continue anyway - file might not exist
    }

    // Delete from database
    await sql`DELETE FROM facility_photos WHERE id = ${parseInt(photoId)}`;

    return NextResponse.json({
      success: true,
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Something went wrong while deleting' },
      { status: 500 }
    );
  }
}
