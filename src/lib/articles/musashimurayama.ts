import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "musashimurayama",
    title: "武蔵村山市の保活スケジュール　申込から内定までの流れ",
    description:
      "武蔵村山市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>武蔵村山市の4月入園スケジュール</h2>
<p>武蔵村山市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。東京都の基準指数に基づき選考されます。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月～6月：情報収集</strong>
<p>武蔵村山市のホームページで保育園の一覧や前年度のボーダーを確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月～9月：保育園見学</strong>
<p>武蔵村山市内の保育園を見学して、通勤経路との相性を確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月～10月：書類準備</strong>
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
<p>武蔵村山市は基準指数で父母各最大20点（合計40点満点）です。月の就労時間で判定される制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.musashimurayama.lg.jp/kosodate/azukeru/1012423/1013117.html" target="_blank" rel="noopener">武蔵村山市 保育所等入所のご案内</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "musashimurayama",
    title: "武蔵村山市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "武蔵村山市の保育園入園選考で使われる基準指数と調整指数のしくみをわかりやすく解説します。参考値です。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>武蔵村山市の選考指数とは</h2>
<p>武蔵村山市の認可保育園は「基準指数（父＋母）＋ 調整指数」の合計で選考されます。参考値として、東京都の基準をお伝えします。</p>

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

<h2>調整指数の代表例（参考値）</h2>
<ul>
<li>地域型保育施設卒園に伴う転所：<span class="highlight">+3点</span></li>
<li>ひとり親世帯：<span class="highlight">+2点</span></li>
<li>認証保育所等に月ぎめ利用中：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+2点</span></li>
<li>きょうだいが在園中：<span class="highlight">+1点</span></li>
<li>育休復帰予定：<span class="highlight">+1点</span></li>
<li>多子世帯（3人以上）：<span class="highlight">+1点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>この情報は参考値です。正確な基準は、武蔵村山市の「保育所等入所のしおり」で必ず確認してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "score-up-tips",
    citySlug: "musashimurayama",
    title: "武蔵村山市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "武蔵村山市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。参考値です。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数40点は出発点</h2>
<p>武蔵村山市ではフルタイム共働き世帯は基準指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の加点です。参考値をご紹介します。</p>

<h2>加点チェックリスト（参考値）</h2>
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
<p>武蔵村山市は入所決定者の最低指数一覧を公開しています。園ごとのボーダーを確認して、自分の点数で入園できそうな園を探しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>この情報は参考値です。就労証明書の月あたり就労時間は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "musashimurayama",
    title: "武蔵村山市で同点になったらどうなる？優先順位を解説",
    description:
      "武蔵村山市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。参考値です。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>武蔵村山市の入園選考で利用調整指数が同点になった場合、さらに優先順位で判定されます。参考値をご紹介します。</p>

<h2>同点時に考慮される要素（参考値）</h2>
<ul>
<li>虐待・ＤＶ等、児童福祉の観点から配慮が必要な世帯</li>
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
<p>40点制では、フルタイム共働きで40点が基本ラインです。調整指数の1点が当落を分けることがあります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>優先順位は年度によって変更される場合があります。この情報は参考値です。最新の「保育所等入所のしおり」で必ず確認してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "musashimurayama",
    title: "武蔵村山市で時短勤務だと点数はどう変わる？",
    description:
      "武蔵村山市の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。参考値です。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>武蔵村山市は月の就労時間で判定</h2>
