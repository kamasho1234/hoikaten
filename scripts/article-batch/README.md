# 自治体コラムをまとめて増やすときの道具（2026-09-14 奈良市 10→51本 で使った）

1. 作業ディレクトリに **facts.md** を作る: 記事に書いてよい数字・日付・金額・制度・URL を一次資料から全部書き出す
   （URL は全部 curl で 200 を確認してから載せる）。これ以外の数字は書かせない
2. `INSTRUCTIONS.md` と facts.md をサブエージェントに渡し、`batch-N.ts`（Article オブジェクトの断片）を書かせる。
   「委譲禁止・自分で書く・リポジトリは触らない」を明記する
3. 機械チェック
   - `python scripts/article-batch/check.py <slug> <作業dir>` … 絵文字／URL 許可リスト／本文長／h2 数／point・info-box／category／slug 重複
   - `python scripts/article-batch/numcheck.py <作業dir>` … facts.md に無い「数字＋単位」を列挙（足し算の結果は目で確認）
   - `python scripts/article-batch/dump.py batch-N.ts` … タグを落として通読用に出す
4. **全文を通読する。** 奈良市では数字は facts の外から1つも出なかったのに、事実の取り違えが20か所以上あった
   （申込月と通知方法、育休期限の主語、副食費で数える子の範囲、減点条件の裏返し、別の制度の金額の流用）。
   機械チェックは構成の不足しか拾えない
5. 断片を `src/lib/articles/<slug>.ts` の配列末尾に結合 → `npx tsc --noEmit` → `npm run articles:verify`（本数が増えていること）
   → `python scripts/verify-article-points/make_tasks.py`（tasks/article-points/<slug>.md が出ないこと）
   → `python scripts/verify-fee-articles.py <slug>`（nursery-fees を書いたとき）→ 出典 URL を全件 curl → build
