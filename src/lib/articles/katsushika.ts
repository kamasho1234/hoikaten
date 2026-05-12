import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "katsushika",
    title: "葛飾区の保活スケジュール　令和8年度4月入園の流れ",
    description: "葛飾区の認可保育園の申込時期・選考の流れ・結果通知の時期を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度4月入園のスケジュール</h2>
<p>葛飾区の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回です。</p>
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
<p>葛飾区では電子申請にも対応しています。窓口の混雑を避けたい方は活用しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "katsushika",
    title: "葛飾区の入園点数のしくみ　基準指数と調整指数をやさしく解説",
    description: "葛飾区の保育園入園選考の基準指数と調整指数を初めての方にもわかるように解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>葛飾区の保育園入園は点数の高い順に内定が決まります。</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基準指数（父）＋ 基準指数（母）＋ 調整指数</p>
</div>
<h2>基準指数とは？</h2>
<p>父母それぞれ最大<span class="highlight">20点</span>。フルタイム共働きで<span class="highlight">40点</span>が基本ラインです。</p>
<h2>調整指数とは？</h2>
<p>加算14項目、減算5項目があります。主な加点は以下の通りです。</p>
<ul>
<li>小規模保育等の卒園児：<span class="highlight">+10点</span></li>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>認可外保育施設の利用実績：<span class="highlight">+2点</span></li>
<li>育休明け復職予定：<span class="highlight">+2点</span></li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-checklist",
    citySlug: "katsushika",
    title: "葛飾区で点数を1点でも上げる方法　加点チェックリスト",
    description: "葛飾区の入園選考で加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点チェックリスト</h2>
<ul>
<li>認可外保育施設に月ぎめで預けている → <span class="highlight">+2点</span></li>
<li>育休から入園月に復帰予定 → <span class="highlight">+2点</span></li>
<li>きょうだいが在園中の園を希望 → <span class="highlight">+2点</span></li>
<li>ひとり親で就労中 → <span class="highlight">+5点</span></li>
<li>小規模保育の卒園 → <span class="highlight">+10点</span></li>
</ul>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>葛飾区は小規模保育の卒園加点が+10点と大きく、0～2歳は小規模保育に入れて3歳で認可園に転所する戦略が有効です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "area-guide",
    citySlug: "katsushika",
    title: "葛飾区の保育園マップ　エリアごとの入りやすさを比較",
    description: "葛飾区内のエリアごとの保育園の競争率や特徴をまとめました。",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>エリアごとの競争率</h2>
<h3>競争率が高いエリア</h3>
<ul>
<li><strong>新小岩エリア</strong>：駅周辺はファミリー層が多く激戦</li>
<li><strong>亀有エリア</strong>：交通の便が良く人気</li>
</ul>
<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>水元エリア</strong>：駅から離れるため空きがある園も</li>
<li><strong>堀切・四つ木エリア</strong>：比較的定員に余裕がある</li>
</ul>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>葛飾区では過去の最低内定点数が公開されています。希望園選びの参考にしましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "tiebreaker-guide",
    citySlug: "katsushika",
    title: "葛飾区で同点になったらどうなる？　優先順位のしくみ",
    description: "葛飾区で同点になった場合の優先順位と対策を解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<ol>
