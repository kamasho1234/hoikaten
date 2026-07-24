import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.futtsu.lg.jp/cmsfiles/contents/0000000/315/riyoukijyunn.pdf
//       （富津市 保育所等利用基準・利用調整基準／令和3年1月改正）
// 富津市 保育所等利用基準（別表1）＋利用調整基準（別表2）
// 計算方式: sum方式（「保護者（父母）それぞれの点数を合算する。父又は母が複数の要件に該当したときは、
//   該当要件のうち高い方の点数のみをもって父又は母の点数とする」＝父母各1つ選択→合算）。
// 最高基本点数: 20（父母各10）
// 注:
//  - 「妊娠・出産」は母（保護者2）のみに設定。
//  - 虐待・DVは原典で「父母それぞれの点数とせず、世帯の状況として判断する」と明記されているため、
//    基本点数ではなく世帯単位の調整点数（1回のみ加算）として実装。
//  - 「その他（市長が認める・準用）」は個別判断のため除外。

const municipality = {
  id: 'futtsu',
  name: '富津市',
  slug: 'futtsu',
  prefecture: '千葉県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労
    { label: '就労：月の就労時間が160時間以上', value: `${prefix}_work_160`, points: 10 },
    { label: '就労：月の就労時間が120時間以上160時間未満', value: `${prefix}_work_120`, points: 9 },
    { label: '就労：月の就労時間が80時間以上120時間未満', value: `${prefix}_work_80`, points: 8 },
    { label: '就労：月の就労時間が48時間以上80時間未満', value: `${prefix}_work_48`, points: 7 },
    // 妊娠・出産（母のみ ※後段で母だけに追加）
    // 疾病・障害
    { label: '疾病・障害（入院）：おおむね3月以上の入院', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病・障害（居宅療養）：常時寝たきり（おおむね3月以上寝たきり）', value: `${prefix}_ill_bed`, points: 10 },
    { label: '疾病・障害（居宅療養・一般）：医師がおおむね1月以上の加療（安静）を要すると診断', value: `${prefix}_ill_rest`, points: 7 },
    { label: '疾病・障害（居宅療養・一般）：上記以外で保育が困難であると認められる場合', value: `${prefix}_ill_other`, points: 6 },
    { label: '障害：身体障害者手帳4級以上／精神手帳2級以上／療育手帳Aの2以上', value: `${prefix}_dis_h`, points: 10 },
    { label: '障害：身体障害者手帳4級未満／精神手帳2級未満／療育手帳Aの2未満', value: `${prefix}_dis_l`, points: 8 },
    // 介護・看護
    { label: '介護・看護（居宅外）：おおむね3月以上入院している親族の入院付添', value: `${prefix}_care_out`, points: 10 },
    { label: '介護・看護（居宅内）：寝たきり又は心身障害である親族の常時介護等', value: `${prefix}_care_in`, points: 10 },
    { label: '介護・看護（居宅内）：その他の病人等の介護等', value: `${prefix}_care_other`, points: 5 },
    // 災害復旧
    { label: '災害復旧：震災・火災・風水害等による災害の復旧にあたる場合', value: `${prefix}_disaster`, points: 10 },
    // 求職活動
    { label: '求職活動等：求職又は開業予定のため日中外出を常態としている', value: `${prefix}_seek`, points: 5 },
    // 就学
    { label: '就学・職業訓練：月の就学時間が160時間以上', value: `${prefix}_school_160`, points: 10 },
    { label: '就学・職業訓練：月の就学時間が120時間以上160時間未満', value: `${prefix}_school_120`, points: 9 },
    { label: '就学・職業訓練：月の就学時間が80時間以上120時間未満', value: `${prefix}_school_80`, points: 8 },
    // 育児休業
    { label: '育児休業：取得期間が1年以内の場合', value: `${prefix}_ikuji_1y`, points: 10 },
    { label: '育児休業：取得期間が1年を超え、上の子が当該年度4月初日で3歳以上', value: `${prefix}_ikuji_over3`, points: 9 },
    { label: '育児休業：取得期間が1年を超え、上の子が当該年度4月初日で3歳未満', value: `${prefix}_ikuji_under3`, points: 8 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 妊娠・出産は母（保護者2）のみ
  if (parentNum === 2) {
    options.splice(4, 0,
      { label: '妊娠・出産：出産予定月の前後2か月', value: `${prefix}_birth`, points: 10 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（父母それぞれの点数を合算します）。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（+13点）', value: 'adj_single_yes', points: 13 },
      { label: '該当なし', value: 'adj_single_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士等として市内施設で就労していますか？（調整点数）',
    helpText: '保育士・幼稚園教諭又は保育教諭の資格を持ち、市内の認可保育所等（連携施設を含む）で就労又は就労内定している場合',
    inputType: 'radio',
    options: [
      { label: '保育士等の資格を持ち市内の認可保育所等で就労又は就労内定している（+18点）', value: 'adj_hoikushi_yes', points: 18 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯で就労により自立が見込まれますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯のうち、保護者の就労により自立が見込まれる世帯（+3点）', value: 'adj_seikatsuhogo_yes', points: 3 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_kaiko',
    category: 'adjustment',
    label: '生計中心者が解雇・倒産で就労を要しますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '生計中心者の解雇・倒産により生計維持のため就労を要する（+3点）', value: 'adj_kaiko_yes', points: 3 },
      { label: '該当なし', value: 'adj_kaiko_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukki',
    category: 'adjustment',
    label: '産後休暇又は育児休業が終了し復帰しますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '産後休暇又は育児休業が終了し、復帰する場合（+3点）', value: 'adj_fukki_yes', points: 3 },
      { label: '該当なし', value: 'adj_fukki_none', points: 0 },
    ],
  },
  {
    id: 'adj_chiiki',
    category: 'adjustment',
    label: '地域型保育事業による保育を受けていましたか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '地域型保育事業による保育を受けていた場合（+3点）', value: 'adj_chiiki_yes', points: 3 },
      { label: '該当なし', value: 'adj_chiiki_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: '兄弟姉妹の入所・申込に関する状況（調整点数）',
    inputType: 'select',
    options: [
      { label: '既に兄弟姉妹が入所しており、同一保育所に入所を希望する（+2点）', value: 'adj_kyodai_same', points: 2 },
      { label: '兄弟姉妹2人以上で同時に利用申込（転園を除く）をしている（+1点）', value: 'adj_kyodai_twins', points: 1 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者が単身赴任をしていますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '保護者が単身赴任の場合（+1点）', value: 'adj_tanshin_yes', points: 1 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_gyakutai',
    category: 'adjustment',
    label: '虐待・DVに関する状況（世帯の状況として判断）（調整点数）',
    helpText: '虐待・DV要件は父母それぞれの点数とせず、世帯の状況として判断されます。',
    inputType: 'select',
    options: [
      { label: '過去に虐待や児童相談所等による保護の経緯があるなど、児童の心身に危険が及ぶ可能性が高く、社会的養護が必要な場合（+50点）', value: 'adj_gyakutai_50', points: 50 },
      { label: '保護者が児童を養育する能力が著しく欠如していると認められる場合（+49点）', value: 'adj_gyakutai_49', points: 49 },
      { label: '保護者が、配偶者からの暴力により児童の保育を行うことが困難であると認められる場合（+48点）', value: 'adj_gyakutai_48', points: 48 },
      { label: '該当なし', value: 'adj_gyakutai_none', points: 0 },
    ],
  },
  {
    id: 'adj_dokyo',
    category: 'adjustment',
    label: '65歳未満の親族等が保育できる状況（調整点数）',
    inputType: 'select',
    options: [
      { label: '65歳未満の同居の親族その他の者が保育できる場合（-2点）', value: 'adj_dokyo_same', points: -2 },
      { label: '65歳未満の近居の親族その他の者が保育できる場合（同字又は自動車で概ね10分の範囲）（-1点）', value: 'adj_dokyo_near', points: -1 },
      { label: '該当なし', value: 'adj_dokyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_naitei_mitei',
    category: 'adjustment',
    label: '就労内定で就労開始時期が未定ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '就労内定のうち、就労開始時期が未定の場合（-1点）', value: 'adj_naitei_mitei_yes', points: -1 },
      { label: '該当なし', value: 'adj_naitei_mitei_none', points: 0 },
    ],
  },
  {
    id: 'adj_mishugaku',
    category: 'adjustment',
    label: '入所申込みのない未就学の兄弟姉妹がいますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '兄弟姉妹に保育所その他保育施設への入所申込みのない未就学児がいる場合（-1点）', value: 'adj_mishugaku_yes', points: -1 },
      { label: '該当なし', value: 'adj_mishugaku_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '保育料又は副食費を滞納していますか？（調整点数）',
    helpText: 'り災等やむを得ない事由による場合や、滞納返済が進んでいる場合等を除く',
    inputType: 'radio',
    options: [
      { label: '正当な理由がなく、納付期限経過分の保育料又は副食費を滞納している場合（-2点）', value: 'adj_overdue_yes', points: -2 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
];

export const futtsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
