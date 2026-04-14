import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "tokushima",
    title: "徳島市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "徳島市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>徳島市の4月入園は例年10月〜11月に申込受付が行われます。徳島市子ども未来部子ども保育課が窓口です。</p>

<h3>申込から入所までの流れ</h3>
<table>
<tr><th>時期</th><th>内容</th></tr>
<tr><td>10月上旬</td><td>入所案内・申込書の配布開始</td></tr>
<tr><td>10月中旬〜11月中旬</td><td>申込書受付期間（子ども保育課窓口）</td></tr>
<tr><td>12月〜1月</td><td>利用調整（選考）</td></tr>
<tr><td>2月上旬</td><td>結果通知</td></tr>
<tr><td>3月</td><td>入所前面談・健康診断</td></tr>
<tr><td>4月1日</td><td>入所</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>徳島市は約30か所の認可保育施設があります。申込時には第1希望から第5希望程度まで記入できるため、通園可能な範囲で複数の園を記入しましょう。年度途中の入所は毎月受付があり、空きがあれば随時入所可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>徳島市の公式サイトで前年度の入所案内を参考に準備を始めます。認可保育施設の一覧もダウンロードできます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。徳島市は夏場が暑いため、秋口の見学もおすすめです。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。教育・保育給付認定申請書が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>子ども保育課の窓口で書類を提出します。記入漏れがないよう事前にチェックしましょう。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.tokushima.tokushima.jp/smph/kosodate/youchien_hoikujo/hoikusho_n-kodomoen/index.html" target="_blank" rel="noopener">徳島市公式サイト「保育所等について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "tokushima",
    title: "徳島市の入園指数のしくみ　基礎指数と調整指数をやさしく解説",
    description:
      "徳島市の保育園入園選考で使われる指数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>指数制度の全体像</h2>
<p>徳島市の認可保育施設は<strong>利用調整指数の高い世帯から優先</strong>して入所が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計指数 ＝ 父の基礎指数（最大20点）＋ 母の基礎指数（最大20点）＋ 調整指数</p>
</div>

<h2>基礎指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を指数化したものです。1人あたり<span class="highlight">最大20点</span>、父母合計で<span class="highlight">最大40点</span>です。</p>
<table>
<tr><th>保育の実施基準</th><th>指数</th></tr>
<tr><td>就労：月20日以上かつ日8時間以上</td><td>20</td></tr>
<tr><td>就労：月20日以上かつ日6時間以上</td><td>18</td></tr>
<tr><td>就労：月16日以上かつ日6時間以上</td><td>16</td></tr>
<tr><td>就労：月16日以上かつ日4時間以上</td><td>14</td></tr>
<tr><td>就労：月12日以上かつ日4時間以上</td><td>12</td></tr>
<tr><td>就労：月64時間以上</td><td>10</td></tr>
<tr><td>疾病（重度）</td><td>20</td></tr>
<tr><td>疾病（中度）</td><td>16</td></tr>
<tr><td>疾病（軽度）</td><td>12</td></tr>
<tr><td>障害（重度）</td><td>20</td></tr>
<tr><td>障害（中度）</td><td>16</td></tr>
<tr><td>障害（軽度）</td><td>12</td></tr>
<tr><td>介護・看護（重度）</td><td>20</td></tr>
<tr><td>介護・看護（中度）</td><td>16</td></tr>
<tr><td>介護・看護（軽度）</td><td>12</td></tr>
<tr><td>出産前後</td><td>16</td></tr>
<tr><td>就学（就労と同基準）</td><td>10〜20</td></tr>
<tr><td>求職活動</td><td>6</td></tr>
</table>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加算（または減算）される指数です。複数の項目に該当する場合はすべて合算されます。</p>
<table>
<tr><th>項目</th><th>指数</th></tr>
<tr><td>ひとり親家庭</td><td>+5</td></tr>
<tr><td>きょうだい在園</td><td>+3</td></tr>
<tr><td>認可外保育施設を利用中</td><td>+3</td></tr>
<tr><td>生活保護世帯</td><td>+3</td></tr>
<tr><td>きょうだい同時入所</td><td>+2</td></tr>
<tr><td>育休明け復帰</td><td>+2</td></tr>
<tr><td>同居祖父母等が保育可能</td><td>−3</td></tr>
<tr><td>転園希望</td><td>−5</td></tr>
<tr><td>市外在住</td><td>−10</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な指数表は<a href="https://www.city.tokushima.tokushima.jp/smph/kosodate/youchien_hoikujo/hoikusho_n-kodomoen/index.html" target="_blank" rel="noopener">徳島市公式サイト「保育所等について」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "tokushima",
    title: "徳島市で加点を最大化するコツ　調整指数を積み上げる方法",
    description:
      "徳島市の保育園入園選考で有利になる調整指数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基礎指数40点がスタートライン</h2>
