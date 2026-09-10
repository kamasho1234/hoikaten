import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 網走市 保育園入園 利用調整基準データ
// 出典: 網走市「特定教育・保育施設及び特定地域型保育事業の利用調整基準」
// https://www.city.abashiri.hokkaido.jp/uploaded/attachment/5358.pdf
// -------------------------------------------------------------------------
// 網走市は①基本点数と②調整点数を持ち、同一点数の順位表に
// 「①基本点数が高い順」とある。
// 原典は父母の基本点数をどう合わせるかを書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基本点数の最大は1人あたり100点。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 8「虐待・DV」（−、児童および世帯の状況に応じて別途判断）
// - 9「育児休業取得による継続利用」（−、※で条件のみ）
// - 10「その他市長が認める場合」（−）
// - 調整点数「廃園等による転園」（10〜100、幅がある）
//
// 調整点数の表には「（保育料の滞納がないこと）」と条件が書かれている。
// 滞納がある場合の扱いは点数として書かれていないため、設問にしていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'abashiri',
  name: '網走市',
  slug: 'abashiri',
  prefecture: '北海道',
  maxBasePoints: 200, // 父母各100点の合計
  scoringMethod: 'sum',
} as const;

// 1 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外就労：一月における勤務時間が140時間以上', value: `${prefix}_employment_0`, points: 100 },
  { label: '居宅外就労：一月における勤務時間が80時間以上140時間未満', value: `${prefix}_employment_1`, points: 70 },
  { label: '居宅外就労：上記のほか明らかに保育に欠けるもの', value: `${prefix}_employment_2`, points: 60 },
  { label: '居宅外就労：一月における勤務時間が48時間以上80時間未満', value: `${prefix}_employment_3`, points: 50 },
  { label: '居宅内就労（自営・生計中心者）：一月140時間以上', value: `${prefix}_employment_4`, points: 100 },
  { label: '居宅内就労（自営・生計中心者）：一月80時間以上140時間未満', value: `${prefix}_employment_5`, points: 80 },
  { label: '居宅内就労（自営・生計協力者）：一月140時間以上', value: `${prefix}_employment_6`, points: 80 },
  { label: '居宅内就労（自営・生計協力者）：一月80時間以上140時間未満', value: `${prefix}_employment_7`, points: 60 },
  { label: '居宅内就労（内職・生計維持者）：一月140時間以上', value: `${prefix}_employment_8`, points: 100 },
  { label: '居宅内就労（内職・生計維持者）：一月80時間以上140時間未満', value: `${prefix}_employment_9`, points: 80 },
  { label: '居宅内就労（内職・生計維持外）：一月140時間以上', value: `${prefix}_employment_10`, points: 50 },
  { label: '居宅内就労（内職・生計維持外）：一月80時間以上140時間未満', value: `${prefix}_employment_11`, points: 40 },
];

// 2 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中（産前8週間）および出産後8週間', value: `${prefix}_childbirth_0`, points: 100 },
];

// 3 保護者の疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院（6か月以上）', value: `${prefix}_illness_0`, points: 100 },
  { label: '居宅内で常時臥床', value: `${prefix}_illness_1`, points: 100 },
  { label: '身体障がい者1級・2級', value: `${prefix}_illness_2`, points: 100 },
  { label: '知的障がい者A・B', value: `${prefix}_illness_3`, points: 100 },
  { label: '短期入院（6か月未満）', value: `${prefix}_illness_4`, points: 80 },
  { label: '居宅内で精神性の疾病', value: `${prefix}_illness_5`, points: 80 },
  { label: '通院 週4日以上', value: `${prefix}_illness_6`, points: 50 },
  { label: '通院 週4日未満', value: `${prefix}_illness_7`, points: 30 },
];

// 4 同居親族等の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付き添い（1か月以上）', value: `${prefix}_care_0`, points: 100 },
  { label: '重度心身障がい児（者）および寝たきり老人介護', value: `${prefix}_care_1`, points: 80 },
  { label: '居室内看護（長期居宅療養介護）', value: `${prefix}_care_2`, points: 60 },
  { label: '軽度心身障がい児（者）介護', value: `${prefix}_care_3`, points: 30 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他災害の復旧にあたっている', value: `${prefix}_disaster_0`, points: 100 },
];

// 6 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動を継続的に行っている（起業準備含む）', value: `${prefix}_jobseeking_0`, points: 30 },
];

// 7 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '学校教育法に規定する学校等に在学している、または職業訓練等を受けている', value: `${prefix}_school_0`, points: 70 },
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
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族等の介護・看護', value: `${prefix}_reason_care`, points: 0 },
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

// ②「調整点数」（保育料の滞納がないこと）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+80）', value: 'adj_single_parent_1', points: 80 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '継続入所する兄弟がいますか？',
    helpText: '育休で継続した児童および保育の必要性がない児童がいる家庭は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+80）', value: 'adj_sibling_1', points: 80 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+80）', value: 'adj_welfare_1', points: 80 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者が失業中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+80）', value: 'adj_unemployed_1', points: 80 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育休明け復職ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: '以前通園の園に復園（+55）', value: 'adj_leave_return_1', points: 55 },
      { label: '新規入園（+45）', value: 'adj_leave_return_2', points: 45 },
    ],
  },
  {
    id: 'adj_readmission',
    category: 'adjustment',
    label: '育休制度改正による再入園ですか？',
    helpText: '令和5年4月1日入園に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_readmission_0', points: 0 },
      { label: 'はい（+35）', value: 'adj_readmission_1', points: 35 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_many_children_0', points: 0 },
      { label: '就学前児童3人の場合（+25）', value: 'adj_many_children_1', points: 25 },
      { label: '就学前児童2人の場合（+20）', value: 'adj_many_children_2', points: 20 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保育担当者が身体・知的等障がいを有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_0', points: 0 },
      { label: '3級以上（+15）', value: 'adj_parent_disability_1', points: 15 },
      { label: '4級以上（+10）', value: 'adj_parent_disability_2', points: 10 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が保育士等の資格を有し、市内の保育所等で保育関連業務に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+70）', value: 'adj_nursery_staff_1', points: 70 },
    ],
  },
  {
    id: 'adj_care_needed',
    category: 'adjustment',
    label: '要介護者のいる家族ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_care_needed_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_care_needed_1', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '障がいを有する児童がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+40）', value: 'adj_child_disability_1', points: 40 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育事業など地域型保育事業の卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+40）', value: 'adj_graduate_1', points: 40 },
    ],
  },
];

export const abashiriData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
