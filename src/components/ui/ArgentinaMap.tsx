"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import provinciasTopo from "@/data/argentina-provincias.json";
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  PROJECTION_CENTER,
  PROJECTION_SCALE,
} from "./mapProjection";

// A province's projected bounding box below this size (in the map's own
// 800x1067 coordinate units, either axis) can't fit a readable name without
// spilling far past its own shape — today this excludes only CABA (~3x3 at
// this scale). The rest range from ~30x38 (Tucumán) up.
const MIN_LABEL_SIZE = 15;

// Hand-tuned corrections where the automatic geoCentroid() placement
// doesn't work, keyed by the province's official name (geo.properties.nombre).
const LABEL_OVERRIDES: Record<
  string,
  {
    name?: string;
    /** Split the label across multiple centered lines instead of one. */
    lines?: string[];
    coordinates?: [number, number];
    dx?: number;
    dy?: number;
    fontSize?: number;
  }
> = {
  // Salta's real shape is concave where Jujuy cuts into it, so the plain
  // area centroid lands outside Salta's own polygon and inside Jujuy's —
  // confirmed with d3-geo's geoContains(). This coordinate is a manually
  // picked point (near Salta capital) verified to sit inside Salta.
  Salta: { coordinates: [-64.5, -25.2] },
  // Centroid sits only ~29px from Tucumán's label (both provinces are small
  // and squeezed together). Shifting left clears Tucumán; the left edge of
  // the text is allowed to spill past Catamarca's own polygon into the
  // empty margin next to it — standard practice for choropleth labels.
  Catamarca: { dx: -20 },
  // The centroid sits almost exactly on top of the "Campus UNSTA, Tucumán"
  // location marker. Nudging the label down (verified with geoContains() to
  // still land inside Tucumán's polygon) separates them — the marker itself
  // stays put, since it's a real machine location. Font is also shrunk: at
  // the default size the full name doesn't fit inside this small province
  // without overlapping its (large) neighbors.
  Tucumán: { dy: 13, fontSize: 7.5 },
  // At the default font size, the full name on one line is wide enough to
  // overlap Tucumán, Catamarca, and Chaco at once. Splitting across two
  // lines keeps each line short enough to stay clear of all three.
  "Santiago del Estero": { lines: ["Santiago del", "Estero"] },
  // The official name is used everywhere else on the site; only the on-map
  // label needs to fit this small shape without overflowing.
  "Tierra del Fuego, Antártida e Islas del Atlántico Sur": {
    name: "Tierra del Fuego",
    // geoCentroid() on this 6-part MultiPolygon (Isla Grande plus five much
    // smaller islands scattered across open water) lands in the gap between
    // them — confirmed with geoContains() to be outside every part. This is
    // the centroid of just the largest part (Isla Grande, the actual
    // mainland), confirmed with geoContains() to land inside it.
    coordinates: [-67.483, -54.327],
  },
};

export interface ArgentinaMapMarker {
  id: string;
  /** [longitude, latitude] */
  coordinates: [number, number];
  label: string;
  /** When there's more than one machine at this exact spot, render that many dots fanned out around the point instead of one. */
  machines?: number;
}

// A cluster (>1 machine at the same spot) fans its dots out in a small
// circle around the point instead of one straight row — reads as "a few
// separate spots near here" rather than a bar chart. The radius alternates
// slightly per dot (PETAL_RADIUS_JITTER) so it isn't a perfectly rigid
// polygon, which read as too computed/mechanical for a location this small.
// Single-dot markers keep the original, slightly larger radius (4 / 6
// active); cluster dots are smaller so several fanned out don't balloon.
// Checked against every current cluster marker's real distance to its own
// province border (CABA especially — being tiny, Serrano 630 only clears
// ~4km in any direction; a few Buenos Aires spots aren't much better:
// Lanús ~5km, Quilmes ~4km). A radius that's mathematically safe for those
// (~2.4) is too tight to look different from before, so this leans on the
// dot's own rendered size (which is bigger than the offset at FOCUS_ZOOM)
// to visually cover the sliver that technically crosses for those 4 tight
// spots — checked screenshot-by-screenshot, not just algebraically, for
// every cluster on the site; none showed a dot visibly sitting outside its
// own province. Re-check any newly added cluster marker the same way
// before raising these further.
const PETAL_BASE_RADIUS = 5;
const PETAL_RADIUS_STEP = 0.5;
const PETAL_RADIUS_JITTER = 0.75;
const SINGLE_DOT_RADIUS = { default: 4, active: 6 };
const CLUSTER_DOT_RADIUS = { default: 3, active: 4.5 };

