import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 徳島市 保育園入園 基礎指数・調整指数データ
// 出典：徳島市 子ども未来部子ども保育課 利用調整基準
// https://www.city.tokushima.tokushima.jp/kosodate/hoikuen/
// ---------------------------------------------------------------------------
//
// 徳島市の利用調整は以下のように算出されます。
//   合計指数 ＝ 父の基礎指数 ＋ 母の基礎指数 ＋ 調整指数
// 父母それぞれの基礎指数は最大20点。合計で最大40点満点です。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tokushima',
  name: '徳島市',
  slug: 'tokushima',
  prefecture: '徳島県',
  maxBasePoints: 40, // 父20+母20
} as const;

// ---------------------------------------------------------------------------
// ① 就労（家庭外・家庭内）
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上の就労', value: `${prefix}_emp_20`, points: 20 },
  { label: '月20日以上かつ1日6時間以上の就労', value: `${prefix}_emp_18`, points: 18 },
  { label: '月16日以上かつ1日6時間以上の就労', value: `${prefix}_emp_16`, points: 16 },
  { label: '月16日以上かつ1日4時間以上の就労', value: `${prefix}_emp_14`, points: 14 },
  { label: '月12日以上かつ1日4時間以上の就労', value: `${prefix}_emp_12`, points: 12 },
  { label: '月64時間以上の就労', value: `${prefix}_emp_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// ② 疾病
// ---------------------------------------------------------------------------

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥・感染症など（重度）', value: `${prefix}_illness_20`, points: 20 },
  { label: '安静を要する状態（中度）', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院加療が必要（軽度）', value: `${prefix}_illness_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// ③ 障害
// ---------------------------------------------------------------------------

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級、精神障害者保健福祉手帳1級、療育手帳A（重度）', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3・4級、精神障害者保健福祉手帳2級、療育手帳B（中度）', value: `${prefix}_disability_16`, points: 16 },
  { label: 'その他の障害で保育が困難な場合（軽度）', value: `${prefix}_disability_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// ④ 介護・看護
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護・看護が必要（重度：寝たきり・重度障害者の介護等）', value: `${prefix}_care_20`, points: 20 },
  { label: '介護・看護に多くの時間を要する（中度）', value: `${prefix}_care_16`, points: 16 },
  { label: '介護・看護が一定程度必要（軽度）', value: `${prefix}_care_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// ⑤ 出産
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前8週〜産後8週）', value: `${prefix}_childbirth_16`, points: 16 },
];

// ---------------------------------------------------------------------------
// ⑥ 就学（高校・大学・職業訓練等）
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上の就学', value: `${prefix}_education_20`, points: 20 },
  { label: '月20日以上かつ1日6時間以上の就学', value: `${prefix}_education_18`, points: 18 },
  { label: '月16日以上かつ1日6時間以上の就学', value: `${prefix}_education_16`, points: 16 },
  { label: '月16日以上かつ1日4時間以上の就学', value: `${prefix}_education_14`, points: 14 },
  { label: '月12日以上かつ1日4時間以上の就学', value: `${prefix}_education_12`, points: 12 },
  { label: '月64時間以上の就学', value: `${prefix}_education_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// ⑦ 求職活動
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_6`, points: 6 },
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
    helpText: '徳島市では父母それぞれの基礎指数（最大20点）を合算した値が基礎点数になります（合計40点満点）。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '働いている（就労）', value: `${prefix}_reason_emp`, points: 0 },
      { label: '病気・けが（疾病）', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_emp`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '家庭外・家庭内を問わず、就労時間に応じて指数が決まります',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      helpText: '入院中・安静が必要・通院加療の程度によって指数が異なります',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の状況は？`,
      helpText: '障害者手帳の等級に応じて指数が決まります',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '同居・別居を問わず、親族等の介護・看護をしている場合が対象です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産予定日の前後各8週が対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      helpText: '就労と同じ基準で就学時間に応じて指数が決まります',
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

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '配偶者の死亡・離別・行方不明等によるひとり親世帯の場合、調整指数+5が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが既に希望の保育施設に在園していますか？',
    helpText: '対象児童のきょうだいが既に希望の認可保育施設に在園している場合、+3が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: 'きょうだいの同時入所を希望していますか？',
    helpText: 'きょうだい（多胎児含む）の同時入所を希望する場合に+2が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設を利用していますか？',
    helpText: '認可外保育施設に預けながら認可保育施設への入所を希望する場合に+3が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_ninkagai_yes', points: 3 },
    ],
  },
  {
    id: 'adj_ikukyu',
    category: 'adjustment',
    label: '育休明けで復帰予定ですか？',
    helpText: '育児休業から復帰して入所を希望する場合に+2が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_ikukyu_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '生活保護を受給している場合に+3が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '徳島市外に在住ですか？',
    helpText: '徳島市外に在住の方が徳島市内の保育施設を希望する場合、−10の減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（徳島市内に在住）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外在住 −10）', value: 'adj_outside_city_yes', points: -10 },
    ],
  },
  {
    id: 'adj_relative_can_care',
    category: 'adjustment',
    label: '同居の祖父母等が保育できる状態にありますか？',
    helpText: '65歳未満の同居親族が保育できる場合、−3の減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（同居親族なし、または65歳以上）', value: 'adj_relative_can_care_no', points: 0 },
      { label: 'はい、保育できる同居親族がいる（−3）', value: 'adj_relative_can_care_yes', points: -3 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '在園中の保育施設からの転園希望ですか？',
    helpText: '既に認可保育施設に在園中で別の園への転園を希望する場合、−5の減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（転園希望 −5）', value: 'adj_transfer_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const tokushimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
