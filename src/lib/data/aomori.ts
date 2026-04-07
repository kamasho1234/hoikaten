import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 青森市 保育園入園 基礎点数・調整点数データ
// 出典：青森市 令和8年度 保育所・認定こども園（保育部分）等への利用申込み
// https://www.city.aomori.aomori.jp/kodomo_kyoiku/ninteikodomoen_youchien_hoikusho/1009841/1009844.html
// https://www.city.aomori.aomori.jp/_res/projects/default_project/_page_/001/009/844/r8riyouannnai.pdf
// ---------------------------------------------------------------------------
//
// 青森市の利用調整は「優先順位方式（A〜F）」で行われます。
// 本シミュレーターでは利便性のため優先順位を点数に換算しています。
//   優先順位A → 100点、B → 80点、C → 60点、D → 40点、E → 20点、F → 10点
//   基礎点数 ＝ 保護者1の点数 ＋ 保護者2の点数（各最大100点、合計最大200点）
//   合計点数 ＝ 基礎点数 ＋ 調整点数
//
// ※実際の選考では優先順位方式で総合的に判断されます。
//   点数はあくまで目安としてご利用ください。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'aomori',
  name: '青森市',
  slug: 'aomori',
  prefecture: '青森県',
  maxBasePoints: 200, // 保護者各100点の合計
} as const;

// ---------------------------------------------------------------------------
// 就労（被雇用者・自営業者）
// 青森市の優先順位：A=月150h以上、B=月120h以上、C=月90h以上、D=月60h以上
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上（優先順位A）', value: `${prefix}_employment_100`, points: 100 },
  { label: '月120時間以上150時間未満（優先順位B）', value: `${prefix}_employment_80`, points: 80 },
  { label: '月90時間以上120時間未満（優先順位C）', value: `${prefix}_employment_60`, points: 60 },
  { label: '月60時間以上90時間未満（優先順位D）', value: `${prefix}_employment_40`, points: 40 },
];

// ---------------------------------------------------------------------------
// 内職
// 青森市の優先順位：E=月60h以上の内職
// ---------------------------------------------------------------------------

const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月60時間以上の内職（優先順位E）', value: `${prefix}_homework_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 妊娠・出産（母のみ）
// 青森市の優先順位：B=出産前後
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（優先順位B）', value: `${prefix}_childbirth_80`, points: 80 },
];

// ---------------------------------------------------------------------------
// 疾病・障害
// 青森市の優先順位：A=長期入院・重度障害、B=短期入院・中程度障害、C=自宅療養
// ---------------------------------------------------------------------------

const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院・重度障害（優先順位A）', value: `${prefix}_illness_100`, points: 100 },
  { label: '短期入院・中程度障害（優先順位B）', value: `${prefix}_illness_80`, points: 80 },
  { label: '自宅療養（優先順位C）', value: `${prefix}_illness_60`, points: 60 },
];

// ---------------------------------------------------------------------------
// 親族等の介護・看護
// 青森市の優先順位：B=重度要介護者、C=中程度要介護者、E=軽度要介護者
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '重度の要介護者・障害者・長期療養者の常時介護（優先順位B）', value: `${prefix}_care_80`, points: 80 },
  { label: '中程度の要介護者・障害者・長期療養者の常時介護（優先順位C）', value: `${prefix}_care_60`, points: 60 },
  { label: '軽度の要介護者・障害者・長期療養者の常時介護（優先順位E）', value: `${prefix}_care_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 災害復旧
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧（優先順位A相当）', value: `${prefix}_disaster_100`, points: 100 },
];

// ---------------------------------------------------------------------------
// 求職活動
// 青森市の優先順位：F=求職活動中
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（優先順位F）', value: `${prefix}_jobseeking_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 就学・職業訓練
// 青森市の優先順位：就労と同じ時間区分（A〜D）
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月150時間以上（優先順位A）', value: `${prefix}_education_100`, points: 100 },
  { label: '月120時間以上150時間未満（優先順位B）', value: `${prefix}_education_80`, points: 80 },
  { label: '月90時間以上120時間未満（優先順位C）', value: `${prefix}_education_60`, points: 60 },
  { label: '月60時間以上90時間未満（優先順位D）', value: `${prefix}_education_40`, points: 40 },
];

// ---------------------------------------------------------------------------
// 虐待・DV
// ---------------------------------------------------------------------------

const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待・DVのおそれがある（優先順位A相当）', value: `${prefix}_abuse_100`, points: 100 },
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
    helpText: '青森市では優先順位A〜Fで選考されます。本シミュレーターでは点数に換算して表示します。',
    inputType: 'select',
    options: [
      { label: '仕事をしている（被雇用者・自営業者）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（内職者）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
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
      label: `${parentLabel}の就労時間（月あたり）は？`,
      helpText: '被雇用者・自営業者が対象です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の時間（月あたり）は？`,
      helpText: '内職者が対象です。被雇用者・自営業者より優先順位が低くなります',
      inputType: 'radio',
      options: homeworkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産前後が対象です（母のみ）',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      helpText: '入院期間や障害の程度に応じて優先順位が決まります',
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '要介護者等の常時介護が対象です',
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
// 調整点数の質問
// 青森市では「ひとり親家庭」「産休・育休明け復職」で優先順位が上がります。
// 同順位の場合はきょうだい在園等が考慮されます。
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '青森市ではひとり親家庭の場合、優先順位が高くなります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_single_parent_yes', points: 50 },
    ],
  },
  {
    id: 'adj_ikukyu',
    category: 'adjustment',
    label: '育休明けの入所希望ですか？',
    helpText: '育休終了日が属する月（終了日が1〜13日の場合はその前月も含む）の選考で優先されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_ikukyu_yes', points: 30 },
    ],
  },
  {
    id: 'adj_sankyu',
    category: 'adjustment',
    label: '産休明けの入所希望ですか？',
    helpText: '産休終了日が属する月の選考で優先されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sankyu_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_sankyu_yes', points: 30 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが認可保育所等にすでに入所していますか？',
    helpText: '同順位の場合にきょうだい在園が考慮されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_sibling_enrolled_yes', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '生活保護世帯で就労による自立支援につながる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所を希望する子どもに障害がありますか？',
    helpText: '障害のある児童の保育が必要な場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_child_disability_yes', points: 10 },
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
      { label: '小学校就学前児童2人（+5）', value: 'adj_multi_children_2', points: 5 },
      { label: '小学校就学前児童3人以上（+10）', value: 'adj_multi_children_3', points: 10 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業（小規模保育所等）の卒園児ですか？',
    helpText: '小規模保育所等の卒園（予定含む）の場合、3歳以降の入園で考慮されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_chiikigata_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_chiikigata_yes', points: 20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const aomoriData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
