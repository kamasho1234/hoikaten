import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "joetsu",
    title: "上越市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "上越市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>上越市の4月入園は一次選考と二次選考に分かれています。</p>

<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>一次申込受付期間</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>一次結果通知</td><td>令和8年1月中旬</td></tr>
<tr><td>二次申込受付期間</td><td>令和8年1月下旬〜2月上旬</td></tr>
<tr><td>二次結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上越市は新潟県南部に位置し、積雪地域のため冬期の保育施設への送迎ルートも事前に確認しておきましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>上越市の保育施設の種類・エリアを調べましょう。</p>
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
<p>上越市子育て支援課の申込案内を入手しましょう。</p>
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
    citySlug: "joetsu",
    title: "上越市の保活でよくある失敗と対策5選",
    description:
      "上越市の保活で初めてのパパ・ママがやりがちな失敗パターンと、その対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集のスタートが遅い</h2>
<p>上越市の4月入園の申込は<span class="highlight">11月</span>から始まります。見学の予約が埋まる前に動きましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>遅くとも6月には情報収集を始めましょう。</p>
</div>

<h2>失敗2：選考方式を理解していない</h2>
<p>上越市は「min方式（低い方を採用）」という独自の計算方式を採用しています。父母のうち点数が<span class="highlight">低い方の基本指数</span>を採用するため、両親のバランスが重要です。</p>

<h2>失敗3：希望園を少なく書く</h2>
<p>上越市では希望施設を複数記入できます。通える範囲の園はできるだけ多く書きましょう。</p>

<h2>失敗4：加点の取りこぼし</h2>
<p>ひとり親（同居親族なし）で<span class="highlight">+10点</span>、きょうだいが同じ保育園を希望で<span class="highlight">+10点</span>の大きな加点があります。漏れなくチェックしましょう。</p>

