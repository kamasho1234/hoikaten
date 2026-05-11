import type { MunicipalityData, Question } from '../types';

// 出典: 石垣市特定教育・保育施設等入所選考に関する要綱（別表第1）
// https://www.city.ishigaki.okinawa.jp/material/files/group/22/nyusyoyoukou.pdf

const municipality = {
  id: 'ishigaki',
  name: '石垣市',
  slug: 'ishigaki',
  prefecture: '沖縄県',
  maxBasePoints: 40, // 父母各20点
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（週40時間以上）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満（週35時間以上）', value: `${prefix}_employment_19`, points: 19 },
  { label: '月120時間以上140時間未満（週30時間以上）', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上120時間未満（週25時間以上）', value: `${prefix}_employment_17`, points: 17 },
  { label: '月80時間以上100時間未満（週20時間以上）', value: `${prefix}_employment_16`, points: 16 },
  { label: '月64時間以上80時間未満（週16時間以上）', value: `${prefix}_employment_15`, points: 15 },
  { label: '月64時間未満（週16時間未満）', value: `${prefix}_employment_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院加療', value: `${prefix}_illness_20`, points: 20 },
  { label: '常時安静が必要（医師の診断あり）', value: `${prefix}_illness_20b`, points: 20 },
  { label: '週4〜5日の保育軽減が必要（医師の診断あり）', value: `${prefix}_illness_18`, points: 18 },
  { label: '週1〜3日の保育軽減が必要（医師の診断あり）', value: `${prefix}_illness_15`, points: 15 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神障害者保健福祉手帳1・2級 / 療育手帳A', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級 / 精神障害者保健福祉手帳3級 / 療育手帳B', value: `${prefix}_disability_18`, points: 18 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護・看護（全面的に必要）', value: `${prefix}_care_20`, points: 20 },
  { label: '一部の介護・看護（定期的に必要）', value: `${prefix}_care_18`, points: 18 },
  { label: '通院付添（定期的）', value: `${prefix}_care_15`, points: 15 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前3か月〜産後6か月', value: `${prefix}_childbirth_17`, points: 17 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上（週40時間以上）', value: `${prefix}_education_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_education_19`, points: 19 },
  { label: '月120時間以上140時間未満', value: `${prefix}_education_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_education_17`, points: 17 },
  { label: '月80時間以上100時間未満', value: `${prefix}_education_16`, points: 16 },
  { label: '月64時間以上80時間未満', value: `${prefix}_education_15`, points: 15 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_4`, points: 4 },
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
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
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
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護していますか？`,
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
    helpText: '母子・父子家庭（未婚・離婚・死別等）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 23 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: 'DV（家庭内暴力）・虐待の被害を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_no', points: 0 },
      { label: 'はい', value: 'adj_dv_yes', points: 40 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童に障がいがありますか？',
    helpText: '身体障害者手帳・療育手帳・精神障害者保健福祉手帳の交付対象',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 16 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '扶養している子どもが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 8 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士等として市内の保育施設に就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 7 },
    ],
  },
];

export const ishigakiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
