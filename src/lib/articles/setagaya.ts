import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "setagaya",
    title: "世田谷区の保活、いつから始める？スケジュール完全ガイド",
    description:
      "世田谷区の認可保育園の申込時期・選考の流れ・内定通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>世田谷区の4月入園は、<strong>一次選考</strong>と<strong>二次選考</strong>の2回に分かれています。早めにスケジュールを把握して動き出すのが保活成功のカギです。</p>

<h3>一次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和7年9月1日〜11月10日（窓口締切）</td></tr>
<tr><td>郵送・電子申請の締切</td><td>令和7年11月5日（消印有効）</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬（全員に郵送）</td></tr>
</table>

<h3>二次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和7年11月12日〜令和8年2月2日（窓口締切）</td></tr>
<tr><td>郵送・電子申請の締切</td><td>令和8年1月28日（消印有効）</td></tr>
<tr><td>結果通知</td><td>2月下旬（内定者のみ保育園から電話連絡）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次選考の対象になります。再申込は不要です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<p>理想的なスケジュールはこのようなイメージです。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>保育園の種類やエリアを調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話して予約。見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月：「保育のごあんない」を入手</strong>
<p>区が発行する保活のバイブル。必ず手に入れましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>9月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込方法は窓口・郵送・電子申請の3つ。窓口と郵送はお住まいの地域の総合支所子ども家庭支援課で受付けています。</p>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月10日</span>です。ただし締切日が土日祝の場合や、12月・1月・4月入園は異なりますので注意してください。</p>
<p>詳しくは<a href="https://www.city.setagaya.lg.jp/01044/1551.html" target="_blank" rel="noopener">世田谷区公式サイト「申込みから入園までの流れ」</a>をご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "setagaya",
    title: "世田谷区の保活でよくある失敗と対策5選",
    description:
      "世田谷区の保活で初めてのママがやりがちな失敗パターンと、その対策をわかりやすくまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集のスタートが遅い</h2>
<p>「まだ先のこと」と思っているうちに、見学の予約が埋まってしまうケースは多いです。世田谷区の4月入園の申込は<span class="highlight">9月</span>から始まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>遅くとも6月には情報収集を始めましょう。見学予約が殺到する前に動くのが鉄則です。</p>
</div>

<h2>失敗2：希望園を少なく書く</h2>
<p>世田谷区では希望園を複数記入できます。「この園だけ」と1〜2園しか書かないと、不承諾のリスクが高まります。</p>
<p>通える範囲の園はできるだけ多く書くのが鉄則です。</p>

<h2>失敗3：自分の点数を把握していない</h2>
<p>世田谷区の入園選考では「利用基準指数＋調整基準指数」の合計で選考されます。入園児童の約<span class="highlight">40%</span>が<span class="highlight">105点</span>で入園しているのが実態です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>世田谷区では選考前に指数を教えてもらうことはできません。「保育のごあんない」の指数表で自分で計算する必要があります。</p>
</div>

<h2>失敗4：加点の取りこぼし</h2>
<p>認可外保育施設の利用実績で<span class="highlight">+5〜6点</span>の加点が得られることを知らず、加点なしで勝負してしまうケースも。調整指数の項目は全<span class="highlight">20項目</span>あるので、漏れなくチェックしましょう。</p>

<h2>失敗5：書類の不備で受理されない</h2>
<p>就労証明書の記入漏れや、指定様式以外の書類を提出してしまうミスも起こりがちです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>世田谷区の公式サイトにあるチェックリストを使って、提出前にダブルチェックしてください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>選考の仕組みは<a href="https://www.city.setagaya.lg.jp/01044/1554.html" target="_blank" rel="noopener">世田谷区公式サイト「選考方法について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "setagaya",
    title: "世田谷区の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "世田谷区の保育園入園選考で使われる「利用基準指数」と「調整基準指数」の仕組みを、初めての方にもわかるように解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>世田谷区の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。正式には「選考指数」と呼びます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 利用基準指数（父＋母）＋ 調整基準指数</p>
