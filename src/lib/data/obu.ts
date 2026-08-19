import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 大府市 保育所等利用調整指数表（基礎点・調整点）データ
//
// 出典: 大府市幼児教育保育課「大府市保育所等利用調整指数表」（令和8年度）
//       https://www.city.obu.aichi.jp/_res/projects/default_project/_page_/001/011/404/r8_sisuuhyou.pdf
//       （大府市Webサイト「添付書類等のダウンロード」
//         https://www.city.obu.aichi.jp/kosodate/hoikuen/1015050/1011404.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式指数表を読み取って全面的に置き換えた。
//             公式の基礎点は父母それぞれ最大11点（最高22点）で、旧データ（父母各20点）とは
//             体系が異なる。
//
// 原典の注記:
//   証明書を2種類以上提出された場合の点数は主たる事由を優先する
//   就労時間は休憩時間を含み、残業・通勤時間を除く規程の時間で判断する
//   育児短時間勤務や部分休業の点数は、これがない場合の勤務時間で判断する
//   ※1 自営業協力者については、3親等内の親族におけるものを対象とする
//   ※2 自営協力者（親族経営等）や親族が経営する自営業・農業を補助する者は、
//       自営中心者・経営者において該当する指数から指定する指数の減算を行う
//   ※3 就労・就学予定は、令和8年4月1日から就労・就学予定で活動中であり、
//       令和8年2月20日までに各種証明書を提出する場合に限る
//   No.8 就学は No.1 の外勤に準ずる
//   No.13とNo.14の重複による加算は行わない
//   No.14とNo.20の重複は認められない
//
// 数値化しない規定（質問には含めない）:
//   基礎点 No.10 その他「－」児童福祉等の観点から特に調整が必要と大府市が認める場合
// ---------------------------------------------------------------------------

const municipality = {
  id: 'obu',
  name: '大府市',
  slug: 'obu',
  prefecture: '愛知県',
  maxBasePoints: 22, // 基礎点は父母それぞれ最大11点、最高22点
} as const;

// ---------------------------------------------------------------------------
// （1）基礎点。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** No.1 就労（外勤・自営中心者・経営者等）。No.8 就学もこの区分に準ずる */
const employmentOptions = (prefix: string, key: string) => [
  { label: 'あてはまらない', value: `${prefix}_${key}_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_${key}_11`, points: 11 },
  { label: '月140時間以上160時間未満', value: `${prefix}_${key}_10`, points: 10 },
  { label: '月120時間以上140時間未満', value: `${prefix}_${key}_9`, points: 9 },
  { label: '月100時間以上120時間未満', value: `${prefix}_${key}_8`, points: 8 },
  { label: '月100時間未満', value: `${prefix}_${key}_7`, points: 7 },
];

/**
 * No.1 自営協力者（親族経営等）・親族が経営する自営業/農業の補助。
 * 原典では自営中心者・経営者の該当指数から ※2 の指数（証明書ありは1点、なしは3点）を減算する
 * 仕組みのため、ここでは減算後の指数を選択肢として展開している。
 */
const familyWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_family_none`, points: 0 },
  {
    label: '確定申告書に専従者の表示あり／源泉徴収票あり：月160時間以上',
    value: `${prefix}_family_10`,
    points: 10,
  },
  {
    label: '確定申告書に専従者の表示あり／源泉徴収票あり：月140時間以上160時間未満',
    value: `${prefix}_family_9`,
    points: 9,
  },
  {
    label: '確定申告書に専従者の表示あり／源泉徴収票あり：月120時間以上140時間未満',
    value: `${prefix}_family_8a`,
    points: 8,
  },
  {
    label: '確定申告書に専従者の表示あり／源泉徴収票あり：月100時間以上120時間未満',
    value: `${prefix}_family_7a`,
    points: 7,
  },
  {
    label: '確定申告書に専従者の表示あり／源泉徴収票あり：月100時間未満',
    value: `${prefix}_family_6`,
    points: 6,
  },
  {
    label: '確定申告書なし／源泉徴収票等の証明書なし：月160時間以上',
    value: `${prefix}_family_8b`,
    points: 8,
  },
  {
    label: '確定申告書なし／源泉徴収票等の証明書なし：月140時間以上160時間未満',
    value: `${prefix}_family_7b`,
    points: 7,
  },
  {
    label: '確定申告書なし／源泉徴収票等の証明書なし：月120時間以上140時間未満',
    value: `${prefix}_family_5`,
    points: 5,
  },
  {
    label: '確定申告書なし／源泉徴収票等の証明書なし：月100時間以上120時間未満',
    value: `${prefix}_family_4`,
    points: 4,
  },
  {
    label: '確定申告書なし／源泉徴収票等の証明書なし：月100時間未満',
    value: `${prefix}_family_3`,
    points: 3,
  },
];

/** No.1 就労予定・内職 */
const jobOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_joboffer_none`, points: 0 },
  {
    label: '就労予定（内定証明書等のみの提出。就労証明書が提出できない場合）',
    value: `${prefix}_joboffer_6`,
    points: 6,
  },
  { label: '内職で月64時間以上の就労', value: `${prefix}_joboffer_4`, points: 4 },
];

