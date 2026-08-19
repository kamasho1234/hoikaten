import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// ひたちなか市 保育所（園）入所の選考基準（基準指数・補正指数）データ
//
// 出典: ひたちなか市福祉部幼児保育課「令和8年度 保育所（園）入所のご案内」
//       ひたちなか市保育所（園）入所の選考基準表（令和8年4月現在）表1 基準指数／表2 補正指数
//       https://www.city.hitachinaka.lg.jp/_res/projects/default_project/_page_/001/015/703/r8_pamphlet.pdf
//       （ひたちなか市Webサイト「令和8年度保育所・保育園入所に関して」
//         https://www.city.hitachinaka.lg.jp/smile_smile/mokuteki/1006401/1005441/1015703.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             公式の基準指数は保護者ごとに最大30点で、旧データ（父母各20点）とは体系が異なる。
//
// 数値化しない規定（質問には含めない）:
//   市内の園では市内児童を優先するため、入所人数が定員を超えている場合は、転入予定・兄弟姉妹在園・
//   保護者が市内の認可保育所（園）に就労（予定）の保育士の場合を除き、他市町村からの新規での
//   児童受入れは行わない。市外児童の利用調整は市内児童の後に行う。
//
// 原典の注記（抜粋）:
//   ※1 父母が同じ自営業の場合は、一人を「自営業協力者」とする
//   ※2 親族とは、配偶者、6親等以内の血族および3親等以内の姻族をいう
//   ※5 父母のどちらか一方が求職活動の場合、区分12の加点は行わない
//   ※6 育児休業から復帰後の利用調整では加点を行わない。また区分12と重複して加点は行わない
//   ※7 介護施設等とは、特別養護老人ホーム、養護老人ホーム、介護老人保健施設、グループホーム、
//       ケアハウス、障害者施設をいう
//   ※8 18歳未満は、申請年度の4月1日時点の年齢とする
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hitachinaka',
  name: 'ひたちなか市',
  slug: 'hitachinaka',
  prefecture: '茨城県',
  maxBasePoints: 60, // 基準指数は保護者ごとに最大30点、父母合計で60点
} as const;

// ---------------------------------------------------------------------------
// 表1 基準指数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 番号1 就労（外勤・自営業中心者） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月180時間以上の就労を常態', value: `${prefix}_employment_20`, points: 20 },
  { label: '月175時間以上180時間未満の就労を常態', value: `${prefix}_employment_19`, points: 19 },
  { label: '月170時間以上175時間未満の就労を常態', value: `${prefix}_employment_18`, points: 18 },
  { label: '月165時間以上170時間未満の就労を常態', value: `${prefix}_employment_17`, points: 17 },
  { label: '月160時間以上165時間未満の就労を常態', value: `${prefix}_employment_16`, points: 16 },
  { label: '月150時間以上160時間未満の就労を常態', value: `${prefix}_employment_15`, points: 15 },
  { label: '月140時間以上150時間未満の就労を常態', value: `${prefix}_employment_14`, points: 14 },
  { label: '月120時間以上140時間未満の就労を常態', value: `${prefix}_employment_13`, points: 13 },
  { label: '月100時間以上120時間未満の就労を常態', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上100時間未満の就労を常態', value: `${prefix}_employment_11`, points: 11 },
];

