import { useScrollToTop, useSEO } from '@/hooks';
import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { blogPosts } from '@/content/blog';
import { BlogCard } from '@/components/Blog/BlogCard';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PERFORMANCE_THRESHOLDS } from '@/lib/constants';
import StructuredData from '@/components/StructuredData';

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
      threshold: PERFORMANCE_THRESHOLDS.INTERSECTION_OBSERVER,
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gradient Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        {/* Accent gradients with theme colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
      </div>
      
      {/* Space Background Elements */}
      <div className="absolute inset-0">
        {/* Background Stars */}
        <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
        <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
        <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
        <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
        <div className="bg-star" style={{ top: '15%', left: '45%' }}></div>
        <div className="bg-star" style={{ top: '9%', left: '58%' }}></div>
        <div className="bg-star" style={{ top: '18%', left: '68%' }}></div>
        <div className="bg-star" style={{ top: '7%', left: '78%' }}></div>
        <div className="bg-star" style={{ top: '14%', left: '88%' }}></div>
        <div className="bg-star" style={{ top: '11%', left: '95%' }}></div>
        
        {/* Nebula Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="font-light opacity-90">Our </span>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Blog</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4 mb-4">
              Insights, tips, and strategies to help your business thrive online
            </p>
            <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Expert advice on web design, digital marketing, and growing your online presence
            </p>
          </div>

          {/* Featured Post Section */}
          {featuredPost && (
            <div className="max-w-6xl mx-auto">
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group block bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-12 border border-slate-800/50 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden"
              >
                {/* Box glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                    {/* Content */}
                    <div className="flex-1">
                      {featuredPost.tags && featuredPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredPost.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-full border border-cyan-400/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300 tracking-tight">
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient group-hover:opacity-100">{featuredPost.title}</span>
                      </h2>
                      
                      <p className="text-white/60 text-base sm:text-lg md:text-xl leading-relaxed mb-6 font-light">
                        {featuredPost.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm sm:text-base text-white/50 mb-6 font-light">
                        <span>{featuredPost.author}</span>
                        <span>•</span>
                        <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      
                      <div className="inline-flex items-center gap-2 text-cyan-300 group-hover:text-cyan-200 font-semibold transition-colors duration-300">
                        <span>Read Article</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    {/* Featured Image */}
                    {featuredPost.featuredImage ? (
                      <div className="lg:w-96 lg:flex-shrink-0">
                        <div className="w-full h-64 sm:h-80 lg:h-full rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 relative">
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
                        <div className="w-full h-64 sm:h-80 lg:h-full rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-cyan-500/20 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                          <BookOpen className="h-16 w-16 sm:h-24 sm:w-24 text-cyan-400/50 relative z-10" />
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

      {/* CTA Section */}
      {blogPosts.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
          {/* Gradient Background Layers */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
          </div>
          
          {/* Space Background Elements */}
          <div className="absolute inset-0">
            {/* Background Stars */}
            <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
            <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
            <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
            <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
            <div className="bg-star" style={{ top: '15%', left: '45%' }}></div>
            <div className="bg-star" style={{ top: '9%', left: '58%' }}></div>
            
            {/* Nebula Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-8 sm:p-12 border border-slate-800/50 text-center relative overflow-hidden">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
                  <span className="block font-light opacity-90">Want to Work</span>
                  <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">With Us?</span>
                </h2>
                <p className="text-base sm:text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
                  Ready to transform your online presence? Let's discuss how we can help your business grow.
                </p>
                <div className="flex justify-center">
                  <div className="relative w-full sm:w-auto rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                    <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                      <Link to="/contact" className="flex items-center justify-center">
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                        <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Breadcrumb Schema */}
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' }
        ]} 
      />
    </div>
  );
};

export default memo(Blog);
