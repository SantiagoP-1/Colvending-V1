import {
  MapPin,
  PackageCheck,
  GraduationCap,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { FRANQUICIAS_CONTENT } from "@/lib/content";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";

const ICONS: Record<string, LucideIcon> = {
  mapPin: MapPin,
  packageCheck: PackageCheck,
  graduationCap: GraduationCap,
  megaphone: Megaphone,
};

export function Franquicias() {
  return (
    <section
      id="franquicias"
      aria-label="Franquicias ColVending"
      className="relative overflow-hidden bg-gradient-to-b from-ink-950 via-red-950/40 to-ink-950 py-section"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-overlay opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-red-600/15 blur-[160px]"
        aria-hidden="true"
      />

      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>{FRANQUICIAS_CONTENT.tag}</SectionTag>
          <h2 className="font-display mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {FRANQUICIAS_CONTENT.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            {FRANQUICIAS_CONTENT.lead}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FRANQUICIAS_CONTENT.pillars.map((pillar, index) => {
            const Icon = ICONS[pillar.icon];
            return (
              <Reveal key={pillar.titulo} delay={index * 0.08}>
                <div className="h-full rounded-card border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/15 text-red-500">
                    {Icon ? <Icon size={20} aria-hidden="true" /> : null}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-paper">
                    {pillar.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300 italic">
                    {pillar.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <div className="flex flex-col items-start gap-6 rounded-card border border-dashed border-white/15 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-ink-300 italic">
              {FRANQUICIAS_CONTENT.investmentNote}
            </p>
            <Button
              href={whatsappHref(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="w-full shrink-0 sm:w-auto"
            >
              <WhatsAppIcon />
              {FRANQUICIAS_CONTENT.ctaLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
