import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "matsue",
    title: "松江市の保活スケジュール　申込から内定までの流れ",
    description:
      "松江市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>松江市の4月入園スケジュール</h2>
<p>松江市の認可保育園は毎年秋〜冬に翌年度4月入園の一斉申込を受付けます。電子申請（スマート申請）にも対応しています。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで「保育所等入所のてびき」や保育施設一覧を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。松江市では保育園一斉開放も実施されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：書類準備</strong>
<p>就労証明書などの必要書類を勤務先に依頼します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>12月：申込書類の提出</strong>
<p>保育所幼稚園課窓口・各支所・電子申請で申込みます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>松江市は基本指数が父母各最大50点（合計100点満点）です。月の就労時間で判定される制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.matsue.lg.jp/soshikikarasagasu/kosodatebu_hoikushoyoutienka/2_1/3/hoikusyoannai/16643.html" target="_blank" rel="noopener">松江市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "matsue",
    title: "松江市の入園点数のしくみ　利用調整基準を解説",
    description:
      "松江市の保育園入園選考で使われる利用調整基準のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>松江市の利用調整基準とは</h2>
<p>松江市の認可保育園は各家庭の保育の必要性を点数化し、優先度の高い子どもから入園決定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（父＋母）＋ 調整指数</p>
</div>

<h2>基本指数（父母各最大50点、合計100点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">50点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>50</td></tr>
<tr><td>月140時間以上160時間未満</td><td>45</td></tr>
<tr><td>月120時間以上140時間未満</td><td>40</td></tr>
<tr><td>月100時間以上120時間未満</td><td>35</td></tr>
<tr><td>月80時間以上100時間未満</td><td>30</td></tr>
<tr><td>月64時間以上80時間未満</td><td>25</td></tr>
<tr><td>月48時間以上64時間未満</td><td>20</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+10点</span></li>
<li>小規模保育卒園に伴う転所：<span class="highlight">+10点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+10点</span></li>
<li>保育士として市内保育所等に月120時間以上勤務：<span class="highlight">+10点</span></li>
<li>認可外利用中：<span class="highlight">+5点</span></li>
<li>育休復帰予定：<span class="highlight">+5点</span></li>
<li>生活保護世帯：<span class="highlight">+5点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.matsue.lg.jp/material/files/group/131/R6riyoutouseikijyun.pdf" target="_blank" rel="noopener">松江市公式サイト（利用調整基準PDF）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "matsue",
    title: "松江市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "松江市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数100点は出発点</h2>
<p>松江市ではフルタイム共働き世帯は基本指数<span class="highlight">100点</span>（父50点＋母50点）で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+10点</td><td>離婚・死別・未婚等</td></tr>
<tr><td>小規模保育卒園</td><td>+10点</td><td>小規模保育等の卒園に伴う転所</td></tr>
<tr><td>きょうだい在園</td><td>+10点</td><td>在園中の園を希望</td></tr>
<tr><td>保育士として勤務</td><td>+10点</td><td>市内保育所等で月120時間以上勤務</td></tr>
<tr><td>認可外利用</td><td>+5点</td><td>認可外保育施設に月ぎめで利用中</td></tr>
<tr><td>育休復帰予定</td><td>+5点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>生活保護</td><td>+5点</td><td>生活保護を受けている場合</td></tr>
<tr><td>きょうだい同時申込</td><td>+5点</td><td>きょうだいと同時に申し込む場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>松江市では認可外利用（+5点）と育休復帰（+5点）を組み合わせると+10点の加算が見込めます。100点制では10点の差は大きいです。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の月間就労時間は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "matsue",
    title: "松江市で同点になったらどうなる？AI選考のしくみ",
    description:
      "松江市の保育園入園選考で同点だった場合のAI入所選考のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>松江市のAI入所選考</h2>
<p>松江市はAI入所選考システムを導入しています。利用調整基準の合計指数が同点の場合、ランダムに付番された番号の高い順に入所利用調整が行われます。</p>

<h2>同点時の判定の特徴</h2>
<ul>
<li>指数が同点の場合はランダム番号で判定</li>
<li>人の恣意的な判断が入らない公平な仕組み</li>
<li>希望園の組み合わせ全体をAIが最適化して配置</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>AI選考では同点時にランダム要素が入るため、調整指数の加点を漏れなく申請して1点でも上乗せすることが重要です。</p>
</div>

<h2>希望園は多めに書く</h2>
<p>AI選考では全体の最適化が行われるため、第1希望だけでなく複数の園を希望に書くことで入園のチャンスが広がります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同点時の優先順位の詳細は毎年の案内で確認してください。年度によって判定基準が変更されることがあります。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "part-time-work-score",
    citySlug: "matsue",
    title: "松江市で時短勤務だと点数はどう変わる？",
    description:
      "松江市の保育園入園選考で時短勤務の場合の基本指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>松江市は月の合計就労時間で判定</h2>
<p>松江市の基本指数は月の合計就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>50点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>45点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>40点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>35点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>30点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>25点</td></tr>
<tr><td>月48時間以上64時間未満</td><td>20点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基本指数は<span class="highlight">40点</span>です。フルタイムの50点と比べて10点下がります。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の50点を得るには月160時間以上が必要です。1日8時間×20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>松江市は就労時間の区分が20時間刻みです。復職時にフルタイムに戻す予定であれば、復職後の勤務条件を就労証明書に記載してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "rejection-options",
    citySlug: "matsue",
    title: "松江市で保育園に落ちたときの選択肢",
    description:
      "松江市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>松江市で認可保育園に不承諾（入所保留）になった場合でも、複数の選択肢があります。</p>

