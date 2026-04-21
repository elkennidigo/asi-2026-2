import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'asi_lang';
const DEFAULT_LANG = 'es';
const SUPPORTED = ['es', 'en'];

// Helper to resolve a possibly bilingual field: returns obj[`${key}_${lang}`] or obj[key]
export const tr = (obj, key, lang = DEFAULT_LANG) => {
  if (!obj) return '';
  const localized = obj[`${key}_${lang}`];
  if (localized !== undefined && localized !== null) return localized;
  return obj[key];
};

export const TRANSLATIONS = {
  es: {
    langButtonLabel: 'ENGLISH',
    nav: {
      home: 'INICIO',
      products: 'PRODUCTOS',
      projects: 'PROYECTOS',
      news: 'NOTICIAS',
      contact: 'CONTACTO',
      shop: 'TIENDA',
    },
    home: {
      heroTitle: ['Automatic', 'Solutions', 'Iberia'],
      heroSubtitle: 'Bienvenidos a nuestro sitio web.',
      aboutBadge: 'SOBRE NOSOTROS',
      aboutTitle: '¿Qué hacemos?',
      aboutP1:
        'Automatic Solutions Iberia (ASI) se constituye en el 2018 por varios ingenieros provenientes del sector de la automatización y control con décadas de experiencia en proyectos de cierta envergadura o criticidad técnica.',
      aboutP2:
        'Desde su constitución ha tenido el objetivo de actuar como MasterReseller y agente autorizado de los productos Automated Logic en España y Portugal.',
      aboutP3:
        'Junto a su propia red de integradores por la península ibérica ha conseguido tener una gran capilaridad, con oficinas técnicas en Madrid, Barcelona, Palma de Mallorca, Jaén, Girona y Lisboa, desde donde puede afrontar proyectos de automatización y control de cualquier dimensión y dificultad.',
      techRoomCaption: 'Tech room — Datacenter',
      servicesTitle: 'ASI cubre todas las necesidades del proyecto',
      servicesLead:
        'Ayudamos a nuestros integradores a cumplir con los más altos niveles de exigencia:',
      videoTitle: 'We Are Automated Logic',
      videoSubtitle: 'We Make Buildings Better.',
      officesBadge: 'PRESENCIA IBÉRICA',
      officesTitle: 'Oficinas técnicas',
      officesLead:
        'Red propia de ingeniería con capilaridad en la península ibérica para atender proyectos en cualquier localización.',
      ctaTitle: '¿Tiene un proyecto en mente?',
      ctaText:
        'Contacte con nuestro equipo técnico para recibir un asesoramiento personalizado sobre su proyecto de automatización y control de edificios.',
      ctaButton: 'CONTACTAR',
    },
    services: [
      'Plan & Spec: Projects demand creation.',
      'Systems and products technical support.',
      'Quotations optimization and support.',
      'Installation support (electromechanical).',
      'Cabinets manufacture service.',
      'Technical legal compliance.',
      '7/24 Corrective Services.',
      'Installation & service work insurances.',
      'Warranties and post sales service.',
      'Project Management package service.',
      'IT Services.',
    ],
    products: {
      heroTitle: 'PRODUCTOS',
      categories: {
        software: 'SOFTWARE',
        hardware: 'HARDWARE',
        controllers: 'CONTROLADORES Y MÓDULOS I/O',
        sensors: 'SENSORES',
      },
    },
    projects: {
      heroTitle: 'PROYECTOS',
      sidebarLabel: 'Categorías',
      filterHint:
        'Selecciona una categoría para filtrar los proyectos y haz clic en cualquiera para ampliar su detalle completo.',
      allTitle: 'Todos los proyectos',
      countSingular: 'proyecto',
      countPlural: 'proyectos',
      detail: 'VER DETALLE',
      close: 'CERRAR',
      keyPoints: 'Puntos clave',
      categories: {
        all: 'ALL',
        critical: 'CRITICAL INSTALLATIONS',
        hospitality: 'HOSPITALITY',
        iaq: 'INDOOR QUALITY',
      },
    },
    news: {
      heroTitle: 'NOTICIAS',
      latestTitle: 'Últimas publicaciones',
      countSingular: 'noticia',
      countPlural: 'noticias',
      featured: 'DESTACADA',
      regular: 'NOTICIA',
      readMore: 'LEER MÁS',
      selected: 'SELECCIONADA',
      articleLabel: 'Artículo',
      featuredLabel: 'Noticia destacada',
      galleryLabel: 'Galería',
      imagesWord: 'imágenes',
    },
    contact: {
      heroTitle: 'CONTACTO',
      hablemos: 'Hablemos',
      lead:
        '¿Tiene un proyecto de automatización o control en mente? Nuestro equipo técnico le atenderá a la mayor brevedad.',
      officeLabel: 'Oficina Técnica',
      seeMap: 'VER EN GOOGLE MAPS',
      responseTime: 'Respuesta habitual en 24-48 horas laborables.',
      formTitle: 'Formulario de contacto',
      nameLabel: 'Nombre',
      namePh: 'Su nombre',
      emailLabel: 'Email',
      emailPh: 'correo@empresa.com',
      subjectLabel: 'Asunto',
      subjectPh: 'Motivo de su consulta',
      messageLabel: 'Mensaje',
      messagePh: 'Describa brevemente su proyecto...',
      sending: 'ENVIANDO...',
      send: 'ENVIAR',
      successTitle: 'Mensaje enviado',
      successDesc:
        'Gracias por contactar con nosotros. Le responderemos a la mayor brevedad.',
      successBanner:
        'Gracias por contactar con nosotros. Su mensaje ha sido enviado.',
      errorTitle: 'Error al enviar',
      errorDesc:
        'No se pudo enviar el mensaje. Intente de nuevo en unos minutos.',
      incompleteTitle: 'Campos incompletos',
      incompleteDesc: 'Nombre, email y mensaje son obligatorios.',
    },
    footer: {
      about:
        'MasterReseller y agente autorizado de Automated Logic en España y Portugal desde 2018.',
      nav: 'Navegación',
      address: 'Dirección',
      seeMap: 'Ver en Google Maps',
      copyright: 'Todos los derechos reservados.',
    },
  },
  en: {
    langButtonLabel: 'ESPAÑOL',
    nav: {
      home: 'HOME',
      products: 'PRODUCTS',
      projects: 'PROJECTS',
      news: 'NEWS',
      contact: 'CONTACT',
      shop: 'SHOP',
    },
    home: {
      heroTitle: ['Automatic', 'Solutions', 'Iberia'],
      heroSubtitle: 'Welcome to our website.',
      aboutBadge: 'ABOUT US',
      aboutTitle: 'What do we do?',
      aboutP1:
        'Automatic Solutions Iberia (ASI) was founded in 2018 by a group of engineers from the automation and control sector with decades of experience on large-scale or mission-critical projects.',
      aboutP2:
        'Since its inception, the company has acted as MasterReseller and authorised agent for Automated Logic products in Spain and Portugal.',
      aboutP3:
        'Together with its own network of integrators across the Iberian Peninsula, ASI has achieved broad coverage through technical offices in Madrid, Barcelona, Palma de Mallorca, Jaén, Girona and Lisbon, enabling it to take on automation and control projects of any size and complexity.',
      techRoomCaption: 'Tech room — Datacenter',
      servicesTitle: 'ASI covers every project need',
      servicesLead:
        'We help our integrators meet the highest standards of demand:',
      videoTitle: 'We Are Automated Logic',
      videoSubtitle: 'We Make Buildings Better.',
      officesBadge: 'IBERIAN PRESENCE',
      officesTitle: 'Technical Offices',
      officesLead:
        'In-house engineering network with coverage across the Iberian Peninsula to serve projects in any location.',
      ctaTitle: 'Do you have a project in mind?',
      ctaText:
        'Contact our technical team for tailored advice on your building automation and control project.',
      ctaButton: 'CONTACT US',
    },
    services: [
      'Plan & Spec: Projects demand creation.',
      'Systems and products technical support.',
      'Quotations optimization and support.',
      'Installation support (electromechanical).',
      'Cabinets manufacture service.',
      'Technical legal compliance.',
      '24/7 Corrective Services.',
      'Installation & service work insurances.',
      'Warranties and post-sales service.',
      'Project Management package service.',
      'IT Services.',
    ],
    products: {
      heroTitle: 'PRODUCTS',
      categories: {
        software: 'SOFTWARE',
        hardware: 'HARDWARE',
        controllers: 'CONTROLLERS & I/O MODULES',
        sensors: 'SENSORS',
      },
    },
    projects: {
      heroTitle: 'PROJECTS',
      sidebarLabel: 'Categories',
      filterHint:
        'Select a category to filter the projects and click any of them to expand its full details.',
      allTitle: 'All projects',
      countSingular: 'project',
      countPlural: 'projects',
      detail: 'VIEW DETAILS',
      close: 'CLOSE',
      keyPoints: 'Key points',
      categories: {
        all: 'ALL',
        critical: 'CRITICAL INSTALLATIONS',
        hospitality: 'HOSPITALITY',
        iaq: 'INDOOR QUALITY',
      },
    },
    news: {
      heroTitle: 'NEWS',
      latestTitle: 'Latest posts',
      countSingular: 'post',
      countPlural: 'posts',
      featured: 'FEATURED',
      regular: 'NEWS',
      readMore: 'READ MORE',
      selected: 'SELECTED',
      articleLabel: 'Article',
      featuredLabel: 'Featured post',
      galleryLabel: 'Gallery',
      imagesWord: 'images',
    },
    contact: {
      heroTitle: 'CONTACT',
      hablemos: "Let's talk",
      lead:
        'Do you have an automation or control project in mind? Our technical team will get back to you as soon as possible.',
      officeLabel: 'Technical Office',
      seeMap: 'OPEN IN GOOGLE MAPS',
      responseTime: 'Typical response within 24-48 working hours.',
      formTitle: 'Contact form',
      nameLabel: 'Name',
      namePh: 'Your name',
      emailLabel: 'Email',
      emailPh: 'name@company.com',
      subjectLabel: 'Subject',
      subjectPh: 'Reason for your enquiry',
      messageLabel: 'Message',
      messagePh: 'Briefly describe your project...',
      sending: 'SENDING...',
      send: 'SEND',
      successTitle: 'Message sent',
      successDesc:
        'Thank you for contacting us. We will reply as soon as possible.',
      successBanner:
        'Thank you for contacting us. Your message has been sent.',
      errorTitle: 'Send error',
      errorDesc:
        'The message could not be sent. Please try again in a few minutes.',
      incompleteTitle: 'Missing fields',
      incompleteDesc: 'Name, email and message are required.',
    },
    footer: {
      about:
        'MasterReseller and authorised Automated Logic agent in Spain and Portugal since 2018.',
      nav: 'Navigation',
      address: 'Address',
      seeMap: 'Open in Google Maps',
      copyright: 'All rights reserved.',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (_) {}
    return DEFAULT_LANG;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch (_) {}
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((cur) => (cur === 'es' ? 'en' : 'es'));
  }, []);

  const t = useCallback(
    (path, fallback = '') => {
      const parts = path.split('.');
      let cur = TRANSLATIONS[lang];
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) {
          cur = cur[p];
        } else {
          cur = undefined;
          break;
        }
      }
      if (cur === undefined) {
        // Fallback to ES
        cur = TRANSLATIONS.es;
        for (const p of parts) {
          if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
          else { cur = undefined; break; }
        }
      }
      return cur ?? fallback;
    },
    [lang]
  );

  const trField = useCallback(
    (obj, key) => tr(obj, key, lang),
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle, t, trField }),
    [lang, toggle, t, trField]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
