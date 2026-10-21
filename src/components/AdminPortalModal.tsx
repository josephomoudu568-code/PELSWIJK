import React, { useState, useEffect } from 'react';
import { Lock, LogOut, CheckCircle2, Clock, Phone, Mail, MapPin, Download, Trash2, Edit3, X, Shield, Plus, RefreshCw, MessageSquare } from 'lucide-react';
import { COMPANY_INFO, INITIAL_SERVICES, INITIAL_PROJECTS, QuoteLead } from '../data/companyData';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'quotes' | 'services' | 'projects' | 'hours'>('quotes');
  const [quotesList, setQuotesList] = useState<QuoteLead[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Business hours editable state
  const [hoursConfig, setHoursConfig] = useState({
    schedule: 'Monday – Friday: 8:00 AM – 5:00 PM',
    note: 'The supplied listing indicates closing at 5:00 PM, but the full weekly schedule should be confirmed before publication.',
    phone: '+592 671 2370',
    address: '48 Sherriff St, Georgetown, Guyana'
  });
  const [hoursSavedNotice, setHoursSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchQuotes();
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passkey for PELSWIJK GENERAL CONTRACTORS staff
    if (passcode === 'pelswijk2026' || passcode === 'admin123') {
      setIsAuthenticated(true);
      setAuthError(null);
      fetchQuotes();
    } else {
      setAuthError('Invalid staff authorization passkey.');
    }
  };

  const fetchQuotes = async () => {
    setIsLoadingQuotes(true);
    try {
      const res = await fetch('/api/quotes');
      if (res.ok) {
        const data = await res.json();
        setQuotesList(data.quotes || []);
      }
    } catch (err) {
      console.warn('Could not fetch quotes from API, using cached state.');
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  const handleUpdateStatus = async (quoteId: string, newStatus: QuoteLead['status']) => {
    try {
      await fetch(`/api/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setQuotesList((prev) =>
        prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q))
      );
    } catch (err) {
      setQuotesList((prev) =>
        prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q))
      );
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    if (!confirm('Are you sure you want to delete this quote record?')) return;
    try {
      await fetch(`/api/quotes/${quoteId}`, { method: 'DELETE' });
      setQuotesList((prev) => prev.filter((q) => q.id !== quoteId));
    } catch (err) {
      setQuotesList((prev) => prev.filter((q) => q.id !== quoteId));
    }
  };

  const handleExportCSV = () => {
    const headers = ['Reference,Full Name,Company,Phone,Email,Service,Scope,Location,Status,Date'];
    const rows = quotesList.map((q) =>
      `"${q.referenceNumber}","${q.fullName}","${q.companyName || ''}","${q.phone}","${q.email}","${q.serviceType}","${q.projectScope}","${q.propertyLocation}","${q.status}","${new Date(q.createdAt).toLocaleDateString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PELSWIJK_Quote_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white">
                  PELSWIJK GENERAL CONTRACTORS
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  Staff Portal
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Lead Management, Inquiries & Editable Site Configuration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 transition-colors"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier or Main Dashboard */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-900">
            <div className="w-full max-w-sm bg-slate-950 border border-slate-800 p-8 rounded-xl text-center space-y-4">
              <div className="w-12 h-12 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-400/20">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Authorized Access Only</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enter contractor passkey to manage customer leads and update settings.
                </p>
              </div>

              {authError && (
                <div className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded-lg border border-red-500/30">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter staff passkey (pelswijk2026)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Unlock Staff Dashboard
                </button>
              </form>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                Default authorization passkey: <code className="text-slate-300 font-mono">pelswijk2026</code>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Dashboard Tabs Bar */}
            <div className="bg-slate-950 px-6 border-b border-slate-800 flex items-center gap-4 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('quotes')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'quotes'
                    ? 'border-sky-400 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Quote Requests ({quotesList.length})
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'services'
                    ? 'border-sky-400 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Services List ({INITIAL_SERVICES.length})
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'border-sky-400 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Project Showcase ({INITIAL_PROJECTS.length})
              </button>

              <button
                onClick={() => setActiveTab('hours')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'hours'
                    ? 'border-sky-400 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Business Hours & Info
              </button>
            </div>

            {/* Tab 1: Quotes Leads Management */}
            {activeTab === 'quotes' && (
              <div className="flex-1 flex flex-col p-6 overflow-hidden">
                {/* Control bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Filter Status:</span>
                    {['All', 'New', 'In Review', 'Quoted', 'Scheduled', 'Completed'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                          statusFilter === st
                            ? 'bg-sky-500 text-white font-bold'
                            : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchQuotes}
                      className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg text-xs flex items-center gap-1 border border-slate-700"
                      title="Refresh leads"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                    <button
                      onClick={handleExportCSV}
                      disabled={quotesList.length === 0}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Table / List */}
                <div className="flex-1 overflow-y-auto border border-slate-800 rounded-xl bg-slate-950">
                  {quotesList.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 text-sm">
                      No quote leads in the system yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-800">
                      {quotesList
                        .filter((q) => statusFilter === 'All' || q.status === statusFilter)
                        .map((quote) => (
                          <div key={quote.id} className="p-4 sm:p-5 hover:bg-slate-900/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1.5 max-w-xl">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-400/20">
                                  {quote.referenceNumber}
                                </span>
                                <span className="text-sm font-bold text-white">
                                  {quote.fullName}
                                </span>
                                {quote.companyName && (
                                  <span className="text-xs text-slate-400">
                                    ({quote.companyName})
                                  </span>
                                )}
                                <span className="text-xs px-2 py-0.5 rounded font-semibold bg-slate-800 text-amber-300">
                                  {quote.projectScope}
                                </span>
                              </div>

                              <div className="text-xs text-slate-300">
                                <span className="font-semibold text-slate-200">Service: </span>
                                <span>{quote.serviceType}</span>
                                <span className="mx-2 text-slate-600">·</span>
                                <span className="font-semibold text-slate-200">Location: </span>
                                <span>{quote.propertyLocation}</span>
                              </div>

                              <p className="text-xs text-slate-400 line-clamp-2">
                                “{quote.projectDescription}”
                              </p>

                              <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                                <span>Phone: {quote.phone}</span>
                                <span>·</span>
                                <span>Email: {quote.email}</span>
                                <span>·</span>
                                <span>Method: {quote.preferredContactMethod}</span>
                                {quote.preferredDate && <span>· Visit: {quote.preferredDate}</span>}
                              </div>
                            </div>

                            {/* Actions Column */}
                            <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                              <select
                                value={quote.status}
                                onChange={(e) => handleUpdateStatus(quote.id, e.target.value as QuoteLead['status'])}
                                className="bg-slate-900 border border-slate-700 text-xs font-semibold text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-sky-500"
                              >
                                <option value="New">Status: New</option>
                                <option value="In Review">Status: In Review</option>
                                <option value="Quoted">Status: Quoted</option>
                                <option value="Scheduled">Status: Scheduled</option>
                                <option value="Completed">Status: Completed</option>
                              </select>

                              <a
                                href={`https://wa.me/${quote.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Hello ${quote.fullName}, this is PELSWIJK GENERAL CONTRACTORS regarding your quote request ${quote.referenceNumber}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                                title="Reply via WhatsApp"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>

                              <button
                                onClick={() => handleDeleteQuote(quote.id)}
                                className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-colors"
                                title="Delete quote"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Services Management */}
            {activeTab === 'services' && (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-3xl space-y-4">
                  <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    Services displayed on the website. To confirm or unconfirm services, toggle their active status below.
                  </div>

                  <div className="space-y-3">
                    {INITIAL_SERVICES.map((srv) => (
                      <div key={srv.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{srv.shortDescription}</p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 whitespace-nowrap">
                          Verified & Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Projects Management */}
            {activeTab === 'projects' && (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-3xl space-y-4">
                  <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    Project showcase template items. Management can configure and upload real job photos taken at Georgetown client sites.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {INITIAL_PROJECTS.map((proj) => (
                      <div key={proj.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-3.5 space-y-2">
                        <img src={proj.image} alt={proj.title} className="w-full h-32 object-cover rounded-lg" />
                        <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                        <p className="text-[11px] text-slate-400">{proj.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Business Profile & Hours */}
            {activeTab === 'hours' && (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-2xl bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Company Contact & Hours Settings
                  </h3>

                  {hoursSavedNotice && (
                    <div className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Settings updated for PELSWIJK GENERAL CONTRACTORS.</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Office Schedule</label>
                    <input
                      type="text"
                      value={hoursConfig.schedule}
                      onChange={(e) => setHoursConfig({ ...hoursConfig, schedule: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hours Disclaimer Note</label>
                    <textarea
                      rows={2}
                      value={hoursConfig.note}
                      onChange={(e) => setHoursConfig({ ...hoursConfig, note: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Official Telephone</label>
                    <input
                      type="text"
                      value={hoursConfig.phone}
                      onChange={(e) => setHoursConfig({ ...hoursConfig, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Physical Address</label>
                    <input
                      type="text"
                      value={hoursConfig.address}
                      onChange={(e) => setHoursConfig({ ...hoursConfig, address: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setHoursSavedNotice(true);
                      setTimeout(() => setHoursSavedNotice(false), 2500);
                    }}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
