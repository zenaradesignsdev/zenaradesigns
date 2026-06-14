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
  'Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham',
  'Richmond Hill', 'Oakville', 'Burlington', 'Hamilton', 'GTA',
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
    addressLocality: 'Toronto',
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
    question: 'How much does a custom website cost in Toronto?',
    answer:
      'Custom websites built with Next.js typically range from $2,500–$10,000+ depending on complexity, number of pages, and features required. We provide fixed-price quotes upfront — no hourly billing surprises. Book a free consultation to get an accurate estimate for your project.',
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'Most small business websites take 3–6 weeks from kickoff to launch. This includes discovery, design, development, revisions, and QA. Complex projects with custom functionality or e-commerce can take 8–12 weeks. We provide a detailed timeline before starting every project.',
  },
  {
    question: 'Why Next.js instead of WordPress?',
    answer:
      'Next.js delivers significantly faster load times (often 2–5x), better SEO through server-side rendering, stronger security (no plugin vulnerabilities), and a modern development experience. For professional service businesses in the GTA, the performance and SEO advantages translate directly into more leads.',
  },
  {
    question: 'Do you work with businesses outside of Toronto?',
    answer:
      'Yes. While we specialize in Toronto and GTA businesses, we work with clients across Ontario and Canada. All consultations, design reviews, and project communication happen remotely via video call — location is never a barrier to great work.',
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer:
      'Every website we build is mobile-first by default. We design for small screens first, then scale up for tablets and desktops. All sites are tested across iOS, Android, and major browsers before launch to ensure a flawless experience on every device.',
  },
];

