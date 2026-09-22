import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Providers from '@/components/providers';
import Layout from '@/components/Layout/Layout';
import { fontSans } from '@/lib/fonts';

export const metadata: Metadata = {
  title: {
    default: 'Markham Web Design | Websites for GTA Businesses | Zenara',
    // Page titles already include the brand, so the template must not append it
    // again (was producing "… | Zenara | Zenara Designs").
    template: '%s',
  },
  description:
    'Custom, lead-focused websites for GTA service businesses, built from our Markham base. Fixed pricing, direct developer access, launch in 1–2 weeks.',
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
    title: 'Markham Web Design | Websites for GTA Businesses | Zenara',
    description:
      'Custom, lead-focused websites for GTA service businesses, built from our Markham base. Fixed pricing, direct developer access, launch in 1–2 weeks.',
    type: 'website',
    url: 'https://zenaradesigns.com',
    siteName: 'Zenara Designs',
    locale: 'en_CA',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Zenara Designs — web design for Markham and the GTA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zenaradesigns',
    creator: '@zenaradesigns',
    title: 'Markham Web Design | Websites for GTA Businesses | Zenara',
    description:
      'Custom, lead-focused websites for GTA service businesses, built from our Markham base. Fixed pricing, direct developer access, launch in 1–2 weeks.',
    images: {
      url: '/opengraph-image',
      alt: 'Zenara Designs — Web Design, Markham & the GTA',
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
    'Web design and development agency based in Markham, serving the GTA. Custom websites, branding, SEO and managed maintenance for small businesses.',
  url: 'https://zenaradesigns.com',
  logo: 'https://zenaradesigns.com/logo-seo.svg',
  image: 'https://zenaradesigns.com/web-app-manifest-512x512.png',
  email: 'info@zenaradesigns.com',
  areaServed: [
    { '@type': 'City', name: 'Markham' },
    { '@type': 'City', name: 'Stouffville' },
    { '@type': 'City', name: 'Scarborough' },
    { '@type': 'City', name: 'Toronto' },
    { '@type': 'City', name: 'Mississauga' },
    { '@type': 'City', name: 'Richmond Hill' },
    { '@type': 'City', name: 'Vaughan' },
    { '@type': 'City', name: 'Pickering' },
  ],

  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '43.8561',
      longitude: '-79.3370',
    },
    geoRadius: '45000',
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
          name: 'Web Design',
          description: 'Custom website design and development for Markham and GTA businesses',
          url: 'https://zenaradesigns.com/services/web-design',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Branding',
          description: 'Logo design and print-ready business cards, designed as one identity',
          url: 'https://zenaradesigns.com/services/branding',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO',
          description: 'Local SEO, technical optimization and content strategy',
          url: 'https://zenaradesigns.com/services/seo',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'GEO',
          description: 'Generative engine optimization for AI search visibility',
          url: 'https://zenaradesigns.com/services/geo',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-Commerce',
          description: 'Online stores with payment integration and product management',
          url: 'https://zenaradesigns.com/services/ecommerce',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Maintenance',
          description: 'Managed hosting, uptime monitoring and monthly analytics reporting',
          url: 'https://zenaradesigns.com/services/website-maintenance',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Redesign',
          description: 'Rebuilds of ageing sites for speed, modern design and conversion',
          url: 'https://zenaradesigns.com/services/website-redesign',
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
    'Web design agency in Markham serving the GTA, specializing in custom websites, branding, SEO and website maintenance for small businesses.',
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
    'Web design and development agency based in Markham, serving the GTA. Custom websites, branding, SEO and managed maintenance for small businesses.',
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
          data-ssr="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          data-ssr="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          data-ssr="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XEHPLPLX0S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
