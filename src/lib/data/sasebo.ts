import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 佐世保市 保育園入園 基準点数・調整点数データ
// 出典: 佐世保市「佐世保市特定教育・保育施設等の利用基準」（令和3年11月1日）
// https://www.city.sasebo.lg.jp/kodomomirai/hoyou/riyoukijun.html
// 就労下限: 月60時間
// 佐世保市は保護者各最大20点（就労の場合）、父母合算で最大40点 + 世帯加算 + 児童加算
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sasebo',
  name: '佐世保市',
  slug: 'sasebo',
  prefecture: '長崎県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大20点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上の就労', value: `${prefix}_employment_20`, points: 20 },
  { label: '月150時間以上の就労', value: `${prefix}_employment_19`, points: 19 },
  { label: '月140時間以上の就労', value: `${prefix}_employment_18`, points: 18 },
  { label: '月130時間以上の就労', value: `${prefix}_employment_17`, points: 17 },
  { label: '月120時間以上の就労', value: `${prefix}_employment_16`, points: 16 },
  { label: '月110時間以上の就労', value: `${prefix}_employment_15`, points: 15 },
  { label: '月100時間以上の就労', value: `${prefix}_employment_14`, points: 14 },
  { label: '月90時間以上の就労', value: `${prefix}_employment_13`, points: 13 },
  { label: '月80時間以上の就労', value: `${prefix}_employment_12`, points: 12 },
  { label: '月70時間以上の就労', value: `${prefix}_employment_11`, points: 11 },
  { label: '月60時間以上の就労', value: `${prefix}_employment_10`, points: 10 },
];

/** 疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時臥床の状態', value: `${prefix}_illness_20`, points: 20 },
  { label: '週3日以上の通院が必要', value: `${prefix}_illness_18`, points: 18 },
  { label: 'その他の疾病・障がい', value: `${prefix}_illness_13`, points: 13 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の介護・看護', value: `${prefix}_care_20`, points: 20 },
  { label: '月150時間以上の介護・看護', value: `${prefix}_care_19`, points: 19 },
  { label: '月140時間以上の介護・看護', value: `${prefix}_care_18`, points: 18 },
  { label: '月130時間以上の介護・看護', value: `${prefix}_care_17`, points: 17 },
  { label: '月120時間以上の介護・看護', value: `${prefix}_care_16`, points: 16 },
  { label: '月110時間以上の介護・看護', value: `${prefix}_care_15`, points: 15 },
  { label: '月100時間以上の介護・看護', value: `${prefix}_care_14`, points: 14 },
  { label: '月90時間以上の介護・看護', value: `${prefix}_care_13`, points: 13 },
  { label: '月80時間以上の介護・看護', value: `${prefix}_care_12`, points: 12 },
  { label: '月70時間以上の介護・看護', value: `${prefix}_care_11`, points: 11 },
  { label: '月60時間以上の介護・看護', value: `${prefix}_care_10`, points: 10 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（予定日前後）', value: `${prefix}_childbirth_16`, points: 16 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学', value: `${prefix}_education_18`, points: 18 },
  { label: '月150時間以上の就学', value: `${prefix}_education_17`, points: 17 },
  { label: '月140時間以上の就学', value: `${prefix}_education_16`, points: 16 },
  { label: '月130時間以上の就学', value: `${prefix}_education_15`, points: 15 },
  { label: '月120時間以上の就学', value: `${prefix}_education_14`, points: 14 },
  { label: '月110時間以上の就学', value: `${prefix}_education_13`, points: 13 },
  { label: '月100時間以上の就学', value: `${prefix}_education_12`, points: 12 },
  { label: '月90時間以上の就学', value: `${prefix}_education_11`, points: 11 },
  { label: '月80時間以上の就学', value: `${prefix}_education_10`, points: 10 },
  { label: '月70時間以上の就学', value: `${prefix}_education_9`, points: 9 },
  { label: '月60時間以上の就学', value: `${prefix}_education_8`, points: 8 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（ハローワークカード等あり）', value: `${prefix}_jobseeking_5`, points: 5 },
  { label: '求職活動中（証明書類なし）', value: `${prefix}_jobseeking_4`, points: 4 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

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
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護をしていますか？`,
      helpText: '月あたりの介護・看護時間を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '月あたりの就学時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数の質問（世帯加算・児童加算）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: 'ひとり親世帯の場合、+26点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 26 },
    ],
  },
  {
    id: 'adj_breadwinner_unemployed',
    category: 'adjustment',
    label: '主に生計を維持する方が失業中（求職活動中）ですか？',
    helpText: '就労の必要性が高い場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_breadwinner_unemployed_no', points: 0 },
      { label: 'はい', value: 'adj_breadwinner_unemployed_yes', points: 6 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者に障害がありますか？',
    helpText: '障害者手帳や療育手帳の等級に応じて加点されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_parent_disability_no', points: 0 },
      { label: '身体1・2級 / 精神1級 / 療育A', value: 'adj_parent_disability_high', points: 5 },
      { label: 'その他の手帳所持・障害基礎年金受給', value: 'adj_parent_disability_other', points: 4 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '保護者が単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 3 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '多胎児（双子など）が同時に同一施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい', value: 'adj_twins_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で新規の就労・就学・求職活動をしていますか？',
    helpText: '自立支援に寄与する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業を終了しましたか？',
    helpText: '育休から復帰する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用希望のお子さんに障害がありますか？',
    helpText: '児童加算として加点されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_child_disability_no', points: 0 },
      { label: '特別児童扶養手当の対象', value: 'adj_child_disability_special', points: 3 },
      { label: '障害者手帳・療育手帳を所持', value: 'adj_child_disability_techo', points: 2 },
      { label: '医師からの意見書あり', value: 'adj_child_disability_doctor', points: 1 },
    ],
  },
  {
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '地域型保育事業所（小規模保育等）の卒園児ですか？',
    helpText: '卒園に伴う転所の場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_grad_no', points: 0 },
      { label: 'はい', value: 'adj_small_grad_yes', points: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const saseboData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
