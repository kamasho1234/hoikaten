import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 島田市 保育園入園 利用調整基準データ
// 出典: 島田市「令和9年度入園申込 利用調整基準」
// https://www.city.shimada.shizuoka.jp/fs/9/7/9/2/2/6/_/0.pdf
// -------------------------------------------------------------------------
// 島田市は「基本点（父母それぞれの点数の平均）＋ 加点減点項目」で選考する。
// 保護者の状況は1人につき20点を上限とし、複数該当する場合は総合して選考すると定められている（災害等を除く）。
// 「福祉事務所長が特に必要と認めた場合」「利用希望施設数による加点」「一斉受付期間内の申込」など、
// 市が自動で判断する項目（※印）は申込者が選ぶものではないため、当サイトでは選択肢にしていない。
// 必要な証明書類を提出できない場合は指数が0.5倍になると定められているが、当サイトでは計算していない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'shimada',
  name: '島田市',
  slug: 'shimada',
  prefecture: '静岡県',
  maxBasePoints: 20,
  scoringMethod: 'avg',
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月180時間（週45時間）以上', value: `${prefix}_employment_0`, points: 20 },
  { label: '月170時間（週42.5時間）以上', value: `${prefix}_employment_1`, points: 19.5 },
  { label: '月160時間（週40時間）以上', value: `${prefix}_employment_2`, points: 19 },
  { label: '月150時間（週37.5時間）以上', value: `${prefix}_employment_3`, points: 18 },
  { label: '月140時間（週35時間）以上', value: `${prefix}_employment_4`, points: 16 },
  { label: '月120時間（週30時間）以上', value: `${prefix}_employment_5`, points: 13 },
  { label: '月90時間（週22.5時間）以上', value: `${prefix}_employment_6`, points: 9 },
  { label: '月64時間（週16時間）以上', value: `${prefix}_employment_7`, points: 5 },
];

