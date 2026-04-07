import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 豊田市 保育園入園 基本指数・加算指数データ
// ---------------------------------------------------------------------------
// 豊田市は点数制（別表2）。父母それぞれに基本指数を算出し、
// 低い方が世帯の基本指数になる。加算指数は世帯全体で合算。
// 各保護者の最大基本指数は40点（月160時間以上のフルタイム就労）。
// 出典: 令和7年度版 豊田市こども園等のご案内 別表2 選考基準表
// ---------------------------------------------------------------------------

const municipality = {
  id: 'toyota',
  name: '豊田市',
  slug: 'toyota',
  prefecture: '愛知県',
  maxBasePoints: 40,
  scoringMethod: 'min' as const, // 父又は母のうち、点数の低い方が世帯の基本指数
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（正社員・派遣等）', value: `${prefix}_employment_40`, points: 40 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_36`, points: 36 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_34`, points: 34 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_32`, points: 32 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_30`, points: 30 },
  { label: '月60時間以上80時間未満', value: `${prefix}_employment_28`, points: 28 },
  { label: '自営業（添付書類なし）月60時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '内職（添付書類あり）月140時間以上', value: `${prefix}_employment_naishoku_36`, points: 36 },
  { label: '内職（月60時間以上140時間未満 / 添付書類なし）', value: `${prefix}_employment_naishoku_20`, points: 20 },
  { label: '家族従業者（無給）月60時間以上', value: `${prefix}_employment_10`, points: 10 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（出産予定月前後）', value: `${prefix}_childbirth_40`, points: 40 },
];

/** 病気・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院を要するため保育不可能', value: `${prefix}_illness_40`, points: 40 },
  { label: '短時間でも不可能 又は手帳あり', value: `${prefix}_illness_36`, points: 36 },
  { label: 'その他', value: `${prefix}_illness_28`, points: 28 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要', value: `${prefix}_care_36`, points: 36 },
  { label: '介護を要することがある', value: `${prefix}_care_28`, points: 28 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月140時間以上の就学・職業訓練', value: `${prefix}_education_36`, points: 36 },
  { label: '月60時間以上140時間未満の就学・職業訓練', value: `${prefix}_education_20`, points: 20 },
];

/** 通園・通学（付き添い） */
const escortOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_escort_none`, points: 0 },
  { label: '月140時間以上の通園・通学付き添い', value: `${prefix}_escort_36`, points: 36 },
  { label: '月60時間以上140時間未満の通園・通学付き添い', value: `${prefix}_escort_20`, points: 20 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中または予定', value: `${prefix}_jobseeking_10`, points: 10 },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '居所の復旧等', value: `${prefix}_disaster_40`, points: 40 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(
  parentNum: 1 | 2,
): Question[] {
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
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '通園・通学の付き添い', value: `${prefix}_reason_escort`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害にあった', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '豊田市では月あたりの就労時間で点数が決まります',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障がいの状況は？`,
      helpText: '手帳あり：身体障害者手帳1〜3級、療育手帳A・B、精神障がい者保健福祉手帳',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護していますか？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '就学・職業訓練が該当します',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_escort`,
      category,
      label: `${parentLabel}の通園・通学付き添い時間は？`,
      helpText: '療育センター通園なども含みます',
      inputType: 'radio',
      options: escortOptions(prefix),
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
      label: `${parentLabel}は災害で保育が必要ですか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  // 就労実績加算（A・Eの場合のみ）
  const workExperienceQuestions: Question[] = [
    {
      id: `${prefix}_work_experience`,
      category,
      label: `${parentLabel}：雇用開始日（入学日）から3か月以上経過していますか？`,
      helpText: '就労・就学の場合のみ対象です（証明日時点で判定）',
      inputType: 'radio',
      options: [
        { label: '対象外・該当しない', value: `${prefix}_work_experience_none`, points: 0 },
        { label: 'はい（3か月以上経過）', value: `${prefix}_work_experience_yes`, points: 4 },
        { label: 'いいえ（まだ就労・就学を開始していない）', value: `${prefix}_work_experience_not_started`, points: -6 },
      ],
    },
  ];

  return [reasonQuestion, ...detailQuestions, ...workExperienceQuestions];
}

// ---------------------------------------------------------------------------
// 加算指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: '第一希望園にきょうだいが在籍していますか？',
    helpText: '当初入園・5月途中入園の場合は現5歳児を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_facility_yes', points: 7 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだい同時申込みで同一園を第一希望にしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 5 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '入園希望日時点で未就学児の多胎児（双子以上）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（父子又は母子「のみの」世帯）', value: 'adj_single_parent_only', points: 10 },
      { label: 'はい（父子又は母子「の」世帯）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_special_support',
    category: 'adjustment',
    label: '特別な支援が必要な児童で受入れ可能園を希望していますか？',
    helpText: '医療的ケア児・移動支援が必要な児が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_support_no', points: 0 },
      { label: 'はい', value: 'adj_special_support_yes', points: 15 },
    ],
  },
  {
    id: 'adj_branch_graduate',
    category: 'adjustment',
    label: '2歳までの分園を卒園し、本園への入園を希望しますか？',
    helpText: '第二いぼばら・第二青松・第二わかばの卒園児が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_branch_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_branch_graduate_yes', points: 20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const toyotaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
