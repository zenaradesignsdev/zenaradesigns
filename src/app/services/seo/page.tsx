import type { Metadata } from 'next';
import SeoService from '@/components/pages/services/SeoService';
import { JsonLd } from '@/components/JsonLd';
import { serviceContent, serviceSchema, faqPageSchema, serviceBreadcrumb } from '@/lib/service-content';

const entry = serviceContent['seo'];

export const metadata: Metadata = {
  title: 'SEO Services Toronto | Search Engine Optimization | Zenara Designs',
  description: 'Professional SEO services for Toronto & GTA businesses. Local SEO, technical optimization, keyword research, and Google ranking improvements. Month-to-month, no contracts.',
  keywords: ['SEO services Toronto', 'local SEO GTA', 'search engine optimization Toronto', 'technical SEO Ontario', 'Google ranking Toronto', 'SEO agency Toronto'],
  alternates: { canonical: 'https://zenaradesigns.com/services/seo' },
  openGraph: {
    title: 'SEO Services Toronto | Search Engine Optimization | Zenara Designs',
    description: 'Professional SEO services for Toronto & GTA businesses. Local SEO, technical optimization, keyword research, and Google ranking improvements. Month-to-month, no contracts.',
    url: 'https://zenaradesigns.com/services/seo',
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
