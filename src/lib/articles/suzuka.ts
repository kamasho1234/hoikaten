import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "suzuka",
    title: "鈴鹿市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "鈴鹿市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>鈴鹿市の4月入園申込は一括して受け付けます。</p>

<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>選考・調整</td><td>令和7年12月〜令和8年1月</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>鈴鹿市は三重県第2の都市で、ホンダ鈴鹿製作所を中心に共働き世帯が多く、保育需要が高い地域です。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>鈴鹿市の保育施設の種類・エリアを調べましょう。</p>
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
<p>鈴鹿市こども政策課の申込案内を入手しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 55,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "suzuka",
    title: "鈴鹿市の保活でよくある失敗と対策5選",
    description:
      "鈴鹿市の保活で初めてのパパ・ママがやりがちな失敗パターンと、その対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集のスタートが遅い</h2>
<p>鈴鹿市の4月入園の申込は<span class="highlight">11月</span>から始まります。見学の予約が埋まる前に動きましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>遅くとも6月には情報収集を始めましょう。</p>
</div>

<h2>失敗2：希望園を少なく書く</h2>
<p>鈴鹿市では希望施設を複数記入できます。1〜2園しか書かないと不承諾のリスクが高まります。通える範囲の園はできるだけ多く書きましょう。</p>

<h2>失敗3：自分の点数を把握していない</h2>
<p>鈴鹿市の点数は最大210点と他市よりスケールが大きく、フルタイム共働きで<span class="highlight">210点</span>が基本の最高点です。自分の点数を事前に確認しましょう。</p>

<h2>失敗4：加点の取りこぼし</h2>
<p>ひとり親で<span class="highlight">+120点</span>、きょうだいが在園中の園を希望で<span class="highlight">+50点</span>の大きな加点があります。漏れなくチェックしましょう。</p>

