import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 豊山町 保育園入園承諾基準指数データ
// 出典: 豊山町立保育園入園承諾に係る事務手続要綱（別表第1 承諾基準指数表）
// https://www1.g-reiki.net/toyoyama/reiki_honbun/i536RG00000413.html
// ---------------------------------------------------------------------------
// min方式（同一世帯のうち最も指数の低い人で判定）。
// 就労は雇用形態と月間就労時間の組み合わせで評価。
// 外勤・自営業主：月140h以上=10点〜月60h以上=7点（4段階）。
// 自営業専従者・家族従業者：月140h以上=6点〜月60h以上=3点（4段階）。
// 内職：3点（時間によらず）。
// 調整指数：ひとり親+5点、生活保護+1点、育児休業復帰+1点、きょうだい+1〜2点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'toyoyama',
  name: '豊山町',
  slug: 'toyoyama',
  prefecture: '愛知県',
  maxBasePoints: 10,
  scoringMethod: 'min' as const,
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1（父）' : '保護者2（母）';

  const questions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}：就労形態と月間就労時間は？`,
      helpText: '外勤・自営業主（経営者本人）と、自営業専従者・家族従業者では点数が異なります',
      inputType: 'select',
      options: [
        { label: 'あてはまらない', value: `${prefix}_emp_none`, points: 0 },
        { label: '外勤または自営業主・月140時間以上（10点）', value: `${prefix}_emp_ext_10`, points: 10 },
        { label: '外勤または自営業主・月120〜140時間未満（9点）', value: `${prefix}_emp_ext_9`, points: 9 },
        { label: '外勤または自営業主・月90〜120時間未満（8点）', value: `${prefix}_emp_ext_8`, points: 8 },
        { label: '外勤または自営業主・月60〜90時間未満（7点）', value: `${prefix}_emp_ext_7`, points: 7 },
        { label: '自営業専従者または家族従業者・月140時間以上（6点）', value: `${prefix}_emp_fam_6`, points: 6 },
        { label: '自営業専従者または家族従業者・月120〜140時間未満（5点）', value: `${prefix}_emp_fam_5`, points: 5 },
        { label: '自営業専従者または家族従業者・月90〜120時間未満（4点）', value: `${prefix}_emp_fam_4`, points: 4 },
        { label: '自営業専従者または家族従業者・月60〜90時間未満（3点）', value: `${prefix}_emp_fam_3`, points: 3 },
        { label: '内職（3点）', value: `${prefix}_emp_piecework_3`, points: 3 },
      ],
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}：学校・職業訓練への在学状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
        { label: '通信制を除く学校・職業訓練校に通学中（6点）', value: `${prefix}_school_6`, points: 6 },
        { label: '通信制学生（4点）', value: `${prefix}_school_4`, points: 4 },
        { label: 'その他就労目的の就学・訓練（3点）', value: `${prefix}_school_3`, points: 3 },
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
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}：疾病・傷病の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
        { label: '入院中または常に病臥状態（10点）', value: `${prefix}_ill_10`, points: 10 },
        { label: '月15日以上の通院加療が必要（7点）', value: `${prefix}_ill_7`, points: 7 },
        { label: '安静加療が必要な一般療養（5点）', value: `${prefix}_ill_5`, points: 5 },
      ],
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}：障がいの程度は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_dis_none`, points: 0 },
        { label: '身体1・2級/精神1・2級/療育A・B判定（10点）', value: `${prefix}_dis_10`, points: 10 },
        { label: '身体3級/精神3級/療育C判定（8点）', value: `${prefix}_dis_8`, points: 8 },
        { label: '身体4級以下（6点）', value: `${prefix}_dis_6`, points: 6 },
      ],
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}：家族の介護・看護の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
        { label: '要介護3以上または同等の親族を介護（10点）', value: `${prefix}_care_10`, points: 10 },
        { label: '要介護1・2または要支援2程度を介護（6点）', value: `${prefix}_care_6`, points: 6 },
        { label: 'その他の親族介護・看護（4点）', value: `${prefix}_care_4`, points: 4 },
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
  ];

  // 母のみ：出産
  if (parentNum === 2) {
    questions.push({
      id: `${prefix}_birth`,
      category,
      label: `${parentLabel}：出産予定月の前後2か月以内ですか？（4点）`,
      helpText: '多胎妊娠の場合は産前3か月が対象',
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_birth_no`, points: 0 },
        { label: 'はい（+4）', value: `${prefix}_birth_yes`, points: 4 },
      ],
    });
  }

  return questions;
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯または両親不存在ですか？',
    helpText: '+5点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sp_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    helpText: '+1点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ikuji_return',
    category: 'adjustment',
    label: '育児休業からの職場復帰として新規申込していますか？',
    helpText: '+1点（育児休業後の復職に伴う新規申込の場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikuji_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_ikuji_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが保育園を利用していますか？',
    helpText: 'きょうだいが別の園に通いながら同じ園を希望する場合+2点、同じ園に在園中の新規申込+1点、きょうだいと同時に新規申込する場合+1点',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sib_none', points: 0 },
      { label: 'きょうだいが別の園に在園・同園希望（+2）', value: 'adj_sib_other_2', points: 2 },
      { label: 'きょうだいが同じ園に在園・新規申込（+1）', value: 'adj_sib_same_1', points: 1 },
      { label: 'きょうだいと同時に新規申込（+1）', value: 'adj_sib_simultaneous_1', points: 1 },
    ],
  },
  {
    id: 'adj_child_age3plus',
    category: 'adjustment',
    label: '保育が必要な子どもが3歳以上の年齢ですか？',
    helpText: '+1点（満3歳から小学校就学まで）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_3plus_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_3plus_yes', points: 1 },
    ],
  },
];

export const toyoyamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
