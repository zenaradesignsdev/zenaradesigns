import type { Metadata } from 'next';
import SeoService from '@/components/pages/services/SeoService';
import { JsonLd } from '@/components/JsonLd';
import { serviceContent, serviceSchema, faqPageSchema, serviceBreadcrumb } from '@/lib/service-content';

const entry = serviceContent['seo'];

export const metadata: Metadata = {
  title: 'Local SEO Services for GTA Small Businesses | Zenara Designs',
  description: 'Local SEO for GTA small businesses: Google Business Profile, reviews, location pages and technical fixes, all within Google’s rules. Month-to-month.',
  keywords: ['SEO services Toronto', 'local SEO GTA', 'search engine optimization Toronto', 'technical SEO Ontario', 'Google ranking Toronto', 'SEO agency Toronto'],
  alternates: { canonical: 'https://zenaradesigns.com/services/seo' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Local SEO Services for GTA Small Businesses | Zenara Designs',
    description: 'Local SEO for GTA small businesses: Google Business Profile, reviews, location pages and technical fixes, all within Google’s rules. Month-to-month.',
    url: 'https://zenaradesigns.com/services/seo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local SEO Services for GTA Small Businesses | Zenara Designs',
    description:
      'Local SEO for GTA small businesses: Google Business Profile, reviews, location pages and technical fixes, all within Google’s rules. Month-to-month.',
  },
};

export default function SeoPage() {
  return (
    <>
      <JsonLd schema={serviceBreadcrumb(entry)} />
      <JsonLd schema={serviceSchema(entry)} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <SeoService />
    </>
  );
}
