import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /payments is noindex via its page metadata. It must stay crawlable —
        // a Disallow here would stop Google fetching the page at all, so it
        // could never read the noindex and would keep the URL indexed.
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://zenaradesigns.com/sitemap.xml',
    host: 'https://zenaradesigns.com',
  };
}
