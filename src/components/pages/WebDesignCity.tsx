import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin, Check } from 'lucide-react';
import type { CityContent, SectionKey } from '@/lib/city-content';
import { allProjects, DEFAULT_SECTION_ORDER } from '@/lib/city-content';
import { SafeImage } from '@/components/ui/safe-image';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import MiniContactForm from '@/components/forms/MiniContactForm';

// Three background treatments cycled by section position (not identity), so
// however a city's sectionOrder is arranged, no two adjacent sections ever
// share the same background.
type BgVariant = 0 | 1 | 2;

const SectionBg = ({ variant }: { variant: BgVariant }) => {
  if (variant === 0) {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/30 to-black" />
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
        <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
        <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
        <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl"></div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/40 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tl from-black via-cyan-900/30 to-black" />
    </div>
  );
};

const SECTION_BG_CLASS: Record<BgVariant, string> = {
  0: 'bg-black',
  1: 'bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900',
  2: 'bg-black',
};

const SERVICE_HIGHLIGHTS = [
  'Custom, responsive design built for mobile-first traffic',
  'SEO optimization and clean structured data from day one',
  'Fast performance — sub-2.5-second load targets',
  'SSL security, hosting setup, and post-launch support',
];

const INDUSTRY_IMAGES: Record<string, { src: string; alt: string }> = {
  '/lawyers': { src: '/images/lawyer-professional-meeting.png', alt: 'Lawyer meeting with a client in a professional office setting' },
  '/accountants': { src: '/images/accountant-computer-office.png', alt: 'Accountant working at a desk with financial documents and a computer' },
  '/renovations': { src: '/images/renovation-kitchen-modern.jpg', alt: 'Modern renovated kitchen showcasing finished contractor work' },
  '/clinics': { src: '/images/clinic-practitioner.png', alt: 'Physiotherapy practitioner working with a patient in a treatment room' },
};

interface WebDesignCityProps {
  content: CityContent;
}

