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
];

registerArticles(articles);
