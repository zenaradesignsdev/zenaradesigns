'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef, memo } from 'react';

const logo = '/images/zenara-logo-v5.svg';

const SLOGANS = ['Build', 'Launch', 'Scale'] as const;

const HeroSection = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Pause slogan cycling when hero is off-screen
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          interval = setInterval(() => {
            setCurrentSlogan((prev) => (prev + 1) % SLOGANS.length);
          }, 2000);
        } else if (interval) {
          clearInterval(interval);
          interval = null;
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  // Cursor glow effect — Hero section only
  useEffect(() => {
    const heroSection = document.querySelector('.cursor-glow') as HTMLElement;
    if (!heroSection) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      heroSection.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      heroSection.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
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

  return (
    <>
      {/* Full-Screen Loading Animation — CSS-driven exit, no JS timers blocking LCP */}
      <div className="loading-screen-exit fixed inset-0 z-[10002] bg-black flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/40 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/30 to-black"></div>
        <div className="absolute inset-0">
          <div className="bg-star" style={{ top: '20%', left: '15%', animationDelay: '0s' }}></div>
          <div className="bg-star" style={{ top: '40%', left: '25%', animationDelay: '0.5s' }}></div>
          <div className="bg-star" style={{ top: '60%', left: '10%', animationDelay: '1s' }}></div>
          <div className="bg-star" style={{ top: '30%', left: '70%', animationDelay: '0.3s' }}></div>
          <div className="bg-star" style={{ top: '70%', left: '80%', animationDelay: '0.8s' }}></div>
        </div>
        <div className="relative z-10 loading-logo-entrance">
          <Image
            src={logo}
            alt="Zenara Designs Logo"
            className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 60px rgba(0, 0, 0, 0.5))' }}
            width={384}
            height={384}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl -z-10 loading-glow"></div>
        </div>
      </div>

      {/* Space-Themed Hero Section */}
      <section ref={heroRef} className="hero-section h-screen flex items-center justify-center relative overflow-hidden bg-black cursor-glow z-10" role="banner" aria-label="Hero section">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="shooting-star shooting-star-1"></div>
          <div className="shooting-star shooting-star-2"></div>
          <div className="shooting-star shooting-star-3"></div>
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-300/20 via-purple-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-300/20 via-cyan-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-900/25 to-cyan-300/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 h-full flex items-center pt-16 sm:pt-20 md:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-10 lg:gap-12 items-center w-full">
            <div className="fade-in order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-8xl font-light mb-4 sm:mb-6 leading-[1.1] text-white tracking-[-0.02em] hero-text-fade">
                <span className="block pb-1">
                  Modern Web Design.{' '}
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    <span key={currentSlogan} className="cool-text-animation">{SLOGANS[currentSlogan]}</span>
                  </span>
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 leading-[1.7] font-light tracking-[0.01em] max-w-2xl mx-auto lg:mx-0">
                Zenara Designs creates high-performing websites for Toronto &amp; GTA businesses and professionals using modern development workflows.
              </p>
              <div className="flex justify-center lg:justify-start hero-button-slide">
                <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-8 py-6 sm:px-10 sm:py-7 text-lg sm:text-xl font-semibold group">
                    <Link href="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="relative z-10 group-hover:text-white">Launch Your Project</span>
                      <Rocket className="ml-2 h-6 w-6 relative z-10" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] h-[180px] xs:h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] mx-auto relative flex items-center justify-center">
                <div className="absolute inset-0 border border-teal-500/20 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-4 border border-purple-500/20 rounded-full animate-spin-slow-reverse"></div>
                <div className="absolute inset-8 border border-cyan-500/20 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="relative z-10 group hero-logo-zoom">
                  <Image
                    src={logo}
                    alt="Zenara Designs - Professional Web Design Agency Toronto Logo"
                    className="w-full max-w-[180px] xs:max-w-[200px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[350px] h-auto object-contain animate-float animate-spin-slow"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 40px rgba(0, 0, 0, 0.3))' }}
                    width={350}
                    height={350}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-purple-500/0 rounded-full blur-xl group-hover:from-teal-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                </div>
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
    </>
  );
};

export default memo(HeroSection);
