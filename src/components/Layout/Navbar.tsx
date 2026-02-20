import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToTop } from '@/hooks';
import { NAVIGATION_LINKS } from '@/lib/constants';
import logo from '@/assets/zenaralogov2.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu handler
  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  // Open menu handler
  const openMenu = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen && !isClosing) {
      document.body.style.overflow = 'hidden';
      // Prevent scroll on iOS
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      // Focus the close button when menu opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen, isClosing]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isClosing) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, isClosing]);

  // Prevent background scroll on touch devices
  useEffect(() => {
    if (isOpen && !isClosing) {
      const preventScroll = (e: TouchEvent) => {
        if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
          e.preventDefault();
        }
      };
      document.addEventListener('touchmove', preventScroll, { passive: false });
      return () => document.removeEventListener('touchmove', preventScroll);
    }
  }, [isOpen, isClosing]);

  const navLinks = NAVIGATION_LINKS;
  const isActive = (href: string) => location.pathname === href;

  // Mobile menu component
  const MobileMenu = () => {
    if (!isOpen) return null;

    return (
      <div 
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[9999] ${
          isClosing ? 'animate-menu-close' : 'animate-menu-open'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        {/* Full Screen Background */}
        <div 
          className="absolute inset-0 bg-black"
          onClick={closeMenu}
          aria-hidden="true"
        >
          {/* Gradient Background Layers */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
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
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        {/* Mobile Menu Content */}
        <div 
          className={`relative h-full flex flex-col z-10 ${
            isClosing ? 'animate-menu-content-close' : 'animate-menu-content-open'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-2" 
              onClick={() => {
                closeMenu();
                scrollToTop();
              }}
            >
              <img 
                src={logo} 
                alt="Zenara Designs - Professional Web Design Agency Toronto" 
                className="h-8 sm:h-10 w-auto" 
                width="40" 
                height="40" 
                loading="eager" 
                decoding="async" 
              />
            </Link>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeMenu}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/90 backdrop-blur-sm border border-slate-800/50 hover:border-cyan-400/50 hover:bg-slate-800/90 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent relative overflow-hidden group touch-manipulation"
              aria-label="Close navigation menu"
              type="button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 group-hover:text-cyan-300 transition-colors duration-300" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Content - Centered */}
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto overscroll-contain">
            {/* Navigation Links */}
            <nav className="space-y-2 mb-6 sm:mb-8" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-light text-base sm:text-lg transition-all duration-200 relative overflow-hidden group touch-manipulation ${
                    isActive(link.href) 
                      ? 'bg-slate-900/90 backdrop-blur-sm border border-cyan-400/50 text-cyan-300' 
                      : 'text-white/90 hover:text-white active:text-white hover:bg-slate-900/50 active:bg-slate-900/70 border border-transparent hover:border-slate-800/50'
                  } ${isClosing ? '' : 'mobile-menu-item'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    setTimeout(() => {
                      window.location.href = link.href;
                      scrollToTop();
                    }, 100);
                  }}
                  style={{
                    animationDelay: isClosing ? '0ms' : `${index * 50}ms`,
                  }}
                >
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                  <span className="relative z-10 flex items-center justify-between">
                    <span>{link.label}</span>
                    {isActive(link.href) && (
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0 ml-2"></div>
                    )}
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              <div className="relative w-full rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                <Button 
                  asChild 
                  className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-200 w-full py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-semibold group active:scale-[0.98] touch-manipulation"
                >
                  <Link 
                    to="/contact" 
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      setTimeout(() => {
                        window.location.href = '/contact';
                        scrollToTop();
                      }, 100);
                    }}
                    className="flex items-center justify-center gap-2 relative z-10 group-hover:text-white group-active:text-white"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      Let's Talk
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1 group-active:translate-x-1" aria-hidden="true" />
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
              <img src={logo} alt="Zenara Designs - Professional Web Design Agency Toronto" className="h-6 sm:h-8 w-auto" width="32" height="32" loading="eager" decoding="async" />
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
                <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-5 xl:px-6 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold group">
                  <Link to="/contact" onClick={scrollToTop} className="flex items-center gap-1.5 xl:gap-2 relative z-10 group-hover:text-white">
                    <span className="relative z-10">Let's Talk</span>
                    <ArrowRight className="h-3.5 w-3.5 xl:h-4 xl:w-4 relative z-10" />
                    {/* Hover background animation - left to right */}
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button - Only visible when menu is closed */}
            {!isOpen && (
              <button
                className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center space-y-1.5 z-50 group touch-manipulation active:scale-95 transition-transform duration-200"
                onClick={openMenu}
                aria-label="Open navigation menu"
                aria-expanded={false}
                aria-controls="mobile-menu"
                type="button"
              >
                {/* Hamburger Lines */}
                <div className="w-5 h-0.5 bg-white transition-all duration-200 group-hover:bg-cyan-300"></div>
                <div className="w-5 h-0.5 bg-white transition-all duration-200 group-hover:bg-cyan-300"></div>
                <div className="w-5 h-0.5 bg-white transition-all duration-200 group-hover:bg-cyan-300"></div>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Rendered via Portal to document.body */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <MobileMenu />,
        document.body
      )}
    </>
  );
};

export default Navbar;
