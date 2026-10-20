// Server Component — its copy and headings ship in the initial HTML. The
// interactive leaves (TextReveal, FadeIn, MiniContactForm, Accordion) are
// client components in their own right; page-level JSON-LD is emitted
// server-side from the matching app/<route>/page.tsx instead of being
// injected here in a useEffect, where crawlers without JS never saw it.
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Users, Home, Scale, BookOpen, Gavel, Briefcase, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONCEPT_DEMOS } from '@/components/industries/ConceptDemoCallout';
import MiniContactForm from '@/components/forms/LazyMiniContactForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TextReveal } from '@/components/ui/text-reveal';
import { FadeIn } from '@/components/ui/fade-in';
import { memo } from 'react';
import { lawyersFaqs as faqs } from '@/lib/industry-content';
import { SafeImage } from '@/components/ui/safe-image';
import { ReviewsStrip } from '@/components/ReviewsStrip';
import { LSO_RULES_URL } from '@/lib/constants';

const lawyerHeroOffice = '/images/lawyer-gavel-office.png';
const lawyerResearchImage = '/images/lawyer-consultation-document.png';
const lawyerProjectDemo = '/images/project2.png';
const zenaraMark = '/images/zenara-logo-v5.svg';

interface PracticeAreaCard {
  icon: LucideIcon;
  title: string;
  copy: string;
}

const PRACTICE_AREAS: PracticeAreaCard[] = [
  {
    icon: Users,
    title: 'Family Law',
    copy: "An emotionally urgent search, often at a low point. A calm, reassuring tone and a clear path to a confidential consultation earns the call — a hard-sell CTA loses it.",
  },
  {
    icon: Home,
    title: 'Real Estate Law',
    copy: "Transaction-driven and time-sensitive. Clients want a simple closing-cost estimate path, not a long bio page — most decide before they've read a single paragraph of firm history.",
  },
  {
    icon: Scale,
    title: 'Personal Injury',
    copy: "Contingency-fee searches expect clarity up front: how the fee works, what the first consultation costs, and a fast intake form, all visible before the client scrolls past the fold. Past results can help, but only with the disclaimer the Law Society requires.",
  },
  {
    icon: BookOpen,
    title: 'Wills & Estates',
    copy: "Low urgency, high trust bar — clients are planning, not reacting. A plain-language explainer beats legal jargon every time; this is where clarity wins the retainer.",
  },
  {
    icon: Gavel,
    title: 'Criminal Defence',
    copy: "Urgent, often after-hours. A visible 24/7 phone number matters more than anything else on the page — a client calling from a police station won't fill out a contact form.",
  },
  {
    icon: Briefcase,
    title: 'Corporate & Business Law',
    copy: "A B2B decision made by a founder or ops lead. They want to see transaction experience and industry focus — not a generic \"we help businesses\" pitch.",
  },
];

// Figures from Clio's 2025 Legal Trends Report (a survey of 1,000 U.S.
// adults). There is no comparable Canadian survey; the source line says so.
// The figures previously shown here (96% / 81% / 57%) could not be traced to
// the report and were removed.
const CLIO_REPORT_URL = 'https://www.clio.com/resources/legal-trends/read-online/';

const STATS = [
  {
    stat: '70%',
    label: 'Of recent legal clients found hiring a lawyer easy',
    description: 'Largely thanks to referrals and online searches. Most still start with a referral, then check the firm online before they call.',
    source: 'Clio, 2025 Legal Trends Report (U.S. consumer survey)',
  },
  {
    stat: '1 in 2+',
    label: 'Would search online for their next lawyer',
    description: 'More than half say they would also turn to the internet next time, with firm websites and online reviews playing strong roles.',
    source: 'Clio, 2025 Legal Trends Report (U.S. consumer survey)',
  },
  {
    stat: '24%',
    label: 'Would not rehire the last lawyer they used',
    description: 'Even satisfied clients shop around for their next matter, so your website has to win them again, not just the first time.',
    source: 'Clio, 2025 Legal Trends Report (U.S. consumer survey)',
  },
];

interface LsoRule {
  rule: string;
  title: string;
  body: string;
}

