# 保育園の空き状況ページ（横浜市で先行実装）

横浜市公式の3CSV（受入可能数・入所待ち人数・入所児童数）を月次で取り込み、
区・年齢で絞り込める空き状況ページを `/yokohama/vacancy` に追加する。

## タスク

- [x] 1. `scripts/fetch-yokohama-vacancy.ts` — 公式ページからCSV3本を検出・取得・結合してJSON出力
- [x] 2. スクリプト実行 → 1,242施設・asOf=2026-08-01・年齢別合計が検算値と一致することを確認
- [x] 3. `src/lib/vacancy/types.ts` `src/lib/vacancy/index.ts` — 型・レジストリ・集計ヘルパー
- [x] 4. `src/app/[city]/vacancy/page.tsx` — サーバーコンポーネント（サマリー・区別テーブル・FAQ・JSON-LD）
- [x] 5. `src/app/[city]/vacancy/vacancy-browser.tsx` — 絞り込みUI（クライアント）
- [x] 6. `src/app/[city]/vacancy/opengraph-image.tsx` — OG画像
- [x] 7. `src/app/sitemap.ts` — `/{city}/vacancy` を追加
- [x] 8. `src/app/[city]/page.tsx` — 空き状況ページへの導線カード（データがある自治体のみ）
- [x] 9. `.github/workflows/update-vacancy.yml` — 日次チェック・asOf変化時のみ更新
- [x] 10. 検証（tsc / 既存監査スクリプト / ブラウザ操作確認 / ビルド）

## 検算値（独立に集計済み・スクリプトの出力と突き合わせる）

| 年齢 | 空き枠 | 入所待ち | 在籍 |
|---|---|---|---|
| 0歳児 | 257 | 5,780 | 5,427 |
| 1歳児 | 305 | 5,662 | 13,162 |
| 2歳児 | 539 | 1,399 | 14,285 |
| 3歳児 | 912 | 414 | 13,167 |
| 4歳児 | 924 | 160 | 13,337 |
| 5歳児 | 1,053 | 58 | 13,251 |
| 合計 | 3,990 | 13,473 | - |

施設数 1,242（港北163・鶴見110・戸塚105・青葉92・神奈川92・旭76・港南69・都筑69・緑64・
保土ケ谷58・磯子51・南49・泉47・金沢45・中43・西41・瀬谷36・栄32）

## レビュー

### 作ったもの

| ファイル | 役割 |
|---|---|
| `scripts/fetch-yokohama-vacancy.ts` | 公式ページ→CSV3本の自動検出・取得・結合・JSON出力 |
| `src/lib/vacancy/yokohama.json` | 生成物（195KB・1,242施設） |
| `src/lib/vacancy/types.ts` / `index.ts` | 型・レジストリ・集計ヘルパー |
| `src/app/[city]/vacancy/page.tsx` | 空き状況ページ本体 |
| `src/app/[city]/vacancy/vacancy-browser.tsx` | 区・年齢・空き有無・施設名の絞り込みUI |
| `src/app/[city]/vacancy/opengraph-image.tsx` | OG画像 |
| `.github/workflows/update-vacancy.yml` | 日次チェックで自動更新 |
| `src/app/sitemap.ts` / `src/app/[city]/page.tsx` | sitemap登録・導線カード（変更） |

### 検証結果

- 生成JSONの年齢別合計・区別施設数が上の検算値と**完全一致**
- 画面表示の「1,242施設（うち821施設に空きあり）」「青葉区・1歳児で16施設」もJSONから独立に再集計して一致
- `npx tsc --noEmit` EXIT 0
- `verify-question-integrity.ts` 0件（467自治体）・`audit-simulator-form.ts` 0件 — 既存自治体データへの影響なし
- ブラウザで区・年齢・空きありトグル・並び替えの動作を確認。コンソールエラーなし
- `/setagaya/vacancy` は404（`dynamicParams = false`）
- スクリプト2回目の実行は「更新なし」で終了しファイルを書き換えない（Actionsで毎日走っても差分ゼロ）
- `npm run build` EXIT 0。`.next/server/app/yokohama/vacancy.html`（438KB）が生成され、`[city]/vacancy` は横浜市の1件だけがプリレンダリングされる
- `npm start`（本番ビルド）で `/yokohama/vacancy` 200・`/setagaya/vacancy` 404・OG画像 200（image/png 69.6KB）
- sitemap は **5,776 → 5,777 URL**、`https://hoikaten.com/yokohama/vacancy` が登録されていることを確認

