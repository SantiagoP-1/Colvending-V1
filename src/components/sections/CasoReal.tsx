import { Camera, MapPin, Music2, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { CASO_REAL_CONTENT } from "@/lib/content";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  instagram: Camera,
  tiktok: Music2,
};

export function CasoReal() {
  return (
    <section
      id="caso-real"
      aria-label="Caso real: local Punto Ya"
      className="border-y border-white/5 bg-ink-850 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{CASO_REAL_CONTENT.tag}</SectionTag>
          <h2 className="font-display mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {CASO_REAL_CONTENT.heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-10">
          <Reveal>
            <div className="flex h-full flex-col rounded-card border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold text-paper">
                  {CASO_REAL_CONTENT.storeName}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-300">
                  <MapPin size={14} className="text-red-500" aria-hidden="true" />
                  {CASO_REAL_CONTENT.location}
                </span>
              </div>

              <p className="mt-3 border-l-2 border-red-500/40 pl-4 text-[15px] leading-relaxed text-ink-200 italic">
                “{CASO_REAL_CONTENT.storeTagline}. {CASO_REAL_CONTENT.storeSlogan}”
              </p>

              <p className="mt-5 text-[15px] leading-relaxed text-ink-300">
                {CASO_REAL_CONTENT.body}
              </p>

              <p className="mt-5 text-center text-base font-semibold text-paper sm:text-left">
                {CASO_REAL_CONTENT.ctaQuestion}
              </p>

              <div className="mt-5 flex justify-center sm:justify-start">
                <Button
                  href={whatsappHref(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  <WhatsAppIcon />
                  {CASO_REAL_CONTENT.ctaLabel}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-card border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-wide text-ink-300 uppercase">
                Seguí el día a día
              </p>
              <div className="mt-4 flex flex-1 flex-col justify-center space-y-3">
                {CASO_REAL_CONTENT.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon];
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-btn border border-white/10 bg-white/[0.02] p-4 transition-colors duration-200 hover:border-red-500/30 hover:bg-red-500/5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-500">
                        {Icon ? <Icon size={20} aria-hidden="true" /> : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-paper">
                          {social.platform}
                        </span>
                        <span className="block truncate text-sm text-ink-300">
                          {social.handle}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-ink-300 transition-colors group-hover:text-red-500"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
