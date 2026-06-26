import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 村上市 保育利用調整基準データ
// 出典: 村上市保育の利用調整に関する基準要綱
// https://www1.g-reiki.net/murakami/reiki_honbun/e412RG00001227.html
// ---------------------------------------------------------------------------
// sum方式（父母の基準指数を合算）。ひとり親世帯は就労基準指数を2倍。
// 居宅外就労（外勤・自営業中心者）最大10点。月日数の区分なし・時間のみ評価。
// 自営業の中心者/協力者で点数が異なる。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'murakami',
  name: '村上市',
  slug: 'murakami',
  prefecture: '新潟県',
  maxBasePoints: 20,
} as const;

// 外勤・自営業中心者
const extMainOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ext_main_none`, points: 0 },
  { label: '1日7時間以上（10点）', value: `${prefix}_ext_main_10`, points: 10 },
  { label: '1日6〜7時間未満（9点）', value: `${prefix}_ext_main_9`, points: 9 },
  { label: '1日5〜6時間未満（8点）', value: `${prefix}_ext_main_8`, points: 8 },
  { label: '1日5時間未満（7点）', value: `${prefix}_ext_main_7`, points: 7 },
];

// 居宅外就労・自営業協力者
const extCoopOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ext_coop_none`, points: 0 },
  { label: '1日7時間以上（8点）', value: `${prefix}_ext_coop_8`, points: 8 },
  { label: '1日6〜7時間未満（7点）', value: `${prefix}_ext_coop_7`, points: 7 },
  { label: '1日5〜6時間未満（6点）', value: `${prefix}_ext_coop_6`, points: 6 },
  { label: '1日5時間未満（5点）', value: `${prefix}_ext_coop_5`, points: 5 },
];

// 居宅内就労・自営業中心者
const homeMainOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_main_none`, points: 0 },
  { label: '1日7時間以上（9点）', value: `${prefix}_home_main_9`, points: 9 },
  { label: '1日6〜7時間未満（8点）', value: `${prefix}_home_main_8`, points: 8 },
  { label: '1日5〜6時間未満（7点）', value: `${prefix}_home_main_7`, points: 7 },
  { label: '1日5時間未満（6点）', value: `${prefix}_home_main_6`, points: 6 },
];

// 居宅内就労・自営業協力者
const homeCoopOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_coop_none`, points: 0 },
  { label: '1日7時間以上（7点）', value: `${prefix}_home_coop_7`, points: 7 },
  { label: '1日6〜7時間未満（6点）', value: `${prefix}_home_coop_6`, points: 6 },
  { label: '1日5〜6時間未満（5点）', value: `${prefix}_home_coop_5`, points: 5 },
  { label: '1日5時間未満（4点）', value: `${prefix}_home_coop_4`, points: 4 },
];

