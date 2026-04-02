import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "score-up-checklist",
    citySlug: "kita",
    title: "北区で加点を最大限に活用する方法　調整指数チェックリスト",
    description:
      "北区の保育園入園選考で調整指数の加点を最大限に活用するためのチェックリストです。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>北区の調整指数は項目が少ない</h2>
<p>北区の調整指数は加算6項目、減算1項目と、23区の中でも項目数が少ないのが特徴です。それだけに、使える加点は確実に活用することが重要です。</p>

<h3>主な加点項目</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>生活保護世帯</td><td>+3点</td><td>生活保護受給中</td></tr>
<tr><td>保育士として勤務</td><td>+3点</td><td>保護者が保育施設で保育士として就労</td></tr>
<tr><td>きょうだい在園・同時申込</td><td>+2点</td><td>きょうだいが在園中の園に申込む場合</td></tr>
<tr><td>単身赴任</td><td>+1点</td><td>保護者の一方が単身赴任中</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>北区は調整指数の項目が少ないため、同点の場合の優先順位が非常に重要です。ひとり親世帯が最優先されます。</p>
</div>

<h2>保育士加点に注目</h2>
<p>北区の特徴的な加点として、保護者が保育士として勤務している場合の<span class="highlight">+3点</span>があります。保育人材確保の観点から設けられた制度です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1002982.html" target="_blank" rel="noopener">北区公式サイト「利用調整方法」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "competition-reality",
    citySlug: "kita",
    title: "北区の保育園、入りやすさの実態と競争の現状",
    description:
      "北区の認可保育園の入園競争の実態をデータで解説します。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>北区の入園状況</h2>
<p>北区は保育施設の整備を積極的に進めており、待機児童数は減少傾向にあります。しかし赤羽・王子エリアを中心に依然として競争が続いています。</p>

<h2>年齢別の傾向</h2>
<table>
<tr><th>年齢</th><th>競争状況</th></tr>
<tr><td>0歳児</td><td>比較的入りやすい</td></tr>
<tr><td>1歳児</td><td>最も競争が激しい</td></tr>
<tr><td>2歳児</td><td>やや厳しい</td></tr>
<tr><td>3歳児以上</td><td>比較的入りやすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>北区はフルタイム共働きの基本ライン20点で内定するケースもありますが、人気園では20点でも入れないことがあります。</p>
</div>

<h2>最低保育指数を確認しよう</h2>
<p>北区は園別の内定者最低保育指数を公開しています。希望する園の過去のデータを必ず確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用調整結果は<a href="https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1002982.html" target="_blank" rel="noopener">北区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "jitan-kinmu-score",
    citySlug: "kita",
    title: "時短勤務と保育園　北区の点数への影響は？",
    description:
      "北区の保育園入園選考で時短勤務が選考指数にどう影響するかを解説します。",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務だと点数は下がる？</h2>
<p>北区では、育児短時間勤務制度を利用している場合、<strong>短縮前の契約時間</strong>で選考指数が算定されます。</p>

<table>
<tr><th>勤務形態</th><th>選考指数</th></tr>
<tr><td>フルタイム（週40時間以上）を時短で30時間に</td><td><span class="highlight">10点</span>（フルタイムで計算）</td></tr>
<tr><td>フルタイムを時短にし、さらに週3日に変更</td><td><span class="highlight">8点</span>（日数は短縮後で計算）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>北区は基本指数の上限が10点と低いため、時短で日数が減ると影響が大きくなります。勤務日数はできるだけ維持しましょう。</p>
</div>

<h2>入園後の時短勤務</h2>
<p>入園後に時短勤務に切り替えることは問題ありませんが、月<span class="highlight">48時間</span>以上の勤務が必要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1002982.html" target="_blank" rel="noopener">北区公式サイト「利用調整方法」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "same-score-priority",
    citySlug: "kita",
    title: "北区で同点になったらどうなる？優先順位を詳しく解説",
    description:
      "北区の保育園入園選考で同じ保育指数になった場合の優先順位を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>北区では調整指数の項目が少ないため、フルタイム共働き20点の世帯が多く、同点になるケースが頻繁にあります。優先順位が非常に重要です。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>ひとり親世帯</strong>
<p>ひとり親世帯が最優先されます。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>生活保護受給世帯</strong>
<p>生活保護を受けている世帯が優先されます。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保護者の障害</strong>
<p>保護者に障害がある世帯が優先されます。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>多子世帯</strong>
<p>養育している子どもの数が多い世帯が優先されます。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>所得が低い世帯</strong>
<p>住民税の所得割額が低い世帯が優先されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>北区は調整指数で差がつきにくいため、優先順位での勝負になりやすいです。きょうだい加点（+2）や保育士加点（+3）が取れる方は確実に申請しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1002982.html" target="_blank" rel="noopener">北区公式サイト「利用調整方法」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "ochita-sentakushi",
    citySlug: "kita",
    title: "北区で保育園に落ちたときの選択肢",
    description:
      "北区の認可保育園に入れなかった場合に検討すべき選択肢を紹介します。",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>落ちても次の手はある</h2>
