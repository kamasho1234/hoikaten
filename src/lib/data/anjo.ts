import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 安城市 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------
// 安城市は「基本指数」＋「調整指数」の二段階方式。
// 父母それぞれに基本指数を算出し、合算（加算方式）で優先順位を判断。
// 各保護者の最大基本指数は20点（合計40点満点）。
// 出典: 令和8年度 安城市保育園等利用調整基準
// https://www.city.anjo.aichi.jp/kurasu/kosodate/hoikuen/
// ---------------------------------------------------------------------------

const municipality = {
  id: 'anjo',
  name: '安城市',
  slug: 'anjo',
  prefecture: '愛知県',
  maxBasePoints: 40,
  // scoringMethod 省略 = デフォルト "sum"（父母の基本指数を合算）
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上勤務（フルタイム）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
  { label: '自営業（添付書類あり）月160時間以上', value: `${prefix}_employment_self_20`, points: 20 },
  { label: '自営業（添付書類あり）月120時間以上160時間未満', value: `${prefix}_employment_self_16`, points: 16 },
  { label: '自営業（添付書類あり）月64時間以上120時間未満', value: `${prefix}_employment_self_10`, points: 10 },
  { label: '自営業（添付書類なし）月64時間以上', value: `${prefix}_employment_self_nosub_8`, points: 8 },
  { label: '内職（月64時間以上）', value: `${prefix}_employment_naishoku_8`, points: 8 },
  { label: '就労予定（内定あり）', value: `${prefix}_employment_naitei_8`, points: 8 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前産後各8週間）', value: `${prefix}_childbirth_14`, points: 14 },
];

/** 病気・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時臥床（保育不可能）', value: `${prefix}_illness_20`, points: 20 },
  { label: '身体障害1〜2級 / 療育手帳A / 精神1級', value: `${prefix}_illness_18`, points: 18 },
  { label: '身体障害3〜4級 / 療育手帳B / 精神2級', value: `${prefix}_illness_14`, points: 14 },
  { label: '通院加療中で保育に支障あり（医師の診断書）', value: `${prefix}_illness_12`, points: 12 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（要介護3以上の同居親族等）', value: `${prefix}_care_18`, points: 18 },
  { label: '月64時間以上の介護・看護', value: `${prefix}_care_14`, points: 14 },
  { label: '月64時間未満の介護・看護', value: `${prefix}_care_8`, points: 8 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学・職業訓練', value: `${prefix}_education_20`, points: 20 },
  { label: '月120時間以上160時間未満の就学・職業訓練', value: `${prefix}_education_16`, points: 16 },
  { label: '月64時間以上120時間未満の就学・職業訓練', value: `${prefix}_education_10`, points: 10 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災等で自宅の復旧にあたっている', value: `${prefix}_disaster_20`, points: 20 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** 育児休業中 */
const childcareLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childcare_leave_none`, points: 0 },
  { label: '入園月中に育児休業から復帰予定', value: `${prefix}_childcare_leave_10`, points: 10 },
  { label: '入園翌月以降に復帰予定', value: `${prefix}_childcare_leave_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1（父）' : '保護者2（母）';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください（複数該当する場合は主たる事由）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害にあった', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_childcare_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '就労時間は残業を含まず、休憩時間を除く規定の時間で判断されます',
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
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害で保育が必要ですか？`,
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
      id: `${prefix}_childcare_leave`,
      category,
      label: `${parentLabel}の育児休業の状況は？`,
      helpText: '育児休業終了に伴う復職の場合は、復帰後の就労時間で判断されます',
      inputType: 'radio',
      options: childcareLeaveOptions(prefix),
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
    helpText: '児童扶養手当を受給（申請）している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが希望園に在籍していますか？',
    helpText: '認可保育所・認定こども園・小規模保育事業所が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_facility_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだい同時申込みで同一園を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児（双子以上）の同時申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 3 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '18歳未満の児童を3人以上養育している世帯の第3子以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 2 },
    ],
  },
  {
    id: 'adj_small_nursery_graduate',
    category: 'adjustment',
    label: '小規模保育事業所・事業所内保育の卒園に伴う入園申込みですか？',
    helpText: '2歳児クラスを卒園して3歳児クラスへの入園が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_nursery_graduate_yes', points: 8 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が安城市内の認可保育施設で保育士・保育教諭として就労（予定）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 6 },
    ],
  },
  {
    id: 'adj_childcare_leave_return',
    category: 'adjustment',
    label: '入園月中に育児休業から復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_leave_return_yes', points: 4 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '申込児を認可外保育施設に月64時間以上預けていますか？',
    helpText: '企業主導型保育を除く届出のある認可外施設が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育可能な65歳未満の祖父母と同居していますか？',
    helpText: '月64時間以上就労・疾病等の場合は「保育できない」と判断されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '入園希望児童またはきょうだいが障がい者手帳等を保有していますか？',
    helpText: '特別児童扶養手当の受給を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい', value: 'adj_disability_child_yes', points: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const anjoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
