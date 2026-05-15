import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "imabari",
    title: "今治市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "今治市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>今治市の4月入園は一次選考と二次選考に分かれています。</p>

<h3>一次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>

<h3>二次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年1月下旬〜2月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は引き続き二次選考の対象になります。希望施設の変更も可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>今治市の保育施設の種類・エリアを調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。夏〜秋が見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：申込案内の入手</strong>
<p>今治市こども未来課が発行する申込案内を入手しましょう。</p>
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
<p>各月の申込締切は入園希望月の<span class="highlight">前月10日頃</span>です。詳しくは今治市こども未来課にご確認ください。</p>`,
    publishedAt: "2026-04-18",
    popularity: 55,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "imabari",
    title: "今治市の保活でよくある失敗と対策5選",
    description:
      "今治市の保活で初めてのパパ・ママがやりがちな失敗パターンと、その対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集のスタートが遅い</h2>
<p>今治市の4月入園の申込は<span class="highlight">11月</span>から始まります。見学の予約が埋まる前に動きましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>遅くとも6月には情報収集を始めましょう。</p>
</div>

<h2>失敗2：希望園を少なく書く</h2>
<p>今治市では希望施設を複数記入できます。1〜2園しか書かないと不承諾のリスクが高まります。通える範囲の園はできるだけ多く書きましょう。</p>

<h2>失敗3：自分の点数を把握していない</h2>
<p>今治市では「基礎指数＋優先指数」の合計で選考されます。フルタイム共働きで<span class="highlight">20点</span>が基本ラインです。</p>

<h2>失敗4：加点の取りこぼし</h2>
<p>ひとり親で<span class="highlight">+5点</span>、育休明けで<span class="highlight">+2点</span>、きょうだいが在園中の園を希望で<span class="highlight">+3点</span>の加点があります。漏れなくチェックしましょう。</p>

<h2>失敗5：書類の不備</h2>
<p>就労証明書の記入漏れや指定様式以外の提出は受理されない場合があります。提出前に今治市の窓口に確認しましょう。</p>`,
    publishedAt: "2026-04-18",
    popularity: 50,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "imabari",
    title: "今治市の入園点数のしくみ　基礎指数と優先指数をやさしく解説",
    description:
      "今治市の保育園入園選考で使われる基礎指数・優先指数・調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>今治市の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基礎指数（保護者1）＋ 基礎指数（保護者2）＋ 調整指数</p>
</div>

<h2>基礎指数とは？</h2>
<p>保護者それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">10点</span>で、2人合計の最大は<span class="highlight">20点</span>です。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>10</td></tr>
<tr><td>月140時間以上160時間未満</td><td>9</td></tr>
<tr><td>月120時間以上140時間未満</td><td>8</td></tr>
<tr><td>月80時間以上120時間未満</td><td>7</td></tr>
<tr><td>月64時間以上80時間未満</td><td>6</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の特別な事情に応じて加減される点数です。</p>

