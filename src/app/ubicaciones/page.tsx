import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { UbicacionesExplorer } from "@/components/sections/UbicacionesExplorer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  // Trimmed to 59 chars (was 62) and dropped the repeated "ColVending" at
  // the end — the brand only needs to appear once in the title.
  title: "Ubicaciones ColVending en Argentina — Máquinas expendedoras",
  description:
    "Mapa completo de todas las ubicaciones donde ColVending tiene máquinas expendedoras instaladas en Argentina. Buscá por ciudad o filtrá por provincia.",
  path: "/ubicaciones",
});

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
