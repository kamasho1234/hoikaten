import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 愛荘町 保育園入園 利用調整基準データ
// 出典: 愛荘町「保育施設利用選考基準表」
// https://www.town.aisho.shiga.jp/material/files/group/16/kijyunshisu.pdf
// -------------------------------------------------------------------------
// 愛荘町は別表の冒頭に手順が書かれている。
//   「『（1）基本点数表』により、世帯保育に欠ける状況に応じ基本点数を設定する。
//    また『（2）調整指数表』により、該当する内容に応じて加点・減点を行い、
//    基本点数および調整指数の合算点数の高い世帯から入所承諾を行う。」
// 基本点数の表は「父」「母」それぞれの列に点数が並ぶ。
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基本点数の最大は1人あたり100点。
//
// 表の最後の注記「※父母が複数の要件に該当する場合は、各々の基本点数の高い方を適用する。」
// により、事由ごとの設問は1つだけ選ぶ形にしている。
//
// 「妊娠・出産」は父の欄が斜線になっているため、母のみの区分である。
//
// 原典で数値を出していない項目（※）は選択肢にしていない。
// - 虐待・DV「虐待・DV等により、特に保育が必要と認める場合」
//
// 調整指数の障害者手帳（+5／+3）は、原典に「基本点数表と重複しない」と
// 但し書きがあるため、その旨を説明文に入れている。
//
// 「現在、保育所を利用していて転園をしようとする場合」（△5）と
// 「兄弟姉妹が利用している保育園へ転園を希望する場合」（+3）は、
// いま園を利用している方の話なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'aisho',
  name: '愛荘町',
  slug: 'aisho',
  prefecture: '滋賀県',
  maxBasePoints: 200, // 父母各100点の合計
  scoringMethod: 'sum',
} as const;

// 就労（自宅外労働・自宅内労働）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '自宅外（外勤）：月20日以上かつ1日8時間以上', value: `${prefix}_employment_0`, points: 100 },
  { label: '自宅内（自営）：月20日以上かつ1日8時間以上', value: `${prefix}_employment_1`, points: 100 },
  { label: '自宅外（外勤）：月16日以上かつ1日8時間以上', value: `${prefix}_employment_2`, points: 90 },
  { label: '自宅内（自営）：月16日以上かつ1日8時間以上', value: `${prefix}_employment_3`, points: 90 },
  { label: '自宅外（外勤）：月20日以上かつ1日6時間以上', value: `${prefix}_employment_4`, points: 80 },
  { label: '自宅内（自営）：月20日以上かつ1日6時間以上', value: `${prefix}_employment_5`, points: 80 },
  { label: '自宅内（内職）：月20日以上かつ1日8時間以上', value: `${prefix}_employment_6`, points: 70 },
  { label: '自宅外（外勤）：月16日以上かつ1日6時間以上', value: `${prefix}_employment_7`, points: 70 },
  { label: '自宅内（自営）：月16日以上かつ1日6時間以上', value: `${prefix}_employment_8`, points: 70 },
  { label: '自宅外（外勤）：月20日以上かつ1日4時間以上', value: `${prefix}_employment_9`, points: 60 },
  { label: '自宅内（自営）：月20日以上かつ1日4時間以上', value: `${prefix}_employment_10`, points: 60 },
  { label: '自宅外（外勤）：月16日以上かつ1日4時間以上', value: `${prefix}_employment_11`, points: 50 },
  { label: '自宅内（自営）：月16日以上かつ1日4時間以上', value: `${prefix}_employment_12`, points: 50 },
  { label: '自宅内（内職）：月20日以上かつ1日6時間以上', value: `${prefix}_employment_13`, points: 50 },
  { label: '自宅外（外勤）：その他（日数および時間以外で64時間以上就労）', value: `${prefix}_employment_14`, points: 40 },
  { label: '自宅内（自営）：その他（日数および時間以外で64時間以上就労）', value: `${prefix}_employment_15`, points: 40 },
  { label: '自宅内（内職）：月20日以上かつ1日4時間以上', value: `${prefix}_employment_16`, points: 30 },
];

// 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '継続：出産前2ヶ月、出産後6ヶ月', value: `${prefix}_childbirth_0`, points: 80 },
  { label: '新規：出産前1ヶ月、出産後2ヶ月', value: `${prefix}_childbirth_1`, points: 60 },
];

// 保護者の傷病等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院もしくは安静を要する自宅療養で常に病臥している', value: `${prefix}_illness_0`, points: 100 },
  { label: '身体障害者手帳1〜2級、精神障害者保健福祉手帳1〜2級、療育手帳Aの交付を受け、保育が困難', value: `${prefix}_illness_1`, points: 100 },
  { label: '身体障害者手帳3〜4級、精神障害者保健福祉手帳3級、療育手帳B1の交付を受け、保育が困難', value: `${prefix}_illness_2`, points: 80 },
  { label: '通院加療を要し、常に安静を要し保育が困難', value: `${prefix}_illness_3`, points: 70 },
  { label: '身体障害者手帳、精神障害者保健福祉手帳、療育手帳の交付を受け、保育が困難', value: `${prefix}_illness_4`, points: 60 },
  { label: '疾病などにより保育に支障がある', value: `${prefix}_illness_5`, points: 40 },
];

