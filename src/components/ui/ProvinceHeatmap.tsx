"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import provinciasTopo from "@/data/argentina-provincias.json";
import { tierForMachineCount } from "@/lib/locations";
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  PROJECTION_CENTER,
  PROJECTION_SCALE,
} from "./mapProjection";

// The topojson's official name for CABA — our marker data (content.ts) uses
// "CABA" instead, matching how the rest of the site (search chips, province
// groups) already labels it.
const TOPOJSON_NAME_TO_PROVINCE_KEY: Record<string, string> = {
  "Ciudad Autónoma de Buenos Aires": "CABA",
};

interface ProvinceHeatmapProps {
  /** Total machines per province, keyed the same way as each marker's `province` field. */
  counts: Record<string, number>;
  className?: string;
}

export function ProvinceHeatmap({
  counts,
  className = "",
}: ProvinceHeatmapProps) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: PROJECTION_CENTER, scale: PROJECTION_SCALE }}
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      <Geographies geography={provinciasTopo}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const provinceKey =
              TOPOJSON_NAME_TO_PROVINCE_KEY[geo.properties.nombre] ??
              geo.properties.nombre;
            const count = counts[provinceKey] ?? 0;
            const tier = tierForMachineCount(count);
            const style = {
              fill: tier.fill,
              stroke: "rgba(245,245,244,0.2)",
              strokeWidth: 0.6,
              outline: "none",
              transition: "fill 0.3s ease-out",
            };
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{ default: style, hover: style, pressed: style }}
              >
                <title>
                  {provinceKey}
                  {count > 0
                    ? ` — ${count} ${count === 1 ? "máquina" : "máquinas"}`
                    : " — todavía sin máquinas"}
                </title>
              </Geography>
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
