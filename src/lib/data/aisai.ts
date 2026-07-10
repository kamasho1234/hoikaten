import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.aisai.lg.jp/cmsfiles/contents/0000011/11276/r8riyoukijun (愛西市利用基準表 令和8年度)
// 愛西市 保育所等利用調整基準指数表・調整指数表
// 計算方式: sum方式（世帯の基準指数＝父の基準指数＋母の基準指数、各上限10）
// 最高基本点数: 20（父母各10）

const municipality = {
  id: 'aisai',
  name: '愛西市',
  slug: 'aisai',
  prefecture: '愛知県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
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
      helpText: '最も当てはまる状況を1つ選んでください（父母それぞれの基準指数を合算します）',
      inputType: 'select',
      options: [
        // 就労（被雇用者・自営/農業の中心者・専従者）
        { label: '就労（被雇用者・自営/農業の中心者）月20日以上・1日8時間以上', value: `${prefix}_wm_20_8h`, points: 10 },
        { label: '就労（被雇用者・自営/農業の中心者）月20日以上・1日6〜8時間未満', value: `${prefix}_wm_20_6h`, points: 8 },
        { label: '就労（被雇用者・自営/農業の中心者）月20日以上・1日4〜6時間未満', value: `${prefix}_wm_20_4h`, points: 7 },
        { label: '就労（被雇用者・自営/農業の中心者）月20日以上・1日4時間未満', value: `${prefix}_wm_20_u4h`, points: 4 },
        { label: '就労（被雇用者・自営/農業の中心者）月15日以上・1日8時間以上', value: `${prefix}_wm_15_8h`, points: 8 },
        { label: '就労（被雇用者・自営/農業の中心者）月15日以上・1日6〜8時間未満', value: `${prefix}_wm_15_6h`, points: 7 },
        { label: '就労（被雇用者・自営/農業の中心者）月15日以上・1日6時間未満', value: `${prefix}_wm_15_u6h`, points: 6 },
        { label: '就労（被雇用者・自営/農業の中心者）月15日未満・1日8時間以上', value: `${prefix}_wm_u15_8h`, points: 6 },
        { label: '就労（被雇用者・自営/農業の中心者）月15日未満・1日8時間未満', value: `${prefix}_wm_u15_u8h`, points: 4 },
        // 就労（自営・農業の協力者／内職）
        { label: '就労（自営/農業の協力者・内職）月20日以上・1日8時間以上', value: `${prefix}_ws_20_8h`, points: 8 },
        { label: '就労（自営/農業の協力者・内職）月20日以上・1日6〜8時間未満', value: `${prefix}_ws_20_6h`, points: 6 },
        { label: '就労（自営/農業の協力者・内職）月20日以上・1日4〜6時間未満', value: `${prefix}_ws_20_4h`, points: 5 },
        { label: '就労（自営/農業の協力者・内職）月20日以上・1日4時間未満', value: `${prefix}_ws_20_u4h`, points: 2 },
        { label: '就労（自営/農業の協力者・内職）月15日以上・1日8時間以上', value: `${prefix}_ws_15_8h`, points: 6 },
        { label: '就労（自営/農業の協力者・内職）月15日以上・1日6〜8時間未満', value: `${prefix}_ws_15_6h`, points: 5 },
        { label: '就労（自営/農業の協力者・内職）月15日以上・1日6時間未満', value: `${prefix}_ws_15_u6h`, points: 4 },
        { label: '就労（自営/農業の協力者・内職）月15日未満・1日8時間以上', value: `${prefix}_ws_u15_8h`, points: 4 },
        { label: '就労（自営/農業の協力者・内職）月15日未満・1日8時間未満', value: `${prefix}_ws_u15_u8h`, points: 2 },
        // 妊娠・出産
        { label: '妊娠・出産（産前産後期間：出産予定月とその前後2か月）', value: `${prefix}_birth`, points: 9 },
        // 疾病等
        { label: '疾病（1か月以上の入院又は入院に相当する治療や安静を要する）', value: `${prefix}_ill_hosp`, points: 10 },
        { label: '疾病（週3日以上の通院加療を行い、安静を要する）', value: `${prefix}_ill_visit3`, points: 7 },
        { label: '疾病（継続的な通院加療を行い、安静を要する）', value: `${prefix}_ill_visit_cont`, points: 5 },
        // 障がい
        { label: '障がい（身体1・2級／精神1級／療育A判定）', value: `${prefix}_dis_12`, points: 9 },
        { label: '障がい（身体3・4級／精神2級／療育B判定）', value: `${prefix}_dis_34`, points: 7 },
        { label: '障がい（身体5・6級／精神3級／療育C判定）', value: `${prefix}_dis_56`, points: 5 },
        // 介護・看護
        { label: '介護・看護（施設付添：週5日以上の常時付添）', value: `${prefix}_care_att5`, points: 9 },
        { label: '介護・看護（施設付添：週4日以上の常時付添）', value: `${prefix}_care_att4`, points: 7 },
        { label: '介護・看護（施設付添：週3日以上の常時付添）', value: `${prefix}_care_att3`, points: 5 },
        { label: '介護・看護（施設送迎：週3日以上の送迎）', value: `${prefix}_care_trans3`, points: 4 },
        { label: '介護・看護（自宅看護・介護：重度のため常時看護・介護を要する）', value: `${prefix}_care_home_heavy`, points: 9 },
        { label: '介護・看護（自宅看護・介護：上記以外の看護・介護を要する）', value: `${prefix}_care_home_other`, points: 5 },
        // 災害復旧
        { label: '災害復旧（地震・風水害・火災等の復旧に当たっている）', value: `${prefix}_disaster`, points: 10 },
        // 求職活動
        { label: '求職活動（起業準備活動を含む）を常態', value: `${prefix}_seek`, points: 2 },
        // 就学
        { label: '就学（月160時間以上の通学・通所）', value: `${prefix}_school_160h`, points: 10 },
        { label: '就学（月120時間以上160時間未満の通学・通所）', value: `${prefix}_school_120h`, points: 8 },
        { label: '就学（月64時間以上120時間未満の通学・通所）', value: `${prefix}_school_64h`, points: 6 },
        { label: '就学（上記以外で保育の必要性が認められる場合）', value: `${prefix}_school_other`, points: 3 },
        // 該当なし
        { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整指数）',
    helpText: '単身赴任・離婚調停中等による別居は含みません',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（+15点）', value: 'adj_single_parent_yes', points: 15 },
      { label: '該当なし', value: 'adj_single_parent_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整指数）',
    helpText: '就労により自立支援につながる場合等',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+5点）', value: 'adj_seikatsuhogo_yes', points: 5 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_shakaiteki',
    category: 'adjustment',
    label: '虐待やDVのおそれがある等、社会的養護を要しますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '社会的養護を要する（+5点）', value: 'adj_shakaiteki_yes', points: 5 },
      { label: '該当なし', value: 'adj_shakaiteki_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_ake',
    category: 'adjustment',
    label: '育児休業明けの入所ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '育児休業明け（+1点）', value: 'adj_ikuji_ake_yes', points: 1 },
      { label: '該当なし', value: 'adj_ikuji_ake_none', points: 0 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '同居のきょうだいが同一の保育所等に在籍、又は入所申込をしていますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが同一保育所等に在籍・入所申込（+1点）', value: 'adj_sibling_yes', points: 1 },
      { label: '該当なし', value: 'adj_sibling_none', points: 0 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母（65歳未満）がおり、自宅で保育可能ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '同居の祖父母（65歳未満）が自宅で保育可能（-2点）', value: 'adj_grandparent_yes', points: -2 },
      { label: '該当なし', value: 'adj_grandparent_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '保育料等を過去分含め滞納していますか？（調整指数）',
    helpText: '卒園児分を含みます',
    inputType: 'radio',
    options: [
      { label: '保育料等を滞納している（-5点）', value: 'adj_overdue_yes', points: -5 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
];

export const aisaiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
