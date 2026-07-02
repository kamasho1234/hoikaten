import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 白石市（宮城県）保育所等入所選考基準データ
// 出典: https://www.city.shiroishi.miyagi.jp/reiki/reiki_honbun/c207RG00001399.html
// 白石市保育園入所実施要綱（別表 第3条関係 保育の実施基準区分）
// 計算方式: sum方式（父の第1基準＋母の第1基準＋第2基準＋第3基準）
// 第1基準最高点: 20点（家庭外労働・月20日以上・日8時間以上）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'shiroishi',
  name: '白石市',
  slug: 'shiroishi',
  prefecture: '宮城県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  // 家庭外労働（外勤）：日数点数＋時間点数の合計
  // 日数: 20日以上=10, 16〜19日=8, 11〜15日=6, 10日以下=2
  // 時間: 8h以上=10, 6〜8h=8, 4〜6h=6, 4h未満=2
  const baseOptions = [
    // ===== 家庭外労働（外勤） =====
    // 月20日以上
    { label: '家庭外労働（外勤）・月20日以上・日8時間以上', value: `${prefix}_out_d20_h8`, points: 20 },
    { label: '家庭外労働（外勤）・月20日以上・日6〜8時間未満', value: `${prefix}_out_d20_h6`, points: 18 },
    { label: '家庭外労働（外勤）・月20日以上・日4〜6時間未満', value: `${prefix}_out_d20_h4`, points: 16 },
    { label: '家庭外労働（外勤）・月20日以上・日4時間未満', value: `${prefix}_out_d20_h2`, points: 12 },
    // 月16〜19日
    { label: '家庭外労働（外勤）・月16〜19日・日8時間以上', value: `${prefix}_out_d16_h8`, points: 18 },
    { label: '家庭外労働（外勤）・月16〜19日・日6〜8時間未満', value: `${prefix}_out_d16_h6`, points: 16 },
    { label: '家庭外労働（外勤）・月16〜19日・日4〜6時間未満', value: `${prefix}_out_d16_h4`, points: 14 },
    { label: '家庭外労働（外勤）・月16〜19日・日4時間未満', value: `${prefix}_out_d16_h2`, points: 10 },
    // 月11〜15日
    { label: '家庭外労働（外勤）・月11〜15日・日8時間以上', value: `${prefix}_out_d11_h8`, points: 16 },
    { label: '家庭外労働（外勤）・月11〜15日・日6〜8時間未満', value: `${prefix}_out_d11_h6`, points: 14 },
    { label: '家庭外労働（外勤）・月11〜15日・日4〜6時間未満', value: `${prefix}_out_d11_h4`, points: 12 },
    { label: '家庭外労働（外勤）・月11〜15日・日4時間未満', value: `${prefix}_out_d11_h2`, points: 8 },
    // 月10日以下
    { label: '家庭外労働（外勤）・月10日以下・日8時間以上', value: `${prefix}_out_d10_h8`, points: 12 },
    { label: '家庭外労働（外勤）・月10日以下・日6〜8時間未満', value: `${prefix}_out_d10_h6`, points: 10 },
    { label: '家庭外労働（外勤）・月10日以下・日4〜6時間未満', value: `${prefix}_out_d10_h4`, points: 8 },
    { label: '家庭外労働（外勤）・月10日以下・日4時間未満', value: `${prefix}_out_d10_h2`, points: 4 },
    // ===== 内職 =====
    // 月20日以上
    { label: '内職・月20日以上・日8時間以上', value: `${prefix}_naishoku_d20_h8`, points: 20 },
    { label: '内職・月20日以上・日6〜8時間未満', value: `${prefix}_naishoku_d20_h6`, points: 18 },
    { label: '内職・月20日以上・日4〜6時間未満', value: `${prefix}_naishoku_d20_h4`, points: 16 },
    { label: '内職・月20日以上・日4時間未満', value: `${prefix}_naishoku_d20_h2`, points: 12 },
    // 月16〜19日
    { label: '内職・月16〜19日・日8時間以上', value: `${prefix}_naishoku_d16_h8`, points: 18 },
    { label: '内職・月16〜19日・日6〜8時間未満', value: `${prefix}_naishoku_d16_h6`, points: 16 },
    { label: '内職・月16〜19日・日4〜6時間未満', value: `${prefix}_naishoku_d16_h4`, points: 14 },
    { label: '内職・月16〜19日・日4時間未満', value: `${prefix}_naishoku_d16_h2`, points: 10 },
    // 月11〜15日
    { label: '内職・月11〜15日・日8時間以上', value: `${prefix}_naishoku_d11_h8`, points: 16 },
    { label: '内職・月11〜15日・日6〜8時間未満', value: `${prefix}_naishoku_d11_h6`, points: 14 },
    { label: '内職・月11〜15日・日4〜6時間未満', value: `${prefix}_naishoku_d11_h4`, points: 12 },
    { label: '内職・月11〜15日・日4時間未満', value: `${prefix}_naishoku_d11_h2`, points: 8 },
    // 月10日以下
    { label: '内職・月10日以下・日8時間以上', value: `${prefix}_naishoku_d10_h8`, points: 12 },
    { label: '内職・月10日以下・日6〜8時間未満', value: `${prefix}_naishoku_d10_h6`, points: 10 },
    { label: '内職・月10日以下・日4〜6時間未満', value: `${prefix}_naishoku_d10_h4`, points: 8 },
    { label: '内職・月10日以下・日4時間未満', value: `${prefix}_naishoku_d10_h2`, points: 4 },
    // ===== 自宅外自営業 =====
    { label: '自宅外自営業（中心者）', value: `${prefix}_jieigo_out_center`, points: 9 },
    { label: '自宅外自営業（協力者）', value: `${prefix}_jieigo_out_helper`, points: 7 },
    // ===== 自宅内自営業 =====
    { label: '自宅内自営業（中心者）・日8時間以上', value: `${prefix}_jieigo_in_center_h8`, points: 10 },
    { label: '自宅内自営業（中心者）・日6〜8時間未満', value: `${prefix}_jieigo_in_center_h6`, points: 8 },
    { label: '自宅内自営業（中心者）・日4〜6時間未満', value: `${prefix}_jieigo_in_center_h4`, points: 6 },
    { label: '自宅内自営業（中心者）・日4時間未満', value: `${prefix}_jieigo_in_center_h2`, points: 2 },
    { label: '自宅内自営業（協力者）・日8時間以上', value: `${prefix}_jieigo_in_helper_h8`, points: 8 },
    { label: '自宅内自営業（協力者）・日6〜8時間未満', value: `${prefix}_jieigo_in_helper_h6`, points: 6 },
    { label: '自宅内自営業（協力者）・日4〜6時間未満', value: `${prefix}_jieigo_in_helper_h4`, points: 4 },
    { label: '自宅内自営業（協力者）・日4時間未満', value: `${prefix}_jieigo_in_helper_h2`, points: 2 },
    // ===== 生計中心者の失業 =====
    { label: '生計中心者の失業', value: `${prefix}_unemploy`, points: 10 },
    // ===== 妊娠・出産 =====
    { label: '出産前2か月〜産後6か月（妊娠・出産）', value: `${prefix}_birth`, points: 15 },
    // ===== 疾病 =====
    { label: '疾病・入院中または常時病臥', value: `${prefix}_ill_hosp`, points: 20 },
    { label: '疾病・精神疾患または感染症', value: `${prefix}_ill_mental`, points: 20 },
    { label: '疾病・通院含む一般療養', value: `${prefix}_ill_general`, points: 12 },
    // ===== 障害 =====
    { label: '障害（重度）', value: `${prefix}_dis_sev`, points: 18 },
    { label: '障害（中度）', value: `${prefix}_dis_mod`, points: 14 },
    { label: '障害（軽度）', value: `${prefix}_dis_mild`, points: 10 },
    // ===== 病人看護 =====
    { label: '病人看護（入院付添）', value: `${prefix}_care_hosp`, points: 20 },
    { label: '病人看護（常時病臥）', value: `${prefix}_care_bed`, points: 18 },
    { label: '病人看護（障害・重度）', value: `${prefix}_care_dis_sev`, points: 16 },
    { label: '病人看護（障害・中度）', value: `${prefix}_care_dis_mod`, points: 12 },
    { label: '病人看護（障害・軽度）', value: `${prefix}_care_dis_mild`, points: 8 },
    // ===== 就学・災害 =====
    { label: '職業訓練・就学', value: `${prefix}_study`, points: 12 },
    { label: '災害復旧中', value: `${prefix}_disaster`, points: 20 },
    // ===== 調整（減点） =====
    { label: '就労内定', value: `${prefix}_internal`, points: -2 },
    // ===== 調整（加算） =====
    { label: '求職活動中', value: `${prefix}_seek`, points: 2 },
    // ===== 0点 =====
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由（第一基準）`,
      helpText: '最も当てはまる状況を1つ選んでください',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖父母の状況（第二基準）',
    helpText: '同居・近居の祖父母の最も当てはまる状況を選んでください',
    inputType: 'select',
    options: [
      { label: '祖父母なし（不在または死別等）', value: 'adj_gp_none', points: 20 },
      { label: '祖父母が外勤（常勤）', value: 'adj_gp_work_full', points: 20 },
      { label: '祖父母が疾病（入院・常時病臥・精神疾患）', value: 'adj_gp_ill_sev', points: 20 },
      { label: '祖父母が70歳以上', value: 'adj_gp_70over', points: 18 },
      { label: '祖父母が自営業（中心者）', value: 'adj_gp_jieigo_center', points: 18 },
      { label: '祖父母が重度障害', value: 'adj_gp_dis_sev', points: 18 },
      { label: '祖父母が外勤（パート）', value: 'adj_gp_work_part', points: 16 },
      { label: '祖父母が内職（日8時間以上）', value: 'adj_gp_naishoku_h8', points: 16 },
      { label: '祖父母が居宅内介護', value: 'adj_gp_kaigo', points: 16 },
      { label: '祖父母が自営業（協力者）', value: 'adj_gp_jieigo_helper', points: 14 },
      { label: '祖父母が中度障害', value: 'adj_gp_dis_mod', points: 14 },
      { label: '祖父母が疾病（通院一般療養）', value: 'adj_gp_ill_general', points: 12 },
      { label: '祖父母が内職（日4時間以上）', value: 'adj_gp_naishoku_h4', points: 8 },
      { label: '祖父母が軽度障害', value: 'adj_gp_dis_mild', points: 10 },
      { label: '祖父母が70歳未満で無職（保育可能）', value: 'adj_gp_unemployed', points: 0 },
    ],
  },
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の特殊事情（第三基準）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（母子・父子世帯）（+30点）', value: 'adj_h_single', points: 30 },
      { label: '生活保護受給世帯（+30点）', value: 'adj_h_welfare', points: 30 },
      { label: 'DV被害（支援措置申出あり）（+20点）', value: 'adj_h_dv', points: 20 },
      { label: '該当なし', value: 'adj_h_none', points: 0 },
    ],
  },
  {
    id: 'adj_child',
    category: 'adjustment',
    label: '児童・兄弟姉妹の状況（第三基準・加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが希望施設に在園中（+2点）', value: 'adj_c_sibling', points: 2 },
      { label: '申込児童が障がいを持つ（+2点）', value: 'adj_c_disable', points: 2 },
      { label: '地域型保育施設（小規模保育等）の卒園児（+2点）', value: 'adj_c_chiiki', points: 2 },
      { label: '在宅保育の児童がいる（-5点）', value: 'adj_c_home', points: -5 },
      { label: '該当なし', value: 'adj_c_none', points: 0 },
    ],
  },
];

export const shiroishiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
