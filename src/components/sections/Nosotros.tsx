import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { NOSOTROS_CONTENT } from "@/lib/content";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";

// Nosotros is the 10th of 11 sections — Timeline's GSAP scroll animation
// has no reason to be in the bundle the browser parses for the Hero's
// initial paint. SSR stays on, so the content still renders server-side.
const Timeline = dynamic(() => import("./Timeline").then((mod) => mod.Timeline));

export function Nosotros() {
  return (
    <section id="nosotros" aria-label="Sobre ColVending" className="bg-ink-900 py-section">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <Reveal>
          <SectionTag>{NOSOTROS_CONTENT.tag}</SectionTag>
          <h2 className="font-display mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {NOSOTROS_CONTENT.heading}
          </h2>

          {/*
            TODO: el cliente pidió revisar y corregir estos datos (años,
            nombres de empresas y descripciones de la historia del grupo)
            antes de publicar. Se deja el contenido actual del sitio en vivo
            como placeholder.
          */}
          <div className="mt-8 space-y-4">
            {NOSOTROS_CONTENT.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[15px] leading-relaxed text-ink-300">
                {paragraph.map((segment, segIndex) =>
                  segment.emphasis === "strong" ? (
                    <strong key={segIndex} className="font-semibold text-paper">
                      {segment.text}
                    </strong>
                  ) : segment.emphasis === "accent" ? (
                    <strong key={segIndex} className="font-semibold text-red-400">
                      {segment.text}
                    </strong>
                  ) : (
                    <span key={segIndex}>{segment.text}</span>
                  ),
                )}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <Button
              href={whatsappHref(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              <WhatsAppIcon />
              {NOSOTROS_CONTENT.ctaLabel}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Timeline />
        </Reveal>
      </Container>
    </section>
  );
}
