import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 八潮市 保育所入所選考基準（基準指数表・調整指数表）データ
//
// 出典: 八潮市保育幼稚園課「保育のしおり（令和7年10月7日版）」P9-P10
//       「3．令和8年度八潮市保育所入所選考基準」
//       https://www.city.yashio.lg.jp/kosodate/kosodate/hoikujo/2025_shinseihoiku.files/r8hoikunosiori.pdf
//       （八潮市Webサイト「令和8年度入所の保育所・認定こども園・小規模保育施設の申請」
//         https://www.city.yashio.lg.jp/kosodate/kosodate/hoikujo/2025_shinseihoiku.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//
// 原典の注記:
//   「父母それぞれの指数を合算して世帯の指数を決定し、ひとり親世帯のときは20を加えて指数を決定する」
//   「就労時間には、通勤時間は含まない。ただし休憩時間は含む」
//   「保育にあたる保護者の状況が2つ以上ある場合は、高い方の指数を決定する」
//   「期限内に保育の必要性を証明する書類等の提出がない場合は、求職中（就労先未定）の指数を決定する」
//   「調整指数の減点により、利用調整指数がマイナスとなる場合につきましては、0点とする」
//
// 質問に含めていない原典の項目:
//   ・基準指数⑨その他「①〜⑨の類型に最も近いと思われる指数で決定する」（点数の定めなし）
//   ・調整指数「児童福祉等の観点から特に調整が必要とされた場合（要保護児童など）等の特殊事情」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yashio',
  name: '八潮市',
  slug: 'yashio',
  prefecture: '埼玉県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 基準指数表（保育にあたる保護者の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** ① 就労（外勤・自営／内職） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上、1日8時間以上の就労を常態', value: `${prefix}_employment_20`, points: 20 },
  { label: '月20日以上、1日7時間以上8時間未満の就労を常態', value: `${prefix}_employment_19`, points: 19 },
  { label: '月20日以上、1日6時間以上7時間未満の就労を常態', value: `${prefix}_employment_18`, points: 18 },
  { label: '月20日以上、1日5時間以上6時間未満の就労を常態', value: `${prefix}_employment_17`, points: 17 },
  { label: '月20日以上、1日4時間以上5時間未満の就労を常態', value: `${prefix}_employment_16`, points: 16 },
  { label: '月16日以上、1日8時間以上の就労を常態', value: `${prefix}_employment_16d_18`, points: 18 },
  { label: '月16日以上、1日7時間以上8時間未満の就労を常態', value: `${prefix}_employment_16d_17`, points: 17 },
  { label: '月16日以上、1日6時間以上7時間未満の就労を常態', value: `${prefix}_employment_16d_16`, points: 16 },
  { label: '月16日以上、1日5時間以上6時間未満の就労を常態', value: `${prefix}_employment_16d_15`, points: 15 },
  { label: '月16日以上、1日4時間以上5時間未満の就労を常態', value: `${prefix}_employment_16d_14`, points: 14 },
  { label: '上記に該当しないが、月96時間以上の就労を常態', value: `${prefix}_employment_14`, points: 14 },
  {
    label: '上記に該当しないが、月64時間以上月96時間未満の就労を常態',
    value: `${prefix}_employment_12`,
    points: 12,
  },
  { label: '内職：1日8時間以上、月収5万円以上の就労を常態', value: `${prefix}_employment_naishoku_11`, points: 11 },
  { label: '内職：1日4時間以上、月収3万円以上の就労を常態', value: `${prefix}_employment_naishoku_9`, points: 9 },
];

