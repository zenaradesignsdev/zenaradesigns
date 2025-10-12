// Structured data utilities for JSON-LD schema markup
import { BUSINESS_NAME, BUSINESS_EMAIL, BUSINESS_PHONE } from './constants';

// Business information for LocalBusiness schema
export const BUSINESS_INFO = {
  name: BUSINESS_NAME,
  email: BUSINESS_EMAIL,
  phone: BUSINESS_PHONE,
  url: 'https://zenaradesigns.com',
  logo: 'https://zenaradesigns.com/logo-seo.png',
  description: 'Professional web design and development agency serving Toronto and the Greater Toronto Area. We create modern, fast, and secure websites for small businesses and professionals.',
  
  // Address information (using Toronto as primary location)
  address: {
    streetAddress: '123 King Street West',
    addressLocality: 'Toronto',
    addressRegion: 'ON',
    postalCode: 'M5H 1A1',
    addressCountry: 'CA'
  },
  
  // Geographic coordinates for Toronto
  geo: {
    latitude: 43.6532,
    longitude: -79.3832
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
    'Toronto',
    'Mississauga',
    'Brampton',
    'Markham',
    'Vaughan',
    'Richmond Hill',
    'Oakville',
    'Burlington',
    'Hamilton',
    'Greater Toronto Area'
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
  
  // Aggregate rating (example - would be updated with real data)
  aggregateRating: {
    ratingValue: 4.9,
    reviewCount: 47,
    bestRating: 5,
    worstRating: 1
  }
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
    
    // Address (PostalAddress)
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
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
    
    // Aggregate rating
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS_INFO.aggregateRating.ratingValue,
      reviewCount: BUSINESS_INFO.aggregateRating.reviewCount,
      bestRating: BUSINESS_INFO.aggregateRating.bestRating,
      worstRating: BUSINESS_INFO.aggregateRating.worstRating
    },
    
    // Additional business details
    foundingDate: '2020',
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
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.addressRegion,
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
    foundingDate: '2020',
    numberOfEmployees: '2-10'
  };
};

// Generate WebSite schema
export const generateWebSiteSchema = () => {
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
    
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://zenaradesigns.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
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
        streetAddress: BUSINESS_INFO.address.streetAddress,
        addressLocality: BUSINESS_INFO.address.addressLocality,
        addressRegion: BUSINESS_INFO.address.addressRegion,
        postalCode: BUSINESS_INFO.address.postalCode,
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

// Utility function to inject JSON-LD into document head
export const injectStructuredData = (schema: object) => {
  // Remove existing structured data script
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create new script element
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  
  // Add to document head
  document.head.appendChild(script);
};

// Utility function to inject multiple schemas
export const injectMultipleSchemas = (schemas: object[]) => {
  // Remove existing structured data scripts
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());
  
  // Inject each schema
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  });
};
