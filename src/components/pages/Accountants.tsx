// Server Component — its copy and headings ship in the initial HTML. The
// interactive leaves (TextReveal, FadeIn, MiniContactForm, Accordion) are
// client components in their own right; page-level JSON-LD is emitted
// server-side from the matching app/<route>/page.tsx instead of being
// injected here in a useEffect, where crawlers without JS never saw it.
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Building2, Calculator, ShieldCheck, TrendingUp, FileText, Percent, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONCEPT_DEMOS } from '@/components/industries/ConceptDemoCallout';
import MiniContactForm from '@/components/forms/LazyMiniContactForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TextReveal } from '@/components/ui/text-reveal';
import { FadeIn } from '@/components/ui/fade-in';
import { memo } from 'react';
import { accountantsFaqs as faqs } from '@/lib/industry-content';
import { SafeImage } from '@/components/ui/safe-image';

const accountantHeroOffice = '/images/accountant-computer-office.png';
const accountantResearchImage = '/images/accountant-website-work.png';
const accountantProjectDemo = '/images/accounting-firm-project.png';
const zenaraMark = '/images/zenara-logo-v5.svg';

interface ServiceLineCard {
  icon: LucideIcon;
  title: string;
  copy: string;
}

const SERVICE_LINES: ServiceLineCard[] = [
  {
    icon: Building2,
    title: 'Corporate Tax & Compliance',
    copy: "Corporate clients are vetting reliability under deadline pressure. What earns the call isn't more copy — it's clear filing timelines, CRA compliance signals, and a firm that looks like it never misses one.",
  },
  {
    icon: Calculator,
    title: 'Bookkeeping & Payroll',
    copy: "The most price-sensitive, recurring-service category. Owners want to see your software stack — QuickBooks, Xero, Wave — before they'll trust you with monthly reconciliation.",
  },
  {
    icon: ShieldCheck,
    title: 'Audit & Assurance',
    copy: "Often chosen by a board or a lender, not an individual. Licensing, CPA Ontario standing, and prior engagement scope matter more than any design flourish here.",
  },
  {
    icon: TrendingUp,
    title: 'Virtual CFO & Advisory',
    copy: "Growth-stage owners aren't shopping for compliance — they're shopping for judgment. Case studies of real business outcomes do more selling than a services list.",
  },
  {
    icon: FileText,
    title: 'Personal Tax Preparation',
    copy: "A seasonal surge every spring. The sites that convert have an obvious, secure document-upload path — not a contact form buried three clicks down.",
  },
  {
    icon: Percent,
    title: 'Mortgage Brokering',
    copy: "Rate-sensitive and urgency-driven. A visible current-rate snapshot and a fast pre-qualification form beat a static brochure every time.",
  },
];

const STATS = [
  {
    stat: '85%',
    label: 'More likely to choose a business after positive reviews',
    description: 'A strong review gets a prospective client curious — your website is what turns curious into a discovery call.',
    source: 'BrightLocal, Local Consumer Review Survey 2026',
  },
  {
    stat: '71%',
    label: 'Still discover local businesses through Google search',
    description: 'Even as AI search tools grow, Google remains where most prospective clients find your firm first.',
    source: 'BrightLocal, Local Consumer Review Survey 2026',
  },
  {
    stat: '5×',
    label: 'More new clients for firms with a fully digital experience',
    description: 'Firms where most of the client relationship happens online bring in significantly more new business than firms that don’t.',
    source: 'TaxDome, 2026 Niche Business Accounting Report',
  },
];

