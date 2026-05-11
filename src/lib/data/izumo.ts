import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 出雲市 保育所入所指数データ
// 出典: 出雲市「令和8年度 保育所入所の手引」
// https://www.city.izumo.shimane.jp/www/contents/1755662359887/simple/R8_tebiki.pdf
// ---------------------------------------------------------------------------
// 出雲市は「基本指数（父母それぞれ最大50点）＋ 調整指数」の加算方式。
// 合計指数 = 父の指数 + 母の指数 + 調整指数
// ---------------------------------------------------------------------------

const municipality = {
  id: 'izumo',
  name: '出雲市',
  slug: 'izumo',
  prefecture: '島根県',
  maxBasePoints: 100, // 父50 + 母50
} as const;

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_50`, points: 50 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_48`, points: 48 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_46`, points: 46 },
  { label: '月112時間以上120時間未満', value: `${prefix}_employment_40`, points: 40 },
  { label: '月96時間以上112時間未満', value: `${prefix}_employment_38`, points: 38 },
  { label: '月80時間以上96時間未満', value: `${prefix}_employment_36`, points: 36 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_34`, points: 34 },
  { label: '月48時間以上64時間未満', value: `${prefix}_employment_32`, points: 32 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・常時病臥（保育がとても困難）', value: `${prefix}_illness_50`, points: 50 },
  { label: '自宅療養で保育が困難', value: `${prefix}_illness_47`, points: 47 },
  { label: '通院加療で保育がやや困難', value: `${prefix}_illness_42`, points: 42 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障がい者手帳1・2級／療育手帳A／精神手帳1級', value: `${prefix}_disability_50`, points: 50 },
  { label: '身体障がい者手帳3級／療育手帳B／精神手帳2級', value: `${prefix}_disability_47`, points: 47 },
  { label: '身体障がい者手帳4〜6級／精神手帳3級', value: `${prefix}_disability_42`, points: 42 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の介護・看護', value: `${prefix}_care_50`, points: 50 },
  { label: '月140時間以上160時間未満', value: `${prefix}_care_48`, points: 48 },
  { label: '月120時間以上140時間未満', value: `${prefix}_care_46`, points: 46 },
  { label: '月96時間以上120時間未満', value: `${prefix}_care_38`, points: 38 },
  { label: '月64時間以上96時間未満', value: `${prefix}_care_34`, points: 34 },
  { label: '月48時間以上64時間未満', value: `${prefix}_care_32`, points: 32 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後各8週間以内', value: `${prefix}_childbirth_50`, points: 50 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学・職業訓練', value: `${prefix}_education_50`, points: 50 },
  { label: '月120時間以上160時間未満', value: `${prefix}_education_46`, points: 46 },
  { label: '月80時間以上120時間未満', value: `${prefix}_education_36`, points: 36 },
  { label: '月48時間以上80時間未満', value: `${prefix}_education_32`, points: 32 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（活動実績あり）', value: `${prefix}_jobseeking_12`, points: 12 },
  { label: '求職活動中（活動実績なし）', value: `${prefix}_jobseeking_10`, points: 10 },
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
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
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
      helpText: '月あたりの就労時間で判定されます',
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
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '月あたりの就学・職業訓練時間を選んでください',
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

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 30 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが希望施設に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中', value: 'adj_sibling_yes', points: 30 },
      { label: 'きょうだいと同時申込み', value: 'adj_sibling_simultaneous', points: 27 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 30 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月ぎめで預けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 10 },
    ],
  },
  {
    id: 'adj_fee_arrears',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_arrears_no', points: 0 },
      { label: 'はい（減点）', value: 'adj_fee_arrears_yes', points: -30 },
    ],
  },
];

export const izumoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
