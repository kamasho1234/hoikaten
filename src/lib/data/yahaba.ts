import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 矢巾町 子どものための教育・保育給付認定等事務要綱データ
// 出典: 矢巾町子どものための教育・保育給付認定等事務要綱（別表第1 基本点数表、別表第2 調整点数表）
// https://www.town.yahaba.iwate.jp/contents/18reiki/reiki_honbun/r800RG00000865.html
// ---------------------------------------------------------------------------
// sum方式（父母各自の基本点数を合算）。最高点100点スケール。
// 居宅外就労：月20日×8時間以上=100点（最高）。居宅内・自営農業は各段階で10点低い。
// ひとり親の場合は「その親の基本点数+100点」が基本点数（要綱備考2(3)）。
// シミュレーター上では、ひとり親選択時に調整指数として+130点（+100点補填+30点加算）を付与。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yahaba',
  name: '矢巾町',
  slug: 'yahaba',
  prefecture: '岩手県',
  maxBasePoints: 100,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_none`, points: 0 },
  // 居宅外就労（外勤・居宅外での就労）
  { label: '居宅外就労：月20日以上×1日8時間以上（100点）', value: `${prefix}_emp_ext_100`, points: 100 },
  { label: '居宅外就労：月20日以上×1日7時間以上（90点）', value: `${prefix}_emp_ext_90`, points: 90 },
  { label: '居宅外就労：月20日以上×1日6時間以上（80点）', value: `${prefix}_emp_ext_80`, points: 80 },
  { label: '居宅外就労：月20日以上×1日5時間以上（70点）', value: `${prefix}_emp_ext_70`, points: 70 },
  { label: '居宅外就労：月20日以上×1日4時間以上（60点）', value: `${prefix}_emp_ext_60`, points: 60 },
  { label: '居宅外就労：月15日以上×1日8時間以上（80点）', value: `${prefix}_emp_ext_15_80`, points: 80 },
  { label: '居宅外就労：月15日以上×1日7時間以上（75点）', value: `${prefix}_emp_ext_15_75`, points: 75 },
  { label: '居宅外就労：月15日以上×1日6時間以上（65点）', value: `${prefix}_emp_ext_15_65`, points: 65 },
  { label: '居宅外就労：月15日以上×1日5時間以上（55点）', value: `${prefix}_emp_ext_15_55`, points: 55 },
  { label: '居宅外就労：月15日以上×1日4時間以上（50点）', value: `${prefix}_emp_ext_15_50`, points: 50 },
  { label: '居宅外就労：月48時間以上（上記以外）（40点）', value: `${prefix}_emp_ext_40`, points: 40 },
  // 居宅内就労・自営農業
  { label: '居宅内就労・自営農業：月20日以上×1日8時間以上（90点）', value: `${prefix}_emp_in_90`, points: 90 },
  { label: '居宅内就労・自営農業：月20日以上×1日7時間以上（80点）', value: `${prefix}_emp_in_80`, points: 80 },
  { label: '居宅内就労・自営農業：月20日以上×1日6時間以上（70点）', value: `${prefix}_emp_in_70`, points: 70 },
  { label: '居宅内就労・自営農業：月20日以上×1日5時間以上（60点）', value: `${prefix}_emp_in_60`, points: 60 },
  { label: '居宅内就労・自営農業：月20日以上×1日4時間以上（50点）', value: `${prefix}_emp_in_50`, points: 50 },
  { label: '居宅内就労・自営農業：月15日以上×1日8時間以上（70点）', value: `${prefix}_emp_in_15_70`, points: 70 },
  { label: '居宅内就労・自営農業：月15日以上×1日7時間以上（65点）', value: `${prefix}_emp_in_15_65`, points: 65 },
  { label: '居宅内就労・自営農業：月15日以上×1日6時間以上（55点）', value: `${prefix}_emp_in_15_55`, points: 55 },
  { label: '居宅内就労・自営農業：月15日以上×1日5時間以上（45点）', value: `${prefix}_emp_in_15_45`, points: 45 },
  { label: '居宅内就労・自営農業：月15日以上×1日4時間以上（40点）', value: `${prefix}_emp_in_15_40`, points: 40 },
  { label: '居宅内就労・自営農業：月48時間以上（上記以外）（30点）', value: `${prefix}_emp_in_30`, points: 30 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1（父）' : '保護者2（母）';

  const questions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}：就労形態と月間就労日数・時間は？`,
      helpText: '居宅外（会社勤め等）は各段階10点高く、居宅内・自営農業は10点低くなります',
      inputType: 'select',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}：疾病・障がいの状況は？`,
      helpText: '疾病と障がいを合わせて最も当てはまる区分を選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
        { label: '入院中または常時病臥（1か月以上）（100点）', value: `${prefix}_ill_100`, points: 100 },
        { label: '身体障害1・2級/精神障害1・2級/療育手帳A（100点）', value: `${prefix}_ill_100b`, points: 100 },
        { label: '通院加療中・常に安静を要し保育困難（70点）', value: `${prefix}_ill_70`, points: 70 },
        { label: '身体障害3・4級/療育手帳B1/精神障害手帳所持（80点）', value: `${prefix}_ill_80`, points: 80 },
        { label: '身体障害等その他・保育に支障がある（60点）', value: `${prefix}_ill_60`, points: 60 },
        { label: '疾病で保育に支障がある（上記未満）（50点）', value: `${prefix}_ill_50`, points: 50 },
      ],
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}：家族の介護・看護の状況は？`,
      helpText: '月間の介護日数と1日あたりの時間で点数が決まります',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
        { label: '月20日以上×1日8時間以上（90点）', value: `${prefix}_care_90`, points: 90 },
        { label: '月20日以上×1日6時間以上（70点）', value: `${prefix}_care_70`, points: 70 },
        { label: '月20日以上×1日4時間以上（50点）', value: `${prefix}_care_50`, points: 50 },
        { label: '月15日以上×1日8時間以上（70点）', value: `${prefix}_care_15_70`, points: 70 },
        { label: '月15日以上×1日6時間以上（55点）', value: `${prefix}_care_15_55`, points: 55 },
        { label: '月15日以上×1日4時間以上（40点）', value: `${prefix}_care_15_40`, points: 40 },
        { label: '月48時間以上（上記以外）（30点）', value: `${prefix}_care_30`, points: 30 },
      ],
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}：学校・職業訓練への就学状況は？`,
      helpText: '職業訓練校・専門学校・大学等への通学が対象です',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
        { label: '月120時間以上（80点）', value: `${prefix}_school_80`, points: 80 },
        { label: '月80時間以上（60点）', value: `${prefix}_school_60`, points: 60 },
        { label: '月48時間以上（40点）', value: `${prefix}_school_40`, points: 40 },
      ],
    },
    {
      id: `${prefix}_jobseek`,
      category,
      label: `${parentLabel}：求職活動の状況は？`,
      helpText: '就職内定がある場合は内定後の就労予定に基づく点数が適用されます',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_js_none`, points: 0 },
        { label: '求職中（内定なし）（20点）', value: `${prefix}_js_20`, points: 20 },
        { label: '居宅外就労月20日×8時間以上に内定（70点）', value: `${prefix}_js_ext_70`, points: 70 },
        { label: '居宅外就労月20日×6時間以上に内定（60点）', value: `${prefix}_js_ext_60`, points: 60 },
        { label: '居宅外就労月20日×4時間以上に内定（50点）', value: `${prefix}_js_ext_50`, points: 50 },
        { label: '居宅内就労月20日×8時間以上に内定（65点）', value: `${prefix}_js_in_65`, points: 65 },
        { label: '居宅内就労月20日×6時間以上に内定（55点）', value: `${prefix}_js_in_55`, points: 55 },
        { label: '居宅内就労月20日×4時間以上に内定（45点）', value: `${prefix}_js_in_45`, points: 45 },
        { label: '月48時間以上の仕事に内定（30点）', value: `${prefix}_js_30`, points: 30 },
      ],
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧中ですか？（100点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（+100）', value: `${prefix}_disaster_yes`, points: 100 },
      ],
    },
  ];

  // 母のみ：妊娠・出産
  if (parentNum === 2) {
    questions.push({
      id: `${prefix}_birth`,
      category,
      label: `${parentLabel}：出産予定日の前後8週間以内ですか？（100点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_birth_no`, points: 0 },
        { label: 'はい（+100）', value: `${prefix}_birth_yes`, points: 100 },
      ],
    });
  }

  return questions;
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '要綱では「ひとり親の基本点数 + 100点」が世帯基本点数になります。このシミュレーターでは保護者2の入力を0点のまま残し、調整点として+130点（100点補填+30点ひとり親加算）を加算します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
      { label: 'はい（+130：100点補填+30点ひとり親加算）', value: 'adj_sp_yes', points: 130 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    helpText: '+20点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_welfare_yes', points: 20 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計の中心者が失業しましたか？',
    helpText: '+10点（失業に伴い就労が必要な場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemp_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_unemp_yes', points: 10 },
    ],
  },
  {
    id: 'adj_ikuji_return',
    category: 'adjustment',
    label: '育児休業明けで職場復帰予定ですか？',
    helpText: '+10点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikuji_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_ikuji_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいと同一施設の利用を希望していますか？',
    helpText: '+10点（きょうだいが同一施設に在籍または同時入所希望）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sib_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sib_yes', points: 10 },
    ],
  },
  {
    id: 'adj_relative_disability',
    category: 'adjustment',
    label: '同居の親族に障がいがありますか（介護・看護ではない場合）？',
    helpText: '+5点（身体障害3級以上、療育手帳所持、精神障害者保健福祉手帳所持の親族が同居）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_rd_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_rd_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unauthorized',
    category: 'adjustment',
    label: '現在、認可外保育施設を週4日以上有償利用していますか？',
    helpText: '+5点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ua_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_ua_yes', points: 5 },
    ],
  },
  {
    id: 'adj_abuse_dv',
    category: 'adjustment',
    label: '虐待やDVのおそれがある状況ですか？',
    helpText: '+20点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_dv_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_abuse_dv_yes', points: 20 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '60歳未満の親族が子どもを預けることができる状況ですか？',
    helpText: '-10点（就労していない60歳未満の親族が保育代替可能な場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gp_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_gp_yes', points: -10 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    helpText: '-20点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arr_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_arr_yes', points: -20 },
    ],
  },
  {
    id: 'adj_outside_town',
    category: 'adjustment',
    label: '矢巾町外に居住していますか（転入予定を除く）？',
    helpText: '-30点（転入予定者は除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（矢巾町在住または転入予定）', value: 'adj_ot_no', points: 0 },
      { label: 'はい（町外居住・転入予定なし）（-30）', value: 'adj_ot_yes', points: -30 },
    ],
  },
];

export const yahabaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
