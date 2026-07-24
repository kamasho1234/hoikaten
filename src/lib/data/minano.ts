import type { MunicipalityData, Question } from '../types';

// 出典: https://www.town.minano.saitama.jp/wp-content/uploads/2023/09/5170934185d03af0178ca0e1e11403f9.pdf
//       （皆野町保育所等入所選考基準指数表）
// 皆野町 保育所等入所選考基準指数表（基準指数＋調整指数）
// 計算方式: sum方式（「児童の基準点＝基準指数（母の状況＋父の状況）＋調整指数」＝父母合算）。
// 最高基準指数: 42（父母各21）
// 注:
//  - 「妊娠・出産（出産によりきょうだいを入所させる場合）」は母（保護者2）のみに設定。
//  - 介護の「※同居の場合→上記に加点1」は父母の該当状況に応じた細目のため、代表値として要介護・要支援の
//    2区分のみ設定し、同居加点(+1)はhelpTextで補足。

const municipality = {
  id: 'minano',
  name: '皆野町',
  slug: 'minano',
  prefecture: '埼玉県',
  maxBasePoints: 42,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労（外勤）
    { label: '就労（外勤）：月間150時間以上', value: `${prefix}_work_150`, points: 21 },
    { label: '就労（外勤）：月間140〜149時間', value: `${prefix}_work_140`, points: 19 },
    { label: '就労（外勤）：月間130〜139時間', value: `${prefix}_work_130`, points: 17 },
    { label: '就労（外勤）：月間120〜129時間', value: `${prefix}_work_120`, points: 15 },
    { label: '就労（外勤）：月間110〜119時間', value: `${prefix}_work_110`, points: 13 },
    { label: '就労（外勤）：月間100〜109時間', value: `${prefix}_work_100`, points: 11 },
    { label: '就労（外勤）：月間48〜99時間', value: `${prefix}_work_48`, points: 9 },
    { label: '就労（内職）', value: `${prefix}_naishoku`, points: 8 },
    // 求職
    { label: '求職：求職活動（起業準備を含む）を行う場合', value: `${prefix}_seek`, points: 5 },
    // 妊娠・出産（母のみ ※後段で母だけに追加）
    // 就学
    { label: '就学：学校等に通学する場合', value: `${prefix}_school`, points: 18 },
    // 疾病
    { label: '疾病（入院）', value: `${prefix}_ill_hosp`, points: 21 },
    { label: '疾病（居宅療養）：常時病臥・長期療養', value: `${prefix}_ill_bed`, points: 21 },
    { label: '疾病（居宅療養）：その他', value: `${prefix}_ill_other`, points: 15 },
    // 障害
    { label: '障害：身体障害者手帳1・2級', value: `${prefix}_dis_body_12`, points: 21 },
    { label: '障害：身体障害者手帳3級', value: `${prefix}_dis_body_3`, points: 18 },
    { label: '障害：療育手帳Ⓐ・A', value: `${prefix}_dis_ryoiku_a`, points: 21 },
    { label: '障害：療育手帳B・C', value: `${prefix}_dis_ryoiku_bc`, points: 18 },
    { label: '障害：精神障害者保健福祉手帳1・2級', value: `${prefix}_dis_mental_12`, points: 21 },
    { label: '障害：精神障害者保健福祉手帳3級', value: `${prefix}_dis_mental_3`, points: 18 },
    // 介護
    { label: '介護：要介護1〜5の親族の介護', value: `${prefix}_care_kaigo`, points: 21 },
    { label: '介護：要支援（支援申告書要添付）の親族の介護', value: `${prefix}_care_shien`, points: 15 },
    // 虐待・DV
    { label: '虐待・DV：児童虐待またはDVのおそれあり', value: `${prefix}_dv`, points: 25 },
    // 災害
    { label: '災害：災害からの復旧', value: `${prefix}_disaster`, points: 21 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 妊娠・出産は母（保護者2）のみ
  if (parentNum === 2) {
    options.splice(9, 0,
      { label: '妊娠・出産：出産によりきょうだいを入所させる場合', value: `${prefix}_birth`, points: 21 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（父母それぞれの基準指数を合算します）。介護で対象の親族と同居している場合は、さらに+1点が加算されます。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？（調整指数）',
    helpText: 'みなし家庭を含む',
    inputType: 'radio',
    options: [
      { label: '母子・父子家庭（みなし家庭を含む）（+31点）', value: 'adj_single_yes', points: 31 },
      { label: '該当なし', value: 'adj_single_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '生活保護（就労により自立支援につながる場合等）（+3点）', value: 'adj_seikatsuhogo_yes', points: 3 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_zaien',
    category: 'adjustment',
    label: 'きょうだいが在園中ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: 'きょうだい在園中（+5点）', value: 'adj_zaien_yes', points: 5 },
      { label: '該当なし', value: 'adj_zaien_none', points: 0 },
    ],
  },
  {
    id: 'adj_sotsuen',
    category: 'adjustment',
    label: '小規模保育施設等からの卒園による継続入所申請ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '小規模保育施設等からの卒園による継続入所申請（+5点）', value: 'adj_sotsuen_yes', points: 5 },
      { label: '該当なし', value: 'adj_sotsuen_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '町内の保育関連施設の従事者ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '町内保育関連施設従事者（+15点）', value: 'adj_hoikushi_yes', points: 15 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '65歳未満の無職の祖父母が同居していますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '65歳未満の無職の祖父母が同居（-5点）', value: 'adj_sofubo_yes', points: -5 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_choigai',
    category: 'adjustment',
    label: '町外在住者ですか？（調整指数）',
    helpText: '町内転入予定者を除く',
    inputType: 'select',
    options: [
      { label: '町外在住・町内在勤者（町内転入予定者を除く）（-15点）', value: 'adj_choigai_naikin', points: -15 },
      { label: '町外在住・町外在勤者（町内転入予定者を除く）（-30点）', value: 'adj_choigai_gaikin', points: -30 },
      { label: '該当なし（町内在住）', value: 'adj_choigai_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '保育料を滞納していますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '特段の理由なく保育料を滞納（-40点）', value: 'adj_overdue_yes', points: -40 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_encho',
    category: 'adjustment',
    label: '育休延長を希望しますか？（調整指数）',
    helpText: '優先度が下がることを了承の上での育休延長希望',
    inputType: 'radio',
    options: [
      { label: '育休延長可で優先度が下がることを了承の上、育休延長希望（-50点）', value: 'adj_ikuji_encho_yes', points: -50 },
      { label: '該当なし', value: 'adj_ikuji_encho_none', points: 0 },
    ],
  },
];

export const minanoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
