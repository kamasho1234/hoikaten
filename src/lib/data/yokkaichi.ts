import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 四日市市 保育所等利用調整基準（基本点数・調整点数）データ
//
// 出典: 四日市市こども未来部保育幼稚園課「令和7年度 四日市市保育所等利用調整実施要領」
//       別紙1 利用調整基準（保育所、認定こども園及び地域型保育事業所の利用調整のための基準）
//       https://www.city.yokkaichi.lg.jp/www/contents/1720397813414/simple/R7riyoutyouseikijyun.pdf
//       （四日市市Webサイト「利用調整方法（選考方法）について」
//         https://www.city.yokkaichi.lg.jp/www/contents/1720397813414/index.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基本点数は最高100点で、旧データ（父母各20点）とは体系が異なる。
//
// 重要: 基本点数は「父母各々に算定し、最も低い点数を世帯の点数として採用する」ため
//       scoringMethod は 'min'。複数の要件に該当する場合は父母各々について高い方を採用する。
//
// 数値化しない規定（別途判断・審査対象のため質問には含めない）:
//   基本点数 (9)その他市長が認める場合 A「※」福祉事務所長が特に保育が必要な状態にあると認める場合
//   調整点数 (2)世帯の状況 J「10〜30」送迎手段、勤務先その他の事情で入所する保育所が限定される場合（審査対象）
//   調整点数 (3)就労状況 I「※」利用希望施設の選択を増やす、保育所開園時間に間にあわせるため
//            就労時間の短縮をする必要がある場合（短縮により減点される点数と同じ点数を加点）
//   調整点数 (5)申込児童の状態 A「※」障害のある子ども（集団保育が可能な場合で4・5歳に限る）
//   調整点数 (7)転園 A（転園を希望する場合。地域型保育事業所等の卒園児を除く）
//   調整点数 (8)その他 A「※」福祉事務所長が特に必要と認める場合（審査対象）
//   備考: 週間就労時間で該当する点数が20点以上乖離する場合は、中間の点数とする
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yokkaichi',
  name: '四日市市',
  slug: 'yokkaichi',
  prefecture: '三重県',
  maxBasePoints: 100, // 父母各々に算定し、最も低い点数を世帯の点数として採用する（基本点の最高点は100点）
  scoringMethod: 'min',
} as const;

// ---------------------------------------------------------------------------
// 1 基本点数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** (1) 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  {
    label: '自営業の中心者および法人の経営者（拘束時間が特定できる場合は下記の区分による）',
    value: `${prefix}_employment_100a`,
    points: 100,
  },
  { label: '月20日以上かつ週40時間以上働いている', value: `${prefix}_employment_100b`, points: 100 },
  { label: '月20日以上かつ週30時間以上働いている', value: `${prefix}_employment_90`, points: 90 },
  { label: '月16日以上かつ週24時間以上働いている', value: `${prefix}_employment_80`, points: 80 },
  { label: '月16日以上かつ週16時間以上働いている', value: `${prefix}_employment_70`, points: 70 },
  { label: '上記には該当しないが、月64時間以上働いている', value: `${prefix}_employment_60`, points: 60 },
  {
    label: '月48時間以上64時間未満働いている（4歳児未満は要件不足のため求職活動となる）',
    value: `${prefix}_employment_50`,
    points: 50,
  },
];

