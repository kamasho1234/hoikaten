import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.aichi-miyoshi.lg.jp/material/files/group/16/annnai4.pdf
//       （みよし市保育園入園基準指数表／保育園等入園申込みのご案内 P.13-14）
// みよし市（愛知県）保育園入園基準指数表（基準点＋調整指数）
// 計算方式: min方式（「基準点（保護者のうち点数の低い方とする）」）。
// 最高基準点: 40
// 注:
//  - 「産前産後」は母（保護者2）のみに設定。
//  - 就労予定（雇用形態・派遣予定及び派遣先未定）の場合は各点数から2点減じる（helpTextで案内）。
//  - 「その他（保育に欠ける緊急度が高いと課長が判断・20〜40）」「生計中心者の失業（別途判断）」
//    「虐待・DV（別途判断）」は個別判断のため除外。
//  - min方式のため、父母それぞれの基準点のうち低い方が世帯の基準点。ひとり親（保護者2未回答）は
//    保護者1の基準点を使用。

const municipality = {
  id: 'aichi-miyoshi',
  name: 'みよし市',
  slug: 'aichi-miyoshi',
  prefecture: '愛知県',
  maxBasePoints: 40,
  scoringMethod: 'min',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労（居宅外労働：外勤・自営業・農業）
    { label: '就労（居宅外・外勤/自営業/農業）：月160時間以上勤務', value: `${prefix}_out_160`, points: 40 },
    { label: '就労（居宅外・外勤/自営業/農業）：月140時間以上勤務', value: `${prefix}_out_140`, points: 38 },
    { label: '就労（居宅外・外勤/自営業/農業）：月120時間以上勤務', value: `${prefix}_out_120`, points: 36 },
    { label: '就労（居宅外・外勤/自営業/農業）：月100時間以上勤務', value: `${prefix}_out_100`, points: 34 },
    { label: '就労（居宅外・外勤/自営業/農業）：月80時間以上勤務', value: `${prefix}_out_80`, points: 32 },
    { label: '就労（居宅外・外勤/自営業/農業）：月60時間以上勤務', value: `${prefix}_out_60`, points: 30 },
    // 就労（居宅内労働：自営の専従者含む・自営業）
    { label: '就労（居宅内・自営業）：月140時間以上勤務', value: `${prefix}_in_140`, points: 34 },
    { label: '就労（居宅内・自営業）：月120時間以上勤務', value: `${prefix}_in_120`, points: 32 },
    { label: '就労（居宅内・自営業）：月100時間以上勤務', value: `${prefix}_in_100`, points: 30 },
    { label: '就労（居宅内・自営業）：月80時間以上勤務', value: `${prefix}_in_80`, points: 28 },
    { label: '就労（居宅内・自営業）：月60時間以上勤務', value: `${prefix}_in_60`, points: 26 },
    // 就労（内職）
    { label: '就労（内職）：月100時間以上勤務', value: `${prefix}_naishoku_100`, points: 28 },
    { label: '就労（内職）：月80時間以上勤務', value: `${prefix}_naishoku_80`, points: 26 },
    { label: '就労（内職）：月60時間以上勤務', value: `${prefix}_naishoku_60`, points: 24 },
    // 産前産後（母のみ ※後段で母だけに追加）
    // 保護者の疾病・障がい
    { label: '疾病・障がい：入院中（入院予定）である', value: `${prefix}_ill_hosp`, points: 40 },
    { label: '疾病・障がい：外来通院（週1回以上）を行い、自宅で安静を要する状態', value: `${prefix}_ill_visit`, points: 32 },
    { label: '疾病・障がい：療養のためできるなら保育を避けたほうが好ましい', value: `${prefix}_ill_light`, points: 24 },
    { label: '障がい：身体障がい者手帳1・2級／精神1・2級／療育手帳A・B判定', value: `${prefix}_dis_12`, points: 32 },
    { label: '障がい：身体障がい者手帳3級／精神3級／療育手帳C判定', value: `${prefix}_dis_3`, points: 24 },
    // 同居の親族等の看護・介護
    { label: '看護・介護：常時介護（要介護5・4／身体1・2級／精神1・2級／療育A・B判定）', value: `${prefix}_care_h`, points: 32 },
    { label: '看護・介護：常時介護（要介護3／身体3級／精神3級／療育C判定）', value: `${prefix}_care_m`, points: 28 },
    // 災害復旧
    { label: '災害復旧：地震・風水害・火災その他の災害の復旧に当たっている', value: `${prefix}_disaster`, points: 40 },
    // 求職活動
    { label: '求職活動：居宅外で求職活動をしている', value: `${prefix}_seek`, points: 22 },
    // 就学
    { label: '就学：月60時間以上就学', value: `${prefix}_school`, points: 24 },
    // 育児休業（3歳以上児のみ）
    { label: '育児休業（3歳以上児のみ）：同じ職場での復帰を前提とする育休取得中', value: `${prefix}_ikuji`, points: 20 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 産前産後は母（保護者2）のみ
  if (parentNum === 2) {
    options.splice(14, 0,
      { label: '産前産後：出産予定日の6週間前から出産日の8週間後までの期間にある場合', value: `${prefix}_birth`, points: 28 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: 'みよし市は「保護者のうち点数の低い方」を世帯の基準点とします。最も当てはまる状況を1つ選んでください。就労予定（雇用形態・派遣予定・派遣先未定）の場合は各点数から2点減じます。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single',
    category: 'adjustment',
    label: 'ひとり親世帯（父母子家庭）ですか？（調整指数）',
    inputType: 'select',
    options: [
      { label: 'ひとり親世帯（単独世帯）（+5点）', value: 'adj_single_alone', points: 5 },
      { label: 'ひとり親世帯（65歳未満の祖父母等と同居・就労等は問わない）（+3点）', value: 'adj_single_dokyo', points: 3 },
      { label: '該当なし', value: 'adj_single_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整指数）',
    helpText: 'ひとり親世帯の点数とは重複適用されません',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+10点）', value: 'adj_seikatsuhogo_yes', points: 10 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '同居する65歳未満の祖父母が保育可能ですか？（調整指数）',
    helpText: '3歳未満児のみ。同居・別居は住民登録上の世帯ではなく居所で判断（同一敷地に居宅がある場合は同居とみなす）。',
    inputType: 'radio',
    options: [
      { label: '同居する65歳未満の祖父母が保育可能（3歳未満児のみ）（-3点）', value: 'adj_sofubo_yes', points: -3 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: '兄弟姉妹の在園・同時入園に関する状況（調整指数）',
    inputType: 'select',
    options: [
      { label: '新年度継続在園児のいる兄弟姉妹の入園（+3点）', value: 'adj_kyodai_zaien', points: 3 },
      { label: '新規兄弟姉妹同時入園申込みの場合（+2点）', value: 'adj_kyodai_doji', points: 2 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shokibo',
    category: 'adjustment',
    label: '小規模保育事業・地域型保育事業などの卒園児ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '小規模保育事業・地域型保育事業などの卒園児（+15点）', value: 'adj_shokibo_yes', points: 15 },
      { label: '該当なし', value: 'adj_shokibo_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士・幼稚園教諭として保育園等に従事していますか？（調整指数）',
    helpText: '父母ともに該当する場合でも5点のみ',
    inputType: 'radio',
    options: [
      { label: '保育士・幼稚園教諭として保育園等の施設に従事する場合（+5点）', value: 'adj_hoikushi_yes', points: 5 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
];

export const aichiMiyoshiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
