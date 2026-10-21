import React from 'react';
import { MapPin, Phone, MessageSquare, Check, Shield, ArrowRight, UserCheck, Award, Building2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="about" className="py-20 bg-slate-900 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual & Verification Readiness Card */}
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
              <img
                src="/src/assets/images/project_georgetown_commercial_1792613100905.jpg"
                alt="Commercial and residential HVAC contractor in Georgetown Guyana"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-1.5 text-sky-400">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>48 Sherriff St, Georgetown, Guyana</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">RV67+X5</span>
                </div>
              </div>
            </div>

            {/* Editable Profile Notice Container */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-200 font-bold mb-1">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>Verified Transparency & Editable Profile</span>
              </div>
              <p className="leading-relaxed">
                PELSWIJK GENERAL CONTRACTORS maintains an open, verifiable profile. Company history, team members, licenses, and trade credentials can be configured and updated as verified by the business owner.
              </p>
            </div>
          </div>

          {/* Right Column: Copy verbatim from brief & approach */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
              <span>About The Company</span>
              <span>·</span>
              <span>Georgetown, Guyana</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Professional Contracting Built Around Your Needs
            </h2>

            <div className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              “PELSWIJK GENERAL CONTRACTORS serves customers in Georgetown, Guyana, with a focus on professional contracting solutions and HVAC related needs. We aim to help residential and commercial clients find practical solutions for their properties through clear communication and dependable service.”
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Whether diagnosing cooling inefficiencies in a high-traffic retail environment, setting up quiet inverter split air conditioning systems for private residences, or executing mechanical ductwork, our focus remains on solid workmanship and clear project execution.
            </p>

            {/* Approach Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Practical Equipment Right-Sizing</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Honest Scope Clarification</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Direct Site Assessments in Georgetown</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Clean & Respectful Installation</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={COMPANY_INFO.getServiceWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Message on WhatsApp</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.rawPhone}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+592 671 2370</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
