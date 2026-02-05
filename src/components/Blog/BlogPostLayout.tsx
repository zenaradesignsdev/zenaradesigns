import { BlogPost } from '@/lib/types';
import { BlogMetadata } from './BlogMetadata';

interface BlogPostLayoutProps {
  post: BlogPost;
}

export const BlogPostLayout = ({ post }: BlogPostLayoutProps) => {
  const ContentComponent = post.content;

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8 sm:mb-12">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Description/Excerpt */}
        <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed mb-6">
          {post.description}
        </p>

        {/* Metadata */}
        <BlogMetadata post={post} />
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="w-full mb-8 sm:mb-12 rounded-2xl overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* Content */}
      <div className="blog-content">
        <ContentComponent />
      </div>
    </article>
  );
};
