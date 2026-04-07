import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "nishitokyo",
    title: "西東京市の保活スケジュール　申込から内定までの流れ",
    description:
      "西東京市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>西東京市の4月入園スケジュール</h2>
<p>西東京市の認可保育園は毎年11月頃に翌年度4月入園の一次募集を受付けます。子育て支援部 保育課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>西東京市の公式サイトで保育施設の一覧や前年度の入園案内を確認します。西東京市は2001年に保谷市と田無市が合併して誕生した市で、約50か所の認可保育園があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。旧保谷エリア・旧田無エリアそれぞれに園が分散しています。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：入園案内入手・書類準備</strong>
<p>最新の入園案内を入手し、就労証明書などの必要書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月：申込書類の提出</strong>
<p>子育て支援部 保育課へ提出します。郵送または窓口で受付けます。</p>
</div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>1月下旬〜2月：結果通知</strong>
<p>一次選考の結果が届きます。不承諾の場合は二次募集への申込みを検討しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>西東京市は基本指数が父母各最大20点（合計40点満点）です。就労は月あたりの勤務日数と週あたりの労働時間の組合せで判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.nishitokyo.lg.jp/kosodate/hoikuen/" target="_blank" rel="noopener">西東京市公式サイト 保育園のページ</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "nishitokyo",
    title: "西東京市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "西東京市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>西東京市の選考指数とは</h2>
<p>西東京市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。基本指数は父母それぞれに算出され、合算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>西東京市の基本指数は保育が必要な理由に応じて判定されます。就労の場合はフルタイム（月20日以上・週40時間以上）で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>保育が必要な理由</th><th>最大指数</th></tr>
<tr><td>就労（月20日以上・週40時間以上）</td><td>20</td></tr>
<tr><td>疾病（入院・常時臥床）</td><td>20</td></tr>
<tr><td>障害（身体1〜2級等）</td><td>20</td></tr>
<tr><td>介護・看護（週40時間以上）</td><td>20</td></tr>
<tr><td>就学（週40時間以上）</td><td>20</td></tr>
<tr><td>災害復旧</td><td>20</td></tr>
<tr><td>出産前後2か月</td><td>16</td></tr>
<tr><td>求職活動中</td><td>6</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+6点</span></li>
<li>認可外保育施設利用（月ぎめ・月64時間以上）：<span class="highlight">+4点</span></li>
<li>きょうだいが認可保育園に在園中：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>同時申込み（双子等）：<span class="highlight">+2点</span></li>
<li>育休復帰予定：<span class="highlight">+2点</span></li>
<li>保育士として市内施設に就労予定：<span class="highlight">+2点</span></li>
<li>継続就労1年以上（父母とも）：<span class="highlight">+1点</span></li>
</ul>

<h2>減点項目にも注意</h2>
<ul>
<li>市外からの申込み：<span class="highlight">-10点</span></li>
<li>転園申込み：<span class="highlight">-5点</span></li>
<li>65歳未満の同居親族が保育可能：<span class="highlight">-3点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.nishitokyo.lg.jp/kosodate/hoikuen/" target="_blank" rel="noopener">西東京市公式サイト 保育施設入園案内</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "work-points-detail",
    citySlug: "nishitokyo",
    title: "西東京市の就労状況別の点数　勤務日数と時間の組合せ",
    description:
      "西東京市の保育園入園で就労状況に応じた基本指数の点数を詳しく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>就労の基本指数一覧</h2>
<p>西東京市では就労の基本指数を月あたりの勤務日数と週あたりの労働時間の組合せで判定します。多くの自治体が週の就労時間だけで判定するのに対し、西東京市は勤務日数も条件に含まれるのが特徴です。</p>

