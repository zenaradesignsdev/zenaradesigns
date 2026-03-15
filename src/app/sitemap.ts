import type { MetadataRoute } from 'next';
import { blogPosts } from '@/content/blog';

const baseUrl = 'https://zenaradesigns.com';
const lastModified = new Date('2026-01-01');

const locations = [
  'markham',
  'vaughan',
  'pickering',
  'ajax',
  'oshawa',
  'whitby',
  'richmond-hill',
  'newmarket',
  'aurora',
  'stouffville',
  'toronto',
  'mississauga',
  'brampton',
  'oakville',
  'burlington',
  'hamilton',
  'scarborough',
  'north-york',
  'etobicoke',
];

const industries = ['lawyers', 'accountants', 'renovations', 'clinics'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/web-design`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/ecommerce`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/logo-design`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/business-cards`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/seo`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/hosting`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
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
    { url: `${baseUrl}/security`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/mobile`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const industryLocationRoutes: MetadataRoute.Sitemap = industries.flatMap((industry) =>
    locations.map((location) => ({
      url: `${baseUrl}/${industry}/${location}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...industryLocationRoutes, ...blogRoutes];
}
