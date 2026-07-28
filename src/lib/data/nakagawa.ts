import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.nakagawa.lg.jp/uploaded/attachment/31438.pdf
//       （那珂川市「令和8年度 保育施設等利用申込案内」P.8〜9「（9）利用調整」）
// 那珂川市 利用調整（1. 基本点数 ＋ 2. 調整点数）
// 計算方式: sum方式（備考に「父母それぞれの基本点数を合算して、世帯の基本点数とする」と明記）。
// 最高基本点数: 400（父母各200＝災害復旧・児童虐待/配偶者からの暴力）
// 注:
//  - 備考「父母が複数の事由に該当する場合は、各々について基本点数が高い方の理由・状況を採用する」に
//    従い、父母それぞれ単一選択とした。
//  - 基本点数の「その他（児童福祉の観点から、市長が必要と認める場合）200」は市長の個別判断のため除外。
//  - 調整点数の「社会的養護が必要な世帯で、市長が緊急に保育の実施が必要と認めた場合 10」も
//    市長の個別判断のため除外。
//  - 調整点数の「その他（点数欄「−」）」と「育児休業延長希望（合算点数に0を乗じる）」は
//    固定点数の加減算ではないため除外。
//  - きょうだい児の「3人以上の場合、1人につき5点加算」は児童数により変動するためhelpTextで案内。