<p>徳島市では父母ともフルタイム勤務（月20日以上かつ日8時間以上）であれば基礎指数は<span class="highlight">20＋20＝40点</span>になります。多くの共働き家庭がこの水準になるため、差を分けるのは調整指数です。</p>

<h2>主な加点項目と活用のポイント</h2>

<h3>1. ひとり親家庭（+5点）</h3>
<p>配偶者の死亡・離別・行方不明等によるひとり親世帯に加算されます。徳島市の調整指数の中で最大の加点です。</p>

<h3>2. きょうだい在園（+3点）</h3>
<p>きょうだいが既に希望の保育施設に在園している場合に加算されます。上の子と同じ園を希望する場合に有利です。</p>

<h3>3. 認可外保育施設の利用（+3点）</h3>
<p>認可外保育施設に預けながら認可保育施設への入所を希望する場合に<span class="highlight">+3点</span>が加算されます。認可園に入れなかった場合でも、認可外に通わせておくことで次年度の選考で有利になります。</p>

<h3>4. 育休明け復帰（+2点）</h3>
<p>育児休業から復帰して入所を希望する場合に加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい在園＋育休明けの場合：基礎40＋きょうだい3＋育休明け2＝<span class="highlight">合計45点</span>。認可外利用中であればさらに+3で<span class="highlight">合計48点</span>となり、多くの園で有利に選考が進みます。</p>
</div>

<h2>減点に注意</h2>
<p>以下の項目に該当すると減点されます。</p>
<ul>
<li><strong>市外在住（−10点）</strong>：徳島市外から市内の園を希望する場合</li>
<li><strong>転園希望（−5点）</strong>：既に認可施設に在園中で別の園へ転園を希望する場合</li>
<li><strong>同居祖父母等が保育可能（−3点）</strong>：65歳未満の同居親族が保育できる状態の場合</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>徳島市の利用調整基準の詳細は<a href="https://www.city.tokushima.tokushima.jp/smph/kosodate/youchien_hoikujo/hoikusho_n-kodomoen/index.html" target="_blank" rel="noopener">徳島市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "tokushima",
    title: "徳島市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "徳島市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、徳島市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。</p>

<h3>徳島市の認可保育施設の種類</h3>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可保育所</td><td>0〜5歳児。最も一般的な保育施設。徳島市内に約30か所</td></tr>
<tr><td>認定こども園</td><td>教育と保育を一体的に提供。1号（教育）と2号・3号（保育）がある</td></tr>
<tr><td>小規模保育事業</td><td>0〜2歳児。定員6〜19人の少人数保育</td></tr>
<tr><td>事業所内保育事業</td><td>企業が主に従業員向けに設置。地域枠あり</td></tr>
</table>

<h2>認可外保育施設とは</h2>
<p>認可基準を満たしていないか、あえて認可を受けていない保育施設です。利用調整（選考）がなく、施設と直接契約します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>徳島市では認可外保育施設を利用している場合、認可園への申込時に<span class="highlight">+3点</span>の調整指数が加算されます。認可園に入れなかった場合のセーフティネットとしてだけでなく、翌年度の加点にもつながります。</p>
</div>

<h2>どちらを選ぶべき？</h2>
<ul>
<li><strong>保育料を抑えたい</strong> → 認可保育園（3歳以上は無償）</li>
<li><strong>すぐに預けたい</strong> → 認可外保育施設（選考なし）</li>
<li><strong>少人数保育を希望</strong> → 小規模保育事業や認可外</li>
<li><strong>教育も重視</strong> → 認定こども園</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>徳島市内の保育施設一覧は<a href="https://www.city.tokushima.tokushima.jp/smph/kosodate/youchien_hoikujo/hoikusho_n-kodomoen/index.html" target="_blank" rel="noopener">徳島市公式サイト「保育所等について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "tokushima",
    title: "徳島市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "徳島市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>徳島市では例年6月〜9月が見学シーズンです。希望する園に電話で見学予約を入れましょう。徳島市は夏場が暑いため、涼しい時間帯の見学がおすすめです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>徳島市は車社会のため、通園時の駐車場の広さや送迎動線は特に重要な確認ポイントです。阿波おどり期間中（8月12〜15日）は市内中心部が混雑するため見学日を避けましょう。</p>
</div>

<h2>見学チェックリスト</h2>
<h3>施設環境</h3>
<ul>
<li>園舎の清潔さ・安全対策（階段、窓、角）</li>
<li>園庭の広さ・遊具の状態</li>
<li>夏場の暑さ対策（エアコン・ミスト・日よけ）</li>
<li>駐車場の台数と送迎時の混雑状況</li>
<li>セキュリティ（玄関施錠、防犯カメラ）</li>
</ul>

