import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { PLACEHOLDERS } from '../data/placeholders';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 35);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Partner Program', path: '/partner-program' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/80'
          : 'bg-[#F7F8FC]/90 backdrop-blur-xs py-5'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="outline-hidden focus-visible:ring-2 focus-visible:ring-[#3B2FD0] rounded-lg">
          <Logo showTagline size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-700" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `transition-colors duration-200 hover:text-[#3B2FD0] py-1 ${
                  isActive ? 'text-[#3B2FD0] font-semibold border-b-2 border-[#3B2FD0]' : 'text-slate-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full border-2 border-[#3B2FD0] text-[#3B2FD0] hover:bg-[#3B2FD0] hover:text-white font-semibold text-sm transition-all duration-200 cursor-pointer"
          >
            Login
          </Link>
          <a
            href={PLACEHOLDERS.APP_URL}
            className="px-5 py-2.5 rounded-full bg-[#14C3A2] text-[#1F2433] hover:bg-[#10B092] font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 active:scale-98"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={PLACEHOLDERS.APP_URL}
            className="px-3.5 py-1.5 rounded-full bg-[#14C3A2] text-[#1F2433] font-bold text-xs shadow-xs"
          >
            Start Free
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-white z-50 flex flex-col p-6 animate-in fade-in duration-200 overflow-y-auto">
          <nav className="flex flex-col space-y-4 text-lg font-medium text-slate-800" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `py-2 border-b border-slate-100 ${
                    isActive ? 'text-[#3B2FD0] font-bold' : 'text-slate-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full border-2 border-[#3B2FD0] text-[#3B2FD0] font-bold text-base"
            >
              Login
            </Link>
            <a
              href={PLACEHOLDERS.APP_URL}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full bg-[#14C3A2] text-[#1F2433] font-bold text-base shadow-md"
            >
              Start Free
            </a>
          </div>

          <div className="mt-auto pt-6 text-xs text-slate-400 text-center">
            Free plan available · No credit card needed
          </div>
        </div>
      )}
    </header>
  );
};
