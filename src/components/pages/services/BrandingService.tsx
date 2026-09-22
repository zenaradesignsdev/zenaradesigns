// Server Component — no hooks or browser APIs. The interactive leaves
// (TextReveal, FadeIn, Accordion, MiniContactForm) are client components in
// their own right, so the page copy stays out of the client bundle.
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SafeImage } from '@/components/ui/safe-image';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import { brandingFaqs as faqs } from '@/lib/service-content';

const INCLUDED = ['Custom Logo Mark', 'Colour Palette', 'Typography Pairing', 'Business Card Design', 'Print-Ready Files', 'Source Files (AI/SVG/PDF)'];

const CAPABILITIES = [
  { title: 'Custom Logo Design', body: 'Hand-designed concepts built around your business — no templates, no stock icons, no AI-generated marks.' },
  { title: 'Colour & Typography System', body: 'A considered palette and type pairing that carries across your logo, cards, and website consistently.' },
  { title: 'Print-Ready Business Cards', body: 'CMYK, bleed, and 300 DPI files that work with any professional printer — no back-and-forth before your first print run.' },
  { title: 'Multi-Format Delivery', body: 'SVG, PNG, PDF, and EPS, with light and dark variants and social-ready sizes for every profile and cover photo.' },
  { title: 'Print Vendor Coordination', body: 'We work directly with trusted GTA print vendors so colour comes out right the first time.' },
  { title: 'Original, Trademark-Eligible', body: '100% original work — no clip art, no recycled concepts — eligible for trademark registration in Canada.' },
];

const PROCESS = [
  { step: '01', title: 'Discovery Call', body: 'A short conversation about your business, audience, and competitors — so concepts start from understanding, not guesswork.' },
  { step: '02', title: '3 Logo Concepts', body: 'Three distinct directions to choose from, each with a rationale for why it fits your business.' },
  { step: '03', title: '2 Rounds of Revisions', body: 'We refine your chosen direction until it\'s right — colour, typography, and spacing all dialled in.' },
  { step: '04', title: 'Full Delivery', body: 'Every file format you need, plus business cards designed to match, ready to send straight to print.' },
];

const DIFFERENTIATORS = [
  {
    title: 'Concepts With Direction',
    body: 'We ask about your business and competitors before opening a design tool, so the first concepts you see are already close, not a random assortment.',
    href: '/about',
    linkText: 'How we work',
  },
  {
    title: 'One Cohesive Identity',
    body: 'Your logo, business cards, and website (if you\'re building one with us) share the same colours, type, and visual language — nothing feels bolted on.',
    href: '/services/web-design',
    linkText: 'Web design',
  },
  {
    title: 'Original & Yours to Keep',
    body: 'No templates or clip art — every mark is designed from scratch, and every source file is handed over. You own it outright, forever.',
    href: '/pricing',
    linkText: 'See full pricing',
  },
  {
    title: 'Print-Production Ready',
    body: 'Files are pre-flighted for print from day one — correct bleed, colour mode, and resolution — so there are no costly reprints.',
    href: '/contact',
    linkText: 'Start your brand',
  },
];

const PLANS = [
  { name: 'Logo Design', price: '$99–$199', desc: '3 concepts, 2 revisions, vector files, 1 week' },
  { name: 'Business Cards', price: '$149–$399', desc: 'Custom design, premium printing, 2–3 day turnaround' },
];

