import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 上田市 保育所等利用調整基準データ
// 出典: 上田市保育課「令和8年度 保育施設利用案内」
// https://www.city.ueda.nagano.jp/soshiki/hoiku/
// 参考: 同県内（長野市）の指数表に準じた長野県標準方式
// ---------------------------------------------------------------------------
// 上田市は「利用調整点数 = 保護者のうち基本点数の低い方 + 調整点数」の min 方式。
// 最低就労基準: 月64時間以上
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ueda',
  name: '上田市',
  slug: 'ueda',
  prefecture: '長野県',
  maxBasePoints: 100,
  scoringMethod: 'min' as const,
} as const;

/** 就労（雇用） */
const employmentAOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_empA_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_empA_160`, points: 100 },
  { label: '月140〜160時間未満', value: `${prefix}_empA_140`, points: 95 },
  { label: '月120〜140時間未満', value: `${prefix}_empA_120`, points: 90 },
  { label: '月100〜120時間未満', value: `${prefix}_empA_100`, points: 70 },
  { label: '月80〜100時間未満', value: `${prefix}_empA_80`, points: 65 },
  { label: '月64〜80時間未満', value: `${prefix}_empA_64`, points: 60 },
];

/** 就労（自営・親族雇用等） */
const employmentBOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_empB_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_empB_160`, points: 90 },
  { label: '月140〜160時間未満', value: `${prefix}_empB_140`, points: 85 },
  { label: '月120〜140時間未満', value: `${prefix}_empB_120`, points: 80 },
  { label: '月100〜120時間未満', value: `${prefix}_empB_100`, points: 60 },
  { label: '月80〜100時間未満', value: `${prefix}_empB_80`, points: 55 },
  { label: '月64〜80時間未満', value: `${prefix}_empB_64`, points: 50 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の6週前〜出産日の8週後', value: `${prefix}_childbirth_90`, points: 90 },
];

/** 疾病・障害 */
const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1か月以上）・常時臥床', value: `${prefix}_illness_100`, points: 100 },
  { label: '自宅療養：週1回以上の通院を伴う1か月以上の療養', value: `${prefix}_illness_70`, points: 70 },
  { label: '自宅療養：その他乳幼児保育が困難な療養', value: `${prefix}_illness_50`, points: 50 },
  { label: '身体障害者手帳1・2級', value: `${prefix}_disability_sh12`, points: 100 },
  { label: '身体障害者手帳3級', value: `${prefix}_disability_sh3`, points: 80 },
  { label: '身体障害者手帳4級', value: `${prefix}_disability_sh4`, points: 60 },
  { label: '療育手帳A', value: `${prefix}_disability_ryA`, points: 100 },
  { label: '療育手帳B1', value: `${prefix}_disability_ryB1`, points: 60 },
  { label: '療育手帳B2', value: `${prefix}_disability_ryB2`, points: 40 },
  { label: '精神障害者保健福祉手帳1級', value: `${prefix}_disability_se1`, points: 100 },
  { label: '精神障害者保健福祉手帳2級', value: `${prefix}_disability_se2`, points: 80 },
  { label: '精神障害者保健福祉手帳3級', value: `${prefix}_disability_se3`, points: 40 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '在宅介護：重度の親族（就労準用100点）', value: `${prefix}_care_heavy`, points: 100 },
  { label: '在宅介護：上記以外の親族（就労準用90点）', value: `${prefix}_care_other`, points: 90 },
  { label: '通院介護：月140時間以上', value: `${prefix}_care_140`, points: 95 },
  { label: '通院介護：月120〜140時間未満', value: `${prefix}_care_120`, points: 90 },
  { label: '通院介護：月100〜120時間未満', value: `${prefix}_care_100`, points: 70 },
  { label: '通院介護：月80〜100時間未満', value: `${prefix}_care_80`, points: 65 },
  { label: '通院介護：月64〜80時間未満', value: `${prefix}_care_64`, points: 60 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中または起業準備中', value: `${prefix}_jobseeking_20`, points: 20 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_education_160`, points: 100 },
  { label: '月140〜160時間未満', value: `${prefix}_education_140`, points: 95 },
  { label: '月120〜140時間未満', value: `${prefix}_education_120`, points: 90 },
  { label: '月100〜120時間未満', value: `${prefix}_education_100`, points: 70 },
  { label: '月80〜100時間未満', value: `${prefix}_education_80`, points: 65 },
  { label: '月64〜80時間未満', value: `${prefix}_education_64`, points: 60 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '上田市では保護者それぞれの基本点数のうち低い方を採用します。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '会社等に雇用されている', value: `${prefix}_reason_empA`, points: 0 },
      { label: '自営業・親族雇用等', value: `${prefix}_reason_empB`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '仕事を探している・起業準備中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_empA`,
      category,
      label: `${parentLabel}の就労状況は？（会社等に雇用）`,
      helpText: '月64時間以上の就労が必要です（休憩時間を除く）',
      inputType: 'radio',
      options: employmentAOptions(prefix),
    },
    {
      id: `${prefix}_empB`,
      category,
      label: `${parentLabel}の就労状況は？（自営業・親族雇用等）`,
      inputType: 'radio',
      options: employmentBOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動・起業準備中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校・職業訓練に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが希望施設に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中', value: 'adj_sibling_yes', points: 10 },
      { label: 'きょうだいと同時申込み', value: 'adj_sibling_simultaneous', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 20 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月ぎめで預けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 5 },
    ],
  },
];

export const uedaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
