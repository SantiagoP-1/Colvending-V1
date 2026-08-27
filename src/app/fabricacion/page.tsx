import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FabricacionGaleria } from "@/components/sections/FabricacionGaleria";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Así se fabrica cada máquina en China — ColVending",
  description:
    "Conocé el proceso real de fabricación de las máquinas ColVending: personalización a medida, planta de producción, empaquetado y despacho internacional hacia Argentina.",
  alternates: { canonical: "/fabricacion" },
};

export default function FabricacionPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <FabricacionGaleria />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
