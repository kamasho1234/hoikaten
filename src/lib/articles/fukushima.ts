import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "fukushima",
    title: "福島市の保活スケジュール　令和8年度4月入園の流れを解説",
    description:
      "福島市の認可保育園の申込時期・選考の流れ・内定通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>福島市の4月入園は、<strong>1次募集</strong>と<strong>2次募集</strong>の2段階で行われます。早めにスケジュールを把握して準備を始めましょう。</p>

<h3>1次募集</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月頃〜12月上旬（詳細は市HPで公表）</td></tr>
<tr><td>結果通知</td><td>令和8年2月頃（郵送）</td></tr>
</table>

<h3>2次募集</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>1次募集終了後〜令和8年2月頃</td></tr>
<tr><td>結果通知</td><td>令和8年3月頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次で保留となった方は2次募集の対象にもなります。また保留通知書には指数（施設加点を除く）が記載されるので、自分の点数を確認できます。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>福島市の保育施設の種類やエリアごとの特徴を調べましょう。</p>
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
<p>福島市が公表する「保育施設利用案内」を確認し、必要書類を揃えましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の提出</strong>
<p>就労証明書などの書類を揃えて、福島市幼保企画課に提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>年度途中の各月1日付利用開始を希望する場合、<span class="highlight">前月の5日</span>が申込締切日です（休日の場合は翌平日）。結果は入所希望月の前月15日頃に郵送で通知されます。</p>
<p>受入予定数は入所希望月の前々月25日頃から申込締切日まで、福島市公式サイトで公開されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.fukushima.fukushima.jp/kosodate-portal/mokuteki/azukari/hoikushisetsu/874.html" target="_blank" rel="noopener">福島市公式サイト「保育施設の利用案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },

  // ===== 点数・選考 (4) =====
  {
    slug: "scoring-system-guide",
    citySlug: "fukushima",
    title: "福島市の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "福島市の保育園入園選考で使われる「基本指数」と「調整指数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>福島市の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。これを<strong>利用調整</strong>と呼びます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点 ＝ 基本指数（保護者1）＋ 基本指数（保護者2）＋ 調整指数</p>
</div>

<h2>基本指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">19点</span>（就労の場合）で、フルタイム共働きなら合計<span class="highlight">38点</span>が基本指数の満点です。</p>
<p>福島市の特徴は、就労時間と就労日数の組み合わせで細かく点数が分かれることです。休憩時間も含めた実労働時間で判断されます。</p>

<table>
<tr><th>就労条件（週5日以上の場合）</th><th>指数</th></tr>
<tr><td>1日8時間以上（週40時間以上）</td><td>19</td></tr>
<tr><td>1日7時間以上8時間未満</td><td>18</td></tr>
<tr><td>1日6時間以上7時間未満</td><td>17</td></tr>
<tr><td>1日5時間以上6時間未満</td><td>16</td></tr>
<tr><td>1日4時間以上5時間未満</td><td>15</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>家庭の状況に応じて加算・減算される点数です。主な項目は以下の通りです。</p>

<table>
<tr><th>項目</th><th>調整点</th></tr>
<tr><td>小規模保育事業の卒園児</td><td>+35</td></tr>
<tr><td>保護者不存在（里親含む）</td><td>+5</td></tr>
<tr><td>保護者が市内認可保育施設の保育士</td><td>+5</td></tr>
<tr><td>きょうだいが同じ施設に在籍・同時希望</td><td>+3</td></tr>
<tr><td>ひとり親（保育可能な同居親族なし）</td><td>+3</td></tr>
<tr><td>18歳以上65歳未満の同居親族がいる</td><td>-1（1名につき）</td></tr>
<tr><td>育休延長を許容する場合</td><td>-15</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>福島市ではひとり親家庭の場合、基本指数にも19点が加算されます（調整指数とは別枠）。これにより、ひとり親で就労中の方は基本指数だけで最大37点となります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数の詳細は<a href="https://www.city.fukushima.fukushima.jp/material/files/group/55/R8hoikujisshikizyun.pdf" target="_blank" rel="noopener">福島市「保育所保育実施基準（利用調整）の考え方」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "border-line",
    citySlug: "fukushima",
    title: "福島市の保育園ボーダーライン　何点あれば入れる？",
    description:
      "福島市の認可保育園に入るには何点必要？フルタイム共働きの38点で足りるのか、加点の有無による違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>フルタイム共働き＝38点がボーダー</h2>
<p>福島市の基本指数は父母各最大19点の合計<span class="highlight">38点</span>が満点です。フルタイム共働き世帯はこの38点となり、多くの人気園ではこの38点がボーダーラインとなっています。</p>

<h2>38点で同点の場合はどうなる？</h2>
<p>基本指数が同点の場合、福島市では以下の優先順位で利用調整が行われます。</p>
<ol>
<li>保護者が市内認可保育施設の保育士等の場合</li>
<li>養育している18歳未満の子どもの人数が多い世帯</li>
<li>希望順位が高い方</li>
<li>市町村民税所得割合計が低い世帯</li>
<li>保護者の基本指数の事由によるポイントが高い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>38点で横並びになるため、<strong>調整指数で差がつく</strong>のが福島市の特徴です。きょうだい同施設（+3）、小規模保育卒園（+35）などの加点がある方が有利になります。</p>
</div>

<h2>加点なしの38点で入れる園はある？</h2>
<p>エリアや年齢クラスによって状況は大きく異なります。</p>
<ul>
<li><strong>0〜1歳児クラス</strong>：人気園では38点でも厳しい場合あり</li>
<li><strong>2歳児クラス</strong>：小規模保育からの進級枠があるため、枠が限られる</li>
<li><strong>3歳児クラス以上</strong>：比較的入りやすい傾向</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各施設の受入予定数は<a href="https://www.city.fukushima.fukushima.jp/kosodate-portal/5735.html" target="_blank" rel="noopener">福島市公式サイト「認可保育施設の受入予定数」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "katen-up-strategy",
    citySlug: "fukushima",
    title: "福島市で点数を上げる方法　調整指数の加点項目を総チェック",
    description:
      "福島市の保育園入園選考で調整指数の加点を得る方法を解説。該当項目を見落とさないためのチェックリストです。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整指数の加点項目一覧</h2>
<p>福島市の利用調整で使われる調整指数の主な加点項目をまとめました。該当するものがないか、一つひとつ確認しましょう。</p>

<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>小規模保育卒園（連携施設）</td><td>+40</td><td>小規模保育の卒園児が連携施設へ転所希望</td></tr>
<tr><td>小規模保育卒園（その他）</td><td>+35</td><td>小規模保育の卒園児が転所希望</td></tr>
<tr><td>保護者不存在</td><td>+5</td><td>里親を含む</td></tr>
<tr><td>保育士等加点（市内認可）</td><td>+5</td><td>福島市内の認可保育施設で勤務</td></tr>
<tr><td>きょうだい同施設</td><td>+3</td><td>きょうだいが在籍中の施設を希望</td></tr>
<tr><td>ひとり親（同居親族なし）</td><td>+3</td><td>保育可能な同居親族がいない</td></tr>
<tr><td>単身赴任（同居親族なし）</td><td>+3</td><td>保育可能な同居親族がいない</td></tr>
<tr><td>ひとり親の求職必要性</td><td>+3</td><td>ひとり親で失業により就労必要性が高い</td></tr>
<tr><td>基本類型以外の事由あり</td><td>+3</td><td>事由1つにつき（基本指数16点以上相当）</td></tr>
<tr><td>保育士等加点（市内認可外等）</td><td>+3</td><td>認可外・幼稚園・児童発達支援等で勤務</td></tr>
<tr><td>保育士等加点（市外認可）</td><td>+2</td><td>福島市外の認可保育施設で勤務</td></tr>
<tr><td>きょうだい（就学前）</td><td>+1</td><td>就学前のきょうだい1名ごとに加算</td></tr>
<tr><td>ひとり親（同居親族あり）</td><td>+1</td><td>保育可能な同居親族がいる</td></tr>
<tr><td>1年以上待機</td><td>+1</td><td>4月入所のみ適用</td></tr>
</table>

<h2>減点項目にも注意</h2>
<table>
<tr><th>減点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>育休延長を許容</td><td>-15</td><td>希望施設に入所できるまで育休延長可の場合</td></tr>
<tr><td>保育料滞納</td><td>-5</td><td>督促に対して誠意ある対応がない場合</td></tr>
<tr><td>転所希望（特別な理由なし）</td><td>-3</td><td>きょうだい同施設希望や転居以外の転所</td></tr>
<tr><td>同居親族</td><td>-1</td><td>18歳以上65歳未満の保育可能な同居親族1名につき</td></tr>
<tr><td>入所辞退</td><td>-1</td><td>やむを得ない事情なく辞退した場合（同年度内）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福島市で最も大きな加点は<strong>小規模保育卒園の+35〜40点</strong>です。0〜2歳で小規模保育に入り、3歳で認可園に転園する戦略は非常に有効です。</p>
</div>

<h2>点数を上げるためにできること</h2>
<ol>
<li><strong>就労時間を確認する</strong>：基本指数は就労時間で19〜13点と幅がある。休憩時間も含まれるので正確に把握する</li>
<li><strong>きょうだい同園を狙う</strong>：上の子と同じ園に申し込むことで+3点</li>
<li><strong>小規模保育を経由する</strong>：0〜2歳で小規模保育に入り、3歳時に+35〜40点で認可園に転園</li>
<li><strong>該当する加点を漏れなく申告する</strong>：書類に記載しなければ加点されない</li>
</ol>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>調整指数の全項目は<a href="https://www.city.fukushima.fukushima.jp/material/files/group/55/R8hoikujisshikizyun.pdf" target="_blank" rel="noopener">福島市「保育所保育実施基準（利用調整）の考え方」（PDF）</a>に記載されています。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "douten-tiebreak",
    citySlug: "fukushima",
    title: "福島市の保育園選考　同点の場合の優先順位を解説",
    description:
      "福島市の認可保育園で同じ点数の申込者が複数いる場合、どのような基準で優先されるのか解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>福島市では、基本指数＋調整指数の合計が同じ場合、以下の順序で優先されます。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>保護者が市内認可保育施設の保育士等</strong>
<p>保育の需要に応じる保育施設が不足している場合に限り、保育士として就労中・就労予定の方が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>養育している子ども（18歳未満）の人数が多い世帯</strong>
<p>4月1日時点での18歳未満の子どもの人数で判断されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>希望順位が高い方</strong>
<p>その施設に対する希望順位が高い方が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>市町村民税所得割合計が低い世帯</strong>
<p>父母の所得割合計額で比較され、低い方が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>基本指数の事由によるポイントが高い世帯</strong>
<p>災害（9pt）＞母子・父子家庭（8pt）＞疾病等（7pt）＞就労（6pt）＞介護（5pt）＞就学（4pt）＞出産（3pt）＞求職（2pt）の順で優先度が決まります。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点で並んだ場合、<strong>子どもの人数が多い世帯</strong>や<strong>希望順位が高い方</strong>が優先されます。人気園は第1希望に書くことが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の方法は<a href="https://www.city.fukushima.fukushima.jp/material/files/group/55/R8hoikujisshikizyun.pdf" target="_blank" rel="noopener">福島市「保育所保育実施基準（利用調整）の考え方」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // ===== 育休・復職 (1) =====
  {
    slug: "jitan-kinmu-score",
    citySlug: "fukushima",
    title: "時短勤務だと点数はどうなる？福島市の基本指数への影響",
    description:
      "育休復帰後に時短勤務を選ぶ場合、福島市の基本指数にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>時短勤務は基本指数に影響する</h2>
<p>福島市の基本指数は「勤務日数」と「1日の勤務時間（休憩含む）」で決まります。時短勤務を選ぶと、フルタイムに比べて基本指数が下がる可能性があります。</p>

<h2>勤務条件と基本指数の関係（週5日勤務の場合）</h2>
<table>
<tr><th>勤務時間の目安</th><th>基本指数</th><th>父母合計</th></tr>
<tr><td>8:30〜17:15（8時間45分）</td><td>19点</td><td>38点</td></tr>
<tr><td>9:00〜17:00（8時間）</td><td>19点</td><td>38点</td></tr>
<tr><td>10:00〜17:00（7時間）</td><td>18点</td><td>36点</td></tr>
<tr><td>9:00〜16:00（7時間）</td><td>18点</td><td>36点</td></tr>
<tr><td>9:00〜15:00（6時間）</td><td>17点</td><td>34点</td></tr>
<tr><td>10:00〜15:00（5時間）</td><td>16点</td><td>32点</td></tr>
<tr><td>8:30〜12:30（4時間）</td><td>15点</td><td>30点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>片方が時短勤務で基本指数17点（6時間勤務）になると、もう片方が満点の19点でも合計は36点にとどまります。フルタイム共働き（38点）との差は2点ですが、この差が人気園の選考では影響します。</p>
</div>

<h2>入園申込時は「復職後の勤務時間」で判定</h2>
<p>入園申込の時点では育休中のケースが多いですが、就労証明書には復職後の予定勤務条件を記載してもらいます。復職後にフルタイムで働く予定なら、フルタイムの基本指数で利用調整を受けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福島市は就労時間に<strong>休憩時間を含めて</strong>計算します。例えば9時〜17時勤務（休憩1時間）の場合、就労時間は8時間として扱われ、19点が適用されます。</p>
</div>

<h2>育休延長の減点に注意</h2>
<p>福島市では「申請した希望保育施設に入所できるまで育児休業の延長も許容できる」にチェックすると、<span class="highlight">-15点</span>の大きな減点が適用されます。入園を本気で希望する場合はチェックしないようにしましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>基準指数表の詳細は<a href="https://www.city.fukushima.fukushima.jp/material/files/group/55/R8hoikujisshikizyun.pdf" target="_blank" rel="noopener">福島市「保育所保育実施基準（利用調整）の考え方」（PDF）</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },

  // ===== 保育園選び (1) =====
  {
    slug: "area-guide",
    citySlug: "fukushima",
    title: "福島市のエリア別保活事情　地域ごとの特徴と入りやすさ",
    description:
      "福島市の中心部・北部・南部・西部など地域別に、保育園の数や入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "rose",
    content: `<h2>福島市の保活エリア事情</h2>
<p>福島市は中心市街地から郊外まで広いエリアに保育施設が点在しています。お住まいのエリアの特徴を把握しておきましょう。</p>

<h3>福島駅周辺・中心部</h3>
<p>交通の便がよく保育需要が高いエリアです。駅周辺の施設は人気が集中しやすく、0〜1歳児クラスは競争率が高い傾向です。</p>

<h3>北部エリア（飯坂・笹谷方面）</h3>
<p>飯坂温泉周辺から笹谷にかけてのエリアです。比較的ゆとりのある施設もあり、中心部に比べて入りやすい傾向があります。</p>

<h3>南部エリア（蓬莱・松川方面）</h3>
<p>住宅地が広がるエリアで、ファミリー層も多く住んでいます。新しい住宅開発がある地域では保育需要が高まることがあります。</p>

<h3>西部エリア（庭坂・土湯方面）</h3>
<p>郊外エリアのため施設数は限られますが、その分倍率は低い傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「駅から近い園」「新しい園」に人気が集中しやすいですが、少し離れた園では入りやすいケースがあります。送迎経路を工夫して候補を広げましょう。第6希望まで記入できるので、なるべく多くの施設を書くことをおすすめします。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各施設の受入予定数は<a href="https://www.city.fukushima.fukushima.jp/kosodate-portal/5735.html" target="_blank" rel="noopener">福島市公式サイト「認可保育施設の受入予定数」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },

  // ===== 認可外 (2) =====
  {
    slug: "ninkagai-oyako",
    citySlug: "fukushima",
    title: "認可園に落ちた場合の選択肢　福島市の認可外・一時預かり活用法",
    description:
      "福島市の認可保育園に入れなかった場合に検討すべき認可外保育施設や一時預かりの選択肢を紹介します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>認可園に入れなかったらどうする？</h2>
<p>福島市の認可保育園に入れなかった場合でも、いくつかの選択肢があります。慌てずに次のステップを検討しましょう。</p>

<h2>選択肢1：2次募集に申し込む</h2>
<p>1次で保留となった場合、2次募集の対象にもなります。1次で埋まらなかった枠や辞退で生じた枠で内定する可能性があります。</p>

<h2>選択肢2：毎月の途中入園を申し込む</h2>
<p>年度途中でも毎月の利用調整が行われます。申込締切は入所希望月の<span class="highlight">前月5日</span>です。空きが出たタイミングで入園できる可能性があります。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設なら点数による選考がなく、空きがあればすぐに入園できます。施設に直接問い合わせましょう。</p>

<h2>選択肢4：企業主導型保育の地域枠を利用する</h2>
<p>地域枠に空きがあれば利用可能です。保育料も比較的リーズナブルな施設が多いです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設を利用しながら毎月の途中入園の申込を続けることもできます。1年度間以上待機すると4月入所で+1点の加点が得られます。</p>
</div>

<h2>選択肢5：育休を延長する</h2>
<p>認可保育園に入れなかったことを理由に育児休業を延長することも可能です。最長で子どもが2歳になるまで延長できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>福島市では「育休延長も許容できる」にチェックすると-15点の減点が適用されます。また、2025年4月から育児休業給付金の延長手続きが厳格化されています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入予定数は<a href="https://www.city.fukushima.fukushima.jp/kosodate-portal/5735.html" target="_blank" rel="noopener">福島市公式サイト「認可保育施設の受入予定数」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "fukushima",
    title: "福島市で認可外を経由して加点を得る方法　小規模保育の活用術",
    description:
      "福島市で小規模保育を活用して、認可園の入園選考で大幅な加点を得る戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780860-5e6801e6e7f5?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>福島市で最大の加点は「小規模保育卒園」</h2>
<p>福島市の利用調整基準で最も大きな加点項目は、<strong>小規模保育事業の卒園児</strong>に対する<span class="highlight">+35点</span>（連携施設なら+40点）です。これは全国的にも非常に大きな加点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育卒園の加点+35点があれば、フルタイム共働き38点と合わせて73点になります。この点数なら、ほぼ確実に希望の認可園に入園できます。</p>
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
<p>卒園加点+35が適用されるため、フルタイム共働き38点＋卒園加点35点＝73点で選考を受けられます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>連携施設なら+40点</strong>
<p>小規模保育の卒園児が連携施設への転所を希望する場合は、さらに5点上乗せの+40点です。</p>
</div>
</div>

<h2>認可外保育施設の利用では加点されない</h2>
<p>認可外保育施設に通っているだけでは直接的な加点はありません。加点が得られるのは「小規模保育事業の卒園児」に限られます。小規模保育事業は認可施設であり、認可外とは異なります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだい同施設希望や転居以外の理由で転所を希望する場合は、-3点の減点が適用されます（入所した年度内のみ）。</p>
</div>

<h2>認可外利用時の無償化</h2>
<p>認可外保育施設でも「保育の必要性」の認定を受ければ無償化の対象になります。3〜5歳児は月額37,000円まで、0〜2歳児（住民税非課税世帯）は月額42,000円まで補助されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.fukushima.fukushima.jp/kosodate-portal/mokuteki/azukari/hoikushisetsu/874.html" target="_blank" rel="noopener">福島市公式サイト「保育施設の利用案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // ===== 最新情報 (1) =====
  {
    slug: "seido-kaisei-2026",
    citySlug: "fukushima",
    title: "2026年度の保育制度改正ポイント　福島市の保活への影響",
    description:
      "2026年度に予定されている保育関連の制度改正と、福島市の保活への影響をまとめます。",
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
<p>福島市では「育休延長も許容できる」にチェックすると-15点の減点が適用されます。育休延長を前提とした申込は、点数面でも大きく不利になります。</p>
</div>

<h2>福島市の保育実施基準の改定</h2>
<p>福島市では令和8年度から保育実施基準が改定されています。主な変更点として、保育士等の加点や小規模保育卒園児の加点について、より詳細な基準が設けられました。</p>

<h2>保育の質の向上に向けた取り組み</h2>
<p>国は保育士の配置基準の改善を進めており、1歳児の配置基準を6:1から5:1へ引き上げる方向で検討が続いています。福島市でも保育の質の向上に向けた取り組みが行われています。</p>

<h2>福島市独自の取り組み</h2>
<ul>
<li>認可保育施設の受入予定数のオンライン公表</li>
<li>保育施設利用案内のPDF配布による情報公開の充実</li>
<li>保育士確保のための市内認可施設勤務保育士への優遇加点（+5点）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>制度の変更は毎年行われる可能性があります。最新の情報は必ず福島市の公式サイトや「保育施設利用案内」で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用調整基準は<a href="https://www.city.fukushima.fukushima.jp/material/files/group/55/R8hoikujisshikizyun.pdf" target="_blank" rel="noopener">福島市「保育所保育実施基準（利用調整）の考え方」（PDF）</a>をご確認ください。育休延長の手続きについては<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省の公式ページ</a>もご参照ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
