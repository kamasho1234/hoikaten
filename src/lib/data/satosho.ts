import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 里庄町 保育園入園 利用調整基準データ
// 出典: 里庄町「令和8年度保育所等入所選考基準表（令和7年4月1日改正）」
// https://www.town.satosho.okayama.jp/uploaded/attachment/9829.pdf
// -------------------------------------------------------------------------
// 里庄町は基本点数表の備考に父母の合わせ方が書かれている。
//   「1 父母が複数の事由に該当する場合は、各々について基本点数の高い方の事由を採用する。」
//   「2 父母各々の基本点数の合算を、利用申込み児童の基本点数とする。」
// 父母各々の合算なので scoringMethod は 'sum'。基本点数の最大は1人あたり10点。
//
// 4「同居親族等の介護・看護」と 7「就学」は点数欄が「区分1のうち外勤を準用」、
// 6「求職活動（内定）」は「区分1を準用」なので、それぞれ就労の刻みを使っている。
//
// 原典で点数の代わりに「※」（当該児童及び世帯の状況に応じて別途判断する）と
// 書かれている項目は入れていない。
// - 8 虐待・DV「児童虐待やDVのおそれがある場合」
// - 10 その他「上記以外で、明らかに保育することができないと認められる場合」
// 同じ内容が調整点数の区分4（+10）にあるので、虐待・DVはそちらで表している。
//
// いま園を利用している方の話は入れていない。
// - 基本点数9「育児休業（既に保育所等を利用している子どもの継続利用）」（3点）
// - 調整点数8「現在利用している保育所等の利用継続を希望する場合」（0〜4歳3点／5歳7点）
// - 調整点数11「年度途中において他の保育所等への転園を希望する場合」（−10）
//
// 原典の「区分9と重複して加算しない」「区分15と重複しない」に従って、
// 重ならない組み合わせは1つの設問にまとめている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'satosho',
  name: '里庄町',
  slug: 'satosho',
  prefecture: '岡山県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

// 1 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働（外勤・居宅外自営）：週40時間以上の就労', value: `${prefix}_employment_0`, points: 10 },
  { label: '居宅外労働（外勤・居宅外自営）：週35時間以上の就労', value: `${prefix}_employment_1`, points: 9 },
  { label: '居宅内労働（居宅内自営・農業）：週40時間以上の就労', value: `${prefix}_employment_2`, points: 9 },
  { label: '居宅外労働（外勤・居宅外自営）：週30時間以上の就労', value: `${prefix}_employment_3`, points: 8 },
  { label: '居宅内労働（居宅内自営・農業）：週35時間以上の就労', value: `${prefix}_employment_4`, points: 8 },
  { label: '居宅外労働（外勤・居宅外自営）：週25時間以上の就労', value: `${prefix}_employment_5`, points: 7 },
  { label: '居宅内労働（居宅内自営・農業）：週30時間以上の就労', value: `${prefix}_employment_6`, points: 7 },
  { label: '居宅外労働（外勤・居宅外自営）：週20時間以上の就労', value: `${prefix}_employment_7`, points: 6 },
  { label: '居宅内労働（居宅内自営・農業）：週25時間以上の就労', value: `${prefix}_employment_8`, points: 6 },
  { label: '居宅内労働（居宅内自営・農業）：週20時間以上の就労', value: `${prefix}_employment_9`, points: 5 },
  { label: '内職：週30時間以上の就労', value: `${prefix}_employment_10`, points: 5 },
  { label: '居宅外労働（外勤・居宅外自営）：週12時間以上の就労', value: `${prefix}_employment_11`, points: 4 },
  { label: '内職：週20時間以上の就労', value: `${prefix}_employment_12`, points: 4 },
  { label: '居宅内労働（居宅内自営・農業）：週12時間以上の就労', value: `${prefix}_employment_13`, points: 3 },
  { label: '内職：週12時間以上の就労', value: `${prefix}_employment_14`, points: 2 },
];

// 2 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の2か月前から出産後2か月', value: `${prefix}_childbirth_0`, points: 6 },
];

