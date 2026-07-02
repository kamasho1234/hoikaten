import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 四街道市 保育所等利用調整基準
// 出典: 四街道市保育所等における保育に関する規則（別表第1・別表第2）
// https://www1.g-reiki.net/yotsukaido/reiki_honbun/g029RG00000860.html
// 父母合算（sum方式）。就労は月間労働時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yotsukaido',
  name: '四街道市',
  slug: 'yotsukaido',
  prefecture: '千葉県',
  maxBasePoints: 70,
  scoringMethod: 'sum',
} as const;

const workOptions = [
  { label: 'あてはまらない', value: 'parent1_work_none', points: 0 },
  { label: '月64〜80時間未満（20点）', value: 'parent1_work_20', points: 20 },
  { label: '月80〜100時間未満（22点）', value: 'parent1_work_22', points: 22 },
  { label: '月100〜120時間未満（24点）', value: 'parent1_work_24', points: 24 },
  { label: '月120〜140時間未満（26点）', value: 'parent1_work_26', points: 26 },
  { label: '月140〜160時間未満（28点）', value: 'parent1_work_28', points: 28 },
  { label: '月160時間以上（30点）', value: 'parent1_work_30', points: 30 },
];

const studyOptions = [
  { label: 'あてはまらない', value: 'parent1_study_none', points: 0 },
  { label: '就学予定（15点）', value: 'parent1_study_15', points: 15 },
  { label: '月64〜80時間未満（20点）', value: 'parent1_study_20', points: 20 },
  { label: '月80〜100時間未満（22点）', value: 'parent1_study_22', points: 22 },
  { label: '月100〜120時間未満（24点）', value: 'parent1_study_24', points: 24 },
  { label: '月120〜140時間未満（26点）', value: 'parent1_study_26', points: 26 },
  { label: '月140〜160時間未満（28点）', value: 'parent1_study_28', points: 28 },
  { label: '月160時間以上（30点）', value: 'parent1_study_30', points: 30 },
];

