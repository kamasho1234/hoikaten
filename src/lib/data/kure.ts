import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 呉市 保育園入園 ランク（基本指数）・調整指数データ
// ---------------------------------------------------------------------------
// 呉市は広島県の中核市で、広島市と同様に「ランク制」＋「調整指数」の二段階方式。
// 父母それぞれにランクを判定し、低い方のランクが世帯のランクになる。
// シミュレーター上ではランクを点数に変換して表示する:
//   S→9, A→8, B→7, C→6, D→5, E→4, F→3, G→2
// 出典: 呉市こども施設課「保育所等入所のご案内」
//   https://kure-kosodate.com/service/3639.html
//   https://www.city.kure.lg.jp/soshiki/27/
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kure',
  name: '呉市',
  slug: 'kure',
  prefecture: '広島県',
  maxBasePoints: 8, // ランクA = 8点（就労等の最高ランク）
  scoringMethod: 'min' as const, // 低い方のランクが世帯ランク
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（居宅外・自営中心者） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（ランクA）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月120時間以上160時間未満（ランクB）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月64時間以上120時間未満（ランクC）', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間未満（ランクD）', value: `${prefix}_employment_5`, points: 5 },
];

/** 就労（居宅内・内職） */
const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月120時間以上（ランクC）', value: `${prefix}_homework_6`, points: 6 },
  { label: '月64時間以上120時間未満（ランクD）', value: `${prefix}_homework_5`, points: 5 },
  { label: '月64時間未満（ランクE）', value: `${prefix}_homework_4`, points: 4 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時臥床（ランクA）', value: `${prefix}_illness_8`, points: 8 },
  { label: '精神疾患等で日常生活に支障（ランクB）', value: `${prefix}_illness_7`, points: 7 },
  { label: 'その他の傷病で通院・安静が必要（ランクC）', value: `${prefix}_illness_6`, points: 6 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級/療育A/精神1級（ランクA）', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体3-4級/療育B/精神2-3級（ランクB）', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体5-6級/その他（ランクC）', value: `${prefix}_disability_6`, points: 6 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時看護・病院付添（ランクA）', value: `${prefix}_care_8`, points: 8 },
  { label: '月120時間以上の在宅介護（ランクB）', value: `${prefix}_care_7`, points: 7 },
  { label: '月64時間以上120時間未満（ランクC）', value: `${prefix}_care_6`, points: 6 },
  { label: '月64時間未満（ランクD）', value: `${prefix}_care_5`, points: 5 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前6週〜産後8週）（ランクC）', value: `${prefix}_childbirth_6`, points: 6 },
];

/** 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上（ランクB）', value: `${prefix}_education_7`, points: 7 },
  { label: '月64時間以上120時間未満（ランクC）', value: `${prefix}_education_6`, points: 6 },
  { label: '月64時間未満（ランクD）', value: `${prefix}_education_5`, points: 5 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中（ランクG）', value: `${prefix}_jobseeking_2`, points: 2 },
];

/** 育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業中で復帰予定あり（ランクF）', value: `${prefix}_parental_leave_3`, points: 3 },
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
    helpText: '呉市ではランク制で判定されます。いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている（居宅外・自営中心者）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（居宅内・内職）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_parental_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '居宅外勤務・自営業の中心者が対象です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の居宅内就労・内職の時間は？`,
      helpText: '自営補助者・内職が対象です',
      inputType: 'radio',
      options: homeworkOptions(prefix),
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
      label: `${parentLabel}の障害の状況は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護をしていますか？`,
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
      label: `${parentLabel}はどのくらい学校・職業訓練に通っていますか？`,
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
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
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
    helpText: 'ひとり親の場合、ランクが引き上げられ調整指数も加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    helpText: 'きょうだい在園と同時申込の加点は重複しません',
    inputType: 'radio',
    options: [
      { label: 'きょうだいなし／該当なし', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだいが同一施設に在園中（+4）', value: 'adj_sibling_enrolled', points: 4 },
      { label: 'きょうだいと同時に申し込む（+2）', value: 'adj_sibling_simultaneous', points: 2 },
    ],
  },
  {
    id: 'adj_ikukyu_return',
    category: 'adjustment',
    label: '育休明けの復帰ですか？',
    helpText: '育児休業から復帰して保育所に預ける場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_return_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_ikukyu_return_yes', points: 3 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士・幼稚園教諭等として市内施設で勤務していますか？',
    helpText: '保育士、幼稚園教諭、保育教諭として勤務している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_hoikushi_yes', points: 5 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設等を利用中ですか？',
    helpText: '認可外保育施設・企業主導型保育事業所等に月64時間以上預けている場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_ninkagai_yes', points: 3 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒園児童ですか？',
    helpText: '小規模保育所・家庭的保育事業等の卒園（予定含む）の場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_chiikigata_no', points: 0 },
      { label: '連携施設への入所希望（+10）', value: 'adj_chiikigata_linked', points: 10 },
      { label: '連携施設以外への入所希望（+5）', value: 'adj_chiikigata_other', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の無職の祖父母等と同居していますか？',
    helpText: '保育できる同居親族がいる場合、減点となることがあります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kureData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
