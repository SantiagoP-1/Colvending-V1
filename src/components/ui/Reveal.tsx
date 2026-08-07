"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = React.ComponentProps<"div"> & {
  delay?: number;
  y?: number;
  /** Reveal a slightly wider start point (e.g. horizontal-from-side lists). */
  x?: number;
};

// Shared scroll-reveal primitive: fades + slides an element in once it
// crosses into the viewport, via GSAP ScrollTrigger. Keeping this as a small
// client leaf (instead of making whole sections client components) lets
// section shells stay Server Components.
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [delay, y, x]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}
