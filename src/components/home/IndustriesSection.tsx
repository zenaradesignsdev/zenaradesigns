import Link from 'next/link';
import { Scale, Calculator, Hammer, Heart, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

const industries = [
  {
    icon: Scale,
    title: 'Law Firms',
    href: '/lawyers',
    description: 'Build trust and credibility online. We design websites that help GTA law firms convert visitors into clients.',
  },
  {
    icon: Calculator,
    title: 'Accounting Firms',
    href: '/accountants',
    description: 'Secure, professional platforms with client portals. Designed for CPAs and accounting firms across the GTA.',
  },
  {
    icon: Hammer,
    title: 'Renovation Companies',
    href: '/renovations',
    description: 'Showcase your best projects with stunning portfolio websites that capture leads and grow your business.',
  },
  {
    icon: Heart,
    title: 'Wellness Clinics',
    href: '/clinics',
    description: 'Modern platforms with online booking for massage therapy, chiropractic, physiotherapy, and holistic health.',
  },
];

const IndustriesSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/40 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-cyan-900/30 to-black"></div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        <div className="bg-star" style={{ top: '8%', left: '10%' }}></div>
        <div className="bg-star" style={{ top: '15%', left: '30%' }}></div>
        <div className="bg-star" style={{ top: '6%', left: '55%' }}></div>
        <div className="bg-star" style={{ top: '12%', left: '75%' }}></div>
        <div className="bg-star" style={{ top: '18%', left: '90%' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <FadeIn>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 leading-[0.95] tracking-[-0.04em]">
              <span className="font-light opacity-90 text-white">Industries We </span>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Serve</span>
            </h2>
          </FadeIn>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
            We understand the unique needs of trust-critical industries and build tailored websites that drive real results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            return (
              <Link
                key={industry.href}
                href={industry.href}
                className="group bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight">{industry.title}</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-[1.7] font-light tracking-[0.01em] mb-4">{industry.description}</p>
                  <span className="inline-flex items-center text-cyan-300 text-sm font-medium group-hover:text-cyan-200 transition-colors">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
