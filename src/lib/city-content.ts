// City-level web-design landing page content — single source of truth.
//
// Each city is hand-written and genuinely distinct (real neighborhoods, real
// local economy, real business districts). No fabricated statistics, reviews,
// or clients. Imported by the server route (SSR schema + metadata) and the
// presentational component. See SEO-RANKING-PLAN.md §6 / §11.

export interface CityFaq {
  question: string;
  answer: string;
}

export interface CityIndustry {
  label: string;
  href: string;
}

export interface CityWhyPoint {
  title: string;
  body: string;
}

export interface CityContent {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroIntro: string;
  intro: string;
  economy: string;
  neighborhoods: string[];
  whyPoints: CityWhyPoint[];
  industries: CityIndustry[];
  faqs: CityFaq[];
  /** Optional — populated as each city page gets the full visual redesign. */
  heroImage?: string;
  heroImageAlt?: string;
  /** 2–3 sentences on why local SEO matters specifically in this city. */
  localSeoBody?: string;
  /** 1–2 sentences on local GEO / AI-search visibility for this city. */
  geoBody?: string;
  /** Short callout for small businesses, shown in the industries section. */
  smallBusinessNote?: string;
  /** Short list of the city's core industry sectors, drawn from `economy`. */
  focusAreas?: string[];
  /** 3 slugs from `allProjects`, chosen per city for thematic fit and order. */
  featuredProjectSlugs?: string[];
  /**
   * Render order for the 5 reorderable middle sections (Hero and the final
   * CTA are always first/last). Falls back to DEFAULT_SECTION_ORDER when
   * omitted, so cities without a redesign yet still render correctly.
   */
  sectionOrder?: SectionKey[];
}

export type SectionKey = 'advantage' | 'whatYouGet' | 'recentWork' | 'industries' | 'faq';

export const DEFAULT_SECTION_ORDER: SectionKey[] = ['advantage', 'whatYouGet', 'recentWork', 'industries', 'faq'];

// The per-city industry pages (/lawyers/markham and friends) were retired — 33
// of them were ~90% identical to one another and produced zero clicks — and now
// 301 to their hub. Every city page links to the four hubs instead, which carry
// the real vertical content.
const INDUSTRY_LINKS: CityIndustry[] = [
  { label: 'Law firms', href: '/lawyers' },
  { label: 'Accounting firms', href: '/accountants' },
  { label: 'Renovation companies', href: '/renovations' },
  { label: 'Wellness clinics', href: '/clinics' },
];

export interface RecentWorkProject {
  name: string;
  tag: string;
  description: string;
  image: string;
  imageAlt: string;
  slug: string;
  url: string;
}

// The full pool of real client projects. Each city page features 3 of
// these, chosen and ordered per city for thematic fit, so no two city pages
// show the same trio in the same order. None are tied to a specific GTA city,
// so city pages frame this honestly as recent work, not local case studies.
export const allProjects: RecentWorkProject[] = [
  {
    name: 'AshCam Cutting Solutions',
    tag: 'E-commerce & Construction',
    description: 'A modern e-commerce platform for a construction supplier, built for industrial customers who order online.',
    image: '/images/ashcam-site.png',
    imageAlt: 'AshCam Cutting Solutions website — construction blades and equipment e-commerce platform',
    slug: 'ashcam-cutting-solutions',
    url: 'https://ashcamcuttingsolution.ca/',
  },
  {
    name: 'JB Loans',
    tag: 'Mortgage Broker',
    description: 'A professional mortgage broker site helping clients find the right loan with a seamless application process.',
    image: '/images/jbloans.png',
    imageAlt: 'JB Loans mortgage broker website — professional mortgage services platform',
    slug: 'jb-loans',
    url: 'https://jbloans.ca/',
  },
  {
    name: 'IK Smart Solution',
    tag: 'Security & Smart Home',
    description: 'Custom surveillance, access control, and smart home installations for residential and commercial properties.',
    image: '/images/iksmartsolutions.png',
    imageAlt: 'IK Smart Solution website — custom security and smart home systems integrator',
    slug: 'ik-smart-solution',
    url: 'https://www.iksmartsolution.ca/',
  },
  {
    name: 'FunGen Events',
    tag: 'Event Planning',
    description: 'A polished, professional online presence built to showcase an event planning company’s services and offerings.',
    image: '/images/fungen-events.png',
    imageAlt: 'FunGen Events website — event planning business website design',
    slug: 'fungen-events',
    url: 'https://fungenevents.ca/',
  },
  {
    name: "Patty's Delights",
    tag: 'Food & Beverage',
    description: 'A warm, appetizing online presence built to showcase the menu and bring customers in the door.',
    image: '/images/pattys-delights.png',
    imageAlt: "Patty's Delights website — food and beverage business website design",
    slug: 'pattys-delights',
    url: 'https://pattysdelights.com/',
  },
  {
    name: 'Heroes Catering',
    tag: 'Catering',
    description: 'A clean, appetizing online presence showcasing catering services and menu offerings.',
    image: '/images/heroes-catering.png',
    imageAlt: 'Heroes Catering website — catering business website design',
    slug: 'heroes-catering',
    url: 'https://heroes-catering.com/',
  },
];