// Paraphrased from the Law Society of Ontario's Rules of Professional
// Conduct, chapter 4 (rules 4.2-1, 4.2-1.1, 4.2-2, 4.3-1 and the 4.2-1
// commentary), checked against lso.ca on 2026-10-20.
const LSO_RULES: LsoRule[] = [
  {
    rule: 'Rule 4.2-1',
    title: 'Every claim has to be provable',
    body: 'Marketing must be demonstrably true, accurate and verifiable, and must not mislead. "Results-driven" and "aggressive" rarely survive that test. A specific practice focus and real experience do.',
  },
  {
    rule: 'Rule 4.3-1',
    title: '"Specialist" is a protected word',
    body: 'Only lawyers certified by the Law Society may advertise as specialists. We describe practice areas, experience and the matters you take on instead.',
  },
  {
    rule: '4.2-1 commentary',
    title: 'Past results need a disclaimer',
    body: 'Amounts recovered or a success rate should sit beside a statement that past results are not necessarily indicative of future results and that outcomes depend on the facts of each case.',
  },
  {
    rule: '4.2-1 commentary',
    title: 'No "best", no emotional testimonials',
    body: 'Suggesting superiority over other lawyers, raising expectations and testimonials with emotional appeals are listed as marketing that may contravene the rule. Awards and rankings must be bona fide.',
  },
  {
    rule: 'Rule 4.2-2',
    title: 'Published fees must be precise',
    body: 'If the site lists fees, it has to say what each fee covers and whether disbursements and HST are extra. Residential real estate pricing has its own, stricter rule (4.2-2.1).',
  },
  {
    rule: 'Rule 4.2-1.1',
    title: 'Say that you are licensed as a lawyer',
    body: 'Marketing materials must identify that the services are provided by a licensed lawyer, which on a website usually means the footer and every lawyer profile.',
  },
];

const FEATURES = [
  {
    title: 'Consultation Requests With Real Context',
    description: 'An intake form that captures case type and urgency up front, so the first call starts with real information instead of twenty minutes of back-and-forth.',
  },
  {
    title: 'Practice Area Pages That Actually Rank',
    description: 'A dedicated page for family law, real estate, and personal injury — not one generic "practice areas" list trying to cover all three at once.',
  },
  {
    title: 'Credentials Where Prospects Look',
    description: 'Year of call, practice focus, languages spoken and professional memberships shown where prospects actually look — not filed away on an About page nobody opens.',
  },
  {
    title: 'Lawyer Bios That Build Rapport',
    description: 'A real person with real credentials and a real photo — not a stock-photo team grid that could belong to any firm in the province.',
  },
];

const LOCATIONS = [
  { id: 'markham', city: 'Markham' },
  { id: 'stouffville', city: 'Stouffville' },
  { id: 'scarborough', city: 'Scarborough' },
  { id: 'toronto', city: 'Toronto' },
  { id: 'mississauga', city: 'Mississauga' },
  { id: 'richmond-hill', city: 'Richmond Hill' },
  { id: 'vaughan', city: 'Vaughan' },
  { id: 'pickering', city: 'Pickering' },
];

const SPECIALIST_LINKS = [
  { label: 'Family law websites', href: '/industries/family-law' },
  { label: 'Real estate law websites', href: '/industries/real-estate-law' },
];

const demo = CONCEPT_DEMOS.lawyers;

