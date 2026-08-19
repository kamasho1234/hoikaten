import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// あきる野市 利用調整基準表（基準点数表・利用調整表）データ
//
// 出典: あきる野市こども家庭部保育課「令和8年度 保育施設入所のしおり」P12-P13
//       「利用調整基準表」（令和7年10月発行）
//       https://www.city.akiruno.tokyo.jp/cmsfiles/contents/0000006/6055/R8.pdf
//       （あきる野市Webサイト「保育施設の申込みについて」
//         https://www.city.akiruno.tokyo.jp/0000006055.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             あきる野市は基準点数が50〜110点の体系で、旧データ（10点満点系）とは桁が異なる。
//
// 原典の備考:
//   「保護者（父母）それぞれの基準点数を合算し、調整点数を加算して得た点数及び
//     当該保護者が利用を希望する保育所等の希望順位を考慮する」
//   就労の「内定」は「就労予定日数及び時間を上記基準に当てはめ、基準点数をその-5点とする。
//   ただし、最低基準点数は51点とする」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'akiruno',
  name: 'あきる野市',
  slug: 'akiruno',
  prefecture: '東京都',
  maxBasePoints: 220, // 父母各110点
} as const;

// ---------------------------------------------------------------------------
// 基準点数表（保護者の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 労働（自営・内職以外） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上・1日7時間以上の就労を常態', value: `${prefix}_employment_90`, points: 90 },
  { label: '月20日以上・1日5時間以上7時間未満の就労を常態', value: `${prefix}_employment_80`, points: 80 },
  { label: '月20日以上・1日4時間以上5時間未満の就労を常態', value: `${prefix}_employment_70`, points: 70 },
  { label: '月16日以上20日未満・1日7時間以上の就労を常態', value: `${prefix}_employment_85`, points: 85 },
  { label: '月16日以上20日未満・1日5時間以上7時間未満の就労を常態', value: `${prefix}_employment_75`, points: 75 },
  { label: '月16日以上20日未満・1日4時間以上5時間未満の就労を常態', value: `${prefix}_employment_65`, points: 65 },
  { label: '月12日以上16日未満・1日7時間以上の就労を常態', value: `${prefix}_employment_80b`, points: 80 },
  { label: '月12日以上16日未満・1日5時間以上7時間未満の就労を常態', value: `${prefix}_employment_70b`, points: 70 },
  { label: '月12日以上16日未満・1日4時間以上5時間未満の就労を常態', value: `${prefix}_employment_60`, points: 60 },
];

/** 自営（中心者・協力者） */
const selfEmployedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_self_none`, points: 0 },
  { label: '中心者：月20日以上・1日7時間以上の就労を常態', value: `${prefix}_self_90`, points: 90 },
  { label: '中心者：月20日以上・1日5時間以上7時間未満の就労を常態', value: `${prefix}_self_80`, points: 80 },
  { label: '中心者：月20日以上・1日4時間以上5時間未満の就労を常態', value: `${prefix}_self_70`, points: 70 },
  { label: '中心者：月16日以上20日未満・1日7時間以上の就労を常態', value: `${prefix}_self_85`, points: 85 },
  { label: '中心者：月16日以上20日未満・1日5時間以上7時間未満の就労を常態', value: `${prefix}_self_75`, points: 75 },
  { label: '中心者：月16日以上20日未満・1日4時間以上5時間未満の就労を常態', value: `${prefix}_self_65`, points: 65 },
  { label: '中心者：月12日以上16日未満・1日7時間以上の就労を常態', value: `${prefix}_self_80b`, points: 80 },
  { label: '中心者：月12日以上16日未満・1日5時間以上7時間未満の就労を常態', value: `${prefix}_self_70b`, points: 70 },
  { label: '中心者：月12日以上16日未満・1日4時間以上5時間未満の就労を常態', value: `${prefix}_self_60`, points: 60 },
  { label: '協力者：月20日以上・1日7時間以上の就労を常態', value: `${prefix}_self_help_70`, points: 70 },
  { label: '協力者：月20日以上・1日5時間以上7時間未満の就労を常態', value: `${prefix}_self_help_67`, points: 67 },
  { label: '協力者：月20日以上・1日4時間以上5時間未満の就労を常態', value: `${prefix}_self_help_64`, points: 64 },
  { label: '協力者：月16日以上20日未満・1日7時間以上の就労を常態', value: `${prefix}_self_help_67b`, points: 67 },
  {
    label: '協力者：月16日以上20日未満・1日5時間以上7時間未満の就労を常態',
    value: `${prefix}_self_help_64b`,
    points: 64,
  },
  {
    label: '協力者：月16日以上20日未満・1日4時間以上5時間未満の就労を常態',
    value: `${prefix}_self_help_61`,
    points: 61,
  },
  { label: '協力者：月12日以上16日未満・1日7時間以上の就労を常態', value: `${prefix}_self_help_64c`, points: 64 },
  {
    label: '協力者：月12日以上16日未満・1日5時間以上7時間未満の就労を常態',
    value: `${prefix}_self_help_61b`,
    points: 61,
  },
  {
    label: '協力者：月12日以上16日未満・1日4時間以上5時間未満の就労を常態',
    value: `${prefix}_self_help_58`,
    points: 58,
  },
];

/** 内職 */
const naishokuOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_naishoku_none`, points: 0 },
  { label: '月20日以上・1日7時間以上の就労を常態', value: `${prefix}_naishoku_65`, points: 65 },
  { label: '月20日以上・1日5時間以上7時間未満の就労を常態', value: `${prefix}_naishoku_62`, points: 62 },
  { label: '月20日以上・1日4時間以上5時間未満の就労を常態', value: `${prefix}_naishoku_59`, points: 59 },
  { label: '月16日以上20日未満・1日7時間以上の就労を常態', value: `${prefix}_naishoku_62b`, points: 62 },
  { label: '月16日以上20日未満・1日5時間以上7時間未満の就労を常態', value: `${prefix}_naishoku_59b`, points: 59 },
  { label: '月16日以上20日未満・1日4時間以上5時間未満の就労を常態', value: `${prefix}_naishoku_56`, points: 56 },
  { label: '月12日以上16日未満・1日7時間以上の就労を常態', value: `${prefix}_naishoku_59c`, points: 59 },
  { label: '月12日以上16日未満・1日5時間以上7時間未満の就労を常態', value: `${prefix}_naishoku_56b`, points: 56 },
  { label: '月12日以上16日未満・1日4時間以上5時間未満の就労を常態', value: `${prefix}_naishoku_53`, points: 53 },
];

