import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 名護市 保育園入園 利用調整基準データ
// 出典: 名護市「令和8年度版 名護市保育施設等利用調整基準」
// https://www.city.nago.okinawa.jp/kurashi/2018071800014/file_contents/R8riyouchouseikijunn20520917.pdf
// -------------------------------------------------------------------------
// 名護市は備考2に手順が書かれている。
//   「父母それぞれの基本指数を合算し、世帯の基本指数を決定する。」
// これにより scoringMethod は 'sum'。基本指数の最大は1人あたり55点。
//
// 備考2の後半「ひとり親家庭が①から⑧までの類型に該当する場合は、
// 基本指数を一律55点とし、さらに調整指数で加点する」は、
// この画面の作り（父母それぞれに答える形）では表せないため入れていない。
// ひとり親の方は保護者1だけに答えれば、その1人分の指数が世帯の指数になる。
//
// 原典で数値を出していない項目（※、実情に応じて決める）は選択肢にしていない。
// - 5号 災害復旧、8号 社会的養護（虐待・DV）、10号⑫ その他
// - 調整指数 7 その他養護、8 児童が障がい等、26 保育施設等で勤務、30 その他
//
// 4号 介護・看護と、7号の職業訓練校等は「類型①の指数を準用」とあり、
// 就労と同じ表を使うため、就労の設問で答える形にしている。
//
// 次の3つは、この画面で扱う「入園の点数」とは性質が違うため入れていない。
// - 調整指数 21〜25 地域型保育事業所の卒園児等（+200 など）
//   … 連携施設への進級を確実にするための値で、点数の目安として見せると誤解を招く
// - 調整指数 31・32 市外在住（−35・−40）
// - 調整指数 35 保育料の滞納（−5×(（−2＋滞納月数)) と計算式で決まる）
// -------------------------------------------------------------------------

const municipality = {
  id: 'nago',
  name: '名護市',
  slug: 'nago',
  prefecture: '沖縄県',
  maxBasePoints: 110, // 父母各55点の合計
  scoringMethod: 'sum',
} as const;

// 1号 就労（4号 介護・看護、7号 職業訓練校等も「類型①の指数を準用」）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上の就労を常態とする', value: `${prefix}_employment_0`, points: 55 },
  { label: '月140時間以上160時間未満の就労を常態とする', value: `${prefix}_employment_1`, points: 50 },
  { label: '月120時間以上140時間未満の就労を常態とする', value: `${prefix}_employment_2`, points: 45 },
  { label: '月100時間以上120時間未満の就労を常態とする', value: `${prefix}_employment_3`, points: 40 },
  { label: '月80時間以上100時間未満の就労を常態とする', value: `${prefix}_employment_4`, points: 35 },
  { label: '月64時間以上80時間未満の就労を常態とする', value: `${prefix}_employment_5`, points: 30 },
  { label: '自営業で挙証資料の提出がない場合', value: `${prefix}_employment_6`, points: 25 },
];

// 2号 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '切迫・入院等により著しく保育が困難である', value: `${prefix}_childbirth_0`, points: 55 },
  { label: '多胎児の妊娠・出産により保育が困難である', value: `${prefix}_childbirth_1`, points: 40 },
  { label: '上記以外の妊娠・出産', value: `${prefix}_childbirth_2`, points: 35 },
];

// 3号 保護者の疾病・障がい等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1月以上の入院、または保育が完全に不可能な状態', value: `${prefix}_illness_0`, points: 55 },
  { label: '身体障害者手帳1・2級／精神障害者保健福祉手帳1級／療育手帳A1／障害基礎年金証書1級など', value: `${prefix}_illness_1`, points: 55 },
  { label: '保育が困難な状態である', value: `${prefix}_illness_2`, points: 45 },
  { label: '身体障害者手帳3級／精神障害者保健福祉手帳2級／療育手帳A2／障害基礎年金証書2級など', value: `${prefix}_illness_3`, points: 45 },
  { label: '保育が部分的に困難な状態である', value: `${prefix}_illness_4`, points: 35 },
  { label: '上記以外の障がい等', value: `${prefix}_illness_5`, points: 35 },
];

// 6号 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職または起業の準備のため保育が困難な状態である', value: `${prefix}_jobseeking_0`, points: 25 },
];

// 7号 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '学校・専修学校・各種学校等に月64時間以上在学（予定を含む）している', value: `${prefix}_school_0`, points: 55 },
];

