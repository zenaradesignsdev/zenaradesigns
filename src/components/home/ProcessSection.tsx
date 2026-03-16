'use client';

import { Compass, Palette, BarChart, ArrowUpRight } from 'lucide-react';
import { memo } from 'react';
import { FadeIn } from '@/components/ui/fade-in';

const ProcessSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-black">
      {/* Background Glowing Lines - Curved from top corners */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-0 top-0"
          style={{
            width: '300px',
            height: '400px',
            background: 'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(6, 182, 212, 0.25), rgba(6, 182, 212, 0.1) 40%, transparent 70%)',
            borderRadius: '0 0 100% 0',
            filter: 'blur(40px)',
            transform: 'rotate(-5deg)',
            transformOrigin: 'top left',
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
            transformOrigin: 'top left',
          }}
        ></div>
        <div
          className="absolute right-0 top-0"
          style={{
            width: '300px',
            height: '400px',
            background: 'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(168, 85, 247, 0.25), rgba(168, 85, 247, 0.1) 40%, transparent 70%)',
            borderRadius: '0 0 0 100%',
            filter: 'blur(40px)',
            transform: 'rotate(5deg)',
            transformOrigin: 'top right',
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
            transformOrigin: 'top right',
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Headline */}
        <div className="text-center mb-12 sm:mb-16 relative z-20">
          <FadeIn as="div">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 sm:mb-10 leading-[0.95] tracking-[-0.04em] text-center">
              <span className="block font-light opacity-90">Where Innovation</span>
              <span className="block mt-2 sm:mt-2.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Meets Excellence</span>
            </h2>
          </FadeIn>
          <p className="text-base sm:text-lg md:text-xl text-white/60 mb-12 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
            Elevating brands through strategic design, cutting-edge technology, and results-driven solutions.
          </p>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative z-20">
          {/* Card 1: Discovery & Planning */}
          <div className="group relative bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/15 via-cyan-500/8 to-cyan-500/15 blur-2xl opacity-60 animate-pulse"></div>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20 blur-sm opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="relative w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-cyan-400/30 via-cyan-500/20 to-cyan-400/30 blur-md opacity-70 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-sm"></div>
                  <Compass className="h-5 w-5 text-cyan-400 relative z-10 drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight">Discovery &amp; Planning</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-[1.6] font-light tracking-[0.01em]">
                Understand your goals, audience, and challenges to create a strategic roadmap.
              </p>
            </div>
          </div>

          {/* Card 2: Design & Development */}
          <div className="group relative bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-800/50 hover:border-purple-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/15 via-purple-500/8 to-purple-500/15 blur-2xl opacity-60 animate-pulse"></div>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-400/20 via-transparent to-purple-400/20 blur-sm opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="relative w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-purple-400/30 via-purple-500/20 to-purple-400/30 blur-md opacity-70 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-lg bg-purple-400/10 blur-sm"></div>
                  <Palette className="h-5 w-5 text-purple-400 relative z-10 drop-shadow-[0_0_8px_rgba(196,181,253,0.5)]" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight">Design &amp; Development</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-[1.6] font-light tracking-[0.01em]">
                Build beautiful, functional solutions with modern technology and best practices.
              </p>
            </div>
          </div>

          {/* Card 3: Launch & Optimize */}
          <div className="group relative bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/15 via-cyan-500/8 to-cyan-500/15 blur-2xl opacity-60 animate-pulse"></div>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20 blur-sm opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="relative w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-cyan-400/30 via-cyan-500/20 to-cyan-400/30 blur-md opacity-70 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-sm"></div>
                  <BarChart className="h-5 w-5 text-cyan-400 relative z-10 drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight">Launch &amp; Optimize</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-[1.6] font-light tracking-[0.01em]">
                Deploy your solution and continuously improve performance for maximum results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ProcessSection);
