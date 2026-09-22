import type { MetadataRoute } from 'next';
import { blogPosts } from '@/content/blog';
import { citySlugs } from '@/lib/city-content';
import { industryVerticalSlugs } from '@/lib/industry-verticals';

const baseUrl = 'https://zenaradesigns.com';
// A real content date, NOT `new Date()`. Using build time stamped all ~50 URLs
// as "modified now" on every deploy, which teaches search engines to discount
// lastmod entirely — including for pages that genuinely did change. Bump this
// when site-wide copy changes; per-page dates (blog) override it below.
const lastModified = new Date('2026-09-22T00:00:00Z');

// Markham (home base), Stouffville and Scarborough lead the campaign, so they
// outrank the other city pages in priority. The full set of city slugs comes
// from cityContent; retired cities 301 elsewhere — see RETIRED_CITIES in
// next.config.mjs.
const primaryCities = new Set(['markham', 'stouffville', 'scarborough']);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/web-design`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/ecommerce`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/branding`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/seo`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/website-maintenance`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/geo`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/website-redesign`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/lawyers`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/accountants`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/renovations`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/clinics`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/locations`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact/schedule`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/process`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const webDesignCityRoutes: MetadataRoute.Sitemap = citySlugs.map((city) => ({
    url: `${baseUrl}/web-design/${city}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: primaryCities.has(city) ? 0.9 : 0.7,
  }));

  const industryVerticalRoutes: MetadataRoute.Sitemap = industryVerticalSlugs.map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...webDesignCityRoutes,
    ...industryVerticalRoutes,
    ...blogRoutes,
  ];
}
