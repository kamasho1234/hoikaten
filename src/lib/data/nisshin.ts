import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 日進市 保育園等利用調整基準指数表（基準指数・調整指数）データ
//
// 出典: 日進市保育課「令和8年度 日進市 保育所等利用案内」P12-P13
//       「日進市保育園等利用調整基準指数表」
//       https://www.city.nisshin.lg.jp/material/files/group/120/08riyouannai.pdf
//       （日進市Webサイト「令和8年度保育園等利用申込について」
//         https://www.city.nisshin.lg.jp/department/kenko/hoiku/6/2/2/hoiku/17569.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//
// 計算方式: min方式。原典の
//   「基準指数については、すべての保護者のうち指数の低い方を基準として指数を決定する」による。
//
// 原典の注記:
//   ・利用申込締切時点に「就労証明書」等の提出がない場合は0点とする。
//   ・育児休業法に基づく育休中で入園年度内に復帰しない場合は、求職活動と同指数とする
//     （3歳児クラス以上の児童のみ。2歳児で卒園となる園児は除く）。
//   ・「希望する保育所等に入所できない場合は育児休業の延長も許容できる」を選択した場合は、
//     保育の必要な事由に関わらず合計指数1とする（数値化できないため質問に含めていない）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'nisshin',
  name: '日進市',
  slug: 'nisshin',
  prefecture: '愛知県',
  maxBasePoints: 10, // 保護者のうち指数の低い方を基準とするため、世帯の基準指数は最大10点
  scoringMethod: 'min',
} as const;

// ---------------------------------------------------------------------------
// 基準指数（保護者の状況）。父母それぞれについて選び、低い方が世帯の指数になる
// ---------------------------------------------------------------------------

