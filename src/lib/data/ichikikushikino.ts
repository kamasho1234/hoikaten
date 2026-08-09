import type { MunicipalityData, Question } from '../types';

// 出典: いちき串木野市「特定教育・保育施設及び特定地域型保育事業の利用調整に関する基準」
// https://www.city.ichikikushikino.lg.jp/fukushi2/kenko/kosodate/kosodate/documents/riyoutyosei_kizyun.pdf
// 掲載ページ: https://www.city.ichikikushikino.lg.jp/fukushi2/kenko/kosodate/kosodate/hoiku.html
// 計算方式: sum方式（基準指数表の※1に「父母それぞれの指数を合算し、世帯の指数を決定する。
//           （基準指数）」と明記。原典の計算例「父親10＋母親8＋調整指数3＝21点」も再現済み）
// 最高基準指数: 20（父母各10）
// 注:
//  - 原典※3「保護者が保育の必要な事由（就労等）が2以上ある場合には、原則として指数の高い状況を
//    とり指数を決定する。」のため基準指数は単一selectで実装。
//  - 原典※5「就労時間には、通勤時間を含む。ただし、休憩時間は含まない。」をhelpTextで案内。
//  - 「妊娠・出産」「育児休業」は原典が「母親の出産・産後」「母親の育児休業」と規定しているため
//    保護者2（母）にのみ設定。
//  - 調整指数の重複ルール（原典の★表記）を反映:
//    ・6番（産前・産後+2）と11番（育児休業+5）は重複加算しない
//    ・11番（育児休業+5）と18番（きょうだい+3）は重複加算しない
//    ・13〜15番（障がい）は重複加算しない
//    このため6・11・18を1つのselectにまとめ、原典で併用可能な組み合わせのみを選択肢にしている。
//  - 除外: 基準指数10「その他（上記以外で明らかに保育に欠けると認められる場合）1〜10」、
//    調整指数26「保育料等を2か月以上滞納（滞納月×-3）」は変動値、
//    調整指数「その他（児童福祉等の観点から特に調整が必要とされた場合）1〜10」は範囲値のため対象外。

