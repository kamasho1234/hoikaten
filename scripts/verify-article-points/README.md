# コラムの点数を公式データと照合する

自治体コラム（src/lib/articles）に書かれた「ひとり親 +N点」「きょうだい +N点」「父母各N点の合計M点」
のような主張を、点数シミュレーターのデータ（src/lib/data）と突き合わせる。

    python scripts/verify-article-points/make_tasks.py

自治体ごとの食い違いが tasks/article-points/<slug>.md に出る（tasks/article-points/ は git 管理外）。
「各1点」「以下の3点」「内職は最大9点」のような小区分の最大値は誤検出になるので、出た文は目で確かめる。

2026-09-11 に 164 自治体・約450本をこれで洗って直した（tasks/todo.md 参照）。
