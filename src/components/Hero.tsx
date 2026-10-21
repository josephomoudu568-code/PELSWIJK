import React from 'react';
import { ArrowRight, Phone, MessageSquare, CheckCircle2, MapPin, Building, Wrench } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-slate-950">
      {/* Background Photography with measured dark scrim for 4.5:1 contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_hvac_technician_1792613099068.jpg"
          alt="Professional HVAC technician installing commercial air conditioning unit"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Layered dark scrim for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 w-full my-auto">
        <div className="max-w-3xl">
          
          {/* Location & Trust Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-700/80 text-xs sm:text-sm text-sky-400 font-medium mb-6 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Serving Georgetown & Guyana</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">48 Sherriff St, Georgetown</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance mb-6">
            Reliable HVAC Solutions.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">
              Professional Contracting.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal mb-8">
            Keep your home or business comfortable with dependable HVAC solutions and professional contracting services from PELSWIJK GENERAL CONTRACTORS in Georgetown, Guyana.
          </p>

          {/* Call to action cluster */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-lg shadow-amber-500/10 transition-all uppercase tracking-wider cursor-pointer group"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg transition-colors backdrop-blur-sm"
            >
              <span>Explore Our Services</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.rawPhone}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm sm:text-base font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+592 671 2370</span>
            </a>
          </div>

          {/* Core Guiding Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Precision Diagnostics & Sizing</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Residential & Commercial Focus</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Direct WhatsApp Communication</span>
            </div>
          </div>

        </div>
      </div>

      {/* Information Strip beneath the hero */}
      <div className="relative z-10 bg-slate-900/90 border-t border-slate-800/80 py-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 text-xs sm:text-sm font-semibold tracking-wide text-slate-200">
              <div className="flex items-center gap-2 text-sky-300">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span className="uppercase tracking-wider">Residential Solutions</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2 text-sky-300">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="uppercase tracking-wider">Commercial HVAC</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2 text-sky-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="uppercase tracking-wider">Professional Service</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>Georgetown, Guyana</span>
              <span>·</span>
              <a
                href={COMPANY_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline font-mono text-[11px]"
              >
                RV67+X5
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
