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
  hoursLines: ["Lunes a Viernes", "8:00 a 20:00 hs"],
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
  heading: "Creando un local con los equipos",
  // Kept as a subtitle instead of dropped outright — it's the stronger,
  // more concrete marketing hook of the two headings.
  subtitle: "Un local que no para de crecer",
  storeName: "Punto Ya",
  storeTagline: "El primer local automático de todo el país",
  storeSlogan: "Lo que querés, YA!",
  location: "Balcarce, Kelly e/ 21 y 23 Nro 785",
  locationHref: "https://maps.app.goo.gl/oHZHavP7UpCZfgtJ8",
  body: "Este local ya está armado y equipado con máquinas ColVending — y no para de crecer. Su dueño, que además importa las máquinas desde China, muestra el día a día en redes: cómo lo reestockea, lo modifica y lo va mejorando.",
  ctaQuestion: "Si querés resultados iguales, ¿qué esperás?",
  ctaLabel: "Quiero un local así",
  // Only the two channels tied to the Punto Ya store itself — the footer's
  // "Seguinos" list is the general one and still includes YouTube.
  socials: SOCIAL_LINKS.filter((social) => social.platform !== "YouTube"),
  // Follower count drifts over time — keep it here instead of hardcoded in
  // the component so it's a one-line update.
  followers: {
    count: "13,2 mil",
    label: "Seguidores",
    quote:
      "La verdad, muy orgulloso de haber creado el primer local automático de Argentina. ¡Siempre con ganas de más!",
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
  storeName: "Mati",
  location: "Clínica en Quilmes, Buenos Aires",
  body: "Uno de nuestros clientes instaló una sola máquina ColVending en una clínica de Quilmes y recuperó su inversión inicial en apenas 1 mes. La prueba de que no hace falta un local entero para generar ingresos automáticos.",
  ctaQuestion: "Si querés resultados iguales, ¿qué esperás?",
  ctaLabel: "Quiero mi máquina",
  // src lives in CasoReal.tsx (static import), matching how every other
  // image on the site is imported at the component level, not here.
  photoAlt:
    "Mati junto a su máquina ColVending instalada en una clínica de Quilmes, Buenos Aires",
  audioPlaceholder: {
    label: "Audio: la experiencia de Mati",
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
      text: "Radio Gabal, Hablemos de Negocios, Emprendi2 TV y La Nación contaron cómo arrancó ColVending. ",
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
      id: "radiogabal",
      label: "Radio Gabal",
      href: "https://www.instagram.com/p/DTnkRv4kXq3/",
      logoSrc: "/medios/radiogabal.jpg",
      width: 150,
      height: 150,
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
      id: "emprendi2tv",
      label: "Emprendi2 TV",
      href: "https://www.instagram.com/p/DZ8JHqrqp2Q/",
      logoSrc: "/medios/emprendi2tv.png",
      width: 198,
      height: 49,
    },
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
      desc: "Administrá stock, precios y reportes desde tu celular.",
    },
    {
      icon: "trendingUp",
      titulo: "Escalable",
      desc: "Empezá con una máquina y expandí tu red cuando quieras.",
    },
    {
      icon: "wrench",
      titulo: "Bajo mantenimiento",
      desc: "Reposición rápida y simple. Sin conocimientos técnicos.",
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
    "Capacidad: 300 a 600 unidades (PCS)",
    "Hasta 60 variedades",
    "Pantalla táctil y sistema de pago (QR, tarjeta, efectivo)",
    "Refrigeración regulable",
    "Configuración totalmente personalizable",
    "Garantía: 12 meses",
  ],
  // Real spec sheet from the supplier. Keep this to physical/technical specs
  // of the machine itself — delivery time, after-sales support and similar
  // "process" questions live in the FAQ (and get asked directly over
  // WhatsApp), not here.
  techSpecs: [
    {
      label: "Dimensiones",
      value: "850 mm (ancho) x 1350 mm (profundidad) x 2047 mm (alto)",
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
  tag: "Franquicias ColVending",
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
      desc: "Te ayudamos a evaluar y negociar cada ubicación — tráfico, tipo de local, condiciones de alquiler o comisión — para que la elijas con datos, no a ciegas.",
    },
    {
      icon: "packageCheck",
      titulo: "Paquete de arranque",
      desc: "Arrancás con un pack de varias máquinas Mixtas ColVending listas para operar, stock inicial de producto y cartelería de marca — la cantidad exacta se ajusta según tu inversión y la zona elegida.",
    },
    {
      icon: "graduationCap",
      titulo: "Capacitación y soporte",
      desc: "Capacitación completa al recibir tus máquinas — carga de productos, precios y uso de la app de control — más acompañamiento continuo: soporte por WhatsApp, asistencia técnica remota y repuestos en todo el país.",
    },
    {
      icon: "megaphone",
      titulo: "Marca y marketing",
      desc: "Acceso a la identidad de marca ColVending, material gráfico para tus máquinas y presencia en las campañas, redes y medios de comunicación de la marca a nivel nacional.",
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
      val: "12–18",
      label: "Meses de retorno",
      desc: "Tiempo estimado para recuperar la inversión inicial",
    },
    {
      val: "60%–120%",
      label: "Margen promedio",
      desc: "Ganancia sobre el costo de cada producto vendido",
    },
    {
      val: "10–15",
      label: "Años de vida útil",
      desc: "Durabilidad comprobada con mínimo mantenimiento",
    },
    {
      val: "24/7",
      label: "Operación continua",
      desc: "365 días al año, sin días festivos ni vacaciones",
    },
  ],
  disclaimer:
    "Disclaimer: Los valores de retorno y márgenes son estimaciones basadas en condiciones promedio de mercado y resultados de clientes actuales. Los resultados reales pueden variar según la ubicación, el volumen de ventas, el tipo de productos y la gestión del operador. ColVending no garantiza rendimientos específicos.",
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
          a: "No. La máquina está pensada para que cualquier persona pueda operarla. Desde cargar productos hasta revisar reportes, todo se hace de forma simple desde una app en tu celular.",
        },
        {
          q: "¿Qué pasa si hay un corte de luz?",
          a: "La máquina cuenta con sistema de memoria no volátil. Al volver la energía, retoma su funcionamiento sin pérdida de datos ni configuraciones.",
        },
        {
          q: "¿Cuánto tiempo lleva instalarla?",
          a: "La instalación básica es de 1 a 2 horas. Solo necesitás una toma de corriente estándar (220V) y el espacio adecuado. Nuestro equipo técnico te asesora en cada paso.",
        },
      ],
    },
    {
      cat: "Mantenimiento",
      emoji: "🔧",
      items: [
        {
          q: "¿Con qué frecuencia hay que reponer los productos?",
          a: "Depende del nivel de uso. En promedio, una vez cada 3 a 7 días. El sistema te avisa automáticamente cuando el stock de algún producto está por agotarse.",
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
          a: "Una limpieza superficial semanal y una limpieza profunda mensual es suficiente. Te proveemos el manual de mantenimiento y limpieza con cada máquina.",
        },
      ],
    },
    {
      cat: "Productos",
      emoji: "📦",
      items: [
        {
          q: "¿Qué tipo de productos puedo vender?",
          a: "Snacks, golosinas, bebidas frías y calientes, agua mineral, jugos, energizantes, productos saludables, artículos de librería, accesorios, y más. La selección es totalmente personalizable según tu ubicación.",
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
          a: "El efectivo queda guardado en un casetero de acero con cerradura de seguridad. Te recomendamos retirarlo semanalmente y tener una buena práctica de control, para evitar cualquier tipo de problema.",
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
          a: "La máquina ocupa un espacio de aproximadamente 0,90 m de ancho por 0,80 m de profundidad. Además, hay que dejar unos 0,80 m libres por delante para que los clientes puedan usarla cómodamente.",
        },
      ],
    },
    {
      cat: "Rentabilidad",
      emoji: "💰",
      items: [
        {
          q: "¿En cuánto tiempo recupero la inversión?",
          a: "En condiciones promedio de uso, el retorno de la inversión inicial se estima entre 12 y 18 meses. El plazo varía según la ubicación, el volumen de ventas y el tipo de productos.",
        },
        {
          q: "¿Cuál es el margen de ganancia por producto?",
          a: "El margen promedio sobre el costo del producto es del 60% al 120%, dependiendo del tipo de artículo. Los snacks y bebidas tienen márgenes especialmente atractivos.",
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
          a: "Brindamos capacitación completa al momento de la entrega: cómo cargar productos, configurar precios, usar la app de control, resolver problemas comunes y limpiar la máquina. También te entregamos un manual completo.",
        },
        {
          q: "¿Qué soporte tienen disponible?",
          a: "Soporte por WhatsApp de lunes a viernes de 9:00 a 20:00 hs, asistencia técnica remota, visitas técnicas presenciales programadas y repuestos originales disponibles en todo el país.",
        },
        {
          q: "¿Qué pasa si la máquina tiene un problema en fin de semana?",
          a: "Contamos con guardia de emergencias para fallas críticas. Para el resto de los casos, podés reportarlos y se atienden el primer día hábil con prioridad máxima.",
        },
      ],
    },
  ],
} as const;
