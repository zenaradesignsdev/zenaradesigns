// Server Component — no hooks or browser APIs. The interactive leaves
// (TextReveal, FadeIn, Accordion, MiniContactForm) are client components in
// their own right, so the page copy stays out of the client bundle.
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RelatedGuide } from '@/components/Blog/RelatedGuide';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SafeImage } from '@/components/ui/safe-image';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import { seoFaqs as faqs, serviceContent } from '@/lib/service-content';

const INCLUDED = ['Google Business Profile', 'Review Strategy', 'Location & Service Pages', 'Core Citations', 'Technical SEO', 'Bing & AI Search', 'Monthly Reporting'];

// How Google says it ranks local results (Google Business Profile Help,
// "Tips to improve your local ranking on Google").
const GOOGLE_LOCAL_RANKING_URL = 'https://support.google.com/business/answer/7091';

const LOCAL_FACTORS = [
  {
    title: 'Relevance',
    body: 'How well your listing and website match what someone searched for. This is the part we control most: accurate categories, a service list that says what you actually do, and a page for each service.',
  },
  {
    title: 'Distance',
    body: 'How far you are from the searcher. Nobody can change this, which is why a Markham business rarely shows in the map pack for a search made in Mississauga. For towns further out we focus on your organic pages instead.',
  },
  {
    title: 'Prominence',
    body: 'How well known you are: reviews, links and mentions from other sites. Google says it plainly: more reviews and positive ratings can help. We build a steady, rule-abiding way to earn them.',
  },
];

const CAPABILITIES = [
  { title: 'Google Business Profile', body: 'The right primary category, a service list with real prices, genuine hours, a service area you actually cover, and real photos. Completed properly, then kept current.' },
  { title: 'A Review System', body: 'A short request every happy and unhappy customer gets at handoff, with your review link in emails and invoices. No incentives, no filtering, no asking for keywords.' },
  { title: 'Location & Service Pages', body: 'A page for each service, and a page for a town only where you have something real to say about it. No city-swapped copies.' },
  { title: 'Core Citations', body: 'Your name, phone and website identical on Bing Places, Apple Business, Yelp and the few directories that matter, rather than a hundred that don’t.' },
  { title: 'Technical SEO', body: 'Crawlability, speed, Core Web Vitals, clean titles and headings, structured data and a sitemap that matches the site, all in the initial HTML.' },
  { title: 'Bing & AI Search', body: 'Bing Webmaster Tools and IndexNow, so Bing, and the AI assistants that search with it, see your changes in days rather than months.' },
];

const PROOF_POINTS = [
  { title: 'Server-Rendered Schema', body: 'Every page on this site ships its LocalBusiness, Service and FAQ structured data in the initial HTML, not injected after the page loads.' },
  { title: 'A Real, Synced Sitemap', body: 'Our sitemap.xml is generated from the same data that builds the pages, so it never lists a page that doesn’t exist or a date that didn’t change.' },
  { title: 'IndexNow on Every Update', body: 'When we change a page we notify Bing through IndexNow, the same setup we put in place for clients.' },
  { title: 'Real, Unique City Pages', body: 'Our own location pages carry different research, photos and FAQs per city, and we cut the ones we couldn’t make genuinely useful.' },
];

const WONT_DO = [
  'Buy links, or swap them with other businesses',
  'Put keywords in your Google Business Profile name',
  'Offer customers anything in return for a review, or tell them what to write',
  'Build near-identical pages for every town on the map',
  'Submit you to “100+ directories”',
  'Guarantee a ranking. Nobody can, and Google says so',
];

const DIFFERENTIATORS = [
  {
    title: 'Built for GTA Small Businesses',
    body: 'Clinics, law and accounting practices, trades and shops in Markham, Scarborough, Pickering and the rest of the GTA, where a handful of good local searches is worth more than national traffic.',
    href: '/locations',
    linkText: 'Areas we serve',
  },
  {
    title: 'No Long-Term Contracts',
    body: 'Month-to-month, with transparent reporting. We earn your business every month rather than relying on a contract to keep you in place.',
    href: '/faq',
    linkText: 'Common questions',
  },
  {
    title: 'SEO + Web Design, One Team',
    body: 'Sites we design and build are optimized from the first line of code, not bolted on after the fact by a separate SEO vendor.',
    href: '/services/web-design',
    linkText: 'Web design',
  },
  {
    title: 'Within Google’s Rules',
    body: 'Every tactic we use is one Google’s own guidelines allow, so the rankings you earn don’t disappear in the next spam update.',
    href: '/contact',
    linkText: 'Get a free audit',
  },
];