</div>

<h2>利用基準指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">50点</span>で、父母合計の最大は<span class="highlight">100点</span>。</p>
<p>最も多い「就労」の場合、週5日以上・週40時間以上で満点の50点になります。</p>

<table>
<tr><th>就労日数・時間</th><th>指数</th></tr>
<tr><td>週5日以上・週40時間以上</td><td>50</td></tr>
<tr><td>週5日以上・週35時間以上</td><td>48</td></tr>
<tr><td>週4日以上・週28時間以上</td><td>44</td></tr>
<tr><td>週3日以上・週24時間以上</td><td>36</td></tr>
</table>

<h2>調整基準指数とは？</h2>
<p>世帯の特別な事情に応じて加減される点数です。加算は<span class="highlight">20項目</span>、減算は<span class="highlight">3項目</span>あり、+20点〜-20点の幅があります。</p>

<p>代表的なものは以下の通りです。</p>
<ul>
<li>育休明け復職予定：<span class="highlight">+5点</span></li>
<li>認可外保育施設の利用実績：<span class="highlight">+5〜6点</span></li>
<li>ひとり親世帯：<span class="highlight">+10点</span></li>
<li>兄弟姉妹が在園中の園を希望：<span class="highlight">+2点</span></li>
</ul>

<h2>まずは自分の点数を計算してみよう</h2>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>世田谷区では選考前に指数を教えてもらうことはできません。「保育のごあんない」の指数表を見ながら自分で計算する必要があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数表は<a href="https://www.city.setagaya.lg.jp/01044/1554.html" target="_blank" rel="noopener">世田谷区公式サイト「選考方法について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-checklist",
    citySlug: "setagaya",
    title: "世田谷区で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "世田谷区の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>世田谷区の入園選考は激戦です。<span class="highlight">1点</span>の差が明暗を分けることもあるため、使える加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>育休明け復職予定</td><td>+5点</td><td>申込児の産休・育休明けに復職予定（世帯単位）</td></tr>
<tr><td>認可外保育施設の利用</td><td>+5〜6点</td><td>就労等の理由で有償で預けている場合（0歳児+5点、1歳児以上+6点）</td></tr>
<tr><td>ひとり親世帯</td><td>+10点</td><td>ひとり親であること</td></tr>
<tr><td>生活保護世帯</td><td>+10点</td><td>生活保護を受給中</td></tr>
<tr><td>兄弟姉妹が在園中</td><td>+2点</td><td>在園中の園への申込</td></tr>
<tr><td>小規模保育等の卒園児</td><td>加点あり</td><td>年齢上限のある施設からの卒園</td></tr>
<tr><td>不承諾実績</td><td>加点あり</td><td>世田谷区内の認可に申し込んで不承諾だった実績</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休中の認可外利用は「就労のため」ではないので加点対象外です。</p>
</div>

<h2>フルタイム＋育休明けが最多パターン</h2>
<p>父母ともにフルタイム勤務（<span class="highlight">100点</span>）＋育休明け加点（<span class="highlight">+5点</span>）＝<span class="highlight">105点</span>が、現在の世田谷区で最も多い入園パターンです。</p>
<p>入園児童の約<span class="highlight">40%</span>がこの105点で入園しています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>100点（フルタイム共働き・加点なし）では厳しい状況です。認可外保育施設を活用して加点を得る戦略が有効です。</p>
</div>

<h2>減点に注意！</h2>
<p>調整指数には減点項目もあります（<span class="highlight">3項目</span>）。たとえば、入園内定を辞退したことがある場合は減点の対象になることがあります。該当しないか事前に確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目の詳細は<a href="https://www.city.setagaya.lg.jp/01044/1554.html" target="_blank" rel="noopener">世田谷区公式サイト「選考方法について」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "competition-reality",
    citySlug: "setagaya",
    title: "105点が4割！世田谷区の入園競争の実態",
    description:
      "世田谷区の保育園入園選考における選考指数の分布データをもとに、入園競争の実態を解説します。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>入園児童の約40%が105点</h2>
