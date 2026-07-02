import type { MunicipalityData, Question } from '../types';

// 出典: https://www1.g-reiki.net/city.fukutsu/reiki_honbun/r163RG00000952.html
// 福津市特定教育・保育及び特定地域型保育事業実施に関する規則 別表第2
// 計算方式: sum方式（父の基準指数 + 母の基準指数 + 調整指数）
// 最高基準指数: 10点（月160時間以上就労）
// 注記: 市長が決定する事項（災害復旧、児童虐待・DV、その他）は点数が規定されていないため選択肢には含めていません

const municipality = {
  id: 'fukutsu',
  name: '福津市',
  slug: 'fukutsu',
  prefecture: '福岡県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 就労（被雇用者・自営業者、就労証明書あり）
    { label: '就労・月160時間以上（証明書あり）', value: `${prefix}_work160h`, points: 10 },
    { label: '就労・月140時間以上（証明書あり）', value: `${prefix}_work140h`, points: 9 },
    { label: '就労・月120時間以上（証明書あり）', value: `${prefix}_work120h`, points: 8 },
    { label: '就労・月100時間以上（証明書あり）', value: `${prefix}_work100h`, points: 7 },
    { label: '就労・月80時間以上（証明書あり）', value: `${prefix}_work80h`, points: 6 },
    { label: '就労・月60時間以上（証明書あり）', value: `${prefix}_work60h`, points: 5 },
    // 就労（自営業者、就労証明書添付困難）: 各区分から1点減
    { label: '自営業・月160時間以上（証明書なし）', value: `${prefix}_self160h`, points: 9 },
    { label: '自営業・月140時間以上（証明書なし）', value: `${prefix}_self140h`, points: 8 },
    { label: '自営業・月120時間以上（証明書なし）', value: `${prefix}_self120h`, points: 7 },
    { label: '自営業・月100時間以上（証明書なし）', value: `${prefix}_self100h`, points: 6 },
    { label: '自営業・月80時間以上（証明書なし）', value: `${prefix}_self80h`, points: 5 },
    { label: '自営業・月60時間以上（証明書なし）', value: `${prefix}_self60h`, points: 4 },
    // 保育士等特例（市内認可保育所等就労・新規のみ）
    { label: '市内認可保育所等就労の保育士・幼稚園教諭・看護師（新規）', value: `${prefix}_nursery`, points: 10 },
    // 妊娠・出産
    { label: '妊娠・出産（出産予定前2ヶ月〜出産後3ヶ月、多胎の場合は出産予定前4ヶ月〜出産後3ヶ月）', value: `${prefix}_birth`, points: 10 },
    // 疾病・負傷・障害
    { label: '疾病・入院または常時病臥', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病・負傷による保育困難', value: `${prefix}_ill`, points: 8 },
    { label: '障害・身体手帳1〜2級・療育手帳A・精神手帳1級等（重度）', value: `${prefix}_dis_12`, points: 10 },
    { label: '障害・身体手帳3級・療育手帳B・精神手帳2級等（中度）', value: `${prefix}_dis_3`, points: 8 },
    { label: '障害・身体手帳4級・精神手帳3級等（軽度）', value: `${prefix}_dis_4`, points: 6 },
    // 介護・看護
    { label: '同居親族の常時介護・看護', value: `${prefix}_care`, points: 8 },
    // 就学・技能習得
    { label: '就学・技能習得（月140時間以上）', value: `${prefix}_study140h`, points: 9 },
    { label: '就学・技能習得（月120時間以上）', value: `${prefix}_study120h`, points: 8 },
    { label: '就学・技能習得（月60時間以上）', value: `${prefix}_study60h`, points: 5 },
    // 求職活動
    { label: '求職活動中（生活保護世帯・3ヶ月以内）', value: `${prefix}_seek_livelihood`, points: 3 },
    { label: '求職活動中（もう一方の保護者は就労等）', value: `${prefix}_seek_one`, points: 2 },
    { label: '求職活動中（両方が求職中）', value: `${prefix}_seek_both`, points: 1 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_priority',
    category: 'adjustment',
    label: '子どもの利用状況（優先加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '既に入所中で継続利用が必要と認められた場合（+12点）', value: 'adj_p_continuing', points: 12 },
      { label: '地域型保育施設（小規模等）卒園予定者（+11点）', value: 'adj_p_smallscale', points: 11 },
      { label: '既入所児童のきょうだい（新規または別園転園）（+10点）', value: 'adj_p_sibling', points: 10 },
      { label: '該当なし', value: 'adj_p_none', points: 0 },
    ],
  },
];

export const fukutsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
