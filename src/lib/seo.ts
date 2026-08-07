// Single source of truth for the production URL, used by metadataBase,
// canonical tags, robots.ts, sitemap.ts and JSON-LD.
//
// [PENDIENTE DE CONFIRMAR CON CLIENTE]: no hay todavía un dominio de
// producción confirmado para este rediseño. Seteá NEXT_PUBLIC_SITE_URL en
// el entorno de deploy (o reemplazá el fallback de abajo) apenas se defina
// el dominio final — todo lo que depende de esto (canonical, sitemap,
// robots.txt, JSON-LD) se actualiza solo desde acá.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.colvending.com.ar";
