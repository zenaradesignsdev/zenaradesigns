// FAQ content — single source of truth.
// Shared between the FAQ page component (rendering) and the /faq route
// (server-rendered FAQPage JSON-LD). Kept icon-free so it can be imported
// from a server component without pulling client-only dependencies.
//
// The Services & Features and Technical & Support sections reuse FAQ items
// straight from service-content.ts (each service's own detail page) rather
// than maintaining independent copies — so pricing figures can never drift
// between a service page and this hub the way they previously did.

import {
  ecommerceFaqs,
  brandingFaqs,
  seoFaqs,
  geoFaqs,
  websiteRedesignFaqs,
  websiteMaintenanceFaqs,
} from './service-content';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  title: string;
  faqs: FaqItem[];
}

// Pricing & value FAQ items — defined once and reused by both the full
// /faq page and the curated /pricing page subset below, so figures and
// wording can never drift between the two pages.
const packagesOverviewFaq: FaqItem = {
  question: 'What are your web design packages and pricing?',
  answer:
    'We offer three main packages with fixed, transparent pricing: Starter ($999) for individuals and freelancers with 1–3 pages and a 3–5 day turnaround, Small Business ($1,999) for growing businesses with up to 6 pages and a 1–2 week turnaround, and Pro ($4,999+) for advanced functionality with custom integrations and a 3–4 week turnaround. Starter and Small Business are currently $500 off for a limited time. Every package includes mobile-responsive design, professional SEO setup, and SSL security — affordable pricing with no hidden fees.',
};

const launchPackageFaq: FaqItem = {
  question: "What's included in the Small Business Launch Package ($2,000)?",
  answer:
    "The Small Business Launch Package is our all-in-one launch bundle for a flat $2,000 — everything a small business needs to go live professionally, in one transparent price. It includes a full custom website, branding assets (logo design + business card design), Google Business Profile setup and optimization, Instagram setup (if needed) with 3 starter posts, 1 month of free hosting and care, and local SEO optimization across 5 service areas. It's the fastest, most affordable way to launch a complete professional presence in a single step.",
};

const affordablePricingFaq: FaqItem = {
  question: 'Is Zenara Designs actually affordable, or are there hidden costs later?',
  answer:
    "Our pricing is upfront and transparent — the price you're quoted is the price you pay, with no hidden fees or surprise add-ons. Packages start at $999 (currently $499 for a limited time), making professional web design affordable for small businesses across Markham and the GTA, not just large companies with big budgets. Any custom work outside your chosen package is always scoped and approved with you before we start.",
};

const competitivePricingFaq: FaqItem = {
  question: 'How is your pricing so competitive without sacrificing quality?',
  answer:
    'We use modern, AI-assisted development workflows that let a small, senior team deliver agency-quality websites faster and with less overhead than a traditional studio — savings we pass on to you as fair, competitive pricing. You still get a fully custom, professional design built from scratch (no templates or page builders), fast turnaround, and direct access to the same team throughout the entire project.',
};

const paymentPlansFaq: FaqItem = {
  question: 'Do you offer payment plans?',
  answer:
    "Yes — we offer 50% upfront and 50% on completion for all projects, so you're never paying in full before work begins. For Pro projects over $10k we can discuss a custom payment schedule. We accept e-transfer, cheque, and credit card.",
};

const hiddenCostsFaq: FaqItem = {
  question: 'Are there any hidden costs?',
  answer:
    "No hidden costs, ever. Our pricing is fully transparent and includes everything listed in your package. The only additional costs come from features requested beyond your chosen plan, and we'll always quote and confirm those with you upfront before any work starts.",
};

const upgradePlanFaq: FaqItem = {
  question: 'Can I upgrade my plan or add the Launch Package later?',
  answer:
    "Absolutely. You can upgrade from Starter to Small Business or Pro at any time, or add branding, Google Business, and local SEO from the Launch Package onto an existing site. We'll adjust pricing accordingly and scope the additional work with you before starting.",
};

