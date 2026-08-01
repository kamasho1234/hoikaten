import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.ogori.fukuoka.jp/download_file/view/42143/1768
//       （小郡市「令和8年度小郡市保育所入所基準表」）
// 小郡市（福岡県）保育所入所基準表（基準点＋調整項目）
// 計算方式: min方式（原典の【最終合計】欄に「父母の基準点のうち低い方の点数＋調整項目
//           ＝最終基準点」と明記）。
// 最高基準点: 20（居宅外労働・自営業及び農業の本人で月160時間以上勤務）
// 注:
//  - 「妊娠・出産」は原典で父母どちらの欄にも同じ点数が入っているため父母どちらにも設定。
//  - 「育児休業」は原典で「居宅外労働適用」とされ独立した点数がないため、育児休業復帰に伴う
//    申込みは復帰後の勤務時間で居宅外労働の区分を選ぶ運用としヘルプで案内。
//  - 調整項目「同居者：保育を必要とする書類未提出又は不備」は、原典の※2で「最終基準点を
//    0.5点とする」とされており固定の加減点ではないため実装対象外。
//  - 調整項目「児童福祉の観点から特に保育の必要性が高いと判断した場合（適宜）」は
//    固定点数が定められていないため実装対象外。
//  - 原典の※3「転園希望の場合は、転園の加点のみを適用し、別の調整項目は適用しない」に
//    該当する場合は、転園の設問のみを選択してください（ヘルプに明記）。

