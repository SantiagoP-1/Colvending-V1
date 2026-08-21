import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { UbicacionesExplorer } from "@/components/sections/UbicacionesExplorer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Ubicaciones — Dónde están las máquinas ColVending | ColVending",
  description:
    "Mapa completo de todas las ubicaciones donde ColVending tiene máquinas expendedoras instaladas en Argentina. Buscá por ciudad o filtrá por provincia.",
  alternates: { canonical: "/ubicaciones" },
};

export default function UbicacionesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <UbicacionesExplorer />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
