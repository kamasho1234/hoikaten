import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 彦根市 保育所等利用調整基準データ
// 出典: 彦根市「令和8年度保育所等利用調整基準表」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hikone',
  name: '彦根市',
  slug: 'hikone',
  prefecture: '滋賀県',
  maxBasePoints: 20, // 父母各10点
} as const;

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月20日以上かつ1日6時間以上8時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月16日以上かつ1日6時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '月12日以上かつ1日6時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: 'その他（月60時間以上）', value: `${prefix}_employment_6`, points: 6 },
];

/** 内職 */
const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piecework_none`, points: 0 },
  { label: '月160時間以上の内職', value: `${prefix}_piecework_8`, points: 8 },
];

/** 疾病・負傷 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中', value: `${prefix}_illness_10a`, points: 10 },
  { label: '自宅での常時病臥（感染性疾患含む）', value: `${prefix}_illness_10b`, points: 10 },
  { label: '通院加療中（安静が必要）', value: `${prefix}_illness_8`, points: 8 },
  { label: 'その他の通院加療', value: `${prefix}_illness_6`, points: 6 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害1・2級 / 療育手帳A / 精神障害1級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害3級 / 療育手帳B / 精神障害2・3級', value: `${prefix}_disability_8`, points: 8 },
  { label: 'その他の障害（手帳等あり）', value: `${prefix}_disability_6`, points: 6 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院中の方への付添い', value: `${prefix}_care_10a`, points: 10 },
  { label: '身障1・2級/療育A/要介護3〜5の人を自宅介護', value: `${prefix}_care_10b`, points: 10 },
  { label: '身障3級/療育B/要介護1・2の人を自宅介護', value: `${prefix}_care_8`, points: 8 },
  { label: 'その他の介護・看護が必要な人を介護', value: `${prefix}_care_6`, points: 6 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上の就学', value: `${prefix}_education_10`, points: 10 },
  { label: '月20日以上かつ1日6時間以上8時間未満', value: `${prefix}_education_9`, points: 9 },
  { label: '月16日以上かつ1日6時間以上', value: `${prefix}_education_8`, points: 8 },
  { label: '月12日以上かつ1日6時間以上', value: `${prefix}_education_7`, points: 7 },
  { label: 'その他の就学（月60時間以上）', value: `${prefix}_education_6`, points: 6 },
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
      { label: '仕事をしている（会社員・パート等）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '内職', value: `${prefix}_reason_piecework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している（求職中）', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_piecework`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: pieceworkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}：妊娠中または出産後8週以内ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_childbirth_no`, points: 0 },
        { label: 'はい（母親のみ）', value: `${prefix}_childbirth_yes`, points: 8 },
      ],
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
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（震災・風水害・火災等の復旧）', value: `${prefix}_disaster_yes`, points: 10 },
      ],
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}：求職活動中ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_jobseeking_no`, points: 0 },
        { label: 'はい（ハローワーク等への求職登録）', value: `${prefix}_jobseeking_4`, points: 4 },
        { label: 'はい（ハローワーク等の証明あり）', value: `${prefix}_jobseeking_5`, points: 5 },
      ],
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '母子・父子家庭（死亡・離婚・行方不明等）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 13 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護または生活困窮世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保育士・幼稚園教諭免許を持つ保護者が市内保育施設に勤務（予定）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_staff_yes', points: 3 },
    ],
  },
  {
    id: 'adj_first_choice',
    category: 'adjustment',
    label: '第1希望の施設に申し込んでいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_first_choice_no', points: 0 },
      { label: 'はい', value: 'adj_first_choice_yes', points: 5 },
    ],
  },
  {
    id: 'adj_infant_graduate',
    category: 'adjustment',
    label: '乳児保育施設（0〜2歳専門）の卒園に伴う転所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_infant_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_infant_graduate_yes', points: 4 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '60歳未満の祖父母が同居または近居で家庭保育が可能ですか？',
    helpText: '日中保育ができる状態の祖父母が近くにいる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ / 該当しない', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（60歳未満の祖父母が家庭保育可能）', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
];

export const hikoneData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
