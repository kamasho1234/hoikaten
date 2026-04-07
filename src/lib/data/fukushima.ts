import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 福島市 保育園入園 基本指数・調整指数データ
// 出典: 福島市保育所保育実施基準（利用調整）の考え方（令和8年度～）
// https://www.city.fukushima.fukushima.jp/material/files/group/55/R8hoikujisshikizyun.pdf
// ---------------------------------------------------------------------------

const municipality = {
  id: 'fukushima',
  name: '福島市',
  slug: 'fukushima',
  prefecture: '福島県',
  maxBasePoints: 38, // 父母各最大19点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（固定就労・週5日以上を基準に簡略化） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: 'フルタイム（週5日・1日8時間以上）', value: `${prefix}_employment_19`, points: 19 },
  { label: '週5日・1日7時間以上8時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '週5日・1日6時間以上7時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '週5日・1日5時間以上6時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '週5日・1日4時間以上5時間未満', value: `${prefix}_employment_15`, points: 15 },
  { label: '週4日・1日8時間以上', value: `${prefix}_employment_18b`, points: 18 },
  { label: '週4日・1日6時間以上8時間未満', value: `${prefix}_employment_16b`, points: 16 },
  { label: '週3日・1日8時間以上', value: `${prefix}_employment_16c`, points: 16 },
  { label: '月64時間以上（上記以外）', value: `${prefix}_employment_13`, points: 13 },
];

/** 疾病等 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院（1ヶ月以上）で保育不可', value: `${prefix}_illness_20`, points: 20 },
  { label: '常時病臥または重度感染症で保育不可', value: `${prefix}_illness_20b`, points: 20 },
  { label: '精神性疾患のため保育不可', value: `${prefix}_illness_17`, points: 17 },
  { label: '安静または週3日以上の通院が必要', value: `${prefix}_illness_16`, points: 16 },
  { label: 'その他一般療養が必要', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '障害者手帳1・2級、療育手帳A、精神1・2級', value: `${prefix}_disability_20`, points: 20 },
  { label: '障害者手帳3級、療育手帳B、精神3級', value: `${prefix}_disability_18`, points: 18 },
  { label: '障害者手帳4級またはこれに準じる', value: `${prefix}_disability_16`, points: 16 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '家族が入院中で常時介護が必要', value: `${prefix}_care_19`, points: 19 },
  { label: '家族の自宅介護が常時必要', value: `${prefix}_care_18`, points: 18 },
  { label: '障害児・障害者の通院等の付き添い', value: `${prefix}_care_17`, points: 17 },
  { label: '家族が入院中で週4日以上介護が必要', value: `${prefix}_care_16`, points: 16 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中または出産後間がない', value: `${prefix}_childbirth_14`, points: 14 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '日中7時間以上の就学', value: `${prefix}_education_18`, points: 18 },
  { label: '日中6時間以上の就学', value: `${prefix}_education_17`, points: 17 },
  { label: '日中4時間以上の就学', value: `${prefix}_education_16`, points: 16 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定あり（就労証明書あり）', value: `${prefix}_jobseeking_cert`, points: 15 },
  { label: '求職活動中', value: `${prefix}_jobseeking_12`, points: 12 },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害の復旧が必要', value: `${prefix}_disaster_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害の復旧', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '就労証明書に記載された就労時間から判断します（休憩時間含む）',
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
      label: `${parentLabel}はどのくらい介護・看護をしていますか？`,
      helpText: '介護の必要性を証明する書類と介護・看護状況申告書で判断します',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      helpText: '認定期間は出産予定日の2ヶ月前から出産後8週間経過月の末日まで',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '週4日以上・1日4時間以上の通学が必要です',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      helpText: '求職活動での入所は2ヶ月限定です',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧作業が必要ですか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: 'ひとり親の場合、基本指数に19点が加算されます（調整指数とは別）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（保育可能な同居親族なし）', value: 'adj_single_parent_yes_alone', points: 3 },
      { label: 'はい（保育可能な同居親族あり）', value: 'adj_single_parent_yes_with', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいが同じ保育施設に在籍中、または同時に同じ施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_preschool',
    category: 'adjustment',
    label: '同一世帯に申請児童以外の小学校就学前のきょうだいがいますか？',
    helpText: '1名ごとに+1点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_preschool_no', points: 0 },
      { label: '1人いる', value: 'adj_sibling_preschool_1', points: 1 },
      { label: '2人いる', value: 'adj_sibling_preschool_2', points: 2 },
      { label: '3人以上いる', value: 'adj_sibling_preschool_3', points: 3 },
    ],
  },
  {
    id: 'adj_single_absent',
    category: 'adjustment',
    label: '保護者が単身赴任等で不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_absent_no', points: 0 },
      { label: 'はい（保育可能な同居親族なし）', value: 'adj_single_absent_yes_alone', points: 3 },
      { label: 'はい（保育可能な同居親族あり）', value: 'adj_single_absent_yes_with', points: 1 },
    ],
  },
  {
    id: 'adj_guardian_absent',
    category: 'adjustment',
    label: '保護者不存在（里親を含む）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_guardian_absent_no', points: 0 },
      { label: 'はい', value: 'adj_guardian_absent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士等として保育施設で勤務中（または予定）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: '福島市内の認可保育施設で勤務', value: 'adj_hoikushi_ninka', points: 5 },
      { label: '福島市内の認可外・幼稚園等で勤務', value: 'adj_hoikushi_ninkagai', points: 3 },
      { label: '福島市外の認可保育施設で勤務', value: 'adj_hoikushi_other', points: 2 },
    ],
  },
  {
    id: 'adj_shokibo_sotsuen',
    category: 'adjustment',
    label: '小規模保育事業の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_shokibo_no', points: 0 },
      { label: 'はい（連携施設への転所希望）', value: 'adj_shokibo_renkei', points: 40 },
      { label: 'はい（連携施設以外への転所希望）', value: 'adj_shokibo_other', points: 35 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '1年度間（12ヶ月）以上継続して待機していますか？',
    helpText: '4月入所にのみ適用',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい', value: 'adj_waiting_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育できる18歳以上65歳未満の同居親族がいますか？（ひとり親・単身赴任を除く）',
    helpText: '1名につき-1点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: '1人いる', value: 'adj_grandparent_1', points: -1 },
      { label: '2人いる', value: 'adj_grandparent_2', points: -2 },
    ],
  },
  {
    id: 'adj_ikukyu',
    category: 'adjustment',
    label: '希望施設に入所できるまで育児休業の延長も許容できますか？',
    helpText: 'チェックすると-15点で利用調整されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_no', points: 0 },
      { label: 'はい', value: 'adj_ikukyu_yes', points: -15 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const fukushimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
