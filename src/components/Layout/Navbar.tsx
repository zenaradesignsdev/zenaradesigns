import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToTop } from '@/hooks';
import { NAVIGATION_LINKS, BREAKPOINTS } from '@/lib/constants';
import logo from '@/assets/zenaralogo-transparentbg.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 90);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open and manage focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the first focusable element in the mobile menu
      const firstFocusable = document.querySelector('#mobile-menu button, #mobile-menu a');
      if (firstFocusable) {
        (firstFocusable as HTMLElement).focus();
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = NAVIGATION_LINKS;

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav 
      id="navigation"
      className="fixed top-0 left-0 right-0 z-50 navbar-glass" 
      style={{ background: 'transparent' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={scrollToTop}>
            <img src={logo} alt="Zenara Designs - Professional Web Design Agency Toronto" className="h-12 w-auto" width="48" height="48" loading="eager" decoding="async" />
            <span className={`font-normal text-xl transition-colors ${isScrolled ? 'text-white' : 'text-foreground'}`}>Zenara Designs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={scrollToTop}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? 'text-primary' : isScrolled ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="btn-hero">
              <Link to="/contact" onClick={scrollToTop}>Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-1 group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {/* Animated Hamburger Lines */}
            <div className={`w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Header - Keep existing navbar structure */}
            <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                  {/* Logo */}
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2" 
                    onClick={() => {
                      setIsOpen(false);
                      scrollToTop();
                    }}
                  >
                    <img src={logo} alt="Zenara Designs - Professional Web Design Agency Toronto" className="h-12 w-auto" width="48" height="48" loading="eager" decoding="async" />
                    <span className="font-normal text-xl text-slate-800">Zenara Designs</span>
                  </Link>

                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-6 h-6 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Full Screen Content Area */}
            <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-white via-slate-50 to-cyan-50 overflow-y-auto">
              {/* Navigation Content */}
              <div className="flex flex-col items-center justify-start min-h-full px-6 py-8">
                <div className="w-full max-w-sm space-y-4">
                  {/* Navigation Links */}
                  <div className="space-y-3">
                    {navLinks.map((link, index) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`block text-center py-3 px-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                          isActive(link.href) 
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25' 
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        onClick={() => {
                          setIsOpen(false);
                          scrollToTop();
                        }}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeInUp 0.6s ease-out forwards',
                          opacity: 0,
                          transform: 'translateY(20px)'
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div 
                    className="pt-4"
                    style={{
                      animationDelay: '600ms',
                      animation: 'fadeInUp 0.6s ease-out forwards',
                      opacity: 0,
                      transform: 'translateY(20px)'
                    }}
                  >
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30"
                    >
                      <Link 
                        to="/contact" 
                        onClick={() => {
                          setIsOpen(false);
                          scrollToTop();
                        }}
                      >
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;