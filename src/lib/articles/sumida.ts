import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "sumida",
    title: "墨田区の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "墨田区の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度4月入園のスケジュール</h2>
<p>墨田区の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬～12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年1月下旬～2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次の対象になります。希望園の変更も可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<p>見学のベストシーズンは<span class="highlight">6月～9月</span>です。10月以降は混み合うため、早めに動きましょう。</p>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "sumida",
    title: "墨田区の入園点数のしくみ　基準指数と調整指数をやさしく解説",
    description:
      "墨田区の保育園入園選考で使われる基準指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>墨田区の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基準指数（父）＋ 基準指数（母）＋ 調整指数</p>
</div>

<h2>基準指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">20点</span>で、父母合計の最大は<span class="highlight">40点</span>。</p>
<p>最も多い「就労」の場合、週5日以上かつ週40時間以上で満点の20点になります。</p>

<h2>調整指数とは？</h2>
<p>世帯の特別な事情に応じて加減される点数です。加算22項目、減算4項目があります。</p>

<ul>
<li>ひとり親世帯（就労中）：<span class="highlight">+7点</span></li>
<li>小規模保育等の卒園児：<span class="highlight">+8点</span></li>
<li>認可外保育施設の利用実績：<span class="highlight">+2点</span></li>
<li>育休明け復職予定：<span class="highlight">+2点</span></li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-checklist",
    citySlug: "sumida",
    title: "墨田区で点数を1点でも上げる方法　加点チェックリスト",
    description:
      "墨田区の入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>墨田区の入園選考では<span class="highlight">1点</span>の差が明暗を分けることも。使える加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>
<ul>
<li>認可外保育施設に月48時間以上預けている → <span class="highlight">+2点</span></li>
<li>育休・産休から入園月に復帰予定 → <span class="highlight">+2点</span></li>
<li>きょうだいが在園中の園を希望 → <span class="highlight">+3点</span></li>
<li>ひとり親で就労中 → <span class="highlight">+7点</span></li>
<li>生活保護受給で就労中 → <span class="highlight">+6点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同居の64歳以下の祖父母が保育可能な場合は-2点の減点があります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "area-guide",
    citySlug: "sumida",
    title: "墨田区の保育園マップ　エリアごとの入りやすさを比較",
    description:
      "墨田区内のエリアごとの保育園の競争率や特徴をまとめました。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>エリアごとの競争率</h2>
<p>墨田区はスカイツリー周辺の再開発でファミリー層が増加しています。</p>

<h3>競争率が高いエリア</h3>
<ul>
<li><strong>押上・業平エリア</strong>：スカイツリー周辺はマンション開発が進み激戦</li>
<li><strong>錦糸町エリア</strong>：交通利便性が高く人気。0歳児クラスは特に厳しい</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>八広・東向島エリア</strong>：駅から離れるため定員割れの園もある</li>
<li><strong>立花・文花エリア</strong>：比較的空きがある園が見つかりやすい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>墨田区の公式サイトで過去の入所下限合計指数が公開されています。希望園選びの参考にしましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "tiebreaker-guide",
    citySlug: "sumida",
    title: "墨田区で同点になったらどうなる？　優先順位のしくみ",
    description:
      "墨田区の保育園入園選考で同点になった場合の優先順位と対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>墨田区では選考指数が同点の場合、以下の順番で優先されます。</p>

