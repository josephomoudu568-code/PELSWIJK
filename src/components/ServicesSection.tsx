import React, { useState } from 'react';
import { ArrowRight, MessageSquare, Check, X, Shield, Wrench, ChevronRight, Info } from 'lucide-react';
import { INITIAL_SERVICES, ServiceItem, COMPANY_INFO } from '../data/companyData';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 bg-slate-900 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
            <span>Core Capabilities</span>
            <span>·</span>
            <span>Georgetown, Guyana</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Specialized HVAC & Contracting Services
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Engineered cooling solutions and contracting services tailored to residential residences, commercial complexes, and industrial spaces in Guyana.
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 w-fit">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Service specifications are customized per site inspection. Contact us to verify your project requirements.</span>
          </div>
        </div>

        {/* Services Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INITIAL_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 transition-all duration-200 overflow-hidden shadow-md hover:shadow-xl hover:shadow-sky-500/5"
            >
              {/* Card Image Container */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Clean unboxed tag */}
                <div className="absolute top-3 left-3 text-[11px] font-semibold text-sky-300 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-700/80 backdrop-blur-sm">
                  {service.isConfirmed ? 'Service Available' : 'Suggested Service'}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Bullet checklist preview */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-400">
                    {service.keyPoints.slice(0, 2).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors py-1 cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={COMPANY_INFO.getServiceWhatsAppUrl(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors py-1 font-medium"
                      title="Enquire on WhatsApp with this service"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Learn More Detailed Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="relative h-48 sm:h-64">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950/80 text-slate-300 hover:text-white rounded-full border border-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs uppercase tracking-wider text-sky-400 font-bold">
                  Service Overview
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Scope & Engineering Approach
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeModalService.fullDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Scope Elements
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalService.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
                <span className="font-semibold text-slate-300">Recommended For: </span>
                <span className="text-slate-400">{activeModalService.recommendedFor}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={COMPANY_INFO.getServiceWhatsAppUrl(activeModalService.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>

              <div className="w-full sm:w-auto flex items-center gap-2">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeModalService.title;
                    setActiveModalService(null);
                    onSelectServiceForQuote(title);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
