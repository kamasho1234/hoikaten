import { ImageResponse } from "next/og";
import "@/lib/articles/register-all";
import { getAllMunicipalities } from "@/lib/data";
import { getArticle, getArticlesByCity } from "@/lib/articles";
import { createHeroElement, HERO_SIZE } from "@/lib/hero-image";
import { heroFontOptions } from "@/lib/hero-font";

export const runtime = "nodejs";

export function generateStaticParams() {
  const municipalities = getAllMunicipalities();
  const params: { city: string; slug: string }[] = [];
  for (const m of municipalities) {
    const articles = getArticlesByCity(m.slug);
    for (const a of articles) {
      params.push({ city: m.slug, slug: a.slug });
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
  // 自治体名は上に小さく出す。data 側は「世田谷区」のような表記で持っている
  const municipality = getAllMunicipalities().find((m) => m.slug === city);

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
