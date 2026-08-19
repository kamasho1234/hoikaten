import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 津市 保育所等の利用調整（基本点数・調整指数）データ
//
// 出典: 津市こども健康部保育こども園課
//       基本点数表（令和4年4月1日入所調整分より適用）
//       https://www.info.city.tsu.mie.jp/_res/projects/default_project/_page_/001/002/736/kihon.pdf
//       調整指数表（令和5年4月1日入所調整分より適用）
//       https://www.info.city.tsu.mie.jp/_res/projects/default_project/_page_/001/002/736/r5cyousei.pdf
//       優先順位表
//       https://www.info.city.tsu.mie.jp/_res/projects/default_project/_page_/001/002/736/yuusen.pdf
//       （津市Webサイト「保育所等の利用調整」
//         https://www.info.city.tsu.mie.jp/kosodateouen/kodomowoazukeru/1002736.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基本点数は父母それぞれ最大11点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の注記:
//   「父と母それぞれに保育を必要とする事由に応じて基本点数を決定し、父と母の基本点数の合計点が
//     子どもの基本点数となります」
//   保育を必要とする事由が育児休業の場合で他の保育所等の利用を希望している（転園）場合は、
//     当該育児休業を取得している保護者の基本点数を「4点」として取り扱う
//   病気・疾病・障害は、入院以外の項目については該当する項目の基本点数を加算する（上限10点）
//   就学が通信教育または在宅での就学の場合は基本点数から1点を減ずる
//
// 数値化しない規定（別途判断・優先順位のため質問には含めない）:
//   基本点数 11 その他「0〜11」その他社会福祉事務所長が必要と認めるもの（上記項目に準ずる）
//   基本点数⑵「保護者が存在するが養育が困難である場合又は保護者不存在の場合」社会的養護 21
//     （社会福祉事務所長が申込児童の虐待またはそのおそれ、あるいは配偶者からの暴力により
//       保育を行うことが困難であると認める場合。父母それぞれの積み上げではなく別枠の点数）
//   優先順位表:
//     1 当該保育所等の希望順位
//     2 申込児童の祖父母の状況（居住地・年齢・状況による判定点が高い順）
//     3 保護者が保育を必要とする理由の優先順位
//       (1)災害 (2)就労 (3)疾病 (4)妊娠・出産 (5)介護・看護 (6)就学 (7)求職中 (8)育児休業
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tsu',
  name: '津市',
  slug: 'tsu',
  prefecture: '三重県',
  maxBasePoints: 22, // 基本点数は父母それぞれ最大11点、合計で22点
} as const;

// ---------------------------------------------------------------------------
// 基本点数表。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 被雇用 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上の就労を常態とする', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120時間以上の就労を常態とする', value: `${prefix}_employment_8`, points: 8 },
  { label: '月90時間以上の就労を常態とする', value: `${prefix}_employment_6`, points: 6 },
  { label: '月60時間以上の就労を常態とする', value: `${prefix}_employment_4`, points: 4 },
];

/** 2 自営業・農業・漁業（中心者、給与が支給されている協力者） */
const selfEmployedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_selfemployed_none`, points: 0 },
  { label: '月150時間以上の就労を常態とする', value: `${prefix}_selfemployed_10`, points: 10 },
  { label: '月120時間以上の就労を常態とする', value: `${prefix}_selfemployed_8`, points: 8 },
  { label: '月90時間以上の就労を常態とする', value: `${prefix}_selfemployed_6`, points: 6 },
  { label: '月60時間以上の就労を常態とする', value: `${prefix}_selfemployed_4`, points: 4 },
];

/** 2 自営業・農業・漁業（給与が支給されている協力者を除く協力者） */
const familyWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_family_none`, points: 0 },
  { label: '月120時間以上の就労を常態とする', value: `${prefix}_family_8`, points: 8 },
  { label: '月90時間以上の就労を常態とする', value: `${prefix}_family_6`, points: 6 },
  { label: '月60時間以上の就労を常態とする', value: `${prefix}_family_4`, points: 4 },
];

/** 3 内職 */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月150時間以上の就労を常態とする', value: `${prefix}_homework_8`, points: 8 },
  { label: '月120時間以上の就労を常態とする', value: `${prefix}_homework_6`, points: 6 },
  { label: '月60時間以上の就労を常態とする', value: `${prefix}_homework_4`, points: 4 },
];

