import Link from 'next/link';
import { ArrowRight, MapPin, Check, Gauge, Search, MousePointerClick } from 'lucide-react';
import type { CityContent } from '@/lib/city-content';

const SERVICE_HIGHLIGHTS = [
  'Custom, responsive design built for mobile-first traffic',
  'SEO optimization and clean structured data from day one',
  'Fast performance — sub-2.5-second load targets',
  'SSL security, hosting setup, and post-launch support',
];

const WHY_ICONS = [Search, MousePointerClick, Gauge];

interface WebDesignCityProps {
  content: CityContent;
}

// Server-rendered, content-rich city landing page. No 'use client' — the copy,
// headings, and FAQs ship in the initial HTML so both Google and AI crawlers
// (which often don't run JS) can read them. See SEO-RANKING-PLAN.md §6.
const WebDesignCity = ({ content }: WebDesignCityProps) => {
  const { city, region, heroIntro, intro, economy, neighborhoods, whyPoints, industries, faqs } =
    content;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/40 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-cyan-300">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/services/web-design" className="hover:text-cyan-300">Web Design</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-200">{city}</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-14 sm:mb-20">
          <p className="inline-flex items-center gap-2 text-cyan-300 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            {city}, {region}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Web Design in {city}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl leading-relaxed mb-8">
            {heroIntro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-7 py-3 transition-colors"
            >
              Get a free consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:border-cyan-300 text-white font-semibold px-7 py-3 transition-colors"
            >
              View pricing
            </Link>
          </div>
        </header>

        {/* Intro */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Custom websites for {city} businesses
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">{intro}</p>
        </section>

        {/* Why */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Why {city} businesses choose Zenara
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {whyPoints.map((point, index) => {
              const Icon = WHY_ICONS[index] ?? Search;
              return (
                <div
                  key={point.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <Icon className="w-7 h-7 text-cyan-300 mb-4" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{point.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Economy + neighborhoods */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            The {city} business landscape
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-8">{economy}</p>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-4">
            Neighbourhoods we serve in {city}
          </h3>
          <ul className="flex flex-wrap gap-3">
            {neighborhoods.map((n) => (
              <li
                key={n}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-200"
              >
                {n}
              </li>
            ))}
          </ul>
        </section>

        {/* What's included */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            What every {city} website includes
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {SERVICE_HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300">
                <Check className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-400 mt-6">
            Explore our full{' '}
            <Link href="/services/web-design" className="text-cyan-300 hover:underline">
              web design service
            </Link>{' '}
            or see transparent{' '}
            <Link href="/pricing" className="text-cyan-300 hover:underline">
              pricing
            </Link>
            .
          </p>
        </section>

        {/* Industries */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Industries we build for in {city}
          </h2>
          <p className="text-gray-400 mb-6">
            We build websites tailored to specific industries across {city}:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {industries.map((industry) => (
              <Link
                key={industry.href}
                href={industry.href}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-cyan-300/50 transition-colors"
              >
                <span className="text-white font-medium">
                  {industry.label} in {city}
                </span>
                <ArrowRight
                  className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ — native details for SSR + AEO */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            {city} web design — frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between text-white font-medium list-none">
                  {faq.question}
                  <ArrowRight
                    className="w-4 h-4 text-cyan-300 transition-transform group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <p className="text-gray-400 leading-relaxed mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to grow your {city} business online?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Book a free consultation and we’ll show you exactly how a custom website can win you more
            customers in {city} and across the GTA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-7 py-3 transition-colors"
            >
              Start your project
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-full border border-white/20 hover:border-cyan-300 text-white font-semibold px-7 py-3 transition-colors"
            >
              See all GTA locations
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WebDesignCity;