// 内職
const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piece_none`, points: 0 },
  { label: '1日7時間以上（6点）', value: `${prefix}_piece_6`, points: 6 },
  { label: '1日5〜7時間未満（5点）', value: `${prefix}_piece_5`, points: 5 },
  { label: '1日5時間未満（4点）', value: `${prefix}_piece_4`, points: 4 },
];

// 疾病・障害
const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
  { label: '1か月以上の入院（10点）', value: `${prefix}_ill_10a`, points: 10 },
  { label: '重度障害（身体1・2級 / 療育A等）（10点）', value: `${prefix}_ill_10b`, points: 10 },
  { label: '中度障害（身体3級 / 療育B等）（6点）', value: `${prefix}_ill_6`, points: 6 },
  { label: 'その他の保育困難な状態（4点）', value: `${prefix}_ill_4`, points: 4 },
];

// 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護4・5程度以上（10点）', value: `${prefix}_care_10`, points: 10 },
  { label: '要介護2・3程度（7点）', value: `${prefix}_care_7`, points: 7 },
  { label: 'その他の保育困難な状態（4点）', value: `${prefix}_care_4`, points: 4 },
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
      { label: '居宅外で働いている（外勤・自営業中心者）', value: `${prefix}_reason_ext_main`, points: 0 },
      { label: '居宅外で働いている（自営業協力者）', value: `${prefix}_reason_ext_coop`, points: 0 },
      { label: '居宅内で働いている（自営業中心者）', value: `${prefix}_reason_home_main`, points: 0 },
      { label: '居宅内で働いている（自営業協力者）', value: `${prefix}_reason_home_coop`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_piecework`, points: 0 },
      { label: '就学・職業訓練（8点）', value: `${prefix}_reason_study`, points: 8 },
      { label: '病気・けが・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '妊娠・出産（産前産後各2か月）（10点）', value: `${prefix}_reason_childbirth`, points: 10 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '求職活動中（継続的な活動）（2点）', value: `${prefix}_reason_jobseeking`, points: 2 },
      { label: '不在（ひとり親のため、父/母が不在）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_ext_main`,
      category,
      label: `${parentLabel}の就労時間は？（外勤・自営業中心者）`,
      helpText: '1日の就労時間で選択してください（月日数の区分はありません）',
      inputType: 'radio',
      options: extMainOptions(prefix),
    },
    {
      id: `${prefix}_ext_coop`,
      category,
      label: `${parentLabel}の就労時間は？（居宅外・自営業協力者）`,
      helpText: '1日の就労時間で選択してください',
      inputType: 'radio',
      options: extCoopOptions(prefix),
    },
    {
      id: `${prefix}_home_main`,
      category,
      label: `${parentLabel}の就労時間は？（居宅内・自営業中心者）`,
      helpText: '1日の就労時間で選択してください',
      inputType: 'radio',
      options: homeMainOptions(prefix),
    },
    {
      id: `${prefix}_home_coop`,
      category,
      label: `${parentLabel}の就労時間は？（居宅内・自営業協力者）`,
      helpText: '1日の就労時間で選択してください',
      inputType: 'radio',
      options: homeCoopOptions(prefix),
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
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
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
    id: 'adj_single_parent_employment',
    category: 'adjustment',
    label: 'ひとり親世帯：就労追加指数（保護者1と同じ就労状況を選択）',
    helpText: 'ひとり親世帯では就労基準指数が2倍になります。保護者1と同じ就労状況を再度選択してください。ひとり親ではない場合や保護者1が就労以外の理由の場合は「あてはまらない」を選択してください。',
    inputType: 'select',
    options: [
      { label: 'あてはまらない（ひとり親以外、または就労以外の理由）', value: 'adj_sp_emp_none', points: 0 },
      { label: '外勤・自営業中心者・1日7時間以上（+10）', value: 'adj_sp_ext_main_10', points: 10 },
      { label: '外勤・自営業中心者・1日6〜7時間未満（+9）', value: 'adj_sp_ext_main_9', points: 9 },
      { label: '外勤・自営業中心者・1日5〜6時間未満（+8）', value: 'adj_sp_ext_main_8', points: 8 },
      { label: '外勤・自営業中心者・1日5時間未満（+7）', value: 'adj_sp_ext_main_7', points: 7 },
      { label: '居宅外・自営業協力者・1日7時間以上（+8）', value: 'adj_sp_ext_coop_8', points: 8 },
      { label: '居宅外・自営業協力者・1日6〜7時間未満（+7）', value: 'adj_sp_ext_coop_7', points: 7 },
      { label: '居宅外・自営業協力者・1日5〜6時間未満（+6）', value: 'adj_sp_ext_coop_6', points: 6 },
      { label: '居宅外・自営業協力者・1日5時間未満（+5）', value: 'adj_sp_ext_coop_5', points: 5 },
      { label: '居宅内・自営業中心者・1日7時間以上（+9）', value: 'adj_sp_home_main_9', points: 9 },
      { label: '居宅内・自営業中心者・1日6〜7時間未満（+8）', value: 'adj_sp_home_main_8', points: 8 },
      { label: '居宅内・自営業中心者・1日5〜6時間未満（+7）', value: 'adj_sp_home_main_7', points: 7 },
      { label: '居宅内・自営業中心者・1日5時間未満（+6）', value: 'adj_sp_home_main_6', points: 6 },
      { label: '居宅内・自営業協力者・1日7時間以上（+7）', value: 'adj_sp_home_coop_7', points: 7 },
      { label: '居宅内・自営業協力者・1日6〜7時間未満（+6）', value: 'adj_sp_home_coop_6', points: 6 },
      { label: '居宅内・自営業協力者・1日5〜6時間未満（+5）', value: 'adj_sp_home_coop_5', points: 5 },
      { label: '居宅内・自営業協力者・1日5時間未満（+4）', value: 'adj_sp_home_coop_4', points: 4 },
      { label: '内職・1日7時間以上（+6）', value: 'adj_sp_piece_6', points: 6 },
      { label: '内職・1日5〜7時間未満（+5）', value: 'adj_sp_piece_5', points: 5 },
      { label: '内職・1日5時間未満（+4）', value: 'adj_sp_piece_4', points: 4 },
      { label: '就学・職業訓練（+8）', value: 'adj_sp_study_8', points: 8 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_single_parent_yes', points: 8 },
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
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_welfare_yes', points: 4 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が保育所等に従事する保育士・保育教諭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_nursery_worker_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいが保育所等に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_same_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業を取得後の職場復帰に伴う申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parent_separated',
    category: 'adjustment',
    label: '片親が単身赴任・施設入所等で別居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_separated_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parent_separated_yes', points: 2 },
    ],
  },
  {
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '地域型保育施設（小規模保育等）を卒園予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_grad_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_small_grad_yes', points: 10 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '認可外保育施設に移行継続して利用中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_unlicensed_yes', points: 5 },
    ],
  },
  {
    id: 'adj_group_care',
    category: 'adjustment',
    label: '集団保育が必要と判定されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_group_care_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_group_care_yes', points: 2 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '現在、保留（待機）期間はどのくらいですか？',
    inputType: 'radio',
    options: [
      { label: '保留ではない / 保留期間3か月未満（0点）', value: 'adj_waiting_0', points: 0 },
      { label: '保留期間3か月未満（+1）', value: 'adj_waiting_1', points: 1 },
      { label: '保留期間3〜6か月未満（+2）', value: 'adj_waiting_2', points: 2 },
      { label: '保留期間6か月以上（+3）', value: 'adj_waiting_3', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '健康で未就労の65歳未満の同居親族が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
];

export const murakamiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
