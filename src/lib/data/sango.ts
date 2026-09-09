import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 三郷町 保育園入園 利用調整基準データ
// 出典: 三郷町「令和8年度 三郷町保育実施選考基準点数表」
// https://www.town.sango.nara.jp/uploaded/attachment/10070.pdf
// -------------------------------------------------------------------------
// 三郷町は原典の見出しに手順が書かれている。
//   「提出された申請書類等をもとに、保育の必要性が高いと認められる児童から順に
//    利用調整を行います。保育の必要性については、『1. 保育事由に基づく基礎点』と
//    『2. 家庭状況等に基づく調整点』との合計点を基本として、総合的に審査、判定します。」
//   1の見出し「保育事由に基づく基礎点（保護者のうち低い方の点数を適用）」
// 「保護者のうち低い方の点数を適用」により scoringMethod は 'min'。
// 基礎点の最大は12点。
//
// 原典で点数が幅・言葉になっている項目は選択肢にしていない。
// - 7 就学「『1. 就労（外勤・自営）』に準ずる」（4〜12の幅）
// - 9 その他「その他上記に類する事由に該当すると町長が認める場合」（該当事由準用）
//
// 調整点のうち、いま園を利用している方の話は入れていない。
// - ⑪ 兄弟姉妹で別々の保育園等を利用しており、いずれかが利用する園への転園を希望（+10）
// - ⑬ 町内在住児が同一園において1号認定から2号認定へ変更（+20）
// - ⑭ 町外在住児が同一園において1号認定から2号認定へ変更（+10）
//
// ⑮「希望施設に入所できない場合は、育児休業の延長も許容できる」（−12）は、
// 原典に「※これ以外の調整点は加算・減算されません」とあり、
// 他の調整点をすべて無効にする特別な扱いなので、単純な加減点としては入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'sango',
  name: '三郷町',
  slug: 'sango',
  prefecture: '奈良県',
  maxBasePoints: 12,
  scoringMethod: 'min',
} as const;

// 1 就労（1ヶ月当たりの就労時間。就労時間が不規則な場合はその平均とする）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・自営：月160時間以上', value: `${prefix}_employment_0`, points: 12 },
  { label: '外勤・自営：月140時間以上160時間未満', value: `${prefix}_employment_1`, points: 11 },
  { label: '外勤・自営：月120時間以上140時間未満', value: `${prefix}_employment_2`, points: 10 },
  { label: '外勤・自営：月100時間以上120時間未満', value: `${prefix}_employment_3`, points: 9 },
  { label: '外勤・自営：月80時間以上100時間未満', value: `${prefix}_employment_4`, points: 8 },
  { label: '内職：月80時間以上', value: `${prefix}_employment_5`, points: 7 },
  { label: '外勤・自営：月60時間以上80時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '内職：月60時間以上80時間未満', value: `${prefix}_employment_7`, points: 5 },
  { label: '外勤・自営：月48時間以上60時間未満', value: `${prefix}_employment_8`, points: 4 },
  { label: '内職：月48時間以上60時間未満', value: `${prefix}_employment_9`, points: 3 },
];

// 2 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産（予定）日の産前6週、産後8週の間', value: `${prefix}_childbirth_0`, points: 9 },
];

// 3 疾病・障がい等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：概ね3か月以上の入院が見込まれる', value: `${prefix}_illness_0`, points: 12 },
  { label: '自宅療養：入院に相当する治療や安静（常時病臥）を要する', value: `${prefix}_illness_1`, points: 12 },
  { label: '障がい：介護を要する（身体障害者手帳1・2級、療育手帳A判定、精神障害者保健福祉手帳1・2級またはこれらと同程度）', value: `${prefix}_illness_2`, points: 12 },
  { label: '入院：概ね1か月以上の入院が見込まれる', value: `${prefix}_illness_3`, points: 10 },
  { label: '自宅療養：上記以外で日常生活に著しく支障があり他者の介助を要する', value: `${prefix}_illness_4`, points: 10 },
  { label: '障がい：保育に支障がある（身体障害者手帳3級、療育手帳B判定、精神障害者保健福祉手帳3級またはこれらと同程度）', value: `${prefix}_illness_5`, points: 10 },
  { label: '自宅療養：身の回りのことは自分でできるが療養を要する', value: `${prefix}_illness_6`, points: 7 },
  { label: '障がい：上記以外で保育が困難である（身体障害者手帳4級以下またはこれと同程度）', value: `${prefix}_illness_7`, points: 7 },
];

