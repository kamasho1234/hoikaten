import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 高島市 保育園入園 利用調整基準データ
// 出典: 高島市「令和8年度 入園のしおり」内「保育施設利用調整にかかる指数表（2号・3号認定）」
// https://www.city.takashima.lg.jp/material/files/group/122/R8nyuuennosiori.pdf
// ---------------------------------------------------------------------------
// 高島市は「基本区分（父母それぞれ）＋ 調整区分」の合計指数で調整順位を決める。
// 合計が同じ場合は優先区分（ひとり親・きょうだいの在園・父母の低いほうの指数など）
// で順位を決めるため、当サイトでは合計指数までを計算している。
// ---------------------------------------------------------------------------
// 「社会的養護」「その他市が定める事由」は内容により加点・減点を行うと書かれていて
// 点数が定められていないため、選択肢にしていない。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'takashima',
  name: '高島市',
  slug: 'takashima',
  prefecture: '滋賀県',
  maxBasePoints: 10,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・月20日以上かつ1日8時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '外勤・月20日以上かつ1日6時間以上', value: `${prefix}_employment_9`, points: 9 },
  { label: '外勤・月20日以上かつ1日4時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '外勤・月16日以上かつ1日8時間以上', value: `${prefix}_employment_9b`, points: 9 },
  { label: '外勤・月16日以上かつ1日6時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '外勤・月16日以上かつ1日4時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '自営業（中心者）・月20日以上かつ1日8時間以上', value: `${prefix}_self_10`, points: 10 },
  { label: '自営業（中心者）・月20日以上かつ1日6時間以上', value: `${prefix}_self_9`, points: 9 },
  { label: '自営業（中心者）・月20日以上かつ1日4時間以上', value: `${prefix}_self_7`, points: 7 },
  { label: '自営業（中心者）・月16日以上かつ1日8時間以上', value: `${prefix}_self_9b`, points: 9 },
  { label: '自営業（中心者）・月16日以上かつ1日6時間以上', value: `${prefix}_self_8`, points: 8 },
  { label: '自営業（中心者）・月16日以上かつ1日4時間以上', value: `${prefix}_self_6`, points: 6 },
  { label: '自営業（協力者）・月20日以上かつ1日8時間以上', value: `${prefix}_sub_9`, points: 9 },
  { label: '自営業（協力者）・月20日以上かつ1日6時間以上', value: `${prefix}_sub_8`, points: 8 },
  { label: '自営業（協力者）・月20日以上かつ1日4時間以上', value: `${prefix}_sub_6`, points: 6 },
  { label: '自営業（協力者）・月16日以上かつ1日8時間以上', value: `${prefix}_sub_8b`, points: 8 },
  { label: '自営業（協力者）・月16日以上かつ1日6時間以上', value: `${prefix}_sub_7`, points: 7 },
  { label: '自営業（協力者）・月16日以上かつ1日4時間以上', value: `${prefix}_sub_5`, points: 5 },
  { label: '自営業就労内定', value: `${prefix}_employment_3`, points: 3 },
  { label: '上記以外で保育の必要性がある場合（内職等を含む）', value: `${prefix}_employment_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・常時臥床・特定疾患・精神性（6か月以上の治療）', value: `${prefix}_illness_10`, points: 10 },
  { label: 'その他の疾病', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 療育A / 精神1・2級 / 要介護4・5', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3・4級 / 療育B / 精神3級 / 要介護3', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院・自宅で常時臥床の看護・介護・付き添い', value: `${prefix}_care_10`, points: 10 },
  { label: '身体1・2級 / 療育A / 要介護3以上の介護等', value: `${prefix}_care_10b`, points: 10 },
  { label: '週4日以上かつ1日4時間以上の看護・介護・付き添い', value: `${prefix}_care_6`, points: 6 },
  { label: '上記以外の看護・介護・付き添い', value: `${prefix}_care_4`, points: 4 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動・起業準備中（ひとり親世帯）', value: `${prefix}_jobseeking_10`, points: 10 },
  { label: '求職活動・起業準備中', value: `${prefix}_jobseeking_3`, points: 3 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '学校や職業訓練校などに通っている', value: `${prefix}_school_8`, points: 8 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '高島市は父母それぞれの基本区分の指数に、世帯の調整区分を足した合計指数で調整順位を決めます',
    inputType: 'select',
    options: [
      { label: '就労している', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居の親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}の就労の状況は？`, inputType: 'radio', options: employmentOptions(prefix) },
    { id: `${prefix}_childbirth`, category, label: `${parentLabel}の妊娠・出産の状況は？`, inputType: 'radio', options: childbirthOptions(prefix) },
    { id: `${prefix}_illness`, category, label: `${parentLabel}の疾病の状況は？`, inputType: 'radio', options: illnessOptions(prefix) },
    { id: `${prefix}_disability`, category, label: `${parentLabel}の障がいの程度は？`, inputType: 'radio', options: disabilityOptions(prefix) },
    { id: `${prefix}_care`, category, label: `${parentLabel}の介護・看護の状況は？`, inputType: 'radio', options: careOptions(prefix) },
    { id: `${prefix}_disaster`, category, label: `${parentLabel}は災害復旧にあたっていますか？`, inputType: 'radio', options: disasterOptions(prefix) },
    { id: `${prefix}_jobseeking`, category, label: `${parentLabel}の求職活動の状況は？`, inputType: 'radio', options: jobSeekingOptions(prefix) },
    { id: `${prefix}_school`, category, label: `${parentLabel}の就学の状況は？`, inputType: 'radio', options: schoolOptions(prefix) },
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
      { label: '祖父母と別居している（+16）', value: 'adj_single_parent_alone', points: 16 },
      { label: '祖父母と同居している（世帯分離を含む）（+15）', value: 'adj_single_parent_with', points: 15 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？（就労による自立支援につながる場合等）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '主たる生計維持者の失業により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_unemployed_yes', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '子どもが障がいを有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業を取得しており、復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが在園している施設を第一希望にしますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_none', points: 0 },
      { label: '未就学児3人以上の世帯（+6）', value: 'adj_sibling_enrolled_3', points: 6 },
      { label: '未就学児2人以上の世帯・核家族（+5）', value: 'adj_sibling_enrolled_2', points: 5 },
      { label: '未就学児2人以上の世帯・祖父母等と同居（+4）', value: 'adj_sibling_enrolled_2b', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_together',
    category: 'adjustment',
    label: 'きょうだいが同じ月に同一の施設を新規に利用希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_together_none', points: 0 },
      { label: '未就学児3人以上の世帯（+3）', value: 'adj_sibling_together_3', points: 3 },
      { label: '未就学児2人以上の世帯・核家族（+2）', value: 'adj_sibling_together_2', points: 2 },
      { label: '未就学児2人以上の世帯・祖父母等と同居（+1）', value: 'adj_sibling_together_2b', points: 1 },
    ],
  },
  {
    id: 'adj_both_working',
    category: 'adjustment',
    label: '未就学児1人の世帯で、申込時点において両親が既に就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_both_working_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_both_working_yes', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が県内の認定こども園等で就労している（予定を含む）保育士ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_hoikushi_yes', points: 15 },
    ],
  },
  {
    id: 'adj_kaigo',
    category: 'adjustment',
    label: '保護者が市内の介護サービス事業所等の正規介護職員ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kaigo_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_kaigo_yes', points: 5 },
    ],
  },
  {
    id: 'adj_kangoshi',
    category: 'adjustment',
    label: '保護者が市内の病院等の正規看護師ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kangoshi_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_kangoshi_yes', points: 5 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業の卒園児童ですか？（2歳児クラスのみ対象）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_graduate_none', points: 0 },
      { label: '連携施設を第一希望にする（+10）', value: 'adj_graduate_renkei', points: 10 },
      { label: '連携施設以外を第一希望にする（+3）', value: 'adj_graduate_other', points: 3 },
    ],
  },
  {
    id: 'adj_family_care',
    category: 'adjustment',
    label: '申込児童以外の就学前児童を、保護者または祖父母等の親族が保育しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_care_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_family_care_yes', points: -5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同一学区内に保育可能な65歳未満の祖父母等の親族がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望する施設に入所できない場合、育児休業の延長も許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_leave_extension_yes', points: -10 },
    ],
  },
];

export const takashimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
