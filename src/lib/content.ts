// Copy ported from the current site (index.html / manifest.js). Keep this
// file as the single source of truth for real copy — do not invent figures,
// history or testimonials here. Sections still missing client-approved
// content use an explicit [PENDIENTE DE CONFIRMAR CON CLIENTE] placeholder.

export const BRAND = {
  name: "ColVending",
  tagline: "Automatizá ventas. Generá ingresos 24/7.",
  addressLines: ["Balcarce, Buenos Aires,", "Argentina"],
  addressHref: "https://maps.app.goo.gl/nXCnwQjhnH6tnq9G7",
  email: "colvendingargentina@gmail.com",
  hoursLines: ["Lunes a Sábados", "09:00 a 20:00 hs"],
  copyright: "© 2024–2026 ColVending. Todos los derechos reservados.",
} as const;

export const SOCIAL_LINKS = [
  {
    platform: "Instagram",
    handle: "@puntoya24",
    url: "https://www.instagram.com/puntoya24/",
    icon: "instagram",
  },
  {
    platform: "YouTube",
    handle: "@maquinas_expendedoras",
    url: "https://www.youtube.com/@maquinas_expendedoras",
    icon: "youtube",
  },
  {
    platform: "TikTok",
    handle: "@maquinas_expendedoras",
    url: "https://www.tiktok.com/@maquinas_expendedoras",
    icon: "tiktok",
  },
] as const;

// Real case study, not a placeholder — content and links provided directly
// by the client. "Punto Ya" is a working store built with ColVending
// machines, run by the same person who imports them from China.
//
// This is the "local automático" niche (a dedicated, fully-automated store
// with several machines) — see UBICACION_PARTICULAR_CONTENT below for the
// other niche (a single machine placed inside a third party's business).
// Both render through the same <CasoRealCase> component (CasoReal.tsx).
export const CASO_REAL_CONTENT = {
  sectionId: "caso-real",
  ariaLabel: "Caso real: local Punto Ya",
  tag: "Caso real",
  nicheLabel: "Local automático",
  heading: "Creando un local automático con máquinas inteligentes",
  // Kept as a subtitle instead of dropped outright — it's the stronger,
  // more concrete marketing hook of the two headings.
  subtitle: "Un local que no para de crecer",
  storeName: "Punto Ya",
  storeTagline: "El primer local automático de todo el país",
  storeSlogan: "Lo que querés, YA!",
  location: "Balcarce, Kelly e/ 21 y 23 Nro 785",
  locationHref: "https://maps.app.goo.gl/oHZHavP7UpCZfgtJ8",
  body: "Este local está equipado con máquinas expendedoras inteligentes, y los resultados no dejan de sorprender. Su dueño, que además importa las máquinas desde China, muestra el día a día en redes: cómo lo gestiona, cómo lo distribuye, cómo funciona y hasta su rentabilidad.",
  ctaQuestion: "Si querés resultados iguales, ¿qué esperás?",
  ctaLabel: "Quiero un local así",
  // Only the two channels tied to the Punto Ya store itself — the footer's
  // "Seguinos" list is the general one and still includes YouTube.
  socials: SOCIAL_LINKS.filter((social) => social.platform !== "YouTube"),
  // Follower count drifts over time — keep it here instead of hardcoded in
  // the component so it's a one-line update.
  followers: {
    count: "16,4 mil",
    label: "Seguidores",
    quote:
      "Estos locales pasarán a ser los nuevos kioscos tradicionales de Argentina. Más barato, más rápido, mejor experiencia.",
  },
} as const;

// Es el nicho "ubicación particular" (una sola máquina instalada en un
// punto estratégico dentro de un negocio de un tercero) — contraparte de
// CASO_REAL_CONTENT ("local automático"). Nombre, ubicación, foto y audio
// ya confirmados por el cliente. Sin quote ni stat a propósito — la card
// se mantiene corta.
export const UBICACION_PARTICULAR_CONTENT = {
  sectionId: "caso-real-particular",
  ariaLabel: "Caso real: ubicación particular",
  tag: "Caso real",
  nicheLabel: "Ubicación particular",
  heading: "Una máquina, un punto estratégico",
  storeName: "Matías Rujlin",
  location: "Clínica en Quilmes, Buenos Aires",
  body: "Uno de nuestros clientes instaló una sola máquina inteligente en una clínica de Quilmes y recuperó su inversión inicial en 3.2 meses. La prueba de que no hace falta un local entero para generar ingresos automáticos.",
  ctaQuestion: "Si querés resultados iguales, ¿qué esperás?",
  ctaLabel: "Quiero mi máquina",
  // src lives in CasoReal.tsx (static import), matching how every other
  // image on the site is imported at the component level, not here.
  photoAlt:
    "Matías Rujlin junto a su máquina inteligente instalada en una clínica de Quilmes, Buenos Aires",
  audioPlaceholder: {
    label: "Audio: la experiencia de Matías",
    audioSrc: "/audio/mati-testimonio.mp3",
  },
} as const;

