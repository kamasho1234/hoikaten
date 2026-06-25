import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 会津若松市 保育園入園 利用調整基準データ
// 出典: 会津若松市「令和8年度 利用調整基準表」
// https://www.city.aizuwakamatsu.fukushima.jp/docs/2007080602252/
// ---------------------------------------------------------------------------
// 会津若松市は「基準指数（父母それぞれ最大10点）＋ 調整指数」の加算方式。
// 合計基準指数最大20点。月の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'aizuwakamatsu',
  name: '会津若松市',
  slug: 'aizuwakamatsu',
  prefecture: '福島県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上（1日8時間以上または週40時間以上）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月20日以上（1日7時間以上または週35時間以上）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月20日以上（1日6時間以上または週30時間以上）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月20日以上（1日5時間以上または週25時間以上）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月20日以上（1日4時間以上または週20時間以上）', value: `${prefix}_employment_6`, points: 6 },
  { label: '月16日以上（1日8時間以上または週32時間以上）', value: `${prefix}_employment_8b`, points: 8 },
  { label: '月16日以上（1日7時間以上または週28時間以上）', value: `${prefix}_employment_7b`, points: 7 },
  { label: '月16日以上（1日6時間以上または週24時間以上）', value: `${prefix}_employment_6b`, points: 6 },
  { label: '月16日以上（1日5時間以上または週20時間以上）', value: `${prefix}_employment_5`, points: 5 },
  { label: '月16日以上（1日4時間以上または週16時間以上）', value: `${prefix}_employment_4`, points: 4 },
  { label: '月12日以上（1日8時間以上または週24時間以上）', value: `${prefix}_employment_7c`, points: 7 },
  { label: '月12日以上（1日7時間以上または週21時間以上）', value: `${prefix}_employment_6c`, points: 6 },
  { label: '月12日以上（1日6時間以上または週18時間以上）', value: `${prefix}_employment_5c`, points: 5 },
  { label: '月12日以上（1日5時間以上または週16時間以上）', value: `${prefix}_employment_4c`, points: 4 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'おおむね1か月以上の入院', value: `${prefix}_illness_9`, points: 9 },
  { label: '1か月以上の安静加療を必要とする場合', value: `${prefix}_illness_7`, points: 7 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級または療育手帳A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3級または療育手帳B', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体障害者手帳4～7級', value: `${prefix}_disability_5`, points: 5 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: 'おおむね1か月以上親族の入院に付き添う場合', value: `${prefix}_care_8`, points: 8 },
  { label: '同居の親族の長期にわたる居宅療養等の介護を常時行っている場合', value: `${prefix}_care_7`, points: 7 },
  { label: '心身障がい児(者)の介護、通園、通院、通学等に従事している場合', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産のため保育にあたることができない場合', value: `${prefix}_childbirth_9`, points: 9 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備を含む）', value: `${prefix}_jobseeking_3`, points: 3 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、火災、風水害等の復旧作業のため保育にあたることができない場合', value: `${prefix}_disaster_10`, points: 10 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日就学として、1日平均6時間以上', value: `${prefix}_education_8`, points: 8 },
  { label: '月20日就学として、1日平均6時間未満', value: `${prefix}_education_6`, points: 6 },
];

const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '児童虐待（おそれも含む）や配偶者からの暴力により児童の保育を行うことが困難である場合', value: `${prefix}_abuse_10`, points: 10 },
];

const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '児童福祉の観点から保育の必要性が高いと判断した場合', value: `${prefix}_other_8`, points: 8 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '会津若松市では父母それぞれの基準指数（各最大10点）の合計で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '災害復旧中', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学中', value: `${prefix}_reason_education`, points: 0 },
      { label: 'その他', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧作業中ですか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}または児童が虐待・暴力の対象ですか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}のその他の保育必要性`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_small_facility_graduate',
    category: 'adjustment',
    label: '小規模保育事業・家庭的保育事業等の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_small_facility_yes', points: 30 },
    ],
  },
  {
    id: 'adj_facility_closure',
    category: 'adjustment',
    label: 'やむを得ず施設の変更をする場合ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_closure_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_closure_yes', points: 30 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+12）', value: 'adj_single_parent_yes', points: 12 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯または低所得世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_welfare_yes', points: 7 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者の失業等により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_unemployment_yes', points: 5 },
    ],
  },
  {
    id: 'adj_special_needs_child',
    category: 'adjustment',
    label: '特別児童扶養手当支給対象児童または障害者手帳所持児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_needs_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_special_needs_yes', points: 5 },
    ],
  },
  {
    id: 'adj_siblings_same_facility',
    category: 'adjustment',
    label: 'きょうだいが既に同じ施設を利用していて、同施設を申請しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_siblings_same_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_siblings_same_yes', points: 10 },
    ],
  },
  {
    id: 'adj_siblings_simultaneous',
    category: 'adjustment',
    label: 'きょうだいが同時に新規申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_siblings_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_elder_siblings',
    category: 'adjustment',
    label: '18歳以下の兄姉が2人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_elder_siblings_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_elder_siblings_yes', points: 1 },
    ],
  },
  {
    id: 'adj_employee',
    category: 'adjustment',
    label: '保護者が市内の保育施設またはこどもクラブに勤務する保育士等ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_employee_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_employee_yes', points: 4 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '出産休暇または育児休業終了後に復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '保護者が単身赴任等で不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_assignment_yes', points: 2 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園（転居等により通所継続が困難な場合）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_transfer_yes', points: -1 },
    ],
  },
  {
    id: 'adj_home_care_available',
    category: 'adjustment',
    label: '65歳未満の同居親族が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_care_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_home_care_yes', points: -3 },
    ],
  },
];

export const aizuwakamatsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
