import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

// Cities we no longer target. Their /web-design pages were removed from
// generateStaticParams, so without these 301s they'd 404. Each redirects to
// /locations rather than the homepage, which preserves whatever relevance
// signal exists and avoids the soft-404 treatment Google applies to mass
// homepage redirects.
// Keep in sync with `cityContent` in src/lib/city-content.ts.
const RETIRED_CITIES = [
  'brampton',
  'oakville',
  'burlington',
  'hamilton',
  'north-york',
  'etobicoke',
  'newmarket',
  'aurora',
  'ajax',
  'whitby',
  'oshawa',
];

const retiredCityRedirects = () =>
  RETIRED_CITIES.map((city) => ({
    source: `/web-design/${city}`,
    destination: '/locations',
    permanent: true,
  }));

// The 32 /{industry}/{city} pages are gone. They were ~90% identical to one
// another and produced 850 impressions with zero clicks over 92 days.
//
// This is a wildcard rather than a city list on purpose: the old routes had no
// notFound() guard and no `dynamicParams = false`, so /lawyers/barrie returned
// 200 with a self-referencing canonical. Google could crawl an unbounded set of
// doorway pages. Matching every child slug closes that permanently.
// Pages folded into the service page that already made their argument.
// /mobile ranked at position 76 and duplicated /services/web-design;
// /security duplicated /services/website-maintenance's SSL, backup and
// monitoring copy.
// /services/logo-design and /services/business-cards merged into one
// /services/branding page — they were two halves of the same purchase.
// /services/hosting and /services/website-care merged into one
// /services/website-maintenance page — the pricing page already bundles
// hosting and analytics/reporting into one Core/Grow/Prime subscription
// ladder, so two separate service pages no longer matched reality.
// /blog/importance-of-website-for-business answered the same question as the
// website-vs-social-media post (and was the thinner of the two), so the two
// were combined into the latter.
const MERGED_PAGES = [
  { source: '/mobile', destination: '/services/web-design' },
  { source: '/security', destination: '/services/website-maintenance' },
  { source: '/services/logo-design', destination: '/services/branding' },
  { source: '/services/business-cards', destination: '/services/branding' },
  { source: '/services/hosting', destination: '/services/website-maintenance' },
  { source: '/services/website-care', destination: '/services/website-maintenance' },
  { source: '/blog/importance-of-website-for-business', destination: '/blog/website-vs-social-media-business' },
];

const mergedPageRedirects = () =>
  MERGED_PAGES.map(({ source, destination }) => ({ source, destination, permanent: true }));

const INDUSTRY_HUBS = ['lawyers', 'accountants', 'clinics', 'renovations'];

const industryLocationRedirects = () =>
  INDUSTRY_HUBS.map((hub) => ({
    source: `/${hub}/:city+`,
    destination: `/${hub}`,
    permanent: true,
  }));

const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zenaradesigns.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.zenaradesigns.com' }],
        destination: 'https://zenaradesigns.com/:path*',
        permanent: true,
      },
      ...retiredCityRedirects(),
      ...industryLocationRedirects(),
      ...mergedPageRedirects(),
    ];
  },
  async headers() {
    // In development, Next.js App Router injects a nonce into any CSP header,
    // which per CSP spec causes 'unsafe-inline' to be ignored — breaking HMR,
    // inline styles, and webpack eval. Skip security headers entirely in dev.
    const securityHeaders = isDev
      ? []
      : [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.googletagmanager.com https://assets.calendly.com https://js.stripe.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com https://sibforms.com",
              "img-src 'self' data: https:",
              "font-src 'self' https://fonts.gstatic.com https://assets.brevo.com",
              "connect-src 'self' https://api.resend.com https://stats.g.doubleclick.net https://*.google-analytics.com https://www.google-analytics.com https://*.analytics.google.com https://analytics.google.com https://www.googletagmanager.com https://www.google.com https://calendly.com https://api.stripe.com",
              "frame-src 'self' https://calendly.com https://checkout.stripe.com https://js.stripe.com",
              "base-uri 'self'",
              "form-action 'self' https://b15138b6.sibforms.com https://sibforms.com",
              "object-src 'none'",
              "media-src 'self'",
              "worker-src 'self'",
              "manifest-src 'self'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ];

    // In dev, skip all header routes entirely (empty array not allowed by Next.js)
    if (isDev) {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
          ],
        },
      ];
    }

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/api/send-email',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
      {
        source: '/api/reviews',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
