import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 日立市 保育園等 利用調整に関する基準（基準指数・調整指数）データ
//
// 出典: 日立市こども未来部子ども施設課「令和8年度 第2版 保育園・認定こども園(保育部分)
//       家庭的保育利用についてのご案内」第8章 利用調整に関する基準（5〜6ページ）
//       https://www.city.hitachi.lg.jp/_res/projects/default_project/_page_/001/001/988/0804annnai.pdf
//       （日立市Webサイト「保育園等の申込みの流れ」
//         https://www.city.hitachi.lg.jp/kosodateoen/mokuteki_sagasu/1007349/1001986/1001988.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基準指数は保護者ごとに最大40点で、旧データ（父母各20点）とは体系が異なる。
//
// 数値化しない規定（範囲指定・優先順位のため質問には含めない）:
//   基準指数 No.10 その他「1〜40」上記以外で明らかに保育に当たれない場合
//   利用調整指数が同点の場合の優先順位（世帯の状況を1から順に比較）:
//     1 日立市在住者／2 同居者なしの母子・父子世帯、生活保護世帯／3 基準指数が高い者／
//     4 同世帯に障害者がいる場合／5 既に兄弟姉妹が保育園等に入所しており、同じ保育園等となる場合／
//     6 養育している未就学児の人数が多い者／7 直近の市民税所得割額の低い世帯（同額の場合は収入の低い世帯を優先）／
//     8 証明書等提出書類が全て提出されている者
//   調整指数 No.25 保育料等が滞納となっている世帯で、納付の督促等に対して誠意ある対応が
//     見られない等の場合「滞納月×-2」
//
// 原典の注記:
//   基準指数No.7（就学・職業訓練）は No.1（就労）を準用する
//   調整指数No.11〜12 はそれぞれ重複して加算しない
//   調整指数No.23〜25 は複数該当する場合、重複して減算する
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hitachi',
  name: '日立市',
  slug: 'hitachi',
  prefecture: '茨城県',
  maxBasePoints: 80, // 基準指数は保護者ごとに最大40点、父母合計で80点
} as const;

// ---------------------------------------------------------------------------
// 1 基準指数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** No.1 就労（内定）。月64時間以上が対象。No.7 就学・職業訓練もこの表を準用する */
const employmentOptions = (prefix: string, key: string) => [
  { label: 'あてはまらない', value: `${prefix}_${key}_none`, points: 0 },
  { label: '月20日以上、1日8時間以上を常態', value: `${prefix}_${key}_30`, points: 30 },
  { label: '月20日以上、1日6時間以上8時間未満を常態', value: `${prefix}_${key}_28a`, points: 28 },
  { label: '月20日以上、1日4時間以上6時間未満を常態', value: `${prefix}_${key}_26a`, points: 26 },
  { label: '月20日以上、1日4時間未満を常態', value: `${prefix}_${key}_24a`, points: 24 },
  { label: '月16日以上、1日8時間以上を常態', value: `${prefix}_${key}_28b`, points: 28 },
  { label: '月16日以上、1日6時間以上8時間未満を常態', value: `${prefix}_${key}_26b`, points: 26 },
  { label: '月16日以上、1日4時間以上6時間未満を常態', value: `${prefix}_${key}_24b`, points: 24 },
  { label: '月16日以上、1日4時間未満を常態', value: `${prefix}_${key}_22`, points: 22 },
  { label: '月12日以上、1日6時間以上を常態', value: `${prefix}_${key}_20`, points: 20 },
  { label: '月12日以上、1日6時間未満を常態', value: `${prefix}_${key}_18`, points: 18 },
  { label: '月8日以上、1日8時間以上を常態', value: `${prefix}_${key}_15`, points: 15 },
  { label: '上記以外', value: `${prefix}_${key}_12`, points: 12 },
];

