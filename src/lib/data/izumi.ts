import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 和泉市 保育所等入所判定指数表
//
// 出典: 和泉市「保育所等入所判定指数表」
//       https://www.city.osaka-izumi.lg.jp/material/files/group/36/R8sisuuhyou.pdf
//       （令和8年度保育園・認定こども園等（2号・3号認定）の入園受付
//         https://www.city.osaka-izumi.lg.jp/kakukano/kosodatekenkobu/kodomomirai/gyoumu/hoikuyou/nyuuennkankei/18974.html
//         からリンクされている単独PDF）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式指数表を読み取って全面的に置き換えた。
// 2026-08-19 の一斉置き換えでは市サイトに接続できず failed にしていたが、今回は取得できた。
//
// ## 計算方式（原典「留意事項」）
// 「父母それぞれの基本項目採点基準の合算に調整項目採点指数を加減した点数を、
//   利用申込児童の点数とする。父母がいない場合は児童の養育者を保育者とする。」
// 基本項目は父母各最大110点なので maxBasePoints は 220。
//
// ## （1）基本項目採点基準表
// ※就労時間については、休憩時間等を含む労働時間が64時間を超える場合は、契約上の拘束時間を
//   勤務時間とする。また、複数箇所で就労している場合は、全ての勤務時間を合算する。
//   ただし、外勤と自営業等、副業がある場合、保育者の状況は勤務時間数が多い方を適用し、
//   区分は勤務時間を合算して判定する。
// 家庭外就労
//   外勤／自営業事業主 … 月160時間以上 110／140時間以上 100／120時間以上 90／
//     96時間以上 80／64時間以上 70
//   自営業協力者 … 月160時間以上 90／140時間以上 80／120時間以上 70／96時間以上 60／
//     64時間以上 50
// 家庭内就労
//   自営業事業主または会社員等 … 月160時間以上 100／140時間以上 90／120時間以上 80／
//     96時間以上 70／64時間以上 60
//   自営業協力者 … 月160時間以上 80／140時間以上 70／120時間以上 60／96時間以上 50／
//     64時間以上 40
//   内職 … 月120時間以上 60／64時間以上 40
// 妊娠・出産 … 出産又は出産予定月の前後2ヶ月の間にあって、出産の準備又は休養を要する 40
// 疾病（注1）… 入院（1ヶ月以上）・常時臥床 110／安静を要す（注2）80／上記以外の理由 50
// 障がい … 身体障がい者手帳1〜2級、精神障がい者保健福祉手帳1〜2級、療育手帳Aの交付を
//   受けている 110／身体障がい者手帳3級、精神障がい者保健福祉手帳3級、療育手帳B1の
//   交付を受けている 80／上記以外の交付を受けている 50
// 同居親族の介護・看護 … 入院（1ヶ月以上）または要介護認定3〜5程度、身体障がい者手帳1〜2級、
//   精神障がい者保健福祉手帳1〜2級、療育手帳Aの交付を受けている者を介護または看護している 80／
//   要介護認定1〜2程度、身体障がい者手帳3級、精神障がい者保健福祉手帳3級、療育手帳B1の
//   交付を受けている者を介護または看護している 60／上記以外の理由で介護または看護している 50
// 災害復旧 … 震災・風水害・火災・その他の災害の復旧にあたっている 110
// 就労先内定 … 月160時間以上の勤務予定（就労証明書等の書類あり）（内職を除く）70／
//   月120時間以上 50／月64時間以上 30
// 求職中 … 求職活動を継続的に行っている 20
// 就学（注3）… 主に通学している 月120時間以上 80／月64時間以上 60／
//   主に通信制である 月120時間以上 60／月64時間以上 40／
//   就学予定（合格通知書等の提出あり）30
// 育休中の入所または転園申請（3歳児クラス以上に限る）… 3歳児クラス以上の児童で、
//   育休取得中（復帰月よりも早い時期）の入所または転園申請をしている場合 30
//   （年度内復帰を条件とし、市に提出した証明書に記載されている復帰予定月の入所調整からは、
//     就労時間に応じた指数とする。2歳児クラス以下については育休取得中の継続利用を
//     「児童の成長発達のため、環境の変化が好ましくない」という理由で認めているため、転園申請は不可）
// その他 … 虐待やDVのおそれがあるなど、児童福祉の観点から保育の必要性の緊急度が高いと
//   市が認める場合（各種証明書、意見書等必要）（注4）
//
// ## （2）調整項目採点指数
// 世帯の状況 … ひとり親家庭 140／生活保護世帯の就労支援（注5）40／
//   生計中心者の失業（注6）40／障がい者のいる世帯（注7）10／
//   両親が障がい者（前項目と重複して加点しない。）（注7）20
// 兄弟姉妹の状況 … 当該保育所等に兄弟姉妹が入所中 10／
//   兄弟姉妹が利用申込中（前項目と重複して加点しない。）5／
//   前項目の場合で、申込児童が多胎児（前二項目と重複して加点しない。）10／
//   多子家庭（就学前児童3人、18歳未満の児童5人以上）10
// 就労状況 … 産後休暇・育児休業明け（復帰月以前から申込をしており、入所前に復帰した場合も
//   加点継続する。）（注8）10／育児休業のため認可保育所等を退所し、育児休業明けに
//   再入所を希望する児童（注8）20／育児休業の延長を許容（注9）マイナス900
// 保育の代替手段 … 認可外保育施設に入所中（注10）10
// その他 … 入所希望月から12ヶ月以上待機中（注11）10／
//   転園希望者（兄弟姉妹が入所中の園を希望する場合又は児童本人が和泉市外の認可保育施設に
//   入所中の場合を除く。）マイナス1／
//   在籍施設における1号認定から2号認定への認定変更希望者（求職中を除く）300
// 優先項目 … 和泉市内の認可保育施設に就労または就労予定である一定の条件を満たす保育士（注12）500／
//   保育施設の統廃合や地域開発等の市の施策に伴う転園（注13）700
//
// ## （3）同一点数時の優先項目順位表
// 1 当該保育所等の希望順位が高い世帯／2 同一世帯の児童が当該保育所等に入所中の世帯（1号含む）／
// 3 養育している就学前児童の人数が多い世帯／4 待機期間が長い世帯／
// 5 養育している小学生以下の児童の人数が多い世帯／6 市民税課税額の低い世帯
//
// ## 質問に入れなかった規定
// - 基本項目の「その他」（虐待やDVのおそれがあるなど）は注4「市長が特に必要と認める場合には、
//   関係機関と協議の上、優先度を決定するものとする」で点数が定まらないため
// - 優先項目の「保育施設の統廃合や地域開発等の市の施策に伴う転園」（700点）は
//   注13により令和3年9月1日時点で和泉保育園に入所中の児童など、対象が極めて限定されるため
// - （3）同一点数時の優先項目順位表は同点時のタイブレークであり指数ではないため
// ---------------------------------------------------------------------------

