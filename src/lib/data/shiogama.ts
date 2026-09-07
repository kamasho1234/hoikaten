import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 塩竈市 保育園入園 利用調整基準データ
// 出典: 塩竈市「入所優先順位に関する基準指数」
// https://www.city.shiogama.miyagi.jp/uploaded/attachment/17452.pdf
// -------------------------------------------------------------------------
// 塩竈市は原典の備考に手順が書かれている。
//   「この表の適用については、1〜7により父・母それぞれの指数を把握し、合算する。
//    なお、調整基準に該当する世帯であるときは、
//    その該当事項に対応する指数を把握し加算、減算する。」
// これにより scoringMethod は 'sum'。基準指数の最大は1人あたり20点。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - その他「市長が必要と認める場合」（市長が必要と認める指数）
//
// 「就学・技術習得」は原典が「外勤のパート等の労働時間に準じる」としつつ
// 7時間以上20／6時間以上18／5時間以上16／4時間以上14 と数を示しているので、
// その数で選択肢にしている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'shiogama',
  name: '塩竈市',
  slug: 'shiogama',
  prefecture: '宮城県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

// 1 家庭外労働等 ／ 2 家庭内労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤（常勤）で1日の労働時間が7時間以上', value: `${prefix}_employment_0`, points: 20 },
  { label: '外勤（パート等）で1日の労働時間が7時間以上', value: `${prefix}_employment_1`, points: 20 },
  { label: '外勤（パート等）で1日の労働時間が6時間以上', value: `${prefix}_employment_2`, points: 18 },
  { label: '外勤（パート等）で1日の労働時間が5時間以上', value: `${prefix}_employment_3`, points: 16 },
  { label: '外勤（パート等）で1日の労働時間が4時間以上', value: `${prefix}_employment_4`, points: 14 },
  { label: '家庭外の自営（本人・主たる従事者）で7時間以上', value: `${prefix}_employment_5`, points: 18 },
  { label: '家庭外の自営（本人・主たる従事者）で6時間以上', value: `${prefix}_employment_6`, points: 17 },
  { label: '家庭外の自営（本人・主たる従事者）で5時間以上', value: `${prefix}_employment_7`, points: 16 },
  { label: '家庭外の自営（本人・主たる従事者）で4時間以上', value: `${prefix}_employment_8`, points: 15 },
  { label: '家庭外の自営（家族・協力者）で7時間以上', value: `${prefix}_employment_9`, points: 16 },
  { label: '家庭外の自営（家族・協力者）で6時間以上', value: `${prefix}_employment_10`, points: 15 },
  { label: '家庭外の自営（家族・協力者）で5時間以上', value: `${prefix}_employment_11`, points: 14 },
  { label: '家庭外の自営（家族・協力者）で4時間以上', value: `${prefix}_employment_12`, points: 13 },
  { label: '家庭内の自営（本人・主たる従事者）で7時間以上', value: `${prefix}_employment_13`, points: 18 },
  { label: '家庭内の自営（本人・主たる従事者）で6時間以上', value: `${prefix}_employment_14`, points: 17 },
  { label: '家庭内の自営（本人・主たる従事者）で5時間以上', value: `${prefix}_employment_15`, points: 16 },
  { label: '家庭内の自営（本人・主たる従事者）で4時間以上', value: `${prefix}_employment_16`, points: 14 },
  { label: '家庭内の自営（家族・協力者）で7時間以上', value: `${prefix}_employment_17`, points: 16 },
  { label: '家庭内の自営（家族・協力者）で6時間以上', value: `${prefix}_employment_18`, points: 15 },
  { label: '家庭内の自営（家族・協力者）で5時間以上', value: `${prefix}_employment_19`, points: 14 },
  { label: '家庭内の自営（家族・協力者）で4時間以上', value: `${prefix}_employment_20`, points: 13 },
  { label: '家族全員で農林漁業および民宿等に従事', value: `${prefix}_employment_21`, points: 14 },
  { label: '内職で1日の労働時間が7時間以上', value: `${prefix}_employment_22`, points: 14 },
  { label: '内職で1日の労働時間が6時間以上', value: `${prefix}_employment_23`, points: 13 },
  { label: '内職で1日の労働時間が5時間以上', value: `${prefix}_employment_24`, points: 12 },
  { label: '内職で1日の労働時間が4時間以上', value: `${prefix}_employment_25`, points: 11 },
];

// 1 求職中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労先が内定し、1日の労働時間が7時間以上', value: `${prefix}_jobseeking_0`, points: 19 },
  { label: '就労先が内定し、1日の労働時間が6時間以上', value: `${prefix}_jobseeking_1`, points: 17 },
  { label: '就労先が内定し、1日の労働時間が5時間以上', value: `${prefix}_jobseeking_2`, points: 15 },
  { label: '就労先が内定し、1日の労働時間が4時間以上', value: `${prefix}_jobseeking_3`, points: 13 },
  { label: '就労先未定で、求職のため日中外出を4時間以上する', value: `${prefix}_jobseeking_4`, points: 8 },
  { label: '就労先未定で、求職のため日中外出を3時間以上する', value: `${prefix}_jobseeking_5`, points: 6 },
  { label: '就労先未定で、それ以外', value: `${prefix}_jobseeking_6`, points: 5 },
];

