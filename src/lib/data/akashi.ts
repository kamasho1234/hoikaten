import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 明石市 保育園入園 基礎指数・付加指数データ
// 出典：2025・2026年度 明石市利用調整基準表
// https://www.city.akashi.lg.jp/kodomo/ikusei_shitsu/riyoukijunriyouchousei.html
// https://www.city.akashi.lg.jp/documents/35408/2026riyoutyousei.pdf
// ---------------------------------------------------------------------------
//
// 明石市の選考指数は以下のように算出されます。
//   基礎指数 ＝（父の基礎指数 ＋ 母の基礎指数）÷ 2
//   選考指数 ＝ 基礎指数 ± 付加指数
// ひとり親の場合は当該保護者の基礎指数がそのまま基礎指数になります。
//
// 本シミュレーターでは「父の基礎指数＋母の基礎指数」を合算で表示します。
// 公式の選考指数に換算するには、基本点数合計を2で割ってから調整点数を加減してください。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'akashi',
  name: '明石市',
  slug: 'akashi',
  prefecture: '兵庫県',
  maxBasePoints: 44, // 父母各22点の合計（公式は平均で最大22）
} as const;

// ---------------------------------------------------------------------------
// 就労（家庭外労働・常勤/非常勤雇用、自営中心者）
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（フルタイム）', value: `${prefix}_employment_22`, points: 22 },
  { label: '月144時間以上160時間未満', value: `${prefix}_employment_21`, points: 21 },
  { label: '月128時間以上144時間未満', value: `${prefix}_employment_20`, points: 20 },
  { label: '月112時間以上128時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月96時間以上112時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月80時間以上96時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_16`, points: 16 },
];

// ---------------------------------------------------------------------------
// 就労（家庭内労働・自営協力者、農林水産業協力者）
// ---------------------------------------------------------------------------

const employmentAssistOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_assist_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_assist_20`, points: 20 },
  { label: '月144時間以上160時間未満', value: `${prefix}_employment_assist_19`, points: 19 },
  { label: '月128時間以上144時間未満', value: `${prefix}_employment_assist_18`, points: 18 },
  { label: '月112時間以上128時間未満', value: `${prefix}_employment_assist_17`, points: 17 },
  { label: '月96時間以上112時間未満', value: `${prefix}_employment_assist_16`, points: 16 },
  { label: '月80時間以上96時間未満', value: `${prefix}_employment_assist_15`, points: 15 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_assist_14`, points: 14 },
];

// ---------------------------------------------------------------------------
// 就労（内職）
// ---------------------------------------------------------------------------

const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_homework_18`, points: 18 },
  { label: '月144時間以上160時間未満', value: `${prefix}_homework_17`, points: 17 },
  { label: '月128時間以上144時間未満', value: `${prefix}_homework_16`, points: 16 },
  { label: '月112時間以上128時間未満', value: `${prefix}_homework_15`, points: 15 },
  { label: '月96時間以上112時間未満', value: `${prefix}_homework_14`, points: 14 },
  { label: '月80時間以上96時間未満', value: `${prefix}_homework_13`, points: 13 },
  { label: '月64時間以上80時間未満', value: `${prefix}_homework_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 疾病
// ---------------------------------------------------------------------------

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_23`, points: 23 },
  { label: '居宅内療養（特に安静を要する）', value: `${prefix}_illness_20`, points: 20 },
  { label: '居宅内療養（精神疾患・難病）', value: `${prefix}_illness_18`, points: 18 },
  { label: '居宅内療養（安静を要する）', value: `${prefix}_illness_15`, points: 15 },
];

// ---------------------------------------------------------------------------
// 心身障害
// ---------------------------------------------------------------------------

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1-2級 / 精神1-2級 / 療育A）', value: `${prefix}_disability_23`, points: 23 },
  { label: '中度（身体3-4級 / 精神3級 / 療育B1）', value: `${prefix}_disability_20`, points: 20 },
  { label: '軽度（身体5-6級 / 療育B2）', value: `${prefix}_disability_15`, points: 15 },
];

// ---------------------------------------------------------------------------
// 介護・看護（親族の要介護度×時間数に応じた指数）
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護4-5の親族を月120時間以上介護', value: `${prefix}_care_20`, points: 20 },
  { label: '要介護4-5の親族を月64時間以上介護', value: `${prefix}_care_17a`, points: 17 },
  { label: '要介護1-3の親族を月120時間以上介護', value: `${prefix}_care_17b`, points: 17 },
  { label: '要介護1-3の親族を月64時間以上介護', value: `${prefix}_care_13a`, points: 13 },
  { label: '要支援1-2の親族を月120時間以上介護', value: `${prefix}_care_14`, points: 14 },
  { label: '要支援1-2の親族を月64時間以上介護', value: `${prefix}_care_11`, points: 11 },
  { label: '寝たきりの親族を月120時間以上看護', value: `${prefix}_care_20b`, points: 20 },
  { label: '寝たきりの親族を月64時間以上看護', value: `${prefix}_care_17c`, points: 17 },
  { label: 'その他（精神疾病・難病）の親族を月120時間以上看護', value: `${prefix}_care_17d`, points: 17 },
  { label: 'その他（精神疾病・難病）の親族を月64時間以上看護', value: `${prefix}_care_13b`, points: 13 },
  { label: 'その他の親族を月120時間以上看護', value: `${prefix}_care_15`, points: 15 },
  { label: 'その他の親族を月64時間以上看護', value: `${prefix}_care_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 出産
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・産前産後休業中', value: `${prefix}_childbirth_20`, points: 20 },
  { label: '出産（その他）', value: `${prefix}_childbirth_17`, points: 17 },
];

