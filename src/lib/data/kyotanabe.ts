import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.kyotanabe.lg.jp/kosodate/cmsfiles/contents/0000022/22864/criteria.pdf
//       （京田辺市「令和8年度（2026年度）京田辺市保育所等利用選考基準表」）
// 京田辺市（京都府）保育所等利用選考基準表（基本指数＋調整指数＋補正指数）
// 計算方式: sum方式（基本指数表の注記に「基本指数区分1〜8の内、（父）（母）それぞれが
//           1つの区分に該当します」とあり、父・母の指数欄の下に単一の「基本指数」欄がある）。
// 最高基準点: 80（父母各40＝就労区分1の月間160時間以上、疾病の1か月以上の入院、
//           障がいの身体1・2級等）
// 注:
//  - 「妊娠中・出産」は原典で父欄が空欄・母欄のみ5点のため母（保護者2）のみに設定。
//  - 基本指数の加点「市外への単身赴任にて就労中（予定）」は保護者ごとの加点のため別設問。
//  - 調整指数区分9（保育士等として就労中）は原典に「保護者単位で該当する項目の指数を
//    合算します」とあるため保護者ごとの設問として実装（就労時間区分と本市施設加点を併算）。
//  - 補正指数区分8・9も原典に「保護者単位で該当する項目の指数を合算します」とあるため
//    保護者ごとの設問として実装。
//  - 基本指数表の「その他（市長が特に保育が必要であると認める場合）＝別途、利用調整」、
//    補正指数区分10（育児休業の延長を許容できる場合＝全体の指数合計に0を乗じる）は、
//    いずれも固定点数が定められていないため実装対象外。
//  - 優先比較項目表は同点時の優先度判定であり点数化されないため実装対象外。

