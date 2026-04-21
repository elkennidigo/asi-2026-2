import React, { useState, useMemo } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';
import { HERO_IMAGES, NEWS_ITEMS } from '../mock';
import { useLanguage } from '../i18n/LanguageContext';
import { NEWS_EN } from '../i18n/mockEn';

const News = () => {
  const { t, lang } = useLanguage();

  const localizedNews = useMemo(() => {
    if (lang !== 'en') return NEWS_ITEMS;
    return NEWS_ITEMS.map((n) => {
      const en = NEWS_EN[n.id];
      if (!en) return n;
      return {
        ...n,
        date: en.date ?? n.date,
        title: en.title ?? n.title,
        excerpt: en.excerpt ?? n.excerpt,
      };
    });
  }, [lang]);

  const [selectedId, setSelectedId] = useState(localizedNews[0]?.id);
  const selected = localizedNews.find((n) => n.id === selectedId) || localizedNews[0];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
    setGalleryIndex(0);
    setTimeout(() => {
      const el = document.getElementById('news-detail');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 80);
  };

  const gallery = selected?.gallery || (selected?.image ? [selected.image] : []);
  const currentImage = gallery[galleryIndex] || selected?.image;

  return (
    <div className="pt-[72px]">
      <section
        className="asi-hero asi-grain"
        style={{ backgroundImage: `url(${HERO_IMAGES.news})`, minHeight: '320px' }}
      >
        <div className="max-w-7xl mx-auto w-full px-5 lg:px-8 pb-12 pt-20">
          <h1 className="text-white font-bold text-5xl md:text-6xl tracking-tight text-right">
            {t('news.heroTitle')}
          </h1>
        </div>
      </section>

      <section className="bg-white pt-14 pb-6">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2980]">
              {t('news.latestTitle')}
            </h2>
            <span className="text-sm text-gray-500">
              {localizedNews.length} {localizedNews.length !== 1 ? t('news.countPlural') : t('news.countSingular')}
            </span>
          </div>

          <Carousel opts={{ align: 'start', loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {localizedNews.map((n) => {
                const isActive = n.id === selectedId;
                return (
                  <CarouselItem key={n.id} className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                    <button
                      onClick={() => handleSelect(n.id)}
                      className={`group w-full text-left bg-white border transition-all duration-300 overflow-hidden flex flex-col h-full ${
                        isActive
                          ? 'border-[#1a2980] shadow-xl ring-2 ring-[#1a2980]/20'
                          : 'border-gray-200 hover:border-[#1a2980]/60 hover:shadow-lg'
                      }`}
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                        <img
                          src={n.image}
                          alt={n.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-[#1a2980] text-white text-[10px] font-bold tracking-wider px-2.5 py-1">
                          {n.featured ? t('news.featured') : t('news.regular')}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                          <Calendar className="w-3 h-3" /> {n.date}
                        </div>
                        <h3 className={`font-bold leading-snug mb-2 line-clamp-3 transition-colors ${
                          isActive ? 'text-[#1a2980]' : 'text-gray-900 group-hover:text-[#1a2980]'
                        }`}>
                          {n.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                          {n.excerpt}
                        </p>
                        <div className={`mt-4 inline-flex items-center text-xs font-semibold tracking-wider transition-colors ${
                          isActive ? 'text-[#1a2980]' : 'text-gray-500 group-hover:text-[#1a2980]'
                        }`}>
                          {isActive ? t('news.selected') : t('news.readMore')}
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </div>
                      </div>
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-5 bg-[#1a2980] text-white border-0 hover:bg-[#131f5e] hover:text-white" />
            <CarouselNext className="hidden md:flex -right-5 bg-[#1a2980] text-white border-0 hover:bg-[#131f5e] hover:text-white" />
          </Carousel>
        </div>
      </section>

      <section id="news-detail" className="bg-[#f6f7fb] asi-section">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          {selected && (
            <article className="bg-white border-t-4 border-[#1a2980] shadow-sm">
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <BookOpen className="w-3.5 h-3.5 text-[#1a2980]" />
                  <span className="font-semibold uppercase tracking-wider text-[#1a2980]">
                    {selected.featured ? t('news.featuredLabel') : t('news.articleLabel')}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {selected.date}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2980] leading-tight mb-8 max-w-4xl">
                  {selected.title}
                </h2>

                {currentImage && (
                  <div className="relative mb-8 bg-gray-100 overflow-hidden group">
                    <button
                      onClick={() => setLightbox(currentImage)}
                      className="block w-full"
                    >
                      <img
                        src={currentImage}
                        alt={selected.title}
                        className="w-full h-auto max-h-[560px] object-cover cursor-zoom-in"
                      />
                    </button>
                    {gallery.length > 1 && (
                      <>
                        <button
                          onClick={() => setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                          className="absolute top-1/2 -translate-y-1/2 left-4 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-colors"
                          aria-label="Previous"
                        >
                          <ChevronLeft className="w-5 h-5 text-[#1a2980]" />
                        </button>
                        <button
                          onClick={() => setGalleryIndex((i) => (i + 1) % gallery.length)}
                          className="absolute top-1/2 -translate-y-1/2 right-4 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-colors"
                          aria-label="Next"
                        >
                          <ChevronRight className="w-5 h-5 text-[#1a2980]" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {gallery.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setGalleryIndex(i)}
                              className={`h-1.5 rounded-full transition-all ${
                                i === galleryIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/80'
                              }`}
                              aria-label={`Go to image ${i + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="max-w-3xl">
                  {selected.excerpt.split('\n').map((para, i) => (
                    <p key={i} className="text-[17px] text-gray-800 leading-[1.8] mb-5 first:text-lg first:font-medium first:text-gray-900">
                      {para}
                    </p>
                  ))}
                </div>

                {gallery.length > 1 && (
                  <div className="mt-10 pt-8 border-t border-gray-100">
                    <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-4">
                      {t('news.galleryLabel')} ({gallery.length} {t('news.imagesWord')})
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {gallery.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIndex(i)}
                          className={`aspect-square overflow-hidden transition-all duration-200 ${
                            i === galleryIndex ? 'ring-2 ring-[#1a2980] opacity-100' : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          )}
        </div>
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
};

export default News;
