// Process content — single source of truth for our 6-phase web design
// methodology. Shared between the About page (condensed timeline) and the
// /process page (full walkthrough with photography and deliverables) so
// both pages describe the same process and can't drift out of sync.
//
// Every deliverable and tool named here is something we actually use —
// see the stack list on the About page (Next.js, TypeScript, Tailwind,
// Vercel, Cloudflare, Figma, GA4). No invented tooling, no per-phase day
// counts — actual timelines vary by package and live on /pricing.

export interface ProcessPhase {
  phase: string;
  tagline: string;
  details: string[];
  whatWeDeliver: string[];
  image: string;
  imageAlt: string;
}

export const processPhases: ProcessPhase[] = [
  {
    phase: 'Discovery',
    tagline: 'Understanding your business before a single pixel gets placed.',
    details: [
      'Business goals analysis',
      'Target audience research',
      'Competitive landscape review',
      'Technical requirements gathering',
    ],
    whatWeDeliver: [
      'A written project brief you review and approve',
      'A sitemap and page-by-page content plan',
      'A fixed price and timeline before any work begins',
    ],
    image: '/images/zenara-discovery.jpg',
    imageAlt: 'Laptop and desktop monitor on a desk during the discovery phase of a website project',
  },
  {
    phase: 'Prototyping',
    tagline: 'Wireframes and visual direction, reviewed with you before we write a line of code.',
    details: [
      'Mock-up designs',
      'Button/links design flow',
      'Image/video placement design',
      'Systems design and software architecture',
    ],
    whatWeDeliver: [
      'Wireframes for every page in the sitemap',
      'A visual direction — colour, type, and layout — built from your brand',
      'Your sign-off before a single line of code is written',
    ],
    image: '/images/zenara-prototyping.jpg',
    imageAlt: 'Designer reviewing wireframes and layout mockups on a laptop during the prototyping phase',
  },
  {
    phase: 'Build',
    tagline: 'Real code, built for speed — no page builders, no templates.',
    details: [
      'Modern development practices',
      'Component-based architecture',
      'Performance optimization',
      'Cross-browser testing',
    ],
    whatWeDeliver: [
      'A fully responsive site built in Next.js and TypeScript',
      'Preview links so you can watch it come together in real time',
      'Every page matched to the prototype you approved',
    ],
    image: '/images/zenara-build.jpg',
    imageAlt: 'Developer writing code in an editor while building a client website',
  },
  {
    phase: 'Quality Testing',
    tagline: 'Every page checked before it goes live — not after a visitor finds the bug.',
    details: [
      'Performance testing',
      'Device compatibility check',
      'SEO optimization',
      'Mobile responsiveness and optimization',
      'Custom functionality testing',
    ],
    whatWeDeliver: [
      'A Lighthouse performance pass across Core Web Vitals',
      'Manual testing across real mobile, tablet, and desktop screens',
      'Meta titles, descriptions, and structured data in place',
    ],
    image: '/images/zenara-testing.jpg',
    imageAlt: 'Code editor and browser preview open side by side during website quality assurance testing',
  },
  {
    phase: 'Launch',
    tagline: 'Domain connected, analytics wired up, and your site goes live.',
    details: [
      'DNS setup & SSL',
      'CDN configuration',
      'Analytics integration',
      'Domain hookup',
      'Email notification config',
    ],
    whatWeDeliver: [
      'Your domain live with SSL and a global CDN in front of it',
      'Google Analytics and Search Console connected from day one',
      'A final walkthrough of the live site together',
    ],
    image: '/images/zenara-launch.jpg',
    imageAlt: 'Website analytics dashboard displayed on a laptop screen after a site launch',
  },
  {
    phase: 'Support',
    tagline: "Launch day isn't the finish line — we stay reachable after.",
    details: [
      'Monthly maintenance',
      'Content updates',
      'Security patches',
      'Performance monitoring',
    ],
    whatWeDeliver: [
      'A post-launch support window included with every plan',
      'Direct access to the two of us — no ticket queue',
      'An optional care plan for ongoing updates, monitoring, and hosting',
    ],
    image: '/images/zenara-support.jpg',
    imageAlt: 'Developer at a desk wearing headphones during a post-launch client support call',
  },
];
