import type { MunicipalityData, Question } from '../types';

// 出典: 八女市「保育所、認定こども園及び家庭的保育事業等の利用における調整のための基準
//       （保育所等利用調整基準）」別表
// https://www.city.yame.fukuoka.jp/material/files/group/11/riyoutyouseikijyunn.pdf
// 計算方式: sum方式（(1)基本点数に「父母それぞれの点数を合算した点数を基本点数とする。」と明記）
// 最高基本点数: 200（父母各100）
// 注:
//  - 原典の備考1「父母その他の保護者が複数の要件に該当する場合は、各々について基本点数の高い方の
//    要件を採用する。」のため、基本点数は単一selectで実装。
//  - 原典の備考3「育児休業取得者については、就労の基本点数により算定する。」をhelpTextで案内。
//  - **ひとり親世帯は基本点数と調整点数の両方で加算される**。
//    基本点数「ひとり親世帯については、当該ひとり親の点数と100点との合計点数を基本点数とする」＋
//    調整点数（世帯の状況）「ひとり親世帯である場合 100」。
//    このシミュレーターでは保護者2を未回答にした場合に基本点数側の+100を表現できないため、
//    調整点数の設問で +200（基本点数分100＋調整点数分100）として実装し、helpTextに内訳を明記。
//  - 調整点数は原典の備考1「同一区分内で複数の要件に該当する場合は、当該区分内の点数の高い方を
//    採用する。」のため、区分ごとにselectで実装。
//  - 除外: 基本点数「その他（特に保育が必要と認める場合※）100」および調整点数「その他（特に保育が
//    必要と認める場合※）100」は、備考の「※については、児童又は世帯の状況に応じて別途判断する」に
//    より市の個別判断のため実装対象外。

