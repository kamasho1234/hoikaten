import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kawagoe",
    title: "川越市の保活スケジュール完全ガイド",
    description:
      "川越市の認可保育園の申込時期・選考の流れ・内定通知のタイミングをわかりやすく解説。令和8年度4月入園に向けたスケジュールをまとめました。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>川越市の4月入園スケジュール</h2>
<p>川越市の認可保育園への4月入園は、毎年秋ごろに申込受付が始まります。川越市こども未来部保育課が窓口です。</p>

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
<p>川越市では「保育園等入園の手引き」が毎年公開されます。最新の手引きは川越市公式サイトからダウンロードできるので、必ず確認しましょう。</p>
</div>

<h2>年度途中の入園について</h2>
<p>4月以外の月でも、空きがあれば毎月入園の申込が可能です。入園希望月の前月10日ごろが締切になることが多いため、早めに保育課へ確認してください。</p>

<div class="info-box">
<p>川越市の保育園等の空き状況は、市の公式サイトで毎月更新されています。希望する園に空きがあるかチェックしておきましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 58,
  },
  {
    slug: "scoring-system",
    citySlug: "kawagoe",
    title: "川越市の保育園入園点数の仕組みと計算方法",
    description:
      "川越市の保育所入所基準指数表を元に、基準指数と調整指数の計算方法をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>川越市の入所指数とは？</h2>
<p>川越市では保育園の入園選考に「入所指数」を使います。入所指数は<strong>基準指数＋調整指数</strong>の合計で決まり、点数が高い人から順に入園が決定します。</p>

<h3>基準指数の仕組み</h3>
<p>基準指数は、父母それぞれの状況に応じた点数を合算して世帯の指数とします。複数の理由に該当する場合は、一番高い点数が適用されます。</p>

<table>
<tr><th>保育が必要な理由</th><th>指数の範囲</th></tr>
<tr><td>就労（外勤）</td><td>9〜21点</td></tr>
<tr><td>就労内定</td><td>8〜14点</td></tr>
<tr><td>疾病</td><td>22点</td></tr>
<tr><td>妊娠・出産</td><td>25点</td></tr>
<tr><td>介護・看護</td><td>17〜21点</td></tr>
<tr><td>障害</td><td>22〜25点</td></tr>
<tr><td>就学</td><td>7〜18点</td></tr>
<tr><td>求職活動</td><td>5点</td></tr>
</table>

<div class="point-box">
<p><strong>計算例</strong></p>
<p>父：フルタイム就労（月150時間以上）= 21点<br>母：フルタイム就労（月150時間以上）= 21点<br>基準指数合計 = <strong>42点</strong></p>
</div>

<h3>調整指数とは</h3>
<p>世帯の状況に応じて加点・減点される指数です。ひとり親家庭（+40点）、きょうだいの在園（+2点）、認可外利用（+2点）などがあります。</p>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },
  {
    slug: "score-up-tips",
    citySlug: "kawagoe",
    title: "川越市で保育園の点数をアップするコツと加点戦略",
    description:
      "川越市の調整指数を活用して入園選考を有利にする方法を解説。認可外利用やきょうだい加点など具体的な戦略を紹介します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "blue",
    content: `<h2>調整指数で差をつけよう</h2>
<p>川越市では基準指数が同じ場合、調整指数の差が合否を分けます。合法的に加点を得る方法を確認しましょう。</p>

<h3>主な加点項目</h3>
<table>
<tr><th>項目</th><th>加点</th><th>条件</th></tr>
<tr><td>ひとり親家庭</td><td>+40</td><td>ひとり親であることの証明</td></tr>
<tr><td>地域型保育事業の卒園児</td><td>+21〜28</td><td>小規模保育等を卒園し継続申請</td></tr>
<tr><td>障害児</td><td>+12</td><td>障害の認定あり</td></tr>
<tr><td>保育士等として市内施設勤務</td><td>+6</td><td>保育士・幼稚園教諭・保育教諭</td></tr>
<tr><td>認可外保育施設等の利用</td><td>+2</td><td>月10日以上の利用</td></tr>
<tr><td>きょうだいの在園・同時申請</td><td>+2</td><td>在園児のきょうだいが申請</td></tr>
</table>

<div class="point-box">
<p><strong>効果的な戦略</strong></p>
<p>認可外保育施設や一時預かりを月10日以上利用すると+2点の加点になります。待機中にこれを活用するのがポイントです。</p>
</div>

<h3>減点に注意</h3>
<p>65歳未満の祖父母と同居していて保育の必要性の証明がない場合は<strong>-5点</strong>、自営で協力者がいる場合は<strong>-2点</strong>の減点があります。該当する場合は祖父母の就労証明書を用意しましょう。</p>

<div class="info-box">
<p>育休延長を希望する旨の申し出をすると-100点となり、事実上入園できなくなります。育休延長目的の申請は慎重に判断してください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 52,
  },
  {
    slug: "licensed-vs-unlicensed",
    citySlug: "kawagoe",
    title: "川越市の認可保育園vs認可外、どっちがいい？",
    description:
      "川越市の認可保育園と認可外保育施設の違いを比較。保育料・入りやすさ・特徴を整理して選び方のヒントをお伝えします。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "amber",
    content: `<h2>認可と認可外の基本的な違い</h2>
<p>川越市には認可保育園のほか、認可外保育施設も複数あります。それぞれの特徴を理解して、わが家に合った選択をしましょう。</p>

<table>
<tr><th>項目</th><th>認可保育園</th><th>認可外保育施設</th></tr>
<tr><td>保育料</td><td>世帯の所得に応じて決定</td><td>施設ごとに設定（一般的に高め）</td></tr>
<tr><td>申込先</td><td>川越市保育課</td><td>各施設に直接</td></tr>
<tr><td>選考</td><td>入所指数による利用調整</td><td>先着順や面接が多い</td></tr>
<tr><td>無償化</td><td>3〜5歳児は無料</td><td>月額3.7万円まで補助</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に月10日以上通わせている場合、認可の入園選考で+2点の調整指数が加算されます。認可外を「つなぎ」として活用する家庭も多いです。</p>
</div>

<h2>川越市で選ぶなら</h2>
<p>川越市は認可保育園の数が多く、地域型保育事業（小規模保育等）も充実しています。まずは認可を第一に考え、万が一に備えて認可外もリストアップしておくのがおすすめです。</p>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "kawagoe",
    title: "川越市の保育園見学チェックリスト",
    description:
      "川越市で保育園を見学する際に確認すべきポイントをリスト形式でまとめました。質問すべきことや注意点も紹介します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "amber",
    content: `<h2>見学前の準備</h2>
<p>川越市の保育園見学は、電話で事前予約が基本です。見学の時期は<strong>4月〜9月ごろ</strong>がおすすめ。申込期限前に複数の園を比較できます。</p>

<h3>見学時のチェックリスト</h3>
<table>
<tr><th>カテゴリ</th><th>確認ポイント</th></tr>
<tr><td>安全面</td><td>門の施錠・防犯カメラ・避難経路</td></tr>
<tr><td>衛生面</td><td>トイレや給食室の清潔さ</td></tr>
<tr><td>保育内容</td><td>年齢別の活動内容・外遊びの頻度</td></tr>
<tr><td>給食</td><td>自園調理かどうか・アレルギー対応</td></tr>
<tr><td>先生の様子</td><td>子どもへの声かけ・表情</td></tr>
<tr><td>持ち物</td><td>おむつ・布団・着替えの用意</td></tr>
<tr><td>延長保育</td><td>利用可能時間・追加料金</td></tr>
</table>

<div class="point-box">
<p><strong>質問しておきたいこと</strong></p>
<p>「慣らし保育の期間はどのくらいですか？」「急な発熱時のお迎え基準は？」「保護者参加の行事は年何回ですか？」など具体的に聞きましょう。</p>
</div>

<h2>川越市ならではのポイント</h2>
<p>川越市は公立・私立合わせて多くの保育園があります。自宅や職場からの通園ルートも重要です。川越駅・本川越駅周辺は人気が高いため、少し離れたエリアも検討してみてください。</p>`,
    publishedAt: "2026-04-04",
    popularity: 43,
  },
  {
    slug: "ikukyuu-hokatsu",
    citySlug: "kawagoe",
    title: "川越市で育休中の保活でやるべきこと",
    description:
      "育休中に川越市で保活を進めるための具体的なステップを解説。復帰時期と申込のタイミングを整理します。",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "働き方",
    categoryColor: "rose",
    content: `<h2>育休中の保活スケジュール</h2>
<p>育休中は時間に余裕があるうちに保活を進めるのが鉄則です。川越市での具体的なやることリストを確認しましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>出産後すぐ：情報収集</strong>
<p>川越市の「保育園等入園の手引き」を入手し、基本的な仕組みを理解します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>生後3〜6ヶ月：保育園見学</strong>
<p>気になる園を5〜10園ほどリストアップし、見学の予約をしましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類の準備</strong>
<p>勤務先に就労証明書の作成を依頼します。書類の不備は選考に影響するので丁寧に確認を。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書の提出</strong>
<p>川越市保育課の窓口に申込書を提出します。希望園は第10希望まで書けることが多いです。</p>
</div>
</div>

<div class="info-box">
<p>川越市では、育休延長を許容する旨の申し出をすると調整指数が-100点となります。確実に入園を希望する場合はこの申し出をしないよう注意してください。</p>
</div>

<h2>復帰時期の決め方</h2>
<p>4月入園が最も枠が多いため、4月復帰に合わせるのが一般的です。職場と相談して慣らし保育の期間（1〜2週間）も考慮しましょう。</p>`,
    publishedAt: "2026-04-04",
    popularity: 48,
  },
  {
    slug: "small-nursery",
    citySlug: "kawagoe",
    title: "川越市の小規模保育園という選択肢",
    description:
      "川越市の地域型保育事業（小規模保育園）の特徴やメリット・デメリットを解説。卒園後の加点についても紹介します。",
    image: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "amber",
    content: `<h2>小規模保育園とは？</h2>
<p>川越市には「地域型保育事業」として、小規模保育・家庭的保育・事業所内保育の施設があります。定員6〜19人の少人数で、主に0〜2歳児を対象としています。</p>

<h3>メリットとデメリット</h3>
<table>
<tr><th>メリット</th><th>デメリット</th></tr>
<tr><td>少人数で手厚い保育</td><td>3歳以降は転園が必要</td></tr>
<tr><td>認可保育園より入りやすいことが多い</td><td>園庭がない施設もある</td></tr>
<tr><td>家庭的な雰囲気</td><td>行事が少ないことがある</td></tr>
</table>

<div class="point-box">
<p><strong>最大のメリット：卒園児加点</strong></p>
<p>川越市では、地域型保育事業を卒園して継続申請する場合、調整指数で<strong>+21点</strong>の加点があります。さらに連携施設を第一希望にすると<strong>+7点</strong>が上乗せされ、合計<strong>+28点</strong>になります。これは非常に大きな加点です。</p>
</div>

<h2>0〜2歳は小規模→3歳から認可という戦略</h2>
<p>0歳・1歳で小規模保育園に入園し、3歳のタイミングで認可保育園に転園するのは、川越市では有効な保活戦略です。卒園児加点の+21〜28点は、フルタイム共働き世帯の基準指数42点に上乗せされるため、非常に有利になります。</p>`,
    publishedAt: "2026-04-04",
    popularity: 46,
  },
  {
    slug: "second-child",
    citySlug: "kawagoe",
    title: "川越市で二人目の保活で注意すること",
    description:
      "川越市できょうだいの保活を進める際の注意点と、きょうだい加点の活用方法を解説します。",
    image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>きょうだい加点を活用しよう</h2>
<p>川越市では、きょうだいに関連する調整指数がいくつかあります。二人目の保活では、これらの加点を最大限に活かすのがポイントです。</p>

<h3>きょうだい関連の調整指数</h3>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいが同時に新規申請</td><td>+2点</td></tr>
<tr><td>保育所等に在園するきょうだいの弟妹が新規申請</td><td>+2点</td></tr>
<tr><td>きょうだいが在園する保育所等にのみ転園申請</td><td>+7点</td></tr>
<tr><td>小学生以下のきょうだいがいる児童が新規申請</td><td>+1点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上の子と同じ保育園を希望する場合は+2点の加点がつきます。ただし別の園も併記しておくと、万が一のときの保険になります。</p>
</div>

<h2>同点の場合の優先順位</h2>
<p>川越市では入所指数と希望順が同じ場合、優先順位が設けられています。就労世帯が同点・同希望順の場合は「きょうだいの在園あり」が最優先されます。</p>

<div class="info-box">
<p>二人目を別の園に通わせると送り迎えの負担が大きくなります。できるだけ同じ園に入れるよう、上の子の在園する園を第一希望にしておきましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 42,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "kawagoe",
    title: "川越市の保育料の決まり方と節約のコツ",
    description:
      "川越市の認可保育園の保育料がどう決まるのか、世帯年収との関係や多子軽減制度を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6e?w=800&h=400&fit=crop",
    category: "お金",
    categoryColor: "purple",
    content: `<h2>保育料の決まり方</h2>
<p>川越市の認可保育園の保育料は、<strong>世帯の市民税所得割額</strong>によって決まります。前年度の所得に基づいて階層区分が設定され、毎年9月に切り替わります。</p>

<h3>保育料の目安</h3>
<table>
<tr><th>世帯の状況</th><th>3歳未満児の保育料目安（月額）</th></tr>
<tr><td>住民税非課税世帯</td><td>0円</td></tr>
<tr><td>年収約300万円</td><td>約15,000〜20,000円</td></tr>
<tr><td>年収約500万円</td><td>約30,000〜40,000円</td></tr>
<tr><td>年収約700万円</td><td>約45,000〜55,000円</td></tr>
</table>

<div class="info-box">
<p>3〜5歳児クラスは幼児教育・保育無償化により保育料は<strong>無料</strong>です。ただし給食費（副食費）は実費負担となります。</p>
</div>

<h2>多子軽減制度</h2>
<p>川越市では、きょうだいが保育施設等を利用している場合、第2子は半額、第3子以降は無料になる多子軽減制度があります。</p>

<div class="point-box">
<p><strong>節約のコツ</strong></p>
<p>保育料は前年の所得で決まるため、iDeCoやふるさと納税で所得控除を増やすと翌年度の保育料が下がる可能性があります。育休中は所得が減るため、復帰翌年度の保育料が低くなることもあります。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 40,
  },
  {
    slug: "ochita-taisakuhou",
    citySlug: "kawagoe",
    title: "川越市の保育園に落ちたときの対処法",
    description:
      "川越市の認可保育園の一次選考で不承諾になった場合の具体的な対応策を解説。二次募集・認可外・その他の選択肢を紹介します。",
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>一次選考で落ちたら</h2>
<p>川越市の一次選考で不承諾（保留）通知が届いても、まだチャンスはあります。落ち着いて次のステップを確認しましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次募集に申し込む</strong>
<p>一次で不承諾の場合、自動的に二次選考の対象になることが多いですが、希望園の変更や追加がある場合は保育課に相談しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>川越市内の認可外保育施設に空きがあれば、まずそちらに入園し、翌年度の認可申請で加点（+2点）を狙う方法があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>育休の延長を検討する</strong>
<p>不承諾通知があれば、育休を最長2歳まで延長できます。延長して翌年度の4月入園を目指す方法もあります。</p>
</div>
</div>

<div class="point-box">
<p><strong>翌年度に向けてできること</strong></p>
<p>認可外保育施設を月10日以上利用すると+2点の調整指数がつきます。また、希望園の見直しや、小規模保育園も選択肢に加えることで、入園の可能性が広がります。</p>
</div>

<h2>川越市の入園状況を確認</h2>
<p>川越市では前年度の園別入園状況（最低点数を含む）を公式サイトで公表しています。自分の点数と比較して、現実的に入れそうな園を見極めましょう。</p>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },
];

registerArticles(articles);
