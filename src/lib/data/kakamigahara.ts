import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 各務原市 保育所入所 基準点数・調整点数データ
// 出典: 各務原市子ども未来部保育課「令和8年度 保育施設等利用案内」
// https://www.city.kakamigahara.lg.jp/child/hoiku/index.html
// 参考: 同県内（岐阜市）の指数表に準じた岐阜県標準方式
// ---------------------------------------------------------------------------
// 各務原市は「基本点数（父母それぞれ最大100点）＋ 調整点数」の加算方式。
// 合計基本点数最大200点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kakamigahara',
  name: '各務原市',
  slug: 'kakamigahara',
  prefecture: '岐阜県',
  maxBasePoints: 200,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_70`, points: 70 },
  { label: '月60時間以上80時間未満', value: `${prefix}_employment_60`, points: 60 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院（6か月以上）または常時臥床', value: `${prefix}_illness_100`, points: 100 },
  { label: '短期入院または安静加療', value: `${prefix}_illness_80`, points: 80 },
  { label: '通院加療で保育に支障', value: `${prefix}_illness_60`, points: 60 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級／精神1級／療育A', value: `${prefix}_disability_100`, points: 100 },
  { label: '身体3・4級／療育B', value: `${prefix}_disability_80`, points: 80 },
  { label: 'その他の手帳所持', value: `${prefix}_disability_60`, points: 60 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月140時間以上の介護・看護', value: `${prefix}_care_100`, points: 100 },
  { label: '月100時間以上140時間未満', value: `${prefix}_care_80`, points: 80 },
  { label: '月60時間以上100時間未満', value: `${prefix}_care_60`, points: 60 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（予定日前後8週間程度）', value: `${prefix}_childbirth_100`, points: 100 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月140時間以上の就学・職業訓練', value: `${prefix}_education_100`, points: 100 },
  { label: '月100時間以上140時間未満', value: `${prefix}_education_80`, points: 80 },
  { label: '月60時間以上100時間未満', value: `${prefix}_education_60`, points: 60 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_20`, points: 20 },
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
      { label: '病気・けがの治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}はどのくらい働いていますか？`, helpText: '月あたりの就労時間を選んでください', inputType: 'radio', options: employmentOptions(prefix) },
    { id: `${prefix}_illness`, category, label: `${parentLabel}の病気・けがの状況は？`, inputType: 'radio', options: illnessOptions(prefix) },
    { id: `${prefix}_disability`, category, label: `${parentLabel}の障害の程度は？`, inputType: 'radio', options: disabilityOptions(prefix) },
    { id: `${prefix}_care`, category, label: `${parentLabel}はどのくらい介護・看護していますか？`, inputType: 'radio', options: careOptions(prefix) },
    { id: `${prefix}_childbirth`, category, label: `${parentLabel}の出産時期は？`, inputType: 'radio', options: childbirthOptions(prefix) },
    { id: `${prefix}_education`, category, label: `${parentLabel}はどのくらい学校に通っていますか？`, inputType: 'radio', options: educationOptions(prefix) },
    { id: `${prefix}_jobseeking`, category, label: `${parentLabel}は求職活動をしていますか？`, inputType: 'radio', options: jobSeekingOptions(prefix) },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  { id: 'adj_single_parent', category: 'adjustment', label: 'ひとり親世帯または生活保護世帯ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_single_parent_no', points: 0 }, { label: 'はい', value: 'adj_single_parent_yes', points: 25 }] },
  { id: 'adj_full_time', category: 'adjustment', label: '保護者が月120時間以上就労していますか？', helpText: '父または母が月120時間以上就労している場合の加点です', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_full_time_no', points: 0 }, { label: 'はい', value: 'adj_full_time_yes', points: 25 }] },
  { id: 'adj_graduate_renkei', category: 'adjustment', label: '小規模保育等の卒園に伴い連携施設への入所を希望していますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_graduate_renkei_no', points: 0 }, { label: 'はい（連携施設）', value: 'adj_graduate_renkei_yes', points: 20 }] },
  { id: 'adj_sibling', category: 'adjustment', label: 'きょうだいの保育施設の状況は？', inputType: 'radio', options: [{ label: 'あてはまらない', value: 'adj_sibling_none', points: 0 }, { label: 'きょうだいが在園中の連携施設を希望', value: 'adj_sibling_renkei', points: 15 }, { label: 'きょうだいと同時申込', value: 'adj_sibling_simultaneous', points: 10 }] },
];

export const kakamigaharaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
