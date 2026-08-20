import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 清瀬市 保育園入園 選考基準指数・調整指数データ
// 出典: 清瀬市「令和8年度 清瀬市保育園等入園・在園のしおり」2-9 清瀬市保育園 入園選考基準
//       https://www.city.kiyose.lg.jp/_res/projects/default_project/_page_/001/015/301/siori.pdf
// ---------------------------------------------------------------------------
// 清瀬市は「保育の選考基準指数（保護者それぞれ）＋ 保育の調整指数」の合算方式。
// 就労は「月あたりの日数」と「月あたりの就労時間」の組み合わせで判定し、
// 保護者ひとり最大50点。フルタイム共働きで100点が基本ライン。
//
// しおりの注意書き（そのまま実装に反映している）:
// - 調整指数のうち「保護者」（就労状態と身体状態）は保護者それぞれに加点・減点する
// - それ以外は世帯に対しての加点・減点で、**加点が複数該当する場合はいちばん高い指数だけ**、
//   減点が複数該当する場合はすべてを減点する
//   → 世帯の加点はひとつだけ選ぶ質問にまとめ、減点は項目ごとに分けている
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kiyose',
  name: '清瀬市',
  slug: 'kiyose',
  prefecture: '東京都',
  maxBasePoints: 100, // 保護者各50点
} as const;

// ---------------------------------------------------------------------------
// 保育の選考基準指数（表－1）の選択肢。保護者ひとり最大50点
// ---------------------------------------------------------------------------

/** 就労（外勤・在宅勤務・自営業）。日数と月の就労時間の組み合わせで決まる */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ月160時間以上（50）', value: `${prefix}_employment_50`, points: 50 },
  { label: '月20日以上かつ月140時間以上160時間未満（48）', value: `${prefix}_employment_48`, points: 48 },
  { label: '月20日以上かつ月100時間以上140時間未満（45）', value: `${prefix}_employment_45`, points: 45 },
  { label: '月16日以上かつ月128時間以上（40）', value: `${prefix}_employment_40`, points: 40 },
  { label: '月16日以上かつ月112時間以上128時間未満（38）', value: `${prefix}_employment_38`, points: 38 },
  { label: '月16日以上かつ月80時間以上112時間未満（35）', value: `${prefix}_employment_35`, points: 35 },
  { label: '月12日以上かつ月96時間以上（30）', value: `${prefix}_employment_30`, points: 30 },
  { label: '月12日以上かつ月84時間以上96時間未満（28）', value: `${prefix}_employment_28`, points: 28 },
  { label: '月12日以上かつ月48時間以上84時間未満（25）', value: `${prefix}_employment_25`, points: 25 },
  { label: '上記以外・日数や時間が確認できない（15）', value: `${prefix}_employment_15`, points: 15 },
];

