import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 北名古屋市 保育利用調整基準表（基礎点数・指数調整）データ
//
// 出典: 北名古屋市保育課「北名古屋市保育利用調整基準表 ＜R8.4.1改定＞（配布用）」
//       https://www.city.kitanagoya.lg.jp/_res/projects/default_project/_page_/001/007/174/tensuhyo_r8.pdf
//       （北名古屋市Webサイト「令和8年度保育所等入所申込み（年度途中入所）」
//         https://www.city.kitanagoya.lg.jp/kosodate/azukeru/1002322/1007174.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 原典の注記:
//   「就労時間には、残業時間を含まず休憩時間を含みます」
//   「☆の点数は、当該児童・世帯の状況に応じ別途判断します」（虐待・DV・その他）
//   「申込書の『希望する保育所等に入所できない場合は、育児休業も許容できる』にチェックを付けた場合、
//     点数に関係なく利用調整の順番を最後とします」（点数ではないため質問に含めていない）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kitanagoya',
  name: '北名古屋市',
  slug: 'kitanagoya',
  prefecture: '愛知県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 基礎点数（保育の必要な事由）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** ① 就労（被雇用者・法人役員／自営経営者・自営協力者・業務委託者） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（週40時間以上）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月120時間以上160時間未満（週30時間以上）', value: `${prefix}_employment_18`, points: 18 },
  { label: '月90時間以上120時間未満（週22.5時間以上）', value: `${prefix}_employment_16`, points: 16 },
  { label: '月60時間以上90時間未満（週15時間以上）', value: `${prefix}_employment_14`, points: 14 },
];

/** ① 就労（事業専従者・自営協力者以外） */
const employmentSubOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_empsub_none`, points: 0 },
  { label: '月160時間以上（週40時間以上）', value: `${prefix}_empsub_16`, points: 16 },
  { label: '月120時間以上160時間未満（週30時間以上）', value: `${prefix}_empsub_14`, points: 14 },
  { label: '月90時間以上120時間未満（週22.5時間以上）', value: `${prefix}_empsub_12`, points: 12 },
  { label: '月60時間以上90時間未満（週15時間以上）', value: `${prefix}_empsub_10`, points: 10 },
];

/** ① 内職 */
const naishokuOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_naishoku_none`, points: 0 },
  { label: '添付書類がある場合', value: `${prefix}_naishoku_10`, points: 10 },
  { label: '添付書類がない場合（入所後に提出が必要）', value: `${prefix}_naishoku_7`, points: 7 },
];

/** ① 就労の添付書類・就労予定による調整 */
const employmentAdjustOptions = (prefix: string) => [
  { label: '就労中で、必要な添付書類を提出できる', value: `${prefix}_empadj_0`, points: 0 },
  {
    label: '事業主・業務委託で、確定申告書の写し以外（開業届その他の公的書類）を提出する',
    value: `${prefix}_empadj_m1a`,
    points: -1,
  },
  {
    label: '専従者で、確定申告書の写し以外（事業専従者給与に関する届出等）を提出する',
    value: `${prefix}_empadj_m1b`,
    points: -1,
  },
  {
    label: '給与支払実績がわかる公的書類以外を提出する（青色申告決算書・収支内訳書等）',
    value: `${prefix}_empadj_m2`,
    points: -2,
  },
  { label: '就労予定（派遣先未定・勤務時間増予定）', value: `${prefix}_empadj_m2b`, points: -2 },
  { label: '申込時点で添付書類を提出できない（入所後に提出が必要）', value: `${prefix}_empadj_m4`, points: -4 },
];

