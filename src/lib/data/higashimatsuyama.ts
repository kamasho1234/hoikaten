import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 東松山市 保育施設利用調整基準点数表（基礎点数・調整点数）データ
//
// 出典: 東松山市保育課「東松山市保育施設利用調整基準点数表」
//       https://www.city.higashimatsuyama.lg.jp/uploaded/attachment/16457.pdf
//       （東松山市Webサイト「令和8年度保育施設(保育園等)入所のご案内」
//         https://www.city.higashimatsuyama.lg.jp/soshiki/58/46589.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基礎点数は父母それぞれ最大10点（0.5点刻み）で、旧データ（父母各20点）とは
//             体系が異なる。
//
// 原典の注記:
//   【基礎点数について】
//     1 父母それぞれの点数（最低点は0点）を合算して世帯の点数とする
//     2 父母の状況が複数の細目に該当する場合は、原則として点数の高い状況をとり世帯の点数とする
//     3 就労時間に通勤時間および残業時間は含まない
//     4 1か月の就労時間は、就労証明書に記載された「1か月の就労時間数（休憩時間除く）」で算定する
//     5 上記の他、各細目に合致しない場合は、実態に即して最も近いと判断できる細目に当てはめる
//   【市外在住者の利用調整について】
//     市外在住者（転入予定者を除く）は、市内在住者の利用調整後に調整を行う
//   【育児休業中の点数について】
//     申請児童を対象とした育児休業を取得中の場合、提出された就労証明書の就労時間に基づいた点数とする
//   【調整点数について】
//     1 調整点数（父母の状況）の加減算は父母それぞれの点数に対して行い、
//       調整点数（世帯）は父母の合計点数に対して加減算する
//     2 各項目は重複して加減算する
//     4 同居者は、住所が別であっても生計を共にしている場合を含む。世帯が別であっても
//       同一住所地および同一敷地内の別建物の場合は同居とみなす
//   番号17 就学、番号39 育児休業は、番号1〜8（外勤の就労時間区分）を準用する
//
// 数値化しない規定（範囲指定・優先順位のため質問には含めない）:
//   基礎点数 番号40 その他「0〜10」上記の状況に類するものとして市長が認める場合
//   【同一点数世帯の優先順位】
//     1 火災、風水害等による被災世帯で災害復旧作業が必要である場合／2 父子・母子世帯／
//     3 生活保護世帯／4 新規での入所を希望する世帯／5 養育している未就学児の人数が多い世帯／
//     6 同世帯に障害者がいる世帯／7 基礎点数（父母の状況）が高い世帯／
//     8 入所保留期間が長い世帯／9 保育料の滞納がない世帯／
//     10 利用者負担額を決定するための住民税額が少ない世帯
// ---------------------------------------------------------------------------

const municipality = {
  id: 'higashimatsuyama',
  name: '東松山市',
  slug: 'higashimatsuyama',
  prefecture: '埼玉県',
  maxBasePoints: 20, // 基礎点数は父母それぞれ最大10点、合算で20点
} as const;

// ---------------------------------------------------------------------------
// 基礎点数（父母の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 番号1〜8 労働（外勤）。番号17 就学、番号39 育児休業もこの区分を準用する */
const employmentOptions = (prefix: string, key: string) => [
  { label: 'あてはまらない', value: `${prefix}_${key}_none`, points: 0 },
  { label: '1か月に155時間以上', value: `${prefix}_${key}_10`, points: 10 },
  { label: '1か月に150時間以上', value: `${prefix}_${key}_95`, points: 9.5 },
  { label: '1か月に145時間以上', value: `${prefix}_${key}_9`, points: 9 },
  { label: '1か月に140時間以上', value: `${prefix}_${key}_85`, points: 8.5 },
  { label: '1か月に120時間以上', value: `${prefix}_${key}_8`, points: 8 },
  { label: '1か月に100時間以上', value: `${prefix}_${key}_7`, points: 7 },
  { label: '1か月に80時間以上', value: `${prefix}_${key}_6`, points: 6 },
  { label: '1か月に64時間以上', value: `${prefix}_${key}_5`, points: 5 },
];

