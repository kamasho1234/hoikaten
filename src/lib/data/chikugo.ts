import type { MunicipalityData, Question } from '../types';

// 出典: 筑後市「令和8年度筑後市保育施設の利用調整に関する基準」
// https://www.city.chikugo.lg.jp/var/rev0/0056/3263/1253711136.pdf
// 掲載ページ: https://www.city.chikugo.lg.jp/kosodate/_6015/_6022/_20591.html
// 計算方式: sum方式（別表①の末尾に「父母それぞれの指数を合算し基準指数とする」と明記）
// 最高基準指数: 20（父母各10点）
// 注:
//  - ひとり親家庭は別表①の末尾で「基準指数に『10点を加点』する」とされ、
//    別表②の世帯の状況でも「ひとり親世帯（母子、父子家庭）10」が加点される。
//    どちらも同じ世帯に適用されるため、合わせて+20点の1問にまとめている。
//  - この基準は保育所・地域型保育施設・認定こども園（3歳未満児）向けの別表②を実装している。
//    認定こども園の3歳以上児は別表③（項目が少ない）が使われるため、結果は目安になる。
//  - 「求職活動」は原典が「雇用予定の証明があれば家庭外労働の基準を準用」としているため、
//    証明がある場合は該当する就労区分を選ぶよう helpText で案内している。
//  - 「就学」も原典が「日中の外出が常態の場合に限り、家庭外労働の基準を準用」としているが、
//    指数欄に3と記載があるためその値で実装し、準用の扱いは helpText に記している。
//  - 除外: 別表②の「災害等による被災（避難）世帯」「児童・世帯等の特殊事情」は
//    原典に「※については、当該児童・世帯の状況に応じて別途判断する」とあり点数が定まらないため
//    対象外。同順位のときの優先順位（未就学児の人数・待機期間・希望順位など）も点数ではないため対象外。

