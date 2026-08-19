import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 桑名市 保育施設等利用調整基準（基本指数・調整指数）データ
//
// 出典: 桑名市子ども未来課「桑名市保育施設等利用調整基準」（令和9年度入所（園）募集）
//       https://www.city.kuwana.lg.jp/documents/12449/19hoikusiseturiyoukijyunn.pdf
//       （桑名市Webサイト「令和9年度の保育施設入所（園）募集について」
//         https://www.city.kuwana.lg.jp/hoiku/kosodatekyouiku/kosodate/2026r9b.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//
// 原典の考え方:
//   「父母の保育を必要とする事由・状況に応じて基本指数を指数付けし、その父母の指数の合算を
//     基本指数とします」「同一人に複数の要件(類型)があっても、異なる要件(類型)の指数を
//     合算することはありません」
//   「利用調整における『就労時間』には休憩時間を含み、通勤時間、時間外勤務は除きます」
//   ひとり親世帯・ひとり親に準ずる世帯・海外単身赴任世帯は、当該保護者の指数と20点との
//   合算を基本指数とする扱いのため、本シミュレーターでは保護者2を「20点相当」として
//   入力する形になる（調整指数のひとり親加点10点とは別）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kuwana',
  name: '桑名市',
  slug: 'kuwana',
  prefecture: '三重県',
  maxBasePoints: 40, // 父母各20点（社会的養護40点は例外的な類型）
} as const;

// ---------------------------------------------------------------------------
// 1. 基本指数（保護者の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労（被用者、および非被用者のうち中心者＝事業主・法人経営者） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上（週5日以上）・1日9時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月20日以上（週5日以上）・1日8時間以上', value: `${prefix}_employment_19`, points: 19 },
  { label: '月20日以上（週5日以上）・1日7時間以上', value: `${prefix}_employment_18`, points: 18 },
  { label: '月20日以上（週5日以上）・1日6時間以上', value: `${prefix}_employment_17`, points: 17 },
  { label: '月20日以上（週5日以上）・1日5時間以上', value: `${prefix}_employment_15`, points: 15 },
  { label: '月20日以上（週5日以上）・1日3時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '月16日以上（週4日以上）・1日9時間以上', value: `${prefix}_employment_16d_18`, points: 18 },
  { label: '月16日以上（週4日以上）・1日8時間以上', value: `${prefix}_employment_16d_17`, points: 17 },
  { label: '月16日以上（週4日以上）・1日6時間以上', value: `${prefix}_employment_16d_14`, points: 14 },
  { label: '月16日以上（週4日以上）・1日3時間45分以上', value: `${prefix}_employment_16d_11`, points: 11 },
  { label: '月12日以上（週3日以上）・1日9時間以上', value: `${prefix}_employment_12d_15`, points: 15 },
  { label: '月12日以上（週3日以上）・1日8時間以上', value: `${prefix}_employment_12d_13`, points: 13 },
  { label: '月12日以上（週3日以上）・1日5時間以上', value: `${prefix}_employment_12d_10`, points: 10 },
  { label: '上記以外で月60時間以上勤務', value: `${prefix}_employment_other_10`, points: 10 },
];

