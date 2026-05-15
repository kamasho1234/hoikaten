import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "tokorozawa",
    title: "所沢市の保活スケジュール完全ガイド　令和8年度4月入園の流れ",
    description:
      "所沢市の認可保育園の申込時期・選考の流れ・内定通知のタイミングをわかりやすく解説。令和8年度4月入園に向けたスケジュールをまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>所沢市の4月入園スケジュール</h2>
<p>所沢市の認可保育園への4月入園は、毎年秋ごろに申込受付が始まります。窓口は所沢市こども未来部保育幼稚園課です。</p>

<h3>大まかな流れ</h3>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>4月〜6月</td><td>情報収集・保育園見学の開始</td></tr>
<tr><td>9月〜10月</td><td>入園申請書類の配布開始</td></tr>
<tr><td>10月〜11月</td><td>一次申込の受付期間</td></tr>
<tr><td>1月下旬〜2月</td><td>一次選考の結果通知</td></tr>
<tr><td>2月〜3月</td><td>二次募集の受付・結果通知</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>所沢市では「保育園等入園のしおり」が毎年公開されます。最新のしおりは所沢市公式サイトからダウンロードできるので、必ず確認しましょう。</p>
</div>

<h2>年度途中の入園について</h2>
<p>4月以外の月でも、空きがあれば毎月入園の申込が可能です。入園希望月の前月10日ごろが締切になることが多いため、早めに保育幼稚園課へ確認してください。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>所沢市の公式サイトで前年度の入園案内を参考に準備を始めます。航空記念公園周辺など人気エリアの園は早めにリサーチしておきましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜10月：保育園見学</strong><p>気になる園を5〜10園ほどリストアップし、見学の予約を入れましょう。所沢市は認可保育園が約50か所あるため、通園しやすいエリアで絞り込むのがコツです。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備・提出</strong><p>勤務先に就労証明書の作成を依頼し、申込書を保育幼稚園課に提出します。</p></div>
</div>

<div class="info-box">
<p>所沢市の保育園の空き状況は市の公式サイトで毎月更新されています。希望する園に空きがあるかチェックしておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "tokorozawa",
    title: "所沢市の保育園入園点数の仕組みと計算方法",
    description:
      "所沢市の保育所入所基準指数表を元に、基本指数と調整指数の計算方法をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>所沢市の入所指数とは？</h2>
<p>所沢市では保育園の入園選考に「入所指数」を使います。入所指数は<strong>基本指数（父母合算）＋ 調整指数</strong>の合計で決まり、点数が高い世帯から順に入園が決定します。</p>

<h3>基本指数の仕組み</h3>
<p>基本指数は父母それぞれの状況に応じた点数を合算します。1人あたり最大20点、両親合わせて<strong>最大40点</strong>です。</p>

<table>
<tr><th>保育が必要な理由</th><th>指数の範囲</th></tr>
<tr><td>就労（外勤・自営等）</td><td>10〜20点</td></tr>
<tr><td>疾病</td><td>12〜20点</td></tr>
<tr><td>障害</td><td>12〜20点</td></tr>
<tr><td>介護・看護</td><td>12〜20点</td></tr>
<tr><td>出産</td><td>16点</td></tr>
<tr><td>就学</td><td>10〜20点</td></tr>
<tr><td>求職活動</td><td>6点</td></tr>
</table>

<div class="point-box">
<p><strong>計算例</strong></p>
<p>父：フルタイム就労（月20日以上・日8時間以上）= 20点<br>母：フルタイム就労（月20日以上・日8時間以上）= 20点<br>基本指数合計 = <strong>40点</strong></p>
</div>

<h3>調整指数とは</h3>
<p>世帯の状況に応じて加点・減点される指数です。ひとり親家庭（+5点）、きょうだい在園（+3点）、認可外利用（+3点）などがあります。一方、市外からの申込（-10点）や転園（-5点）は減点になります。</p>

