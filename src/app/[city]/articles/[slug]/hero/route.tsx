import { ImageResponse } from "next/og";
import "@/lib/articles/register-all";
import { getArticle, getArticlesByCity, getArticleCitySlugs } from "@/lib/articles";
import { getCityInfo } from "@/lib/city-info";
import { createHeroElement, HERO_SIZE } from "@/lib/hero-image";
import { heroFontOptions } from "@/lib/hero-font";

export const runtime = "nodejs";

export function generateStaticParams() {
  const params: { city: string; slug: string }[] = [];
  for (const city of getArticleCitySlugs()) {
    if (!getCityInfo(city)) continue;
    for (const a of getArticlesByCity(city)) {
      params.push({ city, slug: a.slug });
    }
  }
  return params;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ city: string; slug: string }> }
) {
  const { city, slug } = await params;
  const article = getArticle(city, slug);
  const categoryColor = article?.categoryColor ?? "green";
  // 自治体名は上に小さく出す。「世田谷区」のような表記
  const municipality = getCityInfo(city);

  return new ImageResponse(
    createHeroElement(
      categoryColor,
      `${city}-${slug}`,
      article?.category,
      municipality?.name
    ),
    { ...HERO_SIZE, fonts: await heroFontOptions() }
  );
}
