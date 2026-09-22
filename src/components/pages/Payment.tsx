'use client';

import Link from 'next/link';
import { Check, Star, ArrowRight, Layers, Rocket, Gem } from 'lucide-react';
import type { ComponentType } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';

interface SubscriptionPlan {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  monthlyPrice: number;
  features: string[];
  bestFor: string;
  popular?: boolean;
  checkoutUrl: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'core',
    name: 'Zenara Core',
    icon: Layers,
    monthlyPrice: 45,
    features: [
      'Managed hosting (modern stack) + SSL',
      'Monitoring + basic security checks',
      'Daily backups + restore support',
      '30 min/month minor updates + email support (1–2 business days)'
    ],
    bestFor: 'Simple sites, portfolios, new businesses',
    popular: false,
    checkoutUrl: 'https://buy.stripe.com/00wcN51rN05R1VJ93D9sk00'
  },
  {
    id: 'grow',
    name: 'Zenara Grow',
    icon: Rocket,
    monthlyPrice: 70,
    features: [
      'Everything in Core, plus:',
      'Monthly performance check + light optimization (speed, UX, small fixes)',
      'Lead form monitoring (submission tests + alerts if something breaks)',
      'Google Analytics setup + monthly traffic summary',
      '60 min/month updates (text, images, links, small section tweaks)',
      'Priority support (1 business day)'
    ],
    bestFor: 'Professional individuals, local businesses, service providers',
    popular: true,
    checkoutUrl: 'https://buy.stripe.com/aFafZhgmH19V6bZ7Zz9sk01'
  },
  {
    id: 'prime',
    name: 'Zenara Prime',
    icon: Gem,
    monthlyPrice: 150,
    features: [
      'Everything in Grow, plus:',
      'Advanced performance tuning (Core Web Vitals)',
      'Integrations support (booking, email, CRM, payments)',
      '120 min/month updates + simple new pages/sections (within included time)',
      'Same-day support'
    ],
    bestFor: 'High-conversion sites, coaches, growing brands',
    popular: false,
    checkoutUrl: 'https://buy.stripe.com/8x200jgmH3i37g36Vv9sk02'
  }
];

const Payment = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('[data-plan-card]');
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-plan-card'));
            setVisibleCards((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" role="main" aria-label="Payment and subscription plans">

      {/* Subscription Plans — matches Pricing page's Hosting & Maintenance section */}
      <section className="pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
        {/* Background Stars */}
        <div className="absolute inset-0">
          <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
          <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
          <div className="bg-star" style={{ top: '15%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '9%', left: '58%' }}></div>
          <div className="bg-star" style={{ top: '18%', left: '68%' }}></div>
          <div className="bg-star" style={{ top: '7%', left: '78%' }}></div>
          <div className="bg-star" style={{ top: '14%', left: '88%' }}></div>
          <div className="bg-star" style={{ top: '11%', left: '95%' }}></div>

          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <TextReveal
              as="h1"
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[0.95] tracking-[-0.04em]"
              staggerMs={120}
              lines={[
                <span key="l1" className="block font-light opacity-90">Choose Your</span>,
                <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Subscription Plan</span>,
              ]}
            />
            <FadeIn delay={240}>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Reliable hosting and maintenance for your website — fully managed, secure, and optimized.
              </p>
            </FadeIn>
          </div>

          {/* Subscription Plans */}
          <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
            {subscriptionPlans.map((plan, planIdx) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.id}
                  data-plan-card={planIdx}
                  className={`group relative ${plan.popular ? 'lg:scale-105' : ''} transition-all duration-700 ${visibleCards.has(planIdx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: visibleCards.has(planIdx) ? `${planIdx * 120}ms` : '0ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-2xl whitespace-nowrap">
                        <Star className="h-4 w-4 fill-current flex-shrink-0" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className={`bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border shadow-lg transition-all duration-500 h-full flex flex-col relative overflow-hidden ${
                    plan.popular
                      ? 'border-cyan-500/50 shadow-cyan-500/20'
                      : 'border-slate-800/50'
                  }`}>
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
                        <div className="flex justify-center mb-3">
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center">
                            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                            <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white relative z-10" />
                          </div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-white tracking-tight">{plan.name}</h2>
                        <div className="text-4xl sm:text-5xl font-light mb-3 sm:mb-4 text-white">
                          ${plan.monthlyPrice}
                          <span className="text-lg sm:text-xl text-white/60 font-light">
                            /month
                          </span>
                        </div>
                        <p className="text-white/60 text-sm sm:text-base mt-3 font-light">{plan.bestFor}</p>
                      </div>

                      <ul className="space-y-3 sm:space-y-4 flex-grow mb-6 sm:mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5 text-cyan-400" />
                            <span className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex-shrink-0">
                        <div className="relative w-full rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                          <a
                            href={plan.checkoutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold w-full flex items-center justify-center gap-2 group/button"
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                            <span className="flex items-center justify-center relative z-10 group-hover/button:text-white whitespace-nowrap">
                              Subscribe Now
                              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover/button:translate-x-1" />
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional Note */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-white/60 text-sm sm:text-base max-w-3xl mx-auto font-light">
              <em>Complex custom development, e-commerce, and major redesigns are quoted separately.</em>
            </p>
          </div>

          {/* Hosting Only Option */}
          <div className="mt-10 sm:mt-12 max-w-xl mx-auto">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-lg relative overflow-hidden text-center">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight">Hosting Only</h3>
                <p className="text-white/60 text-sm sm:text-base mb-4 font-light">Basic hosting without maintenance services</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-white">$20</span>
                  <span className="text-white/60 text-sm sm:text-base font-light">/month</span>
                </div>
                <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <a
                    href="https://buy.stripe.com/14A3cv5I38Cn1VJdjT9sk03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-2.5 sm:py-3 text-sm font-semibold flex items-center justify-center gap-2 group/button"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                    <span className="flex items-center justify-center relative z-10 group-hover/button:text-white whitespace-nowrap">
                      Subscribe to Hosting
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Questions link — matches Pricing page's FAQ CTA pattern */}
          <div className="text-center mt-10 sm:mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center text-sm sm:text-base font-medium text-white/60 hover:text-white transition-colors duration-300 group"
            >
              Have a question about your plan? Contact us <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
