import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.kitamoto.lg.jp/material/files/group/24/sisuuhi.pdf
//       （令和8年度 北本市 保育施設利用調整指数表）
// 北本市 保育施設利用調整指数表（利用指数＋調整指数）
// 計算方式: sum方式。利用指数表は父・母それぞれの列に指数が設定され、調整指数にも
//   父母別加算（隣接自治体外への通勤：父1母1、通勤時間片道60分超：父・母各最大2点）が存在するため、
//   世帯指数＝父の利用指数＋母の利用指数＋調整指数の合算構造。
// 最高利用指数: 40（父母各20）
// 注:
//  - 番号9「就学・技能習得」は「1に準じる」（就労と同じ月間時間区分）ため、就学・技能習得中の方は
//    番号1（就労）の該当区分を選択する運用（helpTextで案内）。
//  - 番号3「妊娠・出産」は母（保護者2）のみに設定（原典で父は斜線）。
//  - 番号10「その他（明らかに保育に当たれない・事情を勘案）」は個別判断のため除外。
//  - 調整指数「通勤時間片道60分超（父・母各最大2点）」および保育料の高額滞納（滞納月数×-2）は
//    父母別・変動のため割愛。

const municipality = {
  id: 'kitamoto',
  name: '北本市',
  slug: 'kitamoto',
  prefecture: '埼玉県',
  maxBasePoints: 40,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 1. 就労・就学・技能習得（月間就労・就学時間。休憩時間を含み、残業・通勤時間を除く）
    { label: '就労：月間160時間以上', value: `${prefix}_work_160`, points: 20 },
    { label: '就労：月間140時間以上160時間未満', value: `${prefix}_work_140`, points: 19 },
    { label: '就労：月間120時間以上140時間未満', value: `${prefix}_work_120`, points: 18 },
    { label: '就労：月間100時間以上120時間未満', value: `${prefix}_work_100`, points: 17 },
    { label: '就労：月間80時間以上100時間未満', value: `${prefix}_work_80`, points: 16 },
    { label: '就労：月間64時間以上80時間未満', value: `${prefix}_work_64`, points: 15 },
    // 求職（内定）：上記の該当時間より6減算
    { label: '求職（内定）：就労予定 月間160時間以上', value: `${prefix}_naitei_160`, points: 14 },
    { label: '求職（内定）：就労予定 月間140時間以上160時間未満', value: `${prefix}_naitei_140`, points: 13 },
    { label: '求職（内定）：就労予定 月間120時間以上140時間未満', value: `${prefix}_naitei_120`, points: 12 },
    { label: '求職（内定）：就労予定 月間100時間以上120時間未満', value: `${prefix}_naitei_100`, points: 11 },
    { label: '求職（内定）：就労予定 月間80時間以上100時間未満', value: `${prefix}_naitei_80`, points: 10 },
    { label: '求職（内定）：就労予定 月間64時間以上80時間未満', value: `${prefix}_naitei_64`, points: 9 },
    // 2. 不存在等
    { label: '不存在等：死亡・離別・行方不明・拘禁・DV（証明書がある場合）', value: `${prefix}_absence`, points: 20 },
    // 3. 妊娠・出産（母のみ ※後段で母だけに追加）
    // 4. 疾病・負傷
    { label: '疾病・負傷（入院）：概ね1か月以上（予定も含む）', value: `${prefix}_ill_hosp`, points: 20 },
    { label: '疾病・負傷（居宅）：常時病臥している', value: `${prefix}_ill_bed`, points: 20 },
    { label: '疾病・負傷（居宅）：精神性・感染性疾病', value: `${prefix}_ill_mental`, points: 20 },
    { label: '疾病・負傷（居宅）：常時安静を要する', value: `${prefix}_ill_rest`, points: 16 },
    { label: '疾病・負傷（居宅）：一般療養中', value: `${prefix}_ill_home`, points: 10 },
    // 5. 障がい
    { label: '障がい：身体障害者手帳1・2級／療育手帳A〜B／精神障害者保健福祉手帳1〜3級', value: `${prefix}_dis_12`, points: 20 },
    { label: '障がい：身体障害者手帳3級／療育手帳C', value: `${prefix}_dis_3`, points: 16 },
    { label: '障がい：身体障害者手帳4級', value: `${prefix}_dis_4`, points: 10 },
    // 6. 同居親族等の介護・看護
    { label: '介護・看護（自宅）：重度心身障害者等の介護', value: `${prefix}_care_home`, points: 20 },
    { label: '介護・看護（通院・通所）：月間48時間以上の付き添い', value: `${prefix}_care_visit`, points: 16 },
    { label: '介護・看護（入院・入所）：月間48時間以上の付き添い', value: `${prefix}_care_hosp`, points: 12 },
    { label: '介護・看護：その他の看護・介護', value: `${prefix}_care_other`, points: 10 },
    // 7. 災害・復旧
    { label: '災害・復旧：震災・風水害・火災等による家屋の損傷、その他災害復旧に当たっている', value: `${prefix}_disaster`, points: 20 },
    // 8. 求職（未定）
    { label: '求職（未定）：求職のため昼間の外出を常態としている', value: `${prefix}_seek`, points: 8 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 妊娠・出産は母（保護者2）のみ
  if (parentNum === 2) {
    options.splice(12, 0,
      { label: '妊娠・出産：産前6週間の属する月から産後8週間の翌日の属する月まで', value: `${prefix}_birth`, points: 16 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（父母それぞれの利用指数を合算します）。就学・技能習得中の方は、就労と同じ月間時間区分を選んでください。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_setai',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '母子・父子世帯又はこれに準ずる世帯（+5点）', value: 'adj_setai_yes', points: 5 },
      { label: '該当なし', value: 'adj_setai_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護法の適用を受けていますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '生活保護法適用（+2点）', value: 'adj_seikatsuhogo_yes', points: 2 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者が単身赴任をしていますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '単身赴任（+2点）', value: 'adj_tanshin_yes', points: 2 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_ake',
    category: 'adjustment',
    label: '産休・育休明けですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '産休・育休明け（+1点）', value: 'adj_ikuji_ake_yes', points: 1 },
      { label: '該当なし', value: 'adj_ikuji_ake_none', points: 0 },
    ],
  },
  {
    id: 'adj_tsukin_area',
    category: 'adjustment',
    label: '隣接自治体以外に通勤していますか？（調整指数）',
    helpText: '隣接自治体（桶川市、鴻巣市、吉見町、川島町）以外の地域の勤務場所に通勤している場合。父母それぞれに加点。',
    inputType: 'select',
    options: [
      { label: '父母の両方が隣接自治体以外に通勤している（+2点）', value: 'adj_tsukin_area_both', points: 2 },
      { label: '父母のどちらか一方が隣接自治体以外に通勤している（+1点）', value: 'adj_tsukin_area_one', points: 1 },
      { label: '該当なし', value: 'adj_tsukin_area_none', points: 0 },
    ],
  },
  {
    id: 'adj_kaiko',
    category: 'adjustment',
    label: '主たる稼働者が解雇・倒産等で早急に就労を要しますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '主たる稼働者が解雇・倒産等で、早急に就労を要する（+4点）', value: 'adj_kaiko_yes', points: 4 },
      { label: '該当なし', value: 'adj_kaiko_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: '兄弟姉妹（きょうだい）の利用状況（調整指数）',
    helpText: 'いずれか一つが該当します',
    inputType: 'select',
    options: [
      { label: '市内在住で、きょうだいが利用している施設への転園希望（+10点）', value: 'adj_kyodai_transfer', points: 10 },
      { label: '希望施設に、きょうだいが利用中の園が含まれる（+6点）', value: 'adj_kyodai_include', points: 6 },
      { label: '市内在住で、希望施設にきょうだいが利用中の施設が含まれない（+2点）', value: 'adj_kyodai_notinclude', points: 2 },
      { label: '市内在住で、きょうだいの同時利用希望（転園を含む）（+2点）', value: 'adj_kyodai_same', points: 2 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '申込児童を認可外保育施設等に有償で預けていますか？（調整指数）',
    helpText: '直系親族に預けている場合は除く',
    inputType: 'radio',
    options: [
      { label: '申込児童を認可外保育施設等に有償で預けている（直系親族を除く）（+1点）', value: 'adj_ninkagai_yes', points: 1 },
      { label: '該当なし', value: 'adj_ninkagai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogai',
    category: 'adjustment',
    label: '障がいの状況（調整指数）',
    helpText: '診断書又は手帳の写し添付等。最も該当する1つを選んでください',
    inputType: 'select',
    options: [
      { label: '申込児童が障がい又はこれに類すると認められる（+4点）', value: 'adj_shogai_child', points: 4 },
      { label: '申込児童のきょうだいが障がい又はこれに類すると認められる（+3点）', value: 'adj_shogai_sibling', points: 3 },
      { label: '障がい以外の類型の保護者が身体障害者手帳・療育手帳・精神障害者保健福祉手帳を所持している（+1点）', value: 'adj_shogai_parent', points: 1 },
      { label: '該当なし', value: 'adj_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shigai_month',
    category: 'adjustment',
    label: '【市外在住者】利用開始希望月（調整指数）',
    helpText: '市外在住者のみ対象（継続・転入予定者は除外）',
    inputType: 'select',
    options: [
      { label: '市外在住で、利用開始希望月が4月から9月（-5点）', value: 'adj_shigai_month_49', points: -5 },
      { label: '市外在住で、利用開始希望月が10月から3月（-3点）', value: 'adj_shigai_month_103', points: -3 },
      { label: '該当なし（市内在住）', value: 'adj_shigai_month_none', points: 0 },
    ],
  },
  {
    id: 'adj_shigai_age',
    category: 'adjustment',
    label: '【市外在住者】児童のクラス年齢が0歳から3歳ですか？（調整指数）',
    helpText: '市外在住者のみ対象（継続・転入予定者は除外）',
    inputType: 'radio',
    options: [
      { label: '市外在住で、児童のクラス年齢が0歳から3歳（-2点）', value: 'adj_shigai_age_yes', points: -2 },
      { label: '該当なし', value: 'adj_shigai_age_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_encho',
    category: 'adjustment',
    label: '育休延長を許容できますか？（調整指数）',
    helpText: '入所の優先順位を下げて育休を延長してもよい場合',
    inputType: 'radio',
    options: [
      { label: '育休延長が可能であり、入所の優先順位を下げて育休を延長してもよい（-20点）', value: 'adj_ikuji_encho_yes', points: -20 },
      { label: '該当なし', value: 'adj_ikuji_encho_none', points: 0 },
    ],
  },
  {
    id: 'adj_yakan',
    category: 'adjustment',
    label: '就労形態が夜間勤務のみですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '就労形態が夜間勤務のみ（-3点）', value: 'adj_yakan_yes', points: -3 },
      { label: '該当なし', value: 'adj_yakan_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '利用者負担（保育料）の滞納がありますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '利用者負担（保育料）の滞納がある（-5点）', value: 'adj_overdue_yes', points: -5 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
];

export const kitamotoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
