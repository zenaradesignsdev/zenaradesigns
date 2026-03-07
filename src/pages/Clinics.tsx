import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollToTop, useSEO, scrollToTop } from '@/hooks';
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import StructuredData from '@/components/StructuredData';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';
import { SafeImage } from '@/components/ui/safe-image';
import clinicPractitioner from '@/assets/clinic-practitioner.png';
import clinicWellnessCare from '@/assets/clinic-wellness-care.png';
import clinicPhysioTreatment from '@/assets/clinic-physio-treatment.png';

const Clinics = () => {
  useScrollToTop();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  
  // SEO meta tags
  useSEO({
    title: "Wellness Clinic Web Design GTA | Health & Wellness Websites | Zenara",
    description: "Professional web design for wellness clinics in Markham, Vaughan, Pickering & across GTA. Modern platforms for massage therapy, chiropractic, physiotherapy, and holistic health. Free consultation.",
    canonical: "https://zenaradesigns.com/clinics",
    ogImage: "/assets/clinic-practitioner.png",
    twitterImage: "/assets/clinic-practitioner.png"
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
      description: 'Serving wellness clinics in Markham\'s thriving healthcare district, from Unionville to Downtown Markham. Specializing in physiotherapy, chiropractic, massage therapy, and holistic health clinic websites.',
      keywords: ['wellness clinic web design Markham', 'physiotherapy website design Markham', 'clinic website Markham']
    },
    {
      id: 'vaughan',
      city: 'Vaughan',
      description: 'Professional web design for Vaughan wellness clinics, including Woodbridge, Thornhill, and Maple. Expertise in massage therapy, chiropractic, physiotherapy, and multidisciplinary clinic websites.',
      keywords: ['wellness clinic web design Vaughan', 'physiotherapy website design Vaughan', 'clinic website Vaughan']
    },
    {
      id: 'pickering',
      city: 'Pickering',
      description: 'Custom wellness clinic websites for Pickering practices. Serving physiotherapy, massage therapy, and chiropractic clinics throughout the Durham Region.',
      keywords: ['wellness clinic web design Pickering', 'physiotherapy website design Pickering', 'clinic website Pickering']
    },
    {
      id: 'ajax',
      city: 'Ajax',
      description: 'Modern web solutions for Ajax wellness clinics. Specializing in physiotherapy, massage therapy, and holistic health clinic websites.',
      keywords: ['wellness clinic web design Ajax', 'physiotherapy website design Ajax', 'clinic website Ajax']
    },
    {
      id: 'oshawa',
      city: 'Oshawa',
      description: 'Professional wellness clinic website design for Oshawa practices. Serving physiotherapy, chiropractic, and massage therapy clinics.',
      keywords: ['wellness clinic web design Oshawa', 'physiotherapy website design Oshawa', 'clinic website Oshawa']
    },
    {
      id: 'whitby',
      city: 'Whitby',
      description: 'Secure, compliant websites for Whitby wellness clinics. Expertise in physiotherapy, massage therapy, and chiropractic clinic websites.',
      keywords: ['wellness clinic web design Whitby', 'physiotherapy website design Whitby', 'clinic website Whitby']
    },
    {
      id: 'richmond-hill',
      city: 'Richmond Hill',
      description: 'High-performance wellness clinic websites for Richmond Hill practices. Specializing in multidisciplinary clinics, physiotherapy, and massage therapy websites.',
      keywords: ['wellness clinic web design Richmond Hill', 'physiotherapy website design Richmond Hill', 'clinic website Richmond Hill']
    },
    {
      id: 'newmarket',
      city: 'Newmarket',
      description: 'Custom web design for Newmarket wellness clinics. Serving physiotherapy, massage therapy, and chiropractic practices.',
      keywords: ['wellness clinic web design Newmarket', 'physiotherapy website design Newmarket', 'clinic website Newmarket']
    },
    {
      id: 'aurora',
      city: 'Aurora',
      description: 'Professional wellness clinic website solutions for Aurora practices. Expertise in physiotherapy, massage therapy, and holistic health clinic websites.',
      keywords: ['wellness clinic web design Aurora', 'physiotherapy website design Aurora', 'clinic website Aurora']
    },
    {
      id: 'stouffville',
      city: 'Stouffville',
      description: 'Modern web design for Stouffville wellness clinics. Specializing in physiotherapy, massage therapy, and chiropractic clinic websites.',
      keywords: ['wellness clinic web design Stouffville', 'physiotherapy website design Stouffville', 'clinic website Stouffville']
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How much revenue do wellness clinics lose from bad websites?",
      answer: "The average multidisciplinary clinic loses $40,000 to $80,000+ annually in missed patient revenue due to a poor web presence. This includes lost initial assessments, reduced retention from patients who can't easily re-book, and a high bounce rate on your service pages. Healthcare sites with poor mobile optimization lose 40-60% of potential patients. Clinics with professional, integrated booking sites see 3x more appointment requests compared to those using static 'contact us' forms."
    },
    {
      question: "Why is website design so important for wellness clinic trust and credibility?",
      answer: "In healthcare, the stakes are higher. Patients aren't just looking for a service; they are looking for a provider they can trust with their physical well-being. Research shows that first impressions are formed in just 0.05 seconds, and 94% of those impressions are design-related. 75% of users judge a clinic's credibility based on website design. If your website looks neglected, patients subconsciously assume your clinic's hygiene or technology might be as well. A clean, modern, and accessible website signals that you are organized, professional, and up-to-date with modern health practices."
    },
    {
      question: "How much does a professional wellness clinic website cost in Ontario?",
      answer: "A custom, professional website for an Ontario wellness clinic typically ranges from $4,000 to $10,000, depending on features like booking integration (Jane App, Gorendezvous, Cliniko), practitioner bio pages, condition-specific SEO pages, HIPAA/PHIPA compliant forms, and patient education content. Zenara Designs provides transparent, fixed-price proposals to ensure budgetary certainty for your practice."
    },
    {
      question: "How long does it take to build a wellness clinic's website?",
      answer: "A complete custom wellness clinic website usually takes 5 to 8 weeks from initial discovery to launch. This timeline includes competitive analysis, custom design focused on clinical authority and patient trust, development of essential features like booking integration, and SEO optimization to ensure your clinic ranks for local searches."
    },
    {
      question: "What features are essential for a wellness clinic website in 2026?",
      answer: "Essential features include seamless booking integration with platforms like Jane App or Gorendezvous, practitioner portfolios and bios, condition-specific SEO pages, HIPAA/PHIPA compliant lead forms, 'Near Me' local SEO engine, and patient education and video content. These features build trust, establish clinical authority, and convert visitors into confirmed appointments."
    },
    {
      question: "Do wellness clinics in GTA suburbs need local SEO?",
      answer: "Absolutely. With 77% of patients using search engines to find a healthcare provider before booking, local SEO is critical for acquiring patients. Appearing in Google Map Pack for city-specific terms like 'Markham physiotherapy' or 'Vaughan massage therapy' is essential for capturing ready-to-book patients searching for wellness services."
    },
    {
      question: "Can a new website help my wellness clinic get more patients?",
      answer: "Yes. A professionally designed, SEO-optimized website functions as a 24/7 patient intake system. Wellness clinics with seamless booking integration, condition-specific SEO pages, practitioner bios, and optimized call-to-action triggers see a significant increase in appointment requests compared to clinics with outdated digital presences. Professional websites also build trust and credibility, which are essential for converting health-conscious browsers into confirmed appointments."
    }
  ];

  // Inject structured data
  useEffect(() => {
    const schemas = [
      generateLocalBusinessSchema(),
      generateServiceSchema(
        'Wellness Clinic Web Design',
        'Professional web design and development services for wellness clinics, massage therapy, chiropractic, physiotherapy, and holistic health practices across the Greater Toronto Area. Modern platforms that build trust and convert visitors into appointments.'
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
        if (script.textContent?.includes('Wellness Clinic Web Design')) {
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
                <span className="font-light opacity-90">Wellness Clinic Web Design</span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg sm:text-xl md:text-2xl mb-6 font-light">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Greater Toronto Area</span>
              </p>
              
              {/* Paragraph 1 */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-6 font-light tracking-[0.01em]">
                <span className="font-semibold text-cyan-300">77% of patients</span> use search engines to find a healthcare provider before booking, and <span className="font-semibold text-cyan-300">90% of younger patients (Millennials and Gen Z)</span> prioritize clinics that offer seamless online booking. Your website is your digital waiting room, your practitioner's resume, and your 24/7 patient intake system.
              </p>
              
              {/* Paragraph 2 */}
              <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 font-light tracking-[0.01em]">
                Professional web design that establishes clinical authority, prioritizes patient experience, and converts health-conscious browsers into confirmed appointments.
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
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <SafeImage 
                src={clinicPractitioner} 
                alt="Professional wellness clinic web design services in Greater Toronto Area" 
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
        {/* Section 1: From Referral-Based to Digital-First Patient Care */}
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
                <span className="block font-light opacity-90">From Referral-Based to</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Digital-First Patient Care</span>
              </h2>
              
              {/* Content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    The healthcare and wellness industry in Ontario is shifting toward a "convenience-first" model. While word-of-mouth remains important, <span className="text-cyan-300 font-semibold">77% of GTA patients now vet their therapists online before ever stepping foot in a clinic</span>. Whether you are a multidisciplinary clinic in Markham or a boutique RMT studio in Oshawa, your digital presence is often the deciding factor in a patient's recovery journey.
                  </p>
                  <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    Traditional clinics that rely solely on foot traffic or phone-in bookings are losing ground to modern, digital-forward practices. To grow, your clinic must offer a frictionless experience—becoming a trusted health resource that is accessible 24/7. This transition requires a website that balances clinical professionalism with a calming user experience, making it effortless for patients in pain to find relief.
                  </p>
                  <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                    Clinics that provide high-speed, mobile-optimized digital experiences see significantly lower "no-show" rates and higher patient lifetime value. Your clinical expertise is only as visible as your digital front door. A Zenara-designed platform showcases your care and precision, positioning your clinic as the premier health destination in the York and Durham regions.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <SafeImage 
                    src={clinicWellnessCare}
                    alt="Professional wellness clinic digital transformation"
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
                src={clinicPhysioTreatment}
                alt="Professional wellness clinic trust and credibility"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  In healthcare, the stakes are higher. Patients aren't just looking for a service; they are looking for a provider they can trust with their physical well-being. Research shows that <span className="text-cyan-300 font-semibold">first impressions are formed in just 0.05 seconds</span>, and <span className="text-cyan-300 font-semibold">94% of those impressions are design-related</span>. If your website looks neglected, patients subconsciously assume your clinic's hygiene or technology might be as well.
                </p>
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  <span className="text-cyan-300 font-semibold">75% of users judge a clinic's credibility based on website design</span>. A clean, modern, and accessible website signals that you are organized, professional, and up-to-date with modern health practices. In a landscape where patients have dozens of options for "Physio near me," your digital "bedside manner" starts the moment the page loads.
                </p>
                <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  With the vast majority of patients starting their search on a smartphone, your website isn't just a list of services. It's the tool that convinces a patient that your clinic is the safest and most professional environment for their rehabilitation.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                stat: '77%',
                label: 'Search online before booking',
                description: 'Patients research their symptoms and then look for the highest-rated local expert'
              },
              {
                stat: '90%',
                label: 'Younger patients prefer online booking',
                description: 'If they have to call your front desk to find an opening, they will likely choose a competitor'
              },
              {
                stat: '0.05s',
                label: 'Time to form a first impression',
                description: 'You have a fraction of a second to prove your clinic is professional and trustworthy'
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
                src={clinicPhysioTreatment}
                alt="Wellness clinic losing patients due to poor website design"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  Having a slow, outdated, or "broken" website is costing your wellness clinic new patient files every single day. <span className="text-cyan-300 font-semibold">Healthcare sites with poor mobile optimization lose 40-60% of potential patients</span>. When a patient is in acute pain, they won't struggle with a clunky menu; they will simply move to the next clinic in the search results.
                </p>
                <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  The financial impact of a "leaky" patient funnel is significant. <span className="text-cyan-300 font-semibold">The average multidisciplinary clinic loses $40,000 to $80,000+ annually in missed patient revenue</span> due to a poor web presence. This includes lost initial assessments, reduced retention from patients who can't easily re-book, and a high bounce rate on your service pages.
                </p>
                <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  The opportunity cost is even higher. <span className="text-cyan-300 font-semibold">Firms with professional, integrated booking sites see 3x more appointment requests</span> compared to those using static "contact us" forms. Every day your site remains outdated is a day you lose high-value, long-term patients to the clinic across the street.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                stat: '$40K-$80K+',
                label: 'Annual revenue loss',
                description: 'One or two missed new patients a week adds up to a massive deficit in annual billings'
              },
              {
                stat: '40-60%',
                label: 'Patients lost to bounce rate',
                description: 'Visitors leave when they can\'t find your hours, location, or "Book Now" button instantly'
              },
              {
                stat: '3x',
                label: 'More appointment requests',
                description: 'Modern designs that integrate with software like Jane or Mindbody capture significantly more leads'
              },
              {
                stat: '88%',
                label: 'Won\'t return after bad experience',
                description: 'A frustrating digital experience creates a negative association with your clinical care'
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

        {/* Section 4: Essential Web Design Features for Modern Clinics */}
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
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Modern Clinics</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Seamless Booking Integration',
                description: 'Direct API integration with platforms like Jane App, Gorendezvous, or Cliniko. We ensure the booking process is embedded and on-brand, not a jarring redirect to a third-party site.'
              },
              {
                title: 'Practitioner Portfolios & Bios',
                description: 'Patients book people, not just clinics. We create professional bio pages that highlight your team\'s certifications, specialties, and personality to build a pre-session connection.'
              },
              {
                title: 'Condition-Specific SEO Pages',
                description: 'Dedicated, high-ranking pages for specific ailments (e.g., "Sciatica Treatment in Vaughan" or "Pelvic Health Physio in Ajax"). This educates the patient and proves your specialized expertise.'
              },
              {
                title: 'HIPAA/PHIPA Compliant Lead Forms',
                description: 'Secure, encrypted contact forms and intake portals that ensure patient privacy and data security are prioritized from the very first click.'
              },
              {
                title: '"Near Me" Local SEO Engine',
                description: 'Optimization for hyper-local search terms. We ensure your clinic appears in the "Map Pack" when local residents search for massage, chiro, or physio services in their neighborhood.'
              },
              {
                title: 'Patient Education & Video Content',
                description: 'Integration for exercise video libraries or a health blog. Providing value before the first visit positions your clinic as a leading authority in the GTA wellness community.'
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
            <span className="block font-light opacity-90">Serving Wellness Clinics Across the</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Greater Toronto Area</span>
          </h2>
          
          <p className="text-white/60 text-center mb-8 sm:mb-12 text-base sm:text-lg max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
            Zenara Designs specializes in serving wellness clinics across the high-growth municipalities of the GTA. Whether you're based in Markham, Vaughan, Pickering, or any of our service areas, we implement a "Local Authority Engine" that ensures your clinic is the first choice for local patients.
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
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Wellness Clinic Website {location.city}</span>
                      </h3>
                      
                      <div className="mt-auto w-full">
                        <Link 
                          to={`/clinics/${location.id}`}
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
                description: 'We work closely with your clinic to understand your brand, services, and patient needs. Our team creates custom design mockups and a strategic plan that establishes clinical authority and builds patient trust. Every visual element is crafted to convey professionalism and care.'
              },
              {
                step: '02',
                title: 'Implementation & Development',
                description: 'We bring your design to life with modern development practices, ensuring your website is fast, secure, and fully responsive. Your custom platform is built with attention to detail, optimized for performance, and ready to serve your patients 24/7.'
              },
              {
                step: '03',
                title: 'Custom Features & Launch',
                description: 'We implement your specific requests and custom features tailored to your clinic\'s needs. From booking integration to practitioner bios, we ensure everything works seamlessly. We also optimize for search rankings to help potential patients find you, then launch your professional website.'
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
                Contact us today for a free consultation about your wellness clinic's web design needs. We'll analyze your current site and provide a roadmap to digital excellence.
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
          { name: 'Wellness Clinic Web Design', url: '/clinics' }
        ]} 
      />
    </div>
  );
};

export default memo(Clinics);
