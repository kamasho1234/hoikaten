import type { MunicipalityData, Question } from '../types';

// 出典: 日置市「令和8年度 日置市保育所等利用調整基準」
// https://www.city.hioki.kagoshima.jp/documents/14049/riyoutyousei.pdf
// 掲載ページ: https://www.city.hioki.kagoshima.jp/jifuku/kurashi/kosodate-kyoiku/kosodate/08hoikusho.html
// 計算方式: sum方式（原典「1 基準点数」の表が「父親」「母親」の2列で構成され、
//           表末尾に父母の点数を合計する「基準点計」欄があることから父母合算構造。
//           冒頭にも「１及び２の合計点により、点数の高い者から施設の調整を行う。」と明記）
// 最高基準点: 20（父母各10）
// 注:
//  - 原典「4 その他」の「保護者が保育の必要な事由（就労等）が2つ以上ある場合には、原則として
//    点数の高い状況をとり点数を決める。」のため、基準点数は単一selectで実装。
//  - 「妊娠、出産」は原典が「母が出産又は出産予定日の産前6週（多胎児は14週）、産後8週の期間に
//    あって、出産の準備又は休養を要する場合」と母の状態として規定しているため、
//    保護者2（母）にのみ設定。
//  - 除外: 調整点数の「父母のいずれかが利用希望施設で就労する場合（最優先）」は固定点数ではなく
//    順位付けのため実装対象外。「その他市長が定める事由（1〜15）」も範囲値かつ個別判断のため対象外。

