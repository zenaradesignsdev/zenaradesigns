// Service detail page content + schema builders — single source of truth.
//
// Plain module (no 'use client', no server-only imports) so it can be used by
// both the client presentational components (FAQ rendering) and the server
// route files (server-rendered JSON-LD). See SEO-RANKING-PLAN.md §8.1.

const BASE = 'https://zenaradesigns.com';

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceEntry {
  path: string;
  breadcrumbLabel: string;
  schemaName: string;
  schemaDescription: string;
  features: string[];
  faqs: ServiceFaq[];
}

const AREA_SERVED = [
  'Markham', 'Stouffville', 'Scarborough', 'Toronto',
  'Mississauga', 'Richmond Hill', 'Vaughan', 'Pickering', 'GTA',
].map((name) => ({ '@type': 'City', name }));

const PROVIDER = {
  '@type': 'LocalBusiness',
  name: 'Zenara Designs',
  url: BASE,
  email: 'info@zenaradesigns.com',
  telephone: '+16478351077',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Markham',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
};

// ── Schema builders (return plain objects; rendered via <JsonLd>) ──────────────

export function serviceSchema(entry: ServiceEntry) {
  const url = `${BASE}${entry.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: entry.schemaName,
    description: entry.schemaDescription,
    url,
    provider: PROVIDER,
    areaServed: AREA_SERVED,
    serviceType: entry.schemaName,
    category: 'Web Design and Development',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Design Services',
      itemListElement: entry.features.map((feature, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: { '@type': 'Service', name: feature },
      })),
    },
  };
}

export function faqPageSchema(path: string, faqs: ServiceFaq[]) {
  const url = `${BASE}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(path: string, items: Array<{ name: string; url: string }>) {
  const url = `${BASE}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE}${item.url}`,
    })),
  };
}

// Standard Home → Services → [label] breadcrumb for a service entry.
export function serviceBreadcrumb(entry: ServiceEntry) {
  return breadcrumbSchema(entry.path, [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: entry.breadcrumbLabel, url: entry.path },
  ]);
}

// ── Per-service content ────────────────────────────────────────────────────────

export const webDesignFaqs: ServiceFaq[] = [
  {
    question: 'How much does a custom website cost?',
    answer:
      'Our web design packages are priced to stay affordable — starting at $999 for a focused starter site, $1,999 for a standard small-business build of up to six pages, and $4,999+ for advanced custom functionality — each with fixed, transparent pricing agreed before we start. Starter and Small Business are currently $500 off for a limited time. See the full breakdown, including what\'s included at every tier, on our pricing page.',
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'Most small business websites launch in 1–2 weeks from kickoff, including discovery, design, development, and testing. A focused starter site can be ready in 3–5 days; larger builds with custom functionality take 3–4 weeks. We provide a clear timeline before starting every project.',
  },
  {
    question: 'Why Next.js instead of WordPress?',
    answer:
      'Next.js delivers significantly faster load times, better SEO through server-side rendering, stronger security with no plugin vulnerabilities, and a modern development experience. For professional service businesses in the GTA, the performance and SEO advantages translate directly into more leads.',
  },
  {
    question: 'Can I see examples of websites you\'ve actually built?',
    answer:
      'Yes — see the Featured Work above for a few recent builds, each linking to the live site, or browse our complete portfolio of live client sites.',
  },
  {
    question: 'Do you work with businesses outside the GTA?',
    answer:
      'Yes. We\'re based in Markham and specialize in the GTA — Markham, Stouffville, Scarborough, and the surrounding cities — and also work with clients further out. Consultations, design reviews, and project communication happen over video call, so location is never a barrier.',
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer:
      'Every website we build is mobile-first by default. We design for small screens first, then scale up for tablets and desktops, and test across iOS, Android, and major browsers before launch.',
  },
];

