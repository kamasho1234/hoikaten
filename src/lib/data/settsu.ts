import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 摂津市 保育施設利用調整基準（基本指数・調整指数）データ
//
// 出典: 摂津市こども家庭部保育教育課「令和8年度 摂津市保育所等入所案内」P33-P34
//       「25．摂津市保育施設利用調整基準」（令和7年9月1日版）
//       https://www.city.settsu.osaka.jp/material/files/group/2/R8nyuusyoannai.pdf
//       （摂津市Webサイト「令和8年度保育所等入所申込について」
//         https://www.city.settsu.osaka.jp/soshiki/kodomokateibu/hoikukyouikuka/hoikuennyusho/25723.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//
// 計算方式: min方式。原典の「1 基本指数（父母又は養育者の状況（もっとも指数の低い者で算定））」による。
//
// 質問に含めていない原典の項目:
//   摂津市は「以下のとおり基準を設け、①から順番に利用調整します」として、指数表による調整の前に
//   次の優先枠を置いている（点数ではなく順位）。
//   ①産休・育休明け保育所等入所予約で内定した児童（4月入所かつ0歳児のみ）
//   ②卒園児の受入れに関する施設間の連携協定に基づく転園
//   ③障害児等加配が必要な児童
//   ④入所中の施設に上のクラスがなく転園しなければならない児童（4月入所のみ）
//   ⑤市内又は市外の保育施設で勤務する（または勤務予定の）保育士の保護者がいる児童
//   ⑥里親に養育されている児童
//   ⑦上記以外の児童 → 以下の利用調整指数表で調整
//   また基本指数23・調整指数22の「前各号に準じると認められるとき」は点数の定めがない。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'settsu',
  name: '摂津市',
  slug: 'settsu',
  prefecture: '大阪府',
  maxBasePoints: 12, // もっとも指数の低い者で算定するため、世帯の基本指数は最大12点（災害復旧）
  scoringMethod: 'min',
} as const;

// ---------------------------------------------------------------------------
// 1 基本指数（父母又は養育者の状況）。もっとも指数の低い者で算定される
// ---------------------------------------------------------------------------

