"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { NOSOTROS_CONTENT } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    if (!container || !progress) return;

    // The line starts scaleY-0 via its className (no JS needed to hide it),
    // so skipping the animation here must still explicitly reveal it —
    // unlike Reveal.tsx, there's no "just don't animate" no-op option.
    if (prefersReducedMotion()) {
      gsap.set(progress, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
            end: "bottom 75%",
            scrub: true,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Historia del grupo empresarial"
      className="relative"
    >
      <div
        className="absolute top-1 bottom-1 left-[15px] w-px bg-white/10"
        aria-hidden="true"
      />
      <div
        ref={progressRef}
        className="absolute top-1 bottom-1 left-[15px] w-px scale-y-0 bg-red-500"
        aria-hidden="true"
      />

      <ol className="space-y-10">
        {NOSOTROS_CONTENT.timeline.map((entry) => (
          <li key={entry.year} className="relative pl-11">
            <span
              className={cn(
                "absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 text-[11px] font-bold",
                entry.accent
                  ? "border-red-500 bg-red-500/15 text-red-400"
                  : "border-white/20 bg-ink-900 text-ink-300",
              )}
            >
              <span className="h-2 w-2 rounded-full bg-current" />
            </span>
            <div className="font-display text-sm font-semibold tracking-wide text-ink-300">
              {entry.year}
            </div>
            <h3
              className={cn(
                "mt-1 text-lg font-semibold",
                entry.accent ? "text-red-400" : "text-paper",
              )}
            >
              {entry.empresa}
            </h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-300">
              {entry.desc}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
