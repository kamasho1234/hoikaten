import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 一宮市 保育所入所認定基準データ
// ---------------------------------------------------------------------------
// 一宮市は父母それぞれに基準指数を算定し、合算した世帯の指数で決定する（加算方式）。
// 各保護者の最大基準指数は10点（月160時間以上の外勤・自営中心者）。
// 出典: 一宮市保育所入所認定基準（資料2）令和7年2月改正
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ichinomiya',
  name: '一宮市',
  slug: 'ichinomiya',
  prefecture: '愛知県',
  maxBasePoints: 10,
} as const;

// ---------------------------------------------------------------------------
// 保護者ごとの基準指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 外勤・自営中心者・農業中心者（通学は外勤に準ずる） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・自営中心者：月160時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '外勤・自営中心者：月140時間以上', value: `${prefix}_employment_9`, points: 9 },
  { label: '外勤・自営中心者：月120時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '自営中心者：月100時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '外勤・自営中心者：月80時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '農業中心者：月70時間以上', value: `${prefix}_employment_5`, points: 5 },
  { label: '外勤・自営中心者：月60時間以上', value: `${prefix}_employment_4`, points: 4 },
];

/** 自営（居宅外・居宅内）協力者・農業協力者 */
const selfEmployedAssistOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_assist_none`, points: 0 },
  { label: '自営協力者：月120時間以上', value: `${prefix}_assist_7`, points: 7 },
  { label: '自営協力者：月105時間以上', value: `${prefix}_assist_6`, points: 6 },
  { label: '自営協力者：月90時間以上', value: `${prefix}_assist_5`, points: 5 },
  { label: '農業協力者：月75時間以上', value: `${prefix}_assist_4`, points: 4 },
  { label: '自営・農業協力者：月60時間以上', value: `${prefix}_assist_3`, points: 3 },
];

/** 内職 */
const naishokuOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_naishoku_none`, points: 0 },
  { label: '内職：月140時間以上', value: `${prefix}_naishoku_4`, points: 4 },
  { label: '内職：月60時間以上', value: `${prefix}_naishoku_3`, points: 3 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産（産前3か月〜産後2か月）', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（概ね1か月以上）', value: `${prefix}_illness_10`, points: 10 },
  { label: '自宅療養：常時臥床（概ね1か月以上）', value: `${prefix}_illness_10b`, points: 10 },
  { label: '自宅療養（一般療養）：週3日以上の通院＋加療', value: `${prefix}_illness_6`, points: 6 },
  { label: '自宅療養：安静加療を要する', value: `${prefix}_illness_5`, points: 5 },
  { label: '障害：1・2級またはA・B判定程度', value: `${prefix}_illness_disability_10`, points: 10 },
  { label: '障害：3級またはC判定程度', value: `${prefix}_illness_disability_6`, points: 6 },
  { label: '障害：上記以外で必要とする場合', value: `${prefix}_illness_disability_5`, points: 5 },
];

/** 看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院・通院付添：月140時間以上（重度心身障害者等）', value: `${prefix}_care_8`, points: 8 },
  { label: '入院・通院付添：月80時間以上', value: `${prefix}_care_6`, points: 6 },
  { label: '入院・通院付添：月80時間未満', value: `${prefix}_care_4`, points: 4 },
  { label: '居宅内介護：全介護を必要とする場合', value: `${prefix}_care_home_7`, points: 7 },
  { label: '居宅内介護：一部介護を必要とする場合', value: `${prefix}_care_home_5`, points: 5 },
  { label: '看護・介護：上記以外で必要とする場合', value: `${prefix}_care_other_3`, points: 3 },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害の復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 就学（通信制大学等 ※通学は外勤に準ずる） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '学生（通信制大学等）', value: `${prefix}_education_3`, points: 3 },
];

/** その他 */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '育児休業取得中', value: `${prefix}_other_ikukyu_1`, points: 1 },
  { label: '就労予定（求職中）', value: `${prefix}_other_jobseeking_1`, points: 1 },
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
      { label: '仕事をしている（外勤・自営中心者）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（自営・農業協力者）', value: `${prefix}_reason_assist`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_naishoku`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の看護・介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害にあった', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '学校に通っている（通信制等）', value: `${prefix}_reason_education`, points: 0 },
      { label: 'その他（育休中・求職中）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間は？（外勤・自営中心者・農業中心者）`,
      helpText: '一宮市では月あたりの就労時間で基準指数が決まります。通学は外勤に準じます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_assist`,
      category,
      label: `${parentLabel}の就労時間は？（自営・農業協力者）`,
      helpText: '自営業の協力者（居宅外・居宅内）または農業協力者の場合',
      inputType: 'radio',
      options: selfEmployedAssistOptions(prefix),
    },
    {
      id: `${prefix}_naishoku`,
      category,
      label: `${parentLabel}の内職時間は？`,
      inputType: 'radio',
      options: naishokuOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      helpText: '産前3か月〜産後2か月が対象。出産予定日の当月と前月は基準指数10点になります',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障がいの状況は？`,
      helpText: '手帳の等級：身体障害者手帳1〜3級、療育手帳A・B・C判定',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
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
      label: `${parentLabel}は通信制大学等に通っていますか？`,
      helpText: '通学（通信制以外）の場合は外勤に準じます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}のその他の状況は？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数（加点）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '父または母のいずれかを、生計が一ではないと認定した場合のみ',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 15 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '市内の保育園等で保育士・保育教諭として就労していますか？',
    helpText: '市内の保育園・認定こども園・地域型保育事業所が対象',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（現在就労中）', value: 'adj_nursery_worker_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '希望する保育所にきょうだいが在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児（双子以上）が入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 2 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '18歳未満の子が3人以上いる世帯で、3番目以降の児童の入園ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const ichinomiyaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
