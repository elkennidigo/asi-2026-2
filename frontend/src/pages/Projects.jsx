import React from 'react';
import { HERO_IMAGES, RECENT_PROJECTS, TEMBO_GALLERY, DATACENTER_GALLERY, DEVELOPED_PROJECTS } from '../mock';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';

const Projects = () => {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        className="asi-hero asi-grain"
        style={{ backgroundImage: `url(${HERO_IMAGES.projects})`, minHeight: '320px' }}
      >
        <div className="max-w-7xl mx-auto w-full px-5 lg:px-8 pb-12 pt-20">
          <h1 className="text-white font-bold text-5xl md:text-6xl tracking-tight text-right">
            PROYECTOS
          </h1>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="bg-white asi-section">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Proyectos más recientes
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {RECENT_PROJECTS.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="group"
              >
                <div className="asi-image-frame aspect-[4/3] bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-center mt-4 text-gray-800 font-semibold group-hover:text-[#1a2980] transition-colors">
                  {p.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tembo Hotel Detail */}
      <section id="tembo" className="bg-[#f6f7fb] asi-section">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2980] mb-3">Hotel TEMBO Barcelona</h2>
          <p className="text-gray-500 italic mb-8">Soluciones de control fiables para operaciones sofisticadas.</p>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
              <p>
                El sector hotelero, motor para la economía de nuestro país, está en plena transformación digital y bajo
                estrictos requerimientos de cumplimiento de sostenibilidad.
              </p>
              <p>
                La competencia es global, así como los clientes. Además, el establecimiento debe adaptarse a exigencias
                multiculturales y servicios múltiples.
              </p>
              <p>
                Para este proyecto entregado en 2024, se estandarizó un cuadro de control para cada una de las 17 plantas
                de manera que, a través de una red dedicada al control propia del edificio, se controlan unos
                <strong> 2.500 puntos físicos</strong> y cerca de <strong>9.000 integrados</strong> de otros sistemas.
                Controlando el clima de las 280 habitaciones y zonas comunes, integrando 5.000 puntos de iluminación y
                todas las mediciones de energía. Separadamente, en el sótano e igualmente conectadas a la red, dos
                subestaciones gestionan los suministros de ACS y CLIMA cuya fuente proviene de la red de calor y frío
                del 22@ de Barcelona.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {TEMBO_GALLERY.map((src, i) => (
                <div key={i} className={`asi-image-frame bg-gray-200 ${i === 0 ? 'row-span-2' : ''}`}>
                  <img src={src} alt={`Tembo ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Datacenter Detail */}
      <section id="datacenter" className="bg-white asi-section">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2980] mb-8">DATACENTER</h2>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
              <p>
                ASI brinda soluciones completas desde la instalación y comisionado de elementos de campo, controladores
                y software específico para instalaciones críticas como los data centers.
              </p>
              <p>
                Esta instalación corresponde a un data center de <strong>9 MW</strong> construido bajo los estándares
                internacionales de calidad y para un solo usuario. <strong>20.000 m²</strong>, con 2 niveles y 2.000 m² de
                espacio para servidores, tres edificios de servicios y uno de oficinas. Con un total de
                <strong> 3.000 puntos físicos</strong> y más de <strong>6.000 puntos de integración</strong>.
              </p>
              <p>
                El proyecto total se finalizó en un año y el control se comisionó 4 meses tras su fecha de inicio de
                instalación.
              </p>
              <p className="italic text-gray-600">
                La clave del éxito está en planificar anticipadamente las necesidades y la correcta documentación
                necesaria para la integración con los equipos de otros proveedores.
              </p>
              <p className="font-semibold text-[#1a2980]">Entregado a finales de 2024.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {DATACENTER_GALLERY.map((src, i) => (
                <div key={i} className={`asi-image-frame bg-gray-200 ${i === 0 ? 'row-span-2' : ''}`}>
                  <img src={src} alt={`Datacenter ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developed Projects Carousel */}
      <section className="bg-[#f6f7fb] asi-section">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Proyectos Desarrollados
          </h2>

          <Carousel opts={{ align: 'start', loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {DEVELOPED_PROJECTS.map((proj, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white border border-gray-100 h-full flex flex-col hover:shadow-lg transition-shadow">
                    <div className="asi-image-frame aspect-[16/9] bg-gray-100">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-[#1a2980] font-semibold text-base mb-3 leading-tight">
                        {proj.title}
                      </h3>
                      <ul className="space-y-1.5 text-sm text-gray-700 flex-1">
                        {proj.points.map((pt, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-[#1a2980] font-bold">·</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-5 bg-[#1a2980] text-white border-0 hover:bg-[#131f5e] hover:text-white" />
            <CarouselNext className="hidden md:flex -right-5 bg-[#1a2980] text-white border-0 hover:bg-[#131f5e] hover:text-white" />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Projects;
