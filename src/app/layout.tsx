import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Providers from '@/components/providers';
import Layout from '@/components/Layout/Layout';
import { fontSans } from '@/lib/fonts';
import { JsonLd } from '@/components/JsonLd';
import { generateBusinessSchema, generateWebSiteSchema } from '@/lib/structured-data';

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
  // No site-wide canonical here: pages that forgot their own would inherit it
  // and canonicalise to the homepage. Each page sets its own.
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={fontSans.variable}>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Structured Data */}
        <JsonLd schema={generateBusinessSchema()} />
        <JsonLd schema={generateWebSiteSchema()} />
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
