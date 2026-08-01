import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.nonoichi.lg.jp/uploaded/attachment/40982.pdf
//       （野々市市「令和8年度保育利用調整基準（抄）」）
// 野々市市（石川県）保育利用調整基準（基本点数）
// 計算方式: min方式（原典の注記に「調整時は保護者のうち最も低い指数を採用する。
//           【例】父の指数：100、母の指数：90→調整時は母の指数を採用」と明記）。
// 最高基準点: 100
// 注:
//  - 該当する要件が複数ある場合は、原典の注記どおり指数が高い要件を採用するため単一選択。
//  - 就労時間には休憩時間を含み、通勤時間を含まない（原典注記）。
//  - 野々市市の「調整項目」は加減点ではなく優先（高）・（中）・（低）のランクで定められており、
//    固定点数が存在しないため調整指数の設問は設けていない。
//  - 基本点数の「その他（50点／特に保育が必要な状態にあると認めた場合）」および
//    「市長が特に保育が必要な状態にあると認めた場合（虐待・DV等／点数の定めなし）」は、
//    いずれも市の個別判断によるため実装対象外。
//  - 「出産」は原典に父母の区別がないため父母どちらにも設定。

const municipality = {
  id: 'nonoichi',
  name: '野々市市',
  slug: 'nonoichi',
  prefecture: '石川県',
  maxBasePoints: 100,
  scoringMethod: 'min',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労（最低月48時間以上の就労／週3日以上又は月12日以上）
    { label: '就労：週40時間（月160時間）以上', value: `${prefix}_work_160`, points: 100 },
    { label: '就労：週35時間（月140時間）以上', value: `${prefix}_work_140`, points: 90 },
    { label: '就労：週30時間（月120時間）以上', value: `${prefix}_work_120`, points: 80 },
    { label: '就労：週24時間（月96時間）以上', value: `${prefix}_work_96`, points: 70 },
    { label: '就労：週16時間（月64時間）以上', value: `${prefix}_work_64`, points: 60 },
    { label: '就労：週12時間（月48時間）以上', value: `${prefix}_work_48`, points: 50 },
    // ひとり親
    { label: 'ひとり親世帯で週30時間（月120時間）以上の就労', value: `${prefix}_single_120`, points: 100 },
    { label: 'ひとり親世帯で週12時間（月48時間）以上の就労', value: `${prefix}_single_48`, points: 80 },
    { label: 'ひとり親世帯で求職中', value: `${prefix}_single_seek`, points: 60 },
    // 出産
    { label: '出産：出産又は出産予定日の前後8週間（多胎児は産前14週、産後8週間）', value: `${prefix}_birth`, points: 80 },
    // 育児休業中
    { label: '育児休業中（継続入園のみ可）', value: `${prefix}_ikukyu`, points: 60 },
    // 疾病等
    { label: '疾病等：長期入院相当で常に病臥している場合', value: `${prefix}_ill_hosp`, points: 100 },
    { label: '疾病等：安静状態相当で保育が常時困難である場合', value: `${prefix}_ill_rest`, points: 70 },
    { label: '疾病等：通院加療（上記以外）相当で保育に支障をきたす場合', value: `${prefix}_ill_visit`, points: 50 },
    // 障害
    { label: '障害：身体障害者手帳1〜2級／精神障害者保健福祉手帳1〜2級／療育手帳A', value: `${prefix}_dis_1`, points: 100 },
    { label: '障害：身体障害者手帳3級／精神障害者保健福祉手帳3級／療育手帳B', value: `${prefix}_dis_3`, points: 80 },
    { label: '障害：身体障害者手帳4級', value: `${prefix}_dis_4`, points: 60 },
    // 同居又は長期入院の親族等の介護・看護
    { label: '介護・看護：保育が常時困難な場合', value: `${prefix}_care_h`, points: 80 },
    { label: '介護・看護：保育に支障がある場合', value: `${prefix}_care_l`, points: 60 },
    // 災害
    { label: '災害：火災・震災・風水害等で家屋が失われて復旧にあたっているもの', value: `${prefix}_disaster`, points: 100 },
    // 就学
    { label: '就学：週30時間（月120時間）以上の就学', value: `${prefix}_school_120`, points: 80 },
    { label: '就学：週12時間（月48時間）以上の就学', value: `${prefix}_school_48`, points: 50 },
    // 求職中
    { label: '求職中：生計中心者が失業し、求職中', value: `${prefix}_seek_main`, points: 60 },
    { label: '求職中：上記の世帯以外で、求職中', value: `${prefix}_seek_other`, points: 20 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育を必要とする理由・状況`,
      helpText:
        '最も当てはまる状況を1つ選んでください（該当する要件が複数ある場合は指数が高い要件を採用します）。就労時間には休憩時間を含み、通勤時間は含みません。世帯の指数は父母のうち最も低い指数を採用します。',
      inputType: 'select',
      options,
    },
  ];
}

// 野々市市の調整項目は優先（高）・（中）・（低）のランクで定められており、
// 加減点となる固定点数が公表されていないため、調整指数の設問は設けていない。
const adjustmentQuestions: Question[] = [];

export const nonoichiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
