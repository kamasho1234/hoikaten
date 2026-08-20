// 保育所等の空き状況データのレジストリと集計ヘルパー
//
// データは scripts/fetch-{slug}-vacancy.ts が公式データから生成する。
// 自治体を増やすときは JSON を生成して registry に1行足すだけでよい。
//
// 自治体によって公開されている指標が違う（横浜市は入所待ちまであるが目黒区は空き数だけ）。
// 集計ヘルパーは metrics を見て、持っていない指標には null を返す。

import type {
  AgeSummary,
  AgeValues,
  FacilityWebsite,
  GroupSummary,
  VacancyDataset,
  VacancyMetric,
} from "./types";
import yokohamaVacancy from "./yokohama.json";
import yokohamaWebsites from "./yokohama-websites.json";
import meguroVacancy from "./meguro.json";
import meguroWebsites from "./meguro-websites.json";
import kawasakiVacancy from "./kawasaki.json";
import kawasakiWebsites from "./kawasaki-websites.json";
import saitamaVacancy from "./saitama.json";
import saitamaWebsites from "./saitama-websites.json";
import otaVacancy from "./ota.json";
import otaWebsites from "./ota-websites.json";
import adachiVacancy from "./adachi.json";
import adachiWebsites from "./adachi-websites.json";
import edogawaVacancy from "./edogawa.json";
import nerimaVacancy from "./nerima.json";
import nerimaWebsites from "./nerima-websites.json";
import edogawaWebsites from "./edogawa-websites.json";
import setagayaVacancy from "./setagaya.json";
import setagayaWebsites from "./setagaya-websites.json";
import suginamiVacancy from "./suginami.json";
import suginamiWebsites from "./suginami-websites.json";
import katsushikaVacancy from "./katsushika.json";
import katsushikaWebsites from "./katsushika-websites.json";
// 品川区は施設ごとのWebページを持たず（一覧はPDFのみ・sitemap.xml も無い）、
// 確認できるURLが無いので施設リンクを付けていない
import shinagawaVacancy from "./shinagawa.json";
// 江東区の施設リンクは区が出している園ごとの紹介PDF（施設のWebページは無い）
import kotoVacancy from "./koto.json";
import kotoWebsites from "./koto-websites.json";
// 中野区の施設リンクは区の一覧が案内している園の公式サイト
import nakanoVacancy from "./nakano.json";
import nakanoWebsites from "./nakano-websites.json";
// 新宿区は施設サイトのURLを調査中のため、いまは空き状況だけを登録している
import shinjukuVacancy from "./shinjuku.json";
// 豊島区は施設サイトのURLを調査中のため、いまは空き状況だけを登録している
import toshimaVacancy from "./toshima.json";
// 文京区は施設サイトのURLを調査中のため、いまは空き状況だけを登録している
import bunkyoVacancy from "./bunkyo.json";
// 台東区も施設サイトのURLを調査中
import taitoVacancy from "./taito.json";
// 千代田区も施設サイトのURLを調査中
import chiyodaVacancy from "./chiyoda.json";
// 港区も施設サイトのURLを調査中
import minatoVacancy from "./minato.json";
// 板橋区も施設サイトのURLを調査中
import itabashiVacancy from "./itabashi.json";
// 墨田区も施設サイトのURLを調査中
import sumidaVacancy from "./sumida.json";
// 北区も施設サイトのURLを調査中
import kitaVacancy from "./kita.json";
// 大阪市も施設サイトのURLを調査中
import osakaVacancy from "./osaka.json";
// 広島市も施設サイトのURLを調査中
import hiroshimaVacancy from "./hiroshima.json";
// 仙台市も施設サイトのURLを調査中
import sendaiVacancy from "./sendai.json";
// 堺市も施設サイトのURLを調査中
import sakaiVacancy from "./sakai.json";
// 相模原市も施設サイトのURLを調査中
import sagamiharaVacancy from "./sagamihara.json";
// 八王子市も施設サイトのURLを調査中
import hachiojiVacancy from "./hachioji.json";
// 船橋市も施設サイトのURLを調査中
import funabashiVacancy from "./funabashi.json";
// 川口市・市川市も施設サイトのURLを調査中
import kawaguchiVacancy from "./kawaguchi.json";
import ichikawaVacancy from "./ichikawa.json";
// 町田市も施設サイトのURLを調査中
import machidaVacancy from "./machida.json";
// 柏市も施設サイトのURLを調査中
import kashiwaVacancy from "./kashiwa.json";
// 西東京市も施設サイトのURLを調査中
import nishitokyoVacancy from "./nishitokyo.json";
// 三鷹市も施設サイトのURLを調査中
import mitakaVacancy from "./mitaka.json";
// 調布市も施設サイトのURLを調査中
import chofuVacancy from "./chofu.json";
// 府中市も施設サイトのURLを調査中
import fuchuVacancy from "./fuchu.json";
// 大和市も施設サイトのURLを調査中
import yamatoVacancy from "./yamato.json";
// 浦安市も施設サイトのURLを調査中
import urayasuVacancy from "./urayasu.json";
// 小平市も施設サイトのURLを調査中
import kodairaVacancy from "./kodaira.json";

