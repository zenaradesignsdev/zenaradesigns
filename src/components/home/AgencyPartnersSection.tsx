'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, memo } from 'react';
import { TypingTextLines } from './TypingAnimations';

const shopifyLogo = '/images/shopify.svg';
const vercelLogo = '/images/vercel.svg';
const cloudflareLogo = '/images/cloudflare.svg';
const stripeLogo = '/images/stripe-2.svg';
const figmaLogo = '/images/figma.svg';
const calendlyLogo = '/images/calendly.svg';
const namecheapLogo = '/images/namecheap.svg';
const googleAnalyticsLogo = '/images/googleanalytics.svg';
const instagramLogo = '/images/instagram.svg';

const PARTNERS = [
  { name: 'Shopify', logo: shopifyLogo },
  { name: 'Vercel', logo: vercelLogo },
  { name: 'Cloudflare', logo: cloudflareLogo },
  { name: 'Stripe', logo: stripeLogo },
  { name: 'Figma', logo: figmaLogo },
  { name: 'Calendly', logo: calendlyLogo },
  { name: 'Namecheap', logo: namecheapLogo },
  { name: 'Google Analytics', logo: googleAnalyticsLogo },
  { name: 'Instagram', logo: instagramLogo },
];

const AgencyPartnersSection = () => {
  const [yearsExperience, setYearsExperience] = useState(0);
  const yearsRef = useRef<HTMLDivElement>(null);
  const yearsAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !yearsAnimatedRef.current) {
            yearsAnimatedRef.current = true;
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;
            const target = 6;
            let step = 0;
            const timer = setInterval(() => {
              step++;
              setYearsExperience(Math.floor(target * (step / steps)));
              if (step >= steps) {
                clearInterval(timer);
                setYearsExperience(target);
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (yearsRef.current) observer.observe(yearsRef.current);
    return () => {
      if (yearsRef.current) observer.unobserve(yearsRef.current);
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden bg-black" aria-label="About Zenara">
      {/* Space Background Elements */}
      <div className="absolute inset-0">
        <div className="bg-star" style={{ top: '3%', left: '2%' }}></div>
        <div className="bg-star" style={{ top: '5%', left: '8%' }}></div>
        <div className="bg-star" style={{ top: '8%', left: '15%' }}></div>
        <div className="bg-star" style={{ top: '12%', left: '22%' }}></div>
        <div className="bg-star" style={{ top: '6%', left: '30%' }}></div>
        <div className="bg-star" style={{ top: '15%', left: '38%' }}></div>
        <div className="bg-star" style={{ top: '9%', left: '45%' }}></div>
        <div className="bg-star" style={{ top: '18%', left: '52%' }}></div>
        <div className="bg-star" style={{ top: '7%', left: '60%' }}></div>
        <div className="bg-star" style={{ top: '14%', left: '68%' }}></div>
        <div className="bg-star" style={{ top: '11%', left: '75%' }}></div>
        <div className="bg-star" style={{ top: '20%', left: '82%' }}></div>
        <div className="bg-star" style={{ top: '25%', left: '5%' }}></div>
        <div className="bg-star" style={{ top: '28%', left: '12%' }}></div>
        <div className="bg-star" style={{ top: '32%', left: '20%' }}></div>
        <div className="bg-star" style={{ top: '26%', left: '28%' }}></div>
        <div className="bg-star" style={{ top: '35%', left: '35%' }}></div>
        <div className="bg-star" style={{ top: '29%', left: '42%' }}></div>
        <div className="bg-star" style={{ top: '38%', left: '50%' }}></div>
        <div className="bg-star" style={{ top: '27%', left: '58%' }}></div>
        <div className="bg-star" style={{ top: '34%', left: '65%' }}></div>
        <div className="bg-star" style={{ top: '31%', left: '72%' }}></div>
        <div className="bg-star" style={{ top: '40%', left: '80%' }}></div>
        <div className="bg-star" style={{ top: '24%', left: '88%' }}></div>
        <div className="bg-star" style={{ top: '45%', left: '3%' }}></div>
        <div className="bg-star" style={{ top: '48%', left: '10%' }}></div>
        <div className="bg-star" style={{ top: '42%', left: '18%' }}></div>
        <div className="bg-star" style={{ top: '51%', left: '25%' }}></div>
        <div className="bg-star" style={{ top: '47%', left: '33%' }}></div>
        <div className="bg-star" style={{ top: '44%', left: '40%' }}></div>
        <div className="bg-star" style={{ top: '49%', left: '48%' }}></div>
        <div className="bg-star" style={{ top: '46%', left: '55%' }}></div>
        <div className="bg-star" style={{ top: '52%', left: '63%' }}></div>
        <div className="bg-star" style={{ top: '43%', left: '70%' }}></div>
        <div className="bg-star" style={{ top: '50%', left: '78%' }}></div>
        <div className="bg-star" style={{ top: '48%', left: '85%' }}></div>
        <div className="bg-star" style={{ top: '55%', left: '6%' }}></div>
        <div className="bg-star" style={{ top: '58%', left: '14%' }}></div>
        <div className="bg-star" style={{ top: '62%', left: '22%' }}></div>
        <div className="bg-star" style={{ top: '56%', left: '30%' }}></div>
        <div className="bg-star" style={{ top: '65%', left: '38%' }}></div>
        <div className="bg-star" style={{ top: '59%', left: '45%' }}></div>
        <div className="bg-star" style={{ top: '68%', left: '53%' }}></div>
        <div className="bg-star" style={{ top: '57%', left: '61%' }}></div>
        <div className="bg-star" style={{ top: '64%', left: '69%' }}></div>
        <div className="bg-star" style={{ top: '61%', left: '76%' }}></div>
        <div className="bg-star" style={{ top: '70%', left: '84%' }}></div>
        <div className="bg-star" style={{ top: '54%', left: '91%' }}></div>
        <div className="bg-star" style={{ top: '75%', left: '4%' }}></div>
        <div className="bg-star" style={{ top: '78%', left: '11%' }}></div>
        <div className="bg-star" style={{ top: '72%', left: '19%' }}></div>
        <div className="bg-star" style={{ top: '81%', left: '27%' }}></div>
        <div className="bg-star" style={{ top: '77%', left: '35%' }}></div>
        <div className="bg-star" style={{ top: '74%', left: '42%' }}></div>
        <div className="bg-star" style={{ top: '79%', left: '50%' }}></div>
        <div className="bg-star" style={{ top: '76%', left: '58%' }}></div>
        <div className="bg-star" style={{ top: '82%', left: '66%' }}></div>
        <div className="bg-star" style={{ top: '73%', left: '73%' }}></div>
        <div className="bg-star" style={{ top: '80%', left: '81%' }}></div>
        <div className="bg-star" style={{ top: '78%', left: '89%' }}></div>
        <div className="bg-star" style={{ top: '85%', left: '7%' }}></div>
        <div className="bg-star" style={{ top: '88%', left: '15%' }}></div>
        <div className="bg-star" style={{ top: '92%', left: '23%' }}></div>
        <div className="bg-star" style={{ top: '86%', left: '31%' }}></div>
        <div className="bg-star" style={{ top: '95%', left: '39%' }}></div>
        <div className="bg-star" style={{ top: '89%', left: '47%' }}></div>
        <div className="bg-star" style={{ top: '98%', left: '55%' }}></div>
        <div className="bg-star" style={{ top: '87%', left: '63%' }}></div>
        <div className="bg-star" style={{ top: '94%', left: '71%' }}></div>
        <div className="bg-star" style={{ top: '91%', left: '79%' }}></div>
        <div className="bg-star" style={{ top: '96%', left: '87%' }}></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Section - Text Content with Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
          <div className="text-center lg:text-left space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-[-0.02em]">
              <TypingTextLines
                lines={['So much more than', 'a web design agency.']}
                className="[&>div:first-child]:block [&>div:last-child]:block [&>div:last-child]:mt-1"
              />
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 leading-[1.1] tracking-[-0.02em] mt-4">
              <span>We are your </span>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">IT team</span>.
            </h3>
          </div>

          <div className="text-center" ref={yearsRef}>
            <div className="inline-block">
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient leading-none">
                {yearsExperience}+
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white/80 mt-2 sm:mt-4 tracking-wide">
                Years of Experience
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="py-12 sm:py-16 mb-12 sm:mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 via-purple-500/60 to-transparent"></div>
          </div>
        </div>

        {/* Our Trusted Partners */}
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 leading-[0.95] tracking-[-0.04em]">
            <span className="font-light">Our Trusted </span>
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Partners</span>
          </h3>
        </div>

        {/* Partners Carousel */}
        <div className="relative overflow-hidden -mx-4 sm:-mx-6" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, black, transparent)' }}></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, black, transparent)' }}></div>

          <div className="flex animate-scroll-smooth space-x-8 sm:space-x-12 md:space-x-16 lg:space-x-20 relative z-10 py-4">
            {[...PARTNERS, ...PARTNERS].map((company, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 sm:h-20 md:h-24 px-4 sm:px-6 md:px-8">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    style={{ filter: 'brightness(0) invert(1)' }}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(AgencyPartnersSection);