<div class="info-box">
<p>所沢市は人口約34万人の埼玉県南西部の中核市です。認可保育園が約50か所あり、競争倍率はエリアによって大きく異なります。自分の点数を事前にシミュレーションしておくことが大切です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "work-points-detail",
    citySlug: "tokorozawa",
    title: "所沢市の就労点数を徹底解説　勤務日数と時間で何点になる？",
    description:
      "所沢市の保育園入園選考で最も重要な就労の基本指数について、勤務日数・勤務時間ごとの点数を詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>就労の基本指数一覧</h2>
<p>所沢市の就労に関する基本指数は、月あたりの勤務日数と1日あたりの勤務時間の組み合わせで決まります。</p>

<table>
<tr><th>勤務条件</th><th>指数</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td>20点</td></tr>
<tr><td>月20日以上かつ日6時間以上</td><td>18点</td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td>16点</td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td>14点</td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td>12点</td></tr>
<tr><td>月64時間以上</td><td>10点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム（月20日以上・日8時間以上）の場合は最大の20点です。父母ともにフルタイムなら基本指数だけで40点の満点になります。</p>
</div>

<h3>パートタイムの場合</h3>
<p>パートタイムでも月16日以上・日6時間以上であれば16点を確保できます。週4日×6時間程度の勤務が目安です。勤務時間が短くても月64時間以上であれば10点は得られます。</p>

<h3>就学の場合</h3>
<p>職業訓練校や大学等に通学している場合、就労と同じ基準で基本指数が算出されます。通学日数と時間で判定されるため、フルタイムの通学なら20点を得られます。</p>

<div class="info-box">
<p>就労証明書は勤務先に記入してもらう公式書類です。実際の勤務時間と証明書の内容が一致するよう、事前に確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "adjustment-points",
    citySlug: "tokorozawa",
    title: "所沢市の調整指数で差をつける　加点・減点の全項目を解説",
    description:
      "所沢市の保育園入園選考における調整指数の全項目を解説。ひとり親、きょうだい加点、認可外利用など、合法的に点数を上げる方法を紹介します。",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6e?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>調整指数で合否が分かれる</h2>
<p>所沢市ではフルタイム共働き世帯の基本指数はほとんど同じ40点になるため、<strong>調整指数の差が合否を左右</strong>します。</p>

<h3>加点項目一覧</h3>
<table>
<tr><th>項目</th><th>加点</th><th>条件</th></tr>
<tr><td>ひとり親家庭</td><td>+5</td><td>ひとり親であることの証明</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>認可外保育施設利用</td><td>+3</td><td>認可外に月極で在籍</td></tr>
<tr><td>生活保護世帯</td><td>+3</td><td>生活保護受給中</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td><td>きょうだいと同時に新規申請</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>入園月中に育休から復職予定</td></tr>
</table>

<div class="point-box">
<p><strong>効果的な戦略</strong></p>
<p>認可外保育施設に月極で在籍していると+3点の加点になります。認可に入れなかった場合のつなぎとして認可外を利用すれば、翌年度の選考で有利になります。</p>
</div>

<h3>減点項目に注意</h3>
<table>
<tr><th>項目</th><th>減点</th><th>条件</th></tr>
<tr><td>市外からの申込</td><td>-10</td><td>所沢市外に居住</td></tr>
<tr><td>転園</td><td>-5</td><td>認可保育園から別の認可保育園へ転園希望</td></tr>
<tr><td>同居親族</td><td>-3</td><td>保育可能な同居親族がいる</td></tr>
</table>

<div class="info-box">
<p>同居の祖父母がいる場合は-3点の減点になりますが、祖父母が就労している場合は就労証明書を提出することで減点を回避できる場合があります。保育幼稚園課に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "required-documents",
    citySlug: "tokorozawa",
    title: "所沢市の保育園申込に必要な書類一覧と準備のコツ",
    description:
      "所沢市の認可保育園に申し込む際に必要な書類を一覧でまとめました。就労証明書の注意点や書類不備を防ぐコツも解説します。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>必要書類の一覧</h2>
<p>所沢市の認可保育園に申し込む際は、以下の書類が必要です。所沢市こども未来部保育幼稚園課の窓口で提出します。</p>

