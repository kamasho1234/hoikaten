/**
 * IndexNow一括送信スクリプト
 * 使い方: node scripts/submit-indexnow.mjs
 *
 * IndexNowはBing・Yandex・Seznam等が参加する即時クロール通知API。
 * 1リクエストで最大10,000 URLを送信できる。
 */

const KEY = "391bc80582937ecddf6704f09bad1f72";
const HOST = "hoikaten.com";
const BASE_URL = `https://${HOST}`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** サイトマップからURL一覧を取得 */
async function fetchSitemapUrls() {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap取得失敗: ${res.status}`);
  const xml = await res.text();

  const matches = xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g);
  return [...matches].map((m) => m[1]);
}

/** IndexNowにURLリストを送信（最大10,000件/リクエスト） */
async function submitBatch(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE_URL}/${KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  return res.status;
}

async function main() {
  console.log("サイトマップからURL取得中...");
  const urls = await fetchSitemapUrls();
  console.log(`対象URL数: ${urls.length}`);

  const BATCH_SIZE = 500;
  let submitted = 0;

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const status = await submitBatch(batch);
    submitted += batch.length;
    console.log(`送信完了: ${submitted}/${urls.length} (ステータス: ${status})`);

    if (status !== 200 && status !== 202) {
      console.error(`送信エラー: ステータス ${status}`);
      break;
    }

    // レートリミット対策
    if (i + BATCH_SIZE < urls.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log("IndexNow送信完了");
}

main().catch(console.error);
