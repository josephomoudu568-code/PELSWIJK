import React, { useState } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
      <a
        href={COMPANY_INFO.getServiceWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center gap-2 p-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-full shadow-2xl transition-all duration-200 cursor-pointer group"
        aria-label="Direct WhatsApp Contact"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold pr-1">
          WhatsApp
        </span>
      </a>

      {showTooltip && (
        <div className="hidden sm:block bg-slate-900 border border-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg shadow-xl animate-in fade-in duration-150">
          Chat with PELSWIJK: +592 671 2370
        </div>
      )}
    </div>
  );
};
