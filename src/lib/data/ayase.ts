import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.ayase.kanagawa.jp/material/files/group/24/20240929hoikuzyotouriyounogoannnai2.pdf
//       （綾瀬市「保育所等利用のご案内」P.18〜19「保育所等入所選考基準」）
// 綾瀬市 保育所等入所選考基準（①基本指数 ＋ ②保護者ごとの調整指数 ＋ ③世帯ごとの調整指数 ＋ ④児童ごとの調整指数）
// 計算方式: sum方式（選考方法に「父母の①基本指数の合計に②〜④の調整点数を加減算する」と明記）。
// 最高基本指数: 200（父母各100）
// 注:
//  - ひとり親世帯は選考方法の但し書きで「父又は母の基本指数に100点を加算する」と定められているため、
//    ③のひとり親家庭20点と合わせて +120点 として実装（内訳はhelpTextに明記）。
//  - ②「保護者ごとの調整指数（障害者10点）」は父母それぞれに加算されるため、保護者ごとの設問とした。
//  - 就学は「就労の項目に即した点数（20〜100）」のため、就労と同じ時間区分で採点する（helpTextで案内）。
//  - 基本指数の「その他（特に入所が必要であると福祉事務所長が認める場合）100」は
//    福祉事務所長の個別判断のため除外。
//  - 原典※「勤務時間」は出勤から退勤までの時間（休憩時間を含む）と通勤時間の合計を基本とする。

