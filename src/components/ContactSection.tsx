import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ContactSectionProps {
  onOpenQuoteModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="contact" className="py-20 bg-slate-950 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
            <span>Direct Communication</span>
            <span>·</span>
            <span>Georgetown Headquarters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact & Office Location
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Reach PELSWIJK GENERAL CONTRACTORS for inquiries, quote submissions, or to coordinate a site evaluation in Georgetown.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Details Card */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-5">
              
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Physical Address
                  </h4>
                  <p className="text-sm font-semibold text-white">
                    48 Sherriff Street
                  </p>
                  <p className="text-xs text-slate-300">
                    Georgetown, Guyana
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-sky-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    <span>Plus Code:</span>
                    <span className="font-bold">RV67+X5 Georgetown, Guyana</span>
                  </div>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Telephone
                  </h4>
                  <a
                    href={`tel:${COMPANY_INFO.rawPhone}`}
                    className="text-base font-extrabold text-white hover:text-amber-400 transition-colors"
                  >
                    +592 671 2370
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click to call directly from mobile or desktop
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Instant Messaging
                  </h4>
                  <a
                    href={COMPANY_INFO.getServiceWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors block"
                  >
                    Message on WhatsApp
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fast response for inquiries and photo shares
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Operating Schedule
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">
                    Monday – Friday: 8:00 AM – 5:00 PM
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal italic">
                    Note: Supplied listing indicates closing at 5:00 PM; please confirm full holiday/weekend arrangements with office.
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${COMPANY_INFO.rawPhone}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Now</span>
              </a>

              <a
                href={COMPANY_INFO.getServiceWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <button
              onClick={onOpenQuoteModal}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              <span>Online Quote Request Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* Interactive Map / Plus Code Column (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between shadow-xl">
            
            {/* Map Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Location Map · 48 Sherriff Street
                </span>
              </div>
              <a
                href={COMPANY_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-semibold"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Map iframe with exact Georgetown coordinate / Plus Code */}
            <div className="relative h-96 sm:h-[420px] bg-slate-950 w-full overflow-hidden">
              <iframe
                title="PELSWIJK GENERAL CONTRACTORS Location"
                src="https://maps.google.com/maps?q=48+Sherriff+Street,+Georgetown,+Guyana&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-[0.95] opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay location pin card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-slate-900/95 backdrop-blur-md p-3.5 rounded-lg border border-slate-700 shadow-2xl text-xs space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>PELSWIJK GENERAL CONTRACTORS</span>
                </div>
                <div className="text-slate-300">48 Sherriff St, Georgetown, Guyana</div>
                <div className="text-[11px] font-mono text-sky-400">Plus Code: RV67+X5</div>
              </div>
            </div>

            {/* Map footer navigation assistance */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <span>Located along the Sherriff Street commercial corridor in Georgetown.</span>
              <a
                href={COMPANY_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 font-medium inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
