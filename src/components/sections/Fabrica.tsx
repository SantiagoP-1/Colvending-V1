import Image from "next/image";
import { ArrowRight } from "lucide-react";
import plantaTeaser from "@/assets/images/fabrica-china/planta-3.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { FABRICA_CONTENT } from "@/lib/content";

// Homepage teaser for the fabrication story — tag + heading sit outside
// the card (same shell every other section uses); the lead text, photo
// and CTA are all together inside one card (same shape as the product
// card in Maquinas.tsx: photo one side, copy + button the other).
export function Fabrica() {
  return (
    <section
      id={FABRICA_CONTENT.sectionId}
      aria-label={FABRICA_CONTENT.ariaLabel}
      className="bg-ink-900 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{FABRICA_CONTENT.tag}</SectionTag>
          <h2 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {FABRICA_CONTENT.heading}
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 grid grid-cols-1 overflow-hidden rounded-card border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 lg:grid-cols-2 lg:items-stretch"
        >
          <div className="relative aspect-4/3 lg:aspect-auto lg:h-full lg:min-h-95">
            <Image
              src={plantaTeaser}
              alt="Fila de máquinas expendedoras ColVending en la línea de producción en China"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-[15px] leading-relaxed text-ink-300">
              {FABRICA_CONTENT.lead}
            </p>
            <div className="mt-7">
              <Button href={FABRICA_CONTENT.pageHref} variant="primary">
                {FABRICA_CONTENT.ctaLabel}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
