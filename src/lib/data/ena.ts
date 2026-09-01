import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 恵那市 保育園入園 利用調整基準データ
// 出典: 恵那市「令和9年度 恵那市こども園・保育園入園案内」内「入園選考基準表」
// https://www.city.ena.lg.jp/material/files/group/30/R9nyuuennannnai.pdf
// ---------------------------------------------------------------------------
// 恵那市は「1. 基準指数（保育の必要性の事由・父母それぞれ）＋ 2. 調整指数」の加算方式。
// ---------------------------------------------------------------------------
// 「地域加算（住所地の学校区にある園を希望）」は点数ではなく同点時の優先とされ、
// 「その他」は-10〜10の幅で決まるため、どちらも選択肢にしていない。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ena',
  name: '恵那市',
  slug: 'ena',
  prefecture: '岐阜県',
  maxBasePoints: 10,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働・月140時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '居宅外労働・月120時間以上', value: `${prefix}_employment_9`, points: 9 },
  { label: '居宅外労働・月100時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '居宅外労働・月80時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '居宅外労働・月48時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '居宅内労働・月140時間以上', value: `${prefix}_employment_9b`, points: 9 },
  { label: '居宅内労働・月100時間以上', value: `${prefix}_employment_7b`, points: 7 },
  { label: '居宅内労働・月48時間以上', value: `${prefix}_employment_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前2か月・出産後2か月にかかる期間に入園', value: `${prefix}_childbirth_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'おおむね1か月以上の入院による療養', value: `${prefix}_illness_10`, points: 10 },
  { label: '常時臥床（おおむね1か月以上の加療）', value: `${prefix}_illness_10b`, points: 10 },
  { label: '精神疾患（おおむね1か月以上の加療）', value: `${prefix}_illness_8`, points: 8 },
  { label: '一般療養（比較的軽症だが定期的な通院）', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 精神1・2級 / 療育A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3・4級 / 精神3級 / 療育B1', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体5・6級 / 療育B2', value: `${prefix}_disability_4`, points: 4 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（重度障がい者・常時病臥・精神的疾患等）', value: `${prefix}_care_10`, points: 10 },
  { label: '在宅の介護・看護（上記以外）', value: `${prefix}_care_7`, points: 7 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風水害等の災害復旧のため保育にあたれない', value: `${prefix}_disaster_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動・起業準備中（ひとり親家庭）', value: `${prefix}_jobseeking_6`, points: 6 },
  { label: '求職活動・起業準備中（一般家庭）', value: `${prefix}_jobseeking_4`, points: 4 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学・職業訓練が月140時間以上', value: `${prefix}_school_9`, points: 9 },
  { label: '就学・職業訓練が月100時間以上', value: `${prefix}_school_7`, points: 7 },
  { label: '就学・職業訓練が月48時間以上', value: `${prefix}_school_5`, points: 5 },
];

const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '虐待またはDVのおそれがあると認める場合', value: `${prefix}_other_10`, points: 10 },
  { label: '父母の死亡・離婚・未婚・単身赴任等で不在', value: `${prefix}_other_10b`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '恵那市は父母それぞれの基準指数を合計し、調整指数を加減して選考します',
    inputType: 'select',
    options: [
      { label: '就労している', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '心身障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動・起業準備', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_school`, points: 0 },
      { label: 'その他（虐待・父母不在）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}の就労の状況は？`, inputType: 'radio', options: employmentOptions(prefix) },
    { id: `${prefix}_childbirth`, category, label: `${parentLabel}の妊娠・出産の状況は？`, inputType: 'radio', options: childbirthOptions(prefix) },
    { id: `${prefix}_illness`, category, label: `${parentLabel}の疾病の状況は？`, inputType: 'radio', options: illnessOptions(prefix) },
    { id: `${prefix}_disability`, category, label: `${parentLabel}の心身障がいの程度は？`, inputType: 'radio', options: disabilityOptions(prefix) },
    { id: `${prefix}_care`, category, label: `${parentLabel}の介護・看護の状況は？`, inputType: 'radio', options: careOptions(prefix) },
    { id: `${prefix}_disaster`, category, label: `${parentLabel}は災害復旧にあたっていますか？`, inputType: 'radio', options: disasterOptions(prefix) },
    { id: `${prefix}_jobseeking`, category, label: `${parentLabel}の求職活動の状況は？`, inputType: 'radio', options: jobSeekingOptions(prefix) },
    { id: `${prefix}_school`, category, label: `${parentLabel}の就学・職業訓練の状況は？`, inputType: 'radio', options: schoolOptions(prefix) },
    { id: `${prefix}_other`, category, label: `${parentLabel}のその他の状況は？`, inputType: 'radio', options: otherOptions(prefix) },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（母子家庭・父子家庭）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けている世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計の中心者が失業等で就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployed_yes', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童または同一世帯の他の児童に障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同時入園を希望、または希望する園に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_yes', points: 4 },
    ],
  },
  {
    id: 'adj_leave_continue',
    category: 'adjustment',
    label: '育児休業中で在園児の継続保育が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_continue_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_leave_continue_yes', points: 10 },
    ],
  },
  {
    id: 'adj_reenter',
    category: 'adjustment',
    label: '育児休業等の理由で退園した園への再入園を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reenter_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_reenter_yes', points: 3 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育所や託児所の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_graduate_yes', points: 3 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が恵那市内で保育教諭・保育士として就労（予定を含む）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_hoikushi_yes', points: 4 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '正当な理由なく保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_fee_delinquent_yes', points: -10 },
    ],
  },
];

export const enaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
