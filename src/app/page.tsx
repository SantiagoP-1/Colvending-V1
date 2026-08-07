import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Beneficios } from "@/components/sections/Beneficios";
import { Maquinas } from "@/components/sections/Maquinas";
import { Franquicias } from "@/components/sections/Franquicias";
import { Rentabilidad } from "@/components/sections/Rentabilidad";
import { CasoReal } from "@/components/sections/CasoReal";
import { Nosotros } from "@/components/sections/Nosotros";
import { LeadForm } from "@/components/sections/LeadForm";
import { Faq } from "@/components/sections/Faq";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Beneficios />
        <Maquinas />
        <Franquicias />
        <Rentabilidad />
        <CasoReal />
        <Nosotros />
        <LeadForm />
        <Faq />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
