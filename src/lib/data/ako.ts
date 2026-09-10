import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 赤穂市 保育園入園 利用調整基準データ
// 出典: 赤穂市「保育施設利用調整基準表」（令和9年度）
// https://www.city.ako.lg.jp/edu/kodomo/documents/r9_riyouchouseikijyunhyou.pdf
// -------------------------------------------------------------------------
// 赤穂市は基本点数を父・母それぞれの列で示し、
// 集計欄が「基本点数（1人当たり点数）＋ 優先・調整点数 ＝ 合計点数」となっている。
// 父母それぞれに点数が付いて合計するため scoringMethod は 'sum'。
// 基本点数の最大は1人あたり30点（入院、家屋等の災害）。
//
// 原典で数値を出していない項目（※、別途相談の上で決める）は選択肢にしていない。
// - 8. その他「虐待やDVのおそれ」「育児休業前に保育施設を利用しており育児休業取得後も
//   引き続き保育が必要」「要保護等支援が必要」
// - 優先・利用調整点数「その他特に考慮すべき事情がある場合」
//
// 「希望施設に入所できない場合、育児休業の延長も許容できる」（−20）は、
// 実質的に選考の対象から外すための値なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'ako',
  name: '赤穂市',
  slug: 'ako',
  prefecture: '兵庫県',
  maxBasePoints: 60, // 父母各30点の合計
  scoringMethod: 'sum',
} as const;