/** 内定（就労予定日数・時間を基準に当てはめて-5点。最低51点） */
const naiteiOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_naitei_none`, points: 0 },
  { label: '労働：月20日以上・1日7時間以上に相当', value: `${prefix}_naitei_85`, points: 85 },
  { label: '労働：月20日以上・1日5時間以上7時間未満に相当', value: `${prefix}_naitei_75`, points: 75 },
  { label: '労働：月20日以上・1日4時間以上5時間未満に相当', value: `${prefix}_naitei_65`, points: 65 },
  { label: '労働：月16日以上20日未満・1日7時間以上に相当', value: `${prefix}_naitei_80`, points: 80 },
  { label: '労働：月12日以上16日未満・1日4時間以上5時間未満に相当', value: `${prefix}_naitei_55`, points: 55 },
  { label: '自営協力者・内職に相当（最低基準点数）', value: `${prefix}_naitei_51`, points: 51 },
];

/** 妊娠又は出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産予定月の2月前の月の初日から、出産した日を起算日として8週間を経過する日の翌日が属する月の末日まで',
    value: `${prefix}_childbirth_90`,
    points: 90,
  },
];

/** 疾病又は負傷・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（おおむね1か月以上。入院予定を含む）', value: `${prefix}_illness_90`, points: 90 },
  { label: '居宅内治療：常時病床に就いている', value: `${prefix}_illness_bed_90`, points: 90 },
  { label: '居宅内治療：精神性（精神障害者保健福祉手帳3級以上）', value: `${prefix}_illness_mental_90`, points: 90 },
  { label: '居宅内治療：精神性（上記以外の程度）', value: `${prefix}_illness_mental_80`, points: 80 },
  { label: '一般治療：安静を要する', value: `${prefix}_illness_rest_80`, points: 80 },
  { label: '一般治療：週3日程度の通院を要する', value: `${prefix}_illness_visit_70`, points: 70 },
  { label: '障害：身体障害者手帳1・2級', value: `${prefix}_illness_disability_90a`, points: 90 },
  {
    label: '障害：精神障害者保健福祉手帳3級以上、愛の手帳1・2度',
    value: `${prefix}_illness_disability_90b`,
    points: 90,
  },
  { label: '障害：身体障害者手帳3・4級、愛の手帳3度', value: `${prefix}_illness_disability_80`, points: 80 },
  { label: '障害：上記以外の場合', value: `${prefix}_illness_disability_70`, points: 70 },
];

/** 介護又は看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '自宅介護：重度障害児等の全介護', value: `${prefix}_care_90`, points: 90 },
  {
    label: '自宅介護：常時観察と介護（食事・排せつ・入浴の介護）に当たっている（全介護を除く）',
    value: `${prefix}_care_80`,
    points: 80,
  },
  { label: '自宅介護：上記以外の場合', value: `${prefix}_care_70`, points: 70 },
  { label: '施設等付添い：常時付添看（介）護に当たっている', value: `${prefix}_care_out_90`, points: 90 },
  { label: '施設等付添い：入院または週3日以上の通院等の付添い', value: `${prefix}_care_out_80`, points: 80 },
  { label: '施設等付添い：上記以外の場合', value: `${prefix}_care_out_70`, points: 70 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '災害による家屋の損傷その他災害復旧のため保育に当たることができない',
    value: `${prefix}_disaster_90`,
    points: 90,
  },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動をしている', value: `${prefix}_jobseeking_50`, points: 50 },
];

/** 在学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学している', value: `${prefix}_education_60`, points: 60 },
  { label: '職業訓練を受けている', value: `${prefix}_education_60b`, points: 60 },
];

/** 育休延長許容 */
const leaveExtensionOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leaveext_none`, points: 0 },
  {
    label: '育児休業期間の延長が可能で、希望する保育所等を利用できないときは延長が許容できる',
    value: `${prefix}_leaveext_30`,
    points: 30,
  },
];

