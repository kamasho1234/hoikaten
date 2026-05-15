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
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
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
  {
    slug: "hoikuryo-keisan",
    citySlug: "minato",
    title: "港区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "港区の認可保育園の保育料を年収・子ども数別に詳しく解説。区民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>港区の保育料はどうやって決まる？</h2>
<p>港区の認可保育園の保育料（利用者負担額）は、<strong>世帯の区民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

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
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は港区の公式保育料表をご確認ください。</p>

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
<p>毎年6月ごろ、前年度の区民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は港区担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は港区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "minato",
    title: "港区の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "港区の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>港区の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。港区では副食費として月額4,500円程度が別途かかります。</p>

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
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は港区公式サイトでご確認ください。</p>

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
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。港区担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は港区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
