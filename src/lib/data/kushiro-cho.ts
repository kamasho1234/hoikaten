import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 釧路町 保育の利用に関する規則 利用調整基準表
// 出典: 釧路町保育の利用に関する規則（別表1・別表2）
// https://www1.g-reiki.net/town.kushiro/reiki_honbun/a203RG00000219.html
// ---------------------------------------------------------------------------
// min方式。父母それぞれの点数の低い方を基本点数とする。各最大100点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kushiro-cho',
  name: '釧路町',
  slug: 'kushiro-cho',
  prefecture: '北海道',
  maxBasePoints: 100,
  scoringMethod: 'min' as const,
} as const;

const employmentExternalOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ext_none`, points: 0 },
  { label: '月20日以上・週40時間以上（100点）', value: `${prefix}_ext_100`, points: 100 },
  { label: '月20日以上・週30時間以上（90点）', value: `${prefix}_ext_90a`, points: 90 },
  { label: '月16日以上・週32時間以上（90点）', value: `${prefix}_ext_90b`, points: 90 },
  { label: '月16日以上・週24時間以上（80点）', value: `${prefix}_ext_80`, points: 80 },
  { label: '月20日以上・週20時間以上（70点）', value: `${prefix}_ext_70`, points: 70 },
  { label: '月16日以上・週16時間以上（60点）', value: `${prefix}_ext_60`, points: 60 },
  { label: '月12日以上・週12時間以上（40点）', value: `${prefix}_ext_40`, points: 40 },
];

const employmentHomeOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '月20日以上・週40時間以上（90点）', value: `${prefix}_home_90`, points: 90 },
  { label: '月20日以上・週30時間以上（80点）', value: `${prefix}_home_80a`, points: 80 },
  { label: '月16日以上・週32時間以上（80点）', value: `${prefix}_home_80b`, points: 80 },
  { label: '月16日以上・週24時間以上（70点）', value: `${prefix}_home_70`, points: 70 },
  { label: '月20日以上・週20時間以上（60点）', value: `${prefix}_home_60`, points: 60 },
  { label: '月16日以上・週16時間以上（50点）', value: `${prefix}_home_50`, points: 50 },
  { label: '月12日以上・週12時間以上（30点）', value: `${prefix}_home_30`, points: 30 },
];

const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piece_none`, points: 0 },
  { label: '月20日以上・週30時間以上（50点）', value: `${prefix}_piece_50`, points: 50 },
  { label: '月20日以上・週20時間以上（30点）', value: `${prefix}_piece_30`, points: 30 },
  { label: '月16日以上・週32時間以上（25点）', value: `${prefix}_piece_25`, points: 25 },
  { label: '月16日以上・週24時間以上（20点）', value: `${prefix}_piece_20`, points: 20 },
  { label: '月16日以上・週16時間以上（15点）', value: `${prefix}_piece_15`, points: 15 },
  { label: '月12日以上・週12時間以上（10点）', value: `${prefix}_piece_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上入院または常時臥床（100点）', value: `${prefix}_illness_100`, points: 100 },
  { label: '1か月以上自宅療養が必要（80点）', value: `${prefix}_illness_80`, points: 80 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、療育A、精神1級（100点）', value: `${prefix}_disability_100`, points: 100 },
  { label: '身体3級、療育B、精神2級（80点）', value: `${prefix}_disability_80`, points: 80 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上・日8時間以上（90点）', value: `${prefix}_care_90`, points: 90 },
  { label: '週5日以上・日6時間以上（80点）', value: `${prefix}_care_80`, points: 80 },
  { label: '週4日以上・日6時間以上（60点）', value: `${prefix}_care_60`, points: 60 },
  { label: '週4日以上・日4時間以上（40点）', value: `${prefix}_care_40`, points: 40 },
  { label: '週3日以上・日4時間以上（15点）', value: `${prefix}_care_15`, points: 15 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週5日以上・日6時間以上（80点）', value: `${prefix}_education_80`, points: 80 },
  { label: '週4日以上・日4時間以上（50点）', value: `${prefix}_education_50`, points: 50 },
  { label: '週3日以上・日4時間以上（10点）', value: `${prefix}_education_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '居宅外で働いている', value: `${prefix}_reason_ext_employment`, points: 0 },
      { label: '居宅内で働いている', value: `${prefix}_reason_home_employment`, points: 0 },
      { label: '内職', value: `${prefix}_reason_piecework`, points: 0 },
      { label: '妊娠・出産（60点）', value: `${prefix}_reason_childbirth`, points: 60 },
      { label: '疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '自宅罹災の災害復旧（100点）', value: `${prefix}_reason_disaster_own`, points: 100 },
      { label: '他宅罹災の災害復旧（70点）', value: `${prefix}_reason_disaster_other`, points: 70 },
      { label: '求職活動中（10点）', value: `${prefix}_reason_jobseeking`, points: 10 },
      { label: '就学・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '児童虐待・DV（100点）', value: `${prefix}_reason_abuse`, points: 100 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_ext_employment`,
      category,
      label: `${parentLabel}の居宅外就労の状況は？`,
      helpText: '勤務日数と週間就労時間の組み合わせで選択',
      inputType: 'radio',
      options: employmentExternalOptions(prefix),
    },
    {
      id: `${prefix}_home_employment`,
      category,
      label: `${parentLabel}の居宅内就労の状況は？`,
      inputType: 'radio',
      options: employmentHomeOptions(prefix),
    },
    {
      id: `${prefix}_piecework`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: pieceworkOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の等級は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯で就労による自立が見込まれますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '失業により速やかな就労が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_unemployment_yes', points: 20 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待やDVにより社会的擁護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_abuse_yes', points: 20 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業後の復職予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_leave_return_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが既に保育所に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sibling_enrolled_yes', points: 10 },
    ],
  },
  {
    id: 'adj_small_scale',
    category: 'adjustment',
    label: '地域型保育事業の利用経歴がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_scale_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_small_scale_yes', points: 10 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '利用者負担額（保育料）を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: 'はい（-50）', value: 'adj_delinquent_yes', points: -50 },
    ],
  },
  {
    id: 'adj_outside_hours',
    category: 'adjustment',
    label: '保育時間外（早朝・深夜）に就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_hours_no', points: 0 },
      { label: 'はい（-50）', value: 'adj_outside_hours_yes', points: -50 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の無職の祖父母と同居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-50）', value: 'adj_grandparent_yes', points: -50 },
    ],
  },
];

export const kushiroChoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
