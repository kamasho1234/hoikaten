import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 尾道市 保育園入園 ランク（基本指数）・調整指数データ
// 出典: 尾道市こども部保育課「令和8年度 保育施設等利用案内」
// https://www.city.onomichi.hiroshima.jp/soshiki/30/3071.html
// 参考: 同県内（広島市・東広島市・福山市）のランク制に準じた広島県標準方式
// ---------------------------------------------------------------------------
// 尾道市は「ランク制（A〜G）」＋「調整指数」の方式。
// 父母それぞれにランクを判定し、低い方のランクが世帯のランクになる（min方式）。
// シミュレーター上ではランクを点数に変換:
//   A→8, B→7, C→6, D→5, E→4, F→3, G→2
// ---------------------------------------------------------------------------

const municipality = {
  id: 'onomichi',
  name: '尾道市',
  slug: 'onomichi',
  prefecture: '広島県',
  maxBasePoints: 8,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（ランクA）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月120時間以上160時間未満（ランクB）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月64時間以上120時間未満（ランクC）', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間未満（ランクD）', value: `${prefix}_employment_5`, points: 5 },
  { label: '内職（ランクE）', value: `${prefix}_employment_4`, points: 4 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時臥床（ランクA）', value: `${prefix}_illness_8`, points: 8 },
  { label: '精神疾患等で日常生活に支障（ランクB）', value: `${prefix}_illness_7`, points: 7 },
  { label: 'その他の傷病（ランクC）', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級/療育A/精神1級（ランクA）', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体3-4級/療育B/精神2-3級（ランクB）', value: `${prefix}_disability_7`, points: 7 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時看護（病院付添）（ランクA）', value: `${prefix}_care_8`, points: 8 },
  { label: '月160時間以上（ランクB）', value: `${prefix}_care_7`, points: 7 },
  { label: '月120時間以上（ランクC）', value: `${prefix}_care_6`, points: 6 },
  { label: '月64時間以上（ランクD）', value: `${prefix}_care_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（ランクC）', value: `${prefix}_childbirth_6`, points: 6 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上（ランクB）', value: `${prefix}_education_7`, points: 7 },
  { label: '月120時間以上（ランクC）', value: `${prefix}_education_6`, points: 6 },
  { label: '月64時間以上（ランクD）', value: `${prefix}_education_5`, points: 5 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中（ランクG）', value: `${prefix}_jobseeking_2`, points: 2 },
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
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}はどのくらい働いていますか？`, helpText: '月160時間以上がランクA（最高ランク）です', inputType: 'radio', options: employmentOptions(prefix) },
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
  { id: 'adj_ikukyu_return', category: 'adjustment', label: '育休明けの復帰ですか？', helpText: '育児休業から復帰して保育所に預ける場合が対象です', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_ikukyu_return_no', points: 0 }, { label: 'はい', value: 'adj_ikukyu_return_yes', points: 3 }] },
  { id: 'adj_sibling', category: 'adjustment', label: 'きょうだいの状況は？', helpText: 'きょうだい在園と同時申込の加点は重複しません', inputType: 'radio', options: [{ label: 'きょうだいなし／該当なし', value: 'adj_sibling_none', points: 0 }, { label: 'きょうだいが認可保育所に在園中', value: 'adj_sibling_enrolled', points: 4 }, { label: 'きょうだいと同時に申し込む', value: 'adj_sibling_simultaneous', points: 2 }] },
  { id: 'adj_hoikushi', category: 'adjustment', label: '保育士・幼稚園教諭等として就労していますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_hoikushi_no', points: 0 }, { label: 'はい', value: 'adj_hoikushi_yes', points: 5 }] },
  { id: 'adj_ikukyu_extension', category: 'adjustment', label: '育休延長も許容できますか？', helpText: '「はい」を選ぶと優先度が大幅に下がります。育休延長を前提に保育所不承諾通知を得たい場合に選んでください', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_ikukyu_extension_no', points: 0 }, { label: 'はい', value: 'adj_ikukyu_extension_yes', points: -30 }] },
];

export const onomichiData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
