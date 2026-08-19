import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 伊勢市 保育利用調整基準（基本点数表・調整点数表）データ
//
// 出典: 伊勢市保育課「保育利用調整基準」
//       https://www.city.ise.mie.jp/_res/projects/default_project/_page_/001/013/686/r6riyoucyouseikijyunn.pdf
//       （伊勢市Webサイト「保育所・認定こども園等への入所手続き」
//         https://www.city.ise.mie.jp/kosodate/gyosei/azukeru/1013686.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//
// 原典の備考:
//   「父母それぞれの点数の合算を基本点数とする（8 社会的養護が必要な場合に該当する場合は、25点とする）」
//   「父母が複数の事由に該当する場合は、各々基本点数の高い方の事由の点数を採用する」
//   「就労時間数は、休憩時間を含むものとする」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ise',
  name: '伊勢市',
  slug: 'ise',
  prefecture: '三重県',
  maxBasePoints: 20, // 父母各10点（社会的養護が必要な場合は世帯で25点）
} as const;

// ---------------------------------------------------------------------------
// 基本点数表（保護者の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 就労（被庸、および自営の中心者） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月180時間以上の就労を常態とする', value: `${prefix}_employment_10`, points: 10 },
  { label: '月150時間以上の就労を常態とする', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上の就労を常態とする', value: `${prefix}_employment_7`, points: 7 },
  { label: '月90時間以上の就労を常態とする', value: `${prefix}_employment_5`, points: 5 },
  { label: '月48時間以上の就労を常態とする', value: `${prefix}_employment_3`, points: 3 },
];

/** 1 就労（自営の協力者） */
const helperOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_helper_none`, points: 0 },
  { label: '月180時間以上の就労を常態とする', value: `${prefix}_helper_9`, points: 9 },
  { label: '月150時間以上の就労を常態とする', value: `${prefix}_helper_8`, points: 8 },
  { label: '月120時間以上の就労を常態とする', value: `${prefix}_helper_6`, points: 6 },
  { label: '月90時間以上の就労を常態とする', value: `${prefix}_helper_4`, points: 4 },
  { label: '月48時間以上の就労を常態とする', value: `${prefix}_helper_3`, points: 3 },
];

/** 1 就労（内職） */
const naishokuOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_naishoku_none`, points: 0 },
  { label: '月180時間以上の就労を常態とする', value: `${prefix}_naishoku_8`, points: 8 },
  { label: '月150時間以上の就労を常態とする', value: `${prefix}_naishoku_7`, points: 7 },
  { label: '月120時間以上の就労を常態とする', value: `${prefix}_naishoku_5`, points: 5 },
  { label: '月48時間以上の就労を常態とする', value: `${prefix}_naishoku_2`, points: 2 },
];

