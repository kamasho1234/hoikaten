import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 那須塩原市 保育園入園 基本指数・調整指数データ
//
// 出典: 那須塩原市「教育・保育ガイドブック 令和8年度版」（令和7年11月1日）
//       11.「那須塩原市の保育園・認定こども園・地域型保育施設の入園選考基準」（P.12）
//       https://www.city.nasushiobara.tochigi.jp/material/files/group/24/guidebook.pdf
//       （令和8年度途中入園申込みのページからリンク:
//        https://www.city.nasushiobara.tochigi.jp/soshikikarasagasu/hoikuka/kosodate/1/13452.html ）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式基準表を読み取って全面的に置き換えた。
//
// 那須塩原市は令和5年12月13日にドメインを lg.jp から tochigi.jp へ移しており、
// 旧URLは404になる。ガイドブックPDFは material/files/group/24/guidebook.pdf に置かれている。
//
// ## 原典の注意点
// - **基本指数は父母それぞれ最大10点**（合計20点）。多くの自治体の20点満点とは尺度が違う。
//   「父又は母が複数の項目に該当する場合は、各々の指数の最も高い項目を採用する」
// - 就労は月の就労時間で8段階（10/9/8/7/6/5/4点）＋内職3点。
//   カッコ内に「週5日就労の場合：1日◯時間」の目安が併記されている
// - **出産は「10－」と表記**され、産前産後の期間（出産予定日から8週前の日の属する月始めから
//   出産日から8週を経過する日の翌日の属する月末まで）に10点
// - 疾病は入院10／病状が重く一日の大半を療養10／服薬等で仕事を中断し療養7／
//   病状が軽く日常生活に支障なし3（いずれも医師の証明による）
// - 障害は手帳の種別と等級で10/10/8/6/4
// - **入院している同居親族に付き添う者は「1 就労」に準ずる。
//   「1 就労」に準ずるに該当がない場合は2点**（就学・職業訓練も同じ扱い）。
//   選択肢には「就労に準ずる区分に当てはまらない」を2点として入れてある
// - 看護・介護は寝たきり10／要介護5・4・3の常時観察及び介護10／上記以外4
// - 求職中は1点（認定日から90日経過した日の属する月末まで）
// - その他は父母の死亡・離別・未婚・行方不明・拘禁等10点
// - **「上記に該当するものはないが、市で保育が必要であると認める場合」は
//   「状況により判断」**とだけ書かれていて数値化できないため、質問には入れていない
//
// ## 調整指数（優先事由）
// 加算: ひとり親家庭（離婚調停中も含む）+6／生活保護世帯で就労することが必要+1／
//       子どもが障害を有していて優先的に集団の保育を受けることが必要+3／
//       産休・育休満了後と同時に利用を希望+2／
//       きょうだいが保育園・幼稚園・認定こども園・地域型保育施設を利用している+3／
//       きょうだいが同時に入園を申し込んだ+2／多胎児（双子、三つ子等）+1／
//       父又は母が保育士・保育教諭・幼稚園教諭・放課後児童クラブ支援員で
//       保育施設等に就労している+3（※加算は就労（予定）証明書の提出がある場合に限る）
// 減算: 同居の祖父母（60歳未満）が就労していないことなどから家庭で保育することができる-3／
//       次年度の10月以降の入園希望（入園希望年度の前年度中の入園選考に限り適用）-2／
//       在園児（または卒園児）の前年度の保育料に未納があり納付相談がない又は
//       納付誓約の不履行-10／上記以外で前年度の保育料に未納がある-3
//
// ## 選考過程（同点時の扱い・質問には入れていない）
// 1. 「基本指数」と「調整指数」の合計点数が高い方から順に選考する。
// 2. 1で決まらない場合は優先度合判定基準により選考する（数字が小さい事由をより優先する）。
//    ①基本指数の点数が大きい方 ②入園希望月が早い方 ③就学前児童が多い世帯
//    ④既に勤務している場合と就労内定の場合では前者 ⑤外勤（自営業以外）と自営業では前者
//    ⑥祖父母の居住地について、より遠隔地に居住している方
//    ⑦同点数で他に希望する園で空きがある場合と空きがない場合では後者
// 3. 1〜2における選考で空きがある場合には、他市町村の児童について入園の選考を行う。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'nasushiobara',
  name: '那須塩原市',
  slug: 'nasushiobara',
  prefecture: '栃木県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢（父母各最大10点）
// ---------------------------------------------------------------------------

