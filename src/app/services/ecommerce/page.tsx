import type { Metadata } from 'next';
import EcommerceService from '@/components/pages/services/EcommerceService';
import { JsonLd } from '@/components/JsonLd';
import { serviceContent, serviceSchema, faqPageSchema, serviceBreadcrumb } from '@/lib/service-content';

const entry = serviceContent['ecommerce'];

export const metadata: Metadata = {
  title: 'E-Commerce Web Design Markham & GTA | Zenara',
  description: 'E-commerce website design for GTA businesses. Shopify stores, custom storefronts, payment integration, and conversion optimization. Fixed pricing.',
  keywords: ['ecommerce web design Toronto', 'Shopify development GTA', 'online store design Toronto', 'custom ecommerce development', 'Shopify store Toronto', 'headless commerce Next.js'],
  alternates: { canonical: 'https://zenaradesigns.com/services/ecommerce' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'E-Commerce Web Design Markham & GTA | Zenara',
    description: 'E-commerce website design for GTA businesses. Shopify stores, custom storefronts, payment integration, and conversion optimization. Fixed pricing.',
    url: 'https://zenaradesigns.com/services/ecommerce',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Commerce Web Design Markham & GTA | Zenara',
    description:
      'E-commerce website design for GTA businesses. Shopify stores, custom storefronts, payment integration, and conversion optimization. Fixed pricing.',
  },
};

export default function EcommercePage() {
  return (
    <>
      <JsonLd schema={serviceBreadcrumb(entry)} />
      <JsonLd schema={serviceSchema(entry)} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <EcommerceService />
    </>
  );
}
