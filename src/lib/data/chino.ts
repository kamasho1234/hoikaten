import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 茅野市 保育園入園 利用調整基準データ
// 出典: 茅野市「茅野市保育所等 利用調整基準表（令和9年度 保育園等利用の手引き）」
// https://www.city.chino.lg.jp/uploaded/attachment/43476.pdf
// -------------------------------------------------------------------------
// 茅野市は「①保育を必要とする事由（父母それぞれ）＋②優先保育1＋③優先保育2＋④調整指数」の合計で選考する。
// 保育を必要とする事由が複数ある場合は、原則として指数の高い事由の指数を用いる。
// ⑤私立優先指数（私立認定こども園のみ・4月入所10点など）は施設と入所月で決まるため、当サイトでは扱っていない。
// 「その他、上記に類する状態として市長が認める場合」は点数が定められていないため選択肢にしていない。
// 滞納の「滞納月×▲1」は月数で変わるため、当サイトでは督促状送付後4件以上の▲3のみを置いている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'chino',
  name: '茅野市',
  slug: 'chino',
  prefecture: '長野県',
  maxBasePoints: 22,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週35時間以上（1日7.5時間、週5日程度）', value: `${prefix}_employment_0`, points: 20 },
  { label: '週30時間以上（1日6時間、週5日程度）', value: `${prefix}_employment_1`, points: 18 },
  { label: '週25時間以上（1日5時間、週5日程度）', value: `${prefix}_employment_2`, points: 16 },
  { label: '週20時間以上（1日4時間、週5日程度）', value: `${prefix}_employment_3`, points: 14 },
  { label: '週16時間以上20時間未満', value: `${prefix}_employment_4`, points: 12 },
  { label: '内職等・月96時間以上かつ月収10万2千円以上', value: `${prefix}_employment_5`, points: 10 },
  { label: '内職等・月80時間以上かつ月収8万5千円以上', value: `${prefix}_employment_6`, points: 8 },
  { label: '内職等・月64時間以上かつ月収6万8千円以上', value: `${prefix}_employment_7`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前3か月・産後3か月', value: `${prefix}_childbirth_0`, points: 20 },
  { label: '産後4か月から産後6か月まで', value: `${prefix}_childbirth_1`, points: 8 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院', value: `${prefix}_illness_0`, points: 20 },
  { label: '居宅内療養で常時床についている', value: `${prefix}_illness_1`, points: 20 },
  { label: '精神性疾患・感染症の疾病または特定疾患', value: `${prefix}_illness_2`, points: 20 },
  { label: '自宅療養で週3日以上の通院を常態とする', value: `${prefix}_illness_3`, points: 17 },
  { label: '上記以外で保育が必要と認められる', value: `${prefix}_illness_4`, points: 13 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 療育A1・A2・B1 / 精神1・2級', value: `${prefix}_disability_0`, points: 20 },
  { label: '身体3級 / 療育B2 / 精神3級', value: `${prefix}_disability_1`, points: 18 },
  { label: '身体4級以下', value: `${prefix}_disability_2`, points: 12 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院または居宅内療養等で常時付き添い', value: `${prefix}_care_0`, points: 20 },
  { label: '病院または居宅内療養等で一部介護・看護が必要', value: `${prefix}_care_1`, points: 17 },
  { label: '上記以外の介護・看護で保育が必要と認められる', value: `${prefix}_care_2`, points: 8 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている', value: `${prefix}_disaster_0`, points: 20 },
];

const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就職活動（起業準備を含む）', value: `${prefix}_jobseeking_0`, points: 5 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '週35時間以上の就学（1日7.5時間、週5日程度）', value: `${prefix}_school_0`, points: 20 },
  { label: '週30時間以上の就学（1日6時間、週5日程度）', value: `${prefix}_school_1`, points: 18 },
  { label: '週25時間以上の就学（1日5時間、週5日程度）', value: `${prefix}_school_2`, points: 16 },
  { label: '週20時間以上の就学（1日4時間、週5日程度）', value: `${prefix}_school_3`, points: 14 },
  { label: '週16時間以上20時間未満の就学', value: `${prefix}_school_4`, points: 12 },
];

const childcareOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childcare_none`, points: 0 },
  { label: '3歳未満児を育児している保護者が3歳以上児の保育をしている', value: `${prefix}_childcare_0`, points: 2 },
];

const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '死亡・離婚・単身赴任・渡航・拘禁等の別居で常時保護者が不在', value: `${prefix}_other_0`, points: 22 },
  { label: '茅野市要保護児童対策協議会等で支援が必要と認められた', value: `${prefix}_other_1`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '茅野市は父母それぞれの指数を合算して世帯の指数にします。事由が複数ある場合は指数の高い事由を使います',
    inputType: 'select',
    options: [
      { label: '就労している（内定を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動等', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '育児（3歳未満児の育児）', value: `${prefix}_reason_childcare`, points: 0 },
      { label: 'その他（社会的養護・保護者不在）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間に通勤時間は含みません',
      inputType: 'radio',
      options: employmentOptions(prefix),
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
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
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
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は就職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '就学は就労の区分に準じて指数を決めると定められています',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_childcare`,
      category,
      label: `${parentLabel}は3歳未満児を育児しながら3歳以上児の保育をしていますか？`,
      inputType: 'radio',
      options: childcareOptions(prefix),
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
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_1', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計の中心者が失業していますか？（自己都合を除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_unemployed_1', points: 15 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士資格または幼稚園教諭免許を持ち、市内の認可保育所・認定こども園で月120時間以上勤務（内定を含む）しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_hoikushi_1', points: 20 },
    ],
  },
  {
    id: 'adj_child_care_need',
    category: 'adjustment',
    label: '入所する子どもに虐待等で社会的養護の必要性がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_care_need_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_child_care_need_1', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所する子どもに障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_child_disability_1', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '2号・3号認定のきょうだいが同じ施設に在園（+10）', value: 'adj_sibling_1', points: 10 },
      { label: '1号認定のきょうだいが同じ施設に在園し、内定・求職活動の事由で申込（+5）', value: 'adj_sibling_2', points: 5 },
      { label: '入所時に同じ施設を希望するきょうだいがいる（+5）', value: 'adj_sibling_3', points: 5 },
      { label: 'きょうだいが利用していない施設を第一希望にして新規入所を希望（+2）', value: 'adj_sibling_4', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？（すでに復帰している場合を含む）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_parental_leave_1', points: 3 },
    ],
  },
  {
    id: 'adj_leave_return_same',
    category: 'adjustment',
    label: '産後6か月を経過し、事由の消滅で退園した子どもが、育児休業終了時に同じ保育園を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_same_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_leave_return_same_1', points: 3 },
    ],
  },
  {
    id: 'adj_no_transport',
    category: 'adjustment',
    label: '他の保育園に通う場合の交通手段がありませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_transport_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_no_transport_1', points: 2 },
    ],
  },
  {
    id: 'adj_commute',
    category: 'adjustment',
    label: '自宅から職場までの通勤距離が片道15km以上ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_commute_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_commute_1', points: 2 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '在園児・卒園児が督促状送付後、4件以上保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（-3）', value: 'adj_fee_delinquent_1', points: -3 },
    ],
  },
  {
    id: 'adj_outside_area',
    category: 'adjustment',
    label: '保育園所在地区外の申込ですか？',
    helpText: '標準時間保育を希望する泉野地区在住者が他地区の保育園を希望する場合、または自宅から最も近い保育園が在住地区外にある場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_area_0', points: 0 },
      { label: 'はい（-3）', value: 'adj_outside_area_1', points: -3 },
    ],
  },
];

export const chinoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
