import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 魚沼市 保育利用調整基準データ
// 出典: 魚沼市保育園等利用調整実施要綱
// https://www.city.uonuma.lg.jp/reiki/reiki_honbun/r043RG00001307.html
// ---------------------------------------------------------------------------
// sum方式（父母の基準指数を合算）。
// 家庭外・家庭内就労ともに、就労頻度（週5日以上/週4日/週3日/月48h以上）×
// 1日就労時間（7h以上/6h以上/5h以上/4h以上/3h以上）の組み合わせで評価。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'uonuma',
  name: '魚沼市',
  slug: 'uonuma',
  prefecture: '新潟県',
  maxBasePoints: 20,
} as const;

// 家庭外就労の選択肢（就労頻度×時間）
const extWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ext_none`, points: 0 },
  { label: '週5日以上・7時間以上（10点）', value: `${prefix}_ext_10`, points: 10 },
  { label: '週5日以上・6時間以上 / 週4日・7時間以上（9点）', value: `${prefix}_ext_9`, points: 9 },
  { label: '週5日以上・5時間以上 / 週4日・6時間以上 / 週3日・7時間以上（8点）', value: `${prefix}_ext_8`, points: 8 },
  { label: '週5日以上・4時間以上 / 週4日・5時間以上 / 週3日・6時間以上（7点）', value: `${prefix}_ext_7`, points: 7 },
  { label: '週5日以上・3時間以上 / 週4日・4時間以上 / 週3日・5時間以上（6点）', value: `${prefix}_ext_6`, points: 6 },
  { label: '週4日・3時間以上 / 週3日・4時間以上（5点）', value: `${prefix}_ext_5`, points: 5 },
  { label: '月48時間以上（上記未満）（4点）', value: `${prefix}_ext_4`, points: 4 },
];

// 家庭内就労の選択肢（同頻度×時間、家庭外より1点低い）
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '週5日以上・7時間以上（9点）', value: `${prefix}_home_9`, points: 9 },
  { label: '週5日以上・6時間以上 / 週4日・7時間以上（8点）', value: `${prefix}_home_8`, points: 8 },
  { label: '週5日以上・5時間以上 / 週4日・6時間以上 / 週3日・7時間以上（7点）', value: `${prefix}_home_7`, points: 7 },
  { label: '週5日以上・4時間以上 / 週4日・5時間以上 / 週3日・6時間以上（6点）', value: `${prefix}_home_6`, points: 6 },
  { label: '週5日以上・3時間以上 / 週4日・4時間以上 / 週3日・5時間以上（5点）', value: `${prefix}_home_5`, points: 5 },
  { label: '週4日・3時間以上 / 週3日・4時間以上（4点）', value: `${prefix}_home_4`, points: 4 },
  { label: '月48時間以上（上記未満）（3点）', value: `${prefix}_home_3`, points: 3 },
];

// 疾病・負傷
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
  { label: '1か月以上入院または常時寝たきり（10点）', value: `${prefix}_ill_10`, points: 10 },
  { label: '自宅での安静加療（8点）', value: `${prefix}_ill_8`, points: 8 },
  { label: 'その他の常時保育困難な状態（6点）', value: `${prefix}_ill_6`, points: 6 },
];

// 障害
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dis_none`, points: 0 },
  { label: '身体障害1・2級 / 精神障害1・2級 / 療育手帳A相当（10点）', value: `${prefix}_dis_10`, points: 10 },
  { label: '身体障害3級 / 精神障害 / 療育手帳B相当（8点）', value: `${prefix}_dis_8`, points: 8 },
  { label: '身体障害4級以下（4点）', value: `${prefix}_dis_4`, points: 4 },
];

// 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護4以上・常時付添いが必要（10点）', value: `${prefix}_care_10`, points: 10 },
  { label: '要介護3・常時でないが保育困難（8点）', value: `${prefix}_care_8`, points: 8 },
  { label: 'その他の保育困難な状態（5点）', value: `${prefix}_care_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  return [
    {
      id: `${prefix}_reason`,
      category,
      label: `${parentLabel}：保育が必要な理由`,
      helpText: '最も該当するものをひとつ選んでください',
      inputType: 'select',
      options: [
        { label: '居宅外で就労している', value: `${prefix}_reason_ext`, points: 0 },
        { label: '居宅内で就労している（在宅・自営業等）', value: `${prefix}_reason_home`, points: 0 },
        { label: '妊娠中または出産間近（10点）', value: `${prefix}_reason_birth`, points: 10 },
        { label: '育児休業中（3点）', value: `${prefix}_reason_parental_leave`, points: 3 },
        { label: '就学（大学・専門学校等）（8点）', value: `${prefix}_reason_study`, points: 8 },
        { label: '求職活動中（3点）', value: `${prefix}_reason_jobseeking`, points: 3 },
        { label: '疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
        { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
        { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
        { label: '不在（死亡・離婚・行方不明・拘禁等）（10点）', value: `${prefix}_reason_absent`, points: 10 },
        { label: '災害復旧（10点）', value: `${prefix}_reason_disaster`, points: 10 },
      ],
    },
    {
      id: `${prefix}_ext`,
      category,
      label: `${parentLabel}の居宅外就労の状況は？`,
      helpText: '就労頻度と1日の就労時間の組み合わせで選択してください',
      inputType: 'select',
      options: extWorkOptions(prefix),
    },
    {
      id: `${prefix}_home`,
      category,
      label: `${parentLabel}の居宅内就労の状況は？`,
      helpText: '就労頻度と1日の就労時間の組み合わせで選択してください',
      inputType: 'select',
      options: homeWorkOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の状況は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '申込む子どもが障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_disabled_child_yes', points: 5 },
    ],
  },
  {
    id: 'adj_disabled_family',
    category: 'adjustment',
    label: '申込む子ども以外の世帯員が障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_family_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_disabled_family_yes', points: 3 },
    ],
  },
  {
    id: 'adj_job_loss',
    category: 'adjustment',
    label: '保護者が失業し就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_loss_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_job_loss_yes', points: 5 },
    ],
  },
  {
    id: 'adj_return_work',
    category: 'adjustment',
    label: '産休明け・育休明けの職場復帰に伴う申込ですか？（居宅外就労者）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_work_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_return_work_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent_young',
    category: 'adjustment',
    label: '65歳未満の同居親族（健康・未就労）が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gp_young_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_gp_young_yes', points: -3 },
    ],
  },
  {
    id: 'adj_grandparent_old',
    category: 'adjustment',
    label: '65歳以上の同居親族（健康・未就労）が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gp_old_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_gp_old_yes', points: -1 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが同一施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_enrolled_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時申請し、同一施設を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_sim_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_sim_yes', points: 2 },
    ],
  },
  {
    id: 'adj_no_other_child',
    category: 'adjustment',
    label: '他の就学前児童を保育所等に預けていない世帯ですか？',
    helpText: '該当する場合は-1点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（他の就学前児童が在園中）', value: 'adj_no_other_child_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_no_other_child_yes', points: -1 },
    ],
  },
  {
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '地域型保育施設（小規模保育等）を卒園予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_grad_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_small_grad_yes', points: 5 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '新年度募集で他施設からの転園希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_transfer_yes', points: 5 },
    ],
  },
  {
    id: 'adj_group_care',
    category: 'adjustment',
    label: '集団保育が必要と判定されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_group_care_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_group_care_yes', points: 3 },
    ],
  },
  {
    id: 'adj_special_hardship',
    category: 'adjustment',
    label: '保育困難な特別事情がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_hardship_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_special_hardship_yes', points: 10 },
    ],
  },
];

export const uonamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
