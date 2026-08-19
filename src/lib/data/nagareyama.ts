import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 流山市 保育施設利用調整基準表（利用指数A・調整指数B）データ
//
// 出典: 流山市子ども家庭部保育課「流山市保育施設利用調整基準表（令和8年度版）」
//       （令和7年10月1日現在）別表第1 保育所等入所選考基準表／別表第2 特別な事情に対する調整
//       https://www.city.nagareyama.chiba.jp/_res/projects/default_project/_page_/001/028/014/r8kizyunhyo3.pdf
//       （流山市Webサイト「認可保育施設の入所申込みに関するQ&A」
//         https://www.city.nagareyama.chiba.jp/life/1001107/1001162/1028014/index.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             公式の利用指数は父母それぞれ最大20点で、旧データ（父母各20点）とは
//             区分の構成・点数が異なる。
//
// 原典の注記:
//   注1 父母それぞれの利用指数を合算し、世帯の利用指数を決定する。父または母が複数の区分に
//       該当する場合は、利用指数の合算はせず、市が決定するいずれか1つの区分となる
//   注2 就労時間には休憩時間は含めるが、時間外労働時間は含めない
//   注3 労働契約の契約期間の満了等により入所希望日前までに就労者でなくなるものについては、
//       その者を就労内定者とみなして区分2を適用する
//   注4 自営業届を提出したものについては、申込月の前6か月間の平均収入金額を千葉県の定める
//       最低賃金で除し、届に記載された就労日数で除したものを就労時間とする。当該就労時間が
//       4時間に満たないものは求職活動とみなして区分3を適用する
//   注5 就労前提の就学は区分1の就労から各々1点減点した指数とする
//   加算区分6・7・8は併用して加算できない
//   加算区分9は、第1希望とする保育所等以外について利用調整するときは加算しない
//   加算区分10は、申込み児童全員が市内認可保育所等を利用していない場合に限って加算する
//
// 数値化しない規定（範囲指定・同点時の優先順位のため質問には含めない）:
//   別表第1 区分11 その他「1〜20」上記各分類に掲げる状況以外で明らかに保育を必要とする場合
//   別表第2 加算区分16「＋1〜＋20」児童福祉等の観点から特に調整が必要と認められるとき
//   別表第3 児童の状況（合計指数が同一の場合の優先順位。ひとり親世帯80、別居祖父母の自宅が
//     遠い世帯0〜20、父母の通勤時間がより長い世帯0〜24、入所保留期間0〜24、認可外利用10、
//     希望数5〜10、保護者の単身赴任50、認可施設未入所30、在宅障害者がいる世帯8 など）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'nagareyama',
  name: '流山市',
  slug: 'nagareyama',
  prefecture: '千葉県',
  maxBasePoints: 40, // 利用指数は父母それぞれ最大20点、合算で40点
} as const;

// ---------------------------------------------------------------------------
// 別表第1 指数A（保護者の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 区分1 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上の勤務が常態で、1日8時間以上', value: `${prefix}_employment_20`, points: 20 },
  {
    label: '月20日以上の勤務が常態で、1日7時間以上8時間未満',
    value: `${prefix}_employment_19`,
    points: 19,
  },
  {
    label: '月20日以上の勤務が常態で、1日6時間以上7時間未満',
    value: `${prefix}_employment_18a`,
    points: 18,
  },
  {
    label: '月20日以上の勤務が常態で、1日5時間以上6時間未満',
    value: `${prefix}_employment_17a`,
    points: 17,
  },
  {
    label: '月20日以上の勤務が常態で、1日4時間以上5時間未満',
    value: `${prefix}_employment_16a`,
    points: 16,
  },
  {
    label: '月16日以上20日未満の勤務が常態で、1日8時間以上',
    value: `${prefix}_employment_18b`,
    points: 18,
  },
  {
    label: '月16日以上20日未満の勤務が常態で、1日7時間以上8時間未満',
    value: `${prefix}_employment_17b`,
    points: 17,
  },
  {
    label: '月16日以上20日未満の勤務が常態で、1日6時間以上7時間未満',
    value: `${prefix}_employment_16b`,
    points: 16,
  },
  {
    label: '月16日以上20日未満の勤務が常態で、1日5時間以上6時間未満',
    value: `${prefix}_employment_15`,
    points: 15,
  },
  {
    label: '月16日以上20日未満の勤務が常態で、1日4時間以上5時間未満',
    value: `${prefix}_employment_14`,
    points: 14,
  },
  { label: '上記以外で、1月の労働時間が64時間以上', value: `${prefix}_employment_13`, points: 13 },
];

