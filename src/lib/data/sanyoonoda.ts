import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 山陽小野田市 保育の必要性の認定及び利用調整に関する基準表（基本点数・調整点数）データ
//
// 出典: 山陽小野田市子育て支援課「山陽小野田市保育の必要性の認定及び利用調整に関する基準表」
//       https://www.city.sanyo-onoda.lg.jp/uploaded/attachment/59202.pdf
//       （山陽小野田市Webサイト「令和8年度保育園入園児募集」
//         https://www.city.sanyo-onoda.lg.jp/soshiki/20/r8hoikuenn.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 就労は「勤務形態」「勤務日数」「勤務時間数」の3つがそれぞれ独立した点数として加算される
// （例：外勤4＋週5日以上3＋1日8時間以上3＝10点）。就学（通学）も同じ扱い。
//
// 原典の備考:
//   「世帯分離をしていても、住民票上で同住所にいる者については同居とする。
//     住宅地図などで別棟であることが確認できれば別居とする」
//   「滞納保育料の分納誓約を交わし、児童手当からの充当申出書の提出があれば、
//     納付の意思があるものとする」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sanyoonoda',
  name: '山陽小野田市',
  slug: 'sanyoonoda',
  prefecture: '山口県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 基本点数（保護者の状況等）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 勤務形態（就学の通学・在宅を含む） */
const employmentTypeOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emptype_none`, points: 0 },
  { label: '外勤、自営・農業等中心者、就学（通学）', value: `${prefix}_emptype_4`, points: 4 },
  { label: '自営協力者', value: `${prefix}_emptype_3`, points: 3 },
  { label: '内職、就学（在宅）、農業等協力者', value: `${prefix}_emptype_2`, points: 2 },
];

/** 勤務日数（就学も含む） */
const workDaysOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_days_none`, points: 0 },
  { label: '週5日以上', value: `${prefix}_days_3`, points: 3 },
  { label: '週4日以上', value: `${prefix}_days_2`, points: 2 },
  { label: '週3日以上', value: `${prefix}_days_1`, points: 1 },
];

