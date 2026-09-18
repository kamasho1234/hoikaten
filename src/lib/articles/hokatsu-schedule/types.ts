// 自治体ごとの「保活スケジュール」レコード。公式ページの原文（quote）で裏づけた事実だけを持つ。
// 記事の文章は build.ts が組み立てる。検査は scripts/verify-fact-records.py hokatsu。
export type HokatsuRecord = {
  citySlug: string;
  checkedAt: string; // 確認日 YYYY-MM-DD
  // 令和9年4月入園（2027年4月）の案内ページ。R9 が未公表なら令和8年4月入園の案内ページ
  page: { label: string; url: string };
  // R9 = 令和9年4月入園の日程、R8 = 令和8年4月入園の実績（R9 未公表のとき）
  fiscalYear: "R9" | "R8";
  guideRelease?: string; // 案内・申込書の配布開始（例: 令和8年9月1日から区役所と各園で配布、区ホームページに掲載）
  firstApply?: string; // 一次申込の受付期間（例: 令和8年10月1日〜10月31日。郵送は10月28日必着）
  applyMethods?: string; // 申込方法（窓口・郵送・電子申請の別と締切の違い）
  firstResult?: string; // 一次結果の通知時期（例: 令和9年1月下旬に郵送）
  secondApply?: string; // 二次申込の受付期間
  secondResult?: string; // 二次結果の通知時期
  midYearDeadline?: string; // 年度途中入園の締切（例: 入園希望月の前月10日まで）
  documents?: string[]; // 必要書類（就労証明書の有効期限や証明日の条件も）
  interview?: string; // 面接・健康診断・見学の要否と時期
  ikukyu?: string; // 育休延長希望の扱い（入園保留通知、希望園を1園だけにできるか等）
  notes: string[]; // その自治体の案内にある固有の注意
  evidence: Record<string, { url: string; quote: string }>;
  sources: { label: string; url: string }[];
};
