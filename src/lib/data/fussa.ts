import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 福生市 利用調整表・調整指数データ
//
// 出典: 福生市子ども家庭部子ども育成課「利用調整表」「調整指数」
//       https://www.city.fussa.tokyo.jp/_res/projects/default_project/_page_/001/018/667/riyouchouseihyou.png
//       https://www.city.fussa.tokyo.jp/_res/projects/default_project/_page_/001/018/667/chouseishisuu.png
//       （福生市Webサイト「保育園の入園申込み」
//         https://www.city.fussa.tokyo.jp/life/child/nursery/1018667.html にページ内画像として掲載）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             基準表はPDFではなくページ内の画像として掲載されているため、画像を読み取った。
//
// 原典の備考:
//   「世帯の指数は、保護者それぞれの基本指数を合計し、該当する調整指数を加算、又は減算して決定する」
//   「保護者の基本指数を算定する際に事由が2以上ある場合は、より指数の高い事由を『保育の必要性を
//     認定する事由』とする」
//   「基本指数に調整指数を加減しても世帯の指数が同じ場合は、保護者それぞれの順位の欄の数値を合計し、
//     値が低い世帯を優先する」
//
// 質問に含めていない原典の項目（点数の定めがないもの）:
//   ・特例「市長が家庭で保育できない理由があると特に認める場合」（利用調整会議で決定）
//   ・調整指数15・16（特例扱い）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'fussa',
  name: '福生市',
  slug: 'fussa',
  prefecture: '東京都',
  maxBasePoints: 100, // 父母各50点
} as const;

// ---------------------------------------------------------------------------
// 利用調整表（基本指数）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労・内職 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  {
    label: '週5日以上：1日7時間45分以上、または週38時間45分以上の就労を常態',
    value: `${prefix}_employment_50`,
    points: 50,
  },
  {
    label: '週5日以上：1日7時間以上7時間45分未満、または週35時間以上38時間45分未満',
    value: `${prefix}_employment_48`,
    points: 48,
  },
  {
    label: '週5日以上：1日6時間以上7時間未満、または週30時間以上35時間未満',
    value: `${prefix}_employment_44`,
    points: 44,
  },
  {
    label: '週5日以上：1日5時間以上6時間未満、または週25時間以上30時間未満',
    value: `${prefix}_employment_40`,
    points: 40,
  },
  {
    label: '週5日以上：1日4時間以上5時間未満、または週20時間以上25時間未満',
    value: `${prefix}_employment_36`,
    points: 36,
  },
  { label: '週4日：1日8時間以上、または週32時間以上の就労を常態', value: `${prefix}_employment_46`, points: 46 },
  {
    label: '週4日：1日7時間以上8時間未満、または週28時間以上32時間未満',
    value: `${prefix}_employment_42`,
    points: 42,
  },
  {
    label: '週4日：1日6時間以上7時間未満、または週24時間以上28時間未満',
    value: `${prefix}_employment_38`,
    points: 38,
  },
  {
    label: '週4日：1日5時間以上6時間未満、または週20時間以上24時間未満',
    value: `${prefix}_employment_35`,
    points: 35,
  },
  {
    label: '週4日：1日4時間以上5時間未満、または週16時間以上20時間未満',
    value: `${prefix}_employment_30`,
    points: 30,
  },
  { label: '週3日：1日8時間以上、または週24時間以上の就労を常態', value: `${prefix}_employment_38b`, points: 38 },
  {
    label: '週3日：1日7時間以上8時間未満、または週21時間以上24時間未満',
    value: `${prefix}_employment_34`,
    points: 34,
  },
  {
    label: '週3日：1日6時間以上7時間未満、または週18時間以上21時間未満',
    value: `${prefix}_employment_32`,
    points: 32,
  },
  {
    label: '週3日：1日5時間以上6時間未満、または週15時間以上18時間未満',
    value: `${prefix}_employment_28`,
    points: 28,
  },
  {
    label: '週3日：1日4時間以上5時間未満、または週12時間以上15時間未満',
    value: `${prefix}_employment_26`,
    points: 26,
  },
  { label: '内職：週3日以上1日4時間以上の就労を常態', value: `${prefix}_employment_naishoku_14`, points: 14 },
];

