import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "higashikurume",
    title: "東久留米市の保活スケジュール　申込から内定までの流れ",
    description:
      "東久留米市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>東久留米市の4月入園スケジュール</h2>
<p>東久留米市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。実施基準指数表を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>東久留米市のホームページで保育園の一覧や前年度のボーダー（最低指数一覧）を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>東久留米市内の保育園を見学して、通勤経路との相性を確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書は正確に記載してもらいましょう。基準指数に直結します。</p>
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
<p>東久留米市の基準指数は父母各最大50点（合計100点）です。フルタイム共働きで100点が基本ラインです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.higashikurume.lg.jp/kurashi/kosodate/hoiku/1005391.html" target="_blank" rel="noopener">東久留米市公式サイト 保育施設の申し込み</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "higashikurume",
    title: "東久留米市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "東久留米市の保育園入園選考で使われる実施基準指数と調整指数のしくみをわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>東久留米市の選考指数とは</h2>
<p>東久留米市の認可保育園は「実施基準指数（父＋母）＋ 調整指数」で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 基準指数（父＋母）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大50点、合計100点）</h2>
<p>就労の場合、フルタイム勤務で各親<span class="highlight">50点</span>（合計100点）が満点です。</p>

<table>
<tr><th>就労形態</th><th>基準指数</th></tr>
<tr><td>フルタイム勤務</td><td>50点</td></tr>
<tr><td>月160時間以上のパート</td><td>45点</td></tr>
<tr><td>月120〜160時間のパート</td><td>40点</td></tr>
<tr><td>月80〜120時間のパート</td><td>30点</td></tr>
<tr><td>月60〜80時間のパート</td><td>20点</td></tr>
<tr><td>自営業</td><td>40点</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親で就労：<span class="highlight">+10点</span></li>
<li>育休から復帰予定：<span class="highlight">+10点</span></li>
<li>生活保護世帯：<span class="highlight">+10点</span></li>
<li>認可外施設利用（3ヶ月以上）：<span class="highlight">+20点</span></li>
<li>きょうだいが在園中：<span class="highlight">+5点</span></li>
<li>低所得世帯：<span class="highlight">+5点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.higashikurume.lg.jp/shinseisho/hoiku/1001551.html" target="_blank" rel="noopener">東久留米市公式サイト</a>の「入園のしおり」で確認できます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "higashikurume",
    title: "東久留米市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "東久留米市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数100点は出発点</h2>
<p>東久留米市ではフルタイム共働き世帯は基準指数<span class="highlight">100点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親で就労</td><td>+10点</td><td>母子・父子家庭で就労している</td></tr>
<tr><td>育休から復帰</td><td>+10点</td><td>入園月に職場復帰予定</td></tr>
<tr><td>生活保護</td><td>+10点</td><td>生活保護を受けている</td></tr>
<tr><td>認可外施設（長期）</td><td>+20点</td><td>3ヶ月以上利用中</td></tr>
<tr><td>認可外施設（短期）</td><td>+10点</td><td>1ヶ月以上利用中</td></tr>
<tr><td>きょうだい在園</td><td>+5点</td><td>希望園にきょうだいが在園</td></tr>
<tr><td>きょうだい同時申込</td><td>+5点</td><td>兄弟姉妹と同時に申し込む</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東久留米市は50点制に比べて基準指数が高く、調整指数の加点も大きいです。認可外施設の利用期間に応じた加点を活用しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の記載は正確に。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "higashikurume",
    title: "東久留米市で同点になったらどうなる？優先順位を解説",
    description:
      "東久留米市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>東久留米市の入園選考で実施基準指数が同点になった場合、さらに優先順位で判定されます。</p>

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
<p>東久留米市では100点制により細かい調整指数による加点が多く、同点になることは比較的少ないです。100点に到達するための加点戦略が大事です。</p>
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
    citySlug: "higashikurume",
    title: "東久留米市で時短勤務だと点数はどう変わる？",
    description:
      "東久留米市の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>東久留米市は勤務時間で細かく判定</h2>
<p>東久留米市の基準指数は月の就労時間で細かく決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>就労形態</th><th>基準指数</th></tr>
<tr><td>フルタイム勤務</td><td>50点</td></tr>
<tr><td>月160時間以上のパート</td><td>45点</td></tr>
<tr><td>月120時間以上160時間未満</td><td>40点</td></tr>
<tr><td>月80時間以上120時間未満</td><td>30点</td></tr>
<tr><td>月60時間以上80時間未満</td><td>20点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>1日6時間×週5日＝月約120時間の時短勤務の場合、基準指数は<span class="highlight">40点</span>（または45点）です。フルタイムの50点と比べて10点の差が生まれます。</p>
</div>

<h2>復職後の条件で判定</h2>
<p>育休中の申込でも、復職後のフルタイム勤務条件を就労証明書に記載してもらえれば、基準指数は50点で判定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東久留米市は100点満点制なので、時短勤務の場合でも調整指数で上乗せできるチャンスが大きいです。加点戦略を組み合わせましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "single-parent-score",
    citySlug: "higashikurume",
    title: "東久留米市でひとり親の場合　加点で有利になる仕組み",
    description:
      "東久留米市の保育園入園選考でひとり親世帯が受ける加点の詳細を解説します。",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b2e?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親で就労している場合は加点</h2>
<p>東久留米市ではひとり親世帯（母子家庭・父子家庭）で就労している場合、調整指数で<span class="highlight">+10点</span>の加点があります。</p>