// 1. 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '被雇用者：月20日以上かつ1日7時間以上', value: `${prefix}_employment_0`, points: 28 },
  { label: '被雇用者：月20日以上かつ1日5時間以上7時間未満', value: `${prefix}_employment_1`, points: 25 },
  { label: '被雇用者：月20日以上かつ1日4時間以上5時間未満', value: `${prefix}_employment_2`, points: 22 },
  { label: '被雇用者：月18〜19日かつ1日7時間以上', value: `${prefix}_employment_3`, points: 25 },
  { label: '被雇用者：月18〜19日かつ1日5時間以上7時間未満', value: `${prefix}_employment_4`, points: 22 },
  { label: '被雇用者：月18〜19日かつ1日4時間以上5時間未満', value: `${prefix}_employment_5`, points: 19 },
  { label: '被雇用者：月16〜17日かつ1日7時間以上', value: `${prefix}_employment_6`, points: 22 },
  { label: '被雇用者：月16〜17日かつ1日5時間以上7時間未満', value: `${prefix}_employment_7`, points: 19 },
  { label: '被雇用者：月16〜17日かつ1日4時間以上5時間未満', value: `${prefix}_employment_8`, points: 16 },
  { label: '自宅外自営業主：月20日以上かつ1日7時間以上', value: `${prefix}_employment_9`, points: 28 },
  { label: '自宅外自営業主：月20日以上かつ1日5時間以上7時間未満', value: `${prefix}_employment_10`, points: 25 },
  { label: '自宅外自営業主：月20日以上かつ1日4時間以上5時間未満', value: `${prefix}_employment_11`, points: 22 },
  { label: '自宅外自営業主：月18〜19日かつ1日7時間以上', value: `${prefix}_employment_12`, points: 25 },
  { label: '自宅外自営業主：月18〜19日かつ1日5時間以上7時間未満', value: `${prefix}_employment_13`, points: 22 },
  { label: '自宅外自営業主：月18〜19日かつ1日4時間以上5時間未満', value: `${prefix}_employment_14`, points: 19 },
  { label: '自宅外自営業主：月16〜17日かつ1日7時間以上', value: `${prefix}_employment_15`, points: 22 },
  { label: '自宅外自営業主：月16〜17日かつ1日5時間以上7時間未満', value: `${prefix}_employment_16`, points: 19 },
  { label: '自宅外自営業主：月16〜17日かつ1日4時間以上5時間未満', value: `${prefix}_employment_17`, points: 16 },
  { label: '自宅外自営業の家族専従者：月20日以上かつ1日7時間以上', value: `${prefix}_employment_18`, points: 22 },
  { label: '自宅外自営業の家族専従者：月20日以上かつ1日5時間以上7時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '自宅外自営業の家族専従者：月20日以上かつ1日4時間以上5時間未満', value: `${prefix}_employment_20`, points: 16 },
  { label: '自宅外自営業の家族専従者：月18〜19日かつ1日7時間以上', value: `${prefix}_employment_21`, points: 20 },
  { label: '自宅外自営業の家族専従者：月18〜19日かつ1日5時間以上7時間未満', value: `${prefix}_employment_22`, points: 17 },
  { label: '自宅外自営業の家族専従者：月18〜19日かつ1日4時間以上5時間未満', value: `${prefix}_employment_23`, points: 14 },
  { label: '自宅外自営業の家族専従者：月16〜17日かつ1日7時間以上', value: `${prefix}_employment_24`, points: 18 },
  { label: '自宅外自営業の家族専従者：月16〜17日かつ1日5時間以上7時間未満', value: `${prefix}_employment_25`, points: 15 },
  { label: '自宅外自営業の家族専従者：月16〜17日かつ1日4時間以上5時間未満', value: `${prefix}_employment_26`, points: 12 },
  { label: '自宅内自営業主：月20日以上かつ1日7時間以上', value: `${prefix}_employment_27`, points: 24 },
  { label: '自宅内自営業主：月20日以上かつ1日5時間以上7時間未満', value: `${prefix}_employment_28`, points: 22 },
  { label: '自宅内自営業主：月20日以上かつ1日4時間以上5時間未満', value: `${prefix}_employment_29`, points: 19 },
  { label: '自宅内自営業主：月18〜19日かつ1日7時間以上', value: `${prefix}_employment_30`, points: 19 },
  { label: '自宅内自営業主：月18〜19日かつ1日5時間以上7時間未満', value: `${prefix}_employment_31`, points: 17 },
  { label: '自宅内自営業主：月18〜19日かつ1日4時間以上5時間未満', value: `${prefix}_employment_32`, points: 14 },
  { label: '自宅内自営業主：月16〜17日かつ1日7時間以上', value: `${prefix}_employment_33`, points: 14 },
  { label: '自宅内自営業主：月16〜17日かつ1日5時間以上7時間未満', value: `${prefix}_employment_34`, points: 12 },
  { label: '自宅内自営業主：月16〜17日かつ1日4時間以上5時間未満', value: `${prefix}_employment_35`, points: 9 },
  { label: '自宅内自営業の家族専従者・内職者：月20日以上かつ1日7時間以上', value: `${prefix}_employment_36`, points: 17 },
  { label: '自宅内自営業の家族専従者・内職者：月20日以上かつ1日5時間以上7時間未満', value: `${prefix}_employment_37`, points: 15 },
  { label: '自宅内自営業の家族専従者・内職者：月20日以上かつ1日4時間以上5時間未満', value: `${prefix}_employment_38`, points: 12 },
  { label: '自宅内自営業の家族専従者・内職者：月18〜19日かつ1日7時間以上', value: `${prefix}_employment_39`, points: 15 },
  { label: '自宅内自営業の家族専従者・内職者：月18〜19日かつ1日5時間以上7時間未満', value: `${prefix}_employment_40`, points: 13 },
  { label: '自宅内自営業の家族専従者・内職者：月18〜19日かつ1日4時間以上5時間未満', value: `${prefix}_employment_41`, points: 10 },
  { label: '自宅内自営業の家族専従者・内職者：月16〜17日かつ1日7時間以上', value: `${prefix}_employment_42`, points: 13 },
  { label: '自宅内自営業の家族専従者・内職者：月16〜17日かつ1日5時間以上7時間未満', value: `${prefix}_employment_43`, points: 11 },
  { label: '自宅内自営業の家族専従者・内職者：月16〜17日かつ1日4時間以上5時間未満', value: `${prefix}_employment_44`, points: 8 },
];

// 2. 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_0`, points: 25 },
];