/** 番号18・19 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '1か月に64時間未満の労働をしており、求職中',
    value: `${prefix}_jobseeking_3`,
    points: 3,
  },
  { label: '現在労働をしておらず、求職中', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** 番号20 父・母不在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label: '死亡・離婚・離婚調停中（同居している場合を除く）・行方不明等',
    value: `${prefix}_absence_10`,
    points: 10,
  },
];

/** 番号21 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産（予定）日が属する月および当該月の前3か月',
    value: `${prefix}_childbirth_10`,
    points: 10,
  },
];

/** 番号22〜24 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '児童の保育が完全に不可能な状況', value: `${prefix}_illness_10`, points: 10 },
  { label: '児童の保育が困難な状況', value: `${prefix}_illness_8`, points: 8 },
  { label: '児童の保育が部分的に困難な状況', value: `${prefix}_illness_6`, points: 6 },
];

/** 番号25〜27 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障害者手帳1・2級、療育手帳マルA・A、精神障害者保健福祉手帳1級',
    value: `${prefix}_disability_10`,
    points: 10,
  },
  {
    label: '身体障害者手帳3級、療育手帳B、精神障害者保健福祉手帳2級',
    value: `${prefix}_disability_8`,
    points: 8,
  },
  {
    label: '身体障害者手帳4級以下、療育手帳C、精神障害者保健福祉手帳3級',
    value: `${prefix}_disability_6`,
    points: 6,
  },
];

/** 番号28〜35 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1か月に155時間以上の介護・看護', value: `${prefix}_care_10`, points: 10 },
  { label: '1か月に150時間以上の介護・看護', value: `${prefix}_care_95`, points: 9.5 },
  { label: '1か月に145時間以上の介護・看護', value: `${prefix}_care_9`, points: 9 },
  { label: '1か月に140時間以上の介護・看護', value: `${prefix}_care_85`, points: 8.5 },
  { label: '1か月に120時間以上の介護・看護', value: `${prefix}_care_8`, points: 8 },
  { label: '1か月に100時間以上の介護・看護', value: `${prefix}_care_7`, points: 7 },
  { label: '1か月に80時間以上の介護・看護', value: `${prefix}_care_6`, points: 6 },
  { label: '1か月に64時間以上の介護・看護', value: `${prefix}_care_5`, points: 5 },
];

/** 番号36 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '火災、風水害等で家屋損傷その他災害復旧',
    value: `${prefix}_disaster_10`,
    points: 10,
  },
];

/** 番号37・38 家庭内暴力・虐待 */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '家庭内暴力により保育することが困難であると認められる状態',
    value: `${prefix}_abuse_10a`,
    points: 10,
  },
  {
    label: '児童虐待のおそれがあると認められる状態',
    value: `${prefix}_abuse_10b`,
    points: 10,
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
    helpText:
      '複数の細目に該当する場合は、原則として点数の高い状況が採用されます',
    inputType: 'select',
    options: [
      { label: '労働（外勤）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '労働（自営業・個人事業主）', value: `${prefix}_reason_selfemployed`, points: 0 },
      { label: '就学（在学・職業訓練）', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '父・母不在', value: `${prefix}_reason_absence`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '家庭内暴力・虐待', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働（外勤）の状況は？`,
      helpText: '就労時間に通勤時間および残業時間は含みません（休憩時間を除いた時間数）',
      inputType: 'radio',
      options: employmentOptions(prefix, 'employment'),
    },
    {
      id: `${prefix}_selfemployed`,
      category,
      label: `${parentLabel}の労働（自営業・個人事業主）の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix, 'selfemployed'),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学（在学・職業訓練）の状況は？`,
      helpText: '教育施設への在学・職業訓練は、労働（外勤）の区分を準用します',
      inputType: 'radio',
      options: employmentOptions(prefix, 'education'),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不在に該当しますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
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
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は家庭内暴力・虐待に該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}の育児休業中の就労状況は？`,
      helpText:
        'きょうだいの育児休業の間に、既に入所中の児童の転所を希望する場合。就労証明書の就労時間に基づき、労働（外勤）の区分を準用します',
      inputType: 'radio',
      options: employmentOptions(prefix, 'leave'),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数（父母の状況・世帯）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労（就学）予定で、就職先・就学先が確定（内定）していますか？',
    helpText: '父母それぞれの点数に対して減算されます（父母の状況41）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい（保護者1名）', value: 'adj_job_offer_1', points: -1 },
      { label: 'はい（保護者2名）', value: 'adj_job_offer_2', points: -2 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '単身赴任により長期不在ですか？',
    helpText: '父母の状況42',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 2 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保育士資格証・幼稚園教諭免許状・看護師免許証を持ち、保育施設等に勤務していますか？',
    helpText:
      '復職予定・内定も含みます（転所希望を除く）。保育施設等に勤務とは、認可保育所・認定こども園・地域型保育事業所・企業主導型保育事業所で保育従事者として勤務することを指します。父母それぞれに加算されます（父母の状況43・44）',
    inputType: 'select',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: '市内の保育施設等に勤務（保護者1名）', value: 'adj_childcare_worker_in1', points: 20 },
      { label: '市内の保育施設等に勤務（保護者2名）', value: 'adj_childcare_worker_in2', points: 40 },
      { label: '市外の保育施設等に勤務（保護者1名）', value: 'adj_childcare_worker_out1', points: 10 },
      { label: '市外の保育施設等に勤務（保護者2名）', value: 'adj_childcare_worker_out2', points: 20 },
    ],
  },
  {
    id: 'adj_intractable_disease',
    category: 'adjustment',
    label: '指定難病・特定疾患ですか？',
    helpText: '父母それぞれの点数に対して加算されます（父母の状況45）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_intractable_disease_no', points: 0 },
      { label: 'はい（保護者1名）', value: 'adj_intractable_disease_1', points: 1 },
      { label: 'はい（保護者2名）', value: 'adj_intractable_disease_2', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    helpText: '世帯1',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 8 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '世帯2・3',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      {
        label: '父子・母子世帯（別居しており、離婚が成立している）',
        value: 'adj_single_parent_8',
        points: 8,
      },
      { label: '離婚調停中（同居している場合を除く）', value: 'adj_single_parent_2', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育ができない事由を持たない同居祖父母（64歳以下）がいますか？',
    helpText:
      '当該年度4月1日時点で64歳以下、世帯分離をしている場合を含みます（世帯4、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -5 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待や家庭内暴力等のおそれがあり、社会的養護が必要ですか？',
    helpText: '世帯5',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '保育施設に入所中または申請中のきょうだいがいますか？',
    helpText: '転所希望を除きます（児童の状況等6）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 0.5 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設・幼稚園・認定こども園の幼稚園部分に常態的に預けていますか？',
    helpText:
      '市外施設を含みます。「育児休業明け」の加点とは重複しません（児童の状況等7）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請児童が障害を有していますか？',
    helpText: '児童の状況等8',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_small_facility_graduate',
    category: 'adjustment',
    label: '地域型保育事業（小規模保育事業所等）を卒園予定ですか？',
    helpText: '4月選考のみ適用されます（児童の状況等9）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_facility_graduate_yes', points: 30 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転所を希望していますか？',
    helpText: '転所希望10・11',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      {
        label:
          'すでに保育施設を利用しており転所を希望する（市外の保育施設から市内の保育施設に通所させるための転所希望を除く）',
        value: 'adj_transfer_m05',
        points: -0.5,
      },
      {
        label: 'きょうだいを同一の施設に通所させるための転所希望',
        value: 'adj_transfer_2',
        points: 2,
      },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '育児休業を取得しており、児童の入所に合わせて就労先へ復帰する予定ですか？',
    helpText: 'その他12',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: 'はい', value: 'adj_return_from_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '育児休業の延長のため、入所保留を希望しますか？',
    helpText: 'その他13（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -30 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '入所決定後に辞退したことがありますか？',
    helpText: '当該年度内の入所決定に対する辞退に限ります（その他14、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -3 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '同一世帯の保育料の滞納がありますか？',
    helpText: '保育料15・16（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: '滞納が6か月以上ある', value: 'adj_arrears_10', points: -10 },
      { label: '滞納が3か月以上ある', value: 'adj_arrears_5', points: -5 },
    ],
  },
  {
    id: 'adj_special',
    category: 'adjustment',
    label: '児童福祉等の観点から特に調整が必要とされていますか？',
    helpText: '世帯の特殊事情17',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_no', points: 0 },
      { label: 'はい', value: 'adj_special_yes', points: 20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const higashimatsuyamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