type MentionSegment = { text: string; href?: string };

// The client was mentioned by these 4 outlets — real names, logos and
// direct links to each mention, all confirmed.
export const MEDIOS_CONTENT = {
  tag: "Nos mencionaron",
  heading: "Mención en los medios de comunicación",
  // Rendered as one paragraph with 2 segments turned into inline anchor
  // links (see Medios.tsx). scroll-behavior:smooth (globals.css) already
  // makes these anchors scroll smoothly, no extra JS needed.
  mentionText: [
    {
      text: "La Nación, Emprendi2 TV, Hablemos de Negocios y Radio Gabal contaron cómo arrancó ColVending. ",
    },
    { text: "Leé la historia del inicio de ColVending", href: "#nosotros" },
    { text: " o " },
    {
      text: "mirá el primer negocio automático de Argentina en acción",
      href: "#caso-real",
    },
    { text: "." },
  ] as MentionSegment[],
  // width/height match each file's real pixel size — needed so
  // object-contain scales them correctly instead of boxing a square logo
  // into a wide frame (or vice versa).
  logos: [
    {
      id: "lanacion",
      label: "La Nación",
      // The article covers several unrelated entrepreneurs before getting
      // to ColVending's mention — the "#:~:text=" text fragment (native
      // browser feature, no cooperation needed from lanacion.com.ar) jumps
      // straight to the "100% automatizado" subheading where it starts.
      // Verified working in Chrome.
      href: "https://www.lanacion.com.ar/tecnologia/abierto-las-24-horas-como-la-experiencia-online-esta-cambiando-el-funcionamiento-de-los-locales-a-la-nid19062026/#:~:text=100%25%20automatizado",
      logoSrc: "/medios/lanacion.jpg",
      width: 1024,
      height: 1024,
    },
    {
      id: "emprendi2tv",
      label: "Emprendi2 TV",
      href: "https://www.instagram.com/p/DZ8JHqrqp2Q/",
      logoSrc: "/medios/emprendi2tv.png",
      width: 198,
      height: 49,
    },
    {
      id: "hablemos-de-negocios",
      label: "Hablemos de Negocios",
      href: "https://www.instagram.com/p/Dbn3PaXj-Z0/",
      logoSrc: "/medios/hablemosdenegocios.jpg",
      width: 150,
      height: 150,
    },
    {
      id: "radiogabal",
      label: "Radio Gabal",
      href: "https://www.instagram.com/p/DTnkRv4kXq3/",
      logoSrc: "/medios/radiogabal.jpg",
      width: 150,
      height: 150,
    },
  ],
} as const;

export const HERO_CONTENT = {
  kicker: "Balcarce, Buenos Aires · Argentina",
  titleLines: ["Generá ingresos", "las 24 horas", "con máquinas expendedoras"],
  titleHighlight: "las 24 horas",
  subtitle:
    "Un negocio automatizado, escalable y fácil de administrar desde tu celular. Sin empleados, sin horarios. Tu inversión trabajando sola.",
  ctaPrimary: "Hablar con un asesor",
  ctaSecondary: "Descargar propuesta",
  proposalHref: "/propuesta-colvending.pdf",
  badges: [
    { icon: "clock", label: "Operación 24/7" },
    { icon: "smartphone", label: "Monitoreo remoto" },
    { icon: "userX", label: "Sin empleados" },
    { icon: "shieldCheck", label: "Garantía incluida" },
    { icon: "zap", label: "Fácil instalación" },
  ],
  stats: [
    { value: null, display: "300–600", label: "Unidades" },
    { value: 60, display: "60", label: "Variedades" },
    { value: null, display: "24/7", label: "Operación" },
    { value: 12, display: "12", label: "Meses garantía" },
  ],
} as const;

export const BENEFICIOS_CONTENT = {
  tag: "Por qué elegir ColVending",
  heading: "¿Por qué cada vez más personas invierten en máquinas expendedoras?",
  items: [
    {
      icon: "clock",
      titulo: "24/7 sin parar",
      desc: "Vendé mientras dormís, los fines de semana y feriados.",
    },
    {
      icon: "userX",
      titulo: "Sin empleados",
      desc: "No requiere personal fijo. Operación 100% autónoma.",
    },
    {
      icon: "smartphone",
      titulo: "Control remoto",
      desc: "Administrá stock, precios y reportes desde tu celular, PC o tablet.",
    },
    {
      icon: "trendingUp",
      titulo: "Escalable",
      desc: "Empezá con una máquina y expandí tu red en menos de 12 meses.",
    },
    {
      icon: "wrench",
      titulo: "Bajo mantenimiento",
      desc: "Manejo rápido e intuitivo.",
    },
    {
      icon: "dollar",
      titulo: "Ingreso pasivo",
      desc: "Ideal para complementar tu actividad principal.",
    },
  ],
} as const;