/** No.2 妊娠出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前産後', value: `${prefix}_childbirth_30`, points: 30 },
];

/** No.3 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院している（入院予定を含む）', value: `${prefix}_illness_30a`, points: 30 },
  { label: '常時病臥', value: `${prefix}_illness_30b`, points: 30 },
  { label: '安静を要する', value: `${prefix}_illness_26`, points: 26 },
  { label: '通院を要する', value: `${prefix}_illness_20`, points: 20 },
];

/** No.3 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障害者手帳1・2級、療育手帳A〜B、精神障害者保健福祉手帳1・2級',
    value: `${prefix}_disability_30`,
    points: 30,
  },
  {
    label: '身体障害者手帳3級、療育手帳C、精神障害者保健福祉手帳3級',
    value: `${prefix}_disability_26`,
    points: 26,
  },
  { label: '身体障害者手帳4級以下', value: `${prefix}_disability_20`, points: 20 },
];

/** No.4 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '居宅外：週5日以上、日中週40時間以上（重度心身障害者等）の介護を常態',
    value: `${prefix}_care_30a`,
    points: 30,
  },
  {
    label: '居宅外：週5日以上、日中週30時間以上の介護を常態',
    value: `${prefix}_care_28`,
    points: 28,
  },
  {
    label: '居宅外：週4日以上、日中週16時間以上の介護を常態',
    value: `${prefix}_care_24`,
    points: 24,
  },
  {
    label: '居宅内：全介護を必要とする（重度身体障害者、要介護認定3・4・5程度）',
    value: `${prefix}_care_30b`,
    points: 30,
  },
  {
    label: '居宅内：一部介護を必要とする（要介護認定1・2程度）',
    value: `${prefix}_care_26`,
    points: 26,
  },
  { label: '居宅内：支援を必要とする（要支援）', value: `${prefix}_care_20`, points: 20 },
];

/** No.5 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災、風水害、火災、その他の災害の復旧に当たっている',
    value: `${prefix}_disaster_40`,
    points: 40,
  },
];

/** No.6 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備等を含む）', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** No.8 虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '児童虐待防止法第2条または配偶者暴力防止法第1条の対象者と認められる',
    value: `${prefix}_abuse_40`,
    points: 40,
  },
];

/** No.9 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡・離婚・行方不明・拘禁等', value: `${prefix}_absence_40`, points: 40 },
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
      { label: '就労（内定を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '月64時間以上の常態的な就労が対象です。就労内定も含みます',
      inputType: 'radio',
      options: employmentOptions(prefix, 'employment'),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は産前産後ですか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
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
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・技能習得の状況は？`,
      helpText: '既に日中外出を常態としている場合、または内定している場合。就労の区分を準用します',
      inputType: 'radio',
      options: employmentOptions(prefix, 'education'),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVの対象者と認められますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在に該当しますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2 調整指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保育士・保育教諭・幼稚園教諭として就労している、または内定していますか？',
    helpText: '就労先が市内の認可施設か、認可外施設・市外の認可施設かで点数が異なります（No.1・2）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（就労先が市内の認可施設）', value: 'adj_childcare_worker_in', points: 30 },
      {
        label: 'はい（就労先が届出のある認可外施設または市外の認可施設）',
        value: 'adj_childcare_worker_out',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '産前産後休業または育児休業を終了し、職場復帰しますか？',
    helpText: '以前に育児休業取得により退園となっている場合はさらに10点加算されます（No.3・4）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: 'はい', value: 'adj_return_from_leave_yes', points: 15 },
      {
        label: 'はい（以前に育児休業取得により退園している）',
        value: 'adj_return_from_leave_readmit',
        points: 25,
      },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '同居者がいない場合が対象です（No.5・6）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'ひとり親家庭に準じており、同居者がいない', value: 'adj_single_parent_4', points: 4 },
      { label: 'ひとり親家庭で、同居者がいない', value: 'adj_single_parent_5', points: 5 },
    ],
  },
  {
    id: 'adj_parent_absent',
    category: 'adjustment',
    label: '父母の不在に該当しますか？',
    helpText: 'No.7・8',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_absent_no', points: 0 },
      {
        label: '父母のうちどちらかが単身赴任、入院等により不在',
        value: 'adj_parent_absent_6',
        points: 6,
      },
      { label: '父母の両方が不存在（死亡等）', value: 'adj_parent_absent_10', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労による自立支援目的（No.9）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_abuse_risk',
    category: 'adjustment',
    label: '虐待またはDVのおそれがあることに該当しますか？',
    helpText: 'No.10',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_risk_no', points: 0 },
      { label: 'はい', value: 'adj_abuse_risk_yes', points: 10 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者が障害者手帳を所持していますか？',
    helpText: 'No.11・12。重複して加算はされません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      {
        label: '身体障害者手帳1・2級、療育手帳A〜B、精神障害者保健福祉手帳1・2級のうち1つを所持',
        value: 'adj_parent_disability_severe',
        points: 5,
      },
      {
        label: '視聴覚または言語に関して身体障害者手帳3級を所持',
        value: 'adj_parent_disability_sense',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_siblings_preschool',
    category: 'adjustment',
    label: '未就学の兄弟姉妹が2人以上いますか？',
    helpText: '本人を除きます（No.13）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_preschool_no', points: 0 },
      { label: 'はい', value: 'adj_siblings_preschool_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '同時に2人以上の申込みをしていますか？',
    helpText: 'No.14',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児ですか？',
    helpText: 'No.15',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '既に兄弟姉妹が入園している保育園等への入園を希望しますか？',
    helpText:
      '兄弟姉妹が入園している保育園等を希望しつつ、やむを得ず他の保育園等も追加で希望する場合も含みます（No.16）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 7 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '保育園等の転園を希望していますか？',
    helpText: '住所変更等により通園が困難な場合（No.17）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: 10 },
    ],
  },
  {
    id: 'adj_center_approval',
    category: 'adjustment',
    label: 'こども家庭センター長が特に保育が必要と認めていますか？',
    helpText: 'No.18',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_center_approval_no', points: 0 },
      { label: 'はい', value: 'adj_center_approval_yes', points: 20 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '特に調整が必要な状況ですか？',
    helpText: '生計中心者の失業等（No.19）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 10 },
    ],
  },
  {
    id: 'adj_facility_transition',
    category: 'adjustment',
    label: '利用中の施設が認可施設に移行し、移行後も同じ施設の利用を希望しますか？',
    helpText:
      '認可外保育施設を利用している児童で、その施設が保育園または認定こども園に移行した場合（No.20）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_facility_transition_no', points: 0 },
      { label: 'はい', value: 'adj_facility_transition_yes', points: 20 },
    ],
  },
  {
    id: 'adj_type_change',
    category: 'adjustment',
    label: '認定こども園の1号認定から2号認定に切替し、同じ施設の利用を希望しますか？',
    helpText: '保護者の就労状況等の変更による切替が対象。求職活動を事由とする場合は除きます（No.21）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_type_change_no', points: 0 },
      { label: 'はい', value: 'adj_type_change_yes', points: 40 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している18歳以上65歳未満の祖父母・兄姉に保育事由がありませんか？',
    helpText:
      '高校生を除きます。求職活動は保育事由に含みません。同居の範囲は同一住所または同一建物を含みます（No.22、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -25 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '在園児または卒園児の保育料等を滞納していますか？',
    helpText: 'No.23・24（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -5 },
      { label: 'はい（滞納が6か月分以上）', value: 'adj_arrears_long', points: -15 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const hitachiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