const municipality = {
  id: 'ogori',
  name: '小郡市',
  slug: 'ogori',
  prefecture: '福岡県',
  maxBasePoints: 20,
  scoringMethod: 'min',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 居宅外労働 本人
    { label: '居宅外労働（本人）：月160時間以上勤務', value: `${prefix}_out_160`, points: 20 },
    { label: '居宅外労働（本人）：月150時間以上勤務', value: `${prefix}_out_150`, points: 19 },
    { label: '居宅外労働（本人）：月140時間以上勤務', value: `${prefix}_out_140`, points: 18 },
    { label: '居宅外労働（本人）：月130時間以上勤務', value: `${prefix}_out_130`, points: 17 },
    { label: '居宅外労働（本人）：月120時間以上勤務', value: `${prefix}_out_120`, points: 16 },
    { label: '居宅外労働（本人）：月100時間以上勤務', value: `${prefix}_out_100`, points: 15 },
    { label: '居宅外労働（本人）：月80時間以上勤務', value: `${prefix}_out_80`, points: 14 },
    { label: '居宅外労働（本人）：月64時間以上勤務', value: `${prefix}_out_64`, points: 13 },
    // 自営業及び農業 本人（主たる従事者）
    { label: '自営業・農業（本人・主たる従事者）：月160時間以上勤務', value: `${prefix}_self_160`, points: 20 },
    { label: '自営業・農業（本人・主たる従事者）：月150時間以上勤務', value: `${prefix}_self_150`, points: 19 },
    { label: '自営業・農業（本人・主たる従事者）：月140時間以上勤務', value: `${prefix}_self_140`, points: 18 },
    { label: '自営業・農業（本人・主たる従事者）：月130時間以上勤務', value: `${prefix}_self_130`, points: 17 },
    { label: '自営業・農業（本人・主たる従事者）：月120時間以上勤務', value: `${prefix}_self_120`, points: 16 },
    { label: '自営業・農業（本人・主たる従事者）：月100時間以上勤務', value: `${prefix}_self_100`, points: 15 },
    { label: '自営業・農業（本人・主たる従事者）：月80時間以上勤務', value: `${prefix}_self_80`, points: 14 },
    { label: '自営業・農業（本人・主たる従事者）：月64時間以上勤務', value: `${prefix}_self_64`, points: 13 },
    // 自営業及び農業 協力者
    { label: '自営業・農業（協力者）：月160時間以上勤務', value: `${prefix}_help_160`, points: 16 },
    { label: '自営業・農業（協力者）：月120時間以上勤務', value: `${prefix}_help_120`, points: 14 },
    { label: '自営業・農業（協力者）：月80時間以上勤務', value: `${prefix}_help_80`, points: 12 },
    { label: '自営業・農業（協力者）：月64時間以上勤務', value: `${prefix}_help_64`, points: 10 },
    // 内職 本人
    { label: '内職（本人）：月160時間以上勤務', value: `${prefix}_nai_160`, points: 14 },
    { label: '内職（本人）：月120時間以上勤務', value: `${prefix}_nai_120`, points: 12 },
    { label: '内職（本人）：月80時間以上勤務', value: `${prefix}_nai_80`, points: 10 },
    { label: '内職（本人）：月64時間以上勤務', value: `${prefix}_nai_64`, points: 8 },
    // 病気療養
    { label: '病気療養（入院中）：1か月以上の入院（2ヶ月に1度証明する場合）', value: `${prefix}_ill_hosp_1m`, points: 20 },
    { label: '病気療養（入院中）：1か月未満の入院', value: `${prefix}_ill_hosp_u1m`, points: 12 },
    { label: '病気療養（通院中）：週3回以上の通院（2ヶ月に1度証明する場合）', value: `${prefix}_ill_visit3`, points: 12 },
    { label: '病気療養（通院中）：週3回未満の通院（2ヶ月に1度証明する場合）', value: `${prefix}_ill_visit_u3`, points: 8 },
    { label: '病気療養（その他）：保育が困難とわかる医師の診断書あり（状態、療養の期間が記載してある場合）', value: `${prefix}_ill_other`, points: 16 },
    // 心身障害
    { label: '心身障害：身体障害1〜2級、精神障害者手帳1級、療育手帳Aの交付を受けていて、保育が常時困難', value: `${prefix}_dis_1`, points: 20 },
    { label: '心身障害：身体障害3級、精神障害者手帳2級、療育手帳Bの交付を受けていて、保育が常時困難', value: `${prefix}_dis_2`, points: 16 },
    { label: '心身障害：身体障害4級、精神障害者手帳3級の交付を受けていて、保育が常時困難', value: `${prefix}_dis_3`, points: 13 },
    // 妊娠・出産
    { label: '妊娠・出産：産前産後2ヶ月（出産月を含まない）', value: `${prefix}_birth_2`, points: 14 },
    { label: '妊娠・出産：上記以外の期間（出産月を含む前後6か月）', value: `${prefix}_birth_6`, points: 10 },
    // 看護・介護
    { label: '看護・介護：月160時間以上看護または介護', value: `${prefix}_care_160`, points: 16 },
    { label: '看護・介護：月120時間以上看護または介護', value: `${prefix}_care_120`, points: 14 },
    { label: '看護・介護：月80時間以上看護または介護', value: `${prefix}_care_80`, points: 10 },
    { label: '看護・介護：月64時間以上看護または介護', value: `${prefix}_care_64`, points: 6 },
    // 就労予定
    { label: '就労予定：月160時間以上勤務', value: `${prefix}_plan_160`, points: 18 },
    { label: '就労予定：月120時間以上勤務', value: `${prefix}_plan_120`, points: 16 },
    { label: '就労予定：月80時間以上勤務', value: `${prefix}_plan_80`, points: 14 },
    { label: '就労予定：月64時間以上勤務', value: `${prefix}_plan_64`, points: 12 },
    // 求職活動中
    { label: '求職活動中：求職活動（起業準備を含む）を継続的に行っていること', value: `${prefix}_seek`, points: 5 },
    // 就学中
    { label: '就学中：職業訓練学校・専門学校・大学等へ在学中（月64時間以上）', value: `${prefix}_school`, points: 14 },
    { label: '就学中：職業訓練学校・専門学校・大学等へ通学が内定している（月64時間以上見込）', value: `${prefix}_school_naitei`, points: 10 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育を必要とする状況（基準点）`,
      helpText:
        '最も当てはまる状況を1つ選んでください。小郡市では父母の基準点のうち低い方の点数に調整項目を加減算して最終基準点とします。育児休業復帰に伴い入所を希望する場合は居宅外労働の区分が適用されるため、復帰後の勤務時間で選択してください。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親家庭等ですか？（調整項目）',
    helpText:
      'ひとり親家庭又は離婚調停（協議）中の場合は戸籍謄本が必要です。提出できない場合は、離婚届の受理証明書、離婚協議書、調停関係書類等、離婚の意思が分かる書類',
    inputType: 'select',
    options: [
      { label: 'ひとり親家庭又は離婚調停（協議）中（+14点）', value: 'adj_hitorioya_single', points: 14 },
      { label: '両親なし（両親の死亡、行方不明等）（+10点）', value: 'adj_hitorioya_nashi', points: 10 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整項目）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+3点）', value: 'adj_seikatsuhogo_yes', points: 3 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikukyu_ake',
    category: 'adjustment',
    label: '育児休業明けですか？（調整項目）',
    inputType: 'radio',
    options: [
      { label: '育児休業明け（+3点）', value: 'adj_ikukyu_ake_yes', points: 3 },
      { label: '該当なし', value: 'adj_ikukyu_ake_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者のいずれかが単身赴任ですか？（調整項目）',
    helpText: '子以外の同居者がいない場合',
    inputType: 'radio',
    options: [
      { label: '保護者のいずれかが単身赴任（子以外の同居者がいない）（+5点）', value: 'adj_tanshin_yes', points: 5 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_dokyosha',
    category: 'adjustment',
    label: '同居者が求職中ですか？（調整項目）',
    inputType: 'radio',
    options: [
      { label: '同居者が求職中（-2点）', value: 'adj_dokyosha_yes', points: -2 },
      { label: '該当なし', value: 'adj_dokyosha_none', points: 0 },
    ],
  },
  {
    id: 'adj_tenen',
    category: 'adjustment',
    label: '転園を希望しますか？（調整項目）',
    helpText:
      '転園希望の場合は、転園の加点のみを適用し、別の調整項目は適用されません。対象児は、選考時点で既に小郡市より保育（2号・3号）認定を受け、かつ認可施設を利用している児童に限ります',
    inputType: 'select',
    options: [
      { label: '2人以上のきょうだい児（多胎児含む）が異なる保育所又は保育所部分を利用中で、一方が他方の園に転園する（+19点）', value: 'adj_tenen_kyodai', points: 19 },
      { label: '他の園に転園する（上記の場合を除く）（+8点）', value: 'adj_tenen_other', points: 8 },
      { label: '該当なし', value: 'adj_tenen_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_doji',
    category: 'adjustment',
    label: '2人以上のきょうだい児が同時に申請を出しますか？（調整項目）',
    helpText: '多胎児を含む',
    inputType: 'radio',
    options: [
      { label: '2人以上のきょうだい児（多胎児含む）が同時に申請を出す（+6点）', value: 'adj_kyodai_doji_yes', points: 6 },
      { label: '該当なし', value: 'adj_kyodai_doji_none', points: 0 },
    ],
  },
  {
    id: 'adj_todokede',
    category: 'adjustment',
    label: '届出保育施設に当該児童を預けていますか？（調整項目）',
    helpText: '要在園証明書',
    inputType: 'radio',
    options: [
      { label: '届出保育施設に当該児童を預けている（+2点）', value: 'adj_todokede_yes', points: 2 },
      { label: '該当なし', value: 'adj_todokede_none', points: 0 },
    ],
  },
  {
    id: 'adj_jiei_nyusho_nashi',
    category: 'adjustment',
    label: '自営業・農業のため入所希望のない児童（0〜2歳児）が同一世帯にいますか？（調整項目）',
    inputType: 'radio',
    options: [
      { label: '同一世帯において自営業・農業のため保育施設等に入所希望の無い児童（0〜2歳児）がいる（-3点）', value: 'adj_jiei_nyusho_nashi_yes', points: -3 },
      { label: '該当なし', value: 'adj_jiei_nyusho_nashi_none', points: 0 },
    ],
  },
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者の失業がありましたか？（調整項目）',
    helpText: '過去6ヶ月以内に失業（倒産、リストラ）があった場合',
    inputType: 'radio',
    options: [
      { label: '生計中心者の失業（過去6ヶ月以内の倒産・リストラ）（+6点）', value: 'adj_shitsugyo_yes', points: 6 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_kouiki_hoikushi',
    category: 'adjustment',
    label: '市外在住で市内保育所等に勤務する保育士の子どもですか？（調整項目）',
    helpText: '広域入所申請者',
    inputType: 'radio',
    options: [
      { label: '市外在住で、市内保育所等で勤務する、又は勤務予定の保育士の子ども（+2点）', value: 'adj_kouiki_hoikushi_yes', points: 2 },
      { label: '該当なし', value: 'adj_kouiki_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_zaien',
    category: 'adjustment',
    label: '保育所部分にきょうだい児がいますか？（調整項目）',
    helpText:
      '選考時点で既に在園しているきょうだい児がいる場合に限り適用します。また、保護者等の入所要件が求職中の場合は適用しません',
    inputType: 'radio',
    options: [
      { label: '保育所部分のきょうだい児がいる（+40点）', value: 'adj_kyodai_zaien_yes', points: 40 },
      { label: '該当なし', value: 'adj_kyodai_zaien_none', points: 0 },
    ],
  },
  {
    id: 'adj_kodomoen_kyodai',
    category: 'adjustment',
    label: '認定こども園の教育部分を利用しているきょうだい児がいて、同園の保育所部分に申請しますか？（調整項目）',
    inputType: 'select',
    options: [
      { label: 'きょうだい児が新2号認定を受けている（+2点）', value: 'adj_kodomoen_kyodai_shin2', points: 2 },
      { label: 'きょうだい児が新2号認定を受けていない（+1点）', value: 'adj_kodomoen_kyodai_other', points: 1 },
      { label: '該当なし', value: 'adj_kodomoen_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_ichigo_nigo',
    category: 'adjustment',
    label: '認定こども園1号部分から同こども園2号部分への申請ですか？（調整項目）',
    helpText: '教育部分から保育所部分へ',
    inputType: 'radio',
    options: [
      { label: '認定こども園1号部分から同こども園2号部分へ（+3点）', value: 'adj_ichigo_nigo_yes', points: 3 },
      { label: '該当なし', value: 'adj_ichigo_nigo_none', points: 0 },
    ],
  },
  {
    id: 'adj_shokibo',
    category: 'adjustment',
    label: '小規模保育所等の卒園児ですか？（調整項目）',
    helpText: '小規模保育所の卒園児には、小郡中央保育園分園2歳児クラス及びさくら乳児保育園の卒園児を含みます',
    inputType: 'radio',
    options: [
      { label: '小規模保育所等の卒園児が連携施設または他の保育所等に通う（+60点）', value: 'adj_shokibo_yes', points: 60 },
      { label: '該当なし', value: 'adj_shokibo_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者のいずれかが保育士等として市内保育所等に勤務していますか？（調整項目）',
    helpText:
      '保育士等とは、保育士、保育教諭、子育て支援員、看護師、調理員、その他市が認めるもの。市内保育所等とは、保育所、地域型保育事業（家庭的保育、小規模保育、居宅訪問型保育、事業所内保育）、認定こども園',
    inputType: 'select',
    options: [
      { label: '保育士等として市内保育所等に勤務している、または勤務予定（就労月120時間以上）（+50点）', value: 'adj_hoikushi_120ijo', points: 50 },
      { label: '保育士等として市内保育所等に勤務している、または勤務予定（就労月120時間未満）（+20点）', value: 'adj_hoikushi_120miman', points: 20 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_hokago',
    category: 'adjustment',
    label: '保護者のいずれかが放課後児童クラブの指導員として市内に勤務していますか？（調整項目）',
    inputType: 'radio',
    options: [
      { label: '放課後児童クラブの指導員として市内に勤務している、または勤務予定（+3点）', value: 'adj_hokago_yes', points: 3 },
      { label: '該当なし', value: 'adj_hokago_none', points: 0 },
    ],
  },
  {
    id: 'adj_taiki_sotsuen',
    category: 'adjustment',
    label: '待機中のまま、在園中のきょうだい児が卒園しましたか？（調整項目）',
    inputType: 'radio',
    options: [
      { label: '待機中のまま、在園中のきょうだい児が卒園した（+10点）', value: 'adj_taiki_sotsuen_yes', points: 10 },
      { label: '該当なし', value: 'adj_taiki_sotsuen_none', points: 0 },
    ],
  },
];

export const ogoriData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