<h3>全員が必要な書類</h3>
<table>
<tr><th>書類名</th><th>備考</th></tr>
<tr><td>教育・保育給付認定申請書（兼入園申込書）</td><td>市の公式サイトからダウンロード可能</td></tr>
<tr><td>保育を必要とする証明書（父・母それぞれ）</td><td>就労証明書・診断書など理由に応じた書類</td></tr>
<tr><td>マイナンバー確認書類</td><td>通知カードまたはマイナンバーカード</td></tr>
<tr><td>本人確認書類</td><td>運転免許証・パスポート等</td></tr>
</table>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>就労証明書の準備（2〜3週間前）</strong><p>勤務先の人事・総務部門に依頼します。所沢市指定の様式を使う必要があるため、事前にダウンロードして渡しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>希望園の決定</strong><p>見学を終えて希望順位を決めます。所沢市では複数の園を希望できるため、現実的に入れそうな園も含めて幅広く書くのがおすすめです。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>書類の最終チェック・提出</strong><p>記入漏れや押印忘れがないか確認してから提出します。不備があると受付してもらえない場合があります。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書の勤務時間は基本指数に直結します。実際の勤務時間と異なる記載にならないよう、人事担当者に正確な記入をお願いしましょう。</p>
</div>

<div class="info-box">
<p>調整指数の加点を受けるためには、それぞれの事由を証明する追加書類が必要です。ひとり親の場合は児童扶養手当証書、認可外利用の場合は在籍証明書などを準備してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "nursery-types",
    citySlug: "tokorozawa",
    title: "所沢市の保育施設の種類と選び方ガイド",
    description:
      "所沢市にある認可保育園・小規模保育・認定こども園・認可外保育施設の違いを比較。わが家に合った園の選び方を解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>所沢市の保育施設の種類</h2>
<p>所沢市には認可保育園を中心に、さまざまな種類の保育施設があります。それぞれの特徴を理解して、家庭に合った選択をしましょう。</p>

<table>
<tr><th>施設の種類</th><th>対象年齢</th><th>特徴</th></tr>
<tr><td>認可保育園</td><td>0〜5歳</td><td>市の利用調整で入園。保育料は所得に応じて決定</td></tr>
<tr><td>小規模保育事業</td><td>0〜2歳</td><td>定員6〜19人の少人数保育。3歳以降は転園が必要</td></tr>
<tr><td>認定こども園</td><td>0〜5歳</td><td>保育と教育を一体的に提供</td></tr>
<tr><td>認可外保育施設</td><td>施設による</td><td>各施設に直接申込。保育料は施設ごとに設定</td></tr>
<tr><td>家庭保育室</td><td>0〜2歳</td><td>保育者の自宅等で少人数保育</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>所沢市には認可保育園が約50か所あり、埼玉県南西部では施設数が比較的充実しています。所沢駅・新所沢駅・小手指駅の周辺はとくに人気が高いエリアです。</p>
</div>

<h2>認可と認可外の比較</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認可外保育施設</th></tr>
<tr><td>保育料</td><td>世帯の所得に応じて決定</td><td>施設ごとに設定（一般的に高め）</td></tr>
<tr><td>申込先</td><td>所沢市保育幼稚園課</td><td>各施設に直接</td></tr>
<tr><td>選考</td><td>入所指数による利用調整</td><td>先着順や面接が多い</td></tr>
<tr><td>無償化</td><td>3〜5歳児は無料</td><td>月額3.7万円まで補助</td></tr>
</table>

<div class="info-box">
<p>認可外保育施設に在籍していると調整指数で+3点の加点があります。認可に入れなかった場合のつなぎとして認可外を活用し、翌年度に再チャレンジする家庭も多いです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "age-class-competition",
    citySlug: "tokorozawa",
    title: "所沢市の年齢別クラスの競争率と入りやすい年齢は？",
    description:
      "所沢市の認可保育園の年齢別クラスごとの競争率を分析。0歳・1歳・2歳・3歳のどのタイミングが入りやすいかを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>年齢クラスごとの傾向</h2>
