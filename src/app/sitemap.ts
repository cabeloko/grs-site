import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  return [
    {
      url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${url}/politica-de-privacidade`,
      lastModified: siteConfig.legal.privacyPolicyUpdatedAt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
