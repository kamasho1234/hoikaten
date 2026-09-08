import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// いなべ市 保育園入園 利用調整基準データ
// 出典: いなべ市「利用調整点数表」（令和9年度・別表第1〜第3、第3条関係）
// https://www.city.inabe.mie.jp/_res/projects/default_project/_page_/001/015/923/r9_riyoutyousei_tensuuhyo.pdf
// -------------------------------------------------------------------------
// いなべ市は別表第3（優先順位）の1に
// 「本表の基本点数による点数に、調整点数を加減点した合計点数の高い世帯」とある。
// 原典は父母の基本点数をどう合わせるかを書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基本点数の最大は1人あたり100点。
//
// 区分7の就学は「月の就学時間に応じ、利用選考基本点数の区分1の時間区分を適用する」
// とあり、就労の表をそのまま当てはめる。就労の設問で答える形にしている。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 区分9「その他、特に保育が必要と認められる場合」（児童および世帯の状況等に応じて判断）
// -------------------------------------------------------------------------

const municipality = {
  id: 'inabe',
  name: 'いなべ市',
  slug: 'inabe',
  prefecture: '三重県',
  maxBasePoints: 100,
  scoringMethod: 'sum',
} as const;

// 区分1 就労（区分7の就学も同じ時間区分を適用）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月の就労時間 170時間以上', value: `${prefix}_employment_0`, points: 100 },
  { label: '月の就労時間 160時間以上170時間未満', value: `${prefix}_employment_1`, points: 95 },
  { label: '月の就労時間 150時間以上160時間未満', value: `${prefix}_employment_2`, points: 90 },
  { label: '月の就労時間 140時間以上150時間未満', value: `${prefix}_employment_3`, points: 85 },
  { label: '月の就労時間 130時間以上140時間未満', value: `${prefix}_employment_4`, points: 80 },
  { label: '月の就労時間 120時間以上130時間未満', value: `${prefix}_employment_5`, points: 75 },
  { label: '月の就労時間 110時間以上120時間未満', value: `${prefix}_employment_6`, points: 70 },
  { label: '月の就労時間 100時間以上110時間未満', value: `${prefix}_employment_7`, points: 65 },
  { label: '月の就労時間 90時間以上100時間未満', value: `${prefix}_employment_8`, points: 60 },
  { label: '月の就労時間 80時間以上90時間未満', value: `${prefix}_employment_9`, points: 55 },
  { label: '月の就労時間 70時間以上80時間未満', value: `${prefix}_employment_10`, points: 50 },
  { label: '月の就労時間 60時間以上70時間未満', value: `${prefix}_employment_11`, points: 45 },
  { label: '月の就労時間 50時間以上60時間未満', value: `${prefix}_employment_12`, points: 40 },
  { label: '月の就労時間 48時間以上50時間未満', value: `${prefix}_employment_13`, points: 35 },
  { label: '内職', value: `${prefix}_employment_14`, points: 35 },
];

// 区分2 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の2か月前の日の属する月の1日から、出産日から起算して2か月後の日が属する月の月末まで', value: `${prefix}_childbirth_0`, points: 100 },
];

// 区分3 疾病または負傷／障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または入院に相当する治療または安静を要し、乳幼児の保育が不可', value: `${prefix}_illness_0`, points: 100 },
  { label: '身体障害者手帳1級または2級', value: `${prefix}_illness_1`, points: 100 },
  { label: '精神障害者保健福祉手帳1級', value: `${prefix}_illness_2`, points: 100 },
  { label: '療育手帳A1またはA2', value: `${prefix}_illness_3`, points: 100 },
  { label: '身体障害者手帳3級', value: `${prefix}_illness_4`, points: 90 },
  { label: '精神障害者保健福祉手帳2級', value: `${prefix}_illness_5`, points: 90 },
  { label: '療育手帳B1', value: `${prefix}_illness_6`, points: 90 },
  { label: '月に4回以上通院加療を行い、常に安静を要し、乳幼児の保育が困難', value: `${prefix}_illness_7`, points: 80 },
  { label: '身体障害者手帳4級', value: `${prefix}_illness_8`, points: 80 },
  { label: '精神障害者保健福祉手帳3級', value: `${prefix}_illness_9`, points: 80 },
  { label: '療育手帳B2', value: `${prefix}_illness_10`, points: 80 },
  { label: '月に2回以上通院加療を行い、常に安静を要し、乳幼児の保育が困難', value: `${prefix}_illness_11`, points: 70 },
  { label: '身体障害者手帳（その他）', value: `${prefix}_illness_12`, points: 70 },
  { label: '月に1回以上通院加療を行い、常に安静を要し、乳幼児の保育が困難', value: `${prefix}_illness_13`, points: 60 },
  { label: '上記には該当しないが、通院加療を行い、安静が必要で乳幼児の保育が困難', value: `${prefix}_illness_14`, points: 40 },
];

