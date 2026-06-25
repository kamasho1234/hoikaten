import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 海老名市 保育所入所選考基準データ
// 出典: 海老名市保育の実施手続等を定める要綱（令和7年9月1日改正）
// https://www.city.ebina.kanagawa.jp/guide/kosodate/hoikuen/1014775.html
// PDF: R7.9hoikunojissitetuduki2.pdf（別表第1・第2）
// ---------------------------------------------------------------------------
// 海老名市は「基本指数（父母のうち低い方、最大70点）＋ 予備指数」のmin方式。
// 就労は月間時間数で5段階、疾病・障がいは最大70点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ebina',
  name: '海老名市',
  slug: 'ebina',
  prefecture: '神奈川県',
  maxBasePoints: 70,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_60`, points: 60 },
  { label: '月120時間以上160時間未満', value: `${prefix}_employment_50`, points: 50 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_40`, points: 40 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_30`, points: 30 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_20`, points: 20 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・常時臥床／精神性疾患で常時看護が必要', value: `${prefix}_illness_70`, points: 70 },
  { label: '身体障害者手帳1・2級／愛の手帳1・2度／精神障害1・2級', value: `${prefix}_illness_60`, points: 60 },
  { label: '身体障害者手帳3級／精神障害3級', value: `${prefix}_illness_50`, points: 50 },
  { label: '身体障害者手帳4〜6級／心身の状態で保育に支障', value: `${prefix}_illness_40`, points: 40 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時臥床の方の介護／精神性疾患で常時介護が必要', value: `${prefix}_care_60`, points: 60 },
  { label: '身体障害者手帳1・2級／愛の手帳1・2度／精神障害1・2級の方の介護', value: `${prefix}_care_50`, points: 50 },
  { label: '身体障害者手帳3級／精神障害3級の方の介護', value: `${prefix}_care_40`, points: 40 },
  { label: '身体障害者手帳4〜6級／心身の状態で保育に支障', value: `${prefix}_care_30`, points: 30 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前後各8週間', value: `${prefix}_childbirth_60`, points: 60 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・職業訓練（就労に準じて算定）', value: `${prefix}_education_60`, points: 60 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備含む）', value: `${prefix}_jobseeking_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '海老名市では父母のうち低い方の基本指数（最大70点）で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・障害がある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '1か月あたりの就労時間を選んでください',
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
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '父または母が1人で子育てをしている場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが希望する保育園に在籍していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_yes', points: 5 },
    ],
  },
  {
    id: 'adj_children',
    category: 'adjustment',
    label: '小学生以下の同居の子どもを養育していますか？',
    helpText: '対象児を除く小学生以下の子ども1人あたり+2',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_children_0', points: 0 },
      { label: '1人（+2）', value: 'adj_children_1', points: 2 },
      { label: '2人（+4）', value: 'adj_children_2', points: 4 },
      { label: '3人以上（+6）', value: 'adj_children_3', points: 6 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業・介護休業から復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '認可外保育施設または一時預かりを定期的に利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_unlicensed_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disability_family',
    category: 'adjustment',
    label: '同一世帯に障害者手帳をお持ちの方がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_family_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_disability_family_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '市内の保育施設で就労または就労予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_nursery_worker_yes', points: 10 },
    ],
  },
];

export const ebinaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
