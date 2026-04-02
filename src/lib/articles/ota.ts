import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "ota",
    title: "大田区の保活、いつから始める？スケジュール完全ガイド",
    description:
      "大田区の認可保育園の申込時期・選考の流れ・内定通知時期をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>大田区の4月入園は、<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和7年10月〜11月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和8年1月下旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大田区では「入園申込みのしおり」が毎年9月頃に公開されます。早めに入手して準備を進めましょう。</p>
</div>

<h2>保育園見学は早めに</h2>
<p>大田区には多くの保育園があります。6月〜9月の間に気になる園の見学を済ませておくのがおすすめです。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.ota.tokyo.jp/seikatsu/kodomo/hoiku/hoikushisetsu_nyukibo/hoikuen/senkou_houhou-kijyun.html" target="_blank" rel="noopener">大田区公式サイト「利用調整方法・基準について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "ota",
    title: "大田区の入園点数のしくみ　基準指数と調整指数をやさしく解説",
    description:
      "大田区の保育園入園選考で使われる「利用調整基準指数」と「調整指数」の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>大田区の保育園入園は「利用調整基準指数」と「調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>世帯指数 ＝ 父の基準指数 ＋ 母の基準指数 ＋ 調整指数</p>
</div>

<h2>基準指数とは？</h2>
<p>父母それぞれの就労状況等を点数化したものです。1人あたり最大<span class="highlight">11点</span>で、フルタイム共働きの場合は合計<span class="highlight">22点</span>になります。</p>

<table>
<tr><th>就労状況</th><th>基準指数</th></tr>
<tr><td>月20日以上・月160時間以上</td><td>11</td></tr>
<tr><td>月20日以上・月140〜160時間</td><td>10</td></tr>
<tr><td>月20日以上・月120〜140時間</td><td>9</td></tr>
<tr><td>月16〜19日・月128時間以上</td><td>9</td></tr>
<tr><td>月20日以上・月100〜120時間</td><td>8</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の事情に応じて加減される点数です。加算<span class="highlight">15項目</span>、減算<span class="highlight">2項目</span>あります。</p>
<ul>
<li>ひとり親世帯：不存在<span class="highlight">+11点</span>＋調整<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>きょうだい在園：<span class="highlight">+2点</span></li>
<li>認可外利用：<span class="highlight">+2点</span></li>
<li>保育士勤務：<span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>基準の詳細は<a href="https://www.city.ota.tokyo.jp/seikatsu/kodomo/hoiku/hoikushisetsu_nyukibo/hoikuen/senkou_houhou-kijyun.html" target="_blank" rel="noopener">大田区公式サイト「利用調整方法・基準について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-checklist",
    citySlug: "ota",
    title: "大田区で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "大田区の入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>大田区の入園選考では同じ22点（フルタイム共働き）の家庭が多いため、<span class="highlight">加点</span>の有無が入園を左右します。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+14点</td><td>不存在11点＋調整3点</td></tr>
<tr><td>生活保護世帯</td><td>+3点</td><td>生活保護受給中</td></tr>
<tr><td>きょうだい在園</td><td>+2点</td><td>認可保育園に在園中または同時申込</td></tr>
<tr><td>保育士勤務</td><td>+2点</td><td>保護者が保育士として勤務</td></tr>
<tr><td>認可外利用</td><td>+2点</td><td>月ぎめで認可外に預けている</td></tr>
<tr><td>保護者の障害</td><td>+2〜3点</td><td>身体障害者手帳等の保有</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育可能な祖父母等が500m以内に住んでいる場合は<span class="highlight">-1点</span>の減点があります。</p>
</div>

<h2>22点からの上積みが勝負</h2>
<p>大田区ではフルタイム共働きで22点が基本ラインです。22点同士の競争になった場合、調整指数の加点と同一指数時の優先順位で決まります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>過去の最低指数は<a href="https://www.city.ota.tokyo.jp/seikatsu/kodomo/hoiku/topics/senkou-shisuu_h2904_h3004.html" target="_blank" rel="noopener">大田区公式サイト「利用調整の指数の公開」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "same-score-priority",
    citySlug: "ota",
    title: "大田区で同点になったらどうなる？優先順位を詳しく解説",
    description:
      "大田区の保育園入園選考で同じ点数になった場合の9つの優先順位を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>大田区では世帯指数が同点の場合、<span class="highlight">9つ</span>の優先順位で判定されます。22点の家庭が多いため、この優先順位が非常に重要です。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>新規入所と転園</strong><p>新規入所が転園より優先されます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>基準指数が高い</strong><p>調整指数を除いた基本の基準指数が高い世帯が優先。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>ひとり親世帯</strong><p>ひとり親世帯が優先されます。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>保護者の疾病</strong><p>保護者が疾病の場合に優先。</p></div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content"><strong>保護者の障害</strong><p>保護者に障害がある場合に優先。</p></div>
