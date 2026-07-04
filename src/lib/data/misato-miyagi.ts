import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 美里町 保育所等入所児童の選考基準データ
// 出典: 美里町保育所等入所児童の選考基準を定める規則
// https://www1.g-reiki.net/town.misato.miyagi/reiki_honbun/r272RG00000773.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大10点。居宅外就労と居宅内就労（自営・農業等）は同点数。
// 内職・内勤その他は別区分（週4日以上日中週30h以上→4点、週3日以上日中週12h以上→3点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'misato-miyagi',
  name: '美里町',
  slug: 'misato-miyagi',
  prefecture: '宮城県',
  maxBasePoints: 20,
} as const;

const extEmploymentGridOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ext_none`, points: 0 },
  { label: '週5日/月20日以上・1日8時間以上（10点）', value: `${prefix}_ext_10a`, points: 10 },
  { label: '週5日/月20日以上・1日7〜8時間未満（9点）', value: `${prefix}_ext_9`, points: 9 },
  { label: '週5日/月20日以上・1日6〜7時間未満（8点）', value: `${prefix}_ext_8a`, points: 8 },
  { label: '週5日/月20日以上・1日4〜6時間未満（7点）', value: `${prefix}_ext_7a`, points: 7 },
  { label: '週4日/月16日以上・1日8時間以上（8点）', value: `${prefix}_ext_8b`, points: 8 },
  { label: '週4日/月16日以上・1日7〜8時間未満（7点）', value: `${prefix}_ext_7b`, points: 7 },
  { label: '週4日/月16日以上・1日6〜7時間未満（6点）', value: `${prefix}_ext_6b`, points: 6 },
  { label: '週4日/月16日以上・1日4〜6時間未満（5点）', value: `${prefix}_ext_5b`, points: 5 },
  { label: '週3日/月12日以上・1日8時間以上（6点）', value: `${prefix}_ext_6c`, points: 6 },
  { label: '週3日/月12日以上・1日7〜8時間未満（5点）', value: `${prefix}_ext_5c`, points: 5 },
  { label: '週3日/月12日以上・1日6〜7時間未満（4点）', value: `${prefix}_ext_4c`, points: 4 },
  { label: '週3日/月12日以上・1日4〜6時間未満（3点）', value: `${prefix}_ext_3c`, points: 3 },
];

const homeEmploymentGridOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '週5日/月20日以上・1日8時間以上（10点）', value: `${prefix}_home_10a`, points: 10 },
  { label: '週5日/月20日以上・1日7〜8時間未満（9点）', value: `${prefix}_home_9`, points: 9 },
  { label: '週5日/月20日以上・1日6〜7時間未満（8点）', value: `${prefix}_home_8a`, points: 8 },
  { label: '週5日/月20日以上・1日4〜6時間未満（7点）', value: `${prefix}_home_7a`, points: 7 },
  { label: '週4日/月16日以上・1日8時間以上（8点）', value: `${prefix}_home_8b`, points: 8 },
  { label: '週4日/月16日以上・1日7〜8時間未満（7点）', value: `${prefix}_home_7b`, points: 7 },
  { label: '週4日/月16日以上・1日6〜7時間未満（6点）', value: `${prefix}_home_6b`, points: 6 },
  { label: '週4日/月16日以上・1日4〜6時間未満（5点）', value: `${prefix}_home_5b`, points: 5 },
  { label: '週3日/月12日以上・1日8時間以上（6点）', value: `${prefix}_home_6c`, points: 6 },
  { label: '週3日/月12日以上・1日7〜8時間未満（5点）', value: `${prefix}_home_5c`, points: 5 },
  { label: '週3日/月12日以上・1日6〜7時間未満（4点）', value: `${prefix}_home_4c`, points: 4 },
  { label: '週3日/月12日以上・1日4〜6時間未満（3点）', value: `${prefix}_home_3c`, points: 3 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院 / 常時臥床（10点）', value: `${prefix}_illness_10`, points: 10 },
  { label: 'その他の療養・長期加療中（5点）', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 療育A / 精神1・2級（10点）', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3級等（7点）', value: `${prefix}_disability_7`, points: 7 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '全介護が必要な状態（9点）', value: `${prefix}_care_9`, points: 9 },
  { label: 'その他の介護・看護（5点）', value: `${prefix}_care_5`, points: 5 },
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
      { label: '居宅外で働いている（外勤・自営業等）', value: `${prefix}_reason_ext`, points: 0 },
      { label: '居宅内で働いている（自営・農業等）', value: `${prefix}_reason_home`, points: 0 },
      { label: '内職・内勤（週4日以上・日中週30時間以上 = 4点）', value: `${prefix}_reason_piecework_high`, points: 4 },
      { label: '内職・内勤（週3日以上・日中週12時間以上 = 3点）', value: `${prefix}_reason_piecework_low`, points: 3 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産（7点）', value: `${prefix}_reason_childbirth`, points: 7 },
      { label: '就学・職業訓練（大学・短大等昼間部 = 7点）', value: `${prefix}_reason_study_high`, points: 7 },
      { label: '就学・職業訓練（各種学校等 = 4点）', value: `${prefix}_reason_study_low`, points: 4 },
      { label: '災害復旧（10点）', value: `${prefix}_reason_disaster`, points: 10 },
      { label: '仕事を探している（3点）', value: `${prefix}_reason_jobseeking`, points: 3 },
      { label: '虐待・DV（10点）', value: `${prefix}_reason_dv`, points: 10 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_ext`,
      category,
      label: `${parentLabel}の居宅外就労の状況は？`,
      helpText: '就労日数と1日の就労時間の組み合わせで選択',
      inputType: 'radio',
      options: extEmploymentGridOptions(prefix),
    },
    {
      id: `${prefix}_home`,
      category,
      label: `${parentLabel}の居宅内就労（自営・農業等）の状況は？`,
      helpText: '就労日数と1日の就労時間の組み合わせで選択',
      inputType: 'radio',
      options: homeEmploymentGridOptions(prefix),
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
      label: `${parentLabel}の障害の程度は？`,
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
    label: 'ひとり親世帯（または父母不在）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_single_parent_yes', points: 15 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_welfare_yes', points: 15 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployment_yes', points: 3 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待・DVなど社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_abuse_yes', points: 15 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '申請する子どもが障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_disabled_child_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業明けの復職に伴う申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいが在籍する施設（または現在利用中の施設）を第一希望にしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_same_yes', points: 1 },
    ],
  },
  {
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '小規模保育等を卒園予定で連携施設を第一希望にしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_grad_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_small_grad_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が保育士・教育職員・放課後児童指導員ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '教育職員（保育士等）（+3）', value: 'adj_nursery_worker_teacher', points: 3 },
      { label: '放課後児童指導員（+1）', value: 'adj_nursery_worker_afterschool', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_diff',
    category: 'adjustment',
    label: 'きょうだいが別施設で在籍・申込中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_diff_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_diff_yes', points: 2 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料等の滞納（3か月以上）がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_delinquent_yes', points: -5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母等が無職・求職中ですか？',
    helpText: '65歳未満が目安。就労・疾病等がある場合は除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
];

export const misatomiyagiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
