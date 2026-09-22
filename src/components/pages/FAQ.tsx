// Server Component. It has no hooks or browser APIs of its own — Accordion,
// TextReveal, FadeIn and MiniContactForm are each independently client
// components, and a Server Component can render those. Keeping the page itself
// on the server stops all of its static copy (and the form's zod/Radix import
// graph) from shipping in the initial JS bundle.
import Link from 'next/link';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DollarSign, Clock, Layers, ShieldCheck, MapPin, type LucideIcon } from 'lucide-react';
import { TextReveal } from '@/components/ui/text-reveal';
import { FadeIn } from '@/components/ui/fade-in';
import MiniContactForm from '@/components/forms/LazyMiniContactForm';
import { faqSections as faqContent } from '@/lib/faq-data';

const zenaraMark = '/images/zenara-logo-v5.svg';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'pricing', label: 'Pricing & Packages' },
  { id: 'process', label: 'Process & Timeline' },
  { id: 'services', label: 'Services & Features' },
  { id: 'technical', label: 'Technical & Support' },
  { id: 'local', label: 'Serving the GTA' },
];

// Section id + icon, matched positionally to faqSections in faq-data.ts.
const SECTION_META: { id: string; icon: LucideIcon; background: 'dark' | 'purple' | 'cyan' }[] = [
  { id: 'pricing', icon: DollarSign, background: 'dark' },
  { id: 'process', icon: Clock, background: 'purple' },
  { id: 'services', icon: Layers, background: 'dark' },
  { id: 'technical', icon: ShieldCheck, background: 'cyan' },
  { id: 'local', icon: MapPin, background: 'dark' },
];

const SECTION_BG: Record<'dark' | 'purple' | 'cyan', string> = {
  dark: 'bg-black',
  purple: 'bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900',
  cyan: 'bg-gradient-to-br from-slate-900 via-cyan-900/25 to-slate-900',
};

const FAQ = () => {
  const faqSections = faqContent.map((section, index) => ({
    ...section,
    ...SECTION_META[index],
  }));

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* ===== Hero ===== */}
      <section className="relative pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-star" style={{ top: '5%', left: '4%' }}></div>
          <div className="bg-star" style={{ top: '10%', left: '14%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '24%' }}></div>
          <div className="bg-star" style={{ top: '14%', left: '34%' }}></div>
          <div className="bg-star" style={{ top: '9%', left: '82%' }}></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5">FAQ</p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 text-white leading-[1.1] tracking-[-0.04em]"
            staggerMs={110}
            lines={[
              <span key="l1" className="block font-light opacity-90">Everything You Need</span>,
              <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">to Know</span>,
            ]}
          />
          <FadeIn delay={220}>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
              Answers to common questions about pricing, our process, and the services and industries we build for across the GTA.
            </p>
          </FadeIn>

          <FadeIn delay={340}>
            <nav aria-label="FAQ sections" className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs sm:text-sm text-white/60 font-light hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </FadeIn>
        </div>
      </section>

      {/* ===== FAQ sections ===== */}
      {faqSections.map((section, sectionIndex) => {
        const IconComponent = section.icon;
        const isMidpoint = sectionIndex === 2;

        return (
          <div key={section.id}>
            {isMidpoint && (
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
            )}

            <section
              id={section.id}
              className={`scroll-mt-24 py-16 sm:py-20 md:py-24 relative overflow-hidden ${SECTION_BG[section.background]}`}
            >
              {section.background !== 'dark' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="bg-star" style={{ top: '10%', left: '8%' }}></div>
                  <div className="bg-star" style={{ top: '75%', left: '92%' }}></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
                </div>
              )}

              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-[18px] w-[18px] text-cyan-300/80" strokeWidth={1.75} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extralight text-white leading-[1.1] tracking-[-0.04em]">
                    <span className="font-light opacity-90">{section.title.split(' ').slice(0, -1).join(' ')} </span>
                    <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">
                      {section.title.split(' ').slice(-1)}
                    </span>
                  </h2>
                </FadeIn>

                <FadeIn delay={120}>
                  <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-3">
                    {section.faqs.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${section.id}-${faqIndex}`}
                        className="border border-white/10 rounded-xl bg-white/[0.02] data-[state=open]:bg-gradient-to-r data-[state=open]:from-cyan-500/15 data-[state=open]:via-purple-500/15 data-[state=open]:to-cyan-500/15 data-[state=open]:border-cyan-500/40 transition-all duration-200"
                      >
                        <AccordionTrigger className="px-5 py-4 hover:no-underline text-left data-[state=open]:text-white data-[state=closed]:text-white/80">
                          <span className="font-light text-sm sm:text-base pr-4">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-4 text-white/55 text-sm leading-[1.6] font-light">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </FadeIn>
              </div>
            </section>
          </div>
        );
      })}

      {/* ===== Still have questions — contact form ===== */}
      <section className="py-20 sm:py-24 md:py-28 bg-black border-t border-white/10">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-5">Still Have Questions?</p>
            <h2 className="text-3xl sm:text-4xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-4">
              <span className="font-light opacity-90">We&apos;re Here to </span>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Help</span>
            </h2>
            <p className="text-white/60 text-base leading-[1.7] font-light">
              Can&apos;t find the answer you&apos;re looking for? Send us a quick message and we&apos;ll get back to you within 24–48 hours.
            </p>
          </FadeIn>

          <FadeIn delay={120}>
            <MiniContactForm
              id="faq-question"
              projectType="General Inquiry (via FAQ)"
              heading="Ask Us Anything"
              subheading="No question is too small — we'd rather answer it now than have it slow you down later."
              messagePlaceholder="What would you like to know?"
            />
          </FadeIn>

          <FadeIn delay={200} className="text-center mt-6">
            <Link href="/contact" className="text-cyan-400 hover:text-purple-400 transition-colors text-sm font-medium">
              Or see our full contact page →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* FAQPage + breadcrumb JSON-LD are server-rendered in src/app/faq/page.tsx */}
    </div>
  );
};

export default FAQ;
