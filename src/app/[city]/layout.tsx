import { getMunicipalityData, getAllMunicipalities } from "@/lib/data";
import { getVacancyData, getVacancySlugs } from "@/lib/vacancy";
import { notFound } from "next/navigation";

/**
 * 点数の基準を持つ自治体と、空き状況だけを持つ自治体の両方を並べる。
 *
 * 空き状況は公表しているが利用調整基準を公表していない自治体（唐津市など）がある。
 * その自治体には `/{city}` のシミュレーターはないが `/{city}/vacancy` はあるので、
 * ここで弾いてしまうと空き状況のページごと404になる。
 */
export function generateStaticParams() {
  const slugs = new Set([...getAllMunicipalities().map((m) => m.slug), ...getVacancySlugs()]);
  return [...slugs].map((city) => ({ city }));
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
  // シミュレーター本体（`/{city}`）は page.tsx 側で改めて点数の基準を見て404にする
  if (!getMunicipalityData(city) && !getVacancyData(city)) notFound();

  return children;
}
