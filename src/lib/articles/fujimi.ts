import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "fujimi",
    title: "富士見市の保活スケジュール　申込から内定までの流れ",
    description: "富士見市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>富士見市の4月入園スケジュール</h2>
<p>富士見市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。利用調整基準を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>富士見市のホームページで保育園の一覧や前年度のボーダー（最低指数一覧）を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>富士見市内の保育園を見学して、通勤経路との相性を確認しましょう。</p>
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
<strong>10月：申込書類の提出</strong>
<p>4月一次の申込期限は例年10月中旬から下旬です。期限厳守で提出しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>富士見市の基準指数は「父母の低い方の点数」を採用する方式です。月の就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.fujimi.saitama.jp/kosodate_kyoiku/kosodate_oen/yochien_hoikusho/hoikusho/hoikusyonyusyo/r4_4gatsunyuusyo.html" target="_blank" rel="noopener">富士見市公式サイト 保育施設の申し込み</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "fujimi",
    title: "富士見市の入園点数のしくみ　基準指数と調整指数を解説",
    description: "富士見市の保育園入園選考で使われる基準指数と調整指数のしくみをわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>富士見市の選考指数とは</h2>
<p>富士見市の認可保育園は「基準指数（父母の低い方）＋ 調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 基準指数（父母の低い方を採用）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大20点、低い方を採用）</h2>
<p>就労の場合、月160時間以上の就労で満点の<span class="highlight">20点</span>です。富士見市は両親の指数が異なる場合、低い方を採用する方式です。</p>

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
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>認可外保育施設利用中：<span class="highlight">+3点</span></li>
<li>きょうだいが同じ園に在園中：<span class="highlight">+3点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>育休復帰予定：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.fujimi.saitama.jp/kosodate_kyoiku/kosodate_oen/yochien_hoikusho/hoikusho/hoikusyonyusyo/r4_4gatsunyuusyo.html" target="_blank" rel="noopener">富士見市公式サイト</a>の「入所案内」で確認できます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "fujimi",
    title: "富士見市で入園点数を上げるコツ　加点チェックリスト",
    description: "富士見市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数は両親の低い方で判定</h2>
<p>富士見市は両親の基準指数が異なる場合、低い方を採用します。その分、調整指数の加点が重要です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5点</td><td>母子・父子家庭で就労中</td></tr>
<tr><td>認可外保育施設利用</td><td>+3点</td><td>月ぎめで利用中</td></tr>
<tr><td>きょうだい在園</td><td>+3点</td><td>希望園にきょうだいが在園中</td></tr>
<tr><td>きょうだい同時申込</td><td>+2点</td><td>2人以上を同時申込</td></tr>
<tr><td>育休復帰予定</td><td>+2点</td><td>入園月に職場復帰</td></tr>
<tr><td>生活保護</td><td>+3点</td><td>生活保護受給中</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>富士見市は加点の種類が豊富です。該当条件を確認して、全ての加点を活用しましょう。</p>
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
    citySlug: "fujimi",
    title: "富士見市で同点になったらどうなる？優先順位を解説",
    description: "富士見市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>富士見市の入園選考で利用調整点数が同点になった場合、さらに優先順位で判定されます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>虐待・DV等、児童福祉の観点から配慮が必要な世帯</li>
<li>両親不存在の世帯</li>
<li>ひとり親世帯</li>
<li>きょうだいが同じ園に在園中</li>
<li>認可外保育施設に在所中</li>
<li>きょうだいが別々の保育施設を利用中（転所希望）</li>
<li>多子世帯（3人以上のきょうだい）</li>
<li>保護者の一方が遠隔地に単身赴任中</li>
<li>所得が低い世帯</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>富士見市では調整指数の1点が当落を分けることがあります。申込時に加点対象をしっかり確認しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>優先順位は年度によって変更される場合があります。最新の「入所案内」で必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "fujimi",
    title: "富士見市で時短勤務だと点数はどう変わる？",
    description: "富士見市の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>富士見市は月の就労時間で判定</h2>
<p>富士見市の基準指数は月の就労時間で決まります。時短勤務の影響を確認しましょう。</p>

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
    citySlug: "fujimi",
    title: "富士見市でひとり親だと加点される？優遇条件を解説",
    description: "富士見市の保育園入園選考でひとり親世帯が受ける加点と優先判定について解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親世帯への加点</h2>
<p>富士見市ではひとり親世帯で就労中の場合、調整指数で<span class="highlight">+5点</span>の加点が得られます。他の市と比べても加点が大きいです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>母子家庭・父子家庭の両方が対象です。就労していることが条件です。戸籍謄本などで家族構成を証明する書類が必要になります。</p>
</div>

<h2>同点時の優先順位も高い</h2>
<p>基準指数が同じ場合の優先判定でも、ひとり親世帯は上位で判定されます。加点に加えて優先順位でも有利な条件です。</p>