export const ecommerceFaqs: ServiceFaq[] = [
  {
    question: 'How much does a Shopify store cost to build in the GTA?',
    answer:
      'Shopify store builds typically range from $3,000–$12,000+ depending on the number of products, custom theme requirements, and app integrations. We provide a fixed-price quote after a free discovery call. Monthly Shopify subscription fees are separate and billed directly by Shopify.',
  },
  {
    question: 'Do you build custom storefronts or only Shopify?',
    answer:
      'We build both. For most small-to-medium businesses, Shopify is the ideal platform. For brands needing complete creative freedom or headless commerce architecture, we build custom Next.js storefronts connected to Shopify or other backends. We recommend the right solution after understanding your specific needs.',
  },
  {
    question: 'Can you migrate my existing online store to Shopify?',
    answer:
      'Yes. We handle full platform migrations from WooCommerce, Magento, BigCommerce, and other platforms to Shopify or custom Next.js storefronts. This includes product data, customer records, order history, URL redirects, and SEO preservation — zero downtime during the migration.',
  },
  {
    question: 'Do your e-commerce sites work for Canadian businesses with HST/GST?',
    answer:
      'Absolutely. All stores we build include proper Canadian tax configuration — GST, HST, PST by province. We also set up Stripe and PayPal with Canadian banking, and can configure multi-currency for businesses selling internationally.',
  },
  {
    question: 'What payment gateways do you integrate?',
    answer:
      'We integrate Stripe, PayPal, Apple Pay, Google Pay, Shop Pay, and Shopify Payments. For high-risk industries, we can integrate specialized payment processors. Every checkout is PCI-compliant and optimized for conversion on both mobile and desktop.',
  },
];

export const brandingFaqs: ServiceFaq[] = [
  {
    question: 'How much does a logo and business cards cost in the GTA?',
    answer:
      'Logo design starts at $99–$199 (3 initial concepts, 2 rounds of revisions, vector files, delivered within a week) and business cards start at $149–$399 (custom design, premium printing, digital files, 2–3 day turnaround). Pricing depends on scope — see the full breakdown on our pricing page.',
  },
  {
    question: 'How many logo concepts and revisions do I get?',
    answer:
      'Every logo project starts with 3 initial concepts exploring different directions. Once you pick one to move forward with, it goes through 2 rounds of revisions. If your project needs more exploration than that, we\'ll scope a larger package during your consultation rather than surprise you with extra charges mid-project.',
  },
  {
    question: 'What file formats do I receive for my logo and cards?',
    answer:
      'Your logo comes as SVG, PNG (transparent and white background), PDF, and EPS, with light and dark variants and social-ready sizes. Business cards are delivered as print-ready PDFs with crop marks and bleed, CMYK-optimized at 300 DPI, plus PNG exports — production-ready for any professional printer.',
  },
  {
    question: 'Can my logo be trademarked?',
    answer:
      'Yes. Every logo we design is 100% original — no stock icons, no clip art, no templates. Original custom logos are eligible for trademark registration in Canada through the Canadian Intellectual Property Office (CIPO). We recommend consulting a trademark lawyer for formal registration.',
  },
  {
    question: 'Can you design my logo and business cards together as one identity?',
    answer:
      'Yes — that\'s how most branding projects work here. We design the logo first, then extend the same colours, typography, and visual language directly into your business cards, so nothing feels like an afterthought. If you\'re also building a website with us, the same identity carries through there too.',
  },
  {
    question: 'Do you offer premium print finishes like spot UV or foil?',
    answer:
      'Yes, as an add-on beyond the standard business card package — spot UV coating, foil stamping, soft-touch lamination, and letterpress are all available. We\'ll quote the finish separately once we know which print vendor and stock you want to use.',
  },
];

