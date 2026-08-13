"use client";

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import countries110m from "world-atlas/countries-110m.json";

const ARGENTINA_ISO_NUMERIC = "032";

// Tall viewBox (not square) — Argentina is much taller than it is wide, so
// this fills the frame far better than a square one would.
const MAP_WIDTH = 800;
const MAP_HEIGHT = 1067;
const PROJECTION_CENTER: [number, number] = [-64, -38];
const PROJECTION_SCALE = 1000;

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
  default: { fill: "#3a3a44", stroke: "rgba(245,245,244,0.18)", strokeWidth: 0.75, outline: "none" },
  hover: { fill: "#3a3a44", stroke: "rgba(245,245,244,0.18)", strokeWidth: 0.75, outline: "none" },
  pressed: { fill: "#3a3a44", stroke: "rgba(245,245,244,0.18)", strokeWidth: 0.75, outline: "none" },
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
        <Geographies geography={countries110m}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.id === ARGENTINA_ISO_NUMERIC)
              .map((geo) => <Geography key={geo.rsmKey} geography={geo} style={geographyStyle} />)
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
