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
];

registerArticles(articles);
