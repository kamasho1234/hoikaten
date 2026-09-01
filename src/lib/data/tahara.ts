import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 田原市 保育園入園 利用調整基準データ
// 出典: 田原市「保育の利用調整選考基準表」(PDF)
// https://www.city.tahara.aichi.jp/_res/projects/default_project/_page_/001/012/105/riyoutyouseikizyun_r8.pdf
// ---------------------------------------------------------------------------
// 田原市は「(1)選考基準表（父母それぞれ）＋(2)調整表」の加算方式。
// 父母の合計点数は最高20点・最低6点、ひとり親家庭で保護者が就労している場合の
// 最低は8点と定められている（当サイトの計算では上限・下限は適用していない）。
// 区分・形態が2項目以上に該当する場合は、基準点数の高い方を採用する。
// ---------------------------------------------------------------------------
// 「就学」「夜間就労」は基準表で「1号の就労内容の区分に係る点数に準ずる」と
// されており固有の点数がないため、就労の点数区分にそろえた選択肢にしている。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tahara',
  name: '田原市',
  slug: 'tahara',
  prefecture: '愛知県',
  maxBasePoints: 10,
} as const;

const laborOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_labor_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上', value: `${prefix}_labor_10`, points: 10 },
  { label: '月20日以上かつ1日7時間以上', value: `${prefix}_labor_9`, points: 9 },
  { label: '月20日以上かつ1日6時間以上', value: `${prefix}_labor_8`, points: 8 },
  { label: '月16日以上かつ1日8時間以上', value: `${prefix}_labor_8b`, points: 8 },
  { label: '月16日以上かつ1日6時間以上', value: `${prefix}_labor_7`, points: 7 },
  { label: '月14日以上かつ1日4時間以上', value: `${prefix}_labor_6`, points: 6 },
];

