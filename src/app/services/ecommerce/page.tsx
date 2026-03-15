import type { Metadata } from 'next';
import EcommerceService from '@/components/pages/services/EcommerceService';

export const metadata: Metadata = {
  title: 'E-Commerce Web Design Toronto | Shopify & Custom Stores | Zenara',
  description: 'Professional e-commerce website design in Toronto & GTA. Shopify, custom stores, payment integration, and conversion optimization. Launch your online store today.',
  alternates: { canonical: 'https://zenaradesigns.com/services/ecommerce' },
  openGraph: {
    title: 'E-Commerce Web Design Toronto | Shopify & Custom Stores | Zenara',
    description: 'Professional e-commerce website design in Toronto & GTA. Shopify, custom stores, payment integration, and conversion optimization. Launch your online store today.',
    url: 'https://zenaradesigns.com/services/ecommerce',
  },
};

export default function EcommercePage() {
  return <EcommerceService />;
}
