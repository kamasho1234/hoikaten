import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.tsurugashima.lg.jp/data/doc/1755528253_doc_691_0.pdf
//       （令和8年度 鶴ヶ島市 保育所等施設入所基準／保育施設利用申込のしおり P.22-23）
// 鶴ヶ島市 保育所等施設入所基準（表1 基準指数＋表2 調整指数）
// 計算方式: sum方式（「1 父・母の基準指数（表1）の合算で決定する」明記）。
// 最高基準指数: 20（父母各10）
// 注:
//  - 「就学（学生）」は「就労の適用に準ずる（5〜10）」ため独立点数を持たず、就学中の方は就労の該当区分を
//    選択する運用（helpTextで案内）。
//  - 「出産（母）」は母（保護者2）のみに設定。
//  - 表2「多子世帯①（未就学児童数）」は人数分の加点のため、2〜4人を近似設定（helpTextで補足）。
//  - 「家庭事情（市長が認める）」「その他（書類未提出＝申込不可）」は個別判断のため除外。
//  - 保育士加点（市内/市外）は原典では父母それぞれに加算だが、本シミュレーターでは世帯単位で最大該当を採用。

const municipality = {
  id: 'tsurugashima',
  name: '鶴ヶ島市',
  slug: 'tsurugashima',
  prefecture: '埼玉県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労（常勤・自営／内定を含む）
    { label: '就労（常勤・自営）：月160時間以上の就労を常態', value: `${prefix}_work_160`, points: 10 },
    { label: '就労（常勤・自営）：月140時間以上160時間未満の就労を常態', value: `${prefix}_work_140`, points: 9 },
    { label: '就労（常勤・自営）：月120時間以上140時間未満の就労を常態', value: `${prefix}_work_120`, points: 8 },
    { label: '就労（常勤・自営）：月100時間以上120時間未満の就労を常態', value: `${prefix}_work_100`, points: 7 },
    { label: '就労（常勤・自営）：月80時間以上100時間未満の就労を常態', value: `${prefix}_work_80`, points: 6 },
    { label: '就労（常勤・自営）：月64時間以上の就労を常態', value: `${prefix}_work_64`, points: 5 },
    { label: '就労（内職）：月64時間以上の子から離れて行う就労を常態', value: `${prefix}_naishoku`, points: 5 },
    // 出産（母のみ ※後段で母だけに追加）
    // 疾病等
    { label: '疾病（入院）：おおむね1か月以上の入院', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病（居宅療養）：おおむね1か月以上常時臥床', value: `${prefix}_ill_bed`, points: 10 },
    { label: '疾病（居宅療養）：精神・感染症で医師が長期療養（安静）を要すると診断', value: `${prefix}_ill_mental`, points: 10 },
    { label: '疾病（居宅療養）：医師がおおむね1か月以上療養（安静）を要すると診断', value: `${prefix}_ill_general`, points: 8 },
    { label: '疾病（居宅療養）：比較的軽症だが定期的に通院を要する', value: `${prefix}_ill_visit`, points: 6 },
    // 障害
    { label: '障害（重度）：身体1・2級／精神1・2級／療育Ⓐ・A', value: `${prefix}_dis_h`, points: 10 },
    { label: '障害（中度）：身体3・4級／精神3級／療育B', value: `${prefix}_dis_m`, points: 8 },
    { label: '障害（軽度）：身体5・6級／療育C', value: `${prefix}_dis_l`, points: 5 },
    // 看護・介護
    { label: '看護（入院付添）：おおむね1か月以上の親族の入院・付添', value: `${prefix}_nurse_hosp`, points: 10 },
    { label: '看護（心身障害者介護）：心身障害者の介護・通園・院・学に当たっている', value: `${prefix}_nurse_shinshin`, points: 9 },
    { label: '看護（居宅内看護）：同居の家族の長期居宅療養等介護に当たっている', value: `${prefix}_nurse_home`, points: 7 },
    { label: '介護：要介護4以上の認定を受けている方の介護', value: `${prefix}_care_4`, points: 10 },
    { label: '介護：要介護2以上の認定を受けている方の介護', value: `${prefix}_care_2`, points: 8 },
    { label: '介護：その他の要介護認定を受けている方の介護', value: `${prefix}_care_other`, points: 5 },
    // 災害
    { label: '災害：火災・風水害等で家屋が失われ復旧に当たる場合', value: `${prefix}_disaster`, points: 10 },
    // その他
    { label: '就労確約：申込時に一月の最低労働時間が64時間を下回る勤務を常態', value: `${prefix}_kakuyaku`, points: 4 },
    { label: '求職活動：求職のため日中外出を常態', value: `${prefix}_seek`, points: 3 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 出産は母（保護者2）のみ
  if (parentNum === 2) {
    options.splice(7, 0,
      { label: '出産：出産予定月とその前2か月と後3か月（最長6か月間）', value: `${prefix}_birth`, points: 10 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（父母それぞれの基準指数を合算します）。就学・技術習得のため勉強している方は、就労の該当区分（5〜10点）を選んでください。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整指数）',
    helpText: 'ひとり親に準ずる世帯（離婚調停中かつ保護者の住民票が別々等）を含む',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（父母いずれかの死亡・離別・行方不明・拘禁）（+18点）', value: 'adj_single_yes', points: 18 },
      { label: '該当なし', value: 'adj_single_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母のどちらかが単身赴任していますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '父、母のどちらかが単身赴任の場合（+3点）', value: 'adj_tanshin_yes', points: 3 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_kinmuchi',
    category: 'adjustment',
    label: '勤務地の状況（調整指数）',
    helpText: '保護者及び60歳未満の同居者の就労先の勤務地について（市外勤務と県外勤務で重複加点はしません）',
    inputType: 'select',
    options: [
      { label: '就労先の勤務地が全員県外（+2点）', value: 'adj_kinmuchi_kengai', points: 2 },
      { label: '就労先の勤務地が全員市外（+1点）', value: 'adj_kinmuchi_shigai', points: 1 },
      { label: '該当なし', value: 'adj_kinmuchi_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukki',
    category: 'adjustment',
    label: '産前産後休暇から育休を取得せずに復帰しますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '産前産後休暇から育児休業を取得せずに復帰する場合（+1点）', value: 'adj_fukki_yes', points: 1 },
      { label: '該当なし', value: 'adj_fukki_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_saien',
    category: 'adjustment',
    label: '育児休業による一時退園・再入園ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '育児休業取得により一時退園し、同じ園に育児休業明けに再入園の場合（+50点）', value: 'adj_ikuji_saien_yes', points: 50 },
      { label: '該当なし', value: 'adj_ikuji_saien_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: '兄姉弟妹の在園・転園に関する状況（調整指数）',
    helpText: '兄姉弟妹で重複加点はしません',
    inputType: 'select',
    options: [
      { label: '在園中の児童が兄弟姉妹と同施設への転園のみを希望（転園申請）（+4点）', value: 'adj_kyodai_transfer', points: 4 },
      { label: '申込児以外の子が市内の認可保育施設に在園中（新規申請）（+2点）', value: 'adj_kyodai_zaien', points: 2 },
      { label: '兄姉弟妹が同時申請の場合で、同一施設のみ利用を希望（新規申請）（+1点）', value: 'adj_kyodai_same', points: 1 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '双生児以上の申込みですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '双生児以上の申込みの場合（+1点）', value: 'adj_twins_yes', points: 1 },
      { label: '該当なし', value: 'adj_twins_none', points: 0 },
    ],
  },
  {
    id: 'adj_taishi',
    category: 'adjustment',
    label: '未就学児童の人数（多子世帯）（調整指数）',
    helpText: '申込児を含めた未就学児童数分が加点されます',
    inputType: 'select',
    options: [
      { label: '申込児を含め未就学児童が4人以上（+4点）', value: 'adj_taishi_4', points: 4 },
      { label: '申込児を含め未就学児童が3人（+3点）', value: 'adj_taishi_3', points: 3 },
      { label: '申込児を含め未就学児童が2人（+2点）', value: 'adj_taishi_2', points: 2 },
      { label: '該当なし（未就学児は申込児のみ）', value: 'adj_taishi_none', points: 0 },
    ],
  },
  {
    id: 'adj_taishi_shogaku',
    category: 'adjustment',
    label: '兄弟姉妹に小学生の就学児童がいますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '兄弟姉妹に小学生の就学児童がいる場合（+1点）', value: 'adj_taishi_shogaku_yes', points: 1 },
      { label: '該当なし', value: 'adj_taishi_shogaku_none', points: 0 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '申込児を認可外施設等に有償で預けていますか？（調整指数）',
    helpText: '認可外保育施設、ベビーシッター等（一時預かりは対象外、勤務先の託児所も含む）',
    inputType: 'radio',
    options: [
      { label: '申込児を保育施設（認可外・ベビーシッター等）に有償で預けているのを常態（+1点）', value: 'adj_ninkagai_yes', points: 1 },
      { label: '該当なし', value: 'adj_ninkagai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogaiji',
    category: 'adjustment',
    label: '集団保育を必要とする障害児ですか？（調整指数）',
    helpText: '医師の診断書に集団保育が可能かつ必要であることが記載されていることが必要',
    inputType: 'radio',
    options: [
      { label: '集団保育が可能で、かつ集団保育を必要とする障害児の場合（+10点）', value: 'adj_shogaiji_yes', points: 10 },
      { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_shokibo',
    category: 'adjustment',
    label: '小規模保育施設等の卒園児ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '申込児が小規模保育施設・事業所内保育施設の卒園児である場合（+10点）', value: 'adj_shokibo_yes', points: 10 },
      { label: '該当なし', value: 'adj_shokibo_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '生活保護法による被保護者世帯（+1点）', value: 'adj_seikatsuhogo_yes', points: 1 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士等として保育施設で従事していますか？（調整指数）',
    helpText: '保育士資格又は幼稚園教諭の資格を有し、保育施設・幼稚園・認定こども園などで保育に従事する場合',
    inputType: 'select',
    options: [
      { label: '市内の保育施設等で保育に従事する場合（+4点）', value: 'adj_hoikushi_in', points: 4 },
      { label: '市外の保育施設等で保育に従事する場合（+1点）', value: 'adj_hoikushi_out', points: 1 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_dokyo',
    category: 'adjustment',
    label: '祖父母等の同居者がいますか？（調整指数）',
    helpText: '祖父母等同居の親族その他の方が十分保育できないと主張している場合の減算（保育ができない理由を示す書類を提出した場合は減算なし）。同居者の年齢は入所申込み年度の4月1日時点。',
    inputType: 'select',
    options: [
      { label: '49歳以下の同居者がいる（-3点）', value: 'adj_dokyo_49', points: -3 },
      { label: '50〜59歳の同居者がいる（-2点）', value: 'adj_dokyo_59', points: -2 },
      { label: '60〜69歳の同居者がいる（-1点）', value: 'adj_dokyo_69', points: -1 },
      { label: '該当なし', value: 'adj_dokyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_kangai',
    category: 'adjustment',
    label: '市外在住（管外受託）ですか？（調整指数）',
    helpText: '転入確約者を除く',
    inputType: 'select',
    options: [
      { label: '市外在住で、父母のどちらかの勤務地が鶴ヶ島市内の場合（-7点）', value: 'adj_kangai_in', points: -7 },
      { label: '市外在住で、父母の勤務地が鶴ヶ島市外の場合（-8点）', value: 'adj_kangai_out', points: -8 },
      { label: '該当なし（市内在住）', value: 'adj_kangai_none', points: 0 },
    ],
  },
];

export const tsurugashimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
