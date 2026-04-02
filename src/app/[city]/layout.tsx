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
    title: `${data.municipality.name}の保育園 点数シミュレーター｜入園点数を無料で自動計算【hoikaten】`,
    description: `${data.municipality.name}の保育園入園点数を無料でシミュレーション。基本指数・調整指数を自動計算し、「有利」「厳しい」の評価とアドバイスも。令和7〜8年度の公式基準に対応。`,
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
