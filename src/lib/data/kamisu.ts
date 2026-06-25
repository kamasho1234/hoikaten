import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 神栖市 保育施設利用調整基準指数
// 出典: 神栖市保育施設利用調整基準指数・調整指数一覧表 令和8年度
// https://www.city.kamisu.ibaraki.jp/kodomo/youho/1001646/1001659.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大20点。基準指数 + 調整指数で算出。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kamisu',
  name: '神栖市',
  slug: 'kamisu',
  prefecture: '茨城県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月175時間以上（20点）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月170時間以上175時間未満（19点）', value: `${prefix}_employment_19`, points: 19 },
  { label: '月165時間以上170時間未満（18点）', value: `${prefix}_employment_18`, points: 18 },
  { label: '月160時間以上165時間未満（17点）', value: `${prefix}_employment_17`, points: 17 },
  { label: '月150時間以上160時間未満（16点）', value: `${prefix}_employment_16`, points: 16 },
  { label: '月140時間以上150時間未満（15点）', value: `${prefix}_employment_15`, points: 15 },
  { label: '月130時間以上140時間未満（14点）', value: `${prefix}_employment_14`, points: 14 },
  { label: '月120時間以上130時間未満（13点）', value: `${prefix}_employment_13`, points: 13 },
  { label: '月110時間以上120時間未満（12点）', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上110時間未満（11点）', value: `${prefix}_employment_11`, points: 11 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院（1か月以上）（20点）', value: `${prefix}_illness_20`, points: 20 },
  { label: '安静を要する状態（18点）', value: `${prefix}_illness_18`, points: 18 },
  { label: '通院加療・自宅療養（16点）', value: `${prefix}_illness_16`, points: 16 },
  { label: 'その他の自宅療養（12点）', value: `${prefix}_illness_12`, points: 12 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、精神1・2級、知的A（20点）', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体3級、知的B（16点）', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体4級以下、知的C（14点）', value: `${prefix}_disability_14`, points: 14 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '親族の長期入院付添い・自宅療養介護・月175時間以上（20点）', value: `${prefix}_care_20`, points: 20 },
  { label: '月120時間以上の介護（13点）', value: `${prefix}_care_13`, points: 13 },
  { label: '月64時間以上の介護（11点）', value: `${prefix}_care_11`, points: 11 },
  { label: '上記以外で必要と認められる場合（10点）', value: `${prefix}_care_10`, points: 10 },
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
      { label: '妊娠・出産（12点）', value: `${prefix}_reason_childbirth`, points: 12 },
      { label: '災害復旧（10点）', value: `${prefix}_reason_disaster`, points: 10 },
      { label: '死亡・離婚・未婚・拘禁等（20点）', value: `${prefix}_reason_absence`, points: 20 },
      { label: '求職活動中（1点）', value: `${prefix}_reason_jobseeking`, points: 1 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '就学・職業訓練も同じ基準です（休憩時間含む、通勤時間含まず）',
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
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_facility',
    category: 'adjustment',
    label: 'きょうだいが保育施設に入所していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_facility_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_facility_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_transfer',
    category: 'adjustment',
    label: 'きょうだいが在園する施設への転園希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_transfer_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_transfer_yes', points: 4 },
    ],
  },
  {
    id: 'adj_unauthorized_use',
    category: 'adjustment',
    label: '認可外保育施設等を月64時間以上・直近2か月以上利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unauthorized_use_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_unauthorized_use_yes', points: 4 },
    ],
  },
  {
    id: 'adj_regional_grad',
    category: 'adjustment',
    label: '地域型保育事業の卒園児で連携園以外への転園希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_regional_grad_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_regional_grad_yes', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_worker_licensed',
    category: 'adjustment',
    label: '保育士・看護師等として市内保育施設に勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_licensed_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_nursery_worker_licensed_yes', points: 20 },
    ],
  },
  {
    id: 'adj_nursery_worker_other',
    category: 'adjustment',
    label: '保育士等以外で市内保育施設に勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_other_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_nursery_worker_other_yes', points: 10 },
    ],
  },
  {
    id: 'adj_grandparent_available',
    category: 'adjustment',
    label: '同居の65歳未満の祖父母が無職または就労64時間未満ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_available_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_grandparent_available_yes', points: -2 },
    ],
  },
  {
    id: 'adj_unpaid_fees',
    category: 'adjustment',
    label: '保育料・給食費の未納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fees_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_unpaid_fees_yes', points: -10 },
    ],
  },
];

export const kamisuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
