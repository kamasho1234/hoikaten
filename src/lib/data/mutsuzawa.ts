import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 睦沢町 保育園入園 利用調整基準データ
// 出典: 睦沢町「睦沢町認定こども園（保育）利用調整基準表」
// https://www.town.mutsuzawa.chiba.jp/wp-content/uploads/2017/09/c381bb2d32a31401af1a4b0461cae9c1.xlsx
// -------------------------------------------------------------------------
// 睦沢町は表の冒頭に計算式が書かれている。
//   「保護者（2人分）の基準指数　＋　調整指数　＝　合計点」
//   1. 基準指数（父母それぞれの点数を合算する）
// 父母それぞれを合算するので scoringMethod は 'sum'。
//
// 【基準指数及び調整指数における注意事項】
//   「・基準指数の最高は、20とする。」→ baseCap を 20 にしている。
//   「・複数の要件に該当する場合は、点数の高いほうを採用する。」
//   「・保護者が1人のときは指数に10点加える。」→ 調整の設問に入れている。
//   「・労働時間は、休憩時間を含む。」
// 基準指数の最大は1人あたり10点。
//
// 「看護・介護・付添（同居の親族）」の居宅外と「通学・就学」は
// 「上記『居宅外労働』の基準点を準用」なので、その刻みを使っている。
//
// 原典で指数が幅・言葉でしか書かれていない項目は入れていない。
// - 調整指数「保育士等・看護師・栄養士又は介護職員として町内福祉施設に
//   勤務することが明らかな場合（各資格により）」（3〜1）
// - 調整指数「保育が必要な状態で、一時保育又は町外の保育施設を利用している
//   ことが明らかな場合」（1〜3）
// - 調整指数「児童福祉の観点から保育の利用が必要と認められた場合
//   （緊急度が高いと判断される場合は指数に従わず判断し得る）」
// -------------------------------------------------------------------------

const municipality = {
  id: 'mutsuzawa',
  name: '睦沢町',
  slug: 'mutsuzawa',
  prefecture: '千葉県',
  maxBasePoints: 20, // 父母各10点の合計
  baseCap: 20,
  scoringMethod: 'sum',
} as const;

// 居宅外労働・居宅内労働（中心者） ／ 居宅内労働（協力者）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働・居宅内労働（中心者）：月間従事日数20日以上／1日7時間以上の就労', value: `${prefix}_employment_0`, points: 10 },
  { label: '居宅外労働・居宅内労働（中心者）：月間従事日数20日以上／1日6時間以上の就労', value: `${prefix}_employment_1`, points: 9 },
  { label: '居宅外労働・居宅内労働（中心者）：月間従事日数12日以上／1日7時間以上の就労', value: `${prefix}_employment_2`, points: 9 },
  { label: '居宅外労働・居宅内労働（中心者）：月間従事日数20日以上／1日4時間以上の就労', value: `${prefix}_employment_3`, points: 8 },
  { label: '居宅外労働・居宅内労働（中心者）：月間従事日数12日以上／1日6時間以上の就労', value: `${prefix}_employment_4`, points: 8 },
  { label: '居宅内労働（協力者）：月間従事日数20日以上／1日7時間以上の就労', value: `${prefix}_employment_5`, points: 8 },
  { label: '居宅外労働・居宅内労働（中心者）：月間従事日数12日以上／1日4時間以上の就労', value: `${prefix}_employment_6`, points: 7 },
  { label: '居宅内労働（協力者）：月間従事日数20日以上／1日6時間以上の就労', value: `${prefix}_employment_7`, points: 7 },
  { label: '居宅内労働（協力者）：月間従事日数12日以上／1日7時間以上の就労', value: `${prefix}_employment_8`, points: 7 },
  { label: '居宅外労働・居宅内労働（中心者）：上記以外で月60時間以上の就労', value: `${prefix}_employment_9`, points: 6 },
  { label: '居宅内労働（協力者）：月間従事日数20日以上／1日4時間以上の就労', value: `${prefix}_employment_10`, points: 6 },
  { label: '居宅内労働（協力者）：月間従事日数12日以上／1日6時間以上の就労', value: `${prefix}_employment_11`, points: 6 },
  { label: '居宅内労働（協力者）：月間従事日数12日以上／1日4時間以上の就労', value: `${prefix}_employment_12`, points: 5 },
  { label: '居宅内労働（協力者）：上記以外で月60時間以上の就労', value: `${prefix}_employment_13`, points: 4 },
];

// 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の産前6週の属する月から産後8週の属する月以内', value: `${prefix}_childbirth_0`, points: 9 },
];

// 疾病等・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病等：入院（概ね1カ月以上の入院）', value: `${prefix}_illness_0`, points: 10 },
  { label: '疾病等：自宅療養（常時病臥）、感染症', value: `${prefix}_illness_1`, points: 10 },
  { label: '障害：身障1級・2級、精神1級、療育A', value: `${prefix}_illness_2`, points: 10 },
  { label: '障害：身障3〜6級、精神2級・3級、療育B', value: `${prefix}_illness_3`, points: 9 },
  { label: '疾病等：医師が長期加療（安静）を要すると診断したもの', value: `${prefix}_illness_4`, points: 8 },
  { label: '疾病等：疾病は比較的軽症であるが、定期的通院等を要するもの', value: `${prefix}_illness_5`, points: 3 },
];

