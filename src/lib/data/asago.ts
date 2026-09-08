import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 朝来市 保育園入園 利用調整基準データ
// 出典: 朝来市「朝来市こども園等利用調整基準」
// https://www.city.asago.hyogo.jp/uploaded/attachment/3338.pdf
// -------------------------------------------------------------------------
// 朝来市は【利用調整の手順・取り扱いについて】に手順が書かれている。
//   5「父母の基準指数を足して2で除した数に調整指数を加算した数を選考指数とする。」
// **父母の平均**なので scoringMethod は 'avg'。基準指数の最大は1人あたり10点。
//   1「保護者の状況が複数該当する場合は、最も高い事由を採用します。」
//   4「利用基準表の就労(学)時間は、休息時間を含むものとします。」
//
// 手順2「ひとり親世帯については、当該ひとり親の点数と10点との合計数を基準指数とします。」
// は、ひとり親のときだけ10点を足すという意味なので、調整の設問として持たせている。
// ひとり親の方は保護者1だけに答えれば、その1人分の点数が世帯の点数になり、
// そこに10点が足される。
//
// 原典で数値を出していない項目（※、当該世帯等の状況により別途判断）は
// 選択肢にしていない。
// - 7 虐待・DV／8 その他（死亡・離別・行方不明・拘禁等）
//
// 「妊娠・出産」は父の欄が斜線になっているため、母のみの区分である。
//
// 減点15「期限後の申込み」（△10）と18「市外に住民登録がある場合」（△2）は、
// 申込みの手続きや住まいの話で、入園の点数の目安とは性質が違うため入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'asago',
  name: '朝来市',
  slug: 'asago',
  prefecture: '兵庫県',
  maxBasePoints: 10,
  scoringMethod: 'avg',
} as const;

// 1 就労（内定者含む）・就学
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・自営・就学（通学）：月160時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '外勤・自営・就学（通学）：月140時間以上160時間未満', value: `${prefix}_employment_1`, points: 9 },
  { label: '外勤・自営・就学（通学）：月120時間以上140時間未満', value: `${prefix}_employment_2`, points: 8 },
  { label: '外勤・自営・就学（通学）：月100時間以上120時間未満', value: `${prefix}_employment_3`, points: 7 },
  { label: '外勤・自営・就学（通学）：月80時間以上100時間未満', value: `${prefix}_employment_4`, points: 6 },
  { label: '外勤・自営・就学（通学）：月60時間以上80時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '外勤・自営・就学（通学）：月48時間以上60時間未満', value: `${prefix}_employment_6`, points: 4 },
  { label: '内職等：月120時間以上', value: `${prefix}_employment_7`, points: 6 },
  { label: '内職等：月80時間以上120時間未満', value: `${prefix}_employment_8`, points: 5 },
  { label: '内職等：月48時間以上80時間未満', value: `${prefix}_employment_9`, points: 4 },
];

// 2 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '切迫早産等要安静の場合', value: `${prefix}_childbirth_0`, points: 10 },
  { label: '産前8週（多胎の場合14週）産後8週の属する月初開始から月末終了までの場合', value: `${prefix}_childbirth_1`, points: 8 },
];

// 3 疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '病気等により入院もしくは入院見込み', value: `${prefix}_illness_0`, points: 10 },
  { label: '居宅内療養で常時寝たきり等の状態', value: `${prefix}_illness_1`, points: 10 },
  { label: '身体障害者手帳1・2級／精神障害者保健福祉手帳1・2級／療育手帳A 所持者', value: `${prefix}_illness_2`, points: 10 },
  { label: '居宅内療養で精神疾患により保育に著しく支障をきたす', value: `${prefix}_illness_3`, points: 7 },
  { label: '居宅内療養で常時安静を要する等の状態', value: `${prefix}_illness_4`, points: 7 },
  { label: '身体障害者手帳3級／精神障害者保健福祉手帳3級／療育手帳B1 所持者', value: `${prefix}_illness_5`, points: 6 },
  { label: '居宅内療養で週3日程度通院加療を要する等', value: `${prefix}_illness_6`, points: 4 },
  { label: '身体障害者手帳4〜6級／療育手帳B2 所持者', value: `${prefix}_illness_7`, points: 4 },
];

// 4 看護・介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院や病状等が重度（寝たきり、重症心身障害児（者）、要介護4以上）の親族の場合', value: `${prefix}_care_0`, points: 9 },
  { label: '病状等が中度（要介護3等）の親族の場合', value: `${prefix}_care_1`, points: 7 },
  { label: '病状等が軽度（要介護2以下等）の親族の場合', value: `${prefix}_care_2`, points: 5 },
  { label: '通院（所）している親族の付添いに常時あたっている場合', value: `${prefix}_care_3`, points: 4 },
];

// 5 災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害の復旧にあたっている', value: `${prefix}_disaster_0`, points: 10 },
];

// 6 求職活動等
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職または起業の準備のために外出することを常態としている', value: `${prefix}_jobseeking_0`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '朝来市は父母の基準指数を足して2で割った数を使います。複数該当する場合は最も高い事由を採用します',
    inputType: 'select',
    options: [
      { label: '就労（内定者含む）・就学', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動等', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労・就学の状況は？`,
      helpText: '就労（学）時間は休息時間を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '原典では母のみに指数が付く区分です',
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
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動等をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整指数表
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '原典の手順2「ひとり親世帯については、当該ひとり親の点数と10点との合計数を基準指数とします」の10点と、調整指数2の6点を合わせた16点が入ります（同居の者がいない場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'ひとり親で同居の者がいない（+16）', value: 'adj_single_parent_1', points: 16 },
      { label: 'ひとり親で同居の者がいる（+10）', value: 'adj_single_parent_2', points: 10 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待やDVのおそれがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_0', points: 0 },
      { label: 'はい（+6）', value: 'adj_abuse_1', points: 6 },
    ],
  },
  {
    id: 'adj_no_parents',
    category: 'adjustment',
    label: '両親の死亡・離別および行方不明等により、父母がいませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_parents_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_no_parents_1', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用を希望する園児が障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_child_disability_1', points: 3 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者が重度の障害で、特に身体的・能力的に養育が困難であると認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_parent_disability_1', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_1', points: 1 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployed_1', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児（産後）休業により一度退園し、休業明けに同じ園等を再び希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+6）', value: 'adj_leave_return_1', points: 6 },
    ],
  },
  {
    id: 'adj_continue',
    category: 'adjustment',
    label: '継続して施設を利用しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_continue_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_continue_1', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '希望する同一の保育施設等に兄弟姉妹が入所していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_moving',
    category: 'adjustment',
    label: '転居・転入による入所希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_moving_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_moving_1', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '父または母が市内認可保育施設に勤務する、または勤務予定の保育士・保育教諭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_nursery_staff_1', points: 5 },
    ],
  },
  {
    id: 'adj_after_leave',
    category: 'adjustment',
    label: '産休・育休期間満了後に入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_after_leave_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_after_leave_1', points: 3 },
    ],
  },
  {
    id: 'adj_no_helper',
    category: 'adjustment',
    label: '親族等の協力者がいませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_helper_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_no_helper_1', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料未納者ですか？',
    helpText: '未納が6ケ月以上あり、かつ納付の相談が無い、または納付約束を履行しない場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_fee_delinquent_1', points: -10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '利用基準1〜5、7、8に該当しない近隣在住の70歳未満の祖父母がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_grandparent_1', points: -3 },
    ],
  },
];

export const asagoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
