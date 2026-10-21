import React, { useState } from 'react';
import { Eye, MapPin, Tag, Check, X, ArrowRight, MessageSquare, Info, ShieldAlert } from 'lucide-react';
import { INITIAL_PROJECTS, ProjectItem, COMPANY_INFO } from '../data/companyData';

interface ProjectPortfolioProps {
  onSelectProjectForQuote: (projectTitle: string) => void;
}

export const ProjectPortfolio: React.FC<ProjectPortfolioProps> = ({ onSelectProjectForQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = [
    'All',
    'Commercial HVAC',
    'Air Conditioning Installation',
    'Residential Projects',
    'Ventilation',
    'General Contracting'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? INITIAL_PROJECTS
    : INITIAL_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-slate-900 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
              <span>Workmanship Showcase</span>
              <span>·</span>
              <span>Engineering Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Project Portfolio & Installation Gallery
            </h2>
            <p className="mt-2 text-base text-slate-300">
              Browse reference HVAC installations and contracting solutions across commercial and residential spaces in Georgetown, Guyana.
            </p>
          </div>

          {/* Template Transparency Notice */}
          <div className="flex items-start gap-2 bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 max-w-sm">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <span>
              Gallery Template: Representative installation scopes. Company staff can upload verified job photographs via the Staff Portal.
            </span>
          </div>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 overflow-hidden transition-all duration-200 flex flex-col justify-between"
            >
              {/* Image with zoom on hover */}
              <div className="relative h-60 overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setActiveProject(project)}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Category chip */}
                <div className="absolute top-3 left-3 text-[11px] font-semibold text-slate-200 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-sm">
                  {project.category}
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-sky-500 text-white p-2 rounded-lg shadow-lg">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Project Card Text */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-sky-400 font-medium mb-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 py-1 cursor-pointer"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onSelectProjectForQuote(`Inquiry regarding: ${project.title}`)}
                    className="text-xs font-semibold px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors cursor-pointer"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Expanded Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Image */}
            <div className="relative h-64 sm:h-80 bg-slate-950">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />
              
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950/80 text-slate-300 hover:text-white rounded-full border border-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-1">
                  <span>{activeProject.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeProject.location}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Scope & Engineering Summary
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Technical Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-300"
                    >
                      <Check className="w-3.5 h-3.5 text-sky-400" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Contractor: PELSWIJK GENERAL CONTRACTORS</span>
                <span>Location: Georgetown, Guyana</span>
              </div>
            </div>

            {/* Modal Action Bar */}
            <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={COMPANY_INFO.getServiceWhatsAppUrl(activeProject.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>

              <div className="w-full sm:w-auto flex items-center gap-2">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeProject.title;
                    setActiveProject(null);
                    onSelectProjectForQuote(`Inquiry about ${title}`);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
                >
                  <span>Request Similar Project Quote</span>
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
