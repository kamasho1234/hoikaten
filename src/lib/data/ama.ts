import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// あま市（愛知県）保育施設入園選考基準データ
// 出典: https://www.city.ama.aichi.jp/kurashi/1002024/hoikuenn/1009663.html
// 計算方式: min方式（両親のうち指数が少ない方の指数を選考指数とする）
// 最高選考指数: 各保護者10点（入院・疾病時）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ama',
  name: 'あま市',
  slug: 'ama',
  prefecture: '愛知県',
  maxBasePoints: 10,
  scoringMethod: 'min',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 外勤・自営（外勤）
    { label: '外勤・自営（外勤） 月20日以上・8時間以上（9点）', value: `${prefix}_out_9`, points: 9 },
    { label: '外勤・自営（外勤） 月20日以上・6〜8時間 または月15日以上・8時間以上（8点）', value: `${prefix}_out_8`, points: 8 },
    { label: '外勤・自営（外勤） 月20日以上・4〜6時間 または月15日以上・6〜8時間（7点）', value: `${prefix}_out_7`, points: 7 },
    { label: '外勤・自営（外勤） 月15日以上・4〜6時間 または月15日未満・8時間以上（6点）', value: `${prefix}_out_6`, points: 6 },
    { label: '外勤・自営（外勤） 月20日以上・3〜4時間 または月15日未満・8時間未満（3点）', value: `${prefix}_out_3`, points: 3 },
    // 内勤・自営（内勤）・農業
    { label: '内勤・自営（内勤）・農業 月20日以上・8時間以上（7点）', value: `${prefix}_in_7`, points: 7 },
    { label: '内勤・自営（内勤）・農業 月20日以上・6〜8時間 または月15日以上・8時間以上（6点）', value: `${prefix}_in_6`, points: 6 },
    { label: '内勤・自営（内勤）・農業 月20日以上・4〜6時間 または月15日以上・6〜8時間（5点）', value: `${prefix}_in_5`, points: 5 },
    { label: '内勤・自営（内勤）・農業 月15日以上・4〜6時間 または月15日未満・8時間以上（4点）', value: `${prefix}_in_4`, points: 4 },
    { label: '内勤・自営（内勤）・農業 月15日未満・8時間未満（1点）', value: `${prefix}_in_1`, points: 1 },
    // 内職
    { label: '内職 月15日以上（3点）', value: `${prefix}_nai_3`, points: 3 },
    { label: '内職 月15日未満（1点）', value: `${prefix}_nai_1`, points: 1 },
    // 出産
    { label: '出産（出産予定月2ヶ月前〜出産月2ヶ月後）（8点）', value: `${prefix}_preg_8`, points: 8 },
    // 疾病
    { label: '入院（1ヶ月以上）（10点）', value: `${prefix}_ill_10`, points: 10 },
    { label: '自宅療養（常時臥床 1ヶ月以上）（8点）', value: `${prefix}_ill_home_8`, points: 8 },
    { label: '定期通院が必要（比較的軽症）（3点）', value: `${prefix}_ill_3`, points: 3 },
    // 障害
    { label: '身体障害1〜2級・療育手帳A・精神障害1級（9点）', value: `${prefix}_dis_9`, points: 9 },
    { label: '身体障害3〜4級・療育手帳B・精神障害2級（7点）', value: `${prefix}_dis_7`, points: 7 },
    { label: '身体障害5〜6級・療育手帳C・精神障害3級（5点）', value: `${prefix}_dis_5`, points: 5 },
    // 介護
    { label: '入院者看護（月120時間以上）または自宅介護（重度：身体1〜2級等）（8点）', value: `${prefix}_care_8`, points: 8 },
    { label: '自宅介護（中度：身体3〜4級等）（6点）', value: `${prefix}_care_6`, points: 6 },
    { label: '入院者看護（月60時間以上）（5点）', value: `${prefix}_care_5`, points: 5 },
    { label: '自宅介護（軽度：身体5〜6級等）または通院付添（月120時間以上）（4点）', value: `${prefix}_care_4`, points: 4 },
    { label: '通院付添（月60時間以上）（3点）', value: `${prefix}_care_3`, points: 3 },
    // 災害
    { label: '家庭災害による居宅復旧（10点）', value: `${prefix}_disaster_10`, points: 10 },
    // 就学
    { label: '就学・通学（月120時間以上）（7点）', value: `${prefix}_study_7`, points: 7 },
    { label: '就学・通学（月60〜120時間）（5点）', value: `${prefix}_study_5`, points: 5 },
    { label: '就学・通学（その他）（3点）', value: `${prefix}_study_3`, points: 3 },
    // 特別
    { label: '虐待・DVの危険性がある（20点）', value: `${prefix}_abuse_20`, points: 20 },
    // 求職
    { label: '求職活動中・起業準備中（0点）', value: `${prefix}_job_0`, points: 0 },
    // なし
    { label: 'あてはまらない', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育が必要な事由`,
      helpText: '最も当てはまる事由を1つ選んでください。就労の場合は就労形態・月の勤務日数・1日の労働時間に合った項目を選んでください',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
      { label: 'はい（＋4点）', value: 'adj_sp_yes', points: 4 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（就労支援対象）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_wf_no', points: 0 },
      { label: 'はい（＋1点）', value: 'adj_wf_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者が失業して求職中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemp_no', points: 0 },
      { label: 'はい（＋1点）', value: 'adj_unemp_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが希望する施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sib_no', points: 0 },
      { label: 'はい（＋1点）', value: 'adj_sib_yes', points: 1 },
    ],
  },
  {
    id: 'adj_job_prospect',
    category: 'adjustment',
    label: '就労予定（内定あり）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（就労中または非就労）', value: 'adj_jp_no', points: 0 },
      { label: 'はい（就労予定）（-2点）', value: 'adj_jp_yes', points: -2 },
    ],
  },
];

export const amaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