/** (2) 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '母が出産または出産予定日の前後2か月の期間にあって、出産の準備または休養を要する',
    value: `${prefix}_childbirth_100`,
    points: 100,
  },
  {
    label: '上記の期間に該当しない出産の準備を要する',
    value: `${prefix}_childbirth_30`,
    points: 30,
  },
];

/** (3) 保護者の疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '入院または入院に相当する治療や安静を要する自宅療養で、常に臥床が必要で保育が常時困難',
    value: `${prefix}_illness_100`,
    points: 100,
  },
  {
    label: '通院加療を行い、常に安静を要するなど、保育が困難',
    value: `${prefix}_illness_70`,
    points: 70,
  },
  { label: '疾病などにより、保育に支障がある', value: `${prefix}_illness_50`, points: 50 },
];

/** (3) 保護者の障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障害者手帳1〜2級、精神障害者保健福祉手帳1〜2級、療育手帳Aの交付を受けている',
    value: `${prefix}_disability_100`,
    points: 100,
  },
  {
    label: '身体障害者手帳3〜4級、療育手帳B1の交付を受けている',
    value: `${prefix}_disability_80`,
    points: 80,
  },
  {
    label: '身体障害者手帳、精神障害者保健福祉手帳3級、療育手帳の交付を受けている',
    value: `${prefix}_disability_60`,
    points: 60,
  },
];

/** (4) 親族等の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '月20日以上かつ週40時間以上、病人や障害者の介護・看護や入院・通院等の付き添いを行っている',
    value: `${prefix}_care_100`,
    points: 100,
  },
  {
    label: '月20日以上かつ週30時間以上、病人や障害者の介護・看護や入院・通院等の付き添いを行っている',
    value: `${prefix}_care_90`,
    points: 90,
  },
  {
    label: '月16日以上かつ週24時間以上、病人や障害者の介護・看護や入院・通院等の付き添いを行っている',
    value: `${prefix}_care_80`,
    points: 80,
  },
  {
    label: '月16日以上かつ週16時間以上、病人や障害者の介護・看護や入院・通院等の付き添いを行っている',
    value: `${prefix}_care_70`,
    points: 70,
  },
  {
    label: '上記には該当しないが月64時間以上、病人や障害者の介護・看護や入院・通院等の付き添いを行っている',
    value: `${prefix}_care_60`,
    points: 60,
  },
  {
    label: '月48時間以上64時間未満、病人や障害者の介護・看護や入院・通院等の付き添いを行っている',
    value: `${prefix}_care_50`,
    points: 50,
  },
];

/** (5) 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災、風水害、火災その他の災害により自宅や近隣の復旧に当たっている',
    value: `${prefix}_disaster_100`,
    points: 100,
  },
];

/** (6) 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '継続的に求職活動を行っている', value: `${prefix}_jobseeking_30`, points: 30 },
];

/** (7) 就学（就職に必要な技能習得のためのもの） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '職業訓練校、専門学校、大学等に月20日以上かつ週40時間以上就学している',
    value: `${prefix}_education_100`,
    points: 100,
  },
  {
    label: '職業訓練校、専門学校、大学等に月20日以上かつ週30時間以上就学している',
    value: `${prefix}_education_90`,
    points: 90,
  },
  {
    label: '職業訓練校、専門学校、大学等に月16日以上かつ週24時間以上就学している',
    value: `${prefix}_education_80`,
    points: 80,
  },
  {
    label: '職業訓練校、専門学校、大学等に月16日以上（週4日以上）かつ週16時間以上就学している',
    value: `${prefix}_education_70`,
    points: 70,
  },
  {
    label: '上記には該当しないが、職業訓練校、専門学校、大学等に月64時間以上就学している',
    value: `${prefix}_education_60`,
    points: 60,
  },
  {
    label: '職業訓練校、専門学校、大学等に月48時間以上64時間未満就学している',
    value: `${prefix}_education_50`,
    points: 50,
  },
];

/** (8) 家庭支援 */
const familySupportOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_support_none`, points: 0 },
  {
    label: '福祉事務所長が特に保育が必要な状態にあると認める',
    value: `${prefix}_support_100`,
    points: 100,
  },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '保護者の障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族等の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '家庭支援', value: `${prefix}_reason_support`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間数は全て休憩時間を含みます。育児のための短時間勤務制度を利用した場合も、通常の就労時間で判断します',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
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
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
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
      helpText: '就職に必要な技能習得のための就学が対象です',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_support`,
      category,
      label: `${parentLabel}は家庭支援に該当しますか？`,
      inputType: 'radio',
      options: familySupportOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2 調整点数（申込児童またはその世帯にあてはまるものを採用する）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '児童と同一住所の祖父母が65歳未満ですか？',
    helpText:
      '就労をしている場合（要・就労証明書）、または疾病等（要・診断書）の場合を除きます（(1)保育の代替手段A、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_facility_closure',
    category: 'adjustment',
    label: '利用していた保育施設の廃園・縮小等により継続して利用できませんか？',
    helpText: '(1)保育の代替手段B',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_facility_closure_no', points: 0 },
      { label: 'はい', value: 'adj_facility_closure_yes', points: 50 },
    ],
  },
  {
    id: 'adj_small_facility_graduate',
    category: 'adjustment',
    label: '地域型保育事業所の卒園児ですか？',
    helpText: '卒園後の利用申込の場合を除きます（(1)保育の代替手段C）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_facility_graduate_yes', points: 50 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '前年度に入所申込を行った児童で、待機していますか？',
    helpText: '(1)保育の代替手段E',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい', value: 'adj_waiting_yes', points: 20 },
    ],
  },
  {
    id: 'adj_leave_withdrawal',
    category: 'adjustment',
    label: '下の子の育児休業取得により産後2か月で退所し、復職時に申込をしますか？',
    helpText: '保護者の就労により入所していた児童が対象（退所した子のみを対象）（(1)保育の代替手段G）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_withdrawal_no', points: 0 },
      { label: 'はい', value: 'adj_leave_withdrawal_yes', points: 50 },
    ],
  },
  {
    id: 'adj_relocation_transfer',
    category: 'adjustment',
    label: '転居・転勤により、やむをえず転所の申込をしますか？',
    helpText: '転所希望施設に現在入所する施設が含まれない場合。新年度入所のみ適用（(1)保育の代替手段H）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relocation_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_relocation_transfer_yes', points: 5 },
    ],
  },
  {
    id: 'adj_abuse_prevention',
    category: 'adjustment',
    label: '児童虐待防止を目的に入所調整を配慮する必要がありますか？',
    helpText: '(2)世帯の状況A',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_prevention_no', points: 0 },
      { label: 'はい', value: 'adj_abuse_prevention_yes', points: 20 },
    ],
  },
  {
    id: 'adj_multiple_care',
    category: 'adjustment',
    label: '看護・介護が必要な同居親族が複数人いますか？',
    helpText: '保育が必要な理由が介護・看護の場合のみ適用（(2)世帯の状況B）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_care_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_care_yes', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_pregnancy',
    category: 'adjustment',
    label: '多胎児を妊娠していますか？',
    helpText: '保育が必要な理由が妊娠・出産の場合のみ適用（(2)世帯の状況C）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_pregnancy_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_pregnancy_yes', points: 5 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '(2)世帯の状況D',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 25 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、保育を必要としますか？',
    helpText: '(2)世帯の状況E',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 30 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者の失業により、早期に就労することが必要ですか？',
    helpText: '主に途中入所者が対象（(2)世帯の状況G）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 50 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保育施設等で就労している、または就労予定ですか？',
    helpText:
      '特定教育・保育施設、地域型保育事業所、認可外保育施設での就労（(2)世帯の状況H・I）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（市内の施設）', value: 'adj_childcare_worker_in', points: 50 },
      { label: 'はい（市外の施設）', value: 'adj_childcare_worker_out', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_support_center',
    category: 'adjustment',
    label: '児童発達支援センターにきょうだいが通園していますか？',
    helpText: '(2)世帯の状況K',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_support_center_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_support_center_yes', points: 100 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '単身赴任者がいますか？',
    helpText: '(3)就労状況A',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 6 },
    ],
  },
  {
    id: 'adj_work_and_study',
    category: 'adjustment',
    label: '就労に加えて就学もしていますか？',
    helpText:
      '基本点数が就労の場合のみ適用。合計は100点が限度（(3)就労状況B・C）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_and_study_no', points: 0 },
      { label: '月16日以上かつ週24時間以上就学している', value: 'adj_work_and_study_40', points: 40 },
      { label: '月16日以上かつ週16時間以上就学している', value: 'adj_work_and_study_35', points: 35 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労が内定中ですか？',
    helpText:
      '現に就労していない場合。現に就労し転職予定の場合は含みません。新年度入所のみ適用（(3)就労状況D、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい', value: 'adj_job_offer_yes', points: -5 },
    ],
  },
  {
    id: 'adj_home_work',
    category: 'adjustment',
    label: '内職など居宅内就労をしていますか？',
    helpText: '自営・テレワークは除きます（(3)就労状況E、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_work_no', points: 0 },
      { label: 'はい', value: 'adj_home_work_yes', points: -30 },
    ],
  },
  {
    id: 'adj_self_employed_helper',
    category: 'adjustment',
    label: '自営協力者で最低賃金以上の収入を得ていませんか？',
    helpText: '(3)就労状況F・G（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_self_employed_helper_no', points: 0 },
      { label: 'はい（居宅外自営協力者）', value: 'adj_self_employed_helper_out', points: -10 },
      { label: 'はい（居宅内自営協力者）', value: 'adj_self_employed_helper_in', points: -15 },
    ],
  },
  {
    id: 'adj_leave_no_return',
    category: 'adjustment',
    label: '育児休業中で、入所希望年度の3月までに職場復帰しませんか？',
    helpText:
      '育児休業対象児童以外のきょうだいが保育施設を利用する場合（(3)就労状況H、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_no_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_no_return_yes', points: -50 },
    ],
  },
  {
    id: 'adj_study_and_work',
    category: 'adjustment',
    label: '就学に加えて就労もしていますか？',
    helpText:
      '基本点数が就学の場合のみ適用。合計は100点が限度（(4)就学状況A・B）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_study_and_work_no', points: 0 },
      { label: '月16日以上かつ週24時間以上働いている', value: 'adj_study_and_work_40', points: 40 },
      { label: '月16日以上かつ週16時間以上働いている', value: 'adj_study_and_work_35', points: 35 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '申込児童は多胎児ですか？',
    helpText:
      '一緒に生まれた子も同時に申込をする場合に限ります（多胎児と同時に申込をするきょうだいも含む）（(5)申込児童の状態B）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの申込・在籍状況は？',
    helpText:
      'きょうだい同時申込、または入所希望年度においてきょうだいが保育施設に在籍している場合、A〜Cのいずれかを採用します（(6)きょうだいの状況）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      {
        label: 'きょうだいが同時に申込をする（育休退所した児童は除く）',
        value: 'adj_sibling_15a',
        points: 15,
      },
      {
        label: 'きょうだいが在籍している保育施設とは別の施設を第一希望で申込する',
        value: 'adj_sibling_15b',
        points: 15,
      },
      {
        label: 'きょうだいが在籍している保育施設を第一希望で申込する',
        value: 'adj_sibling_25',
        points: 25,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const yokkaichiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
