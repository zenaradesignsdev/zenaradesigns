import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Providers from '@/components/providers';
import Layout from '@/components/Layout/Layout';
import { fontSans } from '@/lib/fonts';

export const metadata: Metadata = {
  title: {
    default: 'Web Design Toronto | Business Cards & Logo Design | Zenara',
    template: '%s | Zenara Designs',
  },
  description:
    "Toronto's leading web design agency. Professional websites, business cards & logo design for GTA businesses. Modern, fast, secure solutions.",
  metadataBase: new URL('https://zenaradesigns.com'),
  alternates: {
    canonical: 'https://zenaradesigns.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Web Design Toronto | Business Cards & Logo Design | Zenara',
    description:
      "Toronto's leading web design agency. Professional websites, business cards & logo design for GTA businesses. Modern, fast, secure solutions.",
    type: 'website',
    url: 'https://zenaradesigns.com',
    siteName: 'Zenara Designs',
    locale: 'en_CA',
    images: [
      {
        url: 'https://zenaradesigns.com/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Zenara Designs - Web Design Toronto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zenaradesigns',
    creator: '@zenaradesigns',
    title: 'Web Design Toronto | Business Cards & Logo Design | Zenara',
    description:
      "Toronto's leading web design agency. Professional websites, business cards & logo design for GTA businesses. Modern, fast, secure solutions.",
    images: {
      url: 'https://zenaradesigns.com/web-app-manifest-512x512.png',
      alt: 'Zenara Designs - Web Design Toronto',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Zenara Designs',
    'format-detection': 'telephone=no',
    'color-scheme': 'dark light',
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Zenara Designs',
  description:
    'Leading web design & development agency in Toronto & GTA. Professional business cards, logo design, and custom websites for small businesses.',
  url: 'https://zenaradesigns.com',
  logo: 'https://zenaradesigns.com/logo-seo.svg',
  image: 'https://zenaradesigns.com/web-app-manifest-512x512.png',
  email: 'info@zenaradesigns.com',
  areaServed: [
    { '@type': 'City', name: 'Toronto' },
    { '@type': 'City', name: 'Mississauga' },
    { '@type': 'City', name: 'Brampton' },
    { '@type': 'City', name: 'Vaughan' },
    { '@type': 'City', name: 'Markham' },
    { '@type': 'City', name: 'Richmond Hill' },
    { '@type': 'City', name: 'Oakville' },
    { '@type': 'City', name: 'Burlington' },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '43.6532',
      longitude: '-79.3832',
    },
    geoRadius: '50000',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '$$',
  paymentAccepted: 'Cash, Credit Card, PayPal',
  currenciesAccepted: 'CAD',
  sameAs: [
    'https://twitter.com/zenaradesigns',
    'https://linkedin.com/company/zenara-designs',
    'https://facebook.com/zenaradesigns',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Design & Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Design Toronto',
          description: 'Custom website design and development for Toronto businesses',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Cards Design',
          description: 'Professional business card design and printing services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Logo Design GTA',
          description: 'Custom logo design for businesses across the Greater Toronto Area',
        },
      },
    ],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zenara Designs',
  url: 'https://zenaradesigns.com',
  logo: 'https://zenaradesigns.com/logo-seo.svg',
  description:
    'Leading web design & development agency in Toronto & GTA specializing in custom websites, business cards, and logo design.',
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'info@zenaradesigns.com',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://twitter.com/zenaradesigns',
    'https://linkedin.com/company/zenara-designs',
    'https://facebook.com/zenaradesigns',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zenara Designs',
  url: 'https://zenaradesigns.com',
  description:
    'Leading web design & development agency in Toronto & GTA. Professional business cards, logo design, and custom websites for small businesses.',
  publisher: { '@type': 'Organization', name: 'Zenara Designs' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={fontSans.variable}>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XEHPLPLX0S"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XEHPLPLX0S', {
              'anonymize_ip': true,
              'cookie_flags': 'SameSite=None;Secure',
              'send_page_view': true
            });
          `}
        </Script>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
