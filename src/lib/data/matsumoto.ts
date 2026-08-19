import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 松本市 保育所等利用調整基準（基本指数表・加減指数表）データ
//
// 出典: 松本市こども部保育課「松本市保育所等利用調整基準」
//       https://www.city.matsumoto.nagano.jp/uploaded/attachment/123669.pdf
//       （松本市Webサイト「令和8年度保育園入園のご案内」
//         https://www.city.matsumoto.nagano.jp/site/kosodate/2428.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基本指数は保護者ごとに最大100点で、旧データ（父母各20点）とは体系が異なる。
//
// 重要: 「保護者それぞれについて、基本指数表に応じた指数を決定し、保護者のどちらか低い方の指数を
//        基本指数として採用する」ため scoringMethod は 'min'。
//
// 原典の注記:
//   同一の保護者が複数の要件に該当する場合は、基本指数の高い要件を適用する。ただし
//     「就労、介護・看護、就学」の各要件のうち複数に該当する場合は、該当する要件を合算できる
//   上記類型以外に福祉事務所長が必要と認めると判断した場合は、適当と考えられる指数を基本指数とする
//   加減指数表の項目に複数該当する場合は、それぞれの指数を基本指数に対して加減算する
//   保護者それぞれが同一項目に該当する場合は、重複して加減算せず1人分の調整指数とする
//   代替の保育手段、遠隔地への移動手段は4月入園のみ適用
//
// 数値化しない規定（範囲指定・優先順位のため質問には含めない）:
//   加減指数表 ト 代替の保育手段「-3〜3」現在の保育手段および入所保留時の保育手段に応じて判定
//   加減指数表 ナ 遠隔地への移動手段「0〜2」利用可能な移動手段に応じて判定
//   3 同一指数になった場合の優先順位:
//     1 加減指数表の点数が高い家庭
//     2 基本指数表の類型間の優先順位（(1)災害復旧 (2)疾病・障害 (3)就労 (4)介護・看護
//       (5)妊娠・出産 (6)就学 (7)育児休業 (8)起業準備 (9)求職活動）
//     3 所得の低い家庭
// ---------------------------------------------------------------------------

const municipality = {
  id: 'matsumoto',
  name: '松本市',
  slug: 'matsumoto',
  prefecture: '長野県',
  maxBasePoints: 100, // 保護者のどちらか低い方の指数を基本指数として採用するため、世帯の基本指数は最大100点
  scoringMethod: 'min',
} as const;

// ---------------------------------------------------------------------------
// 1 基本指数表。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 番号1 就労（会社等に雇用されている者・自営業（中心）・農業（中心）） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月の労働時間が180時間以上', value: `${prefix}_employment_80`, points: 80 },
  { label: '月の労働時間が160〜179時間', value: `${prefix}_employment_75`, points: 75 },
  { label: '月の労働時間が140〜159時間', value: `${prefix}_employment_70`, points: 70 },
  { label: '月の労働時間が120〜139時間', value: `${prefix}_employment_65`, points: 65 },
  { label: '月の労働時間が100〜119時間', value: `${prefix}_employment_55`, points: 55 },
  { label: '月の労働時間が80〜99時間', value: `${prefix}_employment_45`, points: 45 },
  { label: '月の労働時間が64〜79時間', value: `${prefix}_employment_40`, points: 40 },
];