<table>
<tr><th>勤務条件</th><th>指数</th></tr>
<tr><td>月20日以上かつ週40時間以上</td><td>20</td></tr>
<tr><td>月16日以上かつ週40時間未満</td><td>18</td></tr>
<tr><td>月16日以上かつ週30時間以上</td><td>16</td></tr>
<tr><td>月12日以上かつ週24時間以上</td><td>14</td></tr>
<tr><td>月12日以上かつ週16時間以上</td><td>12</td></tr>
<tr><td>月12日以上かつ週16時間未満</td><td>10</td></tr>
<tr><td>内職（月64時間以上）</td><td>8</td></tr>
</table>

<h2>勤務パターン別の点数</h2>
<table>
<tr><th>勤務パターン例</th><th>月の日数</th><th>週の時間</th><th>指数</th></tr>
<tr><td>週5日×8時間（フルタイム）</td><td>月20日以上</td><td>週40時間以上</td><td>20</td></tr>
<tr><td>週5日×7時間（時短）</td><td>月20日以上</td><td>週35時間</td><td>18</td></tr>
<tr><td>週4日×8時間</td><td>月16日以上</td><td>週32時間</td><td>16</td></tr>
<tr><td>週4日×6時間</td><td>月16日以上</td><td>週24時間</td><td>14</td></tr>
<tr><td>週3日×6時間</td><td>月12日以上</td><td>週18時間</td><td>12</td></tr>
<tr><td>週3日×4時間</td><td>月12日以上</td><td>週12時間</td><td>10</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働きの場合は父母とも20点で基本指数40点です。時短勤務で週35時間の場合は18点になるため、共働きでも合計38点となり2点の差が生じます。</p>
</div>

<h2>パートタイムでも入園は可能？</h2>
<p>週3日・1日6時間のパート勤務でも基本指数12点が付きます。フルタイム20点との差は8点ですが、0歳児クラスや新設園なら定員に余裕があるケースもあります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://www.city.nishitokyo.lg.jp/kosodate/hoikuen/" target="_blank" rel="noopener">西東京市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "adjustment-points",
    citySlug: "nishitokyo",
    title: "西東京市の調整指数で加点するテクニック　差がつくポイント",
    description:
      "西東京市の保育園入園で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>西東京市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の部分です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+6</td><td>ひとり親世帯であること</td></tr>
<tr><td>認可外利用</td><td>+4</td><td>認可外保育施設に月ぎめ・月64時間以上預けている</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護を受給している</td></tr>
<tr><td>同時申込み</td><td>+2</td><td>双子等の同時申込み</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>入園月に育児休業から復帰予定</td></tr>
<tr><td>保育士就労</td><td>+2</td><td>保育士として市内保育施設に就労予定</td></tr>
<tr><td>継続就労</td><td>+1</td><td>父母とも1年以上継続して就労</td></tr>
</table>

<h2>認可外保育施設の活用</h2>
<p>西東京市では認可外保育施設に月ぎめで月64時間以上預けていると<span class="highlight">+4点</span>の加点が得られます。認証保育所やベビーシッターの月ぎめ利用も対象になる場合があります。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>東京都に届出済みの認可外保育施設や、西東京市近隣の認証保育所を探しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>月ぎめ契約で月64時間以上の利用</strong>
<p>一時保育やスポット利用は対象外です。月ぎめ契約で月64時間以上の利用が条件です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>利用証明書を取得</strong>
<p>施設から利用証明書を発行してもらい、入園申込時に提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>継続就労の+1点は見落としがちですが、父母ともに1年以上同じ勤務先で働いていれば自動的に該当します。確実に申告しましょう。</p>
</div>

<h2>減点を避ける</h2>
<p>市外在住（-10点）・転園（-5点）・65歳未満同居親族の保育可能（-3点）に注意してください。転入予定がある場合は転入届のタイミングも考慮しましょう。</p>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "required-documents",
    citySlug: "nishitokyo",
    title: "西東京市の保育園申込み　必要書類チェックリスト",
    description:
      "西東京市の認可保育園の入園申込みに必要な書類を一覧でまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>全員が提出する書類</h2>
<ul>
<li>保育施設等入園申込書（市の様式）</li>
<li>家庭の状況に関する調書</li>
<li>保育が必要な理由を証明する書類（就労証明書など）</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類（運転免許証など）</li>
</ul>

