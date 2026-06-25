import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 伊勢原市 利用調整点数表（令和8年4月入所調整～適用）
// 出典: 伊勢原市利用調整点数表
// https://www.city.isehara.kanagawa.jp/docs/2020102700019/file_contents/R8sisuuhyou.pdf
// ---------------------------------------------------------------------------
// sum方式（父母それぞれの点数を算出し集計）。最大20点/親（合計40点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'isehara',
  name: '伊勢原市',
  slug: 'isehara',
  prefecture: '神奈川県',
  maxBasePoints: 40,
} as const;

const outsideEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_none`, points: 0 },
  { label: '月20日以上・1日8時間以上（20点）', value: `${prefix}_outside_20`, points: 20 },
  { label: '月20日以上・1日7時間以上（19点）', value: `${prefix}_outside_19`, points: 19 },
  { label: '月20日以上・1日6時間以上 又は 月16日以上・1日8時間以上（18点）', value: `${prefix}_outside_18`, points: 18 },
  { label: '月20日以上・1日5時間以上 又は 月16日以上・1日7時間以上（17点）', value: `${prefix}_outside_17`, points: 17 },
  { label: '月16日以上・1日6時間以上 又は 月12日以上・1日8時間以上（16点）', value: `${prefix}_outside_16`, points: 16 },
  { label: '月16日以上・1日5時間以上 又は 月12日以上・1日7時間以上（15点）', value: `${prefix}_outside_15`, points: 15 },
  { label: '月16日以上・1日5時間未満 又は 月12日以上・1日6時間以上（14点）', value: `${prefix}_outside_14`, points: 14 },
  { label: '月12日以上・1日6時間未満（13点）', value: `${prefix}_outside_13`, points: 13 },
  { label: '月8日以上・1日8時間以上（12点）', value: `${prefix}_outside_12`, points: 12 },
];

const homeEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '月20日以上・1日8時間以上（19点）', value: `${prefix}_home_19`, points: 19 },
  { label: '月20日以上・1日7時間以上（18点）', value: `${prefix}_home_18`, points: 18 },
  { label: '月20日以上・1日6時間以上 又は 月16日以上・1日8時間以上（17点）', value: `${prefix}_home_17`, points: 17 },
  { label: '月20日以上・1日5時間以上 又は 月16日以上・1日7時間以上（16点）', value: `${prefix}_home_16`, points: 16 },
  { label: '月16日以上・1日6時間以上 又は 月12日以上・1日8時間以上（15点）', value: `${prefix}_home_15`, points: 15 },
  { label: '月16日以上・1日5時間以上 又は 月12日以上・1日7時間以上（14点）', value: `${prefix}_home_14`, points: 14 },
  { label: '月16日以上・1日5時間未満 又は 月12日以上・1日6時間以上（13点）', value: `${prefix}_home_13`, points: 13 },
  { label: '月12日以上・1日6時間未満（12点）', value: `${prefix}_home_12`, points: 12 },
  { label: '月8日以上・1日8時間以上（11点）', value: `${prefix}_home_11`, points: 11 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後8週間の期間（16点）', value: `${prefix}_childbirth_16`, points: 16 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上の入院・寝たきり（20点）', value: `${prefix}_illness_20`, points: 20 },
  { label: '常に安静を要し常時保育困難（18点）', value: `${prefix}_illness_18`, points: 18 },
  { label: '疾病等により保育困難（16点）', value: `${prefix}_illness_16`, points: 16 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級 / 精神1-2級 / 療育A（20点）', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体3級 / 精神3級 / 療育B（18点）', value: `${prefix}_disability_18`, points: 18 },
  { label: 'その他保育困難な障害（16点）', value: `${prefix}_disability_16`, points: 16 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護3-5 / 重度身体障害者の介護（18点）', value: `${prefix}_care_18`, points: 18 },
  { label: '要介護1-2 / 中度身体障害者の介護（14点）', value: `${prefix}_care_14`, points: 14 },
  { label: '要支援の方の介護・看護（10点）', value: `${prefix}_care_10`, points: 10 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上の就学（18点）', value: `${prefix}_education_18`, points: 18 },
  { label: '月64時間以上120時間未満の就学（14点）', value: `${prefix}_education_14`, points: 14 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に従事（20点）', value: `${prefix}_disaster_20`, points: 20 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中・就労予定（5点）', value: `${prefix}_jobseeking_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '伊勢原市では父母それぞれの点数を合算します（各最大20点、合計40点）。複数事由は高い方を採用',
    inputType: 'select',
    options: [
      { label: '居宅外で仕事をしている', value: `${prefix}_reason_outside`, points: 0 },
      { label: '自宅で仕事をしている（居宅内就労）', value: `${prefix}_reason_home`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_naishoku`, points: 0 },
      { label: '病気・けがの治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      ...(parentNum === 2 ? [{ label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 }] : []),
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動中・就労予定', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside_employment`,
      category,
      label: `${parentLabel}の居宅外就労の状況は？`,
      helpText: '月の勤務日数と1日の勤務時間で点数が決まります',
      inputType: 'radio',
      options: outsideEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_home_employment`,
      category,
      label: `${parentLabel}の居宅内就労の状況は？`,
      helpText: '自宅またはそれに準ずる場所で勤務する場合',
      inputType: 'radio',
      options: homeEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_naishoku`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_naishoku_none`, points: 0 },
        { label: '月64時間以上の内職（8点）', value: `${prefix}_naishoku_8`, points: 8 },
      ],
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
      label: `${parentLabel}の介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    ...(parentNum === 2 ? [{
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio' as const,
      options: childbirthOptions(prefix),
    }] : []),
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に従事していますか？`,
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
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給している世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '同居の保育可能な65歳未満の祖父母の有無で点数が変わります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: '6ヶ月以内の死別によるひとり親（+5）', value: 'adj_single_parent_bereaved', points: 5 },
      { label: 'ひとり親（保育可能な祖父母不在、+5）', value: 'adj_single_parent_no_gp', points: 5 },
      { label: 'ひとり親（保育可能な祖父母同居、+3）', value: 'adj_single_parent_with_gp', points: 3 },
    ],
  },
  {
    id: 'adj_cohabitant_unemployed',
    category: 'adjustment',
    label: '65歳未満の同居者が最低就労以下・求職中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cohabitant_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_cohabitant_yes', points: -3 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '保護者が単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: '国内（+3）', value: 'adj_single_assignment_domestic', points: 3 },
      { label: '国外（+5）', value: 'adj_single_assignment_overseas', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が市内の保育施設で保育士・幼稚園教諭として就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '月120時間以上（+5）', value: 'adj_nursery_worker_120', points: 5 },
      { label: '月120時間未満（+3）', value: 'adj_nursery_worker_under120', points: 3 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計の中心者が失業中で就業の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_unemployed_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが在園する施設に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_yes', points: 5 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: '複数の児童を同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_small_graduation',
    category: 'adjustment',
    label: '小規模保育施設を卒園予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_graduation_no', points: 0 },
      { label: '連携施設を第1希望にしている（+5）', value: 'adj_small_graduation_partner', points: 5 },
      { label: '連携施設以外を第1希望（+3）', value: 'adj_small_graduation_other', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '認可外保育施設等を利用している実態がありますか？',
    helpText: '職場同伴（危険を伴う）での就労、又は基準点数表の事由で認可外を利用中',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_unlicensed_yes', points: 2 },
    ],
  },
  {
    id: 'adj_decline',
    category: 'adjustment',
    label: '過去1年以内に内定を辞退しましたか？',
    helpText: '保護者の病気等やむを得ない場合を除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_decline_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_decline_yes', points: -5 },
    ],
  },
];

export const iseharaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