/** 区分2 就労内定者 */
const jobOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_joboffer_none`, points: 0 },
  { label: '月20日以上の勤務が常態で、1日8時間以上', value: `${prefix}_joboffer_19`, points: 19 },
  {
    label: '月20日以上の勤務が常態で、1日7時間以上8時間未満',
    value: `${prefix}_joboffer_18a`,
    points: 18,
  },
  {
    label: '月20日以上の勤務が常態で、1日6時間以上7時間未満',
    value: `${prefix}_joboffer_17a`,
    points: 17,
  },
  {
    label: '月20日以上の勤務が常態で、1日5時間以上6時間未満',
    value: `${prefix}_joboffer_16a`,
    points: 16,
  },
  {
    label: '月20日以上の勤務が常態で、1日4時間以上5時間未満',
    value: `${prefix}_joboffer_15a`,
    points: 15,
  },
  {
    label: '月16日以上20日未満の勤務が常態で、1日8時間以上',
    value: `${prefix}_joboffer_17b`,
    points: 17,
  },
  {
    label: '月16日以上20日未満の勤務が常態で、1日7時間以上8時間未満',
    value: `${prefix}_joboffer_16b`,
    points: 16,
  },
  {
    label: '月16日以上20日未満の勤務が常態で、1日6時間以上7時間未満',
    value: `${prefix}_joboffer_15b`,
    points: 15,
  },
  {
    label: '月16日以上20日未満の勤務が常態で、1日5時間以上6時間未満',
    value: `${prefix}_joboffer_14`,
    points: 14,
  },
  {
    label: '月16日以上20日未満の勤務が常態で、1日4時間以上5時間未満',
    value: `${prefix}_joboffer_13`,
    points: 13,
  },
  { label: '上記以外で、1月の労働時間が64時間以上', value: `${prefix}_joboffer_12`, points: 12 },
];

/** 区分3 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動のため昼間外出を常態としている', value: `${prefix}_jobseeking_3`, points: 3 },
];

/** 区分4 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '下記の5か月間の期間中で、妊娠障害等により30日以上入院の見込みがある、または多胎妊娠',
    value: `${prefix}_childbirth_19`,
    points: 19,
  },
  {
    label: '入所希望日が出産予定日を含む月を挟んで前後2か月の合計5か月以内にある',
    value: `${prefix}_childbirth_13`,
    points: 13,
  },
];

/** 区分5 疾病・負傷 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '1か月以上入院している（入院予定を含む。妊娠・出産は含まない）',
    value: `${prefix}_illness_20`,
    points: 20,
  },
  {
    label: '居宅内療養：30日以上の療養が必要で常時寝たきりの状態',
    value: `${prefix}_illness_19`,
    points: 19,
  },
  {
    label: '居宅内療養：定期的な通院加療が必要な状態',
    value: `${prefix}_illness_15`,
    points: 15,
  },
];

/** 区分5 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label:
      '身体障害者手帳1級もしくは2級、精神障害者保健福祉手帳1級もしくは2級、または療育手帳A以上',
    value: `${prefix}_disability_20`,
    points: 20,
  },
  { label: '上記以外の障害', value: `${prefix}_disability_15`, points: 15 },
];

/** 区分6 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label:
      '要介護認定3〜5程度、身体障害者手帳1級もしくは2級、精神障害者保健福祉手帳1級もしくは2級、または療育手帳A以上の者と同居し、介護・看護している',
    value: `${prefix}_care_19`,
    points: 19,
  },
  {
    label:
      '要介護認定1〜2程度、身体障害者手帳3級もしくは4級、精神障害者保健福祉手帳3級、または療育手帳Bの者と同居し、介護・看護している',
    value: `${prefix}_care_15`,
    points: 15,
  },
  {
    label:
      '被介護・被看護者が入院中または通院中で、医師の診断書等で月20日以上1日6時間以上の付き添いが必要と認められる',
    value: `${prefix}_care_18`,
    points: 18,
  },
  {
    label:
      '被介護・被看護者が入院中または通院中で、医師の診断書等で月16日以上1日4時間以上の付き添いが必要と認められる',
    value: `${prefix}_care_14`,
    points: 14,
  },
  { label: '上記以外の状態で介護・看護に当たっている', value: `${prefix}_care_12`, points: 12 },
];

/** 区分7 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災、風水害、火災その他の災害により被害を受けた家屋等の復旧が必要',
    value: `${prefix}_disaster_20`,
    points: 20,
  },
];

/** 区分8 就労前提の就学（区分1の就労から各々1点減点した指数） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '月20日以上の就学が常態で、1日8時間以上（月64時間以上）',
    value: `${prefix}_education_19`,
    points: 19,
  },
  {
    label: '月20日以上の就学が常態で、1日7時間以上8時間未満',
    value: `${prefix}_education_18a`,
    points: 18,
  },
  {
    label: '月20日以上の就学が常態で、1日6時間以上7時間未満',
    value: `${prefix}_education_17a`,
    points: 17,
  },
  {
    label: '月20日以上の就学が常態で、1日5時間以上6時間未満',
    value: `${prefix}_education_16a`,
    points: 16,
  },
  {
    label: '月20日以上の就学が常態で、1日4時間以上5時間未満',
    value: `${prefix}_education_15a`,
    points: 15,
  },
  {
    label: '月16日以上20日未満の就学が常態で、1日8時間以上',
    value: `${prefix}_education_17b`,
    points: 17,
  },
  {
    label: '月16日以上20日未満の就学が常態で、1日7時間以上8時間未満',
    value: `${prefix}_education_16b`,
    points: 16,
  },
  {
    label: '月16日以上20日未満の就学が常態で、1日6時間以上7時間未満',
    value: `${prefix}_education_15b`,
    points: 15,
  },
  {
    label: '月16日以上20日未満の就学が常態で、1日5時間以上6時間未満',
    value: `${prefix}_education_14`,
    points: 14,
  },
  {
    label: '月16日以上20日未満の就学が常態で、1日4時間以上5時間未満',
    value: `${prefix}_education_13`,
    points: 13,
  },
  { label: '上記以外で、1月の就学時間が64時間以上', value: `${prefix}_education_12`, points: 12 },
  {
    label: '就学を予定し、1月当たりの就学の時間が未確定または不明確',
    value: `${prefix}_education_7`,
    points: 7,
  },
];

/** 区分9 父・母の不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label: '配偶者の死亡、離婚、未婚等で母子家庭または父子家庭となっている',
    value: `${prefix}_absence_20`,
    points: 20,
  },
];

/** 区分10 虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '世帯内において配偶者や児童などに対する虐待やDVのおそれがある',
    value: `${prefix}_abuse_18`,
    points: 18,
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
      '複数の区分に該当する場合、指数の合算はされず、市が決定するいずれか1つの区分となります',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就労内定者', value: `${prefix}_reason_joboffer`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就労前提の就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '父・母の不存在', value: `${prefix}_reason_absence`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間には休憩時間は含めますが、時間外労働時間は含めません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_joboffer`,
      category,
      label: `${parentLabel}の就労内定の状況は？`,
      inputType: 'radio',
      options: jobOfferOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
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
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害による家屋等の復旧が必要ですか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就労前提の就学の状況は？`,
      helpText: '指数は就労の区分から各々1点減点したものです',
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
// 別表第2 指数B（特別な事情に対する調整）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '加算区分1',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法による扶助を受けていますか？',
    helpText: '加算区分2',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者の失業により、就労の必要性が高いですか？',
    helpText: '加算区分3',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護が必要ですか？',
    helpText:
      '世帯内において配偶者や児童などに対する虐待やDVのおそれがある場合等。里親委託が行われている場合を含みます（加算区分4）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込み児童に一定の障害がありますか？',
    helpText: '加算区分5',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '育児休業等・転園・認可外預けの状況は？',
    helpText: '加算区分6・7・8は併用して加算できません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_return_from_leave_none', points: 0 },
      {
        label: '入所希望日の属する月に産休・育児休業等が終わり、職場復帰する',
        value: 'adj_return_from_leave_2a',
        points: 2,
      },
      {
        label:
          '入所希望日の前日をもって市外認可保育所等を退所し、入所希望日をもって市内認可保育所等に転園する',
        value: 'adj_return_from_leave_3',
        points: 3,
      },
      {
        label:
          '育児休業等の期間中に入所申込みをしたが保留となったため、認可外保育施設等に預けて職場復帰した',
        value: 'adj_return_from_leave_2b',
        points: 2,
      },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '既に市内認可保育所等に入所している兄弟姉妹と同じ保育所等を第1希望としますか？',
    helpText:
      '入所希望月に兄弟姉妹が退所することが分かっている場合を除きます。第1希望とする施設以外の利用調整では加算されません（加算区分9）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟姉妹で同時に保育所等の申込みをしていますか？',
    helpText:
      '申込み児童全員が市内認可保育所等を利用していない場合に限って加算されます（加算区分10・11）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_3', points: 3 },
      {
        label: 'はい（市内保育所等に在園していない多胎児が同時に申し込む）',
        value: 'adj_sibling_simultaneous_4',
        points: 4,
      },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '保護者のいずれかが単身赴任ですか？',
    helpText: '加算区分12',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 2 },
    ],
  },
  {
    id: 'adj_small_facility_graduate',
    category: 'adjustment',
    label: '市内の小規模保育事業所などを卒園する見込みの児童ですか？',
    helpText: '加算区分13',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_facility_graduate_yes', points: 14 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '父または母が保育士資格を持ち、市内認可保育所等の保育士として勤務していますか？',
    helpText: '勤務予定の場合を含みます（加算区分14）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_worker_yes', points: 14 },
    ],
  },
  {
    id: 'adj_area_facility',
    category: 'adjustment',
    label: '事業区域内保育施設を第1希望としますか？',
    helpText:
      '事業区域内に居住する保護者（居住予定の届出をし、市長が確実と認めるものを含む）に適用されます（加算区分15）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_area_facility_no', points: 0 },
      { label: 'はい', value: 'adj_area_facility_yes', points: 20 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居する18歳以上65歳未満の者が保育に当たることができますか？',
    helpText: '減算区分17',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -5 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '正当な理由なく辞退をしたことがありますか？',
    helpText: '減算区分18',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -7 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '市外在住ですか？',
    helpText:
      '入所希望日前までに市内に転入することが確実であると認められる者は除きます（減算区分19）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（流山市在住・転入確実）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい', value: 'adj_outside_city_yes', points: -12 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    helpText: '減算区分20・21',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      {
        label: '在園児または卒園児の保護者が理由なく過去3か月以上の保育料を滞納している',
        value: 'adj_arrears_10',
        points: -10,
      },
      {
        label: '滞納が6か月以上あり、納付の督促等に対して誠意ある対応が見られない',
        value: 'adj_arrears_20',
        points: -20,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const nagareyamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
