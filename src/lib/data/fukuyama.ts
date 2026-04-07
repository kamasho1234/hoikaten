import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 福山市 保育園入園 基準数・調整数データ
// ---------------------------------------------------------------------------
// 福山市は「基準数」＋「調整数」の方式。
// 父母それぞれに基準数を判定し、保護者の基準数を合算する（sum方式）。
// 該当する基準数の類型が複数ある場合は、指数が高いものを1つ用いる。
// 公式資料では具体的な点数ではなく「高⇅低」の相対順位で表記されているため、
// シミュレーター上では順位に応じた点数に変換して表示する。
// 出典: 福山市「利用調整の基準（要旨）」
//   https://www.city.fukuyama.hiroshima.jp/uploaded/life/392097_2407184_misc.pdf
// ---------------------------------------------------------------------------

const municipality = {
  id: 'fukuyama',
  name: '福山市',
  slug: 'fukuyama',
  prefecture: '広島県',
  maxBasePoints: 10, // 就労160h以上 = 最高ランク10点
  scoringMethod: 'sum' as const,
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** (1) 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（常勤・臨時雇用・自営中心者）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月48時間以上80時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '内職・自営補助者', value: `${prefix}_employment_4`, points: 4 },
];

/** (2) 産前・産後 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前3か月〜産後3か月', value: `${prefix}_childbirth_8`, points: 8 },
];

/** (3) 病気・障がい — 病気 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院または安静臥床（家事・送迎等が医師により禁止）', value: `${prefix}_illness_10`, points: 10 },
  { label: '長期加療（日常生活に著しい支障）', value: `${prefix}_illness_8`, points: 8 },
  { label: 'おおむね1か月以上の加療（自立支援医療・骨折など）', value: `${prefix}_illness_6`, points: 6 },
  { label: 'その他', value: `${prefix}_illness_4`, points: 4 },
];

/** (3) 病気・障がい — 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身障1-2級/療育マルA・A/精神1級（重度）', value: `${prefix}_disability_10`, points: 10 },
  { label: '身障3-4級/療育マルB/精神2級（中度）', value: `${prefix}_disability_8`, points: 8 },
  { label: '身障5級以下/療育B/精神3級（軽度）', value: `${prefix}_disability_6`, points: 6 },
];

/** (4) 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（要支援・チェックリスト対象者を除く）', value: `${prefix}_care_8`, points: 8 },
  { label: '上記以外の介護', value: `${prefix}_care_5`, points: 5 },
];

/** (5) 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害の復旧に当たっている', value: `${prefix}_disaster_8`, points: 8 },
];

/** (6) 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '月48時間以上の求職活動（起業準備を含む）', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** (7) 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '専修学校・各種学校に在学または職業訓練受講', value: `${prefix}_education_7`, points: 7 },
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
    helpText: '該当する類型が複数ある場合は指数が高いもの1つを選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧に当たっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている・職業訓練中', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間（休憩時間を含む）を選んでください',
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
      label: `${parentLabel}の病気の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの状況は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護していますか？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校・職業訓練に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_parent_absent',
    category: 'adjustment',
    label: '保護者（父母）の予期せぬ不存在がありますか？',
    helpText: '死亡・勾留・失踪など',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_absent_no', points: 0 },
      { label: 'はい', value: 'adj_parent_absent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '母子及び父子並びに寡婦福祉法による',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 9 },
    ],
  },
  {
    id: 'adj_quasi_single',
    category: 'adjustment',
    label: '離婚前提の別居などでひとり親に準ずる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_quasi_single_no', points: 0 },
      { label: 'はい', value: 'adj_quasi_single_yes', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労により自立支援につながる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 7 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士として市内保育所等に就労していますか？',
    helpText: '該当世帯の児童を除く入所児童が増加する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだいの申込み（里子を含む）', value: 'adj_sibling_apply', points: 5 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '産休・育休明けの職場復帰ですか？',
    helpText: '雇用形態の変更を伴うものは除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_return_yes', points: 4 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '集団保育が可能な障がい児・医療的ケア児の申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい', value: 'adj_disability_child_yes', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児が同一の保育所等を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 2 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任中ですか？',
    helpText: '保護者間で補完的な保育ができない場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労予定ですか？',
    helpText: '世帯転入の場合は主たる生計維持者を除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい（減点）', value: 'adj_job_offer_yes', points: -1 },
    ],
  },
  {
    id: 'adj_withdrawal',
    category: 'adjustment',
    label: '過去に自己都合で入所決定後に取下げをしたことがありますか？',
    helpText: '児童の病気・保護者の失職等やむを得ない場合は除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_withdrawal_no', points: 0 },
      { label: 'はい（減点）', value: 'adj_withdrawal_yes', points: -2 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料等の滞納がありますか？',
    helpText: '納付誓約を行っていない、または履行していない場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: 'はい（減点）', value: 'adj_delinquent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_fraud',
    category: 'adjustment',
    label: '認定等に関し過去に不正がありますか？',
    helpText: '不正の解消が確認できていない場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fraud_no', points: 0 },
      { label: 'はい（減点）', value: 'adj_fraud_yes', points: -4 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const fukuyamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
