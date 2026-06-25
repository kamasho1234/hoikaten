import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 稲沢市 保育園入園利用調整基準データ
// 出典: 稲沢市 入園申込みにおける利用調整基準
// https://www.city.inazawa.aichi.jp/kosodate/cmsfiles/contents/0000004/4053/riyoutyouseikizyun.pdf
// ---------------------------------------------------------------------------
// 稲沢市はランク制（A-E）。AA>AB>BB>AC>...>EEの順で判定。
// シミュレーター上はA=10,B=8,C=6,D=4,E=2に変換しmin方式で近似。
// 実際の選考では同ランク時に調整指数→優先項目→抽選の順で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'inazawa',
  name: '稲沢市',
  slug: 'inazawa',
  prefecture: '愛知県',
  maxBasePoints: 10,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '被雇用者・月150時間以上', value: `${prefix}_employment_10a`, points: 10 },
  { label: '自営・農業（中心者・専従者）・月120時間以上150時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '自営・農業（中心者・専従者）・月60時間以上120時間未満', value: `${prefix}_employment_6a`, points: 6 },
  { label: '自営・農業（協力者）・月120時間以上', value: `${prefix}_employment_6b`, points: 6 },
  { label: '内職・月60時間以上120時間未満', value: `${prefix}_employment_4`, points: 4 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上入院 / 入院予定', value: `${prefix}_illness_10`, points: 10 },
  { label: '自宅療養で概ね1ヶ月以上病臥', value: `${prefix}_illness_8`, points: 8 },
  { label: '週3日以上通院加療・安静が必要', value: `${prefix}_illness_6`, points: 6 },
  { label: '継続的な通院加療・安静が必要', value: `${prefix}_illness_4`, points: 4 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 療育手帳A判定 / 精神障害者保健福祉手帳1級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級 / 療育手帳B判定 / 精神障害者保健福祉手帳2級', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳5・6級 / 療育手帳C判定 / 精神障害者保健福祉手帳3級', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '重度心身障害者等の常時介護 / 常時付添いによる通院・施設通所', value: `${prefix}_care_10`, points: 10 },
  { label: '心身障害者等の常時介護', value: `${prefix}_care_8`, points: 8 },
  { label: '上記以外の介護（月60時間以上）', value: `${prefix}_care_4`, points: 4 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前産後8週間（多胎妊娠は産前14週間）の期間', value: `${prefix}_childbirth_10`, points: 10 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週5日以上・月150時間以上の通学・通所', value: `${prefix}_education_10`, points: 10 },
  { label: '週4日以上・月120時間以上の通学・通所', value: `${prefix}_education_8`, points: 8 },
  { label: '週3日以上・月60時間以上の通学・通所', value: `${prefix}_education_6`, points: 6 },
  { label: '上記以外（通信教育等・月60時間以上）', value: `${prefix}_education_4`, points: 4 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '生計中心者の失業（前年度給与150万超）', value: `${prefix}_jobseeking_8`, points: 8 },
  { label: '上記以外の求職活動', value: `${prefix}_jobseeking_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '稲沢市はランク制（A-E）で判定。このシミュレーターでは数値に変換して近似計算します',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・付添い', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '実働時間は1日の実働予定時間に月の就労予定日数を乗じた時間',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・付添いの状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '2歳児クラスで卒園となる市内保育園等からの3歳児入園ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_graduation_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '18歳未満の子を3人以上養育していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_multi_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母が同居しており、自宅で保育が可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_grandparent_yes', points: -1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者のいずれかが稲沢市内の保育園等の保育士・保育教諭として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_nursery_worker_yes', points: 1 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '入園する児童が障害者手帳の交付を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_disability_child_yes', points: 2 },
    ],
  },
  {
    id: 'adj_no_experience',
    category: 'adjustment',
    label: '就労・介護・就学が予定で実績がない状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（実績あり）', value: 'adj_no_experience_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_no_experience_yes', points: -1 },
    ],
  },
];

export const inazawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