const BrandingService = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/40 to-black" />
          <div className="bg-star" style={{ top: '5%', left: '3%' }} />
          <div className="bg-star" style={{ top: '8%', left: '15%' }} />
          <div className="bg-star" style={{ top: '12%', left: '28%' }} />
          <div className="bg-star" style={{ top: '6%', left: '42%' }} />
          <div className="bg-star" style={{ top: '15%', left: '55%' }} />
          <div className="bg-star" style={{ top: '9%', left: '68%' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            {/* Left — heading */}
            <div className="lg:col-span-3">
              <FadeIn>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">Branding — Markham &amp; the GTA</p>
              </FadeIn>
              <TextReveal
                as="h1"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6"
                staggerMs={120}
                lines={[
                  <span key="l1" className="block font-light opacity-90">Custom Brand Identity,</span>,
                  <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Not a Template.</span>,
                ]}
              />
              <FadeIn delay={240}>
                <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-light tracking-[0.01em] mb-8">
                  Logo design and business cards for GTA businesses — hand-designed concepts at an affordable, fixed price, delivered print-ready. No stock icons, no cookie-cutter templates.
                </p>
              </FadeIn>
              <FadeIn delay={320}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                    <Button asChild className="relative overflow-hidden h-auto bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                      <Link href="/contact" className="flex items-center justify-center">
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                        <span className="flex items-center gap-2 relative z-10 group-hover:text-white">
                          Start Your Brand
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-white/70 hover:text-white border border-white/15 hover:border-cyan-400/40 rounded-full px-6 sm:px-8 py-3 sm:py-4 transition-colors"
                  >
                    View Pricing
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right — framed photo */}
            <div className="lg:col-span-2">
              <FadeIn delay={200}>
                <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-cyan-400/40 via-purple-400/30 to-cyan-400/40 -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="relative rounded-2xl overflow-hidden bg-black">
                    <div className="relative w-full aspect-[3/2]">
                      <SafeImage
                        src="/images/branding-design-workspace.jpg"
                        alt="A designer's desk with Pantone colour swatches, a drawing tablet, and marker sketches for a logo concept"
                        className="w-full h-full object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* What You Actually Get */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-black">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/30 to-black" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-6">What You Actually Get</p>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 lg:items-start">
            {/* Left — what's included */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-light text-white leading-snug tracking-tight mb-6">
                Every branding project includes the same core deliverables — logo and cards designed as one identity.
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {INCLUDED.map((item) => (
                  <span key={item} className="rounded-full border border-cyan-500/25 bg-cyan-500/[0.06] px-3.5 py-1.5 text-sm text-cyan-300/80 font-light">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — capabilities, no icons */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {CAPABILITIES.map((item) => (
                  <div key={item.title} className="pl-4 border-l-2 border-cyan-500/40">
                    <p className="text-white font-medium text-sm mb-1">{item.title}</p>
                    <p className="text-white/50 text-sm font-light leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="bg-star" style={{ top: '5%', left: '3%' }} />
          <div className="bg-star" style={{ top: '8%', left: '12%' }} />
          <div className="bg-star" style={{ top: '12%', left: '25%' }} />
          <div className="bg-star" style={{ top: '6%', left: '38%' }} />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-4">
              <span className="font-light opacity-90">How It</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Works</span>
            </h2>
            <p className="text-white/55 text-base sm:text-lg font-light max-w-2xl mx-auto">
              From first call to final files — a straightforward process, start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PROCESS.map((item, i) => (
              <FadeIn key={item.step} delay={i * 100}>
                <div className="relative rounded-xl border border-slate-800/50 bg-slate-950/60 p-6 h-full">
                  <p className="text-cyan-400/40 text-3xl font-light mb-3">{item.step}</p>
                  <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Zenara */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-black">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/40 to-black" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em]">
              <span className="font-light opacity-90">Why Choose</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Zenara Designs</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            {DIFFERENTIATORS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="bg-slate-950/80 hover:bg-slate-900/90 transition-colors duration-300 p-6 sm:p-7 flex flex-col gap-3 h-full group">
                  <div className="flex-1">
                    <p className="text-white font-medium text-base mb-2 group-hover:text-cyan-300 transition-colors duration-300">{item.title}</p>
                    <p className="text-white/45 text-sm leading-relaxed font-light">{item.body}</p>
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
      </section>

      {/* Pricing Snapshot */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="bg-star" style={{ top: '5%', left: '5%' }} />
          <div className="bg-star" style={{ top: '10%', left: '20%' }} />
          <div className="bg-star" style={{ top: '8%', left: '80%' }} />
          <div className="bg-star" style={{ top: '14%', left: '92%' }} />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-4">
              <span className="font-light opacity-90">Fixed Pricing,</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">No Surprises</span>
            </h2>
            <p className="text-white/55 text-base sm:text-lg font-light max-w-xl mx-auto">
              Affordable, transparent pricing — the price you&apos;re quoted is the price you pay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-10">
            {PLANS.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 100}>
                <div className="relative rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-sm p-6 text-center">
                  <p className="text-white/50 text-xs uppercase tracking-[0.15em] font-medium mb-3">{plan.name}</p>
                  <p className="text-3xl sm:text-4xl font-light text-white mb-2">{plan.price}</p>
                  <p className="text-white/50 text-sm font-light">{plan.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center text-sm sm:text-base font-medium text-cyan-300/80 hover:text-cyan-300 transition-colors duration-300 group"
            >
              See full pricing &amp; what&apos;s included <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-black">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-8 sm:mb-12 text-center">
            <span className="block font-light opacity-90">Frequently Asked</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Questions</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden border border-white/[0.09] rounded-xl bg-slate-900/50 hover:border-cyan-500/20 open:border-cyan-500/35 open:bg-slate-900/80 transition-all duration-300"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-white/70 group-hover:text-white group-open:text-white font-light text-sm sm:text-base list-none transition-colors duration-300">
                  {faq.question}
                  <ArrowRight
                    className="h-4 w-4 text-white/30 group-hover:text-cyan-400 shrink-0 transition-all duration-300 group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 sm:px-6 pb-4 sm:pb-5 text-white/55 text-sm leading-[1.75] font-light">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-black">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black" />
          <div className="bg-star" style={{ top: '5%', left: '3%' }} />
          <div className="bg-star" style={{ top: '8%', left: '12%' }} />
          <div className="bg-star" style={{ top: '12%', left: '25%' }} />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <TextReveal
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extralight mb-6 text-white leading-[1.1] tracking-[-0.04em]"
            staggerMs={130}
            lines={[
              <span key="l1" className="block font-light opacity-90">Ready for a Brand</span>,
              <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">That Looks Like You?</span>,
            ]}
          />
          <FadeIn delay={260}>
            <p className="text-base sm:text-lg text-white/60 mb-8 sm:mb-10 max-w-2xl mx-auto leading-[1.7] font-light">
              Get a free consultation and a fixed quote within 24 hours. No obligation, no pressure — just a clear answer.
            </p>
          </FadeIn>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden h-auto bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                <Link href="/contact" className="flex items-center justify-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                  <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </Link>
              </Button>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-white/70 hover:text-white border border-white/15 hover:border-cyan-400/40 rounded-full px-6 sm:px-8 py-3 sm:py-4 transition-colors"
            >
              See Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Schema (Service, FAQPage, Breadcrumb) is server-rendered in
          src/app/services/branding/page.tsx */}
    </div>
  );
};

export default BrandingService;
