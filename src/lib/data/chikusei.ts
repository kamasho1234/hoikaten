import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 筑西市（茨城県）保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/city.chikusei/reiki_honbun/r156RG00000470.html
// 筑西市保育の必要性の認定基準及び保育料に関する条例施行規則（別表第2）
// 計算方式: sum方式（申請者と配偶者の利用基準指数を合算）
// 最高基準点数: 居宅外労働（月20日以上・1日7時間以上）で10点
// ---------------------------------------------------------------------------

const municipality = {
  id: 'chikusei',
  name: '筑西市',
  slug: 'chikusei',
  prefecture: '茨城県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 居宅外就労（最大10点）
    { label: '居宅外就労・月20日以上・1日7時間以上（外勤・自営・農業）', value: `${prefix}_out_20d7h`, points: 10 },
    { label: '疾病・1月以上入院または常時病臥等（医師診断書あり）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '障害・身体障害者手帳1〜2級相当', value: `${prefix}_dis_sev`, points: 10 },
    { label: '障害・療育手帳A以上または精神障害者保健福祉手帳1〜2級', value: `${prefix}_dis_ryoiku_a`, points: 10 },
    { label: '居宅外就労・月20日以上・1日6時間以上', value: `${prefix}_out_20d6h`, points: 9 },
    { label: '居宅内就労・月20日以上・1日7時間以上（自営業・農業等）', value: `${prefix}_in_20d7h`, points: 9 },
    { label: '疾病・感染症または精神性疾患（医師診断書あり）', value: `${prefix}_ill_inf`, points: 9 },
    { label: '介護・要介護4〜5の同居親族・月20日以上・1日7時間以上', value: `${prefix}_care_4h`, points: 9 },
    { label: '居宅外就労・月20日以上・1日5時間以上', value: `${prefix}_out_20d5h`, points: 8 },
    { label: '居宅外就労・月16〜19日・1日7時間以上', value: `${prefix}_out_16d7h`, points: 8 },
    { label: '居宅内就労・月20日以上・1日6時間以上', value: `${prefix}_in_20d6h`, points: 8 },
    { label: '障害・療育手帳B〜C程度または精神障害者保健福祉手帳3級', value: `${prefix}_dis_ryoiku_b`, points: 8 },
    { label: '居宅外就労・月20日以上・1日4時間以上', value: `${prefix}_out_20d4h`, points: 7 },
    { label: '居宅外就労・月16〜19日・1日6時間以上', value: `${prefix}_out_16d6h`, points: 7 },
    { label: '居宅内就労・月20日以上・1日5時間以上', value: `${prefix}_in_20d5h`, points: 7 },
    { label: '居宅内就労・月16〜19日・1日7時間以上', value: `${prefix}_in_16d7h`, points: 7 },
    { label: '妊娠・出産（出産予定月及び前後2月の計5月以内）', value: `${prefix}_birth`, points: 7 },
    { label: '疾病・安静加療が必要（医師診断書あり）', value: `${prefix}_ill_rest`, points: 7 },
    { label: '介護・要介護4〜5の同居親族（上記以外）', value: `${prefix}_care_other`, points: 7 },
    { label: '介護・要介護3の同居親族・月20日以上・1日7時間以上', value: `${prefix}_care_3_full`, points: 7 },
    { label: '居宅外就労・月16〜19日・1日5時間以上', value: `${prefix}_out_16d5h`, points: 6 },
    { label: '居宅内就労・月20日以上・1日4時間以上', value: `${prefix}_in_20d4h`, points: 6 },
    { label: '居宅内就労・月16〜19日・1日6時間以上', value: `${prefix}_in_16d6h`, points: 6 },
    { label: '障害・身体障害者手帳3級', value: `${prefix}_dis_3`, points: 6 },
    { label: '居宅外就労・月16〜19日・1日4時間以上', value: `${prefix}_out_16d4h`, points: 5 },
    { label: '居宅外就労・月12〜15日・1日7時間以上', value: `${prefix}_out_12d7h`, points: 5 },
    { label: '介護・要介護3の同居親族（上記以外）', value: `${prefix}_care_3_other`, points: 5 },
    { label: '居宅内就労・月16〜19日・1日5時間以上', value: `${prefix}_in_16d5h`, points: 5 },
    { label: '居宅内就労・月12〜15日・1日7時間以上', value: `${prefix}_in_12d7h`, points: 4 },
    { label: '居宅外就労・月12〜15日・1日6時間以上', value: `${prefix}_out_12d6h`, points: 4 },
    { label: '居宅内就労・月16〜19日・1日4時間以上', value: `${prefix}_in_16d4h`, points: 4 },
    { label: '障害・身体障害者手帳4〜6級', value: `${prefix}_dis_46`, points: 4 },
    { label: '居宅外就労・月12〜15日・その他（1日4時間未満等）', value: `${prefix}_out_12d_etc`, points: 3 },
    { label: '居宅内就労・月12〜15日・1日6時間以上', value: `${prefix}_in_12d6h`, points: 3 },
    { label: '介護・上記以外の同居親族の介護', value: `${prefix}_care_min`, points: 3 },
    { label: '疾病・定期通院加療中（医師診断書あり）', value: `${prefix}_ill_out`, points: 3 },
    { label: '居宅内就労・月12〜15日・その他', value: `${prefix}_in_12d_etc`, points: 2 },
    { label: '求職活動中', value: `${prefix}_seek`, points: 1 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育が必要な主な事由`,
      helpText: '最も当てはまる事由（最も高い点数）を1つ選んでください',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '福祉的配慮の該当事由（別表第2第2項）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '児童虐待またはDVにより保護が必要（+5点）', value: 'adj_wf_dv', points: 5 },
      { label: 'ひとり親世帯（母子・父子世帯）（+5点）', value: 'adj_wf_single', points: 5 },
      { label: '生活保護世帯（+5点）', value: 'adj_wf_welfare', points: 5 },
      { label: '該当なし', value: 'adj_wf_no', points: 0 },
    ],
  },
  {
    id: 'adj_siblings',
    category: 'adjustment',
    label: '兄弟姉妹の同施設利用・多子希望（別表第2第2項）',
    inputType: 'radio',
    options: [
      { label: '兄弟姉妹が同一施設を既に利用中（+3点）', value: 'adj_sib_yes', points: 3 },
      { label: '多子（双子等）希望（+3点）', value: 'adj_twin_yes', points: 3 },
      { label: '該当なし', value: 'adj_sib_no', points: 0 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居祖父母の状況（別表第2第2項）',
    helpText: '60歳未満の同居祖父母がいる場合は減点されます',
    inputType: 'radio',
    options: [
      { label: '60歳未満の同居祖父母がいる（-5点）', value: 'adj_gp_under60', points: -5 },
      { label: '60〜65歳の同居祖父母がいる（-3点）', value: 'adj_gp_60to65', points: -3 },
      { label: '該当なし', value: 'adj_gp_no', points: 0 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の未納状況（別表第2第2項）',
    inputType: 'radio',
    options: [
      { label: '3ヶ月以上未納（-5点）', value: 'adj_arr_yes', points: -5 },
      { label: '未納なし', value: 'adj_arr_no', points: 0 },
    ],
  },
];

export const chikuseiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