// 4 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居親族：重度の介護を要する（身体障害者手帳1・2級、療育手帳A判定、精神障害者保健福祉手帳1・2級、要介護4・5またはこれらと同程度）', value: `${prefix}_care_0`, points: 10 },
  { label: '同居親族：中程度の介護を要する（身体障害者手帳3級、療育手帳B判定、精神障害者保健福祉手帳3級、要介護2・3またはこれらと同程度）', value: `${prefix}_care_1`, points: 8 },
  { label: '施設入所・入院等をしている親族：介護・看護を要する状態が概ね1か月以上見込まれる', value: `${prefix}_care_2`, points: 8 },
  { label: '同居親族：軽度の介護を要する（身体障害者手帳4級以下、要介護1またはこれらと同程度）', value: `${prefix}_care_3`, points: 6 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災等による家屋の損傷やその他災害復旧のため保育が困難である', value: `${prefix}_disaster_0`, points: 12 },
];

// 6 求職活動（起業準備を含む）
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中または起業準備中である', value: `${prefix}_jobseeking_0`, points: 1 },
];

// 8 児童虐待・DV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '児童虐待・DVのおそれがある', value: `${prefix}_dv_0`, points: 12 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基礎点は保護者のうち低い方の点数が適用されます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動（起業準備を含む）', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '児童虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間が不規則な場合はその平均とします',
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
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯に児童虐待・DVのおそれがありますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 家庭状況等に基づく調整点
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '母子・父子家庭またはこれらに類する状況が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_1', points: 5 },
    ],
  },
  {
    id: 'adj_jobseeking_bonus',
    category: 'adjustment',
    label: '保育事由が「求職活動（起業準備を含む）」の場合、あてはまるものは？',
    helpText: '保育事由が求職活動の場合のみ加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_jobseeking_bonus_0', points: 0 },
      { label: '生活保護世帯で、就労により自立支援につながると認められる（+3）', value: 'adj_jobseeking_bonus_1', points: 3 },
      { label: '生計中心者の非自発的失業により、就労の必要性が高い（+3）', value: 'adj_jobseeking_bonus_2', points: 3 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待またはDVのおそれがある場合など、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_social_care_1', points: 15 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する児童が障がい等を有し、支援や加配等を要しますか？',
    helpText: '事前に見学のうえ、対応可能施設の確認が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_disability_1', points: 1 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '育児休業からの復職についてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_return_to_work_0', points: 0 },
      { label: '育児休業を終了し、復職する（+2）', value: 'adj_return_to_work_1', points: 2 },
      { label: '認可外保育施設等利用料助成金を活用し、育児休業を終了し復職している（+2）', value: 'adj_return_to_work_2', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '新たに申請する児童の兄弟姉妹が既に町内認可保育園等を利用していますか？',
    helpText: '申請児童の入園前に兄弟姉妹が卒園・退園等する場合は対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_1', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_apply',
    category: 'adjustment',
    label: '新たに申請する児童が同時に2人以上ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_apply_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_multiple_apply_1', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が町内認可保育園等で保育士または看護師として勤務（予定含む）しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_hoikushi_1', points: 15 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '町内の小規模・家庭的保育事業を卒園（2歳児で保育が満了）し、連携施設の利用を希望しますか？',
    helpText: '連携施設の利用調整時に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_chiikigata_1', points: 15 },
    ],
  },
];

export const sangoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
