import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 宝塚市 保育園入園 基本指数・調整指数データ
// 出典: 宝塚市 子ども未来部 保育企画課
// 令和8年度 保育施設等の利用調整基準表
// https://www.city.takarazuka.hyogo.jp/kosodate/hoikuen/
// ---------------------------------------------------------------------------

const municipality = {
  id: 'takarazuka',
  name: '宝塚市',
  slug: 'takarazuka',
  prefecture: '兵庫県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大20点）
// ---------------------------------------------------------------------------

/** 就労（外勤・自営） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（フルタイム）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中（1ヶ月以上）', value: `${prefix}_illness_20`, points: 20 },
  { label: '常時病臥（自宅療養で安静が必要）', value: `${prefix}_illness_18`, points: 18 },
  { label: '精神疾患等の療養', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院加療中（月2回以上）', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 療育手帳A', value: `${prefix}_disability_20`, points: 20 },
  { label: '精神障害者保健福祉手帳1・2級', value: `${prefix}_disability_18`, points: 18 },
  { label: '身体障害者手帳3・4級 / 療育手帳B', value: `${prefix}_disability_16`, points: 16 },
  { label: 'その他の手帳所持', value: `${prefix}_disability_12`, points: 12 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護4・5の家族を月120時間以上介護', value: `${prefix}_care_20`, points: 20 },
  { label: '要介護4・5の家族を月80時間以上120時間未満介護', value: `${prefix}_care_16`, points: 16 },
  { label: '要介護4・5の家族を月64時間以上80時間未満介護', value: `${prefix}_care_14`, points: 14 },
  { label: '要介護1〜3の家族を月120時間以上介護', value: `${prefix}_care_18`, points: 18 },
  { label: '要介護1〜3の家族を月80時間以上120時間未満介護', value: `${prefix}_care_14b`, points: 14 },
  { label: '要介護1〜3の家族を月64時間以上80時間未満介護', value: `${prefix}_care_12`, points: 12 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前2ヶ月〜産後8週）', value: `${prefix}_childbirth_20`, points: 20 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上の就学・職業訓練', value: `${prefix}_education_16`, points: 16 },
  { label: '月64時間以上120時間未満の就学・職業訓練', value: `${prefix}_education_12`, points: 12 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労内定（月120時間以上）', value: `${prefix}_jobseeking_10`, points: 10 },
  { label: '就労内定（月64時間以上120時間未満）', value: `${prefix}_jobseeking_8`, points: 8 },
  { label: '求職活動中', value: `${prefix}_jobseeking_2`, points: 2 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

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
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
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
      label: `${parentLabel}はどのくらい介護・看護していますか？`,
      helpText: '介護対象者の状態と月あたりの介護時間を選んでください',
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
      helpText: '月あたりの就学・訓練時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職・就労内定の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '父母の一方が不存在（死亡・離婚・未婚など）の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが保育所等に在園中、または同時申込ですか？',
    helpText: '在園中のきょうだいがいる場合や、きょうだい同時に申し込む場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中で同じ園を第一希望にする', value: 'adj_sibling_same', points: 5 },
      { label: 'きょうだいが在園中（別の園を希望）', value: 'adj_sibling_diff', points: 3 },
      { label: 'きょうだいと同時に申し込む', value: 'adj_sibling_simultaneous', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月64時間以上預けていますか？',
    helpText: '就労等の理由で有料の認可外保育施設に預けている場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰する予定ですか？',
    helpText: '入園に伴い育児休業から復帰する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multi_children',
    category: 'adjustment',
    label: '18歳未満の子どもは何人いますか？（申込児童を含む）',
    helpText: '3人以上で加点されます',
    inputType: 'radio',
    options: [
      { label: '1〜2人', value: 'adj_multi_children_2', points: 0 },
      { label: '3人', value: 'adj_multi_children_3', points: 2 },
      { label: '4人以上', value: 'adj_multi_children_4', points: 4 },
    ],
  },
  {
    id: 'adj_small_nursery_grad',
    category: 'adjustment',
    label: '地域型保育（小規模保育等）を卒園予定ですか？',
    helpText: '小規模保育事業所・家庭的保育事業所等の卒園児が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_grad_no', points: 0 },
      { label: 'はい（連携施設を希望）', value: 'adj_small_nursery_grad_linked', points: 5 },
      { label: 'はい（連携施設以外を希望）', value: 'adj_small_nursery_grad_other', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している65歳未満の祖父母が保育可能な状態ですか？',
    helpText: '65歳未満の無職または月64時間未満就労の祖父母と同居している場合（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const takarazukaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
