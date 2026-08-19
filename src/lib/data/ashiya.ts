import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 芦屋市 入所者の選考（基本ポイント・加算ポイント）データ
//
// 出典: 芦屋市ほいく課「令和8年度 保育所・認定こども園等のしおり」P11-P12
//       「4 入所者の選考」（審査ポイント＝基本ポイント（保育の必要性）＋加算ポイント（世帯の状況））
//       https://www.city.ashiya.lg.jp/kodomo/nyusyo/documents/r8shiori.pdf
//       （芦屋市Webサイト「令和8年度保育所等入所の申し込み受付」
//         https://www.city.ashiya.lg.jp/kodomo/nyusyo/kodomonyusyo8.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//
// 計算方式: min方式。原典の労働（就学）欄の注記「※ 指数の低いほうを当該世帯の指数とする」による。
//
// 質問に含めていない原典の注記:
//   「入所を希望した保育所に入所が内定した後入所を辞退（2回以上の辞退に限る）した者に係る
//     待機期間の指数の適用については、指数を0（待機期間が3月未満の場合は-1）とする」
//   （待機期間の加算を打ち消す特例のため、加算モデルでは表現できない）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ashiya',
  name: '芦屋市',
  slug: 'ashiya',
  prefecture: '兵庫県',
  maxBasePoints: 10, // 指数の低いほうを世帯の指数とするため、世帯の基本ポイントは最大10点
  scoringMethod: 'min',
} as const;

// ---------------------------------------------------------------------------
// 基本ポイント（保育の必要性）。父母それぞれについて選び、低い方が世帯の指数になる
// ---------------------------------------------------------------------------

