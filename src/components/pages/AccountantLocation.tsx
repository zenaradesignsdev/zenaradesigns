'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToTop } from '@/hooks';
import { memo, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import StructuredData from '@/components/StructuredData';
import { generateLocalBusinessSchema } from '@/lib/structured-data';
import { SafeImage } from '@/components/ui/safe-image';
import { accountantLocationContent } from '@/lib/location-content';
const accountantComputerOffice = '/images/accountant-computer-office.png';
import NotFound from './NotFound';

// GTA Locations data - matches Accountants.tsx
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
  },
  {
    id: 'toronto',
    city: 'Toronto',
    description: 'Premier web design for Toronto accounting firms in the financial district, midtown, and downtown core. Expertise in corporate tax, audit and assurance, and advisory services websites.',
    keywords: ['accounting firm web design Toronto', 'CPA website design Toronto', 'accounting website Toronto']
  },
  {
    id: 'mississauga',
    city: 'Mississauga',
    description: 'Professional web design for Mississauga accounting firms, from Square One to Port Credit and Meadowvale. Specializing in small business accounting, tax planning, and payroll services websites.',
    keywords: ['accounting firm web design Mississauga', 'CPA website design Mississauga', 'accounting website Mississauga']
  },
  {
    id: 'brampton',
    city: 'Brampton',
    description: 'Custom accounting websites for Brampton firms serving Bramalea, Springdale, and downtown Brampton. Expertise in tax preparation, bookkeeping, and business advisory websites.',
    keywords: ['accounting firm web design Brampton', 'CPA website design Brampton', 'accounting website Brampton']
  },
  {
    id: 'oakville',
    city: 'Oakville',
    description: 'Premium web design for Oakville accounting firms in Bronte, Glen Abbey, and downtown Oakville. Specializing in wealth management, estate planning, and corporate tax websites.',
    keywords: ['accounting firm web design Oakville', 'CPA website design Oakville', 'accounting website Oakville']
  },
  {
    id: 'burlington',
    city: 'Burlington',
    description: 'Professional accounting website design for Burlington firms. Serving tax preparation, financial planning, and small business accounting practices throughout the Halton Region.',
    keywords: ['accounting firm web design Burlington', 'CPA website design Burlington', 'accounting website Burlington']
  },
  {
    id: 'hamilton',
    city: 'Hamilton',
    description: 'High-performance web design for Hamilton accounting firms in the downtown core, Westdale, and across the Hamilton-Wentworth region. Expertise in corporate tax, audit services, and forensic accounting websites.',
    keywords: ['accounting firm web design Hamilton', 'CPA website design Hamilton', 'accounting website Hamilton']
  },
  {
    id: 'scarborough',
    city: 'Scarborough',
    description: 'Custom web design for Scarborough accounting firms serving the Scarborough Town Centre, Agincourt, and Malvern communities. Specializing in personal tax, small business bookkeeping, and payroll services websites.',
    keywords: ['accounting firm web design Scarborough', 'CPA website design Scarborough', 'accounting website Scarborough']
  },
  {
    id: 'north-york',
    city: 'North York',
    description: 'Professional accounting websites for North York firms along Yonge Street, Sheppard corridor, and the North York Centre. Expertise in corporate tax planning, financial advisory, and virtual CFO services websites.',
    keywords: ['accounting firm web design North York', 'CPA website design North York', 'accounting website North York']
  },
  {
    id: 'etobicoke',
    city: 'Etobicoke',
    description: 'Modern web design for Etobicoke accounting firms in Islington, Mimico, and the Queensway corridor. Specializing in small business accounting, tax preparation, and bookkeeping websites.',
    keywords: ['accounting firm web design Etobicoke', 'CPA website design Etobicoke', 'accounting website Etobicoke']
  }
];

