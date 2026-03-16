'use client';

import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SafeImage } from '@/components/ui/safe-image';
import { memo } from 'react';
import { FadeIn } from '@/components/ui/fade-in';

const realEstateWebImage = '/images/website-example-realestate.png';
const rocketWebImage = '/images/website-example-rocket.png';
const gardenWebImage = '/images/website-example-garden.png';
const travelWebImage = '/images/website-example-travel.png';

const PORTFOLIO_ITEMS = [
  { src: realEstateWebImage, alt: 'Real Estate Website Design Toronto - Professional Property Showcase Platform', title: 'Real Estate', desc: 'Property showcase platform', gradient: 'from-cyan-500/20 to-purple-500/20' },
  { src: rocketWebImage, alt: 'Rocket Launch Website Design Toronto - Modern Tech Startup Platform', title: 'Tech Startup', desc: 'Innovative tech platform', gradient: 'from-purple-500/20 to-pink-500/20' },
  { src: gardenWebImage, alt: 'Garden & Landscaping Website Design GTA - Professional Horticulture Business Platform', title: 'Garden Center', desc: 'Eco-friendly business site', gradient: 'from-pink-500/20 to-cyan-500/20' },
  { src: travelWebImage, alt: 'Travel & Tourism Website Design Toronto - Adventure Booking Platform', title: 'Travel Agency', desc: 'Adventure booking platform', gradient: 'from-teal-500/20 to-purple-500/20' },
];

const PortfolioSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900" aria-label="Portfolio showcase">
      {/* Space Background Elements */}
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
        <div className="bg-star" style={{ top: '25%', left: '2%' }}></div>
        <div className="bg-star" style={{ top: '22%', left: '15%' }}></div>
        <div className="bg-star" style={{ top: '28%', left: '28%' }}></div>
        <div className="bg-star" style={{ top: '31%', left: '42%' }}></div>
        <div className="bg-star" style={{ top: '26%', left: '55%' }}></div>
        <div className="bg-star" style={{ top: '33%', left: '65%' }}></div>
        <div className="bg-star" style={{ top: '29%', left: '75%' }}></div>
        <div className="bg-star" style={{ top: '35%', left: '85%' }}></div>
        <div className="bg-star" style={{ top: '24%', left: '92%' }}></div>
        <div className="bg-star" style={{ top: '45%', left: '5%' }}></div>
        <div className="bg-star" style={{ top: '48%', left: '18%' }}></div>
        <div className="bg-star" style={{ top: '42%', left: '32%' }}></div>
        <div className="bg-star" style={{ top: '51%', left: '48%' }}></div>
        <div className="bg-star" style={{ top: '47%', left: '62%' }}></div>
        <div className="bg-star" style={{ top: '44%', left: '72%' }}></div>
        <div className="bg-star" style={{ top: '49%', left: '82%' }}></div>
        <div className="bg-star" style={{ top: '46%', left: '95%' }}></div>
        <div className="bg-star" style={{ top: '65%', left: '3%' }}></div>
        <div className="bg-star" style={{ top: '68%', left: '16%' }}></div>
        <div className="bg-star" style={{ top: '72%', left: '29%' }}></div>
        <div className="bg-star" style={{ top: '66%', left: '41%' }}></div>
        <div className="bg-star" style={{ top: '69%', left: '54%' }}></div>
        <div className="bg-star" style={{ top: '74%', left: '67%' }}></div>
        <div className="bg-star" style={{ top: '71%', left: '79%' }}></div>
        <div className="bg-star" style={{ top: '67%', left: '89%' }}></div>
        <div className="bg-star" style={{ top: '73%', left: '96%' }}></div>
        <div className="bg-star" style={{ top: '85%', left: '7%' }}></div>
        <div className="bg-star" style={{ top: '88%', left: '21%' }}></div>
        <div className="bg-star" style={{ top: '82%', left: '35%' }}></div>
        <div className="bg-star" style={{ top: '86%', left: '49%' }}></div>
        <div className="bg-star" style={{ top: '91%', left: '63%' }}></div>
        <div className="bg-star" style={{ top: '87%', left: '76%' }}></div>
        <div className="bg-star" style={{ top: '89%', left: '88%' }}></div>
        <div className="bg-star" style={{ top: '84%', left: '95%' }}></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-teal-500/15 rounded-full blur-3xl delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[0.95] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Bring your</span>
                <span className="block mt-1 sm:mt-1.5">
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">ideas</span>
                  {' '}
                  <span className="font-light">to life</span>
                </span>
              </h2>
            </FadeIn>
            <p className="text-base sm:text-lg md:text-xl text-white/60 leading-[1.7] max-w-lg mx-auto lg:mx-0 font-light tracking-[0.01em]">
              At Zenara Designs we specialize in creating beautiful websites for any industry and we work with you to bring your vision to life without all the technical details so you can focus on your core business.
            </p>
            <div className="flex justify-center lg:justify-start">
              <div className="relative inline-block rounded-full p-[3.5px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-7 py-5 sm:px-9 sm:py-6 text-lg sm:text-xl font-semibold group">
                  <Link href="/services" className="flex items-center justify-center relative z-10 group-hover:text-white">
                    <span className="relative z-10">Our Services</span>
                    <Rocket className="ml-2 h-6 w-6 transition-all duration-300 group-hover:text-cyan-400 group-hover:scale-125 relative z-10" />
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Vertical Sliding Animation */}
          <div className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden order-2 lg:order-1">
            <div className="absolute inset-0 flex flex-col animate-vertical-scroll-smooth">
              {/* Items + duplicate for seamless loop */}
              {[...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS].map((item, index) => (
                <div key={index} className="flex-shrink-0 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className={`aspect-video bg-gradient-to-br ${item.gradient} p-6`}>
                      <div className="h-full bg-white/90 rounded-xl shadow-lg overflow-hidden">
                        <SafeImage
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover"
                          priority={index === 0}
                          sizes="(max-width: 1024px) calc(100vw - 80px), 540px"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-slate-300 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-900 via-cyan-900/50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 via-cyan-900/50 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(PortfolioSection);