/** 番号1 就労（自営業（協力）・農業（協力）・内職） */
const familyWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_family_none`, points: 0 },
  { label: '月の労働時間が180時間以上', value: `${prefix}_family_75`, points: 75 },
  { label: '月の労働時間が160〜179時間', value: `${prefix}_family_70`, points: 70 },
  { label: '月の労働時間が140〜159時間', value: `${prefix}_family_65`, points: 65 },
  { label: '月の労働時間が120〜139時間', value: `${prefix}_family_60`, points: 60 },
  { label: '月の労働時間が100〜119時間', value: `${prefix}_family_50`, points: 50 },
  { label: '月の労働時間が80〜99時間', value: `${prefix}_family_40`, points: 40 },
  { label: '月の労働時間が64〜79時間', value: `${prefix}_family_35`, points: 35 },
];

/** 番号2 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産日または出産予定日が属する月の前3か月、当月1か月、後3か月',
    value: `${prefix}_childbirth_80`,
    points: 80,
  },
  {
    label:
      '妊娠がわかったとき〜出産予定日が属する月の前4か月まで、または出産後（出産月の翌月から）4か月〜1年',
    value: `${prefix}_childbirth_35`,
    points: 35,
  },
  { label: '上記の期間以外', value: `${prefix}_childbirth_10`, points: 10 },
];

/** 番号3 疾病（居宅療養） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1か月以上）', value: `${prefix}_illness_85a`, points: 85 },
  {
    label: '常時寝たきり（1か月以上）または絶対安静の状態',
    value: `${prefix}_illness_85b`,
    points: 85,
  },
  {
    label: '精神性疾患、特定疾患により長期療養（1か月以上）を要する',
    value: `${prefix}_illness_55`,
    points: 55,
  },
  {
    label: '長期安静（1か月以上）または月16日以上の通院を要する',
    value: `${prefix}_illness_40`,
    points: 40,
  },
  { label: '上記にあてはまらない疾病', value: `${prefix}_illness_20`, points: 20 },
];

/** 番号3 心身障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身障手帳1・2級、療育手帳A1・A2、精神障害者保健福祉手帳1級',
    value: `${prefix}_disability_85`,
    points: 85,
  },
  {
    label: '身障手帳3級、療育手帳B1、精神障害者保健福祉手帳2級',
    value: `${prefix}_disability_55`,
    points: 55,
  },
  {
    label: '身障手帳4級以下、療育手帳B2、精神障害者保健福祉手帳3級',
    value: `${prefix}_disability_30`,
    points: 30,
  },
];

/** 番号4 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label:
      '月に160時間以上の介護・看護、または常時介護を要する者（要介護3〜5または寝たきり等）の介護',
    value: `${prefix}_care_85`,
    points: 85,
  },
  { label: '月に120〜159時間の介護・看護', value: `${prefix}_care_70`, points: 70 },
  { label: '月に80〜119時間の介護・看護', value: `${prefix}_care_55`, points: 55 },
  { label: '月に64〜79時間の介護・看護', value: `${prefix}_care_40`, points: 40 },
];

/** 番号5 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災、風水害、震災等の復旧に当たる', value: `${prefix}_disaster_85`, points: 85 },
];

/** 番号6 起業準備 */
const startupOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_startup_none`, points: 0 },
  { label: '起業準備をしている', value: `${prefix}_startup_40`, points: 40 },
];

