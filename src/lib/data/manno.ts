import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// まんのう町 保育利用調整基準データ
// 出典: まんのう町認定こども園条例施行規則 別表第3
// https://www1.g-reiki.net/town.manno/reiki_honbun/r261RG00000393.html
// ---------------------------------------------------------------------------
// sum方式（父母の基準指数を合算）。各親が複数の要件に該当する場合は最高点を採用。
// 家庭外労働最大10点。疾病・障害・不存在（死亡等）は10点。
// ひとり親世帯+14点。倒産失業+8点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'manno',
  name: 'まんのう町',
  slug: 'manno',
  prefecture: '香川県',
  maxBasePoints: 20,
} as const;

const externalLaborOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ext_none`, points: 0 },
  { label: '月20日以上・1日8時間以上（10点）', value: `${prefix}_ext_10a`, points: 10 },
  { label: '月20日以上・1日6〜8時間未満（9点）', value: `${prefix}_ext_9a`, points: 9 },
  { label: '月20日以上・1日4〜6時間未満（8点）', value: `${prefix}_ext_8a`, points: 8 },
  { label: '月16日以上・1日8時間以上（8点）', value: `${prefix}_ext_8b`, points: 8 },
  { label: '月16日以上・1日6〜8時間未満（7点）', value: `${prefix}_ext_7b`, points: 7 },
  { label: '月16日以上・1日4〜6時間未満（6点）', value: `${prefix}_ext_6b`, points: 6 },
  { label: 'その他（月16日未満等）（3点）', value: `${prefix}_ext_3`, points: 3 },
];

const homeLaborOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '月20日以上・1日8時間以上（9点）', value: `${prefix}_home_9a`, points: 9 },
  { label: '月20日以上・1日6〜8時間未満（8点）', value: `${prefix}_home_8a`, points: 8 },
  { label: '月20日以上・1日4〜6時間未満（7点）', value: `${prefix}_home_7a`, points: 7 },
  { label: '月16日以上・1日8時間以上（7点）', value: `${prefix}_home_7b`, points: 7 },
  { label: '月16日以上・1日6〜8時間未満（6点）', value: `${prefix}_home_6b`, points: 6 },
  { label: '月16日以上・1日4〜6時間未満（5点）', value: `${prefix}_home_5b`, points: 5 },
  { label: 'その他（月16日未満等）（3点）', value: `${prefix}_home_3`, points: 3 },
];

const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piece_none`, points: 0 },
  { label: '月20日以上・1日8時間以上（7点）', value: `${prefix}_piece_7a`, points: 7 },
  { label: '月20日以上・1日6〜8時間未満（6点）', value: `${prefix}_piece_6a`, points: 6 },
  { label: '月20日以上・1日4〜6時間未満（5点）', value: `${prefix}_piece_5a`, points: 5 },
  { label: '月16日以上・1日8時間以上（5点）', value: `${prefix}_piece_5b`, points: 5 },
  { label: '月16日以上・1日6〜8時間未満（4点）', value: `${prefix}_piece_4b`, points: 4 },
  { label: '月16日以上・1日4〜6時間未満（3点）', value: `${prefix}_piece_3b`, points: 3 },
  { label: 'その他（2点）', value: `${prefix}_piece_2`, points: 2 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
  { label: '入院（10点）', value: `${prefix}_ill_10a`, points: 10 },
  { label: '常時病臥（医師1か月以上と診断）（10点）', value: `${prefix}_ill_10b`, points: 10 },
  { label: '精神性疾患・感染症・特殊疾病（10点）', value: `${prefix}_ill_10c`, points: 10 },
  { label: '常時安静（医師1か月以上と診断）（7点）', value: `${prefix}_ill_7`, points: 7 },
  { label: '週5日以上通院（7点）', value: `${prefix}_ill_7b`, points: 7 },
  { label: '週4日以上通院（5点）', value: `${prefix}_ill_5`, points: 5 },
  { label: '週3日以上通院（3点）', value: `${prefix}_ill_3`, points: 3 },
  { label: 'その他保育が必要な状態（2点）', value: `${prefix}_ill_2`, points: 2 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dis_none`, points: 0 },
  { label: '身体1・2級または療育手帳A以上（10点）', value: `${prefix}_dis_10`, points: 10 },
  { label: '身体3・4級または療育手帳B以上（7点）', value: `${prefix}_dis_7`, points: 7 },
  { label: '身体5・6級または療育手帳C以上（4点）', value: `${prefix}_dis_4`, points: 4 },
];

const careOutsideOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_out_none`, points: 0 },
  { label: '週5日以上付き添い（9点）', value: `${prefix}_care_out_9`, points: 9 },
  { label: '週4日以上付き添い（7点）', value: `${prefix}_care_out_7`, points: 7 },
  { label: '週3日以上付き添い（5点）', value: `${prefix}_care_out_5`, points: 5 },
  { label: 'その他特に保育が必要な場合（2点）', value: `${prefix}_care_out_2`, points: 2 },
];

const careInsideOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_in_none`, points: 0 },
  { label: '身体1・2級/療育A/要介護4以上の常時介護（9点）', value: `${prefix}_care_in_9`, points: 9 },
  { label: '身体3・4級/療育B/要介護2・3の常時介護（7点）', value: `${prefix}_care_in_7`, points: 7 },
  { label: 'その他特に保育が必要な場合（2点）', value: `${prefix}_care_in_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も点数の高い要件をひとつ選んでください（複数該当する場合は最高点の要件を選択）',
    inputType: 'select',
    options: [
      { label: '家庭外で働いている（外勤・テレワーク等）', value: `${prefix}_reason_ext`, points: 0 },
      { label: '家庭内で働いている（農業・自営業等）', value: `${prefix}_reason_home`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_piece`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_ill`, points: 0 },
      { label: '障害', value: `${prefix}_reason_dis`, points: 0 },
      { label: '家族の介護・看護（居宅外で付き添い）', value: `${prefix}_reason_care_out`, points: 0 },
      { label: '家族の介護・看護（居宅内での介護）', value: `${prefix}_reason_care_in`, points: 0 },
      { label: '妊娠・出産（10点）', value: `${prefix}_reason_birth`, points: 10 },
      { label: '求職活動中（2点）', value: `${prefix}_reason_job`, points: 2 },
      { label: '不在（死亡・行方不明・拘禁等）（10点）', value: `${prefix}_reason_absent`, points: 10 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_ext`,
      category,
      label: `${parentLabel}の家庭外就労の状況は？`,
      helpText: '月間就労日数と1日の就労時間で選択してください',
      inputType: 'select',
      options: externalLaborOptions(prefix),
    },
    {
      id: `${prefix}_home`,
      category,
      label: `${parentLabel}の家庭内就労（農業・自営業等）の状況は？`,
      inputType: 'select',
      options: homeLaborOptions(prefix),
    },
    {
      id: `${prefix}_piece`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'select',
      options: pieceworkOptions(prefix),
    },
    {
      id: `${prefix}_ill`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_dis`,
      category,
      label: `${parentLabel}の障害の等級は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care_out`,
      category,
      label: `${parentLabel}の居宅外での介護・看護の状況は？`,
      helpText: '家族に付き添い外出しての介護・看護が必要な場合',
      inputType: 'radio',
      options: careOutsideOptions(prefix),
    },
    {
      id: `${prefix}_care_in`,
      category,
      label: `${parentLabel}の居宅内での介護・看護の状況は？`,
      helpText: '自宅での常時介護が必要な家族がいる場合',
      inputType: 'radio',
      options: careInsideOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（母子・父子家庭）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+14）', value: 'adj_single_parent_yes', points: 14 },
    ],
  },
  {
    id: 'adj_divorce_mediation',
    category: 'adjustment',
    label: '現在、離婚調停中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_divorce_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_divorce_yes', points: 4 },
    ],
  },
  {
    id: 'adj_bankruptcy',
    category: 'adjustment',
    label: '倒産・失業による求職中（生計中心者）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_bankruptcy_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_bankruptcy_yes', points: 8 },
    ],
  },
  {
    id: 'adj_illness_unemployed',
    category: 'adjustment',
    label: '疾病により就労不可（生計中心者）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ill_unemployed_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_ill_unemployed_yes', points: 4 },
    ],
  },
  {
    id: 'adj_single_posting_domestic',
    category: 'adjustment',
    label: '片親が国内単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_dom_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sp_dom_yes', points: 2 },
    ],
  },
  {
    id: 'adj_single_posting_overseas',
    category: 'adjustment',
    label: '片親が海外単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_ov_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sp_ov_yes', points: 3 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '求職中に内定が決まっていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_job_offer_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業取得後の職場復帰に伴う申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（就労による自立見込み）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '申請する子どもが障害（療育手帳A以上等）を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_disabled_child_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同じ園に同時入所希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_yes', points: 1 },
    ],
  },
  {
    id: 'adj_early_apply',
    category: 'adjustment',
    label: '一斉入所申込受付日までに申込をしましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（期日以降の申込）', value: 'adj_early_apply_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_early_apply_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent_co_living',
    category: 'adjustment',
    label: '同居の祖父母（障害・疾病なし）が非就労ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gp_co_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_gp_co_yes', points: -2 },
    ],
  },
  {
    id: 'adj_grandparent_separate',
    category: 'adjustment',
    label: '別居の祖父母（障害・疾病なし）が非就労ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gp_sep_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_gp_sep_yes', points: -1 },
    ],
  },
  {
    id: 'adj_family_business',
    category: 'adjustment',
    label: '配偶者等が経営する事業所に勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_biz_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_family_biz_yes', points: -1 },
    ],
  },
];

export const mannoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
