import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 五霞町 保育の必要性の認定基準に関する条例施行規則（別表第2）
// 出典: https://www1.g-reiki.net/goka/reiki_honbun/e080RG00000629.html
// ---------------------------------------------------------------------------
// sum方式。父母それぞれの基本指数を合算。父母各最大10点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'goka',
  name: '五霞町',
  slug: 'goka',
  prefecture: '茨城県',
  maxBasePoints: 20,
} as const;

const extEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ext_none`, points: 0 },
  { label: '月140時間以上（10点）', value: `${prefix}_ext_10`, points: 10 },
  { label: '月120〜140時間未満（9点）', value: `${prefix}_ext_9`, points: 9 },
  { label: '月100〜120時間未満（8点）', value: `${prefix}_ext_8`, points: 8 },
  { label: '月80〜100時間未満（7点）', value: `${prefix}_ext_7`, points: 7 },
  { label: '月64〜80時間未満（6点）', value: `${prefix}_ext_6`, points: 6 },
];

const homeEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '月140時間以上（9点）', value: `${prefix}_home_9`, points: 9 },
  { label: '月120〜140時間未満（8点）', value: `${prefix}_home_8`, points: 8 },
  { label: '月100〜120時間未満（7点）', value: `${prefix}_home_7`, points: 7 },
  { label: '月80〜100時間未満（6点）', value: `${prefix}_home_6`, points: 6 },
  { label: '月64〜80時間未満（5点）', value: `${prefix}_home_5`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または入院相当の治療（10点）', value: `${prefix}_illness_10`, points: 10 },
  { label: '感染症・難病で著しく困難（8点）', value: `${prefix}_illness_8a`, points: 8 },
  { label: '安静要で著しく困難（8点）', value: `${prefix}_illness_8b`, points: 8 },
  { label: '保育に支障あり（6点）', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身障1〜2級・療育A・精神1〜3級（8点）', value: `${prefix}_disability_8`, points: 8 },
  { label: '身障3〜6級・療育B・C（6点）', value: `${prefix}_disability_6`, points: 6 },
  { label: 'その他医師認定（4点）', value: `${prefix}_disability_4`, points: 4 },
];

const careExtOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_ext_none`, points: 0 },
  { label: '月140時間以上（10点）', value: `${prefix}_care_ext_10`, points: 10 },
  { label: '月120〜140時間未満（9点）', value: `${prefix}_care_ext_9`, points: 9 },
  { label: '月100〜120時間未満（8点）', value: `${prefix}_care_ext_8`, points: 8 },
  { label: '月80〜100時間未満（7点）', value: `${prefix}_care_ext_7`, points: 7 },
  { label: '月64〜80時間未満（6点）', value: `${prefix}_care_ext_6`, points: 6 },
];

const careHomeOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_home_none`, points: 0 },
  { label: '月140時間以上（9点）', value: `${prefix}_care_home_9`, points: 9 },
  { label: '月120〜140時間未満（8点）', value: `${prefix}_care_home_8`, points: 8 },
  { label: '月100〜120時間未満（7点）', value: `${prefix}_care_home_7`, points: 7 },
  { label: '月80〜100時間未満（6点）', value: `${prefix}_care_home_6`, points: 6 },
  { label: '月64〜80時間未満（5点）', value: `${prefix}_care_home_5`, points: 5 },
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
      { label: '居宅外で働いている', value: `${prefix}_reason_ext`, points: 0 },
      { label: '居宅内で働いている', value: `${prefix}_reason_home`, points: 0 },
      { label: '妊娠・出産（8点）', value: `${prefix}_reason_childbirth`, points: 8 },
      { label: '疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護（居宅外）', value: `${prefix}_reason_care_ext`, points: 0 },
      { label: '介護・看護（居宅内）', value: `${prefix}_reason_care_home`, points: 0 },
      { label: '災害復旧（10点）', value: `${prefix}_reason_disaster`, points: 10 },
      { label: '求職活動中（3点）', value: `${prefix}_reason_jobseeking`, points: 3 },
      { label: '就学・職業訓練（7点）', value: `${prefix}_reason_education`, points: 7 },
      { label: '児童虐待・DV（10点）', value: `${prefix}_reason_abuse`, points: 10 },
      { label: 'ひとり親世帯等の自立促進（10点）', value: `${prefix}_reason_single`, points: 10 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_ext`,
      category,
      label: `${parentLabel}の居宅外労働の時間は？`,
      inputType: 'radio',
      options: extEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_home`,
      category,
      label: `${parentLabel}の居宅内労働の時間は？`,
      inputType: 'radio',
      options: homeEmploymentOptions(prefix),
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
      label: `${parentLabel}の障害の状況は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care_ext`,
      category,
      label: `${parentLabel}の介護・看護（居宅外）の時間は？`,
      inputType: 'radio',
      options: careExtOptions(prefix),
    },
    {
      id: `${prefix}_care_home`,
      category,
      label: `${parentLabel}の介護・看護（居宅内）の時間は？`,
      inputType: 'radio',
      options: careHomeOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '母子・父子世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？（母子・父子世帯以外）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業・倒産しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待・社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_abuse_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_disabled_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産後・育児休業明けの復帰ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが同一施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_enrolled_yes', points: 1 },
    ],
  },
  {
    id: 'adj_small_scale',
    category: 'adjustment',
    label: '地域型保育事業の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_scale_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_small_scale_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multiple',
    category: 'adjustment',
    label: '多胎児（双子・三つ子等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_multiple_yes', points: 1 },
    ],
  },
  {
    id: 'adj_outside_town',
    category: 'adjustment',
    label: '町外在住ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（町内在住）', value: 'adj_outside_town_no', points: 0 },
      { label: '町外在住・継続申込（-3）', value: 'adj_outside_town_cont', points: -3 },
      { label: '町外在住・新規申込（-5）', value: 'adj_outside_town_new', points: -5 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_delinquent_yes', points: -10 },
    ],
  },
];

export const gokaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
