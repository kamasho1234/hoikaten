import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "score-up-checklist",
    citySlug: "arakawa",
    title: "荒川区で加点を最大限に活用する方法　調整指数チェックリスト",
    description:
      "荒川区の保育園入園選考で調整指数の加点を活用するためのチェックリストです。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>荒川区の入園選考では加点の有無が合否を分けます。使える加点は漏れなく活用しましょう。</p>

<h3>主な加点項目</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+4点</td><td>死別・離別等でひとり親の場合</td></tr>
<tr><td>生活保護世帯（就労中）</td><td>+4点</td><td>生活保護受給中で就労している場合</td></tr>
<tr><td>認可外保育施設の利用</td><td>+2点</td><td>月48時間以上有償で預けている場合</td></tr>
<tr><td>きょうだいが在園中</td><td>+2点</td><td>入園希望園にきょうだいが通っている場合</td></tr>
<tr><td>育休明け復職予定</td><td>+2点</td><td>入園月中に復職する場合</td></tr>
<tr><td>単身赴任</td><td>+2点</td><td>保護者の一方が単身赴任中</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>荒川区ではひとり親世帯の場合、保護者指数に+20が加算されるほか、調整指数でも+4の加算があります。</p>
</div>

<h2>フルタイム共働き40点からのスタート</h2>
<p>父母ともに月20日以上・1日8時間以上の就労で基本指数は<span class="highlight">40点</span>です。ここに育休明け（+2）＋認可外利用（+2）で44点が入園ラインの目安です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.arakawa.tokyo.jp/a037/kosodate/hoikuen/shisu.html" target="_blank" rel="noopener">荒川区公式サイト「保育実施基準（指数）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "competition-reality",
    citySlug: "arakawa",
    title: "荒川区の保育園、入りやすさの実態と競争の現状",
    description:
      "荒川区の認可保育園の入園競争の実態をデータで解説します。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>荒川区の入園状況</h2>
<p>荒川区はコンパクトな区で保育施設の整備が進んでいますが、日暮里・町屋エリアを中心に競争が続いています。</p>

<h2>年齢別の傾向</h2>
<table>
<tr><th>年齢</th><th>競争状況</th></tr>
<tr><td>0歳児</td><td>比較的入りやすい</td></tr>
<tr><td>1歳児</td><td>最も競争が激しい</td></tr>
<tr><td>2歳児</td><td>やや厳しい</td></tr>
<tr><td>3歳児以上</td><td>比較的入りやすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>荒川区では利用調整結果が公開されています。令和7年度のデータでは、1歳児クラスのボーダーが40〜44点の園が多くなっています。</p>
</div>

<h2>利用調整結果を確認しよう</h2>
<p>荒川区は園別の利用調整結果を公開しています。希望園の過去のデータを必ず確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整結果は<a href="https://www.city.arakawa.tokyo.jp/a037/kosodate/hoikuen/31nen4gatu1jikekka.html" target="_blank" rel="noopener">荒川区公式サイト「利用調整結果」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "jitan-kinmu-score",
    citySlug: "arakawa",
    title: "時短勤務と保育園　荒川区の点数への影響は？",
    description:
      "荒川区の保育園入園選考で時短勤務が基準指数にどう影響するかを解説します。",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務だと点数は下がる？</h2>
<p>荒川区では、育児短時間勤務制度を利用している場合、<strong>短縮前の所定労働時間</strong>で基準指数が算定されます。</p>

<table>
<tr><th>勤務形態</th><th>基準指数</th></tr>
<tr><td>フルタイム（月20日・1日8時間）を時短で6時間に</td><td><span class="highlight">20点</span>（フルタイムで計算）</td></tr>
<tr><td>フルタイムを時短にし月16日に変更</td><td><span class="highlight">16〜17点</span>（日数は短縮後で計算）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>時間は短縮前で計算されますが、勤務日数が減る場合は影響が出ます。日数はできるだけ維持しましょう。</p>
</div>

