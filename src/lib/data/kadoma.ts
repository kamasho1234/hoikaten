import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 門真市 教育・保育施設等の利用に関する実施基準
// 出典: 門真市 教育・保育施設等の利用に関する実施基準
// https://www.city.kadoma.osaka.jp/material/files/group/32/kizyunten_20241101.pdf
// ---------------------------------------------------------------------------
// 門真市はsum方式（父母の合計指数）。最大10点/親（合計20点）。
// ひとり親等は10点+もう一方の点数で算定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kadoma',
  name: '門真市',
  slug: 'kadoma',
  prefecture: '大阪府',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上の就労', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上160時間未満の就労', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満の就労', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満の就労', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満の就労', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上80時間未満の就労', value: `${prefix}_employment_5`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院 / 重度の疾病で常時安静が必要', value: `${prefix}_illness_10`, points: 10 },
  { label: '長期間の通院・加療が必要', value: `${prefix}_illness_7`, points: 7 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神障害者保健福祉手帳1級 / 療育手帳A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級 / 精神障害者保健福祉手帳2級 / 療育手帳B1', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳5・6級 / 精神障害者保健福祉手帳3級 / 療育手帳B2', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '臥床者・重症心身障害者等の常時介護・付添い', value: `${prefix}_care_10`, points: 10 },
  { label: '月120時間以上の介護・介添え', value: `${prefix}_care_7`, points: 7 },
  { label: '月120時間未満の介護・介添え', value: `${prefix}_care_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後2ヶ月（多胎妊娠は14週間前）', value: `${prefix}_childbirth_6`, points: 6 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・職業訓練：月120時間以上', value: `${prefix}_education_8`, points: 8 },
  { label: '就学・職業訓練：月120時間未満', value: `${prefix}_education_7`, points: 7 },
  { label: '通信教育', value: `${prefix}_education_6`, points: 6 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '月64時間未満の就労かつ求職活動中', value: `${prefix}_jobseeking_2`, points: 2 },
  { label: '未就労で求職活動中', value: `${prefix}_jobseeking_1`, points: 1 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '門真市では父母それぞれの指数を合算して判定します（各最大10点、合計20点）',
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
    label: 'ひとり親世帯ですか？（祖父母等と同居していない場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '利用希望日より1ヶ月以内に育休から復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '申請児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_disability_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者のいずれかが市内の教育・保育施設で保育士等として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '保育士・保育教諭（+3）', value: 'adj_nursery_worker_3', points: 3 },
      { label: '子育て支援員（+2）', value: 'adj_nursery_worker_2', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが教育・保育施設を利用中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に申請していますか？（きょうだい利用中の加点とは重複不可）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '小規模保育施設等の卒園による転所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_graduation_yes', points: 3 },
    ],
  },
  {
    id: 'adj_cohabitant',
    category: 'adjustment',
    label: '18歳以上65歳未満の無職の同居者がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_cohabitant_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_cohabitant_yes', points: -2 },
    ],
  },
];

export const kadomaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
