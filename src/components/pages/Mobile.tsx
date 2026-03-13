'use client';

import { Smartphone, Monitor, Tablet, Zap, Users, Globe, CheckCircle, ArrowRight, Target, TrendingUp, Eye, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { PERFORMANCE_THRESHOLDS } from '@/lib/constants';

const Mobile = () => {
  // Scroll to top when component mounts  
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(handleItemIntersection, { threshold: PERFORMANCE_THRESHOLDS.INTERSECTION_OBSERVER });

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [handleItemIntersection]);

  const mobileStats = useMemo(() => [
    { label: "Mobile Traffic", value: "60%+", icon: Smartphone },
    { label: "Mobile Search", value: "70%+", icon: Globe },
    { label: "Mobile Conversions", value: "45%+", icon: Target },
    { label: "Mobile Bounce Rate", value: "Higher", icon: TrendingUp }
  ], []);

  const mobilePrinciples = useMemo(() => [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Design for mobile devices first, then scale up to desktop",
      benefits: [
        "Faster loading on mobile devices",
        "Better user experience on small screens",
        "Improved mobile SEO rankings",
        "Higher mobile conversion rates",
        "Future-proof design approach"
      ],
      importance: "Google uses mobile-first indexing, making mobile optimization crucial for SEO"
    },
    {
      icon: Monitor,
      title: "Responsive Design",
      description: "Adaptive layouts that work seamlessly across all device sizes",
      benefits: [
        "Single codebase for all devices",
        "Consistent user experience",
        "Easier maintenance and updates",
        "Better performance optimization",
        "Cost-effective development"
      ],
      importance: "Ensures your website looks perfect on phones, tablets, and desktops"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast loading times optimized for mobile networks",
      benefits: [
        "Reduced bounce rates",
        "Better user engagement",
        "Improved SEO rankings",
        "Higher conversion rates",
        "Better Core Web Vitals"
      ],
      importance: "Mobile users expect pages to load in under 3 seconds"
    },
    {
      icon: Users,
      title: "Touch-Friendly Interface",
      description: "Intuitive navigation designed for touch interactions",
      benefits: [
        "Larger tap targets",
        "Swipe gestures support",
        "Thumb-friendly navigation",
        "Reduced user frustration",
        "Better accessibility"
      ],
      importance: "Touch interfaces require different design considerations than mouse interactions"
    },
    {
      icon: Eye,
      title: "Readable Typography",
      description: "Clear, legible text optimized for small screens",
      benefits: [
        "Better readability on mobile",
        "Improved user experience",
        "Reduced eye strain",
        "Higher content engagement",
        "Professional appearance"
      ],
      importance: "Small screens require careful typography choices for optimal readability"
    },
    {
      icon: BarChart3,
      title: "Mobile Analytics",
      description: "Track and analyze mobile user behavior and performance",
      benefits: [
        "Mobile-specific insights",
        "Performance monitoring",
        "User behavior analysis",
        "Conversion tracking",
        "Continuous optimization"
      ],
      importance: "Understanding mobile user behavior helps optimize the experience"
    }
  ], []);

  const bestPractices = useMemo(() => [
    {
      title: "Optimize Images",
      description: "Use WebP format, lazy loading, and appropriate sizing for mobile devices",
      impact: "Reduces page load time by up to 50%"
    },
    {
      title: "Minimize Text Input",
      description: "Reduce form fields and use mobile-friendly input types",
      impact: "Increases form completion rates by 30%"
    },
    {
      title: "Fast Loading",
      description: "Optimize code, use CDNs, and minimize HTTP requests",
      impact: "Improves user experience and SEO rankings"
    },
    {
      title: "Clear Navigation",
      description: "Use hamburger menus and prioritize important content",
      impact: "Reduces bounce rate and improves user engagement"
    },
    {
      title: "Touch Targets",
      description: "Ensure buttons and links are at least 44px in size",
      impact: "Prevents accidental taps and improves usability"
    },
    {
      title: "Local SEO",
      description: "Optimize for local mobile searches with location-based content",
      impact: "Increases local business visibility by 40%"
    }
  ], []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Mobile-First Web Design</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Best Practices</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              With over 60% of web traffic coming from mobile devices, mobile-first design isn't just important—it's essential for Toronto businesses to succeed online.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Statistics */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Why Mobile Matters</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">for Your Business</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              The numbers speak for themselves. Mobile optimization is no longer optional—it's a business necessity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {mobileStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 text-center relative overflow-hidden group">
                  {/* Box glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg relative z-10">
                    <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                    <IconComponent className="h-6 w-6 text-white relative z-10" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-2 relative z-10">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm sm:text-base font-light relative z-10">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Principles */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
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
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Mobile-First</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Design Principles</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Core principles that guide effective mobile-first web design
            </p>
          </div>
          
          <div className="space-y-8 sm:space-y-12">
            {mobilePrinciples.map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <div 
                  key={index} 
                  ref={(el) => { itemRefs.current[index] = el; }}
                  data-index={index}
                  className={`group transition-all duration-1000 ${
                    visibleItems.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                >
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 relative overflow-hidden">
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                    
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-4 sm:space-x-6">
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                          <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 relative z-10" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">
                            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{principle.title}</span>
                          </h3>
                          <p className="text-white/60 mb-4 text-base sm:text-lg leading-relaxed font-light">
                            {principle.description}
                          </p>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-cyan-300 mb-2">Why It Matters:</h4>
                            <p className="text-white/60 text-sm font-light">{principle.importance}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold text-cyan-300 mb-3">Key Benefits:</h4>
                            <ul className="space-y-2">
                              {principle.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-start space-x-2 text-white/60">
                                  <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm leading-relaxed font-light">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Practices */}
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
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Mobile Optimization</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Best Practices</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Proven strategies to optimize your website for mobile users and improve performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {bestPractices.map((practice, index) => (
              <div key={index} className="group">
                <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 h-full relative overflow-hidden">
                  {/* Box glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 relative z-10">
                    <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                    <CheckCircle className="h-6 w-6 relative z-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 relative z-10 tracking-tight">
                    <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{practice.title}</span>
                  </h3>
                  <p className="text-white/60 mb-4 text-sm leading-relaxed font-light relative z-10">
                    {practice.description}
                  </p>
                  <div className="text-cyan-300 text-sm font-semibold relative z-10">
                    Impact: {practice.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Device Comparison */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Responsive Design</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Across Devices</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Your website should look and function perfectly on every device your customers use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                device: "Mobile",
                icon: Smartphone,
                screen: "320px - 768px",
                users: "60%+ of traffic",
                features: ["Touch navigation", "Thumb-friendly buttons", "Simplified content", "Fast loading"]
              },
              {
                device: "Tablet",
                icon: Tablet,
                screen: "768px - 1024px",
                users: "15% of traffic",
                features: ["Hybrid navigation", "Medium content density", "Touch + mouse", "Balanced layout"]
              },
              {
                device: "Desktop",
                icon: Monitor,
                screen: "1024px+",
                users: "25% of traffic",
                features: ["Full navigation", "Rich content", "Mouse interactions", "Advanced features"]
              }
            ].map((device, index) => {
              const IconComponent = device.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 h-full text-center relative overflow-hidden">
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl mx-auto mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 relative z-10">
                      <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                      <IconComponent className="h-8 w-8 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2 relative z-10 tracking-tight">
                      <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{device.device}</span>
                    </h3>
                    <p className="text-cyan-300 font-semibold mb-4 relative z-10">{device.screen}</p>
                    <p className="text-white/60 text-sm mb-6 font-light relative z-10">{device.users}</p>
                    <ul className="space-y-2 text-left relative z-10">
                      {device.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-white/60 text-sm font-light">
                          <CheckCircle className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
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
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            {/* Box glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Ready to Optimize for</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Mobile?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 sm:mb-10 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
                Don't lose potential customers to poor mobile experience. Let us help you create a mobile-first website that converts visitors into customers.
              </p>
              <div className="flex justify-center mb-8">
                <div className="relative w-full sm:w-auto rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                    <Link href="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        Get Mobile Audit
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 text-white/60">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                  <span className="text-xs sm:text-sm font-light">Free Mobile Audit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                  <span className="text-xs sm:text-sm font-light">Mobile-First Design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                  <span className="text-xs sm:text-sm font-light">Performance Optimized</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Last Updated Date */}
          <div className="text-center mt-8">
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
          { name: 'Mobile-First Design', url: '/mobile' }
        ]} 
      />
    </div>
  );
};

export default memo(Mobile);