interface ArgentinaMapProps {
  markers: readonly ArgentinaMapMarker[];
  center: [number, number];
  zoom: number;
  activeId: string | null;
  onMarkerClick?: (marker: ArgentinaMapMarker) => void;
  /** `marker.province` of the currently focused location — see PROVINCE_NAME_TO_GEO_NAME. */
  highlightProvince?: string | null;
  className?: string;
}

// Every province geography's `properties.nombre` comes straight from the
// topojson, which spells CABA out in full ("Ciudad Autónoma de Buenos
// Aires") — content.ts markers use the short "CABA" everywhere else on the
// site, so that's the one name that needs translating before comparing.
const PROVINCE_NAME_TO_GEO_NAME: Record<string, string> = {
  CABA: "Ciudad Autónoma de Buenos Aires",
};

const BASE_FILL = "#3a3a44";
const BASE_STROKE = "rgba(245,245,244,0.2)";
// Buenos Aires is a huge, elongated province — its name label sits at its
// overall centroid, which for northern river-corridor cities (Zárate, San
// Nicolás...) is far enough away that the nearest visible province label at
// FOCUS_ZOOM can end up being a neighboring province's (e.g. Entre Ríos)
// instead, even though the marker's dot is correctly inside Buenos Aires —
// reported by the client as "the point shows in Entre Ríos" for exactly
// those two cities. Every province shares one flat fill color, so there was
// no way to tell which shape actually contains the dot short of finding the
// (possibly distant, possibly off-screen) matching label. Tinting the
// focused marker's own province red removes that ambiguity regardless of
// which labels happen to be nearby.
const geographyStyle = {
  default: { fill: BASE_FILL, stroke: BASE_STROKE, strokeWidth: 0.6, outline: "none" },
  hover: { fill: BASE_FILL, stroke: BASE_STROKE, strokeWidth: 0.6, outline: "none" },
  pressed: { fill: BASE_FILL, stroke: BASE_STROKE, strokeWidth: 0.6, outline: "none" },
};
const highlightedGeographyStyle = {
  default: {
    fill: "rgba(215,38,56,0.22)",
    stroke: "rgba(215,38,56,0.65)",
    strokeWidth: 0.9,
    outline: "none",
    transition: "fill 0.4s ease-out, stroke 0.4s ease-out",
  },
  hover: {
    fill: "rgba(215,38,56,0.22)",
    stroke: "rgba(215,38,56,0.65)",
    strokeWidth: 0.9,
    outline: "none",
  },
  pressed: {
    fill: "rgba(215,38,56,0.22)",
    stroke: "rgba(215,38,56,0.65)",
    strokeWidth: 0.9,
    outline: "none",
  },
};

