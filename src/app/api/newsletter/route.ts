import { NextRequest, NextResponse } from 'next/server';

// Newsletter signups are proxied through our own origin: the site CSP's
// connect-src doesn't (and needn't) allow sibforms.com, so a browser-side
// fetch to Brevo is blocked. Brevo's form endpoint answers {"success":true}
// even for invalid input, so validation happens here; what this route can
// reliably report is a network failure or a Brevo outage.
// Upgrading to Brevo's Contacts API (needs an API key + list id) would also
// confirm each individual signup.

export const maxDuration = 10;

const BREVO_FORM_URL =
  'https://b15138b6.sibforms.com/serve/MUIFAOwmr3O2pUC0JwxhUO33Gtk7KOqHafuooQffpcwbpwvukxO_KjFdXdJ94mg3dohWwtqZHqbUf9fie3SinOqwOMAqeIr0IjoEoGJvVIfQ9k2CyozaAAmjC34YDF4nimW4H95Rprjd8pRQ3yHsdZx7zNaKlb603EbyZ-z-xl-huvYRjyDBmVt68SGFtzdInTGmUbwwHmr0ZYkaBg==';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-instance limit (same approach as /api/send-email).
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  for (const [key, value] of rateLimitStore) {
    if (now > value.resetTime) rateLimitStore.delete(key);
  }
  const entry = rateLimitStore.get(ip);
  if (!entry) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  let body: { email?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success, send nothing.
  if (typeof body.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many attempts. Please try again later.' }, { status: 429 });
  }

  const form = new FormData();
  form.set('EMAIL', email);
  form.set('email_address_check', '');
  form.set('locale', 'en');
  form.set('html_type', 'simple');

  try {
    const res = await fetch(BREVO_FORM_URL, {
      method: 'POST',
      body: form,
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (!res.ok || !data?.success) {
      console.error('Newsletter: Brevo rejected signup', res.status);
      return NextResponse.json({ ok: false, error: 'Signup failed. Please try again shortly.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Newsletter: Brevo request failed', error);
    return NextResponse.json({ ok: false, error: 'Signup failed. Please try again shortly.' }, { status: 502 });
  }
}
