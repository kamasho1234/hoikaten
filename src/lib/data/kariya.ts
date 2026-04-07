import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 刈谷市 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------
// 刈谷市は「基本指数」＋「調整指数」の二段階方式。
// 父母それぞれに基本指数を算出し、合算（加算方式）で優先順位を判断。
// 同点の場合は調整指数で判断。各保護者の最大基本指数は20点。
// 出典: 令和8年度 刈谷市保育園等利用調整基準
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kariya',
  name: '刈谷市',
  slug: 'kariya',
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
  { label: '自営業（月64時間以上・添付書類あり）', value: `${prefix}_employment_self_16`, points: 16 },
  { label: '自営業（月64時間以上・添付書類なし）', value: `${prefix}_employment_self_10`, points: 10 },
  { label: '内職（月64時間以上）', value: `${prefix}_employment_naishoku_8`, points: 8 },
  { label: '就労予定（内定あり）', value: `${prefix}_employment_naitei_8`, points: 8 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前産後各8週間）', value: `${prefix}_childbirth_20`, points: 20 },
];

/** 疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中で保育不可能', value: `${prefix}_illness_20`, points: 20 },
  { label: '身体障害1〜2級 / 療育手帳A / 精神1級', value: `${prefix}_illness_18`, points: 18 },
  { label: '身体障害3〜4級 / 療育手帳B / 精神2級', value: `${prefix}_illness_16`, points: 16 },
  { label: '疾病により保育に支障があると医師が認めた', value: `${prefix}_illness_14`, points: 14 },
];

/** 同居親族等の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要（要介護3以上等）', value: `${prefix}_care_18`, points: 18 },
  { label: '週3日以上の通院介助・看護', value: `${prefix}_care_14`, points: 14 },
  { label: '介護を要することがある', value: `${prefix}_care_10`, points: 10 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災等で居所の復旧にあたっている', value: `${prefix}_disaster_20`, points: 20 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月64時間以上の就学・職業訓練', value: `${prefix}_education_14`, points: 14 },
  { label: '通信教育', value: `${prefix}_education_8`, points: 8 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** 育児休業中 */
const childcareLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childcare_leave_none`, points: 0 },
  { label: '入園月の翌月1日までに育児休業から復帰', value: `${prefix}_childcare_leave_10`, points: 10 },
  { label: '入園後3か月以内に育児休業から復帰', value: `${prefix}_childcare_leave_6`, points: 6 },
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
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害にあった', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
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
      label: `${parentLabel}の妊娠・出産の状況は？`,
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
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '同居の親族の介護・看護が対象です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害で保育が必要ですか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのような就学をしていますか？`,
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
// 調整指数の質問（基本指数が同点の場合に使用）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: 'ひとり親手当等を受給（申請）中の場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが認可保育園等を利用中で同一施設を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_facility_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいが同一施設に同時申込みしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 3 },
    ],
  },
  {
    id: 'adj_small_nursery_graduate',
    category: 'adjustment',
    label: '小規模保育事業所・事業所内保育の卒園に伴う入園申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_nursery_graduate_yes', points: 8 },
    ],
  },
  {
    id: 'adj_childcare_leave_return',
    category: 'adjustment',
    label: '入園希望月の翌月1日までに育児休業から復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_leave_return_yes', points: 4 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が刈谷市内の認可保育園等で保育士・看護師として就労（予定）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 10 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '18歳未満の児童を3人以上養育している世帯の第3子以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 3 },
    ],
  },
  {
    id: 'adj_second_child',
    category: 'adjustment',
    label: '18歳未満の児童を2人以上養育している世帯の第2子ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_second_child_no', points: 0 },
      { label: 'はい', value: 'adj_second_child_yes', points: 1 },
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
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '申込児を認可外保育施設に預けていますか？',
    helpText: '申込時点で刈谷市在住で入園要件を満たしている場合',
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
    id: 'adj_twins',
    category: 'adjustment',
    label: '双生児以上の同時申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい', value: 'adj_twins_yes', points: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kariyaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
