import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 苫小牧市 保育園入園 基本点数・調整点数データ
// 出典：苫小牧市保育所等利用調整基準（令和8年度用）
// https://www.city.tomakomai.hokkaido.jp/kenko/kosodate/kanrenshisetsu/kyokahoikujo/nyusho/reiwa8.html
// https://www.city.tomakomai.hokkaido.jp/files/00067800/00067810/20251114121614.pdf
// ---------------------------------------------------------------------------
//
// 苫小牧市の利用調整は以下のように算出されます。
//   合計点数 ＝ 父の基本点数 ＋ 母の基本点数 ＋ 調整点数（加算・減算）
// 父母それぞれの基本点数は、保育を必要とする事由のうち
// 最も該当するものを1つ選択して決定します。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tomakomai',
  name: '苫小牧市',
  slug: 'tomakomai',
  prefecture: '北海道',
  maxBasePoints: 40, // 父母各20点（就労フルタイム）の合計
} as const;

// ---------------------------------------------------------------------------
// 就労（居宅外・自営業主）
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
  { label: '月120時間以上160時間未満（13点）', value: `${prefix}_homework_13`, points: 13 },
  { label: '月80時間以上120時間未満（11点）', value: `${prefix}_homework_11`, points: 11 },
  { label: '月48時間以上80時間未満（10点）', value: `${prefix}_homework_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 妊娠・出産（母のみ）
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前8週（多胎は14週）〜産後8週（20点）', value: `${prefix}_childbirth_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 疾病・負傷
// ---------------------------------------------------------------------------

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中（1か月以上）（22点）', value: `${prefix}_illness_22`, points: 22 },
  { label: '常時臥床（20点）', value: `${prefix}_illness_20`, points: 20 },
  { label: '精神性疾患（18点）', value: `${prefix}_illness_18`, points: 18 },
  { label: '上記以外の自宅療養・通院（16点）', value: `${prefix}_illness_16`, points: 16 },
];

// ---------------------------------------------------------------------------
// 障害
// ---------------------------------------------------------------------------

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 療育手帳A / 精神障害者保健福祉手帳1級（20点）', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級 / 精神障害者保健福祉手帳2級 / 療育手帳B（18点）', value: `${prefix}_disability_18`, points: 18 },
  { label: '身体障害者手帳4級以下 / 精神障害者保健福祉手帳3級（16点）', value: `${prefix}_disability_16`, points: 16 },
];

// ---------------------------------------------------------------------------
// 介護・看護
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添い（月160時間以上）（20点）', value: `${prefix}_care_20`, points: 20 },
  { label: '在宅介護・看護（月160時間以上）（18点）', value: `${prefix}_care_18`, points: 18 },
  { label: '在宅介護・看護（月120時間以上160時間未満）（16点）', value: `${prefix}_care_16`, points: 16 },
  { label: '在宅介護・看護（月80時間以上120時間未満）（14点）', value: `${prefix}_care_14`, points: 14 },
  { label: '在宅介護・看護（月48時間以上80時間未満）（12点）', value: `${prefix}_care_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 災害復旧
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている（20点）', value: `${prefix}_disaster_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 求職活動
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備含む）（4点）', value: `${prefix}_jobseeking_4`, points: 4 },
];

// ---------------------------------------------------------------------------
// 就学・職業訓練
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上（18点）', value: `${prefix}_education_18`, points: 18 },
  { label: '月120時間以上160時間未満（16点）', value: `${prefix}_education_16`, points: 16 },
  { label: '月80時間以上120時間未満（14点）', value: `${prefix}_education_14`, points: 14 },
  { label: '月48時間以上80時間未満（12点）', value: `${prefix}_education_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 虐待・DV
// ---------------------------------------------------------------------------

const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待・DVのおそれがある（20点）', value: `${prefix}_abuse_20`, points: 20 },
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
    helpText: '苫小牧市では父母それぞれの基本点数を合算します。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '仕事をしている（居宅外・自営業主）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（自営業専従者・家族従業者）', value: `${prefix}_reason_familyworker`, points: 0 },
      { label: '仕事をしている（内職）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DVのおそれ', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（居宅外・自営業主）は？`,
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '産前8週（多胎は14週）から産後8週が対象です（母のみ）',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷の状況は？`,
      helpText: '入院、自宅療養、通院の状況を選んでください',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の状況は？`,
      helpText: '障害者手帳の等級に応じて点数が決まります',
      inputType: 'radio',
      options: disabilityOptions(prefix),
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
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・職業訓練の時間（月あたり）は？`,
      helpText: '月あたりの就学・訓練時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVのおそれに該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数（加算・減算）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: 'ひとり親家庭の場合、調整点数が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: '母子または父子家庭（+3）', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で就労による自立支援につながりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業し、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入園を希望するお子さまに障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが認可保育所等にすでに入所していますか？',
    helpText: '兄弟姉妹が同じ施設に在園している場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_enrolled_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだい複数人で同時に入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ikukyu',
    category: 'adjustment',
    label: '育休明けの入所希望ですか？',
    helpText: '育児休業から復帰して入所を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_ikukyu_yes', points: 3 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒園児ですか？',
    helpText: '小規模保育事業所等の卒園（予定含む）の場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_chiikigata_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_chiikigata_yes', points: 5 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が保育所等で保育士として働いていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_childcare_worker_yes', points: 10 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者の一方が単身赴任等で長期不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_tanshin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multi_children',
    category: 'adjustment',
    label: '多子家庭に該当しますか？',
    helpText: '小学校就学前の児童数で判定します',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_multi_children_no', points: 0 },
      { label: '小学校就学前児童3人以上（+1）', value: 'adj_multi_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_relative_care',
    category: 'adjustment',
    label: '65歳未満の保育できる同居親族がいますか？',
    helpText: '該当すると1点減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_care_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_relative_care_yes', points: -1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const tomakomaiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
