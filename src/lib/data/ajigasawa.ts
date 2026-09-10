import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 鰺ヶ沢町 保育園入園 利用調整基準データ
// 出典: 鰺ヶ沢町「利用調整に係る点数表」（基本点数表・調整点数表）
// https://www.town.ajigasawa.lg.jp/kenko_fukushi/kosodate/kosodate/hoikujo_kodomoen.files/riyoutensuu.pdf
// -------------------------------------------------------------------------
// 鰺ヶ沢町は基本点数表の備考に父母の合わせ方が書かれている。
//   「2 父母それぞれの点数の合算を基本点数とする。
//      ただし、8虐待・DVに該当する場合は、25点とする。」
//   「3 父母が複数の事由に該当する場合は、各々基本点数の高い方の事由の点数を採用する。」
// 父母それぞれの点数の合算なので scoringMethod は 'sum'。
// 基本点数の最大は1人あたり10点。
//
// 基本点数表の「8 虐待・DV」（25点）は、父母の合算ではなく世帯の点数を
// 25点に置き換えるルールなので、保護者ごとの選択肢には入れていない。
// 同じ内容が調整点数表の「児童虐待又はDVの可能性があり、社会的養護が必要な場合」
// （+25）にもあるので、そちらの設問で表している。
//
// 原典で指数が幅・準用でしか書かれていない項目は入れていない。
// - 基本点数表「10 その他（前各部に類するものとして町長が認める事由）」（前各部に準じた点数 3〜10）
// - 調整点数表「10 前各項に類するものとして町長が認める状況」（前各項に準じた点数 −5〜25）
//
// 基本点数表「9 育児休業」（8点）は「育児休業取得時に既に保育を利用しており、
// 引き続き利用することが必要」なので、いま園を利用している方の話として入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'ajigasawa',
  name: '鰺ヶ沢町',
  slug: 'ajigasawa',
  prefecture: '青森県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// 1 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤：月160時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '自営業（中心者）：月160時間以上', value: `${prefix}_employment_1`, points: 10 },
  { label: '自営業（協力者）：月160時間以上', value: `${prefix}_employment_2`, points: 9 },
  { label: '外勤：月120時間以上160時間未満', value: `${prefix}_employment_3`, points: 8 },
  { label: '自営業（中心者）：月120時間以上160時間未満', value: `${prefix}_employment_4`, points: 8 },
  { label: '内職：月160時間以上', value: `${prefix}_employment_5`, points: 8 },
  { label: '自営業（協力者）：月120時間以上160時間未満', value: `${prefix}_employment_6`, points: 7 },
  { label: '外勤：月64時間以上120時間未満', value: `${prefix}_employment_7`, points: 6 },
  { label: '自営業（中心者）：月64時間以上120時間未満', value: `${prefix}_employment_8`, points: 6 },
  { label: '内職：月120時間以上160時間未満', value: `${prefix}_employment_9`, points: 6 },
  { label: '自営業（協力者）：月64時間以上120時間未満', value: `${prefix}_employment_10`, points: 5 },
  { label: '外勤：月48時間以上64時間未満', value: `${prefix}_employment_11`, points: 4 },
  { label: '自営業（中心者）：月48時間以上64時間未満', value: `${prefix}_employment_12`, points: 4 },
  { label: '自営業（協力者）：月48時間以上64時間未満', value: `${prefix}_employment_13`, points: 4 },
  { label: '内職：月64時間以上120時間未満', value: `${prefix}_employment_14`, points: 4 },
  { label: '内職：月48時間以上64時間未満', value: `${prefix}_employment_15`, points: 3 },
];

// 2 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の8週間前の日が属する月の初日から出産後8週間を経過する日の属する月の末日までの期間', value: `${prefix}_childbirth_0`, points: 10 },
];

// 3 疾病・負傷・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：1箇月以上', value: `${prefix}_illness_0`, points: 10 },
  { label: '居宅療養（病臥）：常時臥床', value: `${prefix}_illness_1`, points: 10 },
  { label: '障害：身体障害者手帳1・2級、精神障害者保健福祉手帳1・2級又は愛護手帳Aの交付を受けている場合', value: `${prefix}_illness_2`, points: 10 },
  { label: '入院：1箇月未満', value: `${prefix}_illness_3`, points: 8 },
  { label: '障害：身体障害者手帳3・4級、精神障害者保健福祉手帳3級又は愛護手帳Bの交付を受けている場合', value: `${prefix}_illness_4`, points: 8 },
  { label: '居宅療養（長期加療）：通院加療を行い、常に安静を要する場合', value: `${prefix}_illness_5`, points: 7 },
  { label: '障害：身体障害者手帳5・6級の交付を受けている場合', value: `${prefix}_illness_6`, points: 6 },
  { label: '居宅療養（一般療養）：上記以外の自宅療養で、保育に支障がある場合', value: `${prefix}_illness_7`, points: 5 },
];

// 4 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上、長期入院者、常時病臥者、心身障害者の介護や入院、通院、通所の付き添いを行っている', value: `${prefix}_care_0`, points: 9 },
  { label: '月120時間以上160時間未満、長期入院者、常時病臥者、心身障害者の介護や入院、通院、通所の付き添いを行っている', value: `${prefix}_care_1`, points: 7 },
  { label: '月64時間以上120時間未満、長期入院者、常時病臥者、心身障害者の介護や入院、通院、通所の付き添いを行っている', value: `${prefix}_care_2`, points: 5 },
  { label: '月48時間以上64時間未満、長期入院者、常時病臥者、心身障害者の介護や入院、通院、通所の付き添いを行っている', value: `${prefix}_care_3`, points: 4 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害の復旧に当たっている場合', value: `${prefix}_disaster_0`, points: 10 },
];

// 6 求職活動（起業の準備を含む）
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業の準備を含む）を継続的に行っている場合', value: `${prefix}_jobseeking_0`, points: 4 },
];

// 7 就学・職業訓練
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月160時間以上、就学中又は職業訓練を受けている場合', value: `${prefix}_school_0`, points: 8 },
  { label: '月120時間以上160時間未満、就学中又は職業訓練を受けている場合', value: `${prefix}_school_1`, points: 6 },
  { label: '月64時間以上120時間未満、就学中又は職業訓練を受けている場合', value: `${prefix}_school_2`, points: 4 },
  { label: '月48時間以上64時間未満、就学中又は職業訓練を受けている場合', value: `${prefix}_school_3`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母それぞれの点数の合算が基本点数になります',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動（起業の準備を含む）', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_school`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '自営業には農業・漁業を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '原典では母のみに点数が付く区分です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷・障害の状況は？`,
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
      label: `${parentLabel}は災害の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動を継続的に行っていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ②利用調整に係る調整点数表（該当する状況に応じて加減算を行う。重複適用可）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（離婚・離婚調停中・死別等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_single_parent_1', points: 15 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（就労により自立が見込まれる場合）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_unemployed_1', points: 10 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: '児童虐待又はDVの可能性があり、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_0', points: 0 },
      { label: 'はい（+25）', value: 'adj_dv_1', points: 25 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '当該申請する子どもが身体障害者手帳又は愛護手帳等を交付されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_child_disability_1', points: 10 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '産後休暇又は育児休業により復職予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_return_to_work_1', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹がすでに利用している保育所等の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_1', points: 5 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒園児童ですか？',
    helpText: '年齢制限により、継続利用ができない場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_chiikigata_1', points: 10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居する65歳未満の親族が児童を保育できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_grandparent_1', points: -5 },
    ],
  },
];

export const ajigasawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
