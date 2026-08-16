"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, select, textarea, label";
// Ring lerp factor per frame — higher = snappier chase, lower = more trailing lag.
const RING_EASE = 0.18;

const CAPABILITY_QUERY = "(hover: hover) and (pointer: fine)";

// matchMedia is browser-only state React doesn't own — useSyncExternalStore
// (not useState+useEffect) is the correct way to read it: no render-cascade
// warning, and it reactively updates if the user plugs in/unplugs a mouse
// while the page is open, instead of only checking once on mount.
//
// Deliberately NOT gated on prefers-reduced-motion: product decision is
// that the custom cursor is brand identity, not content motion, so it stays
// on regardless of that OS setting. The rest of the site (GSAP reveals,
// Framer Motion via MotionProvider.tsx, TapRipple) still respects it —
// this is the one intentional exception.
function subscribe(onChange: () => void) {
  const capability = window.matchMedia(CAPABILITY_QUERY);
  capability.addEventListener("change", onChange);
  return () => capability.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(CAPABILITY_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

// Replaces the native cursor with a small dot (tracks the mouse exactly)
// plus a ring that trails it with inertia, on devices that actually have a
// real mouse. Desktop-only by design — see the matchMedia check below.
export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const isInteractive = Boolean((e.target as Element)?.closest?.(INTERACTIVE_SELECTOR));
      // Scale/opacity toggle on the inner visual element, never on the ref
      // that also receives the JS transform — see the comment above the
      // JSX for why those two concerns can't share an element.
      const dotVisual = dotRef.current?.firstElementChild as HTMLElement | null;
      const ringVisual = ringRef.current?.firstElementChild as HTMLElement | null;
      dotVisual?.classList.toggle("scale-125", isInteractive);
      ringVisual?.classList.toggle("scale-150", isInteractive);
      ringVisual?.classList.toggle("opacity-40", isInteractive);
    };

    const tick = () => {
      ring.x += (mouse.x - ring.x) * RING_EASE;
      ring.y += (mouse.y - ring.y) * RING_EASE;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      {/* Each cursor piece is two nested elements on purpose. The outer div
          is the only one the JS transform (translate3d) ever touches. The
          inner div is the only one Tailwind's `translate`/`scale` utilities
          ever touch. Tailwind v4 compiles `-translate-x-1/2`/`scale-150`
          to the standalone CSS `translate`/`scale` properties (not the
          `transform` shorthand) — the spec composes those as translate →
          rotate → scale → transform, all around the *same* element's own
          origin. Put a JS-driven `transform: translate3d(x,y,0)` on that
          same element and `scale` re-scales that offset too (scale-150
          made the ring's translate3d land 1.5x further from (0,0) than
          intended, which only became visible once a mouse position was far
          enough from the origin — that's the "ring and dot fall out of
          sync while hovering a button" bug). Splitting position and
          scale/centering onto separate elements means they can never
          compose with each other, so the bug can't come back either. */}
      <div ref={ringRef} className="absolute top-0 left-0">
        <div className="h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/60 opacity-70 transition-[transform,opacity] duration-150 ease-out" />
      </div>
      <div ref={dotRef} className="absolute top-0 left-0">
        <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 transition-transform duration-150 ease-out" />
      </div>
    </div>
  );
}
