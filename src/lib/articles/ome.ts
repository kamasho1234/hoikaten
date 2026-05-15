import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "ome",
    title: "青梅市の保活スケジュール　申込から内定までの流れ",
    description:
      "青梅市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>青梅市の4月入園スケジュール</h2>
<p>青梅市の認可保育園は毎年11月頃に翌年度4月入園の一次募集を受付けます。青梅市子ども家庭部子育て推進課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>青梅市公式サイトで保育園の一覧や前年度の入園案内を確認します。青梅市には認可保育園が約20か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。青梅市は多摩西部に位置し、自然豊かな環境の園が多いのが特徴です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：入園案内入手・書類準備</strong>
<p>最新の入園案内を入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月：申込書類の提出</strong>
<p>青梅市子ども家庭部子育て推進課へ提出します。郵送での提出も可能です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青梅市は基本指数が父母各最大20点（合計40点満点）です。月あたりの就労日数と1日あたりの就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.ome.tokyo.jp/soshiki/33/44.html" target="_blank" rel="noopener">青梅市公式サイト 保育園入園案内</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "ome",
    title: "青梅市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "青梅市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>青梅市の選考指数とは</h2>
<p>青梅市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ日8時間以上の就労で満点の<span class="highlight">20点</span>になります。月あたりの日数と1日あたりの時間の組み合わせで判定するのが青梅市の特徴です。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上かつ日6時間以上</td><td>18</td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td>16</td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td>14</td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだい在園中：<span class="highlight">+3点</span></li>
<li>認可外保育施設利用：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>育児休業から復帰予定：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.ome.tokyo.jp/soshiki/33/44.html" target="_blank" rel="noopener">青梅市公式サイト 保育園入園案内</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "score-up-tips",
    citySlug: "ome",
    title: "青梅市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "青梅市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>青梅市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の部分です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月ぎめで預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護を受給している</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業を取得し入園月に復帰する</td></tr>
</table>

<h2>認可外保育施設の活用</h2>
<p>認可外保育施設に月ぎめで預けていると+3点の加点が得られます。認証保育所やベビーシッターの月ぎめ利用も対象になる場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青梅市は月あたりの就労日数と1日の就労時間で点数が変わります。月16日以上かつ日6時間以上なら16点ですが、月20日以上にすれば18点にアップできます。勤務日数を増やせるか勤務先に相談してみましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "ome",
    title: "青梅市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "青梅市の保育園入園選考で指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>青梅市では選考指数が同点になった場合、以下の優先順位で入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>青梅市在住者が優先</li>
<li>保育の必要性が高い世帯（ひとり親など）</li>
<li>きょうだいの在園状況</li>
<li>所得が低い世帯</li>
<li>希望園の順位が高い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青梅市では同点の場合に所得階層が考慮されます。世帯年収が高い場合は特に加点を確実に取ることが重要です。</p>
</div>

<h2>希望園数は多めに</h2>
<p>青梅市では希望園を多く書いても不利にはなりません。通える範囲の園はすべて記入しましょう。青梅市は面積が広いため、自家用車での送迎も含めて検討するとよいでしょう。</p>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "part-time-work-score",
    citySlug: "ome",
    title: "青梅市のパート・時短勤務の点数　何日・何時間で何点？",
    description:
      "青梅市の保育園入園で、パートや時短勤務の場合にもらえる基本指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基本指数</h2>
<p>青梅市では月あたりの就労日数と1日あたりの就労時間で基本指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>勤務パターン例</th><th>条件</th><th>指数</th></tr>
<tr><td>週5日×8時間</td><td>月20日以上かつ日8時間以上</td><td>20</td></tr>
<tr><td>週5日×6時間</td><td>月20日以上かつ日6時間以上</td><td>18</td></tr>
<tr><td>週4日×6時間</td><td>月16日以上かつ日6時間以上</td><td>16</td></tr>
<tr><td>週4日×5時間</td><td>月16日以上かつ日4時間以上</td><td>14</td></tr>
<tr><td>週3日×5時間</td><td>月12日以上かつ日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上（上記以外）</td><td>月64時間以上</td><td>10</td></tr>
</table>

<h2>パートで入園するには</h2>
<p>週3日・1日5時間のパートなら月12日以上かつ日4時間以上で<span class="highlight">12点</span>です。フルタイム20点との差は8点。調整指数でカバーできる範囲ですが、人気園では厳しい場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青梅市の入所要件は月64時間以上の就労です。これを下回ると申込みそのものができません。時短勤務でも月64時間を超えていれば申込可能です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "rejection-options",
    citySlug: "ome",
    title: "青梅市で不承諾になったら　次にやるべきこと",
    description:
      "青梅市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>青梅市では4月一次選考の結果が1月下旬〜2月上旬に届きます。不承諾だった場合の選択肢を整理しましょう。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む（2月〜3月）</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する</li>
<li>幼稚園の預かり保育を検討する</li>
</ul>

