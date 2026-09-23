import { blogPosts } from '@/content/blog';
import { getPostOutline } from '@/lib/blog-outline';
import { BlogHeroBackdrop } from '@/components/Blog/BlogHeroBackdrop';
import { BlogFeaturedPost } from '@/components/Blog/BlogFeaturedPost';
import { BlogListItem } from '@/components/Blog/BlogListItem';
import { BlogCta } from '@/components/Blog/BlogCta';

const Blog = () => {
  const [featuredPost, ...otherPosts] = blogPosts;

  return (
    <div className="min-h-screen bg-black">
      <section className="relative overflow-clip pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16">
        <BlogHeroBackdrop />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">
            Web Design, SEO &amp; Growth
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.05] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Notes on Building</span>
            <span className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">
              Websites That Work.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed">
            Practical advice on web design, local SEO, and getting more enquiries from your site, written for
            small businesses in Markham and across the GTA.
          </p>
        </div>
      </section>

      {featuredPost && (
        <section className="pb-16 sm:pb-20" aria-label="Latest article">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <BlogFeaturedPost post={featuredPost} readingMinutes={getPostOutline(featuredPost).readingMinutes} />
          </div>
        </section>
      )}

      {otherPosts.length > 0 && (
        <section className="pb-16 sm:pb-24" aria-labelledby="all-articles">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-baseline justify-between mb-2">
              <h2 id="all-articles" className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                All articles
              </h2>
              <span className="text-xs text-white/30">{blogPosts.length} posts</span>
            </div>
            <div className="border-b border-white/10">
              {otherPosts.map((post) => (
                <BlogListItem key={post.slug} post={post} readingMinutes={getPostOutline(post).readingMinutes} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BlogCta />
        </div>
      </section>
    </div>
  );
};

export default Blog;