<p>世田谷区が公開している「4月入園児童の選考指数分布」によると、令和7年4月の入園児童のうち、選考指数<span class="highlight">105点</span>の児童が全地域で約<span class="highlight">40%</span>を占めています。</p>
<p>105点とは、父母ともにフルタイム勤務（50点×2＝100点）に、育休明け加点（+5点）を加えた点数です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育児休業の取得率が上昇していることが、105点の割合が高くなっている背景にあります。</p>
</div>

<h2>指数分布のイメージ</h2>
<table>
<tr><th>選考指数</th><th>割合の目安</th><th>内訳</th></tr>
<tr><td>106点以上</td><td>少数</td><td>加点を複数持つ世帯</td></tr>
<tr><td><span class="highlight">105点</span></td><td><span class="highlight">約40%</span></td><td>最多層（フルタイム＋育休明け）</td></tr>
<tr><td>100〜104点</td><td>約30%</td><td>フルタイム共働き中心</td></tr>
<tr><td>75〜99点</td><td>約20%</td><td>パートタイム等</td></tr>
<tr><td>74点以下</td><td>少数</td><td>短時間勤務等</td></tr>
</table>

<h2>100点では厳しいの？</h2>
<p>入園児童の約<span class="highlight">90%</span>が選考指数100点以上です。100点（フルタイム共働き・加点なし）でも入園できるケースはありますが、人気園では105点でも入れないことがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>現実的な対策：認可外保育施設に有償で預けて加点（<span class="highlight">+5〜6点</span>）を得る方法が、多くの家庭で活用されています。</p>
</div>

<h2>地域による差はある？</h2>
<p>5つの地域（世田谷・北沢・玉川・砧・烏山）で指数分布に大きな差はありませんが、園ごとの倍率には差があります。</p>
<p>人気園に集中せず、通える範囲の園を幅広く希望に入れることが大切です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の指数分布データは<a href="https://www.city.setagaya.lg.jp/02243/1624.html" target="_blank" rel="noopener">世田谷区公式サイト「保育の統計資料」</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "same-score-priority",
    citySlug: "setagaya",
    title: "世田谷区で同点になったらどうなる？優先順位を詳しく解説",
    description:
      "世田谷区の保育園入園選考で同じ点数になった場合の6段階の優先順位を、わかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>世田谷区の入園選考では、選考指数が同じ場合に<span class="highlight">6段階</span>の優先順位で判定されます。105点の世帯が約40%を占める世田谷区では、この優先順位がとても重要です。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>年齢上限のある施設からの卒園</strong>
<p>小規模保育などで最終年齢クラスを卒園し、引き続き区内の保育園等を申し込む世帯が最優先されます。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>利用基準指数が高い世帯</strong>
<p>調整指数を除いた基本点数が高い世帯が優先。「加点で稼いだ」より「基本点数が高い」方が有利です。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>所得が低い世帯</strong>
<p>住民税の階層が低い世帯が優先。同一階層内では所得割課税額が低い世帯が優先です。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>認可外保育施設の利用期間が長い世帯</strong>
<p>申込児を認可外施設に有償で預けている期間が長いほど優先されます。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>世田谷区の居住期間が長い世帯</strong>
<p>世田谷区に住民登録して引き続き居住している期間が長い世帯が優先。転入したばかりの方は不利になる可能性があります。</p>
</div>
</div>

<div class="step">
<div class="step-num">6</div>
<div class="step-content">
<strong>保育を必要とする事由の優先順位</strong>
<p>不存在等 → 疾病・障害 → 就労 → 介護 → 出産 → 就労内定 → 求職 → 就学等の順で判定されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点勝負になったとき、「所得が低い」「居住期間が長い」が優先されるのは世田谷区ならではのポイントです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.setagaya.lg.jp/01044/1554.html" target="_blank" rel="noopener">世田谷区公式サイト「選考方法について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "ochita-sentakushi",
    citySlug: "setagaya",
    title: "世田谷区で保育園に落ちたときの5つの選択肢",
    description:
      "世田谷区の認可保育園の選考で不承諾だった場合に検討すべき5つの選択肢を、具体的に紹介します。",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>落ちても慌てないで！5つの道があります</h2>
