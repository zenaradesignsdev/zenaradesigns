import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The only host that should ever be indexed. Everything else — Vercel preview
// deployments (*.vercel.app), staging, and client-demo subdomains such as
// project*.zenaradesigns.com — must carry a noindex header so they don't
// compete with the canonical domain in search results.
//
// NOTE: this protects any non-canonical host served by THIS app/deployment.
// Demo sites that are *separate* Vercel projects must also be noindexed at
// their own source (see SEO-RANKING-PLAN.md §3.1).
const CANONICAL_HOST = 'zenaradesigns.com';

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();
  const response = NextResponse.next();

  if (hostname !== CANONICAL_HOST && hostname !== `www.${CANONICAL_HOST}`) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  // Run on pages only — skip Next.js internals and static assets.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
