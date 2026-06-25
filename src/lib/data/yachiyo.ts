import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 八千代市 保育園入園 利用調整基準データ
// 出典: 八千代市「令和6年度 教育・保育給付支給認定の利用調整基準」
// https://www1.g-reiki.net/yachiyo-city/reiki_honbun/g022RG00000684.html
// ---------------------------------------------------------------------------
// 八千代市は「基準点数（父母それぞれ最大20点）＋ 調整点数」の加算方式。
// 合計基準点数最大40点。月の就労日数と1日の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yachiyo',
  name: '八千代市',
  slug: 'yachiyo',
  prefecture: '千葉県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  // 月20日以上の場合
  { label: '月20日以上・1日8時間以上', value: `${prefix}_employment_20days_8h`, points: 20 },
  { label: '月20日以上・1日7時間以上8時間未満', value: `${prefix}_employment_20days_7h`, points: 18 },
  { label: '月20日以上・1日6時間以上7時間未満', value: `${prefix}_employment_20days_6h`, points: 16 },
  { label: '月20日以上・1日5時間以上6時間未満', value: `${prefix}_employment_20days_5h`, points: 14 },
  { label: '月20日以上・1日4時間以上5時間未満', value: `${prefix}_employment_20days_4h`, points: 12 },
  // 月16-19日の場合
  { label: '月16日以上19日未満・1日8時間以上', value: `${prefix}_employment_16days_8h`, points: 16 },
  { label: '月16日以上19日未満・1日7時間以上8時間未満', value: `${prefix}_employment_16days_7h`, points: 14 },
  { label: '月16日以上19日未満・1日6時間以上7時間未満', value: `${prefix}_employment_16days_6h`, points: 12 },
  { label: '月16日以上19日未満・1日5時間以上6時間未満', value: `${prefix}_employment_16days_5h`, points: 10 },
  { label: '月16日以上19日未満・1日4時間以上5時間未満', value: `${prefix}_employment_16days_4h`, points: 8 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院16日以上 / 寝たきり状態', value: `${prefix}_illness_20`, points: 20 },
  { label: '精神疾患', value: `${prefix}_illness_16`, points: 16 },
  { label: '静養が必要', value: `${prefix}_illness_10`, points: 10 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳2級以上 / 療育手帳A / 精神1級 / 障害年金1級', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級 / 療育手帳B-1 / 精神2・3級 / 障害年金2級', value: `${prefix}_disability_16`, points: 16 },
  { label: '療育手帳B-2 / 身体障害者手帳4級以上', value: `${prefix}_disability_10`, points: 10 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添看護', value: `${prefix}_care_20`, points: 20 },
  { label: '障害児の世話・学校付添', value: `${prefix}_care_14`, points: 14 },
  { label: '長期在宅介護', value: `${prefix}_care_12`, points: 12 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日2か月前～出産後2か月以内', value: `${prefix}_childbirth_8`, points: 8 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_4`, points: 4 },
];

const vocationalTrainingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_vocational_none`, points: 0 },
  { label: '職業訓練校など', value: `${prefix}_vocational_14`, points: 14 },
  { label: '学校教育法に定める教育機関', value: `${prefix}_vocational_12`, points: 12 },
];

const otherReasonOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '被災、死亡、離婚、未婚、家出、獄中の親', value: `${prefix}_other_20`, points: 20 },
  { label: '親が不在（単身赴任等）', value: `${prefix}_other_12`, points: 12 },
  { label: '育児休業中', value: `${prefix}_other_4`, points: 4 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '八千代市では父母それぞれの基準点数（各最大20点）の合計で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '職業訓練中・学生', value: `${prefix}_reason_vocational`, points: 0 },
      { label: 'その他（被災・親の不在など）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
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
    {
      id: `${prefix}_vocational`,
      category,
      label: `${parentLabel}の職業訓練・学生状況は？`,
      inputType: 'radio',
      options: vocationalTrainingOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}のその他事情は？`,
      inputType: 'radio',
      options: otherReasonOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯またはいずれの親もいない世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_single_parent_yes', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_primary_earner_unemployed',
    category: 'adjustment',
    label: '主たる稼ぎ手が失業中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_unemployed_yes', points: 5 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保育士資格を持っていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: '月20日以上・1日6時間以上勤務（+10）', value: 'adj_childcare_worker_20', points: 10 },
      { label: '月64時間以上勤務（+5）', value: 'adj_childcare_worker_64', points: 5 },
    ],
  },
  {
    id: 'adj_noncertified_facility',
    category: 'adjustment',
    label: '認可外保育施設に2か月以上利用料を支払っていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_noncertified_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_noncertified_yes', points: 6 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育児休業からの復帰ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_return_yes', points: 6 },
    ],
  },
  {
    id: 'adj_kindergarten_graduate',
    category: 'adjustment',
    label: '幼稚園・小規模保育等の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_graduate_yes', points: 8 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが希望する施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_apply_simultaneously',
    category: 'adjustment',
    label: 'きょうだいが同時に申込みしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_apply_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_apply_yes', points: 4 },
    ],
  },
  {
    id: 'adj_hospital_visits',
    category: 'adjustment',
    label: 'お子さんの通院により保護者の就業が制限されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hospital_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_hospital_yes', points: 3 },
    ],
  },
  {
    id: 'adj_both_employed',
    category: 'adjustment',
    label: '両親が2か月以上就業していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_both_employed_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_both_employed_yes', points: 3 },
    ],
  },
  {
    id: 'adj_non_adult_household',
    category: 'adjustment',
    label: '18歳以上の別住居世帯員がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_non_adult_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_non_adult_yes', points: -3 },
    ],
  },
  {
    id: 'adj_work_mismatch',
    category: 'adjustment',
    label: '申告内容と実際の収入が不一致していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_mismatch_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_mismatch_yes', points: -3 },
    ],
  },
  {
    id: 'adj_home_work',
    category: 'adjustment',
    label: '親が在宅勤務・自営業を主としていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_work_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_home_work_yes', points: -3 },
    ],
  },
  {
    id: 'adj_withdrawn',
    category: 'adjustment',
    label: '過去6か月以内に利用をやめましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_withdrawn_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_withdrawn_yes', points: -5 },
    ],
  },
  {
    id: 'adj_tuition_arrears',
    category: 'adjustment',
    label: '保育料の滞納が4か月以上ありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_arrears_yes', points: -10 },
    ],
  },
  {
    id: 'adj_out_of_city',
    category: 'adjustment',
    label: 'お住まいが市外ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_out_city_no', points: 0 },
      { label: 'はい（-12）', value: 'adj_out_city_yes', points: -12 },
    ],
  },
];

export const yachiyoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
