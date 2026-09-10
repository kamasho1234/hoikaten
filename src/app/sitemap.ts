import type { MetadataRoute } from "next";
import { getAllMunicipalities } from "@/lib/data";
import { getAllArticles } from "@/lib/articles";
import { prefectureMap } from "@/lib/prefecture";
import { getVacancyData, getVacancySlugs } from "@/lib/vacancy";
import { getAllDocuments } from "@/lib/documents";
import "@/lib/documents/register-all";
import { getAllInsuranceArticles } from "@/lib/insurance";
import "@/lib/insurance/register-all";

// 記事データの登録（sitemapはlayout.tsxとは別に実行されるため直接import）
// 記事の登録は register-all.ts に一本化する。
// ここに自治体ごとの import を手書きしていたため、書き足し忘れた355自治体・
// 2,084本の記事がサイトマップから抜けていた（2026-09-10 に判明）。
// register-all.ts は npm run build の前に verify-article-registry.ts が検査する。
import "@/lib/articles/register-all";

const prefectureSlugs = [
  "hokkaido", "aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima",
  "ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa",
  "niigata", "toyama", "ishikawa", "fukui", "yamanashi", "nagano",
  "gifu", "shizuoka", "aichi", "mie", "shiga", "kyoto", "osaka", "hyogo",
  "nara", "wakayama", "tottori", "shimane", "okayama", "hiroshima", "yamaguchi",
  "tokushima", "kagawa", "ehime", "kochi", "fukuoka", "saga", "nagasaki",
  "kumamoto", "oita", "miyazaki", "kagoshima", "okinawa",
];

// lastmod にビルド時刻（new Date()）を入れると毎回すべてのURLが更新扱いになり、
// Google が lastmod を信用しなくなる。実データから決められるものは実データを使い、
// 決められない固定ページはこの定数を使う（内容を変えたときに手で更新する）。
const SITE_UPDATED_AT = new Date("2026-09-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const municipalities = getAllMunicipalities();
  const articles = getAllArticles();
  const baseUrl = "https://hoikaten.com";

  // 自治体ごとに、その自治体の記事でいちばん新しい日付を持っておく
  const cityNewest = new Map<string, Date>();
  for (const a of articles) {
    if (a.citySlug === "general") continue;
    const d = new Date(a.publishedAt);
    if (Number.isNaN(d.getTime())) continue;
    const cur = cityNewest.get(a.citySlug);
    if (!cur || d > cur) cityNewest.set(a.citySlug, d);
  }
  const cityUpdatedAt = (slug: string) => cityNewest.get(slug) ?? SITE_UPDATED_AT;

  // 都道府県ページは、その県の自治体でいちばん新しい日付にする
  const prefectureUpdatedAt = (prefSlug: string) => {
    const prefName = prefectureMap[prefSlug];
    if (!prefName) return SITE_UPDATED_AT;
    let newest: Date | null = null;
    for (const m of municipalities) {
      if (m.prefecture !== prefName) continue;
      const d = cityNewest.get(m.slug);
      if (d && (!newest || d > newest)) newest = d;
    }
    return newest ?? SITE_UPDATED_AT;
  };

  const prefecturePages = prefectureSlugs.map((slug) => ({
    url: `${baseUrl}/prefecture/${slug}`,
    lastModified: prefectureUpdatedAt(slug),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityPages = municipalities.map((m) => ({
    url: `${baseUrl}/${m.slug}`,
    lastModified: cityUpdatedAt(m.slug),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const articleListPages = municipalities.map((m) => ({
    url: `${baseUrl}/${m.slug}/articles`,
    lastModified: cityUpdatedAt(m.slug),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articlePages = articles
    .filter((a) => a.citySlug !== "general")
    .map((a) => ({
      url: `${baseUrl}/${a.citySlug}/articles/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // 空き状況ページ（データを持つ自治体のみ。公式は毎月1日時点を公開する）
  const vacancyPages = getVacancySlugs().map((slug) => ({
    url: `${baseUrl}/${slug}/vacancy`,
    lastModified: new Date(getVacancyData(slug)!.asOf),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const generalArticles = articles.filter((a) => a.citySlug === "general");
  const generalArticlePages = generalArticles.map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 子育て書類ガイド（保育園以外の手続きでも参照される）
  const documentPages = getAllDocuments().map((g) => ({
    url: `${baseUrl}/documents/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 妊娠・出産・育児のお金の記事
  const insurancePages = getAllInsuranceArticles().map((a) => ({
    url: `${baseUrl}/insurance/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/select`,
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vacancy`,
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/documents`,
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insurance`,
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...prefecturePages,
    ...cityPages,
    ...vacancyPages,
    ...articleListPages,
    ...articlePages,
    ...generalArticlePages,
    ...documentPages,
    ...insurancePages,
  ];
}
