import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 滝川市 保育園入園 利用調整基準データ
// 出典: 滝川市「滝川市保育所入所選考基準表」（令和7年4月1日入所から適用）
// https://www.city.takikawa.lg.jp/uploaded/attachment/17749.pdf
// -------------------------------------------------------------------------
// 滝川市は【利用調整の方法について】に
// 「合計点数の高い方から順に入所調整を行う（合計点数＝基礎点数＋調整点数）」とある。
// 原典は父母の基礎点数をどう合わせるかを書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基礎点数の最大は1人あたり100点。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 「虐待やDVのおそれがあると認められる場合」（—、児童・世帯の状況に応じて別途判断）
// - 「育児休業中」（—、上の子の継続利用を認めるため利用調整は必要ない）
// - 「その他市長が必要と認める場合」（10〜100、幅がある）
// - 就学は「就労の基準を準用」とあり単独の数が無いため、就労の設問で答える形にしている
// -------------------------------------------------------------------------

const municipality = {
  id: 'takikawa',
  name: '滝川市',
  slug: 'takikawa',
  prefecture: '北海道',
  maxBasePoints: 200, // 父母各100点の合計
  scoringMethod: 'sum',
} as const;

// 就労（就学も「就労の基準を準用」）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '被雇用者・自営業者（生計中心者）で月160時間以上', value: `${prefix}_employment_0`, points: 100 },
  { label: '被雇用者・自営業者（生計中心者）で月140時間以上160時間未満', value: `${prefix}_employment_1`, points: 90 },
  { label: '被雇用者・自営業者（生計中心者）で月120時間以上140時間未満', value: `${prefix}_employment_2`, points: 80 },
  { label: '被雇用者・自営業者（生計中心者）で月100時間以上120時間未満', value: `${prefix}_employment_3`, points: 70 },
  { label: '被雇用者・自営業者（生計中心者）で月80時間以上100時間未満', value: `${prefix}_employment_4`, points: 60 },
  { label: '被雇用者・自営業者（生計中心者）で月60時間以上80時間未満', value: `${prefix}_employment_5`, points: 50 },
  { label: '自営業者（生計協力者）・内職者・在宅ワーク者で月160時間以上', value: `${prefix}_employment_6`, points: 90 },
  { label: '自営業者（生計協力者）・内職者・在宅ワーク者で月140時間以上160時間未満', value: `${prefix}_employment_7`, points: 80 },
  { label: '自営業者（生計協力者）・内職者・在宅ワーク者で月120時間以上140時間未満', value: `${prefix}_employment_8`, points: 70 },
  { label: '自営業者（生計協力者）・内職者・在宅ワーク者で月100時間以上120時間未満', value: `${prefix}_employment_9`, points: 60 },
  { label: '自営業者（生計協力者）・内職者・在宅ワーク者で月80時間以上100時間未満', value: `${prefix}_employment_10`, points: 50 },
  { label: '自営業者（生計協力者）・内職者・在宅ワーク者で月60時間以上80時間未満', value: `${prefix}_employment_11`, points: 40 },
];

// 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前7週（多胎妊娠は産前14週）から産後の翌日8週後の属する月末まで', value: `${prefix}_childbirth_0`, points: 70 },
];

// 疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院が1ヶ月以上にわたると見込まれる', value: `${prefix}_illness_0`, points: 100 },
  { label: '自宅療養で常時臥床', value: `${prefix}_illness_1`, points: 100 },
  { label: '身体障害者手帳1級・2級／療育手帳A／精神障害者保健福祉手帳1級・2級', value: `${prefix}_illness_2`, points: 100 },
  { label: '身体障害者手帳3級／療育手帳B／精神障害者保健福祉手帳3級', value: `${prefix}_illness_3`, points: 80 },
  { label: '自宅療養で月複数回の通院加療を要する', value: `${prefix}_illness_4`, points: 70 },
  { label: '上記以外の自宅療養', value: `${prefix}_illness_5`, points: 50 },
];

// 介護・看護等
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院等で入院付添（月15日以上かつ月60時間以上）', value: `${prefix}_care_0`, points: 100 },
  { label: '在宅介護・看護（月60時間以上）で重度心身障害者またはねたきり老人の介護・看護', value: `${prefix}_care_1`, points: 80 },
  { label: '在宅介護・看護（月60時間以上）で軽度心身障害者の介護・看護', value: `${prefix}_care_2`, points: 40 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害の復旧にあたっており、保育することができない', value: `${prefix}_disaster_0`, points: 100 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業準備）を行っており、保育することができない', value: `${prefix}_jobseeking_0`, points: 30 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    inputType: 'select',
    options: [
      { label: '就労（就学も同じ基準）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '技術習得等で職業訓練学校・大学・専門学校等に通学している場合も、この表の基準を使います',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '切迫早産等で入院・通院または治療を要する場合は、疾病として扱われます',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
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
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 【調整点数】
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+120）', value: 'adj_single_parent_1', points: 120 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保育士等資格保有者が滝川市内の保育施設等で保育業務に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '月120時間以上の就労を常態とする（+120）', value: 'adj_nursery_staff_1', points: 120 },
      { label: '月120時間未満の就労を常態とする（+100）', value: 'adj_nursery_staff_2', points: 100 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母のうちいずれかが単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_tanshin_1', points: 10 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '世帯に障がい者がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_family_disability_1', points: 10 },
    ],
  },
  {
    id: 'adj_care_needed',
    category: 'adjustment',
    label: '世帯に要介護者がいますか？',
    helpText: '介護認定を受けている場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_care_needed_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_care_needed_1', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟・姉妹の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '（新規入所）兄弟・姉妹が既に入所している（+15）', value: 'adj_sibling_1', points: 15 },
      { label: '（転所）兄弟・姉妹が別々の保育所に入所しており、同じ保育所に入所希望（+15）', value: 'adj_sibling_2', points: 15 },
      { label: '（新規入所）兄弟・姉妹と同時入所申込（+10）', value: 'adj_sibling_3', points: 10 },
      { label: '（転所）兄弟・姉妹と同時転所希望（+10）', value: 'adj_sibling_4', points: 10 },
    ],
  },
  {
    id: 'adj_preschool_children',
    category: 'adjustment',
    label: '就学前児童が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_preschool_children_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_preschool_children_1', points: 5 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '現在の待機の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_waiting_0', points: 0 },
      { label: '一時保育を利用または知人・親戚に預けながら待機している（年度途中入所に限る）（+10）', value: 'adj_waiting_1', points: 10 },
      { label: '前年度から待機している（+5）', value: 'adj_waiting_2', points: 5 },
    ],
  },
  {
    id: 'adj_leave_extendable',
    category: 'adjustment',
    label: '希望する保育所に入所できない場合、育児休業の延長を許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extendable_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_leave_extendable_1', points: -10 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料を滞納しており、納付の督促に対して適切な対応がみられませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_fee_delinquent_1', points: -10 },
    ],
  },
];

export const takikawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
