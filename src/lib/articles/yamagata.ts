import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "yamagata",
    title: "山形市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "山形市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>山形市の4月入園申込は例年9月頃から書類配布が始まり、10月〜11月が受付期間です。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年9月頃〜</td></tr>
<tr><td>1次申込受付</td><td>2025年10月上旬〜11月上旬</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬〜2月上旬（郵送）</td></tr>
<tr><td>2次申込受付</td><td>2026年1月〜2月</td></tr>
<tr><td>2次結果通知</td><td>2026年2月下旬〜3月上旬（郵送）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山形市では年度途中の入所も毎月受け付けています。希望する月の前月10日頃が締切になることが多いため、早めの準備が大切です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>山形市こども未来部保育育成課の公式サイトで前年度の資料を参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。山形市内には認可保育所・認定こども園が多数あります。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。保育の利用申込書と支給認定申請書が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>保育育成課の窓口で期限内に必要書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.yamagata-yamagata.lg.jp/kosodatekyoiku/hoiku/1007241/1016711.html" target="_blank" rel="noopener">山形市公式サイト「令和8年度 認可保育所等の利用申し込み受付について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "yamagata",
    title: "山形市の入園点数のしくみ　基準点数と調整点数をやさしく解説",
    description:
      "山形市の保育園入園選考で使われる点数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>山形市の認可保育施設は<strong>総合点数の高い世帯から優先</strong>して利用調整されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>総合点数 ＝ 基準点数（父＋母）＋ 調整点数</p>
</div>

<h2>基準点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大20点</span>（1日8時間以上就労の場合）で、月20日勤務換算の1日あたり就労時間で判定されます。</p>
<table>
<tr><th>就労時間（1日あたり）</th><th>基準点数</th></tr>
<tr><td>8時間以上</td><td>20</td></tr>
<tr><td>7時間以上</td><td>18</td></tr>
<tr><td>6時間以上</td><td>16</td></tr>
<tr><td>5時間以上</td><td>15</td></tr>
<tr><td>4時間以上</td><td>14</td></tr>
<tr><td>4時間未満</td><td>8</td></tr>
</table>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。複数の項目に該当する場合はすべて合算されます。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>生活保護世帯</td><td>+45</td></tr>
<tr><td>ひとり親家庭・両親不在</td><td>+35</td></tr>
<tr><td>年齢による卒園児（小規模等）</td><td>+30</td></tr>
<tr><td>育休で上の子の利用を解除</td><td>+20</td></tr>
<tr><td>里親家庭</td><td>+15</td></tr>
<tr><td>きょうだいが利用中の園を第一希望</td><td>+10</td></tr>
<tr><td>認定こども園1号→2号切替え</td><td>+10</td></tr>
<tr><td>申請児が障がい児</td><td>+5</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な利用調整基準表は<a href="https://www.city.yamagata-yamagata.lg.jp/kosodatekyoiku/hoiku/1007241/1005906.html" target="_blank" rel="noopener">山形市公式サイト「保育所等の利用に係る利用調整について」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "yamagata",
    title: "山形市で加点を最大化するコツ　調整点数を積み上げる方法",
    description:
      "山形市の保育園入園選考で有利になる調整点数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基準点数40がスタートライン</h2>
<p>山形市では父母とも1日8時間以上のフルタイム勤務であれば基準点数は<span class="highlight">20＋20＝40</span>になります。多くの共働き家庭がこの水準です。差を分けるのは調整点数です。</p>

<h2>主な加点項目と活用のポイント</h2>

<h3>1. きょうだい同一園希望（+10点）</h3>
<p>きょうだいが利用中の保育所等への入所を第一希望にする場合+10点が加算されます。同じ園に通わせたい場合に大きなアドバンテージになります。</p>

<h3>2. 産休・育休からの職場復帰（+2点）</h3>
<p>産後休業または育児休業から復帰して入所を希望する場合に加算されます。多くの保護者が該当する項目です。</p>

<h3>3. きょうだい同時申込（+3点）</h3>
<p>きょうだいを同時に申し込む場合+3点が加算されます。双子（+1点）との併用も可能です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい同一園希望＋育休復帰＋小学生以下きょうだいありの場合：基準40＋きょうだい10＋育休復帰2＋きょうだい1＝<span class="highlight">合計53点</span>。この水準であれば多くの園で有利に選考が進みます。</p>
</div>

<h3>4. 年齢による卒園児（+30点）</h3>
<p>小規模保育事業所等を年齢上限で卒園する場合+30点が加算されます。3歳以降の入園戦略として非常に有効です。</p>

