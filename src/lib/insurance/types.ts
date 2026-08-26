// 妊娠・出産・育児のお金と保険の記事の型定義
//
// 子育て書類ガイド（src/lib/documents）とも保活コラム（src/lib/articles）とも別に持つ。
// 書類ガイドは「手続きに要る紙」の話、こちらは「そのお金をどう用意するか」の話。
//
// ## 書き方の約束
// - **公的な保障（健康保険・年金・自治体の助成）の事実を先に書く。**
//   民間の保険はそのあと、公的保障で足りない部分の話として書く
// - 数字は必ず出典を示す。制度は毎年変わるので `sources` を必須にしている
// - 保険商品そのものの良し悪し（返戻率・保険料の比較）は書かない。
//   商品は人によって条件が変わるし、こちらで確かめられないため
// - 断定を避ける言い方（「◯◯すべき」ではなく「◯◯という考え方がある」）にする

/** 記事のまとまり。一覧ページの並びに使う */
export type InsuranceGroup =
  | "妊娠中のお金"
  | "出産のお金"
  | "育休中のお金"
  | "子どもが生まれたあとの備え"
  | "教育費"
  | "住む場所で変わるお金"
  | "相談のしかた";

export type InsuranceSource = {
  /** 出典の名前（発行元がわかる形で書く） */
  label: string;
  url: string;
};

export type InsuranceFaq = {
  q: string;
  /** 答えはプレーンテキスト。JSON-LD の FAQPage にもそのまま入る */
  a: string;
};

export type InsuranceArticle = {
  slug: string;
  title: string;
  description: string;
  group: InsuranceGroup;
  /** この記事がだれ向けか。一覧に出す（「妊娠がわかったばかりの人」など） */
  readerFor: string[];
  /** 一覧での並び順。小さいほど上 */
  order: number;
  updatedAt: string;
  /** 本文（HTML）。ArticleBody の prose スタイルで表示する */
  content: string;
  /** 出典。1つ以上必須 */
  sources: InsuranceSource[];
  faq?: InsuranceFaq[];
  /**
   * 記事の終わりに出す相談の案内。記事ごとに文脈に合わせて変える。
   * 広告であることは CTA 側で必ず出す
   */
  cta: {
    heading: string;
    body: string;
  };
};
