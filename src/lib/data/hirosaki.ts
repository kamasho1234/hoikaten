import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 弘前市 教育・保育施設及び地域型保育事業の利用調整基準（基準指数・調整指数）データ
//
// 出典: 弘前市こども家庭課「保育所等利用のご案内」利用調整基準（25〜26ページ）
//       https://www.city.hirosaki.aomori.jp/kyouiku/kosodate/files/R6_hoikuengoannai.pdf
//       （弘前市Webサイト「認定こども園・幼稚園・保育所の利用について」
//         https://www.city.hirosaki.aomori.jp/kyouiku/kosodate/27.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基準指数は父母それぞれ最大10点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の構成: 基準指数A（父・母それぞれ）＋調整指数B ＝ 合計指数 A+B
//
// 数値化しない規定（別途判断のため質問には含めない）:
//   基準指数「その他」保護者の状況が上記項目に類するため、保育の必要性があると市長が認めた場合
//     （当該児童・世帯の状況に応じて別途判断する）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hirosaki',
  name: '弘前市',
  slug: 'hirosaki',
  prefecture: '青森県',
  maxBasePoints: 20, // 基準指数は父母それぞれ最大10点、合計で20点
} as const;

// ---------------------------------------------------------------------------
// 基準指数A。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労（外勤・自営・農業。自営業専従者および家族従事者を含む） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上の勤務に従事', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120時間以上160時間未満の勤務に従事', value: `${prefix}_employment_9`, points: 9 },
  { label: '月64時間以上120時間未満の勤務に従事', value: `${prefix}_employment_8`, points: 8 },
  { label: '月48時間以上64時間未満の勤務に従事', value: `${prefix}_employment_7`, points: 7 },
];

/** 就労（内職） */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月160時間以上の勤務に従事', value: `${prefix}_homework_7`, points: 7 },
  { label: '月120時間以上160時間未満の勤務に従事', value: `${prefix}_homework_6`, points: 6 },
  { label: '月64時間以上120時間未満の勤務に従事', value: `${prefix}_homework_5`, points: 5 },
  { label: '月48時間以上64時間未満の勤務に従事', value: `${prefix}_homework_4`, points: 4 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '母が出産のため、準備または休養を要する（死産含む）',
    value: `${prefix}_childbirth_8`,
    points: 8,
  },
];

