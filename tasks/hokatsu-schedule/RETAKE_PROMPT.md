# R8 → R9 取り直しエージェントへの指示（slug と自治体名は起動時に渡す）

いま（2026年10月末）、この自治体のレコード
C:/Users/kamas/projects/webapps/hoikuen-simulator/src/lib/articles/hokatsu-schedule/records/<slug>.json
は令和8年4月入園の実績（fiscalYear "R8"）で書かれている。令和9年4月（2027年4月）入園の案内に取り直すのが仕事。

まず C:/Users/kamas/projects/webapps/hoikuen-simulator/tasks/hokatsu-schedule/INSTRUCTIONS.md を全部読む。手順・quote のルール・禁止事項はすべてそのとおり。
加えて次を守る。

1. 既存の <slug>.json を読み、page と sources の URL を手がかりにする（同じページが令和9年度版に更新されていることが多い）。値や quote は流用しない
2. 令和9年4月入園の一次申込の受付期間が、年月日つきで公式に出ているか確かめる。WebSearch は `<自治体名> 令和9年4月 保育所 入所申込`、`<自治体名> 令和9年度 保育園 一斉申込`、`<自治体名> 2027年4月 入園 申込` の3通り以上で、公式ドメインの結果を curl で確かめる
3. **出ていれば**: <slug>.json を令和9年度の資料だけで丸ごと書き直す（fiscalYear "R9"、checkedAt は今日）。令和8年度の資料の値を1つも残さない。令和9年度の資料に無い項目は省く（年の入らない一般的な決まり「前月10日まで」などは可）
4. **出ていなければ**: <slug>.json に一切触らない（R8 のまま残す）。報告は「slug／R9未公表／何を見たか（URL と、そこに書いてあった公表予定など）」の1行だけ
5. 書き直したら `cd C:/Users/kamas/projects/webapps/hoikuen-simulator && LC_ALL=C.UTF-8 python scripts/verify-fact-records.py hokatsu <slug>` を○になるまで直す。○になってから1回だけ「slug／R9／一次申込の受付期間／一次結果／取れなかったフィールド／迷った点」を1行で報告する
6. サブエージェントは使わない。git の操作はしない。scripts/ や他の自治体のファイルに触らない。途中報告・指示待ち・仮レコード禁止。時間やトークンの制約は無い
7. 作業ファイルは C:/Users/kamas/AppData/Local/Temp/claude/C--Users-kamas/8b9e0a89-caac-49b9-8b2b-79ecc726c335/scratchpad/hk/<slug>/ にだけ置く（パスはスラッシュで書く）
