import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "chigasaki",
    title: "茅ヶ崎市の保活スケジュール　申込から内定までの流れ",
    description:
      "茅ヶ崎市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>茅ヶ崎市の4月入園スケジュール</h2>
<p>茅ヶ崎市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。茅ヶ崎市こども育成部保育課が窓口です。市内には認可保育園が約35か所あり、湘南エリアの中でも子育て世代に人気の街です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>茅ヶ崎市のホームページで保育園の一覧と入園案内を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。茅ヶ崎は海沿いの園から駅近の園まで特色がさまざまです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書などの必要書類を準備します。勤務先への依頼は早めに行いましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>保育課窓口または郵送で提出します。締切日は厳守です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茅ヶ崎市は基本指数が父母各最大20点（合計40点満点）です。月あたりの勤務日数と1日あたりの勤務時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.chigasaki.kanagawa.jp/kosodate/hoikuen/" target="_blank" rel="noopener">茅ヶ崎市こども育成部保育課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "chigasaki",
    title: "茅ヶ崎市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "茅ヶ崎市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>茅ヶ崎市の選考点数とは</h2>
<p>茅ヶ崎市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。人口約24.3万人の茅ヶ崎市では、子育て世代の流入が続いており選考の理解が重要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ日8時間以上で満点の<span class="highlight">20点</span>になります。</p>

<table>
<tr><th>勤務状況</th><th>点数</th></tr>
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
<li>きょうだい在園：<span class="highlight">+3点</span></li>
<li>認可外利用中：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>育休復帰予定：<span class="highlight">+2点</span></li>
<li>同時申込：<span class="highlight">+2点</span></li>
<li>同居親族あり：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
<li>市外在住：<span class="highlight">-10点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.chigasaki.kanagawa.jp/kosodate/hoikuen/" target="_blank" rel="noopener">茅ヶ崎市こども育成部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "chigasaki",
    title: "茅ヶ崎市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "茅ヶ崎市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>茅ヶ崎市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月ぎめで預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護受給世帯</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申込む</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育休明けで復職予定</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茅ヶ崎市はひとり親加点が+5点と大きいのが特徴です。認可外利用ときょうだい在園もそれぞれ+3点で、複数の加点を組み合わせることが重要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "chigasaki",
    title: "茅ヶ崎市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "茅ヶ崎市の保育園入園選考で点数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>茅ヶ崎市では選考点数が同じ場合、以下の優先順位に基づいて入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>茅ヶ崎市に住民登録がある方が優先</li>
<li>保育の必要度が高い世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の課税額が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茅ヶ崎市はサーフカルチャーで知られる湘南の街ですが、茅ヶ崎駅周辺のマンション開発により子育て世代が増加しています。人気園では同点勝負になりやすいため、調整指数で1点でも多く積み上げることが大切です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "chigasaki",
    title: "茅ヶ崎市のパート・時短勤務の点数　何日・何時間で何点？",
    description:
      "茅ヶ崎市の保育園入園で、パートや時短勤務の場合にもらえる基本指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基本指数</h2>
<p>茅ヶ崎市では月あたりの勤務日数と1日あたりの勤務時間の組み合わせで基本指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>勤務状況</th><th>点数</th><th>勤務パターン例</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td>20</td><td>週5日・フルタイム</td></tr>
<tr><td>月20日以上かつ日6時間以上</td><td>18</td><td>週5日・時短6時間</td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td>16</td><td>週4日・1日6時間以上</td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td>14</td><td>週4日・1日4〜6時間</td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td>12</td><td>週3日・1日4時間以上</td></tr>
<tr><td>月64時間以上</td><td>10</td><td>上記に該当しない月64時間以上</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茅ヶ崎市は日数と時間数の両方で判定される点が特徴です。たとえば週5日勤務でも1日6時間未満だと18点ではなく下の区分になる場合があります。勤務条件をしっかり確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "chigasaki",
    title: "茅ヶ崎市で不承諾になったら　次にやるべきこと",
    description:
      "茅ヶ崎市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>茅ヶ崎市では4月一次選考の結果は2月上旬に届きます。不承諾の場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む（2月下旬〜3月）</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設に預けながら翌年度に再申込する</li>
