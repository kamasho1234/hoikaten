import type { MunicipalityData, Question } from '../types';

// 出典: https://www1.g-reiki.net/tokigawa/reiki_honbun/r292RG00000599.html
// ときがわ町保育所入所候補児童選考適用基準要領（別表第1・別表第2）
// 計算方式: sum方式（父・母それぞれの基準指数の合算）
// 最高基本指数: 10

const municipality = {
  id: 'tokigawa',
  name: 'ときがわ町',
  slug: 'tokigawa',
  prefecture: '埼玉県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions: { label: string; value: string; points: number }[] = [
    // 就労・月20日以上
    { label: '就労（月20日以上・日8時間以上）', value: `${prefix}_w20d8h`, points: 10 },
    { label: '就労（月20日以上・日6～8時間未満）', value: `${prefix}_w20d6h`, points: 9 },
    { label: '就労（月20日以上・日4～6時間未満）', value: `${prefix}_w20d4h`, points: 8 },
    { label: '就労（月20日以上・日4時間未満）', value: `${prefix}_w20d4n`, points: 7 },
    // 就労・月16～20日未満
    { label: '就労（月16～20日未満・日8時間以上）', value: `${prefix}_w16d8h`, points: 9 },
    { label: '就労（月16～20日未満・日6～8時間未満）', value: `${prefix}_w16d6h`, points: 8 },
    { label: '就労（月16～20日未満・日4～6時間未満）', value: `${prefix}_w16d4h`, points: 7 },
    { label: '就労（月16～20日未満・日4時間未満）', value: `${prefix}_w16d4n`, points: 6 },
    // 就労・月12～16日未満
    { label: '就労（月12～16日未満・日8時間以上）', value: `${prefix}_w12d8h`, points: 8 },
    { label: '就労（月12～16日未満・日6～8時間未満）', value: `${prefix}_w12d6h`, points: 7 },
    { label: '就労（月12～16日未満・日4～6時間未満）', value: `${prefix}_w12d4h`, points: 6 },
    { label: '就労（月12～16日未満・日4時間未満）', value: `${prefix}_w12d4n`, points: 5 },
    // 就労・月12日未満
    { label: '就労（月12日未満・日8時間以上）', value: `${prefix}_w11d8h`, points: 6 },
    { label: '就労（月12日未満・日5時間以上）', value: `${prefix}_w11d5h`, points: 5 },
    { label: '就労（月12日未満・日5時間未満）', value: `${prefix}_w11d4n`, points: 4 },
    // 疾病・障害
    { label: '疾病・概ね1月以上の入院を必要とするとき', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病・常時安静が必要（医師の診断）', value: `${prefix}_ill_bedrest`, points: 10 },
    { label: '障害・身体障害者手帳1～3級', value: `${prefix}_dis_body`, points: 10 },
    { label: '障害・精神障害者保健福祉手帳1～3級', value: `${prefix}_dis_mental`, points: 10 },
    { label: '疾病・保育困難な状態', value: `${prefix}_ill_difficult`, points: 7 },
    // 看護・介護
    { label: '看護・同居親族の看護等', value: `${prefix}_care_live`, points: 9 },
    // 求職・就学
    { label: '求職活動中（内定なし）', value: `${prefix}_seek`, points: 5 },
    { label: '就学・通学（月20日以上）', value: `${prefix}_school20d`, points: 7 },
    // 災害・特別事情・産前産後
    { label: '災害復旧活動中', value: `${prefix}_disaster`, points: 10 },
    { label: '特別事情で保育不可と認定', value: `${prefix}_special`, points: 10 },
    { label: '出産前後2月以内', value: `${prefix}_birth`, points: 6 },
    // 不存在
    { label: '保護者不存在（死亡・離別・行方不明・拘禁等）', value: `${prefix}_absent`, points: 10 },
    { label: '保護者別居中', value: `${prefix}_separate`, points: 10 },
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
    id: 'adj_family',
    category: 'adjustment',
    label: '世帯の状況（調整指数・加算）',
    helpText: '最も点数の高い区分を1つ選んでください（別表第2）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（+5点）', value: 'adj_f_single', points: 5 },
      { label: '両親ともに求職中（+5点）', value: 'adj_f_bothseek', points: 5 },
      { label: '生活保護被保護世帯（就労証明付）（+3点）', value: 'adj_f_livelihood', points: 3 },
      { label: '両親ともに不存在（+3点）', value: 'adj_f_bothabs', points: 3 },
      { label: '該当なし', value: 'adj_f_none', points: 0 },
    ],
  },
  {
    id: 'adj_special',
    category: 'adjustment',
    label: '特別な事情（調整指数・加算）',
    inputType: 'radio',
    options: [
      { label: '児童を2月以上有償で預けている（+3点）', value: 'adj_s_paid', points: 3 },
      { label: '兄弟姉妹が在園または同時入所申込（+3点）', value: 'adj_s_sibling', points: 3 },
      { label: '両親いずれかに育児能力欠如（+2点）', value: 'adj_s_care_deficit', points: 2 },
      { label: '両親ともに片道1時間以上通勤（+1点）', value: 'adj_s_commute', points: 1 },
      { label: '該当なし', value: 'adj_s_none', points: 0 },
    ],
  },
];

export const tokigawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
