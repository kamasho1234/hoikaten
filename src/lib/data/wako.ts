import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 和光市（埼玉県）保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/wako/reiki_honbun/e330RG00000737.html
// 和光市保育の必要性の認定に関する条例施行規則（別表第2・第3・第4）
// 計算方式: sum方式（保護者2人の基準指数を合算）
// 最高基準指数: 30点（週5日以上・日8時間以上就労、または疾病入院等）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'wako',
  name: '和光市',
  slug: 'wako',
  prefecture: '埼玉県',
  maxBasePoints: 30,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 週5日以上 × 就労時間
    { label: '就労・週5日以上で日8時間以上', value: `${prefix}_w5_h8`, points: 30 },
    { label: '就労・週5日以上で日7〜8時間未満', value: `${prefix}_w5_h7`, points: 29 },
    { label: '就労・週5日以上で日6〜7時間未満', value: `${prefix}_w5_h6`, points: 28 },
    { label: '就労・週5日以上で日5〜6時間未満', value: `${prefix}_w5_h5`, points: 27 },
    { label: '就労・週5日以上で日4〜5時間未満', value: `${prefix}_w5_h4`, points: 26 },
    // 週4日以上 × 就労時間
    { label: '就労・週4日以上で日8時間以上', value: `${prefix}_w4_h8`, points: 28 },
    { label: '就労・週4日以上で日7〜8時間未満', value: `${prefix}_w4_h7`, points: 27 },
    { label: '就労・週4日以上で日6〜7時間未満', value: `${prefix}_w4_h6`, points: 26 },
    { label: '就労・週4日以上で日5〜6時間未満', value: `${prefix}_w4_h5`, points: 25 },
    { label: '就労・週4日以上で日4〜5時間未満', value: `${prefix}_w4_h4`, points: 24 },
    // 週3日以上 × 就労時間
    { label: '就労・週3日以上で日8時間以上', value: `${prefix}_w3_h8`, points: 26 },
    { label: '就労・週3日以上で日7〜8時間未満', value: `${prefix}_w3_h7`, points: 25 },
    { label: '就労・週3日以上で日6〜7時間未満', value: `${prefix}_w3_h6`, points: 24 },
    { label: '就労・週3日以上で日5〜6時間未満', value: `${prefix}_w3_h5`, points: 23 },
    { label: '就労・週3日以上で日4〜5時間未満', value: `${prefix}_w3_h4`, points: 22 },
    // 内職
    { label: '内職（月12日以上・日4時間以上）', value: `${prefix}_naishoku`, points: 15 },
    // 妊娠・出産
    { label: '妊娠中（出産予定月が入園希望月±2月以内）', value: `${prefix}_preg`, points: 25 },
    { label: '産後回復中（出産予定月が入園希望月の3月以上後）', value: `${prefix}_birth`, points: 15 },
    // 疾病（居宅のみ）
    { label: '疾病（精神性・感染性疾患、常時臥床で3月以上加療）', value: `${prefix}_ill_sev`, points: 30 },
    { label: '疾病（1月以上通院、常時安静が必要）', value: `${prefix}_ill_mod`, points: 27 },
    { label: '疾病（その他1月以上加療が必要）', value: `${prefix}_ill_other`, points: 22 },
    // 障害
    { label: '障害（身体1〜2級、精神1〜3級、療育手帳A・A・B）', value: `${prefix}_dis_sev`, points: 30 },
    { label: '障害（身体3級、療育手帳C）', value: `${prefix}_dis_mod`, points: 26 },
    { label: '障害（身体4級）', value: `${prefix}_dis_other`, points: 24 },
    // 求職
    { label: '求職活動中', value: `${prefix}_seek`, points: 10 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_cohabiter',
    category: 'adjustment',
    label: '傷病・障害を有する同居人（調整指数・別表第3）',
    helpText: '該当する場合は選択してください',
    inputType: 'radio',
    options: [
      { label: '同居人が傷病・障害を有する（+1点）', value: 'adj_cohabiter_ill', points: 1 },
      { label: '該当なし', value: 'adj_cohabiter_none', points: 0 },
    ],
  },
  {
    id: 'adj_resign',
    category: 'adjustment',
    label: '入園辞退歴（調整指数・別表第3）',
    helpText: '該当する場合は選択してください',
    inputType: 'radio',
    options: [
      { label: '過去に入園辞退の実績がある（-2点）', value: 'adj_resign_yes', points: -2 },
      { label: '該当なし', value: 'adj_resign_no', points: 0 },
    ],
  },
  {
    id: 'adj_seek',
    category: 'adjustment',
    label: '求職活動（調整指数・別表第3）',
    helpText: '該当する場合は選択してください',
    inputType: 'radio',
    options: [
      { label: '求職活動中で同居の18〜65歳者がいる（-1点）', value: 'adj_seek_yes', points: -1 },
      { label: '該当なし', value: 'adj_seek_no', points: 0 },
    ],
  },
  {
    id: 'adj_unpaid',
    category: 'adjustment',
    label: '保育料滞納（調整指数・別表第3）',
    helpText: '該当する場合は選択してください',
    inputType: 'radio',
    options: [
      { label: '保育料の滞納で督促を受けている（-10点）', value: 'adj_unpaid_yes', points: -10 },
      { label: '該当なし', value: 'adj_unpaid_no', points: 0 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転入手続き（調整指数・別表第3）',
    helpText: '該当する場合は選択してください',
    inputType: 'radio',
    options: [
      { label: '転入予定者で住所確認書類が未提出（-10点）', value: 'adj_transfer_yes', points: -10 },
      { label: '該当なし', value: 'adj_transfer_no', points: 0 },
    ],
  },
];

export const wakoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
