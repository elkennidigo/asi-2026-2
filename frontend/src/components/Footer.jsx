import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { OFFICES } from '../mock';

const Footer = () => {
  return (
    <footer className="bg-[#0f1947] text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="mb-4">
            <img
              src="/logo/asi-logo.png"
              alt="Automatic Solutions Iberia"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            MasterReseller y agente autorizado de Automated Logic en España y Portugal desde 2018.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wider mb-4 uppercase">Navegación</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li><Link className="hover:text-white" to="/">Inicio</Link></li>
            <li><Link className="hover:text-white" to="/productos">Productos</Link></li>
            <li><Link className="hover:text-white" to="/proyectos">Proyectos</Link></li>
            <li><Link className="hover:text-white" to="/noticias">Noticias</Link></li>
            <li><Link className="hover:text-white" to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wider mb-4 uppercase">Oficina</h4>
          <ul className="space-y-2 text-sm text-white/75">
            {OFFICES.map((o) => (
              <li key={o} className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/60" /> {o}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wider mb-4 uppercase">Contacto</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white/60" />
              <a href="mailto:info@automaticsolutionsiberia.com" className="hover:text-white">
                info@automaticsolutionsiberia.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-white/60" />
              <a href="tel:+34900000000" className="hover:text-white">+34 900 000 000</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 text-center text-xs text-white/60">
          © Copyright {new Date().getFullYear()} Automatic Solutions Iberia. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
