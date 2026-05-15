import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "ebina",
    title: "海老名市の保活スケジュール　申込から内定までの流れ",
    description:
      "海老名市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>海老名市の4月入園スケジュール</h2>
<p>海老名市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。海老名市保健福祉部保育・幼稚園課の案内を確認して準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>海老名市のホームページで保育園の一覧を確認します。市内には認可保育園が約25か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。ららぽーと海老名・ビナウォーク周辺は人気園が多いです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：申込書類の準備</strong>
<p>就労証明書などの必要書類を準備します。書類は保育・幼稚園課の窓口やホームページで入手できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>保育・幼稚園課窓口へ提出します。郵送での受付も行っています。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>海老名市は基礎点数が父母各最大20点（合計40点満点）です。月あたりの就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.ebina.kanagawa.jp/guide/kosodate/hoikuen/index.html" target="_blank" rel="noopener">海老名市保育・幼稚園課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "ebina",
    title: "海老名市の入園点数のしくみ　基礎点数と調整点数を解説",
    description:
      "海老名市の保育園入園選考で使われる基礎点数と調整点数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>海老名市の選考点数とは</h2>
<p>海老名市の認可保育園の入園選考は「基礎点数＋調整点数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 = 基礎点数（保護者1 + 保護者2）+ 調整点数</p>
</div>

<h2>基礎点数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">20点</span>になります。</p>

<table>
<tr><th>月の就労時間</th><th>点数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140〜160時間</td><td>18</td></tr>
<tr><td>月120〜140時間</td><td>16</td></tr>
<tr><td>月100〜120時間</td><td>14</td></tr>
<tr><td>月80〜100時間</td><td>12</td></tr>
<tr><td>月64〜80時間</td><td>10</td></tr>
</table>

<h2>調整点数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだいが在園中の施設を希望：<span class="highlight">+3点</span></li>
<li>認可外保育施設に預けている：<span class="highlight">+3点</span></li>
<li>生活保護受給世帯：<span class="highlight">+3点</span></li>
<li>産休・育休明けの復職：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>65歳未満の祖父母と同居：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
<li>市外からの申込：<span class="highlight">-10点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.ebina.kanagawa.jp/guide/kosodate/hoikuen/index.html" target="_blank" rel="noopener">海老名市保育・幼稚園課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "ebina",
    title: "海老名市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "海老名市の保育園入園選考で調整点数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基礎点数40点は出発点</h2>
<p>海老名市ではフルタイム共働き世帯は基礎点数<span class="highlight">40点</span>で横並びです。差がつくのは調整点数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが在園中の施設を希望</td></tr>
<tr><td>認可外保育施設利用</td><td>+3</td><td>月ぎめで認可外保育施設に預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護受給世帯</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>産休・育休明けで復職予定</td></tr>
<tr><td>きょうだい同時</td><td>+2</td><td>きょうだいと同時に申込み</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>海老名市はひとり親加点が+5点と大きいのが特徴です。また、65歳未満の祖父母との同居は-3点の減点があるので注意しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "ebina",
    title: "海老名市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "海老名市の保育園入園選考で点数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>海老名市では選考点数が同じ場合、以下の優先順位に基づいて入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>海老名市に住民登録がある方が優先</li>
<li>保育の必要度が高い世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の所得が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>海老名市は子育て世帯の転入が多く、特に海老名駅周辺の人気園は同点勝負になりやすいです。市外からの申込みは-10点の大幅減点があるため、転入予定がある場合は住民登録のタイミングに注意しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "ebina",
    title: "海老名市のパート・時短勤務の点数　何時間で何点？",
    description:
      "海老名市の保育園入園で、パートや時短勤務の場合にもらえる基礎点数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基礎点数</h2>
<p>海老名市では月あたりの就労時間で基礎点数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>月の就労時間</th><th>点数</th><th>勤務パターン例</th></tr>
<tr><td>月160時間以上</td><td>20</td><td>週5日・1日8時間以上</td></tr>
<tr><td>月140〜160時間</td><td>18</td><td>週5日・1日7時間程度</td></tr>
<tr><td>月120〜140時間</td><td>16</td><td>週5日・1日6時間程度</td></tr>
<tr><td>月100〜120時間</td><td>14</td><td>週5日・1日5時間程度</td></tr>
<tr><td>月80〜100時間</td><td>12</td><td>週4日・1日5時間程度</td></tr>
<tr><td>月64〜80時間</td><td>10</td><td>週4日・1日4時間程度</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園要件は月64時間以上の就労です。週3日・1日6時間程度で月72時間なら10点で申込み可能です。パート同士の共働きでも合計20点以上は確保できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "ebina",
    title: "海老名市で不承諾になったら　次にやるべきこと",
    description:
      "海老名市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>海老名市では4月一次選考の結果は2月上旬に届きます。不承諾の場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次募集に申し込む</strong>
