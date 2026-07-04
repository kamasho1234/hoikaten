import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 半田市 保育所等利用調整指数表
// 出典: 令和8年度半田市保育所等利用調整指数表（半田市公式サイト）
// ---------------------------------------------------------------------------
// sum方式。保護者1＋保護者2＋調整指数の合計。各保護者最大10点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'handa',
  name: '半田市',
  slug: 'handa',
  prefecture: '愛知県',
  maxBasePoints: 20,
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '居宅外で働いている（外勤・居宅外自営）', value: `${prefix}_reason_ext`, points: 0 },
      { label: '居宅内で働いている（農業・内動・居宅内自営）', value: `${prefix}_reason_home`, points: 0 },
      { label: '内職', value: `${prefix}_reason_piecework`, points: 4 },
      { label: '出産の前後（8点）', value: `${prefix}_reason_childbirth`, points: 8 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧（10点）', value: `${prefix}_reason_disaster`, points: 10 },
      { label: '就学（就労と同じ指数）', value: `${prefix}_reason_study`, points: 0 },
      { label: '育児休業中（3点）', value: `${prefix}_reason_parental_leave`, points: 3 },
      { label: '求職活動中（1点）', value: `${prefix}_reason_jobseeking`, points: 1 },
      { label: '虐待・DV（10点）', value: `${prefix}_reason_abuse`, points: 10 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_ext`,
      category,
      label: `${parentLabel}の居宅外就労の月間就労時間は？`,
      helpText: '外勤・居宅外自営が対象',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_ext_none`, points: 0 },
        { label: '月150時間以上（10点）', value: `${prefix}_ext_10`, points: 10 },
        { label: '月120時間以上150時間未満（9点）', value: `${prefix}_ext_9`, points: 9 },
        { label: '月100時間以上120時間未満（8点）', value: `${prefix}_ext_8`, points: 8 },
        { label: '月90時間以上100時間未満（7点）', value: `${prefix}_ext_7`, points: 7 },
        { label: '月60時間以上90時間未満（6点）', value: `${prefix}_ext_6`, points: 6 },
      ],
    },
    {
      id: `${prefix}_home`,
      category,
      label: `${parentLabel}の居宅内就労の月間就労時間は？`,
      helpText: '農業・内動・居宅内自営が対象',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
        { label: '月150時間以上（9点）', value: `${prefix}_home_9`, points: 9 },
        { label: '月120時間以上150時間未満（8点）', value: `${prefix}_home_8`, points: 8 },
        { label: '月100時間以上120時間未満（7点）', value: `${prefix}_home_7`, points: 7 },
        { label: '月90時間以上100時間未満（6点）', value: `${prefix}_home_6`, points: 6 },
        { label: '月60時間以上90時間未満（5点）', value: `${prefix}_home_5`, points: 5 },
      ],
    },
    {
      id: `${prefix}_study`,
      category,
      label: `${parentLabel}の就学・職業訓練の就労相当時間は？`,
      helpText: '就労指数を準用',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_study_none`, points: 0 },
        { label: '月150時間以上（10点）', value: `${prefix}_study_10`, points: 10 },
        { label: '月120時間以上150時間未満（9点）', value: `${prefix}_study_9`, points: 9 },
        { label: '月100時間以上120時間未満（8点）', value: `${prefix}_study_8`, points: 8 },
        { label: '月90時間以上100時間未満（7点）', value: `${prefix}_study_7`, points: 7 },
        { label: '月60時間以上90時間未満（6点）', value: `${prefix}_study_6`, points: 6 },
      ],
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
        { label: '月20日以上通院または1か月以上入院（10点）', value: `${prefix}_illness_10`, points: 10 },
        { label: '月15日以上通院または常時安静を要する（6点）', value: `${prefix}_illness_6`, points: 6 },
      ],
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
        { label: '身体1〜2級・精神保健福祉手帳1級・療育手帳A（10点）', value: `${prefix}_disability_10`, points: 10 },
        { label: '身体3〜4級・精神保健福祉手帳2〜3級・療育手帳B（9点）', value: `${prefix}_disability_9`, points: 9 },
        { label: '上記以外（4点）', value: `${prefix}_disability_4`, points: 4 },
      ],
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
        { label: '自宅：寝たきりの常時観察と介護（10点）', value: `${prefix}_care_10`, points: 10 },
        { label: '病院：月15日以上の付添い（6点）', value: `${prefix}_care_6`, points: 6 },
        { label: '自宅：上記以外の付添い（就労要件と同程度の時間）（5点）', value: `${prefix}_care_5`, points: 5 },
      ],
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（または離婚調停中）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_single_parent_yes', points: 15 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟姉妹が同時に利用申込をしていますか？',
    helpText: '求職活動中の場合は対象外。申込数×2点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: '1人（+2）', value: 'adj_sibling_simultaneous_1', points: 2 },
      { label: '2人（+4）', value: 'adj_sibling_simultaneous_2', points: 4 },
      { label: '3人以上（+6）', value: 'adj_sibling_simultaneous_3', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '兄弟姉妹が現在入所している施設と同一施設への入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_sibling_enrolled_yes', points: 8 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業明けに復職予定ですか？（年度内復帰）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_leave_return_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ikukyuu_readmission',
    category: 'adjustment',
    label: '育児休業取得により退所となった児童の再入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyuu_readmission_no', points: 0 },
      { label: 'はい（+16）', value: 'adj_ikukyuu_readmission_yes', points: 16 },
    ],
  },
  {
    id: 'adj_small_scale_graduate',
    category: 'adjustment',
    label: '地域型保育事業所（従業員枠除く）を卒園しますか？（3歳児申込・半田市認定者）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_scale_graduate_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_small_scale_graduate_yes', points: 1 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '入所児童は第3子以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい（+0.5）', value: 'adj_third_child_yes', points: 0.5 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '市内認可保育施設で保育士（有資格）として月120時間以上勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_nursery_worker_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_refusal',
    category: 'adjustment',
    label: '保育施設の入所内定を辞退したことがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_refusal_no', points: 0 },
      { label: 'はい（-7）', value: 'adj_refusal_yes', points: -7 },
    ],
  },
  {
    id: 'adj_transfer_within_year',
    category: 'adjustment',
    label: '入所した当該年度内の転園を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_transfer_yes', points: -5 },
    ],
  },
  {
    id: 'adj_non_resident',
    category: 'adjustment',
    label: '市外在住で父母いずれの勤務地も市外ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_resident_yes', points: 0 },
      { label: 'はい（-10）', value: 'adj_non_resident_yes', points: -10 },
    ],
  },
  {
    id: 'adj_ikukyuu_extension',
    category: 'adjustment',
    label: '育児休業の延長を許容できる旨の申立書を提出し、指数の減算に同意していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyuu_extension_no', points: 0 },
      { label: 'はい（-200）', value: 'adj_ikukyuu_extension_yes', points: -200 },
    ],
  },
];

export const handaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
