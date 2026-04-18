import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "tsukuba",
    title: "つくば市の保活スケジュール　令和8年度4月入所の流れ",
    description:
      "つくば市の認可保育所の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入所のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入所のスケジュール</h2>
<p>つくば市の4月入所は一次と二次に分かれています。</p>

<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>一次申込受付期間</td><td>令和7年10月〜11月上旬</td></tr>
<tr><td>一次結果通知</td><td>令和7年12月〜令和8年1月</td></tr>
<tr><td>二次申込受付期間</td><td>令和8年1月〜2月上旬</td></tr>
<tr><td>二次結果通知</td><td>令和8年2月下旬〜3月</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>つくば市は研究学園都市で、共働きの研究者・技術者世帯が多い地域です。人口増加が続いており、保育需要が高い市の一つです。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>つくば市の保育施設の種類・エリアを調べましょう。</p>
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
<strong>9月〜10月：申込案内の入手</strong>
<p>つくば市幼児保育課の申込案内を入手しましょう。電子申請も対応しています。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 60,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "tsukuba",
    title: "つくば市の保活でよくある失敗と対策5選",
    description:
      "つくば市の保活で初めてのパパ・ママがやりがちな失敗パターンと、その対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：つくば市の独自加点を知らない</h2>
<p>つくば市には「市内保育施設の保育士等で月160時間以上勤務」で<span class="highlight">+9点</span>という大きな加点があります。保育士資格を持つ保護者は積極的に活用しましょう。</p>

<h2>失敗2：育休延長許容チェックで減点される</h2>
<p>申込書の「希望する認可保育所に入所できない場合は育児休業の延長も許容できる」にチェックすると<span class="highlight">−9点</span>の大幅減点になります。安易にチェックしないよう注意が必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「育休延長を許容できる」欄は減点項目です。チェックを外したい場合は申込締切日までに幼児保育課に取下書を提出できます。</p>
</div>

<h2>失敗3：65歳未満の同居祖父母の証明書を忘れる</h2>
<p>65歳未満の同居祖父母がいる場合、「保育にあたれない証明書」を提出しないと<span class="highlight">−5点</span>の減点になります。忘れずに準備しましょう。</p>

<h2>失敗4：小規模保育卒園の加点を見落とす</h2>
<p>市内の年齢制限のある認可保育所等（小規模保育事業等）を卒園する場合、<span class="highlight">+5点</span>の加点があります。</p>

