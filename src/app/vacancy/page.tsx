import type { Metadata } from "next";
import { getMunicipalityData } from "@/lib/data";
import { breadcrumbList } from "@/lib/jsonld";
import { prefectureNameToSlug } from "@/lib/prefecture";
import {
  formatJapaneseDate,
  getVacancyData,
  getVacancySlugs,
  hasMetric,
  totalSummary,
  type VacancyDataset,
} from "@/lib/vacancy";
import { RandomAd } from "@/components/random-ad";

const num = (n: number) => n.toLocaleString("ja-JP");

type Row = {
  slug: string;
  name: string;
  prefecture: string;
  data: VacancyDataset;
  facilityCount: number;
  vacancy: number;
  hasWaiting: boolean;
  hasEnrolled: boolean;
};

/** 空き状況を出している自治体を、都道府県ごとにまとめて返す */
function collectRows(): { prefectures: string[]; byPrefecture: Record<string, Row[]> } {
  const rows: Row[] = [];
  for (const slug of getVacancySlugs()) {
    const data = getVacancyData(slug);
    if (!data) continue;
    const total = totalSummary(data);
    rows.push({
      slug,
      name: data.municipalityName,
      // 点数データ側にしか都道府県を持っていない
      prefecture: getMunicipalityData(slug)?.municipality.prefecture ?? "その他",
      data,
      facilityCount: total.facilityCount,
      vacancy: total.vacancy,
      hasWaiting: hasMetric(data, "waiting"),
      hasEnrolled: hasMetric(data, "enrolled"),
    });
  }

  const byPrefecture: Record<string, Row[]> = {};
  for (const row of rows) {
    (byPrefecture[row.prefecture] ??= []).push(row);
  }
  for (const list of Object.values(byPrefecture)) {
    // 施設数の多い順。同数なら名前順
    list.sort((a, b) => b.facilityCount - a.facilityCount || a.name.localeCompare(b.name, "ja"));
  }
  const prefectures = Object.keys(byPrefecture).sort(
    (a, b) => byPrefecture[b].length - byPrefecture[a].length || a.localeCompare(b, "ja")
  );
  return { prefectures, byPrefecture };
}

export function generateMetadata(): Metadata {
  const { prefectures, byPrefecture } = collectRows();
  const rows = prefectures.flatMap((p) => byPrefecture[p]);
  const facilities = rows.reduce((acc, r) => acc + r.facilityCount, 0);
  const title = `保育園の空き状況がわかる自治体一覧（${rows.length}自治体）｜hoikaten`;
  const description = `${rows.length}自治体・${num(facilities)}施設の保育園の空き状況を、公式の発表からそのまま取り込んで年齢別に見られます。${rows
    .slice(0, 6)
    .map((r) => r.name)
    .join("・")}など。`;
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
  const { prefectures, byPrefecture } = collectRows();
  const rows = prefectures.flatMap((p) => byPrefecture[p]);
  const facilities = rows.reduce((acc, r) => acc + r.facilityCount, 0);
  const vacancies = rows.reduce((acc, r) => acc + r.vacancy, 0);
  const withWaiting = rows.filter((r) => r.hasWaiting).length;
  // 更新の新しい順に少しだけ出す
  const recent = [...rows].sort((a, b) => b.data.asOf.localeCompare(a.data.asOf)).slice(0, 3);

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

      <div className="text-center mb-8">
        <h1
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          保育園の空き状況がわかる自治体一覧
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          自治体が公表している空き数を、年齢ごとに見やすくまとめています。
          <br className="hidden sm:block" />
          数字はすべて公式の発表そのままで、当サイトで推計した値は入れていません。
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8">
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

      <div className="rounded-xl bg-muted/50 px-4 py-3 mb-8">
        <p className="text-xs text-muted-foreground leading-relaxed">
          最近取り込んだのは{recent.map((r) => `${r.name}（${formatJapaneseDate(r.data.asOf)}時点）`).join("、")}
          です。毎日1回、公式の発表を見に行って新しくなっていれば入れ替えています。
          {withWaiting > 0 && (
            <>
              {" "}
              このうち{withWaiting}自治体は、申込者数や入所待ちの人数もあわせて見られます。
            </>
          )}
        </p>
      </div>

      {prefectures.map((pref) => {
        const list = byPrefecture[pref];
        const prefSlug = prefectureNameToSlug(pref);
        return (
          <section key={pref} className="mb-8">
            <div className="flex items-baseline justify-between mb-3">
              <h2
                className="text-sm font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {pref}
                <span className="text-xs text-muted-foreground font-normal ml-2">
                  {list.length}自治体
                </span>
              </h2>
              {prefSlug && (
                <a
                  href={`https://hoikaten.com/prefecture/${prefSlug}`}
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
                >
                  {pref}の点数を調べる
                </a>
              )}
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((row) => (
                <a
                  key={row.slug}
                  href={`https://${row.slug}.hoikaten.com/vacancy`}
                  className="block rounded-xl border border-border/60 bg-card px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-sm">{row.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {formatJapaneseDate(row.data.asOf)}時点
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {num(row.facilityCount)}施設 ／ 空き{num(row.vacancy)}
                  </p>
                  {(row.hasWaiting || row.hasEnrolled) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {row.hasWaiting && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          申込・入所待ちも
                        </span>
                      )}
                      {row.hasEnrolled && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          在籍数も
                        </span>
                      )}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </section>
        );
      })}

      <div className="rounded-xl border border-border/60 bg-card px-4 py-4 text-xs text-muted-foreground leading-relaxed space-y-2">
        <p>
          空き数は自治体によって数え方が違います。「その時点の空き」を出すところもあれば、
          「翌月入所ぶんの受入予定数」を出すところもあるため、自治体ごとのページで注記もあわせてご確認ください。
        </p>
        <p>
          空きが0でも、退園や辞退で入園できることがあります。申し込みの可否は必ずお住まいの自治体にご確認ください。
        </p>
      </div>

      <RandomAd />
    </div>
  );
}
