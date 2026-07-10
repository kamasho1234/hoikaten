import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.yatomi.lg.jp/_res/projects/default_project/_page_/001/006/296/KIJUN2026.pdf
// 弥富市 保育所入所基準表（基礎指数・調整指数）令和8年度
// 計算方式: min方式（基礎指数は保護者のうち点数の低い方とする）
// 最高基本点数: 10
// 注記: 複数の要件に該当する場合は基本指数が高い方の要件を適用。就労時間は休憩・残業を含まない。

const municipality = {
  id: 'yatomi',
  name: '弥富市',
  slug: 'yatomi',
  prefecture: '愛知県',
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
      helpText: '最も当てはまる状況を1つ選んでください（複数該当時は指数が高い方を適用）',
      inputType: 'select',
      options: [
        { label: '就労（月20日以上・1日8時間以上）', value: `${prefix}_w20_8h`, points: 10 },
        { label: '就労（月20日以上・1日7時間以上）', value: `${prefix}_w20_7h`, points: 9 },
        { label: '就労（月20日以上・1日6時間以上）', value: `${prefix}_w20_6h`, points: 8 },
        { label: '就労（月16日以上・1日6時間以上）', value: `${prefix}_w16_6h`, points: 7 },
        { label: '就労（月16日以上・1日4時間以上）', value: `${prefix}_w16_4h`, points: 6 },
        { label: '就労（月12日以上・1日4時間以上）', value: `${prefix}_w12_4h`, points: 5 },
        { label: '内職（月12日以上・1日4時間以上）', value: `${prefix}_naishoku`, points: 4 },
        { label: '妊娠・出産（出産予定月の前後各2か月）', value: `${prefix}_birth`, points: 8 },
        { label: '疾病（1か月以上の入院）', value: `${prefix}_ill_hosp`, points: 10 },
        { label: '疾病（自宅療養・1か月以上の常時臥床）', value: `${prefix}_ill_bed`, points: 10 },
        { label: '疾病（自宅療養・週3日以上の通院かつ安静を要する）', value: `${prefix}_ill_visit3`, points: 7 },
        { label: '疾病（自宅療養・週1日以上の通院かつ安静を要する）', value: `${prefix}_ill_visit1`, points: 5 },
        { label: '心身障害（身体障害者手帳1・2級／療育手帳A判定／精神障害者保健福祉手帳1級）', value: `${prefix}_dis_12`, points: 10 },
        { label: '心身障害（身体障害者手帳3級／療育手帳B判定／精神障害者保健福祉手帳2級）', value: `${prefix}_dis_3`, points: 7 },
        { label: '疾病・障害（上記以外で保育を必要とする場合）', value: `${prefix}_ill_other`, points: 5 },
        { label: '介護（1か月以上の入院付添）', value: `${prefix}_care_hosp`, points: 10 },
        { label: '在宅介護（要介護3〜5／身体1・2級／療育A／精神1級の方の介護・看護）', value: `${prefix}_care_heavy`, points: 8 },
        { label: '在宅介護（要介護1・2／身体3級／療育B／精神2級の方の介護・看護）', value: `${prefix}_care_mid`, points: 5 },
        { label: '在宅介護（上記以外で保育を必要とする場合）', value: `${prefix}_care_other`, points: 5 },
        { label: '災害復旧（震災・風水害・火災その他の災害による居宅の復旧）', value: `${prefix}_disaster`, points: 10 },
        { label: '就学（学校・専修学校・各種学校・公共職業訓練施設／月120時間以上）', value: `${prefix}_school_120h`, points: 8 },
        { label: '就学（月48時間以上）', value: `${prefix}_school_48h`, points: 5 },
        { label: '求職活動（起業準備を含む）を行っている', value: `${prefix}_seek`, points: 2 },
        { label: '虐待・DVのおそれがある', value: `${prefix}_abuse`, points: 10 },
        { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親家庭（+4点）', value: 'adj_single_parent_yes', points: 4 },
      { label: '該当なし', value: 'adj_single_parent_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯等ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯等（+2点）', value: 'adj_seikatsuhogo_yes', points: 2 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が保育所に在園していますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '兄弟姉妹が保育所に在園している（+1点）', value: 'adj_sibling_yes', points: 1 },
      { label: '該当なし', value: 'adj_sibling_none', points: 0 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母（65歳未満）がおり自宅で保育可能ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '同居の祖父母（65歳未満）がおり自宅で保育可能（-1点）', value: 'adj_grandparent_yes', points: -1 },
      { label: '該当なし', value: 'adj_grandparent_none', points: 0 },
    ],
  },
];

export const yatomiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
