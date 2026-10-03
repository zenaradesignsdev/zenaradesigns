// Business contact information constants
export const BUSINESS_EMAIL = 'info@zenaradesigns.com';
export const BUSINESS_DOMAIN = 'zenaradesigns.com';
export const BUSINESS_NAME = 'Zenara Designs';
export const BUSINESS_PHONE = '(647) 835-1077';
export const BUSINESS_PHONE_E164 = '+16478351077';

export const SITE_URL = 'https://zenaradesigns.com';
// JSON-LD node ids. Every schema that mentions the business points at
// ORGANIZATION_ID instead of restating its details.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// The business's only public profiles. The Maps URL is the Google Business
// Profile (listing CID), which is the strongest sameAs signal for local search.
export const INSTAGRAM_URL = 'https://www.instagram.com/zenaradesignsinc/';
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?cid=3251807051192604712';

// Navigation constants
export const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
] as const;

// Footer additional links
export const FOOTER_ADDITIONAL_LINKS = [
  { href: '/faq', label: 'FAQ' },
  { href: '/locations', label: 'Locations' },
  { href: '/process', label: 'Our Process' },
  { href: '/blog', label: 'Blog' },
  { href: '/payments', label: 'Payments' },
  { href: '/privacy', label: 'Privacy Policy' },
] as const;

// Service-area city pages, for the footer link mesh. Markham, Stouffville and
// Scarborough lead — keep in sync with src/lib/city-content.ts.
export const SERVICE_AREA_LINKS = [
  { href: '/web-design/markham', label: 'Markham' },
  { href: '/web-design/stouffville', label: 'Stouffville' },
  { href: '/web-design/scarborough', label: 'Scarborough' },
  { href: '/web-design/toronto', label: 'Toronto' },
  { href: '/web-design/mississauga', label: 'Mississauga' },
  { href: '/web-design/richmond-hill', label: 'Richmond Hill' },
  { href: '/web-design/vaughan', label: 'Vaughan' },
  { href: '/web-design/pickering', label: 'Pickering' },
] as const;

// Service sub-page links for footer
export const SERVICE_LINKS = [
  { href: '/services/web-design', label: 'Web Design' },
  { href: '/services/ecommerce', label: 'E-Commerce' },
  { href: '/services/branding', label: 'Branding' },
  { href: '/services/seo', label: 'SEO' },
  { href: '/services/website-maintenance', label: 'Website Maintenance' },
  { href: '/services/geo', label: 'GEO / AI Search' },
  { href: '/services/website-redesign', label: 'Website Redesign' },
] as const;

// Performance constants
export const PERFORMANCE_THRESHOLDS = {
  INTERSECTION_OBSERVER: 0.3,
  SCROLL_DEBOUNCE: 100,
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS_PER_WINDOW: 3,
} as const;

// Form validation constants
export const FORM_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  COMPANY_MAX: 100,
  PROJECT_TYPE_MAX: 50,
  BUDGET_MAX: 50,
  TIMELINE_MAX: 50,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 2000,
} as const;

// Breakpoint constants
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;
