import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 多治見市 保育の実施の基準を定める要綱 別表第1・別表第2 データ
//
// 出典: 多治見市保育幼稚園課「令和8年度保育所等入所申込案内」P18-P19
//       「12．【参考】多治見市保育の実施の基準を定める要綱」別表第1・別表第2
//       https://www.city.tajimi.lg.jp/_res/projects/default_project/_page_/001/006/257/r8nyuusyomousikomi.pdf
//       （多治見市Webサイト「令和8年度保育園・認定こども園・小規模保育所の入所受付」
//         https://www.city.tajimi.lg.jp/kosodate_tajimikko/mokuteki/1006224/1006225/1006257.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式要綱を読み取って全面的に置き換えた。
//
// 原典の注記: 「※要綱見直し中のため、内容は変更となる場合があります。」
//
// 原典の考え方（第2条）:
//   別表第1は「複数の区分に該当する場合は、該当する区分のうち最も高い点数の区分にのみ
//   該当するものとする」。別表第2は「掲げる状況の区分に応じ、当該区分に定める点数を合算」。
//   保護者の状況に関する採点は保護者ごとに行う。
//
// 質問に含めていない原典の項目（点数ではなく優先扱いとされるもの）:
//   ・対象児童の虐待、保護者に対する配偶者からの暴力その他特別の事情がある場合
//   ・対象児童が市の施策により保育所へ継続して通所できなくなり転園する場合
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tajimi',
  name: '多治見市',
  slug: 'tajimi',
  prefecture: '岐阜県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 別表第1（保護者又は家庭の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労（正規雇用・非正規を問わず勤務時間による） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '勤務時間が月150時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '勤務時間が月120時間以上150時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '勤務時間が月90時間以上120時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '勤務時間が月60時間以上90時間未満', value: `${prefix}_employment_6`, points: 6 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前2か月以内から産後3か月以内まで', value: `${prefix}_childbirth_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：概ね3か月以上の入院', value: `${prefix}_illness_10`, points: 10 },
  {
    label: '居宅療養・常時臥床：医師が長期加療を要すると診断',
    value: `${prefix}_illness_bedridden_10`,
    points: 10,
  },
  { label: '居宅療養・精神性疾患：医師が長期加療を要すると診断', value: `${prefix}_illness_8`, points: 8 },
  { label: '居宅療養・一般療養：比較的軽症だが定期的に通院を要する', value: `${prefix}_illness_6`, points: 6 },
];

/** 障害等 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、療育A1・A2、精神1級のいずれかを所持', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3級、療育B1、精神2級のいずれかを所持', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体4級、療育B2、精神3級のいずれかを所持', value: `${prefix}_disability_5`, points: 5 },
];

/** 同居の親族等の介護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '心身障害者の介護、通院、通園、通学等に当たっている', value: `${prefix}_care_9`, points: 9 },
  {
    label: '心身障害者以外の同居家族の居宅内看護に長期に当たっている',
    value: `${prefix}_care_6`,
    points: 6,
  },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中（ひとり親家庭または両親のいない家庭）', value: `${prefix}_jobseeking_6`, points: 6 },
  { label: '求職中（その他）', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災、風水害等で家屋が失われ復旧に当たっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** その他（就学） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '学生・就労のための専門学生等（ひとり親家庭または両親のいない家庭）',
    value: `${prefix}_education_7`,
    points: 7,
  },
  { label: '学生・就労のための専門学生等（その他）', value: `${prefix}_education_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '複数の区分に該当する場合は、最も高い点数の区分のみが適用されます',
    inputType: 'select',
    options: [
      { label: '働いている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居の親族等を介護している', value: `${prefix}_reason_care`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害で家屋が失われた', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '学生・専門学生等', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の勤務時間は？`,
      helpText: '正規雇用・非正規を問わず、勤務時間で判定されます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '「同居」とは、同一の住宅（同一の地番に所在する住宅。集合住宅を除く）に居住することなどを指します',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      helpText: '就労先は確定していないが求職中の場合が対象です',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害で家屋が失われましたか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学生・専門学生等ですか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 別表第2（保護者、家庭又は対象児童の状況）。該当する点数を合算する
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭または両親のいない家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給している世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_no_transport',
    category: 'adjustment',
    label: '適当な交通手段がないため最寄りの保育所等を希望しますか？',
    helpText: '特別な事情による場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_transport_no', points: 0 },
      { label: 'はい', value: 'adj_no_transport_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '同一の保育所等に在園中の兄弟姉妹がいますか？',
    helpText: '私的契約児を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟姉妹が同じ保育所等に同時に申し込みますか？',
    helpText: '多胎児を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '対象児童が手帳を所持している、または同様の状態ですか？',
    helpText:
      '身体障害者手帳・療育手帳・精神障害者保健福祉手帳を所持する場合、またはこれと同様の状態である旨の医師の診断書等を提出した場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '3歳未満児のみを対象とした保育所・地域型保育事業所を卒園しましたか？',
    helpText: '引き続き保育の実施を要する場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: 'はい', value: 'adj_graduation_yes', points: 5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業取得後に復職する保護者がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育が可能な65歳未満の祖父母と同居していますか？',
    helpText: '対象児童の保護者でなく、介護または看護を必要としない祖父母が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '1か月の平均就労日数は？',
    inputType: 'radio',
    options: [
      { label: '15日未満', value: 'adj_work_days_0', points: 0 },
      { label: '15日以上20日未満', value: 'adj_work_days_1', points: 1 },
      { label: '20日以上', value: 'adj_work_days_2', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士証または幼稚園教諭普通免許状を有し、保育の現場で就労していますか？',
    helpText:
      '特定教育・保育施設、特定地域型保育事業、または特定子ども・子育て支援施設等での就労が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 2 },
    ],
  },
];

export const tajimiData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
