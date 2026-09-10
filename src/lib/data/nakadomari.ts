import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 中泊町 保育園入園 利用調整基準データ
// 出典: 中泊町「特定教育・保育施設の利用の優先順位に関する要綱」
//       別表第1（基本指数）・別表第2（調整指数）
// https://www.town.nakadomari.lg.jp/material/files/group/7/hoikushisu_20210616141305.pdf
// -------------------------------------------------------------------------
// 中泊町は要綱の第3条に手順が書かれている。
//   「規則第13条において町長が定める優先順位は、町内の特定教育・保育施設の
//    募集期間ごとに別表第1に定める基本指数と別表第2に定める調整指数を
//    合計した数値が高い順とする。」
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの指数を合算）に合わせて scoringMethod は 'sum' とした。
// 基本指数の最大は1人あたり10点。
//
// 「就学」は指数欄が「労働に準ずる」なので、労働と同じ刻みを使っている。
//
// 原典で指数が言葉でしか書かれていない項目は入れていない。
// - その他「町長が特に認める場合」（町長が認める指数）
//
// 「育児休業」（8点）は「育児休業取得時に、既に保育を利用している子どもがいる」
// なので、いま園を利用している方の話として入れていない。
//
// 調整指数の5〜7（居宅内労働の減算）は、原典が父母を分けずに1行ずつ挙げているため、
// 世帯としてどれか1つを選ぶ設問にしている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'nakadomari',
  name: '中泊町',
  slug: 'nakadomari',
  prefecture: '青森県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// 労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上労働', value: `${prefix}_employment_0`, points: 10 },
  { label: '月120時間以上160時間未満労働', value: `${prefix}_employment_1`, points: 9 },
  { label: '月80時間以上120時間未満労働', value: `${prefix}_employment_2`, points: 8 },
  { label: '月48時間以上80時間未満労働', value: `${prefix}_employment_3`, points: 7 },
];

// 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後の休養', value: `${prefix}_childbirth_0`, points: 10 },
];

// 疾病・負傷 ／ 障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1箇月以上）', value: `${prefix}_illness_0`, points: 10 },
  { label: '居宅内：常時病臥', value: `${prefix}_illness_1`, points: 10 },
  { label: '障害：身体障害者手帳1・2級、精神障害者手帳1級、療育手帳A', value: `${prefix}_illness_2`, points: 10 },
  { label: '入院（1箇月以内）', value: `${prefix}_illness_3`, points: 9 },
  { label: '居宅内：精神性', value: `${prefix}_illness_4`, points: 9 },
  { label: '居宅内：一般療養', value: `${prefix}_illness_5`, points: 8 },
  { label: '障害：身体障害者手帳3級、精神障害者手帳2・3級、療育手帳B', value: `${prefix}_illness_6`, points: 8 },
  { label: '障害：身体障害者手帳4級以下', value: `${prefix}_illness_7`, points: 6 },
];

// 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '身体障害者手帳1・2級、精神障害者手帳1級、療育手帳A、要介護度4以上又はこれらに相当する同居の親族を週5日以上、居宅介護・看護する場合', value: `${prefix}_care_0`, points: 10 },
  { label: '身体障害者手帳1〜6級、精神障害者手帳1〜3級、療育手帳A・B、要介護度1以上又はこれらに相当する同居の親族を週3日以上、居宅介護・看護する場合', value: `${prefix}_care_1`, points: 8 },
  { label: '病院等の付添：常時付添が必要な親族を病院等で介護・看護', value: `${prefix}_care_2`, points: 8 },
  { label: '上記以外で同居の親族を介護・看護する場合', value: `${prefix}_care_3`, points: 6 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害の復旧に当たっている', value: `${prefix}_disaster_0`, points: 10 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業の準備を含む）を継続的に行っている', value: `${prefix}_jobseeking_0`, points: 4 },
];

// 就学（労働に準ずる）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月160時間以上の在学', value: `${prefix}_school_0`, points: 10 },
  { label: '月120時間以上160時間未満の在学', value: `${prefix}_school_1`, points: 9 },
  { label: '月80時間以上120時間未満の在学', value: `${prefix}_school_2`, points: 8 },
  { label: '月48時間以上80時間未満の在学', value: `${prefix}_school_3`, points: 7 },
];

// 虐待・DV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待：児童虐待を行っている又は再び行われるおそれがある', value: `${prefix}_dv_0`, points: 10 },
  { label: 'DV：配偶者からの暴力', value: `${prefix}_dv_1`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基本指数と調整指数を合計した数値が高い順に決まります',
    inputType: 'select',
    options: [
      { label: '労働', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
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
      label: `${parentLabel}の在学の状況は？`,
      helpText: '学校教育法に規定する学校等・職業訓練校等が対象で、労働に準じた指数になります',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯は虐待・DVにあたりますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 別表第2 調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_1', points: 2 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯で同居親族がいませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_1', points: 5 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '未就学児が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_many_children_1', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母（60歳未満）が無職又は休職中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−4）', value: 'adj_grandparent_1', points: -4 },
    ],
  },
  {
    id: 'adj_home_work',
    category: 'adjustment',
    label: '居宅内労働にあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_home_work_0', points: 0 },
      { label: '居宅内労働（自営）（−1）', value: 'adj_home_work_1', points: -1 },
      { label: '居宅内労働（自営の協力者）（−2）', value: 'adj_home_work_2', points: -2 },
      { label: '居宅内労働（内職）（−2）', value: 'adj_home_work_3', points: -2 },
    ],
  },
];

export const nakadomariData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
