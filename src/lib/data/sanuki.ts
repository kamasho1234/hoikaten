import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// さぬき市 保育施設等利用調整基準
// 出典: さぬき市保育施設等の利用調整に関する要綱（別表第1・別表第2）
// https://www.city.sanuki.lg.jp/section/reiki_int/reiki_honbun/o111RG00001187.html
// ---------------------------------------------------------------------------
// 複数事由のうち最も高い基準点数のみ採用（上限10点）。父または母の高い方を採用。
// parent1_baseのみ実装（最大10点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sanuki',
  name: 'さぬき市',
  slug: 'sanuki',
  prefecture: '香川県',
  maxBasePoints: 10,
} as const;

// 区分1: 居宅外就労・自営業（居宅外）代表者
const ext1Options = [
  { label: 'あてはまらない', value: 'parent1_ext1_none', points: 0 },
  { label: '月20日以上・1日8時間以上（10点）', value: 'parent1_ext1_10a', points: 10 },
  { label: '月20日以上・1日6時間以上8時間未満（9点）', value: 'parent1_ext1_9a', points: 9 },
  { label: '月20日以上・1日4時間以上6時間未満（8点）', value: 'parent1_ext1_8a', points: 8 },
  { label: '月16日以上20日未満・1日8時間以上（9点）', value: 'parent1_ext1_9b', points: 9 },
  { label: '月16日以上20日未満・1日6時間以上（8点）', value: 'parent1_ext1_8b', points: 8 },
  { label: '月16日以上20日未満・1日4時間以上（7点）', value: 'parent1_ext1_7a', points: 7 },
  { label: '月12日以上16日未満・1日8時間以上（8点）', value: 'parent1_ext1_8c', points: 8 },
  { label: '月12日以上16日未満・1日6時間以上（7点）', value: 'parent1_ext1_7b', points: 7 },
  { label: '月12日以上16日未満・1日4時間以上（6点）', value: 'parent1_ext1_6a', points: 6 },
  { label: '月64時間以上（月12日・週3日以下等）（6点）', value: 'parent1_ext1_6b', points: 6 },
];

// 区分2: 自営業（居宅外）代表者以外
const ext2Options = [
  { label: 'あてはまらない', value: 'parent1_ext2_none', points: 0 },
  { label: '月20日以上・1日8時間以上（9点）', value: 'parent1_ext2_9a', points: 9 },
  { label: '月20日以上・1日6時間以上（8点）', value: 'parent1_ext2_8a', points: 8 },
  { label: '月20日以上・1日4時間以上（7点）', value: 'parent1_ext2_7a', points: 7 },
  { label: '月16日以上20日未満・1日8時間以上（8点）', value: 'parent1_ext2_8b', points: 8 },
  { label: '月16日以上20日未満・1日6時間以上（7点）', value: 'parent1_ext2_7b', points: 7 },
  { label: '月16日以上20日未満・1日4時間以上（6点）', value: 'parent1_ext2_6a', points: 6 },
  { label: '月12日以上16日未満・1日8時間以上（7点）', value: 'parent1_ext2_7c', points: 7 },
  { label: '月12日以上16日未満・1日6時間以上（6点）', value: 'parent1_ext2_6b', points: 6 },
  { label: '月12日以上16日未満・1日4時間以上（5点）', value: 'parent1_ext2_5a', points: 5 },
  { label: '月64時間以上（月12日・週3日以下等）（5点）', value: 'parent1_ext2_5b', points: 5 },
];

// 区分3: 居宅内自営
const homeOptions = [
  { label: 'あてはまらない', value: 'parent1_home_none', points: 0 },
  { label: '月20日以上・1日8時間以上（8点）', value: 'parent1_home_8a', points: 8 },
  { label: '月20日以上・1日6時間以上（7点）', value: 'parent1_home_7a', points: 7 },
  { label: '月20日以上・1日4時間以上（6点）', value: 'parent1_home_6a', points: 6 },
  { label: '月16日以上20日未満・1日8時間以上（7点）', value: 'parent1_home_7b', points: 7 },
  { label: '月16日以上20日未満・1日6時間以上（6点）', value: 'parent1_home_6b', points: 6 },
  { label: '月16日以上20日未満・1日4時間以上（5点）', value: 'parent1_home_5a', points: 5 },
  { label: '月12日以上16日未満・1日8時間以上（6点）', value: 'parent1_home_6c', points: 6 },
  { label: '月12日以上16日未満・1日6時間以上（5点）', value: 'parent1_home_5b', points: 5 },
  { label: '月12日以上16日未満・1日4時間以上（4点）', value: 'parent1_home_4a', points: 4 },
  { label: '月64時間以上（4点）', value: 'parent1_home_4b', points: 4 },
];

