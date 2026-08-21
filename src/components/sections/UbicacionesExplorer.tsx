"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MapPin, Search, X } from "lucide-react";
import logoIcon from "@/assets/images/logo-icon.webp";
import type { ArgentinaMapMarker } from "@/components/ui/ArgentinaMap";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { StatCounter } from "@/components/ui/StatCounter";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { UBICACIONES_PAGE_CONTENT } from "@/lib/content";
import {
  ALL_MARKERS,
  countProvinces,
  getMachineCount,
  groupByProvince,
  normalizeSearchText,
} from "@/lib/locations";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

// Same hydration-mismatch reasoning as Instalaciones.tsx (d3-geo trig isn't
// bit-identical server vs. client) — client-only render sidesteps it. No
// "in view" gate here though: unlike the homepage teaser, the map is the
// primary reason someone lands on this page, so it should load immediately
// rather than waiting for a scroll trigger that's already satisfied.
const ArgentinaMap = dynamic(
  () => import("@/components/ui/ArgentinaMap").then((mod) => mod.ArgentinaMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-white/[0.03]" />
    ),
  },
);

const DEFAULT_CENTER: [number, number] = [-64, -38];
const DEFAULT_ZOOM = 1;
const FOCUS_ZOOM = 4;
const FOCUS_DURATION_MS = 4000;

const PROVINCE_GROUPS = groupByProvince(ALL_MARKERS);
const TOTAL_PROVINCES = countProvinces(PROVINCE_GROUPS);

