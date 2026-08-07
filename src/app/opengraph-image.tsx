import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "ColVending — Máquinas expendedoras automáticas en Balcarce, Buenos Aires";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Satori (the renderer behind ImageResponse) doesn't reliably decode
  // WebP — a pre-converted PNG avoids adding sharp as a runtime dependency
  // just to convert on the fly.
  const logoBuffer = await readFile(
    join(process.cwd(), "src/assets/images/logo-icon-og.png"),
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
          backgroundImage:
            "radial-gradient(ellipse 900px 500px at 85% 10%, rgba(215,38,56,0.35), transparent), radial-gradient(ellipse 700px 500px at 10% 100%, rgba(139,17,26,0.25), transparent)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={110} height={136} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#f5f5f4",
          }}
        >
          COLVENDING
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            color: "#c3c3c9",
          }}
        >
          Máquinas expendedoras automáticas · Balcarce, Buenos Aires
        </div>
      </div>
    ),
    { ...size },
  );
}
