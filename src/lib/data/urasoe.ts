import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 浦添市 保育所等入所基準データ
// 出典: 令和8年度 浦添市保育所等入所基準表
// https://www.city.urasoe.lg.jp/doc/2025071500035/file_contents/file_20251_1.pdf
// ---------------------------------------------------------------------------
// 浦添市は「基本点数（父）＋ 基本点数（母）＋ 調整点数」のsum方式。
// 父母各最大20点。就労は月間時間数で6段階。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'urasoe',
  name: '浦添市',
  slug: 'urasoe',
  prefecture: '沖縄県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '常時入院（1ヶ月以上）または常時臥床', value: `${prefix}_illness_20`, points: 20 },
  { label: '6ヶ月を超える長期的な治療が必要', value: `${prefix}_illness_18`, points: 18 },
  { label: '3〜6ヶ月間の治療が必要', value: `${prefix}_illness_14`, points: 14 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／精神障害1・2級／療育手帳A1・A2・B1', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級／精神障害3級／療育手帳B2', value: `${prefix}_disability_18`, points: 18 },
  { label: '身体障害者手帳4級', value: `${prefix}_disability_16`, points: 16 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '全般的な介護が必要（常時付添い）', value: `${prefix}_care_20`, points: 20 },
  { label: '入浴・排泄等に全面的な介護が必要', value: `${prefix}_care_18`, points: 18 },
  { label: '入浴・排泄等に介護が必要（起き上がり等は可能）', value: `${prefix}_care_15`, points: 15 },
  { label: '入浴・排泄に一部または全般の介護が必要', value: `${prefix}_care_13`, points: 13 },
  { label: '入浴・排泄に一部の介護が必要', value: `${prefix}_care_10`, points: 10 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前後各8週間', value: `${prefix}_childbirth_12`, points: 12 },
  { label: '多胎妊娠の場合', value: `${prefix}_childbirth_18`, points: 18 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '学校に在学中または職業訓練を受けている（就労に準じて算定）', value: `${prefix}_education_20`, points: 20 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_8`, points: 8 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
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
      label: `${parentLabel}の介護の状況は？`,
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
    id: 'adj_sibling',
    category: 'adjustment',
    label: '多子世帯・きょうだい世帯ですか？',
    helpText: '兄弟姉妹がいる世帯、またはそれに準ずる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+26）', value: 'adj_sibling_yes', points: 26 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '母子・父子世帯の場合（施設入所前に限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業取得前に在籍していた保育園への復帰（退所後の職場復帰）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいが在籍する保育園の利用を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_same_yes', points: 3 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '申込の子が多胎児（双子等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_twins_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '市内の認可保育園以外の保育施設に常態的に預けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unlicensed_yes', points: 1 },
    ],
  },
];

export const urasoeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