/** ② 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡、離別、行方不明、拘禁', value: `${prefix}_absence_20`, points: 20 },
];

/** ③ 母の出産・疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '出産（出産予定月前42日の属する月初日から産後56日の属する月末日まで）',
    value: `${prefix}_illness_birth_20`,
    points: 20,
  },
  { label: '疾病：1か月以上入院している（入院予定を含む）', value: `${prefix}_illness_20`, points: 20 },
  { label: '疾病：自宅内療養で常時病臥・感染症', value: `${prefix}_illness_bedridden_20`, points: 20 },
  { label: '疾病：自宅内療養で精神障害者保健福祉手帳1〜3級', value: `${prefix}_illness_mental_20`, points: 20 },
  { label: '疾病：自宅内療養（精神性・上記以外の程度）', value: `${prefix}_illness_mental_17`, points: 17 },
  {
    label: '疾病：医師が1か月以上安静を要すると診断（常時病臥を除く）',
    value: `${prefix}_illness_rest_17`,
    points: 17,
  },
  { label: '疾病：医師が1か月以上通院加療を要すると診断', value: `${prefix}_illness_visit_13`, points: 13 },
  {
    label: '障がい：身体1・2級（視覚障害は1〜3級）、療育手帳マルA〜B',
    value: `${prefix}_illness_disability_20`,
    points: 20,
  },
  { label: '障がい：身体3級、療育手帳C または同程度', value: `${prefix}_illness_disability_18`, points: 18 },
  {
    label: '障がい：身体4級以下または同程度で保育にあたることができない',
    value: `${prefix}_illness_disability_12`,
    points: 12,
  },
];

/** ④ 病人の看護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '自宅外：週5日以上日中週30時間以上（重度心身障がい者等）の介護を常態',
    value: `${prefix}_care_out_20`,
    points: 20,
  },
  { label: '自宅外：週5日以上日中週20時間以上の介護を常態', value: `${prefix}_care_out_18`, points: 18 },
  { label: '自宅外：週4日以上日中週16時間以上の介護を常態', value: `${prefix}_care_out_16`, points: 16 },
  { label: '自宅外：上記以外の介護を常態', value: `${prefix}_care_out_4`, points: 4 },
  {
    label: '自宅内：全介護を必要とする（重度身障者、要介護認定3・4・5）',
    value: `${prefix}_care_in_20`,
    points: 20,
  },
  { label: '自宅内：介護を必要とする（要介護認定1・2）', value: `${prefix}_care_in_17`, points: 17 },
  { label: '自宅内：支援を必要とする（要支援）', value: `${prefix}_care_in_15`, points: 15 },
  { label: '自宅内：上記以外で必要とする', value: `${prefix}_care_in_4`, points: 4 },
];

/** ⑤ 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災等の災害の復旧に当たる', value: `${prefix}_disaster_20`, points: 20 },
];

/** ⑥ 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定：月20日以上、1日8時間以上の就労を常態', value: `${prefix}_jobseeking_12`, points: 12 },
  { label: '内定：月20日以上、1日7時間以上8時間未満の就労を常態', value: `${prefix}_jobseeking_11`, points: 11 },
  { label: '内定：月20日以上、1日6時間以上7時間未満の就労を常態', value: `${prefix}_jobseeking_10`, points: 10 },
  { label: '内定：月20日以上、1日5時間以上6時間未満の就労を常態', value: `${prefix}_jobseeking_9`, points: 9 },
  { label: '内定：月20日以上、1日4時間以上5時間未満の就労を常態', value: `${prefix}_jobseeking_8`, points: 8 },
  { label: '内定：月16日以上、1日8時間以上の就労を常態', value: `${prefix}_jobseeking_16d_10`, points: 10 },
  {
    label: '内定：月16日以上、1日7時間以上8時間未満の就労を常態',
    value: `${prefix}_jobseeking_16d_9`,
    points: 9,
  },
  {
    label: '内定：月16日以上、1日6時間以上7時間未満の就労を常態',
    value: `${prefix}_jobseeking_16d_8`,
    points: 8,
  },
  {
    label: '内定：月16日以上、1日5時間以上6時間未満の就労を常態',
    value: `${prefix}_jobseeking_16d_7`,
    points: 7,
  },
  {
    label: '内定：月16日以上、1日4時間以上5時間未満の就労を常態',
    value: `${prefix}_jobseeking_16d_6`,
    points: 6,
  },
  { label: '内定：上記に該当しないが、月96時間以上の就労を常態', value: `${prefix}_jobseeking_6`, points: 6 },
  {
    label: '内定：上記に該当しないが、月64時間以上月96時間未満の就労を常態',
    value: `${prefix}_jobseeking_5`,
    points: 5,
  },
  { label: '未定：求職中（就労先未定）', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** ⑦ 就学等（就労／求職の指数に準ずる） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・技能習得：月20日以上、1日8時間以上を常態', value: `${prefix}_education_20`, points: 20 },
  {
    label: '就学・技能習得：月20日以上、1日7時間以上8時間未満を常態',
    value: `${prefix}_education_19`,
    points: 19,
  },
  {
    label: '就学・技能習得：月20日以上、1日6時間以上7時間未満を常態',
    value: `${prefix}_education_18`,
    points: 18,
  },
  {
    label: '就学・技能習得：月20日以上、1日5時間以上6時間未満を常態',
    value: `${prefix}_education_17`,
    points: 17,
  },
  {
    label: '就学・技能習得：月20日以上、1日4時間以上5時間未満を常態',
    value: `${prefix}_education_16`,
    points: 16,
  },
  { label: '就学・技能習得：月16日以上、1日8時間以上を常態', value: `${prefix}_education_16d_18`, points: 18 },
  { label: '就学・技能習得：上記に該当しないが月96時間以上を常態', value: `${prefix}_education_14`, points: 14 },
  {
    label: '就学・技能習得：上記に該当しないが月64時間以上月96時間未満を常態',
    value: `${prefix}_education_12`,
    points: 12,
  },
  { label: '就学・技能習得が内定している（月20日以上、1日8時間以上）', value: `${prefix}_education_naitei_12`, points: 12 },
  { label: '就学・技能習得が内定している（上記未満）', value: `${prefix}_education_naitei_5`, points: 5 },
];

/** ⑧ 虐待・DV等 */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '児童虐待防止法第2条または配偶者暴力防止法第1条の対象者と認められる',
    value: `${prefix}_abuse_20`,
    points: 20,
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
    helpText: '2つ以上の状況にあてはまる場合は、高い方の指数が採用されます',
    inputType: 'select',
    options: [
      { label: '就労（外勤・自営・内職）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '不存在（死亡、離別、行方不明、拘禁）', value: `${prefix}_reason_absence`, points: 0 },
      { label: '出産・疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '病人の看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV等', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間には通勤時間は含みませんが、休憩時間は含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在の状態ですか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の出産・疾病・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
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
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・技能習得の状況は？`,
      helpText: '就学中は就労の指数に、内定している場合は求職（内定）の指数に準じます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DV等の対象者ですか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数表
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '原典では基準指数の合算後に20が加えられます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士・保育教諭・幼稚園教諭・看護師として勤務していますか？',
    helpText:
      '認可保育所、地域型保育、認定こども園、幼稚園、認可外保育施設（設置届出済のものに限る）で、月20日以上かつ1日6時間以上の勤務が対象です。父母ともに該当する場合はそれぞれ加点されますが、転園を希望する場合は加算されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（市内の施設）', value: 'adj_hoikushi_20', points: 20 },
      { label: 'はい（市外の施設）', value: 'adj_hoikushi_2', points: 2 },
    ],
  },
  {
    id: 'adj_single_working',
    category: 'adjustment',
    label: '同居者なしの母子（父子）世帯で、就労等を継続または内定していますか？',
    helpText: '就労・就学・技能習得が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_working_no', points: 0 },
      { label: 'はい', value: 'adj_single_working_yes', points: 5 },
    ],
  },
  {
    id: 'adj_leave',
    category: 'adjustment',
    label: '保護者が産前産後休業または育児休業を取得していますか？',
    helpText:
      '育児・介護休業法に基づく育児休業が加点対象です。基準日時点で保育所等に在園している場合や出産要件での入所申込の場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_no', points: 0 },
      { label: 'はい', value: 'adj_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯・中国残留邦人支援給付受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_absence',
    category: 'adjustment',
    label: '父母の不存在・長期不在にあてはまりますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_absence_no', points: 0 },
      { label: '父母の両方が不存在（死亡、行方不明など）', value: 'adj_absence_12', points: 12 },
      { label: '父母のひとりが不存在（死亡、離婚、未婚など）', value: 'adj_absence_10', points: 10 },
      { label: '父母のひとりが単身赴任、長期入院等により長期不在', value: 'adj_absence_3', points: 3 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '18歳未満の子どもが3人以上いますか？',
    helpText: '4月1日現在で判定します。3人を超える場合は1人に対し1点加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい（3人）', value: 'adj_many_children_1', points: 1 },
      { label: 'はい（4人）', value: 'adj_many_children_2', points: 2 },
      { label: 'はい（5人以上）', value: 'adj_many_children_3', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent_ok',
    category: 'adjustment',
    label: '祖父母が同居していない、または同居しているが就労・疾病・介護対象者等ですか？',
    helpText: '証明書等が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_ok_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_ok_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者の障がい・療養の状況は？',
    helpText: 'いずれか1つのみが適用されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_parent_disability_no', points: 0 },
      {
        label: '身体1・2級、精神1〜3級、療育手帳マルA〜Bのいずれかに該当',
        value: 'adj_parent_disability_3',
        points: 3,
      },
      { label: '視聴覚もしくは言語に関して身体障害者手帳3級を所持', value: 'adj_parent_disability_2', points: 2 },
      { label: '常時病臥、精神性、感染症で居宅療養している', value: 'adj_parent_disability_2b', points: 2 },
      {
        label: '同一世帯内に手帳所持者がいる（保護者及び入所申込児童を除く）',
        value: 'adj_parent_disability_1',
        points: 1,
      },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    helpText: 'いずれか1つのみが適用されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      {
        label: 'きょうだいが在園している、または同時に2人以上の申込をしている',
        value: 'adj_sibling_2',
        points: 2,
      },
      { label: '多胎児が同時に申込をしている', value: 'adj_sibling_4', points: 4 },
      { label: 'きょうだいが別施設のため同一施設に移行する転所希望', value: 'adj_sibling_5', points: 5 },
    ],
  },
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '地域型保育または2歳児クラスまでの保育所を入所期間満了で卒園しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: 'はい', value: 'adj_graduation_yes', points: 20 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設（幼稚園等含む）に預託していますか？',
    helpText:
      '就労等保育認定で月64時間以上の預託が対象です。育児休業取得中の場合は対象外です。証明書等が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい（有料で1か月以上前から預託）', value: 'adj_ninkagai_3', points: 3 },
      { label: 'はい（有料で1か月未満の預託）', value: 'adj_ninkagai_1', points: 1 },
    ],
  },
  {
    id: 'adj_transfer_in',
    category: 'adjustment',
    label: '転入に伴い市外の保育施設を退所して、市内認可保育所等に転所を希望しますか？',
    helpText: '転入前の保育所等の継続利用を希望する場合は適用されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_in_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_in_yes', points: 3 },
    ],
  },
  {
    id: 'adj_short_record',
    category: 'adjustment',
    label: '就労実績が1か月に満たない、または未記入ですか？',
    helpText:
      '従前の勤務実績（2か月以内）があり、就労状況が継続していると判断できる場合は適用されません（証明書等が必要）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_short_record_no', points: 0 },
      { label: 'はい', value: 'adj_short_record_yes', points: -2 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '入所承諾後に申請を取下げた、または入所承諾を辞退しましたか？',
    helpText: '取下げ・辞退をした年度の末まで適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -2 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望する保育所等に入所できない場合、育児休業の延長も許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -40 },
    ],
  },
  {
    id: 'adj_grandparent_ng',
    category: 'adjustment',
    label: '同居している65歳未満の祖父母等が無職、求職中、または64時間以上就労していませんか？',
    helpText: '疾病等で保育に当たることができない場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_ng_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_ng_yes', points: -10 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '在園児または卒園児の保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_arrears_no', points: 0 },
      { label: '3か月以上6か月未満の滞納がある', value: 'adj_arrears_5', points: -5 },
      { label: '6か月以上の滞納がある', value: 'adj_arrears_10', points: -10 },
      {
        label: '滞納が高額で、納付の督促等に対して誠意ある対応が見られない',
        value: 'adj_arrears_20',
        points: -20,
      },
    ],
  },
  {
    id: 'adj_outside',
    category: 'adjustment',
    label: '市外在住者ですか？',
    helpText:
      '転入予定者（入所希望月の前月末日までに八潮市へ転入し、不動産売買契約書等で引渡し日・転入日が確認できる方）は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_no', points: 0 },
      { label: 'はい（勤務地が市内）', value: 'adj_outside_5', points: -5 },
      { label: 'はい（勤務地が市外）', value: 'adj_outside_15', points: -15 },
    ],
  },
];

export const yashioData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
