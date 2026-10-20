import type { Metadata } from 'next';
import WebDesignService from '@/components/pages/services/WebDesignService';
import { JsonLd } from '@/components/JsonLd';
import { serviceContent, serviceSchema, faqPageSchema, serviceBreadcrumb } from '@/lib/service-content';

const entry = serviceContent['web-design'];

export const metadata: Metadata = {
  title: 'Custom Web Design Toronto & GTA | Zenara Designs',
  description: 'Custom web design for Toronto and GTA businesses: designed from scratch, built in Next.js, no templates. Fixed prices, live in 1–2 weeks.',
  keywords: ['custom web design Toronto', 'web design Toronto', 'custom website design GTA', 'professional web development Toronto', 'Next.js web design', 'responsive website design Toronto', 'small business website Toronto'],
  alternates: { canonical: 'https://zenaradesigns.com/services/web-design' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Custom Web Design Toronto & GTA | Zenara Designs',
    description: 'Custom web design for Toronto and GTA businesses: designed from scratch, built in Next.js, no templates. Fixed prices, live in 1–2 weeks.',
    url: 'https://zenaradesigns.com/services/web-design',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Web Design Toronto & GTA | Zenara Designs',
    description:
      'Custom web design for Toronto and GTA businesses: designed from scratch, built in Next.js, no templates. Fixed prices, live in 1–2 weeks.',
  },
};

export default function WebDesignPage() {
  return (
    <>
      <JsonLd schema={serviceBreadcrumb(entry)} />
      <JsonLd schema={serviceSchema(entry)} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <WebDesignService />
    </>
  );
}
