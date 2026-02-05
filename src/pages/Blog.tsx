import { useScrollToTop, useSEO } from '@/hooks';
import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { blogPosts } from '@/content/blog';
import { BlogCard } from '@/components/Blog/BlogCard';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Blog | Web Design Tips & Insights | Zenara Designs",
    description: "Read our latest blog posts about web design, digital marketing, business growth, and online presence. Expert insights for Toronto businesses and entrepreneurs.",
    canonical: "https://zenaradesigns.com/blog"
  });

  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleCardIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-card-index') || '0');
        setVisibleCards(prev => {
          if (!prev.includes(index)) {
            return [...prev, index];
          }
          return prev;
        });
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleCardIntersection, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [handleCardIntersection, blogPosts.length]);

  // Get featured post (most recent)
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="blog-hero py-20 sm:py-24 md:py-32 relative overflow-hidden">
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle Stars */}
          <div className="absolute top-16 left-16 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle"></div>
          <div className="absolute top-32 right-24 w-1 h-1 bg-purple-300 rounded-full animate-twinkle delay-1000"></div>
          <div className="absolute top-48 left-1/3 w-1 h-1 bg-teal-300 rounded-full animate-twinkle delay-2000"></div>
          <div className="absolute top-24 right-1/3 w-1 h-1 bg-violet-300 rounded-full animate-twinkle delay-500"></div>
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle delay-1500"></div>
          <div className="absolute bottom-48 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-twinkle delay-700"></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl p-4 sm:p-6 border border-cyan-400/30">
                  <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 text-cyan-300" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-8 text-white leading-tight">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4 mb-4">
              Insights, tips, and strategies to help your business thrive online
            </p>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-4 mb-12 sm:mb-16">
              Expert advice on web design, digital marketing, and growing your online presence
            </p>
          </div>

          {/* Featured Post Section */}
          {featuredPost && (
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                <span className="text-cyan-400 font-semibold text-sm sm:text-base uppercase tracking-wider">Featured Article</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              </div>
              
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group block bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                    {/* Content */}
                    <div className="flex-1">
                      {featuredPost.tags && featuredPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredPost.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-full border border-cyan-400/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
                        {featuredPost.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm sm:text-base text-slate-400 mb-6">
                        <span>{featuredPost.author}</span>
                        <span>•</span>
                        <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      
                      <div className="inline-flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 font-semibold transition-colors duration-300">
                        <span>Read Article</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    {/* Featured Image */}
                    {featuredPost.featuredImage ? (
                      <div className="lg:w-96 lg:flex-shrink-0">
                        <div className="w-full h-64 sm:h-80 lg:h-full rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                          <img
                            src={featuredPost.featuredImage}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="eager"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="lg:w-96 lg:flex-shrink-0">
                        <div className="w-full h-64 sm:h-80 lg:h-full rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-teal-500/20 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 sm:h-24 sm:w-24 text-cyan-400/50" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* All Blog Posts Section */}
      <section className="py-16 sm:py-20 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {otherPosts.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-8 sm:mb-12">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  All <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Articles</span>
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {otherPosts.map((post, index) => (
                  <div
                    key={post.slug}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    data-card-index={index}
                    className={`transition-all duration-700 ${
                      visibleCards.includes(index)
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            </>
          )}
          
          {blogPosts.length === 0 && (
            <div className="text-center py-20 sm:py-24">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 sm:p-16 border border-white/10 max-w-2xl mx-auto">
                <BookOpen className="h-16 w-16 sm:h-20 sm:w-20 text-slate-400 mx-auto mb-6" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">No articles yet</h3>
                <p className="text-slate-300 text-lg mb-6">
                  We're working on creating valuable content for you. Check back soon!
                </p>
                <div className="flex items-center justify-center gap-2 text-cyan-400">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span className="text-sm">More articles coming soon</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {blogPosts.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-teal-500/20 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-cyan-400/30 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Want to Work With Us?
                </h2>
                <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                  Ready to transform your online presence? Let's discuss how we can help your business grow.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default memo(Blog);