<p>武蔵村山市の基準指数は月の就労時間で決まります。時短勤務の影響を確認しましょう。参考値です。</p>

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
    popularity: 48,
  },
  {
    slug: "single-parent-score",
    citySlug: "musashimurayama",
    title: "武蔵村山市でひとり親の場合　加点と支援制度",
    description:
      "武蔵村山市の保育園入園選考でひとり親世帯が受ける加点と支援内容を解説します。参考値です。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親家庭の加点</h2>
<p>武蔵村山市の保育園入園選考では、ひとり親世帯は調整指数で<span class="highlight">+2点</span>の加点が得られます。参考値です。</p>

<h2>必要な書類</h2>
<ul>
<li>戸籍謄本（または抄本）</li>
<li>母子手帳の親の欄写し</li>
<li>養育費に関する公正証書（ある場合）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親で就労中の場合、基準指数に加えて調整指数で加点が得られます。月160時間以上の就労で基準指数20点＋調整指数2点＝22点となります。</p>
</div>

<h2>東京都のひとり親支援制度</h2>
<p>武蔵村山市が属する東京都では、ひとり親世帯向けの保育料軽減制度があります。詳細は市の福祉事務所に問い合わせてください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>この情報は参考値です。正確な加点額は、武蔵村山市の公式案内で必ず確認してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 52,
  },
  {
    slug: "parental-leave-timing",
    citySlug: "musashimurayama",
    title: "武蔵村山市の育児休業と入園タイミング　復帰予定者の加点",
    description:
      "武蔵村山市で育児休業から復帰する場合の入園タイミングと加点を解説します。参考値です。",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b2f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>育休復帰者の加点</h2>
<p>武蔵村山市では育児休業から入園月に復帰する予定の場合、調整指数で<span class="highlight">+1点</span>の加点が得られます。参考値です。</p>

<h2>復帰予定者の就労証明書</h2>
<p>育児休業中でも、復職後の勤務条件を就労証明書に記載することが重要です。月160時間以上の勤務予定であれば、基準指数は20点となります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休から復帰する場合、入園月が確定してから書類を提出するタイミングが重要です。復帰予定月に合わせて申込みましょう。</p>
</div>

<h2>育児休業延長の仕組み</h2>
<p>保育園に不承諾となった場合、育児休業を延長できます（最長2歳まで）。翌年度の申込みに向けて準備を進めましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>この情報は参考値です。復帰時期の確認書等が必要です。勤務先に確認の上、書類を準備してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  {
    slug: "nursery-wait-time",
    citySlug: "musashimurayama",
    title: "武蔵村山市の保育園入園待ちの現状　待機児童について",
    description:
      "武蔵村山市の保育園入園の待機児童状況と年度別の動向を解説します。参考値です。",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>武蔵村山市の待機児童状況</h2>
<p>武蔵村山市の待機児童数は、東京都内でも比較的少ない水準にあります。ただし、年齢クラスと地域によって差があります。</p>

<h2>園ごとの競争差</h2>
<p>駅周辺の人気園は競争が激しいですが、市の北部や周辺地域の園には比較的空きがある場合もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>武蔵村山市は保育園の定員を段階的に増やしており、入園しやすい環境を整備中です。複数の園をリストアップして申込みましょう。</p>
</div>

<h2>途中入園の可能性</h2>
<p>4月入園で不承諾になった場合でも、年度途中に空きが出た場合の利用調整で入園できる可能性があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>この情報は参考値です。最新の待機児童数は武蔵村山市の公式発表で確認してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "application-checklist",
    citySlug: "musashimurayama",
    title: "武蔵村山市の保育園申込　書類チェックリスト",
    description:
      "武蔵村山市の認可保育園申込に必要な書類をリストアップしました。漏れなく準備するためのチェックリストです。",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込に必要な書類</h2>
<p>武蔵村山市の認可保育園申込に必要な書類をまとめました。チェックリストとしてご活用ください。</p>

<h2>基本書類チェックリスト</h2>
<ul>
<li>保育施設入園申込書</li>
<li>保育が必要であることの認定に係る申立書</li>
<li>就労証明書（就業中の場合）</li>
<li>母子健康手帳の表紙及び出生届が記載された部分の写し</li>
<li>世帯全員の住民票謄本</li>
</ul>

<h2>状況別の追加書類</h2>
<ul>
<li>ひとり親世帯：戸籍謄本（または抄本）</li>
<li>疾病・介護中：医師の診断書または介護状況の書類</li>
<li>障害のある方：障害者手帳のコピー</li>
<li>生活保護世帯：福祉事務所の証明書</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は月あたりの就労時間を正確に記載します。指数に直結するため、勤務先とよく相談して作成しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>書類の不備は選考に影響します。提出前に武蔵村山市の案内で最新の書類リストを確認してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  {
    slug: "unlicensed-nursery",
    citySlug: "musashimurayama",
    title: "武蔵村山市で認証保育所を活用する方法　加点のコツ",
    description:
      "武蔵村山市では認証保育所や認可外保育施設の月ぎめ利用で加点が得られます。その活用法を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認証保育所等の利用による加点</h2>
<p>武蔵村山市では認証保育所等に月ぎめで預けている場合、調整指数で<span class="highlight">+2点</span>の加点が得られます。参考値です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月ぎめの契約が条件です。40点制の武蔵村山市では調整指数の2点は大きなアドバンテージです。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>東京都認証保育所</li>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
</ul>

<h2>地域型保育施設卒園なら+3点</h2>
<p>地域型保育施設（小規模保育等）の卒園に伴う転所の場合は<span class="highlight">+3点</span>の加点があります。認証保育所利用（+2点）よりも大きな加点です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>この情報は参考値です。保育受託証明書が必要な場合があります。利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 46,
  },
];

registerArticles(articles);
