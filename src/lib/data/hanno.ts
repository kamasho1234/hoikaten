import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 飯能市 保育所(園)等利用調整基準データ
// 出典: 飯能市「令和7年度 保育所(園)等利用調整基準表」
// https://www.city.hanno.lg.jp/soshikikarasagasu/kodomoshienbu/hoikuka/2221.html
// ---------------------------------------------------------------------------
// 飯能市は「基準点数（父母それぞれ最大30点）＋ 調整点数」の加算方式。
// 合計基準点数最大60点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hanno',
  name: '飯能市',
  slug: 'hanno',
  prefecture: '埼玉県',
  maxBasePoints: 60,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上、8時間以上/月', value: `${prefix}_employment_30`, points: 30 },
  { label: '週5日以上、7時間以上/月', value: `${prefix}_employment_29`, points: 29 },
  { label: '週5日以上、6時間以上/月', value: `${prefix}_employment_28`, points: 28 },
  { label: '週5日以上、5時間以上/月', value: `${prefix}_employment_26`, points: 26 },
  { label: '週5日以上、4時間以上/月', value: `${prefix}_employment_25`, points: 25 },
  { label: '週4日以上、8時間以上/月', value: `${prefix}_employment_28b`, points: 28 },
  { label: '週4日以上、7時間以上/月', value: `${prefix}_employment_27`, points: 27 },
  { label: '週4日以上、6時間以上/月', value: `${prefix}_employment_26b`, points: 26 },
  { label: '週4日以上、5時間以上/月', value: `${prefix}_employment_25b`, points: 25 },
  { label: '週4日以上、4時間以上/月', value: `${prefix}_employment_24`, points: 24 },
  { label: '月64時間以上', value: `${prefix}_employment_20`, points: 20 },
];

const selfEmployedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_selfemployed_none`, points: 0 },
  { label: '月20日以上、8時間以上', value: `${prefix}_selfemployed_29`, points: 29 },
  { label: '月20日以上、7時間以上', value: `${prefix}_selfemployed_28`, points: 28 },
  { label: '月20日以上、6時間以上', value: `${prefix}_selfemployed_27`, points: 27 },
  { label: '月20日以上、5時間以上', value: `${prefix}_selfemployed_26`, points: 26 },
  { label: '月20日以上、4時間以上', value: `${prefix}_selfemployed_25`, points: 25 },
  { label: '月16日以上、8時間以上', value: `${prefix}_selfemployed_26b`, points: 26 },
  { label: '月16日以上、7時間以上', value: `${prefix}_selfemployed_25b`, points: 25 },
  { label: '月16日以上、6時間以上', value: `${prefix}_selfemployed_24`, points: 24 },
  { label: '月16日以上、5時間以上', value: `${prefix}_selfemployed_23`, points: 23 },
  { label: '月16日以上、4時間以上', value: `${prefix}_selfemployed_22`, points: 22 },
  { label: '月64時間以上（上記以外）', value: `${prefix}_selfemployed_19`, points: 19 },
];

const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piecework_none`, points: 0 },
  { label: '内職をしている', value: `${prefix}_piecework_16`, points: 16 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院/入院決定、常時病臥', value: `${prefix}_illness_30`, points: 30 },
  { label: '精神性・感染性・長期療養', value: `${prefix}_illness_27`, points: 27 },
  { label: '1ヶ月以上で週3日以上通院', value: `${prefix}_illness_25`, points: 25 },
  { label: '1ヶ月以上で週1-2日通院', value: `${prefix}_illness_23`, points: 23 },
  { label: 'その他、療養が必要', value: `${prefix}_illness_20`, points: 20 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級/精神1-2級/療育A,B', value: `${prefix}_disability_30`, points: 30 },
  { label: '身体3-4級/精神3級/療育C', value: `${prefix}_disability_26`, points: 26 },
  { label: '身体5級以下', value: `${prefix}_disability_24`, points: 24 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時臥床者の常時介護', value: `${prefix}_care_30`, points: 30 },
  { label: '常時観察と介護(食事等)', value: `${prefix}_care_28`, points: 28 },
  { label: '週5日以上施設付添', value: `${prefix}_care_27`, points: 27 },
  { label: '週4日以上施設付添', value: `${prefix}_care_26`, points: 26 },
  { label: 'その他の付添', value: `${prefix}_care_20`, points: 20 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定がある/出産後2ヶ月以内', value: `${prefix}_childbirth_21`, points: 21 },
];

const pregnancyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_pregnancy_none`, points: 0 },
  { label: '妊娠(切迫流産等)', value: `${prefix}_pregnancy_25`, points: 25 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '月64h未満で働き月64h以上希望', value: `${prefix}_jobseeking_18`, points: 18 },
  { label: 'ハローワーク登録等', value: `${prefix}_jobseeking_16`, points: 16 },
  { label: '求職開始予定', value: `${prefix}_jobseeking_15`, points: 15 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '公共職業訓練等', value: `${prefix}_education_24`, points: 24 },
  { label: 'その他の学校等', value: `${prefix}_education_23`, points: 23 },
  { label: '通信教育', value: `${prefix}_education_22`, points: 22 },
];

const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: 'DV被害', value: `${prefix}_dv_27`, points: 27 },
  { label: '児童虐待', value: `${prefix}_dv_30`, points: 30 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害被害', value: `${prefix}_disaster_29`, points: 29 },
];

const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parenatlleave_none`, points: 0 },
  { label: '育休(転園)', value: `${prefix}_parentalleave_15`, points: 15 },
];

const specialOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_special_none`, points: 0 },
  { label: '同居外親族看護介護', value: `${prefix}_special_25`, points: 25 },
  { label: '両親死亡/不明/拘禁', value: `${prefix}_special_28`, points: 28 },
  { label: '特別理由で別居', value: `${prefix}_special_28b`, points: 28 },
  { label: '通園通学付添', value: `${prefix}_special_22`, points: 22 },
  { label: 'その他特別事由', value: `${prefix}_special_14`, points: 14 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '飯能市では父母それぞれの基準点数（各最大30点）の合計で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '自営業(協力者)', value: `${prefix}_reason_selfemployed`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_piecework`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '妊娠(切迫流産等)', value: `${prefix}_reason_pregnancy`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: 'DV/児童虐待', value: `${prefix}_reason_dv`, points: 0 },
      { label: '災害被害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '育休(転園)', value: `${prefix}_reason_parentalleave`, points: 0 },
      { label: 'その他特別事由', value: `${prefix}_reason_special`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（週/時間当たり）は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_selfemployed`,
      category,
      label: `${parentLabel}の自営協力状況は？`,
      inputType: 'radio',
      options: selfEmployedOptions(prefix),
    },
    {
      id: `${prefix}_piecework`,
      category,
      label: `${parentLabel}の内職状況は？`,
      inputType: 'radio',
      options: pieceworkOptions(prefix),
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_pregnancy`,
      category,
      label: `${parentLabel}の妊娠状況は？`,
      inputType: 'radio',
      options: pregnancyOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の状況は？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害被害を受けていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_parentalleave`,
      category,
      label: `${parentLabel}は育休中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
    {
      id: `${prefix}_special`,
      category,
      label: `${parentLabel}の特別事由は？`,
      inputType: 'radio',
      options: specialOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent_none',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_none_no', points: 0 },
      { label: 'はい（同居親族なし）（+36）', value: 'adj_single_parent_none_yes', points: 36 },
      { label: 'はい（同居親族あり）（+34）', value: 'adj_single_parent_family_yes', points: 34 },
    ],
  },
  {
    id: 'adj_long_absence',
    category: 'adjustment',
    label: '保護者が長期不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_long_absence_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_long_absence_yes', points: 2 },
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
    id: 'adj_emergency',
    category: 'adjustment',
    label: '緊急入所が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_emergency_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_emergency_yes', points: 3 },
    ],
  },
  {
    id: 'adj_disability_childcare',
    category: 'adjustment',
    label: '障害児保育が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_childcare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_disability_childcare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_cooperation_facility_none',
    category: 'adjustment',
    label: '連携施設の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_cooperation_facility_none_no', points: 0 },
      { label: '連携施設なし卒園（+5）', value: 'adj_cooperation_facility_none_yes', points: 5 },
      { label: '連携施設卒園（希望せず）（+1）', value: 'adj_cooperation_facility_notdesired', points: 1 },
    ],
  },
  {
    id: 'adj_unautorized_childcare',
    category: 'adjustment',
    label: '認可外・一時預かりの利用状況は？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unautorized_childcare_no', points: 0 },
      { label: '週4日以上（+1）', value: 'adj_unautorized_childcare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave_extension',
    category: 'adjustment',
    label: '育休延長目的ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_extension_no', points: 0 },
      { label: 'はい（-100）', value: 'adj_parental_leave_extension_yes', points: -100 },
    ],
  },
  {
    id: 'adj_parental_leave_ongoing',
    category: 'adjustment',
    label: '育休中（児童1歳6ヶ月以上）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_ongoing_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_ongoing_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave_reentry',
    category: 'adjustment',
    label: '育休退所後の再入所（1年以上経過）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_reentry_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_parental_leave_reentry_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_transfer',
    category: 'adjustment',
    label: 'きょうだいの転園状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_transfer_no', points: 0 },
      { label: 'きょうだい別施設→同一転園（+6）', value: 'adj_sibling_transfer_yes', points: 6 },
      { label: 'きょうだい同一施設/同時申請（+1）', value: 'adj_sibling_same', points: 1 },
    ],
  },
  {
    id: 'adj_special_support',
    category: 'adjustment',
    label: '特別支援世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_support_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_special_support_yes', points: 5 },
    ],
  },
  {
    id: 'adj_facility_staff',
    category: 'adjustment',
    label: '市内保育施設勤務ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_facility_staff_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_facility_staff_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandfather_unemployed',
    category: 'adjustment',
    label: '同居祖父母（65歳未満で無職）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandfather_unemployed_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_grandfather_unemployed_yes', points: -3 },
    ],
  },
  {
    id: 'adj_outside_commissioned',
    category: 'adjustment',
    label: '管外受託ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_commissioned_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_outside_commissioned_yes', points: -10 },
    ],
  },
  {
    id: 'adj_welfare_office',
    category: 'adjustment',
    label: '福祉事務所長判断の要件がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_office_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_office_yes', points: 3 },
    ],
  },
];

export const hannoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
