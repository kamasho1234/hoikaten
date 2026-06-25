import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 江別市 保育施設入所選考基準表（令和5年4月入所から適用）
// 出典: 江別市保育施設入所選考基準表
// https://www.city.ebetsu.hokkaido.jp/faq/faq5835.html
// ---------------------------------------------------------------------------
// sum方式（父母それぞれの基礎点数を合算+調整点数）。最大10点/親（合計20点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ebetsu',
  name: '江別市',
  slug: 'ebetsu',
  prefecture: '北海道',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上の就労', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上150時間未満の就労', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満の就労', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満の就労', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満の就労', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上80時間未満の就労', value: `${prefix}_employment_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_8`, points: 8 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上 / 常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '自宅療養で保育が困難と診断', value: `${prefix}_illness_8`, points: 8 },
  { label: '自宅療養で保育に支障ありと診断', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '精神1-2級 / 身体1-2級 / 療育A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3級 / 療育B', value: `${prefix}_disability_8`, points: 8 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月120時間以上の介護・看護', value: `${prefix}_care_8`, points: 8 },
  { label: '月100時間以上120時間未満の介護・看護', value: `${prefix}_care_7`, points: 7 },
  { label: '月64時間以上100時間未満の介護・看護', value: `${prefix}_care_6`, points: 6 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月150時間以上の就学', value: `${prefix}_education_10`, points: 10 },
  { label: '月140時間以上150時間未満の就学', value: `${prefix}_education_9`, points: 9 },
  { label: '月120時間以上140時間未満の就学', value: `${prefix}_education_8`, points: 8 },
  { label: '月100時間以上120時間未満の就学', value: `${prefix}_education_7`, points: 7 },
  { label: '月80時間以上100時間未満の就学', value: `${prefix}_education_6`, points: 6 },
  { label: '月64時間以上80時間未満の就学', value: `${prefix}_education_5`, points: 5 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害の復旧に従事', value: `${prefix}_disaster_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_4`, points: 4 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '江別市では父母それぞれの基礎点数を合算します（各最大10点、合計20点）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・けがの治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      ...(parentNum === 2 ? [{ label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 }] : []),
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
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
      label: `${parentLabel}の障がいの程度は？`,
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
      helpText: '就労の基準を準用',
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
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+12）', value: 'adj_single_parent_yes', points: 12 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？（就労による自立支援）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産後休暇・育児休業明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が江別市内の保育施設等で保育業務に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '月120時間以上（+6）', value: 'adj_nursery_worker_120', points: 6 },
      { label: '月100時間以上120時間未満（+5）', value: 'adj_nursery_worker_100', points: 5 },
      { label: '月64時間以上100時間未満（+4）', value: 'adj_nursery_worker_64', points: 4 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '同一世帯員に障がいを有する方がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_family_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが入所中の同一施設への入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: '同一施設への入所（+5）', value: 'adj_sibling_same', points: 5 },
      { label: '別の施設への入所（+2）', value: 'adj_sibling_other', points: 2 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: '複数の児童を同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_children_3plus',
    category: 'adjustment',
    label: '小学校3年生以下の扶養する子が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_children_3plus_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_children_3plus_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖父母と同居していますか？（保育可能な60歳未満）',
    helpText: '身体的・年齢的に保育不可能な場合、就業で保育不可能な場合は除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ（又は60歳以上/就業中）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_grandparent_yes', points: -1 },
    ],
  },
  {
    id: 'adj_extend_leave',
    category: 'adjustment',
    label: '希望施設に入所できない場合、育児休業の延長を許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（延長不可）', value: 'adj_extend_leave_no', points: 0 },
      { label: 'はい（延長可、-10）', value: 'adj_extend_leave_yes', points: -10 },
    ],
  },
];

export const ebetsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