/** 番号7 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label:
      '生計の中心者が求職活動を行う（ひとり親世帯、または両親のうち一方が疾病・障害等の理由により就労できない場合に限る）',
    value: `${prefix}_jobseeking_55`,
    points: 55,
  },
  { label: '上記以外の求職活動', value: `${prefix}_jobseeking_10`, points: 10 },
];

/** 番号8 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '大学、大学院等', value: `${prefix}_education_70a`, points: 70 },
  {
    label: '職業訓練校・専修学校等で月に160時間以上の就学',
    value: `${prefix}_education_70b`,
    points: 70,
  },
  {
    label: '職業訓練校・専修学校等で月に120〜159時間の就学',
    value: `${prefix}_education_55`,
    points: 55,
  },
  {
    label: '職業訓練校・専修学校等で月に80〜119時間の就学',
    value: `${prefix}_education_40`,
    points: 40,
  },
  {
    label: '職業訓練校・専修学校等で月に64〜79時間の就学',
    value: `${prefix}_education_25`,
    points: 25,
  },
];

/** 番号9 育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  {
    label:
      '育児・介護休業法に基づく育児休業期間中（既に保育を利用している子どもがいて継続利用が必要な場合に限る）',
    value: `${prefix}_leave_10`,
    points: 10,
  },
];

/** 番号10 虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDV、またはそのおそれがある', value: `${prefix}_abuse_100`, points: 100 },
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
      '複数の要件に該当する場合は基本指数の高い要件が適用されます（就労・介護看護・就学は合算可）',
    inputType: 'select',
    options: [
      {
        label: '就労（雇用・自営業（中心）・農業（中心））',
        value: `${prefix}_reason_employment`,
        points: 0,
      },
      {
        label: '就労（自営業（協力）・農業（協力）・内職）',
        value: `${prefix}_reason_family`,
        points: 0,
      },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '心身障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '起業準備', value: `${prefix}_reason_startup`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_leave`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '会社等に雇用されている者（事業主が親族の場合を除く）、自営業（中心）、農業（中心）が対象です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_family`,
      category,
      label: `${parentLabel}の就労（自営業（協力）・農業（協力）・内職）の状況は？`,
      inputType: 'radio',
      options: familyWorkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の時期は？`,
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
      label: `${parentLabel}の心身障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '在宅看護または病院等での介護・看護が対象です',
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
      id: `${prefix}_startup`,
      category,
      label: `${parentLabel}は起業準備をしていますか？`,
      inputType: 'radio',
      options: startupOptions(prefix),
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
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}は育児休業期間中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVに該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2 加減指数表（ア〜ナ）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が市内の保育所等に保育士等として勤務していますか？',
    helpText:
      '保育士、保育教諭、幼稚園教諭、保健師、看護師、准看護師として市内の保育所等に勤務する者（認可外保育施設等に勤務する者を含む）（区分ア）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_worker_yes', points: 20 },
    ],
  },
  {
    id: 'adj_work_evidence',
    category: 'adjustment',
    label: '就労状況に関する証明が不足していますか？',
    helpText:
      '就労状況（日数、時間等）に対して就労（収入）実績に整合性が無い場合、または自営業等の就労状況（予定）申告書について本人が就労（予定）していることが分かる資料が提出できない場合（区分イ、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_evidence_no', points: 0 },
      { label: 'はい', value: 'adj_work_evidence_yes', points: -6 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '申込時点で就労しておらず、利用希望月に採用または復職する予定ですか？',
    helpText: '育休復職の場合は該当しません（区分ウ、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい', value: 'adj_job_offer_yes', points: -4 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '育児休業終了により勤務に復帰しますか？',
    helpText: '区分エ',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: 'はい', value: 'adj_return_from_leave_yes', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法による被保護世帯ですか？',
    helpText: '区分オ',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 9 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '区分カ・キ',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      {
        label: '父もしくは母の死亡、離別、または両親の不在等',
        value: 'adj_single_parent_12',
        points: 12,
      },
      { label: '上記に準ずる場合（離婚調停中、行方不明等）', value: 'adj_single_parent_6', points: 6 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の65歳未満の親族（3親等以内）で保育を必要とする事由がない人は何人いますか？',
    helpText: '該当する親族の人数と指数を乗じます（区分ク、減点）',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_grandparent_0', points: 0 },
      { label: '1人', value: 'adj_grandparent_1', points: -3 },
      { label: '2人', value: 'adj_grandparent_2', points: -6 },
      { label: '3人以上', value: 'adj_grandparent_3', points: -9 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '同一生計内の子どものうち、第3子以降の子どもの利用を申し込みますか？',
    helpText: '区分ケ',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 4 },
    ],
  },
  {
    id: 'adj_migration',
    category: 'adjustment',
    label: '県外から松本市内へ入園希望月の1年以内に移住した（する）世帯ですか？',
    helpText: '区分コ',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_migration_no', points: 0 },
      { label: 'はい', value: 'adj_migration_yes', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用を申し込んだ子どもが障害を有していますか？',
    helpText: '障害に係る手帳の交付を受けている場合に限ります（区分サ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 6 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者が障害に係る手帳の交付を受けていますか？',
    helpText:
      '保育を必要とする事由が就労、就学または求職活動の場合が対象です（区分シ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      { label: 'はい', value: 'adj_parent_disability_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の利用状況は？',
    helpText: '区分ス・セ・ソ',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      {
        label: '兄弟姉妹が現に保育所等を利用している場合の新規申込',
        value: 'adj_sibling_11',
        points: 11,
      },
      {
        label:
          '兄弟姉妹が保育所等を利用していない場合の2人以上の新規申込（入園待機している場合も含む）',
        value: 'adj_sibling_7a',
        points: 7,
      },
      {
        label:
          '兄弟姉妹が現に保育所等を利用している、または新規入園申込をしている場合の転園',
        value: 'adj_sibling_7b',
        points: 7,
      },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '双子等の多胎児を同時に保育所等へ申し込みますか？',
    helpText: '転園を含みます（区分タ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 8 },
    ],
  },
  {
    id: 'adj_small_facility_graduate',
    category: 'adjustment',
    label: '年齢上限がある保育事業の卒園児が、引き続き市内の保育所等の利用を申し込みますか？',
    helpText: '小規模保育事業などが対象です（区分チ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_facility_graduate_yes', points: 6 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '福祉事務所長が保育の実施が必要と認めていますか？',
    helpText: '社会的養護の必要性（区分ツ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 90 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '在園児または卒園児に3か月分以上の保育料の滞納がありますか？',
    helpText: '区分テ（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -18 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const matsumotoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
