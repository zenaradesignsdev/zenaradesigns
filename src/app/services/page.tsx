import type { Metadata } from 'next';
import Services from '@/components/pages/Services';

export const metadata: Metadata = {
  title: 'Web Design, SEO & Branding — All Services | Zenara',
  description:
    'Everything your Markham or GTA business needs online: websites, e-commerce, branding, SEO, GEO, redesigns, and managed maintenance. All 7 services with pricing.',
  alternates: { canonical: 'https://zenaradesigns.com/services' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Web Design, SEO & Branding — All Services | Zenara',
    description:
      'Everything your Markham or GTA business needs online: websites, e-commerce, branding, SEO, GEO, redesigns, and managed maintenance. All 7 services with pricing.',
    url: 'https://zenaradesigns.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design, SEO & Branding — All Services | Zenara',
    description:
      'Everything your Markham or GTA business needs online: websites, e-commerce, branding, SEO, GEO, redesigns, and managed maintenance. All 7 services with pricing.',
  },
};

export default function ServicesPage() {
  return <Services />;
}
