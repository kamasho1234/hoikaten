import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 結城市 保育の利用に関する要綱 基本点数表・調整点数表
// 出典: 結城市保育の利用に関する要綱（別表第5条関係、付表1）
// https://www1.g-reiki.net/yuki/reiki_honbun/e008RG00000904.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大100点。基本点数 + 調整点数で算出。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yuki',
  name: '結城市',
  slug: 'yuki',
  prefecture: '茨城県',
  maxBasePoints: 200,
} as const;

const employmentFull = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上 or 8h/日以上（100点）', value: `${prefix}_employment_100`, points: 100 },
  { label: '月140時間以上 or 7h/日以上（90点）', value: `${prefix}_employment_90`, points: 90 },
  { label: '月120時間以上 or 6h/日以上（80点）', value: `${prefix}_employment_80`, points: 80 },
  { label: '月100時間以上 or 5h/日以上（70点）', value: `${prefix}_employment_70`, points: 70 },
  { label: '月80時間以上 or 4h/日以上（60点）', value: `${prefix}_employment_60`, points: 60 },
];

const employmentWeekly4 = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月128時間以上 or 8h/日以上（80点）', value: `${prefix}_employment_80`, points: 80 },
  { label: '月112時間以上 or 7h/日以上（70点）', value: `${prefix}_employment_70`, points: 70 },
  { label: '月96時間以上 or 6h/日以上（60点）', value: `${prefix}_employment_60`, points: 60 },
  { label: '月80時間以上 or 5h/日以上（55点）', value: `${prefix}_employment_55`, points: 55 },
  { label: '月64時間以上 or 4h/日以上（50点）', value: `${prefix}_employment_50`, points: 50 },
];

const employmentWeekly3OrLess = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月48時間以上 or 4h/日以上（45点）', value: `${prefix}_employment_45`, points: 45 },
];