// The client only sells one real model in Argentina today — the "Máquina
// Mixta". The rest of the catalog (coffee, etc.) exists but isn't sold
// here yet, so this is a single featured-product section, not a picker.
// "Ver catálogo completo" opens the real PDF catalog (public/); the
// placeholder /catalogo page (src/app/catalogo) is no longer linked from
// here and is now only reachable by direct URL / the sitemap.
export const PRODUCTO_CONTENT = {
  tag: "Catálogo",
  heading: "Nuestro modelo",
  lead: "El equipo más completo y versátil de nuestro catálogo, listo para instalar en cualquier espacio.",
  // Client-requested rename dropped "Máquina Mixta" and the "ColVending"
  // brand from the product name — applied literally per their instruction.
  nombre: "MODELO INTELIGENTE YX-SHJHW-02",
  desc: "Combina snacks, bebidas y comida en un solo equipo. La solución más completa y versátil para cualquier espacio.",
  specs: [
    "Capacidad: 300 a 600 unidades",
    "Hasta 60 variedades",
    "Pantalla táctil y sistema de pago (QR, tarjeta, efectivo)",
    "Refrigeración regulable de 4°C a 25°C",
    "Configuración totalmente personalizable",
    "Garantía: 12 meses",
    "Repuestos originales, servicio técnico online y presencial",
  ],
  // Real spec sheet from the supplier. Keep this to physical/technical specs
  // of the machine itself — delivery time, after-sales support and similar
  // "process" questions live in the FAQ (and get asked directly over
  // WhatsApp), not here.
  techSpecs: [
    {
      label: "Dimensiones",
      value: "1276 mm (ancho) x 790 mm (profundidad) x 1942 mm (alto)",
    },
    { label: "Peso", value: "300 kg" },
    { label: "Modelo", value: "YX-SHJHW-02 — estructura de acero" },
    { label: "Interfaz de pago", value: "MDB / DEX" },
    {
      label: "Certificaciones",
      value: "CE, RoHS, FCC, ISO 9001:2015, ISO 14001:2015",
    },
    { label: "Origen", value: "Guangzhou, China" },
  ],
  techSpecsTitle: "Especificaciones técnicas",
  techSpecsCta: "Ver especificaciones técnicas",
  price: {
    display: "Valor: $10.000.000",
    note: [
      "Forma de pago: $5.000.000 anticipo y 4 cuotas fijas sin interés de $1.250.000",
      "Transferencia, depósito, USD, pesos, efectivo",
    ],
  },
  ctaPrimary: "Hablar con un asesor",
  ctaSecondary: "Ver catálogo completo",
  catalogHref: "/catalogo-colvending-2026.pdf",
} as const;

// No hard commercial/legal terms (territory exclusivity, franchise fee,
// contract length) are confirmed with the client yet, so none are stated
// here — the pillars below only describe things already true elsewhere on
// this site (the FAQ's location-assistance answer, the delivery/support
// FAQ, the real media mentions and socials). The investment note
// deliberately gives no figure: franchise cost varies by package/territory
// and isn't finalized, so the copy routes to a WhatsApp conversation
// instead of a number — this is intentional, not a placeholder to fill in.
export const FRANQUICIAS_CONTENT = {
  tag: "Próximamente franquicias",
  // Rebrand to PuntoYa (the client's first automated store, already
  // featured in CASO_REAL_CONTENT). Kept the voseo tilde ("Llevá") for
  // consistency with every other heading on the site ("Generá", "Vendé",
  // "Administrá") — the client wrote "Lleva" without it.
  heading: "Llevá PuntoYa a tu ciudad",
  lead: "Convertite en dueño de un negocio automático, abierto 24/7 y respaldado por Colvending. Un modelo probado, escalable y listo para replicar en tu ciudad.",
  pillars: [
    {
      icon: "mapPin",
      titulo: "Ubicación asistida",
      desc: "Te acompañamos en la selección de tu ubicación, mostrándote referencias de retorno de inversión según la zona elegida.",
    },
    {
      icon: "packageCheck",
      titulo: "Paquete de arranque",
      desc: "Arrancás con un pack de varias máquinas inteligentes listas para operar, stock inicial de producto y cartelería de marca. La cantidad de máquinas ideales para tu proyecto se define según la zona elegida y la cantidad de productos a comercializar.",
    },
    {
      icon: "graduationCap",
      titulo: "Capacitación y soporte",
      desc: "Capacitación completa al recibir tus máquinas — carga de productos, precios y uso de la app de control — más acompañamiento continuo: soporte por WhatsApp, asistencia técnica remota y repuestos en todo el país.",
    },
    {
      icon: "megaphone",
      titulo: "Marca y marketing",
      desc: "Acceso a la identidad de marca ColVending y a la marca registrada Punto Ya, material gráfico para tus máquinas y presencia en las campañas, redes y medios de comunicación de la marca a nivel nacional.",
    },
  ],
  investmentNote:
    "La inversión inicial varía según la cantidad de máquinas y la zona elegida — conversemos y armamos una propuesta a medida para tu franquicia.",
  ctaLabel: "Me interesa la franquicia",
} as const;