<h2>入園後の時短勤務</h2>
<p>入園後に時短勤務に切り替えることは問題ありません。月<span class="highlight">48時間</span>以上の勤務が必要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.arakawa.tokyo.jp/a037/kosodate/hoikuen/shisu.html" target="_blank" rel="noopener">荒川区公式サイト「保育実施基準（指数）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "same-score-priority",
    citySlug: "arakawa",
    title: "荒川区で同点になったらどうなる？優先順位を詳しく解説",
    description:
      "荒川区の保育園入園選考で同じ指数になった場合の優先順位を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>荒川区の入園選考では、指数が同じ場合に以下の優先順位で判定されます。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>基本指数が高い世帯</strong>
<p>調整指数を除いた基本点数が高い世帯が優先されます。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>ひとり親世帯</strong>
<p>ひとり親世帯が優先されます。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>きょうだいが在園中</strong>
<p>希望園にきょうだいが在園している世帯が優先されます。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>所得が低い世帯</strong>
<p>住民税の所得割額が低い世帯が優先されます。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>区内在住期間が長い世帯</strong>
<p>荒川区に住民登録している期間が長い世帯が優先されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>荒川区では「基本指数が高い」が最優先されるのが特徴です。調整指数で稼いだ点より、就労実績による点の方が有利です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.arakawa.tokyo.jp/a037/kosodate/hoikuen/shisu.html" target="_blank" rel="noopener">荒川区公式サイト「保育実施基準（指数）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "ochita-sentakushi",
    citySlug: "arakawa",
    title: "荒川区で保育園に落ちたときの選択肢",
    description:
      "荒川区の認可保育園に入れなかった場合に検討すべき選択肢を紹介します。",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>落ちても次の手はある</h2>
<p>荒川区の一次選考で不承諾になった場合の選択肢を確認しましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次選考を待つ</strong>
<p>一次で不承諾の方は二次選考の対象になります。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認証保育所に申し込む</strong>
<p>荒川区内の認証保育所に直接申し込めます。利用実績があると翌年度に+2の加点が得られます。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>小規模保育事業を利用する</strong>
<p>0〜2歳児向けの小規模保育事業もあります。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>家庭福祉員（保育ママ）を利用する</strong>
<p>荒川区では家庭福祉員制度も実施されています。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>幼稚園の預かり保育（3歳以上）</strong>
<p>3歳以上なら幼稚園の預かり保育も選択肢です。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.arakawa.tokyo.jp/a037/kosodate/hoikuen/07nyuuennannai.html" target="_blank" rel="noopener">荒川区公式サイト「保育園入園のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "arakawa",
    title: "荒川区で認可外保育施設を活用して加点を得る方法",
    description:
      "荒川区で認可外保育施設の利用実績による加点の条件と注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用で+2点の加点</h2>
<p>荒川区では、認可外保育施設に月ぎめで子どもを預けている場合、調整指数として<span class="highlight">+2点</span>が加算されます。</p>

<h3>加点の条件</h3>
<ul>
<li>認証保育所や認可外保育施設に月48時間以上預けていること</li>
<li>就労等の理由で有償で預けていること</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休中に認可外に預けても加点対象にならない場合があります。区に確認しましょう。</p>
</div>

<h2>フルタイム40点＋加点で44点を目指す</h2>
<p>荒川区ではフルタイム共働き（40点）＋育休明け（+2）＋認可外利用（+2）＝<span class="highlight">44点</span>が標準的な入園ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設の費用は月5〜8万円程度ですが、荒川区と東京都の補助金を活用すれば負担を軽減できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.arakawa.tokyo.jp/a037/kosodate/hoikuen/shisu.html" target="_blank" rel="noopener">荒川区公式サイト「保育実施基準（指数）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "2026-hokatsu-changes",
    citySlug: "arakawa",
    title: "2026年度入園に向けて！荒川区の保活で変わったポイント",
    description:
      "2026年度の荒川区保育園入園に向けて、最近の制度変更をまとめます。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2025〜2026年で何が変わった？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>保育料の無償化拡大（2025年9月〜）</strong>
