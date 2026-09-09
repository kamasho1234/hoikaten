import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 大樹町 保育園入園 利用調整基準データ
// 出典: 大樹町「認定こども園（保育所部門）利用調整基準表」別表1・別表2
// https://www.town.taiki.hokkaido.jp/material/files/group/6/tyousei.pdf
// -------------------------------------------------------------------------
// 大樹町の別表1には父と母の列があり、それぞれに点数が並ぶ。
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 別表1の最大は1人あたり100点。
//
// 「2 妊娠・出産」は父の欄が「―」なので、母のみの区分である。
//
// 別表1の「8 虐待・DV」は父母の欄が分かれておらず世帯の点数（虐待999／DV100）なので、
// 保護者ごとの選択肢には入れていない。別表2の4「DVのおそれがあるため家庭裁判所から
// 保護命令が出されている場合など、保育の緊急性が高く特に優先が必要と町が認めた場合」
// （+100）が同じ内容なので、そちらの設問で表している。
//
// 原典で点数欄が空欄・言葉の項目は入れていない。
// - 別表1「11 町長特認（その他町長が必要と認める場合）」（点数欄が空欄）
// - 別表1「10 前各号に類するもの（その他、事由1〜9に類する状態として町が認める場合）」（70）
//   該当するかどうかが町の判断によるため
// - 別表2「10 保護者が町内の保育所等で保育士として勤務する場合」（「優先入所」と書かれ点数でない）
//
// いま園を利用している方の話は入れていない。
// - 別表1「9 育児休業以前に保育園等を利用中で、育児休業取得後も引き続き保育が必要」（70）
// - 別表2「8 転園」（年度当初10／転居などによる通園困難20／その他、町が保育の継続の
//   必要性を認めた場合500）
// - 別表2「9 同一認定こども園内において、1号から2号に移る場合」（999）
// -------------------------------------------------------------------------

const municipality = {
  id: 'taiki',
  name: '大樹町',
  slug: 'taiki',
  prefecture: '北海道',
  maxBasePoints: 100,
  scoringMethod: 'sum',
} as const;

// 1 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '被雇用者・自営（中心者）：稼働日が月20日以上／月就労時間数150H以上', value: `${prefix}_employment_0`, points: 100 },
  { label: '被雇用者・自営（中心者）：稼働日が月20日以上／月就労時間数120H以上150H未満', value: `${prefix}_employment_1`, points: 90 },
  { label: '被雇用者・自営（中心者）：稼働日が月16日以上20日未満／月就労時間数150H以上', value: `${prefix}_employment_2`, points: 90 },
  { label: '被雇用者・自営（中心者）：稼働日が月20日以上／月就労時間数80H以上120H未満', value: `${prefix}_employment_3`, points: 85 },
  { label: '被雇用者・自営（中心者）：稼働日が月20日以上／月就労時間数48H以上80H未満', value: `${prefix}_employment_4`, points: 80 },
  { label: '被雇用者・自営（中心者）：稼働日が月16日以上20日未満／月就労時間数120H以上150H未満', value: `${prefix}_employment_5`, points: 80 },
  { label: '被雇用者・自営（中心者）：稼働日が月16日未満／月就労時間数150H以上', value: `${prefix}_employment_6`, points: 80 },
  { label: '自営（協力者）・在宅勤務・内職：稼働日が月20日以上／月就労時間数150H以上', value: `${prefix}_employment_7`, points: 80 },
  { label: '被雇用者・自営（中心者）：稼働日が月16日以上20日未満／月就労時間数80H以上120H未満', value: `${prefix}_employment_8`, points: 75 },
  { label: '被雇用者・自営（中心者）：稼働日が月16日未満／月就労時間数120H以上150H未満', value: `${prefix}_employment_9`, points: 75 },
  { label: '自営（協力者）・在宅勤務・内職：稼働日が月20日以上／月就労時間数120H以上150H未満', value: `${prefix}_employment_10`, points: 75 },
  { label: '被雇用者・自営（中心者）：稼働日が月16日以上20日未満／月就労時間数48H以上80H未満', value: `${prefix}_employment_11`, points: 70 },
  { label: '被雇用者・自営（中心者）：稼働日が月16日未満／月就労時間数48H以上120H未満', value: `${prefix}_employment_12`, points: 70 },
  { label: '自営（協力者）・在宅勤務・内職：稼働日が月20日以上／月就労時間数48H以上120H未満', value: `${prefix}_employment_13`, points: 70 },
  { label: '自営（協力者）・在宅勤務・内職：稼働日が月16日以上20日未満／月就労時間数150H以上', value: `${prefix}_employment_14`, points: 70 },
  { label: '自営（協力者）・在宅勤務・内職：稼働日が月16日以上20日未満／月就労時間数120H以上150H未満', value: `${prefix}_employment_15`, points: 65 },
  { label: '自営（協力者）・在宅勤務・内職：稼働日が月16日以上20日未満／月就労時間数48H以上120H未満', value: `${prefix}_employment_16`, points: 60 },
  { label: '自営（協力者）・在宅勤務・内職：稼働日が月16日未満／月就労時間数150H以上', value: `${prefix}_employment_17`, points: 60 },
  { label: '自営（協力者）・在宅勤務・内職：稼働日が月16日未満／月就労時間数120H以上150H未満', value: `${prefix}_employment_18`, points: 55 },
  { label: '自営（協力者）・在宅勤務・内職：稼働日が月16日未満／月就労時間数48H以上120H未満', value: `${prefix}_employment_19`, points: 50 },
];

