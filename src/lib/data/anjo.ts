import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 安城市 保育園・認定こども園 利用調整指数表（令和7年度）
// 出典: R7安城市利用ガイド
// https://www.city.anjo.aichi.jp/kurasu/kosodate/hoikuen/documents/r7gaido.pdf
// ---------------------------------------------------------------------------
// 安城市はsum方式（父母の基本指数合算+調整指数）。最大24点/親（合計48点）。
// 就労時間には休憩・残業を含まない。障害は日常生活の程度(1-4)で細分化。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'anjo',
  name: '安城市',
  slug: 'anjo',
  prefecture: '愛知県',
  maxBasePoints: 48,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上（内職以外）', value: `${prefix}_employment_24`, points: 24 },
  { label: '月120時間以上（内職以外）', value: `${prefix}_employment_22`, points: 22 },
  { label: '月100時間以上（内職以外）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月80時間以上（内職以外）', value: `${prefix}_employment_17`, points: 17 },
  { label: '月80時間以上（内職）', value: `${prefix}_employment_15`, points: 15 },
  { label: '月60時間以上（内職以外）', value: `${prefix}_employment_14`, points: 14 },
  { label: '月60時間以上（内職）', value: `${prefix}_employment_12`, points: 12 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上の入院', value: `${prefix}_illness_24`, points: 24 },
  { label: '日常生活の程度4（重度）', value: `${prefix}_illness_20`, points: 20 },
  { label: '日常生活の程度3', value: `${prefix}_illness_17`, points: 17 },
  { label: '日常生活の程度2', value: `${prefix}_illness_12`, points: 12 },
  { label: '日常生活の程度1（軽度）', value: `${prefix}_illness_9`, points: 9 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 療育A / 精神1級（日常生活の程度4）', value: `${prefix}_disability_24`, points: 24 },
  { label: '身体1・2級 / 療育A / 精神1級（日常生活の程度1〜3）', value: `${prefix}_disability_21`, points: 21 },
  { label: '身体3級 / 療育B / 精神2級（日常生活の程度4）', value: `${prefix}_disability_17`, points: 17 },
  { label: '身体3級 / 療育B / 精神2級（日常生活の程度1〜3）', value: `${prefix}_disability_14`, points: 14 },
  { label: '身体4〜6級 / 療育C / 精神3級（日常生活の程度4）', value: `${prefix}_disability_11`, points: 11 },
  { label: '身体4〜6級 / 療育C / 精神3級（日常生活の程度1〜3）', value: `${prefix}_disability_8`, points: 8 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '介護・看護（疾病の項に準じる）', value: `${prefix}_care_20`, points: 20 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '多胎児の妊娠・出産', value: `${prefix}_childbirth_18`, points: 18 },
  { label: '単胎児の妊娠・出産', value: `${prefix}_childbirth_17`, points: 17 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月100時間以上の就学', value: `${prefix}_education_17`, points: 17 },
  { label: '月60時間以上の就学', value: `${prefix}_education_11`, points: 11 },
  { label: '上記以外（指定用紙以外の書類で確認可能）', value: `${prefix}_education_9`, points: 9 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中（支援機関等の利用証明あり）', value: `${prefix}_jobseeking_5`, points: 5 },
  { label: '求職中（利用証明なし）', value: `${prefix}_jobseeking_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '安城市では父母それぞれの基本指数を合算して利用調整を行います（各最大24点、合計48点）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '就労時間には休憩時間・残業時間は含みません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      helpText: '日常生活の程度は診断書の記載に基づきます（4が最も重度）',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      helpText: '日常生活の程度は診断書の記載に基づきます（4が最も重度）',
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
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
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
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい・同居人なし（+3）', value: 'adj_single_parent_3', points: 3 },
      { label: 'はい・同居人あり（+1）', value: 'adj_single_parent_1', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '第1希望の園にきょうだいが在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_yes', points: 4 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者のいずれかが保育士・幼稚園教諭として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '安城市内の施設（+3）', value: 'adj_nursery_worker_3', points: 3 },
      { label: '安城市外の施設（+1）', value: 'adj_nursery_worker_1', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業・産前産後休業からの復帰に伴う申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: 'きょうだい同時申込み（第1希望が同じ園）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_selfemployed',
    category: 'adjustment',
    label: '法人を設立せず自営業を営んでおり、添付書類が提出できない状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_selfemployed_no', points: 0 },
      { label: 'はい（-8）', value: 'adj_selfemployed_yes', points: -8 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母が同居しており、基本指数が10点未満ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: '1人該当（-1）', value: 'adj_grandparent_1', points: -1 },
      { label: '2人該当（-2）', value: 'adj_grandparent_2', points: -2 },
    ],
  },
];

export const anjoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
