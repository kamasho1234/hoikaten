# 収集エージェントへの共通指示（slug と自治体名は起動時に渡す）

まず C:\Users\kamas\projects\webapps\hoikuen-simulator\tasks\hokatsu-schedule\INSTRUCTIONS.md を全部読み、そのとおりに
C:\Users\kamas\projects\webapps\hoikuen-simulator\src\lib\articles\hokatsu-schedule\records\<slug>.json を作る。
形の手本は同じフォルダの tsu.json（文や値は流用禁止）。型は src\lib\articles\hokatsu-schedule\types.ts。
作業ファイル（curl で保存した HTML/PDF とテキスト化したもの）は
C:/Users/kamas/AppData/Local/Temp/claude/C--Users-kamas/95b0c8d9-b0dc-40cd-a282-5bf430205605/scratchpad/hk/<slug>/ に置く。

守ること:
- サブエージェントは使わない。自分で curl（Chrome UA）で取り、テキスト化して grep してから必要な行だけ読む
- 令和9年4月（2027年4月）入園の案内を探す。無ければ令和8年4月入園の案内を fiscalYear "R8" で（日付は令和7年の実日付のまま）。令和8年4月のページが消えていたら「令和8年度 入所のしおり／てびき」PDF の日程ページを探す
- 値は quote から読み取れる範囲を出ない。quote は本文の一続きの文をそのまま写す（見出し・ファイル名は不可）。1つの値に根拠が2か所必要なら evidence のキーを「firstApply#2」のように足せる
- PDF のテキストは「1 2月上旬」のように数字の間に空白が入ることがある（12月のこと）。数字は前後の文脈で確かめる
- 一次申込の受付期間が公式サイトのどこにも無ければレコードを作らず、その旨だけ報告する。まとめサイト・推測の日付は不可
- 照合を通すために値を削って空のレコードにしない。取れる項目は全部取る
- 途中報告・指示待ち・仮レコード禁止。書き終えたら
  cd C:\Users\kamas\projects\webapps\hoikuen-simulator && LC_ALL=C.UTF-8 python scripts/verify-fact-records.py hokatsu <slug>
  を回して○になるまで直す。○になってから1回だけ「slug／fiscalYear／一次申込の受付期間／一次結果／取れなかったフィールド／迷った点」を1行で報告する
