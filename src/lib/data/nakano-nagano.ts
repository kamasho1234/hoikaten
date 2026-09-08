import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 中野市 保育園入園 利用調整基準データ
// 出典: 中野市「中野市保育所の利用調整基準表」
// https://www.city.nakano.nagano.jp/docs/2025091000027/file_contents/riyouryousei.pdf
// -------------------------------------------------------------------------
// 中野市は基本点数項目表の下に「※ 父母のどちらか低い指数で算出する」とある。
// これにより scoringMethod は 'min'。基本点の最大は10点。
//
// slug は nakano-nagano。東京都中野区がすでに nakano として登録されているため、
// 県名を付けて分けている（`src/lib/data/nakano.ts` が中野区）。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 基準外「児童虐待やDVの恐れがあると認められる場合」
// - 基準外「死別・行方不明・拘禁などで父母とも不存在の場合」
//   どちらも「基準点によらず、最優先とするもの」とあり、点数が付かない
// - 調整点9のうち「保育料等の滞納が高額となっている世帯」（滞納月×−1）
//   … 月数で決まるため選択肢では表せない
//
// 7 就学は「就労（会社等に雇用されている者・自営中心者）の基本点を準用」とあり、
// 就労の表をそのまま当てはめるため、就労の設問で答える形にしている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'nakano-nagano',
  name: '中野市',
  slug: 'nakano-nagano',
  prefecture: '長野県',
  maxBasePoints: 10,
  scoringMethod: 'min',
} as const;

// 1 就労（7 就学も同じ基本点を準用）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '雇用・自営中心者：週5日以上（不規則は月20日以上）かつ1日7時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '雇用・自営中心者：週5日以上かつ1日6時間以上', value: `${prefix}_employment_1`, points: 9 },
  { label: '雇用・自営中心者：週5日以上かつ1日5時間以上', value: `${prefix}_employment_2`, points: 8 },
  { label: '雇用・自営中心者：週4日以上（不規則は月16日以上）かつ1日7時間以上', value: `${prefix}_employment_3`, points: 8 },
  { label: '雇用・自営中心者：週5日以上かつ1日4時間以上', value: `${prefix}_employment_4`, points: 7 },
  { label: '雇用・自営中心者：週4日以上かつ1日6時間以上', value: `${prefix}_employment_5`, points: 7 },
  { label: '雇用・自営中心者：週5日以上かつ1日4時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '雇用・自営中心者：週4日以上かつ1日5時間以上', value: `${prefix}_employment_7`, points: 6 },
  { label: '雇用・自営中心者：週3日以上（不規則は月15日以上）かつ1日7時間以上', value: `${prefix}_employment_8`, points: 6 },
  { label: '雇用・自営中心者：週4日以上かつ1日4時間以上', value: `${prefix}_employment_9`, points: 5 },
  { label: '雇用・自営中心者：週3日以上かつ1日6時間以上', value: `${prefix}_employment_10`, points: 5 },
  { label: '雇用・自営中心者：週4日以上かつ1日3時間以上', value: `${prefix}_employment_11`, points: 4 },
  { label: '雇用・自営中心者：週3日以上かつ1日4時間以上', value: `${prefix}_employment_12`, points: 4 },
  { label: '雇用・自営中心者：月48時間以上就労で上記以外', value: `${prefix}_employment_13`, points: 3 },
  { label: '自営協力者・農業・内職：週5日以上かつ1日7時間以上', value: `${prefix}_employment_14`, points: 9 },
  { label: '自営協力者・農業・内職：週5日以上かつ1日6時間以上', value: `${prefix}_employment_15`, points: 8 },
  { label: '自営協力者・農業・内職：週5日以上かつ1日5時間以上', value: `${prefix}_employment_16`, points: 7 },
  { label: '自営協力者・農業・内職：週4日以上かつ1日7時間以上', value: `${prefix}_employment_17`, points: 7 },
  { label: '自営協力者・農業・内職：週5日以上かつ1日4時間以上', value: `${prefix}_employment_18`, points: 6 },
  { label: '自営協力者・農業・内職：週4日以上かつ1日6時間以上', value: `${prefix}_employment_19`, points: 6 },
  { label: '自営協力者・農業・内職：週5日以上かつ1日4時間未満', value: `${prefix}_employment_20`, points: 5 },
  { label: '自営協力者・農業・内職：週4日以上かつ1日5時間以上', value: `${prefix}_employment_21`, points: 5 },
  { label: '自営協力者・農業・内職：週3日以上かつ1日7時間以上', value: `${prefix}_employment_22`, points: 5 },
  { label: '自営協力者・農業・内職：週4日以上かつ1日4時間以上', value: `${prefix}_employment_23`, points: 4 },
  { label: '自営協力者・農業・内職：週3日以上かつ1日6時間以上', value: `${prefix}_employment_24`, points: 4 },
  { label: '自営協力者・農業・内職：月48時間以上就労で上記以外', value: `${prefix}_employment_25`, points: 3 },
  { label: '申込み時点以降に就労予定で、かつ事業主との関係が親族の場合', value: `${prefix}_employment_26`, points: 2 },
];

