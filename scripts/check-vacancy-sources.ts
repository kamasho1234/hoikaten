/**
 * 空き状況データの取り込み元が、まだ生きているか確かめる
 *
 * 実行: npm run vacancy:check:sources
 *
 * ## なぜ必要か
 * 自治体は**基準日を変えずに資料を差し替える**ことがある。
 * 入間市は「令和8年9月1日現在」のままPDFのファイル名を変えていて、
 * 中身（記号の並び）も変わっていた。津幡町でも同じことが起きていた。
 *
 * 取り込みスクリプトは基準日と取り込み元のURLの両方を見て判定するようにしたが、
 * **差し替えが起きたこと自体に気づく手立て**が別に要る。
 * 保存している `sourceFiles` のURLを開いて、404になっていないかを見る。
 *
 * 404が出たら、その自治体を取り込み直せば新しい資料に入れ替わる。
 *
 * ## 出力
 * 生きていないURLの一覧。全部生きていれば「すべて生きています」とだけ出す。
 * **これは検査であって取り込みではない**ので、落ちても本番データは変わらない。
 */

import { getVacancyData, getVacancySlugs } from "../src/lib/vacancy";

const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
/** 同時に開く本数。自治体のサーバーに負担をかけない範囲にする */
const CONCURRENCY = 6;
const TIMEOUT_MS = 25_000;

type Dead = { slug: string; name: string; key: string; url: string; why: string };

async function head(url: string): Promise<string | null> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    // HEAD を受け付けない自治体があるので、だめなら GET で開き直す
    let res = await fetch(url, { method: "HEAD", headers: { "User-Agent": UA }, signal: ac.signal });
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    }
    if (!res.ok) return `${res.status}`;
    return null;
  } catch (err) {
    return String((err as Error).message ?? err).slice(0, 40);
  } finally {
    clearTimeout(timer);
  }
}

async function main(): Promise<void> {
  const jobs: { slug: string; name: string; key: string; url: string }[] = [];
  for (const slug of getVacancySlugs()) {
    const data = getVacancyData(slug);
    if (!data) continue;
    for (const [key, url] of Object.entries(data.sourceFiles ?? {})) {
      // ページ本体から読んでいる自治体は、出典と同じURLなので見なくてよい
      if (url === data.sourceUrl) continue;
      jobs.push({ slug, name: data.municipalityName, key, url });
    }
  }
  console.log(`取り込み元 ${jobs.length}本を確かめます`);

  const dead: Dead[] = [];
  let done = 0;
  const queue = [...jobs];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      for (;;) {
        const job = queue.shift();
        if (!job) return;
        const why = await head(job.url);
        done += 1;
        if (done % 50 === 0) console.log(`  ${done}/${jobs.length}`);
        if (why) dead.push({ ...job, why });
      }
    }),
  );

  if (dead.length === 0) {
    console.log("すべて生きています");
    return;
  }
  console.log(`\n開けなかった取り込み元 ${dead.length}本`);
  for (const d of dead.sort((a, b) => a.slug.localeCompare(b.slug))) {
    console.log(`  ${d.slug} ${d.name} [${d.key}] ${d.why}`);
    console.log(`    ${d.url}`);
  }
  console.log(
    "\n自治体が資料を差し替えた可能性があります。" +
      "その自治体を取り込み直すと、新しい資料に入れ替わります。",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
