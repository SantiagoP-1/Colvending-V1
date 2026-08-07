// Copy ported from the current site (index.html / manifest.js). Keep this
// file as the single source of truth for real copy — do not invent figures,
// history or testimonials here. Sections still missing client-approved
// content use an explicit [PENDIENTE DE CONFIRMAR CON CLIENTE] placeholder.

export const BRAND = {
  name: "ColVending",
  tagline: "Automatizá ventas. Generá ingresos 24/7.",
  addressLines: ["Balcarce, Buenos Aires,", "Argentina"],
  email: "info@colvending.com.ar",
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
  body: "Este local ya está armado y equipado con máquinas ColVending — y no para de crecer. Su dueño, que además importa las máquinas desde China, muestra el día a día en redes: cómo lo reestockea, lo modifica y lo va mejorando.",
  ctaQuestion: "Si querés resultados iguales, ¿qué esperás?",
  ctaLabel: "Quiero un local así",
  // Only the two channels tied to the Punto Ya store itself — the footer's
  // "Seguinos" list is the general one and still includes YouTube.
  socials: SOCIAL_LINKS.filter((social) => social.platform !== "YouTube"),
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
    { value: 500, display: "500", label: "Unidades" },
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

export const MAQUINAS_CONTENT = {
  tag: "Catálogo",
  heading: "Nuestros modelos",
  lead: "Cada modelo está diseñado para maximizar las ventas según el tipo de ubicación y el volumen de tráfico.",
  items: [
    {
      id: "bebidas",
      categoria: "Bebidas",
      tagLabel: "Bebidas",
      nombre: "Máquina de Bebidas",
      desc: "Bebidas frías y calientes, jugos, aguas y energizantes. Refrigeración regulable. Ideal para espacios con alta demanda de hidratación.",
      specs: [
        "Hasta 300 unidades",
        "Hasta 30 variedades",
        "Pantalla táctil y refrigeración",
      ],
    },
    {
      id: "snacks",
      categoria: "Snacks",
      tagLabel: "Snacks",
      nombre: "Máquina de Snacks",
      desc: "Golosinas, galletitas, barras de cereal y snacks saludables. La mayor capacidad del catálogo, ideal para espacios de alto tráfico.",
      specs: [
        "Hasta 500 unidades",
        "Hasta 60 variedades",
        "Ruedas con traba y pantalla táctil",
      ],
    },
    {
      id: "mixta",
      categoria: "Mixta",
      tagLabel: "⭐ Más elegido",
      nombre: "Máquina Mixta",
      desc: "Combina snacks y bebidas en un solo equipo. La solución más completa y versátil para cualquier espacio. El modelo más elegido por nuestros clientes.",
      specs: [
        "Hasta 400 unidades",
        "Hasta 40 variedades mixtas",
        "Configuración totalmente personalizable",
      ],
    },
  ],
} as const;

// NEW section — no client-approved figures or legal terms exist yet for
// this offer. Every concrete number/condition below is an explicit
// placeholder; do not replace with invented figures.
export const FRANQUICIAS_CONTENT = {
  tag: "Franquicias ColVending",
  heading: "Llevá ColVending a tu ciudad",
  lead: "Un modelo de franquicia pensado para quienes quieren construir una red de máquinas expendedoras con el respaldo, la marca y el know-how de ColVending — no una máquina suelta, sino un negocio replicable.",
  pillars: [
    {
      icon: "mapPin",
      titulo: "Territorio exclusivo",
      desc: "[PENDIENTE DE CONFIRMAR CON CLIENTE] — alcance y exclusividad de zona por franquiciado.",
    },
    {
      icon: "packageCheck",
      titulo: "Paquete de arranque",
      desc: "[PENDIENTE DE CONFIRMAR CON CLIENTE] — cantidad de máquinas, equipamiento y stock inicial incluidos.",
    },
    {
      icon: "graduationCap",
      titulo: "Capacitación y soporte",
      desc: "[PENDIENTE DE CONFIRMAR CON CLIENTE] — programa de formación y acompañamiento continuo para el franquiciado.",
    },
    {
      icon: "megaphone",
      titulo: "Marca y marketing",
      desc: "[PENDIENTE DE CONFIRMAR CON CLIENTE] — materiales de marca, presencia digital y campañas centralizadas.",
    },
  ],
  investmentNote:
    "[PENDIENTE DE CONFIRMAR CON CLIENTE] — inversión inicial, condiciones comerciales y plazos de la franquicia.",
  ctaLabel: "Quiero ser franquiciado",
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
      val: "60–120%",
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
          a: "Las máquinas cuentan con estructura de acero reforzado, cerradura de seguridad y sistema de alarma anti-vandálica. En caso de manipulación forzada, el sistema envía una alerta inmediata a tu celular.",
        },
        {
          q: "¿Qué pasa con el dinero en efectivo dentro de la máquina?",
          a: "El efectivo queda guardado en un casetero de acero con cerradura de seguridad. Te recomendamos retirarlo periódicamente y tenemos buenas prácticas para minimizar el riesgo.",
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
          a: "La huella mínima es de aproximadamente 0,90m x 0,80m. Necesitás además un espacio de 0,80m frente para que los clientes puedan operar cómodamente.",
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
        {
          q: "¿Hay costos fijos mensuales?",
          a: "Los únicos costos recurrentes son: el alquiler o comisión del espacio (si aplica), la reposición de productos y la energía eléctrica (consumo muy bajo, aprox. $5.000–$8.000/mes por máquina).",
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
          a: "Soporte por WhatsApp de lunes a viernes de 9 a 18 hs, asistencia técnica remota, visitas técnicas presenciales programadas y repuestos originales disponibles en todo el país.",
        },
        {
          q: "¿Qué pasa si la máquina tiene un problema en fin de semana?",
          a: "Contamos con guardia de emergencias para fallas críticas. Para el resto de los casos, podés reportarlos y se atienden el primer día hábil con prioridad máxima.",
        },
      ],
    },
  ],
} as const;

