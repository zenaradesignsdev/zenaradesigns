'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import { getCaseStudy, type CaseStudy as CaseStudyData } from '@/lib/case-studies';
import { caseStudyFonts } from '@/lib/case-study-fonts';

/**
 * How far a full-page screenshot travels inside a device screen, as a share of
 * the image's own height: (image height − screen height) / image height.
 * screenRatio is the screen's height / width.
 */
function scrollStyle(img: { width: number; height: number }, screenRatio: number, seconds: number) {
  const end = -(1 - screenRatio * (img.width / img.height)) * 100;
  return { '--scroll-end': `${end.toFixed(2)}%`, '--scroll-duration': `${seconds}s` } as CSSProperties;
}

const LOGO_MASKS = {
  none: '',
  soft: '[mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_72%)]',
  circle: '[mask-image:radial-gradient(circle,black_69%,transparent_70.5%)]',
};

const EYEBROW = 'text-xs font-mono text-cyan-400/70 tracking-[0.2em] uppercase';
const GRADIENT_TEXT =
  'bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient';

function Laptop({ img }: { img: CaseStudyData['screens']['desktop'] }) {
  return (
    <div className="cs-device relative">
      {/* Lid */}
      <div className="relative rounded-t-[14px] sm:rounded-t-[22px] border border-white/15 bg-[#0b0d12] p-[1.6%] pb-[2.2%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        <span className="absolute left-1/2 top-[0.7%] h-1 w-1 -translate-x-1/2 rounded-full bg-white/20" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-[#0D151F]">
          <div className="cs-screen-scroll will-change-transform" style={scrollStyle(img, 10 / 16, 34)}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              priority
              sizes="(max-width: 1024px) 90vw, 860px"
              className="block h-auto w-full"
            />
          </div>
          {/* Glass glare */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
        </div>
      </div>
      {/* Base */}
      <div className="relative -mx-[7%] h-[10px] sm:h-[16px] rounded-b-[14px] sm:rounded-b-[20px] bg-gradient-to-b from-[#3a3d45] via-[#23252b] to-[#15161a] shadow-[0_24px_40px_-12px_rgba(0,0,0,0.9)]">
        <span className="absolute left-1/2 top-0 h-[40%] w-[14%] -translate-x-1/2 rounded-b-md bg-[#15161a]" />
      </div>
    </div>
  );
}

function Phone({ img }: { img: CaseStudyData['screens']['mobile'] }) {
  return (
    <div className="cs-device relative rounded-[18%/8.5%] border border-white/20 bg-[#0b0d12] p-[5%] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)]">
      <div className="relative aspect-[390/844] overflow-hidden rounded-[13%/6%] bg-[#0D151F]">
        <div className="cs-screen-scroll will-change-transform" style={scrollStyle(img, 844 / 390, 30)}>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes="(max-width: 640px) 34vw, 220px"
            className="block h-auto w-full"
          />
        </div>
        {/* Dynamic island */}
        <span className="absolute left-1/2 top-[2.2%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

function BusinessCard({ card }: { card: CaseStudyData['card'] }) {
  const [showBack, setShowBack] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowBack((v) => !v)}
        aria-label={showBack ? 'Show the front of the business card' : 'Show the back of the business card'}
        className="group block w-full rounded-2xl [perspective:1600px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
      >
        <div
          style={{ aspectRatio: card.aspect }}
          className={`relative w-full transition-transform duration-700 [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${
            showBack ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_40px_70px_-25px_rgba(0,0,0,0.95)] ring-1 ring-white/10 [backface-visibility:hidden]">
            <Image
              src={card.front.src}
              alt={card.front.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 640px"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_40px_70px_-25px_rgba(0,0,0,0.95)] ring-1 ring-white/10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Image
              src={card.back.src}
              // The back face is hidden until flipped, so lazy loading would
              // leave it blank on the first flip.
              loading="eager"
              alt={card.back.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 640px"
              className="object-cover"
            />
          </div>
        </div>
      </button>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-white/15 bg-white/[0.03] p-1" role="group" aria-label="Card side">
          {[
            { label: 'Front', back: false },
            { label: 'Back', back: true },
          ].map((side) => (
            <button
              key={side.label}
              type="button"
              aria-pressed={showBack === side.back}
              onClick={() => setShowBack(side.back)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                showBack === side.back ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              {side.label}
            </button>
          ))}
        </div>
        <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-white/40">
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Tap to flip
        </p>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, first, second }: { eyebrow: string; first: string; second: string }) {
  return (
    <>
      <FadeIn>
        <p className={`${EYEBROW} mb-5`}>{eyebrow}</p>
      </FadeIn>
      <TextReveal
        as="h2"
        className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1.02] tracking-[-0.04em]"
        staggerMs={120}
        lines={[
          <span key="a" className="block font-light">{first} </span>,
          <span key="b" className={`block mt-1 pb-1 font-normal ${GRADIENT_TEXT}`}>{second}</span>,
        ]}
      />
    </>
  );
}

export default function CaseStudy({ slug }: { slug: string }) {
  const cs = getCaseStudy(slug);
  if (!cs) return null;
  const { branding, card, flyer } = cs;

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: '#04111f' }}>
      {/* Background blooms, matching the Projects page */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[1400px]" style={{ background: 'radial-gradient(ellipse 65% 55% at 95% 0%, rgba(6,182,212,0.32) 0%, transparent 60%)' }} />
        <div className="absolute inset-x-0 top-[500px] h-[1200px]" style={{ background: 'radial-gradient(ellipse 55% 50% at 0% 60%, rgba(168,85,247,0.22) 0%, transparent 60%)' }} />
        <div className="bg-star" style={{ top: '2%', left: '8%' }} />
        <div className="bg-star" style={{ top: '4%', left: '36%' }} />
        <div className="bg-star" style={{ top: '3%', left: '71%' }} />
        <div className="bg-star" style={{ top: '9%', left: '18%' }} />
        <div className="bg-star" style={{ top: '11%', left: '88%' }} />
        <div className="bg-star" style={{ top: '22%', left: '5%' }} />
        <div className="bg-star" style={{ top: '31%', left: '93%' }} />
        <div className="bg-star" style={{ top: '46%', left: '12%' }} />
        <div className="bg-star" style={{ top: '58%', left: '82%' }} />
        <div className="bg-star" style={{ top: '71%', left: '27%' }} />
        <div className="bg-star" style={{ top: '84%', left: '66%' }} />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <nav aria-label="Breadcrumb" className="mb-10">
                <ol className="flex items-center gap-2 text-sm text-white/45">
                  <li>
                    <Link href="/projects" className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-300">
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      Projects
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-white/70">{cs.name}</li>
                </ol>
              </nav>
            </FadeIn>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <FadeIn>
                  <p className={`${EYEBROW} mb-6`}>{cs.eyebrow}</p>
                </FadeIn>
                <TextReveal
                  as="h1"
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-white leading-[0.95] tracking-[-0.04em]"
                  staggerMs={130}
                  lines={[
                    <span key="l1" className="block font-light">{cs.titleLines[0]} </span>,
                    <span key="l2" className={`block pb-2 font-light ${GRADIENT_TEXT}`}>{cs.titleLines[1]}</span>,
                  ]}
                />
              </div>
              <FadeIn delay={220}>
                <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed">{cs.intro}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cs.deliverables.map((d, i) => (
                    <span
                      key={d}
                      className={`px-3 py-1 text-xs font-medium tracking-wide rounded-full border ${
                        i % 2 === 0
                          ? 'border-cyan-500/30 text-cyan-300/80 bg-cyan-500/[0.08]'
                          : 'border-purple-500/30 text-purple-300/80 bg-purple-500/[0.08]'
                      }`}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Devices */}
            <FadeIn delay={300}>
              <div className="relative mx-auto mt-16 sm:mt-20 max-w-[1040px] pb-[6%] pr-[9%] sm:pr-[12%]">
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                  style={{ background: `linear-gradient(to right, rgba(6,182,212,0.2), rgba(168,85,247,0.25), ${cs.accent})` }}
                />
                <div className="relative">
                  <Laptop img={cs.screens.desktop} />
                </div>
                <div className="absolute bottom-0 right-0 w-[24%] min-w-[92px] max-w-[230px]">
                  <Phone img={cs.screens.mobile} />
                </div>
              </div>
              <p className="mt-6 text-center text-xs font-mono uppercase tracking-[0.15em] text-white/35">
                Live site, scrolling<span className="hidden lg:inline"> · hover to pause</span>
              </p>
            </FadeIn>

            {/* Facts */}
            <FadeIn delay={120}>
              <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
                {cs.facts.map((f) => (
                  <div key={f.label} className="bg-[#061526] p-5 sm:p-6">
                    <dt className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">{f.label}</dt>
                    <dd className="mt-2 text-sm sm:text-base text-white/85">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </section>

        {/* The brief */}
        <section className="py-20 sm:py-24 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeading eyebrow="The Brief" first={cs.brief.heading[0]} second={cs.brief.heading[1]} />
            </div>
            <FadeIn delay={200}>
              <div className="space-y-6 text-base sm:text-lg text-white/60 font-light leading-[1.75]">
                {cs.brief.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Website highlights */}
        <section className="py-20 sm:py-24 relative bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="The Website" first={cs.website.heading[0]} second={cs.website.heading[1]} />

            <FadeIn delay={200}>
              <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={cs.screens.hero.src}
                  alt={cs.screens.hero.alt}
                  width={cs.screens.hero.width}
                  height={cs.screens.hero.height}
                  sizes="(max-width: 1280px) 100vw, 1216px"
                  className="h-auto w-full"
                />
              </div>
            </FadeIn>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {cs.website.highlights.map((h, i) => (
                <li key={h.title}>
                  <FadeIn delay={i * 100}>
                    <div className="flex items-start gap-3">
                      <h.icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                      <div>
                        <h3 className="text-base font-medium text-white">{h.title}</h3>
                        <p className="mt-1 text-sm text-white/50 font-light leading-snug">{h.body}</p>
                      </div>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Branding */}
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <SectionHeading eyebrow="Logo & Branding" first={branding.heading[0]} second={branding.heading[1]} />
              <FadeIn delay={200}>
                <p className="mt-6 text-base sm:text-lg text-white/55 font-light leading-relaxed">{branding.body}</p>
              </FadeIn>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
              <FadeIn>
                <div
                  className="relative flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 p-10"
                  style={{ backgroundColor: branding.panelBg }}
                >
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: `radial-gradient(ellipse at 50% 40%, ${branding.panelGlow}, transparent 65%)` }}
                  />
                  <Image
                    src={branding.logo.src}
                    alt={branding.logo.alt}
                    width={branding.logo.width}
                    height={branding.logo.height}
                    sizes={`(max-width: 640px) 80vw, ${branding.logo.maxWidth}px`}
                    style={{ maxWidth: branding.logo.maxWidth }}
                    className={`relative h-auto w-full ${LOGO_MASKS[branding.logoMask ?? 'none']}`}
                  />
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 gap-5">
                {branding.mark && (
                  <FadeIn delay={120}>
                    <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-black/40 p-6">
                      <div
                        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: branding.panelBg }}
                      >
                        <Image
                          src={branding.mark.src}
                          alt={branding.mark.alt}
                          width={branding.mark.width}
                          height={branding.mark.height}
                          className="h-[72px] w-auto [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{branding.mark.title}</h3>
                        <p className="mt-1 text-sm text-white/55 font-light leading-relaxed">{branding.mark.body}</p>
                      </div>
                    </div>
                  </FadeIn>
                )}

                {branding.typography && (
                  <FadeIn delay={120}>
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                      <h3 className="text-lg font-medium text-white">Typography</h3>
                      <ul className="mt-4 grid grid-cols-2 gap-3">
                        {branding.typography.map((t) => (
                          <li key={t.family} className="rounded-xl border border-white/10 bg-black/40 p-4">
                            <p className="text-4xl text-white" style={{ fontFamily: caseStudyFonts[t.font], fontWeight: t.weight }} aria-hidden="true">
                              Aa
                            </p>
                            <p className="mt-3 text-sm font-medium text-white">{t.family}</p>
                            <p className="text-xs text-white/45">{t.role}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                )}

                <FadeIn delay={220}>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                    <h3 className="text-lg font-medium text-white">Palette</h3>
                    <ul className="mt-4 grid grid-cols-2 gap-3">
                      {branding.palette.map((c) => (
                        <li key={c.hex} className="overflow-hidden rounded-xl border border-white/10">
                          <div className="flex h-20 items-end p-3" style={{ backgroundColor: c.hex, color: c.ink }}>
                            <span className="text-xs font-mono uppercase tracking-wider">{c.hex}</span>
                          </div>
                          <div className="bg-black/50 px-3 py-2.5">
                            <p className="text-sm font-medium text-white">{c.name}</p>
                            <p className="text-xs text-white/45 leading-snug">{c.note}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Business card */}
        <section className="py-20 sm:py-24 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeading eyebrow="Business Cards" first={card.heading[0]} second={card.heading[1]} />
              <FadeIn delay={200}>
                <p className="mt-6 text-base sm:text-lg text-white/55 font-light leading-relaxed">{card.body}</p>
              </FadeIn>
              <FadeIn delay={300}>
                <ul className="mt-8 space-y-3 text-sm sm:text-base text-white/70">
                  {card.bullets.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: card.accent }} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <FadeIn>
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-2xl"
                  style={{ background: `linear-gradient(to bottom right, ${cs.accent}, rgba(168,85,247,0.1), rgba(6,182,212,0.15))` }}
                />
                <div className="relative">
                  <BusinessCard card={card} />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Flyer */}
        {flyer && (
          <section className="py-20 sm:py-24 relative bg-gradient-to-br from-slate-900 via-purple-900/25 to-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <SectionHeading eyebrow="Print Flyer" first={flyer.heading[0]} second={flyer.heading[1]} />
                <FadeIn delay={200}>
                  <p className="mt-6 text-base sm:text-lg text-white/55 font-light leading-relaxed">{flyer.body}</p>
                </FadeIn>
              </div>

              <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:gap-12">
                {flyer.variants.map((v, i) => (
                  <li key={v.label}>
                    <FadeIn delay={i * 150}>
                      <a
                        href={v.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group block rounded-lg transition-transform duration-500 ease-out hover:rotate-0 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transition-none ${
                          i % 2 === 0 ? 'sm:-rotate-2' : 'sm:rotate-2'
                        }`}
                      >
                        <div
                          className="relative overflow-hidden rounded-lg ring-1 ring-white/10 shadow-[0_40px_70px_-25px_rgba(0,0,0,0.95)]"
                          style={{ aspectRatio: flyer.aspect }}
                        >
                          <Image src={v.src} alt={v.alt} fill sizes="(max-width: 640px) 92vw, 440px" className="object-cover" />
                        </div>
                        <span className="mt-5 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-white/45 transition-colors group-hover:text-cyan-300">
                          {v.label} version
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          <span className="sr-only">(opens full size in a new tab)</span>
                        </span>
                      </a>
                    </FadeIn>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 sm:py-24 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-500/25 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/25 to-transparent rounded-full blur-3xl" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

              <div className="relative z-10 px-6 sm:px-10 md:px-16 py-12 sm:py-16 text-center">
                <TextReveal
                  as="h2"
                  className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white mb-4 leading-[1.05] tracking-[-0.04em]"
                  staggerMs={130}
                  lines={[
                    <span key="l1" className="block font-light opacity-90">Want your brand </span>,
                    <span key="l2" className={`block mt-2 pb-1 font-normal ${GRADIENT_TEXT}`}>and site to match?</span>,
                  ]}
                />
                <FadeIn delay={260}>
                  <p className="text-white/55 text-base sm:text-lg mb-8 sm:mb-10 leading-[1.7] font-light max-w-lg mx-auto">
                    Logo, cards and website, designed together from day one.
                  </p>
                </FadeIn>
                <FadeIn delay={380}>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                      <Button
                        asChild
                        className="relative overflow-hidden bg-black rounded-full text-white px-8 py-4 sm:px-10 sm:py-5 h-auto text-base font-semibold group"
                      >
                        <Link href="/contact">
                          <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                          <span className="relative z-10 flex items-center justify-center">
                            Start Your Project
                            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                          </span>
                        </Link>
                      </Button>
                    </div>
                    <a
                      href={cs.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center rounded-full border-[1.5px] border-white/40 px-8 py-4 sm:py-5 text-base font-semibold text-white transition-colors duration-300 hover:border-cyan-300 hover:text-cyan-300"
                    >
                      Visit {cs.liveLabel}
                      <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </FadeIn>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-cyan-300">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to all projects
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
