import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Single-page site: one entry is correct here, not a limitation to fix.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
