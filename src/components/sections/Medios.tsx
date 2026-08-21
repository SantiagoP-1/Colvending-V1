import Image from "next/image";
import { Container } from "@/components/ui/Container";
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
          <h2 className="font-heading mt-6 text-3xl font-semibold text-paper sm:text-4xl">
            {MEDIOS_CONTENT.heading}
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {MEDIOS_CONTENT.logos.map((logo, index) => {
            return (
              <Reveal key={logo.id} delay={0.1 + index * 0.08}>
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-20 items-center justify-center rounded-card border border-white/10 bg-white/[0.03] p-2 transition-all duration-300 ease-out-soft motion-reduce:transition-none hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.05] hover:shadow-card sm:h-36 sm:p-4"
                >
                  {/* Logos are opaque JPG/PNG exports with their own solid
                      backgrounds, not transparent brand cutouts — a white
                      mat gives them a clean, consistent frame instead of a
                      raw rectangle sitting on the dark card. */}
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white p-1 transition-transform duration-300 ease-out-soft motion-reduce:transition-none group-hover:scale-[1.03] sm:rounded-xl sm:p-2">
                    <Image
                      src={logo.logoSrc}
                      alt={`Logo de ${logo.label}`}
                      width={logo.width}
                      height={logo.height}
                      className="h-full w-full object-contain opacity-90 grayscale contrast-150 transition-all duration-300 ease-out-soft motion-reduce:transition-none group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100"
                    />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3} className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-ink-300">
            {MEDIOS_CONTENT.mentionText.map((segment, i) =>
              segment.href ? (
                <a
                  key={i}
                  href={segment.href}
                  className="rounded-sm font-semibold text-red-400 underline decoration-red-400/40 underline-offset-2 transition-colors duration-200 hover:text-red-300 hover:decoration-red-300"
                >
                  {segment.text}
                </a>
              ) : (
                <span key={i}>{segment.text}</span>
              ),
            )}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
