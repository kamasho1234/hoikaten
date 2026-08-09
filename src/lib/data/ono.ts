import type { MunicipalityData, Question } from '../types';

// 出典: 小野市「保育所等利用調整基準」
// https://www.city.ono.hyogo.jp/material/files/group/18/nyuusyuokijyunn.pdf
// 計算方式: sum方式（原典 注1に「保育所入所の決定基準指数については、父母それぞれの基準指数と
//           調整指数を合算したものとする。」と明記）
// 最高基準指数: 20（父母各10）
// 注:
//  - 「就労日数」による減点（月18日以上20日未満-1／月16日以上18日未満-2／月12日以上16日未満-3）は
//    保護者ごとの減算のため、保護者ごとの独立設問として実装。
//    原典 注2「減点後の基準指数の下限は2とする」はhelpTextで案内（本シミュレーターでは下限処理は行わない）。
//  - 労働時間は原典 注4により30分以上切りあげ（例: 1日7時間30分の勤務は8時間勤務）。
//  - 除外: 基準指数5「災害復旧（1〜10）」・8「虐待やDVのおそれ（1〜10）」・9「育児休業中の継続利用
//    （1〜10）」・11「特例による（1〜10）」、調整指数16「その他特別な事情（-3〜+3）」は
//    いずれも範囲値で固定点数が定められていないため実装対象外。