<p>世田谷区の一次選考で不承諾だった場合、まず深呼吸。次にできることを一つずつ確認しましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次選考を待つ</strong>
<p>一次で不承諾だった方は自動的に二次選考の対象になります（再申込不要）。希望園の追加・変更は「申込内容変更・取下届」で手続きできます。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認証保育所に申し込む</strong>
<p>認可保育園とは別に、認証保育所に直接申し込めます。認可外に預けながら翌年度の認可を再申請すれば、加点（<span class="highlight">+5〜6点</span>）も得られます。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可外保育施設を利用する</strong>
<p>企業主導型保育施設やその他の認可外施設があります。世田谷区の補助金制度を活用すれば費用負担を軽減できます。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>定期利用保育を利用する</strong>
<p>認可保育園に入れなかった1〜3歳児向けの事業です。令和7年9月からは利用料（保育料・給食費）が<span class="highlight">無償化</span>されました。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>幼稚園の預かり保育を活用する（3歳以上）</strong>
<p>3歳以上のお子さんなら、幼稚園の預かり保育（延長保育）で保育園に近い時間帯で預けられる園もあります。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園担当窓口（TEL：03-5432-1200）に電話すれば、自分の指数や希望園での順位を教えてもらえます。次の作戦を立てる材料にしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.setagaya.lg.jp/01044/1555.html" target="_blank" rel="noopener">世田谷区公式サイト「入園できなかった場合は」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ikukyuake-hokatsu",
    citySlug: "setagaya",
    title: "育休明けの保活、世田谷区で気をつけること",
    description:
      "育休中に始める世田谷区の保活で、復職条件や申込時の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休明けの復職条件</h2>
<p>世田谷区では、育休明けで保育園に入園する場合、以下の<span class="highlight">2つの条件</span>を満たす必要があります。</p>
<ul>
<li>育休を認めた勤務先に復帰すること</li>
<li>入園した月中に勤務を開始すること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園の場合、4月30日までに復職すればOK。慣らし保育の期間を考慮して、4月中旬〜下旬に復職日を設定する方が多いです。</p>
</div>

<h3>申込時に必要な書類</h3>
<p>育休中に申し込む場合は、育休期間が記載された「就労証明書」を提出します。復職後の勤務日数・時間が記載されている必要があります。</p>

<h2>育休明け加点（+5点）を活用</h2>
<p>申込児の育休明け復職予定の場合、調整指数として<span class="highlight">+5点</span>が加算されます。これが世田谷区で最も多い入園パターン（<span class="highlight">105点</span>）の構成要素です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休中に認可外保育施設に預けても、「就労のため」ではないので認可外利用加点（+5〜6点）は得られません。</p>
</div>

<h2>復職証明書の提出を忘れずに</h2>
<p>入園後、復職したことを証明する「復職証明書」を世田谷区に提出する必要があります。提出期限を過ぎると退園になる場合があるため、必ず早めに手続きしましょう。</p>

<h2>転職したい場合は？</h2>
<p>育休明けは「育休を認めた勤務先への復帰」が条件です。入園後すぐの転職は、退園の対象になる可能性があるため注意が必要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.setagaya.lg.jp/01044/1557.html" target="_blank" rel="noopener">世田谷区公式サイト「育児休業中・育児短時間勤務等取得中（予定）の方へ」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "jitan-kinmu-score",
    citySlug: "setagaya",
    title: "時短勤務と保育園　世田谷区の点数への影響は？",
    description:
      "世田谷区の保育園入園選考で、時短勤務が利用基準指数にどう影響するかを解説します。",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務だと点数は下がる？</h2>
