// Server Component — no hooks or browser APIs. The interactive leaves
// (TextReveal, FadeIn, Accordion, MiniContactForm) are client components in
// their own right, so the page copy stays out of the client bundle.
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SafeImage } from '@/components/ui/safe-image';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import { websiteMaintenanceFaqs as faqs } from '@/lib/service-content';

const INCLUDED = ['Managed Hosting', 'SSL & Daily Backups', 'Uptime Monitoring', 'GA4 & Search Console', 'Monthly Traffic Report', 'Priority Support'];

const CAPABILITIES = [
  { title: 'Managed Hosting & SSL', body: 'Infrastructure built for Next.js on Vercel\'s edge network — SSL included, no cPanel to babysit.' },
  { title: 'Daily Backups', body: 'Automated daily backups with easy one-click restores if anything ever goes wrong.' },
  { title: 'Uptime & Error Monitoring', body: '24/7 automated checks catch downtime, broken forms, and crawl errors before a customer does.' },
  { title: 'GA4 & Search Console', body: 'Set up properly and verified, in accounts you own — not held in ours.' },
  { title: 'Monthly Traffic Report', body: 'A short, plain-English read on what changed, where visitors came from, and what to do next.' },
  { title: 'Content Updates', body: 'Send us a change and it goes live — no wrestling with a CMS you touch four times a year.' },
];

const MIGRATION_STEPS = [
  { step: '01', title: 'Audit Your Current Setup', body: 'We review your existing host, DNS, SSL, and email configuration before touching anything.' },
  { step: '02', title: 'Migrate Everything', body: 'DNS, SSL, files, database, and email if applicable — handled end to end, included at no extra cost.' },
  { step: '03', title: 'Zero-Downtime Cutover', body: 'Timed for a low-traffic window so your visitors never notice the switch.' },
];

const DIFFERENTIATORS = [
  {
    title: 'Built for What We Build',
    body: 'Our infrastructure is purpose-built for Next.js on Vercel\'s edge network — not a generic shared host trying to run everything.',
    href: '/services/web-design',
    linkText: 'Web design',
  },
  {
    title: 'Design + Hosting, One Team',
    body: 'When the team that built your site also hosts it, issues get resolved fast — no finger-pointing between designer and host.',
    href: '/about',
    linkText: 'How we work',
  },
  {
    title: 'Reports a Human Wrote',
    body: 'Not an auto-generated PDF of charts — a short written read on what moved and what we suggest doing about it, from the people who built the site.',
    href: '/pricing',
    linkText: 'See full pricing',
  },
  {
    title: 'You Own Your Data',
    body: 'Analytics and Search Console live in your Google account with us added as users. If you ever leave, you keep every historical data point.',
    href: '/contact',
    linkText: 'Start a plan',
  },
];

const PLANS = [
  { name: 'Core', price: '$45', period: '/mo', annual: '$486/yr', desc: 'Managed hosting + SSL, daily backups, 30 min/month updates', popular: false },
  { name: 'Grow', price: '$70', period: '/mo', annual: '$756/yr', desc: 'Everything in Core, plus GA4 setup, monthly traffic report, 60 min/month updates', popular: true },
  { name: 'Prime', price: '$150', period: '/mo', annual: '$1,620/yr', desc: 'Everything in Grow, plus advanced performance tuning, 120 min/month updates', popular: false },
];

const WebsiteMaintenanceService = () => {
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
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">Website Maintenance — Markham &amp; the GTA</p>
              </FadeIn>
              <TextReveal
                as="h1"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6"
                staggerMs={120}
                lines={[
                  <span key="l1" className="block font-light opacity-90">Website Maintenance,</span>,
                  <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Not a Black Box.</span>,
                ]}
              />
              <FadeIn delay={240}>
                <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-light tracking-[0.01em] mb-8">
                  Managed hosting, uptime monitoring, and a plain-English monthly report — everything that keeps your site online, fast, and measurable, in one affordable monthly plan.
                </p>
              </FadeIn>
              <FadeIn delay={320}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                    <Button asChild className="relative overflow-hidden h-auto bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                      <Link href="/contact" className="flex items-center justify-center">
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                        <span className="flex items-center gap-2 relative z-10 group-hover:text-white">
                          Start a Maintenance Plan
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
                <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-cyan-400/40 via-purple-400/30 to-cyan-400/40 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="relative rounded-2xl overflow-hidden bg-black">
                    <div className="relative w-full aspect-[3/2]">
                      <SafeImage
                        src="/images/website-maintenance-dashboard.jpg"
                        alt="A real-time analytics dashboard showing site traffic, revenue, and top countries"
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
                Every plan keeps your site online and measured — hosting and reporting as one monthly plan, not two separate bills.
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

      {/* Migration, Included */}
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
              <span className="font-light opacity-90">Switching Hosts?</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Migration&apos;s Included.</span>
            </h2>
            <p className="text-white/55 text-base sm:text-lg font-light max-w-2xl mx-auto">
              No extra cost, no downtime your visitors will notice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {MIGRATION_STEPS.map((item, i) => (
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-4">
              <span className="font-light opacity-90">Fixed Pricing,</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">No Surprises</span>
            </h2>
            <p className="text-white/55 text-base sm:text-lg font-light max-w-xl mx-auto">
              Month-to-month, no lock-in contract — or save 10% paying annually.
            </p>
          </div>

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
                  <p className="text-3xl sm:text-4xl font-light text-white mb-1">
                    {plan.price}<span className="text-base text-white/40">{plan.period}</span>
                  </p>
                  <p className="text-white/35 text-xs font-light mb-3">or {plan.annual}</p>
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
              <span key="l1" className="block font-light opacity-90">Stop Guessing Whether</span>,
              <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Your Site Is Working.</span>,
            ]}
          />
          <FadeIn delay={260}>
            <p className="text-base sm:text-lg text-white/60 mb-8 sm:mb-10 max-w-2xl mx-auto leading-[1.7] font-light">
              Most small business sites run for years with no monitoring, no reporting, and no idea which pages bring in customers. A maintenance plan fixes that in the first month.
            </p>
          </FadeIn>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden h-auto bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                <Link href="/contact" className="flex items-center justify-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                  <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                    Start a Maintenance Plan
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
          src/app/services/website-maintenance/page.tsx */}
    </div>
  );
};

export default WebsiteMaintenanceService;