// 9号・10号 育児休業時の継続保育
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業期間中に対象児童以外の児童が異動を希望する', value: `${prefix}_parental_leave_0`, points: 35 },
  { label: 'みなし育児休業期間に対象児童以外の児童が異動を希望する', value: `${prefix}_parental_leave_1`, points: 35 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '名護市は父母それぞれの基本指数を合算して世帯の基本指数にします',
    inputType: 'select',
    options: [
      { label: '就労（介護・看護、職業訓練校等も含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '育児休業時の継続保育', value: `${prefix}_reason_parental_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '親族等の看護・介護や職業訓練校等も、要する時間に応じてこの表の指数を使います。1時間以内の休憩時間は含み、通勤時間は含みません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は就学していますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中で、対象児童以外の児童が異動を希望しますか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 【調整指数（加算）】【調整指数（減算）】
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'ひとり親家庭（下の2つに当たらない）（+65）', value: 'adj_single_parent_1', points: 65 },
      { label: '保育ができる60歳未満の親族等と同居している（同一敷地内・二世帯住宅を含む）（+45）', value: 'adj_single_parent_2', points: 45 },
      { label: '証する資料の提出が困難だが、ひとり親家庭の状態であると認められる（+45）', value: 'adj_single_parent_3', points: 45 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯等ですか？',
    helpText: '生活保護基準以下の収入で生活していて、自立支援のため必要と認められるときも含みます。ひとり親家庭に当たる場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+45）', value: 'adj_welfare_1', points: 45 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業（自発的失業を除く）により生活困窮にあり、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+25）', value: 'adj_unemployed_1', points: 25 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_foster_1', points: 30 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者が障がい等を有していますか？',
    helpText: '基本指数の類型が「保護者の疾病・障がい等」以外の場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_0', points: 0 },
      { label: '身体障害者手帳2級以上／精神障害者保健福祉手帳2級以上／療育手帳A1・A2／障害基礎年金証書1級など（+3）', value: 'adj_parent_disability_1', points: 3 },
      { label: '身体障害者手帳3級以下／精神障害者保健福祉手帳3級／療育手帳B1・B2／障害基礎年金証書2級など（+2）', value: 'adj_parent_disability_2', points: 2 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '同居人が障がい等を有していますか？',
    helpText: '基本指数の類型が「介護・看護」以外の場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_0', points: 0 },
      { label: '身体障害者手帳2級以上／精神障害者保健福祉手帳2級以上／療育手帳A1・A2／障害基礎年金証書1級／特別児童扶養手当証書（+2）', value: 'adj_family_disability_1', points: 2 },
      { label: '継続的な入院その他医療を必要とする児童の看護・介護を行っている（+2）', value: 'adj_family_disability_2', points: 2 },
      { label: '身体障害者手帳3級以下／精神障害者保健福祉手帳3級／療育手帳B1・B2／障害基礎年金証書2級／特別児童扶養手当証書（+1）', value: 'adj_family_disability_3', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: '育児休業の取得に伴い保育施設等を自主的に退園した児童について、再度利用申込した（+25）', value: 'adj_leave_return_1', points: 25 },
      { label: '育児休業から復帰予定である（申込から利用開始までの間に復帰する場合を含む）（+5）', value: 'adj_leave_return_2', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '複数の児童が保育施設等を利用しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '既に兄弟姉妹が利用中で、そのどちらかの施設を第1希望として異動申込をする（+25）', value: 'adj_sibling_1', points: 25 },
      { label: '既に兄弟姉妹が利用中で、同一の施設を第1希望として新規利用申込をする（+10）', value: 'adj_sibling_2', points: 10 },
      { label: '多胎児が保育施設等の新規利用申込をする（+6）', value: 'adj_sibling_3', points: 6 },
      { label: '兄弟姉妹（多胎児を含む）が同時に、同一の保育施設等の利用申込をする（+5）', value: 'adj_sibling_4', points: 5 },
      { label: '既に兄弟姉妹が利用中、または兄弟姉妹が同時に利用申込をする（上記に該当しない場合）（+1）', value: 'adj_sibling_5', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が市内の保育施設等で月80時間以上勤務することを常態としていますか？',
    helpText: '認可外保育施設および新制度未移行幼稚園を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_nursery_staff_1', points: 15 },
    ],
  },
  {
    id: 'adj_school_area',
    category: 'adjustment',
    label: '地域の小学校区域の保育施設等を第1希望として利用申込をしますか？',
    helpText: '緑風こども園・やまびこ久辺保育園・聖ルカ保育園・キリン保育園・銀のすず保育園に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_school_area_0', points: 0 },
      { label: 'はい（+25）', value: 'adj_school_area_1', points: 25 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '認可外保育施設を利用していますか？',
    helpText: '保護者どちらも保育の事由が「就労」（就労予定、育児休業中を除く）「疾病・障がい」「介護・看護」「就学」に該当している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_unlicensed_1', points: 5 },
    ],
  },
  {
    id: 'adj_family_business',
    category: 'adjustment',
    label: '親族が経営している事業等に就労し、配偶者控除または扶養控除の対象となり、収入が確認できないですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_business_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_family_business_1', points: -5 },
    ],
  },
  {
    id: 'adj_fee_agreed',
    category: 'adjustment',
    label: '保育料の滞納分を児童手当から徴収することに承認の申出をしていますか？',
    helpText: '卒園児に係る利用者負担額を滞納している場合も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_agreed_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_fee_agreed_1', points: -5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育ができる60歳未満の親族等と同居していますか？',
    helpText: '同一敷地内および二世帯住宅を含みます。ひとり親家庭で加算を受けた場合や、その親族等の保育を必要とする証明書類を提出する場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_grandparent_1', points: -5 },
    ],
  },
  {
    id: 'adj_leave_extendable',
    category: 'adjustment',
    label: '希望する施設に入園できない場合、育児休業の延長も許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extendable_0', points: 0 },
      { label: 'はい（−110）', value: 'adj_leave_extendable_1', points: -110 },
    ],
  },
];

export const nagoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
