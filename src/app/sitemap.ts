import type { MetadataRoute } from "next";
import { getAllMunicipalities } from "@/lib/data";
import { getAllArticles } from "@/lib/articles";

// 記事データの登録（sitemapはlayout.tsxとは別に実行されるため直接import）
import "@/lib/articles/setagaya";
import "@/lib/articles/yokohama";
import "@/lib/articles/osaka";
import "@/lib/articles/kawasaki";
import "@/lib/articles/nagoya";
import "@/lib/articles/saitama";
import "@/lib/articles/sapporo";
import "@/lib/articles/kobe";
import "@/lib/articles/fukuoka";
import "@/lib/articles/hiroshima";
import "@/lib/articles/sendai";
import "@/lib/articles/kyoto";
import "@/lib/articles/kitakyushu";
import "@/lib/articles/hamamatsu";
import "@/lib/articles/adachi";
import "@/lib/articles/suginami";
import "@/lib/articles/itabashi";
import "@/lib/articles/nerima";
import "@/lib/articles/ota";
import "@/lib/articles/edogawa";
import "@/lib/articles/sakai";
import "@/lib/articles/niigata";
import "@/lib/articles/sagamihara";
import "@/lib/articles/nakano";
import "@/lib/articles/toshima";
import "@/lib/articles/kita";
import "@/lib/articles/arakawa";
import "@/lib/articles/shinagawa";
import "@/lib/articles/meguro";
import "@/lib/articles/shibuya";
import "@/lib/articles/shinjuku";
import "@/lib/articles/bunkyo";
import "@/lib/articles/taito";
import "@/lib/articles/sumida";
import "@/lib/articles/katsushika";
import "@/lib/articles/minato";
import "@/lib/articles/chuo";
import "@/lib/articles/chiyoda";
import "@/lib/articles/koto";
import "@/lib/articles/okayama";
import "@/lib/articles/kumamoto";
import "@/lib/articles/shizuoka";

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
