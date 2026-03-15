'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import StructuredData from '@/components/StructuredData';

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

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-[-0.02em] leading-tight mb-5">
            {project.name}
          </h3>

          <p className="text-white/55 text-base sm:text-lg leading-relaxed font-light mb-8">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium tracking-wide rounded-full border border-white/10 text-white/50 bg-white/5"
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
      className="group relative flex flex-col bg-slate-900/60 border border-white/8 hover:border-cyan-400/40 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10"
    >
      <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 pointer-events-none" />
        <SafeImage
          src={project.image}
          alt={project.imageAlt}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 project-image"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 620px"
          quality={80}
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white font-medium text-lg mb-2 group-hover:text-cyan-300 transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed font-light flex-1 mb-5">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs rounded-full border border-white/10 text-white/40 bg-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-cyan-400 transition-colors duration-300 flex-shrink-0 ml-3" />
        </div>
      </div>
    </a>
  );
}

const Projects = () => {
  return (
    <>
      <style>{`
        .proj-row .proj-img,
        .proj-row .proj-text {
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .proj-row .proj-from-left  { transform: translateX(-32px); }
        .proj-row .proj-from-right { transform: translateX(32px); }

        .proj-visible .proj-img  { opacity: 1; transform: none; }
        .proj-visible .proj-text {
          opacity: 1;
          transform: none;
          transition-delay: 0.12s;
        }
      `}</style>

      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background — matches site-wide space theme */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent" />
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-300/20 via-purple-300/20 to-cyan-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-300/20 via-cyan-300/20 to-purple-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-900/25 to-cyan-300/15 rounded-full blur-3xl" />
          <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-300/15 via-purple-300/15 to-cyan-300/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Hero */}
          <section className="pt-28 sm:pt-32 md:pt-36 lg:pt-44 pb-12 sm:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-6">
                  Portfolio
                </p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-white leading-[0.92] tracking-[-0.04em] mb-8">
                  Web Design{' '}
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-light">
                    Projects
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-white/50 font-light leading-relaxed max-w-xl">
                  Custom websites built for businesses across Toronto and the GTA. Each one designed from scratch, never from a template.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Projects — full-width scroll rows */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <h2 className="sr-only">Featured Projects</h2>
            {featured.map((project, i) => (
              <FeaturedRow key={project.number} project={project} index={i} />
            ))}
          </section>

          {/* More Projects — tile grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
            <div className="border-t border-white/8 pt-16 md:pt-20">
              <div className="flex items-center gap-4 mb-10">
                <p className="text-xs font-mono text-white/30 tracking-[0.2em] uppercase">
                  More Projects
                </p>
                <div className="h-px flex-1 bg-white/6" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {more.map((project) => (
                  <TileCard key={project.name} project={project} />
                ))}
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
