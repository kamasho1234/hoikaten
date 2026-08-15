import type { MunicipalityData, Question } from '../types';

// 出典: 国立市「令和8年度 保育施設入所のしおり」電子版（前半）P15〜P17
//       「調整基準」「基準指数表」「調整指数表」
// https://www.city.kunitachi.tokyo.jp/material/files/group/41/R8shiori_zenhan.pdf
// 掲載ページ: https://www.city.kunitachi.tokyo.jp/soshiki/Dept04/Div03/Sec01/gyomu/0275/1461059981097.html
// 計算方式: sum方式
//   調整基準（１）「世帯の調整基準指数の順位により調整を行います。（調整基準指数は、対象児童の
//   保護者それぞれの基準指数（下記基準指数表による）と世帯の調整指数（下記調整指数表による）を
//   合算して求めます）」と明記されている。
//   同位の場合は（２）基準指数表の優先順位 →（３）世帯の基準指数（保護者それぞれの基準指数の合算）
//   →（４）世帯の所得が低い順、で調整される。
// 最高基準指数: 200（父母各100）
// 注:
//  - 基準指数表には優先順位（不存在1→災害2→疾病しょうがい3→外勤4→自営5→介護看護6→出産7→
//    内職8→就学9→求職10→育休継続11）が定められているが、これは同点時の順位付けに使われるもので
//    加減算ではないためシミュレーターでは表現していない。
//  - 求職の「就労内定又は開業予定の場合」は原典が備考4「保護者の労働形態に対応する基準指数を
//    適用する」と定めており固定点数がないため、選択肢に含めていない（helpText で案内）。
//  - 調整指数12（しょうがい+15）と13（医療的ケア+30）は原典に「12と合算不可」とあるため
//    単一selectにしている。ひとり親（同居人なし+80／あり+74）も排他のため単一select。
//  - 調整指数14 は「調整指数は就労の基準指数の上限を超えないものとする」という上限が付くが、
//    engine で表現できないため helpText で案内している。
//  - 調整指数4・21 は「市内利用希望保育施設等を5か所以上記載している場合に限る」という条件付き。
//  - 外勤の基準指数は、短時間勤務制度等を利用しているときは制度利用後の勤務時間で決定する（備考2）。
//    就労日数の実績が契約上の日数を下回るときは実績で決定する（備考3）。