export const RENTABILIDAD_CONTENT = {
  tag: "Retorno de inversión",
  heading: "Una inversión diseñada para crecer",
  lead: "Números reales de un negocio probado. Estos valores son estimaciones basadas en operaciones reales de nuestros clientes actuales.",
  stats: [
    {
      val: "3.2–14.8",
      label: "Meses de retorno",
      desc: "Tiempo estimado para recuperar la inversión inicial",
      detail: undefined,
    },
    {
      val: "17.1%",
      label: "ROI promedio por zona",
      desc: "Retorno mensual promedio sobre la inversión, según zona",
      // Marks this card as the one with a "Ver detalle por zona" button
      // (Rentabilidad.tsx) that opens the 6-caso table below (roiPorZona).
      detail: "roiPorZona",
    },
    {
      val: "10–15",
      label: "Años de vida útil",
      desc: "Durabilidad comprobada con mínimo mantenimiento",
      detail: undefined,
    },
    {
      val: "24/7",
      label: "Operación continua",
      desc: "365 días al año, sin días festivos ni vacaciones",
      detail: undefined,
    },
  ],
  disclaimer:
    "Disclaimer: Los valores de retorno y márgenes son estimaciones basadas en condiciones promedio de mercado y resultados de clientes actuales. Los resultados reales pueden variar según la ubicación, el volumen de ventas, el tipo de productos y la gestión del operador. ColVending no garantiza rendimientos específicos.",
  // 6 casos reales documentados por el cliente — base del "17.1% ROI
  // promedio" y el rango "3.2–14.8 meses" de arriba. Se muestran en un
  // modal de detalle (Rentabilidad.tsx) disparado desde la card de ROI.
  roiPorZona: {
    detailLabel: "Ver detalle por zona",
    modalTitle: "ROI por zona — 6 casos documentados",
    columns: ["Cliente", "Ubicación", "ROI mensual", "Recupero"],
    casos: [
      { cliente: "Matías", ubicacion: "Clínica Santa Clara — Quilmes", roiMensual: "31.5%", recupero: "3.2 meses" },
      { cliente: "Coni", ubicacion: "Colegio Luján", roiMensual: "25.8%", recupero: "3.9 meses" },
      { cliente: "Nico", ubicacion: "UTN — Trenque Lauquen", roiMensual: "16.1%", recupero: "6.2 meses" },
      { cliente: "Lara", ubicacion: "Universidad — Buenos Aires", roiMensual: "12.2%", recupero: "8.2 meses" },
      { cliente: "Simón", ubicacion: "Secundaria — Buenos Aires", roiMensual: "10.2%", recupero: "9.8 meses" },
      { cliente: "Agus", ubicacion: "Complemento a kiosco existente", roiMensual: "6.8%", recupero: "14.8 meses" },
    ],
    promedio: { label: "Promedio de las 6 zonas", roiMensual: "17.1%", recupero: "7.7 meses" },
  },
} as const;

type TextSegment = { text: string; emphasis?: "strong" | "accent" };
type TimelineEntry = {
  year: string;
  empresa: string;
  desc: string;
  accent?: boolean;
};

