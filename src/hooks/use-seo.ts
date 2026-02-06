import { useEffect } from 'react';
import { generateLocalBusinessSchema, generateOrganizationSchema, generateWebSiteSchema, generateServiceSchema, injectMultipleSchemas } from '@/lib/structured-data';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: {
    type: 'localBusiness' | 'organization' | 'website' | 'service';
    serviceName?: string;
    serviceDescription?: string;
  };
}

export const useSEO = ({ title, description, canonical, noindex = false, structuredData }: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Note: Meta keywords are not used by search engines and are considered outdated
    // Keywords are now handled through natural content and semantic HTML

    // Normalize and update canonical URL
    // Always use https://zenaradesigns.com (no www, always HTTPS)
    if (canonical) {
      let normalizedCanonical = canonical;
      
      // Remove www if present
      normalizedCanonical = normalizedCanonical.replace(/^https?:\/\/(www\.)?/, 'https://');
      
      // Ensure it starts with https://zenaradesigns.com
      if (normalizedCanonical.startsWith('http://zenaradesigns.com')) {
        normalizedCanonical = normalizedCanonical.replace('http://', 'https://');
      } else if (!normalizedCanonical.startsWith('https://zenaradesigns.com')) {
        // If it's a relative URL, prepend the base URL
        if (normalizedCanonical.startsWith('/')) {
          normalizedCanonical = `https://zenaradesigns.com${normalizedCanonical}`;
        } else {
          // If it's already a full URL but different domain, keep as is but ensure HTTPS
          normalizedCanonical = normalizedCanonical.replace(/^http:/, 'https:');
        }
      }
      
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', normalizedCanonical);
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', normalizedCanonical);
        document.head.appendChild(canonicalLink);
      }
    }

    // Update robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
    } else {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
      document.head.appendChild(metaRobots);
    }

    // Update Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    } else {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.setAttribute('content', title);
      document.head.appendChild(ogTitle);
    }

    // Update Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    } else {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      ogDescription.setAttribute('content', description);
      document.head.appendChild(ogDescription);
    }

    // Update Twitter title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    } else {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      twitterTitle.setAttribute('content', title);
      document.head.appendChild(twitterTitle);
    }

    // Update Twitter description
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    } else {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      twitterDescription.setAttribute('content', description);
      document.head.appendChild(twitterDescription);
    }

    // Inject structured data if specified
    if (structuredData) {
      const schemas = [];
      
      // Always include Organization and WebSite schemas
      schemas.push(generateOrganizationSchema());
      schemas.push(generateWebSiteSchema());
      
      // Add specific schema based on type
      switch (structuredData.type) {
        case 'localBusiness':
          schemas.push(generateLocalBusinessSchema());
          break;
        case 'service':
          if (structuredData.serviceName && structuredData.serviceDescription) {
            schemas.push(generateServiceSchema(structuredData.serviceName, structuredData.serviceDescription));
          }
          break;
        default:
          break;
      }
      
      // Inject all schemas
      injectMultipleSchemas(schemas);
    }

  }, [title, description, canonical, noindex, structuredData]);
};
