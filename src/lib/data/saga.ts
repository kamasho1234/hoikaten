import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 佐賀市 保育園入園 利用調整基準データ
// 出典: 佐賀市「令和8年度 2号・3号認定 保育施設入所調整基準表」
// https://www.city.saga.lg.jp/main/3806.html
// ---------------------------------------------------------------------------
// 佐賀市は「基準点数（父母それぞれ最大10点）＋ 調整点数」の加算方式。
// 合計基準点数最大20点。就労形態・日数・時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'saga',
  name: '佐賀市',
  slug: 'saga',
  prefecture: '佐賀県',
  maxBasePoints: 20,
} as const;

const employmentOutsideOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_outside_none`, points: 0 },
  { label: '月20日以上', value: `${prefix}_employment_outside_10`, points: 10 },
  { label: '月18日以上20日未満', value: `${prefix}_employment_outside_9`, points: 9 },
  { label: '月16日以上18日未満', value: `${prefix}_employment_outside_8`, points: 8 },
  { label: '月14日以上16日未満', value: `${prefix}_employment_outside_7`, points: 7 },
  { label: '月14日未満', value: `${prefix}_employment_outside_6`, points: 6 },
];

const employmentInsideOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_inside_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_inside_10`, points: 10 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_inside_9`, points: 9 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_inside_8`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_inside_7`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_inside_6`, points: 6 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_inside_5`, points: 5 },
  { label: '月64時間未満', value: `${prefix}_employment_inside_4`, points: 4 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院（概ね1か月以上）/ 常時自宅療養病臥', value: `${prefix}_illness_30`, points: 30 },
  { label: '在宅（通院）常時安静で保育が常時困難', value: `${prefix}_illness_20`, points: 20 },
  { label: '在宅（通院）それ以外', value: `${prefix}_illness_10`, points: 10 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神1・2級 / 療育A', value: `${prefix}_disability_24`, points: 24 },
  { label: '身体障害者手帳3級 / 精神3級 / 療育B', value: `${prefix}_disability_22`, points: 22 },
  { label: 'その他の身体障害者手帳', value: `${prefix}_disability_20`, points: 20 },
];

const pregnancyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_pregnancy_none`, points: 0 },
  { label: '妊娠・出産中', value: `${prefix}_pregnancy_20`, points: 20 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: 'ひとり親世帯・生計中心者の失業', value: `${prefix}_jobseeking_10`, points: 10 },
  { label: 'その他の求職中', value: `${prefix}_jobseeking_3`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '佐賀市では父母それぞれの基準点数（各最大10点）の合計で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている（居宅外就労）', value: `${prefix}_reason_employment_outside`, points: 0 },
      { label: '仕事をしている（居宅内就労・自営・内職）', value: `${prefix}_reason_employment_inside`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '妊娠・出産の前後', value: `${prefix}_reason_pregnancy`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment_outside`,
      category,
      label: `${parentLabel}の居宅外就労（就労日数）は？`,
      inputType: 'radio',
      options: employmentOutsideOptions(prefix),
    },
    {
      id: `${prefix}_employment_inside`,
      category,
      label: `${parentLabel}の居宅内就労・自営・内職（就労時間）は？`,
      inputType: 'radio',
      options: employmentInsideOptions(prefix),
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
      id: `${prefix}_pregnancy`,
      category,
      label: `${parentLabel}は妊娠・出産の前後ですか？`,
      inputType: 'radio',
      options: pregnancyOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
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
      { label: 'はい（+35）', value: 'adj_single_parent_yes', points: 35 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_welfare_yes', points: 30 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが佐賀市内の保育施設に在園し、同じ施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_sibling_same_yes', points: 15 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保育士として市内保育施設に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_childcare_worker_yes', points: 30 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_parental_leave_yes', points: 5 },
    ],
  },
  {
    id: 'adj_multiple_children',
    category: 'adjustment',
    label: '16歳未満のお子さんが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_children_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_multiple_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_previous_cancellation',
    category: 'adjustment',
    label: '昨年度入所内定をキャンセルしましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_prev_cancel_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_prev_cancel_yes', points: -3 },
    ],
  },
  {
    id: 'adj_nursery_fee_delinquent',
    category: 'adjustment',
    label: '保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい、3か月以上12か月未満（-1）', value: 'adj_fee_delinquent_3m', points: -1 },
      { label: 'はい、12か月以上（-10）', value: 'adj_fee_delinquent_12m', points: -10 },
    ],
  },
];

export const sagaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
