export interface Article {
  slug: string;
  citySlug: string;
  title: string;
  description: string;
  category: string;
  categoryColor: "green" | "blue" | "amber" | "rose" | "purple" | "teal";
  image: string;
  content: string;
  publishedAt: string;
  popularity?: number; // レビュースコア（高いほど人気）
}
