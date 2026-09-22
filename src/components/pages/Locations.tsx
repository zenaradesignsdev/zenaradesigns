import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  MapPin,
  ArrowRight,
  CheckCircle,
  Scale,
  Calculator,
  Hammer,
  Heart
} from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';

// Markham, Stouffville and Scarborough lead; the remaining markets follow.
// Service lists describe what we actually build for each market rather than
// repeating the city name — keyword-stuffed lists read as spam to both
// readers and Google.
const locations = [
    {
      city: "Markham",
      region: "York Region",
      homeBase: true,
      description: "Our home base. A major technology corridor along Highway 7 with a large concentration of professional services, and the city we know best on the ground.",
      services: ["Corporate and professional websites", "E-commerce development", "Multilingual landing pages", "Brand identity and print"],
      neighborhoods: ["Downtown Markham", "Unionville", "Thornhill", "Milliken", "Markham Village", "Cornell"]
    },
    {
      city: "Stouffville",
      region: "York Region",
      description: "A small York Region town twenty minutes north-east of our Markham base, where most trades, clinics, and independent practices are still running template sites or none at all. Close enough that we can meet in person.",
      services: ["Contractor and trades websites", "Clinic sites with online booking", "Small business websites", "Local SEO for Stouffville searches"],
      neighborhoods: ["Main Street Stouffville", "Ballantrae", "Musselman's Lake", "Gormley", "Bloomington", "Vandorf"]
    },
    {
      city: "Scarborough",
      region: "City of Toronto",
      description: "One of the most diverse small-business communities in the country, directly south of our Markham base — dense with independent clinics, practices, and service businesses.",
      services: ["Small business websites", "Clinic and wellness sites", "Multilingual landing pages", "Local SEO"],
      neighborhoods: ["Scarborough Town Centre", "Agincourt", "Malvern", "Birch Cliff", "Guildwood", "West Hill"]
    },
    {
      city: "Toronto",
      region: "City of Toronto",
      description: "We take Toronto work where the fit is right — typically professional practices and service businesses that want a custom build rather than a template, without agency overhead.",
      services: ["Custom website design", "E-commerce development", "Brand identity and print", "Hosting and maintenance"],
      neighborhoods: ["Downtown Toronto", "Financial District", "Yorkville", "Leslieville", "The Beaches", "Distillery District"]
    },
    {
      city: "Mississauga",
      region: "Peel Region",
      description: "A deep base of accounting practices, law firms, and corporate services around Square One and the airport corridor, alongside independent businesses in Port Credit and Streetsville.",
      services: ["Accounting and law firm websites", "Client portals and secure intake", "E-commerce development", "Local SEO and content"],
      neighborhoods: ["City Centre", "Port Credit", "Streetsville", "Cooksville", "Meadowvale", "Erin Mills", "Clarkson"]
    },
    {
      city: "Richmond Hill",
      region: "York Region",
      description: "Professional practices line the Yonge Street corridor, serving large Chinese-Canadian and Persian-Canadian business communities where a credible, multilingual-ready site matters more than it does elsewhere.",
      services: ["Professional practice websites", "Multilingual landing pages", "Clinic and wellness sites", "Brand identity and print"],
      neighborhoods: ["Downtown Richmond Hill", "Oak Ridges", "Bayview Hill", "Mill Pond", "Jefferson", "Observatory"]
    },
    {
      city: "Vaughan",
      region: "York Region",
      description: "Anchored by the Vaughan Metropolitan Centre and a subway connection to downtown, with a dense network of trades, construction, and professional firms across Woodbridge and Thornhill.",
      services: ["Construction and trades websites", "E-commerce development", "Professional services sites", "Logo and brand identity"],
      neighborhoods: ["Woodbridge", "Thornhill", "Maple", "Kleinburg", "Concord", "Vellore Village"]
    },
    {
      city: "Pickering",
      region: "the GTA",
      description: "The nearest Durham city to our Markham base, and the one market we keep east of Toronto. The Seaton lands and City Centre redevelopment have created steady demand from contractors, trades, and the professional services following them east.",
      services: ["Contractor and trades websites", "Clinic sites with online booking", "Local SEO for Pickering searches", "Logo and brand identity"],
      neighborhoods: ["Pickering City Centre", "Bay Ridges", "Amberlea", "Rougemount", "Duffin Heights", "Seaton", "Claremont"]
    }
];

