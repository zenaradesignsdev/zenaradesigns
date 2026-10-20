import { NextRequest, NextResponse } from 'next/server';
import { fetchGoogleReviews } from '@/lib/google-reviews';

export const maxDuration = 10;

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

  const result = await fetchGoogleReviews();
  if (result.ok === false) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews from Google Places API', success: false },
      { status: result.status, headers: corsHeaders }
    );
  }

  return NextResponse.json({ success: true, data: result.data }, { status: 200, headers: corsHeaders });
}
