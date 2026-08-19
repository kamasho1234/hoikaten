import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 宗像市 入所選考基準指数（基準指数・調整指数）データ
//
// 出典: 宗像市子ども育成課「令和8年度 教育保育給付認定申請案内書 入所申込みのご案内
//       認可保育所・認定こども園（保育利用）」8ページ「4 入所調整について ⑴ 指数」
//       https://www.city.munakata.lg.jp/kiji0032822/3_2822_8442_up_8umg6imd.pdf
//       （宗像市Webサイト「認可保育所・幼稚園・認定こども園の令和8年4月入園手続き」
//         https://www.city.munakata.lg.jp/kosodate/w051/20191028163408.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基準指数は最大24点で、旧データ（父母各20点）とは体系が異なる。
//
// 重要: 「保護者の中で、最も低い人の指数を基準指数とします」とあるため scoringMethod は 'min'。
//
// 原典の注記:
//   「基準指数」と「調整指数」の合計をもとに、指数が高い方から調整する
//   ひとり親家庭の加点は、離婚が成立していない場合は対象外
//   調整指数⑸⑹⑺はいずれか1つ、⑻もいずれか1つ
//   介護職員等・保育士等の加点は月60時間以上の勤務であることが条件で、
//     就労証明書の該当欄への記載が必要
//
// 数値化しない規定（質問には含めない）:
//   基準指数 9「市長がとくに認める理由」＝最優先
// ---------------------------------------------------------------------------

const municipality = {
  id: 'munakata',
  name: '宗像市',
  slug: 'munakata',
  prefecture: '福岡県',
  maxBasePoints: 24, // 保護者の中で最も低い人の指数を基準指数とするため、世帯の基準指数は最大24点
  scoringMethod: 'min',
} as const;

// ---------------------------------------------------------------------------
// 基準指数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 就労時間（月間） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '160時間以上', value: `${prefix}_employment_24`, points: 24 },
  { label: '140〜160時間未満', value: `${prefix}_employment_22`, points: 22 },
  { label: '120〜140時間未満', value: `${prefix}_employment_20`, points: 20 },
  { label: '90〜120時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '60〜90時間未満', value: `${prefix}_employment_12`, points: 12 },
];

/** 2 内職 */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月60時間以上の内職', value: `${prefix}_homework_10`, points: 10 },
];

/** 3 求職活動中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_8`, points: 8 },
];

/** 4 産前・産後 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前・産後', value: `${prefix}_childbirth_20`, points: 20 },
];

/** 5 同居親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅での介護・看護', value: `${prefix}_care_16`, points: 16 },
  { label: '施設など入所中の介護・看護', value: `${prefix}_care_10`, points: 10 },
];

/** 6 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '通学による1か月60時間以上の就学等', value: `${prefix}_education_16`, points: 16 },
  { label: '通信制である1か月60時間以上の就学等', value: `${prefix}_education_8`, points: 8 },
];

/** 7 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧', value: `${prefix}_disaster_20`, points: 20 },
];

/** 8 疾病・障がい等 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label:
      '入院・身体障害者手帳1・2級・療育手帳A・精神障害者保健福祉手帳1・2級',
    value: `${prefix}_illness_24`,
    points: 24,
  },
  {
    label: '身体障害者手帳3級・療育手帳B・精神障害者保健福祉手帳3級',
    value: `${prefix}_illness_22`,
    points: 22,
  },
  { label: '通院・自宅療養', value: `${prefix}_illness_20`, points: 20 },
  { label: '身体障害者手帳4級以下', value: `${prefix}_illness_10`, points: 10 },
];

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
      { label: '就労（被雇用者・自営業者）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '内職', value: `${prefix}_reason_homework`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '産前・産後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '疾病・障がい等', value: `${prefix}_reason_illness`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText:
        '被雇用者は勤務証明、自営業者は営業実態を客観的に確認できる書類によります',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: homeWorkOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は産前・産後ですか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に従事していますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '離婚が成立していない場合は対象外です（家庭状況⑴）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '家庭状況⑵',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居親族等が保育可能ですか？',
    helpText: '家庭状況⑶（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -4 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子（第3子以上）世帯、または多胎児の同時申込みですか？',
    helpText: '家庭状況⑷',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_status',
    category: 'adjustment',
    label: 'きょうだいの在園・復職・在園中の児童の状況は？',
    helpText: '⑸⑹⑺のいずれか1つが加点されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_status_none', points: 0 },
      { label: 'きょうだいが入所中の園に申し込む', value: 'adj_sibling_status_sibling', points: 6 },
      {
        label: '育児休業からの復職前である',
        value: 'adj_sibling_status_return',
        points: 6,
      },
      {
        label:
          '1号認定で認定こども園に在園中の児童が、同じ園に2号認定で申し込む',
        value: 'adj_sibling_status_type_change',
        points: 6,
      },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '入所待ちの状況は？',
    helpText: '申込みの状況⑻。いずれか1つが加点されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_waiting_none', points: 0 },
      { label: '6か月以上入所待ち', value: 'adj_waiting_6', points: 4 },
      { label: '3か月以上入所待ち', value: 'adj_waiting_3', points: 2 },
      { label: '前年度6か月以上待ち', value: 'adj_waiting_prev', points: 2 },
    ],
  },
  {
    id: 'adj_care_worker',
    category: 'adjustment',
    label: '市内の介護施設に介護職員等として勤務していますか（予定を含む）？',
    helpText:
      '介護職員（介護福祉士資格を有する者に限る）、看護職員（看護師資格または准看護師免許を有する者に限る）、生活相談員、ケアマネジャーが対象。月60時間以上の勤務で、就労証明書の「備考欄」への記載が必要です（⑼）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_care_worker_no', points: 0 },
      { label: 'はい', value: 'adj_care_worker_yes', points: 2 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '市内の保育所等に保育士等として勤務していますか（予定を含む）？',
    helpText:
      '保育士・保育教諭・みなし保育士（保健師、看護師、准看護師など）が対象。月60時間以上の勤務で、就労証明書の「保育士等としての勤務実態の有無」への記入が必要です（⑽）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_worker_yes', points: 14 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const munakataData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
