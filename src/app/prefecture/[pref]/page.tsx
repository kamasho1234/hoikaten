import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllMunicipalities } from "@/lib/data";
import { getArticlesByCity } from "@/lib/articles";
import { RandomAd } from "@/components/random-ad";
import { prefectureMap, prefectureSlugs } from "@/lib/prefecture";
import { breadcrumbList } from "@/lib/jsonld";

export function generateStaticParams() {
  return prefectureSlugs.map((pref) => ({ pref }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pref: string }>;
}): Promise<Metadata> {
  const { pref } = await params;
  const prefName = prefectureMap[pref];
  if (!prefName) return {};

  const municipalities = getAllMunicipalities().filter(
    (m) => m.prefecture === prefName
  );
  const cityNames = municipalities
    .slice(0, 5)
    .map((m) => m.name)
    .join("・");
  const suffix = municipalities.length > 5 ? "など" : "";

  return {
    title: `${prefName}の保育園 入園点数シミュレーター一覧｜hoikaten`,
    description: `${prefName}で対応している保育園入園点数シミュレーターの一覧。${cityNames}${suffix}${municipalities.length}自治体に対応。`,
    alternates: {
      canonical: `https://hoikaten.com/prefecture/${pref}`,
    },
  };
}

export default async function PrefecturePage({
  params,
}: {
  params: Promise<{ pref: string }>;
}) {
  const { pref } = await params;
  const prefName = prefectureMap[pref];
  if (!prefName) notFound();

  const municipalities = getAllMunicipalities().filter(
    (m) => m.prefecture === prefName
  );

  // 各自治体の記事数を取得
  const municipalitiesWithArticleCount = municipalities.map((m) => ({
    ...m,
    articleCount: getArticlesByCity(m.slug).length,
  }));

  const breadcrumbJsonLd = breadcrumbList([
    { name: "ホーム", path: "/" },
    { name: prefName, path: `/prefecture/${pref}` },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* パンくず */}
      <nav className="text-sm text-muted-foreground mb-6">
        <a href="https://hoikaten.com" className="hover:text-primary transition-colors">
          ホーム
        </a>
        <span className="mx-1.5">&gt;</span>
        <span>{prefName}</span>
      </nav>

      {/* ヒーロー */}
      <div className="hero-pattern rounded-2xl py-8 px-4 text-center mb-8 -mx-4 sm:mx-0">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {prefName}の保育園 入園点数シミュレーター
        </h1>
        <p className="text-muted-foreground">
          {prefName}で対応している{municipalitiesWithArticleCount.length}
          自治体のシミュレーター一覧
        </p>
      </div>

      {/* 点数比較ページへの導線（2自治体以上のとき） */}
      {municipalitiesWithArticleCount.length >= 2 && (
        <a
          href={`/compare/${pref}`}
          className="flex items-center justify-between gap-2 p-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors mb-6 group"
        >
          <span className="text-sm font-medium">
            {prefName}の自治体を採点方式・最高点数で比較する
          </span>
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      )}

      {/* 自治体カード一覧 */}
      {municipalitiesWithArticleCount.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            現在{prefName}の対応自治体はありません。順次追加予定です。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {municipalitiesWithArticleCount.map((m) => (
            <a
              key={m.slug}
              href={`https://${m.slug}.hoikaten.com`}
              className="block p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-sm transition-all group"
            >
              <p
                className="font-bold group-hover:text-primary transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {m.name}
              </p>
              {m.articleCount > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  保活記事 {m.articleCount}件
                </p>
              )}
            </a>
          ))}
        </div>
      )}

      <RandomAd />
    </div>
  );
}