<p>一次選考で空きが出た園を対象に二次募集が行われます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>5月以降の途中入園を申し込む</strong>
<p>毎月の利用調整に申込みが引き継がれます。退園者が出た場合に案内があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可外保育施設を利用する</strong>
<p>認可外施設に預けながら翌年度に再申込みすると、調整点数+3点の加点が得られます。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>二次募集や途中入園の情報は<a href="https://www.city.ebina.kanagawa.jp/guide/kosodate/hoikuen/index.html" target="_blank" rel="noopener">海老名市保育・幼稚園課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "ebina",
    title: "海老名市で認可外保育施設の加点を取る方法",
    description:
      "海老名市で認可外保育施設の利用による加点を得る方法と条件を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外保育施設の加点とは</h2>
<p>海老名市では認可外保育施設に月ぎめで預けている場合、調整点数が<span class="highlight">+3点</span>加算されます。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめ契約で預けていること</li>
<li>利用実績を証明する書類が必要</li>
<li>一時保育のみの利用は対象外</li>
</ul>

<h2>認可外を利用する戦略</h2>
<p>海老名市ではフルタイム共働きの基礎点数40点に加えて、認可外加点+3点を得ることで合計43点になります。育休復帰の+2点も合わせれば45点を確保できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外加点+3点は、1歳児クラスの激戦区では当落を分ける重要な加点です。不承諾を受けた場合に翌年度の加点として活用する保護者も多いです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "next-year-changes",
    citySlug: "ebina",
    title: "海老名市の保育園事情　最新動向と今後の見通し",
    description:
      "海老名市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>海老名市の保育園事情</h2>
<p>海老名市は人口約13.5万人。ららぽーと海老名やビナウォークの開業以降、子育て世帯の転入が続いています。市内には認可保育園が約25か所あります。</p>

<h2>最近の傾向</h2>
<ul>
<li>海老名駅周辺の再開発に伴うマンション建設で子育て世帯が増加</li>
<li>小規模保育事業の拡充による受入枠の拡大</li>
<li>企業主導型保育施設の増加</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>海老名駅周辺は特に競争が激しいエリアです。新設園やマンション併設園の情報は市のホームページでチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.ebina.kanagawa.jp/guide/kosodate/hoikuen/index.html" target="_blank" rel="noopener">海老名市保育・幼稚園課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "ebina",
    title: "海老名市の地域別・保育園の入りやすさ",
    description:
      "海老名市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>海老名市の地域特性</h2>
<p>海老名市は小田急線・相鉄線・JR相模線が乗り入れる交通の要衝です。地域によって保育園の競争率が異なります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>海老名駅周辺：ららぽーと海老名・ビナウォークがあり、ファミリー層に人気</li>
<li>さがみ野駅周辺：相鉄線沿線で通勤に便利なため共働き世帯が多い</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>社家・門沢橋エリア：JR相模線沿線で園の空きが出やすい</li>
<li>杉久保・中新田エリア：住宅地だが駅から離れているため競争率がやや低い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>海老名駅周辺の1歳児クラスは特に激戦です。通勤経路を考慮して少し離れた園も視野に入れると選択肢が広がります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "ebina",
    title: "海老名市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "海老名市の保育園入園に必要な点数の目安を解説します。エリア別の傾向もまとめました。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>海老名市の認可保育園は基礎点数40点満点に調整点数を加えた合計で選考されます。エリアやクラスによって必要な点数が変わります。</p>

<h3>人気エリアの目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>海老名駅周辺</td><td>43〜45点</td></tr>
<tr><td>さがみ野駅周辺</td><td>42〜44点</td></tr>
<tr><td>社家・門沢橋エリア</td><td>40〜42点</td></tr>
</table>

<p>人気園ではフルタイム共働き（40点）だけでは足りず、認可外利用の+3点やきょうだい在園の+3点などの加点が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は過去の傾向をもとにした参考値です。海老名市は子育て世帯の転入が多く、年度によって競争率が変動します。最新の情報は保育・幼稚園課に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
];

registerArticles(articles);
