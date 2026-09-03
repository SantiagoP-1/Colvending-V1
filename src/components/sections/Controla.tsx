import {
  Package,
  ShoppingCart,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { CONTROLA_CONTENT } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  package: Package,
  cart: ShoppingCart,
  chart: BarChart3,
  sparkles: Sparkles,
};

// Homepage teaser for Controla (controla.ar), a separate product the client
// is also building — same teaser-card shell as Fabrica.tsx, but with a
// feature-highlights panel instead of a photo (no real product screenshot
// to use here). Uses the site's own red accent (client asked to drop
// Controla's own emerald branding here, to stay consistent with the rest
// of the page) instead of Controla's real brand color.
export function Controla() {
  return (
    <section
      id={CONTROLA_CONTENT.sectionId}
      aria-label={CONTROLA_CONTENT.ariaLabel}
      className="bg-ink-950 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{CONTROLA_CONTENT.tag}</SectionTag>
          <h2 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {CONTROLA_CONTENT.heading}
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 grid grid-cols-1 overflow-hidden rounded-card border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 lg:grid-cols-2 lg:items-stretch"
        >
          <div className="flex flex-col gap-5 border-b border-white/10 bg-ink-950/60 p-6 sm:p-10 lg:border-r lg:border-b-0">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
              <span>
                Contro<em className="text-red-400 not-italic">la</em>
              </span>
            </span>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {CONTROLA_CONTENT.features.map((feature) => {
                const Icon = ICONS[feature.icon];
                return (
                  <div
                    key={feature.titulo}
                    // Stacked single-column on mobile, the 4 items ran
                    // together with only a gap between them — a hairline
                    // divider (same pattern as Beneficios.tsx) tells them
                    // apart. Cancelled at sm: once the grid goes 2-up, where
                    // the gap alone already reads as separate items.
                    className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500">
                      {Icon ? <Icon size={18} aria-hidden="true" /> : null}
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-paper">
                      {feature.titulo}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-300">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-[15px] leading-relaxed text-ink-300">
              {CONTROLA_CONTENT.lead}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {CONTROLA_CONTENT.trustBadges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-chip border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-ink-300"
                >
                  {badge}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Button href={CONTROLA_CONTENT.href} target="_blank" variant="primary">
                {CONTROLA_CONTENT.ctaLabel}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
