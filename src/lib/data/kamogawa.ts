import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.kamogawa.lg.jp/reiki/reiki_honbun/r102RG00000931.html
// 鴨川市教育・保育施設等の利用調整等に関する規則 別表第1・別表第2
// 計算方式: sum方式
// 最高基本点数: 10

const municipality = {
  id: 'kamogawa',
  name: '鴨川市',
  slug: 'kamogawa',
  prefecture: '千葉県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
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
    { label: '就労（月160時間以上）', value: `${prefix}_work_160h`, points: 10 },
    { label: '就労（月140〜160時間未満）', value: `${prefix}_work_140h`, points: 9 },
    { label: '就労（月120〜140時間未満）', value: `${prefix}_work_120h`, points: 8 },
    { label: '就労（月100〜120時間未満）', value: `${prefix}_work_100h`, points: 7 },
    { label: '就労（月80〜100時間未満）', value: `${prefix}_work_80h`, points: 6 },
    { label: '就労（月64〜80時間未満）', value: `${prefix}_work_64h`, points: 5 },
    { label: '妊娠・出産', value: `${prefix}_pregnancy`, points: 7 },
    { label: '疾病（入院1か月以上）', value: `${prefix}_illness_hospital_1m`, points: 10 },
    { label: '疾病（在宅安静加療1か月以上）', value: `${prefix}_illness_home_rest_1m`, points: 7 },
    { label: '障害（身体1〜2級・療育手帳上位等）', value: `${prefix}_disability_grade_1_2`, points: 10 },
    { label: '障害（身体3〜6級・療育手帳下位等）', value: `${prefix}_disability_grade_3_6`, points: 7 },
    { label: 'その他保育が困難な状態', value: `${prefix}_other_childcare_difficulty`, points: 5 },
    { label: '介護・看護（要介護4〜5）', value: `${prefix}_care_grade_4_5`, points: 10 },
    { label: '介護・看護（要介護3）', value: `${prefix}_care_grade_3`, points: 7 },
    { label: '介護・看護（同程度の障害・上位）', value: `${prefix}_care_disability_upper`, points: 10 },
    { label: '介護・看護（同程度の障害・下位）', value: `${prefix}_care_disability_lower`, points: 7 },
    { label: '介護・看護（入院付添）', value: `${prefix}_care_hospital_attendance`, points: 5 },
    { label: '介護・看護（その他）', value: `${prefix}_care_other`, points: 4 },
    { label: '災害復旧', value: `${prefix}_disaster`, points: 10 },
    { label: '求職活動', value: `${prefix}_job_seeking`, points: 3 },
    { label: '就学', value: `${prefix}_education`, points: 5 },
    { label: '虐待・DV等', value: `${prefix}_abuse`, points: 10 },
    { label: '育児休業中（継続利用希望）', value: `${prefix}_childcare_leave`, points: 5 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_family_type',
    category: 'adjustment',
    label: 'ひとり親・生活保護（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（+13点）', value: 'adj_family_type_single_parent', points: 13 },
      { label: '生活保護世帯（+5点）', value: 'adj_family_type_welfare', points: 5 },
      { label: '該当なし', value: 'adj_family_type_none', points: 0 },
    ],
  },
  {
    id: 'adj_siblings',
    category: 'adjustment',
    label: 'きょうだいの状況（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが在園中（+2点）', value: 'adj_siblings_sibling_enrolled', points: 2 },
      { label: 'きょうだいの同時申込（+2点）', value: 'adj_siblings_sibling_simultaneous', points: 2 },
      { label: '該当なし', value: 'adj_siblings_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士就労（調整点数）',
    inputType: 'radio',
    options: [
      { label: '保育士資格を持ち市内で保育士として就労（+15点）', value: 'adj_hoikushi_worker_city', points: 15 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_residence',
    category: 'adjustment',
    label: '居住地（調整点数）',
    inputType: 'radio',
    options: [
      { label: '市外在住（-5点）', value: 'adj_residence_non_resident', points: -5 },
      { label: '該当なし', value: 'adj_residence_none', points: 0 },
    ],
  },
];

export const kamogawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
