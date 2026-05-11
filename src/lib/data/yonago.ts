import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 米子市 保育所入所 基本指数・調整指数データ
// 出典: 米子市子育て支援課「令和8年度 保育施設等利用案内」
// https://www.city.yonago.lg.jp/cate1/cate1-28/cate1-283/
// 参考: 同県内（鳥取市）の指数表に準じた鳥取県標準方式
// ---------------------------------------------------------------------------
// 米子市は「基本指数（父母それぞれ最大10点）＋ 調整指数」の加算方式。
// 合計基本指数最大20点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yonago',
  name: '米子市',
  slug: 'yonago',
  prefecture: '鳥取県',
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
  { label: '出産前後', value: `${prefix}_childbirth_10`, points: 10 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上の就学', value: `${prefix}_education_8`, points: 8 },
  { label: '月64時間以上の就学', value: `${prefix}_education_6`, points: 6 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_4`, points: 4 },
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
  { id: 'adj_single_parent', category: 'adjustment', label: 'ひとり親家庭ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_single_parent_no', points: 0 }, { label: 'はい', value: 'adj_single_parent_yes', points: 5 }] },
  { id: 'adj_parental_leave', category: 'adjustment', label: '育児休業から復帰する予定ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_parental_leave_no', points: 0 }, { label: 'はい', value: 'adj_parental_leave_yes', points: 5 }] },
  { id: 'adj_sibling', category: 'adjustment', label: 'きょうだいの保育園の状況は？', inputType: 'radio', options: [{ label: 'あてはまらない', value: 'adj_sibling_no', points: 0 }, { label: 'きょうだいが在園中の園を希望', value: 'adj_sibling_same', points: 5 }, { label: 'きょうだい同時入所を希望', value: 'adj_sibling_simultaneous', points: 3 }] },
  { id: 'adj_welfare', category: 'adjustment', label: '生活保護世帯ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_welfare_no', points: 0 }, { label: 'はい', value: 'adj_welfare_yes', points: 5 }] },
  { id: 'adj_small_grad', category: 'adjustment', label: '小規模保育事業等の卒園に伴う転所ですか？', inputType: 'radio', options: [{ label: 'あてはまらない', value: 'adj_small_grad_no', points: 0 }, { label: '連携施設への入所を希望', value: 'adj_small_grad_renkei', points: 10 }, { label: '連携施設以外への入所を希望', value: 'adj_small_grad_other', points: 5 }] },
  { id: 'adj_child_disability', category: 'adjustment', label: '対象のお子さんに障害がありますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_child_disability_no', points: 0 }, { label: 'はい', value: 'adj_child_disability_yes', points: 3 }] },
];

export const yonagoData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