const municipality = {
  id: 'izumi',
  name: '和泉市',
  slug: 'izumi',
  prefecture: '大阪府',
  maxBasePoints: 220, // 父母各110点
} as const;

// ---------------------------------------------------------------------------
// （1）基本項目採点基準表の選択肢（父母各最大110点）
// ---------------------------------------------------------------------------

/** 家庭外就労・家庭内就労・内職 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  {
    label: '家庭外就労（外勤・自営業事業主）：月160時間以上',
    value: `${prefix}_employment_out_main_110`,
    points: 110,
  },
  {
    label: '家庭外就労（外勤・自営業事業主）：月140時間以上',
    value: `${prefix}_employment_out_main_100`,
    points: 100,
  },
  {
    label: '家庭外就労（外勤・自営業事業主）：月120時間以上',
    value: `${prefix}_employment_out_main_90`,
    points: 90,
  },
  {
    label: '家庭外就労（外勤・自営業事業主）：月96時間以上',
    value: `${prefix}_employment_out_main_80`,
    points: 80,
  },
  {
    label: '家庭外就労（外勤・自営業事業主）：月64時間以上',
    value: `${prefix}_employment_out_main_70`,
    points: 70,
  },
  {
    label: '家庭外就労（自営業協力者）：月160時間以上',
    value: `${prefix}_employment_out_help_90`,
    points: 90,
  },
  {
    label: '家庭外就労（自営業協力者）：月140時間以上',
    value: `${prefix}_employment_out_help_80`,
    points: 80,
  },
  {
    label: '家庭外就労（自営業協力者）：月120時間以上',
    value: `${prefix}_employment_out_help_70`,
    points: 70,
  },
  {
    label: '家庭外就労（自営業協力者）：月96時間以上',
    value: `${prefix}_employment_out_help_60`,
    points: 60,
  },
  {
    label: '家庭外就労（自営業協力者）：月64時間以上',
    value: `${prefix}_employment_out_help_50`,
    points: 50,
  },
  {
    label: '家庭内就労（自営業事業主・会社員等）：月160時間以上',
    value: `${prefix}_employment_in_main_100`,
    points: 100,
  },
  {
    label: '家庭内就労（自営業事業主・会社員等）：月140時間以上',
    value: `${prefix}_employment_in_main_90`,
    points: 90,
  },
  {
    label: '家庭内就労（自営業事業主・会社員等）：月120時間以上',
    value: `${prefix}_employment_in_main_80`,
    points: 80,
  },
  {
    label: '家庭内就労（自営業事業主・会社員等）：月96時間以上',
    value: `${prefix}_employment_in_main_70`,
    points: 70,
  },
  {
    label: '家庭内就労（自営業事業主・会社員等）：月64時間以上',
    value: `${prefix}_employment_in_main_60`,
    points: 60,
  },
  {
    label: '家庭内就労（自営業協力者）：月160時間以上',
    value: `${prefix}_employment_in_help_80`,
    points: 80,
  },
  {
    label: '家庭内就労（自営業協力者）：月140時間以上',
    value: `${prefix}_employment_in_help_70`,
    points: 70,
  },
  {
    label: '家庭内就労（自営業協力者）：月120時間以上',
    value: `${prefix}_employment_in_help_60`,
    points: 60,
  },
  {
    label: '家庭内就労（自営業協力者）：月96時間以上',
    value: `${prefix}_employment_in_help_50`,
    points: 50,
  },
  {
    label: '家庭内就労（自営業協力者）：月64時間以上',
    value: `${prefix}_employment_in_help_40`,
    points: 40,
  },
  { label: '内職：月120時間以上', value: `${prefix}_employment_naishoku_60`, points: 60 },
  { label: '内職：月64時間以上', value: `${prefix}_employment_naishoku_40`, points: 40 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産または出産予定月の前後2ヶ月の間にあって、出産の準備または休養を要する',
    value: `${prefix}_childbirth_40`,
    points: 40,
  },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1ヶ月以上）・常時臥床', value: `${prefix}_illness_110`, points: 110 },
  { label: '安静を要す', value: `${prefix}_illness_80`, points: 80 },
  { label: '上記以外の理由', value: `${prefix}_illness_50`, points: 50 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障がい者手帳1〜2級、精神障がい者保健福祉手帳1〜2級、療育手帳Aの交付を受けている',
    value: `${prefix}_disability_110`,
    points: 110,
  },
  {
    label: '身体障がい者手帳3級、精神障がい者保健福祉手帳3級、療育手帳B1の交付を受けている',
    value: `${prefix}_disability_80`,
    points: 80,
  },
  { label: '上記以外の交付を受けている', value: `${prefix}_disability_50`, points: 50 },
];

/** 同居親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label:
      '入院（1ヶ月以上）、要介護認定3〜5程度、身体障がい者手帳1〜2級、精神障がい者保健福祉手帳1〜2級、療育手帳Aの人を介護・看護している',
    value: `${prefix}_care_80`,
    points: 80,
  },
  {
    label:
      '要介護認定1〜2程度、身体障がい者手帳3級、精神障がい者保健福祉手帳3級、療育手帳B1の人を介護・看護している',
    value: `${prefix}_care_60`,
    points: 60,
  },
  { label: '上記以外の理由で介護または看護している', value: `${prefix}_care_50`, points: 50 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災・風水害・火災・その他の災害の復旧にあたっている',
    value: `${prefix}_disaster_110`,
    points: 110,
  },
];

/** 就労先内定 */
const jobOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_joboffer_none`, points: 0 },
  {
    label: '月160時間以上の勤務予定（就労証明書等の書類あり・内職を除く）',
    value: `${prefix}_joboffer_70`,
    points: 70,
  },
  {
    label: '月120時間以上の勤務予定（就労証明書等の書類あり）',
    value: `${prefix}_joboffer_50`,
    points: 50,
  },
  {
    label: '月64時間以上の勤務予定（就労証明書等の書類あり）',
    value: `${prefix}_joboffer_30`,
    points: 30,
  },
];

/** 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動を継続的に行っている', value: `${prefix}_jobseeking_20`, points: 20 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '主に通学している：月120時間以上の就学', value: `${prefix}_education_tsugaku_80`, points: 80 },
  { label: '主に通学している：月64時間以上の就学', value: `${prefix}_education_tsugaku_60`, points: 60 },
  { label: '主に通信制である：月120時間以上の就学', value: `${prefix}_education_tsushin_60`, points: 60 },
  { label: '主に通信制である：月64時間以上の就学', value: `${prefix}_education_tsushin_40`, points: 40 },
  { label: '就学予定（合格通知書等の提出あり）', value: `${prefix}_education_yotei_30`, points: 30 },
];

/** 育休中の入所または転園申請（3歳児クラス以上に限る） */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  {
    label: '3歳児クラス以上の児童で、育休取得中（復帰月よりも早い時期）の入所または転園申請をしている',
    value: `${prefix}_parental_leave_30`,
    points: 30,
  },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育者の状況`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '就労している', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就労先内定', value: `${prefix}_reason_joboffer`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '育休中の入所または転園申請', value: `${prefix}_reason_parental_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText:
        '休憩時間等を含む労働時間が64時間を超える場合は、契約上の拘束時間が勤務時間になります。複数箇所で就労している場合は全ての勤務時間を合算します',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は出産の前後ですか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      helpText: '医師が作成した書類に家庭保育が困難である旨が記載されている場合に適用されます',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の手帳の等級は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}が介護・看護している同居親族の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_joboffer`,
      category,
      label: `${parentLabel}の就労先内定の状況は？`,
      inputType: 'radio',
      options: jobOfferOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText:
        '子ども子育て支援法施行規則第1条の5第7項に規定される学校や教育施設に在学している場合、または公共職業能力開発施設等で職業訓練を受けている場合に適用されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育休中の入所・転園申請ですか？`,
      helpText:
        '3歳児クラス以上に限ります。年度内復帰が条件で、証明書に記載された復帰予定月の入所調整からは就労時間に応じた指数になります',
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// （2）調整項目採点指数（世帯単位）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 140 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯の就労支援に該当しますか？',
    helpText:
      '生活保護世帯であるが、就労することにより2〜3ヶ月以内に自立すると思われる旨の書類が、生活保護を所管する部署から提出された場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 40 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者が失業していますか？',
    helpText:
      '生計中心者とは家計の主宰者のことで概ね世帯主をいい、税の情報、健康保険の加入状況等により事実が確認できた場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい', value: 'adj_unemployed_yes', points: 40 },
    ],
  },
  {
    id: 'adj_disability_household',
    category: 'adjustment',
    label: '世帯に障がい者がいますか？',
    helpText:
      '複数の障がい者が同世帯にいた場合でも一世帯あたり10点までです。両親が障がい者の場合は20点となり、10点の加点は付きません。ひとり親家庭で保護者が障がい者の場合は20点です',
    inputType: 'select',
    options: [
      { label: 'いいえ', value: 'adj_disability_household_no', points: 0 },
      { label: '障がい者のいる世帯', value: 'adj_disability_household_10', points: 10 },
      {
        label: '両親が障がい者（ひとり親家庭で保護者が障がい者の場合を含む）',
        value: 'adj_disability_household_20',
        points: 20,
      },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    helpText: '上の項目と重複して加点されません',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: '当該保育所等に兄弟姉妹が入所中', value: 'adj_sibling_enrolled', points: 10 },
      { label: '兄弟姉妹が利用申込中', value: 'adj_sibling_applying', points: 5 },
      {
        label: '兄弟姉妹が利用申込中で、申込児童が多胎児',
        value: 'adj_sibling_multiple',
        points: 10,
      },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子家庭ですか？',
    helpText: '就学前児童3人、または18歳未満の児童5人以上の世帯が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 10 },
    ],
  },
  {
    id: 'adj_leave',
    category: 'adjustment',
    label: '産後休暇・育児休業に関する状況は？',
    helpText:
      '就労証明書には復帰日の記載が必要で、入所月の月末までに育児休業を取得した就労先へ復帰することが前提です。育児休業の延長を許容する場合は、育児休業に関する減点同意書を提出したときに減点されます',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_leave_none', points: 0 },
      {
        label: '産後休暇・育児休業明け（復帰月以前から申込をしている）',
        value: 'adj_leave_10',
        points: 10,
      },
      {
        label: '育児休業のため認可保育所等を退所し、育児休業明けに再入所を希望する',
        value: 'adj_leave_20',
        points: 20,
      },
      { label: '育児休業の延長を許容（減点同意書を提出）', value: 'adj_leave_minus900', points: -900 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設に入所中ですか？',
    helpText:
      '認定事由（求職中または育休中を除く）での理由に限り、月極契約で利用し、市が指定する様式の認可外保育施設利用証明書を提出した場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 10 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '入所希望月から12ヶ月以上待機中ですか？',
    helpText: '入所を辞退する場合、入所希望月は辞退月の翌月以降に変更となり、当初の待機期間は算定されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい', value: 'adj_waiting_yes', points: 10 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園希望者ですか？',
    helpText:
      '兄弟姉妹が入所中の園を希望する場合、または児童本人が和泉市外の認可保育施設に入所中の場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: -1 },
    ],
  },
  {
    id: 'adj_type_change',
    category: 'adjustment',
    label: '在籍施設で1号認定から2号認定への認定変更を希望しますか？',
    helpText: '求職中は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_type_change_no', points: 0 },
      { label: 'はい', value: 'adj_type_change_yes', points: 300 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '和泉市内の認可保育施設に就労、または就労予定の保育士ですか？',
    helpText:
      '一定の条件を満たす場合に優先的に入所調整が行われます。児童が利用開始した月より就労を開始しない場合は、その月末で利用が解除されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 500 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const izumiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
