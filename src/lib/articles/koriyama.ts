import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "koriyama",
    title: "郡山市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "郡山市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>郡山市の4月入園は<strong>1次募集</strong>と<strong>2次募集</strong>の2段階で行われます。</p>

<h3>申込から入所までの流れ</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>1次申込受付</td><td>令和7年11月頃〜12月上旬</td></tr>
<tr><td>1次結果通知</td><td>令和8年2月頃（郵送）</td></tr>
<tr><td>2次申込受付</td><td>1次終了後〜令和8年2月頃</td></tr>
<tr><td>2次結果通知</td><td>令和8年3月頃</td></tr>
<tr><td>途中入所</td><td>利用開始希望日の4か月前から前月5日まで</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>郡山市では利用開始希望日の4か月前から前月5日までに申請が必要です。4月入園は1次で申し込むのがもっとも選択肢が多く有利です。途中入所は毎月受付しています。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>郡山市の認可保育施設一覧や空き状況を公式サイトで確認しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>7月〜9月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。夏場がベストシーズンです。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備</strong><p>就労証明書を勤務先に依頼します。教育・保育給付認定申請書等が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月〜12月：1次申込</strong><p>こども育成課窓口で書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.koriyama.lg.jp/site/kosodate/7048.html" target="_blank" rel="noopener">郡山市公式サイト「認可保育施設入所の案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  // ===== 点数・選考 (2) =====
  {
    slug: "scoring-system-guide",
    citySlug: "koriyama",
    title: "郡山市の入園点数のしくみ　利用調整点数表をやさしく解説",
    description:
      "郡山市の保育園入園選考で使われる利用調整点数制度を初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整点数の全体像</h2>
<p>郡山市の認可保育施設は<strong>利用調整点数の高い世帯から優先</strong>して入所が決まります。</p>

<div class="point-box">
<p><strong>計算式</strong></p>
<p>利用調整点数 ＝ ⑤保護者等の就労状況等の点数（父＋母）＋ ⑥調整の点数</p>
</div>

<h2>⑤ 保護者等の就労状況等（基本点数）</h2>
<p>保護者それぞれの「保育を必要とする事由」に応じた点数が付きます。両親分を合算します。</p>
<table>
<tr><th>保育の事由</th><th>点数</th></tr>
<tr><td>就労：月140時間以上</td><td>200</td></tr>
<tr><td>就労：月110〜140時間未満</td><td>180</td></tr>
<tr><td>就労：月90〜110時間未満</td><td>160</td></tr>
<tr><td>就労：月80〜90時間未満</td><td>140</td></tr>
<tr><td>就労：月65〜80時間未満</td><td>120</td></tr>
<tr><td>就労：月52〜65時間未満</td><td>100</td></tr>
<tr><td>妊娠・出産</td><td>210</td></tr>
<tr><td>疾病（入院・自宅療養）</td><td>260</td></tr>
<tr><td>障害（手帳1級等）</td><td>260</td></tr>
<tr><td>不存在（行方不明等）</td><td>230</td></tr>
<tr><td>就学</td><td>200</td></tr>
<tr><td>求職活動</td><td>50</td></tr>
<tr><td>災害復旧</td><td>300</td></tr>
</table>

<h2>⑥ 調整点数（加算・減算）</h2>
<p>世帯の状況に応じて加算や減算が行われます。複数該当する場合は合算されます。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>3歳対象施設を希望</td><td>+250</td></tr>
<tr><td>退所後の再入所希望</td><td>+200</td></tr>
<tr><td>兄弟同時申請（同年齢）</td><td>+200</td></tr>
<tr><td>兄弟同時申請（異年齢）/兄弟在所中</td><td>+160</td></tr>
<tr><td>保育士等として勤務</td><td>+170</td></tr>
<tr><td>兄弟が自宅保育/幼稚園通園</td><td>-30</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>郡山市は他の自治体と比べて点数が大きいのが特徴です。フルタイム共働きの場合、基本点数だけで200×2＝400点になります。同点の場合は優先順位表（虐待・DV→疾病・障害→介護→ひとり親の順）で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.koriyama.lg.jp/site/kosodate/7048.html" target="_blank" rel="noopener">郡山市公式サイト「認可保育施設入所の案内」</a>で「事務取扱要領」PDFをご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  // ===== 保活の基本 (3) =====
  {
    slug: "required-documents",
    citySlug: "koriyama",
    title: "郡山市の保育園申込みに必要な書類一覧",
    description:
      "郡山市の認可保育園の申込みに必要な書類を一覧でまとめました。就労証明書や教育・保育給付認定申請書など、準備すべき書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込みに必要な書類</h2>
<p>郡山市の認可保育施設の申込みには、以下の書類が必要です。</p>

<h3>全員が必要な書類</h3>
<table>
<tr><th>書類名</th><th>備考</th></tr>
<tr><td>教育・保育給付認定申請書（兼保育利用申込書）</td><td>市HPまたは窓口で入手</td></tr>
<tr><td>保育の必要性を証明する書類</td><td>就労証明書・診断書等（保護者ごとに必要）</td></tr>
<tr><td>マイナンバーの確認書類</td><td>マイナンバーカードまたは通知カード</td></tr>
</table>

<h3>該当する場合に必要な書類</h3>
<table>
<tr><th>状況</th><th>必要書類</th></tr>
<tr><td>仕事をしている</td><td>就労証明書（勤務先に記入してもらう）</td></tr>
<tr><td>病気・障害がある</td><td>診断書または障害者手帳の写し</td></tr>
<tr><td>介護をしている</td><td>介護・看護状況申告書＋介護の必要性を証明する書類</td></tr>
<tr><td>出産前後</td><td>母子健康手帳の写し</td></tr>
<tr><td>求職活動中</td><td>求職活動申立書</td></tr>
<tr><td>ひとり親家庭</td><td>児童扶養手当証書等</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先に記入してもらう必要があるため、<strong>申込み1か月前</strong>には依頼しましょう。自営業の場合は開業届の写し等の添付が求められます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申請書類は<a href="https://www.city.koriyama.lg.jp/site/kosodate/7048.html" target="_blank" rel="noopener">郡山市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  // ===== 点数・選考 (4) =====
  {
    slug: "how-to-raise-score",
    citySlug: "koriyama",
    title: "郡山市で保育園の点数を上げるためにできること",
    description:
      "郡山市の保育園入園選考で点数を上げるためのポイントを解説します。加点項目の活用法や書類の書き方のコツをまとめました。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数を上げるための5つのポイント</h2>

<h3>1. 就労時間を月140時間以上にする</h3>
<p>郡山市では月140時間以上のフルタイム就労で最高の<span class="highlight">200点</span>が付きます。月110時間だと180点に下がるため、就労証明書に記載する時間が重要です。通勤時間は含まれませんが、残業時間は含めて計算されます。</p>

<h3>2. 兄弟加算を活用する</h3>
<p>きょうだいが同じ保育施設に在所中であれば<span class="highlight">+160点</span>、きょうだい同時入所申請なら<span class="highlight">+160〜200点</span>の大きな加点があります。きょうだいで同じ園を第1希望にするのが有利です。</p>

<h3>3. 退所後の再入所加算を確認する</h3>
<p>出産・育休で退所した後に再入所を希望する場合は<span class="highlight">+200点</span>の加算があります。これは非常に大きな加点ですので、退所前に必ず確認しましょう。</p>

<h3>4. 書類は正確に記入する</h3>
<p>就労証明書の勤務時間に誤りがあると本来より低い点数で判定される可能性があります。勤務先には正確な記入を依頼し、提出前に必ず確認しましょう。</p>

<h3>5. 希望園の選び方を工夫する</h3>
<p>競争率の高い園ばかりを希望すると入れない可能性があります。空き状況は郡山市公式サイトで公開されているので、事前に確認しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>郡山市では同点の場合、虐待・DV→疾病・障害→介護→ひとり親→転園希望→市内転入→世帯内の小学校以下の子どもの人数→経済的状況→保育状況→希望施設の希望通数→空き待ち期間→保育料の納付率の順で優先されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.koriyama.lg.jp/site/kosodate/21933.html" target="_blank" rel="noopener">郡山市公式サイト「認可保育施設の空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  // ===== 園の選び方 (5) =====
  {
    slug: "nursery-types",
    citySlug: "koriyama",
    title: "郡山市の保育施設の種類と選び方ガイド",
    description:
      "郡山市にある認可保育所・認定こども園・小規模保育事業所など、保育施設の種類と特徴をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "園の選び方",
    categoryColor: "purple",
    content: `<h2>郡山市の保育施設の種類</h2>
<p>郡山市には複数の種類の保育施設があります。それぞれの特徴を理解して、お子さんに合った施設を選びましょう。</p>

<h3>認可保育所</h3>
<p>0歳〜就学前の子どもを預かる施設です。郡山市には公立・私立あわせて多数の認可保育所があります。給食あり、保育時間は最長11時間です。</p>

<h3>認定こども園</h3>
<p>教育と保育を一体的に行う施設です。保育を必要とする子ども（2号・3号認定）も、教育のみの子ども（1号認定）も利用できます。</p>

<h3>小規模保育事業所</h3>
<p>0〜2歳児を対象とした定員19名以下の少人数施設です。3歳以降は連携施設への転所が基本です。郡山市では連携施設への転所に+250点の加算があるのが大きなメリットです。</p>

<h3>家庭的保育事業</h3>
<p>保育者の自宅等で少人数（定員5名以下）を保育する事業です。家庭的な雰囲気が特徴です。</p>

<div class="point-box">
<p><strong>選び方のコツ</strong></p>
<p>通勤経路上の園を選ぶと送迎の負担が減ります。見学時には保育方針・給食・延長保育の有無・行事の頻度などを確認しましょう。小規模保育事業所は3歳以降の連携先が確保されているかも重要なチェックポイントです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設一覧は<a href="https://www.city.koriyama.lg.jp/site/kosodate/7053.html" target="_blank" rel="noopener">郡山市公式サイト「認可保育施設情報」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  // ===== 保育料 (6) =====
  {
    slug: "hoikuryo-guide",
    citySlug: "koriyama",
    title: "郡山市の保育料はいくら？無償化と負担額をわかりやすく解説",
    description:
      "郡山市の認可保育園の保育料（利用者負担額）と幼児教育・保育の無償化について解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・保育料",
    categoryColor: "amber",
    content: `<h2>幼児教育・保育の無償化</h2>
<p>令和元年10月から、<strong>3〜5歳児</strong>の保育料は無償化されています。0〜2歳児は住民税非課税世帯のみ無償です。</p>

<h3>無償化の対象</h3>
<table>
<tr><th>年齢</th><th>保育料</th></tr>
<tr><td>3〜5歳児（2号認定）</td><td>無料</td></tr>
<tr><td>0〜2歳児（3号認定・非課税世帯）</td><td>無料</td></tr>
<tr><td>0〜2歳児（3号認定・課税世帯）</td><td>所得に応じた負担あり</td></tr>
</table>

<h2>0〜2歳児の保育料</h2>
<p>0〜2歳児の保育料は、保護者の市民税額と子どもの年齢に応じて決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は毎年9月に切り替わります。4〜8月は前年度の市民税額、9〜3月は当年度の市民税額で算定されます。第2子は半額、第3子以降は無料になる多子軽減もあります。</p>
</div>

<h2>保育料以外にかかる費用</h2>
<p>保育料が無償化されても、以下の実費は別途かかります。</p>
<table>
<tr><th>費目</th><th>目安</th></tr>
<tr><td>給食費（3〜5歳児の副食費）</td><td>月4,500円程度</td></tr>
<tr><td>延長保育料</td><td>園により異なる</td></tr>
<tr><td>教材費・行事費</td><td>園により異なる</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.koriyama.lg.jp/site/kosodate/7046.html" target="_blank" rel="noopener">郡山市公式サイト「保育料（利用者負担額）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  // ===== 点数・選考 (7) =====
  {
    slug: "tiebreaker-rules",
    citySlug: "koriyama",
    title: "郡山市で同点になったらどうなる？利用調整の優先順位を解説",
    description:
      "郡山市の保育園入園選考で同点になった場合の優先順位と判定基準を解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>郡山市では利用調整点数が同点の場合、利用調整会議で以下の順番に従って判定されます。</p>

<h3>優先順位表</h3>
<table>
<tr><th>順位</th><th>優先される条件</th></tr>
<tr><td>1</td><td>認定こども園で1号認定として利用中で、同施設で2号認定に変更を希望</td></tr>
<tr><td>2</td><td>保護者が郡山市の認可保育施設に保育士等として勤務中または勤務予定</td></tr>
<tr><td>3</td><td>保護者が郡山市の認可外保育施設または幼稚園に保育士等として勤務中または勤務予定</td></tr>
<tr><td>4</td><td>類型間の優先順位（災害復旧→疾病・障害→介護・看護→ひとり親→転園希望→市内転入等の順）</td></tr>
<tr><td>5</td><td>扶養している小学校以下の子どもの人数が多い</td></tr>
<tr><td>6</td><td>経済的状況（教育・保育給付認定保護者及び扶養義務者の市民税所得割額の合計）</td></tr>
<tr><td>7</td><td>保育状況（保育度合い・養育度合いの有無等）</td></tr>
<tr><td>8</td><td>当該施設の希望通数が多い</td></tr>
<tr><td>9</td><td>空き待ちの期間が長い</td></tr>
<tr><td>10</td><td>保育施設等に係る利用者負担額（保育料）の納付率</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点になった場合は上記の順で判定されますが、最も重要なのは「虐待・DV」の該当や「ひとり親」かどうかです。一般的な共働き世帯で差がつくのは、子どもの人数や所得水準（低い方が有利）です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  // ===== 園の選び方 (8) =====
  {
    slug: "popular-areas",
    citySlug: "koriyama",
    title: "郡山市で人気のエリアと保育園の空き状況の見方",
    description:
      "郡山市内で保育園の競争率が高いエリアと空き状況の確認方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    category: "園の選び方",
    categoryColor: "purple",
    content: `<h2>郡山市の保育園事情</h2>
<p>郡山市は福島県で最大の人口を擁する中核市で、子育て世代も多く、一部エリアでは保育施設の競争率が高くなっています。</p>

<h3>競争率が高めのエリア</h3>
<p>郡山駅周辺や大槻町・安積町エリアなど、住宅地が密集する地域は入所申込みが集中する傾向があります。特に0〜1歳児クラスは定員が少ないため、早めの準備が重要です。</p>

<h3>比較的入りやすいエリア</h3>
<p>郊外エリアや新設園の周辺は比較的入りやすい傾向があります。通勤経路上に郊外の園があれば選択肢として検討しましょう。</p>

<h2>空き状況の確認方法</h2>
<p>郡山市では公式サイトで認可保育施設の空き状況を定期的に公開しています。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>公式サイトで確認</strong><p>「認可保育施設の空き状況」ページで各園の年齢別空き状況を確認できます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>ここdeサーチで施設情報を確認</strong><p>WAM NETの「ここdeサーチ」で施設の詳細情報を検索できます。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.koriyama.lg.jp/site/kosodate/21933.html" target="_blank" rel="noopener">郡山市公式サイト「認可保育施設の空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  // ===== 保活の基本 (9) =====
  {
    slug: "途中入所-guide",
    citySlug: "koriyama",
    title: "郡山市で年度途中に保育園に入る方法",
    description:
      "郡山市で年度途中に認可保育園に入所するための申込方法・スケジュール・注意点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>年度途中入所の申込み</h2>
<p>郡山市では4月入園以外にも、毎月途中入所の申込みを受け付けています。</p>

<h3>申込みスケジュール</h3>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>申込期限</td><td>利用開始希望日の4か月前から前月5日まで</td></tr>
<tr><td>利用開始日</td><td>毎月1日</td></tr>
<tr><td>結果通知</td><td>利用開始日の前月下旬頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>途中入所は空きがある園のみが対象です。空き状況は月ごとに変動するので、こまめに確認しましょう。4月入園で保留になった場合は、自動的に空き待ちとなり毎月の利用調整の対象になります。</p>
</div>

<h2>途中入所の注意点</h2>
<p>途中入所は4月入園に比べて空きが少ないため、以下の点に注意しましょう。</p>
<ul>
<li>希望園を多めに記入する（第5希望まで記入可能）</li>
<li>小規模保育事業所も検討する</li>
<li>育休中の方は育休延長も視野に入れる</li>
<li>認可外保育施設を一時的に利用する選択肢も検討する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>途中入所の詳細は<a href="https://www.city.koriyama.lg.jp/site/kosodate/7048.html" target="_blank" rel="noopener">郡山市公式サイト「認可保育施設入所の案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  // ===== お金・保育料 (10) =====
  {
    slug: "taji-keigen",
    citySlug: "koriyama",
    title: "郡山市の多子軽減と保育料の減免制度まとめ",
    description:
      "郡山市の保育料の多子軽減制度（第2子半額・第3子無料）や減免制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop",
    category: "お金・保育料",
    categoryColor: "amber",
    content: `<h2>多子軽減制度</h2>
<p>郡山市では、きょうだいで保育施設を利用する場合に保育料が軽減されます。</p>

<h3>軽減の内容</h3>
<table>
<tr><th>対象</th><th>軽減内容</th></tr>
<tr><td>第2子</td><td>保育料が半額</td></tr>
<tr><td>第3子以降</td><td>保育料が無料</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児は保育料が無償化されているため、多子軽減が関係するのは<strong>0〜2歳児</strong>の保育料です。第2子の判定は、保護者と生計を一にする子のうち最年長の子から数えます。</p>
</div>

<h2>その他の減免・支援制度</h2>
<h3>副食費の免除</h3>
<p>3〜5歳児の副食費（おかず代）は、年収360万円未満相当世帯と第3子以降の子どもは免除されます。</p>

<h3>保育料の減免</h3>
<p>災害や失業など特別な事情がある場合は、保育料の減免を申請できる場合があります。詳しくはこども育成課にご相談ください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.koriyama.lg.jp/site/kosodate/7046.html" target="_blank" rel="noopener">郡山市公式サイト「保育料（利用者負担額）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
