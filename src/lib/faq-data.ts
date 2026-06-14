// FAQ content — single source of truth.
// Shared between the FAQ page component (rendering) and the /faq route
// (server-rendered FAQPage JSON-LD). Kept icon-free so it can be imported
// from a server component without pulling client-only dependencies.

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  title: string;
  faqs: FaqItem[];
}

export const faqSections: FaqSection[] = [
  {
    title: 'Pricing & Packages',
    faqs: [
      {
        question: 'What are your web design packages and pricing?',
        answer:
          'We offer three main packages: Starter ($999) for individuals with 1-3 pages and 1 week turnaround, Small Business ($1,999) for businesses with up to 6 pages and 2-3 weeks turnaround, and Pro ($4,999+) for advanced functionality with unlimited pages and 3-4 weeks turnaround. All include mobile-responsive design, SEO optimization, and SSL security.',
      },
      {
        question: 'Do you offer payment plans?',
        answer:
          'Yes! We offer 50% upfront and 50% on completion for all projects. For Pro projects over $10k, we can discuss custom payment schedules. We accept e-transfers, cheques, and credit cards.',
      },
      {
        question: "What's included in each pricing plan?",
        answer:
          'Starter includes 1-3 pages and basic features. Small Business includes up to 6 pages with custom sections and 2 revisions. Pro includes unlimited pages, advanced integrations, and priority support. All plans include mobile optimization, SEO basics, SSL security, and hosting.',
      },
      {
        question: 'Are there any hidden costs?',
        answer:
          "No hidden costs! Our pricing is transparent and includes everything listed. The only additional costs would be if you request features beyond what's included in your chosen plan, and we'll always discuss these upfront.",
      },
      {
        question: 'Can I upgrade my plan during the project?',
        answer:
          "Absolutely! You can upgrade from Starter to Small Business or Pro at any time. We'll adjust the pricing accordingly and add the new features to your project.",
      },
      {
        question: 'Do you provide business card design services?',
        answer:
          'Yes! We offer professional business card design services across the GTA. Our packages range from $149-$399 for professional cards and $299-$599 for executive cards with premium finishes like foil stamping and embossing.',
      },
    ],
  },
  {
    title: 'Process & Timeline',
    faqs: [
      {
        question: 'How long does it take to build a website?',
        answer:
          'Most websites are completed within 2-4 weeks, depending on complexity and requirements. Simple sites can be ready in 1-2 weeks, while more complex projects with custom features may take 3-4 weeks. Our specific timelines are: Starter (1 week), Small Business (2-3 weeks), and Pro (3-4 weeks). We work efficiently while ensuring quality results.',
      },
      {
        question: "What's your design process?",
        answer:
          'We follow a proven 6-step process: Discovery & Planning, Design & Wireframes, Development & Coding, Content Integration, Testing & Optimization, and Launch & Support. We keep you involved throughout each step to ensure the final product meets your vision.',
      },
      {
        question: 'How many revisions are included?',
        answer:
          'Starter includes 1 round of revisions, Small Business includes 2 rounds, and Pro includes unlimited revisions. Additional revision rounds can be purchased if needed.',
      },
      {
        question: 'What if I need changes after launch?',
        answer:
          'All plans include post-launch support (14-60 days depending on plan). After that, we offer maintenance packages for ongoing updates, security, and support.',
      },
      {
        question: "What's included in your web design package?",
        answer:
          'Our packages include custom design, fully responsive development, SEO optimization, SSL security setup, performance optimization, and post-launch support. We also provide brand guidelines, logo design options, and business card design as part of our comprehensive service.',
      },
    ],
  },
  {
    title: 'Services & Features',
    faqs: [
      {
        question: 'Can you help with e-commerce development?',
        answer:
          'Yes! We specialize in e-commerce development using platforms like Shopify, WooCommerce, and custom solutions. Small e-commerce stores start at $2,999-$4,999, with enterprise solutions available by quote.',
      },
      {
        question: "What's included in logo design services?",
        answer:
          'Our logo design services include 3 initial concepts, unlimited revisions, vector and raster formats, brand guidelines, and usage rights. Basic logo design starts at $99-$199, with complete brand identity available by quote.',
      },
      {
        question: 'Do you offer SEO services?',
        answer:
          'Absolutely! We provide comprehensive SEO services including keyword research, on-page optimization, local SEO, Google My Business optimization, and ongoing SEO maintenance to improve search rankings.',
      },
      {
        question: 'What industries do you serve?',
        answer:
          'We serve all industries across the GTA including restaurants, real estate, healthcare, legal services, retail, professional services, nonprofits, and startups. Our experience spans Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington.',
      },
      {
        question: 'What makes your websites different?',
        answer:
          'We focus on business results, not just aesthetics. Every design decision is made with conversion optimization in mind. We use modern, fast-loading technologies, ensure mobile-first responsive design, and build with SEO best practices from day one. Plus, you get direct access to our team throughout the project.',
      },
    ],
  },
  {
    title: 'Technical & Support',
    faqs: [
      {
        question: 'Do you provide hosting and maintenance?',
        answer:
          'Yes! We offer comprehensive hosting solutions with 99.9% uptime guarantee, automated backups, and ongoing maintenance support. Our hosting plans include SSL certificates, CDN integration, and 24/7 monitoring. We also provide monthly maintenance packages for updates and support. Hosting can be handled internally for $10-$30/month (SSL included) or we can help you set up with external providers.',
      },
      {
        question: 'Do you handle hosting and domain setup?',
        answer:
          'Yes! We can handle hosting internally for $10-$30/month (SSL included) or help you set up with external providers. We also assist with domain registration and DNS setup.',
      },
      {
        question: "What happens if I'm not satisfied with the design?",
        answer:
          "We work closely with you throughout the process to ensure you love the result. If you're not satisfied, we'll work with you to make it right. Our goal is your success and satisfaction.",
      },
      {
        question: 'Do you provide website maintenance services?',
        answer:
          'Yes! We offer ongoing website maintenance services including security updates, content updates, performance optimization, backup management, and technical support. Our maintenance plans start at $99/month.',
      },
      {
        question: 'Can you help with existing websites?',
        answer:
          'We can assist with existing websites if they use a similar technology stack to our preferred modern frameworks. If your current site uses a different technology stack, we typically recommend building a new site with our modern approach for optimal performance and maintainability.',
      },
      {
        question: 'What are CASL compliance requirements?',
        answer:
          "Canada's Anti-Spam Legislation (CASL) requires explicit consent for commercial emails. We ensure all contact forms and email marketing integrations comply with CASL, including proper consent mechanisms, unsubscribe options, and sender identification.",
      },
      {
        question: 'What hosting locations work best for Toronto traffic?',
        answer:
          'We recommend hosting with Canadian data centers or US East Coast servers for optimal Toronto performance. This reduces latency to under 50ms for GTA users. We use CDN services with Toronto edge locations.',
      },
    ],
  },
  {
    title: 'Toronto & GTA Specific',
    faqs: [
      {
        question: 'What makes your agency different in Toronto?',
        answer:
          'As a Toronto-based web design agency, we understand local business needs. We offer personalized service, competitive pricing, fast turnaround times, and comprehensive support for businesses across the GTA.',
      },
      {
        question: 'Do you offer in-person meetings in Toronto?',
        answer:
          'Yes! We offer in-person consultations at your Toronto office or convenient downtown locations. We can meet at coffee shops in the Financial District, Yorkville, or other central locations. For GTA businesses, we can arrange meetings at local co-working spaces.',
      },
      {
        question: 'What do Toronto customers expect from local business websites?',
        answer:
          'Toronto customers expect fast-loading, mobile-first websites with clear contact information, local business hours, and easy navigation. They also value local testimonials, neighborhood-specific content, and Google My Business integration.',
      },
      {
        question: 'What are the mobile usage trends in the GTA?',
        answer:
          'Over 70% of GTA residents use mobile devices for local business searches. Toronto has excellent 5G coverage, so we optimize for fast mobile loading across iPhones, Android devices, and various screen sizes.',
      },
      {
        question: 'Can you help with Toronto-specific integrations?',
        answer:
          'Absolutely! We integrate with Toronto-specific services like TTC route planning, local weather APIs, Toronto event calendars, and Canadian payment processors. We can also connect your website with local business networks.',
      },
      {
        question: "What's your experience with Toronto's tech startup scene?",
        answer:
          'We work with many Toronto startups and understand the fast-paced, budget-conscious nature of the local tech scene. We offer startup-friendly pricing, rapid development cycles, and scalable solutions that grow with your business.',
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
