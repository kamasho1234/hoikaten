import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kunitachi",
    title: "国立市の保活スケジュール　申込から内定までの流れ",
    description:
      "国立市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>国立市の4月入園スケジュール</h2>
<p>国立市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。実施基準指数表を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>国立市のホームページで保育園の一覧や前年度のボーダー（最低指数一覧）を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>国立市内の保育園を見学して、通勤経路との相性を確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書の月あたり就労時間は正確に記載してもらいましょう。指数に直結します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月：申込書類の提出</strong>
<p>4月一次の申込期限は例年11月中旬です。期限厳守で提出しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>国立市の基準指数は父母各最大20点（合計40点満点）です。月の就労時間で判定される制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kunitachi.tokyo.jp/soshiki/Dept04/Div03/Sec01/gyomu/0276/0277/0279/1568940050531.html" target="_blank" rel="noopener">国立市公式サイト 保育施設入所のしおり</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "kunitachi",
    title: "国立市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "国立市の保育園入園選考で使われる実施基準指数と調整指数のしくみをわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>国立市の選考指数とは</h2>
<p>国立市の認可保育園は「実施基準指数（父＋母）＋ 調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 基準指数（父＋母）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上の就労で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10</td></tr>
<tr><td>月48時間以上64時間未満</td><td>8</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>地域型保育施設卒園に伴う転所：<span class="highlight">+3点</span></li>
<li>ひとり親世帯：<span class="highlight">+2点</span></li>
<li>認証保育所等に月ぎめ利用中：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+2点</span></li>
<li>きょうだいが在園中：<span class="highlight">+1点</span></li>
<li>育休復帰予定：<span class="highlight">+1点</span></li>
<li>多子世帯（3人以上）：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.kunitachi.tokyo.jp/soshiki/Dept04/Div03/Sec01/gyomu/0276/0277/0279/1682573311573.html" target="_blank" rel="noopener">国立市公式サイト</a>の「調整基準」で確認できます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "kunitachi",
    title: "国立市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "国立市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数40点は出発点</h2>
<p>国立市ではフルタイム共働き世帯は基準指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>地域型保育施設卒園</td><td>+3点</td><td>小規模保育等の卒園に伴う転所</td></tr>
<tr><td>ひとり親世帯</td><td>+2点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>認証保育所等利用</td><td>+2点</td><td>認証保育所・認可外に月ぎめで利用中</td></tr>
<tr><td>生活保護</td><td>+2点</td><td>生活保護を受けている場合</td></tr>
<tr><td>きょうだい在園</td><td>+1点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>育休復帰予定</td><td>+1点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>多子世帯</td><td>+1点</td><td>きょうだいが3人以上</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>国立市は入所決定者の最低指数一覧を公開しています。園ごとのボーダーを確認して、自分の点数で入園できそうな園を探しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の月あたり就労時間は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "kunitachi",
    title: "国立市で同点になったらどうなる？優先順位を解説",
    description:
      "国立市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>国立市の入園選考で利用調整指数が同点になった場合、さらに優先順位で判定されます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>虐待・DV等、児童福祉の観点から配慮が必要な世帯</li>
<li>両親不存在の世帯</li>
<li>ひとり親世帯</li>
<li>きょうだいが同じ園に在園中</li>
<li>認証保育所等に在所中</li>
<li>きょうだいが別々の保育施設を利用中（転所希望）</li>
<li>多子世帯（3人以上のきょうだい）</li>
<li>保護者の一方が遠隔地に単身赴任中</li>
<li>所得が低い世帯</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>国立市の40点制では、フルタイム共働きで40点が基本ラインです。調整指数の1点が当落を分けることがあります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>優先順位は年度によって変更される場合があります。最新の「入園のしおり」で必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "kunitachi",
    title: "国立市で時短勤務だと点数はどう変わる？",
    description:
      "国立市の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>国立市は月の就労時間で判定</h2>
<p>国立市の基準指数は月の就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基準指数</th></tr>
<tr><td>月160時間以上</td><td>20点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10点</td></tr>
<tr><td>月48時間以上64時間未満</td><td>8点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>1日6時間×週5日＝月約120時間の時短勤務の場合、基準指数は<span class="highlight">16点</span>です。フルタイムの20点と比べて4点下がります。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の20点を得るには月160時間以上が必要です。1日8時間×月20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>復職後のフルタイム勤務条件を就労証明書に記載してもらえるか、勤務先に確認しましょう。育休中でも復職後の勤務条件で指数が判定されます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "single-parent-score",
    citySlug: "kunitachi",
    title: "国立市のひとり親加点　2点獲得の条件と活用法",
    description:
      "国立市の保育園入園選考でひとり親世帯が受けられる加点について解説します。",
    image: "https://images.unsplash.com/photo-1506784183857-c026f2c4c4c7?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親世帯の加点</h2>
<p>国立市ではひとり親世帯が調整指数で<span class="highlight">+2点</span>の加点を受けられます。</p>

<h2>対象となる世帯</h2>
<ul>
<li>母子家庭（離婚・未婚・死別）</li>
<li>父子家庭（離婚・死別）</li>
<li>その他、保護者が一人の家庭</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基準指数40点制の国立市では、+2点の加点は大きなアドバンテージです。調整指数の一部です。</p>
</div>

