import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "yamaguchi",
    title: "山口市の保活スケジュール　令和8年度4月入園の流れを解説",
    description:
      "山口市の認可保育園の申込時期・選考の流れ・内定通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>山口市の4月入園は、<strong>1次利用調整</strong>と<strong>2次利用調整</strong>の2段階で行われます。人口約19.5万人の山口県の県庁所在地である山口市では、湯田温泉周辺や新山口駅エリアを中心に保育需要が高まっています。</p>

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
<p>山口市こども未来部保育幼稚園課が公表する保育施設情報を確認しましょう。市内には認可保育園が約30か所あります。</p>
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
<p>山口市が公表する「利用のご案内」を確認し、申込に必要な書類を揃えましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>就労証明書などの書類を揃えて、山口市こども未来部保育幼稚園課に提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>年度途中の各月1日付利用開始を希望する場合、<span class="highlight">前月の10日頃</span>が申込締切日です。詳しい日程は山口市のホームページで確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.yamaguchi.lg.jp/soshiki/50/" target="_blank" rel="noopener">山口市公式サイト「こども未来部保育幼稚園課」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 点数・選考 (3) =====
  {
    slug: "scoring-system",
    citySlug: "yamaguchi",
    title: "山口市の保育園の点数はどう決まる？基準指数と調整指数をやさしく解説",
    description:
      "山口市の保育園入園の「利用調整基準」について、基準指数と調整指数の仕組みをわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>山口市の点数の仕組み</h2>
<p>山口市の保育園入園の選考は<strong>「基準指数（父母合計）＋調整指数＝世帯の合計点数」</strong>で行われます。</p>

<h3>基準指数とは？</h3>
<p>保護者それぞれの「保育が必要な理由」に応じた点数です。父母各最大20点で合計40点満点です。</p>
<table>
<tr><th>保育が必要な理由</th><th>点数の範囲</th></tr>
<tr><td>就労</td><td>8〜20点</td></tr>
<tr><td>疾病</td><td>14〜20点</td></tr>
<tr><td>障害</td><td>10〜20点</td></tr>
<tr><td>介護・看護</td><td>12〜16点</td></tr>
<tr><td>出産</td><td>12点</td></tr>
<tr><td>就学</td><td>8〜16点</td></tr>
<tr><td>求職活動</td><td>6点</td></tr>
</table>

<h3>調整指数とは？</h3>
<p>世帯の状況に応じてプラスまたはマイナスされる点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親</td><td>+5</td></tr>
<tr><td>きょうだいが在園中</td><td>+3</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td></tr>
<tr><td>認可外保育施設を利用</td><td>+3</td></tr>
<tr><td>育休復帰予定</td><td>+2</td></tr>
<tr><td>生活保護世帯</td><td>+3</td></tr>
<tr><td>市外からの申込</td><td><span class="highlight">-10</span></td></tr>
<tr><td>同居の祖父母あり</td><td>-3</td></tr>
<tr><td>認可園からの転園</td><td>-5</td></tr>
</table>

<div class="point-box">
<p><strong>重要ポイント</strong></p>
<p>山口市外から申し込む場合は<strong>-10点</strong>の大きな減点になります。市内在住であることが入園には非常に重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の基準は<a href="https://www.city.yamaguchi.lg.jp/soshiki/50/" target="_blank" rel="noopener">山口市こども未来部保育幼稚園課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 90,
  },
  {
    slug: "douten-taisaku",
    citySlug: "yamaguchi",
    title: "山口市で同点になったらどうなる？同点時の優先順位と対策",
    description:
      "山口市の保育園入園で同じ点数になった場合の優先順位ルールと、差をつけるための具体的な対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同じ点数の場合の優先順位</h2>
<p>山口市では合計点数が同じ場合、以下の順で優先されます。</p>

<ol>
<li><strong>基準指数の合計点が高い</strong>（調整指数を除いた基本の点数）</li>
<li><strong>きょうだいが在園中</strong></li>
<li><strong>ひとり親世帯</strong></li>
<li><strong>所得が低い世帯</strong></li>
</ol>

<h2>同点対策のポイント</h2>
<ul>
<li>調整指数は全て漏れなく申告する</li>
<li>認可外保育施設を利用して加点を得る（+3点）</li>
<li>きょうだいが在園中の園を希望する（+3点＋同点時優先）</li>
<li>希望園を多めに書いて内定確率を上げる</li>
<li>新山口駅周辺の人気園だけでなく、郊外の空きがある園も候補に入れる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山口市は認可外利用の加点が+3点と比較的大きいため、入園前に認可外を利用しておくことが有効な対策になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.yamaguchi.lg.jp/soshiki/50/" target="_blank" rel="noopener">山口市こども未来部保育幼稚園課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 80,
  },
  {
    slug: "fulltime-score",
    citySlug: "yamaguchi",
    title: "山口市でフルタイム共働きは何点？40点の内訳と加点のコツ",
    description:
      "山口市でフルタイム共働き世帯が何点になるのか、40点の内訳と調整指数で差をつける方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>フルタイム共働きの基本点数</h2>
<p>山口市では、両親ともに<strong>月160時間以上</strong>の就労で、基準指数は<strong>父20点＋母20点＝40点</strong>になります。</p>

<h3>フルタイム＋調整指数の例</h3>
<table>
<tr><th>状況</th><th>合計点</th></tr>
<tr><td>フルタイム共働き（調整なし）</td><td>40点</td></tr>
<tr><td>＋ きょうだい在園中</td><td>43点</td></tr>
<tr><td>＋ 認可外利用</td><td>43点</td></tr>
<tr><td>＋ ひとり親</td><td>45点</td></tr>
<tr><td>＋ きょうだい在園＋育休復帰＋認可外利用</td><td>48点</td></tr>
</table>

<h2>調整指数で差をつけるには</h2>
<ul>
<li><strong>ひとり親（+5）</strong>：最も大きな加点項目</li>
<li><strong>きょうだい在園中（+3）</strong>：きょうだいが在園中なら忘れずに申告</li>
<li><strong>認可外利用（+3）</strong>：認可外保育施設に月ぎめで預けていれば加点</li>
<li><strong>育休復帰（+2）</strong>：入園月に復帰する予定があれば申告</li>
<li><strong>生活保護（+3）</strong>：該当すれば加点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山口市ではフルタイム共働き40点が多くの世帯のベースラインです。調整指数をどれだけ積み上げられるかが合否を分けます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 85,
  },

  // ===== 地域情報 (2) =====
  {
    slug: "popular-areas",
    citySlug: "yamaguchi",
    title: "山口市で保育園に入りやすいエリアは？地域別の激戦度を分析",
    description:
      "山口市の地域別に保育園の入りやすさを比較。新山口駅周辺の激戦エリアと穴場エリアの特徴を解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>山口市の地域別の保育園事情</h2>
<p>山口市は山口県の県庁所在地で、湯田温泉や瑠璃光寺五重塔で知られる歴史ある街です。新山口駅周辺の再開発が進み、子育て世帯の流入が増えています。</p>

<h3>激戦度マップ</h3>
<table>
<tr><th>エリア</th><th>激戦度</th><th>特徴</th></tr>
<tr><td>新山口駅周辺（小郡）</td><td>激戦</td><td>再開発で人口増加中。新幹線駅の利便性で子育て世帯に人気</td></tr>
<tr><td>湯田温泉・山口駅周辺</td><td>激戦</td><td>市の中心部。商業施設や県庁が近く需要が高い</td></tr>
<tr><td>大歳・矢原エリア</td><td>やや激戦</td><td>住宅地が広がり子育て世帯が多い</td></tr>
<tr><td>吉敷・維新公園周辺</td><td>普通</td><td>大型商業施設があり生活利便性が高い</td></tr>
<tr><td>大内・仁保エリア</td><td>やや穴場</td><td>郊外の住宅地で比較的空きがある</td></tr>
<tr><td>秋穂・阿知須・徳地エリア</td><td>穴場</td><td>旧町部で定員に余裕がある園が多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新山口駅周辺や湯田温泉エリアは40点でも入れない園がありますが、秋穂・阿知須方面なら比較的余裕があります。車通勤が主流の山口市では、通勤ルートも考慮してエリアを検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },
  {
    slug: "shogaikibo-hoiku",
    citySlug: "yamaguchi",
    title: "山口市の小規模保育事業とは？メリットと3歳の壁の対策",
    description:
      "山口市の小規模保育事業の特徴、メリット・デメリット、3歳以降の預け先確保について解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象にした、定員6〜19名の小さな保育施設です。山口市でも複数の小規模保育事業所があり、認可保育園より入りやすい傾向にあります。</p>

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
<p>山口市の小規模保育事業所一覧は<a href="https://www.city.yamaguchi.lg.jp/soshiki/50/" target="_blank" rel="noopener">山口市こども未来部保育幼稚園課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // ===== 育休・復職 (2) =====
  {
    slug: "ikukyu-fukki",
    citySlug: "yamaguchi",
    title: "山口市で育休明けに保育園に入るには？復帰加点と注意点",
    description:
      "山口市で育児休業から復帰する際の保育園申込のポイント。育休復帰加点の条件と申請の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰の加点（+2点）</h2>
<p>山口市では、育児休業を取得し、<strong>入園する月に職場復帰する</strong>場合に+2点の調整指数が加算されます。</p>

<h3>加点の条件</h3>
<ul>
<li>育児休業を取得中であること</li>
<li>入園月に復帰すること（復帰予定証明が必要）</li>
<li>就労先が確定していること</li>
</ul>

<h3>育休中の基準指数</h3>
<p>育児休業中は基準指数として16点が付きます。復帰後のフルタイム勤務の20点より低いため、<strong>復帰予定として就労の20点＋育休復帰加点2点で申し込む方が有利</strong>です。</p>

<div class="point-box">
<p><strong>重要</strong></p>
<p>就労証明書に復帰予定日を記載してもらうことで、育休中でもフルタイムの20点として扱われます。勤務先に必ず確認しましょう。</p>
</div>

<h2>育休復帰のスケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>入園の6か月前：勤務先に就労証明書を依頼</strong>
<p>復帰予定日を記載してもらいましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>申込締切まで：書類をそろえて提出</strong>
<p>育休復帰の加点を受けるには、復帰予定が明記された書類が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>入園月：職場復帰</strong>
<p>入園月中に復帰できない場合、内定取消しになる可能性があるため注意しましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.yamaguchi.lg.jp/soshiki/50/" target="_blank" rel="noopener">山口市こども未来部保育幼稚園課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "jitan-kinmu-score",
    citySlug: "yamaguchi",
    title: "山口市で時短勤務だと何点？パートとの違いと加点の工夫",
    description:
      "山口市で時短勤務の場合の基準指数と、パートタイムとの違い、調整指数で補うための具体策を解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>時短勤務の場合の点数</h2>
<p>山口市では就労の基準指数は月あたりの就労時間で決まります。</p>

<table>
<tr><th>勤務条件</th><th>点数</th></tr>
<tr><td>月160時間以上</td><td>20点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16点</td></tr>
<tr><td>月80時間以上120時間未満</td><td>12点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>8点</td></tr>
</table>

<h3>時短勤務とパートタイムの違い</h3>
<p>時短勤務の場合、月140時間以上であれば18点、月120時間以上なら16点になります。パートタイムで月80時間程度なら12点になる可能性があります。</p>

<h2>調整指数で補うには</h2>
<ul>
<li>きょうだい在園中（+3）で合計を上げる</li>
<li>認可外保育施設を利用して加点（+3）を得る</li>
<li>育休復帰加点（+2）が使えないか確認する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>時短勤務でも月140時間以上勤務していれば18点になり、フルタイムとの差は2点だけです。調整指数で十分にカバーできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // ===== 施設選び (1) =====
  {
    slug: "nintei-kodomo-en",
    citySlug: "yamaguchi",
    title: "山口市の認定こども園と保育園の違いは？選び方のポイント",
    description:
      "山口市には認定こども園と保育園の両方があります。それぞれの違いと選び方のポイントを解説します。",
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

<h3>山口市での選び方のポイント</h3>
<ul>
<li>自家用車での通園ルートに無理がないか（山口市は車社会）</li>
<li>延長保育の時間帯が合うか</li>
<li>園庭があるか、広さは十分か</li>
<li>給食か弁当か</li>
<li>行事の頻度と保護者の負担</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山口市では認定こども園も保育園も同じ利用調整基準で選考されます。施設の種類よりも、通いやすさや教育方針で選ぶのがおすすめです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== 手続き (1) =====
  {
    slug: "hitsuyo-shorui",
    citySlug: "yamaguchi",
    title: "山口市の保育園申込に必要な書類リスト　忘れがちな書類も解説",
    description:
      "山口市の保育園申込に必要な書類を一覧にまとめました。忘れがちな書類や注意点も解説します。",
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

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類の不備があると受付されない場合があります。提出前に山口市こども未来部保育幼稚園課の窓口で確認することをおすすめします。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の必要書類は<a href="https://www.city.yamaguchi.lg.jp/soshiki/50/" target="_blank" rel="noopener">山口市こども未来部保育幼稚園課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
];

registerArticles(articles);
