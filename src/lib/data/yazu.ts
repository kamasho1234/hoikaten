import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 八頭町 保育園入園 利用調整基準データ
// 出典: 八頭町「八頭町保育所入所選考（利用調整）基準表」
// https://www.town.yazu.tottori.jp/uploaded/attachment/7172.pdf
// -------------------------------------------------------------------------
// 八頭町は表の冒頭に計算式が書かれている。
//   「八頭町の保育所の入所にあたっては、本表により利用調整基準指数を求めるものとする。
//    『(1)基本指数(保護者A＋保護者B)』＋『(2)調整指数』＝（合計）『利用調整基準指数』」
// 保護者A＋保護者Bなので scoringMethod は 'sum'。
// maxBasePoints は「父母ともフルタイムで働いた場合の世帯合計」なので、
// 就労の満点（1人あたり10点）×2 = 20点。児童虐待・DVの30点は例外的な行なので使わない。
//
// 原典で指数が準用・個別判断でしか書かれていない項目は入れていない。
// - 基本指数⑩ その他「上記①〜⑨に類するものと認められる」（※1は①〜⑨を準用する）
// - 調整指数⑦ その他「上記①〜⑥に類するものと認められる」（※2は状況に応じて個別に判断する）
//
// 基本指数⑨「育児休業」（5点）は「当該育児休業に係る子ども以外の子どもが保育所等を
// 引き続き利用することが必要であると認められる」で、いま園を利用している方の話なので
// 入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'yazu',
  name: '八頭町',
  slug: 'yazu',
  prefecture: '鳥取県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// ① 就労（自営業・農林水産業・内職を含む）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（週40時間以上）の就労を常態としている', value: `${prefix}_employment_0`, points: 10 },
  { label: '月140時間以上160時間未満（週35時間以上40時間未満）の就労を常態としている', value: `${prefix}_employment_1`, points: 10 },
  { label: '月120時間以上140時間未満（週30時間以上35時間未満）の就労を常態としている', value: `${prefix}_employment_2`, points: 9 },
  { label: '月100時間以上120時間未満（週25時間以上30時間未満）の就労を常態としている', value: `${prefix}_employment_3`, points: 8 },
  { label: '月80時間以上100時間未満（週20時間以上25時間未満）の就労を常態としている', value: `${prefix}_employment_4`, points: 7 },
  { label: '月60時間以上80時間未満（週15時間以上20時間未満）の就労を常態としている', value: `${prefix}_employment_5`, points: 6 },
];

// ② 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中であるか又は出産後間もない（切迫流産などは「疾病」とする）', value: `${prefix}_childbirth_0`, points: 7 },
];

// ③ （保護者の）疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1ヶ月以上入院を要する）', value: `${prefix}_illness_0`, points: 10 },
  { label: '居宅内療養：常時臥床（1ヶ月以上常時臥床での療養を要する）', value: `${prefix}_illness_1`, points: 10 },
  { label: '障がい：身体障害者手帳・精神障害者福祉手帳の1・2級または療育手帳のA判定程度', value: `${prefix}_illness_2`, points: 10 },
  { label: '居宅内療養：精神疾患（1ヶ月以上安静加療を要する）', value: `${prefix}_illness_3`, points: 9 },
  { label: '居宅内療養：上記以外の安静加療（1ヶ月以上安静加療を要する）', value: `${prefix}_illness_4`, points: 8 },
  { label: '障がい：身体障害者手帳・精神障害者福祉手帳の3級または療育手帳のB判定程度', value: `${prefix}_illness_5`, points: 8 },
  { label: '居宅内療養：通院療養（1ヶ月以上通院療養を要する）', value: `${prefix}_illness_6`, points: 6 },
  { label: '障がい：上記以外（身体障害者手帳・精神障害者福祉手帳の4級以下）で子どもの保育ができない、または保育が困難である', value: `${prefix}_illness_7`, points: 6 },
  { label: '疾病・負傷：上記以外で子どもの保育ができない、または保育が困難である', value: `${prefix}_illness_8`, points: 5 },
];

// ④ （親族の）介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添い（医療機関等の指示により1ヶ月以上の入院付添いを要する）', value: `${prefix}_care_0`, points: 10 },
  { label: '在宅介護：重度障害者の全介護（要介護認定5・4、身体障害者手帳1・2級の親族の介護）を要する', value: `${prefix}_care_1`, points: 10 },
  { label: '在宅介護：常時観察と介護（食事・排泄・入浴等の介護）を要する', value: `${prefix}_care_2`, points: 8 },
  { label: '通院・通所付添い（施設への通院・通所に常時付添いを要する）', value: `${prefix}_care_3`, points: 6 },
  { label: '上記以外で子どもの保育ができない、または保育が困難である', value: `${prefix}_care_4`, points: 5 },
];

// ⑤ 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害の復旧にあたっている', value: `${prefix}_disaster_0`, points: 10 },
];

// ⑥ 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業準備を含む）を断続的に行っている', value: `${prefix}_jobseeking_0`, points: 4 },
];

// ⑦ 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月120時間以上（週30時間以上）の就学・訓練を常態としている', value: `${prefix}_school_0`, points: 8 },
  { label: '月60時間以上120時間未満（週15時間以上30時間未満）の就学・訓練を常態としている', value: `${prefix}_school_1`, points: 6 },
];

// ⑧ 児童虐待・DV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '子どもに対する児童虐待のおそれがある、又は配偶者からの暴力により子どもの保育を行うことが困難である', value: `${prefix}_dv_0`, points: 30 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '利用調整基準指数は「基本指数（保護者A＋保護者B）」＋「調整指数」です',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '児童虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '自営業・農林水産業・内職を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の親族の介護・看護の状況は？`,
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
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・訓練の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯に児童虐待・DVのおそれがありますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// (2) 調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい：祖父母と同居していない世帯（+15）', value: 'adj_single_parent_1', points: 15 },
      { label: 'はい：祖父母と同居している世帯（+10）', value: 'adj_single_parent_2', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（生活保護法による被保護世帯のうち就労により自立が見込まれる場合）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_1', points: 5 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '保護者が育児休業後に復職しますか？',
    helpText: '予定を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_return_to_work_1', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所を希望する児童が障がいを有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_child_disability_1', points: 5 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '小規模保育事業など地域型保育事業を利用しており、卒園予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_chiikigata_1', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の同一施設利用についてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '利用を希望する保育所等が、兄弟姉妹が現に保育を受けている保育所等と同一である（+4）', value: 'adj_sibling_1', points: 4 },
      { label: '兄弟姉妹で新規に同一保育所等の利用を希望する（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料の未納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_fee_delinquent_1', points: -5 },
    ],
  },
];

export const yazuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
