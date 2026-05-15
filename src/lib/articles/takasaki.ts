import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "takasaki",
    title: "高崎市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "高崎市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>高崎市の4月入園は<strong>一次募集</strong>と<strong>二次募集</strong>の2回に分かれています。</p>

<h3>一次募集</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>入所ガイド・申請書類の配布</td><td>令和7年9月頃〜</td></tr>
<tr><td>申込受付期間</td><td>令和7年10月上旬〜11月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<h3>二次募集</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>二次募集受付期間</td><td>令和8年2月中旬〜下旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月中旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高崎市では申込書類の提出先は福祉部保育課（市役所1階12番窓口）です。郵送ではなく窓口提出が基本です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>高崎市の保育施設の種類やエリアの特徴を調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。夏場が見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類の入手・準備</strong>
<p>保育課で入所ガイドと申請書類を入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>受付期間内に保育課の窓口へ提出しましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.takasaki.gunma.jp/page/6308.html" target="_blank" rel="noopener">高崎市公式ホームページ「保育所（園）・認定こども園の入所申し込みについて」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  // ===== 選考のしくみ (2) =====
  {
    slug: "scoring-system-guide",
    citySlug: "takasaki",
    title: "高崎市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "高崎市の保育園入園選考で使われる「基準指数」「調整指数」のしくみを初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>高崎市の点数制度の特徴</h2>
<p>高崎市の入園選考は「選考基準点数」の高い順に内定が決まります。点数は<span class="highlight">基準指数</span>と<span class="highlight">調整指数</span>の合計で算出されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 ＝ 父の基準指数 ＋ 母の基準指数 ＋ 調整指数</p>
</div>

<h2>基準指数とは？</h2>
<p>保護者それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">10点</span>、父母合計で最大<span class="highlight">20点</span>です。</p>

<table>
<tr><th>就労状況（外勤・自営中心者）</th><th>基準指数</th></tr>
<tr><td>月150時間以上</td><td>10点（満点）</td></tr>
<tr><td>月130時間以上150時間未満</td><td>9点</td></tr>
<tr><td>月110時間以上130時間未満</td><td>8点</td></tr>
<tr><td>月90時間以上110時間未満</td><td>7点</td></tr>
<tr><td>月60時間以上90時間未満</td><td>6点</td></tr>
<tr><td>月48時間以上60時間未満</td><td>5点</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の状況に応じて加減される点数です。代表的な項目は以下の通りです。</p>
<ul>
<li>ひとり親家庭：<span class="highlight">+13点</span></li>
<li>生活保護受給中：<span class="highlight">+13点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+5点</span></li>
<li>4月1日入所希望：<span class="highlight">+2点</span></li>
<li>認可外保育施設の利用：<span class="highlight">+1点</span></li>
<li>保育士として市内の認可施設に勤務：<span class="highlight">+3点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>勤務先が親族経営の個人事業等の場合は<span class="highlight">-1点</span>の減点があります。自営中心者・協力者・農業とは重複しません。</p>
</div>

<h2>フルタイム共働きの標準的な点数</h2>
<p>父母ともにフルタイム（10点×2）＋4月入所希望（+2点）＝<span class="highlight">22点</span>が標準的な点数です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の選考基準表は<a href="https://www.city.takasaki.gunma.jp/page/6308.html" target="_blank" rel="noopener">高崎市公式ホームページ</a>の入所ガイドでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  // ===== 点数アップ (3) =====
  {
    slug: "score-up-checklist",
    citySlug: "takasaki",
    title: "高崎市で点数を上げるコツ　加点のチェックリスト",
    description:
      "高崎市の保育園入園選考で調整指数を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>調整指数の加点をフル活用しよう</h2>
<p>高崎市の基準指数は父母各10点で合計20点が上限です。差がつくのは<span class="highlight">調整指数</span>の部分。該当する加点項目を漏れなく申請しましょう。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親家庭</td><td>+13点</td><td>母子・父子家庭であること</td></tr>
<tr><td>生活保護受給</td><td>+13点</td><td>生活保護受給中（ひとり親と重複しない）</td></tr>
<tr><td>きょうだい在園中の園を希望</td><td>+5点</td><td>求職中でない場合</td></tr>
<tr><td>保育士として市内認可施設に勤務</td><td>+3点</td><td>保育士資格を有し市内の認可施設に勤務</td></tr>
<tr><td>4月1日入所希望</td><td>+2点</td><td>4月入所を希望する場合</td></tr>
<tr><td>きょうだいと同時申込</td><td>+2点</td><td>1号認定除く</td></tr>
<tr><td>認可外保育施設に入所中</td><td>+1点</td><td>求職中・産前産後・育休中は除く</td></tr>
<tr><td>第三子以降</td><td>+1点</td><td>第三子以降のお子さま</td></tr>
<tr><td>児童に障害がある</td><td>+1点</td><td>障害のあるお子さま</td></tr>
<tr><td>単身赴任</td><td>+1点</td><td>住基上別住所の場合</td></tr>
<tr><td>二次募集への再申込</td><td>+1点</td><td>一次で保留後の再申込</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園中の園を希望すると<span class="highlight">+5点</span>の大きな加点が得られます。上の子と同じ園を希望するのが保活の鉄則です。</p>
</div>

<h2>就労時間を最大化しよう</h2>
<p>基準指数は就労時間で決まります。月150時間以上で満点の<span class="highlight">10点</span>。1日7.5時間×週5日＝月約150時間がラインです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>自営協力者・農業の場合は最大でも<span class="highlight">9点</span>です。外勤・自営中心者の10点より1点低くなります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目の詳細は<a href="https://www.city.takasaki.gunma.jp/page/6308.html" target="_blank" rel="noopener">高崎市公式ホームページ</a>の入所ガイドでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  // ===== 同点時の優先順位 (4) =====
  {
    slug: "tiebreaker-rules",
    citySlug: "takasaki",
    title: "高崎市で同点になったらどうなる？優先順位を解説",
    description:
      "高崎市の保育園入園選考で同じ点数になった場合の優先順位のしくみを、わかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>高崎市の入園選考では、選考基準点数が同点の場合に世帯の状況を総合的に判断して決定されます。</p>

<h3>高崎市の主な優先段階</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>ひとり親世帯・生活保護世帯</strong>
<p>ひとり親家庭や生活保護受給中の世帯が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>きょうだいが在園中</strong>
<p>申込先の園にきょうだいが在園している世帯が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>就労時間・就労日数が多い世帯</strong>
<p>父母の就労状況がより安定している世帯が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>所得が低い世帯</strong>
<p>市民税の課税額が低い世帯が優先されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高崎市は基準指数が各保護者最大10点と幅が小さいため、フルタイム共働き同士の同点勝負になるケースが多いです。調整指数の差と同点時の優先順位がカギを握ります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同じ優先段階の世帯が複数いる場合は、さらに細かい基準で判定されます。不明な点は保育課（027-321-1246）に問い合わせましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>選考基準の詳細は<a href="https://www.city.takasaki.gunma.jp/page/6308.html" target="_blank" rel="noopener">高崎市公式ホームページ</a>の入所ガイドでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  // ===== 時短勤務と点数 (5) =====
  {
    slug: "jitan-kinmu-score",
    citySlug: "takasaki",
    title: "高崎市で時短勤務だと点数はどうなる？就労時間の区分に注意",
    description:
      "高崎市の保育園入園選考で時短勤務を取得した場合の点数への影響と、就労時間区分の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務で基準指数はどう変わる？</h2>
<p>高崎市の基準指数は就労時間の区分で決まります。時短勤務にした場合の影響を確認しましょう。</p>

<table>
<tr><th>就労時間（外勤）</th><th>基準指数</th><th>備考</th></tr>
<tr><td>月150時間以上</td><td>10点</td><td>フルタイム</td></tr>
<tr><td>月130〜150時間未満</td><td>9点</td><td>やや時短</td></tr>
<tr><td>月110〜130時間未満</td><td>8点</td><td>時短勤務で該当しやすい</td></tr>
<tr><td>月90〜110時間未満</td><td>7点</td><td>週4日・6時間程度</td></tr>
<tr><td>月60〜90時間未満</td><td>6点</td><td>短時間パートなど</td></tr>
<tr><td>月48〜60時間未満</td><td>5点</td><td>最低ライン</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月150時間のラインを下回ると基準指数が<span class="highlight">1点下がって9点</span>になります。1日7.5時間×週5日＝月約150時間がギリギリのラインです。</p>
</div>

<h2>時短でも点数を維持するコツ</h2>
<ul>
<li>勤務日数を維持して1日の時間を減らすのが基本</li>
<li><span class="highlight">月150時間以上</span>を維持できれば基準指数10点を確保</li>
<li>1日6時間×週5日＝月約120時間だと<span class="highlight">8点</span>に低下</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム（10点）と6時間時短（8点）では<span class="highlight">2点差</span>。父母合計で考えると最大<span class="highlight">4点差</span>になりえます。時短を検討する際は点数への影響を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>選考基準表は<a href="https://www.city.takasaki.gunma.jp/page/6308.html" target="_blank" rel="noopener">高崎市公式ホームページ</a>の入所ガイドでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  // ===== 落ちたときの選択肢 (6) =====
  {
    slug: "ochita-sentakushi",
    citySlug: "takasaki",
    title: "高崎市で保育園に落ちたときの5つの選択肢",
    description:
      "高崎市の認可保育園の選考で保留になった場合に検討すべき5つの選択肢を具体的に紹介します。",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>保留になっても大丈夫。次の一手を考えましょう</h2>
<p>高崎市は保育施設が充実していますが、人気エリアや0〜2歳児クラスでは希望の園に入れないケースがあります。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次募集に申し込む</strong>
<p>一次で保留の方は二次募集（2月中旬〜下旬）に申し込めます。二次募集への再申込には<span class="highlight">+1点</span>の加点もあります。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>高崎市内にも認可外保育施設があります。認可外に預けながら翌年度の認可を再申請すれば、<span class="highlight">+1点</span>の加点が得られます。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>小規模保育事業を利用する</strong>
<p>0〜2歳児対象の小規模保育は、認可保育園より比較的空きがあるケースがあります。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>企業主導型保育施設を利用する</strong>
<p>企業主導型保育施設は国の助成を受けており保育料が比較的安価です。直接施設に申し込みます。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>希望エリアを広げて途中入園を狙う</strong>
<p>高崎市は広い市域をもつため、エリアを広げれば空きのある園が見つかることもあります。空き状況は毎月6日前後に高崎市ホームページで公開されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高崎市では保育施設の空き状況が毎月ホームページで更新されます。こまめにチェックして途中入園のチャンスを逃さないようにしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.takasaki.gunma.jp/page/6309.html" target="_blank" rel="noopener">高崎市公式ホームページ「保育所（園）・認定こども園空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  // ===== 認可外で加点を得る方法 (7) =====
  {
    slug: "ninkagai-katen",
    citySlug: "takasaki",
    title: "高崎市で認可外保育を活用して加点を得る方法",
    description:
      "高崎市の保育園入園選考で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用で+1点の加点</h2>
<p>高崎市では、認可外保育施設に入所している場合に<span class="highlight">+1点</span>の調整指数が加算されます。企業内託児施設への依頼、他人への保育依頼、一時預かりの利用でも同様に+1点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き（20点）＋4月入所（+2点）＋認可外利用（+1点）で<span class="highlight">23点</span>に。きょうだい在園（+5点）との併用で<span class="highlight">28点</span>も狙えます。</p>
</div>

<h2>加点の条件</h2>
<ul>
<li>就労等の理由で認可外保育施設等に預けていること</li>
<li>申込時点で利用していることが必要</li>
<li><span class="highlight">求職中・産前産後・育休中の場合は対象外</span></li>
</ul>

<h2>対象となる預け先</h2>
<table>
<tr><th>預け先の種類</th><th>加点</th></tr>
<tr><td>認可外保育施設に入所中</td><td>+1点</td></tr>
<tr><td>企業内託児施設に依頼中</td><td>+1点</td></tr>
<tr><td>他人に保育を依頼中</td><td>+1点</td></tr>
<tr><td>一時預かりを利用中</td><td>+1点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>加点は重複しません。認可外と一時預かりを両方利用していても+1点です。また、求職活動中・産前産後・育児休業中の場合は加点の対象外です。</p>
</div>

<h2>認可外利用のタイミング</h2>
<p>加点を得るには、認可保育園の<span class="highlight">申込時点で利用していること</span>が必要です。4月入園の場合、10月〜11月の申込までに利用を開始しておく必要があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>選考基準の詳細は<a href="https://www.city.takasaki.gunma.jp/page/6308.html" target="_blank" rel="noopener">高崎市公式ホームページ</a>の入所ガイドでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  // ===== 自営業・フリーランスの保活 (8) =====
  {
    slug: "freelance-hokatsu",
    citySlug: "takasaki",
    title: "高崎市で自営業・フリーランスが保活するときの注意点",
    description:
      "高崎市の保育園入園選考で自営業・フリーランスの方が知っておくべき点数の違いと必要書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>自営業は外勤と点数が違う？</h2>
<p>高崎市の選考基準では、就労形態によって基準指数の区分が異なります。</p>

<table>
<tr><th>就労形態</th><th>月150時間以上の指数</th><th>最大指数</th></tr>
<tr><td>外勤・自営中心者</td><td>10点</td><td>10点</td></tr>
<tr><td>自営協力者・農業</td><td>9点</td><td>9点</td></tr>
<tr><td>内職</td><td>5点（一律）</td><td>5点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「自営中心者」と「自営協力者」で最大1点の差があります。自営中心者は事業の中心的役割を担う方、協力者は補助的に携わる方です。</p>
</div>

<h2>親族経営の勤務先は-1点</h2>
<p>勤務先が親族経営の法人格のない会社や個人営業の場合、調整指数で<span class="highlight">-1点</span>の減点があります。ただし、自営中心者・協力者・農業には重複適用されません。</p>

<h2>必要書類</h2>
<ul>
<li><strong>外勤の場合</strong>：就労証明書（勤務先が作成）</li>
<li><strong>自営中心者の場合</strong>：就労状況申告書＋確定申告書の写しなど</li>
<li><strong>自営協力者の場合</strong>：就労状況申告書＋中心者との関係がわかる書類</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フリーランスは「自営中心者」に該当するため、外勤と同じ最大<span class="highlight">10点</span>を得られます。就労時間を証明する書類をしっかり準備しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類の詳細は<a href="https://www.city.takasaki.gunma.jp/page/6308.html" target="_blank" rel="noopener">高崎市公式ホームページ</a>の入所ガイドでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  // ===== 人気エリアと入りやすい地域 (9) =====
  {
    slug: "area-guide",
    citySlug: "takasaki",
    title: "高崎市の人気エリアと入りやすい地域ガイド",
    description:
      "高崎市内のエリアごとの保育園入園難易度の違いや、比較的入りやすい地域を解説します。",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>高崎市は170以上の保育施設がある</h2>
<p>高崎市には認可保育所・認定こども園を合わせて<span class="highlight">170以上</span>の保育施設があります。市域が広いため、エリアによって入りやすさに差があります。</p>

<h2>エリアごとの入園難易度</h2>
<table>
<tr><th>難易度</th><th>エリア</th><th>特徴</th></tr>
<tr><td>激戦</td><td>高崎駅周辺・中心市街地</td><td>交通の便が良く人気園が集中</td></tr>
<tr><td>やや激戦</td><td>問屋町・飯塚町・中居町周辺</td><td>ファミリー層が多い住宅地</td></tr>
<tr><td>標準</td><td>群馬地区・箕郷地区</td><td>園によって差がある</td></tr>
<tr><td>比較的入りやすい</td><td>倉渕・榛名・吉井地区</td><td>郊外で空きが出やすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高崎駅周辺は人気園が集中しています。通勤ルートを見直して、少し郊外の園も候補に入れると選択肢が広がります。</p>
</div>

<h2>年齢による違い</h2>
<p>特に<span class="highlight">0〜2歳児クラス</span>の競争が激しいです。3歳以上は幼稚園や認定こども園の幼稚園部分も選択肢に加わるため、入りやすくなります。</p>

<h2>空き状況の確認方法</h2>
<p>高崎市では保育施設の空き状況が<span class="highlight">毎月6日前後</span>にホームページで公開されます。こまめにチェックして途中入園のチャンスを逃さないようにしましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の空き状況は<a href="https://www.city.takasaki.gunma.jp/page/6309.html" target="_blank" rel="noopener">高崎市公式ホームページ「保育所（園）・認定こども園空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  // ===== 入園競争の実態/ボーダーライン (10) =====
  {
    slug: "competition-reality",
    citySlug: "takasaki",
    title: "高崎市の入園競争の実態　ボーダーラインは何点？",
    description:
      "高崎市の保育園入園選考における点数分布と実質的なボーダーラインを、選考基準の特性とあわせて解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>高崎市のボーダーラインの目安</h2>
<p>高崎市の入園選考は基準指数（父母合計最大20点）＋調整指数で決まります。基準指数が最大10点と細かい刻みのため、調整指数の差が勝負を分けます。</p>

<h2>標準的な点数パターン</h2>
<table>
<tr><th>世帯の状況</th><th>選考点数</th><th>内訳</th></tr>
<tr><td>フルタイム共働き＋きょうだい在園＋4月入所</td><td><span class="highlight">27点</span></td><td>20+5+2</td></tr>
<tr><td>フルタイム共働き＋4月入所＋認可外利用</td><td><span class="highlight">23点</span></td><td>20+2+1</td></tr>
<tr><td>フルタイム共働き＋4月入所</td><td>22点</td><td>20+2</td></tr>
<tr><td>フルタイム共働き（4月入所加点なし）</td><td>20点</td><td>20+0</td></tr>
<tr><td>片方時短（月110h）＋4月入所</td><td>20点</td><td>10+8+2</td></tr>
<tr><td>片方求職中＋4月入所</td><td>15点</td><td>10+3+2</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋4月入所の<span class="highlight">22点</span>が実質的なスタートライン。人気園ではきょうだい加点（+5点）を持つ<span class="highlight">27点</span>がボーダーになることもあります。</p>
</div>

<h2>0〜2歳児は特に厳しい</h2>
<p>高崎駅周辺の人気園では、特に0〜2歳児クラスの入園が厳しく、フルタイム共働きでも希望の園に入れないケースがあります。</p>

<h2>同点勝負の実態</h2>
<p>基準指数が各10点と幅が小さいため、同点勝負になるケースが多いです。同点の場合は以下の要素で判定されます。</p>
<ul>
<li>ひとり親・生活保護世帯が優先</li>
<li>きょうだい在園中の世帯が優先</li>
<li>就労時間・日数が多い世帯が優先</li>
<li>所得が低い世帯が優先</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職中の場合は基準指数が<span class="highlight">3点</span>と大幅に低くなります。入園を本気で希望する場合は、申込前に就労先を確保することが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>選考基準の詳細は<a href="https://www.city.takasaki.gunma.jp/page/6308.html" target="_blank" rel="noopener">高崎市公式ホームページ</a>の入所ガイドで確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
];

registerArticles(articles);
