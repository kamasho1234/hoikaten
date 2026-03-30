import { getMunicipalityData, getAllMunicipalities } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllMunicipalities().map((m) => ({ city: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getMunicipalityData(city);
  if (!data) return {};
  return {
    title: `${data.municipality.name}の保育園、何点とれる？｜hoikaten`,
    description: `${data.municipality.name}で保活中の方へ。かんたんな質問に答えるだけで入園点数の目安がわかります。`,
  };
}

export default async function CityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getMunicipalityData(city);
  if (!data) notFound();

  return children;
}
