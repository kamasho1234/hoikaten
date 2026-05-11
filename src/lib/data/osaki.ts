import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 大崎市 保育所入所 基本指数・調整指数データ
// 出典: 大崎市子ども子育て支援部保育課「令和8年度 保育施設等利用案内」
// https://www.city.osaki.miyagi.jp/index.cfm/6,html
// 参考: 同県内（仙台市）の指数表に準じた宮城県標準方式
// ---------------------------------------------------------------------------
// 大崎市は「基本指数（父母それぞれ最大10点）＋ 調整指数」の加算方式。
// 合計基本指数最大20点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'osaki',
  name: '大崎市',
  slug: 'osaki',
  prefecture: '宮城県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: 'フルタイム（週5日・1日7時間以上）', value: `${prefix}_employment_10`, points: 10 },
  { label: '週5日・1日5〜7時間', value: `${prefix}_employment_8`, points: 8 },
  { label: '週4〜5日・1日4〜5時間', value: `${prefix}_employment_7`, points: 7 },
  { label: '月64時間以上（上記以外）', value: `${prefix}_employment_4`, points: 4 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上または常時臥床', value: `${prefix}_illness_10`, points: 10 },
  { label: '入院2週間超または日常生活に著しい支障', value: `${prefix}_illness_8`, points: 8 },
  { label: '通院週4日以上または一般療養', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '1〜2級・A判定', value: `${prefix}_disability_10`, points: 10 },
  { label: '3級・B判定', value: `${prefix}_disability_7`, points: 7 },
  { label: '4級以下', value: `${prefix}_disability_4`, points: 4 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日・1日7時間以上', value: `${prefix}_care_10`, points: 10 },
  { label: '週4日以上・1日4時間以上', value: `${prefix}_care_7`, points: 7 },
  { label: '月64時間以上（上記以外）', value: `${prefix}_care_4`, points: 4 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_8`, points: 8 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: 'フルタイム（週5日・1日7時間以上）', value: `${prefix}_education_9`, points: 9 },
  { label: 'それ以外', value: `${prefix}_education_5`, points: 5 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_3`, points: 3 },
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
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}はどのくらい働いていますか？`, helpText: 'いちばん近い働き方を選んでください', inputType: 'radio', options: employmentOptions(prefix) },
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
  { id: 'adj_single_parent', category: 'adjustment', label: 'ひとり親ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_single_parent_no', points: 0 }, { label: 'はい', value: 'adj_single_parent_yes', points: 3 }] },
  { id: 'adj_sibling', category: 'adjustment', label: 'きょうだいが認可保育所に通っている、または同時に申し込みますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_sibling_no', points: 0 }, { label: 'はい', value: 'adj_sibling_yes', points: 3 }] },
  { id: 'adj_welfare', category: 'adjustment', label: '生活保護または住民税非課税世帯ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_welfare_no', points: 0 }, { label: 'はい', value: 'adj_welfare_yes', points: 2 }] },
  { id: 'adj_grandparent', category: 'adjustment', label: '65歳未満の祖父母と同居していますか？', helpText: '同居している場合、減点になります', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_grandparent_no', points: 0 }, { label: 'はい', value: 'adj_grandparent_yes', points: -1 }] },
];

export const osakiData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
