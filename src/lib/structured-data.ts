// Structured data utilities for JSON-LD schema markup
import {
  BUSINESS_NAME,
  BUSINESS_EMAIL,
  BUSINESS_PHONE_E164,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  ORGANIZATION_ID,
  SERVICE_LINKS,
  SITE_URL,
  WEBSITE_ID,
} from './constants';
import { ABOUT_URL, findTeamMember, teamPersonId } from '@/lib/team';

// Business facts for the site-wide schema. Keep hours, phone and profiles
// identical to the Google Business Profile, since Google cross-checks them.
// This is a service-area business, so the address is the municipality only.
export const BUSINESS_INFO = {
  name: BUSINESS_NAME,
  email: BUSINESS_EMAIL,
  phone: BUSINESS_PHONE_E164,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-seo.svg`,
  image: `${SITE_URL}/web-app-manifest-512x512.png`,
  description:
    'Web design and development studio based in Markham, serving the GTA. Custom websites, branding, SEO and managed maintenance for small businesses.',
  address: {
    addressLocality: 'Markham',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  // Markham civic centroid — the municipality, deliberately not a street
  // address (the business is run from a residential address).
  geo: {
    latitude: 43.8561,
    longitude: -79.337,
  },
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '18:00',
  },
  areaServed: [
    'Markham',
    'Stouffville',
    'Scarborough',
    'Toronto',
    'Mississauga',
    'Richmond Hill',
    'Vaughan',
    'Pickering',
  ],
  googleMapsUrl: GOOGLE_MAPS_URL,
  sameAs: [INSTAGRAM_URL, GOOGLE_MAPS_URL],
  // Matches the payment FAQ on /pricing.
  paymentAccepted: 'Credit Card, Interac e-Transfer, Cheque',
};

// The one node that describes the business. ProfessionalService is a subtype
// of both LocalBusiness and Organization, so a single entity serves as the
// local listing and as the publisher/founder target everywhere else (blog
// posts, WebSite, /about). Other schemas reference it by @id rather than
// restating it, which is what previously let two conflicting copies appear.
export const generateBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORGANIZATION_ID,
  name: BUSINESS_INFO.name,
  description: BUSINESS_INFO.description,
  url: BUSINESS_INFO.url,
  logo: { '@type': 'ImageObject', url: BUSINESS_INFO.logo },
  image: BUSINESS_INFO.image,
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  address: {
    '@type': 'PostalAddress',
    ...BUSINESS_INFO.address,
  },
  geo: {
    '@type': 'GeoCoordinates',
    ...BUSINESS_INFO.geo,
  },
  hasMap: BUSINESS_INFO.googleMapsUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      ...BUSINESS_INFO.openingHours,
    },
  ],
  areaServed: BUSINESS_INFO.areaServed.map((name) => ({ '@type': 'City', name })),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    areaServed: 'CA',
    availableLanguage: 'English',
  },
  sameAs: BUSINESS_INFO.sameAs,
  priceRange: '$$',
  currenciesAccepted: 'CAD',
  paymentAccepted: BUSINESS_INFO.paymentAccepted,
  foundingDate: '2024',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Design & Development Services',
    itemListElement: SERVICE_LINKS.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.label,
        url: `${SITE_URL}${service.href}`,
      },
    })),
  },
});

export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: BUSINESS_INFO.name,
  url: BUSINESS_INFO.url,
  inLanguage: 'en-CA',
  publisher: { '@id': ORGANIZATION_ID },
});

// Service schema for an industry page. `path` is the page the service is
// described on, so the @id belongs to that page.
export const generateServiceSchema = (serviceName: string, serviceDescription: string, path: string) => {
  const url = `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: serviceName,
    description: serviceDescription,
    url,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: BUSINESS_INFO.areaServed.map((name) => ({ '@type': 'City', name })),
    serviceType: serviceName,
    category: 'Web Design and Development',
  };
};

// Generate BlogPosting schema for blog posts
export const generateBlogPostingSchema = (post: { slug: string; title: string; description: string; author: string; publishedAt: Date; updatedAt?: Date; featuredImage?: string; tags?: string[] }) => {
  const baseUrl = 'https://zenaradesigns.com';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const authorMember = findTeamMember(post.author);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#blogpost`,
    
    headline: post.title,
    description: post.description,
    url: postUrl,
    
    // A team member byline points at their Person node on /about; anything
    // else is attributed to the company.
    author: authorMember
      ? { '@type': 'Person', '@id': teamPersonId(authorMember.name), name: authorMember.name, url: ABOUT_URL, jobTitle: authorMember.role }
      : { '@id': ORGANIZATION_ID },
    
    publisher: { '@id': ORGANIZATION_ID },
    
    datePublished: post.publishedAt.toISOString(),
    dateModified: (post.updatedAt || post.publishedAt).toISOString(),
    
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
    },
    
    // Schema.org image must be an absolute URL; featuredImage is a site path.
    image: post.featuredImage ? `${baseUrl}${post.featuredImage}` : BUSINESS_INFO.logo,
    
    keywords: post.tags?.length ? post.tags.join(', ') : post.title.split(' ').join(', '),
    
    articleSection: 'Web Design'
  };
};

// Generate BreadcrumbList schema for navigation
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  const absolute = (url: string) => (url.startsWith('http') ? url : `${BUSINESS_INFO.url}${url}`);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    // Scoped to the page the trail ends on, so each page's breadcrumb is its own node.
    '@id': `${absolute(items[items.length - 1]?.url ?? '/')}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.url)
    }))
  };
};
