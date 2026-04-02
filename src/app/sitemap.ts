import type { MetadataRoute } from "next";
import { getAllMunicipalities } from "@/lib/data";
import { getAllArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const municipalities = getAllMunicipalities();
  const articles = getAllArticles();
  const baseUrl = "https://hoikaten.com";

  const cityPages = municipalities.map((m) => ({
    url: `https://${m.slug}.hoikaten.com`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const articlePages = articles.map((a) => ({
    url: `https://${a.citySlug}.hoikaten.com/${a.citySlug}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/select`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...cityPages,
    ...articlePages,
  ];
}
