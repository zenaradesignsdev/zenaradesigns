'use client';

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  X,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  ChevronDown,
  Plus,
  Monitor,
  ShoppingBag,
  Palette,
  Search,
  Wrench,
  Sparkles,
  RefreshCw,
  Hammer,
  Stethoscope,
  Calculator,
  Scale,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAVIGATION_LINKS, BUSINESS_PHONE_E164, BUSINESS_PHONE, BUSINESS_EMAIL } from '@/lib/constants';

const logo = '/images/zenara-logo-v5.svg';

/** useLayoutEffect warns during SSR; this component renders on the server too. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** How far the page scrolls before the bar morphs into the compact pill. */
const SCROLL_MORPH_AT = 24;

const MEGA_SERVICES: { href: string; label: string; blurb: string; icon: LucideIcon }[] = [
  { href: '/services/web-design', label: 'Web Design', blurb: 'Custom sites built to bring in leads', icon: Monitor },
  { href: '/services/website-redesign', label: 'Website Redesign', blurb: 'Rebuild an ageing site for speed', icon: RefreshCw },
  { href: '/services/ecommerce', label: 'E-Commerce', blurb: 'Online stores that are easy to run', icon: ShoppingBag },
  { href: '/services/branding', label: 'Branding', blurb: 'Logos and business cards, as one identity', icon: Palette },
  { href: '/services/seo', label: 'SEO', blurb: 'Get found on Google, locally', icon: Search },
  { href: '/services/geo', label: 'GEO / AI Search', blurb: 'Show up in ChatGPT and AI answers', icon: Sparkles },
  { href: '/services/website-maintenance', label: 'Website Maintenance', blurb: 'Hosting, updates and monthly reports', icon: Wrench },
];

