import type { Metadata } from 'next';
import Pricing from '@/components/pages/Pricing';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/service-content';
import { pricingPageFaqSchema } from '@/lib/faq-data';

const PRICING_URL = 'https://zenaradesigns.com/pricing';

const PLANS = [
  { id: 'starter', name: 'Starter', price: '999', description: 'Affordable web design for freelancers and personal brands — up to 3 pages, mobile-responsive, SEO setup, 1-week turnaround.' },
  { id: 'small-business', name: 'Small Business', price: '1999', description: 'Professional web design for small businesses — up to 6 pages, custom layouts, forms, and SEO. 1–2 week turnaround.' },
  { id: 'small-business-launch', name: 'Small Business Launch Package', price: '2000', description: 'All-in-one launch bundle — custom website, logo and business card design, Google Business Profile setup, Instagram setup, 1 month free hosting, and local SEO for 5 service areas.' },
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
  title: 'Affordable, Transparent Web Design Pricing from $999 | Zenara',
  description:
    "Fast, professional web design at fair, transparent prices — no hidden fees. Compare packages for Toronto & GTA businesses, including our $2,000 Small Business Launch Package. Free custom quote within 24 hours.",
  alternates: { canonical: 'https://zenaradesigns.com/pricing' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Affordable, Transparent Web Design Pricing from $999 | Zenara',
    description:
      "Fast, professional web design at fair, transparent prices — no hidden fees. Compare packages for Toronto & GTA businesses, including our $2,000 Small Business Launch Package. Free custom quote within 24 hours.",
    url: 'https://zenaradesigns.com/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affordable, Transparent Web Design Pricing from $999 | Zenara',
    description:
      "Fast, professional web design at fair, transparent prices — no hidden fees. Compare packages for Toronto & GTA businesses, including our $2,000 Small Business Launch Package. Free custom quote within 24 hours.",
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd schema={pricingBreadcrumb} />
      {productSchemas.map((schema) => (
        <JsonLd key={(schema['@id'] as string)} schema={schema} />
      ))}
      <JsonLd schema={pricingPageFaqSchema} />
      <Pricing />
    </>
  );
}