### 設計上の判断

- **CSVの種別はファイル名でなく1行目の見出しで判別**した。公式のファイル名に規則性がない（`1013_20260731.csv` と `202608-jidou.csv` が混在）ため
- **「倍率」と書かず「空き1枠あたりの申込数」と表記**した。横浜市の定義では入所待ち人数は「園ごとの申請数」で、1人が複数園を希望すると各園に重複計上されるため、実際の競争倍率ではない。この注意書きをサマリー直下・FAQ・出典欄の3か所に入れている
- **`-`（クラスなし）を0にしない**。`null` で保持し、UIでも「—」と表示して空き0と区別する
- 取り込みスクリプトは想定と1つでも違えば**書き込まずに exit 1** する。公式の構造変更で壊れたデータが本番に出るより、古いデータのまま止まる方が安全

## 【事故】未コミットのまま消失 → sourcemapから復元（2026-08-17）

上の実装をコミットしないまま放置していたところ、**8/17 未明にソースファイルがディスクから消えた**。
devサーバーのログに `00:04:44 ERROR ENOENT: no such file or directory, scandir 'src\app'` が残っており、
`src/app` ごと一時的に消える事象が起きている。未追跡ファイルだったため git では戻せなかった。

### 復元方法（同じ事故が起きたら再現できる）

`.next/dev` に残る **turbopack の sourcemap には `sourcesContent` として元ソースが丸ごと入っている**。
`.map` を全走査して `sources` にパスが含まれるものを取り出せば、消えたファイルをそのまま復旧できる。

| ファイル | 復元 |
|---|---|
| `yokohama.json` / `yokohama-websites.json` / `index.ts` / `page.tsx` / `vacancy-browser.tsx` / `opengraph-image.tsx` | sourcemapから完全復元 |
| `types.ts` | **書き直し**（型だけのファイルはJS出力がないためsourcemapに残らない） |
| `sitemap.ts` / `[city]/page.tsx` の変更分 | **書き直し**（devで一度もコンパイルされておらずキャッシュになかった） |

- `.next` の**全946ソース**を現行ファイルと突き合わせ、差分0件・欠落は上記のみであることを確認した。
- 復元した `yokohama.json` は、公式CSVから当日再取得して生成したものと **`fetchedAt` 以外バイト単位で完全一致**。
- 上の検算値（1,242施設・821施設に空きあり・青葉区1歳児16施設・年齢別の空き/待ち）とも一致。sitemapも5,777URLで記録どおり。

### 教訓

- **動く実装をコミットせずに次のセッションへ持ち越さない。** git に入っていないものはツールの事故で消える。
- ローカルのビルド成果物は「消えたコードのバックアップ」になる。`.next` を消す前に sourcemap を確認する。
- **型定義ファイルだけは sourcemap に残らない**ので、型は他ファイルの利用箇所から再構築する必要がある。

### 併せて直したもの

- devサーバーが `globals.css:1:1: Invalid code point` で全ページ500を返していた。
  原因は別セッションのリダイレクト事故でプロジェクト直下に落ちていた `C：Users...process_konan.ps1`
  （ファイル名にU+F03Aを含む）。Tailwind v4 がプロジェクト内をスキャンして落ちていた。scratchpadへ退避した。
- `.claude/`（Claude Code がサブエージェント用に作る git worktree の置き場）を `.gitignore` に追加。
  リポジトリの中に作業コピーができるため、追跡すると事故のもとになる。

### 残タスク

- コミット・push（未実施）
- 本番反映の確認、IndexNow送信
- 他自治体への横展開（レジストリに1行足すだけで足せる構造にしてある）