export function UbicacionesExplorer() {
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const normalizedQuery = normalizeSearchText(query.trim());
  const hasActiveFilter =
    normalizedQuery.length > 0 || selectedProvince !== null;

  const filteredMarkers = useMemo(() => {
    return ALL_MARKERS.filter((marker) => {
      if (selectedProvince && marker.province !== selectedProvince)
        return false;
      if (!normalizedQuery) return true;
      return (
        normalizeSearchText(marker.label).includes(normalizedQuery) ||
        normalizeSearchText(marker.province).includes(normalizedQuery)
      );
    });
  }, [normalizedQuery, selectedProvince]);

  const filteredGroups = useMemo(
    () => groupByProvince(filteredMarkers),
    [filteredMarkers],
  );
  const hasResults = filteredMarkers.length > 0;

  // Unlike the homepage teaser (which always shows every pin), this map
  // starts empty and only plots the one location the visitor just tapped —
  // it clears again on the same timer that zooms back out. If a search/
  // province filter excludes the active marker, it drops off the map too.
  const activeMarker = activeId
    ? (filteredMarkers.find((m) => m.id === activeId) ?? null)
    : null;
  const mapMarkers = useMemo(
    () => (activeMarker ? [activeMarker] : []),
    [activeMarker],
  );

  function clearFilters() {
    setQuery("");
    setSelectedProvince(null);
  }

  return (
    <section
      aria-label="Todas las ubicaciones de ColVending en Argentina"
      className="bg-ink-950 pt-[calc(72px+var(--spacing-section))] pb-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{UBICACIONES_PAGE_CONTENT.tag}</SectionTag>
          <h1 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {UBICACIONES_PAGE_CONTENT.heading}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            {UBICACIONES_PAGE_CONTENT.lead}
          </p>
        </Reveal>

        <Reveal
          delay={0.08}
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
          delay={0.14}
          className="mt-10 grid grid-cols-1 items-start gap-10 rounded-card border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-6 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-12"
        >
          <div className="relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden rounded-2xl bg-ink-950/60 lg:sticky lg:top-24">
            <ArgentinaMap
              markers={mapMarkers}
              center={center}
              zoom={zoom}
              activeId={activeId}
              onMarkerClick={focusLocation}
              className="h-full w-full"
            />
            {!activeMarker && (
              <div className="pointer-events-none absolute inset-x-4 top-4 rounded-btn border border-white/10 bg-ink-950/70 px-3 py-2 text-center text-xs font-medium text-ink-300 backdrop-blur-sm">
                Tocá una ubicación de la lista para verla en el mapa
              </div>
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
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-400"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={UBICACIONES_PAGE_CONTENT.searchPlaceholder}
                aria-label={UBICACIONES_PAGE_CONTENT.searchAriaLabel}
                className="w-full rounded-btn border border-white/10 bg-white/[0.03] py-3 pr-10 pl-11 text-sm text-paper placeholder:text-ink-400 outline-none transition-colors duration-200 focus:border-red-500/50"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Borrar búsqueda"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-400 transition-colors duration-200 hover:text-paper"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>

            <div
              className="mt-4 flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrar por provincia"
            >
              <button
                type="button"
                onClick={() => setSelectedProvince(null)}
                aria-pressed={selectedProvince === null}
                className={cn(
                  "rounded-chip border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200",
                  selectedProvince === null
                    ? "border-red-500/50 bg-red-500/10 text-red-300"
                    : "border-white/10 bg-white/[0.02] text-ink-300 hover:border-white/25 hover:text-paper",
                )}
              >
                {UBICACIONES_PAGE_CONTENT.allProvincesLabel} (
                {ALL_MARKERS.length})
              </button>
              {PROVINCE_GROUPS.map((group) => (
                <button
                  key={group.province}
                  type="button"
                  onClick={() => setSelectedProvince(group.province)}
                  aria-pressed={selectedProvince === group.province}
                  className={cn(
                    "rounded-chip border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200",
                    selectedProvince === group.province
                      ? "border-red-500/50 bg-red-500/10 text-red-300"
                      : "border-white/10 bg-white/[0.02] text-ink-300 hover:border-white/25 hover:text-paper",
                  )}
                >
                  {group.province} ({group.markers.length})
                </button>
              ))}
            </div>

            <p
              className="mt-4 text-xs font-medium text-ink-400"
              aria-live="polite"
            >
              {filteredMarkers.length}{" "}
              {filteredMarkers.length === 1 ? "ubicación" : "ubicaciones"}
              {hasActiveFilter ? " encontradas" : ""}
            </p>

            <div className="mt-4 max-h-125 space-y-6 overflow-y-auto pr-1">
              {hasResults ? (
                filteredGroups.map((group) => (
                  <div key={group.province}>
                    <p className="text-xs font-semibold tracking-wide text-ink-300 uppercase">
                      {group.province}{" "}
                      <span className="font-normal text-ink-400">
                        ({group.markers.length})
                      </span>
                    </p>
                    <ul className="mt-2 space-y-2" role="list">
                      {group.markers.map((marker) => {
                        const isActive = marker.id === activeId;
                        const machineCount = getMachineCount(marker);
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
                                  isActive
                                    ? "bg-red-500 text-white"
                                    : "bg-red-500/15 text-red-500",
                                )}
                              >
                                <MapPin size={15} aria-hidden="true" />
                              </span>
                              <span className="min-w-0 flex-1 truncate">
                                {marker.label}
                                {machineCount !== undefined && (
                                  <span className="text-ink-400">
                                    {" · "}
                                    {machineCount}{" "}
                                    {machineCount === 1
                                      ? "máquina"
                                      : "máquinas"}
                                  </span>
                                )}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="rounded-btn border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
                  <p className="text-sm font-semibold text-paper">
                    {UBICACIONES_PAGE_CONTENT.emptyStateTitle}
                  </p>
                  <p className="mt-1.5 text-sm text-ink-300">
                    {UBICACIONES_PAGE_CONTENT.emptyStateBody}
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 rounded-sm text-sm font-semibold text-red-400 underline decoration-red-400/40 underline-offset-2 transition-colors duration-200 hover:text-red-300 hover:decoration-red-300"
                  >
                    {UBICACIONES_PAGE_CONTENT.clearFiltersLabel}
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-10 flex flex-col items-center gap-6 rounded-card border border-dashed border-white/15 bg-white/[0.02] p-8 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <p className="text-base font-semibold text-paper sm:max-w-md">
            {UBICACIONES_PAGE_CONTENT.ctaQuestion}
          </p>
          <Button
            href={whatsappHref(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="w-full shrink-0 sm:w-auto"
          >
            <WhatsAppIcon />
            {UBICACIONES_PAGE_CONTENT.ctaLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