<p>結論から言うと、世田谷区では時短勤務でも入園選考の点数は<strong>基本的に下がりません</strong>。ただし条件があります。</p>

<h2>世田谷区のルール</h2>
<p>育児時間・育児短時間勤務制度等を取得して勤務時間が短くなる場合のルールは以下の通りです。</p>

<table>
<tr><th>項目</th><th>選考時の扱い</th></tr>
<tr><td>勤務時間</td><td>短縮前の契約時間で選考（時短前のフルタイム時間で計算）</td></tr>
<tr><td>勤務日数</td><td>日数が減少する場合は、短縮後の日数で選考</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>時短勤務で1日の労働時間が6時間になっても、契約上のフルタイムが8時間ならば8時間で計算されます。ただし、週4日に減らす場合は4日で計算されます。</p>
</div>

<h2>具体的にどうなる？</h2>
<table>
<tr><th>勤務形態</th><th>利用基準指数</th></tr>
<tr><td>フルタイム（週5日・40時間以上）を時短で6時間に</td><td><span class="highlight">50点</span>（フルタイムで計算）</td></tr>
<tr><td>フルタイムを時短にし、さらに週4日に変更</td><td><span class="highlight">44点</span>（日数は短縮後で計算）</td></tr>
</table>

<h2>入園後の時短勤務はOK？</h2>
<p>入園後に時短勤務に切り替えることは問題ありません。ただし、月<span class="highlight">48時間</span>以上の勤務を維持する必要があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>勤務時間が月48時間を下回ると「就労」として認められなくなるため注意してください。</p>
</div>

<h3>就労時間の計算ルール</h3>
<ul>
<li>就労時間には休憩時間を含む</li>
<li>通勤時間は含まない</li>
<li>入園月の1日時点で算定</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.setagaya.lg.jp/01044/18373.html" target="_blank" rel="noopener">世田谷区公式サイト「指数についてのよくある質問」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "2026-hokatsu-changes",
    citySlug: "setagaya",
    title: "2026年度入園に向けて！世田谷区の保活で変わったポイント",
    description:
      "2026年度（令和8年度）の世田谷区の保育園入園に向けて、最近変わった制度や新しい支援策をまとめます。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2025〜2026年で何が変わった？</h2>
<p>世田谷区の保活を取り巻く環境は年々変化しています。2026年度入園を目指す方が知っておくべき変更点をまとめました。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>保育料の完全無償化（2025年9月〜）</strong>
<p>東京都の第1子保育料無償化制度に合わせて、認可保育施設の保育料が全年齢・全所得で無償化されました。第1子から対象で、0〜2歳児の保育料が<span class="highlight">無料</span>に。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設の補助金拡充（2025年9月〜）</strong>
<p>認証保育所の補助上限額が引き上げ。無認可保育施設の補助要件と金額が拡充。企業主導型保育施設は第1子も補助対象になりました。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>ベビーシッター利用支援事業の開始（2026年4月〜）</strong>
<p>待機児童対策として新たにスタート。一時預かり利用支援と、待機児童向けの事業者連携型の2種類があります。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>定期利用保育の無償化（2025年9月〜）</strong>
<p>認可保育園に入れなかった1〜3歳児向けの定期利用保育事業の利用料（保育料・給食費）が<span class="highlight">無償化</span>されました。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料の無償化と補助金の拡充により、経済的なハードルは大幅に下がりました。</p>
</div>

<h2>2026年度入園のスケジュール</h2>
<table>
<tr><th>選考</th><th>申込期間</th><th>結果通知</th></tr>
<tr><td>一次</td><td>令和7年9月1日〜11月10日</td><td>令和8年1月下旬</td></tr>
<tr><td>二次</td><td>令和7年11月12日〜令和8年2月2日</td><td>2月下旬</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育人材不足による待機児童の再増加には注意が必要です。制度が充実しても定員が増えなければ競争は続きます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.setagaya.lg.jp/01044/1561.html" target="_blank" rel="noopener">世田谷区公式サイト「令和8年4月入園について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "setagaya",
    title: "世田谷区の就労証明書 記入例【令和8年度版】点数別の書き方と注意点",
    description:
      "世田谷区の保育園申込みに必要な就労証明書の記入例を徹底解説。基本指数を決める週就労時間・日数の正しい書き方（週40時間以上で50点）、よくある記入ミスTop5と対策チェックリスト。令和8年度申込対応。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労証明書とは</h2>
