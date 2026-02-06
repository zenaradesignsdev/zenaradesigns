import { useEffect } from 'react';
import { 
  generateLocalBusinessSchema, 
  generateOrganizationSchema, 
  generateWebSiteSchema, 
  generateServiceSchema,
  generateSiteNavigationElementSchema,
  generateBreadcrumbSchema,
  injectMultipleSchemas 
} from '@/lib/structured-data';

// FAQPage schema generator
const generateFAQPageSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://zenaradesigns.com/faq#faqpage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Product/Offer schema generator for pricing packages
const generateProductSchema = (product: {
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}) => {
  // Clean price: remove $, commas, and handle + sign by extracting base number
  // For "$4,999+", extract "4999" as the base price
  const cleanPrice = product.price
    .replace(/[$,]/g, '') // Remove $ and commas
    .replace(/\+.*$/, '') // Remove + and everything after it
    .trim();
  
  // Ensure price is a valid number string (numeric only)
  const numericPrice = cleanPrice.replace(/[^\d.]/g, '');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://zenaradesigns.com/pricing#${product.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: product.name,
    description: product.description,
    category: 'Web Design Service',
    image: 'https://zenaradesigns.com/logo-seo.png', // Add required image field
    brand: {
      '@type': 'Brand',
      name: 'Zenara Designs'
    },
    offers: {
      '@type': 'Offer',
      price: numericPrice, // Use cleaned numeric price
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LocalBusiness',
        name: 'Zenara Designs',
        url: 'https://zenaradesigns.com'
      },
      description: product.description,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 1 year from now
    },
    additionalProperty: product.features.map(feature => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature
    })),
    ...(product.popular && {
      additionalProperty: [
        ...product.features.map(feature => ({
          '@type': 'PropertyValue',
          name: 'Feature',
          value: feature
        })),
        {
          '@type': 'PropertyValue',
          name: 'Popular',
          value: 'true'
        }
      ]
    })
  };
};

// Review schema generator for testimonials
const generateReviewSchema = (review: {
  author: string;
  role: string;
  quote: string;
  rating: number;
  date?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `https://zenaradesigns.com/services#review-${review.author.toLowerCase().replace(/\s+/g, '-')}`,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    author: {
      '@type': 'Person',
      name: review.author,
      jobTitle: review.role
    },
    reviewBody: review.quote,
    datePublished: review.date || new Date().toISOString().split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: 'Zenara Designs',
      url: 'https://zenaradesigns.com'
    }
  };
};

// AggregateRating schema for business
const generateAggregateRatingSchema = (rating: {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    '@id': 'https://zenaradesigns.com/#aggregate-rating',
    ratingValue: rating.ratingValue,
    reviewCount: rating.reviewCount,
    bestRating: rating.bestRating,
    worstRating: rating.worstRating,
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Zenara Designs',
      url: 'https://zenaradesigns.com'
    }
  };
};

// Service schema generator for individual services
const generateServiceOfferingSchema = (service: {
  name?: string;
  title?: string;
  description: string;
  features: string[];
  emoji: string;
}) => {
  const serviceName = service.name || service.title || 'Service';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://zenaradesigns.com/services#${serviceName.toLowerCase().replace(/\s+/g, '-')}`,
    name: serviceName,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Zenara Designs',
      url: 'https://zenaradesigns.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 King Street West',
        addressLocality: 'Toronto',
        addressRegion: 'ON',
        postalCode: 'M5H 1A1',
        addressCountry: 'CA'
      }
    },
    areaServed: [
      'Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham', 
      'Richmond Hill', 'Oakville', 'Burlington', 'Hamilton', 'GTA'
    ].map(city => ({
      '@type': 'City',
      name: city
    })),
    serviceType: serviceName,
    category: 'Web Design and Development',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Design Services',
      itemListElement: service.features.map((feature, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature
        },
        position: index + 1
      }))
    }
  };
};

// Main StructuredData component
interface StructuredDataProps {
  type: 'localBusiness' | 'organization' | 'website' | 'service' | 'faq' | 'product' | 'review' | 'aggregateRating' | 'serviceOffering' | 'siteNavigation' | 'breadcrumb';
  data?: any;
  faqs?: Array<{question: string, answer: string}>;
  products?: Array<{
    name: string;
    description: string;
    price: string;
    features: string[];
    popular?: boolean;
  }>;
  reviews?: Array<{
    author: string;
    role: string;
    quote: string;
    rating: number;
    date?: string;
  }>;
  services?: Array<{
    name?: string;
    title?: string;
    description: string;
    features: string[];
    emoji: string;
  }>;
  serviceName?: string;
  serviceDescription?: string;
  rating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  data,
  faqs,
  products,
  reviews,
  services,
  serviceName,
  serviceDescription,
  rating,
  breadcrumbs
}) => {
  useEffect(() => {
    const schemas = [];
    
    // Always include Organization and WebSite schemas
    schemas.push(generateOrganizationSchema());
    schemas.push(generateWebSiteSchema());
    
    // Add specific schema based on type
    switch (type) {
      case 'localBusiness':
        schemas.push(generateLocalBusinessSchema());
        break;
        
      case 'service':
        if (serviceName && serviceDescription) {
          schemas.push(generateServiceSchema(serviceName, serviceDescription));
        }
        break;
        
      case 'faq':
        if (faqs && faqs.length > 0) {
          schemas.push(generateFAQPageSchema(faqs));
        }
        break;
        
      case 'product':
        if (products && products.length > 0) {
          products.forEach(product => {
            schemas.push(generateProductSchema(product));
          });
        }
        break;
        
      case 'review':
        if (reviews && reviews.length > 0) {
          reviews.forEach(review => {
            schemas.push(generateReviewSchema(review));
          });
        }
        break;
        
      case 'aggregateRating':
        if (rating) {
          schemas.push(generateAggregateRatingSchema(rating));
        }
        break;
        
      case 'serviceOffering':
        if (services && services.length > 0) {
          services.forEach(service => {
            schemas.push(generateServiceOfferingSchema(service));
          });
        }
        break;
        
      case 'siteNavigation':
        schemas.push(generateSiteNavigationElementSchema());
        break;
        
      case 'breadcrumb':
        if (breadcrumbs && breadcrumbs.length > 0) {
          schemas.push(generateBreadcrumbSchema(breadcrumbs));
        }
        break;
        
      default:
        break;
    }
    
    // Inject all schemas
    injectMultipleSchemas(schemas);
    
    // Cleanup function
    return () => {
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => script.remove());
    };
  }, [type, data, faqs, products, reviews, services, serviceName, serviceDescription, rating, breadcrumbs]);
  
  return null; // This component doesn't render anything
};

export default StructuredData;
