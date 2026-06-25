import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 千歳市 利用調整基準（令和8年度）
// 出典: R8千歳市利用ガイドブック（第2版）
// https://www.city.chitose.lg.jp/docs/11596.html
// ---------------------------------------------------------------------------
// sum方式（父母の基本点数合算+調整点数）。最大100点/親（合計200点）。
// ひとり親世帯は本人の基本点数+100点を世帯の基本点数とする。
// 就労時間には休憩時間を含む。居宅内外の区別なし。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'chitose',
  name: '千歳市',
  slug: 'chitose',
  prefecture: '北海道',
  maxBasePoints: 200,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_70`, points: 70 },
  { label: '月75時間以上100時間未満', value: `${prefix}_employment_60`, points: 60 },
  { label: '月48時間以上75時間未満', value: `${prefix}_employment_50`, points: 50 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院又は入院相当（日常生活不能）', value: `${prefix}_illness_100`, points: 100 },
  { label: '通院加療・常時安静（保育が著しく困難）', value: `${prefix}_illness_70`, points: 70 },
  { label: '疾病により保育に支障がある', value: `${prefix}_illness_50`, points: 50 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 精神1・2級 / 療育A', value: `${prefix}_disability_100`, points: 100 },
  { label: '身体3級 / 精神3級 / 療育B・C', value: `${prefix}_disability_80`, points: 80 },
  { label: 'その他の身体障害者手帳所持', value: `${prefix}_disability_60`, points: 60 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時看護・介護（月160時間以上）', value: `${prefix}_care_100`, points: 100 },
  { label: '入院・通院・通所付添い（月100時間以上）', value: `${prefix}_care_70`, points: 70 },
  { label: '入院・通院・通所付添い（月48時間以上）', value: `${prefix}_care_50`, points: 50 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前後2ヶ月', value: `${prefix}_childbirth_80`, points: 80 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上の就学', value: `${prefix}_education_80`, points: 80 },
  { label: '月48時間以上の就学', value: `${prefix}_education_50`, points: 50 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定あり（月160時間以上の就労予定）', value: `${prefix}_jobseeking_70`, points: 70 },
  { label: '内定あり（月120時間以上の就労予定）', value: `${prefix}_jobseeking_60`, points: 60 },
  { label: '内定あり（月100時間以上の就労予定）', value: `${prefix}_jobseeking_50`, points: 50 },
  { label: '内定あり（月48時間以上の就労予定）', value: `${prefix}_jobseeking_40`, points: 40 },
  { label: '求職中（就労先未定）', value: `${prefix}_jobseeking_30`, points: 30 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '千歳市では父母それぞれの基本点数を合算して利用調整を行います（各最大100点、合計200点）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 100 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '就労時間には休憩時間を含みます。居宅内外の区別なし',
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
      helpText: '介護サービス利用時間を除く',
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
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は仕事を探していますか？`,
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
      { label: 'はい・求職中（+50）', value: 'adj_single_parent_50', points: 50 },
      { label: 'はい・求職中以外（+20）', value: 'adj_single_parent_20', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で自立支援のため必要と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_welfare_yes', points: 30 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業後に復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_parental_leave_yes', points: 20 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者がリストラ・倒産等による非自発的失業ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_unemployment_yes', points: 20 },
    ],
  },
  {
    id: 'adj_disability_family',
    category: 'adjustment',
    label: '精神または身体に障害を有する同居親族がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_family_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_disability_family_yes', points: 10 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '父母のいずれかが単身赴任ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_assignment_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが保育施設等に在籍していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_sibling_enrolled_yes', points: 50 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sibling_simultaneous_yes', points: 10 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '第3子以降の申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_third_child_yes', points: 10 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '市内の認可保育施設等に保育士として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '月140時間以上勤務（+45）', value: 'adj_nursery_worker_45', points: 45 },
      { label: '月48時間以上140時間未満勤務（+40）', value: 'adj_nursery_worker_40', points: 40 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母が児童の保育が可能な状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: '同居している（-10）', value: 'adj_grandparent_10', points: -10 },
      { label: '市内に在住している（-5）', value: 'adj_grandparent_5', points: -5 },
    ],
  },
  {
    id: 'adj_employer_relative',
    category: 'adjustment',
    label: '雇用主が保護者または配偶者の親族ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_employer_relative_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_employer_relative_yes', points: -5 },
    ],
  },
  {
    id: 'adj_preschool_sibling',
    category: 'adjustment',
    label: '申込児童以外に申込みのない未就学児（きょうだい）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_preschool_sibling_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_preschool_sibling_yes', points: -10 },
    ],
  },
];

export const chitoseData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