<h2>保育が必要な理由別の書類</h2>
<table>
<tr><th>理由</th><th>必要書類</th></tr>
<tr><td>就労</td><td>就労証明書（勤務先に記入してもらう）</td></tr>
<tr><td>自営業</td><td>就労証明書＋確定申告書の写し等</td></tr>
<tr><td>疾病</td><td>診断書（市の様式）</td></tr>
<tr><td>障害</td><td>障害者手帳・愛の手帳・精神障害者保健福祉手帳の写し</td></tr>
<tr><td>介護・看護</td><td>介護・看護に関する申告書＋対象者の診断書等</td></tr>
<tr><td>出産</td><td>母子健康手帳の写し</td></tr>
<tr><td>就学</td><td>在学証明書＋カリキュラム等</td></tr>
<tr><td>求職活動</td><td>求職活動に関する申告書</td></tr>
</table>

<h2>調整指数の加点に必要な書類</h2>
<table>
<tr><th>加点項目</th><th>必要書類</th></tr>
<tr><td>ひとり親</td><td>児童扶養手当証書の写し等</td></tr>
<tr><td>認可外利用</td><td>認可外保育施設の利用証明書</td></tr>
<tr><td>生活保護</td><td>生活保護受給証明書</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先に記入してもらう必要があるため、申込締切の1か月前には依頼しましょう。繁忙期は発行に2週間以上かかることもあります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の書類様式は<a href="https://www.city.nishitokyo.lg.jp/kosodate/hoikuen/" target="_blank" rel="noopener">西東京市公式サイト 保育園のページ</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "nursery-types",
    citySlug: "nishitokyo",
    title: "西東京市の保育施設の種類と選び方ガイド",
    description:
      "西東京市にある保育施設の種類（認可・認証・小規模など）と選び方のポイントを解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>西東京市の保育施設の種類</h2>
<p>西東京市には約50か所の認可保育園があり、それ以外にも認証保育所や小規模保育事業所などがあります。</p>

<h3>認可保育園</h3>
<p>国の基準を満たした保育施設で、市が利用調整を行います。公立保育園と私立保育園があり、保育料は世帯の所得に応じて決まります。西東京市では最も施設数が多く、選択肢が豊富です。</p>

<h3>小規模保育事業所（地域型保育）</h3>
<p>0〜2歳児を対象とした定員19人以下の施設です。3歳以降は連携園や他の保育園に転園する必要があります。比較的入りやすい傾向があります。</p>

<h3>認証保育所</h3>
<p>東京都独自の制度で、認可保育園より設置基準が緩やかです。保育料は施設が設定しますが、西東京市から保育料の補助を受けられる場合があります。認可外加点の対象にもなります。</p>

<h3>家庭的保育事業（保育ママ）</h3>
<p>保育者の自宅等で少人数の子どもを預かります。0〜2歳児が対象です。</p>

<h2>選び方のポイント</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>通園のしやすさ</strong>
<p>自宅からの距離だけでなく、通勤経路上にあるかどうかも重要です。西東京市は西武池袋線・西武新宿線が通っており、駅周辺の園は便利です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>保育時間</strong>
<p>延長保育の有無や時間帯を確認しましょう。園によって朝7時〜夜8時まで対応しているところもあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>入りやすさ</strong>
<p>人気園は競争率が高いため、複数の園を希望に書きましょう。新設園や小規模保育は比較的入りやすい傾向があります。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>希望園は多めに書いても不利にはなりません。通える範囲の園はすべて記入しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "age-class-competition",
    citySlug: "nishitokyo",
    title: "西東京市の年齢別クラスの倍率と入りやすさ",
    description:
      "西東京市の保育園は年齢クラスによって入りやすさが違います。0歳〜5歳の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>年齢クラスごとの傾向</h2>
<p>西東京市の認可保育園は年齢クラスによって募集数と競争率が大きく異なります。</p>