// Server-rendered, content-rich city landing page. No 'use client' — the copy,
// headings, and FAQs ship in the initial HTML so both Google and AI crawlers
// (which often don't run JS) can read them. TextReveal/FadeIn/MiniContactForm
// are themselves client components, but composing them here is safe — React
// server-renders their initial output too, so the text still lands in the HTML.
const WebDesignCity = ({ content }: WebDesignCityProps) => {
  const { city, region, heroIntro, intro, economy, neighborhoods, whyPoints, industries, faqs, heroImage, heroImageAlt, localSeoBody, geoBody, smallBusinessNote, focusAreas, featuredProjectSlugs, sectionOrder } =
    content;

  const orderedSections = sectionOrder ?? DEFAULT_SECTION_ORDER;

  const featuredProjects = featuredProjectSlugs
    ? featuredProjectSlugs.map((slug) => allProjects.find((p) => p.slug === slug)).filter((p): p is (typeof allProjects)[number] => Boolean(p))
    : allProjects.slice(0, 3);

  const sectionContent: Record<SectionKey, React.ReactNode> = {
    advantage: (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-6">The {city} Advantage</p>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 lg:items-start">
          {/* Left — statement + why-points as compact annotations */}
          <div className="lg:col-span-2">
            <p className="text-lg sm:text-xl font-light text-white leading-snug tracking-tight mb-8">
              {intro}
            </p>
            <div className="space-y-4">
              {whyPoints.map((point) => (
                <div key={point.title} className="pl-4 border-l-2 border-cyan-500/40">
                  <p className="text-white font-medium text-sm mb-1">{point.title}</p>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{point.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — economy, focus areas, and neighbourhoods, in a glass panel */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 flex flex-col gap-6">
              <p className="text-white/60 leading-relaxed font-light">{economy}</p>

              {focusAreas && focusAreas.length > 0 && (
                <div className="pt-6 border-t border-white/8">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300/60 mb-4">
                    {city}&apos;s Core Industries
                  </h3>
                  <ul className="flex flex-wrap gap-2.5">
                    {focusAreas.map((area) => (
                      <li key={area} className="rounded-full border border-cyan-500/25 bg-cyan-500/[0.06] px-3.5 py-1.5 text-sm text-cyan-300/80 font-light">
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-6 border-t border-white/8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300/60 mb-4">
                  Neighbourhoods we serve in {city}
                </h3>
                <ul className="flex flex-wrap gap-2.5">
                  {neighborhoods.map((n) => (
                    <li key={n} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white/70 font-light">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    whatYouGet: (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em]">
            <span className="font-light opacity-90">What Every</span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">{city}</span>{' '}
            <span className="font-light opacity-90">Website Includes</span>
          </h2>
        </div>

        <div className={`grid grid-cols-1 ${(localSeoBody || geoBody) ? 'md:grid-cols-2' : ''} gap-5 sm:gap-6`}>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-sm p-6 sm:p-8">
            <ul className="space-y-4 mb-6">
              {SERVICE_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm sm:text-base font-light">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/50 text-sm font-light">
              Explore our full{' '}
              <Link href="/services/web-design" className="text-cyan-300 hover:underline">web design service</Link>{' '}
              or see transparent{' '}
              <Link href="/pricing" className="text-cyan-300 hover:underline">pricing</Link>.
            </p>
          </div>

          {(localSeoBody || geoBody) && (
            <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/60 backdrop-blur-sm p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300/70 mb-4">Local SEO &amp; AI Search</p>
              {localSeoBody && (
                <p className="text-white/60 leading-relaxed text-sm sm:text-base mb-3 font-light">{localSeoBody}</p>
              )}
              {geoBody && (
                <p className="text-white/60 leading-relaxed text-sm sm:text-base mb-6 font-light">{geoBody}</p>
              )}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services/seo"
                  className="inline-flex items-center text-sm font-medium text-cyan-300/80 hover:text-cyan-300 transition-colors group"
                >
                  Local SEO <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services/geo"
                  className="inline-flex items-center text-sm font-medium text-cyan-300/80 hover:text-cyan-300 transition-colors group"
                >
                  GEO &amp; AI search <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    ),

    recentWork: (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-4">
            <span className="font-light opacity-90">Recent</span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Work</span>
          </h2>
          <p className="text-white/55 text-base sm:text-lg font-light max-w-2xl mx-auto">
            A few recent builds — see what we&apos;ve shipped for businesses like yours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {featuredProjects.map((project) => (
            <a
              key={project.slug}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} — view the live site (opens in a new tab)`}
              className="group relative flex flex-col bg-slate-900/80 rounded-xl overflow-hidden border border-slate-800/50 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full h-44 sm:h-48 overflow-hidden">
                <SafeImage
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-cyan-300/60 text-xs font-medium uppercase tracking-wide mb-1.5">{project.tag}</span>
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-cyan-300 transition-colors duration-300">{project.name}</h3>
                <p className="text-white/55 text-sm font-light leading-relaxed flex-grow">{project.description}</p>
                <span className="inline-flex items-center text-cyan-300 text-sm font-medium mt-4">
                  View live site <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm sm:text-base font-medium text-white/60 hover:text-white transition-colors duration-300 group"
          >
            See all projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    ),

    industries: (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-4">
            <span className="font-light opacity-90">Industries We Build For in</span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">{city}</span>
          </h2>
          {smallBusinessNote && (
            <p className="text-white/50 text-sm sm:text-base font-light max-w-2xl mx-auto mt-4">{smallBusinessNote}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {industries.map((industry) => {
            const img = INDUSTRY_IMAGES[industry.href];
            return (
              <Link
                key={industry.href}
                href={industry.href}
                className="group relative flex items-center gap-5 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/40 bg-slate-950/60 transition-all duration-300"
              >
                {img && (
                  <div className="relative w-24 sm:w-28 h-24 sm:h-28 flex-shrink-0 overflow-hidden">
                    <SafeImage
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between flex-1 pr-5 py-4">
                  <span className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300">
                    {industry.label} in {city}
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform flex-shrink-0" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    ),

    faq: (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-8 sm:mb-12">
          <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">{city}</span>{' '}
          <span className="font-light opacity-90">web design — FAQ</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group overflow-hidden border border-white/[0.09] rounded-xl bg-slate-900/50 hover:border-cyan-500/20 open:border-cyan-500/35 open:bg-slate-900/80 transition-all duration-300"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-white/70 group-hover:text-white group-open:text-white font-light text-sm sm:text-base list-none transition-colors duration-300">
                {faq.question}
                <ArrowRight
                  className="h-4 w-4 text-white/30 group-hover:text-cyan-400 shrink-0 transition-all duration-300 group-open:rotate-90"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 sm:px-6 pb-4 sm:pb-5 text-white/55 text-sm leading-[1.75] font-light">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Hero — photo backdrop (when available) + contact form side by side */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {heroImage ? (
            <>
              <SafeImage src={heroImage} alt={heroImageAlt ?? ''} className="w-full h-full object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-transparent to-purple-900/30" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/50 to-black" />
              <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/40 to-black" />
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/40">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/locations" className="hover:text-cyan-300 transition-colors">Locations</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70">{city}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — heading + copy */}
            <div>
              <p className="inline-flex items-center gap-2 text-cyan-300 text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                {city}, {region}
              </p>
              <TextReveal
                as="h1"
                className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1.05] tracking-[-0.04em] mb-6"
                staggerMs={120}
                lines={[
                  <span key="l1" className="block font-light opacity-90">Web Design in</span>,
                  <span key="l2" className="block mt-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">{city}</span>,
                ]}
              />
              <FadeIn delay={240}>
                <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-6 font-light max-w-xl">
                  {heroIntro}
                </p>
              </FadeIn>

              <FadeIn delay={320}>
                <div className="flex flex-wrap gap-3 mb-8">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white border border-white/15 hover:border-cyan-400/40 rounded-full px-4 py-2 transition-colors"
                  >
                    See Pricing
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white border border-white/15 hover:border-cyan-400/40 rounded-full px-4 py-2 transition-colors"
                  >
                    All Services
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={400}>
                <div className="flex flex-wrap gap-2">
                  {neighborhoods.slice(0, 6).map((n) => (
                    <span key={n} className="text-xs text-white/50 bg-white/[0.04] border border-white/8 rounded-full px-3 py-1.5">
                      {n}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right — quick quote form */}
            <FadeIn delay={280}>
              <MiniContactForm
                id={`city-${content.slug}`}
                projectType={`City page — ${city}`}
                heading="Get a Free Quote"
                subheading={`Tell us about your ${city} business and we'll reply with a fixed quote within 24–48 hours.`}
                messagePlaceholder={`What does your ${city} business do, and what do you need from your website?`}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {orderedSections.map((key, i) => {
        const variant = (i % 3) as BgVariant;
        return (
          <section key={key} className={`relative overflow-hidden py-16 sm:py-20 md:py-24 ${SECTION_BG_CLASS[variant]}`}>
            <SectionBg variant={variant} />
            {sectionContent[key]}
          </section>
        );
      })}

      {/* Final CTA */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-black">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
          <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
          <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <TextReveal
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extralight mb-6 text-white leading-[1.1] tracking-[-0.04em]"
            staggerMs={130}
            lines={[
              <span key="l1" className="block font-light opacity-90">Ready to Grow Your</span>,
              <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">{city} Business?</span>,
            ]}
          />
          <FadeIn delay={260}>
            <p className="text-base sm:text-lg text-white/60 mb-8 sm:mb-10 max-w-2xl mx-auto leading-[1.7] font-light">
              Book a free consultation and we&apos;ll show you exactly how a custom website can win you more customers in {city} and across the GTA.
            </p>
          </FadeIn>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Link
                href="/contact"
                className="w-full relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 group/button"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                <span className="flex items-center justify-center relative z-10 group-hover/button:text-white whitespace-nowrap">
                  Start Your Project
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
              </Link>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-full border border-white/20 hover:border-cyan-300 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base transition-colors"
            >
              See all GTA locations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDesignCity;