// TODO: el cliente pidió revisar y corregir estos datos (años, nombres de
// empresas y descripciones de la historia del grupo) antes de publicar.
// Se deja el contenido actual del sitio en vivo como placeholder.
export const NOSOTROS_CONTENT = {
  tag: "Nuestra historia",
  heading: "Más de 10 años importando maquinaria",
  paragraphs: [
    [
      {
        text: "Somos una empresa con más de 10 años de experiencia en importaciones de maquinaria. Nuestra trayectoria comenzó importando maquinaria industrial desde China para poner en marcha ",
      },
      { text: "Agroindustrial Cosanic", emphasis: "strong" },
      { text: ", nuestro primer proyecto de escala industrial." },
    ],
    [
      { text: "Posteriormente desarrollamos " },
      { text: "Colbuilding S.A.", emphasis: "strong" },
      {
        text: ", enfocada en maquinaria vial y equipamiento para construcción e infraestructura en todo el país.",
      },
    ],
    [
      {
        text: "Luego de años de experiencia en importación y comercialización de maquinaria, decidimos incorporar una nueva unidad de negocio: ",
      },
      { text: "máquinas expendedoras automáticas", emphasis: "accent" },
      { text: "." },
    ],
    [
      {
        text: "Nuestro objetivo es brindar oportunidades reales para emprendedores argentinos mediante soluciones automatizadas, accesibles y escalables. Somos una empresa de Balcarce, Buenos Aires, y operamos en todo el territorio nacional.",
      },
    ],
  ] as TextSegment[][],
  ctaLabel: "Hablar con el equipo",
  timeline: [
    {
      year: "2014",
      empresa: "Agroindustrial Cosanic",
      desc: "Importación de maquinaria agroindustrial desde China. Primer proyecto de envergadura del grupo empresarial.",
    },
    {
      year: "2018",
      empresa: "Colbuilding S.A.",
      desc: "Expansión hacia maquinaria vial. Equipamiento para construcción e infraestructura en todo el país.",
    },
    {
      year: "2024",
      empresa: "ColVending",
      desc: "Nueva unidad de negocio: máquinas expendedoras automáticas para el mercado argentino.",
      accent: true,
    },
  ] as TimelineEntry[],
};

export const INSTALACIONES_CONTENT = {
  tag: "Presencia nacional",
  heading: "Ya estamos en todo el país",
  lead: "Varios emprendedores confiaron en ColVending e instalaron su máquina en distintas provincias. Mirá dónde están funcionando algunas de ellas.",
  // Teaser CTA linking to the full /ubicaciones page (src/app/ubicaciones).
  viewAllCta: "Ver todas las ubicaciones",
  // [longitude, latitude] — the order react-simple-maps / GeoJSON expect,
  // not [lat, lon].
  markers: [
    {
      id: "quilmes",
      coordinates: [-58.2694, -34.7206] as [number, number],
      label: "Quilmes, Buenos Aires",
      province: "Buenos Aires",
    },
    {
      id: "tucuman",
      coordinates: [-65.2176, -26.8083] as [number, number],
      label: "Campus UNSTA, Tucumán",
      province: "Tucumán",
    },
    {
      id: "lujan",
      coordinates: [-59.1052, -34.5652] as [number, number],
      label: "Luján, Buenos Aires",
      province: "Buenos Aires",
    },
    {
      id: "zarate",
      coordinates: [-59.0243, -34.097] as [number, number],
      label: "Zárate, Buenos Aires",
      province: "Buenos Aires",
    },
    {
      id: "benavidez",
      coordinates: [-58.697, -34.438] as [number, number],
      label: "Benavídez, Buenos Aires",
      province: "Buenos Aires",
    },
    {
      id: "cordoba",
      coordinates: [-64.1888, -31.4201] as [number, number],
      label: "Córdoba Capital",
      province: "Córdoba",
    },
    {
      id: "trenquelauquen",
      coordinates: [-62.7422, -35.9706] as [number, number],
      label: "Trenque Lauquen, Buenos Aires",
      province: "Buenos Aires",
    },
    {
      id: "balcarce",
      // Rounded to 4 decimals (~11m precision, same as the other markers)
      // — the original 15-decimal value was precise enough to trip a
      // server/client floating-point mismatch in d3-geo's trig math.
      coordinates: [-58.2588, -37.8492] as [number, number],
      label: "Balcarce, Buenos Aires",
      province: "Buenos Aires",
    },
  ],
} as const;

