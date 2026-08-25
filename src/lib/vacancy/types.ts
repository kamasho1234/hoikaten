// 保育所等の空き状況データの型定義
//
// JSON の実体は scripts/fetch-{slug}-vacancy.ts が公式データから生成する。
// 施設サイトのURLだけは別ファイル（*-websites.json）で持ち、index.ts で結合する。
//
// ## 自治体によって持っている指標が違う
// 横浜市は受入可能数・入所待ち人数・入所児童数の3つを公開しているが、
// 目黒区は空き数しか公開していない。UIは metrics を見て表示を出し分けること。
// 同様に、区に分かれていない自治体（目黒区）では wards が空になり、
// 施設類型を公開している自治体（目黒区）では categories が入る。

/**
 * データセットが公開している指標。
 *
 * "symbol" は、空きを人数ではなく記号（○△×）でしか出していない自治体のためのもの。
 * 記号から人数を決めつけることはできないので、記号のまま持って記号のまま見せる。
 */
export type VacancyMetric = "vacancy" | "waiting" | "enrolled" | "symbol";

/** 0歳児〜5歳児の6要素。null は「そのクラスを設けていない」で、0（空きなし）とは区別する */
export type AgeValues = (number | null)[];

/**
 * 0歳児〜5歳児の6要素。空きを記号で出している自治体で使う。
 * null は「そのクラスを設けていない」。文字は公式の表記をそのまま入れる（"○" "△" "×" など）
 */
export type AgeSymbols = (string | null)[];

/** 記号の意味。自治体ごとに違うので、公式の凡例をそのまま持つ */
export type SymbolLegend = {
  /** 表に出てくる記号 */
  mark: string;
  /** 公式の言い方（「3名以上の空き」など） */
  label: string;
  /** 空きがあるとみなせる記号か。×や空欄は false */
  open: boolean;
};

/** 施設サイトのリンク先。園そのものか、運営法人か、自治体のページかを区別する */
export type FacilityWebsite = {
  url: string;
  type: "facility" | "corp" | "city";
};

export type VacancyFacility = {
  /** 公式データ内で施設を一意に指す値 */
  id: string;
  name: string;
  /** wards のインデックス。区で分かれていない自治体では null */
  w: number | null;
  /** categories のインデックス。施設類型を公開していない自治体では null */
  c?: number | null;
  /** 受入可能数（空き枠）。記号でしか公開されていない自治体では全要素 null になる */
  vacancy: AgeValues;
  /**
   * 空きを記号で出している自治体の、年齢ごとの記号。
   * 人数が分からないので vacancy には入れず、ここに公式の表記のまま持つ
   */
  symbols?: AgeSymbols;
  /** 入所待ち人数。公開していない自治体では持たない */
  waiting?: AgeValues;
  /** 入所児童数。公開していない自治体では持たない */
  enrolled?: AgeValues;
  /**
   * 年齢別に分けず合計だけが公開されている施設の空き数。
   * 目黒区の家庭福祉員（0〜2歳をまとめて1つの枠として公表）がこれにあたる。
   * この場合 vacancy は全要素 null になる。
   */
  vacancyTotal?: number;
  lat?: number;
  lng?: number;
  /** 当サイトで調べた施設サイト。確認できなかった施設には付けない */
  site?: FacilityWebsite;
};

export type VacancyDataset = {
  municipalitySlug: string;
  municipalityName: string;
  /**
   * 都道府県名。点数の基準を持たない自治体（`src/lib/data` にない自治体）でも
   * 一覧で都道府県ごとに並べられるように持つ。基準がある自治体では省く
   */
  prefecture?: string;
  /** 公式データの基準日 (YYYY-MM-DD) */
  asOf: string;
  /** 当サイトが取得した日 (YYYY-MM-DD) */
  fetchedAt: string;
  sourceName: string;
  sourceUrl: string;
  /** 取り込み元ファイルのURL。キーは自治体ごとに異なる */
  sourceFiles: Record<string, string>;
  /** このデータセットが持つ指標。UIの出し分けに使う */
  metrics: VacancyMetric[];
  /**
   * 数値の意味が「今の空き」でないときに、それを一言で示す。
   * 川崎市は毎月「翌月入所ぶんの受入可能数（予定）」を出すため、
   * 横浜市の「その時点の空き」とは意味が違う。見出しの下に表示する。
   */
  subtitle?: string;
  /** 出典欄に転記する自治体固有の注記 */
  notes?: string[];
  /** 入所待ち人数の読み方に関する注意書き（waiting を持つ自治体のみ） */
  waitingCaveat?: string;
  /**
   * 記号の凡例（symbol を持つ自治体のみ）。
   * 「○＝3名以上」のように自治体ごとに意味が違うので、公式の言い方をそのまま持つ
   */
  symbolLegend?: SymbolLegend[];
  /** 区の一覧。区に分かれていない自治体では空配列 */
  wards: string[];
  /** 施設類型の一覧。公開していない自治体では空配列 */
  categories?: string[];
  facilities: VacancyFacility[];
};

/** 市全体の年齢別サマリー。公開されていない指標は null */
export type AgeSummary = {
  /** 0〜5 */
  age: number;
  vacancy: number;
  waiting: number | null;
  enrolled: number | null;
  /** 空き1枠あたりの申込数。waiting が無い、または受入可能数が0なら null */
  ratio: number | null;
  facilitiesWithVacancy: number;
};

/** 区別・施設類型別のサマリー */
export type GroupSummary = {
  /** 区名または施設類型名 */
  name: string;
  facilityCount: number;
  vacancy: number;
  waiting: number | null;
  ratio: number | null;
  facilitiesWithVacancy: number;
};
