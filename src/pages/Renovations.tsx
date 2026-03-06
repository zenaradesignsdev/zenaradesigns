import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Hammer, Home, Image, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollToTop, useSEO } from '@/hooks';
import { memo, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';

const Renovations = () => {
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Renovation Company Web Design GTA | Construction Websites | Zenara",
    description: "Professional web design for renovation companies in Markham, Vaughan, Pickering & across GTA. Showcase projects, capture leads, and grow your construction business.",
    canonical: "https://zenaradesigns.com/renovations"
  });

  // Inject structured data
  useEffect(() => {
    const schemas = [
      generateLocalBusinessSchema(),
      generateServiceSchema(
        'Renovation Company Web Design',
        'Professional web design and development services for renovation companies and construction businesses across the Greater Toronto Area. Showcase projects, capture leads, and grow your business with a modern, high-performing website.'
      )
    ];
    
    // Inject all schemas
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    
    return () => {
      // Cleanup on unmount
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        if (script.textContent?.includes('Renovation Company Web Design')) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gradient Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
      </div>
      
      {/* Space Background Elements */}
      <div className="absolute inset-0">
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
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Renovation Company Web Design</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Greater Toronto Area</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4 mb-8">
            Showcase your renovation projects and capture leads with a professional website designed for construction companies across the GTA. Modern, mobile-friendly platforms that convert visitors into clients.
          </p>
          <div className="flex justify-center">
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                <Link to="/contact" className="flex items-center justify-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                  <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Section 1: Modern Renovation Business */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">From Word-of-Mouth to</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Digital-First Growth</span>
              </h2>
              <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                The renovation and construction industry in the GTA is highly competitive. Homeowners and businesses are increasingly researching contractors online before making decisions. A professional website is no longer optional—it's essential for capturing leads and showcasing your craftsmanship.
              </p>
              <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                A well-designed website serves as your digital showroom, allowing potential clients to browse your portfolio, read testimonials, and request quotes 24/7. This constant availability helps you capture leads even when your office is closed.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Key Features */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Essential Features for</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Renovation Companies</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: Image,
                title: 'Project Portfolio Gallery',
                description: 'Showcase your best work with high-quality image galleries, before-and-after comparisons, and detailed project descriptions that highlight your expertise.'
              },
              {
                icon: Calendar,
                title: 'Quote Request System',
                description: 'Streamline lead capture with automated quote request forms that collect project details and schedule consultations directly from your website.'
              },
              {
                icon: Home,
                title: 'Service Area Pages',
                description: 'Dedicated pages for different renovation services—kitchen remodels, bathroom renovations, basement finishing—optimized for local search.'
              },
              {
                icon: TrendingUp,
                title: 'Testimonials & Reviews',
                description: 'Build trust with client testimonials, project case studies, and integrated review systems that showcase your reputation and quality work.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: CTA */}
        <section>
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-light text-lg sm:text-xl">
                  Ready to Grow Your Renovation Business?
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Get Your</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Free Strategy Audit</span>
              </h2>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Contact us today for a free consultation about your renovation company's web design needs. We'll analyze your current online presence and provide a roadmap to digital growth.
              </p>
              <div className="flex justify-center">
                <div className="relative w-full sm:w-auto rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                    <Link to="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        Book Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(Renovations);
