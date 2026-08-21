import Image, { type StaticImageData } from "next/image";
import { Camera, MapPin, Music2, ArrowUpRight, Play, type LucideIcon } from "lucide-react";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ReelCard } from "@/components/ui/ReelCard";
import { ReelCarousel } from "@/components/ui/ReelCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import type { Reel } from "@/lib/reels";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  instagram: Camera,
  tiktok: Music2,
};

interface CasoRealSocial {
  platform: string;
  handle: string;
  url: string;
  icon: string;
}

interface CasoRealStat {
  count: string;
  label: string;
  quote?: string;
}

interface CasoRealPhoto {
  src: StaticImageData;
  alt: string;
}

interface CasoRealAudioPlaceholder {
  label: string;
  /** Left undefined until the client sends the real file — the player renders disabled ("Próximamente") until then. */
  audioSrc?: string;
}

interface CasoRealCaseProps {
  sectionId: string;
  ariaLabel: string;
  tag: string;
  nicheLabel?: string;
  heading: string;
  subtitle?: string;
  storeName: string;
  location?: string;
  locationHref?: string;
  /** Omit when there's no confirmed testimonial line yet — the quote block just doesn't render. */
  quote?: string;
  body: string;
  ctaQuestion: string;
  ctaLabel: string;
  socials?: readonly CasoRealSocial[];
  /** Only used by the socials/stat-only layouts — a photo card shows the photo alone, no stat. */
  stat?: CasoRealStat;
  photo?: CasoRealPhoto;
  audioPlaceholder?: CasoRealAudioPlaceholder;
  reels?: Reel[];
}

// Shared layout for both "Caso real" niches (see the TODO on
// UBICACION_PARTICULAR_CONTENT in content.ts) — a single machine in a
// third party's business vs. a fully-automated store like Punto Ya. Same
// card/eyebrow/heading structure for both, so the two read as one
// consistent pattern rather than two unrelated sections.
export function CasoRealCase({
  sectionId,
  ariaLabel,
  tag,
  nicheLabel,
  heading,
  subtitle,
  storeName,
  location,
  locationHref,
  quote,
  body,
  ctaQuestion,
  ctaLabel,
  socials,
  stat,
  photo,
  audioPlaceholder,
  reels,
}: CasoRealCaseProps) {
  const hasSocials = socials && socials.length > 0;
  const hasReels = reels && reels.length > 0;

  return (
    <section
      id={sectionId}
      aria-label={ariaLabel}
      className="border-y border-white/5 bg-ink-850 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <SectionTag>{tag}</SectionTag>
            {nicheLabel && (
              <span className="inline-flex items-center rounded-chip border border-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-ink-300 uppercase">
                {nicheLabel}
              </span>
            )}
          </div>
          <h2 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {heading}
          </h2>
          {subtitle && (
            <p className="mt-2 text-base font-medium text-ink-300">{subtitle}</p>
          )}
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-10">
          <Reveal>
            <div className="flex h-full flex-col rounded-card border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold text-paper">
                  {storeName}
                </h3>
                {location &&
                  (locationHref ? (
                    <a
                      href={locationHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-ink-300 underline decoration-transparent underline-offset-2 transition-colors duration-200 hover:text-red-400 hover:decoration-red-400/50"
                    >
                      <MapPin size={14} className="text-red-500" aria-hidden="true" />
                      {location}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-300">
                      <MapPin size={14} className="text-red-500" aria-hidden="true" />
                      {location}
                    </span>
                  ))}
              </div>

              {quote && (
                <p className="mt-3 border-l-2 border-red-500/40 pl-4 text-[15px] leading-relaxed text-ink-200 italic">
                  “{quote}”
                </p>
              )}

              <p className="mt-5 text-[15px] leading-relaxed text-ink-300">{body}</p>

              <p className="mt-5 text-center text-base font-semibold text-paper sm:text-left">
                {ctaQuestion}
              </p>

              <div className="mt-5 flex justify-center sm:justify-start">
                <Button
                  href={whatsappHref(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  <WhatsAppIcon />
                  {ctaLabel}
                </Button>
              </div>

              {audioPlaceholder &&
                (audioPlaceholder.audioSrc ? (
                  <AudioPlayer
                    src={audioPlaceholder.audioSrc}
                    label={audioPlaceholder.label}
                    className="mt-5"
                  />
                ) : (
                  <div className="mt-5 flex items-center gap-3 rounded-btn border border-white/10 bg-white/[0.02] p-3">
                    <button
                      type="button"
                      disabled
                      aria-label={`${audioPlaceholder.label} — próximamente`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Play size={16} className="ml-0.5" fill="currentColor" aria-hidden="true" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-paper">
                        {audioPlaceholder.label}
                      </p>
                      <div
                        className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
                        aria-hidden="true"
                      >
                        <div className="h-full w-1/12 rounded-full bg-red-500/50" />
                      </div>
                    </div>
                    <span className="shrink-0 rounded-chip border border-white/10 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-ink-400 uppercase">
                      Próximamente
                    </span>
                  </div>
                ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            {photo ? (
              // Photo stands alone — no caption or stat, just the shot
              // itself, stretched to match the left card's height (audio
              // player included) so both columns read as the same size.
              <div className="relative h-full w-full overflow-hidden rounded-card border border-white/10">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover"
                />
              </div>
            ) : (
            <div
              className={
                hasSocials
                  ? "flex h-full flex-col justify-between rounded-card border border-white/10 bg-white/[0.03] p-6 sm:p-8"
                  : "flex h-full flex-col items-center justify-center rounded-card border border-white/10 bg-white/[0.03] p-6 text-center sm:p-8"
              }
            >
              {hasSocials && (
                <div>
                  <p className="text-xs font-semibold tracking-wide text-ink-300 uppercase">
                    Seguí el día a día
                  </p>
                  <div className="mt-4 space-y-3">
                    {socials.map((social) => {
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
              )}

              {stat && (
                <div
                  className={
                    hasSocials
                      ? "mt-6 flex items-center gap-4 border-t border-white/10 pt-6"
                      : "flex flex-col items-center gap-3"
                  }
                >
                  <div className="shrink-0 text-center">
                    <p className="font-display text-2xl font-bold text-paper">{stat.count}</p>
                    <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-red-400 uppercase">
                      {stat.label}
                    </p>
                  </div>
                  {stat.quote && (
                    <p
                      className={
                        hasSocials
                          ? "text-xs leading-relaxed text-ink-300 italic"
                          : "max-w-[32ch] text-sm leading-relaxed text-ink-300 italic"
                      }
                    >
                      “{stat.quote}”
                    </p>
                  )}
                </div>
              )}
            </div>
            )}
          </Reveal>
        </div>

        {hasReels && (
          <Reveal delay={0.16} className="mt-6">
            <ReelCarousel reels={reels} className="sm:hidden" />
            <div className="hidden gap-6 sm:grid sm:grid-cols-3">
              {reels.map((reel) => (
                <ReelCard
                  key={reel.id}
                  title={reel.title}
                  thumbnail={reel.thumbnail}
                  videoUrl={reel.videoUrl}
                />
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
