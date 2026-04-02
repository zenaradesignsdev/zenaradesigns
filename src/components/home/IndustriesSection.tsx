'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';

const industries = [
  {
    title: 'Law Firms',
    href: '/lawyers',
    description:
      'Build trust and credibility online. We design websites that help GTA law firms convert visitors into clients.',
    tag: 'Trust-Critical',
  },
  {
    title: 'Accounting Firms',
    href: '/accountants',
    description:
      'Secure, professional platforms with client portals. Designed for CPAs and accounting firms across the GTA.',
    tag: 'Compliance-Ready',
  },
  {
    title: 'Renovation Companies',
    href: '/renovations',
    description:
      'Showcase your best projects with stunning portfolio websites that capture leads and grow your business.',
    tag: 'Portfolio-Driven',
  },
  {
    title: 'Wellness Clinics',
    href: '/clinics',
    description:
      'Modern platforms with online booking for massage therapy, chiropractic, physiotherapy, and holistic health.',
    tag: 'Patient-First',
  },
];

const IndustriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-industry-card]');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-industry-card'));
            setVisibleCards((prev) => new Set(prev).add(index));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 md:py-32 relative overflow-hidden bg-black">
      {/* Branding hue highlights — more visible */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left cyan bloom */}
        <div className="absolute -top-20 -left-20 w-[700px] h-[500px] bg-cyan-500/[0.12] rounded-full blur-[140px]" />
        {/* Bottom-right purple bloom */}
        <div className="absolute -bottom-10 -right-10 w-[600px] h-[450px] bg-purple-600/[0.14] rounded-full blur-[120px]" />
        {/* Centre midtone bridge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-gradient-to-r from-cyan-800/20 via-purple-800/20 to-cyan-800/20 rounded-full blur-[100px]" />
        {/* Top edge rule */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header — left-aligned for visual contrast with centered sections */}
        <div className="mb-16 sm:mb-20 md:mb-24 max-w-3xl">
          <FadeIn>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">
              Specialized Expertise
            </p>
          </FadeIn>
          <TextReveal
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 leading-[0.95] tracking-[-0.04em]"
            staggerMs={120}
            lines={[
              <span key="l1">
                <span className="font-light text-white">Industries We </span>
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">
                  Serve
                </span>
              </span>,
            ]}
          />
          <FadeIn delay={240}>
            <p className="text-base sm:text-lg md:text-xl text-white/50 leading-[1.7] font-light tracking-[0.01em]">
              We understand the unique needs of trust-critical industries and build
              tailored websites that drive real results.
            </p>
          </FadeIn>
        </div>

        {/* 2×2 grid with staggered reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {industries.map((industry, index) => {
            const isVisible = visibleCards.has(index);
            const staggerDelay = index * 150;

            return (
              <Link
                key={industry.href}
                href={industry.href}
                data-industry-card={index}
                className={`group relative rounded-2xl sm:rounded-3xl border border-cyan-500/20 hover:border-cyan-400/60 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-purple-950/30 hover:from-cyan-900/50 hover:via-slate-900/70 hover:to-purple-900/40 backdrop-blur-sm transition-all duration-500 ease-out overflow-hidden shadow-[inset_0_1px_0_rgba(6,182,212,0.08)] hover:shadow-[inset_0_1px_0_rgba(6,182,212,0.2),0_0_40px_rgba(6,182,212,0.06)]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: isVisible ? `${staggerDelay}ms` : '0ms' }}
              >
                {/* Resting gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />

                {/* Hover intensification layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/12 via-purple-500/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Corner glow — subtle at rest, bright on hover */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-400/25 transition-all duration-700" />
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/8 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700 delay-75" />

                {/* Large background number */}
                <div className="absolute top-4 right-6 sm:top-6 sm:right-8 text-[5rem] sm:text-[7rem] md:text-[8rem] font-bold leading-none text-cyan-400/[0.07] select-none pointer-events-none transition-all duration-500 group-hover:text-cyan-300/[0.14] group-hover:scale-110 group-hover:translate-x-1">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col min-h-[200px] sm:min-h-[240px]">
                  {/* Title + description */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl md:text-[1.7rem] font-semibold text-white mb-3 tracking-tight leading-tight">
                      {industry.title}
                    </h3>
                    <p className="text-white/55 group-hover:text-white/70 text-sm sm:text-base leading-[1.7] font-light tracking-[0.01em] max-w-md transition-colors duration-300">
                      {industry.description}
                    </p>
                  </div>

                  {/* Bottom: tag + arrow */}
                  <div className="mt-6 sm:mt-8 flex items-center justify-between">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.15em] text-cyan-400/70 group-hover:text-cyan-300 transition-colors duration-300 font-medium">
                      {industry.tag}
                    </span>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-cyan-500/25 bg-cyan-500/8 group-hover:border-cyan-400/60 group-hover:bg-cyan-500/20 flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400/60 group-hover:text-cyan-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
