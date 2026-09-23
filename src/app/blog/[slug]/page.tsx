import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug } from '@/content/blog';
import BlogPost from '@/components/pages/BlogPost';
import { generateBlogPostingSchema, generateBreadcrumbSchema } from '@/lib/structured-data';

interface Props {
  params: { slug: string };
}

// Only these slugs exist. Without `dynamicParams = false` an unknown slug was
// server-rendered on demand and returned HTTP 200 with a "not found" body — a
// soft 404 that let Google crawl an unbounded set of /blog/* URLs.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Zenara Designs',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: post.seoTitle ?? `${post.title} | Zenara Designs Blog`,
    description: post.description,
    alternates: { canonical: `https://zenaradesigns.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://zenaradesigns.com/blog/${post.slug}`,
      publishedTime: post.publishedAt.toISOString(),
      ...(post.updatedAt && { modifiedTime: post.updatedAt.toISOString() }),
      ...(post.featuredImage && {
        images: [{ url: `https://zenaradesigns.com${post.featuredImage}`, ...(post.featuredImageAlt && { alt: post.featuredImageAlt }) }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // Organization and WebSite come from the root layout; repeating them here
  // put two copies of each on every post.
  const schemas = [
    generateBlogPostingSchema(post),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          data-ssr="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BlogPost post={post} />
    </>
  );
}
