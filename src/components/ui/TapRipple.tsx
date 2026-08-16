"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='button']";
const RIPPLE_DURATION_MS = 550;

// Touch counterpart to CustomCursor: a brief red glow at the exact touch
// point when tapping an interactive element. touchstart only (never
// touchmove), passive, so it can never interfere with native scroll.
export function TapRipple() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isCoarsePointer || reducedMotion) return;

    const onTouchStart = (e: TouchEvent) => {
      const target = e.target as Element;
      if (!target?.closest?.(INTERACTIVE_SELECTOR)) return;
      const touch = e.touches[0];
      if (!touch || !containerRef.current) return;

      const ripple = document.createElement("span");
      ripple.className =
        "pointer-events-none absolute h-16 w-16 rounded-full bg-red-500/40 blur-[2px] [animation:tap-ripple_550ms_ease-out_forwards]";
      ripple.style.left = `${touch.clientX}px`;
      ripple.style.top = `${touch.clientY}px`;
      containerRef.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), RIPPLE_DURATION_MS);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => document.removeEventListener("touchstart", onTouchStart);
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true" />
  );
}
