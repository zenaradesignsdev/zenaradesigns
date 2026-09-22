import type { Metadata } from 'next';
import WebsiteRedesignService from '@/components/pages/services/WebsiteRedesignService';
import { JsonLd } from '@/components/JsonLd';
import { serviceContent, serviceSchema, faqPageSchema, serviceBreadcrumb } from '@/lib/service-content';

const entry = serviceContent['website-redesign'];

export const metadata: Metadata = {
  title: 'Website Redesign & Migration | Markham & GTA | Zenara',
  description:
    'Rebuild a slow or dated website without losing your search rankings. Full content audit, 301 redirect mapping, and a modern Next.js build. Fixed pricing.',
  keywords: ['website redesign Toronto', 'website migration GTA', 'redesign without losing SEO', 'website rebuild Markham', 'WordPress to Next.js migration'],
  alternates: { canonical: 'https://zenaradesigns.com/services/website-redesign' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Website Redesign & Migration | Markham & GTA | Zenara',
    description:
      'Rebuild a slow or dated website without losing your search rankings. Full audit, redirect mapping, modern build.',
    url: 'https://zenaradesigns.com/services/website-redesign',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Redesign & Migration | Markham & GTA | Zenara',
    description:
      'Rebuild a slow or dated website without losing your search rankings. Full content audit, 301 redirect mapping, and a modern Next.js build. Fixed pricing.',
  },
};

export default function WebsiteRedesignPage() {
  return (
    <>
      <JsonLd schema={serviceBreadcrumb(entry)} />
      <JsonLd schema={serviceSchema(entry)} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <WebsiteRedesignService />
    </>
  );
}
