// TEMPORARY — delete this route (and remove the sitemap in Search Console)
// after 2026-12-15.
//
// Every URL below now 301s (see redirects in next.config.mjs), but Google last
// crawled most of them in June–August 2026, so it still indexes their old
// content and hasn't passed their signals to the destination pages. Listing
// them in a submitted sitemap with a fresh lastmod is Google's documented way
// to get redirected URLs recrawled after a site move. The list is every
// zenaradesigns.com URL Search Console has shown impressions for that now
// redirects — not every URL the wildcard redirects could match.
//
// Lives at the domain root (not /legacy/sitemap.xml) because a sitemap may
// only list URLs at or below its own directory.

const baseUrl = 'https://zenaradesigns.com';

// The day the redirects shipped (commit 51c19b6).
const lastModified = '2026-09-22';

const LEGACY_PATHS = [
  '/mobile',
  '/security',
  '/services/logo-design',
  '/services/business-cards',
  '/services/hosting',
  '/blog/importance-of-website-for-business',
  '/web-design/etobicoke',
  '/lawyers/ajax',
  '/lawyers/aurora',
  '/lawyers/burlington',
  '/lawyers/markham',
  '/lawyers/mississauga',
  '/lawyers/newmarket',
  '/lawyers/pickering',
  '/lawyers/stouffville',
  '/lawyers/toronto',
  '/lawyers/vaughan',
  '/accountants/ajax',
  '/accountants/aurora',
  '/accountants/burlington',
  '/accountants/etobicoke',
  '/accountants/markham',
  '/accountants/newmarket',
  '/accountants/north-york',
  '/accountants/oakville',
  '/accountants/oshawa',
  '/accountants/richmond-hill',
  '/accountants/scarborough',
  '/accountants/stouffville',
  '/accountants/toronto',
  '/accountants/vaughan',
  '/accountants/whitby',
  '/clinics/ajax',
  '/clinics/aurora',
  '/clinics/brampton',
  '/clinics/etobicoke',
  '/clinics/mississauga',
  '/clinics/newmarket',
  '/clinics/richmond-hill',
  '/clinics/toronto',
  '/renovations/ajax',
  '/renovations/aurora',
  '/renovations/markham',
  '/renovations/newmarket',
  '/renovations/oshawa',
  '/renovations/pickering',
  '/renovations/richmond-hill',
  '/renovations/stouffville',
  '/renovations/toronto',
  '/renovations/vaughan',
];

export const dynamic = 'force-static';

export function GET(): Response {
  const urls = LEGACY_PATHS.map(
    (path) => `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${lastModified}</lastmod>\n  </url>`,
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