<p>所沢市の認可保育園は、年齢クラスによって入りやすさが大きく異なります。一般的な傾向を確認しましょう。</p>

<table>
<tr><th>クラス</th><th>競争率</th><th>特徴</th></tr>
<tr><td>0歳児（生後57日〜）</td><td>やや高い</td><td>受入枠は少ないが申込も少なめ</td></tr>
<tr><td>1歳児</td><td>最も高い</td><td>育休明けの申込が集中する激戦クラス</td></tr>
<tr><td>2歳児</td><td>高い</td><td>小規模保育卒園児の転園需要あり</td></tr>
<tr><td>3歳児</td><td>やや低い</td><td>持ち上がりが多く新規枠は限られるが申込も減少</td></tr>
<tr><td>4〜5歳児</td><td>低い</td><td>空きがあれば入りやすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>所沢市でもっとも競争が激しいのは<strong>1歳児クラス</strong>です。育休を1年取得して復帰するパターンが多いため、申込が集中します。確実に入園したい場合は0歳児クラスでの申込も検討しましょう。</p>
</div>

<h2>エリアによる違い</h2>
<p>所沢駅・新所沢駅周辺は人気が高く競争率も上がります。一方、郊外の園は比較的空きが出やすい傾向があります。通勤ルート上の園も含めて幅広く検討するのがおすすめです。</p>

<h3>0歳児入園のメリット</h3>
<p>0歳児クラスは定員が少ないものの、新設枠として全員が新規入園になるため、1歳児クラスほどの激戦にはなりにくいケースもあります。生後57日から受入可能な園もあるため、早めの復帰を検討できる方には有力な選択肢です。</p>

<div class="info-box">
<p>所沢市では前年度の園別入園状況を公式サイトで公表しています。希望する園の前年度の最低点数を確認して、自分の点数と比較してみましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "dual-income-strategy",
    citySlug: "tokorozawa",
    title: "所沢市で共働き世帯が保活を成功させるための戦略",
    description:
      "所沢市のフルタイム共働き世帯が保育園に入園するための具体的な加点戦略と準備のコツを解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>共働き世帯の基本指数</h2>
<p>所沢市では父母ともにフルタイム（月20日以上・日8時間以上）の場合、基本指数は<strong>40点（満点）</strong>になります。多くの共働き世帯が40点で横並びになるため、調整指数と希望園の選び方が勝負を分けます。</p>

<div class="point-box">
<p><strong>40点からの上積み戦略</strong></p>
<p>基本指数40点 + 認可外利用3点 + 育休復帰2点 = <strong>45点</strong>。ここまで積み上げられれば、多くの園で入園の可能性が高まります。</p>
</div>

<h3>具体的にやるべきこと</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>認可外保育施設を押さえる</strong><p>認可に入れなかった場合のつなぎとして認可外に月極で預けると+3点の加点になります。人気の認可外は早めに見学・申込をしておきましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>育休復帰のタイミングを合わせる</strong><p>入園月中に育休から復職する場合は+2点の加点があります。4月入園の場合は4月中の復帰を勤務先と調整しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>希望園を幅広く書く</strong><p>人気園だけでなく、自宅から少し離れた園や新設園も候補に入れることで、入園の可能性を広げられます。</p></div>
</div>

<h2>減点を避ける</h2>
<p>同居の祖父母がいる場合は-3点の減点になる可能性があります。祖父母が就労している場合は就労証明書を提出して減点を回避しましょう。また、転園希望の場合は-5点の減点があるため、最初の園選びは慎重に行うことが大切です。</p>

<div class="info-box">
<p>所沢市は人口約34万人の中核市で、共働き世帯の増加に伴い保育需要も高まっています。航空記念公園周辺や駅近の園はとくに競争が激しいため、余裕をもって準備を始めましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-support",
    citySlug: "tokorozawa",
    title: "所沢市のひとり親世帯の保育園入園と支援制度まとめ",
    description:
      "所沢市のひとり親家庭が利用できる保育園の優先入園制度や各種支援策を解説。調整指数の加点や保育料の減免制度も紹介します。",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親家庭の入園選考での優遇</h2>