// 3 保護者の疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：1か月以上の入院または入院見込み、常時臥床の場合', value: `${prefix}_illness_0`, points: 10 },
  { label: '障害：「身体障害者手帳1〜2級所持」「聴覚障害者1〜3級所持」「精神障害者保健福祉手帳所持」「療育手帳A所持」「介護保険の要介護度が3〜5」のいずれかに該当', value: `${prefix}_illness_1`, points: 10 },
  { label: '疾病（居宅内療養1か月以上）：安静を要すると診断された場合または日常生活動作に支障を来している場合', value: `${prefix}_illness_2`, points: 8 },
  { label: '障害：「身体障害者手帳3級所持」「聴覚障害者4級所持」「療育手帳B所持」「介護保険の要介護度が1〜2」のいずれかに該当', value: `${prefix}_illness_3`, points: 6 },
  { label: '疾病（居宅内療養1か月以上）：上記以外で通院加療が必要な場合', value: `${prefix}_illness_4`, points: 3 },
  { label: '障害：「身体障害者手帳4〜6級所持」「介護保険の要介護度が要支援」のいずれかに該当', value: `${prefix}_illness_5`, points: 3 },
];

// 4 同居親族等の介護・看護（区分1のうち外勤を準用）
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週40時間以上の介護・看護', value: `${prefix}_care_0`, points: 10 },
  { label: '週35時間以上の介護・看護', value: `${prefix}_care_1`, points: 9 },
  { label: '週30時間以上の介護・看護', value: `${prefix}_care_2`, points: 8 },
  { label: '週25時間以上の介護・看護', value: `${prefix}_care_3`, points: 7 },
  { label: '週20時間以上の介護・看護', value: `${prefix}_care_4`, points: 6 },
  { label: '週12時間以上の介護・看護', value: `${prefix}_care_5`, points: 4 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害復旧のため保育することができない場合', value: `${prefix}_disaster_0`, points: 10 },
];

// 6 求職活動（起業準備含む）
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定（居宅外労働・外勤等）：週40時間以上の就労予定', value: `${prefix}_jobseeking_0`, points: 10 },
  { label: '内定（居宅外労働・外勤等）：週35時間以上の就労予定', value: `${prefix}_jobseeking_1`, points: 9 },
  { label: '内定（居宅内労働・自営等）：週40時間以上の就労予定', value: `${prefix}_jobseeking_2`, points: 9 },
  { label: '内定（居宅外労働・外勤等）：週30時間以上の就労予定', value: `${prefix}_jobseeking_3`, points: 8 },
  { label: '内定（居宅内労働・自営等）：週35時間以上の就労予定', value: `${prefix}_jobseeking_4`, points: 8 },
  { label: '内定（居宅外労働・外勤等）：週25時間以上の就労予定', value: `${prefix}_jobseeking_5`, points: 7 },
  { label: '内定（居宅内労働・自営等）：週30時間以上の就労予定', value: `${prefix}_jobseeking_6`, points: 7 },
  { label: '内定（居宅外労働・外勤等）：週20時間以上の就労予定', value: `${prefix}_jobseeking_7`, points: 6 },
  { label: '内定（居宅内労働・自営等）：週25時間以上の就労予定', value: `${prefix}_jobseeking_8`, points: 6 },
  { label: '内定（居宅内労働・自営等）：週20時間以上の就労予定', value: `${prefix}_jobseeking_9`, points: 5 },
  { label: '内定（居宅外労働・外勤等）：週12時間以上の就労予定', value: `${prefix}_jobseeking_10`, points: 4 },
  { label: '内定（居宅内労働・自営等）：週12時間以上の就労予定', value: `${prefix}_jobseeking_11`, points: 3 },
  { label: '未定：求職活動または起業準備のため保育することができない場合', value: `${prefix}_jobseeking_12`, points: 1 },
];

