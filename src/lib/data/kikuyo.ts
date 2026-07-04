import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 菊陽町 保育所等入所選考実施要項
// 出典: 菊陽町保育所等入所選考実施要項（別表）
// https://www1.g-reiki.net/kikuyo/reiki_honbun/q438RG00000924.html
// 父母合算（sum方式）。就労は1日×週あたりの時間基準。父10+母10=最大20点。
// ひとり親世帯は基本指数+10（+調整+4=合計+14として実装）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kikuyo',
  name: '菊陽町',
  slug: 'kikuyo',
  prefecture: '熊本県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function makeParentQuestions(p: 'parent1' | 'parent2'): Question[] {
  const pNum = p === 'parent1' ? '1' : '2';
  const isMother = p === 'parent2';
  return [
    {
      id: `${p}_reason`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の保育を必要とする主な事由`,
      inputType: 'select',
      options: [
        { label: '選択してください', value: `${p}_reason_none`, points: 0 },
        { label: '就労（雇用・自営業）', value: `${p}_reason_work`, points: 0 },
        { label: '内職', value: `${p}_reason_piecework`, points: 0 },
        { label: '就労先未定（求職活動）（2点）', value: `${p}_reason_jobseeking`, points: 2 },
        ...(isMother ? [{ label: '出産（産前産後）（9点）', value: `${p}_reason_birth`, points: 9 }] : []),
        { label: '疾病・障害', value: `${p}_reason_illness`, points: 0 },
        { label: '介護・看護（最高10点）', value: `${p}_reason_care`, points: 0 },
        { label: '家庭の災害（10点）', value: `${p}_reason_disaster`, points: 10 },
        { label: '就労先内定・就学（就労時間に準じる）', value: `${p}_reason_study`, points: 0 },
      ],
    },
    {
      id: `${p}_work`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の就労状況（1日・週あたりの時間）`,
      helpText: '就労・就労先内定・就学の場合に選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_work_none`, points: 0 },
        { label: '1日7.5時間以上・週5日以上（月150時間以上）（10点）', value: `${p}_work_10`, points: 10 },
        { label: '1日6時間以上・週5日以上（月120時間以上）（9点）', value: `${p}_work_9`, points: 9 },
        { label: '1日6時間以上・週4日以上（月96時間以上）（8点）', value: `${p}_work_8`, points: 8 },
        { label: '1日5時間以上・週4日以上（月80時間以上）（7点）', value: `${p}_work_7`, points: 7 },
        { label: '1日4時間以上・週3日以上（月52時間以上）（6点）', value: `${p}_work_6`, points: 6 },
        { label: '上記に満たない就労（一時保育で対応困難）（4点）', value: `${p}_work_4`, points: 4 },
        { label: '上記に満たない就労（一時保育で対応可能）（0点）', value: `${p}_work_0`, points: 0 },
      ],
    },
    {
      id: `${p}_piecework`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の内職の状況`,
      helpText: '内職が理由の場合に選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_piecework_none`, points: 0 },
        { label: '月額20,000円以上の実績が1か月以上ある（5点）', value: `${p}_piecework_5`, points: 5 },
        { label: 'その他保育に欠けると認められる場合（4点）', value: `${p}_piecework_4`, points: 4 },
      ],
    },
    {
      id: `${p}_illness`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の疾病・障害の状況`,
      helpText: '疾病・障害が理由の場合に選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_illness_none`, points: 0 },
        { label: '入院中（10点）', value: `${p}_illness_10`, points: 10 },
        { label: '常時病臥・感染症（1か月以上）（8点）', value: `${p}_illness_8`, points: 8 },
        { label: '一般疾患（1か月以上安静を要する）（6点）', value: `${p}_illness_6`, points: 6 },
        { label: '障害（手帳1・2級/療育A1・A2/精神1級等）（10点）', value: `${p}_illness_dis_10`, points: 10 },
        { label: '障害（手帳3級/療育B1/精神2級等）（7点）', value: `${p}_illness_dis_7`, points: 7 },
        { label: '障害（手帳4・5・6級/療育B2/精神3級等）（5点）', value: `${p}_illness_dis_5`, points: 5 },
      ],
    },
    {
      id: `${p}_care`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の介護・看護の状況`,
      helpText: '介護・看護が理由の場合に選択してください（聴き取りにより決定・最高10点）',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_care_none`, points: 0 },
        { label: '入院付き添い看護（役所が点数決定・最高10点）（10点目安）', value: `${p}_care_10`, points: 10 },
        { label: '居宅内看護・介護（役所が点数決定・最高10点）（8点目安）', value: `${p}_care_8`, points: 8 },
        { label: '心身障がい児の看護・介護（役所が点数決定・最高10点）（6点目安）', value: `${p}_care_6`, points: 6 },
      ],
    },
    {
      id: `${p}_study`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の就学状況（1日・週あたりの時間）`,
      helpText: '就学している場合に選択してください（就労時間に準じて評価）',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_study_none`, points: 0 },
        { label: '1日7.5時間以上・週5日以上（月150時間以上）（10点）', value: `${p}_study_10`, points: 10 },
        { label: '1日6時間以上・週5日以上（月120時間以上）（9点）', value: `${p}_study_9`, points: 9 },
        { label: '1日6時間以上・週4日以上（月96時間以上）（8点）', value: `${p}_study_8`, points: 8 },
        { label: '1日5時間以上・週4日以上（月80時間以上）（7点）', value: `${p}_study_7`, points: 7 },
        { label: '1日4時間以上・週3日以上（月52時間以上）（6点）', value: `${p}_study_6`, points: 6 },
        { label: '上記に満たない就学（一時保育で対応困難）（4点）', value: `${p}_study_4`, points: 4 },
        { label: '上記に満たない就学（一時保育で対応可能）（0点）', value: `${p}_study_0`, points: 0 },
      ],
    },
  ];
}

