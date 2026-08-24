// 保育所等の空き状況データのレジストリと集計ヘルパー
//
// データは scripts/fetch-{slug}-vacancy.ts が公式データから生成する。
// 自治体を増やすときは JSON を生成して registry に1行足すだけでよい。
//
// 自治体によって公開されている指標が違う（横浜市は入所待ちまであるが目黒区は空き数だけ）。
// 集計ヘルパーは metrics を見て、持っていない指標には null を返す。

import type {
  AgeSummary,
  AgeSymbols,
  AgeValues,
  FacilityWebsite,
  GroupSummary,
  SymbolLegend,
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
// 日野市も施設サイトのURLを調査中
import hinoVacancy from "./hino.json";
// 立川市も施設サイトのURLを調査中
import tachikawaVacancy from "./tachikawa.json";
import musashinoVacancy from "./musashino.json";
import kokubunjiVacancy from "./kokubunji.json";
import koganeiVacancy from "./koganei.json";
import higashimurayamaVacancy from "./higashimurayama.json";
import tamaVacancy from "./tama.json";
import kiyoseVacancy from "./kiyose.json";
import higashikurumeVacancy from "./higashikurume.json";
import komaeVacancy from "./komae.json";
import inagiVacancy from "./inagi.json";
import kunitachiVacancy from "./kunitachi.json";
import akishimaVacancy from "./akishima.json";
import yokosukaVacancy from "./yokosuka.json";
import ageoVacancy from "./ageo.json";
import matsuyamaVacancy from "./matsuyama.json";
import narashinoVacancy from "./narashino.json";
import kasukabeVacancy from "./kasukabe.json";
import fujisawaVacancy from "./fujisawa.json";
import nagareyamaVacancy from "./nagareyama.json";
import koshigayaVacancy from "./koshigaya.json";
import mitoVacancy from "./mito.json";
import gifuVacancy from "./gifu.json";
import tokorozawaVacancy from "./tokorozawa.json";
import chigasakiVacancy from "./chigasaki.json";
import yachiyoVacancy from "./yachiyo.json";
import himejiVacancy from "./himeji.json";
import chibaVacancy from "./chiba.json";
import kawagoeVacancy from "./kawagoe.json";
import nishinomiyaVacancy from "./nishinomiya.json";
import naraVacancy from "./nara.json";
import toyonakaVacancy from "./toyonaka.json";
import akashiVacancy from "./akashi.json";
import niigataVacancy from "./niigata.json";
import kobeVacancy from "./kobe.json";
import kyotoVacancy from "./kyoto.json";
import kagoshimaVacancy from "./kagoshima.json";
import takamatsuVacancy from "./takamatsu.json";
import nagasakiVacancy from "./nagasaki.json";
import fukuyamaVacancy from "./fukuyama.json";
import miyazakiVacancy from "./miyazaki.json";
import nahaVacancy from "./naha.json";
import maebashiVacancy from "./maebashi.json";
import yokkaichiVacancy from "./yokkaichi.json";
import kurumeVacancy from "./kurume.json";
import naganoVacancy from "./nagano.json";
import kochiVacancy from "./kochi.json";
import koriyamaVacancy from "./koriyama.json";
import akitaVacancy from "./akita.json";
import fukuokaVacancy from "./fukuoka.json";
import shizuokaVacancy from "./shizuoka.json";
import shibuyaVacancy from "./shibuya.json";
import chuoVacancy from "./chuo.json";
import hiratsukaVacancy from "./hiratsuka.json";
import hirakataVacancy from "./hirakata.json";
import ibarakiVacancy from "./ibaraki.json";
import takarazukaVacancy from "./takarazuka.json";
import kamakuraVacancy from "./kamakura.json";
import kakogawaVacancy from "./kakogawa.json";
import wakayamaVacancy from "./wakayama.json";
import shimonosekiVacancy from "./shimonoseki.json";
import asahikawaVacancy from "./asahikawa.json";
import fujiVacancy from "./fuji.json";
import kumagayaVacancy from "./kumagaya.json";
import ujiVacancy from "./uji.json";
import kawanishiVacancy from "./kawanishi.json";
import kisarazuVacancy from "./kisarazu.json";
import anjoVacancy from "./anjo.json";
import kureVacancy from "./kure.json";
import tsuVacancy from "./tsu.json";
import aomoriVacancy from "./aomori.json";
import hachinoheVacancy from "./hachinohe.json";
import obihiroVacancy from "./obihiro.json";
import iwataVacancy from "./iwata.json";
import komakiVacancy from "./komaki.json";
import abikoVacancy from "./abiko.json";
import inazawaVacancy from "./inazawa.json";
import fukayaVacancy from "./fukaya.json";
import izumiVacancy from "./izumi.json";
import todaVacancy from "./toda.json";
import irumaVacancy from "./iruma.json";
import tsukubaVacancy from "./tsukuba.json";
import utsunomiyaVacancy from "./utsunomiya.json";
import hitachiVacancy from "./hitachi.json";
import oyamaVacancy from "./oyama.json";
import tomakomaiVacancy from "./tomakomai.json";
import sagaVacancy from "./saga.json";
import iizukaVacancy from "./iizuka.json";
import ebinaVacancy from "./ebina.json";
import isesakiVacancy from "./isesaki.json";
import yamaguchiVacancy from "./yamaguchi.json";
import saseboVacancy from "./sasebo.json";
import sokaVacancy from "./soka.json";

export type {
  AgeSummary,
  AgeSymbols,
  AgeValues,
  FacilityWebsite,
  GroupSummary,
  SymbolLegend,
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
  hino: hinoVacancy as unknown as VacancyDataset,
  tachikawa: tachikawaVacancy as unknown as VacancyDataset,
  musashino: musashinoVacancy as unknown as VacancyDataset,
  kokubunji: kokubunjiVacancy as unknown as VacancyDataset,
  koganei: koganeiVacancy as unknown as VacancyDataset,
  higashimurayama: higashimurayamaVacancy as unknown as VacancyDataset,
  tama: tamaVacancy as unknown as VacancyDataset,
  kiyose: kiyoseVacancy as unknown as VacancyDataset,
  higashikurume: higashikurumeVacancy as unknown as VacancyDataset,
  komae: komaeVacancy as unknown as VacancyDataset,
  inagi: inagiVacancy as unknown as VacancyDataset,
  kunitachi: kunitachiVacancy as unknown as VacancyDataset,
  akishima: akishimaVacancy as unknown as VacancyDataset,
  yokosuka: yokosukaVacancy as unknown as VacancyDataset,
  ageo: ageoVacancy as unknown as VacancyDataset,
  matsuyama: matsuyamaVacancy as unknown as VacancyDataset,
  narashino: narashinoVacancy as unknown as VacancyDataset,
  kasukabe: kasukabeVacancy as unknown as VacancyDataset,
  fujisawa: fujisawaVacancy as unknown as VacancyDataset,
  nagareyama: nagareyamaVacancy as unknown as VacancyDataset,
  koshigaya: koshigayaVacancy as unknown as VacancyDataset,
  mito: mitoVacancy as unknown as VacancyDataset,
  gifu: gifuVacancy as unknown as VacancyDataset,
  tokorozawa: tokorozawaVacancy as unknown as VacancyDataset,
  chigasaki: chigasakiVacancy as unknown as VacancyDataset,
  yachiyo: yachiyoVacancy as unknown as VacancyDataset,
  himeji: himejiVacancy as unknown as VacancyDataset,
  chiba: chibaVacancy as unknown as VacancyDataset,
  kawagoe: kawagoeVacancy as unknown as VacancyDataset,
  nishinomiya: nishinomiyaVacancy as unknown as VacancyDataset,
  nara: naraVacancy as unknown as VacancyDataset,
  toyonaka: toyonakaVacancy as unknown as VacancyDataset,
  akashi: akashiVacancy as unknown as VacancyDataset,
  niigata: niigataVacancy as unknown as VacancyDataset,
  kobe: kobeVacancy as unknown as VacancyDataset,
  kyoto: kyotoVacancy as unknown as VacancyDataset,
  kagoshima: kagoshimaVacancy as unknown as VacancyDataset,
  takamatsu: takamatsuVacancy as unknown as VacancyDataset,
  nagasaki: nagasakiVacancy as unknown as VacancyDataset,
  fukuyama: fukuyamaVacancy as unknown as VacancyDataset,
  miyazaki: miyazakiVacancy as unknown as VacancyDataset,
  naha: nahaVacancy as unknown as VacancyDataset,
  maebashi: maebashiVacancy as unknown as VacancyDataset,
  yokkaichi: yokkaichiVacancy as unknown as VacancyDataset,
  kurume: kurumeVacancy as unknown as VacancyDataset,
  nagano: naganoVacancy as unknown as VacancyDataset,
  kochi: kochiVacancy as unknown as VacancyDataset,
  koriyama: koriyamaVacancy as unknown as VacancyDataset,
  akita: akitaVacancy as unknown as VacancyDataset,
  fukuoka: fukuokaVacancy as unknown as VacancyDataset,
  shizuoka: shizuokaVacancy as unknown as VacancyDataset,
  shibuya: shibuyaVacancy as unknown as VacancyDataset,
  chuo: chuoVacancy as unknown as VacancyDataset,
  hiratsuka: hiratsukaVacancy as unknown as VacancyDataset,
  hirakata: hirakataVacancy as unknown as VacancyDataset,
  ibaraki: ibarakiVacancy as unknown as VacancyDataset,
  takarazuka: takarazukaVacancy as unknown as VacancyDataset,
  kamakura: kamakuraVacancy as unknown as VacancyDataset,
  kakogawa: kakogawaVacancy as unknown as VacancyDataset,
  wakayama: wakayamaVacancy as unknown as VacancyDataset,
  shimonoseki: shimonosekiVacancy as unknown as VacancyDataset,
  asahikawa: asahikawaVacancy as unknown as VacancyDataset,
  fuji: fujiVacancy as unknown as VacancyDataset,
  kumagaya: kumagayaVacancy as unknown as VacancyDataset,
  uji: ujiVacancy as unknown as VacancyDataset,
  kawanishi: kawanishiVacancy as unknown as VacancyDataset,
  kisarazu: kisarazuVacancy as unknown as VacancyDataset,
  anjo: anjoVacancy as unknown as VacancyDataset,
  kure: kureVacancy as unknown as VacancyDataset,
  tsu: tsuVacancy as unknown as VacancyDataset,
  aomori: aomoriVacancy as unknown as VacancyDataset,
  hachinohe: hachinoheVacancy as unknown as VacancyDataset,
  obihiro: obihiroVacancy as unknown as VacancyDataset,
  iwata: iwataVacancy as unknown as VacancyDataset,
  komaki: komakiVacancy as unknown as VacancyDataset,
  abiko: abikoVacancy as unknown as VacancyDataset,
  inazawa: inazawaVacancy as unknown as VacancyDataset,
  fukaya: fukayaVacancy as unknown as VacancyDataset,
  izumi: izumiVacancy as unknown as VacancyDataset,
  toda: todaVacancy as unknown as VacancyDataset,
  iruma: irumaVacancy as unknown as VacancyDataset,
  tsukuba: tsukubaVacancy as unknown as VacancyDataset,
  utsunomiya: utsunomiyaVacancy as unknown as VacancyDataset,
  hitachi: hitachiVacancy as unknown as VacancyDataset,
  oyama: oyamaVacancy as unknown as VacancyDataset,
  tomakomai: tomakomaiVacancy as unknown as VacancyDataset,
  saga: sagaVacancy as unknown as VacancyDataset,
  iizuka: iizukaVacancy as unknown as VacancyDataset,
  ebina: ebinaVacancy as unknown as VacancyDataset,
  isesaki: isesakiVacancy as unknown as VacancyDataset,
  yamaguchi: yamaguchiVacancy as unknown as VacancyDataset,
  sasebo: saseboVacancy as unknown as VacancyDataset,
  soka: sokaVacancy as unknown as VacancyDataset,
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

/**
 * 空きを記号で出している自治体かどうか。
 *
 * 記号（○△×）から人数は決められないので、合計や倍率のような数の集計はできない。
 * 代わりに「記号ごとに何施設あるか」を数えて見せる
 */
export function isSymbolBased(data: VacancyDataset): boolean {
  return hasMetric(data, "symbol");
}

/** その施設・その年齢の記号。年齢に null を渡すと、いちばん空きの多い記号を返す */
export function symbolAt(
  data: VacancyDataset,
  facility: { symbols?: AgeSymbols },
  age: number | null
): string | null {
  const symbols = facility.symbols;
  if (!symbols) return null;
  if (age !== null) return symbols[age] ?? null;
  // 全年齢のときは、凡例の並び（空きの多い順）でいちばん上に来るものを出す
  const order = (data.symbolLegend ?? []).map((l) => l.mark);
  let best: string | null = null;
  for (const mark of symbols) {
    if (!mark) continue;
    if (best === null) {
      best = mark;
      continue;
    }
    const a = order.indexOf(mark);
    const b = order.indexOf(best);
    if (a >= 0 && (b < 0 || a < b)) best = mark;
  }
  return best;
}

/** その記号が「空きあり」を表すか。凡例にない記号は空きなしとみなす */
export function isOpenSymbol(data: VacancyDataset, mark: string | null): boolean {
  if (!mark) return false;
  return (data.symbolLegend ?? []).some((l) => l.mark === mark && l.open);
}

/** 記号ごとの施設数。年齢を指定すればその年齢だけを数える */
export function countBySymbol(
  data: VacancyDataset,
  age: number | null
): { legend: SymbolLegend; count: number }[] {
  const legend = data.symbolLegend ?? [];
  return legend.map((item) => ({
    legend: item,
    count: data.facilities.filter((f) => symbolAt(data, f, age) === item.mark).length,
  }));
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
