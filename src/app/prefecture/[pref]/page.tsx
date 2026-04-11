import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllMunicipalities } from "@/lib/data";
import { getArticlesByCity } from "@/lib/articles";
import { RandomAd } from "@/components/random-ad";

/** 都道府県slug→都道府県名 マッピング */
const prefectureMap: Record<string, string> = {
  hokkaido: "北海道",
  aomori: "青森県",
  iwate: "岩手県",
  miyagi: "宮城県",
  akita: "秋田県",
  yamagata: "山形県",
  fukushima: "福島県",
  ibaraki: "茨城県",
  tochigi: "栃木県",
  gunma: "群馬県",
  saitama: "埼玉県",
  chiba: "千葉県",
  tokyo: "東京都",
  kanagawa: "神奈川県",
  niigata: "新潟県",
  toyama: "富山県",
  ishikawa: "石川県",
  fukui: "福井県",
  yamanashi: "山梨県",
  nagano: "長野県",
  gifu: "岐阜県",
  shizuoka: "静岡県",
  aichi: "愛知県",
  mie: "三重県",
  shiga: "滋賀県",
  kyoto: "京都府",
  osaka: "大阪府",
  hyogo: "兵庫県",
  nara: "奈良県",
  wakayama: "和歌山県",
  tottori: "鳥取県",
  shimane: "島根県",
  okayama: "岡山県",
  hiroshima: "広島県",
  yamaguchi: "山口県",
  tokushima: "徳島県",
  kagawa: "香川県",
  ehime: "愛媛県",
  kochi: "高知県",
  fukuoka: "福岡県",
  saga: "佐賀県",
  nagasaki: "長崎県",
  kumamoto: "熊本県",
  oita: "大分県",
  miyazaki: "宮崎県",
  kagoshima: "鹿児島県",
  okinawa: "沖縄県",
};

const allPrefSlugs = Object.keys(prefectureMap);

export function generateStaticParams() {
  return allPrefSlugs.map((pref) => ({ pref }));
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
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