/** 1 労働（就学） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週4日以上、1日7時間以上の就労（就学）', value: `${prefix}_employment_9`, points: 9 },
  { label: '週4日以上、1日6時間以上7時間未満の就労（就学）', value: `${prefix}_employment_7`, points: 7 },
  { label: '週4日以上、1日4時間以上6時間未満の就労（就学）', value: `${prefix}_employment_6`, points: 6 },
  {
    label: '就労（就学）先確定：すでに内定しており、入所と同時に週4日以上・1日4時間以上が可能',
    value: `${prefix}_employment_naitei_6`,
    points: 6,
  },
  { label: '就労（就学）先未定：入所後に就職先を探す', value: `${prefix}_employment_4`, points: 4 },
];

/** 2 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前2月または出産後3月のうち、必要な期間', value: `${prefix}_childbirth_9`, points: 9 },
];

/** 2 療養・障がい等 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病入院：概ね1月以上の入院', value: `${prefix}_illness_10`, points: 10 },
  { label: '居宅療養：常時臥床（疾病のため概ね1月以上）', value: `${prefix}_illness_bed_10`, points: 10 },
  { label: '居宅療養：長期療養（医師が長期加療（安静）を要すると診断）', value: `${prefix}_illness_8`, points: 8 },
  {
    label: '居宅療養：一般療養（医師が概ね1月以上加療（安静）を要すると診断）',
    value: `${prefix}_illness_6`,
    points: 6,
  },
  { label: '居宅療養：その他（比較的軽症だが定期的通院等を要する）', value: `${prefix}_illness_3`, points: 3 },
  {
    label: '心身障がい：身体1・2級／療育A／精神1級',
    value: `${prefix}_illness_disability_10`,
    points: 10,
  },
  { label: '心身障がい：身体3級／療育B1／精神2級', value: `${prefix}_illness_disability_8`, points: 8 },
  { label: '心身障がい：身体4〜6級／療育B2／精神3級', value: `${prefix}_illness_disability_6`, points: 6 },
];

/** 3 病人の看護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添：概ね1月以上親族の入院付添に当たっている', value: `${prefix}_care_10a`, points: 10 },
  {
    label: '障がい児者介護：障がい児者の介護、通園、通院、通学等に当たっている',
    value: `${prefix}_care_10b`,
    points: 10,
  },
  {
    label: '寝たきり老人等介護：祖父母等、寝たきり老人等の介護に当たっている',
    value: `${prefix}_care_10c`,
    points: 10,
  },
  { label: '看護：家族の長期居宅療養等介護に当たっている', value: `${prefix}_care_6`, points: 6 },
];

/** 4 家庭の災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災、風水害等で家屋の復旧に当たる', value: `${prefix}_disaster_10`, points: 10 },
];

/** 5 虐待・配偶者等からの暴力 */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '児童虐待・配偶者等からの暴力のおそれがある', value: `${prefix}_abuse_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '芦屋市は父母のうち指数の低いほうが世帯の指数になります',
    inputType: 'select',
    options: [
      { label: '労働（就学）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '療養・障がい等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '病人の看護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭の災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待・配偶者等からの暴力', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働（就学）の状況は？`,
      helpText: '通勤・通学時間及び休憩時間は含みません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '公式の基準表では母の欄のみに指数があります',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の療養・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は家屋の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・配偶者等からの暴力のおそれにあてはまりますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 加算ポイント（世帯の状況・待機期間）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '両親不在、または母子・父子家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: '両親不在（両親の死亡、離別、行方不明）', value: 'adj_single_parent_both', points: 5 },
      {
        label: '母子・父子家庭（母又は父の死亡、離別、行方不明等、これに準ずるもの）',
        value: 'adj_single_parent_one',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_overseas',
    category: 'adjustment',
    label: '海外赴任・海外留学・海外居住で保護者のいずれかが1年以上児童と別居しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_overseas_no', points: 0 },
      { label: 'はい', value: 'adj_overseas_yes', points: 3 },
    ],
  },
  {
    id: 'adj_separate',
    category: 'adjustment',
    label: '遠隔地の祖父母等に児童を預けていますか？',
    helpText: '兵庫県、大阪府、京都府、奈良県、滋賀県、和歌山県および三重県を除く地域が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_separate_no', points: 0 },
      { label: 'はい', value: 'adj_separate_yes', points: 3 },
    ],
  },
  {
    id: 'adj_leave_taien',
    category: 'adjustment',
    label: '育児休業中につき退所していますか？',
    helpText:
      '育児休業の対象となる児童が1歳に到達する年の年度末を越えて育児休業を取得し、退所となった当該児童の兄姉、および当該児童について適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_taien_no', points: 0 },
      { label: 'はい', value: 'adj_leave_taien_yes', points: 4 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産前産後休暇または育児休業終了により1か月以内に復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童に障がいがあり、集団保育が望ましいですか？',
    helpText: '身体障害者手帳、療育手帳、精神障害者保健福祉手帳を保持している児童について適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '市内認可保育施設への兄弟姉妹の入所・申請状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: '兄弟姉妹が既に入所している', value: 'adj_sibling_4', points: 4 },
      { label: '兄弟姉妹が同時または既に申請している', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法による被保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母等、同居の親族その他の者が保育できると認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が市内の認可保育所で保育士として就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 2 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設等に週4日以上かつ1日4時間以上児童を預けていますか？',
    helpText: '保護者の就労や病気等による場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 1 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '待機期間はどのくらいですか？',
    helpText:
      '芦屋市内の保育所の入所定員等の事情により入所できず待機している期間によります（家庭の事情等により入所を保留している期間、審査を希望しない申立期間を除く）',
    inputType: 'radio',
    options: [
      { label: '3月未満', value: 'adj_waiting_0', points: 0 },
      { label: '3月以上6月未満', value: 'adj_waiting_1', points: 1 },
      { label: '6月以上9月未満', value: 'adj_waiting_2', points: 2 },
      { label: '9月以上12月未満', value: 'adj_waiting_3', points: 3 },
      { label: '12月以上15月未満', value: 'adj_waiting_4', points: 4 },
      { label: '15月以上', value: 'adj_waiting_5', points: 5 },
    ],
  },
];

export const ashiyaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
