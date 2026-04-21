import React from 'react';
import { Calendar } from 'lucide-react';
import { HERO_IMAGES, NEWS_ITEMS } from '../mock';

const News = () => {
  const featured = NEWS_ITEMS.find((n) => n.featured) || NEWS_ITEMS[0];
  const gallery = featured.gallery || [];
  const rest = NEWS_ITEMS.filter((n) => n.id !== featured.id && !n.gallery);

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        className="asi-hero asi-grain"
        style={{ backgroundImage: `url(${HERO_IMAGES.news})`, minHeight: '320px' }}
      >
        <div className="max-w-7xl mx-auto w-full px-5 lg:px-8 pb-12 pt-20">
          <h1 className="text-white font-bold text-5xl md:text-6xl tracking-tight text-right">
            NOTICIAS
          </h1>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white asi-section">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="asi-image-frame bg-gray-100">
              <img src={featured.image} alt={featured.title} className="w-full h-auto object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-[#1a2980] font-semibold mb-3">
                <Calendar className="w-4 h-4" />
                {featured.date}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2980] mb-5 leading-tight">
                {featured.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-[15px]">{featured.excerpt}</p>
            </div>
          </div>

          {/* Savannah story with gallery */}
          {NEWS_ITEMS.filter((n) => n.gallery).map((n) => (
            <div key={n.id} className="mt-20">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{n.title}</h3>
              <p className="text-gray-700 text-[15px] leading-relaxed mb-6 max-w-4xl">{n.excerpt}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {n.gallery.map((g, i) => (
                  <div key={i} className="asi-image-frame aspect-square bg-gray-100">
                    <img src={g} alt={`${n.title} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Older news */}
      <section className="bg-[#f6f7fb] asi-section">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Noticias anteriores
          </h3>
          <div className="space-y-12">
            {rest.map((n, idx) => (
              <article
                key={n.id}
                className={`grid lg:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="asi-image-frame bg-gray-100">
                  <img src={n.image} alt={n.title} className="w-full h-auto object-cover" />
                </div>
                <div>
                  <div className="text-sm text-[#1a2980] font-semibold italic mb-2">{n.date}</div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">{n.title}</h4>
                  <p className="text-gray-700 leading-relaxed text-[15px]">{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