const employmentInside = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月48時間以上（40点）', value: `${prefix}_employment_40`, points: 40 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上入院 or 医師指示で1か月以上安静（100点）', value: `${prefix}_illness_100`, points: 100 },
  { label: '週4日以上通院（80点）', value: `${prefix}_illness_80`, points: 80 },
  { label: '週3日以下通院（70点）', value: `${prefix}_illness_70`, points: 70 },
  { label: 'その他軽度（60点）', value: `${prefix}_illness_60`, points: 60 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、療育A・(A)、精神1級（100点）', value: `${prefix}_disability_100`, points: 100 },
  { label: '身体3級、療育B、精神2級（90点）', value: `${prefix}_disability_90`, points: 90 },
  { label: '身体4～6級、療育C、精神3級（80点）', value: `${prefix}_disability_80`, points: 80 },
  { label: 'その他軽度（70点）', value: `${prefix}_disability_70`, points: 70 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時看護・介護 or 重度障害児の介護（100点）', value: `${prefix}_care_100`, points: 100 },
  { label: '週4日以上（70点）', value: `${prefix}_care_70`, points: 70 },
  { label: '週3日以下（60点）', value: `${prefix}_care_60`, points: 60 },
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
      { label: '働いている（月20日以上）', value: `${prefix}_reason_employment_full`, points: 0 },
      { label: '働いている（月16日以上）', value: `${prefix}_reason_employment_weekly4`, points: 0 },
      { label: '働いている（月12日以下）', value: `${prefix}_reason_employment_weekly3`, points: 0 },
      { label: '働いている（内職）', value: `${prefix}_reason_employment_inside`, points: 0 },
      { label: '出産予定日前後各8週間（70点）', value: `${prefix}_reason_childbirth`, points: 70 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧（100点）', value: `${prefix}_reason_disaster`, points: 100 },
      { label: '求職中（30点）', value: `${prefix}_reason_jobseeking`, points: 30 },
      { label: '就学（月20日以上）', value: `${prefix}_reason_study_full`, points: 0 },
      { label: '就学（月16日以上）', value: `${prefix}_reason_study_weekly4`, points: 0 },
      { label: '就学（月12日以下）', value: `${prefix}_reason_study_weekly3`, points: 0 },
      { label: '技能習得（100点）', value: `${prefix}_reason_skill_acquisition`, points: 100 },
      { label: '児童虐待（100点）', value: `${prefix}_reason_child_abuse`, points: 100 },
      { label: 'DV（100点）', value: `${prefix}_reason_dv`, points: 100 },
      { label: '死亡・離別等で保護者不存在（100点）', value: `${prefix}_reason_absent`, points: 100 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment_full`,
      category,
      label: `${parentLabel}の月間就労時間は？（月20日以上）`,
      helpText: '月160時間以上 または 日8時間以上を基準とします',
      inputType: 'radio',
      options: employmentFull(prefix),
    },
    {
      id: `${prefix}_employment_weekly4`,
      category,
      label: `${parentLabel}の月間就労時間は？（月16日以上）`,
      helpText: '月128時間以上 または 日8時間以上を基準とします',
      inputType: 'radio',
      options: employmentWeekly4(prefix),
    },
    {
      id: `${prefix}_employment_weekly3`,
      category,
      label: `${parentLabel}の月間就労時間は？（月12日以下）`,
      helpText: '月48時間以上 または 日4時間以上を基準とします',
      inputType: 'radio',
      options: employmentWeekly3OrLess(prefix),
    },
    {
      id: `${prefix}_employment_inside`,
      category,
      label: `${parentLabel}の内職時間は？`,
      helpText: '月48時間以上を基準とします',
      inputType: 'radio',
      options: employmentInside(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
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
      id: `${prefix}_study_full`,
      category,
      label: `${parentLabel}の月間就学時間は？（月20日以上）`,
      helpText: '月160時間以上 または 日8時間以上を基準とします',
      inputType: 'radio',
      options: employmentFull(prefix).map(opt => ({
        ...opt,
        value: opt.value.replace('employment_', 'study_'),
      })),
    },
    {
      id: `${prefix}_study_weekly4`,
      category,
      label: `${parentLabel}の月間就学時間は？（月16日以上）`,
      helpText: '月128時間以上 または 日8時間以上を基準とします',
      inputType: 'radio',
      options: employmentWeekly4(prefix).map(opt => ({
        ...opt,
        value: opt.value.replace('employment_', 'study_'),
      })),
    },
    {
      id: `${prefix}_study_weekly3`,
      category,
      label: `${parentLabel}の月間就学時間は？（月12日以下）`,
      helpText: '月48時間以上 または 日4時間以上を基準とします',
      inputType: 'radio',
      options: employmentWeekly3OrLess(prefix).map(opt => ({
        ...opt,
        value: opt.value.replace('employment_', 'study_'),
      })),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯またはこれに準ずる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '要保護状態と同程度ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_breadwinner_unemployed',
    category: 'adjustment',
    label: '生計中心者が失業中ですか？（自発的失業を除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_breadwinner_unemployed_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_breadwinner_unemployed_yes', points: 5 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '児童または生計同一の他児童が障害児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_disabled_child_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '既に入園している児童と生計同一ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_enrolled_yes', points: 5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育休明けの復帰申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_leave_return_yes', points: 5 },
    ],
  },
  {
    id: 'adj_leave_return_reentry',
    category: 'adjustment',
    label: '産休・育休一時退所後の入所申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_reentry_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_leave_return_reentry_yes', points: 5 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '3番目以降のお子さんですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_third_child_yes', points: 5 },
    ],
  },
  {
    id: 'adj_teacher_outside_city',
    category: 'adjustment',
    label: '市外の保育士・保育教諭・幼稚園教諭の子どもですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_teacher_outside_city_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_teacher_outside_city_yes', points: 5 },
    ],
  },
  {
    id: 'adj_teacher_inside_city',
    category: 'adjustment',
    label: '市内の保育士・保育教諭・幼稚園教諭の子どもですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_teacher_inside_city_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_teacher_inside_city_yes', points: 10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育可能な65歳未満の同居祖父母がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_grandparent_yes', points: -10 },
    ],
  },
];

export const yukiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
