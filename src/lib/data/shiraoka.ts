import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.shiraoka.lg.jp/material/files/group/41/01_R8_26-27nyuusyokizyunnnhyou.pdf
//       （令和8年度 白岡市 保育所入所選考基準表）
// 白岡市 保育所入所選考基準表（基準指数＋調整指数）
// 計算方式: sum方式（※1「父母それぞれの指数を合算し、世帯の指数を決定する」）
// 最高基準指数: 20（父母各10）
// 注:
//  - 番号9「就学・技能修得」は独立点数を持たず、番号1（居宅外就労）または番号3（求職）を準用するため、
//    就学・技能修得中の方は該当する就労・求職区分を選択する運用（helpTextで案内）。
//  - 番号5「出産」は母（保護者2）のみに設定。
//  - 番号11「その他（上記以外で明らかに保育に当たれない場合）」および調整指数「その他（要保護児童等）」は
//    個別判断のため除外。
//  - 調整指数の保育士加点（番号1・2）は原典では父母それぞれに加点だが、本シミュレーターでは世帯単位で
//    最大該当を採用（一方/両方の別は割愛）。

const municipality = {
  id: 'shiraoka',
  name: '白岡市',
  slug: 'shiraoka',
  prefecture: '埼玉県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 1. 就労（居宅外：外勤・自営）
    { label: '就労（居宅外）：週5日以上／日中就労8時間以上', value: `${prefix}_out5_8`, points: 10 },
    { label: '就労（居宅外）：週5日以上／日中就労7時間以上', value: `${prefix}_out5_7`, points: 9 },
    { label: '就労（居宅外）：週5日以上／日中就労6時間以上', value: `${prefix}_out5_6`, points: 8 },
    { label: '就労（居宅外）：週5日以上／日中就労5時間以上', value: `${prefix}_out5_5`, points: 7 },
    { label: '就労（居宅外）：週5日以上／日中就労4時間以上', value: `${prefix}_out5_4`, points: 6 },
    { label: '就労（居宅外）：週4日以上／日中就労8時間以上', value: `${prefix}_out4_8`, points: 8 },
    { label: '就労（居宅外）：週4日以上／日中就労7時間以上', value: `${prefix}_out4_7`, points: 7 },
    { label: '就労（居宅外）：週4日以上／日中就労6時間以上', value: `${prefix}_out4_6`, points: 6 },
    { label: '就労（居宅外）：週4日以上／日中就労5時間以上', value: `${prefix}_out4_5`, points: 5 },
    { label: '就労（居宅外）：週4日以上／日中就労4時間以上', value: `${prefix}_out4_4`, points: 4 },
    // 2. 就労（居宅内：自営）
    { label: '就労（居宅内・自営）：週5日以上／日中就労8時間以上', value: `${prefix}_in5_8`, points: 9 },
    { label: '就労（居宅内・自営）：週5日以上／日中就労7時間以上', value: `${prefix}_in5_7`, points: 8 },
    { label: '就労（居宅内・自営）：週5日以上／日中就労6時間以上', value: `${prefix}_in5_6`, points: 7 },
    { label: '就労（居宅内・自営）：週5日以上／日中就労5時間以上', value: `${prefix}_in5_5`, points: 6 },
    { label: '就労（居宅内・自営）：週5日以上／日中就労4時間以上', value: `${prefix}_in5_4`, points: 5 },
    { label: '就労（居宅内・自営）：週4日以上／日中就労8時間以上', value: `${prefix}_in4_8`, points: 8 },
    { label: '就労（居宅内・自営）：週4日以上／日中就労7時間以上', value: `${prefix}_in4_7`, points: 7 },
    { label: '就労（居宅内・自営）：週4日以上／日中就労6時間以上', value: `${prefix}_in4_6`, points: 6 },
    { label: '就労（居宅内・自営）：週4日以上／日中就労5時間以上', value: `${prefix}_in4_5`, points: 5 },
    { label: '就労（居宅内・自営）：週4日以上／日中就労4時間以上', value: `${prefix}_in4_4`, points: 4 },
    // 3. 求職（内定）
    { label: '求職（内定）：週5日以上／就労予定120時間／月以上', value: `${prefix}_seek5_120`, points: 6 },
    { label: '求職（内定）：週5日以上／就労予定64〜120時間／月未満', value: `${prefix}_seek5_64`, points: 4 },
    { label: '求職（内定）：週4日以上／就労予定120時間／月以上', value: `${prefix}_seek4_120`, points: 5 },
    { label: '求職（内定）：週4日以上／就労予定64〜120時間／月未満', value: `${prefix}_seek4_64`, points: 3 },
    { label: '求職（内定）：上記以外の就労時間', value: `${prefix}_seek_other`, points: 2 },
    { label: '求職（未定）：求職中（就労先未定）', value: `${prefix}_seek_none`, points: 1 },
    // 4. 不存在
    { label: '不存在：死亡・離婚・行方不明・拘禁など', value: `${prefix}_absence`, points: 10 },
    // 5. 出産（母のみ ※後段で母だけに追加）
    // 6. 疾病・障がい
    { label: '疾病：1か月以上入院している場合（入院予定を含む）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病：常時病臥・感染症', value: `${prefix}_ill_bed`, points: 10 },
    { label: '疾病（精神性）：精神障害者保健福祉手帳1〜3級', value: `${prefix}_ill_mental_h`, points: 10 },
    { label: '疾病（精神性）：上記以外の程度', value: `${prefix}_ill_mental_l`, points: 7 },
    { label: '疾病（一般療養）：安静を要する程度', value: `${prefix}_ill_rest`, points: 7 },
    { label: '疾病（一般療養）：通院を要する程度', value: `${prefix}_ill_visit`, points: 3 },
    { label: '障がい：身体障害者手帳1・2級／みどりの手帳（療育手帳）A〜B', value: `${prefix}_dis_12`, points: 10 },
    { label: '障がい：身体障害者手帳3級／みどりの手帳（療育手帳）C', value: `${prefix}_dis_3`, points: 8 },
    { label: '障がい：身体障害者手帳4級以下', value: `${prefix}_dis_4`, points: 2 },
    // 7. 介護・看護
    { label: '介護・看護：居宅外で親族の介護・看護を常態とする場合', value: `${prefix}_care_out`, points: 10 },
    { label: '介護・看護：居宅内で親族の介護・看護を常態とする場合', value: `${prefix}_care_in`, points: 8 },
    { label: '介護・看護：上記以外の条件による介護・看護（通院の送迎等を含む）', value: `${prefix}_care_other`, points: 5 },
    // 8. 災害
    { label: '災害：火災などにより家屋の損傷、その他災害復旧のため保育が困難な場合', value: `${prefix}_disaster`, points: 10 },
    // 10. 虐待・DV
    { label: '虐待・DV：児童虐待防止法第2条又は配偶者暴力防止法第1条の対象者', value: `${prefix}_dv`, points: 20 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 出産は母（保護者2）のみ
  if (parentNum === 2) {
    options.splice(26, 0,
      { label: '出産：出産予定月の前2か月、後2か月', value: `${prefix}_birth`, points: 10 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（父母それぞれの基準指数を合算します）。就学・技能修得中の方は、番号1（就労・居宅外）または番号3（求職）の該当区分を選んでください。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士・幼稚園教諭として勤務していますか？（調整指数）',
    helpText: '月20日以上かつ1日6時間以上の勤務が対象。市内施設は入所後1年以上勤務することが条件。',
    inputType: 'select',
    options: [
      { label: '保育士・幼稚園教諭として市内の施設に勤務（+7点）', value: 'adj_hoikushi_in', points: 7 },
      { label: '保育士・幼稚園教諭として市外の施設に勤務（+2点）', value: 'adj_hoikushi_out', points: 2 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯・中国残留邦人支援給付受給世帯ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯・中国残留邦人支援給付受給世帯（+2点）', value: 'adj_seikatsuhogo_yes', points: 2 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_fuzonzai',
    category: 'adjustment',
    label: '父母の一人が不存在ですか？（調整指数）',
    helpText: '死亡、離婚、離婚協議中、未婚等',
    inputType: 'radio',
    options: [
      { label: '父母の一人が不存在（死亡・離婚・離婚協議中・未婚等）（+10点）', value: 'adj_fuzonzai_yes', points: 10 },
      { label: '該当なし', value: 'adj_fuzonzai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母の一人が単身赴任や入院等で3か月以上不在ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '父母の一人が単身赴任や入院等の理由により3か月以上不在（+2点）', value: 'adj_tanshin_yes', points: 2 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_taishi',
    category: 'adjustment',
    label: '18歳未満（4月1日時点）の子どもが3人以上いますか？（調整指数）',
    helpText: '3人を超える場合は1人につき1点加算',
    inputType: 'select',
    options: [
      { label: '18歳未満の子どもが5人以上（+3点）', value: 'adj_taishi_5', points: 3 },
      { label: '18歳未満の子どもが4人（+2点）', value: 'adj_taishi_4', points: 2 },
      { label: '18歳未満の子どもが3人（+1点）', value: 'adj_taishi_3', points: 1 },
      { label: '該当なし（2人以下）', value: 'adj_taishi_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogai_setai',
    category: 'adjustment',
    label: '保護者・申込児童・兄弟姉妹に障がい等がありますか？（調整指数）',
    helpText: '最も該当する1つを選んでください',
    inputType: 'select',
    options: [
      { label: '身体障害者手帳1・2級／療育手帳A〜B／精神保健福祉手帳1〜3級の所持者、または要介護4・5の認定者がいる（+3点）', value: 'adj_shogai_setai_h', points: 3 },
      { label: '身体障害者手帳3級又はみどりの手帳C、または介護認定1〜3の認定者がいる（+2点）', value: 'adj_shogai_setai_m', points: 2 },
      { label: '上記以外で介護・看護・補助を要すると診断された者がいる（+1点）', value: 'adj_shogai_setai_l', points: 1 },
      { label: '該当なし', value: 'adj_shogai_setai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogai_other',
    category: 'adjustment',
    label: '同一世帯のその他の家族に障がい等がありますか？（調整指数）',
    helpText: '保護者・申込児童・兄弟姉妹以外の同居家族について。最も該当する1つを選んでください',
    inputType: 'select',
    options: [
      { label: '身体障害者手帳1・2級／みどりの手帳A〜B／精神保健福祉手帳1〜3級の所持者、または介護認定4〜5の認定者がいる（+2点）', value: 'adj_shogai_other_h', points: 2 },
      { label: '上記以外で介護・看護・補助を要すると診断された者がいる（+1点）', value: 'adj_shogai_other_l', points: 1 },
      { label: '該当なし', value: 'adj_shogai_other_none', points: 0 },
    ],
  },
  {
    id: 'adj_sotsuen',
    category: 'adjustment',
    label: '2歳児クラスで卒園となる施設を卒園しますか？（調整指数）',
    helpText: '認可保育所、地域型保育施設、企業主導型保育施設及び家庭保育室',
    inputType: 'radio',
    options: [
      { label: '2歳児クラスで卒園となる認可保育所・地域型・企業主導型・家庭保育室を卒園（+7点）', value: 'adj_sotsuen_yes', points: 7 },
      { label: '該当なし', value: 'adj_sotsuen_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: '兄弟姉妹の在園・転所に関する状況（調整指数）',
    inputType: 'select',
    options: [
      { label: '現在保育所等を利用しているが、兄弟姉妹が別施設のため、どちらかの施設に転所を希望する（+2点）', value: 'adj_kyodai_transfer', points: 2 },
      { label: '兄弟姉妹が在園している保育所に新規入所の申込みをしている（+1点）', value: 'adj_kyodai_enrolled', points: 1 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_multi_new',
    category: 'adjustment',
    label: '同一世帯で2人以上の新規入所の申込みがありますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '同一世帯において2人以上の新規入所の申込みがある（+1点）', value: 'adj_multi_new_yes', points: 1 },
      { label: '該当なし', value: 'adj_multi_new_none', points: 0 },
    ],
  },
  {
    id: 'adj_yotaku',
    category: 'adjustment',
    label: '認可外施設・幼稚園等に有料で預託していますか？（調整指数）',
    helpText: '所定の用紙が必要。卒園加点（+7点）を受けている場合は除く。',
    inputType: 'select',
    options: [
      { label: '認可外施設・幼稚園等に有料で12か月以上預託している（+2点）', value: 'adj_yotaku_12', points: 2 },
      { label: '認可外施設・幼稚園等に有料で6か月以上預託している（+1点）', value: 'adj_yotaku_6', points: 1 },
      { label: '該当なし', value: 'adj_yotaku_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '65歳未満の保護者の父母（祖父母）と同居していますか？（調整指数）',
    helpText: '就労や疾病等で保育に当たることができない場合を除く',
    inputType: 'select',
    options: [
      { label: '65歳未満の保護者の父母（祖父母）と同居している（-5点）', value: 'adj_sofubo_yes', points: -5 },
      { label: '同上で、かつひとり親世帯である（-2点）', value: 'adj_sofubo_single', points: -2 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '保育料を2か月以上滞納していますか？（調整指数）',
    helpText: '入所児又は卒園児の保育所及び学童保育所保育料',
    inputType: 'radio',
    options: [
      { label: '保育料を2か月以上滞納している（-20点）', value: 'adj_overdue_yes', points: -20 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
  {
    id: 'adj_koiki',
    category: 'adjustment',
    label: '市外在住者で勤務地が市内ですか？（調整指数）',
    helpText: '転入予定者を除く',
    inputType: 'radio',
    options: [
      { label: '市外在住者（転入予定者を除く）で勤務地が市内（-5点）', value: 'adj_koiki_yes', points: -5 },
      { label: '該当なし', value: 'adj_koiki_none', points: 0 },
    ],
  },
];

export const shiraokaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