<li>希望する施設にきょうだいが在園している世帯</li>
<li>葛飾区在住期間が長い世帯</li>
<li>基準指数が高い世帯</li>
<li>所得が低い世帯</li>
</ol>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園中の園を希望に入れると、指数+2だけでなく同点時の優先でも有利です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 48,
  },
  {
    slug: "nursery-fees",
    citySlug: "katsushika",
    title: "葛飾区の保育料はいくら？　世帯年収別の目安を紹介",
    description: "葛飾区の認可保育園の保育料を世帯年収別に紹介します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>葛飾区の保育料は<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>
<h2>3歳以上は無償化</h2>
<p><span class="highlight">3歳児クラス以上</span>の保育料は無料です。</p>
<h2>世帯年収別の保育料の目安（0～2歳児）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>～300万円</td><td>0～5,000円</td></tr>
<tr><td>300～500万円</td><td>8,000～22,000円</td></tr>
<tr><td>500～700万円</td><td>22,000～38,000円</td></tr>
<tr><td>700～1,000万円</td><td>38,000～52,000円</td></tr>
<tr><td>1,000万円～</td><td>52,000～62,000円</td></tr>
</table>`,
    publishedAt: "2026-03-28",
    popularity: 42,
  },
  {
    slug: "ninkagai-guide",
    citySlug: "katsushika",
    title: "葛飾区の認可外保育施設ガイド",
    description: "葛飾区の認可外保育施設や認証保育所について解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、自治体に届出をして運営している保育施設です。</p>
<h2>認証保育所との違い</h2>
<table>
<tr><th>項目</th><th>認可</th><th>認証</th><th>認可外</th></tr>
<tr><td>保育料</td><td>所得に応じて</td><td>上限あり</td><td>施設が設定</td></tr>
<tr><td>申込先</td><td>区役所</td><td>施設に直接</td><td>施設に直接</td></tr>
</table>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請すると、+2の加点がつきます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  {
    slug: "small-nursery",
    citySlug: "katsushika",
    title: "葛飾区の小規模保育って？　メリット・デメリットを解説",
    description: "葛飾区の小規模保育事業の特徴について解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小規模保育事業とは？</h2>
<p>定員6～19人の少人数保育施設。対象は<span class="highlight">0～2歳児</span>のみです。</p>
<h2>メリット</h2>
<ul>
<li>少人数でアットホーム</li>
<li>認可園より入りやすい</li>
<li>卒園時に<span class="highlight">+10点</span>の大きな加点</li>
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
    citySlug: "katsushika",
    title: "葛飾区の保育園見学ガイド　チェックポイントと質問リスト",
    description: "葛飾区の保育園見学で確認すべきポイントをまとめました。",
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学のベストシーズン</h2>
<p><span class="highlight">6月～9月</span>が見学のベストシーズンです。</p>
<h2>チェックポイント</h2>
<ul>
<li>園児たちの表情や雰囲気</li>
<li>保育士の接し方</li>
<li>園庭や室内の広さ・清潔さ</li>
<li>給食の内容</li>
<li>登園・降園時の動線</li>
</ul>
<h2>質問リスト</h2>
<ul>
<li>延長保育は何時まで？ 料金は？</li>
<li>慣らし保育の期間は？</li>
<li>急な発熱時のお迎えルール</li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 38,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "katsushika",
    title: "葛飾区の保活でよくある失敗と対策5選",
    description: "葛飾区の保活でやりがちな失敗パターンと対策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集が遅い</h2>
<p>申込は<span class="highlight">11月</span>開始。6月には動き始めましょう。</p>
<h2>失敗2：希望園を少なく書く</h2>
<p>通える範囲の園はできるだけ多く書きましょう。</p>
<h2>失敗3：自分の点数を把握していない</h2>
<p>フルタイム共働きで<span class="highlight">40点</span>が基本ラインです。</p>
<h2>失敗4：加点の取りこぼし</h2>
<p>認可外利用で+2点、育休復帰で+2点の加点があります。</p>
<h2>失敗5：書類の不備</h2>
<p>就労証明書の記入漏れに注意しましょう。</p>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "katsushika",
    title: "葛飾区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "葛飾区の認可保育園の保育料を年収・子ども数別に詳しく解説。区民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>葛飾区の保育料はどうやって決まる？</h2>
<p>葛飾区の認可保育園の保育料（利用者負担額）は、<strong>世帯の区民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

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
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は葛飾区の公式保育料表をご確認ください。</p>

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
<p>毎年6月ごろ、前年度の区民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は葛飾区担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は葛飾区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "katsushika",
    title: "葛飾区の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "葛飾区の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>葛飾区の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。葛飾区では副食費として月額4,500円程度が別途かかります。</p>

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
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は葛飾区公式サイトでご確認ください。</p>

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
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。葛飾区担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は葛飾区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