<ol>
<li>墨田区に引き続き居住している期間が長い世帯</li>
<li>基準指数が高い世帯</li>
<li>希望する施設にきょうだいが在園している世帯</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>墨田区在住歴が長いほど有利です。引っ越しの予定がある方は入園後にした方がよいでしょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 48,
  },
  {
    slug: "nursery-fees",
    citySlug: "sumida",
    title: "墨田区の保育料はいくら？　世帯年収別の目安を紹介",
    description:
      "墨田区の認可保育園の保育料を世帯年収別にわかりやすく紹介します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>墨田区の認可保育園の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>

<h2>3歳以上は無償化</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。</p>

<h2>世帯年収別の保育料の目安（0～2歳児）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>～300万円</td><td>0～6,000円</td></tr>
<tr><td>300～500万円</td><td>10,000～25,000円</td></tr>
<tr><td>500～700万円</td><td>25,000～40,000円</td></tr>
<tr><td>700～1,000万円</td><td>40,000～55,000円</td></tr>
<tr><td>1,000万円～</td><td>55,000～67,000円</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記はあくまで目安です。正確な保育料は住民税額で決まります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 42,
  },
  {
    slug: "ninkagai-guide",
    citySlug: "sumida",
    title: "墨田区の認可外保育施設ガイド　認証保育所との違いは？",
    description:
      "墨田区で認可園に入れなかった場合の選択肢として、認可外保育施設や認証保育所について解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。</p>

<h2>認証保育所との違い</h2>
<table>
<tr><th>項目</th><th>認可</th><th>認証</th><th>認可外</th></tr>
<tr><td>保育料</td><td>所得に応じて</td><td>上限あり</td><td>施設が設定</td></tr>
<tr><td>申込先</td><td>区役所</td><td>施設に直接</td><td>施設に直接</td></tr>
<tr><td>入園加点</td><td>-</td><td>+2点</td><td>+2点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請すると、加点がつくため入りやすくなります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  {
    slug: "small-nursery",
    citySlug: "sumida",
    title: "墨田区の小規模保育って？　メリット・デメリットを解説",
    description:
      "墨田区の小規模保育事業の特徴や卒園後の進路について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小規模保育事業とは？</h2>
<p>定員6～19人の少人数で保育を行う施設です。対象は<span class="highlight">0～2歳児</span>のみ。</p>

<h2>メリット</h2>
<ul>
<li>少人数でアットホームな環境</li>
<li>認可園より比較的入りやすい</li>
<li>卒園時に<span class="highlight">+8点</span>の大きな加点がつく</li>
</ul>

<h2>デメリット</h2>
<ul>
<li>3歳で転園が必要（いわゆる「3歳の壁」）</li>
<li>園庭がない施設が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>墨田区では小規模保育の卒園児に+8点の加点があり、3歳からの認可園入園がかなり有利になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 35,
  },
  {
    slug: "nursery-visit-guide",
    citySlug: "sumida",
    title: "墨田区の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "墨田区の保育園見学で確認すべきポイントと質問をまとめました。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学はいつ行くのがベスト？</h2>
<p><span class="highlight">6月～9月</span>が見学のベストシーズンです。10月以降は申込直前で混み合います。</p>

<h2>見学時のチェックポイント</h2>
<ul>
<li>園児たちの表情や雰囲気</li>
<li>保育士の子どもへの接し方</li>
<li>園庭や室内の広さ・清潔さ</li>
<li>給食の内容（アレルギー対応）</li>
<li>登園・降園時の動線</li>
</ul>

<h2>聞いておきたい質問リスト</h2>
<ul>
<li>延長保育は何時まで？ 料金は？</li>
<li>慣らし保育の期間はどのくらい？</li>
<li>急な発熱時のお迎えルール</li>
<li>保護者参加の行事はどのくらいある？</li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 38,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "sumida",
    title: "墨田区の保活でよくある失敗と対策5選",
    description:
      "墨田区の保活で初めてのママがやりがちな失敗パターンと対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集のスタートが遅い</h2>
<p>墨田区の4月入園の申込は<span class="highlight">11月</span>から始まります。見学の予約が埋まる前に動きましょう。</p>

<h2>失敗2：希望園を少なく書く</h2>
<p>墨田区では希望園を複数記入できます。通える範囲の園はできるだけ多く書きましょう。</p>

<h2>失敗3：自分の点数を把握していない</h2>
<p>フルタイム共働きで<span class="highlight">40点</span>が基本ラインです。同点が多いので調整指数の加点が重要です。</p>

<h2>失敗4：加点の取りこぼし</h2>
<p>認可外保育施設に預けると<span class="highlight">+2点</span>の加点がつきます。漏れなくチェックしましょう。</p>

<h2>失敗5：書類の不備</h2>
<p>就労証明書の記入漏れや指定様式以外の提出は受理されない場合があります。</p>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
];

registerArticles(articles);
