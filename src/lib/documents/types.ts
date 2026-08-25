// 子育て書類ガイドの型定義
//
// 保活コラム（src/lib/articles）とは別に持つ。
// コラムは自治体ごとの話が中心だが、こちらは**書類そのもの**の解説で、
// 保育園に限らず学童・幼稚園・児童手当・就学支援金など複数の手続きで参照される。
//
// ## 事実の裏づけについて
// 書類のしくみは国（こども家庭庁・総務省・デジタル庁など）が決めているものが多く、
// 全国共通で書ける。一方で手数料・窓口・必要書類の細部は自治体ごとに違うため、
// **確かめられることだけを書き、違いが出るところは「お住まいの自治体で確認」と書く**。
// そのため sources を必須にして、記事ごとに出典を示せるようにしている。

/** 書類のグループ。ハブページの並びに使う */
export type DocumentGroup =
  | "就労証明書"
  | "所得・課税の証明"
  | "住民票・戸籍"
  | "マイナンバー"
  | "母子保健"
  | "手当・医療費"
  | "障害・療育"
  | "入園・就学の手続き"
  | "育休・出産のお金"
  | "一時的に預ける";

export type DocumentSource = {
  /** 出典の名前（発行元がわかる形で書く） */
  label: string;
  url: string;
};

export type DocumentFaq = {
  q: string;
  /** 答えはプレーンテキスト。JSON-LD の FAQPage にもそのまま入る */
  a: string;
};

export type DocumentGuide = {
  slug: string;
  title: string;
  description: string;
  group: DocumentGroup;
  /**
   * この書類を使う手続き。保育園以外のものを必ず含める
   * （この配列がハブページの「保育園以外でも使う」表示になる）
   */
  usedFor: string[];
  /** 一覧での並び順。小さいほど上 */
  order: number;
  updatedAt: string;
  /** 本文（HTML）。ArticleBody の prose スタイルで表示する */
  content: string;
  /** 出典。1つ以上必須 */
  sources: DocumentSource[];
  faq?: DocumentFaq[];
};