// 同居の親族の介護 ／ 別居の親族の介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居：入院・通院付添 月20日以上かつ1日6時間以上', value: `${prefix}_care_0`, points: 70 },
  { label: '別居：入院・通院付添 月20日以上かつ1日6時間以上', value: `${prefix}_care_1`, points: 60 },
  { label: '同居：心身障がい者等介護 月20日以上かつ1日6時間以上', value: `${prefix}_care_2`, points: 50 },
  { label: '同居：寝たきり老人等介護 月20日以上かつ1日6時間以上', value: `${prefix}_care_3`, points: 50 },
  { label: '別居：心身障がい者等介護 月20日以上かつ1日6時間以上', value: `${prefix}_care_4`, points: 40 },
  { label: '別居：寝たきり老人等介護 月20日以上かつ1日6時間以上', value: `${prefix}_care_5`, points: 40 },
  { label: '上記以外で同居の親族を介護している', value: `${prefix}_care_6`, points: 30 },
  { label: '上記以外で別居の親族を介護している', value: `${prefix}_care_7`, points: 20 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に当たっている', value: `${prefix}_disaster_0`, points: 100 },
];

// 就労予定（内定・求職活動）
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定：月20日以上かつ1日8時間以上', value: `${prefix}_jobseeking_0`, points: 60 },
  { label: '内定：月16日以上かつ1日8時間以上', value: `${prefix}_jobseeking_1`, points: 50 },
  { label: '内定：月20日以上かつ1日6時間以上', value: `${prefix}_jobseeking_2`, points: 40 },
  { label: '内定：月16日以上かつ1日6時間以上', value: `${prefix}_jobseeking_3`, points: 30 },
  { label: '生活保護世帯で保育の実施により自立が見込まれる', value: `${prefix}_jobseeking_4`, points: 30 },
  { label: '内定：月20日以上かつ1日4時間以上', value: `${prefix}_jobseeking_5`, points: 20 },
  { label: '求職活動（活動期間2〜3ヶ月）：月20日以上1日7時間以上希望', value: `${prefix}_jobseeking_6`, points: 20 },
  { label: '求職活動（活動期間1ヶ月以内）：月20日以上1日7時間以上希望', value: `${prefix}_jobseeking_7`, points: 15 },
  { label: '内定：月16日以上かつ1日4時間以上', value: `${prefix}_jobseeking_8`, points: 10 },
  { label: '求職活動（活動期間2〜3ヶ月）：月16日以上1日4時間以上希望', value: `${prefix}_jobseeking_9`, points: 10 },
  { label: '求職活動（活動期間1ヶ月以内）：月16日以上1日4時間以上希望', value: `${prefix}_jobseeking_10`, points: 5 },
];

// 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '常に日中、就学・技能習得のために外出している', value: `${prefix}_school_0`, points: 90 },
  { label: '週に3回程度、就学・技能習得のために外出している', value: `${prefix}_school_1`, points: 70 },
  { label: '上記以外で就学している', value: `${prefix}_school_2`, points: 50 },
  { label: '職業訓練校、専門学校、大学へ就学予定', value: `${prefix}_school_3`, points: 30 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母が複数の要件に該当する場合は、各々の基本点数の高い方を適用します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の傷病等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就労予定（内定・求職活動）', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '原典では母のみに点数が付く区分です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の傷病・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の親族の介護の状況は？`,
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
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の就労予定・求職の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '学校教育法に規定する学校もしくはこれに準ずる施設、職業能力促進法に規定する施設が対象です',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// （2）調整指数表
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+120）', value: 'adj_single_parent_1', points: 120 },
    ],
  },
  {
    id: 'adj_childcare_now',
    category: 'adjustment',
    label: '申込時点の施設の利用状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_childcare_now_0', points: 0 },
      { label: '認可外保育所に児童を預け保育を必要とする（+5）', value: 'adj_childcare_now_1', points: 5 },
      { label: '地域型保育所を利用し卒園する（+5）', value: 'adj_childcare_now_2', points: 5 },
      { label: '兄弟姉妹で幼稚園の利用申込がある（幼稚園の預かり保育を利用している場合は除く）（−5）', value: 'adj_childcare_now_3', points: -5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任で保護者が離れていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: '国外にいる（+5）', value: 'adj_tanshin_1', points: 5 },
      { label: '県外にいる（+3）', value: 'adj_tanshin_2', points: 3 },
    ],
  },
  {
    id: 'adj_correspondence',
    category: 'adjustment',
    label: '通信制による就学ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_correspondence_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_correspondence_1', points: -2 },
    ],
  },
  {
    id: 'adj_family_business',
    category: 'adjustment',
    label: '雇用主が保護者の配偶者もしくは保護者の3親等以内の親族ですか？',
    helpText: '共同経営も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_business_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_family_business_1', points: -2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で保育の実施により自立が見込まれますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_1', points: 2 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者が障害者手帳等の交付を受けていますか？',
    helpText: '基本点数表の「保護者の傷病等」で障がいを選んだ場合は重複しません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_0', points: 0 },
      { label: '障害者手帳1〜2級、精神障害者保健福祉手帳1〜2級、療育手帳A（+5）', value: 'adj_parent_disability_1', points: 5 },
      { label: '障害者手帳3級、精神障害者保健福祉手帳3級、療育手帳B（+3）', value: 'adj_parent_disability_2', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_care',
    category: 'adjustment',
    label: '看護・介護が必要な同居の親族が複数人いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_care_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_multiple_care_1', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '愛荘町内の親族（祖父母。65歳未満の者に限る）に児童を預けることが可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_grandparent_1', points: -2 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '3ヶ月以上保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−30）', value: 'adj_fee_delinquent_1', points: -30 },
    ],
  },
];

export const aishoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