/** 求職・就労内定 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定先はあるが内定証明がない（20）', value: `${prefix}_jobseeking_20`, points: 20 },
  { label: '内定先がない（15）', value: `${prefix}_jobseeking_15`, points: 15 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'おおむね1か月以上の入院を要する（50）', value: `${prefix}_illness_50_hospital`, points: 50 },
  { label: '常時病臥（入院に相当する治療や常時安静が必要）（50）', value: `${prefix}_illness_50_bedridden`, points: 50 },
  { label: '精神性の疾病（30）', value: `${prefix}_illness_30_mental`, points: 30 },
  { label: '一般療養で週に3回以上の通院または安静が必要（30）', value: `${prefix}_illness_30`, points: 30 },
  { label: '一般療養で上記以外（20）', value: `${prefix}_illness_20`, points: 20 },
];

/** 心身障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1〜2級／愛の手帳1〜2度（50）', value: `${prefix}_disability_50`, points: 50 },
  { label: '精神障害者保健福祉手帳1〜2級／要介護度5〜4（50）', value: `${prefix}_disability_50_mental`, points: 50 },
  { label: '身体障害者手帳3級／愛の手帳3度（40）', value: `${prefix}_disability_40`, points: 40 },
  { label: '精神障害者保健福祉手帳3級／要介護度3〜2（40）', value: `${prefix}_disability_40_mental`, points: 40 },
  { label: '身体障害者手帳4〜6級／愛の手帳4度（30）', value: `${prefix}_disability_30`, points: 30 },
  { label: '要介護度1〜要支援（30）', value: `${prefix}_disability_30_care`, points: 30 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居の親族が重度の障害者、または常時臥床で全介助が必要（50）', value: `${prefix}_care_50`, points: 50 },
  { label: '同居の親族の介護・看護（上記以外）（30）', value: `${prefix}_care_30`, points: 30 },
  { label: '同居以外の親族の介護・看護や付き添いが週5日以上（35）', value: `${prefix}_care_35`, points: 35 },
  { label: '同居以外の親族の介護・看護や付き添いが週3日以上（25）', value: `${prefix}_care_25`, points: 25 },
  { label: '上記以外の介護・看護（20）', value: `${prefix}_care_20`, points: 20 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日を中心に前後2か月（計5か月）の期間内（45）', value: `${prefix}_childbirth_45`, points: 45 },
];

/**
 * 就学（技能習得）。
 * しおりでは自宅外の就学は「就労の指数に準ずる」とあるので、就労と同じ区分を並べている
 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '自宅外で月20日以上かつ月160時間以上（50）', value: `${prefix}_education_50`, points: 50 },
  { label: '自宅外で月20日以上かつ月140時間以上160時間未満（48）', value: `${prefix}_education_48`, points: 48 },
  { label: '自宅外で月20日以上かつ月100時間以上140時間未満（45）', value: `${prefix}_education_45`, points: 45 },
  { label: '自宅外で月16日以上かつ月128時間以上（40）', value: `${prefix}_education_40`, points: 40 },
  { label: '自宅外で月16日以上かつ月112時間以上128時間未満（38）', value: `${prefix}_education_38`, points: 38 },
  { label: '自宅外で月16日以上かつ月80時間以上112時間未満（35）', value: `${prefix}_education_35`, points: 35 },
  { label: '自宅外で月12日以上かつ月96時間以上（30）', value: `${prefix}_education_30`, points: 30 },
  { label: '自宅外で月12日以上かつ月84時間以上96時間未満（28）', value: `${prefix}_education_28`, points: 28 },
  { label: '自宅外で月12日以上かつ月48時間以上84時間未満（25）', value: `${prefix}_education_25`, points: 25 },
  { label: '自宅で就学している（30）', value: `${prefix}_education_30_home`, points: 30 },
];

/** 不存在（死亡・離婚・行方不明・拘禁など） */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡・離婚・行方不明・拘禁など（50）', value: `${prefix}_absence_50`, points: 50 },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災などによる家屋の損傷、その他災害復旧のため保育に当たれない（50）', value: `${prefix}_disaster_50`, points: 50 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問
// ---------------------------------------------------------------------------

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
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事を探している・就労内定', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている・技能習得中', value: `${prefix}_reason_education`, points: 0 },
      { label: '死亡・離婚・行方不明など', value: `${prefix}_reason_absence`, points: 0 },
      { label: '災害の復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '外勤・在宅勤務・自営業のいずれも同じ基準です。月あたりの日数と月あたりの就労時間で決まります',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      helpText: '入園月中に就労を始める内定証明（日数・時間が分かるもの）がある場合は、就労の指数から5点引いた指数になります',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
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
      label: `${parentLabel}はどのように介護・看護をしていますか？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '自宅外で就学している場合は就労と同じ基準です',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は死亡・離婚・行方不明などにあたりますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 保育の調整指数（表－2）
// ---------------------------------------------------------------------------

/** 保護者ごとの調整（就労状態と身体状態は保護者それぞれに加点・減点する） */
function buildParentAdjustments(parentNum: 1 | 2): Question[] {
  const prefix = `adj_parent${parentNum}`;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';
  return [
    {
      id: `${prefix}_workplace`,
      category: 'adjustment',
      label: `${parentLabel}は親族の経営する職場に勤めていますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_workplace_no`, points: 0 },
        { label: 'はい（-5）', value: `${prefix}_workplace_yes`, points: -5 },
      ],
    },
    {
      id: `${prefix}_health`,
      category: 'adjustment',
      label: `${parentLabel}は働きながら病気や障害を抱えていますか？`,
      helpText: '保育が困難であることを証明する書類の添付が必要です',
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_health_no`, points: 0 },
        { label: 'はい（+10）', value: `${prefix}_health_yes`, points: 10 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  ...buildParentAdjustments(1),
  ...buildParentAdjustments(2),
  {
    // しおり（5）のとおり、世帯の加点は複数該当してもいちばん高いものだけが付く
    id: 'adj_household_bonus',
    category: 'adjustment',
    label: '世帯にあてはまるもののうち、いちばん加点の大きいものは？',
    helpText: '清瀬市は世帯への加点が複数あてはまる場合、いちばん高い加点だけを付けます',
    inputType: 'select',
    options: [
      { label: 'あてはまるものはない', value: 'adj_household_bonus_none', points: 0 },
      { label: 'ひとり親家庭で、親族や第三者と同居していない（+10）', value: 'adj_household_bonus_single_parent', points: 10 },
      { label: '生活保護を受けていて、就労または求職の事由で申し込む（+10）', value: 'adj_household_bonus_welfare', points: 10 },
      { label: '多胎児（双子・三つ子など）の同時申し込み（+7）', value: 'adj_household_bonus_multiple_birth', points: 7 },
      { label: '入園希望月に兄弟姉妹が市内の認可保育施設に在園している（+5）', value: 'adj_household_bonus_sibling_enrolled', points: 5 },
      { label: '保護者が市外に単身赴任していて、同居している大人がいない（+5）', value: 'adj_household_bonus_single_posting', points: 5 },
      { label: '全介護・重度障害の親族が同居している（介護・看護の事由以外での申し込み）（+5）', value: 'adj_household_bonus_care_relative', points: 5 },
      { label: '申込児童が認可外施設に月48時間以上・2か月以上通っている（+3）', value: 'adj_household_bonus_unlicensed', points: 3 },
      { label: '兄弟姉妹で同時に申し込む（新規）（+2）', value: 'adj_household_bonus_sibling_same_time', points: 2 },
      { label: '同一世帯に養育している小学生未満の児童がいる（+1）', value: 'adj_household_bonus_preschool_child', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave_extension',
    category: 'adjustment',
    label: '入園できなかった場合に育児休業を延長できるとして、ほかの方の利用調整を優先することに同意しますか？',
    helpText: '申込書のチェック欄です。同意すると大きく減点されますが、定員に空きがあれば内定することがあります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_extension_no', points: 0 },
      { label: 'はい（-70）', value: 'adj_parental_leave_extension_yes', points: -70 },
    ],
  },
  {
    id: 'adj_healthy_relative',
    category: 'adjustment',
    label: '健康で無職の65歳未満の親族や第三者と同居していますか？',
    helpText: '申出書の添付が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_healthy_relative_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_healthy_relative_yes', points: -10 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料などの滞納がありますか？',
    helpText: '正当な理由なく審査時点で世帯に滞納がある場合です',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_arrears_no', points: 0 },
      { label: '3か月以上の滞納（-20）', value: 'adj_arrears_3m', points: -20 },
      { label: '6か月以上の滞納（-40）', value: 'adj_arrears_6m', points: -40 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '入園・転園から6か月以内の転園の申し込みですか？',
    helpText: '入園月・転園月を含めて6か月以内の転園申し込みが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_transfer_yes', points: -5 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '今年度中に入園の内定を辞退したことがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい（-15）', value: 'adj_declined_yes', points: -15 },
    ],
  },
  {
    id: 'adj_single_choice',
    category: 'adjustment',
    label: '希望する園は1園だけですか？',
    helpText: '転園の申し込みは対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ（2園以上を希望する）', value: 'adj_single_choice_no', points: 0 },
      { label: 'はい（1園のみ）（-1）', value: 'adj_single_choice_yes', points: -1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kiyoseData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
