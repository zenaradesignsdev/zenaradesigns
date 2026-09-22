'use client';

import Link from 'next/link';
import { Check, ArrowRight, Star, ChevronDown, Layers, Rocket, Gem, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { memo, useMemo, useEffect, useRef, useState } from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import { pricingPageFaqs } from '@/lib/faq-data';

interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const Pricing = () => {
  const pricingCardsRef = useRef<HTMLDivElement>(null);
  const subCardsRef = useRef<HTMLDivElement>(null);
  const [visiblePricing, setVisiblePricing] = useState<Set<number>>(new Set());
  const [visibleSub, setVisibleSub] = useState<Set<number>>(new Set());

  useEffect(() => {
    const cards = pricingCardsRef.current?.querySelectorAll('[data-pricing-card]');
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-pricing-card'));
            setVisiblePricing((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = subCardsRef.current?.querySelectorAll('[data-sub-card]');
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-sub-card'));
            setVisibleSub((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const pricingPlans = useMemo<PricingPlan[]>(() => [
    {
      name: "Starter",
      subtitle: "Individual",
      price: "$499",
      originalPrice: "$999",
      savings: "$500 OFF",
      description: "Affordable web design for freelancers and personal brands",
      features: [
        "Up to 3 pages (Home, About, Contact)",
        "Modern portfolio-style design",
        "Mobile-responsive layout",
        "Contact form + email notifications",
        "SEO setup (titles/meta, indexing, analytics)",
        "1 month free hosting",
        "SSL + baseline security included",
        "3–5 day turnaround (once content is received)",
        "14 days post-launch support (bug fixes + minor edits)"
      ],
      cta: "Choose Starter",
      popular: false
    },
    {
      name: "Small Business",
      subtitle: "Recommended",
      price: "$1,499",
      originalPrice: "$1,999",
      savings: "$500 OFF",
      description: "Professional web design for small businesses and growing brands",
      features: [
        "Up to 6 pages (Home, About, Services, Projects, Pricing, Contact)",
        "Custom sections and layouts",
        "Custom forms (contact/quote/booking)",
        "SEO setup (titles/meta, indexing, sitemap)",
        "Mobile-first responsive design",
        "Basic animations",
        "2 rounds of revisions included",
        "1–2 week turnaround (once content is received)",
        "SSL + baseline security included",
        "Performance optimization (images + speed)",
        "30 days post-launch support (bug fixes + minor edits)"
      ],
      cta: "Choose Small Business",
      popular: true
    },
    {
      name: "Pro",
      subtitle: "Fully Custom", 
      price: "$4,999+",
      description: "Fully custom, premium web design for businesses needing advanced functionality",
      features: [
        "Everything in Small Business",
        "Multi-page site (10+ pages) with custom sections",
        "Custom design system + premium animations",
        "Advanced integrations (Calendly, Stripe, newsletter, etc.)",
        "Custom components + tailored functionality",
        "E-commerce store setup (platform-based) with checkout + payments",
        "Performance optimization",
        "Priority support + optional maintenance plan",
        "3–4 week turnaround (once content is received)",
        "60 days post-launch support (bug fixes + minor edits)"
      ],
      cta: "Request Custom Quote",
      popular: false
    }
  ], []);

  // Additional services pricing for comprehensive coverage
  const additionalServices = useMemo(() => [
    {
      category: "Grow Beyond the Launch — SEO, Redesigns & AI Search",
      services: [
        {
          name: "Website Redesign",
          price: "Custom Quote",
          description: "Modernize an outdated site with a fixed-price, fast rebuild — SEO equity migrated, not lost.",
          features: ["Free audit before quoting", "SEO equity migration", "Mobile-first rebuild", "Fixed price, known timeline"],
          idealFor: "Businesses with an outdated or underperforming website",
          href: "/services/website-redesign"
        },
        {
          name: "SEO Services",
          price: "Custom Quote",
          description: "Ongoing local SEO — technical fixes, content strategy, and monthly ranking reports, month-to-month.",
          features: ["Local + technical SEO", "Keyword research", "Monthly ranking reports", "No lock-in contracts"],
          idealFor: "Businesses ready to rank higher in the GTA",
          href: "/services/seo"
        },
        {
          name: "GEO & AI Search",
          price: "Custom Quote",
          description: "Get found and cited by ChatGPT, Perplexity, and Gemini — not just Google.",
          features: ["AI-readable structured content", "Server-rendered schema", "Monthly AI visibility tracking", "Built alongside your SEO"],
          idealFor: "Businesses that want to show up in AI search answers",
          href: "/services/geo"
        }
      ]
    },
    {
      category: "Business Card Design & Logo Design - Tailored for the GTA",
      services: [
        {
          name: "Professional Business Cards",
          price: "$149 - $399",
          description: "High-quality business card design and printing",
          features: ["Custom design", "Premium printing", "Digital files", "2-3 day turnaround"],
          idealFor: "Professionals, consultants, service providers, small business owners, executives, lawyers, doctors, financial advisors, luxury brands",
          href: "/services/branding"
        },
        {
          name: "Basic Logo Design",
          price: "$99 - $199",
          description: "Simple logo design for small businesses",
          features: ["3 initial concepts", "2 revisions", "Vector files", "1 week delivery"],
          idealFor: "Startups, freelancers, small businesses, entrepreneurs",
          href: "/services/branding"
        }
      ]
    }
  ], []);

  const subscriptionPlans = useMemo(() => [
    {
      id: 'core',
      name: 'Zenara Core',
      icon: Layers,
      monthlyPrice: 45,
      annualPrice: 486, // 10% discount: $45 * 12 * 0.9 = $486
      features: [
        'Managed hosting (modern stack) + SSL',
        'Monitoring + basic security checks',
        'Daily backups + restore support',
        '30 min/month minor updates + email support (1–2 business days)'
      ],
      bestFor: 'Simple sites, portfolios, new businesses',
      popular: false
    },
    {
      id: 'grow',
      name: 'Zenara Grow',
      icon: Rocket,
      monthlyPrice: 70,
      annualPrice: 756, // 10% discount: $70 * 12 * 0.9 = $756
      features: [
        'Everything in Core, plus:',
        'Monthly performance check + light optimization (speed, UX, small fixes)',
        'Lead form monitoring (submission tests + alerts if something breaks)',
        'Google Analytics setup + monthly traffic summary',
        '60 min/month updates (text, images, links, small section tweaks)',
        'Priority support (1 business day)'
      ],
      bestFor: 'Professional individuals, local businesses, service providers',
      popular: true
    },
    {
      id: 'prime',
      name: 'Zenara Prime',
      icon: Gem,
      monthlyPrice: 150,
      annualPrice: 1620, // 10% discount: $150 * 12 * 0.9 = $1620
      features: [
        'Everything in Grow, plus:',
        'Advanced performance tuning (Core Web Vitals)',
        'Integrations support (booking, email, CRM, payments)',
        '120 min/month updates + simple new pages/sections (within included time)',
        'Same-day support'
      ],
      bestFor: 'High-conversion sites, coaches, growing brands',
      popular: false
    }
  ], []);

  // Price/value FAQ content — imported from the shared FAQ data module so
  // this page can never drift out of sync with the figures on /faq.
  const faqs = pricingPageFaqs;
  const faqMidpoint = Math.ceil(faqs.length / 2);

  return (
    <div className="min-h-screen" role="main" aria-label="Pricing page">

      {/* Pricing Cards - Space Theme */}
      <section className="pricing-hero py-16 sm:py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#090614' }}>
        {/* Background — centred aurora spotlight */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Central violet aurora — top half */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(124,58,237,0.38) 0%, rgba(88,28,235,0.18) 45%, transparent 70%)' }} />
          {/* Cyan flank — left edge */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 45% 80% at 0% 40%, rgba(6,182,212,0.22) 0%, transparent 65%)' }} />
          {/* Cyan flank — right edge */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 45% 80% at 100% 40%, rgba(6,182,212,0.20) 0%, transparent 65%)' }} />
          {/* Bottom fade to dark */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(9,6,20,0.8) 100%)' }} />
        </div>

        {/* Space Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Background Stars */}
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
          {/* Nebula — subtle lower blooms */}
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-16 sm:pt-20 md:pt-24">
          <div className="text-center mb-12 sm:mb-16">
            <FadeIn>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">Web Design Agency — the GTA</p>
            </FadeIn>
            <TextReveal
              as="h1"
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight mb-6 sm:mb-8 text-white leading-[0.95] tracking-[-0.04em]"
              staggerMs={130}
              lines={[
                <span key="l1" className="block font-light">Simple,</span>,
                <span key="l2" className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Affordable Pricing.</span>,
              ]}
            />
            <FadeIn delay={260}>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
                Fast, professional web design at affordable, competitive prices — no hidden fees, no surprises. Just transparent pricing and quality work, built for GTA businesses.
              </p>
            </FadeIn>
            <FadeIn delay={360}>
              <div className="flex justify-center mt-8 sm:mt-10">
                <div className="group relative inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 border border-amber-300/30 bg-amber-400/[0.07] backdrop-blur-sm overflow-hidden">
                  {/* Soft pulsing wash */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/10 via-amber-300/[0.04] to-amber-400/10 animate-pulse pointer-events-none" />
                  {/* Shine sweep */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform [transition-duration:1400ms] pointer-events-none" />
                  <Sun className="h-4 w-4 text-amber-300 relative z-10 flex-shrink-0" strokeWidth={1.75} />
                  <span className="relative z-10 text-xs sm:text-sm font-medium text-amber-100/90 tracking-wide">
                    Summer Offer — <span className="text-amber-300 font-semibold">$500 off</span> Starter &amp; Small Business plans
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div ref={pricingCardsRef} className="pricing-grid grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                data-pricing-card={index}
                className={`group relative ${plan.popular ? 'lg:scale-105' : ''} transition-all duration-700 ${visiblePricing.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: visiblePricing.has(index) ? `${index * 120}ms` : '0ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-2xl whitespace-nowrap">
                      <Star className="h-4 w-4 fill-current flex-shrink-0" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className={`pricing-card pricing-card-container bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border shadow-2xl transition-all duration-500 min-h-[600px] flex flex-col relative overflow-hidden group-hover:-translate-y-2 ${plan.popular ? 'border-cyan-500/50 shadow-cyan-500/20' : 'border-slate-800/50'} ${plan.savings ? 'ring-1 ring-amber-300/20' : ''}`}>
                  {/* Promo corner ribbon */}
                  {plan.savings && (
                    <div className="absolute top-0 right-0 z-20 h-24 w-24 overflow-hidden pointer-events-none" aria-hidden="true">
                      <div className="absolute top-[20px] right-[-38px] w-[150px] rotate-45 bg-gradient-to-r from-amber-400 to-orange-500 py-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-lg">
                        {plan.savings}
                      </div>
                    </div>
                  )}
                  {/* Box glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                  
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
                      <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-white tracking-tight">{plan.name}</h2>
                      <p className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-light mb-3 sm:mb-4 text-sm sm:text-base">{plan.subtitle}</p>
                      {plan.originalPrice && (
                        <div className="flex items-center justify-center gap-2.5 mb-1">
                          <span className="text-xl sm:text-2xl font-light text-white/35 line-through decoration-amber-300/50">{plan.originalPrice}</span>
                          <span className="inline-flex items-center rounded-full bg-amber-400/15 border border-amber-300/35 px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold text-amber-300 tracking-wide">
                            {plan.savings}
                          </span>
                        </div>
                      )}
                      <div className="text-4xl sm:text-5xl font-light mb-3 sm:mb-4 text-white">{plan.price}</div>
                      <p className="text-white/60 text-base sm:text-lg font-light">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/70 text-sm sm:text-base leading-relaxed font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex-shrink-0">
                      <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 w-full">
                        <Button 
                          asChild 
                          className="relative overflow-hidden w-full bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold group"
                        >
                          <Link href="/contact">
                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                            <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                              {plan.cta}
                              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom quote full-width banner */}
          <div className="mt-12 sm:mt-16">
            <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-gradient-to-r from-cyan-900/30 via-slate-800/50 to-purple-900/30">
              {/* Glows */}
              <div className="absolute top-0 left-0 bottom-0 w-48 bg-gradient-to-r from-cyan-500/20 to-transparent blur-2xl pointer-events-none" />
              <div className="absolute top-0 right-0 bottom-0 w-48 bg-gradient-to-l from-purple-500/20 to-transparent blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-6 sm:px-10 py-8 sm:py-10">
                <div className="text-center md:text-left">
                  <h3 className="text-xl sm:text-2xl font-light text-white mb-1 tracking-tight">
                    Need something more custom?
                  </h3>
                  <p className="text-white/50 text-sm sm:text-base font-light max-w-md">
                    We&apos;ll scope your project and send a detailed quote within 24 hours — no commitment required.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                    <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold group">
                      <Link href="/contact">
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                        <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                          Get Custom Quote
                          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Small Business Launch Package — featured all-in-one bundle */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/40 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-cyan-900/30 to-black" />
          <div className="bg-star" style={{ top: '6%', left: '8%' }} />
          <div className="bg-star" style={{ top: '10%', left: '30%' }} />
          <div className="bg-star" style={{ top: '5%', left: '55%' }} />
          <div className="bg-star" style={{ top: '13%', left: '80%' }} />
          <div className="bg-star" style={{ top: '8%', left: '95%' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn>
            <div className="relative rounded-[2rem] overflow-hidden border border-cyan-500/25">
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />
              <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 via-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 px-6 sm:px-10 md:px-14 py-12 sm:py-16">
                {/* Pitch */}
                <div className="lg:col-span-2 flex flex-col justify-center">
                  <div className="inline-flex items-center rounded-full px-4 py-1.5 border border-cyan-400/30 bg-cyan-400/[0.08] w-fit mb-6">
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-200">All-In-One Bundle</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-[1.05] tracking-[-0.03em] mb-4">
                    Small Business <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Launch Package</span>
                  </h2>
                  <p className="text-white/55 text-base sm:text-lg font-light leading-relaxed mb-6">
                    Everything a small business needs to launch a professional online presence — website, branding, Google Business, social, hosting, and local SEO — for one fast, affordable, transparent price.
                  </p>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-5xl sm:text-6xl font-light text-white">$2,000</span>
                    <span className="text-white/40 text-sm font-light">one-time</span>
                  </div>
                  <p className="text-white/40 text-xs sm:text-sm font-light mb-8">
                    + $70/month for hosting &amp; care after your first free month
                  </p>
                  <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 w-fit">
                    <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-8 py-4 text-sm sm:text-base font-semibold group">
                      <Link href="/contact">
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                        <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                          Get the Launch Package
                          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Checklist */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      'Full custom small business website',
                      'Logo design + business card design',
                      'Google Business Profile setup & optimization',
                      'Instagram setup (if needed) + 3 starter posts',
                      '1 month of free hosting + site care (then $70/mo)',
                      'Local SEO optimization — 5 service areas',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3.5">
                        <Check className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm sm:text-base font-light leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hosting & Maintenance */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
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
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[0.95] tracking-[-0.04em]"
              staggerMs={120}
              lines={[
                <span key="l1" className="block font-light opacity-90">Hosting &amp;</span>,
                <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Maintenance</span>,
              ]}
            />
            <FadeIn delay={240}>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Keep your website secure, fast, and up-to-date with our managed hosting and maintenance plans
              </p>
            </FadeIn>
          </div>

          {/* Subscription Plans */}
          <div ref={subCardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
            {subscriptionPlans.map((plan, planIdx) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.id}
                  data-sub-card={planIdx}
                  className={`group relative ${plan.popular ? 'lg:scale-105' : ''} transition-all duration-700 ${visibleSub.has(planIdx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: visibleSub.has(planIdx) ? `${planIdx * 120}ms` : '0ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
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
                            <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white relative z-10" strokeWidth={2} />
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

                      <ul className="space-y-3 sm:space-y-4 flex-grow">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5 text-cyan-400" />
                            <span className="text-white/70 text-sm sm:text-base leading-relaxed font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
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
        </div>
      </section>

      {/* Additional Services Pricing */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
          {/* Accent gradients with theme colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
        </div>
        
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          {/* Background Stars */}
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
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[0.95] tracking-[-0.04em]"
              staggerMs={120}
              lines={[
                <span key="l1" className="block font-light opacity-90">Additional</span>,
                <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Services</span>,
              ]}
            />
            <FadeIn delay={240}>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Transparent pricing for growth services, business cards, and logo design — everything to launch and grow your GTA business.
              </p>
            </FadeIn>
          </div>

          <div className="space-y-12">
            {additionalServices.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl relative overflow-hidden">
                {/* Box glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-white tracking-tight">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.services.map((service, serviceIndex) => {
                      const cardClassName = "relative flex flex-col bg-slate-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/15 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 group/card";
                      const cardContent = (
                        <>
                          {/* Gradient top border accent */}
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/60 via-purple-500/60 to-cyan-500/60" />

                          <div className="p-6 flex flex-col flex-1">
                            {/* Price — prominent at top */}
                            <p className="text-2xl sm:text-3xl font-light mb-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                              {service.price}
                            </p>
                            <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight group-hover/card:text-cyan-300 transition-colors duration-300">
                              {service.name}
                            </h4>
                            <p className="text-white/55 mb-5 text-sm font-light leading-relaxed flex-grow">
                              {service.description}
                            </p>
                            <ul className="space-y-2 mb-5">
                              {service.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center text-white/60 text-sm font-light">
                                  <Check className="h-4 w-4 mr-2 flex-shrink-0 text-cyan-400" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            {/* Ideal for tag + learn more link */}
                            {(service.idealFor || 'href' in service) && (
                              <div className="mt-auto pt-4 border-t border-white/6 flex items-center justify-between gap-3 flex-wrap">
                                {service.idealFor && (
                                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300/70 text-xs font-light tracking-wide">
                                    Ideal for: {service.idealFor.split(',')[0].trim()}
                                    {service.idealFor.split(',').length > 1 ? ' & more' : ''}
                                  </span>
                                )}
                                {'href' in service && (
                                  <span className="inline-flex items-center text-xs font-medium text-cyan-300/80 group-hover/card:text-cyan-300 transition-colors duration-300 whitespace-nowrap">
                                    Learn more <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover/card:translate-x-1 transition-transform" />
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </>
                      );

                      return 'href' in service ? (
                        <Link key={serviceIndex} href={service.href} className={cardClassName}>
                          {cardContent}
                        </Link>
                      ) : (
                        <div key={serviceIndex} className={cardClassName}>
                          {cardContent}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Built for Results */}
      <section className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/40 to-black" />
          <div className="bg-star" style={{ top: '7%', left: '5%' }} />
          <div className="bg-star" style={{ top: '13%', left: '19%' }} />
          <div className="bg-star" style={{ top: '5%', left: '35%' }} />
          <div className="bg-star" style={{ top: '11%', left: '52%' }} />
          <div className="bg-star" style={{ top: '8%', left: '70%' }} />
          <div className="bg-star" style={{ top: '17%', left: '84%' }} />
          <div className="bg-star" style={{ top: '4%', left: '94%' }} />
          <div className="bg-star" style={{ top: '60%', left: '12%' }} />
          <div className="bg-star" style={{ top: '75%', left: '40%' }} />
          <div className="bg-star" style={{ top: '68%', left: '72%' }} />
          <div className="bg-star" style={{ top: '82%', left: '90%' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Glass card wrapper */}
          <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.12]">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            {/* Corner glows */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-purple-500/20 via-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            {/* Accent lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            <div className="relative z-10 px-6 sm:px-10 md:px-16 py-12 sm:py-16 md:py-20">
              {/* Heading */}
              <div className="text-center mb-12 sm:mb-16">
                <FadeIn>
                  <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-6">
                    Why Zenara Designs
                  </p>
                </FadeIn>
                <TextReveal
                  className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1] tracking-[-0.04em]"
                  staggerMs={120}
                  lines={[
                    <span key="l1" className="block font-light">Built for</span>,
                    <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Results.</span>,
                  ]}
                />
                <FadeIn delay={260}>
                  <p className="text-white/50 text-base sm:text-lg leading-relaxed font-light mt-6 max-w-xl mx-auto">
                    Every decision we make — design, code, content — is driven by one goal: a site that works as hard as you do.
                  </p>
                </FadeIn>
              </div>

              {/* 4 pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                {[
                  {
                    number: '01',
                    label: 'Custom Design',
                    body: 'Built from scratch — no templates, no page builders.',
                  },
                  {
                    number: '02',
                    label: 'Fast Delivery',
                    body: '3 days to 4 weeks, depending on your plan, once content is received.',
                  },
                  {
                    number: '03',
                    label: 'Transparent Pricing',
                    body: 'Fixed, upfront quotes. No hidden fees, ever.',
                  },
                  {
                    number: '04',
                    label: 'Local & Accessible',
                    body: "Local team, one time zone. We\u2019re easy to reach and quick to respond.",
                  },
                ].map((item, i) => (
                  <FadeIn key={item.label} delay={i * 100}>
                    <div className="bg-slate-950/80 hover:bg-slate-900/90 transition-colors duration-300 p-7 sm:p-8 flex flex-col gap-4 h-full group">
                      <span className="text-xs font-mono text-cyan-400/40 tracking-widest">{item.number}</span>
                      <div>
                        <p className="text-white font-medium text-base mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                          {item.label}
                        </p>
                        <p className="text-white/45 text-sm leading-relaxed font-light">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Dark Theme */}
      <section className="pricing-faq py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black"></div>
        </div>

        {/* Decorative gradient panels */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-purple-500/5 via-transparent to-transparent"></div>

        {/* Corner glows */}
        <div
          className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(6,182,212,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(168,85,247,0.10) 0%, transparent 70%)' }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <TextReveal
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[0.95] tracking-[-0.04em] text-center"
              staggerMs={120}
              lines={[
                <span key="l1" className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Pricing &amp;</span>,
                <span key="l2" className="block font-light opacity-90 mt-2">Value Questions</span>,
              ]}
            />
            <FadeIn delay={240}>
              <p className="text-base sm:text-lg text-white/55 max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em] mt-6">
                What our pricing includes, how it stays affordable, and why it&apos;s transparent from the first quote.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:items-start">
            {/* Left Column Accordion */}
            <Accordion type="single" collapsible className="w-full space-y-3 flex flex-col">
              {faqs.slice(0, faqMidpoint).map((faq, index) => (
                <AccordionItem
                  key={`left-item-${index + 1}`}
                  value={`left-item-${index + 1}`}
                  className="overflow-hidden border border-white/[0.09] rounded-xl bg-slate-900/50 hover:border-cyan-500/20 data-[state=open]:border-cyan-500/35 data-[state=open]:bg-slate-900/80 transition-all duration-300"
                >
                  <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 hover:no-underline text-left group w-full flex items-center relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.11] via-purple-500/[0.07] to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />
                    <span className="font-light text-sm sm:text-base text-white/70 group-hover:text-white pr-4 flex-1 transition-colors duration-300 relative z-10">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 text-white/30 group-hover:text-cyan-400 shrink-0 transition-all duration-300 relative z-10" />
                  </AccordionTrigger>
                  <AccordionContent className="px-5 sm:px-6 pb-4 sm:pb-5 text-white/55 text-sm leading-[1.75] font-light tracking-[0.01em]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Right Column Accordion */}
            <Accordion type="single" collapsible className="w-full space-y-3 flex flex-col">
              {faqs.slice(faqMidpoint).map((faq, index) => (
                <AccordionItem
                  key={`right-item-${index + 1}`}
                  value={`right-item-${index + 1}`}
                  className="overflow-hidden border border-white/[0.09] rounded-xl bg-slate-900/50 hover:border-cyan-500/20 data-[state=open]:border-cyan-500/35 data-[state=open]:bg-slate-900/80 transition-all duration-300"
                >
                  <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 hover:no-underline text-left group w-full flex items-center relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.11] via-purple-500/[0.07] to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />
                    <span className="font-light text-sm sm:text-base text-white/70 group-hover:text-white pr-4 flex-1 transition-colors duration-300 relative z-10">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 text-white/30 group-hover:text-cyan-400 shrink-0 transition-all duration-300 relative z-10" />
                  </AccordionTrigger>
                  <AccordionContent className="px-5 sm:px-6 pb-4 sm:pb-5 text-white/55 text-sm leading-[1.75] font-light tracking-[0.01em]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* More FAQs CTA */}
          <div className="text-center mt-10 sm:mt-12">
            <p className="text-white/45 text-sm sm:text-base font-light mb-4">
              Have a question about our process, timelines, or the GTA specifically?
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center text-sm sm:text-base font-medium text-white/60 hover:text-white transition-colors duration-300 group"
            >
              Browse the full FAQ <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Last Updated Date */}
          <div className="text-center mt-12">
            <p className="text-white/40 text-sm font-light">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>

      {/* Product + breadcrumb schema is server-rendered in src/app/pricing/page.tsx */}
    </div>
  );
};

export default memo(Pricing);