const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月14日以上かつ1日4時間以上の内職', value: `${prefix}_homework_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産・出産予定', value: `${prefix}_childbirth_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院が1か月以上にわたる', value: `${prefix}_illness_10`, points: 10 },
  { label: '退院後、1か月以上毎日通院を要する', value: `${prefix}_illness_9`, points: 9 },
  { label: '精神性・伝染性等の疾病で長期療養を要する', value: `${prefix}_illness_10b`, points: 10 },
  { label: '常時病臥の状態が1か月以上', value: `${prefix}_illness_10c`, points: 10 },
  { label: '1か月以上の疾病で週3日以上の通院を要する', value: `${prefix}_illness_8`, points: 8 },
  { label: '1か月以上の疾病（上記以外）', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 療育A / 精神1・2級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3・4級 / 療育B / 精神3級', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体5・6級 / 療育C', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院付添等・月20日以上かつ1日8時間以上', value: `${prefix}_care_9`, points: 9 },
  { label: '病院付添等・月16日以上かつ1日6時間以上', value: `${prefix}_care_7`, points: 7 },
  { label: '病院付添等・月14日以上かつ1日4時間以上', value: `${prefix}_care_6`, points: 6 },
  { label: '常時介護または週5日以上の居宅介護（身体1・2級 / 精神1・2級 / 要介護4・5程度）', value: `${prefix}_care_9b`, points: 9 },
  { label: '一部介護または週3日以上の居宅介護（身体3級 / 精神3級 / 要介護2・3程度）', value: `${prefix}_care_7b`, points: 7 },
  { label: '上記以外の介護（送迎を含む）', value: `${prefix}_care_6b`, points: 6 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害（火災・風水害・地震等）の復旧にあたっている', value: `${prefix}_disaster_9`, points: 9 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備を含む）', value: `${prefix}_jobseeking_6`, points: 6 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学・職業訓練（月20日以上かつ1日8時間以上に相当）', value: `${prefix}_school_10`, points: 10 },
  { label: '就学・職業訓練（月20日以上かつ1日6時間以上に相当）', value: `${prefix}_school_8`, points: 8 },
  { label: '就学・職業訓練（月14日以上かつ1日4時間以上に相当）', value: `${prefix}_school_6`, points: 6 },
];

const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '虐待やDVのおそれがある', value: `${prefix}_other_10`, points: 10 },
  { label: '配偶者が行方不明・拘禁等', value: `${prefix}_other_10b`, points: 10 },
  { label: '保護者が満65歳以上', value: `${prefix}_other_10c`, points: 10 },
  { label: '養育能力がない旨の判断を児童相談所等から受けている', value: `${prefix}_other_10d`, points: 10 },
  { label: '育休取得時に既に保育を利用している子どもが2人以上いて継続利用が必要', value: `${prefix}_other_9`, points: 9 },
  { label: '育休取得時に既に保育を利用している子どもが1人いて継続利用が必要', value: `${prefix}_other_7`, points: 7 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText:
      '田原市は父母それぞれに基準点数をつけて合計します。2項目以上あてはまる場合は高い方の点数が使われます',
    inputType: 'select',
    options: [
      { label: '労働（居宅外・居宅内）', value: `${prefix}_reason_labor`, points: 0 },
      { label: '内職', value: `${prefix}_reason_homework`, points: 0 },
      { label: '出産等', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '心身障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職等', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: 'その他（虐待・育休時の継続利用など）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_labor`, category, label: `${parentLabel}の労働の状況は？`, inputType: 'radio', options: laborOptions(prefix) },
    { id: `${prefix}_homework`, category, label: `${parentLabel}の内職の状況は？`, inputType: 'radio', options: homeworkOptions(prefix) },
    { id: `${prefix}_childbirth`, category, label: `${parentLabel}の出産の状況は？`, inputType: 'radio', options: childbirthOptions(prefix) },
    { id: `${prefix}_illness`, category, label: `${parentLabel}の疾病の状況は？`, inputType: 'radio', options: illnessOptions(prefix) },
    { id: `${prefix}_disability`, category, label: `${parentLabel}の心身障害の程度は？`, inputType: 'radio', options: disabilityOptions(prefix) },
    { id: `${prefix}_care`, category, label: `${parentLabel}の介護・看護の状況は？`, inputType: 'radio', options: careOptions(prefix) },
    { id: `${prefix}_disaster`, category, label: `${parentLabel}は災害の復旧にあたっていますか？`, inputType: 'radio', options: disasterOptions(prefix) },
    { id: `${prefix}_jobseeking`, category, label: `${parentLabel}は求職活動をしていますか？`, inputType: 'radio', options: jobSeekingOptions(prefix) },
    { id: `${prefix}_school`, category, label: `${parentLabel}の就学の状況は？`, inputType: 'radio', options: schoolOptions(prefix) },
    { id: `${prefix}_other`, category, label: `${parentLabel}のその他の状況は？`, inputType: 'radio', options: otherOptions(prefix) },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_closed_facility',
    category: 'adjustment',
    label: '保育施設の統合・閉園に関係しますか？（いずれか一方のみ適用）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_closed_facility_none', points: 0 },
      { label: '旧保育施設所在地区の児童（+5）', value: 'adj_closed_facility_area', points: 5 },
      { label: '旧保育施設の利用児童（+5）', value: 'adj_closed_facility_user', points: 5 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が市内保育施設で保育士・保育教諭・看護師として就労（予定を含む）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: '月120時間以上勤務（+5）', value: 'adj_hoikushi_120', points: 5 },
      { label: '月56時間以上勤務（+3）', value: 'adj_hoikushi_56', points: 3 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？（離婚調停中で別居等を含む・単身赴任や離婚前提別居は含まない）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、就労による自立支援につながりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployed_yes', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所希望児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが既に利用している保育施設に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_enrolled_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_together',
    category: 'adjustment',
    label: 'きょうだいが同月からの入所を希望して新規申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_together_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_together_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育事業などの地域型保育事業の卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_graduate_yes', points: 1 },
    ],
  },
  {
    id: 'adj_self_home',
    category: 'adjustment',
    label: '自営業の居宅内労働者ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_self_home_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_self_home_yes', points: -1 },
    ],
  },
  {
    id: 'adj_farmer',
    category: 'adjustment',
    label: '農業従事者（専従者）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_farmer_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_farmer_yes', points: -1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保護者に保育料等の滞納額がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-4）', value: 'adj_fee_delinquent_yes', points: -4 },
    ],
  },
];

export const taharaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