<h3>0歳児クラス（4月1日時点で0歳）</h3>
<p>産休・育休明けで入園を希望する世帯が多いクラスです。定員は各園6〜12名程度で、募集枠は比較的あります。フルタイム共働きの基本指数40点があれば入れるケースが多いです。</p>

<h3>1歳児クラス（最も競争が激しい）</h3>
<p>育休を1年取ってから入園を希望する世帯が集中するクラスです。0歳児からの持ち上がりで募集枠が少なくなるため、最も競争が激しくなります。調整指数の加点が勝負を分けます。</p>

<h3>2歳児クラス</h3>
<p>1歳児で入れなかった世帯が再チャレンジするクラスです。小規模保育事業所からの卒園児が連携園に移るため、一般枠は少ないことがあります。</p>

<h3>3歳児クラス（3歳の壁）</h3>
<p>小規模保育や保育ママの卒園児が転園してくるクラスです。幼稚園への移行もあり、比較的空きが出やすい園もあります。</p>

<h3>4〜5歳児クラス</h3>
<p>退園による空きが出た場合のみ募集されます。募集がない園も多いですが、空きがあれば入りやすいです。</p>

<table>
<tr><th>クラス</th><th>競争度</th><th>目安の点数</th></tr>
<tr><td>0歳児</td><td>やや高い</td><td>40点前後</td></tr>
<tr><td>1歳児</td><td>非常に高い</td><td>41〜44点以上</td></tr>
<tr><td>2歳児</td><td>高い</td><td>40〜42点</td></tr>
<tr><td>3歳児</td><td>普通</td><td>40点前後</td></tr>
<tr><td>4〜5歳児</td><td>低い（空きがあれば）</td><td>40点前後</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1歳児クラスの入園を目指す場合は、認可外保育施設の利用で+4点の加点を確保しておくと安心です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>園別の募集数は<a href="https://www.city.nishitokyo.lg.jp/kosodate/hoikuen/" target="_blank" rel="noopener">西東京市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "dual-income-strategy",
    citySlug: "nishitokyo",
    title: "西東京市の共働き世帯の保活戦略　40点からの上乗せ",
    description:
      "西東京市でフルタイム共働き世帯が保活を成功させるための戦略を解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>フルタイム共働きは40点</h2>
<p>西東京市でフルタイム共働き（父母とも月20日以上・週40時間以上）の場合、基本指数は<span class="highlight">40点</span>です。人気の園や1歳児クラスでは40点だけでは入れないケースもあるため、調整指数で差をつける必要があります。</p>

<h2>現実的に狙える加点</h2>
<table>
<tr><th>項目</th><th>点数</th><th>対策</th></tr>
<tr><td>認可外利用</td><td>+4</td><td>認証保育所や認可外施設を月ぎめで利用する</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>上の子が認可保育園に通っていれば自動的に加点</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>入園月に育休から復帰する計画を立てる</td></tr>
<tr><td>継続就労</td><td>+1</td><td>父母とも1年以上の継続就労を証明する</td></tr>
</table>

<h2>加点なしでも入れる？</h2>
<p>0歳児クラスや新設園、旧保谷エリアの一部の園では基本指数40点のみでも入園できるケースがあります。ただし1歳児クラスの人気園では加点がないと厳しいのが現実です。</p>

<h2>時短勤務の場合</h2>
<p>育休復帰後に時短勤務を予定している場合、基本指数は復帰後の勤務時間で判定されます。週35時間の時短なら18点（-2点）です。入園申込時点では育休中のため、復帰後の予定勤務時間で就労証明書を記入してもらいましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設の+4点は共働き世帯が現実的に取れる最大の加点です。費用はかかりますが、1歳児クラスの競争を考えると投資の価値があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の詳細は<a href="https://www.city.nishitokyo.lg.jp/kosodate/hoikuen/" target="_blank" rel="noopener">西東京市 保育施設入園案内</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-support",
    citySlug: "nishitokyo",
    title: "西東京市のひとり親世帯の加点と支援制度",
    description:
      "西東京市でひとり親世帯が保育園入園で受けられる加点と利用できる支援制度を解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の調整指数</h2>