const Lawyers = () => {


  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* ===== Hero ===== */}
      <div className="relative">
        {/* Hero-only background treatment */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-star" style={{ top: '5%', left: '4%' }}></div>
          <div className="bg-star" style={{ top: '10%', left: '14%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '24%' }}></div>
          <div className="bg-star" style={{ top: '14%', left: '34%' }}></div>
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px] relative z-10">
          {/* Left — Text */}
          <div className="bg-slate-900/95 backdrop-blur-sm flex items-center py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16 border-r border-slate-800/50 pt-24 sm:pt-28 md:pt-32 lg:pt-40">
            <div className="w-full max-w-2xl mx-auto lg:mx-0">
              <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 mb-6"></div>

              <TextReveal
                as="h1"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-4 text-white leading-[1.1] tracking-[-0.04em]"
                staggerMs={110}
                lines={[
                  <span key="l1" className="font-light opacity-90">Law Firm</span>,
                  <span key="l2" className="font-light opacity-90">Web Design</span>,
                ]}
              />

              <p className="text-lg sm:text-xl md:text-2xl mb-6 font-light">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Toronto &amp; the GTA</span>
              </p>

              <FadeIn delay={260}>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8 font-light tracking-[0.01em]">
                  Websites for small and mid-size Ontario law firms — family, real estate, personal injury, criminal defence, wills &amp; estates, and corporate practices. Written to the Law Society&apos;s marketing rules, built to earn trust fast and turn visitors into consultations.
                </p>
              </FadeIn>

              <FadeIn delay={380}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                    <Button
                      asChild
                      className="w-full relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group"
                    >
                      <a href="#quote" className="flex items-center gap-2 relative z-10 group-hover:text-white">
                        <span className="relative z-10">Get A Free Quote</span>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      </a>
                    </Button>
                  </div>
                  <a
                    href="#demo"
                    className="inline-flex items-center justify-center gap-2 text-white/70 hover:text-cyan-300 transition-colors text-sm sm:text-base font-medium"
                  >
                    See a sample project
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <SafeImage
                src={lawyerHeroOffice}
                alt="Lawyer working in a modern law office — GTA law firm web design"
                className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out `}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
          </div>
        </div>
      </div>

      {/* ===== Practice areas — editorial numbered list ===== */}
      <section className="py-20 sm:py-24 md:py-28 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5 text-center">Practice Areas We Serve</p>
          </FadeIn>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.05] tracking-[-0.04em] text-center mb-6"
            staggerMs={120}
            lines={[
              <span key="l1" className="block font-light">Every Practice Area</span>,
              <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Converts Differently</span>,
            ]}
          />
          <FadeIn delay={200}>
            <p className="text-white/50 text-center mb-14 sm:mb-16 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light">
              A family law client and a corporate client don&apos;t make the same decision the same way. We build each site around how that practice area&apos;s clients actually search and decide.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {PRACTICE_AREAS.map((area, index) => (
              <FadeIn key={area.title} delay={index * 70}>
                <div className={`group flex items-start gap-5 py-7 ${index >= 2 ? 'border-t border-white/10' : ''}`}>
                  <span className="text-xs font-mono text-cyan-400/50 tracking-widest mt-1.5 flex-shrink-0 w-7">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <area.icon className="w-4 h-4 text-cyan-400/70 flex-shrink-0" strokeWidth={2} />
                      <h3 className="text-white font-medium text-lg group-hover:text-cyan-300 transition-colors duration-300">{area.title}</h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed font-light">{area.copy}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Divider — brand mark, straddling the seam between Practice Areas and Research ===== */}
      <div className="relative z-20 h-0">
        <div className="absolute left-0 right-0 -top-8 sm:-top-10 flex items-center justify-center pointer-events-none">
          <div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px]"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(103,232,249,0.5) 18%, rgba(196,181,253,0.5) 50%, rgba(103,232,249,0.5) 82%, transparent)',
              boxShadow: '0 0 12px rgba(103,232,249,0.35)',
            }}
          />
          <FadeIn>
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 via-purple-500/25 to-cyan-500/25 blur-xl animate-pulse" />
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <Image
                src={zenaraMark}
                alt=""
                aria-hidden="true"
                width={40}
                height={40}
                className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 animate-spin-slow drop-shadow-[0_0_10px_rgba(103,232,249,0.35)]"
              />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ===== Research — narrative + sourced stat strip ===== */}
      <section className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-star" style={{ top: '8%', left: '6%' }}></div>
          <div className="bg-star" style={{ top: '15%', left: '82%' }}></div>
          <div className="bg-star" style={{ top: '65%', left: '90%' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
            <div>
              <FadeIn>
                <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5">The Research Happens First</p>
              </FadeIn>
              <TextReveal
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6"
                staggerMs={120}
                lines={[
                  <span key="l1" className="block font-light">Before the</span>,
                  <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Consultation Call.</span>,
                ]}
              />
              <FadeIn delay={220}>
                <div className="space-y-5 text-white/60 text-base leading-[1.75] font-light">
                  <p>Legal decisions carry the highest trust bar of any service search — clients are handing over a problem they often can&apos;t solve themselves. Most still start with a referral, but very few call a referred lawyer without looking them up first, and a growing share skip the referral and search.</p>
                  <p>Reviews and credentials are the first filter, but your website is what closes the gap between &quot;found you&quot; and &quot;booked a consultation.&quot; A firm that looks credible online gets the call; one that doesn&apos;t loses it to a competitor with a more polished site.</p>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={150}>
              <SafeImage
                src={lawyerResearchImage}
                alt="Lawyer reviewing legal documents during a client consultation"
                className="w-full h-auto max-h-[440px] object-contain rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>

          <FadeIn delay={100}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden divide-y divide-white/10 md:divide-y-0 md:divide-x md:grid md:grid-cols-3">
              {STATS.map((item) => (
                <div key={item.stat} className="p-7 sm:p-8 text-center">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-3">
                    {item.stat}
                  </div>
                  <h3 className="text-white font-medium mb-2">{item.label}</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-light mb-3">{item.description}</p>
                  <p className="text-white/30 text-xs font-light italic">
                    Source:{' '}
                    <a href={CLIO_REPORT_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-cyan-300">
                      {item.source}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== What the site needs to do (+ concept project link-out) ===== */}
      <section id="demo" className="scroll-mt-24 py-20 sm:py-24 md:py-28 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14 sm:mb-16">
            <FadeIn className="order-2 lg:order-1">
              <a
                href={demo.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="group block relative overflow-hidden rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 pointer-events-none" />
                <span
                  className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 pl-3 pr-2 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.1em] rounded-full text-white shadow-lg"
                  style={{
                    background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #22d3ee)',
                    backgroundSize: '200% auto',
                    boxShadow: '0 0 16px rgba(103,232,249,0.55), 0 0 4px rgba(0,0,0,0.4)',
                  }}
                >
                  Concept Project
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
                </span>
                <div className="aspect-[16/10] relative bg-slate-900">
                  <SafeImage
                    src={lawyerProjectDemo}
                    alt={`${demo.name} — concept law firm website`}
                    className="w-full h-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
              </a>
            </FadeIn>
            <div className="order-1 lg:order-2">
              <FadeIn>
                <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5">What It Needs to Do</p>
              </FadeIn>
              <TextReveal
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6"
                staggerMs={120}
                lines={[
                  <span key="l1" className="block font-light">Not a Template</span>,
                  <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">With a New Logo.</span>,
                ]}
              />
              <FadeIn delay={220}>
                <p className="text-white/60 text-base leading-[1.75] font-light">
                  A site built around how clients actually shop for a law firm — not a generic build with your name swapped in.
                </p>
              </FadeIn>
              <FadeIn delay={280}>
                <Link
                  href="/projects/law-firm-concept"
                  className="inline-flex items-center gap-1.5 mt-6 text-cyan-400 hover:text-purple-400 transition-colors text-sm font-medium group/link"
                >
                  Read the law firm concept case study
                  <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
            {FEATURES.map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 80}>
                <div className={`py-6 ${index >= 2 ? 'border-t border-white/10' : ''}`}>
                  <h3 className="text-white font-medium text-base mb-1.5">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-light">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Law Society of Ontario marketing rules ===== */}
      <section aria-labelledby="lso-rules" className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/25 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12 sm:mb-14">
            <FadeIn>
              <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5">Law Society of Ontario Rules</p>
            </FadeIn>
            <h2 id="lso-rules" className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6">
              <span className="font-light">What your website </span>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">can and can&apos;t say</span>
            </h2>
            <FadeIn delay={150}>
              <p className="text-white/60 text-base sm:text-lg leading-[1.75] font-light">
                In Ontario, a law firm website is marketing, so chapter 4 of the Law Society&apos;s Rules of Professional Conduct applies to every page. Most web designers have never read it. We write to it from the first draft, so your review is about whether the site sounds like your firm, not about fixing claims you could never make.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-8">
            {LSO_RULES.map((item) => (
              <div key={item.title} className="bg-slate-950/90 p-6 sm:p-7">
                <p className="text-[11px] font-mono text-cyan-400/60 tracking-[0.15em] uppercase mb-2">{item.rule}</p>
                <h3 className="text-base sm:text-lg text-white font-medium mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed font-light">{item.body}</p>
              </div>
            ))}
          </div>

          <p className="text-white/40 text-xs font-light mb-6 max-w-3xl">
            This is how we apply the rules when we write, not legal advice. Your firm reviews and approves every page before it goes live. Source:{' '}
            <a href={LSO_RULES_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-cyan-300">
              Law Society of Ontario, Rules of Professional Conduct, chapter 4
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/resources/ontario-law-firm-website-checklist" className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-purple-400 transition-colors text-sm font-medium group/link">
              Ontario law firm website checklist
              <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
            <Link href="/blog/ontario-law-firm-website-content" className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-purple-400 transition-colors text-sm font-medium group/link">
              What an Ontario law firm website should say
              <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <ReviewsStrip headingId="lawyers-reviews" className="py-20 sm:py-24 bg-black" />

      {/* ===== FAQ (left) / Contact form (right) ===== */}
      <section id="quote" className="scroll-mt-24 py-20 sm:py-24 md:py-28 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900/25 to-slate-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-star" style={{ top: '10%', left: '8%' }}></div>
          <div className="bg-star" style={{ top: '18%', left: '88%' }}></div>
          <div className="bg-star" style={{ top: '75%', left: '92%' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
            {/* Left — FAQ */}
            <div>
              <FadeIn>
                <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5">FAQ</p>
              </FadeIn>
              <FadeIn delay={80}>
                <h2 className="text-3xl sm:text-4xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-6">
                  <span className="font-light opacity-90">Frequently Asked </span>
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Questions</span>
                </h2>
              </FadeIn>
              <FadeIn delay={150}>
                <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-3">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-white/10 rounded-xl bg-white/[0.02] data-[state=open]:bg-gradient-to-r data-[state=open]:from-cyan-500/15 data-[state=open]:via-purple-500/15 data-[state=open]:to-cyan-500/15 data-[state=open]:border-cyan-500/40 transition-all duration-200"
                    >
                      <AccordionTrigger className="px-5 py-4 hover:no-underline text-left data-[state=open]:text-white data-[state=closed]:text-white/80">
                        <span className="font-light text-sm pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 text-white/55 text-sm leading-[1.6] font-light">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1.5 mt-6 text-cyan-400 hover:text-purple-400 transition-colors text-sm font-medium group/link"
                >
                  See all FAQs
                  <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </FadeIn>
            </div>

            {/* Right — contact form */}
            <FadeIn delay={100}>
              <MiniContactForm
                id="lawyers-quote"
                projectType="Law Firm Website"
                heading="Get a Free Quote"
                subheading="Tell us about your firm and your practice areas — we'll follow up within 24–48 hours with next steps and a fixed-price estimate."
                messagePlaceholder="What kind of practice do you run, and what would you like your website to do for you?"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== Specialist practice areas — deeper pages under this hub ===== */}
      <section className="py-10 sm:py-12 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-[11px] font-mono text-white/30 tracking-[0.25em] uppercase mb-4">Specialist Practice Areas</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {SPECIALIST_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-purple-400 transition-colors text-sm font-medium group/link"
                >
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== Compact footer-like strip: service areas + more-help links ===== */}
      <section className="relative py-12 sm:py-14 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
            <FadeIn className="flex-1">
              <p className="text-[11px] font-mono text-white/30 tracking-[0.25em] uppercase mb-3">Where We Work</p>
              <p className="text-white/50 text-sm font-light leading-loose">
                {LOCATIONS.map((location, index) => (
                  <span key={location.id}>
                    <Link href={`/web-design/${location.id}`} className="hover:text-cyan-300 transition-colors">
                      {location.city}
                    </Link>
                    {index < LOCATIONS.length - 1 && <span className="text-white/15 mx-2.5">/</span>}
                  </span>
                ))}
              </p>
            </FadeIn>

            <div className="hidden lg:block w-px self-stretch bg-white/10 flex-shrink-0" />

            <FadeIn delay={100} className="flex-1 lg:max-w-sm">
              <p className="text-[11px] font-mono text-white/30 tracking-[0.25em] uppercase mb-3">More Information</p>
              <p className="text-white/50 text-sm font-light leading-loose">
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  Talk to us directly
                </Link>
                <span className="text-white/15 mx-2.5">/</span>
                <Link href="/pricing" className="hover:text-cyan-300 transition-colors">
                  See pricing
                </Link>
                <span className="text-white/15 mx-2.5">/</span>
                <Link href="/process" className="hover:text-cyan-300 transition-colors">
                  See how we build it
                </Link>
                <span className="text-white/15 mx-2.5">/</span>
                <Link href="/blog/ontario-law-firm-website-content" className="hover:text-cyan-300 transition-colors">
                  What a law firm website should say
                </Link>
                <span className="text-white/15 mx-2.5">/</span>
                <Link href="/resources/ontario-law-firm-website-checklist" className="hover:text-cyan-300 transition-colors">
                  Ontario law firm website checklist
                </Link>
                <span className="text-white/15 mx-2.5">/</span>
                <Link href="/blog/law-firm-website-cost-ontario" className="hover:text-cyan-300 transition-colors">
                  What a law firm website costs
                </Link>
                <span className="text-white/15 mx-2.5">/</span>
                <Link href="/blog/law-firm-seo-toronto" className="hover:text-cyan-300 transition-colors">
                  Law firm SEO in Toronto
                </Link>
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQPage + Breadcrumb schema is server-rendered in src/app/lawyers/page.tsx */}
    </div>
  );
};

export default memo(Lawyers);
