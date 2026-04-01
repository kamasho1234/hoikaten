export interface Article {
  slug: string;
  citySlug: string;
  title: string;
  description: string;
  emoji: string; // 記事のアイコン絵文字
  category: string; // カテゴリラベル（例: "点数アップ", "お金"）
  content: string; // HTML string
  publishedAt: string; // ISO date
}