export const seoFaqs: ServiceFaq[] = [
  {
    question: 'How long does SEO take to show results in the GTA?',
    answer:
      'Most GTA businesses start seeing meaningful ranking improvements within 3–6 months of starting SEO. Local SEO and Google Business Profile optimization can show results faster — sometimes within 4–8 weeks. Technical fixes like site speed and structured data improvements can have an immediate positive impact on Core Web Vitals scores.',
  },
  {
    question: 'Do you offer local SEO for GTA businesses?',
    answer:
      'Yes — local SEO is our specialty. We optimize your Google Business Profile, build local citations on Canadian directories, create geo-targeted landing pages, and implement LocalBusiness schema markup. Our strategies are built specifically for Markham, Stouffville, Scarborough, and the surrounding GTA markets.',
  },
  {
    question: 'What is included in a free SEO audit?',
    answer:
      'Our free SEO audit covers technical health (crawlability, site speed, Core Web Vitals, mobile usability), on-page factors (title tags, meta descriptions, heading structure), local SEO signals (Google Business Profile, citations), and a keyword gap analysis against your top 3 local competitors. You receive a written report with prioritized action items.',
  },
  {
    question: 'Do you require long-term SEO contracts?',
    answer:
      'No. We work month-to-month with no lock-in periods. Our results earn your continued business rather than a contract keeping you in place. We do recommend committing to at least 3–6 months to see meaningful results — SEO is a long-term investment — but you are free to cancel any time.',
  },
  {
    question: 'Can you do SEO for a website you didn\'t build?',
    answer:
      'Absolutely. We perform SEO on any website — WordPress, Squarespace, Wix, custom-built, or any other platform. If your site has significant technical limitations, we will flag them with recommendations. For maximum results, a Next.js rebuild eliminates technical SEO barriers entirely, but it is not required to start improving your rankings.',
  },
];

export const geoFaqs: ServiceFaq[] = [
  {
    question: 'What is GEO, and how is it different from SEO?',
    answer:
      'SEO gets you ranked in a list of blue links. GEO — generative engine optimization — gets you cited inside an answer written by ChatGPT, Perplexity, Google AI Overviews, or Gemini. The mechanics differ: AI systems favour content with clear factual statements, explicit entity information, structured data they can parse without running JavaScript, and sources they can attribute. Both matter, and the work overlaps, but optimising only for one leaves the other on the table.',
  },
  {
    question: 'Do AI search engines actually send traffic?',
    answer:
      'Less than traditional search does today, and the referral volume is genuinely hard to measure because not every assistant passes a referrer. What they send is different: fewer visits, but visitors who arrive already having read a summary of what you do. The stronger argument right now is defensive — if an assistant is answering "who does web design in Markham" and you are not in the answer, a competitor is.',
  },
  {
    question: 'What do you actually change on my site?',
    answer:
      'We make your business facts machine-readable: server-rendered JSON-LD so crawlers that do not execute JavaScript still see your data, an llms.txt file stating who you are and what you sell, entity consistency across your site, Google Business Profile and citations, and content restructured to answer real questions directly rather than burying the answer in marketing copy. We also add clear, quotable factual statements — the kind an assistant can lift and attribute.',
  },
  {
    question: 'Can you guarantee I will show up in ChatGPT or Perplexity?',
    answer:
      'No, and be sceptical of anyone who does. These systems do not publish ranking criteria, their outputs vary between users and sessions, and they change without notice. What we can do is make your site as easy to read, parse, and cite as it can be, and track mentions over time so you can see whether it is working.',
  },
  {
    question: 'Is GEO available on its own, or only bundled with SEO?',
    answer:
      'It can be scoped on its own, but the two overlap in practice — clean structured data and answer-shaped content help conventional rankings too. Most clients add GEO alongside an existing SEO engagement rather than running it in isolation, and we\'ll say so upfront if that\'s the better starting point for your site.',
  },
];

