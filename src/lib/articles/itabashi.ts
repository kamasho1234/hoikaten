import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 1. 保活スケジュール =====
  {
    slug: "hokatsu-schedule",
    citySlug: "itabashi",
    title: "板橋区の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "板橋区の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>板橋区の4月入園は<strong>一次選考</strong>と<strong>二次選考</strong>の2回に分かれています。早めにスケジュールを把握して動き出すことが保活成功のカギです。</p>

<h3>一次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>

<h3>二次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年1月下旬〜2月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>板橋区では郵送のほか、マイナポータル（ぴったりサービス）による電子申請も利用可能です。窓口に行かなくてもスマホで24時間申請できます。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>板橋区の保育施設の種類やエリアごとの特徴を調べましょう。前年度の「保育利用の手引」も参考になります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に見学予約を入れましょう。この時期が見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：「保育利用の手引」を入手</strong>
<p>板橋区が毎年発行する保活の必読資料です。保育サービス課や区内の福祉事務所、図書館などで配布されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。書類不備があると選考に影響するため、早めに確認しましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.itabashi.tokyo.jp/kosodate/azukeru/ninka/1058692/index.html" target="_blank" rel="noopener">板橋区公式サイト「令和8年度入所案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  // ===== 2. 入園点数のしくみ =====
  {
    slug: "scoring-system-guide",
    citySlug: "itabashi",
    title: "板橋区の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "板橋区の保育園入園選考で使われる基本指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>板橋区の保育園入園は「先着順」でも「抽選」でもなく、<strong>点数（指数）の高い順</strong>に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 保護者1の基本指数 ＋ 保護者2の基本指数 ＋ 調整指数</p>
</div>

<h2>基本指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">30点</span>で、父母合計の最大は<span class="highlight">60点</span>です。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月20日以上・日中8時間以上</td><td>30</td></tr>
<tr><td>月20日以上・日中6時間以上8時間未満</td><td>28</td></tr>
<tr><td>月20日以上・日中4時間以上6時間未満</td><td>26</td></tr>
<tr><td>月16日以上・日中8時間以上</td><td>24</td></tr>
<tr><td>月16日以上・日中6時間以上8時間未満</td><td>22</td></tr>
<tr><td>月16日以上・日中4時間以上6時間未満</td><td>20</td></tr>
<tr><td>月12日以上・日中4時間以上</td><td>18</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>15</td></tr>
</table>

<p>就労以外にも、疾病（最大30点）、障害（最大30点）、介護（最大30点）、出産前後（30点）、就学（最大30点）、求職活動（12点）が基本指数の対象です。</p>

<h2>調整指数とは？</h2>
<p>基本指数に加算・減算される点数です。板橋区では「保護者個人にかかわるもの」と「世帯にかかわるもの」の2種類があります。</p>

<h3>主な加算項目</h3>
<ul>
<li>ひとり親世帯：基本指数に<span class="highlight">+30点</span></li>
<li>きょうだいが認可園に在園中：<span class="highlight">+3点</span></li>
<li>認可外保育施設に月ぎめで利用中：<span class="highlight">+2点</span></li>
<li>育休明けに入園月で復職予定：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>3人以上の子どもを養育：<span class="highlight">+1点</span></li>
<li>生活保護受給中：<span class="highlight">+3点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数の全項目は<a href="https://www.city.itabashi.tokyo.jp/kosodate/azukeru/ninka/1058692/1058694.html" target="_blank" rel="noopener">板橋区「保育利用の手引」</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  // ===== 3. 点数を上げるコツ =====
  {
    slug: "score-up-tips",
    citySlug: "itabashi",
    title: "板橋区で点数を1点でも上げるコツ　加点チェックリスト",
    description:
      "板橋区の入園選考で使える加点を漏れなく活用するためのチェックリストと実践的なコツを紹介します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>1点の差が明暗を分ける</h2>
<p>板橋区の入園選考では、フルタイム共働きの基本指数<span class="highlight">60点</span>がボーダーラインの目安です。人気園ではこの60点に調整指数の加点を上乗せした世帯が集中するため、取れる加点を漏れなく確保することが大切です。</p>

<h2>加点チェックリスト</h2>
<ul>
<li>きょうだいが認可園に在園中 → <span class="highlight">+3点</span></li>
<li>生活保護受給中 → <span class="highlight">+3点</span></li>
<li>きょうだいと同時申込 → <span class="highlight">+2点</span></li>
<li>認可外保育施設に月ぎめで預けている（月48時間以上） → <span class="highlight">+2点</span></li>
<li>育休・産休から入園月に復職予定 → <span class="highlight">+2点</span></li>
<li>3人以上の子どもを養育 → <span class="highlight">+1点</span></li>
</ul>

<h2>実践的なコツ</h2>
<h3>認可外利用で+2点を狙う</h3>
<p>認可外保育施設（認証保育所・ベビーシッターなど）に月48時間以上、有償で預けている実績があると調整指数が+2点されます。一次選考の不承諾後に認可外に預けて、翌年度に再申請する方法もあります。</p>

<h3>就労時間を確認する</h3>
<p>基本指数は就労時間で大きく変わります。月20日以上・8時間以上で30点ですが、6時間以上8時間未満だと28点に下がります。就労証明書の記載内容を事前に確認しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>虚偽の申告が判明した場合、内定取消や退園の対象となります。該当する加点のみ申請してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>調整指数の全項目は<a href="https://www.city.itabashi.tokyo.jp/kosodate/azukeru/ninka/1058692/1058694.html" target="_blank" rel="noopener">板橋区「保育利用の手引」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  // ===== 4. 同点時の優先順位 =====
  {
    slug: "tiebreaker-guide",
    citySlug: "itabashi",
    title: "板橋区で同点になったらどうなる？　優先順位のしくみ",
    description:
      "板橋区の保育園入園選考で同点になった場合の優先順位ルールを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同じ点数でも差がつく理由</h2>
<p>板橋区の入園選考では、選考指数が同点の世帯が複数いる場合、あらかじめ定められた<strong>優先順位</strong>に従って入園者が決まります。点数だけでなく、この優先順位の仕組みを理解しておくことが重要です。</p>

<h2>板橋区の主な優先順位</h2>
<p>板橋区の「保育利用の手引」によると、同一指数の場合は以下のような順番で優先されます。</p>

<ol>
<li><strong>板橋区在住</strong>（転入予定者を含む）であること</li>
<li><strong>ひとり親世帯</strong>（母子世帯・父子世帯）であること</li>
<li><strong>基本指数が高い世帯</strong>が優先される</li>
<li>養育している子どもの数が多い世帯</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3番目の「基本指数が高い世帯」は重要です。たとえば同じ60点でも「基本指数60点＋調整指数0点」の世帯は「基本指数58点＋調整指数2点」の世帯より優先されます。つまり、フルタイム共働きで基本指数をしっかり確保することが有利に働きます。</p>
</div>

<h2>優先順位で差をつけるには</h2>
<ul>
<li>就労証明書に記載される勤務時間・日数を正確に把握する</li>
<li>フルタイム勤務（月20日以上・8時間以上 = 30点）を維持できるか確認する</li>
<li>希望園の過去の入所最低指数を確認して、現実的な志望先を選ぶ</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>優先順位の全項目は<a href="https://www.city.itabashi.tokyo.jp/kosodate/azukeru/ninka/1058692/1058694.html" target="_blank" rel="noopener">板橋区「保育利用の手引」</a>に掲載されています。詳細はそちらをご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 48,
  },
  // ===== 5. 時短と点数 =====
  {
    slug: "jitan-and-score",
    citySlug: "itabashi",
    title: "板橋区で時短勤務だと点数はどうなる？　不利にならない方法",
    description:
      "板橋区の保育園入園選考で時短勤務が点数に与える影響と、不利にならないためのポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本指数</h2>
<p>板橋区の基本指数は、就労日数と就労時間の組み合わせで決まります。フルタイム（月20日以上・8時間以上）なら<span class="highlight">30点</span>ですが、時短で6時間勤務になると<span class="highlight">28点</span>に下がります。</p>

<table>
<tr><th>勤務パターン</th><th>基本指数</th></tr>
<tr><td>月20日以上・8時間以上（フルタイム）</td><td>30点</td></tr>
<tr><td>月20日以上・6時間以上8時間未満（時短6h）</td><td>28点</td></tr>
<tr><td>月20日以上・4時間以上6時間未満（時短5h）</td><td>26点</td></tr>
</table>

<p>夫婦ともにフルタイムなら合計60点ですが、片方が6時間の時短勤務だと合計58点になり、<span class="highlight">2点の差</span>が生まれます。</p>

<h2>育児短時間勤務制度を使っている場合</h2>
<p>板橋区では、育児のための短時間勤務制度を利用している場合、<strong>時短取得前の本来の労働時間</strong>で基本指数が認定されるケースがあります。条件として、育児短時間勤務が月12日以上・日中6時間以上であることが求められます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書には「所定労働時間」と「育児短時間勤務後の労働時間」の両方を記載する欄があります。会社に正確に記入してもらうことが大切です。</p>
</div>

<h2>時短でも不利にならないために</h2>
<ul>
<li>育児短時間勤務制度の利用であれば、本来の就労時間で認定される可能性がある</li>
<li>就労証明書の記載内容を事前に会社と確認する</li>
<li>不明な点は板橋区保育サービス課（03-3579-2452）に個別に相談する</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>制度の適用条件は年度によって変わることがあります。最新の取り扱いは必ず板橋区に直接確認してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  // ===== 6. 落ちたときの選択肢 =====
  {
    slug: "after-rejection",
    citySlug: "itabashi",
    title: "板橋区で保育園に落ちたらどうする？　次にやるべきこと",
    description:
      "板橋区の認可保育園に不承諾となった場合の選択肢と、次の一手を具体的に解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾通知が届いたら</h2>
<p>一次選考で不承諾（落選）の通知が届いても、まだ手段は残っています。落ち着いて次の行動に移りましょう。</p>

<h2>選択肢1：二次選考に申し込む</h2>
<p>板橋区では一次選考で辞退者が出た場合、空きのある園で<strong>二次選考</strong>が行われます。令和8年度は1月下旬〜2月上旬が申込期間です。二次選考の空き状況一覧は板橋区公式サイトで公表されます。</p>

<h2>選択肢2：認証保育所・認可外施設を探す</h2>
<p>認可園の結果が出る時期は、認証保育所や認可外施設にも空きが出やすい時期です。施設に直接問い合わせて申し込みましょう。</p>
<p>なお、認可外に月ぎめで預けた実績があると、翌年度の認可園申請で調整指数<span class="highlight">+2点</span>の加点がつきます。</p>

<h2>選択肢3：毎月の空き状況を確認する</h2>
<p>4月以降も毎月の入所受付が行われています。転勤などで空きが出ることがあるため、<a href="https://www.city.itabashi.tokyo.jp/kosodate/azukeru/ninka/1058692/index.html" target="_blank" rel="noopener">板橋区の空き状況一覧</a>を定期的に確認しましょう。</p>

<h2>選択肢4：育休を延長する</h2>
<p>不承諾通知は育休延長の根拠書類になります。会社に相談して育休を延長し、翌年度に再チャレンジする方法もあります。</p>

<h2>選択肢5：小規模保育を検討する</h2>
<p>0〜2歳児対象の小規模保育事業は、比較的入りやすい傾向があります。板橋区では卒園時に連携施設への優先利用調整も行っています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>翌年度の再申請では、認可外利用の加点（+2点）と育休明け復職の加点（+2点）を組み合わせることで、合計4点のプラスが見込めます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 52,
  },
  // ===== 7. 認可外で加点 =====
  {
    slug: "ninkagai-katen",
    citySlug: "itabashi",
    title: "板橋区で認可外を使って加点する方法　認証保育所との違いも解説",
    description:
      "板橋区で認可外保育施設の利用実績による加点を得る方法と、認証保育所の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用で調整指数+2点</h2>
<p>板橋区では、認可外保育施設（認証保育所・ベビーシッターなど）に<strong>月48時間以上</strong>、有償で月ぎめ契約をして預けている場合、調整指数が<span class="highlight">+2点</span>加算されます。</p>

<h2>認可・認証・認可外の違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認証保育所</th><th>認可外保育施設</th></tr>
<tr><td>設置基準</td><td>国の基準</td><td>東京都独自の基準</td><td>都道府県に届出</td></tr>
<tr><td>保育料</td><td>所得に応じて決定</td><td>上限あり（都が設定）</td><td>施設が自由に設定</td></tr>
<tr><td>申込先</td><td>板橋区役所</td><td>施設に直接</td><td>施設に直接</td></tr>
<tr><td>認可園申請時の加点</td><td>-</td><td>+2点</td><td>+2点</td></tr>
</table>

<h2>加点を得るための手順</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>施設を探す</strong>
<p>板橋区内の認証保育所は<a href="https://www.city.itabashi.tokyo.jp/kosodate/azukeru/1039607/1039617.html" target="_blank" rel="noopener">板橋区公式サイトの認証保育所一覧</a>で確認できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>月ぎめ契約で預ける</strong>
<p>月48時間以上の利用が加点の条件です。一時保育では加点対象になりません。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>在園証明書を取得する</strong>
<p>認可園の申込時に、利用中の施設から在園証明書をもらって提出します。</p>
</div>
</div>

<h2>認証保育所の保育料助成</h2>
<p>板橋区では、認証保育所を利用する保護者に対して保育料の負担軽減助成制度を設けています。詳細は板橋区公式サイトで確認してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請すると、認可外利用の加点（+2点）に加えて育休明け復職の加点（+2点）も得られる可能性があります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  // ===== 8. 来年度の変更点 =====
  {
    slug: "next-year-changes",
    citySlug: "itabashi",
    title: "板橋区の令和8年度入園　前年度からの変更点まとめ",
    description:
      "板橋区の令和8年度（2026年度）保育園入園で押さえておきたい変更点と新制度を解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度の主な変更点</h2>
<p>板橋区の保育園入園制度は毎年見直しが行われています。令和8年度（2026年度）の入園に関して確認しておきたいポイントをまとめました。</p>

<h3>こども誰でも通園制度の本格実施</h3>
<p>令和8年度から全国の自治体で<strong>「こども誰でも通園制度」</strong>が本格実施されます。板橋区でも対象施設が決定しています。</p>
<ul>
<li>対象：生後6か月〜3歳未満で、認可保育施設に在籍していない子ども</li>
<li>利用時間：1人あたり月10時間まで</li>
<li>費用：1時間あたり300円（板橋区在住者は自己負担0円の見込み）</li>
</ul>
<p>この制度は認可保育園の入園選考とは別の仕組みです。保育の必要性の認定がなくても利用できます。</p>

<h3>電子申請の拡充</h3>
<p>板橋区ではマイナポータル（ぴったりサービス）を使った電子申請が利用可能です。窓口に行かずにスマホやパソコンから24時間申請できます。</p>

<h2>毎年必ず確認すべきこと</h2>
<ul>
<li>「保育利用の手引」の最新版を入手して指数表の変更を確認する</li>
<li>新設園・閉園の情報をチェックする</li>
<li>前年度の入所最低指数一覧で各園のボーダーラインを把握する</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>指数表や調整指数の項目・点数は年度によって変更されることがあります。必ず最新の「保育利用の手引」で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.itabashi.tokyo.jp/kosodate/azukeru/ninka/1058692/1058694.html" target="_blank" rel="noopener">板橋区「令和8年度 保育利用の手引」</a>をご確認ください。こども誰でも通園制度については<a href="https://www.city.itabashi.tokyo.jp/kosodate/azukeru/1060865/index.html" target="_blank" rel="noopener">板橋区公式サイト</a>をご覧ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 42,
  },
  // ===== 9. 人気エリア =====
  {
    slug: "popular-areas",
    citySlug: "itabashi",
    title: "板橋区の保育園　エリア別の入りやすさと人気エリアの特徴",
    description:
      "板橋区内のエリアごとの保育園の特徴と入りやすさの傾向を、入所最低指数をもとに解説します。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>板橋区は23区の中では入りやすい</h2>
<p>板橋区は令和4年（2022年）から<strong>待機児童ゼロ</strong>を連続で達成しており、東京23区の中では比較的保育園に入りやすい区です。ただし、エリアや年齢クラスによって競争率に差があります。</p>

<h2>競争率が高いエリア</h2>
<h3>板橋・大山エリア</h3>
<p>東武東上線の大山駅周辺はファミリー層に人気の商店街エリアです。駅近の認可園は人気が集中しやすく、入所最低指数が高めになる傾向があります。</p>

<h3>成増エリア</h3>
<p>成増駅・地下鉄成増駅周辺は閑静な住宅街で、子育て世帯に人気があります。人気園は62点以上のボーダーになることもあります。</p>

<h2>比較的入りやすいエリア</h2>
<h3>高島平エリア</h3>
<p>大規模団地が広がるエリアで、保育園の数が多く空きが出やすい傾向があります。0歳児クラスでは欠員が出る園もあります。</p>

<h3>新河岸・舟渡エリア</h3>
<p>区の北西部に位置し、新設園もあるため比較的入りやすいエリアです。</p>

<h2>1歳児クラスが最も厳しい</h2>
<p>板橋区でも全国的な傾向と同様に、<strong>1歳児クラス</strong>の入園が最も難しくなっています。0歳児クラスで入園を検討するのもひとつの戦略です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>板橋区は毎年「4月入所の入所最低指数一覧」を公式サイトで公表しています。園ごとのボーダーラインを確認して、志望先を検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>入所最低指数一覧は<a href="https://www.city.itabashi.tokyo.jp/kosodate/azukeru/ninka/1022874.html" target="_blank" rel="noopener">板橋区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 47,
  },
  // ===== 10. 入園競争の実態 =====
  {
    slug: "competition-reality",
    citySlug: "itabashi",
    title: "板橋区の保育園入園競争の実態　何点あれば入れる？",
    description:
      "板橋区の保育園入園に実際に必要な点数の目安と、入所最低指数から見える競争の実態を解説します。",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>板橋区は「入りやすい区」は本当？</h2>
<p>板橋区は待機児童ゼロを達成しており、23区の中では保育園に入りにくい自治体の下位（18位前後）に位置しています。しかし「どこでも入れる」わけではありません。</p>

<h2>入所最低指数の目安</h2>
<p>板橋区が公表している入所最低指数一覧を見ると、園ごとのボーダーラインがわかります。</p>

<table>
<tr><th>年齢クラス</th><th>ボーダーの目安</th></tr>
<tr><td>0歳児</td><td>欠員のある園もあり、60点前後で入れるケースが多い</td></tr>
<tr><td>1歳児</td><td>人気園は62点以上、一部の園では60点でも可</td></tr>
<tr><td>2歳児</td><td>募集枠が少なく、園による差が大きい</td></tr>
<tr><td>3歳児以上</td><td>空きが出やすく、比較的入りやすい</td></tr>
</table>

<h2>フルタイム共働き60点で安心できる？</h2>
<p>フルタイム共働き（父母とも30点）の基本指数60点は最低ラインです。人気園では60点だけでは足りず、調整指数の加点を含めて<span class="highlight">62〜63点</span>が必要になるケースもあります。</p>

<h2>実態として押さえておくべきこと</h2>
<ul>
<li>1歳児クラスは最も激戦。0歳児での入園を検討する価値がある</li>
<li>きょうだい加点（+3点）のある世帯は大きなアドバンテージを持つ</li>
<li>高島平・新河岸エリアなど、エリアを広げれば選択肢が増える</li>
<li>希望園は人気園だけでなく、小規模保育や新設園も含めて幅広く書く</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>板橋区は毎年「4月入所の入所最低指数一覧」を公式サイトで公表しています。自分の点数と照らし合わせて、現実的な志望園を選びましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>過去の入所最低指数は<a href="https://www.city.itabashi.tokyo.jp/kosodate/azukeru/ninka/1022874.html" target="_blank" rel="noopener">板橋区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 58,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "itabashi",
    title: "板橋区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "板橋区の認可保育園の保育料を年収・子ども数別に詳しく解説。区民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>板橋区の保育料はどうやって決まる？</h2>
<p>板橋区の認可保育園の保育料（利用者負担額）は、<strong>世帯の区民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

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
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は板橋区の公式保育料表をご確認ください。</p>

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
<p>毎年6月ごろ、前年度の区民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は板橋区担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は板橋区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "itabashi",
    title: "板橋区の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "板橋区の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>板橋区の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。板橋区では副食費として月額4,500円程度が別途かかります。</p>

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
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は板橋区公式サイトでご確認ください。</p>

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
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。板橋区担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は板橋区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
