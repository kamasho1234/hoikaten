import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 加美町 教育・保育施設等入園選考基準（別表1）
// 出典: 加美町教育・保育施設等入園選考に関する要綱
// https://www.town.kami.miyagi.jp/section/reiki_int/reiki_honbun/r004RG00000706.html
// 父母合算（sum方式）。月間就労日数×1日就労時間の組み合わせで基本点数が異なる。
// 祖父・祖母の状況は調整として実装。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kami',
  name: '加美町',
  slug: 'kami',
  prefecture: '宮城県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function makeParentQuestions(p: 'parent1' | 'parent2'): Question[] {
  const pLabel = p === 'parent1' ? '父（保護者1）' : '母（保護者2）';
  const isMother = p === 'parent2';
  return [
    {
      id: `${p}_reason`,
      category: `${p}_base` as const,
      label: `${pLabel}の保育を必要とする主な事由`,
      inputType: 'select',
      options: [
        { label: '選択してください', value: `${p}_reason_none`, points: 0 },
        { label: '就労', value: `${p}_reason_work`, points: 0 },
        ...(isMother
          ? [{ label: '妊娠・出産（産前産後2か月以内）（10点）', value: `${p}_reason_birth`, points: 10 }]
          : []),
        { label: '疾病・障害', value: `${p}_reason_illness`, points: 0 },
        { label: '介護・看護', value: `${p}_reason_care`, points: 0 },
        { label: '災害復旧（10点）', value: `${p}_reason_disaster`, points: 10 },
        { label: '求職活動（2点）', value: `${p}_reason_jobseeking`, points: 2 },
        { label: '就学・職業訓練（8点）', value: `${p}_reason_study`, points: 8 },
        { label: '育児休業中（既入所児の継続利用）（3点）', value: `${p}_reason_leave`, points: 3 },
        { label: '虐待・DVのおそれがある（10点）', value: `${p}_reason_dv`, points: 10 },
      ],
    },
    {
      id: `${p}_work`,
      category: `${p}_base` as const,
      label: `${pLabel}の就労状況（月間就労日数・1日就労時間）`,
      helpText: '就労が理由の場合のみ選択してください（自営業等の協力者は選択した点数から2点減）',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_work_none`, points: 0 },
        // 月20日以上
        { label: '月20日以上 7.5時間以上/日（150時間以上/月）（10点）', value: `${p}_work_d20_t75`, points: 10 },
        { label: '月20日以上 6時間以上7.5時間未満/日（120時間以上/月）（9点）', value: `${p}_work_d20_t6`, points: 9 },
        { label: '月20日以上 5時間以上6時間未満/日（100時間以上/月）（8点）', value: `${p}_work_d20_t5`, points: 8 },
        { label: '月20日以上 4時間以上5時間未満/日（80時間以上/月）（7点）', value: `${p}_work_d20_t4`, points: 7 },
        { label: '月20日以上 2.4時間以上4時間未満/日（48時間以上/月）（6点）', value: `${p}_work_d20_t24`, points: 6 },
        // 月16日以上20日未満
        { label: '月16日以上20日未満 7.5時間以上/日（120時間以上/月）（9点）', value: `${p}_work_d16_t75`, points: 9 },
        { label: '月16日以上20日未満 6時間以上7.5時間未満/日（96時間以上/月）（8点）', value: `${p}_work_d16_t6`, points: 8 },
        { label: '月16日以上20日未満 5時間以上6時間未満/日（80時間以上/月）（7点）', value: `${p}_work_d16_t5`, points: 7 },
        { label: '月16日以上20日未満 4時間以上5時間未満/日（64時間以上/月）（6点）', value: `${p}_work_d16_t4`, points: 6 },
        { label: '月16日以上20日未満 3時間以上4時間未満/日（48時間以上/月）（5点）', value: `${p}_work_d16_t3`, points: 5 },
        // 月12日以上16日未満
        { label: '月12日以上16日未満 7.5時間以上/日（90時間以上/月）（8点）', value: `${p}_work_d12_t75`, points: 8 },
        { label: '月12日以上16日未満 6時間以上7.5時間未満/日（72時間以上/月）（7点）', value: `${p}_work_d12_t6`, points: 7 },
        { label: '月12日以上16日未満 5時間以上6時間未満/日（60時間以上/月）（6点）', value: `${p}_work_d12_t5`, points: 6 },
        { label: '月12日以上16日未満 4時間以上5時間未満/日（48時間以上/月）（5点）', value: `${p}_work_d12_t4`, points: 5 },
      ],
    },
    {
      id: `${p}_illness`,
      category: `${p}_base` as const,
      label: `${pLabel}の疾病・障害の状況`,
      helpText: '疾病・障害が理由の場合のみ選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_illness_none`, points: 0 },
        { label: '入院中（10点）', value: `${p}_illness_hospitalized`, points: 10 },
        { label: '自宅療養を要する等保育が日常的に困難（9点）', value: `${p}_illness_homecare`, points: 9 },
        { label: '月10日以上の通院を要する（7点）', value: `${p}_illness_outpatient`, points: 7 },
        { label: '身体障害1〜2級または要介護4〜5程度（10点）', value: `${p}_illness_dis_10`, points: 10 },
        { label: '身体障害3級または要介護1〜3程度（8点）', value: `${p}_illness_dis_8`, points: 8 },
        { label: '身体障害4級以下または要支援1〜2程度（6点）', value: `${p}_illness_dis_6`, points: 6 },
        { label: '医師の診断書による（5点）', value: `${p}_illness_doc`, points: 5 },
      ],
    },
    {
      id: `${p}_care`,
      category: `${p}_base` as const,
      label: `${pLabel}の介護・看護の状況`,
      helpText: '同居または長期入院等している親族の介護・看護が理由の場合のみ選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_care_none`, points: 0 },
        { label: '常時介護の必要が認められる場合（9点）', value: `${p}_care_full`, points: 9 },
        { label: '一部介護の必要が認められる場合（7点）', value: `${p}_care_partial`, points: 7 },
        { label: '上記以外の介護（5点）', value: `${p}_care_other`, points: 5 },
      ],
    },
  ];
}

