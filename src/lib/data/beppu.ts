import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 別府市 保育園入園 基本指数・調整指数データ
// 出典: 別府市こども福祉課「令和7年度 保育所等利用調整基準」
// https://www.city.beppu.oita.jp/
// 参考: 大分市に準じた大分県標準方式
// ---------------------------------------------------------------------------

const municipality = {
  id: 'beppu',
  name: '別府市',
  slug: 'beppu',
  prefecture: '大分県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月135時間以上150時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月120時間以上135時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '月64時間以上100時間未満', value: `${prefix}_employment_16`, points: 16 },
];

/** 疾病・障害（保護者自身） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中 / 重度の心身障害（身体1-2級・療育A・精神1級）', value: `${prefix}_illness_20`, points: 20 },
  { label: '医師が「保育ができない」と判断 / 中程度の障害（身体3級〜・療育B・精神2-3級）', value: `${prefix}_illness_17`, points: 17 },
  { label: '医師が「保育が困難」と判断', value: `${prefix}_illness_14`, points: 14 },
  { label: '医師が「保育が望ましい」と判断 / 保育の必要性の記載なし', value: `${prefix}_illness_12`, points: 12 },
];

/** 看護・介護（同居親族） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院の付き添い / 重度障害の常時介護 / 要介護認定', value: `${prefix}_care_18`, points: 18 },
  { label: '週4日以上の通院付き添い / 中程度障害の常時介護 / 要支援認定 / 多胎児きょうだい', value: `${prefix}_care_16`, points: 16 },
  { label: '週4日未満の通院付き添い / 介護認定「自立」', value: `${prefix}_care_14`, points: 14 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（出産予定日の約2か月前〜出産後2か月）', value: `${prefix}_childbirth_20`, points: 20 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月150時間以上の通学・職業訓練', value: `${prefix}_education_20`, points: 20 },
  { label: '月135時間以上の通学・職業訓練', value: `${prefix}_education_19`, points: 19 },
  { label: '月120時間以上の通学・職業訓練', value: `${prefix}_education_18`, points: 18 },
  { label: '月100時間以上の通学・職業訓練', value: `${prefix}_education_17`, points: 17 },
  { label: '月64時間以上100時間未満の通学・職業訓練', value: `${prefix}_education_16`, points: 16 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（開業準備含む）', value: `${prefix}_jobseeking_10`, points: 10 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている', value: `${prefix}_disaster_20`, points: 20 },
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
      { label: '病気・障害がある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の看護・介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
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
      label: `${parentLabel}の病気・障害の状況は？`,
      helpText: '診断書や手帳の等級に応じて選んでください',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい看護・介護をしていますか？`,
      helpText: '同居親族の看護・介護の頻度を選んでください',
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
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '月あたりの通学時間を選んでください',
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

// ---------------------------------------------------------------------------
// 調整点数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    helpText: '離婚調停中・離婚裁判中またはこれらに準ずる場合を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    helpText: 'きょうだいが在園中の場合は加点があります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中で、同じ園（連携施設含む）を希望する', value: 'adj_sibling_same', points: 3 },
      { label: 'きょうだい同時申込み', value: 'adj_sibling_simultaneous', points: 1 },
    ],
  },
  {
    id: 'adj_ikukyu',
    category: 'adjustment',
    label: '育児休業から復帰する予定ですか？',
    helpText: '育児休業明けの場合は加点があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_no', points: 0 },
      { label: 'はい', value: 'adj_ikukyu_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任またはこれに準ずる状況ですか？',
    helpText: '離婚前別居を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '申込児童が認可外保育施設に通っていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか（受給・申請中）？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multiple_children',
    category: 'adjustment',
    label: '養育している子どもの人数は3人以上ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_children_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_tatai',
    category: 'adjustment',
    label: '多胎児（双子・三つ子など）に係る申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tatai_no', points: 0 },
      { label: 'はい', value: 'adj_tatai_yes', points: 1 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '現在の状況は就労予定・就学予定ですか？',
    helpText: 'まだ就労・就学していないが、内定・合格等で予定がある場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい', value: 'adj_job_offer_yes', points: -2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const beppuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
