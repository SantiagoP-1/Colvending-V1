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
export const CASO_REAL_CONTENT = {
  tag: "Caso real",
  heading: "Un local que no para de crecer",
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
    quote: "La verdad, muy orgulloso de haber creado el primer local automático de Argentina. ¡Siempre con ganas de más!",
  },
} as const;

type MentionSegment = { text: string; href?: string };

// The client was mentioned by these 3 outlets — real names, logos and
// direct links to each mention, all confirmed.
export const MEDIOS_CONTENT = {
  tag: "Nos mencionaron",
  heading: "Mención en los medios de comunicación",
  // Rendered as one paragraph with 2 segments turned into inline anchor
  // links (see Medios.tsx). scroll-behavior:smooth (globals.css) already
  // makes these anchors scroll smoothly, no extra JS needed.
  mentionText: [
    { text: "Radio Gabal, Hablemos de Negocios y Emprendi2 TV contaron cómo arrancó ColVending. " },
    { text: "Leé la historia del inicio de ColVending", href: "#nosotros" },
    { text: " o " },
    { text: "mirá el primer negocio automático de Argentina en acción", href: "#caso-real" },
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
// Full catalog lives at /catalogo (placeholder page) until that changes.
export const PRODUCTO_CONTENT = {
  tag: "Catálogo",
  heading: "Nuestro modelo",
  lead: "El equipo más completo y versátil de nuestro catálogo, listo para instalar en cualquier espacio.",
  nombre: "Máquina Mixta ColVending",
  desc: "Combina snacks, bebidas y comida en un solo equipo. La solución más completa y versátil para cualquier espacio.",
  badge: "⭐ Más elegido",
  specs: [
    "Capacidad: 300 a 600 unidades (PCS)",
    "Hasta 40 variedades mixtas",
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
    { label: "Dimensiones", value: "850 mm (ancho) x 1350 mm (profundidad) x 2047 mm (alto)" },
    { label: "Peso", value: "300 kg" },
    { label: "Modelo", value: "YX-SHJHW-02 — estructura de acero" },
    { label: "Interfaz de pago", value: "MDB / DEX" },
    { label: "Certificaciones", value: "CE, RoHS, FCC, ISO 9001:2015, ISO 14001:2015" },
    { label: "Origen", value: "Guangzhou, China" },
  ],
  techSpecsTitle: "Especificaciones técnicas",
  techSpecsCta: "Ver especificaciones técnicas",
  price: {
    display: "$15.000.000 ARS + IVA.", // TODO: confirmar precio final con el cliente
    note: "Precio estimado.",
  },
  ctaPrimary: "Hablar con un asesor",
  ctaSecondary: "Ver catálogo completo",
  catalogHref: "/catalogo",
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
  heading: "Llevá ColVending a tu ciudad",
  lead: "Un modelo de franquicia pensado para quienes quieren construir una red de máquinas expendedoras con el respaldo y la marca de Colvending — no una máquina suelta, sino un negocio replicable.",
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
      { text: "Somos una empresa con más de 10 años de experiencia en importaciones de maquinaria. Nuestra trayectoria comenzó importando maquinaria industrial desde China para poner en marcha " },
      { text: "Agroindustrial Cosanic", emphasis: "strong" },
      { text: ", nuestro primer proyecto de escala industrial." },
    ],
    [
      { text: "Posteriormente desarrollamos " },
      { text: "Colbuilding S.A.", emphasis: "strong" },
      { text: ", enfocada en maquinaria vial y equipamiento para construcción e infraestructura en todo el país." },
    ],
    [
      { text: "Luego de años de experiencia en importación y comercialización de maquinaria, decidimos incorporar una nueva unidad de negocio: " },
      { text: "máquinas expendedoras automáticas", emphasis: "accent" },
      { text: "." },
    ],
    [
      { text: "Nuestro objetivo es brindar oportunidades reales para emprendedores argentinos mediante soluciones automatizadas, accesibles y escalables. Somos una empresa de Balcarce, Buenos Aires, y operamos en todo el territorio nacional." },
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
          a: "Soporte por WhatsApp de lunes a viernes de 8:00 a 20:00 hs, asistencia técnica remota, visitas técnicas presenciales programadas y repuestos originales disponibles en todo el país.",
        },
        {
          q: "¿Qué pasa si la máquina tiene un problema en fin de semana?",
          a: "Contamos con guardia de emergencias para fallas críticas. Para el resto de los casos, podés reportarlos y se atienden el primer día hábil con prioridad máxima.",
        },
      ],
    },
  ],
} as const;
