import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 宇部市 保育の実施選考基準表（令和8年度）
// 出典: R8宇部市保育の実施選考基準表
// https://www.city.ube.yamaguchi.jp/_res/projects/default_project/_page_/001/025/249/r8kijunnhyou.pdf
// ---------------------------------------------------------------------------
// 宇部市はsum方式（父母の合計指数）。最大12点/親（合計24点）。
// 被雇用者・自営中心者(7-12)、自営協力者・在宅・内職(5-10)。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ube',
  name: '宇部市',
  slug: 'ube',
  prefecture: '山口県',
  maxBasePoints: 24,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '被雇用者・自営中心者：月160時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '被雇用者・自営中心者：月140時間以上', value: `${prefix}_employment_11`, points: 11 },
  { label: '被雇用者・自営中心者：月120時間以上', value: `${prefix}_employment_10a`, points: 10 },
  { label: '自営協力者・在宅勤務・内職：月160時間以上', value: `${prefix}_employment_10b`, points: 10 },
  { label: '被雇用者・自営中心者：月100時間以上', value: `${prefix}_employment_9a`, points: 9 },
  { label: '自営協力者・在宅勤務・内職：月140時間以上', value: `${prefix}_employment_9b`, points: 9 },
  { label: '被雇用者・自営中心者：月80時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '自営協力者・在宅勤務・内職：月120時間以上', value: `${prefix}_employment_8b`, points: 8 },
  { label: '被雇用者・自営中心者：月52時間以上', value: `${prefix}_employment_7a`, points: 7 },
  { label: '自営協力者・在宅勤務・内職：月100時間以上', value: `${prefix}_employment_7b`, points: 7 },
  { label: '自営協力者・在宅勤務・内職：月80時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '自営協力者・在宅勤務・内職：月52時間以上', value: `${prefix}_employment_5`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上 / 常時病臥', value: `${prefix}_illness_12`, points: 12 },
  { label: '月複数回の通院加療', value: `${prefix}_illness_7`, points: 7 },
  { label: 'その他の自宅療養', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 療育手帳A / 精神障害者保健福祉手帳1級', value: `${prefix}_disability_12`, points: 12 },
  { label: '身体障害者手帳3級 / 療育手帳B / 精神障害者保健福祉手帳2級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳4〜6級 / 精神障害者保健福祉手帳3級', value: `${prefix}_disability_7`, points: 7 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '施設や病院等への常時付添い', value: `${prefix}_care_12`, points: 12 },
  { label: '要介護3〜5の方の介護', value: `${prefix}_care_10`, points: 10 },
  { label: '要介護1〜2の方の介護', value: `${prefix}_care_7`, points: 7 },
  { label: 'その他の介護', value: `${prefix}_care_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中で医師より安静が必要', value: `${prefix}_childbirth_12`, points: 12 },
  { label: '出産予定日の8週前〜出産日から8週後', value: `${prefix}_childbirth_10`, points: 10 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学中（就労の項に準じる）', value: `${prefix}_education_10`, points: 10 },
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
    helpText: '宇部市では父母それぞれの指数を合算して判定します（各最大12点、合計24点）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '自営は父母が営む事業のほか祖父母経営の事業所勤務を含む',
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
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
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
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者の失業により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_unemployment_yes', points: 5 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '入所児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_disability_child_yes', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者のいずれかが市内の保育所等に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_nursery_worker_yes', points: 7 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休明けによる申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_parental_leave_yes', points: 3 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '第3子以降の児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_third_child_yes', points: 3 },
    ],
  },
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '小規模保育事業所等の卒園による転所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: '小規模卒園・連携施設への転所（+6）', value: 'adj_graduation_6', points: 6 },
      { label: '3歳未満認可・小規模卒園による転所（+5）', value: 'adj_graduation_5', points: 5 },
      { label: '認可外・企業主導型卒園による転所（+2）', value: 'adj_graduation_2', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの同時申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: '多胎児による2人以上の同時申込み（+3）', value: 'adj_sibling_3', points: 3 },
      { label: 'きょうだいによる2人以上の同時申込み（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育可能な祖父母（65歳未満・無職）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: '同居している（-3）', value: 'adj_grandparent_3', points: -3 },
      { label: '市内にいる（-1）', value: 'adj_grandparent_1', points: -1 },
    ],
  },
];

export const ubeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
