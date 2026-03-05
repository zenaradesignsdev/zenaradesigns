import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap, Target, Shield, Code2, Users, Rocket, CheckCircle, Star, TrendingUp, Clock, Award, Sparkles, Heart, Globe, ArrowUpRight, Compass, Palette, BarChart, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollToTop, useSEO } from '@/hooks';
import { PERFORMANCE_THRESHOLDS } from '@/lib/constants';
import type { Capability, Differentiator, SuccessMetric, AnimatedNumbers } from '@/lib/types';
import logo from '@/assets/zenara-logo-v5.svg';
import realEstateWebImage from '@/assets/website-example-realestate.png';
import rocketWebImage from '@/assets/website-example-rocket.png';
import gardenWebImage from '@/assets/website-example-garden.png';
import travelWebImage from '@/assets/website-example-travel.png';
import shopifyLogo from '@/assets/shopify.svg';
import vercelLogo from '@/assets/vercel.svg';
import cloudflareLogo from '@/assets/cloudflare.svg';
import stripeLogo from '@/assets/stripe-2.svg';
import figmaLogo from '@/assets/figma.svg';
import calendlyLogo from '@/assets/calendly.svg';
import namecheapLogo from '@/assets/namecheap.svg';
import googleAnalyticsLogo from '@/assets/googleanalytics.svg';
import instagramLogo from '@/assets/instagram.svg';
import { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import StructuredData from '@/components/StructuredData';
import GoogleReviews from '@/components/GoogleReviews';
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

// Component for multi-line typing animation (sequential)
const TypingTextLines = ({ lines, className = '', lineClassName = '', customLineRender }: { 
  lines: string[]; 
  className?: string; 
  lineClassName?: string | ((index: number, totalLines: number) => string);
  customLineRender?: (line: string, index: number) => React.ReactNode;
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
        
        if (customLineRender) {
          return (
            <div key={index} className={`${lineClassName} relative w-full`} style={{ minHeight: 'clamp(1.2em, 4vw, 1.5em)' }}>
              {/* Invisible placeholder to reserve space */}
              <span className="invisible block w-full break-words" aria-hidden="true">{line}</span>
              {/* Typing text overlay */}
              <span className="absolute left-0 top-0 block w-full break-words">
                {customLineRender(line, index)}
              </span>
            </div>
          );
        }
        
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

// Sequential typing for "Bring your" then "ideas to life" with gradient on "ideas"
const BringIdeasToLifeTyping = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [line1Complete, setLine1Complete] = useState(false);
  const [line2Start, setLine2Start] = useState(false);

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
      { threshold: 0.2, rootMargin: '0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={containerRef} className="w-full">
      {/* Line 1: "Bring your" */}
      <div className="relative block font-light opacity-90 w-full" style={{ minHeight: 'clamp(1.2em, 4vw, 1.5em)' }}>
        <span className="invisible block w-full break-words" aria-hidden="true">Bring your</span>
        <span className="absolute left-0 top-0 block w-full break-words">
          <TypingTextLine
            text="Bring your"
            startTyping={isVisible}
            onComplete={() => {
              setTimeout(() => setLine2Start(true), 200);
            }}
            className=""
          />
        </span>
      </div>
      {/* Line 2: "ideas to life" */}
      <div className="relative block mt-1 sm:mt-1.5 w-full" style={{ minHeight: 'clamp(1.2em, 4vw, 1.5em)' }}>
        <span className="invisible block w-full break-words" aria-hidden="true">
          <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">ideas</span> <span className="font-light">to life</span>
        </span>
        <span className="absolute left-0 top-0 block w-full break-words">
          <TypingTextLine
            text="ideas"
            startTyping={line2Start}
            onComplete={() => {}}
            className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal"
          />{' '}
          <TypingTextLine
            text="to life"
            startTyping={line2Start}
            onComplete={() => {}}
            className="font-light"
          />
        </span>
      </div>
    </div>
  );
};

const Home = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Web Design Toronto | Business Cards & Logo Design | Zenara",
    description: "Toronto's leading web design agency. Professional websites, business cards & logo design for GTA businesses. Modern, fast, secure solutions.",
    canonical: "https://zenaradesigns.com",
    structuredData: {
      type: 'localBusiness'
    }
  });
  
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const slogans = useMemo(() => ['Build', 'Launch', 'Scale'], []);
  const [animatedNumbers, setAnimatedNumbers] = useState<AnimatedNumbers>({
    conversion: 0,
    weeks: "1-2",
    satisfaction: 0,
    mobile: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const yearsAnimatedRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Loading screen animation
  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);
    
    // Hide completely after fade out completes
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => {
        const next = (prev + 1) % slogans.length;
        return next;
      });
    }, 2000); // Change every 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  const animateNumbers = useCallback(() => {
    const targets = {
      conversion: 40,
      weeks: "1-2", // Keep this static
      satisfaction: 98,
      mobile: 100
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedNumbers({
        conversion: Math.floor(targets.conversion * progress),
        weeks: "1-2", // Always keep this static
        satisfaction: Math.floor(targets.satisfaction * progress),
        mobile: Math.floor(targets.mobile * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedNumbers(targets);
      }
    }, stepDuration);
  }, []);

  // Animated numbers effect
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        animateNumbers();
      }
    });
  }, [isVisible, animateNumbers]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: PERFORMANCE_THRESHOLDS.INTERSECTION_OBSERVER });

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => {
      if (metricsRef.current) {
        observer.unobserve(metricsRef.current);
      }
    };
  }, [handleIntersection]);

  // Cursor glow effect - Hero section only
  useEffect(() => {
    const heroSection = document.querySelector('.cursor-glow') as HTMLElement;
    if (!heroSection) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      heroSection.style.setProperty('--mouse-x', x + 'px');
      heroSection.style.setProperty('--mouse-y', y + 'px');
    };

    const handleMouseLeave = () => {
      heroSection.style.setProperty('--mouse-x', '-100px');
      heroSection.style.setProperty('--mouse-y', '-100px');
    };

    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animate years experience from 0 to 6
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !yearsAnimatedRef.current) {
            yearsAnimatedRef.current = true;
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepDuration = duration / steps;
            const target = 6;

            let step = 0;
            const timer = setInterval(() => {
              step++;
              const progress = step / steps;
              const currentValue = Math.floor(target * progress);
              setYearsExperience(currentValue);

              if (step >= steps) {
                clearInterval(timer);
                setYearsExperience(target);
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (yearsRef.current) {
      observer.observe(yearsRef.current);
    }

    return () => {
      if (yearsRef.current) {
        observer.unobserve(yearsRef.current);
      }
    };
  }, []);

  const capabilities: Capability[] = [
    {
      icon: <Code2 className="h-8 w-8 text-white" />,
      title: "Modern Tech Stack",
      description: "React, Next.js, TypeScript"
    },
    {
      icon: <Target className="h-8 w-8 text-white" />,
      title: "Performance First",
      description: "Lightning fast loading"
    },
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Secure by Design",
      description: "Enterprise-grade security"
    },
    {
      icon: <Globe className="h-8 w-8 text-white" />,
      title: "Mobile Responsive",
      description: "Perfect on all devices"
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "SEO Optimized",
      description: "Search engine ready"
    },
    {
      icon: <Rocket className="h-8 w-8 text-white" />,
      title: "Scalable",
      description: "Grows with your business"
    },
    {
      icon: <Heart className="h-8 w-8 text-white" />,
      title: "User Experience",
      description: "Intuitive and engaging"
    },
    {
      icon: <Star className="h-8 w-8 text-white" />,
      title: "Quality Code",
      description: "Clean and maintainable"
    }
  ];

  const differentiators: Differentiator[] = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Personal Touch",
      description: "Direct access to our team throughout your project. No account managers, no middlemen – just real people who care about your success.",
      highlight: "Direct Communication"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Speed Without Compromise",
      description: "We deliver in 2-4 weeks what others take months to build, without cutting corners on quality or attention to detail.",
      highlight: "Fast & Quality"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Business-Focused Design",
      description: "Every pixel serves a purpose. We design for conversions, not just aesthetics, ensuring your website drives real business results.",
      highlight: "Results-Driven"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Future-Proof Technology",
      description: "Built with modern, scalable technologies that grow with your business. No technical debt, no outdated frameworks.",
      highlight: "Modern Stack"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Ongoing Partnership",
      description: "We're not just a one-time vendor. We provide ongoing support, updates, and optimizations to keep your site performing at its best.",
      highlight: "Long-term Support"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Transparent Process",
      description: "Clear timelines, regular updates, and honest communication. You always know exactly what's happening and when it'll be done.",
      highlight: "No Surprises"
    }
  ];

  const successMetrics: SuccessMetric[] = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      number: "40%",
      label: "Average Conversion Increase",
      description: "Our clients see significant improvements in their conversion rates"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      number: "2-4",
      label: "Weeks to Launch",
      description: "From concept to live website in record time"
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "98%",
      label: "Client Satisfaction",
      description: "Happy clients who recommend us to others"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      number: "100%",
      label: "Mobile Optimized",
      description: "Every site is perfectly responsive across all devices"
    }
  ];

  return (
    <div className="m-0 p-0" role="main" aria-label="Home page">
      {/* Full-Screen Loading Animation */}
      {isLoading && (
        <div className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-1000 ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/40 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/30 to-black"></div>
          
          {/* Animated stars in background */}
          <div className="absolute inset-0">
            <div className="bg-star" style={{ top: '20%', left: '15%', animationDelay: '0s' }}></div>
            <div className="bg-star" style={{ top: '40%', left: '25%', animationDelay: '0.5s' }}></div>
            <div className="bg-star" style={{ top: '60%', left: '10%', animationDelay: '1s' }}></div>
            <div className="bg-star" style={{ top: '30%', left: '70%', animationDelay: '0.3s' }}></div>
            <div className="bg-star" style={{ top: '70%', left: '80%', animationDelay: '0.8s' }}></div>
          </div>
          
          {/* Logo with entrance animation */}
          <div className="relative z-10 loading-logo-entrance">
            <img 
              src={logo} 
              alt="Zenara Designs Logo" 
              className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 60px rgba(0, 0, 0, 0.5))' }}
              width="384"
              height="384"
              loading="eager"
              decoding="async"
            />
            {/* Glow effect around logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl -z-10 loading-glow"></div>
          </div>
        </div>
      )}
      
      {/* Space-Themed Hero Section */}
      <section className="hero-section h-screen flex items-center justify-center relative overflow-hidden bg-black cursor-glow z-10" role="banner" aria-label="Hero section">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
          {/* Accent gradients with theme colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Shooting Stars */}
          <div className="shooting-star shooting-star-1"></div>
          <div className="shooting-star shooting-star-2"></div>
          <div className="shooting-star shooting-star-3"></div>
          <div className="shooting-star shooting-star-4"></div>
          <div className="shooting-star shooting-star-5"></div>
          
          {/* Background Stars */}
          <div className="bg-star bg-star-1"></div>
          <div className="bg-star bg-star-2"></div>
          <div className="bg-star bg-star-3"></div>
          <div className="bg-star bg-star-4"></div>
          <div className="bg-star bg-star-5"></div>
          <div className="bg-star bg-star-6"></div>
          <div className="bg-star bg-star-7"></div>
          <div className="bg-star bg-star-8"></div>
          <div className="bg-star bg-star-9"></div>
          <div className="bg-star bg-star-10"></div>
          <div className="bg-star bg-star-11"></div>
          <div className="bg-star bg-star-12"></div>
          <div className="bg-star bg-star-13"></div>
          <div className="bg-star bg-star-14"></div>
          <div className="bg-star bg-star-15"></div>
          <div className="bg-star bg-star-16"></div>
          <div className="bg-star bg-star-17"></div>
          <div className="bg-star bg-star-18"></div>
          <div className="bg-star bg-star-19"></div>
          <div className="bg-star bg-star-20"></div>
          
          {/* Floating Particles */}
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
          <div className="particle particle-7"></div>
          <div className="particle particle-8"></div>
          
          {/* Cyan/Purple Nebula Effects - Matching Theme Colors */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-300/20 via-purple-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-300/20 via-cyan-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-900/25 to-cyan-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Additional Cyan/Purple Accents */}
          <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-gradient-to-r from-cyan-300/15 via-purple-300/15 to-cyan-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 left-1/6 w-56 h-56 bg-gradient-to-r from-purple-300/15 to-cyan-300/15 rounded-full blur-3xl animate-pulse delay-1500"></div>
          <div className="absolute top-2/3 right-1/6 w-48 h-48 bg-gradient-to-r from-cyan-900/20 via-cyan-300/15 to-purple-300/15 rounded-full blur-3xl animate-pulse delay-2500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 h-full flex items-center pt-16 sm:pt-20 md:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-10 lg:gap-12 items-center w-full">
            <div className="fade-in order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-8xl font-light mb-4 sm:mb-6 leading-[1.1] text-white tracking-[-0.02em] hero-text-fade">
                <span className="block pb-1">
                  Modern Web Design. <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    <span key={currentSlogan} className="cool-text-animation">{slogans[currentSlogan]}</span>
                  </span>
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 leading-[1.7] font-light tracking-[0.01em] max-w-2xl mx-auto lg:mx-0">
                Zenara Designs creates high-performing websites for Toronto & GTA businesses and professionals using modern development workflows.
              </p>
              <div className="flex justify-center lg:justify-start hero-button-slide">
                <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-8 py-6 sm:px-10 sm:py-7 text-lg sm:text-xl font-semibold group">
                    <Link to="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="relative z-10 group-hover:text-white">
                        Launch Your Project
                      </span>
                      <Rocket className="ml-2 h-6 w-6 relative z-10" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] h-[180px] xs:h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] mx-auto relative flex items-center justify-center">
                {/* Orbital Rings */}
                <div className="absolute inset-0 border border-teal-500/20 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-4 border border-purple-500/20 rounded-full animate-spin-slow-reverse"></div>
                <div className="absolute inset-8 border border-cyan-500/20 rounded-full animate-spin-slow"></div>
                
                {/* Central Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                
                {/* Logo with Space Effects */}
                <div className="relative z-10 group hero-logo-zoom">
                  <img 
                    src={logo} 
                    alt="Zenara Designs - Professional Web Design Agency Toronto Logo" 
                    className="w-full max-w-[180px] xs:max-w-[200px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[350px] h-auto object-contain animate-float animate-spin-slow"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 40px rgba(0, 0, 0, 0.3))' }}
                    width="350"
                    height="350"
                    loading="eager"
                    decoding="async"
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-purple-500/0 rounded-full blur-xl group-hover:from-teal-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                </div>
                
                {/* Floating Stars around logo */}
                <div className="absolute top-8 left-8 w-2 h-2 bg-white rounded-full animate-twinkle"></div>
                <div className="absolute top-16 right-12 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle delay-500"></div>
                <div className="absolute bottom-20 left-16 w-1.5 h-1.5 bg-teal-300 rounded-full animate-twinkle delay-1000"></div>
                <div className="absolute bottom-12 right-8 w-1 h-1 bg-purple-300 rounded-full animate-twinkle delay-1500"></div>
                <div className="absolute top-1/2 left-4 w-1 h-1 bg-yellow-300 rounded-full animate-twinkle delay-2000"></div>
                <div className="absolute top-1/3 right-4 w-1.5 h-1.5 bg-violet-300 rounded-full animate-twinkle delay-2500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Than a Web Design Agency & Our Trusted Partners */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden bg-black" aria-label="About Zenara">
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          {/* Background Stars - More stars across the full section */}
          <div className="bg-star" style={{ top: '3%', left: '2%' }}></div>
          <div className="bg-star" style={{ top: '5%', left: '8%' }}></div>
          <div className="bg-star" style={{ top: '8%', left: '15%' }}></div>
          <div className="bg-star" style={{ top: '12%', left: '22%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '30%' }}></div>
          <div className="bg-star" style={{ top: '15%', left: '38%' }}></div>
          <div className="bg-star" style={{ top: '9%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '18%', left: '52%' }}></div>
          <div className="bg-star" style={{ top: '7%', left: '60%' }}></div>
          <div className="bg-star" style={{ top: '14%', left: '68%' }}></div>
          <div className="bg-star" style={{ top: '11%', left: '75%' }}></div>
          <div className="bg-star" style={{ top: '20%', left: '82%' }}></div>
          
          <div className="bg-star" style={{ top: '25%', left: '5%' }}></div>
          <div className="bg-star" style={{ top: '28%', left: '12%' }}></div>
          <div className="bg-star" style={{ top: '32%', left: '20%' }}></div>
          <div className="bg-star" style={{ top: '26%', left: '28%' }}></div>
          <div className="bg-star" style={{ top: '35%', left: '35%' }}></div>
          <div className="bg-star" style={{ top: '29%', left: '42%' }}></div>
          <div className="bg-star" style={{ top: '38%', left: '50%' }}></div>
          <div className="bg-star" style={{ top: '27%', left: '58%' }}></div>
          <div className="bg-star" style={{ top: '34%', left: '65%' }}></div>
          <div className="bg-star" style={{ top: '31%', left: '72%' }}></div>
          <div className="bg-star" style={{ top: '40%', left: '80%' }}></div>
          <div className="bg-star" style={{ top: '24%', left: '88%' }}></div>
          
          <div className="bg-star" style={{ top: '45%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '48%', left: '10%' }}></div>
          <div className="bg-star" style={{ top: '42%', left: '18%' }}></div>
          <div className="bg-star" style={{ top: '51%', left: '25%' }}></div>
          <div className="bg-star" style={{ top: '47%', left: '33%' }}></div>
          <div className="bg-star" style={{ top: '44%', left: '40%' }}></div>
          <div className="bg-star" style={{ top: '49%', left: '48%' }}></div>
          <div className="bg-star" style={{ top: '46%', left: '55%' }}></div>
          <div className="bg-star" style={{ top: '52%', left: '63%' }}></div>
          <div className="bg-star" style={{ top: '43%', left: '70%' }}></div>
          <div className="bg-star" style={{ top: '50%', left: '78%' }}></div>
          <div className="bg-star" style={{ top: '48%', left: '85%' }}></div>
          
          <div className="bg-star" style={{ top: '55%', left: '6%' }}></div>
          <div className="bg-star" style={{ top: '58%', left: '14%' }}></div>
          <div className="bg-star" style={{ top: '62%', left: '22%' }}></div>
          <div className="bg-star" style={{ top: '56%', left: '30%' }}></div>
          <div className="bg-star" style={{ top: '65%', left: '38%' }}></div>
          <div className="bg-star" style={{ top: '59%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '68%', left: '53%' }}></div>
          <div className="bg-star" style={{ top: '57%', left: '61%' }}></div>
          <div className="bg-star" style={{ top: '64%', left: '69%' }}></div>
          <div className="bg-star" style={{ top: '61%', left: '76%' }}></div>
          <div className="bg-star" style={{ top: '70%', left: '84%' }}></div>
          <div className="bg-star" style={{ top: '54%', left: '91%' }}></div>
          
          <div className="bg-star" style={{ top: '75%', left: '4%' }}></div>
          <div className="bg-star" style={{ top: '78%', left: '11%' }}></div>
          <div className="bg-star" style={{ top: '72%', left: '19%' }}></div>
          <div className="bg-star" style={{ top: '81%', left: '27%' }}></div>
          <div className="bg-star" style={{ top: '77%', left: '35%' }}></div>
          <div className="bg-star" style={{ top: '74%', left: '42%' }}></div>
          <div className="bg-star" style={{ top: '79%', left: '50%' }}></div>
          <div className="bg-star" style={{ top: '76%', left: '58%' }}></div>
          <div className="bg-star" style={{ top: '82%', left: '66%' }}></div>
          <div className="bg-star" style={{ top: '73%', left: '73%' }}></div>
          <div className="bg-star" style={{ top: '80%', left: '81%' }}></div>
          <div className="bg-star" style={{ top: '78%', left: '89%' }}></div>
          
          <div className="bg-star" style={{ top: '85%', left: '7%' }}></div>
          <div className="bg-star" style={{ top: '88%', left: '15%' }}></div>
          <div className="bg-star" style={{ top: '92%', left: '23%' }}></div>
          <div className="bg-star" style={{ top: '86%', left: '31%' }}></div>
          <div className="bg-star" style={{ top: '95%', left: '39%' }}></div>
          <div className="bg-star" style={{ top: '89%', left: '47%' }}></div>
          <div className="bg-star" style={{ top: '98%', left: '55%' }}></div>
          <div className="bg-star" style={{ top: '87%', left: '63%' }}></div>
          <div className="bg-star" style={{ top: '94%', left: '71%' }}></div>
          <div className="bg-star" style={{ top: '91%', left: '79%' }}></div>
          <div className="bg-star" style={{ top: '96%', left: '87%' }}></div>
          
          {/* Subtle Nebula Effects - More subtle for black background */}
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Top Section - Text Content with Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-[-0.02em]">
                <TypingTextLines 
                  lines={['So much more than', 'a web design agency.']} 
                  className="[&>div:first-child]:block [&>div:last-child]:block [&>div:last-child]:mt-1"
                />
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 leading-[1.1] tracking-[-0.02em] mt-4">
                <span>We are your </span>
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">IT team</span>.
              </h3>
            </div>
            
            {/* Right Side - Years of Experience */}
            <div className="text-center" ref={yearsRef}>
              <div className="inline-block">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient leading-none">
                  {yearsExperience}+
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-white/80 mt-2 sm:mt-4 tracking-wide">
                  Years of Experience
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="py-12 sm:py-16 mb-12 sm:mb-16">
            <div className="max-w-7xl mx-auto">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 via-purple-500/60 to-transparent"></div>
            </div>
          </div>

          {/* Our Trusted Partners Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 leading-[0.95] tracking-[-0.04em]">
              <span className="font-light">Our Trusted </span>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Partners</span>
            </h3>
          </div>
          
          {/* Carousel Container - No visible border/box */}
          <div className="relative overflow-hidden -mx-4 sm:-mx-6" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            {/* Fade effects */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, black, transparent)' }}></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, black, transparent)' }}></div>
            
            <div className="flex animate-scroll-smooth space-x-8 sm:space-x-12 md:space-x-16 lg:space-x-20 relative z-10 py-4">
              {/* Company logos array */}
              {[
                { name: 'Shopify', logo: shopifyLogo },
                { name: 'Vercel', logo: vercelLogo },
                { name: 'Cloudflare', logo: cloudflareLogo },
                { name: 'Stripe', logo: stripeLogo },
                { name: 'Figma', logo: figmaLogo },
                { name: 'Calendly', logo: calendlyLogo },
                { name: 'Namecheap', logo: namecheapLogo },
                { name: 'Google Analytics', logo: googleAnalyticsLogo },
                { name: 'Instagram', logo: instagramLogo },
              ].map((company, index) => (
                <div key={index} className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 sm:h-20 md:h-24 px-4 sm:px-6 md:px-8">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                      style={{ filter: 'brightness(0) invert(1)' }}
                      loading="lazy"
                    />
                    </div>
                    </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { name: 'Shopify', logo: shopifyLogo },
                { name: 'Vercel', logo: vercelLogo },
                { name: 'Cloudflare', logo: cloudflareLogo },
                { name: 'Stripe', logo: stripeLogo },
                { name: 'Figma', logo: figmaLogo },
                { name: 'Calendly', logo: calendlyLogo },
                { name: 'Namecheap', logo: namecheapLogo },
                { name: 'Google Analytics', logo: googleAnalyticsLogo },
                { name: 'Instagram', logo: instagramLogo },
              ].map((company, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 sm:h-20 md:h-24 px-4 sm:px-6 md:px-8">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                      style={{ filter: 'brightness(0) invert(1)' }}
                      loading="lazy"
                    />
                  </div>
              </div>
            ))}
              {/* Third set for seamless loop */}
              {[
                { name: 'Shopify', logo: shopifyLogo },
                { name: 'Vercel', logo: vercelLogo },
                { name: 'Cloudflare', logo: cloudflareLogo },
                { name: 'Stripe', logo: stripeLogo },
                { name: 'Figma', logo: figmaLogo },
                { name: 'Calendly', logo: calendlyLogo },
                { name: 'Namecheap', logo: namecheapLogo },
                { name: 'Google Analytics', logo: googleAnalyticsLogo },
                { name: 'Instagram', logo: instagramLogo },
              ].map((company, index) => (
                <div key={`duplicate-2-${index}`} className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 sm:h-20 md:h-24 px-4 sm:px-6 md:px-8">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                      style={{ filter: 'brightness(0) invert(1)' }}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bring Your Ideas to Life - Gamma Inspired */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900" aria-label="Portfolio showcase">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[0.95] tracking-[-0.04em]">
                <BringIdeasToLifeTyping />
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-white/60 leading-[1.7] max-w-lg mx-auto lg:mx-0 font-light tracking-[0.01em]">
                At Zenara Designs we specialize in creating beautiful websites for any industry and we work with you to bring your vision to life without all the technical details so you can focus on your core business.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <div className="relative inline-block rounded-full p-[3.5px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-7 py-5 sm:px-9 sm:py-6 text-lg sm:text-xl font-semibold group">
                    <Link to="/services" className="flex items-center justify-center relative z-10 group-hover:text-white">
                      <span className="relative z-10">Our Services</span>
                      <Rocket className="ml-2 h-6 w-6 transition-all duration-300 group-hover:text-cyan-400 group-hover:scale-125 relative z-10" />
                      {/* Hover background animation - left to right */}
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Side - Vertical Sliding Animation */}
            <div className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden order-2 lg:order-1">
              {/* Vertical sliding container */}
              <div className="absolute inset-0 flex flex-col animate-vertical-scroll-smooth">
                {/* Website Example 1 */}
                <div className="flex-shrink-0 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6">
                      <div className="h-full bg-white/90 rounded-xl shadow-lg overflow-hidden">
                        <img 
                          src={realEstateWebImage} 
                          alt="Real Estate Website Design Toronto - Professional Property Showcase Platform" 
                          className="w-full h-full object-cover"
                          width="400"
                          height="225"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">Real Estate</h3>
                      <p className="text-slate-300 text-sm">Property showcase platform</p>
                    </div>
                  </div>
                </div>
                
                {/* Website Example 2 */}
                <div className="flex-shrink-0 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6">
                      <div className="h-full bg-white/90 rounded-xl shadow-lg overflow-hidden">
                        <img 
                          src={rocketWebImage} 
                          alt="Rocket Launch Website Design Toronto - Modern Tech Startup Platform" 
                          className="w-full h-full object-cover"
                          width="400"
                          height="225"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">Tech Startup</h3>
                      <p className="text-slate-300 text-sm">Innovative tech platform</p>
                    </div>
                  </div>
                </div>
                
                {/* Website Example 3 */}
                <div className="flex-shrink-0 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-pink-500/20 to-cyan-500/20 p-6">
                      <div className="h-full bg-white/90 rounded-xl shadow-lg overflow-hidden">
                        <img 
                          src={gardenWebImage} 
                          alt="Garden & Landscaping Website Design GTA - Professional Horticulture Business Platform" 
                          className="w-full h-full object-cover"
                          width="400"
                          height="225"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">Garden Center</h3>
                      <p className="text-slate-300 text-sm">Eco-friendly business site</p>
                    </div>
                  </div>
                </div>
                
                {/* Website Example 4 */}
                <div className="flex-shrink-0 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-teal-500/20 to-purple-500/20 p-6">
                      <div className="h-full bg-white/90 rounded-xl shadow-lg overflow-hidden">
                        <img 
                          src={travelWebImage} 
                          alt="Travel & Tourism Website Design Toronto - Adventure Booking Platform" 
                          className="w-full h-full object-cover"
                          width="400"
                          height="225"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">Travel Agency</h3>
                      <p className="text-slate-300 text-sm">Adventure booking platform</p>
                    </div>
                  </div>
                </div>
                
                {/* Duplicate for seamless loop */}
                {/* Website Example 1 (Duplicate) */}
                <div className="flex-shrink-0 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6">
                      <div className="h-full bg-white/90 rounded-xl shadow-lg overflow-hidden">
                        <img 
                          src={realEstateWebImage} 
                          alt="Real Estate Website Design Toronto - Property Showcase Platform" 
                          className="w-full h-full object-cover"
                          width="400"
                          height="225"
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">Real Estate</h3>
                      <p className="text-slate-300 text-sm">Property showcase platform</p>
                    </div>
                  </div>
                </div>
                
                {/* Website Example 2 (Duplicate) */}
                <div className="flex-shrink-0 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6">
                      <div className="h-full bg-white/90 rounded-xl shadow-lg overflow-hidden">
                        <img 
                          src={rocketWebImage} 
                          alt="Rocket Launch Website Design Toronto - Modern Tech Startup Platform" 
                          className="w-full h-full object-cover"
                          width="400"
                          height="225"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">Tech Startup</h3>
                      <p className="text-slate-300 text-sm">Innovative tech platform</p>
                    </div>
                  </div>
                </div>
                
                {/* Website Example 3 (Duplicate) */}
                <div className="flex-shrink-0 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-pink-500/20 to-cyan-500/20 p-6">
                      <div className="h-full bg-white/90 rounded-xl shadow-lg overflow-hidden">
                        <img 
                          src={gardenWebImage} 
                          alt="Garden & Landscaping Website Design GTA - Professional Horticulture Business Platform" 
                          className="w-full h-full object-cover"
                          width="400"
                          height="225"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">Garden Center</h3>
                      <p className="text-slate-300 text-sm">Eco-friendly business site</p>
                    </div>
                  </div>
                </div>
                
                {/* Website Example 4 (Duplicate) */}
                <div className="flex-shrink-0 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-teal-500/20 to-purple-500/20 p-6">
                      <div className="h-full bg-white/90 rounded-xl shadow-lg overflow-hidden">
                        <img 
                          src={travelWebImage} 
                          alt="Travel & Tourism Website Design Toronto - Adventure Booking Platform" 
                          className="w-full h-full object-cover"
                          width="400"
                          height="225"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">Travel Agency</h3>
                      <p className="text-slate-300 text-sm">Adventure booking platform</p>
                    </div>
                  </div>
          </div>
              </div>
              
              {/* Fade effects for top and bottom */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-900 via-cyan-900/50 to-transparent pointer-events-none z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 via-cyan-900/50 to-transparent pointer-events-none z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-black">
        {/* Background Glowing Lines - Curved from top corners */}
        <div className="absolute inset-0 overflow-hidden">
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
        

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Upper Section - Headline */}
          <div className="text-center mb-12 sm:mb-16 relative z-20">
            {/* Modern Typography with Elegant Spacing */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 sm:mb-10 leading-[0.95] tracking-[-0.04em] text-center">
              <TypingTextLines 
                lines={['Where Innovation', 'Meets Excellence']}
                className="inline-block w-full max-w-full [&>div:first-child]:block [&>div:first-child]:font-light [&>div:first-child]:opacity-90 [&>div:last-child]:block [&>div:last-child]:mt-2 sm:[&>div:last-child]:mt-2.5"
                lineClassName={(index) => {
                  if (index === 0) return "block font-light opacity-90";
                  if (index === 1) return "block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal";
                  return "";
                }}
              />
            </h2>
            
            {/* Refined Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/60 mb-12 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
              Elevating brands through strategic design, cutting-edge technology, and results-driven solutions.
            </p>
          </div>

          {/* Lower Section - Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative z-20">
            {/* Card 1: Discovery & Planning */}
            <div className="group relative bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Box glow - permanent with subtle pulse */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/15 via-cyan-500/8 to-cyan-500/15 blur-2xl opacity-60 animate-pulse"></div>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20 blur-sm opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="relative w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    {/* Icon background glow - permanent with animation */}
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-cyan-400/30 via-cyan-500/20 to-cyan-400/30 blur-md opacity-70 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-sm"></div>
                    <Compass className="h-5 w-5 text-cyan-400 relative z-10 drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight">Discovery & Planning</h3>
                <p className="text-white/60 text-xs sm:text-sm leading-[1.6] font-light tracking-[0.01em]">
                  Understand your goals, audience, and challenges to create a strategic roadmap.
                </p>
              </div>
            </div>

            {/* Card 2: Design & Development */}
            <div className="group relative bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-800/50 hover:border-purple-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Box glow - permanent with subtle pulse */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/15 via-purple-500/8 to-purple-500/15 blur-2xl opacity-60 animate-pulse"></div>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-400/20 via-transparent to-purple-400/20 blur-sm opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="relative w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    {/* Icon background glow - permanent with animation */}
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-purple-400/30 via-purple-500/20 to-purple-400/30 blur-md opacity-70 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-lg bg-purple-400/10 blur-sm"></div>
                    <Palette className="h-5 w-5 text-purple-400 relative z-10 drop-shadow-[0_0_8px_rgba(196,181,253,0.5)]" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight">Design & Development</h3>
                <p className="text-white/60 text-xs sm:text-sm leading-[1.6] font-light tracking-[0.01em]">
                  Build beautiful, functional solutions with modern technology and best practices.
                </p>
              </div>
            </div>

            {/* Card 3: Launch & Optimize */}
            <div className="group relative bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Box glow - permanent with subtle pulse */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/15 via-cyan-500/8 to-cyan-500/15 blur-2xl opacity-60 animate-pulse"></div>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20 blur-sm opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="relative w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    {/* Icon background glow - permanent with animation */}
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-cyan-400/30 via-cyan-500/20 to-cyan-400/30 blur-md opacity-70 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-sm"></div>
                    <BarChart className="h-5 w-5 text-cyan-400 relative z-10 drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight">Launch & Optimize</h3>
                <p className="text-white/60 text-xs sm:text-sm leading-[1.6] font-light tracking-[0.01em]">
                  Deploy your solution and continuously improve performance for maximum results.
                </p>
              </div>
            </div>
                  </div>
                </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
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
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 sm:mb-16 gap-6">
            <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 text-white leading-[0.95] tracking-[-0.04em]">
                  <TypingTextSection text="What Sets Us " className="font-light" />
                  <TypingTextSection 
                    text="Apart" 
                    className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal"
                  />
                </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-[1.7] font-light tracking-[0.01em]">
                We don't just build websites. We craft digital experiences that grow with your business.
              </p>
          </div>
            <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 w-full lg:w-auto">
              <Button asChild className="relative overflow-hidden bg-slate-900 rounded-full text-white px-6 py-3 font-medium transition-all duration-300 w-full group">
                <Link to="/services" className="flex items-center justify-center relative z-10 group-hover:text-white">
                  <span className="relative z-10">What we do</span>
                  <ChevronRight className="ml-2 h-4 w-4 relative z-10" />
                  {/* Hover background animation - left to right */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="relative">
            {/* Navigation Buttons - Hidden on mobile, shown on larger screens */}
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  const scrollAmount = window.innerWidth < 640 ? -280 : window.innerWidth < 1024 ? -320 : -400;
                  scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
              }}
              className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 sm:w-14 sm:h-14 items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 group"
              style={{ background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))', backdropFilter: 'blur(10px)' }}
              aria-label="Scroll left"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white relative z-10" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  const scrollAmount = window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 320 : 400;
                  scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
              }}
              className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 sm:w-14 sm:h-14 items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 group"
              style={{ background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))', backdropFilter: 'blur(10px)' }}
              aria-label="Scroll right"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white relative z-10" strokeWidth={2.5} />
            </button>

            {/* Scrollable Content - Added padding on mobile to prevent overlap */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4 scroll-smooth px-2 sm:px-12 md:px-16"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Feature 1 */}
              <div className="flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[320px] group">
                <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-800/50 hover:border-cyan-500/50 transition-all duration-300 h-full shadow-sm hover:shadow-md">
                  <div className="mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-cyan-500 rounded-2xl flex items-center justify-center mb-4 relative bg-cyan-500/10">
                      <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl transform rotate-12 opacity-60"></div>
                      <Rocket className="h-8 w-8 text-cyan-400 relative z-10" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 tracking-tight">Fast Launch</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-[1.6] font-light tracking-[0.01em]">
                      From concept to live site in 1-2 weeks. No endless revisions, no months of waiting—just results.
                    </p>
                  </div>
                </div>
        </div>
        
              {/* Feature 2 */}
              <div className="flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[320px] group">
                <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-800/50 hover:border-purple-500/50 transition-all duration-300 h-full shadow-sm hover:shadow-md">
                  <div className="mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-cyan-500 rounded-2xl flex items-center justify-center mb-4 relative bg-purple-500/10">
                      <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl transform rotate-12 opacity-60"></div>
                      <Users className="h-8 w-8 text-cyan-400 relative z-10" />
                      </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 tracking-tight">Direct Communication</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-[1.6] font-light tracking-[0.01em]">
                      Talk directly to the team building your site. No account managers, no runaround—just real conversations.
            </p>
                      </div>
                    </div>
                  </div>

              {/* Feature 3 */}
              <div className="flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[320px] group">
                <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-800/50 hover:border-cyan-500/50 transition-all duration-300 h-full shadow-sm hover:shadow-md">
                  <div className="mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-cyan-500 rounded-2xl flex items-center justify-center mb-4 relative bg-cyan-500/10">
                      <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl transform rotate-12 opacity-60"></div>
                      <Zap className="h-8 w-8 text-cyan-400 relative z-10" />
                </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 tracking-tight">Modern Stack</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-[1.6] font-light tracking-[0.01em]">
                      Built with cutting-edge technology that's fast, secure, and scales with your business needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[320px] group">
                <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-800/50 hover:border-purple-500/50 transition-all duration-300 h-full shadow-sm hover:shadow-md">
                  <div className="mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-cyan-500 rounded-2xl flex items-center justify-center mb-4 relative bg-purple-500/10">
                      <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl transform rotate-12 opacity-60"></div>
                      <Heart className="h-8 w-8 text-cyan-400 relative z-10" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 tracking-tight">Ongoing Support</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-[1.6] font-light tracking-[0.01em]">
                      Your site launches, but our relationship doesn't end. We're here for updates, improvements, and growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[320px] group">
                <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-800/50 hover:border-cyan-500/50 transition-all duration-300 h-full shadow-sm hover:shadow-md">
                  <div className="mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-cyan-500 rounded-2xl flex items-center justify-center mb-4 relative bg-cyan-500/10">
                      <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl transform rotate-12 opacity-60"></div>
                      <Shield className="h-8 w-8 text-cyan-400 relative z-10" />
                      </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 tracking-tight">Secure & Reliable</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-[1.6] font-light tracking-[0.01em]">
                      Enterprise-grade security and 99.9% uptime. Your site stays online, your data stays safe.
                    </p>
                      </div>
                    </div>
                  </div>

              {/* Feature 6 */}
              <div className="flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[320px] group">
                <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-800/50 hover:border-violet-500/50 transition-all duration-300 h-full shadow-sm hover:shadow-md">
                  <div className="mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-cyan-500 rounded-2xl flex items-center justify-center mb-4 relative bg-purple-500/10">
                      <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl transform rotate-12 opacity-60"></div>
                      <Star className="h-8 w-8 text-cyan-400 relative z-10" />
                </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 tracking-tight">Toronto Focused</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-[1.6] font-light tracking-[0.01em]">
                      Local expertise for GTA businesses. We understand your market, your customers, and your goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* CTA Band */}
      <section className="py-20 sm:py-28 md:py-32 relative overflow-hidden bg-black">
        {/* Background Effects - Dark with Subtle Theme Colors */}
        <div className="absolute inset-0">
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/80 to-purple-900/40"></div>
          
          {/* Scattered Stars - More dots like screenshot */}
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
              {/* Main Heading - One Line, Smaller */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Let's Build Something</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Amazing</span>
          </h2>
              
              {/* Subheading - Smaller */}
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-10 sm:mb-12 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Our team is ready to provide tailored solutions that drive growth and revenue.
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
        
        {/* Content Updated Date - Outside main content box */}
        <div className="text-center py-4 relative z-10">
          <p className="text-transparent text-sm">
            Content updated: January 2026
          </p>
        </div>
      </section>

      {/* Structured Data for SEO Sitelinks */}
      <StructuredData type="siteNavigation" />
      
      {/* Breadcrumb Schema */}
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[{ name: 'Home', url: '/' }]} 
      />

    </div>
  );
};

export default memo(Home);