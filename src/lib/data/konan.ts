import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 江南市 保育所等の利用における調整のための基準（保育所等利用調整基準）
//
// 出典: 江南市「保育所等利用調整基準」別表（第17条関係）
//       https://www.city.konan.lg.jp/_res/projects/default_project/_page_/001/003/394/r7tyoseikijyun.pdf
//       （子ども・子育て支援新制度
//         https://www.city.konan.lg.jp/kurashi/1009685/1011199/1003360/1003394.html
//         からリンクされている単独PDF）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式基準を読み取って全面的に置き換えた。
// 2026-08-19 の一斉置き換えでは市サイトがWAFでブロックされ取得できず failed にしていたが、
// 今回は通常のHTTPクライアントで取得できた。
// なお「入所基準・退所基準」ページ（1003396）には保育を必要とする事由の列挙しかなく、
// 入園のご案内PDFも「利用調整等についてはホームページに掲載」と書くだけなので、
// この単独PDFに辿り着かないと指数表は見つからない。
//
// ## 計算方式（原典の備考）
// - (1)基本指数と(2)調整指数を合計したものを世帯の指数とし、高い順に入所を決定する。
//   世帯の指数が同一の場合は(3)同一指数時の順位表の優先順位により入所を決定する。
// - **(1)基本指数は保護者それぞれにつき高い方の項目を採用する。**
// - ①就労の就労時間数は「就労証明書」の「1か月あたりの労働・休憩時間」とする。
// - (2)調整指数は保護者の該当する項目の合計指数を加算する。
// - 保育所等とは、保育所、認定こども園又は家庭的保育事業等とする。
// 基本指数は父母各最大200点（虐待・DV）なので maxBasePoints は 400。
//
// ## （1）基本指数表
// ①就労
//   外勤 … 160時間以上 100／140時間以上 90／120時間以上 80／100時間以上 70／
//     80時間以上 60／60時間以上 50
//   自営・農業（事業主又は家計の主体者）… 160時間以上 100／140時間以上 90／
//     120時間以上 80／100時間以上 70／80時間以上 60／60時間以上 50
//   自営・農業（協力者）… 120時間以上 80／100時間以上 70／80時間以上 60／60時間以上 50
//   内職 40
// ②妊娠、出産 … 妊娠・出産 80
// ③保護者の疾病、障害
//   入院 … 概ね1か月以上にわたる入院 100
//   疾病 … 入院に相当する治療や安静を要する自宅療養で1か月以上にわたる病臥 100／
//     週3日以上の通院加療を要する場合及び精神疾患 80／
//     上記以外で1か月以上にわたり継続的な通院加療が必要と認められる場合 60
//   障害 … 身体障害者手帳1・2級、精神障害者保健福祉手帳1・2級、療育手帳A、要介護4・5級 100／
//     身体障害者手帳3・4級、療育手帳B、要介護3級 80／
//     身体障害者手帳5・6級、精神障害者保健福祉手帳3級、療育手帳C、要介護1・2級 60
// ④同居又は長期入院等している親族の介護・看護
//   介護・看護が必要な人が入院・通院等 80／
//   介護・看護が必要な人が身体障害者手帳1・2級、精神障害者保健福祉手帳1・2級、
//     療育手帳A、要介護4・5級 100／
//   介護・看護が必要な人が身体障害者手帳3・4級、療育手帳B、要介護3級 80／
//   介護・看護が必要な人が身体障害者手帳5・6級、精神障害者保健福祉手帳3級、
//     療育手帳C、要介護1・2級 60
// ⑤災害復旧 … 災害復旧 100
// ⑥求職活動 … 求職活動 20
// ⑦就学 … 就労を目的とする就学（ただし、他に就労している場合、就労時間を就学時間に
//   加算した時間）160時間以上 100／140時間以上 90／120時間以上 80／100時間以上 70／
//   80時間以上 60／60時間以上 50
// ⑧虐待・DV … 虐待やDVのおそれがあること 200
// ⑨育児休業 … 育児休業取得前から継続して保育所等を利用している2歳児クラスの児童の保護者、
//   または育児休業を取得している3歳児クラス以上の児童の保護者 20
// ⑩その他 … その他上記に類する状態として福祉事務所長が認める場合 〜200
//
// ## （2）調整指数表
// ・3人以上の入所 9／育休・産休明け 8／きょうだい同時申込み 7／きょうだい同時入所中 7
//   （この4項目については、最も指数の高い1項目のみを優先要件として加算する）
// ・生活保護 6
// ・ひとり親世帯 100
// ・保護者が市内保育所等において月120時間以上保育に従事している 50
// ・保護者が市内保育所等で60時間以上120時間未満、又は市内保育所等以外の施設・事業所に
//   おいて60時間以上保育に従事している 20
//   （保育従事の2項目は、全ての保護者の就労状況を確認し、それぞれの指数を加算する）
// ・市内の年齢に上限のある保育所等の卒園に伴う転所申込み 19
// ・保育可能な65歳未満の祖父母と同居している マイナス15
// ・保育料等滞納者 マイナス39
// ・その他上記に類する状態として福祉事務所長が認める場合 〜100
//
// ## （3）同一指数時の順位表（基本指数と調整指数の合計が同一の場合）
// 1 両親ともに不存在又はひとり親世帯
// 2 市内の年齢に上限のある保育所等の卒園に伴う転所申込み
// 3 保護者の基本指数のうち、いずれか低い方の指数が高い世帯
// 4 きょうだいが市内保育所等に在園している
// 5 保護者の基本指数のうち、いずれか低い方の項目を次の順位で優先する
//   災害復旧＞疾病・障害＞居宅外労働（自営、農業を除く）＞自営（居宅外）＞自営（居宅内）＞
//   農業＞就学＞妊娠・出産＞親族の介護＞内職＞求職活動＞育児休業
// 6 保護者の基本指数のうち、いずれか低い方の就労時間数の長い世帯
// 7 保護者の基本指数のうち、いずれか高い方の項目を5と同じ順位で優先する
// 8 保護者の基本指数のうち、いずれか高い方の就労時間数の長い世帯
// 9 校区内に居住している世帯
//
// ## 質問に入れなかった規定
// - 基本指数⑩「その他上記に類する状態として福祉事務所長が認める場合」は「〜200」の範囲値で
//   点数が定まらないため
// - 調整指数「その他上記に類する状態として福祉事務所長が認める場合」も「〜100」の範囲値のため
// - （3）同一指数時の順位表は同点時のタイブレークであり指数ではないため
// ---------------------------------------------------------------------------

