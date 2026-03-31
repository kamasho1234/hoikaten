import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// さいたま市 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------

const municipality = {
  id: 'saitama',
  name: 'さいたま市',
  slug: 'saitama',
  prefecture: '埼玉県',
  maxBasePoints: 52, // 父母各26点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: '月160時間以上', value: `${prefix}_employment_26`, points: 26 },
  { label: '月140〜160時間未満', value: `${prefix}_employment_24`, points: 24 },
  { label: '月120〜140時間未満', value: `${prefix}_employment_22`, points: 22 },
  { label: '月100〜120時間未満', value: `${prefix}_employment_20`, points: 20 },
  { label: '月80〜100時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月64〜80時間未満', value: `${prefix}_employment_17`, points: 17 },
];

/** 採用予定 */
const employmentProspectOptions = (prefix: string) => [
  { label: '採用が決まっている', value: `${prefix}_employment_prospect_15`, points: 15 },
];

/** 内職 */
const pieceworkOptions = (prefix: string) => [
  { label: '内職をしている', value: `${prefix}_piecework_16`, points: 16 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: '入院1ヶ月以上／常時臥床／指定難病', value: `${prefix}_illness_33`, points: 33 },
  { label: 'それ以外の病気で治療中', value: `${prefix}_illness_26`, points: 26 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: '身体1-2級／精神1級／知的A・B', value: `${prefix}_disability_33`, points: 33 },
  { label: '身体3級／精神2級／知的C', value: `${prefix}_disability_30`, points: 30 },
  { label: '身体4級以下／精神3級', value: `${prefix}_disability_26`, points: 26 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: '常時臥床の看護／要介護3〜5', value: `${prefix}_care_30`, points: 30 },
  { label: '通所付添い週4日以上／要介護2', value: `${prefix}_care_28`, points: 28 },
  { label: 'それ以外／要介護1', value: `${prefix}_care_24`, points: 24 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: '出産の前後', value: `${prefix}_childbirth_33`, points: 33 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: '現在学校に通っている', value: `${prefix}_education_18`, points: 18 },
  { label: '入学が決まっている', value: `${prefix}_education_11`, points: 11 },
];

/** 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: '仕事を探している', value: `${prefix}_jobseeking_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 理由に応じた詳細選択肢を返すヘルパー
// ---------------------------------------------------------------------------

function getDetailOptions(prefix: string, reason: string) {
  switch (reason) {
    case 'employment':
      return employmentOptions(prefix);
    case 'employment_prospect':
      return employmentProspectOptions(prefix);
    case 'piecework':
      return pieceworkOptions(prefix);
    case 'illness':
      return illnessOptions(prefix);
    case 'disability':
      return disabilityOptions(prefix);
    case 'care':
      return careOptions(prefix);
    case 'childbirth':
      return childbirthOptions(prefix);
    case 'education':
      return educationOptions(prefix);
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
      { label: '仕事が決まっている（採用予定）', value: `${prefix}_reason_employment_prospect`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  // 各理由の詳細質問
  const reasons = [
    'employment',
    'employment_prospect',
    'illness',
    'disability',
    'care',
    'childbirth',
    'education',
    'jobseeking',
  ] as const;

  const reasonLabels: Record<string, { label: string; helpText?: string }> = {
    employment: { label: `${parentLabel}はどのくらい働いていますか？`, helpText: '月あたりの就労時間を選んでください' },
    employment_prospect: { label: `${parentLabel}の採用予定は？` },
    illness: { label: `${parentLabel}の病気の状況は？` },
    disability: { label: `${parentLabel}の障害の程度は？` },
    care: { label: `${parentLabel}はどのくらい介護・看護をしていますか？` },
    childbirth: { label: `${parentLabel}の出産時期は？` },
    education: { label: `${parentLabel}の就学状況は？` },
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
    helpText: 'ひとり親の場合、保護者2は「不存在」として60点が加算されます（さいたま市の公式基準に準拠）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 60 },
    ],
  },
  {
    id: 'adj_childcare_status',
    category: 'adjustment',
    label: '現在のお子さまの保育状況は？',
    helpText: '申込み時点でのお子さまの保育状況を選んでください',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_childcare_status_none', points: 0 },
      { label: '認可外保育施設等に預けている', value: 'adj_childcare_status_unlicensed', points: 7 },
      { label: '育児休業中・産休中', value: 'adj_childcare_status_parental_leave', points: 6 },
      { label: '祖父母等が保育している', value: 'adj_childcare_status_grandparent', points: 3 },
      { label: '自宅で保育している', value: 'adj_childcare_status_home', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいについて教えてください',
    helpText: '認可保育園に通っているきょうだいがいる場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'きょうだいはいない／保育園に通っていない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが通っている園を第一希望にしている', value: 'adj_sibling_same', points: 3 },
      { label: 'きょうだいが認可保育園に通っている（上記以外）', value: 'adj_sibling_other', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: 'パパ・ママのどちらかが単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 4 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖父母（双方の親）は近くにいますか？',
    helpText: 'さいたま市では祖父母が別居の場合に加点されます（簡略化しています）',
    inputType: 'radio',
    options: [
      { label: '全員同居または近居', value: 'adj_grandparent_together', points: 0 },
      { label: '一部が別居・不存在', value: 'adj_grandparent_partial', points: 2 },
      { label: '全員が別居・不存在', value: 'adj_grandparent_apart', points: 4 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const saitamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
