import type { MunicipalityData, Question } from '../types';

// 出典: 須恵町「令和8年度 須恵町保育施設の利用調整に関する基準」
// https://www.town.sue.fukuoka.jp/material/files/group/73/kizyunnhyou.pdf
// 掲載ページ: https://www.town.sue.fukuoka.jp/soshiki/kodomokosodateka/kosodate/youti_hoiku_youji/9357.html
// 計算方式: sum方式（基準指数表の※1に「父母それぞれの指数を合算し、世帯の指数を決定する
//           （基準指数）。なお、基準指数の上限は150とする。」と明記）
// 最高基準指数: 150（※1の上限）
// 注:
//  - 原典※1の「基準指数の上限は150」は世帯の合算後の上限。municipality.baseCap=150 として
//    エンジン側で適用している（調整指数の加減算は上限適用後の基準指数に対して行う）。
//  - 就労時間には通勤時間は含まず、休憩時間は含む（原典※3）。
//  - 調整指数の番号1・2（保育士加算）は原典※2「父母共に該当する場合それぞれ指数を加点する」の
//    ため、保護者ごとの設問として実装。
//  - 原典※3「番号4を加点する場合は6を、番号5のときは9は加算しない」、
//    ※4「番号13・15、16・21は、それぞれ重複して加算しない」に従い、該当する組を排他selectで実装。
//  - 除外: 基準指数9「虐待・DV（最優先）」は固定点数ではなく順位付けのため実装対象外。
//    調整指数「その他（児童福祉等の観点から特に調整が必要とされた場合・要保護児童など／150）」も
//    町の個別判断のため対象外。
//  - 基準指数5「就学」は原典が「上記(1)の①を準用」「上記(2)の①を準用」としているため、
//    就労の該当区分を選ぶよう helpText で案内し独立した選択肢は設けていない。

