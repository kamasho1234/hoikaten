import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 河内長野市 保育の利用調整要綱 別表第1〜第3（利用調整基準点数表・加算要因・減算要因）データ
//
// 出典: 河内長野市「河内長野市保育の利用調整要綱」（平成31年2月26日要綱第4号、
//       令和6年3月13日施行）別表第1〜別表第3
//       https://www.city.kawachinagano.lg.jp/static/reiki/reiki_honbun/l700RG00001612.html
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式要綱を読み取って全面的に置き換えた。
//
// 原典の定義（第2条第4号）:
//   「利用調整基準点数　保護者の状態の区分に適応する別表第1に掲げる指数に
//     申込児童の家庭の状態に適応する別表第2又は別表第3の指数を加え、又は減じて
//     世帯別に算出した点数をいう」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kawachinagano',
  name: '河内長野市',
  slug: 'kawachinagano',
  prefecture: '大阪府',
  maxBasePoints: 20, // 父母各10点（虐待・配偶者からの暴力の30点は父母いずれかに適用される例外）
} as const;

// ---------------------------------------------------------------------------
// 別表第1 利用調整基準点数表。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労等（外勤・自営／就学及び技能取得／内職／農業） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・自営：月20日以上、7時間以上の就労を常態', value: `${prefix}_employment_a1`, points: 10 },
  { label: '外勤・自営：月20日以上、7時間未満の就労を常態', value: `${prefix}_employment_a2`, points: 9 },
  { label: '外勤・自営：月16日以上、7時間以上の就労を常態', value: `${prefix}_employment_a3`, points: 8 },
  { label: '外勤・自営：月16日以上、7時間未満の就労を常態', value: `${prefix}_employment_a4`, points: 7 },
  { label: '外勤・自営：月16日未満の就労を常態', value: `${prefix}_employment_a5`, points: 6 },
  { label: '農業：月64時間以上、1,000平方メートル以上の田畑を耕作', value: `${prefix}_employment_a8`, points: 4 },
  { label: '内職：月64時間以上の就労を常態', value: `${prefix}_employment_a7`, points: 2 },
];

