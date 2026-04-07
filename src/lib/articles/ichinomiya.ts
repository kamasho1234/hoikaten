import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // 1. 保活スケジュール完全ガイド
  {
    slug: "hokatsu-schedule",
    citySlug: "ichinomiya",
    title: "一宮市の保活スケジュール完全ガイド｜申込時期と準備の流れ",
    description:
      "一宮市の保育園入園申込スケジュールを時系列で解説。4月入園の1次・2次募集や途中入園の流れ、準備すべき書類をまとめました。",
    category: "スケジュール",
    categoryColor: "green",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=400&fit=crop",
    content: `<h2>一宮市の保活スケジュール</h2>
<p>一宮市の保育園入園は「4月入園（当初入所）」と「途中入園（通年入所）」の2種類があります。それぞれ申込時期が異なるため、早めの準備が大切です。</p>

<h2>4月入園のスケジュール</h2>
<div class="step">
<p><strong>STEP1：9月下旬</strong>　入所申込みの手引き配布開始・園見学</p>
<p><strong>STEP2：10月上旬〜下旬</strong>　1次申込受付（第1希望園またはオンラインで提出）</p>
<p><strong>STEP3：11月〜12月</strong>　面接・選考</p>
<p><strong>STEP4：1月下旬〜2月</strong>　1次結果通知</p>
<p><strong>STEP5：2月〜3月</strong>　2次募集・追加募集（空きがある場合）</p>
</div>

<h2>途中入園のスケジュール</h2>
<p>途中入園は毎月受付しています。入園希望月の前月10日頃までに申込みが必要です。空き状況は一宮市公式サイトで随時確認できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一宮市では「ぴったりサービス」を利用したオンライン申込みが可能です。来庁が難しい方は積極的に活用しましょう。</p>
</div>

<h2>準備すべき書類</h2>
<p>就労証明書は勤務先に記入してもらう必要があるため、2〜3週間前には依頼しましょう。自営業の方は確定申告書や開業届のコピーも必要です。就労状況は過去3か月の実績で判定されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは<a href="https://www.city.ichinomiya.aichi.jp/kodomokatei/hoiku/1000155/1010629/index.html" target="_blank" rel="noopener">一宮市保育園等ページ</a>で確認できます。問い合わせ先：保育課入所グループ（0586-28-9024）</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },

  // 2. 点数の仕組みと計算方法
  {
    slug: "scoring-system",
    citySlug: "ichinomiya",
    title: "一宮市の保育園点数の仕組みと計算方法｜基準指数表を徹底解説",
    description:
      "一宮市の保育園入園選考で使われる基準指数の仕組みを解説。父母別の基準指数と調整加点の計算方法をわかりやすくまとめました。",
    category: "点数・選考",
    categoryColor: "blue",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    content: `<h2>一宮市の入園選考の仕組み</h2>
<p>一宮市では、入園希望者が定員を超えた場合、「保育所入所認定基準」に基づいて基準指数で入園調整を行います。指数が高い世帯から優先的に内定します。</p>

<h2>点数の構成</h2>
<p>世帯の合計点数は<strong>「父の基準指数＋母の基準指数＋調整加点」</strong>で決まります。</p>

<h3>基準指数（各保護者最大10点）</h3>
<table>
<tr><th>区分</th><th>内容</th><th>指数</th></tr>
<tr><td>外勤・自営中心者</td><td>月160時間以上</td><td>10</td></tr>
<tr><td>外勤・自営中心者</td><td>月140時間以上</td><td>9</td></tr>
<tr><td>外勤・自営中心者</td><td>月120時間以上</td><td>8</td></tr>
<tr><td>自営中心者</td><td>月100時間以上</td><td>7</td></tr>
<tr><td>外勤・自営中心者</td><td>月80時間以上</td><td>6</td></tr>
<tr><td>出産</td><td>産前3か月〜産後2か月</td><td>8</td></tr>
<tr><td>入院・常時臥床</td><td>概ね1か月以上</td><td>10</td></tr>
<tr><td>障害1・2級/A・B判定</td><td>手帳あり</td><td>10</td></tr>
<tr><td>求職中</td><td>就労予定</td><td>1</td></tr>
</table>

<h3>調整加点</h3>
<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>ひとり親世帯</td><td>+15</td></tr>
<tr><td>保育士・保育教諭として市内園で就労</td><td>+6</td></tr>
<tr><td>きょうだい在園（希望園）</td><td>+3</td></tr>
<tr><td>多胎児</td><td>+2</td></tr>
<tr><td>18歳未満の子3人以上（3番目以降）</td><td>+1</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>両親ともにフルタイム（月160時間以上）の場合、基本指数は10＋10＝20点。ここに調整加点が加わります。同点の場合は別途定める選考指数で決定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>選考基準の全項目は<a href="https://www.city.ichinomiya.aichi.jp/kodomokatei/hoiku/1000155/1010629/1015734.html" target="_blank" rel="noopener">一宮市選考方法ページ</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 58,
  },

  // 3. 加点のコツ・点数アップ戦略
  {
    slug: "scoring-tips",
    citySlug: "ichinomiya",
    title: "一宮市の保育園入園｜加点のコツと点数アップ戦略",
    description:
      "一宮市の保育園入園で点数を上げるための具体的な戦略を解説。就労時間の調整やひとり親加点の活用など、実践的なコツをまとめました。",
    category: "点数・選考",
    categoryColor: "blue",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    content: `<h2>基準指数を最大化する</h2>
<p>一宮市の基準指数は父母それぞれ最大10点。合算方式なので、両親の合計が高いほど有利です。</p>

<h3>戦略1：就労時間の調整</h3>
<p>月140時間と月160時間では1点の差があります。パート勤務の方は、シフトを少し増やして月160時間以上にできないか検討しましょう。</p>

<table>
<tr><th>就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>10</td></tr>
<tr><td>月140時間以上</td><td>9</td></tr>
<tr><td>月120時間以上</td><td>8</td></tr>
<tr><td>月100時間以上（自営中心者）</td><td>7</td></tr>
<tr><td>月80時間以上</td><td>6</td></tr>
</table>

<h3>戦略2：就労実績3か月を確保する</h3>
<p>一宮市では証明書に記載された過去3か月の実績で判定されます。申込前に十分な就労実績を積んでおきましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園の申込は10月頃。逆算すると7月頃までに就労を開始しておけば、申込時に3か月の実績を確保できます。</p>
</div>

<h2>調整加点で差をつける</h2>
<h3>戦略3：ひとり親加点は最大の武器</h3>
<p>ひとり親世帯は+15点の大きな加算があります。該当する方は必ず申告しましょう。</p>

<h3>戦略4：きょうだい在園の活用</h3>
<p>希望園にきょうだいが在園していると+3点。上の子の園を希望園にすることが基本戦略です。</p>

<h3>戦略5：保育士資格の活用</h3>
<p>市内の保育園等で保育士・保育教諭として就労する場合は+6点の加算があります。保育士資格をお持ちの方には大きなアドバンテージです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>自営業の協力者は中心者より指数が低くなります（月120時間以上でも7点）。可能であれば中心者として申告できるか確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 52,
  },

  // 4. 認可保育園vs認可外
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "ichinomiya",
    title: "一宮市の認可保育園vs認可外｜どっちがいい？違いを比較",
    description:
      "一宮市で保育園を選ぶとき、認可と認可外どちらがいいのか。保育料・定員・申込方法の違いをわかりやすく比較します。",
    category: "園選び",
    categoryColor: "amber",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    content: `<h2>一宮市の認可保育施設</h2>
<p>一宮市には市立保育園、私立保育園、認定こども園、地域型保育事業所（小規模保育等）があります。2025年4月時点で利用者数は約7,900人を超え、待機児童数は0人を達成しています。</p>

<h2>認可と認可外の違い</h2>
<table>
<tr><th>項目</th><th>認可</th><th>認可外</th></tr>
<tr><td>保育料</td><td>所得に応じて決定</td><td>施設が自由に設定</td></tr>
<tr><td>申込先</td><td>市役所（保育課）</td><td>各施設に直接</td></tr>
<tr><td>選考方法</td><td>基準指数で調整</td><td>先着順や施設独自基準</td></tr>
<tr><td>3〜5歳保育料</td><td>無償化対象</td><td>月3.7万円まで無償化</td></tr>
<tr><td>0〜2歳保育料</td><td>住民税非課税世帯は無償</td><td>月4.2万円まで無償化</td></tr>
</table>

<h3>認可のメリット</h3>
<p>保育料が所得に応じて決まるため、低所得世帯には経済的メリットが大きいです。保育士の配置基準が厳しく、安心感があります。</p>

<h3>認可外のメリット</h3>
<p>入園選考がないため、指数が低い世帯でも入りやすいです。延長保育や休日保育など、柔軟な対応をする施設もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一宮市は待機児童ゼロを達成していますが、人気園は競争率が高い場合があります。認可外に預けながら希望園の空きを待つ方法も有効です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設一覧や空き状況は<a href="https://www.city.ichinomiya.aichi.jp/kodomokatei/hoiku/1000155/1010629/index.html" target="_blank" rel="noopener">一宮市保育園等ページ</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // 5. 保育園見学チェックリスト
  {
    slug: "kengaku-checklist",
    citySlug: "ichinomiya",
    title: "一宮市の保育園見学チェックリスト｜見るべきポイント15選",
    description:
      "一宮市の保育園見学で確認すべきポイントをチェックリスト形式でまとめました。園の雰囲気や保育内容、安全面まで網羅的に解説します。",
    category: "園選び",
    categoryColor: "amber",
    image:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop",
    content: `<h2>見学前の準備</h2>
<p>一宮市には市立・私立合わせて多数の保育施設があります。見学前に候補を3〜5園に絞り、事前に電話で見学予約をしましょう。</p>

<h2>見学チェックリスト</h2>
<h3>保育環境</h3>
<div class="step">
<p>1. 園庭の広さと遊具の安全性</p>
<p>2. 室内の清潔さと採光・換気</p>
<p>3. 年齢別の保育室の広さ</p>
<p>4. トイレ・手洗い場の衛生状態</p>
<p>5. 給食室の設備（自園調理かどうか）</p>
</div>

<h3>保育内容</h3>
<div class="step">
<p>6. 保育士と子どもの関わり方</p>
<p>7. 年間行事・イベントの内容</p>
<p>8. 散歩・外遊びの頻度</p>
<p>9. 食物アレルギーへの対応</p>
<p>10. 午睡（お昼寝）の環境</p>
</div>

<h3>利便性・安全面</h3>
<div class="step">
<p>11. 送迎時の駐車場の有無と広さ</p>
<p>12. 延長保育の時間と料金</p>
<p>13. 防災・避難訓練の実施頻度</p>
<p>14. 連絡帳やアプリなどの連絡手段</p>
<p>15. 病児・病後児対応の有無</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一宮市は名古屋市のベッドタウンとして子育て世帯が多いエリアです。通勤経路上の園を選ぶ方も多いので、自宅〜園〜駅・職場の動線を実際に確認しておきましょう。</p>
</div>

<h3>質問リスト</h3>
<p>見学時には以下の点も質問しましょう。</p>
<ul>
<li>慣らし保育の期間はどのくらいか</li>
<li>持ち物（布団・着替え等）は何が必要か</li>
<li>保護者参加の行事はどの程度あるか</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の概要は<a href="https://www.city.ichinomiya.aichi.jp/kodomokatei/hoiku/1000155/1010629/index.html" target="_blank" rel="noopener">一宮市公式サイト</a>の保育園等ページから確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 42,
  },

  // 6. 育休中の保活でやるべきこと
  {
    slug: "ikukyu-hokatsu",
    citySlug: "ichinomiya",
    title: "一宮市で育休中の保活｜やるべきことリスト",
    description:
      "一宮市で育休中に保活を進めるためのやるべきことをリスト化。情報収集から申込み、復帰準備まで時系列で解説します。",
    category: "保活テクニック",
    categoryColor: "rose",
    image:
      "https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?w=800&h=400&fit=crop",
    content: `<h2>育休中の保活が重要な理由</h2>
<p>一宮市は名古屋市に隣接するベッドタウンとして子育て世帯に人気のエリアです。待機児童ゼロを達成していますが、人気園では競争があるため、育休中にしっかり準備しましょう。</p>

<h2>時系列やることリスト</h2>
<h3>出産前〜産後3か月</h3>
<div class="step">
<p>1. 自宅周辺・通勤経路の保育園をリストアップ</p>
<p>2. 一宮市の入所申込みの手引きを入手</p>
<p>3. 基準指数の仕組みを理解する</p>
</div>

<h3>産後4か月〜8か月</h3>
<div class="step">
<p>4. 候補園の見学予約・見学</p>
<p>5. 空き状況を公式サイトで確認</p>
<p>6. 希望園の優先順位を決める</p>
</div>

<h3>産後9か月〜（申込準備期）</h3>
<div class="step">
<p>7. 就労証明書を勤務先に依頼（2〜3週間前に）</p>
<p>8. 申込書類の記入・提出</p>
<p>9. 復帰後の勤務体制を職場と相談</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育児休業取得中の基準指数は1点です。復帰後のフルタイム就労（月160時間以上＝10点）を前提に申込むことで、世帯の基準指数を大きく上げることができます。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>希望する保育所等に入所できない場合は育休延長も許容できる旨の申告をすると、世帯の指数が1点になります。本当に入園を希望する場合はこの申告は避けましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 48,
  },

  // 7. ひとり親世帯の保活ガイド
  {
    slug: "single-parent-guide",
    citySlug: "ichinomiya",
    title: "一宮市のひとり親世帯向け保活ガイド｜加点と支援制度",
    description:
      "一宮市でひとり親世帯が保育園入園を目指す際の加点制度と利用できる支援制度を解説します。",
    category: "保活テクニック",
    categoryColor: "rose",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    content: `<h2>ひとり親世帯の加点</h2>
<p>一宮市では、ひとり親世帯（父または母のいずれかを、生計が一ではないと認定した場合のみ）に対して、世帯の指数に<strong>15点</strong>が加算されます。これは調整加点の中で最も大きな加点です。</p>

<h2>ひとり親世帯の点数シミュレーション</h2>
<table>
<tr><th>状況</th><th>基準指数</th><th>加点</th><th>合計</th></tr>
<tr><td>フルタイム就労（月160時間以上）</td><td>10</td><td>+15</td><td>25</td></tr>
<tr><td>パート（月120時間以上）</td><td>8</td><td>+15</td><td>23</td></tr>
<tr><td>パート（月80時間以上）</td><td>6</td><td>+15</td><td>21</td></tr>
<tr><td>求職中</td><td>1</td><td>+15</td><td>16</td></tr>
</table>

<p>両親フルタイム共働き世帯の基本合計が20点なので、ひとり親でフルタイムなら25点と、十分に競争力のある点数になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親加点は「生計が一ではないと認定した場合のみ」が条件です。同居の祖父母がいる場合でも、父または母の一方が不在であれば認定される可能性があります。詳しくは保育課に確認しましょう。</p>
</div>

<h2>ひとり親が利用できる支援制度</h2>
<ul>
<li>児童扶養手当（所得制限あり）</li>
<li>ひとり親家庭等医療費助成</li>
<li>母子父子寡婦福祉資金貸付</li>
<li>保育料の減免制度</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親支援の詳細は<a href="https://www.city.ichinomiya.aichi.jp/" target="_blank" rel="noopener">一宮市公式サイト</a>の子育て支援ページで確認できます。問い合わせ先：保育課入所グループ（0586-28-9024）</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },

  // 8. 保育料の仕組みと無償化
  {
    slug: "hoikuryo-guide",
    citySlug: "ichinomiya",
    title: "一宮市の保育料はいくら？｜無償化制度と負担額の目安",
    description:
      "一宮市の保育料の仕組み、幼児教育・保育の無償化制度、所得別の負担額の目安をわかりやすく解説します。",
    category: "費用・手続き",
    categoryColor: "purple",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    content: `<h2>保育料の無償化</h2>
<p>2019年10月から幼児教育・保育の無償化が始まり、3〜5歳児クラスの保育料は無料になりました。</p>

<h2>無償化の対象と範囲</h2>
<table>
<tr><th>年齢</th><th>認可施設</th><th>認可外施設</th></tr>
<tr><td>3〜5歳</td><td>保育料無償</td><td>月3.7万円まで無償</td></tr>
<tr><td>0〜2歳（非課税世帯）</td><td>保育料無償</td><td>月4.2万円まで無償</td></tr>
<tr><td>0〜2歳（課税世帯）</td><td>所得に応じて負担</td><td>全額自己負担</td></tr>
</table>

<h2>0〜2歳児の保育料の目安</h2>
<p>0〜2歳児の保育料は世帯の市民税所得割額によって段階的に決まります。一宮市の保育料は国の基準額をベースに市独自の軽減を行っています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第2子は半額、第3子以降は無料になる多子軽減制度があります。一宮市では18歳未満の子が3人以上いる世帯で入園する場合、基準指数にも+1の加点があります。</p>
</div>

<h2>保育料以外にかかる費用</h2>
<ul>
<li>給食費（3〜5歳児：主食費＋副食費）</li>
<li>延長保育料</li>
<li>教材費・行事費など（園により異なる）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.ichinomiya.aichi.jp/kodomokatei/hoiku/1000155/1010629/index.html" target="_blank" rel="noopener">一宮市保育園等ページ</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 44,
  },

  // 9. 小規模保育・地域型保育事業所ガイド
  {
    slug: "chiikigata-hoiku",
    citySlug: "ichinomiya",
    title: "一宮市の小規模保育・地域型保育事業所ガイド｜0〜2歳児向け",
    description:
      "一宮市の地域型保育事業所（小規模保育・事業所内保育）の特徴やメリット・デメリット、卒園後の連携施設について解説します。",
    category: "園選び",
    categoryColor: "amber",
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=400&fit=crop",
    content: `<h2>地域型保育事業所とは</h2>
<p>一宮市には通常の保育園のほかに、0〜2歳児を対象とした地域型保育事業所があります。少人数制のきめ細かい保育が特徴です。</p>

<h2>施設の種類</h2>
<table>
<tr><th>種類</th><th>定員</th><th>特徴</th></tr>
<tr><td>小規模保育事業所</td><td>6〜19人</td><td>家庭的な雰囲気で手厚い保育</td></tr>
<tr><td>事業所内保育事業所</td><td>施設による</td><td>企業の従業員向け＋地域枠</td></tr>
</table>

<h2>メリット</h2>
<ul>
<li>少人数制で一人ひとりに丁寧な関わり</li>
<li>大規模園に比べて競争率が低い場合がある</li>
<li>通常の認可施設と同じ保育料体系</li>
</ul>

<h2>デメリット・注意点</h2>
<ul>
<li>3歳からは別の園への転園が必要</li>
<li>園庭がない施設もある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一宮市では地域型保育事業所の卒園児（従業員枠は除く）が連携施設である公立保育所を希望する場合、優先的に入所できるよう配慮されます。3歳以降の転園先を見越して選ぶのが賢い戦略です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>地域型保育事業所の一覧は<a href="https://www.city.ichinomiya.aichi.jp/kodomokatei/hoiku/1000155/1010629/index.html" target="_blank" rel="noopener">一宮市保育園等ページ</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 38,
  },

  // 10. よくある質問FAQ
  {
    slug: "faq",
    citySlug: "ichinomiya",
    title: "一宮市の保育園入園FAQ｜よくある質問と回答まとめ",
    description:
      "一宮市の保育園入園に関するよくある質問をまとめました。申込方法、点数の仕組み、途中入園など、保活の疑問を解決します。",
    category: "基礎知識",
    categoryColor: "teal",
    image:
      "https://images.unsplash.com/photo-1484981138541-3d074aa97fe9?w=800&h=400&fit=crop",
    content: `<h2>申込みについて</h2>
<h3>Q. 途中入園はできますか？</h3>
<p>はい。一宮市では年度途中でも毎月入園を受け付けています。空き状況は公式サイトで確認でき、希望月の前月10日頃までに申込みが必要です。</p>

<h3>Q. オンラインで申込みできますか？</h3>
<p>はい。「ぴったりサービス」を利用したオンライン申込みが可能です。ただし、就労証明書などの添付書類は別途提出が必要な場合があります。</p>

<h3>Q. 市外から一宮市の保育園に申込めますか？</h3>
<p>一宮市外にお住まいの方も、転入予定がある場合などは申込みが可能です。詳しくは保育課にお問い合わせください。</p>

<h2>点数について</h2>
<h3>Q. 両親フルタイムで何点になりますか？</h3>
<p>両親ともに月160時間以上の外勤の場合、基準指数は10＋10＝20点です。ここに調整加点（ひとり親+15、きょうだい在園+3など）が加わります。</p>

<h3>Q. 求職中でも申込めますか？</h3>
<p>はい。求職中の基準指数は1点です。入園後に就労を開始することが条件になります。</p>

<h3>Q. 在宅勤務の場合はどうなりますか？</h3>
<p>在宅勤務は基本的に外勤の基準指数が適用されますが、家庭の状況に応じて自宅で保育が行いやすい場合などは減点される可能性があります。</p>

<h2>その他</h2>
<h3>Q. 育休延長のための申込みはどうなりますか？</h3>
<p>希望する保育所等に入所できない場合に育休延長も許容できる旨を申告すると、世帯の指数が1点になります。本気で入園を希望する場合はこの申告は避けましょう。</p>

<h3>Q. 虐待やDVのケースはどうなりますか？</h3>
<p>虐待やDVのおそれがある場合など、社会的養護が必要な場合は世帯の指数が40点に設定されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>その他のご質問は保育課入所グループ（0586-28-9024）にお問い合わせください。<a href="https://www.city.ichinomiya.aichi.jp/kodomokatei/hoiku/1000155/1010629/index.html" target="_blank" rel="noopener">一宮市保育園等ページ</a></p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
];

registerArticles(articles);