const municipality = {
  id: 'chikugo',
  name: '筑後市',
  slug: 'chikugo',
  prefecture: '福岡県',
  maxBasePoints: 20, // 父母各10点
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労 居宅外での就労（家庭外労働・自営業・農業等を除く）
    { label: '家庭外労働（自営業・農業等を除く）：1か月に160時間以上の就労', value: `${prefix}_out_160`, points: 10 },
    { label: '家庭外労働（自営業・農業等を除く）：1か月に150時間以上の就労', value: `${prefix}_out_150`, points: 9 },
    { label: '家庭外労働（自営業・農業等を除く）：1か月に140時間以上の就労', value: `${prefix}_out_140`, points: 8 },
    { label: '家庭外労働（自営業・農業等を除く）：1か月に130時間以上の就労', value: `${prefix}_out_130`, points: 7 },
    { label: '家庭外労働（自営業・農業等を除く）：1か月に120時間以上の就労', value: `${prefix}_out_120`, points: 6 },
    { label: '家庭外労働（自営業・農業等を除く）：1か月に100時間以上の就労', value: `${prefix}_out_100`, points: 5 },
    { label: '家庭外労働（自営業・農業等を除く）：1か月に80時間以上の就労', value: `${prefix}_out_80`, points: 4 },
    { label: '家庭外労働（自営業・農業等を除く）：1か月に60時間以上の就労', value: `${prefix}_out_60`, points: 3 },
    // 就労 事業主または（有給の）雇用者／自営業・農業 等
    { label: '事業主・有給の雇用者（自営業、農業等）：1か月に160時間以上の就労', value: `${prefix}_own_160`, points: 10 },
    { label: '事業主・有給の雇用者（自営業、農業等）：1か月に150時間以上の就労', value: `${prefix}_own_150`, points: 9 },
    { label: '事業主・有給の雇用者（自営業、農業等）：1か月に140時間以上の就労', value: `${prefix}_own_140`, points: 8 },
    { label: '事業主・有給の雇用者（自営業、農業等）：1か月に130時間以上の就労', value: `${prefix}_own_130`, points: 7 },
    { label: '事業主・有給の雇用者（自営業、農業等）：1か月に120時間以上の就労', value: `${prefix}_own_120`, points: 6 },
    { label: '事業主・有給の雇用者（自営業、農業等）：1か月に100時間以上の就労', value: `${prefix}_own_100`, points: 5 },
    { label: '事業主・有給の雇用者（自営業、農業等）：1か月に80時間以上の就労', value: `${prefix}_own_80`, points: 4 },
    { label: '事業主・有給の雇用者（自営業、農業等）：1か月に60時間以上の就労', value: `${prefix}_own_60`, points: 3 },
    // 就労 その他（無給、農業手伝い等）
    { label: 'その他の就労（無給、農業手伝い等）：1か月に160時間以上の就労', value: `${prefix}_etc_160`, points: 5 },
    { label: 'その他の就労（無給、農業手伝い等）：1か月に120時間以上の就労', value: `${prefix}_etc_120`, points: 4 },
    { label: 'その他の就労（無給、農業手伝い等）：1か月に80時間以上の就労', value: `${prefix}_etc_80`, points: 3 },
    { label: 'その他の就労（無給、農業手伝い等）：1か月に60時間以上の就労', value: `${prefix}_etc_60`, points: 2 },
    // 家庭内労働 内職
    { label: '家庭内労働（内職）：1か月に120時間以上の内職', value: `${prefix}_naishoku_120`, points: 4 },
    { label: '家庭内労働（内職）：1か月に60時間以上の内職', value: `${prefix}_naishoku_60`, points: 2 },
    // その他 求職活動
    { label: '求職活動中（雇用予定の証明はない）', value: `${prefix}_seek`, points: 1 },
    // 病気等
    { label: '病気等（入院）：1か月以上を要する場合', value: `${prefix}_hosp`, points: 10 },
    { label: '病気等（自宅療養）：常時安静（ねたきりの状態等）', value: `${prefix}_ill_bed`, points: 10 },
    { label: '病気等（自宅療養）：他者の援助（介護）が必要', value: `${prefix}_ill_care`, points: 7 },
    { label: '病気等（自宅療養）：日常生活は一人で可能（常時保育は困難）', value: `${prefix}_ill_light`, points: 4 },
    // 障がい（身体・精神・療育手帳、障害年金）
    { label: '障がい：1級（身体・精神）、A（療育）、障害年金1級', value: `${prefix}_dis_10`, points: 10 },
    { label: '障がい：2級（身体）', value: `${prefix}_dis_9`, points: 9 },
    { label: '障がい：3級（身体）、B1（療育）、2級（精神）、障害年金2級', value: `${prefix}_dis_7`, points: 7 },
    { label: '障がい：4〜6級（身体）、B2（療育）、3級（精神）、障害年金3級', value: `${prefix}_dis_6`, points: 6 },
    { label: '障がい：上記以外の状態で保育が困難な場合', value: `${prefix}_dis_4`, points: 4 },
    // 介護・看護
    { label: '介護・看護：重度障害者、精神疾患の者等を常時介護・看護', value: `${prefix}_care_10`, points: 10 },
    { label: '介護・看護：上記以外の者の自宅介護・看護を常態', value: `${prefix}_care_4`, points: 4 },
    // 就学
    { label: '就学：日中の外出が常態の場合', value: `${prefix}_school`, points: 3 },
    // 妊娠・出産
    { label: '妊娠・出産：産前2か月〜産後2か月', value: `${prefix}_birth`, points: 10 },
    // その他
    { label: 'その他：上記のほか明らかに保育できないと判断されるもの', value: `${prefix}_other`, points: 10 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育を必要とする理由（基準指数）`,
      helpText:
        '最も当てはまるものを1つ選んでください。就労時間に通勤時間は含みません。求職活動は雇用予定の証明があれば家庭外労働の基準が準用されるため、証明がある場合は該当する就労区分を選んでください。就学も日中の外出が常態の場合に限り家庭外労働の基準が準用されます。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親世帯（母子・父子家庭）ですか？',
    helpText:
      '筑後市では基準指数に+10点、調整指数でも+10点が加わるため、合わせて+20点になります。証明書類があれば離婚調停中も含みます。',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hitorioya_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_hitorioya_yes', points: 20 },
      {
        label: 'ひとり親状態にあるとみなされる世帯（単身赴任等で別居状態）（+5）',
        value: 'adj_hitorioya_tanshin',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_hogo',
    category: 'adjustment',
    label: '生活保護を受給している世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hogo_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_hogo_yes', points: 20 },
    ],
  },
  {
    id: 'adj_youhogo',
    category: 'adjustment',
    label: '子どもを守る地域ネットワーク等で保育が必要と認められていますか？（要保護児童など）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_youhogo_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_youhogo_yes', points: 20 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育・教育施設または学童保育所で働いていますか？',
    helpText:
      '保育士等とは保育士・幼稚園教諭・保育教諭・放課後児童支援員を指します（市内施設の場合は放課後児童支援員を含みます）。',
    inputType: 'select',
    options: [
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
      { label: '市内施設の保育士等である（+20）', value: 'adj_hoikushi_shinai', points: 20 },
      { label: '市外施設の保育士等である（+2）', value: 'adj_hoikushi_shigai', points: 2 },
      { label: '市内施設で働く職員（保育士等を除く）（+2）', value: 'adj_hoikushi_staff', points: 2 },
    ],
  },
  {
    id: 'adj_kyodai_zaiseki',
    category: 'adjustment',
    label: '兄弟姉妹が既に入所している園を希望していますか？',
    helpText: '兄弟姉妹の在籍園以外を希望する場合は含みません。',
    inputType: 'select',
    options: [
      { label: '該当なし', value: 'adj_kyodai_zaiseki_none', points: 0 },
      { label: '兄弟姉妹が既に入所している園を希望する（+7）', value: 'adj_kyodai_zaiseki_same', points: 7 },
      {
        label: '兄弟姉妹が既に入所している園の連携施設を希望する（+3）',
        value: 'adj_kyodai_zaiseki_renkei',
        points: 3,
      },
    ],
  },
  {
    id: 'adj_kyodai_doji',
    category: 'adjustment',
    label: '兄弟姉妹や多胎児が同時に入所を希望していますか？',
    helpText: '兄弟姉妹が在園児の場合は除きます（その場合は上の設問が該当します）。',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kyodai_doji_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_kyodai_doji_yes', points: 3 },
    ],
  },
  {
    id: 'adj_zaien',
    category: 'adjustment',
    label: '申込児童は今どこかの施設に通っていますか？',
    helpText:
      '在園・卒園予定が確認できるときのみ加点されます。認可外保育施設は月15日以上かつ1日5時間以上の常時利用が対象です。',
    inputType: 'select',
    options: [
      { label: '通っていない', value: 'adj_zaien_none', points: 0 },
      {
        label: '保育所・認定こども園等の在園児で、入所中の園以外への転園を希望する（+5）',
        value: 'adj_zaien_tenen',
        points: 5,
      },
      {
        label: '地域型保育施設の卒園児で、連携施設以外への入所を希望する（+5）',
        value: 'adj_zaien_sotsuen',
        points: 5,
      },
      { label: '届出保育施設（認可外）に常時通っている（+3）', value: 'adj_zaien_ninkagai', points: 3 },
    ],
  },
  {
    id: 'adj_shogai_child',
    category: 'adjustment',
    label: '申込児童に障がいがありますか？',
    inputType: 'select',
    options: [
      { label: '該当なし', value: 'adj_shogai_child_none', points: 0 },
      {
        label: '身体1・2級、精神1級、療育A、特別児童扶養手当1級（+5）',
        value: 'adj_shogai_child_5',
        points: 5,
      },
      {
        label: '身体3級、精神2級、療育B1、特別児童扶養手当2級（+3）',
        value: 'adj_shogai_child_3',
        points: 3,
      },
      { label: '身体4〜6級、精神3級、療育B2（+2）', value: 'adj_shogai_child_2', points: 2 },
    ],
  },
  {
    id: 'adj_ikukyu',
    category: 'adjustment',
    label: '育児休業の状況にあてはまるものはありますか？',
    helpText:
      '産後休業・育児休業明けの加点は、就労証明書によりその期間が確認できる場合のみです。弟妹の出産による育児休業中は減点されます（産後2か月を除く）。',
    inputType: 'select',
    options: [
      { label: '該当なし', value: 'adj_ikukyu_none', points: 0 },
      { label: '産後休業・育児休業明けである（+2）', value: 'adj_ikukyu_ake', points: 2 },
      {
        label: '申込児童の弟妹出産により母が育児休業中である（−3）',
        value: 'adj_ikukyu_chu',
        points: -3,
      },
    ],
  },
  {
    id: 'adj_tashi',
    category: 'adjustment',
    label: '中学生までの兄弟姉妹が3人以上同居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tashi_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_tashi_yes', points: 1 },
    ],
  },
];

export const chikugoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
