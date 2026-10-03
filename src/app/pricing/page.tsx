import type { Metadata } from 'next';
import Pricing from '@/components/pages/Pricing';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/service-content';
import { pricingPageFaqSchema } from '@/lib/faq-data';
import { PRICES, formatCad, pricingCatalogSchema } from '@/lib/pricing-data';

const pricingBreadcrumb = breadcrumbSchema('/pricing', [
  { name: 'Home', url: '/' },
  { name: 'Pricing', url: '/pricing' },
]);

// Built from the live prices so the search snippet always matches the page.
const TITLE = `Web Design Pricing from ${formatCad(PRICES.starter.price)} | Markham & GTA | Zenara`;
const DESCRIPTION = `Fixed, transparent web design pricing for GTA businesses: websites from ${formatCad(PRICES.starter.price)}, a ${formatCad(PRICES.launchPackage.price)} launch package and care plans from ${formatCad(PRICES.subscriptions.core)}/month. No hidden fees.`;

export const metadata: Metadata = {
  title: TITLE,
  description:
    DESCRIPTION,
  alternates: { canonical: 'https://zenaradesigns.com/pricing' },
  openGraph: {
    images: ['/opengraph-image'],
    title: TITLE,
    description:
      DESCRIPTION,
    url: 'https://zenaradesigns.com/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      DESCRIPTION,
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd schema={pricingBreadcrumb} />
      <JsonLd schema={pricingCatalogSchema} />
      <JsonLd schema={pricingPageFaqSchema} />
      <Pricing />
    </>
  );
}