<p>就労証明書は、保護者が「保育を必要とする事由（就労）」を証明するための書類です。勤務先に記入・証明してもらい、区役所に提出します。<strong>基本指数を決める最重要書類</strong>のため、記入内容が点数に直結します。</p>

<h2>世田谷区の指数と就労時間の関係</h2>
<p>世田谷区は東京都方式の指数制（各保護者最大50点）を採用しています。就労証明書に記載された就労時間・日数によって以下の指数が付与されます。</p>
<table>
<tr><th>就労条件</th><th>基本指数</th></tr>
<tr><td>週5日以上かつ週40時間以上</td><td>50点</td></tr>
<tr><td>週4日以上かつ週35時間以上</td><td>40点</td></tr>
<tr><td>週4日以上かつ週30時間以上</td><td>35点</td></tr>
<tr><td>週3日以上かつ週25時間以上</td><td>30点</td></tr>
<tr><td>週3日以上かつ週20時間以上</td><td>25点</td></tr>
<tr><td>週3日以上かつ週16時間以上</td><td>20点</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>15点</td></tr>
</table>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働きの場合、両親合計100点が基本ラインです。週40時間以上の就労なら50点、時短勤務で週35時間以上なら40点になります。<span class="highlight">証明書の就労時間欄が点数を決定します。</span></p>
</div>

<h2>就労証明書の主な記入項目</h2>
<ul>
<li>勤務先の名称・所在地・電話番号</li>
<li>雇用形態（正社員・パート・派遣など）</li>
<li><strong>1週間の就労日数</strong>（指数判定に直結）</li>
<li><strong>1週間の就労時間</strong>（指数判定に直結）</li>
<li>雇用開始日・雇用期間</li>
<li>所在地・業種</li>
</ul>
<div class="point-box">
<p><strong>重要</strong></p>
<p>「1週間の就労時間」欄には<span class="highlight">所定労働時間（契約上の時間）</span>を記入します。残業時間は含みません。時短勤務中の方は時短後の実際の勤務時間を記入してもらいましょう。</p>
</div>

<h2>よくある記入ミス Top5</h2>
<table>
<tr><th>ミスの内容</th><th>対策</th></tr>
<tr><td>残業込みの時間を書いてしまう</td><td>所定労働時間のみ記入するよう会社に伝える</td></tr>
<tr><td>育休前の勤務時間を書く</td><td>復職後の（時短）勤務時間を記入してもらう</td></tr>
<tr><td>会社の記入漏れ（印鑑・日付など）</td><td>提出前に全項目チェック</td></tr>
<tr><td>在宅勤務なのに「居宅外」と記載</td><td>テレワーク・在宅の場合も居宅外就労に該当することを担当者に説明</td></tr>
<tr><td>提出期限ギリギリに依頼</td><td>申込期限の1か月前には会社に依頼する</td></tr>
</table>

<h2>会社への依頼タイミング</h2>
<p>就労証明書は会社の人事部門に依頼してから受け取るまで<strong>2〜3週間かかる</strong>ことがあります。世田谷区の一次申込は9月〜11月上旬ですので、<span class="highlight">8月中には依頼</span>しましょう。</p>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>8月上旬：会社に依頼</strong><p>就労証明書の様式を世田谷区HPからダウンロードして人事部門に渡す。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>8月中〜下旬：受け取り・確認</strong><p>受け取り後は就労日数・時間が正確かすぐに確認。ミスがあれば再依頼。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9〜11月：申込時に提出</strong><p>一次利用調整（9月〜11月10日）に合わせて提出。</p></div>
</div>

