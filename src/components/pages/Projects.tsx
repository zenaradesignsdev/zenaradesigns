'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import StructuredData from '@/components/StructuredData';
import { TextReveal } from '@/components/ui/text-reveal';
import { FadeIn } from '@/components/ui/fade-in';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FeaturedProject {
  number: string;
  name: string;
  tags: string[];
  description: string;
  url: string;
  image: string;
  imageAlt: string;
  flip: boolean;
}

interface TileProject {
  name: string;
  tags: string[];
  description: string;
  url: string;
  image: string;
  imageAlt: string;
}

const featured: FeaturedProject[] = [
  {
    number: '01',
    name: 'Luxury Renovation',
    tags: ['Web Design', 'Toronto'],
    description:
      'Luxury renovation and construction services website designed for Toronto businesses. Modern, responsive design with seamless user experience. Showcasing premium craftsmanship and attention to detail.',
    url: 'https://projectone.zenaradesigns.com',
    image: '/images/reno-project.png',
    imageAlt: 'Luxury Renovation Website — professional renovation and construction services',
    flip: false,
  },
  {
    number: '02',
    name: 'Nova Motion Physio',
    tags: ['Web Design', 'Wellness'],
    description:
      'Professional physiotherapy and wellness clinic website designed to showcase services and enable online appointment booking. Modern, clean design that builds trust and converts visitors into clients.',
    url: 'https://projectthree.zenaradesigns.com',
    image: '/images/nova-motion-physio.png',
    imageAlt: 'Nova Motion Physio Website — physiotherapy and wellness clinic platform',
    flip: true,
  },
  {
    number: '03',
    name: 'Accounting Firm',
    tags: ['Web Design', 'Accounting'],
    description:
      'Professional accounting firm website designed to showcase tax preparation, bookkeeping, and advisory services. Secure platform with client portal integration and modern design that builds credibility.',
    url: 'https://projectfour.zenaradesigns.com',
    image: '/images/accounting-firm-project.png',
    imageAlt: 'Accounting Firm Website — professional accounting and tax services platform',
    flip: false,
  },
  {
    number: '04',
    name: 'Pickering Law Firm',
    tags: ['Web Design', 'Legal'],
    description:
      'Professional law firm website designed to showcase legal expertise and build client trust. Modern, authoritative design with clear navigation and comprehensive service information.',
    url: 'https://projecttwo.zenaradesigns.com/',
    image: '/images/project2.png',
    imageAlt: 'Pickering Law Firm Website — professional legal services website design',
    flip: true,
  },
];

const more: TileProject[] = [
  {
    name: 'AshCam Cutting Solutions',
    tags: ['E-commerce', 'Construction'],
    description:
      'Construction company specializing in cutting blades and equipment. Modern e-commerce platform designed for industrial customers.',
    url: 'https://ashcamcuttingsolution.ca/',
    image: '/images/ashcam-site.png',
    imageAlt: 'AshCam Cutting Solutions Website — construction blades and equipment platform',
  },
  {
    name: 'JB Loans',
    tags: ['Web Design', 'Mortgage Broker'],
    description:
      'Professional mortgage broker website helping clients find the best loan solutions with a seamless application process.',
    url: 'https://jbloans.ca/',
    image: '/images/jbloans.png',
    imageAlt: 'JB Loans Mortgage Broker Website — professional mortgage services platform',
  },
];

