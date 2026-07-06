import type { MunicipalityData, Question } from '../types';

// 出典: https://www1.g-reiki.net/minami-alps/reiki_honbun/r007RG00001377.html
// 南アルプス市保育の提供に関する規則 別表（第4条関係）保育の提供基準
// 計算方式: min方式
// 最高基本点数: 10

const municipality = {
  id: 'minamiAlps',
  name: '南アルプス市',
  slug: 'minami-alps',
  prefecture: '山梨県',
  maxBasePoints: 10,
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
    { label: '就労・被雇用者（常勤・月160時間以上）', value: `${prefix}_emp_fulltime`, points: 10 },
    { label: '就労・被雇用者パート（月120時間以上）', value: `${prefix}_emp_120h`, points: 9 },
    { label: '就労・被雇用者パート（月96時間以上）', value: `${prefix}_emp_96h`, points: 8 },
    { label: '就労・被雇用者パート（月72時間以上）', value: `${prefix}_emp_72h`, points: 7 },
    { label: '就労・被雇用者パート（月48時間以上）', value: `${prefix}_emp_48h`, points: 6 },
    { label: '就労・自営業（事業主本人）', value: `${prefix}_self_owner`, points: 10 },
    { label: '就労・自営業専従者（月120時間以上）', value: `${prefix}_self_120h`, points: 8 },
    { label: '就労・自営業専従者（月96時間以上）', value: `${prefix}_self_96h`, points: 7 },
    { label: '就労・自営業専従者（月72時間以上）', value: `${prefix}_self_72h`, points: 6 },
    { label: '就労・自営業専従者（月48時間以上）', value: `${prefix}_self_48h`, points: 5 },
    { label: '就労・農業（事業主本人）', value: `${prefix}_farm_owner`, points: 10 },
    { label: '就労・農業専従者（月120時間以上・面積1ha以上）', value: `${prefix}_farm_120h`, points: 7 },
    { label: '就労・農業専従者（月96時間以上・面積50a以上）', value: `${prefix}_farm_96h`, points: 6 },
    { label: '就労・農業専従者（月72時間以上・面積30a以上）', value: `${prefix}_farm_72h`, points: 5 },
    { label: '就労・農業専従者（月48時間以上・面積10a以上）', value: `${prefix}_farm_48h`, points: 4 },
    { label: '妊娠・出産（出産予定2か月以内または出産後3か月以内）', value: `${prefix}_birth`, points: 10 },
    { label: '疾病・障害（身体障害1・2級）', value: `${prefix}_dis_12`, points: 10 },
    { label: '疾病・障害（身体障害3・4級）', value: `${prefix}_dis_34`, points: 7 },
    { label: '疾病（入院）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病（寝たきり）', value: `${prefix}_ill_bed`, points: 10 },
    { label: '疾病（感染症等の長期加療）', value: `${prefix}_ill_infect`, points: 9 },
    { label: '疾病（うつ等の精神疾患）', value: `${prefix}_ill_mental`, points: 8 },
    { label: '疾病（その他長期加療）', value: `${prefix}_ill_other`, points: 6 },
    { label: '疾病（週5日以上の通院）', value: `${prefix}_ill_visit5`, points: 8 },
    { label: '疾病（週3日以上の通院）', value: `${prefix}_ill_visit3`, points: 6 },
    { label: '介護・看護（入院つきそい・月96時間以上）', value: `${prefix}_care_hosp96`, points: 7 },
    { label: '介護・看護（入院つきそい・月48時間以上）', value: `${prefix}_care_hosp48`, points: 5 },
    { label: '介護・看護（寝たきり老人の介護）', value: `${prefix}_care_elderly`, points: 10 },
    { label: '介護・看護（身体障害者の看護）', value: `${prefix}_care_disabled`, points: 10 },
    { label: '介護・看護（自宅看護）', value: `${prefix}_care_home`, points: 6 },
    { label: '災害復旧（震災・風水害・火災等の復旧）', value: `${prefix}_disaster`, points: 10 },
    { label: '求職活動（フルタイム等での求職）', value: `${prefix}_seek_full`, points: 6 },
    { label: '求職活動（パートタイム等での求職）', value: `${prefix}_seek_part`, points: 4 },
    { label: '就学（大学・専門学校等）', value: `${prefix}_school`, points: 7 },
    { label: '就学（職業訓練）', value: `${prefix}_training`, points: 5 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [

];

export const minamiAlpsData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
