import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 泉佐野市 特定保育施設及び地域型保育事業入所判定基準表（基本項目・利用調整項目）データ
//
// 出典: 泉佐野市子育て支援課「特定保育施設及び地域型保育事業入所判定基準表」（令和2年度以降）
//       https://www.city.izumisano.lg.jp/material/files/group/16/tokuteihoikusisetunyuushohannteikijyunn2020.pdf
//       （泉佐野市Webサイト「認定こども園・保育園の利用調整(選考)基準について」
//         https://www.city.izumisano.lg.jp/kakuka/kodomo/kosodate/menu/hoikusho/1596012030245.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 計算方式: min方式。原典の注記「※2 保護者が複数いる場合は、低い方を基本点とする。」による。
//
// 質問に含めていない原典の項目（点数ではなく「最優先」として扱われるもの）:
//   ・虐待又はDVのおそれがあることに該当する場合など、社会的養護が必要な場合
//   ・地域型保育事業の卒園児童（連携施設への入所）
// また「その他（市長が認める前各号に類する状態）5〜10点」は幅があるため、下限の5点で見積もる。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'izumisano',
  name: '泉佐野市',
  slug: 'izumisano',
  prefecture: '大阪府',
  maxBasePoints: 10, // 保護者のうち低い方を基本点とするため、世帯の基本点は最大10点
  scoringMethod: 'min',
} as const;

// ---------------------------------------------------------------------------
// 1 基本項目採点基準。父母それぞれについて選び、低い方が世帯の基本点になる
// ---------------------------------------------------------------------------