<h2>失敗5：書類の不備</h2>
<p>就労証明書の記入漏れや指定様式以外の提出は受理されない場合があります。提出前に鈴鹿市の窓口に確認しましょう。</p>`,
    publishedAt: "2026-04-18",
    popularity: 50,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "suzuka",
    title: "鈴鹿市の入園点数のしくみ　最大210点の指数をやさしく解説",
    description:
      "鈴鹿市の保育園入園選考で使われる指数（最大210点）の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>鈴鹿市の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（保護者1）＋ 基本指数（保護者2）＋ 調整指数（最大210点）</p>
</div>

<h2>基本指数とは？</h2>
<p>保護者それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">105点</span>です。</p>

<table>
<tr><th>就労状況（屋宅外）</th><th>指数</th></tr>
<tr><td>月180時間以上</td><td>105</td></tr>
<tr><td>月170時間以上180時間未満</td><td>100</td></tr>
<tr><td>月160時間以上170時間未満</td><td>95</td></tr>
<tr><td>月150時間以上160時間未満</td><td>90</td></tr>
<tr><td>月130時間以上150時間未満</td><td>80</td></tr>
<tr><td>月120時間以上130時間未満</td><td>70</td></tr>
<tr><td>月100時間以上120時間未満</td><td>60</td></tr>
<tr><td>月80時間以上100時間未満</td><td>50</td></tr>
<tr><td>月60時間以上80時間未満</td><td>40</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の特別な事情に応じて加減される点数です。</p>

<ul>
<li>ひとり親世帯：<span class="highlight">+120点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+50点</span></li>
<li>育休明け：<span class="highlight">+10点</span></li>
<li>子どもに障害あり：<span class="highlight">+20点</span></li>
<li>認可外保育施設利用6か月以上：<span class="highlight">+10点</span></li>
</ul>`,
    publishedAt: "2026-04-18",
    popularity: 65,
  },
  {
    slug: "score-up-checklist",
    citySlug: "suzuka",
    title: "鈴鹿市で点数を上げる方法　加点のチェックリスト",
    description:
      "鈴鹿市の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>鈴鹿市の入園選考では指数の差が明暗を分けます。使える加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>

<ul>
<li>ひとり親（死亡・離別・行方不明等） → <span class="highlight">+120点</span></li>
<li>きょうだいが希望施設に在園中 → <span class="highlight">+50点</span></li>
<li>生活保護受給中 → <span class="highlight">+50点</span></li>
<li>父または母が不在（単身赴任等） → <span class="highlight">+50点</span></li>
<li>子どもに障害あり → <span class="highlight">+20点</span></li>
<li>きょうだいと同時に申込 → <span class="highlight">+10点</span></li>
<li>育休明け → <span class="highlight">+10点</span></li>
<li>失業（倒産等による） → <span class="highlight">+10点</span></li>
<li>認可外保育施設利用6か月以上 → <span class="highlight">+10点</span></li>
<li>認可外保育施設利用3か月以上6か月未満 → <span class="highlight">+5点</span></li>
<li>3人以上（小学3年以下）の多子家庭 → <span class="highlight">+5点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意（減点項目）</strong></p>
<p>配偶者等が自家・同一敷地内で仕事中の場合は<span class="highlight">−10点</span>、60〜65歳未満の祖父母が同居で昼間在宅の場合は<span class="highlight">−20点</span>、60歳未満は<span class="highlight">−30点</span>の減点があります。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 60,
  },
  {
    slug: "area-guide",
    citySlug: "suzuka",
    title: "鈴鹿市の保育園マップ　エリアごとの特徴を比較",
    description:
      "鈴鹿市内のエリアごとの保育園の特徴や競争状況をまとめました。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>鈴鹿市の保育施設の概要</h2>
<p>鈴鹿市は三重県第2の都市で、ホンダ鈴鹿製作所をはじめとする製造業が盛んな工業都市です。共働き世帯が多く保育需要が高い地域です。</p>

<h3>競争率が高いエリア</h3>
<ul>
<li><strong>鈴鹿駅・白子駅周辺</strong>：交通の便がよく、ファミリー層に人気。0歳児クラスは特に競争が激しい</li>
<li><strong>千代崎・若松エリア</strong>：住宅開発が進む人気エリア</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>山間部・農村エリア</strong>：市の南部や西部は比較的余裕がある施設が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>鈴鹿市の公式サイトで保育施設の空き状況が確認できます。勤務地に近い施設も選択肢に入れましょう。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 45,
  },
  {
    slug: "ninkagai-guide",
    citySlug: "suzuka",
    title: "鈴鹿市の認可外保育施設ガイド　認可に入れなかったときの選択肢",
    description:
      "鈴鹿市で認可園に入れなかった場合の選択肢として、認可外保育施設について解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。鈴鹿市にも複数の認可外施設があります。</p>

<h2>鈴鹿市の加点制度に注目</h2>
<p>鈴鹿市では認可外保育施設を一定期間利用することで、翌年の入園選考に加点がつきます。</p>

<ul>
<li>6か月以上の利用：<span class="highlight">+10点</span></li>
<li>3か月以上6か月未満の利用：<span class="highlight">+5点</span></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に半年以上預けて翌年度の認可園を再申請すると、+10点の加点が得られます。積極的に活用しましょう。</p>
</div>

<h2>認可外を選ぶ際の注意点</h2>
<ul>
<li>保育料は施設が独自に設定するため確認が必要</li>
<li>見学して施設の雰囲気・設備を必ず確認する</li>
</ul>`,
    publishedAt: "2026-04-18",
    popularity: 42,
  },
  {
    slug: "small-nursery",
    citySlug: "suzuka",
    title: "鈴鹿市の小規模保育って？　メリット・デメリットを解説",
    description:
      "鈴鹿市の小規模保育事業の特徴やメリット・デメリット、卒園後の進路について解説します。",
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
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>鈴鹿市の小規模保育卒園児は連携施設への優先枠がある場合があります。入園前に連携先の施設も確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 35,
  },
  {
    slug: "tiebreaker-guide",
    citySlug: "suzuka",
    title: "鈴鹿市で同点になったらどうなる？　優先順位のしくみ",
    description:
      "鈴鹿市の保育園入園選考で同点になった場合の優先順位と、事前にできる対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>鈴鹿市では選考指数が同点の場合、以下の順番で優先されます。</p>

<ol>
<li>ひとり親世帯</li>
<li>生活保護受給世帯</li>
<li>基本指数が高い世帯（就労時間が長い）</li>
<li>申込日が早い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>申込は締切ギリギリではなく早めに提出することで、同点時に有利になります。</p>
</div>

<h2>対策のポイント</h2>
<ul>
<li>調整指数を1つでも積み上げて同点を避ける</li>
<li>申込書類は早めに準備して早期提出する</li>
<li>ボーダーラインが低い園も希望に入れる</li>
</ul>`,
    publishedAt: "2026-04-18",
    popularity: 48,
  },
  {
    slug: "nursery-fees",
    citySlug: "suzuka",
    title: "鈴鹿市の保育料はいくら？　世帯年収別の目安を紹介",
    description:
      "鈴鹿市の認可保育園の保育料を世帯年収別にわかりやすく紹介します。無償化の対象も解説。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>鈴鹿市の認可保育園の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>

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
<p>上記はあくまで目安です。正確な保育料は住民税額で決まります。鈴鹿市こども政策課にご確認ください。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 40,
  },
  {
    slug: "nursery-visit-guide",
    citySlug: "suzuka",
    title: "鈴鹿市の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "鈴鹿市の保育園見学で確認すべきポイントと、聞いておきたい質問をまとめました。",
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
<li>登園・降園時の動線</li>
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
    popularity: 36,
  },
];

registerArticles(articles);
