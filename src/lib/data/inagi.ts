import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 稲城市 特定教育・保育施設及び特定地域型保育事業の利用についての調整に関する規則
// 出典: 稲城市保育利用調整基準（別表第1・第2）
// https://www1.g-reiki.net/inagi/reiki_honbun/g149RG00000587.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大40点（就労・自営中心者等の場合）。基準指数 + 調整指数で算出。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'inagi',
  name: '稲城市',
  slug: 'inagi',
  prefecture: '東京都',
  maxBasePoints: 80,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週40時間以上（40点）', value: `${prefix}_employment_40`, points: 40 },
  { label: '週35時間以上40時間未満（36点）', value: `${prefix}_employment_36`, points: 36 },
  { label: '週30時間以上35時間未満（34点）', value: `${prefix}_employment_34`, points: 34 },
  { label: '週25時間以上30時間未満（32点）', value: `${prefix}_employment_32`, points: 32 },
  { label: '週20時間以上25時間未満（29点）', value: `${prefix}_employment_29`, points: 29 },
  { label: '週17時間以上20時間未満（26点）', value: `${prefix}_employment_26`, points: 26 },
  { label: '週14時間以上17時間未満（23点）', value: `${prefix}_employment_23`, points: 23 },
  { label: '週12時間以上14時間未満（20点）', value: `${prefix}_employment_20`, points: 20 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院（1か月以上）（40点）', value: `${prefix}_illness_40a`, points: 40 },
  { label: '居宅内疾病（常時病臥）（40点）', value: `${prefix}_illness_40b`, points: 40 },
  { label: '重度精神疾患等（40点）', value: `${prefix}_illness_40c`, points: 40 },
  { label: '一般療養（28点）', value: `${prefix}_illness_28`, points: 28 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害1～2級等（40点）', value: `${prefix}_disability_40`, points: 40 },
  { label: '身体障害3級等（32点）', value: `${prefix}_disability_32`, points: 32 },
  { label: '身体障害4級（24点）', value: `${prefix}_disability_24`, points: 24 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '自宅介護（要介護4～5等）（38点）', value: `${prefix}_care_38`, points: 38 },
  { label: '自宅介護（要介護1～3等）（30点）', value: `${prefix}_care_30`, points: 30 },
  { label: '自宅介護（その他）（26点）', value: `${prefix}_care_26`, points: 26 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '就労・自営（中心者等）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産（40点）', value: `${prefix}_reason_childbirth`, points: 40 },
      { label: '災害復旧（40点）', value: `${prefix}_reason_disaster`, points: 40 },
      { label: '求職活動中（10点）', value: `${prefix}_reason_jobseeking`, points: 10 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の週間就労時間は？`,
      helpText: '就労・自営（中心者等）の基準です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の等級は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
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
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_single_parent_yes', points: 30 },
    ],
  },
  {
    id: 'adj_single_parent_semi',
    category: 'adjustment',
    label: 'ひとり親に準ずる世帯ですか？',
    helpText: '単身赴任の場合は別項目を選択してください',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_semi_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_single_parent_semi_yes', points: 15 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_welfare_yes', points: 15 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_single_assignment_yes', points: 4 },
    ],
  },
  {
    id: 'adj_tax_exempt',
    category: 'adjustment',
    label: '非課税世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tax_exempt_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_tax_exempt_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unauthorized_childcare',
    category: 'adjustment',
    label: '認可外保育施設の利用実績がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unauthorized_childcare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_unauthorized_childcare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が同じ園に在園中または同時申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multiples',
    category: 'adjustment',
    label: '多胎児の同時申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiples_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_multiples_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士として就労中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_nursery_worker_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent_available',
    category: 'adjustment',
    label: '同居の祖父母が保育可能（非該当）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_available_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_grandparent_available_yes', points: -3 },
    ],
  },
  {
    id: 'adj_unpaid_fees',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fees_no', points: 0 },
      { label: '1か月分以上の滞納（-10）', value: 'adj_unpaid_fees_1month', points: -10 },
      { label: '3か月分以上の滞納（-40）', value: 'adj_unpaid_fees_3month', points: -40 },
    ],
  },
];

export const inagiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
