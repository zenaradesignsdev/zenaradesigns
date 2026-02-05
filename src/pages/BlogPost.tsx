import { useParams, Link } from 'react-router-dom';
import { useScrollToTop, useSEO } from '@/hooks';
import { memo, useMemo, useEffect } from 'react';
import { getPostBySlug } from '@/content/blog';
import { BlogPostLayout } from '@/components/Blog/BlogPostLayout';
import { generateBlogPostingSchema, injectMultipleSchemas, generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';
import { ArrowLeft } from 'lucide-react';
import NotFound from './NotFound';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  useScrollToTop();

  const post = useMemo(() => {
    if (!slug) return undefined;
    return getPostBySlug(slug);
  }, [slug]);

  // SEO meta tags
  useSEO({
    title: post ? `${post.title} | Zenara Designs Blog` : 'Blog Post | Zenara Designs',
    description: post?.description || 'Read our latest blog post about web design and digital marketing.',
    canonical: post ? `https://zenaradesigns.com/blog/${post.slug}` : undefined,
  });

  // Inject structured data for blog post
  useEffect(() => {
    if (post) {
      const schemas = [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        generateBlogPostingSchema(post),
      ];
      injectMultipleSchemas(schemas);
    }
  }, [post]);

  // If post not found, show 404
  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Space Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle Stars */}
        <div className="absolute top-16 left-16 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle"></div>
        <div className="absolute top-32 right-24 w-1 h-1 bg-purple-300 rounded-full animate-twinkle delay-1000"></div>
        <div className="absolute top-48 left-1/3 w-1 h-1 bg-teal-300 rounded-full animate-twinkle delay-2000"></div>
        <div className="absolute top-24 right-1/3 w-1 h-1 bg-violet-300 rounded-full animate-twinkle delay-500"></div>
        
        {/* Nebula Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <section className="py-16 sm:py-20 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blog</span>
          </Link>

          {/* Blog Post Content */}
          <BlogPostLayout post={post} />
        </div>
      </section>
    </div>
  );
};

export default memo(BlogPost);