<p>北区の一次選考で不承諾になった場合の選択肢を確認しましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次選考を待つ</strong>
<p>一次で不承諾だった方は二次選考の対象になります。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認証保育所・認可外施設に申し込む</strong>
<p>北区内の認証保育所に直接申し込めます。北区では認可外保育施設の利用に対する補助金制度もあります。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>小規模保育事業を利用する</strong>
<p>0〜2歳児向けの小規模保育事業もあります。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>家庭福祉員（保育ママ）を利用する</strong>
<p>北区では家庭福祉員制度も実施されています。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>幼稚園の預かり保育（3歳以上）</strong>
<p>3歳以上なら幼稚園の預かり保育も選択肢です。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1002982.html" target="_blank" rel="noopener">北区公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "kita",
    title: "北区の保育士加点とは？保育士として働く保護者の優遇制度",
    description:
      "北区独自の保育士加点制度について解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>保育士加点で+3点</h2>
<p>北区では、保護者のどちらかが保育施設で保育士として勤務している場合、調整指数として<span class="highlight">+3点</span>が加算されます。</p>

<h3>対象となる条件</h3>
<ul>
<li>保育士資格を持っていること</li>
<li>区内または近隣の保育施設で実際に保育士として就労中であること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>この制度は保育人材の確保を目的としたもので、北区の調整指数の中では最大の加点です。フルタイム共働き20点＋保育士加点3点＝23点で、多くの園に入園が見込めます。</p>
</div>

<h2>きょうだい加点（+2点）もあわせて</h2>
<p>きょうだいが在園中の園に申し込む場合は<span class="highlight">+2点</span>の加点もあります。保育士加点とあわせて最大+5点の加算が可能です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1002982.html" target="_blank" rel="noopener">北区公式サイト「利用調整方法」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "2026-hokatsu-changes",
    citySlug: "kita",
    title: "2026年度入園に向けて！北区の保活で変わったポイント",
    description:
      "2026年度の北区保育園入園に向けて、最近の制度変更をまとめます。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2025〜2026年で何が変わった？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>保育料の無償化拡大（2025年9月〜）</strong>
<p>東京都の第1子保育料無償化制度により、認可保育施設の保育料が全年齢で無償化されました。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設の補助金拡充</strong>
<p>認証保育所や認可外施設への補助金が拡充されました。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保育士加点の継続</strong>
<p>保育人材確保のための保育士加点（+3点）が引き続き適用されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>北区は調整指数の項目が少ないため、優先順位での競争が中心です。制度変更は少ないですが、園ごとの倍率は毎年変動します。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1002982.html" target="_blank" rel="noopener">北区公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "kita",
    title: "北区の入園点数のしくみ　選考指数と調整指数をやさしく解説",
    description:
      "北区の保育園入園選考で使われる選考指数と調整指数の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>北区の保育園入園は「保育指数」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>世帯の保育指数 ＝ 父の選考指数 ＋ 母の選考指数 ＋ 調整指数</p>
</div>

<h2>選考指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">10点</span>、父母合計で最大<span class="highlight">20点</span>です。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>週5日以上・週40時間以上</td><td>10</td></tr>
<tr><td>週4日以上・週32時間以上</td><td>9</td></tr>
<tr><td>週3日以上・週24時間以上</td><td>8</td></tr>
<tr><td>週3日以上・週16時間以上</td><td>6</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の特別な事情に応じた加点です。項目は少なめです。</p>
<ul>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>保育士として勤務：<span class="highlight">+3点</span></li>
<li>きょうだい在園・同時申込：<span class="highlight">+2点</span></li>
<li>単身赴任：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数表は<a href="https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1002982.html" target="_blank" rel="noopener">北区公式サイト「利用調整方法」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "area-guide",
    citySlug: "kita",
    title: "北区のエリア別保育園事情　入りやすいエリアは？",
    description:
      "北区内のエリアごとの保育園入園状況の違いを解説します。",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>エリアによって入りやすさが違う</h2>
<p>北区は南北に長い区で、エリアによって保育園の状況が異なります。</p>

<table>
<tr><th>エリア</th><th>競争度</th><th>特徴</th></tr>
<tr><td>赤羽駅周辺</td><td>激戦</td><td>交通利便性が高く子育て世帯に人気</td></tr>
<tr><td>王子・十条</td><td>やや激戦</td><td>マンション開発が進むエリア</td></tr>
<tr><td>田端・駒込</td><td>標準</td><td>JR沿線で比較的落ち着いたエリア</td></tr>
<tr><td>浮間・志茂</td><td>やや入りやすい</td><td>駅から離れた園は比較的入りやすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>赤羽エリアは特に人気が高く、20点でも入れない園があります。通える範囲で幅広く希望園を記入しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>園ごとの空き状況は<a href="https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1002982.html" target="_blank" rel="noopener">北区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "hokatsu-schedule",
    citySlug: "kita",
    title: "北区の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "北区の認可保育園の申込時期・選考の流れ・結果通知の時期を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度4月入園のスケジュール</h2>
<p>北区の4月入園は<strong>一次選考</strong>と<strong>二次選考</strong>の2回に分かれています。</p>

<h3>一次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>

<h3>二次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年1月下旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>北区の「保育利用案内」を入手しましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜10月：保育園見学</strong>
<p>気になる園に電話して見学予約をしましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜12月：書類準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新スケジュールは<a href="https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1002982.html" target="_blank" rel="noopener">北区公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
];

registerArticles(articles);
