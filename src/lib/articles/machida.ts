import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "machida",
    title: "町田市の保活スケジュール　申込から内定までの流れ",
    description:
      "町田市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>町田市の4月入園スケジュール</h2>
<p>町田市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。入園のしおりで制度を確認しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>まちだ子育てサイトで保育園の一覧や前年度のしおりを確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：入園のしおり入手・書類準備</strong>
<p>最新のしおりを入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>子どもセンターまたは郵送で提出します。オンライン申請も利用できます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>町田市は基礎指数が父母各最大10点（合計20点満点）です。勤務日数と1日あたりの勤務時間の組み合わせで判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://kosodate-machida.tokyo.jp/soshiki/4/3/nyuuen/hoiku/index.html" target="_blank" rel="noopener">まちだ子育てサイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "machida",
    title: "町田市の入園点数のしくみ　基礎指数と調整指数を解説",
    description:
      "町田市の保育園入園選考で使われる基礎指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>町田市の選考指数とは</h2>
<p>町田市の認可保育園の入園選考は「基礎指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基礎指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基礎指数（父母各最大10点、合計20点）</h2>
<p>就労の場合、月20日以上かつ1日8時間以上で満点の<span class="highlight">10点</span>になります。</p>

<table>
<tr><th>勤務日数</th><th>1日8時間以上</th><th>1日6〜8時間</th><th>1日4〜6時間</th></tr>
<tr><td>月20日以上</td><td>10</td><td>9</td><td>8</td></tr>
<tr><td>月16〜19日</td><td>9</td><td>8</td><td>7</td></tr>
<tr><td>月12〜15日</td><td>8</td><td>7</td><td>6</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+2点</span></li>
<li>きょうだいが在園中の園に転所申込：<span class="highlight">+2点</span></li>
<li>認可外保育施設に預けている：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+2点</span></li>
<li>育児休業から復帰予定：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://kosodate-machida.tokyo.jp/soshiki/4/3/nyuuen/hoiku/index.html" target="_blank" rel="noopener">まちだ子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "score-up-tips",
    citySlug: "machida",
    title: "町田市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "町田市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基礎指数20点は出発点</h2>
<p>町田市ではフルタイム共働き世帯は基礎指数<span class="highlight">20点</span>で横並びです。差がつくのは調整指数の部分です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+2</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい転所</td><td>+2</td><td>きょうだいが在園中の園への転所申込</td></tr>
<tr><td>認可外利用</td><td>+2</td><td>認可外保育施設に月ぎめで預けている</td></tr>
<tr><td>育休復帰</td><td>+1</td><td>育児休業を取得し入園月に復帰する</td></tr>
</table>

<h2>認可外保育施設の活用</h2>
<p>認可外保育施設に子どもを預けながら認可園を申し込むと、+2点の加点が得られます。ただし月ぎめ契約が必要です。一時保育は対象外です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>町田市は東京都多摩地区でも人口が多く、人気の園は競争が激しくなります。加点を取れるものは確実に取りましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "machida",
    title: "町田市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "町田市の保育園入園選考で指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>町田市では選考指数が同点になった場合、以下の優先順位で入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>町田市在住者が優先</li>
<li>保育の必要性が高い世帯（ひとり親など）</li>
<li>きょうだいの在園状況</li>
<li>所得が低い世帯</li>
<li>希望園の順位が高い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点勝負では「所得」が大きく影響します。所得が低い世帯が優先されるため、世帯年収が高い場合は特に加点を確実に取ることが重要です。</p>
</div>

<h2>希望園数は多めに</h2>
<p>町田市では希望園を多く書いても不利にはなりません。通える範囲の園はすべて記入しましょう。</p>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "part-time-work-score",
    citySlug: "machida",
    title: "町田市のパート・時短勤務の点数　何時間で何点？",
    description:
      "町田市の保育園入園で、パートや時短勤務の場合にもらえる基礎指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基礎指数</h2>
