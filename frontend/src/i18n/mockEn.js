// English translations for dynamic mock data.
// Keyed by item id / array index. Merged at runtime when language === 'en'.

export const PRODUCTS_EN = {
  software: [
    {
      title: 'WebCTRL® System Integrations (Control & integration platform)',
      content:
        "Automated Logic® WebCTRL®'s open architecture and industry-standard compatibility make it easy to integrate with third-party mechanical and electrical building subsystems. The WebCTRL system supports multiple protocols over a TCP/IP network, allowing many pieces of equipment to connect directly to the main WebCTRL backbone. BACnet equipment can be connected over IP, ARCNET, MS/TP or point-to-point (PTP). Our open systems integration enables seamless interconnection with equipment using BACnet, Modbus®, N2®, JBUS or LonWorks®, plus a wide list of proprietary protocols.",
    },
    {
      title: 'OptiFlex™ Virtual Integrator',
      content:
        'BACnet/IP and Modbus TCP/IP integration platform supporting up to 50,000 points. Managed through WebCTRL, it delivers significant hardware cost savings and centralises multiple systems in a single scalable solution.',
    },
    {
      title: 'EIKON® Logic Builder',
      content:
        'Graphical programming tool for building custom control strategies with functional blocks. Intuitive and powerful for control engineers.',
    },
  ],
  hardware: [
    {
      title: 'ME-LGR BACnet Routers Line',
      content:
        'High-capacity BACnet routers to route traffic between BACnet/IP, MS/TP and ARCNET networks. Designed for projects of any scale.',
    },
    {
      title: 'OF Enclosures',
      content:
        'Enclosures and cabinets for the safe housing of controllers and automation equipment. Available in various sizes with industrial certifications.',
    },
  ],
  controllers: [
    {
      title: 'G5 Series Controllers',
      content:
        'New generation of programmable controllers with native BACnet capability, fast processors and ample memory for complex HVAC applications.',
    },
    {
      title: 'ZN Series Zone Controllers',
      content:
        'Compact, flexible zone controllers for terminal units, fan coils, VAV and hotel room applications.',
    },
    {
      title: 'ME812u I/O Modules',
      content:
        'I/O expansion modules to extend the point capacity of main controllers via MS/TP communication.',
    },
  ],
  sensors: [
    {
      title: 'Temperature & Humidity Sensors',
      content:
        'Validated, high-precision sensors for pharmaceutical, data-center and office-building applications. Compliant with 21 CFR Part 11.',
    },
    {
      title: 'Indoor Air Quality (IAQ) Sensors',
      content:
        'CO2, VOC, temperature and humidity monitoring to ensure healthy, energy-efficient indoor environments.',
    },
    {
      title: 'Energy Meters',
      content:
        'Thermal, electrical and flow meters for comprehensive building energy consumption management.',
    },
  ],
};

