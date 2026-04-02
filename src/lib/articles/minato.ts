import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "minato",
    title: "港区の保活スケジュール　令和8年度4月入園の流れ",
    description: "港区の認可保育園の申込時期・選考の流れを解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度4月入園のスケジュール</h2>
<p>港区の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回です。</p>
<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬～12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>港区では郵送申請・電子申請にも対応しています。窓口混雑を避けたい方はぜひ活用しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "minato",
    title: "港区の入園点数のしくみ　基準指数と調整指数を解説",
    description: "港区の保育園入園選考の基準指数と調整指数を解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数の計算方法</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基準指数（父）＋ 基準指数（母）＋ 調整指数</p>
</div>
<h2>基準指数とは？</h2>
<p>父母それぞれ最大<span class="highlight">20点</span>。フルタイム共働きで<span class="highlight">40点</span>が基本ラインです。月20日以上・1日8時間以上（月160時間以上）で満点です。</p>
<h2>調整指数とは？</h2>
<p>加点11項目、減点6項目があります。</p>
<ul>
<li>ひとり親世帯：<span class="highlight">+6点</span></li>
<li>保育士・看護師として保育施設で勤務：<span class="highlight">+6点</span></li>
<li>認可外保育施設の利用：<span class="highlight">+2点</span></li>
<li>育休明け復職予定：<span class="highlight">+2点</span></li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-checklist",
    citySlug: "minato",
    title: "港区で点数を上げる方法　加点チェックリスト",
    description: "港区の入園選考で加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点チェックリスト</h2>
<ul>
<li>認可外保育施設に預けている → <span class="highlight">+2点</span></li>
<li>育休から入園月に復帰予定 → <span class="highlight">+2点</span></li>
<li>きょうだいが在園中の園を希望 → <span class="highlight">+2点</span></li>
<li>ひとり親 → <span class="highlight">+6点</span></li>
<li>保育士・看護師として勤務 → <span class="highlight">+6点</span></li>
</ul>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>港区は保育士・看護師の加点が+6点と大きいのが特徴です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "area-guide",
    citySlug: "minato",
    title: "港区の保育園マップ　エリアごとの入りやすさを比較",
    description: "港区内のエリアごとの保育園の競争率をまとめました。",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>エリアごとの特徴</h2>
<h3>競争率が高いエリア</h3>
<ul>
<li><strong>白金・白金台エリア</strong>：ファミリー層に人気で激戦</li>
<li><strong>芝浦・港南エリア</strong>：タワーマンション増加で競争率上昇</li>
</ul>
<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>麻布エリア</strong>：単身世帯が多く保育需要が比較的少ない</li>
<li><strong>台場エリア</strong>：園の定員に余裕がある場合も</li>
</ul>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>港区の公式サイトで内定発表時の入所者最低指数が公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "tiebreaker-guide",
    citySlug: "minato",
    title: "港区で同点になったらどうなる？　優先順位のしくみ",
    description: "港区で同点時の優先順位と対策を解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<ol>
<li>港区在住期間が長い世帯</li>
<li>きょうだいが在園中の世帯</li>
<li>基準指数が高い世帯</li>
<li>所得が低い世帯</li>
</ol>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>港区在住歴が長いほど有利です。転入予定の方はなるべく早く転入届を出しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 48,
  },
  {
    slug: "nursery-fees",
    citySlug: "minato",
    title: "港区の保育料はいくら？　世帯年収別の目安を紹介",
    description: "港区の認可保育園の保育料を世帯年収別に紹介します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>港区の保育料は<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>
<h2>世帯年収別の保育料の目安（0～2歳児）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>～300万円</td><td>0～5,000円</td></tr>
<tr><td>300～500万円</td><td>10,000～25,000円</td></tr>
<tr><td>500～700万円</td><td>25,000～42,000円</td></tr>
<tr><td>700～1,000万円</td><td>42,000～58,000円</td></tr>
<tr><td>1,000万円～</td><td>58,000～73,000円</td></tr>
</table>`,
    publishedAt: "2026-03-28",
    popularity: 42,
  },
  {
    slug: "ninkagai-guide",
    citySlug: "minato",
    title: "港区の認可外保育施設ガイド",
    description: "港区の認可外保育施設について解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は自治体に届出をして運営している保育施設です。港区には認証保育所も複数あります。</p>
<h2>港区の認証保育所の特徴</h2>
<p>港区では認証保育所の保育料に対して<span class="highlight">補助金</span>が出ます。認可園との差額を軽減できます。</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請すると、+2の加点がつきます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  {
    slug: "small-nursery",
    citySlug: "minato",
    title: "港区の小規模保育って？　メリット・デメリットを解説",
    description: "港区の小規模保育事業の特徴について解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小規模保育事業とは？</h2>
<p>定員6～19人の少人数保育。対象は<span class="highlight">0～2歳児</span>のみです。</p>
<h2>メリット</h2>
<ul>
<li>少人数でアットホーム</li>
<li>認可園より入りやすい</li>
<li>卒園時に連携施設への優先枠がある場合も</li>
</ul>
<h2>デメリット</h2>
<ul>
<li>3歳で転園が必要</li>
<li>園庭がない施設が多い</li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 35,
  },
  {
    slug: "nursery-visit-guide",
    citySlug: "minato",
    title: "港区の保育園見学ガイド　チェックポイントと質問リスト",
    description: "港区の保育園見学で確認すべきポイントをまとめました。",
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学のベストシーズン</h2>
<p><span class="highlight">6月～9月</span>がベストです。</p>
<h2>チェックポイント</h2>
<ul>
<li>園児たちの表情</li>
<li>保育士の接し方</li>
<li>園庭や室内の環境</li>
<li>給食の内容</li>
</ul>
<h2>質問リスト</h2>
<ul>
<li>延長保育は何時まで？</li>
<li>慣らし保育の期間は？</li>
<li>急な発熱時のルール</li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 38,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "minato",
    title: "港区の保活でよくある失敗と対策5選",
    description: "港区の保活でやりがちな失敗パターンと対策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集が遅い</h2>
<p>港区は人気エリアのため競争率が高めです。6月には動き始めましょう。</p>
<h2>失敗2：希望園を少なく書く</h2>
<p>通える範囲の園はできるだけ多く書きましょう。</p>
<h2>失敗3：加点の取りこぼし</h2>
<p>認可外利用で+2点、育休復帰で+2点の加点があります。</p>
<h2>失敗4：港区独自の制度を知らない</h2>
<p>港区には認証保育所の保育料補助があります。情報収集をしっかりしましょう。</p>
<h2>失敗5：書類の不備</h2>
<p>就労証明書は勤務先に余裕をもって依頼しましょう。</p>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
];

registerArticles(articles);