export type {
  AgeSummary,
  AgeValues,
  FacilityWebsite,
  GroupSummary,
  VacancyDataset,
  VacancyMetric,
};
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
 * 空き状況JSONは取り込みスクリプトが毎回まるごと上書きするため、
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
  meguro: withWebsites(
    meguroVacancy as unknown as VacancyDataset,
    meguroWebsites.sites
  ),
  kawasaki: withWebsites(
    kawasakiVacancy as unknown as VacancyDataset,
    kawasakiWebsites.sites
  ),
  saitama: withWebsites(
    saitamaVacancy as unknown as VacancyDataset,
    saitamaWebsites.sites
  ),
  ota: withWebsites(otaVacancy as unknown as VacancyDataset, otaWebsites.sites),
  adachi: withWebsites(adachiVacancy as unknown as VacancyDataset, adachiWebsites.sites),
  edogawa: withWebsites(edogawaVacancy as unknown as VacancyDataset, edogawaWebsites.sites),
  nerima: withWebsites(nerimaVacancy as unknown as VacancyDataset, nerimaWebsites.sites),
  setagaya: withWebsites(setagayaVacancy as unknown as VacancyDataset, setagayaWebsites.sites),
  suginami: withWebsites(suginamiVacancy as unknown as VacancyDataset, suginamiWebsites.sites),
  katsushika: withWebsites(katsushikaVacancy as unknown as VacancyDataset, katsushikaWebsites.sites),
  shinagawa: shinagawaVacancy as unknown as VacancyDataset,
  koto: withWebsites(kotoVacancy as unknown as VacancyDataset, kotoWebsites.sites),
  nakano: withWebsites(nakanoVacancy as unknown as VacancyDataset, nakanoWebsites.sites),
  shinjuku: shinjukuVacancy as unknown as VacancyDataset,
  toshima: toshimaVacancy as unknown as VacancyDataset,
  bunkyo: bunkyoVacancy as unknown as VacancyDataset,
  taito: taitoVacancy as unknown as VacancyDataset,
  chiyoda: chiyodaVacancy as unknown as VacancyDataset,
  minato: minatoVacancy as unknown as VacancyDataset,
  itabashi: itabashiVacancy as unknown as VacancyDataset,
  sumida: sumidaVacancy as unknown as VacancyDataset,
  kita: kitaVacancy as unknown as VacancyDataset,
  osaka: osakaVacancy as unknown as VacancyDataset,
  hiroshima: hiroshimaVacancy as unknown as VacancyDataset,
  sendai: sendaiVacancy as unknown as VacancyDataset,
  sakai: sakaiVacancy as unknown as VacancyDataset,
  sagamihara: sagamiharaVacancy as unknown as VacancyDataset,
  hachioji: hachiojiVacancy as unknown as VacancyDataset,
  funabashi: funabashiVacancy as unknown as VacancyDataset,
  kawaguchi: kawaguchiVacancy as unknown as VacancyDataset,
  ichikawa: ichikawaVacancy as unknown as VacancyDataset,
  machida: machidaVacancy as unknown as VacancyDataset,
  kashiwa: kashiwaVacancy as unknown as VacancyDataset,
  nishitokyo: nishitokyoVacancy as unknown as VacancyDataset,
  mitaka: mitakaVacancy as unknown as VacancyDataset,
  chofu: chofuVacancy as unknown as VacancyDataset,
  fuchu: fuchuVacancy as unknown as VacancyDataset,
  yamato: yamatoVacancy as unknown as VacancyDataset,
  urayasu: urayasuVacancy as unknown as VacancyDataset,
  kodaira: kodairaVacancy as unknown as VacancyDataset,
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

export function hasMetric(data: VacancyDataset, metric: VacancyMetric): boolean {
  return data.metrics.includes(metric);
}

/**
 * 空き1枠あたりの申込数（入所待ち人数 ÷ 受入可能数）。
 *
 * 横浜市の「入所待ち人数」は**園ごとの申請数**で、1人が複数園を希望すると
 * 希望した各園に計上される。したがってこの値は実際の競争倍率ではなく、
 * 「申込がどれだけ集中しているか」の目安である。UI・記事でもそのように説明すること。
 *
 * 受入可能数が0のとき、または入所待ちを公開していない自治体では null を返す。
 */
