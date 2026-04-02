import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "suginami",
    title: "杉並区の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "杉並区の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>杉並区の4月入園は<strong>一次選考</strong>と<strong>二次選考</strong>の2回に分かれています。</p>

<h3>一次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年10月下旬〜11月下旬</td></tr>
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
<p>杉並区では窓口申請のほか、電子申請（LoGoフォーム）も利用できます。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>杉並区の「保育ホッとナビ」で園の情報を調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に見学予約。見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：「保育施設利用のご案内」を入手</strong>
<p>区が発行する保活の必須資料です。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  // ===== 保活の基本 (2) =====
  {
    slug: "hokatsu-mistakes",
    citySlug: "suginami",
    title: "杉並区の保活でよくある失敗と対策5選",
    description:
      "杉並区の保活で初めてのママがやりがちな失敗パターンと、その対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：育休明け加点の重要性を知らない</h2>
<p>杉並区では育休明け加点が<span class="highlight">+10点</span>と非常に大きく、ボーダーラインを左右します。復職タイミングの計画は早めに立てましょう。</p>

<h2>失敗2：希望園を少なく書く</h2>
<p>杉並区では希望園を複数記入できます。通える範囲の園はできるだけ多く書きましょう。</p>

<h2>失敗3：自分の点数を把握していない</h2>
<p>フルタイム共働き40点＋育休明け10点＝<span class="highlight">50点</span>が標準ラインです。50点で同点の方が多いため、追加加点が重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を選ぶと<span class="highlight">-20点</span>の大きな減点になることがあります。慎重に判断しましょう。</p>
</div>

<h2>失敗4：認可外利用の加点を知らない</h2>
<p>認可外保育施設やベビーシッターを月12日以上・6ヶ月以上利用すると<span class="highlight">+2〜4点</span>の加点がつきます。</p>

<h2>失敗5：指数一覧を確認しない</h2>
<p>杉並区では「保育施設別指数一覧」が公開されています。過去の入園者の点数を確認して、現実的な希望園を選びましょう。</p>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  // ===== 選考のしくみ =====
  {
    slug: "scoring-system-guide",
    citySlug: "suginami",
    title: "杉並区の入園点数のしくみ　基準指数と調整指数をやさしく解説",
    description:
      "杉並区の保育園入園選考で使われる基準指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>杉並区の保育園入園は「点数（指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基準指数（保護者1）＋ 基準指数（保護者2）＋ 調整指数</p>
</div>

<h2>基準指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">20点</span>で、父母合計の最大は<span class="highlight">40点</span>。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>週40時間以上（月20日以上）</td><td>20</td></tr>
<tr><td>週32時間以上（月16日以上）</td><td>18</td></tr>
<tr><td>週24時間以上（月16日以上）</td><td>16</td></tr>
<tr><td>週24時間以上（月12日以上）</td><td>14</td></tr>
<tr><td>週16時間以上（月12日以上）</td><td>12</td></tr>
<tr><td>月48時間以上</td><td>8</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>加算20項目、減算6項目の合計26項目。代表的なものは以下の通りです。</p>

<ul>
<li>育休明け復職予定：<span class="highlight">+10点</span></li>
<li>認可外利用（条件あり）：<span class="highlight">+2〜4点</span></li>
<li>ひとり親世帯（同居親族なし）：<span class="highlight">+3点</span></li>
<li>きょうだい同園在園中（第1希望）：<span class="highlight">+3点</span></li>
<li>3番目以降の児童：<span class="highlight">+4点</span></li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  // ===== 点数アップ =====
  {
    slug: "score-up-checklist",
    citySlug: "suginami",
    title: "杉並区で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "杉並区の入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>杉並区で最も重要な加点は「育休明け」</h2>
<p>杉並区の最大の特徴は、育休明け復職予定の加点が<span class="highlight">+10点</span>と非常に大きいことです。</p>

<h3>加点チェックリスト</h3>
<ul>
<li>育休明けに入園月で復職予定 → <span class="highlight">+10点</span></li>
<li>認可外保育施設を1日4時間以上・月12日以上・6ヶ月以上利用 → <span class="highlight">+4点</span></li>
<li>認可外を月12日以上・6ヶ月以上利用 → <span class="highlight">+2点</span></li>
<li>きょうだいが在園中の園を第1希望にする → <span class="highlight">+3点</span></li>
<li>きょうだいと同時申込（第1希望） → <span class="highlight">+1点</span></li>
<li>ひとり親世帯（65歳未満同居親族なし） → <span class="highlight">+3点</span></li>
<li>3番目以降の児童の申込 → <span class="highlight">+4点</span></li>
<li>未就学児3人以上 → <span class="highlight">+1点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料の滞納があると<span class="highlight">-10点</span>の減点があります。必ず期限内に支払いましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  // ===== エリア情報 =====
  {
    slug: "area-guide",
    citySlug: "suginami",
    title: "杉並区の保育園マップ　エリアごとの入りやすさを比較",
    description:
      "杉並区内のエリアごとの保育園の競争率や特徴をまとめました。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>エリアごとの特徴</h2>
<p>杉並区は2018年に待機児童ゼロを達成しましたが、人気エリアではまだ競争があります。</p>

<h3>競争率が高いエリア</h3>
<ul>
<li><strong>荻窪・西荻窪エリア</strong>：駅近の人気園は激戦</li>
<li><strong>高円寺・阿佐ヶ谷エリア</strong>：若いファミリー層に人気</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>井草・上井草エリア</strong>：新設園もあり比較的空きがある</li>
<li><strong>方南・和泉エリア</strong>：0歳児クラスに空きが出やすい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>杉並区の公式サイトで「保育施設別指数一覧」が公開されています。最低指数を確認して希望園を選びましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  // ===== 認可外 =====
  {
    slug: "ninkagai-guide",
    citySlug: "suginami",
    title: "杉並区の認可外保育施設ガイド　認証保育所との違い",
    description:
      "杉並区で認可園に入れなかった場合の選択肢として、認可外・認証保育所について解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は自治体に届出をして運営している保育施設です。杉並区には認証保育所も複数あります。</p>

<h2>認可外利用で加点がつく</h2>
<p>杉並区では認可外保育施設やベビーシッターの利用実績で<span class="highlight">+2〜4点</span>の加点がつきます。</p>

<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>1日4時間以上・月12日以上・6ヶ月以上</td><td>+4点</td></tr>
<tr><td>月12日以上・6ヶ月以上</td><td>+2点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請すると、加点に加えて育休明け加点（+10）も使えるため大幅に有利になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  // ===== 同点対策 =====
  {
    slug: "tiebreaker-guide",
    citySlug: "suginami",
    title: "杉並区で同点になったらどうなる？　優先順位のしくみ",
    description:
      "杉並区の保育園入園選考で同点になった場合の優先順位を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>杉並区では選考指数が同点の場合、以下の7項目で優先順位が決まります。</p>

<ol>
<li>杉並区内に住民登録し居住していること</li>
<li>児童に障害がある</li>
<li>父母ともに不在</li>
<li>ひとり親世帯</li>
<li>生活保護受給世帯</li>
<li>多子世帯</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点で競う場合、ひとり親や多子世帯が優先されます。自分でコントロールしやすいのは「加点を積む」ことと「ボーダーラインが低い園を希望に入れる」ことです。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 48,
  },
  // ===== 保育料 =====
  {
    slug: "nursery-fees",
    citySlug: "suginami",
    title: "杉並区の保育料はいくら？　世帯年収別の目安を紹介",
    description:
      "杉並区の認可保育園の保育料を世帯年収別にわかりやすく紹介します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>杉並区の認可保育園の保育料は<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>

<h2>3歳以上は無償化</h2>
<p>幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。</p>

<h2>世帯年収別の保育料の目安（0〜2歳児）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>〜300万円</td><td>0〜6,000円</td></tr>
<tr><td>300〜500万円</td><td>10,000〜25,000円</td></tr>
<tr><td>500〜700万円</td><td>25,000〜42,000円</td></tr>
<tr><td>700〜1,000万円</td><td>42,000〜60,000円</td></tr>
<tr><td>1,000万円〜</td><td>60,000〜72,000円</td></tr>
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
    citySlug: "suginami",
    title: "杉並区の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "杉並区の保育園見学で確認すべきポイントと質問リストをまとめました。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学はいつ行くのがベスト？</h2>
<p><span class="highlight">6月〜9月</span>が見学のベストシーズンです。</p>

<h2>見学時のチェックポイント</h2>
<ul>
<li>園児たちの表情や雰囲気</li>
<li>保育士の子どもへの接し方</li>
<li>園庭や室内の広さ・清潔さ</li>
<li>給食の内容（アレルギー対応）</li>
<li>持ち物の量</li>
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
<p>杉並区の「保育ホッとナビ」で各園の情報が確認できます。見学前に基本情報をチェックしておきましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 38,
  },
  // ===== 小規模保育 =====
  {
    slug: "small-nursery",
    citySlug: "suginami",
    title: "杉並区の小規模保育って？　メリット・デメリットを解説",
    description:
      "杉並区の小規模保育事業の特徴やメリット・デメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小規模保育事業とは？</h2>
<p>定員6〜19人の少人数保育。対象は<span class="highlight">0〜2歳児</span>のみです。</p>

<h2>メリット</h2>
<ul>
<li>少人数でアットホームな環境</li>
<li>認可園より比較的入りやすい</li>
<li>卒園時に連携施設への優先枠がある場合がある</li>
</ul>

<h2>デメリット</h2>
<ul>
<li>3歳で転園が必要</li>
<li>園庭がない施設が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>杉並区は待機児童対策として小規模保育を積極的に整備しています。連携施設への進級がスムーズな園を選ぶのがおすすめです。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 35,
  },
];

registerArticles(articles);