<p>東京都の第1子保育料無償化制度により、認可保育施設の保育料が全年齢で無償化されました。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設の補助金拡充</strong>
<p>認証保育所への補助金が拡充されました。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>ひとり親世帯への手厚い配慮</strong>
<p>ひとり親世帯は保護者指数に+20の加算に加え、調整指数でも+4の加点があります。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>荒川区は比較的コンパクトな区で、保育施設の整備が進んでいます。1歳児クラスの競争は引き続き注意が必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.arakawa.tokyo.jp/a037/kosodate/hoikuen/07nyuuennannai.html" target="_blank" rel="noopener">荒川区公式サイト「保育園入園のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "arakawa",
    title: "荒川区の入園点数のしくみ　基準指数と調整指数をやさしく解説",
    description:
      "荒川区の保育園入園選考で使われる基準指数と調整指数の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>荒川区の保育園入園は「世帯指数」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>世帯指数 ＝ 父の基準指数 ＋ 母の基準指数 ＋ 調整指数</p>
</div>

<h2>基準指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">20点</span>、父母合計で最大<span class="highlight">40点</span>です。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上・1日6時間以上8時間未満</td><td>18</td></tr>
<tr><td>月16日以上・1日8時間以上</td><td>17</td></tr>
<tr><td>月16日以上・1日6時間以上8時間未満</td><td>16</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の特別な事情に応じた加点です。</p>
<ul>
<li>ひとり親世帯：<span class="highlight">+4点</span></li>
<li>生活保護世帯（就労中）：<span class="highlight">+4点</span></li>
<li>認可外利用：<span class="highlight">+2点</span></li>
<li>きょうだい在園：<span class="highlight">+2点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ひとり親世帯の場合は、保護者指数に別途+20が加算されます（調整指数とは別）。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数表は<a href="https://www.city.arakawa.tokyo.jp/a037/kosodate/hoikuen/shisu.html" target="_blank" rel="noopener">荒川区公式サイト「保育実施基準（指数）」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "area-guide",
    citySlug: "arakawa",
    title: "荒川区のエリア別保育園事情　入りやすいエリアは？",
    description:
      "荒川区内のエリアごとの保育園入園状況の違いを解説します。",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>エリアによって入りやすさが違う</h2>
<p>荒川区はコンパクトな区ですが、エリアによって保育園の状況は異なります。</p>

<table>
<tr><th>エリア</th><th>競争度</th><th>特徴</th></tr>
<tr><td>日暮里駅周辺</td><td>激戦</td><td>交通利便性が高く子育て世帯に人気</td></tr>
<tr><td>町屋</td><td>やや激戦</td><td>マンション開発が進む住宅エリア</td></tr>
<tr><td>南千住</td><td>標準</td><td>タワーマンションが増えているが園も増加</td></tr>
<tr><td>尾久・東尾久</td><td>やや入りやすい</td><td>住宅街で比較的穏やかな競争</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>日暮里エリアは特に人気が高いです。隣接する南千住や町屋エリアも候補に入れると選択肢が広がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>園ごとの状況は<a href="https://www.city.arakawa.tokyo.jp/a037/kosodate/hoikuen/31nen4gatu1jikekka.html" target="_blank" rel="noopener">荒川区公式サイト「利用調整結果」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "hokatsu-schedule",
    citySlug: "arakawa",
    title: "荒川区の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "荒川区の認可保育園の申込時期・選考の流れ・結果通知の時期を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度4月入園のスケジュール</h2>
<p>荒川区の4月入園は<strong>一次選考</strong>と<strong>二次選考</strong>の2回に分かれています。</p>

<h3>一次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>

<h3>二次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年1月下旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>荒川区の「保育園入園のご案内」を入手しましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜10月：保育園見学</strong>
<p>気になる園に電話して見学予約をしましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜12月：書類準備・提出</strong>
<p>就労証明書などを揃えて提出します。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新スケジュールは<a href="https://www.city.arakawa.tokyo.jp/a037/kosodate/hoikuen/07nyuuennannai.html" target="_blank" rel="noopener">荒川区公式サイト「保育園入園のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "arakawa",
    title: "荒川区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "荒川区の認可保育園の保育料を年収・子ども数別に詳しく解説。区民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>荒川区の保育料はどうやって決まる？</h2>
