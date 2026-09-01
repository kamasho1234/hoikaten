import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 大田原市 保育園入園 利用調整基準データ
// 出典: 大田原市「大田原市保育の実施基準指数表」(PDF)
// https://www.city.ohtawara.tochigi.jp/docs/2017082900010/
// ---------------------------------------------------------------------------
// 大田原市は「指数1（保育を必要とする事由・父母それぞれ最大10点）＋
// 指数2（優先事由）」の合計で選考する。
// 指数1は事由のうち一番点数の高いもの1つだけを採用する。
// 指数表では出産（10点）が母の欄にだけ書かれているが、当サイトは保護者1・保護者2を
// 性別で分けていないため、どちらの保護者でも選べるようにしている。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ohtawara',
  name: '大田原市',
  slug: 'ohtawara',
  prefecture: '栃木県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上150時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_5`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（概ね1か月以上）', value: `${prefix}_illness_10`, points: 10 },
  { label: '重篤で一日の大部分をベッド上で過ごす', value: `${prefix}_illness_10b`, points: 10 },
  { label: '病状・服薬等で日常生活を中断し療養が必要', value: `${prefix}_illness_7`, points: 7 },
  { label: '症状が軽易で日常生活に支障がない', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1級・2級', value: `${prefix}_disability_10`, points: 10 },
  { label: '療育手帳A1・A2 / 精神障害者保健福祉手帳1級', value: `${prefix}_disability_10b`, points: 10 },
  { label: '療育手帳B1または精神2級で、かつ身体3級・4級', value: `${prefix}_disability_9`, points: 9 },
  { label: '精神障害者保健福祉手帳2級', value: `${prefix}_disability_8`, points: 8 },
  { label: '療育手帳B1 / 身体障害者手帳3級・4級', value: `${prefix}_disability_6`, points: 6 },
  { label: '療育手帳B2 / 精神3級 / 身体5級・6級', value: `${prefix}_disability_4`, points: 4 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時寝たきりの同居親族の看護・介護', value: `${prefix}_care_10`, points: 10 },
  { label: '要介護5・4・3の同居親族の介護', value: `${prefix}_care_10b`, points: 10 },
  { label: 'その他の同居親族の看護・介護', value: `${prefix}_care_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日から産前2か月・産後2か月', value: `${prefix}_childbirth_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（認定日から90日以内）', value: `${prefix}_jobseeking_3`, points: 3 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '在学・職業訓練（就労の時間区分に準じる・月150時間以上相当）', value: `${prefix}_school_10`, points: 10 },
  { label: '在学・職業訓練（月120時間以上150時間未満相当）', value: `${prefix}_school_8`, points: 8 },
  { label: '在学・職業訓練（月64時間以上120時間未満相当）', value: `${prefix}_school_5`, points: 5 },
  { label: '通信教育を受けている', value: `${prefix}_school_4`, points: 4 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・水害等で家屋が失われ復旧にあたる', value: `${prefix}_disaster_10`, points: 10 },
];

// 虐待・DVのおそれ（20点）は指数表で父母の欄が分かれておらず、世帯に1回だけ加算される。
// 父母それぞれの質問に置くと二重に足されてしまうため、下の世帯の質問にまとめている
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '父母の離別・死別・行方不明・拘禁等', value: `${prefix}_other_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText:
      '大田原市の指数1は、あてはまる事由のうち一番点数の高いもの1つだけを採用します（父母それぞれ最大10点）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_school`, points: 0 },
      { label: 'その他（虐待・DV・離別など）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
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
      label: `${parentLabel}の看護・介護の状況は？`,
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
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
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
    id: 'adj_abuse_base',
    category: 'adjustment',
    label: '虐待やDVのおそれがありますか？（指数1で+20）',
    helpText: '指数表では指数1の事由ですが、父母の別なく世帯に1回だけ加算されるため、ここでまとめて聞いています',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_base_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_abuse_base_yes', points: 20 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（離婚調停中を含む）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_single_parent_yes', points: 4 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で就労が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待やDV等により社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_social_care_yes', points: 10 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '入所月の翌月末までに育児休業から復帰しますか？（3月入所は3月末復帰）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_parental_leave_yes', points: 3 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士・幼稚園教諭として市内の施設に就労（内定）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_hoikushi_yes', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請児童に障害があり、優先的に集団保育が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育施設等の卒園児童が、連携施設以外の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_graduate_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '企業内託児施設または認可外保育施設で保育中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unlicensed_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？（点数の高い方だけが加算されます）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: '兄弟姉妹が保育所・認定こども園・地域型保育を利用中（+5）', value: 'adj_sibling_enrolled', points: 5 },
      { label: '兄弟姉妹が同一年度での入所を希望（+4）', value: 'adj_sibling_same_year', points: 4 },
      { label: '兄弟姉妹が同一年度での入所を希望・多胎児（+6）', value: 'adj_sibling_twins', points: 6 },
    ],
  },
  {
    id: 'adj_family_home',
    category: 'adjustment',
    label: '同居の親族が就労しておらず、家庭で保育できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_home_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_family_home_yes', points: -3 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '在園児（卒園児）の保育料に未納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: '市や施設に相談なく未納がある（-10）', value: 'adj_fee_delinquent_nocontact', points: -10 },
      { label: 'それ以外の未納がある（-7）', value: 'adj_fee_delinquent_yes', points: -7 },
    ],
  },
  {
    id: 'adj_decline',
    category: 'adjustment',
    label: '申請年度内に、正当な理由なく内定を辞退しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_decline_no', points: 0 },
      { label: 'はい（-4）', value: 'adj_decline_yes', points: -4 },
    ],
  },
];

export const ohtawaraData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