const municipality = {
  id: 'sue',
  name: '須恵町',
  slug: 'sue',
  prefecture: '福岡県',
  maxBasePoints: 150,
  scoringMethod: 'sum',
  baseCap: 150,
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 1 就労 (1)居宅外労働 ①自営（被雇用者・事業主）
    { label: '居宅外労働（被雇用者・事業主）：1ヶ月の勤務が160時間以上', value: `${prefix}_out1_160`, points: 150 },
    { label: '居宅外労働（被雇用者・事業主）：1ヶ月の勤務が140時間以上160時間未満', value: `${prefix}_out1_140`, points: 140 },
    { label: '居宅外労働（被雇用者・事業主）：1ヶ月の勤務が120時間以上140時間未満', value: `${prefix}_out1_120`, points: 130 },
    { label: '居宅外労働（被雇用者・事業主）：1ヶ月の勤務が100時間以上120時間未満', value: `${prefix}_out1_100`, points: 120 },
    { label: '居宅外労働（被雇用者・事業主）：1ヶ月の勤務が80時間以上100時間未満', value: `${prefix}_out1_80`, points: 110 },
    { label: '居宅外労働（被雇用者・事業主）：1ヶ月の勤務が64時間以上80時間未満', value: `${prefix}_out1_64`, points: 100 },
    // 1 就労 (1)居宅外労働 ②自営（従事者）
    { label: '居宅外労働（自営の従事者）：1ヶ月の勤務が160時間以上', value: `${prefix}_out2_160`, points: 140 },
    { label: '居宅外労働（自営の従事者）：1ヶ月の勤務が140時間以上160時間未満', value: `${prefix}_out2_140`, points: 130 },
    { label: '居宅外労働（自営の従事者）：1ヶ月の勤務が120時間以上140時間未満', value: `${prefix}_out2_120`, points: 120 },
    { label: '居宅外労働（自営の従事者）：1ヶ月の勤務が100時間以上120時間未満', value: `${prefix}_out2_100`, points: 110 },
    { label: '居宅外労働（自営の従事者）：1ヶ月の勤務が80時間以上100時間未満', value: `${prefix}_out2_80`, points: 100 },
    { label: '居宅外労働（自営の従事者）：1ヶ月の勤務が64時間以上80時間未満', value: `${prefix}_out2_64`, points: 90 },
    // 1 就労 (1)居宅外労働 ③採用見込み（起業準備等を含む）
    { label: '採用見込み（起業準備等を含む）：1ヶ月の勤務が160時間以上', value: `${prefix}_out3_160`, points: 120 },
    { label: '採用見込み（起業準備等を含む）：1ヶ月の勤務が140時間以上160時間未満', value: `${prefix}_out3_140`, points: 110 },
    { label: '採用見込み（起業準備等を含む）：1ヶ月の勤務が120時間以上140時間未満', value: `${prefix}_out3_120`, points: 100 },
    { label: '採用見込み（起業準備等を含む）：1ヶ月の勤務が100時間以上120時間未満', value: `${prefix}_out3_100`, points: 90 },
    { label: '採用見込み（起業準備等を含む）：1ヶ月の勤務が80時間以上100時間未満', value: `${prefix}_out3_80`, points: 80 },
    { label: '採用見込み（起業準備等を含む）：1ヶ月の勤務が64時間以上80時間未満', value: `${prefix}_out3_64`, points: 70 },
    // 1 就労 (2)居宅内労働 ①
    { label: '居宅内労働：1ヶ月の勤務が160時間以上', value: `${prefix}_in1_160`, points: 130 },
    { label: '居宅内労働：1ヶ月の勤務が140時間以上160時間未満', value: `${prefix}_in1_140`, points: 120 },
    { label: '居宅内労働：1ヶ月の勤務が120時間以上140時間未満', value: `${prefix}_in1_120`, points: 110 },
    { label: '居宅内労働：1ヶ月の勤務が100時間以上120時間未満', value: `${prefix}_in1_100`, points: 100 },
    { label: '居宅内労働：1ヶ月の勤務が80時間以上100時間未満', value: `${prefix}_in1_80`, points: 90 },
    { label: '居宅内労働：1ヶ月の勤務が64時間以上80時間未満', value: `${prefix}_in1_64`, points: 80 },
    // 1 就労 (2)居宅内労働 ②内職
    { label: '内職：1日8時間以上かつ月収5万円以上の労働', value: `${prefix}_naishoku_8`, points: 100 },
    { label: '内職：1日4時間以上かつ月収3万円以上の労働', value: `${prefix}_naishoku_4`, points: 90 },
    // 2 求職活動
    { label: '求職中：公共職業安定所（ハローワーク）において求職活動をしていると認められる', value: `${prefix}_seek_hw`, points: 50 },
    { label: '求職中（就労先未定）（上記以外）', value: `${prefix}_seek_other`, points: 10 },
    // 3 不存在
    { label: '不存在：死亡・離婚・行方不明・拘禁など（不存在の者の指数）', value: `${prefix}_absent`, points: 150 },
    // 4 妊娠・出産
    { label: '妊娠・出産：出産前（出産予定月の前2か月）／出産後（出産月の後2か月）', value: `${prefix}_birth`, points: 140 },
    // 6 保護者の疾病・障がい
    { label: '疾病：1か月以上入院している場合（入院予定を含む）', value: `${prefix}_ill_hosp`, points: 150 },
    { label: '疾病（自宅療養）：常時病臥・感染症', value: `${prefix}_ill_bed`, points: 150 },
    { label: '疾病（自宅療養）：精神疾患のため、保育が困難（診断書）な場合', value: `${prefix}_ill_mental`, points: 150 },
    { label: '疾病（自宅療養・一般療養）：通院加療を行い、常に安静を要するなど、居宅内で安静する場合', value: `${prefix}_ill_rest`, points: 135 },
    { label: '疾病（自宅療養・一般療養）：上記以外で通院加療を行い、居宅内で安静する場合', value: `${prefix}_ill_other`, points: 90 },
    { label: '障がい：身体障がい者手帳1・2級、精神障がい者保健福祉手帳1級、療育手帳A', value: `${prefix}_dis_1`, points: 150 },
    { label: '障がい：身体障がい者手帳3級、精神障がい者保健福祉手帳2・3級、療育手帳B', value: `${prefix}_dis_2`, points: 140 },
    { label: '障がい：身体障がい者手帳4級以下', value: `${prefix}_dis_3`, points: 120 },
    // 7 看護・介護
    { label: '看護：入院・通院している親族に1ヶ月120時間以上付き添いの必要がある', value: `${prefix}_kango_120`, points: 150 },
    { label: '看護：入院・通院している親族に1ヶ月64時間以上120時間未満付き添いの必要がある', value: `${prefix}_kango_64`, points: 140 },
    { label: '看護：上記以外で付き添いの必要がある', value: `${prefix}_kango_other`, points: 30 },
    { label: '介護：全介護を必要とする場合（重度障がい者、要介護認定3・4・5程度）', value: `${prefix}_kaigo_full`, points: 150 },
    { label: '介護：一部介護を必要とする場合（要介護認定1・2程度）', value: `${prefix}_kaigo_part`, points: 135 },
    { label: '介護：支援を必要とする場合（要支援）', value: `${prefix}_kaigo_shien`, points: 110 },
    { label: '介護：上記以外で必要とする場合（入所した場合、別途就労等することが必要）', value: `${prefix}_kaigo_other`, points: 30 },
    // 8 災害復旧
    { label: '災害復旧：自宅の震災、風水害、火災その他の災害の復旧に当たっている', value: `${prefix}_disaster`, points: 150 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労等形態（基準指数）`,
      helpText:
        '最も当てはまるものを1つ選んでください。就労時間には通勤時間は含まず、休憩時間は含みます。就労状況は契約上の勤務日数・時間だけでなく直近3か月の就労実績も含めて判定されます。就学（日中、就労・技能習得のための外出を常態としている場合）は居宅外労働①を、就学・技能習得が内定している場合は居宅内労働①を準用するため、該当する就労区分を選んでください。なお父母の指数を合算した世帯の基準指数には150点の上限があり、本シミュレーターでも上限を適用して計算します。',
      inputType: 'select',
      options,
    },
    {
      id: `${prefix}_hoikushi`,
      category,
      label: `${parentLabel}は保育士として勤務していますか？（調整指数 番号1・2／個人加算）`,
      helpText:
        '町内外の保育士が対象です。原典※2により、父母共に該当する場合はそれぞれに加点されます。',
      inputType: 'select',
      options: [
        { label: '保育士として月120時間以上の勤務をする（+50点）', value: `${prefix}_hoikushi_120`, points: 50 },
        { label: '保育士として月64時間以上120時間未満の勤務をする（+35点）', value: `${prefix}_hoikushi_64`, points: 35 },
        { label: '該当なし', value: `${prefix}_hoikushi_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者が失業していますか？（調整指数 番号3）',
    helpText: '自発的失業を除きます。',
    inputType: 'radio',
    options: [
      { label: '生計中心者の失業により就労の必要性が高い（+100点）', value: 'adj_shitsugyo_yes', points: 100 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukki',
    category: 'adjustment',
    label: '産休・育休からの復帰の状況は？（調整指数 番号4・6）',
    helpText:
      '原典※3により、番号4を加点する場合は番号6を加算しません。番号4は基準日時点で保育所等（家庭保育室を含む）に入所している場合や、妊娠・出産要件での入所申込の場合を除きます。',
    inputType: 'select',
    options: [
      { label: '一旦退園後、育休から復帰する（+75点）', value: 'adj_fukki_taien', points: 75 },
      { label: '産前産後休業又は育児休業を取得しており、直ちに復帰する（+10点）', value: 'adj_fukki_tadachini', points: 10 },
      { label: '該当なし', value: 'adj_fukki_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukushoku_saki',
    category: 'adjustment',
    label: '復職予定日が入所調整する月の2か月以上先ですか？（調整指数 番号7）',
    inputType: 'radio',
    options: [
      { label: '復職予定日が入所調整する月の2か月以上先である（-150点）', value: 'adj_fukushoku_saki_yes', points: -150 },
      { label: '該当なし', value: 'adj_fukushoku_saki_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整指数 番号8）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+15点）', value: 'adj_seikatsuhogo_yes', points: 15 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親・父母の不存在に該当しますか？（調整指数 番号5・9・10）',
    helpText:
      '原典※3により、番号5（同居者なしのひとり親家庭で就労等を継続・内定）を加点する場合は番号9（父母の一人が不存在）を加算しません。番号5の同居者には、住所が別であっても生計を共にしている場合を含みます。',
    inputType: 'select',
    options: [
      { label: '父母の両方が不存在（死亡など）である（+100点）', value: 'adj_hitorioya_ryoho', points: 100 },
      { label: '同居者なしのひとり親家庭で、就労（又は就学・技能習得）を継続している又は内定している（+75点）', value: 'adj_hitorioya_keizoku', points: 75 },
      { label: '父母の一人が不存在（死亡、離婚、未婚など）である（+50点）', value: 'adj_hitorioya_hitori', points: 50 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_fuzai',
    category: 'adjustment',
    label: '父母の一人が単身赴任・長期入院等で不在ですか？（調整指数 番号11）',
    inputType: 'radio',
    options: [
      { label: '父母の一人が単身赴任、3か月以上入院などにより不在（+25点）', value: 'adj_fuzai_yes', points: 25 },
      { label: '該当なし', value: 'adj_fuzai_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo_kengai',
    category: 'adjustment',
    label: '祖父母が県外に居住し支援がありませんか？（調整指数 番号12）',
    inputType: 'radio',
    options: [
      { label: '祖父母が県外に居住し支援がない（+10点）', value: 'adj_sofubo_kengai_yes', points: 10 },
      { label: '該当なし', value: 'adj_sofubo_kengai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogai',
    category: 'adjustment',
    label: '保護者・同居者の障がいの状況は？（調整指数 番号13・15）',
    helpText: '原典※4により、番号13と番号15は重複して加算されません。',
    inputType: 'select',
    options: [
      { label: '保護者が身体障がい者手帳1〜3級、療育手帳A〜B、精神障がい者保健福祉手帳1・2級の1つを所持している（+20点）', value: 'adj_shogai_hogosha', points: 20 },
      { label: '児童の同居者に身体障がい者手帳1〜3級、療育手帳A〜B、精神障がい者保健福祉手帳1〜3級を所持している者がいる（保護者及び入所申込児童を除く／+5点）', value: 'adj_shogai_dokyo', points: 5 },
      { label: '該当なし', value: 'adj_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_ryoyo',
    category: 'adjustment',
    label: '保護者が常時病臥・精神病（手帳なし）・感染症で居宅療養していますか？（調整指数 番号14）',
    inputType: 'radio',
    options: [
      { label: '保護者が常時病臥、精神病（手帳なし）、感染症で居宅療養している（+10点）', value: 'adj_ryoyo_yes', points: 10 },
      { label: '該当なし', value: 'adj_ryoyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだいの申込・入園状況は？（調整指数 番号16・21）',
    helpText:
      '原典※4により、番号16と番号21は重複して加算されません。番号21は3月末の卒園児を除きます。',
    inputType: 'select',
    options: [
      { label: '兄弟姉妹がすでに認可保育園・認定こども園（保育所部門）へ入園している（+30点）', value: 'adj_kyodai_nyuen', points: 30 },
      { label: '新規で兄弟姉妹や多胎児が同時に申込をしている（+15点）', value: 'adj_kyodai_doji', points: 15 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikou',
    category: 'adjustment',
    label: '兄弟姉妹の在園施設への移行希望ですか？（調整指数 番号20）',
    helpText:
      '兄弟姉妹が町内の認可保育施設に在園し、同一施設に移行する場合です。加算を行うのは年度更新時のみです。',
    inputType: 'radio',
    options: [
      { label: '保育園等の移行希望（兄弟姉妹が在園する同一施設へ移行する／+50点）', value: 'adj_ikou_yes', points: 50 },
      { label: '該当なし', value: 'adj_ikou_none', points: 0 },
    ],
  },
  {
    id: 'adj_genzai_hoiku',
    category: 'adjustment',
    label: '現在の児童の保育状況は？（調整指数 番号17・18・19）',
    inputType: 'select',
    options: [
      { label: '町外の認可保育施設、届出保育施設（認可外保育施設）、企業主導型保育施設、職場内託児所へ利用調整時点で入所中（+10点）', value: 'adj_genzai_ninkagai', points: 10 },
      { label: '職場へ児童を同伴し保育を行っている（+5点）', value: 'adj_genzai_shokuba', points: 5 },
      { label: '別居の祖父母等による保育を行っている（+1点）', value: 'adj_genzai_sofubo', points: 1 },
      { label: '該当なし', value: 'adj_genzai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tashi',
    category: 'adjustment',
    label: '子どもが3人以上いますか？（調整指数 番号22）',
    helpText: '4月1日現在で中学3年生以下の子どもが対象です。',
    inputType: 'radio',
    options: [
      { label: '子ども（4月1日現在 中学3年生以下）が3人以上いる（+10点）', value: 'adj_tashi_yes', points: 10 },
      { label: '該当なし', value: 'adj_tashi_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '同居している65歳未満の祖父母の就労状況は？（調整指数 番号23）',
    helpText: '疾病等で保育にあたることができない場合を除きます。',
    inputType: 'radio',
    options: [
      { label: '同居している65歳未満の保護者の父母が無職、求職中又は月64時間以上の就労をしていない（-10点）', value: 'adj_sofubo_yes', points: -10 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_jiei_shorui',
    category: 'adjustment',
    label: '自営等で仕事内容・実績の分かる書類を提出できますか？（調整指数 番号24）',
    inputType: 'radio',
    options: [
      { label: '勤務形態が自営の父母や、勤務先の経営者が自身又は親族である父母が、仕事内容・実績の分かる書類を提出できない（-10点）', value: 'adj_jiei_shorui_nashi', points: -10 },
      { label: '該当なし（提出できる、または自営等ではない）', value: 'adj_jiei_shorui_none', points: 0 },
    ],
  },
];

export const sueData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
