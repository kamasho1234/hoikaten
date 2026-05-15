import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 白山市 保育所入所基準データ
// 出典：白山市保育こども園課「白山市保育所入所基準（抄）」参考・金沢市に準じた石川県標準方式
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hakusan',
  name: '白山市',
  slug: 'hakusan',
  prefecture: '石川県',
  maxBasePoints: 100, // 父母各100点（低い方を採用）
  scoringMethod: 'min' as const, // 低い方の基本指数を申請児童の基本指数とする
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_70`, points: 70 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_60`, points: 60 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_50`, points: 50 },
  { label: '月48時間以上80時間未満', value: `${prefix}_employment_40`, points: 40 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中または産後8週間後の月末まで', value: `${prefix}_childbirth_100`, points: 100 },
];

/** 疾病・負傷・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_100a`, points: 100 },
  { label: '居宅：常時病臥または精神・感染性疾患', value: `${prefix}_illness_100b`, points: 100 },
  { label: '居宅：一般療養', value: `${prefix}_illness_50`, points: 50 },
  { label: '身体障害者手帳1・2級／精神1級／療育手帳A', value: `${prefix}_illness_dis100`, points: 100 },
  { label: '身体障害者手帳3級／精神2級／療育手帳BI', value: `${prefix}_illness_dis80`, points: 80 },
  { label: '身体障害者手帳4級／精神3級／療育手帳BII', value: `${prefix}_illness_dis40`, points: 40 },
];

/** 同居親族の介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院の付添（週3日以上）', value: `${prefix}_care_80`, points: 80 },
  { label: '通院等の付添（週3日以上）', value: `${prefix}_care_50`, points: 50 },
  { label: '自宅：寝たきり人介護・重度の認知症', value: `${prefix}_care_70`, points: 70 },
  { label: '自宅：身体1・2級／精神1級／療育手帳A', value: `${prefix}_care_dis70`, points: 70 },
  { label: '自宅：身体3級／精神2級／療育手帳BI', value: `${prefix}_care_dis50`, points: 50 },
  { label: '自宅：身体4級／精神3級／療育手帳BII', value: `${prefix}_care_dis40`, points: 40 },
  { label: '自宅：一般介護（上記以外）', value: `${prefix}_care_30`, points: 30 },
];

/** 災害の復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '家屋損傷・その他災害（復旧期間に限る）', value: `${prefix}_disaster_100`, points: 100 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備を含む）', value: `${prefix}_jobseeking_30`, points: 30 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上', value: `${prefix}_education_60`, points: 60 },
  { label: '月120時間未満', value: `${prefix}_education_40`, points: 40 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(
  parentNum: 1 | 2,
): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  // 「保育が必要な理由」の大分類選択
  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'もっとも高い指数に該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠中・出産前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・負傷・障害がある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  // 各理由の詳細質問
  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障害の状況は？`,
      helpText: 'いちばん近い状態を選んでください',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護していますか？`,
      helpText: '介護の状況を選んでください',
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
      label: `${parentLabel}は仕事を探していますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '月あたりの通学時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    helpText: '離婚・離婚調停中・未婚・死別・拘禁中等',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 50 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    helpText: '就労による自立支援に繋がる場合等',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業していますか？',
    helpText: '主として生計を維持する者の失業により就労の必要性が高い場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 40 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用希望のお子さまに障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 45 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業明けで、退所した保育所等への再入所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 40 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況を選んでください',
    helpText: '兄弟姉妹が入所中の保育所等に入所希望、または同時申込みの場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが入所中の保育所等に入所希望', value: 'adj_sibling_same', points: 60 },
      { label: 'きょうだいと同時に新規申込', value: 'adj_sibling_simultaneous', points: 45 },
      { label: '就学前の多胎児がいる', value: 'adj_sibling_multiples', points: 10 },
    ],
  },
  {
    id: 'adj_small_nursery_grad',
    category: 'adjustment',
    label: '小規模保育事業等の卒園児童ですか？',
    helpText: '地域型保育事業の卒園児童が保育所等への入所を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_grad_no', points: 0 },
      { label: 'はい', value: 'adj_small_nursery_grad_yes', points: 35 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園を希望していますか？',
    helpText: '白山市が継続して保育を実施しており、別の保育所等への入所を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: 35 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '18歳未満の兄弟姉妹が3人以上いますか？',
    helpText: '多子世帯の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居の祖父母がいて、保育が可能ですか？',
    helpText: '該当すると減点（△40）になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -40 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const hakusanData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
