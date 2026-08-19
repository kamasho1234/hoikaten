import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 飯塚市 保育所等 利用調整基準指数表データ
//
// 出典: 飯塚市保育課「利用調整基準指数表」
//       https://www.city.iizuka.lg.jp/uploaded/attachment/16165.pdf
//       （飯塚市Webサイト「保育所（園）・こども園入所手続き」
//         https://www.city.iizuka.lg.jp/hoiku/kenko/hoiku/hoikuen/nyusyo.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式指数表を読み取って全面的に置き換えた。
//             公式の指数は保護者ごとに最大50点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の構成: 指数情報（類型）No.1〜17で父・母・世帯員それぞれの状況に指数を設定し、
//   No.18「加点・減点項目」で世帯状況・児童状況・その他を加算する。
//   父・母・世帯員の類型はいずれも同じ細目・同じ指数のため、本データでは保護者1・2の質問として
//   実装している（世帯員の類型は原典どおり別枠だが、シミュレーターでは父母のみを対象とする）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'iizuka',
  name: '飯塚市',
  slug: 'iizuka',
  prefecture: '福岡県',
  maxBasePoints: 100, // 指数は保護者ごとに最大50点、父母合計で100点
} as const;

// ---------------------------------------------------------------------------
// 指数情報（類型）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上の就労', value: `${prefix}_employment_50`, points: 50 },
  { label: '月120時間から160時間未満の就労', value: `${prefix}_employment_45`, points: 45 },
  { label: '月90時間から120時間未満の就労', value: `${prefix}_employment_35`, points: 35 },
  { label: '月60時間から90時間未満の就労', value: `${prefix}_employment_30`, points: 30 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産', value: `${prefix}_childbirth_30`, points: 30 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '入院、常時病臥または安静を要し、保育が日常的に困難',
    value: `${prefix}_illness_50`,
    points: 50,
  },
  { label: '上記以外の場合で保育が困難', value: `${prefix}_illness_30`, points: 30 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '保育が日常的に困難と認められる', value: `${prefix}_disability_50`, points: 50 },
  { label: '保育が生活上、一部困難', value: `${prefix}_disability_45`, points: 45 },
];

/** 介護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '看護・介護・付添：常時介護を要す',
    value: `${prefix}_care_30`,
    points: 30,
  },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災・風水害・火災その他の災害の復興中',
    value: `${prefix}_disaster_50`,
    points: 50,
  },
];

/** 求職活動・就学・育児休暇・その他 */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '育児休暇中', value: `${prefix}_other_50`, points: 50 },
  { label: '就学', value: `${prefix}_other_40`, points: 40 },
  { label: '求職中：継続児童', value: `${prefix}_other_30`, points: 30 },
  { label: '求職中', value: `${prefix}_other_10`, points: 10 },
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
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      {
        label: '求職活動・就学・育児休暇・その他',
        value: `${prefix}_reason_other`,
        points: 0,
      },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は出産に該当しますか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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
      label: `${parentLabel}の障がいの程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護・付添の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復興中ですか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}の求職活動・就学・育児休暇の状況は？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// No.18 加点・減点項目
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '母子または父子の世帯ですか？',
    helpText: '世帯状況',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 55 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいで同時に申し込みますか？',
    helpText: '世帯状況',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 5 },
    ],
  },
  {
    id: 'adj_child_status',
    category: 'adjustment',
    label: '児童の在園・入所の状況は？',
    helpText: '児童状況',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_child_status_none', points: 0 },
      {
        label: '希望保育所にきょうだいが在園している',
        value: 'adj_child_status_sibling',
        points: 100,
      },
      {
        label: '現在入所中で、同じ園の継続入所を希望する',
        value: 'adj_child_status_continue',
        points: 100,
      },
      {
        label:
          '小規模保育事業等の地域型保育事業所の卒園児童が、引き続き連携施設の入所を希望する',
        value: 'adj_child_status_graduate',
        points: 100,
      },
    ],
  },
  {
    id: 'adj_child_welfare',
    category: 'adjustment',
    label: '児童福祉法に基づき保育を要しますか？',
    helpText: 'その他',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_child_welfare_yes', points: 100 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保育施設等勤務職員の子ですか？',
    helpText: 'その他',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_worker_yes', points: 50 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const iizukaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