function makeParentQuestions(p: 'parent1' | 'parent2'): Question[] {
  const pNum = p === 'parent1' ? '1' : '2';
  return [
    {
      id: `${p}_reason`,
      category: `${p}_base`,
      label: `保護者${pNum}の保育不可の主な理由`,
      inputType: 'select',
      options: [
        { label: '選択してください', value: `${p}_reason_none`, points: 0 },
        { label: '就労（雇用・自営）', value: `${p}_reason_work`, points: 0 },
        { label: '出産（産前8週〜産後8週）（30点）', value: `${p}_reason_birth`, points: 30 },
        { label: '傷病・障害', value: `${p}_reason_illness`, points: 0 },
        { label: '介護・看護', value: `${p}_reason_care`, points: 0 },
        { label: '災害復旧（35点）', value: `${p}_reason_disaster`, points: 35 },
        { label: '求職活動', value: `${p}_reason_jobseeking`, points: 0 },
        { label: '就学・職業訓練', value: `${p}_reason_study`, points: 0 },
        { label: '育児休業中（16点）', value: `${p}_reason_leave`, points: 16 },
      ],
    },
    {
      id: `${p}_work`,
      category: `${p}_base`,
      label: '月間の就労時間',
      helpText: '月間合計の就労時間をお選びください（月64時間未満の場合は求職活動を選択）',
      inputType: 'radio',
      options: workOptions.map(o => ({
        ...o,
        value: o.value.replace('parent1', p),
      })),
    },
    {
      id: `${p}_illness`,
      category: `${p}_base`,
      label: '傷病・障害の状況',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_illness_none`, points: 0 },
        { label: '長期入院（1ヶ月以上）または常時病臥（35点）', value: `${p}_illness_35`, points: 35 },
        { label: '身体障害1・2級、療育手帳(A)・A、精神障害1級（30点）', value: `${p}_illness_30`, points: 30 },
        { label: '身体障害3級、療育手帳B、精神障害2・3級（25点）', value: `${p}_illness_25`, points: 25 },
        { label: '毎週の通院加療が必要な状態（20点）', value: `${p}_illness_20`, points: 20 },
        { label: 'その他保育困難な疾病等（10点）', value: `${p}_illness_10`, points: 10 },
      ],
    },
    {
      id: `${p}_care`,
      category: `${p}_base`,
      label: '介護・看護の状況',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_care_none`, points: 0 },
        { label: '重度障害者介護または要介護認定者の在宅介護（30点）', value: `${p}_care_30`, points: 30 },
        { label: '入院患者の付添看護（25点）', value: `${p}_care_25`, points: 25 },
        { label: 'その他の介護・看護（10点）', value: `${p}_care_10`, points: 10 },
      ],
    },
    {
      id: `${p}_jobseeking`,
      category: `${p}_base`,
      label: '求職活動の状況',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_jobseeking_none`, points: 0 },
        { label: '月64時間未満の労働（10点）', value: `${p}_jobseeking_10`, points: 10 },
        { label: '内職者（10点）', value: `${p}_jobseeking_10b`, points: 10 },
        { label: '求職活動中（就労なし）（5点）', value: `${p}_jobseeking_5`, points: 5 },
      ],
    },
    {
      id: `${p}_study`,
      category: `${p}_base`,
      label: '就学・職業訓練の状況（月間時間）',
      inputType: 'radio',
      options: studyOptions.map(o => ({
        ...o,
        value: o.value.replace('parent1', p),
      })),
    },
  ];
}

const parent1Questions = makeParentQuestions('parent1');
const parent2Questions = makeParentQuestions('parent2');

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+40）', value: 'adj_single_parent_yes', points: 40 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '児童相談関係機関により社会的擁護が必要と認められていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_no', points: 0 },
      { label: 'はい（+100）', value: 'adj_abuse_yes', points: 100 },
    ],
  },
  {
    id: 'adj_small_scale_graduate',
    category: 'adjustment',
    label: '小規模保育等を卒所（修了）した児童の入所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_scale_no', points: 0 },
      { label: 'はい（+40）', value: 'adj_small_scale_yes', points: 40 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '父または母が保育士資格を有し、市内保育施設に就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+40）', value: 'adj_nursery_worker_yes', points: 40 },
    ],
  },
  {
    id: 'adj_separation',
    category: 'adjustment',
    label: '離婚調停中等で別居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_separation_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_separation_yes', points: 30 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業中で求職活動していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_unemployment_yes', points: 30 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_welfare_yes', points: 20 },
    ],
  },
  {
    id: 'adj_three_children',
    category: 'adjustment',
    label: '義務教育修了前の子どもが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_three_children_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_three_children_yes', points: 10 },
    ],
  },
  {
    id: 'adj_leave_return_recent',
    category: 'adjustment',
    label: '育児休業で一度保育所等を退所し、退所から1年以内に育児休業明けで職場復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_recent_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_leave_return_recent_yes', points: 8 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産前産後休業明け又は育児休業明けに職場復帰予定ですか？（上記以外の場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_leave_return_yes', points: 4 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '現在、認可外保育施設を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_unlicensed_yes', points: 4 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '入所を希望する児童が障害児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_disability_child_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: '兄弟姉妹が在籍している施設と同一施設への入所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_same_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟姉妹を同時に申込していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_spouse_transfer',
    category: 'adjustment',
    label: '配偶者が単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_spouse_transfer_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_spouse_transfer_yes', points: 2 },
    ],
  },
  {
    id: 'adj_weekly_5days',
    category: 'adjustment',
    label: '週5日以上就労している保護者は何人いますか？',
    helpText: '父・母それぞれが週5日以上就労している場合、人数×1点が加算されます',
    inputType: 'radio',
    options: [
      { label: '0人（+0）', value: 'adj_weekly_5days_0', points: 0 },
      { label: '1人（+1）', value: 'adj_weekly_5days_1', points: 1 },
      { label: '2人（+2）', value: 'adj_weekly_5days_2', points: 2 },
    ],
  },
  {
    id: 'adj_fee_unpaid',
    category: 'adjustment',
    label: '保育料を6ヶ月以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_unpaid_no', points: 0 },
      { label: 'はい（-30）', value: 'adj_fee_unpaid_yes', points: -30 },
    ],
  },
  {
    id: 'adj_wide_area',
    category: 'adjustment',
    label: '市外の保育所等（広域入所）を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_wide_area_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_wide_area_yes', points: -20 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居祖父母等が就労等の保育不可事由に非該当（無職・専業主婦等）ですか？',
    helpText: '65歳未満の同居祖父母が就労・傷病等に非該当の場合、1人につき-5点',
    inputType: 'radio',
    options: [
      { label: 'いいえ（65歳以上・就労中・非同居等）', value: 'adj_grandparent_no', points: 0 },
      { label: '1人いる（-5）', value: 'adj_grandparent_1', points: -5 },
      { label: '2人以上いる（-10）', value: 'adj_grandparent_2', points: -10 },
    ],
  },
];

export const yotsukaidoData: MunicipalityData = {
  municipality,
  questions: [
    ...parent1Questions,
    ...parent2Questions,
    ...adjustmentQuestions,
  ],
};