export const websiteMaintenanceFaqs: ServiceFaq[] = [
  {
    question: 'How much does managed hosting and website care cost?',
    answer:
      'Plans start at $45/month (Core) for managed hosting, SSL, and daily backups. Grow ($70/month) adds GA4 setup, a monthly traffic report, and more included update time. Prime ($150/month) adds advanced performance tuning and same-day support. All plans are month-to-month — see the full breakdown, including annual pricing, on our pricing page.',
  },
  {
    question: 'What is included in managed hosting versus a regular host?',
    answer:
      'With managed hosting, our team handles everything: server configuration, security patches, software updates, SSL renewals, performance monitoring, and daily backups. Unlike shared hosting providers (GoDaddy, Bluehost), you don\'t need to touch a control panel or manage technical issues. We handle it so you can focus on your business.',
  },
  {
    question: 'What is in the monthly traffic report?',
    answer:
      'Sessions and users with the month-over-month change, which pages people actually landed on, where they came from (organic, direct, social, referral), and how many form submissions and calls came through. Written in plain English with a short read on what changed and what we suggest doing next. Included from the Grow plan up.',
  },
  {
    question: 'Do you set up Google Analytics and Search Console for me?',
    answer:
      'Yes, on the Grow and Prime plans — both set up properly and verified, in accounts you own, plus conversion tracking on your forms and click-to-call links so enquiries are actually measured. If you already have GA4 running, we audit the setup first; a misconfigured property produces numbers that look fine and mean nothing.',
  },
  {
    question: 'What is your uptime guarantee?',
    answer:
      'We offer a 99.9% uptime SLA — less than 9 hours of unplanned downtime a year — backed by 24/7 automated monitoring that alerts us the moment something breaks. How fast a human responds depends on your plan: same-day on Prime, 1 business day on Grow, 1–2 business days on Core.',
  },
  {
    question: 'Can you migrate my website from another host?',
    answer:
      'Yes, migration is included at no extra cost on every plan. We handle DNS, SSL, file and database migration, and email migration if applicable, with the cutover timed for a low-traffic window so visitors never notice.',
  },
  {
    question: 'Can I cancel?',
    answer:
      'Yes. Every plan is month to month with no lock-in contract. You keep your analytics accounts, your data, and your site.',
  },
];

export const websiteRedesignFaqs: ServiceFaq[] = [
  {
    question: 'How do I know if I need a redesign or just a refresh?',
    answer:
      'If the site loads slowly on a phone, is difficult to update, was built on a platform you no longer have access to, or has not converted an enquiry in months, a rebuild usually costs less than repeated patching. If the structure works and the problem is dated visuals or thin copy, a refresh is enough. We will tell you which one you need before quoting — including when the answer is that you do not need us yet.',
  },
  {
    question: 'Will a redesign hurt my existing search rankings?',
    answer:
      'It can, if the migration is careless. The usual causes are broken URL structures with no redirects, lost page content, and metadata that was never carried across. We map every existing URL to its new destination, 301 anything that moves, preserve the content that already earns impressions, and re-submit the sitemap. Rankings can still move in the first few weeks while Google re-crawls; that settles.',
  },
  {
    question: 'Can you keep my existing branding?',
    answer:
      'Yes. Plenty of redesigns are structural — same logo, same colours, better structure, faster load, clearer conversion path. If the brand itself is the problem we will say so, and logo and identity work is quoted separately.',
  },
  {
    question: 'What happens to my old content?',
    answer:
      'We audit it first. Pages that earn impressions or serve a real purpose get carried across and improved; thin or duplicate pages get consolidated or retired with redirects. Cutting dead weight is often the single highest-impact part of a redesign — a smaller site of genuinely useful pages outperforms a large one of near-identical ones.',
  },
  {
    question: 'How much does a redesign cost, and how long does it take?',
    answer:
      'Quoted up front from the audit, not billed hourly against a moving scope — pricing depends on how much content needs migrating and how much is changing structurally. Most redesigns land in one to two weeks; larger rebuilds with custom functionality run three to four.',
  },
];