/** 4 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_10`, points: 10 },
];

/**
 * 5 病気・疾病・障害。
 * 原典は「入院以外の項目については該当する項目の基本点数を加算する（上限10点）」という
 * 加算方式のため、生活上の制限（1〜5点）と保育の可否（保育不可能5点・部分保育可能2点）の
 * 組み合わせを合算した点数を選択肢として展開している。
 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '治療のため入院（1箇月以上にわたると見込まれるもの）',
    value: `${prefix}_illness_hosp_10`,
    points: 10,
  },
  { label: '入院予定', value: `${prefix}_illness_hosp_7`, points: 7 },
  {
    label: '日常生活や社会生活上の一定の制限があり、保育不可能',
    value: `${prefix}_illness_1_5`,
    points: 6,
  },
  {
    label: '日常生活や社会生活上の一定の制限があり、部分保育可能',
    value: `${prefix}_illness_1_2`,
    points: 3,
  },
  {
    label: '要他者援助（部分的）で、保育不可能',
    value: `${prefix}_illness_3_5`,
    points: 8,
  },
  {
    label: '要他者援助（部分的）で、部分保育可能',
    value: `${prefix}_illness_3_2`,
    points: 5,
  },
  {
    label: '要他者援助（生活の大半）で、保育不可能',
    value: `${prefix}_illness_4_5`,
    points: 9,
  },
  {
    label: '要他者援助（生活の大半）で、部分保育可能',
    value: `${prefix}_illness_4_2`,
    points: 6,
  },
  {
    label: '要他者援助（常時介護）で、保育不可能',
    value: `${prefix}_illness_5_5`,
    points: 10,
  },
  {
    label: '要他者援助（常時介護）で、部分保育可能',
    value: `${prefix}_illness_5_2`,
    points: 7,
  },
];

/** 6 同居親族の介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label:
      '月120時間以上の常時介護もしくは看護、または週5日以上の通院もしくは通所の付添い（送迎サービス利用を除く）',
    value: `${prefix}_care_8`,
    points: 8,
  },
  {
    label: '月90時間以上の介護もしくは看護、または入院・通院・通所の付添い',
    value: `${prefix}_care_6`,
    points: 6,
  },
  {
    label: '介護もしくは看護、または入院・通院・通所の付添いをしている',
    value: `${prefix}_care_4`,
    points: 4,
  },
];

/** 7 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '災害（火災、風水害、地震等）の復旧に当たっている',
    value: `${prefix}_disaster_10`,
    points: 10,
  },
];

/**
 * 8 就学。
 * 原典の「就学が通信教育又は在宅での就学の場合は基本点数から1点を減ずる」に従い、
 * 通学と通信教育・在宅の両方を選択肢として展開している。
 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上就学している', value: `${prefix}_education_9`, points: 9 },
  { label: '月15日以上かつ1日6時間以上就学している', value: `${prefix}_education_7`, points: 7 },
  { label: '月10日以上かつ1日4時間以上就学している', value: `${prefix}_education_5`, points: 5 },
  { label: '月5日以上かつ1日2時間以上就学している', value: `${prefix}_education_3`, points: 3 },
  { label: '上記未満の就学', value: `${prefix}_education_1`, points: 1 },
  {
    label: '通信教育・在宅：月20日以上かつ1日8時間以上就学している',
    value: `${prefix}_education_c8`,
    points: 8,
  },
  {
    label: '通信教育・在宅：月15日以上かつ1日6時間以上就学している',
    value: `${prefix}_education_c6`,
    points: 6,
  },
  {
    label: '通信教育・在宅：月10日以上かつ1日4時間以上就学している',
    value: `${prefix}_education_c4`,
    points: 4,
  },
  {
    label: '通信教育・在宅：月5日以上かつ1日2時間以上就学している',
    value: `${prefix}_education_c2`,
    points: 2,
  },
  { label: '通信教育・在宅：上記未満の就学', value: `${prefix}_education_c0`, points: 0 },
];

/** 9 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_3`, points: 3 },
];

/** 10 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡、離婚、行方不明、未婚、拘禁等', value: `${prefix}_absence_11`, points: 11 },
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
      { label: '被雇用（勤めている）', value: `${prefix}_reason_employment`, points: 0 },
      {
        label: '自営業・農業・漁業（中心者・給与のある協力者）',
        value: `${prefix}_reason_selfemployed`,
        points: 0,
      },
      {
        label: '自営業・農業・漁業（上記以外の協力者）',
        value: `${prefix}_reason_family`,
        points: 0,
      },
      { label: '内職', value: `${prefix}_reason_homework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労（被雇用）の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_selfemployed`,
      category,
      label: `${parentLabel}の自営業・農業・漁業（中心者・給与のある協力者）の状況は？`,
      inputType: 'radio',
      options: selfEmployedOptions(prefix),
    },
    {
      id: `${prefix}_family`,
      category,
      label: `${parentLabel}の自営業・農業・漁業（上記以外の協力者）の状況は？`,
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は妊娠・出産に該当しますか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・疾病・障害の状況は？`,
      helpText:
        '入院以外の項目は、生活上の制限と保育の可否をそれぞれ加算した点数です（上限10点）',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族の介護の状況は？`,
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
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
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
// 調整指数表
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護に該当しますか？',
    helpText:
      '社会福祉事務所長が申込児童の虐待またはそのおそれがあると認める場合、あるいは保護者が配偶者からの暴力により保育を行うことが困難であると認める場合（事由1）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 30 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '産前産後休業または育児休業から復帰しますか？',
    helpText:
      '4月1日からの利用調整では前年度内に職場復帰した場合を含みます。保護者の一方または双方の保育を必要とする事由が求職中である場合、および市内の保育所等を利用中で他の保育所等を希望する場合を除きます（事由2）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: 'はい', value: 'adj_return_from_leave_yes', points: 23 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '事由3',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      {
        label: 'ひとり親家庭（配偶者のいない者およびその子以外の同居人がいない世帯）',
        value: 'adj_single_parent_20',
        points: 20,
      },
      { label: '上記以外のひとり親家庭', value: 'adj_single_parent_10', points: 10 },
    ],
  },
  {
    id: 'adj_economic',
    category: 'adjustment',
    label: '経済的な自立に資する場合に該当しますか？',
    helpText: '事由4',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_economic_none', points: 0 },
      {
        label: '保護者が就労している、または就労予定である生活保護受給世帯',
        value: 'adj_economic_welfare',
        points: 20,
      },
      {
        label:
          '生計中心者が申請日から過去1年の間に失業し、申込時点で求職中であり、他方の保護者が住民税非課税',
        value: 'adj_economic_unemployed',
        points: 20,
      },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童に障害があり、特別な配慮が必要ですか？',
    helpText:
      '身体障害者手帳、療育手帳または精神障害者保健福祉手帳が交付されており、施設設備および人員配置の面で受け入れることができる保育所等を希望する場合（事由5）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが市内の保育所等を利用していますか？',
    helpText: 'きょうだいが利用している保育所等の利用調整をする場合は30点になります（事由6）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（他の保育所等を希望）', value: 'adj_sibling_enrolled_20', points: 20 },
      {
        label: 'はい（きょうだいが利用している保育所等を希望）',
        value: 'adj_sibling_enrolled_30',
        points: 30,
      },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいで同一の保育所等を希望しますか？',
    helpText:
      '保護者の一方または双方の保育を必要とする事由が求職中である場合を除きます（事由7）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 4 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が市内の保育所等で保育士等として就労していますか？',
    helpText:
      '市内の保育所等を利用中で他の保育所等を希望する場合を除きます（事由8）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      {
        label:
          '保育士・保育教諭・幼稚園教諭として月120時間以上の就労を予定（就労開始日が利用開始月の初日）',
        value: 'adj_childcare_worker_30',
        points: 30,
      },
      {
        label:
          '保育士等として月120時間以上の就労予定だが、就労開始日が利用開始月の初日ではない',
        value: 'adj_childcare_worker_5a',
        points: 5,
      },
      {
        label:
          '看護師・栄養士・調理員・保健師として月60時間以上、または保育士等として月60時間以上120時間未満の就労中（就労予定を含む）',
        value: 'adj_childcare_worker_5b',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_child_status',
    category: 'adjustment',
    label: '申込児童の現在の状況は？',
    helpText: '事由9',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_child_status_none', points: 0 },
      { label: '認可外施設・親戚等に預けている', value: 'adj_child_status_1a', points: 1 },
      {
        label: '市外に所在する保育所等を利用している',
        value: 'adj_child_status_1b',
        points: 1,
      },
      {
        label: '市内の保育所等を利用中で他の保育所等を希望する',
        value: 'adj_child_status_5',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '利用者負担額または給食費を3箇月分以上滞納していますか？',
    helpText: '正当な理由なく滞納している場合（事由10、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const tsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
