/**
 * 空き状況データセットの整合性を検証する
 *
 * 実行: npm run vacancy:verify
 *
 * 自治体を追加・更新したら必ず実行すること。検出したら exit 1。
 *
 * ## 何を見るか
 * 1. 構造 — metrics と実データの食い違い、インデックスの範囲外、IDの重複など
 * 2. 集計の一貫性 — 区別・類型別の合計が全体と合うか
 * 3. 既知の検算値 — 取り込み時に人が確認した数値との照合。
 *    データが更新されると数値は変わるので、**asOf が一致するときだけ**照合する。
 */

import {
  AGE_COUNT,
  facilityVacancy,
  getVacancyData,
  getVacancySlugs,
  hasMetric,
  summarizeByAge,
  summarizeByCategory,
  summarizeByWard,
  totalSummary,
} from "../src/lib/vacancy";

/** 取り込み時に公式データから独立に集計して確認した値 */
const EXPECTED: Record<
  string,
  {
    asOf: string;
    facilityCount: number;
    vacancy: number;
    waiting?: number;
    /**
     * 全クラスが「—」の施設の割合の上限。既定は10%。
     * 「空き数」ではなく「翌月の募集予定人数」を出している自治体は、募集ゼロの園が
     * 普通に2割ほどあるので、公式の合計行と突き合わせたうえで上限を上げる。
     */
    emptyRatio?: number;
    /**
     * 空きを記号で公表している自治体の、記号ごとの施設数（全年齢ぶんの延べ）。
     * 人数の合計が出せないので、代わりにこれを検算値にする
     */
    symbolCounts?: Record<string, number>;
  }
