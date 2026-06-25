import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 鹿沼市 保育園入園 利用調整基準データ
// 出典: 鹿沼市「保育所等施設利用調整基準表」
// https://www.city.kanuma.tochigi.jp/0191/info-0000004946-1.html
// ---------------------------------------------------------------------------
// 鹿沼市は「基準指数（父母それぞれ最大10点）＋ 調整指数」の加算方式。
// 合計指数が高い児童から順に選考されます。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kanuma',
  name: '鹿沼市',
  slug: 'kanuma',
  prefecture: '栃木県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上', value: `${prefix}_employment_5`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院または入院見込み', value: `${prefix}_illness_10`, points: 10 },
  { label: '1か月以上継続して保育が困難な場合', value: `${prefix}_illness_8`, points: 8 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '1級もしくは2級', value: `${prefix}_disability_10`, points: 10 },
  { label: '3級', value: `${prefix}_disability_5`, points: 5 },
  { label: '4級から6級', value: `${prefix}_disability_1`, points: 1 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護5・4', value: `${prefix}_care_10`, points: 10 },
  { label: '要介護3', value: `${prefix}_care_8`, points: 8 },
  { label: '上記以外の程度', value: `${prefix}_care_4`, points: 4 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の前後2か月を含む最長5か月', value: `${prefix}_childbirth_8`, points: 8 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '鹿沼市では父母それぞれの基準指数の合計で選考されます',
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
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_loss',
    category: 'adjustment',
    label: '配偶者に不幸がありましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_loss_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_parental_loss_yes', points: 10 },
    ],
  },
  {
    id: 'adj_disability',
    category: 'adjustment',
    label: '児童または児童と生計を一つにしている児童が障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disaster',
    category: 'adjustment',
    label: '災害により家屋が損傷していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disaster_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_disaster_yes', points: 10 },
    ],
  },
  {
    id: 'adj_parental_employment',
    category: 'adjustment',
    label: '保護者が市内の認可保育施設に保育士として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_employment_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_parental_employment_yes', points: 15 },
    ],
  },
  {
    id: 'adj_year_end',
    category: 'adjustment',
    label: '児童が次年度就学を控えていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_year_end_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_year_end_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_enrollment',
    category: 'adjustment',
    label: '第一希望で希望する保育施設に兄弟姉妹が入所していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrollment_no', points: 0 },
      { label: 'はい（+18）', value: 'adj_sibling_enrollment_yes', points: 18 },
    ],
  },
];

export const kanumaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
