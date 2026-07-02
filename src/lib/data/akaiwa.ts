import type { MunicipalityData } from '../types';

// 出典: 赤磐市保育施設利用の手引き（令和8年度）「2. 保育利用調整」基本点数表・調整点数表
// https://www.city.akaiwa.lg.jp/material/files/group/16/507100151.pdf

const municipality = {
  id: 'akaiwa',
  name: '赤磐市',
  slug: 'akaiwa',
  prefecture: '岡山県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

const baseOptions = (prefix: string) => [
  { label: 'なし（保育の必要性なし）', value: `${prefix}_none`, points: 0 },
  { label: '外勤・就学（月160時間以上）', value: `${prefix}_work_160`, points: 10 },
  { label: '外勤・就学（月140〜160時間未満）', value: `${prefix}_work_140`, points: 9 },
  { label: '外勤・就学（月120〜140時間未満）', value: `${prefix}_work_120`, points: 8 },
  { label: '外勤・就学（月100〜120時間未満）', value: `${prefix}_work_100`, points: 7 },
  { label: '外勤・就学（月80〜100時間未満）', value: `${prefix}_work_80`, points: 5 },
  { label: '外勤・就学（月48〜80時間未満）', value: `${prefix}_work_48`, points: 4 },
  { label: '在宅勤務・居宅内自営（月160時間以上）', value: `${prefix}_selfwork_160`, points: 9 },
  { label: '在宅勤務・居宅内自営（月140〜160時間未満）', value: `${prefix}_selfwork_140`, points: 8 },
  { label: '在宅勤務・居宅内自営（月120〜140時間未満）', value: `${prefix}_selfwork_120`, points: 7 },
  { label: '在宅勤務・居宅内自営（月100〜120時間未満）', value: `${prefix}_selfwork_100`, points: 6 },
  { label: '在宅勤務・居宅内自営（月80〜100時間未満）', value: `${prefix}_selfwork_80`, points: 4 },
  { label: '在宅勤務・居宅内自営（月48〜80時間未満）', value: `${prefix}_selfwork_48`, points: 3 },
  { label: '内職（月120時間以上）', value: `${prefix}_piecework_120`, points: 5 },
  { label: '内職（月60〜120時間未満）', value: `${prefix}_piecework_60`, points: 3 },
  { label: '内職（月48〜60時間未満）', value: `${prefix}_piecework_48`, points: 2 },
  { label: '妊娠・出産（出産予定月の前後3か月以内）', value: `${prefix}_birth`, points: 6 },
  { label: '疾病（1か月以上入院）', value: `${prefix}_illness_10`, points: 10 },
  { label: '疾病（居宅内1か月以上安静）', value: `${prefix}_illness_8`, points: 8 },
  { label: '疾病（通院加療が必要）', value: `${prefix}_illness_3`, points: 3 },
  { label: '障害（身体障害1・2級等・重度）', value: `${prefix}_disability_10`, points: 10 },
  { label: '障害（身体障害3級等・中度）', value: `${prefix}_disability_6`, points: 6 },
  { label: '障害（身体障害4〜6級等・軽度）', value: `${prefix}_disability_3`, points: 3 },
  { label: '親族の介護・看護（月160時間以上相当）', value: `${prefix}_care_10`, points: 10 },
  { label: '親族の介護・看護（月140〜160時間未満相当）', value: `${prefix}_care_9`, points: 9 },
  { label: '親族の介護・看護（月120〜140時間未満相当）', value: `${prefix}_care_8`, points: 8 },
  { label: '親族の介護・看護（月100〜120時間未満相当）', value: `${prefix}_care_7`, points: 7 },
  { label: '親族の介護・看護（月80〜100時間未満相当）', value: `${prefix}_care_5`, points: 5 },
  { label: '親族の介護・看護（月48〜80時間未満相当）', value: `${prefix}_care_4`, points: 4 },
  { label: '災害（被災による保育困難）', value: `${prefix}_disaster`, points: 10 },
  { label: '求職活動中・起業準備中', value: `${prefix}_jobsearch`, points: 2 },
  { label: '社会的養護（児童虐待・DV・里親委託）', value: `${prefix}_abuse`, points: 10 },
  { label: '育児休業中（次年度就学予定・環境変化が好ましくない場合）', value: `${prefix}_childcare_leave`, points: 10 },
  { label: '父母不存在（死亡・拘禁・行方不明・離婚等）', value: `${prefix}_absent`, points: 10 },
];

export const akaiwaData: MunicipalityData = {
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
      label: '世帯・家族の状況（調整点数）',
      helpText: '該当するものを1つ選んでください（複数該当は合算されますが、最も高いもの1つを選択してください）。',
      inputType: 'select',
      options: [
        { label: '該当なし', value: 'adj_none', points: 0 },
        { label: '兄弟姉妹が同一施設を利用希望', value: 'adj_sibling', points: 10 },
        { label: '保育士等として勤務（認可保育施設等）', value: 'adj_nursery', points: 10 },
        { label: '小学校区内への転園が必要', value: 'adj_transfer', points: 10 },
        { label: 'ひとり親世帯', value: 'adj_single_parent', points: 3 },
        { label: '生活保護受給世帯', value: 'adj_welfare', points: 1 },
        { label: '入所児童に障害がある', value: 'adj_child_disabled', points: 1 },
      ],
    },
  ],
};