<h2>必要な書類</h2>
<ul>
<li>戸籍謄本または抄本（原本）</li>
<li>児童扶養手当証書（お持ちの場合）</li>
<li>世帯構成がわかる書類</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>親族の同居有無により判定が変わる場合があります。詳しくは富士見市子ども・子育て支援課に確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>富士見市子ども・子育て支援課 電話：049-252-7105</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "parental-leave-timing",
    citySlug: "fujimi",
    title: "富士見市の育休明けのタイミング　復帰予定で加点を得る方法",
    description: "富士見市では育児休業から入園月に復帰する場合に加点が得られます。タイミングのコツを解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>育休復帰予定の加点</h2>
<p>富士見市では育児休業を取得して入園月に復帰する場合、調整指数で<span class="highlight">+2点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休中であっても復職後のフルタイム勤務条件で指数が判定されます。加点と合わせて基準指数が上がる可能性があります。</p>
</div>

<h2>入園月の復帰が条件</h2>
<p>加点を受けるには入園月中に職場復帰することが条件です。復帰予定日を就労証明書に記載してもらいましょう。</p>

<h2>手続きの注意点</h2>
<ul>
<li>育休中の特例保育申込みの場合も対象です</li>
<li>認定保育施設の場合は担当課に確認しましょう</li>
<li>復帰予定が変わった場合は早めに報告が必要です</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>復帰予定日より遅れて復帰した場合、入園承諾の取消しになる可能性があります。慎重に判断しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "nursery-wait-time",
    citySlug: "fujimi",
    title: "富士見市の待機児童の状況　競争率と入園難易度の傾向",
    description: "富士見市の保育園の待機児童数と競争率について、エリア別の傾向をまとめました。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>富士見市の保育園事情</h2>
<p>富士見市は埼玉県の南西部に位置する子育て世帯向けの街です。エリアによって保育園の競争率に差があります。</p>

<h2>待機児童の現状</h2>
<p>富士見市では年度によって待機児童数に変動があります。最新の待機児童統計は富士見市のホームページで確認できます。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>ふじみ野駅周辺：市の南部の中心地で子育て世帯に人気</li>
<li>鶴瀬駅周辺：東武東上線沿線で利便性が高い</li>
<li>みずほ台駅周辺：駅近くの人気地域</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>上沢エリア：市の北部の住宅地</li>
<li>柏エリア：駅から離れた地域</li>
<li>針ヶ谷エリア：市の中央部で保育需要が比較的低め</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>富士見市の入所決定者最低指数一覧を確認すれば、園ごとのボーダーがわかります。希望園選びの参考にしましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "application-checklist",
    citySlug: "fujimi",
    title: "富士見市の保育園申込書類チェックリスト　提出漏れを防ぐ方法",
    description: "富士見市の保育園申込に必要な書類をまとめたチェックリストです。提出漏れを防ぎましょう。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>申込書類の基本</h2>
<p>富士見市の保育園申込に必要な書類を整理しておくことが重要です。提出期限までに全て揃えましょう。</p>

<h2>必須書類チェックリスト</h2>
<ul>
<li>保育施設等利用申込書（施設指定様式）</li>
<li>支給認定申請書</li>
<li>就労証明書（両親それぞれ、勤務先記入）</li>
<li>世帯票</li>
<li>住民票抄本</li>
</ul>

<h2>加点対象の書類</h2>
<ul>
<li>ひとり親の場合：戸籍謄本・児童扶養手当証書</li>
<li>生活保護の場合：保護開始決定通知書</li>
<li>身体障害がある場合：身体障害者手帳のコピー</li>
<li>認可外保育施設利用中：保育受託証明書</li>
<li>育休中：復帰予定を証明する書類</li>
<li>市外在住の場合：住民票の写し</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>書類不備での不承諾も発生します。申込期限の1ヶ月前には書類を揃え始めましょう。</p>
</div>

<div class="info-box">
<p><strong>詳細確認先</strong></p>
<p><a href="https://www.city.fujimi.saitama.jp/kosodate_kyoiku/kosodate_oen/yochien_hoikusho/hoikusho/hoikusyonyusyo/r4_4gatsunyuusyo.html" target="_blank" rel="noopener">富士見市公式サイト</a>の「入所案内」で最新の必要書類を確認してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "unlicensed-nursery",
    citySlug: "fujimi",
    title: "富士見市で認可外保育と認可保育園　加点を活用した攻略法",
    description: "富士見市では認可外保育施設の利用で加点が得られます。その活用方法を解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外保育施設の活用</h2>
<p>富士見市では認可外保育施設に月ぎめで預けている場合、調整指数で<span class="highlight">+3点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月ぎめの契約が条件です。富士見市は調整指数の加点が大きいため、3点の加点は入園の可能性を大きく高めます。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>認定家庭保育室</li>
<li>事業所内保育所</li>
<li>企業主導型保育施設</li>
</ul>

<h2>きょうだい加点との組み合わせ</h2>
<p>きょうだいを同時に申し込む場合（+2点）と認可外保育施設の利用（+3点）を組み合わせることで、最大5点の加点が見込めます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育受託証明書が必要です。利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 40,
  },
];

registerArticles(articles);