// 1 就学・技術習得
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '7時間以上', value: `${prefix}_school_0`, points: 20 },
  { label: '6時間以上', value: `${prefix}_school_1`, points: 18 },
  { label: '5時間以上', value: `${prefix}_school_2`, points: 16 },
  { label: '4時間以上', value: `${prefix}_school_3`, points: 14 },
];

// 3 出産等
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前2ヶ月、出産後2ヶ月', value: `${prefix}_childbirth_0`, points: 18 },
];

// 4 疾病等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '身体障害者手帳1〜2級または療育手帳A（重度）', value: `${prefix}_illness_0`, points: 20 },
  { label: '入院（1ヶ月以上）', value: `${prefix}_illness_1`, points: 20 },
  { label: '寝たきりの病人', value: `${prefix}_illness_2`, points: 20 },
  { label: '身体障害者手帳3級以上または療育手帳B（中軽度）', value: `${prefix}_illness_3`, points: 16 },
  { label: '精神障害・感染症等の長期加療、安静', value: `${prefix}_illness_4`, points: 16 },
  { label: '一般療養（1ヶ月以上の加療、安静）', value: `${prefix}_illness_5`, points: 12 },
  { label: '疾病は比較的軽症であるが、定期的通院を要する', value: `${prefix}_illness_6`, points: 11 },
];

// 5 病人の看護介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添い（常時）', value: `${prefix}_care_0`, points: 20 },
  { label: '寝たきりの病人の看（介）護', value: `${prefix}_care_1`, points: 16 },
  { label: '心身障害者の看（介）護', value: `${prefix}_care_2`, points: 12 },
  { label: '通院看（介）護', value: `${prefix}_care_3`, points: 11 },
];

// 6 災害等
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風水・地震災害等によりその復旧のため児童の保育が必要', value: `${prefix}_disaster_0`, points: 20 },
];

// 7 その他
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '不存在（死亡・離別・行方不明・拘禁等）', value: `${prefix}_absent_0`, points: 20 },
  { label: '前各号のほか、明らかに保育が必要な場合（育児放棄など）', value: `${prefix}_absent_1`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '塩竈市は父・母それぞれの指数を把握して合算します',
    inputType: 'select',
    options: [
      { label: '労働（外勤・自営・内職・農林漁業）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・技術習得', value: `${prefix}_reason_school`, points: 0 },
      { label: '出産等', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '病人の看護介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害等', value: `${prefix}_reason_disaster`, points: 0 },
      { label: 'その他（不存在・育児放棄など）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・技術習得の状況は？`,
      helpText: '職業訓練等に通学するものは、外勤のパート等の労働時間に準じます',
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
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護介護の状況は？`,
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
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}：その他の事情がありますか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整基準（加算）／（減算）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童自身に心身の障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_child_disability_1', points: 10 },
    ],
  },
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の特殊事情は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_0', points: 0 },
      { label: '母子・父子世帯（死亡・離別・行方不明・拘禁等）（+10）', value: 'adj_household_1', points: 10 },
      { label: '生活保護法による被保護世帯（+10）', value: 'adj_household_2', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が保育所等を利用中、または同時に利用申込をしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_1', points: 4 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保育士等資格を持ち、保育所等で勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '市内の保育所等で勤務（+5）', value: 'adj_nursery_staff_1', points: 5 },
      { label: '市外の保育所等で勤務（+4）', value: 'adj_nursery_staff_2', points: 4 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業のため保育所等を退園し、再申請しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_leave_return_1', points: 10 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育等を卒園し、連携施設等に入所申請しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+16）', value: 'adj_graduate_1', points: 16 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者の1人が単身赴任・入院等で不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_tanshin_1', points: 3 },
    ],
  },
  {
    id: 'adj_dangerous_work',
    category: 'adjustment',
    label: '自営業で危険物を取り扱う業種に従事していますか？',
    helpText: '大型重機・劇薬・火気・刃物などが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dangerous_work_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_dangerous_work_1', points: 2 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '家計の主宰者が失業等になり、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_unemployed_1', points: 10 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '月の平均労働日数は？',
    helpText: 'パート・自営業・農業・内職等の月平均労働日数の実態によります',
    inputType: 'radio',
    options: [
      { label: '月20日以上（減算なし）', value: 'adj_work_days_0', points: 0 },
      { label: '月15〜19日（−2）', value: 'adj_work_days_1', points: -2 },
      { label: '月10〜14日（−4）', value: 'adj_work_days_2', points: -4 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居する65歳未満の祖父母が保育に協力的ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ・同居していない', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−4）', value: 'adj_grandparent_1', points: -4 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '理由なく保育料等の滞納をしていますか？',
    helpText: '卒園した兄弟も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−20）', value: 'adj_fee_delinquent_1', points: -20 },
    ],
  },
];

export const shiogamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
