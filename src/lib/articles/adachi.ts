import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "adachi",
    title: "足立区の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "足立区の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>足立区の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月18日（火）〜12月3日（水）</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年1月下旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次の対象になります。再申込は不要ですが、希望園の変更は可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>足立区の保育園の種類やエリアを調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：申込案内の入手</strong>
<p>足立区が発行する「保育施設利用申込案内」を入手しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月10日頃</span>です。詳しくは足立区の公式サイトをご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  // ===== 保活の基本 (2) =====
  {
    slug: "hokatsu-mistakes",
    citySlug: "adachi",
    title: "足立区の保活でよくある失敗と対策5選",
    description:
      "足立区の保活で初めてのママがやりがちな失敗パターンと、その対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集のスタートが遅い</h2>
<p>足立区の4月入園の申込は<span class="highlight">11月</span>から始まります。見学の予約が埋まる前に動きましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>遅くとも6月には情報収集を始めましょう。</p>
</div>

<h2>失敗2：希望園を少なく書く</h2>
<p>足立区では希望園を複数記入できます。1〜2園しか書かないと不承諾のリスクが高まります。通える範囲の園はできるだけ多く書きましょう。</p>

<h2>失敗3：自分の点数を把握していない</h2>
<p>足立区では「基本指数＋調整指数」の合計で選考されます。フルタイム共働きで<span class="highlight">46点</span>が基本ラインです。</p>

<h2>失敗4：加点の取りこぼし</h2>
<p>認可外保育施設に預けると<span class="highlight">+3点</span>、育休明けで<span class="highlight">+2点</span>の加点がつきます。足立区には加算21項目もあるので、漏れなくチェックしましょう。</p>

<h2>失敗5：書類の不備</h2>
<p>就労証明書の記入漏れや指定様式以外の提出は受理されない場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>足立区LINE公式アカウントのチャットボット「あだとら」で指数シミュレーションが可能です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  // ===== 選考のしくみ =====
  {
    slug: "scoring-system-guide",
    citySlug: "adachi",
    title: "足立区の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "足立区の保育園入園選考で使われる基本指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>足立区の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（父）＋ 基本指数（母）＋ 調整指数</p>
</div>

<h2>基本指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">23点</span>で、父母合計の最大は<span class="highlight">46点</span>。</p>
<p>最も多い「就労」の場合、月20日以上・1日8時間以上で満点の23点になります。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>23</td></tr>
<tr><td>月20日以上・1日6時間以上8時間未満</td><td>21</td></tr>
<tr><td>月16日以上・1日8時間以上</td><td>20</td></tr>
<tr><td>月16日以上・1日6時間以上8時間未満</td><td>19</td></tr>
<tr><td>月16日以上・1日4時間以上6時間未満</td><td>18</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の特別な事情に応じて加減される点数です。加算21項目、減算4項目があります。</p>

<ul>
<li>ひとり親世帯（就労中）：<span class="highlight">+5点</span></li>
<li>認可外保育施設の利用実績：<span class="highlight">+3点</span></li>
<li>育休明け復職予定：<span class="highlight">+2点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+2点</span></li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  // ===== 点数アップ =====
  {
    slug: "score-up-checklist",
    citySlug: "adachi",
    title: "足立区で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "足立区の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>足立区の入園選考では<span class="highlight">1点</span>の差が明暗を分けることも。使える加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>

<ul>
<li>認可外保育施設に月ぎめで預けている → <span class="highlight">+3点</span></li>
<li>育休・産休から入園月に復帰予定 → <span class="highlight">+2点</span></li>
<li>きょうだいが希望施設に在園中 → <span class="highlight">+2点</span></li>
<li>ひとり親で就労中 → <span class="highlight">+5点</span></li>
<li>生活保護受給中 → <span class="highlight">+3点</span></li>
<li>単身赴任中 → <span class="highlight">+2点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設は月48時間以上利用していることが条件です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  // ===== エリア情報 =====
  {
    slug: "area-guide",
    citySlug: "adachi",
    title: "足立区の保育園マップ　エリアごとの入りやすさを比較",
    description:
      "足立区内のエリアごとの保育園の競争率や特徴をまとめました。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>エリアごとの競争率</h2>
<p>足立区は東京23区の中では比較的保育園に入りやすい区ですが、エリアによって差があります。</p>

<h3>競争率が高いエリア</h3>
<ul>
<li><strong>北千住エリア</strong>：駅近の人気園は激戦。再開発でファミリー層が増加中</li>
<li><strong>綾瀬エリア</strong>：交通の便が良く人気。0歳児クラスは特に厳しい</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>花畑・保木間エリア</strong>：駅から離れるため定員割れの園もある</li>
<li><strong>鹿浜・江北エリア</strong>：比較的空きがある園が見つかりやすい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>足立区の公式サイトで「保育施設別待機状況・指数一覧」が公開されています。過去の内定最低指数を確認して、希望園を選びましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  // ===== 認可外 =====
  {
    slug: "ninkagai-guide",
    citySlug: "adachi",
    title: "足立区の認可外保育施設ガイド　認証保育所との違いは？",
    description:
      "足立区で認可園に入れなかった場合の選択肢として、認可外保育施設や認証保育所について解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。</p>

<h2>認証保育所との違い</h2>
<p>東京都独自の制度である<strong>認証保育所</strong>は、認可と認可外の中間的な位置づけです。</p>

<table>
<tr><th>項目</th><th>認可</th><th>認証</th><th>認可外</th></tr>
<tr><td>保育料</td><td>所得に応じて</td><td>上限あり</td><td>施設が設定</td></tr>
<tr><td>申込先</td><td>区役所</td><td>施設に直接</td><td>施設に直接</td></tr>
<tr><td>入園加点</td><td>-</td><td>+3点</td><td>+3点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請すると、加点（+3）がつくため入りやすくなります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  // ===== 小規模保育 =====
  {
    slug: "small-nursery",
    citySlug: "adachi",
    title: "足立区の小規模保育って？　メリット・デメリットを解説",
    description:
      "足立区の小規模保育事業の特徴やメリット・デメリット、卒園後の進路について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小規模保育事業とは？</h2>
<p>定員6〜19人の少人数で保育を行う施設です。対象は<span class="highlight">0〜2歳児</span>のみ。3歳以降は連携施設や別の保育園に転園します。</p>

<h2>メリット</h2>
<ul>
<li>少人数でアットホームな環境</li>
<li>認可園より比較的入りやすい</li>
<li>卒園時に連携施設への優先枠がある場合がある</li>
</ul>

<h2>デメリット</h2>
<ul>
<li>3歳で転園が必要（いわゆる「3歳の壁」）</li>
<li>園庭がない施設が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>足立区では小規模保育の卒園児に対して、認可園への優先利用調整を行っています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 35,
  },
  // ===== 同点対策 =====
  {
    slug: "tiebreaker-guide",
    citySlug: "adachi",
    title: "足立区で同点になったらどうなる？　優先順位のしくみ",
    description:
      "足立区の保育園入園選考で同点になった場合の優先順位と、事前にできる対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>足立区では選考指数が同点の場合、以下の順番で優先されます。</p>

<ol>
<li>希望する保育施設にきょうだいが在園している世帯</li>
<li>足立区に引き続き居住している期間が長い世帯</li>
<li>基本指数が高い世帯</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園中の園を希望に入れると、指数+2だけでなく同点時の優先順位でも有利になります。</p>
</div>

<h2>対策のポイント</h2>
<ul>
<li>加点を1つでも積み上げて同点を避ける</li>
<li>きょうだいが在園中の園を第1希望にする</li>
<li>ボーダーラインが低い園も希望に入れる</li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 48,
  },
  // ===== 保育料 =====
  {
    slug: "nursery-fees",
    citySlug: "adachi",
    title: "足立区の保育料はいくら？　世帯年収別の目安を紹介",
    description:
      "足立区の認可保育園の保育料を世帯年収別にわかりやすく紹介します。無償化の対象も解説。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>足立区の認可保育園の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>

<h2>3歳以上は無償化</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。</p>

<h2>世帯年収別の保育料の目安（0〜2歳児）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>〜300万円</td><td>0〜5,000円</td></tr>
<tr><td>300〜500万円</td><td>10,000〜25,000円</td></tr>
<tr><td>500〜700万円</td><td>25,000〜40,000円</td></tr>
<tr><td>700〜1,000万円</td><td>40,000〜55,000円</td></tr>
<tr><td>1,000万円〜</td><td>55,000〜66,000円</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記はあくまで目安です。正確な保育料は住民税額で決まります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 42,
  },
  // ===== 見学ガイド =====
  {
    slug: "nursery-visit-guide",
    citySlug: "adachi",
    title: "足立区の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "足立区の保育園見学で確認すべきポイントと、先輩ママが聞いてよかった質問をまとめました。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学はいつ行くのがベスト？</h2>
<p><span class="highlight">6月〜9月</span>が見学のベストシーズンです。10月以降は申込直前で混み合います。</p>

<h2>見学時のチェックポイント</h2>
<ul>
<li>園児たちの表情や雰囲気</li>
<li>保育士の子どもへの接し方</li>
<li>園庭や室内の広さ・清潔さ</li>
<li>給食の内容（アレルギー対応）</li>
<li>持ち物の量（おむつの持参が必要か等）</li>
<li>登園・降園時の動線（ベビーカー置き場等）</li>
</ul>

<h2>聞いておきたい質問リスト</h2>
<ul>
<li>延長保育は何時まで？ 料金は？</li>
<li>慣らし保育の期間はどのくらい？</li>
<li>急な発熱時のお迎えルール</li>
<li>保護者参加の行事はどのくらいある？</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学はできるだけ複数の園を回りましょう。比較することで自分に合った園が見えてきます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 38,
  },
];

registerArticles(articles);
