import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.kimitsu.lg.jp/uploaded/attachment/56460.pdf
//       （君津市「保育の必要性 調整基準点数表」）
// 君津市（千葉県）保育の必要性 調整基準点数表（保護者の状況＋世帯の状況）
// 計算方式: sum方式（原典【算定方法】に「保護者それぞれの状況を算定し合算する。
//           世帯の状況は、1世帯につき1回のみ計算する。」と明記）。
// 最高基準点: 60（父母各30＝「不在」）
// 注:
//  - 「妊娠・出産」は原典の父・母欄に区別（斜線）がないため父母どちらにも設定。
//  - 「多子同時申込」は原典で「2名以上＝1点、1人増えるごとに＋1」のため人数別の選択肢に展開。
//  - 「その他、児童福祉の観点から、明らかに保育を必要とする緊急度が高いと判断される場合は
//    この限りではない」は固定点数が定められていないため実装対象外。
//  - 市外在住者の取扱い（君津市民をすべて調整した後に空きがある場合のみ調整）は点数ではなく
//    調整順序のため実装対象外。

const municipality = {
  id: 'kimitsu',
  name: '君津市',
  slug: 'kimitsu',
  prefecture: '千葉県',
  maxBasePoints: 60,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労（自営業や在宅勤務の場合も含む）
    { label: '就労：月20日以上／1日8時間以上を常態', value: `${prefix}_work_20_8`, points: 22 },
    { label: '就労：月20日以上／1日7時間以上8時間未満', value: `${prefix}_work_20_7`, points: 20 },
    { label: '就労：月20日以上／1日6時間以上7時間未満', value: `${prefix}_work_20_6`, points: 18 },
    { label: '就労：月20日以上／1日4時間から6時間未満', value: `${prefix}_work_20_4`, points: 16 },
    { label: '就労：月16日以上／1日8時間以上を常態', value: `${prefix}_work_16_8`, points: 18 },
    { label: '就労：月16日以上／1日6時間から8時間未満', value: `${prefix}_work_16_6`, points: 16 },
    { label: '就労：月16日以上／1日4時間から6時間未満', value: `${prefix}_work_16_4`, points: 14 },
    { label: '就労：月12日以上／1日8時間以上を常態', value: `${prefix}_work_12_8`, points: 16 },
    { label: '就労：月12日以上／1日6時間から8時間未満', value: `${prefix}_work_12_6`, points: 14 },
    { label: '就労：月12日以上／1日6時間未満（月合計64時間以上であること）', value: `${prefix}_work_12_u6`, points: 12 },
    // 妊娠・出産
    { label: '妊娠・出産：出産（予定）月とその前後2か月の合計5か月間', value: `${prefix}_birth`, points: 20 },
    // 求職活動
    { label: '求職活動', value: `${prefix}_seek`, points: 10 },
    // 疾病・障害
    { label: '疾病：入院', value: `${prefix}_ill_hosp`, points: 22 },
    { label: '疾病：居宅療養（寝たきり）', value: `${prefix}_ill_bed`, points: 22 },
    { label: '疾病：居宅療養（その他）', value: `${prefix}_ill_other`, points: 16 },
    { label: '障害：（身体障がい者）1・2級／（精神障がい者）1・2・3級／（療育）Bの1以上', value: `${prefix}_dis_1`, points: 22 },
    { label: '障害：（身体障がい者）3級／（療育）Bの2', value: `${prefix}_dis_3`, points: 16 },
    { label: '障害：（身体障がい者）4級以下', value: `${prefix}_dis_4`, points: 12 },
    // 介護・看護
    { label: '介護・看護：対象者が寝たきり・重度障がい者', value: `${prefix}_care_bed`, points: 18 },
    { label: '介護・看護：病院介助', value: `${prefix}_care_hosp`, points: 18 },
    { label: '介護・看護：それ以外', value: `${prefix}_care_other`, points: 10 },
    // 就学（自宅内就学の場合も含む）
    { label: '就学：月20日以上かつ1日8時間以上を常態', value: `${prefix}_school_20`, points: 18 },
    { label: '就学：月16日以上かつ1日6時間から8時間', value: `${prefix}_school_16`, points: 12 },
    { label: '就学：月12日以上かつ1日6時間未満（月合計64時間以上）', value: `${prefix}_school_12`, points: 10 },
    // 災害
    { label: '災害（復旧期間に限る）', value: `${prefix}_disaster`, points: 25 },
    // 不在
    { label: '不在：離婚（離婚調停中含む）・死別・未婚・行方不明（警察等の証明が必要）等', value: `${prefix}_absent`, points: 30 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育を必要とする状況`,
      helpText:
        '最も当てはまる状況を1つ選んでください（父母それぞれの点数を算定して合算します）。就労は自営業や在宅勤務の場合も含み、就学は自宅内就学の場合も含みます。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_gyakutai',
    category: 'adjustment',
    label: '虐待・DV等に該当しますか？（世帯の状況）',
    helpText: '児童相談所等の依頼による場合',
    inputType: 'radio',
    options: [
      { label: '児童相談所等の依頼による虐待・DV等に該当する（+50点）', value: 'adj_gyakutai_yes', points: 50 },
      { label: '該当なし', value: 'adj_gyakutai_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？（世帯の状況）',
    inputType: 'radio',
    options: [
      { label: '生活保護受給世帯（+3点）', value: 'adj_seikatsuhogo_yes', points: 3 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設等を利用中ですか？（世帯の状況）',
    helpText: '認可外保育所や一時保育事業を就労・看護等の恒常的な理由によって月64時間以上利用している場合',
    inputType: 'radio',
    options: [
      { label: '認可外保育施設等を月64時間以上利用中（+4点）', value: 'adj_ninkagai_yes', points: 4 },
      { label: '該当なし', value: 'adj_ninkagai_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_zaien',
    category: 'adjustment',
    label: 'きょうだいが第1希望の保育施設に在園していますか？（世帯の状況）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが第1希望の保育施設に在園している（+4点）', value: 'adj_kyodai_zaien_yes', points: 4 },
      { label: '該当なし', value: 'adj_kyodai_zaien_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士として市内の認可保育施設で就労していますか？（世帯の状況）',
    helpText: '父母のいずれかが保育士で市内の認可保育施設で就労する（している）場合。転園は除く',
    inputType: 'radio',
    options: [
      { label: '父母のいずれかが保育士で市内の認可保育施設に就労する（している）（+15点）', value: 'adj_hoikushi_yes', points: 15 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukushoku',
    category: 'adjustment',
    label: '産休・育休から入園後直ちに復職しますか？（世帯の状況）',
    helpText: '支給認定申請書兼入園申込書内「育児休業からの復職」欄で「入園後、直ちに復職希望（入園月の翌月1日まで）」を選択した場合',
    inputType: 'radio',
    options: [
      { label: '入園後、直ちに復職希望（入園月の翌月1日まで）を選択した（+6点）', value: 'adj_fukushoku_yes', points: 6 },
      { label: '該当なし', value: 'adj_fukushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_tashi',
    category: 'adjustment',
    label: '多子同時申込ですか？（世帯の状況）',
    helpText: '2名以上の同時申込で+1点。1人増えるごとに+1点',
    inputType: 'select',
    options: [
      { label: '4名以上の同時申込（+3点）', value: 'adj_tashi_4', points: 3 },
      { label: '3名の同時申込（+2点）', value: 'adj_tashi_3', points: 2 },
      { label: '2名の同時申込（+1点）', value: 'adj_tashi_2', points: 1 },
      { label: '該当なし', value: 'adj_tashi_none', points: 0 },
    ],
  },
  {
    id: 'adj_tataiji',
    category: 'adjustment',
    label: '多胎児の同時申込ですか？（世帯の状況）',
    inputType: 'radio',
    options: [
      { label: '多胎児同時申込（+1点）', value: 'adj_tataiji_yes', points: 1 },
      { label: '該当なし', value: 'adj_tataiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogaiji',
    category: 'adjustment',
    label: '入園希望児に障がいがありますか？（世帯の状況）',
    helpText: '集団保育が可能であり、市が発達支援の必要性を認めた場合',
    inputType: 'radio',
    options: [
      { label: '入園希望児が障がいをもっている（+3点）', value: 'adj_shogaiji_yes', points: 3 },
      { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_heien',
    category: 'adjustment',
    label: '閉園施設からの転園希望ですか？（世帯の状況）',
    helpText: '閉園予定年度の2年度前から適用。転園希望先に閉園予定施設があるときは適用除外（自己都合でなく希望する場合は適用）',
    inputType: 'radio',
    options: [
      { label: '閉園施設からの転園希望（+10点）', value: 'adj_heien_yes', points: 10 },
      { label: '該当なし', value: 'adj_heien_none', points: 0 },
    ],
  },
  {
    id: 'adj_shokibo',
    category: 'adjustment',
    label: '小規模保育施設の卒園児ですか？（世帯の状況）',
    helpText: '卒園から間断なく保育施設を利用する場合',
    inputType: 'radio',
    options: [
      { label: '小規模保育施設卒園児（+15点）', value: 'adj_shokibo_yes', points: 15 },
      { label: '該当なし', value: 'adj_shokibo_none', points: 0 },
    ],
  },
  {
    id: 'adj_katei_hoiku',
    category: 'adjustment',
    label: '同居者に家庭保育が可能な方がいますか？（世帯の状況）',
    helpText: '65歳以下で健康かつ無職の同居者がいる場合',
    inputType: 'radio',
    options: [
      { label: '同居者に家庭保育可能な者（65歳以下で健康かつ無職の者）がいる（-3点）', value: 'adj_katei_hoiku_yes', points: -3 },
      { label: '該当なし', value: 'adj_katei_hoiku_none', points: 0 },
    ],
  },
  {
    id: 'adj_naitei',
    category: 'adjustment',
    label: '就労が採用予定・内定の段階ですか？（世帯の状況）',
    helpText: '実際に働き始めた後に再度就労証明書の提出が必要',
    inputType: 'radio',
    options: [
      { label: '採用予定・内定（-1点）', value: 'adj_naitei_yes', points: -1 },
      { label: '該当なし', value: 'adj_naitei_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '保育料等の滞納がありますか？（世帯の状況）',
    helpText: '正当な理由なく保育料または給食（副食）費を6カ月以上滞納した場合。過去の滞納及び在園兄弟の滞納状況による',
    inputType: 'radio',
    options: [
      { label: '保育料等を6カ月以上滞納している（-4点）', value: 'adj_tainou_yes', points: -4 },
      { label: '該当なし', value: 'adj_tainou_none', points: 0 },
    ],
  },
  {
    id: 'adj_tenen',
    category: 'adjustment',
    label: '転園希望ですか？（世帯の状況）',
    helpText: '送迎可能範囲（片道30分程度の範囲）での転園に適用。きょうだいが第1希望の保育施設に在園しているときは適用除外',
    inputType: 'radio',
    options: [
      { label: '送迎可能範囲での転園希望（-2点）', value: 'adj_tenen_yes', points: -2 },
      { label: '該当なし', value: 'adj_tenen_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikukyu_encho',
    category: 'adjustment',
    label: '育児休業の延長も許容できますか？（世帯の状況）',
    helpText: '支給認定申請書兼入園申込書内「育児休業からの復職」欄で「希望する保育施設に入所できない場合は、育児休業の延長も許容できる」を選択した場合。保留となることを保証するものではありません',
    inputType: 'radio',
    options: [
      { label: '育児休業の延長も許容できるを選択した（-40点）', value: 'adj_ikukyu_encho_yes', points: -40 },
      { label: '該当なし', value: 'adj_ikukyu_encho_none', points: 0 },
    ],
  },
];

export const kimitsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
