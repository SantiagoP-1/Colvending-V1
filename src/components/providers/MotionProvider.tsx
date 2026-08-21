"use client";

import { MotionConfig } from "framer-motion";

// Client-requested: animations always play at full effect, regardless of
// the visitor's OS-level prefers-reduced-motion setting. reducedMotion
// previously defaulted to "user" here (respecting that setting sitewide) —
// see prefersReducedMotion() in lib/gsap.ts for the GSAP-side counterpart.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