// Process & timeline FAQ items — defined once and reused by both the full
// /faq page and the curated /process page subset below.
const timelineFaq: FaqItem = {
  question: 'How long does it take to build a website?',
  answer:
    'Most websites launch in 1-2 weeks, depending on complexity and requirements. Starter sites can be ready in 3–5 days, while larger projects with custom features take 3-4 weeks. Our specific timelines are: Starter (3–5 days), Small Business (1-2 weeks), and Pro (3-4 weeks). We work efficiently while ensuring quality results.',
};

const designProcessFaq: FaqItem = {
  question: "What's your design process?",
  answer:
    'We follow the same 6-phase process on every project: Discovery, Prototyping, Build, Quality Testing, Launch, and Support. We keep you involved at each phase — reviewing the brief, approving wireframes, and previewing the live build — so nothing about the final site surprises you.',
};

const revisionsFaq: FaqItem = {
  question: 'How many revisions are included?',
  answer:
    'Starter includes 1 round of revisions, Small Business includes 2 rounds, and Pro includes unlimited revisions. Additional revision rounds can be purchased if needed.',
};

const postLaunchChangesFaq: FaqItem = {
  question: 'What if I need changes after launch?',
  answer:
    'All plans include post-launch support (14-60 days depending on plan). After that, we offer managed hosting and maintenance plans, starting at $45/month, for ongoing updates, security, and support.',
};

const packageInclusionsFaq: FaqItem = {
  question: "What's included in your web design package?",
  answer:
    'Our packages include custom design, fully responsive development, SEO optimization, SSL security setup, performance optimization, and post-launch support. Brand guidelines, logo design, and business card design are available as add-ons or bundled into the Small Business Launch Package.',
};

// Hub-only content — questions that don't belong to any single service or
// industry page, so they're written once here rather than pulled in.
const industriesServedFaq: FaqItem = {
  question: 'What industries do you serve?',
  answer:
    'We build for four core industries — renovation and contractor companies, physiotherapy and wellness clinics, accounting and mortgage brokerage firms, and law firms — with dedicated pages showing work built specifically for each. We also take on general web design projects outside those four across Markham, Stouffville, Scarborough, Toronto, Mississauga, Richmond Hill, Vaughan, and Pickering.',
};

const differentiationFaq: FaqItem = {
  question: 'What makes your websites different?',
  answer:
    'We focus on business results, not just aesthetics — every design decision is made with conversion in mind. We build with modern, fast-loading technology, mobile-first responsive design, and SEO best practices from day one, and you have direct access to our team throughout the project.',
};

const caslComplianceFaq: FaqItem = {
  question: 'What are CASL compliance requirements?',
  answer:
    "Canada's Anti-Spam Legislation (CASL) requires explicit consent for commercial emails. We ensure all contact forms and email marketing integrations comply with CASL, including proper consent mechanisms, unsubscribe options, and sender identification.",
};

const hostingLocationFaq: FaqItem = {
  question: 'What hosting locations work best for the GTA traffic?',
  answer:
    'We recommend Canadian data centres or US East Coast servers for optimal performance across the GTA. This keeps latency under 50ms for local visitors, and our CDN uses Toronto edge locations — the nearest major point of presence.',
};

