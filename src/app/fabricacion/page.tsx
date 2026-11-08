import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FabricacionGaleria } from "@/components/sections/FabricacionGaleria";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Así se fabrica cada máquina en China — ColVending",
  // Trimmed to 154 chars (was 167) so Google doesn't truncate it — same
  // claims, dropped only the redundant "empaquetado y" ("despacho
  // internacional" already implies packaging for shipment).
  description:
    "Conocé el proceso real de fabricación de las máquinas ColVending: personalización a medida, planta de producción y despacho internacional hacia Argentina.",
  path: "/fabricacion",
});

export default function FabricacionPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <FabricacionGaleria />
      </main>
      <SiteFooter />
    </>
  );
}