<h2>失敗5：認可外保育施設の利用実績を活かさない</h2>
<p>認可外または一時預かりを月60時間以上利用していると<span class="highlight">+3点</span>の加点が得られます。認可に入れない間も積極的に認可外を利用しましょう。</p>`,
    publishedAt: "2026-04-18",
    popularity: 58,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "tsukuba",
    title: "つくば市の入所点数のしくみ　基準指数と調整指数をやさしく解説",
    description:
      "つくば市の保育所入所選考で使われる基準指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>つくば市の保育所入所は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計指数 ＝ 基準指数（保護者1）＋ 基準指数（保護者2）＋ 調整指数</p>
</div>

<h2>基準指数とは？</h2>
<p>保護者それぞれの「保育が必要な理由」を点数化したものです。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>19</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18</td></tr>
<tr><td>月120時間以上140時間未満</td><td>17</td></tr>
<tr><td>月100時間以上120時間未満</td><td>16</td></tr>
<tr><td>月60時間以上100時間未満</td><td>15</td></tr>
</table>

<h2>ひとり親（父（母）いない）の場合</h2>
<p>父または母が死亡・離婚等で不在の場合、不在の親の基準指数は<span class="highlight">21点</span>として計算されます。これはフルタイム就労（19点）よりも高い点数です。</p>

<h2>調整指数の主な項目</h2>
<ul>
<li>虐待・DV：<span class="highlight">+30点</span></li>
<li>市内保育施設の保育士等（月160時間以上）：<span class="highlight">+9点</span></li>
<li>市内保育施設の保育士等（月60時間以上160時間未満）：<span class="highlight">+8点</span></li>
<li>認可保育所等に現在入所中：<span class="highlight">+3点</span></li>
<li>育休・産休明けで入所希望（休業中）：<span class="highlight">+3点</span></li>
<li>市内小規模保育等の卒園：<span class="highlight">+5点</span></li>
</ul>`,
    publishedAt: "2026-04-18",
    popularity: 72,
  },
  {
    slug: "score-up-checklist",
    citySlug: "tsukuba",
    title: "つくば市で点数を上げる方法　加点チェックリストと減点注意事項",
    description:
      "つくば市の入所選考で調整指数の加点を最大限に活用する方法と、減点に注意すべき項目を解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点チェックリスト</h2>

<ul>
<li>虐待・DVのおそれ等、社会的養護が必要な場合 → <span class="highlight">+30点</span></li>
<li>市内保育施設の保育士等（月160時間以上） → <span class="highlight">+9点</span></li>
<li>市内保育施設の保育士等（月60時間以上160時間未満） → <span class="highlight">+8点</span></li>
<li>市内小規模保育等の卒園 → <span class="highlight">+5点</span></li>
<li>認可保育所等に現在入所中 → <span class="highlight">+3点</span></li>
<li>認可外・一時預かりを月60時間以上利用 → <span class="highlight">+3点</span></li>
<li>育休・産休明け入所希望（休業中） → <span class="highlight">+3点</span></li>
<li>きょうだいが同一保育所等を同時申込 → <span class="highlight">+2点</span></li>
<li>認定こども園の1号認定を利用、同一施設での2号認定を希望 → <span class="highlight">+2点</span></li>
<li>生活保護世帯 → <span class="highlight">+1点</span></li>
</ul>

<div class="warn-box">
<p><strong>減点に注意！</strong></p>
<p>以下は<span class="highlight">マイナス点</span>になります：</p>
<ul>
<li>育休延長を許容できるとチェック → <span class="highlight">−9点</span></li>
<li>65歳未満の同居祖父母が「保育にあたれない証明書」を未提出 → <span class="highlight">−5点</span></li>
</ul>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 68,
  },
  {
    slug: "area-guide",
    citySlug: "tsukuba",
    title: "つくば市の保育園マップ　エリアごとの特徴を比較",
    description:
      "つくば市内のエリアごとの保育施設の特徴や競争状況をまとめました。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>つくば市の保育施設の概要</h2>
<p>つくば市は筑波研究学園都市として開発された計画都市で、国内有数の人口増加都市です。共働きの研究者・技術者世帯が多く、保育需要が非常に高い地域です。</p>

<h3>競争率が高いエリア</h3>
<ul>
<li><strong>つくば駅周辺・研究学園エリア</strong>：TX沿線の中心部。ファミリー層の流入が多く最も競争が激しい</li>
<li><strong>みどりの・万博記念公園エリア</strong>：新興住宅地として開発が進む人気エリア</li>
<li><strong>流星台・葛城エリア</strong>：研究機関が集中するエリアで共働き世帯が多い</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>筑波・北部エリア</strong>：市の北部は人口密度が低く、定員に余裕がある施設も</li>
<li><strong>茎崎エリア</strong>：市の南部は比較的落ち着いた競争状況</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>つくば市はTX（つくばエクスプレス）沿線と研究機関の集積エリアで特に保育需要が高いです。希望施設は複数・広範囲で申込みましょう。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 52,
  },
  {
    slug: "ninkagai-guide",
    citySlug: "tsukuba",
    title: "つくば市の認可外保育施設ガイド　認可に入れなかったときの選択肢",
    description:
      "つくば市で認可所等に入れなかった場合の選択肢として、認可外保育施設の活用方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設の活用で加点を得よう</h2>
<p>つくば市では認可外保育施設や一時預かりの利用実績が調整指数に反映されます。</p>

<ul>
<li>認可外・一時預かりを月60時間以上利用 → <span class="highlight">+3点</span></li>
<li>認可外・一時預かりを月48時間以上利用 → <span class="highlight">+2点</span></li>
<li>認可外・一時預かりを月32時間以上利用 → <span class="highlight">+1点</span></li>
</ul>

<h2>認可外保育施設のメリット</h2>
<ul>
<li>認可に比べて入りやすい場合が多い</li>
<li>利用することで翌年度以降の認可入所に向けた加点が得られる</li>
<li>延長保育や夜間保育に対応している施設もある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>つくば市は人口増加が続いており待機児童が生じやすい地域です。認可外に預けながら毎年再申請することが現実的な戦略の一つです。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 48,
  },
  {
    slug: "small-nursery",
    citySlug: "tsukuba",
    title: "つくば市の小規模保育って？　メリット・デメリットを解説",
    description:
      "つくば市の小規模保育事業の特徴やメリット・デメリット、卒園後の優先加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小規模保育事業とは？</h2>
<p>定員6〜19人の少人数で保育を行う施設です。対象は<span class="highlight">0〜2歳児</span>のみ。3歳以降は連携施設や別の保育施設に転所します。</p>

<h2>つくば市の小規模保育卒園の特典</h2>
<p>つくば市では、市内の年齢制限のある認可保育所等（小規模保育事業等）を卒園する場合、認可保育所への申込で<span class="highlight">+5点</span>の加点があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>人気の認可保育所に入りにくい0〜2歳のうちは小規模保育を活用し、卒園時に+5点の加点を活かして認可保育所へ転所する戦略も有効です。</p>
</div>

<h2>メリット</h2>
<ul>
<li>大規模園より比較的入りやすい</li>
<li>少人数でアットホームな保育</li>
<li>3歳以降の転所に際して+5点の優先加点</li>
</ul>

<h2>デメリット</h2>
<ul>
<li>2歳（年度末）で転所が必要（いわゆる「3歳の壁」）</li>
<li>園庭がない施設が多い</li>
</ul>`,
    publishedAt: "2026-04-18",
    popularity: 55,
  },
  {
    slug: "tiebreaker-guide",
    citySlug: "tsukuba",
    title: "つくば市で同点になったらどうなる？　優先順位のしくみ",
    description:
      "つくば市の保育所入所選考で同点になった場合の優先順位と、事前にできる対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>つくば市では合計指数が同点の場合、以下の順番で優先されます。</p>

<ol>
<li>虐待・DV等、社会的養護が必要な場合</li>
<li>ひとり親家庭</li>
<li>市内の年齢制限のある認可保育所等を卒園し継続利用を希望する場合</li>
<li>保護者が①障害・疾病、②災害復旧、③単身赴任の場合</li>
<li>きょうだいが入所施設へ入所（転所）の場合</li>
<li>きょうだいの同時申込の場合</li>
<li>申請年度内の待機期間が長い（月数）</li>
<li>養育している小学生以下の児童数が多い</li>
<li>現に就労しており認可保育所等以外で保育している</li>
<li>市民税所得割額が低い世帯</li>
<li>つくば市に住民登録し続けている期間が長い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>待機期間が長いほど有利になるため、入れなかった場合も毎月申込を継続することが大切です。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 50,
  },
  {
    slug: "nursery-fees",
    citySlug: "tsukuba",
    title: "つくば市の保育料はいくら？　世帯年収別の目安を紹介",
    description:
      "つくば市の認可保育所の保育料を世帯年収別にわかりやすく紹介します。無償化の対象も解説。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>つくば市の認可保育所の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>

<h2>3歳以上は無償化</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。</p>

<h2>世帯年収別の保育料の目安（0〜2歳児）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>〜300万円</td><td>0〜6,000円</td></tr>
<tr><td>300〜500万円</td><td>10,000〜25,000円</td></tr>
<tr><td>500〜700万円</td><td>25,000〜40,000円</td></tr>
<tr><td>700〜1,000万円</td><td>40,000〜55,000円</td></tr>
<tr><td>1,000万円〜</td><td>55,000円〜</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記はあくまで目安です。正確な保育料は住民税額で決まります。つくば市幼児保育課にご確認ください。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 45,
  },
  {
    slug: "nursery-visit-guide",
    citySlug: "tsukuba",
    title: "つくば市の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "つくば市の保育所見学で確認すべきポイントと、聞いておきたい質問をまとめました。",
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
<li>国際的な環境への対応（つくば市は外国籍の家庭も多い）</li>
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
<p>つくば市は国際的な研究者世帯も多く、外国籍の家庭への対応も施設によって異なります。言語面でのサポートが必要な場合は見学時に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-18",
    popularity: 40,
  },
];

registerArticles(articles);