const MEGA_INDUSTRIES: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/renovations', label: 'Renovations & Contractors', icon: Hammer },
  { href: '/clinics', label: 'Physio & Wellness Clinics', icon: Stethoscope },
  { href: '/accountants', label: 'Accountants & Brokers', icon: Calculator },
  { href: '/lawyers', label: 'Law Firms', icon: Scale },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousBodyOverflow = useRef<string>('');
  const restoreScrollOnClose = useRef(true);
  // Scroll position when the menu opened. Kept in a ref because the effect
  // cleanup clears body.style.top before the close branch could read it.
  const lockedScrollY = useRef(0);

  const navLinks = NAVIGATION_LINKS;
  const isActive = (href: string) => pathname === href;
  const isServicesSection = pathname === '/services' || pathname.startsWith('/services/');

  // Each hover advances the mark by a full turn. It never rewinds — a pinwheel
  // that snapped back would read as a mistake rather than a spin.
  const [logoTurns, setLogoTurns] = useState(0);

  /*
   * Morph on scroll: wide and boxless over the top of the page, then a compact
   * glass pill once the visitor scrolls. `scrolled` only flips when the
   * threshold is crossed; the progress line is written straight to the DOM so
   * scrolling never re-renders the header.
   */
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > SCROLL_MORPH_AT);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /*
   * One shared indicator travels between the desktop links instead of each link
   * owning an underline that fades in and out. It follows the pointer (and
   * keyboard focus), then settles back onto the current route's link.
   */
  const navRowRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const hoveredIndexRef = useRef<number | null>(null);
  const activeIndexRef = useRef<number>(-1);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, visible: false });

  const activeIndex = navLinks.findIndex((link) =>
    link.href === '/services' ? isServicesSection : isActive(link.href)
  );

  const measure = useCallback((index: number | null) => {
    const row = navRowRef.current;
    const el = index === null || index < 0 ? null : linkRefs.current[index];
    // No link matches the current route (a city or blog page) — park the comet.
    if (!row || !el) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const rowRect = row.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({ x: rect.left - rowRect.left, w: rect.width, visible: true });
  }, []);

  const moveTo = useCallback(
    (index: number) => {
      hoveredIndexRef.current = index;
      measure(index);
    },
    [measure]
  );

  const settle = useCallback(() => {
    hoveredIndexRef.current = null;
    measure(activeIndexRef.current);
  }, [measure]);

  // Position before first paint so the indicator doesn't slide in from the left
  // on load, and re-settle whenever the route changes.
  useIsomorphicLayoutEffect(() => {
    activeIndexRef.current = activeIndex;
    if (hoveredIndexRef.current === null) measure(activeIndex);
  }, [activeIndex, measure]);

  // Link widths change with the viewport, once the webfont swaps in, and when
  // the bar morphs (the row shifts as the wordmark collapses).
  useEffect(() => {
    let cancelled = false;
    const remeasure = () => {
      if (!cancelled) measure(hoveredIndexRef.current ?? activeIndexRef.current);
    };
    window.addEventListener('resize', remeasure);
    document.fonts?.ready.then(remeasure);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', remeasure);
    };
  }, [measure]);

  useEffect(() => {
    // The container animates for 500ms; measure once it has settled.
    const t = setTimeout(() => measure(hoveredIndexRef.current ?? activeIndexRef.current), 520);
    return () => clearTimeout(t);
  }, [scrolled, measure]);

  /*
   * Services mega menu. Opens on hover with a short close delay so the pointer
   * can travel from the link down into the panel, and from the chevron button
   * for keyboard and screen reader users.
   */
  const [megaOpen, setMegaOpen] = useState(false);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaRegionRef = useRef<HTMLDivElement>(null);
  const megaButtonRef = useRef<HTMLButtonElement>(null);

  const openMega = () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  useEffect(() => {
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        megaButtonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!megaRegionRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [megaOpen]);

  useEffect(
    () => () => {
      if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    },
    []
  );

  // Handle menu open
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  // Handle menu close
  const closeMobileMenu = () => {
    const menuElement = mobileMenuRef.current;
    if (menuElement) {
      menuElement.classList.add('mobile-menu-exiting');
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setMobileServicesOpen(false);
        menuElement.classList.remove('mobile-menu-exiting');
      }, 300);
    } else {
      setIsMobileMenuOpen(false);
      setMobileServicesOpen(false);
    }
  };

  // Navigating from the menu: the new page should open at the top, so the
  // scroll lock below must not put back the previous page's scroll position
  // when the menu finishes closing. Next.js handles the scroll to top itself.
  const handleNavigation = (href: string) => {
    restoreScrollOnClose.current = false;
    closeMobileMenu();
    router.push(href);
  };

  // Prevent body scroll when mobile menu is open - optimized for mobile devices
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      lockedScrollY.current = scrollY;
      previousBodyOverflow.current = document.body.style.overflow;

      // Lock scroll - method that works on all devices
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';

      // Prevent iOS bounce scroll
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';

      // Focus close button after animation starts
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 150);
    } else {
      // Restore body styles
      document.body.style.overflow = previousBodyOverflow.current || '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';

      // Restore html styles
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';

      // Restore scroll position, unless the menu closed because of a navigation
      if (lockedScrollY.current && restoreScrollOnClose.current) {
        window.scrollTo(0, lockedScrollY.current);
      }
      lockedScrollY.current = 0;
      restoreScrollOnClose.current = true;
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = previousBodyOverflow.current || '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change (back/forward navigation)
  useEffect(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen]);

  // A render function rather than a nested component: a component defined in
  // here would be a new type on every render, remounting the menu (and
  // replaying its entrance) whenever the services accordion toggles.
  const renderMobileMenu = () => (
    <div
      ref={mobileMenuRef}
      id="mobile-menu"
      className="lg:hidden fixed inset-0 z-[10001] mobile-menu-container"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div className="mobile-menu-backdrop" onClick={closeMobileMenu} aria-hidden="true">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_100%_0%,rgba(6,182,212,0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_0%_100%,rgba(168,85,247,0.22),transparent_70%)]" />
        <div className="zn-dot-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      {/* Menu Content */}
      <div className="mobile-menu-content">
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 sm:px-6 pb-4 flex-shrink-0"
          style={{ paddingTop: 'max(20px, env(safe-area-inset-top, 0px))' }}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 touch-manipulation"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/');
            }}
          >
            <Image src={logo} alt="Zenara Designs" className="h-9 w-auto" width={36} height={36} priority />
            <span className="text-lg font-light tracking-wide text-white">
              Zenara <span className="text-white/50">Designs</span>
            </span>
          </Link>

          <button
            ref={closeButtonRef}
            onClick={closeMobileMenu}
            className="w-11 h-11 flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] hover:border-cyan-400/50 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group touch-manipulation"
            aria-label="Close navigation menu"
            type="button"
          >
            <X className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors duration-200" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 flex flex-col px-5 sm:px-6 pt-4 pb-8 overflow-y-auto overscroll-contain">
          <nav aria-label="Mobile navigation">
            <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {navLinks.map((link, index) => {
                const active = link.href === '/services' ? isServicesSection : isActive(link.href);
                const number = String(index + 1).padStart(2, '0');
                return (
                  <li key={link.href} className="mobile-menu-item" style={{ animationDelay: `${80 + index * 55}ms` }}>
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(link.href);
                        }}
                        aria-current={active ? 'page' : undefined}
                        className="group flex flex-1 items-baseline gap-4 py-4 touch-manipulation"
                      >
                        <span className="w-6 font-mono text-xs text-cyan-400/60">{number}</span>
                        <span
                          className={`text-[2rem] leading-none font-light tracking-[-0.02em] transition-colors duration-200 ${
                            active
                              ? 'bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent'
                              : 'text-white/90 group-hover:text-white group-active:text-cyan-300'
                          }`}
                        >
                          {link.label}
                        </span>
                      </Link>
                      {link.href === '/services' && (
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          aria-expanded={mobileServicesOpen}
                          aria-controls="mobile-services"
                          aria-label={mobileServicesOpen ? 'Hide services' : 'Show services'}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-cyan-400/50 hover:text-cyan-300 touch-manipulation"
                        >
                          <Plus
                            className={`h-5 w-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-45' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>

                    {link.href === '/services' && (
                      <div
                        id="mobile-services"
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          mobileServicesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <ul className="overflow-hidden pl-10" hidden={!mobileServicesOpen}>
                          {MEGA_SERVICES.map((s) => (
                            <li key={s.href}>
                              <Link
                                href={s.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavigation(s.href);
                                }}
                                className={`flex items-center gap-3 py-2.5 text-base touch-manipulation ${
                                  isActive(s.href) ? 'text-cyan-300' : 'text-white/65 active:text-cyan-300'
                                }`}
                              >
                                <s.icon className="h-4 w-4 text-cyan-400/70" aria-hidden="true" />
                                {s.label}
                              </Link>
                            </li>
                          ))}
                          <li className="pb-4" />
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className="mobile-menu-item mt-auto pt-8 space-y-3"
            style={{ animationDelay: `${80 + navLinks.length * 55}ms` }}
          >
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${BUSINESS_PHONE_E164}`}
                className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-3.5 text-sm font-medium text-white/85 active:scale-[0.98] transition-transform touch-manipulation"
                aria-label={`Call Zenara Designs at ${BUSINESS_PHONE}`}
              >
                <Phone className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                Call
              </a>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-3.5 text-sm font-medium text-white/85 active:scale-[0.98] transition-transform touch-manipulation"
                aria-label={`Email Zenara Designs at ${BUSINESS_EMAIL}`}
              >
                <Mail className="h-4 w-4 text-purple-300" aria-hidden="true" />
                Email
              </a>
            </div>

            <div className="relative w-full rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button
                asChild
                className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-200 w-full h-auto py-4 px-6 text-base font-semibold group active:scale-[0.98] touch-manipulation"
              >
                <Link
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/contact');
                  }}
                  className="flex items-center justify-center gap-2 relative z-10 group-hover:text-white group-active:text-white"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                  <span className="relative z-10 flex items-center gap-2">
                    Let&apos;s Talk
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav
        id="navigation"
        className={`fixed left-1/2 -translate-x-1/2 z-[100] w-[95%] sm:w-[92%] transition-[max-width,top] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          scrolled ? 'max-w-[1080px]' : 'max-w-[1400px]'
        }`}
        style={{ top: scrolled ? 'max(12px, env(safe-area-inset-top, 0px))' : 'max(16px, env(safe-area-inset-top, 0px))' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`relative rounded-full border transition-[background-color,border-color,box-shadow,padding] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            scrolled
              ? 'border-white/10 bg-black/55 backdrop-blur-xl shadow-[0_18px_50px_-18px_rgba(0,0,0,0.9),0_0_40px_-12px_rgba(103,232,249,0.25)] px-3 sm:px-4 lg:px-5 py-1.5'
              : 'border-transparent bg-transparent shadow-none px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5'
          }`}
        >
          {/* Glowing gradient edge that fades in with the pill */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -inset-px rounded-full p-px transition-opacity duration-500 [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] bg-[linear-gradient(110deg,rgba(103,232,249,0.55),rgba(255,255,255,0.08)_35%,rgba(255,255,255,0.08)_65%,rgba(216,180,254,0.55))] ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Zenara Designs, home"
              className="group relative flex items-center gap-2.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              onMouseEnter={() => setLogoTurns((turns) => turns + 1)}
              // Keyboard focus only — a mouse click focuses the link too, and
              // would otherwise stack a second turn on top of the hover's.
              onFocus={(e) => {
                if (e.target.matches(':focus-visible')) setLogoTurns((turns) => turns + 1);
              }}
            >
              {/* Bloom the mark casts while it turns */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2.5 -top-2.5 h-[calc(100%+20px)] aspect-square rounded-full bg-[radial-gradient(circle,rgba(134,49,201,0.35),rgba(47,171,218,0.18)_45%,transparent_70%)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
              />
              <Image
                src={logo}
                alt=""
                className="relative h-7 sm:h-8 w-auto"
                style={{
                  transform: `rotate(${logoTurns * 360}deg)`,
                  // Not the site's usual expo-out — that front-loads ~70% of the
                  // travel into the first 150ms, which turns a full turn into a
                  // flicker. Ease-in-out keeps the whole rotation readable.
                  transition: 'transform 750ms cubic-bezier(0.65, 0, 0.35, 1)',
                }}
                width={32}
                height={32}
                priority
              />
              {/* Wordmark collapses as the bar becomes a pill */}
              <span
                aria-hidden="true"
                className={`overflow-hidden whitespace-nowrap text-base sm:text-lg font-light tracking-wide text-white transition-[max-width,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  scrolled ? 'max-w-0 opacity-0' : 'max-w-[170px] opacity-100'
                }`}
              >
                Zenara <span className="text-white/50">Designs</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div ref={megaRegionRef} className="hidden lg:flex flex-1 justify-center">
              {/* gap rather than space-x: space-x would put a margin on the
                  absolutely positioned indicator and throw off its offset. */}
              <div
                ref={navRowRef}
                className="flex items-center gap-7 xl:gap-9 relative"
                onMouseLeave={settle}
                onBlur={settle}
              >
                {navLinks.map((link, index) => {
                  const active = link.href === '/services' ? isServicesSection : isActive(link.href);
                  const linkEl = (
                    <Link
                      href={link.href}
                      ref={(el) => {
                        linkRefs.current[index] = el;
                      }}
                      onMouseEnter={() => moveTo(index)}
                      onFocus={() => moveTo(index)}
                      aria-current={active ? 'page' : undefined}
                      className={`relative py-1.5 font-light text-sm xl:text-[15px] transition-colors duration-300 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${
                        active || (link.href === '/services' && megaOpen) ? 'text-cyan-300' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );

                  if (link.href !== '/services') return <span key={link.href}>{linkEl}</span>;

                  return (
                    <div key={link.href} className="flex items-center gap-1" onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
                      {linkEl}
                      <button
                        ref={megaButtonRef}
                        type="button"
                        onClick={() => (megaOpen ? setMegaOpen(false) : openMega())}
                        aria-expanded={megaOpen}
                        aria-controls="services-mega-menu"
                        aria-label={megaOpen ? 'Hide services menu' : 'Show services menu'}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition-colors hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                      >
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Mega menu — positioned against the whole bar. The top
                          padding is a hover bridge from the link to the panel. */}
                      <div
                        id="services-mega-menu"
                        className={`absolute left-1/2 top-full w-[min(860px,calc(100vw-48px))] -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          megaOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-2'
                        }`}
                      >
                        {/* Opaque on purpose: it sits inside the bar, and a backdrop-filter
                              nested in another backdrop-filter can't blur the page. */}
                          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#05080f] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)]">
                          <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
                          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl" />

                          <div className="relative grid grid-cols-[1.6fr_1fr] gap-2 p-3">
                            <div className="p-3">
                              <p className="mb-3 px-2 text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400/70">Services</p>
                              <ul className="grid grid-cols-2 gap-1">
                                {MEGA_SERVICES.map((s) => (
                                  <li key={s.href}>
                                    <Link
                                      href={s.href}
                                      className={`group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.05] focus-visible:outline-none ${
                                        isActive(s.href) ? 'bg-white/[0.05]' : ''
                                      }`}
                                    >
                                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan-300 transition-colors group-hover/item:border-cyan-400/40">
                                        <s.icon className="h-4 w-4" aria-hidden="true" />
                                      </span>
                                      <span>
                                        <span className="block text-sm font-medium text-white transition-colors group-hover/item:text-cyan-300">
                                          {s.label}
                                        </span>
                                        <span className="block text-xs leading-snug text-white/50">{s.blurb}</span>
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                                <li>
                                  <Link
                                    href="/services"
                                    className="group/item flex h-full items-center gap-2 rounded-xl p-2.5 text-sm text-white/60 transition-colors hover:text-cyan-300 focus-visible:text-cyan-300 focus-visible:outline-none"
                                  >
                                    All services
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/item:translate-x-0.5" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                              <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.2em] text-purple-300/70">Industries</p>
                              <ul className="space-y-1">
                                {MEGA_INDUSTRIES.map((ind) => (
                                  <li key={ind.href}>
                                    <Link
                                      href={ind.href}
                                      className="group/item flex items-center gap-3 rounded-lg py-2 text-sm text-white/75 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                                    >
                                      <ind.icon className="h-4 w-4 text-purple-300/80" aria-hidden="true" />
                                      {ind.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>

                              <Link
                                href="/projects"
                                className="group/item mt-auto flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 p-4 transition-colors hover:border-cyan-400/40 focus-visible:border-cyan-400/40 focus-visible:outline-none"
                              >
                                <span>
                                  <span className="block text-sm font-medium text-white">See our work</span>
                                  <span className="block text-xs text-white/50">Case studies from GTA clients</span>
                                </span>
                                <ArrowUpRight className="h-4 w-4 text-cyan-300 transition-transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5" aria-hidden="true" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* The comet: one body that travels the row and stretches to fit */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 will-change-transform"
                  style={{
                    width: `${indicator.w}px`,
                    transform: `translateX(${indicator.x}px)`,
                    opacity: indicator.visible ? 1 : 0,
                    transition:
                      'transform 480ms cubic-bezier(0.22, 1, 0.36, 1), width 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms ease-out',
                  }}
                >
                  {/* light it throws up onto the label */}
                  <span className="absolute inset-x-0 bottom-0 h-6 rounded-full bg-[radial-gradient(65%_100%_at_50%_100%,rgba(103,232,249,0.16),transparent_72%)]" />
                  {/* the streak, plus a blurred purple pass for chromatic bleed */}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                  <span className="absolute inset-x-0 -bottom-0.5 h-px blur-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                <Button
                  asChild
                  className="w-full relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-5 xl:px-6 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold group"
                >
                  <Link href="/contact" className="flex items-center gap-1.5 xl:gap-2 relative z-10 group-hover:text-white">
                    <span className="relative z-10">Let&apos;s Talk</span>
                    <ArrowRight className="h-3.5 w-3.5 xl:h-4 xl:w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    {/* Hover background animation - left to right */}
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Tap-to-call + menu button (below lg) */}
            {!isMobileMenuOpen && (
              <div className="flex items-center gap-1 lg:hidden">
                {/* Tap-to-call — high-intent mobile visitors arriving from search
                    previously had to open the menu, reach /contact and scroll, or
                    scroll to the footer, before they could find a phone number. */}
                <a
                  href={`tel:${BUSINESS_PHONE_E164}`}
                  className="w-11 h-11 flex items-center justify-center rounded-full text-white hover:text-cyan-300 active:scale-95 transition-all duration-200 touch-manipulation"
                  aria-label={`Call Zenara Designs at ${BUSINESS_PHONE}`}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </a>
                <button
                  className="relative w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 bg-white/[0.04] group touch-manipulation active:scale-95 transition-transform duration-200"
                  onClick={openMobileMenu}
                  aria-label="Open navigation menu"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  type="button"
                >
                  <span className="h-px w-5 bg-white transition-all duration-200 group-hover:bg-cyan-300" />
                  <span className="h-px w-3.5 self-center translate-x-[3px] bg-white transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:bg-cyan-300" />
                </button>
              </div>
            )}
          </div>

          {/* Scroll progress — along the pill's bottom edge once scrolled */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-8 -bottom-px h-px overflow-hidden rounded-full transition-opacity duration-500 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span
              ref={progressRef}
              className="block h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300"
              style={{ transform: 'scaleX(0)' }}
            />
          </span>
        </div>
      </nav>

      {/* Mobile Navigation - Rendered via Portal */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(renderMobileMenu(), document.body)}
    </>
  );
};

export default Navbar;
