import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // 1. 点数を上げるコツ
  {
    slug: "score-up-checklist",
    citySlug: "hakodate",
    title: "函館市で保育園の点数を上げる方法　加算項目チェックリスト",
    description:
      "函館市の保育園入園選考で加算点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>加算項目を漏れなくチェックしよう</h2>
<p>函館市の保育園入園選考では、基本点数に加算分を足した「総合点数」の高い順に利用調整が行われます。加算できる項目を漏れなく活用しましょう。</p>

<h3>加算チェックリスト</h3>
<table>
<tr><th>項目</th><th>加算</th><th>条件</th></tr>
<tr><td>ひとり親家庭</td><td>+13</td><td>ひとり親であること</td></tr>
<tr><td>保育士として従事</td><td>+10</td><td>保護者が保育所等で保育士として勤務</td></tr>
<tr><td>きょうだい同一園</td><td>+5</td><td>きょうだいが同じ保育所等を利用中（1号認定含む）</td></tr>
<tr><td>認定こども園1号→2号</td><td>+5</td><td>同一認定こども園内で1号から2号に移る場合</td></tr>
<tr><td>認可外からの移行児</td><td>+5</td><td>認可外施設が認可に移行し、移行前からの在園児</td></tr>
<tr><td>産休・育休明け復職</td><td>+4</td><td>産休・育休明けで復職する場合</td></tr>
<tr><td>子どもの障がい</td><td>+3</td><td>入園希望の子どもに障がいがある場合</td></tr>
<tr><td>生活保護世帯</td><td>+1</td><td>就労による自立支援につながる場合</td></tr>
<tr><td>生計中心者の失業</td><td>+1</td><td>父母が3か月以内に失業し就労必要性が高い</td></tr>
<tr><td>きょうだい同時申込</td><td>+1</td><td>複数のきょうだいで同時利用を希望</td></tr>
<tr><td>保護者長期不在</td><td>+1</td><td>長期入院・単身赴任等で一方が不在</td></tr>
<tr><td>両親以外が監護</td><td>+1</td><td>両親以外の者が子どもを監護している</td></tr>
<tr><td>待機6か月以上</td><td>+1</td><td>待機期間が6か月以上</td></tr>
<tr><td>65歳未満の同居親族</td><td>-1</td><td>保育できる65歳未満の親族が同居</td></tr>
<tr><td>同居親族が他の子を保育</td><td>-1</td><td>65歳未満の同居親族等が対象児以外を保育</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ひとり親家庭の+13点は非常に大きな加算です。生活保護世帯と生計中心者の失業は、求職活動または起業準備を行っている場合が対象で、両方同時には加算されません。</p>
</div>

<h2>加算を最大化する戦略</h2>
<ul>
<li>産休・育休明け復職（+4）は多くの方が該当するため、申請漏れのないように</li>
<li>きょうだいが在園中なら+5が加算されるので、同じ園を第1希望にすると有利</li>
<li>65歳未満の同居親族がいると-1減点されるため、点数計算時に注意が必要</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用調整基準表は<a href="https://www.city.hakodate.hokkaido.jp/docs/2017051700061/" target="_blank" rel="noopener">函館市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },

  // 2. 入園点数のしくみ
  {
    slug: "scoring-system-guide",
    citySlug: "hakodate",
    title: "函館市の保育園入園点数のしくみ　基本点数と加算分をやさしく解説",
    description:
      "函館市の保育園入園選考で使われる「基本点数」と「加算分」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数（指数）とは？</h2>
<p>函館市の保育園入園は「先着順」ではなく「利用調整基準表」に基づく<strong>総合点数の高い順</strong>に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>総合点数 ＝ 基本合計点数（父＋母）＋ 加算合計点数</p>
</div>

<h2>基本点数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">10点</span>で、父母合計の最大は<span class="highlight">20点</span>。</p>
<p>最も多い「就労」の場合、居宅外か居宅内か、勤務日数と月の労働時間数で点数が決まります。</p>

<table>
<tr><th>就労区分</th><th>勤務条件</th><th>点数</th></tr>
<tr><td>居宅外・月20日以上</td><td>月160時間以上</td><td>10</td></tr>
<tr><td>居宅外・月20日以上</td><td>月120時間以上</td><td>9</td></tr>
<tr><td>居宅外・月20日以上</td><td>月80時間以上</td><td>8</td></tr>
<tr><td>居宅外・月16日以上</td><td>月128時間以上</td><td>7</td></tr>
<tr><td>居宅外・月16日以上</td><td>月96時間以上</td><td>6</td></tr>
<tr><td>居宅外・月16日以上</td><td>月64時間以上</td><td>5</td></tr>
<tr><td>居宅外・月16日未満</td><td>月64時間以上</td><td>4</td></tr>
</table>

<p>居宅内労働（内職含む）の場合は、同条件でも居宅外より1点低く設定されています。</p>

<h2>加算分とは？</h2>
<p>ひとり親家庭（+13）やきょうだい在園（+5）など、世帯の状況に応じて基本点数に加算される点数です。該当する項目はすべて合算されます。</p>

<h2>同点の場合はどうなる？</h2>
<p>総合点数が同じ場合は、次の順番で優先されます。</p>
<ol>
<li>申請児童に障がいがあり、希望保育所等で保育する必要がある</li>
<li>きょうだいが希望保育所等を利用している</li>
<li>ひとり親家庭</li>
<li>多子世帯（就学前児童が複数いる）</li>
<li>世帯の状況から総合的に判断</li>
</ol>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.hakodate.hokkaido.jp/docs/2017051700061/" target="_blank" rel="noopener">函館市の保育所利用手続きページ</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },

  // 3. 保活スケジュール
  {
    slug: "hokatsu-schedule",
    citySlug: "hakodate",
    title: "函館市の保活スケジュール　申込みから入園までの流れ",
    description:
      "函館市で保育園に入園するための保活スケジュールを時系列でまとめました。いつまでに何をすべきか確認できます。",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=400&fit=crop",
    category: "スケジュール",
    categoryColor: "green",
    content: `<h2>函館市の4月入園スケジュール</h2>
<p>函館市の4月一斉入所に向けた一般的なスケジュールです。年度によって日程が変わる場合があるため、必ず公式情報で確認しましょう。</p>

<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>4月〜8月</td><td>保育園の情報収集・見学</td></tr>
<tr><td>9月〜10月</td><td>入所申込書の配布開始・申込準備</td></tr>
<tr><td>10月〜11月</td><td>4月一斉入所の申込受付期間</td></tr>
<tr><td>12月〜1月</td><td>利用調整（選考）</td></tr>
<tr><td>2月</td><td>内定通知・面談</td></tr>
<tr><td>3月</td><td>入園準備</td></tr>
<tr><td>4月</td><td>入園</td></tr>
</table>

<h3>年度途中の入園</h3>
<p>空きがあれば年度途中でも入園できます。希望月の前月10日頃までに申込みが必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>人気園は4月一斉入所でも定員を超えることがあります。第3希望まで記入できるので、通える範囲の園を複数検討しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>問い合わせ先</strong></p>
<p>函館市 子ども未来部 子どもサービス課<br>電話: 0138-21-3270</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },

  // 4. 認可 vs 認可外
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "hakodate",
    title: "函館市の認可保育園と認可外保育施設の違いを比較",
    description:
      "函館市で保育園を探すとき、認可と認可外の違いがわからない方へ。料金・保育内容・申込方法の違いをわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "green",
    content: `<h2>認可保育園とは？</h2>
<p>国が定めた基準（面積・職員数・設備など）を満たし、函館市が認可した保育施設です。保育料は世帯の所得に応じて決まります。</p>

<h2>認可外保育施設とは？</h2>
<p>認可基準を満たしていない、または認可を受けていない保育施設です。料金は施設ごとに独自設定です。</p>

<h2>主な違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認可外保育施設</th></tr>
<tr><td>保育料</td><td>所得に応じた金額</td><td>施設が独自に設定</td></tr>
<tr><td>申込先</td><td>函館市（子どもサービス課）</td><td>施設に直接</td></tr>
<tr><td>選考方法</td><td>利用調整基準表で点数順</td><td>施設ごとに異なる</td></tr>
<tr><td>3〜5歳の無償化</td><td>対象</td><td>月3.7万円まで対象</td></tr>
<tr><td>0〜2歳の無償化</td><td>住民税非課税世帯のみ</td><td>住民税非課税世帯のみ（月4.2万円まで）</td></tr>
</table>

<h3>函館市での認可保育園の種類</h3>
<ul>
<li>保育所（0歳〜就学前）</li>
<li>認定こども園（保育機能部分）</li>
<li>小規模保育事業（0〜2歳）</li>
<li>事業所内保育事業</li>
</ul>

<div class="info-box">
<p><strong>ヒント</strong></p>
<p>認可に入れなかった場合、認可外に預けながら待機することで「待機6か月以上」の加算（+1）が得られます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // 5. 居宅外と居宅内の点数差
  {
    slug: "employment-type-difference",
    citySlug: "hakodate",
    title: "函館市の保育園点数　居宅外労働と居宅内労働の違い",
    description:
      "函館市では居宅外と居宅内（在宅ワーク・内職）で保育園の点数が異なります。自分がどちらに該当するか確認しましょう。",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>居宅外労働と居宅内労働の点数差</h2>
<p>函館市の利用調整基準では、同じ勤務時間でも「居宅外」と「居宅内（内職含む）」で基本点数が1点異なります。</p>

<table>
<tr><th>勤務条件</th><th>居宅外</th><th>居宅内</th><th>差</th></tr>
<tr><td>月20日以上・月160時間以上</td><td>10</td><td>9</td><td>-1</td></tr>
<tr><td>月20日以上・月120時間以上</td><td>9</td><td>8</td><td>-1</td></tr>
<tr><td>月20日以上・月80時間以上</td><td>8</td><td>7</td><td>-1</td></tr>
<tr><td>月16〜20日未満・月128時間以上</td><td>7</td><td>6</td><td>-1</td></tr>
<tr><td>月16〜20日未満・月96時間以上</td><td>6</td><td>5</td><td>-1</td></tr>
<tr><td>月16〜20日未満・月64時間以上</td><td>5</td><td>4</td><td>-1</td></tr>
<tr><td>月16日未満・月64時間以上</td><td>4</td><td>3</td><td>-1</td></tr>
</table>

<h2>在宅ワーク・フリーランスの方へ</h2>
<p>在宅勤務やフリーランスは「居宅内労働」に分類されます。ただし、会社に所属し自宅でのリモートワークが命じられている場合は「居宅外労働」として扱われる場合もあります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労形態の判断は函館市が行います。不明な場合は子どもサービス課（0138-21-3270）に確認しましょう。</p>
</div>

<h2>最大点数を取るには？</h2>
<p>居宅外で月20日以上・月160時間以上勤務している場合が最高の10点です。父母ともにこの条件を満たせば基本合計点数は20点になります。</p>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },

  // 6. ひとり親家庭の加点
  {
    slug: "single-parent-advantage",
    citySlug: "hakodate",
    title: "函館市のひとり親家庭は保育園入園で有利？ 加算+13点の効果",
    description:
      "函館市ではひとり親家庭に+13の加算があります。加算の仕組みと申請時の注意点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親家庭の加算は+13点</h2>
<p>函館市の利用調整では、ひとり親家庭に<span class="highlight">+13点</span>の加算があります。これは全加算項目の中で最も大きい点数です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本点数の最大が父母合計20点であるのに対し、ひとり親加算は+13点。基本点数が片方分（最大10点）でも加算により総合点数で上位に入れる可能性があります。</p>
</div>

<h2>ひとり親家庭の点数シミュレーション</h2>
<table>
<tr><th>ケース</th><th>基本点数</th><th>加算</th><th>総合点数</th></tr>
<tr><td>ひとり親・フルタイム就労</td><td>10</td><td>+13</td><td>23</td></tr>
<tr><td>ひとり親・フルタイム＋育休復帰</td><td>10</td><td>+13+4=17</td><td>27</td></tr>
<tr><td>両親・両方フルタイム</td><td>20</td><td>0</td><td>20</td></tr>
<tr><td>両親・両方フルタイム＋きょうだい在園</td><td>20</td><td>+5</td><td>25</td></tr>
</table>

<h2>同点の場合もひとり親は優先</h2>
<p>総合点数が同じ場合の優先順位でも、ひとり親家庭は第3位に設定されています。障がい児・きょうだい在園に次ぐ優先度です。</p>

<h2>申請時に必要な書類</h2>
<ul>
<li>戸籍謄本（ひとり親であることの証明）</li>
<li>児童扶養手当証書のコピー（お持ちの場合）</li>
</ul>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>ひとり親家庭の支援制度については、函館市子ども未来部にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // 7. 保育士加点
  {
    slug: "hoikushi-kasanten",
    citySlug: "hakodate",
    title: "函館市で保育士が保育園に子どもを預ける場合の加点+10",
    description:
      "函館市では保護者が保育所等で保育士として勤務している場合、+10の大きな加点があります。条件と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保育士加点とは？</h2>
<p>函館市では、保護者が保育所等で保育士として従事している場合に<span class="highlight">+10点</span>の加算があります。ひとり親加算（+13）に次ぐ大きな加算です。</p>

<h2>加算の条件</h2>
<ul>
<li>保護者が保育所等で保育士として勤務していること</li>
<li>保育士資格を持っていること</li>
</ul>

<h2>点数シミュレーション</h2>
<table>
<tr><th>ケース</th><th>基本点数</th><th>加算</th><th>総合点数</th></tr>
<tr><td>保育士（フルタイム）＋配偶者フルタイム</td><td>20</td><td>+10</td><td>30</td></tr>
<tr><td>保育士＋配偶者フルタイム＋きょうだい在園</td><td>20</td><td>+10+5=15</td><td>35</td></tr>
<tr><td>両親フルタイム（保育士でない）</td><td>20</td><td>0</td><td>20</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育士不足対策として設けられた加算です。保育士として復職予定の方も該当する場合がありますので、子どもサービス課にご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },

  // 8. 減点項目の注意
  {
    slug: "minus-points-warning",
    citySlug: "hakodate",
    title: "函館市の保育園入園で減点される2つのケースと対策",
    description:
      "函館市の入園選考では同居親族の状況によって減点されることがあります。減点条件と対処法を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "amber",
    content: `<h2>函館市で減点される2つのケース</h2>
<p>函館市の利用調整基準には、加算だけでなく<strong>減点</strong>項目もあります。知らないと想定より低い点数になってしまうため注意が必要です。</p>

<h3>減点1：65歳未満の同居親族がいる場合（-1点）</h3>
<p>保育できる65歳未満の親族（祖父母など）が同居している場合、-1点が適用されます。「その親族が保育できる状態にある」場合が対象です。</p>

<h3>減点2：同居親族が他の子どもを保育している場合（-1点）</h3>
<p>65歳未満の同居親族や保護者が、入園希望の子ども以外の子どもを保育している場合にも-1点です。</p>

<h2>両方該当すると-2点</h2>
<p>上記2つは重複するため、両方に該当すると合計-2点になります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>年齢は保育所等の利用希望日時点で判定されます。親族が65歳以上であれば減点の対象外です。</p>
</div>

<h2>対策</h2>
<ul>
<li>同居親族が就労中や療養中の場合は、その証明書類を提出することで減点が回避できる可能性があります</li>
<li>同居親族の年齢や就労状況を事前に確認し、子どもサービス課に相談しましょう</li>
</ul>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },

  // 9. 待機児童と対策
  {
    slug: "waiting-list-tips",
    citySlug: "hakodate",
    title: "函館市の保育園に落ちたら？ 待機中にできること",
    description:
      "函館市で保育園の内定がもらえなかった場合の対処法と、待機期間中にできる加点対策を紹介します。",
    image:
      "https://images.unsplash.com/photo-1484981138541-3d074aa97571?w=800&h=400&fit=crop",
    category: "保活テクニック",
    categoryColor: "amber",
    content: `<h2>入園できなかった場合の選択肢</h2>
<p>函館市で認可保育園に入れなかった場合でも、いくつかの選択肢があります。</p>

<h3>1. 二次募集に申し込む</h3>
<p>一次選考で定員に達しなかった園は二次募集を行います。希望園を変更して申し込むことも可能です。</p>

<h3>2. 認可外保育施設を利用する</h3>
<p>認可外保育施設に預けながら認可園の空きを待つ方法です。認可外に預けた実績があると、次回の申請で有利になる場合があります。</p>

<h3>3. 年度途中の入園を狙う</h3>
<p>転勤や転居で空きが出ることがあります。毎月の入園申込みを継続して行いましょう。</p>

<h2>待機6か月以上で+1点加算</h2>
<p>函館市では待機期間が6か月以上になると<span class="highlight">+1点</span>の加算があります。小さな加点ですが、同点時の差を生む可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>待機中も申込みを継続していることが条件です。申込みの有効期限が切れていないか定期的に確認しましょう。</p>
</div>

<h2>希望園の見直し</h2>
<ul>
<li>人気園だけでなく、駅から少し離れた園も検討する</li>
<li>小規模保育事業（0〜2歳対象）も選択肢に入れる</li>
<li>認定こども園の保育機能部分も対象</li>
</ul>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },

  // 10. 必要書類まとめ
  {
    slug: "required-documents",
    citySlug: "hakodate",
    title: "函館市の保育園入園に必要な書類一覧　申請前にチェック",
    description:
      "函館市の保育園入園申込みに必要な書類を一覧にまとめました。事由別に必要な証明書もわかります。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "teal",
    content: `<h2>全員が必要な書類</h2>
<ul>
<li>教育・保育給付認定申請書 兼 利用申込書</li>
<li>保育が必要な理由を証明する書類（父母それぞれ）</li>
<li>マイナンバー関連書類</li>
</ul>

<h2>保育が必要な理由別の証明書類</h2>
<table>
<tr><th>理由</th><th>必要書類</th></tr>
<tr><td>就労（会社勤務）</td><td>就労証明書（勤務先が記入）</td></tr>
<tr><td>就労（自営業）</td><td>就労証明書＋確定申告書の写し等</td></tr>
<tr><td>妊娠・出産</td><td>母子手帳の写し</td></tr>
<tr><td>疾病・負傷</td><td>診断書</td></tr>
<tr><td>障がい</td><td>障害者手帳・療育手帳の写し</td></tr>
<tr><td>介護・看護</td><td>介護・看護に関する申立書、被介護者の診断書等</td></tr>
<tr><td>就学</td><td>在学証明書・時間割等</td></tr>
<tr><td>求職活動</td><td>求職活動申立書</td></tr>
</table>

<h2>加算に必要な書類</h2>
<table>
<tr><th>加算項目</th><th>必要書類</th></tr>
<tr><td>ひとり親家庭</td><td>戸籍謄本、児童扶養手当証書等</td></tr>
<tr><td>産休・育休明け復職</td><td>復職証明書・育休終了届等</td></tr>
<tr><td>障がいのある子ども</td><td>障害者手帳・診断書等</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書は勤務先に記入してもらうため、時間がかかる場合があります。早めに依頼しましょう。</p>
</div>

<div class="info-box">
<p><strong>書類の入手先</strong></p>
<p>申請書類は函館市子どもサービス課の窓口または<a href="https://www.city.hakodate.hokkaido.jp/docs/2017051700061/" target="_blank" rel="noopener">函館市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
];

registerArticles(articles);
