import type { MunicipalityData, Question } from '../types';

// 出典: https://www1.g-reiki.net/namegata/reiki_honbun/r228RG00000317.html
// 行方市保育所入所基準要領（別表1 保育の必要性の基準・別表2 優先保育の基準）
// 計算方式: sum方式（父・母それぞれの点数の合算）
// 最高基本点数: 10点（月20日以上・月140時間以上就労）

const municipality = {
  id: 'namegata',
  name: '行方市',
  slug: 'namegata',
  prefecture: '茨城県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions: { label: string; value: string; points: number }[] = [
    // 居宅外就労・月20日以上（居宅内自営・農業・漁業・就学は居宅外に準ずる）
    { label: '居宅外就労（月20日以上・月140時間以上）', value: `${prefix}_w20d140h`, points: 10 },
    { label: '居宅外就労（月20日以上・月120〜140時間未満）', value: `${prefix}_w20d120h`, points: 9 },
    { label: '居宅外就労（月20日以上・月80〜120時間未満）', value: `${prefix}_w20d80h`, points: 8 },
    { label: '居宅外就労（月20日以上・月64〜80時間未満）', value: `${prefix}_w20d64h`, points: 7 },
    // 居宅外就労・月16〜19日
    { label: '居宅外就労（月16〜19日・月112時間以上）', value: `${prefix}_w16d112h`, points: 9 },
    { label: '居宅外就労（月16〜19日・月96〜112時間未満）', value: `${prefix}_w16d96h`, points: 8 },
    { label: '居宅外就労（月16〜19日・月64〜96時間未満）', value: `${prefix}_w16d64h`, points: 7 },
    // 居宅外就労・月15日以下（月16日未満）
    { label: '居宅外就労（月15日以下・月84時間以上）', value: `${prefix}_w15d84h`, points: 8 },
    { label: '居宅外就労（月15日以下・月72〜84時間未満）', value: `${prefix}_w15d72h`, points: 7 },
    { label: '居宅外就労（月15日以下・月64〜72時間未満）', value: `${prefix}_w15d64h`, points: 5 },
    // 内職
    { label: '内職（月120時間以上）', value: `${prefix}_naishoku120h`, points: 7 },
    { label: '内職（月64〜120時間未満）', value: `${prefix}_naishoku64h`, points: 5 },
    // 疾病
    { label: '疾病・長期入院または常時臥床療養', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病・自宅療養（保育困難）', value: `${prefix}_ill_home`, points: 10 },
    { label: '疾病・定期的通院加療', value: `${prefix}_ill_visit`, points: 8 },
    // 障害
    { label: '障害・手帳1〜2級（常時困難）', value: `${prefix}_dis_heavy`, points: 10 },
    { label: '障害・手帳3級以下（保育困難）', value: `${prefix}_dis_other`, points: 8 },
    // 介護・看護
    { label: '介護・常時介護または看護が必要', value: `${prefix}_care_heavy`, points: 10 },
    { label: '介護・定期的介護または看護が必要', value: `${prefix}_care_periodic`, points: 8 },
    // 災害復旧
    { label: '災害復旧に従事', value: `${prefix}_disaster`, points: 10 },
    // 求職活動
    { label: '求職活動中（90日間）', value: `${prefix}_seek`, points: 3 },
    // その他
    { label: 'その他（市長が認める場合）', value: `${prefix}_other`, points: 5 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  if (parentNum === 2) {
    baseOptions.splice(baseOptions.length - 1, 0, {
      label: '妊娠・出産（出産前後2か月）',
      value: `${prefix}_birth`,
      points: 10,
    });
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（別表1）',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況（優先保育の基準）',
    helpText: '最も当てはまる区分を1つ選んでください（別表2）',
    inputType: 'radio',
    options: [
      { label: '母子・父子世帯（死別・離別・行方不明等）（+20点）', value: 'adj_h_single', points: 20 },
      { label: '生活保護世帯（就労自立のため保育が必要）（+18点）', value: 'adj_h_livelihood', points: 18 },
      { label: '社会的養護（生計中心者の失業により就労の必要性あり）（+15点）', value: 'adj_h_social_support', points: 15 },
      { label: '該当なし', value: 'adj_h_none', points: 0 },
    ],
  },
  {
    id: 'adj_special',
    category: 'adjustment',
    label: '特別な事情（加算）',
    helpText: '最も点数の高い区分を1つ選んでください（別表2）',
    inputType: 'radio',
    options: [
      { label: '虐待・DVのおそれあり（+12点）', value: 'adj_s_dv', points: 12 },
      { label: '入所する子どもに障がい手帳等（+10点）', value: 'adj_s_dis_child', points: 10 },
      { label: '保護者が保育施設等で保育士として就労（+10点）', value: 'adj_s_hoikushi', points: 10 },
      { label: '育児休業明け・再入所（+8点）', value: 'adj_s_return', points: 8 },
      { label: '育児休業明け・新規入所（+5点）', value: 'adj_s_new', points: 5 },
      { label: '兄弟姉妹が入所中または同時入所希望（+5点）', value: 'adj_s_sibling', points: 5 },
      { label: '地域型保育事業を卒園（+3点）', value: 'adj_s_chiiki', points: 3 },
      { label: '該当なし', value: 'adj_s_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus',
    category: 'adjustment',
    label: '減算事由',
    helpText: '最も当てはまる区分を1つ選んでください（別表2）',
    inputType: 'radio',
    options: [
      { label: '65歳未満の同居祖父母がいて充分保育できない（-3点）', value: 'adj_m_grandparent', points: -3 },
      { label: '保育料を1年以上滞納している（-3点）', value: 'adj_m_delinquent', points: -3 },
      { label: '該当なし', value: 'adj_m_none', points: 0 },
    ],
  },
];

export const namegatadata: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
