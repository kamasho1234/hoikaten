import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 瀬戸市 保育園入園 基本指数・調整指数データ
// 出典: 瀬戸市こども部保育課「令和8年度 保育施設等利用案内」
// https://www.city.seto.aichi.jp/docs/2011030300020/
// 参考: 同県内（刈谷市・安城市・稲沢市）の指数表に準じた愛知県標準方式
// ---------------------------------------------------------------------------
// 瀬戸市は「基本指数（父母それぞれ）＋ 調整指数」の加算方式。
// 父母各最大20点（合計40点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'seto',
  name: '瀬戸市',
  slug: 'seto',
  prefecture: '愛知県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（フルタイム）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
  { label: '就労予定（内定あり）', value: `${prefix}_employment_naitei_8`, points: 8 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前産後各8週間）', value: `${prefix}_childbirth_20`, points: 20 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中で保育不可能', value: `${prefix}_illness_20`, points: 20 },
  { label: '身体障害1・2級／療育手帳A／精神1級', value: `${prefix}_illness_18`, points: 18 },
  { label: '身体障害3・4級／療育手帳B／精神2級', value: `${prefix}_illness_16`, points: 16 },
  { label: '疾病により保育に支障があると医師が認めた', value: `${prefix}_illness_14`, points: 14 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要（要介護3以上等）', value: `${prefix}_care_18`, points: 18 },
  { label: '週3日以上の通院介助・看護', value: `${prefix}_care_14`, points: 14 },
  { label: '介護を要することがある', value: `${prefix}_care_10`, points: 10 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月64時間以上の就学・職業訓練', value: `${prefix}_education_14`, points: 14 },
  { label: '通信教育', value: `${prefix}_education_8`, points: 8 },
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
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}はどのくらい働いていますか？`, helpText: '月あたりの就労時間を選んでください', inputType: 'radio', options: employmentOptions(prefix) },
    { id: `${prefix}_childbirth`, category, label: `${parentLabel}の妊娠・出産の状況は？`, inputType: 'radio', options: childbirthOptions(prefix) },
    { id: `${prefix}_illness`, category, label: `${parentLabel}の病気・障がいの状況は？`, inputType: 'radio', options: illnessOptions(prefix) },
    { id: `${prefix}_care`, category, label: `${parentLabel}の介護・看護の状況は？`, inputType: 'radio', options: careOptions(prefix) },
    { id: `${prefix}_education`, category, label: `${parentLabel}はどのような就学をしていますか？`, inputType: 'radio', options: educationOptions(prefix) },
    { id: `${prefix}_jobseeking`, category, label: `${parentLabel}は求職活動をしていますか？`, inputType: 'radio', options: jobSeekingOptions(prefix) },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  { id: 'adj_single_parent', category: 'adjustment', label: 'ひとり親世帯ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_single_parent_no', points: 0 }, { label: 'はい', value: 'adj_single_parent_yes', points: 6 }] },
  { id: 'adj_welfare', category: 'adjustment', label: '生活保護を受給していますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_welfare_no', points: 0 }, { label: 'はい', value: 'adj_welfare_yes', points: 5 }] },
  { id: 'adj_sibling_same_facility', category: 'adjustment', label: 'きょうだいが同じ施設に在園中ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 }, { label: 'はい', value: 'adj_sibling_same_facility_yes', points: 5 }] },
  { id: 'adj_sibling_simultaneous', category: 'adjustment', label: 'きょうだいを同時に申し込みますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 }, { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 3 }] },
  { id: 'adj_unlicensed_nursery', category: 'adjustment', label: '認可外保育施設に月ぎめで預けていますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 }, { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 4 }] },
  { id: 'adj_parental_leave', category: 'adjustment', label: '育児休業から復帰予定ですか？', helpText: '入園月の翌月1日までに復職する場合', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_parental_leave_no', points: 0 }, { label: 'はい', value: 'adj_parental_leave_yes', points: 4 }] },
];

export const setoData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