export const serviceContent: Record<string, ServiceEntry> = {
  geo: {
    path: '/services/geo',
    breadcrumbLabel: 'GEO / AI Search',
    schemaName: 'Generative Engine Optimization (GEO) — Markham & the GTA',
    schemaDescription:
      'Generative engine optimization for GTA businesses. Get cited by ChatGPT, Perplexity, Google AI Overviews, and Gemini with server-rendered structured data, entity consistency, and answer-shaped content.',
    features: ['AI Search Visibility Audit', 'Server-Rendered Structured Data', 'llms.txt & Entity Signals', 'Answer-Shaped Content', 'Citation & Mention Tracking', 'Google Business Profile'],
    faqs: geoFaqs,
  },
  'website-redesign': {
    path: '/services/website-redesign',
    breadcrumbLabel: 'Website Redesign',
    schemaName: 'Website Redesign & Migration — Markham & the GTA',
    schemaDescription:
      'Website redesign and migration for GTA businesses. Rebuild dated or slow sites on Next.js without losing search rankings — full URL mapping, 301 redirects, and content migration included.',
    features: ['Content & URL Audit', 'SEO-Safe Migration', 'Rebuild on Next.js', 'Conversion Path Redesign', 'Performance Overhaul', 'Redirect Mapping'],
    faqs: websiteRedesignFaqs,
  },
  'web-design': {
    path: '/services/web-design',
    breadcrumbLabel: 'Web Design',
    schemaName: 'Custom Web Design Markham & GTA',
    schemaDescription:
      'Professional custom website design and development for GTA businesses. Built with Next.js for performance, SEO, and modern user experiences.',
    features: ['Custom UI/UX Design', 'Responsive Development', 'Performance Optimization', 'SEO Integration', 'Clean Code Architecture', 'Security & Accessibility'],
    faqs: webDesignFaqs,
  },
  ecommerce: {
    path: '/services/ecommerce',
    breadcrumbLabel: 'E-Commerce',
    schemaName: 'E-Commerce Web Design Markham & GTA',
    schemaDescription:
      'Professional e-commerce website design and development for GTA businesses. Shopify stores, custom storefronts, payment integration, and conversion optimization.',
    features: ['Shopify Development', 'Payment Integration', 'Product Management', 'Conversion Optimization', 'Analytics & Reporting', 'Multi-Currency & Tax'],
    faqs: ecommerceFaqs,
  },
  branding: {
    path: '/services/branding',
    breadcrumbLabel: 'Branding',
    schemaName: 'Logo Design & Business Cards — Markham & the GTA',
    schemaDescription:
      'Logo design and business card design for GTA businesses. Custom logo concepts, colour and typography systems, and print-ready business cards, priced fixed and affordable.',
    features: ['Custom Logo Design', 'Colour & Typography System', 'Print-Ready Business Cards', 'Multi-Format File Delivery', 'Print Vendor Coordination', 'Original, Trademark-Eligible Marks'],
    faqs: brandingFaqs,
  },
  seo: {
    path: '/services/seo',
    breadcrumbLabel: 'SEO Services',
    schemaName: 'SEO Services — Markham & the GTA',
    schemaDescription:
      'Professional SEO services for GTA businesses. Local SEO, technical optimization, keyword research, and Google ranking improvements. Month-to-month, no contracts.',
    features: ['Local SEO', 'Technical SEO', 'Content Strategy', 'Keyword Research', 'On-Page Optimization', 'Link Building'],
    faqs: seoFaqs,
  },
  'website-maintenance': {
    path: '/services/website-maintenance',
    breadcrumbLabel: 'Website Maintenance',
    schemaName: 'Website Maintenance, Hosting & Analytics — Markham & the GTA',
    schemaDescription:
      'Managed hosting, uptime monitoring, and monthly analytics reporting for GTA businesses. 99.9% uptime SLA, SSL, daily backups, GA4 setup, and plain-English traffic reports. Plans from $45/month.',
    features: ['Managed Hosting & SSL', 'Daily Backups', 'Uptime & Error Monitoring', 'GA4 & Search Console Setup', 'Monthly Traffic Report', 'Content Updates'],
    faqs: websiteMaintenanceFaqs,
  },
};
