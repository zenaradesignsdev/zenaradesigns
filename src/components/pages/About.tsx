'use client';

import { Users, Target, CheckCircle, Sparkles, Zap, Heart, Rocket, Code2, ArrowRight, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect, useRef, memo, useMemo } from 'react';
import { PERFORMANCE_THRESHOLDS } from '@/lib/constants';
import type { TeamMember, ProcessStep, Differentiator, Position } from '@/types';
const logo = '/images/zenara-logo-v5.svg';
import { SafeImage } from '@/components/ui/safe-image';
const saturnImage = '/images/saturn.png';
const moonImage = '/images/moon.png';
const discoveryImage = '/images/zenara-discovery.jpg';
const prototypingImage = '/images/zenara-prototyping.jpg';
const buildImage = '/images/zenara-build.jpg';
import StructuredData from '@/components/StructuredData';
import { FadeIn } from '@/components/ui/fade-in';

const About = () => {
  // Scroll to top when component mounts  
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
      
      const newPosition = { scale: 1, x: 0, y: 0, opacity: 0.2 };
      
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
      
      const newPosition = { scale: 0, x: 0, y: 0, opacity: 0 };
      
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
            <FadeIn>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">We&apos;re not just developers,</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">we&apos;re digital architects</span>
              </h1>
            </FadeIn>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] mb-8 sm:mb-12 px-4">
              Every business deserves a digital presence that not only looks amazing but drives real results. 
              We bridge the gap between cutting-edge technology and thoughtful design strategy. Based in Toronto and serving the GTA.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16">
              <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 w-full sm:w-auto">
                <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto group">
                  <Link href="/contact">
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
            <FadeIn>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">The</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Dream Team</span>
              </h2>
            </FadeIn>
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
            <FadeIn>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">How We</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Bring Ideas to Life</span>
              </h2>
            </FadeIn>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              A proven methodology that transforms your vision into a digital masterpiece
            </p>
          </div>
          
          {/* Process Steps — redesigned */}
          <div className="relative space-y-6 sm:space-y-8">

            {/* Steps 1–3: alternating image + content panels */}
            {([
              { img: discoveryImage,   alt: 'Discovery workspace' },
              { img: prototypingImage, alt: 'Prototyping workspace' },
              { img: buildImage,       alt: 'Build workspace'      },
            ] as const).map(({ img, alt }, index) => {
              const isEven     = index % 2 === 1;
              const isVisible  = visibleTimelineItems.includes(index);
              const accentFrom = isEven ? 'from-purple-300' : 'from-cyan-300';
              const accentVia  = 'via-purple-300';
              const accentTo   = isEven ? 'to-cyan-300' : 'to-cyan-300';
              const enterClass = isVisible
                ? 'opacity-100 translate-x-0'
                : isEven
                  ? 'opacity-0 translate-x-16'
                  : 'opacity-0 -translate-x-16';

              return (
                <div
                  key={index}
                  ref={(el) => { timelineRefs.current[index] = el; }}
                  data-timeline-index={index}
                  className={`transition-all duration-700 ease-out ${enterClass}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} rounded-2xl overflow-hidden border border-slate-800/60 group`}>

                    {/* Image half */}
                    <div className="relative w-full lg:w-1/2 h-[280px] sm:h-[340px] lg:h-[420px] overflow-hidden flex-shrink-0">
                      <SafeImage
                        src={img}
                        alt={alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      {/* dark gradient for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 pointer-events-none" />
                      {/* colour tint */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${isEven ? 'from-purple-600/15 to-cyan-600/15' : 'from-cyan-600/15 to-purple-600/15'} pointer-events-none`} />
                      {/* Step number — bottom corner of image */}
                      <div className={`absolute bottom-5 ${isEven ? 'left-5' : 'right-5'} z-10`}>
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                          <div
                            className="absolute inset-0 rounded-xl p-[1.5px]"
                            style={{ background: `linear-gradient(135deg, ${isEven ? 'rgb(196,181,253), rgb(103,232,249)' : 'rgb(103,232,249), rgb(196,181,253)'})` }}
                          >
                            <div className="w-full h-full bg-black/80 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                              <span className="text-white font-bold text-xl sm:text-2xl">{index + 1}</span>
                            </div>
                          </div>
                          {/* glow */}
                          <div className={`absolute -inset-2 rounded-xl blur-lg opacity-50 bg-gradient-to-br ${isEven ? 'from-purple-400/50 to-cyan-400/50' : 'from-cyan-400/50 to-purple-400/50'}`} />
                        </div>
                      </div>
                    </div>

                    {/* Content half */}
                    <div className="relative w-full lg:w-1/2 bg-slate-900/95 backdrop-blur-xl p-8 sm:p-10 md:p-12 flex flex-col justify-center overflow-hidden">
                      {/* top accent line */}
                      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentFrom} ${accentVia} ${accentTo}`} />
                      {/* decorative large number */}
                      <div className="absolute right-4 bottom-2 text-[7rem] sm:text-[9rem] font-black text-white/[0.04] leading-none select-none pointer-events-none">
                        0{index + 1}
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 tracking-tight leading-tight">
                          <span className={`bg-gradient-to-r ${accentFrom} ${accentVia} ${accentTo} bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient`}>
                            {process[index].phase}
                          </span>
                        </h3>
                        <ul className="space-y-3 sm:space-y-4">
                          {process[index].details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-white/70 group/item">
                              <div className={`mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-200 group-hover/item:scale-150 bg-gradient-to-r ${accentFrom} ${accentTo}`} />
                              <span className="text-base sm:text-lg leading-relaxed font-light">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div className="py-4">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>

            {/* Steps 4–6: 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {process.slice(3).map((phase, index) => {
                const globalIndex = index + 3;
                const isVisible = visibleTimelineItems.includes(globalIndex);
                const accentGradients = [
                  'from-cyan-300 via-purple-300 to-cyan-300',
                  'from-purple-300 via-cyan-300 to-purple-300',
                  'from-cyan-300 via-purple-300 to-cyan-300',
                ];
                const gradient = accentGradients[index];

                return (
                  <div
                    key={globalIndex}
                    ref={(el) => { timelineRefs.current[globalIndex] = el; }}
                    data-timeline-index={globalIndex}
                    className={`transition-all duration-500 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.96]'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-full bg-slate-900/90 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-7 sm:p-8 overflow-hidden group hover:border-cyan-500/30 transition-[border-color] duration-300">
                      {/* top accent line */}
                      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient}`} />
                      {/* decorative large number */}
                      <div className="absolute right-3 bottom-2 text-[6rem] font-black text-white/[0.04] leading-none select-none pointer-events-none">
                        0{globalIndex + 1}
                      </div>
                      {/* step number badge */}
                      <div className="relative inline-flex mb-5">
                        <div
                          className="w-11 h-11 rounded-xl p-[1.5px]"
                          style={{ background: `linear-gradient(135deg, rgb(103,232,249), rgb(196,181,253))` }}
                        >
                          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                            <span className="text-white font-bold text-base">{globalIndex + 1}</span>
                          </div>
                        </div>
                        {/* subtle glow */}
                        <div className={`absolute -inset-1 rounded-xl blur-md opacity-40 bg-gradient-to-br ${gradient}`} />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 tracking-tight">
                          <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient`}>
                            {phase.phase}
                          </span>
                        </h3>
                        <ul className="space-y-2.5">
                          {phase.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-white/60 group/item">
                              <div className={`mt-[7px] w-1 h-1 rounded-full flex-shrink-0 transition-transform duration-200 group-hover/item:scale-150 bg-gradient-to-r ${gradient}`} />
                              <span className="text-sm sm:text-base leading-relaxed font-light">{detail}</span>
                            </li>
                          ))}
                        </ul>
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