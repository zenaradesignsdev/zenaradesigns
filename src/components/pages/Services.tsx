'use client';

import Link from 'next/link';
import { Star, CheckCircle, ArrowUpRight, ChevronDown, Globe, ShoppingCart, Paintbrush, CreditCard, Search, Server, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { scrollToTop } from '@/hooks';
import { useState, useEffect, useRef, memo } from 'react';
import StructuredData from '@/components/StructuredData';
import { SafeImage } from '@/components/ui/safe-image';
import { TextReveal } from '@/components/ui/text-reveal';
import { FadeIn } from '@/components/ui/fade-in';

const moonImage = '/images/moon.png';
const realEstateWebImage = '/images/website-example-realestate.png';
const rocketWebImage = '/images/website-example-rocket.png';
const gardenWebImage = '/images/website-example-garden.png';
const travelWebImage = '/images/website-example-travel.png';

const SERVICES = [
  {
    number: '01',
    icon: Globe,
    accent: 'cyan' as const,
    title: 'Website Design & Development',
    description: 'Complete web solutions built for performance and conversion.',
    tag: 'Core Service',
    image: realEstateWebImage,
    imageAlt: 'Real Estate Website Design Toronto — Professional Property Showcase',
    gradient: 'from-cyan-500/20 to-purple-500/20',
    features: [
      'Dedicated web designer and mock-ups made for customers',
      'Modern web design with cutting-edge web stack',
      'Fully responsive on mobile and optimized for all devices',
      'Performance, security, and privacy built-in',
      'SEO optimization for better search rankings',
      'Custom features, forms, and integrations',
    ],
  },
  {
    number: '02',
    icon: Shield,
    accent: 'purple' as const,
    title: 'Web Hosting & Security',
    description: 'Enterprise-grade hosting with built-in security and monitoring.',
    tag: 'Infrastructure',
    image: rocketWebImage,
    imageAlt: 'Tech Startup Website Design Toronto — Modern Platform Example',
    gradient: 'from-purple-500/20 to-cyan-500/20',
    features: [
      'Affordable plans that fit your budget',
      'Scales as your traffic and business grows',
      'Automated backups + easy restores',
      'Global CDN for faster load times',
      'Uptime monitoring with instant alerts',
      'Security best practices + web firewall protection',
      'SSL included with every plan',
    ],
  },
  {
    number: '03',
    icon: Zap,
    accent: 'cyan' as const,
    title: 'Maintenance & Support',
    description: 'Keep your site running smoothly with ongoing care.',
    tag: 'Ongoing Care',
    image: gardenWebImage,
    imageAlt: 'Garden & Landscaping Website Design GTA — Business Platform Example',
    gradient: 'from-teal-500/20 to-purple-500/20',
    features: [
      'Monthly security and performance updates',
      'Amazing uptime with 99.9% reliability',
      'Content changes and copy revisions',
      'Bug fixes and compatibility updates',
      'Small feature additions and improvements',
      'Priority technical support when you need it',
      'Complete setup support and guidance',
    ],
  },
  {
    number: '04',
    icon: Paintbrush,
    accent: 'purple' as const,
    title: 'Brand & Collateral',
    description: 'Complete brand identity and marketing materials.',
    tag: 'Brand Identity',
    image: travelWebImage,
    imageAlt: 'Travel Agency Website Design Toronto — Adventure Booking Platform Example',
    gradient: 'from-pink-500/20 to-cyan-500/20',
    features: [
      'Custom logo design and comprehensive brand guidelines',
      'Business card design with print-ready files',
      'Social media profile and cover setup',
      'Branded social media post templates',
      'Complete brand kit handoff with all assets',
      'Google Business setup and optimization',
      'Additional brand-related services available on request',
    ],
  },
];

const SUB_SERVICES = [
  { icon: Globe, title: 'Web Design', href: '/services/web-design', desc: 'Custom websites built for performance, SEO, and conversions.' },
  { icon: ShoppingCart, title: 'E-Commerce', href: '/services/ecommerce', desc: 'Online stores with Shopify, payment integration, and product management.' },
  { icon: Paintbrush, title: 'Logo Design', href: '/services/logo-design', desc: 'Custom brand identity, color palettes, and comprehensive guidelines.' },
  { icon: CreditCard, title: 'Business Cards', href: '/services/business-cards', desc: 'Premium print-ready designs that make lasting first impressions.' },
  { icon: Search, title: 'SEO', href: '/services/seo', desc: 'Local SEO, technical optimization, and content strategy for visibility.' },
  { icon: Server, title: 'Hosting & Maintenance', href: '/services/hosting', desc: 'Managed hosting with 99.9% uptime, SSL, CDN, and priority support.' },
];

const INDUSTRIES = [
  { title: 'Law Firms', href: '/lawyers', description: 'Professional web design solutions tailored for legal practices. Build trust and credibility with modern websites that showcase your expertise and convert visitors into clients.', tag: 'Trust-Critical' },
  { title: 'Accounting Firms', href: '/accountants', description: 'Secure, professional websites for accounting firms. Showcase your services, build client trust, and streamline client communication with custom web solutions.', tag: 'Compliance-Ready' },
  { title: 'Renovation Companies', href: '/renovations', description: 'Showcase your craftsmanship with stunning portfolio websites. Highlight your projects, attract new clients, and grow your renovation business online.', tag: 'Portfolio-Driven' },
  { title: 'Wellness Clinics', href: '/clinics', description: 'Modern websites designed for wellness and healthcare practices. Enable online booking, showcase services, and build trust with potential patients.', tag: 'Patient-First' },
];

const TESTIMONIALS = [
  { quote: 'Zenara delivered a clean, fast site in days. Our conversion rate jumped 40% within the first month.', author: 'Taylor R.', role: 'Small Business Owner', rating: 5 },
  { quote: 'Traffic up, inquiries doubled. The team understood exactly what we needed and delivered beyond expectations.', author: 'Dr. Lina P.', role: 'Clinic Director', rating: 5 },
  { quote: 'Seamless process from mockup to launch. Professional, responsive, and the site performs beautifully.', author: 'Mark H.', role: 'Contractor', rating: 5 },
  { quote: 'Finally, a web team that speaks our language. Fast delivery without compromising on quality.', author: 'Emma K.', role: 'Marketing Director', rating: 5 },
  { quote: 'Our new website has been a game-changer. Professional, fast, and exactly what we envisioned.', author: 'Sarah M.', role: 'E-commerce Owner', rating: 5 },
  { quote: 'Outstanding work! The team was responsive, creative, and delivered on time. Highly recommended.', author: 'James L.', role: 'Startup Founder', rating: 5 },
  { quote: 'The attention to detail and user experience is incredible. Our customers love the new site.', author: 'Maria G.', role: 'Restaurant Owner', rating: 5 },
  { quote: 'From concept to completion, Zenara made the entire process smooth and stress-free.', author: 'David C.', role: 'Consultant', rating: 5 },
];

const FAQ_LEFT = [
  { value: 'l1', question: 'How long does it take to build a website?', answer: 'Most websites are completed within 2–4 weeks, depending on complexity and requirements. Simple sites can be ready in 1–2 weeks, while more complex projects with custom features may take 3–4 weeks. We work efficiently while ensuring quality results.' },
  { value: 'l2', question: "What's included in your web design package?", answer: 'Our packages include custom design, fully responsive development, SEO optimization, SSL security setup, performance optimization, and post-launch support. We also provide brand guidelines, logo design options, and business card design as part of our comprehensive service.' },
  { value: 'l3', question: 'Do you provide hosting and maintenance?', answer: "Yes! We offer comprehensive hosting solutions with 99.9% uptime guarantee, automated backups, and ongoing maintenance support. Our hosting plans include SSL certificates, CDN integration, and 24/7 monitoring. We also provide monthly maintenance packages for updates and support." },
  { value: 'l4', question: 'Can you help with existing websites?', answer: 'We can assist with existing websites if they use a similar technology stack to our preferred modern frameworks. If your current site uses a different technology stack, we typically recommend building a new site with our modern approach for optimal performance and maintainability.' },
  { value: 'l5', question: 'What makes your websites different?', answer: "We focus on business results, not just aesthetics. Every design decision is made with conversion optimization in mind. We use modern, fast-loading technologies, ensure mobile-first responsive design, and build with SEO best practices from day one. Plus, you get direct access to our team throughout the project." },
];

const FAQ_RIGHT = [
  { value: 'r1', question: 'Do you offer payment plans?', answer: "Yes! We offer flexible payment options with 50% upfront and 50% on completion for all projects. For larger projects over $10,000, we can discuss custom payment schedules. We accept e-transfers, cheques, and credit cards to make it convenient for you." },
  { value: 'r2', question: 'Will my website work on mobile devices?', answer: "Absolutely! Every website we build is fully responsive and mobile-optimized. We use a mobile-first approach, ensuring your site looks and works perfectly on smartphones, tablets, and all screen sizes. Mobile optimization is included in all our packages." },
  { value: 'r3', question: 'What if I need changes after launch?', answer: "All our packages include post-launch support (14–60 days depending on your plan). After that, we offer flexible maintenance packages for ongoing updates, content changes, security updates, and technical support. We're here for the long term." },
  { value: 'r4', question: 'Do you provide business card and logo design?', answer: 'Yes! We offer complete brand identity services including custom logo design, business card design with print-ready files, brand guidelines, and social media profile setup. Our brand packages range from basic logo design to comprehensive brand identity systems.' },
  { value: 'r5', question: 'How do I get started?', answer: "Getting started is easy! Simply contact us through our contact form or schedule a free consultation. We'll discuss your project goals, timeline, and budget, then provide a detailed proposal. Once approved, we'll begin the design process and keep you involved every step of the way." },
];

const CITIES_TOP = [
  'Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham',
  'Richmond Hill', 'Oakville', 'Burlington', 'Hamilton', 'Ajax',
  'Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham',
  'Richmond Hill', 'Oakville', 'Burlington', 'Hamilton', 'Ajax',
];

const CITIES_BOTTOM = [
  'Pickering', 'Whitby', 'Oshawa', 'Newmarket', 'Aurora',
  'Milton', 'Caledon', 'Halton Hills', 'Georgina', 'Clarington',
  'Pickering', 'Whitby', 'Oshawa', 'Newmarket', 'Aurora',
  'Milton', 'Caledon', 'Halton Hills', 'Georgina', 'Clarington',
];

const Services = () => {
  const serviceCardsRef = useRef<HTMLDivElement>(null);
  const [visibleServiceCards, setVisibleServiceCards] = useState<Set<number>>(new Set());

  const industryCardsRef = useRef<HTMLDivElement>(null);
  const [visibleIndustryCards, setVisibleIndustryCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const cards = serviceCardsRef.current?.querySelectorAll('[data-service-card]');
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-service-card'));
            setVisibleServiceCards((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = industryCardsRef.current?.querySelectorAll('[data-industry-card]');
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-industry-card'));
            setVisibleIndustryCards((prev) => new Set(prev).add(idx));
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
    <div className="min-h-screen" role="main" aria-label="Services page">

      {/* ── HERO ── bg-black with blooms ────────────────────── */}
      <section className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 sm:pb-24 md:pb-28 relative overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[600px] h-[500px] bg-cyan-500/[0.12] rounded-full blur-[130px]" />
          <div className="absolute -bottom-10 -right-10 w-[500px] h-[400px] bg-purple-600/[0.14] rounded-full blur-[110px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-cyan-800/15 via-purple-800/15 to-cyan-800/15 rounded-full blur-[100px]" />
          {/* Stars */}
          <div className="bg-star" style={{ top: '5%', left: '3%' }} />
          <div className="bg-star" style={{ top: '8%', left: '15%' }} />
          <div className="bg-star" style={{ top: '12%', left: '30%' }} />
          <div className="bg-star" style={{ top: '6%', left: '55%' }} />
          <div className="bg-star" style={{ top: '15%', left: '70%' }} />
          <div className="bg-star" style={{ top: '9%', left: '85%' }} />
          <div className="bg-star" style={{ top: '20%', left: '92%' }} />
          <div className="bg-star" style={{ top: '35%', left: '8%' }} />
          <div className="bg-star" style={{ top: '50%', left: '95%' }} />
          <div className="bg-star" style={{ top: '65%', left: '12%' }} />
          <div className="bg-star" style={{ top: '75%', left: '80%' }} />
          <div className="bg-star" style={{ top: '85%', left: '45%' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — text */}
            <div>
              <FadeIn>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-5 font-medium">
                  Web Design · Hosting · Branding · SEO
                </p>
              </FadeIn>
              <TextReveal
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extralight text-white leading-[0.92] tracking-[-0.04em] mb-8 sm:mb-10"
                staggerMs={130}
                lines={[
                  <span key="l1" className="block font-light opacity-90 pb-3">Everything your</span>,
                  <span key="l2" className="block">
                    <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">business</span>
                    {' '}
                    <span className="font-light">needs</span>
                  </span>,
                  <span key="l3" className="block font-light">online.</span>,
                ]}
              />
              <FadeIn delay={300}>
                <p className="text-base sm:text-lg text-white/55 max-w-xl leading-[1.75] font-light tracking-[0.01em] mb-10 sm:mb-12">
                  From custom web design to hosting and branding — we build, launch, and maintain everything so you can focus on what you do best.
                </p>
              </FadeIn>
              <FadeIn delay={420}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                  <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                    <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-7 py-5 sm:px-9 sm:py-6 text-base sm:text-lg font-semibold group">
                      <Link href="/contact" className="flex items-center relative z-10 group-hover:text-white">
                        <span className="relative z-10">Start Your Project</span>
                        <ArrowUpRight className="ml-2 h-5 w-5 relative z-10 group-hover:text-cyan-400 transition-colors" />
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right — moon */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative w-72 h-72 xl:w-96 xl:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/15 to-purple-500/15 blur-3xl scale-125" />
                <div className="absolute inset-0 animate-levitate">
                  <SafeImage
                    src={moonImage}
                    alt="Decorative moon illustration for digital services"
                    className="w-full h-full object-contain opacity-80"
                    priority
                  />
                </div>
                <div className="absolute inset-[-20%] rounded-full border border-white/[0.06]" />
                <div className="absolute inset-[-40%] rounded-full border border-white/[0.03]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES ── bg gradient with stars ──────────── */}
      <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
        {/* Stars */}
        <div className="absolute inset-0">
          <div className="bg-star" style={{ top: '3%', left: '2%' }} />
          <div className="bg-star" style={{ top: '6%', left: '10%' }} />
          <div className="bg-star" style={{ top: '10%', left: '22%' }} />
          <div className="bg-star" style={{ top: '4%', left: '35%' }} />
          <div className="bg-star" style={{ top: '14%', left: '48%' }} />
          <div className="bg-star" style={{ top: '7%', left: '60%' }} />
          <div className="bg-star" style={{ top: '16%', left: '72%' }} />
          <div className="bg-star" style={{ top: '5%', left: '84%' }} />
          <div className="bg-star" style={{ top: '12%', left: '93%' }} />
          <div className="bg-star" style={{ top: '25%', left: '5%' }} />
          <div className="bg-star" style={{ top: '30%', left: '18%' }} />
          <div className="bg-star" style={{ top: '28%', left: '38%' }} />
          <div className="bg-star" style={{ top: '33%', left: '55%' }} />
          <div className="bg-star" style={{ top: '27%', left: '70%' }} />
          <div className="bg-star" style={{ top: '35%', left: '88%' }} />
          <div className="bg-star" style={{ top: '48%', left: '3%' }} />
          <div className="bg-star" style={{ top: '52%', left: '25%' }} />
          <div className="bg-star" style={{ top: '45%', left: '45%' }} />
          <div className="bg-star" style={{ top: '55%', left: '65%' }} />
          <div className="bg-star" style={{ top: '50%', left: '82%' }} />
          <div className="bg-star" style={{ top: '65%', left: '8%' }} />
          <div className="bg-star" style={{ top: '70%', left: '30%' }} />
          <div className="bg-star" style={{ top: '68%', left: '52%' }} />
          <div className="bg-star" style={{ top: '72%', left: '75%' }} />
          <div className="bg-star" style={{ top: '67%', left: '92%' }} />
          <div className="bg-star" style={{ top: '82%', left: '15%' }} />
          <div className="bg-star" style={{ top: '85%', left: '40%' }} />
          <div className="bg-star" style={{ top: '88%', left: '62%' }} />
          <div className="bg-star" style={{ top: '83%', left: '85%' }} />
          <div className="bg-star" style={{ top: '92%', left: '28%' }} />
          <div className="bg-star" style={{ top: '95%', left: '70%' }} />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-teal-500/15 rounded-full blur-3xl delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-14 sm:mb-16 md:mb-20 max-w-3xl">
            <FadeIn>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 font-medium">What We Offer</p>
            </FadeIn>
            <TextReveal
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[0.95] tracking-[-0.04em]"
              staggerMs={120}
              lines={[
                <span key="l1" className="font-light">Our core </span>,
                <span key="l2" className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">services.</span>,
              ]}
            />
          </div>

          <div ref={serviceCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isCyan = service.accent === 'cyan';
              const isVisible = visibleServiceCards.has(index);
              return (
                <div
                  key={index}
                  data-service-card={index}
                  className={`group relative rounded-2xl sm:rounded-3xl border overflow-hidden transition-all duration-700
                    ${isCyan
                      ? 'border-cyan-500/20 hover:border-cyan-400/50 bg-gradient-to-br from-cyan-950/50 via-slate-900/70 to-purple-950/40 hover:from-cyan-900/60 hover:via-slate-900/80 hover:to-purple-900/50 shadow-[inset_0_1px_0_rgba(6,182,212,0.08)]'
                      : 'border-purple-500/20 hover:border-purple-400/50 bg-gradient-to-br from-purple-950/50 via-slate-900/70 to-cyan-950/40 hover:from-purple-900/60 hover:via-slate-900/80 hover:to-cyan-900/50 shadow-[inset_0_1px_0_rgba(168,85,247,0.08)]'}
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  {/* Resting gradient wash */}
                  <div className={`absolute inset-0 ${isCyan ? 'bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5' : 'bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5'}`} />
                  {/* Hover intensification */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isCyan ? 'bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent' : 'bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-transparent'}`} />
                  {/* Large background number */}
                  <div className={`absolute top-4 right-5 sm:top-5 sm:right-7 text-[5rem] sm:text-[6.5rem] font-bold leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-105 ${isCyan ? 'text-cyan-400/[0.07] group-hover:text-cyan-300/[0.12]' : 'text-purple-400/[0.07] group-hover:text-purple-300/[0.12]'}`}>
                    {service.number}
                  </div>

                  <div className="relative z-10 p-6 sm:p-7 md:p-8">
                    {/* Website preview image */}
                    <div className={`aspect-[16/7] bg-gradient-to-br ${service.gradient} rounded-xl p-2.5 mb-6 overflow-hidden`}>
                      <div className="h-full bg-white/90 rounded-lg overflow-hidden shadow-sm">
                        <SafeImage
                          src={service.image}
                          alt={service.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          quality={60}
                          sizes="(max-width: 768px) calc(100vw - 64px), (max-width: 1280px) calc(50vw - 80px), 560px"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 tracking-tight leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-white/55 group-hover:text-white/70 text-sm sm:text-base leading-[1.7] font-light tracking-[0.01em] mb-5 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-2 mb-7">
                      {service.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-white/48 group-hover:text-white/60 transition-colors duration-300">
                          <CheckCircle className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${isCyan ? 'text-cyan-400/60' : 'text-purple-400/60'}`} />
                          <span className="text-xs sm:text-sm leading-[1.6] font-light tracking-[0.01em]">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tag */}
                    <span className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300 ${isCyan ? 'text-cyan-400/60 group-hover:text-cyan-300' : 'text-purple-400/60 group-hover:text-purple-300'}`}>
                      {service.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EXPLORE INDIVIDUAL SERVICES ── bg-black with blooms ─ */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/[0.07] rounded-full blur-[100px]" />
          <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/[0.08] rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-12 sm:mb-14">
            <FadeIn>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 font-medium">Dive Deeper</p>
            </FadeIn>
            <TextReveal
              className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[0.95] tracking-[-0.04em]"
              staggerMs={120}
              lines={[
                <span key="l1">
                  <span className="font-light">Explore our </span>
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">individual services.</span>
                </span>,
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SUB_SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isCyan = index % 2 === 0;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={scrollToTop}
                  className={`group relative flex items-start gap-4 p-5 sm:p-6 rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5
                    ${isCyan
                      ? 'border-cyan-500/20 hover:border-cyan-400/50 bg-gradient-to-br from-cyan-950/50 via-slate-900/70 to-slate-900/40 hover:from-cyan-900/55 hover:shadow-[0_4px_24px_rgba(6,182,212,0.08)]'
                      : 'border-purple-500/20 hover:border-purple-400/50 bg-gradient-to-br from-purple-950/50 via-slate-900/70 to-slate-900/40 hover:from-purple-900/55 hover:shadow-[0_4px_24px_rgba(168,85,247,0.08)]'
                    }`}
                >
                  {/* Corner glow */}
                  <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${isCyan ? 'bg-cyan-500/20' : 'bg-purple-500/20'}`} />
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 relative z-10 ${isCyan ? 'bg-cyan-500/12 group-hover:bg-cyan-500/22' : 'bg-purple-500/12 group-hover:bg-purple-500/22'}`}>
                    <Icon className={`h-4 w-4 transition-colors duration-300 ${isCyan ? 'text-cyan-400/70 group-hover:text-cyan-300' : 'text-purple-400/70 group-hover:text-purple-300'}`} />
                  </div>
                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-sm sm:text-base font-medium text-white/75 group-hover:text-white transition-colors duration-300">{service.title}</h3>
                      <ArrowUpRight className={`h-3.5 w-3.5 text-white/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 ml-2 ${isCyan ? 'group-hover:text-cyan-400' : 'group-hover:text-purple-400'}`} />
                    </div>
                    <p className="text-xs text-white/40 leading-[1.6] font-light group-hover:text-white/55 transition-colors duration-300">{service.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ── bg gradient with stars ─────── */}
      <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
        {/* Stars */}
        <div className="absolute inset-0">
          <div className="bg-star" style={{ top: '4%', left: '5%' }} />
          <div className="bg-star" style={{ top: '8%', left: '18%' }} />
          <div className="bg-star" style={{ top: '5%', left: '32%' }} />
          <div className="bg-star" style={{ top: '12%', left: '50%' }} />
          <div className="bg-star" style={{ top: '7%', left: '65%' }} />
          <div className="bg-star" style={{ top: '15%', left: '78%' }} />
          <div className="bg-star" style={{ top: '10%', left: '90%' }} />
          <div className="bg-star" style={{ top: '28%', left: '3%' }} />
          <div className="bg-star" style={{ top: '32%', left: '22%' }} />
          <div className="bg-star" style={{ top: '25%', left: '42%' }} />
          <div className="bg-star" style={{ top: '35%', left: '60%' }} />
          <div className="bg-star" style={{ top: '30%', left: '80%' }} />
          <div className="bg-star" style={{ top: '22%', left: '95%' }} />
          <div className="bg-star" style={{ top: '50%', left: '10%' }} />
          <div className="bg-star" style={{ top: '55%', left: '35%' }} />
          <div className="bg-star" style={{ top: '48%', left: '58%' }} />
          <div className="bg-star" style={{ top: '52%', left: '78%' }} />
          <div className="bg-star" style={{ top: '45%', left: '95%' }} />
          <div className="bg-star" style={{ top: '70%', left: '6%' }} />
          <div className="bg-star" style={{ top: '74%', left: '28%' }} />
          <div className="bg-star" style={{ top: '68%', left: '48%' }} />
          <div className="bg-star" style={{ top: '72%', left: '70%' }} />
          <div className="bg-star" style={{ top: '75%', left: '88%' }} />
          <div className="bg-star" style={{ top: '88%', left: '15%' }} />
          <div className="bg-star" style={{ top: '85%', left: '40%' }} />
          <div className="bg-star" style={{ top: '90%', left: '62%' }} />
          <div className="bg-star" style={{ top: '87%', left: '82%' }} />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-teal-500/15 rounded-full blur-3xl delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-14 sm:mb-16 md:mb-20 max-w-3xl">
            <FadeIn>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 font-medium">Specialized Expertise</p>
            </FadeIn>
            <TextReveal
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[0.95] tracking-[-0.04em] mb-6"
              staggerMs={120}
              lines={[
                <span key="l1">
                  <span className="font-light text-white">Industries We </span>
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Serve.</span>
                </span>,
              ]}
            />
            <FadeIn delay={240}>
              <p className="text-base sm:text-lg text-white/55 leading-[1.7] font-light tracking-[0.01em]">
                We understand the unique needs of trust-critical industries and build tailored websites that drive real results.
              </p>
            </FadeIn>
          </div>

          <div ref={industryCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {INDUSTRIES.map((industry, index) => {
              const isVisible = visibleIndustryCards.has(index);
              return (
                <Link
                  key={industry.href}
                  href={industry.href}
                  onClick={scrollToTop}
                  data-industry-card={index}
                  className={`group relative rounded-2xl sm:rounded-3xl border border-cyan-500/20 hover:border-cyan-400/60 bg-gradient-to-br from-cyan-950/50 via-slate-900/70 to-purple-950/40 hover:from-cyan-900/60 hover:via-slate-900/80 hover:to-purple-900/50 backdrop-blur-sm transition-all duration-500 ease-out overflow-hidden shadow-[inset_0_1px_0_rgba(6,182,212,0.08)]
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/12 via-purple-500/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-400/25 transition-all duration-700" />
                  <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/8 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700 delay-75" />
                  <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col min-h-[200px] sm:min-h-[240px]">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl md:text-[1.7rem] font-semibold text-white mb-3 tracking-tight leading-tight">{industry.title}</h3>
                      <p className="text-white/55 group-hover:text-white/70 text-sm sm:text-base leading-[1.7] font-light tracking-[0.01em] max-w-md transition-colors duration-300">{industry.description}</p>
                    </div>
                    <div className="mt-6 sm:mt-8 flex items-center justify-between">
                      <span className="text-xs sm:text-sm uppercase tracking-[0.15em] text-cyan-400/70 group-hover:text-cyan-300 transition-colors duration-300 font-medium">{industry.tag}</span>
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-cyan-500/25 bg-cyan-500/8 group-hover:border-cyan-400/60 group-hover:bg-cyan-500/20 flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400/60 group-hover:text-cyan-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS / CITIES ── bg gradient with stars ──── */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/60 to-slate-900">
        <div className="absolute inset-0">
          <div className="bg-star" style={{ top: '5%', left: '3%' }} />
          <div className="bg-star" style={{ top: '8%', left: '15%' }} />
          <div className="bg-star" style={{ top: '12%', left: '28%' }} />
          <div className="bg-star" style={{ top: '6%', left: '42%' }} />
          <div className="bg-star" style={{ top: '15%', left: '56%' }} />
          <div className="bg-star" style={{ top: '9%', left: '70%' }} />
          <div className="bg-star" style={{ top: '18%', left: '82%' }} />
          <div className="bg-star" style={{ top: '7%', left: '94%' }} />
          <div className="bg-star" style={{ top: '35%', left: '8%' }} />
          <div className="bg-star" style={{ top: '40%', left: '35%' }} />
          <div className="bg-star" style={{ top: '38%', left: '60%' }} />
          <div className="bg-star" style={{ top: '42%', left: '88%' }} />
          <div className="bg-star" style={{ top: '62%', left: '12%' }} />
          <div className="bg-star" style={{ top: '65%', left: '45%' }} />
          <div className="bg-star" style={{ top: '70%', left: '72%' }} />
          <div className="bg-star" style={{ top: '80%', left: '22%' }} />
          <div className="bg-star" style={{ top: '85%', left: '55%' }} />
          <div className="bg-star" style={{ top: '88%', left: '85%' }} />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-teal-500/15 rounded-full blur-3xl delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-14">
            <TextReveal
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 leading-[0.95] tracking-[-0.04em]"
              staggerMs={130}
              lines={[
                <span key="l1" className="block font-light opacity-90 pb-2">Serving the</span>,
                <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Greater Toronto Area</span>,
              ]}
            />
            <FadeIn delay={280}>
              <p className="text-base sm:text-lg text-white/55 max-w-2xl mx-auto leading-[1.7] font-light mt-4">
                We provide web design and development services across the GTA.
              </p>
            </FadeIn>
          </div>

          <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
            {/* Top Row */}
            <div className="mb-3 sm:mb-4">
              <div className="flex animate-scroll-left gap-3">
                {CITIES_TOP.map((city, index) => (
                  <div
                    key={`top-${index}`}
                    className="flex-shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/[0.12] bg-white/[0.05] hover:border-cyan-400/40 hover:bg-cyan-500/[0.08] transition-all duration-300 cursor-default"
                    style={{ minWidth: 'fit-content' }}
                  >
                    <span className="text-sm sm:text-base font-light text-white/65 whitespace-nowrap">{city}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Bottom Row */}
            <div>
              <div className="flex animate-scroll-right gap-3">
                {CITIES_BOTTOM.map((city, index) => (
                  <div
                    key={`bottom-${index}`}
                    className="flex-shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/[0.12] bg-white/[0.05] hover:border-purple-400/40 hover:bg-purple-500/[0.08] transition-all duration-300 cursor-default"
                    style={{ minWidth: 'fit-content' }}
                  >
                    <span className="text-sm sm:text-base font-light text-white/65 whitespace-nowrap">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── bg-black with blooms ─────────────── */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-[500px] h-[400px] bg-cyan-500/[0.09] rounded-full blur-[120px]" />
          <div className="absolute -bottom-10 -right-10 w-[500px] h-[400px] bg-purple-600/[0.10] rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-cyan-800/10 via-purple-800/10 to-cyan-800/10 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-14">
            <TextReveal
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 leading-[0.95] tracking-[-0.04em]"
              staggerMs={120}
              lines={[
                <span key="l1">
                  <span className="font-light opacity-90">What our </span>
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">clients say.</span>
                </span>,
              ]}
            />
            <FadeIn delay={240}>
              <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-[1.7] font-light mt-4">
                Real results from real businesses who trusted us with their digital transformation.
              </p>
            </FadeIn>
          </div>

          <div className="relative overflow-hidden -mx-4 sm:-mx-6" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
            <div className="flex animate-scroll-smooth space-x-4 sm:space-x-5 py-4">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, index) => (
                <div key={index} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]">
                  <div className="relative rounded-2xl border border-white/[0.09] bg-slate-900/60 backdrop-blur-sm p-5 sm:p-6 h-full flex flex-col overflow-hidden group hover:border-white/[0.18] transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/[0.06] to-purple-500/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Quote mark + Stars */}
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-6xl leading-none text-cyan-400/20 font-serif select-none">&ldquo;</span>
                        <div className="flex items-center gap-0.5 pt-2">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-cyan-400/80 fill-cyan-400/80" />
                          ))}
                        </div>
                      </div>
                      <blockquote className="text-white/75 text-sm sm:text-base leading-[1.65] font-light tracking-[0.01em] flex-grow mb-5">
                        {t.quote}
                      </blockquote>
                      <div className="flex items-center gap-3 border-t border-white/[0.07] pt-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/25 to-purple-400/25 flex items-center justify-center text-xs text-white/70 font-medium flex-shrink-0">
                          {t.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm text-white/75 font-light">{t.author}</div>
                          <div className="text-xs text-white/38 font-light">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── bg-black with corner glows ─────────────────── */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-0 top-0"
            style={{ width: '300px', height: '400px', background: 'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(6, 182, 212, 0.22), rgba(6, 182, 212, 0.08) 40%, transparent 70%)', borderRadius: '0 0 100% 0', filter: 'blur(40px)', transform: 'rotate(-5deg)', transformOrigin: 'top left' }}
          />
          <div
            className="absolute left-0 top-0"
            style={{ width: '200px', height: '300px', background: 'radial-gradient(ellipse 70% 50% at 0% 0%, rgba(6, 182, 212, 0.15), transparent 60%)', borderRadius: '0 0 100% 0', filter: 'blur(20px)', transform: 'rotate(-3deg)', transformOrigin: 'top left' }}
          />
          <div
            className="absolute right-0 top-0"
            style={{ width: '300px', height: '400px', background: 'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(168, 85, 247, 0.22), rgba(168, 85, 247, 0.08) 40%, transparent 70%)', borderRadius: '0 0 0 100%', filter: 'blur(40px)', transform: 'rotate(5deg)', transformOrigin: 'top right' }}
          />
          <div
            className="absolute right-0 top-0"
            style={{ width: '200px', height: '300px', background: 'radial-gradient(ellipse 70% 50% at 100% 0%, rgba(168, 85, 247, 0.15), transparent 60%)', borderRadius: '0 0 0 100%', filter: 'blur(20px)', transform: 'rotate(3deg)', transformOrigin: 'top right' }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-14">
            <TextReveal
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[0.95] tracking-[-0.04em]"
              staggerMs={120}
              lines={[
                <span key="l1">
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Frequently asked </span>
                  <span className="font-light">questions.</span>
                </span>,
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:items-start">
            <Accordion type="single" collapsible className="w-full space-y-3 flex flex-col">
              {FAQ_LEFT.map((faq) => (
                <AccordionItem
                  key={faq.value}
                  value={faq.value}
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

            <Accordion type="single" collapsible className="w-full space-y-3 flex flex-col">
              {FAQ_RIGHT.map((faq) => (
                <AccordionItem
                  key={faq.value}
                  value={faq.value}
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
        </div>
      </section>

      {/* ── CTA ── bg-black with twinkle stars ─────────────────── */}
      <section className="py-20 sm:py-28 md:py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/80 to-purple-900/40" />
          <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-twinkle" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-twinkle delay-1000" />
          <div className="absolute top-60 left-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle delay-2000" />
          <div className="absolute top-32 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-twinkle delay-500" />
          <div className="absolute top-80 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle delay-3000" />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl delay-1000" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/20">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/25 via-cyan-400/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/25 via-purple-400/20 to-transparent rounded-full blur-3xl delay-1000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl delay-500" />
            </div>
            <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 text-center">
              <TextReveal
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]"
                staggerMs={140}
                lines={[
                  <span key="l1" className="block font-light opacity-90">Ready to Transform Your</span>,
                  <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Business?</span>,
                ]}
              />
              <FadeIn delay={300}>
                <p className="text-base sm:text-lg md:text-xl text-white/70 mb-10 sm:mb-12 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                  Your digital transformation starts here. Let&apos;s create something that not only looks incredible but drives real results.
                </p>
              </FadeIn>
              <FadeIn delay={440}>
                <div>
                  <Link href="/contact" className="relative inline-block group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 rounded-full blur opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                    <div className="relative bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 hover:from-cyan-400 hover:via-purple-400 hover:to-cyan-400 text-white rounded-full px-10 sm:px-12 md:px-14 py-4 sm:py-5 text-lg sm:text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 animate-jiggle">
                      Start Your Project
                    </div>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Content Updated Date */}
      <div className="h-0 overflow-hidden">
        <p className="text-transparent text-sm">Content updated: January 2026</p>
      </div>

      <StructuredData type="review" reviews={TESTIMONIALS} />
    </div>
  );
};

export default memo(Services);
