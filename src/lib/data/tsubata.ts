import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 津幡町 保育園入園 利用調整基準データ
// 出典: 津幡町「津幡町保育施設等利用調整基準表」（令和9年4月入園児童から適用）
// https://www.town.tsubata.lg.jp/uploaded/attachment/7813.pdf
// -------------------------------------------------------------------------
// 津幡町は基本指数を父・母それぞれの列で示している。
// 原典は合わせ方を書いていないが、同点の場合の優先順位④に
// 「父又は母の基本指数のうち、いずれか低い点数を比較」とあり、
// 合計とは別に「低い方」を持っていることが読み取れる。
// つまり基本指数そのものは父母の合計として扱われているため、scoringMethod は 'sum'。
// 基本指数の最大は1人あたり20点。
//
// ③疾病・障害は「『状況』と『障害の程度手帳の種類』の合計」、
// ④同居親族の介護・看護は「『状況』と『認定等の種類』の合計」と原典にあるため、
// それぞれ2つの設問に分けている。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - ⑨「その他本町が認める事由」（点数欄が空欄）
//
// 調整指数⑦「地域型保育事業の卒園児童が連携施設への入園を希望する場合」（+200、
// 住吉こども園のみ）は、実質的に連携施設への進級を確実にするための値で、
// 点数の目安として見せると誤解を招くため入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'tsubata',
  name: '津幡町',
  slug: 'tsubata',
  prefecture: '石川県',
  maxBasePoints: 40, // 父母各20点の合計
  scoringMethod: 'sum',
} as const;

// ① 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_0`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_1`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_2`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_3`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_4`, points: 12 },
  { label: '月48時間以上80時間未満', value: `${prefix}_employment_5`, points: 10 },
  { label: '内職を行うとき（月48時間以上）', value: `${prefix}_employment_6`, points: 8 },
];

// ② 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前8週間前（多胎児は14週間前）の月初日から産後8週間後の月末まで', value: `${prefix}_childbirth_0`, points: 20 },
];

// ③ 疾病・障害（「状況」＋「障害の程度手帳の種類」の合計）
const illnessStateOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_state_none`, points: 0 },
  { label: '常時病臥、入院', value: `${prefix}_illness_state_0`, points: 15 },
  { label: '通院通所（月1回以上）', value: `${prefix}_illness_state_1`, points: 7 },
  { label: '自宅療養、その他', value: `${prefix}_illness_state_2`, points: 5 },
];

const illnessHandbookOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_handbook_none`, points: 0 },
  { label: '身体障害者手帳1・2級／精神障害者保健福祉手帳1級／療育手帳A', value: `${prefix}_illness_handbook_0`, points: 15 },
  { label: '身体障害者手帳3級／精神障害者保健福祉手帳2級／療育手帳BⅠ', value: `${prefix}_illness_handbook_1`, points: 12 },
  { label: '身体障害者手帳4級／精神障害者保健福祉手帳3級／療育手帳BⅡ', value: `${prefix}_illness_handbook_2`, points: 8 },
  { label: '手帳なし、その他', value: `${prefix}_illness_handbook_3`, points: 5 },
];

// ④ 同居親族の介護・看護（「状況」＋「認定等の種類」の合計）
const careStateOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_state_none`, points: 0 },
  { label: '常時臨床、入院の付添（週3日以上）', value: `${prefix}_care_state_0`, points: 10 },
  { label: '通院等の付添（週3日以上）', value: `${prefix}_care_state_1`, points: 7 },
  { label: '上記以外', value: `${prefix}_care_state_2`, points: 5 },
];

const careLevelOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_level_none`, points: 0 },
  { label: '要介護3〜5', value: `${prefix}_care_level_0`, points: 12 },
  { label: '要介護2', value: `${prefix}_care_level_1`, points: 8 },
  { label: '要介護1', value: `${prefix}_care_level_2`, points: 6 },
  { label: '要支援、その他', value: `${prefix}_care_level_3`, points: 5 },
  { label: '認定等がない', value: `${prefix}_care_level_4`, points: 5 },
];

