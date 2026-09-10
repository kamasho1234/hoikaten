import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 下松市 保育園入園 利用調整基準データ
// 出典: 下松市「下松市保育利用調整基準」
// https://www.city.kudamatsu.lg.jp/kosodateshien/fukushi/jidou/documents/kizyun_1.pdf
// -------------------------------------------------------------------------
// 下松市は原典に手順がはっきり書かれている。
//   (1) 父母それぞれの状況に当てはまる「①基本項目」を合算する
//   (2) 「②調整項目」に該当する場合は、同表に定める評点数を加減する
//   (3) 評点が高い順に利用調整を行う
// これにより scoringMethod は 'sum'。基本項目の最大は1人あたり10点。
// 「基本項目について、複数該当する場合は、評点の高い方を適用する」とあるため、
// 事由ごとの設問は1つだけ選ぶ形にしている。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 調整項目「児童虐待・配偶者からのDV等の疑いがある世帯」（※）
//   … 「状況に応じて判断をする」とあり、点数が定まらない
// - 備考(3)「世帯状況が、この利用調整基準の評点数により難い場合は、市長が必要とする評点数とする」
// -------------------------------------------------------------------------

const municipality = {
  id: 'kudamatsu',
  name: '下松市',
  slug: 'kudamatsu',
  prefecture: '山口県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// ①基本項目 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '正規雇用', value: `${prefix}_employment_0`, points: 10 },
  { label: '臨時雇用等で1日8時間以上', value: `${prefix}_employment_1`, points: 8 },
  { label: '臨時雇用等で1日6〜8時間未満', value: `${prefix}_employment_2`, points: 7 },
  { label: '臨時雇用等で1日4〜6時間未満', value: `${prefix}_employment_3`, points: 6 },
  { label: '自営業（家族従事者を含む）で1日8時間以上', value: `${prefix}_employment_4`, points: 8 },
  { label: '自営業（家族従事者を含む）で1日6〜8時間未満', value: `${prefix}_employment_5`, points: 7 },
  { label: '自営業（家族従事者を含む）で1日4〜6時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '自営業の準備中', value: `${prefix}_employment_7`, points: 4 },
  { label: '内職で1日8時間以上', value: `${prefix}_employment_8`, points: 4 },
  { label: '内職で1日6〜8時間未満', value: `${prefix}_employment_9`, points: 3 },
  { label: '内職で1日4〜6時間未満', value: `${prefix}_employment_10`, points: 2 },
];

// ①基本項目 妊娠、出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の前月から翌々月', value: `${prefix}_childbirth_0`, points: 8 },
];

// ①基本項目 疾病、障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '身体・精神障がい1〜2級', value: `${prefix}_illness_1`, points: 10 },
  { label: '自宅・通院加療で寝たきり', value: `${prefix}_illness_2`, points: 9 },
  { label: '自宅療養で安静を要する等、保育が日常的に困難', value: `${prefix}_illness_3`, points: 8 },
  { label: '身体・精神障がい3級', value: `${prefix}_illness_4`, points: 8 },
  { label: '自宅・通院加療（その他）', value: `${prefix}_illness_5`, points: 7 },
  { label: '身体・精神障がい4級〜6級、療育手帳', value: `${prefix}_illness_6`, points: 6 },
];

// ①基本項目 親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '自宅外（入院・通院・通所）で月120時間以上の看護・付添', value: `${prefix}_care_0`, points: 9 },
  { label: '自宅で心身の傷病または障がいにより常時介護が必要と認められる', value: `${prefix}_care_1`, points: 9 },
  { label: '自宅外（入院・通院・通所）で月90時間以上の看護・付添', value: `${prefix}_care_2`, points: 7 },
  { label: '自宅での介護・看護（その他）', value: `${prefix}_care_3`, points: 7 },
  { label: '自宅外（入院・通院・通所）で月60時間以上の看護・付添', value: `${prefix}_care_4`, points: 4 },
  { label: '自宅外の看護・付添（その他）', value: `${prefix}_care_5`, points: 1 },
];

// ①基本項目 家庭の災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害等で居宅を消失、破損', value: `${prefix}_disaster_0`, points: 10 },
];

// ①基本項目 不存在等
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '父母の死亡・離別・別居・拘禁・行方不明等', value: `${prefix}_absent_0`, points: 10 },
];

// ①基本項目 就学・職業訓練学校
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学・職業訓練学校に通っている', value: `${prefix}_school_0`, points: 7 },
];

// ①基本項目 求職中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_0`, points: 1 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '下松市は父母それぞれの基本項目を合算します。複数該当する場合は評点の高い方を適用します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭の災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '不存在等', value: `${prefix}_reason_absent`, points: 0 },
      { label: '就学・職業訓練学校', value: `${prefix}_reason_school`, points: 0 },
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
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
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の親族の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：家庭の災害がありましたか？`,
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
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は就学・職業訓練学校に通っていますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職中ですか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ②調整項目
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_1', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労により自立支援が図られる場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童が障がいを有していますか？',
    helpText: '障がいに関する手帳、もしくは手帳交付に関する診断書が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_child_disability_1', points: 5 },
    ],
  },
  {
    id: 'adj_rehome',
    category: 'adjustment',
    label: '里帰り出産のため退所した施設への再入園ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_rehome_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_rehome_1', points: 15 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '父母が産後休暇または育児休暇明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: '正規（+7）', value: 'adj_leave_return_1', points: 7 },
      { label: '非正規で復職後の就労時間が1日8時間以上（+5）', value: 'adj_leave_return_2', points: 5 },
      { label: '非正規で復職後の就労時間が1日6〜8時間未満（+4）', value: 'adj_leave_return_3', points: 4 },
      { label: '非正規で復職後の就労時間が1日4〜6時間未満（+3）', value: 'adj_leave_return_4', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹2人以上の新規入所を同時に申込みますか？',
    helpText: '転園希望の場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_1', points: 5 },
    ],
  },
  {
    id: 'adj_kodomoen_change',
    category: 'adjustment',
    label: '入所中の認定こども園内で1号から2号への変更ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kodomoen_change_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_kodomoen_change_1', points: 5 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '年齢に上限がある市内保育所等を卒園し、他の市内保育所等へ申込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: '認可施設からの卒園（+3）', value: 'adj_graduate_1', points: 3 },
      { label: '認可外施設からの卒園（+1）', value: 'adj_graduate_2', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '正当な理由なく保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_fee_delinquent_1', points: -10 },
    ],
  },
];

export const kudamatsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
