import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 厚木市 保育所入所選考基準データ
// 出典: 厚木市「厚木市特定教育・保育施設及び特定地域型保育事業の利用調整の基準」
// https://www.city.atsugi.kanagawa.jp/soshiki/hoikuka/7/8592.html
// PDF: https://www.city.atsugi.kanagawa.jp/material/files/group/26/kijun.pdf
// ---------------------------------------------------------------------------
// 厚木市は「基本指数（父母のうち低い方、最大10点）＋ 調整指数」のmin方式。
// 居宅外就労・自営・居宅内就労・居宅内自営で点数が異なる詳細な基準。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'atsugi',
  name: '厚木市',
  slug: 'atsugi',
  prefecture: '神奈川県',
  maxBasePoints: 10,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外就労：週5日以上・週40時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '居宅外就労：週5日以上・週35〜40時間', value: `${prefix}_employment_9a`, points: 9 },
  { label: '居宅外自営：週5日以上・週40時間以上', value: `${prefix}_employment_9b`, points: 9 },
  { label: '居宅外就労：週4日以上・週24時間以上', value: `${prefix}_employment_8a`, points: 8 },
  { label: '居宅外自営：週5日以上・週35〜40時間', value: `${prefix}_employment_8b`, points: 8 },
  { label: '居宅外就労：週4日以上・週20〜24時間', value: `${prefix}_employment_7a`, points: 7 },
  { label: '居宅外自営：週4日以上・週24時間以上', value: `${prefix}_employment_7b`, points: 7 },
  { label: '居宅内就労：週5日以上・週35時間以上', value: `${prefix}_employment_7c`, points: 7 },
  { label: '居宅外就労：週4日以上・週16〜20時間', value: `${prefix}_employment_6`, points: 6 },
  { label: '居宅内就労：週4日以上・週24時間以上', value: `${prefix}_employment_6b`, points: 6 },
  { label: '居宅内自営：週5日以上・週35時間以上', value: `${prefix}_employment_6c`, points: 6 },
  { label: '上記に該当しない就労', value: `${prefix}_employment_5`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・自宅療養で常時臥床', value: `${prefix}_illness_10`, points: 10 },
  { label: '週5日以上・週40時間以上の通院', value: `${prefix}_illness_8`, points: 8 },
  { label: '週4日以上・週16時間以上の通院', value: `${prefix}_illness_7`, points: 7 },
  { label: '上記程度に至らないが保育に支障', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級 / 精神1-2級 / 療育A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3-4級 / 精神3級 / 療育B', value: `${prefix}_disability_8`, points: 8 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護3-5の方の介護（週5日以上・40時間以上）', value: `${prefix}_care_7`, points: 7 },
  { label: '要介護1-2の方の介護（週4日以上・24時間以上）', value: `${prefix}_care_6`, points: 6 },
  { label: 'その他の介護', value: `${prefix}_care_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '切迫で入院・安静が必要', value: `${prefix}_childbirth_8`, points: 8 },
  { label: '産前8週間〜産後8週間', value: `${prefix}_childbirth_6`, points: 6 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '厚木市では父母のうち低い方の基本指数（最大10点）で選考されます',
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
      helpText: '就労形態（居宅外/自営/内職等）と勤務日数・時間で点数が変わります',
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
      label: `${parentLabel}の介護の状況は？`,
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
    id: 'adj_childcare_need',
    category: 'adjustment',
    label: '子どもに対する保育の必要性が関係機関で確認されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_need_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_childcare_need_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが希望する保育施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_enrolled_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unlicensed_nursery_yes', points: 1 },
    ],
  },
];

export const atsugiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