<h2>減点にも注意</h2>
<p>山形市には減点項目もあります。就労内定（-4点）や祖父母と交代での保育（-2点）は点数が下がるため注意が必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育児休業の延長が可能で順位を下げることに同意する場合、-100点の大幅な減点があります。育休延長を希望する場合以外は同意しないようにしましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "yamagata",
    title: "山形市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "山形市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、山形市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。</p>

<h3>山形市の認可保育施設の種類</h3>
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
<p>山形市では認可外保育施設の利用中に+2点の調整点数が加算されます。認可園に入れなかった場合のつなぎとして利用しつつ、次年度の選考で有利になる戦略も有効です。</p>
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
<p>山形市内の保育施設一覧は<a href="https://www.city.yamagata-yamagata.lg.jp/kosodatekyoiku/hoiku/1006618/1005920.html" target="_blank" rel="noopener">山形市公式サイト「市内の認可保育所・認定こども園」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "yamagata",
    title: "山形市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "山形市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>山形市では例年6月〜9月が見学シーズンです。希望する園に電話で見学予約を入れましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山形市は冬の降雪が多いため、冬場の通園を想定した園選びが重要です。駐車場の広さや除雪状況も確認しましょう。</p>
</div>

<h2>見学チェックリスト</h2>
<h3>施設環境</h3>
<ul>
<li>園舎の清潔さ・安全対策（階段、窓、角）</li>
<li>園庭の広さ・遊具の状態</li>
<li>冬季の室内遊びスペース</li>
<li>駐車場の台数と冬場の除雪状況</li>
<li>セキュリティ（玄関施錠、防犯カメラ）</li>
</ul>

<h3>保育内容</h3>
<ul>
<li>1日のスケジュール</li>
<li>外遊びの頻度（冬場を含む）</li>
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
<p>山形市は積雪量が多く冬場の送迎に時間がかかります。暖房設備の種類や室温管理、冬場の送迎動線は必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "yamagata",
    title: "育休中の保活ガイド　山形市で育休明け入園を成功させるコツ",
    description:
      "山形市で育休中に保活を進めるスケジュールと、育休復帰の加点を活かす方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休復帰の加点は+2点</h2>
<p>山形市では産後休業または育児休業から職場復帰して入所を希望する場合、調整点数として<span class="highlight">+2点</span>が加算されます。フルタイム共働き世帯なら基準40＋育休復帰2＝<span class="highlight">合計42点</span>になります。</p>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>山形市の公式サイトで保育施設一覧と前年度のしおりを確認します。</p></div>
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
<div class="step-content"><strong>10月〜11月：申込</strong><p>山形市保育育成課の窓口に書類を提出します。</p></div>
</div>

<h2>育休で上の子の利用を解除した場合は+20点</h2>
<p>下の子の育児休業を1年より長く取得するために上の子の保育利用を解除した場合、<span class="highlight">+20点</span>の大きな調整点数が加算されます。育休取得で一度退園した方には有利な制度です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山形市では育休延長に同意する申立てをすると-100点になります。真剣に入園を希望する場合は同意しないようにしましょう。</p>
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
    citySlug: "yamagata",
    title: "山形市の小規模保育園ガイド　卒園後+30点の加点を活かす戦略",
    description:
      "山形市の小規模保育事業の特徴と、年齢による卒園後に+30点の大きな調整加点が得られるメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19人の小さな保育施設です。少人数のため手厚い保育が受けられるのが特徴です。</p>

<h2>卒園後の大きなメリット：+30点</h2>
<p>山形市では年齢による卒園児に<span class="highlight">+30点</span>の調整点数が加算されます。小規模保育事業所等を卒園するお子さんが対象です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋卒園児加点の場合：基準40＋卒園児30＝<span class="highlight">合計70点</span>。非常に高い点数となるため、3歳以降の認可保育園への入園がほぼ確実になります。</p>
</div>

<h2>小規模保育園を選ぶ際の注意点</h2>
<ul>
<li>3歳以降は別の園に移る必要がある（転園先の準備が必要）</li>
<li>園庭がない施設もある（近隣の公園を利用）</li>
<li>連携施設がある場合はどの園かを事前に確認</li>
</ul>

<h2>0〜2歳の入園戦略</h2>
<p>山形市では認可外保育施設の利用で+2点の加点もあるため、以下の戦略が考えられます。</p>
<ol>
<li>まず小規模保育事業所に入所（0〜2歳）</li>
<li>少人数の手厚い保育を受けながら過ごす</li>
<li>3歳で卒園児加点+30点を活かして認可保育所に入園</li>
</ol>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>山形市内の保育施設一覧は<a href="https://www.city.yamagata-yamagata.lg.jp/kosodatekyoiku/hoiku/1006618/1005920.html" target="_blank" rel="noopener">山形市公式サイト「市内の認可保育所・認定こども園」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "yamagata",
    title: "山形市で二人目の保活　きょうだい加点+10と同時申込+3を活用",
    description:
      "山形市で二人目の保活をする際のきょうだい在園加点やきょうだい同時申込加点の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい同一園希望で+10点</h2>
