# 教訓

## push 先のブランチを毎回確認する（2026-08-21）

**何があったか**: `git push origin master` を実行して成功していたが、
このリポジトリの本番ブランチは `main` だった。ローカルに残っていた古い
`master`（initial commit のまま）へ push していたので、
「push 成功」なのに Vercel は何も拾わず、本番に20分以上反映されなかった。

**なぜ間違えたか**: セッション開始時のコンテキストに出る
「Current branch: master」は、ホームディレクトリ（`C:\Users\kamas`）の
別のリポジトリの状態だった。プロジェクト側のブランチとは関係がない。

**どうするか**: push の前に `git branch --show-current` で今いるブランチを
確認し、そのブランチ名で push する。push のあとは
`git log --oneline -1 origin/<branch>` で本当に届いたかを見る。
本番URLへの curl だけでは「デプロイが遅い」のか「そもそも届いていない」のかが
分からないので、まずリモートの ref を見ること。
