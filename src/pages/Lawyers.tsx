import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Lock, FileText, Calendar, Users, MapPin, Scale, Building2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollToTop, useSEO } from '@/hooks';
import { memo, useEffect, useRef, useState } from 'react';
import StructuredData from '@/components/StructuredData';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';

const Lawyers = () => {
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Law Firm Web Design GTA | Secure Legal Websites | Zenara",
    description: "Professional web design for law firms in Markham, Vaughan, Pickering & across GTA. Secure, compliant platforms with client portals. Free consultation.",
    canonical: "https://zenaradesigns.com/lawyers"
  });

  // Smooth scroll handler for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    const element = document.getElementById(anchor);
    if (element) {
      const offset = 100; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
      question: "How much does a professional law firm website cost in Ontario?",
      answer: "A custom, secure website for an Ontario law firm typically ranges from $4,000 to $10,000, depending on features like secure client portals, case management integration, and consultation booking systems. Zenara Designs provides transparent, fixed-price proposals to ensure budgetary certainty for your practice."
    },
    {
      question: "How long does it take to build a lawyer's website?",
      answer: "A complete custom law firm website usually takes 5 to 8 weeks from initial discovery to launch. This timeline includes competitive analysis, security compliance review, custom design, development, and rigorous testing to ensure client confidentiality and data protection."
    },
    {
      question: "What features are essential for a law firm website in 2026?",
      answer: "Essential features include AES-256 encryption, secure client portals for document sharing, attorney-client communication tools, consultation booking systems, practice area showcase pages, and compliance with Law Society of Ontario regulations. Modern firms also benefit from case management integration and client intake forms."
    },
    {
      question: "Do law firms in GTA suburbs need local SEO?",
      answer: "Absolutely. With 68% of users performing local searches before contacting a law firm, local SEO is critical for acquiring clients. Appearing in Google Map Pack for city-specific terms like 'Markham family lawyer' or 'Vaughan real estate attorney' is essential for capturing ready-to-consult prospects."
    },
    {
      question: "Can a new website help my law firm get more clients?",
      answer: "Yes. A professionally designed, SEO-optimized website functions as a 24/7 client acquisition engine. Law firms with authoritative content, clear practice area pages, and optimized call-to-action triggers see a 72% increase in consultation requests compared to firms with outdated digital presences."
    },
    {
      question: "Why is Next.js better than WordPress for a law firm?",
      answer: "For legal services, Next.js offers superior security by eliminating database vulnerabilities, faster load times for better user experience, and superior Core Web Vitals that Google rewards with higher rankings. Additionally, Next.js provides better protection for sensitive client information."
    },
    {
      question: "How do I ensure client confidentiality on my website?",
      answer: "We implement layered security controls including end-to-end encryption for all document transfers, Multi-Factor Authentication (MFA) for client logins, and compliance with PIPEDA privacy standards. Our React-based framework hosted on Vercel's global edge network provides enterprise-grade security and protection."
    },
    {
      question: "Can I update my law firm website content myself?",
      answer: "Yes. Zenara Designs integrates an intuitive, no-code backend that allows your staff to easily update practice area descriptions, publish blog articles, manage attorney bios, and update consultation availability without technical expertise."
    }
  ];

  // Inject structured data
  useEffect(() => {
    const schemas = [
      generateLocalBusinessSchema(),
      generateServiceSchema(
        'Law Firm Web Design',
        'Professional web design and development services for law firms and legal practices across the Greater Toronto Area. Secure, compliant platforms with client portals and case management integration.'
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
            <span className="block font-light opacity-90">Law Firm Web Design</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Greater Toronto Area</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4 mb-8">
            Secure, compliant web design for law firms across the GTA. Trading outdated templates for high-performance Next.js platforms that protect client confidentiality and convert consultations.
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

        {/* Section 1: Modern Law Firm Transformation */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">From Traditional Practice to</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Digital-First Legal Services</span>
              </h2>
              <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                The legal profession in Ontario is undergoing its most significant transformation in decades. With law firms across the GTA serving diverse communities from Markham to Oshawa, the stakes for your online presence have never been higher.
              </p>
              <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                Traditional client acquisition models are being disrupted by digital-first competitors. To thrive, your firm must pivot toward modern client engagement—becoming a trusted advisor accessible 24/7 rather than a traditional office-only practice. This transition requires a website that does more than look professional; it must function as a secure, automated gateway for client engagement while maintaining the highest standards of confidentiality.
              </p>
              <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                Firms that provide seamless digital experiences see rising client satisfaction and higher retention rates. However, your expertise is only as visible as your digital storefront. A Zenara-designed platform showcases your precision and professionalism, positioning your firm as a leader in the York and Durham legal communities.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Security & Compliance */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Bank-Grade Security &</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Client Confidentiality</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Shield,
                title: 'Attorney-Client Privilege Protection',
                description: 'End-to-end encryption ensures all client communications and documents remain confidential and protected under attorney-client privilege.'
              },
              {
                icon: Lock,
                title: 'Secure Document Handling',
                description: 'AES-256 encryption and secure client portals protect sensitive legal files, contracts, and case documents from unauthorized access.'
              },
              {
                icon: FileText,
                title: 'Law Society Compliance',
                description: 'Built to comply with Law Society of Ontario regulations, PIPEDA privacy standards, and professional conduct rules.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Features for Law Firms */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Advanced Features Designed for</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">High-Performing Practices</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: FileText,
                title: 'Secure Client Portals',
                description: 'Dedicated portals for case documents, allowing clients to securely access their files, upload documents, and communicate with your team while maintaining attorney-client privilege.'
              },
              {
                icon: Calendar,
                title: 'Consultation Booking Systems',
                description: 'Automated scheduling tools that integrate with your calendar, reducing administrative time by 40% and capturing leads 24/7.'
              },
              {
                icon: Users,
                title: 'Practice Area Showcase Pages',
                description: 'Dedicated pages for each practice area (family law, real estate, criminal defense, etc.) optimized for local search and client education.'
              },
              {
                icon: MessageSquare,
                title: 'Attorney-Client Communication Tools',
                description: 'Secure messaging systems that maintain confidentiality while providing clients with convenient access to their legal team.'
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

        {/* Section 4: GTA Coverage */}
        <section className="mb-16 sm:mb-20 md:mb-24" id="gta-coverage">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Serving Law Firms Across the</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Greater Toronto Area</span>
          </h2>
          
          <p className="text-white/60 text-center mb-8 sm:mb-12 text-base sm:text-lg max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
            Zenara Designs specializes in serving law firms across the high-growth municipalities of the GTA. Whether you're based in Markham, Vaughan, Pickering, or any of our service areas, we implement a "Local Authority Engine" that ensures your firm is the first choice for local clients.
          </p>

          {/* Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {locations.map((location, index) => (
              <div key={location.id} id={location.id} className="scroll-mt-24">
                <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group h-full flex flex-col">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center">
                        <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{location.city}</span>
                      </h3>
                    </div>
                    
                    <p className="text-white/60 mb-6 text-sm sm:text-base leading-relaxed font-light flex-1">
                      {location.description}
                    </p>
                    
                    <div className="mt-auto">
                      <Link 
                        to="/contact" 
                        className="inline-flex items-center text-cyan-400 hover:text-purple-400 transition-colors text-sm font-medium group/link"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-cyan-400" />
              Quick Navigation
            </h3>
            <div className="flex flex-wrap gap-3">
              {locations.map((location) => (
                <a
                  key={location.id}
                  href={`#${location.id}`}
                  onClick={(e) => handleAnchorClick(e, location.id)}
                  className="text-sm bg-slate-800/50 text-cyan-300 hover:text-purple-300 px-4 py-2 rounded-full border border-cyan-500/30 hover:border-purple-500/30 transition-all font-light"
                >
                  {location.city}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Process */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">A Streamlined</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Three-Step Transformation</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Discovery & Market Mapping',
                description: 'We conduct an in-depth audit of your local GTA competitors to identify high-value keywords and opportunities. We analyze your practice areas, target clients, and regional market dynamics.'
              },
              {
                step: '02',
                title: 'Custom Build & Security Audit',
                description: 'We build your visual identity and site architecture that compels prospects to act, utilizing proven conversion patterns. Every element is designed with client confidentiality and security in mind.'
              },
              {
                step: '03',
                title: 'Optimized Launch & SEO Control',
                description: 'We deploy your custom platform on Vercel\'s global edge network, implementing advanced schema markup for Map Pack dominance and ensuring your firm ranks for local searches.'
              }
            ].map((phase, index) => (
              <div key={index} className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{phase.title}</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: FAQ */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Frequently Asked</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Questions</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-800/50 px-6 py-4"
                >
                  <AccordionTrigger className="text-white hover:text-cyan-300 text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pt-4 leading-relaxed font-light">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Section 7: CTA */}
        <section>
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-light text-lg sm:text-xl">
                  Ready to Transform Your Law Firm's Digital Presence?
                </span>
              </div>
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
    </div>
  );
};

export default memo(Lawyers);
