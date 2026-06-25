import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 刈谷市 入所選考基準（令和8年度指数一覧表）
// 出典: R8刈谷市入園のご案内
// https://www.city.kariya.lg.jp/_res/projects/default_project/_page_/001/021/027/r8annnai.pdf
// ---------------------------------------------------------------------------
// 刈谷市はsum方式（父等基礎点+母等基礎点+世帯加算-世帯減算）。
// 独自の大きな点数体系。フルタイム就労=170点/親。最大340点（基礎点のみ）。
// 就労時間は休憩・残業を除き4週換算。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kariya',
  name: '刈谷市',
  slug: 'kariya',
  prefecture: '愛知県',
  maxBasePoints: 340,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上（フルタイム相当）', value: `${prefix}_employment_170`, points: 170 },
  { label: '月140時間以上', value: `${prefix}_employment_155`, points: 155 },
  { label: '月130時間以上', value: `${prefix}_employment_140`, points: 140 },
  { label: '月120時間以上', value: `${prefix}_employment_125`, points: 125 },
  { label: '月110時間以上', value: `${prefix}_employment_95`, points: 95 },
  { label: '月100時間以上', value: `${prefix}_employment_80`, points: 80 },
  { label: '月90時間以上', value: `${prefix}_employment_65`, points: 65 },
  { label: '月80時間以上', value: `${prefix}_employment_50`, points: 50 },
  { label: '月70時間以上', value: `${prefix}_employment_35`, points: 35 },
  { label: '月60時間以上', value: `${prefix}_employment_20`, points: 20 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院 / 特定疾病等で常時病臥', value: `${prefix}_illness_180`, points: 180 },
  { label: '週3日以上の通院で保育不可', value: `${prefix}_illness_100`, points: 100 },
  { label: '保育不可の診断書あり', value: `${prefix}_illness_70`, points: 70 },
  { label: '週3日未満の通院で保育不可', value: `${prefix}_illness_50`, points: 50 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 療育A / 精神1級', value: `${prefix}_disability_160`, points: 160 },
  { label: '身体3級 / 療育B / 精神2級', value: `${prefix}_disability_130`, points: 130 },
  { label: '身体4〜6級 / 療育C / 精神3級', value: `${prefix}_disability_100`, points: 100 },
  { label: 'その他', value: `${prefix}_disability_25`, points: 25 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居親族の介護（要介護3〜5 / 身体1・2級等）', value: `${prefix}_care_160`, points: 160 },
  { label: '同居親族の介護（要介護1〜2 / 身体3級等）', value: `${prefix}_care_130`, points: 130 },
  { label: '同居親族の介護（身体4〜6級 / 療育C等）', value: `${prefix}_care_100`, points: 100 },
  { label: '別居親族の介護（要介護1〜5 / 身体1〜3級等）', value: `${prefix}_care_80`, points: 80 },
  { label: 'その他の介護', value: `${prefix}_care_35`, points: 35 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前産後', value: `${prefix}_childbirth_100`, points: 100 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学中（月60時間以上）', value: `${prefix}_education_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '失業（生計中心者）', value: `${prefix}_jobseeking_80`, points: 80 },
  { label: 'その他の求職活動', value: `${prefix}_jobseeking_15`, points: 15 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '刈谷市では父等・母等の基礎点を合算して優先度を決定します。就労時間は休憩・残業を除き4週換算',
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
      helpText: '就労時間は休憩時間・残業時間を除き、4週間で換算します',
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
      { label: 'はい・祖父母別居（+31）', value: 'adj_single_parent_31', points: 31 },
      { label: 'はい・祖父母同一敷地内（+11）', value: 'adj_single_parent_11', points: 11 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者のいずれかが保育に関する仕事をしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '市内で従事（+26）', value: 'adj_nursery_worker_26', points: 26 },
      { label: '市外で従事（+13）', value: 'adj_nursery_worker_13', points: 13 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+21）', value: 'adj_welfare_yes', points: 21 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休から復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_parental_leave_yes', points: 3 },
    ],
  },
  {
    id: 'adj_weekend_work',
    category: 'adjustment',
    label: '父母共に土日勤務がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_weekend_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_weekend_yes', points: 7 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが保育園等に在園または申込中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_yes', points: 4 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '多胎児の同時申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: '双子の同時申込（+10）', value: 'adj_twins_10', points: 10 },
      { label: '三つ子の同時申込（+40）', value: 'adj_twins_40', points: 40 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '市内の認可外保育施設に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+9）', value: 'adj_unlicensed_yes', points: 9 },
    ],
  },
  {
    id: 'adj_selfemployed_low',
    category: 'adjustment',
    label: '自営業で所得割57,700円未満ですか？（受注実績等の添付がない場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_selfemployed_no', points: 0 },
      { label: 'はい（-31）', value: 'adj_selfemployed_yes', points: -31 },
    ],
  },
];

export const kariyaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
