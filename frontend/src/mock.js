// Mock data for Automatic Solutions Iberia clone

export const OFFICES = [
  'Barcelona'
];

export const SERVICES = [
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
  'IT Services.'
];

export const PARTNERS = [
  {
    name: 'Automated Logic',
    logo: 'http://www.automaticsolutionsiberia.com/assets/images/logo20puerta-574x233.png',
    url: 'https://www.automatedlogic.com/en/'
  },
  {
    name: 'ISMA Controlli',
    logo: 'http://www.automaticsolutionsiberia.com/assets/images/ismacontrolli-logo-hd-383x61.png',
    url: 'https://www.ismacontrolli.com/en/'
  }
];

export const PRODUCT_CATEGORIES = [
  { id: 'software', name: 'SOFTWARE', icon: 'Save' },
  { id: 'hardware', name: 'HARDWARE', icon: 'HardDrive' },
  { id: 'controllers', name: 'CONTROLADORES Y MÓDULOS I/O', icon: 'Cpu' },
  { id: 'sensors', name: 'SENSORES', icon: 'Activity' }
];

export const SOFTWARE_PRODUCTS = [
  {
    title: 'WebCTRL® System Integrations (Plataforma de control e integración)',
    content: 'La arquitectura abierta de Automated Logic® WebCTRL® y la compatibilidad con los estándares de la industria facilitan la integración con los subsistemas mecánicos y eléctricos de edificios de terceros. El sistema WebCTRL es capaz de admitir varios protocolos a través de una red TCP/IP, lo que permite que muchos elementos del equipo se conecten directamente al Backbone principal de WebCTRL. El equipo que utiliza BACnet se puede conectar a un segmento de red IP, ARCNET, MS/TP o punto a punto (PTP). Nuestra integración de sistemas abiertos permite una interconexión perfecta con los equipos que utilizan BACnet, Modbus®, N2®, JBUS o LonWorks®, así como una extensa lista de protocolos patentados.'
  },
  {
    title: 'OptiFlex™ Virtual Integrator',
    content: 'Plataforma de integración BACnet/IP y Modbus TCP/IP de hasta 50.000 puntos que, gestionados por WebCTRL, ofrecen un enorme ahorro en costes de hardware. Permite la centralización de múltiples sistemas en una única solución escalable.'
  },
  {
    title: 'EIKON® Logic Builder',
    content: 'Herramienta gráfica de programación que permite crear estrategias de control personalizadas mediante bloques funcionales. Intuitiva y potente para ingenieros de control.'
  }
];

export const HARDWARE_PRODUCTS = [
  {
    title: 'ME-LGR Line of BACnet Routers',
    content: 'Routers BACnet de alta capacidad para enrutar tráfico entre redes BACnet/IP, MS/TP y ARCNET. Diseñados para proyectos de cualquier envergadura.'
  },
  {
    title: 'OF Enclosures',
    content: 'Carcasas y armarios para el alojamiento seguro de controladores y equipamiento de automatización. Disponibles en varios tamaños con certificaciones industriales.'
  }
];

export const CONTROLLER_PRODUCTS = [
  {
    title: 'G5 Series Controllers',
    content: 'Nueva generación de controladores programables con capacidad BACnet nativa, con procesadores rápidos y amplia memoria para aplicaciones HVAC complejas.'
  },
  {
    title: 'ZN Series Zone Controllers',
    content: 'Controladores de zona compactos y flexibles para control de unidades terminales, fan coils, VAV y aplicaciones de habitaciones de hotel.'
  },
  {
    title: 'ME812u I/O Modules',
    content: 'Módulos de expansión I/O para ampliar la capacidad de puntos de los controladores principales con comunicación MS/TP.'
  }
];

export const SENSOR_PRODUCTS = [
  {
    title: 'Sensores de Temperatura y Humedad',
    content: 'Sensores validados de alta precisión para aplicaciones farmacéuticas, centros de datos y edificios de oficinas. Cumplen con 21 CFR Part 11.'
  },
  {
    title: 'Sensores de Calidad del Aire (IAQ)',
    content: 'Monitorización de CO2, VOC, temperatura y humedad para asegurar ambientes interiores saludables y eficientes energéticamente.'
  },
  {
    title: 'Medidores de Energía',
    content: 'Medidores térmicos, eléctricos y de caudal para la gestión integral del consumo energético del edificio.'
  }
];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'ALL' },
  { id: 'critical', label: 'CRITICAL INSTALLATIONS' },
  { id: 'hospitality', label: 'HOSPITALITY' },
  { id: 'iaq', label: 'INDOOR QUALITY' }
];

