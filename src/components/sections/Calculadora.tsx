import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import {
  CASOS,
  DEFAULT_CASO_ID,
  DEFAULT_INPUT,
  calcular,
  fmtARS,
  fmtARSCorto,
  fmtMeses,
  fmtPct,
} from "@/lib/calculadora";
import { CALCULADORA_CONTENT } from "@/lib/content";

// Homepage teaser for the calculator — same shell as Fabrica.tsx (tag +
// heading outside, one card with a visual on one side and copy + CTA on
// the other). Instead of a photo, the visual is a static preview of the
// calculator's own result for its default case, computed with the same
// function the /calculadora page uses, so the two never disagree.
export function Calculadora() {
  const r = calcular(DEFAULT_INPUT);
  const caso = CASOS.find((c) => c.id === DEFAULT_CASO_ID);

  return (
    <section
      id={CALCULADORA_CONTENT.sectionId}
      aria-label={CALCULADORA_CONTENT.ariaLabel}
      className="bg-ink-900 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{CALCULADORA_CONTENT.tag}</SectionTag>
          <h2 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {CALCULADORA_CONTENT.heading}
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 grid grid-cols-1 overflow-hidden rounded-card border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 lg:grid-cols-2 lg:items-stretch"
        >
          <div className="relative flex flex-col justify-center gap-5 border-b border-white/10 bg-[radial-gradient(420px_220px_at_100%_0%,rgba(215,38,56,0.28),transparent_70%)] p-6 sm:p-10 lg:border-r lg:border-b-0">
            <p className="text-xs font-semibold tracking-wide text-red-300 uppercase">
              {CALCULADORA_CONTENT.previewLabel}
              {caso && <span className="text-ink-300 normal-case"> · {caso.nombre}</span>}
            </p>
            <div>
              <div className="text-sm text-ink-300">Ganancia bruta estimada por mes</div>
              <div className="font-display mt-1 text-[clamp(2.25rem,5vw,3.25rem)] leading-none font-semibold text-paper tabular-nums">
                {fmtARS(r.neta)}
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-3">
              {[
                { l: "Recuperás en", v: fmtMeses(r.recupero), hl: true },
                { l: "Retorno mensual", v: fmtPct(r.roi) },
                { l: "Inversión", v: fmtARSCorto(r.inversion) },
              ].map((k) => (
                <div
                  key={k.l}
                  className={
                    "rounded-btn border p-3 " +
                    (k.hl ? "border-red-500/50 bg-red-500/10" : "border-white/10 bg-white/[0.03]")
                  }
                >
                  <dt className="text-[11px] font-medium tracking-wide text-ink-400 uppercase">{k.l}</dt>
                  <dd className="mt-1 text-sm font-semibold text-paper tabular-nums sm:text-base">{k.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10">
            <Calculator size={28} className="text-red-400" aria-hidden="true" />
            <p className="mt-5 text-[15px] leading-relaxed text-ink-300">
              {CALCULADORA_CONTENT.lead}
            </p>
            <div className="mt-7">
              <Button href={CALCULADORA_CONTENT.pageHref} variant="primary">
                {CALCULADORA_CONTENT.ctaLabel}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