<p>西東京市ではひとり親世帯に<span class="highlight">+6点</span>の調整指数が加算されます。基本指数と合わせると、フルタイム就労のひとり親世帯は20点（基本）+6点（調整）=26点が一人分の点数になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯の場合、保護者2の基本指数は0点です。そのため合計は20+0+6=26点となります。フルタイム共働き世帯の40点と比べると低くなりますが、同点時の優先順位でひとり親世帯が優先されるケースがあります。</p>
</div>

<h2>ひとり親世帯の証明書類</h2>
<ul>
<li>児童扶養手当証書の写し</li>
<li>戸籍謄本（ひとり親であることを証明）</li>
<li>住民票（同居者の確認）</li>
</ul>

<h2>西東京市のひとり親支援制度</h2>
<h3>保育料の減免</h3>
<p>ひとり親世帯は保育料が減額されるケースがあります。市民税非課税世帯は保育料が無料になります。</p>

<h3>児童扶養手当</h3>
<p>ひとり親世帯に支給される手当です。所得に応じて月額最大約44,000円が支給されます。</p>

<h3>ひとり親家庭等医療費助成</h3>
<p>ひとり親家庭の親と子どもの医療費の自己負担分が助成されます。</p>

<h3>就労支援</h3>
<p>母子・父子自立支援員による就労相談や、自立支援教育訓練給付金などの制度があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親支援の詳細は<a href="https://www.city.nishitokyo.lg.jp/kosodate/" target="_blank" rel="noopener">西東京市 子育て支援のページ</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "waiting-child-status",
    citySlug: "nishitokyo",
    title: "西東京市の待機児童の最新状況と今後の見通し",
    description:
      "西東京市の待機児童数の推移と保育施設の整備状況、今後の見通しをまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>西東京市の待機児童の状況</h2>
<p>西東京市は人口約20万人の市で、2001年に保谷市と田無市が合併して誕生しました。子育て世代も多く、保育需要は高い水準にあります。</p>

<p>近年は認可保育園の新設や定員拡大により、待機児童数は減少傾向にあります。しかし1歳児クラスを中心に、希望する園に入れない「隠れ待機児童」は依然として存在します。</p>

<h2>地域別の傾向</h2>
<h3>旧田無エリア（田無駅・西武柳沢駅周辺）</h3>
<p>田無駅周辺はマンション開発が進み、若い世帯の流入が続いています。駅近くの園は競争率が高い傾向があります。</p>

<h3>旧保谷エリア（保谷駅・ひばりヶ丘駅周辺）</h3>
<p>ひばりヶ丘駅周辺は近年の再開発で人口が増加しています。保谷駅周辺は比較的落ち着いたエリアですが、園の数も限られます。</p>

<h3>東伏見・西武柳沢エリア</h3>
<p>駅から離れた住宅地では園の定員に余裕があるケースもあります。自転車通園が可能なら選択肢が広がります。</p>

<h2>保育施設の整備状況</h2>
<ul>
<li>認可保育園：約50か所</li>
<li>小規模保育事業所：複数か所</li>
<li>認証保育所：複数か所</li>
<li>家庭的保育事業：複数か所</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新設園は初年度に空きが出やすいため、保活では要チェックです。西東京市の最新の募集数は公式サイトで確認できます。</p>
</div>

<h2>今後の見通し</h2>
<p>西東京市は子ども・子育て支援事業計画に基づき、保育の受け皿の確保を進めています。少子化の影響で0歳児の申込みは減少傾向にありますが、1歳児の需要は依然として高い状況です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育園情報は<a href="https://www.city.nishitokyo.lg.jp/kosodate/hoikuen/" target="_blank" rel="noopener">西東京市公式サイト 保育園のページ</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
];

registerArticles(articles);