const municipality = {
  id: 'konan',
  name: '江南市',
  slug: 'konan',
  prefecture: '愛知県',
  maxBasePoints: 400, // 父母各200点（虐待・DV）
} as const;

// ---------------------------------------------------------------------------
// （1）基本指数表の選択肢（父母各最大200点）
// ---------------------------------------------------------------------------

/** ①就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤：160時間以上', value: `${prefix}_employment_gaikin_100`, points: 100 },
  { label: '外勤：140時間以上', value: `${prefix}_employment_gaikin_90`, points: 90 },
  { label: '外勤：120時間以上', value: `${prefix}_employment_gaikin_80`, points: 80 },
  { label: '外勤：100時間以上', value: `${prefix}_employment_gaikin_70`, points: 70 },
  { label: '外勤：80時間以上', value: `${prefix}_employment_gaikin_60`, points: 60 },
  { label: '外勤：60時間以上', value: `${prefix}_employment_gaikin_50`, points: 50 },
  {
    label: '自営・農業（事業主または家計の主体者）：160時間以上',
    value: `${prefix}_employment_jiei_100`,
    points: 100,
  },
  {
    label: '自営・農業（事業主または家計の主体者）：140時間以上',
    value: `${prefix}_employment_jiei_90`,
    points: 90,
  },
  {
    label: '自営・農業（事業主または家計の主体者）：120時間以上',
    value: `${prefix}_employment_jiei_80`,
    points: 80,
  },
  {
    label: '自営・農業（事業主または家計の主体者）：100時間以上',
    value: `${prefix}_employment_jiei_70`,
    points: 70,
  },
  {
    label: '自営・農業（事業主または家計の主体者）：80時間以上',
    value: `${prefix}_employment_jiei_60`,
    points: 60,
  },
  {
    label: '自営・農業（事業主または家計の主体者）：60時間以上',
    value: `${prefix}_employment_jiei_50`,
    points: 50,
  },
  { label: '自営・農業（協力者）：120時間以上', value: `${prefix}_employment_help_80`, points: 80 },
  { label: '自営・農業（協力者）：100時間以上', value: `${prefix}_employment_help_70`, points: 70 },
  { label: '自営・農業（協力者）：80時間以上', value: `${prefix}_employment_help_60`, points: 60 },
  { label: '自営・農業（協力者）：60時間以上', value: `${prefix}_employment_help_50`, points: 50 },
  { label: '内職', value: `${prefix}_employment_naishoku_40`, points: 40 },
];

/** ②妊娠、出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_80`, points: 80 },
];

/** ③保護者の疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '概ね1か月以上にわたる入院', value: `${prefix}_illness_100a`, points: 100 },
  {
    label: '入院に相当する治療や安静を要する自宅療養で1か月以上にわたる病臥',
    value: `${prefix}_illness_100b`,
    points: 100,
  },
  {
    label: '週3日以上の通院加療を要する場合、および精神疾患',
    value: `${prefix}_illness_80`,
    points: 80,
  },
  {
    label: '上記以外で1か月以上にわたり継続的な通院加療が必要と認められる場合',
    value: `${prefix}_illness_60`,
    points: 60,
  },
];

/** ③保護者の障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障害者手帳1・2級、精神障害者保健福祉手帳1・2級、療育手帳A、要介護4・5級',
    value: `${prefix}_disability_100`,
    points: 100,
  },
  {
    label: '身体障害者手帳3・4級、療育手帳B、要介護3級',
    value: `${prefix}_disability_80`,
    points: 80,
  },
  {
    label: '身体障害者手帳5・6級、精神障害者保健福祉手帳3級、療育手帳C、要介護1・2級',
    value: `${prefix}_disability_60`,
    points: 60,
  },
];

/** ④同居又は長期入院等している親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label:
      '介護・看護が必要な人が身体障害者手帳1・2級、精神障害者保健福祉手帳1・2級、療育手帳A、要介護4・5級',
    value: `${prefix}_care_100`,
    points: 100,
  },
  { label: '介護・看護が必要な人が入院・通院等', value: `${prefix}_care_80a`, points: 80 },
  {
    label: '介護・看護が必要な人が身体障害者手帳3・4級、療育手帳B、要介護3級',
    value: `${prefix}_care_80b`,
    points: 80,
  },
  {
    label:
      '介護・看護が必要な人が身体障害者手帳5・6級、精神障害者保健福祉手帳3級、療育手帳C、要介護1・2級',
    value: `${prefix}_care_60`,
    points: 60,
  },
];

/** ⑤災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧', value: `${prefix}_disaster_100`, points: 100 },
];

/** ⑥求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動', value: `${prefix}_jobseeking_20`, points: 20 },
];

/** ⑦就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '160時間以上', value: `${prefix}_education_100`, points: 100 },
  { label: '140時間以上', value: `${prefix}_education_90`, points: 90 },
  { label: '120時間以上', value: `${prefix}_education_80`, points: 80 },
  { label: '100時間以上', value: `${prefix}_education_70`, points: 70 },
  { label: '80時間以上', value: `${prefix}_education_60`, points: 60 },
  { label: '60時間以上', value: `${prefix}_education_50`, points: 50 },
];

/** ⑧虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVのおそれがある', value: `${prefix}_abuse_200`, points: 200 },
];

/** ⑨育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  {
    label: '育児休業取得前から継続して保育所等を利用している2歳児クラスの児童の保護者',
    value: `${prefix}_parental_leave_20a`,
    points: 20,
  },
  {
    label: '育児休業を取得している3歳児クラス以上の児童の保護者',
    value: `${prefix}_parental_leave_20b`,
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育を必要とする理由`,
    helpText: '基本指数は保護者それぞれにつき、いちばん高い項目が採用されます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠、出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '保護者の障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DVのおそれ', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_parental_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '就労時間数は「就労証明書」の「1か月あたりの労働・休憩時間」で判断されます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は妊娠中・出産の前後ですか？`,
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
      label: `${parentLabel}の手帳・要介護度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}が介護・看護している親族の状況は？`,
      helpText: '同居、または長期入院等している親族が対象です',
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
      helpText:
        '就労を目的とする就学が対象です。ほかに就労している場合は、就労時間を就学時間に加算した時間で判断されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}に虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// （2）調整指数表（世帯単位）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだい・育休の状況は？',
    helpText: '4項目のうち、最も指数の高い1項目のみが優先要件として加算されます',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: '3人以上の入所', value: 'adj_sibling_three', points: 9 },
      { label: '育休・産休明け', value: 'adj_sibling_leave', points: 8 },
      { label: 'きょうだい同時申込み', value: 'adj_sibling_same_time', points: 7 },
      { label: 'きょうだい同時入所中', value: 'adj_sibling_enrolled', points: 7 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 6 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 100 },
    ],
  },
  {
    id: 'adj_hoikushi_parent1',
    category: 'adjustment',
    label: '保護者1は保育に従事していますか？',
    helpText: '保育従事の加算は、全ての保護者の就労状況を確認し、それぞれの指数を加算します',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_parent1_none', points: 0 },
      { label: '市内保育所等で月120時間以上保育に従事している', value: 'adj_hoikushi_parent1_50', points: 50 },
      {
        label: '市内保育所等で60時間以上120時間未満、または市内保育所等以外の施設・事業所で60時間以上保育に従事している',
        value: 'adj_hoikushi_parent1_20',
        points: 20,
      },
    ],
  },
  {
    id: 'adj_hoikushi_parent2',
    category: 'adjustment',
    label: '保護者2は保育に従事していますか？',
    helpText: '保育従事の加算は、全ての保護者の就労状況を確認し、それぞれの指数を加算します',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_parent2_none', points: 0 },
      { label: '市内保育所等で月120時間以上保育に従事している', value: 'adj_hoikushi_parent2_50', points: 50 },
      {
        label: '市内保育所等で60時間以上120時間未満、または市内保育所等以外の施設・事業所で60時間以上保育に従事している',
        value: 'adj_hoikushi_parent2_20',
        points: 20,
      },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '市内の年齢に上限のある保育所等の卒園に伴う転所申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: 19 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育可能な65歳未満の祖父母と同居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -15 },
    ],
  },
  {
    id: 'adj_unpaid_fee',
    category: 'adjustment',
    label: '保育料等の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fee_no', points: 0 },
      { label: 'はい', value: 'adj_unpaid_fee_yes', points: -39 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const konanData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
