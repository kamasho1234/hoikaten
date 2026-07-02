import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 甲州市（山梨県）保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/koshu/reiki_honbun/r208RG00000600.html
// 甲州市保育の必要性の認定に関する条例施行規則（別表）
// 計算方式: sum方式（明記なし・加算方式と推定）
// 最高基準点数: 就労（月140時間以上）・疾病・介護・虐待DV・災害復旧で10点
// ---------------------------------------------------------------------------

const municipality = {
  id: 'koshu',
  name: '甲州市',
  slug: 'koshu',
  prefecture: '山梨県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 10点
    { label: '就労・月実働140時間以上', value: `${prefix}_work_140h`, points: 10 },
    { label: '疾病・障害（身体障害者手帳1〜2級・精神1〜2級・療育Aなど）', value: `${prefix}_dis_sev`, points: 10 },
    { label: '親族の介護・看護（常時保育が困難な状態）', value: `${prefix}_care_sev`, points: 10 },
    { label: '虐待またはDVのおそれがある', value: `${prefix}_dv`, points: 10 },
    { label: '災害復旧作業中', value: `${prefix}_disaster`, points: 10 },
    // 8点
    { label: '就労・月実働120〜140時間未満', value: `${prefix}_work_120h`, points: 8 },
    { label: '妊娠中または出産後3か月程度まで', value: `${prefix}_birth`, points: 8 },
    { label: '疾病・1か月以上自宅療養が必要', value: `${prefix}_ill_home`, points: 8 },
    { label: '就学（大学・専門学校等に在学中）', value: `${prefix}_study`, points: 8 },
    { label: '市長が認める特例事由', value: `${prefix}_special`, points: 8 },
    // 7点
    { label: '就労・月実働48〜120時間未満', value: `${prefix}_work_48h`, points: 7 },
    { label: '親族の介護・看護（保育に支障がある状態）', value: `${prefix}_care_mod`, points: 7 },
    { label: '求職活動中（登録・面接等）', value: `${prefix}_seek`, points: 7 },
    { label: '育児休業中（既利用児童の継続利用が必要）', value: `${prefix}_parental_leave`, points: 7 },
    // 6点
    { label: '疾病・障害（その他）', value: `${prefix}_dis_other`, points: 6 },
    { label: '生活保護世帯で自立見込み', value: `${prefix}_seek_welfare_independence`, points: 6 },
    // 5点
    { label: '求職活動中（その他）', value: `${prefix}_seek_other`, points: 5 },
    // 0点
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育が必要な主な事由`,
      helpText: '最も当てはまる事由を1つ選んでください',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '世帯の状況（調整指数 加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '両親不在世帯（祖父母等が養育）（+3点）', value: 'adj_wf_noparents', points: 3 },
      { label: 'ひとり親世帯（母子・父子世帯）（+2点）', value: 'adj_wf_single', points: 2 },
      { label: '単身赴任中（+1点）', value: 'adj_wf_transfer', points: 1 },
      { label: '生活保護世帯（+1点）', value: 'adj_wf_welfare', points: 1 },
      { label: '生計中心者失業で就労必要性高い（+1点）', value: 'adj_wf_unemployment_need', points: 1 },
      { label: '該当なし', value: 'adj_wf_no', points: 0 },
    ],
  },
  {
    id: 'adj_child',
    category: 'adjustment',
    label: '申込児童・兄弟姉妹の状況（調整指数 加算）',
    inputType: 'radio',
    options: [
      { label: '双子以上の多胎児を同時申込（+2点）', value: 'adj_twins', points: 2 },
      { label: '申込児童が障害を有する（+2点）', value: 'adj_child_dis', points: 2 },
      { label: '兄弟姉妹が同一施設を利用中で同施設を希望（+1点）', value: 'adj_sib_yes', points: 1 },
      { label: '小規模保育事業などの卒園児童（+1点）', value: 'adj_small_care_grad', points: 1 },
      { label: '該当なし', value: 'adj_child_no', points: 0 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育児休業明け',
    helpText: '育児休業明けの場合は選択してください',
    inputType: 'radio',
    options: [
      { label: '育児休業明け予定者（+1点）', value: 'adj_prl_return', points: 1 },
      { label: '該当なし', value: 'adj_prl_no', points: 0 },
    ],
  },
  {
    id: 'adj_welfare_other',
    category: 'adjustment',
    label: 'その他の福祉的必要性',
    helpText: '児童福祉観点で必要と認められる場合は選択してください',
    inputType: 'radio',
    options: [
      // 公式では+1～2だが、実装上は+1で統一（より配慮が必要な場合は審査で考慮）
      { label: '児童福祉観点で必要と認められる場合（+1点）', value: 'adj_wo_welfare_needed', points: 1 },
      { label: '該当なし', value: 'adj_wo_no', points: 0 },
    ],
  },
  {
    id: 'adj_minus',
    category: 'adjustment',
    label: 'その他の状況（調整指数 減算）',
    helpText: '減算が発生する場合は選択してください',
    inputType: 'radio',
    options: [
      { label: '同居親族が保育できる状態（常態）（-1点）', value: 'adj_m_relative', points: -1 },
      { label: '該当なし', value: 'adj_m_no', points: 0 },
    ],
  },
];

export const koshuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
