import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 釧路市 保育園入園 基本点数・調整点数データ
// 出典：釧路市保育施設利用調整基準（令和8年度用）
// https://www.city.kushiro.lg.jp/kosodate/hoiku/index.html
// ---------------------------------------------------------------------------
//
// 釧路市の利用調整は以下のように算出されます。
//   合計点数 ＝ 父の基本点数 ＋ 母の基本点数 ＋ 調整点数（加算・減算）
// 父母それぞれの基本点数は、保育を必要とする事由のうち
// 最も該当するものを1つ選択して決定します。
// 基本点数は最大20点（フルタイム就労の場合）です。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kushiro',
  name: '釧路市',
  slug: 'kushiro',
  prefecture: '北海道',
  maxBasePoints: 40, // 父母各20点（就労フルタイム）の合計
} as const;

// ---------------------------------------------------------------------------
// 就労（外勤・自営業主）
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（20点）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月120時間以上160時間未満（18点）', value: `${prefix}_employment_18`, points: 18 },
  { label: '月80時間以上120時間未満（16点）', value: `${prefix}_employment_16`, points: 16 },
  { label: '月64時間以上80時間未満（14点）', value: `${prefix}_employment_14`, points: 14 },
  { label: '月48時間以上64時間未満（12点）', value: `${prefix}_employment_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 就労（自営業専従者・家族従業者）
// ---------------------------------------------------------------------------

const familyWorkerOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_familyworker_none`, points: 0 },
  { label: '月160時間以上（17点）', value: `${prefix}_familyworker_17`, points: 17 },
  { label: '月120時間以上160時間未満（15点）', value: `${prefix}_familyworker_15`, points: 15 },
  { label: '月80時間以上120時間未満（13点）', value: `${prefix}_familyworker_13`, points: 13 },
  { label: '月64時間以上80時間未満（11点）', value: `${prefix}_familyworker_11`, points: 11 },
  { label: '月48時間以上64時間未満（10点）', value: `${prefix}_familyworker_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 就労（内職）
// ---------------------------------------------------------------------------

const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月160時間以上（15点）', value: `${prefix}_homework_15`, points: 15 },
  { label: '月100時間以上160時間未満（14点）', value: `${prefix}_homework_14`, points: 14 },
  { label: '月48時間以上100時間未満（13点）', value: `${prefix}_homework_13`, points: 13 },
];

// ---------------------------------------------------------------------------
// 就労予定
// ---------------------------------------------------------------------------

const jobPlannedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobplanned_none`, points: 0 },
  { label: '就労予定（4点）', value: `${prefix}_jobplanned_4`, points: 4 },
  { label: '就労予定：母子または父子家庭（12点）', value: `${prefix}_jobplanned_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 不在（死別・離別・別居・失踪・拘禁等）
// ---------------------------------------------------------------------------

const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死別、離別、別居、失踪、拘禁等（20点）', value: `${prefix}_absent_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 疾病等
// ---------------------------------------------------------------------------

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（20点）', value: `${prefix}_illness_20`, points: 20 },
  { label: '常時臥床（19点）', value: `${prefix}_illness_19`, points: 19 },
  { label: '安静を要する状況（18点）', value: `${prefix}_illness_18`, points: 18 },
  { label: '精神にかかる疾病（17点）', value: `${prefix}_illness_17`, points: 17 },
  { label: '上記以外で通院が必要な状態（15点）', value: `${prefix}_illness_15`, points: 15 },
];

// ---------------------------------------------------------------------------
// 障害
// ---------------------------------------------------------------------------

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害1・2級、精神障害者保健福祉手帳1級、療育手帳A（20点）', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害3級、精神障害者保健福祉手帳2級、療育手帳B（18点）', value: `${prefix}_disability_18`, points: 18 },
];

// ---------------------------------------------------------------------------
// 母親の出産（母のみ）
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前8週（多胎の場合は14週）、産後8週（20点）', value: `${prefix}_childbirth_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 看護等
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院付添：入院中の親族の看護が必要な場合（20点）', value: `${prefix}_care_20a`, points: 20 },
  { label: '在宅看護：常時観察・介護が必要な場合（19点）', value: `${prefix}_care_19`, points: 19 },
  { label: '在宅看護：日常生活全般について恒常的な介護が必要な場合（14点）', value: `${prefix}_care_14`, points: 14 },
  { label: '在宅看護：上記以外（10点）', value: `${prefix}_care_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 災害
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災、風水害、地震等の災害復旧（20点）', value: `${prefix}_disaster_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 虐待・DV
// ---------------------------------------------------------------------------

const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVのおそれがあること（20点）', value: `${prefix}_abuse_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 就学
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '大学・大学院・専門学校への通学（18点）', value: `${prefix}_education_18`, points: 18 },
];

// ---------------------------------------------------------------------------
// 職業訓練等
// ---------------------------------------------------------------------------

const trainingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_training_none`, points: 0 },
  { label: '1日8時間以上（17点）', value: `${prefix}_training_17`, points: 17 },
  { label: '1日6時間以上（15点）', value: `${prefix}_training_15`, points: 15 },
  { label: '1日4時間以上（13点）', value: `${prefix}_training_13`, points: 13 },
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
    helpText: '釧路市では父母それぞれの基本点数を合算します。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '仕事をしている（外勤・自営業主）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（自営業専従者・家族従業者）', value: `${prefix}_reason_familyworker`, points: 0 },
      { label: '仕事をしている（内職）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '就労予定', value: `${prefix}_reason_jobplanned`, points: 0 },
      { label: '不在（死別・離別・別居等）', value: `${prefix}_reason_absent`, points: 0 },
      { label: '病気（疾病等）', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '出産（母のみ）', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待・DVのおそれ', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '就学（大学・大学院・専門学校）', value: `${prefix}_reason_education`, points: 0 },
      { label: '職業訓練等', value: `${prefix}_reason_training`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（外勤・自営業主）は？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_familyworker`,
      category,
      label: `${parentLabel}の就労時間（自営業専従者・家族従業者）は？`,
      helpText: '自営業の専従者・家族従業者が対象です',
      inputType: 'radio',
      options: familyWorkerOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の時間（月あたり）は？`,
      helpText: '内職者が対象です',
      inputType: 'radio',
      options: homeworkOptions(prefix),
    },
    {
      id: `${prefix}_jobplanned`,
      category,
      label: `${parentLabel}の就労予定の状況は？`,
      helpText: '就労予定の場合の点数です。ひとり親家庭は加点されます',
      inputType: 'radio',
      options: jobPlannedOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不在ですか？`,
      helpText: '死別、離別、別居、失踪、拘禁等の場合',
      inputType: 'radio',
      options: absentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      helpText: '入院、臥床、安静、精神疾病、通院の状況を選んでください',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の状況は？`,
      helpText: '身体障害・精神障害者保健福祉手帳・療育手帳の等級に応じて点数が決まります',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '産前8週（多胎の場合は14週）から産後8週が対象です（母のみ）',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '親族の介護・看護の状況を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に該当しますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVのおそれに該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は大学・大学院・専門学校に通学していますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_training`,
      category,
      label: `${parentLabel}の職業訓練等の時間は？`,
      helpText: '就労に必要な技能習得を目的とする通学の場合',
      inputType: 'radio',
      options: trainingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数（加算）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '母子または父子家庭の場合、調整点数+3が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: '母子または父子家庭（+3）', value: 'adj_single_parent_yes', points: 3 },
      { label: '準母子または準父子家庭（+2）', value: 'adj_single_parent_quasi', points: 2 },
    ],
  },
  {
    id: 'adj_doukyo',
    category: 'adjustment',
    label: 'ひとり親家庭で60歳未満の健康な祖父母が同居していませんか？',
    helpText: '母子・準母子または父子・準父子家庭で60歳未満の健康な祖父母が同居していない場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_doukyo_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_doukyo_yes', points: 1 },
    ],
  },
  {
    id: 'adj_preschool_children',
    category: 'adjustment',
    label: '申し込み児童のほかに就学前児童がいますか？',
    helpText: '1人ごとに+2点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_preschool_children_no', points: 0 },
      { label: '1人いる（+2）', value: 'adj_preschool_children_1', points: 2 },
      { label: '2人いる（+4）', value: 'adj_preschool_children_2', points: 4 },
      { label: '3人以上いる（+6）', value: 'adj_preschool_children_3', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'すでに保育施設入園中のきょうだいがいますか？',
    helpText: '1人ごとに+3点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: '1人いる（+3）', value: 'adj_sibling_enrolled_1', points: 3 },
      { label: '2人以上いる（+6）', value: 'adj_sibling_enrolled_2', points: 6 },
    ],
  },
  {
    id: 'adj_same_facility',
    category: 'adjustment',
    label: 'きょうだいが入園している保育施設のみに入園を希望しますか？',
    helpText: '兄弟姉妹が入園中の施設のみを希望する場合に+10点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_same_facility_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_same_facility_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給中の世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者の一方が単身赴任で平日に保育の協力を得られませんか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_tanshin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_three_children',
    category: 'adjustment',
    label: '小学生以下の児童が3人以上いる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_three_children_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_three_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_tataji',
    category: 'adjustment',
    label: '申し込み児童は多胎児ですか？',
    helpText: '多胎児の場合、児童以外の多胎児数を加算します',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_tataji_no', points: 0 },
      { label: '双子（+1）', value: 'adj_tataji_1', points: 1 },
      { label: '三つ子（+2）', value: 'adj_tataji_2', points: 2 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が釧路市内の認可保育施設に勤務していますか？',
    helpText: '保育教諭、保育士、看護師等が対象です。新規勤務開始・育休復帰等の場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_childcare_worker_no', points: 0 },
      { label: '釧路市内の認可保育施設に勤務（+30）', value: 'adj_childcare_worker_30', points: 30 },
      { label: '釧路市外の認可保育施設に勤務（+28）', value: 'adj_childcare_worker_28', points: 28 },
    ],
  },
  {
    id: 'adj_sotsuen',
    category: 'adjustment',
    label: '申し込み児童は2歳クラスまでの保育施設の卒園児ですか？',
    helpText: '小規模保育事業等の卒園児は+5点',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sotsuen_no', points: 0 },
      { label: '卒園児（+5）', value: 'adj_sotsuen_5', points: 5 },
      { label: '企業主導型保育所の卒園児（+2）', value: 'adj_sotsuen_2', points: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kushiroData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
