import type { Article } from "./types";

const allArticles: Article[] = [];

export function registerArticles(articles: Article[]) {
  allArticles.push(...articles);
}

export function getArticlesByCity(citySlug: string): Article[] {
  return allArticles.filter((a) => a.citySlug === citySlug);
}

export function getArticle(
  citySlug: string,
  articleSlug: string
): Article | undefined {
  return allArticles.find(
    (a) => a.citySlug === citySlug && a.slug === articleSlug
  );
}

export function getAllArticles(): Article[] {
  return allArticles;
}

/** 自治体ごとのコラムを持つ自治体の slug（general を除く、重複なし） */
export function getArticleCitySlugs(): string[] {
  const slugs = new Set<string>();
  for (const a of allArticles) {
    if (a.citySlug !== "general") slugs.add(a.citySlug);
  }
  return [...slugs];
}

export function getTopArticles(limit: number = 10): Article[] {
  return [...allArticles]
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, limit);
}
