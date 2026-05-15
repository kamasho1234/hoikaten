import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "sakai",
    title: "堺市の保活スケジュール　令和8年度4月入園の流れを解説",
    description:
      "堺市の認可保育園の申込時期・選考の流れ・内定通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>堺市の4月入園は、<strong>1次利用調整</strong>と<strong>2次利用調整</strong>の2段階で行われます。早めにスケジュールを把握して準備を始めましょう。</p>

<h3>1次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年10月上旬〜11月上旬</td></tr>
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
<p>1次で利用保留（不承諾）となった方は、2次利用調整の対象として継続されます。希望園の変更がある場合は2次の受付期間に届け出ましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>堺市の保育施設の種類やエリアごとの特徴を調べましょう。</p>
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
<p>堺市が公表する「利用のご案内」を確認し、申込に必要な書類を揃えましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>就労証明書などの書類を揃えて、お住まいの区の子育て支援課に提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>年度途中の各月1日付利用開始を希望する場合、<span class="highlight">前月の10日頃</span>が申込締切日です。詳しい日程は堺市のホームページで確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/r7hoikumousikomi.html" target="_blank" rel="noopener">堺市公式サイト「保育施設などへの利用申込み」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },

  // ===== 点数・選考 (3) =====
  {
    slug: "scoring-system",
    citySlug: "sakai",
    title: "堺市の保育園の点数はどう決まる？基準項目と加点項目をやさしく解説",
    description:
      "堺市の保育園入園の「利用調整基準」について、基準項目と加点項目の仕組みをわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>堺市の点数の仕組み</h2>
<p>堺市の保育園入園の選考は<strong>「基準項目の点数＋加点項目の点数＝世帯の合計点数」</strong>で行われます。</p>

<h3>基準項目とは？</h3>
<p>保護者それぞれの「保育が必要な理由」に応じた点数です。</p>
<table>
<tr><th>保育が必要な理由</th><th>点数の範囲</th></tr>
<tr><td>就労</td><td>10〜20点</td></tr>
<tr><td>疾病</td><td>10〜20点</td></tr>
<tr><td>障害</td><td>10〜20点</td></tr>
<tr><td>介護・看護</td><td>10〜20点</td></tr>
<tr><td>出産</td><td>16点</td></tr>
<tr><td>就学</td><td>10〜18点</td></tr>
<tr><td>育児休業</td><td>16点</td></tr>
<tr><td>求職活動</td><td>4点</td></tr>
</table>

<h3>加点項目とは？</h3>
<p>世帯の状況に応じてプラスまたはマイナスされる点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親</td><td>+8</td></tr>
<tr><td>きょうだい同一施設希望</td><td>+4</td></tr>
<tr><td>きょうだい別施設希望</td><td>+2</td></tr>
<tr><td>多胎児同時申込</td><td>+3</td></tr>
<tr><td>育休復帰</td><td>+2</td></tr>
<tr><td>年度初から待機</td><td>+2</td></tr>
<tr><td>認可外利用</td><td>+2</td></tr>
<tr><td>生活保護</td><td>+4</td></tr>
<tr><td>育休延長許容</td><td><span class="highlight">-50</span></td></tr>
</table>

<div class="point-box">
<p><strong>重要ポイント</strong></p>
<p>「育休延長も許容できる」にチェックすると<strong>-50点</strong>という大きな減点になります。本当に入園したい場合は絶対にチェックしないでください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の基準は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/riyoutyosei_r8.html" target="_blank" rel="noopener">堺市「利用調整基準」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "douten-taisaku",
    citySlug: "sakai",
    title: "堺市で同点になったらどうなる？同点時の優先順位と対策",
    description:
      "堺市の保育園入園で同じ点数になった場合の優先順位ルールと、差をつけるための具体的な対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同じ点数の場合の優先順位</h2>
<p>堺市では合計点数が同じ場合、以下の順で優先されます。</p>

<ol>
<li><strong>基準項目の合計点が高い</strong>（加点を除いた基本の点数）</li>
<li><strong>きょうだいが在園中</strong></li>
<li><strong>ひとり親世帯</strong></li>
<li><strong>所得が低い世帯</strong></li>
</ol>

<h2>同点対策のポイント</h2>
<ul>
<li>加点項目は全て漏れなく申告する</li>
<li>認可外保育施設を利用して加点を得る（+2点）</li>
<li>きょうだいが在園中の園を希望する（+4点＋同点時優先）</li>
<li>希望園を多めに書いて内定確率を上げる</li>
<li>人気園だけでなく、空きのある園も候補に入れる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/riyoutyosei_r8.html" target="_blank" rel="noopener">堺市「利用調整基準」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "fulltime-score",
    citySlug: "sakai",
    title: "堺市でフルタイム共働きは何点？40点の内訳と加点のコツ",
    description:
      "堺市でフルタイム共働き世帯が何点になるのか、40点の内訳と加点で差をつける方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>フルタイム共働きの基本点数</h2>
<p>堺市では、両親ともに<strong>月20日以上かつ週40時間以上</strong>の就労で、基準項目は<strong>父20点＋母20点＝40点</strong>になります。</p>

<h3>フルタイム＋加点の例</h3>
<table>
<tr><th>状況</th><th>合計点</th></tr>
<tr><td>フルタイム共働き（加点なし）</td><td>40点</td></tr>
<tr><td>＋ きょうだい同一施設希望</td><td>44点</td></tr>
<tr><td>＋ 育休復帰</td><td>42点</td></tr>
<tr><td>＋ ひとり親</td><td>48点</td></tr>
<tr><td>＋ きょうだい同一施設＋育休復帰＋認可外利用</td><td>48点</td></tr>
</table>

<h2>加点で差をつけるには</h2>
<ul>
<li><strong>きょうだい同一施設希望（+4）</strong>：きょうだいが在園中なら最も大きな加点</li>
<li><strong>育休復帰（+2）</strong>：入園月に復帰する予定があれば忘れずに申告</li>
<li><strong>認可外利用（+2）</strong>：認可外保育施設に預けていれば加点</li>
<li><strong>待機児童（+2）</strong>：年度初めから待機していれば加点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>堺市は加点項目の点数が比較的小さいため、使える加点を全て積み上げることが重要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },

  // ===== 地域情報 (2) =====
  {
    slug: "popular-areas",
    citySlug: "sakai",
    title: "堺市で保育園に入りやすいエリアは？区ごとの激戦度を分析",
    description:
      "堺市7区の保育園の入りやすさを比較。激戦区と穴場エリアの特徴を解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>堺市の区ごとの保育園事情</h2>
<p>堺市は7つの区で構成されており、エリアによって保育園の入りやすさが異なります。</p>

<h3>激戦度マップ</h3>
<table>
<tr><th>区</th><th>激戦度</th><th>特徴</th></tr>
<tr><td>堺区</td><td>激戦</td><td>市の中心部。マンション開発で子育て世帯増加中</td></tr>
<tr><td>北区</td><td>激戦</td><td>百舌鳥・中百舌鳥エリアが特に人気</td></tr>
<tr><td>西区</td><td>やや激戦</td><td>鳳エリアを中心に需要が高い</td></tr>
<tr><td>中区</td><td>普通</td><td>住宅地が広がり比較的バランスが良い</td></tr>
<tr><td>東区</td><td>やや穴場</td><td>初芝・萩原天神エリアは比較的空きがある</td></tr>
<tr><td>南区</td><td>穴場</td><td>泉北ニュータウンを中心に定員に余裕がある園が多い</td></tr>
<tr><td>美原区</td><td>穴場</td><td>郊外で比較的入りやすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>北区・堺区は40点でも入れない園がありますが、南区・美原区なら比較的余裕があります。通勤ルートも考慮してエリアを検討しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "shogaikibo-hoiku",
    citySlug: "sakai",
    title: "堺市の小規模保育事業とは？メリットと3歳の壁の対策",
    description:
      "堺市の小規模保育事業の特徴、メリット・デメリット、3歳以降の預け先確保について解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象にした、定員6〜19名の小さな保育施設です。堺市では多くの小規模保育事業所があり、認可保育園より入りやすい傾向にあります。</p>

<h3>メリット</h3>
<ul>
<li>少人数なので手厚い保育が受けられる</li>
<li>大規模保育園より入りやすい</li>
<li>卒園時に連携施設への優先入園ができる場合がある</li>
</ul>

<h3>3歳の壁とは</h3>
<p>小規模保育は2歳までなので、3歳からの預け先を別に確保する必要があります。これが「3歳の壁」です。</p>

<h3>3歳の壁の対策</h3>
<ul>
<li><strong>連携施設がある園を選ぶ</strong>：卒園後に連携先の認可保育園や認定こども園に優先入園できます</li>
<li><strong>認定こども園を検討する</strong>：0歳〜就学前まで一貫して預けられます</li>
<li><strong>幼稚園＋預かり保育</strong>：3歳からは幼稚園に通い、預かり保育を利用する方法もあります</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>堺市の小規模保育事業所一覧は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/" target="_blank" rel="noopener">堺市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },

  // ===== 育休・復職 (2) =====
  {
    slug: "ikukyu-fukki",
    citySlug: "sakai",
    title: "堺市で育休明けに保育園に入るには？復帰加点と注意点",
    description:
      "堺市で育児休業から復帰する際の保育園申込のポイント。育休復帰加点の条件と申請の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰の加点（+2点）</h2>
<p>堺市では、育児休業を取得し、<strong>入園する月に職場復帰する</strong>場合に+2点の加点があります。</p>

<h3>加点の条件</h3>
<ul>
<li>育児休業を取得中であること</li>
<li>入園月に復帰すること（復帰予定証明が必要）</li>
<li>就労先が確定していること</li>
</ul>

<h3>育休延長許容の注意点</h3>
<p>申込書に「育休延長も許容できる」にチェックすると<strong>-50点</strong>の大きな減点になります。これは「入園できなくても育休を延長する意思がある」と判断されるためです。</p>

<div class="point-box">
<p><strong>重要</strong></p>
<p>本当に入園したい場合は「育休延長許容」に絶対にチェックしないでください。-50点は事実上、入園不可能な点数になります。</p>
</div>

<h2>育休中の基準点数</h2>
<p>育児休業中は基準項目として16点が付きます。復帰後のフルタイム勤務の20点より低いため、<strong>復帰予定として就労の20点＋育休復帰加点2点で申込む方が有利</strong>です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/r7hoikumousikomi.html" target="_blank" rel="noopener">堺市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "jitan-kinmu-score",
    citySlug: "sakai",
    title: "堺市で時短勤務だと何点？パートとの違いと加点の工夫",
    description:
      "堺市で時短勤務の場合の基準点数と、パートタイムとの違い、加点で補うための具体策を解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>時短勤務の場合の点数</h2>
<p>堺市では就労の基準点数は就労日数と就労時間で決まります。</p>

<table>
<tr><th>勤務条件</th><th>点数</th></tr>
<tr><td>月20日以上かつ週40時間以上</td><td>20点</td></tr>
<tr><td>月20日以上かつ週30時間以上</td><td>18点</td></tr>
<tr><td>月16日以上かつ週24時間以上</td><td>16点</td></tr>
<tr><td>月12日以上かつ週16時間以上</td><td>14点</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>10点</td></tr>
</table>

<h3>時短勤務とパートタイムの違い</h3>
<p>時短勤務の場合、勤務日数が月20日以上であれば18点（週30時間以上）または16点（週24時間以上）になります。パートタイムで週3日程度なら14点以下になる可能性があります。</p>

<h2>加点で補うには</h2>
<ul>
<li>きょうだい同一施設希望（+4）で合計を上げる</li>
<li>認可外保育施設を利用して加点（+2）を得る</li>
<li>育休復帰加点（+2）が使えないか確認する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>時短勤務でも月20日以上勤務していれば18点になり、フルタイムとの差は2点だけです。加点で十分にカバーできます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },

  // ===== 施設選び (1) =====
  {
    slug: "nintei-kodomo-en",
    citySlug: "sakai",
    title: "堺市の認定こども園と保育園の違いは？選び方のポイント",
    description:
      "堺市には認定こども園と保育園の両方があります。それぞれの違いと選び方のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>認定こども園と保育園の違い</h2>
<table>
<tr><th></th><th>認定こども園</th><th>保育園</th></tr>
<tr><td>対象年齢</td><td>0歳〜就学前</td><td>0歳〜就学前</td></tr>
<tr><td>利用区分</td><td>1号（教育）・2号/3号（保育）</td><td>2号/3号（保育）のみ</td></tr>
<tr><td>保育時間</td><td>1号は短時間/2・3号は長時間</td><td>長時間</td></tr>
<tr><td>選考</td><td>2・3号は利用調整あり</td><td>利用調整あり</td></tr>
</table>

<h3>認定こども園のメリット</h3>
<ul>
<li>教育と保育が一体的に提供される</li>
<li>就労をやめても退園しなくてよい（1号認定に切り替え可能）</li>
<li>幼稚園の教育カリキュラムも含まれる園がある</li>
</ul>

<h3>選び方のポイント</h3>
<ul>
<li>通勤ルート上にあるか</li>
<li>延長保育の時間帯が合うか</li>
<li>園庭があるか、広さは十分か</li>
<li>給食か弁当か</li>
<li>行事の頻度と保護者の負担</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>堺市では認定こども園も保育園も同じ利用調整基準で選考されます。施設の種類よりも、通いやすさや教育方針で選ぶのがおすすめです。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },

  // ===== 手続き (1) =====
  {
    slug: "hitsuyo-shorui",
    citySlug: "sakai",
    title: "堺市の保育園申込に必要な書類リスト　忘れがちな書類も解説",
    description:
      "堺市の保育園申込に必要な書類を一覧にまとめました。忘れがちな書類や注意点も解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>必要書類一覧</h2>

<h3>全員が必要な書類</h3>
<ul>
<li>施設型給付費・地域型保育給付費等教育・保育給付認定申請書兼利用申込書</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類（運転免許証等のコピー）</li>
</ul>

<h3>保育が必要な理由を証明する書類</h3>
<table>
<tr><th>理由</th><th>必要書類</th></tr>
<tr><td>就労</td><td>就労証明書（勤務先に記入してもらう）</td></tr>
<tr><td>就労内定</td><td>就労証明書（内定先に記入してもらう）</td></tr>
<tr><td>疾病</td><td>診断書</td></tr>
<tr><td>障害</td><td>障害者手帳のコピー</td></tr>
<tr><td>介護</td><td>介護状況申告書＋対象者の証明書</td></tr>
<tr><td>出産</td><td>母子健康手帳のコピー</td></tr>
<tr><td>就学</td><td>在学証明書・時間割</td></tr>
<tr><td>求職活動</td><td>求職活動に関する申立書</td></tr>
</table>

<h3>忘れがちな書類</h3>
<ul>
<li><strong>就労証明書</strong>：勤務先に依頼してから届くまで2〜3週間かかることも。早めに依頼しましょう</li>
<li><strong>課税証明書</strong>：転入の場合に必要になることがあります</li>
<li><strong>きょうだいの在園証明</strong>：きょうだい加点を受けるために必要な場合があります</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の必要書類は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/r7hoikumousikomi.html" target="_blank" rel="noopener">堺市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },

  // ===== 以下 2026-04-07 追加分 40本 =====

  {
    slug: "nursery-visit-guide",
    citySlug: "sakai",
    title: "堺市の保育園見学ガイド　見学時に確認すべきポイント10選",
    description:
      "堺市の保育園を見学する際にチェックすべき10のポイントを紹介。見学の予約方法や持ち物、質問例もまとめました。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育園見学はいつ行くべき？</h2>
<p>堺市の保育園見学は<span class="highlight">7月〜9月</span>がベストシーズンです。10月の申込開始前に見学を済ませておきましょう。</p>

<h3>見学の予約方法</h3>
<p>各園に直接電話して見学日を予約します。午前中の保育の様子が見られる時間帯がおすすめです。</p>

<h2>見学時に確認すべき10のポイント</h2>
<ol>
<li><strong>保育士と子どもの接し方</strong>：声かけの仕方や表情を観察</li>
<li><strong>園庭の広さと遊具</strong>：外遊びの環境を確認</li>
<li><strong>室内の清潔さ</strong>：掃除が行き届いているか</li>
<li><strong>給食の内容</strong>：自園調理か外部委託か、アレルギー対応</li>
<li><strong>延長保育の時間と料金</strong>：通勤時間に合うか</li>
<li><strong>お迎え時の駐車場・駐輪場</strong>：台数や停めやすさ</li>
<li><strong>持ち物の多さ</strong>：布おむつか紙おむつか、布団持参の有無</li>
<li><strong>行事の頻度</strong>：保護者参加の行事がどのくらいあるか</li>
<li><strong>病児・病後児対応</strong>：発熱時の基準と呼び出しルール</li>
<li><strong>保育方針</strong>：のびのび系か教育系か</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>堺市は7区にまたがっているため、自宅と職場の動線上にある園を優先して見学すると効率的です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育施設の一覧は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/" target="_blank" rel="noopener">堺市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "zero-vs-one-year",
    citySlug: "sakai",
    title: "堺市で0歳入園と1歳入園はどちらが有利？比較解説",
    description:
      "堺市で0歳児クラスと1歳児クラスのどちらで入園するのが有利か、定員数や競争率の違いを比較します。",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳児クラスと1歳児クラスの違い</h2>
<p>堺市の認可保育園では、0歳児クラスと1歳児クラスで募集人数や入りやすさが大きく異なります。</p>

<h3>定員の傾向</h3>
<table>
<tr><th>クラス</th><th>募集人数の傾向</th><th>競争率</th></tr>
<tr><td>0歳児（生後57日〜）</td><td>少ない（6〜9名程度）</td><td>比較的低い</td></tr>
<tr><td>1歳児</td><td>0歳からの持ち上がりで枠が少ない</td><td><span class="highlight">高い</span></td></tr>
</table>

<h2>0歳入園のメリット・デメリット</h2>
<h3>メリット</h3>
<ul>
<li>定員の全枠が新規募集のため入りやすい</li>
<li>早くから集団生活に慣れる</li>
</ul>
<h3>デメリット</h3>
<ul>
<li>育休を早めに切り上げる必要がある</li>
<li>0歳児を受け入れていない園もある</li>
</ul>

<h2>1歳入園のメリット・デメリット</h2>
<h3>メリット</h3>
<ul>
<li>育休を1年間取得できる</li>
<li>育休復帰加点（+2点）が使える</li>
</ul>
<h3>デメリット</h3>
<ul>
<li>0歳児からの持ち上がりで空き枠が少ない</li>
<li>人気園では最も競争が激しい年齢</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>堺市では1歳児クラスが最も激戦です。育休復帰加点（+2点）を活用しても入れない場合は、0歳入園も検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-guide",
    citySlug: "sakai",
    title: "堺市のひとり親世帯の保活ガイド　加点と優先措置を解説",
    description:
      "堺市でひとり親世帯が保育園に申し込む際の加点や優先措置、利用できる支援制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点</h2>
<p>堺市ではひとり親世帯に<span class="highlight">+8点</span>の加点があります。これは堺市の加点項目の中で最も大きい点数です。</p>

<h3>加点の条件</h3>
<ul>
<li>戸籍上ひとり親であること</li>
<li>事実婚状態にないこと</li>
</ul>

<h2>同点時の優先</h2>
<p>ひとり親世帯は同点になった場合の<span class="highlight">優先順位でも上位</span>に位置づけられています。加点＋同点優先の二重のメリットがあります。</p>

<h2>ひとり親向けの支援制度</h2>
<ul>
<li><strong>保育料の軽減</strong>：市民税非課税世帯は保育料が無料</li>
<li><strong>児童扶養手当</strong>：所得に応じた支給（金額は年度により変動）</li>
<li><strong>ひとり親家庭等医療費助成</strong>：医療費の自己負担を軽減</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯はフルタイム（20点）＋ひとり親（+8点）＝<span class="highlight">28点</span>となり、基準項目だけでも非常に高い点数になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親支援制度は<a href="https://www.city.sakai.lg.jp/kosodate/" target="_blank" rel="noopener">堺市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "ikukyu-timing",
    citySlug: "sakai",
    title: "堺市で育休はいつまで取るべき？復帰タイミングと点数の関係",
    description:
      "堺市での育休復帰のベストタイミングを、入園選考の点数制度とあわせて解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰と保育園入園の関係</h2>
<p>堺市では育休から復帰するタイミングが入園選考の点数に影響します。</p>

<h3>育休復帰加点</h3>
<p>入園月に育休から復帰する場合、<span class="highlight">+2点</span>の加点があります。</p>

<h2>復帰タイミング別の比較</h2>
<table>
<tr><th>パターン</th><th>点数の目安</th><th>メリット</th><th>デメリット</th></tr>
<tr><td>0歳4月入園→即復帰</td><td>40点＋育休復帰2点＝42点</td><td>加点あり</td><td>育休が短い</td></tr>
<tr><td>1歳4月入園→即復帰</td><td>40点＋育休復帰2点＝42点</td><td>育休1年確保＋加点</td><td>1歳児は競争率高</td></tr>
<tr><td>育休延長→2歳4月</td><td>40点＋育休復帰2点＝42点</td><td>育休が長い</td><td>2歳児枠は少ない</td></tr>
</table>

<h2>育休延長許容に注意</h2>
<p>堺市では「育休延長も許容できる」にチェックすると<span class="highlight">-50点</span>の大きな減点になります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園を本気で希望するなら「育休延長許容」にチェックしないでください。-50点は事実上入園不可能です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1歳4月入園が最もバランスの良いタイミングです。育休を1年確保しつつ、育休復帰加点（+2点）も活用できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 58,
  },
  {
    slug: "ninkagai-selection",
    citySlug: "sakai",
    title: "堺市の認可外保育施設の選び方　加点狙いの注意点も",
    description:
      "堺市の認可外保育施設の種類と選び方、認可入園の加点を狙う際の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>堺市の認可外保育施設の種類</h2>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可外保育施設</td><td>市に届出済み。保育料は施設により異なる</td></tr>
<tr><td>企業主導型保育施設</td><td>国の助成あり。地域枠で入所可能</td></tr>
<tr><td>一時預かり事業</td><td>リフレッシュや急な用事の際に利用可能</td></tr>
</table>

<h2>選び方のチェックポイント</h2>
<ul>
<li><strong>立入調査の結果</strong>：堺市が実施する立入調査の結果を確認</li>
<li><strong>保育料と追加費用</strong>：月額だけでなく給食費や教材費も確認</li>
<li><strong>保育時間</strong>：早朝・延長の対応時間</li>
<li><strong>保育士の配置</strong>：有資格者の割合</li>
<li><strong>連携施設の有無</strong>：認可園への優先入園制度があるか</li>
</ul>

<h2>加点狙いの注意点</h2>
<p>認可外利用で<span class="highlight">+2点</span>の加点を得るには、申込時点で有償利用していることが必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>加点目的だけで認可外に預けるのはコストがかかります。認可外保育料は月3〜8万円程度。家計への影響も考慮して判断しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設一覧は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/" target="_blank" rel="noopener">堺市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  {
    slug: "futago-hokatsu",
    citySlug: "sakai",
    title: "堺市で双子の保活　多胎児同時申込の加点と注意点",
    description:
      "堺市で双子（多胎児）の保育園入園を目指す場合のポイント、多胎児加点（+3点）を活用するコツを解説します。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>堺市の多胎児加点</h2>
<p>堺市では多胎児の同時申込に対して<span class="highlight">+3点</span>の加点があります。</p>

<h3>加点の条件</h3>
<ul>
<li>双子以上の多胎児であること</li>
<li>同時に保育施設を申し込むこと</li>
</ul>

<h2>同じ園に入るためのコツ</h2>
<ul>
<li><strong>定員に余裕のある園を選ぶ</strong>：2名以上同時入園が可能な園を探す</li>
<li><strong>希望園を多めに記入する</strong>：堺市の希望園記入上限を活用</li>
<li><strong>小規模保育も検討する</strong>：空きがある場合がある</li>
<li><strong>2次利用調整も活用する</strong>：1次で保留の場合は希望変更が可能</li>
</ul>

<h2>別々の園になった場合</h2>
<p>別々の園になると送迎の負担が大きくなります。翌年度の転園申請で同じ園を希望することができます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>堺市の多胎児加点（+3点）はフルタイム共働きの40点に上乗せされ、<span class="highlight">43点</span>で選考されます。他の加点と合わせればかなり有利に保活を進められます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>多胎児の取り扱いは<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/riyoutyosei_r8.html" target="_blank" rel="noopener">堺市「利用調整基準」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
  {
    slug: "hoiku-mama-interview",
    citySlug: "sakai",
    title: "堺市の保活体験談　先輩ママが語る成功のポイント",
    description:
      "堺市で保活を経験した先輩ママの体験談をもとに、保活成功のポイントと失敗しがちな落とし穴を紹介します。",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活成功のポイント（体験談ベース）</h2>
<p>堺市で保活を経験した先輩ママたちの声をもとに、成功のポイントをまとめました。</p>

<div class="point-box">
<p><strong>注意</strong></p>
<p>以下は一般的な体験談をもとにした参考情報です。年度や園によって状況は異なります。</p>
</div>

<h3>成功した人の共通点</h3>
<ul>
<li><strong>早めの情報収集</strong>：妊娠中から保育園の情報を集め始めた</li>
<li><strong>複数園を見学</strong>：3〜5か所は見学して比較した</li>
<li><strong>加点を最大限活用</strong>：きょうだい加点や育休復帰加点を漏れなく申告</li>
<li><strong>希望園を多めに記入</strong>：人気園だけでなく空きのある園も候補に</li>
<li><strong>区の子育て支援課に相談</strong>：個別の状況に応じたアドバイスを受けた</li>
</ul>

<h3>よくある失敗パターン</h3>
<ul>
<li>就労証明書の依頼が遅れて締切に間に合わなかった</li>
<li>人気園1か所しか書かなかったため保留になった</li>
<li>育休延長許容にチェックしてしまい-50点になった</li>
<li>加点項目を確認せず申告漏れがあった</li>
</ul>

<h2>先輩ママからのアドバイス</h2>
<p>「堺市は北区・堺区が激戦です。加点できる項目を全部確認して、使えるものは全て申告するのがコツ。就労証明書は早めに依頼しましょう。」</p>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "waiting-child-data",
    citySlug: "sakai",
    title: "堺市の待機児童数の推移と保留児童の実態",
    description:
      "堺市の待機児童数の推移と、統計に表れない保留児童（隠れ待機児童）の実態を解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>堺市の待機児童の状況</h2>
<p>堺市は待機児童の解消に取り組んでおり、近年は待機児童数が大幅に減少しています。</p>

<h3>待機児童減少の背景</h3>
<ul>
<li>保育施設の新設・増設</li>
<li>小規模保育事業や企業主導型保育の活用</li>
<li>保育士確保の取り組み</li>
</ul>

<h2>「隠れ待機児童」の存在</h2>
<p>国の定義による待機児童が減っても、希望の園に入れない「保留児童」は存在します。</p>
<ul>
<li>特定の園のみ希望して保留になったケース</li>
<li>認可外に預けているため待機にカウントされないケース</li>
<li>育休を延長して申込を見送ったケース</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「待機児童が少ない＝必ず入れる」ではありません。特に北区・堺区の人気園は0〜2歳児の枠が限られています。希望園は複数記入しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>待機児童数の最新データは<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/" target="_blank" rel="noopener">堺市公式サイト</a>で公表されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  {
    slug: "small-nursery-guide",
    citySlug: "sakai",
    title: "堺市の小規模保育事業ガイド　入りやすさと3歳の壁対策",
    description:
      "堺市の小規模保育事業の一覧、入りやすさ、3歳の壁への具体的な対策方法を詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>堺市の小規模保育事業</h2>
<p>0〜2歳児を対象とした定員6〜19名の保育施設です。堺市内にも多くの小規模保育事業所があり、認可保育園より入りやすい傾向にあります。</p>

<h3>メリット</h3>
<ul>
<li>少人数できめ細かい保育が受けられる</li>
<li>認可保育園より入りやすい傾向</li>
<li>卒園時に連携施設への優先入園ができる場合がある</li>
</ul>

<h3>デメリット</h3>
<ul>
<li>2歳までしか利用できない（3歳の壁）</li>
<li>園庭がない施設もある</li>
<li>行事が少ない場合がある</li>
</ul>

<h2>3歳の壁の対策</h2>
<ul>
<li><strong>連携施設がある園を選ぶ</strong>：卒園後に連携先に優先入園できる場合がある</li>
<li><strong>認定こども園を検討</strong>：3歳から幼稚園部分として利用可能</li>
<li><strong>幼稚園＋預かり保育</strong>：共働きでも利用可能な園が増えている</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>堺市の小規模保育は連携施設が設定されている園もあります。見学時に必ず連携先を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育事業所一覧は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/" target="_blank" rel="noopener">堺市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 46,
  },
  {
    slug: "secondchild-hokatsu",
    citySlug: "sakai",
    title: "堺市の第2子保活ガイド　きょうだい加点と同園入園のコツ",
    description:
      "堺市で第2子の保育園入園を目指す際のきょうだい加点（+4点/+2点）と同じ園に入るための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>堺市のきょうだい加点</h2>
<p>堺市では、きょうだいの在園状況に応じて加点があります。</p>

<table>
<tr><th>状況</th><th>加点</th></tr>
<tr><td>きょうだい同一施設希望</td><td><span class="highlight">+4点</span></td></tr>
<tr><td>きょうだい別施設希望</td><td>+2点</td></tr>
</table>

<h2>同じ園に入るための戦略</h2>
<ul>
<li><strong>上の子が在園中の園を第1希望にする</strong>：+4点の加点＋同点時の優先</li>
<li><strong>他の加点も積む</strong>：育休復帰（+2点）や認可外利用（+2点）</li>
<li><strong>上の子の入園時に長く在籍できる園を選ぶ</strong>：第2子の保活を見据えた選択</li>
</ul>

<h2>点数の具体例</h2>
<p>フルタイム共働き（40点）＋きょうだい同一施設（+4点）＋育休復帰（+2点）＝<span class="highlight">46点</span></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい同一施設希望の+4点は堺市の加点の中でも大きな点数です。上の子が在園中の園を第1希望にすることで、同じ園に入れる可能性が大幅に高まります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>きょうだい加点の詳細は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/riyoutyosei_r8.html" target="_blank" rel="noopener">堺市「利用調整基準」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 56,
  },
  {
    slug: "self-employed-score",
    citySlug: "sakai",
    title: "堺市で自営業・フリーランスの保育園点数は？必要書類も解説",
    description:
      "堺市で自営業やフリーランスの方が保育園に申し込む際の点数の仕組みと必要書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスの基準点</h2>
<p>堺市では自営業・フリーランスも会社員と同じ基準で点数が決まります。</p>

<table>
<tr><th>勤務条件</th><th>点数</th></tr>
<tr><td>月20日以上かつ週40時間以上</td><td>20点</td></tr>
<tr><td>月20日以上かつ週30時間以上</td><td>18点</td></tr>
<tr><td>月16日以上かつ週24時間以上</td><td>16点</td></tr>
<tr><td>月12日以上かつ週16時間以上</td><td>14点</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>10点</td></tr>
</table>

<h2>必要書類</h2>
<ul>
<li><strong>就労証明書（自営用）</strong>：自分で記入する様式</li>
<li><strong>開業届のコピー</strong>または<strong>確定申告書のコピー</strong></li>
<li><strong>業務内容がわかる資料</strong>：ホームページの印刷や名刺など</li>
</ul>

<h2>注意点</h2>
<ul>
<li>就労時間を客観的に証明する必要がある</li>
<li>確定申告をしていないと就労実態の証明が難しい</li>
<li>開業したばかりの場合は追加資料を求められることがある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業でも月20日以上・週40時間以上の就労実態があれば、会社員と同じ20点を得られます。確定申告書や開業届でしっかり証明しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/r7hoikumousikomi.html" target="_blank" rel="noopener">堺市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "naishoku-score",
    citySlug: "sakai",
    title: "堺市で内職・在宅ワークの保育園点数は？認定のポイント",
    description:
      "堺市で内職や在宅ワークをしている場合の保育園入園の点数と、就労認定のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>在宅ワーク・内職の基準点</h2>
<p>堺市では在宅ワークや内職も「就労」として認定されます。基準点は就労日数と就労時間で決まります。</p>

<table>
<tr><th>勤務条件</th><th>点数</th></tr>
<tr><td>月20日以上かつ週40時間以上</td><td>20点</td></tr>
<tr><td>月20日以上かつ週30時間以上</td><td>18点</td></tr>
<tr><td>月16日以上かつ週24時間以上</td><td>16点</td></tr>
<tr><td>月12日以上かつ週16時間以上</td><td>14点</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>10点</td></tr>
</table>

<h2>在宅ワークの就労証明</h2>
<ul>
<li><strong>雇用されている場合</strong>：勤務先に就労証明書を依頼</li>
<li><strong>業務委託の場合</strong>：発注元に就労証明書の記入を依頼、または自営業用の書式で申告</li>
<li><strong>フリーランスの場合</strong>：開業届＋確定申告書＋業務内容の資料</li>
</ul>

<h2>注意点</h2>
<ul>
<li>在宅ワークの場合、就労時間を客観的に証明する資料が重要</li>
<li>堺市では居宅内・居宅外の区別なく就労日数と時間で点数が決まる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅ワークでも月20日以上・週40時間以上働いていれば20点を得られます。就労時間の記録をつけておくと、書類作成時に役立ちます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 44,
  },
  {
    slug: "kyushoku-hokatsu",
    citySlug: "sakai",
    title: "堺市で求職中でも保育園に入れる？求職活動の点数と対策",
    description:
      "堺市で求職活動中に保育園に申し込む場合の点数と、入園するための具体的な対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>求職活動中の基準点</h2>
<p>堺市では求職活動中の基準点は<span class="highlight">4点</span>です。フルタイム就労の20点と比べて大幅に低くなります。</p>

<table>
<tr><th>保育が必要な理由</th><th>点数</th></tr>
<tr><td>就労（フルタイム）</td><td>20点</td></tr>
<tr><td>就労内定</td><td>就労と同等</td></tr>
<tr><td>求職活動</td><td><span class="highlight">4点</span></td></tr>
</table>

<h2>求職中に入園するための対策</h2>
<ul>
<li><strong>先に就職先を決める</strong>：内定があれば「就労内定」として高い点数で申込可能</li>
<li><strong>パートでも就労開始する</strong>：週数日のパートでも就労として認定される</li>
<li><strong>認可外保育施設を利用する</strong>：求職活動中でも利用可能な施設がある</li>
<li><strong>一時預かりを活用する</strong>：就職活動中の預け先として利用可能</li>
</ul>

<h2>入園後の就職活動期間</h2>
<p>求職活動を理由に入園した場合、入園後一定期間内に就職する必要があります。期限内に就職できなかった場合は退園となる可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>求職中は4点と非常に低いため、できれば内定を得てから申し込むのが有利です。パートや派遣でもフルタイム相当の勤務条件があれば高い点数になります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "sakai",
    title: "堺市で保活中に転職するとどうなる？点数への影響と注意点",
    description:
      "堺市の保育園申込期間中や入園後に転職した場合の点数への影響、必要な手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>申込前に転職した場合</h2>
<p>申込前に転職を完了していれば、新しい勤務先の就労証明書を提出するだけです。フルタイムであれば基準点20点は変わりません。</p>

<h2>申込後〜入園前に転職した場合</h2>
<ul>
<li>速やかにお住まいの区の子育て支援課に届け出る</li>
<li>新しい就労証明書を提出する</li>
<li>就労時間が減ると基準点が下がる可能性がある</li>
</ul>

<h2>入園後に転職した場合</h2>
<ul>
<li>退職後、求職活動期間として一定期間は保育を継続できる</li>
<li>新しい勤務先が決まったら就労証明書を再提出</li>
<li>就労時間が大幅に減ると保育認定の変更が必要な場合がある</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>転職による空白期間が長くなると退園の対象になる場合があります。転職を計画する場合は、空白期間ができないようにするのが安全です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保活中の転職は、新しい勤務先でフルタイム以上の就労条件を確保できるなら問題ありません。就労日数や時間が減る転職は、点数に直接影響するので注意が必要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 43,
  },
  {
    slug: "age2-nyuen",
    citySlug: "sakai",
    title: "堺市で2歳児入園を狙うには？枠の少なさと対策",
    description:
      "堺市の2歳児クラスの入園事情と、枠が少ない中で入園するための具体的な対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2歳児クラスの入園事情</h2>
<p>2歳児クラスは0歳・1歳からの在園児で枠が埋まっていることが多く、新規募集が<span class="highlight">極めて少ない</span>クラスです。</p>

<h3>年齢別の入りやすさ</h3>
<table>
<tr><th>クラス</th><th>入りやすさ</th><th>理由</th></tr>
<tr><td>0歳児</td><td>比較的入りやすい</td><td>全枠が新規募集</td></tr>
<tr><td>1歳児</td><td>激戦</td><td>0歳からの持ち上がりで枠が減る</td></tr>
<tr><td>2歳児</td><td>非常に厳しい</td><td>0・1歳からの持ち上がりでほぼ枠なし</td></tr>
<tr><td>3歳児</td><td>やや緩和</td><td>幼稚園に移る子が出て枠が増える場合がある</td></tr>
</table>

<h2>2歳児入園の対策</h2>
<ul>
<li><strong>定員増の園を狙う</strong>：2歳児クラスから定員が増える園がある</li>
<li><strong>新設園を狙う</strong>：新規開設の園は全枠が新規募集</li>
<li><strong>小規模保育からの連携先</strong>：連携施設がある園は卒園児枠がある</li>
<li><strong>加点を最大限にする</strong>：認可外利用（+2点）や育休復帰（+2点）を活用</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2歳児入園を狙うなら、それまでの間認可外に預けて加点（+2点）を確保しておくのが効果的です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 47,
  },
  {
    slug: "age3-ikou",
    citySlug: "sakai",
    title: "堺市の3歳からの預け先　保育園・幼稚園・こども園の比較",
    description:
      "堺市で3歳からの預け先として保育園・幼稚園・認定こども園を比較し、選び方のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>3歳からの選択肢</h2>
<table>
<tr><th>施設</th><th>保育時間</th><th>費用</th><th>特徴</th></tr>
<tr><td>認可保育園</td><td>7:00〜19:00程度</td><td>無償化対象</td><td>長時間保育が可能</td></tr>
<tr><td>幼稚園</td><td>9:00〜14:00程度</td><td>無償化対象</td><td>教育カリキュラムが充実</td></tr>
<tr><td>認定こども園</td><td>利用区分による</td><td>無償化対象</td><td>教育と保育の一体提供</td></tr>
</table>

<h2>幼稚園＋預かり保育という選択</h2>
<p>3〜5歳児は幼児教育・保育の無償化の対象です。幼稚園の預かり保育も月額11,300円まで無償化されます（保育の必要性の認定が必要）。</p>

<h3>メリット</h3>
<ul>
<li>教育カリキュラムが充実している園が多い</li>
<li>保育園より入りやすい場合がある</li>
<li>利用調整（点数選考）がない園が多い</li>
</ul>

<h3>デメリット</h3>
<ul>
<li>預かり保育の時間が短い園がある</li>
<li>夏休み等の長期休暇中の預かりがない園がある</li>
<li>弁当持参の園が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>堺市には認定こども園も多くあります。3歳以降は選択肢が広がるため、保育園だけにこだわらず幼稚園やこども園も含めて検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 44,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "sakai",
    title: "堺市の0歳児保育　受入月齢と準備のポイント",
    description:
      "堺市の0歳児保育の受入開始月齢、必要な持ち物、慣らし保育の流れを解説します。",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳児保育の受入月齢</h2>
<p>堺市の認可保育園では、多くの園が<span class="highlight">生後57日（生後2か月）</span>から受入れています。ただし園によって受入開始月齢は異なります。</p>

<h3>受入月齢の目安</h3>
<table>
<tr><th>施設タイプ</th><th>受入開始月齢</th></tr>
<tr><td>認可保育園（多くの園）</td><td>生後57日〜</td></tr>
<tr><td>小規模保育</td><td>生後57日〜（園による）</td></tr>
<tr><td>認定こども園</td><td>園による（生後6か月〜が多い）</td></tr>
</table>

<h2>0歳児保育の準備</h2>
<ul>
<li><strong>持ち物</strong>：着替え、おむつ、タオル、哺乳瓶、連絡帳など</li>
<li><strong>慣らし保育</strong>：1〜2週間かけて徐々に保育時間を延ばす</li>
<li><strong>母乳・ミルク</strong>：搾乳対応の有無を確認</li>
<li><strong>離乳食</strong>：園での離乳食の進め方を相談</li>
</ul>

<h2>慣らし保育のスケジュール例</h2>
<table>
<tr><th>日程</th><th>保育時間</th></tr>
<tr><td>1〜2日目</td><td>2時間程度</td></tr>
<tr><td>3〜4日目</td><td>午前中（給食まで）</td></tr>
<tr><td>5日目〜1週間</td><td>午後まで（昼寝後）</td></tr>
<tr><td>2週目〜</td><td>通常保育</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育期間中は仕事を休むか時短にする必要があります。育休復帰のタイミングは、慣らし保育の期間を考慮して決めましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 41,
  },
  {
    slug: "nintei-kodomoen",
    citySlug: "sakai",
    title: "堺市の認定こども園ガイド　保育園との違いと選び方",
    description:
      "堺市にある認定こども園の特徴、保育園との違い、1号・2号・3号認定の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>認定こども園とは</h2>
<p>教育（幼稚園機能）と保育（保育園機能）を一体的に提供する施設です。堺市にも多くの認定こども園があります。</p>

<h3>認定区分</h3>
<table>
<tr><th>区分</th><th>対象</th><th>利用時間</th></tr>
<tr><td>1号認定（教育）</td><td>3〜5歳、保育の必要なし</td><td>教育標準時間（4時間程度）</td></tr>
<tr><td>2号認定（保育）</td><td>3〜5歳、保育の必要あり</td><td>保育標準時間（最大11時間）</td></tr>
<tr><td>3号認定（保育）</td><td>0〜2歳、保育の必要あり</td><td>保育標準時間（最大11時間）</td></tr>
</table>

<h2>保育園との違い</h2>
<ul>
<li><strong>就労をやめても退園しなくてよい</strong>：1号認定に切り替え可能</li>
<li><strong>教育的なカリキュラム</strong>がある園が多い</li>
<li><strong>2号・3号認定は保育園と同じ利用調整基準</strong>で選考される</li>
</ul>

<h2>既存記事との違い</h2>
<p>堺市には「認定こども園」と「保育園」を一体的に運営している施設も多くあります。施設の種類にこだわりすぎず、通いやすさや教育方針で選ぶのがおすすめです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認定こども園は転職や退職をしても退園しなくてよいのが大きなメリットです。将来のライフプラン変更に柔軟に対応できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認定こども園の一覧は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/" target="_blank" rel="noopener">堺市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 46,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "sakai",
    title: "堺市の企業主導型保育施設とは？メリットと利用方法",
    description:
      "堺市にある企業主導型保育施設の特徴、メリット・デメリット、地域枠での利用方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>企業主導型保育施設とは</h2>
<p>企業が従業員の子どもを預けるために設置した保育施設で、国の助成を受けています。「従業員枠」と「地域枠」があり、地域の方も利用できます。</p>

<h3>認可保育園との違い</h3>
<table>
<tr><th></th><th>企業主導型</th><th>認可保育園</th></tr>
<tr><td>申込先</td><td>施設に直接</td><td>市（区の子育て支援課）</td></tr>
<tr><td>選考方法</td><td>施設が独自に判定</td><td>利用調整基準点</td></tr>
<tr><td>保育料</td><td>施設ごとに設定</td><td>市民税額で決定</td></tr>
<tr><td>対象年齢</td><td>施設による</td><td>0〜5歳</td></tr>
</table>

<h2>メリット</h2>
<ul>
<li>利用調整（点数選考）がないため、点数が低くても入れる可能性がある</li>
<li>国の助成により保育料が比較的安い</li>
<li>少人数制の施設が多い</li>
</ul>

<h2>デメリット</h2>
<ul>
<li>園庭がない施設が多い</li>
<li>施設の質にばらつきがある</li>
<li>定員が少ないため空きがない場合もある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可保育園に入れなかった場合の選択肢として有力です。企業主導型に預けながら翌年度の認可を申請すれば、認可外利用の加点（+2点）も得られます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 43,
  },
  {
    slug: "yakan-hoiku",
    citySlug: "sakai",
    title: "堺市の夜間保育・延長保育ガイド　遅い時間の預け先",
    description:
      "堺市で夜間や延長保育が利用できる施設の情報と、利用条件・料金について解説します。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>延長保育の概要</h2>
<p>堺市の認可保育園の多くでは延長保育を実施しています。通常の保育時間を超えて預けたい場合に利用できます。</p>

<h3>保育時間の区分</h3>
<table>
<tr><th>認定区分</th><th>利用可能時間</th></tr>
<tr><td>保育標準時間</td><td>最大11時間（例：7:00〜18:00）</td></tr>
<tr><td>保育短時間</td><td>最大8時間（例：8:30〜16:30）</td></tr>
<tr><td>延長保育</td><td>上記を超える時間（園により19:00〜20:00頃まで）</td></tr>
</table>

<h2>延長保育の料金</h2>
<p>延長保育の料金は園によって異なります。一般的に月額2,000〜5,000円程度、または日額200〜500円程度です。</p>

<h2>夜間保育について</h2>
<p>堺市では認可の夜間保育所は限られています。夜間の就労がある方は、以下の選択肢を検討してください。</p>
<ul>
<li>延長保育で20時頃まで対応している園を探す</li>
<li>認可外保育施設の中で夜間対応している施設を探す</li>
<li>ファミリー・サポート・センターの夜間支援を利用する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の延長保育の実施状況は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/" target="_blank" rel="noopener">堺市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 38,
  },
  {
    slug: "mushoka-seido",
    citySlug: "sakai",
    title: "堺市の幼児教育・保育無償化制度　対象と手続きを解説",
    description:
      "堺市における幼児教育・保育の無償化制度の対象範囲、手続き方法、副食費の扱いについて解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>無償化の対象</h2>
<p>2019年10月から始まった幼児教育・保育の無償化制度について、堺市での適用範囲をまとめます。</p>

<h3>対象施設と年齢</h3>
<table>
<tr><th>施設</th><th>対象年齢</th><th>無償化の内容</th></tr>
<tr><td>認可保育園</td><td>3〜5歳（全員）</td><td>保育料が無料</td></tr>
<tr><td>認可保育園</td><td>0〜2歳（非課税世帯）</td><td>保育料が無料</td></tr>
<tr><td>幼稚園</td><td>3〜5歳</td><td>月額25,700円まで無料</td></tr>
<tr><td>認可外保育施設</td><td>3〜5歳</td><td>月額37,000円まで無料</td></tr>
<tr><td>認可外保育施設</td><td>0〜2歳（非課税世帯）</td><td>月額42,000円まで無料</td></tr>
</table>

<h2>無償化でも必要な費用</h2>
<ul>
<li><strong>副食費（おかず代）</strong>：月額4,500円程度（園による）</li>
<li><strong>延長保育料</strong>：利用した場合</li>
<li><strong>行事費・教材費</strong>：園による</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳の保育料は無料ですが、副食費や延長保育料は自己負担です。年収360万円未満の世帯は副食費も免除される場合があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>無償化の詳細は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/" target="_blank" rel="noopener">堺市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "sakai",
    title: "堺市の保育園の給食費・副食費はいくら？実費徴収の内訳",
    description:
      "堺市の保育園で実費徴収される給食費（副食費）の目安や免除条件について解説します。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育園の給食費（副食費）</h2>
<p>3〜5歳児の保育料は無償化されていますが、<span class="highlight">副食費（おかず・おやつ代）</span>は実費徴収されます。</p>

<h3>副食費の目安</h3>
<table>
<tr><th>対象</th><th>金額の目安</th></tr>
<tr><td>3〜5歳児（2号認定）</td><td>月額4,500円程度</td></tr>
<tr><td>1号認定（認定こども園）</td><td>園により異なる</td></tr>
</table>

<h2>副食費の免除条件</h2>
<ul>
<li><strong>年収360万円未満相当の世帯</strong>：副食費が免除</li>
<li><strong>第3子以降</strong>：副食費が免除（一定の条件あり）</li>
</ul>

<h2>その他の実費徴収</h2>
<ul>
<li>延長保育料</li>
<li>行事費</li>
<li>日用品費・教材費</li>
<li>布団リース代（園による）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料が無料でも、副食費やその他の実費で月5,000〜10,000円程度かかります。入園前に園に確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 39,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "sakai",
    title: "堺市の保育料はいくら？0〜2歳児の計算方法と目安",
    description:
      "堺市の0〜2歳児の保育料の計算方法、市民税額との関係、保育料の軽減制度を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の仕組み</h2>
<p>0〜2歳児の保育料は<span class="highlight">世帯の市民税所得割額</span>によって決まります。3〜5歳児は無償化により保育料無料です。</p>

<h3>保育料の決まり方</h3>
<ul>
<li>4月〜8月：前年度の市民税額をもとに決定</li>
<li>9月〜3月：当年度の市民税額をもとに決定</li>
</ul>

<h2>保育料の目安</h2>
<p>堺市の保育料は所得に応じて段階的に設定されています。具体的な金額は堺市が公表する保育料表で確認してください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料は毎年度改定される可能性があります。正確な金額は堺市の最新の保育料表をご確認ください。</p>
</div>

<h2>保育料の軽減制度</h2>
<ul>
<li><strong>きょうだい同時利用</strong>：第2子は半額、第3子以降は無料（一定の条件あり）</li>
<li><strong>市民税非課税世帯</strong>：保育料が無料</li>
<li><strong>ひとり親世帯</strong>：保育料が軽減される場合がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は世帯の市民税額で決まります。詳しい保育料表は堺市の子育て支援課の窓口やホームページで確認できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料表は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/" target="_blank" rel="noopener">堺市公式サイト</a>で公表されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "sakai",
    title: "堺市で保育料を安くするには？税金控除と軽減制度",
    description:
      "堺市で0〜2歳児の保育料を抑えるための税金の仕組みや軽減制度について解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料と市民税の関係</h2>
<p>堺市の0〜2歳児の保育料は世帯の市民税所得割額で決まります。市民税が低ければ保育料も安くなります。</p>

<h2>市民税所得割額を下げる方法</h2>
<ul>
<li><strong>iDeCo（個人型確定拠出年金）</strong>：掛金が全額所得控除になり、市民税が下がる</li>
<li><strong>医療費控除</strong>：出産費用や通院費が10万円を超えた場合に申告</li>
<li><strong>配偶者控除・扶養控除</strong>：適用漏れがないか確認</li>
<li><strong>生命保険料控除</strong>：保険に加入していれば控除対象</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ふるさと納税は税額控除であり、市民税所得割額の算定には影響しない場合があります。保育料の軽減には直接つながらないことがあるため、詳しくは市に確認してください。</p>
</div>

<h2>堺市の軽減制度</h2>
<ul>
<li><strong>多子軽減</strong>：第2子半額、第3子以降無料（条件あり）</li>
<li><strong>非課税世帯</strong>：保育料無料</li>
<li><strong>ひとり親世帯</strong>：保育料軽減あり</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料を下げるにはiDeCoが効果的です。毎月の掛金が全額所得控除になるため、市民税が下がり、結果的に保育料が安くなる可能性があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "sakai",
    title: "堺市の就労証明書 記入例【令和8年度版】書き方と注意点まとめ",
    description:
      "堺市の保育園申込みに必要な就労証明書の記入例を徹底解説。月間就労時間・日数の正しい書き方、よくある記入ミスTop5と対策チェックリスト、様式ダウンロード先まで網羅。令和8年度申込対応。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>就労証明書とは</h2>
<p>保育の必要性を証明する最も重要な書類です。勤務先に記入してもらう必要があります。</p>

<h2>入手方法</h2>
<ul>
<li>堺市公式サイトからダウンロード</li>
<li>各区の子育て支援課の窓口で入手</li>
</ul>

<h2>記入のポイント</h2>
<ul>
<li><strong>就労日数</strong>：月20日以上かつ週40時間以上であれば最高点（20点）</li>
<li><strong>就労時間</strong>：週の就労時間が正確に記入されているか確認</li>
<li><strong>雇用期間</strong>：有期雇用の場合は契約期間の記入が必要</li>
<li><strong>育休からの復帰予定日</strong>：育休復帰加点（+2点）に影響</li>
</ul>

<h2>勤務先への依頼のコツ</h2>
<ul>
<li><strong>早めに依頼する</strong>：人事部門の処理に2〜3週間かかることがある</li>
<li><strong>記入例を添える</strong>：堺市の記入例を一緒に渡すと間違いが減る</li>
<li><strong>締切を伝える</strong>：申込締切から逆算して依頼</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は保育園の点数を決める最も重要な書類です。記入内容に誤りがあると点数が下がる可能性があるため、受け取ったら必ず確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>様式は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/r7hoikumousikomi.html" target="_blank" rel="noopener">堺市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "shinsei-shorui-list",
    citySlug: "sakai",
    title: "堺市の保育園申込に必要な書類チェックリスト",
    description:
      "堺市の保育園申込に必要な書類を一覧にまとめました。状況別の追加書類や忘れがちな書類も解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>全員が必要な書類</h2>
<ul>
<li>施設型給付費・地域型保育給付費等教育・保育給付認定申請書兼利用申込書</li>
<li>保育が必要であることの証明書（就労証明書等）</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類のコピー</li>
</ul>

<h2>状況別の追加書類</h2>
<table>
<tr><th>状況</th><th>必要書類</th></tr>
<tr><td>就労中</td><td>就労証明書</td></tr>
<tr><td>自営業</td><td>就労証明書（自営用）＋開業届or確定申告書</td></tr>
<tr><td>育休中</td><td>就労証明書（育休期間の記載あり）</td></tr>
<tr><td>求職中</td><td>求職活動に関する申告書</td></tr>
<tr><td>疾病</td><td>医師の診断書</td></tr>
<tr><td>介護</td><td>介護状況申告書＋対象者の証明書</td></tr>
<tr><td>出産</td><td>母子健康手帳のコピー</td></tr>
<tr><td>就学中</td><td>在学証明書＋時間割</td></tr>
</table>

<h2>忘れがちな書類</h2>
<ul>
<li><strong>配偶者の就労証明書</strong>：父母双方の証明が必要</li>
<li><strong>課税証明書</strong>：転入者の場合に必要</li>
<li><strong>離婚関連書類</strong>：ひとり親加点を受ける場合</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>書類に不備があると受付されない場合があります。提出前に必ずチェックリストで確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類の詳細は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/r7hoikumousikomi.html" target="_blank" rel="noopener">堺市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 53,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "sakai",
    title: "堺市の2次利用調整の流れ　希望園変更のポイント",
    description:
      "堺市の保育園入園の2次利用調整のスケジュール、希望園変更の手続き、2次で内定を勝ち取るコツを解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>2次利用調整とは</h2>
<p>1次利用調整で保留（不承諾）になった方が対象です。希望園の変更・追加ができます。</p>

<h3>2次利用調整のスケジュール</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年2月上旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<h2>2次利用調整のポイント</h2>
<ul>
<li><strong>1次で空きが出た園を確認</strong>：1次の結果後に辞退者が出て空きが生じる場合がある</li>
<li><strong>人気園を避ける</strong>：1次で埋まった園は2次でもほぼ空きがない</li>
<li><strong>希望園を広げる</strong>：通える範囲でできるだけ多くの園を記入</li>
</ul>

<h2>希望園変更の手続き</h2>
<p>2次受付期間中にお住まいの区の子育て支援課で変更を届け出ます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次で保留になった方は自動的に2次の対象になります。希望園の変更がある場合のみ手続きが必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/r7hoikumousikomi.html" target="_blank" rel="noopener">堺市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "sakai",
    title: "堺市に転居する場合の保活　市外からの申込方法",
    description:
      "堺市に転居予定の方が市外から保育園に申し込む方法、必要書類、注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>市外からの申込方法</h2>
<p>堺市に転居予定で保育園に申し込む場合、転居先の住所が確定している必要があります。</p>

<h3>申込の流れ</h3>
<ol>
<li>転居先の住所がわかる書類（売買契約書、賃貸契約書等）を準備</li>
<li>現在お住まいの市区町村を通じて堺市に申込書類を送付</li>
<li>堺市の利用調整基準で選考される</li>
<li>内定の場合は入園月までに転入届を提出</li>
</ol>

<h2>必要な追加書類</h2>
<ul>
<li>転居先の住所がわかる書類のコピー</li>
<li>課税証明書（前住所地の市区町村が発行）</li>
</ul>

<h2>注意点</h2>
<ul>
<li>申込は現住所地の市区町村を経由する（広域利用）</li>
<li>転入が確認できない場合は内定取り消しになる可能性がある</li>
<li>堺市のスケジュールに間に合うように申込む必要がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>市外からの申込は手続きが複雑になります。早めに転居予定先の区の子育て支援課に相談して、必要な手続きを確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/r7hoikumousikomi.html" target="_blank" rel="noopener">堺市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "sakai",
    title: "堺市の「教育」と「保育」の違い　1号・2号・3号認定とは",
    description:
      "堺市の保育園・幼稚園・こども園で使われる1号・2号・3号認定の違いをわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>認定区分とは</h2>
<p>保育園や幼稚園、こども園を利用するには、市から「認定」を受ける必要があります。</p>

<h3>3つの認定区分</h3>
<table>
<tr><th>区分</th><th>対象年齢</th><th>条件</th><th>利用できる施設</th></tr>
<tr><td>1号認定（教育）</td><td>3〜5歳</td><td>保育の必要なし</td><td>幼稚園、認定こども園</td></tr>
<tr><td>2号認定（保育）</td><td>3〜5歳</td><td>保育の必要あり</td><td>保育園、認定こども園</td></tr>
<tr><td>3号認定（保育）</td><td>0〜2歳</td><td>保育の必要あり</td><td>保育園、認定こども園、小規模保育</td></tr>
</table>

<h2>「保育の必要性」とは</h2>
<p>以下のいずれかに該当する場合、保育の必要性が認められます。</p>
<ul>
<li>就労（月48時間以上）</li>
<li>妊娠・出産</li>
<li>疾病・障害</li>
<li>介護・看護</li>
<li>求職活動</li>
<li>就学</li>
<li>災害復旧</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>共働き家庭は2号または3号認定を取得して保育園に申し込みます。専業主婦（夫）家庭は1号認定で幼稚園やこども園の教育部分を利用できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "sakai",
    title: "堺市の保活カレンダー　月別やることリスト",
    description:
      "堺市で4月入園を目指す場合の月別の保活やることリスト。何をいつまでにやるべきかを時系列で整理しました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>月別やることリスト</h2>

<h3>4月〜6月：情報収集</h3>
<ul>
<li>堺市の保育制度を調べる</li>
<li>利用調整基準表で自分の点数を確認</li>
<li>候補となる園をリストアップ</li>
</ul>

<h3>7月〜9月：保育園見学</h3>
<ul>
<li>候補園に電話して見学予約</li>
<li>3〜5か所は見学する</li>
<li>見学メモを残して比較する</li>
</ul>

<h3>9月：書類準備開始</h3>
<ul>
<li>就労証明書を勤務先に依頼</li>
<li>その他必要書類を準備</li>
<li>書類の記入漏れをチェック</li>
</ul>

<h3>10月上旬〜11月上旬：申込書類の提出</h3>
<ul>
<li>お住まいの区の子育て支援課に提出</li>
<li>書類のコピーを手元に保管</li>
</ul>

<h3>1月下旬〜2月上旬：1次結果確認</h3>
<ul>
<li>1次利用調整の結果通知を確認</li>
<li>内定の場合は入園準備を開始</li>
<li>保留の場合は2次利用調整（2月）の検討</li>
</ul>

<h3>3月：入園準備</h3>
<ul>
<li>入園説明会に参加</li>
<li>持ち物の準備</li>
<li>慣らし保育のスケジュール確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書の依頼は9月には済ませましょう。人事部門の処理に時間がかかる場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "souba-tensuu",
    citySlug: "sakai",
    title: "堺市の保育園入園の相場点数　区別の目安",
    description:
      "堺市の区ごとの保育園入園に必要な相場点数の目安と、点数が足りない場合の対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>区別の相場点数</h2>
<p>堺市の入園に必要な点数の目安を区ごとにまとめました。あくまで参考値であり、年度や園によって異なります。</p>

<table>
<tr><th>区</th><th>0〜2歳児の目安</th><th>3歳児以上の目安</th></tr>
<tr><td>堺区</td><td><span class="highlight">44〜48点</span></td><td>40〜44点</td></tr>
<tr><td>北区</td><td><span class="highlight">44〜48点</span></td><td>40〜44点</td></tr>
<tr><td>西区</td><td>42〜46点</td><td>40〜42点</td></tr>
<tr><td>中区</td><td>40〜44点</td><td>40点前後</td></tr>
<tr><td>東区</td><td>40〜42点</td><td>40点前後</td></tr>
<tr><td>南区</td><td>40点前後</td><td>40点以下でも可能性あり</td></tr>
<tr><td>美原区</td><td>40点前後</td><td>40点以下でも可能性あり</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記はあくまで一般的な目安です。堺市は公式にボーダーラインを公表していません。実際の入園可否は年度の申込状況によって変動します。</p>
</div>

<h2>点数が足りない場合の対策</h2>
<ul>
<li>加点項目を漏れなく申告する</li>
<li>きょうだい同一施設（+4点）を活用する</li>
<li>認可外利用で+2点を確保する</li>
<li>南区・美原区など比較的入りやすいエリアも検討する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>堺区・北区の0〜2歳児は40点（フルタイム共働き）では足りないケースがあります。加点を積んで44点以上を目指しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "sakai",
    title: "堺市7区の保育園倍率比較　穴場エリアはどこ？",
    description:
      "堺市の7区（堺区・北区・西区・中区・東区・南区・美原区）ごとの保育園の入りやすさを詳しく比較します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>堺市7区の保育園事情</h2>
<p>堺市は7つの区で構成されており、区によって保育園の入りやすさが大きく異なります。</p>

<h3>区別の詳細分析</h3>
<table>
<tr><th>区</th><th>人口規模</th><th>入りやすさ</th><th>特徴</th></tr>
<tr><td>堺区</td><td>約15万人</td><td>激戦</td><td>市の中心部。マンション開発で子育て世帯が増加</td></tr>
<tr><td>北区</td><td>約16万人</td><td>激戦</td><td>中百舌鳥・百舌鳥エリアが特に人気</td></tr>
<tr><td>西区</td><td>約13万人</td><td>やや激戦</td><td>鳳駅周辺を中心に需要が高い</td></tr>
<tr><td>中区</td><td>約12万人</td><td>普通</td><td>住宅地が広がり比較的バランスが良い</td></tr>
<tr><td>東区</td><td>約8万人</td><td>やや穴場</td><td>初芝・萩原天神エリアは比較的空きがある</td></tr>
<tr><td>南区</td><td>約14万人</td><td>穴場</td><td>泉北ニュータウンを中心に定員に余裕がある</td></tr>
<tr><td>美原区</td><td>約4万人</td><td>穴場</td><td>郊外で比較的入りやすい</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記の人口は概数です。最新の人口データは堺市公式サイトでご確認ください。</p>
</div>

<h2>穴場エリアの活用法</h2>
<p>南区や美原区は比較的入りやすいですが、通勤の利便性も考慮する必要があります。泉北高速鉄道沿線なら難波方面へのアクセスも良好です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>北区・堺区で40点では入れない場合でも、東区や南区なら十分に入園の可能性があります。通勤ルートを見直して検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "sakai",
    title: "堺市で育休延長すると保育園に入れなくなる？-50点のリスク",
    description:
      "堺市で育休延長した場合の保育園入園への影響と、-50点になるリスクについて詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休延長と点数の関係</h2>
<p>堺市では「育休延長も許容できる」にチェックすると<span class="highlight">-50点</span>という非常に大きな減点になります。</p>

<h3>-50点の影響</h3>
<p>フルタイム共働き（40点）であっても、-50点で<span class="highlight">合計-10点</span>になります。事実上、入園は不可能です。</p>

<h2>なぜ-50点なのか</h2>
<p>「育休延長も許容できる」は「入園できなくても育休を延長する意思がある」と判断されます。本当に入園が必要な方を優先するための仕組みです。</p>

<h2>育休延長しても入園を目指すなら</h2>
<ul>
<li>「育休延長も許容できる」にチェックしない</li>
<li>入園月に復帰する意思を明確にする</li>
<li>復帰予定の就労証明書を提出する</li>
</ul>

<div class="warn-box">
<p><strong>重要</strong></p>
<p>雇用保険の育休給付金を延長する目的で不承諾通知が欲しい場合のみ「育休延長許容」にチェックしてください。本当に入園したい場合は絶対にチェックしないでください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休を2年まで延長しても、その後の4月入園で復帰する意思があれば通常の点数で選考されます。「延長許容」のチェックだけは絶対に避けましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 58,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "sakai",
    title: "堺市で保育園内定後の復職準備　慣らし保育と職場復帰",
    description:
      "堺市の保育園内定後にやるべき準備、慣らし保育のスケジュール、職場復帰に向けた段取りを解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>内定後のやることリスト</h2>
<ol>
<li><strong>入園説明会に参加</strong>：2〜3月に開催される</li>
<li><strong>持ち物の準備</strong>：園指定のサイズや名前つけ</li>
<li><strong>慣らし保育の日程調整</strong>：園と相談して決める</li>
<li><strong>職場への復帰日連絡</strong>：慣らし保育期間を考慮</li>
<li><strong>健康診断の受診</strong>：入園前に必要な場合がある</li>
</ol>

<h2>慣らし保育のスケジュール</h2>
<p>多くの園では1〜2週間の慣らし保育があります。</p>
<table>
<tr><th>期間</th><th>内容</th></tr>
<tr><td>1〜2日目</td><td>1〜2時間の短時間保育</td></tr>
<tr><td>3〜5日目</td><td>午前中〜給食まで</td></tr>
<tr><td>6日目〜1週間</td><td>午後（昼寝後）まで</td></tr>
<tr><td>2週目〜</td><td>通常保育</td></tr>
</table>

<h2>職場復帰のタイミング</h2>
<p>慣らし保育中は短時間しか預けられないため、復帰日は慣らし保育終了後にするのがベストです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月1日に入園しても、慣らし保育が終わるのは4月中旬〜下旬です。職場には「4月中旬復帰」で調整しておくと安心です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "sakai",
    title: "堺市で3人目の保活　多子世帯の優遇制度と注意点",
    description:
      "堺市で3人目以降の子どもの保育園入園に関する優遇制度、保育料の軽減、きょうだい加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>3人目以降の保育料</h2>
<p>堺市では多子世帯に対する保育料の軽減制度があります。</p>

<h3>保育料の軽減</h3>
<table>
<tr><th>対象</th><th>軽減内容</th></tr>
<tr><td>第2子</td><td>保育料半額</td></tr>
<tr><td>第3子以降</td><td>保育料無料</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>多子軽減の対象範囲（カウントする子の年齢や条件）は制度によって異なります。最新の条件は堺市にご確認ください。</p>
</div>

<h2>3人目の保活戦略</h2>
<ul>
<li><strong>上の子と同じ園を第1希望にする</strong>：きょうだい同一施設加点（+4点）＋同点時優先</li>
<li><strong>他の加点も積み上げる</strong>：育休復帰（+2点）、認可外利用（+2点）</li>
<li><strong>副食費も免除の可能性</strong>：第3子以降は副食費が免除される場合がある</li>
</ul>

<h2>点数の具体例</h2>
<p>フルタイム共働き（40点）＋きょうだい同一施設（+4点）＋育休復帰（+2点）＝<span class="highlight">46点</span></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3人目は保育料無料＋副食費免除の可能性があり、経済的なメリットが大きいです。きょうだい加点を活かして同じ園に入園を目指しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 44,
  },
  {
    slug: "tanshin-funin",
    citySlug: "sakai",
    title: "堺市で単身赴任中の保活　点数と手続きの注意点",
    description:
      "堺市で配偶者が単身赴任中の場合の保育園入園の点数や手続き上の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>単身赴任中の保活</h2>
<p>配偶者が単身赴任で不在の場合、実質的にひとり親と同様の状況です。堺市ではこの状況に対する取り扱いがあります。</p>

<h2>点数への影響</h2>
<p>堺市では、単身赴任の場合の具体的な取り扱いは個別の状況により判断されます。区の子育て支援課に相談して確認してください。</p>

<h2>必要書類</h2>
<ul>
<li>単身赴任の事実を証明する書類（勤務先の辞令等）</li>
<li>配偶者の就労証明書（赴任先での就労を証明）</li>
<li>住民票（世帯の状況を確認するため）</li>
</ul>

<h2>注意点</h2>
<ul>
<li>単身赴任でも配偶者の基準点は申込に反映される</li>
<li>「実質ひとり親」としての加点が適用されるかは個別判断</li>
<li>赴任先が遠方であることを示す資料があると有利</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任の取り扱いは個別の状況により異なります。事前にお住まいの区の子育て支援課に相談することをおすすめします。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 36,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "sakai",
    title: "堺市で祖父母と同居していると保育園に入りにくい？",
    description:
      "堺市で祖父母と同居している場合の保育園入園への影響と、同居でも不利にならないケースを解説します。",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>祖父母同居は不利になる？</h2>
<p>堺市では、同居の祖父母がいるだけで<span class="highlight">直接的に減点されることは基本的にありません</span>。ただし、同居の祖父母が保育可能な状態にあるかどうかは考慮される場合があります。</p>

<h2>祖父母が就労中の場合</h2>
<p>同居の祖父母がフルタイムで就労している場合や、65歳以上の場合は「保育が困難」と判断されるのが一般的です。この場合、不利にはなりません。</p>

<h2>祖父母が専業の場合</h2>
<p>同居の祖父母が健康で就労しておらず、保育が可能と判断されると、選考で不利になる可能性があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>祖父母の同居状況に関する取り扱いは年度によって変わる可能性があります。具体的な基準はお住まいの区の子育て支援課にお問い合わせください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>祖父母が就労中や健康上の理由で保育が困難な場合は、その状況を証明する書類を添付しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "sakai",
    title: "堺市で保育園の不承諾通知が届いたらすべきこと",
    description:
      "堺市の保育園入園選考で保留（不承諾）になった場合の対応手順と、次にやるべきことを解説します。",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>保留通知が届いたら</h2>
<p>1次利用調整の結果が「保留」だった場合、慌てずに次の行動を起こしましょう。</p>

<h3>すぐにやること</h3>
<ol>
<li><strong>2次利用調整の確認</strong>：2月の2次受付で希望園を変更・追加</li>
<li><strong>認可外保育施設の空き確認</strong>：電話で空き状況を問い合わせ</li>
<li><strong>企業主導型保育施設の確認</strong>：直接施設に問い合わせ</li>
<li><strong>勤務先に状況を報告</strong>：育休延長が必要になる可能性を伝える</li>
</ol>

<h2>不承諾通知の活用</h2>
<p>不承諾通知は<span class="highlight">育児休業給付金の延長申請</span>に必要な書類です。大切に保管してください。</p>

<h2>翌年度に向けた準備</h2>
<ul>
<li>認可外に預けて加点（+2点）を確保</li>
<li>翌年度の申込に向けて加点を最大化する準備</li>
<li>年度途中の空きが出たタイミングでの途中入園を狙う</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保留は次年度への布石にもなります。認可外に預けて加点を得ながら、翌年度の申込で確実に入園を目指しましょう。堺市では年度初から待機している場合にも+2点の加点があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "sakai",
    title: "堺市の待機児童対策と今後の保育施設整備計画",
    description:
      "堺市が実施している待機児童対策や保育施設の整備計画、今後の見通しについて解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>堺市の待機児童対策</h2>
<p>堺市は待機児童の解消に積極的に取り組んでおり、子ども青少年局が中心となって保育の質と量の確保を推進しています。</p>

<h3>主な取り組み</h3>
<ul>
<li><strong>保育施設の新設・増設</strong>：需要の多いエリアを中心に整備</li>
<li><strong>小規模保育事業の推進</strong>：0〜2歳児の受け皿を拡充</li>
<li><strong>保育士の確保</strong>：処遇改善や就職支援</li>
<li><strong>こども誰でも通園制度</strong>：令和8年度の本格実施に向けた準備</li>
</ul>

<h2>今後の課題</h2>
<ul>
<li>北区・堺区の人気園の偏り</li>
<li>保育士不足による定員活用の課題</li>
<li>少子化による将来的な定員過剰の見込み</li>
</ul>

<h2>こども誰でも通園制度</h2>
<p>保育所等に通っていない0歳6か月〜3歳未満の児童を対象に、定期的に保育を利用できる制度です。堺市でも対象施設の拡大が進められています。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育施策は<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/" target="_blank" rel="noopener">堺市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "sakai",
    title: "堺市の転園申請の方法　希望園を変えたいときの手続き",
    description:
      "堺市で通っている保育園から別の園に転園したい場合の申請方法、タイミング、注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>転園申請とは</h2>
<p>現在通っている保育園から別の園に移りたい場合に行う手続きです。引っ越しや通勤先の変更などが主な理由です。</p>

<h2>申請の手続き</h2>
<ol>
<li>お住まいの区の子育て支援課に転園希望を伝える</li>
<li>転園申請書を提出</li>
<li>通常の利用調整と同様に選考される</li>
<li>内定の場合は転園先の入園手続き</li>
</ol>

<h2>転園申請のタイミング</h2>
<ul>
<li><strong>4月転園</strong>：1次利用調整（10月〜11月）で新規申込と同時に選考</li>
<li><strong>途中転園</strong>：希望月の前月に申請</li>
</ul>

<h2>注意点</h2>
<ul>
<li>転園申請は新規申込と同じ利用調整基準で選考される</li>
<li>転園先が決まるまでは現在の園に通い続けられる</li>
<li>転園先に入れなかった場合も現在の園の在園は継続</li>
<li>人気園への転園は新規入園と同じくらい難しい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園は新規申込と同じ基準で選考されるため、人気園への転園は簡単ではありません。4月の一斉入園のタイミングが最も転園しやすい時期です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>転園の手続きは<a href="https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/r8/r7hoikumousikomi.html" target="_blank" rel="noopener">堺市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
];

registerArticles(articles);
