import type { MunicipalityData, Question } from '../types';

// 出典: 周南市「周南市子ども・子育て支援法等施行細則」（令和2年7月8日規則第50号）
//       別表（第18条関係）／一部改正〔令和4年規則1号・6年4号〕
// https://en3-jg.d1-law.com/shunan/d1w_reiki/H502902100050/H502902100050_j.html
// 掲載ページ（例規集トップ）: https://en3-jg.d1-law.com/shunan/d1w_reiki/reiki.html
// 根拠の所在: 市の「令和8年度保育所等の申込みについて」および「利用申込みQ&A」に
//   「周南市子ども・子育て支援法等施行細則第18条に基づき、各施設の受入れ状況に応じて、
//   市が利用調整を行います」と明記されており、同細則の別表が利用調整の指数表にあたる。
//   https://www.city.shunan.lg.jp/site/kodomosien/136999.html
// 計算方式: min方式（低い方を採用）
//   別表 備考2「基本点数は、教育・保育給付認定保護者それぞれの状況のうち、
//   最も低い点数を採用する」と明記されている。
//   備考1「評点数は、基本点数と調整点数を合計したものとする」。
// 最高基準指数: 100（父母それぞれの基本点数の最高が100。低い方を採用するため世帯も最高100）
// 注:
//  - 細則第18条第2項は「別表により算定した評点数の高い保育認定子どもから優先的に利用させる」
//    と定め、評点数が同じ場合は「家庭の状況等を考慮して総合的に調整する」としている。
//  - 「介護・看護」「在学・職業訓練」は原典が「労働の時間に準ずる／労働の点数に準ずる」と
//    定めているため、労働と同じ6段階に展開している。
//  - 調整点数は原典に「いずれか一つ」の限定がないため、項目ごとに独立した設問
//    （重複加算あり）として実装している。
//  - 「市長が特に認める事由（市長が必要と認める点数）」は点数が定まっていないため
//    設問化できない。helpText で案内する。
//  - 市の利用要件が「月60時間以上の就労など」であるため、労働は月60時間以上のみを設けている。
//  - 細則第18条第3項により、地域型保育施設の卒園児が連携施設の利用を希望する場合は
//    評点数によらず他の申込者に優先する（点数化されないため設問には含めない）。