export function calcRatio(waiting: number | null, vacancy: number): number | null {
  if (waiting === null) return null;
  if (vacancy <= 0) return null;
  return waiting / vacancy;
}

/** クラスなし(null)を除いた合計。全クラスなしなら null */
export function sumAges(values: AgeValues | undefined): number | null {
  if (!values) return null;
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
export function valueAt(
  values: AgeValues | undefined,
  age: number | null
): number | null {
  if (!values) return null;
  if (age === null) return sumAges(values);
  return values[age] ?? null;
}

/**
 * その施設の空き数。年齢別に分かれていない施設（目黒区の家庭福祉員）は、
 * 全年齢を見るときだけ合計値を返し、年齢を指定されたときは null を返す。
 */
export function facilityVacancy(
  f: { vacancy: AgeValues; vacancyTotal?: number },
  age: number | null
): number | null {
  const v = valueAt(f.vacancy, age);
  if (v !== null) return v;
  if (age === null && f.vacancyTotal !== undefined) return f.vacancyTotal;
  return null;
}

/** 市全体の年齢別サマリー */
export function summarizeByAge(data: VacancyDataset): AgeSummary[] {
  const hasWaiting = hasMetric(data, "waiting");
  const hasEnrolled = hasMetric(data, "enrolled");
  return Array.from({ length: AGE_COUNT }, (_, age) => {
    let vacancy = 0;
    let waiting = 0;
    let enrolled = 0;
    let facilitiesWithVacancy = 0;
    for (const f of data.facilities) {
      vacancy += f.vacancy[age] ?? 0;
      waiting += f.waiting?.[age] ?? 0;
      enrolled += f.enrolled?.[age] ?? 0;
      if ((f.vacancy[age] ?? 0) > 0) facilitiesWithVacancy++;
    }
    return {
      age,
      vacancy,
      waiting: hasWaiting ? waiting : null,
      enrolled: hasEnrolled ? enrolled : null,
      ratio: hasWaiting ? calcRatio(waiting, vacancy) : null,
      facilitiesWithVacancy,
    };
  });
}

/**
 * 施設をグループごとに集計する共通処理。
 * groupOf が null を返した施設は、どのグループにも入れない。
 */
function summarizeBy(
  data: VacancyDataset,
  names: string[],
  groupOf: (f: VacancyDataset["facilities"][number]) => number | null | undefined,
  age: number | null
): GroupSummary[] {
  const hasWaiting = hasMetric(data, "waiting");
  return names.map((name, index) => {
    let facilityCount = 0;
    let vacancy = 0;
    let waiting = 0;
    let facilitiesWithVacancy = 0;
    for (const f of data.facilities) {
      if (groupOf(f) !== index) continue;
      facilityCount++;
      const v = facilityVacancy(f, age) ?? 0;
      vacancy += v;
      waiting += valueAt(f.waiting, age) ?? 0;
      if (v > 0) facilitiesWithVacancy++;
    }
    return {
      name,
      facilityCount,
      vacancy,
      waiting: hasWaiting ? waiting : null,
      ratio: hasWaiting ? calcRatio(waiting, vacancy) : null,
      facilitiesWithVacancy,
    };
  });
}

/**
 * 区別サマリー。age を指定するとその年齢だけで集計する。
 * 並びは公式データの区の出現順（行政区の順）をそのまま使う。
 */
export function summarizeByWard(
  data: VacancyDataset,
  age: number | null = null
): GroupSummary[] {
  return summarizeBy(data, data.wards, (f) => f.w, age);
}

/** 施設類型別サマリー。類型を公開していない自治体では空配列 */
export function summarizeByCategory(
  data: VacancyDataset,
  age: number | null = null
): GroupSummary[] {
  return summarizeBy(data, data.categories ?? [], (f) => f.c, age);
}

/** 市全体の合計（全年齢） */
export function totalSummary(data: VacancyDataset) {
  const hasWaiting = hasMetric(data, "waiting");
  const byAge = summarizeByAge(data);
  // 年齢別に分かれていない施設（家庭福祉員など）の分を足す
  const mergedOnly = data.facilities.reduce(
    (acc, f) => acc + (sumAges(f.vacancy) === null ? (f.vacancyTotal ?? 0) : 0),
    0
  );
  const vacancy = byAge.reduce((acc, a) => acc + a.vacancy, 0) + mergedOnly;
  const waiting = byAge.reduce((acc, a) => acc + (a.waiting ?? 0), 0);
  const facilitiesWithVacancy = data.facilities.filter(
    (f) => (facilityVacancy(f, null) ?? 0) > 0
  ).length;
  return {
    facilityCount: data.facilities.length,
    vacancy,
    waiting: hasWaiting ? waiting : null,
    ratio: hasWaiting ? calcRatio(waiting, vacancy) : null,
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
