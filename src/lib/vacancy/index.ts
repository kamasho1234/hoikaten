// 保育所等の空き状況データのレジストリと集計ヘルパー
//
// データは scripts/fetch-yokohama-vacancy.ts が公式CSVから生成する。
// 自治体を増やすときは JSON を生成して registry に1行足すだけでよい。

import type {
  AgeSummary,
  AgeValues,
  FacilityWebsite,
  VacancyDataset,
  WardSummary,
} from "./types";
import yokohamaVacancy from "./yokohama.json";
import yokohamaWebsites from "./yokohama-websites.json";

export type { AgeSummary, AgeValues, FacilityWebsite, VacancyDataset, WardSummary };
export type { VacancyFacility } from "./types";

/** 0歳児〜5歳児 */
export const AGE_COUNT = 6;
export const AGE_LABELS = [
  "0歳児",
  "1歳児",
  "2歳児",
  "3歳児",
  "4歳児",
  "5歳児",
] as const;

/**
 * 公式サイトのURLは空き状況とは別ファイルで持つ。
 * 空き状況JSONは fetch-yokohama-vacancy.ts が毎月まるごと上書きするため、
 * 同じファイルに混ぜると自動更新のたびに消えてしまう。
 * ここで施設番号をキーに結合してから配る。
 */
function withWebsites(
  data: VacancyDataset,
  sites: Record<string, { url: string; type: string }>
): VacancyDataset {
  return {
    ...data,
    facilities: data.facilities.map((f) => {
      const site = sites[f.id];
      return site ? { ...f, site: site as FacilityWebsite } : f;
    }),
  };
}

const registry: Record<string, VacancyDataset> = {
  yokohama: withWebsites(
    yokohamaVacancy as unknown as VacancyDataset,
    yokohamaWebsites.sites
  ),
};

export function getVacancyData(slug: string): VacancyDataset | undefined {
  return registry[slug];
}

export function hasVacancyData(slug: string): boolean {
  return slug in registry;
}

export function getVacancySlugs(): string[] {
  return Object.keys(registry);
}

/**
 * 空き1枠あたりの申込数（入所待ち人数 ÷ 受入可能数）。
 *
 * 横浜市の「入所待ち人数」は**園ごとの申請数**で、1人が複数園を希望すると
 * 希望した各園に計上される。したがってこの値は実際の競争倍率ではなく、
 * 「申込がどれだけ集中しているか」の目安である。UI・記事でもそのように説明すること。
 *
 * 受入可能数が0のときは割り算が成立しないため null を返す。
 */
export function calcRatio(waiting: number, vacancy: number): number | null {
  if (vacancy <= 0) return null;
  return waiting / vacancy;
}

/** クラスなし(null)を除いた合計。全クラスなしなら null */
export function sumAges(values: AgeValues): number | null {
  let sum = 0;
  let hasValue = false;
  for (const v of values) {
    if (v === null) continue;
    sum += v;
    hasValue = true;
  }
  return hasValue ? sum : null;
}

/**
 * 年齢を指定すればその年齢の値、null を渡せば全年齢の合計を返す。
 * クラスなしの場合は null。
 */
export function valueAt(values: AgeValues, age: number | null): number | null {
  if (age === null) return sumAges(values);
  return values[age] ?? null;
}

/** 市全体の年齢別サマリー */
export function summarizeByAge(data: VacancyDataset): AgeSummary[] {
  return Array.from({ length: AGE_COUNT }, (_, age) => {
    let vacancy = 0;
    let waiting = 0;
    let enrolled = 0;
    let facilitiesWithVacancy = 0;
    for (const f of data.facilities) {
      vacancy += f.vacancy[age] ?? 0;
      waiting += f.waiting[age] ?? 0;
      enrolled += f.enrolled[age] ?? 0;
      if ((f.vacancy[age] ?? 0) > 0) facilitiesWithVacancy++;
    }
    return {
      age,
      vacancy,
      waiting,
      enrolled,
      ratio: calcRatio(waiting, vacancy),
      facilitiesWithVacancy,
    };
  });
}

/**
 * 区別サマリー。age を指定するとその年齢だけで集計する。
 * 並びは公式CSVの区の出現順（行政区の順）をそのまま使う。
 */
export function summarizeByWard(
  data: VacancyDataset,
  age: number | null = null
): WardSummary[] {
  return data.wards.map((ward, wardIndex) => {
    let facilityCount = 0;
    let vacancy = 0;
    let waiting = 0;
    let facilitiesWithVacancy = 0;
    for (const f of data.facilities) {
      if (f.w !== wardIndex) continue;
      facilityCount++;
      vacancy += valueAt(f.vacancy, age) ?? 0;
      waiting += valueAt(f.waiting, age) ?? 0;
      if ((valueAt(f.vacancy, age) ?? 0) > 0) facilitiesWithVacancy++;
    }
    return {
      ward,
      facilityCount,
      vacancy,
      waiting,
      ratio: calcRatio(waiting, vacancy),
      facilitiesWithVacancy,
    };
  });
}

/** 市全体の合計（全年齢） */
export function totalSummary(data: VacancyDataset) {
  const byAge = summarizeByAge(data);
  const vacancy = byAge.reduce((acc, a) => acc + a.vacancy, 0);
  const waiting = byAge.reduce((acc, a) => acc + a.waiting, 0);
  const facilitiesWithVacancy = data.facilities.filter(
    (f) => (sumAges(f.vacancy) ?? 0) > 0
  ).length;
  return {
    facilityCount: data.facilities.length,
    vacancy,
    waiting,
    ratio: calcRatio(waiting, vacancy),
    facilitiesWithVacancy,
  };
}

/** "2026-08-01" → "2026年8月1日" */
export function formatJapaneseDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  return `${Number(m[1])}年${Number(m[2])}月${Number(m[3])}日`;
}

/**
 * 空き1枠あたりの申込数の表示文字列。10以上は整数に丸める。
 * 「倍」ではなく「件」で表記する（実際の競争倍率ではないため。calcRatio のコメント参照）。
 */
export function formatRatio(ratio: number | null): string {
  if (ratio === null) return "—";
  if (ratio >= 10) return `${Math.round(ratio)}件`;
  return `${ratio.toFixed(1)}件`;
}
