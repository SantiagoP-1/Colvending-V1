import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CalculadoraRentabilidad } from "@/components/sections/CalculadoraRentabilidad";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Calculadora de rentabilidad — ColVending",
  description:
    "Calculá cuánto puede ganar tu máquina expendedora ColVending: inversión, ganancia bruta mensual y meses de recupero, con casos reales de clientes.",
  path: "/calculadora",
});

export default function CalculadoraPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <CalculadoraRentabilidad />
      </main>
      <SiteFooter />
    </>
  );
}