const municipality = {
  id: 'nakagawa',
  name: '那珂川市',
  slug: 'nakagawa',
  prefecture: '福岡県',
  maxBasePoints: 400,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労
    { label: '就労：1か月の勤労が160時間以上', value: `${prefix}_work_160`, points: 100 },
    { label: '就労：1か月の勤労が140時間以上160時間未満', value: `${prefix}_work_140`, points: 90 },
    { label: '就労：1か月の勤労が120時間以上140時間未満', value: `${prefix}_work_120`, points: 80 },
    { label: '就労：1か月の勤労が100時間以上120時間未満', value: `${prefix}_work_100`, points: 70 },
    { label: '就労：1か月の勤労が48時間以上100時間未満', value: `${prefix}_work_48`, points: 60 },
    // 内職
    { label: '内職', value: `${prefix}_naishoku`, points: 60 },
    // 妊娠、出産
    { label: '妊娠・出産：妊娠中であるか又は出産後間がない場合（出産日の前8週間／多胎妊娠は14週間から出産日の後8週間を経過する日の月末まで）', value: `${prefix}_birth`, points: 80 },
    // 疾病、負傷
    { label: '疾病・負傷：入院加療又は安静を要する（常時臥床）状態', value: `${prefix}_ill_hosp`, points: 100 },
    { label: '疾病・負傷：居宅内で療養を要する状態', value: `${prefix}_ill_home`, points: 70 },
    { label: '疾病・負傷：上記以外', value: `${prefix}_ill_other`, points: 30 },
    // 精神又は身体の障がい
    { label: '障がい：身体障害者手帳1〜3級、療育手帳、精神障害者保健福祉手帳1〜2級', value: `${prefix}_dis_grade`, points: 90 },
    { label: '障がい：上記以外', value: `${prefix}_dis_other`, points: 30 },
    // 同居親族等の介護、看護
    { label: '同居親族等の介護・看護：入院加療又は安静を要する（常時臥床）状態', value: `${prefix}_care_hosp`, points: 70 },
    { label: '同居親族等の介護・看護：上記以外', value: `${prefix}_care_other`, points: 30 },
    // 災害復旧
    { label: '災害復旧：震災、風水害、火災その他の災害の復旧に当たっている場合', value: `${prefix}_disaster`, points: 200 },
    // 求職活動
    { label: '求職活動：利用申込時点で、求職活動を行っている場合', value: `${prefix}_seek_now`, points: 50 },
    { label: '求職活動：利用開始後、求職活動を行う場合', value: `${prefix}_seek_after`, points: 30 },
    // 就学
    { label: '就学：学校教育法に規定する学校等に在学（入学予定を含む）、又は職業訓練校等における職業訓練を受けている場合', value: `${prefix}_school`, points: 70 },
    // 児童虐待・配偶者からの暴力
    { label: '児童虐待・配偶者からの暴力：児童相談所等と連携し、社会的養護が必要な状態にあり、特に保育が必要と認められる場合', value: `${prefix}_dv`, points: 200 },
    // 育児休業取得
    { label: '育児休業取得：育児休業取得時に、既に保育を利用している児童がいて継続利用が可能である場合', value: `${prefix}_ikuji`, points: 50 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育できない理由・状況`,
      helpText: '最も当てはまる状況を1つ選んでください。複数の事由に該当する場合は基本点数が高い方を採用します。父母それぞれの基本点数を合算して世帯の基本点数とします。「就労」の就労時間は休憩時間を含みます。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_setai',
    category: 'adjustment',
    label: '世帯の状況（調整点数）',
    helpText: '最も当てはまるものを1つ選んでください',
    inputType: 'select',
    options: [
      { label: 'ひとり親家庭の状態にある（+120点）', value: 'adj_setai_single', points: 120 },
      { label: '生活保護世帯で就労による自立支援につながる（就労・求職活動）と判断される（+15点）', value: 'adj_setai_hogo', points: 15 },
      { label: '生計中心者の失業等（自己都合以外）により、就労の必要性が高い（+10点）', value: 'adj_setai_shitsugyo', points: 10 },
      { label: '該当なし', value: 'adj_setai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogaiji',
    category: 'adjustment',
    label: '利用申込児童が精神又は身体に障がいを有していますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '利用申込児童が精神又は身体に障がいを有している（+5点）', value: 'adj_shogaiji_yes', points: 5 },
      { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_fukushoku',
    category: 'adjustment',
    label: '育児休業を取得しており、復職に伴い利用申込をしますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '育児休業を取得しており、復職に伴い利用申込をする（+15点）', value: 'adj_ikuji_fukushoku_yes', points: 15 },
      { label: '該当なし', value: 'adj_ikuji_fukushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母のうちいずれかが単身赴任していますか？（調整点数）',
    helpText: '「単身赴任」は、該当する父母のいずれかが利用申込児童と異なる住所地に居住している場合に限ります',
    inputType: 'radio',
    options: [
      { label: '父母のうちいずれかが単身赴任している（+5点）', value: 'adj_tanshin_yes', points: 5 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_koyonushi',
    category: 'adjustment',
    label: '雇用主が父母の親族ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '雇用主が父母の親族である（-5点）', value: 'adj_koyonushi_yes', points: -5 },
      { label: '該当なし', value: 'adj_koyonushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだい児の状況（調整点数）',
    helpText: '最も当てはまるものを1つ選んでください。3人以上の場合は1人につき5点が加算されます。',
    inputType: 'select',
    options: [
      { label: '2号または3号認定を受けた既入所きょうだい児と利用申込児童が合わせて2人以上いる（+10点）', value: 'adj_kyodai_zaien', points: 10 },
      { label: '既入所きょうだい児がいない場合で、児童2人以上同時に利用申込をする（+5点）', value: 'adj_kyodai_doji', points: 5 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_moshikomi',
    category: 'adjustment',
    label: '申込の状況（調整点数）',
    helpText: '最も当てはまるものを1つ選んでください',
    inputType: 'select',
    options: [
      { label: '地域型保育事業所等の卒園児である（+15点）', value: 'adj_moshikomi_sotsuen', points: 15 },
      { label: '1号認定から2号認定へ変更する場合で、同一施設の利用を希望する（+10点）', value: 'adj_moshikomi_1to2', points: 10 },
      { label: '現年度中に入所内定をキャンセルした（小規模保育事業所の内定キャンセルを除く）（-40点）', value: 'adj_moshikomi_cancel', points: -40 },
      { label: '該当なし', value: 'adj_moshikomi_none', points: 0 },
    ],
  },
  {
    id: 'adj_riyofuka',
    category: 'adjustment',
    label: '利用不可の状況（調整点数）',
    helpText: '「利用不可期間」とは、保育施設の利用申込を行い、利用不承諾となっている期間です',
    inputType: 'select',
    options: [
      { label: '利用申込時点で、利用不可期間が利用希望月より連続して12ヶ月以上ある（+5点）', value: 'adj_riyofuka_12', points: 5 },
      { label: '利用申込時点で、利用不可期間が利用希望月より連続して6ヶ月以上ある（+3点）', value: 'adj_riyofuka_6', points: 3 },
      { label: '利用申込時点で、利用不可期間が利用希望月より連続して3ヶ月以上ある（+1点）', value: 'adj_riyofuka_3', points: 1 },
      { label: '該当なし', value: 'adj_riyofuka_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '市内の認可保育施設で保育士等として雇用されていますか？（調整点数）',
    helpText: '雇用予定を含みます',
    inputType: 'radio',
    options: [
      { label: '市内の認可保育施設で保育士等として雇用されている（雇用予定を含む）（+100点）', value: 'adj_hoikushi_yes', points: 100 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
];

export const nakagawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
