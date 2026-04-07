import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 狭山市 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sayama',
  name: '狭山市',
  slug: 'sayama',
  prefecture: '埼玉県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140〜160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120〜140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100〜120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80〜100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64〜80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: '入院1ヶ月以上／常時臥床', value: `${prefix}_illness_20`, points: 20 },
  { label: '通院加療中（一般疾病）', value: `${prefix}_illness_16`, points: 16 },
  { label: '自宅療養中', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: '身体1-2級／療育A', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体3級／療育B', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体4級以下／療育C', value: `${prefix}_disability_12`, points: 12 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: '常時介護（要介護4-5）', value: `${prefix}_care_20`, points: 20 },
  { label: '週4日以上の介護（要介護2-3）', value: `${prefix}_care_16`, points: 16 },
  { label: 'それ以外の介護（要介護1等）', value: `${prefix}_care_12`, points: 12 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: '出産の前後', value: `${prefix}_childbirth_16`, points: 16 },
];

/** 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: '仕事を探している', value: `${prefix}_jobseeking_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// 理由に応じた詳細選択肢を返すヘルパー
// ---------------------------------------------------------------------------

function getDetailOptions(prefix: string, reason: string) {
  switch (reason) {
    case 'employment':
      return employmentOptions(prefix);
    case 'illness':
      return illnessOptions(prefix);
    case 'disability':
      return disabilityOptions(prefix);
    case 'care':
      return careOptions(prefix);
    case 'childbirth':
      return childbirthOptions(prefix);
    case 'jobseeking':
      return jobSeekingOptions(prefix);
    default:
      return [];
  }
}

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  // 「保育が必要な理由」の大分類選択
  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  // 各理由の詳細質問
  const reasons = [
    'employment',
    'illness',
    'disability',
    'care',
    'childbirth',
    'jobseeking',
  ] as const;

  const reasonLabels: Record<string, { label: string; helpText?: string }> = {
    employment: { label: `${parentLabel}はどのくらい働いていますか？`, helpText: '月あたりの就労時間を選んでください' },
    illness: { label: `${parentLabel}の病気の状況は？` },
    disability: { label: `${parentLabel}の障害の程度は？` },
    care: { label: `${parentLabel}はどのくらい介護・看護をしていますか？` },
    childbirth: { label: `${parentLabel}の出産時期は？` },
    jobseeking: { label: `${parentLabel}の求職状況は？` },
  };

  const detailQuestions: Question[] = reasons.map((reason) => ({
    id: `${prefix}_${reason}`,
    category,
    label: reasonLabels[reason].label,
    ...(reasonLabels[reason].helpText ? { helpText: reasonLabels[reason].helpText } : {}),
    inputType: 'radio' as const,
    options: [
      { label: 'あてはまらない', value: `${prefix}_${reason}_none`, points: 0 },
      ...getDetailOptions(prefix, reason),
    ],
  }));

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    helpText: 'ひとり親家庭の場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが認可保育園に在園中ですか？',
    helpText: 'きょうだいが認可保育園に通っている場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に申込みますか？',
    helpText: 'きょうだいが同時に入園申込する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '認可外保育施設に預けていますか？',
    helpText: '認可外保育施設等に預けている場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業中ですか？',
    helpText: '育児休業からの復帰予定がある場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '狭山市外にお住まいですか？',
    helpText: '市外からの申込の場合は減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（狭山市内）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外）', value: 'adj_outside_city_yes', points: -10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母と同居していますか？',
    helpText: '保育可能な同居親族がいる場合は減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園の申込みですか？',
    helpText: '現在認可保育園に在園中で別の園への転園を希望する場合は減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const sayamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
