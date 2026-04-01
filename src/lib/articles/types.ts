export interface Article {
  slug: string;
  citySlug: string;
  title: string;
  description: string;
  category: string;
  categoryColor: "green" | "blue" | "amber" | "rose" | "purple" | "teal";
  image: string; // Unsplash画像URL
  content: string;
  publishedAt: string;
}
