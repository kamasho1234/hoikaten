import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.togane.chiba.jp/reiki/d1w_reiki/H427902100018/print.html
// 東金市保育の利用に関する規則 別表第1（利用基準）・別表第2（調整基準）
// 計算方式: min方式
// 最高基本点数: 60

const municipality = {
  id: 'tougane',
  name: '東金市',
  slug: 'tougane',
  prefecture: '千葉県',
  maxBasePoints: 60,
  scoringMethod: 'min',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください',
      inputType: 'select',
      options: [
    { label: '就労（月20日以上・月160時間以上）', value: `${prefix}_work_20d_160h`, points: 50 },
    { label: '就労（月20日以上・月140〜160時間未満）', value: `${prefix}_work_20d_140h`, points: 44 },
    { label: '就労（月20日以上・月120〜140時間未満）', value: `${prefix}_work_20d_120h`, points: 38 },
    { label: '就労（月20日以上・月100〜120時間未満）', value: `${prefix}_work_20d_100h`, points: 31 },
    { label: '就労（月20日以上・月80〜100時間未満）', value: `${prefix}_work_20d_80h`, points: 25 },
    { label: '就労（月16〜20日未満・月160時間以上）', value: `${prefix}_work_16d_160h`, points: 40 },
    { label: '就労（月16〜20日未満・月140〜160時間未満）', value: `${prefix}_work_16d_140h`, points: 35 },
    { label: '就労（月16〜20日未満・月120〜140時間未満）', value: `${prefix}_work_16d_120h`, points: 30 },
    { label: '就労（月16〜20日未満・月100〜120時間未満）', value: `${prefix}_work_16d_100h`, points: 25 },
    { label: '就労（月16〜20日未満・月80〜100時間未満）', value: `${prefix}_work_16d_80h`, points: 20 },
    { label: '就労（その他・月60時間以上）', value: `${prefix}_work_other_60h`, points: 19 },
    { label: '妊娠・出産', value: `${prefix}_pregnancy`, points: 50 },
    { label: '疾病（入院1か月以上）', value: `${prefix}_illness_hospital`, points: 50 },
    { label: '疾病（常時寝たきり療養）', value: `${prefix}_illness_bedridden`, points: 50 },
    { label: '疾病（その他日常生活に支障）', value: `${prefix}_illness_other`, points: 39 },
    { label: '障害（障害者手帳1・2級）', value: `${prefix}_disability_1_2`, points: 50 },
    { label: '障害（その他）', value: `${prefix}_disability_other`, points: 39 },
    { label: '介護・看護（手帳1・2級の親族と同居し常時介護）', value: `${prefix}_care_family_1_2`, points: 50 },
    { label: '介護・看護（その他の障害の親族と同居し常時介護）', value: `${prefix}_care_family_other`, points: 39 },
    { label: '介護・看護（1か月以上入院する親族の付添）', value: `${prefix}_care_hospital`, points: 44 },
    { label: '介護・看護（その他）', value: `${prefix}_care_other`, points: 25 },
    { label: '災害復旧従事', value: `${prefix}_disaster`, points: 50 },
    { label: '求職活動', value: `${prefix}_job_seeking`, points: 8 },
    { label: '就学・通学通所（月20日以上・月160時間以上／就労に準じる）', value: `${prefix}_school_20d_160h`, points: 50 },
    { label: '就学・通学通所（月20日以上・月140〜160時間未満）', value: `${prefix}_school_20d_140h`, points: 44 },
    { label: '就学・通学通所（月20日以上・月120〜140時間未満）', value: `${prefix}_school_20d_120h`, points: 38 },
    { label: '就学・通学通所（月20日以上・月100〜120時間未満）', value: `${prefix}_school_20d_100h`, points: 31 },
    { label: '就学・通学通所（月20日以上・月80〜100時間未満）', value: `${prefix}_school_20d_80h`, points: 25 },
    { label: '就学・通学通所（月16〜20日未満・月160時間以上）', value: `${prefix}_school_16d_160h`, points: 40 },
    { label: '就学・通学通所（月16〜20日未満・月140〜160時間未満）', value: `${prefix}_school_16d_140h`, points: 35 },
    { label: '就学・通学通所（月16〜20日未満・月120〜140時間未満）', value: `${prefix}_school_16d_120h`, points: 30 },
    { label: '就学・通学通所（月16〜20日未満・月100〜120時間未満）', value: `${prefix}_school_16d_100h`, points: 25 },
    { label: '就学・通学通所（月16〜20日未満・月80〜100時間未満）', value: `${prefix}_school_16d_80h`, points: 20 },
    { label: '就学・通学通所（その他・月60時間以上）', value: `${prefix}_school_other_60h`, points: 19 },
    { label: '虐待・DV', value: `${prefix}_abuse_dv`, points: 60 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_family_type',
    category: 'adjustment',
    label: '世帯類型（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（18〜65歳の同居家族なし）（+10点）', value: 'adj_family_type_single_alone', points: 10 },
      { label: 'ひとり親世帯（18〜65歳の同居家族あり）（+6点）', value: 'adj_family_type_single_with', points: 6 },
      { label: '配偶者と別居中（18〜65歳の同居家族なし）（+8点）', value: 'adj_family_type_separate_alone', points: 8 },
      { label: '配偶者と別居中（18〜65歳の同居家族あり）（+4点）', value: 'adj_family_type_separate_with', points: 4 },
      { label: '生活保護世帯（就労に該当する場合）（+4点）', value: 'adj_family_type_welfare', points: 4 },
      { label: '該当なし', value: 'adj_family_type_none', points: 0 },
    ],
  },
  {
    id: 'adj_siblings',
    category: 'adjustment',
    label: 'きょうだいの状況（調整点数）',
    inputType: 'radio',
    options: [
      { label: '家庭的保育・認可外の卒園児のきょうだい（+10点）', value: 'adj_siblings_graduated', points: 10 },
      { label: '在園中のきょうだいと同じ施設を希望（+7点）', value: 'adj_siblings_enrolled', points: 7 },
      { label: 'きょうだいの同時申込（+1点）', value: 'adj_siblings_simultaneous', points: 1 },
      { label: '該当なし', value: 'adj_siblings_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士就労（調整点数）',
    inputType: 'radio',
    options: [
      { label: '市内の保育所等で保育士等として就労（予定含む）（+20点）', value: 'adj_hoikushi_worker', points: 20 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_closed',
    category: 'adjustment',
    label: '廃止・休止施設（調整点数）',
    inputType: 'radio',
    options: [
      { label: '廃止・休止施設からの申込（+50点）', value: 'adj_closed_closed_facility', points: 50 },
      { label: '該当なし', value: 'adj_closed_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji',
    category: 'adjustment',
    label: '育児休業（調整点数）',
    inputType: 'radio',
    options: [
      { label: '産休・育休終了後の職場復帰予定（+10点）', value: 'adj_ikuji_return', points: 10 },
      { label: '希望施設が不可の場合は育休延長を容認（-50点）', value: 'adj_ikuji_extension', points: -50 },
      { label: '該当なし', value: 'adj_ikuji_none', points: 0 },
    ],
  },
  {
    id: 'adj_support',
    category: 'adjustment',
    label: '親族の支援（調整点数）',
    inputType: 'radio',
    options: [
      { label: '同居・近隣の18〜65歳の親族から支援を受けられる（-25点）', value: 'adj_support_family_support', points: -25 },
      { label: '該当なし', value: 'adj_support_none', points: 0 },
    ],
  },
  {
    id: 'adj_payment',
    category: 'adjustment',
    label: '保育料（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいの在園児・卒園児につき6か月以上の保育料滞納（-40点）', value: 'adj_payment_overdue', points: -40 },
      { label: '該当なし', value: 'adj_payment_none', points: 0 },
    ],
  },
];

export const touganeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
