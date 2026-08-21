"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import logoIcon from "@/assets/images/logo-icon.webp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { StatCounter } from "@/components/ui/StatCounter";
import { INSTALACIONES_CONTENT, UBICACIONES_PAGE_CONTENT } from "@/lib/content";
import {
  ALL_MARKERS,
  countProvinces,
  getProvinceMachineCounts,
  groupByProvince,
  HEATMAP_TIERS,
} from "@/lib/locations";

// react-simple-maps/d3-geo does floating-point trig to place province
// shapes, and Math.sin/cos aren't guaranteed bit-identical across JS
// engines — Node's SSR pass and the browser can compute a last-decimal-
// digit-different result for the same coordinates, which React then flags
// as a hydration mismatch. Rendering this client-only sidesteps it entirely.
const ProvinceHeatmap = dynamic(
  () =>
    import("@/components/ui/ProvinceHeatmap").then(
      (mod) => mod.ProvinceHeatmap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-white/[0.03]" />
    ),
  },
);

const TOTAL_PROVINCES = countProvinces(groupByProvince(ALL_MARKERS));
const PROVINCE_MACHINE_COUNTS = getProvinceMachineCounts(ALL_MARKERS);

export function Instalaciones() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // react-simple-maps + d3-geo is one of the heaviest chunks on this page.
  // dynamic(ssr:false) keeps it off the server render, but without this
  // "in view" gate the client-side import() fires as soon as this section
  // mounts — i.e. on every page load, even for visitors who never scroll
  // this far. Reusing the same useInView check StatCounter.tsx already
  // uses defers that fetch until the map is actually about to be seen.
  const mapInView = useInView(mapContainerRef, { once: true, margin: "200px" });

  return (
    <section
      id="instalaciones"
      aria-label="Presencia de ColVending en Argentina"
      className="bg-ink-900 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{INSTALACIONES_CONTENT.tag}</SectionTag>
          <h2 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {INSTALACIONES_CONTENT.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            {INSTALACIONES_CONTENT.lead}
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3"
        >
          <div>
            <span className="font-display text-3xl font-bold text-paper">
              <StatCounter value={ALL_MARKERS.length} />
            </span>
            <span className="ml-2 text-sm text-ink-300">
              {UBICACIONES_PAGE_CONTENT.installedLabel}
            </span>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden="true" />
          <div>
            <span className="font-display text-3xl font-bold text-paper">
              <StatCounter value={TOTAL_PROVINCES} />
            </span>
            <span className="ml-2 text-sm text-ink-300">
              {UBICACIONES_PAGE_CONTENT.provincesLabel}
            </span>
          </div>
        </Reveal>

        <Reveal
          delay={0.16}
          className="mt-10 rounded-card border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-6 sm:p-10"
        >
          <div
            ref={mapContainerRef}
            className="relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden rounded-2xl bg-ink-950/60"
          >
            {mapInView ? (
              <ProvinceHeatmap
                counts={PROVINCE_MACHINE_COUNTS}
                className="h-full w-full"
              />
            ) : (
              <div className="h-full w-full animate-pulse bg-white/[0.03]" />
            )}
            <Image
              src={logoIcon}
              alt=""
              width={29}
              height={36}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 bottom-3 h-10 w-auto opacity-15"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {HEATMAP_TIERS.map((tier) => (
              <span
                key={tier.label}
                className="inline-flex items-center gap-1.5 text-xs text-ink-300"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/15"
                  style={{ backgroundColor: tier.fill }}
                  aria-hidden="true"
                />
                {tier.label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.22} className="mt-8 text-center">
          <Button href="/ubicaciones" variant="ghost">
            {INSTALACIONES_CONTENT.viewAllCta}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
