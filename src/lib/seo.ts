// Single source of truth for the production URL, used by metadataBase,
// canonical tags, robots.ts, sitemap.ts and JSON-LD.
//
// [PENDIENTE DE CONFIRMAR CON CLIENTE]: no hay todavía un dominio propio
// (ej. colvending.com.ar) confirmado. El fallback apunta al dominio real
// donde está deployado hoy (Vercel) para que canonical/OG/sitemap/robots
// nunca queden apuntando a una URL que no resuelve. Apenas el cliente
// confirme un dominio propio y quede conectado en Vercel, seteá
// NEXT_PUBLIC_SITE_URL en el entorno de deploy — todo lo que depende de
// esto se actualiza solo desde acá, sin tocar este archivo.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://colvending-v1.vercel.app";
