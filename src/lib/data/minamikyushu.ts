import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 南九州市 保育所等利用調整基準データ
// 出典: 南九州市保育所等の利用調整等に関する基準要綱（別表第1・第2・第3）
// https://www1.g-reiki.net/city.minamikyushu/reiki_honbun/r378RG00000958.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大20点。週間時間で4段階。内職は1段低い。
// ひとり親は基準指数で+20（配偶者なし）＋調整指数で+3。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'minamikyushu',
  name: '南九州市',
  slug: 'minamikyushu',
  prefecture: '鹿児島県',
  maxBasePoints: 40,
} as const;

const outsideEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_none`, points: 0 },
  { label: '週40時間以上（20点）', value: `${prefix}_outside_20`, points: 20 },
  { label: '週30時間以上（16点）', value: `${prefix}_outside_16`, points: 16 },
  { label: '週24時間以上（14点）', value: `${prefix}_outside_14`, points: 14 },
  { label: '週16時間以上（12点）', value: `${prefix}_outside_12`, points: 12 },
];

const insideEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_inside_none`, points: 0 },
  { label: '週40時間以上（20点）', value: `${prefix}_inside_20`, points: 20 },
  { label: '週30時間以上（16点）', value: `${prefix}_inside_16`, points: 16 },
  { label: '週24時間以上（14点）', value: `${prefix}_inside_14`, points: 14 },
  { label: '週16時間以上（12点）', value: `${prefix}_inside_12`, points: 12 },
];

const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piecework_none`, points: 0 },
  { label: '週40時間以上（16点）', value: `${prefix}_piecework_16`, points: 16 },
  { label: '週30時間以上（14点）', value: `${prefix}_piecework_14`, points: 14 },
  { label: '週24時間以上（12点）', value: `${prefix}_piecework_12`, points: 12 },
  { label: '週16時間以上（10点）', value: `${prefix}_piecework_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院（1月以上）/ 常時臥床（20点）', value: `${prefix}_illness_20`, points: 20 },
  { label: '長期安静 / 週3日以上通院（12点）', value: `${prefix}_illness_12`, points: 12 },
  { label: 'その他（保育困難）（8点）', value: `${prefix}_illness_8`, points: 8 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '療育手帳A / 身体1・2級 / 精神1・2級（20点）', value: `${prefix}_disability_20`, points: 20 },
  { label: '療育手帳B1 / 身体3級 / 精神3級（16点）', value: `${prefix}_disability_16`, points: 16 },
  { label: '療育手帳B2 / 身体4級（12点）', value: `${prefix}_disability_12`, points: 12 },
  { label: 'その他（保育困難）（10点）', value: `${prefix}_disability_10`, points: 10 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護4〜5の在宅介護 / 病院付添い月160時間以上（20点）', value: `${prefix}_care_20`, points: 20 },
  { label: '病院付添い月120時間以上（18点）', value: `${prefix}_care_18`, points: 18 },
  { label: '要介護3の在宅介護 / 付添い月96時間以上（16点）', value: `${prefix}_care_16`, points: 16 },
  { label: '病院付添い月64時間以上（14点）', value: `${prefix}_care_14`, points: 14 },
  { label: 'その他（12点）', value: `${prefix}_care_12`, points: 12 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（20点）', value: `${prefix}_childbirth_20`, points: 20 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週40時間以上の就学・職業訓練（18点）', value: `${prefix}_education_18`, points: 18 },
  { label: '週30時間以上（16点）', value: `${prefix}_education_16`, points: 16 },
  { label: '週24時間以上（14点）', value: `${prefix}_education_14`, points: 14 },
  { label: '週16時間以上 / 大学・大学院（12点）', value: `${prefix}_education_12`, points: 12 },
  { label: 'その他の就学（8点）', value: `${prefix}_education_8`, points: 8 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている（20点）', value: `${prefix}_disaster_20`, points: 20 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: 'ハローワーク等で求職活動（7点）', value: `${prefix}_jobseeking_7`, points: 7 },
  { label: 'その他の求職活動（1点）', value: `${prefix}_jobseeking_1`, points: 1 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '居宅外で働いている', value: `${prefix}_reason_outside`, points: 0 },
      { label: '居宅内で働いている（自営等）', value: `${prefix}_reason_inside`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_piecework`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside_employment`,
      category,
      label: `${parentLabel}の居宅外就労の状況は？`,
      inputType: 'radio',
      options: outsideEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_inside_employment`,
      category,
      label: `${parentLabel}の居宅内就労（自営等）の状況は？`,
      inputType: 'radio',
      options: insideEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_piecework`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: pieceworkOptions(prefix),
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
      label: `${parentLabel}の障害の等級は？`,
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
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
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
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '基準指数+20（配偶者なし）＋調整指数+3の合計+23',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+23）', value: 'adj_single_parent_yes', points: 23 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいが利用中の園を第1希望にしていますか？',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sibling_same_yes', points: 10 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士等として市内で就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_nursery_worker_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '2人以上同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_simultaneous_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disability_parent',
    category: 'adjustment',
    label: '保護者が障害者手帳を所持していますか？（就労・就学中）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_parent_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_disability_parent_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '未就学児が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_multi_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '市外からの申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（市内在住）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外在住）（-5）', value: 'adj_outside_city_yes', points: -5 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '利用者負担金の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_delinquent_yes', points: -10 },
    ],
  },
];

export const minamikyushuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