/** 就労（非被用者の協力者・内職）。中心者より1点低い体系 */
const employmentHelperOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_helper_none`, points: 0 },
  { label: '月20日以上（週5日以上）・1日9時間以上', value: `${prefix}_helper_19`, points: 19 },
  { label: '月20日以上（週5日以上）・1日8時間以上', value: `${prefix}_helper_18`, points: 18 },
  { label: '月20日以上（週5日以上）・1日7時間以上', value: `${prefix}_helper_17`, points: 17 },
  { label: '月20日以上（週5日以上）・1日6時間以上', value: `${prefix}_helper_16`, points: 16 },
  { label: '月20日以上（週5日以上）・1日5時間以上', value: `${prefix}_helper_14`, points: 14 },
  { label: '月20日以上（週5日以上）・1日3時間以上', value: `${prefix}_helper_11`, points: 11 },
  { label: '月16日以上（週4日以上）・1日9時間以上', value: `${prefix}_helper_16d_17`, points: 17 },
  { label: '月16日以上（週4日以上）・1日8時間以上', value: `${prefix}_helper_16d_16`, points: 16 },
  { label: '月16日以上（週4日以上）・1日6時間以上', value: `${prefix}_helper_16d_13`, points: 13 },
  { label: '月16日以上（週4日以上）・1日3時間45分以上', value: `${prefix}_helper_16d_10`, points: 10 },
  { label: '月12日以上（週3日以上）・1日9時間以上', value: `${prefix}_helper_12d_14`, points: 14 },
  { label: '月12日以上（週3日以上）・1日8時間以上', value: `${prefix}_helper_12d_12`, points: 12 },
  { label: '月12日以上（週3日以上）・1日5時間以上', value: `${prefix}_helper_12d_9`, points: 9 },
  { label: '上記以外で月60時間以上勤務', value: `${prefix}_helper_other_9`, points: 9 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後で保育できない', value: `${prefix}_childbirth_14`, points: 14 },
];

/** 疾病負傷 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（概ね1か月以上）', value: `${prefix}_illness_20`, points: 20 },
  {
    label: '居宅内：常時寝たきりで保育が困難と医師が診断（概ね1か月以上）',
    value: `${prefix}_illness_home_20`,
    points: 20,
  },
  {
    label: '居宅内：上記以外の一般療養で保育が困難と医師が診断（概ね1か月以上）',
    value: `${prefix}_illness_home_12`,
    points: 12,
  },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体1・2級、療育A1〜B1（1〜3度）、障害者手帳1〜3級で保育が困難と医師が診断',
    value: `${prefix}_disability_20`,
    points: 20,
  },
  { label: '身体3級、療育B2（4度）で保育が困難と医師が診断', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体4級〜6級で保育が困難と医師が診断', value: `${prefix}_disability_12`, points: 12 },
];

/** 同居親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '常時寝たきり（入所・入院含む）の看護介護が常態、または要介護4以上の親族を介護（概ね1か月以上）',
    value: `${prefix}_care_20`,
    points: 20,
  },
  { label: '要介護3の親族を介護（概ね1か月以上）', value: `${prefix}_care_16`, points: 16 },
  { label: '上記以外に親族の常時介護・看護が必要（概ね1か月以上）', value: `${prefix}_care_12`, points: 12 },
];

/** 別居親族の介護・看護（2親等以内。同居親族の介護・看護から1点減） */
const careOutsideOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_careout_none`, points: 0 },
  {
    label: '常時寝たきり（入所・入院含む）の看護介護が常態、または要介護4以上の親族を介護',
    value: `${prefix}_careout_19`,
    points: 19,
  },
  { label: '要介護3の親族を介護', value: `${prefix}_careout_15`, points: 15 },
  { label: '上記以外に親族の常時介護・看護が必要', value: `${prefix}_careout_11`, points: 11 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害等による家屋の損傷その他災害復旧のため保育できない', value: `${prefix}_disaster_20`, points: 20 },
];

