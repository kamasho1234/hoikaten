import type { MunicipalityData, Question } from '../types';

// 出典: 豊見城市「令和8年度 保育所等利用申込ガイド」
// https://www.city.tomigusuku.lg.jp/material/files/group/22/r8_application_guide.pdf
//   P.14「06 利用調整について【1】利用調整方法について」
//   P.15「【2】利用調整基準について（1）基本指数」
//   P.16「（2）調整指数」
// 計算方式: sum方式（原典P.14に「合計指数 ＝ 基本指数(保護者1) ＋ 基本指数(保護者2) ＋ 調整指数」と明記）
// 最高基本指数: 200（父母各100＝社会的養護「児童虐待」「DV」）
// 注:
//  - 原典「※保護者1人につき、保育を必要とする事由が複数ある場合は、より高い基本指数を適用します」
//    のため、基本指数は単一selectで実装。
//  - 「妊娠・出産」は原典の基本指数表で父欄が斜線（母のみ）のため、保護者2（母）にのみ設定。
//  - 就労の「採用予定 -1」は原典で就労区分内の減算（※採用後に申し出があれば減算を解除）のため、
//    保護者ごとの独立した減算設問として実装。
//  - 調整指数は原典「※調整指数は申込児童ごとに適用します」により世帯単位で1回のみ加算。
//  - 除外: 調整指数5(3)「児童福祉法の観点から特に配慮が必要と市長が認める場合（1〜50）」は
//    範囲値かつ市長の個別判断のため実装対象外。

