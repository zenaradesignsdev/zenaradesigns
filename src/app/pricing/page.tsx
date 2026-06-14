import type { Metadata } from 'next';
import Pricing from '@/components/pages/Pricing';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/service-content';

const PRICING_URL = 'https://zenaradesigns.com/pricing';

const PLANS = [
  { id: 'starter', name: 'Starter', price: '999', description: 'Web design for freelancers and personal brands — up to 3 pages, mobile-responsive, SEO setup, 1-week turnaround.' },
  { id: 'small-business', name: 'Small Business', price: '1999', description: 'Web design for small businesses and professionals — up to 6 pages, custom layouts, forms, and SEO. 2–3 week turnaround.' },
  { id: 'pro', name: 'Pro', price: '4999', description: 'Fully custom web design with advanced integrations, e-commerce, and premium animations for businesses needing more.' },
];

const productSchemas = PLANS.map((plan) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${PRICING_URL}#${plan.id}`,
  name: `${plan.name} Web Design Package`,
  description: plan.description,
  category: 'Web Design Service',
  brand: { '@type': 'Brand', name: 'Zenara Designs' },
  offers: {
    '@type': 'Offer',
    price: plan.price,
    priceCurrency: 'CAD',
    availability: 'https://schema.org/InStock',
    url: PRICING_URL,
    seller: { '@type': 'Organization', name: 'Zenara Designs', url: 'https://zenaradesigns.com' },
  },
}));

const pricingBreadcrumb = breadcrumbSchema('/pricing', [
  { name: 'Home', url: '/' },
  { name: 'Pricing', url: '/pricing' },
]);

export const metadata: Metadata = {
  title: 'Web Design Pricing from $999 — Compare Plans & Packages | Zenara',
  description:
    "Compare 3 web design packages with transparent pricing for Toronto & GTA businesses. See exactly what's included at every tier — no hidden fees. Free custom quote within 24 hours.",
  alternates: { canonical: 'https://zenaradesigns.com/pricing' },
  openGraph: {
    title: 'Web Design Pricing from $999 — Compare Plans & Packages | Zenara',
    description:
      "Compare 3 web design packages with transparent pricing for Toronto & GTA businesses. See exactly what's included at every tier — no hidden fees. Free custom quote within 24 hours.",
    url: 'https://zenaradesigns.com/pricing',
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd schema={pricingBreadcrumb} />
      {productSchemas.map((schema) => (
        <JsonLd key={(schema['@id'] as string)} schema={schema} />
      ))}
      <Pricing />
    </>
  );
}
