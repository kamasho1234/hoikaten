import type { MunicipalityData, Question } from '../types';

// 出典: https://www1.g-reiki.net/kanra/reiki_honbun/e240RG00001010.html
// 甘楽町保育所等入所選考基準要綱（別表第1・別表第2・別表第3）
// 計算方式: sum方式（父・母それぞれの基準点数の合算＋調整点数）
// 最高基本点数: 10

const municipality = {
  id: 'kanra',
  name: '甘楽町',
  slug: 'kanra',
  prefecture: '群馬県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions: { label: string; value: string; points: number }[] = [
    // 就労（居宅外）
    { label: '就労・居宅外（月160時間以上）', value: `${prefix}_out_160h`, points: 10 },
    { label: '就労・居宅外（月140〜160時間未満）', value: `${prefix}_out_140h`, points: 9 },
    { label: '就労・居宅外（月120〜140時間未満）', value: `${prefix}_out_120h`, points: 8 },
    { label: '就労・居宅外（月100〜120時間未満）', value: `${prefix}_out_100h`, points: 7 },
    { label: '就労・居宅外（月80〜100時間未満）', value: `${prefix}_out_80h`, points: 6 },
    { label: '就労・居宅外（月60〜80時間未満）', value: `${prefix}_out_60h`, points: 5 },
    { label: '就労・居宅外（月48〜60時間未満）', value: `${prefix}_out_48h`, points: 4 },
    // 就労（自営・農業・内職）
    { label: '就労・自営業/農業/内職（月160時間以上）', value: `${prefix}_self_160h`, points: 9 },
    { label: '就労・自営業/農業/内職（月140〜160時間未満）', value: `${prefix}_self_140h`, points: 8 },
    { label: '就労・自営業/農業/内職（月120〜140時間未満）', value: `${prefix}_self_120h`, points: 7 },
    { label: '就労・自営業/農業/内職（月100〜120時間未満）', value: `${prefix}_self_100h`, points: 6 },
    { label: '就労・自営業/農業/内職（月80〜100時間未満）', value: `${prefix}_self_80h`, points: 5 },
    { label: '就労・自営業/農業/内職（月60〜80時間未満）', value: `${prefix}_self_60h`, points: 4 },
    { label: '就労・自営業/農業/内職（月48〜60時間未満）', value: `${prefix}_self_48h`, points: 3 },
    // 妊娠・出産
    { label: '妊娠・出産（出産予定日前後8週の月）', value: `${prefix}_birth`, points: 8 },
    // 疾病
    { label: '疾病・入院（1か月以上の入院予定）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病・居宅（起居困難で保育不可）', value: `${prefix}_ill_heavy`, points: 8 },
    { label: '疾病・居宅（身辺処理可だが保育不可）', value: `${prefix}_ill_mid`, points: 6 },
    { label: '疾病・居宅（症状改善のため保育不推奨）', value: `${prefix}_ill_light`, points: 4 },
    // 障害
    { label: '障害（身体1〜2級・精神1〜2級・療育手帳A等）', value: `${prefix}_dis_heavy`, points: 10 },
    { label: '障害（身体3級・精神3級・療育手帳B等）', value: `${prefix}_dis_mid`, points: 8 },
    { label: '障害（その他）', value: `${prefix}_dis_light`, points: 6 },
    // 介護・看護
    { label: '介護・看護（月20日以上・週40時間以上）', value: `${prefix}_care_w40h`, points: 9 },
    { label: '介護・看護（月16日以上・週25時間以上）', value: `${prefix}_care_w25h`, points: 7 },
    { label: '介護・看護（月48時間以上）', value: `${prefix}_care_48h`, points: 5 },
    { label: '介護・看護（その他）', value: `${prefix}_care_other`, points: 3 },
    // 災害復旧
    { label: '災害復旧（常時復旧作業が必要）', value: `${prefix}_disaster_heavy`, points: 10 },
    { label: '災害復旧（日数・時間程度の作業が必要）', value: `${prefix}_disaster_mid`, points: 8 },
    { label: '災害復旧（その他）', value: `${prefix}_disaster_light`, points: 4 },
    // 虐待・DV
    { label: '虐待・DVを受けている、またはそのおそれ', value: `${prefix}_dv`, points: 10 },
    // 就学
    { label: '就学（月120時間以上）', value: `${prefix}_school_120h`, points: 8 },
    { label: '就学（月48時間以上）', value: `${prefix}_school_48h`, points: 6 },
    // 求職
    { label: '求職活動中', value: `${prefix}_seek`, points: 2 },
    // 育児休業
    { label: '育児休業中（施設継続利用希望）', value: `${prefix}_ikuji`, points: 8 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（別表第1）',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_family_type',
    category: 'adjustment',
    label: 'ひとり親・生活保護（調整点数）',
    helpText: '最も当てはまるものを1つ選んでください（別表第2）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（死別・離別・未婚等）（+12点）', value: 'adj_ft_single', points: 12 },
      { label: '生活保護世帯（+5点）', value: 'adj_ft_seikatsuhogo', points: 5 },
      { label: '該当なし', value: 'adj_ft_none', points: 0 },
    ],
  },
  {
    id: 'adj_tansin',
    category: 'adjustment',
    label: '単身赴任・海外勤務（調整点数）',
    inputType: 'radio',
    options: [
      { label: '父母いずれかが単身赴任または海外勤務中（+2点）', value: 'adj_ts_yes', points: 2 },
      { label: '該当なし', value: 'adj_ts_none', points: 0 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用児童の障害（調整点数）',
    inputType: 'radio',
    options: [
      { label: '利用を希望する子どもが障害手帳等を所持（+2点）', value: 'adj_cd_yes', points: 2 },
      { label: '該当なし', value: 'adj_cd_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_return',
    category: 'adjustment',
    label: '育児休業明け復帰（調整点数）',
    inputType: 'radio',
    options: [
      { label: '育児休業明けの復職申込（+3点）', value: 'adj_ir_yes', points: 3 },
      { label: '該当なし', value: 'adj_ir_none', points: 0 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの在園・同時申込状況（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが同一施設に在園中（+5点）', value: 'adj_sib_in', points: 5 },
      { label: 'きょうだいの同時申込（+3点）', value: 'adj_sib_sim', points: 3 },
      { label: '該当なし', value: 'adj_sib_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士としての就労予定（調整点数）',
    inputType: 'radio',
    options: [
      { label: '父母いずれかが保育士として保育所等へ就労予定（+3点）', value: 'adj_hs_yes', points: 3 },
      { label: '該当なし', value: 'adj_hs_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikuryou_tainou',
    category: 'adjustment',
    label: '保育料滞納（調整点数）',
    inputType: 'radio',
    options: [
      { label: '保育料の滞納がある（-5点）', value: 'adj_ht_yes', points: -5 },
      { label: '該当なし', value: 'adj_ht_none', points: 0 },
    ],
  },
];

export const kanraData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
