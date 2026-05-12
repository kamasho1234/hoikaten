import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "sagamihara",
    title: "相模原市の保活スケジュール　令和8年度4月入園の流れを解説",
    description:
      "相模原市の認可保育所の申込時期・選考の流れ・内定通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>相模原市の4月入園は、<strong>1次利用調整</strong>と<strong>2次利用調整</strong>の2段階で行われます。</p>

<h3>1次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年10月中旬〜11月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<h3>2次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年2月上旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>申込は各区のこども家庭相談課または子育て支援センターに提出します。オンライン申請（LoGoフォーム）にも対応しています。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>相模原市の保育施設の種類やエリアごとの空き状況を調べましょう。</p>
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
<strong>9月〜10月：利用案内を入手</strong>
<p>相模原市が公表する「利用申込みのご案内」を確認し、必要書類を揃えましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.sagamihara.kanagawa.jp/kosodate/1026602/kosodate/1026606/hoikuen/1006704.html" target="_blank" rel="noopener">相模原市公式サイト「認可保育所等の利用申込案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },

  // ===== 点数・選考 (3) =====
  {
    slug: "scoring-system",
    citySlug: "sagamihara",
    title: "相模原市の保育園の点数はどう決まる？基準点と調整点をやさしく解説",
    description:
      "相模原市の保育園入園の「選考基準点数」と「選考基準調整点数」の仕組みをわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>相模原市の点数の仕組み</h2>
<p>相模原市の保育園入園の選考は<strong>「選考基準点数（父母それぞれ）＋選考基準調整点数（世帯）＝合計点数」</strong>で行われます。</p>

<h3>選考基準点数とは？</h3>
<p>保護者それぞれの「保育が必要な理由」に応じた点数です。父母それぞれ最大20点。</p>
<table>
<tr><th>就労条件</th><th>点数</th></tr>
<tr><td>月20日以上かつ1日8時間以上</td><td>20点</td></tr>
<tr><td>月20日以上かつ1日6時間以上</td><td>18点</td></tr>
<tr><td>月16日以上かつ1日8時間以上</td><td>18点</td></tr>
<tr><td>月16日以上かつ1日6時間以上</td><td>16点</td></tr>
<tr><td>月16日以上かつ1日4時間以上</td><td>14点</td></tr>
<tr><td>月12日以上かつ1日4時間以上</td><td>12点</td></tr>
<tr><td>月64時間以上（上記以外）</td><td>10点</td></tr>
</table>

<h3>選考基準調整点数とは？</h3>
<p>世帯の状況に応じてプラスまたはマイナスされる点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親</td><td>+5</td></tr>
<tr><td>きょうだい同一施設希望</td><td>+5</td></tr>
<tr><td>きょうだい在園（別施設）</td><td>+2</td></tr>
<tr><td>多胎児同時申込</td><td>+3</td></tr>
<tr><td>育休復帰</td><td>+3</td></tr>
<tr><td>認可外利用（月64時間以上）</td><td>+3</td></tr>
<tr><td>単身赴任</td><td>+2</td></tr>
<tr><td>生活保護</td><td>+3</td></tr>
<tr><td>同居保育可能者あり</td><td>-2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の基準は<a href="https://www.city.sagamihara.kanagawa.jp/kosodate/1026602/kosodate/1026606/hoikuen/1006704.html" target="_blank" rel="noopener">相模原市「認可保育所等の利用申込案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "douten-taisaku",
    citySlug: "sagamihara",
    title: "相模原市で同点になったらどうなる？同点時の優先順位と対策",
    description:
      "相模原市の保育園入園で同じ点数になった場合の優先順位ルールと、差をつけるための具体的な対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同じ点数の場合の優先順位</h2>
<p>相模原市では合計点数が同じ場合、以下の順で優先されます。</p>

<ol>
<li><strong>ひとり親・単身赴任世帯</strong></li>
<li><strong>基準点の合計が高い</strong>（調整点を除いた基本の点数）</li>
<li><strong>きょうだいが在園中</strong></li>
<li><strong>子どもの数が多い</strong></li>
<li><strong>所得が低い世帯</strong></li>
</ol>

<h2>同点対策のポイント</h2>
<ul>
<li>調整点の加点項目を全て漏れなく申告する</li>
<li>きょうだいが在園中の園を希望すると+5点＋同点時優先</li>
<li>認可外保育施設を利用して加点を得る（+3点）</li>
<li>育休復帰加点（+3点）を忘れずに申告する</li>
<li>希望園を多めに書いて内定確率を上げる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは各区のこども家庭相談課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "fulltime-score",
    citySlug: "sagamihara",
    title: "相模原市でフルタイム共働きは何点？40点の内訳と加点のコツ",
    description:
      "相模原市でフルタイム共働き世帯が何点になるのか、40点の内訳と加点で差をつける方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>フルタイム共働きの基本点数</h2>
<p>相模原市では、両親ともに<strong>月20日以上かつ1日8時間以上</strong>の就労で、選考基準点数は<strong>父20点＋母20点＝40点</strong>になります。</p>

<h3>フルタイム＋加点の例</h3>
<table>
<tr><th>状況</th><th>合計点</th></tr>
<tr><td>フルタイム共働き（加点なし）</td><td>40点</td></tr>
<tr><td>＋ きょうだい同一施設</td><td>45点</td></tr>
<tr><td>＋ 育休復帰</td><td>43点</td></tr>
<tr><td>＋ ひとり親</td><td>45点</td></tr>
<tr><td>＋ きょうだい＋育休復帰＋認可外利用</td><td>51点</td></tr>
</table>

<h2>加点で差をつけるには</h2>
<ul>
<li><strong>きょうだい同一施設希望（+5）</strong>：最も大きな加点のひとつ</li>
<li><strong>ひとり親（+5）</strong>：同点時の優先順位でも最優先</li>
<li><strong>育休復帰（+3）</strong>：入園月に復帰するなら忘れずに</li>
<li><strong>認可外利用（+3）</strong>：月64時間以上の利用が条件</li>
<li><strong>単身赴任（+2）</strong>：該当すれば申告を忘れずに</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市の加点は+3〜5と比較的大きいため、1つの加点でも大きな差がつきます。使える加点は全て申告しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },

  // ===== 地域情報 (2) =====
  {
    slug: "popular-areas",
    citySlug: "sagamihara",
    title: "相模原市で保育園に入りやすいエリアは？3区の激戦度を分析",
    description:
      "相模原市3区（緑区・中央区・南区）の保育園の入りやすさを比較。激戦区と穴場エリアの特徴を解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>相模原市の3区の保育園事情</h2>
<p>相模原市は3つの区で構成されており、エリアによって保育園の入りやすさが大きく異なります。</p>

<h3>激戦度マップ</h3>
<table>
<tr><th>区</th><th>激戦度</th><th>特徴</th></tr>
<tr><td>南区</td><td>激戦</td><td>小田急線沿線・相模大野駅周辺が特に人気。マンション開発で子育て世帯増加中</td></tr>
<tr><td>中央区</td><td>やや激戦</td><td>相模原駅・橋本駅周辺が人気。リニア新幹線の橋本駅開業で注目度上昇</td></tr>
<tr><td>緑区</td><td>穴場〜普通</td><td>橋本エリアはやや激戦だが、津久井・相模湖方面は比較的余裕あり</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南区・中央区の駅近は40点でも厳しい園がありますが、駅から離れた園や緑区の郊外エリアなら比較的入りやすいです。</p>
</div>

<h3>エリア選びのコツ</h3>
<ul>
<li>相模原市は東京のベッドタウン。通勤ルート上の園を選ぶのが便利</li>
<li>橋本駅周辺は今後リニア開業で競争が激化する可能性あり</li>
<li>町田市との境界付近は町田市の保育園も検討できる</li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "ninka-ninkagai",
    citySlug: "sagamihara",
    title: "相模原市の認可外保育施設（認定保育室）とは？加点への活用法",
    description:
      "相模原市の認定保育室の特徴と、認可保育園入園のための加点として活用する方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>認定保育室とは</h2>
<p>相模原市独自の制度で、市が認定した認可外保育施設です。認可保育園より入りやすく、利用することで認可園申込時に+3点の加点が得られます。</p>

<h3>認定保育室のメリット</h3>
<ul>
<li>認可園より入りやすい</li>
<li>月64時間以上利用で認可園申込時に+3点の加点</li>
<li>市からの補助があるため保育料が一般の認可外より安い</li>
<li>保育の質が市の基準で確保されている</li>
</ul>

<h3>加点を得るための条件</h3>
<ul>
<li>認定保育室に<strong>月64時間以上</strong>預けていること</li>
<li>月ぎめの契約であること</li>
<li>利用証明書を提出すること</li>
</ul>

<h2>認可園入園への活用ステップ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>まず認定保育室に入園</strong>
<p>認可園に入れなかった場合、認定保育室に預けて就労を継続します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>月64時間以上利用して加点を確保</strong>
<p>+3点の加点を得るため、月64時間以上の利用が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>翌年度に認可園に申込み</strong>
<p>フルタイム40点＋認可外利用3点＝43点で、加点なしの40点より有利に申込めます。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認定保育室の一覧は<a href="https://www.city.sagamihara.kanagawa.jp/kosodate/1026602/kosodate/1026606/hoikuen/1006765/1006819.html" target="_blank" rel="noopener">相模原市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },

  // ===== 育休・復職 (1) =====
  {
    slug: "ikukyu-fukki",
    citySlug: "sagamihara",
    title: "相模原市で育休明けに保育園に入るには？復帰加点と注意点",
    description:
      "相模原市で育児休業から復帰する際の保育園申込のポイント。育休復帰加点の条件と申請の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰の加点（+3点）</h2>
<p>相模原市では、育児休業を取得し、<strong>入園する月に職場復帰する</strong>場合に+3点の調整点が加算されます。</p>

<h3>加点の条件</h3>
<ul>
<li>育児休業を取得中であること</li>
<li>入園月に復帰すること</li>
<li>復帰後の勤務条件が確認できること（就労証明書の提出）</li>
</ul>

<h2>育休明けの基準点数</h2>
<p>育休からの復帰予定の場合、復帰後の勤務条件で基準点が判定されます。フルタイム復帰なら20点です。</p>

<h3>育休明け＋加点の例</h3>
<table>
<tr><th>状況</th><th>合計点</th></tr>
<tr><td>フルタイム復帰（加点なし）</td><td>40点</td></tr>
<tr><td>＋ 育休復帰</td><td>43点</td></tr>
<tr><td>＋ 育休復帰＋きょうだい同一施設</td><td>48点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市の育休復帰加点は+3と比較的大きいです。復帰予定の方は忘れずに申告しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは各区のこども家庭相談課にお問い合わせください。育休延長については<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省の公式ページ</a>もご参照ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },

  // ===== 施設選び (1) =====
  {
    slug: "jitan-kinmu-score",
    citySlug: "sagamihara",
    title: "相模原市で時短勤務だと何点？パートとの違いと加点の工夫",
    description:
      "相模原市で時短勤務の場合の基準点数と、パートタイムとの違い、加点で補うための具体策を解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>時短勤務の場合の点数</h2>
<p>相模原市では就労の基準点は就労日数と1日の就労時間で決まります。</p>

<table>
<tr><th>勤務条件</th><th>点数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>20点</td></tr>
<tr><td>月20日以上・1日6時間以上</td><td>18点</td></tr>
<tr><td>月16日以上・1日8時間以上</td><td>18点</td></tr>
<tr><td>月16日以上・1日6時間以上</td><td>16点</td></tr>
<tr><td>月16日以上・1日4時間以上</td><td>14点</td></tr>
<tr><td>月12日以上・1日4時間以上</td><td>12点</td></tr>
<tr><td>月64時間以上（上記以外）</td><td>10点</td></tr>
</table>

<h3>時短勤務とパートタイムの違い</h3>
<p>時短勤務の場合、勤務日数が月20日以上であれば18点（1日6時間以上）になります。パートタイムで週3〜4日なら12〜16点程度になる可能性があります。</p>

<h2>加点で補うには</h2>
<ul>
<li>きょうだい同一施設希望（+5）で合計を上げる</li>
<li>認可外保育施設を利用して加点（+3）を得る</li>
<li>育休復帰加点（+3）が使えないか確認する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>時短勤務でも月20日以上かつ1日6時間以上なら18点です。フルタイムとの差は2点だけなので、加点で十分にカバーできます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },

  // ===== 手続き (1) =====
  {
    slug: "hitsuyo-shorui",
    citySlug: "sagamihara",
    title: "相模原市の保育園申込に必要な書類リスト　忘れがちな書類も解説",
    description:
      "相模原市の保育園申込に必要な書類を一覧にまとめました。忘れがちな書類や注意点も解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>必要書類一覧</h2>

<h3>全員が必要な書類</h3>
<ul>
<li>特定教育・保育施設及び特定地域型保育事業利用申込書兼子どものための教育・保育給付支給認定申請書</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類（運転免許証等のコピー）</li>
</ul>

<h3>保育が必要な理由を証明する書類</h3>
<table>
<tr><th>理由</th><th>必要書類</th></tr>
<tr><td>就労</td><td>就労証明書（勤務先に記入してもらう）</td></tr>
<tr><td>疾病</td><td>診断書</td></tr>
<tr><td>障害</td><td>障害者手帳のコピー</td></tr>
<tr><td>介護</td><td>介護・看護状況申告書＋対象者の証明書</td></tr>
<tr><td>出産</td><td>母子健康手帳のコピー</td></tr>
<tr><td>就学</td><td>在学証明書</td></tr>
<tr><td>求職活動</td><td>求職活動に関する申告書</td></tr>
</table>

<h3>忘れがちな書類</h3>
<ul>
<li><strong>就労証明書</strong>：勤務先に依頼してから届くまで2〜3週間かかることも。早めに依頼しましょう</li>
<li><strong>育児短時間勤務の場合</strong>：就労証明書の「雇用契約に基づく就労時間」と「就労実績」の両方が必要です</li>
<li><strong>提出物チェックリスト</strong>：相模原市のサイトからダウンロードできるチェックリストで漏れを確認しましょう</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の必要書類は<a href="https://www.city.sagamihara.kanagawa.jp/kosodate/1026602/kosodate/1026606/hoikuen/1006704.html" target="_blank" rel="noopener">相模原市公式サイト「認可保育所等の利用申込案内」</a>からダウンロードできます。オンライン申請も可能です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },

  // ===== 追加記事 40本 (2026-04-07) =====
  {
    slug: "nursery-visit-guide",
    citySlug: "sagamihara",
    title: "相模原市の保育園見学ガイド　見るべきポイントと質問リスト",
    description:
      "相模原市で保育園見学をする際にチェックすべきポイントと、園に聞いておくべき質問リストをまとめました。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学のタイミング</h2>
<p>相模原市の保育園見学は<strong>7月〜9月</strong>がベストシーズンです。10月の申込開始前に余裕をもって回りましょう。</p>

<h3>見学時にチェックすべきポイント</h3>
<ul>
<li><strong>園庭の広さ</strong>：子どもが十分に遊べるスペースがあるか</li>
<li><strong>保育士の対応</strong>：子どもへの声かけの様子、笑顔があるか</li>
<li><strong>衛生面</strong>：トイレや給食室の清潔さ</li>
<li><strong>送迎のしやすさ</strong>：駐輪場・駐車場の有無、最寄り駅からの距離</li>
<li><strong>給食</strong>：自園調理か外部委託か、アレルギー対応の有無</li>
<li><strong>セキュリティ</strong>：門の施錠、防犯カメラの有無</li>
</ul>

<h3>園に聞いておくべき質問</h3>
<ul>
<li>延長保育の時間と料金</li>
<li>土曜保育の利用条件</li>
<li>慣らし保育の期間</li>
<li>持ち物（おむつ・布団など）の詳細</li>
<li>保護者参加の行事の頻度</li>
<li>病児・病後児保育への対応</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市は東京のベッドタウンなので、通勤ルート上の園を選ぶと送迎が楽です。電車通勤の方は駅近の園もチェックしましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "zero-vs-one-year",
    citySlug: "sagamihara",
    title: "相模原市で0歳入園と1歳入園どちらが有利？枠数と競争率を比較",
    description:
      "相模原市で0歳児クラスと1歳児クラスのどちらに申し込むべきか、定員枠と競争率の観点から比較解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳入園と1歳入園の違い</h2>
<p>相模原市の認可保育所では、0歳児クラスと1歳児クラスで定員構成が異なります。</p>

<h3>0歳児クラスの特徴</h3>
<ul>
<li>定員が少ない（6〜12名程度の園が多い）</li>
<li>申込者も比較的少ない</li>
<li>入園月齢に制限がある園がある（生後57日〜、生後6か月〜など）</li>
<li>育休を早めに切り上げる必要がある</li>
</ul>

<h3>1歳児クラスの特徴</h3>
<ul>
<li>0歳からの持ち上がりがあるため、新規枠が限られる</li>
<li>育休明けの申込が集中しやすい</li>
<li>南区・中央区の人気園では特に競争が激しい</li>
</ul>

<h3>どちらが入りやすい？</h3>
<p>一般的には<strong>0歳入園の方が入りやすい傾向</strong>があります。1歳児クラスは持ち上がりがあるため新規枠が狭くなります。特に南区の相模大野駅周辺や中央区の橋本駅周辺は1歳の競争が激しいです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南区・中央区の人気園を狙う場合は0歳入園が有利です。緑区の郊外エリアなら1歳入園でも比較的入りやすいです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-guide",
    citySlug: "sagamihara",
    title: "相模原市のひとり親家庭の保活ガイド　加点と優先制度を解説",
    description:
      "相模原市でひとり親家庭が保育園に申し込む際の加点（+5点）や優先制度、利用できる支援をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353a9b85714?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親家庭の加点</h2>
<p>相模原市ではひとり親家庭に<strong>調整点+5点</strong>が加算されます。これはきょうだい同一施設希望（+5点）と並ぶ最大級の加点です。</p>

<h3>加点の条件</h3>
<ul>
<li>戸籍上ひとり親であること（離婚・死別・未婚など）</li>
<li>戸籍謄本等の証明書類の提出が必要</li>
</ul>

<h3>ひとり親の点数シミュレーション</h3>
<table>
<tr><th>状況</th><th>合計点</th></tr>
<tr><td>フルタイム＋ひとり親</td><td>25点（20+5）</td></tr>
<tr><td>＋ きょうだい同一施設</td><td>30点</td></tr>
<tr><td>＋ 認可外利用</td><td>28点</td></tr>
</table>

<h2>ひとり親が利用できる支援</h2>
<ul>
<li><strong>保育料の軽減</strong>：市民税非課税世帯は保育料無料</li>
<li><strong>同点時の最優先</strong>：同じ点数の場合、ひとり親世帯が最も優先されます</li>
<li><strong>ファミリー・サポート・センター</strong>：送迎の援助を受けられます</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親家庭向けの支援については<a href="https://www.city.sagamihara.kanagawa.jp/kosodate/1026602/kosodate/1026606/hoikuen/index.html" target="_blank" rel="noopener">相模原市公式サイト「ひとり親家庭への支援」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "ikukyu-timing",
    citySlug: "sagamihara",
    title: "相模原市で育休はいつまで取る？入園タイミングと育休期間の最適解",
    description:
      "相模原市の保育園申込スケジュールに合わせた育休期間の考え方と、4月入園に向けた最適なタイミングを解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休期間と入園タイミングの関係</h2>
<p>相模原市では4月入園が最も枠が多いため、<strong>4月入園に合わせた育休計画</strong>が基本です。</p>

<h3>生まれ月別の育休パターン</h3>
<table>
<tr><th>生まれ月</th><th>育休期間</th><th>入園時の月齢</th></tr>
<tr><td>4〜6月生まれ</td><td>約10〜12か月</td><td>0歳10か月〜1歳0か月</td></tr>
<tr><td>7〜9月生まれ</td><td>約7〜9か月</td><td>0歳7か月〜0歳9か月</td></tr>
<tr><td>10〜12月生まれ</td><td>約4〜6か月</td><td>0歳4か月〜0歳6か月</td></tr>
<tr><td>1〜3月生まれ</td><td>約13〜15か月</td><td>1歳1か月〜1歳3か月</td></tr>
</table>

<h3>育休復帰の加点（+3点）を活用</h3>
<p>相模原市では入園月に復帰する場合に+3点の加点があります。4月入園＋4月復帰で申請しましょう。</p>

<h2>育休延長が必要な場合</h2>
<p>1〜3月生まれの場合、翌年度4月入園だと育休が1年を超えます。育休延長の手続きについては勤務先と早めに相談してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>10〜12月生まれは0歳入園だと月齢が低いため、園によっては受入不可の場合があります。受入月齢を事前に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "ninkagai-selection",
    citySlug: "sagamihara",
    title: "相模原市の認可外保育施設の選び方　認定保育室との違いも解説",
    description:
      "相模原市で認可外保育施設を選ぶ際のチェックポイントと、認定保育室との違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>認可外保育施設の種類</h2>
<p>相模原市の認可外保育施設には、市独自の「認定保育室」と一般の認可外保育施設があります。</p>

<h3>認定保育室と一般の認可外の違い</h3>
<table>
<tr><th>項目</th><th>認定保育室</th><th>一般の認可外</th></tr>
<tr><td>市の認定</td><td>あり</td><td>なし</td></tr>
<tr><td>市の補助</td><td>あり（保育料が安い）</td><td>なし</td></tr>
<tr><td>認可園への加点</td><td>+3点（月64時間以上利用）</td><td>+3点（月64時間以上利用）</td></tr>
</table>

<h3>選び方のチェックポイント</h3>
<ul>
<li><strong>立入検査の結果</strong>：相模原市が実施する立入検査の結果を確認</li>
<li><strong>保育士の配置</strong>：有資格者の割合を確認</li>
<li><strong>保育料</strong>：月額の費用と追加料金の有無</li>
<li><strong>開所時間</strong>：延長保育の対応</li>
<li><strong>安全面</strong>：設備の状態、避難経路の確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認定保育室は市の補助があるため保育料が抑えられています。認可園に入れなかった場合はまず認定保育室を検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "futago-hokatsu",
    citySlug: "sagamihara",
    title: "相模原市で双子の保活　多胎児加点（+3点）と同一園入園のコツ",
    description:
      "相模原市で双子・多胎児の保活を成功させるための加点制度と、同じ園に入るためのポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>多胎児の加点制度</h2>
<p>相模原市では多胎児（双子・三つ子など）の同時申込で<strong>+3点の調整点</strong>が加算されます。</p>

<h3>双子の点数シミュレーション</h3>
<table>
<tr><th>状況</th><th>合計点</th></tr>
<tr><td>フルタイム共働き＋多胎児</td><td>43点</td></tr>
<tr><td>＋ 育休復帰</td><td>46点</td></tr>
</table>

<h2>同一園に入るためのコツ</h2>
<ul>
<li><strong>希望園の定員を確認</strong>：0歳児クラスの定員が少ない園に双子で申し込むと枠を大きく占めるため不利になることも</li>
<li><strong>定員の多い園を選ぶ</strong>：0歳児の定員が多い園なら双子でも入りやすい</li>
<li><strong>希望園を多めに記入</strong>：同一園に入れる確率を上げるため、希望園数を多く記入しましょう</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市では多胎児の同一園入園について配慮がなされています。詳しくは各区のこども家庭相談課に相談しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "hoiku-mama-interview",
    citySlug: "sagamihara",
    title: "相模原市の保活体験談　先輩ママが語る成功のポイント",
    description:
      "相模原市で保活を経験した先輩ママの体験談をもとに、保活成功のポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353a9b85714?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活成功のポイント</h2>
<p>相模原市で実際に保活を経験したママたちの声をもとに、成功のポイントをまとめました。</p>

<h3>ポイント1：早めの情報収集</h3>
<p>妊娠中から情報収集を始めた方が多く、産後は忙しくなるため早めの行動が吉。相模原市の「利用申込みのご案内」は市のWebサイトで事前に確認できます。</p>

<h3>ポイント2：見学は複数園</h3>
<p>実際に見学すると園の雰囲気がわかります。相模原市内でも園によって方針が大きく異なるため、最低3〜5園は見学しましょう。</p>

<h3>ポイント3：希望園は多めに書く</h3>
<p>相模原市では希望園を複数記入できます。第1希望だけでなく、通える範囲の園を幅広く記入することで内定確率が上がります。</p>

<h3>ポイント4：加点の確認</h3>
<p>認可外利用（+3点）や育休復帰（+3点）など、該当する加点を全て申告しているか確認しましょう。相模原市は加点が+3〜5と大きいため、1つの漏れが大きな差になります。</p>

<h3>ポイント5：オンライン申請の活用</h3>
<p>相模原市はオンライン申請（LoGoフォーム）にも対応しています。窓口に行く時間がない方は活用しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市は東京のベッドタウンで共働き世帯が多いため、南区・中央区の駅近は競争が激しいです。エリアを広げて検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "waiting-child-data",
    citySlug: "sagamihara",
    title: "相模原市の待機児童数の推移　最新データと傾向を分析",
    description:
      "相模原市の待機児童数の推移と最新データを分析。エリア別の傾向と今後の見通しを解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>相模原市の待機児童数の推移</h2>
<p>相模原市は待機児童対策に力を入れており、こども・若者未来局が中心となって保育施設の整備を進めています。</p>

<h3>エリア別の傾向</h3>
<ul>
<li><strong>南区</strong>：小田急線沿線で需要が高い。相模大野駅周辺が特に激戦</li>
<li><strong>中央区</strong>：相模原駅・橋本駅周辺で需要が高い。リニア新幹線の橋本駅開業でさらに注目</li>
<li><strong>緑区</strong>：橋本エリアはやや激戦だが、津久井・相模湖方面は余裕あり</li>
</ul>

<h3>今後の見通し</h3>
<p>橋本駅周辺はリニア中央新幹線の駅設置が予定されており、今後人口増加と保育需要の高まりが見込まれます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市全体では待機児童対策が進んでいますが、「希望する園に入れない」隠れ待機児童は存在します。人気エリアでは複数園を検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数は<a href="https://www.city.sagamihara.kanagawa.jp/kosodate/1026602/kosodate/1026606/hoikuen/" target="_blank" rel="noopener">相模原市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "small-nursery-guide",
    citySlug: "sagamihara",
    title: "相模原市の小規模保育事業とは？特徴と3歳の壁への対処法",
    description:
      "相模原市の小規模保育事業（定員19人以下）の特徴と、卒園後の「3歳の壁」への対処法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>小規模保育事業とは</h2>
<p>定員19人以下の小さな保育施設で、0〜2歳児を対象としています。相模原市内にも複数の小規模保育施設があります。</p>

<h3>メリット</h3>
<ul>
<li>少人数なので一人ひとりに目が届きやすい</li>
<li>家庭的な雰囲気で過ごせる</li>
<li>認可園より入りやすいことが多い</li>
</ul>

<h3>デメリット（3歳の壁）</h3>
<ul>
<li>2歳児クラスまでなので、3歳からの転園先を探す必要がある</li>
<li>連携施設が設定されている場合は優先的に転園可能</li>
</ul>

<h2>3歳の壁への対処法</h2>
<ul>
<li><strong>連携施設を確認</strong>：入園前に連携先の保育園や幼稚園を確認しましょう</li>
<li><strong>幼稚園も検討</strong>：3歳からは幼稚園の預かり保育も選択肢に</li>
<li><strong>認定こども園</strong>：0〜5歳まで通える認定こども園への転園も検討</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市では小規模保育施設の卒園児について、連携施設への優先入園が設定されている場合があります。入園前に必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "secondchild-hokatsu",
    citySlug: "sagamihara",
    title: "相模原市の2人目保活　きょうだい加点（+5点）を最大活用する方法",
    description:
      "相模原市で2人目の保育園入園を目指す際のきょうだい加点（+5点）の仕組みと、同一施設入園のための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい加点の仕組み</h2>
<p>相模原市ではきょうだいに関する加点が2種類あります。</p>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいと同一施設を希望</td><td>+5点</td></tr>
<tr><td>きょうだいが在園中（別施設希望）</td><td>+2点</td></tr>
</table>

<h3>同一施設希望の+5点は大きい</h3>
<p>フルタイム共働き40点＋きょうだい同一施設+5点＝<strong>45点</strong>になります。ほとんどの園で安全圏に入る点数です。</p>

<h2>2人目保活の戦略</h2>
<ul>
<li><strong>上の子と同じ園の第1希望</strong>にして+5点を確保</li>
<li><strong>別施設でもOKなら希望園を増やす</strong>（別施設でも+2点あり）</li>
<li><strong>育休復帰（+3点）</strong>も合わせて申告</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい同一施設希望の+5点は相模原市最大級の加点です。上の子と同じ園を狙うのが最も確実な戦略です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "self-employed-score",
    citySlug: "sagamihara",
    title: "相模原市で自営業の保活　就労証明書の書き方と点数のポイント",
    description:
      "相模原市で自営業者が保育園に申し込む際の就労証明書の書き方と、点数の考え方を解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>自営業の基準点数</h2>
<p>相模原市では就労形態に関わらず、就労日数と時間で基準点数が決まります。自営業でもフルタイムなら20点です。</p>
<table>
<tr><th>就労条件</th><th>点数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>20点</td></tr>
<tr><td>月20日以上・1日6時間以上</td><td>18点</td></tr>
<tr><td>月16日以上・1日6時間以上</td><td>16点</td></tr>
<tr><td>月12日以上・1日4時間以上</td><td>12点</td></tr>
</table>

<h3>就労証明書の書き方</h3>
<ul>
<li>自営業の場合は<strong>自分で就労証明書を記入</strong>します</li>
<li>就労時間は実態に即して正確に記載する</li>
<li>開業届の写しや確定申告書の写しの添付が求められる場合があります</li>
</ul>

<h2>自営業の注意点</h2>
<ul>
<li>就労時間の証明が外勤より難しいため、客観的な資料を揃える</li>
<li>確定申告書、取引先との契約書なども用意しておく</li>
<li>虚偽の記載は入園取消しの対象</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市は就労形態による点数の差がないため、自営業でも不利にはなりません。就労時間を正確に証明することが重要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "naishoku-score",
    citySlug: "sagamihara",
    title: "相模原市で在宅ワーク・内職の場合の点数は？保活の注意点",
    description:
      "相模原市で在宅ワークや内職をしている場合の保育園申込の点数と、申請時の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>在宅ワーク・内職の点数</h2>
<p>相模原市では在宅ワークや内職も「就労」として扱われ、就労日数と時間に応じた基準点数が付きます。</p>

<table>
<tr><th>就労条件</th><th>点数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>20点</td></tr>
<tr><td>月20日以上・1日6時間以上</td><td>18点</td></tr>
<tr><td>月16日以上・1日6時間以上</td><td>16点</td></tr>
<tr><td>月64時間以上（上記以外）</td><td>10点</td></tr>
</table>

<h3>在宅ワークの証明方法</h3>
<ul>
<li>雇用されている場合：勤務先に就労証明書を記入してもらう（在宅勤務と明記）</li>
<li>フリーランス・個人事業主の場合：自分で就労証明書を記入＋確定申告書等の写し</li>
<li>クラウドソーシング等の場合：報酬の証明書類も準備</li>
</ul>

<h2>注意点</h2>
<ul>
<li>在宅勤務でも実際に保育が必要な状況であることが求められます</li>
<li>「同居保育可能者あり」の減点（-2点）に該当しないか確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市は就労形態による点数差がないため、在宅ワークでも月20日以上・1日8時間以上なら20点です。外勤と同じ扱いです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "kyushoku-hokatsu",
    citySlug: "sagamihara",
    title: "相模原市の保育園の給食事情　自園調理とアレルギー対応を解説",
    description:
      "相模原市の保育園の給食について、自園調理の割合やアレルギー対応、給食費の目安をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>相模原市の保育園の給食</h2>
<p>相模原市の認可保育園では、基本的に<strong>自園調理の給食</strong>が提供されます。</p>

<h3>給食の特徴</h3>
<ul>
<li>0〜2歳児：完全給食（主食＋副食）</li>
<li>3〜5歳児：基本的に完全給食（園によって主食持参の場合あり）</li>
<li>栄養士が在園している園も多い</li>
<li>食育に力を入れている園も増えている</li>
</ul>

<h3>アレルギー対応</h3>
<ul>
<li>多くの園で除去食・代替食の対応あり</li>
<li>医師の診断書（アレルギー疾患生活管理指導表）の提出が必要</li>
<li>対応範囲は園によって異なるため、見学時に確認を</li>
</ul>

<h3>給食費の目安</h3>
<p>3〜5歳児の給食費は月額5,000〜7,000円程度が目安です（園によって異なります）。0〜2歳児は保育料に含まれます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>食物アレルギーがある場合は、見学時に具体的な対応内容を確認しましょう。園によって対応レベルが異なります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "sagamihara",
    title: "相模原市で転職と保活を両立するには？点数への影響と最適タイミング",
    description:
      "相模原市で保活中に転職する場合の点数への影響と、転職のベストタイミングを解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>転職が点数に与える影響</h2>
<p>保育園申込後に転職した場合、就労証明書の再提出が必要です。転職先の勤務条件によって基準点数が変わる可能性があります。</p>

<h3>転職のタイミング別リスク</h3>
<table>
<tr><th>タイミング</th><th>リスク</th></tr>
<tr><td>申込前に転職完了</td><td>低い（新しい就労証明書で申込）</td></tr>
<tr><td>申込後〜選考前に転職</td><td>中（就労証明書の再提出が必要）</td></tr>
<tr><td>内定後に転職</td><td>高い（条件変更の届出が必要、場合により内定取消し）</td></tr>
</table>

<h2>最適なタイミング</h2>
<ul>
<li><strong>申込前に転職を完了</strong>させるのがベスト</li>
<li>転職先の勤務条件がフルタイムなら基準点数は変わらない</li>
<li>試用期間中でも就労証明書は発行してもらえる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転職で勤務条件が変わると点数も変わります。保活中の転職は、申込前に完了させるのが最も安全です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "age2-nyuen",
    citySlug: "sagamihara",
    title: "相模原市で2歳児クラスに入園するには？途中入園の可能性と対策",
    description:
      "相模原市で2歳児クラスへの入園を目指す場合のポイント。年度途中入園の空き状況と申込方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2歳児クラスの入園事情</h2>
<p>2歳児クラスは0〜1歳からの持ち上がりがあるため、4月入園の新規枠は限られます。特に南区・中央区の人気園では競争が激しくなります。</p>

<h3>4月入園と途中入園</h3>
<table>
<tr><th>入園時期</th><th>特徴</th></tr>
<tr><td>4月入園</td><td>新規枠が最も多い。申込は前年10〜11月</td></tr>
<tr><td>途中入園（5月〜3月）</td><td>退園や転園で空きが出た場合に入園可能。毎月受付</td></tr>
</table>

<h3>途中入園の申込方法</h3>
<ul>
<li>毎月の締切日までに申込書類を各区のこども家庭相談課に提出</li>
<li>空きがある園に限り利用調整が行われる</li>
<li>希望園に空きがなくても申込を出しておくと、空きが出た際に調整対象になる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2歳児で途中入園を目指す場合は、早めに申込を出しておくことが大切です。空き状況は各区のこども家庭相談課に問い合わせれば教えてもらえます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "age3-ikou",
    citySlug: "sagamihara",
    title: "相模原市で3歳から保育園・幼稚園に移行するには？選択肢と手続き",
    description:
      "相模原市で3歳児クラスからの入園や小規模保育からの転園について、選択肢と手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>3歳からの選択肢</h2>
<p>3歳児クラスから入園・転園する場合、以下の選択肢があります。</p>

<h3>保育施設の種類</h3>
<table>
<tr><th>施設</th><th>特徴</th></tr>
<tr><td>認可保育所</td><td>就労等の保育の必要性あり。11時間保育</td></tr>
<tr><td>認定こども園</td><td>保育部分と教育部分あり。幼稚園的な活動も</td></tr>
<tr><td>幼稚園（預かり保育あり）</td><td>教育時間＋預かり保育で就労中も利用可能</td></tr>
</table>

<h3>小規模保育からの転園</h3>
<p>小規模保育事業は2歳児クラスまでのため、3歳からは転園が必要です。</p>
<ul>
<li>連携施設が設定されている場合は優先的に転園可能</li>
<li>連携施設がない場合は通常の申込と同じ選考</li>
<li>4月入園の申込スケジュールに合わせて手続き</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳児クラスは幼稚園からの受入もあるため、認可保育所の3歳児枠は意外と多い場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "sagamihara",
    title: "相模原市の0歳児保育　受入月齢と園選びのポイント",
    description:
      "相模原市で0歳児を保育園に預ける場合の受入月齢の違いや、0歳児保育を選ぶ際の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>0歳児の受入月齢</h2>
<p>相模原市の保育園では、園によって0歳児の受入開始月齢が異なります。</p>

<h3>受入月齢の目安</h3>
<table>
<tr><th>受入月齢</th><th>特徴</th></tr>
<tr><td>生後57日〜</td><td>産休明けから預けられる。対応園は限られる</td></tr>
<tr><td>生後3か月〜</td><td>首がすわる頃から。比較的多くの園で対応</td></tr>
<tr><td>生後6か月〜</td><td>離乳食が始まる頃から。最も多いパターン</td></tr>
</table>

<h3>0歳児保育のチェックポイント</h3>
<ul>
<li><strong>保育士の配置</strong>：0歳児は子ども3人に保育士1人が国の基準</li>
<li><strong>SIDS対策</strong>：午睡時のチェック体制を確認</li>
<li><strong>授乳・離乳食</strong>：冷凍母乳の対応、離乳食の進め方</li>
<li><strong>室内環境</strong>：ハイハイできるスペース、安全対策</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>受入月齢は園によって異なります。4月入園時点の月齢を計算して、受入可能な園をリストアップしましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "nintei-kodomoen",
    citySlug: "sagamihara",
    title: "相模原市の認定こども園とは？保育園との違いと選び方",
    description:
      "相模原市の認定こども園の特徴と、保育園との違い、どちらを選ぶべきかの判断基準を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>認定こども園とは</h2>
<p>認定こども園は、保育園と幼稚園の機能を併せ持つ施設です。相模原市内にも複数の認定こども園があります。</p>

<h3>保育園との違い</h3>
<table>
<tr><th>項目</th><th>保育園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>利用条件</td><td>保育の必要性あり</td><td>保育部分は必要性あり、教育部分は誰でも</td></tr>
<tr><td>教育活動</td><td>園による</td><td>幼稚園教育要領に基づく教育あり</td></tr>
<tr><td>保育時間</td><td>11時間（標準）</td><td>保育部分は11時間、教育部分は4時間</td></tr>
</table>

<h3>認定こども園を選ぶメリット</h3>
<ul>
<li>保育と教育の両方を受けられる</li>
<li>就労状況が変わっても退園しなくてよい</li>
<li>園行事が充実している傾向がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認定こども園の保育部分（2号・3号認定）は、認可保育所と同じ選考基準で利用調整されます。点数の計算方法も同じです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "sagamihara",
    title: "相模原市の企業主導型保育事業とは？メリットと利用方法",
    description:
      "相模原市にある企業主導型保育事業の特徴、メリット・デメリット、利用方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>企業主導型保育事業とは</h2>
<p>企業が従業員のために設置する保育施設で、地域枠として従業員以外も利用できます。認可外保育施設の一種ですが、国の助成を受けています。</p>

<h3>メリット</h3>
<ul>
<li>認可園の利用調整を経ずに直接契約で入園可能</li>
<li>認可園並みの保育料設定が多い</li>
<li>企業の従業員は優先的に利用可能</li>
<li>認可園に落ちた場合の受け皿になる</li>
</ul>

<h3>デメリット</h3>
<ul>
<li>認可園の利用調整の加点対象にならない場合がある</li>
<li>園によって保育の質にばらつきがある</li>
<li>経営状態によっては突然閉園のリスクも</li>
</ul>

<h2>相模原市での利用方法</h2>
<ul>
<li>直接施設に問い合わせて空き状況を確認</li>
<li>従業員枠と地域枠があり、地域枠は定員の一部</li>
<li>市の利用調整とは別の手続きになる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>企業主導型保育事業の一覧は<a href="https://www.kigyounaihoiku.jp/" target="_blank" rel="noopener">企業主導型保育事業ポータル</a>で検索できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "yakan-hoiku",
    citySlug: "sagamihara",
    title: "相模原市の夜間保育・延長保育　対応園と利用条件",
    description:
      "相模原市で夜間保育や延長保育を利用したい場合の対応園と利用条件、料金の目安を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>延長保育</h2>
<p>相模原市の認可保育園では、通常の保育時間（標準時間11時間、短時間8時間）を超えて預ける延長保育を実施している園があります。</p>

<h3>延長保育の概要</h3>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>対象</td><td>就労等で通常時間内にお迎えが間に合わない保護者</td></tr>
<tr><td>時間</td><td>園によって異なるが、最大19:00〜20:00頃まで</td></tr>
<tr><td>料金</td><td>月額または日額（園によって異なる）</td></tr>
</table>

<h3>夜間保育</h3>
<p>夜間保育（夜10時頃まで）を実施している園は相模原市では限られています。夜勤がある方は、各区のこども家庭相談課に相談して対応園を確認しましょう。</p>

<h2>シフト勤務の方の対策</h2>
<ul>
<li>延長保育のある園を優先的に選ぶ</li>
<li>ファミリー・サポート・センターの利用を検討</li>
<li>祖父母など親族のサポート体制を確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>延長保育の実施状況は園によって異なります。見学時に具体的な時間と料金を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "mushoka-seido",
    citySlug: "sagamihara",
    title: "相模原市の幼児教育・保育無償化　対象と手続きを解説",
    description:
      "相模原市での幼児教育・保育無償化の対象施設・対象年齢・手続き方法をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "green",
    content: `<h2>無償化の対象</h2>
<p>2019年10月から始まった幼児教育・保育の無償化は、相模原市でも適用されています。</p>

<h3>対象と無償化の範囲</h3>
<table>
<tr><th>対象</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児（全世帯）</td><td>認可保育園・認定こども園の保育料が無料</td></tr>
<tr><td>0〜2歳児（非課税世帯）</td><td>認可保育園・認定こども園の保育料が無料</td></tr>
<tr><td>認可外保育施設</td><td>3〜5歳：月額37,000円まで。0〜2歳（非課税世帯）：月額42,000円まで</td></tr>
</table>

<h3>無償化の対象外</h3>
<ul>
<li>給食費（3〜5歳児の副食費等）</li>
<li>延長保育料</li>
<li>教材費、行事費等の実費</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児の保育料は無料ですが、給食費（月額5,000〜7,000円程度）は別途かかります。年収360万円未満世帯等は給食費も免除される場合があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.sagamihara.kanagawa.jp/kosodate/1026602/kosodate/1026606/hoikuen/1006704.html" target="_blank" rel="noopener">相模原市公式サイト「幼児教育・保育の無償化」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "sagamihara",
    title: "相模原市の保育園でかかる実費　給食費・教材費・行事費の目安",
    description:
      "相模原市の保育園で保育料以外にかかる実費（給食費、教材費、行事費など）の目安をまとめました。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "green",
    content: `<h2>保育料以外にかかる費用</h2>
<p>保育料無償化後も、保育園では各種実費がかかります。</p>

<h3>主な実費の目安</h3>
<table>
<tr><th>費目</th><th>目安金額</th></tr>
<tr><td>給食費（3〜5歳児）</td><td>月額5,000〜7,000円</td></tr>
<tr><td>延長保育料</td><td>月額2,000〜5,000円</td></tr>
<tr><td>教材費</td><td>年額数千円〜1万円程度</td></tr>
<tr><td>行事費・遠足代</td><td>その都度数百円〜数千円</td></tr>
<tr><td>布団リース代</td><td>月額数百円〜（園による）</td></tr>
<tr><td>制服・体操服</td><td>園による（ない園も多い）</td></tr>
</table>

<h3>0〜2歳児の場合</h3>
<p>0〜2歳児は給食費が保育料に含まれているため、別途の給食費はかかりません。ただし保育料は世帯の所得に応じて決まります（非課税世帯は無料）。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>実費は園によってかなり差があります。見学時に具体的な金額を確認しておくと、家計の計画が立てやすくなります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "sagamihara",
    title: "相模原市の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "相模原市の認可保育園の保育料を年収・子ども数別に詳しく解説。市民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>相模原市の認可保育園の保育料は、<strong>世帯の市民税所得割額</strong>に基づいて決定されます。</p>

<h3>保育料の仕組み</h3>
<ul>
<li>3〜5歳児：<strong>無料</strong>（幼児教育・保育無償化）</li>
<li>0〜2歳児：世帯の所得に応じた保育料（非課税世帯は無料）</li>
</ul>

<h3>0〜2歳児の保育料の目安</h3>
<p>保育料は市民税所得割額によって階層が決まります。相模原市の保育料は国の基準額より低く設定されています。</p>

<h3>多子世帯の軽減</h3>
<ul>
<li>第2子：保育料が半額</li>
<li>第3子以降：保育料が無料</li>
<li>年収360万円未満世帯はきょうだいの年齢制限なし</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は前年度の所得で決まるため、育休中に所得が下がった翌年度は保育料が安くなることがあります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は各区のこども家庭相談課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "sagamihara",
    title: "保育料と税金控除の関係　相模原市で活用できる節税ポイント",
    description:
      "保育料に影響する税金の仕組みと、相模原市で活用できる税控除・節税のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "green",
    content: `<h2>保育料と税金の関係</h2>
<p>0〜2歳児の保育料は<strong>市民税所得割額</strong>で決まります。所得控除を適切に活用することで、保育料の軽減につながる場合があります。</p>

<h3>保育料に影響する主な控除</h3>
<ul>
<li><strong>医療費控除</strong>：年間の医療費が一定額を超えた場合</li>
<li><strong>iDeCo（個人型確定拠出年金）</strong>：掛金が全額所得控除</li>
<li><strong>ふるさと納税</strong>：住民税の税額控除のため、保育料の算定には影響しない点に注意</li>
<li><strong>生命保険料控除</strong>：上限あり</li>
</ul>

<h3>注意点</h3>
<ul>
<li>ふるさと納税は住民税の「税額控除」であり、「所得割額」自体を下げるわけではないため、保育料には基本的に影響しません</li>
<li>iDeCoは「所得控除」なので、所得割額を直接下げる効果があります</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児は保育料無料のため、この節税効果は0〜2歳児の保育料にのみ影響します。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "sagamihara",
    title: "相模原市の就労証明書 記入例【令和8年度版】書き方と注意点まとめ",
    description:
      "相模原市の保育園申込みに必要な就労証明書の記入例を徹底解説。月間就労時間・日数の正しい書き方、よくある記入ミスTop5と対策チェックリスト、様式ダウンロード先まで網羅。令和8年度申込対応。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>就労証明書とは</h2>
<p>保育園の申込にあたり、保護者の就労状況を証明する書類です。勤務先（または自分）が記入します。</p>

<h3>記入のポイント</h3>
<ul>
<li><strong>就労日数・時間</strong>：実態に即した数値を記入。これが基準点数に直結します</li>
<li><strong>雇用形態</strong>：正社員、パート、契約社員などを正確に</li>
<li><strong>勤務先の押印</strong>：代表者印または人事担当印が必要</li>
<li><strong>記入日</strong>：申込日に近い日付が望ましい</li>
</ul>

<h3>相模原市の特徴</h3>
<p>相模原市では月の就労日数と1日の就労時間で基準点数が決まります。就労証明書に記載された時間がそのまま点数に反映されるため、正確な記入が重要です。</p>

<h2>よくある間違い</h2>
<ul>
<li>就労時間の記載が実態と異なる（残業込みの時間を記載してしまう等）</li>
<li>勤務先の住所・電話番号の記載漏れ</li>
<li>育休中の場合に復帰後の勤務条件を記載していない</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先に依頼してから届くまで2〜3週間かかることがあります。早めに依頼しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "shinsei-shorui-list",
    citySlug: "sagamihara",
    title: "相模原市の保育園申請書類チェックリスト　ダウンロード先と準備の流れ",
    description:
      "相模原市の保育園申込に必要な全書類のチェックリストと、各書類のダウンロード先・準備スケジュールをまとめました。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>申請書類チェックリスト</h2>

<h3>必須書類</h3>
<ul>
<li>特定教育・保育施設及び特定地域型保育事業利用申込書兼支給認定申請書</li>
<li>保育が必要な理由を証明する書類（就労証明書等）</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類</li>
</ul>

<h3>該当者のみ必要な書類</h3>
<ul>
<li>ひとり親の場合：戸籍謄本等</li>
<li>障害のある場合：障害者手帳のコピー</li>
<li>介護をしている場合：介護・看護状況申告書</li>
<li>転入予定の場合：転入に関する誓約書</li>
<li>単身赴任の場合：単身赴任の証明書類</li>
</ul>

<h3>準備スケジュール</h3>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>8〜9月</td><td>勤務先に就労証明書を依頼</td></tr>
<tr><td>9〜10月</td><td>利用申込みのご案内を確認、書類をダウンロード</td></tr>
<tr><td>10月</td><td>書類の記入・確認</td></tr>
<tr><td>10〜11月</td><td>各区のこども家庭相談課に提出（またはオンライン申請）</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>書類は<a href="https://www.city.sagamihara.kanagawa.jp/kosodate/1026602/kosodate/1026606/hoikuen/1006704.html" target="_blank" rel="noopener">相模原市公式サイト「認可保育所等の利用申込案内」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "sagamihara",
    title: "相模原市の2次利用調整とは？申込の流れと内定のコツ",
    description:
      "相模原市の保育園2次利用調整の仕組み、申込の流れ、内定のための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>2次利用調整とは</h2>
<p>1次利用調整で定員に達しなかった園や、辞退により空きが出た園について行われる追加の利用調整です。</p>

<h3>2次利用調整のスケジュール</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>空き状況の公表</td><td>令和8年2月上旬</td></tr>
<tr><td>申込受付</td><td>令和8年2月上旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<h3>2次利用調整の特徴</h3>
<ul>
<li>1次で不承諾だった方も改めて申込可能</li>
<li>空きのある園のみが対象</li>
<li>人気園はほとんど空きがないことが多い</li>
<li>駅から離れた園や小規模保育は空きがある場合も</li>
</ul>

<h2>内定のコツ</h2>
<ul>
<li>空き状況を確認して、空きのある園を希望に追加する</li>
<li>エリアを広げて検討する</li>
<li>小規模保育事業も選択肢に入れる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次で不承諾の場合、自動的に2次の対象にはなりません。改めて申込手続きが必要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "sagamihara",
    title: "相模原市への転入・引っ越しに伴う保活ガイド",
    description:
      "相模原市に転入する際の保育園申込の手続きと注意点。広域利用や転入前申込の方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>転入時の保育園申込</h2>
<p>相模原市に転入（引っ越し）する場合でも、認可保育園に申し込むことができます。</p>

<h3>転入前の申込</h3>
<ul>
<li>相模原市に転入予定であることを証明する書類が必要</li>
<li>転入先の区のこども家庭相談課に相談</li>
<li>入園月の前月末までに相模原市に住民登録が必要</li>
</ul>

<h3>広域利用（他市区町村からの申込）</h3>
<p>現住所が相模原市外でも、勤務先が相模原市内にある場合などは広域利用の申込が可能な場合があります。現住所の自治体を通じて申込みます。</p>

<h2>転入時の注意点</h2>
<ul>
<li>課税証明書が必要になる場合がある（転入前の自治体で取得）</li>
<li>転入前の自治体での保育園利用歴は引き継がれない</li>
<li>東京都や近隣市からの転入が多いため、人気エリアは競争あり</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転入が決まったら、早めに転入先の区のこども家庭相談課に相談しましょう。オンラインでの相談にも対応しています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "sagamihara",
    title: "相模原市の保育園・幼稚園・認定こども園の違いを徹底比較",
    description:
      "相模原市にある保育園・幼稚園・認定こども園の違いを、対象年齢・利用条件・費用・教育内容の観点から比較します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>3つの施設の比較</h2>
<table>
<tr><th>項目</th><th>保育園</th><th>幼稚園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>3〜5歳</td><td>0〜5歳</td></tr>
<tr><td>利用条件</td><td>保育の必要性あり</td><td>なし</td><td>保育部分は必要性あり</td></tr>
<tr><td>保育時間</td><td>11時間（標準）</td><td>4時間＋預かり保育</td><td>保育11時間/教育4時間</td></tr>
<tr><td>保育料（3〜5歳）</td><td>無料</td><td>無料（月25,700円まで）</td><td>無料</td></tr>
<tr><td>給食</td><td>あり</td><td>園による</td><td>あり</td></tr>
<tr><td>申込先</td><td>区のこども家庭相談課</td><td>各園に直接</td><td>区のこども家庭相談課（保育部分）</td></tr>
</table>

<h3>どれを選ぶべき？</h3>
<ul>
<li><strong>フルタイム共働き</strong>：保育園または認定こども園の保育部分</li>
<li><strong>パートタイム</strong>：幼稚園の預かり保育も選択肢に</li>
<li><strong>教育重視</strong>：認定こども園や教育カリキュラムのある保育園</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市では認定こども園が増えており、保育と教育の両方を受けられる選択肢が広がっています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "sagamihara",
    title: "相模原市の保活カレンダー　月別やることリスト",
    description:
      "相模原市の保活を月別のカレンダー形式でまとめました。いつ何をすべきかが一目でわかります。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活カレンダー（4月入園の場合）</h2>

<h3>4月〜6月：情報収集期</h3>
<ul>
<li>相模原市の保育施設の種類を理解する</li>
<li>住んでいる区の保育園リストを確認</li>
<li>前年度の「利用申込みのご案内」で制度を把握</li>
<li>自分の点数を概算してみる</li>
</ul>

<h3>7月〜9月：見学期</h3>
<ul>
<li>気になる園に電話して見学予約</li>
<li>最低3〜5園は見学する</li>
<li>通勤ルート上の園も含めて検討</li>
<li>勤務先に就労証明書を依頼（9月中に）</li>
</ul>

<h3>9月〜10月：準備期</h3>
<ul>
<li>「利用申込みのご案内」を確認（市のWebサイトで公開）</li>
<li>最新の基準点数表を確認して点数を計算</li>
<li>申込書類の記入</li>
</ul>

<h3>10月〜11月：申込期</h3>
<ul>
<li>書類を揃えて各区のこども家庭相談課に提出</li>
<li>オンライン申請（LoGoフォーム）も利用可能</li>
</ul>

<h3>1月〜2月：結果発表</h3>
<ul>
<li>1次の結果通知</li>
<li>不承諾の場合は2次利用調整を検討</li>
</ul>

<h3>3月：入園準備</h3>
<ul>
<li>入園説明会に参加</li>
<li>持ち物の準備</li>
<li>慣らし保育のスケジュール確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書の依頼は早めが鉄則です。勤務先によっては発行に時間がかかります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "souba-tensuu",
    citySlug: "sagamihara",
    title: "相模原市の保育園入園に必要な点数の相場　エリア別の目安",
    description:
      "相模原市の保育園に入るために必要な点数の相場をエリア別にまとめました。自分の点数で入れるかの目安に。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>エリア別の必要点数の目安</h2>
<p>相模原市の保育園入園に必要な点数は、エリアと園の人気度によって大きく異なります。以下は一般的な目安です。</p>

<h3>区別の目安</h3>
<table>
<tr><th>区・エリア</th><th>0歳児</th><th>1歳児</th><th>3歳児</th></tr>
<tr><td>南区（相模大野駅周辺）</td><td>40〜43点</td><td>43〜48点</td><td>40〜43点</td></tr>
<tr><td>中央区（相模原・橋本駅周辺）</td><td>40〜43点</td><td>40〜45点</td><td>38〜40点</td></tr>
<tr><td>緑区（橋本エリア）</td><td>40点前後</td><td>40〜43点</td><td>38〜40点</td></tr>
<tr><td>緑区（津久井・相模湖方面）</td><td>入りやすい</td><td>入りやすい</td><td>入りやすい</td></tr>
</table>

<p>※あくまで目安です。年度や園によって変動します。</p>

<h2>点数が足りない場合の対策</h2>
<ul>
<li>希望エリアを広げる（駅から離れた園も検討）</li>
<li>小規模保育事業も検討する</li>
<li>調整点の加点を全て申告しているか再確認</li>
<li>認可外保育施設（認定保育室）を利用して加点（+3点）を得る</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南区・中央区の駅近は激戦ですが、駅から少し離れるだけで入りやすくなります。通勤ルートを考慮して検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "sagamihara",
    title: "相模原市3区の保育園の倍率と空き状況　区ごとの傾向を分析",
    description:
      "相模原市の3区（緑区・中央区・南区）それぞれの保育園の倍率傾向と空き状況を分析します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>3区の保育園事情</h2>
<p>相模原市は緑区・中央区・南区の3区で構成されています。区やエリアによって保育園の競争状況は大きく異なります。</p>

<h3>各区の詳細</h3>

<h4>南区</h4>
<ul>
<li>小田急線沿線（相模大野・小田急相模原）が激戦</li>
<li>マンション開発で子育て世帯が多い</li>
<li>駅から離れた園は比較的入りやすい</li>
</ul>

<h4>中央区</h4>
<ul>
<li>JR相模原駅・京王橋本駅周辺が人気</li>
<li>橋本駅はリニア新幹線の開業予定で今後さらに競争激化の可能性</li>
<li>上溝・田名エリアは比較的余裕あり</li>
</ul>

<h4>緑区</h4>
<ul>
<li>橋本エリアはやや激戦（中央区と隣接）</li>
<li>津久井・城山・相模湖・藤野方面は比較的余裕あり</li>
<li>自然が豊かで特色ある園も多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>駅近にこだわらなければ、相模原市は比較的保育園に入りやすい自治体です。車通勤の方は通園圏を広く検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "sagamihara",
    title: "相模原市で育休延長するリスクと対策　不承諾通知の扱い",
    description:
      "相模原市で育休延長を検討する際のリスクと注意点。不承諾通知の取得方法と育休延長の手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休延長の仕組み</h2>
<p>育児休業は原則1歳まで（最長2歳まで）取得可能です。延長には「保育園に入れなかったこと」を証明する不承諾通知が必要です。</p>

<h3>育休延長の条件</h3>
<ul>
<li>保育園に申し込んだが入園できなかったこと</li>
<li>不承諾通知（保留通知）を勤務先に提出すること</li>
<li>1歳時点で延長→最長1歳6か月、1歳6か月時点で再延長→最長2歳</li>
</ul>

<h3>不承諾通知の取得方法</h3>
<p>相模原市では、保育園の申込をして不承諾（保留）となった場合に通知が届きます。この通知を勤務先に提出して育休延長の手続きを行います。</p>

<h2>注意すべきリスク</h2>
<ul>
<li><strong>意図的な不承諾狙い</strong>：入園意思がないのに申し込むことは推奨されません</li>
<li><strong>2歳までに入園できないリスク</strong>：育休は最長2歳まで。それまでに入園先を確保する必要があります</li>
<li><strong>1歳・2歳クラスの枠の少なさ</strong>：南区・中央区の人気園は特に枠が少ない</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休延長を考えている場合でも、入園申込は必要です。不承諾通知がなければ育休延長の手続きができません。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "sagamihara",
    title: "相模原市で保育園入園後の復職準備　慣らし保育から復帰までの流れ",
    description:
      "相模原市で保育園に入園が決まった後の、慣らし保育の期間や復職までの準備の流れを解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>入園から復職までの流れ</h2>

<h3>3月：入園準備</h3>
<ul>
<li>入園説明会に参加</li>
<li>持ち物の準備（名前つけ等）</li>
<li>勤務先に復職日を連絡</li>
</ul>

<h3>4月前半：慣らし保育</h3>
<p>多くの園で1〜2週間の慣らし保育があります。</p>
<table>
<tr><th>日程</th><th>保育時間の目安</th></tr>
<tr><td>1〜2日目</td><td>1〜2時間</td></tr>
<tr><td>3〜4日目</td><td>午前中（給食まで）</td></tr>
<tr><td>5日目〜1週間</td><td>午後3時頃まで</td></tr>
<tr><td>2週目〜</td><td>通常保育</td></tr>
</table>

<h3>4月中旬〜：復職</h3>
<ul>
<li>慣らし保育が終わったら復職</li>
<li>相模原市では入園月中の復帰が育休復帰加点の条件</li>
</ul>

<h2>復職前にやっておくこと</h2>
<ul>
<li>病児保育の登録（事前登録が必要な施設が多い）</li>
<li>ファミリー・サポートの登録</li>
<li>緊急時のお迎え体制の確認</li>
<li>通勤・送迎ルートの確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育の期間は園や子どもの様子によって異なります。復職日は余裕を持って設定しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "sagamihara",
    title: "相模原市で3人目の保活　多子世帯の加点と保育料軽減",
    description:
      "相模原市で3人目の子どもの保育園入園を目指す際の加点制度と、保育料の軽減制度を解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>3人目の加点</h2>
<p>相模原市では、きょうだいに関する加点が利用できます。</p>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいと同一施設を希望</td><td>+5点</td></tr>
<tr><td>きょうだいが在園中（別施設希望）</td><td>+2点</td></tr>
<tr><td>多胎児同時申込</td><td>+3点</td></tr>
</table>

<h3>上の子2人が在園中の場合</h3>
<p>上の子2人が同じ園に在園中であれば、きょうだい同一施設希望で+5点の加点が得られます。同点時の優先順位でも子どもの数が多い世帯が優先されます。</p>

<h2>保育料の軽減</h2>
<ul>
<li><strong>第3子以降は保育料無料</strong>（0〜2歳児の場合）</li>
<li>3〜5歳児は全世帯で保育料無料（無償化）</li>
<li>給食費の免除対象になる場合もあり</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3人目の保活は加点と保育料軽減の両方で有利になります。上の子と同じ園を希望すれば+5点で、かなり安全圏です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tanshin-funin",
    citySlug: "sagamihara",
    title: "相模原市で単身赴任の場合の保活　加点と必要書類",
    description:
      "相模原市で配偶者が単身赴任中の場合の保育園申込の加点（+2点）と必要書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>単身赴任の加点</h2>
<p>相模原市では配偶者が単身赴任中の場合、調整点で<strong>+2点</strong>の加点があります。</p>

<h3>必要書類</h3>
<ul>
<li>配偶者の住民票（赴任先の住所が記載されたもの）</li>
<li>勤務先の辞令や赴任命令書のコピー</li>
<li>就労証明書（赴任先での勤務条件が記載）</li>
</ul>

<h2>単身赴任世帯のポイント</h2>
<ul>
<li>フルタイム共働き40点＋単身赴任+2点＝42点</li>
<li>同点時の優先順位でもひとり親・単身赴任世帯が最優先</li>
<li>赴任中でも就労証明書の提出は必要</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任の+2点は小さく見えますが、同点時の優先順位で最優先になるため、大きなアドバンテージです。必ず申告しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "sagamihara",
    title: "相模原市で祖父母と同居の場合の保育園申込　減点と対策",
    description:
      "相模原市で祖父母と同居している場合の保育園申込への影響（-2点の減点）と対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353a9b85714?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同居保育可能者の減点</h2>
<p>相模原市では、<strong>同居の親族がいて保育が可能と判断された場合</strong>、調整点が<strong>-2点</strong>となります。</p>

<h3>減点の条件</h3>
<ul>
<li>同居の親族が保育を行うことが可能と判断された場合</li>
<li>就労・疾病・介護等で保育ができない場合は減点されない</li>
</ul>

<h2>減点を回避する方法</h2>
<ul>
<li><strong>祖父母が就労中</strong>：就労証明書を提出して「保育できない」ことを証明</li>
<li><strong>祖父母が疾病・障害</strong>：診断書や障害者手帳を提出</li>
<li><strong>祖父母が介護中</strong>：介護・看護状況申告書を提出</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同居の祖父母がいても、就労中など保育ができない事情があれば減点されません。証明書類を必ず提出しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "sagamihara",
    title: "相模原市で保育園に落ちたら？不承諾後にやるべき5つのこと",
    description:
      "相模原市で保育園の不承諾通知が届いた場合に取るべき行動を、優先度順に5つ解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>不承諾後にやるべき5つのこと</h2>

<h3>1. 2次利用調整に申し込む</h3>
<p>1次で不承諾の場合、2月の2次利用調整に申し込みましょう。空きのある園が公表されるので、希望園を見直して申込みます。</p>

<h3>2. 認定保育室・認可外保育施設を探す</h3>
<p>認可園に入れない場合の受け皿として、認定保育室や認可外保育施設を検討しましょう。利用で翌年度の加点（+3点）にもなります。</p>

<h3>3. 育休延長の手続き</h3>
<p>不承諾通知を勤務先に提出して育休延長の手続きを行います。最長2歳まで延長可能です。</p>

<h3>4. 途中入園の申込をしておく</h3>
<p>年度途中で空きが出た場合に入園できるよう、毎月の利用調整の対象になるよう申込を継続しましょう。</p>

<h3>5. 翌年度に向けた準備</h3>
<p>翌年度の4月入園に向けて、認可外利用の加点を活用した申込戦略を立てましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾は落ち込みますが、相模原市は2次利用調整や途中入園でも入れる可能性があります。認定保育室という選択肢もあるので、諦めずに行動しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "sagamihara",
    title: "相模原市の待機児童対策　市の取り組みと保護者ができること",
    description:
      "相模原市が行っている待機児童対策の取り組みと、保護者として入園確率を上げるためにできることを解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>相模原市の取り組み</h2>
<p>相模原市はこども・若者未来局を中心に、保育施設の整備と受入児童数の拡大に取り組んでいます。</p>

<h3>主な取り組み</h3>
<ul>
<li>認可保育所の定員拡大</li>
<li>小規模保育事業の整備</li>
<li>認定保育室制度の運営</li>
<li>保育士の確保・処遇改善</li>
<li>オンライン申請の導入（LoGoフォーム）</li>
</ul>

<h2>保護者ができること</h2>
<ul>
<li><strong>早めの情報収集と行動</strong>：スケジュールに余裕を持って準備</li>
<li><strong>希望園を多めに書く</strong>：通える範囲の園を幅広く記入</li>
<li><strong>加点を全て申告</strong>：使える加点は漏れなく。相模原市は加点が大きいので1つでも大きな差</li>
<li><strong>認定保育室の活用</strong>：認可園に入れない場合は認定保育室を利用し、翌年度に+3点で再申込</li>
<li><strong>エリアを広げて検討</strong>：駅から少し離れた園も検討</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>相模原市は東京のベッドタウンで共働き世帯が多いですが、正しい情報を集めて計画的に動けば入園の可能性は高いです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "sagamihara",
    title: "相模原市の保育園の途中入園（年度途中申込）の方法と空き状況の確認方法",
    description:
      "相模原市で年度途中に保育園に入園する方法、空き状況の確認方法、申込の流れを解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>途中入園とは</h2>
<p>4月以外の月に保育園に入園することを途中入園（年度途中入園）といいます。退園や転園で空きが出た場合に利用調整が行われます。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>ステップ</th><th>内容</th></tr>
<tr><td>1. 空き状況の確認</td><td>各区のこども家庭相談課に問い合わせ</td></tr>
<tr><td>2. 申込書類の提出</td><td>毎月の締切日までに提出</td></tr>
<tr><td>3. 利用調整</td><td>空きのある園について選考</td></tr>
<tr><td>4. 結果通知</td><td>入園月の前月末頃</td></tr>
</table>

<h3>途中入園のポイント</h3>
<ul>
<li>空きがある園に限り利用調整が行われる</li>
<li>4月に比べて空きは少ないが、転勤シーズン（9〜10月）は空きが出やすい</li>
<li>一度申込を出すと、空きが出た際に自動的に調整対象になる</li>
<li>オンライン申請も利用可能</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>途中入園は空き次第なので、早めに申込を出しておくことが大切です。複数の園を希望に入れておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
];

registerArticles(articles);
