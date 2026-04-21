import React, { useState } from 'react';
import { Save, HardDrive, Cpu, Activity } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { HERO_IMAGES, SOFTWARE_PRODUCTS, HARDWARE_PRODUCTS, CONTROLLER_PRODUCTS, SENSOR_PRODUCTS } from '../mock';
import { useLanguage } from '../i18n/LanguageContext';
import { PRODUCTS_EN } from '../i18n/mockEn';

const Products = () => {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState('software');

  // Resolve localized titles/content: in EN use the parallel array when available
  const localize = (id, items) => {
    if (lang === 'en' && PRODUCTS_EN[id]) {
      return items.map((it, idx) => ({
        title: PRODUCTS_EN[id][idx]?.title ?? it.title,
        content: PRODUCTS_EN[id][idx]?.content ?? it.content,
      }));
    }
    return items;
  };

  const CATEGORIES = [
    { id: 'software', name: t('products.categories.software'), Icon: Save, items: localize('software', SOFTWARE_PRODUCTS) },
    { id: 'hardware', name: t('products.categories.hardware'), Icon: HardDrive, items: localize('hardware', HARDWARE_PRODUCTS) },
    { id: 'controllers', name: t('products.categories.controllers'), Icon: Cpu, items: localize('controllers', CONTROLLER_PRODUCTS) },
    { id: 'sensors', name: t('products.categories.sensors'), Icon: Activity, items: localize('sensors', SENSOR_PRODUCTS) },
  ];

  const scrollTo = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-[72px]">
      <section
        className="asi-hero asi-grain"
        style={{ backgroundImage: `url(${HERO_IMAGES.products})`, minHeight: '320px' }}
      >
        <div className="max-w-7xl mx-auto w-full px-5 lg:px-8 pb-12 pt-20">
          <h1 className="text-white font-bold text-5xl md:text-6xl tracking-tight text-right">
            {t('products.heroTitle')}
          </h1>
        </div>
      </section>

      <section className="bg-[#1a2980]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map(({ id, name, Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`asi-nav-card border py-10 px-5 flex flex-col items-center justify-center ${
                  active === id
                    ? 'bg-[#131f5e] border-white/40'
                    : 'bg-[#1a2980] border-white/10 hover:border-white/30'
                }`}
              >
                <Icon className="w-12 h-12 text-white stroke-[1.5] mb-4" />
                <span className="text-white text-xs md:text-sm font-semibold tracking-wider text-center">
                  {name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white">
        {CATEGORIES.map(({ id, name, items }) => (
          <section key={id} id={id} className="asi-section border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-5 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a2980] mb-10 text-center">
                {name}
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {items.map((item, idx) => (
                  <AccordionItem key={idx} value={`${id}-${idx}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left hover:no-underline py-5 text-[#1a2980] font-semibold text-base md:text-lg group">
                      <span>{item.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed text-[15px] pb-6">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Products;