/** 番号1 就労（自営業協力者） */
const familyWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_family_none`, points: 0 },
  { label: '月180時間以上の就労を常態', value: `${prefix}_family_17`, points: 17 },
  { label: '月175時間以上180時間未満の就労を常態', value: `${prefix}_family_16`, points: 16 },
  { label: '月170時間以上175時間未満の就労を常態', value: `${prefix}_family_15`, points: 15 },
  { label: '月165時間以上170時間未満の就労を常態', value: `${prefix}_family_14`, points: 14 },
  { label: '月160時間以上165時間未満の就労を常態', value: `${prefix}_family_13`, points: 13 },
  { label: '月150時間以上160時間未満の就労を常態', value: `${prefix}_family_12`, points: 12 },
  { label: '月140時間以上150時間未満の就労を常態', value: `${prefix}_family_11`, points: 11 },
  { label: '月120時間以上140時間未満の就労を常態', value: `${prefix}_family_10`, points: 10 },
  { label: '月100時間以上120時間未満の就労を常態', value: `${prefix}_family_9`, points: 9 },
  { label: '月64時間以上100時間未満の就労を常態', value: `${prefix}_family_8`, points: 8 },
];

/** 番号1 就労（内職） */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月120時間以上の就労を常態', value: `${prefix}_homework_10`, points: 10 },
  { label: '月64時間以上120時間未満の就労を常態', value: `${prefix}_homework_6`, points: 6 },
];

/** 番号2 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡、離別、行方不明、拘禁、別居', value: `${prefix}_absence_20`, points: 20 },
];

/** 番号3 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '予定日を含む産前2か月、産後2か月', value: `${prefix}_childbirth_7`, points: 7 },
];

/** 番号4 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'おおむね1か月以上の入院', value: `${prefix}_illness_25`, points: 25 },
  {
    label: '自宅内療養（精神性）：精神障害者保健福祉手帳1〜2級程度',
    value: `${prefix}_illness_20`,
    points: 20,
  },
  {
    label: '自宅内療養（精神性）：精神障害者保健福祉手帳3級程度',
    value: `${prefix}_illness_16a`,
    points: 16,
  },
  { label: '自宅内療養（精神性）：上記以外の程度', value: `${prefix}_illness_13`, points: 13 },
  {
    label: '自宅内療養（一般）：身動きがとれず安静を要する状態',
    value: `${prefix}_illness_19`,
    points: 19,
  },
  {
    label: '自宅内療養（一般）：通院加療のために保育に当たれない',
    value: `${prefix}_illness_16b`,
    points: 16,
  },
];

/** 番号4 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳の等級が1級または2級', value: `${prefix}_disability_20a`, points: 20 },
  { label: '身体障害者手帳の等級が3級', value: `${prefix}_disability_17a`, points: 17 },
  { label: '身体障害者手帳の等級が4級以下', value: `${prefix}_disability_15a`, points: 15 },
  { label: '療育手帳がマルAまたはA', value: `${prefix}_disability_20b`, points: 20 },
  { label: '療育手帳がB', value: `${prefix}_disability_17b`, points: 17 },
  { label: '療育手帳がC', value: `${prefix}_disability_15b`, points: 15 },
];

/** 番号5 看護・介護・付添 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '施設内：兄弟姉妹が長期入院しており、常時付添いが必要',
    value: `${prefix}_care_25a`,
    points: 25,
  },
  {
    label: '施設内：保護者が長期入院しており、常時付添いが必要',
    value: `${prefix}_care_25b`,
    points: 25,
  },
  {
    label: '施設内：保護者以外の親族が長期入院しており、常時付添いが必要',
    value: `${prefix}_care_13`,
    points: 13,
  },
  {
    label: '自宅内：同居する親族の介護に常時あたっている（要介護4程度以上）',
    value: `${prefix}_care_19`,
    points: 19,
  },
  {
    label: '自宅内：同居する親族の介護に常時あたっている（要介護1〜3程度以上）',
    value: `${prefix}_care_15`,
    points: 15,
  },
  {
    label: '自宅内：同居する親族の介護に常時あたっている（要支援）',
    value: `${prefix}_care_10`,
    points: 10,
  },
  {
    label: '自宅内：同居する心身障害者の介護に常時あたっている（通園児の付添いを含む）',
    value: `${prefix}_care_18`,
    points: 18,
  },
  { label: '自宅内：上記以外で必要とする場合', value: `${prefix}_care_8`, points: 8 },
  { label: '自宅外：上記以外で必要とする場合', value: `${prefix}_care_7`, points: 7 },
];

/** 番号6 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '災害・風水害等により家屋が失われ復旧にあたる',
    value: `${prefix}_disaster_20`,
    points: 20,
  },
];

/** 番号7 求職活動・起業準備 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '現在無職で、児童を入所させ求職活動・起業準備を行う',
    value: `${prefix}_jobseeking_3`,
    points: 3,
  },
];

/** 番号8 就学・技能取得 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学を常態', value: `${prefix}_education_17`, points: 17 },
  { label: '月140時間以上160時間未満の就学を常態', value: `${prefix}_education_16`, points: 16 },
  { label: '月120時間以上140時間未満の就学を常態', value: `${prefix}_education_14`, points: 14 },
  { label: '月100時間以上120時間未満の就学を常態', value: `${prefix}_education_13`, points: 13 },
  { label: '月80時間以上100時間未満の就学を常態', value: `${prefix}_education_11`, points: 11 },
  { label: '月64時間以上80時間未満の就学を常態', value: `${prefix}_education_9`, points: 9 },
];

/** 番号9 DV・虐待 */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '子ども・子育て支援法施行規則第1条の5第8号に該当する',
    value: `${prefix}_abuse_30`,
    points: 30,
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
      { label: '就労（外勤・自営業中心者）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就労（自営業協力者）', value: `${prefix}_reason_family`, points: 0 },
      { label: '就労（内職）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absence`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '看護・介護・付添', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動・起業準備', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・技能取得', value: `${prefix}_reason_education`, points: 0 },
      { label: 'DV・虐待', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労（外勤・自営業中心者）の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_family`,
      category,
      label: `${parentLabel}の就労（自営業協力者）の状況は？`,
      helpText: '父母が同じ自営業の場合は、一人を「自営業協力者」とします',
      inputType: 'radio',
      options: familyWorkOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: homeWorkOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在に該当しますか？`,
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
      label: `${parentLabel}の看護・介護・付添の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動・起業準備をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・技能取得の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}はDV・虐待に該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 表2 補正指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護による生活扶助を受けていますか？',
    helpText: '区分1',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 7 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '兄弟姉妹が入所中の施設への入所を第一希望としますか？',
    helpText:
      'やむを得ず在園している認可保育所（園）以外を合わせて希望する場合も含みます（区分2）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 15 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '新規入所申請児童が同時に2人以上で、同じ施設のみへの入所を希望しますか？',
    helpText: '区分3・4',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 3 },
      { label: 'はい（多胎児）', value: 'adj_sibling_simultaneous_twins', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_not_applied',
    category: 'adjustment',
    label: '就学前児の兄弟姉妹がいるのに申込みをしませんか？',
    helpText: '障害児・幼稚園児等を除きます（区分5、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_not_applied_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_not_applied_yes', points: -5 },
    ],
  },
  {
    id: 'adj_sibling_merge_transfer',
    category: 'adjustment',
    label: '兄弟姉妹が別々の認可保育所（園）に入所しており、どちらか片方に転園を希望しますか？',
    helpText: '区分6',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_merge_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_merge_transfer_yes', points: 10 },
    ],
  },
  {
    id: 'adj_private_transfer',
    category: 'adjustment',
    label: '保育方針が合わないなどの私的な理由で他の保育所（園）に転園を希望しますか？',
    helpText: '既に市内の認可保育所（園）に入所中の場合（区分7、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_private_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_private_transfer_yes', points: -10 },
    ],
  },
  {
    id: 'adj_facility_reorganization',
    category: 'adjustment',
    label: '施設の統廃合等に伴う転園・入所を希望しますか？',
    helpText: '区分8・9',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_facility_reorganization_no', points: 0 },
      {
        label: '在園中の市内認可保育施設の統廃合等に伴い、後継施設以外に転園を希望する',
        value: 'adj_facility_reorganization_20',
        points: 20,
      },
      {
        label: '在園中の市内認可外保育施設の統廃合等に伴い、後継施設とみなされる認可保育所（園）に入所を希望する',
        value: 'adj_facility_reorganization_12',
        points: 12,
      },
    ],
  },
  {
    id: 'adj_small_facility_graduate',
    category: 'adjustment',
    label: '市内の特定地域型保育を利用中で、その課程終了後に連携園への転園を希望しますか？',
    helpText: '区分10',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_facility_graduate_yes', points: 15 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '勤務の都合で父母の一方が単身赴任していますか？',
    helpText: '就労証明書に基づきます（区分11）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設（届出済）・一時預かり・緊急保育を利用していますか？',
    helpText:
      '父母のどちらか一方が求職活動の場合、加点は行われません。区分16と重複して加点は行われません（区分12）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 5 },
    ],
  },
  {
    id: 'adj_other_city_enrolled',
    category: 'adjustment',
    label: '本市在住もしくは転入予定で、他市町村の認可保育施設に入所中ですか？',
    helpText: '区分13',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_city_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_other_city_enrolled_yes', points: 8 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童に障害や疾病等があり、集団生活が必要と客観的に認められますか？',
    helpText: 'その可能性がある場合も含みます（区分14）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者が障害者手帳を取得していて、就労（見込）または求職活動中ですか？',
    helpText: '身体障害者手帳・精神障害者保健福祉手帳・療育手帳等（区分15）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      { label: 'はい', value: 'adj_parent_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '産休・育児休業明けに伴う職場復帰ですか？',
    helpText:
      '就労証明書兼育児休業証明書に基づきます。育児休業から復帰後の利用調整では加点されません（区分16）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: 'はい', value: 'adj_return_from_leave_yes', points: 5 },
    ],
  },
  {
    id: 'adj_childcare_worker_p1',
    category: 'adjustment',
    label: '保護者1は市内の認可保育所（園）に勤務（予定を含む）していますか？',
    helpText: '保育体制の確保上必要である場合が対象です（区分17〜20）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_p1_no', points: 0 },
      { label: 'はい（保育士・看護師・保健師）', value: 'adj_childcare_worker_p1_20', points: 20 },
      {
        label: 'はい（施設長・栄養士・保育補助者）',
        value: 'adj_childcare_worker_p1_5',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_childcare_worker_p2',
    category: 'adjustment',
    label: '保護者2は市内の認可保育所（園）に勤務（予定を含む）していますか？',
    helpText: '保育体制の確保上必要である場合が対象です（区分17〜20）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_p2_no', points: 0 },
      { label: 'はい（保育士・看護師・保健師）', value: 'adj_childcare_worker_p2_20', points: 20 },
      {
        label: 'はい（施設長・栄養士・保育補助者）',
        value: 'adj_childcare_worker_p2_5',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '母子・父子世帯ですか？',
    helpText: '区分21〜23',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: '母子・父子世帯', value: 'adj_single_parent_8', points: 8 },
      {
        label: '母子・父子世帯に準ずる世帯（離婚調停中かつ別居、失踪、行方不明、拘禁）',
        value: 'adj_single_parent_6',
        points: 6,
      },
      { label: '父母ともに失踪・死亡している', value: 'adj_single_parent_20', points: 20 },
    ],
  },
  {
    id: 'adj_grandparent_paternal',
    category: 'adjustment',
    label: '父方の祖父母（市内在住65歳未満）は保育の期待ができますか？',
    helpText: '区分24・26・28・30（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_paternal_no', points: 0 },
      { label: '無職・健康で保育の期待ができる（同居）', value: 'adj_grandparent_paternal_7', points: -7 },
      { label: '無職・健康で保育の期待ができる（別居）', value: 'adj_grandparent_paternal_5a', points: -5 },
      {
        label: '週1〜2回の就労のため保育の期待ができる（同居）',
        value: 'adj_grandparent_paternal_5b',
        points: -5,
      },
      {
        label: '週1〜2回の就労のため保育の期待ができる（別居）',
        value: 'adj_grandparent_paternal_3',
        points: -3,
      },
    ],
  },
  {
    id: 'adj_grandparent_maternal',
    category: 'adjustment',
    label: '母方の祖父母（市内在住65歳未満）は保育の期待ができますか？',
    helpText: '区分25・27・29・31（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_maternal_no', points: 0 },
      { label: '無職・健康で保育の期待ができる（同居）', value: 'adj_grandparent_maternal_7', points: -7 },
      { label: '無職・健康で保育の期待ができる（別居）', value: 'adj_grandparent_maternal_5a', points: -5 },
      {
        label: '週1〜2回の就労のため保育の期待ができる（同居）',
        value: 'adj_grandparent_maternal_5b',
        points: -5,
      },
      {
        label: '週1〜2回の就労のため保育の期待ができる（別居）',
        value: 'adj_grandparent_maternal_3',
        points: -3,
      },
    ],
  },
  {
    id: 'adj_grandfather_paternal_absent',
    category: 'adjustment',
    label: '父方の祖父は不在ですか？',
    helpText:
      '介護施設等とは特別養護老人ホーム、養護老人ホーム、介護老人保健施設、グループホーム、ケアハウス、障害者施設をいいます（区分32・33）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandfather_paternal_absent_no', points: 0 },
      {
        label: '離別、または本市および隣接市町村以外に在住、または介護施設等に常時入所中',
        value: 'adj_grandfather_paternal_absent_1',
        points: 1,
      },
      { label: '死別・失踪している', value: 'adj_grandfather_paternal_absent_2', points: 2 },
    ],
  },
  {
    id: 'adj_grandmother_paternal_absent',
    category: 'adjustment',
    label: '父方の祖母は不在ですか？',
    helpText: '区分34・35',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandmother_paternal_absent_no', points: 0 },
      {
        label: '離別、または本市および隣接市町村以外に在住、または介護施設等に常時入所中',
        value: 'adj_grandmother_paternal_absent_1',
        points: 1,
      },
      { label: '死別・失踪している', value: 'adj_grandmother_paternal_absent_2', points: 2 },
    ],
  },
  {
    id: 'adj_grandfather_maternal_absent',
    category: 'adjustment',
    label: '母方の祖父は不在ですか？',
    helpText: '区分36・37',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandfather_maternal_absent_no', points: 0 },
      {
        label: '離別、または本市および隣接市町村以外に在住、または介護施設等に常時入所中',
        value: 'adj_grandfather_maternal_absent_1',
        points: 1,
      },
      { label: '死別・失踪している', value: 'adj_grandfather_maternal_absent_2', points: 2 },
    ],
  },
  {
    id: 'adj_grandmother_maternal_absent',
    category: 'adjustment',
    label: '母方の祖母は不在ですか？',
    helpText: '区分38・39',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandmother_maternal_absent_no', points: 0 },
      {
        label: '離別、または本市および隣接市町村以外に在住、または介護施設等に常時入所中',
        value: 'adj_grandmother_maternal_absent_1',
        points: 1,
      },
      { label: '死別・失踪している', value: 'adj_grandmother_maternal_absent_2', points: 2 },
    ],
  },
  {
    id: 'adj_false_application',
    category: 'adjustment',
    label: '過去に虚偽の申請をしていましたか？',
    helpText: '保育所（園）入所申込みの際（区分40、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_false_application_no', points: 0 },
      { label: 'はい', value: 'adj_false_application_yes', points: -10 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '18歳未満で未就労の子どもは何人いますか？',
    helpText: '18歳未満は申請年度の4月1日時点の年齢とします（区分41〜44）',
    inputType: 'radio',
    options: [
      { label: '1人以下', value: 'adj_many_children_none', points: 0 },
      { label: '2人', value: 'adj_many_children_2', points: 1 },
      { label: '3人', value: 'adj_many_children_3', points: 2 },
      { label: '4人', value: 'adj_many_children_4', points: 3 },
      { label: '5人以上', value: 'adj_many_children_5', points: 4 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const hitachinakaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
