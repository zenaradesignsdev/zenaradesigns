import {
  Calculator,
  CalendarCheck,
  LayoutGrid,
  MapPin,
  MessageSquareQuote,
  Phone,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import type { CaseStudyFont } from '@/lib/case-study-fonts';

interface Img {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface Swatch {
  name: string;
  hex: string;
  note: string;
  /** Text colour for the hex label on top of the swatch */
  ink: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  /** Two-line page heading; the second line gets the gradient */
  titleLines: [string, string];
  eyebrow: string;
  intro: string;
  liveUrl: string;
  liveLabel: string;
  metaTitle: string;
  metaDescription: string;
  deliverables: string[];
  facts: { label: string; value: string }[];
  /** Tint mixed into the glow behind the devices */
  accent: string;
  screens: {
    /** Full-page desktop capture, scrolled inside a 16:10 laptop screen */
    desktop: Img;
    /** Full-page mobile capture, scrolled inside a 390:844 phone screen */
    mobile: Img;
    /** Static above-the-fold desktop capture */
    hero: Img;
  };
  brief: { heading: [string, string]; paragraphs: string[] };
  website: {
    heading: [string, string];
    highlights: { icon: LucideIcon; title: string; body: string }[];
  };
  /** Website-only projects have no branding or card sections. */
  branding?: {
    heading: [string, string];
    body: string;
    logo: Img & { maxWidth: number };
    /** Background of the logo panel; should match the logo artwork's own background */
    panelBg: string;
    /** Soft glow behind the logo */
    panelGlow: string;
    /**
     * soft: fade the edges into the panel, for artwork cropped from a textured photo.
     * circle: clip to a circle, for a round badge logo.
     */
    logoMask?: 'soft' | 'circle';
    mark?: Img & { title: string; body: string };
    typography?: { role: string; family: string; font: CaseStudyFont; weight?: number }[];
    palette: Swatch[];
  };
  card?: {
    heading: [string, string];
    body: string;
    bullets: string[];
    /** width / height of the card artwork */
    aspect: number;
    front: Img;
    back: Img;
    /** Bullet dot colour */
    accent: string;
  };
  /**
   * A text section for work that isn't branding: a fast turnaround, a tool we
   * built, or a Google Business Profile we set up alongside the site.
   */
  highlight?: {
    eyebrow: string;
    heading: [string, string];
    body: string;
    bullets: string[];
  };
  /** Closing call to action. Defaults to the brand-and-site pitch. */
  cta?: {
    lines: [string, string];
    body: string;
  };
  flyer?: {
    heading: [string, string];
    body: string;
    /** Print versions, shown side by side. width / height of the artwork */
    aspect: number;
    variants: (Img & { label: string })[];
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'fungen-events',
    name: 'FunGen Events',
    titleLines: ['FunGen', 'Events'],
    eyebrow: 'Case Study · Events & Experiences',
    intro:
      'A new website, logo and business cards for a Scarborough event planning studio. One identity, from the card handed over at a venue walkthrough to the page where the booking happens.',
    liveUrl: 'https://fungenevents.ca/',
    liveLabel: 'fungenevents.ca',
    metaTitle: 'FunGen Events Case Study: Website & Branding | Zenara Designs',
    metaDescription:
      'How we built a new website, logo and business cards for FunGen Events, a Scarborough event planning studio serving the GTA.',
    deliverables: ['Custom website', 'Logo & brand identity', 'Business card design'],
    facts: [
      { label: 'Client', value: 'FunGen Events & Experiences' },
      { label: 'Industry', value: 'Event planning' },
      { label: 'Location', value: 'Scarborough, serving the GTA' },
      { label: 'Year', value: '2026' },
    ],
    accent: 'rgba(230,186,98,0.15)',
    screens: {
      desktop: {
        src: '/images/case-studies/fungen/site-desktop-full.jpg',
        width: 1440,
        height: 8025,
        alt: 'The FunGen Events homepage on a laptop, from the hero down to the footer',
      },
      mobile: {
        src: '/images/case-studies/fungen/site-mobile-full.jpg',
        width: 780,
        height: 8400,
        alt: 'The FunGen Events homepage on a phone',
      },
      hero: {
        src: '/images/case-studies/fungen/site-desktop-hero.jpg',
        width: 1600,
        height: 1000,
        alt: 'FunGen Events homepage hero: “Every detail, so you can just arrive.” beside event photography',
      },
    },
    brief: {
      heading: ['Events that feel', 'personal.'],
      paragraphs: [
        "FunGen plans birthdays, weddings, anniversaries, corporate lunches and community fundraisers across Scarborough, Markham and the rest of the GTA. The events were polished. The brand behind them wasn't yet.",
        'We started with the identity: a gold mark, a navy and gold palette, and business cards to hand over at venue walkthroughs. Then we built a website that carries the same feeling online and turns a browsing family or office manager into a booked consultation.',
      ],
    },
    website: {
      heading: ['Every detail,', 'so they can book.'],
      highlights: [
        { icon: LayoutGrid, title: 'Six services', body: 'Every occasion gets its own page.' },
        { icon: CalendarCheck, title: 'Built to book', body: '“Check your date” on every screen.' },
        { icon: MapPin, title: 'Local first', body: 'Scarborough, Markham and the GTA.' },
        { icon: Smartphone, title: 'Phone first', body: 'Tuned for thumbs, then desktop.' },
      ],
    },
    branding: {
      heading: ['A mark that', 'catches the light.'],
      body: 'The mark is a single gold ribbon that rises like a flame and curls into a G. It reads as celebration without leaning on balloons or confetti, and it holds up in foil on a card or as a small icon in the site header.',
      logo: {
        src: '/images/case-studies/fungen/logo-lockup.png',
        width: 470,
        height: 370,
        maxWidth: 420,
        alt: 'FunGen Events & Experiences logo: gold ribbon mark above the FunGen wordmark',
      },
      panelBg: '#184467',
      panelGlow: 'rgba(230,186,98,0.18)',
      logoMask: 'soft',
      mark: {
        src: '/images/case-studies/fungen/logo-mark.png',
        width: 150,
        height: 188,
        alt: 'The FunGen mark on its own',
        title: 'The mark',
        body: 'Works alone as a favicon, social avatar or embossed stamp.',
      },
      palette: [
        { name: 'Royal Navy', hex: '#184467', note: 'Business card stock', ink: '#FFFFFF' },
        { name: 'Midnight', hex: '#0D151F', note: 'Website background', ink: '#FFFFFF' },
        { name: 'Foil Gold', hex: '#E6BA62', note: 'Mark, accents & calls to action', ink: '#0D151F' },
        { name: 'Ivory', hex: '#F9F7F4', note: 'Type & primary buttons', ink: '#0D151F' },
      ],
    },
    card: {
      heading: ['Made to be', 'handed over.'],
      body: "The front keeps it simple: the gold mark, centred on navy. The back does the work. It lists every kind of event FunGen plans, the tagline “Turning your imagination into memorable experiences”, and every way to get in touch, with the web address set in a gold bar so it's the first thing people type.",
      bullets: [
        'Gold ribbon carries across from the logo to tie both sides together',
        'Event types listed so the card sells, not just introduces',
        'Address, two phone lines and email grouped with clear icons',
      ],
      aspect: 2,
      front: {
        src: '/images/case-studies/fungen/card-logo-side.jpg',
        width: 782,
        height: 391,
        alt: 'Front of the FunGen business card: the gold FunGen mark and wordmark on navy',
      },
      back: {
        src: '/images/case-studies/fungen/card-info-side.jpg',
        width: 1023,
        height: 511,
        alt: 'Back of the FunGen business card: event types, tagline, website, address, phone numbers and email beside a gold ribbon',
      },
      accent: '#E6BA62',
    },
  },
  {
    slug: 'pattys-delights',
    name: "Patty's Delights",
    titleLines: ["Patty's", 'Delights'],
    eyebrow: 'Case Study · Party Food & Desserts',
    intro:
      'A new website, logo and business cards for a home-grown party food business. Fruit art, dessert tables and beverage stations, presented as warmly as they are served.',
    liveUrl: 'https://pattysdelights.com/',
    liveLabel: 'pattysdelights.com',
    metaTitle: "Patty's Delights Case Study: Website & Brand | Zenara Designs",
    metaDescription:
      "How we built a new website, logo and business cards for Patty's Delights, a GTA party food business known for fruit carving and dessert tables.",
    deliverables: ['Custom website', 'Logo design', 'Business card design', 'Brand palette'],
    facts: [
      { label: 'Client', value: "Patty's Delights Party Services" },
      { label: 'Industry', value: 'Party food & desserts' },
      { label: 'Location', value: 'Serving the GTA' },
      { label: 'Year', value: '2026' },
    ],
    accent: 'rgba(229,113,97,0.18)',
    screens: {
      desktop: {
        src: '/images/case-studies/pattys/site-desktop-full.jpg',
        width: 1440,
        height: 6159,
        alt: "The Patty's Delights homepage on a laptop, from the hero down to the footer",
      },
      mobile: {
        src: '/images/case-studies/pattys/site-mobile-full.jpg',
        width: 780,
        height: 8400,
        alt: "The Patty's Delights homepage on a phone",
      },
      hero: {
        src: '/images/case-studies/pattys/site-desktop-hero.jpg',
        width: 1600,
        height: 1000,
        alt: "Patty's Delights homepage hero: “Your party, our passion” above arched photos of fruit carving, dessert tables and bubble tea",
      },
    },
    brief: {
      heading: ["Mom's cooking,", 'made to share.'],
      paragraphs: [
        "Patty's Delights brings handmade fruit carving, dessert tables and beverage stations to celebrations across the GTA, from house parties to banquet halls. The food already had fans. It needed a brand and a website that looked as good as the spreads.",
        'We drew a playful logo, set a warm peach, coral and green palette, designed business cards to hand out at events, and built a site that makes it easy to ask for a quote.',
      ],
    },
    website: {
      heading: ['Warm, bright,', 'easy to book.'],
      highlights: [
        { icon: LayoutGrid, title: 'Signature services', body: 'Fruit art, desserts and drinks up front.' },
        { icon: MessageSquareQuote, title: 'Quote first', body: '“Request a Quote” on every screen.' },
        { icon: Star, title: 'Real reviews', body: 'Words from planners and families.' },
        { icon: Smartphone, title: 'Phone first', body: 'Tuned for thumbs, then desktop.' },
      ],
    },
    branding: {
      heading: ['A logo with', 'a little dance.'],
      body: 'A chef mid-step, with a fruit basket in one hand and a steaming cup in the other, framed by a coral ring and script lettering. It is friendly and handmade, like the food, and reads clearly at the size of a website header.',
      logo: {
        src: '/images/case-studies/pattys/logo.png',
        width: 222,
        height: 222,
        maxWidth: 280,
        alt: "Patty's Delights Party Services logo: a chef carrying a fruit basket and a cup inside a coral ring",
      },
      panelBg: '#FAEFDA',
      panelGlow: 'transparent',
      logoMask: 'circle',
      typography: [
        { role: 'Headlines', family: 'Playfair Display', font: 'playfair' },
        { role: 'Body', family: 'DM Sans', font: 'dmSans' },
      ],
      palette: [
        { name: 'Garden Green', hex: '#39604E', note: 'Headlines & logo', ink: '#FFFFFF' },
        { name: 'Terracotta', hex: '#C94736', note: 'Calls to action', ink: '#FFFFFF' },
        { name: 'Blush', hex: '#F7D6C9', note: 'Website hero', ink: '#39604E' },
        { name: 'Cream', hex: '#FAEFDA', note: 'Business card stock', ink: '#39604E' },
      ],
    },
    card: {
      heading: ['A card worth', 'keeping.'],
      body: "The front leads with the logo and the three things Patty's is known for: fruit platters and carving, dessert tables and beverage stations, with the web address in a coral band. The back carries the tagline “Your party, our passion”, an Instagram QR code, and every way to get in touch.",
      bullets: [
        'Services on the front, so the card sells at a glance',
        'Instagram QR code for guests who want to see more',
        'Cream and coral carried straight over from the website',
      ],
      aspect: 1030 / 584,
      front: {
        src: '/images/case-studies/pattys/card-front.jpg',
        width: 1027,
        height: 581,
        alt: "Front of the Patty's Delights business card: logo, name, services and web address on cream with a coral band",
      },
      back: {
        src: '/images/case-studies/pattys/card-back.jpg',
        width: 1030,
        height: 584,
        alt: "Back of the Patty's Delights business card: logo and tagline beside the owner's title, an Instagram QR code, Instagram handle, email and phone",
      },
      accent: '#E57161',
    },
  },
  {
    slug: 'ashcam-cutting-solutions',
    name: 'AshCam Cutting Solutions',
    titleLines: ['AshCam', 'Cutting Solutions'],
    eyebrow: 'Case Study · Industrial Cutting Tools',
    intro:
      'A new website, logo and business cards for a Toronto supplier of Japanese-made T.C.T cutting blades. Six decades of trade know-how, with a brand as sharp as the blades.',
    liveUrl: 'https://ashcamcuttingsolution.ca/',
    liveLabel: 'ashcamcuttingsolution.ca',
    metaTitle: 'AshCam Case Study: Website, Logo & Cards | Zenara Designs',
    metaDescription:
      'How we built a new website, logo and business cards for AshCam Cutting Solutions, a Toronto supplier of T.C.T cutting blades and industrial tools.',
    deliverables: ['Custom website', 'Logo design', 'Business card design', 'Brand palette'],
    facts: [
      { label: 'Client', value: 'AshCam Cutting Solutions Ltd.' },
      { label: 'Industry', value: 'Industrial cutting tools' },
      { label: 'Location', value: 'Toronto, serving the GTA' },
      { label: 'Year', value: '2025' },
    ],
    accent: 'rgba(238,98,22,0.18)',
    screens: {
      desktop: {
        src: '/images/case-studies/ashcam/site-desktop-full.jpg',
        width: 1440,
        height: 2699,
        alt: 'The AshCam Cutting Solutions homepage on a laptop, from the hero down to the footer',
      },
      mobile: {
        src: '/images/case-studies/ashcam/site-mobile-full.jpg',
        width: 780,
        height: 8400,
        alt: 'The AshCam Cutting Solutions homepage on a phone',
      },
      hero: {
        src: '/images/case-studies/ashcam/site-desktop-hero.jpg',
        width: 1600,
        height: 1000,
        alt: "AshCam Cutting Solutions homepage hero: “Blades that don't quit.” beside a cutting machine throwing sparks",
      },
    },
    brief: {
      heading: ['Sixty years in,', 'ready to be found.'],
      paragraphs: [
        'AshCam Cutting Solutions has been in the cutting business since 1964, and today stocks Japanese-made T.C.T carbide blades and industrial tools for contractors across Toronto and the GTA. The expertise was there. It needed a brand and a website to match.',
        'We designed a bold saw-blade logo, set a slate and safety-orange palette, made business cards that feel at home on a jobsite, and built a website that sends contractors straight to the blades or a quote.',
      ],
    },
    website: {
      heading: ['Built for the', 'jobsite.'],
      highlights: [
        { icon: LayoutGrid, title: 'Products up front', body: 'T.C.T blades one click from home.' },
        { icon: MessageSquareQuote, title: 'Quote first', body: '“Get a Quote” on every screen.' },
        { icon: MapPin, title: 'Local reach', body: 'Toronto, Vaughan, Markham and more.' },
        { icon: Smartphone, title: 'Phone first', body: 'Tuned for thumbs, then desktop.' },
      ],
    },
    branding: {
      heading: ['A mark with', 'teeth.'],
      body: 'A saw blade, teeth and all, spins behind a bold italic AshCam wordmark on a black bar. Safety orange and slate grey keep it loud enough for signage and clear enough for a browser tab.',
      logo: {
        src: '/images/case-studies/ashcam/logo.png',
        width: 862,
        height: 602,
        maxWidth: 440,
        alt: 'AshCam logo: an orange saw blade behind the AshCam wordmark on a black bar',
      },
      panelBg: '#495057',
      panelGlow: 'rgba(238,98,22,0.2)',
      typography: [
        { role: 'Headlines', family: 'Inter Bold', font: 'inter', weight: 700 },
        { role: 'Body', family: 'Inter', font: 'inter', weight: 400 },
      ],
      palette: [
        { name: 'Slate', hex: '#495057', note: 'Business card face', ink: '#FFFFFF' },
        { name: 'Graphite', hex: '#343A40', note: 'Card accents', ink: '#FFFFFF' },
        { name: 'Safety Orange', hex: '#EE6216', note: 'Logo, buttons & highlights', ink: '#FFFFFF' },
        { name: 'Workshop White', hex: '#F8F6F2', note: 'Website sections', ink: '#343A40' },
      ],
    },
    card: {
      heading: ['Sharp on', 'both sides.'],
      body: "The front is all brand: the logo, the line “Performance blades and cutting solutions for all your needs.”, and an orange arc that echoes the blade. The back puts the owner's name and every contact detail beside the logo, each with an orange icon so it scans in a second.",
      bullets: [
        'An orange arc on both sides ties the card back to the blade',
        'Phone, web, email and address, each with its own icon',
        'The same slate and orange as the website',
      ],
      aspect: 1540 / 880,
      front: {
        src: '/images/case-studies/ashcam/card-front.jpg',
        width: 1540,
        height: 880,
        alt: 'Front of the AshCam business card: the AshCam logo and tagline on slate grey above an orange arc',
      },
      back: {
        src: '/images/case-studies/ashcam/card-back.jpg',
        width: 1538,
        height: 872,
        alt: "Back of the AshCam business card: the owner's name and title, phone, website, email and address beside the AshCam logo",
      },
      accent: '#EE6216',
    },
  },
  {
    slug: 'ik-smart-solution',
    name: 'IK Smart Solution',
    titleLines: ['IK Smart', 'Solution'],
    eyebrow: 'Case Study · Security & Smart Home',
    intro:
      'A new website, logo, business cards and a print flyer for a Toronto security systems integrator. Cameras, access control and smart home installs, sold on trust rather than brand names.',
    liveUrl: 'https://www.iksmartsolution.ca/',
    liveLabel: 'iksmartsolution.ca',
    metaTitle: 'IK Smart Solution Case Study: Website & Brand | Zenara Designs',
    metaDescription:
      'How we built a new website, logo, business cards and print flyer for IK Smart Solution, a Toronto security and smart home systems integrator.',
    deliverables: ['Custom website', 'Logo design', 'Business card design', 'Print flyer', 'Brand palette'],
    facts: [
      { label: 'Client', value: 'IK Smart Solution' },
      { label: 'Industry', value: 'Security & smart home' },
      { label: 'Location', value: 'Toronto, serving the GTA' },
      { label: 'Year', value: '2026' },
    ],
    accent: 'rgba(255,193,7,0.16)',
    screens: {
      desktop: {
        src: '/images/case-studies/ik-smart/site-desktop-full.jpg',
        width: 1440,
        height: 7204,
        alt: 'The IK Smart Solution homepage on a laptop, from the hero down to the footer',
      },
      mobile: {
        src: '/images/case-studies/ik-smart/site-mobile-full.jpg',
        width: 780,
        height: 8400,
        alt: 'The IK Smart Solution homepage on a phone',
      },
      hero: {
        src: '/images/case-studies/ik-smart/site-desktop-hero.jpg',
        width: 1600,
        height: 1000,
        alt: 'IK Smart Solution homepage hero: “Intelligent security for every property” over a modern house at dusk',
      },
    },
    brief: {
      heading: ['Solutions,', 'not brand names.'],
      paragraphs: [
        'IK Smart Solution designs and installs cameras, access control, smart locks, alarms, Wi-Fi and audio for homes and warehouses across Toronto and the GTA. They work with every major manufacturer and recommend what fits the property, not what they are paid to push.',
        'We gave that independence a look: a circuit-house mark, a black and signal-yellow palette, business cards and a flyer for site visits, and a website that turns a worried homeowner into a booked assessment.',
      ],
    },
    website: {
      heading: ['Intelligent,', 'and easy to trust.'],
      highlights: [
        { icon: LayoutGrid, title: 'Every layer', body: 'Six systems, one clear overview.' },
        { icon: CalendarCheck, title: 'Assessment first', body: '“Free Assessment” on every screen.' },
        { icon: Star, title: 'Proof built in', body: 'Reviews, packages and 200+ installs.' },
        { icon: Smartphone, title: 'Phone first', body: 'Tuned for thumbs, then desktop.' },
      ],
    },
    branding: {
      heading: ['A house that', 'thinks.'],
      body: 'A house whose walls turn into circuit traces, drawn in one signal yellow. It says “smart home” and “security” in a single shape, and it stays crisp on a black card, a yellow flyer panel or a phone screen.',
      logo: {
        src: '/images/case-studies/ik-smart/logo.svg',
        width: 250,
        height: 250,
        maxWidth: 280,
        alt: 'IK Smart Solution logo: a yellow house outline with circuit traces running out of its wall',
      },
      panelBg: '#0D0D11',
      panelGlow: 'rgba(242,187,8,0.14)',
      typography: [
        { role: 'Website headlines', family: 'Archivo Narrow', font: 'archivoNarrow', weight: 700 },
        { role: 'Cards & flyer', family: 'Montserrat', font: 'montserrat', weight: 700 },
      ],
      palette: [
        { name: 'Onyx', hex: '#0D0D11', note: 'Business cards & dark flyer', ink: '#FFFFFF' },
        { name: 'Charcoal', hex: '#131313', note: 'Website background', ink: '#FFFFFF' },
        { name: 'Signal Yellow', hex: '#FFC107', note: 'Logo, buttons & highlights', ink: '#0D0D11' },
        { name: 'Soft Gold', hex: '#FFE4AF', note: 'Button gradient', ink: '#0D0D11' },
      ],
    },
    card: {
      heading: ['Scan it,', 'save it.'],
      body: "The front is pure brand: the circuit-house mark and name, centred over faint radar rings. The back puts the owner's name front and centre, with a yellow QR code that opens the website and a single line of phone, email and web address along the bottom.",
      bullets: [
        'QR code links straight to the website',
        'Radar rings echo the security theme on both sides',
        'Monospaced contact line that is easy to read and type',
      ],
      aspect: 1510 / 862,
      front: {
        src: '/images/case-studies/ik-smart/card-front.jpg',
        width: 1510,
        height: 862,
        alt: 'Front of the IK Smart Solution business card: the yellow circuit-house logo and name over dark radar rings',
      },
      back: {
        src: '/images/case-studies/ik-smart/card-back.jpg',
        width: 1508,
        height: 862,
        alt: 'Back of the IK Smart Solution business card: the owner\'s name and title, a yellow QR code, and phone, email and website',
      },
      accent: '#FFC107',
    },
    flyer: {
      heading: ['One page,', 'every layer.'],
      body: 'A letter-size flyer to leave behind after site visits and drop at local businesses. It leads with “Intelligent Security.”, backs it up with 200+ installs and 4-hour GTA support, lists all six systems, and ends on a free property audit with a QR code to book. Made in a light and a dark version for different paper and printers.',
      aspect: 1313 / 1700,
      variants: [
        {
          label: 'Light',
          src: '/images/case-studies/ik-smart/flyer-light.jpg',
          width: 1313,
          height: 1700,
          alt: 'IK Smart Solution flyer, light version: “Intelligent Security.”, key stats, six service tiles and a yellow free property audit panel with a QR code',
        },
        {
          label: 'Dark',
          src: '/images/case-studies/ik-smart/flyer-dark.jpg',
          width: 1313,
          height: 1700,
          alt: 'IK Smart Solution flyer, dark version: the same layout in white and yellow on black',
        },
      ],
    },
  },
  {
    slug: 'jb-loans',
    name: 'JB Loans',
    titleLines: ['JB', 'Loans'],
    eyebrow: 'Case Study · Mortgage Agent',
    intro:
      'A website for Jirosh Balaganesan, a licensed mortgage agent with Caliber Mortgage serving Scarborough, Markham and the GTA. Built and launched in five days, with a mortgage calculator and a free-call booking path on every screen.',
    liveUrl: 'https://jbloans.ca/',
    liveLabel: 'jbloans.ca',
    metaTitle: 'JB Loans Case Study: Mortgage Agent Website | Zenara Designs',
    metaDescription:
      'How we built a website for a licensed Ontario mortgage agent in five days, with a mortgage calculator, free-call booking and licence details up front.',
    deliverables: ['Custom website', 'Mortgage calculator', 'Contact & booking form', 'Five-day turnaround'],
    facts: [
      { label: 'Client', value: 'Jirosh Balaganesan, Caliber Mortgage Inc.' },
      { label: 'Industry', value: 'Mortgage agent' },
      { label: 'Location', value: 'Richmond Hill office, serving the GTA' },
      { label: 'Turnaround', value: 'Five days' },
    ],
    accent: 'rgba(37,99,235,0.18)',
    screens: {
      desktop: {
        src: '/images/case-studies/jb-loans/site-desktop-full.jpg',
        width: 1440,
        height: 5278,
        alt: 'The JB Loans homepage on a laptop, from the hero down to the footer',
      },
      mobile: {
        src: '/images/case-studies/jb-loans/site-mobile-full.jpg',
        width: 780,
        height: 14130,
        alt: 'The JB Loans homepage on a phone',
      },
      hero: {
        src: '/images/case-studies/jb-loans/site-desktop-hero.jpg',
        width: 1600,
        height: 1000,
        alt: 'JB Loans homepage hero: “Mortgage Help for Ontario Buyers” beside a portrait of Jirosh Balaganesan',
      },
    },
    brief: {
      heading: ['A licensed agent,', 'ready to be booked.'],
      paragraphs: [
        'Jirosh Balaganesan is a Level 1 mortgage agent with Caliber Mortgage Inc., helping first-time buyers and homeowners across Scarborough, Markham and the rest of the GTA. He works evenings and weekends, when most of his clients are free, and needed a site that let them start the conversation then too.',
        'We built it in five days: a clear introduction, what clients can expect at each step, a mortgage calculator for a quick monthly estimate, and a short form that sends residential, commercial and general questions straight to him.',
      ],
    },
    website: {
      heading: ['Clear numbers,', 'clear next steps.'],
      highlights: [
        { icon: Calculator, title: 'Mortgage calculator', body: 'A monthly estimate in seconds.' },
        { icon: CalendarCheck, title: 'Book a free call', body: 'On every screen, top to bottom.' },
        { icon: ShieldCheck, title: 'Licence up front', body: 'Licence and brokerage on every page.' },
        { icon: Smartphone, title: 'Phone first', body: 'Tuned for thumbs, then desktop.' },
      ],
    },
    highlight: {
      eyebrow: 'Five-Day Build',
      heading: ['Kickoff to launch', 'in five days.'],
      body: 'A mortgage agent’s enquiries don’t wait, so we kept the scope tight: one page that answers who he is, how the process works and roughly what a mortgage would cost, with every call to action pointing to a free call. It went from kickoff to live in five days.',
      bullets: [
        'A calculator for home price, down payment, interest rate and amortization',
        'Licence number and brokerage details on every page',
        'Reviews from his clients, with the city each one lives in',
        'A service-area list covering ten GTA cities',
      ],
    },
    cta: {
      lines: ['Need a site in', 'days, not months?'],
      body: 'A fixed price and a written quote before any work starts.',
    },
  },
  {
    slug: 'heroes-catering',
    name: 'Heroes Catering',
    titleLines: ['Heroes', 'Catering'],
    eyebrow: 'Case Study · Restaurant & Catering',
    intro:
      'A website and Google Business Profile setup for a Tamil and South Asian food counter in Scarborough’s GTA Mall. Menu favourites, catering for events, and a one-tap call on every screen.',
    liveUrl: 'https://heroes-catering.com/',
    liveLabel: 'heroes-catering.com',
    metaTitle: 'Heroes Catering Case Study | Scarborough | Zenara Designs',
    metaDescription:
      'How we built a website and set up the Google Business Profile for Heroes Catering, a Tamil and South Asian food counter and caterer in Scarborough.',
    deliverables: ['Custom website', 'Google Business Profile setup', 'Menu highlights', 'Catering section'],
    facts: [
      { label: 'Client', value: 'Heroes Catering' },
      { label: 'Industry', value: 'Restaurant & catering' },
      { label: 'Location', value: 'Scarborough (GTA Mall)' },
      { label: 'Year', value: '2026' },
    ],
    accent: 'rgba(38,103,69,0.22)',
    screens: {
      desktop: {
        src: '/images/case-studies/heroes/site-desktop-full.jpg',
        width: 1440,
        height: 7669,
        alt: 'The Heroes Catering homepage on a laptop, from the hero down to the footer',
      },
      mobile: {
        src: '/images/case-studies/heroes/site-mobile-full.jpg',
        width: 780,
        height: 25762,
        alt: 'The Heroes Catering homepage on a phone',
      },
      hero: {
        src: '/images/case-studies/heroes/site-desktop-hero.jpg',
        width: 1600,
        height: 1000,
        alt: 'Heroes Catering homepage hero: “Authentic Tamil & South Asian cooking” beside a spread of curries, samosas and dosa',
      },
    },
    brief: {
      heading: ['Home cooking,', 'easy to find.'],
      paragraphs: [
        'Heroes Catering cooks traditional Tamil and South Asian food from scratch every morning at its counter on the second floor of GTA Mall in Scarborough: kothu roti, biryani, short eats, falooda and Bru coffee. It also caters family gatherings, office lunches and parties in custom quantities.',
        'Customers needed two things: to find the counter, and to know they could order for a crowd. We built a site that puts the menu favourites, hours and directions up front and gives catering its own section with a call button, and we set up the Google Business Profile alongside it.',
      ],
    },
    website: {
      heading: ['Warm, local,', 'one tap to call.'],
      highlights: [
        { icon: UtensilsCrossed, title: 'Menu up front', body: 'Favourites, short eats and drinks.' },
        { icon: Users, title: 'Catering', body: 'Gatherings, offices and parties.' },
        { icon: MapPin, title: 'Easy to find', body: 'Mall, floor, hours and directions.' },
        { icon: Phone, title: 'Call first', body: 'One-tap call on every screen.' },
      ],
    },
    highlight: {
      eyebrow: 'Google Business Profile',
      heading: ['Found on the', 'map as well.'],
      body: 'Plenty of people choose where to eat from Google Maps without ever opening a website. So we set up Heroes Catering’s Google Business Profile alongside the site, and gave the site the details a hungry customer looks for first.',
      bullets: [
        'Opening hours with a live “Open now” status',
        'The mall, floor and street address, with one-tap directions',
        'Customer reviews quoted on the page',
        'Catering occasions and minimum quantities spelled out',
      ],
    },
    cta: {
      lines: ['Want to be easy', 'to find nearby?'],
      body: 'A website and a Google Business Profile, set up together.',
    },
  },
];

export const caseStudySlugs = caseStudies.map((c) => c.slug);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