<p>荒川区の認可保育園の保育料（利用者負担額）は、<strong>世帯の区民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

<h2>年齢ごとの基本ルール</h2>
<table>
<tr><th>年齢</th><th>保育料</th><th>注意点</th></tr>
<tr><td>0〜2歳児</td><td>有料（階層区分による）</td><td>世帯の所得割額で決定</td></tr>
<tr><td>3〜5歳児</td><td>無償（月額上限あり）</td><td>幼児教育・保育の無償化対象</td></tr>
</table>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上は保育料が無償化されますが、<span class="highlight">副食費（給食の食材費）は別途負担</span>が必要です。低所得世帯や第3子以降は免除される場合があります。</p>
</div>

<h2>保育料の階層区分（0〜2歳の目安）</h2>
<table>
<tr><th>区民税所得割額（世帯合計）</th><th>保育料目安（月額・0歳）</th></tr>
<tr><td>非課税世帯</td><td>無料</td></tr>
<tr><td>〜約5万円</td><td>6,000〜9,000円</td></tr>
<tr><td>〜約10万円</td><td>12,000〜19,000円</td></tr>
<tr><td>〜約20万円</td><td>25,000〜38,000円</td></tr>
<tr><td>〜約30万円</td><td>42,000〜52,000円</td></tr>
<tr><td>30万円超</td><td>58,000〜77,000円</td></tr>
</table>
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は荒川区の公式保育料表をご確認ください。</p>

<h2>多子世帯・ひとり親世帯の軽減</h2>
<ul>
<li><strong>第2子</strong>：同一世帯で保育所等を利用中の場合、半額</li>
<li><strong>第3子以降</strong>：無料</li>
<li><strong>ひとり親世帯・生活保護世帯</strong>：最低階層として算定（大幅減額）</li>
</ul>

<h2>副食費について（3歳以上）</h2>
<p>3歳以上は保育料が無償化されますが、副食費（おかず代）は月額4,500円程度の実費負担があります。以下の場合は免除されます。</p>
<ul>
<li>年収360万円未満相当の世帯</li>
<li>第3子以降の子ども</li>
</ul>

<h2>保育料の確認方法</h2>
<p>毎年6月ごろ、前年度の区民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は荒川区担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は荒川区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "arakawa",
    title: "荒川区の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "荒川区の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>荒川区の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。荒川区では副食費として月額4,500円程度が別途かかります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上でも副食費は無償化の対象外です。ただし、低所得世帯・第3子以降は免除制度があります。</p>
</div>

<h2>副食費の月額目安</h2>
<table>
<tr><th>年齢</th><th>副食費（月額目安）</th></tr>
<tr><td>3〜5歳児</td><td>約4,500円</td></tr>
<tr><td>0〜2歳児</td><td>保育料に含む（副食費別途なし）</td></tr>
</table>
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は荒川区公式サイトでご確認ください。</p>

<h2>副食費が免除される条件</h2>
<table>
<tr><th>免除条件</th><th>内容</th></tr>
<tr><td>年収360万円未満相当の世帯</td><td>区民税所得割額が一定以下の世帯は副食費が免除</td></tr>
<tr><td>第3子以降の子ども</td><td>小学3年生以下のきょうだいが2人以上いる場合、3人目以降は免除</td></tr>
<tr><td>生活保護世帯</td><td>副食費の負担なし</td></tr>
</table>

<h2>保育料無償化の対象範囲</h2>
<ul>
<li>無償化対象：<strong>保育料（基本利用料）</strong>のみ — 3歳〜5歳</li>
<li>実費負担が残るもの：副食費（おかず代）・主食費（ご飯代）・行事費・通園バス代など</li>
</ul>

<h2>副食費の支払い方法</h2>
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。荒川区担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は荒川区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