function useFadeIn(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('proj-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

interface FeaturedRowProps {
  project: FeaturedProject;
  index: number;
}

function FeaturedRow({ project, index }: FeaturedRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  useFadeIn(rowRef);

  return (
    <div
      ref={rowRef}
      className="proj-row group relative py-16 md:py-20 lg:py-24 border-b border-white/5 last:border-0"
    >
      {/* Large decorative number */}
      <span
        className="pointer-events-none absolute top-8 select-none text-[10rem] md:text-[14rem] lg:text-[18rem] font-black leading-none text-white/[0.025] tracking-[-0.04em]"
        style={{ right: project.flip ? 'auto' : '0', left: project.flip ? '0' : 'auto' }}
        aria-hidden="true"
      >
        {project.number}
      </span>

      <div
        className={`relative z-10 flex flex-col ${project.flip ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
      >
        {/* Image */}
        <div
          ref={imgRef}
          className={`proj-img w-full lg:w-[58%] flex-shrink-0 ${project.flip ? 'proj-from-right' : 'proj-from-left'}`}
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative overflow-hidden rounded-2xl border border-white/10 group-hover:border-cyan-400/40 transition-colors duration-500"
            tabIndex={-1}
            aria-hidden="true"
          >
            {/* Shine sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 pointer-events-none" />
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-xl pointer-events-none" />
            <div className="aspect-[16/10] relative bg-slate-900">
              <SafeImage
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-full object-contain project-image"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 58vw, 740px"
                quality={85}
              />
            </div>
          </a>
        </div>

        {/* Text */}
        <div
          ref={textRef}
          className={`proj-text w-full lg:w-[42%] flex flex-col ${project.flip ? 'proj-from-left lg:pl-0 lg:pr-4' : 'proj-from-right lg:pr-0 lg:pl-4'}`}
        >
          {/* Number + divider */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase">
              {project.number}
            </span>
            <div className="h-px w-8 bg-cyan-400/30" />
            <span className="text-xs font-mono text-white/30 tracking-widest uppercase">
              Project
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-[-0.02em] leading-tight mb-5 transition-colors duration-500 group-hover:text-white/90">
            {project.name}
          </h3>

          <p className="text-white/55 text-base sm:text-lg leading-relaxed font-light mb-8">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag, ti) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs font-medium tracking-wide rounded-full border transition-colors duration-300 ${
                  ti % 2 === 0
                    ? 'border-cyan-500/30 text-cyan-300/70 bg-cyan-500/8 group-hover:border-cyan-400/50 group-hover:text-cyan-300'
                    : 'border-purple-500/30 text-purple-300/70 bg-purple-500/8 group-hover:border-purple-400/50 group-hover:text-purple-300'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 self-start group/btn"
          >
            <span className="relative flex items-center justify-center w-12 h-12 rounded-full border border-cyan-400/40 text-cyan-400 group-hover/btn:bg-cyan-400/10 group-hover/btn:border-cyan-400/70 transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </span>
            <span className="text-sm font-medium text-white/70 group-hover/btn:text-cyan-300 transition-colors duration-300 tracking-wide">
              View Live Site
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

interface TileCardProps {
  project: TileProject;
}

function TileCard({ project }: TileCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/15"
    >
      {/* Gradient border via inset pseudo-layer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-white/5 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      <div className="absolute inset-[1px] rounded-[calc(1rem-1px)] bg-slate-950 z-[1]" />

      <div className="relative z-[2] flex flex-col flex-1 border border-white/8 group-hover:border-white/0 rounded-2xl overflow-hidden transition-colors duration-500">
        <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
          {/* Shine sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 pointer-events-none" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950/60 to-transparent z-10 pointer-events-none" />
          <SafeImage
            src={project.image}
            alt={project.imageAlt}
            className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700 project-image"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 620px"
            quality={80}
          />
        </div>
        <div className="p-6 sm:p-7 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-white font-medium text-lg group-hover:text-cyan-300 transition-colors duration-300 leading-snug">
              {project.name}
            </h3>
            <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/30 group-hover:border-cyan-400/50 group-hover:text-cyan-400 group-hover:bg-cyan-400/8 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed font-light flex-1 mb-5">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, ti) => (
              <span
                key={tag}
                className={`px-2.5 py-0.5 text-xs rounded-full border transition-colors duration-300 ${
                  ti % 2 === 0
                    ? 'border-cyan-500/20 text-cyan-300/55 bg-cyan-500/6 group-hover:border-cyan-400/40 group-hover:text-cyan-300/75'
                    : 'border-purple-500/20 text-purple-300/55 bg-purple-500/6 group-hover:border-purple-400/40 group-hover:text-purple-300/75'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

const Projects = () => {

  return (
    <>
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#04111f' }}>
        {/* Background — asymmetric radial blooms: cyan top-right / purple bottom-left */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cyan burst — top-right corner light source */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 65% 55% at 95% 0%, rgba(6,182,212,0.38) 0%, transparent 60%)' }} />
          {/* Purple bloom — bottom-left */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 50% at 2% 100%, rgba(168,85,247,0.30) 0%, transparent 55%)' }} />
          {/* Subtle centre spine — barely-visible diagonal light leak */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, transparent 35%, rgba(6,182,212,0.04) 50%, rgba(168,85,247,0.04) 55%, transparent 70%)' }} />
          {/* Edge vignette so content stays readable */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 110% 80% at 50% 40%, transparent 40%, rgba(4,17,31,0.7) 100%)' }} />
        </div>

        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-star" style={{ top: '3%', left: '5%' }} />
          <div className="bg-star" style={{ top: '7%', left: '18%' }} />
          <div className="bg-star" style={{ top: '5%', left: '32%' }} />
          <div className="bg-star" style={{ top: '10%', left: '48%' }} />
          <div className="bg-star" style={{ top: '4%', left: '63%' }} />
          <div className="bg-star" style={{ top: '9%', left: '77%' }} />
          <div className="bg-star" style={{ top: '6%', left: '90%' }} />
          <div className="bg-star" style={{ top: '18%', left: '8%' }} />
          <div className="bg-star" style={{ top: '22%', left: '24%' }} />
          <div className="bg-star" style={{ top: '16%', left: '41%' }} />
          <div className="bg-star" style={{ top: '25%', left: '57%' }} />
          <div className="bg-star" style={{ top: '19%', left: '73%' }} />
          <div className="bg-star" style={{ top: '23%', left: '88%' }} />
          <div className="bg-star" style={{ top: '35%', left: '3%' }} />
          <div className="bg-star" style={{ top: '38%', left: '16%' }} />
          <div className="bg-star" style={{ top: '42%', left: '30%' }} />
          <div className="bg-star" style={{ top: '36%', left: '52%' }} />
          <div className="bg-star" style={{ top: '44%', left: '68%' }} />
          <div className="bg-star" style={{ top: '39%', left: '84%' }} />
          <div className="bg-star" style={{ top: '55%', left: '10%' }} />
          <div className="bg-star" style={{ top: '58%', left: '27%' }} />
          <div className="bg-star" style={{ top: '62%', left: '45%' }} />
          <div className="bg-star" style={{ top: '56%', left: '61%' }} />
          <div className="bg-star" style={{ top: '60%', left: '79%' }} />
          <div className="bg-star" style={{ top: '65%', left: '93%' }} />
          <div className="bg-star" style={{ top: '72%', left: '6%' }} />
          <div className="bg-star" style={{ top: '76%', left: '22%' }} />
          <div className="bg-star" style={{ top: '79%', left: '38%' }} />
          <div className="bg-star" style={{ top: '74%', left: '55%' }} />
          <div className="bg-star" style={{ top: '82%', left: '71%' }} />
          <div className="bg-star" style={{ top: '77%', left: '87%' }} />
          <div className="bg-star" style={{ top: '88%', left: '14%' }} />
          <div className="bg-star" style={{ top: '91%', left: '33%' }} />
          <div className="bg-star" style={{ top: '85%', left: '50%' }} />
          <div className="bg-star" style={{ top: '93%', left: '67%' }} />
          <div className="bg-star" style={{ top: '89%', left: '82%' }} />
          {/* Nebula orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-300/15 via-purple-300/12 to-cyan-300/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-300/15 via-cyan-300/12 to-purple-300/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-900/20 to-cyan-300/10 rounded-full blur-3xl" />
          <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-300/10 via-purple-300/10 to-cyan-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Hero */}
          <section className="pt-28 sm:pt-32 md:pt-36 lg:pt-44 pb-12 sm:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <FadeIn>
                  <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-6">
                    Portfolio
                  </p>
                </FadeIn>
                <TextReveal
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-white leading-[0.92] tracking-[-0.04em] mb-8"
                  staggerMs={130}
                  lines={[
                    <span key="l1" className="block font-light">Web Design</span>,
                    <span key="l2" className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-light">Projects</span>,
                  ]}
                />
                <FadeIn delay={260}>
                  <p className="text-base sm:text-lg text-white/50 font-light leading-relaxed max-w-xl">
                    Custom websites built for businesses across Toronto and the GTA. Each one designed from scratch, never from a template.
                  </p>
                </FadeIn>

              </div>
            </div>
          </section>

          {/* Featured Projects — full-width scroll rows */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <div className="flex items-center gap-4 mb-4 pt-4 border-t border-white/6">
              <FadeIn>
                <p className="text-xs font-mono text-white/30 tracking-[0.2em] uppercase">
                  Featured Work
                </p>
              </FadeIn>
            </div>
            <h2 className="sr-only">Featured Projects</h2>
            {featured.map((project, i) => (
              <FeaturedRow key={project.number} project={project} index={i} />
            ))}
          </section>

          {/* Our Standard — design craft editorial strip */}
          <section className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900">
            {/* Stars */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="bg-star" style={{ top: '8%', left: '4%' }} />
              <div className="bg-star" style={{ top: '15%', left: '17%' }} />
              <div className="bg-star" style={{ top: '6%', left: '33%' }} />
              <div className="bg-star" style={{ top: '12%', left: '51%' }} />
              <div className="bg-star" style={{ top: '9%', left: '68%' }} />
              <div className="bg-star" style={{ top: '18%', left: '82%' }} />
              <div className="bg-star" style={{ top: '5%', left: '93%' }} />
              <div className="bg-star" style={{ top: '35%', left: '7%' }} />
              <div className="bg-star" style={{ top: '42%', left: '28%' }} />
              <div className="bg-star" style={{ top: '55%', left: '46%' }} />
              <div className="bg-star" style={{ top: '38%', left: '72%' }} />
              <div className="bg-star" style={{ top: '62%', left: '89%' }} />
              {/* Central nebula */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
                {/* Left — headline */}
                <div>
                  <FadeIn>
                    <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-6">
                      Our Standard
                    </p>
                  </FadeIn>
                  <TextReveal
                    className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1] tracking-[-0.04em]"
                    staggerMs={120}
                    lines={[
                      <span key="l1" className="block font-light">Craft over</span>,
                      <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">templates.</span>,
                    ]}
                  />
                  <FadeIn delay={300}>
                    <p className="text-white/50 text-base sm:text-lg leading-relaxed font-light mt-7 max-w-md">
                      Every project is designed and built from the ground up. No page builders, no themes — just deliberate, strategic design that makes your business stand apart.
                    </p>
                  </FadeIn>
                </div>

                {/* Right — 3 principles */}
                <div className="flex flex-col divide-y divide-white/8">
                  {[
                    {
                      label: 'Custom by Default',
                      body: 'Every pixel designed specifically for your brand. We never start from a template or theme.',
                    },
                    {
                      label: 'Performance First',
                      body: 'Fast load times, clean code, and optimized Core Web Vitals on every project we deliver.',
                    },
                    {
                      label: 'Built to Convert',
                      body: 'Design decisions grounded in how visitors actually behave — and what makes them take action.',
                    },
                  ].map((item, i) => (
                    <FadeIn key={item.label} delay={i * 130}>
                      <div className="py-7 group cursor-default">
                        <div className="flex items-start gap-5">
                          <span className="text-xs font-mono text-cyan-400/40 tracking-widest mt-1 flex-shrink-0 w-5">
                            0{i + 1}
                          </span>
                          <div>
                            <p className="text-white font-medium text-base mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                              {item.label}
                            </p>
                            <p className="text-white/45 text-sm leading-relaxed font-light">
                              {item.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* More Projects — tile grid */}
          <section className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-black">
            {/* Blooms */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-purple-500/15 to-transparent rounded-full blur-3xl" />
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/15 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <FadeIn>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-5 font-medium">
                  More Work
                </p>
              </FadeIn>
              <TextReveal
                className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1] tracking-[-0.04em] mb-12"
                staggerMs={120}
                lines={[
                  <span key="l1" className="block font-light">More Projects</span>,
                  <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">We&apos;re Proud Of.</span>,
                ]}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {more.map((project) => (
                  <TileCard key={project.name} project={project} />
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 sm:py-24 relative overflow-hidden bg-black">
            {/* Stars */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="bg-star" style={{ top: '10%', left: '6%' }} />
              <div className="bg-star" style={{ top: '20%', left: '22%' }} />
              <div className="bg-star" style={{ top: '8%', left: '40%' }} />
              <div className="bg-star" style={{ top: '15%', left: '58%' }} />
              <div className="bg-star" style={{ top: '25%', left: '75%' }} />
              <div className="bg-star" style={{ top: '12%', left: '90%' }} />
              <div className="bg-star" style={{ top: '60%', left: '12%' }} />
              <div className="bg-star" style={{ top: '70%', left: '35%' }} />
              <div className="bg-star" style={{ top: '55%', left: '60%' }} />
              <div className="bg-star" style={{ top: '75%', left: '80%' }} />
              {/* Nebula blobs */}
              <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="relative rounded-[2rem] overflow-hidden border border-white/20">
                {/* Glass backdrop */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                {/* Corner glows */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-500/25 via-cyan-400/15 to-transparent rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/25 via-purple-400/15 to-transparent rounded-full blur-3xl" />
                </div>
                {/* Top + bottom accent lines */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                <div className="relative z-10 px-6 sm:px-10 md:px-16 py-12 sm:py-16 text-center">
                  <TextReveal
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 leading-[1.05] tracking-[-0.04em]"
                    staggerMs={130}
                    lines={[
                      <span key="l1" className="block font-light opacity-90">Ready to Be Our</span>,
                      <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Next Project?</span>,
                    ]}
                  />
                  <FadeIn delay={260}>
                    <p className="text-white/55 text-base sm:text-lg mb-8 sm:mb-10 leading-[1.7] font-light max-w-lg mx-auto">
                      Let&apos;s build something you&apos;ll be proud to show off.
                    </p>
                  </FadeIn>
                  <FadeIn delay={380}>
                    <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                      <Button
                        asChild
                        className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-8 py-4 sm:px-10 sm:py-5 text-base font-semibold group"
                      >
                        <Link href="/contact">
                          <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                          <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                            Start Your Project
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

        <StructuredData
          type="breadcrumb"
          breadcrumbs={[
            { name: 'Home', url: '/' },
            { name: 'Projects', url: '/projects' },
          ]}
        />
      </div>
    </>
  );
};

export default Projects;
