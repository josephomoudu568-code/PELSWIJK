import React from 'react';
import { ShieldCheck, Cpu, Layers, MessageSquare, FileCheck2, Award } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/companyData';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-sky-400" />,
    Cpu: <Cpu className="w-6 h-6 text-sky-400" />,
    Layers: <Layers className="w-6 h-6 text-sky-400" />,
    MessageSquare: <MessageSquare className="w-6 h-6 text-sky-400" />,
    FileCheck2: <FileCheck2 className="w-6 h-6 text-sky-400" />,
    Award: <Award className="w-6 h-6 text-sky-400" />,
  };

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
            <span>Guiding Standards</span>
            <span>·</span>
            <span>Our Approach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Choose PELSWIJK?
          </h2>
          <p className="mt-3 text-base text-slate-300">
            A practical, dependable approach to heating, ventilation, and air conditioning contracting in Georgetown and surrounding areas.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 rounded-xl p-6 sm:p-7 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center mb-5 shadow-inner">
                  {iconMap[item.icon]}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>STANDARD 0{idx + 1}</span>
                <span className="text-sky-400/80 font-sans">PELSWIJK</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
