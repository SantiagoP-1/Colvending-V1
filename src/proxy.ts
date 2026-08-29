import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Consolidates SEO signals onto the canonical apex domain: without this,
// anyone (or Googlebot) landing on the old Vercel project alias or the www
// subdomain would see the site duplicated under a third and fourth host.
// Only these exact hosts are matched — Vercel's per-branch/per-PR preview
// URLs (*.vercel.app) still resolve normally for development review.
const LEGACY_HOSTS = new Set([
  "colvending-v1.vercel.app",
  "www.colvending.com",
]);
const CANONICAL_ORIGIN = "https://colvending.com";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  if (host && LEGACY_HOSTS.has(host)) {
    const url = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      CANONICAL_ORIGIN,
    );
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
