import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 六戸町 保育園入園 利用調整基準データ
// 出典: 六戸町「入所選考基準」
// https://www.town.rokunohe.aomori.jp/docs/2023080700010/file_contents/1.pdf
// -------------------------------------------------------------------------
// 六戸町は表の備考に手順が書かれている。
//   「1 （1）〜（9）の『保育を必要とする事由』に対応する保育指数の高い者から
//      順次入所の承諾をする。」
//   「2 調整基準に該当する場合は、その該当事由に対応する保育指数を合算・減算する。」
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの指数を合算）に合わせて scoringMethod は 'sum' とした。
// 保育指数の最大は1人あたり10点。
//
// 原典で点数の代わりに「※」と書かれている項目は入れていない。
// - (9)虐待・DV「虐待・DVにより、特に保育が必要と認められる者」
// - 「(1)〜(8)の事由のほか、町長が保育の必要があると認める状態にあるもの」
//
// 調整基準の「学年による加算・減算」（1学年生+6 〜 6学年生−4）は、
// 保育所の入所申込みで使う項目とは読み取れないため入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'rokunohe',
  name: '六戸町',
  slug: 'rokunohe',
  prefecture: '青森県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

// (1)家庭外労働 ／ (2)家庭内労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '家庭外労働（外勤・常勤）：事業所に常時雇用されている者', value: `${prefix}_employment_0`, points: 9 },
  { label: '家庭外労働（外勤・パート）：1日8時間以上', value: `${prefix}_employment_1`, points: 9 },
  { label: '家庭外労働（自営業・本人）：居宅外の自営業で中心者である者', value: `${prefix}_employment_2`, points: 9 },
  { label: '家庭内労働（自営業・本人）：居宅内の自営業で中心者である者', value: `${prefix}_employment_3`, points: 9 },
  { label: '家庭外労働（自営業・協力者）：1日8時間以上', value: `${prefix}_employment_4`, points: 8 },
  { label: '家庭外労働（農業）：1日8時間以上', value: `${prefix}_employment_5`, points: 8 },
  { label: '家庭外労働（外勤・パート）：1日6時間以上', value: `${prefix}_employment_6`, points: 7 },
  { label: '家庭外労働（自営業・協力者）：1日6時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '家庭外労働（農業）：1日6時間以上', value: `${prefix}_employment_8`, points: 7 },
  { label: '家庭内労働（自営業・協力者）：1日8時間以上', value: `${prefix}_employment_9`, points: 7 },
  { label: '家庭外労働（外勤・パート）：1日4時間以上', value: `${prefix}_employment_10`, points: 6 },
  { label: '家庭外労働（自営業・協力者）：1日4時間以上', value: `${prefix}_employment_11`, points: 6 },
  { label: '家庭外労働（農業）：1日4時間以上', value: `${prefix}_employment_12`, points: 6 },
  { label: '家庭内労働（自営業・協力者）：1日6時間以上', value: `${prefix}_employment_13`, points: 6 },
  { label: '家庭内労働（内職）：1日8時間以上', value: `${prefix}_employment_14`, points: 6 },
  { label: '家庭内労働（自営業・協力者）：1日4時間以上', value: `${prefix}_employment_15`, points: 5 },
  { label: '家庭内労働（内職）：1日4時間以上', value: `${prefix}_employment_16`, points: 5 },
];

// (3)母の出産等
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産：出産予定月を含む前後3ヶ月', value: `${prefix}_childbirth_0`, points: 9 },
  { label: '育児休業を終了した場合：育児休業期間終了後、職場復帰をする者', value: `${prefix}_childbirth_1`, points: 9 },
];

// (4)疾病等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病入院：概ね1ヶ月以上の入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '居宅療養（常時病床）：疾病のため、概ね1ヶ月以上常時病床', value: `${prefix}_illness_1`, points: 10 },
  { label: '居宅療養（精神結核）：医師が長期加療（安静）を要すると診断した者', value: `${prefix}_illness_2`, points: 8 },
  { label: '居宅療養（一般療養）：医師が概ね1ヶ月以上加療（安静）を要すると診断した者', value: `${prefix}_illness_3`, points: 6 },
  { label: '居宅療養（その他）：疾病は比較的軽症であるが、定期的通院等を要する者', value: `${prefix}_illness_4`, points: 3 },
];

// (5)看護・介護等
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '心身障害：身体障害者手帳または愛護手帳1・2級を所持する者及び同程度と判断できる者', value: `${prefix}_care_0`, points: 10 },
  { label: '心身障害：愛護手帳A・Bを所持する者及び同程度と判断できる者', value: `${prefix}_care_1`, points: 10 },
  { label: '病人の看護等（入院の付添）：概ね1ヶ月以上親族の入院の付添いに当たっている者', value: `${prefix}_care_2`, points: 10 },
  { label: '病人の看護等（心身障害者の看護）：心身障害児（者）の介護、通園、通院、通学等に当たっている者', value: `${prefix}_care_3`, points: 10 },
  { label: '病人の看護等（寝たきり老人の介護）：同居の祖父母等寝たきり老人の介護に常時当たっている者', value: `${prefix}_care_4`, points: 10 },
  { label: '心身障害：身体障害者手帳3級を所持する者及び同程度と判断できる者', value: `${prefix}_care_5`, points: 7 },
  { label: '病人の看護等（居宅内看護・介護）：同居の家族の長期居宅療養等看護・介護に当たっている者', value: `${prefix}_care_6`, points: 6 },
  { label: '心身障害：身体障害者手帳4級以下を所持する者及び同程度と判断できる者', value: `${prefix}_care_7`, points: 5 },
];

// (6)家庭の災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災、風水害等で家屋が失われ、復旧に当たる者', value: `${prefix}_disaster_0`, points: 10 },
];

// (7)求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '勤務先確定：既に勤務先が内定している者', value: `${prefix}_jobseeking_0`, points: 6 },
  { label: '勤務先未確定：就職活動中である者', value: `${prefix}_jobseeking_1`, points: 3 },
];

// (8)就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '職業訓練校、専門学校、大学等に就学している者', value: `${prefix}_school_0`, points: 7 },
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
      { label: '労働（家庭外・家庭内）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産・育児休業の終了', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護・介護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭の災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産・育児休業の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病等の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護等の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は家庭の災害の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は職業訓練校、専門学校、大学等に就学していますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整基準
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '母子家庭・父子家庭ですか？',
    helpText: '母子家庭は父の死亡・離別・行方不明・拘禁、父子家庭は母の死別・離別・行方不明・拘禁が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: '母子家庭（+5）', value: 'adj_single_parent_1', points: 5 },
      { label: '父子家庭（+5）', value: 'adj_single_parent_2', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法による被保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_1', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹で入所しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_1', points: 3 },
    ],
  },
  {
    id: 'adj_extended_care',
    category: 'adjustment',
    label: '生活指導時間の延長を必要としますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_extended_care_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_extended_care_1', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '60歳未満の祖父母等同居の親族が、子どもの保育ができない正当な理由がありませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（同居していない、または保育できない正当な理由がある）', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_grandparent_1', points: -2 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '月の平均就労日数は？',
    helpText: 'パート、自営業、農業、内職等が対象です',
    inputType: 'radio',
    options: [
      { label: '月24日以上、またはあてはまらない', value: 'adj_work_days_0', points: 0 },
      { label: '月20〜23日（−1）', value: 'adj_work_days_1', points: -1 },
      { label: '月16〜19日（−2）', value: 'adj_work_days_2', points: -2 },
      { label: '月15日以下（−3）', value: 'adj_work_days_3', points: -3 },
    ],
  },
];

export const rokunoheData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
