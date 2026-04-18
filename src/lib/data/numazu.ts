import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 沼津市 保育所等利用調整基準データ
// 出典: 沼津市「保育所等の利用調整に関する基準」
// 計算方式: sum（保護者それぞれの利用基準指数を合算）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'numazu',
  name: '沼津市',
  slug: 'numazu',
  prefecture: '静岡県',
  maxBasePoints: 18, // 父母各9点（被雇用月150時間以上）
} as const;

/** 就労（被雇用） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '被雇用：月150時間（週37.5時間）以上', value: `${prefix}_employment_9`, points: 9 },
  { label: '被雇用：月120時間（週30時間）以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '被雇用：月100時間（週25時間）以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '被雇用：月80時間（週20時間）以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '被雇用：月64時間（週16時間）以上', value: `${prefix}_employment_5`, points: 5 },
  { label: '自営（主たる従事者）：月120時間以上', value: `${prefix}_employment_self_main120`, points: 6 },
  { label: '自営（主たる従事者）：月64時間以上', value: `${prefix}_employment_self_main64`, points: 4 },
  { label: '自営（協力者）：月120時間以上', value: `${prefix}_employment_self_sub120`, points: 5 },
  { label: '自営（協力者）：月64時間以上', value: `${prefix}_employment_self_sub64`, points: 3 },
  { label: '内職：月120時間以上', value: `${prefix}_employment_piece120`, points: 6 },
  { label: '内職：月64時間以上', value: `${prefix}_employment_piece64`, points: 4 },
  { label: '就労先確定（就労時間等内容が未定）', value: `${prefix}_employment_confirmed`, points: 5 },
];

/** 疾病・療養 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院または入院見込み', value: `${prefix}_illness_9a`, points: 9 },
  { label: '常時臥床（寝たきり）', value: `${prefix}_illness_9b`, points: 9 },
  { label: '精神疾患により自宅療養（1か月以上）', value: `${prefix}_illness_7`, points: 7 },
  { label: '一般療養（安静を要する状態、1か月以上）', value: `${prefix}_illness_6`, points: 6 },
  { label: '一般療養（通院加療）', value: `${prefix}_illness_4`, points: 4 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳・精神障害者保健福祉手帳1・2級 / 療育手帳所持', value: `${prefix}_disability_9`, points: 9 },
  { label: '身体障害者手帳・精神障害者保健福祉手帳3級所持', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体障害者手帳4級以下所持', value: `${prefix}_disability_5`, points: 5 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1か月以上の入院付き添い', value: `${prefix}_care_9a`, points: 9 },
  { label: '重度障害者の全介護（要介護4・5、身障1・2級の親族）', value: `${prefix}_care_9b`, points: 9 },
  { label: '障害児（者）の通学に常時付き添い', value: `${prefix}_care_9c`, points: 9 },
  { label: '常時観察と介護（食事・排泄・入浴の介護）が必要な場合', value: `${prefix}_care_6`, points: 6 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月150時間以上（職業訓練・専門学校・大学等）', value: `${prefix}_education_9`, points: 9 },
  { label: '月120時間以上150時間未満', value: `${prefix}_education_8`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_education_7`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_education_6`, points: 6 },
  { label: '月64時間以上80時間未満', value: `${prefix}_education_5`, points: 5 },
  { label: '通信制（月150時間以上相当）', value: `${prefix}_education_comm9`, points: 7 },
  { label: '通信制（月120時間以上相当）', value: `${prefix}_education_comm8`, points: 6 },
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
      { label: '仕事をしている / 就労予定', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・療養中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
      { label: '不在（死亡・離婚等）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}：妊娠中または出産後8週以内ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_childbirth_no`, points: 0 },
        { label: 'はい（出産予定日3か月前〜出産後8週経過日の月末まで）', value: `${prefix}_childbirth_yes`, points: 6 },
      ],
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・療養の状況は？`,
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
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（震災・風水害・火災等の復旧）', value: `${prefix}_disaster_yes`, points: 9 },
      ],
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}：求職活動中ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_jobseeking_no`, points: 0 },
        { label: 'はい（求職のため外出を常態）', value: `${prefix}_jobseeking_yes`, points: 4 },
      ],
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}：虐待・DVのおそれがありますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_dv_no`, points: 0 },
        { label: 'はい（虐待・DVのおそれがあると認められる）', value: `${prefix}_dv_yes`, points: 9 },
      ],
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不在（死亡・離婚等）ですか？`,
      helpText: '父または母が死亡・離婚等で不在の場合、不在の親の指数は9点となります',
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_absent_no`, points: 0 },
        { label: 'はい（死亡・離婚等により不在）', value: `${prefix}_absent_yes`, points: 9 },
      ],
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_single_parent_absent',
    category: 'adjustment',
    label: '父母のどちらかが県外等に単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_absent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_absent_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休明け・育休明けによる申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_parental_leave_none', points: 0 },
      { label: '産休明け・育休明けの申込（満了日の前月から適用）', value: 'adj_parental_leave_1', points: 1 },
      { label: '育休取得で一旦退所した子どもが育休明けに同一施設を再利用', value: 'adj_parental_leave_7', points: 7 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの在園・同時利用はありますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだい（卒園予定児を除く）が希望施設に在園中', value: 'adj_sibling_enrolled', points: 2 },
      { label: 'きょうだいと同時に同一施設を申込', value: 'adj_sibling_simultaneous', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障がい等がありますか？',
    helpText: '身体障害者手帳・療育手帳・精神障害者保健福祉手帳の所持、または発達支援が必要な場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保育士・幼稚園教諭の資格を持つ保護者が保育施設に勤務（予定）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_no', points: 0 },
      { label: 'はい（市内保育施設）', value: 'adj_nursery_staff_in', points: 4 },
      { label: 'はい（市外保育施設）', value: 'adj_nursery_staff_out', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同地番に居住する60歳未満の祖父母が保育できますか？',
    helpText: '同地番（同一敷地内）に60歳未満の祖父母が居住している場合',
    inputType: 'radio',
    options: [
      { label: '60歳未満の同地番祖父母がいない / 保育できない', value: 'adj_grandparent_ok', points: 0 },
      { label: '60歳未満の同地番祖父母がいるが、保育できないことの確認ができない', value: 'adj_grandparent_ng', points: -2 },
    ],
  },
  {
    id: 'adj_no_sibling_care',
    category: 'adjustment',
    label: '申込児以外の未就学児がいるが、保育所等を利用しない予定ですか？',
    helpText: '幼稚園等の福祉施設を利用している場合は除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ / 該当なし', value: 'adj_no_sibling_care_no', points: 0 },
      { label: 'はい（他の未就学児を保育所等に預けない）', value: 'adj_no_sibling_care_yes', points: -1 },
    ],
  },
];

export const numazuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