> = {
  yokohama: { asOf: "2026-08-01", facilityCount: 1242, vacancy: 3990, waiting: 13473 },
  meguro: { asOf: "2026-07-23", facilityCount: 118, vacancy: 871 },
  kawasaki: { asOf: "2026-07-27", facilityCount: 579, vacancy: 1863 },
  saitama: { asOf: "2026-08-01", facilityCount: 543, vacancy: 1961 },
  ota: { asOf: "2026-07-02", facilityCount: 220, vacancy: 1092 },
  adachi: { asOf: "2026-08-01", facilityCount: 256, vacancy: 988 },
  edogawa: { asOf: "2026-08-01", facilityCount: 199, vacancy: 459 },
  nerima: { asOf: "2026-07-03", facilityCount: 253, vacancy: 941 },
  setagaya: { asOf: "2026-08-01", facilityCount: 301, vacancy: 895 },
  suginami: { asOf: "2026-07-31", facilityCount: 235, vacancy: 1311 },
  katsushika: { asOf: "2026-07-25", facilityCount: 161, vacancy: 405 },
  shinagawa: { asOf: "2026-07-23", facilityCount: 174, vacancy: 1361 },
  koto: { asOf: "2026-07-23", facilityCount: 213, vacancy: 2355 },
  nakano: { asOf: "2026-09-01", facilityCount: 113, vacancy: 891 },
  shinjuku: { asOf: "2026-07-28", facilityCount: 93, vacancy: 1281 },
  toshima: { asOf: "2026-08-03", facilityCount: 111, vacancy: 652 },
  // 文京区は「空き数」ではなく翌月の募集予定人数。募集ゼロの園が2割ほどあるのが通常
  taito: { asOf: "2026-08-20", facilityCount: 69, vacancy: 387 },
  // 幼保一体施設は保育園（0〜2歳）と幼稚園（3〜5歳）が別行なので、片方だけの施設が4件ある
  kawaguchi: { asOf: "2026-07-27", facilityCount: 200, vacancy: 624 },
  // 立川市も募集ゼロの園が多いのが通常
  tachikawa: { asOf: "2026-09-01", facilityCount: 54, vacancy: 96, emptyRatio: 0.5 },
  // 武蔵野市は公式の合計行（空き数・申込数とも）と取り込み時に突き合わせている
  musashino: { asOf: "2026-07-30", facilityCount: 56, vacancy: 249 },
  // 国分寺市は「定員−人数=空き」を1施設ずつ、合計は別掲の受入可能児童数PDFとも突き合わせている
  kokubunji: { asOf: "2026-08-01", facilityCount: 50, vacancy: 198, emptyRatio: 0.4 },
  // 小金井市は募集ゼロの園が多いのが通常。公式の合計行と取り込み時に突き合わせている
  koganei: { asOf: "2026-08-05", facilityCount: 53, vacancy: 187, emptyRatio: 0.7 },
  // 東村山市は空きゼロの園がほとんど。公式の「計」の行と取り込み時に突き合わせている
  higashimurayama: { asOf: "2026-08-01", facilityCount: 48, vacancy: 30, emptyRatio: 0.8 },
  // 多摩市は1施設ずつ「年齢の和＝その行の合計列」を取り込み時に検算している
  tama: { asOf: "2026-08-01", facilityCount: 31, vacancy: 92, emptyRatio: 0.35 },
  // 清瀬市は空欄が「欠員なし」なので全クラス「—」の施設は出ない
  kiyose: { asOf: "2026-07-29", facilityCount: 24, vacancy: 38 },
  // 東久留米市は行ごとに「年齢の和＝計」を、区分ごとの施設数を別のPDFと突き合わせている
  higashikurume: { asOf: "2026-07-31", facilityCount: 36, vacancy: 36, emptyRatio: 0.75 },
  // 狛江市は1施設ずつ「年齢の和＝合計列」を取り込み時に確かめている
  komae: { asOf: "2026-08-01", facilityCount: 26, vacancy: 35, emptyRatio: 0.6 },
  // 稲城市は空き・待機・受入定員の3つとも合計行と取り込み時に突き合わせている
  inagi: { asOf: "2026-08-01", facilityCount: 22, vacancy: 116, emptyRatio: 0.3 },
  // 国立市は行ごとの「計」と末尾の合計行を取り込み時に突き合わせている
  kunitachi: { asOf: "2026-07-01", facilityCount: 24, vacancy: 91, emptyRatio: 0.4 },
  // 昭島市は空欄が「募集なし」なので全クラス「—」の施設は出ない
  akishima: { asOf: "2026-08-01", facilityCount: 34, vacancy: 55 },
  // 横須賀市は空欄が「空きなし」。合計行と総数の両方を取り込み時に突き合わせている
  yokosuka: { asOf: "2026-08-01", facilityCount: 90, vacancy: 66 },
  // 上尾市は合計行がないので、施設の通し番号が抜けていないことを取り込み時に確かめている
  ageo: { asOf: "2026-08-31", facilityCount: 75, vacancy: 149, emptyRatio: 0.7 },
  // 松山市は1施設ずつ「年齢の和＝合計列」を取り込み時に確かめている
  matsuyama: { asOf: "2026-09-01", facilityCount: 129, vacancy: 52, emptyRatio: 0.85 },
  // 習志野市は空きを記号で公表している。人数の合計が出せないので記号の数で検算する
  narashino: {
    asOf: "2026-07-25",
    facilityCount: 47,
    vacancy: 0,
    symbolCounts: { "○": 45, "△": 34, "×": 155 },
  },
  // 長崎市は「×」だけを付ける形。×のないクラスは「－」として持つ
  nagasaki: {
    asOf: "2026-08-20",
    facilityCount: 126,
    vacancy: 0,
    symbolCounts: { "－": 399, "×": 354 },
  },
  // 高松市は入所可能状況が記号
  takamatsu: {
    asOf: "2026-08-01",
    facilityCount: 119,
    vacancy: 0,
    symbolCounts: { "○": 32, "△": 151, "×": 451 },
  },
  // 鹿児島市は空きが○と×だけ
  kagoshima: {
    asOf: "2026-07-24",
    facilityCount: 220,
    vacancy: 0,
    symbolCounts: { "○": 287, "×": 945 },
  },
  // 京都市は受入枠が記号。凡例にない「要相談」は記載のまま載せている
  kyoto: {
    asOf: "2026-08-03",
    facilityCount: 419,
    vacancy: 0,
    symbolCounts: { "○": 100, "△": 382, "×": 1446, "要相談": 121 },
  },
  // 神戸市は受入予定が記号、申込児童数は実数。区・支所ごとに11ファイル
  kobe: {
    asOf: "2026-08-17",
    facilityCount: 512,
    vacancy: 0,
    waiting: 2652,
    symbolCounts: { "◎": 59, "○": 145, "△": 360, "×": 1719 },
  },
  // 新潟市は空きが記号。8区ぶんが1ページの表に入っている
  niigata: {
    asOf: "2026-08-18",
    facilityCount: 274,
    vacancy: 0,
    symbolCounts: { "○": 48, "△": 406, "×": 1086 },
  },
  // 明石市は受入予定が記号
  akashi: {
    asOf: "2026-08-20",
    facilityCount: 158,
    vacancy: 0,
    symbolCounts: { "○": 57, "△": 10, "▲": 53, "×": 592 },
  },
  // 豊中市は欠員数（実数）。2クラスをまとめて出している施設が3件ある
  toyonaka: {
    asOf: "2026-07-24",
    facilityCount: 137,
    vacancy: 261,
  },
  // 奈良市は受入可能数が記号。凡例にない「◎」は記号のまま載せている
  nara: {
    asOf: "2026-08-01",
    facilityCount: 78,
    vacancy: 0,
    symbolCounts: { "○": 10, "△": 95, "×": 301, "◎": 3 },
  },
  // 西宮市は欠員が記号。「＼（受入れなし）」は null
  nishinomiya: {
    asOf: "2026-08-17",
    facilityCount: 160,
    vacancy: 0,
    symbolCounts: { "◎": 3, "〇": 11, "△": 50, "×": 623 },
  },
  // 川越市は翌月入園ぶんの募集人数（実数）。施設合計・地区小計・施設ごとの計で検算できる
  kawagoe: {
    asOf: "2026-08-05",
    facilityCount: 102,
    vacancy: 70,
  },
  // 千葉市は空きが記号。公式が「0」と書いているクラスは受け入れなしとして null
  chiba: {
    asOf: "2026-08-03",
    facilityCount: 378,
    vacancy: 0,
    symbolCounts: { "◎": 8, "○": 45, "△": 225, "×": 1679 },
  },
  // 姫路市は空きが記号。公式の表で空欄のクラスは「－」に置き換えている
  himeji: {
    asOf: "2026-08-14",
    facilityCount: 142,
    vacancy: 0,
    symbolCounts: { "○": 25, "△": 75, "－": 634 },
  },
  // 八千代市は空きが記号。ページの表をそのまま読む
  yachiyo: {
    asOf: "2026-08-01",
    facilityCount: 64,
    vacancy: 0,
    symbolCounts: { "○": 9, "△": 31, "×": 230 },
  },
  // 茅ヶ崎市は空きが記号、待機児童数は実数。受け入れ対象外のクラスは網掛けなので null
  chigasaki: {
    asOf: "2026-08-01",
    facilityCount: 88,
    vacancy: 0,
    waiting: 1022,
    symbolCounts: { "〇": 54, "×": 360 },
  },
  // 所沢市は受入れ見込みが記号。空欄（受入れ予定なし）は「－」に置き換えている
  tokorozawa: {
    asOf: "2026-08-07",
    facilityCount: 92,
    vacancy: 0,
    symbolCounts: { "◎": 4, "○": 7, "△": 34, "－": 393 },
  },
  // 岐阜市は空きが記号、在籍人数は実数
  gifu: {
    asOf: "2026-08-01",
    facilityCount: 87,
    vacancy: 0,
    symbolCounts: { "〇": 71, "△": 61, "✖": 269 },
  },
  // 水戸市は受入れ見込みが記号、申込み人数は実数
  mito: {
    asOf: "2026-08-06",
    facilityCount: 109,
    vacancy: 0,
    waiting: 355,
    symbolCounts: { "○": 8, "△": 128, "×": 355 },
  },
  // 越谷市も記号で公表している（○・△・＊。空欄は受入れなし）
  koshigaya: {
    asOf: "2026-08-18",
    facilityCount: 117,
    vacancy: 0,
    symbolCounts: { "○": 33, "△": 51, "＊": 5 },
  },
  // 流山市も記号で公表している（●・△。空欄は空きなし）
  nagareyama: {
    asOf: "2026-08-01",
    facilityCount: 109,
    vacancy: 0,
    symbolCounts: { "●": 85, "△": 140 },
  },
  // 藤沢市も記号で公表している（〇・―・※）
  fujisawa: {
    asOf: "2026-08-20",
    facilityCount: 120,
    vacancy: 0,
    symbolCounts: { "〇": 118, "―": 459, "※": 33 },
  },
  // 春日部市も記号で公表している
  kasukabe: {
    asOf: "2026-07-23",
    facilityCount: 48,
    vacancy: 0,
    symbolCounts: { "○": 3, "△": 7, "×": 197 },
  },
  // 日野市は受け入れのないクラスを「-」で書くため、空きのない園は全クラス「—」になる。
  // 公式の「合計」列が0であることを取り込み時に確かめている
  hino: { asOf: "2026-07-25", facilityCount: 47, vacancy: 89, emptyRatio: 0.6 },
  // 小平市は募集ゼロの園が多いのが通常
  kodaira: { asOf: "2026-08-01", facilityCount: 69, vacancy: 83, emptyRatio: 0.5 },
  urayasu: { asOf: "2026-08-20", facilityCount: 65, vacancy: 525 },
  // 大和市は受入可能児童数なしの園が多いのが通常
  yamato: { asOf: "2026-09-01", facilityCount: 94, vacancy: 211, emptyRatio: 0.45 },
  fuchu: { asOf: "2026-08-03", facilityCount: 61, vacancy: 153, emptyRatio: 0.2 },
  chofu: { asOf: "2026-08-20", facilityCount: 78, vacancy: 236, waiting: 2161, emptyRatio: 0.2 },
  mitaka: { asOf: "2026-09-01", facilityCount: 58, vacancy: 406, waiting: 2453, emptyRatio: 0.2 },
  // 西東京市は欠員なしの園が多いのが通常
  nishitokyo: { asOf: "2026-08-01", facilityCount: 66, vacancy: 72, emptyRatio: 0.2 },
  kashiwa: { asOf: "2026-09-01", facilityCount: 123, vacancy: 261, waiting: 1594, emptyRatio: 0.15 },
  // 町田市は翌月入園の募集人数。募集ゼロの園が多いのが通常
  machida: { asOf: "2026-09-01", facilityCount: 122, vacancy: 153, emptyRatio: 0.6 },
  ichikawa: { asOf: "2026-08-20", facilityCount: 224, vacancy: 422 },
  funabashi: { asOf: "2026-07-17", facilityCount: 190, vacancy: 354 },
  // 八王子市は翌月の募集人数。募集ゼロの園が多いのが通常
  hachioji: { asOf: "2026-08-01", facilityCount: 144, vacancy: 99, emptyRatio: 0.3 },
  sagamihara: { asOf: "2026-08-01", facilityCount: 230, vacancy: 613 },
  // 堺市も利用調整後の空き。空きゼロの施設が多いのが通常
  sakai: { asOf: "2026-07-31", facilityCount: 269, vacancy: 501, emptyRatio: 0.35 },
  // 仙台市は利用調整後の空枠。空枠ゼロの施設が多いのが通常
  sendai: { asOf: "2026-08-17", facilityCount: 439, vacancy: 819, emptyRatio: 0.35 },
  hiroshima: { asOf: "2026-08-01", facilityCount: 335, vacancy: 2049, waiting: 1849, emptyRatio: 0.15 },
  // 大阪市は分園・乳児センターなど担当年齢が限られる施設が多く、全クラス「—」はいない
  osaka: { asOf: "2026-08-01", facilityCount: 896, vacancy: 2117 },
  // 北区は0歳児クラスのない園（つぼみ園など）が多く、全クラス「—」の施設はいない
  kita: { asOf: "2026-07-30", facilityCount: 125, vacancy: 762, waiting: 2096 },
  // 墨田区も「空き数」ではなく翌月入所の募集見込数。募集ゼロの園が多いのが通常
  sumida: { asOf: "2026-08-06", facilityCount: 103, vacancy: 570, emptyRatio: 0.3 },
  itabashi: { asOf: "2026-08-03", facilityCount: 210, vacancy: 923 },
  minato: { asOf: "2026-08-17", facilityCount: 113, vacancy: 1499 },
  chiyoda: { asOf: "2026-08-07", facilityCount: 38, vacancy: 360, emptyRatio: 0.15 },
  bunkyo: { asOf: "2026-08-01", facilityCount: 122, vacancy: 1053, waiting: 882, emptyRatio: 0.3 },
};

