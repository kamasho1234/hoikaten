import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // =========================================================================
  // 1. 保活スケジュール完全ガイド
  // =========================================================================
  {
    slug: "hokatsu-schedule",
    citySlug: "takarazuka",
    title: "宝塚市の保活スケジュール完全ガイド（令和8年度）",
    description:
      "宝塚市の認可保育園、令和8年度4月入園の申込時期・選考の流れ・結果通知のスケジュールをわかりやすくまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>宝塚市の4月入園は<strong>一次受付</strong>と<strong>二次受付</strong>の2回に分かれています。申込先は宝塚市子ども未来部保育企画課です。</p>

<h3>一次受付</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申込書配布</td><td>令和7年9月頃〜</td></tr>
<tr><td>申込期間</td><td>令和7年10月上旬〜11月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<h3>二次受付</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申込期間</td><td>令和8年2月中旬まで</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宝塚市では窓口での申込が基本です。一次で保留となった場合も希望園の変更届を出すことで二次受付の対象になります。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集スタート</strong><p>宝塚市子ども未来部保育企画課のページで前年度の案内を確認しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>宝塚市内の認可保育園約30か所から気になる園に電話で見学予約をしましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に早めに依頼。記入漏れがないか入念にチェックしてください。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：一次受付に申込</strong><p>期限内に必要書類を窓口へ提出します。</p></div>
</div>

<h2>途中入園（5月〜3月）</h2>
<p>入園希望月の<span class="highlight">前月10日頃</span>が締切です。空き状況は宝塚市のホームページで毎月更新されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.takarazuka.hyogo.jp/kosodate/hoikuen/" target="_blank" rel="noopener">宝塚市公式サイト「保育所（園）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // =========================================================================
  // 2. 点数の仕組みと計算方法
  // =========================================================================
  {
    slug: "scoring-system",
    citySlug: "takarazuka",
    title: "宝塚市の保育園入園点数の仕組みと計算方法",
    description:
      "宝塚市の利用調整指数（基本指数＋調整指数）の計算方法をわかりやすく解説。フルタイム共働きで何点になるか具体例も紹介します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数のしくみ",
    categoryColor: "blue",
    content: `<h2>宝塚市の点数（利用調整指数）とは？</h2>
<p>宝塚市では、保育施設の入所希望者が定員を超えた場合、<strong>利用調整指数</strong>の高い世帯から入所者を決定します。指数は「基本指数」と「調整指数」の合計で算出されます。</p>

<h3>計算の仕組み</h3>
<div class="info-box">
<p><strong>利用調整指数 ＝ 父の基本指数 ＋ 母の基本指数 ＋ 調整指数</strong></p>
</div>

<h3>基本指数（父母各最大20点、合計最大40点）</h3>
<table>
<tr><th>就労時間（月あたり）</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10</td></tr>
</table>

<h3>具体例</h3>
<div class="point-box">
<p><strong>例）父：フルタイム（20点）＋ 母：フルタイム（20点）＝ 基本40点</strong></p>
<p>ここに調整指数（きょうだい加点、認可外利用加点など）が加減されます。</p>
</div>

<h2>同点の場合の優先順位</h2>
<p>利用調整指数が同点の場合は、以下のような基準で判定されます。</p>
<ol>
<li>宝塚市在住者（転入予定者含む）</li>
<li>ひとり親世帯・生活保護世帯</li>
<li>基本指数が高い世帯</li>
<li>所得の低い世帯</li>
</ol>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な点数表は<a href="https://www.city.takarazuka.hyogo.jp/kosodate/hoikuen/" target="_blank" rel="noopener">宝塚市公式サイト</a>でダウンロードできる利用調整基準表をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 58,
  },

  // =========================================================================
  // 3. 加点のコツ・点数アップ戦略
  // =========================================================================
  {
    slug: "score-up-strategy",
    citySlug: "takarazuka",
    title: "宝塚市の保育園入園で加点のコツ・点数アップ戦略",
    description:
      "宝塚市の調整指数を最大限に活用して入園の可能性を高める方法を解説。認可外利用加点やきょうだい加点など具体的な戦略を紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>宝塚市で加点される主な項目</h2>
<p>宝塚市の調整指数には複数の加点項目があります。該当する項目を漏れなく申請することが重要です。</p>

<h3>主な加点項目と点数</h3>
<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td></tr>
<tr><td>きょうだい在園中（同じ園を第一希望）</td><td>+5</td></tr>
<tr><td>地域型保育卒園（連携施設を希望）</td><td>+5</td></tr>
<tr><td>きょうだい在園中（別の園を希望）</td><td>+3</td></tr>
<tr><td>認可外保育施設に月64時間以上預託</td><td>+3</td></tr>
<tr><td>生活保護世帯</td><td>+3</td></tr>
<tr><td>地域型保育卒園（連携施設以外）</td><td>+3</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+2</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td></tr>
<tr><td>18歳未満の子ども3人以上</td><td>+2〜</td></tr>
</table>

<h2>点数アップの具体的戦略</h2>
<div class="point-box">
<p><strong>戦略1：認可外保育施設の利用</strong></p>
<p>認可外保育施設に月64時間以上有料で預けると+3点。宝塚市では40点満点の中で3点の差は大きいです。</p>
</div>
<div class="point-box">
<p><strong>戦略2：就労時間の確認</strong></p>
<p>月160時間（20点）と月140時間（18点）では2点の差があります。残業時間や休憩時間を含めて月160時間をクリアできないか確認しましょう。</p>
</div>
<div class="point-box">
<p><strong>戦略3：減点項目に注意</strong></p>
<p>65歳未満の無職の祖父母と同居している場合、-3点の減算があります。同居の定義を市に確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },

  // =========================================================================
  // 4. フルタイム共働き40点は安心か
  // =========================================================================
  {
    slug: "fulltime-40-line",
    citySlug: "takarazuka",
    title: "フルタイム共働き40点は安心？宝塚市のボーダーライン事情",
    description:
      "宝塚市でフルタイム共働き（基本40点）なら入園できるのか？人気エリアの実情と調整加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数のしくみ",
    categoryColor: "blue",
    content: `<h2>基本40点がスタートライン</h2>
<p>宝塚市では父母ともフルタイム（月160時間以上）の場合、父20点＋母20点＝<span class="highlight">基本40点</span>になります。これが満点です。</p>

<h2>宝塚市の保育園事情</h2>
<p>宝塚市は人口約23万人、兵庫県阪神北地域に位置する住宅都市です。子育て世帯も多く、特に宝塚駅・逆瀬川駅周辺の人気園では40点の世帯が多数並びます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>40点満点では安心できません。調整加点が勝負を分けます。きょうだい在園（+3〜+5）、認可外利用（+3）、育休復帰（+2）など、該当する加点がないか確認しましょう。</p>
</div>

<h2>同点の場合はどうなる？</h2>
<p>基本指数と調整指数の合計が同じ場合、宝塚市が定める優先順位（ひとり親世帯優先、所得の低い世帯優先など）で決定されます。</p>

<h2>時短勤務の場合</h2>
<p>母が週30時間（月120〜140時間）の時短勤務の場合、母は16点。父20点＋母16点＝基本36点となり、40点との差は4点です。宝塚市では大きなハンデになりえます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準の詳細は<a href="https://www.city.takarazuka.hyogo.jp/kosodate/hoikuen/" target="_blank" rel="noopener">宝塚市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 100,
  },

  // =========================================================================
  // 5. エリア別保育園ガイド
  // =========================================================================
  {
    slug: "area-guide",
    citySlug: "takarazuka",
    title: "宝塚市のエリア別保育園事情　入りやすい地域は？",
    description:
      "宝塚市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。宝塚駅周辺から山手まで、エリアごとの状況をまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>宝塚市は南北に長い地形で、阪急沿線の南部と、JR沿線・北部で保育園の状況が大きく異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>宝塚駅・宝塚南口周辺</td><td>市の中心部。子育て世帯が多く、保育園の競争は最も激しいエリア</td></tr>
<tr><td>逆瀬川・小林周辺</td><td>阪急今津線沿線の住宅地。園数は多いが人気園は競争あり</td></tr>
<tr><td>仁川・売布神社周辺</td><td>西宮市との境界エリア。通勤利便性が高く申込も多い</td></tr>
<tr><td>中山寺・山本周辺</td><td>JR・阪急の両方が使えるエリア。比較的園も多く選択肢がある</td></tr>
<tr><td>西谷地区（北部）</td><td>郊外の自然豊かなエリア。園数は少ないが定員に余裕がある場合がある</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宝塚駅・逆瀬川駅周辺は特に競争が激しいため、中山寺・山本方面や北部エリアも含めて広く候補を検討することをおすすめします。通勤経路上の園も選択肢に入れましょう。</p>
</div>

<h2>宝塚市の保育施設の種類</h2>
<p>宝塚市内の認可保育施設は約30か所あり、公立保育所・私立保育園・認定こども園（保育部分）・地域型保育（小規模保育）が含まれます。</p>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // =========================================================================
  // 6. 認可外保育施設の加点と活用法
  // =========================================================================
  {
    slug: "ninkagai-katen",
    citySlug: "takarazuka",
    title: "認可外保育施設で+3点　宝塚市の加点を得る条件と活用法",
    description:
      "宝塚市で認可外保育施設の利用実績により調整指数+3点を得るための条件と手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+3点の加点</h2>
<p>宝塚市では認可外保育施設に月64時間以上有料で預けている場合、<span class="highlight">+3点</span>の調整加点が得られます。</p>

<h2>40点満点の中で3点は大きい</h2>
<p>宝塚市の基本指数は父母合計で最大40点。フルタイム共働きの40点に認可外の+3点を加えれば43点になり、加点のない世帯との差は明確です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>40点＋認可外+3点＝43点。さらにきょうだい在園（+3〜+5）があれば大幅に有利になります。</p>
</div>

<h2>加点を得るための条件</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>就労等の保育認定事由がある</strong><p>保護者が就労、就学、介護等の理由で保育が必要であること。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>月64時間以上の利用</strong><p>認可外保育施設に月64時間以上、有料で預けていること。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>証明書類の提出</strong><p>施設からの在園証明書や領収書など、利用実績を証明する書類が必要です。</p></div>
</div>

<h2>認可外を選ぶ際の注意点</h2>
<p>宝塚市内の認可外保育施設は数が限られています。企業主導型保育事業所も選択肢のひとつです。早めに見学して空き状況を確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.takarazuka.hyogo.jp/kosodate/hoikuen/" target="_blank" rel="noopener">宝塚市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },

  // =========================================================================
  // 7. 育休中の保活でやるべきこと
  // =========================================================================
  {
    slug: "ikukyu-hokatsu",
    citySlug: "takarazuka",
    title: "宝塚市で育休中の保活でやるべきこと",
    description:
      "宝塚市で育休中に保活を進めるためのステップを解説。復帰タイミングと点数の関係、育休延長時の注意点もまとめました。",
    image:
      "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "育休・復帰",
    categoryColor: "rose",
    content: `<h2>育休中の保活スケジュール</h2>
<p>宝塚市で4月入園を目指す場合、育休中でも夏前から動き始めるのがベストです。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>出産後〜6月：情報収集</strong><p>宝塚市子ども未来部保育企画課のページで利用案内を確認しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>宝塚市内約30か所の認可保育園から候補を絞り、見学予約をします。赤ちゃん連れでもOKです。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書は勤務先の人事部に依頼。育児短時間勤務の終期が明記されていれば正規の勤務時間で指数がつきます。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：一次受付に申込</strong><p>窓口で提出。書類不備があると受理されないため入念にチェックを。</p></div>
</div>

<h2>育休と点数の関係</h2>
<div class="info-box">
<p>宝塚市では、育児休業取得中で入園に伴い復帰する場合、調整指数で<strong>+2点</strong>の加算があります。</p>
</div>

<h2>育休延長を希望する場合</h2>
<p>2025年4月から育児休業給付金の延長手続きが厳格化されました。宝塚市で保留通知を受け取った場合、通勤可能な範囲の園を複数希望し真剣に入園を目指している方は、従来どおり延長手続きが可能です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保留通知は育児休業給付金の延長手続きに必要な書類です。ハローワークに提出する際は原本が必要になる場合があるため、コピーを取っておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },

  // =========================================================================
  // 8. 保育園見学チェックリスト
  // =========================================================================
  {
    slug: "kengaku-checklist",
    citySlug: "takarazuka",
    title: "宝塚市の保育園見学チェックリスト",
    description:
      "宝塚市で保育園見学に行くときに確認すべきポイントをリスト化。見学の申込方法から当日のチェック項目まで網羅しています。",
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "見学・準備",
    categoryColor: "green",
    content: `<h2>見学の申込方法</h2>
<p>宝塚市の保育園見学は、各園に直接電話で申し込むのが基本です。6月〜9月は見学希望者が多いため、早めの連絡をおすすめします。</p>

<h2>見学時のチェックリスト</h2>
<h3>施設の環境</h3>
<ul>
<li>園庭の広さ、遊具の状態</li>
<li>室内の清潔さ、換気の良さ</li>
<li>安全対策（門の施錠、防犯カメラなど）</li>
<li>乳児室と幼児室の分離</li>
</ul>

<h3>保育内容</h3>
<ul>
<li>1日のスケジュール（散歩・外遊びの頻度）</li>
<li>給食は自園調理か外注か</li>
<li>アレルギー対応</li>
<li>おむつの処理方法（持ち帰りか園で処分か）</li>
</ul>

<h3>先生の雰囲気</h3>
<ul>
<li>子どもへの声かけは穏やかか</li>
<li>保育士の人数と年齢層</li>
<li>連絡帳やアプリでの保護者との連携方法</li>
</ul>

<div class="point-box">
<p><strong>宝塚市ならではのポイント</strong></p>
<p>宝塚市は南北に長い地形のため、園の立地と通勤経路の兼ね合いが重要です。阪急宝塚線・今津線・JR福知山線のどの沿線かによって、通いやすさが大きく変わります。</p>
</div>

<h2>見学時に聞いておきたい質問</h2>
<ol>
<li>慣れ保育の期間はどのくらいですか？</li>
<li>延長保育は何時まで対応していますか？</li>
<li>保護者参加の行事は年に何回ありますか？</li>
<li>急な発熱時の対応は？</li>
<li>地域型保育の場合、3歳以降の連携施設はどこですか？</li>
</ol>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },

  // =========================================================================
  // 9. 二人目の保活で注意すること
  // =========================================================================
  {
    slug: "futarime-hokatsu",
    citySlug: "takarazuka",
    title: "宝塚市で二人目の保活で注意すること",
    description:
      "宝塚市で二人目の保活を進める際の注意点を解説。きょうだい加点、同時申込のメリット、上の子の在園継続などをまとめました。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>二人目の保活で有利になるポイント</h2>

<h3>きょうだい加点</h3>
<p>宝塚市では、<strong>きょうだいが保育所等に在園中</strong>で同じ園を第一希望にする場合、調整指数で<span class="highlight">+5点</span>が加算されます。別の園を希望する場合でも+3点です。</p>

<h3>きょうだい同時申込</h3>
<div class="info-box">
<p>きょうだいを同時に申し込む場合は<strong>+2点</strong>の加算があります。双子の場合も対象です。</p>
</div>

<h3>子どもの人数による加点</h3>
<p>18歳未満の子どもが3人以上いる場合、追加の加点があります。</p>
<ul>
<li>子ども3人：+2点</li>
<li>子ども4人以上：+4点</li>
</ul>

<h2>同じ園に入れたい場合</h2>
<p>きょうだいが在園している園を第一希望にすると+5点の加点が得られます。さらに同点の場合の優先順位でも考慮されるため、同じ園への入園は有利です。ただし確実ではないため、第2希望以降も必ず記入しましょう。</p>

<h2>育休中の上の子の在園継続</h2>
<p>宝塚市では、育休中でも上の子が既に保育所等に入所している場合は<strong>継続利用が可能</strong>です。ただし、育休前に就労要件で入所していたことが条件になります。</p>

<div class="point-box">
<p><strong>注意点</strong></p>
<p>育休復帰の調整加点（+2点）は入園に伴い復帰する場合に適用されます。上の子が在園していても、下の子の申込に対しての加算です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 46,
  },

  // =========================================================================
  // 10. 落ちたときの対処法
  // =========================================================================
  {
    slug: "ochita-taisakuhou",
    citySlug: "takarazuka",
    title: "宝塚市の保育園に落ちたときの対処法",
    description:
      "宝塚市の認可保育園に入れなかった場合の具体的な対策を解説。二次受付、認可外、途中入園など次のアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>保留通知が届いたら</h2>
<p>宝塚市の一次利用調整で入所できなかった場合、「保留」の通知が届きます。まずは落ち着いて、次のアクションを確認しましょう。</p>

<h3>すぐにやること</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>二次受付に申し込む</strong><p>一次で辞退や転出があった枠が出ます。希望園の変更・追加も検討しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>空き状況を確認</strong><p>宝塚市は毎月「空き状況」をホームページで公開しています。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>認可外保育施設を探す</strong><p>認可外に預けながら次年度の加点（+3点）を狙う方法も有効です。</p></div>
</div>

<h2>代替の選択肢</h2>
<h3>認可外保育施設・企業主導型保育</h3>
<div class="info-box">
<p>宝塚市内の認可外保育施設や企業主導型保育事業所は、市を通さず各施設に直接申込できます。認可外に預けて就労実績を作り、翌年の申込で+3点の加点を得る戦略が有効です。</p>
</div>

<h3>近隣自治体の認可外も視野に</h3>
<p>宝塚市は西宮市・伊丹市・川西市と隣接しています。通勤経路上の近隣自治体にある認可外保育施設も選択肢になります。</p>

<h3>途中入園を狙う</h3>
<p>4月以降も毎月利用調整が行われます。転出や家庭の事情で空きが出ることもあるため、毎月の締切に合わせて申込を継続しましょう。</p>

<div class="point-box">
<p><strong>希望園の見直し</strong></p>
<p>宝塚駅・逆瀬川駅周辺の人気園だけでなく、中山寺・山本方面や西谷地区の園も候補に入れると入園の可能性が上がります。通勤経路全体で考えましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況や途中入園の手続きは<a href="https://www.city.takarazuka.hyogo.jp/kosodate/hoikuen/" target="_blank" rel="noopener">宝塚市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
];

registerArticles(articles);
