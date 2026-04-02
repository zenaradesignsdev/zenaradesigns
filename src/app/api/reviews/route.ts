import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 10;

interface GooglePlaceReview {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: { text: string; languageCode: string };
  originalText: { text: string; languageCode: string };
  authorAttribution: { displayName: string; uri: string; photoUri?: string };
  publishTime: string;
}

interface GooglePlaceResponse {
  name: string;
  rating?: number | { rating?: number; userRatingCount?: number };
  reviews?: GooglePlaceReview[];
  displayName?: { text: string; languageCode: string };
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_REQUESTS = 10;
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) rateLimitStore.delete(key);
  }
  lastCleanup = now;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) cleanupExpiredEntries();

  const userLimit = rateLimitStore.get(ip);
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (userLimit.count >= MAX_REQUESTS) return false;
  userLimit.count++;
  return true;
}

const allowedOrigins = [
  'https://zenaradesigns.com',
  'https://www.zenaradesigns.com',
  'http://localhost:3000',
  'http://localhost:3001',
];

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': isAllowed ? origin! : (process.env.ALLOWED_ORIGIN || 'https://zenaradesigns.com'),
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, { status: 200, headers: getCorsHeaders(origin) });
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  const clientIP =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(clientIP)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.', success: false },
      { status: 429, headers: corsHeaders }
    );
  }

  if (!process.env.GOOGLE_PLACE_ID || !process.env.GOOGLE_PLACES_API_KEY) {
    // Return empty data gracefully so the UI renders without reviews in dev
    return NextResponse.json(
      { success: true, data: { displayName: 'Zenara Designs', rating: 5, userRatingCount: 0, reviews: [] } },
      { status: 200, headers: corsHeaders }
    );
  }

  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount,displayName',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to fetch reviews from Google Places API', success: false },
        { status: response.status, headers: corsHeaders }
      );
    }

    const data: GooglePlaceResponse = await response.json();

    const reviews = data.reviews || [];
    const rating =
      typeof data.rating === 'number'
        ? data.rating
        : typeof data.rating === 'object' && data.rating !== null && 'rating' in data.rating
        ? (data.rating as { rating?: number }).rating || 0
        : 0;
    const userRatingCount =
      typeof data.rating === 'object' && data.rating !== null && 'userRatingCount' in data.rating
        ? (data.rating as { userRatingCount?: number }).userRatingCount || 0
        : 0;
    const displayName = data.displayName?.text || data.name || '';

    const latestReviews = reviews
      .sort((a, b) => {
        const timeA = a.publishTime ? new Date(a.publishTime).getTime() : 0;
        const timeB = b.publishTime ? new Date(b.publishTime).getTime() : 0;
        return timeB - timeA;
      })
      .slice(0, 5)
      .map((review) => ({
        name: review.authorAttribution?.displayName || 'Anonymous',
        rating: review.rating || 5,
        text: review.text?.text || review.originalText?.text || '',
        relativeTime: review.relativePublishTimeDescription || 'Recently',
        publishTime: review.publishTime || new Date().toISOString(),
        photoUri: review.authorAttribution?.photoUri,
      }));

    return NextResponse.json(
      { success: true, data: { displayName, rating, userRatingCount, reviews: latestReviews } },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error('Error fetching Google Reviews:', err);
    return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500, headers: corsHeaders });
  }
}
