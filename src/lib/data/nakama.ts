import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 中間市 保育園入園 利用調整基準データ
// 出典: 中間市「利用調整基準表」
// https://www.city.nakama.lg.jp/uploaded/attachment/12562.pdf
// -------------------------------------------------------------------------
// 中間市は「優先順位の決定方法」に手順が書かれている。
//   「『1 基本点数』に『2 調整点数』を加えたものを利用調整における点数とし、
//    点数が高い程、優先順位が高いものとします。」
//   「①『1 基本点数』は、父母の点数のどちらか低いものとします。
//     複数の状況に該当する場合は、高い方を点数とします。」
//   「②『2 調整点数』は、類型に複数該当する場合それぞれの点数を加算します。
//     （「育児休業復帰」と「きょうだい児」のみ互いの併用不可です。
//      育児休業を優先します。）」
// 「父母の点数のどちらか低いもの」により scoringMethod は 'min'。
// 基本点数の最大は65点。
//
// 原典で点数の代わりに「最優先」「※」と書かれている項目は、
// 点数ではなく扱いを決める言葉なので選択肢にしていない。
// - 災害復旧「震災、風水害、火災その他の災害の復旧に当たっている場合」（最優先）
// - 児童虐待・配偶者からの暴力（最優先）
// - 前各号に類するもの「上記項目に該当しないが、児童福祉の観点から、市長が認める場合」（※）
// - 調整点数のその他「上記項目に該当しないが、児童福祉の観点から、市長が認める場合」（※）
//
// 調整点数「育児休業を延長可能である場合（減点）」は、原典に「合計0となる」とあり、
// 他の点数をすべて打ち消す特別な扱いなので、単純な減点としては入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'nakama',
  name: '中間市',
  slug: 'nakama',
  prefecture: '福岡県',
  maxBasePoints: 65,
  scoringMethod: 'min',
} as const;

// 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外で労働することを常態としている（就労時間1日8時間以上）', value: `${prefix}_employment_0`, points: 65 },
  { label: '居宅内で当該児童と離れて日常の家事以外の労働することを常態としている（就労時間1日8時間以上）', value: `${prefix}_employment_1`, points: 60 },
  { label: '居宅外で労働することを常態としている（就労時間1日8時間未満、パート及び不定期就労など）', value: `${prefix}_employment_2`, points: 50 },
  { label: '居宅内で当該児童と離れて日常の家事以外の労働することを常態としている（就労時間1日8時間未満、パート、内職及び不定期就労など）', value: `${prefix}_employment_3`, points: 45 },
];

// 妊娠、出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中であるか出産後間がない場合（産前2か月から産後3か月まで）', value: `${prefix}_childbirth_0`, points: 55 },
];

// 疾病、負傷、障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病又は負傷している場合', value: `${prefix}_illness_0`, points: 50 },
  { label: '精神又は身体に障害を有する場合（身体障害者手帳1〜3級、療育手帳重度又は中度、精神障害者保健福祉手帳1・2級の場合）', value: `${prefix}_illness_1`, points: 45 },
  { label: '精神又は身体に障害を有する場合（上記以外）', value: `${prefix}_illness_2`, points: 20 },
];

// 同居親族の介護、看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居の親族を常時介護している場合（入院加療又は安静を要する状態）', value: `${prefix}_care_0`, points: 40 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '家計の主宰者が求職活動を行っている場合', value: `${prefix}_jobseeking_0`, points: 35 },
  { label: '求職活動を行っている場合', value: `${prefix}_jobseeking_1`, points: 10 },
];

// 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '学校教育法に基づく学校又は就労に必要な知識技能の習得を目的とし職業訓練校その他の専門校において就学している場合', value: `${prefix}_school_0`, points: 15 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基本点数は父母の点数のどちらか低いものが適用されます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠、出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病、負傷、障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の介護、看護', value: `${prefix}_reason_care`, points: 0 },
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
      label: `${parentLabel}の妊娠、出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病、負傷、障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族の介護、看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
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
      label: `${parentLabel}は就学していますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2 調整点数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士として保育所等で就労予定（内定者）、又は現に就労していますか？',
    helpText: '市外保育所の保育士の場合は、その自治体が同様の加点を行っている場合のみ対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+50）', value: 'adj_hoikushi_1', points: 50 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭の状態にありますか？',
    helpText: '児童扶養手当受給者及び戸籍等にひとり親世帯と確認できる世帯が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+21）', value: 'adj_single_parent_1', points: 21 },
    ],
  },
  {
    id: 'adj_return_or_sibling',
    category: 'adjustment',
    label: '育児休業復帰・きょうだい児についてあてはまるものは？',
    helpText: '原典では「育児休業復帰」と「きょうだい児」は併用できません（育児休業を優先します）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_return_or_sibling_0', points: 0 },
      { label: '育児休業復帰：休業開始前に入所していた保育所等に入所させる、または休業中に入所しているきょうだい児と同一の保育所等に入所させる（+7）', value: 'adj_return_or_sibling_1', points: 7 },
      { label: '育児休業復帰：上記以外で、休業復帰に伴い児童を保育所等に入所させる（+6）', value: 'adj_return_or_sibling_2', points: 6 },
      { label: 'きょうだい児：保育を受けようとする保育所等が、兄弟姉妹が現に保育を受け、又は受けようとする保育所等と同一である（+6）', value: 'adj_return_or_sibling_3', points: 6 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所希望児童が精神又は身体に障害を有しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒園児を入所させますか？',
    helpText: '3歳未満児が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_chiikigata_1', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、就労による自立支援につながると判断されますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_1', points: 1 },
    ],
  },
];

export const nakamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
