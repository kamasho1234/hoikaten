import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 鉾田市 保育の利用に関する要綱 基本点数表・調整点数表
// 出典: 鉾田市保育の利用に関する要綱（別表第1・第2）
// http://www.city.hokota.lg.jp/reiki_int/reiki_honbun/r229RG00000685.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大10点。基本点数 + 調整点数で算出。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hokota',
  name: '鉾田市',
  slug: 'hokota',
  prefecture: '茨城県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（10点）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120時間以上160時間未満（9点）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月84時間以上120時間未満（7点）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月56時間以上84時間未満（6点）', value: `${prefix}_employment_6`, points: 6 },
  { label: '月56時間以上（その他）（5点）', value: `${prefix}_employment_5`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または入院相当の治療（10点）', value: `${prefix}_illness_10`, points: 10 },
  { label: '常時安静を要する通院（8点）', value: `${prefix}_illness_8`, points: 8 },
  { label: '週1～2日の通院（6点）', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、療育A・B、精神1・2・3級（10点）', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3・4級（8点）', value: `${prefix}_disability_8`, points: 8 },
  { label: 'その他の手帳所持（6点）', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月20日以上・週40時間以上の介護（9点）', value: `${prefix}_care_9`, points: 9 },
  { label: '月20日以上・週30時間以上の介護（8点）', value: `${prefix}_care_8`, points: 8 },
  { label: '月14日以上・週24時間以上の介護（7点）', value: `${prefix}_care_7`, points: 7 },
  { label: '月14日以上・週16時間以上の介護（6点）', value: `${prefix}_care_6`, points: 6 },
  { label: '月56時間以上のその他の介護（5点）', value: `${prefix}_care_5`, points: 5 },
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
      { label: '働いている（就学含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産（10点）', value: `${prefix}_reason_childbirth`, points: 10 },
      { label: '災害復旧（10点）', value: `${prefix}_reason_disaster`, points: 10 },
      { label: '求職中（未定）（2点）', value: `${prefix}_reason_jobseeking`, points: 2 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '居宅外就労の基準です',
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
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが保育所に在所中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_yes', points: 1 },
    ],
  },
  {
    id: 'adj_breadwinner_unemployed',
    category: 'adjustment',
    label: '生計中心者が失業中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_breadwinner_unemployed_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_breadwinner_unemployed_yes', points: 2 },
    ],
  },
  {
    id: 'adj_childcare_leave_return',
    category: 'adjustment',
    label: '育児休業からの復職申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_leave_return_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_childcare_leave_return_yes', points: 2 },
    ],
  },
];

export const hokotaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