<li>茅ヶ崎市の小規模保育事業を検討する</li>
</ul>

<h2>認可外利用で翌年度の加点を狙う</h2>
<p>認可外保育施設に月ぎめで預けていると、翌年度の申込時に調整指数で<span class="highlight">+3点</span>が加算されます。不承諾であっても翌年の保活に向けた戦略になります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>二次募集や途中入園の情報は<a href="https://www.city.chigasaki.kanagawa.jp/kosodate/hoikuen/" target="_blank" rel="noopener">茅ヶ崎市こども育成部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "chigasaki",
    title: "茅ヶ崎市で認可外保育施設の加点を取る方法",
    description:
      "茅ヶ崎市で認可外保育施設の利用による加点を得る方法を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外保育施設加点とは</h2>
<p>茅ヶ崎市では認可外保育施設に月ぎめ契約で預けている場合、調整指数が<span class="highlight">+3点</span>加算されます。フルタイム共働き世帯が横並びの中で、この加点は選考結果を左右します。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめ契約で預けていること</li>
<li>申込時点で利用実績があること</li>
<li>一時保育のみの利用は対象外</li>
</ul>

<h2>費用対効果を考える</h2>
<p>認可外保育施設の保育料は月5〜8万円程度が相場です。入園できれば認可園の保育料は世帯年収に応じた金額になるため、長期的に見れば認可外に預ける数か月間の出費は回収できるケースが多いです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外加点+3と育休復帰+2を合わせれば+5点。茅ヶ崎市での保活では、この加点の積み上げが当落を分けます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "next-year-changes",
    citySlug: "chigasaki",
    title: "茅ヶ崎市の保育園事情　最新動向と今後の見通し",
    description:
      "茅ヶ崎市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>茅ヶ崎市の保育園事情</h2>
<p>人口約24.3万人の茅ヶ崎市は、湘南のサーフカルチャーで知られる一方、東京・横浜へのアクセスのよさから子育て世代にも人気の街です。市内には認可保育園が約35か所あります。</p>

<h2>最近の傾向</h2>
<ul>
<li>茅ヶ崎駅北口周辺の再開発に伴う新規保育園の開設</li>
<li>小規模保育事業の拡充</li>
<li>待機児童数は減少傾向だが、1歳児クラスは依然として競争が厳しい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茅ヶ崎駅周辺は特に競争が激しい地域です。新設園の情報はこども育成部保育課のホームページでチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.chigasaki.kanagawa.jp/kosodate/hoikuen/" target="_blank" rel="noopener">茅ヶ崎市こども育成部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "chigasaki",
    title: "茅ヶ崎市の地域別・保育園の入りやすさ",
    description:
      "茅ヶ崎市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>茅ヶ崎市の地域特性</h2>
<p>茅ヶ崎市は海沿いの南部から内陸の北部まで広がり、地域によって保育園の競争率が異なります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>茅ヶ崎駅周辺：交通の便がよくマンション開発が進む人気エリア</li>
<li>海沿い（サザンビーチ周辺）：湘南ライフを求めるファミリー層が集中</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>北茅ヶ崎・香川エリア：駅からは離れるが園の数が一定数ある</li>
<li>小出・松林エリア：住宅地として落ち着いたエリアで穴場</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茅ヶ崎市では各園の入所内定最低指数を公開しています。希望園を決める前に、過去の内定最低指数を確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "chigasaki",
    title: "茅ヶ崎市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "茅ヶ崎市の保育園入園に必要な点数の目安を、内定最低指数をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>茅ヶ崎市は各園の入所内定最低指数を公開しています。これを参考に自分の点数と比較できます。</p>

<h3>人気エリアの目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>茅ヶ崎駅周辺</td><td>43〜45点</td></tr>
<tr><td>海沿い南部</td><td>42〜44点</td></tr>
<tr><td>北茅ヶ崎・香川</td><td>40〜42点</td></tr>
</table>

<p>人気園ではフルタイム共働き（40点）だけでは足りず、認可外利用の+3点やきょうだい在園の+3点などの加点が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は過去の傾向をもとにした参考値です。最新の内定最低指数は茅ヶ崎市のホームページで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
];

registerArticles(articles);
