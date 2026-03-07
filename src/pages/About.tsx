import { Users, Target, CheckCircle, Sparkles, Zap, Heart, Rocket, Code2, ArrowRight, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollToTop, useSEO } from '@/hooks';
import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { PERFORMANCE_THRESHOLDS } from '@/lib/constants';
import type { TeamMember, ProcessStep, Differentiator, Position } from '@/lib/types';
import logo from '@/assets/zenara-logo-v5.svg';
import { SafeImage } from '@/components/ui/safe-image';
import saturnImage from '@/assets/saturn.png';
import moonImage from '@/assets/moon.png';
import discoveryImage from '@/assets/zenara-discovery.jpg';
import prototypingImage from '@/assets/zenara-prototyping.jpg';
import buildImage from '@/assets/zenara-build.jpg';
import StructuredData from '@/components/StructuredData';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

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

const About = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "About Zenara Designs | Web Design Team Toronto | Zenara",
    description: "Meet Toronto's leading web design team at Zenara Designs. Learn about our expertise, process, and commitment to creating exceptional digital experiences for GTA businesses. Contact us today!",
    canonical: "https://zenaradesigns.com/about"
  });
  
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<number[]>([]);
  const [saturnPosition, setSaturnPosition] = useState<Position>({ scale: 1, x: 0, y: 0, opacity: 0.2 });
  const [moonPosition, setMoonPosition] = useState<Position>({ scale: 0, x: 0, y: 0, opacity: 0 });
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const zenaraDifferenceRef = useRef<HTMLDivElement>(null);


  const team = useMemo((): TeamMember[] => [
    {
      name: "Pratik Mistry",
      role: "Lead Developer", 
      bio: "4-5 years of experience in software engineering with a Computer Engineering degree from University of Ottawa. Passionate about building scalable and efficient web applications."
    },
    {
      name: "Kavin Mural",
      role: "Lead Developer",
      bio: "4-5 years of experience in software engineering with a Computer Science degree from University of Waterloo. Specializes in modern web technologies and full-stack development."
    },
    {
      name: "Ryan Honeybone", 
      role: "UX/UI Designer",
      bio: "3 years of experience in design with a strong educational background from McGill University. Creates intuitive and beautiful user experiences that drive engagement."
    }
  ], []);

  const process = useMemo((): ProcessStep[] => [
    {
      phase: "Discovery",
      details: ["Business goals analysis", "Target audience research", "Competitive landscape review", "Technical requirements gathering"]
    },
    {
      phase: "Prototyping", 
      details: ["Mock-up designs", "Button/links design flow", "Image/video placement design", "Systems design and software architecture"]
    },
    {
      phase: "Build",
      details: ["Modern development practices", "Component-based architecture", "Performance optimization", "Cross-browser testing"]
    },
    {
      phase: "Quality Testing",
      details: ["Performance testing", "Device compatibility check", "SEO optimization", "Mobile responsiveness and optimization", "Custom functionality testing"]
    },
    {
      phase: "Launch",
      details: ["DNS setup & SSL", "CDN configuration", "Analytics integration", "Domain hookup", "Email notification config"]
    },
    {
      phase: "Support",
      details: ["Monthly maintenance", "Content updates", "Security patches", "Performance monitoring"]
    }
  ], []);

  // Timeline animation effect - simple entrance only
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-timeline-index') || '0');
          if (entry.isIntersecting) {
            setVisibleTimelineItems(prev => 
              prev.includes(index) ? prev : [...prev, index]
            );
          }
          // Removed exit animation - items stay visible once they've appeared
        });
      },
      { threshold: PERFORMANCE_THRESHOLDS.INTERSECTION_OBSERVER }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Saturn scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (!heroSectionRef.current) return;

      const section = heroSectionRef.current;
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;
      
      // Start animation when section is 80% visible (earlier trigger)
      const triggerPoint = windowHeight * 0.8; // Start when section top is at 80% of viewport height
      
      if (sectionTop > triggerPoint) {
        // Reset to initial position when section is still mostly visible
        setSaturnPosition({ scale: 1, x: 0, y: 0, opacity: 0.2 });
        return;
      }
      
      // Calculate scroll progress from trigger point to completely past section
      const scrollFromTrigger = Math.max(0, triggerPoint - sectionTop);
      const maxScroll = triggerPoint + sectionHeight; // Total scroll distance
      const scrollProgress = Math.min(1, scrollFromTrigger / maxScroll);
      
      let newPosition = { scale: 1, x: 0, y: 0, opacity: 0.2 };
      
      if (scrollProgress < 0.3) {
        // Phase 1: Zoom in (starts earlier)
        const phaseProgress = scrollProgress / 0.3;
        newPosition.scale = 1 + (1.5 * phaseProgress); // Scale from 1 to 2.5
        newPosition.x = 0;
        newPosition.y = 0;
        newPosition.opacity = 0.2 + (0.3 * phaseProgress); // Increase opacity
      } else {
        // Phase 2: Move left and down, then fade out
        const phaseProgress = (scrollProgress - 0.3) / 0.7;
        newPosition.scale = 2.5; // Keep zoomed in
        newPosition.x = -300 * phaseProgress; // Move left
        newPosition.y = 200 * phaseProgress; // Move down
        newPosition.opacity = 0.5 - (0.5 * phaseProgress); // Fade out
      }
      
      setSaturnPosition(newPosition);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Moon scroll animation for The Zenara Difference section
  useEffect(() => {
    const handleScroll = () => {
      if (!zenaraDifferenceRef.current) return;

      const section = zenaraDifferenceRef.current;
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;
      
      // Start animation when section comes into view
      const triggerPoint = windowHeight * 0.8; // Start when section top is at 80% of viewport height
      
      if (sectionTop > triggerPoint) {
        // Reset to initial position when section is not yet visible
        setMoonPosition({ scale: 0, x: 0, y: 0, opacity: 0 });
        return;
      }
      
      // Calculate scroll progress from trigger point to completely past section
      const scrollFromTrigger = Math.max(0, triggerPoint - sectionTop);
      const maxScroll = triggerPoint + sectionHeight; // Total scroll distance
      const scrollProgress = Math.min(1, scrollFromTrigger / maxScroll);
      
      let newPosition = { scale: 0, x: 0, y: 0, opacity: 0 };
      
      if (scrollProgress < 0.2) {
        // Phase 1: Zoom in and appear
        const phaseProgress = scrollProgress / 0.2;
        newPosition.scale = 1 + (1 * phaseProgress); // Scale from 1 to 2 (smaller final size)
        newPosition.x = 0;
        newPosition.y = 0;
        newPosition.opacity = 0.2 + (0.3 * phaseProgress); // Increase opacity
      } else {
        // Phase 2: Move right and down, then fade out (starts earlier)
        const phaseProgress = (scrollProgress - 0.2) / 0.8;
        newPosition.scale = 2; // Keep zoomed in (smaller size)
        newPosition.x = 500 * phaseProgress; // Move right (more drastic)
        newPosition.y = 400 * phaseProgress; // Move down (more drastic)
        newPosition.opacity = 0.5 - (0.5 * phaseProgress); // Fade out
      }
      
      setMoonPosition(newPosition);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" role="main" aria-label="About page">
      {/* Space-Themed Hero Section */}
      <section ref={heroSectionRef} className="about-hero py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
          {/* Accent gradients with theme colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
        </div>
        {/* Saturn in top right */}
        <div 
          className="absolute top-4 right-4 sm:top-8 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 transition-all duration-300 ease-out"
          style={{
            transform: `scale(${saturnPosition.scale}) translate(${saturnPosition.x}px, ${saturnPosition.y}px)`,
            opacity: saturnPosition.opacity
          }}
        >
          <SafeImage 
            src={saturnImage} 
            alt="Decorative Saturn planet illustration for web design agency background" 
            className="w-full h-full object-contain"
          />
        </div>
        {/* Animated Background Elements */}
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-24 sm:pt-32 md:pt-40 lg:pt-44">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <TypingTextLines
                lines={["We're not just developers,", "we're digital architects"]}
                className="[&>div:first-child]:block [&>div:last-child]:block [&>div:last-child]:mt-2"
                lineClassName={(index) => {
                  if (index === 0) return "block font-light opacity-90";
                  if (index === 1) return "block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1";
                  return "";
                }}
              />
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] mb-8 sm:mb-12 px-4">
              Every business deserves a digital presence that not only looks amazing but drives real results. 
              We bridge the gap between cutting-edge technology and thoughtful design strategy. Based in Toronto and serving the GTA.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16">
              <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 w-full sm:w-auto">
                <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto group">
                  <Link to="/contact">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                    <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                      Start Your Project
                      <Rocket className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Auto-scrolling Carousel */}
            <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden relative">
              <div 
                className="flex gap-8 sm:gap-12" 
                style={{ 
                  width: 'fit-content',
                  animation: 'scroll-horizontal 30s linear infinite'
                }}
              >
                {[
                  "Speed with Quality",
                  "Transparent Communication",
                  "Results-Driven Design",
                  "Clarity over Complexity",
                  "Security First",
                  "Fair Pricing"
                ].map((title, index) => (
                  <div key={index} className="flex-shrink-0">
                    <div className="inline-flex items-center space-x-3 bg-slate-900/90 backdrop-blur-sm rounded-full px-6 py-3 sm:px-8 sm:py-4 border border-slate-800/50">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full"></div>
                      <span className="text-white text-sm sm:text-base md:text-lg font-light whitespace-nowrap">
                        {title}
                      </span>
                    </div>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[
                  "Speed with Quality",
                  "Transparent Communication",
                  "Results-Driven Design",
                  "Clarity over Complexity",
                  "Security First",
                  "Fair Pricing"
                ].map((title, index) => (
                  <div key={`duplicate-${index}`} className="flex-shrink-0">
                    <div className="inline-flex items-center space-x-3 bg-slate-900/90 backdrop-blur-sm rounded-full px-6 py-3 sm:px-8 sm:py-4 border border-slate-800/50">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full"></div>
                      <span className="text-white text-sm sm:text-base md:text-lg font-light whitespace-nowrap">
                        {title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* The Zenara Difference - Space Theme */}
      <section ref={zenaraDifferenceRef} className="about-section py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
        {/* Moon in top left */}
        <div 
          className="absolute top-4 left-4 sm:top-8 sm:left-8 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 transition-all duration-300 ease-out opacity-15"
          style={{
            transform: `scale(${moonPosition.scale}) translate(${moonPosition.x}px, ${moonPosition.y}px)`,
            opacity: moonPosition.opacity * 0.15
          }}
        >
          <SafeImage 
            src={moonImage} 
            alt="Decorative moon illustration for web design agency background" 
            className="w-full h-full object-contain animate-levitate"
          />
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
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <TypingTextLines
                lines={['The', 'Dream Team']}
                className="[&>div:first-child]:block [&>div:last-child]:block [&>div:last-child]:mt-2"
                lineClassName={(index) => {
                  if (index === 0) return "block font-light opacity-90";
                  if (index === 1) return "block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1";
                  return "";
                }}
              />
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Passionate professionals dedicated to turning your vision into digital reality
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <div key={index} className="group h-full">
                <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                  {/* Box glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                  
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center flex flex-col h-full">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl mx-auto mb-4 sm:mb-6 flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg flex-shrink-0 relative">
                      <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                      <Users className="h-8 w-8 sm:h-10 sm:w-10 relative z-10" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white flex-shrink-0 tracking-tight">{member.name}</h3>
                    <p className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-light mb-3 sm:mb-4 text-base sm:text-lg flex-shrink-0">{member.role}</p>
                    <p className="text-white/60 leading-relaxed flex-grow text-sm sm:text-base font-light">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Bring Ideas to Life - Visual Design */}
      <section className="about-timeline py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
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
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <TypingTextLines
                lines={['How We', 'Bring Ideas to Life']}
                className="[&>div:first-child]:block [&>div:last-child]:block [&>div:last-child]:mt-2"
                lineClassName={(index) => {
                  if (index === 0) return "block font-light opacity-90";
                  if (index === 1) return "block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1";
                  return "";
                }}
              />
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              A proven methodology that transforms your vision into a digital masterpiece
            </p>
          </div>
          
          {/* Creative Process Steps with Unique Layout */}
          <div className="relative">
            {/* Step 1: Discovery - Creative split with image bleeding */}
            <div 
              ref={(el) => (timelineRefs.current[0] = el)}
              data-timeline-index={0}
              className={`relative mb-32 sm:mb-40 transition-all duration-500 ease-out ${
                visibleTimelineItems.includes(0) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="relative flex flex-col lg:flex-row items-start gap-0">
                {/* Image - Creative positioning with clip-path */}
                <div className="w-full lg:w-[55%] relative lg:sticky lg:top-24 h-[400px] sm:h-[500px] lg:h-[600px] order-1 group/image">
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Gradient border wrapper */}
                    <div 
                      className="absolute inset-0 p-[2px]"
                      style={{
                        background: 'linear-gradient(135deg, rgb(103, 232, 249), rgb(196, 181, 253), rgb(103, 232, 249))',
                        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
                      }}
                    >
                      <div 
                        className="absolute inset-[2px] overflow-hidden"
                        style={{
                          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
                        }}
                      >
                        <SafeImage 
                          src={discoveryImage} 
                          alt="Modern office workspace for web design discovery phase" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 transition-opacity duration-500 group-hover/image:opacity-0"></div>
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10 pointer-events-none"></div>
                      </div>
                    </div>
                    {/* Outer glow effect */}
                    <div 
                      className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
                      }}
                    ></div>
                  </div>
                  {/* Floating number badge */}
                  <div className="absolute -left-4 top-8 sm:top-12 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-2xl relative z-20 group/badge">
                    {/* Gradient border */}
                    <div className="absolute inset-0 p-[2px] rounded-2xl" style={{ background: 'linear-gradient(135deg, rgb(103, 232, 249), rgb(196, 181, 253), rgb(103, 232, 249))' }}>
                      <div className="absolute inset-[2px] bg-black rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-2xl sm:text-3xl relative z-10">1</span>
                      </div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400/40 via-purple-400/40 to-cyan-400/40 blur-xl animate-pulse rounded-2xl opacity-70 group-hover/badge:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                
                {/* Content - Overlapping with image */}
                <div className="w-full lg:w-[50%] lg:-ml-[5%] relative z-10 order-2 mt-8 lg:mt-24">
                  <div className="bg-slate-900/95 backdrop-blur-xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-3xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{process[0].phase}</span>
                      </h3>
                      <ul className="space-y-4">
                        {process[0].details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-white/70 group/item">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-300 to-purple-300 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                            <span className="text-base sm:text-lg leading-relaxed font-light">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Prototyping - Asymmetric layout */}
            <div 
              ref={(el) => (timelineRefs.current[1] = el)}
              data-timeline-index={1}
              className={`relative mb-32 sm:mb-40 transition-all duration-500 ease-out ${
                visibleTimelineItems.includes(1) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="relative flex flex-col lg:flex-row-reverse items-start gap-0">
                {/* Image - Right side with creative shape */}
                <div className="w-full lg:w-[60%] relative h-[400px] sm:h-[500px] lg:h-[600px] order-1 group/image">
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Gradient border wrapper */}
                    <div 
                      className="absolute inset-0 p-[2px]"
                      style={{
                        background: 'linear-gradient(135deg, rgb(196, 181, 253), rgb(103, 232, 249), rgb(196, 181, 253))',
                        clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                      }}
                    >
                      <div 
                        className="absolute inset-[2px] overflow-hidden"
                        style={{
                          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                        }}
                      >
                        <SafeImage 
                          src={prototypingImage} 
                          alt="Design desk workspace for prototyping phase" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/20 via-transparent to-cyan-500/20 transition-opacity duration-500 group-hover/image:opacity-0"></div>
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-purple-400/10 via-transparent to-cyan-400/10 pointer-events-none"></div>
                      </div>
                    </div>
                    {/* Outer glow effect */}
                    <div 
                      className="absolute -inset-1 bg-gradient-to-bl from-purple-500/20 via-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"
                      style={{
                        clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                      }}
                    ></div>
                  </div>
                  {/* Floating number badge */}
                  <div className="absolute -right-4 top-8 sm:top-12 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-2xl relative z-20 group/badge">
                    {/* Gradient border */}
                    <div className="absolute inset-0 p-[2px] rounded-2xl" style={{ background: 'linear-gradient(135deg, rgb(196, 181, 253), rgb(103, 232, 249), rgb(196, 181, 253))' }}>
                      <div className="absolute inset-[2px] bg-black rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-2xl sm:text-3xl relative z-10">2</span>
                      </div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-purple-400/40 via-cyan-400/40 to-purple-400/40 blur-xl animate-pulse rounded-2xl opacity-70 group-hover/badge:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                
                {/* Content - Left side overlapping */}
                <div className="w-full lg:w-[55%] lg:-mr-[5%] relative z-10 order-2 mt-8 lg:mt-32">
                  <div className="bg-slate-900/95 backdrop-blur-xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 blur-3xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-purple-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{process[1].phase}</span>
                      </h3>
                      <ul className="space-y-4">
                        {process[1].details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-white/70 group/item">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-300 to-cyan-300 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                            <span className="text-base sm:text-lg leading-relaxed font-light">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Build - Full width with image background */}
            <div 
              ref={(el) => (timelineRefs.current[2] = el)}
              data-timeline-index={2}
              className={`relative mb-32 sm:mb-40 transition-all duration-500 ease-out ${
                visibleTimelineItems.includes(2) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative min-h-[500px] sm:min-h-[600px] rounded-3xl overflow-hidden group/image">
                {/* Gradient border */}
                <div className="absolute inset-0 p-[2px] rounded-3xl" style={{ background: 'linear-gradient(135deg, rgb(103, 232, 249), rgb(196, 181, 253), rgb(103, 232, 249))' }}>
                  <div className="absolute inset-[2px] rounded-3xl overflow-hidden">
                    {/* Image background */}
                    <div className="absolute inset-0">
                      <SafeImage 
                        src={buildImage} 
                        alt="Development workspace for build phase" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 transition-opacity duration-500 group-hover/image:opacity-90"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"></div>
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Content overlay */}
                <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center min-h-[500px] sm:min-h-[600px]">
                  <div className="max-w-2xl">
                    {/* Floating number badge */}
                    <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl mb-8 shadow-2xl relative group/badge">
                      {/* Gradient border */}
                      <div className="absolute inset-0 p-[2px] rounded-2xl" style={{ background: 'linear-gradient(135deg, rgb(103, 232, 249), rgb(196, 181, 253), rgb(103, 232, 249))' }}>
                        <div className="absolute inset-[2px] bg-black rounded-2xl flex items-center justify-center">
                          <span className="text-white font-bold text-3xl sm:text-4xl relative z-10">3</span>
                        </div>
                      </div>
                      {/* Glow effect */}
                      <div className="absolute -inset-3 bg-gradient-to-br from-cyan-400/40 via-purple-400/40 to-cyan-400/40 blur-xl animate-pulse rounded-2xl opacity-70 group-hover/badge:opacity-100 transition-opacity"></div>
                    </div>
                    
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-8 tracking-tight">
                      <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{process[2].phase}</span>
                    </h3>
                    <ul className="space-y-4">
                      {process[2].details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-4 text-white/80 group/item">
                          <div className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-300 to-purple-300 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                          <span className="text-lg sm:text-xl leading-relaxed font-light">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps 4-6: Creative stacked cards */}
            <div className="space-y-8 sm:space-y-12">
              {process.slice(3).map((phase, index) => {
                const globalIndex = index + 3;
                return (
                  <div 
                    key={globalIndex}
                    ref={(el) => (timelineRefs.current[globalIndex] = el)}
                    data-timeline-index={globalIndex}
                    className={`relative transition-all duration-500 ease-out ${
                      visibleTimelineItems.includes(globalIndex) 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${(globalIndex - 3) * 100}ms` }}
                  >
                    <div className="flex items-start gap-6 sm:gap-8">
                      {/* Number indicator - vertical */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center shadow-xl relative group/badge">
                          {/* Gradient border */}
                          <div className="absolute inset-0 p-[2px] rounded-xl" style={{ background: 'linear-gradient(135deg, rgb(103, 232, 249), rgb(196, 181, 253), rgb(103, 232, 249))' }}>
                            <div className="absolute inset-[2px] bg-black rounded-xl flex items-center justify-center">
                              <span className="text-white font-bold text-xl sm:text-2xl relative z-10">{globalIndex + 1}</span>
                            </div>
                          </div>
                          {/* Glow effect */}
                          <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-lg animate-pulse rounded-xl opacity-60 group-hover/badge:opacity-100 transition-opacity"></div>
                        </div>
                        {/* Connecting line */}
                        {index < process.slice(3).length - 1 && (
                          <div className="w-0.5 h-12 sm:h-16 bg-gradient-to-b from-cyan-300/50 to-purple-300/50 mx-auto mt-4"></div>
                        )}
                      </div>
                      
                      {/* Content card */}
                      <div className="flex-1 bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-slate-800/50 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 tracking-tight">
                            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{phase.phase}</span>
                          </h3>
                          <ul className="space-y-3">
                            {phase.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start space-x-3 text-white/60 group/item">
                                <div className="mt-1 w-1 h-1 rounded-full bg-gradient-to-r from-cyan-300 to-purple-300 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                                <span className="text-sm sm:text-base leading-relaxed font-light">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Last Updated Date */}
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-white/40 text-sm font-light">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Schema */}
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' }
        ]} 
      />

    </div>
  );
};

export default memo(About);