// 看護・介護・付添（同居の親族）
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅外：月間従事日数20日以上／1日7時間以上の付添', value: `${prefix}_care_0`, points: 10 },
  { label: '居宅外：月間従事日数20日以上／1日6時間以上の付添', value: `${prefix}_care_1`, points: 9 },
  { label: '居宅外：月間従事日数12日以上／1日7時間以上の付添', value: `${prefix}_care_2`, points: 9 },
  { label: '居宅内：身障1級・2級、精神1級、療育Aの親族の看護・介護', value: `${prefix}_care_3`, points: 9 },
  { label: '居宅外：月間従事日数20日以上／1日4時間以上の付添', value: `${prefix}_care_4`, points: 8 },
  { label: '居宅外：月間従事日数12日以上／1日6時間以上の付添', value: `${prefix}_care_5`, points: 8 },
  { label: '居宅外：月間従事日数12日以上／1日4時間以上の付添', value: `${prefix}_care_6`, points: 7 },
  { label: '居宅内：身障3〜6級、精神2級・3級、療育Bの親族の看護・介護', value: `${prefix}_care_7`, points: 6 },
  { label: '居宅外：上記以外で月60時間以上の付添', value: `${prefix}_care_8`, points: 6 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧従事（震災・風水害・火災・その他）', value: `${prefix}_disaster_0`, points: 10 },
];

// 要支援
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待・DV等', value: `${prefix}_dv_0`, points: 10 },
];

// 通学・就学（居宅外労働の基準点を準用）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月間従事日数20日以上／1日7時間以上の通学', value: `${prefix}_school_0`, points: 10 },
  { label: '月間従事日数20日以上／1日6時間以上の通学', value: `${prefix}_school_1`, points: 9 },
  { label: '月間従事日数12日以上／1日7時間以上の通学', value: `${prefix}_school_2`, points: 9 },
  { label: '月間従事日数20日以上／1日4時間以上の通学', value: `${prefix}_school_3`, points: 8 },
  { label: '月間従事日数12日以上／1日6時間以上の通学', value: `${prefix}_school_4`, points: 8 },
  { label: '月間従事日数12日以上／1日4時間以上の通学', value: `${prefix}_school_5`, points: 7 },
  { label: '上記以外で月60時間以上の通学', value: `${prefix}_school_6`, points: 6 },
];

// 求職中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: 'ハローワークカードの提出がある場合', value: `${prefix}_jobseeking_0`, points: 3 },
  { label: 'ハローワークカードの提出がない場合', value: `${prefix}_jobseeking_1`, points: 1 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基準指数は父母それぞれの点数を合算します（最高20点）',
    inputType: 'select',
    options: [
      { label: '労働', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病等・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護・介護・付添', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '要支援（虐待・DV等）', value: `${prefix}_reason_dv`, points: 0 },
      { label: '通学・就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働の状況は？`,
      helpText: '労働時間は休憩時間を含みます。父母が同じ居宅内労働の場合は1人を協力者とみなします',
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
      label: `${parentLabel}の疾病等・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居の親族の看護・介護・付添の状況は？`,
      helpText: '居宅外は「居宅外労働」の基準点を準用します',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に従事していますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯は虐待・DV等にあたりますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の通学・就学の状況は？`,
      helpText: '学校通学・職業訓練校通所等が対象で、「居宅外労働」の基準点を準用します',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 調整指数（注意事項「保護者が1人のときは指数に10点加える」を含む）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯、離婚調停又は単身赴任により配偶者と別居中の世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_1', points: 3 },
    ],
  },
  {
    id: 'adj_one_parent_bonus',
    category: 'adjustment',
    label: '保護者が1人ですか？（指数に10点加える）',
    helpText: '注意事項「保護者が1人のときは指数に10点加える」の加点です。上のひとり親世帯（+3）とは別に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_one_parent_bonus_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_one_parent_bonus_1', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_1', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同一敷地内に居住する65歳未満の祖父母等親族が保育できると認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_grandparent_1', points: -2 },
    ],
  },
  {
    id: 'adj_other_child',
    category: 'adjustment',
    label: '申込をする児童以外に養育する児童がおり、その児童については入所等の申込みを行いませんか？',
    helpText: '幼稚園等その他の施設に通所している場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_child_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_other_child_1', points: -3 },
    ],
  },
  {
    id: 'adj_hazard',
    category: 'adjustment',
    label: '保護者が通常家庭では存在しない危険物を扱う業種に従事しているが、他に児童を保育する者がなく、やむを得ず職場で保育していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hazard_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_hazard_1', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料を滞納していますか？（修了児・退園児含む）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_fee_delinquent_1', points: -3 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '勤務先の破産等による離職又は整理解雇その他の自己の責めに帰すべき理由によらない離職による求職中ですか？',
    helpText: '離職日の属する月の翌月から3ヶ月間に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_unemployed_1', points: 2 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '父又は母が産後休暇又は育児休暇明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_return_to_work_1', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹についてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '兄弟姉妹が既に睦沢こども園に入園している（+2）', value: 'adj_sibling_1', points: 2 },
      { label: '保育の実施を受けていない児童が、同じく保育の実施を受けていない兄弟姉妹と同時に申込をする（+1）', value: 'adj_sibling_2', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '障害児であり、発達支援が必要と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '保留決定後、6ケ月以上が経過していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_waiting_1', points: 2 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '保育が利用できない場合、休業又は休暇も許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_0', points: 0 },
      { label: 'はい（−20）', value: 'adj_leave_extension_1', points: -20 },
    ],
  },
  {
    id: 'adj_outside_town',
    category: 'adjustment',
    label: '町外在住者ですか？',
    helpText: '町内転入予定の場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_town_0', points: 0 },
      { label: 'はい（−6）', value: 'adj_outside_town_1', points: -6 },
    ],
  },
];

export const mutsuzawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