<h3>保育内容</h3>
<ul>
<li>1日のスケジュール</li>
<li>外遊びの頻度（夏場の熱中症対策含む）</li>
<li>給食の内容とアレルギー対応</li>
<li>お昼寝の環境と見守り体制</li>
<li>行事・イベントの年間予定</li>
</ul>

<h3>職員・運営</h3>
<ul>
<li>保育士の人数と年齢構成</li>
<li>先生の子どもへの接し方・雰囲気</li>
<li>延長保育の対応時間と料金</li>
<li>急な発熱時の対応方針</li>
<li>保護者との連絡方法（アプリ・連絡帳）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>徳島市内の保育施設一覧は<a href="https://www.city.tokushima.tokushima.jp/smph/kosodate/youchien_hoikujo/hoikusho_n-kodomoen/index.html" target="_blank" rel="noopener">徳島市公式サイト</a>で確認できます。見学前に園の概要を確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "tokushima",
    title: "育休中の保活ガイド　徳島市で育休明け入園を成功させるコツ",
    description:
      "徳島市で育休中に保活を進めるスケジュールと、育休明け加点（+2点）を活かす方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休明け加点は+2点</h2>
<p>徳島市では育児休業から復帰して入所を希望する場合、調整指数として<span class="highlight">+2点</span>が加算されます。フルタイム共働き世帯なら基礎40＋育休明け2＝<span class="highlight">合計42点</span>になります。</p>

<h2>認可外利用と組み合わせて+5点</h2>
<p>育休中に認可外保育施設を利用しておくと、認可外利用の加点（+3点）も合わせて<span class="highlight">+5点</span>の上乗せが可能です。基礎40＋育休明け2＋認可外3＝<span class="highlight">合計45点</span>になります。</p>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>徳島市の公式サイトで保育施設一覧と前年度の入所案内を確認します。子ども保育課に電話で問い合わせることもできます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>生後6か月〜：保育園見学</strong><p>気になる園に電話して見学予約。3〜5園は見学しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月頃：書類準備</strong><p>就労証明書を勤務先に依頼。育休中でも勤務先に在籍していることが必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>子ども保育課の窓口で書類を提出します。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>徳島市は人口約25.5万人の中核市で、園によっては定員に余裕がある場合もあります。ただし人気園は競争率が高いため、希望園は複数記入しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休給付金延長の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "shokibo-hoikuen",
    citySlug: "tokushima",
    title: "徳島市の小規模保育園ガイド　0〜2歳児の手厚い保育と卒園後の進路",
    description:
      "徳島市の小規模保育事業の特徴と、卒園後の認可保育園への移行のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19人の小さな保育施設です。少人数のため手厚い保育が受けられるのが特徴です。</p>

<h2>小規模保育園のメリット</h2>
<ul>
<li>少人数制で一人ひとりに目が行き届く</li>
<li>家庭的な雰囲気の中で保育を受けられる</li>
<li>大規模園に比べて感染症が広がりにくい</li>
<li>認可園なので保育料が所得に応じて設定される</li>
</ul>

<h2>卒園後の進路</h2>
<p>小規模保育事業は2歳児クラスまでのため、3歳以降は別の認可保育園や認定こども園に移る必要があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>徳島市では連携施設が設定されている小規模保育園もあります。入園前に卒園後の連携先がどの園かを確認しておくと安心です。3歳児クラスは定員枠が増える園も多いため、比較的移行しやすい傾向があります。</p>
</div>

<h2>小規模保育園を選ぶ際の注意点</h2>
<ul>
<li>3歳以降は別の園に移る必要がある（転園先の準備が必要）</li>
<li>園庭がない施設もある（近隣の公園を利用）</li>
<li>連携施設がどの園かを入所前に確認しておく</li>
<li>保育内容や開所時間は園によって異なる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>徳島市内の保育施設一覧は<a href="https://www.city.tokushima.tokushima.jp/smph/kosodate/youchien_hoikujo/hoikusho_n-kodomoen/index.html" target="_blank" rel="noopener">徳島市公式サイト「保育所等について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "tokushima",
    title: "徳島市で二人目の保活　きょうだい加点+3と同時入所+2を活用",
    description:
      "徳島市で二人目の保活をする際のきょうだい在園加点（+3）や同時入所加点（+2）の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい在園で+3点</h2>
<p>徳島市では対象児童のきょうだいが既に希望の保育施設に在園している場合に<span class="highlight">+3点</span>の調整指数が加算されます。</p>

