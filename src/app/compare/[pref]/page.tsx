import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllMunicipalities } from "@/lib/data";
import { RandomAd } from "@/components/random-ad";
import { prefectureMap, prefectureSlugs } from "@/lib/prefecture";
import { breadcrumbList } from "@/lib/jsonld";
import { getMunicipalityCompareRow } from "@/lib/compare";
import type { Municipality } from "@/lib/types";

/** 指定県の自治体一覧を取得（2件以上でなければ空配列相当の扱い） */
function municipalitiesOf(prefName: string): Municipality[] {
  return getAllMunicipalities().filter((m) => m.prefecture === prefName);
}

export function generateStaticParams() {
  return prefectureSlugs
    .filter((pref) => municipalitiesOf(prefectureMap[pref]).length >= 2)
    .map((pref) => ({ pref }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pref: string }>;
}): Promise<Metadata> {
  const { pref } = await params;
  const prefName = prefectureMap[pref];
  if (!prefName) return {};

  const municipalities = municipalitiesOf(prefName);
  const cityNames = municipalities
    .slice(0, 5)
    .map((m) => m.name)
    .join("・");
  const suffix = municipalities.length > 5 ? "など" : "";

  return {
    title: `${prefName}の保育園 入園点数を自治体別に比較｜採点方式・最高点数一覧｜hoikaten`,
    description: `${prefName}の保育園入園点数（利用調整指数）を自治体ごとに比較。${cityNames}${suffix}${municipalities.length}自治体の採点方式・最高点数・主な加点項目を一覧でチェックできます。`,
    alternates: {
      canonical: `https://hoikaten.com/compare/${pref}`,
    },
  };
}

export default async function ComparePrefecturePage({
  params,
}: {
  params: Promise<{ pref: string }>;
}) {
  const { pref } = await params;
  const prefName = prefectureMap[pref];
  if (!prefName) notFound();

  const municipalities = municipalitiesOf(prefName);
  // 比較は2件以上で意味を持つ
  if (municipalities.length < 2) notFound();

  const rows = municipalities
    .map((m) => getMunicipalityCompareRow(m))
    .sort((a, b) => a.name.localeCompare(b.name, "ja"));

  // この県に実在する採点方式のみ凡例に表示
  const usedMethods = Array.from(
    new Map(rows.map((r) => [r.scoring.method, r.scoring])).values()
  );

  const breadcrumbJsonLd = breadcrumbList([
    { name: "ホーム", path: "/" },
    { name: "都道府県別の点数比較", path: "/compare" },
    { name: `${prefName}の比較`, path: `/compare/${pref}` },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* パンくず */}
      <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5 flex-wrap">
        <a
          href="https://hoikaten.com"
          className="hover:text-primary transition-colors"
        >
          ホーム
        </a>
        <span>&gt;</span>
        <a href="/compare" className="hover:text-primary transition-colors">
          点数比較
        </a>
        <span>&gt;</span>
        <span>{prefName}</span>
      </nav>

      {/* ヒーロー */}
      <div className="hero-pattern rounded-2xl py-8 px-4 text-center mb-8 -mx-4 sm:mx-0">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {prefName}の保育園 入園点数を自治体別に比較
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {prefName}で対応している{rows.length}
          自治体の採点方式・最高点数・主な加点項目を一覧で比較できます。
          自治体名をタップすると、その自治体の点数シミュレーターに進めます。
        </p>
      </div>

      {/* 比較表 */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-3 px-3 font-bold whitespace-nowrap">
                自治体
              </th>
              <th className="text-left py-3 px-3 font-bold whitespace-nowrap">
                採点方式
              </th>
              <th className="text-right py-3 px-3 font-bold whitespace-nowrap">
                最高点数
              </th>
              <th className="text-left py-3 px-3 font-bold whitespace-nowrap">
                主な加点項目
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.slug}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="py-3 px-3 whitespace-nowrap">
                  <a
                    href={`https://${r.slug}.hoikaten.com`}
                    className="font-bold text-primary hover:underline"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {r.name}
                  </a>
                </td>
                <td className="py-3 px-3 whitespace-nowrap text-muted-foreground">
                  {r.scoring.label}
                </td>
                <td className="py-3 px-3 text-right tabular-nums whitespace-nowrap">
                  {r.maxBasePoints}点
                </td>
                <td className="py-3 px-3">
                  {r.highlights.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {r.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-block text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 採点方式の凡例・解説 */}
      <div className="bg-muted/30 rounded-xl p-4 border mb-6">
        <p className="text-sm font-bold mb-2">採点方式について</p>
        <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
          {usedMethods.map((m) => (
            <li key={m.method}>
              <span className="font-medium text-foreground">{m.label}</span>：
              {m.description}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground leading-relaxed mt-3">
          「最高点数」は就労などの基準指数の満点の目安です。実際の入園の可否は、
          ひとり親・きょうだいの在園などの調整指数を加減した合計点で決まります。
        </p>
      </div>

      {/* CTA */}
      <div className="text-center mb-8">
        <a
          href="/select"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full btn-primary-warm text-primary-foreground font-medium text-base"
        >
          自分の点数を計算する
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <RandomAd />

      {/* 免責 */}
      <div className="mt-8 bg-muted/30 rounded-xl p-4 border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium">免責事項：</span>
          本ページの採点方式・点数は各自治体の公式基準をもとに作成した目安です。
          選考基準は年度・施設により変わることがあるため、最新かつ正確な情報は各自治体の公式窓口・公式サイトで必ずご確認ください。
          当サイトの情報により生じた損害について一切の責任を負いかねます。
        </p>
      </div>
    </div>
  );
}
