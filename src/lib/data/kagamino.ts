import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 鏡野町 保育園入園選考基準データ
// 出典: 鏡野町公式サイト「保育園・こども園 入園選考基準」
// https://www.town.kagamino.lg.jp/site/kodomoenhoikuen/12629.html
// ---------------------------------------------------------------------------
// sum方式（父母の基準指数を合算）。
// 就労は月間就労時間7段階（月48〜64h=4点〜月150h以上=10点）。
// 自営業は就労点数-1点。月12日以上勤務が条件（月80h未満の区分）。
// 出産は前後2か月で6点（母のみ適用）。
// 傷病：入院10点・自宅療養8点・定期通院3点。
// 障がい手帳1〜2級=8点、その他=6点。
// 介護：月120h以上=5点、月80h以上=4点、月60h以上=2点。
// 社会的養護必要（虐待・DV等）は基準指数として20点（保護者1に設定）。
// 家庭状況（死亡・行方不明・拘禁・離婚・別居・未婚等）=10点（両保護者適用）。
// 町長認定特別な保育必要性=3〜10点（個別判定）。
// 調整指数：保育料・給食費未納は未納月数×-2、町長認定特別事情は+1点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kagamino',
  name: '鏡野町',
  slug: 'kagamino',
  prefecture: '岡山県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_none`, points: 0 },
  { label: '月150時間以上（10点）', value: `${prefix}_emp_10`, points: 10 },
  { label: '月140〜150時間未満（9点）', value: `${prefix}_emp_9`, points: 9 },
  { label: '月120〜140時間未満（8点）', value: `${prefix}_emp_8`, points: 8 },
  { label: '月100〜120時間未満（7点）', value: `${prefix}_emp_7`, points: 7 },
  { label: '月80〜100時間未満・月12日以上勤務（6点）', value: `${prefix}_emp_6`, points: 6 },
  { label: '月64〜80時間未満・月12日以上勤務（5点）', value: `${prefix}_emp_5`, points: 5 },
  { label: '月48〜64時間未満・月12日以上勤務（4点）', value: `${prefix}_emp_4`, points: 4 },
  // 自営業は同一時間区分から-1点
  { label: '月150時間以上（自営業・9点）', value: `${prefix}_emp_self_9`, points: 9 },
  { label: '月140〜150時間未満（自営業・8点）', value: `${prefix}_emp_self_8`, points: 8 },
  { label: '月120〜140時間未満（自営業・7点）', value: `${prefix}_emp_self_7`, points: 7 },
  { label: '月100〜120時間未満（自営業・6点）', value: `${prefix}_emp_self_6`, points: 6 },
  { label: '月80〜100時間未満（自営業・5点）', value: `${prefix}_emp_self_5`, points: 5 },
  { label: '月64〜80時間未満（自営業・4点）', value: `${prefix}_emp_self_4`, points: 4 },
  { label: '月48〜64時間未満（自営業・3点）', value: `${prefix}_emp_self_3`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1（父）' : '保護者2（母）';

  const questions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}：月間就労時間は？`,
      helpText: '自営業は同一時間区分より1点低くなります。月80h未満の区分は月12日以上勤務が条件です',
      inputType: 'select',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}：疾病・傷病の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
        { label: '入院中（1か月以上）（10点）', value: `${prefix}_ill_10`, points: 10 },
        { label: '自宅療養中（医師の証明あり）（8点）', value: `${prefix}_ill_8`, points: 8 },
        { label: '定期通院が必要（3点）', value: `${prefix}_ill_3`, points: 3 },
      ],
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}：障がい手帳の等級は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_dis_none`, points: 0 },
        { label: '1〜2級（8点）', value: `${prefix}_dis_8`, points: 8 },
        { label: '3〜6級（6点）', value: `${prefix}_dis_6`, points: 6 },
      ],
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}：家族の看護・介護の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
        { label: '週4日以上・月120時間以上（5点）', value: `${prefix}_care_5`, points: 5 },
        { label: '週3日以上・月80時間以上（4点）', value: `${prefix}_care_4`, points: 4 },
        { label: '週3日以上・月60時間以上（2点）', value: `${prefix}_care_2`, points: 2 },
      ],
    },
    {
      id: `${prefix}_jobseek`,
      category,
      label: `${parentLabel}：求職活動中ですか？（1点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_js_no`, points: 0 },
        { label: 'はい（+1）', value: `${prefix}_js_yes`, points: 1 },
      ],
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧中ですか？（10点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（+10）', value: `${prefix}_disaster_yes`, points: 10 },
      ],
    },
    {
      id: `${prefix}_family_situation`,
      category,
      label: `${parentLabel}：家庭状況は？（死亡・行方不明・拘禁・離婚・別居・未婚等）`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_fs_none`, points: 0 },
        { label: 'はい（10点）', value: `${prefix}_fs_yes`, points: 10 },
      ],
    },
  ];

  // 母のみ：出産
  if (parentNum === 2) {
    questions.push({
      id: `${prefix}_birth`,
      category,
      label: `${parentLabel}：出産前後2か月以内ですか？（6点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_birth_no`, points: 0 },
        { label: 'はい（+6）', value: `${prefix}_birth_yes`, points: 6 },
      ],
    });
  }

  // 保護者1のみ：社会的養護（基準指数として20点）
  if (parentNum === 1) {
    questions.push({
      id: `${prefix}_social_care`,
      category,
      label: '社会的養護が必要な状況ですか？（虐待・DVのおそれ等）（20点）',
      helpText: '関係機関から社会的養護が必要と判断されている場合。基準指数として計上されます',
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_sc_no`, points: 0 },
        { label: 'はい（+20）', value: `${prefix}_sc_yes`, points: 20 },
      ],
    });
    questions.push({
      id: `${prefix}_town_special_need`,
      category,
      label: '町長が認定する特別な保育必要性がありますか？',
      helpText: '基準指数として3～10点。具体的な点数は町長の個別判定による',
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_tsn_no`, points: 0 },
        { label: 'はい（※町長判定）', value: `${prefix}_tsn_yes`, points: 3 },
      ],
    });
  }

  return questions;
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_dv_support',
    category: 'adjustment',
    label: '虐待・DVへの対応・支援が必要と機関から判断されていますか？',
    helpText: '調整指数A：+5点（基準指数の社会的養護20点とは別途加算されます）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_dv_yes', points: 5 },
    ],
  },
  {
    id: 'adj_staff',
    category: 'adjustment',
    label: '保護者が町内の保育施設に勤務していますか？',
    helpText: '調整指数B：+5点（勤務予定を含む）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_staff_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_staff_yes', points: 5 },
    ],
  },
  {
    id: 'adj_family_support',
    category: 'adjustment',
    label: 'こども家庭センターや関係機関から支援を受けていますか？',
    helpText: '調整指数C：+3点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fs_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_fs_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '調整指数D：+3点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sp_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給中または失業中ですか？',
    helpText: '調整指数E：+2点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障がいがありますか？',
    helpText: '調整指数F：+2点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cdis_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_cdis_yes', points: 2 },
    ],
  },
  {
    id: 'adj_continued',
    category: 'adjustment',
    label: '現在入園中の施設への継続入園を希望していますか？',
    helpText: '調整指数G：+1点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cont_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_cont_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが現在同じ施設に在園していますか？',
    helpText: '調整指数H：+1点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sib_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sib_yes', points: 1 },
    ],
  },
  {
    id: 'adj_small_nursery',
    category: 'adjustment',
    label: '小規模保育事業所の卒園児ですか？',
    helpText: '調整指数I：+1点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sn_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sn_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unpaid_fees',
    category: 'adjustment',
    label: '保育料・給食費の未納がありますか？',
    helpText: '調整指数J：マイナス調整。未納月数×-2（1か月=-2、2か月=-4など）。具体的な計算は町の判定による',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_no', points: 0 },
      { label: 'はい（-2点以上）', value: 'adj_unpaid_yes', points: -2 },
    ],
  },
  {
    id: 'adj_town_special',
    category: 'adjustment',
    label: '町長が認定する特別な事情がありますか？',
    helpText: '調整指数K：+1点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ts_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_ts_yes', points: 1 },
    ],
  },
];

export const kagaminoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