export const PROJECTS_EN = {
  tembo: {
    name: 'TEMBO Hotel — Barcelona',
    location: 'Barcelona, Spain',
    tagline: 'Reliable control solutions for sophisticated operations.',
    description: [
      "The hospitality sector, a driving force for the Spanish economy, is undergoing a full digital transformation while meeting strict sustainability requirements.",
      'Competition is global, and so are the guests. In addition, the property must adapt to multicultural demands and multiple services.',
      'For this project delivered in 2024, a control cabinet was standardised for each of the 17 floors, so that the building systems are managed through a dedicated control network owned by the building.',
    ],
    stats: [
      { v: 'Physical points' },
      { v: 'Integrated points' },
      { v: 'Rooms' },
      { v: 'Floors' },
    ],
    highlights: [
      'Standardised control cabinet per floor.',
      'Dedicated control network owned by the building.',
      '5,000 integrated lighting points.',
      'Full energy metering monitored.',
      '2 substations manage DHW and HVAC from the 22@ Barcelona district heating/cooling grid.',
    ],
  },
  'datacenter-madrid': {
    name: 'Datacenter — Madrid',
    location: 'Madrid, Spain',
    tagline: 'Mission-critical 9 MW facility for a single tenant.',
    description: [
      'ASI delivers end-to-end solutions — from field-device installation and commissioning to controllers and dedicated software — for mission-critical facilities such as data centers.',
      'This facility is a 9 MW, single-user data center built to international quality standards.',
      'The entire project was completed in one year and controls were commissioned 4 months after installation start. The key to success lies in anticipating requirements early and producing the right documentation to integrate with third-party vendor equipment.',
    ],
    stats: [
      { v: 'Power' },
      { v: 'Floor area' },
      { v: 'Physical points' },
      { v: 'Integration points' },
    ],
    highlights: [
      '2 floors with 2,000 m² of server space.',
      'Three service buildings plus one office building.',
      'Commissioned 4 months after installation start.',
      'Integration with multi-vendor equipment.',
      'Delivered late 2024.',
    ],
  },
  pharma: {
    name: 'Pharmaceutical Project',
    location: 'Spain',
    tagline: 'CFR 21 compliant for a pharmaceutical manufacturing environment.',
    description: [
      'Control and monitoring project for a 20,000 m² pharmaceutical plant with the highest validation and traceability standards.',
      'Integration of multiple manufacturers and legacy systems into a single WebCTRL platform.',
    ],
    stats: [
      { v: 'Floor area' },
      { v: 'Compliant' },
      { v: 'Vendors' },
    ],
    highlights: [
      'Validated temperature and humidity sensors.',
      'Daikin and Atlas Copco integration.',
      'Legacy Honeywell system integration.',
      'Completion of global IT housing system (US standard).',
    ],
  },
  'logistica-tarragona': {
    name: 'Logistics Platform — Tarragona',
    location: 'Tarragona, Spain',
    tagline: 'Temperature control for a 53,000 m² logistics facility.',
    description: [
      'End-to-end HVAC control for a large-scale logistics platform, with redundant ambient sensors ensuring optimal working and storage conditions.',
    ],
    stats: [
      { v: 'Floor area' },
      { v: 'Terminal units' },
      { v: 'Monitoring' },
    ],
    highlights: [
      'HVAC control (chiller-boiler).',
      '56 terminal control and monitoring units.',
      'Redundant ambient sensors: working conditions.',
      'POH monitoring.',
    ],
  },
  hampton: {
    name: 'Hampton by Hilton Hotel — Barcelona',
    location: 'Barcelona, Spain',
    tagline: '240-room hotel with WebCTRL v7.',
    description: [
      'Climate and energy control project for a Hampton by Hilton hotel in Barcelona, integrating Belimo sensors and Danfoss thermal meters.',
    ],
    stats: [
      { v: 'Rooms' },
      { v: 'WebCTRL' },
      { v: 'Belimo sensors' },
    ],
    highlights: [
      'Touch Screen HDMI.',
      '1u OFBBC + FIOs.',
      '40 Belimo immersion sensors.',
      '2 Danfoss thermal meters.',
    ],
  },
  uvic: {
    name: 'Campus Universitat de Vic (UVIC)',
    location: 'Catalonia, Spain',
    tagline: 'University campus with controlled atmosphere in laboratories.',
    description: [
      'Monitoring and control of the UVIC campus with WebCTRL/SCADA centralised in the corporate data center. Laboratory atmosphere control, indoor air quality and overall energy management.',
    ],
    stats: [
      { v: 'WebCTRL' },
      { v: 'Temp/RH%/CO2/VOC' },
      { v: 'Buildings' },
    ],
    highlights: [
      'Full university campus.',
      'WebCTRL-SCADA hosted in the corporate data center.',
      'Controlled atmosphere in laboratories.',
      'IAQ (Temp/RH%/CO2/VOC).',
      'Energy management.',
    ],
  },
  'sant-just': {
    name: 'IAQ & Energy Monitoring — Sant Just',
    location: 'Sant Just, Barcelona',
    tagline: '5,600 m² multi-tenant office building.',
    description: [
      'Indoor air quality and energy monitoring project for an office building split across 14 tenants, with HVAC performance supervision and utility allocation.',
    ],
    stats: [
      { v: 'Floor area' },
      { v: 'Tenants' },
      { v: 'Monitoring' },
    ],
    highlights: [
      'HVAC production performance supervision.',
      'Utility allocation and energy management.',
      'IAQ (Temp/RH%/CO2/VOC).',
    ],
  },
};

