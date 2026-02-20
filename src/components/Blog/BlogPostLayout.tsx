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
      <header className="mb-12 sm:mb-16 md:mb-20">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-full border border-cyan-400/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 sm:mb-8 leading-[1.1] tracking-[-0.04em]">
          <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">{post.title}</span>
        </h1>

        {/* Description/Excerpt */}
        <p className="text-base sm:text-lg md:text-xl text-white/60 leading-[1.7] font-light tracking-[0.01em] mb-6 sm:mb-8">
          {post.description}
        </p>

        {/* Metadata */}
        <BlogMetadata post={post} />
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="w-full mb-12 sm:mb-16 md:mb-20 rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-auto object-cover relative z-10"
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