const SeoService = () => {
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
              <Breadcrumbs
                items={[
                  { name: 'Home', href: '/' },
                  { name: 'Services', href: '/services' },
                  { name: serviceContent['seo'].breadcrumbLabel },
                ]}
              />
              <FadeIn>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">Search visibility, not vanity metrics</p>
              </FadeIn>
              <TextReveal
                as="h1"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6"
                staggerMs={120}
                lines={[
                  <span key="l1" className="block font-light opacity-90">Local SEO for</span>,
                  <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">GTA Small Businesses</span>,
                ]}
              />
              <FadeIn delay={240}>
                <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-light tracking-[0.01em] mb-8">
                  Get found by the people searching for what you do, near where you do it. We set up your Google Business Profile, earn reviews the right way, build the pages your customers search for and fix what holds your site back. Month-to-month, no contracts.
                </p>
              </FadeIn>
              <FadeIn delay={320}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                    <Button asChild className="w-full relative overflow-hidden h-auto bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                      <Link href="/contact" className="flex items-center justify-center">
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                        <span className="flex items-center gap-2 relative z-10 group-hover:text-white">
                          Get a Free SEO Audit
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
                    <div className="relative w-full aspect-[4/5]">
                      <SafeImage
                        src="/images/seo-open-for-business.jpg"
                        alt="An 'Open' sign hanging in a shop window on a busy street"
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
                Every engagement covers your listing, your reviews, your pages and your site’s technical health, reported monthly.
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

      {/* How Local Search Works */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-black">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-cyan-900/30 to-black" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-6">How Local Search Works</p>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 lg:items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl sm:text-4xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-6">
                Three things decide who shows up on the map
              </h2>
              <p className="text-white/60 leading-relaxed font-light">
                Google ranks local results on relevance, distance and prominence, and says{' '}
                <a
                  href={GOOGLE_LOCAL_RANKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300/90 underline decoration-cyan-300/30 underline-offset-4 hover:text-cyan-300"
                >
                  there’s no way to pay for a better local ranking
                </a>
                . Below the map, the ordinary results work differently, and that is where a business can reach towns it isn’t based in.
              </p>
            </div>
            <ol className="lg:col-span-3 grid grid-cols-1 gap-4">
              {LOCAL_FACTORS.map((factor, i) => (
                <li key={factor.title} className="rounded-xl border border-white/10 bg-slate-950/60 p-6">
                  <p className="text-white font-medium mb-2">
                    <span className="text-cyan-300/70 font-mono text-sm mr-3">0{i + 1}</span>
                    {factor.title}
                  </p>
                  <p className="text-white/55 text-sm font-light leading-relaxed">{factor.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* What We Won't Do */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-black">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/25 to-black" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-4">
            What we won’t do
          </h2>
          <p className="text-white/55 font-light leading-relaxed mb-8 max-w-2xl">
            Most of the shortcuts sold as local SEO break Google’s spam or review policies. They can work for a while; then a
            listing gets suspended or a site drops overnight. We don’t use them on our site or yours.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {WONT_DO.map((item) => (
              <li key={item} className="pl-4 border-l-2 border-purple-400/40 text-white/65 text-sm font-light leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* We Use This On Our Own Site First */}
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
              <span className="font-light opacity-90">We Use This On</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Our Own Site First</span>
            </h2>
            <p className="text-white/55 text-base sm:text-lg font-light max-w-2xl mx-auto">
              Not a service we invented to sell — the same technical foundation zenaradesigns.com runs on.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PROOF_POINTS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="relative rounded-xl border border-slate-800/50 bg-slate-950/60 p-6 h-full">
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-4">
              <span className="font-light opacity-90">Custom Quote,</span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">No Lock-In</span>
            </h2>
            <p className="text-white/55 text-base sm:text-lg font-light max-w-xl mx-auto">
              Every site starts from a different place, so SEO is scoped after we see it.
            </p>
          </div>

          <FadeIn>
            <div className="relative rounded-2xl border border-cyan-400/30 bg-slate-900/90 backdrop-blur-sm p-8 sm:p-10 text-center shadow-lg shadow-cyan-500/10">
              <p className="text-white/50 text-xs uppercase tracking-[0.15em] font-medium mb-3">Ongoing SEO</p>
              <p className="text-4xl sm:text-5xl font-light text-white mb-3">Custom Quote</p>
              <p className="text-white/50 text-sm font-light max-w-md mx-auto">
                Priced from a free audit of your current site, competition, and target keywords. Billed month-to-month — no long-term contract required.
              </p>
            </div>
          </FadeIn>

          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="inline-flex items-center text-sm sm:text-base font-medium text-cyan-300/80 hover:text-cyan-300 transition-colors duration-300 group"
            >
              See how we price web design projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
          <RelatedGuide href="/blog/seo-guide-small-business-toronto" title="Local SEO for GTA small businesses: what actually moves rankings" className="mt-10" />
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
            as="h2"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extralight mb-6 text-white leading-[1.1] tracking-[-0.04em]"
            staggerMs={130}
            lines={[
              <span key="l1" className="block font-light opacity-90">Ready to Grow Your</span>,
              <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Search Visibility?</span>,
            ]}
          />
          <FadeIn delay={260}>
            <p className="text-base sm:text-lg text-white/60 mb-8 sm:mb-10 max-w-2xl mx-auto leading-[1.7] font-light">
              Get a free SEO audit and see exactly where your site stands today — and a clear roadmap for improving it.
            </p>
          </FadeIn>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden h-auto bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                <Link href="/contact" className="flex items-center justify-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                  <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                    Get Free SEO Audit
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
          src/app/services/seo/page.tsx */}
    </div>
  );
};

export default SeoService;