<h2>きょうだい同時入所で+2点</h2>
<p>きょうだい（多胎児含む）の同時入所を希望する場合に<span class="highlight">+2点</span>の調整指数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい在園＋育休明けの場合：基礎40＋きょうだい3＋育休明け2＝<span class="highlight">合計45点</span>。同じ園を希望する場合は有利に選考が進みます。</p>
</div>

<table>
<tr><th>パターン</th><th>調整指数</th></tr>
<tr><td>きょうだい在園（希望園に在園中）</td><td>+3</td></tr>
<tr><td>きょうだい同時入所</td><td>+2</td></tr>
<tr><td>育休明け復帰</td><td>+2</td></tr>
<tr><td>認可外保育施設利用中</td><td>+3</td></tr>
</table>

<h2>上の子と同じ園に入れるべき？</h2>
<p>送り迎えの負担を考えると、きょうだいは同じ園がベストです。きょうだい在園で+3の加点がつくため、同じ園を希望する場合は選考でも有利になります。</p>

<h2>保育料の多子軽減</h2>
<p>徳島市では多子軽減制度があり、きょうだいがいる場合は第2子以降の保育料が軽減されます。3歳以上は無償化の対象です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の多子軽減の詳細は<a href="https://www.city.tokushima.tokushima.jp/smph/kosodate/youchien_hoikujo/hoikusho_n-kodomoen/index.html" target="_blank" rel="noopener">徳島市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "tokushima",
    title: "徳島市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "徳島市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>徳島市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層ごとに設定されます。世帯の課税状況によって月額が決まります。</p>

<h2>3歳以上は無償</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3歳〜5歳児クラスの保育料は<span class="highlight">0円</span>です。ただし給食費（副食費）は別途かかります。</p>

<h2>0〜2歳の保育料の目安</h2>
<table>
<tr><th>階層</th><th>対象</th><th>月額（目安）</th></tr>
<tr><td>生活保護世帯</td><td>生活保護受給者</td><td>0円</td></tr>
<tr><td>非課税世帯</td><td>市町村民税非課税</td><td>0円</td></tr>
<tr><td>低所得層</td><td>所得割額の低い世帯</td><td>約5,000〜15,000円</td></tr>
<tr><td>中間層</td><td>所得割額が中程度の世帯</td><td>約20,000〜40,000円</td></tr>
<tr><td>高所得層</td><td>所得割額が高い世帯</td><td>約45,000〜65,000円</td></tr>
</table>

<h2>軽減制度</h2>
<h3>多子軽減</h3>
<p>きょうだいがいる場合、第2子以降の保育料が軽減されます。0〜2歳児クラスでは第2子は半額、第3子以降は無償になる場合があります。</p>

<h3>ひとり親世帯向け軽減</h3>
<p>ひとり親世帯は保育料が軽減される場合があります。詳細は子ども保育課にお問い合わせください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.tokushima.tokushima.jp/smph/kosodate/youchien_hoikujo/hoikusho_n-kodomoen/index.html" target="_blank" rel="noopener">徳島市公式サイト「保育所等について」</a>をご確認ください。保育料徴収額基準表が掲載されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "tokushima",
    title: "徳島市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "徳島市の利用調整で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整で入所できなかったら</h2>
<p>4月入園の選考で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：年度途中入所を申し込む</h2>
<p>徳島市では年度途中の入所も毎月受付があります。空きが出た園から随時入所が可能です。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>子ども保育課に連絡</strong><p>空き状況を確認し、途中入所の申込書を入手します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>希望園を見直す</strong><p>人気園以外にも範囲を広げて検討しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>毎月の空き状況を確認</strong><p>定期的に空き情報をチェックし、タイミングを逃さないようにしましょう。</p></div>
</div>

<h2>選択肢2：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。復職して次年度に再挑戦する戦略として有効です。さらに徳島市では認可外利用中の場合<span class="highlight">+3点</span>の加点があるため、翌年度の選考で有利になります。</p>

<h2>選択肢3：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>徳島市は人口約25.5万人で、地方都市としては保育施設が約30か所と充実しています。人気園を避けて郊外の園も視野に入れれば、途中入所のチャンスは十分あります。</p>
</div>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（人気園以外も検討）</li>
<li>認可外保育施設に預けて加点（+3）を確保する</li>
<li>就労時間を増やして基礎指数を上げられないか検討する</li>
<li>家庭の状況変化（転職、引越し等）で指数が変わる可能性を確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.tokushima.tokushima.jp/smph/kosodate/youchien_hoikujo/hoikusho_n-kodomoen/index.html" target="_blank" rel="noopener">徳島市公式サイト「保育所等について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
