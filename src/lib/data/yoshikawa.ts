import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 吉川市 保育施設利用調整基準表（基準指数・調整指数）データ
//
// 出典: 吉川市保育幼稚園課「令和8年度 吉川市保育施設利用調整基準表」（別表（第2条関係））
//       https://www.city.yoshikawa.saitama.jp/index.cfm/25,113441,c,html/113441/20250822-145523.pdf
//       （吉川市Webサイト「令和8年4月入所の保育施設の申込について」
//         https://www.city.yoshikawa.saitama.jp/index.cfm/25,113441,237,804,html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 原典の注記:
//   「父母それぞれの指数を合算し、世帯の指数を決定する」
//   「保育の必要な事由(就労等)が2以上ある場合には、原則として指数の高い状況をとり指数を決定する」
//   「就労時間には、通勤時間は含まず、1時間以内の休憩時間を含める」
//   介護・災害復旧・就学は「就労の基準を準用」する。
//   内定は「市内の認可保育施設で保育士・学童保育室で学童支援員として勤務することが内定している場合、
//   就労の基準を準用」し、「上記以外の内定の場合、就労の基準指数に対して×0.5」となる。
//
// 質問に含めていない原典の項目:
//   ・虐待・DV（児童の状況により最優先）
//   ・その他特例承認（上記に類する様態で、児童福祉の観点から保育の必要性が認められる）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yoshikawa',
  name: '吉川市',
  slug: 'yoshikawa',
  prefecture: '埼玉県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 1 基準指数（保護者の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労（居宅外労働・居宅内労働・自営・家内労働）。内定は就労基準の0.5倍 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  {
    label: '月20日以上・1日7.5時間以上の就労を常態（月150時間以上）',
    value: `${prefix}_employment_10`,
    points: 10,
  },
  {
    label: '月20日以上・1日6時間以上7.5時間未満の就労を常態（月120〜149時間）',
    value: `${prefix}_employment_9`,
    points: 9,
  },
  {
    label: '月20日以上・1日4時間以上6時間未満の就労を常態（月80〜119時間）',
    value: `${prefix}_employment_8`,
    points: 8,
  },
  {
    label: '月16日以上・1日7.5時間以上の就労を常態（月120時間以上）',
    value: `${prefix}_employment_16d_9`,
    points: 9,
  },
  {
    label: '月16日以上・1日6時間以上7.5時間未満の就労を常態（月96〜119時間）',
    value: `${prefix}_employment_16d_8`,
    points: 8,
  },
  {
    label: '月16日以上・1日4時間以上6時間未満の就労を常態（月64〜95時間）',
    value: `${prefix}_employment_16d_7`,
    points: 7,
  },
  { label: '上記に該当しないが、月100時間以上の就労を常態', value: `${prefix}_employment_100h_8`, points: 8 },
  {
    label: '上記に該当しないが、月64時間以上100時間未満の就労を常態',
    value: `${prefix}_employment_64h_7`,
    points: 7,
  },
  { label: '上記以外の就労状況', value: `${prefix}_employment_6`, points: 6 },
  {
    label: '内定（市内の認可保育施設の保育士・学童保育室の学童支援員）：月150時間以上相当',
    value: `${prefix}_employment_naitei_hoiku_10`,
    points: 10,
  },
  {
    label: '内定（市内の認可保育施設の保育士・学童保育室の学童支援員）：月120時間以上相当',
    value: `${prefix}_employment_naitei_hoiku_9`,
    points: 9,
  },
  { label: '内定（上記以外）：月150時間以上相当', value: `${prefix}_employment_naitei_5`, points: 5 },
  { label: '内定（上記以外）：月120時間以上相当', value: `${prefix}_employment_naitei_45`, points: 4.5 },
  { label: '内定（上記以外）：月80時間以上相当', value: `${prefix}_employment_naitei_4`, points: 4 },
  { label: '内定（上記以外）：月64時間以上相当', value: `${prefix}_employment_naitei_35`, points: 3.5 },
  { label: '内定（上記以外）：上記以外の就労状況相当', value: `${prefix}_employment_naitei_3`, points: 3 },
];