<p>山形市ではきょうだいが利用中の保育所等への入所を第一希望にする場合、<span class="highlight">+10点</span>の調整点数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい同一園＋育休復帰＋小学生以下きょうだい＋就学前きょうだい1人の場合：基準40＋きょうだい10＋育休2＋小学生以下1＋就学前1＝<span class="highlight">合計54点</span></p>
</div>

<h2>きょうだい関連の加点まとめ</h2>
<table>
<tr><th>条件</th><th>調整点数</th></tr>
<tr><td>きょうだい利用中の園を第一希望</td><td>+10</td></tr>
<tr><td>きょうだい同時申込</td><td>+3</td></tr>
<tr><td>小学生以下のきょうだいがいる</td><td>+1</td></tr>
<tr><td>就学前きょうだい1人につき</td><td>+1</td></tr>
<tr><td>きょうだいに障がい児がいる（1人につき）</td><td>+1</td></tr>
</table>

<h2>同じ園に入るためのポイント</h2>
<p>きょうだいが利用中の園を第一希望にすることで+10点を確保できます。ただし、新年度末で上の子が卒園する場合は加点の対象外になるため注意が必要です。</p>

<h2>保育料の多子軽減</h2>
<p>山形市では多子軽減制度があり、第2子以降の保育料が軽減されます。3歳以上は無償化、0〜2歳も第2子以降は保育料が減額されます。山形県独自の保育料無償化に向けた段階的負担軽減も実施されています。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだいが卒園予定の場合は「きょうだい利用中の園を第一希望」の+10点が適用されません。申込時期と卒園時期をよく確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "yamagata",
    title: "山形市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "山形市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>山形市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層ごとに設定されます。世帯の課税状況によって月額が決まります。</p>

<h2>3歳以上は無償</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3歳〜5歳児クラスの保育料は<span class="highlight">0円</span>です。ただし給食費（副食費）は別途かかります。</p>

<h2>山形県独自の段階的負担軽減</h2>
<p>山形県では保育料無償化に向けた段階的な負担軽減を実施しています。0〜2歳児の保育料も段階的に軽減されており、山形市でも適用されています。</p>

<h2>軽減制度</h2>
<h3>多子軽減</h3>
<p>きょうだいがいる場合、第2子以降の保育料が軽減されます。</p>

<h3>ひとり親世帯向け軽減</h3>
<p>ひとり親世帯は基準点数で+35点の調整加点に加え、保育料も軽減されます。市町村民税非課税世帯のひとり親は保育料が0円になります。</p>

<h3>生活保護世帯</h3>
<p>生活保護世帯は保育料が0円で、利用調整でも+45点の調整加点が加算されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.yamagata-yamagata.lg.jp/kosodatekyoiku/hoiku/1007241/index.html" target="_blank" rel="noopener">山形市公式サイト「保育園・保育所の利用」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "yamagata",
    title: "山形市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "山形市の1次利用調整で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整で入所できなかったら</h2>
<p>1次利用調整で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：2次利用調整に申し込む</h2>
<p>1次で辞退が出た枠で再度利用調整が行われます。希望園の変更・追加も可能です。</p>

<h2>選択肢2：年度途中入園を申し込む</h2>
<p>山形市では毎月の利用調整があり、空きが出れば途中入園できます。毎月忘れずに確認しましょう。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。山形市では認可外利用中の場合に<span class="highlight">+2点</span>の調整加点があるため、次年度の選考でも有利になります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。ただし、育休延長に同意する申立てをすると-100点の減点があるため注意が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山形市では受入可能予定人数が公式サイトで公開されています。途中入園のチャンスを逃さないよう定期的にチェックしましょう。</p>
</div>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（人気園以外も検討）</li>
<li>小規模保育事業も視野に入れる（卒園後+30点の加点あり）</li>
<li>認可外保育施設を利用して+2点の加点を確保する</li>
<li>家庭の状況変化（転職、引越し等）で点数が変わる可能性を確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入可能予定人数は<a href="https://www.city.yamagata-yamagata.lg.jp/kosodatekyoiku/hoiku/1007241/1016951.html" target="_blank" rel="noopener">山形市公式サイト「令和8年度認可保育施設受入可能予定人数」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
];

registerArticles(articles);
