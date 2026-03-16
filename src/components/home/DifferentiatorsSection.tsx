'use client';

import Link from 'next/link';
import { Rocket, Users, Zap, Heart, Shield, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, memo } from 'react';
import { FadeIn } from '@/components/ui/fade-in';

const DifferentiatorsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const amount = window.innerWidth < 640 ? -280 : window.innerWidth < 1024 ? -320 : -400;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const amount = window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 320 : 400;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      {/* Space Background */}
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
        <div className="bg-star" style={{ top: '25%', left: '2%' }}></div>
        <div className="bg-star" style={{ top: '28%', left: '18%' }}></div>
        <div className="bg-star" style={{ top: '32%', left: '35%' }}></div>
        <div className="bg-star" style={{ top: '29%', left: '52%' }}></div>
        <div className="bg-star" style={{ top: '35%', left: '68%' }}></div>
        <div className="bg-star" style={{ top: '31%', left: '82%' }}></div>
        <div className="bg-star" style={{ top: '24%', left: '92%' }}></div>
        <div className="bg-star" style={{ top: '45%', left: '5%' }}></div>
        <div className="bg-star" style={{ top: '48%', left: '22%' }}></div>
        <div className="bg-star" style={{ top: '42%', left: '40%' }}></div>
        <div className="bg-star" style={{ top: '51%', left: '58%' }}></div>
        <div className="bg-star" style={{ top: '47%', left: '75%' }}></div>
        <div className="bg-star" style={{ top: '44%', left: '90%' }}></div>
        <div className="bg-star" style={{ top: '65%', left: '8%' }}></div>
        <div className="bg-star" style={{ top: '68%', left: '25%' }}></div>
        <div className="bg-star" style={{ top: '72%', left: '42%' }}></div>
        <div className="bg-star" style={{ top: '66%', left: '60%' }}></div>
        <div className="bg-star" style={{ top: '69%', left: '77%' }}></div>
        <div className="bg-star" style={{ top: '74%', left: '93%' }}></div>
        <div className="bg-star" style={{ top: '85%', left: '12%' }}></div>
        <div className="bg-star" style={{ top: '88%', left: '30%' }}></div>
        <div className="bg-star" style={{ top: '82%', left: '48%' }}></div>
        <div className="bg-star" style={{ top: '86%', left: '65%' }}></div>
        <div className="bg-star" style={{ top: '91%', left: '82%' }}></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-teal-500/15 rounded-full blur-3xl delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 sm:mb-16 gap-6">
          <div className="flex-1">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 text-white leading-[0.95] tracking-[-0.04em]">
                <span className="font-light">What Sets Us </span>
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Apart</span>
              </h2>
            </FadeIn>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-[1.7] font-light tracking-[0.01em]">
              We don&apos;t just build websites. We craft digital experiences that grow with your business.
            </p>
          </div>
          <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 w-full lg:w-auto">
            <Button asChild className="relative overflow-hidden bg-slate-900 rounded-full text-white px-6 py-3 font-medium transition-all duration-300 w-full group">
              <Link href="/services" className="flex items-center justify-center relative z-10 group-hover:text-white">
                <span className="relative z-10">What we do</span>
                <ChevronRight className="ml-2 h-4 w-4 relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 sm:w-14 sm:h-14 items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 group"
            style={{ background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))', backdropFilter: 'blur(10px)' }}
            aria-label="Scroll left"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white relative z-10" strokeWidth={2.5} />
          </button>
          <button
            onClick={scrollRight}
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 sm:w-14 sm:h-14 items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 group"
            style={{ background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))', backdropFilter: 'blur(10px)' }}
            aria-label="Scroll right"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white relative z-10" strokeWidth={2.5} />
          </button>

          {/* Scrollable Content */}
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
                    Built with cutting-edge technology that&apos;s fast, secure, and scales with your business needs.
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
                    Your site launches, but our relationship doesn&apos;t end. We&apos;re here for updates, improvements, and growth.
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
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 tracking-tight">Secure &amp; Reliable</h3>
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
  );
};

export default memo(DifferentiatorsSection);
