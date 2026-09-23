// Structured data utilities for JSON-LD schema markup
import { BUSINESS_NAME, BUSINESS_EMAIL, BUSINESS_PHONE, NAVIGATION_LINKS } from './constants';
import { ABOUT_URL, findTeamMember, teamPersonId } from '@/lib/team';

// Business information for LocalBusiness schema
export const BUSINESS_INFO = {
  name: BUSINESS_NAME,
  email: BUSINESS_EMAIL,
  phone: BUSINESS_PHONE,
  url: 'https://zenaradesigns.com',
  logo: 'https://zenaradesigns.com/logo-seo.svg',
  description: 'Professional web design and development agency based in Markham, Ontario, serving the Greater Toronto Area. We create modern, fast, and secure websites for small businesses and professionals.',
  
  // Address information (service-area business — no physical storefront)
  address: {
    addressLocality: 'Markham',
    addressRegion: 'ON',
    addressCountry: 'CA'
  },
  
  // Markham civic centroid — the municipality, deliberately not a street
  // address (this is a service-area business run from a residential address).
  geo: {
    latitude: 43.8561,
    longitude: -79.3370
  },
  
  // Business hours (Monday to Friday, 9 AM to 6 PM EST)
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  ],
  
  // Service areas
  areaServed: [
    'Markham',
    'Stouffville',
    'Scarborough',
    'Toronto',
    'Mississauga',
    'Richmond Hill',
    'Vaughan',
    'Pickering',
    'Greater Toronto Area',
  ],
  
  // Services offered
  serviceType: [
    'Web Design',
    'Web Development',
    'Business Card Design',
    'Logo Design',
    'Digital Marketing',
    'E-commerce Development',
    'Mobile App Development',
    'SEO Services'
  ],
  
  // Social media profiles
  sameAs: [
    'https://www.linkedin.com/company/zenara-designs',
    'https://twitter.com/zenaradesigns',
    'https://www.instagram.com/zenaradesigns',
    'https://www.facebook.com/zenaradesigns'
  ],
  
  // Price range
  priceRange: '$$',
  
  // Price range
  priceRangeIndicator: '$$'
};

// Generate LocalBusiness JSON-LD schema
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://zenaradesigns.com/#business',
    
    // Required fields
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: BUSINESS_INFO.url,
    
    // Address (PostalAddress — service-area business, no street address)
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      addressCountry: BUSINESS_INFO.address.addressCountry
    },
    
    // Contact information
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    
    // Image and logo
    image: BUSINESS_INFO.logo,
    logo: {
      '@type': 'ImageObject',
      url: BUSINESS_INFO.logo,
      width: 450,
      height: 120
    },
    
    // Geographic coordinates
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude
    },
    
    // Opening hours
    openingHoursSpecification: BUSINESS_INFO.openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes
    })),
    
    // Service areas
    areaServed: BUSINESS_INFO.areaServed.map(area => ({
      '@type': 'City',
      name: area
    })),
    
    // Services offered
    makesOffer: BUSINESS_INFO.serviceType.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service,
        provider: {
          '@type': 'LocalBusiness',
          name: BUSINESS_INFO.name
        }
      }
    })),
    
    // Social media
    sameAs: BUSINESS_INFO.sameAs,
    
    // Price range
    priceRange: BUSINESS_INFO.priceRange,
    
    // Additional business details
    foundingDate: '2024',
    numberOfEmployees: '2-10',
    currenciesAccepted: 'CAD',
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Bank Transfer'],
    
    // Keywords for search engines
  };
};

// Generate Organization schema (for broader business presence)
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://zenaradesigns.com/#organization',
    
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    description: BUSINESS_INFO.description,
    
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      addressCountry: BUSINESS_INFO.address.addressCountry
    },

    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_INFO.phone,
      email: BUSINESS_INFO.email,
      contactType: 'customer service',
      availableLanguage: 'English'
    },

    sameAs: BUSINESS_INFO.sameAs,
    foundingDate: '2024',
    numberOfEmployees: '2-10'
  };
};

// Generate SiteNavigationElement schema for main navigation
export const generateSiteNavigationElementSchema = () => {
  const baseUrl = BUSINESS_INFO.url;
  
  // Filter out Home page and only include main navigation pages (About, Services, Projects, Pricing, Contact)
  const mainNavLinks = NAVIGATION_LINKS.filter(link => link.href !== '/');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    '@id': 'https://zenaradesigns.com/#main-navigation',
    name: 'Main Navigation',
    hasPart: mainNavLinks.map(link => ({
      '@type': 'SiteNavigationElement',
      name: link.label,
      url: `${baseUrl}${link.href}`
    }))
  };
};

// Generate WebSite schema
export const generateWebSiteSchema = () => {
  const baseUrl = BUSINESS_INFO.url;
  
  // Get main navigation pages (excluding Home)
  const mainNavLinks = NAVIGATION_LINKS.filter(link => link.href !== '/');
  
  // Create hasPart array with WebPage references for main navigation pages
  const mainPages = mainNavLinks.map(link => ({
    '@type': 'WebPage',
    '@id': `${baseUrl}${link.href}`,
    name: link.label,
    url: `${baseUrl}${link.href}`
  }));
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://zenaradesigns.com/#website',
    
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    description: BUSINESS_INFO.description,
    
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      url: BUSINESS_INFO.url,
      logo: {
        '@type': 'ImageObject',
        url: BUSINESS_INFO.logo
      }
    },
    
    // Main pages in the site structure
    hasPart: mainPages
  };
};

// Generate Service schema for specific services
export const generateServiceSchema = (serviceName: string, serviceDescription: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://zenaradesigns.com/services#${serviceName.toLowerCase().replace(/\s+/g, '-')}`,
    
    name: serviceName,
    description: serviceDescription,
    
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_INFO.name,
      url: BUSINESS_INFO.url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: BUSINESS_INFO.address.addressLocality,
        addressRegion: BUSINESS_INFO.address.addressRegion,
        addressCountry: BUSINESS_INFO.address.addressCountry
      }
    },

    areaServed: BUSINESS_INFO.areaServed.map(area => ({
      '@type': 'City',
      name: area
    })),
    
    serviceType: serviceName,
    category: 'Web Design and Development'
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
      : { '@type': 'Organization', name: post.author, url: BUSINESS_INFO.url },
    
    publisher: {
      '@type': 'Organization',
      '@id': `${BUSINESS_INFO.url}/#organization`,
      name: BUSINESS_INFO.name,
      url: BUSINESS_INFO.url,
      logo: {
        '@type': 'ImageObject',
        url: BUSINESS_INFO.logo
      }
    },
    
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

// Utility function to inject multiple schemas
// `groupId` scopes an injection to one caller. Without it this cleared *every*
// client-injected ld+json script before writing its own, so two StructuredData
// components on the same page (e.g. siteNavigation + breadcrumb on the home
// page) silently wiped each other and only the last one to run survived.
export const injectMultipleSchemas = (schemas: object[], groupId: string) => {
  removeSchemaGroup(groupId);

  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.schemaGroup = groupId;
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  });
};

// Matched on the dataset rather than an attribute selector: React's useId()
// produces ids containing colons, which are not valid in an unescaped selector.
export const removeSchemaGroup = (groupId: string) => {
  document
    .querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"][data-schema-group]')
    .forEach(script => {
      if (script.dataset.schemaGroup === groupId) script.remove();
    });
};