// City display name → /web-design/[slug] (matches src/lib/city-content.ts keys).
const toCitySlug = (city: string) => city.toLowerCase().replace(/\s+/g, '-');

const Locations = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <FadeIn>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">Based in Markham — Serving the GTA</p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]"
            staggerMs={130}
            lines={[
              <span key="l1" className="block font-light opacity-90">Local Web Design,</span>,
              <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Built in the GTA.</span>,
            ]}
          />
          <FadeIn delay={260}>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              We&apos;re headquartered in Markham, not a call centre three time zones away. That means local SEO built around the searches your GTA customers actually run, sites tuned for how they actually browse, and — for the right project — a kickoff meeting in person instead of over a webcam.
            </p>
          </FadeIn>
          <FadeIn delay={360}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mt-8 sm:mt-10">
              {[
                { value: '8', label: 'Cities Served' },
                { value: '50', label: 'Neighborhoods Covered' },
                { value: '1–2 Weeks', label: 'Typical Build Time' },
                { value: 'Direct', label: 'Access to the Developers' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3.5 sm:px-5 sm:py-4">
                  <div className="text-white font-medium text-base sm:text-lg leading-tight">{stat.value}</div>
                  <div className="text-white/40 text-[11px] sm:text-xs font-light leading-tight mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Why Local Matters — numbered pillars, matching /process */}
        <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.12] mb-16 sm:mb-20">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-purple-500/20 via-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <div className="relative z-10 px-6 sm:px-10 md:px-12 py-12 sm:py-16">
            <div className="text-center mb-10 sm:mb-12">
              <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-4">Why Local Matters</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.04em]">
                <span className="font-light">What Being </span>
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Local</span>
                <span className="font-light"> Actually Gets You</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {[
                {
                  label: 'We’re Based Here',
                  body: 'Our office is in Markham, about twenty minutes from Pickering. For the right-sized project, we’ll meet you in person for the kickoff — day-to-day work then moves to video and email, which is what keeps timelines short.',
                },
                {
                  label: 'We Know the Communities',
                  body: 'Markham’s Chinese-Canadian and South Asian communities, Richmond Hill’s Chinese-Canadian and Persian-Canadian business owners, Scarborough’s diversity — we build multilingual-ready sites and write copy that reads as local, not generic.',
                },
                {
                  label: 'Local SEO',
                  body: 'We optimize your Google Business Profile and build citations with real local organizations — the Markham Board of Trade, your municipal chamber of commerce — not a generic national SEO checklist.',
                  href: '/services/seo',
                  linkText: 'Local SEO services',
                },
                {
                  label: 'Local GEO & AI Search',
                  body: 'When someone asks ChatGPT or Perplexity for a web designer near Markham or Stouffville, we want your business in that answer too — not just page one of Google.',
                  href: '/services/geo',
                  linkText: 'GEO & AI search',
                },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 100}>
                  <div className="bg-slate-950/80 hover:bg-slate-900/90 transition-colors duration-300 p-6 sm:p-7 flex flex-col gap-3 h-full group">
                    <div className="flex-1">
                      <p className="text-white font-medium text-base mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                        {item.label}
                      </p>
                      <p className="text-white/45 text-sm leading-relaxed font-light">
                        {item.body}
                      </p>
                    </div>
                    {item.href && (
                      <Link
                        href={item.href}
                        className="inline-flex items-center text-xs font-medium text-cyan-300/70 hover:text-cyan-300 transition-colors duration-300 group/link"
                      >
                        {item.linkText} <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={440}>
              <p className="text-center text-white/35 text-xs sm:text-sm font-light mt-8 sm:mt-10 max-w-2xl mx-auto">
                We also tune performance for how the GTA actually browses — mobile-first, with our CDN&apos;s Toronto edge location keeping load times fast for local visitors.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {locations.map((location, index) => (
            <div key={index} className="group">
              <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 relative overflow-hidden h-full flex flex-col">
                {/* Gradient top border accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/60 via-purple-500/60 to-cyan-500/60" />

                {/* Box glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-1">
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{location.city}</span>
                      </h2>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-white/35 font-medium">{location.region}</p>
                    </div>
                    {location.homeBase && (
                      <span className="flex-shrink-0 text-[10px] uppercase tracking-[0.1em] font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-2.5 py-1 whitespace-nowrap">
                        Home Base
                      </span>
                    )}
                  </div>

                  <p className="text-white/60 mb-6 text-sm sm:text-base leading-relaxed flex-grow font-light">
                    {location.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-cyan-300 mb-3 flex items-center space-x-2">
                      <span>Services</span>
                    </h3>
                    <ul className="space-y-2">
                      {location.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/60 text-sm font-light">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-sm font-semibold text-cyan-300 mb-3 flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Neighborhoods</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {location.neighborhoods.map((neighborhood, neighborhoodIndex) => (
                        <span key={neighborhoodIndex} className="text-xs bg-slate-800/50 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30 font-light">
                          {neighborhood}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/web-design/${toCitySlug(location.city)}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    Web design in {location.city}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry-Specific Web Design */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden mb-16 sm:mb-20">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>

          <div className="relative z-10">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Every Industry Sells</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Differently Online</span>
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light">
                A trades site needs a project gallery. A law firm needs credibility above the fold. We build for what your industry actually needs to convert — in the GTA markets where it matters most.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: Hammer,
                  title: 'Renovations & Contractors',
                  href: '/renovations',
                  desc: 'Project galleries and quote forms that turn browsers into booked estimates — built for kitchen and bath remodelers, roofers, and electricians.',
                  areas: 'Stouffville, Vaughan, Pickering',
                },
                {
                  icon: Heart,
                  title: 'Physio & Wellness Clinics',
                  href: '/clinics',
                  desc: 'Online booking, practitioner profiles, and insurance details that turn a researching patient into a confirmed appointment.',
                  areas: 'Scarborough, Richmond Hill',
                },
                {
                  icon: Calculator,
                  title: 'Accountants & Brokers',
                  href: '/accountants',
                  desc: 'Secure client portals and document intake for firms that need to read as credible before the first meeting.',
                  areas: 'Mississauga',
                },
                {
                  icon: Scale,
                  title: 'Law Firms',
                  href: '/lawyers',
                  desc: 'Trust-first websites for practices that win clients on credibility, not price — for firms across the GTA.',
                  areas: 'Mississauga, Richmond Hill',
                },
              ].map((industry) => {
                const IconComponent = industry.icon;
                return (
                  <Link
                    key={industry.href}
                    href={industry.href}
                    className="group relative flex flex-col bg-slate-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/15 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/60 via-purple-500/60 to-cyan-500/60" />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-5 w-5 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors duration-300">{industry.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed font-light mb-4 flex-grow">{industry.desc}</p>
                      <div className="pt-3 border-t border-white/6 flex items-center justify-between gap-3">
                        <span className="text-cyan-300/60 text-[11px] font-light tracking-wide">{industry.areas}</span>
                        <span className="inline-flex items-center text-cyan-300 text-sm font-medium group-hover:text-cyan-200 transition-colors flex-shrink-0">
                          Details <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 font-medium">Serving Markham &amp; the GTA</p>
          <TextReveal
            as="h2"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]"
            staggerMs={130}
            lines={[
              <span key="l1" className="block font-light opacity-90">Ready to Build</span>,
              <span key="l2" className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Something Local?</span>,
            ]}
          />
          <FadeIn delay={260}>
            <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 sm:mb-10 max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
              Tell us about your business and where you&apos;re based — we&apos;ll send a fixed, custom quote within 24 hours, and meet in person if the project calls for it.
            </p>
          </FadeIn>
          <div className="flex justify-center">
            <div className="relative w-full sm:w-auto rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                <Link href="/contact" className="flex items-center justify-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                  <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Last Updated Date */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-sm font-light">
            Last updated: January 2026
          </p>
        </div>
      </div>

      {/* Breadcrumb + ItemList schema are server-rendered in src/app/locations/page.tsx */}
    </div>
  );
};

export default Locations;
