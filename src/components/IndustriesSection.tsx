import React from 'react';
import { Home, Building2, ShoppingBag, Coffee, Briefcase, HardHat, ArrowRight } from 'lucide-react';
import { INDUSTRIES_SERVED } from '../data/companyData';

interface IndustriesSectionProps {
  onSelectIndustryForQuote: (industryTitle: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustryForQuote }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-6 h-6 text-sky-400" />,
    Building2: <Building2 className="w-6 h-6 text-sky-400" />,
    ShoppingBag: <ShoppingBag className="w-6 h-6 text-sky-400" />,
    Coffee: <Coffee className="w-6 h-6 text-sky-400" />,
    Briefcase: <Briefcase className="w-6 h-6 text-sky-400" />,
    HardHat: <HardHat className="w-6 h-6 text-sky-400" />,
  };

  return (
    <section id="industries" className="py-20 bg-slate-950 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
            <span>Market Focus</span>
            <span>·</span>
            <span>Customer Applications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industries We Serve
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Suggested target sectors across Georgetown and Guyana where our HVAC cooling, maintenance, and contracting services provide practical value.
          </p>
          <span className="text-xs text-slate-400 mt-2 block">
            Note: Target customer categories. All project scopes are evaluated individually based on engineering specifications.
          </span>
        </div>

        {/* 6 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INDUSTRIES_SERVED.map((ind) => (
            <div
              key={ind.id}
              className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {iconMap[ind.iconName]}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                  {ind.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {ind.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectIndustryForQuote(`Inquiry for ${ind.title}`)}
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 py-1 cursor-pointer transition-colors"
                >
                  <span>Inquire for {ind.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