/** No.2 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産の前後', value: `${prefix}_childbirth_11`, points: 11 },
];

/** No.3 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院', value: `${prefix}_illness_11`, points: 11 },
  { label: '月16日以上の通院', value: `${prefix}_illness_7`, points: 7 },
  {
    label: '月16日未満の通院、または在宅疾病等で保育が不可能である旨の医師の診断書がある',
    value: `${prefix}_illness_5`,
    points: 5,
  },
];

/** No.3 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障害者手帳1・2級、精神障害者保健福祉手帳1級、療育手帳A',
    value: `${prefix}_disability_11`,
    points: 11,
  },
  {
    label: '身体障害者手帳3・4級、精神障害者保健福祉手帳2・3級、療育手帳B',
    value: `${prefix}_disability_6`,
    points: 6,
  },
  { label: '上記以外', value: `${prefix}_disability_4`, points: 4 },
];

/** No.4 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '常時観察と介護を要する寝たきり者等の付き添い',
    value: `${prefix}_care_11`,
    points: 11,
  },
  { label: '月100時間以上の介護・看護', value: `${prefix}_care_9`, points: 9 },
  { label: '月64時間以上100時間未満の介護・看護', value: `${prefix}_care_7`, points: 7 },
];

/** No.5 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害の復旧', value: `${prefix}_disaster_11`, points: 11 },
];

/** No.6 就労・就学予定、No.7 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '就労・就学に向けて活動中（新年度から就労・就学予定）',
    value: `${prefix}_jobseeking_3`,
    points: 3,
  },
  { label: '就労に向けて活動中（求職活動）', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** No.9 虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVのおそれがある', value: `${prefix}_abuse_11`, points: 11 },
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
      {
        label: '就労（外勤・自営中心者・経営者等）',
        value: `${prefix}_reason_employment`,
        points: 0,
      },
      {
        label: '自営協力者・親族の自営業/農業の補助',
        value: `${prefix}_reason_family`,
        points: 0,
      },
      { label: '就労予定・内職', value: `${prefix}_reason_joboffer`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '就労・就学予定／求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間は？`,
      helpText:
        '外勤（テレワーク・リモートワークを含む）、自営中心者・経営者等が対象です。自営中心者・経営者等は最低実労働時間を月64時間以上とします。就労時間は休憩時間を含み、残業・通勤時間を除きます',
      inputType: 'radio',
      options: employmentOptions(prefix, 'employment'),
    },
    {
      id: `${prefix}_family`,
      category,
      label: `${parentLabel}の自営協力者・補助者としての就労時間は？`,
      helpText:
        '3親等内の親族における自営協力者が対象です。自営中心者・経営者において該当する指数から、証明書ありは1点、なしは3点が減算されます（減算後の指数を表示しています）',
      inputType: 'radio',
      options: familyWorkOptions(prefix),
    },
    {
      id: `${prefix}_joboffer`,
      category,
      label: `${parentLabel}の就労予定・内職の状況は？`,
      inputType: 'radio',
      options: jobOfferOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
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
      label: `${parentLabel}の障がいの程度は？`,
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
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText:
        '学校教育法等に規定する学校に在学している、職業訓練を受けている、または就学予定が確定していることが確認できる場合。指数は外勤に準じます',
      inputType: 'radio',
      options: employmentOptions(prefix, 'education'),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の就労・就学予定、求職活動の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVのおそれに該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// （2）調整点（加算・減算）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護による被保護世帯ですか？',
    helpText: 'No.11',
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
    helpText: '父親または母親の死亡・離別など（No.12）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 16 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの在園・申込状況は？',
    helpText: 'No.13とNo.14の重複による加算は行われません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: '入園希望施設にきょうだいが在園中', value: 'adj_sibling_3', points: 3 },
      { label: 'きょうだいが同時に同じ施設に入園申込み', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保育士の資格を有する保護者が市内の保育施設等で勤務・内定していますか？',
    helpText:
      '市内の認可保育所、認定こども園、地域型保育事業所、認可外保育施設で保育士・保育教諭として勤務・内定している場合。保護者1名あたり1点です（No.15）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: '保護者1名が該当', value: 'adj_childcare_worker_1', points: 1 },
      { label: '保護者2名が該当', value: 'adj_childcare_worker_2', points: 2 },
    ],
  },
  {
    id: 'adj_school_district',
    category: 'adjustment',
    label: '居住する小学校区域内にある保育園への入園が第1希望ですか？',
    helpText: '1〜3年保育のみが対象です（No.16）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_school_district_no', points: 0 },
      { label: 'はい', value: 'adj_school_district_yes', points: 1 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '入園申込みの時点で保育料等の滞納がありますか？',
    helpText: '生活保護費被保護世帯を除きます（No.17、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業中の職場復帰の状況は？',
    helpText: 'No.18・19（減点）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_parental_leave_none', points: 0 },
      { label: '翌年度4月1日以降に職場に復帰する', value: 'adj_parental_leave_3', points: -3 },
      {
        label: '育児休業中につき復帰先の就労先や就労時間が未定である',
        value: 'adj_parental_leave_5',
        points: -5,
      },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '入園できない場合、育児休業の継続が許容できますか？',
    helpText: 'No.20。同意欄への署名が必要です（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -18 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const obuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
