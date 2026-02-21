import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, ChevronDown, Layers, Rocket, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollToTop, useSEO } from '@/hooks';
import { memo, useMemo, useState, useEffect, useRef } from 'react';
import StructuredData from '@/components/StructuredData';
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

const Pricing = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Pricing Plans | Web Design Toronto | Zenara Designs",
    description: "Transparent web design pricing in Toronto & GTA. Get detailed costs for small business websites, e-commerce, and enterprise solutions. Request your free quote today!",
    canonical: "https://zenaradesigns.com/pricing"
  });
  

  const pricingPlans = useMemo(() => [
    {
      name: "Starter",
      subtitle: "Individual",
      price: "$999",
      description: "Perfect for freelancers and personal brands",
      features: [
        "Up to 3 pages (Home, About, Contact)",
        "Modern portfolio-style design",
        "Mobile-responsive layout",
        "Contact form + email notifications",
        "SEO setup (titles/meta, indexing, analytics)",
        "1 month free hosting",
        "SSL + baseline security included",
        "1-week turnaround (once content is received)",
        "14 days post-launch support (bug fixes + minor edits)"
      ],
      cta: "Choose Starter",
      popular: false
    },
    {
      name: "Small Business", 
      subtitle: "Recommended",
      price: "$1,999",
      description: "Ideal for small businesses and professionals",
      features: [
        "Up to 6 pages (Home, About, Services, Projects, Pricing, Contact)",
        "Custom sections and layouts",
        "Custom forms (contact/quote/booking)",
        "SEO setup (titles/meta, indexing, sitemap)",
        "Mobile-first responsive design",
        "Basic animations",
        "2 rounds of revisions included",
        "2–3 week turnaround (once content is received)",
        "SSL + baseline security included",
        "Performance optimization (images + speed)",
        "30 days post-launch support (bug fixes + minor edits)"
      ],
      cta: "Choose Small Business",
      popular: true
    },
    {
      name: "Pro",
      subtitle: "Fully Custom", 
      price: "$4,999+",
      description: "For businesses needing advanced functionality",
      features: [
        "Everything in Small Business",
        "Multi-page site (10+ pages) with custom sections",
        "Custom design system + premium animations",
        "Advanced integrations (Calendly, Stripe, newsletter, etc.)",
        "Custom components + tailored functionality",
        "E-commerce store setup (platform-based) with checkout + payments",
        "Performance optimization",
        "Priority support + optional maintenance plan",
        "3–4 week turnaround (once content is received)",
        "60 days post-launch support (bug fixes + minor edits)"
      ],
      cta: "Request Custom Quote",
      popular: false
    }
  ], []);

  // Additional services pricing for comprehensive coverage
  const additionalServices = useMemo(() => [
    {
      category: "Business Card Design & Logo Design - Tailored for Toronto & GTA",
      services: [
        {
          name: "Professional Business Cards",
          price: "$149 - $399",
          description: "High-quality business card design and printing",
          features: ["Custom design", "Premium printing", "Digital files", "2-3 day turnaround"],
          idealFor: "Professionals, consultants, service providers, small business owners, executives, lawyers, doctors, financial advisors, luxury brands"
        },
        {
          name: "Basic Logo Design",
          price: "$99 - $199", 
          description: "Simple logo design for small businesses",
          features: ["3 initial concepts", "2 revisions", "Vector files", "1 week delivery"],
          idealFor: "Startups, freelancers, small businesses, entrepreneurs"
        }
      ]
    }
  ], []);

  const subscriptionPlans = useMemo(() => [
    {
      id: 'core',
      name: 'Zenara Core',
      icon: Layers,
      monthlyPrice: 45,
      annualPrice: 486, // 10% discount: $45 * 12 * 0.9 = $486
      features: [
        'Managed hosting (modern stack) + SSL',
        'Monitoring + basic security checks',
        'Daily backups + restore support',
        '30 min/month minor updates + email support (1–2 business days)'
      ],
      bestFor: 'Simple sites, portfolios, new businesses',
      popular: false
    },
    {
      id: 'grow',
      name: 'Zenara Grow',
      icon: Rocket,
      monthlyPrice: 70,
      annualPrice: 756, // 10% discount: $70 * 12 * 0.9 = $756
      features: [
        'Everything in Core, plus:',
        'Monthly performance check + light optimization (speed, UX, small fixes)',
        'Lead form monitoring (submission tests + alerts if something breaks)',
        'Google Analytics setup + monthly traffic summary',
        '60 min/month updates (text, images, links, small section tweaks)',
        'Priority support (1 business day)'
      ],
      bestFor: 'Professional individuals, local businesses, service providers',
      popular: true
    },
    {
      id: 'prime',
      name: 'Zenara Prime',
      icon: Gem,
      monthlyPrice: 150,
      annualPrice: 1620, // 10% discount: $150 * 12 * 0.9 = $1620
      features: [
        'Everything in Grow, plus:',
        'Advanced performance tuning (Core Web Vitals)',
        'Integrations support (booking, email, CRM, payments)',
        '120 min/month updates + simple new pages/sections (within included time)',
        'Same-day support'
      ],
      bestFor: 'High-conversion sites, coaches, growing brands',
      popular: false
    }
  ], []);

  const faqs = useMemo(() => [
    {
      question: "What are your web design packages and pricing?",
      answer: "We offer three main packages: Starter ($999) for individuals with 1-3 pages and 1 week turnaround, Small Business ($1,999) for businesses with up to 6 pages and 2-3 weeks turnaround, and Pro ($4,999+) for advanced functionality with unlimited pages and 3-4 weeks turnaround."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes! We offer 50% upfront and 50% on completion for all projects. For Pro projects over $10k, we can discuss custom payment schedules. We accept e-transfers, cheques, and credit cards."
    },
    {
      question: "How long does it take to build a website?",
      answer: "Our timelines are: Starter (1 week), Small Business (2-3 weeks), and Pro (3-4 weeks). These timelines include design, development, testing, and launch. We work efficiently while ensuring quality results."
    },
    {
      question: "What's included in each pricing plan?",
      answer: "Starter includes 1-3 pages and basic features. Small Business includes up to 6 pages with custom sections and 2 revisions. Pro includes unlimited pages, advanced integrations, and priority support. All plans include mobile optimization, SEO basics, SSL security, and hosting."
    },
    {
      question: "Do you provide business card design services?",
      answer: "Yes! We offer professional business card design services across the GTA. Our packages range from $149-$399 for professional cards and $299-$599 for executive cards with premium finishes like foil stamping and embossing."
    },
    {
      question: "Can you help with e-commerce development?",
      answer: "Yes! We specialize in e-commerce development using platforms like Shopify, WooCommerce, and custom solutions. Small e-commerce stores start at $2,999-$4,999, with enterprise solutions available by quote."
    },
    {
      question: "Are there any hidden costs?",
      answer: "No hidden costs! Our pricing is transparent and includes everything listed. The only additional costs would be if you request features beyond what's included in your chosen plan, and we'll always discuss these upfront."
    },
    {
      question: "Do you handle hosting and domain setup?",
      answer: "Yes! We can handle hosting internally for $10-$30/month (SSL included) or help you set up with external providers. We also assist with domain registration and DNS setup."
    },
    {
      question: "What happens if I'm not satisfied with the design?",
      answer: "We work closely with you throughout the process to ensure you love the result. If you're not satisfied, we'll work with you to make it right. Our goal is your success and satisfaction."
    },
    {
      question: "Can I upgrade my plan during the project?",
      answer: "Absolutely! You can upgrade from Starter to Small Business or Pro at any time. We'll adjust the pricing accordingly and add the new features to your project."
    }
  ], []);

  return (
    <div className="min-h-screen" role="main" aria-label="Pricing page">

      {/* Pricing Cards - Space Theme */}
      <section className="pricing-hero py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-16 sm:pt-20 md:pt-24">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <TypingTextSection 
                text="Simple Pricing Plans" 
                className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1" 
              />
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Choose the plan that fits your needs. Professional web design services for Toronto & GTA businesses.
            </p>
          </div>
          
          <div className="pricing-grid grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`group relative ${plan.popular ? 'lg:scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-2xl whitespace-nowrap">
                      <Star className="h-4 w-4 fill-current flex-shrink-0" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className={`pricing-card pricing-card-container bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border shadow-2xl transition-all duration-500 min-h-[600px] flex flex-col relative overflow-hidden group-hover:-translate-y-2 ${plan.popular ? 'border-cyan-500/50 shadow-cyan-500/20' : 'border-slate-800/50'}`}>
                  {/* Box glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                  
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
                      <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-white tracking-tight">{plan.name}</h3>
                      <p className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-light mb-3 sm:mb-4 text-sm sm:text-base">{plan.subtitle}</p>
                      <div className="text-4xl sm:text-5xl font-light mb-3 sm:mb-4 text-white">{plan.price}</div>
                      <p className="text-white/60 text-base sm:text-lg font-light">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex-shrink-0">
                      <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 w-full">
                        <Button 
                          asChild 
                          className="relative overflow-hidden w-full bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold group"
                        >
                          <Link to="/contact">
                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                            <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                              {plan.cta}
                              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 sm:mt-16">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
              <div className="relative z-10">
                <p className="text-white/60 mb-4 sm:mb-6 text-base sm:text-lg font-light">
                  Have a custom request? We'll scope it and send a quote within 24 hours.
                </p>
                <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold group">
                    <Link to="/contact">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                        Get Custom Quote
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

      {/* Hosting & Maintenance */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
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
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <TypingTextLines
                lines={['Hosting &', 'Maintenance']}
                className="[&>div:first-child]:block [&>div:last-child]:block [&>div:last-child]:mt-2"
                lineClassName={(index) => {
                  if (index === 0) return "block font-light opacity-90";
                  if (index === 1) return "block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1";
                  return "";
                }}
              />
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
              Keep your website secure, fast, and up-to-date with our managed hosting and maintenance plans
            </p>
          </div>

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
            {subscriptionPlans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <div key={plan.id} className={`group relative ${plan.popular ? 'lg:scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-2xl whitespace-nowrap">
                        <Star className="h-4 w-4 fill-current flex-shrink-0" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={`bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border shadow-lg transition-all duration-500 h-full flex flex-col relative overflow-hidden ${
                    plan.popular 
                      ? 'border-cyan-500/50 shadow-cyan-500/20' 
                      : 'border-slate-800/50'
                  }`}>
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
                        <div className="flex justify-center mb-3">
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center">
                            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                            <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white relative z-10" strokeWidth={2} />
                          </div>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-white tracking-tight">{plan.name}</h3>
                        <div className="text-4xl sm:text-5xl font-light mb-3 sm:mb-4 text-white">
                          ${plan.monthlyPrice}
                          <span className="text-lg sm:text-xl text-white/60 font-light">
                            /month
                          </span>
                        </div>
                        <p className="text-white/60 text-sm sm:text-base mt-3 font-light">{plan.bestFor}</p>
                      </div>

                      <ul className="space-y-3 sm:space-y-4 flex-grow">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5 text-cyan-400" />
                            <span className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Optional Note */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-white/60 text-sm sm:text-base max-w-3xl mx-auto font-light">
              <em>Complex custom development, e-commerce, and major redesigns are quoted separately.</em>
            </p>
          </div>
        </div>
      </section>

      {/* Additional Services Pricing */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <TypingTextLines
                lines={['Additional Services', 'Pricing']}
                className="[&>div:first-child]:block [&>div:last-child]:block [&>div:last-child]:mt-2"
                lineClassName={(index) => {
                  if (index === 0) return "block font-light opacity-90";
                  if (index === 1) return "block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1";
                  return "";
                }}
              />
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
              Complete pricing for all our web design, business card, and logo design services in Toronto & GTA
            </p>
          </div>

          <div className="space-y-12">
            {additionalServices.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl relative overflow-hidden">
                {/* Box glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-white tracking-tight">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                        <h4 className="text-xl sm:text-2xl font-semibold text-white mb-2 tracking-tight">
                          {service.name}
                        </h4>
                        <p className="text-2xl sm:text-3xl font-light mb-3 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                          {service.price}
                        </p>
                        <p className="text-white/60 mb-4 text-sm sm:text-base font-light">
                          {service.description}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-white/60 text-sm font-light">
                              <Check className="h-4 w-4 mr-2 flex-shrink-0 text-cyan-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        {service.idealFor && (
                          <div>
                            <h5 className="text-sm font-light mb-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Ideal for:</h5>
                            <p className="text-white/60 text-sm font-light">
                              {service.idealFor}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-8 sm:p-10 border border-slate-800/50 shadow-2xl relative overflow-hidden">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-white tracking-tight">
                  Why Choose Zenara Designs for Your Toronto Project?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-light mb-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">40%</div>
                    <div className="text-white/60 text-sm sm:text-base font-light">Average Conversion Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-light mb-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">2-4</div>
                    <div className="text-white/60 text-sm sm:text-base font-light">Weeks to Launch</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-light mb-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">98%</div>
                    <div className="text-white/60 text-sm sm:text-base font-light">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-light mb-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">100%</div>
                    <div className="text-white/60 text-sm sm:text-base font-light">Mobile Optimized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Dark Theme */}
      <section className="pricing-faq py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black"></div>
        </div>
        
        {/* Decorative gradient panels */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-purple-500/5 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">FAQ</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:items-start">
            {/* Left Column Accordion */}
            <Accordion type="single" collapsible className="w-full space-y-4 sm:space-y-6 flex flex-col">
              {faqs.slice(0, 5).map((faq, index) => (
                <AccordionItem 
                  key={`left-item-${index + 1}`} 
                  value={`left-item-${index + 1}`}
                  className="border border-slate-800/50 rounded-xl bg-slate-900/90 backdrop-blur-sm data-[state=open]:bg-gradient-to-r data-[state=open]:from-cyan-500/20 data-[state=open]:via-purple-500/20 data-[state=open]:to-cyan-500/20 data-[state=open]:border-cyan-500/50 transition-all duration-200 relative overflow-hidden min-h-[80px] sm:min-h-[90px] flex flex-col"
                >
                  {/* Vertical bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-300 via-purple-300 to-cyan-300 rounded-l-xl z-10"></div>
                  <AccordionTrigger 
                    className="px-4 sm:px-6 py-4 sm:py-5 hover:no-underline text-left data-[state=closed]:text-white/80 data-[state=open]:text-white relative overflow-hidden group w-full min-h-[80px] sm:min-h-[90px] flex items-center pl-5 sm:pl-7"
                  >
                    {/* Hover background animation - left to right */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-xl"></div>
                    <span className="font-light text-base sm:text-lg pr-4 flex-1 relative z-10 group-hover:text-white transition-colors duration-300">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 data-[state=closed]:text-white/60 data-[state=open]:text-white group-hover:text-white transition-all duration-200 relative z-10" />
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-5 text-white/60 text-sm sm:text-base leading-relaxed font-light">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Right Column Accordion */}
            <Accordion type="single" collapsible className="w-full space-y-4 sm:space-y-6 flex flex-col">
              {faqs.slice(5, 10).map((faq, index) => (
                <AccordionItem 
                  key={`right-item-${index + 1}`} 
                  value={`right-item-${index + 1}`}
                  className="border border-slate-800/50 rounded-xl bg-slate-900/90 backdrop-blur-sm data-[state=open]:bg-gradient-to-r data-[state=open]:from-cyan-500/20 data-[state=open]:via-purple-500/20 data-[state=open]:to-cyan-500/20 data-[state=open]:border-cyan-500/50 transition-all duration-200 relative overflow-hidden min-h-[80px] sm:min-h-[90px] flex flex-col"
                >
                  {/* Vertical bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-300 via-purple-300 to-cyan-300 rounded-l-xl z-10"></div>
                  <AccordionTrigger 
                    className="px-4 sm:px-6 py-4 sm:py-5 hover:no-underline text-left data-[state=closed]:text-white/80 data-[state=open]:text-white relative overflow-hidden group w-full min-h-[80px] sm:min-h-[90px] flex items-center pl-5 sm:pl-7"
                  >
                    {/* Hover background animation - left to right */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-xl"></div>
                    <span className="font-light text-base sm:text-lg pr-4 flex-1 relative z-10 group-hover:text-white transition-colors duration-300">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 data-[state=closed]:text-white/60 data-[state=open]:text-white group-hover:text-white transition-all duration-200 relative z-10" />
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-5 text-white/60 text-sm sm:text-base leading-relaxed font-light">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* Last Updated Date */}
          <div className="text-center mt-12">
            <p className="text-white/40 text-sm font-light">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <StructuredData 
        type="product" 
        products={pricingPlans}
      />
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Pricing', url: '/pricing' }
        ]} 
      />
    </div>
  );
};

export default memo(Pricing);