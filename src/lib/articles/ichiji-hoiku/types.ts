// 自治体ごとの一時保育（一時預かり事業＋こども誰でも通園制度）の記事は、
// 公式ページで確かめた事実の組（レコード）から組み立てる。就労証明書（../shurou-shoumeisho）と同じ方式。
// 値が取れないフィールドは省略する（記事では「公式ページに記載なし」と出る）。推測で埋めない。
// evidence にはフィールド名（配列は notes.0 のように要素ごと）→ 公式ページの URL と本文の原文を持つ。
// scripts/verify-fact-records.py ichiji が URL の生存と原文の一致を機械照合する。

export type IchijiLink = { label: string; url: string };

export type IchijiEvidence = {
  url: string;
  /** ページ本文（PDF なら抽出テキスト）にそのまま出てくる文。要約しない */
  quote: string;
};

export type IchijiRecord = {
  citySlug: string;
  /** 公式ページを確認した日（YYYY-MM-DD）。記事の publishedAt にもなる */
  checkedAt: string;

  // ---- 一時預かり事業（理由があるとき・リフレッシュで使う一時保育） ----
  /** 一時預かりの案内ページ（必須） */
  azukariPage: IchijiLink;
  /** 使える理由（自治体の区分と内容） */
  azukariReasons?: string;
  /** リフレッシュ（私的理由）で使えるか、その上限 */
  azukariRefresh?: string;
  /** 利用日数・時間の上限（月○日、年○日、週○日など） */
  azukariLimit?: string;
  /** 対象年齢 */
  azukariAges?: string;
  /** 料金（区分ごとに1要素。単位と食事代の扱いを含める） */
  azukariFees?: string[];
  /** 減免（非課税世帯・ひとり親など） */
  azukariReduction?: string;
  /** 事前登録の方法・必要書類 */
  azukariRegistration?: string;
  /** 予約の方法と受付開始（電話・LINE・システム、前月○日から など） */
  azukariBooking?: string;
  /** 実施施設の数や一覧の所在 */
  azukariFacilities?: string;

  // ---- こども誰でも通園制度（就労要件なし・月10時間まで） ----
  daredemoPage?: IchijiLink;
  /** 月の利用可能時間（条例で3〜10時間） */
  daredemoHours?: string;
  /** 利用料（1時間あたり など） */
  daredemoFee?: string;
  /** 対象（年齢・未就園の条件） */
  daredemoAges?: string;
  /** 認定の申請と予約の方法（つうえんポータル など） */
  daredemoApply?: string;
  /** 実施施設の数や一覧の所在 */
  daredemoFacilities?: string;
  /** 実施状況（令和8年度の開始時期、受付状況など） */
  daredemoStatus?: string;

  /** ファミリー・サポート・センター、病児保育、休日保育など関連する預け先 */
  otherServices?: string[];
  /** 公式の案内から拾った、この自治体で気をつけること */
  notes: string[];
  /** フィールド名（azukariLimit, notes.0 など）→ 根拠 */
  evidence: Record<string, IchijiEvidence>;
  /** 参照した公式ページ。azukariPage を含める */
  sources: IchijiLink[];
};
