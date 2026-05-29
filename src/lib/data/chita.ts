import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 知多市 保育園入園 基本指数・調整指数データ
// 出典：知多市保育課「知多市保育所等の利用調整に関する基準」参考
// ---------------------------------------------------------------------------
//
// 知多市の選考指数は以下のように算出されます。
//   基本指数 ＝ 父の基本指数 ＋ 母の基本指数
//   選考指数 ＝ 基本指数 ± 調整指数
// 父母各最大20点、合計40点満点です。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'chita',
  name: '知多市',
  slug: 'chita',
  prefecture: '愛知県',
  maxBasePoints: 40, // 父母各20点の合計
} as const;

// ---------------------------------------------------------------------------
// 就労
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（フルタイム）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 疾病
// ---------------------------------------------------------------------------

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・安静を要する（重度）', value: `${prefix}_illness_20`, points: 20 },
  { label: '居宅内療養（中度）', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院加療中（軽度）', value: `${prefix}_illness_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 心身障害
// ---------------------------------------------------------------------------

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1-2級 / 精神1級 / 療育A）', value: `${prefix}_disability_20`, points: 20 },
  { label: '中度（身体3-4級 / 精神2級 / 療育B1）', value: `${prefix}_disability_16`, points: 16 },
  { label: '軽度（身体5-6級 / 精神3級 / 療育B2）', value: `${prefix}_disability_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 介護・看護
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（重度・月160時間以上）', value: `${prefix}_care_20`, points: 20 },
  { label: '介護（中度・月120時間以上）', value: `${prefix}_care_16`, points: 16 },
  { label: '介護（軽度・月64時間以上）', value: `${prefix}_care_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 出産
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・産前産後', value: `${prefix}_childbirth_16`, points: 16 },
];

// ---------------------------------------------------------------------------
// 就学（訓練校等への就学）
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '訓練校等に全日制で就学', value: `${prefix}_education_16`, points: 16 },
  { label: '訓練校等に定時制・通信で就学', value: `${prefix}_education_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 求職活動
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '知多市では父母それぞれの基本指数の合計で選考されます。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '訓練校等に就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      helpText: '雇用・自営業などすべての就労形態が対象です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '対象となる親族の要介護度と月あたりの時間を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は訓練校等に就学していますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: 'ひとり親世帯の場合、調整指数として+5点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが希望する保育施設に在園していますか？',
    helpText: '希望する保育施設にきょうだいが在園している場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設を利用していますか？',
    helpText: '認可外保育施設に預けて就労している場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    helpText: '入所に伴い育児休業から復帰する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '知多市外にお住まいですか？',
    helpText: '市外からの申込の場合は減点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（市内在住）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_outside_city_yes', points: -10 },
    ],
  },
  {
    id: 'adj_grandparent_nearby',
    category: 'adjustment',
    label: '65歳未満の祖父母等と同居していますか？',
    helpText: '保育可能な同居親族がいる場合は減点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_nearby_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_grandparent_nearby_yes', points: -3 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '在園中の保育施設からの転園希望ですか？',
    helpText: '現在通っている認可保育施設から別の認可保育施設への転園を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_transfer_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const chitaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
