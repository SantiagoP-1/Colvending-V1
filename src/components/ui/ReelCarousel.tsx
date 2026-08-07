"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReelCard } from "@/components/ui/ReelCard";
import { prefersReducedMotion } from "@/lib/gsap";
import type { Reel } from "@/lib/reels";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 4000;
const SWIPE_THRESHOLD_PX = 40;

// Mobile-only 3D coverflow — stacking the same reel cards used in the
// desktop grid vertically on a narrow screen turned into an endless scroll
// (each card is a full-width 9:16 box), so mobile gets this instead:
// one card centered, neighbors peeking at the sides, swipe or arrows to
// move. Desktop keeps the plain grid, which already had room to breathe.
export function ReelCarousel({ reels, className }: { reels: Reel[]; className?: string }) {
  const [index, setIndex] = React.useState(0);
  const touchStartX = React.useRef<number | null>(null);

  const next = React.useCallback(() => {
    setIndex((i) => (i + 1) % reels.length);
  }, [reels.length]);

  const prev = React.useCallback(() => {
    setIndex((i) => (i - 1 + reels.length) % reels.length);
  }, [reels.length]);

  // Keyed on `index` (not just mounted once) so any manual move — arrow or
  // swipe — pushes the next auto-advance a full interval out instead of
  // firing right after the user just navigated.
  React.useEffect(() => {
    if (prefersReducedMotion() || reels.length < 2) return;
    const timer = window.setTimeout(next, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [index, next, reels.length]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta < 0) next();
    else prev();
  }

  if (reels.length === 0) return null;

  return (
    <div
      className={cn("relative h-[350px] [perspective:1000px]", className)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative flex h-full items-center justify-center">
        {reels.map((reel, i) => {
          const total = reels.length;
          let pos = (i - index + total) % total;
          if (pos > Math.floor(total / 2)) pos -= total;

          const isCenter = pos === 0;
          const isAdjacent = Math.abs(pos) === 1;

          return (
            <div
              key={reel.id}
              className="absolute w-44 transition-all duration-500 ease-out-soft"
              style={{
                transform: `translateX(${pos * 58}%) scale(${isCenter ? 1 : isAdjacent ? 0.82 : 0.68}) rotateY(${pos * -10}deg)`,
                zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                filter: isCenter ? "blur(0px)" : "blur(2px)",
                visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                pointerEvents: isCenter ? "auto" : "none",
              }}
            >
              <ReelCard title={reel.title} thumbnail={reel.thumbnail} videoUrl={reel.videoUrl} />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Reel anterior"
        onClick={prev}
        className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink-950/70 text-paper backdrop-blur-sm transition-colors duration-200 hover:border-red-500/40"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Reel siguiente"
        onClick={next}
        className="absolute right-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink-950/70 text-paper backdrop-blur-sm transition-colors duration-200 hover:border-red-500/40"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>

      <div className="absolute inset-x-0 -bottom-1 flex items-center justify-center gap-1.5" aria-hidden="true">
        {reels.map((reel, i) => (
          <span
            key={reel.id}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-5 bg-red-500" : "w-1.5 bg-white/20",
            )}
          />
        ))}
      </div>
    </div>
  );
}