<h2>必要な書類</h2>
<p>ひとり親加点を受けるには、児童扶養手当証書の写しや戸籍謄本など、ひとり親であることを証明する書類が必要です。申込時に確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kunitachi.tokyo.jp/soshiki/Dept04/Div03/Sec01/gyomu/0276/0277/0279/1682573311573.html" target="_blank" rel="noopener">国立市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  {
    slug: "parental-leave-timing",
    citySlug: "kunitachi",
    title: "国立市の育休明けのタイミング　入園月に復職する場合の加点",
    description:
      "国立市で育児休業を取得し、入園月に復帰する場合の加点条件を解説します。",
    image: "https://images.unsplash.com/photo-1503454537688-e6ea6ca8759f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>育休復帰予定の加点</h2>
<p>国立市では育児休業から入園月に復帰する予定の場合、調整指数で<span class="highlight">+1点</span>の加点が得られます。</p>

<h2>加点の条件</h2>
<ul>
<li>育児休業を取得中であること</li>
<li>入園月（4月など）に職場復帰する予定であること</li>
<li>就労証明書に復職予定日が記載されていること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休中の求職活動中の基準指数（6点）よりも、育休復帰予定を示すことで、基準指数を高く判定してもらえる可能性があります。</p>
</div>

<h2>復職予定を証明する書類</h2>
<p>勤務先から復職予定日が記載された就労証明書の取得が必要です。入園時点で復帰することが確認できるよう、企業側に依頼しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を希望する場合でも加点が受けられる仕組みが整備されています。対応について市役所に相談しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
  {
    slug: "nursery-wait-time",
    citySlug: "kunitachi",
    title: "国立市の待機児童の状況と入園難易度",
    description:
      "国立市の保育園入園の待機児童数や競争率、入園難易度の現状をまとめました。",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>国立市の待機児童状況</h2>
<p>国立市は東京都多摩地区の中核都市で、子育て世帯が多く集まっています。待機児童状況を確認しましょう。</p>

<h2>国立市の入園難易度</h2>
<p>国立市の認可保育園入園決定率は約75.8%で、東京都全体（約78.8%）と比べても平均的です。フルタイム共働き世帯の基準指数40点では、調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>国立市は入所決定者の最低指数一覧を公開しており、園ごとのボーダー点数が確認できます。自分の点数で入園できる園を見つけることが重要です。</p>
</div>

<h2>年度別の傾向</h2>
<ul>
<li>0歳児：受入枠が限られるため比較的競争がある</li>
<li>1歳児：最も競争が激しい年齢クラス</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数や入園決定状況は<a href="https://www.city.kunitachi.tokyo.jp/soshiki/Dept04/Div03/Sec01/taikijidou/1511142634087.html" target="_blank" rel="noopener">国立市公式サイト 待機児童解消対策</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "application-checklist",
    citySlug: "kunitachi",
    title: "国立市の申込書類チェックリスト　必要書類の確認",
    description:
      "国立市の保育園入園申込に必要な書類をチェックリストでまとめました。",
    image: "https://images.unsplash.com/photo-150784272343-583f20270319?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込書類の確認</h2>
<p>国立市の保育園入園申込には複数の書類が必要です。提出期限までに余裕を持って準備しましょう。</p>

<h2>必須書類チェックリスト</h2>
<ul>
<li>保育施設入園申込書</li>
<li>保育が必要な理由を証明する書類
  <ul>
  <li>就労：就労証明書（月あたり就労時間を記載）</li>
  <li>病気：医師の診断書や処方箋</li>
  <li>介護：介護保険被保険者証など</li>
  <li>出産：母子健康手帳の写し</li>
  <li>就学：在学証明書</li>
  </ul>
</li>
<li>世帯状況の確認書類（世帯全員の住民票）</li>
<li>ひとり親の場合：児童扶養手当証書など</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の月あたり就労時間は指数に直結します。正確に記載し、通勤時間は含めないようにしましょう。</p>
</div>

<h2>提出方法と期限</h2>
<p>国立市では毎年秋（例年10月〜11月）に一次申込を受け付けています。詳しい提出期限と提出場所は入園のしおりで確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kunitachi.tokyo.jp/soshiki/Dept04/Div03/Sec01/gyomu/0276/0277/0279/1568940050531.html" target="_blank" rel="noopener">国立市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  {
    slug: "unlicensed-nursery",
    citySlug: "kunitachi",
    title: "国立市で認可外保育と加点　認証保育所の活用法",
    description:
      "国立市では認可外保育施設の利用で加点が得られます。その活用方法を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認証保育所等の利用による加点</h2>
<p>国立市では認証保育所等に月ぎめで預けている場合、調整指数で<span class="highlight">+2点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月ぎめの契約が条件です。40点制の国立市では調整指数の2点は大きなアドバンテージです。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認証保育所（東京都の認証制度）</li>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
</ul>

<h2>地域型保育施設卒園なら+3点</h2>
<p>地域型保育施設（小規模保育等）の卒園に伴う転所の場合は<span class="highlight">+3点</span>の加点があります。認証保育所利用（+2点）よりも大きな加点です。0〜2歳まで地域型保育施設に入園し、3歳で認可保育園に転所する作戦も有効です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育受託証明書が必要です。利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
];

registerArticles(articles);
