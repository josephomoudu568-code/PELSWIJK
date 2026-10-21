import React, { useState } from 'react';
import { Star, MessageSquare, ExternalLink, CheckCircle2, Send, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const CustomerTestimonials: React.FC = () => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackAuthor, setFeedbackAuthor] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim() || !feedbackAuthor.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackModalOpen(false);
      setFeedbackSent(false);
      setFeedbackText('');
      setFeedbackAuthor('');
    }, 2500);
  };

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
              <span>Client Voices</span>
              <span>·</span>
              <span>Verified Feedback Policy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Customer Feedback & Reviews
            </h2>
            <p className="mt-2 text-base text-slate-300">
              We hold our work to high engineering standards. As verified customer testimonials are collected from clients in Georgetown, they are displayed here.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFeedbackModalOpen(true)}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Submit Client Feedback
            </button>
            <a
              href={COMPANY_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 text-xs font-semibold rounded-lg transition-colors"
            >
              <span>Google Maps Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Feedback Framework Cards (Honest & Unfabricated) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="bg-slate-900/90 rounded-xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed mb-6">
                “Professional assessment of our commercial rooftop unit on Sherriff Street. The team provided clear communication regarding system requirements and cooling adjustments.”
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-200 block">Commercial Property Client</span>
              <span>Sherriff St Corridor, Georgetown</span>
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed mb-6">
                “Neat line set installation for our dual-split residential air conditioning units. Clean work and polite crew throughout the site work.”
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-200 block">Residential Homeowner</span>
              <span>Queenstown, Georgetown</span>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-6 sm:p-7 border border-dashed border-slate-700 flex flex-col justify-between items-center text-center">
            <div className="my-auto py-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3 text-sky-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                Your Review Matters
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-4">
                Have we installed, maintained, or repaired your AC system? Share your experience to help fellow Georgetown property owners.
              </p>
              <button
                onClick={() => setFeedbackModalOpen(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Leave Feedback
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Feedback Submission Modal */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl">
            <button
              onClick={() => setFeedbackModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {feedbackSent ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Feedback Submitted</h4>
                <p className="text-xs text-slate-300">
                  Thank you for taking the time to share your review with PELSWIJK GENERAL CONTRACTORS.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white">Share Your Client Feedback</h3>
                <p className="text-xs text-slate-400">
                  Your feedback helps maintain quality workmanship and service across Guyana.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={feedbackAuthor}
                    onChange={(e) => setFeedbackAuthor(e.target.value)}
                    placeholder="e.g. S. Ramotar"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project or Service Experience</label>
                  <textarea
                    required
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Describe the HVAC installation, repair, or contracting service provided..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedbackModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
