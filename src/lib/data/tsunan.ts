import type { MunicipalityData, Question } from '../types';

// 出典: 津南町「津南町保育園利用調整基準指数表」（令和5年9月1日改定）
// https://www.town.tsunan.niigata.jp/uploaded/attachment/5846.pdf
// 掲載ページ: https://www.town.tsunan.niigata.jp/site/kyoiku/hoikuen-enter.html
// 計算方式: sum方式
//   基準指数表が「父」「母」の2列で構成され、表末尾に父母の点数を合計する
//   「基準指数 計（①）」欄があり、さらに「調整指数 計（②）」「指数 合計（①＋②）」と続く。
//   裏面にも「基準指数と調整指数の合計により、保育の必要性を客観的に審査し、指数の高いかたから
//   入園を決定します」と明記されている（日置市・山鹿市と同じ「表構造からの帰結」）。
// 最高基準指数: 20（父母各10）
// 注:
//  - 原典「父母の状況について、それぞれ当てはまる項目の指数を1つ選んで○をつけてください」の
//    ため、基準指数は単一selectで実装。
//  - 「母の妊娠・出産」は原典の父欄が斜線（母のみ）のため保護者2にのみ設定。
//  - 就労時間は休憩時間を除く。
//  - 調整指数は原典「該当する項目の指数すべてに○をつけてください」のため、
//    項目ごとに独立した設問（重複加算あり）として実装。
//  - 「祖父母と同居していない場合 +2」は減点ではなく加点である点に注意（多くの自治体とは逆）。

