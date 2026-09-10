import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 十和田市 保育園入園 利用調整基準データ
// 出典: 十和田市「十和田市特定教育・保育施設及び特定地域型保育事業の利用調整基準」
// https://www.city.towada.lg.jp/fukushi/kosodate/jidou/files/hoiku-riyoutyouseikijun.pdf
// -------------------------------------------------------------------------
// 十和田市は原典の「1 優先順位の設定方法」に手順が書かれている。
//   (1)基本点数
//     ① 父母の保育を必要とする事由、父母の状況に応じて、それぞれ基本点数を設定し、
//        父母それぞれの基本点数を合算して世帯の基本点数とする。
//     ② ひとり親家庭の場合は、父又は母の基本点数を2倍して世帯の基本点数とする。
//     ③ 両親がいない場合は、養育者の基本点数で設定する。
// ①により scoringMethod は 'sum'。基本点数の最大は1人あたり8点。
//
// ②のひとり親の「2倍」は、この画面の作り（父母それぞれに答える形）では
// そのまま表せない。ひとり親の方は保護者1だけに答えることになり、
// その1人分の点数が世帯の点数になる。**原典どおりならその2倍になる**ので、
// 出た点数は原典より低めに出る。この点は helpText で断っている。
//
// 原典で数値を出していない項目（※、子ども及び世帯の状況に応じて個別に判断）は
// 選択肢にしていない。
// - ⑧虐待、DV／⑨その他（どちらも福祉事務所長が特に必要と認める場合）
//
// 調整点数「他市町村からの委託申し込み児童の場合」（−1）は、
// 十和田市に申し込む方の話ではないため入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'towada',
  name: '十和田市',
  slug: 'towada',
  prefecture: '青森県',
  maxBasePoints: 16, // 父母各8点の合計
  scoringMethod: 'sum',
} as const;

// ① 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働で実働月140時間以上の就労', value: `${prefix}_employment_0`, points: 8 },
  { label: '居宅外労働で実働月120時間以上140時間未満の就労', value: `${prefix}_employment_1`, points: 7 },
  { label: '居宅外労働で実働月100時間以上120時間未満の就労', value: `${prefix}_employment_2`, points: 6 },
  { label: '居宅外労働で実働月48時間以上100時間未満', value: `${prefix}_employment_3`, points: 5 },
  { label: '農業経営者', value: `${prefix}_employment_4`, points: 7 },
  { label: '農業協力者', value: `${prefix}_employment_5`, points: 5 },
  { label: '居宅内労働で実働月140時間以上の就労', value: `${prefix}_employment_6`, points: 8 },
  { label: '居宅内労働で実働月120時間以上140時間未満の就労', value: `${prefix}_employment_7`, points: 7 },
  { label: '居宅内労働で実働月48時間以上120時間未満', value: `${prefix}_employment_8`, points: 5 },
];

// ② 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産の前後である', value: `${prefix}_childbirth_0`, points: 7 },
];

// ③ 保護者の疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '保護者の入院', value: `${prefix}_illness_0`, points: 8 },
  { label: '身体障害者手帳1・2級／精神障害者保健福祉手帳1級／愛護手帳または療育手帳A', value: `${prefix}_illness_1`, points: 8 },
  { label: '身体障害者手帳3級／精神障害者保健福祉手帳2級／愛護手帳または療育手帳B', value: `${prefix}_illness_2`, points: 6 },
  { label: '通院加療を行い、常に安静を要する', value: `${prefix}_illness_3`, points: 5 },
  { label: '疾病により保育に支障がある', value: `${prefix}_illness_4`, points: 4 },
  { label: '身体障害者手帳4級以下', value: `${prefix}_illness_5`, points: 4 },
];

// ④ 親族の看護・介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月140時間以上', value: `${prefix}_care_0`, points: 7 },
  { label: '月120時間以上140時間未満', value: `${prefix}_care_1`, points: 6 },
  { label: '月100時間以上120時間未満', value: `${prefix}_care_2`, points: 5 },
  { label: '月48時間以上100時間未満', value: `${prefix}_care_3`, points: 4 },
];

// ⑤ 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '自宅や近隣の災害の復旧に当たっている', value: `${prefix}_disaster_0`, points: 8 },
];

// ⑥ 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中である（起業準備等を含む）', value: `${prefix}_jobseeking_0`, points: 3 },
];

// ⑦ 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学・職業訓練', value: `${prefix}_school_0`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText:
      parentNum === 1
        ? '十和田市は父母それぞれの基本点数を合算します。ひとり親家庭は原典では「父又は母の基本点数を2倍」するため、この画面の結果は原典より低めに出ます'
        : '十和田市は父母それぞれの基本点数を合算します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
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
      label: `${parentLabel}の出産の状況は？`,
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
      label: `${parentLabel}の親族の看護・介護の状況は？`,
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
      label: `${parentLabel}は求職中ですか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は就学・職業訓練をしていますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 3 調整点数表
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_0', points: 0 },
      { label: 'ひとり親世帯である（+2）', value: 'adj_household_1', points: 2 },
      { label: '生活保護者世帯で、自立支援のため必要と認められる（+2）', value: 'adj_household_2', points: 2 },
      { label: '生計中心者の失業により、就労の必要性が高い（+2）', value: 'adj_household_3', points: 2 },
      { label: '産前産後休暇または育児休業終了後の復職の場合（+2）', value: 'adj_household_4', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '児童・兄弟姉妹の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '既に兄弟姉妹が保育施設等を利用している（+4）', value: 'adj_sibling_1', points: 4 },
      { label: '地域型保育事業の卒園児童（+3）', value: 'adj_sibling_2', points: 3 },
      { label: '当該児童が障がい児（+1）', value: 'adj_sibling_3', points: 1 },
      { label: '兄弟姉妹が同時に申し込みをする（+1）', value: 'adj_sibling_4', points: 1 },
      { label: '第三子以降の児童の申し込み（+1）', value: 'adj_sibling_5', points: 1 },
    ],
  },
  {
    id: 'adj_home_child',
    category: 'adjustment',
    label: '申し込み児童以外に、申し込みのない未就学児童がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_child_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_home_child_1', points: -1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が保育士・保育教諭として市内の保育園等に勤務しており、自身の勤務先へ申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_nursery_staff_1', points: 4 },
    ],
  },
];

export const towadaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
