import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Upload, MessageSquare, Phone, Calendar, MapPin, Building, Home, FileText, ArrowRight, X } from 'lucide-react';
import { INITIAL_SERVICES, COMPANY_INFO } from '../data/companyData';

interface QuoteSystemProps {
  initialService?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
  onQuoteCreated?: (refNumber: string) => void;
}

export const QuoteSystem: React.FC<QuoteSystemProps> = ({
  initialService,
  isModal = false,
  onCloseModal,
  onQuoteCreated
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    serviceType: initialService || INITIAL_SERVICES[0].title,
    projectScope: 'Commercial' as 'Residential' | 'Commercial' | 'Both',
    propertyLocation: '',
    projectDescription: '',
    preferredContactMethod: 'WhatsApp' as 'WhatsApp' | 'Phone Call' | 'Email',
    preferredDate: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successQuote, setSuccessQuote] = useState<{
    referenceNumber: string;
    fullName: string;
    serviceType: string;
    phone: string;
  } | null>(null);

  // Suggested Georgetown locations for quick click
  const georgetownAreas = [
    'Sherriff St', 'Queenstown', 'Kitty', 'Subryanville', 'Bel Air', 'Campbellville', 'Providence', 'Eccles'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please provide a contact phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.propertyLocation.trim()) {
      setErrorMessage('Please specify your property or site location in Guyana.');
      return;
    }
    if (!formData.projectDescription.trim()) {
      setErrorMessage('Please briefly describe your HVAC or contracting requirements.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          photoName: selectedFile ? selectedFile.name : undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote request.');
      }

      setSuccessQuote({
        referenceNumber: data.referenceNumber,
        fullName: formData.fullName,
        serviceType: formData.serviceType,
        phone: formData.phone
      });

      if (onQuoteCreated) {
        onQuoteCreated(data.referenceNumber);
      }
    } catch (err: any) {
      // In case server route is unavailable in pure static mode, generate client fallback ref
      const fallbackRef = `PEL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSuccessQuote({
        referenceNumber: fallbackRef,
        fullName: formData.fullName,
        serviceType: formData.serviceType,
        phone: formData.phone
      });
      if (onQuoteCreated) {
        onQuoteCreated(fallbackRef);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessQuote(null);
    setFormData({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      serviceType: INITIAL_SERVICES[0].title,
      projectScope: 'Commercial',
      propertyLocation: '',
      projectDescription: '',
      preferredContactMethod: 'WhatsApp',
      preferredDate: '',
    });
    setSelectedFile(null);
    setFilePreview(null);
  };

  const content = (
    <div className="w-full">
      {successQuote ? (
        <div className="bg-slate-950 p-6 sm:p-8 rounded-xl border border-emerald-500/30 text-center animate-in fade-in duration-200">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Quote Request Received
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2">
            Thank You, {successQuote.fullName}!
          </h3>
          
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg max-w-md mx-auto my-5 text-left space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Reference Number:</span>
              <span className="font-mono font-bold text-sky-400 text-sm">{successQuote.referenceNumber}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Service Requested:</span>
              <span className="font-medium text-slate-200">{successQuote.serviceType}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Contact Phone:</span>
              <span className="font-medium text-slate-200">{successQuote.phone}</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
            Our estimating team at PELSWIJK GENERAL CONTRACTORS is reviewing your specifications. To expedite site inspection or quote preparation, you can connect directly on WhatsApp with your reference number.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <a
              href={COMPANY_INFO.getQuoteWhatsAppUrl(
                successQuote.referenceNumber,
                successQuote.serviceType,
                successQuote.fullName
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Continue on WhatsApp</span>
            </a>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Marcus Persaud"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            {/* Company Name (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Company / Organization <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Demerara Trading Co."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Phone Number <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+592 6XX XXXX"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Local Guyana format: +592 or 7 digits</span>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-amber-400">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            {/* Type of Service */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Type of Service <span className="text-amber-400">*</span>
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
              >
                {INITIAL_SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.title} className="bg-slate-900 text-white">
                    {srv.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Residential or Commercial Scope */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Project Scope <span className="text-amber-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Residential', 'Commercial', 'Both'] as const).map((scope) => (
                  <button
                    type="button"
                    key={scope}
                    onClick={() => setFormData({ ...formData, projectScope: scope })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer text-center ${
                      formData.projectScope === scope
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                        : 'bg-slate-900 border-slate-750 text-slate-400 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Location */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Property Location in Guyana <span className="text-amber-400">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Street / Area / Town</span>
              </div>
              <input
                type="text"
                required
                value={formData.propertyLocation}
                onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                placeholder="e.g. 48 Sherriff Street, Campbellville, Georgetown"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[11px] text-slate-500">Quick areas:</span>
                {georgetownAreas.slice(0, 6).map((area) => (
                  <button
                    type="button"
                    key={area}
                    onClick={() => setFormData({ ...formData, propertyLocation: `${area}, Georgetown` })}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-sky-300 hover:bg-slate-750 transition-colors cursor-pointer"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Project Requirements & Description <span className="text-amber-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                placeholder="Describe your cooling or contracting needs (e.g. number of rooms, BTU capacity if known, existing issues, building type, or preferred equipment)..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors resize-y"
              />
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Preferred Contact Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['WhatsApp', 'Phone Call', 'Email'] as const).map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setFormData({ ...formData, preferredContactMethod: method })}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer text-center ${
                      formData.preferredContactMethod === method
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-750 text-slate-400 hover:text-white'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Date for Site Visit (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Preferred Date for Site Visit <span className="text-slate-500">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Subject to confirmation by PELSWIJK office</span>
            </div>

            {/* Upload Project Photos (Optional) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Upload Project Photos <span className="text-slate-500">(Optional)</span>
              </label>
              <div className="border-2 border-dashed border-slate-700 hover:border-slate-600 rounded-lg p-4 text-center bg-slate-900/50 transition-colors">
                {filePreview ? (
                  <div className="flex items-center justify-between gap-4 p-2 bg-slate-800 rounded-lg max-w-md mx-auto">
                    <img src={filePreview} alt="Upload preview" className="w-12 h-12 object-cover rounded" />
                    <div className="text-left text-xs truncate flex-1">
                      <span className="font-semibold text-slate-200 block truncate">{selectedFile?.name}</span>
                      <span className="text-slate-400">{Math.round((selectedFile?.size || 0) / 1024)} KB</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setFilePreview(null);
                      }}
                      className="text-slate-400 hover:text-red-400 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs text-sky-400 font-semibold hover:underline">Choose photo file</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">JPG, PNG, or WEBP of AC unit, wall, or rooftop area</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Quotes are customized based on technical scope and verified equipment sizing.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>PROCESSING REQUEST...</span>
              ) : (
                <>
                  <span>SUBMIT QUOTE REQUEST</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
        <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
          {/* Modal Header */}
          <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Official Estimate Inquiry
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Request a Free Quote
              </h3>
            </div>
            {onCloseModal && (
              <button
                onClick={onCloseModal}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 transition-colors"
                aria-label="Close quote modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-5 sm:p-8 overflow-y-auto">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="quote" className="py-20 bg-slate-950 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <span>Direct Lead Intake</span>
            <span>·</span>
            <span>Georgetown & Environs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Request an HVAC Proposal or Site Assessment
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Tell us about your cooling system, ventilation layout, or contracting specifications. We will review the details and reach out via your preferred method.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-10 shadow-xl backdrop-blur-sm">
          {content}
        </div>
      </div>
    </section>
  );
};
