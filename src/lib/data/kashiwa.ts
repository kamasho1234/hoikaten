import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 柏市 保育園等利用調整基準データ
// 出典: 柏市「令和7年度 柏市保育園等利用調整基準表」(P.22-24)
// https://www.city.kashiwa.lg.jp/hoikuunei/haguhagu/navi/nyuennyugaku/hoikuen/r7kakushuyousiki.html
// ---------------------------------------------------------------------------
// 柏市は「基準点数（父母それぞれ最大30点）＋ 調整点数」の加算方式。
// 就労は月あたりの就労時間で判定。合計基準点数最大60点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kashiwa',
  name: '柏市',
  slug: 'kashiwa',
  prefecture: '千葉県',
  maxBasePoints: 60,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '会社員等・自営（収入あり）：月160時間以上', value: `${prefix}_employment_30`, points: 30 },
  { label: '会社員等・自営（収入あり）：月140時間以上160時間未満', value: `${prefix}_employment_28`, points: 28 },
  { label: '会社員等・自営（収入あり）：月120時間以上140時間未満', value: `${prefix}_employment_26`, points: 26 },
  { label: '会社員等・自営（収入あり）：月100時間以上120時間未満', value: `${prefix}_employment_24`, points: 24 },
  { label: '会社員等・自営（収入あり）：月80時間以上100時間未満', value: `${prefix}_employment_22`, points: 22 },
  { label: '会社員等・自営（収入あり）：月70時間以上80時間未満', value: `${prefix}_employment_20`, points: 20 },
  { label: '会社員等・自営（収入あり）：月64時間以上70時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '自営（収入なし）：月160時間以上', value: `${prefix}_employment_self_24`, points: 24 },
  { label: '自営（収入なし）：月140時間以上160時間未満', value: `${prefix}_employment_self_22`, points: 22 },
  { label: '自営（収入なし）：月120時間以上140時間未満', value: `${prefix}_employment_self_20`, points: 20 },
  { label: '自営（収入なし）：月100時間以上120時間未満', value: `${prefix}_employment_self_18`, points: 18 },
  { label: '自営（収入なし）：月80時間以上100時間未満', value: `${prefix}_employment_self_16`, points: 16 },
  { label: '自営（収入なし）：月64時間以上80時間未満', value: `${prefix}_employment_self_14`, points: 14 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '概ね1か月以上の入院（予定含む）', value: `${prefix}_illness_30`, points: 30 },
  { label: '精神障害者保健福祉手帳1〜2級程度', value: `${prefix}_illness_30b`, points: 30 },
  { label: '精神障害者保健福祉手帳3級程度', value: `${prefix}_illness_27`, points: 27 },
  { label: '常時病臥またはそれに準ずる状態', value: `${prefix}_illness_30c`, points: 30 },
  { label: '安静を要する状態', value: `${prefix}_illness_24`, points: 24 },
  { label: '通院加療のため保育にあたれない', value: `${prefix}_illness_18`, points: 18 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 療育手帳A', value: `${prefix}_disability_30`, points: 30 },
  { label: '療育手帳B1', value: `${prefix}_disability_26`, points: 26 },
  { label: '身体障害者手帳3・4級（視覚） / 療育手帳B2', value: `${prefix}_disability_24`, points: 24 },
  { label: '身体障害者手帳4〜7級（視覚以外）', value: `${prefix}_disability_18`, points: 18 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '乳児入院の看護（月120時間以上）', value: `${prefix}_care_30`, points: 30 },
  { label: '重度心身障害者等の看護（月120時間以上）', value: `${prefix}_care_25`, points: 25 },
  { label: '看護（月64時間以上120時間未満）', value: `${prefix}_care_18`, points: 18 },
  { label: '自宅内で全看護（要介護3〜5）', value: `${prefix}_care_24`, points: 24 },
  { label: '自宅内で一部看護（要介護1〜2）', value: `${prefix}_care_18b`, points: 18 },
  { label: '自宅内で支援（要支援）', value: `${prefix}_care_16`, points: 16 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の前2か月〜産後8週間', value: `${prefix}_childbirth_28`, points: 28 },
  { label: '上記期間以外の妊娠中', value: `${prefix}_childbirth_6`, points: 6 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '月160時間以上の就労を内定', value: `${prefix}_jobseeking_19`, points: 19 },
  { label: '月120時間以上の就労を内定', value: `${prefix}_jobseeking_17`, points: 17 },
  { label: '月80時間以上の就労を内定', value: `${prefix}_jobseeking_14`, points: 14 },
  { label: '月64時間以上の就労を内定', value: `${prefix}_jobseeking_12`, points: 12 },
  { label: '求職活動中（ハローワークカード提出あり）', value: `${prefix}_jobseeking_8`, points: 8 },
  { label: '求職活動中（ハローワークカード提出なし）', value: `${prefix}_jobseeking_6`, points: 6 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '柏市では父母それぞれの基準点数（各最大30点）の合計で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '就労時間には休憩時間を含みますが、通勤時間は含みません',
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
      label: `${parentLabel}の介護・看護の状況は？`,
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
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '母子・父子世帯は加点されます。不存在の親の分も加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい・扶養児童1人（+40）', value: 'adj_single_parent_1', points: 40 },
      { label: 'はい・扶養児童2人以上（+40）', value: 'adj_single_parent_2', points: 40 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_parental_leave_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの在園状況は？',
    helpText: '認可保育園・認定こども園・小規模保育に在園中のきょうだいがいる場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだい在園中で新規入園申請（+5）', value: 'adj_sibling_enrolled', points: 5 },
      { label: 'きょうだいと同施設に転園希望（+7）', value: 'adj_sibling_transfer', points: 7 },
      { label: '2人以上同時新規入園申込み（+3）', value: 'adj_sibling_simultaneous', points: 3 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '中学生以下のきょうだいが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_multi_child_yes', points: 6 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '認可外保育施設を月極めで利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_unlicensed_yes', points: 7 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同一建物内に65歳未満の保育可能な成人がいますか？',
    helpText: '祖父母や保護者のきょうだい等',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_grandparent_yes', points: -5 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '未納の保育料がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_fee_delinquent_yes', points: -20 },
    ],
  },
];

export const kashiwaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