// 2 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前後各8週間', value: `${prefix}_childbirth_0`, points: 9 },
  { label: '上記以外', value: `${prefix}_childbirth_1`, points: 2 },
];

// 3 疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '自宅療養で常時臥床', value: `${prefix}_illness_1`, points: 10 },
  { label: '身体障害者手帳1級・2級／療育手帳A1・A2／精神障害者保健福祉手帳1級', value: `${prefix}_illness_2`, points: 10 },
  { label: '自宅療養で週1回以上の通院を伴う1か月以上の療養', value: `${prefix}_illness_3`, points: 7 },
  { label: '身体障害者手帳3級／療育手帳B1／精神障害者保健福祉手帳2級', value: `${prefix}_illness_4`, points: 7 },
  { label: '自宅療養でその他乳児保育不可能と認められる療養', value: `${prefix}_illness_5`, points: 5 },
  { label: '身体障害者手帳4級／療育手帳B2／精神障害者保健福祉手帳3級', value: `${prefix}_illness_6`, points: 4 },
];

// 4 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '在宅介護・看護：要介護5・4／身体障害者手帳1・2級／療育手帳A1・A2／精神障害者保健福祉手帳1級のいずれかを持つ親族の介護・看護', value: `${prefix}_care_0`, points: 10 },
  { label: '入院付添：親族の入院付添に1か月以上あたっている', value: `${prefix}_care_1`, points: 7 },
  { label: '在宅介護・看護：上記以外の介護・看護を必要とする親族の介護・看護', value: `${prefix}_care_2`, points: 4 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害等の復旧', value: `${prefix}_disaster_0`, points: 10 },
];

// 6 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動または起業準備', value: `${prefix}_jobseeking_0`, points: 1 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '中野市は父母のどちらか低い指数で算出します',
    inputType: 'select',
    options: [
      { label: '就労（就学も同じ基本点）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '大学・専門学校・職業訓練校等への通学も、就労（雇用されている者・自営中心者）の基本点を準用します',
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
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害等の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動・起業準備をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2 調整点数項目表
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '離婚・離婚調停中・未婚・死別・行方不明等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_1', points: 5 },
    ],
  },
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
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母の一人が単身赴任または海外勤務で不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_tanshin_1', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用希望児童が障がいにかかる手帳の交付を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の利用状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '既に兄弟姉妹が入所している施設を希望する（+3）', value: 'adj_sibling_1', points: 3 },
      { label: '兄弟姉妹が同時に申込みをする（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業の卒園児が、引き続き市内の保育所の利用を申込みますか？',
    helpText: '4月の入園時のみ適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_graduate_1', points: 2 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '保育所・幼稚園・認定こども園および認可外保育施設からの入所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_transfer_1', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業終了により勤務に復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_leave_return_1', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '中野市内の保育施設で保育士・保育教諭として勤務している、または勤務予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_nursery_staff_1', points: 3 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '在園児または卒園児の保育料等を3か月以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_fee_delinquent_1', points: -3 },
    ],
  },
  {
    id: 'adj_inconsistent',
    category: 'adjustment',
    label: '就労状況に関する整合性の不足等がありますか？',
    helpText: '就労状況（日数・時間等）に対して就労（収入）実績に整合性がない場合や、自営業等の就労状況（予定）申告書に関して本人が就労していることが分かる資料が提出できない場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_inconsistent_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_inconsistent_1', points: -3 },
    ],
  },
];

export const nakanoNaganoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
