import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { MAIN_OFFICE } from '../mock';
import { useLanguage, tr } from '../i18n/LanguageContext';

const Footer = () => {
  const { t, lang } = useLanguage();
  const country = tr(MAIN_OFFICE, 'country', lang);

  return (
    <footer className="bg-[#0f1947] text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="mb-4">
            <img
              src="/logo/asi-logo.png"
              alt="Automatic Solutions Iberia"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            {t('footer.about')}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wider mb-4 uppercase">{t('footer.nav')}</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li><Link className="hover:text-white" to="/">{t('nav.home')}</Link></li>
            <li><Link className="hover:text-white" to="/productos">{t('nav.products')}</Link></li>
            <li><Link className="hover:text-white" to="/proyectos">{t('nav.projects')}</Link></li>
            <li><Link className="hover:text-white" to="/noticias">{t('nav.news')}</Link></li>
            <li><Link className="hover:text-white" to="/contacto">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wider mb-4 uppercase">{t('footer.address')}</h4>
          <a
            href={MAIN_OFFICE.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-start gap-3 text-sm text-white/80 hover:text-white group"
          >
            <MapPin className="w-5 h-5 text-white/70 group-hover:text-white flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              {MAIN_OFFICE.address}<br />
              {MAIN_OFFICE.district}<br />
              {MAIN_OFFICE.postalCode} {MAIN_OFFICE.city}, {country}
              <span className="block mt-2 text-xs text-white/60 underline underline-offset-2 group-hover:text-white">
                {t('footer.seeMap')}
              </span>
            </span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 text-center text-xs text-white/60">
          © Copyright {new Date().getFullYear()} Automatic Solutions Iberia. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
