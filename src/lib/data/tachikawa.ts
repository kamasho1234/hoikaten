import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 立川市 保育施設利用調整基準データ
// 出典: 立川市令和8年度保育施設利用のしおり 実施基準指数表（P12）
// https://www.city.tachikawa.lg.jp/ （子ども未来部保育課）
// ---------------------------------------------------------------------------
// 立川市は「基本指数（父）＋ 基本指数（母）＋ 調整指数」のsum方式。
// 父母各最大20点。就労は月間時間数で5段階（48h〜160h+）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tachikawa',
  name: '立川市',
  slug: 'tachikawa',
  prefecture: '東京都',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月120時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月48時間以上80時間未満', value: `${prefix}_employment_12`, points: 12 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '常時入院・常時臥床・重度の精神性疾患・難病', value: `${prefix}_illness_20`, points: 20 },
  { label: '通院加療中（診断書提出あり）', value: `${prefix}_illness_12`, points: 12 },
  { label: '通院加療中（診断書なし）', value: `${prefix}_illness_8`, points: 8 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／愛の手帳1〜4度／精神障害1・2級', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級／精神障害3級', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体障害者手帳4級', value: `${prefix}_disability_10`, points: 10 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要（手帳1・2級等の方の介護）', value: `${prefix}_care_20`, points: 20 },
  { label: '通院に付き添い等の介護', value: `${prefix}_care_12`, points: 12 },
  { label: 'その他の看護・介護', value: `${prefix}_care_8`, points: 8 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日前後（前2ヶ月〜後7ヶ月以内）', value: `${prefix}_childbirth_20`, points: 20 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学中（通学のため保育に当たれない）', value: `${prefix}_education_14`, points: 14 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_8`, points: 8 },
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
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '1か月あたりの就労時間を選んでください（最低48時間以上）',
      inputType: 'radio',
      options: employmentOptions(prefix),
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
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
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
      { label: 'はい（離婚・未婚等）（+10）', value: 'adj_single_parent_10', points: 10 },
      { label: 'はい（死亡・行方不明等）（+6）', value: 'adj_single_parent_6', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_welfare_yes', points: 6 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育施設で保育業務に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '市内の認可保育施設で従事（+2）', value: 'adj_nursery_worker_2', points: 2 },
      { label: '市外の認可保育施設等で従事（+1）', value: 'adj_nursery_worker_1', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入園を希望する児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいについて該当するものはありますか？',
    helpText: '住民票上の世帯で3人以上の場合 +1、同時申込の場合 +1',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: '世帯で子ども3人以上（+1）', value: 'adj_sibling_multi', points: 1 },
      { label: 'きょうだい同時申込（+1）', value: 'adj_sibling_simultaneous', points: 1 },
      { label: '両方該当（+2）', value: 'adj_sibling_both', points: 2 },
    ],
  },
  {
    id: 'adj_enrolled',
    category: 'adjustment',
    label: '認可保育施設等に在籍・利用中ですか？',
    helpText: '認可保育所・認証保育所等に月48時間以上有償で利用している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_enrolled_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_enrolled_yes', points: 1 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '市外から申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（市内在住）', value: 'adj_outside_no', points: 0 },
      { label: 'はい（市外在住）（+2）', value: 'adj_outside_yes', points: 2 },
    ],
  },
];

export const tachikawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