// 区分4 看護または介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居の親族（長期間入院等をしている親族を含む）を週60時間以上看護または介護している', value: `${prefix}_care_0`, points: 100 },
  { label: '同居の親族を週40時間以上看護または介護している', value: `${prefix}_care_1`, points: 70 },
  { label: '同居の親族を週24時間以上看護または介護している', value: `${prefix}_care_2`, points: 50 },
  { label: '同居の親族を週12時間以上看護または介護している', value: `${prefix}_care_3`, points: 30 },
  { label: '上記には該当しないが、同居の親族を看護または介護している', value: `${prefix}_care_4`, points: 20 },
];

// 区分5 災害の復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害の復旧に当たっている', value: `${prefix}_disaster_0`, points: 100 },
];

// 区分6 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業の準備を含む）', value: `${prefix}_jobseeking_0`, points: 10 },
];

// 区分8 虐待・DV
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '児童虐待を行っている、または再び行われるおそれがある', value: `${prefix}_abuse_0`, points: 100 },
  { label: '配偶者からの暴力により保育を行うことが困難', value: `${prefix}_abuse_1`, points: 100 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    inputType: 'select',
    options: [
      { label: '就労（就学も同じ時間区分）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護または介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '学校や職業訓練施設への通学・通所も、月の就学時間に応じてこの表の時間区分を使います',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 別表第2 調整点数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+120）', value: 'adj_single_parent_1', points: 120 },
    ],
  },
  {
    id: 'adj_grandparent_guardian',
    category: 'adjustment',
    label: '父母が不存在で、主たる保護者が祖父母等ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_guardian_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_grandparent_guardian_1', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯であって、就労による自立支援につながると認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_welfare_1', points: 30 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '児童の兄弟姉妹が市内の特定教育・保育施設等を利用、またはその利用を申請していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_1', points: 5 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '認可保育所・地域型保育事業・家庭的保育事業・企業主導型保育事業の卒園児に対して、施設が連携施設を指定していませんか？',
    helpText: '兄弟姉妹の利用（+5）に当たる場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_graduate_1', points: 5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者が単身赴任していますか？',
    helpText: '保育の必要な事由が就労の場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: '日本国外へ単身赴任（+10）', value: 'adj_tanshin_1', points: 10 },
      { label: '日本国内で単身赴任（+8）', value: 'adj_tanshin_2', points: 8 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者のいずれかが保育士で、いなべ市内の特定教育・保育施設等に直接雇用により勤務中または勤務予定ですか？',
    helpText: '1日7時間以上かつ月20日以上勤務し、または勤務する予定であることが条件です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_nursery_staff_1', points: 20 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業等により、就労の必要性が高いと認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_unemployed_1', points: 10 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待またはDVにより、特に保育が必要と認める状態にありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_0', points: 0 },
      { label: 'はい（+100）', value: 'adj_abuse_1', points: 100 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '保護者が育児休業からの復帰を予定し、かつ復帰の確約書を提出していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: '年度の初日において満2歳児から小学校就学前子どもまで（+8）', value: 'adj_leave_return_1', points: 8 },
      { label: '上記以外（+3）', value: 'adj_leave_return_2', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '認可外保育施設を利用（または申請）している児童の3親等以内の血族が保育をし、保護者が常態として月48時間以上就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_0', points: 0 },
      { label: '年度の初日において満2歳児から小学校就学前子どもまで（+8）', value: 'adj_unlicensed_1', points: 8 },
      { label: '上記以外（+3）', value: 'adj_unlicensed_2', points: 3 },
    ],
  },
];

export const inabeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
