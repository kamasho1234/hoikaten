import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 南魚沼市 保育園入園 利用調整基準データ
// 出典: 南魚沼市「保育園等入園基準指数表」
// https://www.city.minamiuonuma.niigata.jp/fs/2/6/8/4/3/8/_/12197.pdf
// -------------------------------------------------------------------------
// 南魚沼市は原典に手順が書かれている。
//   「利用調整では、保育の必要指数（基本指数と調整指数の合計）を算定し、
//    指数の高い方から入園を決定します。」
// 基本指数は「父・母それぞれ1つに○をつけてください」とあり、
// 父・母それぞれの列に点数が並んでいる。父母それぞれに点数が付いて合計するため
// scoringMethod は 'sum'。基本指数の最大は1人あたり10点。
//
// 原典で父母どちらかに斜線が引かれているところは、その組み合わせを選べない。
// - 家庭外労働・家庭内労働の「月12日以上16日未満かつ1日4時間未満」
//   および「月12日未満かつ1日4時間未満」… 父母とも斜線
// - 母の妊娠・出産 … 父の欄が斜線（母のみ）
// これらは選択肢にしていない（母の妊娠・出産は残し、説明文で断っている）。
//
// 「各就労時間は、休憩時間を含みます。」
// -------------------------------------------------------------------------

const municipality = {
  id: 'minamiuonuma',
  name: '南魚沼市',
  slug: 'minamiuonuma',
  prefecture: '新潟県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

// (1) 家庭外労働 ／ (2) 家庭内労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '家庭外労働：月20日以上かつ1日7時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '家庭外労働：月20日以上かつ1日4時間以上7時間未満', value: `${prefix}_employment_1`, points: 9 },
  { label: '家庭外労働：月16日以上20日未満かつ1日7時間以上', value: `${prefix}_employment_2`, points: 9 },
  { label: '家庭外労働：月20日以上かつ1日4時間未満', value: `${prefix}_employment_3`, points: 8 },
  { label: '家庭外労働：月16日以上20日未満かつ1日4時間以上7時間未満', value: `${prefix}_employment_4`, points: 8 },
  { label: '家庭外労働：月12日以上16日未満かつ1日7時間以上', value: `${prefix}_employment_5`, points: 8 },
  { label: '家庭外労働：月16日以上20日未満かつ1日4時間未満', value: `${prefix}_employment_6`, points: 7 },
  { label: '家庭外労働：月12日以上16日未満かつ1日4時間以上7時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '家庭外労働：月12日未満かつ1日7時間以上', value: `${prefix}_employment_8`, points: 7 },
  { label: '家庭外労働：月12日未満かつ1日4時間以上7時間未満', value: `${prefix}_employment_9`, points: 6 },
  { label: '家庭内労働：月20日以上かつ1日7時間以上', value: `${prefix}_employment_10`, points: 9 },
  { label: '家庭内労働：月20日以上かつ1日4時間以上7時間未満', value: `${prefix}_employment_11`, points: 8 },
  { label: '家庭内労働：月16日以上20日未満かつ1日7時間以上', value: `${prefix}_employment_12`, points: 8 },
  { label: '家庭内労働：月20日以上かつ1日4時間未満', value: `${prefix}_employment_13`, points: 7 },
  { label: '家庭内労働：月16日以上20日未満かつ1日4時間以上7時間未満', value: `${prefix}_employment_14`, points: 7 },
  { label: '家庭内労働：月12日以上16日未満かつ1日7時間以上', value: `${prefix}_employment_15`, points: 7 },
  { label: '家庭内労働：月16日以上20日未満かつ1日4時間未満', value: `${prefix}_employment_16`, points: 6 },
  { label: '家庭内労働：月12日以上16日未満かつ1日4時間以上7時間未満', value: `${prefix}_employment_17`, points: 6 },
  { label: '家庭内労働：月12日未満かつ1日7時間以上', value: `${prefix}_employment_18`, points: 6 },
  { label: '家庭内労働：月12日未満かつ1日4時間以上7時間未満', value: `${prefix}_employment_19`, points: 5 },
];

// (3) 親の不存在
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '父または母がいない', value: `${prefix}_absent_0`, points: 10 },
];

// (4) 出産・病気
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '自宅療養で常時病臥、精神性の疾病', value: `${prefix}_illness_1`, points: 10 },
  { label: '自宅療養で常時安静', value: `${prefix}_illness_2`, points: 8 },
  { label: '通院が週3日以上', value: `${prefix}_illness_3`, points: 7 },
  { label: '通院が週3日未満', value: `${prefix}_illness_4`, points: 6 },
];

// (4) 母の妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中であるか、出産後間がない', value: `${prefix}_childbirth_0`, points: 10 },
];

// (4) 育児休業中
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業中', value: `${prefix}_parental_leave_0`, points: 8 },
];

// (5) 病人の看護・親族の介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '親族の入院・通院・通所で週5日以上保育にあたれない', value: `${prefix}_care_0`, points: 10 },
  { label: '親族の入院・通院・通所で週4日保育にあたれない', value: `${prefix}_care_1`, points: 9 },
  { label: '自宅介護で親族の介護を常時必要とする', value: `${prefix}_care_2`, points: 9 },
  { label: '親族の入院・通院・通所で週3日保育にあたれない', value: `${prefix}_care_3`, points: 8 },
  { label: '自宅介護で常時ではないが親族の介護を必要とする', value: `${prefix}_care_4`, points: 8 },
];

// (6) 家庭の災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災や風水害、地震などの災害による復旧活動のため', value: `${prefix}_disaster_0`, points: 10 },
];

// (7) その他
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動', value: `${prefix}_jobseeking_0`, points: 4 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学', value: `${prefix}_school_0`, points: 6 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基本指数は父・母それぞれ1つだけ選びます。就労時間は休憩時間を含みます',
    inputType: 'select',
    options: [
      { label: '労働（家庭外・家庭内）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '親の不存在', value: `${prefix}_reason_absent`, points: 0 },
      { label: '母の妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_parental_leave`, points: 0 },
      { label: '病気', value: `${prefix}_reason_illness`, points: 0 },
      { label: '病人の看護・親族の介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭の災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
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
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
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
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：家庭の災害がありましたか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      helpText: '保育の必要認定期間は最大90日となります',
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は就学していますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入園児童について、療育手帳または身体障害者手帳が交付されていますか？',
    helpText: '療育相談を受けている場合も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_child_disability_1', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_1', points: 5 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯で同居の祖父母がいませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_1', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が同一の施設にすでに入園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_1', points: 2 },
    ],
  },
];

export const minamiuonumaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
