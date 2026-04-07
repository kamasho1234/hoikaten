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
import "@/lib/articles/machida";
import "@/lib/articles/fujisawa";
import "@/lib/articles/kashiwa";
import "@/lib/articles/toyonaka";
import "@/lib/articles/yokosuka";
import "@/lib/articles/funabashi";
import "@/lib/articles/hachioji";
import "@/lib/articles/kawaguchi";
import "@/lib/articles/himeji";
import "@/lib/articles/matsuyama";
import "@/lib/articles/kagoshima";
import "@/lib/articles/utsunomiya";
import "@/lib/articles/higashiosaka";
import "@/lib/articles/nishinomiya";
import "@/lib/articles/amagasaki";
import "@/lib/articles/toyota";
import "@/lib/articles/kawagoe";
import "@/lib/articles/kanazawa";
import "@/lib/articles/takatsuki";
import "@/lib/articles/koshigaya";
import "@/lib/articles/nara";
import "@/lib/articles/nagasaki";
import "@/lib/articles/oita";
import "@/lib/articles/naha";
import "@/lib/articles/akashi";
import "@/lib/articles/suita";
import "@/lib/articles/okazaki";
import "@/lib/articles/ichinomiya";
import "@/lib/articles/hirakata";
import "@/lib/articles/otsu";
import "@/lib/articles/asahikawa";
import "@/lib/articles/hakodate";
import "@/lib/articles/mito";
import "@/lib/articles/maebashi";
import "@/lib/articles/takasaki";
import "@/lib/articles/aomori";
import "@/lib/articles/morioka";
import "@/lib/articles/akita";
import "@/lib/articles/yamagata";
import "@/lib/articles/fukushima";
import "@/lib/articles/koriyama";
import "@/lib/articles/iwaki";
import "@/lib/articles/toyama";
import "@/lib/articles/fukui";
import "@/lib/articles/nagano";
import "@/lib/articles/gifu";
import "@/lib/articles/toyohashi";
import "@/lib/articles/wakayama";
import "@/lib/articles/kurashiki";
import "@/lib/articles/fukuyama";
import "@/lib/articles/kure";
import "@/lib/articles/shimonoseki";
import "@/lib/articles/matsue";
import "@/lib/articles/takamatsu";
import "@/lib/articles/kochi";
import "@/lib/articles/sasebo";
import "@/lib/articles/tottori";
import "@/lib/articles/kurume";
import "@/lib/articles/miyazaki";
import "@/lib/articles/kodaira";
import "@/lib/articles/higashimurayama";

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
