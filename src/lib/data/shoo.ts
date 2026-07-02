import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 勝央町（岡山県勝田郡）保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/town.shoo/reiki_honbun/m266RG00000409.html
// 勝央町保育の利用に関する規則（別表第1・第2・第3）
// 計算方式: sum方式（父母それぞれの基準点数を合算）
// 最高基準点数: 居宅外就労（月140時間以上）で20点
// ---------------------------------------------------------------------------

const municipality = {
  id: 'shoo',
  name: '勝央町',
  slug: 'shoo',
  prefecture: '岡山県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    { label: '居宅外就労（外勤・自営・農業）月140時間以上', value: `${prefix}_work_out_140h`, points: 20 },
    { label: '就学（月140時間以上）', value: `${prefix}_study_140h`, points: 20 },
    { label: '疾病・入院（医師意見書あり・保育全部困難）', value: `${prefix}_ill_hosp`, points: 20 },
    { label: '災害復旧作業中', value: `${prefix}_disaster`, points: 20 },
    { label: '居宅外就労（外勤・自営・農業）月120〜139時間', value: `${prefix}_work_out_120h`, points: 19 },
    { label: '就学（月120〜139時間）', value: `${prefix}_study_120h`, points: 19 },
    { label: '居宅内就労（居宅内自営）月140時間以上', value: `${prefix}_work_in_140h`, points: 19 },
    { label: '疾病・通院（療育A・身体障害1〜2級等・医師意見書あり）', value: `${prefix}_ill_sev_out`, points: 19 },
    { label: '親族介護・看護（月140時間以上）', value: `${prefix}_care_140h`, points: 19 },
    { label: '居宅外就労（外勤・自営・農業）月96〜119時間', value: `${prefix}_work_out_96h`, points: 18 },
    { label: '居宅内就労（居宅内自営）月120〜139時間', value: `${prefix}_work_in_120h`, points: 18 },
    { label: '内職・自営手伝い・農業手伝い　月140時間以上', value: `${prefix}_work_prt_140h`, points: 18 },
    { label: '疾病・自宅療養（療育A・身体障害1〜2級等・医師意見書あり）', value: `${prefix}_ill_sev_home`, points: 18 },
    { label: '疾病・入院（療育B・要介護1〜2等・医師意見書あり）', value: `${prefix}_ill_mod_hosp`, points: 20 },
    { label: '疾病・通院（療育B・要介護1〜2等・医師意見書あり）', value: `${prefix}_ill_mod_out`, points: 18 },
    { label: '親族介護・看護（月120〜139時間）', value: `${prefix}_care_120h`, points: 18 },
    { label: '居宅外就労（外勤・自営・農業）月80〜95時間', value: `${prefix}_work_out_80h`, points: 17 },
    { label: '居宅内就労（居宅内自営）月96〜119時間', value: `${prefix}_work_in_96h`, points: 17 },
    { label: '内職・自営手伝い・農業手伝い　月120〜139時間', value: `${prefix}_work_prt_120h`, points: 17 },
    { label: '疾病・自宅療養（療育B・要介護1〜2等・医師意見書あり）', value: `${prefix}_ill_mod_home`, points: 17 },
    { label: '親族介護・看護（月96〜119時間）', value: `${prefix}_care_96h`, points: 17 },
    { label: '居宅外就労（外勤・自営・農業）月64〜79時間', value: `${prefix}_work_out_64h`, points: 16 },
    { label: '就学（月96〜119時間）', value: `${prefix}_study_96h`, points: 16 },
    { label: '居宅内就労（居宅内自営）月80〜95時間', value: `${prefix}_work_in_80h`, points: 16 },
    { label: '内職・自営手伝い・農業手伝い　月96〜119時間', value: `${prefix}_work_prt_96h`, points: 16 },
    { label: '疾病（身体障害3〜6級・要支援1〜2等・医師意見書あり、または医師意見書のみ・一部困難）', value: `${prefix}_ill_mild`, points: 16 },
    { label: '親族介護・看護（月80〜95時間）', value: `${prefix}_care_80h`, points: 16 },
    { label: '居宅外就労（外勤・自営・農業）月48〜63時間', value: `${prefix}_work_out_48h`, points: 15 },
    { label: '就学（月48〜95時間）', value: `${prefix}_study_48h`, points: 15 },
    { label: '居宅内就労（居宅内自営）月64〜79時間', value: `${prefix}_work_in_64h`, points: 15 },
    { label: '内職・自営手伝い・農業手伝い　月80〜95時間', value: `${prefix}_work_prt_80h`, points: 15 },
    { label: '妊娠・出産（出産予定月2ヶ月前〜出産後2ヶ月）', value: `${prefix}_birth`, points: 15 },
    { label: '親族介護・看護（月64〜79時間）', value: `${prefix}_care_64h`, points: 15 },
    { label: '居宅内就労（居宅内自営）月48〜63時間', value: `${prefix}_work_in_48h`, points: 14 },
    { label: '内職・自営手伝い・農業手伝い　月64〜79時間', value: `${prefix}_work_prt_64h`, points: 14 },
    { label: '親族介護・看護（月48〜63時間）', value: `${prefix}_care_48h`, points: 14 },
    { label: '内職・自営手伝い・農業手伝い　月48〜63時間', value: `${prefix}_work_prt_48h`, points: 13 },
    { label: '求職活動中', value: `${prefix}_seek`, points: 4 },
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
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（母又は父のいない世帯）ですか？（別表第2）',
    inputType: 'radio',
    options: [
      { label: 'はい（+20点）', value: 'adj_sp_yes', points: 20 },
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
    ],
  },
  {
    id: 'adj_protection',
    category: 'adjustment',
    label: '要保護・継続・保育士・兄弟について（別表第3）',
    helpText: '最もあてはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '要保護児童（虐待・DV等により特に保護が必要）（+40点）', value: 'adj_prot_yes', points: 40 },
      { label: '継続児童（保育所等を既に利用中）（+10点）', value: 'adj_cont_yes', points: 10 },
      { label: '保育士資格を有し町内保育園に保育士として就労、または就労予定（+7点）', value: 'adj_nurse_yes', points: 7 },
      { label: '兄弟に継続児童がいる新規入所児童（+5点）', value: 'adj_sib_yes', points: 5 },
      { label: '該当なし', value: 'adj_prot_no', points: 0 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業中の職場復帰予定時期（別表第3）',
    helpText: '育児休業から復職するために保育所を申込む場合のみ選択してください（減点）',
    inputType: 'radio',
    options: [
      { label: '育休中でない / 該当なし', value: 'adj_pl_no', points: 0 },
      { label: '育児休業中・職場復帰2ヶ月以上前（-1点）', value: 'adj_pl_2m', points: -1 },
      { label: '育児休業中・職場復帰4ヶ月以上前（-2点）', value: 'adj_pl_4m', points: -2 },
      { label: '育児休業中・職場復帰6ヶ月以上前（-3点）', value: 'adj_pl_6m', points: -3 },
      { label: '育児休業中・職場復帰8ヶ月以上前（-4点）', value: 'adj_pl_8m', points: -4 },
      { label: '育児休業中・職場復帰10ヶ月以上前（-5点）', value: 'adj_pl_10m', points: -5 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の滞納状況（別表第2）',
    inputType: 'radio',
    options: [
      { label: '滞納なし', value: 'adj_arr_no', points: 0 },
      { label: '3ヶ月以上の滞納があり、かつ、3ヶ月以上納付約束を不履行（-5点）', value: 'adj_arr_3m', points: -5 },
      { label: '6ヶ月以上滞納または納付約束6ヶ月以上不履行（-8点）', value: 'adj_arr_6m', points: -8 },
      { label: '6ヶ月以上滞納かつ納付約束6ヶ月以上不履行（-10点）', value: 'adj_arr_6m6m', points: -10 },
    ],
  },
];

export const shooData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
