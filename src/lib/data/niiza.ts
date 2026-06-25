import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 新座市 保育園入園 利用調整基準データ
// 出典: 新座市「令和8年度 保育施設入所選考基準表」
// https://www.city.niiza.lg.jp/soshiki/93/hoikusisetugoannai8.html
// ---------------------------------------------------------------------------
// 新座市は「基準点数（父母それぞれ最大30点）＋ 調整点数」の加算方式。
// 合計基準点数最大60点。月の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'niiza',
  name: '新座市',
  slug: 'niiza',
  prefecture: '埼玉県',
  maxBasePoints: 60,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_30`, points: 30 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_29`, points: 29 },
  { label: '月128時間以上140時間未満', value: `${prefix}_employment_28`, points: 28 },
  { label: '月120時間以上128時間未満', value: `${prefix}_employment_27`, points: 27 },
  { label: '月96時間以上120時間未満', value: `${prefix}_employment_25`, points: 25 },
  { label: '月80時間以上96時間未満', value: `${prefix}_employment_24`, points: 24 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上長期入院', value: `${prefix}_illness_30`, points: 30 },
  { label: '児童の保育が不可能', value: `${prefix}_illness_30b`, points: 30 },
  { label: '保育が困難', value: `${prefix}_illness_26`, points: 26 },
  { label: '保育が部分的に困難', value: `${prefix}_illness_22`, points: 22 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1〜2級 / 療育A / 精神1級', value: `${prefix}_disability_30`, points: 30 },
  { label: '身体3級 / 療育B / 精神2級', value: `${prefix}_disability_26`, points: 26 },
  { label: '身体4級 / 療育C / 精神3級', value: `${prefix}_disability_22`, points: 22 },
  { label: '身体5級以下', value: `${prefix}_disability_18`, points: 18 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅外での介護（最大30点）', value: `${prefix}_care_30`, points: 30 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産（母のみ、24点）', value: `${prefix}_childbirth_24`, points: 24 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '新座市では父母それぞれの基準点数（各最大30点）の合計で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
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
      label: `${parentLabel}の介護の状況は？`,
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
    label: 'ひとり親世帯（母子・父子世帯）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい、祖父母同居なし（+18）', value: 'adj_single_parent_yes', points: 18 },
      { label: 'はい、祖父母同居あり（+13）', value: 'adj_single_parent_with_grandparents', points: 13 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休・育休明けでの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_parental_leave_yes', points: 4 },
    ],
  },
  {
    id: 'adj_multiple_children',
    category: 'adjustment',
    label: '申込児童のきょうだいで就学前のお子さんは何人いますか？',
    inputType: 'radio',
    options: [
      { label: '0人', value: 'adj_multiple_children_no', points: 0 },
      { label: '2人（+3）', value: 'adj_multiple_children_2', points: 3 },
      { label: '3人以上（+4）', value: 'adj_multiple_children_3plus', points: 4 },
    ],
  },
  {
    id: 'adj_unaccredited_nursery',
    category: 'adjustment',
    label: '認可外保育施設の利用状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_unaccredited_no', points: 0 },
      { label: '週3日利用（+2）', value: 'adj_unaccredited_3days', points: 2 },
      { label: '週4日以上利用（+4）', value: 'adj_unaccredited_4days', points: 4 },
    ],
  },
  {
    id: 'adj_family_day_care_graduate',
    category: 'adjustment',
    label: '地域型保育事業所を卒園しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_day_care_no', points: 0 },
      { label: 'はい（+60）', value: 'adj_day_care_yes', points: 60 },
    ],
  },
  {
    id: 'adj_nursery_fee_delinquent',
    category: 'adjustment',
    label: '保育料を3か月以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_fee_delinquent_yes', points: -5 },
    ],
  },
  {
    id: 'adj_nursery_refusal',
    category: 'adjustment',
    label: '以前の入所内定を辞退しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_refusal_no', points: 0 },
      { label: 'はい（-7）', value: 'adj_refusal_yes', points: -7 },
    ],
  },
  {
    id: 'adj_transfer_within_year',
    category: 'adjustment',
    label: '同年度内の転園を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_transfer_yes', points: -5 },
    ],
  },
  {
    id: 'adj_non_resident',
    category: 'adjustment',
    label: '市外在住で勤務地も市外ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_resident_yes', points: 0 },
      { label: 'はい（-10）', value: 'adj_non_resident_yes', points: -10 },
    ],
  },
  {
    id: 'adj_educator_in_city',
    category: 'adjustment',
    label: '市内認可保育施設で保育士として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_educator_no', points: 0 },
      { label: 'はい、月20日以上6時間以上（+50）', value: 'adj_educator_full', points: 50 },
      { label: 'はい、それ未満（+25）', value: 'adj_educator_part', points: 25 },
    ],
  },
];

export const niizaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