/** 保護者の疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '1か月以上の入院が必要（自宅での安静期間含む）',
    value: `${prefix}_illness_10a`,
    points: 10,
  },
  { label: '居宅内で常時病臥', value: `${prefix}_illness_10b`, points: 10 },
  {
    label: '上記のほか、医師の診断により子どもの保育が困難と認められる',
    value: `${prefix}_illness_8`,
    points: 8,
  },
];

/** 保護者の障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障害者手帳1級〜2級、精神保健福祉手帳1級〜2級または愛護手帳該当者',
    value: `${prefix}_disability_10`,
    points: 10,
  },
  {
    label: '身体障害者手帳3級、精神保健福祉手帳3級該当者',
    value: `${prefix}_disability_8`,
    points: 8,
  },
];

/** 同居親族等の疾病・看護（介護・看護） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の保育が困難', value: `${prefix}_care_9`, points: 9 },
  { label: '月120時間以上160時間未満の保育が困難', value: `${prefix}_care_8`, points: 8 },
  { label: '月64時間以上120時間未満の保育が困難', value: `${prefix}_care_7`, points: 7 },
  { label: '月48時間以上64時間未満の保育が困難', value: `${prefix}_care_6`, points: 6 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災・風水害・火災等の災害により自宅や近隣の復旧に当たっている',
    value: `${prefix}_disaster_10`,
    points: 10,
  },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '継続的な求職活動または起業準備のため、日中外出の状態にある',
    value: `${prefix}_jobseeking_1`,
    points: 1,
  },
];

/** 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の保育が困難', value: `${prefix}_education_8`, points: 8 },
  { label: '月120時間以上160時間未満の保育が困難', value: `${prefix}_education_7`, points: 7 },
  { label: '月64時間以上120時間未満の保育が困難', value: `${prefix}_education_6`, points: 6 },
  { label: '月48時間以上64時間未満の保育が困難', value: `${prefix}_education_5`, points: 5 },
];

/** 虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '児童相談所等の情報により、虐待・DVの可能性がある',
    value: `${prefix}_abuse_10`,
    points: 10,
  },
];

/** その他（不存在） */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label: '死別、離別、拘禁等でその児童と起居を共にしていない',
    value: `${prefix}_absence_10`,
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
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '就労（外勤・自営・農業）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就労（内職）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '保護者の障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族等の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
      { label: 'その他（不存在）', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労（外勤・自営・農業）の状況は？`,
      helpText: '自営業専従者および家族従事者を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: homeWorkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
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
      helpText:
        '長期入院者、常時病臥者、心身障がい者（児）の介護や入院・通院・通所の付き添いのため保育が困難な時間数を選んでください',
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
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      helpText:
        '国・都道府県・市町村設置の訓練施設またはこれに準ずる技能施設への通所、もしくは学校教育法に定める学校等への通学が対象です',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVの可能性に該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は児童と起居を共にしていませんか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数B（番号1〜21）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯または両親不存在の世帯ですか？',
    helpText: '番号1',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '父母のどちらかが単身赴任中ですか？',
    helpText: '番号2',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '番号3',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳以下で養育可能な扶養義務者と同居していますか？',
    helpText: '就労しておらず健康に問題がない場合が対象です（番号4、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -1 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '同居親族が身体障害者手帳・精神障害者保健福祉手帳1〜2級、愛護手帳の交付を受けていますか？',
    helpText: '申込児童・保護者以外の親族が対象です（番号5）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_no', points: 0 },
      { label: 'はい', value: 'adj_family_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_recent_divorce',
    category: 'adjustment',
    label: '離婚・死別などの直後で、自立を促進する必要があると認められますか？',
    helpText: '番号6',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_recent_divorce_no', points: 0 },
      { label: 'はい', value: 'adj_recent_divorce_yes', points: 2 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園ですか？',
    helpText: '1号認定から2号認定への申請も含みます（番号7、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: -1 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '産後休暇・育児休業明けによる職場復帰ですか？',
    helpText: '入所希望日の前後1か月半が対象です。保護者1名につき加点されます（番号8・9）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: '職場復帰する（保護者1名）', value: 'adj_return_from_leave_3', points: 3 },
      { label: '職場復帰する（保護者2名）', value: 'adj_return_from_leave_6', points: 6 },
      {
        label: '職場復帰に準ずる復帰をする（保護者1名）',
        value: 'adj_return_from_leave_2',
        points: 2,
      },
      {
        label: '職場復帰に準ずる復帰をする（保護者2名）',
        value: 'adj_return_from_leave_4',
        points: 4,
      },
    ],
  },
  {
    id: 'adj_workplace_at_home',
    category: 'adjustment',
    label: '職場が自宅と併設していますか？',
    helpText: '保護者1名につき減点されます（番号10）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_workplace_at_home_no', points: 0 },
      { label: 'はい（保護者1名）', value: 'adj_workplace_at_home_1', points: -1 },
      { label: 'はい（保護者2名）', value: 'adj_workplace_at_home_2', points: -2 },
    ],
  },
  {
    id: 'adj_remote_care',
    category: 'adjustment',
    label: '別居の親族を介護していますか？',
    helpText: '高齢者の単独・夫婦のみ世帯が対象です。保護者1名につき加点されます（番号11）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_remote_care_no', points: 0 },
      { label: 'はい（保護者1名）', value: 'adj_remote_care_1', points: 1 },
      { label: 'はい（保護者2名）', value: 'adj_remote_care_2', points: 2 },
    ],
  },
  {
    id: 'adj_correspondence',
    category: 'adjustment',
    label: '就学中ですが、通信教育ですか？',
    helpText: '保護者1名につき減点されます（番号12）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_correspondence_no', points: 0 },
      { label: 'はい（保護者1名）', value: 'adj_correspondence_1', points: -1 },
      { label: 'はい（保護者2名）', value: 'adj_correspondence_2', points: -2 },
    ],
  },
  {
    id: 'adj_not_main_worker',
    category: 'adjustment',
    label: '自営・農業において中心者ではありませんか？',
    helpText: '保護者1名につき減点されます（番号13）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_not_main_worker_no', points: 0 },
      { label: 'はい（保護者1名）', value: 'adj_not_main_worker_1', points: -1 },
      { label: 'はい（保護者2名）', value: 'adj_not_main_worker_2', points: -2 },
    ],
  },
  {
    id: 'adj_family_help',
    category: 'adjustment',
    label: '実家等の手伝いにおいて、親族の病気などやむを得ない事情がありますか？',
    helpText: '保護者1名につき加点されます（番号14）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_help_no', points: 0 },
      { label: 'はい（保護者1名）', value: 'adj_family_help_1', points: 2 },
      { label: 'はい（保護者2名）', value: 'adj_family_help_2', points: 4 },
    ],
  },
  {
    id: 'adj_new_work',
    category: 'adjustment',
    label: '新規で仕事・就学を始めますか？',
    helpText: '入所希望日の前後1か月半が対象です。保護者1名につき加点されます（番号15）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_new_work_no', points: 0 },
      { label: 'はい（保護者1名）', value: 'adj_new_work_1', points: 1 },
      { label: 'はい（保護者2名）', value: 'adj_new_work_2', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '子が障がいを有し、保育施設等の利用が発育に有益であると医師の診断がありますか？',
    helpText: '番号16',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '兄弟姉妹がすでに利用している保育施設等と同じ施設の利用を希望しますか？',
    helpText: '番号17',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 5 },
    ],
  },
  {
    id: 'adj_small_facility_transfer',
    category: 'adjustment',
    label: '3号認定施設（地域型保育）から2号認定施設への転園ですか？',
    helpText: '番号18',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_small_facility_transfer_yes', points: 1 },
    ],
  },
  {
    id: 'adj_age_limit_transfer',
    category: 'adjustment',
    label: '年齢制限のある保育施設等から転園しますか？',
    helpText: '4月利用のみ適用されます（番号19）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_age_limit_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_age_limit_transfer_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_not_applied',
    category: 'adjustment',
    label: '同伴就労等で、同一世帯内に保育施設等の利用申込みをしていない兄弟姉妹がいますか？',
    helpText: '1歳以上に適用されます（番号20、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_not_applied_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_not_applied_yes', points: -1 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟姉妹（多胎児含む）が同一の保育施設等の利用を希望しますか？',
    helpText: '番号21',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const hirosakiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