/** 1 居宅外労働（農業・漁業・林業は居宅外の自営業として扱う） */
const outsideWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_none`, points: 0 },
  { label: '常勤（常勤雇用されているもの）', value: `${prefix}_outside_10`, points: 10 },
  {
    label: 'パート・自営中心者：週4日以上かつ日中8時間以上',
    value: `${prefix}_outside_9`,
    points: 9,
  },
  {
    label: 'パート・自営中心者：週4日以上かつ日中6時間以上8時間未満',
    value: `${prefix}_outside_8`,
    points: 8,
  },
  { label: '自営協力者：週4日以上かつ日中8時間以上', value: `${prefix}_outside_7`, points: 7 },
  { label: '自営協力者：週4日以上かつ日中6時間以上', value: `${prefix}_outside_6`, points: 6 },
  { label: '訪問販売等：週4日以上かつ日中6時間以上', value: `${prefix}_outside_hanbai_6`, points: 6 },
];

/** 2 居宅内労働 */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '自営中心者：週4日以上かつ日中8時間以上', value: `${prefix}_home_9`, points: 9 },
  { label: '自営中心者：週4日以上かつ日中6時間以上', value: `${prefix}_home_7`, points: 7 },
  { label: '自営協力者：週4日以上かつ日中8時間以上', value: `${prefix}_home_6`, points: 6 },
  { label: '自営協力者：週4日以上かつ日中6時間以上', value: `${prefix}_home_5`, points: 5 },
  { label: '内職：週4日以上かつ日中6時間以上', value: `${prefix}_home_naishoku_5`, points: 5 },
];

/** 3 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中であるか、または出産後間がない', value: `${prefix}_childbirth_5`, points: 5 },
];

/** 4 病気等（疾病等・心身障害者） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病等：入院', value: `${prefix}_illness_10`, points: 10 },
  { label: '疾病等：自宅療養（常時病臥）', value: `${prefix}_illness_8`, points: 8 },
  { label: '疾病等：自宅療養（上記以外）', value: `${prefix}_illness_6`, points: 6 },
  {
    label: '心身障害者：重度（身体1・2級、療育A、精神1級）',
    value: `${prefix}_illness_disability_10`,
    points: 10,
  },
  {
    label: '心身障害者：中度（身体3級、療育B1、精神2級）',
    value: `${prefix}_illness_disability_8`,
    points: 8,
  },
  { label: '心身障害者：軽度（上記以外）', value: `${prefix}_illness_disability_6`, points: 6 },
];

/** 5 介護（いずれも週4日以上かつ日中6時間以上） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院の親族の介護・付添い', value: `${prefix}_care_7`, points: 7 },
  { label: '自宅療養中の親族の介護・看護', value: `${prefix}_care_6a`, points: 6 },
  { label: '心身に障害のある親族の介護、病院・施設への送迎', value: `${prefix}_care_6b`, points: 6 },
];

/** 6 災害の復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災、風水害、火災等の復旧にあたっている（ボランティアは不可）',
    value: `${prefix}_disaster_10`,
    points: 10,
  },
];

/** 7 その他 */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '両親のいない家庭（死別・離別・行方不明等）', value: `${prefix}_other_absent_10`, points: 10 },
  { label: '就学：居宅外労働に準じる（上位）', value: `${prefix}_other_school_9`, points: 9 },
  { label: '就学：居宅外労働に準じる（下位）', value: `${prefix}_other_school_8`, points: 8 },
  { label: '市長が認める前各号に類する状態', value: `${prefix}_other_etc_5`, points: 5 },
  { label: '短時間就労等（週3日以下または日中6時間未満の就労等）', value: `${prefix}_other_short_4`, points: 4 },
  { label: '就労先決定（就職内定等の証明書で就労予定が確認できる）', value: `${prefix}_other_offer_3`, points: 3 },
  {
    label: '求職中（仕事を探しているがまだ決まっていない。入所後の就労希望を含む）',
    value: `${prefix}_other_job_1`,
    points: 1,
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
    helpText: '泉佐野市は保護者が複数いる場合、点数の低い方が世帯の基本点になります',
    inputType: 'select',
    options: [
      { label: '居宅外で働いている（農業・漁業・林業を含む）', value: `${prefix}_reason_outside`, points: 0 },
      { label: '居宅内で働いている（内職を含む）', value: `${prefix}_reason_home`, points: 0 },
      { label: '妊娠中・出産後間がない', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障害がある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: 'その他（就学・短時間就労・求職など）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside`,
      category,
      label: `${parentLabel}の居宅外労働の状況は？`,
      helpText: '農業・漁業・林業は居宅外の自営業として扱われます',
      inputType: 'radio',
      options: outsideWorkOptions(prefix),
    },
    {
      id: `${prefix}_home`,
      category,
      label: `${parentLabel}の居宅内労働の状況は？`,
      inputType: 'radio',
      options: homeWorkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText:
        '認定期間は、出産日（予定日）から起算して8週間を経過する日の翌日が属する月の月末まで（終了月を含めて前4か月以内）です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: 'いずれも週4日以上かつ日中6時間以上が対象です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}のその他の状況は？`,
      helpText:
        '就学は就労を前提としたものに限り、居宅外労働に準じて8〜9点です。「市長が認める前各号に類する状態」は5〜10点の幅がありますが、ここでは下限の5点で見積もります',
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2 利用調整項目採点基準
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '死別・離別・行方不明等。離婚後もなお同居している場合は含みません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労による自立支援につながる場合等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '主として生計を維持する者が失業していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '子どもが障害を有していますか？',
    helpText: '障害児保育実施園のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_leave_end',
    category: 'adjustment',
    label: '育児休業を終了しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_end_no', points: 0 },
      { label: 'はい', value: 'adj_leave_end_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '在園児の兄弟姉妹ですか？',
    helpText: '1号認定を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 10 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒園児童ですか？',
    helpText: '連携施設への入所を希望する場合は、点数ではなく最優先として扱われます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_no', points: 0 },
      { label: 'はい', value: 'adj_chiikigata_yes', points: 2 },
    ],
  },
  {
    id: 'adj_dangerous',
    category: 'adjustment',
    label: '児童のおかれた環境が危険と思われますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dangerous_no', points: 0 },
      { label: 'はい', value: 'adj_dangerous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設等に既に入所していますか？',
    helpText: '地域型保育事業は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 1 },
    ],
  },
  {
    id: 'adj_area',
    category: 'adjustment',
    label: '住所地は大木ですか？',
    helpText: '地域加算の対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_area_no', points: 0 },
      { label: 'はい', value: 'adj_area_yes', points: 4 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士・保育教諭として勤務していますか？',
    helpText: '特定教育・保育施設または特定地域型保育事業所での勤務が対象です。就労予定の場合は1点減となります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_no', points: 0 },
      { label: '市内の施設に勤務している', value: 'adj_hoikushi_4', points: 4 },
      { label: '市内の施設に勤務予定', value: 'adj_hoikushi_3', points: 3 },
      { label: '市外の施設に勤務している', value: 'adj_hoikushi_2', points: 2 },
      { label: '市外の施設に勤務予定', value: 'adj_hoikushi_1', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居祖父母の基本項目採点が4点以下ですか？',
    helpText: '同居の祖父母が基本項目採点基準で4点以下（短時間就労・求職中など）の場合、2点減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（同居していない、または5点以上）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
];

export const izumisanoData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