/** 特別な事情（児童虐待・配偶者暴力・里親家庭・ひとり親家庭・その他） */
const specialOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_special_none`, points: 0 },
  {
    label: '児童虐待の防止等に関し特別な支援を要する状態（児童相談所等の機関から認められた場合）',
    value: `${prefix}_special_abuse`,
    points: 110,
  },
  { label: '配偶者からの暴力により保育を行うことが困難', value: `${prefix}_special_dv`, points: 110 },
  { label: '里親として児童の養育を受託している', value: `${prefix}_special_foster`, points: 110 },
  {
    label: 'ひとり親家庭（死亡・離婚・未婚・行方不明・拘禁による不存在）',
    value: `${prefix}_special_single`,
    points: 110,
  },
  { label: 'その他、市長が特に必要と認める場合', value: `${prefix}_special_other`, points: 110 },
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
      { label: '労働（自営・内職以外）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '自営（中心者・協力者）', value: `${prefix}_reason_self`, points: 0 },
      { label: '内職', value: `${prefix}_reason_naishoku`, points: 0 },
      { label: '就労内定', value: `${prefix}_reason_naitei`, points: 0 },
      { label: '妊娠または出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護または看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '在学・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業期間の延長を許容', value: `${prefix}_reason_leaveext`, points: 0 },
      { label: '特別な事情（虐待・DV・里親・ひとり親等）', value: `${prefix}_reason_special`, points: 0 },
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
      id: `${prefix}_self`,
      category,
      label: `${parentLabel}の自営の状況は？`,
      inputType: 'radio',
      options: selfEmployedOptions(prefix),
    },
    {
      id: `${prefix}_naishoku`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: naishokuOptions(prefix),
    },
    {
      id: `${prefix}_naitei`,
      category,
      label: `${parentLabel}の就労内定の状況は？`,
      helpText: '就労予定の日数・時間を基準に当てはめ、その基準点数から5点を引いた点数になります（最低51点）',
      inputType: 'radio',
      options: naiteiOptions(prefix),
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
      label: `${parentLabel}の疾病・負傷・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
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
      label: `${parentLabel}の在学・職業訓練の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_leaveext`,
      category,
      label: `${parentLabel}は育児休業期間の延長を許容できますか？`,
      inputType: 'radio',
      options: leaveExtensionOptions(prefix),
    },
    {
      id: `${prefix}_special`,
      category,
      label: `${parentLabel}は特別な事情にあてはまりますか？`,
      inputType: 'radio',
      options: specialOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 利用調整表
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '障害児保育の必要がある世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_both_disability',
    category: 'adjustment',
    label: '保護者の双方が障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_both_disability_no', points: 0 },
      { label: 'はい', value: 'adj_both_disability_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が保育所等を利用している、または同時に利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 5 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士・保育教諭・幼稚園教諭・放課後児童支援員として就労していますか？',
    helpText: '就労予定を含みます。市内の児童福祉施設等で就労している場合はさらに5点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（市外の施設）', value: 'adj_hoikushi_5', points: 5 },
      { label: 'はい（市内の児童福祉施設等）', value: 'adj_hoikushi_10', points: 10 },
    ],
  },
  {
    id: 'adj_nontaxable',
    category: 'adjustment',
    label: '市町村民税非課税世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nontaxable_no', points: 0 },
      { label: 'はい', value: 'adj_nontaxable_yes', points: 5 },
    ],
  },
  {
    id: 'adj_short_record',
    category: 'adjustment',
    label: '就労実績日数が基準に満たしていますか？',
    helpText:
      '満たない場合は、月12日以上16日未満の就労の基準点数から10点が引かれます（ただし引いた後の最低基準点数は50点）',
    inputType: 'radio',
    options: [
      { label: '満たしている', value: 'adj_short_record_no', points: 0 },
      { label: '満たしていない', value: 'adj_short_record_yes', points: -10 },
    ],
  },
  {
    id: 'adj_other_relative',
    category: 'adjustment',
    label: '健康で不就労の65歳未満の同居の親族等（祖父母を除く）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_relative_no', points: 0 },
      { label: 'はい', value: 'adj_other_relative_yes', points: -10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '健康で不就労の65歳未満の同居の祖父母がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -20 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '利用者負担額の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_arrears_no', points: 0 },
      { label: '3か月分以上6か月分未満', value: 'adj_arrears_20', points: -20 },
      { label: '6か月分以上12か月分未満', value: 'adj_arrears_30', points: -30 },
      { label: '12か月分以上', value: 'adj_arrears_50', points: -50 },
    ],
  },
];

export const akirunoData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
