import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollToTop, useSEO, scrollToTop } from '@/hooks';
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import StructuredData from '@/components/StructuredData';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';
import renovationBackyard from '@/assets/renovation-backyard.png';
import renovationKitchen from '@/assets/renovation-kitchen.png';
import renovationHome from '@/assets/renovation-home.png';

const Renovations = () => {
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Renovation Company Web Design GTA | Construction Websites | Zenara",
    description: "Professional web design for renovation companies in Markham, Vaughan, Pickering & across GTA. Showcase projects, capture leads, and grow your construction business.",
    canonical: "https://zenaradesigns.com/renovations",
    ogImage: "/assets/renovation-backyard.png",
    twitterImage: "/assets/renovation-backyard.png"
  });

  // Entrance animations state
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for sections
  const handleSectionIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.getAttribute('data-section-id');
      if (sectionId) {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(sectionId));
        }
      }
    });
  }, []);

  // Intersection Observer for grid items
  const handleItemIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-item-index') || '0');
        setVisibleItems(prev => [...prev, index]);
      }
    });
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(handleSectionIntersection, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    const itemObserver = new IntersectionObserver(handleItemIntersection, { 
      threshold: 0.2 
    });

    // Observe sections
    sectionRefs.current.forEach((ref) => {
      if (ref) sectionObserver.observe(ref);
    });

    // Observe grid items
    itemRefs.current.forEach((ref) => {
      if (ref) itemObserver.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) sectionObserver.unobserve(ref);
      });
      itemRefs.current.forEach((ref) => {
        if (ref) itemObserver.unobserve(ref);
      });
    };
  }, [handleSectionIntersection, handleItemIntersection]);

  // GTA Locations
  const locations = [
    {
      id: 'markham',
      city: 'Markham',
      description: 'Serving renovation companies in Markham\'s thriving neighborhoods, from Unionville to Downtown Markham. Specializing in luxury kitchen renovations, bathroom remodels, and home additions.',
      keywords: ['renovation company web design Markham', 'contractor website design Markham', 'renovation website Markham']
    },
    {
      id: 'vaughan',
      city: 'Vaughan',
      description: 'Professional web design for Vaughan renovation companies, including Woodbridge, Thornhill, and Maple. Expertise in basement finishing, kitchen renovations, and custom home additions.',
      keywords: ['renovation company web design Vaughan', 'contractor website design Vaughan', 'renovation website Vaughan']
    },
    {
      id: 'pickering',
      city: 'Pickering',
      description: 'Custom renovation websites for Pickering contractors. Serving kitchen remodels, bathroom renovations, and home additions throughout the Durham Region.',
      keywords: ['renovation company web design Pickering', 'contractor website design Pickering', 'renovation website Pickering']
    },
    {
      id: 'ajax',
      city: 'Ajax',
      description: 'Modern web solutions for Ajax renovation companies. Specializing in basement finishing, kitchen renovations, and bathroom remodels.',
      keywords: ['renovation company web design Ajax', 'contractor website design Ajax', 'renovation website Ajax']
    },
    {
      id: 'oshawa',
      city: 'Oshawa',
      description: 'Professional renovation website design for Oshawa contractors. Serving home additions, kitchen remodels, and bathroom renovations.',
      keywords: ['renovation company web design Oshawa', 'contractor website design Oshawa', 'renovation website Oshawa']
    },
    {
      id: 'whitby',
      city: 'Whitby',
      description: 'High-quality renovation websites for Whitby contractors. Expertise in luxury kitchen renovations, bathroom remodels, and home additions.',
      keywords: ['renovation company web design Whitby', 'contractor website design Whitby', 'renovation website Whitby']
    },
    {
      id: 'richmond-hill',
      city: 'Richmond Hill',
      description: 'Professional renovation websites for Richmond Hill contractors. Specializing in custom home additions, kitchen renovations, and basement finishing.',
      keywords: ['renovation company web design Richmond Hill', 'contractor website design Richmond Hill', 'renovation website Richmond Hill']
    },
    {
      id: 'newmarket',
      city: 'Newmarket',
      description: 'Custom web design for Newmarket renovation companies. Serving kitchen remodels, bathroom renovations, and home additions.',
      keywords: ['renovation company web design Newmarket', 'contractor website design Newmarket', 'renovation website Newmarket']
    },
    {
      id: 'aurora',
      city: 'Aurora',
      description: 'Professional renovation website solutions for Aurora contractors. Expertise in luxury renovations, kitchen remodels, and home additions.',
      keywords: ['renovation company web design Aurora', 'contractor website design Aurora', 'renovation website Aurora']
    },
    {
      id: 'stouffville',
      city: 'Stouffville',
      description: 'Modern web design for Stouffville renovation companies. Specializing in custom home additions, kitchen renovations, and bathroom remodels.',
      keywords: ['renovation company web design Stouffville', 'contractor website design Stouffville', 'renovation website Stouffville']
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How much revenue do renovation companies lose from bad websites?",
      answer: "The average GTA renovation firm loses $150,000 to $300,000+ annually in missed project revenue due to a poor web presence. These are high-value contracts going to competitors who simply look more professional online. Contractors with poor websites lose 40-60% of potential leads to the 'back' button. Firms with high-end, professional websites see 3.5x more quote requests than those with basic sites."
    },
    {
      question: "Why is website design so important for renovation company trust and credibility?",
      answer: "In the renovation business, people aren't just buying a service; they're buying a vision for their home. Research shows that first impressions are formed in just 0.05 seconds, and 94% of those impressions are design-related. 75% of users judge a contractor's reliability based on their website design. If your website looks outdated or 'cheap,' homeowners will assume your finishing work is, too. A sleek, modern site signals that you are organized, professional, and use the latest building technologies."
    },
    {
      question: "How much does a professional renovation company website cost in Ontario?",
      answer: "A custom, professional website for an Ontario renovation company typically ranges from $4,000 to $10,000, depending on features like project portfolio galleries, quote request systems, service area pages, video testimonials, and local SEO optimization. Zenara Designs provides transparent, fixed-price proposals to ensure budgetary certainty for your business."
    },
    {
      question: "How long does it take to build a renovation company's website?",
      answer: "A complete custom renovation company website usually takes 5 to 8 weeks from initial discovery to launch. This timeline includes competitive analysis, custom design focused on showcasing craftsmanship, development of essential features like project galleries, and SEO optimization to ensure your company ranks for local searches."
    },
    {
      question: "What features are essential for a renovation company website in 2026?",
      answer: "Essential features include high-conversion quote request systems, dynamic project portfolios with before/after galleries, client trust and credibility hub (WSIB, insurance, certifications), process roadmap section, local SEO and neighborhood targeting, and video testimonials with social proof. These features build trust, showcase craftsmanship, and convert visitors into high-value project leads."
    },
    {
      question: "Do renovation companies in GTA suburbs need local SEO?",
      answer: "Absolutely. With 84% of homeowners researching contractors online first, local SEO is critical for acquiring clients. Appearing in Google Map Pack for city-specific terms like 'Markham kitchen renovation' or 'Vaughan basement finishing' is essential for capturing ready-to-buy homeowners searching for renovation services."
    },
    {
      question: "Can a new website help my renovation company get more projects?",
      answer: "Yes. A professionally designed, SEO-optimized website functions as a 24/7 lead generation engine. Renovation companies with high-quality project portfolios, clear service area pages, video testimonials, and optimized call-to-action triggers see a significant increase in quote requests compared to companies with outdated digital presences. Professional websites also build trust and credibility, which are essential for converting browsers into high-value project clients."
    }
  ];

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
      {/* Gradient Background Layers - Applied to entire page */}
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

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
          {/* Left Section - Text Content */}
          <div className="bg-slate-900/95 backdrop-blur-sm flex items-center py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16 border-r border-slate-800/50 pt-24 sm:pt-28 md:pt-32 lg:pt-40">
            <div className="w-full max-w-2xl mx-auto lg:mx-0">
              {/* Accent line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 mb-6"></div>
              
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-4 text-white leading-[1.1] tracking-[-0.04em]">
                <span className="font-light opacity-90">Renovation Company Web Design</span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg sm:text-xl md:text-2xl mb-6 font-light">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Greater Toronto Area</span>
              </p>
              
              {/* Paragraph 1 */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-6 font-light tracking-[0.01em]">
                <span className="font-semibold text-cyan-300">84% of homeowners</span> research renovation companies online before ever requesting a quote, and for high-ticket projects like additions or luxury kitchens, <span className="font-semibold text-cyan-300">91% check a contractor's digital portfolio first</span>. Your website is your digital showroom, your proof of quality, and your 24/7 lead generation engine.
              </p>
              
              {/* Paragraph 2 */}
              <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 font-light tracking-[0.01em]">
                Professional web design that showcases craftsmanship, builds homeowner trust, and converts browsers into high-value project leads.
              </p>
              
              {/* CTA Button */}
              <div>
                <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button 
                    asChild 
                    className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group"
                  >
                    <Link 
                      to="/contact" 
                      onClick={scrollToTop}
                      className="flex items-center gap-2 relative z-10 group-hover:text-white"
                    >
                      <span className="relative z-10">Get A Free Quote</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                      {/* Hover background animation - left to right */}
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section - Image with Overlay */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-black">
              <img 
                src={renovationBackyard} 
                alt="Professional renovation company web design services in Greater Toronto Area" 
                className="w-full h-full object-cover"
                width="1200"
                height="800"
                loading="eager"
                decoding="async"
              />
            </div>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 relative z-10">
        {/* Section 1: From Word-of-Mouth to Digital-First Growth */}
        <section 
          data-section-id="transformation"
          ref={(el) => {
            if (el) sectionRefs.current.set('transformation', el);
          }}
          className={`pt-16 sm:pt-20 md:pt-24 mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
            visibleSections.has('transformation') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              {/* Heading spanning full width */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-10 md:mb-12 leading-[1.1] tracking-[-0.04em] text-center">
                <span className="block font-light opacity-90">From Word-of-Mouth to</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Digital-First Growth</span>
              </h2>
              
              {/* Content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    The home improvement industry in Ontario is more competitive than ever. While referrals are great, <span className="text-cyan-300 font-semibold">84% of GTA homeowners now use the internet to vet contractors before making a phone call</span>. With renovation firms across the GTA serving neighborhoods from luxury builds in Vaughan to heritage homes in Markham, your online presence is no longer optional—it's your most powerful sales tool.
                  </p>
                  <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    Traditional "truck and trailer" marketing is being disrupted by modern, digital-first design firms. To scale, your company must pivot from a "hidden gem" to a visible industry leader. This transition requires a website that showcases your craftsmanship in high definition, highlights your licensing/insurance for peace of mind, and makes it effortless for homeowners to request a site visit.
                  </p>
                  <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    Firms that provide a professional, visual-heavy digital experience see higher project margins and more "ready-to-buy" clients. Your craftsmanship is only as good as it looks online. A Zenara-designed platform showcases your precision, positioning your company as the premier choice in the York and Durham renovation markets.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <img 
                    src={renovationKitchen}
                    alt="Professional renovation company digital transformation"
                    className="w-full h-auto max-h-[500px] object-contain"
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Visual First Impression */}
        <section 
          data-section-id="first-impression"
          ref={(el) => {
            if (el) sectionRefs.current.set('first-impression', el);
          }}
          className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
            visibleSections.has('first-impression') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">The Visual First Impression</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Trust is Built in 0.05 Seconds</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
            <div className="flex items-center justify-center order-2 lg:order-1">
              <img 
                src={renovationHome}
                alt="Professional renovation craftsmanship and trust"
                className="w-full h-auto max-h-[500px] object-contain"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  In the renovation business, people aren't just buying a service; they're buying a vision for their home. Research shows that <span className="text-cyan-300 font-semibold">first impressions are formed in just 0.05 seconds</span>, and <span className="text-cyan-300 font-semibold">94% of those impressions are design-related</span>. If your website looks outdated or "cheap," homeowners will assume your finishing work is, too.
                </p>
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  <span className="text-cyan-300 font-semibold">75% of users judge a contractor's reliability based on their website design</span>. A sleek, modern site signals that you are organized, professional, and use the latest building technologies. In an industry where "cowboy contractors" are a major fear for homeowners, a professional digital presence is your strongest trust signal.
                </p>
                <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  With over <span className="text-cyan-300 font-semibold">90% of younger homeowners (the fastest-growing segment in the GTA) starting their renovation journey on a screen</span>, your website isn't just a gallery. It's the tool that convinces a homeowner you're worth the $100k+ investment.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                stat: '84%',
                label: 'Research contractors online first',
                description: 'Homeowners vet your reputation and quality before they invite you into their home'
              },
              {
                stat: '91%',
                label: 'Check portfolios before calling',
                description: 'If they can\'t see your past work clearly, they won\'t hire you for future work'
              },
              {
                stat: '0.05s',
                label: 'Time to form a first impression',
                description: 'You have a fraction of a second to prove you aren\'t a "fly-by-night" operation'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                ref={(el) => {
                  if (el && !itemRefs.current[index]) {
                    itemRefs.current[index] = el;
                  }
                }}
                data-item-index={index}
                className={`bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group text-center ${
                  visibleItems.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-3">
                    {item.stat}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.label}</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: The Cost of a Bad Website */}
        <section 
          data-section-id="cost-bad-website"
          ref={(el) => {
            if (el) sectionRefs.current.set('cost-bad-website', el);
          }}
          className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
            visibleSections.has('cost-bad-website') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">The Cost of a</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Bad Website</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
            <div className="flex items-center justify-center order-2 lg:order-1">
              <img 
                src={renovationHome}
                alt="Renovation company losing projects due to poor website design"
                className="w-full h-auto max-h-[500px] object-contain"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  Having a "under construction" page, a basic Facebook-only presence, or a slow, ugly website is costing your renovation business massive projects every month. <span className="text-cyan-300 font-semibold">Contractors with poor websites lose 40-60% of potential leads to the "back" button</span>. These are homeowners looking for a kitchen or basement remodel who leave because your site didn't inspire confidence.
                </p>
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  The financial impact is heavy. <span className="text-cyan-300 font-semibold">The average GTA renovation firm loses $150,000 to $300,000+ annually in missed project revenue</span> due to a poor web presence. These are high-value contracts going to competitors who simply look more professional online.
                </p>
                <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  The opportunity cost is even higher. <span className="text-cyan-300 font-semibold">Firms with high-end, professional websites see 3.5x more quote requests</span> than those with basic sites. Every day your site fails to showcase your work is a day you lose a dream project to the guy down the street with a better gallery.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                stat: '$150K-$300K+',
                label: 'Annual revenue loss',
                description: 'One or two missed high-end renovations per year pays for a professional website ten times over'
              },
              {
                stat: '40-60%',
                label: 'Leads lost to bounce rate',
                description: 'Homeowners leave when they see low-quality photos or a site that isn\'t mobile-friendly'
              },
              {
                stat: '3.5x',
                label: 'More quote requests',
                description: 'Professional design captures the attention of serious, high-budget homeowners'
              },
              {
                stat: '88%',
                label: 'Won\'t return after bad experience',
                description: 'If your site is hard to use, they\'ll assume your project management is just as messy'
              }
            ].map((item, index) => {
              const itemIndex = index + 3; // Offset from previous items
              return (
                <div 
                  key={index}
                  ref={(el) => {
                    if (el && !itemRefs.current[itemIndex]) {
                      itemRefs.current[itemIndex] = el;
                    }
                  }}
                  data-item-index={itemIndex}
                  className={`bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group ${
                    visibleItems.includes(itemIndex)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-3">
                      {item.stat}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.label}</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Essential Web Design Features for Modern Contractors */}
        <section 
          data-section-id="features"
          ref={(el) => {
            if (el) sectionRefs.current.set('features', el);
          }}
          className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
            visibleSections.has('features') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Essential Web Design Features for</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Modern Contractors</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'High-Conversion Quote Request Systems',
                description: 'Interactive forms that allow homeowners to upload photos of their current space and select their budget range, delivering "warm" leads directly to your inbox 24/7.'
              },
              {
                title: 'Dynamic Project Portfolios',
                description: 'Filterable galleries categorized by "Kitchens," "Bathrooms," or "Additions." High-resolution "Before & After" sliders that prove your transformation capabilities and attention to detail.'
              },
              {
                title: 'Client Trust & Credibility Hub',
                description: 'Prominent display of WSIB compliance, liability insurance, specialized certifications, and "Best of Houzz" or "Homestars" awards to eliminate homeowner skepticism instantly.'
              },
              {
                title: 'The "Process" Roadmap',
                description: 'A dedicated section explaining your step-by-step workflow—from initial design to final walkthrough. Transparency on your process builds massive trust before the first meeting.'
              },
              {
                title: 'Local SEO & Neighborhood Targeting',
                description: 'Landing pages optimized for specific GTA pockets (e.g., "Luxury Kitchens in Unionville" or "Home Additions in Whitby") to ensure you show up when local homeowners search for pros.'
              },
              {
                title: 'Video Testimonials & Social Proof',
                description: 'Integration of video walkthroughs and client reviews. Nothing sells a $50k bathroom faster than a happy neighbor talking about how clean you kept the job site.'
              }
            ].map((feature, index) => {
              const itemIndex = index + 7; // Offset from previous items
              return (
                <div 
                  key={index}
                  ref={(el) => {
                    if (el && !itemRefs.current[itemIndex]) {
                      itemRefs.current[itemIndex] = el;
                    }
                  }}
                  data-item-index={itemIndex}
                  className={`bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group ${
                    visibleItems.includes(itemIndex)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-300/20 via-purple-300/20 to-cyan-300/20 border border-cyan-500/30 rounded-xl flex items-center justify-center flex-shrink-0 mb-4 sm:mb-6 group-hover:border-cyan-400/50 transition-all duration-300">
                      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: GTA Coverage */}
        <section 
          data-section-id="gta-coverage"
          ref={(el) => {
            if (el) sectionRefs.current.set('gta-coverage', el);
          }}
          className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
            visibleSections.has('gta-coverage') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
          id="gta-coverage"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Serving Renovation Companies Across the</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Greater Toronto Area</span>
          </h2>
          
          <p className="text-white/60 text-center mb-8 sm:mb-12 text-base sm:text-lg max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
            Zenara Designs specializes in serving renovation companies across the high-growth municipalities of the GTA. Whether you're based in Markham, Vaughan, Pickering, or any of our service areas, we implement a "Local Authority Engine" that ensures your company is the first choice for local homeowners.
          </p>

          {/* Location Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {locations.map((location, index) => {
              const itemIndex = index + 13; // Offset from previous items
              return (
                <div 
                  key={location.id} 
                  id={location.id}
                  ref={(el) => {
                    if (el && !itemRefs.current[itemIndex]) {
                      itemRefs.current[itemIndex] = el;
                    }
                  }}
                  data-item-index={itemIndex}
                  className={`scroll-mt-24 transition-all duration-500 ${
                    visibleItems.includes(itemIndex)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group h-full flex flex-col">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col h-full items-center text-center">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Renovation Website {location.city}</span>
                      </h3>
                      
                      <div className="mt-auto w-full">
                        <Link 
                          to={`/renovations/${location.id}`}
                          className="inline-flex items-center justify-center text-cyan-400 hover:text-purple-400 transition-colors text-xs sm:text-sm font-medium group/link w-full"
                        >
                          Learn More
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 6: Process */}
        <section 
          data-section-id="process"
          ref={(el) => {
            if (el) sectionRefs.current.set('process', el);
          }}
          className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
            visibleSections.has('process') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">A Streamlined</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Three-Step Transformation</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Design & Strategy',
                description: 'We work closely with your company to understand your brand, service areas, and client needs. Our team creates custom design mockups and a strategic plan that showcases your craftsmanship and builds homeowner trust. Every visual element is crafted to establish credibility and convert visitors.'
              },
              {
                step: '02',
                title: 'Implementation & Development',
                description: 'We bring your design to life with modern development practices, ensuring your website is fast, secure, and fully responsive. Your custom platform is built with attention to detail, optimized for performance, and ready to showcase your projects 24/7.'
              },
              {
                step: '03',
                title: 'Custom Features & Launch',
                description: 'We implement your specific requests and custom features tailored to your company\'s needs. From project portfolio galleries to quote request systems, we ensure everything works seamlessly. We also optimize for search rankings to help potential clients find you, then launch your professional website.'
              }
            ].map((phase, index) => {
              const itemIndex = index + 23; // Offset from previous items
              return (
                <div 
                  key={index}
                  ref={(el) => {
                    if (el && !itemRefs.current[itemIndex]) {
                      itemRefs.current[itemIndex] = el;
                    }
                  }}
                  data-item-index={itemIndex}
                  className={`bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group ${
                    visibleItems.includes(itemIndex)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-4">
                      {phase.step}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{phase.title}</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">{phase.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 7: FAQ */}
        <section 
          data-section-id="faq"
          ref={(el) => {
            if (el) sectionRefs.current.set('faq', el);
          }}
          className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
            visibleSections.has('faq') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-6 sm:mb-8 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="font-light opacity-90">Frequently Asked </span>
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Questions</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-slate-800/50 rounded-xl bg-slate-900/90 backdrop-blur-sm data-[state=open]:bg-gradient-to-r data-[state=open]:from-cyan-500/20 data-[state=open]:via-purple-500/20 data-[state=open]:to-cyan-500/20 data-[state=open]:border-cyan-500/50 transition-all duration-200 relative overflow-hidden min-h-[60px] sm:min-h-[70px] flex flex-col"
                >
                  {/* Gradient vertical bar on the left */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-300 via-purple-300 to-cyan-300 rounded-l-xl z-10"></div>
                  <AccordionTrigger 
                    className="px-4 sm:px-6 py-3 sm:py-4 hover:no-underline text-left data-[state=open]:text-white data-[state=closed]:text-white/80 relative overflow-hidden group w-full min-h-[60px] sm:min-h-[70px] flex items-center pl-5 sm:pl-7"
                  >
                    {/* Hover background animation - left to right */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-xl"></div>
                    <span className="font-light text-sm sm:text-base pr-4 flex-1 relative z-10 group-hover:text-white transition-colors duration-300">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 data-[state=closed]:text-white/60 data-[state=open]:text-white group-hover:text-white transition-all duration-200 relative z-10" />
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4 text-white/60 text-sm leading-[1.6] font-light tracking-[0.01em]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Section 8: CTA */}
        <section 
          data-section-id="cta"
          ref={(el) => {
            if (el) sectionRefs.current.set('cta', el);
          }}
          className={`transition-all duration-1000 ${
            visibleSections.has('cta') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
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
      
      {/* Structured Data */}
      <StructuredData 
        type="faq" 
        faqs={faqs}
      />
      
      {/* Breadcrumb Schema */}
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Renovation Company Web Design', url: '/renovations' }
        ]} 
      />
    </div>
  );
};

export default memo(Renovations);
