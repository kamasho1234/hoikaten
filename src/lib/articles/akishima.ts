import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "akishima",
    title: "昭島市の保活スケジュール　申込から内定までの流れ",
    description:
      "昭島市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>昭島市の4月入園スケジュール</h2>
<p>昭島市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。実施基準指数表を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>昭島市のホームページで保育園の一覧や前年度のボーダー（最低指数一覧）を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>昭島市内の保育園を見学して、通勤経路との相性を確認しましょう。</p>
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
<p>昭島市の基準指数は父母のうち低い方を採用し、最大20点です。調整指数の加点で順位が決まります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.akishima.lg.jp/kosodate/m-kosodate/1008313/1003785/1003802/1009200/index.html" target="_blank" rel="noopener">昭島市公式サイト 保育施設の申し込み</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "akishima",
    title: "昭島市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "昭島市の保育園入園選考で使われる実施基準指数と調整指数のしくみをわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>昭島市の選考指数とは</h2>
<p>昭島市の認可保育園は「実施基準指数（低い方）＋ 調整指数」で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 基準指数（父母のうち低い方）＋ 調整指数</p>
</div>

<h2>基準指数（最大20点）</h2>
<p>就労の場合、月160時間以上の就労で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+4点</span></li>
<li>生活保護世帯：<span class="highlight">+4点</span></li>
<li>きょうだいと同時申込：<span class="highlight">+3点</span></li>
<li>きょうだいが在園中：<span class="highlight">+2点</span></li>
<li>身体障害者手帳保有：<span class="highlight">+2点</span></li>
<li>認可外保育施設利用中：<span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.akishima.lg.jp/kosodate/m-kosodate/1008313/1003785/1003802/1009200/1009086.html" target="_blank" rel="noopener">昭島市公式サイト</a>の「入所選考基準表」で確認できます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "akishima",
    title: "昭島市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "昭島市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数20点は出発点</h2>
<p>昭島市ではフルタイム共働き世帯は基準指数<span class="highlight">20点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+4点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>生活保護世帯</td><td>+4点</td><td>生活保護を受けている場合</td></tr>
<tr><td>きょうだい同時申込</td><td>+3点</td><td>兄弟姉妹と同時に申し込む</td></tr>
<tr><td>きょうだい在園</td><td>+2点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>身体障害者手帳</td><td>+2点</td><td>保護者が障害手帳を保有</td></tr>
<tr><td>認可外施設利用</td><td>+2点</td><td>認可外保育施設に月ぎめで利用中</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>昭島市は入所決定者の最低指数一覧を公開しています。園ごとのボーダーを確認して、自分の点数で入園できそうな園を探しましょう。</p>
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
    citySlug: "akishima",
    title: "昭島市で同点になったらどうなる？優先順位を解説",
    description:
      "昭島市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>昭島市の入園選考で実施基準指数が同点になった場合、さらに優先順位で判定されます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>虐待・DV等、児童福祉の観点から配慮が必要な世帯</li>
<li>ひとり親世帯</li>
<li>きょうだいが同じ園に在園中</li>
<li>認可外保育施設に在所中</li>
<li>多子世帯（3人以上のきょうだい）</li>
<li>所得が低い世帯</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>昭島市では基準指数20点でも園によって競争が異なります。入所決定者最低指数一覧を確認して園選びを進めましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>優先順位は年度によって変更される場合があります。最新の「保育施設入所のしおり」で必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "akishima",
    title: "昭島市で時短勤務だと点数はどう変わる？",
    description:
      "昭島市の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>昭島市は月の就労時間で判定</h2>
<p>昭島市の基準指数は月の就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基準指数</th></tr>
<tr><td>月160時間以上</td><td>20点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10点</td></tr>
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
    citySlug: "akishima",
    title: "昭島市でひとり親の場合　加点で有利になる仕組み",
    description:
      "昭島市の保育園入園選考でひとり親世帯が受ける加点の詳細を解説します。",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b2e?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親世帯は加点対象</h2>
<p>昭島市ではひとり親世帯（母子家庭・父子家庭）に対して調整指数で<span class="highlight">+4点</span>の加点があります。</p>

<h2>ひとり親の定義</h2>
<ul>
<li>母子家庭：父親がいない、離婚、死別等</li>
<li>父子家庭：母親がいない、離婚、死別等</li>
<li>両親がいない場合も対象となります</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯の+4点は昭島市の加点の中でも大きいものです。就労している場合のみ適用されるため、就労証明書が必須です。</p>
</div>

