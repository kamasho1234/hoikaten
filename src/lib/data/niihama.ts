import type { MunicipalityData, Question } from '../types';

// 出典: 新居浜市保育所等利用調整基準表
// https://www.city.niihama.lg.jp/soshiki/128/hoikusisetunonyuushomousikomihouhou.html

const municipality = {
  id: 'niihama',
  name: '新居浜市',
  slug: 'niihama',
  prefecture: '愛媛県',
  maxBasePoints: 30, // 父母各15点
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_15`, points: 15 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_13`, points: 13 },
  { label: '月80時間以上120時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_11`, points: 11 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院加療', value: `${prefix}_illness_15`, points: 15 },
  { label: '精神性疾患（医師の診断あり）', value: `${prefix}_illness_13`, points: 13 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の介護・看護', value: `${prefix}_care_15`, points: 15 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中・産後', value: `${prefix}_childbirth_13`, points: 13 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学', value: `${prefix}_education_15`, points: 15 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中・失業中', value: `${prefix}_jobseeking_3`, points: 3 },
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
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・療養中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
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
      label: `${parentLabel}の病気・療養の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護していますか？`,
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
      label: `${parentLabel}は学校に通っていますか？`,
      helpText: '月あたりの授業・学習時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '母子家庭・父子家庭',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童に障がい（身体障害者手帳1・2級等）がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 4 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: 'DV（家庭内暴力）・虐待の被害を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_no', points: 0 },
      { label: 'はい', value: 'adj_dv_yes', points: 15 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同一施設に在籍（または同時申込）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居する65歳未満の祖父母が保育にあたれる状態ですか？',
    helpText: '同居かつ保育が可能な場合（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
];

export const niihamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
