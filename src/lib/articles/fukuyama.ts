import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 点数・選考 (3) =====
  {
    slug: "scoring-system-guide",
    citySlug: "fukuyama",
    title: "福山市の利用調整のしくみ｜基準数と調整数をやさしく解説",
    description:
      "福山市の保育園入園選考で使われる「基準数」と「調整数」の仕組みを初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整とは？</h2>
<p>福山市の保育園入園は「先着順」ではなく、<strong>利用調整</strong>により入園が決まります。入所可能人数を超えた申込みがあった場合に、指数の高い順に内定が出ます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>指数 ＝ 基準数（父＋母の合算） ＋ 調整数</p>
</div>

<h2>基準数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を指数化したものです。福山市の特徴は、<span class="highlight">父母の基準数を合算</span>して世帯の基準数とすることです。</p>
<p>該当する理由が複数ある場合は、指数が高いもの1つだけを使います。</p>

<h3>就労の場合の基準数ランク</h3>
<table>
<tr><th>月の就労時間（休憩含む）</th><th>ランク</th></tr>
<tr><td>160時間以上</td><td>最高</td></tr>
<tr><td>140時間以上160時間未満</td><td>高</td></tr>
<tr><td>120時間以上140時間未満</td><td>↑</td></tr>
<tr><td>100時間以上120時間未満</td><td>中</td></tr>
<tr><td>80時間以上100時間未満</td><td>↓</td></tr>
<tr><td>48時間以上80時間未満</td><td>低</td></tr>
<tr><td>内職・自営補助者</td><td>最低</td></tr>
</table>

<h2>調整数とは？</h2>
<p>世帯の特別な事情に応じて加算（または減算）される指数です。代表的なものは以下の通りです。</p>

<h3>加点項目（高い順）</h3>
<ul>
<li>保護者の予期せぬ不存在（死亡・失踪など）</li>
<li>ひとり親世帯</li>
<li>離婚前提の別居等でひとり親に準ずる世帯</li>
<li>生活保護世帯</li>
<li>保育士として市内保育所等に就労</li>
<li>きょうだいの申込み</li>
<li>産休・育休明けの職場復帰</li>
<li>障がい児・医療的ケア児の申込み</li>
<li>多胎児が同一施設を希望</li>
<li>単身赴任</li>
</ul>

<h3>減点項目</h3>
<ul>
<li>就労予定（転入の主たる生計維持者を除く）</li>
<li>自己都合による入所決定後の取下げ</li>
<li>保育料等の滞納</li>
<li>認定等に関する過去の不正</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>福山市は具体的な点数値を公開しておらず、「高⇅低」の相対的なランクで基準を示しています。正確な指数は保育施設課にお問い合わせください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の基準（要旨）は<a href="https://www.city.fukuyama.hiroshima.jp/soshiki/hoikushisetsu/275318.html" target="_blank" rel="noopener">福山市公式サイト（PDF）</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "score-up-checklist",
    citySlug: "fukuyama",
    title: "福山市で調整数を最大化する方法｜加点チェックリスト",
    description:
      "福山市の入園選考で調整数の加点を最大限に活用する方法をチェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整数の加点を漏れなく確認しよう</h2>
<p>福山市の入園選考では、基準数が同じ世帯同士の競争になることが多いため、<span class="highlight">調整数の差</span>が合否を左右します。該当する項目がないか確認しましょう。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>優先度</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>高</td><td>母子及び父子並びに寡婦福祉法に該当</td></tr>
<tr><td>保育士として市内保育所等に就労</td><td>高</td><td>入所児童が増加する場合</td></tr>
<tr><td>きょうだいの申込み</td><td>中</td><td>里子を含むきょうだいの同時申込み</td></tr>
<tr><td>産休・育休明け復職</td><td>中</td><td>雇用形態の変更を伴わないこと</td></tr>
<tr><td>多胎児の同一施設希望</td><td>低</td><td>双子・三つ子等が同じ保育所等を希望</td></tr>
<tr><td>単身赴任</td><td>低</td><td>保護者間で補完的な保育ができない場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>複数の項目に該当する場合は、それぞれの調整数が加算されます。見落としがないか一つずつ確認しましょう。</p>
</div>

<h2>減点にも注意</h2>
<p>調整数には減点項目もあります。保育料の滞納や過去の自己都合による取下げは減点対象です。</p>
<ul>
<li><strong>保育料の滞納</strong>：納付誓約を行っていない・履行していない場合は減点</li>
<li><strong>過去の取下げ</strong>：入所決定後に自己都合で辞退した場合は減点（病気等やむを得ない場合を除く）</li>
<li><strong>過去の不正</strong>：認定等に関する不正があり解消が確認できていない場合は減点</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の基準は<a href="https://www.city.fukuyama.hiroshima.jp/soshiki/hoikushisetsu/275318.html" target="_blank" rel="noopener">福山市「利用調整の基準（要旨）」（PDF）</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "special-admission",
    citySlug: "fukuyama",
    title: "福山市の「特別入所」とは？保育士特別・きょうだい特別を解説",
    description:
      "福山市独自の特別入所制度（保育士特別入所・きょうだい特別入所）の条件と仕組みを詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>特別入所とは？</h2>
<p>福山市には通常の利用調整とは別に、優先的に利用調整を行う<strong>「特別入所」</strong>制度があります。通常の利用調整よりも先に選考が行われるため、対象に該当すれば入園しやすくなります。</p>

<h2>（1）保育士特別入所</h2>
<p>保育士資格を持つ保護者が<strong>市内の保育所等に保育標準時間認定で就労</strong>する場合に利用できます。</p>
<ul>
<li>施設長の意見書が必要</li>
<li>入所可能人数の増加と安全な保育環境の維持が目的</li>
</ul>

<h2>（2）きょうだい特別入所</h2>
<p>きょうだい（里子を含む）が現に在籍する保育所等への申込み、または同一の保育所等への同時申込みが対象です。ただし以下の就労等要件を満たす必要があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい特別入所の要件（いずれかに該当）</p>
<ul>
<li>法定休憩を含む就労時間が月120時間以上（内職・自営補助者を除く）</li>
<li>就学・職業訓練時間が月120時間以上</li>
<li>産前・産後要件または病気・障がい要件に該当</li>
</ul>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだい特別入所では、通勤・通学時間は就労時間および就学時間から除かれます。実際の勤務時間・就学時間で判定されるのでご注意ください。</p>
</div>

<h2>（3）地域型保育事業のきょうだい特別入所</h2>
<p>地域型保育事業の在籍児童が3歳で卒園する際、弟妹が同じ地域型保育事業に在籍していて、きょうだい同時に連携施設への転所を希望する場合に利用できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.fukuyama.hiroshima.jp/soshiki/hoikushisetsu/275318.html" target="_blank" rel="noopener">福山市「利用調整の基準（要旨）」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },

  // ===== 保活の基本 (3) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "fukuyama",
    title: "福山市の保活スケジュール｜入園申込みの流れと時期",
    description:
      "福山市の保育園4月入園に向けた申込時期・選考・結果通知の流れを時系列でまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>4月入園の申込スケジュール</h2>
<p>福山市の4月入園は<strong>第一次受付</strong>と<strong>第二次受付</strong>に分かれています。第一次で定員に達しなかった園のみ第二次で追加募集されます。</p>

<h3>主な日程の目安</h3>
<table>
<tr><th>項目</th><th>時期</th></tr>
<tr><td>入所案内の配布開始</td><td>10月頃</td></tr>
<tr><td>第一次受付期間</td><td>11月上旬〜12月上旬</td></tr>
<tr><td>第一次結果通知</td><td>翌年2月頃</td></tr>
<tr><td>第二次受付期間</td><td>2月頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第一次受付で枠の大部分が埋まります。4月入園を目指すなら第一次の締切に必ず間に合わせましょう。</p>
</div>

<h2>提出先</h2>
<p>申込書類は<strong>第一希望の保育所等</strong>または<strong>保育施設課</strong>（本庁舎7階）に提出します。</p>

<h2>いつから動くべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>保育所等の種類やエリアを調べ、見学の予約を始めましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：施設見学</strong>
<p>気になる園を実際に見学。保育方針や通いやすさを確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：書類準備・申込</strong>
<p>就労証明書など必要書類を揃え、受付期間内に提出します。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込スケジュールは<a href="https://www.city.fukuyama.hiroshima.jp/soshiki/hoikushisetsu/347755.html" target="_blank" rel="noopener">福山市公式サイト「保育所等入所申込みについて」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "required-documents",
    citySlug: "fukuyama",
    title: "福山市の保育園申込みに必要な書類一覧",
    description:
      "福山市の保育園入園申込みで必要な書類を保育が必要な理由別にまとめました。準備もれを防ぎましょう。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>全員が提出する書類</h2>
<ul>
<li>教育・保育給付認定申請書兼保育所等入所申込書</li>
<li>保育が必要なことを証明する書類（父母それぞれ）</li>
<li>マイナンバー確認書類</li>
</ul>

<h2>保育が必要な理由別の書類</h2>
<table>
<tr><th>理由</th><th>必要な書類</th></tr>
<tr><td>就労</td><td>就労証明書（勤務先が記入）</td></tr>
<tr><td>産前・産後</td><td>母子健康手帳の写し</td></tr>
<tr><td>病気</td><td>診断書</td></tr>
<tr><td>障がい</td><td>障がい者手帳等の写し</td></tr>
<tr><td>介護</td><td>介護状況申告書・被介護者の診断書等</td></tr>
<tr><td>求職活動</td><td>求職活動状況申告書</td></tr>
<tr><td>就学</td><td>在学証明書・時間割の写し</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書は<strong>勤務先に記入してもらう書類</strong>です。作成に時間がかかることがあるため、受付開始の1か月前には依頼しておきましょう。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業の場合は就労証明書に加えて、開業届の写しや確定申告書の写しが求められることがあります。事前に保育施設課に確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込書類の様式は<a href="https://www.city.fukuyama.hiroshima.jp/soshiki/hoikushisetsu/347755.html" target="_blank" rel="noopener">福山市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "nursery-types",
    citySlug: "fukuyama",
    title: "福山市の保育施設の種類｜認可保育所・認定こども園・地域型の違い",
    description:
      "福山市で利用できる保育施設の種類と特徴の違いを、はじめて保活する方向けに解説します。",
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>福山市の保育施設の種類</h2>
<p>福山市で利用できる保育施設は主に以下の3種類です。すべて同じ利用調整のしくみで入園が決まります。</p>

<h3>1. 認可保育所</h3>
<p>0歳〜5歳の児童を対象とした、最も一般的な保育施設です。保育時間は最大11時間（標準時間）です。</p>

<h3>2. 認定こども園</h3>
<p>保育所と幼稚園の機能を併せ持つ施設です。保育認定（2号・3号）を受けた児童は保育所部分を利用します。</p>

<h3>3. 地域型保育事業</h3>
<p>0〜2歳の児童を対象とした小規模な保育施設です。以下の種類があります。</p>
<ul>
<li><strong>小規模保育事業</strong>：定員6〜19人の少人数保育</li>
<li><strong>家庭的保育事業</strong>：保育者の自宅等で行う保育（定員5人以下）</li>
<li><strong>事業所内保育事業</strong>：企業が設置し地域枠も受け入れる保育</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>地域型保育事業は3歳で卒園となるため、連携施設への転所が必要です。きょうだい特別入所の対象になる場合もあるので確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設の一覧は<a href="https://www.city.fukuyama.hiroshima.jp/site/kosodate/249.html" target="_blank" rel="noopener">福山市子育て支援サイト「保育所等とは」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },

  // ===== 認可外・その他 (2) =====
  {
    slug: "ninkagai-options",
    citySlug: "fukuyama",
    title: "認可外保育施設を「つなぎ」で使う戦略｜福山市の保活テクニック",
    description:
      "認可園に入れなかった場合に認可外保育施設を一時的に利用し、翌年度に認可園を目指す戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>「つなぎ利用」とは</h2>
<p>認可保育園に入れなかった場合、認可外保育施設を一時的に利用しながら、次の利用調整で認可園を目指す方法です。仕事に復帰する必要がある場合の現実的な選択肢です。</p>

<h2>つなぎ利用のメリット</h2>
<ul>
<li>予定通り仕事に復帰できる</li>
<li>翌年度の利用調整で「保育を利用中」として申込できる</li>
<li>子どもが集団生活に慣れる</li>
</ul>

<h2>費用面の負担軽減（幼児教育・保育の無償化）</h2>
<p>認可外保育施設の利用でも、保育の必要性の認定を受ければ以下の補助があります。</p>
<ul>
<li>3〜5歳児：月額37,000円まで無償化</li>
<li>0〜2歳児（住民税非課税世帯）：月額42,000円まで無償化</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>無償化の補助を受けるには「保育の必要性」の認定（新2号・新3号認定）が必要です。認可の不承諾通知を受けたら早めに手続きを行いましょう。</p>
</div>

<h2>認可園への再申込み</h2>
<p>認可外保育施設を利用しながら、翌年度の4月入園に改めて申込みます。途中入園にも毎月申し込めるので、空きが出た時点で転園が可能です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設を選ぶ際は、「指導監督基準を満たす旨の証明書」が交付されている施設を優先しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>福山市の保育施設情報は<a href="https://www.city.fukuyama.hiroshima.jp/site/kosodate/249.html" target="_blank" rel="noopener">福山市子育て支援サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ikukyuyoyaku",
    citySlug: "fukuyama",
    title: "福山市の育休予約枠とは？育休中の保活で使える制度を解説",
    description:
      "福山市独自の「育休予約枠」制度の条件と活用方法を育休中の保護者向けに解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "制度・手続き",
    categoryColor: "amber",
    content: `<h2>育休予約枠とは？</h2>
<p>福山市には<strong>育休予約枠</strong>という独自の制度があります。育児休業給付金または育児休業手当金の受給者で、<span class="highlight">職場に復帰する保護者の世帯</span>を対象とした年度内の入所予約枠です。</p>

<h2>対象となる条件</h2>
<ul>
<li>育児休業給付金または育児休業手当金を受給中</li>
<li>入園と同時に職場に復帰すること</li>
<li>第一次受付期間内に申込むこと</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休予約枠は<strong>第一次受付期間内の申込みに限られます</strong>。第二次受付では利用できません。</p>
</div>

<h2>4月1日入所枠との違い</h2>
<p>福山市にはもう一つ「4月1日入所枠」という制度があります。こちらは4月1日入所を希望する<strong>0歳児</strong>を対象とした入所枠です。育休予約枠とは対象年齢や目的が異なります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休予約枠を活用すれば、年度途中からの入園を計画的に確保できます。復帰時期が決まっている方は第一次受付で忘れずに申込みましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.fukuyama.hiroshima.jp/soshiki/hoikushisetsu/347755.html" target="_blank" rel="noopener">福山市公式サイト「保育所等入所申込みについて」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },

  // ===== エリア・園選び (1) =====
  {
    slug: "area-guide",
    citySlug: "fukuyama",
    title: "福山市のエリア別保育園事情｜入りやすい地域と激戦区",
    description:
      "福山市内の保育園の地域ごとの入りやすさや特徴を解説します。希望園選びの参考にしてください。",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop",
    category: "エリア・園選び",
    categoryColor: "rose",
    content: `<h2>福山市の保育園事情</h2>
<p>福山市は広島県東部の中核市で、人口約45万人。市内には多くの認可保育所・認定こども園があり、地域によって空き状況に差があります。</p>

<h2>エリアごとの傾向</h2>

<h3>駅前・中心部エリア</h3>
<p>福山駅周辺はマンション開発が進み、若い子育て世帯が増加しています。施設も多いですが、<span class="highlight">人気園は競争が激しい</span>傾向にあります。</p>

<h3>松永・今津エリア</h3>
<p>市の西部にあたるエリアで、住宅地が広がっています。施設数も多く、比較的バランスが取れています。</p>

<h3>北部・山間部エリア</h3>
<p>新市・神辺・芦田・駅家など市北部は比較的空きが出やすい傾向があります。ただし通勤経路を考慮した園選びが必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>希望園を選ぶ際は、自宅からの距離だけでなく通勤経路上の園も候補に入れると選択肢が広がります。</p>
</div>

<h2>希望園の書き方のコツ</h2>
<ul>
<li>第1希望は最も通わせたい園を記入</li>
<li>希望園は多めに記入する（空白を残さない）</li>
<li>通園可能な範囲の園を広く候補に入れる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育施設の一覧は<a href="https://www.city.fukuyama.hiroshima.jp/site/kosodate/249.html" target="_blank" rel="noopener">福山市子育て支援サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },

  // ===== 落ちたとき (1) =====
  {
    slug: "what-to-do-when-rejected",
    citySlug: "fukuyama",
    title: "福山市で保育園に落ちたら？不承諾後にやるべきこと",
    description:
      "福山市の保育園に入れなかった場合の次のステップ（途中入園申込・認可外利用・緊急入所など）を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "落ちたとき",
    categoryColor: "teal",
    content: `<h2>不承諾通知が届いたら</h2>
<p>第一次選考で入園が決まらなかった場合、まず落ち着いて次のアクションを確認しましょう。</p>

<h2>やるべきことリスト</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>第二次受付に申込む</strong>
<p>第一次選考後に空きがある園について追加募集が行われます。希望園を見直して第二次にも申し込みましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>途中入園の申込みを継続する</strong>
<p>5月以降の途中入園は毎月の利用調整で行われます。申込みを継続していれば、空きが出たタイミングで入園のチャンスがあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可外保育施設を検討する</strong>
<p>復帰期限がある場合は、認可外保育施設を「つなぎ」として利用する方法があります。</p>
</div>
</div>

<h2>緊急入所制度</h2>
<p>福山市には<strong>緊急入所</strong>の制度があります。通常の保育者の予期せぬ入院や転勤による転入など、予期しない事由で急に保育が必要になった場合が対象です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>緊急入所は「通常の入所日で対応できる場合」や「一方が求職活動の場合」は対象外です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾通知は育児休業の延長手続きにも使います。勤務先への提出が必要になることがあるため、大切に保管しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>途中入園や緊急入所については<a href="https://www.city.fukuyama.hiroshima.jp/soshiki/hoikushisetsu/" target="_blank" rel="noopener">福山市保育施設課</a>（電話：084-928-1047）にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
