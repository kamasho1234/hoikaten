import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// つくばみらい市 保育園入園 利用調整基準データ
// 出典: つくばみらい市「つくばみらい市保育施設利用調整基準表」（R8年4月入所分から適用）
// https://www.city.tsukubamirai.lg.jp/data/doc/1776126018_doc_31_0.pdf
// -------------------------------------------------------------------------
// つくばみらい市は「基本点数 ＋ 調整点数の合計点数」の高い方から利用を決める。
// 基本点数は「1人につき1つ選択」、調整点数は「複数選択可」と原典に明記されている。
// 原典は父母の基本点数をどう合わせるかを書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基本点数の最大は1人あたり10点。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 調整点数 No.5「上記以外の特別な事情のある場合」（2〜20）… 幅がある
//
// 次の2つは、この画面で扱う「入園の点数」とは性質が違うため入れていない。
// - 「市内認可保育施設から市内認可保育施設への転所を希望する」（▲200）
// - 「他市区町村に居住しており、つくばみらい市に転入予定がない世帯」（▲300）
//   どちらも実質的に選考の対象から外すための値で、点数の目安として見せると誤解を招く。
// -------------------------------------------------------------------------

const municipality = {
  id: 'tsukubamirai',
  name: 'つくばみらい市',
  slug: 'tsukubamirai',
  prefecture: '茨城県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

// 1 就労（内定含む）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '就労：月20日以上かつ1日8時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '就労：月20日以上かつ1日6時間以上8時間未満', value: `${prefix}_employment_1`, points: 9 },
  { label: '就労：月20日以上かつ1日6時間未満', value: `${prefix}_employment_2`, points: 8 },
  { label: '就労：月15日以上かつ1日8時間以上', value: `${prefix}_employment_3`, points: 8 },
  { label: '就労：月15日以上かつ1日6時間以上8時間未満', value: `${prefix}_employment_4`, points: 7 },
  { label: '就労：月15日以上かつ1日6時間未満', value: `${prefix}_employment_5`, points: 6 },
  { label: '内職：月15日以上かつ1日7時間以上', value: `${prefix}_employment_6`, points: 5 },
  { label: '内職：月15日以上かつ1日5時間以上7時間未満', value: `${prefix}_employment_7`, points: 4 },
  { label: '内職：月15日以上かつ1日5時間未満', value: `${prefix}_employment_8`, points: 3 },
];

// 2 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_school_0`, points: 8 },
  { label: '月140時間以上160時間未満', value: `${prefix}_school_1`, points: 7 },
  { label: '月120時間以上140時間未満', value: `${prefix}_school_2`, points: 6 },
  { label: '月100時間以上120時間未満', value: `${prefix}_school_3`, points: 5 },
  { label: '月64時間以上100時間未満', value: `${prefix}_school_4`, points: 4 },
];

// 3 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月をはさんで前1ヵ月、後2ヵ月の計4ヵ月', value: `${prefix}_childbirth_0`, points: 9 },
];

// 4 病気・障がい等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヵ月以上の入院または緊急性のある入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '医師が1ヵ月以上の常時臥床を要すると診断', value: `${prefix}_illness_1`, points: 10 },
  { label: '身体障害者手帳1・2級／療育手帳マルA・A・B／精神障害者保健福祉手帳1・2級／障害年金1・2級', value: `${prefix}_illness_2`, points: 10 },
  { label: '1ヵ月以上の定期通院を要し常時保育が困難', value: `${prefix}_illness_3`, points: 8 },
  { label: '身体障害者手帳3級（聴力のみ4級）／療育手帳C／精神障害者保健福祉手帳3級／障害年金3級', value: `${prefix}_illness_4`, points: 8 },
  { label: '上記以外の病気・障がいで保育に支障がある', value: `${prefix}_illness_5`, points: 6 },
];

// 5 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1ヵ月以上、常時入院付添にあたっている', value: `${prefix}_care_0`, points: 10 },
  { label: '月20日以上かつ週40時間以上、保育が常時困難', value: `${prefix}_care_1`, points: 9 },
  { label: '月20日以上かつ週30時間以上、保育が困難', value: `${prefix}_care_2`, points: 8 },
  { label: '月16日以上かつ週24時間以上、保育が困難', value: `${prefix}_care_3`, points: 7 },
  { label: '月16日以上かつ週16時間以上、保育が困難', value: `${prefix}_care_4`, points: 6 },
];

// 6 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害の復旧に当たっている', value: `${prefix}_disaster_0`, points: 10 },
];

// 7 不存在
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死別・離別・行方不明・拘禁中', value: `${prefix}_absent_0`, points: 10 },
];

