import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "iwaki",
    title: "いわき市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "いわき市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>いわき市の4月入園は1次募集と2次募集の2回に分けて審査が行われます。</p>

<h3>申込から入所までの流れ</h3>
<table>
<tr><th>募集</th><th>受付期間</th><th>結果通知</th></tr>
<tr><td>1次募集</td><td>10月上旬〜11月上旬</td><td>1月下旬〜2月上旬</td></tr>
<tr><td>2次募集</td><td>1月中旬〜2月上旬</td><td>2月下旬〜3月上旬</td></tr>
<tr><td>途中入所</td><td>利用開始希望月の2か月前〜前月5日</td><td>審査後随時</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>いわき市は1次募集がもっとも枠が多く有利です。途中入所は毎月受け付けており、第1希望の保育所等を所管する地区保健福祉センターの窓口で手続きします。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>いわき市の公式サイトで「保育所・幼稚園等ガイドブック」を入手し、施設情報を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。いわき市は広域なので通園ルートも要確認です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。「子どものための教育・保育給付認定申請書 兼 保育施設等利用申請書」が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月：1次募集に申込</strong><p>第1希望の保育所等を所管する地区保健福祉センターで書類を提出します。オンライン申請にも対応しています。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.iwaki.lg.jp/www/genre/1000100000225/index.html" target="_blank" rel="noopener">いわき市公式サイト「保育所・保育園」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "iwaki",
    title: "いわき市の入園選考のしくみ　利用調整の基礎知識をやさしく解説",
    description:
      "いわき市の保育園入園選考で使われる利用調整の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整の全体像</h2>
<p>いわき市の認可保育施設は<strong>利用調整指数の高い世帯から優先</strong>して入所が決まります。利用決定は先着順ではありません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>いわき市では「それぞれの要件等に点数を設定して調整を行っている」と公式FAQで説明されていますが、恣意的な申込みを避けるため、具体的な点数配分は非公開としています。</p>
</div>

<h2>基礎指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を指数化したものです。就労時間、疾病、介護などの状況に応じて、保護者ごとに指数が決まります。</p>
<table>
<tr><th>保育の実施基準</th><th>指数の目安</th></tr>
<tr><td>家庭外就労：フルタイム（月120時間以上）</td><td>高い</td></tr>
<tr><td>家庭外就労：パートタイム（月48〜120時間）</td><td>中程度</td></tr>
<tr><td>妊娠・出産（前後各8週以内）</td><td>高い</td></tr>
<tr><td>疾病・負傷（入院・自宅療養等）</td><td>高い</td></tr>
<tr><td>求職活動</td><td>低い</td></tr>
</table>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加算（または減算）される指数です。ひとり親家庭、きょうだい在園、育休復帰などが考慮されます。</p>

<h2>就労要件の下限</h2>
<p>いわき市では<span class="highlight">月48時間以上</span>の就労が保育の必要性の認定要件です。これを満たさない場合は保育認定を受けられません。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.iwaki.lg.jp/www/contents/1677156824432/index.html" target="_blank" rel="noopener">いわき市公式サイト「保育所等に関するよくある質問」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "iwaki",
    title: "いわき市で加点を最大化するコツ　調整指数を積み上げる方法",
    description:
      "いわき市の保育園入園選考で有利になる調整指数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>フルタイム共働きがスタートライン</h2>
<p>いわき市では父母ともフルタイム勤務（月120時間以上）であれば基礎指数は最大クラスになります。多くの家庭がこの水準になるため、差を分けるのは調整指数です。</p>

<h2>主な加点が見込まれる項目</h2>

<h3>1. 産休・育休明け</h3>
<p>産休または育休から復帰して入所を希望する場合に加算されます。多くの保護者が該当する項目です。</p>

<h3>2. 産休・育休明け再入所</h3>
<p>産休・育休で一度退所し、再度同一保育所に申し込む場合は通常の育休明けより高い加点が見込まれます。</p>

<h3>3. きょうだいの同時入所・在園</h3>
<p>きょうだいが既に希望の保育所に入所している場合、またはきょうだいの同時入所を希望する場合に加算されます。</p>

<h3>4. 地域型保育施設の卒園児</h3>
<p>小規模保育事業等の卒園児が連携施設への入所を希望する場合、非常に大きな加点が見込まれます。3歳以降の入園戦略として有効です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>いわき市は具体的な点数を非公開としていますが、全国的な傾向として「フルタイム共働き＋育休明け＋きょうだい在園」の組み合わせが有利に働きます。</p>
</div>

<h2>減点に注意</h2>
<p>65歳未満の同居親族が保育の要件に該当せず保育可能な状態にある場合、減点になることがあります。祖父母と同居している方は注意が必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>いわき市の点数は非公開のため、本記事の内容は一般的な傾向に基づく参考情報です。詳細はこどもみらい部 保育・幼稚園課（☎ 0246-22-7454）にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "iwaki",
    title: "いわき市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "いわき市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、いわき市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。</p>

