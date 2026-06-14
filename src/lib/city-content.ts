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
}

// Industry pages exist for every slug below, so every city links to all four.
const industriesFor = (slug: string): CityIndustry[] => [
  { label: 'Law firms', href: `/lawyers/${slug}` },
  { label: 'Accounting firms', href: `/accountants/${slug}` },
  { label: 'Renovation companies', href: `/renovations/${slug}` },
  { label: 'Wellness clinics', href: `/clinics/${slug}` },
];

export const cityContent: Record<string, CityContent> = {
  toronto: {
    slug: 'toronto',
    city: 'Toronto',
    region: 'City of Toronto',
    metaTitle: 'Web Design Toronto | Custom Websites for Toronto Businesses | Zenara',
    metaDescription:
      'Custom web design in Toronto. Fast, modern, SEO-optimized websites for businesses across the downtown core, midtown, and the wider city. Free consultation.',
    heroIntro: 'Custom websites for Toronto businesses that compete in Canada’s most crowded market.',
    intro:
      'Toronto is the most competitive business market in Canada, and that competition is just as fierce online. From the Financial District towers to the independent shops of Queen West, Toronto businesses are fighting for attention against national brands with deep marketing budgets. A template website blends into the noise. We build custom, fast-loading sites that establish credibility in seconds, rank for Toronto-specific searches, and turn visitors into booked calls — whether you serve clients from a King Street office or a studio in Leslieville.',
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
        body: 'In a city this dense with competitors, design is your first differentiator. We lead with a distinct visual identity and clear messaging so you don’t look like every other Toronto site built from the same template.',
      },
      {
        title: 'Neighbourhood-level local SEO',
        body: 'Toronto customers search by area — "near Yorkville", "downtown", "King West". We structure your content and local signals to capture that hyper-local intent rather than competing only for the broad city term.',
      },
      {
        title: 'Performance that holds up on mobile',
        body: 'Most Toronto searches happen on phones, often on transit. We build for sub-2.5-second loads so you don’t lose impatient prospects before the page even renders.',
      },
    ],
    industries: industriesFor('toronto'),
    faqs: [
      {
        question: 'How much does a website cost in Toronto?',
        answer:
          'Our Toronto web design projects start at $999 for a focused starter site, $1,999 for a typical small-business site of up to six pages, and $4,999+ for advanced builds with custom functionality. Every project includes responsive design, SEO setup, and SSL security, with transparent pricing and no hidden fees.',
      },
      {
        question: 'How do I rank for "web design" or my service in Toronto?',
        answer:
          'Toronto is highly competitive, so we target specific, winnable terms — your service plus a neighbourhood or intent — alongside the broad city keyword. Combined with fast performance, clean structured data, and a properly optimized Google Business Profile, that approach earns rankings far faster than chasing the most contested term alone.',
      },
      {
        question: 'Do you work with businesses across the whole city?',
        answer:
          'Yes. We serve businesses from the downtown core to Scarborough, North York, and Etobicoke. Because we work remotely and on-site as needed, we can meet downtown or anywhere across the city for your consultation.',
      },
      {
        question: 'How long does a Toronto website take to build?',
        answer:
          'Most Toronto projects launch in two to four weeks. A starter site can be ready in about a week; larger sites with custom features take three to four. We keep you involved at every milestone so the final site reflects your business.',
      },
    ],
  },

  mississauga: {
    slug: 'mississauga',
    city: 'Mississauga',
    region: 'Peel Region',
    metaTitle: 'Web Design Mississauga | Custom Business Websites | Zenara Designs',
    metaDescription:
      'Professional web design in Mississauga — from Square One to Port Credit. Modern, fast, SEO-optimized websites that win local customers. Free consultation.',
    heroIntro: 'Websites built for Mississauga businesses, from Square One to the waterfront.',
    intro:
      'Mississauga is Canada’s sixth-largest city and home to a remarkable concentration of corporate head offices, yet most of its economy runs on the small and mid-sized businesses lining its commercial corridors. Those businesses compete for the same customers as polished national brands, so a credible, fast website is no longer optional. We design custom sites for Mississauga companies — professional services around Square One, shops and restaurants in Port Credit and Streetsville, trades across Meadowvale and Erin Mills — that look the part and rank for the searches your customers actually make.',
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
        body: 'Competing in a city full of corporate head offices means your site has to look every bit as polished. We deliver design that signals you’re established and trustworthy from the first scroll.',
      },
      {
        title: 'Targeted to Mississauga’s town centres',
        body: 'A Port Credit café and an Erin Mills clinic reach different customers. We build location-aware content so you rank where your actual customers are searching.',
      },
      {
        title: 'Conversion-focused, not just pretty',
        body: 'Click-to-call, easy booking, and clear calls to action turn Mississauga search traffic into real enquiries — the metric that actually matters.',
      },
    ],
    industries: industriesFor('mississauga'),
    faqs: [
      {
        question: 'How much does web design cost in Mississauga?',
        answer:
          'Mississauga projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds. All plans include responsive design, SEO optimization, and SSL — with clear, upfront pricing.',
      },
      {
        question: 'Can you help my Mississauga business rank locally?',
        answer:
          'Yes. We optimize your site and structured data for "Mississauga" plus your specific service and town centre, and we set up your Google Business Profile correctly — the single biggest local ranking factor for a service business.',
      },
      {
        question: 'Do you serve businesses outside the City Centre?',
        answer:
          'Absolutely — we work with businesses across Port Credit, Streetsville, Meadowvale, Erin Mills, Clarkson, and the rest of Mississauga, as well as neighbouring Brampton and Oakville.',
      },
      {
        question: 'Will my Mississauga website work on mobile?',
        answer:
          'Every site we build is mobile-first and fully responsive. Most local searches happen on phones, so we make sure your site loads fast and looks sharp on every device.',
      },
    ],
  },

  brampton: {
    slug: 'brampton',
    city: 'Brampton',
    region: 'Peel Region',
    metaTitle: 'Web Design Brampton | Affordable Custom Websites | Zenara Designs',
    metaDescription:
      'Custom web design in Brampton for small businesses and trades. Fast, modern, SEO-ready websites that bring in local leads. Transparent pricing, free consultation.',
    heroIntro: 'Websites that help Brampton’s fast-growing businesses get found and get hired.',
    intro:
      'Brampton is one of the fastest-growing and most diverse cities in Canada, and that growth has created a thriving base of small businesses, trades, and family-run companies across logistics, construction, retail, and professional services. Many compete largely on word of mouth, which leaves a wide-open opportunity online: the Brampton businesses that invest in a real website consistently pull ahead of competitors who rely on a Facebook page. We build affordable, custom sites that establish trust and capture local search demand across the city.',
    economy:
      'Brampton’s economy leans heavily on logistics and transportation, manufacturing, construction and the trades, and a fast-expanding base of independent retailers and service providers serving a young, diverse population. These are exactly the businesses customers research online before calling — making a credible, mobile-fast website one of the highest-return investments a Brampton owner can make.',
    neighborhoods: [
      'Downtown Brampton',
      'Bramalea',
      'Springdale',
      'Sandalwood',
      "Fletcher's Creek",
      'Heart Lake',
      'Mount Pleasant',
      'Castlemore',
    ],
    whyPoints: [
      {
        title: 'Beat word-of-mouth-only competitors',
        body: 'Many Brampton businesses still have no real website. A fast, professional site instantly sets you apart and captures the customers who search before they call.',
      },
      {
        title: 'Affordable without looking cheap',
        body: 'We deliver premium-looking, custom design at small-business prices — no templates that scream "budget", and no surprise fees.',
      },
      {
        title: 'Built for trades and service businesses',
        body: 'Click-to-call, quote requests, and service-area pages are built in, so contractors and service providers turn searches into booked jobs.',
      },
    ],
    industries: industriesFor('brampton'),
    faqs: [
      {
        question: 'How much does a website cost in Brampton?',
        answer:
          'Brampton projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds. Everything includes responsive design, SEO setup, and SSL, with honest, upfront pricing and flexible payment options.',
      },
      {
        question: 'I run a trades business in Brampton — can you help me get leads?',
        answer:
          'Yes. We build service-business sites with click-to-call, quote forms, and service-area pages, then optimize them for "Brampton" plus your trade so you show up when local customers search for the work you do.',
      },
      {
        question: 'Do I need a website if I already get referrals?',
        answer:
          'Referrals are great, but most people still look you up online before they call. A professional site reassures referred customers and captures the larger group searching Google for your service in Brampton.',
      },
      {
        question: 'How fast can you launch my Brampton website?',
        answer:
          'A focused starter site can launch in about a week; most small-business sites go live in two to three weeks depending on content and features.',
      },
    ],
  },

  vaughan: {
    slug: 'vaughan',
    city: 'Vaughan',
    region: 'York Region',
    metaTitle: 'Web Design Vaughan | Custom Websites for Vaughan Businesses | Zenara',
    metaDescription:
      'Modern web design in Vaughan — Woodbridge, Thornhill, Maple and the VMC. Fast, SEO-optimized websites that convert. Free consultation, transparent pricing.',
    heroIntro: 'Websites for Vaughan businesses keeping pace with one of Canada’s fastest-growing cities.',
    intro:
      'Vaughan has transformed in a single decade — the Vaughan Metropolitan Centre and the subway extension turned a suburban patchwork into a genuine urban hub with direct transit to downtown Toronto. That growth brings new competition, and customers across Woodbridge, Thornhill, Maple, and Kleinburg increasingly judge businesses by their online presence first. We build custom, conversion-focused websites that match Vaughan’s upward momentum and help established local businesses defend their turf against newcomers.',
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
        body: 'As Vaughan urbanizes around the VMC, new competitors arrive constantly. A standout website helps established businesses hold their ground and win the newcomers searching for local providers.',
      },
      {
        title: 'Dual-target Vaughan and Thornhill',
        body: 'Thornhill straddles the Vaughan–Markham line, so residents search under both names. We build content that captures traffic competitors targeting a single city name miss.',
      },
      {
        title: 'Mobile-first for a commuter city',
        body: 'Vaughan’s subway-connected commuters search on the move. We optimize for fast mobile loading with click-to-call so you catch them in the moment.',
      },
    ],
    industries: industriesFor('vaughan'),
    faqs: [
      {
        question: 'How much does web design cost in Vaughan?',
        answer:
          'Vaughan projects start at $999 for a starter site, $1,999 for a typical small-business site, and $4,999+ for advanced builds — all with responsive design, SEO, and SSL included and pricing agreed upfront.',
      },
      {
        question: 'Can you help me rank in both Vaughan and Thornhill?',
        answer:
          'Yes. Because Thornhill spans the Vaughan–Markham border, we build content and local signals that target both names so you capture searches a single-city competitor would miss.',
      },
      {
        question: 'Do you work with Woodbridge family businesses?',
        answer:
          'Often. Many Woodbridge businesses have strong reputations but dated or missing websites. We modernize their presence while preserving the trust they’ve built over decades.',
      },
      {
        question: 'How long will my Vaughan website take?',
        answer:
          'Most Vaughan sites launch in two to four weeks depending on size and features, with a focused starter site ready in roughly a week.',
      },
    ],
  },

  markham: {
    slug: 'markham',
    city: 'Markham',
    region: 'York Region',
    metaTitle: 'Web Design Markham | Websites for Markham Businesses & Tech | Zenara',
    metaDescription:
      'Custom web design in Markham — Unionville, Cornell, Downtown Markham. Modern, fast, multilingual-ready sites for a tech-savvy market. Free consultation.',
    heroIntro: 'Websites built for Markham’s tech-driven, multicultural business community.',
    intro:
      'Markham is Canada’s high-tech capital outside of downtown Toronto, with major technology employers along the Highway 7 corridor and one of the most culturally diverse populations in the country. Its customers are digitally fluent and quick to judge a business by its website — a dated or template site costs you credibility instantly here. We build modern, fast, multilingual-ready sites for Markham businesses, from Unionville’s professional services to the shops and clinics serving the city’s large Chinese-Canadian and South Asian communities.',
    economy:
      'Markham combines a globally significant technology sector along Highway 7 with a deep base of professional services, healthcare, and retail serving its diverse communities. A tech-literate population expects polished digital experiences, and businesses that offer key content in a second language often reach communities that competitors leave underserved online.',
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
        title: 'Meet a tech-savvy audience’s expectations',
        body: 'Markham customers expect fast, modern, well-designed sites. We deliver builds that feel current and credible to one of the most digitally literate markets in Canada.',
      },
      {
        title: 'Multilingual-ready design',
        body: 'With large Chinese-Canadian and South Asian communities, offering key pages in a second language expands your reach. We build sites ready for that without sacrificing performance.',
      },
      {
        title: 'Hyper-local to Markham’s districts',
        body: 'We reference Unionville, Downtown Markham, and the Highway 7 corridor in your content to capture the neighbourhood-level searches that convert.',
      },
    ],
    industries: industriesFor('markham'),
    faqs: [
      {
        question: 'How much does a website cost in Markham?',
        answer:
          'Markham projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds — each including responsive design, SEO, and SSL with transparent pricing.',
      },
      {
        question: 'Does my Markham business need a multilingual website?',
        answer:
          'Given Markham’s large Chinese-Canadian and South Asian populations, offering key pages in a second language can meaningfully widen your audience and signal that you understand the community you serve. We build sites ready for that.',
      },
      {
        question: 'Can you build a site for a Markham tech startup?',
        answer:
          'Yes. We build modern, fast, scalable sites on current frameworks — well suited to startups along the Highway 7 corridor that need a credible presence and room to grow.',
      },
      {
        question: 'How long does a Markham website take to build?',
        answer:
          'Most Markham projects launch in two to four weeks, with a focused starter site ready in about a week.',
      },
    ],
  },

  'richmond-hill': {
    slug: 'richmond-hill',
    city: 'Richmond Hill',
    region: 'York Region',
    metaTitle: 'Web Design Richmond Hill | Custom Business Websites | Zenara Designs',
    metaDescription:
      'Professional web design in Richmond Hill along the Yonge corridor. Fast, modern, SEO-optimized websites for local businesses. Free consultation, clear pricing.',
    heroIntro: 'Websites for Richmond Hill businesses along the busy Yonge Street corridor.',
    intro:
      'Richmond Hill sits at the heart of York Region with a dense, affluent, and diverse population strung along the Yonge Street corridor. Its professional services, healthcare practices, and retailers compete for discerning local customers who research thoroughly before they buy. A polished, fast website is the baseline expectation here. We build custom sites that present Richmond Hill businesses as the credible, established choice and that rank for the local searches driving real enquiries.',
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
        body: 'Richmond Hill’s affluent, research-driven customers expect a professional presence. We build sites that read as established and trustworthy at first glance.',
      },
      {
        title: 'Own the Yonge corridor searches',
        body: 'We optimize for Richmond Hill plus your service and key neighbourhoods so you appear for the local searches your best customers are running.',
      },
      {
        title: 'Designed to convert considered buyers',
        body: 'Clear information architecture, trust signals, and easy contact paths guide careful researchers from interest to enquiry.',
      },
    ],
    industries: industriesFor('richmond-hill'),
    faqs: [
      {
        question: 'How much does web design cost in Richmond Hill?',
        answer:
          'Projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, each including responsive design, SEO, and SSL with upfront pricing.',
      },
      {
        question: 'Can you help my Richmond Hill practice rank locally?',
        answer:
          'Yes. We optimize your content and structured data for Richmond Hill and your specialty, and set up your Google Business Profile correctly so you appear in local and map results.',
      },
      {
        question: 'Do you work with healthcare and professional practices?',
        answer:
          'Frequently. We build trust-focused sites with clear service information and easy booking or contact, well suited to clinics, advisors, and professional firms along the Yonge corridor.',
      },
      {
        question: 'How long does a Richmond Hill website take?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in about a week.',
      },
    ],
  },

  oakville: {
    slug: 'oakville',
    city: 'Oakville',
    region: 'Halton Region',
    metaTitle: 'Web Design Oakville | Premium Websites for Oakville Businesses | Zenara',
    metaDescription:
      'Premium web design in Oakville — downtown, Bronte, Glen Abbey. Refined, fast, SEO-optimized websites for professional and luxury brands. Free consultation.',
    heroIntro: 'Refined websites for Oakville’s professional services and premium brands.',
    intro:
      'Oakville is one of the most affluent communities in Canada, and its businesses serve customers with high expectations and discerning taste. From the boutiques of downtown Oakville and Kerr Village to the professional firms serving Glen Abbey and Bronte, presentation matters enormously here — a generic website undercuts an otherwise premium brand. We design refined, elegant, fast websites that match the standard Oakville customers expect and that rank for the local searches that bring in high-value clients.',
    economy:
      'Oakville’s economy is built on professional services, finance, healthcare, and a strong base of upscale retail and hospitality serving an affluent population. Customers here equate visual quality with credibility, so a polished, well-crafted website directly influences whether a high-value prospect chooses you or a competitor.',
    neighborhoods: [
      'Downtown Oakville',
      'Bronte',
      'Kerr Village',
      'Glen Abbey',
      'West Oak Trails',
      'Iroquois Ridge',
      'Clearview',
    ],
    whyPoints: [
      {
        title: 'Design that matches a premium market',
        body: 'Oakville customers associate polish with quality. We craft refined, elegant sites that reinforce a premium brand rather than undercut it.',
      },
      {
        title: 'Local SEO for high-value clients',
        body: 'We target Oakville plus your service and neighbourhoods so you reach the affluent local customers actively searching for what you offer.',
      },
      {
        title: 'Performance behind the polish',
        body: 'Beautiful and fast aren’t a trade-off. We deliver sub-2.5-second loads so your refined design also performs in search and on mobile.',
      },
    ],
    industries: industriesFor('oakville'),
    faqs: [
      {
        question: 'How much does web design cost in Oakville?',
        answer:
          'Oakville projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds — all including responsive design, SEO, and SSL with clear pricing.',
      },
      {
        question: 'Can you create a premium brand experience?',
        answer:
          'Yes — refined, distinctive design is our focus. We build sites that look bespoke and credible to Oakville’s discerning, affluent customers, never templated.',
      },
      {
        question: 'Do you serve professional firms in Oakville?',
        answer:
          'Often. We build trust-focused sites for advisors, clinics, and professional practices across Glen Abbey, Bronte, and downtown Oakville.',
      },
      {
        question: 'How long does an Oakville website take to build?',
        answer:
          'Most Oakville projects launch in two to four weeks, with a focused starter site ready in about a week.',
      },
    ],
  },

  burlington: {
    slug: 'burlington',
    city: 'Burlington',
    region: 'Halton Region',
    metaTitle: 'Web Design Burlington | Custom Websites for Burlington Businesses | Zenara',
    metaDescription:
      'Custom web design in Burlington — downtown waterfront to Aldershot. Fast, modern, SEO-ready websites for local businesses. Free consultation, transparent pricing.',
    heroIntro: 'Websites for Burlington businesses along the waterfront and beyond.',
    intro:
      'Burlington consistently ranks among the best places to live in Canada, with a vibrant downtown waterfront, a strong tourism and hospitality scene, and a healthy base of professional services and local trades. Its customers value quality and community, and they increasingly start with an online search. We build custom websites for Burlington businesses — restaurants and shops along the lakeshore, clinics and firms in Aldershot and Millcroft — that capture local demand and present you as a polished, established part of the community.',
    economy:
      'Burlington’s economy mixes tourism and hospitality around its downtown waterfront, advanced manufacturing, healthcare, and a steady base of professional and personal services. Locals and visitors alike research online before they visit or book, so a fast, attractive website with clear information is a direct driver of foot traffic and enquiries.',
    neighborhoods: [
      'Downtown Burlington',
      'Aldershot',
      'Appleby',
      'Millcroft',
      'Alton Village',
      'Tansley',
      'Roseland',
    ],
    whyPoints: [
      {
        title: 'Capture tourism and local search',
        body: 'Visitors and residents research Burlington businesses online first. We build sites with clear hours, location, and booking paths so you convert that search into a visit.',
      },
      {
        title: 'Community-credible design',
        body: 'Burlington values quality and local roots. We craft sites that feel established and trustworthy to a community that prizes both.',
      },
      {
        title: 'Mobile-fast for on-the-go searches',
        body: 'Waterfront and downtown searches happen on phones. We optimize for quick mobile loading with click-to-call and maps built in.',
      },
    ],
    industries: industriesFor('burlington'),
    faqs: [
      {
        question: 'How much does a website cost in Burlington?',
        answer:
          'Burlington projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds — each with responsive design, SEO, and SSL included and pricing agreed upfront.',
      },
      {
        question: 'Can you help my Burlington restaurant or shop get found?',
        answer:
          'Yes. We build sites with clear hours, menus or services, location maps, and booking or ordering paths, optimized for Burlington searches so locals and visitors find you first.',
      },
      {
        question: 'Do you work with businesses in Aldershot and Millcroft?',
        answer:
          'Absolutely — we serve businesses across all of Burlington, from the downtown waterfront to Aldershot, Appleby, and Millcroft.',
      },
      {
        question: 'How long does a Burlington website take?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in roughly a week.',
      },
    ],
  },

  hamilton: {
    slug: 'hamilton',
    city: 'Hamilton',
    region: 'City of Hamilton',
    metaTitle: 'Web Design Hamilton | Custom Websites for Hamilton Businesses | Zenara',
    metaDescription:
      'Custom web design in Hamilton — from the James Street arts scene to the suburbs. Fast, modern, SEO-optimized websites for local businesses. Free consultation.',
    heroIntro: 'Websites for Hamilton businesses powering the city’s creative and economic resurgence.',
    intro:
      'Hamilton has reinvented itself from a steel town into one of Ontario’s most dynamic small cities, powered by the arts scene on James Street North, the health and education sector around McMaster, and a wave of new independent businesses drawn by its relative affordability. That energy means real competition for local customers. We build custom websites for Hamilton businesses — from Dundas and Ancaster professional firms to downtown creative studios and Stoney Creek trades — that match the city’s momentum and rank for the searches bringing customers through the door.',
    economy:
      'Hamilton’s economy now spans healthcare and education anchored by McMaster, a thriving arts and independent-business scene downtown, advanced manufacturing, and the trades serving its growing suburbs. A new generation of professionals and entrepreneurs expects to find and vet businesses online, making a strong website essential to competing in the city’s resurgence.',
    neighborhoods: [
      'Downtown Hamilton',
      'James Street North',
      'Westdale',
      'Dundas',
      'Ancaster',
      'Stoney Creek',
      'Waterdown',
    ],
    whyPoints: [
      {
        title: 'Match Hamilton’s creative energy',
        body: 'The James North scene set a high bar for design. We build distinctive, modern sites that fit a city that takes creativity seriously.',
      },
      {
        title: 'Rank across a spread-out city',
        body: 'Hamilton stretches from the downtown core to Ancaster, Dundas, and Stoney Creek. We build area-aware content so you rank where your customers actually are.',
      },
      {
        title: 'Affordable for a growing market',
        body: 'Hamilton’s entrepreneurs are cost-conscious. We deliver premium-looking, custom design at small-business prices, with no surprise fees.',
      },
    ],
    industries: industriesFor('hamilton'),
    faqs: [
      {
        question: 'How much does web design cost in Hamilton?',
        answer:
          'Hamilton projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds — all including responsive design, SEO, and SSL with transparent pricing.',
      },
      {
        question: 'Can you help a new Hamilton business stand out?',
        answer:
          'Yes. With so many new businesses opening, distinctive design and solid local SEO are how you get noticed. We build sites that look the part and rank for Hamilton searches from day one.',
      },
      {
        question: 'Do you serve Dundas, Ancaster, and Stoney Creek?',
        answer:
          'Absolutely — we work with businesses across greater Hamilton, including Dundas, Ancaster, Westdale, Stoney Creek, and Waterdown.',
      },
      {
        question: 'How long does a Hamilton website take to build?',
        answer:
          'Most Hamilton projects launch in two to four weeks, with a focused starter site ready in about a week.',
      },
    ],
  },

  scarborough: {
    slug: 'scarborough',
    city: 'Scarborough',
    region: 'City of Toronto',
    metaTitle: 'Web Design Scarborough | Small Business Websites | Zenara Designs',
    metaDescription:
      'Custom web design in Scarborough for small and growing businesses. Fast, modern, SEO-optimized websites that win local customers. Free consultation, clear pricing.',
    heroIntro: 'Websites for the small businesses powering one of Toronto’s most diverse communities.',
    intro:
      'Scarborough is one of the most culturally diverse parts of Toronto, home to thousands of small and family-run businesses serving tight-knit local communities. Many compete on reputation and community ties, but customers — especially younger ones — increasingly check online before they visit. We build affordable, custom websites for Scarborough businesses, from Agincourt and Malvern shops to clinics and service providers near Scarborough Town Centre, that turn that online research into real foot traffic and enquiries.',
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
        body: 'Strong community reputations don’t always show up in search. We build sites that capture the customers researching online while reinforcing the trust you’ve already earned.',
      },
      {
        title: 'Affordable, professional design',
        body: 'We deliver polished, custom sites at small-business prices — ideal for Scarborough’s independent and family-run businesses.',
      },
      {
        title: 'Built for diverse, mobile-first customers',
        body: 'Most Scarborough searches happen on phones. We build fast, mobile-first sites with click-to-call so you catch customers in the moment.',
      },
    ],
    industries: industriesFor('scarborough'),
    faqs: [
      {
        question: 'How much does web design cost in Scarborough?',
        answer:
          'Scarborough projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, each including responsive design, SEO, and SSL with upfront, honest pricing.',
      },
      {
        question: 'Do I need a website if my Scarborough business runs on word of mouth?',
        answer:
          'Word of mouth is valuable, but most people still look you up online first. A professional site reassures referred customers and captures the larger group searching for your service in Scarborough.',
      },
      {
        question: 'Can you build an affordable site for a small Scarborough business?',
        answer:
          'Yes — our starter sites begin at $999, and we offer flexible payment options so a professional presence is within reach for independent and family-run businesses.',
      },
      {
        question: 'How long does a Scarborough website take?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in roughly a week.',
      },
    ],
  },

  'north-york': {
    slug: 'north-york',
    city: 'North York',
    region: 'City of Toronto',
    metaTitle: 'Web Design North York | Custom Business Websites | Zenara Designs',
    metaDescription:
      'Professional web design in North York along the Yonge corridor. Fast, modern, SEO-optimized websites for local businesses. Free consultation, transparent pricing.',
    heroIntro: 'Websites for North York businesses along the Yonge and Sheppard corridors.',
    intro:
      'North York is a dense, business-rich part of Toronto, with commercial towers and professional offices clustered around North York Centre and the Yonge–Sheppard corridor, plus established retail and service districts through Willowdale and Don Mills. Competition for local customers is intense, and a polished, fast website is the price of entry. We build custom sites for North York businesses that establish credibility quickly and rank for the corridor-specific searches that drive enquiries.',
    economy:
      'North York combines a significant corporate and professional-services presence around North York Centre with a deep base of healthcare practices, retailers, and personal-service businesses along Yonge Street and through Don Mills and Willowdale. Customers here research and compare online, rewarding businesses with clear, credible, well-built websites.',
    neighborhoods: [
      'North York Centre',
      'Willowdale',
      'Don Mills',
      'Bayview Village',
      'York Mills',
      'Lansing',
      'Newtonbrook',
    ],
    whyPoints: [
      {
        title: 'Compete in a dense business district',
        body: 'Around North York Centre you’re surrounded by competitors. We build standout, credible sites that earn attention in a crowded corridor.',
      },
      {
        title: 'Corridor-level local SEO',
        body: 'We target North York plus your service and key areas like Willowdale and Don Mills so you appear for the local searches that matter.',
      },
      {
        title: 'Conversion-focused builds',
        body: 'Clear calls to action, easy contact, and fast performance turn corridor search traffic into real enquiries.',
      },
    ],
    industries: industriesFor('north-york'),
    faqs: [
      {
        question: 'How much does web design cost in North York?',
        answer:
          'North York projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, all including responsive design, SEO, and SSL with clear pricing.',
      },
      {
        question: 'Can you help my North York office rank locally?',
        answer:
          'Yes. We optimize your site and structured data for North York and your service area along the Yonge–Sheppard corridor, and set up your Google Business Profile to appear in local results.',
      },
      {
        question: 'Do you work with professional and healthcare practices?',
        answer:
          'Frequently — we build trust-focused sites with clear service information and easy booking for the many practices around North York Centre and Don Mills.',
      },
      {
        question: 'How long does a North York website take to build?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in about a week.',
      },
    ],
  },

  etobicoke: {
    slug: 'etobicoke',
    city: 'Etobicoke',
    region: 'City of Toronto',
    metaTitle: 'Web Design Etobicoke | Custom Websites for Etobicoke Businesses | Zenara',
    metaDescription:
      'Custom web design in Etobicoke — from the lakeshore to the Kingsway. Fast, modern, SEO-ready websites for local businesses. Free consultation, transparent pricing.',
    heroIntro: 'Websites for Etobicoke businesses, from the lakeshore communities to the Kingsway.',
    intro:
      'Etobicoke spans Toronto’s western edge, from the lakeshore communities of Mimico and New Toronto to the established retail of the Kingsway and the commercial districts around Islington and Rexdale. Its mix of long-standing local businesses and newer arrivals competes for customers who increasingly search before they shop. We build custom websites for Etobicoke businesses that present them as credible and current, and that rank for the neighbourhood-level searches their customers actually use.',
    economy:
      'Etobicoke’s economy blends established retail and professional services along the Kingsway and Bloor West, a base of trades and personal-service businesses through the lakeshore communities, and commercial and light-industrial activity near Rexdale and the airport. Customers across these distinct pockets research locally online, rewarding businesses with clear, well-built websites.',
    neighborhoods: [
      'The Kingsway',
      'Mimico',
      'New Toronto',
      'Long Branch',
      'Islington',
      'Humber Bay',
      'Rexdale',
    ],
    whyPoints: [
      {
        title: 'Modern presence for established businesses',
        body: 'Many Etobicoke businesses have loyal customers but dated sites. We modernize your presence while keeping the trust you’ve built.',
      },
      {
        title: 'Neighbourhood-aware local SEO',
        body: 'From the Kingsway to Mimico, we build area-specific content so you rank for the local searches happening in your part of Etobicoke.',
      },
      {
        title: 'Fast, mobile-first design',
        body: 'We build for quick mobile loading with click-to-call and maps so on-the-go customers reach you easily.',
      },
    ],
    industries: industriesFor('etobicoke'),
    faqs: [
      {
        question: 'How much does web design cost in Etobicoke?',
        answer:
          'Etobicoke projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, each including responsive design, SEO, and SSL with upfront pricing.',
      },
      {
        question: 'Can you refresh my outdated Etobicoke website?',
        answer:
          'Yes — modernizing dated sites is common work for us. We rebuild on fast, current frameworks while preserving your brand and the trust your customers already have.',
      },
      {
        question: 'Do you serve the lakeshore communities and the Kingsway?',
        answer:
          'Absolutely — we work with businesses across Etobicoke, from Mimico and New Toronto to the Kingsway, Islington, and Humber Bay.',
      },
      {
        question: 'How long does an Etobicoke website take?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in roughly a week.',
      },
    ],
  },

  pickering: {
    slug: 'pickering',
    city: 'Pickering',
    region: 'Durham Region',
    metaTitle: 'Web Design Pickering | Custom Websites for Pickering Businesses | Zenara',
    metaDescription:
      'Custom web design in Pickering, the gateway to Durham Region. Fast, modern, SEO-optimized websites for local businesses. Free consultation, transparent pricing.',
    heroIntro: 'Websites for Pickering businesses at the fast-growing gateway to Durham Region.',
    intro:
      'Pickering sits at the western edge of Durham Region and is entering a period of major growth, with the Pickering City Centre redevelopment set to add thousands of residents and a wave of new commercial activity. Local businesses that establish a strong online presence now will be best positioned as that growth arrives. We build custom websites for Pickering businesses — from the established commercial areas to the growing residential neighbourhoods — that capture local demand and present you as a credible choice for new and existing customers alike.',
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
        body: 'With the City Centre redevelopment bringing thousands of new residents, businesses that build a strong online presence now will capture demand competitors miss.',
      },
      {
        title: 'Reach the wider Durham Region',
        body: 'Many local customers search by region. We target Pickering plus Durham Region terms so you capture traffic from neighbouring Ajax and Whitby too.',
      },
      {
        title: 'Affordable, conversion-ready design',
        body: 'We deliver professional, custom sites at small-business prices, built with click-to-call and quote paths that turn searches into enquiries.',
      },
    ],
    industries: industriesFor('pickering'),
    faqs: [
      {
        question: 'How much does web design cost in Pickering?',
        answer:
          'Pickering projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, all including responsive design, SEO, and SSL with transparent pricing.',
      },
      {
        question: 'Can you help me reach customers across Durham Region?',
        answer:
          'Yes. Because many customers search by region, we target Pickering plus Durham Region terms so you also capture searches from Ajax, Whitby, and beyond.',
      },
      {
        question: 'Is now a good time to invest in a Pickering website?',
        answer:
          'It’s an ideal time. With the City Centre redevelopment driving growth, building a strong presence now positions you ahead of competitors as new residents and businesses arrive.',
      },
      {
        question: 'How long does a Pickering website take to build?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in about a week.',
      },
    ],
  },

  ajax: {
    slug: 'ajax',
    city: 'Ajax',
    region: 'Durham Region',
    metaTitle: 'Web Design Ajax | Custom Websites for Ajax Businesses | Zenara Designs',
    metaDescription:
      'Custom web design in Ajax for a young, diverse, fast-growing community. Fast, modern, SEO-ready websites that win local customers. Free consultation, clear pricing.',
    heroIntro: 'Websites for Ajax businesses serving a young, digitally-native community.',
    intro:
      'Ajax is one of the most diverse and fastest-growing communities in Durham Region, with a young population that researches almost everything online before making contact. For local businesses, that makes a professional website non-negotiable — if you don’t appear in local search, you’re effectively invisible to most prospective customers here. We build custom, mobile-first websites for Ajax businesses that capture that search demand and turn digitally-native browsers into booked customers.',
    economy:
      'Ajax’s economy is driven by retail and personal services, trades supporting rapid residential growth, and small businesses serving a young, diverse, commuter-heavy population near the 401 corridor. These customers start with a Google search and compare options online, so a fast, credible website strongly influences who they choose.',
    neighborhoods: [
      'Downtown Ajax',
      'Pickering Beach',
      'South Ajax',
      'Salem',
      'Audley',
      'Carruthers Creek',
      'Nottingham',
    ],
    whyPoints: [
      {
        title: 'Be found by digitally-native customers',
        body: 'Ajax’s younger population searches online first. We build sites optimized for local search so you appear exactly when prospective customers are looking.',
      },
      {
        title: 'Mobile-first, review-ready',
        body: 'Most Ajax searches happen on phones, and reviews carry weight. We build fast mobile sites that showcase social proof and make contact effortless.',
      },
      {
        title: 'Affordable for a growing market',
        body: 'We deliver polished, custom design at small-business prices, with flexible payment options for growing Ajax businesses.',
      },
    ],
    industries: industriesFor('ajax'),
    faqs: [
      {
        question: 'How much does web design cost in Ajax?',
        answer:
          'Ajax projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, each including responsive design, SEO, and SSL with upfront pricing.',
      },
      {
        question: 'How do Ajax customers find local businesses?',
        answer:
          'Ajax’s young, diverse population overwhelmingly starts with a Google search, compares websites and reviews, then makes contact. A professional, fast, review-friendly site is how you win that comparison.',
      },
      {
        question: 'Can you help me get more local leads in Ajax?',
        answer:
          'Yes. We build sites with click-to-call and quote forms, optimized for "Ajax" plus your service and supported by a properly set-up Google Business Profile to drive local enquiries.',
      },
      {
        question: 'How long does an Ajax website take to build?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in roughly a week.',
      },
    ],
  },

  whitby: {
    slug: 'whitby',
    city: 'Whitby',
    region: 'Durham Region',
    metaTitle: 'Web Design Whitby | Custom Websites for Whitby Businesses | Zenara Designs',
    metaDescription:
      'Custom web design in Whitby — from the historic downtown to Port Whitby. Fast, modern, SEO-optimized websites for local businesses. Free consultation, clear pricing.',
    heroIntro: 'Websites for Whitby businesses, from the historic downtown to Port Whitby.',
    intro:
      'Whitby pairs a charming, historic downtown with steady residential growth across north Whitby and Brooklin, giving local businesses a healthy and expanding customer base. Families and professionals here value local, trustworthy providers and increasingly find them through online search. We build custom websites for Whitby businesses — downtown shops and restaurants, clinics and firms, trades serving the growing northern neighbourhoods — that capture that demand and present you as an established part of the community.',
    economy:
      'Whitby’s economy spans a historic downtown retail and dining district, professional and healthcare services, and trades supporting residential growth in Brooklin and north Whitby. Its family-oriented, community-minded customers research locally online, rewarding businesses with clear, credible, well-built websites.',
    neighborhoods: [
      'Downtown Whitby',
      'Brooklin',
      'Port Whitby',
      'Williamsburg',
      'Pringle Creek',
      'Rolling Acres',
      'Taunton North',
    ],
    whyPoints: [
      {
        title: 'Credible presence for a community market',
        body: 'Whitby customers favour local, trustworthy businesses. We build sites that read as established and community-rooted at first glance.',
      },
      {
        title: 'Capture growth in Brooklin and the north',
        body: 'As north Whitby and Brooklin expand, new customers are searching for local providers. We build area-aware content so you reach them.',
      },
      {
        title: 'Conversion-focused and fast',
        body: 'Clear contact paths, click-to-call, and quick mobile loading turn local searches into real enquiries.',
      },
    ],
    industries: industriesFor('whitby'),
    faqs: [
      {
        question: 'How much does web design cost in Whitby?',
        answer:
          'Whitby projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, all including responsive design, SEO, and SSL with transparent pricing.',
      },
      {
        question: 'Can you help my downtown Whitby business get found?',
        answer:
          'Yes. We build sites with clear hours, services, and location, optimized for Whitby searches so locals find you whether they’re downtown or in the growing northern neighbourhoods.',
      },
      {
        question: 'Do you serve Brooklin and north Whitby?',
        answer:
          'Absolutely — we work with businesses across all of Whitby, including the historic downtown, Port Whitby, and the fast-growing Brooklin area.',
      },
      {
        question: 'How long does a Whitby website take to build?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in about a week.',
      },
    ],
  },

  oshawa: {
    slug: 'oshawa',
    city: 'Oshawa',
    region: 'Durham Region',
    metaTitle: 'Web Design Oshawa | Custom Websites for Oshawa Businesses | Zenara Designs',
    metaDescription:
      'Custom web design in Oshawa for a city moving from manufacturing to a knowledge economy. Fast, modern, SEO-ready websites. Free consultation, transparent pricing.',
    heroIntro: 'Websites for Oshawa businesses powering the city’s shift to a knowledge economy.',
    intro:
      'Oshawa is undergoing a real transformation, evolving from its manufacturing heritage into a knowledge-based economy anchored by Ontario Tech University and Durham College, with a revitalized downtown attracting a new generation of professionals and entrepreneurs. That shift is creating fresh demand and fresh competition. We build custom websites for Oshawa businesses — downtown startups and professional firms, established trades, and service providers across the city — that match its new energy and rank for the local searches driving growth.',
    economy:
      'Oshawa’s economy is rebalancing from automotive manufacturing toward education, healthcare, technology, and a growing entrepreneurial scene downtown, alongside enduring trades and retail. A younger, education-driven population expects to research and choose businesses online, making a strong website central to competing in the city’s next chapter.',
    neighborhoods: [
      'Downtown Oshawa',
      'McLaughlin',
      'Northglen',
      'Windfields',
      'Samac',
      'Donevan',
      'Lakeview',
    ],
    whyPoints: [
      {
        title: 'Match Oshawa’s new momentum',
        body: 'As downtown revitalizes and the university scene grows, expectations are rising. We build modern, credible sites that fit a city on the way up.',
      },
      {
        title: 'Reach a younger, online-first audience',
        body: 'Students, graduates, and young professionals research online before they buy. We optimize for Oshawa searches so you reach them.',
      },
      {
        title: 'Affordable, growth-ready builds',
        body: 'We deliver professional, custom design at small-business prices, on frameworks that scale as your business grows.',
      },
    ],
    industries: industriesFor('oshawa'),
    faqs: [
      {
        question: 'How much does web design cost in Oshawa?',
        answer:
          'Oshawa projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, each including responsive design, SEO, and SSL with upfront pricing.',
      },
      {
        question: 'Can you help a new Oshawa business or startup?',
        answer:
          'Yes. We build modern, scalable sites well suited to the downtown startups and professionals driving Oshawa’s shift to a knowledge economy, with room to grow as you do.',
      },
      {
        question: 'How long does it take to rank for searches in Oshawa?',
        answer:
          'Oshawa has moderate online competition, so a well-built, optimized site can gain local visibility within a few months — faster for specific service-plus-Oshawa terms. We set the foundation for steady, lasting gains.',
      },
      {
        question: 'How long does an Oshawa website take to build?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in roughly a week.',
      },
    ],
  },

  newmarket: {
    slug: 'newmarket',
    city: 'Newmarket',
    region: 'York Region',
    metaTitle: 'Web Design Newmarket | Custom Business Websites | Zenara Designs',
    metaDescription:
      'Custom web design in Newmarket — from historic Main Street to Upper Canada Mall. Fast, modern, SEO-optimized websites for local businesses. Free consultation.',
    heroIntro: 'Websites for Newmarket businesses, from historic Main Street to the modern commercial core.',
    intro:
      'Newmarket blends a beloved historic Main Street with a busy modern commercial core around Upper Canada Mall and Davis Drive, serving as a regional hub for northern York Region. Its businesses range from long-standing independent shops to professional firms and growing service providers, all competing for customers who research locally online. We build custom websites for Newmarket businesses that honour the town’s character while delivering the speed, polish, and local SEO needed to win modern customers.',
    economy:
      'Newmarket’s economy combines a historic Main Street retail and dining district, major regional retail along Yonge and Davis Drive, healthcare around Southlake, and a strong base of professional and personal services. Its customers research locally before they buy, rewarding businesses with clear, credible, well-built websites.',
    neighborhoods: [
      'Historic Main Street',
      'Glenway',
      'Stonehaven',
      'Summerhill',
      'Bristol-London',
      'Huron Heights',
      'Armitage',
    ],
    whyPoints: [
      {
        title: 'Honour the brand, modernize the tech',
        body: 'Newmarket businesses often have real character and history. We preserve that identity while rebuilding on fast, modern technology.',
      },
      {
        title: 'Hub-level local SEO',
        body: 'As a regional hub, Newmarket draws customers from across northern York Region. We target Newmarket plus your service to capture that wider demand.',
      },
      {
        title: 'Conversion-focused design',
        body: 'Clear calls to action, easy contact, and fast mobile performance turn local search into real enquiries.',
      },
    ],
    industries: industriesFor('newmarket'),
    faqs: [
      {
        question: 'How much does web design cost in Newmarket?',
        answer:
          'Newmarket projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, all including responsive design, SEO, and SSL with transparent pricing.',
      },
      {
        question: 'Can you build a site for a historic Main Street business?',
        answer:
          'Yes — we specialize in preserving a business’s established character and brand while rebuilding on fast, modern technology that performs in search and on mobile.',
      },
      {
        question: 'Can you help me reach customers across York Region?',
        answer:
          'Yes. As a regional hub, Newmarket draws shoppers from surrounding towns, so we target Newmarket plus broader York Region terms to widen your reach.',
      },
      {
        question: 'How long does a Newmarket website take to build?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in about a week.',
      },
    ],
  },

  aurora: {
    slug: 'aurora',
    city: 'Aurora',
    region: 'York Region',
    metaTitle: 'Web Design Aurora | Custom Websites for Aurora Businesses | Zenara Designs',
    metaDescription:
      'Custom web design in Aurora for professional and local businesses. Refined, fast, SEO-optimized websites that build trust and win clients. Free consultation.',
    heroIntro: 'Refined websites for Aurora’s professional services and established local businesses.',
    intro:
      'Aurora is an affluent, historic town in central York Region, known for its well-preserved heritage core and a prosperous, community-minded population. Its professional firms, clinics, and independent businesses serve customers who value quality and reputation and who research carefully before choosing a provider. We build refined, custom websites for Aurora businesses that reflect that standard and rank for the local searches bringing in high-value clients.',
    economy:
      'Aurora’s economy is anchored by professional and financial services, healthcare, and upscale retail and personal services serving an affluent, established community. Customers here weigh credibility heavily, so a polished, well-structured website directly shapes who they trust and choose.',
    neighborhoods: [
      'Aurora Village',
      'Aurora Heights',
      'Bayview Northeast',
      'Hills of St. Andrew',
      'Aurora Grove',
      'Stone Ridge',
      'Regency Acres',
    ],
    whyPoints: [
      {
        title: 'Polish for a discerning town',
        body: 'Aurora customers expect quality. We craft refined, credible sites that reinforce an established professional reputation.',
      },
      {
        title: 'Local SEO for high-value clients',
        body: 'We target Aurora plus your service so you reach the affluent local customers actively searching for what you offer.',
      },
      {
        title: 'Trust-building structure',
        body: 'Clear information, social proof, and easy contact paths guide careful researchers from interest to enquiry.',
      },
    ],
    industries: industriesFor('aurora'),
    faqs: [
      {
        question: 'How much does web design cost in Aurora?',
        answer:
          'Aurora projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, each including responsive design, SEO, and SSL with upfront pricing.',
      },
      {
        question: 'Can you create a refined, professional site for my Aurora firm?',
        answer:
          'Yes — distinctive, polished design is our focus. We build credible, elegant sites suited to Aurora’s professional firms and discerning clientele.',
      },
      {
        question: 'Can you help my Aurora practice rank locally?',
        answer:
          'Yes. We optimize your content and structured data for Aurora and your specialty, and set up your Google Business Profile so you appear in local and map results.',
      },
      {
        question: 'How long does an Aurora website take to build?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in roughly a week.',
      },
    ],
  },

  stouffville: {
    slug: 'stouffville',
    city: 'Stouffville',
    region: 'York Region',
    metaTitle: 'Web Design Stouffville | Custom Business Websites | Zenara Designs',
    metaDescription:
      'Custom web design in Stouffville for local and commuter-community businesses. Fast, modern, SEO-optimized websites. Free consultation, transparent pricing.',
    heroIntro: 'Websites for Stouffville businesses serving a fast-growing commuter community.',
    intro:
      'Whitchurch-Stouffville has grown rapidly from a small town into a thriving commuter community, with a historic Main Street core and expanding residential neighbourhoods drawing families who work across the GTA. That growth has built a steady base of local customers who research businesses online before visiting. We build custom websites for Stouffville businesses — Main Street shops and restaurants, clinics, trades, and professional services — that capture local demand and present you as an established part of a growing community.',
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
        body: 'As Stouffville’s population climbs, new customers are searching for local providers. A strong website helps you capture that demand early.',
      },
      {
        title: 'Reach commuters on mobile',
        body: 'Stouffville’s commuter families search on the move. We build fast mobile sites with click-to-call so you catch them whenever they look.',
      },
      {
        title: 'Community-credible, affordable design',
        body: 'We deliver polished, custom sites at small-business prices that read as established and local.',
      },
    ],
    industries: industriesFor('stouffville'),
    faqs: [
      {
        question: 'How much does web design cost in Stouffville?',
        answer:
          'Stouffville projects start at $999 for a starter site, $1,999 for a standard small-business site, and $4,999+ for advanced builds, all including responsive design, SEO, and SSL with transparent pricing.',
      },
      {
        question: 'Can you help my Stouffville business reach new residents?',
        answer:
          'Yes. With the town growing quickly, we build and optimize your site for Stouffville searches so the steady flow of new residents finds you first.',
      },
      {
        question: 'Do you work with Main Street and small local businesses?',
        answer:
          'Absolutely — we build affordable, professional sites for Main Street shops, clinics, trades, and service businesses across Whitchurch-Stouffville.',
      },
      {
        question: 'How long does a Stouffville website take to build?',
        answer:
          'Most projects launch in two to four weeks, with a focused starter site ready in about a week.',
      },
    ],
  },
};

// Ordered slugs (used for static params, the hub grid, and sitemap).
export const citySlugs = Object.keys(cityContent);