const municipality = {
  id: 'tsunan',
  name: '津南町',
  slug: 'tsunan',
  prefecture: '新潟県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 1 就労（週5日以上または月20日以上）
    { label: '就労：週5日以上または月20日以上／1日7時間以上', value: `${prefix}_w5_7`, points: 10 },
    { label: '就労：週5日以上または月20日以上／1日6時間以上', value: `${prefix}_w5_6`, points: 9 },
    { label: '就労：週5日以上または月20日以上／1日5時間以上', value: `${prefix}_w5_5`, points: 8 },
    { label: '就労：週5日以上または月20日以上／1日4時間以上', value: `${prefix}_w5_4`, points: 7 },
    { label: '就労：週5日以上または月20日以上／1日3時間以上', value: `${prefix}_w5_3`, points: 6 },
    // 1 就労（週4日または月16日以上）
    { label: '就労：週4日または月16日以上／1日7時間以上', value: `${prefix}_w4_7`, points: 9 },
    { label: '就労：週4日または月16日以上／1日6時間以上', value: `${prefix}_w4_6`, points: 8 },
    { label: '就労：週4日または月16日以上／1日5時間以上', value: `${prefix}_w4_5`, points: 7 },
    { label: '就労：週4日または月16日以上／1日4時間以上', value: `${prefix}_w4_4`, points: 6 },
    { label: '就労：週4日または月16日以上／1日3時間以上', value: `${prefix}_w4_3`, points: 5 },
    // 1 就労（週3日または月12日以上）
    { label: '就労：週3日または月12日以上／1日7時間以上', value: `${prefix}_w3_7`, points: 8 },
    { label: '就労：週3日または月12日以上／1日6時間以上', value: `${prefix}_w3_6`, points: 7 },
    { label: '就労：週3日または月12日以上／1日5時間以上', value: `${prefix}_w3_5`, points: 6 },
    { label: '就労：週3日または月12日以上／1日4時間以上', value: `${prefix}_w3_4`, points: 5 },
    { label: '就労：月48時間以上就労しているが1日の就労時間が上記に満たない', value: `${prefix}_w_48h`, points: 4 },
    // 2 出産（母のみ。下でparent1から除外）
    { label: '母の妊娠・出産：妊娠中であるか、出産後間がない', value: `${prefix}_birth`, points: 10 },
    // 2 病気
    { label: '入院：1か月以上の入院', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '自宅療養：常時寝たきりの状態、精神性の疾病', value: `${prefix}_ill_bed`, points: 10 },
    { label: '自宅療養：安静加療', value: `${prefix}_ill_rest`, points: 8 },
    { label: '通院：週3日以上', value: `${prefix}_ill_tsuin3`, points: 7 },
    { label: '通院：週3日未満', value: `${prefix}_ill_tsuin_u3`, points: 6 },
    // 3 親族の介護・看護
    { label: '親族の介護・看護：常時付き添いが必要なもの（要介護度4以上または同程度）', value: `${prefix}_care_always`, points: 10 },
    { label: '親族の介護・看護：常時ではないが保育が困難なもの（要介護3以上または同程度）', value: `${prefix}_care_mid`, points: 8 },
    { label: '親族の介護・看護：上記以外の状態で保育が困難なもの', value: `${prefix}_care_other`, points: 5 },
    // 4 災害
    { label: '災害：災害復旧のため保育ができない場合', value: `${prefix}_disaster`, points: 10 },
    // 5 親の不在
    { label: '親の不在（死亡、離婚、行方不明、拘禁等）', value: `${prefix}_absent`, points: 10 },
    // 6 その他
    { label: '虐待のおそれがある等、特別な理由により保育が必要と判断される場合', value: `${prefix}_gyakutai`, points: 10 },
    { label: '就学（大学・専門学校・職業訓練校への通学）', value: `${prefix}_school`, points: 8 },
    { label: '求職活動（保育の必要認定期間は最大90日）', value: `${prefix}_seek`, points: 3 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ].filter((o) => parentNum === 2 || !o.value.endsWith('_birth'));

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の状況（基準指数）`,
      helpText:
        parentNum === 2
          ? '当てはまる項目を1つ選んでください。就労時間は休憩時間を除いて計算します。'
          : '当てはまる項目を1つ選んでください。就労時間は休憩時間を除いて計算します。妊娠・出産は原典の父欄が斜線（母のみ）のため、保護者2（母）の選択肢にのみ設けています。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？（調整指数・世帯の状況）',
    inputType: 'radio',
    options: [
      { label: 'はい（ひとり親家庭／+5点）', value: 'adj_single_parent_yes', points: 5 },
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整指数・世帯の状況）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+5点）', value: 'adj_seikatsuhogo_yes', points: 5 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者が失業していますか？（調整指数・世帯の状況）',
    inputType: 'radio',
    options: [
      { label: '保護者（生計中心者）の失業により就労の必要性が高い（+5点）', value: 'adj_shitsugyo_yes', points: 5 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_jido_techo',
    category: 'adjustment',
    label: '入園希望児童に手帳の交付や療育相談がありますか？（調整指数・世帯の状況）',
    inputType: 'radio',
    options: [
      { label: '療育手帳または身体障害者手帳が交付されている、もしくは療育相談を受けている（+5点）', value: 'adj_jido_techo_yes', points: 5 },
      { label: '該当なし', value: 'adj_jido_techo_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '祖父母と同居していますか？（調整指数・世帯の状況）',
    helpText:
      '津南町では「祖父母と同居していない場合」に加点されます（同居している場合の減点ではありません）。',
    inputType: 'radio',
    options: [
      { label: '祖父母と同居していない（+2点）', value: 'adj_sofubo_bekkyo', points: 2 },
      { label: '祖父母と同居している', value: 'adj_sofubo_dokyo', points: 0 },
    ],
  },
  {
    id: 'adj_fukushoku',
    category: 'adjustment',
    label: '産休明け・育休明けですか？（調整指数・世帯の状況）',
    inputType: 'radio',
    options: [
      { label: '産休明け・育休明け（+2点）', value: 'adj_fukushoku_yes', points: 2 },
      { label: '該当なし', value: 'adj_fukushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_zaien',
    category: 'adjustment',
    label: 'きょうだいが同一の保育園にすでに入園していますか？（調整指数・申込の状況）',
    helpText:
      '求職活動中で入園している兄弟姉妹が未満児クラスの場合は調整指数「2」となります。',
    inputType: 'select',
    options: [
      { label: '兄弟姉妹が同一の保育園にすでに入園している（+5点）', value: 'adj_kyodai_zaien_5', points: 5 },
      { label: '同上（求職活動中で入園している兄弟姉妹が未満児クラスの場合／+2点）', value: 'adj_kyodai_zaien_2', points: 2 },
      { label: '該当なし', value: 'adj_kyodai_zaien_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_doji',
    category: 'adjustment',
    label: 'きょうだいと同時申請で同一保育園の利用を希望しますか？（調整指数・申込の状況）',
    inputType: 'radio',
    options: [
      { label: '兄弟姉妹と同時申請で、同一保育園の利用を希望する（+2点）', value: 'adj_kyodai_doji_yes', points: 2 },
      { label: '該当なし', value: 'adj_kyodai_doji_none', points: 0 },
    ],
  },
  {
    id: 'adj_tashi',
    category: 'adjustment',
    label: '入園希望児童は3子目以降ですか？（調整指数・その他）',
    inputType: 'radio',
    options: [
      { label: '入園希望児童が3子目以降（+2点）', value: 'adj_tashi_yes', points: 2 },
      { label: '該当なし', value: 'adj_tashi_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が町内の保育園等に保育士・保育助手として従事していますか？（調整指数・その他）',
    helpText: '町内の保育園・子育て支援センター・学童保育事業への従事（内定を含む）が対象です。',
    inputType: 'radio',
    options: [
      { label: '保育士・保育助手として町内の保育園等に従事（内定）している（+5点）', value: 'adj_hoikushi_yes', points: 5 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_nakatsu',
    category: 'adjustment',
    label: '中津地区に居住していますか？（調整指数・その他）',
    inputType: 'radio',
    options: [
      { label: '中津地区に居住している（+5点）', value: 'adj_nakatsu_yes', points: 5 },
      { label: '該当なし', value: 'adj_nakatsu_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '保育料の滞納がありますか？（調整指数・その他）',
    inputType: 'radio',
    options: [
      { label: '保育料の滞納がある（-5点）', value: 'adj_tainou_yes', points: -5 },
      { label: '該当なし', value: 'adj_tainou_none', points: 0 },
    ],
  },
];

export const tsunanData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