<h3>いわき市の認可保育施設の種類</h3>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可保育所</td><td>0〜5歳児。最も一般的な保育施設</td></tr>
<tr><td>認定こども園</td><td>教育と保育を一体的に提供。1号（教育）と2号・3号（保育）がある</td></tr>
<tr><td>小規模保育事業</td><td>0〜2歳児。定員6〜19人の少人数保育</td></tr>
<tr><td>事業所内保育事業</td><td>企業が主に従業員向けに設置。地域枠あり</td></tr>
</table>

<h2>認可外保育施設とは</h2>
<p>認可基準を満たしていないか、あえて認可を受けていない保育施設です。利用調整（選考）がなく、施設と直接契約します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設は利用調整がないため、認可園に入れなかった場合のセーフティネットとして利用できます。0〜2歳の住民税非課税世帯は月額42,000円まで無償化の対象です。</p>
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
<p>いわき市内の保育施設一覧は<a href="https://www.city.iwaki.lg.jp/www/contents/1627984475158/index.html" target="_blank" rel="noopener">いわき市公式サイト「保育所・幼稚園等ガイドブック」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "iwaki",
    title: "いわき市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "いわき市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>いわき市では例年6月〜9月が見学シーズンです。希望する園に電話で見学予約を入れましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>いわき市は面積が広く、平・小名浜・勿来・常磐・内郷・四倉など地区ごとに保育施設が点在しています。通勤ルート上の園を中心に検討しましょう。</p>
</div>

<h2>見学チェックリスト</h2>
<h3>施設環境</h3>
<ul>
<li>園舎の清潔さ・安全対策（階段、窓、角）</li>
<li>園庭の広さ・遊具の状態</li>
<li>駐車場の台数（いわき市は車通勤が多いため重要）</li>
<li>セキュリティ（玄関施錠、防犯カメラ）</li>
<li>津波・水害対策（沿岸部の園は特に確認）</li>
</ul>

<h3>保育内容</h3>
<ul>
<li>1日のスケジュール</li>
<li>外遊びの頻度</li>
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

<div class="warn-box">
<p><strong>注意</strong></p>
<p>いわき市は東日本大震災の経験から、各園の防災対策や避難計画が重視されています。見学時には避難経路や防災訓練の頻度も確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "iwaki",
    title: "育休中の保活ガイド　いわき市で育休明け入園を成功させるコツ",
    description:
      "いわき市で育休中に保活を進めるスケジュールと、育休明け加点を活かす方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休明けは加点あり</h2>
<p>いわき市では産休または育休から復帰して入所を希望する場合、利用調整で加点されます。フルタイム共働き世帯であれば、基礎指数に育休明け加点が上乗せされ、有利な選考が見込めます。</p>

<h2>再入所はさらに有利</h2>
<p>産休・育休を理由に保育所を退所した児童が再度同一保育所に申し込む場合は、通常の育休明けより高い加点が見込まれます。</p>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>いわき市の公式サイトで「保育所・幼稚園等ガイドブック」を確認。各施設の情報を把握します。</p></div>
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
<div class="step-content"><strong>10月：1次募集に申込</strong><p>地区保健福祉センターの窓口で書類を提出、またはオンラインで申請します。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次募集で入所できなかった場合でも、2次募集や途中入所の制度があります。途中入所は利用開始希望月の2か月前から申込みが可能です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休給付金延長の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "shokibo-hoikuen",
    citySlug: "iwaki",
    title: "いわき市の小規模保育園ガイド　卒園後の連携枠加点を活かす戦略",
    description:
      "いわき市の小規模保育事業の特徴と、卒園後に連携施設へ入所する場合の大きな調整加点が得られるメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19人の小さな保育施設です。少人数のため手厚い保育が受けられるのが特徴です。</p>

<h2>卒園後の大きなメリット：連携枠加点</h2>
<p>いわき市では地域型保育施設の卒園児が連携施設への入所を希望する場合、利用調整において非常に大きな加点が見込まれます。3歳以降の入園戦略として有効です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋連携枠卒園児の場合、基礎指数に大幅な加点が上乗せされるため、3歳以降の認可保育園への入園が非常に有利になります。</p>
</div>

<h2>連携枠以外でも加点あり</h2>
<p>連携施設ではない園を希望する場合でも、地域型保育施設の卒園児であれば一定の加点があります。</p>

<h2>いわき市の地域型保育施設</h2>
<p>いわき市内には複数の小規模保育事業所があります。各施設の連携先は「保育所・幼稚園等ガイドブック」で確認できます。</p>