<h2>ひとり親の定義</h2>
<ul>
<li>母子家庭：父親がいない、離婚、死別等</li>
<li>父子家庭：母親がいない、離婚、死別等</li>
<li>両親がいない場合も対象となります</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯の+10点は東久留米市の加点の中でも大きいものです。100点制では10点の加点は合計110点となり、大きなアドバンテージです。</p>
</div>

<h2>加点に必要な書類</h2>
<p>ひとり親加点を受けるには、保育施設申込書の記入に加えて、戸籍謄本や児童扶養手当受給票などの証明書の提出が必要な場合があります。市の要件を確認しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ひとり親加点は就労が条件となる場合が多いです。求職中は加点対象外になることもありますので、市に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  {
    slug: "parental-leave-timing",
    citySlug: "higashikurume",
    title: "東久留米市で育休明けのタイミング　申込のベストな時期",
    description:
      "東久留米市の保育園入園選考で育休からの復帰予定がある場合の加点と申込タイミングを解説します。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休から復帰予定で加点</h2>
<p>東久留米市では育児休業から入園月に復帰予定の場合、調整指数で<span class="highlight">+10点</span>の加点があります。</p>

<h2>育休復帰加点の条件</h2>
<ul>
<li>入園予定月に職場復帰する場合</li>
<li>就労予定であることを証明する書類が必要</li>
<li>育児休業中でも、復職予定の勤務条件で基準指数が判定される</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休復帰の+10点加点により、合計110点となる可能性があります。東久留米市では育休明けの入園申込が有利になります。</p>
</div>

<h2>申込のベストなタイミング</h2>
<p>復帰予定月の前月に申込するのが一般的です。育休が予定より長くなった場合の対応を勤務先と事前に相談しておきましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育児休業に関する証明書などの様式については、<a href="https://www.city.higashikurume.lg.jp/kurashi/kosodate/hoiku/1005391.html" target="_blank" rel="noopener">東久留米市公式サイト</a>で配布されています。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 52,
  },
  {
    slug: "nursery-wait-time",
    citySlug: "higashikurume",
    title: "東久留米市の待機児童の状況と入園しやすい時期",
    description:
      "東久留米市の保育園事情と待機児童の状況、入園しやすい時期について解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>東久留米市の保育園事情</h2>
<p>東久留米市は東京都多摩地区の子育て世帯が多い地域です。駅周辺の子育て環境の充実により、保育需要が高まっています。</p>

<h2>待機児童と競争率</h2>
<p>東久留米市の待機児童数は年々改善していますが、0〜2歳児の競争は続いています。特に駅周辺や新築マンション周辺の人気園は高い指数が必要です。</p>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：受入枠が限定。競争が最も激しい</li>
<li>1歳児クラス：次点で競争が厳しい年齢</li>
<li>2歳児クラス：空きが少ない園が多い</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東久留米市は100点制のため、加点戦略で点数を上げやすいです。認可外施設利用や育休復帰の加点を組み合わせましょう。</p>
</div>

<h2>入園しやすい時期</h2>
<p>4月は申込が集中します。年度途中（5月以降）の入園は空きが出ることもあり、チャンスがあります。</p>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "application-checklist",
    citySlug: "higashikurume",
    title: "東久留米市の保育園申込　書類チェックリスト",
    description:
      "東久留米市の保育園入園申込に必要な書類と記入時の注意点をまとめたチェックリストです。",
    image: "https://images.unsplash.com/photo-1577720643272-265f434f3d1a?w=800&h=400&fit=crop",
    category: "申込手続き",
    categoryColor: "teal",
    content: `<h2>申込書類チェックリスト</h2>
<p>東久留米市の認可保育園申込に必要な書類と記入時の注意点をまとめました。</p>

<h3>提出必須書類</h3>
<ul>
<li>教育・保育給付認定申請書兼利用申込書</li>
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
<p>東久留米市は毎年11月中旬が一次申込の期限です。郵送またはオンライン申請で受付けています。期限厳守でお申込みください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>提出書類に不足や記入漏れがあると、その項目の加点が得られない場合があります。特に認可外施設利用の証明書は重要です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "unlicensed-nursery",
    citySlug: "higashikurume",
    title: "東久留米市で認可外保育施設の利用で加点を得る方法",
    description:
      "東久留米市では認可外保育施設の利用で最大+20点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外保育施設の利用による加点</h2>
<p>東久留米市では認可外保育施設に月ぎめで預けている場合、調整指数で加点が得られます。利用期間に応じて異なります。</p>

<table>
<tr><th>利用期間</th><th>加点</th></tr>
<tr><td>1ヶ月以上</td><td>+10点</td></tr>
<tr><td>3ヶ月以上</td><td>+20点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3ヶ月以上の利用で+20点の加点は、東久留米市の調整指数の中でも最大のものです。100点制では合計120点となり、大きなアドバンテージです。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設（届出済み施設）</li>
<li>認証保育所（東京都の認証制度）</li>
<li>企業主導型保育施設</li>
<li>ベビーシッター等（一部除外あり）</li>
</ul>

<h2>加点に必要な書類</h2>
<p>利用施設から「保育受託証明書」の発行を受けて、申込時に提出する必要があります。利用開始時に施設に発行依頼をしておきましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月ぎめの契約が条件です。スポット利用のみの場合は加点対象となりません。契約内容を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
];

registerArticles(articles);
