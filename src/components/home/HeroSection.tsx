'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, memo } from 'react';

const logo = '/images/zenara-logo-v5.svg';

const MARQUEE_ITEMS = [
  'Contractors',
  'Clinics',
  'Trades',
  'Professional firms',
  'Markham',
  'Stouffville',
  'Scarborough',
] as const;

const PANEL_DOTS = {
  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.14) 1.4px, transparent 1.4px)',
  backgroundSize: '22px 22px',
};

// cyan-300 stripes
const MOCK_IMAGE_STRIPES = {
  backgroundImage:
    'repeating-linear-gradient(135deg, rgba(103, 232, 249, 0.16) 0px, rgba(103, 232, 249, 0.16) 8px, transparent 8px, transparent 16px)',
};

// Glass surface shared by the floating cards, matching the site's bordered black panels.
const GLASS_CARD = 'border border-white/15 bg-black/70 backdrop-blur-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]';

const Sparkle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
  </svg>
);

const CursorTag = ({ label, className, tagClassName, fill }: { label: string; className: string; tagClassName: string; fill: string }) => (
  <div className={`absolute z-[5] flex items-start ${className}`}>
    <svg width="26" height="26" viewBox="0 0 24 24">
      <path d="M3 2l17 8-7.5 2.5L9.5 20z" fill={fill} stroke="#000" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
    <span className={`-ml-1 mt-[18px] rounded-md px-[9px] py-[3px] font-mono text-xs font-semibold text-black ${tagClassName}`}>
      {label}
    </span>
  </div>
);

