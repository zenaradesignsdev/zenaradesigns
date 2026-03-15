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
const renovationBackyard = '/images/renovation-backyard.png';
import NotFound from './NotFound';

// GTA Locations data - matches Renovations.tsx
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
  },
  {
    id: 'toronto',
    city: 'Toronto',
    description: 'Premier web design for Toronto renovation companies across the downtown core, midtown, and east and west end neighbourhoods. Expertise in condo renovations, heritage home restorations, and luxury kitchen and bathroom remodels.',
    keywords: ['renovation company web design Toronto', 'contractor website design Toronto', 'renovation website Toronto']
  },
  {
    id: 'mississauga',
    city: 'Mississauga',
    description: 'Professional web design for Mississauga renovation companies, from Square One to Port Credit and Meadowvale. Specializing in kitchen renovations, basement finishing, and home additions.',
    keywords: ['renovation company web design Mississauga', 'contractor website design Mississauga', 'renovation website Mississauga']
  },
  {
    id: 'brampton',
    city: 'Brampton',
    description: 'Custom renovation websites for Brampton contractors serving Bramalea, Springdale, and downtown Brampton. Expertise in basement renovations, kitchen remodels, and custom home builds.',
    keywords: ['renovation company web design Brampton', 'contractor website design Brampton', 'renovation website Brampton']
  },
  {
    id: 'oakville',
    city: 'Oakville',
    description: 'Premium web design for Oakville renovation companies in Bronte, Glen Abbey, and downtown Oakville. Specializing in luxury kitchen renovations, custom home additions, and high-end bathroom remodels.',
    keywords: ['renovation company web design Oakville', 'contractor website design Oakville', 'renovation website Oakville']
  },
  {
    id: 'burlington',
    city: 'Burlington',
    description: 'Professional renovation website design for Burlington contractors. Serving kitchen remodels, home additions, and basement finishing projects throughout the Halton Region.',
    keywords: ['renovation company web design Burlington', 'contractor website design Burlington', 'renovation website Burlington']
  },
  {
    id: 'hamilton',
    city: 'Hamilton',
    description: 'High-performance web design for Hamilton renovation companies in the downtown core, Westdale, Dundas, and Ancaster. Expertise in heritage home renovations, kitchen remodels, and whole-home transformations.',
    keywords: ['renovation company web design Hamilton', 'contractor website design Hamilton', 'renovation website Hamilton']
  },
  {
    id: 'scarborough',
    city: 'Scarborough',
    description: 'Custom web design for Scarborough renovation companies serving the Scarborough Town Centre, Agincourt, and Malvern communities. Specializing in kitchen renovations, bathroom remodels, and basement finishing.',
    keywords: ['renovation company web design Scarborough', 'contractor website design Scarborough', 'renovation website Scarborough']
  },
  {
    id: 'north-york',
    city: 'North York',
    description: 'Professional renovation websites for North York contractors along Yonge Street, Sheppard corridor, and the North York Centre. Expertise in condo renovations, kitchen remodels, and custom home additions.',
    keywords: ['renovation company web design North York', 'contractor website design North York', 'renovation website North York']
  },
  {
    id: 'etobicoke',
    city: 'Etobicoke',
    description: 'Modern web design for Etobicoke renovation companies in Islington, Mimico, and the Queensway corridor. Specializing in home additions, kitchen renovations, and bathroom remodels.',
    keywords: ['renovation company web design Etobicoke', 'contractor website design Etobicoke', 'renovation website Etobicoke']
  }
];

const RenovationLocation = () => {
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
                <span className="font-light opacity-90">Renovation Company Web Design</span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg sm:text-xl md:text-2xl mb-6 font-light">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{city}</span>
              </p>
              
              {/* Paragraph 1 */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-6 font-light tracking-[0.01em]">
                Professional web design services for {city} renovation companies. Showcase your craftsmanship, build homeowner trust, and convert browsers into high-value project leads with a modern, high-performing website.
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
                src={renovationBackyard} 
                alt={`Professional renovation company web design services in ${city}`} 
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

        {/* Section 1: Why Your City Renovation Company Needs a Professional Website */}
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
                <span className="block font-light opacity-90">Why Your {city} Renovation Company Needs a</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Professional Website</span>
              </h2>
              
              <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                In today's digital-first home improvement market, your website is often the first interaction potential clients have with your {city} renovation company. <span className="text-cyan-300 font-semibold">84% of homeowners research renovation companies online before ever requesting a quote</span>, and for high-ticket projects like additions or luxury kitchens, <span className="text-cyan-300 font-semibold">91% check a contractor's digital portfolio first</span>. Without a professional, trustworthy website, your company is invisible to the majority of potential clients.
              </p>
              
              <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                First impressions are formed in just 0.05 seconds, and <span className="text-cyan-300 font-semibold">94% of those impressions are design-related</span>. A professional website signals competence, attention to detail, and modern building technologies. Conversely, a poorly designed or outdated website can instantly erode trust, causing potential clients to question your company's capabilities and move on to a competitor.
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
                Renovation companies with outdated websites lose <span className="text-cyan-300 font-semibold">40-60% of potential leads to the "back" button</span>. The average GTA renovation firm loses <span className="text-cyan-300 font-semibold">$150,000 to $300,000+ annually in missed project revenue</span> due to a poor web presence. Companies with high-end, professional websites see <span className="text-cyan-300 font-semibold">3.5x more quote requests</span> compared to those with basic sites.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Essential Web Design Features for Modern Contractors */}
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
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">{city} Renovation Company's Digital Presence?</span>
              </h2>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Contact us today for a free consultation about your renovation company's web design needs. We'll analyze your current online presence and provide a roadmap to digital growth.
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
                
                {/* CTA 2: Renovations Page */}
                <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group w-full sm:w-auto">
                    <Link href="/renovations" className="flex items-center justify-center">
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
          { name: 'Renovation Company Web Design', url: '/renovations' },
          { name: `Renovation Company Web Design ${city}`, url: `/renovations/${locationSlug}` }
        ]} 
      />
    </div>
  );
};

export default memo(RenovationLocation);