// From the client's location form (2026-08-20), geocoded via Nominatim/
// OpenStreetMap and rounded to 4 decimals. Kept out of
// INSTALACIONES_CONTENT.markers on purpose — the homepage teaser only shows
// the original locations above so it doesn't turn into a long scroll; these
// only appear on the full /ubicaciones page (UbicacionesExplorer.tsx), which
// combines both arrays. `machines` is the client-reported machine count at
// that spot; INSTALACIONES_CONTENT's markers omit it since it isn't known
// for them, not assumed to be 1.
export const UBICACIONES_EXTRA_MARKERS = [
  {
    id: "san-nicolas",
    coordinates: [-60.2166, -33.3277] as [number, number],
    label: "San Nicolás, Buenos Aires",
    province: "Buenos Aires",
    machines: 2,
  },
  {
    id: "santa-rosa",
    coordinates: [-64.2906, -36.6204] as [number, number],
    label: "Santa Rosa, La Pampa",
    province: "La Pampa",
    machines: 1,
  },
  {
    id: "rio-segundo",
    coordinates: [-63.0385, -31.3949] as [number, number],
    label: "Río Segundo, Córdoba",
    province: "Córdoba",
    machines: 1,
  },
  {
    id: "nueve-de-julio",
    coordinates: [-60.8842, -35.4445] as [number, number],
    label: "Nueve de Julio, Buenos Aires",
    province: "Buenos Aires",
    machines: 4,
  },
  {
    id: "neuquen-capital",
    coordinates: [-68.0592, -38.952] as [number, number],
    label: "Neuquén Capital, Neuquén",
    province: "Neuquén",
    machines: 2,
  },
  {
    id: "tucuman-capital",
    // Venues: Sanatorio Parque y Universidad Nacional de Tucumán.
    coordinates: [-65.2038, -26.8304] as [number, number],
    label: "San Miguel de Tucumán, Tucumán",
    province: "Tucumán",
    machines: 3,
  },
  {
    id: "lanus",
    coordinates: [-58.3906, -34.7074] as [number, number],
    label: "Lanús, Buenos Aires",
    province: "Buenos Aires",
    machines: 2,
  },
  {
    id: "tigre",
    // Venues: Bancalari y El Talar de Pacheco.
    coordinates: [-58.5818, -34.4235] as [number, number],
    label: "Tigre, Buenos Aires",
    province: "Buenos Aires",
    machines: 2,
  },
  {
    id: "pilar",
    // Venues: tres clubes distintos en la zona.
    coordinates: [-58.9142, -34.4571] as [number, number],
    label: "Pilar, Buenos Aires",
    province: "Buenos Aires",
    machines: 3,
  },
  {
    id: "los-polvorines",
    coordinates: [-58.6991, -34.5106] as [number, number],
    label: "Los Polvorines, Buenos Aires",
    province: "Buenos Aires",
    machines: 1,
  },
  {
    id: "jose-c-paz",
    coordinates: [-58.7777, -34.5119] as [number, number],
    label: "José C. Paz, Buenos Aires",
    province: "Buenos Aires",
    machines: 1,
  },
  {
    id: "caba-julian-alvarez",
    coordinates: [-58.4339, -34.5994] as [number, number],
    label: "CABA (Julián Álvarez)",
    province: "CABA",
    machines: 1,
  },
  {
    id: "miramar",
    // provincia asumida, confirmar con cliente
    coordinates: [-57.8388, -38.2704] as [number, number],
    label: "Miramar, Buenos Aires",
    province: "Buenos Aires",
    machines: 1,
  },
  {
    id: "caba-favaloro",
    // provincia asumida, confirmar con cliente
    coordinates: [-58.3912, -34.6144] as [number, number],
    label: "CABA (Hospital Favaloro)",
    province: "CABA",
    machines: 1,
  },
  {
    id: "caba-serrano",
    // provincia asumida, confirmar con cliente
    coordinates: [-58.4214, -34.5824] as [number, number],
    label: "CABA (Serrano 630)",
    province: "CABA",
    machines: 1,
  },
] as const;

// Dedicated /ubicaciones page (src/app/ubicaciones) — the full, searchable
// version combining INSTALACIONES_CONTENT.markers and
// UBICACIONES_EXTRA_MARKERS above. This only holds the copy specific to
// that page.
export const UBICACIONES_PAGE_CONTENT = {
  tag: "Dónde estamos",
  heading: "Todas nuestras ubicaciones en Argentina",
  lead: "Cada punto en el mapa es una máquina ColVending real, instalada y en funcionamiento. Buscá por ciudad o filtrá por provincia para ver el detalle completo.",
  installedLabel: "ubicaciones instaladas",
  provincesLabel: "provincias",
  searchPlaceholder: "Buscar por ciudad o provincia...",
  searchAriaLabel: "Buscar ubicación por ciudad o provincia",
  allProvincesLabel: "Todas",
  emptyStateTitle: "No encontramos ubicaciones para esa búsqueda",
  emptyStateBody:
    "Probá con otra ciudad o provincia, o mirá la lista completa.",
  clearFiltersLabel: "Limpiar filtros",
  ctaQuestion: "¿Querés que la próxima máquina esté en tu ciudad?",
  ctaLabel: "Quiero instalar una máquina",
} as const;