// 7 就学（区分1のうち外勤を準用）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '週40時間以上の就学・技能習得等', value: `${prefix}_school_0`, points: 10 },
  { label: '週35時間以上の就学・技能習得等', value: `${prefix}_school_1`, points: 9 },
  { label: '週30時間以上の就学・技能習得等', value: `${prefix}_school_2`, points: 8 },
  { label: '週25時間以上の就学・技能習得等', value: `${prefix}_school_3`, points: 7 },
  { label: '週20時間以上の就学・技能習得等', value: `${prefix}_school_4`, points: 6 },
  { label: '週12時間以上の就学・技能習得等', value: `${prefix}_school_5`, points: 4 },
];

// 10 その他（不存在）
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '不存在（死亡、離婚、行方不明、別居（離婚調停もしくは裁判中に限る）、拘禁等）', value: `${prefix}_absent_0`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母各々の基本点数の合算が利用申込み児童の基本点数になります',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族等の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動（起業準備含む）', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: 'その他（不存在）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間は休憩時間を含み、残業時間・通勤時間を含みません',
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
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族等の介護・看護の状況は？`,
      helpText: '施設への送迎をし、かつ付添介護のために保育できない場合、または重度身体障害者、寝たきり高齢者等の介護を常態とする場合が対象です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧のため保育することができませんか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・技能習得の状況は？`,
      helpText: '教習所は除きます',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整点数（同時に複数該当する場合は、該当するものすべてを加減算する）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_parent_1', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_1', points: 2 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployed_1', points: 1 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: '児童虐待やDV等により社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_dv_1', points: 10 },
    ],
  },
  {
    id: 'adj_frequent_visit',
    category: 'adjustment',
    label: '保護者の疾病の程度が週3回以上の通院を必要としますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_frequent_visit_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_frequent_visit_1', points: 1 },
    ],
  },
  {
    id: 'adj_correspondence',
    category: 'adjustment',
    label: '通信制大学、通信教育の学生ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_correspondence_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_correspondence_1', points: -3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の65歳未満の祖父母が無職、求職中または月48時間以上の就労をしていませんか？',
    helpText: '疾病・介護等で保育にあたることができない場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_grandparent_1', points: -10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の利用についてあてはまるものは？',
    helpText: '原典ではこの2つは重複して加算しません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '兄弟姉妹がすでに保育所等を利用しており、同一の保育所等の利用を希望する（+4）', value: 'adj_sibling_1', points: 4 },
      { label: '兄弟姉妹が同一の保育所等の利用を希望する（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '小規模保育事業などの地域型保育事業の卒園者ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_chiikigata_1', points: 4 },
    ],
  },
  {
    id: 'adj_reentry',
    category: 'adjustment',
    label: '産前・産後休暇または育児休業取得時に保育所等を退所した児童が、保護者の復職時に、退所した保育所等への利用申込みをしますか？',
    helpText: '育児休業の対象になった弟妹が同時に利用申込みをする場合はその弟妹を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reentry_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_reentry_1', points: 10 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '産前産後休業または育児休業後に職場復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_return_to_work_1', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士または保育教諭として勤務しますか？（内定含む）',
    helpText: '原典ではこの2つは重複しません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: '町内保育所等で勤務する（+20）', value: 'adj_hoikushi_1', points: 20 },
      { label: '保育所等で勤務する（+5）', value: 'adj_hoikushi_2', points: 5 },
    ],
  },
  {
    id: 'adj_nurse',
    category: 'adjustment',
    label: '保護者が看護師または保育補助者等（子育て支援員等）として町内保育所等で勤務しますか？（内定含む）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nurse_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_nurse_1', points: 10 },
    ],
  },
  {
    id: 'adj_start_unknown',
    category: 'adjustment',
    label: '就労内定のうち、就労開始時期が未定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_start_unknown_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_start_unknown_1', points: -3 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '未納の保育料が6か月以上あり、かつ納付の相談がない、または未納保育料の納付約束を履行していませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_fee_delinquent_1', points: -10 },
    ],
  },
  {
    id: 'adj_outside_town',
    category: 'adjustment',
    label: '町外在住者ですか？',
    helpText: '保護者の単身赴任等正当な理由がある場合または転入予定者は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_town_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_outside_town_1', points: -10 },
    ],
  },
];

export const satoshoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