<h2>小規模保育園を選ぶ際の注意点</h2>
<ul>
<li>3歳以降は別の園に移る必要がある（転園先の準備が必要）</li>
<li>園庭がない施設もある（近隣の公園を利用）</li>
<li>連携施設がどの園かを入所前に確認しておく</li>
<li>連携枠の加点を活かすなら、卒園後の連携施設が希望に合うか要チェック</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>いわき市内の地域型保育施設一覧は<a href="https://www.city.iwaki.lg.jp/www/contents/1627984475158/index.html" target="_blank" rel="noopener">いわき市公式サイト「保育所・幼稚園等ガイドブック」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "iwaki",
    title: "いわき市で二人目の保活　きょうだい加点と再入所加点を活用",
    description:
      "いわき市で二人目の保活をする際のきょうだい同時入所加点や産休・育休明け再入所加点の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだいの同時入所・在園で加点</h2>
<p>いわき市では対象児童のきょうだいが既に希望の保育所に入所している場合、またはきょうだい（多胎児含む）の同時入所を希望する場合に調整指数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい在園＋育休明けの組み合わせは、いわき市の利用調整で有利に働きます。同じ園を希望する場合は特に効果的です。</p>
</div>

<h2>産休・育休明け再入所は有利</h2>
<p>二人目の出産で上の子を一度退所させた場合、再度同一保育所に申し込むと通常の育休明けより大きな加点が見込まれます。</p>

<h2>上の子を退所させるべき？</h2>
<p>上の子を退所させて再入所加点を狙うか、在園させたままきょうだい加点＋育休明け加点を使うかは状況次第です。退所リスクを考慮して判断しましょう。</p>

<h2>保育料の多子軽減</h2>
<p>いわき市では多子軽減制度があり、きょうだいがいる場合は第2子以降の保育料が軽減されます。3歳以上は無償化の対象です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだい加点は「希望の保育所」に入所していることが条件です。別の園に通っている場合は対象外となるため注意しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "iwaki",
    title: "いわき市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "いわき市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>いわき市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層ごとに設定されます。世帯の課税状況によって月額が決まります。</p>

<h2>3歳以上は無償</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3歳〜5歳児クラスの保育料は<span class="highlight">0円</span>です。ただし給食費（副食費）は別途かかります。</p>

<h2>0〜2歳の保育料の目安</h2>
<table>
<tr><th>階層</th><th>対象</th><th>月額（目安）</th></tr>
<tr><td>生活保護世帯</td><td>生活保護受給者</td><td>0円</td></tr>
<tr><td>非課税世帯</td><td>市町村民税非課税</td><td>0円</td></tr>
<tr><td>低所得層</td><td>所得割額の低い世帯</td><td>約5,000〜15,000円</td></tr>
<tr><td>中間層</td><td>所得割額が中程度の世帯</td><td>約20,000〜40,000円</td></tr>
<tr><td>高所得層</td><td>所得割額が高い世帯</td><td>約50,000〜70,000円</td></tr>
</table>

<h2>軽減制度</h2>
<h3>多子軽減</h3>
<p>きょうだいがいる場合、第2子以降の保育料が軽減されます。</p>

<h3>ひとり親世帯向け軽減</h3>
<p>ひとり親世帯は保育料が軽減される場合があります。詳細はこどもみらい部 保育・幼稚園課にお問い合わせください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.iwaki.lg.jp/www/contents/1001000005227/files/iwakihoikuryou.pdf" target="_blank" rel="noopener">いわき市公式サイト「保育料（利用者負担額）について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "iwaki",
    title: "いわき市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "いわき市の利用調整で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整で入所できなかったら</h2>
<p>1次募集の審査で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：2次募集に申し込む</h2>
<p>いわき市では1次募集の後に2次募集があります。辞退や空きが出た枠で選考が行われます。希望園の変更・追加も可能です。</p>

<h2>選択肢2：途中入所を申し込む</h2>
<p>いわき市では利用開始希望月の2か月前から前月5日まで途中入所の申込みを受け付けています。地区保健福祉センターの窓口で手続きします。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。復職して次年度に再挑戦する戦略として有効です。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>いわき市は面積が広いため、地区によって競争率に大きな差があります。平地区は人気が高い傾向がありますが、周辺地区では比較的入りやすい場合もあります。</p>
</div>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（人気園以外も検討）</li>
<li>小規模保育事業も視野に入れる（卒園後に連携枠で大きな加点あり）</li>
<li>家庭の状況変化（転職、引越し等）で指数が変わる可能性を確認</li>
<li>最大5つまで希望園を書けるので、幅広く検討する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>いわき市の保育施設情報は<a href="https://www.city.iwaki.lg.jp/www/genre/1000100000225/index.html" target="_blank" rel="noopener">いわき市公式サイト「保育所・保育園」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
