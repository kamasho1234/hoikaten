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
  { asOf: string; facilityCount: number; vacancy: number; waiting?: number }
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
  if (!data.metrics?.includes("vacancy")) P(`metrics に vacancy がありません`);
  if (data.waitingCaveat && !hasMetric(data, "waiting")) {
    P(`入所待ちを持たないのに waitingCaveat があります`);
  }

  // --- 2. 施設 ---
  const seen = new Set<string>();
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
      P(`${f.name}: 年齢別も vacancyTotal もありません`);
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
