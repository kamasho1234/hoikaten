import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 八戸市 保育施設等 利用調整基準（基準点数・調整点数）データ
//
// 出典: 八戸市こども未来課「別表 利用調整基準」
//       https://www.city.hachinohe.aomori.jp/material/files/group/34/R0704riyoutyouseikijunn.pdf
//       （八戸市Webサイト「令和8年度 認定こども園・幼稚園・保育所 利用案内」
//         https://www.city.hachinohe.aomori.jp/soshikikarasagasu/kodomomiraika/kosodate/1/hoikuriyou/24538.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基本点数は父母それぞれ最大10点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の注記:
//   基準点数: 父母の保育を必要とする事由に応じて基本点数を設定し、父母それぞれの基本点数の
//     合算を基準点数とする。父母がいない場合はその他の保護者（養育者）で基本点数を設定する
//   父母が複数の事由に該当する場合は、それぞれについて点数の高い事由を採用する
//   同時申込の兄弟姉妹で点数が異なる場合は、高得点児童の点数を兄弟姉妹全員に採用する
//   保育を必要とする事由を証明する書類に不足がある場合は、当該父または母について
//     求職活動中である場合と同じ基本点数とする
//   調整点数: 該当項目を全て加減点する。養育者の場合、10点を加算する
//
// 数値化しない規定（優先利用・優先順位のため質問には含めない）:
//   1 次のいずれかに該当し、かつ市長が必要と認めた場合は、各号上位から優先利用を可能とする:
//     (1) 虐待やDVのおそれがあり、社会的養護が必要な場合
//     (2) 分園を利用する児童の年齢が分園の受入対象年齢の上限を超え、同一施設の本園に転園する場合
//     (3) 地域型保育事業を卒園する児童が連携施設の利用を希望する場合
//     (4) 保育施設等を利用する児童が他市町村へ転出し、引き続き同一施設の委託申込があった場合で、
//         保育を必要とする事由に変更がない場合
//     (5) 利用している保育施設等の事由により、継続して当該施設を利用できなくなった場合
//     (6) 医療的ケアの実施が内定している場合
//     (7) その他上記に類しかつ福祉事務所長が必要と認めた場合
//   3 合計点数が同一点数時の順位:
//     (1) 基準点数が高い順／(2) 利用者負担額算定の基礎となる市町村民税課税額の低い順／
//     (3) 同一世帯に属して生計を一にする子どもが多い順／(4) 入所希望保育施設の希望順位が高い順
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hachinohe',
  name: '八戸市',
  slug: 'hachinohe',
  prefecture: '青森県',
  maxBasePoints: 20, // 基本点数は父母それぞれ最大10点、合算で20点
} as const;

// ---------------------------------------------------------------------------
// (1) 基準点数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労（居宅外労働・農業） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働で月140時間以上の就労', value: `${prefix}_employment_8`, points: 8 },
  {
    label: '居宅外労働で月120時間以上140時間未満の就労',
    value: `${prefix}_employment_7a`,
    points: 7,
  },
  {
    label: '居宅外労働で月100時間以上120時間未満の就労',
    value: `${prefix}_employment_6`,
    points: 6,
  },
  {
    label: '居宅外労働で月64時間以上100時間未満の就労',
    value: `${prefix}_employment_5a`,
    points: 5,
  },
  { label: '農業経営者', value: `${prefix}_employment_7b`, points: 7 },
  { label: '農業協力者', value: `${prefix}_employment_5b`, points: 5 },
];

/** 就労（居宅内労働） */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  {
    label: '居宅内労働（雇用主が親族以外）で月120時間以上の就労',
    value: `${prefix}_homework_7`,
    points: 7,
  },
  {
    label: '居宅内労働（雇用主が親族以外）で月64時間以上120時間未満の就労',
    value: `${prefix}_homework_5`,
    points: 5,
  },
  {
    label: '居宅内労働（雇用主が親族）で月120時間以上の就労',
    value: `${prefix}_homework_6`,
    points: 6,
  },
  {
    label: '居宅内労働（雇用主が親族）で月64時間以上120時間未満の就労',
    value: `${prefix}_homework_4`,
    points: 4,
  },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産の前後である', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 疾病・けが等 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院', value: `${prefix}_illness_10`, points: 10 },
  {
    label: '1か月以上の常時臥床または安静を要すると医師が診断',
    value: `${prefix}_illness_9`,
    points: 9,
  },
  {
    label: '上記以外で疾病等により保育が困難と医師が診断',
    value: `${prefix}_illness_8`,
    points: 8,
  },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label:
      '身体障害者手帳1級もしくは2級、精神障害者保健福祉手帳1級、愛護手帳Aまたは療育手帳A',
    value: `${prefix}_disability_7`,
    points: 7,
  },
  {
    label:
      '身体障害者手帳3級、精神障害者保健福祉手帳2級、愛護手帳Bまたは療育手帳B',
    value: `${prefix}_disability_5`,
    points: 5,
  },
  {
    label: '身体障害者手帳4級以下、精神障害者保健福祉手帳3級',
    value: `${prefix}_disability_4`,
    points: 4,
  },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月140時間以上', value: `${prefix}_care_8`, points: 8 },
  { label: '月120時間以上140時間未満', value: `${prefix}_care_7`, points: 7 },
  { label: '月100時間以上120時間未満', value: `${prefix}_care_6`, points: 6 },
  { label: '月64時間以上100時間未満', value: `${prefix}_care_5`, points: 5 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '自宅や近隣の災害の復旧に当たっている',
    value: `${prefix}_disaster_10`,
    points: 10,
  },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '主として生計を維持していた者が失業し、求職活動（起業準備を含む）中',
    value: `${prefix}_jobseeking_5`,
    points: 5,
  },
  { label: '上記以外の求職活動', value: `${prefix}_jobseeking_2`, points: 2 },
];

