import { ImageResponse } from "next/og";
import "@/lib/articles/register-all";
import { getArticle, getArticlesByCity } from "@/lib/articles";
import { createHeroElement, HERO_SIZE } from "@/lib/hero-image";

export const runtime = "nodejs";

export function generateStaticParams() {
  return getArticlesByCity("general").map((a) => ({ slug: a.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = getArticle("general", slug);
  const categoryColor = article?.categoryColor ?? "green";

  return new ImageResponse(
    createHeroElement(categoryColor, `general-${slug}`),
    { ...HERO_SIZE }
  );
}
