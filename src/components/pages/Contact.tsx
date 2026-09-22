// Server Component — the hero, contact details and "what to expect" steps are
// static. Only the form itself needs client JS; it lives in forms/ContactForm.
import { memo } from 'react';
import { Mail, Clock, CheckCircle, ArrowRight, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_E164 } from '@/lib/constants';
import type { ProcessStepInfo } from '@/types';
import ContactForm from '@/components/forms/ContactForm';
import { TextReveal } from '@/components/ui/text-reveal';
import { FadeIn } from '@/components/ui/fade-in';

const Contact = () => {

  const processSteps: ProcessStepInfo[] = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Send us a message",
      description: "Tell us about your project and goals"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24-48 hour response",
      description: "We'll review and get back to you quickly"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Discovery call",
      description: "30-minute call to discuss your needs and timeline"
    }
  ];

  return (
    <>
    <div className="min-h-screen" role="main" aria-label="Contact page">

      {/* Main Section */}
      <section id="contact-form" className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-20 sm:pb-24 md:pb-32 relative overflow-hidden" style={{ backgroundColor: '#07071a' }}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Deep indigo base gradients */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/70 via-transparent to-cyan-950/50" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-950/40 via-transparent to-purple-950/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07071a] via-transparent to-[#07071a]" />
          {/* Stars */}
          <div className="bg-star" style={{ top: '4%', left: '3%' }} />
          <div className="bg-star" style={{ top: '8%', left: '14%' }} />
          <div className="bg-star" style={{ top: '5%', left: '28%' }} />
          <div className="bg-star" style={{ top: '11%', left: '44%' }} />
          <div className="bg-star" style={{ top: '6%', left: '59%' }} />
          <div className="bg-star" style={{ top: '9%', left: '73%' }} />
          <div className="bg-star" style={{ top: '7%', left: '88%' }} />
          <div className="bg-star" style={{ top: '18%', left: '7%' }} />
          <div className="bg-star" style={{ top: '22%', left: '21%' }} />
          <div className="bg-star" style={{ top: '16%', left: '37%' }} />
          <div className="bg-star" style={{ top: '24%', left: '53%' }} />
          <div className="bg-star" style={{ top: '19%', left: '67%' }} />
          <div className="bg-star" style={{ top: '21%', left: '82%' }} />
          <div className="bg-star" style={{ top: '33%', left: '11%' }} />
          <div className="bg-star" style={{ top: '37%', left: '25%' }} />
          <div className="bg-star" style={{ top: '41%', left: '48%' }} />
          <div className="bg-star" style={{ top: '38%', left: '63%' }} />
          <div className="bg-star" style={{ top: '44%', left: '78%' }} />
          <div className="bg-star" style={{ top: '55%', left: '5%' }} />
          <div className="bg-star" style={{ top: '62%', left: '32%' }} />
          <div className="bg-star" style={{ top: '58%', left: '56%' }} />
          <div className="bg-star" style={{ top: '67%', left: '71%' }} />
          <div className="bg-star" style={{ top: '73%', left: '18%' }} />
          <div className="bg-star" style={{ top: '79%', left: '44%' }} />
          <div className="bg-star" style={{ top: '85%', left: '62%' }} />
          <div className="bg-star" style={{ top: '88%', left: '88%' }} />
          {/* Nebula — larger, more prominent */}
          <div className="absolute top-1/4 left-1/5 w-[650px] h-[650px] bg-gradient-to-br from-cyan-600/10 to-purple-700/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/5 w-[550px] h-[550px] bg-gradient-to-tl from-purple-600/12 to-cyan-600/8 rounded-full blur-3xl" />
          <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-gradient-to-r from-cyan-500/6 to-purple-500/6 rounded-full blur-3xl" />
          {/* Rocket flybys — one crosses the section every ~14s */}
          <div className="rocket rocket-a text-4xl select-none" aria-hidden="true">
            <span className="rocket-trail" />
            <span className="rocket-glyph">🚀</span>
          </div>
          <div className="rocket rocket-b text-2xl select-none" aria-hidden="true">
            <span className="rocket-trail" />
            <span className="rocket-glyph">🚀</span>
          </div>
          <div className="rocket rocket-c text-3xl select-none" aria-hidden="true">
            <span className="rocket-trail" />
            <span className="rocket-glyph">🚀</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-start">

            {/* Left: Typographic panel */}
            <div className="lg:sticky lg:top-32">
              <FadeIn>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-6 font-medium">
                  Markham Web Design
                </p>
              </FadeIn>
              <TextReveal
                as="h1"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-extralight text-white leading-[0.92] tracking-[-0.04em] mb-8"
                staggerMs={130}
                lines={[
                  <span key="l1" className="block font-light">Let&apos;s build</span>,
                  <span key="l2" className="block font-light pb-2">something</span>,
                  <span key="l3" className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">great.</span>,
                ]}
              />
              <FadeIn delay={390}>
                <p className="text-base sm:text-lg text-white/55 font-light leading-[1.7] tracking-[0.01em] mb-10 max-w-md">
                  Whether you&apos;re launching a new brand or modernizing an existing site — we&apos;re here to help you grow.
                </p>
              </FadeIn>

              {/* Contact details */}
              <FadeIn delay={500}>
                <div className="space-y-5 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-[0.15em] font-medium mb-0.5">Email</p>
                      <a
                        href={`mailto:${BUSINESS_EMAIL}`}
                        className="text-white/80 hover:text-cyan-300 transition-colors duration-300 text-sm font-light"
                      >
                        {BUSINESS_EMAIL}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-[0.15em] font-medium mb-0.5">Phone</p>
                      <a
                        href={`tel:${BUSINESS_PHONE_E164}`}
                        className="text-white/80 hover:text-cyan-300 transition-colors duration-300 text-sm font-light"
                      >
                        {BUSINESS_PHONE}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-[0.15em] font-medium mb-0.5">Hours</p>
                      <p className="text-white/80 text-sm font-light">Mon – Fri, 9 AM – 5 PM EST</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* What to expect — numbered steps */}
              <FadeIn delay={620}>
                <div className="border-t border-white/8 pt-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-6 font-medium">What to expect</p>
                  <div className="space-y-6">
                    {processSteps.map((step, index) => (
                      <div key={index} className="flex gap-5">
                        <span className="text-xs font-mono text-cyan-400/60 tracking-widest uppercase mt-1 w-5 flex-shrink-0">
                          0{index + 1}
                        </span>
                        <div>
                          <p className="text-white/80 text-sm font-medium mb-0.5">{step.title}</p>
                          <p className="text-white/45 text-sm font-light">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

            </div>

            {/* Right: Form */}
            <div>
              <ContactForm />
            </div>

          </div>
        </div>

        {/* Schedule a Meeting CTA */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 mt-20 sm:mt-24">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/12">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/20 via-cyan-400/15 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-purple-500/20 via-purple-400/15 to-transparent rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 px-6 sm:px-10 md:px-14 py-10 sm:py-14 text-center">
              <TextReveal
                className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]"
                staggerMs={130}
                lines={[
                  <span key="l1" className="block font-light opacity-90">Prefer to chat first?</span>,
                  <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Schedule a Meeting.</span>,
                ]}
              />
              <FadeIn delay={260}>
                <p className="text-white/55 text-base sm:text-lg mb-8 sm:mb-10 leading-[1.7] font-light max-w-xl mx-auto">
                  Book a free 30-minute discovery call and let&apos;s talk through your project.
                </p>
              </FadeIn>
              <FadeIn delay={380}>
                <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button
                    asChild
                    className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-8 py-4 sm:px-10 sm:py-5 text-base font-semibold group animate-jiggle"
                  >
                    <Link href="/contact/schedule">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                        <Calendar className="mr-2 h-5 w-5" />
                        Book a Call
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
};

export default memo(Contact);
