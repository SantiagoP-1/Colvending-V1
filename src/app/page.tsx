import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Reels } from "@/components/sections/Reels";
import { Medios } from "@/components/sections/Medios";
import { Beneficios } from "@/components/sections/Beneficios";
import { Franquicias } from "@/components/sections/Franquicias";
import { Rentabilidad } from "@/components/sections/Rentabilidad";
import { CasoReal } from "@/components/sections/CasoReal";
import { Nosotros } from "@/components/sections/Nosotros";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

// These sections are always several screens below the fold on mobile (the
// Hero alone is 100dvh tall) and are each their own "use client" island —
// splitting them into separate chunks keeps their JS (and the interactive
// state it sets up: modal, accordions, tabs) out of the bundle the browser
// has to parse/execute during the Hero's initial paint. SSR stays on (no
// `ssr: false`), so the full content still renders server-side — nothing
// here can regress SEO or cause a layout shift, only hydration timing
// changes.
const Maquinas = dynamic(() =>
  import("@/components/sections/Maquinas").then((mod) => mod.Maquinas),
);
const Instalaciones = dynamic(() =>
  import("@/components/sections/Instalaciones").then((mod) => mod.Instalaciones),
);
const Faq = dynamic(() => import("@/components/sections/Faq").then((mod) => mod.Faq));

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Reels />
        <Medios />
        <Beneficios />
        <Maquinas />
        <Franquicias />
        <Rentabilidad />
        <CasoReal />
        <Instalaciones />
        <Nosotros />
        <Faq />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
