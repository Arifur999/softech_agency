import type { MetadataRoute } from "next";

import { SITE } from "@/data/site";

/**
 * One page, so one entry. The in-page anchors (#products, #custom-software…)
 * are deliberately not listed: fragments are not separate URLs and listing
 * them tells search engines nothing new.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