const municipality = {
  id: 'kunitachi',
  name: '国立市',
  slug: 'kunitachi',
  prefecture: '東京都',
  maxBasePoints: 200,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 不存在（優先順位1）
    { label: '不存在：死亡・離別・行方不明・拘禁等', value: `${prefix}_absent`, points: 100 },
    // 災害（優先順位2）
    { label: '災害：災害等による家屋の損傷その他災害復旧のため、保育に当たれない場合', value: `${prefix}_disaster`, points: 100 },
    // 疾病・しょうがい（優先順位3）
    { label: '疾病・傷病：入院（おおむね1か月以上）・入院予定', value: `${prefix}_ill_hosp`, points: 100 },
    { label: '疾病・傷病：常時病臥・精神疾患・感染症', value: `${prefix}_ill_byoga`, points: 100 },
    { label: '疾病・傷病：一般療養', value: `${prefix}_ill_general`, points: 60 },
    { label: 'しょうがい：身体障害者手帳1〜2級・愛の手帳1〜2度', value: `${prefix}_dis_1`, points: 100 },
    { label: 'しょうがい：身体障害者手帳3級・愛の手帳3度', value: `${prefix}_dis_3`, points: 80 },
    { label: 'しょうがい：身体障害者手帳4級・愛の手帳4度', value: `${prefix}_dis_4`, points: 60 },
    // 外勤（優先順位4）
    { label: '外勤：週5日以上かつ、週40時間以上の就労を常態', value: `${prefix}_work_5_40`, points: 90 },
    { label: '外勤：週5日以上かつ、週33時間以上の就労を常態', value: `${prefix}_work_5_33`, points: 80 },
    { label: '外勤：週4日以上かつ、週27時間以上の就労を常態', value: `${prefix}_work_4_27`, points: 70 },
    { label: '外勤：週4日以上かつ、週22時間以上の就労を常態', value: `${prefix}_work_4_22`, points: 60 },
    { label: '外勤：週3日以上かつ、週16時間以上の就労を常態', value: `${prefix}_work_3_16`, points: 50 },
    { label: '外勤：週3日以上かつ、週12時間以上の就労を常態', value: `${prefix}_work_3_12`, points: 40 },
    // 自営（優先順位5）
    { label: '自営（居宅外）：週5日以上かつ、週40時間以上の就労を常態', value: `${prefix}_self_out_5_40`, points: 90 },
    { label: '自営（居宅外）：週5日以上かつ、週33時間以上の就労を常態', value: `${prefix}_self_out_5_33`, points: 80 },
    { label: '自営（居宅外）：週4日以上かつ、週27時間以上の就労を常態', value: `${prefix}_self_out_4_27`, points: 70 },
    { label: '自営（居宅外）：週4日以上かつ、週22時間以上の就労を常態', value: `${prefix}_self_out_4_22`, points: 60 },
    { label: '自営（居宅外）：週3日以上かつ、週16時間以上の就労を常態', value: `${prefix}_self_out_3_16`, points: 50 },
    { label: '自営（居宅外）：週3日以上かつ、週12時間以上の就労を常態', value: `${prefix}_self_out_3_12`, points: 40 },
    { label: '自営（居宅内）：週5日以上かつ、週40時間以上の就労を常態', value: `${prefix}_self_in_5_40`, points: 88 },
    { label: '自営（居宅内）：週5日以上かつ、週33時間以上の就労を常態', value: `${prefix}_self_in_5_33`, points: 78 },
    { label: '自営（居宅内）：週4日以上かつ、週27時間以上の就労を常態', value: `${prefix}_self_in_4_27`, points: 68 },
    { label: '自営（居宅内）：週4日以上かつ、週22時間以上の就労を常態', value: `${prefix}_self_in_4_22`, points: 58 },
    { label: '自営（居宅内）：週3日以上かつ、週16時間以上の就労を常態', value: `${prefix}_self_in_3_16`, points: 48 },
    { label: '自営（居宅内）：週3日以上かつ、週12時間以上の就労を常態', value: `${prefix}_self_in_3_12`, points: 38 },
    // 介護看護（優先順位6）
    { label: '居宅外介護・看護：週5日以上、日中週32時間以上の付添い', value: `${prefix}_care_out_5`, points: 80 },
    { label: '居宅外介護・看護：週4日以上、日中週22時間以上の付添い', value: `${prefix}_care_out_4`, points: 60 },
    { label: '居宅外介護・看護：週3日以上、日中週12時間以上の付添い', value: `${prefix}_care_out_3`, points: 40 },
    { label: '居宅内介護・看護：重度心身しょうがい者等の介護・看護', value: `${prefix}_care_in_juudo`, points: 100 },
    { label: '居宅内介護・看護：常時観察・日常介護', value: `${prefix}_care_in_joji`, points: 70 },
    { label: '居宅内介護・看護：上記以外の居宅介護・看護', value: `${prefix}_care_in_other`, points: 50 },
    // 出産（優先順位7）
    { label: '出産：出産のため保育に当たれない場合', value: `${prefix}_birth`, points: 60 },
    // 内職（優先順位8）
    { label: '内職：週3日以上かつ、週12時間以上の就労を常態', value: `${prefix}_naishoku`, points: 30 },
    // 就学（優先順位9）
    { label: '就学：就学技能取得等のため、保育に当たれない場合', value: `${prefix}_school`, points: 70 },
    // 求職（優先順位10）
    { label: '求職：求職活動中', value: `${prefix}_seek`, points: 20 },
    // 育休継続（優先順位11）
    { label: '育休継続：育児休業を取得中に転園し、引き続き育児休業を継続して取得する場合', value: `${prefix}_ikukyu_keizoku`, points: 30 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の状況（基準指数）`,
      helpText:
        '当てはまる項目を1つ選んでください。国立市は父母それぞれの基準指数を合算した点数に世帯の調整指数を加減算します。就労時間には通勤時間を含みません。短時間勤務制度等を利用しているときは、契約上の勤務時間ではなく制度利用後の勤務時間で判定します。なお「就労内定又は開業予定」の場合は保護者の労働形態に対応する基準指数が適用されるため、上記の該当する就労区分を選んでください。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整指数15・16）',
    inputType: 'select',
    options: [
      { label: 'ひとり親世帯（同居人なし／+80点）', value: 'adj_single_parent_alone', points: 80 },
      { label: 'ひとり親世帯（同居人あり／+74点）', value: 'adj_single_parent_with', points: 74 },
      { label: '該当なし', value: 'adj_single_parent_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyushoku',
    category: 'adjustment',
    label: '生計中心者が求職中ですか？（調整指数18）',
    inputType: 'radio',
    options: [
      { label: '生計中心者が求職中（+80点）', value: 'adj_kyushoku_yes', points: 80 },
      { label: '該当なし', value: 'adj_kyushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikukyu_taisho',
    category: 'adjustment',
    label: '育児休業取得により退所し、育休明けに再度申し込みますか？（調整指数22）',
    helpText:
      '市内の認可保育所・認定こども園・小規模保育・家庭的保育を行う事業所に就労を要件として入所していた子どもの保護者が、育児休業取得により退所した場合が対象です。6か月以上の退所期間がある場合に限ります。',
    inputType: 'radio',
    options: [
      { label: '育休明けに再度申し込む（6か月以上の退所期間あり／+80点）', value: 'adj_ikukyu_taisho_yes', points: 80 },
      { label: '該当なし', value: 'adj_ikukyu_taisho_none', points: 0 },
    ],
  },
  {
    id: 'adj_sotsuen',
    category: 'adjustment',
    label: '入所年齢に上限のある施設の卒園・入所期間満了に伴う申込みですか？（調整指数21）',
    helpText: '市内の利用希望保育施設等を5か所以上記載している場合に限り加点されます。',
    inputType: 'radio',
    options: [
      { label: '卒園・入所期間満了により引き続き別の保育施設等を申し込む（+40点）', value: 'adj_sotsuen_yes', points: 40 },
      { label: '該当なし', value: 'adj_sotsuen_none', points: 0 },
    ],
  },
  {
    id: 'adj_kaigo_fuyou',
    category: 'adjustment',
    label: '介護・看護の対象が児童の扶養義務者にあたりますか？（調整指数25）',
    helpText: '基準指数表で居宅外介護・看護または居宅内介護・看護に該当する方が対象です。',
    inputType: 'radio',
    options: [
      { label: '児童にとって扶養義務者にあたる者を介護・看護している（+30点）', value: 'adj_kaigo_fuyou_yes', points: 30 },
      { label: '該当なし', value: 'adj_kaigo_fuyou_none', points: 0 },
    ],
  },
  {
    id: 'adj_ko_shogai',
    category: 'adjustment',
    label: '申込児童にしょうがい・医療的ケアの必要がありますか？（調整指数12・13）',
    helpText: '原典で「12と合算不可」とされているため、いずれか一方のみが適用されます。',
    inputType: 'select',
    options: [
      { label: '医療的ケアを必要とする（+30点）', value: 'adj_ko_shogai_iryo', points: 30 },
      { label: 'しょうがいがある（+15点）', value: 'adj_ko_shogai_yes', points: 15 },
      { label: '該当なし', value: 'adj_ko_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_iryo_kea_kyodai',
    category: 'adjustment',
    label: '医療的ケアが必要なきょうだいが在園中ですか？（調整指数14）',
    helpText:
      '医療的ケアを必要とする未就学児が現在保育施設等を利用しており、同一世帯の他の未就学児が申し込む場合が対象です（就労時間が週40時間に満たない場合）。ただし原典では「調整指数は就労の基準指数の上限を超えないものとする」という上限が定められています。',
    inputType: 'radio',
    options: [
      { label: '該当する（+20点）', value: 'adj_iryo_kea_kyodai_yes', points: 20 },
      { label: '該当なし', value: 'adj_iryo_kea_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_moushikomi',
    category: 'adjustment',
    label: '同一世帯の未就学児が複数、利用申込みまたは利用中ですか？（調整指数8・9）',
    inputType: 'select',
    options: [
      { label: '3人以上のいずれもが利用申込みまたは利用中（+13点）', value: 'adj_kyodai_3', points: 13 },
      { label: '2人のいずれもが利用申込みまたは利用中（+10点）', value: 'adj_kyodai_2', points: 10 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_youchien',
    category: 'adjustment',
    label: '申込みを行わない幼稚園・認可外等を利用する未就学児が同一世帯にいますか？（調整指数11）',
    helpText: '認定こども園を利用する場合は1号認定に限ります。',
    inputType: 'radio',
    options: [
      { label: '該当する（+10点）', value: 'adj_youchien_yes', points: 10 },
      { label: '該当なし', value: 'adj_youchien_none', points: 0 },
    ],
  },
  {
    id: 'adj_hikazei',
    category: 'adjustment',
    label: '前年度の市区町村民税が非課税の世帯ですか？（調整指数20）',
    inputType: 'radio',
    options: [
      { label: '非課税世帯（+10点）', value: 'adj_hikazei_yes', points: 10 },
      { label: '該当なし', value: 'adj_hikazei_none', points: 0 },
    ],
  },
  {
    id: 'adj_kaigo_teido',
    category: 'adjustment',
    label: '居宅外介護・看護の対象者の状態は？（調整指数23・24）',
    helpText: '基準指数表で居宅外介護・看護に該当する方が対象です。',
    inputType: 'select',
    options: [
      { label: '身体障害者手帳または精神障害者保健福祉手帳1〜2級・愛の手帳1〜2度・要介護4〜5程度（+10点）', value: 'adj_kaigo_teido_10', points: 10 },
      { label: '身体障害者手帳または精神障害者保健福祉手帳3級・愛の手帳3度・要介護2〜3程度（+4点）', value: 'adj_kaigo_teido_4', points: 4 },
      { label: '該当なし', value: 'adj_kaigo_teido_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護の被保護世帯等ですか？（調整指数19）',
    helpText:
      '生活保護法による被保護世帯および中国残留邦人等支援給付受給世帯で、保育の実施が当該世帯の自立に効果的であると市長が認めた場合が対象です。',
    inputType: 'radio',
    options: [
      { label: '該当する（+20点）', value: 'adj_seikatsuhogo_yes', points: 20 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tataiji',
    category: 'adjustment',
    label: '多胎児の新規利用申込みですか？（調整指数7）',
    inputType: 'radio',
    options: [
      { label: '多胎児の新規利用申込み（+8点）', value: 'adj_tataiji_yes', points: 8 },
      { label: '該当なし', value: 'adj_tataiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_betsubetsu',
    category: 'adjustment',
    label: 'きょうだいが別々の施設を利用中で、同じ施設を希望しますか？（調整指数10）',
    inputType: 'radio',
    options: [
      { label: '同一世帯の2人の未就学児が別々の施設を利用中で、同じ施設を希望する（+5点）', value: 'adj_kyodai_betsubetsu_yes', points: 5 },
      { label: '該当なし', value: 'adj_kyodai_betsubetsu_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanjikan',
    category: 'adjustment',
    label: '短時間勤務制度等を利用していますか？（調整指数2）',
    helpText: '就労時間が週40時間に満たない場合が対象です。',
    inputType: 'radio',
    options: [
      { label: '短時間勤務制度等を利用し、短時間の勤務となる（+5点）', value: 'adj_tanjikan_yes', points: 5 },
      { label: '該当なし', value: 'adj_tanjikan_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者のいずれかが単身赴任中ですか？（調整指数1）',
    inputType: 'radio',
    options: [
      { label: '単身赴任中（+4点）', value: 'adj_tanshin_yes', points: 4 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が市内の保育施設等・幼稚園で就労しますか？（調整指数4）',
    helpText:
      '市内の認可保育所、認定こども園、小規模保育を行う事業所、家庭的保育を行う事業所、認可外保育施設または幼稚園での就労が対象です。市内の利用希望保育施設等を5か所以上記載している場合に限ります。',
    inputType: 'radio',
    options: [
      { label: '保護者の両方またはいずれかが該当する（+2点）', value: 'adj_hoikushi_yes', points: 2 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_sanzen_fukushoku',
    category: 'adjustment',
    label: '利用開始希望日後に産前産後休暇終了により復職予定ですか？（調整指数3）',
    inputType: 'radio',
    options: [
      { label: '該当する（+2点）', value: 'adj_sanzen_fukushoku_yes', points: 2 },
      { label: '該当なし', value: 'adj_sanzen_fukushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '健康で不就労の同居の祖父母（65歳未満）がいますか？（調整指数17）',
    inputType: 'radio',
    options: [
      { label: 'いる（-10点）', value: 'adj_sofubo_yes', points: -10 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_jiei_shorui',
    category: 'adjustment',
    label: '自営・内職等就労状況申立書の添付書類の状況は？（調整指数5・6）',
    helpText: '自営業主が自営・内職等就労状況申立書を提出する場合の減点項目です。',
    inputType: 'select',
    options: [
      { label: '市が定める添付書類を提出しない（-6点）', value: 'adj_jiei_shorui_none_submit', points: -6 },
      { label: '市が定める添付書類が不足している（-3点）', value: 'adj_jiei_shorui_lack', points: -3 },
      { label: '該当なし（自営業主でない、または書類はそろっている）', value: 'adj_jiei_shorui_none', points: 0 },
    ],
  },
];

export const kunitachiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
