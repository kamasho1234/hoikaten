import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 古河市（茨城県） 保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/koga/reiki_honbun/r380RG00001243.html
// 古河市特定教育・保育等の利用に関する条例施行規則（別表第1・第2）
// 計算方式: sum方式（父母の基準指数を合算）
// 最高基本指数: 100点（居宅外就労・月20日以上・月160時間以上）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'koga',
  name: '古河市',
  slug: 'koga',
  prefecture: '茨城県',
  maxBasePoints: 100,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 居宅外就労（月20日以上）
    { label: '居宅外就労（月20日以上）月160時間以上', value: `${prefix}_20d_160h`, points: 100 },
    { label: '居宅外就労（月20日以上）月140〜160時間未満', value: `${prefix}_20d_140h`, points: 90 },
    { label: '居宅外就労（月20日以上）月120〜140時間未満', value: `${prefix}_20d_120h`, points: 80 },
    { label: '居宅外就労（月20日以上）月100〜120時間未満', value: `${prefix}_20d_100h`, points: 70 },
    { label: '居宅外就労（月20日以上）月80〜100時間未満', value: `${prefix}_20d_80h`, points: 60 },
    // 居宅外就労（月16日以上20日未満）
    { label: '居宅外就労（月16〜20日）月128時間以上', value: `${prefix}_16d_128h`, points: 80 },
    { label: '居宅外就労（月16〜20日）月112〜128時間未満', value: `${prefix}_16d_112h`, points: 70 },
    { label: '居宅外就労（月16〜20日）月96〜112時間未満', value: `${prefix}_16d_96h`, points: 60 },
    { label: '居宅外就労（月16〜20日）月80〜96時間未満', value: `${prefix}_16d_80h`, points: 50 },
    { label: '居宅外就労（月16〜20日）月64〜80時間未満', value: `${prefix}_16d_64h`, points: 40 },
    { label: '居宅外就労（月16〜20日未満）その他', value: `${prefix}_16d_other`, points: 30 },
    // 内職
    { label: '内職（週4日以上・月64時間以上）', value: `${prefix}_piece_64h`, points: 35 },
    { label: '内職（その他）', value: `${prefix}_piece_other`, points: 20 },
    // 出産
    { label: '出産（産前8週・産後8週）', value: `${prefix}_birth`, points: 50 },
    // 疾病
    { label: '疾病（入院・寝たきり）', value: `${prefix}_illness_severe`, points: 100 },
    { label: '疾病（その他）', value: `${prefix}_illness_other`, points: 80 },
    // 障がい
    { label: '障がい（1〜2級）', value: `${prefix}_disability_severe`, points: 100 },
    { label: '障がい（その他等級）', value: `${prefix}_disability_other`, points: 80 },
    // 介護・看護
    { label: '介護・看護（要介護4〜5相当）', value: `${prefix}_care_severe`, points: 100 },
    { label: '介護・看護（要介護2〜3相当）', value: `${prefix}_care_moderate`, points: 80 },
    { label: '介護・看護（その他）', value: `${prefix}_care_other`, points: 40 },
    // その他の事由
    { label: '災害', value: `${prefix}_disaster`, points: 100 },
    { label: '不存（死別・行方不明等）', value: `${prefix}_absent`, points: 100 },
    { label: '虐待・DV・里親', value: `${prefix}_abuse`, points: 100 },
    { label: '就学等', value: `${prefix}_education`, points: 0 },
    { label: '求職活動中', value: `${prefix}_seeking`, points: 15 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育が必要な主な事由`,
      helpText: '就労日数・時間に応じた区分を選択してください',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_multiple_newborn',
    category: 'adjustment',
    label: '同一世帯から2人以上が新規入所申請していますか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+5点）', value: 'adj_mn_yes', points: 5 },
      { label: 'いいえ', value: 'adj_mn_no', points: 0 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが同じ施設に継続して入所していますか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+20点）', value: 'adj_sib_yes', points: 20 },
      { label: 'いいえ', value: 'adj_sib_no', points: 0 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭（死亡・離別・未婚等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+20点）', value: 'adj_sp_yes', points: 20 },
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
    ],
  },
  {
    id: 'adj_livelihood',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+10点）', value: 'adj_lh_yes', points: 10 },
      { label: 'いいえ', value: 'adj_lh_no', points: 0 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が保育士資格を有し、保育施設等に在職または就職予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+30点）', value: 'adj_nw_yes', points: 30 },
      { label: 'いいえ', value: 'adj_nw_no', points: 0 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業後の復職による再入所申請ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+20点）', value: 'adj_pl_yes', points: 20 },
      { label: 'いいえ', value: 'adj_pl_no', points: 0 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就職が内定していますか？',
    inputType: 'radio',
    options: [
      { label: 'はい（-5点）', value: 'adj_jo_yes', points: -5 },
      { label: 'いいえ', value: 'adj_jo_no', points: 0 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母（65歳未満）の人数',
    helpText: '1人につき-5点が減算されます',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_gp_0', points: 0 },
      { label: '1人（-5点）', value: 'adj_gp_1', points: -5 },
      { label: '2人（-10点）', value: 'adj_gp_2', points: -10 },
    ],
  },
  {
    id: 'adj_facility_change',
    category: 'adjustment',
    label: '施設変更の事由',
    inputType: 'select',
    options: [
      { label: 'なし', value: 'adj_fc_none', points: 0 },
      { label: '施設変更（通常）（-5点）', value: 'adj_fc_normal', points: -5 },
      { label: '認可保育所等の閉所に伴う変更（+43点）', value: 'adj_fc_closure_authorized', points: 43 },
      { label: '認可外施設の閉所に伴う変更（+23点）', value: 'adj_fc_closure_unauthorized', points: 23 },
      { label: '地域型保育事業の卒園に伴う変更（+43点）', value: 'adj_fc_community_transition', points: 43 },
    ],
  },
  {
    id: 'adj_withdrawal',
    category: 'adjustment',
    label: '同一年度の自己都合による辞退後の再申請ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（-20点）', value: 'adj_wd_yes', points: -20 },
      { label: 'いいえ', value: 'adj_wd_no', points: 0 },
    ],
  },
];

export const kogaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
