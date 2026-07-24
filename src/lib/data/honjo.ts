import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.honjo.lg.jp/material/files/group/50/nyuusyosennkou.pdf
//       （本庄市保育施設利用調整指数表／平成31年4月改正）
// 本庄市 保育施設利用調整指数表（基本点＋調整点数）
// 計算方式: sum方式（基本点表は父・母それぞれの列に点数を記入し合算）。
// 最高基本点: 20（父母各10）
// 注:
//  - 番号4「就学（学校・職業訓練校）」は「1〜3を準用」（外勤の点数）のため独立点数を持たず、
//    就学中の方は就労（外勤）の該当区分を選択する運用（helpTextで案内）。
//  - 番号10「勤務予定（内定証明あり）」は「1〜9の点数から-1したものを準用」。外勤の主要3区分について
//    -1した内定オプションを設定（居宅内・内職の内定は割愛）。
//  - 番号12「出産」は母（保護者2）のみに設定。
//  - 調整点数27（正規職員）・28/29（勤務日数減点）は原典では父母別だが、本シミュレーターでは世帯単位で
//    主たる保護者の状況として1回のみ計上。

const municipality = {
  id: 'honjo',
  name: '本庄市',
  slug: 'honjo',
  prefecture: '埼玉県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労等
    { label: '就労（外勤・居宅外自営）：1日7時間以上の勤務', value: `${prefix}_out_7`, points: 10 },
    { label: '就労（外勤・居宅外自営）：1日5時間以上7時間未満の勤務', value: `${prefix}_out_5`, points: 7 },
    { label: '就労（外勤・居宅外自営）：1日5時間未満の勤務', value: `${prefix}_out_u5`, points: 5 },
    { label: '就労（居宅内自営）：1日7時間以上の勤務', value: `${prefix}_in_7`, points: 9 },
    { label: '就労（居宅内自営）：1日5時間以上7時間未満の勤務', value: `${prefix}_in_5`, points: 6 },
    { label: '就労（居宅内自営）：1日5時間未満の勤務', value: `${prefix}_in_u5`, points: 4 },
    { label: '就労（内職）：1日7時間以上', value: `${prefix}_naishoku_7`, points: 3 },
    { label: '就労（内職）：1日7時間未満', value: `${prefix}_naishoku_u7`, points: 2 },
    // 求職活動（勤務予定・内定証明あり＝外勤の点数-1を準用）
    { label: '求職活動（内定証明あり）：外勤1日7時間以上に相当', value: `${prefix}_naitei_7`, points: 9 },
    { label: '求職活動（内定証明あり）：外勤1日5時間以上7時間未満に相当', value: `${prefix}_naitei_5`, points: 6 },
    { label: '求職活動（内定証明あり）：外勤1日5時間未満に相当', value: `${prefix}_naitei_u5`, points: 4 },
    { label: '求職中（勤務先未定）', value: `${prefix}_seek`, points: 0 },
    // 出産（母のみ ※後段で母だけに追加）
    // 疾病等
    { label: '疾病（病院入院）：1か月以上の入院', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病（居宅療養）：常時臥床', value: `${prefix}_ill_bed`, points: 10 },
    { label: '疾病（居宅療養）：精神等長期療養', value: `${prefix}_ill_mental`, points: 7 },
    { label: '疾病（居宅療養）：一般療養（1か月以上療養）', value: `${prefix}_ill_general`, points: 6 },
    { label: '疾病（居宅療養）：その他', value: `${prefix}_ill_other`, points: 2 },
    { label: '身体障害：1・2級', value: `${prefix}_dis_12`, points: 10 },
    { label: '身体障害：3級', value: `${prefix}_dis_3`, points: 8 },
    { label: '身体障害：4級以下', value: `${prefix}_dis_4`, points: 4 },
    // 看護等
    { label: '看護（入院付添）：1か月以上の入院付添', value: `${prefix}_nurse_hosp`, points: 10 },
    { label: '看護（居宅看護）：介護が常態（重度身障者、要介護5・4程度）', value: `${prefix}_nurse_h`, points: 10 },
    { label: '看護（居宅看護）：週4日以上の介護・通院の付添等（要介護3程度）', value: `${prefix}_nurse_m`, points: 7 },
    { label: '看護（居宅看護）：週3日程度の介護・通院の付添等（要介護2・1程度）', value: `${prefix}_nurse_l`, points: 5 },
    { label: '看護（居宅看護）：一般療養（要支援程度）', value: `${prefix}_nurse_s`, points: 3 },
    // 災害
    { label: '災害：火災・風水害で家屋損傷その他災害復旧', value: `${prefix}_disaster`, points: 10 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 出産は母（保護者2）のみ
  if (parentNum === 2) {
    options.splice(12, 0,
      { label: '出産：出産予定日のある月とその前後各2か月間を含む合計5か月間', value: `${prefix}_birth`, points: 10 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（父母それぞれの基本点を合算します）。就学・職業訓練中の方は、就労（外勤）の該当区分を選んでください。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_kinmu',
    category: 'adjustment',
    label: '勤務状況（正規職員・勤務日数）（調整点数）',
    helpText: '主たる保護者の勤務状況について、最も当てはまるものを選んでください',
    inputType: 'select',
    options: [
      { label: '正規職員（+1点）', value: 'adj_kinmu_seiki', points: 1 },
      { label: '勤務日数16日以下（-1点）', value: 'adj_kinmu_16', points: -1 },
      { label: '勤務日数12日以下（-2点）', value: 'adj_kinmu_12', points: -2 },
      { label: '該当なし', value: 'adj_kinmu_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji',
    category: 'adjustment',
    label: '育児休業からの復帰状況（調整点数）',
    inputType: 'select',
    options: [
      { label: '育児休業復帰（入所保留で育休延長）（+5点）', value: 'adj_ikuji_encho', points: 5 },
      { label: '育児休業復帰（+3点）', value: 'adj_ikuji_return', points: 3 },
      { label: '該当なし', value: 'adj_ikuji_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '幼稚園教諭・保育士等として勤務していますか？（調整点数）',
    inputType: 'select',
    options: [
      { label: '幼稚園教諭・保育士等の仕事に従事し、市内の施設に勤務（+10点）', value: 'adj_hoikushi_in', points: 10 },
      { label: '幼稚園教諭・保育士等の仕事に従事し、市外の施設に勤務（+3点）', value: 'adj_hoikushi_out', points: 3 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_setai',
    category: 'adjustment',
    label: '世帯の特殊事情（調整点数）',
    helpText: '最も当てはまるものを1つ選んでください',
    inputType: 'select',
    options: [
      { label: 'ひとり親家庭（+25点）', value: 'adj_setai_single', points: 25 },
      { label: '生活保護家庭（+25点）', value: 'adj_setai_hogo', points: 25 },
      { label: '生計中心者の失業により、就労の必要性が高い場合（会社都合での失業）（+25点）', value: 'adj_setai_shitsugyo', points: 25 },
      { label: '該当なし', value: 'adj_setai_none', points: 0 },
    ],
  },
  {
    id: 'adj_zaien',
    category: 'adjustment',
    label: '入所希望月に兄弟姉妹が入所中ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '入所希望月に兄弟姉妹が入所中の場合（+10点）', value: 'adj_zaien_yes', points: 10 },
      { label: '該当なし', value: 'adj_zaien_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogai',
    category: 'adjustment',
    label: '子どもが障害を有しますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '子どもが障害を有する場合（+5点）', value: 'adj_shogai_yes', points: 5 },
      { label: '該当なし', value: 'adj_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_dokyo',
    category: 'adjustment',
    label: '65歳未満の同居親族等がいますか？（調整点数）',
    helpText: '基本点の状況（就労・疾病等）に該当していない同居人に限る',
    inputType: 'radio',
    options: [
      { label: '65歳未満の同居している親族等がいる（基本点非該当の同居人）（-5点）', value: 'adj_dokyo_yes', points: -5 },
      { label: '該当なし', value: 'adj_dokyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '兄弟姉妹を祖父母等の親族が保育していますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '兄弟・姉妹を、祖父母等の親族が保育（-5点）', value: 'adj_sofubo_yes', points: -5 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '保育料を滞納していますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '正当な理由がなく保育料を滞納している場合（-30点）', value: 'adj_overdue_yes', points: -30 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
];

export const honjoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