// ⑤ 災害の復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '家屋損傷・その他災害（復旧期間に限る）', value: `${prefix}_disaster_0`, points: 20 },
];

// ⑥ 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業準備を含む）', value: `${prefix}_jobseeking_0`, points: 4 },
];

// ⑦ 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月120時間以上', value: `${prefix}_school_0`, points: 12 },
  { label: '月120時間未満', value: `${prefix}_school_1`, points: 8 },
];

// ⑧ 社会的養護
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待またはDVのおそれがあることに該当する場合など', value: `${prefix}_abuse_0`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '津幡町は父・母それぞれに基本指数が付きます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '社会的養護', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
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
      id: `${prefix}_illness_state`,
      category,
      label: `${parentLabel}の疾病・障害の「状況」は？`,
      helpText: '疾病・障害は「状況」と「障害の程度手帳の種類」の合計です',
      inputType: 'radio',
      options: illnessStateOptions(prefix),
      showFor: ['illness'],
    },
    {
      id: `${prefix}_illness_handbook`,
      category,
      label: `${parentLabel}の「障害の程度手帳の種類」は？`,
      inputType: 'radio',
      options: illnessHandbookOptions(prefix),
      showFor: ['illness'],
    },
    {
      id: `${prefix}_care_state`,
      category,
      label: `${parentLabel}の介護・看護の「状況」は？`,
      helpText: '同居親族の介護・看護は「状況」と「認定等の種類」の合計です',
      inputType: 'radio',
      options: careStateOptions(prefix),
      showFor: ['care'],
    },
    {
      id: `${prefix}_care_level`,
      category,
      label: `${parentLabel}が介護する方の「認定等の種類」は？`,
      inputType: 'radio',
      options: careLevelOptions(prefix),
      showFor: ['care'],
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
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '離婚・離婚調停中・未婚・死別・拘禁中等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+25）', value: 'adj_single_parent_1', points: 25 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労による自立支援に繋がる場合等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_1', points: 5 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護のうち、緊急に施設の利用が必要ですか？',
    helpText: '基本指数⑧（虐待・DVのおそれ）に該当する場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_0', points: 0 },
      { label: 'はい（+40）', value: 'adj_social_care_1', points: 40 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用希望児童が障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+8）', value: 'adj_child_disability_1', points: 8 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    helpText: '当てはまるものの中から、いちばん点数が高いものを加算します',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '兄弟姉妹が入園しているこども園等に、入園を希望する（+14）', value: 'adj_sibling_1', points: 14 },
      { label: '就学前の多胎児がいる世帯（+7）', value: 'adj_sibling_2', points: 7 },
      { label: 'きょうだいで同時に新規に入園申込みをする（+4）', value: 'adj_sibling_3', points: 4 },
      { label: '18歳未満の子が3人以上いる世帯（+4）', value: 'adj_sibling_4', points: 4 },
    ],
  },
  {
    id: 'adj_continue',
    category: 'adjustment',
    label: '継続入所（転園）を希望しますか？',
    helpText: '令和9年度に4歳児・5歳児で、職場の託児所や認可外保育施設を利用している児童、または町が継続して保育を実施している施設に既に在園している児童が、小学校区内の施設への入園を希望する場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_continue_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_continue_1', points: 4 },
    ],
  },
  {
    id: 'adj_holiday_work',
    category: 'adjustment',
    label: '父母ともに休日就労で休日保育を利用しますか？',
    helpText: 'のせ・住吉・ちいろばこども園のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_holiday_work_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_holiday_work_1', points: 3 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母のいずれかが単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_tanshin_1', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が保育士・保育教諭・幼稚園教諭として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+8）', value: 'adj_nursery_staff_1', points: 8 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料等の未納が3か月分以上あり、かつ納付誓約等を履行していませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−20）', value: 'adj_fee_delinquent_1', points: -20 },
    ],
  },
];

export const tsubataData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
