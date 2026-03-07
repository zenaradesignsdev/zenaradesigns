import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Calendar, Users, BookOpen, Award, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollToTop, useSEO, scrollToTop } from '@/hooks';
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import StructuredData from '@/components/StructuredData';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';
import { SafeImage } from '@/components/ui/safe-image';
import lawyerGavelOffice from '@/assets/lawyer-gavel-office.png';
import lawyerConsultationDocument from '@/assets/lawyer-consultation-document.png';
import lawyerProfessionalMeeting from '@/assets/lawyer-professional-meeting.png';

const Lawyers = () => {
  useScrollToTop();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  
  // SEO meta tags
  useSEO({
    title: "Law Firm Web Design GTA | Trust & Credibility | Zenara",
    description: "Professional web design for law firms in Markham, Vaughan, Pickering & across GTA. Build trust, showcase expertise, convert visitors. 78% research online first. Free consultation.",
    canonical: "https://zenaradesigns.com/lawyers",
    ogImage: "/assets/lawyer-gavel-office.png",
    twitterImage: "/assets/lawyer-gavel-office.png"
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
      description: 'Serving law firms in Markham\'s thriving business district, from Unionville to Downtown Markham. Specializing in corporate law, real estate law, and immigration law firm websites.',
      keywords: ['law firm web design Markham', 'lawyer website design Markham', 'legal website Markham']
    },
    {
      id: 'vaughan',
      city: 'Vaughan',
      description: 'Professional web design for Vaughan law firms, including Woodbridge, Thornhill, and Maple. Expertise in family law, personal injury, and commercial litigation websites.',
      keywords: ['law firm web design Vaughan', 'lawyer website design Vaughan', 'legal website Vaughan']
    },
    {
      id: 'pickering',
      city: 'Pickering',
      description: 'Custom legal websites for Pickering law firms. Serving criminal defense, real estate, and estate planning practices throughout the Durham Region.',
      keywords: ['law firm web design Pickering', 'lawyer website design Pickering', 'legal website Pickering']
    },
    {
      id: 'ajax',
      city: 'Ajax',
      description: 'Modern web solutions for Ajax law firms. Specializing in family law, immigration, and small business legal services websites.',
      keywords: ['law firm web design Ajax', 'lawyer website design Ajax', 'legal website Ajax']
    },
    {
      id: 'oshawa',
      city: 'Oshawa',
      description: 'Professional legal website design for Oshawa law firms. Serving personal injury, employment law, and criminal defense practices.',
      keywords: ['law firm web design Oshawa', 'lawyer website design Oshawa', 'legal website Oshawa']
    },
    {
      id: 'whitby',
      city: 'Whitby',
      description: 'Secure, compliant websites for Whitby law firms. Expertise in real estate law, wills and estates, and corporate law firm websites.',
      keywords: ['law firm web design Whitby', 'lawyer website design Whitby', 'legal website Whitby']
    },
    {
      id: 'richmond-hill',
      city: 'Richmond Hill',
      description: 'High-performance legal websites for Richmond Hill law firms. Specializing in immigration law, family law, and business law firm websites.',
      keywords: ['law firm web design Richmond Hill', 'lawyer website design Richmond Hill', 'legal website Richmond Hill']
    },
    {
      id: 'newmarket',
      city: 'Newmarket',
      description: 'Custom web design for Newmarket law firms. Serving personal injury, real estate, and estate planning practices.',
      keywords: ['law firm web design Newmarket', 'lawyer website design Newmarket', 'legal website Newmarket']
    },
    {
      id: 'aurora',
      city: 'Aurora',
      description: 'Professional legal website solutions for Aurora law firms. Expertise in family law, criminal defense, and corporate law websites.',
      keywords: ['law firm web design Aurora', 'lawyer website design Aurora', 'legal website Aurora']
    },
    {
      id: 'stouffville',
      city: 'Stouffville',
      description: 'Modern web design for Stouffville law firms. Specializing in real estate law, wills and estates, and small business legal services.',
      keywords: ['law firm web design Stouffville', 'lawyer website design Stouffville', 'legal website Stouffville']
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How much revenue do law firms lose from bad websites?",
      answer: "The average law firm loses $50,000 to $100,000+ annually in missed opportunities from poor web presence. This includes lost consultation requests, clients who choose competitors, reduced referral rates, and the 40-60% of potential clients who bounce from outdated or poorly designed sites. Firms with professional websites see 3x more consultation requests, making the ROI of professional web design clear."
    },
    {
      question: "Why is website design so important for trust and credibility?",
      answer: "Research shows that first impressions are formed in just 0.05 seconds, and 94% of those impressions are design-related. 75% of users judge a business's credibility based on website design. With 78% of people researching lawyers online (and 92% among younger demographics), your website is often the first interaction potential clients have with your firm. Professional design signals competence, attention to detail, and technological capability—all critical factors when clients are choosing between multiple law firms."
    },
    {
      question: "How much does a professional law firm website cost in Ontario?",
      answer: "A custom, professional website for an Ontario law firm typically ranges from $4,000 to $10,000, depending on features like consultation booking systems, practice area pages, case study sections, blog functionality, and attorney profile pages. Zenara Designs provides transparent, fixed-price proposals to ensure budgetary certainty for your practice."
    },
    {
      question: "How long does it take to build a lawyer's website?",
      answer: "A complete custom law firm website usually takes 5 to 8 weeks from initial discovery to launch. This timeline includes competitive analysis, custom design focused on trust and credibility, development of essential features, and SEO optimization to ensure your firm ranks for local searches."
    },
    {
      question: "What features are essential for a law firm website in 2026?",
      answer: "Essential features include consultation booking systems, SEO-optimized practice area showcase pages, case studies and success stories, legal blog and content marketing capabilities, attorney profiles and team pages, and client testimonials and reviews. These features build trust, demonstrate expertise, and convert visitors into consultations."
    },
    {
      question: "Do law firms in GTA suburbs need local SEO?",
      answer: "Absolutely. With 68% of users performing local searches before contacting a law firm, local SEO is critical for acquiring clients. Appearing in Google Map Pack for city-specific terms like 'Markham family lawyer' or 'Vaughan real estate attorney' is essential for capturing ready-to-consult prospects."
    },
    {
      question: "Can a new website help my law firm get more clients?",
      answer: "Yes. A professionally designed, SEO-optimized website functions as a 24/7 client acquisition engine. Law firms with authoritative content, clear practice area pages, case studies, and optimized call-to-action triggers see a 72% increase in consultation requests compared to firms with outdated digital presences. Professional websites also build trust and credibility, which are essential for converting visitors into clients."
    },
    {
      question: "Why is Next.js better than WordPress for a law firm?",
      answer: "For legal services, Next.js offers faster load times for better user experience, superior Core Web Vitals that Google rewards with higher rankings, and a more modern, professional foundation. Next.js provides better performance, which is critical for building trust and credibility with potential clients who expect fast, responsive websites."
    },
    {
      question: "Can I update my law firm website content myself?",
      answer: "Yes. Zenara Designs integrates an intuitive, no-code backend that allows your staff to easily update practice area descriptions, publish blog articles, manage attorney bios, add case studies, update testimonials, and modify consultation availability without technical expertise."
    }
  ];

  // Inject structured data
  useEffect(() => {
    const schemas = [
      generateLocalBusinessSchema(),
      generateServiceSchema(
        'Law Firm Web Design',
        'Professional web design and development services for law firms and legal practices across the Greater Toronto Area. Build trust, establish credibility, and convert visitors into consultations with modern, high-performing websites.'
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
        if (script.textContent?.includes('Law Firm Web Design')) {
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
      <div className="absolute inset-0 pointer-events-none">
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

      {/* Hero Section - Split Layout */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
          {/* Left Section - Text Content */}
          <div className="bg-slate-900/95 backdrop-blur-sm flex items-center py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16 border-r border-slate-800/50 pt-24 sm:pt-28 md:pt-32 lg:pt-40">
            <div className="w-full max-w-2xl mx-auto lg:mx-0">
              {/* Accent line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 mb-6"></div>
              
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-4 text-white leading-[1.1] tracking-[-0.04em]">
                <span className="font-light opacity-90">Law Firm Web Design</span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg sm:text-xl md:text-2xl mb-6 font-light">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Greater Toronto Area</span>
              </p>
              
              {/* Paragraph 1 */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-6 font-light tracking-[0.01em]">
                <span className="font-semibold text-cyan-300">78% of people</span> research lawyers online before contacting, and that number jumps to <span className="font-semibold text-cyan-300">92% among younger clients</span>. Your website is your first impression, your credibility signal, and your 24/7 client acquisition engine.
              </p>
              
              {/* Paragraph 2 */}
              <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 font-light tracking-[0.01em]">
                Professional web design that builds trust, showcases expertise, and converts visitors into consultations.
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
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <SafeImage 
                src={lawyerGavelOffice} 
                alt="Professional law firm web design services in Greater Toronto Area" 
                className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setHeroImageLoaded(true)}
                priority
              />
            </div>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 relative z-10">
        {/* Section 1: Modern Law Firm Transformation */}
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
                    The legal profession in Ontario is undergoing its most significant transformation in decades. <span className="text-cyan-300 font-semibold">78% of people now research lawyers online before making contact</span>, and that number rises to <span className="text-cyan-300 font-semibold">92% among millennials and Gen Z clients</span>. With law firms across the GTA serving diverse communities from Markham to Oshawa, your online presence has become your most critical business asset.
                  </p>
                  <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    Traditional client acquisition models are being disrupted by digital-first competitors. To thrive, your firm must pivot toward modern client engagement, becoming a trusted advisor accessible 24/7 rather than a traditional office-only practice. This transition requires a website that builds trust instantly, showcases your expertise clearly, and converts visitors into consultations.
                  </p>
                  <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    Firms that provide seamless digital experiences with professional, credible websites see rising client satisfaction and higher retention rates. However, your expertise is only as visible as your digital storefront. A Zenara-designed platform showcases your precision and professionalism, positioning your firm as a leader in the York and Durham legal communities.
                  </p>
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center">
                    <SafeImage 
                      src={lawyerGavelOffice}
                      alt="Professional lawyer in modern office setting"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
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
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  Your website is often the first interaction potential clients have with your firm. Research shows that <span className="text-cyan-300 font-semibold">first impressions are formed in just 0.05 seconds (50 milliseconds)</span>, and <span className="text-cyan-300 font-semibold">94% of those first impressions are design-related</span>. This means your website's visual design, layout, and user experience directly impact whether a potential client trusts your firm enough to pick up the phone.
                </p>
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  <span className="text-cyan-300 font-semibold">75% of users judge a business's credibility based on website design</span>. A professional, modern website signals competence, attention to detail, and technological capability. These are all critical factors when clients are choosing between multiple law firms.
                </p>
                <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  With <span className="text-cyan-300 font-semibold">78% of people researching lawyers online</span>, and <span className="text-cyan-300 font-semibold">over 90% among younger demographics</span>, your website isn't just a digital brochure. It's your firm's most powerful tool for building trust, establishing credibility, and leaving a lasting positive impression that converts browsers into clients.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <SafeImage 
                src={lawyerConsultationDocument}
                alt="Professional legal consultation and client meeting"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                stat: '78%',
                label: 'Research lawyers online before contacting',
                description: 'The majority of potential clients start their search online'
              },
              {
                stat: '92%',
                label: 'Of millennials & Gen Z research online',
                description: 'Nearly all younger clients research digitally first'
              },
              {
                stat: '0.05s',
                label: 'Time to form first impression',
                description: 'Trust and credibility are established instantly'
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
                src={lawyerProfessionalMeeting}
                alt="Law firm losing clients due to poor website design"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  Having no website, a template website, or a badly designed website is costing your law firm real money every single day. <span className="text-cyan-300 font-semibold">Law firms with outdated websites lose 40-60% of potential clients who bounce</span>. These are visitors who arrive, don't find what they need, and leave to find a competitor with a more professional online presence.
                </p>
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  The financial impact is staggering. <span className="text-cyan-300 font-semibold">The average law firm loses $50,000 to $100,000+ annually in missed opportunities</span> from poor web presence. This includes lost consultation requests, clients who choose competitors, and reduced referral rates.
                </p>
                <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  The opportunity cost is even higher. <span className="text-cyan-300 font-semibold">Firms with professional websites see 3x more consultation requests</span> compared to those with outdated or poorly designed sites. Every day your website fails to build trust and convert visitors is a day of lost revenue, missed growth opportunities, and clients choosing your competitors instead.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                stat: '$50K-$100K+',
                label: 'Annual revenue loss from poor web presence',
                description: 'Missed opportunities, lost consultations, and reduced referrals'
              },
              {
                stat: '40-60%',
                label: 'Potential clients lost to bounce rate',
                description: 'Visitors who leave due to poor design or user experience'
              },
              {
                stat: '3x',
                label: 'More consultation requests with professional sites',
                description: 'Firms with well-designed websites capture significantly more leads'
              },
              {
                stat: '88%',
                label: 'Won\'t return after bad experience',
                description: 'One bad impression means they\'re gone forever'
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

        {/* Section 4: Essential Web Design Features for Modern Law Firms */}
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
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Modern Law Firms</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Consultation Booking Systems',
                description: 'Automated scheduling tools that integrate with your calendar, reducing administrative time by 40% and capturing leads 24/7. Seamless booking experience that converts visitors into consultations.'
              },
              {
                title: 'Practice Area Showcase Pages',
                description: 'SEO-optimized dedicated pages for each practice area (family law, real estate, criminal defense, etc.) with clear navigation structure and conversion-focused design that educates and converts.'
              },
              {
                title: 'Case Studies & Success Stories',
                description: 'Showcase successful outcomes and build credibility through real results. Demonstrate your expertise with detailed case studies that highlight your firm\'s track record and client victories.'
              },
              {
                title: 'Legal Blog & Content Marketing',
                description: 'Attorney-written articles and SEO content strategy that positions your firm as a thought leader. Regular blog content improves search rankings and demonstrates expertise to potential clients.'
              },
              {
                title: 'Attorney Profiles & Team Pages',
                description: 'Professional bios and credentials display that build personal connections with potential clients. Showcase your team\'s expertise, education, and experience to build trust and rapport.'
              },
              {
                title: 'Client Testimonials & Reviews',
                description: 'Social proof integration and trust signals through client testimonials and review management. Build credibility by showcasing what your satisfied clients say about your firm.'
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
            <span className="block font-light opacity-90">Serving Law Firms Across the</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Greater Toronto Area</span>
          </h2>
          
          <p className="text-white/60 text-center mb-8 sm:mb-12 text-base sm:text-lg max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
            Zenara Designs specializes in serving law firms across the high-growth municipalities of the GTA. Whether you're based in Markham, Vaughan, Pickering, or any of our service areas, we implement a "Local Authority Engine" that ensures your firm is the first choice for local clients.
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
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Law Firm Website {location.city}</span>
                      </h3>
                      
                      <div className="mt-auto w-full">
                        <Link 
                          to={`/lawyers/${location.id}`}
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
                description: 'We work closely with your firm to understand your brand, practice areas, and client needs. Our team creates custom design mockups and a strategic plan that builds trust and showcases your expertise. Every visual element is crafted to establish credibility and convert visitors.'
              },
              {
                step: '02',
                title: 'Implementation & Development',
                description: 'We bring your design to life with modern development practices, ensuring your website is fast, secure, and fully responsive. Your custom platform is built with attention to detail, optimized for performance, and ready to serve your clients 24/7.'
              },
              {
                step: '03',
                title: 'Custom Features & Launch',
                description: 'We implement your specific requests and custom features tailored to your firm\'s needs. From consultation booking systems to practice area showcases, we ensure everything works seamlessly. We also optimize for search rankings to help potential clients find you, then launch your professional website.'
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
                Contact us today for a free consultation about your law firm's web design needs. We'll analyze your current site and provide a roadmap to digital excellence.
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
          { name: 'Law Firm Web Design', url: '/lawyers' }
        ]} 
      />
    </div>
  );
};

export default memo(Lawyers);
