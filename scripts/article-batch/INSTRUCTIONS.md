# 奈良市コラム 執筆ルール（全バッチ共通）

## 出力
- 出力先は指定された `batch-N.ts` **1ファイルだけ**。リポジトリ（C:\Users\kamas\projects\webapps\hoikuen-simulator）のファイルは一切編集しない。git 操作もしない。
- ファイルの中身は **Article オブジェクトを並べただけの断片**（`import` や `const` や `registerArticles` は書かない。先頭は `  {` で始まり、各オブジェクトは `  },` で終わる。最後のオブジェクトも `  },` で終える）。
  私がそのまま `src/lib/articles/nara.ts` の配列の末尾に貼る。
- 各オブジェクトの形（`src/lib/articles/types.ts` の Article）:
  ```
  {
    slug: "xxx",
    citySlug: "nara",
    title: "奈良市の…",            // 30〜40文字。先頭に「奈良市」を入れる。全角スペースで区切ってよい
    description: "…",             // 60〜100文字
    category: "…",                // 下の一覧から
    categoryColor: "…",           // 下の一覧から
    content: `…HTML…`,            // バッククォート。本文中にバッククォートと ${ を使わない
    publishedAt: "2026-09-14",
    popularity: NN,               // 30〜65 の整数
  },
  ```
  `image` は付けない。

## category と categoryColor（この組み合わせだけ）
| category | categoryColor |
|---|---|
| 保活の基本 | green |
| 選考のしくみ | blue |
| 点数アップ | amber |
| 育休・復職 | blue |
| 園えらび | teal |
| 制度を知る | rose |
| お金の話 | rose |
| データ | purple |
| 最新情報 | purple |

## 本文（content）
- 本文のテキスト量は **タグを除いて 450〜650 文字**。`<h2>` を **3つ以上**（2つ目の `<h2>` の前で広告が入る）。`<h3>` は自由。
- `<div class="point-box"><p><strong>ポイント</strong></p><p>…</p></div>` を1つ、
  `<div class="info-box"><p><strong>公式情報</strong></p><p>…<a href="URL" target="_blank" rel="noopener">リンク文言</a>…</p></div>` を **本文の最後に1つ**。
  必要に応じて `<div class="warn-box"><p><strong>注意</strong></p><p>…</p></div>`、
  手順は `<div class="step"><div class="step-num">1</div><div class="step-content"><strong>見出し</strong><p>…</p></div></div>`、
  表は `<table><thead><tr><th>…</th></tr></thead><tbody><tr><td>…</td></tr></tbody></table>`、強調は `<span class="highlight">…</span>`。
- 見本: `sendai-samples.ts`（同じ slug の仙台市の記事は **構成の参考にだけ** 使う。仙台の数字・区名・制度は一切写さない）。
  既存の奈良市の記事の文体: `C:\Users\kamas\projects\webapps\hoikuen-simulator\src\lib\articles\nara.ts`（読むだけ）。

## 事実（最重要）
- **`facts.md` に書いてある数字・日付・金額・制度・URL だけを使う。** facts.md に無い数字は書かない。「一般的には」と国の制度を書くときも、facts.md にある範囲にとどめる。
- 点数は facts.md の 1 章の表の値そのまま（200点満点・父母各100点・加点その1は最も高い1つ・加点その2は重複）。「祖父母同居で+N点」「認可外+5点」など存在しない項目を書かない。
- URL は facts.md の 0 章の一覧からだけ。`/nara`（点数シミュレーター）と `/nara/vacancy`（空き状況）はサイト内リンクとして使ってよい（`<a href="/nara">`）。
- 倍率・ボーダー点・合格ラインの数字は書かない（市が公表していない）。「奈良市には区がある」ような書き方をしない。
- 体験談・会話形式の記事はフィクションでよいが、「〜さん（仮名）」と分かる書き方にし、点数・日付・制度は facts.md どおりにする。
- 絵文字は使わない。「筆者」「私たち運営」など運営者の身元を書かない。
- 年は西暦（2026年）で書き、必要なら「令和8年度」を併記。

## 進め方
- **自分で全部書く。他のエージェントに委譲しない。** 1本ずつ最後まで書き、全本数そろえてから終える。
- 終わったら、`batch-N.ts` の中の slug の一覧と本数を報告する。