<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+3点</span></li>
<li>育休期間終了により復職：<span class="highlight">+2点</span></li>
<li>市内在住の祖父母なし：<span class="highlight">+1点</span></li>
<li>65歳未満の就労なし祖父母と同居：<span class="highlight">−1点</span></li>
</ul>`,
    publishedAt: "2026-04-18",
    popularity: 65,
  },
  {
    slug: "score-up-checklist",
    citySlug: "imabari",
    title: "今治市で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "今治市の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>今治市の入園選考では<span class="highlight">1点</span>の差が明暗を分けることも。使える加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>

<ul>
<li>ひとり親（死亡・離別・行方不明） → <span class="highlight">+5点</span></li>
<li>きょうだいが希望施設に在園中 → <span class="highlight">+3点</span></li>
<li>きょうだいと同時に同じ施設を希望 → <span class="highlight">+2点</span></li>
<li>育休期間終了により復職 → <span class="highlight">+2点</span></li>
<li>産前産後休暇終了により復職 → <span class="highlight">+2点</span></li>
<li>単身赴任等で保護者が常時不在 → <span class="highlight">+2点</span></li>
<li>市内在住の祖父母がいない → <span class="highlight">+1点</span></li>
<li>生活保護受給中 → <span class="highlight">+2点</span></li>
<li>当該児童を含めて3人以上の子がいる → <span class="highlight">+1点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>65歳未満で就労等がない祖父母と同居している場合は<span class="highlight">−1点</span>の減点があります。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>医療的ケア児として主治医が集団保育可と認定した場合は<span class="highlight">+5点</span>の大きな加点があります。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 60,
  },
  {
    slug: "area-guide",
    citySlug: "imabari",
    title: "今治市の保育園マップ　エリアごとの特徴を比較",
    description:
      "今治市内のエリアごとの保育園の特徴や競争状況をまとめました。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>今治市の保育施設の概要</h2>
<p>今治市は愛媛県第2の都市で、市内に認可保育所・認定こども園が数多くあります。中心部から島しょ部まで広いエリアにわたります。</p>

<h3>競争率が高いエリア</h3>
<ul>
<li><strong>今治駅周辺・中央エリア</strong>：交通の便がよく、ファミリー層に人気。0歳児クラスは特に競争が激しい</li>
<li><strong>波方・大西エリア</strong>：人口が集中する住宅地エリアで需要が高い</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>島しょ部（大島・伯方島等）</strong>：定員に余裕がある施設も多い</li>
<li><strong>郊外の農村エリア</strong>：待機児童が少なく入りやすい傾向</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>今治市の公式サイトで保育施設の空き状況が確認できます。希望エリアを複数持っておくと安心です。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 45,
  },
  {
    slug: "ninkagai-guide",
    citySlug: "imabari",
    title: "今治市の認可外保育施設ガイド　認可に入れなかったときの選択肢",
    description:
      "今治市で認可園に入れなかった場合の選択肢として、認可外保育施設について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。今治市にも複数の認可外施設があります。</p>

<h2>認可外保育施設のメリット</h2>
<ul>
<li>認可に比べて入りやすい場合が多い</li>
<li>定員や年齢に柔軟に対応できる施設もある</li>
<li>延長保育や夜間保育に対応している施設もある</li>
</ul>

<h2>認可外保育施設の注意点</h2>
<ul>
<li>保育料は施設が独自に設定するため割高になることも</li>
<li>施設の質は施設によって異なるため見学が重要</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請すると、翌年度の入園に向けて継続して申込ができます。あきらめずに再チャレンジしましょう。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 40,
  },
  {
    slug: "small-nursery",
    citySlug: "imabari",
    title: "今治市の小規模保育って？　メリット・デメリットを解説",
    description:
      "今治市の小規模保育事業の特徴やメリット・デメリット、卒園後の進路について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小規模保育事業とは？</h2>
<p>定員6〜19人の少人数で保育を行う施設です。対象は<span class="highlight">0〜2歳児</span>のみ。3歳以降は連携施設や別の保育園に転園します。</p>

<h2>メリット</h2>
<ul>
<li>少人数でアットホームな環境</li>
<li>大規模園より比較的入りやすい傾向がある</li>
<li>保育士1人あたりの子ども数が少なく目が届きやすい</li>
</ul>

<h2>デメリット</h2>
<ul>
<li>2歳で転園が必要（いわゆる「3歳の壁」）</li>
<li>園庭がない施設が多い</li>
<li>行事や友達関係が大規模園より限られる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>今治市の小規模保育卒園児には連携施設への優先枠がある場合があります。入園前に連携先の施設も確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 35,
  },
  {
    slug: "tiebreaker-guide",
    citySlug: "imabari",
    title: "今治市で同点になったらどうなる？　優先順位のしくみ",
    description:
      "今治市の保育園入園選考で同点になった場合の優先順位と、事前にできる対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>今治市では選考指数が同点の場合、以下の順番で優先されます。</p>

<ol>
<li>ひとり親世帯</li>
<li>生活保護受給世帯</li>
<li>きょうだいが希望施設に在園中の世帯</li>
<li>基礎指数が高い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園中の園を希望に入れると、指数+3だけでなく同点時の優先順位でも有利になります。</p>
</div>

<h2>対策のポイント</h2>
<ul>
<li>調整指数を1つでも積み上げて同点を避ける</li>
<li>きょうだいが在園中の園を第1希望にする</li>
<li>ボーダーラインが低い園も希望に入れる</li>
</ul>`,
    publishedAt: "2026-04-18",
    popularity: 48,
  },
  {
    slug: "nursery-fees",
    citySlug: "imabari",
    title: "今治市の保育料はいくら？　世帯年収別の目安を紹介",
    description:
      "今治市の認可保育園の保育料を世帯年収別にわかりやすく紹介します。無償化の対象も解説。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>今治市の認可保育園の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>

<h2>3歳以上は無償化</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。</p>

<h2>世帯年収別の保育料の目安（0〜2歳児）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>〜300万円</td><td>0〜5,000円</td></tr>
<tr><td>300〜500万円</td><td>10,000〜25,000円</td></tr>
<tr><td>500〜700万円</td><td>25,000〜38,000円</td></tr>
<tr><td>700〜1,000万円</td><td>38,000〜52,000円</td></tr>
<tr><td>1,000万円〜</td><td>52,000円〜</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記はあくまで目安です。正確な保育料は住民税額で決まります。今治市こども未来課にご確認ください。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 42,
  },
  {
    slug: "nursery-visit-guide",
    citySlug: "imabari",
    title: "今治市の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "今治市の保育園見学で確認すべきポイントと、聞いておきたい質問をまとめました。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学はいつ行くのがベスト？</h2>
<p><span class="highlight">7月〜9月</span>が見学のベストシーズンです。10月以降は申込直前で混み合います。</p>

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
    publishedAt: "2026-04-18",
    popularity: 38,
  },
];

registerArticles(articles);
