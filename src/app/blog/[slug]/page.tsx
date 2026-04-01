import type { Metadata } from 'next';
import { blogPosts, getPostBySlug } from '@/content/blog';
import BlogPost from '@/components/pages/BlogPost';
import { generateBlogPostingSchema, generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';

interface Props {
  params: { slug: string };
}

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
    title: `${post.title} | Zenara Designs Blog`,
    description: post.description,
    alternates: { canonical: `https://zenaradesigns.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://zenaradesigns.com/blog/${post.slug}`,
      publishedTime: post.publishedAt.toISOString(),
      ...(post.featuredImage && {
        images: [{ url: `https://zenaradesigns.com${post.featuredImage}` }],
      }),
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  // Render structured data as SSR script tags so crawlers see them in initial HTML
  const schemas = post
    ? [generateOrganizationSchema(), generateWebSiteSchema(), generateBlogPostingSchema(post)]
    : [];

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
      <BlogPost />
    </>
  );
}
