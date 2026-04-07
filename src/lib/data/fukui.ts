import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 福井市 保育園入園 基本点数・調整点数データ
// 出典：福井市保育の提供に係る教育・保育給付認定等事務取扱要綱（別表）
// https://www1.g-reiki.net/city.fukui/reiki_honbun/s500RG00000400.html
// ---------------------------------------------------------------------------
//
// 福井市の利用調整は以下のように算出されます。
//   利用調整指数 ＝ 父母のうち基本点数の低い方 ＋ 調整点数
// 父母それぞれの基本点数を算出し、低い方を採用します（scoringMethod: "min"）。
// 基本点数は最大11点（就労月150時間以上 or 災害復旧）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'fukui',
  name: '福井市',
  slug: 'fukui',
  prefecture: '福井県',
  maxBasePoints: 11,
  scoringMethod: 'min' as const,
} as const;

// ---------------------------------------------------------------------------
// ① 就労（家庭外・自営含む）
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_none`, points: 0 },
  { label: '就労：月150時間以上', value: `${prefix}_emp_11`, points: 11 },
  { label: '就労：月140〜150時間未満', value: `${prefix}_emp_10`, points: 10 },
  { label: '就労：月120〜140時間未満', value: `${prefix}_emp_9`, points: 9 },
  { label: '就労：月100〜120時間未満', value: `${prefix}_emp_8`, points: 8 },
  { label: '就労：月64〜100時間未満', value: `${prefix}_emp_7`, points: 7 },
  { label: '内職：月120時間以上', value: `${prefix}_emp_naishoku_7`, points: 7 },
  { label: '内職：月64〜120時間未満', value: `${prefix}_emp_naishoku_5`, points: 5 },
];

// ---------------------------------------------------------------------------
// ② 妊娠・出産
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産準備・休養期間にある（5点）', value: `${prefix}_childbirth_5`, points: 5 },
];

// ---------------------------------------------------------------------------
// ③ 疾病・障害
// ---------------------------------------------------------------------------

const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または相当の治療が必要（10点）', value: `${prefix}_illness_10`, points: 10 },
  { label: '通院加療で安静が必要（7点）', value: `${prefix}_illness_7`, points: 7 },
  { label: 'その他保育困難な疾病（5点）', value: `${prefix}_illness_5`, points: 5 },
  { label: '身体障害者手帳1・2級等（9点）', value: `${prefix}_disability_9`, points: 9 },
  { label: '身体障害者手帳3級等（7点）', value: `${prefix}_disability_7`, points: 7 },
  { label: 'その他障害者手帳保有（5点）', value: `${prefix}_disability_5`, points: 5 },
];

// ---------------------------------------------------------------------------
// ④ 介護・看護
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護・看護が必要（9点）', value: `${prefix}_care_9`, points: 9 },
  { label: '定期的な付添い等（7点）', value: `${prefix}_care_7`, points: 7 },
  { label: 'その他身の回りの支援（5点）', value: `${prefix}_care_5`, points: 5 },
];

// ---------------------------------------------------------------------------
// ⑤ 災害復旧
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に当たっている（11点）', value: `${prefix}_disaster_11`, points: 11 },
];

// ---------------------------------------------------------------------------
// ⑥ 求職活動
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '継続的な求職活動中（3点）', value: `${prefix}_jobseeking_3`, points: 3 },
];

// ---------------------------------------------------------------------------
// ⑦ 就学
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上相当の通学（8点）', value: `${prefix}_education_8`, points: 8 },
  { label: 'その他の通学（5点）', value: `${prefix}_education_5`, points: 5 },
];

// ---------------------------------------------------------------------------
// ⑧ 育児休業中
// ---------------------------------------------------------------------------

const childcareLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childcareleave_none`, points: 0 },
  { label: '育児休業で1歳未満の子どもを保育（4点）', value: `${prefix}_childcareleave_4`, points: 4 },
  { label: '育児休業で1歳以上の子どもを保育（3点）', value: `${prefix}_childcareleave_3a`, points: 3 },
  { label: '育児休業なしで1歳未満の子どもを保育（3点）', value: `${prefix}_childcareleave_3b`, points: 3 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '福井市では父母それぞれの基本点数（最大11点）を算出し、低い方の点数を採用します。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '働いている（就労・自営・内職）', value: `${prefix}_reason_emp`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_childcareleave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_emp`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '月の実働時間に応じて点数が決まります',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産準備・休養期間にある場合が対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      helpText: '入院・通院・障害者手帳の等級に応じて点数が決まります',
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '親族等の介護・看護が対象です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に該当しますか？`,
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
      label: `${parentLabel}の就学の状況は？`,
      helpText: '高校・大学・職業訓練学校等に通っている場合',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_childcareleave`,
      category,
      label: `${parentLabel}の育児休業の状況は？`,
      helpText: '育児休業中で既に入所しているお子さんの継続保育が必要な場合',
      inputType: 'radio',
      options: childcareLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: 'ひとり親家庭の場合、調整点数+3が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で就労自立支援の見込みがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者の失業で就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ikukyu_fukushoku',
    category: 'adjustment',
    label: '育児休業後の復職に伴う入園申込みですか？',
    helpText: '育児休業から復帰して入所を希望する場合、調整点数+1が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_fukushoku_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_ikukyu_fukushoku_yes', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が福井市内で保育教諭・保育士として勤務していますか？',
    helpText: '内定を含みます。調整点数+4が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_hoikushi_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況を選んでください',
    helpText: '保育を理由に入所中の施設への申込みは+4、保育以外の理由で入所中の施設への申込みは+2、同日出生のきょうだいの同時申込みは+2、きょうだいの同時申込みは+1',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが保育理由で入所中の施設へ申込み（+4）', value: 'adj_sibling_hoiku', points: 4 },
      { label: 'きょうだいが保育以外の理由で入所中の施設へ申込み（+2）', value: 'adj_sibling_other', points: 2 },
      { label: '同日出生のきょうだい（多胎児）で同時申込み（+2）', value: 'adj_sibling_twin', points: 2 },
      { label: 'きょうだいで同時申込み（+1）', value: 'adj_sibling_douji', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '対象のお子さんに障害がありますか？',
    helpText: '障害の程度に応じて1〜3点の加点があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const fukuiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
