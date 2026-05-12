import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保育園見学ガイド (1) =====
  {
    slug: "nursery-visit-guide",
    citySlug: "chiba",
    title: "千葉市の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "千葉市で保育園見学をする際に確認すべきポイント・質問リスト・見学時期のコツをまとめました。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "保活の実践",
    categoryColor: "green",
    content: `<h2>見学の予約方法</h2>
<p>千葉市の認可保育園は、各園に直接電話して見学日を予約します。6月〜9月が見学のベストシーズンです。園の日常を見られる平日の午前中（9:30〜11:00頃）がおすすめです。</p>

<h2>見学時のチェックポイント</h2>
<table>
<tr><th>項目</th><th>確認内容</th></tr>
<tr><td>園庭・遊具</td><td>広さ・安全性・遊具の種類</td></tr>
<tr><td>給食</td><td>自園調理かどうか・アレルギー対応の有無</td></tr>
<tr><td>保育士の雰囲気</td><td>子どもへの声かけ・表情</td></tr>
<tr><td>持ち物</td><td>布おむつか紙おむつか・お昼寝布団の有無</td></tr>
<tr><td>延長保育</td><td>最長何時まで・料金</td></tr>
<tr><td>病児対応</td><td>発熱時の呼び出し基準（37.5度か38度か）</td></tr>
</table>

<h2>先輩ママが聞いてよかった質問</h2>
<ul>
<li>慣らし保育の期間はどれくらいですか？</li>
<li>保護者会や行事の頻度は？</li>
<li>連絡帳はアプリですか、手書きですか？</li>
<li>土曜保育の利用条件は？</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市は6区（中央区・花見川区・稲毛区・若葉区・緑区・美浜区）にまたがり、区によって園の数や特徴が異なります。通勤経路を考慮し、複数のエリアを見学するのがおすすめです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育施設の一覧は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/akizyoukyou.html" target="_blank" rel="noopener">千葉市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  // ===== 0歳vs1歳入園 (2) =====
  {
    slug: "zero-vs-one-year",
    citySlug: "chiba",
    title: "千葉市で0歳入園と1歳入園どちらが有利？",
    description:
      "千葉市で0歳4月入園と1歳4月入園の競争率の違い、それぞれのメリット・デメリットを比較します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "年齢別入園",
    categoryColor: "purple",
    content: `<h2>0歳と1歳、どちらが入りやすい？</h2>
<p>一般的に、<span class="highlight">0歳4月入園のほうが倍率は低い</span>傾向にあります。理由は定員枠に対して申込者が少ないためです。ただし園によって異なります。</p>

<h2>0歳入園と1歳入園の比較</h2>
<table>
<tr><th>項目</th><th>0歳入園</th><th>1歳入園</th></tr>
<tr><td>競争率</td><td>比較的低い</td><td>高い（持ち上がり後の残り枠のみ）</td></tr>
<tr><td>育休期間</td><td>短い（生後数か月で復帰）</td><td>約1年取得可能</td></tr>
<tr><td>保育料</td><td>やや高い傾向（0歳児クラス）</td><td>0歳より安い傾向</td></tr>
<tr><td>入園月の制約</td><td>誕生月によっては4月に間に合わない</td><td>ほぼ全員が4月申込可能</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市では1歳児クラスの定員は0歳からの持ち上がり分を差し引いた残りが募集枠になります。中央区や美浜区の人気園では1歳の募集が数名のみになることもあるため、0歳入園も選択肢に入れましょう。</p>
</div>

<h2>千葉市の0歳入園の注意点</h2>
<p>4月1日時点で生後57日（産休明け）以上であることが条件です。ただし園によって受入開始月齢が異なり、生後6か月からという園も多いため、事前に確認が必要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入月齢は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/akizyoukyou.html" target="_blank" rel="noopener">千葉市公式サイトの保育施設一覧</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 72,
  },
  // ===== ひとり親の保活 (3) =====
  {
    slug: "single-parent-guide",
    citySlug: "chiba",
    title: "千葉市のひとり親家庭の保活ガイド　加点と支援制度",
    description:
      "千葉市でひとり親家庭が保育園に入園する際の加点・保育料減免・利用できる支援制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "世帯別ガイド",
    categoryColor: "rose",
    content: `<h2>ひとり親家庭の利用調整上の扱い</h2>
<p>千葉市では、ひとり親家庭は<span class="highlight">調整指数で加点</span>を受けられます。利用調整は基本指数と調整指数の合計点で行われ、ひとり親であることは調整指数として加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>具体的な加点数は年度ごとの「利用調整基準表」で確認してください。千葉市こども未来局が毎年発行する「保育所等利用の手引き」に記載されています。</p>
</div>

<h2>保育料の軽減制度</h2>
<p>ひとり親家庭は市民税非課税世帯の場合、保育料が<span class="highlight">無料</span>になります。課税世帯でも所得に応じた軽減があります。</p>

<h2>利用できる支援制度</h2>
<table>
<tr><th>制度名</th><th>内容</th></tr>
<tr><td>児童扶養手当</td><td>所得に応じて月額最大44,140円（2025年度）</td></tr>
<tr><td>ひとり親家庭等医療費助成</td><td>医療費の自己負担を軽減</td></tr>
<tr><td>母子父子寡婦福祉資金</td><td>就学・生活資金等の貸付</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>児童扶養手当の金額は毎年度改定されます。最新額は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/h28goannnai.html" target="_blank" rel="noopener">千葉市こども未来局の公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  // ===== 育休タイミング (4) =====
  {
    slug: "ikukyu-timing",
    citySlug: "chiba",
    title: "千葉市で育休復帰のベストタイミングは？加点との関係",
    description:
      "千葉市で育休復帰のタイミングと入園選考の加点の関係を解説。復帰時期による点数差を比較します。",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>育休復帰時期と加点の関係</h2>
<p>千葉市では、育休からの復帰時期によって調整指数が変わります。入園月に復帰するほうが高い加点を得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市の利用調整基準では、入園月に復帰する場合と翌月以降に復帰する場合で調整指数に差があります。激戦区ではこの差が合否を分けることもあります。具体的な点数は最新の「保育所等利用の手引き」でご確認ください。</p>
</div>

<h2>育休延長の注意点</h2>
<p>育児休業給付金は原則1歳まで、保育園に入れない場合は最長2歳まで延長できます。ただし延長には「保育所等利用不承諾通知書」が必要です。</p>

<h2>千葉市での復帰証明</h2>
<p>入園が内定した場合、入園月（または翌月）に復帰したことを証明する「復職証明書」を勤務先に記載してもらい、提出が必要です。期限内に提出しないと入園が取り消しになる場合があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>復帰に関する手続きの詳細は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/4nyusyoannnai.html" target="_blank" rel="noopener">千葉市「保育所等の利用について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 68,
  },
  // ===== 認可外保育施設の選び方 (5) =====
  {
    slug: "ninkagai-selection",
    citySlug: "chiba",
    title: "千葉市の認可外保育施設の選び方と注意点",
    description:
      "千葉市の認可外保育施設（認可外保育園・企業主導型保育所など）の種類・選び方・認可園との違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "amber",
    content: `<h2>千葉市の認可外保育施設の種類</h2>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可外保育園</td><td>千葉県に届出。独自の保育方針で運営</td></tr>
<tr><td>企業主導型保育所</td><td>企業が従業員向けに設置。地域枠あり</td></tr>
<tr><td>事業所内保育所</td><td>企業内に設置。従業員の子ども優先</td></tr>
<tr><td>ベビーホテル</td><td>夜間・宿泊保育に対応</td></tr>
</table>

<h2>認可外を選ぶ際のチェックポイント</h2>
<ul>
<li>千葉県の「認可外保育施設指導監督基準」を満たしているか</li>
<li>立入調査の結果が公開されているか</li>
<li>保育士の配置基準を満たしているか</li>
<li>避難経路・防災対策が整っているか</li>
<li>保育料と含まれるサービスの範囲</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に通わせている実績は、翌年度の認可園申込時に調整指数の加点対象になる場合があります。認可園の「滑り止め」としても検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>千葉市内の認可外保育施設の一覧は<a href="https://www.city.chiba.jp/kodomomirai/kodomomirai/unei/ninkagai.html" target="_blank" rel="noopener">千葉市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 双子の保活 (6) =====
  {
    slug: "futago-hokatsu",
    citySlug: "chiba",
    title: "千葉市で双子・多胎児の保活を成功させるコツ",
    description:
      "千葉市で双子（多胎児）の保育園入園を目指す際の加点制度・同園希望の扱い・実践的なアドバイスをまとめました。",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "世帯別ガイド",
    categoryColor: "rose",
    content: `<h2>双子の保活で知っておくべきこと</h2>
<p>双子を同じ保育園に入れたい場合、2人分の空き枠が必要になるため、単体よりハードルが上がります。千葉市では多胎児への配慮がありますが、確実に同園になるとは限りません。</p>

<h2>千葉市の多胎児向け配慮</h2>
<ul>
<li>きょうだい同時申込の場合、利用調整で配慮される</li>
<li>同一園を希望した場合、可能な限り同じ園に調整される</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>希望園の記入順が重要です。双子を確実に同じ園に入れたい場合、定員に余裕のある園を第1希望にすることも戦略の一つです。区役所のこども家庭課窓口で相談すると、空き状況を踏まえたアドバイスがもらえます。</p>
</div>

<h2>双子の保活で使える支援</h2>
<table>
<tr><th>制度</th><th>内容</th></tr>
<tr><td>多胎児家庭の保育料軽減</td><td>第2子以降の保育料減額（3歳未満児の場合、第2子半額・第3子以降無料）</td></tr>
<tr><td>ファミリー・サポート・センター</td><td>一時的な送迎支援等</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料の多子軽減の算定方法は年度により変更になる場合があります。最新情報は各区のこども家庭課でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // ===== 保活体験談 (7) =====
  {
    slug: "hoiku-mama-interview",
    citySlug: "chiba",
    title: "千葉市の保活体験談　先輩ママが語るリアルな保活事情",
    description:
      "千葉市で保活を経験した先輩ママの体験談をもとに、実際の保活の流れ・苦労・成功のコツを紹介します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "保活の実践",
    categoryColor: "green",
    content: `<h2>体験談1：中央区で1歳入園を目指したAさん</h2>
<p>「中央区の人気園を第1希望にしていましたが、1歳クラスは募集枠が少なく、フルタイム共働き＋育休復帰でも第1希望は不承諾でした。第3希望の園に内定し、結果的にはとても良い園でした。」</p>

<h3>Aさんからのアドバイス</h3>
<ul>
<li>希望園は必ず5園以上書くこと</li>
<li>見学は夏までに済ませておくと安心</li>
<li>第1希望にこだわりすぎないことが大事</li>
</ul>

<h2>体験談2：美浜区で0歳入園を選んだBさん</h2>
<p>「1歳入園は激戦と聞いて、0歳4月入園を選びました。海浜幕張エリアはマンション開発で子育て世帯が急増していますが、0歳は比較的入りやすかったです。」</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>体験談はあくまで個人の経験です。年度や地域によって状況は異なりますので、最新の情報は必ず区役所でご確認ください。</p>
</div>

<h2>共通する成功のコツ</h2>
<ul>
<li>早めの情報収集と見学</li>
<li>希望園を多めに書く</li>
<li>区役所のこども家庭課窓口で相談する</li>
<li>認可外も並行して検討する</li>
</ul>`,
    publishedAt: "2026-04-07",
    popularity: 62,
  },
  // ===== 待機児童データ (8) =====
  {
    slug: "waiting-child-data",
    citySlug: "chiba",
    title: "千葉市の待機児童数の推移と最新データ",
    description:
      "千葉市の待機児童数の推移・隠れ待機児童の実態・区別の傾向を公式データをもとに解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "データで見る保活",
    categoryColor: "blue",
    content: `<h2>千葉市の待機児童数の推移</h2>
<p>千葉市は国の定義による待機児童数を毎年4月1日時点で公表しています。近年は待機児童ゼロを達成する年もありますが、「隠れ待機児童（特定の園のみ希望等で待機児童にカウントされない児童）」は一定数います。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>待機児童数は毎年度の公式発表で変動します。以下は傾向を示すものであり、最新の正確な数値は千葉市の公式発表をご確認ください。</p>
</div>

<h2>区別の傾向</h2>
<p>千葉市6区のうち、<span class="highlight">中央区・美浜区</span>はJR・京葉線沿線でマンション開発が進み、保育需要が高い傾向があります。一方、若葉区や緑区の一部地域は比較的入りやすい傾向です。</p>

<h2>「隠れ待機児童」とは</h2>
<p>以下のケースは国の待機児童数にカウントされません。</p>
<ul>
<li>特定の園のみ希望して入れなかった場合</li>
<li>育休を延長した場合</li>
<li>認可外保育施設に通っている場合</li>
<li>求職活動を休止した場合</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/4nyusyoannnai.html" target="_blank" rel="noopener">千葉市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },
  // ===== 小規模保育 (9) =====
  {
    slug: "small-nursery-guide",
    citySlug: "chiba",
    title: "千葉市の小規模保育事業所ガイド　0〜2歳児の選択肢",
    description:
      "千葉市の小規模保育事業所（定員6〜19名）の特徴・メリット・卒園後の連携施設について解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "amber",
    content: `<h2>小規模保育事業所とは</h2>
<p>定員6〜19名の少人数で、0歳〜2歳児を対象とした認可保育施設です。千葉市内にも多数設置されています。</p>

<h2>小規模保育のメリット・デメリット</h2>
<table>
<tr><th>メリット</th><th>デメリット</th></tr>
<tr><td>少人数で手厚い保育</td><td>3歳以降は別の園に移る必要がある</td></tr>
<tr><td>認可園より入りやすい傾向</td><td>園庭がない場合がある</td></tr>
<tr><td>家庭的な雰囲気</td><td>行事が少ない場合がある</td></tr>
</table>

<h2>卒園後の連携施設</h2>
<p>小規模保育事業所には「連携施設」が設定されている場合があります。連携施設がある場合、3歳以降の受け皿が確保されるため安心です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市では小規模保育事業所の卒園児に対して、3歳児の認可園申込時に調整指数が加算されます。「小規模→認可園」のルートも有力な保活戦略です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育事業所の一覧・連携施設は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/akizyoukyou.html" target="_blank" rel="noopener">千葉市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 58,
  },
  // ===== 第2子の保活 (10) =====
  {
    slug: "secondchild-hokatsu",
    citySlug: "chiba",
    title: "千葉市で第2子の保活　きょうだい加点を最大限活かす方法",
    description:
      "千葉市で第2子の保育園入園を有利に進めるための、きょうだい加点の仕組みと戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "世帯別ガイド",
    categoryColor: "rose",
    content: `<h2>きょうだい加点の仕組み</h2>
<p>千葉市では、きょうだいが既に認可保育園に在園している場合、調整指数で加点を受けられます。これは入園に大きく有利に働きます。</p>

<h2>きょうだい同園を目指す場合</h2>
<p>上の子と同じ園を第1希望にすると、きょうだい加点に加えて同園希望の配慮も受けられます。きょうだい加点があると、フルタイム共働き世帯はかなり有利な状況で選考に臨めます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい加点は「申込時点で在園していること」が条件です。上の子が卒園するタイミングと下の子の入園タイミングに注意しましょう。具体的な加点数は最新の「保育所等利用の手引き」でご確認ください。</p>
</div>

<h2>きょうだい別園になった場合</h2>
<p>万が一別園になった場合でも、翌年度の転園申込でもきょうだい加点は有効です。送迎の負担は増えますが、翌年度に同園を目指す方法もあります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>きょうだい加点の詳細は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/4nyusyoannnai.html" target="_blank" rel="noopener">千葉市「保育所等の利用について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 73,
  },
  // ===== 自営業の点数 (11) =====
  {
    slug: "self-employed-score",
    citySlug: "chiba",
    title: "千葉市で自営業・フリーランスの保活　点数と必要書類",
    description:
      "千葉市で自営業・フリーランスが保育園を申し込む際の点数計算・必要書類・注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスの基本指数</h2>
<p>千葉市では、自営業・フリーランスも会社員と同じ基準で基本指数が計算されます。就労時間に応じた点数が付与されます。</p>

<h2>必要書類</h2>
<table>
<tr><th>書類</th><th>内容</th></tr>
<tr><td>就労状況申告書</td><td>就労時間・場所・内容を自己申告</td></tr>
<tr><td>確定申告書の写し</td><td>直近の確定申告書（収受印またはe-Tax受付通知付き）</td></tr>
<tr><td>開業届の写し</td><td>税務署に提出した開業届</td></tr>
<tr><td>業務内容がわかる資料</td><td>ホームページ・名刺・契約書等</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>自営業の場合、会社員の「就労証明書」とは異なり、就労時間の証明が自己申告になります。確定申告書や業務実績で就労の実態を裏付けることが重要です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>開業して間もない場合は確定申告書がないこともあります。その場合は開業届と業務契約書・受注実績等で代替できるか、各区のこども家庭課窓口で事前に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 56,
  },
  // ===== 内職の点数 (12) =====
  {
    slug: "naishoku-score",
    citySlug: "chiba",
    title: "千葉市で内職・在宅ワークの場合の保育園点数は？",
    description:
      "千葉市で内職や在宅ワークをしている場合の保育園入園の点数・必要書類・注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>在宅ワーク・内職の点数</h2>
<p>千葉市では、在宅ワーク・内職も「居宅外就労」か「居宅内就労」かで区分されます。千葉市の利用調整基準では居宅内就労と居宅外就労の基本指数は同じです。就労時間に基づいて点数が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市は居宅内・居宅外で基本指数に差をつけていません。ただし、就労時間の証明方法が異なるため、必要書類を事前に確認しましょう。</p>
</div>

<h2>在宅ワークの場合の必要書類</h2>
<ul>
<li>就労証明書（雇用主がいる場合）または就労状況申告書（フリーランス）</li>
<li>業務委託契約書や受注実績がわかる書類</li>
<li>自営業の場合は確定申告書の写し</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労時間が少ない場合は基本指数が下がります。就労時間の計算方法は各区のこども家庭課でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  // ===== 求職中の保活 (13) =====
  {
    slug: "kyushoku-hokatsu",
    citySlug: "chiba",
    title: "千葉市で求職中でも保育園に入れる？点数と対策",
    description:
      "千葉市で求職中（これから働く予定）の場合の保育園申込の点数・入園後の就労開始期限を解説します。",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>求職中の基本指数</h2>
<p>千葉市では、求職中（求職活動中）の場合も保育園の申込が可能です。ただし、基本指数は就労中と比べて<span class="highlight">大幅に低く</span>なります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職中の基本指数は就労中と比べて低く設定されています。具体的な点数は年度によって変わる場合があるため、最新の「保育所等利用の手引き」で確認してください。</p>
</div>

<h2>入園後の就労開始期限</h2>
<p>求職中で入園が決まった場合、入園後<span class="highlight">90日以内</span>に就労を開始し、就労証明書を提出する必要があります。期限内に就労を開始できない場合、退園になる可能性があります。</p>

<h2>求職中から点数を上げる方法</h2>
<ul>
<li>申込前にパートでもよいので就労を開始する</li>
<li>認可外保育施設を利用して就職活動をする</li>
<li>ハローワークの求職活動証明を取得する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>まずは短時間のパートでも就労実績を作り、「就労中」として申し込むほうが点数上は有利です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  // ===== 転職タイミング (14) =====
  {
    slug: "tenshoku-timing",
    citySlug: "chiba",
    title: "千葉市で保活中に転職しても大丈夫？点数への影響",
    description:
      "千葉市で保育園の申込前後に転職した場合の点数への影響・必要な手続き・注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>転職と点数の関係</h2>
<p>転職しても就労時間が変わらなければ、基本指数に影響はありません。就労時間に基づいて同じ点数が付与されます。</p>

<h2>転職時に必要な手続き</h2>
<table>
<tr><th>タイミング</th><th>必要な対応</th></tr>
<tr><td>申込前に転職</td><td>新しい勤務先の就労証明書を提出</td></tr>
<tr><td>申込後〜内定前に転職</td><td>速やかに新しい就労証明書をこども家庭課に提出</td></tr>
<tr><td>内定後〜入園後に転職</td><td>変更届と新しい就労証明書を提出</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>転職により一時的に無職期間が生じると、その期間は「求職中」扱いになり、基本指数が下がります。保活中の転職は、退職と入社のタイミングを慎重に調整しましょう。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休中に転職する場合、「育休復帰加点」が適用されなくなる可能性があります。転職を検討している場合は、入園が決まってからのほうが安全です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // ===== 2歳入園 (15) =====
  {
    slug: "age2-nyuen",
    citySlug: "chiba",
    title: "千葉市で2歳児クラスに入園するには？空き状況と対策",
    description:
      "千葉市の2歳児クラスの入園事情・空き状況の傾向・小規模保育からの転園について解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "年齢別入園",
    categoryColor: "purple",
    content: `<h2>2歳児クラスの入園事情</h2>
<p>2歳児クラスは、0歳・1歳からの持ち上がりがあるため、新規募集枠が少ない傾向です。ただし小規模保育事業所の卒園児が3歳で抜けるため、園によっては枠がある場合もあります。</p>

<h2>2歳児クラスに空きが出やすいケース</h2>
<ul>
<li>転勤・引っ越しによる退園</li>
<li>幼稚園への転園（満3歳児入園）</li>
<li>新規開園や定員増</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>年度途中の入園も選択肢に入れましょう。4月以外にも空きが出ることがあり、毎月の空き状況は各区のこども家庭課で確認できます。</p>
</div>

<h2>小規模保育からの転園</h2>
<p>小規模保育事業所（0〜2歳）を卒園した子どもは、3歳児の認可園申込で加点がつきます。「2歳まで小規模→3歳で認可園」は千葉市でも有力なルートです。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/4nyusyoannnai.html" target="_blank" rel="noopener">千葉市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 53,
  },
  // ===== 3歳以降の移行 (16) =====
  {
    slug: "age3-ikou",
    citySlug: "chiba",
    title: "千葉市で3歳からの保育園・幼稚園　移行のポイント",
    description:
      "千葉市で3歳以降の保育園継続・幼稚園への転園・認定こども園への移行について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "年齢別入園",
    categoryColor: "purple",
    content: `<h2>3歳の壁とは？</h2>
<p>小規模保育事業所（0〜2歳）を利用している場合、3歳児クラスから別の施設に移る必要があります。これを「3歳の壁」と呼びます。</p>

<h2>3歳以降の選択肢</h2>
<table>
<tr><th>施設</th><th>特徴</th></tr>
<tr><td>認可保育園（3歳児クラス）</td><td>保育時間が長い。就労要件あり</td></tr>
<tr><td>認定こども園</td><td>教育と保育を一体的に提供</td></tr>
<tr><td>幼稚園（預かり保育あり）</td><td>教育中心。預かり保育で18時頃まで対応</td></tr>
</table>

<h2>3〜5歳の保育料無償化</h2>
<p>2019年10月から、3〜5歳児の保育料は<span class="highlight">無償</span>です（幼稚園は月額25,700円まで）。ただし給食費（副食費）は実費負担です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市では、幼稚園の預かり保育も充実しつつあります。保育園にこだわらず、認定こども園や預かり保育付き幼稚園も選択肢に入れると視野が広がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>無償化の詳細は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/shien/musyouka-index.html" target="_blank" rel="noopener">千葉市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 0歳児入園の詳細 (17) =====
  {
    slug: "nyuyoji-age0",
    citySlug: "chiba",
    title: "千葉市の0歳児入園ガイド　受入月齢と園選びのコツ",
    description:
      "千葉市で0歳児クラスに入園する際の受入月齢・必要な準備・園選びのポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "年齢別入園",
    categoryColor: "purple",
    content: `<h2>0歳児の受入月齢</h2>
<p>千葉市の認可保育園では、園によって受入開始月齢が異なります。産休明け（生後57日）から受け入れる園もあれば、生後6か月からの園もあります。</p>

<h2>0歳児入園の準備</h2>
<table>
<tr><th>準備項目</th><th>内容</th></tr>
<tr><td>園の受入月齢を確認</td><td>生後何か月から受入可能か、園ごとに確認</td></tr>
<tr><td>慣らし保育の期間</td><td>1〜2週間が一般的。勤務先と調整</td></tr>
<tr><td>母乳・ミルクの対応</td><td>冷凍母乳の受入可否を確認</td></tr>
<tr><td>持ち物リスト</td><td>着替え・おむつ・哺乳瓶など園指定のもの</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0歳児クラスは保育士の配置基準が3:1（子ども3人に保育士1人）と手厚い反面、定員が少ない園が多いです。見学時に0歳児の保育の様子を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入月齢は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/akizyoukyou.html" target="_blank" rel="noopener">千葉市公式サイトの保育施設一覧</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 57,
  },
  // ===== 認定こども園 (18) =====
  {
    slug: "nintei-kodomoen",
    citySlug: "chiba",
    title: "千葉市の認定こども園ガイド　保育園との違いと選び方",
    description:
      "千葉市の認定こども園の種類・保育園との違い・入園手続き・メリット・デメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "amber",
    content: `<h2>認定こども園とは</h2>
<p>教育と保育を一体的に行う施設です。幼稚園と保育園の機能を併せ持ち、保護者の就労の有無にかかわらず利用できます。</p>

<h2>認定こども園と保育園の違い</h2>
<table>
<tr><th>項目</th><th>認定こども園（2号）</th><th>認可保育園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>保育時間</td><td>最大11時間</td><td>最大11時間</td></tr>
<tr><td>教育カリキュラム</td><td>あり（幼稚園教育要領に準拠）</td><td>保育所保育指針に準拠</td></tr>
<tr><td>申込先</td><td>各区こども家庭課（2号・3号）</td><td>各区こども家庭課</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認定こども園の2号認定（保育を必要とする3〜5歳）・3号認定（保育を必要とする0〜2歳）は、認可保育園と同じ利用調整で選考されます。点数の計算方法も同じです。</p>
</div>

<h2>千葉市の認定こども園</h2>
<p>千葉市には複数の認定こども園があり、幼保連携型・幼稚園型などの類型があります。それぞれ特色が異なるため、見学して比較するのがおすすめです。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認定こども園の一覧は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/akizyoukyou.html" target="_blank" rel="noopener">千葉市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  // ===== 企業主導型保育 (19) =====
  {
    slug: "kigyou-shudogata",
    citySlug: "chiba",
    title: "千葉市の企業主導型保育所とは？利用方法とメリット",
    description:
      "千葉市の企業主導型保育所の仕組み・地域枠の利用方法・認可園との違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "amber",
    content: `<h2>企業主導型保育所とは</h2>
<p>企業が従業員の子どもを預けるために設置する保育施設です。「地域枠」を設けている場合、従業員以外の方も利用できます。</p>

<h2>企業主導型保育所のメリット</h2>
<ul>
<li>利用調整（点数による選考）が不要で、園と直接契約</li>
<li>認可園と同水準の保育料設定の園が多い</li>
<li>認可園に入れなかった場合の選択肢になる</li>
<li>海浜幕張エリアなどオフィス街に多く、通勤途中で預けやすい</li>
</ul>

<h2>利用の注意点</h2>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>申込先</td><td>園に直接（区役所経由ではない）</td></tr>
<tr><td>保育料</td><td>園ごとに設定（認可園と同程度が多い）</td></tr>
<tr><td>地域枠</td><td>定員の50%まで</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>企業主導型保育所に通った実績があると、翌年度の認可園申込時に加点がつく場合があります。認可園の「つなぎ」として利用する方もいます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>企業主導型保育所の検索は<a href="https://www.kigyounaihoiku.jp/" target="_blank" rel="noopener">企業主導型保育事業ポータル</a>で可能です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 47,
  },
  // ===== 夜間保育 (20) =====
  {
    slug: "yakan-hoiku",
    citySlug: "chiba",
    title: "千葉市の夜間保育・延長保育ガイド",
    description:
      "千葉市で夜間勤務やシフト勤務の方が利用できる夜間保育・延長保育の選択肢と利用方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "amber",
    content: `<h2>延長保育について</h2>
<p>千葉市の認可保育園では、通常の保育時間（7:00〜18:00等）に加えて、延長保育を実施している園があります。延長保育は最長19:00〜20:00頃までの園が多いです。</p>

<h2>夜間保育について</h2>
<p>夜間専門の認可保育園は全国的に数が少なく、千葉市でも限られています。夜間勤務の方は、以下の選択肢を検討しましょう。</p>

<ul>
<li>延長保育が長い認可園を選ぶ</li>
<li>認可外保育施設（ベビーホテル等）を利用する</li>
<li>ファミリー・サポート・センターを活用する</li>
</ul>

<h2>延長保育の料金</h2>
<p>延長保育の料金は園によって異なりますが、月額数千円〜1万円程度が目安です。スポット利用（1回数百円）ができる園もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>延長保育の実施時間・料金は園ごとに異なります。見学時に必ず確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>延長保育の実施園は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/akizyoukyou.html" target="_blank" rel="noopener">千葉市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  // ===== 無償化制度 (21) =====
  {
    slug: "mushoka-seido",
    citySlug: "chiba",
    title: "千葉市の幼児教育・保育無償化　対象と自己負担額",
    description:
      "千葉市の幼児教育・保育無償化制度の対象施設・対象年齢・自己負担として残る費用を整理しました。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "teal",
    content: `<h2>無償化の対象</h2>
<table>
<tr><th>対象</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児（認可保育園・認定こども園）</td><td>保育料が無料</td></tr>
<tr><td>0〜2歳児（住民税非課税世帯）</td><td>保育料が無料</td></tr>
<tr><td>幼稚園</td><td>月額25,700円まで無料</td></tr>
<tr><td>認可外保育施設</td><td>月額37,000円まで（3〜5歳）、42,000円まで（0〜2歳・非課税世帯）</td></tr>
</table>

<h2>無償化でも自己負担が残る費用</h2>
<ul>
<li><strong>給食費（副食費）</strong>：月額4,500円前後が目安</li>
<li><strong>延長保育料</strong>：月額数千円</li>
<li><strong>教材費・行事費</strong>：園による</li>
<li><strong>おむつ処理費</strong>：園による</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>年収360万円未満相当の世帯や第3子以降は、副食費も免除される場合があります。詳細は各区のこども家庭課でご確認ください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>無償化の詳細は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/shien/musyouka-index.html" target="_blank" rel="noopener">千葉市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  // ===== 食費の実費負担 (22) =====
  {
    slug: "shokuhi-jippi",
    citySlug: "chiba",
    title: "千葉市の保育園の給食費（副食費）はいくら？免除条件も解説",
    description:
      "千葉市の保育園の給食費（副食費）の目安金額・免除対象者・支払い方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "teal",
    content: `<h2>副食費とは</h2>
<p>3〜5歳児の保育料は無償化されましたが、給食のうち副食（おかず・おやつ）の費用は保護者負担です。主食（ごはん）は園によって持参か園提供かが異なります。</p>

<h2>副食費の目安</h2>
<p>千葉市の認可保育園の副食費は、<span class="highlight">月額4,500円前後</span>が一般的です。園によって多少異なります。</p>

<h2>副食費が免除される場合</h2>
<table>
<tr><th>対象</th><th>条件</th></tr>
<tr><td>年収360万円未満相当の世帯</td><td>市民税所得割額が一定以下</td></tr>
<tr><td>第3子以降</td><td>小学校就学前の子が3人以上いる世帯の第3子以降</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>副食費の免除は自動適用される場合と申請が必要な場合があります。該当する可能性がある方は、入園時に各区のこども家庭課で確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  // ===== 保育料の計算 (23) =====
  {
    slug: "hoikuryo-keisan",
    citySlug: "chiba",
    title: "千葉市の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "千葉市の認可保育園の保育料を年収・子ども数別に詳しく解説。市民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "teal",
    content: `<h2>保育料の決まり方</h2>
<p>千葉市の保育料は、<span class="highlight">世帯の市民税所得割額</span>に基づいて決まります。毎年9月に前年度の税額から当年度の税額に切り替わります。</p>

<h2>保育料の目安</h2>
<p>千葉市は国の基準額よりも独自に軽減を行っています。世帯年収によって大きく異なりますが、0〜2歳児の場合は月額0円〜約5万円台の範囲です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料の具体的な金額は毎年度改定される場合があります。最新の保育料表は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/musyouka-index.html" target="_blank" rel="noopener">千葉市公式サイト</a>でご確認ください。</p>
</div>

<h2>多子軽減制度</h2>
<table>
<tr><th>対象</th><th>軽減内容</th></tr>
<tr><td>第2子</td><td>保育料半額</td></tr>
<tr><td>第3子以降</td><td>保育料無料</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>多子軽減の算定対象は、小学校就学前の子どもをカウントする方法が基本です。ただし年収360万円未満相当の世帯は年齢制限なく上の子をカウントできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  // ===== 税金控除 (24) =====
  {
    slug: "zeikin-koujo",
    citySlug: "chiba",
    title: "保育料と税金の関係　千葉市で使える控除・助成制度",
    description:
      "千葉市で保育園を利用する世帯が活用できる税金控除・助成制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "teal",
    content: `<h2>保育料に関連する税金控除</h2>
<p>認可保育園の保育料自体は所得控除の対象にはなりません。ただし、以下の制度を活用することで世帯の税負担を軽減し、結果的に保育料を下げることができます。</p>

<h2>活用できる制度</h2>
<table>
<tr><th>制度</th><th>内容</th></tr>
<tr><td>配偶者控除・配偶者特別控除</td><td>配偶者の収入に応じた所得控除</td></tr>
<tr><td>医療費控除</td><td>年間医療費が10万円を超えた場合の所得控除</td></tr>
<tr><td>iDeCo（個人型確定拠出年金）</td><td>掛金が全額所得控除</td></tr>
<tr><td>ふるさと納税</td><td>住民税の控除（保育料算定に影響しない点に注意）</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ふるさと納税は住民税額自体は減りますが、保育料の算定に使われる「所得割額」からは控除されないため、保育料の軽減にはつながりません。iDeCoは所得控除のため保育料の軽減に有効です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料を下げたい場合はiDeCoや医療費控除など「所得控除」に該当する制度が有効です。税理士や各区の窓口で相談するのがおすすめです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  // ===== 就労証明書 (25) =====
  {
    slug: "shurou-shoumeisho",
    citySlug: "chiba",
    title: "千葉市の就労証明書 記入例【令和8年度版】書き方と注意点まとめ",
    description:
      "千葉市の保育園申込みに必要な就労証明書の記入例を徹底解説。月間就労時間・日数の正しい書き方、よくある記入ミスTop5と対策チェックリスト、様式ダウンロード先まで網羅。令和8年度申込対応。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "書類・手続き",
    categoryColor: "green",
    content: `<h2>就労証明書とは</h2>
<p>保育園の入園申込に必要な書類で、保護者の就労状況（勤務先・就労時間・勤務日数など）を勤務先が証明するものです。</p>

<h2>記入のポイント</h2>
<table>
<tr><th>項目</th><th>注意点</th></tr>
<tr><td>就労時間</td><td>月の就労時間を正確に。就労時間によって基本指数が変わる</td></tr>
<tr><td>勤務日数</td><td>週の勤務日数を記入</td></tr>
<tr><td>雇用期間</td><td>雇用開始日と契約期間を正確に</td></tr>
<tr><td>証明日・社印</td><td>勤務先の社印と証明日の記載が必須</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書は<span class="highlight">勤務先に記入してもらう書類</span>です。自分で記入しないでください。勤務先の人事・総務に依頼し、2〜3週間の余裕を持って依頼しましょう。</p>
</div>

<h2>よくある間違い</h2>
<ul>
<li>証明日が古すぎる（申込日に近い日付が望ましい）</li>
<li>社印の押印漏れ</li>
<li>就労時間の記載が曖昧（「約○時間」ではなく具体的に）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/4nyusyoannnai.html" target="_blank" rel="noopener">千葉市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 63,
  },
  // ===== 申請書類一覧 (26) =====
  {
    slug: "shinsei-shorui-list",
    citySlug: "chiba",
    title: "千葉市の保育園申込に必要な書類一覧　チェックリスト付き",
    description:
      "千葉市の認可保育園申込に必要な書類を一覧にまとめました。チェックリストとして活用してください。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "書類・手続き",
    categoryColor: "green",
    content: `<h2>全員が必要な書類</h2>
<ul>
<li>教育・保育給付認定申請書兼利用申込書</li>
<li>就労証明書（父・母それぞれ）</li>
<li>マイナンバーがわかる書類</li>
<li>本人確認書類</li>
</ul>

<h2>該当する方のみ必要な書類</h2>
<table>
<tr><th>状況</th><th>必要書類</th></tr>
<tr><td>自営業</td><td>就労状況申告書、確定申告書の写し</td></tr>
<tr><td>求職中</td><td>求職活動状況申告書</td></tr>
<tr><td>妊娠・出産</td><td>母子手帳の写し</td></tr>
<tr><td>疾病・障害</td><td>診断書または障害者手帳の写し</td></tr>
<tr><td>介護</td><td>介護が必要な方の診断書等</td></tr>
<tr><td>ひとり親</td><td>児童扶養手当証書の写し等</td></tr>
<tr><td>転入予定</td><td>転入先の賃貸契約書等</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類に不備があると受付できない場合があります。提出前に各区のこども家庭課で事前チェックを受けるのがおすすめです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申請書類の様式は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/4nyusyoannnai.html" target="_blank" rel="noopener">千葉市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 68,
  },
  // ===== 2次申請の流れ (27) =====
  {
    slug: "niji-shinsei-flow",
    citySlug: "chiba",
    title: "千葉市の2次利用調整（2次募集）の流れと対策",
    description:
      "千葉市の2次利用調整のスケジュール・申込方法・1次で不承諾になった場合の対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2次利用調整とは</h2>
<p>1次利用調整で定員に達しなかった園の空き枠について行われる選考です。1次で不承諾になった方は、2次の申込が可能です。</p>

<h2>2次利用調整のスケジュール（目安）</h2>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>2次申込受付</td><td>1月下旬〜2月上旬頃</td></tr>
<tr><td>結果通知</td><td>3月上旬〜中旬頃</td></tr>
</table>

<h2>2次で入園するためのポイント</h2>
<ul>
<li>1次の結果を受けて、空きのある園に希望を変更する</li>
<li>各区のこども家庭課に連絡して最新の空き状況を確認する</li>
<li>認可外保育施設も並行して検討する</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2次の空き枠は非常に少ないため、2次頼みの保活は危険です。1次で十分な数の希望園を書いておくことが最も重要です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2次でも不承諾だった場合は、認可外保育施設やファミリー・サポート・センターの利用、育休延長を検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 58,
  },
  // ===== 転居と保活 (28) =====
  {
    slug: "tenkyo-hokatsu",
    citySlug: "chiba",
    title: "千葉市への転入・市内転居時の保育園手続きガイド",
    description:
      "千葉市に転入する場合や市内で転居する場合の保育園の申込方法・転園手続き・注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "書類・手続き",
    categoryColor: "green",
    content: `<h2>他市から千葉市に転入する場合</h2>
<p>転入前でも千葉市の保育園に申込が可能です。転入先の区のこども家庭課に相談しましょう。</p>

<h3>必要な手続き</h3>
<ul>
<li>転入先の住所がわかる書類（賃貸契約書・売買契約書等）</li>
<li>現住所地の市区町村で発行された課税証明書</li>
<li>通常の申込書類一式</li>
</ul>

<h2>市内で転居する場合（区をまたぐ転居）</h2>
<p>既に認可保育園に通っている場合、転居先が通園可能な範囲であれば、そのまま通い続けることもできます。転園を希望する場合は、転居先の区のこども家庭課で転園申込を行います。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市は東京のベッドタウンとしても人気で、転入者が多い自治体です。転入時期によっては、4月入園の1次申込に間に合わない場合があります。転入予定がわかった段階で、早めに各区のこども家庭課に連絡するのが重要です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>転園の場合、転園先の園に空きがないと転園できません。空き状況は各区のこども家庭課で確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // ===== 教育と保育の違い (29) =====
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "chiba",
    title: "保育園と幼稚園の違いは？千葉市での選び方",
    description:
      "千葉市における保育園と幼稚園の違い・それぞれのメリット・認定こども園という第3の選択肢を解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "amber",
    content: `<h2>保育園と幼稚園の基本的な違い</h2>
<table>
<tr><th>項目</th><th>保育園</th><th>幼稚園</th></tr>
<tr><td>管轄</td><td>厚生労働省（こども家庭庁）</td><td>文部科学省</td></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>3〜5歳</td></tr>
<tr><td>保育時間</td><td>7:00〜18:00頃（延長あり）</td><td>9:00〜14:00頃（預かり保育あり）</td></tr>
<tr><td>入園条件</td><td>保育の必要性の認定が必要</td><td>原則なし</td></tr>
<tr><td>給食</td><td>義務</td><td>任意（園による）</td></tr>
</table>

<h2>共働き世帯はどちらを選ぶ？</h2>
<p>フルタイム共働きの場合は保育園が一般的ですが、千葉市では預かり保育（17:00〜18:00頃まで）を実施する幼稚園も増えています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「教育も保育も両方ほしい」という方には認定こども園がおすすめです。千葉市内にも複数あり、保育園と同じ利用調整で入園できます（2号・3号認定）。</p>
</div>

<h2>幼稚園の預かり保育の無償化</h2>
<p>保育の必要性の認定を受ければ、幼稚園の預かり保育も月額11,300円まで無償化の対象になります。</p>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 保活カレンダー (30) =====
  {
    slug: "hokatsu-calendar",
    citySlug: "chiba",
    title: "千葉市の保活カレンダー　月別やることリスト",
    description:
      "千葉市で令和8年度4月入園を目指す方向けの、月別保活カレンダー・やることリストです。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>月別保活カレンダー</h2>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>4月〜5月</td><td>情報収集開始。千葉市の保育施設の種類やエリアの特徴を調べる</td></tr>
<tr><td>6月〜8月</td><td>保育園見学。5園以上は見学しておくと安心</td></tr>
<tr><td>9月〜10月</td><td>「保育所等利用の手引き」を入手。書類準備開始</td></tr>
<tr><td>10月</td><td>就労証明書を勤務先に依頼。申込書類を記入</td></tr>
<tr><td>11月頃</td><td>1次利用調整の申込書類を各区こども家庭課に提出</td></tr>
<tr><td>12月〜1月</td><td>結果を待つ。認可外の見学・申込も並行</td></tr>
<tr><td>1月〜2月</td><td>1次結果通知。内定の場合は入園準備。不承諾の場合は2次へ</td></tr>
<tr><td>3月</td><td>入園準備（持ち物の購入・慣らし保育の調整）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>特に重要なのは<span class="highlight">6月〜8月の園見学</span>と<span class="highlight">10月の就労証明書依頼</span>です。この2つを早めに済ませておくと、余裕を持って申込できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込スケジュールの詳細は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/4nyusyoannnai.html" target="_blank" rel="noopener">千葉市「保育所等の利用について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 72,
  },
  // ===== 点数の相場感 (31) =====
  {
    slug: "souba-tensuu",
    citySlug: "chiba",
    title: "千葉市の保育園入園に必要な点数の相場感",
    description:
      "千葉市の保育園入園選考で実際にどのくらいの点数があれば安心なのか、世帯パターン別に解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>千葉市の利用調整の仕組み</h2>
<p>千葉市の利用調整は「基本指数」と「調整指数」の合計点で行われます。基本指数は保護者それぞれの保育を必要とする理由に基づき、調整指数は世帯の状況に応じて加減されます。</p>

<h2>一般的なパターン</h2>
<table>
<tr><th>世帯の状況</th><th>入園の可能性</th></tr>
<tr><td>フルタイム共働き＋きょうだい加点＋育休復帰</td><td>ほぼ確実に入園可能</td></tr>
<tr><td>フルタイム共働き＋育休復帰</td><td>多くの園で入園可能</td></tr>
<tr><td>フルタイム共働き（加点なし）</td><td>園を選べば入園可能</td></tr>
<tr><td>片方パート（短時間）</td><td>人気園は厳しい</td></tr>
<tr><td>求職中</td><td>認可園は厳しい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市の具体的な点数体系は最新の「保育所等利用の手引き」に記載されています。年度ごとに変更される場合があるため、必ず最新版を確認してください。</p>
</div>

<h2>同点の場合の優先順位</h2>
<p>同点の場合は、千葉市独自の優先基準（所得が低い世帯を優先など）で順位が決まります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準の詳細は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/4nyusyoannnai.html" target="_blank" rel="noopener">千葉市「保育所等の利用について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 78,
  },
  // ===== 区別の倍率 (32) =====
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "chiba",
    title: "千葉市の区別・保育園入園の難易度と傾向",
    description:
      "千葉市6区（中央・花見川・稲毛・若葉・緑・美浜）の保育園入園の難易度傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "データで見る保活",
    categoryColor: "blue",
    content: `<h2>千葉市6区の傾向</h2>
<table>
<tr><th>区</th><th>入園難易度（目安）</th><th>特徴</th></tr>
<tr><td>中央区</td><td>高い</td><td>千葉駅周辺。商業・オフィス街に近く需要が高い</td></tr>
<tr><td>美浜区</td><td>高い</td><td>海浜幕張エリアのマンション開発で子育て世帯が増加</td></tr>
<tr><td>稲毛区</td><td>やや高い</td><td>住宅地が多く子育て世帯に人気</td></tr>
<tr><td>花見川区</td><td>普通</td><td>住宅地中心。園の数は一定数ある</td></tr>
<tr><td>緑区</td><td>やや低い</td><td>おゆみ野エリアは需要あり。それ以外は比較的入りやすい</td></tr>
<tr><td>若葉区</td><td>低い</td><td>郊外エリアで比較的入りやすい</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記は一般的な傾向です。同じ区内でも園によって大きく異なります。また年度や年齢クラスによっても変動します。最新の空き状況は各区のこども家庭課で確認してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>通勤経路上の別の区の園も選択肢に入れると、選べる園の幅が広がります。特にJR総武線・京成線沿線は区をまたいで通園しやすいエリアです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },
  // ===== 育休延長リスク (33) =====
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "chiba",
    title: "千葉市で育休延長する場合のリスクと注意点",
    description:
      "千葉市で保育園に入れず育休を延長する場合のリスク・手続き・翌年度の保活への影響を解説します。",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>育休延長の仕組み</h2>
<p>育児休業は原則として子が1歳まで。保育園に入れない場合は1歳6か月まで、それでも入れない場合は<span class="highlight">最長2歳まで</span>延長できます。</p>

<h2>延長に必要な書類</h2>
<p>勤務先に「保育所等利用不承諾通知書」を提出する必要があります。この通知書は、入園申込をして不承諾になった場合に千葉市から発行されます。</p>

<h2>育休延長のリスク</h2>
<ul>
<li>翌年度は1歳児（または2歳児）クラスに申込→募集枠が少ない</li>
<li>育休延長期間が終了（2歳）しても入園できない場合、退職リスクがある</li>
<li>育児休業給付金が減額される</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育児休業給付金の支給率は制度変更の可能性があります。最新情報はハローワークでご確認ください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休延長を見据える場合でも、0歳の4月入園を申し込んでおくことを強くおすすめします。不承諾通知書をもらうためにも申込が必要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 復職準備 (34) =====
  {
    slug: "fukushoku-junbi",
    citySlug: "chiba",
    title: "千葉市で保育園内定後の復職準備チェックリスト",
    description:
      "千葉市で保育園の内定が出た後にやるべきこと・復職準備のチェックリスト・慣らし保育の目安をまとめました。",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>内定後にやること</h2>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>内定通知後すぐ</td><td>勤務先に復帰日を連絡</td></tr>
<tr><td>2月〜3月</td><td>入園説明会・面談に参加</td></tr>
<tr><td>3月</td><td>入園準備品の購入（園指定のもの）</td></tr>
<tr><td>4月上旬</td><td>慣らし保育開始</td></tr>
<tr><td>4月中旬〜</td><td>復職</td></tr>
</table>

<h2>慣らし保育の目安</h2>
<p>一般的に<span class="highlight">1〜2週間</span>程度。初日は1〜2時間から始め、徐々に時間を延ばしていきます。子どもの様子に合わせて園と相談しながら進めます。</p>

<h2>復職前チェックリスト</h2>
<ul>
<li>通勤ルート・保育園への送迎ルートの確認</li>
<li>病児保育・病後児保育の登録</li>
<li>ファミリー・サポート・センターへの登録</li>
<li>緊急時のお迎え体制の確認（祖父母等）</li>
<li>復職証明書の準備</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市には病児・病後児保育を実施する施設があります。子どもの急な発熱時に備えて、事前に登録しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  // ===== 3人目の保活 (35) =====
  {
    slug: "sannin-me-hokatsu",
    citySlug: "chiba",
    title: "千葉市で3人目の保活　保育料無料と加点のメリット",
    description:
      "千葉市で第3子の保育園入園を目指す場合の加点・保育料無料制度・きょうだい在園の活用法を解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "世帯別ガイド",
    categoryColor: "rose",
    content: `<h2>第3子の保育料</h2>
<p>千葉市では、小学校就学前の子どもが3人以上いる世帯の第3子以降は、保育料が<span class="highlight">無料</span>です。さらに副食費も免除される場合があります。</p>

<h2>第3子の入園選考での優位性</h2>
<ul>
<li>きょうだいが在園していれば調整指数で加点</li>
<li>フルタイム共働き＋育休復帰＋きょうだい加点でかなり有利</li>
<li>希望園に入園できる可能性が高い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第3子は経済的にも選考上も非常に有利です。上の子と同じ園を第1希望にすれば、高い確率で入園できるでしょう。</p>
</div>

<h2>注意点</h2>
<p>上の子が卒園して小学校に入ると、多子カウントの対象外になる場合があります（年収360万円未満相当の世帯を除く）。きょうだいの年齢差に注意しましょう。</p>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // ===== 単身赴任 (36) =====
  {
    slug: "tanshin-funin",
    citySlug: "chiba",
    title: "千葉市で単身赴任中の保活　点数と必要書類",
    description:
      "配偶者が単身赴任中の場合の千葉市の保育園点数・世帯の扱い・必要書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop",
    category: "世帯別ガイド",
    categoryColor: "rose",
    content: `<h2>単身赴任中の点数計算</h2>
<p>配偶者が単身赴任中でも、婚姻関係にある場合は<span class="highlight">父母両方の基本指数が考慮</span>されます。ひとり親扱いにはなりません。</p>

<h2>必要な書類</h2>
<ul>
<li>単身赴任先の住民票または社宅の契約書</li>
<li>配偶者の就労証明書（赴任先の勤務先に依頼）</li>
<li>通常の申込書類一式</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市は東京への通勤圏内で、単身赴任世帯も多い地域です。単身赴任で日中ワンオペ育児になることは、保育の必要性を示す重要な事情です。申込書の備考欄や別紙で状況を説明しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>単身赴任の扱いは自治体によって異なります。千葉市での具体的な取り扱いは、各区のこども家庭課で事前に確認してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  // ===== 祖父母同居 (37) =====
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "chiba",
    title: "千葉市で祖父母同居の場合の保育園入園への影響",
    description:
      "千葉市で祖父母と同居している場合の保育園入園選考への影響・点数への影響・対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "世帯別ガイド",
    categoryColor: "rose",
    content: `<h2>祖父母同居は不利になる？</h2>
<p>千葉市では、同居の祖父母がいる場合、<span class="highlight">祖父母が保育できる状態かどうか</span>が確認されることがあります。ただし、祖父母が就労中・高齢・介護が必要などの場合は、保育の必要性は変わりません。</p>

<h2>祖父母同居で不利にならないケース</h2>
<ul>
<li>祖父母が65歳以上</li>
<li>祖父母が就労中</li>
<li>祖父母に疾病・障害がある</li>
<li>祖父母が要介護認定を受けている</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同居の祖父母が保育できない理由がある場合は、それを証明する書類（就労証明書・診断書等）を添付すると安心です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>近隣に住む祖父母（同居ではない）は選考に影響しません。住民票上の「世帯」が同一かどうかがポイントです。具体的な扱いは各区のこども家庭課でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  // ===== 不承諾への対応 (38) =====
  {
    slug: "fushoninchi-taiou",
    citySlug: "chiba",
    title: "千葉市で保育園不承諾になったら？次にやるべきこと",
    description:
      "千葉市の保育園選考で不承諾になった場合の対処法・2次申込・認可外の選び方を解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "保活の実践",
    categoryColor: "green",
    content: `<h2>不承諾通知が届いたら</h2>
<p>まず落ち着いて、以下の選択肢を検討しましょう。</p>

<h3>すぐにやること</h3>
<ol>
<li><strong>2次利用調整に申し込む</strong>：1次で不承諾の場合、2次の申込が可能</li>
<li><strong>各区のこども家庭課に相談</strong>：空きのある園の情報を確認</li>
<li><strong>認可外保育施設を探す</strong>：並行して認可外も検討</li>
</ol>

<h2>中長期的な対策</h2>
<table>
<tr><th>対策</th><th>内容</th></tr>
<tr><td>途中入園の申込</td><td>毎月空きが出る可能性があるため、申込を継続</td></tr>
<tr><td>育休延長</td><td>勤務先と相談し、最長2歳まで延長</td></tr>
<tr><td>認可外→認可への転園</td><td>認可外に通わせながら翌年度の認可園を申込</td></tr>
<tr><td>ファミサポ等の活用</td><td>一時保育やファミリー・サポートを利用</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾通知書は育休延長の手続きに必要です。大切に保管してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 68,
  },
  // ===== 待機児童対策 (39) =====
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "chiba",
    title: "千葉市の待機児童対策　市の取り組みと今後の見通し",
    description:
      "千葉市が実施している待機児童対策・保育施設の整備計画・今後の見通しをまとめました。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "データで見る保活",
    categoryColor: "blue",
    content: `<h2>千葉市の取り組み</h2>
<p>千葉市はこども未来局を中心に、以下の待機児童対策を進めています。</p>

<ul>
<li>認可保育園の定員拡充・新設</li>
<li>小規模保育事業所の新設支援</li>
<li>保育士確保のための処遇改善</li>
<li>幼稚園の認定こども園への移行促進</li>
</ul>

<h2>千葉市の特徴</h2>
<p>千葉市は人口約98万人の政令指定都市で、東京のベッドタウンとしての性格が強い都市です。特に海浜幕張エリアや千葉駅周辺では再開発によるマンション建設で子育て世帯が増加しており、保育需要が高まっています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉市全体では保育施設の整備が進んでいますが、中央区・美浜区などの人気エリアでは依然として入園が難しい園があります。早めの準備を心がけましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>千葉市の子育て支援施策の詳細は<a href="https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/h28goannnai.html" target="_blank" rel="noopener">千葉市こども未来局</a>のページで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 転園申込 (40) =====
  {
    slug: "tennen-moshikomi",
    citySlug: "chiba",
    title: "千葉市で保育園を転園したい場合の申込方法と注意点",
    description:
      "千葉市で保育園の転園を希望する場合の申込方法・転園が認められるケース・注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "書類・手続き",
    categoryColor: "green",
    content: `<h2>転園の申込方法</h2>
<p>転園を希望する場合は、各区のこども家庭課に転園申込書を提出します。通常の入園申込と同様に利用調整（点数による選考）が行われます。</p>

<h2>転園が認められやすいケース</h2>
<ul>
<li>転居により通園が困難になった場合</li>
<li>きょうだいが別の園に通っており、同園を希望する場合</li>
<li>小規模保育事業所の卒園に伴う3歳児の転園</li>
</ul>

<h2>転園の注意点</h2>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>選考方法</td><td>新規入園者と同じ利用調整で選考</td></tr>
<tr><td>現在の園</td><td>転園が決まらなければ現在の園に通い続けられる</td></tr>
<tr><td>申込時期</td><td>4月転園は11月頃の申込。途中転園は前月の締切日まで</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>転園が決まった場合、現在の園の退園手続きが必要です。転園日と退園日を調整し、空白期間が生じないようにしましょう。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園希望の理由を申込書に詳しく書いておくと、利用調整で考慮される場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
];

registerArticles(articles);