const parent1Questions = makeParentQuestions('parent1');
const parent2Questions = makeParentQuestions('parent2');

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（父または母の死亡・離別・行方不明・拘禁）',
    helpText: 'ひとり親世帯は基本指数+10・調整指数+4の合計+14が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+14）', value: 'adj_single_parent_yes', points: 14 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_separation',
    category: 'adjustment',
    label: '保護者が単身赴任中ですか？（同居家族がいない場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_separation_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_separation_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の無職の同居家族（祖父母等）がいますか？',
    helpText: '就労・疾病等で保育できないと認められる場合を除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ（65歳以上・就労中・保育不能等）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育休明けで職場復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: '職場復帰予定（+4）', value: 'adj_leave_return_4', points: 4 },
      { label: '育休明けで退所前の保育所に再申込（+1）', value: 'adj_leave_return_1', points: 1 },
    ],
  },
  {
    id: 'adj_economic_hardship',
    category: 'adjustment',
    label: '世帯の生計中心者が失業・倒産等により就労が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_economic_hardship_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_economic_hardship_yes', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent_distant',
    category: 'adjustment',
    label: '祖父母等が隣接市区町村（菊池市・西原村を含む）に住んでいませんか？',
    helpText: '父方・母方それぞれについて判定されます（各+1）',
    inputType: 'radio',
    options: [
      { label: '隣接市区町村内（菊池市・西原村含む）に在住', value: 'adj_grandparent_distant_no', points: 0 },
      { label: '父方・母方の一方が隣接市区町村内に在住しない（+1）', value: 'adj_grandparent_distant_one', points: 1 },
      { label: '父方・母方とも隣接市区町村内に在住しない（+2）', value: 'adj_grandparent_distant_both', points: 2 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護の必要がある世帯ですか？（児童相談所・里親委託等）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_social_care_yes', points: 10 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '入所希望児童が障がい児ですか？（医師等の意見書で集団保育が必要）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_disability_child_yes', points: 3 },
    ],
  },
  {
    id: 'adj_fee_unpaid',
    category: 'adjustment',
    label: '利用者負担額を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_unpaid_no', points: 0 },
      { label: 'はい（-8）', value: 'adj_fee_unpaid_yes', points: -8 },
    ],
  },
  {
    id: 'adj_small_scale_graduate',
    category: 'adjustment',
    label: '入所希望児童が町内地域型保育事業（小規模保育等）の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_scale_graduate_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_small_scale_graduate_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: '兄弟姉妹が在園している施設を第1希望にしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_sibling_same_facility_yes', points: 8 },
    ],
  },
  {
    id: 'adj_sibling_transfer',
    category: 'adjustment',
    label: '兄弟姉妹が在園中の施設に転園を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_transfer_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_transfer_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟姉妹を同時に入所申込していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_three_children',
    category: 'adjustment',
    label: '18歳未満の児童を3人以上扶養していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_three_children_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_three_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '多胎児（双子以上）が入所を申込していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_twins_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が町内保育所等・認可保育施設・放課後児童クラブに勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（または学校教諭・学校事務・調理員）', value: 'adj_nursery_worker_no', points: 0 },
      { label: '月120時間以上勤務（+12）', value: 'adj_nursery_worker_12', points: 12 },
      { label: '月52時間以上120時間未満（+8）', value: 'adj_nursery_worker_8', points: 8 },
    ],
  },
];

export const kikuyoData: MunicipalityData = {
  municipality,
  questions: [
    ...parent1Questions,
    ...parent2Questions,
    ...adjustmentQuestions,
  ],
};
