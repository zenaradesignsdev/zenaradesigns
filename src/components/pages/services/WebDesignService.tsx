// Server Component — no hooks or browser APIs. The interactive leaves
// (TextReveal, FadeIn, Accordion, MiniContactForm) are client components in
// their own right, so the page copy stays out of the client bundle.
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SafeImage } from '@/components/ui/safe-image';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import { webDesignFaqs as faqs } from '@/lib/service-content';

const STACK = ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Cloudflare', 'Figma'];

const CAPABILITIES = [
  { title: 'Custom UI/UX Design', body: 'Bespoke layouts built around your brand — no templates, no page builders.' },
  { title: 'Responsive, Mobile-First', body: 'Designed for the small screen first, then scaled up — most local searches start on a phone.' },
  { title: 'Performance Tuned', body: 'Server-rendered with Next.js for sub-2.5-second loads and Lighthouse scores that hold up.' },
  { title: 'SEO Built In', body: 'Semantic HTML, structured data, and clean meta tags from the first commit — not bolted on after launch.' },
  { title: 'Clean, Maintainable Code', body: 'TypeScript throughout, so your site can grow without accumulating technical debt.' },
  { title: 'Accessible by Default', body: 'Semantic markup, keyboard navigation, and colour contrast that meets WCAG guidelines.' },
];

const DIFFERENTIATORS = [
  {
    title: 'Next.js, Not WordPress',
    body: 'Faster load times, better SEO through server rendering, and no plugin vulnerabilities to patch.',
    href: '/services/website-maintenance',
    linkText: 'Website maintenance',
  },
  {
    title: 'Fixed-Price Transparency',
    body: 'A clear, fixed-price quote before a single line of code is written — no hourly billing surprises.',
    href: '/pricing',
    linkText: 'See full pricing',
  },
  {
    title: 'AI-Assisted, Not AI-Generic',
    body: 'We use modern, AI-assisted workflows to move faster than a traditional agency — the sites just don\'t look like it.',
    href: '/about',
    linkText: 'How we work',
  },
  {
    title: 'GTA-Local Expertise',
    body: 'From Markham professional practices to Stouffville trades — local insight that shows up in the details.',
    href: '/locations',
    linkText: 'Areas we serve',
  },
];

const FEATURED_WORK = [
  {
    slug: 'ashcam-cutting-solutions',
    name: 'AshCam Cutting Solutions',
    industry: 'Construction supply & e-commerce',
    url: 'ashcamcuttingsolution.ca',
    href: 'https://ashcamcuttingsolution.ca/',
    image: '/images/ashcam-site.png',
    imageAlt: 'AshCam Cutting Solutions website — construction blades and equipment e-commerce platform',
  },
  {
    slug: 'fungen-events',
    name: 'FunGen Events',
    industry: 'Event planning',
    url: 'fungenevents.ca',
    href: 'https://fungenevents.ca/',
    image: '/images/fungen-events.png',
    imageAlt: 'FunGen Events website — event planning services with a showcase of recent events',
  },
  {
    slug: 'jb-loans',
    name: 'JB Loans',
    industry: 'Mortgage brokerage',
    url: 'jbloans.ca',
    href: 'https://jbloans.ca/',
    image: '/images/jbloans.png',
    imageAlt: 'JB Loans website — mortgage broker site with application enquiry flow',
  },
  {
    slug: 'ik-smart-solution',
    name: 'IK Smart Solution',
    industry: 'Security & smart home',
    url: 'iksmartsolution.ca',
    href: 'https://www.iksmartsolution.ca/',
    image: '/images/iksmartsolutions.png',
    imageAlt: 'IK Smart Solution website — security systems and smart home integrator',
  },
  {
    slug: 'heroes-catering',
    name: 'Heroes Catering',
    industry: 'Catering & hospitality',
    url: 'heroes-catering.com',
    href: 'https://heroes-catering.com/',
    image: '/images/heroes-catering.png',
    imageAlt: 'Heroes Catering website — catering services and menu presentation',
  },
];

const PLANS = [
  { name: 'Starter', price: '$499', originalPrice: '$999', desc: 'Up to 3 pages, 3–5 day turnaround', popular: false },
  { name: 'Small Business', price: '$1,499', originalPrice: '$1,999', desc: 'Up to 6 pages, custom sections, 1–2 weeks', popular: true },
  { name: 'Pro', price: '$4,999+', originalPrice: undefined, desc: 'Advanced functionality, e-commerce, 3–4 weeks', popular: false },
];

