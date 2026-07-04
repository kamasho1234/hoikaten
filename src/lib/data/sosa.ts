import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 匝瑳市 保育利用調整基準データ
// 出典: 匝瑳市保育の実施に関する規則
// https://www1.g-reiki.net/sosa/reiki_honbun/r325RG00000838.html
// ---------------------------------------------------------------------------
// sum方式。父母の指数を合算。居宅外就労最大10点、居宅内就労最大8点。
// 虐待・DVは基準指数20点。ひとり親調整+15点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sosa',
  name: '匝瑳市',
  slug: 'sosa',
  prefecture: '千葉県',
  maxBasePoints: 20,
} as const;

const externalEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ext_none`, points: 0 },
  { label: '月20日以上・1日8時間以上（10点）', value: `${prefix}_ext_10a`, points: 10 },
  { label: '月20日以上・1日6〜8時間未満（9点）', value: `${prefix}_ext_9a`, points: 9 },
  { label: '月20日以上・1日4〜6時間未満（8点）', value: `${prefix}_ext_8a`, points: 8 },
  { label: '月16日以上・1日8時間以上（9点）', value: `${prefix}_ext_9b`, points: 9 },
  { label: '月16日以上・1日6〜8時間未満（8点）', value: `${prefix}_ext_8b`, points: 8 },
  { label: '月16日以上・1日4〜6時間未満（7点）', value: `${prefix}_ext_7b`, points: 7 },
  { label: 'その他・月48時間以上（6点）', value: `${prefix}_ext_6c`, points: 6 },
];

const homeEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '月20日以上・1日8時間以上（8点）', value: `${prefix}_home_8a`, points: 8 },
  { label: '月20日以上・1日6〜8時間未満（7点）', value: `${prefix}_home_7a`, points: 7 },
  { label: '月20日以上・1日4〜6時間未満（6点）', value: `${prefix}_home_6a`, points: 6 },
  { label: '月16日以上・1日8時間以上（7点）', value: `${prefix}_home_7b`, points: 7 },
  { label: '月16日以上・1日6〜8時間未満（6点）', value: `${prefix}_home_6b`, points: 6 },
  { label: '月16日以上・1日4〜6時間未満（5点）', value: `${prefix}_home_5b`, points: 5 },
  { label: 'その他・月48時間以上（4点）', value: `${prefix}_home_4c`, points: 4 },
];

const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piece_none`, points: 0 },
  { label: '月48時間以上・1日8時間以上（6点）', value: `${prefix}_piece_6`, points: 6 },
  { label: '月48時間以上・1日4時間以上（4点）', value: `${prefix}_piece_4`, points: 4 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上入院 / 常時臥床（10点）', value: `${prefix}_illness_10`, points: 10 },
  { label: '精神性等疾患（9点）', value: `${prefix}_illness_9`, points: 9 },
  { label: '一般療養（7点）', value: `${prefix}_illness_7`, points: 7 },
  { label: '軽症定期通院（5点）', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 療育A等（10点）', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3級 / 療育B等（7点）', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体4級以下等（5点）', value: `${prefix}_disability_5`, points: 5 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週40時間以上（9点）', value: `${prefix}_care_9`, points: 9 },
  { label: '週32時間以上（8点）', value: `${prefix}_care_8`, points: 8 },
  { label: '週24時間以上（7点）', value: `${prefix}_care_7`, points: 7 },
  { label: 'その他介護・看護（5点）', value: `${prefix}_care_5`, points: 5 },
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
      { label: '居宅外で働いている（外勤・テレワーク等）', value: `${prefix}_reason_ext`, points: 0 },
      { label: '居宅内で働いている（自営業・農業等）', value: `${prefix}_reason_home`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_piecework`, points: 0 },
      { label: '就学・職業訓練（7点）', value: `${prefix}_reason_study`, points: 7 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産（出産前後3か月）（10点）', value: `${prefix}_reason_childbirth`, points: 10 },
      { label: '求職活動中（仕事が未決定）（1点）', value: `${prefix}_reason_jobseeking`, points: 1 },
      { label: '虐待・DV（20点）', value: `${prefix}_reason_dv`, points: 20 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_ext`,
      category,
      label: `${parentLabel}の居宅外就労の状況は？`,
      helpText: '月間就労日数と1日の就労時間で選択してください（テレワーク含む）',
      inputType: 'radio',
      options: externalEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_home`,
      category,
      label: `${parentLabel}の居宅内就労（自営・農業等）の状況は？`,
      helpText: '月間就労日数と1日の就労時間で選択してください',
      inputType: 'radio',
      options: homeEmploymentOptions(prefix),
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
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（母子・父子家庭）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_single_parent_yes', points: 15 },
    ],
  },
  {
    id: 'adj_parents_absent',
    category: 'adjustment',
    label: '父母ともに不在（死亡・行方不明等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parents_absent_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_parents_absent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '申請する子どもが障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_disabled_child_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_nursery',
    category: 'adjustment',
    label: 'きょうだいが保育所に入所していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_nursery_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_nursery_yes', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（就労自立見込み）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_nontaxable',
    category: 'adjustment',
    label: '市民税非課税世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nontaxable_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_nontaxable_yes', points: 1 },
    ],
  },
  {
    id: 'adj_dangerous_job',
    category: 'adjustment',
    label: '危険業種（危険物取扱・高所作業等）に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dangerous_job_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_dangerous_job_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居親族が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_grandparent_yes', points: -1 },
    ],
  },
  {
    id: 'adj_sibling_kindergarten',
    category: 'adjustment',
    label: 'きょうだいが幼稚園に在園（保育所等への申込なし）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_kindergarten_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_sibling_kindergarten_yes', points: -1 },
    ],
  },
  {
    id: 'adj_preschool_unapplied',
    category: 'adjustment',
    label: '保育所等への申込なしの未就学児がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_preschool_unapplied_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_preschool_unapplied_yes', points: -1 },
    ],
  },
  {
    id: 'adj_family_business',
    category: 'adjustment',
    label: '親族が経営する事業所に勤務し就労時間の融通が利きますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_business_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_family_business_yes', points: -1 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料等の滞納がありますか？',
    helpText: '滞納月数×-1点が減算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: '1か月（-1）', value: 'adj_delinquent_1', points: -1 },
      { label: '2か月（-2）', value: 'adj_delinquent_2', points: -2 },
      { label: '3か月以上（-3）', value: 'adj_delinquent_3plus', points: -3 },
    ],
  },
];

export const sosaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