export const PROJECTS = [
  {
    id: 'tembo',
    name: 'Hotel TEMBO — Barcelona',
    category: 'hospitality',
    year: '2024',
    location: 'Barcelona, España',
    tagline: 'Soluciones de control fiables para operaciones sofisticadas.',
    cover: 'http://www.automaticsolutionsiberia.com/assets/images/whatsapp-image-2025-02-18-at-20.34.00-1-1256x1675.jpeg',
    gallery: [
      'http://www.automaticsolutionsiberia.com/assets/images/whatsapp-image-2025-02-18-at-20.34.00-1-1256x1675.jpg',
      'http://www.automaticsolutionsiberia.com/assets/images/whatsapp-image-2025-02-18-at-20.37.12-661x881.jpg',
      'http://www.automaticsolutionsiberia.com/assets/images/whatsapp-image-2025-02-18-at-20.37.14-882x662.jpg'
    ],
    description: [
      'El sector hotelero, motor para la economía de nuestro país, está en plena transformación digital y bajo estrictos requerimientos de cumplimiento de sostenibilidad.',
      'La competencia es global, así como los clientes. Además, el establecimiento debe adaptarse a exigencias multiculturales y servicios múltiples.',
      'Para este proyecto entregado en 2024 se estandarizó un cuadro de control para cada una de las 17 plantas, de manera que a través de una red dedicada al control propia del edificio se controlan los sistemas del edificio.'
    ],
    stats: [
      { k: '2.500', v: 'Puntos físicos' },
      { k: '9.000', v: 'Puntos integrados' },
      { k: '280', v: 'Habitaciones' },
      { k: '17', v: 'Plantas' }
    ],
    highlights: [
      'Cuadro de control estandarizado por planta.',
      'Red dedicada de control propia del edificio.',
      '5.000 puntos de iluminación integrados.',
      'Todas las mediciones de energía monitorizadas.',
      '2 subestaciones gestionan ACS y CLIMA desde la red de calor/frío del 22@ de Barcelona.'
    ]
  },
  {
    id: 'datacenter-madrid',
    name: 'Datacenter — Madrid',
    category: 'critical',
    year: '2024',
    location: 'Madrid, España',
    tagline: 'Instalación crítica de 9 MW para un único usuario.',
    cover: 'http://www.automaticsolutionsiberia.com/assets/images/img20240425094622-882x882.jpeg',
    gallery: [
      'http://www.automaticsolutionsiberia.com/assets/images/img-20240229-wa0018-882x1176.jpg',
      'http://www.automaticsolutionsiberia.com/assets/images/img-20240402-wa0016-882x663.jpg',
      'http://www.automaticsolutionsiberia.com/assets/images/img20240425094622-882x882.jpg'
    ],
    description: [
      'ASI brinda soluciones completas desde la instalación y comisionado de elementos de campo, controladores y software específico para instalaciones críticas como los data centers.',
      'Esta instalación corresponde a un data center de 9 MW construido bajo los estándares internacionales de calidad y para un solo usuario.',
      'El proyecto total se finalizó en un año y el control se comisionó 4 meses tras su fecha de inicio de instalación. La clave del éxito está en planificar anticipadamente las necesidades y la correcta documentación para la integración con equipos de otros proveedores.'
    ],
    stats: [
      { k: '9 MW', v: 'Potencia' },
      { k: '20.000 m²', v: 'Superficie' },
      { k: '3.000', v: 'Puntos físicos' },
      { k: '6.000+', v: 'Puntos integración' }
    ],
    highlights: [
      '2 niveles y 2.000 m² de espacio para servidores.',
      'Tres edificios de servicios + uno de oficinas.',
      'Comisionado 4 meses tras el inicio de instalación.',
      'Integración con equipos multi-proveedor.',
      'Entregado a finales de 2024.'
    ]
  },
  {
    id: 'pharma',
    name: 'Proyecto Farmacéutico',
    category: 'critical',
    year: '2023',
    location: 'España',
    tagline: 'Compatible con CFR 21 para entorno de producción farmacéutica.',
    cover: 'http://www.automaticsolutionsiberia.com/assets/images/pharma-600x375.png',
    gallery: ['http://www.automaticsolutionsiberia.com/assets/images/pharma-600x375.png'],
    description: [
      'Proyecto de control y monitorización para una planta farmacéutica de 20.000 m² con los más altos estándares de validación y trazabilidad.',
      'Integración de múltiples fabricantes y sistemas legados en una sola plataforma WebCTRL.'
    ],
    stats: [
      { k: '20.000 m²', v: 'Superficie' },
      { k: 'CFR 21', v: 'Compatible' },
      { k: 'Multi', v: 'Proveedores' }
    ],
    highlights: [
      'Sensores validados de temperatura y humedad.',
      'Integración de Daikin y Atlas Copco.',
      'Integración del sistema antiguo Honeywell.',
      'Finalización del sistema de alojamiento de TI global (estándar EE. UU.).'
    ]
  },
  {
    id: 'logistica-tarragona',
    name: 'Plataforma Logística — Tarragona',
    category: 'critical',
    year: '2023',
    location: 'Tarragona, España',
    tagline: 'Control de temperatura para instalación logística de 53.000 m².',
    cover: 'http://www.automaticsolutionsiberia.com/assets/images/kiaby-1-600x331.png',
    gallery: ['http://www.automaticsolutionsiberia.com/assets/images/kiaby-1-600x331.png'],
    description: [
      'Control integral de HVAC para una plataforma logística de gran escala, con sensores ambientales redundantes que garantizan las condiciones óptimas de trabajo y almacenamiento.'
    ],
    stats: [
      { k: '53.000 m²', v: 'Superficie' },
      { k: '56', v: 'Unidades terminales' },
      { k: '24/7', v: 'Monitorización' }
    ],
    highlights: [
      'Control HVAC (enfriadora-caldera).',
      '56 unidades terminales de control y monitorización.',
      'Sensores ambientales redundantes: condiciones de trabajo.',
      'Monitoreo de POH.'
    ]
  },
  {
    id: 'hampton',
    name: 'Hotel Hampton by Hilton — Barcelona',
    category: 'hospitality',
    year: '2022',
    location: 'Barcelona, España',
    tagline: 'Hotel de 240 habitaciones con WebCTRL v7.',
    cover: 'http://www.automaticsolutionsiberia.com/assets/images/imagen-16-7-24-a-las-9.48-600x361.jpg',
    gallery: ['http://www.automaticsolutionsiberia.com/assets/images/imagen-16-7-24-a-las-9.48-600x361.jpg'],
    description: [
      'Proyecto de control de climatización y energía para un hotel Hampton by Hilton en Barcelona, integrando sensores Belimo y medidores térmicos Danfoss.'
    ],
    stats: [
      { k: '240', v: 'Habitaciones' },
      { k: 'v7', v: 'WebCTRL' },
      { k: '40', v: 'Sensores Belimo' }
    ],
    highlights: [
      'Touch Screen HDMi.',
      '1u. OFBBC + FIOs.',
      '40 us. Belimo immersion sensors.',
      '2 us. Danfoss thermal meters.'
    ]
  },
  {
    id: 'uvic',
    name: 'Campus Universitat de Vic (UVIC)',
    category: 'iaq',
    year: '2023',
    location: 'Cataluña, España',
    tagline: 'Campus universitario con atmósfera controlada en laboratorios.',
    cover: 'http://www.automaticsolutionsiberia.com/assets/images/imagen-16-7-24-a-las-9.48-600x341.jpg',
    gallery: ['http://www.automaticsolutionsiberia.com/assets/images/imagen-16-7-24-a-las-9.48-600x341.jpg'],
    description: [
      'Supervisión y control del campus universitario UVIC con WebCTRL/SCADA centralizado en el CPD corporativo. Control de atmósfera en laboratorios, calidad del aire interior y gestión energética global.'
    ],
    stats: [
      { k: 'SCADA', v: 'WebCTRL' },
      { k: 'IAQ', v: 'Temp/H%/CO2/VOC' },
      { k: 'Multi', v: 'Edificios' }
    ],
    highlights: [
      'Campus universitario completo.',
      'WebCTRL-SCADA ubicado en el CPD corporativo.',
      'Atmósfera controlada en laboratorios.',
      'IAQ (Temp/H%/CO2/VOC).',
      'Gestión de energía.'
    ]
  },
  {
    id: 'sant-just',
    name: 'IAQ y Monitoreo de Energía — Sant Just',
    category: 'iaq',
    year: '2022',
    location: 'Sant Just, Barcelona',
    tagline: 'Edificio de oficinas multi-inquilino de 5.600 m².',
    cover: 'http://www.automaticsolutionsiberia.com/assets/images/euro-3-600x328.png',
    gallery: ['http://www.automaticsolutionsiberia.com/assets/images/euro-3-600x328.png'],
    description: [
      'Proyecto de calidad del aire interior y monitoreo energético para un edificio de oficinas dividido en 14 inquilinos, con supervisión del rendimiento de HVAC y compensación de servicios públicos.'
    ],
    stats: [
      { k: '5.600 m²', v: 'Superficie' },
      { k: '14', v: 'Inquilinos' },
      { k: 'IAQ', v: 'Monitorización' }
    ],
    highlights: [
      'Supervisión del rendimiento de la producción de HVAC.',
      'Compensación de servicios públicos y gestión de energía.',
      'IAQ (Temp/H%/CO2/VOC).'
    ]
  }
];

