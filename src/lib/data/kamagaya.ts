import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 鎌ケ谷市 保育園入園 利用調整基準データ
// 出典: 鎌ケ谷市「令和7年度 利用調整基準」
// https://www1.g-reiki.net/city.kamagaya/reiki_honbun/g025RG00000341.html
// ---------------------------------------------------------------------------
// 鎌ケ谷市は「基準指数（父母それぞれ最大20点）＋ 調整指数」の加算方式。
// 保護者が2人いる場合はそれぞれの基準指数を合算（最大40点）。
// ひとり親世帯の場合は基準指数に20点を加算。
// 保護者の状況が複数項目に該当する場合は、最も高い基準指数を適用（合算しない）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kamagaya',
  name: '鎌ケ谷市',
  slug: 'kamagaya',
  prefecture: '千葉県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_15`, points: 15 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上', value: `${prefix}_illness_20`, points: 20 },
  { label: '自宅療養（介助が常時必要）', value: `${prefix}_illness_18`, points: 18 },
  { label: '自宅療養（介助が部分的に必要）', value: `${prefix}_illness_14`, points: 14 },
  { label: 'その他治療が必要', value: `${prefix}_illness_10`, points: 10 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 精神1・2級 / 療育A', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体3〜6級 / 精神3級 / 療育B', value: `${prefix}_disability_16`, points: 16 },
  { label: 'その他の障害', value: `${prefix}_disability_10`, points: 10 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '付添1か月以上 / 介助が常時必要な介護', value: `${prefix}_care_18`, points: 18 },
  { label: '週3日以上の送迎介助が1か月以上 / 介助が部分的に必要な介護', value: `${prefix}_care_14`, points: 14 },
  { label: 'その他の支援が必要', value: `${prefix}_care_10`, points: 10 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の2か月前〜出産後2か月', value: `${prefix}_childbirth_18`, points: 18 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月64時間以上80時間未満の教育中', value: `${prefix}_education_13`, points: 13 },
  { label: '月80時間以上100時間未満の教育中', value: `${prefix}_education_15`, points: 15 },
  { label: '月100時間以上120時間未満の教育中', value: `${prefix}_education_16`, points: 16 },
  { label: '月120時間以上140時間未満の教育中', value: `${prefix}_education_17`, points: 17 },
  { label: '月140時間以上160時間未満の教育中', value: `${prefix}_education_18`, points: 18 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '月64時間以上の求職活動中', value: `${prefix}_jobseeking_8`, points: 8 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害により保育が必要', value: `${prefix}_disaster_20`, points: 20 },
];

const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '児童虐待やDV被害により保育が必要', value: `${prefix}_abuse_20`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '鎌ケ谷市では父母それぞれの基準指数（各最大20点）を合算して選考されます。複数の理由に該当する場合は、最も高い指数が適用されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている（パート・アルバイト含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害により保育が必要', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '児童虐待やDV被害', value: `${prefix}_reason_abuse`, points: 0 },
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
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動時間（月あたり）は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
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
      label: `${parentLabel}の介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}が学校に通う場合、月あたりの時間は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}が災害の影響を受けていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}が児童虐待やDVの被害を受けていますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
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
      { label: 'はい（基準指数+20、調整指数+3）', value: 'adj_single_parent_yes', points: 23 },
    ],
  },
  {
    id: 'adj_single_like',
    category: 'adjustment',
    label: 'ひとり親に準ずる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_single_like_no', points: 0 },
      { label: 'はい（基準指数+17、調整指数+2）', value: 'adj_single_like_yes', points: 19 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: 'ひとり親の配偶者がいない独身者の世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_assignment_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが認可保育施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい、同じ施設を希望（+4）', value: 'adj_sibling_same_yes', points: 4 },
      { label: 'はい、別の施設に在園（+3）', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_siblings_multiple',
    category: 'adjustment',
    label: '申込児童のきょうだいが2人以上（未入園）いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_multiple_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_siblings_multiple_yes', points: 1 },
    ],
  },
  {
    id: 'adj_twin_multiple',
    category: 'adjustment',
    label: '双子・三つ子等の多胎児が同時に申し込みしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twin_multiple_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_twin_multiple_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unlicensed_facility',
    category: 'adjustment',
    label: '認可外施設を月64時間以上利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unlicensed_yes', points: 3 },
    ],
  },
  {
    id: 'adj_family_care_exit',
    category: 'adjustment',
    label: '家庭保育者（保育ママ）の契約を終了しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_care_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_family_care_yes', points: 6 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい、復帰が確定（+3）', value: 'adj_parental_leave_confirmed', points: 3 },
      { label: 'はい、復帰予定（+2）', value: 'adj_parental_leave_planned', points: 2 },
    ],
  },
  {
    id: 'adj_municipal_transfer',
    category: 'adjustment',
    label: '市内の他施設から転園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_municipal_transfer_no', points: 0 },
      { label: 'はい、月64時間以上利用していた（+3）', value: 'adj_municipal_transfer_yes', points: 3 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '申込児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_disabled_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_educator_employed',
    category: 'adjustment',
    label: '保護者が市内の教育機関に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_educator_no', points: 0 },
      { label: 'はい、月140時間以上（+6）', value: 'adj_educator_140', points: 6 },
      { label: 'はい、月64時間以上140時間未満（+3）', value: 'adj_educator_64', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_fee_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい、6か月以上（-5）', value: 'adj_fee_delinquent_yes', points: -5 },
    ],
  },
  {
    id: 'adj_unjustified_withdrawal',
    category: 'adjustment',
    label: '以前に不当な理由で退園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_withdrawal_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_withdrawal_yes', points: -5 },
    ],
  },
];

export const kamagayaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
