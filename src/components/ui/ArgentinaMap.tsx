"use client";

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import provinciasTopo from "@/data/argentina-provincias.json";

// Tall viewBox (not square) — Argentina is much taller than it is wide, so
// this fills the frame far better than a square one would.
const MAP_WIDTH = 800;
const MAP_HEIGHT = 1067;
const PROJECTION_CENTER: [number, number] = [-64, -38];
const PROJECTION_SCALE = 1000;

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
}

interface ArgentinaMapProps {
  markers: readonly ArgentinaMapMarker[];
  center: [number, number];
  zoom: number;
  activeId: string | null;
  onMarkerClick?: (marker: ArgentinaMapMarker) => void;
  className?: string;
}

const geographyStyle = {
  default: { fill: "#3a3a44", stroke: "rgba(245,245,244,0.2)", strokeWidth: 0.6, outline: "none" },
  hover: { fill: "#3a3a44", stroke: "rgba(245,245,244,0.2)", strokeWidth: 0.6, outline: "none" },
  pressed: { fill: "#3a3a44", stroke: "rgba(245,245,244,0.2)", strokeWidth: 0.6, outline: "none" },
};

export function ArgentinaMap({
  markers,
  center,
  zoom,
  activeId,
  onMarkerClick,
  className = "",
}: ArgentinaMapProps) {
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
              const canFitLabel = x1 - x0 >= MIN_LABEL_SIZE && y1 - y0 >= MIN_LABEL_SIZE;
              const override = LABEL_OVERRIDES[geo.properties.nombre];
              const labelCoordinates = override?.coordinates ?? (geoCentroid(geo) as [number, number]);
              return (
                <g key={geo.rsmKey}>
                  <Geography geography={geo} style={geographyStyle} />
                  {canFitLabel && (
                    <Marker coordinates={labelCoordinates}>
                      <text
                        dx={override?.dx}
                        dy={override?.dy}
                        textAnchor="middle"
                        fontSize={override?.fontSize ?? 9}
                        fill="rgba(245,245,244,0.42)"
                        style={{ fontFamily: "var(--font-body)", pointerEvents: "none" }}
                      >
                        {override?.lines ? (
                          override.lines.map((line, i) => (
                            <tspan key={line} x={0} dy={i === 0 ? undefined : "1.1em"}>
                              {line}
                            </tspan>
                          ))
                        ) : (
                          override?.name ?? geo.properties.nombre
                        )}
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
              <title>{marker.label}</title>
              {isActive && (
                <circle r={9} fill="none" stroke="#d72638" strokeWidth={1.5} className="animate-ping" />
              )}
              <circle
                r={isActive ? 6 : 4}
                fill="#d72638"
                stroke="#0a0a0b"
                strokeWidth={1}
                style={{ transition: "r 0.3s ease-out" }}
              />
            </Marker>
          );
        })}
      </ZoomableGroup>
    </ComposableMap>
  );
}