const AccountantLocation = () => {
  const { location: locationSlug } = useParams<{ location: string }>();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  // Find the location data
  const locationData = useMemo(() => {
    return locations.find(loc => loc.id === locationSlug);
  }, [locationSlug]);

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

  // If location not found, show 404
  if (!locationData) {
    return <NotFound />;
  }

  const { city, description, keywords } = locationData;
  const content = accountantLocationContent[locationData.id];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Section - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px] mb-16 sm:mb-20 md:mb-24">
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
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{city}</span>
              </p>
              
              {/* Paragraph 1 */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-6 font-light tracking-[0.01em]">
                Professional web design services for {city} accounting firms. Build trust, establish credibility, and convert visitors into consultations with a modern, high-performing website.
              </p>
              
              {/* Paragraph 2 */}
              <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 font-light tracking-[0.01em]">
                {description}
              </p>
            </div>
          </div>
          
          {/* Right Section - Image with Overlay */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <SafeImage 
                src={accountantComputerOffice} 
                alt={`Professional accounting firm web design services in ${city}`} 
                className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setHeroImageLoaded(true)}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
          </div>
        </div>

        {/* Local Context Section */}
        {content?.localContext && (
          <section
            data-section-id="local-context"
            ref={(el) => {
              if (el) sectionRefs.current.set('local-context', el as HTMLDivElement);
            }}
            className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
              visibleSections.has('local-context')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]">
                  <span className="block font-light opacity-90">Accounting Firm Web Design in</span>
                  <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">{city}</span>
                </h2>

                <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                  {content.localContext}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section 1: Why Your City Accounting Firm Needs a Professional Website */}
        <section 
          data-section-id="why-professional-website"
          ref={(el) => {
            if (el) sectionRefs.current.set('why-professional-website', el as HTMLDivElement);
          }}
          className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
            visibleSections.has('why-professional-website') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Why Your {city} Accounting Firm Needs a</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Professional Website</span>
              </h2>
              
              <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                In today's digital-first financial market, your website is often the first interaction potential clients have with your {city} accounting firm. <span className="text-cyan-300 font-semibold">74% of business owners and individuals research accounting firms online before making contact</span>, and that number rises to <span className="text-cyan-300 font-semibold">89% among millennial and Gen Z entrepreneurs</span>. Without a professional, trustworthy website, your firm is invisible to the majority of potential clients.
              </p>
              
              <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                First impressions are formed in just 0.05 seconds, and <span className="text-cyan-300 font-semibold">94% of those impressions are design-related</span>. A professional website signals competence, attention to detail, and modern data-security capabilities. Conversely, a poorly designed or outdated website can instantly erode trust, causing potential clients to question your firm's capabilities and move on to a competitor.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The Cost of a Bad Website */}
        <section 
          data-section-id="cost-bad-website"
          ref={(el) => {
            if (el) sectionRefs.current.set('cost-bad-website', el as HTMLDivElement);
          }}
          className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
            visibleSections.has('cost-bad-website') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">The Cost of a</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Bad Website</span>
              </h2>
              
              <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                Accounting firms with outdated websites lose <span className="text-cyan-300 font-semibold">40-60% of potential clients who bounce</span>. The average mid-sized accounting firm loses <span className="text-cyan-300 font-semibold">$50,000 to $100,000+ annually</span> in missed opportunity costs from poor web presence. Firms with professional websites see <span className="text-cyan-300 font-semibold">3x more consultation requests</span> compared to those with outdated sites.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Essential Web Design Features for Modern Accounting Firms */}
        <section 
          data-section-id="features"
          ref={(el) => {
            if (el) sectionRefs.current.set('features', el as HTMLDivElement);
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
              const itemIndex = index;
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

        {/* City-Specific FAQ Section */}
        {content?.faqs && content.faqs.length > 0 && (
          <section
            data-section-id="city-faq"
            ref={(el) => {
              if (el) sectionRefs.current.set('city-faq', el as HTMLDivElement);
            }}
            className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
              visibleSections.has('city-faq')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 text-center leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Frequently Asked Questions</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Accounting Firm Web Design in {city}</span>
            </h2>
            <p className="text-white/50 text-center mb-8 sm:mb-12 text-base sm:text-lg font-light">
              Common questions about accounting firm web design in {city}.
            </p>

            <div className="space-y-6">
              {content.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section
          data-section-id="cta"
          ref={(el) => {
            if (el) sectionRefs.current.set('cta', el as HTMLDivElement);
          }}
          className={`mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ${
            visibleSections.has('cta') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Ready to Transform Your</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">{city} Accounting Firm's Digital Presence?</span>
              </h2>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Contact us today for a free consultation about your accounting firm's web design needs. We'll analyze your current site and provide a roadmap to digital excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* CTA 1: Contact Page */}
                <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group w-full sm:w-auto">
                    <Link href="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        Get Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
                
                {/* CTA 2: Accountants Page */}
                <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group w-full sm:w-auto">
                    <Link href="/accountants" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        View All Services
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
        type="localBusiness"
      />
      
      {/* Breadcrumb Schema */}
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Accounting Firm Web Design', url: '/accountants' },
          { name: `Accounting Firm Web Design ${city}`, url: `/accountants/${locationSlug}` }
        ]} 
      />
    </div>
  );
};

export default memo(AccountantLocation);
