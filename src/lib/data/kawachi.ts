import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 河内町 保育園入園 利用調整基準データ
// 出典: 河内町「かわちこども園（保育認定）利用調整基準表」
// https://www.town.ibaraki-kawachi.lg.jp/data/doc/1673848380_doc_62_0.xlsx
// -------------------------------------------------------------------------
// 河内町の基準表は「合計（Ａ＋Ｂ＋Ｃ）」という式で締めくくられている。
//   Ａ 父の調整指数 ／ Ｂ 母の調整指数 ／ Ｃ 入園優先点数
// 父と母を足すので scoringMethod は 'sum'。調整指数の最大は1人あたり10点。
//
// 「2 妊娠・出産」は父の欄が「―」なので、母のみの区分である。
//
// 「8 虐待・ＤＶ」（20点）は父母の欄が分かれておらず世帯の点数なので、
// 保護者ごとの選択肢には入れていない。同じ内容が入園優先点数表の
// 「虐待・ＤＶを受けている、受ける恐れがある場合など、社会的養護が必要な場合」（+10）
// にあるので、そちらの設問で表している。
//
// 原典で該当が町の判断による項目は入れていない。
// - 「10 その他（上記以外で町長が認めた場合）」（6点）
// - 入園優先点数「児童福祉の観点から、特に保育の実施が必要と判断される場合」（+2）
//
// 「9 育児休業取得中」（8点）は「既に保育を利用している子どもがいて継続利用が必要」
// なので、いま園を利用している方の話として入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'kawachi',
  name: '河内町',
  slug: 'kawachi',
  prefecture: '茨城県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// 1 家庭外労働 ／ 家庭内労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '家庭外労働：月160時間以上の就労', value: `${prefix}_employment_0`, points: 10 },
  { label: '家庭内労働（自営・農業）：月160時間以上の就労', value: `${prefix}_employment_1`, points: 10 },
  { label: '家庭外労働：月120時間以上の就労', value: `${prefix}_employment_2`, points: 8 },
  { label: '家庭内労働（自営・農業）：月120時間以上の就労', value: `${prefix}_employment_3`, points: 8 },
  { label: '家庭外労働：月96時間以上の就労', value: `${prefix}_employment_4`, points: 6 },
  { label: '家庭内労働（自営・農業）：月96時間以上の就労', value: `${prefix}_employment_5`, points: 6 },
  { label: '家庭内労働（内職）：月160時間以上の就労', value: `${prefix}_employment_6`, points: 6 },
  { label: '家庭外労働：月64時間以上の就労', value: `${prefix}_employment_7`, points: 4 },
  { label: '家庭内労働（自営・農業）：月64時間以上の就労', value: `${prefix}_employment_8`, points: 4 },
  { label: '家庭内労働（内職）：月96時間以上の就労', value: `${prefix}_employment_9`, points: 4 },
  { label: '家庭外労働：月48時間以上の就労', value: `${prefix}_employment_10`, points: 2 },
  { label: '家庭内労働（自営・農業）：月48時間以上の就労', value: `${prefix}_employment_11`, points: 2 },
  { label: '家庭内労働（内職）：月48時間以上の就労', value: `${prefix}_employment_12`, points: 2 },
];

// 2 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前・産後含む', value: `${prefix}_childbirth_0`, points: 8 },
];

// 3 疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院している', value: `${prefix}_illness_0`, points: 10 },
  { label: '居宅内：1カ月以上の安静、加療（常時寝たきり、精神性、感染性、難病）', value: `${prefix}_illness_1`, points: 10 },
  { label: '障害：身障手帳1・2級、療育手帳A、精神障害者保健福祉手帳1級を保有', value: `${prefix}_illness_2`, points: 10 },
  { label: '一般療養：週3回以上の通院を常態', value: `${prefix}_illness_3`, points: 8 },
  { label: '障害：身障手帳3・4級、療育手帳B・C、精神障害者保健福祉手帳2・3級を保有', value: `${prefix}_illness_4`, points: 8 },
  { label: '一般療養：週1〜2回の通院を常態', value: `${prefix}_illness_5`, points: 6 },
];

// 4 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院等付添', value: `${prefix}_care_0`, points: 10 },
  { label: '自宅療養', value: `${prefix}_care_1`, points: 8 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災等により家屋の損傷、その他災害復旧の為に保育できない場合', value: `${prefix}_disaster_0`, points: 10 },
];

// 6 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職の為、日中外出を常態', value: `${prefix}_jobseeking_0`, points: 2 },
];

// 7 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月96時間以上の就学、職業訓練のため保育できない場合', value: `${prefix}_school_0`, points: 8 },
  { label: '月48時間以上の就学、職業訓練のため保育できない場合', value: `${prefix}_school_1`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '合計は「父の調整指数」＋「母の調整指数」＋「入園優先点数」です',
    inputType: 'select',
    options: [
      { label: '労働（家庭外・家庭内）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働の状況は？`,
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
      label: `${parentLabel}は災害復旧の為に保育できませんか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職の為、日中外出を常態としていますか？`,
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

// 入園優先点数表（Ｃ）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '母子及び父子並びに寡婦福祉法に規定する配偶者のいない女子及び男子で現に子どもを扶養している者の属する世帯（離婚調停中を含む）が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_1', points: 10 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: '虐待・DVを受けている、受ける恐れがある場合など、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_dv_1', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（就労することにより自立支援につながる場合）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_1', points: 2 },
    ],
  },
  {
    id: 'adj_disability',
    category: 'adjustment',
    label: '児童または保護者が障害を有しますか？',
    helpText: '原典の項目名は「児童、福祉者が障害を有する場合」です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_disability_1', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹で同一の施設を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '正当な理由なく、在園児（卒園児）の利用者負担に未納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_fee_delinquent_1', points: -10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母と同居かつ就労していない場合にあたりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_grandparent_1', points: -2 },
    ],
  },
];

export const kawachiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
