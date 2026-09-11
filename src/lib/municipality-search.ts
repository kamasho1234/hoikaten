// 自治体名で絞り込むときの照合。
// 空き状況（/vacancy）・お金（/insurance）・コラム（/articles）の検索ボックスで共通に使う。
import { kanaMap } from "./kana-map";

/** ひらがな・カタカナの違いや空白で探せなくならないようにそろえる */
export function normalizeQuery(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[ァ-ン]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .replace(/[\s　]/g, "");
}

/**
 * 正規化済みの検索語 q に自治体が当てはまるか。
 * 自治体名・都道府県名・slug・kanaMap の読み（登録がある自治体だけ）のどれかに含まれれば一致
 */
export function matchesMunicipality(
  q: string,
  m: { name: string; prefecture: string; slug: string }
): boolean {
  const reading = normalizeQuery(kanaMap[m.name] ?? "");
  return (
    normalizeQuery(m.name).includes(q) ||
    normalizeQuery(m.prefecture).includes(q) ||
    m.slug.includes(q) ||
    reading.includes(q)
  );
}
