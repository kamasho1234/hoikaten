import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "sendai",
    title: "仙台市の保活スケジュール　令和8年度4月入園の流れを解説",
    description:
      "仙台市の認可保育園の申込時期・選考の流れ・内定通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>仙台市の4月入園は、<strong>1次利用調整</strong>と<strong>2次以降の利用調整</strong>の2段階で行われます。早めにスケジュールを把握して準備を始めましょう。</p>

<h3>1次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月4日（火）〜12月3日（水）</td></tr>
<tr><td>結果通知</td><td>令和8年2月上旬（郵送）</td></tr>
</table>

<h3>2次以降の利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年12月4日（木）〜令和8年2月2日（月）</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次で利用待機となった方は、自動的に2次以降の利用調整の対象となります。再申込は不要です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>仙台市の保育施設の種類やエリアごとの特徴を調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。夏場が見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：利用案内を入手</strong>
<p>仙台市が公表する「保育施設等利用案内」を確認し、申込に必要な書類を揃えましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の提出</strong>
<p>就労証明書などの書類を揃えて、お住まいの区の区役所保育給付課に提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>年度途中の各月1日付利用開始を希望する場合、<span class="highlight">前月の5日</span>が申込締切日です。土日祝日の場合は直前の開庁日が締切となります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト「保育施設等の利用を希望されるみなさまへ」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },

  // ===== 点数・選考 (4) =====
  {
    slug: "scoring-system-guide",
    citySlug: "sendai",
    title: "仙台市の入園点数のしくみ　基準指数と調整指数をやさしく解説",
    description:
      "仙台市の保育園入園選考で使われる「基準指数」と「調整指数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>仙台市の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。これを<strong>利用調整</strong>と呼びます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点 ＝ 基準指数（父）＋ 基準指数（母）＋ 調整指数</p>
</div>

<h2>基準指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">10点</span>で、父母合計の最大は<span class="highlight">20点</span>。</p>
<p>最も多いのは「就労」で、フルタイム（月20日以上かつ1日8時間以上）の場合は満点の10点となります。</p>

<table>
<tr><th>保育を必要とする理由（就労の例）</th><th>指数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>10</td></tr>
<tr><td>月20日以上・1日6時間以上</td><td>8</td></tr>
<tr><td>月16日以上・1日4時間以上</td><td>6</td></tr>
<tr><td>月12日以上・1日4時間以上</td><td>4</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>家庭の状況に応じて加算・減算される点数です。主な項目は以下の通りです。</p>

<table>
<tr><th>項目</th><th>調整点</th></tr>
<tr><td>ひとり親世帯</td><td>+3</td></tr>
<tr><td>きょうだいが希望園に在園中</td><td>+3</td></tr>
<tr><td>生活保護世帯・市民税非課税世帯</td><td>+2</td></tr>
<tr><td>地域型保育事業の卒園児</td><td>+10</td></tr>
<tr><td>65歳未満の祖父母が同居</td><td>-1</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>調整指数は項目によって加点にも減点にもなります。65歳未満の祖父母が同居していると1点の減点対象になるため注意が必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数の詳細は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "border-line",
    citySlug: "sendai",
    title: "仙台市の保育園ボーダーライン　何点あれば入れる？",
    description:
      "仙台市の認可保育園に入るには何点必要？フルタイム共働きの20点で足りるのか、加点の有無による違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>フルタイム共働き＝20点がボーダー</h2>
<p>仙台市の基準指数は父母各最大10点の合計<span class="highlight">20点</span>が満点です。フルタイム共働き世帯はこの20点となり、多くの人気園ではこの20点がボーダーラインとなっています。</p>

<h2>20点で同点の場合はどうなる？</h2>
<p>基準指数が同点の場合、仙台市では以下の優先順位で利用調整が行われます。</p>
<ol>
<li>調整指数の合計が高い世帯</li>
<li>保育の必要性がより高いと認められる世帯（課税額等を考慮）</li>
<li>仙台市に住民登録がある期間が長い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>20点で横並びになるため、<strong>調整指数で差がつく</strong>のが仙台市の特徴です。ひとり親世帯（+3）、きょうだい在園（+3）、地域型保育卒園（+10）などの加点がある方が有利になります。</p>
</div>

<h2>加点なしの20点で入れる園はある？</h2>
<p>エリアや年齢クラスによって状況は大きく異なります。</p>
<ul>
<li><strong>0〜1歳児クラス</strong>：人気園では20点でも厳しい場合あり</li>
<li><strong>2歳児クラス</strong>：小規模保育からの進級枠があるため、枠が限られる</li>
<li><strong>3歳児クラス以上</strong>：比較的入りやすい傾向</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>仙台市は2022年に待機児童ゼロを達成しましたが、希望する特定の園に入れるかは別の話です。希望園は幅広く記入することをおすすめします。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各施設の入所状況は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/nyusho/ichiran/index.html" target="_blank" rel="noopener">仙台市公式サイト「保育施設等入所状況一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "katen-up-strategy",
    citySlug: "sendai",
    title: "仙台市で点数を上げる方法　調整指数の加点項目を総チェック",
    description:
      "仙台市の保育園入園選考で調整指数の加点を得る方法を解説。該当項目を見落とさないためのチェックリストです。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整指数の加点項目一覧</h2>
<p>仙台市の利用調整で使われる調整指数の主な加点項目をまとめました。該当するものがないか、一つひとつ確認しましょう。</p>

<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+3</td><td>父または母がいない世帯</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが希望する保育施設に在園中</td></tr>
<tr><td>生活保護世帯</td><td>+2</td><td>生活保護を受給中の世帯</td></tr>
<tr><td>市民税非課税世帯</td><td>+2</td><td>世帯全員が市民税非課税</td></tr>
<tr><td>地域型保育卒園児</td><td>+10</td><td>小規模保育等を卒園する児童</td></tr>
</table>

<h2>減点項目にも注意</h2>
<table>
<tr><th>減点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>65歳未満の祖父母同居</td><td>-1</td><td>保育可能な祖父母が同居している場合</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>祖父母が同居していても、就労中や疾病等で保育ができない場合は減点対象外となることがあります。該当する方は必ず区役所に相談しましょう。</p>
</div>

<h2>点数を上げるためにできること</h2>
<ol>
<li><strong>就労時間を確認する</strong>：基準指数はフルタイム（月20日以上・1日8時間以上）で最大10点。パートの場合、勤務時間を増やせるか検討する</li>
<li><strong>きょうだい同園を狙う</strong>：上の子と同じ園に申し込むことで+3点</li>
<li><strong>小規模保育を経由する</strong>：0〜2歳で小規模保育に入り、3歳時に+10点で認可園に転園</li>
<li><strong>該当する加点を漏れなく申告する</strong>：書類に記載しなければ加点されない</li>
</ol>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>調整指数の全項目は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>に記載されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "douten-tiebreak",
    citySlug: "sendai",
    title: "仙台市の保育園選考　同点の場合の優先順位を解説",
    description:
      "仙台市の認可保育園で同じ点数の申込者が複数いる場合、どのような基準で優先されるのか解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>仙台市では、基準指数＋調整指数の合計が同じ場合、以下の順序で優先されます。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>調整指数の合計が高い方</strong>
<p>基準指数が同じ場合でも、調整指数での差が考慮されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>保育の必要性がより高い世帯</strong>
<p>世帯の課税額や家庭の状況など、保育の緊急度が総合的に判断されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>仙台市の住民登録期間が長い世帯</strong>
<p>同じ条件であれば、仙台市に長く住んでいる世帯が優先されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働きの世帯は基準指数20点で横並びになりやすいため、調整指数で差をつけることが重要です。ひとり親（+3）やきょうだい在園（+3）の加点がない場合は、希望園を幅広く書くことで入園の可能性を高めましょう。</p>
</div>

<h2>所得が低い方が有利？</h2>
<p>同点の場合に課税額が考慮される場合があります。これは「保育の必要性がより高い」という観点からの判断です。ただし、課税額だけで決まるわけではなく、総合的な判断が行われます。</p>

<h2>同点対策のまとめ</h2>
<ul>
<li>調整指数の加点項目は全て漏れなく申告する</li>
<li>希望園を多く書いて内定確率を上げる</li>
<li>人気園だけでなく、空きのある園も候補に入れる</li>
<li>不明な点は区役所の保育給付課に相談する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の方法は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },

  // ===== 育休・復職 (1) =====
  {
    slug: "jitan-kinmu-score",
    citySlug: "sendai",
    title: "時短勤務だと点数はどうなる？仙台市の基準指数への影響",
    description:
      "育休復帰後に時短勤務を選ぶ場合、仙台市の基準指数にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>時短勤務は基準指数に影響する</h2>
<p>仙台市の基準指数は「勤務日数」と「1日の勤務時間」で決まります。時短勤務を選ぶと、フルタイムに比べて基準指数が下がる可能性があります。</p>

<h2>勤務条件と基準指数の関係</h2>
<table>
<tr><th>勤務条件</th><th>基準指数</th><th>1日の勤務時間の目安</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>10点</td><td>フルタイム</td></tr>
<tr><td>月20日以上・1日6時間以上</td><td>8点</td><td>6時間の時短勤務</td></tr>
<tr><td>月16日以上・1日4時間以上</td><td>6点</td><td>週4日パート</td></tr>
<tr><td>月12日以上・1日4時間以上</td><td>4点</td><td>週3日パート</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>仙台市は父母合算方式のため、片方が時短勤務で基準指数が8点になると、もう片方が満点の10点でも合計は18点にとどまります。フルタイム共働き（20点）との差は2点ですが、この差が人気園の選考では大きく影響します。</p>
</div>

<h2>入園申込時は「復職後の勤務時間」で判定</h2>
<p>入園申込の時点では育休中のケースが多いですが、就労証明書には復職後の予定勤務条件を記載してもらいます。復職後にフルタイムで働く予定なら、フルタイムの基準指数で利用調整を受けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「入園申込時はフルタイム勤務で申告し、入園後に時短勤務に変更する」ことは可能です。ただし、変更後の勤務時間が月48時間未満になると保育の必要性がなくなるため注意してください。</p>
</div>

<h2>時短でも基準指数を維持するには</h2>
<ul>
<li>1日6時間以上・月20日以上であれば基準指数8点を確保できる</li>
<li>勤務日数を増やすことで上の区分に合わせる方法もある</li>
<li>勤務先と相談して、入園申込時点でのフルタイム復職を検討する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>基準指数表の詳細は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },

  // ===== 保育園選び (1) =====
  {
    slug: "area-guide",
    citySlug: "sendai",
    title: "仙台市のエリア別保活事情　5区の特徴と入りやすさ",
    description:
      "仙台市の青葉区・宮城野区・若林区・太白区・泉区のエリア別に、保育園の数や入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "rose",
    content: `<h2>仙台市5区の保活事情</h2>
<p>仙台市は5つの区に分かれており、それぞれ保育施設の数や入りやすさが異なります。お住まいのエリアの特徴を把握しておきましょう。</p>

<h3>青葉区</h3>
<p>仙台駅周辺を含む中心部は保育需要が高く、0〜1歳児クラスは競争率が高い傾向です。一方、郊外エリアでは比較的空きがある施設もあります。</p>

<h3>宮城野区</h3>
<p>仙台駅東口や新田・岩切エリアでファミリー層が増えています。新しいマンション周辺では保育需要が集中することがあります。</p>

<h3>若林区</h3>
<p>荒井や六丁の目など地下鉄東西線沿線で開発が進み、保育施設も増加傾向にあります。新規園が開設されたエリアは比較的入りやすいこともあります。</p>

<h3>太白区</h3>
<p>長町エリアはファミリー層に人気が高く保育需要も多いですが、施設数も充実しています。八木山方面は比較的余裕のある傾向です。</p>

<h3>泉区</h3>
<p>泉中央駅周辺は需要が高めですが、郊外部では空きがある施設が多い傾向です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「駅から近い園」「新しい園」に人気が集中しやすいですが、少し離れた園や開設から年数の経った園では入りやすいケースがあります。送迎経路を工夫して候補を広げましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各施設の入所状況は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/nyusho/ichiran/index.html" target="_blank" rel="noopener">仙台市公式サイト「保育施設等入所状況一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },

  // ===== 認可外 (2) =====
  {
    slug: "ninkagai-oyako",
    citySlug: "sendai",
    title: "認可園に落ちた場合の選択肢　仙台市の認可外・一時預かり活用法",
    description:
      "仙台市の認可保育園に入れなかった場合に検討すべき認可外保育施設や一時預かりの選択肢を紹介します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>認可園に入れなかったらどうする？</h2>
<p>仙台市の認可保育園に入れなかった場合でも、いくつかの選択肢があります。慌てずに次のステップを検討しましょう。</p>

<h2>選択肢1：2次利用調整に申し込む</h2>
<p>1次で利用待機となった場合、自動的に2次以降の利用調整の対象になります。1次で埋まらなかった枠や辞退で生じた枠で内定する可能性があります。</p>

<h2>選択肢2：認可外保育施設を利用する</h2>
<p>認可外保育施設なら点数による選考がなく、空きがあればすぐに入園できます。施設に直接問い合わせましょう。</p>

<h2>選択肢3：企業主導型保育の地域枠を利用する</h2>
<p>地域枠に空きがあれば利用可能です。保育料も比較的リーズナブルな施設が多いです。</p>

<h2>選択肢4：一時預かり事業を利用する</h2>
<p>仙台市の保育施設の中には、一時預かり事業を実施しているところがあります。定期的な利用はできませんが、つなぎとして活用できる場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設を利用しながら、毎月の途中入園の申込を続けることもできます。途中入園の締切は希望月の前月5日です。</p>
</div>

<h2>選択肢5：育休を延長する</h2>
<p>認可保育園に入れなかったことを理由に育児休業を延長することも可能です。最長で子どもが2歳になるまで延長でき、育児休業給付金も受給できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育児休業給付金の延長手続きが厳格化されています。ハローワークに利用申込書の写しと不承諾通知を提出する必要があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>市内の保育施設の空き状況は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/nyusho/ichiran/index.html" target="_blank" rel="noopener">仙台市公式サイト「保育施設等入所状況一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "sendai",
    title: "仙台市で認可外を経由して加点を得る方法　小規模保育の活用術",
    description:
      "仙台市で認可外保育施設や小規模保育を活用して、認可園の入園選考で加点を得る戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780860-5e6801e6e7f5?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>仙台市で「認可外→認可」の加点はある？</h2>
<p>仙台市の利用調整基準では、認可外保育施設に通っているだけでは直接的な加点はありません。しかし、<strong>地域型保育事業（小規模保育・家庭的保育など）を卒園する児童</strong>には<span class="highlight">+10点</span>の大きな加点があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>地域型保育事業は認可施設です。0〜2歳児を対象としており、3歳で卒園する際に認可保育園への転園で+10点の加点が得られます。これは仙台市で最も大きな加点項目です。</p>
</div>

<h2>小規模保育を経由する戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>0歳または1歳で小規模保育に入園</strong>
<p>小規模保育は定員が6〜19名と少なく、認可保育園より入りやすい傾向があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>3歳の4月に認可保育園へ転園</strong>
<p>卒園加点+10が適用されるため、フルタイム共働き20点＋卒園加点10点＝30点で選考を受けられます。</p>
</div>
</div>

<h2>認可外保育施設を「つなぎ」で使う方法</h2>
<p>認可外保育施設は園と直接契約のため、認可園の選考結果を待たずに入れます。認可外に通いながら毎月の途中入園の申込を継続し、空きが出たタイミングで認可園に移る方法もあります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設に通っていること自体は、仙台市の利用調整で加点の対象にはなりません。加点が得られるのは「地域型保育事業の卒園児」に限られます。</p>
</div>

<h2>認可外利用時の無償化</h2>
<p>認可外保育施設でも「保育の必要性」の認定を受ければ無償化の対象になります。3〜5歳児は月額37,000円まで、0〜2歳児（住民税非課税世帯）は月額42,000円まで補助されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>地域型保育事業の一覧は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>で確認できます。認可外保育施設の一覧は<a href="https://www.city.sendai.jp/kodomo-shido/kurashi/kenkotofukushi/kosodate/hoikujo/ninkagai/hoikushisetsu/ichiran.html" target="_blank" rel="noopener">仙台市公式サイト「認可外保育施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },

  // ===== 最新情報 (1) =====
  {
    slug: "seido-kaisei-2026",
    citySlug: "sendai",
    title: "2026年度の保育制度改正ポイント　仙台市の保活への影響",
    description:
      "2026年度に予定されている保育関連の制度改正と、仙台市の保活への影響をまとめます。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>2025年4月〜の育休延長手続き厳格化</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長手続きが厳格化されました。主な変更点は以下の通りです。</p>
<ul>
<li>ハローワークに保育施設の利用申込書の写しを提出することが必要に</li>
<li>「速やかな職場復帰のために」保育所等の利用申し込みをしていることが確認される</li>
<li>意図的に入園しにくい条件で申し込んでいた場合、延長が認められない可能性</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「育休を延長するため」にあえて落ちるような申込をすることは、制度の趣旨に反するとして認められなくなりました。入園を希望する園に誠実に申し込むことが重要です。</p>
</div>

<h2>保育の質の向上に向けた取り組み</h2>
<p>国は保育士の配置基準の改善を進めており、1歳児の配置基準を6:1から5:1へ引き上げる方向で検討が続いています。仙台市でも保育の質の向上に向けた取り組みが行われています。</p>

<h2>仙台市独自の動き</h2>
<ul>
<li>地域型保育事業の連携施設設定の推進（卒園後の受け皿確保）</li>
<li>電子申請の拡充（マイナポータルを通じた利用申込）</li>
<li>保育施設の入所状況のオンライン公表の充実</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>制度の変更は毎年行われる可能性があります。最新の情報は必ず仙台市の公式サイトや「保育施設等利用案内」で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用案内は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。育休延長の手続きについては<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省の公式ページ</a>もご参照ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },

  // ===== 園えらび =====
  {
    slug: "nursery-visit-guide",
    citySlug: "sendai",
    title: "仙台市の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "仙台市で保育園見学をする際に確認すべきポイントや、園に聞いておきたい質問をまとめました。見学前の準備にご活用ください。",
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>見学の予約方法</h2>
<p>仙台市の認可保育園は、各園に直接電話して見学を予約するのが一般的です。<strong>7月〜9月</strong>が見学シーズンで、10月以降は申込時期と重なるため早めの行動がおすすめです。</p>

<h2>見学時のチェックポイント</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>保育室の様子</strong>
<p>子どもたちが落ち着いて遊んでいるか、保育士の声かけの仕方、部屋の明るさや清潔さを確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>園庭・外遊びの環境</strong>
<p>園庭の広さや遊具の状態、園庭がない場合はどこの公園に散歩に行くかを確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>給食の内容</strong>
<p>自園調理かどうか、アレルギー対応の有無、献立表を見せてもらえるか聞いてみましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>送迎のしやすさ</strong>
<p>駐車場・駐輪場の有無、登降園時の混雑状況、通勤経路との相性を確認します。</p>
</div>
</div>

<h2>園に聞いておきたい質問</h2>
<ul>
<li>慣らし保育の期間はどのくらいですか？</li>
<li>延長保育は何時まで対応していますか？</li>
<li>持ち物はどのようなものが必要ですか？</li>
<li>保護者参加の行事はどのくらいありますか？</li>
<li>病児・病後児保育の連携はありますか？</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学は1園だけでなく、3〜5園を比較するのがおすすめです。園によって雰囲気や方針が大きく異なります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>仙台市内の認可保育施設の一覧は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ===== データ分析 =====
  {
    slug: "zero-vs-one-year",
    citySlug: "sendai",
    title: "仙台市の0歳児入園と1歳児入園　どちらが入りやすい？",
    description:
      "仙台市の認可保育園で0歳児クラスと1歳児クラスの入りやすさを比較。定員枠の考え方と入園戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>0歳児と1歳児、どちらが入りやすい？</h2>
<p>結論から言うと、仙台市では<strong>0歳児クラスの方が入りやすい傾向</strong>にあります。理由は「定員枠に対する応募者数の比率」にあります。</p>

<h2>なぜ0歳児の方が入りやすいのか</h2>
<table>
<tr><th>項目</th><th>0歳児クラス</th><th>1歳児クラス</th></tr>
<tr><td>定員枠</td><td>新規枠がすべて空き</td><td>0歳から進級する子がいるため新規枠が少ない</td></tr>
<tr><td>応募者数</td><td>生後間もないため比較的少ない</td><td>育休明けの保護者が集中</td></tr>
<tr><td>競争率</td><td>比較的低い傾向</td><td>高い傾向</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1歳児クラスは「育休が1年」という保護者が多く申込が集中します。0歳児の4月入園を狙う場合、4月〜9月生まれのお子さんが対象になりやすいです。</p>
</div>

<h2>0歳児入園のメリット・デメリット</h2>
<ul>
<li><strong>メリット</strong>：競争率が低い、早くから集団生活に慣れる</li>
<li><strong>デメリット</strong>：育休を短く切り上げる必要がある、生後57日以降でないと入園不可の園が多い</li>
</ul>

<h2>1歳児入園を狙う場合の対策</h2>
<ul>
<li>希望園を幅広く書く（5〜10園以上が目安）</li>
<li>小規模保育や家庭的保育も候補に入れる</li>
<li>調整指数の加点をもれなく申告する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各施設の年齢別の入所状況は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/nyusho/ichiran/index.html" target="_blank" rel="noopener">仙台市公式サイト「保育施設等入所状況一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // ===== 制度を知る =====
  {
    slug: "single-parent-guide",
    citySlug: "sendai",
    title: "仙台市のひとり親世帯の保活ガイド　加点と利用できる支援制度",
    description:
      "仙台市でひとり親世帯が保育園に申し込む際の加点や、利用できる支援制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の加点</h2>
<p>仙台市の利用調整では、ひとり親世帯には調整指数で<span class="highlight">+3点</span>の加点があります。フルタイム勤務（基準指数10点）の場合、合計13点＋調整指数3点で有利に選考を受けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯の基準指数は片方の保護者分のみで算出されます。フルタイムなら基準指数10点＋調整指数3点＝合計13点が基本ラインです。</p>
</div>

<h2>ひとり親世帯が利用できる支援制度</h2>
<ul>
<li><strong>児童扶養手当</strong>：所得に応じて月額最大45,500円（2026年度時点の目安。最新の金額は仙台市に確認してください）</li>
<li><strong>ひとり親家庭等医療費助成</strong>：18歳までの子どもと親の医療費自己負担分を助成</li>
<li><strong>保育料の減額</strong>：市民税非課税世帯は保育料無料、課税世帯でも所得に応じた減額あり</li>
</ul>

<h2>申込時に必要な書類</h2>
<ul>
<li>戸籍謄本（ひとり親であることの確認のため）</li>
<li>就労証明書</li>
<li>保育施設等利用申込書</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親家庭への支援制度の詳細は<a href="https://www.city.sendai.jp/kurashi/kenkotofukushi/kosodate/hoikujo/" target="_blank" rel="noopener">仙台市公式サイト「ひとり親家庭のための各種支援」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== 保活の基本 =====
  {
    slug: "ikukyu-timing",
    citySlug: "sendai",
    title: "育休はいつまで取る？仙台市の保活と育休タイミングの考え方",
    description:
      "仙台市で保活をする際に、育休をいつまで取るべきか。入園時期と育休期間の関係を解説します。",
    image:
      "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休と入園のタイミング</h2>
<p>仙台市の4月入園に合わせて育休から復職するのが最も一般的なパターンです。入園月の翌月末までに復職する必要があります。</p>

<h2>育休期間ごとのパターン</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>育休1年（4月生まれ〜9月生まれ）</strong>
<p>翌年4月に0歳児クラスで入園。競争率は比較的低いですが、育休を短く切り上げる必要があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>育休1年（10月生まれ〜3月生まれ）</strong>
<p>翌年4月に1歳児クラスで入園。1歳児は競争率が高いため、希望園を多く書くなどの対策が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>育休延長（最長2歳まで）</strong>
<p>認可保育園に入れなかった場合、不承諾通知をもとに育休を延長できます。2歳の4月に再チャレンジも可能です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>仙台市の4月入園の申込は11月〜12月です。育休中でも申込可能で、就労証明書には復職後の予定勤務条件を記載してもらいます。</p>
</div>

<div class="info-box">
<p><strong>注意事項</strong></p>
<p>2025年4月から育休延長手続きが厳格化されています。延長を前提とした申込（入りにくい園だけを希望するなど）は認められない場合があります。詳しくは<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省の公式ページ</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 園えらび =====
  {
    slug: "ninkagai-selection",
    citySlug: "sendai",
    title: "仙台市の認可外保育施設の選び方　確認すべき5つのポイント",
    description:
      "仙台市で認可外保育施設を選ぶ際に確認すべきポイントを5つに絞って解説。安全・安心に預けるための判断基準をまとめました。",
    image:
      "https://images.unsplash.com/photo-1587654780860-5e6801e6e7f5?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>認可外保育施設とは</h2>
<p>認可外保育施設は、都道府県知事への届出により運営される保育施設です。認可保育園と異なり、利用調整（点数選考）なしで直接契約できます。</p>

<h2>確認すべき5つのポイント</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>指導監督基準を満たしているか</strong>
<p>仙台市が公表する「認可外保育施設一覧」で、指導監督基準を満たす施設かどうか確認できます。基準を満たす施設は「証明書」が交付されています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>保育士の配置人数</strong>
<p>スタッフの人数や保育士資格保有者の割合を確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保育料と追加費用</strong>
<p>月額保育料のほか、給食費・教材費・延長保育料など追加でかかる費用も確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>保育内容と一日の流れ</strong>
<p>外遊びの頻度、給食の有無、午睡のルールなど、日々の保育内容を聞きましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>避難訓練・安全対策</strong>
<p>避難訓練の頻度、SIDS対策（午睡チェック）、防犯カメラの設置などを確認します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>必ず見学に行き、実際の保育の様子を自分の目で確認しましょう。見学を断る施設は避けるのが無難です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>仙台市内の認可外保育施設の一覧は<a href="https://www.city.sendai.jp/kodomo-shido/kurashi/kenkotofukushi/kosodate/hoikujo/ninkagai/hoikushisetsu/ichiran.html" target="_blank" rel="noopener">仙台市公式サイト「認可外保育施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // ===== 制度を知る =====
  {
    slug: "futago-hokatsu",
    citySlug: "sendai",
    title: "双子・多胎児の保活ガイド　仙台市で同じ園に入れるには",
    description:
      "仙台市で双子や三つ子の保活をする際の注意点と、同じ園に入るための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>多胎児の保活の難しさ</h2>
<p>双子や三つ子の場合、同じ年齢クラスに2人以上の枠が必要になるため、1人の場合より入園のハードルが上がります。</p>

<h2>仙台市での多胎児の利用調整</h2>
<p>仙台市では、多胎児のきょうだいを同一の保育施設に入園させることについて、個別の配慮が行われる場合があります。具体的な取り扱いについては、お住まいの区の区役所保育給付課に事前に相談することをおすすめします。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>多胎児の保活は通常より早めに動き始めることが大切です。区役所への事前相談は妊娠中から可能です。</p>
</div>

<h2>同じ園に入るための工夫</h2>
<ul>
<li>希望園は定員枠が大きめの園を優先する</li>
<li>0歳児クラスからの入園を検討する（枠が多い傾向）</li>
<li>小規模保育も視野に入れつつ、定員の多い認可園を中心に希望する</li>
<li>区役所に早めに相談し、多胎児に配慮がある園の情報を聞く</li>
</ul>

<div class="info-box">
<p><strong>相談先</strong></p>
<p>多胎児の保活に関する相談は、お住まいの区の区役所保育給付課が窓口です。仙台市の各区役所の連絡先は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // ===== 保活の基本 =====
  {
    slug: "hoiku-mama-interview",
    citySlug: "sendai",
    title: "仙台市で保活を経験した先輩ママの声　よくある体験談まとめ",
    description:
      "仙台市で保活を経験した先輩ママたちのよくある体験談をまとめました。実際の声からリアルな保活事情を知りましょう。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>先輩ママたちのよくある体験談</h2>
<p>仙台市で保活を経験した保護者の声をもとに、よくあるパターンをまとめました。</p>

<h3>体験談1：フルタイム共働き・青葉区</h3>
<p>「20点で第1希望の園は落ちましたが、第3希望の園に内定しました。希望園を多めに書いておいてよかったです。」</p>

<h3>体験談2：育休中・太白区</h3>
<p>「長町エリアは人気が高いと聞いて、少し離れた園も見学に行きました。実際に行くと雰囲気がよく、結果的にそこに通えて満足しています。」</p>

<h3>体験談3：小規模保育経由・宮城野区</h3>
<p>「0歳で小規模保育に入り、3歳の転園で+10点の加点をもらえました。最初から小規模保育に入る戦略で正解でした。」</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は一般的な体験談をまとめたものです。個々の状況や年度によって結果は異なります。最新の入所状況は仙台市の公式情報をご確認ください。</p>
</div>

<h2>先輩ママに共通するアドバイス</h2>
<ul>
<li>見学は早めに、多くの園に行くべき</li>
<li>希望園は最大数書くのが鉄則</li>
<li>区役所の窓口に相談すると具体的なアドバイスがもらえる</li>
<li>認可外や小規模保育も選択肢に入れておく</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>仙台市の保活に関する情報は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // ===== データ分析 =====
  {
    slug: "waiting-child-data",
    citySlug: "sendai",
    title: "仙台市の待機児童数の推移　最新データで見る保活の現状",
    description:
      "仙台市の待機児童数の推移と現在の状況を解説。待機児童ゼロの裏にある「隠れ待機児童」にも触れます。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>仙台市の待機児童数の推移</h2>
<p>仙台市は2022年4月時点で<strong>待機児童ゼロ</strong>を達成し、その後も低水準を維持しています。</p>

<table>
<tr><th>年度</th><th>待機児童数</th></tr>
<tr><td>2020年4月</td><td>20人</td></tr>
<tr><td>2021年4月</td><td>14人</td></tr>
<tr><td>2022年4月</td><td>0人</td></tr>
<tr><td>2023年4月</td><td>0人</td></tr>
<tr><td>2024年4月</td><td>0人</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は厚生労働省の定義による待機児童数です。「特定の園のみを希望」「育休中」などのケースは待機児童にカウントされないため、実際の保育需要はこれより大きい可能性があります。</p>
</div>

<h2>「隠れ待機児童」とは</h2>
<p>国の定義では待機児童に含まれないものの、希望する園に入れていない児童を「隠れ待機児童（潜在的待機児童）」と呼びます。仙台市でも、人気エリア・人気園では入れないケースがあります。</p>

<h2>エリアによる差</h2>
<p>仙台市全体では待機児童ゼロでも、区やエリアによって入りやすさには大きな差があります。特に青葉区中心部や長町エリアは需要が高い傾向です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の入所状況は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/nyusho/ichiran/index.html" target="_blank" rel="noopener">仙台市公式サイト「保育施設等入所状況一覧」</a>で確認できます。待機児童数は<a href="https://www.mhlw.go.jp/hoikusyo123/index.html" target="_blank" rel="noopener">厚生労働省の公表資料</a>をご参照ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 園えらび =====
  {
    slug: "small-nursery-guide",
    citySlug: "sendai",
    title: "仙台市の小規模保育とは　メリット・デメリットと選び方",
    description:
      "仙台市の小規模保育事業（地域型保育）の特徴やメリット・デメリットを解説。3歳以降の転園についても説明します。",
    image:
      "https://images.unsplash.com/photo-1587654780860-5e6801e6e7f5?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>小規模保育事業とは</h2>
<p>小規模保育事業は、定員6〜19名の少人数で0〜2歳児を対象とした認可保育施設です。仙台市では「地域型保育事業」の一つとして位置づけられています。</p>

<h2>小規模保育のメリット</h2>
<ul>
<li><strong>少人数でアットホーム</strong>：1人ひとりに目が行き届きやすい</li>
<li><strong>入りやすい傾向</strong>：認可保育園より競争率が低いことが多い</li>
<li><strong>卒園時に+10点の加点</strong>：3歳の転園で仙台市最大の加点が得られる</li>
<li><strong>保育料は認可保育園と同じ</strong>：市が定める保育料表に基づく</li>
</ul>

<h2>小規模保育のデメリット</h2>
<ul>
<li><strong>3歳で転園が必要</strong>：卒園後の受け入れ先を確保する必要がある</li>
<li><strong>園庭がない場合がある</strong>：ビルの一室などで運営されている施設もある</li>
<li><strong>行事が少ない場合がある</strong>：規模が小さいため大きな行事は難しい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>仙台市では小規模保育の卒園児に+10点の加点があるため、3歳の転園は比較的スムーズです。連携施設が設定されている園もあるため、入園前に確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>仙台市内の地域型保育事業の一覧は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== 点数アップ =====
  {
    slug: "secondchild-hokatsu",
    citySlug: "sendai",
    title: "仙台市で第2子の保活　きょうだい加点を最大限活かす方法",
    description:
      "仙台市で第2子の保育園入園を目指す方向けに、きょうだい在園による加点の仕組みと戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>きょうだい在園の加点</h2>
<p>仙台市では、きょうだいが希望する保育施設に在園している場合、調整指数で<span class="highlight">+3点</span>の加点が得られます。</p>

<h2>きょうだい加点を活かす戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>上の子と同じ園を第1希望にする</strong>
<p>きょうだい加点+3があるため、フルタイム共働き20点+3点＝23点で選考を受けられます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>別の園も併願する</strong>
<p>きょうだい加点は「希望する園にきょうだいが在園」の場合のみ適用されます。別の園を希望する場合は加点がつきません。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第2子以降の保育料は、仙台市では第1子が保育施設に在園している場合、第2子は半額、第3子以降は無料です（3〜5歳児は幼児教育・保育の無償化により無料）。</p>
</div>

<h2>上の子と別の園になった場合</h2>
<p>別の園に内定した場合でも、転園申請を出すことで空きが出たタイミングで上の子と同じ園に移れる可能性があります。転園の利用調整でもきょうだい加点は適用されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>きょうだい加点の詳細は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 点数を知る =====
  {
    slug: "self-employed-score",
    citySlug: "sendai",
    title: "自営業・フリーランスの保育園点数　仙台市での扱いと必要書類",
    description:
      "仙台市で自営業やフリーランスの方が保育園に申し込む際の点数の算出方法と必要書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスの基準指数</h2>
<p>仙台市では、自営業やフリーランスの方も会社員と同じ基準指数表で点数が算出されます。ポイントは「月の就労日数」と「1日の就労時間」です。</p>

<table>
<tr><th>勤務条件</th><th>基準指数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>10点</td></tr>
<tr><td>月20日以上・1日6時間以上</td><td>8点</td></tr>
<tr><td>月16日以上・1日4時間以上</td><td>6点</td></tr>
<tr><td>月12日以上・1日4時間以上</td><td>4点</td></tr>
</table>

<h2>必要書類</h2>
<p>会社員の「就労証明書」に代わり、以下の書類が必要です。</p>
<ul>
<li><strong>就労状況申告書</strong>（仙台市指定の様式）</li>
<li><strong>自営を証明する書類</strong>：開業届の写し、確定申告書の写し、営業許可証の写しなど</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業の場合、就労時間の証明が会社員より難しい面があります。開業届を提出し、確定申告を行っていることが基本的な証明になります。開業準備中の場合は、区役所に個別に相談しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込に必要な書類の詳細は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== 点数を知る =====
  {
    slug: "naishoku-score",
    citySlug: "sendai",
    title: "内職・在宅ワークの保育園点数　仙台市での基準指数はどうなる？",
    description:
      "仙台市で内職や在宅ワークをしている場合の保育園入園の基準指数について解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>内職・在宅ワークの基準指数</h2>
<p>仙台市では、内職や在宅ワークも「居宅内労働」として就労の基準指数が適用されます。勤務日数と勤務時間に基づいて点数が決まる仕組みは外勤と同じです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅ワークでもフルタイム（月20日以上・1日8時間以上）であれば基準指数10点を得られます。「在宅だから不利」ということはありません。</p>
</div>

<h2>注意すべき点</h2>
<ul>
<li>就労時間の証明が求められるため、就労状況申告書を正確に記入する</li>
<li>雇用契約がある場合は勤務先に就労証明書を依頼する</li>
<li>フリーランス・業務委託の場合は、契約書や確定申告書の写しを添付する</li>
</ul>

<h2>在宅ワークで保育の必要性は認められる？</h2>
<p>「自宅にいるなら保育園は必要ないのでは」と心配される方もいますが、仙台市では在宅勤務であっても月48時間以上の就労があれば保育の必要性が認められます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労状況の証明に必要な書類は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // ===== 保活の基本 =====
  {
    slug: "kyushoku-hokatsu",
    citySlug: "sendai",
    title: "仙台市の保育園の給食事情　自園調理・アレルギー対応を確認",
    description:
      "仙台市の保育園における給食の提供方法やアレルギー対応について解説。園選びの参考にしてください。",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>仙台市の保育園の給食</h2>
<p>仙台市の認可保育園では、原則として<strong>自園調理</strong>による給食が提供されます。0〜2歳児は完全給食（主食＋副食）、3歳児以上は副食のみ提供で主食を持参する園もあります。</p>

<h2>アレルギー対応</h2>
<p>多くの認可保育園では食物アレルギーへの対応を行っています。ただし、対応の範囲は園によって異なります。</p>
<ul>
<li>除去食での対応が基本</li>
<li>医師の「生活管理指導表」の提出が必要</li>
<li>重度のアレルギーの場合はお弁当持参をお願いされることもある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>アレルギーのあるお子さんは、園見学時に具体的な対応内容を確認しましょう。除去の範囲や代替食の提供有無は園によって異なります。</p>
</div>

<h2>離乳食への対応</h2>
<p>0歳児クラスでは離乳食の段階に合わせた食事が提供されます。お子さんの発達に合わせて、初期・中期・後期・完了期と段階的に進められます。</p>

<div class="info-box">
<p><strong>確認方法</strong></p>
<p>給食の詳細は各保育園に直接お問い合わせいただくか、園見学時にご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ===== 保活の基本 =====
  {
    slug: "tenshoku-timing",
    citySlug: "sendai",
    title: "保活中の転職は不利？仙台市での点数への影響と注意点",
    description:
      "仙台市で保活中に転職を考えている方向けに、転職が入園選考の点数に与える影響と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転職すると点数はどうなる？</h2>
<p>仙台市の基準指数は「勤務日数」と「勤務時間」で決まります。転職後もフルタイム（月20日以上・1日8時間以上）であれば基準指数10点は変わりません。</p>

<h2>転職のタイミングによる注意点</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>申込前の転職</strong>
<p>転職先の就労証明書を提出できれば問題ありません。試用期間中でも就労証明書は発行してもらえます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>申込後〜内定前の転職</strong>
<p>就労証明書の再提出が必要です。速やかに区役所に届け出ましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>入園後の転職</strong>
<p>勤務先が変わっても保育の必要性が認められれば在園は継続できます。ただし変更届の提出が必要です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転職で勤務条件が変わると基準指数にも影響します。転職先の勤務条件を事前に確認し、点数が下がらないか注意しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>変更届や就労証明書の再提出については、お住まいの区の区役所保育給付課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // ===== データ分析 =====
  {
    slug: "age2-nyuen",
    citySlug: "sendai",
    title: "仙台市の2歳児クラス入園事情　小規模保育からの転園枠に注意",
    description:
      "仙台市の認可保育園2歳児クラスの入園事情を解説。小規模保育からの進級枠との関係も説明します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>2歳児クラスの特徴</h2>
<p>2歳児クラスは、0歳・1歳から在園している子どもが進級してくるため、新規の募集枠が少ない傾向にあります。</p>

<h2>新規枠が限られる理由</h2>
<table>
<tr><th>要因</th><th>説明</th></tr>
<tr><td>在園児の進級</td><td>1歳児クラスからそのまま進級する子が大半</td></tr>
<tr><td>定員の壁</td><td>2歳児クラスの定員が1歳児と同じか少し多い程度の園が多い</td></tr>
<tr><td>転園申込</td><td>他園からの転園希望者も枠を狙っている</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2歳児クラスからの新規入園は枠が少ないため、0歳児や1歳児クラスからの入園を検討する方が選択肢は広がります。</p>
</div>

<h2>2歳児で入園を目指す場合の対策</h2>
<ul>
<li>希望園を多めに書く（10園以上を推奨）</li>
<li>小規模保育や家庭的保育も候補に入れる</li>
<li>新設園があれば2歳児クラスの新規枠が多い場合がある</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各施設の年齢別定員と入所状況は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/nyusho/ichiran/index.html" target="_blank" rel="noopener">仙台市公式サイト「保育施設等入所状況一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== 制度を知る =====
  {
    slug: "age3-ikou",
    citySlug: "sendai",
    title: "3歳の壁と3歳の追い風　仙台市での3歳児以降の入園事情",
    description:
      "仙台市では3歳児クラス以降は比較的入りやすい傾向があります。小規模保育からの移行や幼稚園との比較も解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>3歳児クラスは入りやすい？</h2>
<p>仙台市では3歳児クラスから定員が大幅に増える園が多く、新規枠が比較的多い傾向があります。また、幼稚園に移る子もいるため、空きが生じやすいです。</p>

<h2>小規模保育からの移行</h2>
<p>小規模保育（0〜2歳）を卒園する子どもは、3歳児クラスの利用調整で<span class="highlight">+10点</span>の加点が得られます。この加点により、希望する認可保育園への転園がスムーズになるケースが多いです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育には連携施設が設定されている場合があり、卒園後の受け入れ先がある程度確保されています。入園前に連携施設の情報を確認しましょう。</p>
</div>

<h2>3歳からの選択肢</h2>
<ul>
<li><strong>認可保育園</strong>：就労等の保育の必要性がある場合</li>
<li><strong>認定こども園</strong>：保育と教育の両方を提供</li>
<li><strong>幼稚園（新制度）</strong>：教育時間後の預かり保育を利用すればフルタイム勤務も可能</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>3歳児以降の施設選びについては<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ===== 保活の基本 =====
  {
    slug: "nyuyoji-age0",
    citySlug: "sendai",
    title: "仙台市の0歳児保育ガイド　受入月齢と申込のポイント",
    description:
      "仙台市で0歳児保育を希望する方向けに、受入開始月齢や申込時の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳児保育の受入月齢</h2>
<p>仙台市の認可保育園では、園によって受け入れ開始月齢が異なります。一般的には<strong>生後57日（産休明け）</strong>から受入可能な園と、<strong>生後4か月以降</strong>や<strong>生後6か月以降</strong>からの園があります。</p>

<h2>4月入園の場合のスケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜9月生まれのお子さん</strong>
<p>翌年4月の入園時点で生後6か月以上になるため、多くの園で受入可能です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>10月〜12月生まれのお子さん</strong>
<p>翌年4月の入園時点で生後3〜5か月。受入月齢の条件を満たすか確認が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>1月〜3月生まれのお子さん</strong>
<p>翌年4月は0歳クラスではなく、翌々年4月に1歳児クラスで入園するのが一般的です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0歳児クラスの4月入園は、申込時点でまだ生まれていない場合でも出産予定日をもとに申込可能です。詳しくは区役所にご確認ください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入月齢は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト「保育施設等一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 園えらび =====
  {
    slug: "nintei-kodomoen",
    citySlug: "sendai",
    title: "仙台市の認定こども園とは　保育園との違いと選び方",
    description:
      "仙台市にある認定こども園の特徴や保育園との違い、入園方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>認定こども園とは</h2>
<p>認定こども園は、<strong>幼稚園と保育園の機能を併せ持つ施設</strong>です。教育と保育の両方を提供し、保護者の就労状況に関わらず利用できます。</p>

<h2>保育園との違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>利用条件</td><td>保育の必要性あり（2号・3号認定）</td><td>1号認定（教育のみ）も利用可</td></tr>
<tr><td>教育カリキュラム</td><td>保育中心</td><td>教育と保育の両方</td></tr>
<tr><td>保育時間</td><td>最大11時間</td><td>1号は4時間程度、2号・3号は最大11時間</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>仙台市の認定こども園に2号・3号認定で入園する場合は、認可保育園と同じ利用調整（点数選考）を受けます。1号認定の場合は園に直接申込します。</p>
</div>

<h2>認定こども園を選ぶメリット</h2>
<ul>
<li>退職しても1号認定に切り替えて通い続けられる</li>
<li>教育的なカリキュラムが充実している園が多い</li>
<li>幼稚園枠と保育園枠の両方があるため、クラスの多様性がある</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>仙台市内の認定こども園の一覧は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== 園えらび =====
  {
    slug: "kigyou-shudogata",
    citySlug: "sendai",
    title: "仙台市の企業主導型保育とは　地域枠の活用方法を解説",
    description:
      "仙台市にある企業主導型保育事業の特徴と、地域枠を使って入園する方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780860-5e6801e6e7f5?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>企業主導型保育事業とは</h2>
<p>企業主導型保育は、企業が従業員のために設置する保育施設です。「従業員枠」と「地域枠」があり、地域枠は企業の従業員でなくても利用できます。</p>

<h2>企業主導型保育の特徴</h2>
<ul>
<li><strong>直接契約</strong>：市の利用調整を通さず、施設に直接申込</li>
<li><strong>保育料</strong>：認可保育園の水準に近い設定が多い</li>
<li><strong>認可外に分類</strong>：制度上は認可外保育施設の扱い</li>
<li><strong>無償化の対象</strong>：保育の必要性の認定を受ければ無償化の対象</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>企業主導型保育は点数による選考がないため、認可保育園の利用調整で入れなかった場合の選択肢として有効です。地域枠に空きがあるか直接施設に確認しましょう。</p>
</div>

<h2>注意点</h2>
<ul>
<li>施設によって保育の質や設備に差がある</li>
<li>経営状況によっては閉園のリスクがある</li>
<li>見学に行って保育内容を確認することが重要</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>企業主導型保育事業の施設一覧は<a href="https://www.kigyounaihoiku.jp/" target="_blank" rel="noopener">企業主導型保育事業ポータル</a>で検索できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // ===== 園えらび =====
  {
    slug: "yakan-hoiku",
    citySlug: "sendai",
    title: "仙台市の夜間保育・延長保育事情　夜勤やシフト勤務の方へ",
    description:
      "仙台市で夜間保育や延長保育を利用したい方向けに、利用方法や対象施設について解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>延長保育について</h2>
<p>仙台市の認可保育園の多くは、通常の保育時間（7:00〜18:00が目安）に加えて<strong>延長保育</strong>を実施しています。延長保育の時間は園によって異なりますが、19:00〜20:00頃まで対応する園が一般的です。</p>

<h2>延長保育の利用条件</h2>
<ul>
<li>就労等の理由で通常の保育時間内にお迎えが困難な場合</li>
<li>延長保育料が別途発生する（園によって金額は異なる）</li>
<li>事前に園への申込が必要</li>
</ul>

<h2>夜間保育について</h2>
<p>夜勤やシフト勤務の方には、夜間保育に対応した施設があると助かりますが、仙台市内で夜間保育を実施する認可保育園は限られています。具体的な施設については、区役所の保育給付課にお問い合わせください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>夜間の保育が必要な場合は、認可外保育施設やベビーシッター、ファミリーサポートセンター事業の利用も検討してみましょう。</p>
</div>

<h2>ファミリーサポートセンター事業</h2>
<p>仙台市の<strong>すくすくサポート事業</strong>（ファミリーサポートセンター事業）では、地域の援助会員が保育園のお迎えや一時的な預かりを行います。延長保育と組み合わせて利用することで、遅い時間帯の保育をカバーできます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>すくすくサポート事業の詳細は<a href="https://www.city.sendai.jp/kurashi/kenkotofukushi/kosodate/hoikujo/" target="_blank" rel="noopener">仙台市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },

  // ===== 制度を知る =====
  {
    slug: "mushoka-seido",
    citySlug: "sendai",
    title: "仙台市の幼児教育・保育の無償化　対象と手続きを解説",
    description:
      "仙台市における幼児教育・保育の無償化の対象範囲と申請手続きをわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>無償化の対象</h2>
<p>2019年10月から始まった幼児教育・保育の無償化により、以下の費用が無料になります。</p>

<table>
<tr><th>対象</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児（認可保育園・認定こども園）</td><td>保育料が無料</td></tr>
<tr><td>0〜2歳児（住民税非課税世帯）</td><td>保育料が無料</td></tr>
<tr><td>3〜5歳児（認可外保育施設）</td><td>月額37,000円まで無償</td></tr>
<tr><td>0〜2歳児（認可外・住民税非課税世帯）</td><td>月額42,000円まで無償</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>無償化されるのは「保育料」のみです。給食費（副食費）、通園バス代、行事費などは保護者負担のままです。ただし、年収360万円未満相当の世帯と第3子以降は副食費も免除されます。</p>
</div>

<h2>認可外保育施設の無償化を受けるには</h2>
<p>認可外保育施設の無償化を受けるには、<strong>「保育の必要性」の認定（施設等利用給付認定）</strong>を仙台市から受ける必要があります。認定なしでは無償化の対象になりません。</p>

<h2>手続きの流れ</h2>
<ul>
<li>認可保育園・認定こども園（2号・3号）：入園手続きの中で自動的に処理される</li>
<li>認可外保育施設：施設等利用給付認定の申請を別途行う必要がある</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>仙台市の無償化の詳細は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 制度を知る =====
  {
    slug: "shokuhi-jippi",
    citySlug: "sendai",
    title: "保育園の給食費（副食費）の実費負担　仙台市の金額目安",
    description:
      "仙台市の保育園で保護者が負担する給食費（副食費）の金額や免除条件を解説します。",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>給食費（副食費）とは</h2>
<p>3〜5歳児の保育料は無償化されていますが、<strong>給食費（副食費）</strong>は保護者負担です。副食費とは、おかずやおやつ等の費用のことです。</p>

<h2>副食費の金額</h2>
<p>仙台市の認可保育園における副食費は、国の基準で月額<strong>4,500円</strong>が目安とされています。ただし、園によって実際の金額は異なる場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>以下に該当する場合は副食費が免除されます。</p>
<ul>
<li>年収360万円未満相当の世帯</li>
<li>第3子以降の子ども（小学校就学前の子どもからカウント）</li>
</ul>
</div>

<h2>0〜2歳児の場合</h2>
<p>0〜2歳児の保育料には給食費が含まれているため、別途の給食費負担はありません。ただし、住民税非課税世帯以外は保育料自体がかかります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>副食費の詳細は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // ===== 制度を知る =====
  {
    slug: "hoikuryo-keisan",
    citySlug: "sendai",
    title: "仙台市の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "仙台市の認可保育園の保育料を年収・子ども数別に詳しく解説。市民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免・ひとり親減免まで。令和8年度対応。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>仙台市の認可保育園の保育料は、<strong>世帯の市民税所得割額</strong>に基づいて決まります。所得が高いほど保育料も高くなる仕組みです。</p>

<h2>保育料の階層区分</h2>
<p>仙台市では、市民税所得割額に応じて複数の階層に分けられ、それぞれに保育料が設定されています。以下は0〜2歳児クラス（3号認定）の一例です。</p>

<table>
<tr><th>階層</th><th>市民税所得割額</th><th>保育料の目安（月額）</th></tr>
<tr><td>第1階層</td><td>生活保護世帯</td><td>0円</td></tr>
<tr><td>第2階層</td><td>市民税非課税</td><td>0円</td></tr>
<tr><td>第3階層</td><td>48,600円未満</td><td>約9,000〜19,500円</td></tr>
<tr><td>第4階層</td><td>97,000円未満</td><td>約20,000〜30,000円</td></tr>
<tr><td>第5階層以上</td><td>97,000円以上</td><td>約30,000〜58,000円</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は概算の目安です。正確な保育料は仙台市の保育料表をご確認ください。また、3〜5歳児は無償化により保育料は無料です。</p>
</div>

<h2>保育料が軽減されるケース</h2>
<ul>
<li><strong>きょうだい同時入園</strong>：第2子は半額、第3子以降は無料</li>
<li><strong>ひとり親世帯</strong>：軽減措置あり</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細な階層表は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== 制度を知る =====
  {
    slug: "zeikin-koujo",
    citySlug: "sendai",
    title: "保育料と税金控除　認可外利用時のベビーシッター控除なども解説",
    description:
      "保育園利用に関連する税金控除や、認可外保育施設・ベビーシッター利用時の助成制度について解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>保育料に関連する税金控除</h2>
<p>認可保育園の保育料そのものは所得控除の対象にはなりません。しかし、保育に関連して利用できる制度がいくつかあります。</p>

<h2>認可外保育施設の無償化給付</h2>
<p>認可外保育施設を利用している場合、「保育の必要性」の認定を受けていれば、月額37,000円（3〜5歳児）または42,000円（0〜2歳児・住民税非課税世帯）までの給付が受けられます。</p>

<h2>ベビーシッター利用支援</h2>
<p>仙台市では、内閣府のベビーシッター割引券（企業主導型ベビーシッター利用者支援事業）が利用できる場合があります。勤務先がこの制度に参加しているかどうか確認してみましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>税金控除や助成制度は毎年変更される可能性があります。最新情報は税務署や仙台市の窓口でご確認ください。</p>
</div>

<h2>医療費控除との関係</h2>
<p>保育料は医療費控除の対象にはなりませんが、お子さんの医療費は医療費控除の対象になります。年間の医療費が10万円を超える場合は確定申告で控除を受けられます。</p>

<div class="info-box">
<p><strong>注意事項</strong></p>
<p>税金に関する具体的なご相談は、仙台北・南税務署または税理士にお問い合わせください。本記事は一般的な情報提供を目的としています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },

  // ===== 保活の基本 =====
  {
    slug: "shurou-shoumeisho",
    citySlug: "sendai",
    title: "就労証明書の書き方ガイド　仙台市の保育園申込で失敗しないために",
    description:
      "仙台市の保育園申込に必要な就労証明書の記入方法と、よくある記入ミスを解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労証明書とは</h2>
<p>就労証明書は、保護者の勤務状況を証明する書類で、<strong>勤務先に記入してもらう</strong>ものです。仙台市の保育園申込で最も重要な書類の一つです。</p>

<h2>就労証明書の記入で重要なポイント</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>勤務日数と勤務時間を正確に</strong>
<p>基準指数に直結するため、「月の勤務日数」と「1日の勤務時間」は正確に記入してもらいましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>勤務先の代表者印（または社印）</strong>
<p>勤務先の証明として代表者印または社印が必要です。個人の印鑑は不可です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>育休中の場合は復職予定日を記入</strong>
<p>育休中の場合、復職後の予定勤務条件と復職予定日を記入してもらいます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先に依頼してから完成まで1〜2週間かかることがあります。申込締切の1か月前には依頼しましょう。</p>
</div>

<h2>よくある記入ミス</h2>
<ul>
<li>勤務時間が休憩時間を含んでいるか曖昧</li>
<li>雇用形態と勤務条件が不一致</li>
<li>記入日が古すぎる（3か月以内が目安）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // ===== 保活の基本 =====
  {
    slug: "shinsei-shorui-list",
    citySlug: "sendai",
    title: "仙台市の保育園申込に必要な書類一覧　チェックリスト付き",
    description:
      "仙台市の認可保育園の入園申込に必要な書類を一覧にまとめました。提出前のチェックリストとしてご活用ください。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>全員が提出する書類</h2>
<ul>
<li>保育施設等利用申込書</li>
<li>保育を必要とすることを証明する書類（就労証明書など）：父母それぞれ</li>
<li>マイナンバー確認書類</li>
<li>申込者の本人確認書類</li>
</ul>

<h2>該当する方のみ提出する書類</h2>
<ul>
<li><strong>ひとり親世帯</strong>：戸籍謄本</li>
<li><strong>障害のあるお子さん</strong>：障害者手帳の写しなど</li>
<li><strong>転入予定の方</strong>：転入先の住所がわかる書類（売買契約書・賃貸契約書の写しなど）</li>
<li><strong>求職中の方</strong>：求職活動申告書</li>
<li><strong>妊娠・出産の方</strong>：母子健康手帳の写し</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類に不備があると利用調整に間に合わない可能性があります。提出前に区役所の窓口で確認してもらうのがおすすめです。</p>
</div>

<h2>提出先</h2>
<p>お住まいの区の<strong>区役所保育給付課</strong>が提出先です。郵送での受付が可能な場合もありますが、対面での提出の方が不備があった場合にその場で指摘してもらえるためおすすめです。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類の詳細と様式は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 保活の基本 =====
  {
    slug: "niji-shinsei-flow",
    citySlug: "sendai",
    title: "仙台市の2次利用調整の流れ　1次で落ちた場合の対応",
    description:
      "仙台市の保育園1次利用調整で入れなかった場合の2次利用調整の流れと対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>1次で入れなかった場合</h2>
<p>仙台市の4月入園1次利用調整の結果は2月上旬に通知されます。利用待機（不承諾）となった場合でも、<strong>自動的に2次以降の利用調整の対象</strong>になります。</p>

<h2>2次利用調整のスケジュール</h2>
<table>
<tr><th>項目</th><th>日程（令和8年度の場合）</th></tr>
<tr><td>申込受付期間</td><td>令和7年12月4日（木）〜令和8年2月2日（月）</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次で利用待機になった方は、2次利用調整に自動的にエントリーされるため再申込は不要です。ただし、希望園の変更や追加がある場合は手続きが必要です。</p>
</div>

<h2>2次で内定する可能性</h2>
<p>2次利用調整では、1次で辞退が出た枠や、空きが生じた枠で選考が行われます。人気園では難しい場合もありますが、エリアを広げれば内定の可能性はあります。</p>

<h2>2次でも入れなかった場合</h2>
<ul>
<li>4月以降の途中入園を毎月申し込む（前月5日締切）</li>
<li>認可外保育施設や企業主導型保育の利用を検討する</li>
<li>育休延長を勤務先と相談する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次利用調整の詳細は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ===== 保活の基本 =====
  {
    slug: "tenkyo-hokatsu",
    citySlug: "sendai",
    title: "転居を伴う保活ガイド　仙台市への転入・仙台市からの転出",
    description:
      "仙台市への転入や仙台市からの転出を予定している場合の保育園申込方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>仙台市に転入する場合</h2>
<p>仙台市外から転入予定の方でも、仙台市の認可保育園に申し込むことができます。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>転入先の区役所に相談</strong>
<p>転入予定先の区役所保育給付課に連絡し、申込方法を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>転入を証明する書類を準備</strong>
<p>売買契約書や賃貸契約書の写しなど、転入予定を証明する書類が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>入園月までに住民票を移す</strong>
<p>原則として、入園月の1日までに仙台市に住民登録がある必要があります。</p>
</div>
</div>

<h2>仙台市から転出する場合</h2>
<p>転出先の自治体に申し込みが必要です。自治体によって申込方法が異なるため、転出先の窓口に早めに確認しましょう。現在仙台市の保育園に在園中の場合は、転出とともに退園手続きが必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転居を伴う保活は通常より早めの情報収集が重要です。転入先・転出先の両方の自治体に事前相談することをおすすめします。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>転入に伴う保育園申込については<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // ===== 園えらび =====
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "sendai",
    title: "教育と保育の違いとは　仙台市での幼稚園・保育園・こども園の比較",
    description:
      "仙台市における幼稚園・保育園・認定こども園の違いを比較。お子さんに合った施設選びの参考に。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>3つの施設の比較</h2>
<table>
<tr><th>項目</th><th>幼稚園</th><th>保育園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>3〜5歳</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>利用時間</td><td>4時間程度</td><td>最大11時間</td><td>認定により異なる</td></tr>
<tr><td>利用条件</td><td>特になし</td><td>保育の必要性あり</td><td>1号は条件なし、2号3号は必要性あり</td></tr>
<tr><td>所管</td><td>文部科学省</td><td>厚生労働省</td><td>内閣府</td></tr>
<tr><td>申込先</td><td>園に直接</td><td>区役所</td><td>1号は園、2号3号は区役所</td></tr>
</table>

<h2>どれを選ぶべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>フルタイムで働く場合</strong>
<p>保育園または認定こども園（2号認定）が基本です。保育時間が長く、延長保育もあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>パート・短時間勤務の場合</strong>
<p>幼稚園の預かり保育（延長預かり）を活用する選択肢もあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>教育に力を入れたい場合</strong>
<p>認定こども園は教育カリキュラムが充実している園が多く、保育と教育の両方を受けられます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>仙台市の新制度幼稚園では、預かり保育を利用すればフルタイム勤務でも対応可能です。保育の必要性の認定を受ければ、預かり保育料も無償化の対象になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>仙台市内の施設一覧は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // ===== 保活の基本 =====
  {
    slug: "hokatsu-calendar",
    citySlug: "sendai",
    title: "仙台市の保活カレンダー　月別やることリスト（令和8年度版）",
    description:
      "仙台市で令和8年度4月入園を目指す方のための月別保活カレンダー。いつ何をすればいいかを一覧でまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>月別やることリスト</h2>

<h3>4月〜6月：情報収集</h3>
<ul>
<li>仙台市の保育施設の種類を調べる</li>
<li>自宅周辺の園をリストアップする</li>
<li>先輩ママや口コミから情報を集める</li>
</ul>

<h3>7月〜9月：園見学</h3>
<ul>
<li>候補の園に電話で見学予約</li>
<li>3〜5園を目安に見学に行く</li>
<li>見学メモを園ごとに作成する</li>
</ul>

<h3>10月：書類準備</h3>
<ul>
<li>仙台市の「保育施設等利用案内」を入手</li>
<li>勤務先に就労証明書を依頼（1〜2週間前に）</li>
<li>必要書類を一式そろえる</li>
</ul>

<h3>11月〜12月：申込</h3>
<ul>
<li>1次利用調整の申込書類を区役所に提出（11月4日〜12月3日）</li>
<li>提出前に書類の不備がないか確認</li>
</ul>

<h3>2月：結果通知</h3>
<ul>
<li>1次利用調整の結果が届く（2月上旬）</li>
<li>内定の場合：園での面談・健康診断</li>
<li>利用待機の場合：2次の結果を待つ・認可外も検討</li>
</ul>

<h3>3月：入園準備</h3>
<ul>
<li>内定園の入園説明会に出席</li>
<li>持ち物や名前付けの準備</li>
<li>慣らし保育のスケジュールを確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は令和8年度4月入園のスケジュールです。具体的な日程は年度によって変わるため、最新の利用案内で必ず確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // ===== データ分析 =====
  {
    slug: "souba-tensuu",
    citySlug: "sendai",
    title: "仙台市の保育園入園に必要な点数の相場　年齢・エリア別の目安",
    description:
      "仙台市の認可保育園に入園するために必要な点数の相場を、年齢クラスやエリア別に分析します。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>点数の相場感</h2>
<p>仙台市の基準指数は父母合計で最大20点（フルタイム共働き）です。多くの人気園では<strong>20点がボーダーライン</strong>となっています。</p>

<h2>年齢クラス別の傾向</h2>
<table>
<tr><th>年齢クラス</th><th>競争率</th><th>ボーダーラインの目安</th></tr>
<tr><td>0歳児</td><td>やや低い</td><td>20点で入れる園が比較的多い</td></tr>
<tr><td>1歳児</td><td>高い</td><td>人気園は20点＋調整指数がないと厳しい</td></tr>
<tr><td>2歳児</td><td>高い（新規枠少）</td><td>20点でも希望園に入れない場合あり</td></tr>
<tr><td>3歳児以上</td><td>比較的低い</td><td>20点で多くの園に入れる傾向</td></tr>
</table>

<h2>エリア別の傾向</h2>
<ul>
<li><strong>青葉区中心部</strong>：競争率高め。調整指数の加点がある方が有利</li>
<li><strong>宮城野区</strong>：新田・岩切エリアは需要増加中</li>
<li><strong>若林区</strong>：荒井エリアの新規開発で需要と施設の両方が増加</li>
<li><strong>太白区</strong>：長町は人気。八木山方面は比較的余裕あり</li>
<li><strong>泉区</strong>：泉中央周辺は需要高め。郊外は余裕あり</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は一般的な傾向であり、年度や園によって状況は異なります。最新の入所状況を必ず確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各施設の入所状況は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/nyusho/ichiran/index.html" target="_blank" rel="noopener">仙台市公式サイト「保育施設等入所状況一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // ===== データ分析 =====
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "sendai",
    title: "仙台市5区別の保育園入園倍率を分析　入りやすい区はどこ？",
    description:
      "仙台市の青葉区・宮城野区・若林区・太白区・泉区の保育園入園状況を比較分析します。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>5区別の保育施設数</h2>
<p>仙台市の5区にはそれぞれ多数の認可保育施設があり、区によって施設数や定員数が異なります。</p>

<table>
<tr><th>区</th><th>特徴</th><th>入りやすさの傾向</th></tr>
<tr><td>青葉区</td><td>面積が広く、都心部と郊外で差が大きい</td><td>都心部は競争率高め、郊外は比較的余裕</td></tr>
<tr><td>宮城野区</td><td>仙台駅東口周辺の開発が進行中</td><td>新興住宅地は需要が急増中</td></tr>
<tr><td>若林区</td><td>地下鉄東西線沿線の開発が活発</td><td>新規園の開設が多く、選択肢は増加中</td></tr>
<tr><td>太白区</td><td>長町エリアはファミリー層に人気</td><td>長町は競争率高め、その他は比較的余裕</td></tr>
<tr><td>泉区</td><td>泉中央駅周辺と郊外で差がある</td><td>郊外エリアは比較的入りやすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>仙台市は2022年に待機児童ゼロを達成していますが、「どこでもいいから入れる」のと「希望する園に入れる」のは別の話です。人気園や人気エリアでは引き続き競争があります。</p>
</div>

<h2>入りやすいエリアを狙うコツ</h2>
<ul>
<li>新設園は全ての年齢クラスで新規募集があるため入りやすい</li>
<li>駅から少し離れた園は比較的空きがある</li>
<li>隣の区の園も検討する（通勤経路上であれば便利）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の入所状況は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/nyusho/ichiran/index.html" target="_blank" rel="noopener">仙台市公式サイト「保育施設等入所状況一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 制度を知る =====
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "sendai",
    title: "育休延長のリスクと注意点　2025年からの手続き厳格化を解説",
    description:
      "育児休業の延長に関する2025年からの手続き厳格化と、仙台市での保活への影響を解説します。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>育休延長の基本</h2>
<p>育児休業は原則として子どもが1歳になるまでですが、保育園に入れなかった場合は<strong>1歳6か月まで</strong>、さらに入れなかった場合は<strong>2歳まで</strong>延長できます。</p>

<h2>2025年4月からの厳格化</h2>
<p>2025年4月から、育休延長の手続きが厳格化されました。主な変更点は以下の通りです。</p>

<ul>
<li>ハローワークに「保育施設利用申込書の写し」の提出が必要に</li>
<li>入園しにくい条件で意図的に申込んでいた場合、延長が認められない可能性</li>
<li>「速やかな職場復帰のために保育所等の利用を申し込んでいること」の確認が強化</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「育休を延長するためにあえて落ちる」ような申込は認められなくなりました。本当に入園を希望する園に誠実に申し込むことが重要です。</p>
</div>

<h2>仙台市での注意点</h2>
<ul>
<li>仙台市の不承諾通知（利用待機通知）がハローワークへの延長申請に必要</li>
<li>希望園を1園だけにするなど、入園意思が疑われるような申込は避ける</li>
<li>通勤経路上の園や自宅近くの園を幅広く希望するのが安全</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休延長の手続きについては<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省の公式ページ</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== 保活の基本 =====
  {
    slug: "fukushoku-junbi",
    citySlug: "sendai",
    title: "保育園入園後の復職準備　仙台市で慣らし保育中にやること",
    description:
      "仙台市で保育園の内定を受けた後、慣らし保育期間中に復職の準備として行うべきことをまとめました。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>慣らし保育とは</h2>
<p>慣らし保育は、お子さんが保育園の環境に徐々に慣れるための期間です。一般的に<strong>1〜2週間</strong>かけて、短時間の預かりから徐々に時間を延ばしていきます。</p>

<h2>慣らし保育のスケジュール例</h2>
<table>
<tr><th>日程</th><th>預かり時間</th></tr>
<tr><td>1〜3日目</td><td>1〜2時間程度</td></tr>
<tr><td>4〜5日目</td><td>午前中（給食まで）</td></tr>
<tr><td>6〜8日目</td><td>午後のおやつまで</td></tr>
<tr><td>9〜10日目</td><td>通常保育</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育の期間は園やお子さんの年齢・性格によって異なります。入園説明会で確認しましょう。復職日は慣らし保育終了後に設定するのが一般的です。</p>
</div>

<h2>復職前にやること</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>勤務先との復職日の調整</strong>
<p>慣らし保育の期間を考慮して、復職日を決めます。入園月の翌月末までに復職すればOKです。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>病児保育やサポート体制の確認</strong>
<p>子どもが体調を崩した際の預け先を確保しておきましょう。仙台市の病児保育施設やファミリーサポートを調べます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>持ち物の準備と名前付け</strong>
<p>園指定の持ち物リストに従い、全てに名前を書きます。着替えは多めに用意しましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>仙台市の病児保育施設については<a href="https://www.city.sendai.jp/kurashi/kenkotofukushi/kosodate/hoikujo/" target="_blank" rel="noopener">仙台市公式サイト「子どもを預ける」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ===== 点数アップ =====
  {
    slug: "sannin-me-hokatsu",
    citySlug: "sendai",
    title: "第3子以降の保活　仙台市での保育料無料と加点の仕組み",
    description:
      "仙台市で第3子以降の保育園入園を目指す方向けに、保育料の軽減措置や利用調整での扱いを解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>第3子以降の保育料</h2>
<p>仙台市では、認可保育園に通う第3子以降のお子さんの保育料は<strong>無料</strong>です。また、3〜5歳児は幼児教育・保育の無償化により全員が保育料無料です。</p>

<h2>第3子の数え方</h2>
<p>保育料の算定における「第3子」の数え方にはルールがあります。</p>
<ul>
<li><strong>0〜2歳児</strong>：小学校就学前の子どもの中で数えて第3子以降が無料</li>
<li><strong>3〜5歳児</strong>：無償化により全員無料（第何子かに関係なし）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>副食費（給食のおかず代）も、第3子以降は免除される場合があります。詳しくは園または区役所にお問い合わせください。</p>
</div>

<h2>利用調整での扱い</h2>
<p>仙台市の利用調整では、きょうだいが希望園に在園している場合に+3点の加点があります。第3子特有の追加加点は設定されていませんが、きょうだい加点は適用されます。</p>

<h2>多子世帯への支援</h2>
<ul>
<li>保育料の多子軽減（第2子半額、第3子以降無料）</li>
<li>副食費の免除（該当する場合）</li>
<li>仙台市のその他の子育て支援制度（児童手当など）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>多子軽減の詳細は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // ===== 点数アップ =====
  {
    slug: "tanshin-funin",
    citySlug: "sendai",
    title: "単身赴任世帯の保活　仙台市での点数と申込の注意点",
    description:
      "仙台市で単身赴任中の世帯が保育園に申し込む際の基準指数の扱いと注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>単身赴任世帯の基準指数</h2>
<p>仙台市では、父母が別居している場合でも、<strong>婚姻関係にある両親それぞれの基準指数</strong>が合算されます。単身赴任先で働いている親もフルタイムであれば基準指数10点です。</p>

<h2>単身赴任の場合の注意点</h2>
<ul>
<li>単身赴任先の就労証明書が必要</li>
<li>住民票が仙台市にない場合でも、配偶者の住民票が仙台市にあれば申込可能</li>
<li>単身赴任であること自体は加点の対象にはならない</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任により実質的にひとり親状態であっても、婚姻関係がある場合はひとり親世帯の加点（+3点）は適用されません。基準指数は父母両方の合算です。</p>
</div>

<h2>祖父母同居の場合</h2>
<p>単身赴任で配偶者が不在のため祖父母と同居している場合、65歳未満の祖父母がいると-1点の調整指数が適用される可能性があります。ただし、祖父母が就労中や疾病で保育ができない場合は減点対象外となることがあります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>個別の状況については、お住まいの区の区役所保育給付課にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // ===== 点数アップ =====
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "sendai",
    title: "祖父母同居は保育園に不利？仙台市の調整指数への影響",
    description:
      "仙台市で祖父母と同居している場合の保育園入園への影響を解説。減点の条件と対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>祖父母同居で減点？</h2>
<p>仙台市の利用調整では、<strong>65歳未満の祖父母が同居</strong>している場合、調整指数で<span class="highlight">-1点</span>の減点が適用されます。「保育可能な家族がいる」とみなされるためです。</p>

<h2>減点対象外となるケース</h2>
<p>以下の場合は、祖父母が同居していても減点対象外となる可能性があります。</p>
<ul>
<li>祖父母が<strong>65歳以上</strong>の場合</li>
<li>祖父母が<strong>就労中</strong>で保育ができない場合</li>
<li>祖父母が<strong>疾病・障害</strong>等で保育ができない場合</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>減点対象外であることを証明するために、祖父母の就労証明書や診断書などの書類が必要になる場合があります。事前に区役所に確認しましょう。</p>
</div>

<h2>同居の定義</h2>
<p>「同居」は住民票上の同一世帯だけでなく、同じ住所に住んでいる場合も含まれます。二世帯住宅でも同一敷地内であれば同居とみなされる可能性があります。</p>

<h2>減点を避けるために</h2>
<ul>
<li>祖父母が就労中であれば、就労証明書を提出する</li>
<li>祖父母が疾病等の場合は、診断書を添付する</li>
<li>判断に迷う場合は必ず区役所に事前相談する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>調整指数の詳細は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/documents/r8riyouannnai.pdf" target="_blank" rel="noopener">仙台市「令和8年度保育施設等利用案内」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ===== 保活の基本 =====
  {
    slug: "fushoninchi-taiou",
    citySlug: "sendai",
    title: "保育園に落ちたらどうする？仙台市での不承諾後のアクション",
    description:
      "仙台市の保育園利用調整で不承諾（利用待機）になった場合の次のステップを解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾通知が届いたら</h2>
<p>仙台市の利用調整で利用待機（不承諾）の通知が届いた場合、以下のアクションを検討しましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>2次利用調整の結果を待つ</strong>
<p>1次で利用待機の場合、自動的に2次の選考対象になります。3月上旬に結果が届きます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>認可外保育施設は直接契約のため、空きがあれば入園できます。早めに問い合わせましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>途中入園の申込を続ける</strong>
<p>4月以降も毎月の途中入園に申し込めます。前月5日が締切です。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>育休延長を検討する</strong>
<p>不承諾通知を勤務先とハローワークに提出し、育休を延長できます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾通知は育休延長の手続きに必要な書類です。紛失しないよう大切に保管してください。</p>
</div>

<h2>区役所への相談</h2>
<p>不承諾の理由や、今後入れる可能性のある園について、区役所の保育給付課に相談することができます。具体的な空き状況の情報を教えてもらえる場合があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>途中入園の手続きは<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 保活の基本 =====
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "sendai",
    title: "仙台市で待機児童にならないための5つの対策",
    description:
      "仙台市で希望する保育園に入れないリスクを減らすための具体的な対策を5つ紹介します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>5つの対策</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>希望園を最大数書く</strong>
<p>仙台市では複数の園を希望順位をつけて記入できます。人気園だけでなく、空きがありそうな園も含めて幅広く書きましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>0歳児クラスからの入園を検討する</strong>
<p>1歳児クラスは育休明けの申込が集中するため競争率が高くなります。0歳児クラスのほうが入りやすい傾向にあります。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>小規模保育を活用する</strong>
<p>0〜2歳は小規模保育に入り、3歳で+10点の卒園加点を使って認可園に転園する戦略が有効です。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>調整指数の加点を漏れなく申告する</strong>
<p>該当する加点項目を全て申告しましょう。書類に書かなければ加点されません。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>認可外保育施設も並行して検討する</strong>
<p>認可外は直接契約のため、認可園の結果を待ちながら確保しておくことができます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>仙台市は待機児童ゼロを達成していますが、希望する特定の園に入れるとは限りません。選択肢を広げることが最も重要な対策です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>仙台市の保活に関する情報は<a href="https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html" target="_blank" rel="noopener">仙台市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== 保活の基本 =====
  {
    slug: "tennen-moshikomi",
    citySlug: "sendai",
    title: "仙台市の保育園への転園申込方法　手続きの流れと注意点",
    description:
      "仙台市で別の保育園への転園を希望する場合の申込方法と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転園申込とは</h2>
<p>現在仙台市の認可保育園に通っているお子さんが、別の認可保育園に移ることを希望する場合に行う手続きです。</p>

<h2>転園の申込方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>転園申込書を提出</strong>
<p>お住まいの区の区役所保育給付課に転園申込書を提出します。毎月の途中入園と同じ利用調整で選考されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>利用調整で選考</strong>
<p>新規入園の申込者と同じ基準で選考されます。きょうだい在園の加点（+3）がある場合は有利です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>転園内定後の手続き</strong>
<p>内定が出たら、現在の園の退園手続きと新しい園への入園手続きを行います。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園は空きがある場合にのみ可能です。人気園への転園は新規入園と同様に競争があります。4月入園のタイミングが転園の可能性が最も高くなります。</p>
</div>

<h2>転園の注意点</h2>
<ul>
<li>転園が決まるまでは現在の園に通い続けられる</li>
<li>転園が内定したら、辞退すると次回以降の利用調整で不利になる可能性がある</li>
<li>転園理由は利用調整の点数に影響しない（点数は全て同じ基準で算出）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>転園の手続きについては、お住まいの区の区役所保育給付課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
];

registerArticles(articles);