// Original UI copy for the demo lead-qualification flow (not ported from
// the live site — it doesn't exist there yet). No backend: state machine +
// simulated submit only, per the prototype scope.
export const LEAD_FORM_CONTENT = {
  tag: "¿Es para vos?",
  heading: "Descubrí si tu perfil califica",
  lead: "Respondé 4 preguntas rápidas y te decimos si tu proyecto encaja con lo que buscamos en un nuevo operador ColVending.",
  steps: [
    {
      id: "presupuesto",
      question: "¿Con qué presupuesto contás hoy?",
      options: [
        { value: "sin-definir", label: "Todavía no lo definí" },
        { value: "una-maquina", label: "Capital para 1 máquina" },
        { value: "varias-maquinas", label: "Capital para 2 a 5 máquinas" },
        { value: "franquicia", label: "Busco una inversión mayor (franquicia)" },
      ],
    },
    {
      id: "ubicacion",
      question: "¿Ya tenés un lugar para instalarla?",
      options: [
        { value: "listo", label: "Sí, tengo el espacio listo" },
        { value: "en-mente", label: "Tengo un lugar en mente, falta confirmar" },
        { value: "necesito-ayuda", label: "Todavía no, necesito ayuda para encontrar uno" },
      ],
    },
    {
      id: "objetivo",
      question: "¿Cuál es tu objetivo principal?",
      options: [
        { value: "ingreso-extra", label: "Generar un ingreso extra" },
        { value: "negocio-principal", label: "Armar mi negocio principal" },
        { value: "franquicia", label: "Evaluar una franquicia ColVending" },
        { value: "diversificar", label: "Diversificar inversiones" },
      ],
    },
    {
      id: "plazo",
      question: "¿En cuánto tiempo te gustaría arrancar?",
      options: [
        { value: "ya", label: "Lo antes posible" },
        { value: "3-meses", label: "En los próximos 3 meses" },
        { value: "sin-fecha", label: "Estoy evaluando, sin fecha definida" },
      ],
    },
  ],
  submitting: "Analizando tu perfil...",
  qualified: {
    heading: "¡Tu perfil califica!",
    body: "Encontramos buen encaje entre tu proyecto y lo que buscamos en un nuevo operador. Un asesor de ColVending te va a contactar por WhatsApp para avanzar con los próximos pasos.",
    cta: "Hablar con un asesor ahora",
  },
  notQualifiedYet: {
    heading: "Todavía estás en etapa de exploración",
    body: "Por ahora tu proyecto necesita definirse un poco más antes de avanzar. Te dejamos información para que sigas evaluando, y cuando estés listo hablamos con gusto.",
    cta: "Consultar de todas formas",
  },
} as const;
