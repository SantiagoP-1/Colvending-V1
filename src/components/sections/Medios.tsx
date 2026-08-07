import { Container } from "@/components/ui/Container";
import { InfiniteSlider } from "@/components/ui/InfiniteSlider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { MEDIOS_CONTENT } from "@/lib/content";

export function Medios() {
  return (
    <section
      id="medios"
      aria-label="Mención en los medios de comunicación"
      className="border-y border-white/5 bg-ink-900 py-section"
    >
      <Container>
        <Reveal className="text-center">
          <SectionTag>{MEDIOS_CONTENT.tag}</SectionTag>
          <h2 className="font-display mt-6 text-3xl font-semibold text-paper sm:text-4xl">
            {MEDIOS_CONTENT.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-10">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink-900 to-transparent sm:w-24"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink-900 to-transparent sm:w-24"
            aria-hidden="true"
          />
          <InfiniteSlider gap={24} duration={30} durationOnHover={70} className="w-full">
            {MEDIOS_CONTENT.logos.map((logo) => (
              <a
                key={logo.id}
                href={logo.href}
                className="flex h-16 w-32 shrink-0 items-center justify-center rounded-btn border border-white/10 bg-white/[0.03] text-sm font-semibold tracking-wide text-ink-300 uppercase transition-colors duration-200 hover:border-red-500/30 hover:text-paper sm:h-20 sm:w-40"
              >
                {logo.label}
              </a>
            ))}
          </InfiniteSlider>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-ink-300 italic">
            {MEDIOS_CONTENT.pendingNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
