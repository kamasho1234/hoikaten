import type { MetadataRoute } from "next";
import { getAllMunicipalities } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const municipalities = getAllMunicipalities();
  const baseUrl = "https://hoikaten.com";

  const cityPages = municipalities.map((m) => ({
    url: `https://${m.slug}.hoikaten.com`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...cityPages,
  ];
}