export const ecommerceFaqs: ServiceFaq[] = [
  {
    question: 'How much does a Shopify store cost to build in Toronto?',
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

export const logoDesignFaqs: ServiceFaq[] = [
  {
    question: 'How much does a professional logo design cost in Toronto?',
    answer:
      'Professional logo design at Zenara Designs starts at $500 for a standalone logo and ranges to $2,500+ for a complete brand identity package including guidelines, colour palette, and typography system. We provide fixed-price quotes after a free consultation — no hourly billing.',
  },
  {
    question: 'How many logo concepts will I receive?',
    answer:
      'We present 3–4 distinct logo concepts per project, each exploring a different visual direction. After you choose a direction, we refine through unlimited revision rounds until you are completely satisfied. You won\'t be locked into a concept that doesn\'t feel right.',
  },
  {
    question: 'What file formats are included with my logo?',
    answer:
      'You receive every file format you will ever need: SVG, PNG (transparent & white backgrounds), PDF, EPS, and AI source files. We also provide light and dark variants, with and without tagline, and social media-optimized sizes for profile pictures and cover photos.',
  },
  {
    question: 'Can my logo be trademarked?',
    answer:
      'Yes. Every logo we design is 100% original — no stock icons, no clip art, no templates. Original custom logos are eligible for trademark registration in Canada through the Canadian Intellectual Property Office (CIPO). We recommend consulting a trademark lawyer for formal registration.',
  },
  {
    question: 'Do you also design business cards and websites to match?',
    answer:
      'Yes — brand consistency across every touchpoint is our specialty. Once your logo is finalized, we can extend the identity to business cards, letterhead, email signatures, and your full website. Everything will share the same visual language and feel like one unified brand.',
  },
];

export const businessCardsFaqs: ServiceFaq[] = [
  {
    question: 'How much does professional business card design cost in Toronto?',
    answer:
      'Business card design at Zenara Designs starts at $150 for a single-sided card and ranges to $400+ for a double-sided premium design with multiple concepts. Print costs are separate and depend on quantity, stock, and finishing options. We can coordinate with GTA print vendors on your behalf.',
  },
  {
    question: 'What file formats do I receive for printing?',
    answer:
      'You receive print-ready PDF files with crop marks and bleed, CMYK-optimized files at 300 DPI, and full-resolution PNG exports. We also provide all source files (AI, PSD) so you own your design forever and can reprint or update contact information at any time.',
  },
  {
    question: 'Can you match my existing brand colours and fonts?',
    answer:
      'Absolutely. Every card we design is built on your existing brand identity — matching exact Pantone/CMYK colour codes, typefaces, logo usage, and visual style. If you don\'t have brand guidelines yet, we can develop your full identity alongside the card design.',
  },
  {
    question: 'How fast can you design my business cards?',
    answer:
      'Design concepts are typically delivered within 3–5 business days. Rush turnaround (24–48 hours) is available for time-sensitive events like conferences or networking functions. Reach out with your deadline and we will confirm availability before booking.',
  },
  {
    question: 'Do you offer premium finishes like spot UV or foil?',
    answer:
      'Yes. We design for premium finishing options including spot UV coating, foil stamping (gold, silver, rose gold), soft-touch lamination, embossing, debossing, edge painting, and letterpress. We guide you through the options that will best complement your brand and budget.',
  },
];

export const seoFaqs: ServiceFaq[] = [
  {
    question: 'How long does SEO take to show results in Toronto?',
    answer:
      'Most Toronto businesses start seeing meaningful ranking improvements within 3–6 months of starting SEO. Local SEO and Google Business Profile optimization can show results faster — sometimes within 4–8 weeks. Technical fixes like site speed and structured data improvements can have an immediate positive impact on Core Web Vitals scores.',
  },
  {
    question: 'Do you offer local SEO for GTA businesses?',
    answer:
      'Yes — local SEO is our specialty. We optimize your Google Business Profile, build local citations on Canadian directories, create geo-targeted landing pages, and implement LocalBusiness schema markup. Our strategies are built specifically for Toronto, Mississauga, Brampton, Vaughan, Markham, and surrounding GTA markets.',
  },
  {
    question: 'What is included in a free SEO audit?',
    answer:
      'Our free SEO audit covers technical health (crawlability, site speed, Core Web Vitals, mobile usability), on-page factors (title tags, meta descriptions, heading structure), local SEO signals (Google Business Profile, citations), and a keyword gap analysis against your top 3 Toronto competitors. You receive a written report with prioritized action items.',
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

export const hostingFaqs: ServiceFaq[] = [
  {
    question: 'How much does managed web hosting cost in Toronto?',
    answer:
      'Managed hosting plans at Zenara Designs start at $45/month and include SSL, CDN, daily backups, uptime monitoring, and priority support. Higher tiers add more storage, performance tuning, and enhanced SLAs. All plans are month-to-month with no annual price hikes or hidden bandwidth fees.',
  },
  {
    question: 'What is included in managed hosting versus a regular host?',
    answer:
      'With managed hosting, our team handles everything: server configuration, security patches, software updates, SSL renewals, performance monitoring, and daily backups. Unlike shared hosting providers (GoDaddy, Bluehost), you don\'t need to touch a control panel or manage technical issues. We handle it so you can focus on your business.',
  },
  {
    question: 'What is your uptime guarantee?',
    answer:
      'We offer a 99.9% uptime SLA, which equals less than 9 hours of unplanned downtime per year. Our infrastructure includes redundant servers, automatic failover, and 24/7 monitoring with instant alerts. In practice, most hosted sites experience zero unplanned downtime in a given year.',
  },
  {
    question: 'Can you migrate my website from another host?',
    answer:
      'Yes, migration is included at no extra cost. We handle the full transfer — DNS configuration, SSL setup, file migration, database migration, and email migration if applicable — with zero downtime. The cutover happens during a low-traffic window so your visitors never notice the transition.',
  },
  {
    question: 'Is your hosting optimized for Next.js and React?',
    answer:
      'Yes. Our infrastructure is purpose-built for Next.js applications deployed on Vercel\'s edge network — not a generic shared hosting environment. This means server-side rendering, ISR (Incremental Static Regeneration), edge functions, and image optimization all perform at their peak, giving you the fastest possible load times.',
  },
];

export const serviceContent: Record<string, ServiceEntry> = {
  'web-design': {
    path: '/services/web-design',
    breadcrumbLabel: 'Web Design',
    schemaName: 'Custom Web Design Toronto',
    schemaDescription:
      'Professional custom website design and development for Toronto & GTA businesses. Built with Next.js for performance, SEO, and modern user experiences.',
    features: ['Custom UI/UX Design', 'Responsive Development', 'Performance Optimization', 'SEO Integration', 'Clean Code Architecture', 'Security & Accessibility'],
    faqs: webDesignFaqs,
  },
  ecommerce: {
    path: '/services/ecommerce',
    breadcrumbLabel: 'E-Commerce',
    schemaName: 'E-Commerce Web Design Toronto',
    schemaDescription:
      'Professional e-commerce website design and development for Toronto & GTA businesses. Shopify stores, custom storefronts, payment integration, and conversion optimization.',
    features: ['Shopify Development', 'Payment Integration', 'Product Management', 'Conversion Optimization', 'Analytics & Reporting', 'Multi-Currency & Tax'],
    faqs: ecommerceFaqs,
  },
  'logo-design': {
    path: '/services/logo-design',
    breadcrumbLabel: 'Logo Design',
    schemaName: 'Logo Design & Brand Identity Toronto',
    schemaDescription:
      'Professional logo design and brand identity for Toronto & GTA businesses. Custom logos, colour palettes, typography, and complete brand guidelines with unlimited revisions.',
    features: ['Custom Logo Creation', 'Color Psychology', 'Typography Selection', 'Brand Guidelines', 'Visual Identity System', 'Multi-Format Delivery'],
    faqs: logoDesignFaqs,
  },
  'business-cards': {
    path: '/services/business-cards',
    breadcrumbLabel: 'Business Cards',
    schemaName: 'Business Card Design Toronto',
    schemaDescription:
      'Professional business card design for Toronto & GTA professionals. Premium print-ready designs with spot UV, foil, and soft-touch options. 3–5 day turnaround.',
    features: ['Print-Ready Files', 'Premium Materials', 'Brand-Consistent Design', 'Fast Turnaround', 'Double-Sided Layouts', 'Finishing Options'],
    faqs: businessCardsFaqs,
  },
  seo: {
    path: '/services/seo',
    breadcrumbLabel: 'SEO Services',
    schemaName: 'SEO Services Toronto',
    schemaDescription:
      'Professional SEO services for Toronto & GTA businesses. Local SEO, technical optimization, keyword research, and Google ranking improvements. Month-to-month, no contracts.',
    features: ['Local SEO', 'Technical SEO', 'Content Strategy', 'Keyword Research', 'On-Page Optimization', 'Link Building'],
    faqs: seoFaqs,
  },
  hosting: {
    path: '/services/hosting',
    breadcrumbLabel: 'Web Hosting',
    schemaName: 'Managed Web Hosting Toronto',
    schemaDescription:
      'Managed web hosting and maintenance for Toronto businesses. 99.9% uptime SLA, SSL, global CDN, daily backups, and priority support. Plans from $45/month. Migration included.',
    features: ['Managed Hosting', 'SSL & Security', 'Daily Backups', 'Global CDN', 'Uptime Monitoring', 'Priority Support'],
    faqs: hostingFaqs,
  },
};