/** 育児休業中 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  { label: '育児休業中に転園を希望する場合', value: `${prefix}_leave_26`, points: 26 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産予定日の属する月を挟んで前後2箇月の合計5箇月（多胎児の場合は合計7箇月）',
    value: `${prefix}_childbirth_46`,
    points: 46,
  },
];

/** 疾病・負傷 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中／常時臥床／感染症', value: `${prefix}_illness_50`, points: 50 },
  {
    label: '一般療養：週3日以上の診察または治療を要する通院を常態',
    value: `${prefix}_illness_38`,
    points: 38,
  },
  { label: '一般療養：週2日以上の診察または治療を要する通院を常態', value: `${prefix}_illness_32`, points: 32 },
  { label: '一般療養：週1日以上の診察または治療を要する通院を常態', value: `${prefix}_illness_26`, points: 26 },
  {
    label: '精神性：家庭生活に著しく支障をきたしている、または週1日以上の治療を要する通院を常態',
    value: `${prefix}_illness_mental_40`,
    points: 40,
  },
  { label: '精神性：月2日以上の治療を要する通院を常態', value: `${prefix}_illness_mental_34`, points: 34 },
  { label: '精神性：月1日以上の治療を要する通院を常態', value: `${prefix}_illness_mental_26`, points: 26 },
  {
    label: '上記以外の疾病または負傷により医師等が通院、加療等を要すると診断した場合',
    value: `${prefix}_illness_14`,
    points: 14,
  },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体1・2級、愛の手帳1・2度、精神1・2級、要介護4以上',
    value: `${prefix}_disability_50`,
    points: 50,
  },
  {
    label: '身体3級、愛の手帳3度、精神3級、要介護1以上3以下',
    value: `${prefix}_disability_44`,
    points: 44,
  },
  { label: '身体4級、愛の手帳4度', value: `${prefix}_disability_38`, points: 38 },
];

/** 介護・看護（1か月以上） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '在宅：身体1・2級、愛の手帳1・2度、精神1・2級、要介護4以上の方の介護',
    value: `${prefix}_care_40`,
    points: 40,
  },
  {
    label: '在宅：身体3級、愛の手帳3度、精神3級、要介護1以上3以下の方の介護',
    value: `${prefix}_care_34`,
    points: 34,
  },
  {
    label: '在宅：上記以外の在宅介護・看護により、明らかに保育を必要としていると認められる場合',
    value: `${prefix}_care_14`,
    points: 14,
  },
  {
    label: '付添：入院・通院・施設等の付き添いを週5日かつ1日4時間以上行っている',
    value: `${prefix}_care_32`,
    points: 32,
  },
  {
    label: '付添：入院・通院・施設等の付き添いを週4日かつ1日4時間以上行っている',
    value: `${prefix}_care_26`,
    points: 26,
  },
  {
    label: '付添：入院・通院・施設等の付き添いを週3日かつ1日4時間以上行っている',
    value: `${prefix}_care_22`,
    points: 22,
  },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧のため', value: `${prefix}_disaster_50`, points: 50 },
];

/** 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動を継続的に行っている', value: `${prefix}_jobseeking_6`, points: 6 },
];

/** 就学・職業訓練（通学・職業訓練は就労を準用、通信は10点） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '通学・職業訓練：週5日以上・1日7時間45分以上に相当', value: `${prefix}_education_50`, points: 50 },
  { label: '通学・職業訓練：週5日以上・1日6時間以上7時間未満に相当', value: `${prefix}_education_44`, points: 44 },
  { label: '通学・職業訓練：週4日・1日6時間以上7時間未満に相当', value: `${prefix}_education_38`, points: 38 },
  { label: '通学・職業訓練：週3日・1日4時間以上5時間未満に相当', value: `${prefix}_education_26`, points: 26 },
  { label: '通信：通信教育で1箇月以上就学する場合', value: `${prefix}_education_10`, points: 10 },
];

/** 要支援家庭 */
const supportOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_support_none`, points: 0 },
  {
    label: '児童の安全のために、適切な保育が必要である特別の事情がある場合',
    value: `${prefix}_support_50`,
    points: 50,
  },
];

/** 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡・離婚・未婚・行方不明・拘禁等', value: `${prefix}_absence_50`, points: 50 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '事由が2つ以上ある場合は、より指数の高い事由が「保育の必要性を認定する事由」となります',
    inputType: 'select',
    options: [
      { label: '就労（内職を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_leave`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '要支援家庭', value: `${prefix}_reason_support`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}は育児休業中に転園を希望しますか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷の状況は？`,
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
      helpText: '1か月以上の介護・看護が対象です',
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
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      helpText:
        '学校教育法に定める学校等へ1箇月以上通学する場合、職業訓練施設等へ1箇月以上通所する場合は就労の指数が準用されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_support`,
      category,
      label: `${parentLabel}は要支援家庭にあてはまりますか？`,
      inputType: 'radio',
      options: supportOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在の状態ですか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が同一の保育所等を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待またはDVのおそれがあるなど、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '単身赴任またはひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業（産前産後の休業を含む）から、入所した月の翌月初日までに復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '小学校就学前の多胎児がいる世帯が、保育所等の利用を希望しますか？',
    helpText: '多胎児以外の子どもに係る保育所等の利用を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯、または生計中心者の失業により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ninsho',
    category: 'adjustment',
    label: '認証保育所等に通所しており、保育を必要とする事由に該当しますか？',
    helpText:
      '「認証保育所等」とは認証保育所、ベビーシッター利用支援事業（申込時点で福生市民の方のみ）、聖愛幼稚園ナーサリールーム（申込時点で福生市民の方のみ）が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninsho_no', points: 0 },
      { label: 'はい', value: 'adj_ninsho_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '保育所等を利用する子どもが障害を有していますか？',
    helpText:
      '利用する子どもの18歳未満の兄弟姉妹（当該年度中において18歳に達する者を含む）が障害を有する場合も対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 10 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が市内の幼児教育・保育施設等に勤務していますか？',
    helpText:
      '市長が別に定めるものが対象で、市内の保育所等（15園）、幼稚園（4園）およびリトルベアインターナショナルスクールの計20施設が対象となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '無職または無職相当の同居の65歳未満の祖父母・祖母がいますか？',
    helpText: '当該年度中において65歳に達する者を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '市に納める保育料の未納が3箇月以上ありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -10 },
    ],
  },
  {
    id: 'adj_planned_work',
    category: 'adjustment',
    label: '就労予定ですか？',
    helpText: '産前産後の休業、育児休業からの復職予定である場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_planned_work_no', points: 0 },
      { label: 'はい', value: 'adj_planned_work_yes', points: -8 },
    ],
  },
  {
    id: 'adj_jobseeking_proof',
    category: 'adjustment',
    label: '求職活動を継続的に行っていることを示す書類を提示できますか？',
    inputType: 'radio',
    options: [
      { label: '提示できる、または求職活動をしていない', value: 'adj_jobseeking_proof_ok', points: 0 },
      { label: '提示できない', value: 'adj_jobseeking_proof_ng', points: -1 },
    ],
  },
  {
    id: 'adj_self_help',
    category: 'adjustment',
    label: '自営協力者ですか？',
    helpText: '継続して給与の支払を受けていることが確認できる場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_self_help_no', points: 0 },
      { label: 'はい', value: 'adj_self_help_yes', points: -6 },
    ],
  },
];

export const fussaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