export const cityContent: Record<string, CityContent> = {
  markham: {
    slug: 'markham',
    city: 'Markham',
    region: 'York Region',
    metaTitle: 'Web Design Markham | Custom Business Websites | Zenara',
    metaDescription:
      'Custom web design in Markham — Unionville, Cornell, Downtown Markham. Modern, fast, multilingual-ready sites for a tech-savvy market. Free consultation.',
    heroIntro: 'Websites built for Markham’s tech-driven, multicultural business community.',
    intro:
      'Markham is Canada’s high-tech capital outside Toronto — and customers here judge a business by its website in seconds.',
    economy:
      'A tech-literate population that expects polished, credible digital experiences — and rewards the businesses that deliver first.',
    neighborhoods: [
      'Downtown Markham',
      'Unionville',
      'Cornell',
      'Milliken',
      'Markham Village',
      'Berczy',
      'Cathedraltown',
    ],
    whyPoints: [
      {
        title: 'Tech-Savvy Audience',
        body: 'Fast, modern, credible — builds that feel current in one of Canada’s most digitally literate markets.',
      },
      {
        title: 'Multilingual-Ready',
        body: 'Large Chinese-Canadian and South Asian communities mean key pages in a second language meaningfully expand your reach.',
      },
      {
        title: 'Hyper-Local Content',
        body: 'We reference Unionville, Downtown Markham, and the Highway 7 corridor to capture the searches that convert.',
      },
    ],
    industries: INDUSTRY_LINKS,
    faqs: [
      {
        question: 'How much does a website cost in Markham?',
        answer:
          'Markham projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds — each including responsive design, SEO, and SSL with transparent pricing.',
      },
      {
        question: 'Do I need a multilingual website?',
        answer:
          'Given Markham’s large Chinese-Canadian and South Asian populations, offering key pages in a second language can meaningfully widen your audience and signal that you understand the community you serve. We build sites ready for that.',
      },
      {
        question: 'Can you build a site for a Markham tech startup?',
        answer:
          'Yes. We build modern, fast, scalable sites on current frameworks — well suited to startups along the Highway 7 corridor that need a credible presence and room to grow.',
      },
      {
        question: 'How long does it take to build a website?',
        answer:
          'Most Markham projects launch in one to two weeks, with a focused starter site ready in 3–5 days.',
      },
    ],
    heroImage: '/images/markham-business-district.jpg',
    heroImageAlt: 'Modern glass office building in a business district, representing Markham’s Highway 7 tech corridor',
    localSeoBody:
      'We optimize your Google Business Profile and build citations with real local organizations — the Markham Board of Trade and your municipal chamber of commerce — instead of running a generic national SEO checklist. Pages that name Unionville or the Highway 7 corridor specifically outrank ones that just say "serving the GTA."',
    geoBody:
      'And when someone asks ChatGPT or Perplexity for a web designer near Markham, we want your business in that answer too — not just page one of Google.',
    smallBusinessNote:
      'Markham runs on small business as much as it does on tech — the independent clinics, accountants, and shops serving Unionville and Cornell need the same credibility online as the Highway 7 corporates next door. We price and build for that reality.',
    focusAreas: ['Technology', 'Professional Services', 'Healthcare', 'Retail'],
    featuredProjectSlugs: ['ik-smart-solution', 'jb-loans', 'ashcam-cutting-solutions'],
    sectionOrder: DEFAULT_SECTION_ORDER,
  },
  stouffville: {
    slug: 'stouffville',
    city: 'Stouffville',
    region: 'York Region',
    metaTitle: 'Web Design Stouffville | Custom Business Sites | Zenara',
    metaDescription:
      'Custom web design in Stouffville for local and commuter-community businesses. Fast, modern, SEO-optimized websites. Free consultation, transparent pricing.',
    heroIntro: 'Websites for Stouffville businesses serving a fast-growing commuter community.',
    intro:
      'Whitchurch-Stouffville has grown rapidly from a small town into a thriving commuter community — and new residents research local businesses online before ever visiting.',
    economy:
      'Stouffville’s economy centres on a historic Main Street retail and dining district, personal and professional services, and trades supporting fast residential growth. Its family-oriented, commuter population researches locally online, often from mobile, rewarding businesses with clear, fast, credible websites.',
    neighborhoods: [
      'Historic Main Street',
      'Wheler’s Mill',
      'Cardinal Point',
      'Byers Pond',
      'Hoover Park',
      'Country Glen',
      'Ballantrae',
    ],
    whyPoints: [
      {
        title: 'Grow with a fast-expanding town',
        body: 'As Stouffville’s population climbs, a strong website helps you capture new local customers early.',
      },
      {
        title: 'Reach commuters on mobile',
        body: 'Stouffville’s commuter families search on the move — we build fast, mobile-first sites with click-to-call.',
      },
      {
        title: 'Community-credible, affordable design',
        body: 'Polished, custom sites at small-business prices that read as established and local.',
      },
    ],
    industries: INDUSTRY_LINKS,
    faqs: [
      {
        question: 'Is Stouffville too small a market to justify a professional website?',
        answer:
          'The opposite, actually. Whitchurch-Stouffville is one of the fastest-growing towns in York Region, and most of those new residents have no existing loyalty to any local business — they search online to find one. A polished website is how you become their first choice before a competitor does.',
      },
      {
        question: 'My shop already gets regulars from foot traffic — do I still need a site?',
        answer:
          'Foot traffic keeps existing customers coming back, but it does nothing for the growing number of new residents who research a business online before ever walking past it. A website extends your reach beyond Main Street to everyone moving into town.',
      },
      {
        question: 'Can you help me compete as national chains move into Stouffville?',
        answer:
          "Yes. Big-box competitors win on price and convenience, not on story or craft. We build sites that lead with what makes your business genuinely local — your history on Main Street, your service, the things a chain can't replicate.",
      },
      {
        question: "What's included in the Starter plan for a small Stouffville shop?",
        answer:
          'The $999 Starter plan covers up to 3 pages — typically Home, About, and Contact — with mobile-responsive design, basic SEO setup, and a 3–5 day turnaround. It suits a shop or trade business that needs a credible presence fast without a large page count.',
      },
    ],
    heroImage: '/images/stouffville-main-street.jpg',
    heroImageAlt: 'Historic storefronts along Main Street Stouffville, Ontario',
    localSeoBody:
      'We optimize your Google Business Profile and build citations with real local organizations — the Whitchurch-Stouffville Chamber of Commerce among them — so your business shows up for Stouffville-specific searches, not just the broader York Region term everyone else is chasing.',
    geoBody:
      "When a new resident asks ChatGPT or Perplexity for a good local business in Stouffville, we want your site structured so it can actually be the answer — not buried under results built for Toronto.",
    smallBusinessNote:
      'Most of the businesses lining Main Street are independently owned, and that\'s exactly who we build for — trades, clinics, and shops that need to look established online without an agency-sized budget.',
    focusAreas: ['Retail & Dining', 'Trades', 'Personal Services', 'Professional Services'],
    featuredProjectSlugs: ['ashcam-cutting-solutions', 'heroes-catering', 'pattys-delights'],
    sectionOrder: ['advantage', 'recentWork', 'whatYouGet', 'industries', 'faq'],
  },
  scarborough: {
    slug: 'scarborough',
    city: 'Scarborough',
    region: 'City of Toronto',
    metaTitle: 'Web Design Scarborough | Small Business Sites | Zenara',
    metaDescription:
      'Custom web design in Scarborough for small and growing businesses. Fast, modern, SEO-optimized sites that win local customers. Free consultation.',
    heroIntro: 'Websites for the small businesses powering one of Toronto’s most diverse communities.',
    intro:
      'Scarborough is one of the most culturally diverse parts of Toronto, home to thousands of small and family-run businesses — and customers increasingly check online before they ever visit.',
    economy:
      'Scarborough’s economy runs on a vast base of independent retailers, restaurants, clinics, and service businesses serving diverse, community-oriented neighbourhoods, alongside healthcare and education anchors. These are exactly the businesses customers look up before visiting, so a credible, mobile-fast website directly shapes who they choose.',
    neighborhoods: [
      'Scarborough Town Centre',
      'Agincourt',
      'Malvern',
      'Birch Cliff',
      'Guildwood',
      'West Hill',
      'Cliffside',
    ],
    whyPoints: [
      {
        title: 'Turn reputation into online reach',
        body: 'Strong community reputations don’t always show up in search — we build sites that capture that research while reinforcing the trust you’ve already earned.',
      },
      {
        title: 'Affordable, professional design',
        body: 'Polished, custom sites at small-business prices — ideal for Scarborough’s independent and family-run businesses.',
      },
      {
        title: 'Built for diverse, mobile-first customers',
        body: 'Most Scarborough searches happen on phones — we build fast, mobile-first sites with click-to-call.',
      },
    ],
    industries: INDUSTRY_LINKS,
    faqs: [
      {
        question: 'Can you build a multilingual site for my Scarborough customers?',
        answer:
          'Yes. Scarborough is one of the most linguistically diverse parts of the country, and offering key pages in a second language — Mandarin, Cantonese, Tamil, and others are all common here — signals to customers that you understand the community you serve.',
      },
      {
        question: 'Do you understand the difference between Agincourt, Malvern, and Guildwood?',
        answer:
          "We build that distinction into your content. Scarborough isn't one neighbourhood — it's dozens of them, each with its own character and search behaviour, so we write copy that names your actual area rather than defaulting to a generic 'Scarborough' pitch.",
      },
      {
        question: 'My business already has an Instagram page — do I still need a full website?',
        answer:
          "Social media is great for visibility, but it's a rented platform you don't control, and it doesn't rank on Google the way a proper website does. A site is where a customer goes to actually decide, book, or call — Instagram just gets them there.",
      },
      {
        question: 'Do you offer payment plans for independent Scarborough businesses?',
        answer:
          'Yes — 50% upfront and 50% on completion for every project, so you\'re never paying the full amount before the work begins. That keeps a professional site within reach for independent and family-run businesses.',
      },
    ],
    heroImage: '/images/scarborough-dining-street.jpg',
    heroImageAlt: 'A restaurant-lined street with a Canadian flag, representing Scarborough’s diverse dining and small business community',
    localSeoBody:
      'We optimize your Google Business Profile and build citations with local organizations like the Scarborough Business Association, so your site ranks for searches specific to your neighbourhood — not just the broad "Scarborough" term every competitor is also chasing.',
    geoBody:
      'We also structure your content so AI tools like ChatGPT and Perplexity can read and cite it directly — useful in a market where word of mouth already carries real weight and AI-driven recommendations are becoming an extension of that.',
    smallBusinessNote:
      "Scarborough's economy runs on independent and family-run businesses more than almost anywhere else in the GTA — we build for that reality with pricing and turnaround that fit a small operation, not a corporate budget.",
    focusAreas: ['Restaurants & Retail', 'Healthcare & Clinics', 'Education', 'Community Services'],
    featuredProjectSlugs: ['pattys-delights', 'heroes-catering', 'fungen-events'],
    sectionOrder: ['advantage', 'industries', 'whatYouGet', 'recentWork', 'faq'],
  },
  toronto: {
    slug: 'toronto',
    city: 'Toronto',
    region: 'City of Toronto',
    metaTitle: 'Web Design Toronto | Custom Business Websites | Zenara',
    metaDescription:
      'Custom web design in Toronto. Fast, modern, SEO-optimized websites for businesses across the downtown core, midtown, and the wider city. Free consultation.',
    heroIntro: 'Custom websites for Toronto businesses that compete in Canada’s most crowded market.',
    intro:
      'Toronto is the most competitive business market in Canada, and that competition is just as fierce online — a template website simply blends into the noise.',
    economy:
      'Toronto’s economy spans finance and professional services downtown, technology and media in the King-Spadina area, healthcare around the hospital district, and tens of thousands of independent retailers and service businesses across its neighbourhoods. Each draws a different kind of customer who searches differently. A strong website meets that intent directly instead of relying on a generic city-wide pitch.',
    neighborhoods: [
      'Financial District',
      'Entertainment District',
      'Yorkville',
      'Queen West',
      'Liberty Village',
      'Leslieville',
      'The Annex',
      'Distillery District',
    ],
    whyPoints: [
      {
        title: 'Built to stand out in a saturated market',
        body: 'In a city this dense with competitors, a distinct visual identity is your first differentiator — not another site built from the same template.',
      },
      {
        title: 'Neighbourhood-level local SEO',
        body: 'Toronto customers search by area — "near Yorkville", "King West" — so we structure content to capture that hyper-local intent, not just the broad city term.',
      },
      {
        title: 'Performance that holds up on mobile',
        body: 'Most Toronto searches happen on phones, often on transit — we build for sub-2.5-second loads so you don’t lose impatient prospects.',
      },
    ],
    industries: INDUSTRY_LINKS,
    faqs: [
      {
        question: 'Everyone says Toronto web design is expensive — is that true here?',
        answer:
          "Agency pricing in Toronto often reflects downtown office overhead more than the actual work. We're a lean, two-person studio with fixed pricing starting at $999 — the same quality of custom build without the markup that comes from a large agency's overhead.",
      },
      {
        question: 'How is a Zenara site different from a template a big agency would sell me?',
        answer:
          "Most 'custom' sites from larger shops are page-builder templates with your logo swapped in. We build from scratch in Next.js and TypeScript — no drag-and-drop builder — so your site is faster, more distinct, and easier to extend later.",
      },
      {
        question: 'Do you only work with businesses in the downtown core?',
        answer:
          'No — we build for businesses across the city, from the Financial District to Scarborough, North York, and Etobicoke. Most of the process happens remotely by video call, so location within the city is never a constraint.',
      },
      {
        question: 'Can a small Toronto business really compete with national brands online?',
        answer:
          "Yes, on the searches that matter to you. National brands optimize for broad, expensive keywords. We target your service plus a neighbourhood or specific intent — terms a small business can actually win — while still building the credibility signals that make you look every bit as legitimate.",
      },
    ],
    heroImage: '/images/toronto-gooderham-building.jpg',
    heroImageAlt: 'The historic Gooderham (Flatiron) Building at Front and Wellington in downtown Toronto',
    localSeoBody:
      'Toronto customers search by neighbourhood — "near Yorkville," "King West," "the Beaches" — so we structure your content and citations around the areas you actually serve, working with organizations like the Toronto Region Board of Trade, rather than competing only for the broad city-wide term everyone else is bidding on.',
    geoBody:
      "In a market this saturated, showing up in AI-generated answers is a real edge — we structure your site so tools like ChatGPT and Perplexity can read and cite it directly, not just Google's algorithm.",
    smallBusinessNote:
      "Toronto's independent shops and studios are up against national brands with real marketing budgets. We build sites that lead with what a chain can't offer — a distinct identity and real local presence — at a price a small business can actually afford.",
    focusAreas: ['Finance & Professional Services', 'Technology & Media', 'Healthcare', 'Independent Retail'],
    featuredProjectSlugs: ['jb-loans', 'ik-smart-solution', 'fungen-events'],
    sectionOrder: ['whatYouGet', 'advantage', 'recentWork', 'industries', 'faq'],
  },
  mississauga: {
    slug: 'mississauga',
    city: 'Mississauga',
    region: 'Peel Region',
    metaTitle: 'Web Design Mississauga | Custom Business Sites | Zenara',
    metaDescription:
      'Professional web design in Mississauga — from Square One to Port Credit. Modern, fast, SEO-optimized websites that win local customers. Free consultation.',
    heroIntro: 'Websites built for Mississauga businesses, from Square One to the waterfront.',
    intro:
      'Mississauga is Canada’s sixth-largest city and home to a remarkable concentration of corporate head offices — and its small and mid-sized businesses compete for the same customers.',
    economy:
      'Mississauga blends a corporate base — head offices clustered near the airport and the City Centre — with thousands of independent service businesses and retailers spread across distinct town centres. Port Credit and Streetsville trade on local charm; Square One anchors professional services and retail. Each pocket searches and buys differently, which is why a single generic page rarely performs as well as content built around real neighbourhoods.',
    neighborhoods: [
      'Square One / City Centre',
      'Port Credit',
      'Streetsville',
      'Meadowvale',
      'Erin Mills',
      'Cooksville',
      'Clarkson',
      'Lakeview',
    ],
    whyPoints: [
      {
        title: 'Credibility against corporate neighbours',
        body: 'Competing near corporate head offices means your site has to look every bit as polished — established and trustworthy from the first scroll.',
      },
      {
        title: 'Targeted to Mississauga’s town centres',
        body: 'A Port Credit café and an Erin Mills clinic reach different customers, so we build location-aware content that ranks where they’re actually searching.',
      },
      {
        title: 'Conversion-focused, not just pretty',
        body: 'Click-to-call, easy booking, and clear calls to action turn search traffic into real enquiries — the metric that actually matters.',
      },
    ],
    industries: INDUSTRY_LINKS,
    faqs: [
      {
        question: 'Mississauga has so many corporate agencies nearby — why choose a small studio?',
        answer:
          "Corporate agencies price for corporate clients. We're built for independent Mississauga businesses that need a genuinely custom site — not a scaled-down version of an enterprise package — at a price that makes sense for your actual size.",
      },
      {
        question: 'Do you serve businesses near the airport and corporate corridor?',
        answer:
          'Yes — alongside the independent retailers and service businesses in Port Credit, Streetsville, and the town centres, we build for the professional and corporate-adjacent firms clustered near the airport corridor.',
      },
      {
        question: 'Can you help my Port Credit business stand out from City Centre chains?',
        answer:
          "Port Credit trades on local character — that's exactly what a chain retailer near Square One can't replicate. We build sites that lead with that character instead of competing on the chain's own terms.",
      },
      {
        question: 'Do you build multilingual sites for Mississauga\'s diverse customer base?',
        answer:
          'Yes. Mississauga is home to large South Asian and other immigrant communities, and offering key pages in a second language can meaningfully widen the customers who find and trust your business.',
      },
    ],
    heroImage: '/images/mississauga-office-tower.jpg',
    heroImageAlt: 'A modern blue-glass office tower, representing Mississauga’s corporate business district',
    localSeoBody:
      'A Port Credit café and an Erin Mills clinic serve entirely different customers, so we build location-aware content and citations — through organizations like the Mississauga Board of Trade — that target your actual town centre instead of one generic "Mississauga" page trying to rank for everything.',
    geoBody:
      'We also make sure your site is structured for AI search tools, so when someone asks ChatGPT for a recommendation in your specific part of Mississauga, your business is positioned to be part of that answer.',
    smallBusinessNote:
      "Mississauga's corporate head offices set a high bar for polish — independent businesses here need a site that reads as equally established, without the corporate price tag. That's specifically what we build.",
    focusAreas: ['Corporate & Professional Services', 'Retail', 'Trades', 'Local Services'],
    featuredProjectSlugs: ['jb-loans', 'ashcam-cutting-solutions', 'ik-smart-solution'],
    sectionOrder: ['advantage', 'whatYouGet', 'industries', 'recentWork', 'faq'],
  },
  'richmond-hill': {
    slug: 'richmond-hill',
    city: 'Richmond Hill',
    region: 'York Region',
    metaTitle: 'Web Design Richmond Hill | Business Websites | Zenara',
    metaDescription:
      'Professional web design in Richmond Hill along the Yonge corridor. Fast, modern, SEO-optimized sites for local businesses. Free consultation.',
    heroIntro: 'Websites for Richmond Hill businesses along the busy Yonge Street corridor.',
    intro:
      'Richmond Hill sits at the heart of York Region with a dense, affluent, diverse population strung along the Yonge Street corridor — and a polished, fast website is the baseline expectation here.',
    economy:
      'Richmond Hill’s economy is anchored by professional and financial services, healthcare, and retail serving a prosperous, education-focused community. Customers here compare options carefully online, so businesses with clear, trustworthy, well-structured websites consistently win the consideration that leads to a call.',
    neighborhoods: [
      'Downtown Richmond Hill',
      'Oak Ridges',
      'Bayview Hill',
      'Langstaff',
      'Jefferson',
      'Crosby',
      'Mill Pond',
    ],
    whyPoints: [
      {
        title: 'Credibility for a discerning market',
        body: 'Richmond Hill’s affluent, research-driven customers expect a professional presence — sites that read as established at first glance.',
      },
      {
        title: 'Own the Yonge corridor searches',
        body: 'We optimize for Richmond Hill plus your service and key neighbourhoods, so you appear for the searches your best customers run.',
      },
      {
        title: 'Designed to convert considered buyers',
        body: 'Clear information architecture and trust signals guide careful researchers from interest to enquiry.',
      },
    ],
    industries: INDUSTRY_LINKS,
    faqs: [
      {
        question: 'Richmond Hill customers research everything before buying — how does that change my site?',
        answer:
          'It means information architecture matters as much as design. We build clear service pages, credentials, and trust signals up front, so a careful researcher finds what they need to move from consideration to a call without having to dig.',
      },
      {
        question: 'Can you build a site for a financial advisor or wealth manager?',
        answer:
          'Yes. Richmond Hill has a strong base of financial and professional services, and we build sites for that audience specifically — credibility-first design, clear service breakdowns, and secure contact paths appropriate for regulated professions.',
      },
      {
        question: 'Do you offer multilingual pages for Richmond Hill\'s Chinese-Canadian and Persian-Canadian communities?',
        answer:
          'Yes. Both communities are a significant part of Richmond Hill\'s population, and a site with key content in a second language signals directly that you understand the customers you\'re trying to reach.',
      },
      {
        question: 'My practice already gets referrals — why do I need a polished website?',
        answer:
          "Referrals bring someone to your site before they call — and in an affluent, considered market, that visit is where they decide whether the referral was right. A dated or thin site can undo a good referral in seconds.",
      },
    ],
    heroImage: '/images/richmond-hill-residential-street.jpg',
    heroImageAlt: 'A tree-lined residential street in autumn, representing Richmond Hill’s established neighbourhoods',
    localSeoBody:
      'We optimize your Google Business Profile and build citations with organizations like the Richmond Hill Board of Trade, targeting Richmond Hill plus your specialty and key neighbourhoods so you appear for the specific local searches your best customers are running.',
    geoBody:
      'We also structure content so AI tools like ChatGPT and Perplexity can surface your business directly — increasingly how careful researchers start looking, before they ever open Google.',
    smallBusinessNote:
      "Richmond Hill's affluent, research-driven customers hold every business to the same high bar — independent practices and shops need a site that reads as established, not just the larger firms down the street.",
    focusAreas: ['Professional & Financial Services', 'Healthcare', 'Retail', 'Education'],
    featuredProjectSlugs: ['heroes-catering', 'pattys-delights', 'jb-loans'],
    sectionOrder: ['advantage', 'recentWork', 'industries', 'whatYouGet', 'faq'],
  },
  vaughan: {
    slug: 'vaughan',
    city: 'Vaughan',
    region: 'York Region',
    metaTitle: 'Web Design Vaughan | Custom Business Websites | Zenara',
    metaDescription:
      'Modern web design in Vaughan — Woodbridge, Thornhill, Maple and the VMC. Fast, SEO-optimized websites that convert. Free consultation, transparent pricing.',
    heroIntro: 'Websites for Vaughan businesses keeping pace with one of Canada’s fastest-growing cities.',
    intro:
      'Vaughan has transformed in a single decade — the VMC and subway extension turned a suburban patchwork into a genuine urban hub, and customers now judge businesses by their online presence first.',
    economy:
      'Vaughan’s economy spans construction and development, a dense network of family-owned businesses in Woodbridge’s long-standing Italian-Canadian community, retail anchored by Vaughan Mills, and a rising tier of professional services around the VMC. With the population climbing fast, businesses that present themselves well online are pulling clear of competitors still relying on reputation alone.',
    neighborhoods: [
      'Vaughan Metropolitan Centre',
      'Woodbridge',
      'Thornhill',
      'Maple',
      'Kleinburg',
      'Concord',
      'Vellore Village',
    ],
    whyPoints: [
      {
        title: 'Keep pace with rapid growth',
        body: 'As Vaughan urbanizes around the VMC, a standout website helps established businesses hold their ground against constant new competition.',
      },
      {
        title: 'Dual-target Vaughan and Thornhill',
        body: 'Thornhill straddles the Vaughan–Markham line, so we build content that captures traffic a single-city competitor would miss.',
      },
      {
        title: 'Mobile-first for a commuter city',
        body: 'Vaughan’s subway-connected commuters search on the move — we optimize for fast mobile loading with click-to-call.',
      },
    ],
    industries: INDUSTRY_LINKS,
    faqs: [
      {
        question: 'Vaughan is growing so fast — how do I keep up online?',
        answer:
          "New competitors are arriving as fast as new residents. The businesses that stay ahead are the ones with a strong, current website already in place — we build that foundation now so you're not scrambling to catch up once the newcomers arrive.",
      },
      {
        question: 'Can you help my business rank in both Vaughan and Thornhill searches?',
        answer:
          'Yes. Thornhill straddles the Vaughan–Markham border, so residents search under both names. We build content and local signals that target both, capturing traffic a competitor optimizing for a single city name would miss.',
      },
      {
        question: 'My family\'s Woodbridge business has been around for decades — will a new site still feel authentic?',
        answer:
          "That's exactly what we design for. We modernize the presentation — speed, mobile experience, clear information — without stripping out the personality and reputation a longstanding business has actually earned.",
      },
      {
        question: 'Do you work with construction and trades companies specifically?',
        answer:
          "Regularly. Vaughan has a dense concentration of construction and development firms, and we build project-gallery-led sites with quote forms that turn browsers into booked estimates — the format that actually converts for trades.",
      },
    ],
    heroImage: '/images/vaughan-glass-development.jpg',
    heroImageAlt: 'A striking modern glass building, representing Vaughan’s rapid development around the Vaughan Metropolitan Centre',
    localSeoBody:
      'We build citations with organizations like the Vaughan Chamber of Commerce and structure your content around both "Vaughan" and "Thornhill" searches, since the two overlap at the city line — a detail a competitor targeting only one name will miss entirely.',
    geoBody:
      "As Vaughan's population grows, so does the number of people asking AI tools like ChatGPT for local recommendations instead of searching Google directly — we structure your site so it can be part of that answer.",
    smallBusinessNote:
      "Long-standing Woodbridge businesses often have real reputations but dated or missing websites. We modernize the presentation while keeping the trust that's already been earned — not replacing it with something generic.",
    focusAreas: ['Construction & Development', 'Retail', 'Professional Services', 'Trades'],
    featuredProjectSlugs: ['ashcam-cutting-solutions', 'fungen-events', 'ik-smart-solution'],
    sectionOrder: ['industries', 'advantage', 'whatYouGet', 'recentWork', 'faq'],
  },
  pickering: {
    slug: 'pickering',
    city: 'Pickering',
    region: 'the GTA',
    metaTitle: 'Web Design Pickering | Custom Business Sites | Zenara',
    metaDescription:
      'Custom web design in Pickering, the gateway to Durham Region. Fast, modern, SEO-optimized sites for local businesses. Free consultation.',
    heroIntro: 'Websites for Pickering businesses at the fast-growing gateway to Durham Region.',
    intro:
      'Pickering is entering a period of major growth, with the City Centre redevelopment set to add thousands of residents — and the businesses building a strong online presence now will be best positioned when it arrives.',
    economy:
      'Pickering’s economy combines energy and corporate employment, a growing base of retail and personal services driven by residential expansion, and trades serving new and established neighbourhoods. With the City Centre redevelopment underway, competition for local customers is intensifying, making an early, well-built website a real advantage.',
    neighborhoods: [
      'Pickering City Centre',
      'Bay Ridges',
      'Amberlea',
      'Rouge Park',
      'Liverpool',
      'Brock Ridge',
      'Dunbarton',
    ],
    whyPoints: [
      {
        title: 'Get ahead of Pickering’s growth',
        body: 'With the City Centre redevelopment bringing thousands of new residents, a strong presence now captures demand competitors will miss.',
      },
      {
        title: 'Reach the wider GTA',
        body: 'Many local customers search by region, so we target Pickering plus the GTA to also capture traffic from Ajax and Whitby.',
      },
      {
        title: 'Affordable, conversion-ready design',
        body: 'Professional, custom sites at small-business prices, built with click-to-call and quote paths that turn searches into enquiries.',
      },
    ],
    industries: INDUSTRY_LINKS,
    faqs: [
      {
        question: 'Pickering is about to grow a lot — is now the right time to build a website?',
        answer:
          "It's close to ideal. The businesses that establish a strong online presence before the City Centre redevelopment brings thousands of new residents will be the ones those residents already know when they arrive — waiting until after the growth means catching up instead of leading.",
      },
      {
        question: 'Do you build sites for businesses near the Pickering waterfront?',
        answer:
          "Yes. Whether you're along the Waterfront Trail, in Bay Ridges, or in the established commercial core, we build sites that reflect where you actually are — not a generic template that could describe any suburb.",
      },
      {
        question: 'How is working with you different from a Toronto-based agency?',
        answer:
          "We're based twenty minutes away in Markham, not downtown, and we price accordingly — without the downtown-office overhead baked into a big-city agency's rates. You still get a fully custom build, just from a team that actually knows this side of the GTA.",
      },
      {
        question: 'Can you help a new Pickering business build credibility from zero?',
        answer:
          "That's one of the most common situations we build for. A clear, professional site is often the first credibility signal a new business has — before reviews, before a track record — so we make sure it does that work from day one.",
      },
    ],
    heroImage: '/images/pickering-waterfront-trail.jpg',
    heroImageAlt: 'A wooden pier extending into calm water at sunset, representing Pickering’s waterfront trail',
    localSeoBody:
      'We build citations with organizations like the Ajax-Pickering Board of Trade and target Pickering alongside neighbouring Ajax and Whitby, since many customers here search by region rather than by a single city name.',
    geoBody:
      'As new residents arrive with the City Centre redevelopment, more of them will ask AI tools like ChatGPT for local recommendations rather than searching Google directly — we structure your site to be part of that answer early, before competitors catch on.',
    smallBusinessNote:
      "With thousands of new residents arriving as the City Centre develops, the local businesses ready to be found now are the ones who'll be established by the time that growth peaks. We build for that timing specifically.",
    focusAreas: ['Energy & Corporate', 'Retail & Personal Services', 'Trades', 'Local Services'],
    featuredProjectSlugs: ['heroes-catering', 'ashcam-cutting-solutions', 'pattys-delights'],
    sectionOrder: ['advantage', 'industries', 'recentWork', 'whatYouGet', 'faq'],
  },
};

// Ordered slugs (used for static params, the hub grid, and sitemap).
export const citySlugs = Object.keys(cityContent);
