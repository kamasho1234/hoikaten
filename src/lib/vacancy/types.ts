// 保育所等の空き状況データの型定義
//
// JSON の実体は scripts/fetch-yokohama-vacancy.ts が公式CSVから生成する。
// 施設サイトのURLだけは別ファイル（*-websites.json）で持ち、index.ts で結合する。

/** 0歳児〜5歳児の6要素。null は「そのクラスを設けていない」で、0（空きなし）とは区別する */
export type AgeValues = (number | null)[];

/** 施設サイトのリンク先。園そのものか、運営法人か、自治体のページかを区別する */
export type FacilityWebsite = {
  url: string;
  type: "facility" | "corp" | "city";
};

export type VacancyFacility = {
  /** 公式CSVの施設番号。3ファイルの結合キー */
  id: string;
  name: string;
  /** VacancyDataset.wards のインデックス */
  w: number;
  /** 受入可能数 */
  vacancy: AgeValues;
  /** 入所待ち人数（＝園ごとの申請数。重複計上あり。index.ts の calcRatio 参照） */
  waiting: AgeValues;
  /** 入所児童数 */
  enrolled: AgeValues;
  /** 当サイトで調べた施設サイト。確認できなかった施設には付けない */
  site?: FacilityWebsite;
};

export type VacancyDataset = {
  municipalitySlug: string;
  municipalityName: string;
  /** 公式データの基準日 (YYYY-MM-DD) */
  asOf: string;
  /** 当サイトが取得した日 (YYYY-MM-DD) */
  fetchedAt: string;
  sourceName: string;
  sourceUrl: string;
  /** 結合元の3ファイルのURL */
  sourceFiles: {
    vacancy: string;
    waiting: string;
    enrolled: string;
  };
  /** 区の一覧。公式CSVの出現順（行政区の順） */
  wards: string[];
  facilities: VacancyFacility[];
};

/** 市全体の年齢別サマリー */
export type AgeSummary = {
  /** 0〜5 */
  age: number;
  vacancy: number;
  waiting: number;
  enrolled: number;
  /** 空き1枠あたりの申込数。受入可能数が0なら null */
  ratio: number | null;
  facilitiesWithVacancy: number;
};

/** 区別サマリー */
export type WardSummary = {
  ward: string;
  facilityCount: number;
  vacancy: number;
  waiting: number;
  ratio: number | null;
  facilitiesWithVacancy: number;
};
