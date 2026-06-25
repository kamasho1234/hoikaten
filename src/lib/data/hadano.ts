import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 秦野市 保育所等利用調整基準データ
// 出典: 秦野市 保育所等利用調整基準
// https://www.city.hadano.kanagawa.jp/material/files/group/41/kijyun.pdf
// ---------------------------------------------------------------------------
// 秦野市は「基本点数（父母のうち低い方、最大12点）＋ 調整点数」のmin方式。
// 就労は雇用形態（外勤/自営/居宅内/内職）×月間時間数で細分化。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hadano',
  name: '秦野市',
  slug: 'hadano',
  prefecture: '神奈川県',
  maxBasePoints: 12,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・月150時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '外勤・月120時間以上 または 自営(外勤)・月150時間以上', value: `${prefix}_employment_11`, points: 11 },
  { label: '外勤・月90時間以上 または 自営(外勤)・月120時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '外勤・月64時間以上 または 自営(外勤)・月90時間以上', value: `${prefix}_employment_9`, points: 9 },
  { label: '自営(外勤)・月64時間以上 または 居宅内・月120時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '居宅内就労・月90時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '居宅内就労・月64時間以上 または 内職', value: `${prefix}_employment_6`, points: 6 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上の入院・常時病臥', value: `${prefix}_illness_12`, points: 12 },
  { label: '通院加療中で常に安静を要する（常時保育困難）', value: `${prefix}_illness_11`, points: 11 },
  { label: '通院加療中で保育が困難', value: `${prefix}_illness_10`, points: 10 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／精神障害者保健福祉手帳1・2級／療育手帳A1・A2', value: `${prefix}_disability_12`, points: 12 },
  { label: '身体障害者手帳3級／精神障害者保健福祉手帳3級／療育手帳B1・B2', value: `${prefix}_disability_10`, points: 10 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居親族の介護・看護（月20日以上・1日6時間以上）', value: `${prefix}_care_10`, points: 10 },
  { label: '同居親族の介護・看護（月16日以上・1日4時間以上）', value: `${prefix}_care_8`, points: 8 },
  { label: '別居親族の介護・看護', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の8週前〜産後8週（多胎妊娠は10週前〜）', value: `${prefix}_childbirth_9`, points: 9 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '大学・専門学校・職業訓練校等（月16日以上・1日4時間以上）', value: `${prefix}_education_8`, points: 8 },
  { label: '通信制の就学', value: `${prefix}_education_6`, points: 6 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '秦野市では父母のうち低い方の基本点数（最大12点）で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '雇用形態と月間労働時間の組み合わせで点数が変わります。最低基準: 月16日・週4日・1日4時間以上',
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
      label: `${parentLabel}の介護・看護の状況は？`,
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
      label: `${parentLabel}は学校・職業訓練に通っていますか？`,
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
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '秦野市内の保育所等で保育教諭・保育士として勤務していますか？（内定含む）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_nursery_worker_yes', points: 7 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_single_parent_yes', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、就労による自立支援につながると見込まれますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_parental_leave_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいがすでに保育利用している施設に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_same_yes', points: 3 },
    ],
  },
  {
    id: 'adj_small_nursery',
    category: 'adjustment',
    label: '小規模保育事業・家庭的保育事業の利用期限を迎える世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_small_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_reapply',
    category: 'adjustment',
    label: '育休取得に伴い退園した施設に再度申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reapply_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_reapply_yes', points: 3 },
    ],
  },
  {
    id: 'adj_employment_track',
    category: 'adjustment',
    label: '父母ともに3ヶ月以上の就労実績がありますか？（自営・親族経営除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_employment_track_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_employment_track_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母と同居で、保育の必要性を証する書類がありませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_grandparent_yes', points: -5 },
    ],
  },
  {
    id: 'adj_preschool_unused',
    category: 'adjustment',
    label: '申込児童以外の就学前児童が保育所等を利用していませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（利用している、または該当する児童がいない）', value: 'adj_preschool_unused_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_preschool_unused_yes', points: -2 },
    ],
  },
];

export const hadanoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