const municipality = {
  id: 'hioki',
  name: '日置市',
  slug: 'hioki',
  prefecture: '鹿児島県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // ① 居宅外就労
    { label: '居宅外就労（会社等に雇用・自営業中心者）：月160時間以上の就労', value: `${prefix}_out_emp_160`, points: 10 },
    { label: '居宅外就労（会社等に雇用・自営業中心者）：月120時間以上160時間未満の就労', value: `${prefix}_out_emp_120`, points: 9 },
    { label: '居宅外就労（会社等に雇用・自営業中心者）：月80時間以上120時間未満の就労', value: `${prefix}_out_emp_80`, points: 8 },
    { label: '居宅外就労（会社等に雇用・自営業中心者）：月48時間以上80時間未満の就労', value: `${prefix}_out_emp_48`, points: 7 },
    { label: '居宅外就労（自営業補助者・家族従業者）：月160時間以上の就労', value: `${prefix}_out_hojo_160`, points: 9 },
    { label: '居宅外就労（自営業補助者・家族従業者）：月120時間以上160時間未満の就労', value: `${prefix}_out_hojo_120`, points: 8 },
    { label: '居宅外就労（自営業補助者・家族従業者）：月80時間以上120時間未満の就労', value: `${prefix}_out_hojo_80`, points: 7 },
    { label: '居宅外就労（自営業補助者・家族従業者）：月48時間以上80時間未満の就労', value: `${prefix}_out_hojo_48`, points: 6 },
    // ② 居宅内就労
    { label: '居宅内就労（自営業中心者）：月160時間以上の就労', value: `${prefix}_in_emp_160`, points: 9 },
    { label: '居宅内就労（自営業中心者）：月120時間以上160時間未満の就労', value: `${prefix}_in_emp_120`, points: 8 },
    { label: '居宅内就労（自営業中心者）：月80時間以上120時間未満の就労', value: `${prefix}_in_emp_80`, points: 7 },
    { label: '居宅内就労（自営業中心者）：月48時間以上80時間未満の就労', value: `${prefix}_in_emp_48`, points: 6 },
    { label: '居宅内就労（自営業補助者・家族従業者・内職）：月160時間以上の就労', value: `${prefix}_in_hojo_160`, points: 8 },
    { label: '居宅内就労（自営業補助者・家族従業者・内職）：月120時間以上160時間未満の就労', value: `${prefix}_in_hojo_120`, points: 7 },
    { label: '居宅内就労（自営業補助者・家族従業者・内職）：月80時間以上120時間未満の就労', value: `${prefix}_in_hojo_80`, points: 6 },
    { label: '居宅内就労（自営業補助者・家族従業者・内職）：月48時間以上80時間未満の就労', value: `${prefix}_in_hojo_48`, points: 5 },
    // ③ 妊娠、出産（母のみ。下でparent1から除外）
    { label: '妊娠、出産（産前6週・多胎児は14週、産後8週の期間で出産の準備又は休養を要する場合）', value: `${prefix}_birth`, points: 10 },
    // ④ 保護者の疾病、障がい
    { label: '疾病又は傷病：入院（おおむね1か月以上）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病又は傷病：居宅内で病床に臥せている', value: `${prefix}_ill_bed`, points: 10 },
    { label: '疾病又は傷病：週1日以上の通院加療をし、保育が困難と認められる場合', value: `${prefix}_ill_week`, points: 8 },
    { label: '疾病又は傷病：その他（定期的に通院加療をし、保育が困難と認められる場合）', value: `${prefix}_ill_other`, points: 6 },
    { label: '心身障がい：身体障害者手帳1級・2級、療育手帳A又は精神障害者保健福祉手帳1級を所持し、保育が日常的に困難', value: `${prefix}_dis_1`, points: 10 },
    { label: '心身障がい：身体障害者手帳3級、療育手帳B又は精神障害者保健福祉手帳2級を所持し、保育が日常的に困難', value: `${prefix}_dis_2`, points: 8 },
    { label: '心身障がい：身体障害者手帳4級以下又は精神障害者保健福祉手帳3級を所持し、保育が日常的に困難', value: `${prefix}_dis_3`, points: 6 },
    // ⑤ 同居又は長期入院等している親族の介護、看護
    { label: '介護・看護：入院付添（対象児童が申請児童の兄弟姉妹）', value: `${prefix}_care_kyodai`, points: 10 },
    { label: '介護・看護：入院付添（上記以外の親族）', value: `${prefix}_care_other_hosp`, points: 9 },
    { label: '介護・看護：心身障がい者・児在宅介護', value: `${prefix}_care_dis`, points: 8 },
    { label: '介護・看護：老人在宅看護（寝たきり、認知症等）【要介護3〜5】', value: `${prefix}_care_old`, points: 8 },
    { label: '介護・看護：一般療養在宅看護【要支援1〜要介護2】', value: `${prefix}_care_light`, points: 6 },
    { label: '介護・看護：通院付添い（月13日以上）', value: `${prefix}_care_tsuin_13`, points: 5 },
    { label: '介護・看護：通院付添い（月12日以下）', value: `${prefix}_care_tsuin_12`, points: 4 },
    // ⑥ 就学
    { label: '就学（職業訓練等における職業訓練を含む）：1日4時間以上の就学', value: `${prefix}_school_4`, points: 10 },
    { label: '就学（職業訓練等における職業訓練を含む）：1日4時間未満の就学', value: `${prefix}_school_u4`, points: 9 },
    // ⑦ 災害復旧
    { label: '災害復旧（震災、風水害、火災等）にあたっている', value: `${prefix}_disaster`, points: 10 },
    // ⑧ 虐待・DV
    { label: '虐待やDVのおそれがあること（児童虐待防止法第2条又は配偶者暴力防止法第1条の対象者と認められる場合）', value: `${prefix}_dv`, points: 10 },
    // ⑨ 求職活動
    { label: '求職活動', value: `${prefix}_seek`, points: 4 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ].filter((o) => parentNum === 2 || !o.value.endsWith('_birth'));

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育が必要な理由（基準点数）`,
      helpText:
        parentNum === 2
          ? '最も当てはまるものを1つ選んでください。保育の必要な事由が2つ以上ある場合は、原則として点数の高い状況をとって点数が決まります。父母それぞれの点数を合計したものが世帯の基準点計になります。'
          : '最も当てはまるものを1つ選んでください。保育の必要な事由が2つ以上ある場合は、原則として点数の高い状況をとって点数が決まります。妊娠・出産は原典で「母が出産又は出産予定日の産前6週、産後8週の期間にあって」と母の状態として規定されているため、保護者2（母）の選択肢にのみ設けています。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_setai',
    category: 'adjustment',
    label: '世帯形態にあてはまるものはありますか？（調整点数・世帯形態）',
    helpText: '単身赴任等は、保護者の1人が常時家にいない（住民票上の市外住所である）場合に適用されます。',
    inputType: 'select',
    options: [
      { label: 'ひとり親世帯（+12点）', value: 'adj_setai_hitorioya', points: 12 },
      { label: 'DV支援措置世帯（+4点）', value: 'adj_setai_dv', points: 4 },
      { label: '生活保護世帯（就労による自立支援につながる場合／+4点）', value: 'adj_setai_hogo', points: 4 },
      { label: '単身赴任等により、保護者の1人が常時家にいない（+2点）', value: 'adj_setai_tanshin', points: 2 },
      { label: '該当なし', value: 'adj_setai_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '父母のいずれかが保育士資格等を有し、市内教育保育施設で就労していますか？（調整点数・労働形態）',
    inputType: 'radio',
    options: [
      { label: '父母のいずれかが保育士資格等を有し、市内教育保育施設で就労する（+5点）', value: 'adj_hoikushi_yes', points: 5 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_hitorioya_kyushoku',
    category: 'adjustment',
    label: 'ひとり親で求職活動中ですか？（調整点数・労働形態）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親の求職活動（+3点）', value: 'adj_hitorioya_kyushoku_yes', points: 3 },
      { label: '該当なし', value: 'adj_hitorioya_kyushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukushoku',
    category: 'adjustment',
    label: '産休明け・育休明けで職場復帰しますか？（調整点数・労働形態）',
    inputType: 'radio',
    options: [
      { label: '産休明け及び育休に伴う休業明けで職場復帰する（+3点）', value: 'adj_fukushoku_yes', points: 3 },
      { label: '該当なし', value: 'adj_fukushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogai',
    category: 'adjustment',
    label: '申込児童またはその兄弟姉妹に手帳の交付がありますか？（調整点数・障害、疾病形態）',
    inputType: 'select',
    options: [
      { label: '申込児童が障害者手帳又は療育手帳を有する（集団保育可能に限る／+5点）', value: 'adj_shogai_honnin', points: 5 },
      { label: '申込児童の兄弟姉妹が障害者手帳や療育手帳を有する（+3点）', value: 'adj_shogai_kyodai', points: 3 },
      { label: '該当なし', value: 'adj_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_zaien',
    category: 'adjustment',
    label: 'きょうだいの利用状況は？（調整点数・児童形態）',
    helpText: '入所年度に卒園している場合、転園時に兄弟姉妹が卒園している場合は除きます。',
    inputType: 'select',
    options: [
      { label: '兄弟姉妹が既に同じ施設を利用している（+10点）', value: 'adj_kyodai_zaien_same', points: 10 },
      { label: '別施設を利用している兄弟姉妹が同一施設への移行（転園）を希望する（+5点）', value: 'adj_kyodai_zaien_tenen', points: 5 },
      { label: '該当なし', value: 'adj_kyodai_zaien_none', points: 0 },
    ],
  },
  {
    id: 'adj_doji',
    category: 'adjustment',
    label: '2人以上が同時に同じ保育施設の利用を申し込みますか？（調整点数・児童形態）',
    inputType: 'select',
    options: [
      { label: '2人以上が同時に同じ保育施設の利用を申し込む（多胎児／+3点）', value: 'adj_doji_tataiji', points: 3 },
      { label: '2人以上が同時に同じ保育施設の利用を申し込む（+2点）', value: 'adj_doji_normal', points: 2 },
      { label: '該当なし', value: 'adj_doji_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_shogakusei',
    category: 'adjustment',
    label: '小学生以上18歳未満の兄弟姉妹はいますか？（調整点数・児童形態）',
    inputType: 'select',
    options: [
      { label: '小学生以上、18歳未満の兄弟姉妹が2人以上いる（+2点）', value: 'adj_kyodai_shogakusei_2', points: 2 },
      { label: '小学生以上、18歳未満の兄弟姉妹がいる（+1点）', value: 'adj_kyodai_shogakusei_1', points: 1 },
      { label: '該当なし', value: 'adj_kyodai_shogakusei_none', points: 0 },
    ],
  },
  {
    id: 'adj_shigai',
    category: 'adjustment',
    label: '日置市外に住所がありますか？（調整点数・減算）',
    helpText: '市外児童の入所調整については、市内児童の後に行われます。',
    inputType: 'select',
    options: [
      { label: '市外に住所があり、市内での保育を必要とする事由がある（勤務先が日置市など／-10点）', value: 'adj_shigai_riyu_ari', points: -10 },
      { label: '市外に住所があり、市内での保育を必要とする事由がない（-20点）', value: 'adj_shigai_riyu_nashi', points: -20 },
      { label: '該当なし（日置市内に住所がある）', value: 'adj_shigai_none', points: 0 },
    ],
  },
];

export const hiokiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