/** 2 妊娠・出産（公式の基本点数表では母のみが対象で、父の欄は「-」） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産又は出産予定日の前後各8週間の期間', value: `${prefix}_childbirth_10`, points: 10 },
];

/** 3 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1か月以上にわたると見込まれるもの）', value: `${prefix}_illness_hospital_10`, points: 10 },
  { label: '病臥（常時臥床）', value: `${prefix}_illness_bedridden_10`, points: 10 },
  {
    label: '居宅療養：長期加療（寝たきりでないが通院加療を行い、安静が必要で保育が著しく困難）',
    value: `${prefix}_illness_home_7`,
    points: 7,
  },
  { label: '居宅療養：一般療養（上記以外の自宅療養で保育に支障がある）', value: `${prefix}_illness_home_5`, points: 5 },
];

/** 3 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体1・2級、精神1・2級、療育A1・A2 の交付を受けていて保育が常時困難',
    value: `${prefix}_disability_10`,
    points: 10,
  },
  {
    label: '身体3・4級、精神3級、療育B1・B2 の交付を受けていて保育が著しく困難',
    value: `${prefix}_disability_8`,
    points: 8,
  },
  { label: '身体5・6級 又は同程度と判断できる者で保育が困難', value: `${prefix}_disability_6`, points: 6 },
];

/** 4 同居親族等の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '月120時間以上、介護・看護や入院・通院・通所の付添いにあたっている',
    value: `${prefix}_care_7`,
    points: 7,
  },
  {
    label: '月90時間以上、介護・看護や入院・通院・通所の付添いにあたっている',
    value: `${prefix}_care_5`,
    points: 5,
  },
  { label: '介護・看護や付添いにあたり、保育に支障がある', value: `${prefix}_care_4`, points: 4 },
];

/** 5 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災、風水害、火災その他の災害により自宅や近隣の復旧にあたっている',
    value: `${prefix}_disaster_10`,
    points: 10,
  },
];

/** 6 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業準備含む）を継続的に行っている', value: `${prefix}_jobseeking_2`, points: 2 },
];

/** 7 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上就学している', value: `${prefix}_education_7`, points: 7 },
  { label: '月90時間以上就学している', value: `${prefix}_education_5`, points: 5 },
  { label: '上記未満の就学', value: `${prefix}_education_2`, points: 2 },
];

/** 8 社会的養護が必要な場合（父母の合算ではなく、世帯として25点） */
const socialCareOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_social_none`, points: 0 },
  {
    label: '虐待の恐れ、または配偶者からのDVにより保育が困難と認められる',
    value: `${prefix}_social_25`,
    points: 25,
  },
];

/** 9 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '保護者のいずれかがいない（死別・離別・行方不明など）', value: `${prefix}_absence_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '複数の事由に該当する場合は、点数の高い方の事由が採用されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている（会社等に雇用、または自営の中心者）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（自営の協力者）', value: `${prefix}_reason_helper`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_naishoku`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・けがの療養中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族等の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動をしている', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学している', value: `${prefix}_reason_education`, points: 0 },
      { label: '社会的養護が必要', value: `${prefix}_reason_social`, points: 0 },
      { label: '保護者が不存在（死別・離別・行方不明など）', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '就労時間には休憩時間を含みます。不規則勤務等で表記の時間数によりがたい場合は別途判断されます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_helper`,
      category,
      label: `${parentLabel}（自営の協力者）はどのくらい働いていますか？`,
      inputType: 'radio',
      options: helperOptions(prefix),
    },
    {
      id: `${prefix}_naishoku`,
      category,
      label: `${parentLabel}はどのくらい内職をしていますか？`,
      inputType: 'radio',
      options: naishokuOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '公式の基本点数表では母のみが対象で、父の欄は「-」となっています',
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
      label: `${parentLabel}は災害復旧にあたっていますか？`,
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
      label: `${parentLabel}はどのくらい就学していますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_social`,
      category,
      label: `${parentLabel}は社会的養護が必要な状況ですか？`,
      helpText:
        '厚生福祉事務所長または児童相談所長の認定が必要です。この事由は父母の合算ではなく、世帯として25点となります',
      inputType: 'radio',
      options: socialCareOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在の状態ですか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数表（該当する内容に応じて加点・減点。重複適用可）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護が必要と認定されていますか？',
    helpText:
      '厚生福祉事務所長または児童相談所長が、申請の子どもが虐待を受けている・その恐れがあると認定した場合、または配偶者のDVにより保育ができないと認定する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 30 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '離婚・離婚調停中・死別等を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 15 },
    ],
  },
  {
    id: 'adj_child_status',
    category: 'adjustment',
    label: '申込児童の現在の保育状況は？',
    helpText: 'いずれか1つだけが適用されます。事業所内保育施設の利用は「産休・育休明け」とは重複適用できません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_child_status_no', points: 0 },
      {
        label: '地域型保育事業の卒園児で、その地域型保育が連携施設を指定していない',
        value: 'adj_child_status_renkei',
        points: 10,
      },
      { label: '2歳児までを預かる企業主導型保育事業の卒園児', value: 'adj_child_status_kigyou', points: 10 },
      {
        label: '申込時に事業所内保育施設を利用しており、引き続き就労要件で入所を希望する',
        value: 'adj_child_status_jigyousho',
        points: 3,
      },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童は身体障害者手帳または療育手帳等の交付を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士等として勤務していますか？',
    helpText:
      '保育士等の資格を保有する保護者が、特定教育・保育施設や地域型保育事業所で保育士・幼稚園教諭・保育教諭として勤務している、または勤務予定の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育休明けの入所希望ですか？',
    helpText:
      '産後休暇・育児休業から復帰する月の入所を希望する場合（復帰後最初に迎える4月の入所を含む）。継続待機となる場合、同一年度内に限り加点が有効です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが在籍している施設を希望しますか？',
    helpText: '4月1日入所については、卒園予定児を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいで同一施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 1 },
      { label: 'はい（きょうだいに多胎児を含む）', value: 'adj_sibling_simultaneous_multiple', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している65歳未満の祖父母が無職または求職中ですか？',
    helpText: '疾病等で保育ができない場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
  {
    id: 'adj_sibling_at_home',
    category: 'adjustment',
    label: '未就学のきょうだいを保護者等が保育していますか？',
    helpText:
      'そのきょうだいが保育施設・保育事業を利用できない月齢である場合、および介護・看護の対象児童である場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_at_home_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_at_home_yes', points: -2 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '就労等により父または母が単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 2 },
    ],
  },
];

export const iseData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
