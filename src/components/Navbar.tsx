import React, { useState } from 'react';
import { Phone, MessageSquare, Menu, X, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'HVAC Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Industries', href: '#industries' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top emergency / quick contact strip */}
      <div className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800/80 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[13px]">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>48 Sherriff St, Georgetown, Guyana</span>
              <span className="text-slate-500 hidden md:inline">·</span>
              <span className="text-slate-400 text-xs hidden md:inline">Plus Code: RV67+X5</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[13px]">
            <a
              href={`tel:${COMPANY_INFO.rawPhone}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors font-medium whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Call: +592 671 2370</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={COMPANY_INFO.getServiceWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-6">
          
          {/* Zone 1: Text-based Logo (PELSWIJK main wordmark + GENERAL CONTRACTORS underneath) */}
          <a
            href="#home"
            className="group flex flex-col justify-center focus:outline-none shrink-0"
            aria-label="PELSWIJK GENERAL CONTRACTORS Home"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white group-hover:text-sky-400 transition-colors leading-none">
              PELSWIJK
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 group-hover:text-slate-200 transition-colors mt-1 uppercase">
              GENERAL CONTRACTORS
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap hover:text-white transition-colors relative py-1 text-[14px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Standout Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Call button visible on tablets/mobile */}
            <a
              href={`tel:${COMPANY_INFO.rawPhone}`}
              className="hidden sm:inline-flex lg:hidden items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Us</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="relative inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-sm hover:shadow-md hover:shadow-amber-500/10 transition-all duration-150 uppercase tracking-wide whitespace-nowrap cursor-pointer"
            >
              <span>GET A FREE QUOTE</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a
                href={`tel:${COMPANY_INFO.rawPhone}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-medium text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call +592 671 2370</span>
              </a>

              <a
                href={COMPANY_INFO.getServiceWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full mt-1 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-sm transition-colors uppercase tracking-wider"
              >
                REQUEST A FREE QUOTE
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-center text-xs text-slate-500 hover:text-slate-400 py-1"
              >
                Staff Portal Access
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
