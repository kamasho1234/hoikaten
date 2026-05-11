import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 沖縄市 保育園入園 基本指数・調整指数データ
// 出典: 沖縄市こどもの未来部保育・幼稚園課「令和8年度 保育施設等利用案内」
// https://www.city.okinawa.okinawa.jp/
// 参考: 同県内（那覇市）の指数表に準じた沖縄県標準方式
// ---------------------------------------------------------------------------
// 沖縄市は「基本指数（父母それぞれ最大30点）＋ 調整指数」の加算方式。
// 合計基本指数最大60点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'okinawa',
  name: '沖縄市',
  slug: 'okinawa',
  prefecture: '沖縄県',
  maxBasePoints: 60,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_30`, points: 30 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_26`, points: 26 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_22`, points: 22 },
  { label: '月90時間以上120時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月64時間以上90時間未満', value: `${prefix}_employment_15`, points: 15 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時安静が必要', value: `${prefix}_illness_30`, points: 30 },
  { label: '通院加療中（安静が必要）', value: `${prefix}_illness_22`, points: 22 },
  { label: 'その他の通院加療', value: `${prefix}_illness_15`, points: 15 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 精神1級 / 療育A1・A2', value: `${prefix}_disability_30`, points: 30 },
  { label: '身体3級 / 精神2級 / 療育B1', value: `${prefix}_disability_22`, points: 22 },
  { label: 'その他の手帳所持', value: `${prefix}_disability_15`, points: 15 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（要介護4・5相当）', value: `${prefix}_care_30`, points: 30 },
  { label: 'ほぼ全面的介助（要介護3相当）', value: `${prefix}_care_22`, points: 22 },
  { label: '一部介助が必要（要介護2相当）', value: `${prefix}_care_15`, points: 15 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '多胎妊娠（双子以上）', value: `${prefix}_childbirth_multi`, points: 23 },
  { label: '妊娠中〜産後4か月', value: `${prefix}_childbirth_18`, points: 18 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学・職業訓練', value: `${prefix}_education_26`, points: 26 },
  { label: '月120時間以上160時間未満', value: `${prefix}_education_22`, points: 22 },
  { label: '月90時間以上120時間未満', value: `${prefix}_education_15`, points: 15 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_9`, points: 9 },
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
      { label: '妊娠中・出産後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}はどのくらい働いていますか？`, helpText: '月あたりの就労時間を選んでください', inputType: 'radio', options: employmentOptions(prefix) },
    { id: `${prefix}_illness`, category, label: `${parentLabel}の病気の状況は？`, inputType: 'radio', options: illnessOptions(prefix) },
    { id: `${prefix}_disability`, category, label: `${parentLabel}の障害の程度は？`, inputType: 'radio', options: disabilityOptions(prefix) },
    { id: `${prefix}_care`, category, label: `${parentLabel}はどのくらい介護・看護していますか？`, inputType: 'radio', options: careOptions(prefix) },
    { id: `${prefix}_childbirth`, category, label: `${parentLabel}の妊娠・出産の状況は？`, inputType: 'radio', options: childbirthOptions(prefix) },
    { id: `${prefix}_education`, category, label: `${parentLabel}はどのくらい学校に通っていますか？`, inputType: 'radio', options: educationOptions(prefix) },
    { id: `${prefix}_jobseeking`, category, label: `${parentLabel}は求職活動をしていますか？`, inputType: 'radio', options: jobSeekingOptions(prefix) },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  { id: 'adj_single_parent', category: 'adjustment', label: 'ひとり親ですか？', helpText: 'ひとり親世帯には+50点が加算されます', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_single_parent_no', points: 0 }, { label: 'はい（ひとり親世帯）', value: 'adj_single_parent_yes', points: 50 }] },
  { id: 'adj_nursery_worker', category: 'adjustment', label: '認可保育所・こども園で保育士として働いていますか？', helpText: '保育士として従事する場合、+50点が加算されます', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 }, { label: 'はい（保育士等）', value: 'adj_nursery_worker_yes', points: 50 }] },
  { id: 'adj_parental_leave', category: 'adjustment', label: '育児休業から復帰する予定ですか？', helpText: '入所した月の翌月1日までに復帰する場合、+9点が加算されます', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_parental_leave_no', points: 0 }, { label: 'はい', value: 'adj_parental_leave_yes', points: 9 }] },
  { id: 'adj_sibling', category: 'adjustment', label: 'きょうだいの保育園の状況は？', inputType: 'radio', options: [{ label: 'あてはまらない', value: 'adj_sibling_no', points: 0 }, { label: 'きょうだいが在園中の園を第1希望にしている', value: 'adj_sibling_same', points: 7 }, { label: 'きょうだいと同時入所申込', value: 'adj_sibling_simultaneous', points: 6 }] },
  { id: 'adj_welfare', category: 'adjustment', label: '生活保護を受けていますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_welfare_no', points: 0 }, { label: 'はい', value: 'adj_welfare_yes', points: 3 }] },
];

export const okinawaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