<p>所沢市では、ひとり親家庭に対して調整指数で<strong>+5点</strong>の加点があります。フルタイム就労（20点）の場合、基本指数20点 + ひとり親加点5点 = <strong>25点</strong>がベースになります。</p>

<div class="point-box">
<p><strong>加点を最大化するには</strong></p>
<p>ひとり親加点（+5点）に加え、認可外利用（+3点）や育休復帰（+2点）を組み合わせれば、共働き世帯の基本指数40点に近い水準を確保できます。</p>
</div>

<h2>ひとり親世帯向けの支援制度</h2>
<table>
<tr><th>制度</th><th>内容</th></tr>
<tr><td>児童扶養手当</td><td>所得に応じて月額最大44,140円を支給</td></tr>
<tr><td>ひとり親家庭等医療費助成</td><td>親と子の医療費の自己負担分を助成</td></tr>
<tr><td>保育料の軽減</td><td>住民税非課税世帯は保育料無料、課税世帯も軽減あり</td></tr>
<tr><td>就学援助</td><td>小中学校の学用品費・給食費等を援助</td></tr>
</table>

<h3>申請に必要な書類</h3>
<p>ひとり親の加点を受けるためには、児童扶養手当証書や戸籍謄本など、ひとり親であることを証明する書類が必要です。保育幼稚園課に事前に確認して、漏れなく準備しましょう。</p>

<div class="info-box">
<p>所沢市のひとり親世帯向けの相談窓口は、こども未来部こども支援課です。保育園の入園だけでなく、生活全般の支援についても相談できます。</p>
</div>

<h2>保育料の負担軽減</h2>
<p>3〜5歳児クラスは幼児教育・保育無償化により保育料が無料です。0〜2歳児クラスでも、住民税非課税世帯は無料になります。ひとり親世帯の多くが該当するため、保育料の心配は少ないケースが多いです。</p>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "waiting-child-status",
    citySlug: "tokorozawa",
    title: "所沢市の待機児童の最新状況と対策",
    description:
      "所沢市の待機児童数の推移と現在の状況を解説。待機児童になった場合の対応策や、入りやすいエリアの傾向も紹介します。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>所沢市の待機児童の状況</h2>
<p>所沢市は埼玉県南西部に位置する人口約34万人の中核市です。市は保育施設の整備を進めており、待機児童の解消に取り組んでいます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>国の定義による「待機児童」は減少傾向にありますが、希望する園に入れない「隠れ待機児童」は依然として存在します。とくに1歳児クラスと所沢駅周辺エリアは注意が必要です。</p>
</div>

<h2>エリア別の傾向</h2>
<table>
<tr><th>エリア</th><th>傾向</th></tr>
<tr><td>所沢駅・新所沢駅周辺</td><td>人気が高く競争率が高い</td></tr>
<tr><td>小手指駅周辺</td><td>やや競争率が高い</td></tr>
<tr><td>狭山ヶ丘・西所沢エリア</td><td>比較的空きが出やすい</td></tr>
<tr><td>三ヶ島・山口エリア</td><td>郊外のため比較的入りやすい</td></tr>
</table>

<h2>待機児童になったときの対処法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>二次募集に申し込む</strong><p>一次選考で不承諾の場合、二次募集で希望園の追加・変更を検討しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認可外保育施設を利用する</strong><p>認可外に月極で預ければ、翌年度の選考で+3点の加点が得られます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>年度途中の入園を狙う</strong><p>転勤や引越しで空きが出ることがあります。毎月の空き状況を市のサイトでチェックしましょう。</p></div>
</div>

<div class="info-box">
<p>所沢市では毎月の保育園の空き状況を公式サイトで公表しています。希望する園に空きが出たらすぐに申込できるよう、書類は常に最新の状態で準備しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
];

registerArticles(articles);
