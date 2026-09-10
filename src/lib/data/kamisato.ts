import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 上里町 保育園入園 利用調整基準データ
// 出典: 上里町「保育所等入所選考基準表」
// https://www.town.kamisato.saitama.jp/secure/4252/kijunhyo.pdf
// -------------------------------------------------------------------------
// 上里町は「保育所等入所選考基準表」（保護者の状況ごとの基準点数）と
// 「加(減)算点数表」の2つを持つ。
// 原典は父母の基準点数をどう合わせるかを書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基準点数の最大は1人あたり12点（災害、両親の不存在、虐待・DV等）。
//
// 加(減)算点数表は「一般事項（世帯への加点）」と「就労（父母への加点）」に
// 分かれている。どちらも世帯・保護者の状況なので調整の設問として持たせている。
//
// 表のいちばん左の「順位」は同点時の優先順位を表すもので、点数ではない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'kamisato',
  name: '上里町',
  slug: 'kamisato',
  prefecture: '埼玉県',
  maxBasePoints: 24, // 父母各12点の合計
  scoringMethod: 'sum',
} as const;

// 家庭外就労（育児休業は復職月から）／ 家庭内就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '家庭外就労（常勤）：月120時間以上の就労を常態としている', value: `${prefix}_employment_0`, points: 9 },
  { label: '家庭外就労（非常勤）：月120時間以上の就労を常態としている', value: `${prefix}_employment_1`, points: 8 },
  { label: '家庭外就労（登録社員等）：月120時間以上の就労を常態としている', value: `${prefix}_employment_2`, points: 8 },
  { label: '家庭外就労（非常勤）：月80時間以上120時間未満の就労を常態としている', value: `${prefix}_employment_3`, points: 7 },
  { label: '家庭外就労（登録社員等）：月48時間以上120時間未満の就労を常態としている', value: `${prefix}_employment_4`, points: 7 },
  { label: '家庭外就労（非常勤）：月48時間以上80時間未満の就労を常態としている', value: `${prefix}_employment_5`, points: 6 },
  { label: '家庭内就労（自営中心者）：月120時間以上の就労を常態としている', value: `${prefix}_employment_6`, points: 8 },
  { label: '家庭内就労（自営中心者）：月48時間以上120時間未満の就労を常態としている', value: `${prefix}_employment_7`, points: 7 },
  { label: '家庭内就労（自営協力者）：月120時間以上の就労を常態としている', value: `${prefix}_employment_8`, points: 7 },
  { label: '家庭内就労（自営協力者）：月80時間以上120時間未満の就労を常態としている', value: `${prefix}_employment_9`, points: 5 },
  { label: '家庭内就労（自営協力者）：月48時間以上80時間未満の就労を常態としている', value: `${prefix}_employment_10`, points: 4 },
  { label: '内職：月48時間以上で月収15,000円以上の内職をしている', value: `${prefix}_employment_11`, points: 4 },
];

// 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の前2か月・出産後2か月', value: `${prefix}_childbirth_0`, points: 7 },
];

// 疾病、負傷、障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院しているか、または入院が決定している', value: `${prefix}_illness_0`, points: 11 },
  { label: '全治1ヶ月以上の安静加療を要する', value: `${prefix}_illness_1`, points: 11 },
  { label: '身体障害者手帳の1級・2級または療育手帳のマルA・Aの場合', value: `${prefix}_illness_2`, points: 11 },
  { label: '身体障害者手帳の3級・4級または療育手帳のB・Cの場合', value: `${prefix}_illness_3`, points: 9 },
  { label: '療養のため保育できない（精神性も含む）', value: `${prefix}_illness_4`, points: 8 },
];

// 介護（看護）
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時寝たきりの家族、身体障害者手帳1級・2級または療育手帳のA・A、要介護認定3・4・5級を所持している家族を常時介護している', value: `${prefix}_care_0`, points: 10 },
  { label: '週3日以上、疾病等の家族の介護、身体障害者手帳の3・4級または療育手帳のB・C、要介護認定1・2級を所持している家族を常時介護している', value: `${prefix}_care_1`, points: 7 },
  { label: '入院している家族に常時付き添っている', value: `${prefix}_care_2`, points: 4 },
  { label: '上記以外で、介護または付き添い看護が必要な場合', value: `${prefix}_care_3`, points: 3 },
];

// 災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災等による家屋の損傷、その他災害復旧のため保育できない', value: `${prefix}_disaster_0`, points: 12 },
];

// 町長が認める特例(1)
const specialOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_special_none`, points: 0 },
  { label: '週3日以上家庭外で、就学・技能習得等のため保育できない（自動車教習所は不可）', value: `${prefix}_special_0`, points: 6 },
  { label: '申請月の翌月に就労予定がある', value: `${prefix}_special_1`, points: 5 },
  { label: '上記各項目以外で、明らかに保育できない', value: `${prefix}_special_2`, points: 5 },
  { label: '育児休業が申請月の翌月に終了する', value: `${prefix}_special_3`, points: 4 },
  { label: '求職活動を継続して行っている', value: `${prefix}_special_4`, points: 4 },
];

// 町長が認める特例(2)
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '両親の死亡や不明、拘禁のため不存在の場合', value: `${prefix}_absent_0`, points: 12 },
  { label: '上記各項目以外（虐待・DV等）で、緊急に入所を要する事由により、明らかに保育できない場合', value: `${prefix}_absent_1`, points: 12 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    inputType: 'select',
    options: [
      { label: '就労（家庭外・家庭内・内職）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護（看護）', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学・就労予定・求職活動など', value: `${prefix}_reason_special`, points: 0 },
      { label: '両親の不存在・虐待・DV等', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '家庭外就労は、育児休業の場合は復職月からが対象です',
      inputType: 'radio',
      options: employmentOptions(prefix),
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
      label: `${parentLabel}の疾病・負傷・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護（看護）の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害により保育できませんか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_special`,
      category,
      label: `${parentLabel}の就学・就労予定・求職の状況は？`,
      inputType: 'radio',
      options: specialOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}：両親の不存在や虐待・DV等がありますか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 加(減)算点数表
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_1', points: 3 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_1', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '父母のいずれかが保育士等として勤務する施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_nursery_staff_1', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_child_disability_1', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '現に兄弟姉妹が入所している施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_1', points: 3 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料に滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_fee_delinquent_1', points: -10 },
    ],
  },
  {
    id: 'adj_family_business',
    category: 'adjustment',
    label: '親族が経営している会社等（自営を含む）に勤務していますか？',
    helpText: '父母への加点です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_business_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_family_business_1', points: -1 },
    ],
  },
  {
    id: 'adj_self_employed_outside',
    category: 'adjustment',
    label: '自営で事業所が家庭外ですか？',
    helpText: '父母への加点です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_self_employed_outside_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_self_employed_outside_1', points: 1 },
    ],
  },
];

export const kamisatoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
