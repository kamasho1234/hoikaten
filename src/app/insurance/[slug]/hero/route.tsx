import { ImageResponse } from "next/og";
import "@/lib/insurance/register-all";
import {
  getAllInsuranceArticles,
  getInsuranceArticle,
  INSURANCE_GROUP_COLOR,
} from "@/lib/insurance";
import { createHeroElement, HERO_SIZE } from "@/lib/hero-image";
import { heroFontOptions } from "@/lib/hero-font";

export const runtime = "nodejs";

export function generateStaticParams() {
  return getAllInsuranceArticles().map((a) => ({ slug: a.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = getInsuranceArticle(slug);
  const color = article ? INSURANCE_GROUP_COLOR[article.group] : "blue";

  return new ImageResponse(
    createHeroElement(color, `insurance-${slug}`, article?.group),
    { ...HERO_SIZE, fonts: await heroFontOptions() }
  );
}