<h2>加点に必要な書類</h2>
<p>ひとり親加点を受けるには、保育施設申込書の記入に加えて、戸籍謄本などの証明書の提出が必要な場合があります。市の要件を確認しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>親権や養子縁組の有無によって加点の対象となるかが変わる場合があります。不明な場合は昭島市子育て支援課に相談してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  {
    slug: "parental-leave-timing",
    citySlug: "akishima",
    title: "昭島市で育休明けのタイミング　申込のベストな時期",
    description:
      "昭島市の保育園入園選考で育休からの復帰予定がある場合の加点と申込タイミングを解説します。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休からの復帰予定で加点</h2>
<p>昭島市では育児休業から入園月に復帰予定の場合、調整指数で<span class="highlight">+1点</span>の加点があります。</p>

<h2>育休復帰加点の条件</h2>
<ul>
<li>入園予定月に職場復帰する場合</li>
<li>就労予定であることを証明する書類が必要</li>
<li>育児休業中でも、復職予定の勤務条件で基準指数が判定される</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休中の申込でも、復職後のフルタイム勤務条件を就労証明書に記載してもらえれば、基準指数は満点の20点で判定されます。</p>
</div>

<h2>申込のベストなタイミング</h2>
<p>復帰予定月の前月に申込するのが一般的です。育休が予定より長くなった場合の対応を勤務先と事前に相談しておきましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育児休業延長許容等同意書などの様式については、<a href="https://www.city.akishima.lg.jp/kosodate/m-kosodate/1008313/1003785/1003802/1009200/index.html" target="_blank" rel="noopener">昭島市公式サイト</a>で配布されています。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 52,
  },
  {
    slug: "nursery-wait-time",
    citySlug: "akishima",
    title: "昭島市の待機児童の状況と入園しやすい時期",
    description:
      "昭島市の保育園事情と待機児童の状況、入園しやすい時期について解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>昭島市の保育園事情</h2>
<p>昭島市は多摩地区の中核都市です。JR線沿線の子育て世帯が増加しており、エリアによって保育園の競争率に差があります。</p>

<h2>待機児童と競争率</h2>
<p>昭島市の待機児童数は毎年改善傾向にありますが、0〜2歳児は競争が続いています。特に駅周辺の人気園は指数が高めです。</p>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：受入枠が限定。競争が最も激しい</li>
<li>1歳児クラス：次点で競争が厳しい年齢</li>
<li>2歳児クラス：空きが少ない園が多い</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>昭島市は入所決定者最低指数一覧を公開しています。園ごとのボーダーを確認して、希望園を選ぶ際の参考にしましょう。</p>
</div>

<h2>入園しやすい時期</h2>
<p>4月は申込が集中します。年度途中（5月以降）の入園は空きが出ることもあり、チャンスがあります。</p>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "application-checklist",
    citySlug: "akishima",
    title: "昭島市の保育園申込　書類チェックリスト",
    description:
      "昭島市の保育園入園申込に必要な書類と記入時の注意点をまとめたチェックリストです。",
    image: "https://images.unsplash.com/photo-1577720643272-265f434f3d1a?w=800&h=400&fit=crop",
    category: "申込手続き",
    categoryColor: "teal",
    content: `<h2>申込書類チェックリスト</h2>
<p>昭島市の認可保育園申込に必要な書類と記入時の注意点をまとめました。</p>

<h3>提出必須書類</h3>
<ul>
<li>子どものための教育・保育給付認定申請書</li>
<li>保育施設入園(転園)申込書</li>
<li>健康状況等調査書</li>
<li>就労証明書（就労の場合）</li>
<li>診断書（疾病や障害の場合）</li>
<li>介護等状況申立書（介護の場合）</li>
</ul>

<h2>記入時の重要ポイント</h2>
<div class="warn-box">
<p><strong>就労証明書</strong></p>
<p>月あたりの就労時間は正確に記載してください。基準指数が直結します。給与明細や勤務表で確認させてもらうと安心です。</p>
</div>

<h2>提出期限と方法</h2>
<p>昭島市は毎年11月中旬が一次申込の期限です。郵送またはオンライン申請で受付けています。期限厳守でお申込みください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>提出書類に不足や記入漏れがあると、その項目の加点が得られない場合があります。チェックリストを使って二重確認をしましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "unlicensed-nursery",
    citySlug: "akishima",
    title: "昭島市で認可外保育施設の利用で加点を得る方法",
    description:
      "昭島市では認可外保育施設の利用で+2点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外保育施設の利用による加点</h2>
<p>昭島市では認可外保育施設に月ぎめで預けている場合、調整指数で<span class="highlight">+2点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月ぎめの契約が条件です。20点満点の昭島市では調整指数の2点はアドバンテージになります。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設（届出済み施設）</li>
<li>認証保育所（東京都の認証制度）</li>
<li>企業主導型保育施設</li>
<li>ベビーシッター等</li>
</ul>

<h2>加点に必要な書類</h2>
<p>利用施設から「保育受託証明書」の発行を受けて、申込時に提出する必要があります。利用開始時に施設に発行依頼をしておきましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月ぎめの契約でなく、スポット利用のみの場合は加点の対象となりません。契約内容を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
];

registerArticles(articles);
