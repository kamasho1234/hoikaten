import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// つくば市 保育所入所基準データ
// 出典: つくば市「保育所入所基準表（令和８年４月入所審査から適用）」
// 計算方式: sum（父母の基準指数を合算）
// 特記: 父（母）いない（ひとり親）は不在親の基準指数=21点
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tsukuba',
  name: 'つくば市',
  slug: 'tsukuba',
  prefecture: '茨城県',
  maxBasePoints: 42, // 父母各21点（父（母）いない場合の最大）
} as const;

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_19`, points: 19 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月60時間以上100時間未満', value: `${prefix}_employment_15`, points: 15 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学', value: `${prefix}_education_17`, points: 17 },
  { label: '月140時間以上160時間未満', value: `${prefix}_education_16`, points: 16 },
  { label: '月120時間以上140時間未満', value: `${prefix}_education_15`, points: 15 },
  { label: '月100時間以上120時間未満', value: `${prefix}_education_14`, points: 14 },
  { label: '月60時間以上100時間未満', value: `${prefix}_education_13`, points: 13 },
];

/** 疾病・障害（つくば市は統合テーブル） */
const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中 / 身体障害1・2級 / 精神障害1級 / 療育手帳A以上', value: `${prefix}_illness_20`, points: 20 },
  { label: '常時病臥（寝たきり）/ 身体障害3級 / 精神障害3級 / 療育手帳B', value: `${prefix}_illness_18`, points: 18 },
  { label: '身体障害4級 / 療育手帳C', value: `${prefix}_illness_16`, points: 16 },
  { label: 'その他疾病（診断書により保育が困難と認められる）', value: `${prefix}_illness_17`, points: 17 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の全面介護（食事・排泄・入浴等）を自宅で常態', value: `${prefix}_care_19`, points: 19 },
  { label: '月100時間以上の介護（要介護3以上・身障2級以上・精神2級以上・療育B以上）を自宅で常態', value: `${prefix}_care_16a`, points: 16 },
  { label: '月100時間以上の病院・施設への付き添いが必要', value: `${prefix}_care_16b`, points: 16 },
  { label: '上記以外の看護・介護', value: `${prefix}_care_13`, points: 13 },
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
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '疾病・障害がある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '不在（死亡・離婚等）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不在（死亡・離婚等によりひとり親）ですか？`,
      helpText: '父または母が死亡・離婚等で不在の場合、不在の親の指数は21点となります',
      inputType: 'radio',
      options: [
        { label: 'いいえ（同居または別居中）', value: `${prefix}_absent_no`, points: 0 },
        { label: 'はい（死亡・離婚・未婚等により不在）', value: `${prefix}_absent_yes`, points: 21 },
      ],
    },
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月）は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}：妊娠中または出産後8週以内ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_childbirth_no`, points: 0 },
        { label: 'はい（出産予定日6週前〜出産後8週経過の翌日が属する月末まで）', value: `${prefix}_childbirth_yes`, points: 16 },
      ],
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}：求職活動中ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_jobseeking_no`, points: 0 },
        { label: 'はい（起業準備を含む継続的な求職活動）', value: `${prefix}_jobseeking_yes`, points: 12 },
      ],
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学時間（月）は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（震災・風水害・火災等の復旧）', value: `${prefix}_disaster_yes`, points: 20 },
      ],
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_current_care',
    category: 'adjustment',
    label: '現在、子どもの保育はどのように行っていますか？',
    helpText: '最も当てはまるものを選んでください（重複する場合は加算が大きい方を選択）',
    inputType: 'radio',
    options: [
      { label: '母（父）が仕事をしながら見ている', value: 'adj_care_working', points: 2 },
      { label: '他人に日々依頼している', value: 'adj_care_other', points: 2 },
      { label: '別居の親族に日々依頼している', value: 'adj_care_relative', points: 1 },
      { label: '認可保育所等に入所している', value: 'adj_care_licensed', points: 3 },
      { label: '認可外または一時預かりに月60時間以上預けている', value: 'adj_care_unlicensed60', points: 3 },
      { label: '認可外または一時預かりに月48時間以上預けている', value: 'adj_care_unlicensed48', points: 2 },
      { label: '認可外または一時預かりに月32時間以上預けている', value: 'adj_care_unlicensed32', points: 1 },
      { label: '母（父、祖父母等）が見ている（該当なし）', value: 'adj_care_none', points: 0 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休・産休明けで入所を希望していますか？',
    helpText: '休業中に限り適用',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（育休・産休中）', value: 'adj_parental_leave_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_parent_absent',
    category: 'adjustment',
    label: '保護者の一方が単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_absent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_absent_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同一の保育所等を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（きょうだいが同一保育所等の申込）', value: 'adj_sibling_yes', points: 2 },
      { label: 'はい（多胎児が同一保育所等の申込）', value: 'adj_sibling_twins', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_small_graduate',
    category: 'adjustment',
    label: '市内の年齢制限のある認可保育所等（小規模保育等）を卒園しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_graduate_yes', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保育士等の資格を持つ保護者が市内保育施設に勤務（予定）ですか？',
    helpText: '保育士・幼稚園教諭・保育教諭・看護師として月60時間以上勤務',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_no', points: 0 },
      { label: 'はい（月160時間以上勤務）', value: 'adj_nursery_staff_160', points: 9 },
      { label: 'はい（月60時間以上160時間未満勤務）', value: 'adj_nursery_staff_60', points: 8 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居祖父母が「保育にあたれない証明書」を提出できますか？',
    helpText: '同一住所（別世帯同一敷地内含む）の65歳未満の祖父母がいる場合',
    inputType: 'radio',
    options: [
      { label: '65歳未満の同居祖父母がいない / 証明書を提出できる', value: 'adj_grandparent_ok', points: 0 },
      { label: '65歳未満の同居祖父母がいるが証明書を提出できない', value: 'adj_grandparent_ng', points: -5 },
    ],
  },
];

export const tsukubaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
