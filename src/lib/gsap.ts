import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Client-requested: animations always play at full effect, regardless of
// the visitor's OS-level prefers-reduced-motion setting — hardcoded false
// instead of the actual matchMedia check. See MotionProvider.tsx for the
// Framer Motion-side counterpart (reducedMotion="never").
export function prefersReducedMotion(): boolean {
  return false;
}

export { gsap, ScrollTrigger };
