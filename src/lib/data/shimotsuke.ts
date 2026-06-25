import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 下野市 保育園等入所選考基準表
// 出典: 下野市保育園等入所選考基準表
// https://www.city.shimotsuke.lg.jp/manage/contents/upload/589801e11ea59.pdf
// ---------------------------------------------------------------------------
// sum方式。父母各最大20点。基本点数 + 調整点数で算出。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'shimotsuke',
  name: '下野市',
  slug: 'shimotsuke',
  prefecture: '栃木県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上（20点）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月120時間以上140時間未満（18点）', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上120時間未満（16点）', value: `${prefix}_employment_16`, points: 16 },
  { label: '月80時間以上100時間未満（14点）', value: `${prefix}_employment_14`, points: 14 },
  { label: '月64時間以上80時間未満（11点）', value: `${prefix}_employment_11`, points: 11 },
  { label: '内職（10点）', value: `${prefix}_employment_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上／常時臥床（20点）', value: `${prefix}_illness_20`, points: 20 },
  { label: '重篤な疾病で常時安静（19点）', value: `${prefix}_illness_19`, points: 19 },
  { label: '精神疾患等で常時安静（16点）', value: `${prefix}_illness_16`, points: 16 },
  { label: '1か月以上の加療（15点）', value: `${prefix}_illness_15`, points: 15 },
  { label: 'その他の療養（13点）', value: `${prefix}_illness_13`, points: 13 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、精神1・2級、療育A1・A2・B1（20点）', value: `${prefix}_disability_20`, points: 20 },
  { label: '精神3級、療育B2（18点）', value: `${prefix}_disability_18`, points: 18 },
  { label: '身体3級（16点）', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体4級以下、精神4級以下（10点）', value: `${prefix}_disability_10`, points: 10 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護4・5の親族を介護（18点）', value: `${prefix}_care_18`, points: 18 },
  { label: '要介護3の親族を介護（17点）', value: `${prefix}_care_17`, points: 17 },
  { label: 'その他の介護（16点）', value: `${prefix}_care_16`, points: 16 },
  { label: '同居以外の親族の介護（10点）', value: `${prefix}_care_10`, points: 10 },
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
      { label: '働いている（就学含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産（切迫等）（19点）', value: `${prefix}_reason_childbirth_risk`, points: 19 },
      { label: '出産（通常）（17点）', value: `${prefix}_reason_childbirth`, points: 17 },
      { label: '災害復旧（20点）', value: `${prefix}_reason_disaster`, points: 20 },
      { label: '虐待・DV（20点）', value: `${prefix}_reason_dv`, points: 20 },
      { label: '求職活動中（ハローワーク利用）（8点）', value: `${prefix}_reason_jobseeking`, points: 8 },
      { label: '求職活動中（その他）（4点）', value: `${prefix}_reason_jobseeking_other`, points: 4 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '就学も同じ基準で判定されます',
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
      { label: 'はい（+2）', value: 'adj_single_parent_yes', points: 2 },
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
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_assignment_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が入園中または同時申請ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unauthorized_childcare',
    category: 'adjustment',
    label: '認可外保育施設に入園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unauthorized_childcare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unauthorized_childcare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_childcare_leave_return',
    category: 'adjustment',
    label: '産休・育休明けの入園希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_leave_return_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_childcare_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '市内保育施設に保育士として従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_nursery_worker_yes', points: 30 },
    ],
  },
  {
    id: 'adj_unpaid_fees',
    category: 'adjustment',
    label: '保育料の滞納が3か月以上ありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fees_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_unpaid_fees_yes', points: -20 },
    ],
  },
];

export const shimotsukeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
