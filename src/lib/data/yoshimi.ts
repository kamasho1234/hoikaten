import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 吉見町 保育園入園 利用調整基準データ
// 出典: 吉見町「令和8年度 よしみけやき保育所入所選考点数表」
// https://www.town.yoshimi.saitama.jp/material/files/group/8/tensuu2026.pdf
// -------------------------------------------------------------------------
// 吉見町の点数表は「父・母の状況」に父と母の列があり、
// 「小計」のあとに「父母合計」の欄が続く。父と母を足すので scoringMethod は 'sum'。
// 基本点数の最大は1人あたり15点（ひとり親家庭、虐待・DV等）。
//
// 「7 家庭内労働（上記1〜6に対する減算）」（−1）は就労の点数への減算なので、
// 就労を選んだときだけ表示される設問にしている。
//
// 「11 ひとり親家庭 死亡・離婚・行方不明等」（15点）は父・母の状況の表にあるので、
// ひとり親の方は、いない側の保護者でこれを選ぶ。
//
// 9「就学」は点数欄が「1〜6を準用」なので、就労と同じ刻みを使っている。
//
// 調整事項の「その他 その他特別な理由により調整が必要と認められた場合」は
// 点数欄が「事情を勘案し決定」なので入れていない。
//
// 減算⑥「育児休業の延長を許容できるため、減点を希望する」（−30）は
// 申込者が自ら選ぶ減点なので、そのまま設問にしている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'yoshimi',
  name: '吉見町',
  slug: 'yoshimi',
  prefecture: '埼玉県',
  maxBasePoints: 15,
  scoringMethod: 'sum',
} as const;

// 就労（1〜6）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_1`, points: 9 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_2`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_3`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_4`, points: 5 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_5`, points: 3 },
];

// 7 家庭内労働（1〜6に対する減算）
const homeWorkOptions = (prefix: string) => [
  { label: 'いいえ', value: `${prefix}_homework_0`, points: 0 },
  { label: 'はい（−1）', value: `${prefix}_homework_1`, points: -1 },
];

// 8 求職中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '月64時間以上の就労となる求職活動中である', value: `${prefix}_jobseeking_0`, points: 1 },
];

// 9 就学（1〜6を準用）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_school_0`, points: 10 },
  { label: '月140時間以上160時間未満', value: `${prefix}_school_1`, points: 9 },
  { label: '月120時間以上140時間未満', value: `${prefix}_school_2`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_school_3`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_school_4`, points: 5 },
  { label: '月64時間以上80時間未満', value: `${prefix}_school_5`, points: 3 },
];

// 10 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産（予定）月とその前後2か月', value: `${prefix}_childbirth_0`, points: 9 },
];

// 11 ひとり親家庭
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死亡・離婚・行方不明等', value: `${prefix}_absent_0`, points: 15 },
];

// 12〜19 疾病等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：1か月以上の入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '居宅療養：常時臥床', value: `${prefix}_illness_1`, points: 10 },
  { label: '障害：身体障害1・2級、療育手帳A', value: `${prefix}_illness_2`, points: 10 },
  { label: '障害：身体障害3級、療育手帳B', value: `${prefix}_illness_3`, points: 8 },
  { label: '居宅療養：精神性、感染性疾患、長期療養を要する疾患', value: `${prefix}_illness_4`, points: 7 },
  { label: '居宅療養：1か月以上の一般療養', value: `${prefix}_illness_5`, points: 6 },
  { label: '障害：身体障害4〜6級、療育手帳C', value: `${prefix}_illness_6`, points: 4 },
  { label: '居宅療養：その他', value: `${prefix}_illness_7`, points: 2 },
];

// 20〜23 看護等
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添：1か月以上の入院付添', value: `${prefix}_care_0`, points: 10 },
  { label: '居宅看護等：全介護（重度身障者・要介護認定4・5）', value: `${prefix}_care_1`, points: 10 },
  { label: '居宅看護等：常時観察と介護（食事・排泄・入浴）を要する場合（要介護認定3）', value: `${prefix}_care_2`, points: 7 },
  { label: '居宅看護等：週3日程度の介護・通院の付添等（要介護認定1・2）', value: `${prefix}_care_3`, points: 5 },
];

// 24 虐待・DV等
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待・DV等の恐れがある場合', value: `${prefix}_dv_0`, points: 15 },
];

// 25 災害・復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災、震災、風水害による家屋損傷、その他災害復旧の状態にある', value: `${prefix}_disaster_0`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父と母の点数を足したものが父母合計になります',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: 'ひとり親家庭（死亡・離婚・行方不明等）', value: `${prefix}_reason_absent`, points: 0 },
      { label: '疾病等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '虐待・DV等', value: `${prefix}_reason_dv`, points: 0 },
      { label: '災害・復旧', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}は家庭内労働ですか？`,
      helpText: '家庭内労働の場合は就労の点数から1点減算されます',
      inputType: 'radio',
      options: homeWorkOptions(prefix),
      showFor: ['employment'],
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
      label: `${parentLabel}の就学時間は？`,
      helpText: '学校教育法に規定する学校、専門学校等。職業能力開発促進法等に規定する職業訓練校等が対象です',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}はひとり親家庭の事由にあたりますか？`,
      helpText: 'ひとり親の方は、いない側の保護者でこれを選びます',
      inputType: 'radio',
      options: absentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病等の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護等の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯に虐待・DV等の恐れがありますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧の状態にありますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整事項
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_1', points: 3 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '産後休暇・育児休業明けの復職ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_return_to_work_1', points: 3 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士資格保有者ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい：町内保育所勤務（+3）', value: 'adj_hoikushi_1', points: 3 },
      { label: 'はい：町外保育所勤務（+1）', value: 'adj_hoikushi_2', points: 1 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_0', points: 0 },
      { label: '未就学児が3人以上（+2）', value: 'adj_many_children_1', points: 2 },
      { label: '未就学児が2人（+1）', value: 'adj_many_children_2', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '町内在住で、きょうだいが在籍していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_family_business',
    category: 'adjustment',
    label: '自営業を営み、父母が同一の事業所で就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_business_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_family_business_1', points: -2 },
    ],
  },
  {
    id: 'adj_jutaku',
    category: 'adjustment',
    label: '受託にあたりますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_jutaku_0', points: 0 },
      { label: '受託（在勤）（−10）', value: 'adj_jutaku_1', points: -10 },
      { label: '受託（上記以外）（−15）', value: 'adj_jutaku_2', points: -15 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: 'きょうだいの保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: '3か月以上ある（−20）', value: 'adj_fee_delinquent_1', points: -20 },
      { label: '6か月以上ある（−30）', value: 'adj_fee_delinquent_2', points: -30 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '育児休業の延長を許容できるため、減点を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_0', points: 0 },
      { label: 'はい（−30）', value: 'adj_leave_extension_1', points: -30 },
    ],
  },
];

export const yoshimiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