<h2>失敗5：冬の送迎ルートを確認していない</h2>
<p>上越市は豪雪地帯です。冬期の保育施設への送迎ルートを事前に確認しておきましょう。</p>`,
    publishedAt: "2026-04-18",
    popularity: 52,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "joetsu",
    title: "上越市の入園点数のしくみ　min方式をやさしく解説",
    description:
      "上越市の保育園入園選考で使われるmin方式（低い方を採用）の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>上越市の「min方式」とは？</h2>
<p>上越市は一般的な「父母の合計」方式ではなく、<span class="highlight">父母のうち点数が低い方</span>を基準指数として使うmin方式を採用しています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ min（保護者1の基本指数, 保護者2の基本指数）＋ 調整指数</p>
</div>

<h2>基本指数とは？</h2>
<p>各保護者の「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">10点</span>です。</p>

<table>
<tr><th>就労状況（外勤・自営）</th><th>指数</th></tr>
<tr><td>月140時間以上（1日7時間以上）</td><td>10</td></tr>
<tr><td>月120時間以上140時間未満（1日6時間以上）</td><td>9</td></tr>
<tr><td>月80時間以上120時間未満（1日4時間以上）</td><td>8</td></tr>
<tr><td>月48時間以上80時間未満</td><td>7</td></tr>
</table>

<h2>min方式の特徴</h2>
<p>例えば保護者1が10点、保護者2が7点の場合、基準指数は<span class="highlight">7点（低い方）</span>になります。両親ともに高い点数を維持することが大切です。</p>

<h2>調整指数とは？</h2>
<ul>
<li>ひとり親（同居親族なし）：<span class="highlight">+10点</span></li>
<li>ひとり親（同居親族あり）：<span class="highlight">+8点</span></li>
<li>きょうだいが同じ保育園を希望：<span class="highlight">+10点</span></li>
<li>失業（就労の必要が高い）：<span class="highlight">+5点</span></li>
<li>育休明け：<span class="highlight">+1点</span></li>
</ul>`,
    publishedAt: "2026-04-18",
    popularity: 70,
  },
  {
    slug: "score-up-checklist",
    citySlug: "joetsu",
    title: "上越市で点数を上げる方法　min方式での加点チェックリスト",
    description:
      "上越市のmin方式の入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>min方式での加点戦略</h2>
<p>上越市のmin方式では、両親の点数のうち低い方が採用されます。まず<span class="highlight">両親の基本指数を高く保つ</span>ことが最優先です。</p>

<h3>基本指数アップのポイント</h3>
<p>片方の親の就労時間が短い場合は、できるだけ就労時間を増やして月80時間（8点）以上を目指しましょう。</p>

<h3>調整指数チェックリスト</h3>

<ul>
<li>ひとり親（同居親族なし） → <span class="highlight">+10点</span></li>
<li>ひとり親（同居親族あり） → <span class="highlight">+8点</span></li>
<li>きょうだいが同じ保育園を希望 → <span class="highlight">+10点</span></li>
<li>生計中心者が失業（就労の必要が高い） → <span class="highlight">+5点</span></li>
<li>子どもに障害あり → <span class="highlight">+5点</span></li>
<li>生活保護受給中 → <span class="highlight">+2点</span></li>
<li>保育士・幼稚園教諭が市内保育施設に勤務予定 → <span class="highlight">+4点</span></li>
<li>育休明け → <span class="highlight">+1点</span></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>虐待・DVがある場合は特別に<span class="highlight">+20点</span>の大きな加点があります。該当する場合は迷わず申告しましょう。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 62,
  },
  {
    slug: "area-guide",
    citySlug: "joetsu",
    title: "上越市の保育園マップ　エリアごとの特徴を比較",
    description:
      "上越市内のエリアごとの保育園の特徴や競争状況をまとめました。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>上越市の保育施設の概要</h2>
<p>上越市は新潟県南部に位置する北陸有数の都市です。高田・直江津の2つの中心市街地を持ち、市内には認可保育所・認定こども園が多数あります。</p>

<h3>競争率が高いエリア</h3>
<ul>
<li><strong>高田エリア</strong>：市役所や商業施設が集まる中心部。ファミリー層に人気で競争が激しい</li>
<li><strong>直江津エリア</strong>：港町の中心部。交通の便がよく保育需要が高い</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>山間部・農村エリア</strong>：牧区・安塚区など山間部は比較的余裕がある施設が多い</li>
<li><strong>郊外の住宅エリア</strong>：市街地から離れた新興住宅地は定員に余裕がある場合も</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上越市は広大な市域を持つため、勤務地・自宅の両方から通いやすい施設を選びましょう。冬期の積雪も考慮してください。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 45,
  },
  {
    slug: "ninkagai-guide",
    citySlug: "joetsu",
    title: "上越市の認可外保育施設ガイド　認可に入れなかったときの選択肢",
    description:
      "上越市で認可園に入れなかった場合の選択肢として、認可外保育施設について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。上越市にも複数の認可外施設があります。</p>

<h2>認可外保育施設のメリット</h2>
<ul>
<li>認可に比べて入りやすい場合が多い</li>
<li>定員や年齢に柔軟に対応できる施設もある</li>
<li>延長保育に対応している施設もある</li>
</ul>

<h2>上越市の小規模保育卒園加点</h2>
<p>上越市では小規模保育卒園者への優先対応もあります。小規模保育の卒園時に連携施設を確認しておきましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請することを「保活の継続」といいます。あきらめずに再チャレンジしましょう。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 38,
  },
  {
    slug: "snow-country-hokatsu",
    citySlug: "joetsu",
    title: "上越市の雪国保活ガイド　豪雪地帯での保育園選びのポイント",
    description:
      "豪雪地帯の上越市ならではの、冬期を見据えた保育園選びのポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>上越市の冬の保活は一味違う</h2>
<p>上越市は日本有数の豪雪地帯です。保育園選びでは夏の利便性だけでなく、<span class="highlight">冬期の積雪状況</span>も考慮することが大切です。</p>

<h2>冬期の送迎で確認すべきポイント</h2>
<ul>
<li><strong>駐車場の除雪体制</strong>：除雪が適切に行われているか</li>
<li><strong>玄関・アプローチの安全性</strong>：滑り止め対策が十分か</li>
<li><strong>送迎の交通手段</strong>：電車・バスで通える施設か、車が必要か</li>
<li><strong>送迎時間の余裕</strong>：雪による渋滞を見込んだ通勤・通園時間の確保</li>
</ul>

<h2>見学は夏だけでなく冬にも</h2>
<p>可能であれば、積雪期にも見学してみましょう。施設の冬期対応が実際に確認できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上越市では認定こども園が多く、教育・保育を一体的に行う施設が充実しています。保育だけでなく教育も含めて選択肢を広げましょう。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 50,
  },
  {
    slug: "tiebreaker-guide",
    citySlug: "joetsu",
    title: "上越市で同点になったらどうなる？　優先順位のしくみ",
    description:
      "上越市の保育園入園選考で同点になった場合の優先順位と、事前にできる対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>上越市では選考指数が同点の場合、以下の順番で優先されます。</p>

<ol>
<li>ひとり親世帯</li>
<li>生活保護受給世帯</li>
<li>基本指数が高い世帯（就労時間が長い）</li>
<li>申込日の早い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上越市はmin方式のため、両親の基本指数が揃って高い世帯が優遇されます。特に就労時間が重要です。</p>
</div>

<h2>対策のポイント</h2>
<ul>
<li>両親ともに就労時間を月80時間（指数8点）以上に保つ</li>
<li>調整指数を1つでも積み上げて同点を避ける</li>
<li>申込書類は早めに準備して早期提出する</li>
</ul>`,
    publishedAt: "2026-04-18",
    popularity: 48,
  },
  {
    slug: "nursery-fees",
    citySlug: "joetsu",
    title: "上越市の保育料はいくら？　世帯年収別の目安を紹介",
    description:
      "上越市の認可保育園の保育料を世帯年収別にわかりやすく紹介します。無償化の対象も解説。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>上越市の認可保育園の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>

<h2>3歳以上は無償化</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。</p>

<h2>世帯年収別の保育料の目安（0〜2歳児）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>〜300万円</td><td>0〜6,000円</td></tr>
<tr><td>300〜500万円</td><td>10,000〜24,000円</td></tr>
<tr><td>500〜700万円</td><td>24,000〜36,000円</td></tr>
<tr><td>700〜1,000万円</td><td>36,000〜52,000円</td></tr>
<tr><td>1,000万円〜</td><td>52,000円〜</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記はあくまで目安です。正確な保育料は住民税額で決まります。上越市子育て支援課にご確認ください。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 40,
  },
  {
    slug: "nursery-visit-guide",
    citySlug: "joetsu",
    title: "上越市の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "上越市の保育園見学で確認すべきポイントと、聞いておきたい質問をまとめました。",
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
<li>冬期の除雪・安全対策</li>
<li>登園・降園時の動線（雪期の安全性）</li>
</ul>

<h2>聞いておきたい質問リスト</h2>
<ul>
<li>延長保育は何時まで？ 料金は？</li>
<li>慣らし保育の期間はどのくらい？</li>
<li>急な発熱時のお迎えルール</li>
<li>冬期の送迎についてのルールや注意点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上越市は豪雪地帯のため、冬期の安全対策・雪かき体制も確認しておくと安心です。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 38,
  },
];

registerArticles(articles);