/** 妊娠・出産（公式の基準表では母の欄のみに指数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産予定日の6週前（多胎妊娠は14週前）の日が属する月から、出産日の翌日から8週経過する日が属する月の末日まで',
    value: `${prefix}_childbirth_8`,
    points: 8,
  },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院（概ね1か月以上の入院）', value: `${prefix}_illness_10`, points: 10 },
  { label: '疾病のため、常時臥床', value: `${prefix}_illness_bedridden_10`, points: 10 },
  {
    label: '自宅療養（概ね1か月以上の通院加療が必要で、常時保育が必要）',
    value: `${prefix}_illness_8`,
    points: 8,
  },
  { label: '上記以外の一般療養（概ね1か月以上）', value: `${prefix}_illness_6`, points: 6 },
];

/** 心身障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体1・2級、療育マルA・A、精神1級、障害年金1級',
    value: `${prefix}_disability_10`,
    points: 10,
  },
  { label: '身体3級、療育B、精神2級、障害年金2級', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体4級、療育C、精神3級、障害年金3級', value: `${prefix}_disability_6`, points: 6 },
];

/** 介護（就労の基準を準用） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月20日以上・1日7.5時間以上に相当する介護', value: `${prefix}_care_10`, points: 10 },
  { label: '月20日以上・1日6時間以上7.5時間未満に相当する介護', value: `${prefix}_care_9`, points: 9 },
  { label: '月20日以上・1日4時間以上6時間未満に相当する介護', value: `${prefix}_care_8`, points: 8 },
  { label: '月64時間以上100時間未満に相当する介護', value: `${prefix}_care_7`, points: 7 },
  { label: '上記以外の介護', value: `${prefix}_care_6`, points: 6 },
];

/** 災害復旧（就労の基準を準用） */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '月20日以上・1日7.5時間以上に相当する復旧作業', value: `${prefix}_disaster_10`, points: 10 },
  { label: '月20日以上・1日6時間以上7.5時間未満に相当する復旧作業', value: `${prefix}_disaster_9`, points: 9 },
  { label: '月20日以上・1日4時間以上6時間未満に相当する復旧作業', value: `${prefix}_disaster_8`, points: 8 },
  { label: '上記以外の復旧作業', value: `${prefix}_disaster_6`, points: 6 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職のため保育の必要性が認められる（起業準備を含む）', value: `${prefix}_jobseeking_2`, points: 2 },
];