/** 社会的養護 */
const socialCareOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_social_none`, points: 0 },
  { label: '社会的養護が必要', value: `${prefix}_social_40`, points: 40 },
];

/** 就学（非被用者の協力者の指数から、授業時間に応じて1点減） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上（週5日以上）・1日9時間以上', value: `${prefix}_education_18`, points: 18 },
  { label: '月20日以上（週5日以上）・1日8時間以上', value: `${prefix}_education_17`, points: 17 },
  { label: '月20日以上（週5日以上）・1日7時間以上', value: `${prefix}_education_16`, points: 16 },
  { label: '月20日以上（週5日以上）・1日6時間以上', value: `${prefix}_education_15`, points: 15 },
  { label: '月20日以上（週5日以上）・1日5時間以上', value: `${prefix}_education_13`, points: 13 },
  { label: '月20日以上（週5日以上）・1日3時間以上', value: `${prefix}_education_10`, points: 10 },
  { label: '月16日以上（週4日以上）・1日9時間以上', value: `${prefix}_education_16d_16`, points: 16 },
  { label: '月16日以上（週4日以上）・1日8時間以上', value: `${prefix}_education_16d_15`, points: 15 },
  { label: '月16日以上（週4日以上）・1日6時間以上', value: `${prefix}_education_16d_12`, points: 12 },
  { label: '月16日以上（週4日以上）・1日3時間45分以上', value: `${prefix}_education_16d_9`, points: 9 },
  { label: '月12日以上（週3日以上）・1日9時間以上', value: `${prefix}_education_12d_13`, points: 13 },
  { label: '月12日以上（週3日以上）・1日8時間以上', value: `${prefix}_education_12d_11`, points: 11 },
  { label: '月12日以上（週3日以上）・1日5時間以上', value: `${prefix}_education_12d_8`, points: 8 },
  { label: '上記以外で月60時間以上', value: `${prefix}_education_other_8`, points: 8 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動・起業準備のため昼間外出を常態としている（生計中心者）', value: `${prefix}_jobseeking_8`, points: 8 },
  { label: '求職活動・起業準備のため昼間外出を常態としている（その他）', value: `${prefix}_jobseeking_6`, points: 6 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください。異なる類型の指数を合算することはありません',
    inputType: 'select',
    options: [
      {
        label: '仕事をしている（会社員・パート等、または自営の事業主・法人経営者）',
        value: `${prefix}_reason_employment`,
        points: 0,
      },
      { label: '仕事をしている（自営の協力者・内職）', value: `${prefix}_reason_helper`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・けがの療養中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '別居親族の介護・看護をしている', value: `${prefix}_reason_careout`, points: 0 },
      { label: '災害の復旧に当たっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '社会的養護が必要', value: `${prefix}_reason_social`, points: 0 },
      { label: '学校等に通学・通所している', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職活動・起業準備をしている', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の勤務日数と1日の就労時間は？`,
      helpText: '就労時間には休憩時間を含み、通勤時間・時間外勤務は除きます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_helper`,
      category,
      label: `${parentLabel}（自営の協力者・内職）の勤務日数と1日の就労時間は？`,
      helpText: '自営業・農業・漁業の協力者、および内職が対象です。事業主・法人経営者は前の設問でお選びください',
      inputType: 'radio',
      options: employmentHelperOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '認定期間は最長5か月です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・けがの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      helpText: '手帳の交付を受けており、保育が困難と医師が診断した場合が対象です',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_careout`,
      category,
      label: `${parentLabel}の別居親族の介護・看護の状況は？`,
      helpText: '2親等以内の別居の親族（長期入院等をしている親族を含む）を常時、介護又は看護している場合が対象です',
      inputType: 'radio',
      options: careOutsideOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_social`,
      category,
      label: `${parentLabel}は社会的養護が必要な状況ですか？`,
      inputType: 'radio',
      options: socialCareOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の通学・通所の日数と時間は？`,
      helpText: '学校教育法に定める学校（本科生）、子ども・子育て支援法施行規則第1条第7号ロに規定される学校・施設が対象です',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      helpText: '認定期間は認定から90日経過月の月末までです',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2. 調整指数（保護者単位・世帯単位・児童単位）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  // --- 保護者単位 ---
  {
    id: 'adj_continuous_work',
    category: 'adjustment',
    label: '引き続き月60時間以上の就労を継続していますか？',
    helpText: '3か月以上の継続が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_continuous_work_no', points: 0 },
      { label: 'はい', value: 'adj_continuous_work_yes', points: 1 },
    ],
  },
  {
    id: 'adj_work_mismatch',
    category: 'adjustment',
    label: '就労の証明内容と勤務実績・収入実績に食い違いがありますか？',
    helpText: '収入実績は最低賃金を基に算定されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_mismatch_no', points: 0 },
      { label: 'はい', value: 'adj_work_mismatch_yes', points: -4 },
    ],
  },
  {
    id: 'adj_commute',
    category: 'adjustment',
    label: '保護者の通勤時間（往復）はどのくらいですか？',
    helpText:
      '保護者が複数いる場合は、通勤時間が短い保護者を基準とします。3交代勤務などの変則勤務で一般的に送迎が不可能な場合は除きます',
    inputType: 'radio',
    options: [
      { label: '1時間未満', value: 'adj_commute_0', points: 0 },
      { label: '1時間以上2時間未満', value: 'adj_commute_1', points: 1 },
      { label: '2時間以上', value: 'adj_commute_2', points: 2 },
    ],
  },
  // --- 世帯単位 ---
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText:
      'ひとり親世帯・ひとり親に準ずる世帯・海外単身赴任世帯は、この加点とは別に、基本指数が「該当する保護者の指数＋20点」として計算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'ひとり親世帯', value: 'adj_single_parent_yes', points: 10 },
      { label: 'ひとり親に準ずる世帯（行方不明・拘禁中・離婚調停中）', value: 'adj_single_parent_junzuru', points: 3 },
    ],
  },
  {
    id: 'adj_overseas',
    category: 'adjustment',
    label: '保護者が海外へ単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_overseas_no', points: 0 },
      { label: 'はい', value: 'adj_overseas_yes', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で就労による自立支援が見込まれますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_moving_in',
    category: 'adjustment',
    label: '転入予定者として入所申込みをしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_moving_in_no', points: 0 },
      { label: 'はい', value: 'adj_moving_in_yes', points: -1 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_arrears_no', points: 0 },
      { label: '2か月滞納している', value: 'adj_arrears_2', points: -6 },
      { label: '3か月以上滞納している', value: 'adj_arrears_3', points: -8 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が桑名市内の保育施設等で保育士として就労していますか？',
    helpText:
      '月120時間以上の就労中又は就労予定（育児休業復帰予定を含む）で、児童が保育施設等を利用しないと就労先の受け入れ態勢に支障があると認められる場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 5 },
    ],
  },
  // --- 児童単位 ---
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '年齢上限のある保育施設等からの転園、または在籍施設の廃止による申込みですか？',
    helpText: '年齢上限のある施設からの転園は、最終年齢クラス在籍児童のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    helpText: '3人目以上は1人増えるごとに全員に1点が加点されます。3つの区分は重複しません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      {
        label: 'きょうだいが複数の施設に分かれており、転園により同一施設を利用する',
        value: 'adj_sibling_unify',
        points: 10,
      },
      { label: 'きょうだいが既に入所している施設に入所申込をする', value: 'adj_sibling_same', points: 10 },
      { label: 'きょうだい同時に新規申込をする', value: 'adj_sibling_new', points: 5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業からの復帰にともなう申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      {
        label: '育休取得で一度退園し、退園した児童と育休にかかわる児童を同時に申し込む',
        value: 'adj_leave_return_14',
        points: 14,
      },
      { label: '育児休業終了に伴い、就労により申し込む', value: 'adj_leave_return_6', points: 6 },
    ],
  },
  {
    id: 'adj_leave_mid_year',
    category: 'adjustment',
    label: '育児休業中で、年度途中に復帰する予定ですか？',
    helpText:
      '育休中の保護者が現に監護している就学前の子（育休対象児を除く）が年度の初日に満4歳以上（4月2日生まれは満5歳）であり、その年度の末日より前に育休が終了する場合、基本指数が就労の指数から1点減となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_mid_year_no', points: 0 },
      { label: 'はい', value: 'adj_leave_mid_year_yes', points: -1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童は集団保育が可能な障害児ですか？',
    helpText: '年度の初日において満3歳以上（4月2日生まれは満4歳）が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_work_with_child',
    category: 'adjustment',
    label: '保護者が就労しながら児童を保育していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_with_child_no', points: 0 },
      { label: 'はい', value: 'adj_work_with_child_yes', points: -1 },
    ],
  },
  {
    id: 'adj_relative_at_home',
    category: 'adjustment',
    label: '児童の保育が可能な65歳未満の同居親族が昼間に居宅内にいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_at_home_no', points: 0 },
      { label: 'はい', value: 'adj_relative_at_home_yes', points: -2 },
    ],
  },
  {
    id: 'adj_inspected_facility',
    category: 'adjustment',
    label: '検査等を実施した保育施設等からの転園ですか？',
    helpText: '子ども・子育て支援法第38条第1項の規定に基づく検査等を実施した施設からの転園が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_inspected_facility_no', points: 0 },
      { label: 'はい', value: 'adj_inspected_facility_yes', points: 10 },
    ],
  },
];

export const kuwanaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
