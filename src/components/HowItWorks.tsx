import React from 'react';
import { ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { HOW_IT_WORKS_STEPS, COMPANY_INFO } from '../data/companyData';

interface HowItWorksProps {
  onOpenQuoteModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="how-it-works" className="py-20 bg-slate-900 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
            <span>Transparent Workflow</span>
            <span>·</span>
            <span>Step-by-Step</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-base text-slate-300">
            A clear, straightforward project lifecycle from your initial inquiry to final system commissioning.
          </p>
        </div>

        {/* Process Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Subtle connecting line across desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-slate-800 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((stepItem, idx) => (
              <div
                key={stepItem.step}
                className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  {/* Step Badge */}
                  <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-sky-400/80 flex items-center justify-center text-sky-300 font-mono font-extrabold text-base mb-5 shadow-lg">
                    {stepItem.step}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {stepItem.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                  PHASE 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">
              Ready to discuss your Georgetown HVAC or contracting project?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Submit an online quote request or send a quick note directly via WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenQuoteModal}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors uppercase tracking-wider cursor-pointer whitespace-nowrap"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={COMPANY_INFO.getServiceWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