const problems: string[] = [];
const notes: string[] = [];

function check(slug: string) {
  const data = getVacancyData(slug);
  if (!data) {
    problems.push(`${slug}: レジストリから取得できません`);
    return;
  }
  const P = (msg: string) => problems.push(`${slug}: ${msg}`);

  // --- 1. メタデータ ---
  if (data.municipalitySlug !== slug) {
    P(`municipalitySlug が "${data.municipalitySlug}" でレジストリのキーと違います`);
  }
  for (const key of ["asOf", "fetchedAt"] as const) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data[key])) P(`${key} が YYYY-MM-DD 形式ではありません: ${data[key]}`);
  }
  if (!data.sourceUrl.startsWith("https://")) P(`sourceUrl が https ではありません`);
  if (!data.metrics?.length) P(`metrics が空です`);
  // 空きを記号でしか公表していない自治体は vacancy を持たず symbol を持つ
  const symbolBased = data.metrics?.includes("symbol") ?? false;
  if (!symbolBased && !data.metrics?.includes("vacancy")) P(`metrics に vacancy がありません`);
  if (symbolBased) {
    if (!data.symbolLegend?.length) P(`symbol の自治体なのに symbolLegend がありません`);
    const marks = new Set((data.symbolLegend ?? []).map((l: { mark: string }) => l.mark));
    for (const f of data.facilities) {
      if (!f.symbols) {
        P(`${f.name}: symbols がありません`);
        break;
      }
      const unknown = f.symbols.filter((m: string | null) => m !== null && !marks.has(m));
      if (unknown.length > 0) {
        P(`${f.name}: 凡例にない記号があります: ${unknown.join("、")}`);
        break;
      }
    }
  }
  if (data.waitingCaveat && !hasMetric(data, "waiting")) {
    P(`入所待ちを持たないのに waitingCaveat があります`);
  }

  // --- 2. 施設 ---
  const seen = new Set<string>();
  /** 全クラスが「—」の施設。少数なら実態（一時募集停止など）だが、多いと抽出ミスを疑う */
  const noValues: string[] = [];
  const wardCount = data.wards.length;
  const catCount = data.categories?.length ?? 0;
  for (const f of data.facilities) {
    if (seen.has(f.id)) P(`施設IDが重複しています: ${f.id}`);
    seen.add(f.id);
    if (!f.name?.trim()) P(`施設名が空です: ${f.id}`);

    if (f.vacancy.length !== AGE_COUNT) {
      P(`${f.name}: vacancy の要素数が ${f.vacancy.length}（${AGE_COUNT}であるべき）`);
    }
    for (const key of ["waiting", "enrolled"] as const) {
      const has = hasMetric(data, key);
      if (has && !f[key]) P(`${f.name}: metrics に ${key} があるのにデータがありません`);
      if (!has && f[key]) P(`${f.name}: metrics に ${key} が無いのにデータがあります`);
      if (f[key] && f[key]!.length !== AGE_COUNT) {
        P(`${f.name}: ${key} の要素数が ${f[key]!.length}`);
      }
    }

    // 区・施設類型のインデックス
    if (f.w === null || f.w === undefined) {
      // 一部の施設だけ区・地区が公表されていない自治体がある
      // （足立区の私立認定こども園）。集計から外すだけで、問題としては扱わない
    } else if (f.w < 0 || f.w >= wardCount) {
      P(`${f.name}: 区のインデックスが範囲外です (${f.w})`);
    }
    if (f.c !== null && f.c !== undefined && (f.c < 0 || f.c >= catCount)) {
      P(`${f.name}: 施設類型のインデックスが範囲外です (${f.c})`);
    }

    // 年齢別と合算の排他
    const hasAge = f.vacancy.some((v) => v !== null);
    if (hasAge && f.vacancyTotal !== undefined) {
      P(`${f.name}: 年齢別と vacancyTotal の両方に値があります（二重計上になります）`);
    }
    if (!hasAge && f.vacancyTotal === undefined) {
      // 全クラスが「—」の施設は実在する（品川区の一時募集停止園など）。
      // 1件ずつは問題にせず、下でデータセット全体の割合として見る
      noValues.push(f.name);
    }

    // 負の数はありえない
    for (const key of ["vacancy", "waiting", "enrolled"] as const) {
      (f[key] ?? []).forEach((v, age) => {
        if (v !== null && (!Number.isInteger(v) || v < 0)) {
          P(`${f.name}: ${key}[${age}] が不正です (${v})`);
        }
      });
    }
    if (f.lat !== undefined && (f.lat < 20 || f.lat > 46)) P(`${f.name}: 緯度が日本の範囲外 (${f.lat})`);
    if (f.lng !== undefined && (f.lng < 122 || f.lng > 154)) P(`${f.name}: 経度が日本の範囲外 (${f.lng})`);
  }

  // 全クラス「—」の施設が多いときは、列の取り違えなど抽出ミスを疑う
  // 記号の自治体は vacancy が全部 null なので、この検査はしない
  if (!symbolBased && noValues.length > 0) {
    const ratio = noValues.length / Math.max(1, data.facilities.length);
    if (ratio > (EXPECTED[slug]?.emptyRatio ?? 0.1)) {
      P(
        `全クラスが「—」の施設が${noValues.length}件（${Math.round(ratio * 100)}%）あります。抽出を確認してください: ${noValues.slice(0, 5).join("、")}`
      );
    } else {
      notes.push(
        `${slug}: 全クラスが「—」の施設が${noValues.length}件あります（募集停止など）: ${noValues.join("、")}`
      );
    }
  }

  // --- 3. 集計の一貫性 ---
  const total = totalSummary(data);
  const byAge = summarizeByAge(data);
  const mergedOnly = data.facilities.reduce(
    (acc, f) => acc + (f.vacancy.every((v) => v === null) ? (f.vacancyTotal ?? 0) : 0),
    0
  );
  const ageSum = byAge.reduce((acc, a) => acc + a.vacancy, 0) + mergedOnly;
  if (ageSum !== total.vacancy) {
    P(`年齢別の空き合計(${ageSum})と全体(${total.vacancy})が一致しません`);
  }
  if (total.facilityCount !== data.facilities.length) {
    P(`facilityCount が施設数と一致しません`);
  }

  if (data.wards.length > 0) {
    const byWard = summarizeByWard(data);
    const noWard = data.facilities.filter((f) => f.w === null || f.w === undefined);
    const wardFacilities = byWard.reduce((acc, w) => acc + w.facilityCount, 0) + noWard.length;
    if (wardFacilities !== data.facilities.length) {
      P(`区別の施設数合計(${wardFacilities})が全施設数(${data.facilities.length})と一致しません`);
    }
    const noWardVacancy = noWard.reduce(
      (acc, f) => acc + (facilityVacancy(f, null) ?? 0),
      0
    );
    const wardVacancy = byWard.reduce((acc, w) => acc + w.vacancy, 0) + noWardVacancy;
    if (wardVacancy !== total.vacancy) {
      P(`区別の空き合計(${wardVacancy})が全体(${total.vacancy})と一致しません`);
    }
    if (noWard.length > 0) {
      notes.push(`${slug}: 区・地区が公表されていない施設が${noWard.length}件あります（地区別の表からは除外して表示）`);
    }
  }
  if ((data.categories?.length ?? 0) > 0) {
    const byCat = summarizeByCategory(data);
    const unclassified = data.facilities.filter((f) => f.c === null || f.c === undefined).length;
    const catFacilities = byCat.reduce((acc, c) => acc + c.facilityCount, 0) + unclassified;
    if (catFacilities !== data.facilities.length) {
      P(`施設類型別の施設数合計(${catFacilities})が全施設数(${data.facilities.length})と一致しません`);
    }
    if (unclassified > 0) {
      notes.push(`${slug}: 施設類型が公表されていない施設が${unclassified}件あります（表からは除外して表示）`);
    }
  }

  // 入所待ちを持たない自治体で ratio が出ていないこと（UIで「1枠あたり」を出さないため）
  if (!hasMetric(data, "waiting")) {
    if (total.waiting !== null || total.ratio !== null) P(`入所待ちを持たないのに waiting/ratio が null ではありません`);
    if (byAge.some((a) => a.waiting !== null || a.ratio !== null)) {
      P(`入所待ちを持たないのに年齢別の waiting/ratio が null ではありません`);
    }
  }

  // 施設単位のヘルパーが年齢別なし施設で破綻しないこと
  for (const f of data.facilities) {
    if (f.vacancyTotal !== undefined) {
      if (facilityVacancy(f, null) !== f.vacancyTotal) P(`${f.name}: 全年齢の空きが合算値と一致しません`);
      if (facilityVacancy(f, 0) !== null) P(`${f.name}: 年齢別が無いのに年齢指定で数値を返しています`);
    }
  }

  // --- 4. 既知の検算値（asOf が一致するときだけ） ---
  const exp = EXPECTED[slug];
  if (exp?.symbolCounts && exp.asOf === data.asOf) {
    // 記号ごとに何回出てきたかを数え直して、取り込み時の値と突き合わせる
    const counted: Record<string, number> = {};
    for (const f of data.facilities) {
      for (const mark of f.symbols ?? []) {
        if (mark) counted[mark] = (counted[mark] ?? 0) + 1;
      }
    }
    for (const [mark, count] of Object.entries(exp.symbolCounts)) {
      if ((counted[mark] ?? 0) !== count) {
        P(`記号「${mark}」の数が違います（期待 ${count} / 実際 ${counted[mark] ?? 0}）`);
      }
    }
  }
  if (!exp) {
    notes.push(`${slug}: EXPECTED に検算値が登録されていません。取り込み時の値を追加してください`);
  } else if (exp.asOf !== data.asOf) {
    notes.push(
      `${slug}: データが ${exp.asOf} から ${data.asOf} に更新されています（検算値の照合はスキップ）`
    );
  } else {
    if (total.facilityCount !== exp.facilityCount) P(`施設数が検算値と違います: ${total.facilityCount} ≠ ${exp.facilityCount}`);
    if (total.vacancy !== exp.vacancy) P(`空き合計が検算値と違います: ${total.vacancy} ≠ ${exp.vacancy}`);
    if (exp.waiting !== undefined && total.waiting !== exp.waiting) {
      P(`入所待ち合計が検算値と違います: ${total.waiting} ≠ ${exp.waiting}`);
    }
  }

  // --- 5. 概要の表示 ---
  console.log(
    `  ${slug.padEnd(10)} ${data.municipalityName}  ${data.asOf}  ` +
      `${total.facilityCount}施設 / 空き${total.vacancy}` +
      (total.waiting !== null ? ` / 申込${total.waiting}` : "") +
      `  [${data.metrics.join(",")}]` +
      (data.wards.length ? ` 区${data.wards.length}` : "") +
      ((data.categories?.length ?? 0) ? ` 類型${data.categories!.length}` : "")
  );
}

const slugs = getVacancySlugs();
console.log(`空き状況データセットを検証します（${slugs.length}自治体）\n`);
slugs.forEach(check);

if (notes.length) {
  console.log("\n--- 参考情報 ---");
  notes.forEach((n) => console.log(`  ${n}`));
}

console.log("");
if (problems.length) {
  console.log(`検出: ${problems.length}件`);
  problems.forEach((p) => console.log(`  ${p}`));
  process.exit(1);
}
console.log("検出: 0件");
