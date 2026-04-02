'use client';

import Link from 'next/link';
import { TextReveal } from '@/components/ui/text-reveal';
import { FadeIn } from '@/components/ui/fade-in';

const CTABand = () => {
  return (
    <section className="py-20 sm:py-28 md:py-32 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/80 to-purple-900/40"></div>
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
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl delay-1000" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/6 to-purple-500/6 rounded-full blur-3xl delay-2000" style={{ animationDuration: '7s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="relative rounded-[2rem] overflow-hidden border border-white/20">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/25 via-cyan-400/20 to-transparent rounded-full blur-3xl" style={{ animationDuration: '5s' }}></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/25 via-purple-400/20 to-transparent rounded-full blur-3xl delay-1000" style={{ animationDuration: '5s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl delay-500" style={{ animationDuration: '6s' }}></div>
          </div>

          <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 text-center">
            <TextReveal
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]"
              staggerMs={140}
              lines={[
                <span key="l1" className="block font-light opacity-90">Let&apos;s Build Something</span>,
                <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Amazing</span>,
              ]}
            />
            <FadeIn delay={300}>
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-10 sm:mb-12 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Our team is ready to provide tailored solutions that drive growth and revenue.
              </p>
            </FadeIn>
            <FadeIn delay={440}>
            <div>
              <Link href="/contact" className="relative inline-block group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 rounded-full blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 hover:from-cyan-400 hover:via-purple-400 hover:to-cyan-400 text-white rounded-full px-10 sm:px-12 md:px-14 py-4 sm:py-5 text-lg sm:text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 animate-jiggle">
                  Start Your Project
                </div>
              </Link>
            </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Content Updated Date */}
      <div className="text-center py-4 relative z-10">
        <p className="text-transparent text-sm">Content updated: January 2026</p>
      </div>
    </section>
  );
};

export default CTABand;
