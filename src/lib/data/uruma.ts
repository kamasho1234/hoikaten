import type { MunicipalityData, Question } from '../types';

// 出典: うるま市保育所入所選考基準表（令和6年度）
// https://www.city.uruma.lg.jp/documents/8960/29504tensu.pdf

const municipality = {
  id: 'uruma',
  name: 'うるま市',
  slug: 'uruma',
  prefecture: '沖縄県',
  maxBasePoints: 60, // 父母各30点
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月200時間以上', value: `${prefix}_employment_30`, points: 30 },
  { label: '月190時間以上200時間未満', value: `${prefix}_employment_29`, points: 29 },
  { label: '月180時間以上190時間未満', value: `${prefix}_employment_28`, points: 28 },
  { label: '月170時間以上180時間未満', value: `${prefix}_employment_27`, points: 27 },
  { label: '月160時間以上170時間未満', value: `${prefix}_employment_26`, points: 26 },
  { label: '月150時間以上160時間未満', value: `${prefix}_employment_25`, points: 25 },
  { label: '月140時間以上150時間未満', value: `${prefix}_employment_24`, points: 24 },
  { label: '月130時間以上140時間未満', value: `${prefix}_employment_23`, points: 23 },
  { label: '月120時間以上130時間未満', value: `${prefix}_employment_22`, points: 22 },
  { label: '月110時間以上120時間未満', value: `${prefix}_employment_21`, points: 21 },
  { label: '月100時間以上110時間未満', value: `${prefix}_employment_20`, points: 20 },
  { label: '月90時間以上100時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月80時間以上90時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_17`, points: 17 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上の入院加療', value: `${prefix}_illness_30`, points: 30 },
  { label: '週40時間以上の保育軽減が必要（医師の診断）', value: `${prefix}_illness_26`, points: 26 },
  { label: '週35時間以上の保育軽減が必要（医師の診断）', value: `${prefix}_illness_24`, points: 24 },
  { label: '週25時間以上の保育軽減が必要（医師の診断）', value: `${prefix}_illness_20`, points: 20 },
  { label: '週20時間以上の保育軽減が必要（医師の診断）', value: `${prefix}_illness_18`, points: 18 },
  { label: '週16時間以上の保育軽減が必要（医師の診断）', value: `${prefix}_illness_17`, points: 17 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神障害者保健福祉手帳1級 / 療育手帳A1・A2 / 障害年金1級', value: `${prefix}_disability_30`, points: 30 },
  { label: '精神障害者保健福祉手帳2級 / 障害年金2級', value: `${prefix}_disability_27`, points: 27 },
  { label: '身体障害者手帳3級 / 療育手帳B1', value: `${prefix}_disability_21`, points: 21 },
  { label: '身体障害者手帳4級以下 / 精神障害者保健福祉手帳3級 / 療育手帳B2', value: `${prefix}_disability_15`, points: 15 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週40時間以上の介護・看護', value: `${prefix}_care_30`, points: 30 },
  { label: '週35時間以上40時間未満の介護・看護', value: `${prefix}_care_26`, points: 26 },
  { label: '週25時間以上35時間未満の介護・看護', value: `${prefix}_care_24`, points: 24 },
  { label: '週20時間以上25時間未満の介護・看護', value: `${prefix}_care_20`, points: 20 },
  { label: '週16時間以上20時間未満の介護・看護', value: `${prefix}_care_18`, points: 18 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前6週〜産後8週', value: `${prefix}_childbirth_24`, points: 24 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_education_26`, points: 26 },
  { label: '月140時間以上160時間未満', value: `${prefix}_education_24`, points: 24 },
  { label: '月120時間以上140時間未満', value: `${prefix}_education_22`, points: 22 },
  { label: '月90時間以上120時間未満', value: `${prefix}_education_19`, points: 19 },
  { label: '月64時間以上90時間未満', value: `${prefix}_education_18`, points: 18 },
  { label: '通信制（月64時間以上）', value: `${prefix}_education_9`, points: 9 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_9`, points: 9 },
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
      { label: '病気・けがの治療中', value: `${prefix}_reason_illness`, points: 0 },
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
      helpText: '月あたりの労働時間（休憩時間含む）を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・けがの状況は？`,
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
      helpText: '週あたりの介護・看護時間を選んでください',
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
    label: 'ひとり親家庭ですか？',
    helpText: '未婚・死別・離別・離婚調停中・行方不明・拘禁等',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 40 },
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
    id: 'adj_disability_household',
    category: 'adjustment',
    label: '同一世帯に障がい者がいますか？',
    helpText: '申込児童本人・きょうだい・祖父母・扶養義務者が対象',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_household_no', points: 0 },
      { label: 'はい', value: 'adj_disability_household_yes', points: 6 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '扶養しているこどもが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_new',
    category: 'adjustment',
    label: 'きょうだいが認可保育施設に在園中ですか？（新規申込）',
    helpText: 'きょうだいが選考時点で在園している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_new_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_new_yes', points: 5 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '申込児童は多胎児（双子等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい（双子）', value: 'adj_twins_yes', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士・幼稚園教諭等として保育施設に就労していますか？',
    helpText: '認可保育所・認定こども園・認可外保育所・幼稚園での有資格者就労',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 200 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: 'うるま市外にお住まいですか？',
    helpText: '転入予定者は除く（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（うるま市在住）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外在住）', value: 'adj_outside_city_yes', points: -150 },
    ],
  },
];

export const urumaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
