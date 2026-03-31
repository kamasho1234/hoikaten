export interface Article {
  slug: string;
  citySlug: string;
  title: string;
  description: string;
  content: string; // HTML string
  publishedAt: string; // ISO date
}
