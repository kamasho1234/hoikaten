import type { Metadata } from "next";
import { getMunicipalityData } from "@/lib/data";
import { breadcrumbList } from "@/lib/jsonld";
import { prefectureNameToSlug } from "@/lib/prefecture";
import {
  formatJapaneseDate,
  getVacancyData,
  getVacancySlugs,
  hasMetric,
  isOpenSymbol,
  isSymbolBased,
  symbolAt,
  totalSummary,
} from "@/lib/vacancy";
import { RandomAd } from "@/components/random-ad";
import { VacancyList, type VacancyListRow } from "./vacancy-list";

const num = (n: number) => n.toLocaleString("ja-JP");

/** 空き状況を出している自治体を、施設数の多い順に並べて返す */
function collectRows(): VacancyListRow[] {
  const rows: VacancyListRow[] = [];
  for (const slug of getVacancySlugs()) {
    const data = getVacancyData(slug);
    if (!data) continue;
    const total = totalSummary(data);
    const symbolBased = isSymbolBased(data);
    // 点数データ側にしか都道府県を持っていない
    const prefecture = getMunicipalityData(slug)?.municipality.prefecture ?? "その他";
    rows.push({
      slug,
      name: data.municipalityName,
      prefecture,
      prefectureSlug: prefectureNameToSlug(prefecture),
      asOf: data.asOf,
      asOfLabel: formatJapaneseDate(data.asOf),
      facilityCount: total.facilityCount,
      vacancy: total.vacancy,
      symbolBased,
      openFacilities: symbolBased
        ? data.facilities.filter((f) => isOpenSymbol(data, symbolAt(data, f, null))).length
        : 0,
      hasWaiting: hasMetric(data, "waiting"),
      hasEnrolled: hasMetric(data, "enrolled"),
    });
  }
  rows.sort((a, b) => b.facilityCount - a.facilityCount || a.name.localeCompare(b.name, "ja"));
  return rows;
}

export function generateMetadata(): Metadata {
  const rows = collectRows();
  const facilities = rows.reduce((acc, r) => acc + r.facilityCount, 0);
  const title = `保育園の空き状況がわかる自治体一覧（${rows.length}自治体）｜hoikaten`;
  const description = `${rows.length}自治体・${num(facilities)}施設の保育園の空き状況を、公式の発表からそのまま取り込んで年齢別に見られます。${rows
    .slice(0, 6)
    .map((r) => r.name)
    .join("・")}など。市区町村名で検索できます。`;
  return {
    title,
    description,
    alternates: { canonical: "https://hoikaten.com/vacancy" },
    openGraph: {
      title,
      description,
      url: "https://hoikaten.com/vacancy",
      type: "website",
    },
  };
}

export default function VacancyIndexPage() {
  const rows = collectRows();
  const facilities = rows.reduce((acc, r) => acc + r.facilityCount, 0);
  const vacancies = rows.reduce((acc, r) => acc + r.vacancy, 0);
  const withWaiting = rows.filter((r) => r.hasWaiting).length;
  const symbolCities = rows.filter((r) => r.symbolBased).length;
  // 更新の新しい順に少しだけ出す
  const recent = [...rows].sort((a, b) => b.asOf.localeCompare(a.asOf)).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbList([
              { name: "hoikaten", path: "/" },
              { name: "保育園の空き状況", path: "/vacancy" },
            ])
          ),
        }}
      />

      <div className="text-center mb-6">
        <h1 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          保育園の空き状況がわかる自治体一覧
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          自治体が公表している空き状況を、年齢ごとに見やすくまとめています。
          <br className="hidden sm:block" />
          公式の発表そのままで、当サイトで推計した値は入れていません。
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {[
          { label: "自治体", value: num(rows.length) },
          { label: "施設", value: num(facilities) },
          { label: "空き枠の合計", value: num(vacancies) },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border/60 bg-card px-3 py-4 text-center"
          >
            <p className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              {s.value}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <VacancyList rows={rows} />

      <div className="rounded-xl bg-muted/50 px-4 py-3 mb-6">
        <p className="text-xs text-muted-foreground leading-relaxed">
          最近取り込んだのは
          {recent.map((r) => `${r.name}（${r.asOfLabel}時点）`).join("、")}
          です。毎日1回、公式の発表を見に行って新しくなっていれば入れ替えています。
          {withWaiting > 0 && (
            <>
              {" "}
              このうち{withWaiting}自治体は、申込者数や入所待ちの人数もあわせて見られます。
            </>
          )}
        </p>
      </div>

      <div className="rounded-xl border border-border/60 bg-card px-4 py-4 text-xs text-muted-foreground leading-relaxed space-y-2">
        <p>
          空き数は自治体によって数え方が違います。「その時点の空き」を出すところもあれば、
          「翌月入所ぶんの受入予定数」を出すところもあるため、自治体ごとのページで注記もあわせてご確認ください。
        </p>
        {symbolCities > 0 && (
          <p>
            {symbolCities}自治体は空きを人数ではなく記号（○や△など）で公表しています。当サイトでも記号のまま載せていて、
            上の「空き枠の合計」にはこれらの自治体ぶんは入っていません。記号の意味は自治体ごとのページに凡例があります。
          </p>
        )}
        <p>
          空きが0でも、退園や辞退で入園できることがあります。申し込みの可否は必ずお住まいの自治体にご確認ください。
        </p>
      </div>

      <RandomAd />
    </div>
  );
}
