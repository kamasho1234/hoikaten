import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 阿賀野市 保育園入園 利用調整基準データ
// 出典: 阿賀野市「阿賀野市認可保育施設入園選考基準（令和8年度 入園の手引き）」
// https://www.city.agano.niigata.jp/material/files/group/21/R8nyuennotebiki.pdf
// -------------------------------------------------------------------------
// 阿賀野市は「基準点（父母それぞれ算出し、どちらか低い点数を適用）＋ 調整点」の合計で優先順位を決める。
// 合計点数が並んだ場合は優先度合判断基準（保育の協力者の有無、養育する子どもの人数など）で決まる。
// 「その他（上記に類する状態）1〜10点」は幅があるため選択肢にしていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'agano',
  name: '阿賀野市',
  slug: 'agano',
  prefecture: '新潟県',
  maxBasePoints: 10,
  scoringMethod: 'min',
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上働いている', value: `${prefix}_employment_0`, points: 10 },
  { label: '月120時間以上働いている', value: `${prefix}_employment_1`, points: 8 },
  { label: '月80時間以上働いている', value: `${prefix}_employment_2`, points: 6 },
  { label: '月48時間以上働いている', value: `${prefix}_employment_3`, points: 3 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院している / 要介護4以上 / 身体1・2級 / 精神1級 / 療育手帳', value: `${prefix}_illness_0`, points: 10 },
  { label: '通院している / 要介護3 / 身体3級 / 精神2級', value: `${prefix}_illness_1`, points: 8 },
  { label: '要介護2以下 / 身体4級以下 / 精神3級', value: `${prefix}_illness_2`, points: 6 },
  { label: '上記と同程度の診断を受けている', value: `${prefix}_illness_3`, points: 3 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院している親族の介護 / 要介護4以上 / 身体1・2級 / 精神1級 / 療育手帳の親族の介護', value: `${prefix}_care_0`, points: 10 },
  { label: '通院している親族の介護 / 要介護3 / 身体3級 / 精神2級の親族の介護', value: `${prefix}_care_1`, points: 8 },
  { label: '要介護2以下 / 身体4級以下 / 精神3級の親族の介護', value: `${prefix}_care_2`, points: 6 },
  { label: '上記と同程度の診断を受けている親族の介護', value: `${prefix}_care_3`, points: 3 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前産後8週間の期間で出産の準備または休養を要する', value: `${prefix}_childbirth_0`, points: 10 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害の復旧にあたっている', value: `${prefix}_disaster_0`, points: 10 },
];

const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVのおそれがある', value: `${prefix}_abuse_0`, points: 10 },
];

const parental_leaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '既に保育を利用している子どもがいて継続利用が必要', value: `${prefix}_parental_leave_0`, points: 2 },
];

const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動を行っている', value: `${prefix}_jobseeking_0`, points: 1 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '阿賀野市は父母それぞれの基準点のうち、低いほうを世帯の基準点にします',
    inputType: 'select',
    options: [
      { label: '就労・就学', value: `${prefix}_reason_employment`, points: 0 },
      { label: '傷病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_parental_leave`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労・就学の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の傷病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
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
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中で継続利用が必要ですか？`,
      inputType: 'radio',
      options: parental_leaveOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
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
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: '同居の祖父母がいない、または祖父母が65歳以上（+10）', value: 'adj_single_parent_1', points: 10 },
      { label: '65歳未満の祖父母と同居している（+6）', value: 'adj_single_parent_2', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+6）', value: 'adj_welfare_1', points: 6 },
    ],
  },
  {
    id: 'adj_protection',
    category: 'adjustment',
    label: '児童に対する保護の必要性が関係機関で確認されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_protection_0', points: 0 },
      { label: 'はい（+6）', value: 'adj_protection_1', points: 6 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母のどちらかが単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+6）', value: 'adj_tanshin_1', points: 6 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '入園を希望している児童が第3子以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_third_child_1', points: 4 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '阿賀野市の保育施設に勤務する保育士・保育教諭・看護師ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: '6時間以上勤務（+10）', value: 'adj_hoikushi_1', points: 10 },
      { label: '6時間未満勤務（+5）', value: 'adj_hoikushi_2', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '同一の保育施設にきょうだいが入園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'はい（求職中以外）（+7）', value: 'adj_sibling_enrolled_1', points: 7 },
      { label: 'はい（求職中）（+1）', value: 'adj_sibling_enrolled_2', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童に障害がありますか？（障害のあるきょうだいがいる場合を含む）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_together',
    category: 'adjustment',
    label: '複数人のきょうだいが同時入園を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_together_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_together_1', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業から復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_leave_return_1', points: 1 },
    ],
  },
  {
    id: 'adj_family_home',
    category: 'adjustment',
    label: '就労していない65歳未満の同居親族がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_home_0', points: 0 },
      { label: 'はい（-5）', value: 'adj_family_home_1', points: -5 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（-5）', value: 'adj_fee_delinquent_1', points: -5 },
    ],
  },
];

export const aganoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
