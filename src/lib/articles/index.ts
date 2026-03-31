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
