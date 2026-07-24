import type { MunicipalityData, Question } from '../types';

// 出典: https://www.town.saitama-miyoshi.lg.jp/kosodate/mokuteki/hoikusho/documents/R8kizyunntennsuuhyou.pdf
//       （三芳町 保育所入所基準点数表／令和8年度）
// 三芳町（埼玉県入間郡）保育所入所基準点数表（基準点＋調整点）
// 計算方式: sum方式（点数表は父・母それぞれの列に点数を記入し合算。「基準点数計」を父母で算出）。
// 最高基準点: 30（父母各15＝就労月180時間以上）
// 注:
//  - 「出産」は母（保護者2）のみに設定（原典で父列は斜線）。
//  - 就学は就労と同じ区分で採点（原典で「就労または就学」が同一行）。
//  - 変動・条件付きの調整項目（一時保育の週日数による加点、居宅外同伴就労の加点、自営業申告不備による
//    変動減点、就労実績関連の父母別減点等）は本シミュレーターでは割愛し、固定点数の項目のみ実装。

const municipality = {
  id: 'miyoshi-saitama',
  name: '三芳町',
  slug: 'miyoshi-saitama',
  prefecture: '埼玉県',
  maxBasePoints: 30,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労（休憩含む）または就学
    { label: '就労・就学：月180時間以上', value: `${prefix}_work_180`, points: 15 },
    { label: '就労・就学：月170時間以上180時間未満', value: `${prefix}_work_170`, points: 14 },
    { label: '就労・就学：月160時間以上170時間未満', value: `${prefix}_work_160`, points: 13 },
    { label: '就労・就学：月150時間以上160時間未満', value: `${prefix}_work_150`, points: 12 },
    { label: '就労・就学：月140時間以上150時間未満', value: `${prefix}_work_140`, points: 11 },
    { label: '就労・就学：月130時間以上140時間未満', value: `${prefix}_work_130`, points: 10 },
    { label: '就労・就学：月120時間以上130時間未満', value: `${prefix}_work_120`, points: 9 },
    { label: '就労・就学：月110時間以上120時間未満', value: `${prefix}_work_110`, points: 8 },
    { label: '就労・就学：月100時間以上110時間未満', value: `${prefix}_work_100`, points: 7 },
    { label: '就労・就学：月80時間以上100時間未満', value: `${prefix}_work_80`, points: 6 },
    { label: '就労・就学：月64時間以上80時間未満', value: `${prefix}_work_64`, points: 5 },
    { label: '就労・就学：月64時間未満', value: `${prefix}_work_u64`, points: 0 },
    { label: '内職：月64時間以上', value: `${prefix}_naishoku`, points: 2 },
    // 出産（母のみ ※後段で母だけに追加）
    // 疾病・障害
    { label: '疾病（入院）：1ヶ月以上を見込まれる', value: `${prefix}_ill_hosp`, points: 16 },
    { label: '疾病（自宅療養）：常時病臥', value: `${prefix}_ill_bed`, points: 15 },
    { label: '疾病（自宅療養）：精神疾患・感染症・難病等長期療養', value: `${prefix}_ill_mental`, points: 15 },
    { label: '疾病（自宅療養）：安静を要し、かつ週3日以上の通院を要する', value: `${prefix}_ill_visit3`, points: 13 },
    { label: '疾病（自宅療養）：安静を要する', value: `${prefix}_ill_rest`, points: 10 },
    { label: '疾病（自宅療養）：上記以外の自宅療養で保育を必要とすると認められる場合', value: `${prefix}_ill_other`, points: 7 },
    { label: '障がい：身体・療育・精神の障がい者手帳交付者（1・2級・Ⓐ〜B）', value: `${prefix}_dis`, points: 16 },
    // 介護・看護
    { label: '介護・看護：常時介護が常態、または週5日以上の通院・入院付添い', value: `${prefix}_care_h`, points: 15 },
    { label: '介護・看護：一部介護が常態、または週3日以上の通院・入院付添い', value: `${prefix}_care_m`, points: 12 },
    { label: '介護・看護：上記以外の介護・看護で保育を必要とすると認められるもの', value: `${prefix}_care_l`, points: 7 },
    // 災害復旧
    { label: '災害復旧：家屋損失・その他の災害', value: `${prefix}_disaster`, points: 20 },
    // 求職活動・起業準備
    { label: '求職活動・起業準備：公的機関による証明がある場合', value: `${prefix}_seek_proof`, points: 4 },
    { label: '求職活動・起業準備：公的機関による証明がない場合', value: `${prefix}_seek_noproof`, points: 2 },
    { label: '求職活動・起業準備：就労誓約書のみの場合', value: `${prefix}_seek_yakujo`, points: 0 },
    // その他
    { label: 'その他：児童福祉法第25条の8又は第26条等の報告又は通知等があった場合', value: `${prefix}_other`, points: 20 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 出産は母（保護者2）のみ
  if (parentNum === 2) {
    options.splice(13, 0,
      { label: '出産：産前7週・産後8週（多胎妊娠の場合は産前14週・産後8週）', value: `${prefix}_birth`, points: 15 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（父母それぞれの基準点を合算します）。就学は就労と同じ時間区分で採点します。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_setai',
    category: 'adjustment',
    label: '世帯の状況（ひとり親・両親不存在等）（調整点）',
    helpText: '最も当てはまるものを1つ選んでください',
    inputType: 'select',
    options: [
      { label: '両親不存在（死亡・離別・行方不明・拘禁等）（+30点）', value: 'adj_setai_fuzonzai', points: 30 },
      { label: 'ひとり親家庭（単独世帯）（+17点）', value: 'adj_setai_single', points: 17 },
      { label: 'ひとり親家庭（祖父母等と同居）（+16点）', value: 'adj_setai_single_dokyo', points: 16 },
      { label: '離婚調停中または裁判中（申請者以外の保護者の入所基準1〜6を証明する書類が不足）（+7点）', value: 'adj_setai_chotei', points: 7 },
      { label: '該当なし', value: 'adj_setai_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護適用世帯ですか？（調整点）',
    inputType: 'radio',
    options: [
      { label: '生活保護適用世帯（+2点）', value: 'adj_seikatsuhogo_yes', points: 2 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_bekkyo',
    category: 'adjustment',
    label: '保護者の別居に関する状況（調整点）',
    helpText: '離婚協議中（調停中・裁判中含む）、単身赴任等',
    inputType: 'select',
    options: [
      { label: '住民票の異動を伴う保護者別居（+2点）', value: 'adj_bekkyo_ido', points: 2 },
      { label: '住民票の異動を伴わない保護者別居（+1点）', value: 'adj_bekkyo_noido', points: 1 },
      { label: '該当なし', value: 'adj_bekkyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者の失業等で就労の必要性が高いですか？（調整点）',
    helpText: '失業から3か月以内の入所申込に限る',
    inputType: 'radio',
    options: [
      { label: '一般世帯生計中心者の失業等や単独世帯のひとり親の求職等で就労の必要性が高い（+5点）', value: 'adj_shitsugyo_yes', points: 5 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoiku_now',
    category: 'adjustment',
    label: '現在の保育の状況（調整点）',
    helpText: '申込児童を現在どのように保育しているか、最も当てはまるものを選んでください',
    inputType: 'select',
    options: [
      { label: '保育所・幼稚園（延長利用）・認可外保育施設・企業内保育施設等を利用（+3点）', value: 'adj_hoiku_ninka', points: 3 },
      { label: '自宅保育だが産休（産後8週）明けで復職する（+3点）', value: 'adj_hoiku_sankyu', points: 3 },
      { label: '自宅保育だが育児休業が終了する（+2点）', value: 'adj_hoiku_ikuji', points: 2 },
      { label: '幼稚園（延長なし）を利用（+2点）', value: 'adj_hoiku_yochien', points: 2 },
      { label: '居宅内外で個人委託（別居の祖父母・親族等）、保護者による自宅保育（+1点）', value: 'adj_hoiku_itaku', points: 1 },
      { label: '同居の祖父母等、または保護者による自宅保育（0点）', value: 'adj_hoiku_jitaku', points: 0 },
      { label: '該当なし', value: 'adj_hoiku_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogaiji',
    category: 'adjustment',
    label: '入所希望する児童本人に障がいがありますか？（調整点）',
    helpText: '手帳の写しか診断書等の提出があった場合に加点',
    inputType: 'radio',
    options: [
      { label: '入所希望する児童本人に障がいがある（+1点）', value: 'adj_shogaiji_yes', points: 1 },
      { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_zaien',
    category: 'adjustment',
    label: '申込児童のきょうだいが保育施設に入所中ですか？（調整点）',
    inputType: 'select',
    options: [
      { label: 'きょうだいが在園中で、その在園施設が第1希望（+3点）', value: 'adj_kyodai_zaien_1st', points: 3 },
      { label: 'きょうだいが在園中で、在園施設以外が第1希望（+1点）', value: 'adj_kyodai_zaien_other', points: 1 },
      { label: '該当なし', value: 'adj_kyodai_zaien_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_doji',
    category: 'adjustment',
    label: 'きょうだい同時申込ですか？（調整点）',
    helpText: '保留中・転園希望中を含む',
    inputType: 'select',
    options: [
      { label: 'きょうだい3人以上同時申込（+2点）', value: 'adj_kyodai_doji_3', points: 2 },
      { label: 'きょうだい2人同時申込（+1点）', value: 'adj_kyodai_doji_2', points: 1 },
      { label: '該当なし', value: 'adj_kyodai_doji_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士として保育施設で勤務していますか？（調整点）',
    helpText: '就労証明書で確認できる場合（内定を含む）',
    inputType: 'select',
    options: [
      { label: '三芳町内の保育施設において保育士として勤務している（+2点）', value: 'adj_hoikushi_in', points: 2 },
      { label: '三芳町外の保育施設（認可外を含む）において保育士として勤務している（+1点）', value: 'adj_hoikushi_out', points: 1 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_keizoku',
    category: 'adjustment',
    label: '他市の保育施設での継続保育が制度として不可能ですか？（調整点）',
    inputType: 'radio',
    options: [
      { label: '他市の保育施設での継続保育が制度として不可能な場合（+5点）', value: 'adj_keizoku_yes', points: 5 },
      { label: '該当なし', value: 'adj_keizoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '保育に当たれない同居人の減算（調整点）',
    helpText: '月64時間に満たない就労の者又は証明できる書類がない、20歳以上65歳未満の同居人1人につき-1点（-3点を限度）',
    inputType: 'select',
    options: [
      { label: '該当する20歳以上65歳未満の同居人が3人以上（-3点）', value: 'adj_sofubo_3', points: -3 },
      { label: '該当する20歳以上65歳未満の同居人が2人（-2点）', value: 'adj_sofubo_2', points: -2 },
      { label: '該当する20歳以上65歳未満の同居人が1人（-1点）', value: 'adj_sofubo_1', points: -1 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_mishugaku',
    category: 'adjustment',
    label: '入所申込みをせず自宅保育している未就学のきょうだいがいますか？（調整点）',
    inputType: 'radio',
    options: [
      { label: '入所申込みをせず自宅保育している未就学のきょうだいがいる（-5点）', value: 'adj_mishugaku_yes', points: -5 },
      { label: '該当なし', value: 'adj_mishugaku_none', points: 0 },
    ],
  },
  {
    id: 'adj_jitai',
    category: 'adjustment',
    label: '正当な理由なく利用調整結果を辞退したことがありますか？（調整点）',
    helpText: '当年度又は前年度',
    inputType: 'radio',
    options: [
      { label: '正当な理由なく利用調整結果を辞退したことがある（-2点）', value: 'adj_jitai_yes', points: -2 },
      { label: '該当なし', value: 'adj_jitai_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '保育料の滞納がありますか？（調整点）',
    inputType: 'radio',
    options: [
      { label: '保育料の滞納がある（-20点）', value: 'adj_overdue_yes', points: -20 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
];

export const miyoshiSaitamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