export const faqSections: FaqSection[] = [
  {
    title: 'Pricing & Packages',
    faqs: [
      packagesOverviewFaq,
      launchPackageFaq,
      affordablePricingFaq,
      competitivePricingFaq,
      paymentPlansFaq,
      hiddenCostsFaq,
      upgradePlanFaq,
    ],
  },
  {
    title: 'Process & Timeline',
    faqs: [
      timelineFaq,
      designProcessFaq,
      revisionsFaq,
      postLaunchChangesFaq,
      packageInclusionsFaq,
    ],
  },
  {
    title: 'Services & Features',
    // One representative question pulled from each service's own detail
    // page, plus two hub-only questions that don't belong to a single service.
    faqs: [
      ecommerceFaqs[0],
      brandingFaqs[0],
      seoFaqs[1],
      geoFaqs[0],
      websiteRedesignFaqs[0],
      industriesServedFaq,
      differentiationFaq,
    ],
  },
  {
    title: 'Technical & Support',
    faqs: [
      websiteMaintenanceFaqs[0],
      websiteMaintenanceFaqs[1],
      websiteMaintenanceFaqs[4],
      caslComplianceFaq,
      hostingLocationFaq,
    ],
  },
  {
    title: 'Serving the GTA',
    faqs: [
      {
        question: 'Do you actually work in the GTA?',
        answer:
          "Yes. the GTA is our primary service area — Markham, Stouffville, and Scarborough. We're based in Markham, about twenty minutes from Pickering, and we also serve Vaughan, Scarborough, and Toronto. We'll tell you plainly where we are rather than implying an office on every street corner.",
      },
      {
        question: 'Do you offer in-person meetings in the GTA?',
        answer:
          "Yes. We'll come to your Markham, Stouffville, Scarborough, or Toronto location for the kickoff meeting, and we're happy to meet in person again at any point in the build. Most day-to-day work happens over video call and email, which is what keeps our timelines short and our pricing fixed.",
      },
      {
        question: 'What do the GTA customers expect from a local business website?',
        answer:
          'Fast loading on mobile, a phone number that is one tap away, clear service areas, and real proof of past work. For trades and clinics in particular, visitors want to see that you actually serve their town — a site that names Stouffville or Unionville specifically converts better than one that vaguely says "serving the GTA."',
      },
      {
        question: 'Can you help my business rank in the GTA searches?',
        answer:
          "That's the core of what we do. We build city-specific landing pages, implement LocalBusiness schema, optimize your Google Business Profile, and build citations with local organizations like the Markham Board of Trade and your municipal chamber of commerce. Local organic rankings in these markets are winnable in a way they are not for the broad Toronto terms.",
      },
      {
        question: 'Why focus on the GTA instead of Toronto?',
        answer:
          "Toronto's web design market is saturated with agencies that have decades of history and hundreds of clients. The suburban markets around our Markham base are served largely by small local shops, which means a business investing in a genuinely good website can rank — and stay ranked. We would rather be the best option in Markham or Stouffville than the four-hundredth in Toronto.",
      },
      {
        question: 'Do you work with businesses outside the GTA?',
        answer:
          'Yes. Markham and the surrounding GTA are our focus, but we build for clients across Ontario and beyond. Every consultation, design review, and revision round happens remotely by video call, so distance is never a constraint on the work itself.',
      },
    ],
  },
];

// Flattened list of all FAQ items — used for FAQPage structured data.
export const faqItems: FaqItem[] = faqSections.flatMap((section) => section.faqs);

// FAQPage JSON-LD schema, built from the canonical FAQ content above.
export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://zenaradesigns.com/faq#faqpage',
  mainEntity: faqItems.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

// Curated price/value subset rendered on the /pricing page — reuses the same
// FAQ objects as the "Pricing & Packages" section above so the two pages can
// never say different things about the same question.
export const pricingPageFaqs: FaqItem[] = [
  packagesOverviewFaq,
  launchPackageFaq,
  affordablePricingFaq,
  competitivePricingFaq,
  paymentPlansFaq,
  hiddenCostsFaq,
  upgradePlanFaq,
];

// FAQPage JSON-LD schema for the /pricing page, built from the subset above.
export const pricingPageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://zenaradesigns.com/pricing#faqpage',
  mainEntity: pricingPageFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

// Curated process/timeline subset rendered on the /process page — reuses the
// same FAQ objects as the "Process & Timeline" section above, so the two
// pages can never describe the process or timelines differently.
export const processPageFaqs: FaqItem[] = [
  timelineFaq,
  designProcessFaq,
  revisionsFaq,
  postLaunchChangesFaq,
  packageInclusionsFaq,
];

// FAQPage JSON-LD schema for the /process page, built from the subset above.
export const processPageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://zenaradesigns.com/process#faqpage',
  mainEntity: processPageFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};
