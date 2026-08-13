"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import logoIcon from "@/assets/images/logo-icon.webp";
import type { ArgentinaMapMarker } from "@/components/ui/ArgentinaMap";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { INSTALACIONES_CONTENT } from "@/lib/content";
import { cn } from "@/lib/utils";

// react-simple-maps/d3-geo does floating-point trig to place markers, and
// Math.sin/cos aren't guaranteed bit-identical across JS engines — Node's
// SSR pass and the browser can compute a last-decimal-digit-different
// result for the same coordinates, which React then flags as a hydration
// mismatch. Rendering this client-only sidesteps it entirely: there's no
// server-rendered markup for it to disagree with.
const ArgentinaMap = dynamic(
  () => import("@/components/ui/ArgentinaMap").then((mod) => mod.ArgentinaMap),
  {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse bg-white/[0.03]" />,
  },
);

const DEFAULT_CENTER: [number, number] = [-64, -38];
const DEFAULT_ZOOM = 1;
const FOCUS_ZOOM = 4;
const FOCUS_DURATION_MS = 4000;

type Marker = (typeof INSTALACIONES_CONTENT.markers)[number];

// Grouped by province in the order each province first appears in the data
// — so a future marker with a new `province` value automatically gets its
// own accordion group, no code change needed here.
function groupByProvince(markers: readonly Marker[]) {
  const order: string[] = [];
  const byProvince = new Map<string, Marker[]>();
  for (const marker of markers) {
    if (!byProvince.has(marker.province)) {
      byProvince.set(marker.province, []);
      order.push(marker.province);
    }
    byProvince.get(marker.province)!.push(marker);
  }
  return order.map((province) => ({ province, markers: byProvince.get(province)! }));
}

const PROVINCE_GROUPS = groupByProvince(INSTALACIONES_CONTENT.markers);

export function Instalaciones() {
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openProvinces, setOpenProvinces] = useState<Set<string>>(
    () => new Set(PROVINCE_GROUPS.map((g) => g.province)),
  );
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // react-simple-maps + d3-geo is one of the heaviest chunks on this page —
  // dynamic(ssr:false) already keeps it off the server render, but the
  // client-side import() still fired as soon as this section mounted,
  // i.e. on every page load even for visitors who never scroll this far.
  // Gating it behind the same "in view" check StatCounter.tsx already uses
  // defers that fetch until the map is actually about to be seen.
  const mapInView = useInView(mapContainerRef, { once: true, margin: "200px" });

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const focusLocation = useCallback((marker: ArgentinaMapMarker) => {
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

    setActiveId(marker.id);
    setCenter(marker.coordinates);
    setZoom(FOCUS_ZOOM);

    resetTimeoutRef.current = setTimeout(() => {
      setActiveId(null);
      setCenter(DEFAULT_CENTER);
      setZoom(DEFAULT_ZOOM);
      resetTimeoutRef.current = null;
    }, FOCUS_DURATION_MS);
  }, []);

  function toggleProvince(province: string) {
    setOpenProvinces((prev) => {
      const next = new Set(prev);
      if (next.has(province)) next.delete(province);
      else next.add(province);
      return next;
    });
  }

  return (
    <section
      id="instalaciones"
      aria-label="Ubicaciones de máquinas instaladas en Argentina"
      className="bg-ink-900 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{INSTALACIONES_CONTENT.tag}</SectionTag>
          <h2 className="font-display mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {INSTALACIONES_CONTENT.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            {INSTALACIONES_CONTENT.lead}
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 grid grid-cols-1 items-center gap-10 rounded-card border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-6 sm:p-10 lg:grid-cols-[1fr_0.85fr] lg:gap-12"
        >
          <div
            ref={mapContainerRef}
            className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-ink-950/60"
          >
            {mapInView ? (
              <ArgentinaMap
                markers={INSTALACIONES_CONTENT.markers}
                center={center}
                zoom={zoom}
                activeId={activeId}
                onMarkerClick={focusLocation}
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

          <div>
            <p className="text-xs font-semibold tracking-wide text-ink-300 uppercase">
              Máquinas instaladas
            </p>
            <div className="mt-4 space-y-3">
              {PROVINCE_GROUPS.map((group) => {
                const isOpen = openProvinces.has(group.province);
                return (
                  <div
                    key={group.province}
                    className="overflow-hidden rounded-btn border border-white/10 bg-white/[0.02]"
                  >
                    <button
                      type="button"
                      onClick={() => toggleProvince(group.province)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-paper transition-colors duration-200 hover:text-red-400"
                    >
                      <span>
                        {group.province}{" "}
                        <span className="font-normal text-ink-300">({group.markers.length})</span>
                      </span>
                      <ChevronDown
                        size={16}
                        className={cn(
                          "shrink-0 text-ink-400 transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2 px-3 pb-3" role="list">
                            {group.markers.map((marker) => {
                              const isActive = marker.id === activeId;
                              return (
                                <li key={marker.id}>
                                  <button
                                    type="button"
                                    onClick={() => focusLocation(marker)}
                                    aria-pressed={isActive}
                                    className={cn(
                                      "flex w-full items-center gap-3 rounded-btn border px-4 py-3 text-left text-sm transition-colors duration-200",
                                      isActive
                                        ? "border-red-500/50 bg-red-500/10 text-paper"
                                        : "border-white/10 bg-white/[0.02] text-ink-200 hover:border-white/25 hover:text-paper",
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                                        isActive ? "bg-red-500 text-white" : "bg-red-500/15 text-red-500",
                                      )}
                                    >
                                      <MapPin size={15} aria-hidden="true" />
                                    </span>
                                    {marker.label}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
