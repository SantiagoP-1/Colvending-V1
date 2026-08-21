import { Container } from "@/components/ui/Container";
import { ReelCard } from "@/components/ui/ReelCard";
import { ReelCarousel } from "@/components/ui/ReelCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { REELS_CONTENT } from "@/lib/reels";

export function Reels() {
  return (
    <section
      id="reels"
      aria-label="Reels de ColVending en Instagram"
      className="bg-ink-950 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{REELS_CONTENT.tag}</SectionTag>
          <h2 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {REELS_CONTENT.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            {REELS_CONTENT.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ReelCarousel reels={REELS_CONTENT.items} className="sm:hidden" />
          <div className="hidden gap-6 sm:grid sm:grid-cols-3">
            {REELS_CONTENT.items.map((reel) => (
              <ReelCard
                key={reel.id}
                title={reel.title}
                thumbnail={reel.thumbnail}
                videoUrl={reel.videoUrl}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
