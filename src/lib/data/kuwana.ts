import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 桑名市 保育園入園 基本点数・調整指数データ
// 出典: 桑名市こども未来局こども保育課「令和8年度 保育施設等利用案内」
// https://www.city.kuwana.lg.jp/index.cfm/6,html
// 参考: 同県内（松阪市・四日市市・鈴鹿市）の指数表に準じた三重県標準方式
// ---------------------------------------------------------------------------
// 桑名市は「基本点数（父母それぞれ）＋ 調整指数」の加算方式。
// 父母各最大20点（合計40点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kuwana',
  name: '桑名市',
  slug: 'kuwana',
  prefecture: '三重県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月120時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月48時間以上64時間未満', value: `${prefix}_employment_8`, points: 8 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上／常時病臥', value: `${prefix}_illness_20`, points: 20 },
  { label: '安静を要する（自宅療養1ヶ月以上）', value: `${prefix}_illness_17`, points: 17 },
  { label: '通院加療中（週2日以上）', value: `${prefix}_illness_13`, points: 13 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／療育手帳A', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級／療育手帳B', value: `${prefix}_disability_17`, points: 17 },
  { label: '精神障害者保健福祉手帳1・2級', value: `${prefix}_disability_17b`, points: 17 },
  { label: '身体障害者手帳4級以下／精神3級', value: `${prefix}_disability_13`, points: 13 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の介護・看護', value: `${prefix}_care_20`, points: 20 },
  { label: '月120時間以上160時間未満', value: `${prefix}_care_18`, points: 18 },
  { label: '月80時間以上120時間未満', value: `${prefix}_care_14`, points: 14 },
  { label: '月64時間以上80時間未満', value: `${prefix}_care_12`, points: 12 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前2ヶ月〜産後8週）', value: `${prefix}_childbirth_20`, points: 20 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学・職業訓練', value: `${prefix}_education_20`, points: 20 },
  { label: '月120時間以上160時間未満', value: `${prefix}_education_16`, points: 16 },
  { label: '月80時間以上120時間未満', value: `${prefix}_education_12`, points: 12 },
  { label: '月48時間以上80時間未満', value: `${prefix}_education_8`, points: 8 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_6`, points: 6 },
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
  { id: 'adj_sibling', category: 'adjustment', label: 'きょうだいが希望施設に在園中ですか？', inputType: 'radio', options: [{ label: 'あてはまらない', value: 'adj_sibling_no', points: 0 }, { label: 'きょうだいが在園中', value: 'adj_sibling_yes', points: 3 }, { label: 'きょうだいと同時申込み', value: 'adj_sibling_simultaneous', points: 2 }] },
  { id: 'adj_unlicensed_nursery', category: 'adjustment', label: '認可外保育施設に月ぎめで預けていますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 }, { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 3 }] },
  { id: 'adj_parental_leave', category: 'adjustment', label: '育児休業から復帰予定ですか？', helpText: '入園月に職場復帰する場合', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_parental_leave_no', points: 0 }, { label: 'はい', value: 'adj_parental_leave_yes', points: 2 }] },
  { id: 'adj_welfare', category: 'adjustment', label: '生活保護を受けていますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_welfare_no', points: 0 }, { label: 'はい', value: 'adj_welfare_yes', points: 3 }] },
  { id: 'adj_grandparent', category: 'adjustment', label: '同居の65歳未満の祖父母が保育できる状態ですか？', helpText: '同居の祖父母が無職等で保育できる場合（減点）', inputType: 'radio', options: [{ label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 }, { label: 'はい（減点）', value: 'adj_grandparent_yes', points: -3 }] },
];

export const kuwanaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