/** 勤務時間数（就学も含む） */
const workHoursOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_hours_none`, points: 0 },
  { label: '1日8時間以上', value: `${prefix}_hours_3`, points: 3 },
  { label: '1日6時間以上', value: `${prefix}_hours_2`, points: 2 },
  { label: '1日4時間以上', value: `${prefix}_hours_1`, points: 1 },
];

/** 不在（未婚・離婚・行方不明・死亡等） */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label: '未婚・離婚・行方不明・死亡等により不在（単身赴任を除く）',
    value: `${prefix}_absence_10`,
    points: 10,
  },
];

/** 内定・求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定（就労予定条件が上位）', value: `${prefix}_jobseeking_10`, points: 10 },
  { label: '内定（就労予定条件が中位）', value: `${prefix}_jobseeking_7`, points: 7 },
  { label: '内定（就労予定条件が下位）', value: `${prefix}_jobseeking_4`, points: 4 },
  { label: '求職中（未定。原則として3か月間を入所承諾期間とする）', value: `${prefix}_jobseeking_3`, points: 3 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体・精神1〜2級、または療育A）', value: `${prefix}_disability_10`, points: 10 },
  { label: '中軽度（身体・精神3級以下、または療育B）', value: `${prefix}_disability_8`, points: 8 },
];

/** 療養（疾病・負傷） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・常時が床', value: `${prefix}_illness_10`, points: 10 },
  { label: '通院（月12日以上）', value: `${prefix}_illness_8`, points: 8 },
  { label: '慢性疾患または長期疾病のため自宅療養中', value: `${prefix}_illness_4`, points: 4 },
  { label: '上記以外', value: `${prefix}_illness_3`, points: 3 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産（原則として出産予定日前3か月および出産後3か月を入所承諾期間とする）',
    value: `${prefix}_childbirth_10`,
    points: 10,
  },
];

/** 病人看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院・施設等に常時付き添い', value: `${prefix}_care_10a`, points: 10 },
  { label: '老人介護（寝たきり・認知症）', value: `${prefix}_care_10b`, points: 10 },
  { label: '心身障害児・者介護', value: `${prefix}_care_10c`, points: 10 },
  { label: '同居者の通院付き添い（月10日以上）', value: `${prefix}_care_4`, points: 4 },
  { label: '自宅看護（常時）', value: `${prefix}_care_4b`, points: 4 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '地震・火災・風水害等', value: `${prefix}_disaster_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '就労・就学は、勤務形態・勤務日数・勤務時間数の3つの点数が合算されます',
    inputType: 'select',
    options: [
      { label: '就労・就学', value: `${prefix}_reason_emptype`, points: 0 },
      { label: '不在（未婚・離婚・行方不明・死亡等）', value: `${prefix}_reason_absence`, points: 0 },
      { label: '内定・求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '療養（疾病・負傷）', value: `${prefix}_reason_illness`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病人看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_emptype`,
      category,
      label: `${parentLabel}の勤務形態は？`,
      inputType: 'radio',
      options: employmentTypeOptions(prefix),
    },
    {
      id: `${prefix}_days`,
      category,
      // 「就労・就学」を選んだときだけ表示する（勤務形態とは別に加算される項目）
      showFor: ['emptype'],
      label: `${parentLabel}の勤務日数（就学も含む）は？`,
      inputType: 'radio',
      options: workDaysOptions(prefix),
    },
    {
      id: `${prefix}_hours`,
      category,
      showFor: ['emptype'],
      label: `${parentLabel}の勤務時間数（就学も含む）は？`,
      inputType: 'radio',
      options: workHoursOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不在の状態ですか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の内定・求職の状況は？`,
      helpText: '内定は就労予定条件に応じて勤務形態・日数・時間数の指数が準用され、4〜10点となります',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の療養の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText:
      '離婚・死別・未婚により片親しかいない状態の世帯が対象です。離婚を前提とした別居は、離婚が成立していなければ入所時の加点は適用されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任等により片親が常時自宅にいませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が希望保育所に入所中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育休明け・産休明けで職場復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園を希望する事情がありますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_transfer_no', points: 0 },
      { label: '閉園に伴う転園（統廃合に伴う場合を除く）', value: 'adj_transfer_3', points: 3 },
      { label: '転入に伴う転園', value: 'adj_transfer_2', points: 2 },
    ],
  },
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '2歳児または3歳児クラスで卒園となる認可保育所等を卒園しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: 'はい', value: 'adj_graduation_yes', points: 2 },
    ],
  },
  {
    id: 'adj_urgent',
    category: 'adjustment',
    label: '児童福祉の観点から緊急に保育の実施が必要と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_urgent_no', points: 0 },
      { label: 'はい', value: 'adj_urgent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が山陽小野田市内の保育所等で保育士として勤務していますか？',
    helpText: '勤務予定の場合も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母（65歳未満）が就労等していませんか？',
    helpText:
      '世帯分離をしていても、住民票上で同住所にいる者は同居とされます。住宅地図などで別棟であることが確認できれば別居となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の滞納等があり、納付の意思が認められませんか？',
    helpText: '滞納保育料の分納誓約を交わし、児童手当からの充当申出書の提出があれば、納付の意思があるものとされます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -10 },
    ],
  },
  {
    id: 'adj_false_application',
    category: 'adjustment',
    label: '虚偽の申請や、就労状況の変化を申告せずに入所を継続していたことが判明していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_false_application_no', points: 0 },
      { label: 'はい', value: 'adj_false_application_yes', points: -5 },
    ],
  },
  {
    id: 'adj_family_workplace',
    category: 'adjustment',
    label: '勤務先が父母の実家ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_workplace_no', points: 0 },
      { label: 'はい', value: 'adj_family_workplace_yes', points: -3 },
    ],
  },
];

export const sanyoonodaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