const municipality = {
  id: 'ayase',
  name: '綾瀬市',
  slug: 'ayase',
  prefecture: '神奈川県',
  maxBasePoints: 200,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労（就学も同じ区分で採点）
    { label: '就労・就学：就労時間が1か月に160時間以上', value: `${prefix}_work_160`, points: 100 },
    { label: '就労・就学：就労時間が1か月に140時間以上160時間未満', value: `${prefix}_work_140`, points: 90 },
    { label: '就労・就学：就労時間が1か月に130時間以上140時間未満', value: `${prefix}_work_130`, points: 80 },
    { label: '就労・就学：就労時間が1か月に120時間以上130時間未満', value: `${prefix}_work_120`, points: 70 },
    { label: '就労・就学：就労時間が1か月に110時間以上120時間未満', value: `${prefix}_work_110`, points: 60 },
    { label: '就労・就学：就労時間が1か月に100時間以上110時間未満', value: `${prefix}_work_100`, points: 50 },
    { label: '就労・就学：就労時間が1か月に90時間以上100時間未満', value: `${prefix}_work_90`, points: 40 },
    { label: '就労・就学：就労時間が1か月に80時間以上90時間未満', value: `${prefix}_work_80`, points: 30 },
    { label: '就労・就学：就労時間が1か月に64時間以上80時間未満', value: `${prefix}_work_64`, points: 20 },
    // 妊娠出産
    { label: '妊娠・出産：妊娠中であるか又は、出産後間がない', value: `${prefix}_birth`, points: 70 },
    // 疾病・障害
    { label: '疾病：入院（正常な分娩による入院を除く）', value: `${prefix}_ill_hosp`, points: 100 },
    { label: '疾病：居宅内療養　常時臥床', value: `${prefix}_ill_bed`, points: 90 },
    { label: '疾病：精神性・感染性疾病', value: `${prefix}_ill_mental`, points: 80 },
    { label: '疾病：居宅内療養（通院加療）保育が困難と認められるもの', value: `${prefix}_ill_visit`, points: 50 },
    { label: '障害：重度（1級2級）身体障害', value: `${prefix}_dis_severe`, points: 90 },
    { label: '障害：障害のため保育支障', value: `${prefix}_dis_other`, points: 80 },
    // 介護看護
    { label: '介護看護：同居する親族の常時介護・看護が必要', value: `${prefix}_care_always`, points: 80 },
    { label: '介護看護：同居する親族の介護・看護が必要', value: `${prefix}_care_other`, points: 50 },
    // 災害復旧
    { label: '災害復旧：生計中心者', value: `${prefix}_disaster_main`, points: 100 },
    { label: '災害復旧：生計協力者', value: `${prefix}_disaster_sub`, points: 80 },
    // 求職活動
    { label: '求職活動：生計中心者が求職中', value: `${prefix}_seek_main`, points: 80 },
    { label: '求職活動：上記の世帯以外で、求職中である場合', value: `${prefix}_seek_other`, points: 20 },
    // 虐待
    { label: '虐待・DV', value: `${prefix}_dv`, points: 100 },
    // 育休
    { label: '育休：育児休業中で当該児童が小規模保育事業等を利用しており、満3歳になることに伴い保育所等の利用を希望する場合', value: `${prefix}_ikuji`, points: 90 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育を必要とする事由（基本指数）`,
      helpText: '最も当てはまる状況を1つ選んでください。父母それぞれの基本指数を合計して世帯の基本指数とします（各最大100点）。「勤務時間」は出勤から退勤までの時間（休憩時間を含む）と通勤時間の合計が基本です。就学は就労の項目に即した点数（20〜100点）となるため、就労と同じ時間区分から選んでください。',
      inputType: 'select',
      options,
    },
    {
      id: `${prefix}_shogaisha`,
      category,
      label: `${parentLabel}は障害者手帳等をお持ちですか？（保護者ごとの調整指数）`,
      helpText: '保護者ごとの調整指数として、父母それぞれに加算されます',
      inputType: 'radio',
      options: [
        { label: '障害者（身体障害者手帳等）（+10点）', value: `${prefix}_shogaisha_yes`, points: 10 },
        { label: '該当なし', value: `${prefix}_shogaisha_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？（世帯ごとの調整指数）',
    helpText: 'ひとり親世帯は、世帯ごとの調整指数+20点に加えて、選考方法の定めにより父又は母の基本指数に100点が加算されるため、合計+120点として計算しています',
    inputType: 'radio',
    options: [
      { label: 'ひとり親家庭（+120点）', value: 'adj_hitorioya_yes', points: 120 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護家庭で就労又は求職活動の要件に該当しますか？（世帯ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '生活保護家庭で就労又は求職活動の要件に該当する（+20点）', value: 'adj_seikatsuhogo_yes', points: 20 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_gyakutai',
    category: 'adjustment',
    label: '虐待・DVに該当しますか？（世帯ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '虐待・DV（+20点）', value: 'adj_gyakutai_yes', points: 20 },
      { label: '該当なし', value: 'adj_gyakutai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者が失業していますか？（世帯ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '生計中心者の失業（+10点）', value: 'adj_shitsugyo_yes', points: 10 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukushoku',
    category: 'adjustment',
    label: '産後育休明けに復職しますか？（世帯ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '産後育休明けに復職する（+20点）', value: 'adj_fukushoku_yes', points: 20 },
      { label: '該当なし', value: 'adj_fukushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_taisho',
    category: 'adjustment',
    label: '育児休業に伴い保育所等を退所していますか？（世帯ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '育児休業に伴い保育所等を退所している（+40点）', value: 'adj_taisho_yes', points: 40 },
      { label: '該当なし', value: 'adj_taisho_none', points: 0 },
    ],
  },
  {
    id: 'adj_ryoshin_igai',
    category: 'adjustment',
    label: '両親以外の保護者に養育されていますか？（世帯ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '両親以外の保護者に養育されている（+40点）', value: 'adj_ryoshin_igai_yes', points: 40 },
      { label: '該当なし', value: 'adj_ryoshin_igai_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が市内の認可保育施設に勤務していますか？（世帯ごとの調整指数）',
    helpText: '在勤又は在勤予定かつ入所月から起算して1年以上勤務する場合。転園、1号認定で利用している認定こども園を2号認定に変更する場合を除き、保育士等就労における誓約書の提出があるものに限ります。',
    inputType: 'select',
    options: [
      { label: '保育士・保健師・看護師・准看護師として月120時間以上で在勤（+50点）', value: 'adj_hoikushi_120over', points: 50 },
      { label: '保育士・保健師・看護師・准看護師として月120時間未満で在勤（+40点）', value: 'adj_hoikushi_120under', points: 40 },
      { label: '栄養士及び調理員として在勤（+30点）', value: 'adj_hoikushi_eiyoshi', points: 30 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_dokyonin',
    category: 'adjustment',
    label: '就労等していない保育可能な同居人がいますか？（世帯ごとの調整指数）',
    helpText: '18歳以上（高校生は除く）65歳未満の同居人が対象です',
    inputType: 'radio',
    options: [
      { label: '就労等していない保育可能な同居人がいる（-50点）', value: 'adj_dokyonin_yes', points: -50 },
      { label: '該当なし', value: 'adj_dokyonin_none', points: 0 },
    ],
  },
  {
    id: 'adj_shigai',
    category: 'adjustment',
    label: '市外居住者ですか？（世帯ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '市外居住者（-50点）', value: 'adj_shigai_yes', points: -50 },
      { label: '該当なし（綾瀬市在住）', value: 'adj_shigai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou_gennendo',
    category: 'adjustment',
    label: '現年度の保育料滞納がありますか？（世帯ごとの調整指数）',
    helpText: '保育料の滞納に関する減点は、督促状の納期限経過後から減点となります',
    inputType: 'select',
    options: [
      { label: '現年度保育料滞納がある（6か月以上）（-100点）', value: 'adj_tainou_gennendo_6over', points: -100 },
      { label: '現年度保育料滞納がある（6か月未満）（-50点）', value: 'adj_tainou_gennendo_6under', points: -50 },
      { label: '該当なし', value: 'adj_tainou_gennendo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou_kanendo',
    category: 'adjustment',
    label: '過年度の保育料滞納がありますか？（世帯ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '過年度保育料滞納がある（-100点）', value: 'adj_tainou_kanendo_yes', points: -100 },
      { label: '該当なし', value: 'adj_tainou_kanendo_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_encho',
    category: 'adjustment',
    label: '希望する保育所等に入所できない場合、育児休業の延長も許容できますか？（世帯ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '育児休業の延長も許容できる（-200点）', value: 'adj_ikuji_encho_yes', points: -200 },
      { label: '該当なし', value: 'adj_ikuji_encho_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogaiji',
    category: 'adjustment',
    label: '入所を希望する児童に障害がありますか？（児童ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '障害児（療育手帳等）（+20点）', value: 'adj_shogaiji_yes', points: 20 },
      { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだいで入所を希望しますか？（児童ごとの調整指数）',
    helpText: '既にきょうだいが保育所に在所している場合の入所希望も含みます',
    inputType: 'radio',
    options: [
      { label: 'きょうだいで入所希望（+20点）', value: 'adj_kyodai_yes', points: 20 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_tenen',
    category: 'adjustment',
    label: 'きょうだいが在園する施設への転園申込ですか？（児童ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが在園する施設への転園申込児童（+20点）', value: 'adj_kyodai_tenen_yes', points: 20 },
      { label: '該当なし', value: 'adj_kyodai_tenen_none', points: 0 },
    ],
  },
  {
    id: 'adj_1to2',
    category: 'adjustment',
    label: '1号認定の認定こども園を2号認定での利用に変更希望ですか？（児童ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '1号認定で利用している認定こども園を、保護者の就労状況が変化した等の理由で2号認定での利用を希望する（+20点）', value: 'adj_1to2_yes', points: 20 },
      { label: '該当なし', value: 'adj_1to2_none', points: 0 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒園児ですか？（児童ごとの調整指数）',
    helpText: '最も当てはまるものを1つ選んでください',
    inputType: 'select',
    options: [
      { label: '連携施設が設定されていない地域型保育事業の卒園児（+40点）', value: 'adj_chiikigata_norenkei', points: 40 },
      { label: '地域型保育事業卒園児で、連携施設を希望したが入所することができず、やむを得ず連携施設以外の施設を希望した（+40点）', value: 'adj_chiikigata_yamuwoenu', points: 40 },
      { label: '地域型保育事業卒園児で、連携施設以外の施設を希望する（+20点）', value: 'adj_chiikigata_igai', points: 20 },
      { label: '該当なし', value: 'adj_chiikigata_none', points: 0 },
    ],
  },
  {
    id: 'adj_azuke',
    category: 'adjustment',
    label: '現在、有償で子どもを預けていますか？（児童ごとの調整指数）',
    helpText: '最も当てはまるものを1つ選んでください',
    inputType: 'select',
    options: [
      { label: '認可外保育施設等に有償（月極に限る）で預けている（+30点）', value: 'adj_azuke_ninkagai', points: 30 },
      { label: '上記以外に有償で預けている（一時預かり等）（+10点）', value: 'adj_azuke_ichiji', points: 10 },
      { label: '該当なし', value: 'adj_azuke_none', points: 0 },
    ],
  },
  {
    id: 'adj_tashi',
    category: 'adjustment',
    label: '他市の保育所等に在所しているが継続して通所できない状況ですか？（児童ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '他市の保育所等に在所しているが継続して通所できない（+40点）', value: 'adj_tashi_yes', points: 40 },
      { label: '該当なし', value: 'adj_tashi_none', points: 0 },
    ],
  },
  {
    id: 'adj_kengaku',
    category: 'adjustment',
    label: '希望する保育施設の見学は確認できていますか？（児童ごとの調整指数）',
    inputType: 'radio',
    options: [
      { label: '希望する保育施設の見学が確認できない（-50点）', value: 'adj_kengaku_no', points: -50 },
      { label: '該当なし（見学済み）', value: 'adj_kengaku_none', points: 0 },
    ],
  },
  {
    id: 'adj_tenen',
    category: 'adjustment',
    label: '転園希望ですか？（児童ごとの調整指数）',
    helpText: '他市の保育所等に在所しているが継続して通所できない場合、きょうだいが在園する施設への転園、転入を伴う転園は除きます',
    inputType: 'radio',
    options: [
      { label: '転園希望（-30点）', value: 'adj_tenen_yes', points: -30 },
      { label: '該当なし', value: 'adj_tenen_none', points: 0 },
    ],
  },
  {
    id: 'adj_jitai',
    category: 'adjustment',
    label: '入所を希望する年度内に内定を辞退したことがありますか？（児童ごとの調整指数）',
    helpText: '病気等やむを得ない場合を除きます',
    inputType: 'radio',
    options: [
      { label: '保育施設へ入所を希望する年度内に内定を辞退した（-50点）', value: 'adj_jitai_yes', points: -50 },
      { label: '該当なし', value: 'adj_jitai_none', points: 0 },
    ],
  },
];

export const ayaseData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
