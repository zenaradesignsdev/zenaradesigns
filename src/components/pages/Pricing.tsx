'use client';

import Link from 'next/link';
import { Check, ArrowRight, Star, ChevronDown, Layers, Rocket, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { memo, useMemo, useEffect, useRef, useState } from 'react';
import StructuredData from '@/components/StructuredData';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';

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

  const pricingPlans = useMemo(() => [
    {
      name: "Starter",
      subtitle: "Individual",
      price: "$999",
      description: "Perfect for freelancers and personal brands",
      features: [
        "Up to 3 pages (Home, About, Contact)",
        "Modern portfolio-style design",
        "Mobile-responsive layout",
        "Contact form + email notifications",
        "SEO setup (titles/meta, indexing, analytics)",
        "1 month free hosting",
        "SSL + baseline security included",
        "1-week turnaround (once content is received)",
        "14 days post-launch support (bug fixes + minor edits)"
      ],
      cta: "Choose Starter",
      popular: false
    },
    {
      name: "Small Business", 
      subtitle: "Recommended",
      price: "$1,999",
      description: "Ideal for small businesses and professionals",
      features: [
        "Up to 6 pages (Home, About, Services, Projects, Pricing, Contact)",
        "Custom sections and layouts",
        "Custom forms (contact/quote/booking)",
        "SEO setup (titles/meta, indexing, sitemap)",
        "Mobile-first responsive design",
        "Basic animations",
        "2 rounds of revisions included",
        "2–3 week turnaround (once content is received)",
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
      description: "For businesses needing advanced functionality",
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
      category: "Business Card Design & Logo Design - Tailored for Toronto & GTA",
      services: [
        {
          name: "Professional Business Cards",
          price: "$149 - $399",
          description: "High-quality business card design and printing",
          features: ["Custom design", "Premium printing", "Digital files", "2-3 day turnaround"],
          idealFor: "Professionals, consultants, service providers, small business owners, executives, lawyers, doctors, financial advisors, luxury brands"
        },
        {
          name: "Basic Logo Design",
          price: "$99 - $199", 
          description: "Simple logo design for small businesses",
          features: ["3 initial concepts", "2 revisions", "Vector files", "1 week delivery"],
          idealFor: "Startups, freelancers, small businesses, entrepreneurs"
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

  const faqs = useMemo(() => [
    {
      question: "What are your web design packages and pricing?",
      answer: "We offer three main packages: Starter ($999) for individuals with 1-3 pages and 1 week turnaround, Small Business ($1,999) for businesses with up to 6 pages and 2-3 weeks turnaround, and Pro ($4,999+) for advanced functionality with unlimited pages and 3-4 weeks turnaround."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes! We offer 50% upfront and 50% on completion for all projects. For Pro projects over $10k, we can discuss custom payment schedules. We accept e-transfers, cheques, and credit cards."
    },
    {
      question: "How long does it take to build a website?",
      answer: "Our timelines are: Starter (1 week), Small Business (2-3 weeks), and Pro (3-4 weeks). These timelines include design, development, testing, and launch. We work efficiently while ensuring quality results."
    },
    {
      question: "What's included in each pricing plan?",
      answer: "Starter includes 1-3 pages and basic features. Small Business includes up to 6 pages with custom sections and 2 revisions. Pro includes unlimited pages, advanced integrations, and priority support. All plans include mobile optimization, SEO basics, SSL security, and hosting."
    },
    {
      question: "Do you provide business card design services?",
      answer: "Yes! We offer professional business card design services across the GTA. Our packages range from $149-$399 for professional cards and $299-$599 for executive cards with premium finishes like foil stamping and embossing."
    },
    {
      question: "Can you help with e-commerce development?",
      answer: "Yes! We specialize in e-commerce development using platforms like Shopify, WooCommerce, and custom solutions. Small e-commerce stores start at $2,999-$4,999, with enterprise solutions available by quote."
    },
    {
      question: "Are there any hidden costs?",
      answer: "No hidden costs! Our pricing is transparent and includes everything listed. The only additional costs would be if you request features beyond what's included in your chosen plan, and we'll always discuss these upfront."
    },
    {
      question: "Do you handle hosting and domain setup?",
      answer: "Yes! We can handle hosting internally for $10-$30/month (SSL included) or help you set up with external providers. We also assist with domain registration and DNS setup."
    },
    {
      question: "What happens if I'm not satisfied with the design?",
      answer: "We work closely with you throughout the process to ensure you love the result. If you're not satisfied, we'll work with you to make it right. Our goal is your success and satisfaction."
    },
    {
      question: "Can I upgrade my plan during the project?",
      answer: "Absolutely! You can upgrade from Starter to Small Business or Pro at any time. We'll adjust the pricing accordingly and add the new features to your project."
    }
  ], []);

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
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">Web Design Agency — Toronto & GTA</p>
            </FadeIn>
            <TextReveal
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight mb-6 sm:mb-8 text-white leading-[0.95] tracking-[-0.04em]"
              staggerMs={130}
              lines={[
                <span key="l1" className="block font-light">Simple,</span>,
                <span key="l2" className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Transparent Pricing.</span>,
              ]}
            />
            <FadeIn delay={260}>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
                Choose the plan that fits your needs. No hidden fees, no surprises — just quality work.
              </p>
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
                
                <div className={`pricing-card pricing-card-container bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border shadow-2xl transition-all duration-500 min-h-[600px] flex flex-col relative overflow-hidden group-hover:-translate-y-2 ${plan.popular ? 'border-cyan-500/50 shadow-cyan-500/20' : 'border-slate-800/50'}`}>
                  {/* Box glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                  
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
                      <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-white tracking-tight">{plan.name}</h2>
                      <p className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-light mb-3 sm:mb-4 text-sm sm:text-base">{plan.subtitle}</p>
                      <div className="text-4xl sm:text-5xl font-light mb-3 sm:mb-4 text-white">{plan.price}</div>
                      <p className="text-white/60 text-base sm:text-lg font-light">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">{feature}</span>
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
                            <span className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">{feature}</span>
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
                Complete pricing for all our web design, business card, and logo design services in Toronto &amp; GTA
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
                    {category.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="relative flex flex-col bg-slate-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/15 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 group/card"
                      >
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
                          {/* Ideal for tag chip */}
                          {service.idealFor && (
                            <div className="mt-auto pt-4 border-t border-white/6">
                              <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300/70 text-xs font-light tracking-wide">
                                Ideal for: {service.idealFor.split(',')[0].trim()}
                                {service.idealFor.split(',').length > 1 ? ' & more' : ''}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
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
                    body: '1–4 week turnaround once content is received.',
                  },
                  {
                    number: '03',
                    label: 'Transparent Pricing',
                    body: 'Fixed, upfront quotes. No hidden fees, ever.',
                  },
                  {
                    number: '04',
                    label: 'Local & Accessible',
                    body: "GTA-based team. We\u2019re easy to reach and quick to respond.",
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
                <span key="l1" className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Frequently Asked</span>,
                <span key="l2" className="block font-light opacity-90 mt-2">Questions</span>,
              ]}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:items-start">
            {/* Left Column Accordion */}
            <Accordion type="single" collapsible className="w-full space-y-3 flex flex-col">
              {faqs.slice(0, 5).map((faq, index) => (
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
              {faqs.slice(5, 10).map((faq, index) => (
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
          
          {/* Last Updated Date */}
          <div className="text-center mt-12">
            <p className="text-white/40 text-sm font-light">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <StructuredData 
        type="product" 
        products={pricingPlans}
      />
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Pricing', url: '/pricing' }
        ]} 
      />
    </div>
  );
};

export default memo(Pricing);