/** 1 就労（居宅外（内）勤務・自営等／農業／内職） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  {
    label: '正社員・契約社員・自営の中心者：月155時間以上勤務',
    value: `${prefix}_employment_10`,
    points: 10,
  },
  {
    label: '正社員・契約社員・自営の中心者：月120時間以上勤務',
    value: `${prefix}_employment_9`,
    points: 9,
  },
  {
    label: '正社員・契約社員・自営の中心者：月90時間以上勤務',
    value: `${prefix}_employment_8`,
    points: 8,
  },
  { label: 'パート・派遣社員：月120時間以上勤務', value: `${prefix}_employment_part_8`, points: 8 },
  { label: 'パート・派遣社員：月90時間以上勤務', value: `${prefix}_employment_part_7`, points: 7 },
  { label: 'パート・派遣社員：月60時間以上勤務', value: `${prefix}_employment_part_6`, points: 6 },
  { label: '自営の専従者：月120時間以上勤務', value: `${prefix}_employment_senju_8`, points: 8 },
  { label: '自営の専従者：月90時間以上勤務', value: `${prefix}_employment_senju_7`, points: 7 },
  { label: '自営の専従者：月60時間以上勤務', value: `${prefix}_employment_senju_6`, points: 6 },
  { label: '自営協力者：月120時間以上勤務', value: `${prefix}_employment_help_7`, points: 7 },
  { label: '自営協力者：月90時間以上勤務', value: `${prefix}_employment_help_6`, points: 6 },
  { label: '自営協力者：月60時間以上勤務', value: `${prefix}_employment_help_5`, points: 5 },
  { label: '農業の中心者：農地30アール以上、月90時間以上労働', value: `${prefix}_employment_farm_6`, points: 6 },
  { label: '農業の協力者：農地20アール以上、月60時間以上労働', value: `${prefix}_employment_farm_5`, points: 5 },
  { label: '内職：月90時間以上勤務', value: `${prefix}_employment_naishoku_5`, points: 5 },
  { label: '内職：月60時間以上勤務', value: `${prefix}_employment_naishoku_4`, points: 4 },
];

/** 2 産前産後 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産の前後で、休養等を要するため保育ができない', value: `${prefix}_childbirth_10`, points: 10 },
];

/** 3 疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '疾病：寝たきりもしくは感染症等により医師に保育が不可能と診断された',
    value: `${prefix}_illness_10a`,
    points: 10,
  },
  { label: '疾病：入院（月15日以上を要する）', value: `${prefix}_illness_10b`, points: 10 },
  { label: '疾病：精神障害等で医師に保育が不可能と診断された', value: `${prefix}_illness_8a`, points: 8 },
  { label: '疾病：通院（月15日以上の通院が必要）', value: `${prefix}_illness_8b`, points: 8 },
  { label: '障害者：1・2級またはA判定、B判定', value: `${prefix}_illness_disability_10`, points: 10 },
  { label: '障害者：3級またはC判定', value: `${prefix}_illness_disability_9`, points: 9 },
  { label: '障害者：4級以下', value: `${prefix}_illness_disability_7`, points: 7 },
];

/** 4 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '自宅療養：要介護4・5等の配偶者・子の介護',
    value: `${prefix}_care_10`,
    points: 10,
  },
  { label: '病院等付添：月15日以上の配偶者・子の付添い看護', value: `${prefix}_care_9`, points: 9 },
  {
    label: '自宅療養：要介護4・5等のその他の親族の介護',
    value: `${prefix}_care_8a`,
    points: 8,
  },
  { label: '自宅療養：上記以外の配偶者・子の介護', value: `${prefix}_care_8b`, points: 8 },
  { label: '病院等付添：月15日以上のその他の親族の付添い看護', value: `${prefix}_care_7`, points: 7 },
  { label: '自宅療養：上記以外のその他の親族の介護', value: `${prefix}_care_6`, points: 6 },
];

/** 5 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害の復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 6 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・技能習得のため月120時間以上', value: `${prefix}_education_7`, points: 7 },
  { label: '就学・技能習得のため月60時間以上', value: `${prefix}_education_5`, points: 5 },
];

/** 7 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '就労の意思があり、求職活動（起業準備を含む）を継続的に行っている',
    value: `${prefix}_jobseeking_1`,
    points: 1,
  },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '日進市はすべての保護者のうち、指数の低い方を基準として指数が決定されます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '産前産後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText:
        '契約社員は、雇用期間が1年以上で社会保険等（日進市国民健康保険を除く）に加入している場合が該当します',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の産前産後の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護の状況は？`,
      helpText: '介護する相手が配偶者・子か、その他の親族かで指数が変わります',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・技能習得の状況は？`,
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

// ---------------------------------------------------------------------------
// 調整指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '母子または父子世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（単独世帯）', value: 'adj_single_parent_3', points: 3 },
      { label: 'はい（祖父母等と同居）', value: 'adj_single_parent_1', points: 1 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '父または母が要介護4・5等の認定を受けていますか？',
    helpText: '要介護4・5、体幹機能障害による1・2級、A判定、精神1級が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      { label: 'はい', value: 'adj_parent_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法に基づく保護世帯に準ずる場合ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leave',
    category: 'adjustment',
    label: '育児休業に関する状況は？',
    helpText: '育児休業明けの入園希望は3歳未満児のみ、復帰の年度のみ有効です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_leave_no', points: 0 },
      {
        label: '育児休業取得前に保育園等を利用しており、育休取得に伴い退園となった児童',
        value: 'adj_leave_2',
        points: 2,
      },
      { label: '育児休業明けに入園を希望する（3歳未満児のみ）', value: 'adj_leave_1a', points: 1 },
      {
        label: '昨年度、育休明けに申込した結果待機となり、認可外保育施設等を利用して職場復帰している',
        value: 'adj_leave_1b',
        points: 1,
      },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の入園状況は？',
    helpText: '同一園への申込みの場合のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: '新年度継続在園児の兄弟姉妹入園', value: 'adj_sibling_3', points: 3 },
      { label: '新規兄弟姉妹同時入園申込', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '2歳児で卒園となる保育園の卒園児童ですか？',
    helpText:
      'あずま♪ららら保育園、市内小規模保育事業所10施設が対象で、卒園の次年度のみ有効です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: 'はい', value: 'adj_graduation_yes', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士・保育教諭・看護師として日進市内の認可保育施設で就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（月90時間以上就労）', value: 'adj_hoikushi_3', points: 3 },
      { label: 'はい（月60時間以上就労）', value: 'adj_hoikushi_1', points: 1 },
    ],
  },
  {
    id: 'adj_relative',
    category: 'adjustment',
    label: '同居の親族その他の者（入園年度の4月1日現在で65歳未満）が児童を保育できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_no', points: 0 },
      { label: 'はい', value: 'adj_relative_yes', points: -2 },
    ],
  },
  {
    id: 'adj_night_work',
    category: 'adjustment',
    label: '就労時間が通常保育時間外ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_night_work_no', points: 0 },
      { label: 'はい', value: 'adj_night_work_yes', points: -1 },
    ],
  },
  {
    id: 'adj_work_change',
    category: 'adjustment',
    label: '就労時間・日数の変更、実績不足等がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_change_no', points: 0 },
      { label: 'はい', value: 'adj_work_change_yes', points: -1 },
    ],
  },
  {
    id: 'adj_planned_work',
    category: 'adjustment',
    label: '就労予定者ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_planned_work_no', points: 0 },
      { label: 'はい', value: 'adj_planned_work_yes', points: -2 },
    ],
  },
  {
    id: 'adj_self_income',
    category: 'adjustment',
    label: '自営の中心者で年収が130万円未満（見込含む）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_self_income_no', points: 0 },
      { label: 'はい', value: 'adj_self_income_yes', points: -2 },
    ],
  },
  {
    id: 'adj_medical_care',
    category: 'adjustment',
    label: '医療的ケア児（3歳児以上）ですか？',
    helpText: '医療的ケア実施園を希望する場合のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_medical_care_no', points: 0 },
      { label: 'はい', value: 'adj_medical_care_yes', points: 1 },
    ],
  },
];

export const nisshinData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