<h2>自営業・フリーランスの場合</h2>
<p>自営業・フリーランスの場合は「就労証明書」ではなく<strong>自営業等申告書</strong>を提出します。確定申告書の控えや業務委託契約書など、就労実態を証明する書類の添付が必要です。</p>

<h2>育休中の方へ</h2>
<p>育児休業中の方は、育休前（または復職後予定）の就労条件を記載した証明書を提出します。産休・育休中でも入園申込は可能で、「育休中の方は入園月から復職」という条件で申込できます。</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>復職後に時短勤務を予定している方は、<span class="highlight">時短勤務後の就労時間</span>で証明書を作成してもらいましょう。週35時間以上確保できれば40点が維持できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式・記入例は<a href="https://www.city.setagaya.lg.jp/01044/1561.html" target="_blank" rel="noopener">世田谷区公式サイト「令和8年4月入園について」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 55,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "setagaya",
    title: "世田谷区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "世田谷区の認可保育園の保育料を年収・子ども数別に詳しく解説。市民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>世田谷区の保育料はどうやって決まる？</h2>
<p>世田谷区の認可保育園の保育料（利用者負担額）は、<strong>世帯の市区町村民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。世田谷区は東京23区の中でも保育需要が特に高い区として知られています。</p>

<h2>年齢ごとの基本ルール</h2>
<table>
<tr><th>年齢</th><th>保育料</th><th>注意点</th></tr>
<tr><td>0〜2歳児</td><td>有料（階層区分による）</td><td>世帯の所得割額で決定</td></tr>
<tr><td>3〜5歳児</td><td>無償（月額上限あり）</td><td>幼児教育・保育の無償化対象</td></tr>
</table>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上は保育料が無償化されますが、<span class="highlight">副食費（給食の食材費）は別途負担</span>が必要です。低所得世帯や第3子以降は免除される場合があります。</p>
</div>

<h2>保育料の階層区分（0〜2歳の目安）</h2>
<table>
<tr><th>市民税所得割額（世帯合計）</th><th>保育料目安（月額・0歳）</th></tr>
<tr><td>非課税世帯</td><td>無料</td></tr>
<tr><td>〜約5万円</td><td>6,000〜9,000円</td></tr>
<tr><td>〜約10万円</td><td>12,000〜19,000円</td></tr>
<tr><td>〜約20万円</td><td>25,000〜38,000円</td></tr>
<tr><td>〜約30万円</td><td>42,000〜52,000円</td></tr>
<tr><td>30万円超</td><td>58,000〜77,000円</td></tr>
</table>
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は世田谷区の公式保育料表をご確認ください。</p>

<h2>多子世帯・ひとり親世帯の軽減</h2>
<ul>
<li><strong>第2子</strong>：同一世帯で保育所等を利用中の場合、半額</li>
<li><strong>第3子以降</strong>：無料</li>
<li><strong>ひとり親世帯・生活保護世帯</strong>：最低階層として算定（大幅減額）</li>
</ul>

<h2>副食費について（3歳以上）</h2>
<p>3歳以上は保育料が無償化されますが、副食費（おかず代）は月額4,500円程度の実費負担があります。以下の場合は免除されます。</p>
<ul>
<li>年収360万円未満相当の世帯</li>
<li>第3子以降の子ども</li>
</ul>

<h2>世田谷区の保育料の特徴</h2>
<p>世田谷区は東京23区の中でも待機児童問題が続いてきた地区のひとつです。0歳〜2歳児の保育需要が高く、0歳入園の競争も激しいです。保育料は高所得層では月7〜8万円台になることもあります。</p>

<h2>保育料の確認方法</h2>
<p>毎年6月ごろ、前年度の市民税額が確定した後に保育料が決定・通知されます。世田谷区保育課または各保育施設にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は<a href="https://www.city.setagaya.lg.jp/01044/1561.html" target="_blank" rel="noopener">世田谷区公式サイト「令和8年4月入園について」</a>からご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 55,
  },
];

registerArticles(articles);
