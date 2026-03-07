import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollToTop, useSEO, scrollToTop } from '@/hooks';
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import StructuredData from '@/components/StructuredData';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';
import { SafeImage } from '@/components/ui/safe-image';
import accountantComputerOffice from '@/assets/accountant-computer-office.png';
import accountantWebsiteWork from '@/assets/accountant-website-work.png';
import accountantDocuments from '@/assets/accountant-documents.png';

const Accountants = () => {
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Accounting Firm Web Design GTA | CPA Websites | Zenara",
    description: "Professional web design for accounting firms in Markham, Vaughan, Pickering & across GTA. Secure, compliant platforms with client portals. Free consultation.",
    canonical: "https://zenaradesigns.com/accountants",
    ogImage: "/assets/accountant-computer-office.png",
    twitterImage: "/assets/accountant-computer-office.png"
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
      description: 'Serving accounting firms in Markham\'s thriving business district, from Unionville to Downtown Markham. Specializing in corporate tax, bookkeeping, and small business accounting firm websites.',
      keywords: ['accounting firm web design Markham', 'CPA website design Markham', 'accounting website Markham']
    },
    {
      id: 'vaughan',
      city: 'Vaughan',
      description: 'Professional web design for Vaughan accounting firms, including Woodbridge, Thornhill, and Maple. Expertise in tax preparation, financial planning, and business advisory websites.',
      keywords: ['accounting firm web design Vaughan', 'CPA website design Vaughan', 'accounting website Vaughan']
    },
    {
      id: 'pickering',
      city: 'Pickering',
      description: 'Custom accounting websites for Pickering firms. Serving tax preparation, bookkeeping, and payroll services throughout the Durham Region.',
      keywords: ['accounting firm web design Pickering', 'CPA website design Pickering', 'accounting website Pickering']
    },
    {
      id: 'ajax',
      city: 'Ajax',
      description: 'Modern web solutions for Ajax accounting firms. Specializing in small business accounting, tax services, and financial advisory websites.',
      keywords: ['accounting firm web design Ajax', 'CPA website design Ajax', 'accounting website Ajax']
    },
    {
      id: 'oshawa',
      city: 'Oshawa',
      description: 'Professional accounting website design for Oshawa firms. Serving corporate tax, bookkeeping, and business advisory practices.',
      keywords: ['accounting firm web design Oshawa', 'CPA website design Oshawa', 'accounting website Oshawa']
    },
    {
      id: 'whitby',
      city: 'Whitby',
      description: 'Secure, compliant websites for Whitby accounting firms. Expertise in tax preparation, financial planning, and small business accounting websites.',
      keywords: ['accounting firm web design Whitby', 'CPA website design Whitby', 'accounting website Whitby']
    },
    {
      id: 'richmond-hill',
      city: 'Richmond Hill',
      description: 'High-performance accounting websites for Richmond Hill firms. Specializing in corporate tax, bookkeeping, and financial advisory services.',
      keywords: ['accounting firm web design Richmond Hill', 'CPA website design Richmond Hill', 'accounting website Richmond Hill']
    },
    {
      id: 'newmarket',
      city: 'Newmarket',
      description: 'Custom web design for Newmarket accounting firms. Serving tax preparation, bookkeeping, and small business accounting practices.',
      keywords: ['accounting firm web design Newmarket', 'CPA website design Newmarket', 'accounting website Newmarket']
    },
    {
      id: 'aurora',
      city: 'Aurora',
      description: 'Professional accounting website solutions for Aurora firms. Expertise in tax services, financial planning, and business advisory websites.',
      keywords: ['accounting firm web design Aurora', 'CPA website design Aurora', 'accounting website Aurora']
    },
    {
      id: 'stouffville',
      city: 'Stouffville',
      description: 'Modern web design for Stouffville accounting firms. Specializing in small business accounting, tax preparation, and bookkeeping services.',
      keywords: ['accounting firm web design Stouffville', 'CPA website design Stouffville', 'accounting website Stouffville']
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How much revenue do accounting firms lose from bad websites?",
      answer: "The average mid-sized accounting firm loses $50,000 to $100,000+ annually in missed opportunity costs from a poor web presence. This includes lost advisory discovery calls, high-net-worth clients who choose competitors, reduced referral conversion rates, and the 40-60% of potential clients who bounce from outdated or poorly designed sites. Firms with professional websites see 3x more consultation requests, making the ROI of professional web design clear."
    },
    {
      question: "Why is website design so important for accounting firm trust and credibility?",
      answer: "When dealing with people's money and business finances, trust is everything. Research shows that first impressions are formed in just 0.05 seconds, and 94% of those impressions are design-related. 75% of users judge a business's credibility based on website design. With 74% of business owners researching accounting firms online (and 89% among millennial and Gen Z entrepreneurs), your website is often the first interaction potential clients have with your firm. Professional design signals competence, attention to detail, and modern data-security capabilities."
    },
    {
      question: "How much does a professional accounting firm website cost in Ontario?",
      answer: "A custom, professional website for an Ontario accounting firm typically ranges from $4,000 to $10,000, depending on features like client portals, tax document management systems, service area pages, blog functionality, and CPA profile pages. Zenara Designs provides transparent, fixed-price proposals to ensure budgetary certainty for your practice."
    },
    {
      question: "How long does it take to build an accounting firm's website?",
      answer: "A complete custom accounting firm website usually takes 5 to 8 weeks from initial discovery to launch. This timeline includes competitive analysis, custom design focused on trust and security, development of essential features like client portals, and SEO optimization to ensure your firm ranks for local searches."
    },
    {
      question: "What features are essential for an accounting firm website in 2026?",
      answer: "Essential features include discovery and consultation booking systems, SEO-optimized service area showcase pages, ROI case studies and success stories, financial blog and tax updates, CPA profiles and team pages, and client testimonials with trust signals. These features build trust, demonstrate expertise, and convert visitors into advisory consultations."
    },
    {
      question: "Do accounting firms in GTA suburbs need local SEO?",
      answer: "Absolutely. With the majority of business owners performing local searches before contacting an accounting firm, local SEO is critical for acquiring clients. Appearing in Google Map Pack for city-specific terms like 'Markham CPA' or 'Vaughan tax preparation' is essential for capturing ready-to-consult prospects."
    },
    {
      question: "Can a new website help my accounting firm get more clients?",
      answer: "Yes. A professionally designed, SEO-optimized website functions as a 24/7 client acquisition engine. Accounting firms with authoritative content, clear service area pages, case studies, and optimized call-to-action triggers see a significant increase in consultation requests compared to firms with outdated digital presences. Professional websites also build trust and credibility, which are essential for converting visitors into long-term clients."
    }
  ];

  // Inject structured data
  useEffect(() => {
    const schemas = [
      generateLocalBusinessSchema(),
      generateServiceSchema(
        'Accounting Firm Web Design',
        'Professional web design and development services for accounting firms and CPA practices across the Greater Toronto Area. Secure, compliant platforms with client portals and tax document management.'
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
        if (script.textContent?.includes('Accounting Firm Web Design')) {
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
                <span className="font-light opacity-90">Accounting Firm Web Design</span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg sm:text-xl md:text-2xl mb-6 font-light">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Greater Toronto Area</span>
              </p>
              
              {/* Paragraph 1 */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-6 font-light tracking-[0.01em]">
                <span className="font-semibold text-cyan-300">74% of business owners and individuals</span> research accounting firms online before making contact, and that number jumps to <span className="font-semibold text-cyan-300">89% among millennial and Gen Z entrepreneurs</span>. Your website is your first impression, your credibility signal, and your 24/7 client acquisition engine.
              </p>
              
              {/* Paragraph 2 */}
              <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 font-light tracking-[0.01em]">
                Professional web design that builds trust, showcases financial expertise, and converts visitors into advisory consultations.
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
                      <span className="relative z-10">Get A Quote</span>
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
              <SafeImage 
                src={accountantComputerOffice} 
                alt="Professional accounting firm web design services in Greater Toronto Area" 
                className="w-full h-full object-cover"
                priority
              />
            </div>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 relative z-10">
        {/* Section 1: From Traditional Practice to Digital-First Client Acquisition */}
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
                <span className="block font-light opacity-90">From Traditional Practice to</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Digital-First Client Acquisition</span>
              </h2>
              
              {/* Content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    The accounting and financial services sector in Ontario is undergoing its most significant transformation in decades. <span className="text-cyan-300 font-semibold">74% of prospective clients now research CPAs and accounting firms online before reaching out</span>, and that number rises to <span className="text-cyan-300 font-semibold">89% among younger business owners</span>. With accounting firms across the GTA serving diverse enterprises from Markham to Oshawa, your online presence has become your most critical business asset.
                  </p>
                  <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    Traditional, referral-only client acquisition models are being disrupted by digital-first competitors. To thrive, your firm must pivot toward modern client engagement, transitioning from a tax-season-only practice to a proactive, trusted financial advisor accessible year-round. This transition requires a website that builds trust instantly, clearly communicates complex financial services, and securely converts visitors into consultation bookings.
                  </p>
                  <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    Firms that provide seamless digital experiences with professional, credible websites see rising client satisfaction and higher retention rates. However, your expertise is only as visible as your digital storefront. A Zenara-designed platform showcases your precision and professionalism, positioning your firm as a leader in the York and Durham financial communities.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <SafeImage 
                    src={accountantWebsiteWork}
                    alt="Professional accounting firm digital transformation"
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Digital First Impression */}
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
            <span className="block font-light opacity-90">The Digital First Impression</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Trust is Built in 0.05 Seconds</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
            <div className="flex items-center justify-center order-2 lg:order-1">
              <SafeImage 
                src={accountantDocuments}
                alt="Professional accounting documents and financial trust"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  When dealing with people's money and business finances, trust is everything. Your website is often the first interaction potential clients have with your firm. Research shows that <span className="text-cyan-300 font-semibold">first impressions are formed in just 0.05 seconds (50 milliseconds)</span>, and <span className="text-cyan-300 font-semibold">94% of those first impressions are design-related</span>. This means your website's visual design, layout, and user experience directly impact whether a potential client trusts your firm enough to hand over their financial data.
                </p>
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  <span className="text-cyan-300 font-semibold">75% of users judge a business's credibility based on website design</span>. A professional, modern website signals competence, attention to detail, and modern data-security capabilities. These are all critical factors when business owners are choosing between multiple accounting firms.
                </p>
                <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  With the vast majority of people researching financial professionals online, your website isn't just a digital brochure. It's your firm's most powerful tool for building trust, establishing authority, and leaving a lasting positive impression that converts browsers into long-term clients.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                stat: '74%',
                label: 'Research accountants online before contacting',
                description: 'The majority of potential clients and businesses start their search online'
              },
              {
                stat: '89%',
                label: 'Of millennial & Gen Z business owners research digitally',
                description: 'The next generation of enterprise clients expects a flawless digital experience'
              },
              {
                stat: '0.05s',
                label: 'Time to form a first impression',
                description: 'Trust and financial credibility are established instantly'
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
              <SafeImage 
                src={accountantDocuments}
                alt="Accounting firm losing clients due to poor website design"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  Having no website, an outdated template, or a poorly designed site is costing your accounting firm real money every single day. <span className="text-cyan-300 font-semibold">Firms with outdated websites lose 40-60% of potential clients to bounce rates</span>. These are business owners who arrive, don't feel their financial data would be secure, and leave to find a competitor with a more professional online presence.
                </p>
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  The financial impact is staggering. <span className="text-cyan-300 font-semibold">The average mid-sized accounting firm loses $50,000 to $100,000+ annually in missed opportunity costs</span> from a poor web presence. This includes lost advisory discovery calls, high-net-worth clients who choose competitors, and reduced referral conversion rates.
                </p>
                <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  The opportunity cost is even higher. <span className="text-cyan-300 font-semibold">Firms with professional websites see 3x more consultation requests</span> compared to those with outdated sites. Every day your website fails to build trust is a day of lost recurring revenue, missed corporate tax clients, and lost advisory growth.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                stat: '$50K-$100K+',
                label: 'Annual revenue loss',
                description: 'Missed opportunities, lost advisory clients, and reduced referral conversions'
              },
              {
                stat: '40-60%',
                label: 'Potential clients lost to bounce rate',
                description: 'Visitors who leave due to poor design, slow loading, or lack of clear messaging'
              },
              {
                stat: '3x',
                label: 'More consultation requests',
                description: 'Firms with well-designed websites capture significantly more high-value leads'
              },
              {
                stat: '88%',
                label: 'Won\'t return after bad experience',
                description: 'One bad impression means that prospective client is gone forever'
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

        {/* Section 4: Essential Web Design Features for Modern Accounting Firms */}
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
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Modern Accounting Firms</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Discovery & Consultation Booking Systems',
                description: 'Automated scheduling tools that integrate with your calendar and tax software workflows, reducing administrative time by 40% and capturing leads 24/7. A seamless booking experience for tax planning or advisory calls.'
              },
              {
                title: 'Service Area Showcase Pages',
                description: 'SEO-optimized dedicated pages for each service area (Corporate Tax, Audit & Assurance, Virtual CFO, Bookkeeping, etc.) with a clear navigation structure that educates business owners and converts.'
              },
              {
                title: 'ROI Case Studies & Success Stories',
                description: 'Showcase successful financial outcomes and build credibility. Demonstrate your expertise with detailed case studies highlighting tax savings, successful audits, or business growth enabled by your advisory services.'
              },
              {
                title: 'Financial Blog & Tax Updates',
                description: 'CPA-written articles and an SEO content strategy that positions your firm as a thought leader. Regular content on CRA regulations, tax deadlines, and financial tips improves search rankings and builds authority.'
              },
              {
                title: 'CPA Profiles & Team Pages',
                description: 'Professional bios and credential displays (CPA, CA, CMA) that build personal connections. Showcase your team\'s expertise, education, and industry experience to build rapport before the first meeting.'
              },
              {
                title: 'Client Testimonials & Trust Signals',
                description: 'Social proof integration and trust signals through client testimonials, security badges, and professional associations. Build credibility by showcasing what satisfied business owners say about your firm.'
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
            <span className="block font-light opacity-90">Serving Accounting Firms Across the</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Greater Toronto Area</span>
          </h2>
          
          <p className="text-white/60 text-center mb-8 sm:mb-12 text-base sm:text-lg max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
            Zenara Designs specializes in serving accounting firms across the high-growth municipalities of the GTA. Whether you're based in Markham, Vaughan, Pickering, or any of our service areas, we implement a "Local Authority Engine" that ensures your firm is the first choice for local clients.
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
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Accounting Firm Website {location.city}</span>
                      </h3>
                      
                      <div className="mt-auto w-full">
                        <Link 
                          to={`/accountants/${location.id}`}
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
                description: 'We work closely with your firm to understand your brand, service areas, and client needs. Our team creates custom design mockups and a strategic plan that builds trust and showcases your financial expertise. Every visual element is crafted to establish credibility and convert visitors.'
              },
              {
                step: '02',
                title: 'Implementation & Development',
                description: 'We bring your design to life with modern development practices, ensuring your website is fast, secure, and fully responsive. Your custom platform is built with attention to detail, optimized for performance, and ready to serve your clients 24/7.'
              },
              {
                step: '03',
                title: 'Custom Features & Launch',
                description: 'We implement your specific requests and custom features tailored to your firm\'s needs. From client portals to service area showcases, we ensure everything works seamlessly. We also optimize for search rankings to help potential clients find you, then launch your professional website.'
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
                Contact us today for a free consultation about your accounting firm's web design needs. We'll analyze your current site and provide a roadmap to digital excellence.
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
          { name: 'Accounting Firm Web Design', url: '/accountants' }
        ]} 
      />
    </div>
  );
};

export default memo(Accountants);