const municipality = {
  id: 'tomigusuku',
  name: '豊見城市',
  slug: 'tomigusuku',
  prefecture: '沖縄県',
  maxBasePoints: 200,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 1 就労
    { label: '就労：月160時間以上働いている', value: `${prefix}_work_160`, points: 20 },
    { label: '就労：月140時間以上160時間未満働いている', value: `${prefix}_work_140`, points: 18 },
    { label: '就労：月120時間以上140時間未満働いている', value: `${prefix}_work_120`, points: 16 },
    { label: '就労：月100時間以上120時間未満働いている', value: `${prefix}_work_100`, points: 14 },
    { label: '就労：月80時間以上100時間未満働いている', value: `${prefix}_work_80`, points: 12 },
    { label: '就労：月64時間以上80時間未満働いている', value: `${prefix}_work_64`, points: 10 },
    { label: '就労：月64時間未満（就学時間と併せて月64時間以上の場合にのみ適用）', value: `${prefix}_work_under64`, points: 10 },
    { label: '就労：自営業の中心者又は協力者で本人の仕事内容及び実績を証する書類の提出がない', value: `${prefix}_work_jiei_noproof`, points: 10 },
    // 2 妊娠・出産（母のみ。下でparent1から除外）
    { label: '妊娠・出産：出産予定日を含む月の2か月前の初日から生後3か月に達する月の末日まで', value: `${prefix}_birth`, points: 20 },
    // 3 保護者の疾病・障がい
    { label: '疾病：1か月以上の長期入院又は常時安静を要する（臥床状態等）', value: `${prefix}_ill_hosp`, points: 20 },
    { label: '疾病：おおむね6か月以上の長期的治療を要する（日常生活の制限あり）', value: `${prefix}_ill_6m_limited`, points: 18 },
    { label: '疾病：おおむね6か月以上の長期的治療を要する（日常生活の制限なし）', value: `${prefix}_ill_6m`, points: 16 },
    { label: '疾病：おおむね3〜6か月間の治療を要する（日常生活の制限あり）', value: `${prefix}_ill_3m_limited`, points: 14 },
    { label: '疾病：おおむね3〜6か月間の治療を要する（日常生活の制限なし）', value: `${prefix}_ill_3m`, points: 12 },
    { label: '疾病：軽症であるが、定期的通院を要する（日常生活の制限がない場合を除く）', value: `${prefix}_ill_light`, points: 10 },
    { label: '障がい：身体障害者手帳1・2級／精神障害者保健福祉手帳1級／療育手帳A1・A2', value: `${prefix}_dis_1`, points: 20 },
    { label: '障がい：身体障害者手帳3級／精神障害者保健福祉手帳2級／療育手帳B1', value: `${prefix}_dis_2`, points: 15 },
    { label: '障がい：上記以外の手帳', value: `${prefix}_dis_3`, points: 10 },
    // 4 親族の介護・看護
    { label: '介護・看護：1か月以上の長期入院期間中、家族による常時の介護・看護を要する', value: `${prefix}_care_hosp`, points: 18 },
    { label: '介護・看護：常時介護・看護を要する者の介護又は施設通所付添い等（身体1・2級、精神1級、療育A1・A2、要介護3〜5程度）', value: `${prefix}_care_always`, points: 16 },
    { label: '介護・看護：一部介護・看護を要する者の介護又は施設通所付添い等（身体3級、療育B1、要介護1・2程度）', value: `${prefix}_care_partial`, points: 12 },
    { label: '介護・看護：上記の他、介護・看護のため児童の保育に支障がある', value: `${prefix}_care_other`, points: 10 },
    // 5 災害復旧
    { label: '災害復旧：震災、風水害、火災その他の災害の復旧に当たっている', value: `${prefix}_disaster`, points: 20 },
    // 6 求職活動
    { label: '求職活動：求職活動をしている', value: `${prefix}_seek`, points: 9 },
    // 7 就学
    { label: '就学：大学、専門学校、職業訓練校等に月160時間以上就学している', value: `${prefix}_school_160`, points: 20 },
    { label: '就学：大学、専門学校、職業訓練校等に月140時間以上160時間未満就学している', value: `${prefix}_school_140`, points: 18 },
    { label: '就学：大学、専門学校、職業訓練校等に月120時間以上140時間未満就学している', value: `${prefix}_school_120`, points: 16 },
    { label: '就学：大学、専門学校、職業訓練校等に月100時間以上120時間未満就学している', value: `${prefix}_school_100`, points: 14 },
    { label: '就学：大学、専門学校、職業訓練校等に月80時間以上100時間未満就学している', value: `${prefix}_school_80`, points: 12 },
    { label: '就学：大学、専門学校、職業訓練校等に月64時間以上80時間未満就学している、又は上記学校が通信制', value: `${prefix}_school_64`, points: 10 },
    // 8 社会的養護
    { label: '社会的養護：児童虐待を行っている又は再び行われるおそれがあると認められる', value: `${prefix}_abuse`, points: 100 },
    { label: '社会的養護：配偶者からの暴力（DV）により小学校就学前子どもの保育を行うことが困難と認められる', value: `${prefix}_dv`, points: 100 },
    // 9 不存在
    { label: '不存在：死亡・離婚・未婚・行方不明 等', value: `${prefix}_absent`, points: 20 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ].filter((o) => parentNum === 2 || !o.value.endsWith('_birth'));

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育を必要とする事由`,
      helpText:
        parentNum === 2
          ? '最も当てはまるものを1つ選んでください。保育を必要とする事由が複数ある場合は、より高い基本指数が適用されます。就労時間には休憩時間60分までは含みますが、通勤時間は含みません。'
          : '最も当てはまるものを1つ選んでください。保育を必要とする事由が複数ある場合は、より高い基本指数が適用されます。就労時間には休憩時間60分までは含みますが、通勤時間は含みません。妊娠・出産は原典の基準表で母のみに設定されています。',
      inputType: 'select',
      options,
    },
    {
      id: `${prefix}_naitei`,
      category,
      label: `${parentLabel}は採用予定（これから働き始める）ですか？`,
      helpText:
        '原典の基本指数表で「採用予定」は-1点の減算です。採用後に保護者より申し出があれば、職場確認の上で減算（-1）は解除されます。',
      inputType: 'radio',
      options: [
        { label: '採用予定である（-1点）', value: `${prefix}_naitei_yes`, points: -1 },
        { label: '該当なし', value: `${prefix}_naitei_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hoiku_jokyo',
    category: 'adjustment',
    label: '現在の申込児童の保育状況は？（調整指数1 保育状況）',
    helpText:
      '申込締切日現在の状況を1つ選んでください。認可外保育施設等は在園が確認できる資料の提出があった場合に適用され、育児休業・求職・就労（採用予定）は除きます。',
    inputType: 'select',
    options: [
      { label: '地域型保育施設の卒園児で、引き続き他の特定教育・保育施設を利用希望（連携施設以外を希望する場合のみ／+4点）', value: 'adj_hoiku_jokyo_itaku_chiiki', points: 4 },
      { label: '認可外保育施設 等（+3点）', value: 'adj_hoiku_jokyo_ninkagai', points: 3 },
      { label: '保護者が自宅外（勤務先 等）で保育している（就労証明書の備考欄に記載／+2点）', value: 'adj_hoiku_jokyo_parent_out', points: 2 },
      { label: '保護者以外の親族以外のものが保育している（+1点）', value: 'adj_hoiku_jokyo_other_nonrelative', points: 1 },
      { label: '保護者が自宅で保育している（0点）', value: 'adj_hoiku_jokyo_parent_home', points: 0 },
      { label: '祖父母等の親族が保育している（0点）', value: 'adj_hoiku_jokyo_relative', points: 0 },
      { label: '該当なし', value: 'adj_hoiku_jokyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整指数2 世帯状況）',
    helpText:
      'ひとり親世帯・ひとり親に準ずる世帯のうち、65歳未満の同居人（祖父母等の親族／19歳以上が対象）がいる場合は-3点されます。離婚協議中の場合は「ひとり親に準ずる世帯」の適用外です。',
    inputType: 'select',
    options: [
      { label: 'ひとり親世帯（+12点）', value: 'adj_hitorioya_yes', points: 12 },
      { label: 'ひとり親世帯で、65歳未満の同居人（祖父母等の親族）がいる（+12-3＝+9点）', value: 'adj_hitorioya_yes_dokyo', points: 9 },
      { label: 'ひとり親に準ずる世帯（離婚調停中 等／+10点）', value: 'adj_hitorioya_junzuru', points: 10 },
      { label: 'ひとり親に準ずる世帯で、65歳未満の同居人（祖父母等の親族）がいる（+10-3＝+7点）', value: 'adj_hitorioya_junzuru_dokyo', points: 7 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整指数2 世帯状況）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+7点）', value: 'adj_seikatsuhogo_yes', points: 7 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任世帯ですか？（調整指数2 世帯状況）',
    helpText: '本島外への単身赴任に限ります。単身赴任している者の住民票が必要です。',
    inputType: 'radio',
    options: [
      { label: '単身赴任世帯（本島外／+1点）', value: 'adj_tanshin_yes', points: 1 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_zaitaku_shogai',
    category: 'adjustment',
    label: '看護する在宅障がい者（児）のいる世帯ですか？（調整指数2 世帯状況）',
    helpText: '申込児童および保護者を除きます。',
    inputType: 'radio',
    options: [
      { label: '看護する在宅障がい者（児）がいる（+2点）', value: 'adj_zaitaku_shogai_yes', points: 2 },
      { label: '該当なし', value: 'adj_zaitaku_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_doji_moshikomi',
    category: 'adjustment',
    label: '複数の児童を同時に新規で申し込みますか？（調整指数2 世帯状況）',
    helpText: '先に入所した児童がいる場合、翌月の利用調整より当該児童はカウントしません。',
    inputType: 'select',
    options: [
      { label: '3人以上を同時に新規申込（+6点）', value: 'adj_doji_moshikomi_3', points: 6 },
      { label: '2人を同時に新規申込（+3点）', value: 'adj_doji_moshikomi_2', points: 3 },
      { label: '該当なし', value: 'adj_doji_moshikomi_none', points: 0 },
    ],
  },
  {
    id: 'adj_dokyonin',
    category: 'adjustment',
    label: '保育を行うことができる同居人（19歳以上65歳未満）がいる世帯ですか？（調整指数2 世帯状況）',
    inputType: 'radio',
    options: [
      { label: '保育を行うことができる同居人（19歳以上65歳未満）がいる（-3点）', value: 'adj_dokyonin_yes', points: -3 },
      { label: '該当なし', value: 'adj_dokyonin_none', points: 0 },
    ],
  },
  {
    id: 'adj_minou',
    category: 'adjustment',
    label: '保育料等の未納がありますか？（調整指数2 世帯状況）',
    helpText:
      '納付相談がない、又は分納計画を履行しない場合に適用されます。今年度分の未納に関しては、3か月以上未納の場合です。',
    inputType: 'radio',
    options: [
      { label: '保育料等の未納があり、納付相談がない又は分納計画を履行していない（-15点）', value: 'adj_minou_yes', points: -15 },
      { label: '該当なし', value: 'adj_minou_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士・保育教諭・幼稚園教諭として就労していますか？（調整指数3 保護者状況）',
    helpText:
      '「誓約書」の提出が必要です。入所後に採用予定または復職する保護者が対象で、転園の場合は適用されません。',
    inputType: 'select',
    options: [
      { label: '特定教育・保育施設及び特定地域型保育事業所の市内施設で就労している（+15点）', value: 'adj_hoikushi_shinai', points: 15 },
      { label: '特定教育・保育施設及び特定地域型保育事業所の市外施設で就労している（+8点）', value: 'adj_hoikushi_shigai', points: 8 },
      { label: '上記以外の市内の認可外保育施設で就労している（+5点）', value: 'adj_hoikushi_ninkagai', points: 5 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_hogosha_shogai',
    category: 'adjustment',
    label: '保護者に障がい者がいますか？（調整指数3 保護者状況）',
    inputType: 'select',
    options: [
      { label: '身体障害者手帳1・2級、精神障害者保健福祉手帳1級、療育手帳A1・A2の該当者（+4点）', value: 'adj_hogosha_shogai_1', points: 4 },
      { label: '身体障害者手帳3級、精神障害者保健福祉手帳2級、療育手帳B1の該当者（+2点）', value: 'adj_hogosha_shogai_2', points: 2 },
      { label: '上記以外の手帳該当者（+1点）', value: 'adj_hogosha_shogai_3', points: 1 },
      { label: '該当なし', value: 'adj_hogosha_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukushoku',
    category: 'adjustment',
    label: '育児休業（休暇）から復職しますか？（調整指数3 保護者状況）',
    helpText:
      '就労証明書の「育児休業の取得期間」で確認します。ここでいう育児休業（休暇）とは、雇用元の変更や事業の廃止をせず、利用調整時と同等以上の労働条件で復帰する場合に限ります。',
    inputType: 'select',
    options: [
      { label: '2歳児クラスへの入所申込み（+3点）', value: 'adj_fukushoku_2sai', points: 3 },
      { label: '1歳児クラスへの入所申込み（+2点）', value: 'adj_fukushoku_1sai', points: 2 },
      { label: '該当なし', value: 'adj_fukushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikukyu_encho',
    category: 'adjustment',
    label: '育児休暇の延長が許容できますか？（調整指数3 保護者状況）',
    helpText:
      '入所申込書「（5）育休延長可否」で確認します。「希望する園に入園出来ない場合は、育休延長も許容できる」にチェックを入れても、保育園等に空きがある場合は内定となります。',
    inputType: 'radio',
    options: [
      { label: '育児休暇の延長が許容できる（-150点）', value: 'adj_ikukyu_encho_yes', points: -150 },
      { label: '該当なし', value: 'adj_ikukyu_encho_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogaiji',
    category: 'adjustment',
    label: '申込児童が障がい児ですか？（調整指数4 児童状況）',
    helpText: '発達支援保育審査会にて障がい児として保育可能と認められた場合を含みます。',
    inputType: 'radio',
    options: [
      { label: '対象となる児童が障がい児又は発達支援保育審査会にて障がい児として保育可能と認められた（+13点）', value: 'adj_shogaiji_yes', points: 13 },
      { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだい児が既に入所している施設を希望しますか？（調整指数4 児童状況）',
    helpText:
      '第一希望としている場合のみ適用し、入所希望月にきょうだい児が在園（内定）していることが条件です。',
    inputType: 'radio',
    options: [
      { label: 'きょうだい児が既に入所している施設を第一希望としている（+11点）', value: 'adj_kyodai_yes', points: 11 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_jitai',
    category: 'adjustment',
    label: '入所内定（決定）を辞退したことがありますか？（調整指数5 その他状況）',
    helpText: '辞退後は当該年度末まで適用されます。',
    inputType: 'radio',
    options: [
      { label: '入所内定（決定）を辞退した（-3点）', value: 'adj_jitai_yes', points: -3 },
      { label: '該当なし', value: 'adj_jitai_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyogi',
    category: 'adjustment',
    label: '申請書類等に虚偽がありましたか？（調整指数5 その他状況）',
    inputType: 'radio',
    options: [
      { label: '申請書類等に虚偽があった（-20点）', value: 'adj_kyogi_yes', points: -20 },
      { label: '該当なし', value: 'adj_kyogi_none', points: 0 },
    ],
  },
];

export const tomigusukuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