/* Decorative mock of a client site being built, with live-collaboration details. */
const WebsiteArt = () => (
  <div className="relative mx-auto h-[570px] w-full max-w-[580px] sm:h-[600px] lg:h-[640px]" aria-hidden="true">
    {/* Back panel: purple-to-cyan nebula glass */}
    <div className="absolute left-10 right-0 top-11 h-[440px] overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-br from-purple-500/35 via-purple-900/40 to-cyan-500/25 sm:left-14 sm:h-[520px]">
      <div className="absolute inset-0" style={PANEL_DOTS} />
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
    </div>

    <div className="zn-spin absolute -top-1.5 left-[30px] h-20 w-20 rounded-full border-2 border-dashed border-cyan-300/50 sm:h-[120px] sm:w-[120px]" />

    {/* Browser window */}
    <div className="absolute left-0 top-[110px] z-[2] w-[88%] overflow-hidden rounded-[18px] border border-white/15 bg-black/85 shadow-[0_30px_80px_-20px_rgba(168,85,247,0.45)] backdrop-blur-md sm:w-[80%]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <div className="ml-2.5 flex-grow truncate rounded-full bg-white/[0.06] px-3.5 py-1.5 font-mono text-xs text-white/50">
          [yourbusiness].ca
        </div>
      </div>
      <div className="flex flex-col gap-5 p-4 sm:p-[22px]">
        <div className="flex items-center justify-between gap-3 text-[13px]">
          <span className="font-semibold text-white">[Your Business]</span>
          <span className="hidden text-white/50 xs:inline">Services · About · Contact</span>
        </div>
        <div className="flex items-stretch gap-[18px]">
          <div className="flex flex-1 flex-col justify-center gap-3">
            <div className="text-xl font-medium leading-[1.15] tracking-[-0.02em] text-white sm:text-[25px]">
              Free estimates. Fast callbacks.
            </div>
            <div className="h-[7px] rounded bg-white/10" />
            <div className="h-[7px] w-[62%] rounded bg-white/10" />
            <div className="self-start rounded-full bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 px-[18px] py-[9px] text-[13px] font-semibold text-black">
              Call now
            </div>
          </div>
          <div className="hidden h-[150px] w-[132px] shrink-0 rounded-[14px] border border-white/10 bg-white/[0.03] sm:block" style={MOCK_IMAGE_STRIPES} />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {['Service one', 'Service two', 'Service three'].map((service) => (
            <div key={service} className="flex flex-col gap-[7px] rounded-xl border border-white/10 bg-white/[0.04] p-2.5 sm:p-3">
              <div className="truncate text-[11px] font-medium text-white/90 sm:text-xs">{service}</div>
              <div className="h-[5px] rounded-[3px] bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>

    <CursorTag label="Dev" fill="#67e8f9" tagClassName="bg-cyan-300" className="zn-float left-[58%] top-[270px] sm:top-[290px]" />
    <CursorTag label="You" fill="#d8b4fe" tagClassName="bg-purple-300" className="zn-float-slow left-[26%] top-[200px] sm:top-[215px]" />

    {/* "Live in 1–2 weeks" badge */}
    <div className="absolute -right-2 -top-2.5 z-[6] flex h-[136px] w-[136px] origin-top-right rotate-12 scale-[0.8] items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 text-black shadow-[0_0_45px_rgba(103,232,249,0.35)] sm:scale-100">
      <div className="flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full border-2 border-dashed border-black/60">
        <span className="font-mono text-[11px] font-semibold tracking-[0.14em]">LIVE IN</span>
        <span className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em]">1–2</span>
        <span className="font-mono text-[11px] font-semibold tracking-[0.14em]">WEEKS</span>
      </div>
    </div>

    {/* Chat message from the developer */}
    <div className={`absolute bottom-1 right-0 z-[6] flex w-[260px] flex-col gap-2 rounded-[20px_20px_6px_20px] px-[18px] py-4 text-white sm:w-[290px] ${GLASS_CARD}`}>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black">
          <Image src={logo} alt="" width={18} height={18} className="h-[18px] w-[18px]" />
        </span>
        <span className="whitespace-nowrap font-mono text-[11px] tracking-[0.12em] text-cyan-400/70 sm:tracking-[0.18em]">ZENARA DEV · DIRECT LINE</span>
      </div>
      <div className="text-sm font-light leading-[1.5] text-white/90 sm:text-[15px]">
        Staging link&apos;s ready. Want the call button higher up?
      </div>
    </div>

    {/* New lead notification */}
    <div className={`absolute bottom-[112px] left-2.5 z-[6] flex items-center gap-3 rounded-[14px] px-4 py-3 text-white sm:bottom-[38px] ${GLASS_CARD}`}>
      <span className="zn-pulse h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
      <div className="flex flex-col gap-px">
        <span className="text-[13px] font-semibold">New quote request</span>
        <span className="text-xs text-white/50">[Name] · Markham · just now</span>
      </div>
    </div>
  </div>
);

const MarqueeRow = () => (
  <div className="flex items-center gap-[34px] whitespace-nowrap pr-[34px] font-mono text-sm font-semibold uppercase tracking-[0.2em] text-black sm:text-base">
    {MARQUEE_ITEMS.map((item) => (
      <span key={item} className="flex items-center gap-[34px]">
        {item}
        <Sparkle />
      </span>
    ))}
  </div>
);

const HeroSection = () => {
  // Cursor glow effect — Hero section only
  useEffect(() => {
    const heroSection = document.querySelector('.cursor-glow') as HTMLElement;
    if (!heroSection) return;

    // Cache rect to avoid forced reflow on every mousemove
    let cachedRect = heroSection.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      heroSection.style.setProperty('--mouse-x', (e.clientX - cachedRect.left) + 'px');
      heroSection.style.setProperty('--mouse-y', (e.clientY - cachedRect.top) + 'px');
    };

    const handleMouseLeave = () => {
      heroSection.style.setProperty('--mouse-x', '-100px');
      heroSection.style.setProperty('--mouse-y', '-100px');
    };

    // The rect moves when the page scrolls, not just on resize, so refresh it on
    // both or the glow drifts away from the pointer after scrolling.
    const updateRect = () => {
      cachedRect = heroSection.getBoundingClientRect();
    };

    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  return (
    <>
      {/* Full-Screen Loading Animation — CSS-driven exit, no JS timers blocking LCP */}
      <div className="loading-screen-exit fixed inset-0 z-[10002] bg-black flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/40 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/30 to-black"></div>
        <div className="absolute inset-0">
          <div className="bg-star" style={{ top: '20%', left: '15%', animationDelay: '0s' }}></div>
          <div className="bg-star" style={{ top: '40%', left: '25%', animationDelay: '0.5s' }}></div>
          <div className="bg-star" style={{ top: '60%', left: '10%', animationDelay: '1s' }}></div>
          <div className="bg-star" style={{ top: '30%', left: '70%', animationDelay: '0.3s' }}></div>
          <div className="bg-star" style={{ top: '70%', left: '80%', animationDelay: '0.8s' }}></div>
        </div>
        <div className="relative z-10 loading-logo-entrance">
          <Image
            src={logo}
            alt="Zenara Designs Logo"
            className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 60px rgba(0, 0, 0, 0.5))' }}
            width={384}
            height={384}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl -z-10 loading-glow"></div>
        </div>
      </div>

      <section
        className="hero-section cursor-glow relative z-10 flex min-h-screen flex-col overflow-hidden bg-black text-white"
        role="banner"
        aria-label="Hero section"
      >
        {/* Space background — same gradient wash and stars as the rest of the site,
            with a dot grid that fades out so the hero hands off to black below. */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/30 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/30 to-black" />
          <div className="zn-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,black_30%,transparent_100%)]" />
          <div className="absolute left-[10%] top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-300/15 via-purple-300/10 to-cyan-300/15 blur-3xl" />
          <div className="absolute right-[8%] top-[15%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-r from-purple-300/15 via-cyan-300/10 to-purple-300/15 blur-3xl" />
          <div className="shooting-star shooting-star-1"></div>
          <div className="shooting-star shooting-star-2"></div>
          <div className="shooting-star shooting-star-3"></div>
          <div className="bg-star bg-star-1"></div>
          <div className="bg-star bg-star-3"></div>
          <div className="bg-star bg-star-5"></div>
          <div className="bg-star bg-star-7"></div>
          <div className="bg-star bg-star-9"></div>
          <div className="bg-star bg-star-11"></div>
          <div className="bg-star bg-star-13"></div>
          {/* Fade to the next section's pure black */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-12">
          <div className="grid w-full grid-cols-1 items-center gap-14 xl:grid-cols-2">
            <div className="hero-text-fade flex flex-col gap-7">
              <h1 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/80 sm:text-sm">
                Markham &amp; GTA Web Design
              </h1>
              <p className="text-[clamp(2.75rem,5.8vw,5.375rem)] font-light leading-[1.05] tracking-[-0.035em] text-white">
                Websites that get the phone{' '}
                <span className="relative inline-block pb-1">
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-[length:200%_auto] bg-clip-text font-normal text-transparent animate-gradient">
                    ringing.
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 h-4 w-full"
                    viewBox="0 0 300 16"
                    preserveAspectRatio="none"
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="hero-squiggle" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#d8b4fe" />
                        <stop offset="100%" stopColor="#67e8f9" />
                      </linearGradient>
                    </defs>
                    <path stroke="url(#hero-squiggle)" d="M3 10 C 32 2, 54 15, 86 8 S 138 3, 170 9 S 240 15, 297 5" />
                  </svg>
                </span>
              </p>
              <p className="max-w-[560px] text-base font-light leading-[1.7] tracking-[0.01em] text-white/70 sm:text-lg md:text-xl">
                Lead-focused websites for small businesses across Markham, Stouffville and Scarborough: contractors, clinics, trades and professional firms. Fixed pricing, direct access to the developers, live in 1&ndash;2 weeks.
              </p>

              {/* Same primary/secondary pair as the homepage portfolio section */}
              <div className="hero-button-slide flex flex-col items-start gap-4 pt-1 xs:flex-row xs:flex-wrap xs:items-center">
                <div className="relative inline-block rounded-full bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 p-[3.5px]">
                  <Button asChild className="group relative h-auto overflow-hidden rounded-full bg-black px-7 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 sm:px-9 sm:py-5 sm:text-lg">
                    <Link href="/contact" className="relative z-10 flex items-center justify-center whitespace-nowrap group-hover:text-white">
                      <span className="relative z-10">Launch Your Project</span>
                      <Rocket className="relative z-10 ml-2 h-5 w-5 transition-all duration-300 group-hover:scale-125 group-hover:text-cyan-400 sm:h-6 sm:w-6" aria-hidden="true" />
                      <span className="absolute inset-0 z-0 -translate-x-full transform rounded-full bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                    </Link>
                  </Button>
                </div>
                <Link
                  href="/projects"
                  className="group flex items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-white/45 bg-transparent px-7 py-[18px] text-base font-semibold text-white transition-colors duration-300 hover:border-cyan-300 hover:bg-white/[0.04] hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-9 sm:py-[22px] sm:text-lg"
                >
                  See Our Work
                  <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-6 sm:w-6" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <WebsiteArt />
          </div>
        </div>

        {/* Industries + service areas marquee */}
        <div className="relative z-10 mt-auto h-[104px] w-full overflow-hidden" aria-hidden="true">
          <div className="absolute -left-[3%] top-[26px] h-14 w-[106%] rotate-[1.3deg] bg-gradient-to-r from-purple-500/40 via-cyan-500/30 to-purple-500/40" />
          <div className="absolute -left-[3%] top-3.5 flex h-[58px] w-[106%] -rotate-[1.4deg] items-center overflow-hidden bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
            <div className="zn-marquee flex w-max">
              <MarqueeRow />
              <MarqueeRow />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(HeroSection);
