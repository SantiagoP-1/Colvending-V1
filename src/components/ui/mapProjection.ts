// Shared between ArgentinaMap (the interactive marker map) and
// ProvinceHeatmap (the small choropleth) so both render Argentina at the
// exact same size/proportions — the topojson itself lives in
// @/data/argentina-provincias.json.

// Tall viewBox (not square) — Argentina is much taller than it is wide, so
// this fills the frame far better than a square one would.
export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 1067;
export const PROJECTION_CENTER: [number, number] = [-64, -38];
export const PROJECTION_SCALE = 1000;
