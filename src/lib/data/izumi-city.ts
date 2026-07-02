import type { MunicipalityData } from '../types';

// 出典: 出水市保育所等入所事務取扱要綱 別表第2（基本指数表）・別表第3（調整指数表）
// https://www.city.kagoshima-izumi.lg.jp/reiki_int/reiki_honbun/r334RG00001257.html

const municipality = {
  id: 'izumi-city',
  name: '出水市',
  slug: 'izumi-city',
  prefecture: '鹿児島県',
  maxBasePoints: 200,
  scoringMethod: 'sum',
} as const;

const baseOptions = (prefix: string) => [
  { label: 'なし（保育の必要性なし）', value: `${prefix}_none`, points: 0 },
  { label: '就労・月160時間（週40時間）以上', value: `${prefix}_work_100`, points: 100 },
  { label: '就労・月140時間（週35時間）以上', value: `${prefix}_work_90`, points: 90 },
  { label: '就労・月120時間（週30時間）以上', value: `${prefix}_work_80`, points: 80 },
  { label: '就労・月100時間（週25時間）以上', value: `${prefix}_work_70`, points: 70 },
  { label: '就労・月80時間（週20時間）以上', value: `${prefix}_work_60`, points: 60 },
  { label: '就労・月48時間以上', value: `${prefix}_work_50`, points: 50 },
  { label: '妊娠中または出産後間がない', value: `${prefix}_pregnancy`, points: 70 },
  { label: '疾病・負傷（1か月以上の入院または常時病臥）', value: `${prefix}_illness_100`, points: 100 },
  { label: '疾病・負傷（常時安静等で保育困難）', value: `${prefix}_illness_90`, points: 90 },
  { label: '疾病・負傷（その他）', value: `${prefix}_illness_80`, points: 80 },
  { label: '心身障害（身体1・2級、療育手帳、精神1・2級）', value: `${prefix}_disability_100`, points: 100 },
  { label: '心身障害（その他の手帳所持者）', value: `${prefix}_disability_80`, points: 80 },
  { label: '常時介護・看護（重度対象者：身体1・2級、療育手帳、精神1〜3級、要介護等）', value: `${prefix}_care_100`, points: 100 },
  { label: '介護・看護（要支援・長期入院等の親族）', value: `${prefix}_care_70`, points: 70 },
  { label: '在学・職業訓練（週40時間以上）', value: `${prefix}_school_100`, points: 100 },
  { label: '在学・職業訓練（週35時間以上）', value: `${prefix}_school_90`, points: 90 },
  { label: '在学・職業訓練（週30時間以上）', value: `${prefix}_school_80`, points: 80 },
  { label: '在学・職業訓練（週25時間以上）', value: `${prefix}_school_70`, points: 70 },
  { label: '在学・職業訓練（週20時間以上）', value: `${prefix}_school_60`, points: 60 },
  { label: '在学・職業訓練（月48時間以上）', value: `${prefix}_school_50`, points: 50 },
  { label: '求職活動中（起業準備を含む）', value: `${prefix}_job_search`, points: 50 },
  { label: '災害復旧', value: `${prefix}_disaster`, points: 100 },
];

export const izumiCityData: MunicipalityData = {
  municipality,
  questions: [
    {
      id: 'parent1_base',
      category: 'parent1_base',
      label: '父（保護者1）の状況',
      inputType: 'select',
      options: baseOptions('p1'),
    },
    {
      id: 'parent2_base',
      category: 'parent2_base',
      label: '母（保護者2）の状況',
      inputType: 'select',
      options: baseOptions('p2'),
    },
    {
      id: 'adjustment_household',
      category: 'adjustment',
      label: '世帯の状況',
      inputType: 'select',
      options: [
        { label: '該当なし', value: 'adj_hh_none', points: 0 },
        { label: 'ひとり親家庭または配偶者が外国在住', value: 'adj_single_parent', points: 160 },
        { label: '生活保護世帯（就労により自立が見込まれる）', value: 'adj_welfare', points: 2 },
      ],
    },
    {
      id: 'adjustment_sibling_enrollment',
      category: 'adjustment',
      label: '兄弟姉妹の入所状況',
      inputType: 'select',
      options: [
        { label: '該当なし', value: 'adj_sib_none', points: 0 },
        { label: '兄弟姉妹が既に入所している施設を希望', value: 'adj_sibling', points: 70 },
        { label: '同一施設同時入所希望（多胎）', value: 'adj_twins', points: 65 },
        { label: '同一施設同時入所希望（多胎以外）', value: 'adj_siblings_same', points: 60 },
      ],
    },
    {
      id: 'adjustment_postpartum_work',
      category: 'adjustment',
      label: '産後の就労予定',
      inputType: 'select',
      options: [
        { label: '該当なし', value: 'adj_pp_none', points: 0 },
        { label: '産後3か月以内に就労', value: 'adj_pp_3m', points: 3 },
        { label: '産後4か月以内に就労', value: 'adj_pp_4m', points: 2 },
        { label: '産後5か月以内に就労', value: 'adj_pp_5m', points: 1 },
      ],
    },
    {
      id: 'adjustment_child_condition',
      category: 'adjustment',
      label: '入所希望児の状況',
      inputType: 'select',
      options: [
        { label: '該当なし', value: 'adj_child_none', points: 0 },
        { label: '入所希望児に重度の障害がある', value: 'adj_child_severe', points: 3 },
        { label: '入所希望児に軽度の障害がある', value: 'adj_child_mild', points: 2 },
        { label: '入所希望児が療育施設等に通所している', value: 'adj_child_ryoiku', points: 1 },
      ],
    },
    {
      id: 'adjustment_preschool_siblings',
      category: 'adjustment',
      label: '未就学のきょうだいの人数',
      inputType: 'select',
      options: [
        { label: '該当なし', value: 'adj_ps_none', points: 0 },
        { label: '未就学児が3人以上', value: 'adj_ps_3', points: 3 },
        { label: '未就学児が2人', value: 'adj_ps_2', points: 2 },
        { label: '未就学児が1人', value: 'adj_ps_1', points: 1 },
      ],
    },
    {
      id: 'adjustment_sibling_condition',
      category: 'adjustment',
      label: 'きょうだいの状況',
      inputType: 'select',
      options: [
        { label: '該当なし', value: 'adj_sc_none', points: 0 },
        { label: '多胎で生まれた未就学児がいる', value: 'adj_sc_twins', points: 2 },
        { label: '兄弟姉妹に障害がある（常時介護対象外）', value: 'adj_sc_disabled', points: 2 },
      ],
    },
    {
      id: 'adjustment_other',
      category: 'adjustment',
      label: 'その他の状況',
      inputType: 'select',
      options: [
        { label: '該当なし', value: 'adj_other_none', points: 0 },
        { label: '単身赴任', value: 'adj_transfer', points: 10 },
        { label: '保育料の滞納（3か月以上）', value: 'adj_arrears', points: -20 },
      ],
    },
  ],
};