/** ② 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '産前6週（多胎児の場合は産前14週）・産後8週の期間',
    value: `${prefix}_childbirth_14`,
    points: 14,
  },
];

/** ③ 保護者の疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院', value: `${prefix}_illness_20`, points: 20 },
  { label: '疾病：月1回以上の通院により治療を受けている（通院実績）', value: `${prefix}_illness_16`, points: 16 },
  { label: '疾病：上記以外の自宅療養', value: `${prefix}_illness_12`, points: 12 },
  {
    label: '障害：身障1・2級、療育A、精神1級、要介護5・4',
    value: `${prefix}_illness_disability_20`,
    points: 20,
  },
  { label: '障害：身障3・4級、療育B、精神2級、要介護3', value: `${prefix}_illness_disability_18`, points: 18 },
  {
    label: '障害：身障5・6級、療育C、精神3級、要介護2・1',
    value: `${prefix}_illness_disability_16`,
    points: 16,
  },
];

/** ④ 親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添', value: `${prefix}_care_18`, points: 18 },
  {
    label: '身障1・2級、療育A、精神1級、要介護5・4の親族の介護・看護',
    value: `${prefix}_care_16`,
    points: 16,
  },
  { label: '心身障害児（者）の通院、通学等にあたっている', value: `${prefix}_care_14`, points: 14 },
  { label: '上記以外の介護・看護にあたっている', value: `${prefix}_care_12`, points: 12 },
];

/** ⑤ 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災等の復旧にあたっている', value: `${prefix}_disaster_20`, points: 20 },
];

/** ⑥ 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職、起業準備活動を行う場合', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** ⑦ 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月90時間以上', value: `${prefix}_education_12`, points: 12 },
  { label: '月60時間以上90時間未満', value: `${prefix}_education_10`, points: 10 },
  { label: '月90時間以上（通信制度を利用した就学）', value: `${prefix}_education_10b`, points: 10 },
  { label: '月90時間以上（就学予定・内定者）', value: `${prefix}_education_10c`, points: 10 },
  { label: '月60時間以上90時間未満（通信制度を利用した就学）', value: `${prefix}_education_8`, points: 8 },
];

/** ⑧ 育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  { label: '3歳以上児の弟・妹の育児休業を取得している', value: `${prefix}_leave_10`, points: 10 },
];

/** ひとり親家庭（基礎点数欄） */
const singleParentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_single_none`, points: 0 },
  {
    label: 'ひとり親家庭（離婚・未婚・死別・行方不明・拘禁・離婚調停中（協議中）の別居）',
    value: `${prefix}_single_20`,
    points: 20,
  },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      {
        label: '就労（被雇用者・法人役員・自営経営者・自営協力者・業務委託者）',
        value: `${prefix}_reason_employment`,
        points: 0,
      },
      { label: '就労（事業専従者・自営協力者以外）', value: `${prefix}_reason_empsub`, points: 0 },
      { label: '内職', value: `${prefix}_reason_naishoku`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_leave`, points: 0 },
      { label: 'ひとり親家庭', value: `${prefix}_reason_single`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間は？`,
      helpText: '就労時間には残業時間を含まず、休憩時間を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_empadj`,
      category,
      // 「就労」を選んだときだけ表示する（添付書類・就労予定による調整）
      showFor: ['employment', 'empsub'],
      label: `${parentLabel}の就労に関する添付書類の状況は？`,
      inputType: 'radio',
      options: employmentAdjustOptions(prefix),
    },
    {
      id: `${prefix}_empsub`,
      category,
      label: `${parentLabel}（事業専従者・自営協力者以外）の就労時間は？`,
      inputType: 'radio',
      options: employmentSubOptions(prefix),
    },
    {
      id: `${prefix}_naishoku`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: naishokuOptions(prefix),
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
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
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
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '通信制度を利用した就学、就学予定（内定者）はそれぞれ2点減となります',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}は育児休業を取得していますか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
    {
      id: `${prefix}_single`,
      category,
      label: `${parentLabel}はひとり親家庭にあてはまりますか？`,
      inputType: 'radio',
      options: singleParentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 指数調整
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭、または両親不存在ですか？',
    helpText: '離婚・未婚・死別・行方不明・拘禁・離婚調停中の別居が対象です（離婚協議中は除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労・求職活動・就学により自立支援につながる場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育・幼児教育に従事していますか？',
    helpText:
      '保育士・幼稚園教諭・保育教諭などが対象で、就労事由に限ります。保護者2名が保育士の場合も3点です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 3 },
    ],
  },
  {
    id: 'adj_not_resident',
    category: 'adjustment',
    label: '申請時に北名古屋市内に住民登録がなく、住所を置く確認書類が未提出ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_not_resident_no', points: 0 },
      { label: 'はい', value: 'adj_not_resident_yes', points: -5 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '在園児が転園を希望しますか？',
    helpText: '直近の現況調査において保育を必要とする事由が確認できていない場合は加点されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: 5 },
    ],
  },
  {
    id: 'adj_paid_care',
    category: 'adjustment',
    label: '新規申込児童を有償で施設または親族以外の者に月60時間以上預けていますか？',
    helpText:
      '求職活動事由以外の申込で、既に保育の必要な事由（求職活動を除く）がある状態で、入所直前まで継続して預ける見込みがある場合が対象です。幼児教育・保育無償化や多子軽減等での無償を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_paid_care_no', points: 0 },
      { label: 'はい', value: 'adj_paid_care_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育休・産休明けの復職で新規申込しますか？',
    helpText: '申込時は自宅保育の場合が対象です。保護者2名が育休の場合も2点です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいと同一の保育施設の利用を希望しますか？',
    helpText:
      'きょうだいが認定こども園の1号認定で利用中または利用申込中の場合を含みます（施設の証明がある場合のみ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      {
        label: 'はい（3歳以上児が幼児のきょうだいと同一施設。0〜2歳児の多胎児同時入所を含む）',
        value: 'adj_sibling_3',
        points: 3,
      },
      { label: 'はい（上記以外）', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '申込児童は18歳未満の児童を3人以上養育している家庭の3人目以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_school_district',
    category: 'adjustment',
    label: '3歳以上児が小学校区の保育施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_school_district_no', points: 0 },
      { label: 'はい', value: 'adj_school_district_yes', points: 2 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '市内地域型保育事業所を利用する2歳児が、3歳児に上がる際の転園を希望しますか？',
    helpText: '直近の現況調査において保育を必要とする事由が確認できていない場合は加点されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_no', points: 0 },
      { label: 'はい', value: 'adj_chiikigata_yes', points: 5 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料・給食費・延長保育料等を滞納し、計画納付をしていませんか？',
    helpText: 'きょうだい分を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -10 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '同一年度に内定を辞退していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -3 },
    ],
  },
];

export const kitanagoyaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