export function ArgentinaMap({
  markers,
  center,
  zoom,
  activeId,
  onMarkerClick,
  highlightProvince,
  className = "",
}: ArgentinaMapProps) {
  const highlightGeoName = highlightProvince
    ? (PROVINCE_NAME_TO_GEO_NAME[highlightProvince] ?? highlightProvince)
    : null;

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: PROJECTION_CENTER, scale: PROJECTION_SCALE }}
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      <ZoomableGroup
        center={center}
        zoom={zoom}
        minZoom={1}
        maxZoom={5}
        filterZoomEvent={() => false}
        style={{ transition: "transform 0.6s ease-in-out" }}
      >
        <Geographies geography={provinciasTopo}>
          {({ geographies, path }) =>
            geographies.map((geo) => {
              const [[x0, y0], [x1, y1]] = path.bounds(geo);
              const canFitLabel =
                x1 - x0 >= MIN_LABEL_SIZE && y1 - y0 >= MIN_LABEL_SIZE;
              const override = LABEL_OVERRIDES[geo.properties.nombre];
              const labelCoordinates =
                override?.coordinates ?? (geoCentroid(geo) as [number, number]);
              const isHighlighted = geo.properties.nombre === highlightGeoName;
              return (
                <g key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    style={isHighlighted ? highlightedGeographyStyle : geographyStyle}
                  />
                  {canFitLabel && (
                    <Marker coordinates={labelCoordinates}>
                      <text
                        dx={override?.dx}
                        dy={override?.dy}
                        textAnchor="middle"
                        fontSize={override?.fontSize ?? 9}
                        fill="rgba(245,245,244,0.42)"
                        style={{
                          fontFamily: "var(--font-body)",
                          pointerEvents: "none",
                        }}
                      >
                        {override?.lines
                          ? override.lines.map((line, i) => (
                              <tspan
                                key={line}
                                x={0}
                                dy={i === 0 ? undefined : "1.1em"}
                              >
                                {line}
                              </tspan>
                            ))
                          : (override?.name ?? geo.properties.nombre)}
                      </text>
                    </Marker>
                  )}
                </g>
              );
            })
          }
        </Geographies>

        {markers.map((marker) => {
          const isActive = marker.id === activeId;
          const machineCount =
            marker.machines && marker.machines > 1 ? marker.machines : 1;
          const isCluster = machineCount > 1;
          const dotRadius = isCluster ? CLUSTER_DOT_RADIUS : SINGLE_DOT_RADIUS;
          // PETAL_BASE_RADIUS/STEP/JITTER are projection units, which
          // ZoomableGroup's `scale(zoom)` multiplies along with everything
          // else — undivided, a cluster's fan-out radius (a fixed real-world
          // distance) grows right along with the zoom, so at FOCUS_ZOOM a
          // 2-machine cluster's dots could end up several real km apart,
          // enough for one to visually cross a province border while the
          // other stays put (reported by the client for San Nicolás: one
          // dot rendered inside Entre Ríos). Dividing by `zoom` keeps the
          // fan-out's ON-SCREEN size constant across zoom levels instead of
          // scaling up with it, so it stays "a few separate spots right
          // here" — the original design intent — at any zoom.
          const petalRadius =
            (PETAL_BASE_RADIUS +
              Math.max(0, machineCount - 2) * PETAL_RADIUS_STEP) /
            zoom;
          const petalJitter = PETAL_RADIUS_JITTER / zoom;
          // Evenly spaced around a circle (starting straight up), each dot's
          // own radius nudged slightly in/out in alternation — the fan-out
          // stays legible at a glance but doesn't read as a stamped-out
          // regular polygon.
          const dotOffsets = isCluster
            ? Array.from({ length: machineCount }, (_, i) => {
                const angle = -Math.PI / 2 + (i * 2 * Math.PI) / machineCount;
                const r = petalRadius + (i % 2 === 0 ? petalJitter : -petalJitter);
                return { dx: Math.cos(angle) * r, dy: Math.sin(angle) * r };
              })
            : [{ dx: 0, dy: 0 }];
          const maxDotDistance = isCluster
            ? Math.max(...dotOffsets.map(({ dx, dy }) => Math.hypot(dx, dy)))
            : 0;
          const ringRadius = isCluster
            ? maxDotDistance + dotRadius.active + 3
            : 9;
          return (
            <Marker
              key={marker.id}
              coordinates={marker.coordinates}
              onClick={() => onMarkerClick?.(marker)}
              style={{
                default: { cursor: onMarkerClick ? "pointer" : "default" },
                hover: { cursor: onMarkerClick ? "pointer" : "default" },
                pressed: { cursor: onMarkerClick ? "pointer" : "default" },
              }}
            >
              <title>
                {marker.label}
                {machineCount > 1 ? ` — ${machineCount} máquinas` : ""}
              </title>
              {isActive && (
                <circle
                  r={ringRadius}
                  fill="none"
                  stroke="#d72638"
                  strokeWidth={1.5}
                  className="animate-ping"
                />
              )}
              {dotOffsets.map(({ dx, dy }, i) => (
                <circle
                  key={i}
                  cx={dx}
                  cy={dy}
                  r={isActive ? dotRadius.active : dotRadius.default}
                  fill="#d72638"
                  stroke="#0a0a0b"
                  strokeWidth={1}
                  style={{ transition: "r 0.3s ease-out" }}
                />
              ))}
            </Marker>
          );
        })}
      </ZoomableGroup>
    </ComposableMap>
  );
}