export const NEWS_ITEMS = [
  {
    id: 'var-council-bcn-2025',
    date: '21-22 Octubre 2025',
    title: 'VAR EUR COUNCIL Meeting en Barcelona — "Gaudí City"',
    featured: true,
    image: '/news/var-council-1.jpg',
    gallery: [
      '/news/var-council-1.jpg',
      '/news/var-council-sagrada.jpg',
      '/news/var-council-room.jpg'
    ],
    excerpt: 'Se celebró la reunión anual del VAR EUR COUNCIL en las oficinas de Automatic Solutions Iberia en Barcelona, donde se mantuvieron los debates técnicos y de visión de mercados como seguimiento de los grupos de trabajo continuados con AUTOMATED LOGIC fábrica y distribución. También se aprovechó para compartir un tiempo de ocio visitando la basílica de la Sagrada Familia, obra del gran arquitecto modernista Antonio Gaudí.'
  },
  {
    id: 'uvic-visit-2025',
    date: '20 Octubre 2025',
    title: 'Visita al Campus UVIC del Managing Director Carrier Software & Controls Solutions, Axel Reichert',
    image: '/news/uvic-campus.jpg',
    excerpt: 'Automatic Solutions Iberia tuvo el placer de presentar una de sus implantaciones más emblemáticas, el Campus de la Universidad de Vic (UVIC), a Axel Reichert, el director global de la división de controles del grupo Carrier. La reunión fue tutelada por la ingeniería del proyecto Colomer Rifa y por la propiedad en representación del departamento de ingeniería y mantenimiento. Este trinomio abarca la totalidad de percepciones y sensibilidades de las necesidades de un campus tan dinámico como el visitado y tuvimos la oportunidad de aprender de experiencias y futuras implantaciones de mejora.'
  },
  {
    id: 'var-eur-2024',
    date: '17-18 Septiembre 2024',
    title: 'VAR EUR COUNCIL AUTOMATED LOGIC',
    image: 'http://www.automaticsolutionsiberia.com/assets/images/processed-13a77108-170d-44f5-be94-b003cbfbad35-002-1322x1083.jpeg',
    excerpt: 'Los pasados 17 y 18 de septiembre de 2024 la lista constituida de miembros del Consejo de ALC-EUR celebró la reunión anual para debatir y disfrutar de experiencias laborales.'
  },
  {
    id: 'savannah-2024',
    date: '19-22 Marzo 2024',
    title: 'Automated Logic Annual Dealer Meeting, Savannah',
    image: 'http://www.automaticsolutionsiberia.com/assets/images/50d98c8c-49c7-4c9c-a2f7-498155033feb-2048x2048.jpg',
    gallery: [
      'http://www.automaticsolutionsiberia.com/assets/images/50d98c8c-49c7-4c9c-a2f7-498155033feb-2048x2048.jpg',
      'http://www.automaticsolutionsiberia.com/assets/images/a4531c70-71e1-4923-91a4-c58658fc5107-2048x2048.jpg',
      'http://www.automaticsolutionsiberia.com/assets/images/bfabbeff-5be2-41bd-9ac9-e2b65da5fad4-2048x2048.jpg',
      'http://www.automaticsolutionsiberia.com/assets/images/9eef4093-02cb-466c-aa62-456a0124b5dc-2048x2048.jpg'
    ],
    excerpt: 'Una vez más ALC nos invitó a reunirnos a varios dealers en Savannah, Georgia EEUU, entre los pasados días 19 y 22 de Marzo para darnos a conocer entre nosotros, ver los planes de la empresa, conocer nuevos productos y poner puntos en común disfrutando una vez más de una muy agradable localización, buena estancia y compañía.'
  },
  {
    id: 'cancun-2020',
    date: '18-20 Febrero 2020',
    title: 'Annual Dealer Meeting — Cancún',
    image: 'http://www.automaticsolutionsiberia.com/assets/images/entrry-party-694x496.jpg',
    excerpt: 'Automatic Solutions Iberia asistió al Annual Dealer Meeting que Automated Logic organizó en Cancún del 18 al 20 de Febrero 2020. En un ambiente de trabajo distendido y en un entorno privilegiado ALC presentó las novedades de producto. Dentro del grupo Carrier, Automated Logic está siendo un motor en la innovación de soluciones para edificios. Como pudimos ver en detalle con OPTIFLEX Virtual Integrator, plataforma de integración de hasta 50.000 puntos BACnet/IP y Modbus TCP/IP que gestionados por WebCTRL ofrecen un enorme ahorro en costes de hardware.'
  },
  {
    id: 'barcelona-2018',
    date: '2018',
    title: 'Formación en Barcelona',
    image: 'http://www.automaticsolutionsiberia.com/assets/images/img-20180918-113240-1160x870.jpg',
    excerpt: 'Tras el verano del 2018 hemos estado con un workshop compuesto por Markus Gebele, Regional Manager Central Europe Automated Logic Corporation y técnicos de Automatic Solutions Iberia para entrar en detalle y conocer cada vez mejor las novedades de WebControl.'
  },
  {
    id: 'constitucion-2018',
    date: '2018',
    title: 'Constitución de la empresa',
    image: 'http://www.automaticsolutionsiberia.com/assets/images/img-20190901-wa0004-1160x476.jpg',
    excerpt: 'Automatic Solutions Iberia, en la primavera del 2018, celebró su constitución con sus máximos representados en Europa Mr. Dave Wijn — Vice President Sales Europe y Caecilie Olive Hechtel Sales Director South Europe, ambos de Automated Logic. Se presentaron las novedades de producto europeo y los responsables de negocio y operaciones de Automatic Solutions Iberia pudimos actualizar y reforzar nuestros lazos en un ambiente de trabajo distendido.'
  }
];

export const CONTACT_INFO = {
  company: 'Automatic Solutions Iberia',
  email: 'info@automaticsolutionsiberia.com',
  phone: '+34 900 000 000',
  address: 'Oficina técnica central — Barcelona, España',
  offices: OFFICES
};

export const HERO_IMAGES = {
  home: 'https://images.unsplash.com/photo-1634412114581-6376e49ef8e2?w=1920&q=80',
  products: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=1920&q=80',
  projects: 'https://images.unsplash.com/photo-1721244654394-36a7bc2da288?w=1920&q=80',
  news: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1920&q=80',
  contact: 'https://images.unsplash.com/photo-1708247186789-c009f7fd80ce?w=1920&q=80',
  techRoom: 'http://www.automaticsolutionsiberia.com/assets/images/webcontrol20and20guy-900x600.png'
};