const FEATURES = [
  {
    title: 'Secure Client Portals, Not Email Attachments',
    description: 'Encrypted document upload for T4s, receipts, and statements — so sensitive financial data never has to travel as a loose email attachment.',
  },
  {
    title: 'Software Stack Shown Where Clients Look',
    description: 'QuickBooks, Xero, and Wave certified-advisor badges displayed up front — proof your systems will talk to theirs before they ever ask.',
  },
  {
    title: 'Service-Line Pages That Actually Rank',
    description: 'A dedicated page for corporate tax, bookkeeping, and advisory — not one generic "services" paragraph trying to cover all three at once.',
  },
  {
    title: 'Credentials, Not Buried',
    description: 'CPA and CA designations shown where prospective clients actually look — not filed away on an About page nobody opens.',
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

const demo = CONCEPT_DEMOS.accountants;

const Accountants = () => {


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
                  <span key="l1" className="font-light opacity-90">Accounting & Advisory</span>,
                  <span key="l2" className="font-light opacity-90">Firm Web Design</span>,
                ]}
              />

              <p className="text-lg sm:text-xl md:text-2xl mb-6 font-light">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">the GTA</span>
              </p>

              <FadeIn delay={260}>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8 font-light tracking-[0.01em]">
                  Built for CPAs, bookkeepers, tax preparers, virtual CFOs, and mortgage brokers. A site that signals security and precision, and turns visitors into booked discovery calls.
                </p>
              </FadeIn>

              <FadeIn delay={380}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                    <Button
                      asChild
                      className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group"
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
                src={accountantHeroOffice}
                alt="Accountant working at a modern office desk — GTA accounting firm web design"
                className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out `}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
          </div>
        </div>
      </div>

      {/* ===== Service lines — editorial numbered list ===== */}
      <section className="py-20 sm:py-24 md:py-28 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5 text-center">Service Lines We Serve</p>
          </FadeIn>
          <TextReveal
            className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.05] tracking-[-0.04em] text-center mb-6"
            staggerMs={120}
            lines={[
              <span key="l1" className="block font-light">Every Practice Sells</span>,
              <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Differently Online</span>,
            ]}
          />
          <FadeIn delay={200}>
            <p className="text-white/50 text-center mb-14 sm:mb-16 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light">
              A bookkeeper and a virtual CFO don&apos;t win the same client the same way. We build each site around how that practice&apos;s clients actually search and decide.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {SERVICE_LINES.map((line, index) => (
              <FadeIn key={line.title} delay={index * 70}>
                <div className={`group flex items-start gap-5 py-7 ${index >= 2 ? 'border-t border-white/10' : ''}`}>
                  <span className="text-xs font-mono text-cyan-400/50 tracking-widest mt-1.5 flex-shrink-0 w-7">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <line.icon className="w-4 h-4 text-cyan-400/70 flex-shrink-0" strokeWidth={2} />
                      <h3 className="text-white font-medium text-lg group-hover:text-cyan-300 transition-colors duration-300">{line.title}</h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed font-light">{line.copy}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Divider — brand mark, straddling the seam between Service Lines and Research ===== */}
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
                className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6"
                staggerMs={120}
                lines={[
                  <span key="l1" className="block font-light">Before the</span>,
                  <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Discovery Call.</span>,
                ]}
              />
              <FadeIn delay={220}>
                <div className="space-y-5 text-white/60 text-base leading-[1.75] font-light">
                  <p>Accounting decisions rarely start with a phone call anymore — they start with a search, especially once a referral runs dry. Business owners bring in a professional for tax season, but by the time they reach out, they&apos;ve usually already compared a couple of firms online.</p>
                  <p>That comparison happens before you ever hear from them. Reviews are the first filter, and a strong one gets a prospect curious enough to check your site. Your website is what turns that curiosity into a booked consultation.</p>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={150}>
              <SafeImage
                src={accountantResearchImage}
                alt="Accountant reviewing financial documents with a client"
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
                  <p className="text-white/30 text-xs font-light italic">Source: {item.source}</p>
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
                    src={accountantProjectDemo}
                    alt={`${demo.name} — concept accounting firm website`}
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
                className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6"
                staggerMs={120}
                lines={[
                  <span key="l1" className="block font-light">Not a Template</span>,
                  <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">With a New Logo.</span>,
                ]}
              />
              <FadeIn delay={220}>
                <p className="text-white/60 text-base leading-[1.75] font-light">
                  A site built around how clients actually shop for an accounting firm — not a generic build with your name swapped in.
                </p>
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
                  {faqs.slice(0, 4).map((faq, index) => (
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
                id="accountants-quote"
                projectType="Accounting Firm Website"
                heading="Get a Free Quote"
                subheading="Tell us about your practice and your service lines — we'll follow up within 24–48 hours with next steps and a fixed-price estimate."
                messagePlaceholder="What kind of practice do you run, and what would you like your website to do for you?"
              />
            </FadeIn>
          </div>
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
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQPage + Breadcrumb schema is server-rendered in src/app/accountants/page.tsx */}
    </div>
  );
};

export default memo(Accountants);
