'use client';

import Link from 'next/link';
import { RelatedGuide } from '@/components/Blog/RelatedGuide';
import { CheckCircle, ArrowRight, ChevronDown, Clock, Users, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SafeImage } from '@/components/ui/safe-image';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import { useState, useEffect, useRef, memo, useMemo } from 'react';
import { PERFORMANCE_THRESHOLDS } from '@/lib/constants';
import { processPhases } from '@/lib/process-data';
import { processPageFaqs } from '@/lib/faq-data';

const Process = () => {
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<number[]>([]);
  const faqMidpoint = Math.ceil(processPageFaqs.length / 2);

  // Every value here is checkable from this page or the pricing page — no
  // invented satisfaction rates or delivery percentages we can't stand behind.
  const stats = useMemo(() => [
    { label: 'Typical Build Time', value: '1–2 weeks', icon: Clock },
    { label: 'Access to the Developers', value: 'Direct', icon: Users },
    { label: 'Project Pricing', value: 'Fixed', icon: Target },
    { label: 'Discovery to Support', value: '6 Phases', icon: Zap },
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-timeline-index') || '0');
          if (entry.isIntersecting) {
            setVisibleTimelineItems((prev) => (prev.includes(index) ? prev : [...prev, index]));
          }
        });
      },
      { threshold: PERFORMANCE_THRESHOLDS.INTERSECTION_OBSERVER }
    );
    timelineRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" role="main" aria-label="Our web design process">

      {/* Hero */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 relative overflow-hidden" style={{ backgroundColor: '#090614' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(124,58,237,0.38) 0%, rgba(88,28,235,0.18) 45%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 45% 80% at 0% 40%, rgba(6,182,212,0.22) 0%, transparent 65%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 45% 80% at 100% 40%, rgba(6,182,212,0.20) 0%, transparent 65%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(9,6,20,0.8) 100%)' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none">
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
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <FadeIn>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">Web Design Process — Markham &amp; the GTA</p>
            </FadeIn>
            <TextReveal
              as="h1"
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[0.95] tracking-[-0.04em]"
              staggerMs={130}
              lines={[
                <span key="l1" className="block font-light">How We Build</span>,
                <span key="l2" className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Your Website.</span>,
              ]}
            />
            <FadeIn delay={260}>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
                A fixed-price, six-phase process — from discovery to launch and beyond. No templates, no page builders, no black box. Here&apos;s exactly what happens at every stage of your custom website design project.
              </p>
            </FadeIn>
          </div>

          {/* Stat strip */}
          <FadeIn delay={380}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3.5 sm:px-5 sm:py-4">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-300 flex-shrink-0" strokeWidth={1.75} />
                    <div className="min-w-0">
                      <div className="text-white font-medium text-sm sm:text-base leading-tight truncate">{stat.value}</div>
                      <div className="text-white/40 text-[11px] sm:text-xs font-light leading-tight truncate">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
          <FadeIn delay={440}>
            <p className="text-center text-white/35 text-xs sm:text-sm font-light mt-5">
              Exact timelines depend on your package — see <Link href="/pricing" className="text-cyan-300/80 hover:text-cyan-300 underline underline-offset-2">pricing &amp; turnaround times</Link>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The 6 phases — alternating image + content panels */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/40 to-black" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="relative space-y-6 sm:space-y-8">
            {processPhases.map((step, index) => {
              const isEven = index % 2 === 1;
              const isVisible = visibleTimelineItems.includes(index);
              const accentFrom = isEven ? 'from-purple-300' : 'from-cyan-300';
              const accentTo = 'to-cyan-300';
              const enterClass = isVisible
                ? 'opacity-100 translate-x-0'
                : isEven ? 'opacity-0 translate-x-16' : 'opacity-0 -translate-x-16';

              return (
                <div
                  key={step.phase}
                  ref={(el) => { timelineRefs.current[index] = el; }}
                  data-timeline-index={index}
                  className={`transition-all duration-700 ease-out ${enterClass}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} rounded-2xl overflow-hidden border border-slate-800/60 group`}>
                    {/* Image half — height matches the content half via flex stretch, so the photo is never cropped to fit a mismatched box */}
                    <div className="relative w-full lg:w-1/2 h-[260px] sm:h-[340px] lg:h-auto overflow-hidden flex-shrink-0">
                      <SafeImage
                        src={step.image}
                        alt={step.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 pointer-events-none" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${isEven ? 'from-purple-600/15 to-cyan-600/15' : 'from-cyan-600/15 to-purple-600/15'} pointer-events-none`} />
                    </div>

                    {/* Content half */}
                    <div className="relative w-full lg:w-1/2 bg-slate-900/95 backdrop-blur-xl p-7 sm:p-10 md:p-12 flex flex-col justify-center overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentFrom} via-purple-300 ${accentTo}`} />
                      <div className="absolute right-4 bottom-2 text-[7rem] sm:text-[9rem] font-black text-white/[0.04] leading-none select-none pointer-events-none">
                        0{index + 1}
                      </div>
                      <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2 tracking-tight leading-tight">
                          <span className={`bg-gradient-to-r ${accentFrom} via-purple-300 ${accentTo} bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient`}>
                            {step.phase}
                          </span>
                        </h2>
                        <p className="text-white/50 text-sm sm:text-base font-light leading-relaxed mb-5 sm:mb-6">
                          {step.tagline}
                        </p>

                        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] mb-3">What happens</h3>
                        <ul className="space-y-2.5 mb-6">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-white/70 group/item">
                              <div className={`mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-200 group-hover/item:scale-150 bg-gradient-to-r ${accentFrom} ${accentTo}`} />
                              <span className="text-sm sm:text-base leading-relaxed font-light">{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] mb-3">What we deliver</h3>
                        <ul className="space-y-2.5">
                          {step.whatWeDeliver.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-white/60">
                              <CheckCircle className="h-4 w-4 text-cyan-400/80 flex-shrink-0 mt-0.5" />
                              <span className="text-sm leading-relaxed font-light">{item}</span>
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
      </section>

      {/* What makes this different — numbered pillars, matching About & Pricing */}
      <section className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/40 to-black" />
          <div className="bg-star" style={{ top: '7%', left: '5%' }} />
          <div className="bg-star" style={{ top: '13%', left: '19%' }} />
          <div className="bg-star" style={{ top: '5%', left: '35%' }} />
          <div className="bg-star" style={{ top: '11%', left: '52%' }} />
          <div className="bg-star" style={{ top: '8%', left: '70%' }} />
          <div className="bg-star" style={{ top: '17%', left: '84%' }} />
          <div className="bg-star" style={{ top: '4%', left: '94%' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.12]">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-purple-500/20 via-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            <div className="relative z-10 px-6 sm:px-10 md:px-16 py-12 sm:py-16 md:py-20">
              <div className="text-center mb-12 sm:mb-16">
                <FadeIn>
                  <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-6">
                    Why This Process Works
                  </p>
                </FadeIn>
                <TextReveal
                  className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1] tracking-[-0.04em]"
                  staggerMs={120}
                  lines={[
                    <span key="l1" className="block font-light">What Makes It</span>,
                    <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Different.</span>,
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                {[
                  {
                    number: '01',
                    label: 'Fixed Pricing',
                    body: 'Quoted upfront before we start. The price you approve is the price you pay.',
                    href: '/pricing',
                    linkText: 'See pricing',
                  },
                  {
                    number: '02',
                    label: 'Direct Access',
                    body: 'You work with the two of us the whole way through — no account managers, no outsourcing.',
                    href: '/about',
                    linkText: 'Meet the team',
                  },
                  {
                    number: '03',
                    label: 'SEO Built In',
                    body: 'Technical SEO and structured data are part of the build, not an add-on after launch.',
                    href: '/services/seo',
                    linkText: 'SEO services',
                  },
                  {
                    number: '04',
                    label: 'AI Search Ready',
                    body: 'Pages structured so tools like ChatGPT and Perplexity can read and cite them — not just Google.',
                    href: '/services/geo',
                    linkText: 'GEO & AI search',
                  },
                ].map((item, i) => (
                  <FadeIn key={item.label} delay={i * 100}>
                    <div className="bg-slate-950/80 hover:bg-slate-900/90 transition-colors duration-300 p-7 sm:p-8 flex flex-col gap-4 h-full group">
                      <span className="text-xs font-mono text-cyan-400/40 tracking-widest">{item.number}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium text-base mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                          {item.label}
                        </p>
                        <p className="text-white/45 text-sm leading-relaxed font-light">
                          {item.body}
                        </p>
                      </div>
                      <Link
                        href={item.href}
                        className="inline-flex items-center text-xs font-medium text-cyan-300/70 hover:text-cyan-300 transition-colors duration-300 group/link"
                      >
                        {item.linkText} <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process FAQ */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black"></div>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-purple-500/5 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <TextReveal
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[0.95] tracking-[-0.04em] text-center"
              staggerMs={120}
              lines={[
                <span key="l1" className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Process &amp;</span>,
                <span key="l2" className="block font-light opacity-90 mt-2">Timeline Questions</span>,
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:items-start max-w-5xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-3 flex flex-col">
              {processPageFaqs.slice(0, faqMidpoint).map((faq, index) => (
                <AccordionItem
                  key={`left-item-${index + 1}`}
                  value={`left-item-${index + 1}`}
                  className="overflow-hidden border border-white/[0.09] rounded-xl bg-slate-900/50 hover:border-cyan-500/20 data-[state=open]:border-cyan-500/35 data-[state=open]:bg-slate-900/80 transition-all duration-300"
                >
                  <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 hover:no-underline text-left group w-full flex items-center relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.11] via-purple-500/[0.07] to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />
                    <span className="font-light text-sm sm:text-base text-white/70 group-hover:text-white pr-4 flex-1 transition-colors duration-300 relative z-10">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 text-white/30 group-hover:text-cyan-400 shrink-0 transition-all duration-300 relative z-10" />
                  </AccordionTrigger>
                  <AccordionContent className="px-5 sm:px-6 pb-4 sm:pb-5 text-white/55 text-sm leading-[1.75] font-light tracking-[0.01em]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Accordion type="single" collapsible className="w-full space-y-3 flex flex-col">
              {processPageFaqs.slice(faqMidpoint).map((faq, index) => (
                <AccordionItem
                  key={`right-item-${index + 1}`}
                  value={`right-item-${index + 1}`}
                  className="overflow-hidden border border-white/[0.09] rounded-xl bg-slate-900/50 hover:border-cyan-500/20 data-[state=open]:border-cyan-500/35 data-[state=open]:bg-slate-900/80 transition-all duration-300"
                >
                  <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 hover:no-underline text-left group w-full flex items-center relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.11] via-purple-500/[0.07] to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />
                    <span className="font-light text-sm sm:text-base text-white/70 group-hover:text-white pr-4 flex-1 transition-colors duration-300 relative z-10">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 text-white/30 group-hover:text-cyan-400 shrink-0 transition-all duration-300 relative z-10" />
                  </AccordionTrigger>
                  <AccordionContent className="px-5 sm:px-6 pb-4 sm:pb-5 text-white/55 text-sm leading-[1.75] font-light tracking-[0.01em]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <p className="text-white/45 text-sm sm:text-base font-light mb-4">
              Have a question about pricing or what&apos;s included?
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center text-sm sm:text-base font-medium text-white/60 hover:text-white transition-colors duration-300 group"
            >
              Browse the full FAQ <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <RelatedGuide href="/blog/choosing-web-designer-gta" title="How to choose a web designer in the GTA: questions to ask first" className="mt-6" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
          <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
          <div className="bg-star" style={{ top: '15%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '9%', left: '58%' }}></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <TextReveal
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]"
            staggerMs={130}
            lines={[
              <span key="l1" className="block font-light opacity-90">Ready to Start Your</span>,
              <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Project?</span>,
            ]}
          />
          <FadeIn delay={260}>
            <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 sm:mb-12 max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
              Tell us about your business and we&apos;ll send a fixed, custom quote within 24 hours — no obligation, no pressure.
            </p>
          </FadeIn>
          <div className="flex justify-center">
            <div className="relative w-full sm:w-auto rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                <Link href="/contact" className="flex items-center justify-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                  <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb + HowTo + FAQPage schema are server-rendered in src/app/process/page.tsx */}
    </div>
  );
};

export default memo(Process);
