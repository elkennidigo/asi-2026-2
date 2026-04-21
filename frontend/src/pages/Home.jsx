import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, FolderKanban, Newspaper, Mail, CheckCircle2, Play, MapPin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { PARTNERS, HERO_IMAGES, TECHNICAL_OFFICES } from '../mock';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { useLanguage } from '../i18n/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const [videoOpen, setVideoOpen] = useState(false);

  const CARDS = [
    { to: '/productos', label: t('nav.products'), Icon: Package },
    { to: '/proyectos', label: t('nav.projects'), Icon: FolderKanban },
    { to: '/noticias', label: t('nav.news'), Icon: Newspaper },
    { to: '/contacto', label: t('nav.contact'), Icon: Mail },
  ];

  const heroTitleLines = t('home.heroTitle') || [];
  const services = t('services') || [];

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        className="asi-hero asi-grain"
        style={{
          backgroundImage: `url(${HERO_IMAGES.home})`,
          minHeight: '620px',
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-5 lg:px-8 pb-28 pt-24">
          <div className="max-w-2xl ml-auto text-right">
            <h1 className="text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              {Array.isArray(heroTitleLines)
                ? heroTitleLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < heroTitleLines.length - 1 && <br />}
                    </React.Fragment>
                  ))
                : heroTitleLines}
            </h1>
            <p className="text-white/90 text-lg mt-6 font-light">{t('home.heroSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="bg-[#1a2980] -mt-1">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {CARDS.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                className="asi-nav-card bg-[#1a2980] border border-white/10 hover:border-white/30 py-12 px-6 flex flex-col items-center justify-center group"
              >
                <Icon className="w-14 h-14 text-white stroke-[1.25] mb-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-white text-sm font-semibold tracking-[0.18em]">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-around gap-10">
            {PARTNERS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-col items-center gap-1 opacity-90 hover:opacity-100 transition-opacity"
              >
                <img src={p.logo} alt={p.name} className="h-16 md:h-20 object-contain" />
                {p.name === 'Automated Logic' && (
                  <span className="text-[10px] text-gray-500 tracking-wider uppercase">A Carrier Company</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-[#f6f7fb] asi-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="inline-block px-3 py-1 bg-[#1a2980]/10 text-[#1a2980] text-xs font-semibold tracking-wider rounded mb-5">
                {t('home.aboutBadge')}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a2980] mb-8">{t('home.aboutTitle')}</h2>
              <div className="space-y-5 text-[15px] text-gray-700 leading-relaxed">
                <p>{t('home.aboutP1')}</p>
                <p>{t('home.aboutP2')}</p>
                <p>{t('home.aboutP3')}</p>
              </div>
            </div>

            <Card className="border-0 shadow-xl rounded-none overflow-hidden">
              <CardContent className="p-0">
                <div className="asi-image-frame">
                  <img
                    src={HERO_IMAGES.techRoom}
                    alt="Tech room Datacenter"
                    className="w-full h-auto object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80'; }}
                  />
                </div>
                <div className="bg-[#1a2980] text-white text-center py-3 text-sm font-medium">
                  {t('home.techRoomCaption')}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-[#1a2980] mb-6">{t('home.servicesTitle')}</h3>
            <p className="text-gray-600 mb-8 max-w-3xl">{t('home.servicesLead')}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded border border-gray-100 hover:border-[#1a2980]/30 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#1a2980] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-800">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="bg-[#0f1947] py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">{t('home.videoTitle')}</h3>
          <p className="text-white/70 mb-8">{t('home.videoSubtitle')}</p>

          <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
            <DialogTrigger asChild>
              <button className="relative inline-block group">
                <div className="relative w-full max-w-3xl mx-auto">
                  <img
                    src="https://img.youtube.com/vi/ASHoFzbSKK8/maxresdefault.jpg"
                    alt="Automated Logic video"
                    className="w-full rounded-sm"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors rounded-sm flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-[#1a2980] ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 bg-black border-0">
              {videoOpen && (
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/ASHoFzbSKK8?autoplay=1"
                    title="Automated Logic video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Oficinas técnicas */}
      <section className="bg-white border-t border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#1a2980]/10 text-[#1a2980] text-xs font-semibold tracking-wider rounded mb-4">
              {t('home.officesBadge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2980] mb-3">{t('home.officesTitle')}</h2>
            <p className="text-gray-600 max-w-xl mx-auto">{t('home.officesLead')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TECHNICAL_OFFICES.map((office) => (
              <div
                key={office}
                className="group bg-[#f6f7fb] hover:bg-[#1a2980] border border-gray-100 hover:border-[#1a2980] p-5 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-default"
              >
                <MapPin className="w-6 h-6 text-[#1a2980] group-hover:text-white transition-colors mb-2" />
                <span className="text-sm font-semibold text-gray-800 group-hover:text-white transition-colors">
                  {office}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white asi-section">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2980] mb-5">{t('home.ctaTitle')}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t('home.ctaText')}</p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 bg-[#1a2980] text-white px-8 py-3.5 text-sm font-semibold tracking-wider hover:bg-[#131f5e] transition-colors"
          >
            {t('home.ctaButton')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