export const NEWS_EN = {
  'var-council-bcn-2025': {
    date: '21-22 October 2025',
    title: 'VAR EUR COUNCIL Meeting in Barcelona — "Gaudí City"',
    excerpt:
      "The annual VAR EUR COUNCIL meeting was held at Automatic Solutions Iberia's offices in Barcelona, with technical and market-vision discussions as follow-up to the ongoing working groups with AUTOMATED LOGIC manufacturing and distribution. The group also enjoyed some leisure time visiting the Sagrada Familia basilica, the masterpiece of modernist architect Antoni Gaudí.",
  },
  'uvic-visit-2025': {
    date: '20 October 2025',
    title:
      "Visit to the UVIC Campus by the Managing Director of Carrier Software & Controls Solutions, Axel Reichert",
    excerpt:
      "Automatic Solutions Iberia was delighted to present one of its flagship deployments, the University of Vic (UVIC) Campus, to Axel Reichert, global director of Carrier's controls division. The meeting was led by the project engineering firm Colomer Rifa and by the property's engineering and maintenance team. Together, this trio covers the full spectrum of perceptions and sensitivities around the needs of such a dynamic campus, and it was an opportunity to learn from past experiences and future improvement initiatives.",
  },
  'var-eur-2024': {
    date: '17-18 September 2024',
    title: 'VAR EUR COUNCIL AUTOMATED LOGIC',
    excerpt:
      'On 17 and 18 September 2024 the ALC-EUR Council members held their annual meeting to discuss business and share professional experiences.',
  },
  'savannah-2024': {
    date: '19-22 March 2024',
    title: 'Automated Logic Annual Dealer Meeting, Savannah',
    excerpt:
      "Once again, ALC invited dealers to gather in Savannah, Georgia (USA) from 19 to 22 March, to meet one another, review company plans, discover new products and exchange views while enjoying a pleasant location, great hospitality and good company.",
  },
  'cancun-2020': {
    date: '18-20 February 2020',
    title: 'Annual Dealer Meeting — Cancún',
    excerpt:
      'Automatic Solutions Iberia attended the Annual Dealer Meeting organised by Automated Logic in Cancún from 18 to 20 February 2020. In a relaxed working atmosphere and a privileged setting, ALC presented its product updates. Within the Carrier group, Automated Logic is a driving force in building solutions innovation — as shown in detail with OPTIFLEX Virtual Integrator, an integration platform supporting up to 50,000 BACnet/IP and Modbus TCP/IP points, which managed by WebCTRL delivers huge savings in hardware costs.',
  },
  'barcelona-2018': {
    date: '2018',
    title: 'Training in Barcelona',
    excerpt:
      'After the summer of 2018 we ran a workshop with Markus Gebele, Regional Manager Central Europe at Automated Logic Corporation, and the Automatic Solutions Iberia technical team, to dive into the latest WebControl capabilities in detail.',
  },
  'constitucion-2018': {
    date: '2018',
    title: 'Company incorporation',
    excerpt:
      "Automatic Solutions Iberia celebrated its incorporation in spring 2018 with top European representatives Mr. Dave Wijn — Vice President Sales Europe — and Caecilie Olive Hechtel — Sales Director South Europe —, both from Automated Logic. The latest European product news was presented, and ASI's business and operations leadership took the opportunity to reinforce ties in a relaxed working atmosphere.",
  },
};
