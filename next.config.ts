import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Drops the "X-Powered-By: Next.js" response header — minor hardening,
  // no reason to advertise the exact framework to every request.
  poweredByHeader: false,

  // Lets the dev server be reached from other devices on the same network
  // (phone, other browser) via the "Network:" URL that `next dev` prints,
  // not just localhost. Matching is per dot-separated segment, so this
  // wildcard covers the whole 192.168.0.x subnet even if the PC's last
  // octet changes; update the first three octets if your router uses a
  // different range (e.g. 192.168.1.x).
  allowedDevOrigins: ["192.168.0.*"],
};

export default nextConfig;
