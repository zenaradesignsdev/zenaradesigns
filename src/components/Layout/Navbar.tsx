import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToTop } from '@/hooks';
import { NAVIGATION_LINKS } from '@/lib/constants';
import logo from '@/assets/zenaralogov2.svg';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousBodyOverflow = useRef<string>('');

  const navLinks = NAVIGATION_LINKS;
  const isActive = (href: string) => location.pathname === href;

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
        menuElement.classList.remove('mobile-menu-exiting');
      }, 300);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  // Handle navigation with menu close - proper React Router navigation
  const handleNavigation = (href: string) => {
    closeMobileMenu();
    // Use requestAnimationFrame for smoother transition
    requestAnimationFrame(() => {
      setTimeout(() => {
        navigate(href);
        scrollToTop();
      }, 200);
    });
  };

  // Prevent body scroll when mobile menu is open - optimized for mobile devices
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
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
      // Restore scroll
      const scrollY = document.body.style.top;
      
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
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
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

  // Mobile Menu Component
  const MobileMenu = () => {
    if (!isMobileMenuOpen) return null;

    return (
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="lg:hidden fixed inset-0 z-[9999] mobile-menu-container"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Backdrop */}
        <div
          className="mobile-menu-backdrop"
          onClick={closeMobileMenu}
          aria-hidden="true"
        >
          {/* Clean gradient background - minimal decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/98 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/20 to-black"></div>
        </div>

        {/* Menu Content */}
        <div className="mobile-menu-content">
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 flex-shrink-0">
            <Link
              to="/"
              className="flex items-center touch-manipulation"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/');
              }}
            >
              <img
                src={logo}
                alt="Zenara Designs"
                className="h-9 sm:h-10 w-auto"
                width="40"
                height="40"
                loading="eager"
                decoding="async"
              />
            </Link>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeMobileMenu}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/50 hover:bg-slate-700/80 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 relative group touch-manipulation"
              aria-label="Close navigation menu"
              type="button"
            >
              <X className="w-6 h-6 text-white group-hover:text-cyan-300 transition-colors duration-200" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 flex flex-col justify-center px-5 sm:px-6 py-8 overflow-y-auto overscroll-contain">
            {/* Navigation Links */}
            <nav className="space-y-3 mb-8" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(link.href);
                  }}
                  className={`mobile-menu-item block py-4 px-5 rounded-xl font-light text-lg transition-all duration-200 relative overflow-hidden group touch-manipulation min-h-[56px] flex items-center ${
                    isActive(link.href)
                      ? 'bg-slate-800/60 border border-cyan-400/40 text-cyan-300'
                      : 'text-white/90 hover:text-white active:text-white hover:bg-slate-800/40 active:bg-slate-800/60 border border-transparent hover:border-slate-700/30'
                  }`}
                  style={{
                    animationDelay: `${index * 60}ms`,
                  }}
                >
                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                  <span className="relative z-10 flex items-center justify-between w-full">
                    <span>{link.label}</span>
                    {isActive(link.href) && (
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 ml-3"></div>
                    )}
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="pt-2">
              <div className="relative w-full rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                <Button
                  asChild
                  className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-200 w-full py-4 px-6 text-base font-semibold group active:scale-[0.98] touch-manipulation"
                >
                  <Link
                    to="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/contact');
                    }}
                    className="flex items-center justify-center gap-2 relative z-10 group-hover:text-white group-active:text-white"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      Let's Talk
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-active:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <nav 
      id="navigation"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] md:w-[88%] lg:w-[85%] xl:w-[82%] max-w-[1400px]"
      role="navigation"
      aria-label="Main navigation"
    >
        <div className="bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl px-4 sm:px-6 lg:px-8 xl:px-10 py-2 sm:py-2.5">
          <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Logo */}
            <Link to="/" className="flex items-center" onClick={scrollToTop}>
              <img
                src={logo}
                alt="Zenara Designs - Professional Web Design Agency Toronto"
                className="h-6 sm:h-8 w-auto"
                width="32"
                height="32"
                loading="eager"
                decoding="async"
              />
          </Link>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-px bg-gradient-to-b from-transparent via-cyan-400/60 via-purple-400/60 to-transparent mx-8 xl:mx-10"></div>

          {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-start">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={scrollToTop}
                  className={`font-light text-sm xl:text-base transition-colors hover:text-cyan-300 ${
                    isActive(link.href) ? 'text-cyan-300' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
              <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                    <Button 
                      asChild 
                  className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-5 xl:px-6 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold group"
                    >
                      <Link 
                        to="/contact" 
                    onClick={scrollToTop}
                    className="flex items-center gap-1.5 xl:gap-2 relative z-10 group-hover:text-white"
                  >
                    <span className="relative z-10">Let's Talk</span>
                    <ArrowRight className="h-3.5 w-3.5 xl:h-4 xl:w-4 relative z-10" />
                    {/* Hover background animation - left to right */}
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      </Link>
                    </Button>
                  </div>
                </div>

            {/* Mobile Menu Button */}
            {!isMobileMenuOpen && (
              <button
                className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 z-50 group touch-manipulation active:scale-95 transition-transform duration-200"
                onClick={openMobileMenu}
                aria-label="Open navigation menu"
                aria-expanded={false}
                aria-controls="mobile-menu"
                type="button"
              >
                {/* Hamburger Lines */}
                <div className="w-6 h-0.5 bg-white transition-all duration-200 group-hover:bg-cyan-300"></div>
                <div className="w-6 h-0.5 bg-white transition-all duration-200 group-hover:bg-cyan-300"></div>
                <div className="w-6 h-0.5 bg-white transition-all duration-200 group-hover:bg-cyan-300"></div>
              </button>
            )}
          </div>
      </div>
    </nav>

      {/* Mobile Navigation - Rendered via Portal */}
      {isMobileMenuOpen &&
        typeof document !== 'undefined' &&
        createPortal(<MobileMenu />, document.body)}
    </>
  );
};

export default Navbar;
