import type { Metadata } from 'next';
import BrandingService from '@/components/pages/services/BrandingService';
import { JsonLd } from '@/components/JsonLd';
import { serviceContent, serviceSchema, faqPageSchema, serviceBreadcrumb } from '@/lib/service-content';

const entry = serviceContent['branding'];

export const metadata: Metadata = {
  title: 'Branding: Logo & Business Card Design Markham & GTA | Zenara',
  description: 'Logo design and business card design for GTA businesses. Custom logo concepts, colour and typography systems, and print-ready cards. Fixed, affordable pricing.',
  keywords: ['logo design Toronto', 'brand identity design GTA', 'business card design Toronto', 'custom logo designer Toronto', 'professional branding Toronto', 'print-ready business cards GTA'],
  alternates: { canonical: 'https://zenaradesigns.com/services/branding' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Branding: Logo & Business Card Design Markham & GTA | Zenara',
    description: 'Logo design and business card design for GTA businesses. Custom logo concepts, colour and typography systems, and print-ready cards. Fixed, affordable pricing.',
    url: 'https://zenaradesigns.com/services/branding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Branding: Logo & Business Card Design Markham & GTA | Zenara',
    description:
      'Logo design and business card design for GTA businesses. Custom logo concepts, colour and typography systems, and print-ready cards. Fixed, affordable pricing.',
  },
};

export default function BrandingPage() {
  return (
    <>
      <JsonLd schema={serviceBreadcrumb(entry)} />
      <JsonLd schema={serviceSchema(entry)} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <BrandingService />
    </>
  );
}