// ---------------------------------------------------------------------------
// 修学
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '通学：月160時間以上', value: `${prefix}_education_19`, points: 19 },
  { label: '通学：月144時間以上160時間未満', value: `${prefix}_education_18`, points: 18 },
  { label: '通学：月128時間以上144時間未満', value: `${prefix}_education_17`, points: 17 },
  { label: '通学：月112時間以上128時間未満', value: `${prefix}_education_16`, points: 16 },
  { label: '通学：月96時間以上112時間未満', value: `${prefix}_education_15`, points: 15 },
  { label: '通学：月80時間以上96時間未満', value: `${prefix}_education_14`, points: 14 },
  { label: '通学：月64時間以上80時間未満', value: `${prefix}_education_13`, points: 13 },
  { label: '職業訓練：月160時間以上', value: `${prefix}_education_vt_22`, points: 22 },
  { label: '職業訓練：月144時間以上160時間未満', value: `${prefix}_education_vt_21`, points: 21 },
  { label: '職業訓練：月128時間以上144時間未満', value: `${prefix}_education_vt_20`, points: 20 },
  { label: '職業訓練：月112時間以上128時間未満', value: `${prefix}_education_vt_19`, points: 19 },
  { label: '職業訓練：月96時間以上112時間未満', value: `${prefix}_education_vt_18`, points: 18 },
  { label: '職業訓練：月80時間以上96時間未満', value: `${prefix}_education_vt_17`, points: 17 },
  { label: '職業訓練：月64時間以上80時間未満', value: `${prefix}_education_vt_16`, points: 16 },
];

// ---------------------------------------------------------------------------
// 就職活動・育児休業
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就職活動中', value: `${prefix}_jobseeking_11`, points: 11 },
];

const parentalLeaveBaseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_base_none`, points: 0 },
  { label: '育児休業中', value: `${prefix}_parental_leave_base_11`, points: 11 },
];

// ---------------------------------------------------------------------------
// 特例
// ---------------------------------------------------------------------------

const specialOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_special_none`, points: 0 },
  { label: '災害復旧', value: `${prefix}_special_25a`, points: 25 },
  { label: '児童の成長が著しく阻害されるおそれがある場合', value: `${prefix}_special_25b`, points: 25 },
  { label: '上記以外で保育に欠ける場合', value: `${prefix}_special_20`, points: 20 },
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
    helpText: '明石市では父母それぞれの基礎指数の平均が選考指数になります。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '仕事をしている（常勤・非常勤・自営中心者）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（自営協力者・家庭内労働）', value: `${prefix}_reason_employment_assist`, points: 0 },
      { label: '仕事をしている（内職）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_parental_leave_base`, points: 0 },
      { label: '災害・特例', value: `${prefix}_reason_special`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      helpText: '常勤・非常勤雇用、自営業の中心者が対象です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_employment_assist`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      helpText: '自営業の協力者、家庭内労働の方が対象です',
      inputType: 'radio',
      options: employmentAssistOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の時間（月あたり）は？`,
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
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '対象となる親族の要介護度と月あたりの時間を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の修学・職業訓練の状況は？`,
      helpText: '月あたりの通学・訓練時間を選んでください',
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
      id: `${prefix}_parental_leave_base`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveBaseOptions(prefix),
    },
    {
      id: `${prefix}_special`,
      category,
      label: `${parentLabel}に該当する特例は？`,
      inputType: 'radio',
      options: specialOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 付加指数（調整点数）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: 'ひとり親の場合は当該保護者の指数がそのまま基礎指数になり、さらに+5の付加指数が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: '父母のいずれかが存しない（+5）', value: 'adj_single_parent_yes', points: 5 },
      { label: '父母のいずれもが存しない（+10）', value: 'adj_single_parent_both', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが同じ施設に在園していますか？',
    helpText: '認定こども園の幼稚園部分（1号）のみの在園は対象外です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'きょうだいが同一施設に在園中（+2）', value: 'adj_sibling_enrolled_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_disability',
    category: 'adjustment',
    label: 'きょうだいに障害児がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'きょうだいと同時申込（+1）', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multi_children',
    category: 'adjustment',
    label: '乳幼児を3人以上扶養、または双子で全員入所希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_children_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_multi_children_yes', points: 2 },
    ],
  },
  {
    id: 'adj_home_childcare',
    category: 'adjustment',
    label: '自宅できょうだいを保育していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_childcare_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_home_childcare_yes', points: -3 },
    ],
  },
  {
    id: 'adj_grandparent_nearby',
    category: 'adjustment',
    label: '65歳未満の無職の祖父母等と同居していますか？',
    helpText: '病気療養中の方は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_nearby_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_grandparent_nearby_yes', points: -2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設等を月64時間以上利用中ですか？',
    helpText: '認可外保育施設、一時預かり、企業主導型保育所等が対象です（育児休業中の利用は除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    helpText: '入所に伴い育児休業から復帰する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯で保護者が就職活動中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_regional_graduation',
    category: 'adjustment',
    label: '地域型保育事業の卒園児童ですか？',
    helpText: '小規模保育所・家庭的保育事業等の卒園（予定含む）の場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_regional_graduation_no', points: 0 },
      { label: '連携施設への入所希望（+10）', value: 'adj_regional_graduation_linked', points: 10 },
      { label: '連携施設以外への入所希望（+5）', value: 'adj_regional_graduation_other', points: 5 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が市内の認定保育施設で保育士として勤務していますか？',
    helpText: '市内認定保育施設・企業主導型保育事業所での勤務（内定含む）が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_childcare_worker_yes', points: 10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const akashiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