const municipality = {
  id: 'yame',
  name: '八女市',
  slug: 'yame',
  prefecture: '福岡県',
  maxBasePoints: 200,
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
      label: `${parentLabel}の保育を必要とする事由・状況（基本点数）`,
      helpText:
        '最も当てはまるものを1つ選んでください。複数の要件に該当する場合は基本点数の高い方の要件が採用されます。就労時間数には休憩時間を含みます。育児休業取得者については、就労の基本点数により算定されます。',
      inputType: 'select',
      options: [
        // 就労（被雇用者、自営業者又は農業者等）
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり160時間以上', value: `${prefix}_work_160`, points: 100 },
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり150時間以上160時間未満', value: `${prefix}_work_150`, points: 96 },
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり140時間以上150時間未満', value: `${prefix}_work_140`, points: 92 },
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり130時間以上140時間未満', value: `${prefix}_work_130`, points: 88 },
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり120時間以上130時間未満', value: `${prefix}_work_120`, points: 84 },
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり110時間以上120時間未満', value: `${prefix}_work_110`, points: 80 },
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり100時間以上110時間未満', value: `${prefix}_work_100`, points: 76 },
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり90時間以上100時間未満', value: `${prefix}_work_90`, points: 72 },
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり80時間以上90時間未満', value: `${prefix}_work_80`, points: 68 },
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり70時間以上80時間未満', value: `${prefix}_work_70`, points: 64 },
        { label: '就労（被雇用者・自営業者・農業者等）：1か月当たり60時間以上70時間未満', value: `${prefix}_work_60`, points: 60 },
        // 就労（家内労働者）
        { label: '就労（家内労働者）：1か月当たり120時間以上', value: `${prefix}_kanai_120`, points: 82 },
        { label: '就労（家内労働者）：1か月当たり90時間以上120時間未満', value: `${prefix}_kanai_90`, points: 70 },
        { label: '就労（家内労働者）：1か月当たり60時間以上90時間未満', value: `${prefix}_kanai_60`, points: 58 },
        // 妊娠又は出産
        { label: '妊娠又は出産：産前3か月から産後2か月までの期間（いずれも出産月を除く）', value: `${prefix}_birth`, points: 80 },
        // 保護者の疾病又は障がい
        { label: '疾病（入院）：1か月以上を要する場合', value: `${prefix}_ill_hosp`, points: 100 },
        { label: '疾病（自宅療養又は通院）：寝たきりの状態等で常時安静が必要であり、身の回りの世話ができない場合', value: `${prefix}_ill_bed`, points: 100 },
        { label: '疾病（自宅療養又は通院）：通院又は治療を受け、他者の援助（介護）を必要とする場合', value: `${prefix}_ill_care`, points: 68 },
        { label: '疾病（自宅療養又は通院）：精神疾患により保育が常時困難な場合', value: `${prefix}_ill_mental`, points: 68 },
        { label: '疾病（自宅療養又は通院）：日常生活は1人で可能であるが、保育は常時困難な場合', value: `${prefix}_ill_light`, points: 50 },
        { label: '障がい：身体障害者手帳若しくは精神障害者保健福祉手帳1級若しくは2級又は療育手帳Aの交付を受けている場合', value: `${prefix}_dis_1`, points: 100 },
        { label: '障がい：身体障害者手帳3級若しくは4級又は療育手帳B1の交付を受けている場合', value: `${prefix}_dis_2`, points: 68 },
        { label: '障がい：上記のほか、身体障害者手帳等の交付を受けていて保育に支障がある場合', value: `${prefix}_dis_3`, points: 50 },
        // 同居親族の介護又は看護
        { label: '同居親族の介護・看護：入院中の同居親族に常時付添いが必要な場合', value: `${prefix}_care_hosp`, points: 92 },
        { label: '同居親族の介護・看護：病気等の同居親族に常時付添いが必要な場合', value: `${prefix}_care_always`, points: 68 },
        { label: '同居親族の介護・看護：病気等の同居親族の介護又は看護により保育に支障がある場合', value: `${prefix}_care_other`, points: 60 },
        // 災害復旧
        { label: '災害復旧：震災、風水害、火災その他の災害により自宅や近隣の復旧に当たっている場合', value: `${prefix}_disaster`, points: 100 },
        // 求職活動等
        { label: '求職活動中又は起業準備中である場合', value: `${prefix}_seek`, points: 50 },
        // 就学
        { label: '就学：職業訓練校等に1か月当たり120時間以上の就学', value: `${prefix}_school_120`, points: 82 },
        { label: '就学：職業訓練校等に1か月当たり60時間以上120時間未満の就学', value: `${prefix}_school_60`, points: 58 },
        // 虐待又はDV
        { label: '虐待又はDV：特に保育が必要と認める場合', value: `${prefix}_dv`, points: 100 },
        // その他（新生児の育児）
        { label: '新生児の育児により保育に支障がある場合（育児休業取得者を除く）', value: `${prefix}_newborn`, points: 68 },
        // 該当なし
        { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_setai',
    category: 'adjustment',
    label: '世帯の状況にあてはまるものは？（調整点数・世帯の状況）',
    helpText:
      '同一区分内で複数の要件に該当する場合は点数の高い方が採用されます。なお、ひとり親世帯は調整点数の+100点に加えて、基本点数でも「当該ひとり親の点数と100点との合計点数を基本点数とする」と定められているため、あわせて+200点として計算しています。',
    inputType: 'select',
    options: [
      { label: 'ひとり親世帯である（調整点数+100点／基本点数+100点＝合計+200点）', value: 'adj_setai_hitorioya', points: 200 },
      { label: '生活保護世帯である（+100点）', value: 'adj_setai_hogo', points: 100 },
      { label: '同居親族に身体障害者手帳等を受けている者がいる（+5点）', value: 'adj_setai_techo', points: 5 },
      { label: '該当なし', value: 'adj_setai_none', points: 0 },
    ],
  },
  {
    id: 'adj_jido',
    category: 'adjustment',
    label: '申込児童の状況にあてはまるものは？（調整点数・申込児童の状況）',
    helpText: '同一区分内で複数の要件に該当する場合は点数の高い方が採用されます。',
    inputType: 'select',
    options: [
      { label: '障がい児、要保護児童等児童福祉の観点から保育が必要と認められる（+50点）', value: 'adj_jido_shogai', points: 50 },
      { label: '保育所等（保育所、認定こども園及び小規模保育事業）の在園児が転園申込みを行う（+10点）', value: 'adj_jido_tenen', points: 10 },
      { label: '市内の家庭的保育事業等の卒園児が連携施設以外の保育所等の入所申込みを行う（+10点）', value: 'adj_jido_sotsuen', points: 10 },
      { label: '該当なし', value: 'adj_jido_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだいの状況にあてはまるものは？（調整点数・兄弟姉妹の状況）',
    helpText: '同一区分内で複数の要件に該当する場合は点数の高い方が採用されます。',
    inputType: 'select',
    options: [
      { label: '既に兄弟姉妹が保育所等を利用している（在園児の転園を希望している場合を除く／+30点）', value: 'adj_kyodai_riyou', points: 30 },
      { label: '兄弟姉妹が同時に申込みを行う（+10点）', value: 'adj_kyodai_doji', points: 10 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者は保育士等ですか？（調整点数・特定教育・保育施設等の保育士等）',
    helpText:
      '保育士等とは保育士、保育教諭又は幼稚園教諭をいいます。同一区分内で複数の要件に該当する場合は点数の高い方が採用されます。',
    inputType: 'select',
    options: [
      { label: '市内の特定教育・保育施設等（特定教育・保育施設及び特定地域型保育事業）に勤務する保育士等である（+100点）', value: 'adj_hoikushi_shinai', points: 100 },
      { label: '上記以外の施設に勤務する保育士等である（+5点）', value: 'adj_hoikushi_other', points: 5 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者が単身赴任中ですか？（調整点数・その他）',
    inputType: 'radio',
    options: [
      { label: '保護者が国外又は国内へ単身赴任中である（+10点）', value: 'adj_tanshin_yes', points: 10 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
];

export const yameData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
