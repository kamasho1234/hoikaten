import type { MunicipalityData, Question } from '../types';

// 出典: https://www1.g-reiki.net/hashima/reiki_honbun/i310RG00001536.html
// 羽島市保育施設の利用調整に関する要綱（別表第2・別表第3）
// 計算方式: min方式（「いずれか低いほうの保護者の点数により点数を定める」）
// 最高基本点数: 100点（月140時間以上就労）

const municipality = {
  id: 'hashima',
  name: '羽島市',
  slug: 'hashima',
  prefecture: '岐阜県',
  maxBasePoints: 100,
  scoringMethod: 'min',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 就労（月時間別）
    { label: '就労・月140時間以上', value: `${prefix}_work_140`, points: 100 },
    { label: '就労・月120〜140時間未満', value: `${prefix}_work_120`, points: 90 },
    { label: '就労・月100〜120時間未満', value: `${prefix}_work_100`, points: 80 },
    { label: '就労・月80〜100時間未満', value: `${prefix}_work_80`, points: 70 },
    { label: '就労・月64〜80時間未満', value: `${prefix}_work_64`, points: 60 },
    // 妊娠・出産
    { label: '妊娠・出産（出産前後8週間程度）', value: `${prefix}_birth`, points: 100 },
    // 疾病・障害
    { label: '疾病・入院（1か月以上）または常時臥床療養', value: `${prefix}_ill_hosp`, points: 100 },
    { label: '身体障害者手帳1・2級、精神保健福祉手帳1・2級、療育手帳A1・A2', value: `${prefix}_dis_heavy`, points: 100 },
    { label: '疾病・精神性疾患（安静加療）', value: `${prefix}_ill_mental`, points: 80 },
    { label: '疾病・通院加療（保育に支障）', value: `${prefix}_ill_visit`, points: 50 },
    { label: '疾病・その他障害手帳交付', value: `${prefix}_dis_other`, points: 50 },
    // 介護・看護
    { label: '介護・病院付添い（週5日以上）または障害児通所支援同伴（週3日以上）', value: `${prefix}_care_heavy`, points: 100 },
    { label: '介護・病院付添い（週3〜5日未満）', value: `${prefix}_care_mid`, points: 50 },
    { label: '介護・自宅介護', value: `${prefix}_care_home`, points: 30 },
    // 災害復旧
    { label: '災害復旧に従事', value: `${prefix}_disaster`, points: 100 },
    // 該当なし
    { label: '該当なし（在宅・求職活動等）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（別表第2）',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況（補正点数）',
    helpText: '最も当てはまる区分を1つ選んでください（別表第3）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親家庭または生活保護世帯（+25点）', value: 'adj_h_single', points: 25 },
      { label: '該当なし', value: 'adj_h_none', points: 0 },
    ],
  },
  {
    id: 'adj_nursery',
    category: 'adjustment',
    label: '保護者の勤務先（補正点数）',
    helpText: '保護者が保育所等の保育者として就労している場合（別表第3）',
    inputType: 'radio',
    options: [
      { label: '保護者が保育所・認定こども園等で保育者として就労（+15点）', value: 'adj_n_yes', points: 15 },
      { label: '該当なし', value: 'adj_n_none', points: 0 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '子どもの状況・兄弟姉妹（補正点数）',
    helpText: '最も当てはまる区分を1つ選んでください（別表第3）',
    inputType: 'radio',
    options: [
      { label: '小規模保育施設卒園児の継続利用（+25点）', value: 'adj_s_small', points: 25 },
      { label: '兄弟姉妹と同時申込（+15点）', value: 'adj_s_sim', points: 15 },
      { label: '多子家庭（3子以上）（+10点）', value: 'adj_s_multi', points: 10 },
      { label: '該当なし', value: 'adj_s_none', points: 0 },
    ],
  },
  {
    id: 'adj_individual',
    category: 'adjustment',
    label: '個人の特殊事情（補正点数）',
    helpText: '最も当てはまる区分を1つ選んでください（別表第3）',
    inputType: 'radio',
    options: [
      { label: '身体障害者手帳1・2級等（重度）（+15点）', value: 'adj_i_dis_heavy', points: 15 },
      { label: '要介護の同居親族あり（+10点）', value: 'adj_i_care', points: 10 },
      { label: 'その他障害手帳交付（+10点）', value: 'adj_i_dis_other', points: 10 },
      { label: '単身赴任（60km以上）（+5点）', value: 'adj_i_transfer', points: 5 },
      { label: '該当なし', value: 'adj_i_none', points: 0 },
    ],
  },
];

export const hashimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
