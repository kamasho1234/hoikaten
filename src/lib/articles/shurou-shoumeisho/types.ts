// 自治体ごとの就労証明書の記事は、自由作文ではなく「公式ページで確かめた事実の組」から組み立てる。
// 奈良市のコラム41本（2026-09-14）で、数字は合っていても事実の取り違えが20か所以上出たため。
// 値が取れないフィールドは省略する（記事では「公式ページに記載なし」と出る）。推測で埋めない。
// evidence にはフィールドごとに、根拠になった公式ページの URL と本文の原文を持つ。
// scripts/verify-shurou-records.py が URL の生存と原文の一致を機械照合する。

export type ShurouFormType =
  /** こども家庭庁の標準的な様式をそのまま使う */
  | "standard"
  /** 標準的な様式に自治体の欄や別紙を足している */
  | "standard-plus"
  /** 自治体独自の様式 */
  | "original";

export type ShurouLink = { label: string; url: string };

export type ShurouEvidence = {
  url: string;
  /** ページ本文（PDF なら抽出テキスト）にそのまま出てくる文。要約しない */
  quote: string;
};

export type ShurouRecord = {
  citySlug: string;
  /** 記事の slug。既定は "shurou-shoumeisho"（豊橋だけ既存 URL を守るため "employment-certificate"） */
  slug?: string;
  /** 公式ページを確認した日（YYYY-MM-DD）。記事の publishedAt にもなる */
  checkedAt: string;
  formType: ShurouFormType;
  /** 様式を配布している公式ページ */
  formPage: ShurouLink;
  /** 様式の PDF・Excel・記入例など */
  formFiles?: ShurouLink[];
  /** 証明日からの有効期限（公式の文言で） */
  validity?: string;
  /** 直近の申込の提出締切 */
  deadline?: string;
  /** 提出先 */
  submitTo?: string;
  /** 電子申請の可否（マイナポータル・独自システムなど） */
  online?: string;
  /** きょうだいで1枚を兼用できるか */
  siblings?: string;
  /** 押印の要否。公式に書いていなければ unknown */
  seal: "required" | "not-required" | "unknown";
  /** 押印について公式ページの文言（seal が unknown でないとき） */
  sealNote?: string;
  /** 自営業・フリーランスが添える書類 */
  selfEmployedDocs?: string[];
  /** 独自様式のとき、国の標準様式との違い（欄の名前で） */
  differences?: string[];
  /** 公式の記入例・注意書きから拾った、この自治体で気をつけること */
  notes: string[];
  /** フィールド名（validity, deadline, seal, notes.0 など）→ 根拠 */
  evidence: Record<string, ShurouEvidence>;
  /** 参照した公式ページ。formPage を含める */
  sources: ShurouLink[];
};
