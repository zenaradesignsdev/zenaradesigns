// Prices shown on /pricing and /services/branding, and the JSON-LD built from
// them. One source so the structured data can never quote a different price
// from the page (it previously listed $999/$1,999 while the page showed the
// $499/$1,499 promo prices). All amounts are CAD.

import { ORGANIZATION_ID, SITE_URL } from './constants';

export interface PriceRange {
  min: number;
  max: number;
}

export const PRICES = {
  starter: { price: 499, regular: 999 },
  smallBusiness: { price: 1499, regular: 1999 },
  pro: { from: 4999 },
  launchPackage: { price: 2000 },
  logoDesign: { min: 99, max: 199 },
  businessCards: { min: 149, max: 399 },
  // Monthly; annual billing is 10% off.
  subscriptions: { core: 45, grow: 70, prime: 150 },
} as const;

export const formatCad = (amount: number) => `$${amount.toLocaleString('en-US')}`;

export const formatCadRange = ({ min, max }: PriceRange, separator = ' - ') =>
  `${formatCad(min)}${separator}${formatCad(max)}`;

// Copy helpers for FAQs, city pages and blog posts, so prose quotes the same
// figures as /pricing. While a promotion runs (price below regular) they read
// "$499 (regularly $999)"; once PRICES.*.price is set back to the regular
// figure they read "$999" with no edit to the copy.
type PackageTier = 'starter' | 'smallBusiness';

export const isOnPromo = (tier: PackageTier) => PRICES[tier].price < PRICES[tier].regular;

export const packagePrice = (tier: PackageTier) => formatCad(PRICES[tier].price);

export const packagePriceWithRegular = (tier: PackageTier) =>
  isOnPromo(tier)
    ? `${formatCad(PRICES[tier].price)} (regularly ${formatCad(PRICES[tier].regular)})`
    : formatCad(PRICES[tier].price);

export const proFromPrice = () => `${formatCad(PRICES.pro.from)}+`;

export interface WebsitePlanSummary {
  name: string;
  price: string;
  /** Regular price, only while a promotion is running. */
  originalPrice?: string;
  desc: string;
  popular: boolean;
}

/** The three website packages as one-line summaries, for pricing snapshots outside /pricing. */
export const websitePlanSummaries = (): WebsitePlanSummary[] => [
  {
    name: 'Starter',
    price: packagePrice('starter'),
    originalPrice: isOnPromo('starter') ? formatCad(PRICES.starter.regular) : undefined,
    desc: 'Up to 3 pages, 3–5 day turnaround',
    popular: false,
  },
  {
    name: 'Small Business',
    price: packagePrice('smallBusiness'),
    originalPrice: isOnPromo('smallBusiness') ? formatCad(PRICES.smallBusiness.regular) : undefined,
    desc: 'Up to 6 pages, custom sections, 1–2 weeks',
    popular: true,
  },
  { name: 'Pro', price: proFromPrice(), desc: 'Advanced functionality, e-commerce, 3–4 weeks', popular: false },
];

/** "$499 for a Starter site, $1,499 for a Small Business site and $4,999+ for Pro" */
export const packageRangeSentence = () =>
  `${packagePriceWithRegular('starter')} for a Starter site of up to three pages, ${packagePriceWithRegular('smallBusiness')} for a Small Business site of up to six pages, and ${proFromPrice()} for a Pro build`;

const PRICING_URL = `${SITE_URL}/pricing`;
const BRANDING_URL = `${SITE_URL}/services/branding`;
export const BUSINESS_CARDS_ID = `${BRANDING_URL}#business-cards`;

// Custom websites, logos and care plans are services we perform, not goods,
// so they are Offers of a Service. Google's Product rich results are for
// goods; marking services up as Product is outside its guidelines and draws
// Merchant-listing warnings (shipping, returns) in Search Console.
const serviceOffer = (
  id: string,
  name: string,
  description: string,
  priceSpecification: Record<string, unknown>,
) => ({
  '@type': 'Offer',
  '@id': `${PRICING_URL}#${id}`,
  url: PRICING_URL,
  priceCurrency: 'CAD',
  priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'CAD', ...priceSpecification },
  itemOffered: {
    '@type': 'Service',
    name,
    description,
    provider: { '@id': ORGANIZATION_ID },
  },
});

const monthly = (price: number) => ({
  '@type': 'UnitPriceSpecification',
  price,
  unitCode: 'MON',
  unitText: 'month',
});

export const pricingCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  '@id': `${PRICING_URL}#catalog`,
  name: 'Zenara Designs pricing',
  url: PRICING_URL,
  provider: { '@id': ORGANIZATION_ID },
  itemListElement: [
    serviceOffer('starter', 'Starter Website', 'Up to 3 pages, mobile-responsive, SEO setup, 3–5 day turnaround.', { price: PRICES.starter.price }),
    serviceOffer('small-business', 'Small Business Website', 'Up to 6 pages, custom layouts, forms and SEO setup, 1–2 week turnaround.', { price: PRICES.smallBusiness.price }),
    serviceOffer('pro', 'Pro Website', 'Fully custom build with advanced integrations, e-commerce and premium animations.', { minPrice: PRICES.pro.from }),
    serviceOffer('small-business-launch', 'Small Business Launch Package', 'Custom website, logo and business card design, Google Business Profile setup, Instagram setup, one month of hosting and local SEO for 5 service areas.', { price: PRICES.launchPackage.price }),
    serviceOffer('core', 'Zenara Core hosting & maintenance', 'Managed hosting, SSL, monitoring, daily backups and 30 minutes of updates a month.', monthly(PRICES.subscriptions.core)),
    serviceOffer('grow', 'Zenara Grow hosting & maintenance', 'Everything in Core plus performance checks, lead-form monitoring, analytics reporting and 60 minutes of updates a month.', monthly(PRICES.subscriptions.grow)),
    serviceOffer('prime', 'Zenara Prime hosting & maintenance', 'Everything in Grow plus Core Web Vitals tuning, integrations support and 120 minutes of updates a month.', monthly(PRICES.subscriptions.prime)),
    serviceOffer('logo-design', 'Logo Design', '3 initial concepts, 2 revisions and vector files, delivered in a week.', { minPrice: PRICES.logoDesign.min, maxPrice: PRICES.logoDesign.max }),
    {
      '@type': 'Offer',
      url: PRICING_URL,
      itemOffered: { '@id': BUSINESS_CARDS_ID },
    },
  ],
};

// Printed business cards are physical goods, so they are a Product. The
// AggregateOffer carries the price range; it keeps the item to product
// snippets rather than Merchant listings, which need a single price plus
// shipping and return details.
export const businessCardsProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': BUSINESS_CARDS_ID,
  name: 'Custom Business Cards',
  description: 'Custom-designed business cards with premium printing and print-ready digital files, 2–3 day turnaround.',
  category: 'Business Cards',
  url: BRANDING_URL,
  brand: { '@type': 'Brand', name: 'Zenara Designs' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'CAD',
    lowPrice: PRICES.businessCards.min,
    highPrice: PRICES.businessCards.max,
    availability: 'https://schema.org/InStock',
    url: BRANDING_URL,
    seller: { '@id': ORGANIZATION_ID },
  },
};
