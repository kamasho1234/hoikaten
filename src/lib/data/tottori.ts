import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 鳥取市 保育園入園 利用調整基準データ
// 出典：鳥取市「令和8年度 保育所等入所申込みのご案内」
// https://www.city.tottori.lg.jp/site/kosodate/20071.html
// ---------------------------------------------------------------------------
//
// 鳥取市の利用調整は以下のように算出されます。
//   利用調整指数 ＝ 父の基礎指数 ＋ 母の基礎指数 ＋ 調整指数
// 保護者それぞれの基礎指数は最大10点（合計最大20点）。
// 就労は月64時間以上が保育認定の下限、月120時間以上が保育標準時間の基準です。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tottori',
  name: '鳥取市',
  slug: 'tottori',
  prefecture: '鳥取県',
  maxBasePoints: 20, // 父10+母10 = 20
} as const;

// ---------------------------------------------------------------------------
// ① 就労（家庭外労働・自営業含む）
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月120時間以上の就労（フルタイム等）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月100時間以上120時間未満の就労', value: `${prefix}_employment_9`, points: 9 },
  { label: '月80時間以上100時間未満の就労', value: `${prefix}_employment_8`, points: 8 },
  { label: '月64時間以上80時間未満の就労', value: `${prefix}_employment_6`, points: 6 },
  { label: '自営業（中心者）', value: `${prefix}_employment_self_10`, points: 10 },
  { label: '自営業（協力者）', value: `${prefix}_employment_self_8`, points: 8 },
  { label: '内職', value: `${prefix}_employment_naishoku_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// ② 妊娠・出産
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前8週〜産後8週）', value: `${prefix}_childbirth_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// ③ 疾病・負傷
// ---------------------------------------------------------------------------

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中または自宅で常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '自宅療養（一般・通院加療中）', value: `${prefix}_illness_8`, points: 8 },
];

// ---------------------------------------------------------------------------
// ④ 障害
// ---------------------------------------------------------------------------

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級、療育手帳A、精神障害者保健福祉手帳1級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級、療育手帳B、精神障害者保健福祉手帳2・3級', value: `${prefix}_disability_8`, points: 8 },
];

// ---------------------------------------------------------------------------
// ⑤ 介護・看護
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護・看護が必要な家族がいる（月120時間以上）', value: `${prefix}_care_10`, points: 10 },
  { label: '月80時間以上120時間未満の介護・看護', value: `${prefix}_care_8`, points: 8 },
  { label: '月64時間以上80時間未満の介護・看護', value: `${prefix}_care_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// ⑥ 災害復旧
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災等の災害復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// ⑦ 求職活動
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（入所後90日以内に就労開始が条件）', value: `${prefix}_jobseeking_3`, points: 3 },
];

// ---------------------------------------------------------------------------
// ⑧ 就学（学校教育法に基づく学校・職業訓練校等）
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上の就学', value: `${prefix}_education_10`, points: 10 },
  { label: '月64時間以上120時間未満の就学', value: `${prefix}_education_8`, points: 8 },
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
    helpText: '鳥取市では父母それぞれの基礎指数（最大10点）の合計が基礎点数になります。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '仕事をしている（自営業・内職含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠中・出産前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気やけがの治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '月あたりの就労時間を選んでください。月64時間以上が保育認定の要件です。',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産予定日の前後各8週が対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・けがの状況は？`,
      helpText: '入院中または自宅で常時療養が必要な場合が対象です',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      helpText: '障害者手帳の等級に応じて指数が決まります',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '月あたりの介護・看護時間を選んでください',
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
      label: `${parentLabel}は求職活動中ですか？`,
      helpText: '入所後90日以内に就労を開始する必要があります',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '学校教育法に基づく学校・職業訓練校等に通っている場合',
      inputType: 'radio',
      options: educationOptions(prefix),
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
    label: 'ひとり親家庭ですか？',
    helpText: '死別・離別・未婚等によるひとり親世帯の場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休から復帰する予定ですか？',
    helpText: '育児休業から復帰して入所を希望する場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_parental_leave_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    helpText: 'きょうだいが在園中の園を希望する場合や、きょうだい同時入所を希望する場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中の園を希望（+5）', value: 'adj_sibling_same', points: 5 },
      { label: 'きょうだい同時入所を希望（+3）', value: 'adj_sibling_simultaneous', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '小規模保育事業等の卒園に伴う転所ですか？',
    helpText: '地域型保育事業（小規模保育所等）の卒園児が連携施設等への入所を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_small_grad_no', points: 0 },
      { label: '連携施設への入所を希望（+10）', value: 'adj_small_grad_renkei', points: 10 },
      { label: '連携施設以外への入所を希望（+5）', value: 'adj_small_grad_other', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '対象のお子さんに障害がありますか？',
    helpText: '障害者手帳の交付や発達上の課題がある場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が鳥取市内の保育施設等で保育士・保育教諭として勤務していますか？',
    helpText: '保育人材確保のための加点です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_nursery_worker_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月ぎめで預けていますか？',
    helpText: '届出保育施設等に預けている場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_relative_can_care',
    category: 'adjustment',
    label: '65歳未満の同居親族が保育できる状態にありますか？',
    helpText: '65歳未満の同居親族が保育可能な場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（同居親族なし、または65歳以上）', value: 'adj_relative_can_care_no', points: 0 },
      { label: 'はい、保育できる同居親族がいる（−3）', value: 'adj_relative_can_care_yes', points: -3 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const tottoriData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