const parent1Questions = makeParentQuestions('parent1');
const parent2Questions = makeParentQuestions('parent2');

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_no_grandparent',
    category: 'adjustment',
    label: '父又は母は同居している祖父母がいませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（同居祖父母がいる）', value: 'adj_no_grandparent_no', points: 0 },
      { label: 'はい（同居祖父母がいない）（+10）', value: 'adj_no_grandparent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_grandfather',
    category: 'adjustment',
    label: '同居している祖父の状況（上記「同居祖父母がいる」を選択した場合）',
    helpText: '祖父が就労・疾病等の状況にある場合、またはいない場合は「0点」を選択してください',
    inputType: 'radio',
    options: [
      { label: 'いない・保育可能（0点）', value: 'adj_grandfather_none', points: 0 },
      { label: '就労・疾病等（月20日以上 7.5時間以上/日）（10点）', value: 'adj_grandfather_10', points: 10 },
      { label: '就労・疾病等（月20日以上 6時間以上/日）（9点）', value: 'adj_grandfather_9', points: 9 },
      { label: '就労・疾病等（月20日以上 5時間以上/日）（8点）', value: 'adj_grandfather_8', points: 8 },
      { label: '就労・疾病等（月20日以上 4時間以上/日）（7点）', value: 'adj_grandfather_7', points: 7 },
      { label: '80歳以上（7点）', value: 'adj_grandfather_age80', points: 7 },
      { label: '70歳以上80歳未満（5点）', value: 'adj_grandfather_age70', points: 5 },
      { label: '65歳以上70歳未満（4点）', value: 'adj_grandfather_age65', points: 4 },
    ],
  },
  {
    id: 'adj_grandmother',
    category: 'adjustment',
    label: '同居している祖母の状況（上記「同居祖父母がいる」を選択した場合）',
    helpText: '祖母が就労・疾病等の状況にある場合、またはいない場合は「0点」を選択してください',
    inputType: 'radio',
    options: [
      { label: 'いない・保育可能（0点）', value: 'adj_grandmother_none', points: 0 },
      { label: '就労・疾病等（月20日以上 7.5時間以上/日）（10点）', value: 'adj_grandmother_10', points: 10 },
      { label: '就労・疾病等（月20日以上 6時間以上/日）（9点）', value: 'adj_grandmother_9', points: 9 },
      { label: '就労・疾病等（月20日以上 5時間以上/日）（8点）', value: 'adj_grandmother_8', points: 8 },
      { label: '就労・疾病等（月20日以上 4時間以上/日）（7点）', value: 'adj_grandmother_7', points: 7 },
      { label: '80歳以上（7点）', value: 'adj_grandmother_age80', points: 7 },
      { label: '70歳以上80歳未満（5点）', value: 'adj_grandmother_age70', points: 5 },
      { label: '65歳以上70歳未満（4点）', value: 'adj_grandmother_age65', points: 4 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭（父又は母がいない世帯）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_job_loss',
    category: 'adjustment',
    label: '生計中心者が失業し、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_loss_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_job_loss_yes', points: 8 },
    ],
  },
  {
    id: 'adj_dv_child',
    category: 'adjustment',
    label: '虐待やDVのおそれがある場合など、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_child_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_dv_child_yes', points: 10 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '入所希望の子どもが障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_disability_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業明けの入所申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が同一の保育所等の利用を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_waitlist',
    category: 'adjustment',
    label: '前年度から待機児童でしたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waitlist_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_waitlist_yes', points: 1 },
    ],
  },
  {
    id: 'adj_small_graduate',
    category: 'adjustment',
    label: '小規模保育事業などの卒園措置（連携施設への入所）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_graduate_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_small_graduate_yes', points: 3 },
    ],
  },
  {
    id: 'adj_continuing',
    category: 'adjustment',
    label: '継続での利用申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_continuing_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_continuing_yes', points: 3 },
    ],
  },
  {
    id: 'adj_fee_unpaid',
    category: 'adjustment',
    label: '正当な理由なく利用者負担額等を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_unpaid_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_fee_unpaid_yes', points: -5 },
    ],
  },
  {
    id: 'adj_self_employed',
    category: 'adjustment',
    label: '自営業等の協力者（家業の手伝い等）として就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_self_employed_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_self_employed_yes', points: -2 },
    ],
  },
];

export const kamiData: MunicipalityData = {
  municipality,
  questions: [
    ...parent1Questions,
    ...parent2Questions,
    ...adjustmentQuestions,
  ],
};
