import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
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
              "connect-src 'self' https://api.resend.com https://www.google-analytics.com https://analytics.google.com https://calendly.com https://api.stripe.com",
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
