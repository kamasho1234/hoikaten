import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 印西市 保育の利用調整基準表（令和8年度）
// 出典: R8印西市保育園利用のご案内
// https://www.city.inzai.lg.jp/kosodatenavi/cmsfiles/contents/0000020/20713/R8hoikuennriyounogoannnai.pdf
// ---------------------------------------------------------------------------
// sum方式（父母の基本指数合算+調整指数）。最大12点/親（合計24点）。
// ひとり親世帯は本人の指数+11点を基本指数とする。
// 就労時間は休憩時間を含み、時間外・通勤時間は含まない。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'inzai',
  name: '印西市',
  slug: 'inzai',
  prefecture: '千葉県',
  maxBasePoints: 24,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（又は単身赴任）', value: `${prefix}_employment_11`, points: 11 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月60時間以上80時間未満', value: `${prefix}_employment_6`, points: 6 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上の入院', value: `${prefix}_illness_12a`, points: 12 },
  { label: '1ヶ月以上の常時臥床', value: `${prefix}_illness_12b`, points: 12 },
  { label: '精神疾患等で医師が長期加療（安静）を要すると診断', value: `${prefix}_illness_10`, points: 10 },
  { label: '居宅療養（1ヶ月以上の加療・安静）', value: `${prefix}_illness_9`, points: 9 },
  { label: '一般療養（上記以外で保育が困難）', value: `${prefix}_illness_8`, points: 8 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 療育○A・A1・A2 / 精神1級', value: `${prefix}_disability_12`, points: 12 },
  { label: '身体3〜6級 / 療育B1・B2 / 精神2・3級', value: `${prefix}_disability_10`, points: 10 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅外（1ヶ月以上入院中の親族の付添い）', value: `${prefix}_care_12a`, points: 12 },
  { label: '居宅内（寝たきり・心身障害の親族の常時介護）', value: `${prefix}_care_12b`, points: 12 },
  { label: '居宅内（常時看護・介護が必要と認められる場合）', value: `${prefix}_care_8a`, points: 8 },
  { label: 'その他の介護等', value: `${prefix}_care_8b`, points: 8 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日を含む月及び前後2ヶ月', value: `${prefix}_childbirth_11`, points: 11 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学', value: `${prefix}_education_10`, points: 10 },
  { label: '月140時間以上160時間未満の就学', value: `${prefix}_education_9`, points: 9 },
  { label: '月120時間以上140時間未満の就学', value: `${prefix}_education_8`, points: 8 },
  { label: '月100時間以上120時間未満の就学', value: `${prefix}_education_7`, points: 7 },
  { label: '月80時間以上100時間未満の就学', value: `${prefix}_education_6`, points: 6 },
  { label: '月60時間以上80時間未満の就学', value: `${prefix}_education_5`, points: 5 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '印西市では父母それぞれの基本指数を合算して利用調整を行います（各最大12点、合計24点）',
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
      helpText: '就労時間は休憩時間を含み、時間外勤務・通勤時間は含みません',
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
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者のいずれかが保育士として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '市内の保育所等に勤務（+3）', value: 'adj_nursery_worker_3a', points: 3 },
      { label: '市の非常勤職員に登録中の保育士（+3）', value: 'adj_nursery_worker_3b', points: 3 },
      { label: '幼稚園・認可外・市外の保育所等に勤務（+1）', value: 'adj_nursery_worker_1', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が非自発的離職（整理解雇・倒産等）による求職中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_unemployment_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業・産前産後休業からの復帰に伴う申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居親族が保育可能な状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_unauthorized',
    category: 'adjustment',
    label: '認可外保育施設の利用を常態としていますか？（市内在住者）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unauthorized_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_unauthorized_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいが希望園に在園しており、同じ園を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_same_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだい2人以上で同時に申込みをしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_special_needs',
    category: 'adjustment',
    label: '特別な支援を要する子どもの保育を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_needs_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_special_needs_yes', points: 1 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '待機期間はどのくらいですか？',
    inputType: 'radio',
    options: [
      { label: '6ヶ月未満（又は該当しない）', value: 'adj_waiting_none', points: 0 },
      { label: '6ヶ月以上1年未満（+1）', value: 'adj_waiting_1', points: 1 },
      { label: '1年以上（+2）', value: 'adj_waiting_2', points: 2 },
    ],
  },
];

export const inzaiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
