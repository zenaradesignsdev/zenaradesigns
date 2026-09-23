import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConceptDemoCallout, { CONCEPT_DEMOS } from '@/components/industries/ConceptDemoCallout';
import type { IndustryVertical as VerticalData } from '@/lib/industry-verticals';

const GRADIENT_TEXT =
  'bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient';
const CARD =
  'bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group';
const CARD_GLOW =
  'absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500';
const SECTION_H2 =
  'text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]';

interface IndustryVerticalProps {
  vertical: VerticalData;
}

const IndustryVerticalPage = ({ vertical }: IndustryVerticalProps) => {
  const demo = CONCEPT_DEMOS[vertical.demoKey];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
      </div>

      {/* Hero */}
      <div className="relative z-10 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href={vertical.parentHref}
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-200 transition-colors mb-6 font-light"
          >
            {vertical.parentLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 mb-6 mx-auto"></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-6">
            <span className="font-light opacity-90">{vertical.heroLead} </span>
            <span className={`${GRADIENT_TEXT} font-normal`}>{vertical.heroAccent}</span>
            <span className="block font-light opacity-90 mt-2">{vertical.heroTail}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] mb-8">
            {vertical.intro}
          </p>
          <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
            <Button
              asChild
              className="w-full relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-8 py-4 text-base font-semibold group"
            >
              <Link href="/contact" className="flex items-center gap-2 relative z-10 group-hover:text-white">
                <span className="relative z-10">Book a free consultation</span>
                <ArrowRight className="h-5 w-5 relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 relative z-10">
        {/* What decides whether the site works */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className={SECTION_H2}>
            <span className="block font-light opacity-90">What actually decides</span>
            <span className={`block mt-2 ${GRADIENT_TEXT} font-normal pb-1`}>whether it works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {vertical.points.map((point) => (
              <div key={point.title} className={CARD}>
                <div className={CARD_GLOW}></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Build requirements */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className={SECTION_H2}>
            <span className="block font-light opacity-90">What we build into</span>
            <span className={`block mt-2 ${GRADIENT_TEXT} font-normal pb-1`}>every {vertical.name.toLowerCase()} site</span>
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vertical.mustHaves.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-slate-900/60 rounded-lg p-4 border border-slate-800/50">
                <Check className="h-5 w-5 text-cyan-300 mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm font-light leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <ConceptDemoCallout demo={demo} industryLabel={vertical.demoLabel} />

        {/* FAQ */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className={SECTION_H2}>
            <span className="block font-light opacity-90">Frequently Asked</span>
            <span className={`block mt-2 ${GRADIENT_TEXT} font-normal pb-1`}>Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {vertical.faqs.map((faq) => (
              <div key={faq.question} className={CARD}>
                <div className={CARD_GLOW}></div>
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed font-light">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section>
          <div className="text-center">
            <p className="text-white/50 text-sm mb-4 font-light">Related</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: vertical.parentLabel, href: vertical.parentHref },
                { label: 'Our work', href: '/projects' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Local SEO', href: '/services/seo' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center text-cyan-400 hover:text-purple-400 transition-colors text-sm font-medium group/link"
                >
                  {link.label}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IndustryVerticalPage;