const municipality = {
  id: 'shunan',
  name: '周南市',
  slug: 'shunan',
  prefecture: '山口県',
  maxBasePoints: 100,
  scoringMethod: 'min',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 労働
    { label: '労働：労働時間が月160時間以上', value: `${prefix}_work_160`, points: 100 },
    { label: '労働：月140時間以上160時間未満', value: `${prefix}_work_140`, points: 90 },
    { label: '労働：月120時間以上140時間未満', value: `${prefix}_work_120`, points: 80 },
    { label: '労働：月100時間以上120時間未満', value: `${prefix}_work_100`, points: 70 },
    { label: '労働：月80時間以上100時間未満', value: `${prefix}_work_80`, points: 60 },
    { label: '労働：月60時間以上80時間未満', value: `${prefix}_work_60`, points: 50 },
    // 妊娠・出産
    { label: '妊娠・出産：出産予定日から前後8週間以内', value: `${prefix}_birth`, points: 80 },
    // 疾病・負傷
    { label: '疾病・負傷：長期入院・寝たきり', value: `${prefix}_ill_hosp`, points: 100 },
    { label: '疾病・負傷：自宅療養で安静を要する等、保育が日常的に困難', value: `${prefix}_ill_rest`, points: 80 },
    { label: '疾病・負傷：上記以外の疾病等により保育が困難', value: `${prefix}_ill_other`, points: 60 },
    // 障害
    { label: '障害：身体障害者手帳1級、精神障害者保健福祉手帳1級または療育手帳Aに該当', value: `${prefix}_dis_1`, points: 100 },
    { label: '障害：身体障害者手帳2級もしくは3級、精神障害者保健福祉手帳2級もしくは3級または療育手帳Bに該当', value: `${prefix}_dis_2`, points: 80 },
    { label: '障害：身体障害者手帳4級以下に該当', value: `${prefix}_dis_4`, points: 60 },
    // 介護・看護（労働の時間・点数に準ずる）
    { label: '介護・看護：月160時間以上', value: `${prefix}_care_160`, points: 100 },
    { label: '介護・看護：月140時間以上160時間未満', value: `${prefix}_care_140`, points: 90 },
    { label: '介護・看護：月120時間以上140時間未満', value: `${prefix}_care_120`, points: 80 },
    { label: '介護・看護：月100時間以上120時間未満', value: `${prefix}_care_100`, points: 70 },
    { label: '介護・看護：月80時間以上100時間未満', value: `${prefix}_care_80`, points: 60 },
    { label: '介護・看護：月60時間以上80時間未満', value: `${prefix}_care_60`, points: 50 },
    // 災害復旧
    { label: '災害復旧：震災、風水害、火災その他の災害による居宅消失・破損の復旧', value: `${prefix}_disaster`, points: 100 },
    // 在学・職業訓練（労働の時間・点数に準ずる）
    { label: '在学・職業訓練：月160時間以上', value: `${prefix}_school_160`, points: 100 },
    { label: '在学・職業訓練：月140時間以上160時間未満', value: `${prefix}_school_140`, points: 90 },
    { label: '在学・職業訓練：月120時間以上140時間未満', value: `${prefix}_school_120`, points: 80 },
    { label: '在学・職業訓練：月100時間以上120時間未満', value: `${prefix}_school_100`, points: 70 },
    { label: '在学・職業訓練：月80時間以上100時間未満', value: `${prefix}_school_80`, points: 60 },
    { label: '在学・職業訓練：月60時間以上80時間未満', value: `${prefix}_school_60`, points: 50 },
    // 児童虐待・DV等
    { label: '児童虐待・DV等：虐待やDV等により、児童福祉の観点から特に保育が必要であると判断される場合', value: `${prefix}_gyakutai`, points: 100 },
    // 求職活動
    { label: '求職活動中', value: `${prefix}_seek`, points: 10 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の状況（基本点数）`,
      helpText:
        '当てはまる項目を1つ選んでください。周南市は父母それぞれの状況のうち「最も低い点数」を世帯の基本点数とします（別表 備考2）。保育所等を利用できるのは月60時間以上の就労などの要件を満たす場合です。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（+100点）', value: 'adj_single_parent_yes', points: 100 },
      { label: '該当なし', value: 'adj_single_parent_no', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+90点）', value: 'adj_seikatsuhogo_yes', points: 90 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだいが利用中または利用見込みの施設に入所を希望しますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが利用中または利用見込みの施設への入所を希望する（+100点）', value: 'adj_kyodai_yes', points: 100 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士等で市内の保育施設等に就労予定ですか？（調整点数）',
    helpText: '保育士、幼稚園教諭、保育教諭、看護師または保健師であって、市内の保育施設等に就労予定である場合が対象です。',
    inputType: 'radio',
    options: [
      { label: '保育士等として市内の保育施設等に就労予定である（+100点）', value: 'adj_hoikushi_yes', points: 100 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikukyu_ake',
    category: 'adjustment',
    label: '保護者が産後休暇または育児休業明けですか？（調整点数）',
    helpText:
      'このほか原典には「市長が特に認める事由（市長が必要と認める点数）」がありますが、点数が定まっていないためシミュレーターには含めていません。',
    inputType: 'radio',
    options: [
      { label: '産後休暇または育児休業明け（+50点）', value: 'adj_ikukyu_ake_yes', points: 50 },
      { label: '該当なし', value: 'adj_ikukyu_ake_none', points: 0 },
    ],
  },
];

export const shunanData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
