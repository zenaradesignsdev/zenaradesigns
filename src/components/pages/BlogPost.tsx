import { blogPosts } from '@/content/blog';
import { getPostOutline, getRelatedPosts } from '@/lib/blog-outline';
import { BlogHeroBackdrop } from '@/components/Blog/BlogHeroBackdrop';
import { BlogPostLayout } from '@/components/Blog/BlogPostLayout';
import { BlogListItem } from '@/components/Blog/BlogListItem';
import type { BlogPost as BlogPostType } from '@/types';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost = ({ post }: BlogPostProps) => {
  const related = getRelatedPosts(post, blogPosts);

  return (
    <div className="min-h-screen bg-black">
      <section className="relative overflow-clip pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20">
        <BlogHeroBackdrop />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <BlogPostLayout post={post} outline={getPostOutline(post)} />
        </div>
      </section>

      {/* Each post closes with its own contextual call to action, so there is
          no generic CTA block here. */}
      {related.length > 0 && (
        <section className="pb-20 sm:pb-28" aria-labelledby="keep-reading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 id="keep-reading" className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
              Keep reading
            </h2>
            <div className="border-b border-white/10">
              {related.map((p) => (
                <BlogListItem key={p.slug} post={p} readingMinutes={getPostOutline(p).readingMinutes} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