// Requested by the client (PDF de correcciones, sección 08): "Así se
// fabrica el proyecto en China antes de llegar a Argentina". Originally
// built as a full homepage section; the client then asked to shrink it to
// a teaser card (Fabrica.tsx) linking out to a dedicated page
// (src/app/fabricacion) with the full photo galleries — same
// teaser-card-on-home + full-content-on-its-own-page pattern as
// INSTALACIONES_CONTENT/UBICACIONES_PAGE_CONTENT.
// PLACEHOLDER: photos in assets/images/fabrica-china/ are extracted from
// the client's reference PDF (screen captures), not production-quality
// files — swap for the real photos/video once the client sends them.
export const FABRICA_CONTENT = {
  sectionId: "fabrica",
  ariaLabel: "Cómo se fabrican las máquinas en China",
  tag: "Fabricación a medida",
  heading: "Así se fabrica el proyecto en China antes de llegar a Argentina",
  lead: "Cada máquina se fabrica de forma personalizada, totalmente a medida del cliente: tanto en su estética (color, diseño, marca) como en su distribución interna de estantes, motores y espirales, adaptada al tipo de producto que se va a comercializar.",
  ctaLabel: "Ver fabricación",
  pageHref: "/fabricacion",
  // Distinct copy for the /fabricacion page itself — repeating the
  // homepage teaser's heading/lead verbatim after the visitor just clicked
  // through from that exact text read as redundant, so the page picks up
  // the story where the teaser leaves off (the journey) instead of
  // re-pitching the same personalization hook.
  pageHeading: "De la planta en China a tu negocio en Argentina",
  pageLead: "Mirá, paso a paso, el proceso real detrás de cada equipo: desde la planta de producción en China hasta el contenedor que lo trae a Argentina.",
  plantaCaption:
    "Planta de producción — equipos terminados listos para despacho",
  logisticaLead:
    "Proceso de personalización de cada equipo (estantes, motores y espirales a medida), empaquetado y carga en contenedor para el envío a Argentina.",
  logisticaCaption: "Empaquetado, carga y despacho internacional",
  pageCtaQuestion: "¿Querés una máquina así de personalizada para tu negocio?",
  pageCtaLabel: "Quiero mi máquina",
} as const;

