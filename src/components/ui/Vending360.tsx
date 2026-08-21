"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FRAME_COUNT = 74;
const NATURAL_WIDTH = 620;
const NATURAL_HEIGHT = 910;
const DRAG_PX_PER_FRAME = 6.2;
const KEYBOARD_STEP_FRAMES = 3;
const MOMENTUM_DECAY = 0.95;
const MOMENTUM_STOP_THRESHOLD = 0.03;
const RETURN_TO_FRONT_DELAY_MS = 5000;
const RETURN_TO_FRONT_DURATION_MS = 700;

function frameSrc(index: number) {
  return `/vending-360/frame-${String(index).padStart(2, "0")}.webp`;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

interface Vending360Props {
  className?: string;
  /** Accessible label for the whole interactive region. */
  label: string;
}

// Drag-to-rotate 360° product viewer. Frames are individual cached WebP
// files (not inlined base64) so the browser can fetch them in parallel and
// reuse them from cache on repeat visits — see public/vending-360/. Frame 0
// renders as a real <Image priority> so there's always something for LCP
// to grab even before any JS runs; the canvas silently takes over once
// frames are loaded, with no visible swap (same pixels).
export function Vending360({ className, label }: Vending360Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  // Kept as a continuous float, never rounded at the mutation site — only
  // draw() rounds it, to pick which frame to show. Rounding here instead
  // (as the original prototype did) would discard small per-tick deltas
  // during momentum's decaying velocity, understating how far it's spun.
  const currentIndexRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const velocityRef = useRef(0);
  const returnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;

    function draw() {
      const canvas = canvasRef.current;
      const stage = stageRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !stage || !ctx) return;
      // currentIndexRef stays a float between mutations (see the comment on
      // its declaration) — rounded only here, at the single point it's
      // actually used to pick which frame to display.
      const displayIndex = Math.round(currentIndexRef.current) % FRAME_COUNT;
      const img = imagesRef.current[displayIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = stage.getBoundingClientRect();
      const scale = Math.min(
        rect.width / NATURAL_WIDTH,
        rect.height / NATURAL_HEIGHT,
      );
      const cw = NATURAL_WIDTH * scale;
      const ch = NATURAL_HEIGHT * scale;
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, cw, ch);
    }

    // Eases back to the front-facing frame (0) the short way around —
    // whichever direction is closer — so a visitor who leaves it spun
    // around doesn't have to notice and fix it themselves.
    function returnToFront() {
      const start = currentIndexRef.current;
      let delta = mod(0 - start, FRAME_COUNT);
      if (delta > FRAME_COUNT / 2) delta -= FRAME_COUNT;
      if (Math.abs(delta) < 0.5) return;

      const startTime = performance.now();
      function step(ts: number) {
        if (draggingRef.current) return;
        const t = Math.min((ts - startTime) / RETURN_TO_FRONT_DURATION_MS, 1);
        const eased = 1 - (1 - t) ** 3;
        currentIndexRef.current = mod(start + delta * eased, FRAME_COUNT);
        draw();
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          currentIndexRef.current = 0;
          draw();
        }
      }
      requestAnimationFrame(step);
    }

    function scheduleReturn() {
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
      returnTimeoutRef.current = setTimeout(
        returnToFront,
        RETURN_TO_FRONT_DELAY_MS,
      );
    }

    function cancelReturn() {
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
    }

    function loadFrame(index: number) {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        if (index === 0) draw();
        if (loadedCount === FRAME_COUNT) setReady(true);
      };
      img.src = frameSrc(index);
      images[index] = img;
    }

    // Frame 0 loads eagerly (matches the priority <Image> below, so the
    // canvas can take over from cache the instant it resolves). The other
    // 73 frames are ~2.3MB combined — deferred to idle time so they don't
    // compete with the hero's critical-path resources on first load.
    loadFrame(0);
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 200);
    idle(() => {
      if (cancelled) return;
      for (let i = 1; i < FRAME_COUNT; i++) loadFrame(i);
    });

    function beginDrag(x: number) {
      draggingRef.current = true;
      setDragging(true);
      setInteracted(true);
      cancelReturn();
      lastXRef.current = x;
      lastTRef.current = performance.now();
      velocityRef.current = 0;
    }

    function moveDrag(x: number) {
      if (!draggingRef.current) return;
      const now = performance.now();
      const dt = Math.max(now - lastTRef.current, 1);
      const dx = x - lastXRef.current;
      const deltaFrames = -dx / DRAG_PX_PER_FRAME;
      if (dx !== 0) {
        currentIndexRef.current = mod(
          currentIndexRef.current + deltaFrames,
          FRAME_COUNT,
        );
        draw();
      }
      velocityRef.current = (deltaFrames / dt) * 16;
      lastXRef.current = x;
      lastTRef.current = now;
    }

    function momentumStep() {
      if (draggingRef.current) return;
      if (Math.abs(velocityRef.current) < MOMENTUM_STOP_THRESHOLD) {
        velocityRef.current = 0;
        scheduleReturn();
        return;
      }
      currentIndexRef.current = mod(
        currentIndexRef.current + velocityRef.current,
        FRAME_COUNT,
      );
      draw();
      velocityRef.current *= MOMENTUM_DECAY;
      requestAnimationFrame(momentumStep);
    }

    function endDrag() {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      requestAnimationFrame(momentumStep);
    }

    function onMouseDown(e: MouseEvent) {
      e.preventDefault();
      beginDrag(e.clientX);
    }
    function onMouseMove(e: MouseEvent) {
      moveDrag(e.clientX);
    }
    function onTouchStart(e: TouchEvent) {
      beginDrag(e.touches[0].clientX);
    }
    function onTouchMove(e: TouchEvent) {
      moveDrag(e.touches[0].clientX);
      e.preventDefault();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      setInteracted(true);
      cancelReturn();
      const step =
        e.key === "ArrowRight" ? KEYBOARD_STEP_FRAMES : -KEYBOARD_STEP_FRAMES;
      currentIndexRef.current = mod(
        currentIndexRef.current + step,
        FRAME_COUNT,
      );
      draw();
      scheduleReturn();
    }

    const stage = stageRef.current;
    stage?.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", endDrag);
    stage?.addEventListener("touchstart", onTouchStart, { passive: true });
    stage?.addEventListener("touchmove", onTouchMove, { passive: false });
    stage?.addEventListener("touchend", endDrag);
    stage?.addEventListener("touchcancel", endDrag);
    stage?.addEventListener("keydown", onKeyDown);

    const resizeObserver = new ResizeObserver(() => draw());
    if (stage) resizeObserver.observe(stage);

    return () => {
      cancelled = true;
      stage?.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", endDrag);
      stage?.removeEventListener("touchstart", onTouchStart);
      stage?.removeEventListener("touchmove", onTouchMove);
      stage?.removeEventListener("touchend", endDrag);
      stage?.removeEventListener("touchcancel", endDrag);
      stage?.removeEventListener("keydown", onKeyDown);
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "relative mx-auto aspect-[620/910] w-full max-w-67.5 touch-none outline-none focus-visible:ring-2 focus-visible:ring-red-500/50",
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
    >
      {/* Real, SSR'd image — the LCP candidate on first paint, and the
          fallback if JS never runs. Cross-fades out once the canvas (same
          frame 0, from cache) is ready to take over. */}
      <Image
        src={frameSrc(0)}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="(min-width: 1024px) 270px, 60vw"
        className={cn(
          "object-contain drop-shadow-[0_20px_40px_rgba(215,38,56,0.25)] transition-opacity duration-300",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 mx-auto drop-shadow-[0_20px_40px_rgba(215,38,56,0.25)] transition-opacity duration-300",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
      {!interacted && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-chip border border-white/10 bg-ink-950/70 px-3 py-1.5 text-[11px] font-medium text-ink-200 backdrop-blur-sm transition-opacity duration-500",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          ↔ Arrastrá para girar
        </span>
      )}
    </div>
  );
}
