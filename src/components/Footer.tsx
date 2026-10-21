import React from 'react';
import { Phone, MessageSquare, MapPin, ExternalLink, Shield, ArrowUp } from 'lucide-react';
import { COMPANY_INFO, INITIAL_SERVICES } from '../data/companyData';

interface FooterProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="inline-block group">
              <span className="text-2xl font-extrabold tracking-wider text-white group-hover:text-sky-400 transition-colors leading-none block">
                PELSWIJK
              </span>
              <span className="text-[10px] font-semibold tracking-[0.24em] text-slate-400 group-hover:text-slate-200 transition-colors mt-1 block uppercase">
                GENERAL CONTRACTORS
              </span>
            </a>

            <p className="text-slate-300 leading-relaxed text-xs">
              Dependable HVAC solutions, air conditioning installation, maintenance, repair, and general contracting services in Georgetown, Guyana.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>48 Sherriff St, Georgetown, Guyana</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-sky-300">
                <span className="text-slate-500">Plus Code:</span>
                <span>RV67+X5 Georgetown, Guyana</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_INFO.getServiceWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 rounded-md font-semibold text-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.rawPhone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-md font-semibold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Office</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Col (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2">
              {['Home', 'About Us', 'HVAC Services', 'Projects', 'Industries', 'How It Works', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* HVAC Services Col (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              HVAC Services
            </h4>
            <ul className="space-y-2">
              {INITIAL_SERVICES.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => onOpenQuoteModal(srv.title)}
                    className="hover:text-sky-300 text-left transition-colors cursor-pointer"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours & Fast Quote (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Office Hours & Quotes
            </h4>
            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
              <span className="text-slate-200 font-semibold block">Monday – Friday</span>
              <span className="text-sky-400 font-mono text-[11px] block">8:00 AM – 5:00 PM</span>
              <span className="text-[10px] text-slate-400 block italic leading-tight">
                *Weekly schedule subject to confirmation with office.
              </span>
            </div>

            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full mt-2 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Get a Free Quote
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} PELSWIJK GENERAL CONTRACTORS. All rights reserved. Georgetown, Guyana.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-sky-400" />
              <span>Staff Portal</span>
            </button>
            <span className="text-slate-800">·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