const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: 'ハローワークまたは派遣会社に登録している', value: `${prefix}_jobseeking_0`, points: 1 },
  { label: '保育所等に入所できたら求職活動を行う', value: `${prefix}_jobseeking_1`, points: 0.5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前産後（母子手帳の写しを添付）', value: `${prefix}_childbirth_0`, points: 20 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院が1か月以上', value: `${prefix}_illness_0`, points: 20 },
  { label: '入院が2週間以上1か月未満', value: `${prefix}_illness_1`, points: 10 },
  { label: '週4日以上の通院', value: `${prefix}_illness_2`, points: 5 },
  { label: '自宅療養で常時床に伏せている', value: `${prefix}_illness_3`, points: 20 },
  { label: '上記以外で日常生活に支障があり介護が必要', value: `${prefix}_illness_4`, points: 8 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '介護を要する（おおむね1・2級またはA判定程度）', value: `${prefix}_disability_0`, points: 12 },
  { label: '保育に支障がある（おおむね3級またはB判定程度）', value: `${prefix}_disability_1`, points: 8 },
  { label: '上記以外（4級以下）', value: `${prefix}_disability_2`, points: 4 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上・日中の所要時間が8時間以上の看護（施設通所・入院の付添い）', value: `${prefix}_care_0`, points: 10 },
  { label: '週5日以上・日中の所要時間が4時間以上の看護', value: `${prefix}_care_1`, points: 4 },
  { label: '週4日以内・日中の所要時間が8時間以上の看護', value: `${prefix}_care_2`, points: 8 },
  { label: '週4日以内・日中の所要時間が4時間以上の看護', value: `${prefix}_care_3`, points: 2 },
  { label: '在宅介護（要介護4以上の重度）', value: `${prefix}_care_4`, points: 11 },
  { label: '在宅介護（要介護3程度の中程度）', value: `${prefix}_care_5`, points: 7 },
  { label: '在宅介護（要介護2程度の軽度）', value: `${prefix}_care_6`, points: 4 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '週35時間以上', value: `${prefix}_school_0`, points: 16 },
  { label: '週30時間以上', value: `${prefix}_school_1`, points: 13 },
  { label: '週24時間以上', value: `${prefix}_school_2`, points: 10 },
  { label: '週16時間以上', value: `${prefix}_school_3`, points: 4 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災等による家屋損壊等の復旧のため保育ができない', value: `${prefix}_disaster_0`, points: 25 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '島田市は父母それぞれの点数の平均を基本点にします（保護者1人につき20点が上限）',
    inputType: 'select',
    options: [
      { label: '就労している', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '産前産後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病等（本人）', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族等の看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '就学（学校・職業訓練学校）', value: `${prefix}_reason_school`, points: 0 },
      { label: '災害等', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      helpText: '休憩時間を含みます。育休復帰後に短時間勤務となる方は産休前の勤務時間で選びます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の産前産後の状況は？`,
      helpText: '出産予定日の6週間前の日が属する月を入所希望月とする場合が対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の1週あたりの就学時間は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害等で保育ができない状況ですか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_low_income',
    category: 'adjustment',
    label: '低所得世帯ですか？（主に生計を支えている方の市民税が非課税）',
    helpText: 'ひとり親・失職中の加点とは重複できません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_low_income_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_low_income_1', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: 'ひとり親の加点とは重複できません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？（新規入園時のみ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+25）', value: 'adj_single_parent_1', points: 25 },
    ],
  },
  {
    id: 'adj_mediation',
    category: 'adjustment',
    label: '離婚調停中ですか？（事件係属証明書等を提出する場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_mediation_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_mediation_1', points: 10 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '主たる生計維持者が倒産・リストラで失職し、求職活動中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployed_1', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所申込児童に障害がありますか？（集団保育が可能な場合のみ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが入所希望施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: '2号・3号認定で在園している（+3.5）', value: 'adj_sibling_enrolled_1', points: 3.5 },
      { label: 'こども園1号認定のみで在園している（+1）', value: 'adj_sibling_enrolled_2', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_together',
    category: 'adjustment',
    label: 'きょうだい同時の申込ですか？（転園・認定変更を除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_together_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_together_1', points: 1 },
      { label: '多胎児（+2）', value: 'adj_sibling_together_2', points: 2 },
    ],
  },
  {
    id: 'adj_current_care',
    category: 'adjustment',
    label: '入所申込児童が現在通園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_current_care_0', points: 0 },
      { label: '認可外保育所に通園中（企業主導型を除く）（+1.5）', value: 'adj_current_care_1', points: 1.5 },
      { label: '島田市外の保育所等に通園中（転居など継続入所が困難な場合）（+2.5）', value: 'adj_current_care_2', points: 2.5 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '入所申込児童が地域型保育事業所・企業主導型保育所を卒園予定ですか？（次年度申込のみ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_graduate_1', points: 4 },
    ],
  },
  {
    id: 'adj_saturday',
    category: 'adjustment',
    label: '保護者全員が土曜出勤の日が毎月1日以上あり、土曜保育を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_saturday_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_saturday_1', points: 2 },
    ],
  },
  {
    id: 'adj_home_care_child',
    category: 'adjustment',
    label: '申込児童のほかに、家庭等で保育している未就学児がいますか？（父母交代または祖父母等が保育）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_care_child_0', points: 0 },
      { label: 'はい（-1）', value: 'adj_home_care_child_1', points: -1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業終了等の復職ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: '育休の延長が困難で直ちに復職を希望する（+3）', value: 'adj_leave_return_1', points: 3 },
      { label: '復職を希望するが、入所できない場合は育休の延長等が可能（+1）', value: 'adj_leave_return_2', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖父母の保育の協力を得られない状況ですか？（別居・離別、または同居でも就労・疾病・求職・障害・65歳以上等）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（+0.5）', value: 'adj_grandparent_1', points: 0.5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父または母が単身赴任で、祖父母等と同居していませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: '静岡県外に赴任している（+3）', value: 'adj_tanshin_1', points: 3 },
      { label: '日本国外に赴任している（+5）', value: 'adj_tanshin_2', points: 5 },
    ],
  },
  {
    id: 'adj_reenter',
    category: 'adjustment',
    label: '下の子の育児休業取得のため一時的に退所した児童の再入園ですか？（満1歳までに職場復帰する場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reenter_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_reenter_1', points: 10 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料を滞納していますか？（納付誓約どおり納付されていない）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（-20）', value: 'adj_fee_delinquent_1', points: -20 },
    ],
  },
  {
    id: 'adj_cancelled',
    category: 'adjustment',
    label: '内定施設をキャンセル、または内定入所月を変更したあとの再選考ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cancelled_0', points: 0 },
      { label: 'はい（-1）', value: 'adj_cancelled_1', points: -1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が市外の保育所等に勤務する保育士・幼稚園教諭等ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+1.5）', value: 'adj_hoikushi_1', points: 1.5 },
    ],
  },
];

export const shimadaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