export const FAQ_CONTENT = {
  tag: "Preguntas frecuentes",
  heading: "Todo lo que necesitás saber",
  lead: "Resolvemos las dudas más comunes de emprendedores e inversores que consideran esta oportunidad de negocio.",
  categories: [
    {
      cat: "Funcionamiento",
      emoji: "⚙",
      items: [
        {
          q: "¿Cómo funciona el sistema de ventas automático?",
          a: "El cliente selecciona el producto en la pantalla táctil, realiza el pago (QR, tarjeta, efectivo) y la máquina entrega el producto. Todo sin intervención humana. Cada venta queda registrada en tiempo real en tu panel de administración.",
        },
        {
          q: "¿Necesito conocimientos técnicos para operarla?",
          a: "No. La máquina está pensada para que cualquier persona pueda operarla. Desde cargar productos hasta revisar reportes, todo se hace de forma simple desde una web en tu celular, PC o tablet.",
        },
        {
          q: "¿Qué pasa si hay un corte de luz?",
          a: "La máquina cuenta con sistema de memoria no volátil. Al volver la energía, retoma su funcionamiento sin pérdida de datos ni configuraciones.",
        },
        {
          q: "¿Cuánto tiempo lleva instalarla?",
          a: "La instalación consta de 30 minutos. Se necesita conexión 220V y conexión a Internet o 4G. Nuestro equipo técnico te asesora en cada paso.",
        },
      ],
    },
    {
      cat: "Mantenimiento",
      emoji: "🔧",
      items: [
        {
          q: "¿Con qué frecuencia hay que reponer los productos?",
          a: "Depende del nivel de uso. En promedio, 1 o 2 veces al día según la demanda de la ubicación. El sistema te avisa automáticamente cuando el stock de algún producto está por agotarse.",
        },
        {
          q: "¿Quién se encarga del mantenimiento técnico?",
          a: "ColVending brinda soporte técnico remoto y presencial en todo el país. Para problemas simples, nuestro equipo te guía por WhatsApp. Para casos complejos, enviamos un técnico con repuestos originales.",
        },
        {
          q: "¿Qué incluye la garantía?",
          a: "12 meses de garantía total sobre la máquina. Cubre defectos de fabricación, componentes electrónicos, sistema de refrigeración y pantalla táctil.",
        },
        {
          q: "¿Con qué frecuencia hay que limpiar la máquina?",
          a: "Una limpieza superficial semanal y una limpieza profunda mensual es suficiente.",
        },
      ],
    },
    {
      cat: "Productos",
      emoji: "📦",
      items: [
        {
          q: "¿Qué tipo de productos puedo vender?",
          a: "Snacks, golosinas, bebidas frías, agua mineral, jugos, energizantes, productos saludables, accesorios, comida rápida como hamburguesas, pizzas, sándwiches, etc., y cualquier producto que se adapte a las dimensiones de almacenamiento del equipo (ejemplo: un cliente de Tigre almacena envases de pelotas de pádel). La selección es totalmente personalizable.",
        },
        {
          q: "¿Dónde consigo los productos para reponer?",
          a: "Podés comprarlos en cualquier distribuidora, mayorista o supermercado mayorista de tu zona. También podemos conectarte con proveedores de nuestra red con precios preferenciales.",
        },
        {
          q: "¿Cuántas variedades de productos entran en una máquina?",
          a: "Dependiendo del modelo: entre 30 y 60 variedades diferentes. Cada espiral puede configurarse con distintas cantidades según el tamaño del producto.",
        },
        {
          q: "¿Puedo cambiar los productos que vendo?",
          a: "Sí, en cualquier momento. La configuración es completamente flexible. Podés adaptar la oferta a la temporada, al local o a las preferencias de tus clientes.",
        },
      ],
    },
    {
      cat: "Seguridad",
      emoji: "🔒",
      items: [
        {
          q: "¿Es segura la máquina contra robos o vandalismo?",
          a: "Las máquinas cuentan con estructura de acero reforzado, cerradura de seguridad, vidrio doble blindado y trabas de seguridad en las ruedas.",
        },
        {
          q: "¿Qué pasa con el dinero en efectivo que se guarda dentro de la máquina?",
          a: "El efectivo queda guardado en un casetero de acero con cerradura de seguridad. Te recomendamos retirarlo diariamente y tener una buena práctica de control, para evitar cualquier tipo de problema.",
        },
      ],
    },
    {
      cat: "Ubicaciones",
      emoji: "📍",
      items: [
        {
          q: "¿Dónde puedo instalar una máquina expendedora?",
          a: "En cualquier lugar con tráfico constante de personas: fábricas, oficinas, hospitales, universidades, gimnasios, shoppings, hoteles, estaciones de servicio, aeropuertos, clubes y más. Te ayudamos a evaluar la viabilidad de cada ubicación.",
        },
        {
          q: "¿Necesito un local propio para poner la máquina?",
          a: "No necesariamente. Podés negociar un espacio en propiedades de terceros (fábricas, establecimientos educativos, gimnasios) a cambio de una comisión sobre las ventas o un alquiler mensual fijo. Es un modelo muy habitual.",
        },
        {
          q: "¿Cuántos metros cuadrados necesita la máquina?",
          a: "La máquina ocupa un espacio de aproximadamente 1,28 m de ancho por 0,79 m de profundidad. Además, hay que dejar unos 0,80 m libres por delante para que los clientes puedan usarla cómodamente.",
        },
      ],
    },
    {
      cat: "Rentabilidad",
      emoji: "💰",
      items: [
        {
          q: "¿En cuánto tiempo recupero la inversión?",
          a: "En condiciones promedio de uso, el retorno de la inversión inicial se estima entre 3 y 15 meses, con un promedio de 7 meses. El plazo varía según la ubicación, el volumen de ventas y el tipo de productos.",
        },
        {
          q: "¿Cuál es el margen de ganancia por producto?",
          a: "Recomendamos un margen del 40% sobre el costo del producto. Es un margen saludable que, combinado con el bajo costo operativo del negocio (sin empleados y con costo de alquiler bajo), lo vuelve muy rentable para el operador y atractivo en precio para el consumidor final.",
        },
        {
          q: "¿Cuántas máquinas necesito para vivir de esto?",
          a: "Depende de tus gastos y metas. Muchos operadores empiezan con 1 a 3 máquinas para complementar ingresos, y luego escalan hasta tener una red de 10, 20 o más unidades.",
        },
      ],
    },
    {
      cat: "Soporte",
      emoji: "🧑‍💻",
      items: [
        {
          q: "¿Cómo es la capacitación inicial?",
          a: "Brindamos capacitación completa al momento de la entrega: cómo cargar productos, configurar precios, usar la web de control y resolver problemas comunes. Incluye videos tutoriales y, en caso de dudas, una videollamada con nuestro equipo técnico para resolverlas de forma online.",
        },
        {
          q: "¿Qué soporte tienen disponible?",
          a: "Soporte por WhatsApp de lunes a viernes de 9:00 a 20:00 hs, asistencia técnica remota, visitas técnicas presenciales programadas y repuestos originales disponibles en todo el país.",
        },
        {
          q: "¿Qué pasa si la máquina tiene un problema en fin de semana?",
          a: "Tenemos soporte y respuesta todos los días de la semana, independientemente de si es feriado o domingo.",
        },
      ],
    },
  ],
} as const;
