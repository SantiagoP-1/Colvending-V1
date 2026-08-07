"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" makes every Framer Motion animation sitewide respect
// the OS-level prefers-reduced-motion setting automatically (transform/scale
// animations collapse to instant, opacity still transitions) — one place
// instead of threading a check through every motion.* component.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