<h2>二次募集のポイント</h2>
<p>二次募集は辞退などで空きが出た園に申し込めます。一次募集で定員に達しなかった園や、内定辞退があった園が対象です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に月ぎめで預けてから翌年度に再申込すると、+3点の加点がもらえます。長い目で見た戦略が大切です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>二次募集の情報は<a href="https://www.city.ome.tokyo.jp/soshiki/33/44.html" target="_blank" rel="noopener">青梅市公式サイト</a>で随時更新されます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "ome",
    title: "青梅市で認可外加点を取る方法　対象施設と条件",
    description:
      "青梅市で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外加点とは</h2>
<p>青梅市では認可外保育施設に月ぎめで預けている場合、調整指数として<span class="highlight">+3点</span>が加算されます。</p>

<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>認可外保育施設に月ぎめで預けている</td><td>+3点</td></tr>
</table>

<h2>対象となる施設</h2>
<ul>
<li>認証保育所</li>
<li>認可外保育施設（東京都に届出済みのもの）</li>
<li>ベビーシッター（月ぎめ契約の場合）</li>
</ul>

<h2>注意点</h2>
<p>一時保育やスポット利用は対象外です。月ぎめ契約であることが条件です。また、費用は全額自己負担となるため、加点のためだけに利用するかどうかは費用対効果を考えて判断しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.ome.tokyo.jp/soshiki/33/44.html" target="_blank" rel="noopener">青梅市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "popular-areas",
    citySlug: "ome",
    title: "青梅市の地域別・保育園の入りやすさ",
    description:
      "青梅市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>青梅市の地域特性</h2>
<p>青梅市は人口約13万人、多摩西部に位置する自然豊かな市です。JR青梅線沿線を中心に住宅地が広がり、地域によって保育園の入りやすさに差があります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>河辺駅周辺：市内最大の商業エリアで若い世帯が多い</li>
<li>東青梅駅周辺：市役所周辺で利便性が高い</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>青梅駅以西エリア：人口が少なく定員に余裕がある園もある</li>
<li>梅郷・沢井方面：自然環境が魅力だが通勤距離がネック</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青梅市は面積が広いため、自家用車での送迎を前提にすると選択肢が広がります。駅近の園だけでなく、少し離れた園も検討してみましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育園の一覧と空き状況は<a href="https://www.city.ome.tokyo.jp/soshiki/33/44.html" target="_blank" rel="noopener">青梅市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "competition-reality",
    citySlug: "ome",
    title: "青梅市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "青梅市の保育園入園に必要な点数の目安を解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>青梅市では人気の園ではフルタイム共働き（基本指数40点）だけでは入れないケースもあります。調整指数の加点が勝負を分けます。</p>

<h3>目安</h3>
<table>
<tr><th>エリア・クラス</th><th>目安の点数</th></tr>
<tr><td>河辺駅周辺（1歳児）</td><td>41〜43点以上</td></tr>
<tr><td>東青梅駅周辺（1歳児）</td><td>40〜42点</td></tr>
<tr><td>青梅駅以西（1歳児）</td><td>40点前後</td></tr>
<tr><td>0歳児クラス</td><td>40点前後</td></tr>
</table>

<p>1歳児クラスは最も競争が激しいクラスです。0歳児や3歳児クラスは比較的入りやすい傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青梅市は多摩地域の中では比較的保育園に入りやすい自治体です。フルタイム共働き40点に加点が1〜3点あれば、多くの園で内定が期待できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の募集状況は<a href="https://www.city.ome.tokyo.jp/soshiki/33/44.html" target="_blank" rel="noopener">青梅市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "next-year-changes",
    citySlug: "ome",
    title: "青梅市の保育園事情　最新動向と今後の見通し",
    description:
      "青梅市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>青梅市の保育園整備</h2>
<p>青梅市は子育て支援の充実を掲げ、保育施設の整備を進めています。青梅マラソンで有名なこの街は、自然豊かな環境での子育てを求める世帯にも人気があります。</p>

<h2>最近の傾向</h2>
<ul>
<li>河辺駅周辺の再開発に伴う保育需要の増加</li>
<li>小規模保育事業所の整備による0〜2歳児の受け皿拡大</li>
<li>青梅市子ども家庭部子育て推進課による相談体制の充実</li>
</ul>

<h2>青梅市の子育て環境</h2>
<p>青梅市は都心へのアクセスはやや遠いものの、家賃・住宅費が抑えられ、自然に囲まれた環境で子育てができる点が魅力です。保育園の競争率も23区に比べると低く、保活の負担は比較的軽い自治体です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新設園は初年度に空きが出やすいため、保活では要チェックです。青梅市の最新の募集数は公式サイトで確認できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育園情報は<a href="https://www.city.ome.tokyo.jp/soshiki/33/44.html" target="_blank" rel="noopener">青梅市公式サイト 保育園入園案内</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
