import { Link } from 'react-router-dom';
import { Star, ArrowRight, CheckCircle, Layers, Heart, ChevronLeft, ChevronRight, Rocket, TrendingUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollToTop, useSEO } from '@/hooks';
import { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import StructuredData from '@/components/StructuredData';
import logo from '@/assets/zenaralogov2.svg';
import realEstateWebImage from '@/assets/website-example-realestate.png';
import rocketWebImage from '@/assets/website-example-rocket.png';
import gardenWebImage from '@/assets/website-example-garden.png';
import travelWebImage from '@/assets/website-example-travel.png';
import moonImage from '@/assets/moon.png';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

// Simple component for typing animation (single line)
const TypingTextSection = ({ text, className = '' }: { text: string; className?: string }) => {
  const { displayedText, isTyping, containerRef } = useTypingAnimation(text, 25);
  
  return (
    <span ref={containerRef} className={className}>
      {displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Single line component that can be controlled externally
const TypingTextLine = ({ text, startTyping, onComplete, className = '' }: { 
  text: string; 
  startTyping: boolean; 
  onComplete: () => void;
  className?: string;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (startTyping && !isTyping && !hasCompleted) {
      setIsTyping(true);
      setDisplayedText('');
    }
  }, [startTyping, isTyping, hasCompleted]);

  useEffect(() => {
    if (isTyping && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 25);

      return () => clearTimeout(timeout);
    } else if (isTyping && displayedText.length === text.length) {
      setIsTyping(false);
      setHasCompleted(true);
      onComplete();
    }
  }, [isTyping, displayedText, text, onComplete]);

  return (
    <span className={className}>
      {hasCompleted ? text : displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Component for multi-line typing animation (sequential)
const TypingTextLines = ({ lines, className = '', lineClassName = '' }: { 
  lines: string[]; 
  className?: string; 
  lineClassName?: string | ((index: number, totalLines: number) => string);
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  const handleLineComplete = (index: number) => {
    setCompletedLines(prev => [...prev, index]);
    if (index < lines.length - 1) {
      setTimeout(() => setCurrentLineIndex(index + 1), 200);
    }
  };

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {lines.map((line, index) => {
        const shouldStart = isVisible && index === currentLineIndex && !completedLines.includes(index);
        
        // Apply lineClassName to the span wrapper for styling
        const spanClasses = typeof lineClassName === 'function' ? lineClassName(index, lines.length) : (lineClassName || '');
        
        return (
          <div key={index} className="relative w-full" style={{ minHeight: 'clamp(1.2em, 4vw, 1.5em)' }}>
            {/* Invisible placeholder to reserve space */}
            <span className="invisible block w-full break-words" aria-hidden="true">{line}</span>
            {/* Typing text overlay */}
            <span className={`absolute left-0 top-0 block w-full break-words ${spanClasses}`}>
              <TypingTextLine
                text={line}
                startTyping={shouldStart}
                onComplete={() => handleLineComplete(index)}
                className=""
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};

const Services = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Web Design Services Toronto | Business Cards & Logo | Zenara",
    description: "Complete web design services in Toronto & GTA. Custom websites, business cards, logo design, and digital marketing. Get a free consultation for your project today!",
    canonical: "https://zenaradesigns.com/services",
    structuredData: {
      type: 'service',
      serviceName: 'Web Design Services',
      serviceDescription: 'Complete web design and development services including custom websites, business cards, logo design, and digital marketing for businesses in Toronto and the Greater Toronto Area.'
    }
  });
  
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [imageVisibleItems, setImageVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleItemIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        setVisibleItems(prev => [...prev, index]);
      } else {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        setVisibleItems(prev => prev.filter(item => item !== index));
      }
    });
  }, []);

  const handleImageIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-image-index') || '0');
        setImageVisibleItems(prev => [...prev, index]);
      } else {
        const index = parseInt(entry.target.getAttribute('data-image-index') || '0');
        setImageVisibleItems(prev => prev.filter(item => item !== index));
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleItemIntersection, { threshold: 0.2 });
    const imageObserver = new IntersectionObserver(handleImageIntersection, { threshold: 0.3 });

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    imageRefs.current.forEach((ref) => {
      if (ref) imageObserver.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      imageRefs.current.forEach((ref) => {
        if (ref) imageObserver.unobserve(ref);
      });
    };
  }, [handleItemIntersection, handleImageIntersection]);

  const services = useMemo(() => [
    {
      emoji: "💻",
      title: "Website Design & Development",
      description: "Complete web solutions built for performance and conversion.",
      features: [
        "Dedicated web designer and mock-ups made for customers",
        "Modern web design with cutting-edge web stack",
        "Fully responsive on mobile and optimized for all devices",
        "Performance, security, and privacy built-in",
        "SEO optimization for better search rankings",
        "Custom features, forms, and integrations"
      ]
    },
    {
      emoji: "🔒",
      title: "Web Hosting & Security", 
      description: "Enterprise-grade hosting with built-in security and monitoring.",
      features: [
        "Affordable plans that fit your budget",
        "Scales as your traffic and business grows",
        "Automated backups + easy restores",
        "Global CDN for faster load times",
        "Uptime monitoring with instant alerts",
        "Security best practices + web firewall protection",
        "SSL included with every plan"
      ]
    },
    {
      emoji: "🔧",
      title: "Maintenance & Support",
      description: "Keep your site running smoothly with ongoing care.",
      features: [
        "Monthly security and performance updates",
        "Amazing uptime with 99.9% reliability",
        "Content changes and copy revisions",
        "Bug fixes and compatibility updates",
        "Small feature additions and improvements",
        "Priority technical support when you need it",
        "Complete setup support and guidance"
      ]
    },
    {
      emoji: "🎨",
      title: "Brand & Collateral",
      description: "Complete brand identity and marketing materials.",
      features: [
        "Custom logo design and comprehensive brand guidelines",
        "Business card design with print-ready files",
        "Social media profile and cover setup",
        "Branded social media post templates",
        "Complete brand kit handoff with all assets",
        "Google Business setup and optimization",
        "Additional brand-related services available on request"
      ]
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      quote: "Zenara delivered a clean, fast site in days. Our conversion rate jumped 40% within the first month.",
      author: "Taylor R.",
      role: "Small Business Owner",
      rating: 5
    },
    {
      quote: "Traffic up, inquiries doubled. The team understood exactly what we needed and delivered beyond expectations.",
      author: "Dr. Lina P.", 
      role: "Clinic Director",
      rating: 5
    },
    {
      quote: "Seamless process from mockup to launch. Professional, responsive, and the site performs beautifully.",
      author: "Mark H.",
      role: "Contractor", 
      rating: 5
    },
    {
      quote: "Finally, a web team that speaks our language. Fast delivery without compromising on quality.",
      author: "Emma K.",
      role: "Marketing Director",
      rating: 5
    },
    {
      quote: "Our new website has been a game-changer. Professional, fast, and exactly what we envisioned.",
      author: "Sarah M.",
      role: "E-commerce Owner",
      rating: 5
    },
    {
      quote: "Outstanding work! The team was responsive, creative, and delivered on time. Highly recommended.",
      author: "James L.",
      role: "Startup Founder",
      rating: 5
    },
    {
      quote: "The attention to detail and user experience is incredible. Our customers love the new site.",
      author: "Maria G.",
      role: "Restaurant Owner",
      rating: 5
    },
    {
      quote: "From concept to completion, Zenara made the entire process smooth and stress-free.",
      author: "David C.",
      role: "Consultant",
      rating: 5
    }
  ], []);

  return (
    <div className="min-h-screen" role="main" aria-label="Services page">

      {/* Services Showcase - Space Theme */}
      <section className="services-showcase pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-16 sm:pb-20 md:pb-24 relative overflow-hidden bg-black">
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
          <div className="bg-star" style={{ top: '25%', left: '5%' }}></div>
          <div className="bg-star" style={{ top: '28%', left: '15%' }}></div>
          <div className="bg-star" style={{ top: '32%', left: '28%' }}></div>
          <div className="bg-star" style={{ top: '26%', left: '42%' }}></div>
          <div className="bg-star" style={{ top: '35%', left: '55%' }}></div>
          <div className="bg-star" style={{ top: '29%', left: '68%' }}></div>
          <div className="bg-star" style={{ top: '38%', left: '82%' }}></div>
          <div className="bg-star" style={{ top: '27%', left: '92%' }}></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em] relative">
              <span className="block pb-1">
                <TypingTextSection text="Complete " className="font-light opacity-90" />
                <TypingTextSection 
                  text="Digital Solutions" 
                  className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal" 
                />
                {/* Moon behind Solutions */}
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 md:-top-8 md:-right-8 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-15 animate-levitate">
                  <img 
                    src={moonImage} 
                    alt="Decorative moon illustration for web design services background" 
                    className="w-full h-full object-contain"
                    width="120"
                    height="120"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              From concept to launch, we deliver comprehensive web solutions that transform your business and delight your customers.
            </p>
          </div>
          
          <div className="space-y-12 sm:space-y-16">
            {services.map((service, index) => (
              <div 
                key={index} 
                ref={(el) => (itemRefs.current[index] = el)}
                data-index={index}
                className={`group transition-all duration-1000 ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 sm:gap-12`}>
                  {/* Image Section */}
                  <div className="flex-1 w-full">
                    <div 
                      ref={(el) => (imageRefs.current[index] = el)}
                      data-image-index={index}
                      className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-1000 w-full h-64 sm:h-72 md:h-80 ${
                        imageVisibleItems.includes(index) 
                          ? 'opacity-100 translate-x-0' 
                          : index % 2 === 0 
                            ? 'opacity-0 -translate-x-12' 
                            : 'opacity-0 translate-x-12'
                      }`}
                    >
                      <img 
                        src={index === 0 ? realEstateWebImage : index === 1 ? rocketWebImage : index === 2 ? gardenWebImage : travelWebImage} 
                        alt={`${service.title} - Professional Web Design Service Icon`}
                        width="48"
                        height="48"
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        style={{ 
                          objectFit: 'contain',
                          objectPosition: 'center center',
                          transform: (index === 0 || index === 3) ? 'scale(1.5)' : 'scale(1)'
                        }}
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1">
                    <div className="service-card bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 flex-shrink-0">
                          <div className="text-4xl sm:text-5xl md:text-6xl">
                            {service.emoji}
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">{service.title}</h3>
                          </div>
                        </div>
                        
                        <p className="text-white/60 mb-4 sm:mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em] flex-shrink-0">
                          {service.description}
                        </p>
                        
                        <ul className="space-y-2 sm:space-y-3 flex-grow">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3 text-white/60">
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs sm:text-sm leading-[1.6] font-light tracking-[0.01em]">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Dark Theme */}
      <section className="services-faq py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Background Effects - Matching "Where Innovation Meets Excellence" */}
        <div className="absolute inset-0">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black"></div>
          
          {/* Left curved glowing line - curves inward from top-left */}
          <div 
            className="absolute left-0 top-0"
            style={{
              width: '300px',
              height: '400px',
              background: 'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(6, 182, 212, 0.25), rgba(6, 182, 212, 0.1) 40%, transparent 70%)',
              borderRadius: '0 0 100% 0',
              filter: 'blur(40px)',
              transform: 'rotate(-5deg)',
              transformOrigin: 'top left'
            }}
          ></div>
          <div 
            className="absolute left-0 top-0"
            style={{
              width: '200px',
              height: '300px',
              background: 'radial-gradient(ellipse 70% 50% at 0% 0%, rgba(6, 182, 212, 0.2), transparent 60%)',
              borderRadius: '0 0 100% 0',
              filter: 'blur(20px)',
              transform: 'rotate(-3deg)',
              transformOrigin: 'top left'
            }}
          ></div>
          
          {/* Right curved glowing line - curves inward from top-right */}
          <div 
            className="absolute right-0 top-0"
            style={{
              width: '300px',
              height: '400px',
              background: 'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(168, 85, 247, 0.25), rgba(168, 85, 247, 0.1) 40%, transparent 70%)',
              borderRadius: '0 0 0 100%',
              filter: 'blur(40px)',
              transform: 'rotate(5deg)',
              transformOrigin: 'top right'
            }}
          ></div>
          <div 
            className="absolute right-0 top-0"
            style={{
              width: '200px',
              height: '300px',
              background: 'radial-gradient(ellipse 70% 50% at 100% 0%, rgba(168, 85, 247, 0.2), transparent 60%)',
              borderRadius: '0 0 0 100%',
              filter: 'blur(20px)',
              transform: 'rotate(3deg)',
              transformOrigin: 'top right'
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 leading-[0.95] tracking-[-0.04em]">
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">FAQ</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:items-start">
            {/* Left Column Accordion */}
            <Accordion type="single" collapsible className="w-full space-y-4 sm:space-y-6 flex flex-col">
            {[
              {
                  value: "left-item-1",
                question: "How long does it take to build a website?",
                  answer: "Most websites are completed within 2-4 weeks, depending on complexity and requirements. Simple sites can be ready in 1-2 weeks, while more complex projects with custom features may take 3-4 weeks. We work efficiently while ensuring quality results."
                },
                {
                  value: "left-item-2",
                  question: "What's included in your web design package?",
                  answer: "Our packages include custom design, fully responsive development, SEO optimization, SSL security setup, performance optimization, and post-launch support. We also provide brand guidelines, logo design options, and business card design as part of our comprehensive service."
                },
                {
                  value: "left-item-3",
                question: "Do you provide hosting and maintenance?",
                  answer: "Yes! We offer comprehensive hosting solutions with 99.9% uptime guarantee, automated backups, and ongoing maintenance support. Our hosting plans include SSL certificates, CDN integration, and 24/7 monitoring. We also provide monthly maintenance packages for updates and support."
                },
                {
                  value: "left-item-4",
                  question: "Can you help with existing websites?",
                  answer: "We can assist with existing websites if they use a similar technology stack to our preferred modern frameworks. If your current site uses a different technology stack, we typically recommend building a new site with our modern approach for optimal performance and maintainability."
                },
                {
                  value: "left-item-5",
                  question: "What makes your websites different?",
                  answer: "We focus on business results, not just aesthetics. Every design decision is made with conversion optimization in mind. We use modern, fast-loading technologies, ensure mobile-first responsive design, and build with SEO best practices from day one. Plus, you get direct access to our team throughout the project."
                }
              ].map((faq) => (
                <AccordionItem 
                  key={faq.value} 
                  value={faq.value}
                  className="border border-slate-800/50 rounded-xl bg-slate-900/90 backdrop-blur-sm data-[state=open]:bg-gradient-to-r data-[state=open]:from-cyan-500/20 data-[state=open]:via-purple-500/20 data-[state=open]:to-cyan-500/20 data-[state=open]:border-cyan-500/50 transition-all duration-200 relative overflow-hidden min-h-[80px] sm:min-h-[90px] flex flex-col"
                >
                  {/* Gradient vertical bar on the left */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-300 via-purple-300 to-cyan-300 rounded-l-xl z-10"></div>
                  <AccordionTrigger 
                    className="px-4 sm:px-6 py-4 sm:py-5 hover:no-underline text-left data-[state=open]:text-white data-[state=closed]:text-white/80 relative overflow-hidden group w-full min-h-[80px] sm:min-h-[90px] flex items-center pl-5 sm:pl-7"
                  >
                    {/* Hover background animation - left to right */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-xl"></div>
                    <span className="font-light text-base sm:text-lg pr-4 flex-1 relative z-10 group-hover:text-white transition-colors duration-300">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 data-[state=closed]:text-white/60 data-[state=open]:text-white group-hover:text-white transition-all duration-200 relative z-10" />
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-5 text-white/80 text-sm sm:text-base leading-[1.7] font-light tracking-[0.01em]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Right Column Accordion */}
            <Accordion type="single" collapsible className="w-full space-y-4 sm:space-y-6 flex flex-col">
              {[
                {
                  value: "right-item-1",
                  question: "Do you offer payment plans?",
                  answer: "Yes! We offer flexible payment options with 50% upfront and 50% on completion for all projects. For larger projects over $10,000, we can discuss custom payment schedules. We accept e-transfers, cheques, and credit cards to make it convenient for you."
                },
                {
                  value: "right-item-2",
                  question: "Will my website work on mobile devices?",
                  answer: "Absolutely! Every website we build is fully responsive and mobile-optimized. We use a mobile-first approach, ensuring your site looks and works perfectly on smartphones, tablets, and all screen sizes. Mobile optimization is included in all our packages."
                },
                {
                  value: "right-item-3",
                  question: "What if I need changes after launch?",
                  answer: "All our packages include post-launch support (14-60 days depending on your plan). After that, we offer flexible maintenance packages for ongoing updates, content changes, security updates, and technical support. We're here for the long term."
                },
                {
                  value: "right-item-4",
                  question: "Do you provide business card and logo design?",
                  answer: "Yes! We offer complete brand identity services including custom logo design, business card design with print-ready files, brand guidelines, and social media profile setup. Our brand packages range from basic logo design to comprehensive brand identity systems."
                },
                {
                  value: "right-item-5",
                  question: "How do I get started?",
                  answer: "Getting started is easy! Simply contact us through our contact form or schedule a free consultation. We'll discuss your project goals, timeline, and budget, then provide a detailed proposal. Once approved, we'll begin the design process and keep you involved every step of the way."
                }
              ].map((faq) => (
                <AccordionItem 
                  key={faq.value} 
                  value={faq.value}
                  className="border border-slate-800/50 rounded-xl bg-slate-900/90 backdrop-blur-sm data-[state=open]:bg-gradient-to-r data-[state=open]:from-cyan-500/20 data-[state=open]:via-purple-500/20 data-[state=open]:to-cyan-500/20 data-[state=open]:border-cyan-500/50 transition-all duration-200 relative overflow-hidden min-h-[80px] sm:min-h-[90px] flex flex-col"
                >
                  {/* Gradient vertical bar on the left */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-300 via-purple-300 to-cyan-300 rounded-l-xl z-10"></div>
                  <AccordionTrigger 
                    className="px-4 sm:px-6 py-4 sm:py-5 hover:no-underline text-left data-[state=open]:text-white data-[state=closed]:text-white/80 relative overflow-hidden group w-full min-h-[80px] sm:min-h-[90px] flex items-center pl-5 sm:pl-7"
                  >
                    {/* Hover background animation - left to right */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-xl"></div>
                    <span className="font-light text-base sm:text-lg pr-4 flex-1 relative z-10 group-hover:text-white transition-colors duration-300">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 data-[state=closed]:text-white/60 data-[state=open]:text-white group-hover:text-white transition-all duration-200 relative z-10" />
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-5 text-white/80 text-sm sm:text-base leading-[1.7] font-light tracking-[0.01em]">
                      {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Service Areas - Animated Scrolling */}
      <section className="service-areas py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
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
          
          <div className="bg-star" style={{ top: '25%', left: '2%' }}></div>
          <div className="bg-star" style={{ top: '22%', left: '15%' }}></div>
          <div className="bg-star" style={{ top: '28%', left: '28%' }}></div>
          <div className="bg-star" style={{ top: '31%', left: '42%' }}></div>
          <div className="bg-star" style={{ top: '26%', left: '55%' }}></div>
          <div className="bg-star" style={{ top: '33%', left: '65%' }}></div>
          <div className="bg-star" style={{ top: '29%', left: '75%' }}></div>
          <div className="bg-star" style={{ top: '35%', left: '85%' }}></div>
          <div className="bg-star" style={{ top: '24%', left: '92%' }}></div>
          
          <div className="bg-star" style={{ top: '45%', left: '5%' }}></div>
          <div className="bg-star" style={{ top: '48%', left: '18%' }}></div>
          <div className="bg-star" style={{ top: '42%', left: '32%' }}></div>
          <div className="bg-star" style={{ top: '51%', left: '48%' }}></div>
          <div className="bg-star" style={{ top: '47%', left: '62%' }}></div>
          <div className="bg-star" style={{ top: '44%', left: '72%' }}></div>
          <div className="bg-star" style={{ top: '49%', left: '82%' }}></div>
          <div className="bg-star" style={{ top: '46%', left: '95%' }}></div>
          
          <div className="bg-star" style={{ top: '65%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '68%', left: '16%' }}></div>
          <div className="bg-star" style={{ top: '72%', left: '29%' }}></div>
          <div className="bg-star" style={{ top: '66%', left: '41%' }}></div>
          <div className="bg-star" style={{ top: '69%', left: '54%' }}></div>
          <div className="bg-star" style={{ top: '74%', left: '67%' }}></div>
          <div className="bg-star" style={{ top: '71%', left: '79%' }}></div>
          <div className="bg-star" style={{ top: '67%', left: '89%' }}></div>
          <div className="bg-star" style={{ top: '73%', left: '96%' }}></div>
          
          <div className="bg-star" style={{ top: '85%', left: '7%' }}></div>
          <div className="bg-star" style={{ top: '88%', left: '21%' }}></div>
          <div className="bg-star" style={{ top: '82%', left: '35%' }}></div>
          <div className="bg-star" style={{ top: '86%', left: '49%' }}></div>
          <div className="bg-star" style={{ top: '91%', left: '63%' }}></div>
          <div className="bg-star" style={{ top: '87%', left: '76%' }}></div>
          <div className="bg-star" style={{ top: '89%', left: '88%' }}></div>
          <div className="bg-star" style={{ top: '84%', left: '95%' }}></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 leading-[0.95] tracking-[-0.04em]">
              <TypingTextLines
                lines={['Serving the', 'Greater Toronto Area']}
                className="[&>div:first-child]:block [&>div:last-child]:block [&>div:last-child]:mt-1"
                lineClassName={(index) => {
                  if (index === 0) return "block font-light opacity-90 text-white";
                  if (index === 1) return "block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal";
                  return "";
                }}
              />
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              We provide web design and development services across the GTA
                    </p>
                  </div>
                  
          {/* Animated Scrolling Cities */}
          <div className="relative overflow-hidden">
            {/* Top Row - Scrolling Left */}
            <div className="mb-6 sm:mb-8">
              <div className="flex animate-scroll-left">
                {[
                  'Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham',
                  'Richmond Hill', 'Oakville', 'Burlington', 'Hamilton', 'Ajax',
                  'Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham',
                  'Richmond Hill', 'Oakville', 'Burlington', 'Hamilton', 'Ajax'
                ].map((city, index) => (
                  <div
                    key={`top-${index}`}
                    className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-md border border-slate-800/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg"
                    style={{ minWidth: 'fit-content' }}
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl font-light bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient whitespace-nowrap">
                      {city}
                    </span>
                </div>
                ))}
              </div>
            </div>

            {/* Bottom Row - Scrolling Right */}
            <div>
              <div className="flex animate-scroll-right">
                {[
                  'Pickering', 'Whitby', 'Oshawa', 'Newmarket', 'Aurora',
                  'Milton', 'Caledon', 'Halton Hills', 'Georgina', 'Clarington',
                  'Pickering', 'Whitby', 'Oshawa', 'Newmarket', 'Aurora',
                  'Milton', 'Caledon', 'Halton Hills', 'Georgina', 'Clarington'
                ].map((city, index) => (
                  <div
                    key={`bottom-${index}`}
                    className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-md border border-slate-800/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg"
                    style={{ minWidth: 'fit-content' }}
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl font-light bg-gradient-to-r from-purple-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient whitespace-nowrap">
                      {city}
                    </span>
              </div>
            ))}
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section className="services-testimonials py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
          {/* Accent gradients with theme colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
        </div>
        
        {/* Background Stars */}
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
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 leading-[0.95] tracking-[-0.04em]">
              <TypingTextSection text="What Our " className="font-light opacity-90 text-white" />
              <TypingTextSection 
                text="Clients Say" 
                className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal" 
              />
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Real results from real businesses who trusted us with their digital transformation
            </p>
          </div>
          
          {/* Carousel Container - Infinite Scroll */}
          <div className="relative overflow-hidden -mx-4 sm:-mx-6" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            {/* Fade effects */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, black, transparent)' }}></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, black, transparent)' }}></div>
            
            <div className="flex animate-scroll-smooth space-x-4 sm:space-x-6 md:space-x-8 relative z-10 py-4">
              {/* First set of testimonials */}
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]">
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-800/50 shadow-lg h-full flex flex-col relative overflow-hidden">
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-xl opacity-50"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 fill-cyan-400 mx-0.5 drop-shadow-[0_0_4px_rgba(103,232,249,0.5)]" />
                        ))}
                      </div>
                      
                      <blockquote className="text-white/90 text-sm sm:text-base md:text-lg leading-[1.6] mb-4 sm:mb-6 flex-grow font-light tracking-[0.01em]">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3 flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-full flex items-center justify-center text-white font-light text-sm sm:text-base">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-light text-white text-sm sm:text-base">{testimonial.author}</div>
                          <div className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient text-xs sm:text-sm font-light">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]">
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-800/50 shadow-lg h-full flex flex-col relative overflow-hidden">
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-xl opacity-50"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 fill-cyan-400 mx-0.5 drop-shadow-[0_0_4px_rgba(103,232,249,0.5)]" />
                        ))}
                      </div>
                      
                      <blockquote className="text-white/90 text-sm sm:text-base md:text-lg leading-[1.6] mb-4 sm:mb-6 flex-grow font-light tracking-[0.01em]">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3 flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-full flex items-center justify-center text-white font-light text-sm sm:text-base">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-light text-white text-sm sm:text-base">{testimonial.author}</div>
                          <div className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient text-xs sm:text-sm font-light">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Third set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <div key={`duplicate-2-${index}`} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]">
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-800/50 shadow-lg h-full flex flex-col relative overflow-hidden">
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-xl opacity-50"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 fill-cyan-400 mx-0.5 drop-shadow-[0_0_4px_rgba(103,232,249,0.5)]" />
                        ))}
                      </div>
                      
                      <blockquote className="text-white/90 text-sm sm:text-base md:text-lg leading-[1.6] mb-4 sm:mb-6 flex-grow font-light tracking-[0.01em]">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3 flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-full flex items-center justify-center text-white font-light text-sm sm:text-base">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-light text-white text-sm sm:text-base">{testimonial.author}</div>
                          <div className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient text-xs sm:text-sm font-light">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section - Matching "Let's Build Something Amazing" */}
      <section className="services-cta py-20 sm:py-28 md:py-32 relative overflow-hidden bg-black">
        {/* Background Effects - Dark with Subtle Theme Colors */}
        <div className="absolute inset-0">
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/80 to-purple-900/40"></div>
          
          {/* Scattered Stars */}
          <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-twinkle"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-twinkle delay-1000"></div>
          <div className="absolute top-60 left-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle delay-2000"></div>
          <div className="absolute top-32 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-twinkle delay-500"></div>
          <div className="absolute top-80 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle delay-3000"></div>
          <div className="absolute top-100 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-twinkle delay-1500"></div>
          <div className="absolute top-120 left-2/3 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle delay-2500"></div>
          <div className="absolute top-140 right-1/5 w-1 h-1 bg-purple-300 rounded-full animate-twinkle delay-700"></div>
          <div className="absolute top-160 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle delay-3500"></div>
          <div className="absolute top-180 right-2/5 w-1 h-1 bg-purple-400 rounded-full animate-twinkle delay-1200"></div>
          
          {/* Subtle Nebula Effects with Slow Pulse */}
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000" style={{ animationDuration: '6s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/6 to-purple-500/6 rounded-full blur-3xl animate-pulse delay-2000" style={{ animationDuration: '7s' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Banner Card - Black with Highlight Glow */}
          <div className="relative rounded-[2rem] overflow-hidden border border-white/20">
            {/* Black Background */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            
            {/* Main Highlight Glow - Abstract Element with Slow Pulse */}
            <div className="absolute inset-0">
              {/* Left side - Cyan/Blue glow */}
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/25 via-cyan-400/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
              {/* Right side - Purple glow */}
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/25 via-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" style={{ animationDuration: '5s' }}></div>
              {/* Center accent */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-500" style={{ animationDuration: '6s' }}></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 text-center">
              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Ready to Transform Your</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Business?</span>
              </h2>
              
              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-10 sm:mb-12 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Your digital transformation starts here. Let's create something that not only looks incredible but drives real results.
              </p>
              
              {/* CTA Button - Modern & Clean */}
              <div>
                <Link 
                  to="/contact"
                  className="relative inline-block group"
                >
                  {/* Subtle Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 rounded-full blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  
                  {/* Button - Clean Modern Style */}
                  <div className="relative bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 hover:from-cyan-400 hover:via-purple-400 hover:to-cyan-400 text-white rounded-full px-10 sm:px-12 md:px-14 py-4 sm:py-5 text-lg sm:text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 animate-jiggle">
                    Start Your Project
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      
      {/* Structured Data */}
      <StructuredData 
        type="review" 
        reviews={testimonials}
      />
      <StructuredData 
        type="serviceOffering" 
        services={services}
      />
      <StructuredData 
        type="aggregateRating" 
        rating={{
          ratingValue: 4.9,
          reviewCount: testimonials.length,
          bestRating: 5,
          worstRating: 1
        }}
      />
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ]} 
      />
    </div>
  );
};

export default memo(Services);