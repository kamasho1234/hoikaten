// 自治体の名前と都道府県を、どのデータを持っているかに関わらず引く。
//
// 自治体は3種類ある。
//   1. 点数の基準を持つ（src/lib/data）… シミュレーター /{city} がある
//   2. 空き状況だけを持つ（src/lib/vacancy）… /{city}/vacancy だけがある
//   3. コラムだけを持つ … /{city}/articles だけがある
// コラムのページで自治体名を出すとき、1だけを見ると 2・3 が404になる。
import { getMunicipalityData } from "./data";
import { getVacancyData } from "./vacancy";

export type CityInfo = {
  slug: string;
  name: string;
  prefecture: string;
  /** 点数シミュレーター（/{city}）があるか。無い自治体へは案内しない */
  hasSimulator: boolean;
};

/** コラムはあるが点数の基準も空き状況も無い自治体。ここで名前と都道府県を補う */
const ARTICLE_ONLY_CITIES: Record<string, { name: string; prefecture: string }> = {
  obama: { name: "小浜市", prefecture: "福井県" },
  "ono-fukui": { name: "大野市", prefecture: "福井県" },
  "sakai-fukui": { name: "坂井市", prefecture: "福井県" },
  tsushima: { name: "津島市", prefecture: "愛知県" },
};

export function getCityInfo(slug: string): CityInfo | undefined {
  const m = getMunicipalityData(slug)?.municipality;
  if (m) return { slug, name: m.name, prefecture: m.prefecture, hasSimulator: true };
  const v = getVacancyData(slug);
  if (v) {
    return { slug, name: v.municipalityName, prefecture: v.prefecture ?? "", hasSimulator: false };
  }
  const a = ARTICLE_ONLY_CITIES[slug];
  if (a) return { slug, ...a, hasSimulator: false };
  return undefined;
}
