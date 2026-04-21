import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../i18n/LanguageContext';

const Navbar = () => {
  const { t, toggle, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const NAV_ITEMS = [
    { to: '/', label: t('nav.home') },
    { to: '/productos', label: t('nav.products') },
    { to: '/proyectos', label: t('nav.projects') },
    { to: '/noticias', label: t('nav.news') },
    { to: '/contacto', label: t('nav.contact') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#131f5e]/95 backdrop-blur-md py-2 shadow-lg' : 'bg-[#1a2980]/90 backdrop-blur-sm py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img
            src="/logo/asi-logo.png"
            alt="Automatic Solutions Iberia"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `asi-link text-white text-sm font-semibold tracking-wider ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <button className="flex items-center gap-1.5 text-white text-sm font-semibold tracking-wider hover:text-white/80 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            {t('nav.shop')}
          </button>
          <Button
            onClick={toggle}
            variant="outline"
            className="rounded-full border-white/80 text-[#1a2980] bg-white hover:bg-white/90 hover:text-[#131f5e] font-semibold text-xs px-5"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            {t('langButtonLabel')}
          </Button>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#131f5e] border-t border-white/10">
          <div className="px-5 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-white text-sm font-semibold tracking-wider py-2 border-b border-white/10 ${
                    isActive ? 'text-white' : 'text-white/80'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button
              onClick={toggle}
              variant="outline"
              className="rounded-full border-white text-[#1a2980] bg-white hover:bg-white/90 w-fit mt-2"
            >
              <Globe className="w-4 h-4 mr-2" />
              {t('langButtonLabel')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
