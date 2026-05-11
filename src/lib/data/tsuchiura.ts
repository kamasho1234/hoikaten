import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 土浦市 保育園入園 基準指数・調整指数データ
// 出典: 土浦市こども家庭課「令和8年度 保育施設等利用案内」
// https://www.city.tsuchiura.lg.jp/category/detail.php?id=2380
// 参考: 同県内（水戸市）の指数表に準じた茨城県標準方式
// ---------------------------------------------------------------------------
// 土浦市は「基本指数（父母それぞれ最大10点）＋ 調整指数」の加算方式。
// 合計基本指数最大20点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tsuchiura',
  name: '土浦市',
  slug: 'tsuchiura',
  prefecture: '茨城県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月64時間以上100時間未満', value: `${prefix}_employment_6`, points: 6 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時安静が必要', value: `${prefix}_illness_10`, points: 10 },
  { label: '通院加療中（安静が必要）', value: `${prefix}_illness_8`, points: 8 },
  { label: 'その他の通院加療', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 精神1・2級 / 療育A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3・4級 / 療育B', value: `${prefix}_disability_8`, points: 8 },
  { label: 'その他の手帳所持', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要（月160時間以上）', value: `${prefix}_care_10`, points: 10 },
  { label: '月120時間以上の介護', value: `${prefix}_care_8`, points: 8 },
  { label: '月64時間以上の介護', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_8`, points: 8 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上の通学・職業訓練', value: `${prefix}_education_8`, points: 8 },
  { label: '月64時間以上の通学・職業訓練', value: `${prefix}_education_6`, points: 6 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}はどのくらい働いていますか？`, helpText: '月あたりの就労時間を選んでください', inputType: 'radio', options: employmentOptions(prefix) },
    { id: `${prefix}_illness`, category, label: `${parentLabel}の病気の状況は？`, inputType: 'radio', options: illnessOptions(prefix) },
    { id: `${prefix}_disability`, category, label: `${parentLabel}の障害の程度は？`, inputType: 'radio', options: disabilityOptions(prefix) },
    { id: `${prefix}_care`, category, label: `${parentLabel}はどのくらい介護・看護していますか？`, inputType: 'radio', options: careOptions(prefix) },
    { id: `${prefix}_childbirth`, category, label: `${parentLabel}の出産時期は？`, inputType: 'radio', options: childbirthOptions(prefix) },
    { id: `${prefix}_education`, category, label: `${parentLabel}はどのくらい学校に通っていますか？`, inputType: 'radio', options: educationOptions(prefix) },
    { id: `${prefix}_jobseeking`, category, label: `${parentLabel}は求職活動をしていますか？`, inputType: 'radio', options: jobSeekingOptions(prefix) },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  { id: 'adj_single_parent', category: 'adjustment', label: 'ひとり親ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_single_parent_no', points: 0 }, { label: 'はい', value: 'adj_single_parent_yes', points: 5 }] },
  { id: 'adj_parental_leave', category: 'adjustment', label: '育児休業から復帰する予定ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_parental_leave_no', points: 0 }, { label: 'はい', value: 'adj_parental_leave_yes', points: 2 }] },
  { id: 'adj_sibling', category: 'adjustment', label: 'きょうだいの保育園の状況は？', inputType: 'radio', options: [{ label: 'あてはまらない', value: 'adj_sibling_no', points: 0 }, { label: 'きょうだいが在園中で、同じ園を希望する', value: 'adj_sibling_same', points: 3 }, { label: 'きょうだいが在園中（別の園を希望）', value: 'adj_sibling_other', points: 1 }, { label: 'きょうだいと同時申込み', value: 'adj_sibling_simultaneous', points: 2 }] },
  { id: 'adj_regional_nursery', category: 'adjustment', label: '小規模保育等の卒園（連携施設への転所）ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_regional_nursery_no', points: 0 }, { label: 'はい', value: 'adj_regional_nursery_yes', points: 3 }] },
];

export const tsuchiuraData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
