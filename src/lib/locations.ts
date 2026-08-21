import {
  INSTALACIONES_CONTENT,
  UBICACIONES_EXTRA_MARKERS,
} from "@/lib/content";

export type LocationMarker =
  | (typeof INSTALACIONES_CONTENT.markers)[number]
  | (typeof UBICACIONES_EXTRA_MARKERS)[number];

export type ProvinceGroup = {
  province: string;
  markers: LocationMarker[];
};

// The full, real dataset — original 8 installations plus the client's
// 2026-08-20 batch. Single source so the homepage teaser (Instalaciones.tsx)
// and the full /ubicaciones page always agree on the same total instead of
// each concatenating the two arrays themselves.
export const ALL_MARKERS: readonly LocationMarker[] = [
  ...INSTALACIONES_CONTENT.markers,
  ...UBICACIONES_EXTRA_MARKERS,
];

// Grouped by province in the order each province first appears in the data
// — so a future marker with a new `province` value automatically gets its
// own group, no code change needed here. Shared by the homepage teaser
// (Instalaciones.tsx) and the full /ubicaciones page.
export function groupByProvince(
  markers: readonly LocationMarker[],
): ProvinceGroup[] {
  const order: string[] = [];
  const byProvince = new Map<string, LocationMarker[]>();
  for (const marker of markers) {
    if (!byProvince.has(marker.province)) {
      byProvince.set(marker.province, []);
      order.push(marker.province);
    }
    byProvince.get(marker.province)!.push(marker);
  }
  return order.map((province) => ({
    province,
    markers: byProvince.get(province)!,
  }));
}

// CABA (Ciudad Autónoma de Buenos Aires) isn't a province — it still gets
// its own group above (a real, distinct place worth filtering/searching
// for), but a "N provincias" stat shouldn't count it as one.
export function countProvinces(groups: readonly ProvinceGroup[]): number {
  return groups.filter((group) => group.province !== "CABA").length;
}

// Only markers from the 2026-08-20 client batch carry a known `machines`
// count — older markers simply omit the field rather than assume 1, so this
// reads it via a type guard instead of `marker.machines` (which the union
// type won't allow directly since not every member declares it).
export function getMachineCount(marker: LocationMarker): number | undefined {
  return "machines" in marker ? marker.machines : undefined;
}

// For the province heatmap: total machines per province, keyed by the same
// `province` string used on each marker. Markers without a known `machines`
// count (the original 8) count as 1 each — every marker represents at least
// one real, confirmed installation, so this isn't inventing a number, just
// not double-counting a spot we don't know has more than one machine.
export function getProvinceMachineCounts(
  markers: readonly LocationMarker[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const marker of markers) {
    counts[marker.province] =
      (counts[marker.province] ?? 0) + (getMachineCount(marker) ?? 1);
  }
  return counts;
}

export interface HeatmapTier {
  min: number;
  label: string;
  fill: string;
}

// Fixed absolute thresholds rather than a scale relative to the current
// max — tuned to today's real spread (Buenos Aires far ahead of every other
// province). Revisit these if the province totals shift a lot. Kept here
// (not in ProvinceHeatmap.tsx) so the legend can import just this plain
// data array without pulling react-simple-maps into the main bundle.
export const HEATMAP_TIERS: HeatmapTier[] = [
  { min: 0, label: "Sin presencia", fill: "#3a3a44" },
  { min: 1, label: "1–2 máquinas", fill: "rgba(215, 38, 56, 0.3)" },
  { min: 3, label: "3–5 máquinas", fill: "rgba(215, 38, 56, 0.6)" },
  { min: 6, label: "6+ máquinas", fill: "#d72638" },
];

export function tierForMachineCount(count: number): HeatmapTier {
  let tier = HEATMAP_TIERS[0];
  for (const candidate of HEATMAP_TIERS) {
    if (count >= candidate.min) tier = candidate;
  }
  return tier;
}

const COMBINING_DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

// Accent/case-insensitive text match — used by /ubicaciones' search box so
// "quilmes" or "cordoba" (no tilde) still finds "Quilmes" / "Córdoba".
export function normalizeSearchText(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(COMBINING_DIACRITICS, "");
}
