import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 一関市 保育園入園 基本指数・調整指数データ
// 出典: 一関市児童保育課「令和7年度 保育所等入園案内」参考
// 盛岡市に準じた岩手県標準方式
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ichinoseki',
  name: '一関市',
  slug: 'ichinoseki',
  prefecture: '岩手県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 就労（標準的な段階）
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（20点）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月120時間以上160時間未満（18点）', value: `${prefix}_employment_18`, points: 18 },
  { label: '月80時間以上120時間未満（16点）', value: `${prefix}_employment_16`, points: 16 },
  { label: '月64時間以上80時間未満（14点）', value: `${prefix}_employment_14`, points: 14 },
  { label: '月48時間以上64時間未満（12点）', value: `${prefix}_employment_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 疾病等
// ---------------------------------------------------------------------------

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（20点）', value: `${prefix}_illness_20`, points: 20 },
  { label: '常時臥床（18点）', value: `${prefix}_illness_18`, points: 18 },
  { label: '安静を要する状況（16点）', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院が必要な状態（12点）', value: `${prefix}_illness_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 障害
// ---------------------------------------------------------------------------

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害1・2級、精神障害1級、療育手帳A、介護保険要介護4または5（20点）', value: `${prefix}_disability_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 出産（母のみ）
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前8週〜産後8週（20点）', value: `${prefix}_childbirth_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 介護・看護
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要な場合（20点）', value: `${prefix}_care_20`, points: 20 },
  { label: '月80時間以上の介護（16点）', value: `${prefix}_care_16`, points: 16 },
  { label: '月48時間以上の介護（12点）', value: `${prefix}_care_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 就学
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '大学・大学院・専門学校への通学（18点）', value: `${prefix}_education_18`, points: 18 },
];

// ---------------------------------------------------------------------------
// 職業訓練等
// ---------------------------------------------------------------------------

const trainingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_training_none`, points: 0 },
  { label: '1日6時間以上の訓練（16点）', value: `${prefix}_training_16`, points: 16 },
  { label: '1日4時間以上の訓練（12点）', value: `${prefix}_training_12`, points: 12 },
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
    helpText: '一関市では父母それぞれの基本指数を合算します。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気（疾病等）', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '出産（母のみ）', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '職業訓練等', value: `${prefix}_reason_training`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      helpText: '入院、臥床、安静、通院の状況を選んでください',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の状況は？`,
      helpText: '身体障害1・2級、精神障害1級、療育手帳A、介護保険要介護4または5が対象です',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '産前8週から産後8週が対象です（母のみ）',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '親族の介護・看護の状況を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は大学・大学院・専門学校に通学していますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_training`,
      category,
      label: `${parentLabel}の職業訓練等の時間は？`,
      helpText: '就労に必要な技能習得を目的とする通学の場合',
      inputType: 'radio',
      options: trainingOptions(prefix),
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
    label: 'ひとり親家庭ですか？',
    helpText: '母子または父子家庭の場合、調整指数+5が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'すでに保育施設入園中のきょうだいがいますか？',
    helpText: '1人ごとに+3点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: '1人いる（+3）', value: 'adj_sibling_enrolled_1', points: 3 },
      { label: '2人以上いる（+6）', value: 'adj_sibling_enrolled_2', points: 6 },
    ],
  },
  {
    id: 'adj_same_facility',
    category: 'adjustment',
    label: 'きょうだいが入園している保育施設のみに入園を希望しますか？',
    helpText: '兄弟姉妹が入園中の施設のみを希望する場合に+2点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_same_facility_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_same_facility_yes', points: 2 },
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
    label: '一関市外にお住まいですか？',
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

export const ichinosekiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