// 8 求職中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '起業の準備を含む求職活動中である', value: `${prefix}_jobseeking_0`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基本点数は1人につき1つだけ選びます',
    inputType: 'select',
    options: [
      { label: '就労（内定含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障がい等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absent`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
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
      label: `${parentLabel}の病気・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
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
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整点数（複数選択可）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_childcare_now',
    category: 'adjustment',
    label: '申込児童は今どのように保育されていますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_childcare_now_0', points: 0 },
      { label: '一時預かり・認可外保育施設を週4日以上利用（+12）', value: 'adj_childcare_now_1', points: 12 },
      { label: '一時預かり・認可外保育施設を週3日利用（+1）', value: 'adj_childcare_now_2', points: 1 },
      { label: '認可保育施設を利用している（+6）', value: 'adj_childcare_now_3', points: 6 },
      { label: '幼稚園在園中であり、預かり保育を利用している（+3）', value: 'adj_childcare_now_4', points: 3 },
      { label: '同伴就労：週4日以上同伴（+2）', value: 'adj_childcare_now_5', points: 2 },
      { label: '同伴就労：週3日同伴（+1）', value: 'adj_childcare_now_6', points: 1 },
      { label: '別居親族等に週4日以上預けている（+2）', value: 'adj_childcare_now_7', points: 2 },
      { label: '別居親族等に週3日預けている（+1）', value: 'adj_childcare_now_8', points: 1 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_transfer_0', points: 0 },
      { label: '地域型保育を卒園し、認可保育施設への入所を希望する（+30）', value: 'adj_transfer_1', points: 30 },
      { label: '転入や市内保育施設の入所保留等、やむを得ない理由で市外認可保育施設を利用しており、市内認可保育施設への転所を希望する（+10）', value: 'adj_transfer_2', points: 10 },
      { label: 'きょうだいのいずれかが利用中の認可保育施設への転所を希望する（+8）', value: 'adj_transfer_3', points: 8 },
      { label: '認定こども園の幼稚園部を利用しており、同一施設での保育を希望する（+4）', value: 'adj_transfer_4', points: 4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: 'きょうだいが認可保育施設を利用している（入所希望年度の就学児を除く）（+10）', value: 'adj_sibling_1', points: 10 },
      { label: '入所申込中のきょうだいの入所が決定した（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '市内の認可保育施設に保育士等として就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '月20日以上かつ1日8時間以上就労している（+50）', value: 'adj_nursery_staff_1', points: 50 },
      { label: '月15日以上かつ月64時間以上就労している（+45）', value: 'adj_nursery_staff_2', points: 45 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育休復帰期間ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+12）', value: 'adj_leave_return_1', points: 12 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計の中心者が倒産・会社都合による失業のため求職中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_unemployed_1', points: 20 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任で常時不在ですか？',
    helpText: '就労証明書に単身赴任中であることが記載されている場合のみ加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_tanshin_1', points: 2 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '父母が障がい者手帳等を持っていますか？',
    helpText: '基本点数が「病気・障がい等」の場合は加算されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_0', points: 0 },
      { label: '身体障害者手帳・精神障害者保健福祉手帳2級以上／療育手帳B以上／障害年金1・2級／難病受給者証（+4）', value: 'adj_parent_disability_1', points: 4 },
      { label: '身体障害者手帳・精神障害者保健福祉手帳3級（聴力4級）／療育手帳C／障害年金3級（+3）', value: 'adj_parent_disability_2', points: 3 },
      { label: '上記以外の障がい者手帳（+2）', value: 'adj_parent_disability_3', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '同居親族（保護者・申込児童を除く）に障がい者手帳の交付を受けている方などがいますか？',
    helpText: '特別児童扶養手当の受給対象児童がいる場合、障害年金を受給している場合も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_family_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '世帯の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_single_parent_0', points: 0 },
      { label: '児童の両親がともに死亡または行方不明（+70）', value: 'adj_single_parent_1', points: 70 },
      { label: 'ひとり親世帯（+60）', value: 'adj_single_parent_2', points: 60 },
      { label: 'ひとり親に該当しないが拘禁中（+20）', value: 'adj_single_parent_3', points: 20 },
      { label: 'ひとり親に該当しないが行方不明（+20）', value: 'adj_single_parent_4', points: 20 },
      { label: 'ひとり親に該当しないが離婚前提別居中（+12）', value: 'adj_single_parent_5', points: 12 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '児童虐待・DVの防止および予防のため、特別支援が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_0', points: 0 },
      { label: 'はい（+60）', value: 'adj_abuse_1', points: 60 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '児童の保育を期待できる60歳未満の祖父母がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_grandparent_1', points: -2 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労内定中ですか？',
    helpText: '派遣会社の登録を含みます。1人につき−1です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_0', points: 0 },
      { label: '1人が内定中（−1）', value: 'adj_job_offer_1', points: -1 },
      { label: '2人が内定中（−2）', value: 'adj_job_offer_2', points: -2 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: '理由なく過去3ヵ月以上滞納している（−10）', value: 'adj_fee_delinquent_1', points: -10 },
      { label: '6ヵ月以上あり、誠意が見られない（−40）', value: 'adj_fee_delinquent_2', points: -40 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '自己都合による入所辞退がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_declined_1', points: -10 },
    ],
  },
  {
    id: 'adj_leave_extendable',
    category: 'adjustment',
    label: '希望園に入所できなかった場合、育児休業の延長も許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extendable_0', points: 0 },
      { label: 'はい（−40）', value: 'adj_leave_extendable_1', points: -40 },
    ],
  },
];

export const tsukubamiraiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
