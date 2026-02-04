import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToTop } from '@/hooks';
import { NAVIGATION_LINKS } from '@/lib/constants';
import logo from '@/assets/zenaralogo-transparentbg.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavButtonHovered, setIsNavButtonHovered] = useState(false);
  const [isMobileButtonHovered, setIsMobileButtonHovered] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu handler
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Prevent body scroll when mobile menu is open and manage focus
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus the close button when menu opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const navLinks = NAVIGATION_LINKS;
  const isActive = (href: string) => location.pathname === href;

  // Mobile menu component
  const MobileMenu = () => (
    <div 
      ref={mobileMenuRef}
      id="mobile-menu"
      className="lg:hidden fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
    >
      {/* Full Screen Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        onClick={closeMenu}
      >
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle"></div>
          <div className="absolute top-32 right-24 w-1 h-1 bg-purple-300 rounded-full animate-twinkle delay-1000"></div>
          <div className="absolute top-48 left-1/3 w-1 h-1 bg-teal-300 rounded-full animate-twinkle delay-2000"></div>
          <div className="absolute top-24 right-1/3 w-1 h-1 bg-violet-300 rounded-full animate-twinkle delay-500"></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
      
      {/* Mobile Menu Content */}
      <div className="relative h-full flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
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
              className="h-8 w-auto" 
              width="32" 
              height="32" 
              loading="eager" 
              decoding="async" 
            />
            <span className="font-semibold text-lg text-white">Zenara Designs</span>
          </Link>

          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={closeMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Navigation Content - Centered */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8 overflow-y-auto">
          {/* Navigation Links */}
          <nav className="space-y-3 mb-8" aria-label="Mobile navigation">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block py-4 px-6 rounded-xl font-medium text-lg transition-all duration-300 ${
                  isActive(link.href) 
                    ? 'bg-white/20 text-cyan-300 border-l-4 border-cyan-400' 
                    : 'text-white hover:bg-white/10 hover:text-cyan-300'
                }`}
                onClick={() => {
                  closeMenu();
                  scrollToTop();
                }}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="pt-4">
            <div 
              className={`relative inline-block rounded-full p-[3px] transition-all duration-300 w-full ${
                isMobileButtonHovered 
                  ? 'bg-purple-500' 
                  : 'bg-gradient-to-r from-cyan-400 via-purple-500 to-violet-500'
              }`}
              onMouseEnter={() => setIsMobileButtonHovered(true)}
              onMouseLeave={() => setIsMobileButtonHovered(false)}
            >
              <Button 
                asChild 
                className="w-full bg-black hover:bg-purple-500 rounded-full text-white font-semibold py-4 px-6 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <Link 
                  to="/contact" 
                  onClick={() => {
                    closeMenu();
                    scrollToTop();
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  Let's Talk
                  <ArrowRight className="h-5 w-5" />
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
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] md:w-[88%] lg:w-[85%] xl:w-[82%] max-w-[1400px]" 
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl px-4 sm:px-6 lg:px-8 xl:px-10 py-2 sm:py-2.5">
          <div className="flex items-center justify-between h-11 sm:h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" onClick={scrollToTop}>
              <img src={logo} alt="Zenara Designs - Professional Web Design Agency Toronto" className="h-5 sm:h-6 w-auto" width="24" height="24" loading="eager" decoding="async" />
              <span className="font-semibold text-sm sm:text-base text-white">Zenara Designs</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={scrollToTop}
                  className={`font-medium text-sm xl:text-base transition-colors hover:text-cyan-300 ${
                    isActive(link.href) ? 'text-cyan-300' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <div 
                className={`relative inline-block rounded-full p-[2px] transition-all duration-300 ${
                  isNavButtonHovered 
                    ? 'bg-purple-500' 
                    : 'bg-gradient-to-r from-cyan-400 via-purple-500 to-violet-500'
                }`}
                onMouseEnter={() => setIsNavButtonHovered(true)}
                onMouseLeave={() => setIsNavButtonHovered(false)}
              >
                <Button asChild className="bg-black hover:bg-purple-500 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 px-5 xl:px-6 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold">
                  <Link to="/contact" onClick={scrollToTop} className="flex items-center gap-1.5 xl:gap-2">
                    Let's Talk
                    <ArrowRight className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button - Only visible when menu is closed */}
            {!isOpen && (
              <button
                className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center space-y-1.5 z-50"
                onClick={() => setIsOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={false}
                aria-controls="mobile-menu"
              >
                {/* Hamburger Lines */}
                <div className="w-5 h-0.5 bg-white transition-all duration-300"></div>
                <div className="w-5 h-0.5 bg-white transition-all duration-300"></div>
                <div className="w-5 h-0.5 bg-white transition-all duration-300"></div>
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