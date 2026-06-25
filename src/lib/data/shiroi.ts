import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 白井市 保育利用調整基準データ
// 出典: 白井市子ども・子育て支援法施行細則
// https://www1.g-reiki.net/shiroi/reiki_honbun/g038RG00000701.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大10点（就労 月140h+）。
// ひとり親世帯は基本指数に+10加算。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'shiroi',
  name: '白井市',
  slug: 'shiroi',
  prefecture: '千葉県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上（10点）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120〜140時間未満（9点）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月100〜120時間未満（8点）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月80〜100時間未満（7点）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月64〜80時間未満（6点）', value: `${prefix}_employment_6`, points: 6 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中（1か月以上）/ 常時臥床（10点）', value: `${prefix}_illness_10`, points: 10 },
  { label: '精神等で長期加療中（8点）', value: `${prefix}_illness_8`, points: 8 },
  { label: '一般療養（1か月以上）（7点）', value: `${prefix}_illness_7`, points: 7 },
  { label: 'その他（保育困難）（6点）', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級等（日常生活が困難）（10点）', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3〜6級等（生活上一部困難）（7点）', value: `${prefix}_disability_7`, points: 7 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添い（1か月以上）/ 寝たきり介護 / 常時看護（10点）', value: `${prefix}_care_10`, points: 10 },
  { label: 'その他の介護・看護（5点）', value: `${prefix}_care_5`, points: 5 },
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
      { label: '働いている（就学・職業訓練含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 9 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 10 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 10 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 3 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '就学・職業訓練も同じ基準です',
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
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '地域型保育施設の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_grad_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_small_grad_yes', points: 6 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '認可保育所に勤務する有資格者ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '認可保育所勤務（+3）', value: 'adj_nursery_worker_nursery', points: 3 },
      { label: '幼稚園等勤務（+1）', value: 'adj_nursery_worker_kindergarten', points: 1 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_return',
    category: 'adjustment',
    label: '育児休業退園後の復職再利用ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_return_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_infant',
    category: 'adjustment',
    label: '育児休業対象の弟妹の入所申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_infant_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_infant_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産後・育児休業終了後の復帰ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '双子以上の同時申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_twins_yes', points: 1 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '第3子以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_third_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだい2人以上を同時申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいと同じ保育所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_sibling_same_no', points: 0 },
      { label: '転園（きょうだい同一施設希望）（+1）', value: 'adj_sibling_same_transfer', points: 1 },
      { label: '同一保育所希望（+1）', value: 'adj_sibling_same_yes', points: 1 },
    ],
  },
  {
    id: 'adj_commute',
    category: 'adjustment',
    label: '単身赴任ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_commute_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_commute_yes', points: 1 },
    ],
  },
  {
    id: 'adj_special_needs',
    category: 'adjustment',
    label: '特別支援児保育を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_needs_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_special_needs_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居親族が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
  {
    id: 'adj_preschool',
    category: 'adjustment',
    label: '未就学児が他にいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_preschool_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_preschool_yes', points: -1 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '過去に内定を辞退したことがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: '1回（-2）', value: 'adj_declined_1', points: -2 },
      { label: '2回以上（-4）', value: 'adj_declined_2', points: -4 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料の滞納（3か月以上）がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_delinquent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_parental_leave_extend',
    category: 'adjustment',
    label: '育児休業中で延長を許容していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_extend_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_parental_leave_extend_yes', points: -20 },
    ],
  },
];

export const shiroiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