/** 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '就学・職業訓練（自動車学校については1か月のみ）',
    value: `${prefix}_education_5`,
    points: 5,
  },
];

/** 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label:
      '死亡、離婚、未婚、行方不明（捜索中）、拘禁中、遺棄、調停中（離婚前提）、単身赴任、その他類する理由',
    value: `${prefix}_absence_8`,
    points: 8,
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
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '就労（居宅外労働・農業）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就労（居宅内労働）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・けが等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労（居宅外労働・農業）の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の就労（居宅内労働）の状況は？`,
      inputType: 'radio',
      options: homeWorkOptions(prefix),
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
      label: `${parentLabel}の疾病・けがの状況は？`,
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
      helpText:
        '親族の介護・看護や入院・通院・通所の付き添いのため、常時保育が必要な場合の時間数を選んでください',
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
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は就学・職業訓練をしていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
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
// (2) 調整点数。該当項目を全て加減点する
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '状況①',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '入園希望日の前後2か月の間に産前産後休暇・育児休業を終了し、復職しますか？',
    helpText:
      '新規申請の場合のみ加点されます。父または母が求職活動（起業準備を含む）中である場合を除きます（状況②）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: 'はい', value: 'adj_return_from_leave_yes', points: 3 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '利用日時点で未就学児は何名いますか？',
    helpText: '3名以上で2点、4名以上は1名増えるごとに1点加算されます（状況③）',
    inputType: 'radio',
    options: [
      { label: '2名以下', value: 'adj_many_children_none', points: 0 },
      { label: '3名', value: 'adj_many_children_3', points: 2 },
      { label: '4名', value: 'adj_many_children_4', points: 3 },
      { label: '5名以上', value: 'adj_many_children_5', points: 4 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯または市町村民税非課税世帯ですか？',
    helpText: '状況④',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nuclear_family',
    category: 'adjustment',
    label: '核家族世帯ですか？',
    helpText: '祖父母等と世帯分離し同居している場合を除きます（状況⑤）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nuclear_family_no', points: 0 },
      { label: 'はい', value: 'adj_nuclear_family_yes', points: 1 },
    ],
  },
  {
    id: 'adj_family_care',
    category: 'adjustment',
    label: '要介護者や障がい者（当該児童以外）と同居していますか？',
    helpText: '状況⑥',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_care_no', points: 0 },
      { label: 'はい', value: 'adj_family_care_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '当該児童が障がい児ですか？',
    helpText: '状況⑦',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟姉妹が同時に申込をしますか？',
    helpText:
      '状況⑧・⑨のいずれか加点。転園申請の場合、⑩⑪と重複加点されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_5', points: 5 },
      {
        label: 'はい（利用日時点で父または母が求職活動（起業準備を含む）中）',
        value: 'adj_sibling_simultaneous_3',
        points: 3,
      },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '保育認定を受けた兄弟姉妹が保育施設等を利用していますか？',
    helpText: '状況⑩・⑪のいずれか加点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_5', points: 5 },
      {
        label: 'はい（利用日時点で父または母が求職活動（起業準備を含む）中）',
        value: 'adj_sibling_enrolled_3',
        points: 3,
      },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母（60歳未満）に預けることが可能ですか？',
    helpText:
      '当該祖父母が求職活動（起業準備を含む）中の場合を含みます（状況⑫、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
  {
    id: 'adj_other_city',
    category: 'adjustment',
    label: '他市町村からの委託児童ですか？',
    helpText: '状況⑬（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_city_no', points: 0 },
      { label: 'はい', value: 'adj_other_city_yes', points: -3 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保育士資格または幼稚園教員免許を持つ保護者が市内の保育施設等で就労していますか？',
    helpText:
      '育児休業中を含みます。入園希望日の後2か月の間に就労する場合も対象です（状況⑭）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_worker_yes', points: 10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const hachinoheData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