/** 就学及び技能取得 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '学校教育法に基づく学校・専修学校への通学、職業訓練等',
    value: `${prefix}_education_a6`,
    points: 5,
  },
];

/** 出産（公式の点数表では母の欄のみに指数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日のおおむね前後8週間', value: `${prefix}_childbirth_c`, points: 8 },
];

/** 病気 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：おおむね1か月以上の入院', value: `${prefix}_illness_d1`, points: 10 },
  { label: '在宅・常時臥床：おおむね1か月以上の常時臥床', value: `${prefix}_illness_d2`, points: 10 },
  { label: '在宅・一般療養：おおむね1か月以上の加療、安静を要する', value: `${prefix}_illness_d3`, points: 7 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度：身障手帳1・2級、療育手帳A、精神1級を所持', value: `${prefix}_disability_e1`, points: 10 },
  { label: '中度：身障手帳3・4級、療育手帳B、精神2級を所持', value: `${prefix}_disability_e2`, points: 7 },
];

/** 看護（疾病・障害） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '入院付添い：おおむね1か月以上の親族の入院付添いに月64時間以上当たっている',
    value: `${prefix}_care_f1`,
    points: 8,
  },
  {
    label: '障害：身障手帳1・2級、療育手帳A、精神1級に該当する親族の看護等',
    value: `${prefix}_care_f4`,
    points: 8,
  },
  {
    label: '在宅看護：同居の親族の在宅療養の看護（医師の診断書または要介護度3以上）',
    value: `${prefix}_care_f2`,
    points: 6,
  },
  {
    label: '障害：身障手帳3・4級、療育手帳B、精神2級に該当する親族の看護等',
    value: `${prefix}_care_f5`,
    points: 6,
  },
  {
    label: '在宅看護：別居の親族の看護に月64時間以上（医師の診断書または要介護度3以上）',
    value: `${prefix}_care_f3`,
    points: 4,
  },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災・その他の災害の復旧に当たっている', value: `${prefix}_disaster_g`, points: 10 },
];

/** 求職活動中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労のための求職活動を継続的に行っている（起業準備含む）', value: `${prefix}_jobseeking_h`, points: 1 },
];

/** 虐待・配偶者からの暴力（父母いずれかに適用） */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待のおそれがある', value: `${prefix}_abuse_i`, points: 30 },
  { label: '配偶者からの暴力により保育が困難であると認められる', value: `${prefix}_abuse_j`, points: 30 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '働いている（外勤・自営・農業・内職）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就学・技能取得をしている', value: `${prefix}_reason_education`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の看護・介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧に当たっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '虐待・配偶者からの暴力', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・技能取得の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '公式の点数表では母の欄のみに指数があります',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・配偶者からの暴力にあてはまりますか？`,
      helpText: '公式では父母のいずれかに30点が適用されます',
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 別表第2（加算要因）・別表第3（減算要因）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  // --- 別表第2 加算要因 ---
  {
    id: 'adj_absent_parent',
    category: 'adjustment',
    label: '親が不在（拘留中・行方不明等）ですか？',
    helpText: '両親が不在の場合は20点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_absent_parent_no', points: 0 },
      { label: '片方の親が不在', value: 'adj_absent_parent_10', points: 10 },
      { label: '両親が不在', value: 'adj_absent_parent_20', points: 20 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '父子・母子家庭ですか？',
    helpText: '離婚調停中を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 12 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が利用している施設を希望しますか？',
    helpText: '保育所・認定こども園・地域型保育施設が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_three_same_class',
    category: 'adjustment',
    label: '3人以上同時に同じ施設の同じクラスに申し込みますか？',
    helpText: '保育士・幼稚園教諭としての就労による加算（P-13）とは併用されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_three_same_class_no', points: 0 },
      { label: 'はい', value: 'adj_three_same_class_yes', points: 3 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育休・産休から復帰しますか？',
    helpText: '父または母のいずれかに加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_kodomoen_change',
    category: 'adjustment',
    label: '認定こども園で1号から2号に認定区分が変更となり、引き続き同じ施設の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kodomoen_change_no', points: 0 },
      { label: 'はい', value: 'adj_kodomoen_change_yes', points: 30 },
    ],
  },
  {
    id: 'adj_renkei',
    category: 'adjustment',
    label: '乳児保育所・地域型保育施設等の卒園児ですか？',
    helpText:
      '連携施設を第1希望にした場合、または期間限定保育の利用期限が満了する子どもの利用申込みは30点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_renkei_no', points: 0 },
      { label: 'はい（連携施設を第1希望、または期間限定保育の期限満了）', value: 'adj_renkei_30', points: 30 },
      { label: 'はい（上記以外の施設を希望）', value: 'adj_renkei_2', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '生計中心者の失業により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童が障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '第3子以降の子どもの利用申込みですか？',
    helpText: '同居する子どものうち、中学校修了前の最も年長の子どもを第1子として数えます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士・幼稚園教諭として市内の特定教育・保育施設で就労していますか？',
    helpText: '資格を有し、かつ市内の施設で就労している場合（内定を含む）が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 10 },
    ],
  },
  // --- 別表第3 減算要因 ---
  {
    id: 'adj_other_child',
    category: 'adjustment',
    label: '申込児童以外に就学前児童がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_child_no', points: 0 },
      { label: 'はい（父または母が保育する）', value: 'adj_other_child_m1', points: -2 },
      { label: 'はい（就労同伴）', value: 'adj_other_child_m2', points: -2 },
    ],
  },
  {
    id: 'adj_no_work_record',
    category: 'adjustment',
    label: '就労実績（外勤・自営）はありますか？',
    inputType: 'radio',
    options: [
      { label: 'ある', value: 'adj_no_work_record_ok', points: 0 },
      { label: 'ない', value: 'adj_no_work_record_ng', points: -2 },
    ],
  },
  {
    id: 'adj_low_income',
    category: 'adjustment',
    label: '収入金額が最低賃金×月64時間を下回っていますか？',
    helpText: '最低賃金法に基づく時間給に月64時間を掛けた額が基準です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_low_income_no', points: 0 },
      { label: 'はい', value: 'adj_low_income_yes', points: -3 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '育児休業延長の許容に関する申出書を提出しますか？',
    helpText: '大きく減点されるため、入所を強く希望する場合は提出しないのが一般的です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -40 },
    ],
  },
];

export const kawachinaganoData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