const parent1Questions: Question[] = [
  {
    id: 'parent1_reason',
    category: 'parent1_base',
    label: '保護者（保育が必要な度合いが高い方）の保育不可の主な理由',
    helpText: 'さぬき市では複数の事由に該当する場合、最も点数が高くなる事由が採用されます。父または母のうち保育が必要な度合いが高い方の状況をお選びください',
    inputType: 'select',
    options: [
      { label: '選択してください', value: 'parent1_reason_none', points: 0 },
      { label: '居宅外就労・自営業（居宅外）代表者（区分1）', value: 'parent1_reason_ext1', points: 0 },
      { label: '居宅外就労・自営業（居宅外）代表者以外（区分2）', value: 'parent1_reason_ext2', points: 0 },
      { label: '居宅内自営業（区分3）', value: 'parent1_reason_home', points: 0 },
      { label: '内職（区分3）', value: 'parent1_reason_piecework', points: 0 },
      { label: '妊娠・出産（5点）', value: 'parent1_reason_birth', points: 5 },
      { label: '傷病（病気・入院・通院等）', value: 'parent1_reason_illness', points: 0 },
      { label: '障害（身体・精神・知的）', value: 'parent1_reason_disability', points: 0 },
      { label: '介護・看護（区分2と同基準）', value: 'parent1_reason_care', points: 0 },
      { label: '就学・技能習得（8点）', value: 'parent1_reason_study', points: 8 },
      { label: '求職活動（2点）', value: 'parent1_reason_jobseeking', points: 2 },
      { label: '虐待・DV（10点）', value: 'parent1_reason_abuse', points: 10 },
    ],
  },
  {
    id: 'parent1_ext1',
    category: 'parent1_base',
    label: '居宅外就労（代表者）の就労頻度と1日の就労時間',
    helpText: '居宅外就労・自営業（居宅外）代表者の方。就労は月48時間以上が必要です',
    inputType: 'radio',
    options: ext1Options,
  },
  {
    id: 'parent1_ext2',
    category: 'parent1_base',
    label: '居宅外就労（代表者以外）の就労頻度と1日の就労時間',
    helpText: '自営業（居宅外）で代表者以外の方。就労は月48時間以上が必要です',
    inputType: 'radio',
    options: ext2Options,
  },
  {
    id: 'parent1_home',
    category: 'parent1_base',
    label: '居宅内自営業の就労頻度と1日の就労時間',
    helpText: '居宅内自営業の方。就労は月48時間以上が必要です',
    inputType: 'radio',
    options: homeOptions,
  },
  {
    id: 'parent1_piecework',
    category: 'parent1_base',
    label: '内職の就労頻度と1日の就労時間',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'parent1_piecework_none', points: 0 },
      { label: '週4日以上・1日4時間以上（5点）', value: 'parent1_piecework_5', points: 5 },
      { label: '週4日未満・1日4時間以上（4点）', value: 'parent1_piecework_4', points: 4 },
      { label: '月64時間以上（3点）', value: 'parent1_piecework_3', points: 3 },
    ],
  },
  {
    id: 'parent1_illness',
    category: 'parent1_base',
    label: '傷病の状態',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'parent1_illness_none', points: 0 },
      { label: '1ヶ月以上入院または入院見込み（10点）', value: 'parent1_illness_10', points: 10 },
      { label: '自宅療養（1ヶ月以上安静等）（8点）', value: 'parent1_illness_8', points: 8 },
      { label: '週3日程度の通院加療（4点）', value: 'parent1_illness_4', points: 4 },
    ],
  },
  {
    id: 'parent1_disability',
    category: 'parent1_base',
    label: '障害の程度',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'parent1_disability_none', points: 0 },
      { label: '最重度（身体障害1〜2級・精神1級・療育手帳A等）（10点）', value: 'parent1_disability_10', points: 10 },
      { label: '中度（身体障害3級・精神2〜3級・療育手帳B等）（6点）', value: 'parent1_disability_6', points: 6 },
      { label: '軽度（身体障害4〜6級等）（3点）', value: 'parent1_disability_3', points: 3 },
    ],
  },
  {
    id: 'parent1_care',
    category: 'parent1_base',
    label: '介護・看護の頻度と時間（区分2と同じ基準）',
    helpText: '親族の介護・看護のため保育できない場合',
    inputType: 'radio',
    options: ext2Options.map(o => ({
      ...o,
      value: o.value.replace('parent1_ext2', 'parent1_care'),
    })),
  },
];

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_transfer_1to2',
    category: 'adjustment',
    label: '同一認定こども園内で1号認定から2号認定（保育所コース）へ転籍を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_transfer_yes', points: 10 },
    ],
  },
  {
    id: 'adj_small_scale_graduate',
    category: 'adjustment',
    label: '家庭的保育事業等を修了（卒園）後の入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_scale_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_small_scale_yes', points: 8 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士資格を有し、市内保育施設に就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_nursery_worker_yes', points: 8 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: '兄弟姉妹が在籍している施設と同一施設への入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_sibling_same_yes', points: 6 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育休終了後に就労復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '入所を希望する児童が障害児保育の対象ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_disability_child_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児（双子・三つ子等）を同時に入所申込していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_multiple_birth_yes', points: 1 },
    ],
  },
  {
    id: 'adj_fee_unpaid',
    category: 'adjustment',
    label: '保育料等の未納があり、かつ市と相談・約束をしていない状況ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_unpaid_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_fee_unpaid_yes', points: -5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居祖父母等が、保育を必要とする事由に該当しない（または求職活動のみ該当）状態ですか？',
    helpText: '65歳未満の同居祖父母が就労・傷病等に非該当の場合、減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（65歳以上・就労中・非同居等）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（65歳未満・同居・非就労）（-4）', value: 'adj_grandparent_yes', points: -4 },
    ],
  },
];

export const sanukiData: MunicipalityData = {
  municipality,
  questions: [
    ...parent1Questions,
    ...adjustmentQuestions,
  ],
};
