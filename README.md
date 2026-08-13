# ColVending

Sitio web comercial de **ColVending**, empresa de Balcarce (Buenos Aires, Argentina) dedicada a la venta e instalación de máquinas expendedoras automáticas. La landing presenta el producto, el modelo de franquicia, casos reales de clientes y toda la información que un potencial inversor necesita antes de contactar por WhatsApp.

## 🔗 Preview

Producción: **[colvending-v1.vercel.app](https://colvending-v1.vercel.app)**

## ✨ Características

- Landing de una sola página con secciones para producto, beneficios, franquicias, rentabilidad, caso de éxito real, presencia nacional, historia de la empresa y preguntas frecuentes.
- Mapa interactivo de Argentina (con zoom animado por ubicación) mostrando las máquinas instaladas, agrupadas por provincia.
- Modal accesible con las especificaciones técnicas de la máquina (foco atrapado dentro del diálogo, cierre con `Escape`).
- FAQ con categorías por tabs y acordeón.
- Carrusel tipo coverflow para reels en mobile, grilla en desktop.
- CTAs con deep links directos a WhatsApp.
- Animaciones de scroll (GSAP) y de entrada (Framer Motion), respetando `prefers-reduced-motion` en todo el sitio.
- SEO técnico completo: metadata por página, Open Graph con imagen generada dinámicamente, Twitter Card, datos estructurados JSON-LD (`LocalBusiness` + `FAQPage`), `sitemap.xml` y `robots.txt` generados por Next.js.
- Totalmente responsive, de 360px a desktop.

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) — animaciones de entrada, modal, acordeones
- [GSAP](https://gsap.com/) (ScrollTrigger) — animaciones disparadas por scroll
- [react-simple-maps](https://www.react-simple-maps.io/) + [d3-geo](https://github.com/d3/d3-geo) — mapa de Argentina
- [Lucide React](https://lucide.dev/) — iconografía
- [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) — composición de clases

## 📁 Estructura del proyecto

```
src/
├─ app/                  # Rutas (App Router), metadata, sitemap, robots, OG image
├─ components/
│  ├─ sections/          # Cada sección de la landing (Hero, Faq, Franquicias, ...)
│  ├─ layout/            # Header y footer del sitio
│  ├─ ui/                # Componentes reutilizables (Modal, Button, Reveal, ...)
│  └─ providers/         # Providers globales (Framer Motion)
├─ hooks/                # Hooks compartidos (scroll spy, scroll listener)
├─ lib/                  # Contenido centralizado (content.ts, reels.ts), SEO, WhatsApp, utils
└─ assets/               # Imágenes importadas por los componentes
public/                  # Assets servidos como archivos estáticos
```

Todo el copy real del sitio vive centralizado en `src/lib/content.ts` y `src/lib/reels.ts` — los componentes no tienen texto hardcodeado.

## 🚀 Instalación

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## 🔐 Variables de entorno

```env
NEXT_PUBLIC_SITE_URL=
```

Opcional. Define el dominio usado en `canonical`, Open Graph, `sitemap.xml`, `robots.txt` y el JSON-LD. Si no se define, cae por defecto a la URL de producción actual en Vercel.

## 📦 Build

```bash
npm run build
npm run start
```

## ☁️ Deploy

Proyecto listo para desplegar en [Vercel](https://vercel.com) sin configuración adicional — actualmente deployado ahí.

## 👤 Autor

**Santiago Pérez**
Repositorio: [github.com/SantiagoP-1/Colvending-V1](https://github.com/SantiagoP-1/Colvending-V1)
