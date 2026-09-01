import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 熊取町 保育園入園 利用調整基準データ
// 出典: 熊取町「令和8年度 熊取町保育利用調整基準表」
// https://www.town.kumatori.lg.jp/material/files/group/21/R8hoikuriyoutyouseikizyunnhyouHPbann.pdf
// -------------------------------------------------------------------------
// 熊取町は基本点数を父母それぞれ算出し、低い方の点数を用いて調整する。これに調整指数を加減する。
// 「児童虐待等」「児童の障がい」「その他保育が必要と認められる場合」は児童の状況に応じて決定され、
// 点数が定められていないため選択肢にしていない。
// 延長保育の加点は実施園に申し込む場合のみ適用されると定められている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'kumatori',
  name: '熊取町',
  slug: 'kumatori',
  prefecture: '大阪府',
  maxBasePoints: 10,
  scoringMethod: 'min',
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '会社員等・自営業主（証左書類あり）・週4日以上かつ週40時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '会社員等・自営業主（証左書類あり）・週4日以上かつ週35時間以上', value: `${prefix}_employment_1`, points: 9 },
  { label: '会社員等・自営業主（証左書類あり）・週4日以上かつ週30時間以上', value: `${prefix}_employment_2`, points: 8 },
  { label: '会社員等・自営業主（証左書類あり）・週4日以上かつ週24時間以上', value: `${prefix}_employment_3`, points: 7 },
  { label: '会社員等・自営業主（証左書類あり）・上記以外で月64時間以上', value: `${prefix}_employment_4`, points: 6 },
  { label: '自営業主（証左書類なし）・週4日以上かつ週40時間以上', value: `${prefix}_employment_5`, points: 8 },
  { label: '自営業主（証左書類なし）・上記以外で月64時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '自営業専従者・家族従業者・週4日以上かつ週30時間以上', value: `${prefix}_employment_7`, points: 6 },
  { label: '自営業専従者・家族従業者・上記以外で月64時間以上', value: `${prefix}_employment_8`, points: 5 },
  { label: '内職・週4日以上かつ週40時間以上', value: `${prefix}_employment_9`, points: 5 },
  { label: '内職・週4日以上かつ週30時間以上', value: `${prefix}_employment_10`, points: 4 },
  { label: '内職・上記以外で月64時間以上', value: `${prefix}_employment_11`, points: 3 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産', value: `${prefix}_childbirth_0`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '自宅介護・常時病臥 / 身体1・2級 / 精神1級 / 療育A', value: `${prefix}_illness_1`, points: 10 },
  { label: '常に安静を要し保育困難 / 身体3級 / 精神2級 / 療育B1', value: `${prefix}_illness_2`, points: 8 },
  { label: '一般療養 / 身体4級以下 / 精神3級 / 療育B2', value: `${prefix}_illness_3`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院で必ず付き添いを要する', value: `${prefix}_care_0`, points: 9 },
  { label: '入院で定期的に介護を必要とする', value: `${prefix}_care_1`, points: 5 },
  { label: '自宅療養で寝たきりの全介助を要する', value: `${prefix}_care_2`, points: 8 },
  { label: '週2〜3回の通院の付き添いを要する', value: `${prefix}_care_3`, points: 6 },
  { label: '身体等の障がい者の訓練等の世話', value: `${prefix}_care_4`, points: 5 },
  { label: 'その他の一般的な看護', value: `${prefix}_care_5`, points: 5 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧', value: `${prefix}_disaster_0`, points: 10 },
];

const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '月64時間未満の就労かつ就労時間を増やすための就職活動中', value: `${prefix}_jobseeking_0`, points: 2 },
  { label: '求職活動中である', value: `${prefix}_jobseeking_1`, points: 1 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '週4日以上かつ週40時間以上の就学', value: `${prefix}_school_0`, points: 10 },
  { label: '週4日以上かつ週35時間以上の就学', value: `${prefix}_school_1`, points: 9 },
  { label: '週4日以上かつ週30時間以上の就学', value: `${prefix}_school_2`, points: 8 },
  { label: '週4日以上かつ週24時間以上の就学', value: `${prefix}_school_3`, points: 7 },
  { label: '上記以外で月64時間以上の就学', value: `${prefix}_school_4`, points: 6 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '熊取町は父母それぞれの基本点数のうち、低いほうを用いて調整します',
    inputType: 'select',
    options: [
      { label: '就労している', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動・短時間労働', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動等の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '就学は居宅外就労に準じて点数が決まります（通学時間は含みません）',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_1', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_1', points: 5 },
    ],
  },
  {
    id: 'adj_extended',
    category: 'adjustment',
    label: '延長保育が必要ですか？（実施園に申し込む場合のみ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_extended_0', points: 0 },
      { label: '19時以降の延長保育が必要（+2）', value: 'adj_extended_1', points: 2 },
      { label: '20時以降の延長保育が必要（+3）', value: 'adj_extended_2', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだい（1号を含む）が既に入所している認可保育施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_enrolled_1', points: 3 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士等の資格を持ち、町内の認可保育施設等に就労（予定を含む）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+33）', value: 'adj_hoikushi_1', points: 33 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の60歳未満の祖父母が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（-4）', value: 'adj_grandparent_1', points: -4 },
    ],
  },
  {
    id: 'adj_on_leave',
    category: 'adjustment',
    label: '育児休業を取得中ですか？（継続利用の申込みに限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_on_leave_0', points: 0 },
      { label: 'はい（-4）', value: 'adj_on_leave_1', points: -4 },
    ],
  },
  {
    id: 'adj_younger_child',
    category: 'adjustment',
    label: '下の子どもを保育できる、または下の子どもと同伴就労が可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_younger_child_0', points: 0 },
      { label: 'はい（-2）', value: 'adj_younger_child_1', points: -2 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '認可保育施設を利用できず、育児休業の延長が必要となることを許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_0', points: 0 },
      { label: 'はい（-60）', value: 'adj_leave_extension_1', points: -60 },
    ],
  },
];

export const kumatoriData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