</div>
<div class="step">
<div class="step-num">6</div>
<div class="step-content"><strong>児童の障害</strong><p>児童に障害がある場合に優先。</p></div>
</div>
<div class="step">
<div class="step-num">7</div>
<div class="step-content"><strong>卒園年齢児</strong><p>年齢上限のある施設からの卒園児が優先。</p></div>
</div>
<div class="step">
<div class="step-num">8</div>
<div class="step-content"><strong>所得割額が低い</strong><p>住民税の所得割額が低い世帯が優先。</p></div>
</div>
<div class="step">
<div class="step-num">9</div>
<div class="step-content"><strong>きょうだい在園・同時申込</strong><p>きょうだいがいる世帯が優先されます。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.ota.tokyo.jp/seikatsu/kodomo/hoiku/hoikushisetsu_nyukibo/hoikuen/senkou_houhou-kijyun.html" target="_blank" rel="noopener">大田区公式サイト「利用調整方法・基準について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "competition-reality",
    citySlug: "ota",
    title: "22点がボーダー！大田区の入園競争の実態",
    description:
      "大田区の保育園入園選考におけるボーダーラインと入園競争の実態を解説します。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>フルタイム共働き22点が基本ライン</h2>
<p>大田区では、父母ともにフルタイム勤務（月20日以上・月160時間以上）の場合、基準指数は<span class="highlight">11点＋11点＝22点</span>になります。</p>
<p>多くの家庭が22点で並ぶため、<span class="highlight">調整指数</span>と<span class="highlight">優先順位</span>が入園の鍵を握ります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大田区は過去の一次利用調整の最低指数を公開しています。希望する園のボーダーを確認しましょう。</p>
</div>

<h2>最低指数の見方</h2>
<p>大田区が公開している最低指数は「22」と表記されることが多いですが、同じ22点の中でも優先順位で差がつきます。22点で内定した家庭は優先順位の上位にいた場合です。</p>

<h2>加点が入園を左右する</h2>
<table>
<tr><th>世帯指数</th><th>状況</th></tr>
<tr><td>25点以上</td><td>多くの園で入園が期待できる</td></tr>
<tr><td>22〜24点</td><td>標準的。優先順位が重要</td></tr>
<tr><td>18〜21点</td><td>パートタイム等。厳しい</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最低指数は<a href="https://www.city.ota.tokyo.jp/seikatsu/kodomo/hoiku/topics/senkou-shisuu_h2904_h3004.html" target="_blank" rel="noopener">大田区公式サイト「利用調整の指数の公開」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "ochita-sentakushi",
    citySlug: "ota",
    title: "大田区で保育園に落ちたときの5つの選択肢",
    description:
      "大田区の認可保育園の選考で不承諾だった場合に検討すべき選択肢を紹介します。",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>5つの選択肢</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>二次利用調整を待つ</strong><p>一次で不承諾の方は二次の対象になります。希望園の変更も可能です。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認証保育所に申し込む</strong><p>認可外に預けると翌年度に加点（+2点）が得られます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>小規模保育・家庭的保育を利用</strong><p>0〜2歳児対象の施設です。認可園より入りやすい場合があります。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>企業主導型保育施設</strong><p>認可外ですが保育料が認可園に近い水準の施設もあります。</p></div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content"><strong>幼稚園の預かり保育（3歳以上）</strong><p>預かり保育で長時間対応してくれる幼稚園もあります。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は大田区公式サイトで随時更新されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ikukyuake-hokatsu",
    citySlug: "ota",
    title: "育休明けの保活、大田区で気をつけること",
    description:
      "育休中に始める大田区の保活で、復職条件や申込時の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休明けと点数</h2>
<p>大田区の基準指数は就労時間で決まるため、育休中でも「復職後の勤務条件」で申請できます。フルタイム復帰予定なら<span class="highlight">11点</span>が適用されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休明けの専用加点はありませんが、認可外保育施設を利用して加点（+2点）を得る戦略があります。</p>
</div>

