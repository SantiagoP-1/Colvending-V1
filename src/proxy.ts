import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Consolidates SEO signals onto the canonical domain: Vercel keeps serving
// this same deployment under its old project alias, so without this a
// visitor (or Googlebot) landing on colvending-v1.vercel.app would see the
// site duplicated under two different hosts. Only that exact legacy host is
// matched — Vercel's per-branch/per-PR preview URLs (*.vercel.app) still
// resolve normally for development review.
const LEGACY_HOST = "colvending-v1.vercel.app";
const CANONICAL_ORIGIN = "https://colvending.com";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  if (host === LEGACY_HOST) {
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
