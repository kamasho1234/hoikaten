import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 新発田市 保育園入園 利用調整基準データ
// 出典: 新発田市「令和8年度 入園のご案内」
// https://www.city.shibata.lg.jp/_res/projects/default_project/_page_/001/000/845/r8nyuenshiori.pdf
// ---------------------------------------------------------------------------
// 新発田市は「入園選考基準指数」による選考方式。保護者の就労指数、
// 家庭状況調整指数により優先順位を決定します。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'shibata',
  name: '新発田市',
  slug: 'shibata',
  prefecture: '新潟県',
  maxBasePoints: 100,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（1日8時間以上）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上160時間未満（1日6時間以上）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満（1日6時間以上）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満（1日4時間以上）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '月48時間以上64時間未満', value: `${prefix}_employment_3`, points: 3 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '約1か月以上入院 / 常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '療養が必要（精神性疾病）', value: `${prefix}_illness_8`, points: 8 },
  { label: 'その他一般的な疾病', value: `${prefix}_illness_4`, points: 4 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神1級 / 療育A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級 / 精神2級 / 療育B', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時観察と介護が必要', value: `${prefix}_care_8`, points: 8 },
  { label: 'その他の介護（要介護1以上）', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後各2か月以内', value: `${prefix}_childbirth_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動を継続的に行っている', value: `${prefix}_jobseeking_0`, points: 0 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '新発田市では就労指数と家庭状況調整指数により優先順位を決定します',
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
    label: 'ひとり親世帯（同等の状況を含む）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_welfare_yes', points: 4 },
    ],
  },
  {
    id: 'adj_disability',
    category: 'adjustment',
    label: 'お子さんに障がいはありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_economic_hardship',
    category: 'adjustment',
    label: '家計を中心者の失業や疾病により特に困窮していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_economic_hardship_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_economic_hardship_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいが同じ園に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_same_yes', points: 1 },
    ],
  },
  {
    id: 'adj_no_cooperators',
    category: 'adjustment',
    label: '市内に暮らしている協力者（祖父母等）がいませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（いる）', value: 'adj_no_cooperators_no', points: 0 },
      { label: 'はい（いない）（+2）', value: 'adj_no_cooperators_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業を取得して復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_parental_leave_yes', points: 7 },
    ],
  },
  {
    id: 'adj_abuse_dv',
    category: 'adjustment',
    label: '虐待やDVのおそれがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_dv_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_abuse_dv_yes', points: 10 },
    ],
  },
];

export const sibataData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
