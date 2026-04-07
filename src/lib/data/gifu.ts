import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 岐阜市 保育所・認定こども園等 利用調整基準データ
// 出典：岐阜市児童保育条例施行規則 別表第1（優先順位）・別表第2（点数表）
// https://www1.g-reiki.net/gifu/reiki_honbun/i700RG00001651.html
// https://www.city.gifu.lg.jp/kosodate/hoiku/1012359/1012413/1003705.html
// ---------------------------------------------------------------------------
// 岐阜市は「ランク（優先順位 A〜E）」＋「点数制（基本点数＋補正点数）」の二段階方式。
// 同一ランク内で基本点数（父母の合計）＋ 補正点数 で順位を決める。
// 父母それぞれの基本点数を合算する加算方式。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'gifu',
  name: '岐阜市',
  slug: 'gifu',
  prefecture: '岐阜県',
  maxBasePoints: 200, // 父母それぞれ最大100点 × 2
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労・就学 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_70`, points: 70 },
  { label: '月60時間以上80時間未満', value: `${prefix}_employment_60`, points: 60 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（予定日前後8週間程度）', value: `${prefix}_childbirth_100`, points: 100 },
];

/** 疾病・負傷・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院（6か月以上）', value: `${prefix}_illness_100`, points: 100 },
  { label: '常時臥床療養', value: `${prefix}_illness_100b`, points: 100 },
  { label: '身体障害者手帳1・2級／精神1級／療育手帳A', value: `${prefix}_illness_100c`, points: 100 },
  { label: '短期入院（6か月未満）', value: `${prefix}_illness_80`, points: 80 },
  { label: '精神疾患で安静加療', value: `${prefix}_illness_80b`, points: 80 },
  { label: '通院加療で保育に支障', value: `${prefix}_illness_50`, points: 50 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上の付添い介護・看護', value: `${prefix}_care_100`, points: 100 },
  { label: '障害児通所支援を週3日以上利用', value: `${prefix}_care_100b`, points: 100 },
  { label: '週3日以上5日未満の付添い介護・看護', value: `${prefix}_care_50`, points: 50 },
  { label: '自宅での介護', value: `${prefix}_care_30`, points: 30 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に従事している', value: `${prefix}_disaster_100`, points: 100 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（最大3か月）', value: `${prefix}_jobseeking_30`, points: 30 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(
  parentNum: 1 | 2,
): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'もっとも該当する理由をひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている（月60時間以上）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠中・出産前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・負傷・障害がある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '学校に通っている（月60時間以上）', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください。就学も同じ基準です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      helpText: '出産予定日の前後8週間程度が対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・負傷・障害の状況は？`,
      helpText: 'いちばん近い状態を選んでください',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護していますか？`,
      helpText: '介護・看護の頻度を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '就学・職業訓練が該当します。就労と同じ基準で判定されます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は仕事を探していますか？`,
      helpText: '求職中は短時間保育のみ、最大3か月の期間限定です',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 補正点数（調整指数）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯または生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 25 },
    ],
  },
  {
    id: 'adj_full_time',
    category: 'adjustment',
    label: '保護者が月120時間以上就労していますか？',
    helpText: '父母どちらかが該当する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_full_time_no', points: 0 },
      { label: 'はい', value: 'adj_full_time_yes', points: 25 },
    ],
  },
  {
    id: 'adj_graduate_renkei',
    category: 'adjustment',
    label: '卒園児が連携施設への引き続き利用を希望していますか？',
    helpText: '小規模保育事業等の卒園児が連携施設に入所を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_renkei_no', points: 0 },
      { label: 'はい', value: 'adj_graduate_renkei_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_renkei',
    category: 'adjustment',
    label: 'きょうだいが連携施設を利用中で同施設を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_renkei_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_renkei_yes', points: 15 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだい同時利用を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 15 },
    ],
  },
  {
    id: 'adj_disability_parent',
    category: 'adjustment',
    label: '保護者が障害者手帳を所持していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_parent_no', points: 0 },
      { label: '身体障害1・2級／精神1級／療育手帳A', value: 'adj_disability_parent_high', points: 15 },
      { label: 'その他の等級', value: 'adj_disability_parent_other', points: 10 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '児童が3人以上いる多子世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 10 },
    ],
  },
  {
    id: 'adj_care_family',
    category: 'adjustment',
    label: '要介護者が同居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_care_family_no', points: 0 },
      { label: 'はい', value: 'adj_care_family_yes', points: 10 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育児休業復帰から1年以内ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_return_yes', points: 10 },
    ],
  },
  {
    id: 'adj_no_care_relative',
    category: 'adjustment',
    label: '保育可能な親族（20〜60歳）がいない世帯ですか？',
    helpText: '同居の祖父母など保育を代わりにできる親族がいない場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_care_relative_no', points: 0 },
      { label: 'はい', value: 'adj_no_care_relative_yes', points: 10 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '配偶者が単身赴任中ですか？（60km以上など）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const gifuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