<p>町田市では勤務日数と1日の勤務時間の組み合わせで基礎指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>勤務パターン</th><th>指数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>10</td></tr>
<tr><td>月20日以上・1日6時間以上 / 月16日以上・1日8時間以上</td><td>9</td></tr>
<tr><td>月20日以上・1日4時間以上 / 月16日以上・1日6時間以上 / 月12日以上・1日8時間以上</td><td>8</td></tr>
<tr><td>月16日以上・1日4時間以上 / 月12日以上・1日6時間以上</td><td>7</td></tr>
<tr><td>月12日以上・1日4時間以上</td><td>6</td></tr>
</table>

<h2>パートで入園するには</h2>
<p>週3日・1日6時間のパートなら月12日以上かつ1日6時間以上で<span class="highlight">7点</span>です。フルタイム10点との差は3点。加点で埋められる可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入所要件は「月12日かつ1日4時間以上」です。これを下回ると申込みそのものができません。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "rejection-options",
    citySlug: "machida",
    title: "町田市で不承諾になったら　次にやるべきこと",
    description:
      "町田市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>町田市では4月一次選考の結果が1月下旬〜2月上旬に届きます。不承諾だった場合の選択肢を整理しましょう。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む（2月〜3月）</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する</li>
<li>幼稚園の預かり保育を検討する</li>
</ul>

<h2>二次募集のポイント</h2>
<p>二次募集は辞退などで空きが出た園に申し込めます。希望園の選び方がカギです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に預けてから翌年度に再申込すると、加点がもらえます。長い目で見た戦略が大切です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "machida",
    title: "町田市で認可外加点を取る方法　対象施設と条件",
    description:
      "町田市で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外加点とは</h2>
<p>町田市では認可外保育施設に月ぎめで預けている場合、調整指数が<span class="highlight">+2点</span>加算されます。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめ契約で預けていること</li>
<li>一時保育は対象外</li>
<li>認証保育所も認可外に含まれる</li>
</ul>

<h2>注意点</h2>
<p>認可外保育施設の利用は費用がかかります。加点のためだけに利用するかどうかは、費用対効果を考えて判断しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://kosodate-machida.tokyo.jp/" target="_blank" rel="noopener">まちだ子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  {
    slug: "next-year-changes",
    citySlug: "machida",
    title: "町田市の保育園事情　最新動向と今後の見通し",
    description:
      "町田市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>町田市の保育園整備</h2>
<p>町田市は待機児童ゼロを目指し、認可保育所の新設や既存園の定員拡大を進めています。</p>

<h2>最近の傾向</h2>
<ul>
<li>南町田・鶴川エリアでの新規開設が増加</li>
<li>小規模保育事業所の卒園児対策として連携園の拡充</li>
<li>オンライン申請の導入による利便性向上</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新設園は初年度に空きが出やすいため、保活では要チェックです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育園整備情報は<a href="https://www.city.machida.tokyo.jp/kodomo/" target="_blank" rel="noopener">町田市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "machida",
    title: "町田市の地域別・保育園の入りやすさ",
    description:
      "町田市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>町田市の地域特性</h2>
<p>町田市は面積が広く、地域によって保育園の入りやすさに差があります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>町田駅周辺：商業施設が充実し共働き世帯が多い</li>
<li>南町田エリア：再開発で人口増加中</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>鶴川・玉川学園エリア：新設園の増加で定員が拡大</li>
<li>相原・小山エリア：通勤に便がやや不利だが競争は緩やか</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>町田市の4月一次募集の申込状況はまちだ子育てサイトで毎年公開されます。希望園選びの参考にしましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "machida",
    title: "町田市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "町田市の保育園入園に必要な点数の目安を、過去の内定点数をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>町田市は人気の園ではフルタイム共働き（基礎指数20点）に加え、調整指数の加点が必要になることがあります。</p>

<h3>目安</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>町田駅周辺（1歳児）</td><td>21〜22点</td></tr>
<tr><td>南町田エリア（1歳児）</td><td>20〜21点</td></tr>
<tr><td>鶴川・相原エリア（1歳児）</td><td>20点前後</td></tr>
<tr><td>0歳児クラス</td><td>20点前後</td></tr>
</table>

<p>1歳児クラスは最も競争が激しいクラスです。0歳児や3歳児クラスは比較的入りやすい傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>町田市の内定最低点数は非公開ですが、上記は保護者の口コミやSNSの情報をもとにした参考値です。公式情報ではありません。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
];

registerArticles(articles);
