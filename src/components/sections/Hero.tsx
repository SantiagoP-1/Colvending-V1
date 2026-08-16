"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import {
  Clock,
  Smartphone,
  UserX,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import machinePhoto from "@/assets/images/maquina.webp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StatCounter } from "@/components/ui/StatCounter";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { HERO_CONTENT } from "@/lib/content";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const BADGE_ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  smartphone: Smartphone,
  userX: UserX,
  shieldCheck: ShieldCheck,
  zap: Zap,
};

// The headline, kicker and subtitle render statically (no initial
// opacity/transform hiding) — a real Lighthouse audit measured the
// subtitle as the LCP element with a 1.5s "element render delay" while it
// sat behind a Framer Motion mount animation, waiting on JS hydration
// before it could paint. Only the secondary controls (CTA row, badges)
// still animate in, since they're too small to ever be the LCP candidate.
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(visualRef.current, {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Portada ColVending"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-ink-950 pt-[72px]"
    >
      {/* Background layers (parallax) */}
      <div ref={bgRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-40 right-[-15%] h-[560px] w-[560px] rounded-full bg-red-600/25 blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-red-900/20 blur-[110px]" />
        <div
          className="absolute inset-0 bg-grid-overlay opacity-60"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
          }}
        />
      </div>

      <Container wide className="grid grid-cols-1 items-center gap-16 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="min-w-0">
          <p className="mb-6 inline-flex items-center gap-2 rounded-chip border border-red-500/25 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-red-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
            {HERO_CONTENT.kicker}
          </p>

          <h1 className="font-display mb-6 text-[clamp(2.75rem,5.4vw,5rem)] font-semibold text-paper">
            {HERO_CONTENT.titleLines.map((line) => (
              <span
                key={line}
                className={cn(
                  "block",
                  line === HERO_CONTENT.titleHighlight && "text-red-500",
                )}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mb-9 max-w-[46ch] text-lg leading-relaxed text-ink-300">
            {HERO_CONTENT.subtitle}
          </p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={itemVariants}
            className="mb-10 flex flex-wrap items-center gap-4"
          >
            <Button
              href={whatsappHref(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              aria-label="Hablar con un asesor de ColVending por WhatsApp"
            >
              <WhatsAppIcon />
              {HERO_CONTENT.ctaPrimary}
            </Button>
            <Button href={HERO_CONTENT.proposalHref} download="Propuesta-ColVending.pdf" variant="ghost">
              {HERO_CONTENT.ctaSecondary}
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={itemVariants}
            transition={{ delay: 0.08 }}
            className="flex flex-wrap gap-3"
          >
            {HERO_CONTENT.badges.map((badge) => {
              const Icon = BADGE_ICONS[badge.icon];
              return (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-chip border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[13px] font-medium text-ink-200 backdrop-blur-sm"
                >
                  {Icon ? <Icon size={14} className="text-red-500" aria-hidden="true" /> : null}
                  {badge.label}
                </span>
              );
            })}
          </motion.div>
        </div>

        {/* Visual column. GSAP (scroll parallax) and Framer Motion (mount
            entrance) each get their own DOM node — both write to
            `transform`, and sharing one node lets GSAP's scroll-driven
            update clobber Framer's entrance mid-animation, leaving the
            card visibly offset once GSAP takes over. */}
        <div ref={visualRef} className="relative mx-auto w-full max-w-lg">
          {/* opacity stays at 1 the whole time — only a small horizontal
              settle — so the product photo (a real LCP candidate) is
              painted immediately instead of waiting on Framer Motion to
              raise it from opacity: 0 after hydration. */}
          <motion.div
            initial={{ opacity: 1, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-card border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-5 shadow-card sm:p-6">
              <div
                className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-red-500 via-red-500/40 to-transparent"
                aria-hidden="true"
              />

              <div className="relative">
                <div
                  className="absolute inset-x-8 bottom-4 h-16 rounded-full bg-red-600/30 blur-[40px]"
                  aria-hidden="true"
                />
                <Image
                  src={machinePhoto}
                  alt="Máquina expendedora automática ColVending"
                  priority
                  sizes="(min-width: 1024px) 340px, 90vw"
                  className="relative mx-auto h-auto w-full max-w-67.5 object-contain drop-shadow-[0_20px_40px_rgba(215,38,56,0.25)] transition-transform duration-700 ease-out-soft hover:scale-[1.02]"
                />
              </div>

              <div className="relative mt-5 grid grid-cols-4 gap-2 rounded-xl border border-white/10 bg-ink-950/60 p-3 backdrop-blur-sm">
                {HERO_CONTENT.stats.map((stat) => (
                  <div key={stat.label} className="min-w-0 text-center">
                    <div className="font-display text-lg font-semibold text-paper sm:text-xl">
                      {stat.value === null ? (
                        stat.display
                      ) : (
                        <StatCounter value={stat.value} />
                      )}
                    </div>
                    <div className="mt-0.5 text-[9px] leading-tight font-medium tracking-wide text-ink-300 uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue. Wrapped in its own MotionConfig to opt out of the
          sitewide reducedMotion="user" setting (MotionProvider.tsx) — this
          bounce is purely decorative (aria-hidden) and subtle enough that
          it's worth keeping for people with reduced-motion enabled, unlike
          the larger transform animations elsewhere on the site. */}
      <MotionConfig reducedMotion="never">
        <motion.div
          className="absolute inset-x-0 bottom-8 hidden justify-center sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          </motion.div>
        </motion.div>
      </MotionConfig>
    </section>
  );
}
