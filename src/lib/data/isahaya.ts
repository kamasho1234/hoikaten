import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 諫早市 保育所入所 基本点数・調整点数データ
// 出典: 諫早市こども政策部保育幼稚園課「令和8年度 保育施設等利用案内」
// https://www.city.isahaya.nagasaki.jp/post4/1001.html
// 参考: 同県内（長崎市・佐世保市）の指数表に準じた長崎県標準方式
// ---------------------------------------------------------------------------
// 諫早市は「基本点数（父母それぞれ最大100点）＋ 調整点数」の加算方式。
// 合計基本点数最大200点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'isahaya',
  name: '諫早市',
  slug: 'isahaya',
  prefecture: '長崎県',
  maxBasePoints: 200,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上（月160時間以上）', value: `${prefix}_employment_100`, points: 100 },
  { label: '月20日以上かつ1日6時間以上（月120時間以上）', value: `${prefix}_employment_90`, points: 90 },
  { label: '月16日以上かつ1日6時間以上（月96時間以上）', value: `${prefix}_employment_80`, points: 80 },
  { label: '月12日以上かつ1日4時間以上（月64時間以上）', value: `${prefix}_employment_70`, points: 70 },
  { label: '月64時間未満の就労', value: `${prefix}_employment_50`, points: 50 },
];

const employmentOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_offer_none`, points: 0 },
  { label: '月160時間以上相当の内定', value: `${prefix}_offer_80`, points: 80 },
  { label: '月64時間以上相当の内定', value: `${prefix}_offer_60`, points: 60 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥', value: `${prefix}_illness_100`, points: 100 },
  { label: '一般療養（安静が必要）', value: `${prefix}_illness_80`, points: 80 },
  { label: '通院加療中', value: `${prefix}_illness_60`, points: 60 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 精神1・2級 / 療育A', value: `${prefix}_disability_100`, points: 100 },
  { label: '身体3級 / 療育B', value: `${prefix}_disability_80`, points: 80 },
  { label: 'その他の手帳所持', value: `${prefix}_disability_60`, points: 60 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上の介護', value: `${prefix}_care_100`, points: 100 },
  { label: '月16日以上かつ1日6時間以上の介護', value: `${prefix}_care_80`, points: 80 },
  { label: '月64時間以上の介護', value: `${prefix}_care_60`, points: 60 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（予定日前後各8週間程度）', value: `${prefix}_childbirth_100`, points: 100 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月16日以上かつ週16時間以上の通学・職業訓練', value: `${prefix}_education_90`, points: 90 },
  { label: '月64時間以上の通学・職業訓練', value: `${prefix}_education_70`, points: 70 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備を含む）', value: `${prefix}_jobseeking_50`, points: 50 },
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
      { label: '就労内定（採用が決まった）', value: `${prefix}_reason_offer`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}はどのくらい働いていますか？`, helpText: '月あたりの就労頻度・時間を選んでください', inputType: 'radio', options: employmentOptions(prefix) },
    { id: `${prefix}_offer`, category, label: `${parentLabel}の就労内定の状況は？`, inputType: 'radio', options: employmentOfferOptions(prefix) },
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
  { id: 'adj_single_parent', category: 'adjustment', label: 'ひとり親ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_single_parent_no', points: 0 }, { label: 'はい', value: 'adj_single_parent_yes', points: 20 }] },
  { id: 'adj_sibling', category: 'adjustment', label: 'きょうだいが認可施設に在園中ですか？', inputType: 'radio', options: [{ label: 'あてはまらない', value: 'adj_sibling_no', points: 0 }, { label: 'きょうだいが在園中', value: 'adj_sibling_yes', points: 10 }] },
  { id: 'adj_welfare', category: 'adjustment', label: '生活保護を受けていますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_welfare_no', points: 0 }, { label: 'はい', value: 'adj_welfare_yes', points: 5 }] },
  { id: 'adj_small_grad', category: 'adjustment', label: '小規模保育等（2歳まで）の卒園に伴う転所ですか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_small_grad_no', points: 0 }, { label: 'はい', value: 'adj_small_grad_yes', points: 10 }] },
  { id: 'adj_unlicensed_nursery', category: 'adjustment', label: '認可外保育施設を月ぎめで利用していますか？', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 }, { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 5 }] },
  { id: 'adj_parental_leave', category: 'adjustment', label: '育休から復帰する予定ですか？', helpText: '入園月に職場復帰する場合', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_parental_leave_no', points: 0 }, { label: 'はい', value: 'adj_parental_leave_yes', points: 5 }] },
  { id: 'adj_grandparent_nearby', category: 'adjustment', label: '65歳未満の同居の祖父母がいますか？', helpText: '子どもの面倒を見られる同居の祖父母がいる場合は減点になります', inputType: 'radio', options: [{ label: 'いいえ', value: 'adj_grandparent_nearby_no', points: 0 }, { label: 'はい', value: 'adj_grandparent_nearby_yes', points: -2 }] },
];

export const isahayaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
