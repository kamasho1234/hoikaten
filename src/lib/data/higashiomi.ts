import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 東近江市 利用調整基準（令和8年度）
// 出典: 令和8年度 入園のしおり
// https://www.city.higashiomi.shiga.jp/_res/projects/default_project/_page_/001/008/358/r8.shiori.pdf
// ---------------------------------------------------------------------------
// sum方式（父母の調整指数合算+補正指数）。最大10点/親（合計20点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'higashiomi',
  name: '東近江市',
  slug: 'higashiomi',
  prefecture: '滋賀県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・自営：月20日以上かつ月160時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '外勤・自営：月16日以上かつ月140時間以上', value: `${prefix}_employment_9`, points: 9 },
  { label: '外勤・自営：月16日以上かつ月120時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '外勤・自営：月16日以上かつ月96時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '外勤・自営：月48時間以上（上記以外）', value: `${prefix}_employment_3`, points: 3 },
  { label: '内職：月20日以上かつ月160時間以上', value: `${prefix}_employment_naishoku_6`, points: 6 },
  { label: '内職：月48時間以上（上記以外）', value: `${prefix}_employment_naishoku_3`, points: 3 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・自宅療養等（常時病臥）', value: `${prefix}_illness_10`, points: 10 },
  { label: '精神性・特定疾患による居宅内療養', value: `${prefix}_illness_8`, points: 8 },
  { label: '安静を要する状態（長期安静）', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級 / 療育A / 精神1級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3-4級 / 療育B / 精神2-3級', value: `${prefix}_disability_8`, points: 8 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院で常時付添いが必要', value: `${prefix}_care_10`, points: 10 },
  { label: '居宅内で常時付添いが必要', value: `${prefix}_care_8`, points: 8 },
  { label: '通院付添い（月12日以上・48時間以上）', value: `${prefix}_care_2`, points: 2 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産（産前2ヶ月〜産後8週間）', value: `${prefix}_childbirth_8`, points: 8 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月16日以上かつ月120時間以上の就学', value: `${prefix}_education_8`, points: 8 },
  { label: '月48時間以上の就学', value: `${prefix}_education_2`, points: 2 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備を含む）', value: `${prefix}_jobseeking_2`, points: 2 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に従事', value: `${prefix}_disaster_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonOptions = [
    { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
    { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
    { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
    { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
    ...(parentNum === 2 ? [{ label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 }] : []),
    { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
    { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
    { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
  ];

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '東近江市では父母それぞれの調整指数を合算します（各最大10点、合計20点）',
    inputType: 'select',
    options: reasonOptions,
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '通勤時間も労働時間に含めて判定',
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
    ...(parentNum === 2 ? [{
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio' as const,
      options: childbirthOptions(prefix),
    }] : []),
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に従事していますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
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
    label: 'ひとり親家庭ですか？',
    helpText: '離婚調停中を含む',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+12）', value: 'adj_single_parent_yes', points: 12 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？（就労による自立支援の場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育所等の状況は？',
    helpText: '同時申込み又は在園きょうだいがいる場合',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだい3人以上で3人以上同時申込・在園（+2）', value: 'adj_sibling_2', points: 2 },
      { label: 'きょうだい2人で2人同時申込・在園（+1）', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_twin',
    category: 'adjustment',
    label: '多胎で生まれた児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twin_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_twin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_separation',
    category: 'adjustment',
    label: '父又は母が児童と別居している（又は予定）ですか？',
    helpText: 'ひとり親家庭を除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_separation_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_separation_yes', points: 1 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労内定（就労時間延長予定含む）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_job_offer_yes', points: -1 },
    ],
  },
  {
    id: 'adj_home_child',
    category: 'adjustment',
    label: '6ヶ月以上の未就学児を保護者・親族が自宅で保育していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_home_child_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_home_child_yes', points: -2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の保育可能な祖父母が同居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: '1人同居（-3）', value: 'adj_grandparent_1', points: -3 },
      { label: '2人同居（-6）', value: 'adj_grandparent_2', points: -6 },
    ],
  },
];

export const higashiomiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
