import { ImageResponse } from "next/og";
import "@/lib/documents/register-all";
import { getAllDocuments, getDocument, GROUP_COLOR } from "@/lib/documents";
import { createHeroElement, HERO_SIZE } from "@/lib/hero-image";

export const runtime = "nodejs";

export function generateStaticParams() {
  return getAllDocuments().map((g) => ({ slug: g.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const guide = getDocument(slug);
  const color = guide ? GROUP_COLOR[guide.group] : "blue";

  return new ImageResponse(createHeroElement(color, `documents-${slug}`), {
    ...HERO_SIZE,
  });
}