const municipality = {
  id: 'ichikikushikino',
  name: 'いちき串木野市',
  slug: 'ichikikushikino',
  prefecture: '鹿児島県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 1 就労 居宅外労働 外勤・自営(経営者)・農業(中心者)
    { label: '居宅外労働（外勤・自営の経営者・農業の中心者）：月20日以上／1日7時間以上', value: `${prefix}_A1`, points: 10 },
    { label: '居宅外労働（外勤・自営の経営者・農業の中心者）：月20日以上／1日6時間以上7時間未満', value: `${prefix}_A2`, points: 9 },
    { label: '居宅外労働（外勤・自営の経営者・農業の中心者）：月20日以上／1日4時間以上6時間未満', value: `${prefix}_A3`, points: 8 },
    { label: '居宅外労働（外勤・自営の経営者・農業の中心者）：月16日以上／1日7時間以上', value: `${prefix}_B1`, points: 9 },
    { label: '居宅外労働（外勤・自営の経営者・農業の中心者）：月16日以上／1日6時間以上7時間未満', value: `${prefix}_B2`, points: 8 },
    { label: '居宅外労働（外勤・自営の経営者・農業の中心者）：月16日以上／1日4時間以上6時間未満', value: `${prefix}_B3`, points: 7 },
    { label: '居宅外労働（外勤・自営の経営者・農業の中心者）：月12日以上／1日7時間以上', value: `${prefix}_C1`, points: 8 },
    { label: '居宅外労働（外勤・自営の経営者・農業の中心者）：月12日以上／1日6時間以上7時間未満', value: `${prefix}_C2`, points: 7 },
    { label: '居宅外労働（外勤・自営の経営者・農業の中心者）：月12日以上／1日4時間以上6時間未満', value: `${prefix}_C3`, points: 6 },
    // 1 就労 居宅外労働 自営(専従者)・農業(協力者)
    { label: '居宅外労働（自営の専従者・農業の協力者）：月20日以上／1日7時間以上', value: `${prefix}_D1`, points: 8 },
    { label: '居宅外労働（自営の専従者・農業の協力者）：月20日以上／1日6時間以上7時間未満', value: `${prefix}_D2`, points: 7 },
    { label: '居宅外労働（自営の専従者・農業の協力者）：月20日以上／1日4時間以上6時間未満', value: `${prefix}_D3`, points: 6 },
    { label: '居宅外労働（自営の専従者・農業の協力者）：月16日以上／1日7時間以上', value: `${prefix}_E1`, points: 7 },
    { label: '居宅外労働（自営の専従者・農業の協力者）：月16日以上／1日6時間以上7時間未満', value: `${prefix}_E2`, points: 6 },
    { label: '居宅外労働（自営の専従者・農業の協力者）：月16日以上／1日4時間以上6時間未満', value: `${prefix}_E3`, points: 5 },
    { label: '居宅外労働（自営の専従者・農業の協力者）：月12日以上／1日7時間以上', value: `${prefix}_F1`, points: 6 },
    { label: '居宅外労働（自営の専従者・農業の協力者）：月12日以上／1日6時間以上7時間未満', value: `${prefix}_F2`, points: 5 },
    { label: '居宅外労働（自営の専従者・農業の協力者）：月12日以上／1日4時間以上6時間未満', value: `${prefix}_F3`, points: 4 },
    // 2 就労 居宅内労働 自営(経営者)
    { label: '居宅内労働（自営の経営者）：月20日以上／1日7時間以上', value: `${prefix}_G1`, points: 9 },
    { label: '居宅内労働（自営の経営者）：月20日以上／1日6時間以上7時間未満', value: `${prefix}_G2`, points: 8 },
    { label: '居宅内労働（自営の経営者）：月20日以上／1日4時間以上6時間未満', value: `${prefix}_G3`, points: 7 },
    { label: '居宅内労働（自営の経営者）：月16日以上／1日7時間以上', value: `${prefix}_H1`, points: 8 },
    { label: '居宅内労働（自営の経営者）：月16日以上／1日6時間以上7時間未満', value: `${prefix}_H2`, points: 7 },
    { label: '居宅内労働（自営の経営者）：月16日以上／1日4時間以上6時間未満', value: `${prefix}_H3`, points: 6 },
    { label: '居宅内労働（自営の経営者）：月12日以上／1日7時間以上', value: `${prefix}_I1`, points: 7 },
    { label: '居宅内労働（自営の経営者）：月12日以上／1日6時間以上7時間未満', value: `${prefix}_I2`, points: 6 },
    { label: '居宅内労働（自営の経営者）：月12日以上／1日4時間以上6時間未満', value: `${prefix}_I3`, points: 5 },
    // 2 就労 居宅内労働 自営(専従者)
    { label: '居宅内労働（自営の専従者）：月20日以上／1日7時間以上', value: `${prefix}_J1`, points: 7 },
    { label: '居宅内労働（自営の専従者）：月20日以上／1日6時間以上7時間未満', value: `${prefix}_J2`, points: 6 },
    { label: '居宅内労働（自営の専従者）：月20日以上／1日4時間以上6時間未満', value: `${prefix}_J3`, points: 5 },
    { label: '居宅内労働（自営の専従者）：月16日以上／1日7時間以上', value: `${prefix}_K1`, points: 6 },
    { label: '居宅内労働（自営の専従者）：月16日以上／1日6時間以上7時間未満', value: `${prefix}_K2`, points: 5 },
    { label: '居宅内労働（自営の専従者）：月16日以上／1日4時間以上6時間未満', value: `${prefix}_K3`, points: 4 },
    { label: '居宅内労働（自営の専従者）：月12日以上／1日7時間以上', value: `${prefix}_L1`, points: 5 },
    { label: '居宅内労働（自営の専従者）：月12日以上／1日6時間以上7時間未満', value: `${prefix}_L2`, points: 4 },
    { label: '居宅内労働（自営の専従者）：月12日以上／1日4時間以上6時間未満', value: `${prefix}_L3`, points: 3 },
    // 2 就労 居宅内労働 内職
    { label: '内職：月20日以上／1日7時間以上', value: `${prefix}_M1`, points: 6 },
    { label: '内職：月20日以上／1日4時間以上7時間未満', value: `${prefix}_M2`, points: 5 },
    { label: '内職：月16日以上／1日7時間以上', value: `${prefix}_N1`, points: 5 },
    { label: '内職：月16日以上／1日4時間以上7時間未満', value: `${prefix}_N2`, points: 4 },
    { label: '内職：月12日以上／1日7時間以上', value: `${prefix}_O1`, points: 4 },
    { label: '内職：月12日以上／1日4時間以上7時間未満', value: `${prefix}_O2`, points: 3 },
    // 3 求職活動（起業準備等を含む）
    { label: '求職活動：雇用保険を受給しており、求職活動を行っている場合', value: `${prefix}_seek_hoken`, points: 3 },
    { label: '求職活動：ハローワークに登録しており、求職活動を行っている場合', value: `${prefix}_seek_hw`, points: 2 },
    { label: '求職中（就労先未定）（上記以外）', value: `${prefix}_seek_other`, points: 1 },
    // 4 妊娠・出産／育児休業（母のみ。下でparent1から除外）
    { label: '妊娠・出産：出産前（出産予定月の前2か月）／出産後（出産月の後8週を迎える月の末日）', value: `${prefix}_birth`, points: 10 },
    { label: '育児休業：育児休業取得後、職場復帰予定の場合', value: `${prefix}_ikukyu`, points: 10 },
    // 5 就学
    { label: '就学：既に日中、就学・技能習得のため外出を常態', value: `${prefix}_school`, points: 10 },
    // 6 病気・障がい
    { label: '病気：1か月以上入院している場合（入院予定を含む）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '病気（自宅療養・一般療養A）：常に安静を要し、保育が常時困難である', value: `${prefix}_ill_a`, points: 10 },
    { label: '病気（自宅療養・一般療養B）：医師が週4日以上保育が困難と診断した場合', value: `${prefix}_ill_b`, points: 8 },
    { label: '病気（自宅療養・一般療養C）：医師が週2日以上保育が困難と診断した場合', value: `${prefix}_ill_c`, points: 6 },
    { label: '病気（自宅療養・精神性A）：常に安静を要し保育が常時困難、又は精神障害者保健福祉手帳1級所持者', value: `${prefix}_mental_a`, points: 10 },
    { label: '病気（自宅療養・精神性B）：医師が週4日以上保育が困難と診断、又は精神障害者保健福祉手帳2級所持者', value: `${prefix}_mental_b`, points: 8 },
    { label: '病気（自宅療養・精神性C）：医師が週2日以上保育が困難と診断、又は精神障害者保健福祉手帳3級所持者', value: `${prefix}_mental_c`, points: 6 },
    { label: '病気（自宅療養・精神性D）：上記以外の程度（自立支援医療（精神通院医療））', value: `${prefix}_mental_d`, points: 5 },
    { label: '障がい：身体障害者手帳1・2級、療育手帳A1・A2・B1', value: `${prefix}_dis_1`, points: 10 },
    { label: '障がい：身体障害者手帳3級、療育手帳B2', value: `${prefix}_dis_2`, points: 8 },
    { label: '障がい：身体障害者手帳4級以下', value: `${prefix}_dis_3`, points: 6 },
    // 7 看護介護
    { label: '看護介護：月20日以上日中週30時間以上の介護を常態／全介護を必要とする場合（臥床、要介護認定3〜5、障害者支援区分5〜6等）', value: `${prefix}_care_full`, points: 10 },
    { label: '看護介護：月16日以上日中週20時間以上の介護を常態／一部介護を必要とする場合（要介護認定1・2、障害者支援区分3〜4等）', value: `${prefix}_care_part`, points: 8 },
    { label: '看護介護：月12日以上日中週16時間以上の介護を常態／支援を必要とする場合（要支援1〜2、障害者支援区分1〜2等）', value: `${prefix}_care_shien`, points: 6 },
    // 8 災害復旧
    { label: '災害復旧：震災、風水害、火災その他の災害の復旧に当たっている場合', value: `${prefix}_disaster`, points: 10 },
    // 9 虐待・DV
    { label: '虐待・DV：児童虐待防止法第2条又は配偶者暴力防止法第1条の対象者と認められる場合', value: `${prefix}_dv`, points: 10 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ].filter((o) => parentNum === 2 || !(o.value.endsWith('_birth') || o.value.endsWith('_ikukyu')));

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労等形態（基準指数）`,
      helpText:
        parentNum === 2
          ? '最も当てはまるものを1つ選んでください。保育の必要な事由が2以上ある場合は、原則として指数の高い状況をとって決定されます。就労時間には通勤時間を含みますが、休憩時間は含みません。就労状況は契約上の勤務日数・時間だけでなく実績も含めて判定されます。'
          : '最も当てはまるものを1つ選んでください。保育の必要な事由が2以上ある場合は、原則として指数の高い状況をとって決定されます。就労時間には通勤時間を含みますが、休憩時間は含みません。妊娠・出産と育児休業は原典が「母親の出産・産後」「母親の育児休業」と規定しているため、保護者2（母）の選択肢にのみ設けています。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整指数1・家庭状況）',
    helpText: '死別・離別・未婚・行方不明・拘禁・その他が対象です。',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（+15点）', value: 'adj_hitorioya_yes', points: 15 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_fuzai',
    category: 'adjustment',
    label: '父母の一方が長期入院・単身赴任で不在ですか？（調整指数2・3）',
    helpText: 'いずれも同居親族がいない場合のみ適用されます。',
    inputType: 'select',
    options: [
      { label: '父母の一方が3か月以上入院・施設入所している（+1点）', value: 'adj_fuzai_nyuin', points: 1 },
      { label: '父母の一方が単身赴任している（+1点）', value: 'adj_fuzai_tanshin', points: 1 },
      { label: '該当なし', value: 'adj_fuzai_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯等ですか？（調整指数4）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯・中国残留邦人支援給付受給世帯（+5点）', value: 'adj_seikatsuhogo_yes', points: 5 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: 'DV支援措置対象者ですか？（調整指数5）',
    inputType: 'radio',
    options: [
      { label: 'DV支援措置対象者（+10点）', value: 'adj_dv_yes', points: 10 },
      { label: '該当なし', value: 'adj_dv_none', points: 0 },
    ],
  },
  {
    id: 'adj_gyakutai',
    category: 'adjustment',
    label: '虐待のおそれがありますか？（調整指数22）',
    inputType: 'radio',
    options: [
      { label: '虐待のおそれがある（+10点）', value: 'adj_gyakutai_yes', points: 10 },
      { label: '該当なし', value: 'adj_gyakutai_none', points: 0 },
    ],
  },
  {
    id: 'adj_sankyu_kyodai',
    category: 'adjustment',
    label: '産前産後・育児休業・きょうだいの状況は？（調整指数6・11・18）',
    helpText:
      '原典では「6番（産前・産後）と11番（育児休業）」「11番（育児休業）と18番（きょうだい）」がそれぞれ重複加算されないと定められています。併用できる組み合わせのみを選択肢にしています。18番は新年度選考時の卒業予定児童を除きます。',
    inputType: 'select',
    options: [
      { label: '保護者が産前・産後で、かつ既に兄弟姉妹が入所又は同時に2人以上申込（+2+3＝+5点）', value: 'adj_sankyu_kyodai_both', points: 5 },
      { label: '保護者が育児休業を取得している（+5点／産前産後・きょうだい加算とは重複しません）', value: 'adj_sankyu_kyodai_ikukyu', points: 5 },
      { label: '既に兄弟姉妹が保育所等に入所している又は同時に2人以上の申込をしている（+3点）', value: 'adj_sankyu_kyodai_kyodai', points: 3 },
      { label: '保護者が産前・産後である（+2点）', value: 'adj_sankyu_kyodai_sankyu', points: 2 },
      { label: '該当なし', value: 'adj_sankyu_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tashi',
    category: 'adjustment',
    label: '小学6年生以下の子どもが3人以上いますか？（調整指数7）',
    helpText: '各年度の4月1日現在で判定されます。',
    inputType: 'radio',
    options: [
      { label: '小学6年生以下の子どもが3人以上いる（+1点）', value: 'adj_tashi_yes', points: 1 },
      { label: '該当なし', value: 'adj_tashi_none', points: 0 },
    ],
  },
  {
    id: 'adj_shurou',
    category: 'adjustment',
    label: '就労状況にあてはまるものは？（調整指数8・9・10・12）',
    inputType: 'select',
    options: [
      { label: '離婚・死別後1年以内で、緊急に生計費を得るために就労の必要性が高い（+5点）', value: 'adj_shurou_rikon', points: 5 },
      { label: '保護者が病気療養等から職場復帰する（+5点）', value: 'adj_shurou_fukki', points: 5 },
      { label: '保護者が保育教諭、保育士として就労している又は就労予定である（+5点）', value: 'adj_shurou_hoikushi', points: 5 },
      { label: '生計中心者の解雇等により就労の必要性が高い（自己都合退職を除く／+4点）', value: 'adj_shurou_kaiko', points: 4 },
      { label: '該当なし', value: 'adj_shurou_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogai',
    category: 'adjustment',
    label: '保護者又は兄弟姉妹の障がいの状況は？（調整指数13〜15）',
    helpText: '原典により13〜15番は重複加算されません。',
    inputType: 'select',
    options: [
      { label: '身体障害者手帳1・2級、療育手帳A1・A2・B1、精神障害者保健福祉手帳1級のいずれか1つを所持（+4点）', value: 'adj_shogai_1', points: 4 },
      { label: '身体障害者手帳3級、療育手帳B2、精神障害者保健福祉手帳2級のいずれか1つを所持（+3点）', value: 'adj_shogai_2', points: 3 },
      { label: '身体障害者手帳4級以下、精神障害者保健福祉手帳3級のいずれか1つを所持（+2点）', value: 'adj_shogai_3', points: 2 },
      { label: '該当なし', value: 'adj_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_jido_techo',
    category: 'adjustment',
    label: '入所児童の手帳・手当の状況は？（調整指数16・17）',
    inputType: 'select',
    options: [
      { label: '入所児童が身体障害者手帳、療育手帳、精神障害者保健福祉手帳のいずれか1つを所持している（+3点）', value: 'adj_jido_techo_yes', points: 3 },
      { label: '入所児童が特別児童扶養手当を受給している（+1点）', value: 'adj_jido_techo_teate', points: 1 },
      { label: '該当なし', value: 'adj_jido_techo_none', points: 0 },
    ],
  },
  {
    id: 'adj_sotsuen',
    category: 'adjustment',
    label: '地域型保育を入所期間満了で卒園しますか？（調整指数19）',
    helpText:
      '家庭保育室を含みます。連携施設を自己の判断により選択しなかった場合は除きます。',
    inputType: 'radio',
    options: [
      { label: '地域型保育を入所期間満了で卒園する（+5点）', value: 'adj_sotsuen_yes', points: 5 },
      { label: '該当なし', value: 'adj_sotsuen_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikou',
    category: 'adjustment',
    label: '保育所等の移行を希望しますか？（調整指数20・21）',
    inputType: 'select',
    options: [
      { label: '兄弟が別施設のため同一施設に移行する（+2点）', value: 'adj_ikou_kyodai', points: 2 },
      { label: '住所変更等により通所が困難なため移行する（+1点）', value: 'adj_ikou_jusho', points: 1 },
      { label: '該当なし', value: 'adj_ikou_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '同居している65歳未満の祖父母の就労状況は？（調整指数23）',
    helpText:
      '疾病等で保育に当たることができない場合を除きます。同一世帯には、同一住所又は同一建物の場合を含みます。',
    inputType: 'radio',
    options: [
      { label: '同居している65歳未満の保護者の父母が無職、求職中又は月48時間以上の就労をしていない（-5点）', value: 'adj_sofubo_yes', points: -5 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_kinmusaki',
    category: 'adjustment',
    label: '勤務先・書類提出の状況は？（調整指数24・25）',
    inputType: 'select',
    options: [
      { label: '自営・農業・内職の場合に、勤務内容・実績の分かる書類を提出できない（-10点）', value: 'adj_kinmusaki_shorui', points: -10 },
      { label: '勤務先が父母の実家居宅内である（-3点）', value: 'adj_kinmusaki_jikka', points: -3 },
      { label: '該当なし', value: 'adj_kinmusaki_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '保育料等の滞納がありますか？（調整指数27）',
    helpText:
      '2か月以上の滞納は滞納月数×-3点の減算もありますが、月数により変動するため本シミュレーターでは計算していません。',
    inputType: 'radio',
    options: [
      { label: '滞納が高額となっている世帯で、納付の督促等に対して誠意ある対応が見られない（-10点）', value: 'adj_tainou_yes', points: -10 },
      { label: '該当なし', value: 'adj_tainou_none', points: 0 },
    ],
  },
  {
    id: 'adj_koiki',
    category: 'adjustment',
    label: '市外在住ですか？（調整指数28・29／広域入所）',
    helpText: '転入予定者を除きます。',
    inputType: 'select',
    options: [
      { label: '市外在住者で、勤務地が市内である（-10点）', value: 'adj_koiki_shinai', points: -10 },
      { label: '市外在住者で、勤務地が市外である（-20点）', value: 'adj_koiki_shigai', points: -20 },
      { label: '該当なし（いちき串木野市在住）', value: 'adj_koiki_none', points: 0 },
    ],
  },
];

export const ichikikushikinoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
