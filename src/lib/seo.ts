import type { Metadata } from "next";

// Single source of truth for the production URL, used by metadataBase,
// canonical tags, robots.ts, sitemap.ts and JSON-LD.
//
// colvending.com is the client's own domain and the official production
// URL. NEXT_PUBLIC_SITE_URL stays as an override so Vercel preview
// deployments (or a future domain change) can still point elsewhere
// without touching this file.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://colvending.com";

const SHARE_IMAGE_ALT =
  "ColVending — Máquinas expendedoras automáticas en Balcarce, Buenos Aires";

// Next.js merges metadata per route segment by REPLACING nested objects
// (openGraph, twitter) wholesale rather than field-by-field — a page that
// sets only openGraph.title loses the inherited og:image entirely (verified
// against a production build). Every route below the root layout that wants
// its own title/description for social shares has to re-declare the full
// object, so this helper does it once instead of copy-pasting it per page.
// Points at the same root-level opengraph-image/twitter-image routes the
// homepage uses — one share image for the whole site, just a page-specific
// title/description/url around it.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      locale: "es_AR",
      siteName: "ColVending",
      images: [
        { url: "/opengraph-image", width: 1200, height: 630, alt: SHARE_IMAGE_ALT },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        { url: "/twitter-image", width: 1200, height: 630, alt: SHARE_IMAGE_ALT },
      ],
    },
  };
}
