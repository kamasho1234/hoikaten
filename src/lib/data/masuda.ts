import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 益田市 保育園入園 利用調整基準データ
// 出典: 益田市「令和8年度 保育所等利用調整基準」
// https://www.city.masuda.lg.jp/material/files/group/18/03_R8tyousei.pdf
// -------------------------------------------------------------------------
// 益田市は「基準指数（父母それぞれ10点を上限）＋調整指数」を父母それぞれで求め、その平均（判定指数）で利用調整する。
// 調整指数は項目ごとに5点を上限とし、世帯の状況の細目は重複適用せず高い方を適用すると定められている。
// 障がい児保育・1号から2号への変更・連携先施設への入所などは別枠で調整されるため、当サイトでは扱っていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'masuda',
  name: '益田市',
  slug: 'masuda',
  prefecture: '島根県',
  maxBasePoints: 10,
  scoringMethod: 'avg',
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上・1日7時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '週5日以上・1日6時間以上', value: `${prefix}_employment_1`, points: 9 },
  { label: '週5日以上・1日5時間以上', value: `${prefix}_employment_2`, points: 8 },
  { label: '週5日以上・1日4時間以上', value: `${prefix}_employment_3`, points: 7 },
  { label: '週5日以上・1日3時間以上', value: `${prefix}_employment_4`, points: 6 },
  { label: '週4日・1日7時間以上', value: `${prefix}_employment_5`, points: 8 },
  { label: '週4日・1日6時間以上', value: `${prefix}_employment_6`, points: 7 },
  { label: '週4日・1日5時間以上', value: `${prefix}_employment_7`, points: 6 },
  { label: '週4日・1日4時間以上', value: `${prefix}_employment_8`, points: 5 },
  { label: '週4日・1日3時間以上', value: `${prefix}_employment_9`, points: 4 },
  { label: '週3日以下・1日7時間以上', value: `${prefix}_employment_10`, points: 6 },
  { label: '週3日以下・1日6時間以上', value: `${prefix}_employment_11`, points: 5 },
  { label: '月48時間以上だが1日の就労時間が上記に満たない', value: `${prefix}_employment_12`, points: 3 },
];

const selfOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_self_none`, points: 0 },
  { label: '週5日以上・1日7時間以上', value: `${prefix}_self_0`, points: 10 },
  { label: '週5日以上・1日6時間以上', value: `${prefix}_self_1`, points: 9 },
  { label: '週5日以上・1日5時間以上', value: `${prefix}_self_2`, points: 8 },
  { label: '週5日以上・1日4時間以上', value: `${prefix}_self_3`, points: 7 },
  { label: '週5日以上・1日3時間以上', value: `${prefix}_self_4`, points: 6 },
  { label: '週4日・1日7時間以上', value: `${prefix}_self_5`, points: 8 },
  { label: '週4日・1日6時間以上', value: `${prefix}_self_6`, points: 7 },
  { label: '週4日・1日5時間以上', value: `${prefix}_self_7`, points: 6 },
  { label: '週4日・1日4時間以上', value: `${prefix}_self_8`, points: 5 },
  { label: '週4日・1日3時間以上', value: `${prefix}_self_9`, points: 4 },
  { label: '週3日以下・1日7時間以上', value: `${prefix}_self_10`, points: 6 },
  { label: '週3日以下・1日6時間以上', value: `${prefix}_self_11`, points: 5 },
  { label: '月48時間以上だが1日の就労時間が上記に満たない', value: `${prefix}_self_12`, points: 3 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の約2か月前から出産後2か月程度まで', value: `${prefix}_childbirth_0`, points: 8 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '2週間を超え1か月未満の入院', value: `${prefix}_illness_1`, points: 8 },
  { label: '常時伏臥または1か月以上の自宅での安静療養', value: `${prefix}_illness_2`, points: 10 },
  { label: '慢性疾患等で1か月以上の自宅療養', value: `${prefix}_illness_3`, points: 8 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級（聴覚3級を含む）/ 療育手帳 / 精神障害者保健福祉手帳、または同等の障がい', value: `${prefix}_disability_0`, points: 10 },
  { label: '上記以外の手帳を所持、またはこれと同等の障がい', value: `${prefix}_disability_1`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上・1日7時間以上（自宅看護・介護／通院・施設通所の付添い）', value: `${prefix}_care_0`, points: 10 },
  { label: '週5日以上・1日4時間以上', value: `${prefix}_care_1`, points: 6 },
  { label: '週4日以下・1日7時間以上', value: `${prefix}_care_2`, points: 8 },
  { label: '週4日以下・1日4時間以上', value: `${prefix}_care_3`, points: 5 },
  { label: '月48時間以上だが1日の従事時間が上記に満たない', value: `${prefix}_care_4`, points: 4 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '風水害・地震・火災等による家庭の災害', value: `${prefix}_disaster_0`, points: 10 },
];

const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職または起業の準備のため常に外出している', value: `${prefix}_jobseeking_0`, points: 3 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月120時間以上、居宅外で勉強している', value: `${prefix}_school_0`, points: 6 },
  { label: '月48時間以上120時間未満、居宅外で勉強している', value: `${prefix}_school_1`, points: 4 },
];

const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '自立促進が必要なひとり親世帯等で就労先が確定した', value: `${prefix}_other_0`, points: 10 },
  { label: '生計中心者の失業により生活困窮の状態で就労が確定した', value: `${prefix}_other_1`, points: 10 },
  { label: '虐待やDVを受けるおそれがある', value: `${prefix}_other_2`, points: 10 },
  { label: 'その他、児童福祉の観点から保育の必要が認められる', value: `${prefix}_other_3`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '益田市は父母それぞれの指数を求め、その平均（判定指数）で利用調整します。基準指数は1人につき10点が上限です',
    inputType: 'select',
    options: [
      { label: '被雇用者として就労している', value: `${prefix}_reason_employment`, points: 0 },
      { label: '自営業（事業主・就労者）', value: `${prefix}_reason_self`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害等の復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学（学生）', value: `${prefix}_reason_school`, points: 0 },
      { label: 'その他（市長が適当と認める事由）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '月48時間以上の就労が要件です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_self`,
      category,
      label: `${parentLabel}の自営業の状況は？`,
      helpText: '月48時間以上の就労が要件です。事業主・就労者とも同じ指数です',
      inputType: 'radio',
      options: selfOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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
      label: `${parentLabel}の看護・介護の状況は？`,
      helpText: '月48時間以上の従事が要件です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
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
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '通信制は除きます',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}のその他の状況は？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況にあてはまるものは？（重複適用せず高い方を適用）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_0', points: 0 },
      { label: '生活保護受給世帯等で自立支援のために必要（+3）', value: 'adj_household_1', points: 3 },
      { label: 'ひとり親世帯等（+5）', value: 'adj_household_2', points: 5 },
      { label: '両親不存在世帯（+5）', value: 'adj_household_3', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '入所希望の保育所等にきょうだい（多胎児を含む）が既に入所していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_enrolled_1', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_together',
    category: 'adjustment',
    label: 'きょうだい（多胎児を含む）が同時に同一の保育所等へ入所を申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_together_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_together_1', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居する65歳未満の祖父母がいますか？',
    helpText: '祖父母の健康状態や就労状況によっては減算しないと定められています',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（-3）', value: 'adj_grandparent_1', points: -3 },
    ],
  },
];

export const masudaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
