import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { RENTABILIDAD_CONTENT } from "@/lib/content";

export function Rentabilidad() {
  return (
    <section
      id="rentabilidad"
      aria-label="Análisis de rentabilidad"
      className="bg-ink-950 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{RENTABILIDAD_CONTENT.tag}</SectionTag>
          <h2 className="font-display mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {RENTABILIDAD_CONTENT.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            {RENTABILIDAD_CONTENT.lead}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:divide-x sm:divide-white/10 lg:grid-cols-4">
          {RENTABILIDAD_CONTENT.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} className="px-0 sm:px-8 lg:px-6">
              <div className="font-display text-[clamp(2.75rem,5vw,4rem)] leading-none font-semibold text-red-500">
                {stat.val}
              </div>
              <div className="mt-3 text-base font-semibold text-paper">
                {stat.label}
              </div>
              <p className="mt-1.5 max-w-[26ch] text-sm leading-relaxed text-ink-300">
                {stat.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35} className="mt-14">
          <p
            role="note"
            className="rounded-card border border-white/10 bg-white/[0.02] p-5 text-sm leading-relaxed text-ink-300"
          >
            {RENTABILIDAD_CONTENT.disclaimer}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