// 3. 保護者の疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_0`, points: 30 },
  { label: '居宅内で常時病臥', value: `${prefix}_illness_1`, points: 28 },
  { label: '身体障害者手帳1〜2級／精神障害者保健福祉手帳1〜2級／療育手帳A', value: `${prefix}_illness_2`, points: 28 },
  { label: '通院加療を行い、常に安静を要するなど、保育不能と診断されている', value: `${prefix}_illness_3`, points: 24 },
  { label: '身体障害者手帳3〜4級／精神障害者保健福祉手帳3級／療育手帳B1', value: `${prefix}_illness_4`, points: 24 },
  { label: '身体障害者手帳・療育手帳の交付を受けている（上記以外）', value: `${prefix}_illness_5`, points: 18 },
  { label: '疾病などにより、やや保育困難と診断されている', value: `${prefix}_illness_6`, points: 15 },
];

// 4. 親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添（入退院時のみ付き添いは除く）', value: `${prefix}_care_0`, points: 25 },
  { label: '要介護5相当（寝たきり）の親族を介護', value: `${prefix}_care_1`, points: 25 },
  { label: '障がい等級①（身1〜2級/精1〜2級/療育A）の親族を介護', value: `${prefix}_care_2`, points: 25 },
  { label: '要介護3〜4相当の親族を介護', value: `${prefix}_care_3`, points: 20 },
  { label: '障がい等級②（身3〜4級/精3級/療育B1）の親族を介護', value: `${prefix}_care_4`, points: 20 },
  { label: '要介護1〜2相当の親族を介護', value: `${prefix}_care_5`, points: 10 },
  { label: '障がい等級③（上記以外の手帳所持）の親族を介護', value: `${prefix}_care_6`, points: 10 },
];

// 5. 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '家屋等の災害', value: `${prefix}_disaster_0`, points: 30 },
];

// 6. 求職活動中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_0`, points: 5 },
];

// 7. 就学（職業訓練）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '通学・職業訓練で週5日以上', value: `${prefix}_school_0`, points: 13 },
  { label: '通学・職業訓練で週4日または通信制', value: `${prefix}_school_1`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '赤穂市は父・母それぞれに点数が付き、合計します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学（職業訓練）', value: `${prefix}_reason_school`, points: 0 },
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
      helpText: '原典では母のみに点数が付く区分です',
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
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学（職業訓練）の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ○優先利用・利用調整点数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '母子・父子家庭、祖父母等養育家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_single_parent_1', points: 15 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_tanshin_1', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労で自立を目指す場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_1', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童本人に障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: '1級〜2級・療育手帳A（+10）', value: 'adj_child_disability_1', points: 10 },
      { label: '3級〜6級・療育手帳B（+8）', value: 'adj_child_disability_2', points: 8 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業明けですか？',
    helpText: '再就職を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_leave_return_1', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: 'きょうだい同時利用希望・きょうだい利用中、もしくは多子世帯（+5）', value: 'adj_sibling_1', points: 5 },
      { label: '保育所等を利用中（前年度第1希望・兄弟利用施設への移行希望）（+5）', value: 'adj_sibling_2', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: 'フルタイム保育士として市内施設に勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_nursery_staff_1', points: 10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母が保育に協力できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ・該当しない', value: 'adj_grandparent_0', points: 0 },
      { label: '同居の祖父母が保育協力可能（−5）', value: 'adj_grandparent_1', points: -5 },
      { label: '同一敷地に居住する祖父母が保育協力可能（−4）', value: 'adj_grandparent_2', points: -4 },
      { label: '同一中学校区に居住する祖父母が保育協力可能（−3）', value: 'adj_grandparent_3', points: -3 },
    ],
  },
  {
    id: 'adj_home_child',
    category: 'adjustment',
    label: '申込児童以外の在宅児童がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_child_0', points: 0 },
      { label: '同居者が保育している（−2）', value: 'adj_home_child_1', points: -2 },
      { label: '別居者が保育している（−1）', value: 'adj_home_child_2', points: -1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '利用申込み時に保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_fee_delinquent_1', points: -5 },
    ],
  },
];

export const akoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
