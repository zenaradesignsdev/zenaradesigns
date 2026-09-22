import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { generateBreadcrumbSchema, generateSiteNavigationElementSchema } from '@/lib/structured-data';
import Home from '@/components/pages/Home';

export const metadata: Metadata = {
  title: 'Markham Web Design | Websites for GTA Businesses | Zenara',
  description:
    'Custom, lead-focused websites for GTA service businesses, built from our Markham base. Fixed pricing, direct developer access, launch in 1–2 weeks.',
  alternates: { canonical: 'https://zenaradesigns.com' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Markham Web Design | Websites for GTA Businesses | Zenara',
    description:
      'Custom, lead-focused websites for GTA service businesses, built from our Markham base. Fixed pricing, direct developer access, launch in 1–2 weeks.',
    url: 'https://zenaradesigns.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markham Web Design | Websites for GTA Businesses | Zenara',
    description:
      'Custom, lead-focused websites for GTA service businesses, built from our Markham base. Fixed pricing, direct developer access, launch in 1–2 weeks.',
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd schema={generateSiteNavigationElementSchema()} />
      <JsonLd schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }])} />
      <Home />
    </>
  );
}
