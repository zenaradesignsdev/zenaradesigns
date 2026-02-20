import { BlogPost } from '@/lib/types';
import { importanceOfWebsitePost } from './importance-of-website-for-business';
import discoveryImage from '@/assets/zenara-discovery.jpg';

// Export all blog posts in an array
// Posts are ordered by published date (newest first)
export const blogPosts: BlogPost[] = [
  {
    ...importanceOfWebsitePost,
    featuredImage: discoveryImage,
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
