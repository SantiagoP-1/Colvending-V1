import Image from "next/image";
import { Check } from "lucide-react";
import machinePhoto from "@/assets/images/maquina.webp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { PRODUCTO_CONTENT } from "@/lib/content";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";

export function Maquinas() {
  return (
    <section
      id="maquinas"
      aria-label="Nuestro modelo de máquina expendedora"
      className="bg-ink-900 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{PRODUCTO_CONTENT.tag}</SectionTag>
          <h2 className="font-display mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {PRODUCTO_CONTENT.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            {PRODUCTO_CONTENT.lead}
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="relative mt-10 grid grid-cols-1 items-center gap-10 overflow-hidden rounded-card border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16"
        >
          <div className="relative mx-auto w-full max-w-xs">
            <div
              className="absolute inset-x-8 bottom-2 h-14 rounded-full bg-red-600/25 blur-[36px]"
              aria-hidden="true"
            />
            <Image
              src={machinePhoto}
              alt="Máquina Mixta ColVending"
              sizes="(min-width: 1024px) 320px, 70vw"
              className="relative mx-auto h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            />
            <span className="absolute top-0 right-0 rounded-chip bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-red-glow">
              {PRODUCTO_CONTENT.badge}
            </span>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
              {PRODUCTO_CONTENT.nombre}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
              {PRODUCTO_CONTENT.desc}
            </p>

            <ul className="mt-6 space-y-3" role="list">
              {PRODUCTO_CONTENT.specs.map((spec) => (
                <li
                  key={spec}
                  className="flex items-center gap-3 text-sm font-medium text-ink-200"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-500">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  {spec}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-ink-400 italic">
              {PRODUCTO_CONTENT.pendingSpecs}
            </p>

            <div className="mt-6 rounded-btn border border-white/10 bg-white/[0.03] p-4">
              <p className="font-display text-2xl font-semibold text-paper">
                {PRODUCTO_CONTENT.price.display}
              </p>
              <p className="mt-1 text-xs text-ink-300">{PRODUCTO_CONTENT.price.note}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                href={whatsappHref(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                <WhatsAppIcon />
                {PRODUCTO_CONTENT.ctaPrimary}
              </Button>
              <Button href={PRODUCTO_CONTENT.catalogHref} variant="ghost">
                {PRODUCTO_CONTENT.ctaSecondary}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
