import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, ChevronRight, X, Server, Hotel, Wind, LayoutGrid } from 'lucide-react';
import { HERO_IMAGES, PROJECTS, PROJECT_CATEGORIES } from '../mock';
import { useLanguage } from '../i18n/LanguageContext';
import { PROJECTS_EN } from '../i18n/mockEn';

const CATEGORY_ICONS = {
  all: LayoutGrid,
  critical: Server,
  hospitality: Hotel,
  iaq: Wind,
};

const Projects = () => {
  const { t, lang } = useLanguage();
  const [activeCat, setActiveCat] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  // Localize a project's text content based on language
  const localize = (p) => {
    if (lang !== 'en') return p;
    const en = PROJECTS_EN[p.id];
    if (!en) return p;
    const stats = (p.stats || []).map((s, i) => ({
      k: s.k,
      v: en.stats?.[i]?.v ?? s.v,
    }));
    return {
      ...p,
      name: en.name ?? p.name,
      location: en.location ?? p.location,
      tagline: en.tagline ?? p.tagline,
      description: en.description ?? p.description,
      highlights: en.highlights ?? p.highlights,
      stats,
    };
  };

  const localizedProjects = useMemo(() => PROJECTS.map(localize), [lang]);

  const filtered = useMemo(() => {
    if (activeCat === 'all') return localizedProjects;
    return localizedProjects.filter((p) => p.category === activeCat);
  }, [activeCat, localizedProjects]);

  const categoryCount = (id) =>
    id === 'all' ? localizedProjects.length : localizedProjects.filter((p) => p.category === id).length;

  const handleCardClick = (id) => {
    setExpandedId((cur) => (cur === id ? null : id));
    setTimeout(() => {
      const el = document.getElementById(`project-${id}`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="pt-[72px]">
      <section
        className="asi-hero asi-grain"
        style={{ backgroundImage: `url(${HERO_IMAGES.projects})`, minHeight: '320px' }}
      >
        <div className="max-w-7xl mx-auto w-full px-5 lg:px-8 pb-12 pt-20">
          <h1 className="text-white font-bold text-5xl md:text-6xl tracking-tight text-right">
            {t('projects.heroTitle')}
          </h1>
        </div>
      </section>

      <section className="bg-white asi-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="mb-4">
                <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-3">
                  {t('projects.sidebarLabel')}
                </div>
              </div>
              <nav className="flex flex-col gap-2">
                {PROJECT_CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id];
                  const isActive = activeCat === cat.id;
                  const label = t(`projects.categories.${cat.id}`) || cat.label;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCat(cat.id);
                        setExpandedId(null);
                      }}
                      className={`group w-full text-left px-5 py-4 border transition-all duration-200 flex items-center justify-between ${
                        isActive
                          ? 'bg-[#1a2980] border-[#1a2980] text-white shadow-md'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-[#1a2980] hover:text-[#1a2980]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#1a2980]'}`} />
                        <span className="text-sm font-semibold tracking-wider">{label}</span>
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-[#1a2980]/10 group-hover:text-[#1a2980]'
                        }`}
                      >
                        {categoryCount(cat.id)}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 p-5 bg-[#f6f7fb] border-l-4 border-[#1a2980]">
                <p className="text-xs text-gray-600 leading-relaxed">{t('projects.filterHint')}</p>
              </div>
            </aside>

            <div>
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a2980]">
                  {activeCat === 'all'
                    ? t('projects.allTitle')
                    : t(`projects.categories.${activeCat}`)}
                </h2>
                <span className="text-sm text-gray-500">
                  {filtered.length} {filtered.length !== 1 ? t('projects.countPlural') : t('projects.countSingular')}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {filtered.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    expanded={expandedId === p.id}
                    onClick={() => handleCardClick(p.id)}
                    t={t}
                  />
                ))}
              </div>

              {expandedId && (
                <ExpandedDetail
                  project={localizedProjects.find((p) => p.id === expandedId)}
                  onClose={() => setExpandedId(null)}
                  t={t}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProjectCard = ({ project, expanded, onClick, t }) => {
  const catLabel = t(`projects.categories.${project.category}`);
  return (
    <button
      id={`project-${project.id}`}
      onClick={onClick}
      className={`group text-left bg-white border transition-all duration-300 overflow-hidden flex flex-col ${
        expanded
          ? 'border-[#1a2980] shadow-xl ring-2 ring-[#1a2980]/20'
          : 'border-gray-200 hover:border-[#1a2980] hover:shadow-lg'
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
        <img
          src={project.cover}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-[#1a2980] text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-sm">
          {catLabel}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {project.year}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {project.location}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#1a2980] transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-gray-600 flex-1">{project.tagline}</p>
        <div className="mt-4 flex items-center text-[#1a2980] text-xs font-semibold tracking-wider">
          {expanded ? t('projects.close') : t('projects.detail')}
          <ChevronRight
            className={`w-4 h-4 ml-1 transition-transform ${expanded ? 'rotate-90' : 'group-hover:translate-x-1'}`}
          />
        </div>
      </div>
    </button>
  );
};

const ExpandedDetail = ({ project, onClose, t }) => {
  if (!project) return null;
  const catLabel = t(`projects.categories.${project.category}`);
  return (
    <div className="mt-10 bg-[#f6f7fb] border-t-4 border-[#1a2980] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="p-6 md:p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-[#1a2980] hover:border-[#1a2980] hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <span className="inline-block bg-[#1a2980] text-white text-[10px] font-bold tracking-wider px-2.5 py-1 mb-3">
            {catLabel}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1a2980] mb-2">{project.name}</h3>
          <p className="text-gray-600 italic">{project.tagline}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {project.year}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {project.location}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-3 text-[15px] text-gray-700 leading-relaxed mb-6">
              {project.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h4 className="text-sm font-semibold tracking-wider text-[#1a2980] uppercase mb-3">
              {t('projects.keyPoints')}
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#1a2980] font-bold mt-0.5">·</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {project.stats && project.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {project.stats.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 p-4 text-center hover:border-[#1a2980] transition-colors"
                  >
                    <div className="text-2xl font-bold text-[#1a2980]">{s.k}</div>
                    <div className="text-xs text-gray-600 mt-1 uppercase tracking-wider">{s.v}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {project.gallery.map((src, i) => (
                <div
                  key={i}
                  className={`asi-image-frame bg-gray-200 ${
                    project.gallery.length === 3 && i === 0 ? 'row-span-2 col-span-1' : ''
                  }`}
                >
                  <img src={src} alt={`${project.name} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
