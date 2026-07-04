import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 鈴鹿市 保育園入園 基本指数・調整指数データ
// 出典: 鈴鹿市「保育所（園）・認定こども園利用選考基準表」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'suzuka',
  name: '鈴鹿市',
  slug: 'suzuka',
  prefecture: '三重県',
  maxBasePoints: 210, // 父母各105点（屋宅外就労180時間以上）
} as const;

/** 屋宅外就労（育休復帰含む） */
const outerEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outer_none`, points: 0 },
  { label: '月180時間以上', value: `${prefix}_outer_180`, points: 105 },
  { label: '月170時間以上180時間未満', value: `${prefix}_outer_170`, points: 100 },
  { label: '月160時間以上170時間未満', value: `${prefix}_outer_160`, points: 95 },
  { label: '月150時間以上160時間未満', value: `${prefix}_outer_150`, points: 90 },
  { label: '月130時間以上150時間未満', value: `${prefix}_outer_130`, points: 80 },
  { label: '月120時間以上130時間未満', value: `${prefix}_outer_120`, points: 70 },
  { label: '月100時間以上120時間未満', value: `${prefix}_outer_100`, points: 60 },
  { label: '月80時間以上100時間未満', value: `${prefix}_outer_80`, points: 50 },
  { label: '月60時間以上80時間未満', value: `${prefix}_outer_60`, points: 40 },
];

/** 屋宅内就労（育休復帰含む） */
const innerEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_inner_none`, points: 0 },
  { label: '月180時間以上', value: `${prefix}_inner_180`, points: 95 },
  { label: '月170時間以上180時間未満', value: `${prefix}_inner_170`, points: 90 },
  { label: '月160時間以上170時間未満', value: `${prefix}_inner_160`, points: 85 },
  { label: '月150時間以上160時間未満', value: `${prefix}_inner_150`, points: 80 },
  { label: '月130時間以上150時間未満', value: `${prefix}_inner_130`, points: 70 },
  { label: '月120時間以上130時間未満', value: `${prefix}_inner_120`, points: 60 },
  { label: '月100時間以上120時間未満', value: `${prefix}_inner_100`, points: 50 },
  { label: '月80時間以上100時間未満', value: `${prefix}_inner_80`, points: 40 },
  { label: '月60時間以上80時間未満', value: `${prefix}_inner_60`, points: 30 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  return [
    {
      id: `${prefix}_reason`,
      category,
      label: `${parentLabel}：保育が必要な理由`,
      helpText: 'いちばん近いものをひとつ選んでください',
      inputType: 'select',
      options: [
        { label: '屋宅外で就労している（通勤・育休復帰含む）', value: `${prefix}_reason_outer_employment`, points: 0 },
        { label: '屋宅内で就労している（在宅・育休復帰含む）', value: `${prefix}_reason_inner_employment`, points: 0 },
        { label: '内職', value: `${prefix}_reason_piecework`, points: 0 },
        { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
        { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
        { label: '心身障がい', value: `${prefix}_reason_disability`, points: 0 },
        { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
        { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
        { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
        { label: '学校等への通学', value: `${prefix}_reason_education`, points: 0 },
      ],
    },
    {
      id: `${prefix}_outer_employment`,
      category,
      label: `${parentLabel}の屋宅外就労時間（月）は？`,
      inputType: 'radio',
      options: outerEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_inner_employment`,
      category,
      label: `${parentLabel}の屋宅内就労時間（月）は？`,
      inputType: 'radio',
      options: innerEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_piecework`,
      category,
      label: `${parentLabel}：内職の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_piecework_none`, points: 0 },
        { label: '内職（月60時間以上）', value: `${prefix}_piecework_yes`, points: 20 },
      ],
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}：出産予定はありますか？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
        { label: '出産月の2か月前〜出産日の8週間後まで', value: `${prefix}_childbirth_yes`, points: 100 },
      ],
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
        { label: '入院（概ね1か月以上）', value: `${prefix}_illness_100`, points: 100 },
        { label: '常時病臥（疾病により自宅で寝たきり）', value: `${prefix}_illness_50a`, points: 50 },
        { label: '精神性・感染症疾患', value: `${prefix}_illness_50b`, points: 50 },
        { label: '一般療養（上記以外）', value: `${prefix}_illness_30`, points: 30 },
      ],
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
        { label: '身体1級・精神1級・療育手帳A', value: `${prefix}_disability_100`, points: 100 },
        { label: '身体2級', value: `${prefix}_disability_80`, points: 80 },
        { label: '身体3・4級 / 精神2級 / 療育手帳B', value: `${prefix}_disability_50`, points: 50 },
        { label: '上記以外の障がい', value: `${prefix}_disability_30`, points: 30 },
      ],
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
        { label: '病院等付添：月120時間以上', value: `${prefix}_care_50a`, points: 50 },
        { label: '病院等付添：月60時間以上120時間未満', value: `${prefix}_care_30a`, points: 30 },
        { label: '在宅看護：常時看護・介護が必要', value: `${prefix}_care_50b`, points: 50 },
        { label: '在宅看護：日常生活に日常的に介護・介護が必要', value: `${prefix}_care_30b`, points: 30 },
      ],
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧のため保育できない状況ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（火災等による家屋損傷・その他災害復旧）', value: `${prefix}_disaster_yes`, points: 100 },
      ],
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
        { label: '就労内定（月120時間以上）', value: `${prefix}_jobseeking_50`, points: 50 },
        { label: '就労内定（月120時間未満）', value: `${prefix}_jobseeking_40`, points: 40 },
        { label: '求職中（月60時間未満→時間を増やす予定）', value: `${prefix}_jobseeking_20`, points: 20 },
        { label: '求職中（昼間外出が常態）', value: `${prefix}_jobseeking_10`, points: 10 },
      ],
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}：就学・技能習得のため通学していますか？`,
      helpText: '類型番号1（屋宅外就労）と同じ時間区分を適用します',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
        { label: '月180時間以上', value: `${prefix}_education_105`, points: 105 },
        { label: '月170時間以上180時間未満', value: `${prefix}_education_100`, points: 100 },
        { label: '月160時間以上170時間未満', value: `${prefix}_education_95`, points: 95 },
        { label: '月150時間以上160時間未満', value: `${prefix}_education_90`, points: 90 },
        { label: '月130時間以上150時間未満', value: `${prefix}_education_80`, points: 80 },
        { label: '月120時間以上130時間未満', value: `${prefix}_education_70`, points: 70 },
        { label: '月100時間以上120時間未満', value: `${prefix}_education_60`, points: 60 },
        { label: '月80時間以上100時間未満', value: `${prefix}_education_50`, points: 50 },
        { label: '月60時間以上80時間未満', value: `${prefix}_education_40`, points: 40 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '父母のどちらかがいない場合（死亡・離別・行方不明）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 120 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 50 },
    ],
  },
  {
    id: 'adj_no_parents',
    category: 'adjustment',
    label: '父母がいない世帯ですか？',
    helpText: '主たる保育者が祖父母等の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_parents_no', points: 0 },
      { label: 'はい', value: 'adj_no_parents_yes', points: 50 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: '虐待・DVのおそれがありますか？',
    helpText: '社会的養護が必要な場合等',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_no', points: 0 },
      { label: 'はい', value: 'adj_dv_yes', points: 30 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休から復帰する予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの利用状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだいが希望施設に在園している', value: 'adj_sibling_enrolled', points: 50 },
      { label: 'きょうだいと同時に利用希望', value: 'adj_sibling_simultaneous', points: 10 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '申込児を含め小学3年生以下の子どもが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unauthorized_care',
    category: 'adjustment',
    label: '認可外保育施設に継続利用中ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_unauthorized_care_none', points: 0 },
      { label: '6か月以上継続利用中', value: 'adj_unauthorized_care_6m', points: 10 },
      { label: '3か月以上6か月未満継続利用中', value: 'adj_unauthorized_care_3m', points: 5 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業しましたか？',
    helpText: '会社の倒産等（自己都合除く）、速やかに就労が必要と認められる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 20 },
    ],
  },
  {
    id: 'adj_grandparent_young',
    category: 'adjustment',
    label: '60歳未満の祖父母が昼間に自宅にいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_young_no', points: 0 },
      { label: '60歳以上65歳未満の祖父母が昼間居宅内にいる', value: 'adj_grandparent_young_65', points: -20 },
      { label: '60歳未満の祖父母が昼間居宅内にいる', value: 'adj_grandparent_young_60', points: -30 },
    ],
  },
  {
    id: 'adj_same_premises',
    category: 'adjustment',
    label: '仕事場と居宅が同じ敷地内ですか？',
    helpText: '屋宅外就労の場合に適用',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_same_premises_no', points: 0 },
      { label: 'はい（仕事場と居宅が同じ敷地内）', value: 'adj_same_premises_yes', points: -10 },
    ],
  },
];

export const suzukaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
