import { BlogPost } from '@/types';
import { importanceOfWebsitePost } from './importance-of-website-for-business';
import { websiteCostTorontoPost } from './how-much-does-a-website-cost-toronto';
import { seoGuideTorontoPost } from './seo-guide-small-business-toronto';
import { websiteVsSocialMediaPost } from './website-vs-social-media-business';
import { choosingWebDesignerGtaPost } from './choosing-web-designer-gta';
import { badWebsiteCostingMoneyPost } from './bad-website-costing-business-money';

const discoveryImage = '/images/zenara-discovery.jpg';
const prototypingImage = '/images/zenara-prototyping.jpg';
const buildImage = '/images/zenara-build.jpg';

// Export all blog posts in an array
// Posts are ordered by published date (newest first)
export const blogPosts: BlogPost[] = [
  {
    ...importanceOfWebsitePost,
    featuredImage: discoveryImage,
  },
  {
    ...websiteCostTorontoPost,
    featuredImage: prototypingImage,
  },
  {
    ...seoGuideTorontoPost,
    featuredImage: discoveryImage,
  },
  {
    ...websiteVsSocialMediaPost,
    featuredImage: buildImage,
  },
  {
    ...choosingWebDesignerGtaPost,
    featuredImage: prototypingImage,
  },
  {
    ...badWebsiteCostingMoneyPost,
    featuredImage: buildImage,
  },
].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

// Helper function to get a post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get all post slugs (useful for static generation)
export const getAllPostSlugs = (): string[] => {
  return blogPosts.map(post => post.slug);
};