/** 就労（会社等勤務・自営業等／内職等） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '会社等勤務・自営業等：月160時間以上の勤務時間', value: `${prefix}_employment_10`, points: 10 },
  {
    label: '会社等勤務・自営業等：月140時間以上月160時間未満の勤務時間',
    value: `${prefix}_employment_9`,
    points: 9,
  },
  {
    label: '会社等勤務・自営業等：月120時間以上月140時間未満の勤務時間',
    value: `${prefix}_employment_8`,
    points: 8,
  },
  {
    label: '会社等勤務・自営業等：月100時間以上月120時間未満の勤務時間',
    value: `${prefix}_employment_7`,
    points: 7,
  },
  {
    label: '会社等勤務・自営業等：月64時間以上月100時間未満の勤務時間',
    value: `${prefix}_employment_6`,
    points: 6,
  },
  { label: '内職等：月160時間以上従事', value: `${prefix}_employment_naishoku_5`, points: 5 },
  { label: '内職等：月120時間以上月160時間未満従事', value: `${prefix}_employment_naishoku_4`, points: 4 },
  { label: '内職等：月64時間以上月120時間未満従事', value: `${prefix}_employment_naishoku_3`, points: 3 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産または出産予定日の前後各8週間（多胎妊娠は出産前14週間、出産後8週間）以内',
    value: `${prefix}_childbirth_8`,
    points: 8,
  },
];

/** 病気・怪我 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または常時病臥・絶対安静', value: `${prefix}_illness_10`, points: 10 },
  { label: '安静（子の保育ができない）', value: `${prefix}_illness_9`, points: 9 },
  { label: '療養（子の保育に支障がある）', value: `${prefix}_illness_8`, points: 8 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1級・2級、精神1級、療育Aまたは同程度', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3級・4級、精神2級、療育B1または同程度', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体5級・6級、精神3級、療育B2または同程度', value: `${prefix}_disability_6`, points: 6 },
];

/** 同居親族の常時介護又は看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居親族の常時介護または看護', value: `${prefix}_care_8`, points: 8 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災等の復旧活動', value: `${prefix}_disaster_12`, points: 12 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定先がある場合', value: `${prefix}_jobseeking_2`, points: 2 },
  { label: '内定先がない場合', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** 学校又は職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月140時間以上通学', value: `${prefix}_education_9`, points: 9 },
  { label: '月120時間以上月140時間未満通学', value: `${prefix}_education_7`, points: 7 },
  { label: '月64時間以上月120時間未満の通学', value: `${prefix}_education_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '摂津市の基本指数は、父母又は養育者のうちもっとも指数の低い者で算定されます',
    inputType: 'select',
    options: [
      { label: '就労（会社等勤務・自営業等・内職等）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・怪我', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧活動', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校または職業訓練', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の勤務時間は？`,
      helpText: '会社等勤務には在宅勤務を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
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
      label: `${parentLabel}の病気・怪我の状況は？`,
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
      label: `${parentLabel}は同居親族を常時介護・看護していますか？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧活動をしていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の通学の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2 調整指数（加点・減点事由）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業中で、入所が決まり次第に職場復帰できますか？',
    helpText:
      '4月入所希望者については申込締切日の翌日から3月までの復帰者を含みます。産前産後休業・育児休業を取得している職場へ復職せず、退職・転職する場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいで同時に市内保育施設へ入所申込みをしますか？',
    helpText: '双子以上の多胎児の場合は2点（三つ子以上は一人増えるごとに1点加算）です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（きょうだい2人以上の同時申込み）', value: 'adj_sibling_simultaneous_1', points: 1 },
      { label: 'はい（双子以上の多胎児の同時申込み）', value: 'adj_sibling_simultaneous_2', points: 2 },
      { label: 'はい（三つ子の同時申込み）', value: 'adj_sibling_simultaneous_3', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいの在園状況にあてはまるものは？',
    helpText: 'いずれか1つのみが適用されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      {
        label: 'きょうだいが既に在園している施設と同じ施設を希望する（申込児童のクラス年齢がない場合を含む）',
        value: 'adj_sibling_enrolled_same',
        points: 3,
      },
      {
        label: '上のクラスがなく転園しなければならない園児の弟または妹が保育施設を希望する',
        value: 'adj_sibling_enrolled_younger',
        points: 3,
      },
      {
        label: 'きょうだいが別々の保育施設に通っており、同じ施設への転園を希望する',
        value: 'adj_sibling_enrolled_unify',
        points: 3,
      },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '第3子以降の児童ですか？',
    helpText: '第4子以降は一人増えるごとに1点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい（第3子）', value: 'adj_third_child_2', points: 2 },
      { label: 'はい（第4子以降）', value: 'adj_third_child_3', points: 3 },
    ],
  },
  {
    id: 'adj_transfer_in',
    category: 'adjustment',
    label: '転入者・転入予定者で、前月まで転出地の保育施設に入っていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_in_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_in_yes', points: 6 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '待機中に認可外保育施設等を利用していますか？',
    helpText:
      '就労・就学・病気・介護・看護のために、月16日以上（週4日以上）かつ月64時間以上利用している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 4 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭、またはそれに準ずる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母のいずれかが年間200日以上、単身赴任の状態ですか？',
    helpText: '勤務先による証明がある場合のみ適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護の受給世帯ですか？',
    helpText: '就労による自立支援につながる場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '当該児童を含む同居家族が障害を有していますか？',
    helpText:
      '障害者手帳等が提出できる場合のみが対象です。保育を必要とする事由が保護者の病気または障害の場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_no', points: 0 },
      {
        label: 'はい（身体1級・2級、精神1級、療育A、特別児童扶養手当1級）',
        value: 'adj_family_disability_2',
        points: 2,
      },
      { label: 'はい（上記手帳・手当のその他の区分）', value: 'adj_family_disability_1', points: 1 },
    ],
  },
  {
    id: 'adj_kodomoen_change',
    category: 'adjustment',
    label: '認定こども園に入所中の1号認定児童が、同一施設の2号認定枠を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kodomoen_change_no', points: 0 },
      { label: 'はい', value: 'adj_kodomoen_change_yes', points: 1 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '当初利用希望日からの待機継続期間が1年以上ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい', value: 'adj_waiting_yes', points: 1 },
    ],
  },
  {
    id: 'adj_other_adult',
    category: 'adjustment',
    label: '保護者以外の18歳以上65歳未満の同居者が求職活動中、または保育要件書類が未提出ですか？',
    helpText: '月64時間未満の就労者を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_adult_no', points: 0 },
      { label: 'はい', value: 'adj_other_adult_yes', points: -2 },
    ],
  },
  {
    id: 'adj_unapplied_child',
    category: 'adjustment',
    label: '保育施設へ申込をしていない就学前の児童がいますか？',
    helpText: '希望施設の月齢に達していない場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unapplied_child_no', points: 0 },
      { label: 'はい', value: 'adj_unapplied_child_yes', points: -3 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料等の滞納がありますか？',
    helpText: '正当な理由（被災等）なく滞納している世帯が対象です',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_arrears_no', points: 0 },
      {
        label: '2か月以下の滞納、または3か月以上だが3年以内での完納となる額での児童手当の充当に同意している',
        value: 'adj_arrears_1',
        points: -1,
      },
      { label: '3か月以上の滞納がある', value: 'adj_arrears_20', points: -20 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '申込年度内に、本人の責めに帰す理由で入所内定を辞退しましたか？',
    helpText: '会社都合による職場復帰の延長や健康診断で入所不可となった場合等は対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -3 },
    ],
  },
];

export const settsuData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
