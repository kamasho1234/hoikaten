import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 裾野市 保育園入園 利用調整基準データ
// 出典: 裾野市「裾野市保育所等入所選考基準」(PDF)
// https://www.city.susono.shizuoka.jp/material/files/group/18/hoiku_senkou.pdf
// ---------------------------------------------------------------------------
// 裾野市は「①〜⑦の基準指数（父・母それぞれ）＋ ⑧調整指数」の加算方式。
// 指数には0.5刻みの項目がある（1日6時間以上の就労7.5点など）。
// ---------------------------------------------------------------------------
// 「自営専従者」「内職」「収入が県最低賃金未満」「就労内定」「就学」は、
// いずれも外勤就労の指数からの増減で決まるため、当サイトでは
// 代表的な就労時間の指数にその増減を足した選択肢として並べている。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'susono',
  name: '裾野市',
  slug: 'susono',
  prefecture: '静岡県',
  maxBasePoints: 10,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上・1日7.5時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '週5日以上・1日7時間以上', value: `${prefix}_employment_9`, points: 9 },
  { label: '週5日以上・1日6時間以上', value: `${prefix}_employment_75`, points: 7.5 },
  { label: '週5日以上・1日4時間以上', value: `${prefix}_employment_5`, points: 5 },
  { label: '週4日以上・1日7.5時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '週4日以上・1日7時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '週4日以上・1日6時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '週4日以上・1日4時間以上', value: `${prefix}_employment_4`, points: 4 },
];

const selfOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_self_none`, points: 0 },
  { label: '自営専従者・週5日以上1日7.5時間以上（外勤-1）', value: `${prefix}_self_9`, points: 9 },
  { label: '自営専従者・週5日以上1日6時間以上（外勤-1）', value: `${prefix}_self_65`, points: 6.5 },
  { label: '自営（農業）事業主・週5日以上1日7.5時間以上（外勤-1）', value: `${prefix}_self_owner_9`, points: 9 },
  { label: '自営（農業）専従者・週5日以上1日7.5時間以上（外勤-2）', value: `${prefix}_self_family_8`, points: 8 },
  { label: '自営（農業）専従者・週4日以上1日7.5時間以上（外勤-2）', value: `${prefix}_self_family_6`, points: 6 },
];

const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月20日以上1日4時間以上かつ月収5万円以上', value: `${prefix}_homework_5`, points: 5 },
  { label: '上記以外の内職', value: `${prefix}_homework_3`, points: 3 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠初期・中期に長期の入院安静が必要', value: `${prefix}_childbirth_10`, points: 10 },
  { label: '妊娠初期・中期に長期の自宅安静が必要', value: `${prefix}_childbirth_9`, points: 9 },
  { label: '出産前後3か月間（出産予定月を含む）', value: `${prefix}_childbirth_8`, points: 8 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院が1か月以上と見込まれる', value: `${prefix}_illness_10`, points: 10 },
  { label: '感染症の疾病または特定疾患', value: `${prefix}_illness_10b`, points: 10 },
  { label: '入院が1か月未満と見込まれる', value: `${prefix}_illness_7`, points: 7 },
  { label: '一般療養（週3日以上の通院を常態）', value: `${prefix}_illness_6`, points: 6 },
  { label: '一般療養（週1〜2日の通院を常態）', value: `${prefix}_illness_4`, points: 4 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 療育手帳 / 精神3級以上（同等の症状を含む）', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3級（同等の症状を含む）', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体4・5・6級（同等の症状を含む）', value: `${prefix}_disability_4`, points: 4 },
  { label: '精神性疾患・身体の状態が軽度だが療養を要する', value: `${prefix}_disability_4b`, points: 4 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居親族の常時介護 / 週5日以上の施設通所付き添い（身体1・2級または要介護4・5程度）', value: `${prefix}_care_10`, points: 10 },
  { label: '同居親族の一部介護 / 週3日以上の施設通所付き添い（身体3級または要介護2・3程度）', value: `${prefix}_care_8`, points: 8 },
  { label: '同居親族の常時軽度の介護（3級以下の手帳または要介護1・2程度）', value: `${prefix}_care_6`, points: 6 },
  { label: '上記以外で保育が必要と認められる介護', value: `${prefix}_care_4`, points: 4 },
  { label: '同居以外の親族の常時介護（-2）', value: `${prefix}_care_8b`, points: 8 },
  { label: '同居以外の親族の一部介護（-2）', value: `${prefix}_care_6b`, points: 6 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風水害等で家屋が失われ復旧にあたる', value: `${prefix}_disaster_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（最大3か月間・起業準備を含む）', value: `${prefix}_jobseeking_2`, points: 2 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学・技能取得で外出を常態（週5日1日7.5時間以上相当・外勤-1）', value: `${prefix}_school_9`, points: 9 },
  { label: '就学・技能取得で外出を常態（週5日1日6時間以上相当・外勤-1）', value: `${prefix}_school_65`, points: 6.5 },
  { label: '就学・技能取得で自宅学習を常態（週5日1日7.5時間以上相当・外勤-2）', value: `${prefix}_school_8`, points: 8 },
  { label: '就学・技能取得で自宅学習を常態（週5日1日6時間以上相当・外勤-2）', value: `${prefix}_school_55`, points: 5.5 },
];

