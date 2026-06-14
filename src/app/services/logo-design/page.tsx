import type { Metadata } from 'next';
import LogoDesignService from '@/components/pages/services/LogoDesignService';
import { JsonLd } from '@/components/JsonLd';
import { serviceContent, serviceSchema, faqPageSchema, serviceBreadcrumb } from '@/lib/service-content';

const entry = serviceContent['logo-design'];

export const metadata: Metadata = {
  title: 'Logo Design Toronto | Custom Brand Identity | Zenara Designs',
  description: 'Professional logo design and brand identity for Toronto & GTA businesses. Custom logos, colour palettes, typography, and brand guidelines. Unlimited revisions. Free consultation.',
  keywords: ['logo design Toronto', 'brand identity design GTA', 'custom logo designer Toronto', 'professional branding Toronto', 'brand guidelines design', 'visual identity Toronto'],
  alternates: { canonical: 'https://zenaradesigns.com/services/logo-design' },
  openGraph: {
    title: 'Logo Design Toronto | Custom Brand Identity | Zenara Designs',
    description: 'Professional logo design and brand identity for Toronto & GTA businesses. Custom logos, colour palettes, typography, and brand guidelines. Unlimited revisions. Free consultation.',
    url: 'https://zenaradesigns.com/services/logo-design',
  },
};

export default function LogoDesignPage() {
  return (
    <>
      <JsonLd schema={serviceBreadcrumb(entry)} />
      <JsonLd schema={serviceSchema(entry)} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <LogoDesignService />
    </>
  );
}