/** 就学（就労の基準を準用） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上・1日7.5時間以上に相当する就学', value: `${prefix}_education_10`, points: 10 },
  { label: '月20日以上・1日6時間以上7.5時間未満に相当する就学', value: `${prefix}_education_9`, points: 9 },
  { label: '月20日以上・1日4時間以上6時間未満に相当する就学', value: `${prefix}_education_8`, points: 8 },
  { label: '月64時間以上100時間未満に相当する就学', value: `${prefix}_education_7`, points: 7 },
  { label: '上記以外の就学', value: `${prefix}_education_6`, points: 6 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '事由が2つ以上ある場合は、原則として指数の高い状況が採用されます',
    inputType: 'select',
    options: [
      { label: '就労（居宅外・居宅内・自営・家内労働）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '心身障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学（職業訓練校等を含む）', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText:
        '就労時間には通勤時間は含まず、1時間以内の休憩時間を含めます。就労証明書の証明日時点で雇用が開始されていない場合は「内定」となり、市内の認可保育施設の保育士・学童支援員を除いて指数が半分になります',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText:
        '公式の基準表では母の欄のみに指数があります。切迫流産は疾病の基準が適用され、医師の診断書に基づき判断されます',
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
      label: `${parentLabel}の介護の状況は？`,
      helpText: '介護等に要する日数及び時間をもとに、就労の基準が準用されます',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}の災害復旧の状況は？`,
      helpText: '災害の状況、復旧に要する日数及び時間等をもとに、就労の基準が準用されます',
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
      label: `${parentLabel}の就学の状況は？`,
      helpText: '通学時間を除き、保育に当たることのできない時間をもとに、就労の基準が準用されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2 調整指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '離婚調停中または離婚裁判中も含みます（ただし保育料は両親の税額を合算します）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: '父母のどちらかが不存在（死亡、離婚、未婚など）', value: 'adj_single_parent_20', points: 20 },
      { label: '父母の両方が不存在（死亡など）', value: 'adj_single_parent_22', points: 22 },
    ],
  },
  {
    id: 'adj_low_income',
    category: 'adjustment',
    label: '低所得世帯ですか？',
    helpText: '生活保護世帯のうち保護者の就労により自立が見込まれる場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_low_income_no', points: 0 },
      { label: '生活保護世帯', value: 'adj_low_income_2', points: 2 },
      { label: '生活保護基準程度の収入で生計を維持している世帯', value: 'adj_low_income_1', points: 1 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '生計中心者が本人の意思によらぬ失業等により求職活動等を行っていますか？',
    helpText: '「離職票のコピー」「雇用保険受給資格者証のコピー」「退職証明書のコピー」等の提出が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 1 },
    ],
  },
  {
    id: 'adj_leave',
    category: 'adjustment',
    label: '育児休業の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_leave_no', points: 0 },
      { label: '育児休業前に保育施設を利用しており、施設の利用を再度希望する', value: 'adj_leave_2', points: 2 },
      { label: '育児休業を取得しており、復帰する', value: 'adj_leave_1', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者は保育士・学童支援員として勤務していますか？',
    helpText:
      '市外の場合は、保育施設で月20日以上1日6時間以上、学童保育室で月20日以上1日5時間30分以上の勤務が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: '市内の認可保育施設・学童保育室に勤務（内定を含む）', value: 'adj_hoikushi_4', points: 4 },
      { label: '市外の保育施設・学童保育室に勤務', value: 'adj_hoikushi_2', points: 2 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '同居している子どもが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児が同時に保育施設の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: '兄弟姉妹が利用する保育施設と同一施設の利用を希望する', value: 'adj_sibling_2a', points: 2 },
      {
        label: '現在別々の保育施設を利用している兄弟姉妹で、第一希望を兄弟姉妹の施設としている',
        value: 'adj_sibling_2b',
        points: 2,
      },
      { label: '兄弟姉妹が同時に同一の保育施設の利用を希望する', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_shokibo_grad',
    category: 'adjustment',
    label: '小規模保育施設等を入所期間満了で卒園しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_shokibo_grad_no', points: 0 },
      { label: 'はい', value: 'adj_shokibo_grad_yes', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用申込児童が障がいを有していますか？',
    helpText: '集団保育が可能な児童で、障害者手帳もしくは医師の証明により障がいを有することが確認できる児童が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '利用申込児童が認可外施設等に預託していますか？',
    helpText:
      '就労に該当する場合で、有料で1か月以上前から週4日以上かつ1日4時間以上の預託をしているとき（所定の証明書の提出が必要）。認可外保育施設のほか、幼稚園・認定こども園幼稚園部分の預かり保育、公立保育所・認可保育園の一時預かり事業を含み、複数施設の利用を合算して条件を満たす場合も該当します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している18歳以上65歳未満の親族等で、無職または月64時間以上の就労等に該当しない方は何人いますか？',
    helpText: '証明できる書類が提出できない場合、該当者1人につき2点減点されます',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_grandparent_0', points: 0 },
      { label: '1人', value: 'adj_grandparent_1', points: -2 },
      { label: '2人', value: 'adj_grandparent_2', points: -4 },
      { label: '3人以上', value: 'adj_grandparent_3', points: -6 },
    ],
  },
  {
    id: 'adj_self_employed',
    category: 'adjustment',
    label: '自営・経営者で、仕事内容・実績がわかる書類を提出できますか？',
    helpText:
      '勤務形態が自営や経営者が自身または親族である場合が対象です。書類を確認した結果、仕事内容・実績がない場合も該当します',
    inputType: 'radio',
    options: [
      { label: '自営等ではない、または提出できる', value: 'adj_self_employed_no', points: 0 },
      { label: '提出できない', value: 'adj_self_employed_yes', points: -2 },
    ],
  },
  {
    id: 'adj_home_income',
    category: 'adjustment',
    label: '自営・家内労働の月収は？',
    inputType: 'radio',
    options: [
      { label: '5万円以上、または該当しない', value: 'adj_home_income_0', points: 0 },
      { label: '月額5万円未満', value: 'adj_home_income_1', points: -1 },
      { label: '月額3万円未満', value: 'adj_home_income_2', points: -2 },
      { label: '月額1万円未満', value: 'adj_home_income_3', points: -3 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育施設・学童保育室の利用者負担金の滞納は何か月分ありますか？',
    helpText: '納付の督促等に対し誠意ある対応が見られない場合、滞納月数1か月につき1点減点されます',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_arrears_0', points: 0 },
      { label: '1か月', value: 'adj_arrears_1', points: -1 },
      { label: '2か月', value: 'adj_arrears_2', points: -2 },
      { label: '3か月', value: 'adj_arrears_3', points: -3 },
      { label: '4か月以上', value: 'adj_arrears_4', points: -4 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '保育利用内定を辞退した回数は？',
    helpText: '辞退した入所月の年度内における利用調整時に、辞退回数1回につき1点減点されます',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_declined_0', points: 0 },
      { label: '1回', value: 'adj_declined_1', points: -1 },
      { label: '2回以上', value: 'adj_declined_2', points: -2 },
    ],
  },
];

export const yoshikawaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