const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '児童虐待等により家庭内保育に危険がある', value: `${prefix}_other_10`, points: 10 },
  { label: 'ひとり親（父母の死別・離別・行方不明・拘禁）', value: `${prefix}_other_10b`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '裾野市は父・母それぞれに基準指数をつけ、調整指数を足して選考します',
    inputType: 'select',
    options: [
      { label: '家庭外で働いている（外勤）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '自営業・農業', value: `${prefix}_reason_self`, points: 0 },
      { label: '内職', value: `${prefix}_reason_homework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・入院', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭等の災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・技能取得', value: `${prefix}_reason_school`, points: 0 },
      { label: 'その他（虐待・ひとり親）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}の就労状況（外勤）は？`, inputType: 'radio', options: employmentOptions(prefix) },
    { id: `${prefix}_self`, category, label: `${parentLabel}の自営業・農業の状況は？`, inputType: 'radio', options: selfOptions(prefix) },
    { id: `${prefix}_homework`, category, label: `${parentLabel}の内職の状況は？`, inputType: 'radio', options: homeworkOptions(prefix) },
    { id: `${prefix}_childbirth`, category, label: `${parentLabel}の妊娠・出産の状況は？`, inputType: 'radio', options: childbirthOptions(prefix) },
    { id: `${prefix}_illness`, category, label: `${parentLabel}の疾病・入院の状況は？`, inputType: 'radio', options: illnessOptions(prefix) },
    { id: `${prefix}_disability`, category, label: `${parentLabel}の障害の程度は？`, inputType: 'radio', options: disabilityOptions(prefix) },
    { id: `${prefix}_care`, category, label: `${parentLabel}の介護の状況は？`, inputType: 'radio', options: careOptions(prefix) },
    { id: `${prefix}_disaster`, category, label: `${parentLabel}は災害の復旧にあたっていますか？`, inputType: 'radio', options: disasterOptions(prefix) },
    { id: `${prefix}_jobseeking`, category, label: `${parentLabel}は求職活動をしていますか？`, inputType: 'radio', options: jobSeekingOptions(prefix) },
    { id: `${prefix}_school`, category, label: `${parentLabel}の就学・技能取得の状況は？`, inputType: 'radio', options: schoolOptions(prefix) },
    { id: `${prefix}_other`, category, label: `${parentLabel}のその他の状況は？`, inputType: 'radio', options: otherOptions(prefix) },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_transfer_none', points: 0 },
      { label: 'きょうだいが別々の保育所等に通園中（+1.5）', value: 'adj_transfer_sibling', points: 1.5 },
      { label: '転居・転職等により通園が著しく困難（+1）', value: 'adj_transfer_hard', points: 1 },
      { label: '自己都合による転園希望（-2）', value: 'adj_transfer_self', points: -2 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '2歳児クラスまでの認可保育所等の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_graduate_none', points: 0 },
      { label: '小規模保育所から連携園への入園を希望（+2）', value: 'adj_graduate_renkei', points: 2 },
      { label: '小規模保育所から連携園以外への入園を希望（+1）', value: 'adj_graduate_other', points: 1 },
      { label: '2歳児までの園の卒園児で引き続き利用を希望（+1）', value: 'adj_graduate_cont', points: 1 },
    ],
  },
  {
    id: 'adj_temp_care',
    category: 'adjustment',
    label: 'すでに勤務中等で託児所・一時保育を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_temp_care_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_temp_care_yes', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所希望児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業取得のため退所した児童の再申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_leave_return_yes', points: 5 },
    ],
  },
  {
    id: 'adj_leave_now',
    category: 'adjustment',
    label: '産休・育休期間中（期間終了後の入所希望）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_now_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_leave_now_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが希望園に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_enrolled_yes', points: 1 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '前年度から入所保留の状態が続いていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_waiting_yes', points: 1 },
    ],
  },
  {
    id: 'adj_not_applying_child',
    category: 'adjustment',
    label: '同一世帯に保育の申し込みをしていない児童がいますか？（1人につき-1・延長のある幼稚園の在園児を除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_not_applying_none', points: 0 },
      { label: '1人（-1）', value: 'adj_not_applying_1', points: -1 },
      { label: '2人（-2）', value: 'adj_not_applying_2', points: -2 },
    ],
  },
  {
    id: 'adj_sibling_together',
    category: 'adjustment',
    label: 'きょうだいで同時に申し込みますか？（2人目から1人につき+0.5）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_together_no', points: 0 },
      { label: '2人同時（+0.5）', value: 'adj_sibling_together_2', points: 0.5 },
      { label: '3人同時（+1）', value: 'adj_sibling_together_3', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居親族等の保育について、どれにあてはまりますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_grandparent_none', points: 0 },
      { label: '高齢等の理由で十分保育ができないと主張する（-2）', value: 'adj_grandparent_2', points: -2 },
      { label: '別居の親族等が一部の児童のみ保育できると主張する（-1）', value: 'adj_grandparent_1', points: -1 },
    ],
  },
  {
    id: 'adj_no_parents',
    category: 'adjustment',
    label: '両親のいない家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_parents_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_no_parents_yes', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_no_helper',
    category: 'adjustment',
    label: '裾野市および隣接する市町に祖父母等の協力者がいませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_helper_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_no_helper_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: '児童扶養手当対象世帯（みなし寡婦を含む）（+3）', value: 'adj_single_parent_teate', points: 3 },
      { label: '上記以外のひとり親世帯（+1）', value: 'adj_single_parent_other', points: 1 },
    ],
  },
  {
    id: 'adj_mediation',
    category: 'adjustment',
    label: '調停・裁判中で住民票が同一ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_mediation_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_mediation_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '家計の主宰者が失業していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployed_yes', points: 1 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任ですか？（勤務証明書で確認）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_tanshin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_extension',
    category: 'adjustment',
    label: '延長保育が必要で、他園では調整できませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_extension_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_extension_yes', points: 1 },
    ],
  },
  {
    id: 'adj_no_car',
    category: 'adjustment',
    label: '自動車等の移動手段がなく、希望園以外への通園が困難ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_car_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_no_car_yes', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料の滞納、または現年の保育料が3か月以上未納ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_fee_delinquent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士・幼稚園教諭の資格を持ち、認可保育所等で勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_none', points: 0 },
      { label: '市内で1日7時間以上を常態（+5）', value: 'adj_hoikushi_in7', points: 5 },
      { label: '市内で1日4時間以上を常態（+3）', value: 'adj_hoikushi_in4', points: 3 },
      { label: '市外で1日7時間以上を常態（+1.5）', value: 'adj_hoikushi_out7', points: 1.5 },
      { label: '市外で1日4時間以上を常態（+1）', value: 'adj_hoikushi_out4', points: 1 },
    ],
  },
];

export const susonoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
