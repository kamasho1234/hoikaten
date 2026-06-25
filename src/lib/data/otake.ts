import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 大竹市 保育所等入所選考基準データ
// 出典: 大竹市保育所等入所選考基準要綱（別表1・別表2）
// https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html
// ---------------------------------------------------------------------------
// min方式。保護者のうち基準点数の低い方を適用。各最大13点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'otake',
  name: '大竹市',
  slug: 'otake',
  prefecture: '広島県',
  maxBasePoints: 13,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（13点）', value: `${prefix}_employment_13`, points: 13 },
  { label: '月140〜160時間未満（11点）', value: `${prefix}_employment_11`, points: 11 },
  { label: '月120〜140時間未満（9点）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月80〜120時間未満（7点）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月48〜80時間未満（6点）', value: `${prefix}_employment_6`, points: 6 },
  { label: '内職（自宅で日々従事）（5点）', value: `${prefix}_employment_5`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1か月以上）（10点）', value: `${prefix}_illness_10`, points: 10 },
  { label: '重度障害（身体1・2級等）（8点）', value: `${prefix}_illness_8`, points: 8 },
  { label: '通院（週4日以上）/ 中度以下障害（7点）', value: `${prefix}_illness_7`, points: 7 },
  { label: '自宅療養（4点）', value: `${prefix}_illness_4`, points: 4 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院中の家族に常時付添い（9点）', value: `${prefix}_care_9`, points: 9 },
  { label: '重度障害家族の介護（8点）', value: `${prefix}_care_8`, points: 8 },
  { label: '通院付添い（週4日以上）/ 中度障害介護（7点）', value: `${prefix}_care_7`, points: 7 },
  { label: '家族の自宅療養介護（4点）', value: `${prefix}_care_4`, points: 4 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（出産月の前後2か月）（10点）', value: `${prefix}_childbirth_10`, points: 10 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '日々居宅外で就学中（9点）', value: `${prefix}_education_9`, points: 9 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労内定あり（7点）', value: `${prefix}_jobseeking_7`, points: 7 },
  { label: '求職中（未定）（2点）', value: `${prefix}_jobseeking_2`, points: 2 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている（13点）', value: `${prefix}_disaster_13`, points: 13 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
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
      label: `${parentLabel}の出産時期は？`,
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
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
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
      { label: 'はい（祖父母と別居）（+4）', value: 'adj_single_parent_4', points: 4 },
      { label: 'はい（祖父母と同居）（+3）', value: 'adj_single_parent_3', points: 3 },
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
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいについて該当するものはありますか？',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが同じ保育所に在所中（+4）', value: 'adj_sibling_same', points: 4 },
      { label: 'きょうだいが別の保育所に在所中（+3）', value: 'adj_sibling_other', points: 3 },
      { label: 'きょうだいと同時申込（+2）', value: 'adj_sibling_simultaneous', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業・産休明けの入所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_parental_leave_yes', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士等として勤務予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_nursery_worker_yes', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unauthorized',
    category: 'adjustment',
    label: '一時預かりや認可外保育施設を常態的に利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unauthorized_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_unauthorized_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '3人以上の多子世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_multi_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '前年度から1年以上待機していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_waiting_yes', points: 1 },
    ],
  },
  {
    id: 'adj_relative',
    category: 'adjustment',
    label: '65歳未満の同居親族で保育可能な方がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_relative_yes', points: -2 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_delinquent_yes', points: -3 },
    ],
  },
];

export const otakeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