// 2 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠したときから出産月の翌月から3ケ月', value: `${prefix}_childbirth_0`, points: 100 },
];

// 3 保護者の疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院', value: `${prefix}_illness_0`, points: 100 },
  { label: '疾病（居宅内治療）：常時臥床', value: `${prefix}_illness_1`, points: 100 },
  { label: '障害：身体障害者1・2級、精神障害者1・2級、療育手帳A', value: `${prefix}_illness_2`, points: 100 },
  { label: '疾病（居宅内治療）：月複数回の通院加療を要する', value: `${prefix}_illness_3`, points: 70 },
  { label: '障害：聴覚障害3〜6級', value: `${prefix}_illness_4`, points: 70 },
  { label: '疾病（居宅内治療）：上記以外の自宅療養', value: `${prefix}_illness_5`, points: 50 },
];

// 4 同居親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '心身障害児施設への通園児の付添を要するため、他児童の保育が困難', value: `${prefix}_care_0`, points: 80 },
  { label: '病院等の付添い介護・看護、自宅介護・看護', value: `${prefix}_care_1`, points: 70 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に当たっている', value: `${prefix}_disaster_0`, points: 100 },
];

// 6 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業準備を含む）を継続的に行っている', value: `${prefix}_jobseeking_0`, points: 50 },
];

// 7 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '技能取得中・在学中　月就学時間120時間以上', value: `${prefix}_school_0`, points: 80 },
  { label: '技能取得中・在学中　月就学時間120時間未満', value: `${prefix}_school_1`, points: 70 },
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
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
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
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族の介護・看護の状況は？`,
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
      label: `${parentLabel}は求職活動を継続的に行っていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 別表2
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+110）', value: 'adj_single_parent_1', points: 110 },
    ],
  },
  {
    id: 'adj_household_type',
    category: 'adjustment',
    label: '世帯類型であてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_type_0', points: 0 },
      { label: '明らかに保育の必要性が認められるが、保護者の一方の点数の決定が困難と認められる事情がある（+70）', value: 'adj_household_type_1', points: 70 },
      { label: '障害者のいる世帯（申請児童を除く）（+10）', value: 'adj_household_type_2', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護・非課税の世帯にあてはまりますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_welfare_0', points: 0 },
      { label: '生活保護の世帯（+20）', value: 'adj_welfare_1', points: 20 },
      { label: '保育料の世帯階層区分が第2階層（市町村民税が非課税）の世帯（+10）', value: 'adj_welfare_2', points: 10 },
    ],
  },
  {
    id: 'adj_jobseeking_main',
    category: 'adjustment',
    label: '生計中心者が求職活動を継続的に行っている、または入園後に求職活動を行うことを予定しており、かつ保護者の就労による自立更生が特に必要であると認められる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_jobseeking_main_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_jobseeking_main_1', points: 20 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: 'DVのおそれがあるため家庭裁判所から保護命令が出されている場合など、保育の緊急性が高く特に優先が必要と町が認めた場合にあたりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_0', points: 0 },
      { label: 'はい（+100）', value: 'adj_dv_1', points: 100 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請児童が障がい児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_child_disability_1', points: 20 },
    ],
  },
  {
    id: 'adj_return_or_sibling',
    category: 'adjustment',
    label: '産休明け・育休明け、きょうだいの入園についてあてはまるものは？',
    helpText: '原典では「6」「7」は重複して加算するのではなく、該当するいずれか1つの項目のみ加算します',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_return_or_sibling_0', points: 0 },
      { label: '産休明け・育休明けで兄弟・姉妹がすでに入園している（+60）', value: 'adj_return_or_sibling_1', points: 60 },
      { label: '産休明け・育休明けによる入園（+40）', value: 'adj_return_or_sibling_2', points: 40 },
      { label: '兄弟・姉妹がすでに入園している（+40）', value: 'adj_return_or_sibling_3', points: 40 },
      { label: '新規入所で兄弟・姉妹同時入園申請（+20）', value: 'adj_return_or_sibling_4', points: 20 },
    ],
  },
];

export const taikiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
