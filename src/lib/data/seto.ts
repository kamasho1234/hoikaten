import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 瀬戸市 保育所入所選考基準指数データ
// 出典: R8瀬戸市保育所入所選考基準指数表
// https://www.city.seto.aichi.jp/docs/2011/03/10/00240/files/r8-shisuuhyou.pdf
// ---------------------------------------------------------------------------
// 瀬戸市は「入所指数の低い保護者状況で判定」のmin方式。
// 最大指数10。就労は正社員・中心者(8-10)、専従者・協力者(3-9)、内職(2)。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'seto',
  name: '瀬戸市',
  slug: 'seto',
  prefecture: '愛知県',
  maxBasePoints: 10,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '正社員・中心者またはパート等・月150時間以上かつ月16日以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '正社員・中心者またはパート等・月130時間以上かつ月16日以上', value: `${prefix}_employment_9a`, points: 9 },
  { label: '専従者・協力者・月150時間以上かつ月16日以上', value: `${prefix}_employment_9b`, points: 9 },
  { label: '正社員・中心者またはパート等・月110時間以上かつ月16日以上', value: `${prefix}_employment_8a`, points: 8 },
  { label: '専従者・協力者・月130時間以上かつ月16日以上', value: `${prefix}_employment_8b`, points: 8 },
  { label: '専従者・協力者・月110時間以上かつ月16日以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '専従者・協力者・昼間月80時間以上かつ月16日以上', value: `${prefix}_employment_5`, points: 5 },
  { label: '専従者・協力者・夜間月80時間以上かつ月16日以上', value: `${prefix}_employment_4`, points: 4 },
  { label: '自営（添付書類なし）または月60時間以上', value: `${prefix}_employment_3`, points: 3 },
  { label: '内職（月60時間以上）', value: `${prefix}_employment_2`, points: 2 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上の入院 / 自宅療養で常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '通院加療で常時安静が必要 / 精神障害者保健福祉手帳1・2級', value: `${prefix}_illness_8`, points: 8 },
  { label: '一般療養', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 療育手帳A判定', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳3級 / 療育手帳B判定', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体障害者手帳4級以下 / 療育手帳C判定', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病気等の付添い（月15日以上）/ 寝たきり・重度障害者の常時介護', value: `${prefix}_care_8`, points: 8 },
  { label: 'その他の介護', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産の前後で休養を要する', value: `${prefix}_childbirth_7`, points: 7 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・技能取得のため保育にあたれない', value: `${prefix}_education_6`, points: 6 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '瀬戸市では入所指数の低い保護者の点数で判定されます（最大10点）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
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
      label: `${parentLabel}の就労状況は？`,
      helpText: '昼間の時間帯は午前8時〜午後4時、夜間は午前2時〜午前4時',
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
      { label: 'はい・祖父母同居なし（+3）', value: 'adj_single_parent_3', points: 3 },
      { label: 'はい・祖父母同居あり（+2）', value: 'adj_single_parent_2', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの在園または同時申込について該当するものはありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: '在園児と同じ園にきょうだい入所 / きょうだい同時申込で1人入所可能（+3）', value: 'adj_sibling_3', points: 3 },
      { label: '多胎児の同時申込（+1）', value: 'adj_sibling_1', points: 1 },
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
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休・育休明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母が同居しており、保育ができる状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '市内認可保育施設や認可外施設の卒園による転園ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: '市内認可施設卒園（指数8点以上）による転園（+3）', value: 'adj_unlicensed_3', points: 3 },
      { label: '市内認可施設卒園（その他）による転園（+2）', value: 'adj_unlicensed_2', points: 2 },
      { label: '認可外施設卒園による転園（+1）', value: 'adj_unlicensed_1', points: 1 },
    ],
  },
];

export const setoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