/** 1 就労（月の就労時間で8段階＋内職） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上（週5日なら1日7.5時間以上）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上150時間未満（週5日なら1日7時間以上7.5時間未満）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満（週5日なら1日6時間以上7時間未満）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満（週5日なら1日5時間以上6時間未満）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満（週5日なら1日4時間以上5時間未満）', value: `${prefix}_employment_6`, points: 6 },
  { label: '月60時間以上80時間未満（週5日なら1日3時間以上4時間未満）', value: `${prefix}_employment_5`, points: 5 },
  { label: '月48時間以上60時間未満（週5日なら1日2.4時間以上3時間未満）', value: `${prefix}_employment_4`, points: 4 },
  { label: '月48時間以上の内職をしている', value: `${prefix}_employment_3`, points: 3 },
];

/** 2 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '産前産後（出産予定日の8週前の日が属する月の初めから、出産日から8週を経過した日の翌日が属する月末まで）',
    value: `${prefix}_childbirth_10`,
    points: 10,
  },
];

/** 3 疾病（医師の証明による） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院している（概ね1か月以上）', value: `${prefix}_illness_hospital_10`, points: 10 },
  { label: '病状が重く、一日の大半を療養する必要がある', value: `${prefix}_illness_severe_10`, points: 10 },
  { label: '病状・服薬等の影響で仕事を中断し、療養する必要がある', value: `${prefix}_illness_7`, points: 7 },
  { label: '病状が軽く、日常生活には特に支障はない', value: `${prefix}_illness_3`, points: 3 },
];

/** 3 障害（保育が困難な場合） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級', value: `${prefix}_disability_body12_10`, points: 10 },
  { label: '療育手帳A1・A2・B1、または精神障害者保健福祉手帳1・2級', value: `${prefix}_disability_ryoiku_10`, points: 10 },
  { label: '療育手帳B2、または精神障害者保健福祉手帳3級', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳3級', value: `${prefix}_disability_6`, points: 6 },
  { label: '身体障害者手帳4〜6級', value: `${prefix}_disability_4`, points: 4 },
];

/** 4 看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '寝たきり状態の同居親族の看護・介護にあたる', value: `${prefix}_care_bedridden_10`, points: 10 },
  { label: '常時観察及び介護を要する同居親族の介護にあたる（要介護5・4・3）', value: `${prefix}_care_kaigo_10`, points: 10 },
  { label: '上記以外の同居親族の看護・介護にあたる', value: `${prefix}_care_4`, points: 4 },
  // 入院している同居親族への付き添いは「1 就労」に準ずる。該当がない場合は2点
  { label: '入院している同居親族に付き添う（概ね1か月以上）：就労の区分に当てはめると月150時間以上に相当', value: `${prefix}_care_attend_10`, points: 10 },
  { label: '入院している同居親族に付き添う：就労の区分に当てはめると月120時間以上150時間未満に相当', value: `${prefix}_care_attend_8`, points: 8 },
  { label: '入院している同居親族に付き添う：就労の区分に当てはめると月80時間以上120時間未満に相当', value: `${prefix}_care_attend_6`, points: 6 },
  { label: '入院している同居親族に付き添う：就労の区分に当てはまらない', value: `${prefix}_care_attend_2`, points: 2 },
];

/** 5 災害等 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・水害等で家屋が失われ、復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 6 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動をしている（認定日から90日経過した日の属する月末まで）', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** 7 就学等（学校等に在学・職業訓練。いずれも「1 就労」に準ずる） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就労の区分に当てはめると月150時間以上に相当', value: `${prefix}_education_10`, points: 10 },
  { label: '就労の区分に当てはめると月120時間以上150時間未満に相当', value: `${prefix}_education_8`, points: 8 },
  { label: '就労の区分に当てはめると月80時間以上120時間未満に相当', value: `${prefix}_education_6`, points: 6 },
  { label: '就労の区分に当てはまらない', value: `${prefix}_education_2`, points: 2 },
];

/** その他（父母の死亡・離別・未婚・行方不明・拘禁等） */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '父母の死亡、離別、未婚、行方不明、拘禁等', value: `${prefix}_other_10`, points: 10 },
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
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください（複数に当てはまるときは、指数のいちばん高い項目が採用されます）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の看護・介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '火災・水害等の復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている・職業訓練を受けている', value: `${prefix}_reason_education`, points: 0 },
      { label: '父母の死亡・離別・未婚・行方不明・拘禁等', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
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
      label: `${parentLabel}の病気の状況は？`,
      helpText: 'いずれも医師の証明が必要です',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      helpText: '保育が困難な場合が対象です',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのように看護・介護していますか？`,
      helpText: '入院している同居親族への付き添いは、就労の区分に当てはめて指数が決まります',
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
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      helpText: '「1 就労」に準じて指数が決まります',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}はその他の事由にあてはまりますか？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数（優先事由）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '離婚調停中も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、就労することが必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: 'お子さんに障害があり、優先的に集団の保育を受けることが必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育休の満了と同時に利用を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが保育園・幼稚園・認定こども園・地域型保育施設を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいが同時に入園を申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児（双子・三つ子等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 1 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '父または母が保育士・保育教諭・幼稚園教諭・放課後児童クラブ支援員として保育施設等で働いていますか？',
    helpText: '加算は就労（予定）証明書の提出がある場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_worker_yes', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母（60歳未満）が就労しておらず、家庭で保育できますか？',
    helpText: '当てはまると減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_october_later',
    category: 'adjustment',
    label: '次年度の10月以降の入園を希望していますか？',
    helpText: '入園希望年度の前年度中の入園選考に限り適用され、減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_october_later_no', points: 0 },
      { label: 'はい', value: 'adj_october_later_yes', points: -2 },
    ],
  },
  {
    id: 'adj_unpaid_fee',
    category: 'adjustment',
    label: '在園児（または卒園児）の前年度の保育料に未納がありますか？',
    helpText: '納付相談がない、または納付誓約を守っていない場合はより大きく減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fee_no', points: 0 },
      { label: 'はい（納付相談をしている、または納付誓約を守っている）', value: 'adj_unpaid_fee_minus3', points: -3 },
      { label: 'はい（納付相談がない、または納付誓約を守っていない）', value: 'adj_unpaid_fee_minus10', points: -10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const nasushiobaraData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
