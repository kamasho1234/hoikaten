import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 小牧市 保育施設入所選考基準指数データ
// 出典: 令和8年度保育施設入所選考基準指数表
// https://www.city.komaki.aichi.jp/material/files/group/35/r8shisuuhyou.pdf
// ---------------------------------------------------------------------------
// 小牧市は「同一世帯の内で最も指数の低い人で判定」のmin方式。
// 最大指数10。就労は外勤・自営中心者(7-10)、自営協力者(3-6)、内職(3)。
// 調整表は4カテゴリ各1つ選択。就労時間は残業含まず休憩含む(1日1h上限)。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'komaki',
  name: '小牧市',
  slug: 'komaki',
  prefecture: '愛知県',
  maxBasePoints: 10,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・自営中心者・月140時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '外勤・自営中心者・月120時間以上', value: `${prefix}_employment_9`, points: 9 },
  { label: '外勤・自営中心者・月90時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '外勤・自営中心者・月60時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '自営協力者・月140時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '自営協力者・月120時間以上', value: `${prefix}_employment_5`, points: 5 },
  { label: '自営協力者・月90時間以上', value: `${prefix}_employment_4`, points: 4 },
  { label: '自営協力者・月60時間以上 または 内職', value: `${prefix}_employment_3`, points: 3 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上の入院加療', value: `${prefix}_illness_10`, points: 10 },
  { label: '自宅での療養が必要（診断書有）', value: `${prefix}_illness_8`, points: 8 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中で安静・加療を要する（診断書有）', value: `${prefix}_childbirth_8`, points: 8 },
  { label: '産前・産後で休養を要する', value: `${prefix}_childbirth_4`, points: 4 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護3以上・身体障害1級・精神障害1級・療育手帳A判定の方を常時介護', value: `${prefix}_care_8`, points: 8 },
  { label: '上記以外の介護・看護', value: `${prefix}_care_5`, points: 5 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '職業訓練施設等に月60時間以上通所', value: `${prefix}_education_6`, points: 6 },
  { label: '就学（月60時間以上）', value: `${prefix}_education_5`, points: 5 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_1`, points: 1 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '小牧市では世帯内で最も指数の低い方の点数で判定されます（最大10点）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気で入院・療養中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '就労時間は残業を含まず、休憩時間（1日1時間上限）を含みます',
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校・職業訓練に通っていますか？`,
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
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '【調整1】産後休業明け・育児休業明けですか？',
    helpText: '調整1からは1項目のみ適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '【調整3】ひとり親家庭または両親が不存在の世帯ですか？',
    helpText: '調整3からは最も高い1項目のみ適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '【調整3】きょうだいが在園または同時申請していますか？',
    helpText: 'ひとり親家庭に該当する場合はそちらが優先されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだい2人（+1）', value: 'adj_sibling_1', points: 1 },
      { label: 'きょうだい3人以上または多胎児（+3）', value: 'adj_sibling_3', points: 3 },
    ],
  },
  {
    id: 'adj_small_nursery',
    category: 'adjustment',
    label: '【調整3】小規模保育事業の卒園者ですか？（4月入園選考のみ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_small_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '【調整3】生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
];

export const komakiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