const municipality = {
  id: 'ono',
  name: '小野市',
  slug: 'ono',
  prefecture: '兵庫県',
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
      label: `${parentLabel}の保育できない理由・状況等（基準指数）`,
      helpText:
        '最も当てはまるものを1つ選んでください。労働時間は30分以上を切りあげて判定します（例：1日7時間30分の勤務は8時間勤務）。',
      inputType: 'select',
      options: [
        // 1 家庭外労働
        { label: '家庭外労働（労働者・自営業の中心者）：1日8時間以上', value: `${prefix}_out_c_8`, points: 10 },
        { label: '家庭外労働（労働者・自営業の中心者）：1日7時間以上8時間未満', value: `${prefix}_out_c_7`, points: 9 },
        { label: '家庭外労働（労働者・自営業の中心者）：1日6時間以上7時間未満', value: `${prefix}_out_c_6`, points: 8 },
        { label: '家庭外労働（労働者・自営業の中心者）：1日5時間以上6時間未満', value: `${prefix}_out_c_5`, points: 7 },
        { label: '家庭外労働（労働者・自営業の中心者）：1日5時間未満', value: `${prefix}_out_c_u5`, points: 6 },
        { label: '家庭外労働（自営業の協力者）：1日8時間以上', value: `${prefix}_out_k_8`, points: 8 },
        { label: '家庭外労働（自営業の協力者）：1日7時間以上8時間未満', value: `${prefix}_out_k_7`, points: 7 },
        { label: '家庭外労働（自営業の協力者）：1日6時間以上7時間未満', value: `${prefix}_out_k_6`, points: 6 },
        { label: '家庭外労働（自営業の協力者）：1日5時間以上6時間未満', value: `${prefix}_out_k_5`, points: 5 },
        { label: '家庭外労働（自営業の協力者）：1日5時間未満', value: `${prefix}_out_k_u5`, points: 4 },
        // 1 家庭内労働
        { label: '家庭内労働（自営業の中心者）：1日8時間以上', value: `${prefix}_in_c_8`, points: 9 },
        { label: '家庭内労働（自営業の中心者）：1日7時間以上8時間未満', value: `${prefix}_in_c_7`, points: 8 },
        { label: '家庭内労働（自営業の中心者）：1日6時間以上7時間未満', value: `${prefix}_in_c_6`, points: 7 },
        { label: '家庭内労働（自営業の中心者）：1日5時間以上6時間未満', value: `${prefix}_in_c_5`, points: 6 },
        { label: '家庭内労働（自営業の中心者）：1日5時間未満', value: `${prefix}_in_c_u5`, points: 5 },
        { label: '家庭内労働（自営業の協力者）：1日8時間以上', value: `${prefix}_in_k_8`, points: 6 },
        { label: '家庭内労働（自営業の協力者）：1日7時間以上8時間未満', value: `${prefix}_in_k_7`, points: 5 },
        { label: '家庭内労働（自営業の協力者）：1日6時間以上7時間未満', value: `${prefix}_in_k_6`, points: 4 },
        { label: '家庭内労働（自営業の協力者）：1日5時間以上6時間未満', value: `${prefix}_in_k_5`, points: 3 },
        { label: '家庭内労働（自営業の協力者）：1日5時間未満', value: `${prefix}_in_k_u5`, points: 2 },
        { label: '家庭内労働（農業の中心者）：1日8時間以上', value: `${prefix}_nogyo_c_8`, points: 7 },
        { label: '家庭内労働（農業の中心者）：1日7時間以上8時間未満', value: `${prefix}_nogyo_c_7`, points: 6 },
        { label: '家庭内労働（農業の中心者）：1日6時間以上7時間未満', value: `${prefix}_nogyo_c_6`, points: 5 },
        { label: '家庭内労働（農業の中心者）：1日5時間以上6時間未満', value: `${prefix}_nogyo_c_5`, points: 4 },
        { label: '家庭内労働（農業の中心者）：1日5時間未満', value: `${prefix}_nogyo_c_u5`, points: 3 },
        { label: '家庭内労働（農業の協力者）：1日7時間以上', value: `${prefix}_nogyo_k_7`, points: 4 },
        { label: '家庭内労働（農業の協力者）：1日5時間以上7時間未満', value: `${prefix}_nogyo_k_5`, points: 3 },
        { label: '家庭内労働（農業の協力者）：1日4時間以上5時間未満', value: `${prefix}_nogyo_k_4`, points: 2 },
        { label: '内職：1日8時間以上', value: `${prefix}_naishoku_8`, points: 5 },
        { label: '内職：1日5時間以上8時間未満', value: `${prefix}_naishoku_5`, points: 4 },
        { label: '内職：1日5時間未満', value: `${prefix}_naishoku_u5`, points: 3 },
        // 2 出産
        { label: '出産：出産前後2カ月', value: `${prefix}_birth`, points: 9 },
        // 3 疾病・障害
        { label: '疾病：入院', value: `${prefix}_ill_hosp`, points: 10 },
        { label: '疾病：常時安静', value: `${prefix}_ill_rest`, points: 9 },
        { label: '疾病：その他', value: `${prefix}_ill_other`, points: 8 },
        { label: '障害：障害者手帳1・2級又は療育手帳A判定', value: `${prefix}_dis_1`, points: 10 },
        { label: '障害：障害者手帳3・4級又は療育手帳B判定', value: `${prefix}_dis_2`, points: 8 },
        { label: '障害：障害者手帳5・6級又は自立支援医療受給者及び同等の障害を有すると認められる者', value: `${prefix}_dis_3`, points: 6 },
        // 4 親族等の介護・看護
        { label: '介護・看護：臥床者・重症心身障がい児（者）の介護・看護や入院・通院・通所の付き添いのため、常時保育が困難', value: `${prefix}_care_always`, points: 9 },
        { label: '介護・看護：病人や障がい者の介護や入院・通院・通所の付き添いのため、月120時間以上保育が困難', value: `${prefix}_care_120`, points: 7 },
        { label: '介護・看護：病人や障がい者の介護や入院・通院・通所の付き添いのため、月48時間以上保育が困難', value: `${prefix}_care_48`, points: 5 },
        // 6 求職活動
        { label: '求職活動（起業準備を含む）を継続的に行っている', value: `${prefix}_seek`, points: 1 },
        // 7 就学等
        { label: '就学等：学校、専門学校、職業訓練校等に月120時間以上就学している', value: `${prefix}_school_120`, points: 8 },
        { label: '就学等：学校、専門学校、職業訓練校等に月48時間以上就学している', value: `${prefix}_school_48`, points: 6 },
        // 10 不存在等
        { label: '不存在等：死別、離別、未婚、行方不明等', value: `${prefix}_absent`, points: 10 },
        // 該当なし
        { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_shurou_nissu`,
      category,
      label: `${parentLabel}の就労日数による減点`,
      helpText:
        '原典では就労日数に応じて基準指数から減点されます。月20日以上の場合は減点されません。なお原典 注2により、減点後の基準指数の下限は2とされています（本シミュレーターでは下限処理を行わないため、実際の点数と差が出る場合があります）。',
      inputType: 'select',
      options: [
        { label: '月12日以上16日未満（-3点）', value: `${prefix}_nissu_12`, points: -3 },
        { label: '月16日以上18日未満（-2点）', value: `${prefix}_nissu_16`, points: -2 },
        { label: '月18日以上20日未満（-1点）', value: `${prefix}_nissu_18`, points: -1 },
        { label: '月20日以上（減点なし）／就労以外の事由', value: `${prefix}_nissu_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整指数1）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（+3点）', value: 'adj_hitorioya_yes', points: 3 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整指数2）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+3点）', value: 'adj_seikatsuhogo_yes', points: 3 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者が失業していますか？（調整指数3）',
    inputType: 'radio',
    options: [
      { label: '生計中心者の失業により、就労の必要性が高い（+3点）', value: 'adj_shitsugyo_yes', points: 3 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_gyakutai',
    category: 'adjustment',
    label: '虐待やDVのおそれがありますか？（調整指数4）',
    helpText: '社会的養護が必要な場合に加算されます。',
    inputType: 'radio',
    options: [
      { label: '虐待やDVの恐れがある場合など、社会的養護が必要（+3点）', value: 'adj_gyakutai_yes', points: 3 },
      { label: '該当なし', value: 'adj_gyakutai_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだいの入所状況は？（調整指数5・12）',
    helpText: '多胎児を含みます。',
    inputType: 'select',
    options: [
      { label: '兄弟姉妹が既に同一の保育所等に入所している（+5点）', value: 'adj_kyodai_zaien', points: 5 },
      { label: '兄弟姉妹が同時に同一の保育所等に入所する（+1点）', value: 'adj_kyodai_doji', points: 1 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育所等に勤務していますか？（調整指数6・7・10）',
    helpText: '区分6の看護師等とは、看護師・準看護師・保健師・助産師を指します。',
    inputType: 'select',
    options: [
      { label: '市内保育所等に勤務する保育士及び保育教諭（看護師等を含む）の児童（+8点）', value: 'adj_hoikushi_shinai', points: 8 },
      { label: '市内保育所等に勤務する栄養士・調理師・調理員の児童（+7点）', value: 'adj_hoikushi_eiyoshi', points: 7 },
      { label: '市外保育所等に勤務する保育士の児童（+1点）', value: 'adj_hoikushi_shigai', points: 1 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogaiji',
    category: 'adjustment',
    label: '申込児童が障害を有していますか？（調整指数8）',
    inputType: 'radio',
    options: [
      { label: '子どもが障害を有する（+2点）', value: 'adj_shogaiji_yes', points: 2 },
      { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikukyu_ake',
    category: 'adjustment',
    label: '育児休業明けですか？（調整指数9）',
    inputType: 'radio',
    options: [
      { label: '育児休業明け（+2点）', value: 'adj_ikukyu_ake_yes', points: 2 },
      { label: '該当なし', value: 'adj_ikukyu_ake_none', points: 0 },
    ],
  },
  {
    id: 'adj_shokibo',
    category: 'adjustment',
    label: '小規模保育事業等の卒園児ですか？（調整指数11）',
    inputType: 'radio',
    options: [
      { label: '小規模保育事業等の卒園児（+1点）', value: 'adj_shokibo_yes', points: 1 },
      { label: '該当なし', value: 'adj_shokibo_none', points: 0 },
    ],
  },
  {
    id: 'adj_jimoto',
    category: 'adjustment',
    label: '地元の保育所等への入所を希望する5歳児ですか？（調整指数13）',
    inputType: 'radio',
    options: [
      { label: '地元の保育所等への入所を希望する5歳児（+1点）', value: 'adj_jimoto_yes', points: 1 },
      { label: '該当なし', value: 'adj_jimoto_none', points: 0 },
    ],
  },
  {
    id: 'adj_shorui',
    category: 'adjustment',
    label: '自営業・農業等で収入等を証する書類の提出がありますか？（調整指数14）',
    helpText: '原典 注2により、この減点後の基準指数の下限は2とされています。',
    inputType: 'radio',
    options: [
      { label: '自営業・農業等の者で収入等を証する書類の提出がない（-2点）', value: 'adj_shorui_nashi', points: -2 },
      { label: '該当なし（提出済み、または自営業・農業等ではない）', value: 'adj_shorui_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '同居の祖父母がいますか？（調整指数15）',
    helpText:
      '65歳未満で保育要件証明書がない場合に減点されます。原典 注2により、この減点後の基準指数の下限は2とされています。',
    inputType: 'radio',
    options: [
      { label: '同居の祖父母がいる（65歳未満で保育要件証明書がない場合／-3点）', value: 'adj_sofubo_yes', points: -3 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
];

export const onoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