const municipality = {
  id: 'kyotanabe',
  name: '京田辺市',
  slug: 'kyotanabe',
  prefecture: '京都府',
  maxBasePoints: 80,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 区分1 就労（法人が営む事業に従事する者）
    { label: '就労（法人が営む事業に従事）：月間160時間以上', value: `${prefix}_work1_160`, points: 40 },
    { label: '就労（法人が営む事業に従事）：月間140時間以上', value: `${prefix}_work1_140`, points: 38 },
    { label: '就労（法人が営む事業に従事）：月間120時間以上', value: `${prefix}_work1_120`, points: 36 },
    { label: '就労（法人が営む事業に従事）：月間100時間以上', value: `${prefix}_work1_100`, points: 30 },
    { label: '就労（法人が営む事業に従事）：月間64時間以上', value: `${prefix}_work1_64`, points: 25 },
    // 区分2 上記区分1以外で就労（主に個人事業等に従事する者）
    { label: '就労（主に個人事業等に従事）：月間160時間以上', value: `${prefix}_work2_160`, points: 32 },
    { label: '就労（主に個人事業等に従事）：月間140時間以上', value: `${prefix}_work2_140`, points: 30 },
    { label: '就労（主に個人事業等に従事）：月間120時間以上', value: `${prefix}_work2_120`, points: 28 },
    { label: '就労（主に個人事業等に従事）：月間100時間以上', value: `${prefix}_work2_100`, points: 22 },
    { label: '就労（主に個人事業等に従事）：月間64時間以上', value: `${prefix}_work2_64`, points: 17 },
    // 区分4 疾病・障がい
    { label: '疾病：1か月以上の入院をしている又は1か月以上の入院が決定している', value: `${prefix}_ill_hosp`, points: 40 },
    { label: '疾病：1か月以上の通院加療を行い、自宅で安静を要する状態である', value: `${prefix}_ill_rest`, points: 25 },
    { label: '疾病：その他、医師が「保育できない」と診断する', value: `${prefix}_ill_other`, points: 15 },
    { label: '障がい：身体障害者手帳1・2級、精神障害者保健福祉手帳1級、療育手帳Aの認定がある', value: `${prefix}_dis_1`, points: 40 },
    { label: '障がい：身体障害者手帳3級、精神障害者保健福祉手帳2級、療育手帳Bの認定がある', value: `${prefix}_dis_2`, points: 36 },
    { label: '障がい：身体障害者手帳4〜6級、精神障害者保健福祉手帳3級の認定がある', value: `${prefix}_dis_3`, points: 25 },
    // 区分5 介護・看護
    { label: '介護・看護：同居の親族を自宅で常態的に介護・看護している', value: `${prefix}_care_home`, points: 14 },
    { label: '介護・看護：長期入院等をしている親族を常態的に介護・看護している', value: `${prefix}_care_hosp`, points: 12 },
    { label: '介護・看護：上記以外で親族の介護・看護を常態としている', value: `${prefix}_care_other`, points: 10 },
    // 区分6 震災・風水害等、災害復旧
    { label: '災害復旧：罹災証明等が全壊・全焼で市内に単世帯で避難し、復旧に従事', value: `${prefix}_disaster_full`, points: 18 },
    { label: '災害復旧：ボランティアとして月16日間以上の災害復旧作業に従事', value: `${prefix}_disaster_vol`, points: 15 },
    { label: '災害復旧：その他区分で親族居宅に避難し、復旧に従事', value: `${prefix}_disaster_other`, points: 10 },
    // 区分7 求職活動中
    { label: '求職活動中（採用予定）：月間160時間以上就労予定', value: `${prefix}_seek_160`, points: 20 },
    { label: '求職活動中（採用予定）：月間140時間以上就労予定', value: `${prefix}_seek_140`, points: 16 },
    { label: '求職活動中（採用予定）：月間120時間以上就労予定', value: `${prefix}_seek_120`, points: 12 },
    { label: '求職活動中（採用予定）：月間100時間以上就労予定', value: `${prefix}_seek_100`, points: 10 },
    { label: '求職活動中（採用予定）：月間64時間以上就労予定', value: `${prefix}_seek_64`, points: 8 },
    { label: '求職活動中：起業準備中である', value: `${prefix}_seek_kigyo`, points: 8 },
    { label: '求職活動中：それ以外', value: `${prefix}_seek_other`, points: 5 },
    // 区分8 就学
    { label: '就学：自宅外の就学先に通学している', value: `${prefix}_school_out`, points: 12 },
    { label: '就学：職業訓練校に入校している', value: `${prefix}_school_training`, points: 10 },
    { label: '就学：就学内定または職業訓練校に入校予定である', value: `${prefix}_school_naitei`, points: 8 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 区分3 妊娠中・出産は母（保護者2）のみ（原典で父欄は空欄）
  if (parentNum === 2) {
    options.splice(10, 0,
      { label: '妊娠中・出産（切迫流産等の入通院は疾病の扱い）', value: `${prefix}_birth`, points: 5 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育を必要とする状況（基本指数）`,
      helpText:
        '最も当てはまる状況を1つ選んでください。基本指数は区分1〜8のうち（父）（母）それぞれが1つの区分に該当し、複数の区分に該当する場合は希望する区分いずれかのみが適用されます。',
      inputType: 'select',
      options,
    },
    {
      id: `${prefix}_tanshin`,
      category,
      label: `${parentLabel}は市外への単身赴任にて就労中（予定）ですか？（基本指数の加点）`,
      helpText: '基本指数の区分1・区分2（就労）に該当する場合の加点です',
      inputType: 'radio',
      options: [
        { label: '市外への単身赴任にて就労中（予定）（+2点）', value: `${prefix}_tanshin_yes`, points: 2 },
        { label: '該当なし', value: `${prefix}_tanshin_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_hoikushi`,
      category,
      label: `${parentLabel}は保育士等・本市放課後児童支援員等として就労中ですか？（調整指数）`,
      helpText:
        '特定教育・保育施設、地域型保育事業、新制度未移行幼稚園、企業主導型保育事業又は本市の留守家庭児童会で保育に携わる者としての就労時間（採用予定を含む）。新規での入所申込みの調整時のみ加点されます',
      inputType: 'select',
      options: [
        { label: '就労時間が月160時間以上（+18点）', value: `${prefix}_hoikushi_160`, points: 18 },
        { label: '就労時間が月120時間以上（+10点）', value: `${prefix}_hoikushi_120`, points: 10 },
        { label: '就労時間が月120時間未満（+3点）', value: `${prefix}_hoikushi_u120`, points: 3 },
        { label: '該当なし', value: `${prefix}_hoikushi_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_hoikushi_shinai`,
      category,
      label: `${parentLabel}は本市の施設で保育に携わる者として就労していますか？（調整指数）`,
      helpText:
        '本市の特定教育・保育施設、地域型保育事業、新制度未移行幼稚園、企業主導型保育事業で保育に携わる者としての就労。上記の就労時間による加点と合算されます',
      inputType: 'radio',
      options: [
        { label: '本市の施設で保育に携わる者として就労している（+8点）', value: `${prefix}_hoikushi_shinai_yes`, points: 8 },
        { label: '該当なし', value: `${prefix}_hoikushi_shinai_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_jigyo_shorui`,
      category,
      label: `${parentLabel}は個人事業等の従事を証明する書類を提出できますか？（補正指数）`,
      helpText:
        '基本指数表の区分2に該当する事業に従事し、就労証明書に加えて事業の概要が確認できる書類および継続的に働いていることが確認できる書類の提出がある場合',
      inputType: 'radio',
      options: [
        { label: '事業の概要・継続的な就労が確認できる書類の提出がある（+8点）', value: `${prefix}_jigyo_shorui_yes`, points: 8 },
        { label: '該当なし', value: `${prefix}_jigyo_shorui_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_naishoku`,
      category,
      label: `${parentLabel}は内職に従事していますか？（補正指数）`,
      inputType: 'radio',
      options: [
        { label: '内職に従事している（-5点）', value: `${prefix}_naishoku_yes`, points: -5 },
        { label: '該当なし', value: `${prefix}_naishoku_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整指数）',
    inputType: 'select',
    options: [
      { label: '配偶者と離婚が成立しているかつ実態として同居しておらず、それを確認できる証明書類の提出がある（+42点）', value: 'adj_hitorioya_rikon', points: 42 },
      { label: '配偶者と離婚協議中でその配偶者分の証明書類が提出できない（+35点）', value: 'adj_hitorioya_kyogi', points: 35 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整指数）',
    helpText: '生活保護受給証明の提出があり、かつ生活保護担当課やハローワークの就労支援事業に参加している場合',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯で就労支援事業に参加している（+3点）', value: 'adj_seikatsuhogo_yes', points: 3 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者の失業により就労が必要ですか？（調整指数）',
    helpText: '生活保護世帯を除く',
    inputType: 'select',
    options: [
      { label: '雇用保険受給資格が特定受給資格者又は特定理由離職者と判定されている（+3点）', value: 'adj_shitsugyo_tokutei', points: 3 },
      { label: 'その他会社（事業所）都合での離職と確認できる第三者が発行する書類がある（+2点）', value: 'adj_shitsugyo_kaisha', points: 2 },
      { label: '上記以外の場合（+1点）', value: 'adj_shitsugyo_other', points: 1 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_gyakutai',
    category: 'adjustment',
    label: '虐待・DVのおそれがある世帯ですか？（調整指数）',
    inputType: 'select',
    options: [
      { label: '裁判所から保護命令、接近禁止命令等の発令が確認できる（+6点）', value: 'adj_gyakutai_meirei', points: 6 },
      { label: 'それ以外で本市家庭児童相談室、警察署、DVセンター等と相談中又は市外の担当と相談中であることが確認できる（+2点）', value: 'adj_gyakutai_sodan', points: 2 },
      { label: '該当なし', value: 'adj_gyakutai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogaiji',
    category: 'adjustment',
    label: '申請に係る子どもに障がいがありますか？（調整指数）',
    inputType: 'select',
    options: [
      { label: '身体障害者手帳1・2級、療育手帳A相当、精神障害者保健福祉手帳1・2級のいずれか又は複数の交付がある（+3点）', value: 'adj_shogaiji_1', points: 3 },
      { label: '各障害者手帳3級以下、療育手帳B相当の交付がある（+1点）', value: 'adj_shogaiji_3', points: 1 },
      { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだいの施設利用状況（調整指数）',
    helpText:
      '特定教育・保育施設、地域型保育事業、新制度未移行幼稚園又は企業主導型保育事業を利用もしくは申込みしている人数（申請に係る子どもを含む）',
    inputType: 'select',
    options: [
      { label: 'きょうだい3名以上が利用もしくは申込みしている（+3点）', value: 'adj_kyodai_3', points: 3 },
      { label: 'きょうだい2名が利用もしくは申込みしている（+2点）', value: 'adj_kyodai_2', points: 2 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tashi',
    category: 'adjustment',
    label: '多子世帯ですか？（調整指数）',
    helpText:
      '上記のきょうだいの施設利用に該当しない18歳未満のきょうだいが1名以上ある世帯。新規での入所申込みの調整時のみ加点されます',
    inputType: 'radio',
    options: [
      { label: '18歳未満のきょうだいが1名以上ある（+1点）', value: 'adj_tashi_yes', points: 1 },
      { label: '該当なし', value: 'adj_tashi_none', points: 0 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業等の卒園児ですか？（調整指数）',
    helpText:
      '令和7年11月1日時点で本市の地域型保育事業及び0〜2歳児までの保育所に在園し、令和8年3月31日に卒園する子どもが、引き続き市内認可保育施設の利用を希望する場合。令和8年4月1日入所分の利用調整にのみ適用されます',
    inputType: 'radio',
    options: [
      { label: '地域型保育事業等の卒園児で引き続き市内認可保育施設の利用を希望する（+15点）', value: 'adj_chiikigata_yes', points: 15 },
      { label: '該当なし', value: 'adj_chiikigata_none', points: 0 },
    ],
  },
  {
    id: 'adj_dokyo_mushoku',
    category: 'adjustment',
    label: '同居する無職の世帯員がいますか？（補正指数）',
    helpText: '同居する18歳以上65歳未満の就学中ではない世帯員が、無職かつ疾病、障がいがない状態である場合',
    inputType: 'radio',
    options: [
      { label: '同居する18歳以上65歳未満の無職の世帯員がいる（-1点）', value: 'adj_dokyo_mushoku_yes', points: -1 },
      { label: '該当なし', value: 'adj_dokyo_mushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_mishinsei_kyodai',
    category: 'adjustment',
    label: '申込みをしていない未就学のきょうだいがいますか？（補正指数）',
    helpText: '同居する未就学のきょうだいに申込みがなく、そのきょうだいがどこの施設にも在籍していない場合（生後57日に満たない場合や疾病・障がいを除く）',
    inputType: 'radio',
    options: [
      { label: '申込みがなくどこの施設にも在籍していない未就学のきょうだいがいる（-5点）', value: 'adj_mishinsei_kyodai_yes', points: -5 },
      { label: '該当なし', value: 'adj_mishinsei_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '保育料又は給食費の滞納がありますか？（補正指数）',
    helpText: '正当な理由なく、世帯で保育料又は給食費の滞納がある場合（申込日時点）',
    inputType: 'radio',
    options: [
      { label: '正当な理由なく保育料又は給食費の滞納がある（-35点）', value: 'adj_tainou_yes', points: -35 },
      { label: '該当なし', value: 'adj_tainou_none', points: 0 },
    ],
  },
  {
    id: 'adj_jitai',
    category: 'adjustment',
    label: '施設の利用内定を自己都合により辞退したことがありますか？（補正指数）',
    helpText: '令和8年度の申込みにおいて施設の利用内定を受けたが、自己都合により辞退したことがある場合',
    inputType: 'radio',
    options: [
      { label: '利用内定を自己都合により辞退したことがある（-35点）', value: 'adj_jitai_yes', points: -35 },
      { label: '該当なし', value: 'adj_jitai_none', points: 0 },
    ],
  },
  {
    id: 'adj_taisaku_riyo',
    category: 'adjustment',
    label: '他の教育・保育施設等を利用していますか？（補正指数）',
    helpText: '特定教育・保育施設、地域型保育事業、新制度未移行幼稚園又は企業主導型保育事業（企業枠含む）を利用している又は優先的に利用できる場合',
    inputType: 'radio',
    options: [
      { label: '他の教育・保育施設等を利用している又は優先的に利用できる（-5点）', value: 'adj_taisaku_riyo_yes', points: -5 },
      { label: '該当なし', value: 'adj_taisaku_riyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tensho',
    category: 'adjustment',
    label: '別々の施設に通うきょうだいの転所を希望しますか？（補正指数）',
    helpText: 'すでに市内認可保育施設（認定こども園の1号部分を含む）を別々に利用する2名以上のきょうだいがあり、いずれかが在園する保育施設へ転所を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'きょうだいのいずれかが在園する保育施設へ転所を希望する（+6点）', value: 'adj_tensho_yes', points: 6 },
      { label: '該当なし', value: 'adj_tensho_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_daiichi',
    category: 'adjustment',
    label: 'きょうだいが在園する施設を第一希望にしていますか？（補正指数）',
    helpText: 'きょうだいが在園する保育施設（認定こども園の1号部分を含む）を第一希望として新規に入所申込みをしている場合（同施設内での異動は除く）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが在園する施設を第一希望として新規に入所申込みをしている（+2点）', value: 'adj_kyodai_daiichi_yes', points: 2 },
      { label: '該当なし', value: 'adj_kyodai_daiichi_none', points: 0 },
    ],
  },
];

export const kyotanabeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