<h2>復帰条件</h2>
<p>入園した月中に復職する必要があります。復職しなかった場合は退園の対象になることがあります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>復職証明書の提出が必要です。期限を過ぎないように注意してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは大田区の「入園申込みのしおり」をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "hoikushi-kasan",
    citySlug: "ota",
    title: "大田区の保育士加点とは？保育士が保活で有利になるポイント",
    description:
      "大田区では保育士として勤務する保護者に加点があります。その条件と活用方法を解説します。",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>保育士勤務で+2点の加点</h2>
<p>大田区では、保護者が<span class="highlight">保育士</span>として勤務している場合に調整指数として<span class="highlight">+2点</span>が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き22点に保育士加点+2で24点。きょうだい加点+2もあれば26点になり、かなり有利に。</p>
</div>

<h2>条件</h2>
<ul>
<li>保育士資格を持っていること</li>
<li>実際に保育士として勤務していること</li>
<li>勤務証明書に保育士としての勤務である旨が記載されていること</li>
</ul>

<h2>他の加点と組み合わせる</h2>
<p>保育士加点は他の加点と併用できます。きょうだい加点や認可外利用加点と組み合わせることで、入園の可能性が大きく上がります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.ota.tokyo.jp/seikatsu/kodomo/hoiku/hoikushisetsu_nyukibo/hoikuen/senkou_houhou-kijyun.html" target="_blank" rel="noopener">大田区公式サイト「利用調整方法・基準について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "saitei-shisuu",
    citySlug: "ota",
    title: "大田区の保育園、過去の最低指数を読み解く",
    description:
      "大田区が公開している過去の一次利用調整の最低指数データの見方と活用法を解説します。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>最低指数とは</h2>
<p>大田区は毎年、各保育園の一次利用調整で<span class="highlight">内定した最低の世帯指数</span>を公開しています。これを見れば、希望する園にどのくらいの点数が必要か目安がわかります。</p>

<h2>最低指数の読み方</h2>
<p>たとえば、ある園の0歳児クラスの最低指数が「22」と書いてあった場合、22点で内定した家庭がいるということです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同じ22点でも、同一指数時の優先順位で差がついています。22点で内定したのは優先順位が高かった家庭かもしれません。</p>
</div>

<h2>活用のコツ</h2>
<ul>
<li>希望園の過去2年分の最低指数を確認</li>
<li>年齢クラスごとに最低指数が異なるので注意</li>
<li>最低指数が「-」の場合は、そのクラスで内定者がいなかった（募集なし）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最低指数は<a href="https://www.city.ota.tokyo.jp/seikatsu/kodomo/hoiku/topics/senkou-shisuu_h2904_h3004.html" target="_blank" rel="noopener">大田区公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "ota",
    title: "大田区の保活でよくある失敗と対策5選",
    description:
      "大田区の保活で初めてのママがやりがちな失敗パターンと対策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：最低指数を確認せずに希望を出す</h2>
<p>大田区は過去の最低指数を公開しています。確認せずに人気園だけに希望を出すと、不承諾のリスクが高まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>過去の最低指数を確認し、自分の点数で入れそうな園を多く希望に入れましょう。</p>
</div>

<h2>失敗2：祖父母近居の減点を知らない</h2>
<p>保育可能な祖父母等が500m以内に住んでいると<span class="highlight">-1点</span>の減点があります。該当する方は事前に把握しておきましょう。</p>

<h2>失敗3：就労証明書の不備</h2>
<p>勤務時間や日数の記載が不正確だと、正しい基準指数が適用されません。勤務先に正確に記入してもらいましょう。</p>

<h2>失敗4：認可外利用の加点を活用しない</h2>
<p>認可外保育施設に月ぎめで預けると<span class="highlight">+2点</span>の加点が得られます。入園前に認可外に預ける選択肢も検討しましょう。</p>

<h2>失敗5：二次利用調整で諦める</h2>
<p>一次で不承諾でも、二次で空きが出ることがあります。二次利用調整まで粘りましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.ota.tokyo.jp/seikatsu/kodomo/hoiku/hoikushisetsu_nyukibo/hoikuen/senkou_houhou-kijyun.html" target="_blank" rel="noopener">大田区公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
];

registerArticles(articles);