<h3>1. 毎月の入所申込</h3>
<p>松江市は5月以降も毎月入所申込を受付けています。空きが出た園について利用調整が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用することで、翌年度の申込で<span class="highlight">+5点</span>の加点が見込めます。</p>

<h3>3. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。卒園に伴う転所で<span class="highlight">+10点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+5点）と育休復帰（+5点）を翌年度に積むと、合計+10点の加算が見込めます。100点制では10点の差は大きいです。</p>
</div>

<h3>4. 入所予約枠制度</h3>
<p>松江市には入所予約枠制度があり、育児休業からの復帰に合わせた入所予約ができます。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>入所保留児童の状況は<a href="https://www.city.matsue.lg.jp/kosodate_kyoiku/kosodateshien/7/9/index.html" target="_blank" rel="noopener">松江市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "nursery-worker-bonus",
    citySlug: "matsue",
    title: "松江市で保育士が保育園に子どもを入れるとき　加点の条件",
    description:
      "松江市では保育士として市内保育所等に勤務する保護者に加点があります。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>保育士加点のしくみ</h2>
<p>松江市では保育士・保育教諭として市内の保育所等に月120時間以上勤務している保護者に、調整指数で<span class="highlight">+10点</span>の加点があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育士不足の解消を目的とした制度です。フルタイム共働き世帯の基本指数100点に+10点が加算され、<span class="highlight">110点</span>になります。</p>
</div>

<h2>対象となる条件</h2>
<ul>
<li>保育士資格・幼稚園教諭免許を持っていること</li>
<li>松江市内の認可保育所・認定こども園等に勤務していること</li>
<li>月120時間以上の勤務であること</li>
</ul>

<h2>放課後児童クラブ・発達支援の従事者</h2>
<p>保育士だけでなく、放課後児童クラブの支援員や児童発達支援の従事者にも加点がある場合があります。最新の基準表を確認してください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書に加えて、保育士証の写し等が必要になる場合があります。必要書類を保育所幼稚園課に確認してください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "electronic-application",
    citySlug: "matsue",
    title: "松江市の保育園申込は電子申請が便利　スマート申請の使い方",
    description:
      "松江市の保育園入所申込で利用できる電子申請（スマート申請）の方法を解説します。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>松江市は電子申請に対応</h2>
<p>松江市では保育所等の入所申込を電子申請（スマート申請）で行うことができます。窓口に行く手間が省けて便利です。</p>

<h2>申込方法の選択肢</h2>
<ul>
<li><strong>電子申請（スマート申請）</strong>：スマートフォンやPCから24時間申込可能</li>
<li><strong>窓口申請</strong>：保育所幼稚園課・各支所で8:30〜17:15（閉庁日除く）</li>
<li><strong>郵送</strong>：必要書類を郵送で提出</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>電子申請なら自宅から24時間いつでも申込できます。ただし必要書類に不足や不備がある場合は受付ができませんのでご注意ください。</p>
</div>

<h2>注意事項</h2>
<ul>
<li>就労証明書などの添付書類もデータで提出が必要</li>
<li>入所決定後に申込内容と異なる事実が発覚した場合、決定が取り消される可能性あり</li>
<li>結果は入所希望月の前月20日頃に通知</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込の詳細は<a href="https://www.city.matsue.lg.jp/soshikikarasagasu/kosodatebu_hoikushoyoutienka/2_1/3/hoikusyoannai/20267.html" target="_blank" rel="noopener">松江市公式サイト（令和8年度入所申込）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "popular-areas",
    citySlug: "matsue",
    title: "松江市の人気エリアと入りやすい地域の傾向",
    description:
      "松江市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>松江市の保育園事情</h2>
<p>松江市は島根県の県庁所在地で人口約19万人の中核市です。市は橋北地区と橋南地区に大きく分かれ、保育園の競争率にも差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>橋北地区（松江駅周辺）：市の中心地で子育て世帯に人気</li>
<li>橋南地区（学園・乃木エリア）：住宅地として人気のエリア</li>
<li>東出雲エリア：近年の宅地開発で子育て世帯が増加</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>鹿島・島根・美保関方面：市の北部で保育園に余裕がある場合が多い</li>
<li>宍道・玉湯方面：旧町村部で定員に余裕がある傾向</li>
<li>八雲エリア：郊外で比較的入りやすい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>松江市は車での送迎が一般的です。通勤経路上の園も含めて幅広く希望園を検討しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の入所可能数を市に確認してください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "competition-reality",
    citySlug: "matsue",
    title: "松江市の保育園入園競争の実態",
    description:
      "松江市の保育園入園はどのくらい厳しいのか。選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>松江市の入園競争の現状</h2>
<p>松江市は島根県の県庁所在地ですが、全国的に見ると保育環境は比較的整っています。ただし中心部の人気園では競争があります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本指数<span class="highlight">100点</span>（父50点＋母50点）で横並びです。調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+5点）と育休復帰（+5点）を積むと、100点＋10点＝<span class="highlight">110点</span>がひとつの目安です。中心部の人気園ではこの水準が必要になることがあります。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：地域によっては入りやすい場合がある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<h2>島根県庁所在地としての特徴</h2>
<p>松江市は東京や大阪の大都市と比較すると全体的に入りやすい傾向がありますが、中心部の人気園は競争率が高くなることがあります。郊外の園や旧町村部の園も視野に入れることが重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基本指数は20点で、就労中（最大50点）の半分以下です。求職中での入園は中心部では困難です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
];

registerArticles(articles);