const WebDesignService = () => {
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
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">Web Design — Markham &amp; the GTA</p>
              </FadeIn>
              <TextReveal
                as="h1"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6"
                staggerMs={120}
                lines={[
                  <span key="l1" className="block font-light opacity-90">Custom Web Design,</span>,
                  <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Not a Template.</span>,
                ]}
              />
              <FadeIn delay={240}>
                <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-light tracking-[0.01em] mb-8">
                  Modern, responsive, SEO-optimized websites built with Next.js — designed and coded from scratch, at an affordable, fixed price, for GTA businesses that want to look nothing like the competition.
                </p>
              </FadeIn>
              <FadeIn delay={320}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                    <Button asChild className="w-full relative overflow-hidden h-auto bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                      <Link href="/contact" className="flex items-center justify-center">
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                        <span className="flex items-center gap-2 relative z-10 group-hover:text-white">
                          Get a Free Quote
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

            {/* Right — framed photo, tilted card treatment */}
            <div className="lg:col-span-2">
              <FadeIn delay={200}>
                <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-cyan-400/40 via-purple-400/30 to-cyan-400/40 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="relative rounded-2xl overflow-hidden bg-black">
                    <div className="relative w-full aspect-[4/5]">
                      <SafeImage
                        src="/images/web-design-workspace.jpg"
                        alt="A designer reviewing wireframes on a laptop at a clean, modern desk"
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
            {/* Left — the real stack */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-light text-white leading-snug tracking-tight mb-6">
                Built on the same modern stack for every project — no shortcuts, no plugin stacks to patch.
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {STACK.map((tech) => (
                  <span key={tech} className="rounded-full border border-cyan-500/25 bg-cyan-500/[0.06] px-3.5 py-1.5 text-sm text-cyan-300/80 font-light">
                    {tech}
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

      {/* Featured Work */}
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
              <span className="font-light opacity-90">Featured</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Work</span>
            </h2>
            <p className="text-white/55 text-base sm:text-lg font-light max-w-2xl mx-auto">
              Real sites we&apos;ve designed and shipped for GTA businesses — not mockups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10">
            {FEATURED_WORK.map((project) => (
              <a
                key={project.slug}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — view the live site (opens in a new tab)`}
                className="group relative flex flex-col rounded-xl overflow-hidden border border-slate-800/50 hover:border-cyan-500/40 bg-slate-950/60 sm:last:odd:col-span-2 sm:last:odd:justify-self-center sm:last:odd:w-[calc(50%-1rem)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Browser chrome frame */}
                <div className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-900/90 border-b border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="ml-2 text-[11px] text-white/35 font-mono truncate">{project.url}</span>
                </div>
                <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                  <SafeImage
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-300/60 text-xs font-medium uppercase tracking-wide">{project.industry}</span>
                    <h3 className="text-white font-semibold text-base group-hover:text-cyan-300 transition-colors duration-300">{project.name}</h3>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center text-sm sm:text-base font-medium text-white/70 hover:text-white transition-colors duration-300 group"
            >
              See all projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-4">
              <span className="font-light opacity-90">Fixed Pricing,</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">No Surprises</span>
            </h2>
            <p className="text-white/55 text-base sm:text-lg font-light max-w-xl mx-auto">
              Affordable, transparent packages — the price you&apos;re quoted is the price you pay.
            </p>
          </div>

          <FadeIn delay={120}>
            <div className="flex justify-center mb-8 sm:mb-10">
              <div className="group relative inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 border border-amber-300/30 bg-amber-400/[0.07] backdrop-blur-sm overflow-hidden">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/10 via-amber-300/[0.04] to-amber-400/10 animate-pulse pointer-events-none" />
                <span className="relative z-10 text-xs sm:text-sm font-medium text-amber-100/90 tracking-wide">
                  Summer Offer — <span className="text-amber-300 font-semibold">$500 off</span> Starter &amp; Small Business plans
                </span>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:items-center">
            {PLANS.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 100}>
                <div
                  className={`relative rounded-2xl border backdrop-blur-sm p-6 text-center transition-all duration-300 ${
                    plan.popular
                      ? 'border-cyan-400/50 bg-slate-900/90 shadow-lg shadow-cyan-500/10 sm:scale-105'
                      : 'border-white/10 bg-slate-950/60'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                        <Star className="h-3 w-3 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  <p className="text-white/50 text-xs uppercase tracking-[0.15em] font-medium mb-3">{plan.name}</p>
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-base font-light text-white/35 line-through decoration-amber-300/50">{plan.originalPrice}</span>
                      <span className="text-[10px] font-semibold text-amber-300 bg-amber-400/15 border border-amber-300/35 rounded-full px-2 py-0.5 whitespace-nowrap">$500 OFF</span>
                    </div>
                  )}
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
              <span key="l1" className="block font-light opacity-90">Ready to Build Your</span>,
              <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Dream Website?</span>,
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
          src/app/services/web-design/page.tsx */}
    </div>
  );
};

export default WebDesignService;
