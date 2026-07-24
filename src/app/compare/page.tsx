import type { Metadata } from "next";
import { getAllMunicipalities } from "@/lib/data";
import { RandomAd } from "@/components/random-ad";
import { prefectureMap, prefectureSlugs } from "@/lib/prefecture";
import { breadcrumbList } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "都道府県別 保育園入園点数の比較｜自治体ごとの採点方式・最高点数｜hoikaten",
  description:
    "同じ都道府県内でも保育園の入園点数（利用調整指数）の採点方式や最高点数は自治体ごとに異なります。都道府県を選んで、自治体別の点数のしくみを一覧で比較できます。",
  alternates: {
    canonical: "https://hoikaten.com/compare",
  },
};

export default function CompareIndexPage() {
  const municipalities = getAllMunicipalities();

  // 県ごとの対応自治体数を集計し、2件以上の県のみ比較対象とする
  const rows = prefectureSlugs
    .map((slug) => {
      const prefName = prefectureMap[slug];
      const count = municipalities.filter(
        (m) => m.prefecture === prefName
      ).length;
      return { slug, prefName, count };
    })
    .filter((r) => r.count >= 2)
    .sort((a, b) => b.count - a.count);

  const breadcrumbJsonLd = breadcrumbList([
    { name: "ホーム", path: "/" },
    { name: "都道府県別の点数比較", path: "/compare" },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* パンくず */}
      <nav className="text-sm text-muted-foreground mb-6">
        <a
          href="https://hoikaten.com"
          className="hover:text-primary transition-colors"
        >
          ホーム
        </a>
        <span className="mx-1.5">&gt;</span>
        <span>都道府県別の点数比較</span>
      </nav>

      {/* ヒーロー */}
      <div className="hero-pattern rounded-2xl py-8 px-4 text-center mb-8 -mx-4 sm:mx-0">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          都道府県別 保育園入園点数の比較
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          同じ県でも、点数の採点方式（加算・低い方を採用・父母平均）や最高点数は自治体ごとに異なります。
          気になる都道府県を選んで、自治体別に比較してみましょう。
        </p>
      </div>

      {/* 県カード一覧 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rows.map((r) => (
          <a
            key={r.slug}
            href={`/compare/${r.slug}`}
            className="block p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-sm transition-all group"
          >
            <p
              className="font-bold group-hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {r.prefName}の点数を比較
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {r.count}自治体を一覧比較
            </p>
          </a>
        ))}
      </div>

      <div className="mt-8">
        <RandomAd />
      </div>
    </div>
  );
}
