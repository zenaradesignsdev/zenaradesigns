import type { Metadata } from 'next';
import WebDesignService from '@/components/pages/services/WebDesignService';
import { JsonLd } from '@/components/JsonLd';
import { serviceContent, serviceSchema, faqPageSchema, serviceBreadcrumb } from '@/lib/service-content';

const entry = serviceContent['web-design'];

export const metadata: Metadata = {
  title: 'Custom Web Design Toronto | Professional Websites | Zenara Designs',
  description: 'Custom website design and development for Toronto & GTA businesses. Modern, responsive, SEO-optimized websites built with Next.js that convert visitors into customers. Free consultation.',
  keywords: ['web design Toronto', 'custom website design GTA', 'professional web development Toronto', 'Next.js web design', 'responsive website design Toronto', 'small business website Toronto'],
  alternates: { canonical: 'https://zenaradesigns.com/services/web-design' },
  openGraph: {
    title: 'Custom Web Design Toronto | Professional Websites | Zenara Designs',
    description: 'Custom website design and development for Toronto & GTA businesses. Modern, responsive, SEO-optimized websites built with Next.js that convert visitors into customers. Free consultation.',
    url: 'https://zenaradesigns.com/services/web-design',
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
