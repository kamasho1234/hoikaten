import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kanazawa",
    title: "金沢市の保活スケジュール完全ガイド｜申込時期と流れを解説",
    description:
      "金沢市の認可保育園・認定こども園の申込時期・選考の流れ・結果通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>金沢市の4月入園の申込みは、例年<strong>10月上旬〜下旬</strong>に受付が行われます。早めにスケジュールを把握して動き出しましょう。</p>

<h3>4月入園の流れ</h3>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>9月下旬</td><td>パンフレット・申請書類の配布開始（市内各保育所・認定こども園・保育幼稚園課・各市民センター）</td></tr>
<tr><td>10月上旬〜下旬</td><td>利用申込受付期間</td></tr>
<tr><td>1月中旬頃</td><td>結果通知（郵送）</td></tr>
<tr><td>2月〜3月</td><td>内定した園での面談・健康診断</td></tr>
<tr><td>4月</td><td>入園</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>途中入園（5月以降）の場合は、入園希望月の前月10日頃が申込締切です。保育幼稚園課（076-220-2299）に確認しましょう。</p>
</div>

<h2>保活の理想的な進め方</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>金沢子育てお役立ちウェブ「のびのびビ〜ノ」で園の一覧や申込方法を確認。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。夏場は園の雰囲気が見やすい時期です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月末〜：書類準備・提出</strong>
<p>就労証明書など必要書類を揃えて、期限内に提出します。</p>
</div>
</div>

<div class="info-box">
<p><strong>問い合わせ先</strong></p>
<p>金沢市 保育幼稚園課 TEL：076-220-2299</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },
  {
    slug: "scoring-system",
    citySlug: "kanazawa",
    title: "金沢市の保育園入園｜点数の仕組みと計算方法をやさしく解説",
    description:
      "金沢市の保育施設等利用調整基準表をもとに、基本指数と調整指数の仕組み・計算方法をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>金沢市の点数制度のしくみ</h2>
<p>金沢市では「<strong>基本指数</strong>」と「<strong>調整指数</strong>」の合計で入園の優先順位が決まります。</p>

<h3>計算の流れ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>保護者それぞれの基本指数を出す</strong>
<p>就労・疾病・障害・介護・出産・就学・求職などの理由ごとに、もっとも高い指数を1つ選びます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>低い方を「申請児童の基本指数」とする</strong>
<p>父母の基本指数のうち、<strong>低い方</strong>（同じ場合はどちらか一方）が採用されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>調整指数を加える</strong>
<p>該当するすべての調整指数を合計して、基本指数に足します。</p>
</div>
</div>

<h3>基本指数の例（就労の場合）</h3>
<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>100点</td></tr>
<tr><td>月140〜160時間未満</td><td>80点</td></tr>
<tr><td>月120〜140時間未満</td><td>70点</td></tr>
<tr><td>月100〜120時間未満</td><td>60点</td></tr>
<tr><td>月80〜100時間未満</td><td>50点</td></tr>
<tr><td>月48〜80時間未満</td><td>40点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>金沢市は「低い方を採用」する方式です。両親ともフルタイムで100点でも、基本指数は100点。ここに調整指数が加算されて最終点数が決まります。</p>
</div>

<div class="info-box">
<p><strong>出典</strong></p>
<p>金沢市保育施設等利用調整基準表（別表 第7条関係）に基づいています。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 58,
  },
  {
    slug: "score-up-tips",
    citySlug: "kanazawa",
    title: "金沢市の保育園入園｜加点のコツ・点数アップ戦略",
    description:
      "金沢市の調整指数を活用して入園の可能性を高めるコツを解説。ひとり親加点やきょうだい加点など、知っておきたいポイントをまとめました。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>金沢市の調整指数で加点されるケース</h2>
<p>基本指数に加えて、家庭の状況に応じた「調整指数」が加算されます。主な加点項目を確認しましょう。</p>

<h3>主な調整指数一覧</h3>
<table>
<tr><th>項目</th><th>調整指数</th></tr>
<tr><td>ひとり親世帯</td><td>+50</td></tr>
<tr><td>きょうだいが入所中の園に希望</td><td>+60</td></tr>
<tr><td>きょうだい同時新規申込</td><td>+45</td></tr>
<tr><td>保育士等として石川中央都市圏の園に勤務</td><td>+50</td></tr>
<tr><td>子の障害</td><td>+45</td></tr>
<tr><td>育児休業明けで退所した園への再入所</td><td>+40</td></tr>
<tr><td>生計中心者の失業</td><td>+40</td></tr>
<tr><td>小規模保育事業等の卒園児童</td><td>+35</td></tr>
<tr><td>転園希望</td><td>+35</td></tr>
<tr><td>多子世帯（18歳未満3人以上）</td><td>+10</td></tr>
<tr><td>生活保護世帯</td><td>+10</td></tr>
<tr><td>就学前の多胎児がいる</td><td>+10</td></tr>
</table>

<div class="point-box">
<p><strong>注意：減点もある</strong></p>
<p>65歳未満の同居の祖父母がいて保育可能な場合は<strong>△40点</strong>の減点になります。同居の有無は大きく影響するポイントです。</p>
</div>

<h2>点数アップの現実的な戦略</h2>
<h3>1. 就労時間を増やす</h3>
<p>月160時間以上で最高の100点。パートの場合は勤務時間の見直しを検討しましょう。</p>

<h3>2. きょうだい加点を活用する</h3>
<p>上のお子さんが通っている園を第一希望にすれば+60点。これは非常に大きな加点です。</p>

<h3>3. 認可外保育施設の利用実績を作る</h3>
<p>金沢市では認可外利用そのものの加点はありませんが、就労実績を確保する手段として有効です。</p>

<div class="info-box">
<p><strong>同点の場合は？</strong></p>
<p>合計点が同じ場合、希望順位・ひとり親・兄弟姉妹の在籍状況・就労時間などを総合的に判断して優先順位が決まります。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 52,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "kanazawa",
    title: "金沢市の認可保育園vs認可外、どっちがいい？違いを比較",
    description:
      "金沢市で保活をするなら認可と認可外どちらを選ぶべき？費用・保育内容・入りやすさの違いをわかりやすく比較します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園選び",
    categoryColor: "purple",
    content: `<h2>認可保育園と認可外保育施設の違い</h2>
<p>金沢市にも認可保育園・認定こども園のほかに、認可外保育施設があります。それぞれの特徴を比較してみましょう。</p>

<h3>主な違い</h3>
<table>
<tr><th>項目</th><th>認可保育園・認定こども園</th><th>認可外保育施設</th></tr>
<tr><td>設置基準</td><td>国の基準を満たす</td><td>都道府県に届出</td></tr>
<tr><td>保育料</td><td>世帯の所得に応じて決定</td><td>施設ごとに設定</td></tr>
<tr><td>申込先</td><td>金沢市 保育幼稚園課</td><td>各施設に直接</td></tr>
<tr><td>選考</td><td>利用調整（点数制）</td><td>先着順や施設の基準</td></tr>
<tr><td>3〜5歳の無償化</td><td>対象</td><td>月37,000円まで無償</td></tr>
</table>

<h2>金沢市で認可外を選ぶメリット</h2>
<h3>入園しやすい</h3>
<p>認可保育園の選考に落ちた場合のセーフティネットとして活用できます。</p>

<h3>柔軟な保育時間</h3>
<p>夜間保育や休日保育など、認可園にはないサービスを提供する施設もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>金沢市では認可外利用による直接的な加点はありませんが、認可外に預けながらフルタイムで働くことで基本指数を高く維持できます。</p>
</div>

<h2>どちらを選ぶべき？</h2>
<p>まずは認可保育園・認定こども園を第一目標にしつつ、認可外も並行して見学・申込みしておくのが安心です。金沢市には企業主導型保育施設もあるので、選択肢を広げて検討しましょう。</p>

<div class="info-box">
<p><strong>確認先</strong></p>
<p>認可外保育施設の一覧は石川県のホームページで確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "kanazawa",
    title: "金沢市の保育園見学チェックリスト｜見るべきポイント15選",
    description:
      "金沢市で保育園見学に行く前に確認しておきたいチェックポイントを15項目にまとめました。質問リストとしても活用できます。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "園選び",
    categoryColor: "purple",
    content: `<h2>見学前の準備</h2>
<p>金沢市の保育園見学は<strong>6月〜9月</strong>がベストシーズン。見学は電話で予約するのが基本です。</p>

<h3>持ち物</h3>
<p>メモ帳・スリッパ・筆記用具があれば十分。赤ちゃん連れでもOKです。</p>

<h2>チェックリスト15項目</h2>
<h3>施設環境（5項目）</h3>
<table>
<tr><td>1</td><td>園舎の清潔さ・整理整頓</td></tr>
<tr><td>2</td><td>園庭の広さ・遊具の安全性</td></tr>
<tr><td>3</td><td>給食室の設備（自園調理かどうか）</td></tr>
<tr><td>4</td><td>セキュリティ（門の施錠・防犯カメラ等）</td></tr>
<tr><td>5</td><td>災害時の避難経路・備蓄品</td></tr>
</table>

<h3>保育内容（5項目）</h3>
<table>
<tr><td>6</td><td>先生と子どもの関わり方・雰囲気</td></tr>
<tr><td>7</td><td>保育士の人数と配置</td></tr>
<tr><td>8</td><td>1日のスケジュール</td></tr>
<tr><td>9</td><td>お昼寝の環境（SIDS対策）</td></tr>
<tr><td>10</td><td>食物アレルギーへの対応</td></tr>
</table>

<h3>利便性（5項目）</h3>
<table>
<tr><td>11</td><td>送迎時の駐車場の有無・広さ</td></tr>
<tr><td>12</td><td>延長保育の時間と料金</td></tr>
<tr><td>13</td><td>病児・病後児保育への対応</td></tr>
<tr><td>14</td><td>持ち物の量（おむつ・着替え・布団等）</td></tr>
<tr><td>15</td><td>保護者参加の行事の頻度</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>金沢市は冬場の降雪が多いため、<strong>冬の送迎動線</strong>（駐車場から玄関までの除雪状況、屋根付き通路の有無）も確認しておくと安心です。</p>
</div>

<div class="info-box">
<p><strong>見学のコツ</strong></p>
<p>午前中（9:30〜11:00頃）に見学すると、子どもたちの活動の様子や給食の準備風景が見られます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 48,
  },
  {
    slug: "ikukyuu-hokatsu",
    citySlug: "kanazawa",
    title: "金沢市で育休中の保活｜やるべきことリスト",
    description:
      "育児休業中に金沢市で保活を進めるための手順とポイントを解説。復帰時期の逆算や書類準備のコツをまとめました。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休中の保活タイムライン</h2>
<p>育休中に4月入園を目指す場合、以下の流れで準備を進めましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>産後〜6ヶ月：情報収集</strong>
<p>金沢子育てお役立ちウェブ「のびのびビ〜ノ」で園の情報を集めましょう。金沢市には認可保育園・認定こども園合わせて多数の施設があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>候補の園に電話して見学予約。最低3〜5園は見ておくのがおすすめです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月：就労証明書の手配</strong>
<p>復帰予定の勤務先に就労証明書の作成を依頼します。復帰後の勤務時間が基本指数に直結するので、時短勤務の場合は注意が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月：申込書類の提出</strong>
<p>期限内に保育幼稚園課または各保育所等へ提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント：育児休業明け加点</strong></p>
<p>金沢市では、育児休業開始時に退所した保育所等への再入所を希望する場合、<strong>調整指数+40点</strong>が加算されます。上のお子さんがいた園への再入所は有利です。</p>
</div>

<h2>時短復帰と点数の関係</h2>
<p>復帰後に時短勤務を予定している場合、月の就労時間が基本指数に影響します。</p>
<table>
<tr><th>勤務パターン</th><th>月の就労時間目安</th><th>基本指数</th></tr>
<tr><td>フルタイム（8h×20日）</td><td>160時間</td><td>100点</td></tr>
<tr><td>時短6h×20日</td><td>120時間</td><td>70点</td></tr>
<tr><td>時短5h×20日</td><td>100時間</td><td>60点</td></tr>
</table>

<div class="info-box">
<p><strong>復帰時期に注意</strong></p>
<p>4月入園で内定した場合、入園月中に復帰する必要があります。復帰日を勤務先と事前に調整しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },
  {
    slug: "small-nursery",
    citySlug: "kanazawa",
    title: "金沢市の小規模保育園という選択肢｜メリットと卒園後の進路",
    description:
      "金沢市の小規模保育事業の特徴やメリット・デメリット、卒園後の連携施設への進路について解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園選び",
    categoryColor: "purple",
    content: `<h2>小規模保育園とは？</h2>
<p>小規模保育事業は、<strong>0〜2歳児</strong>を対象に定員6〜19人で保育を行う施設です。金沢市にも複数の小規模保育園があります。</p>

<h3>認可保育園との違い</h3>
<table>
<tr><th>項目</th><th>認可保育園</th><th>小規模保育園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜2歳</td></tr>
<tr><td>定員</td><td>20人以上</td><td>6〜19人</td></tr>
<tr><td>保育士配置</td><td>国の基準どおり</td><td>A型：全員保育士、B型：1/2以上</td></tr>
<tr><td>給食</td><td>自園調理が多い</td><td>自園調理または外部搬入</td></tr>
</table>

<h2>小規模保育園のメリット</h2>
<h3>1. 入りやすい場合がある</h3>
<p>大規模園に比べて競争率が低いケースがあります。特に1歳児は認可園が激戦になりやすいので有力な選択肢です。</p>

<h3>2. 手厚い保育</h3>
<p>少人数のため、一人ひとりに目が届きやすく、アットホームな雰囲気が特徴です。</p>

<h3>3. 卒園児加点がある</h3>
<p>金沢市では、小規模保育事業等の卒園児童が保育所等への入所を希望する場合、<strong>調整指数+35点</strong>が加算されます。3歳以降の転園が有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育園は2歳で卒園するため、3歳からの預け先を早めに考えておく必要があります。連携施設が設定されている園を選ぶと安心です。</p>
</div>

<h2>デメリットと注意点</h2>
<p>3歳で必ず転園が必要になる点は最大のデメリットです。ただし金沢市の+35点の卒園児加点があるため、認可保育園への転園はかなり有利に進められます。</p>

<div class="info-box">
<p><strong>確認先</strong></p>
<p>金沢市内の小規模保育事業の一覧は、保育幼稚園課または「のびのびビ〜ノ」で確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 42,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "kanazawa",
    title: "金沢市で二人目の保活｜きょうだい加点と注意すべきこと",
    description:
      "金沢市で二人目のお子さんの保活をする際のきょうだい加点の仕組みや、上の子と同じ園に入るためのコツを解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>きょうだい加点は金沢市最大の加点項目</h2>
<p>金沢市の調整指数で最も大きいのが<strong>きょうだい加点</strong>です。上の子が通っている園に下の子を希望すれば、<strong>+60点</strong>が加算されます。</p>

<h3>きょうだい関連の調整指数</h3>
<table>
<tr><th>状況</th><th>調整指数</th></tr>
<tr><td>きょうだいが入所中の園に入所希望</td><td>+60</td></tr>
<tr><td>きょうだい同時に新規申込</td><td>+45</td></tr>
<tr><td>就学前の多胎児（双子等）がいる</td><td>+10</td></tr>
<tr><td>18歳未満の兄弟姉妹が3人以上</td><td>+10</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上の子が1号認定で認定こども園を利用している場合でも、下の子が3号認定でその認定こども園を希望すれば+60点の対象になります。</p>
</div>

<h2>二人目の保活で注意すること</h2>
<h3>1. 上の子と同じ園を第一希望に</h3>
<p>+60点の加点は非常に大きく、同じ園であればほぼ確実に入れるケースが多いです。送迎の負担軽減にもなります。</p>

<h3>2. 就労証明書は最新のものを</h3>
<p>育休中の場合、復帰後の勤務条件が変わっていることがあります。就労証明書は必ず最新の内容で取得しましょう。</p>

<h3>3. 同時申込の場合</h3>
<p>双子や年子で同時に申込む場合は+45点の加点。同じ園を希望するのがセオリーです。</p>

<h2>祖父母同居の場合は要注意</h2>
<p>65歳未満の同居の祖父母がいて保育可能な場合、<strong>△40点</strong>の減点があります。二人目の保活では、一人目のときとは家族構成が変わっていることもあるので注意してください。</p>

<div class="info-box">
<p><strong>送迎の工夫</strong></p>
<p>万が一別々の園になった場合は、自宅と2つの園の位置関係を考慮して送迎ルートを決めましょう。金沢市は冬の積雪で通勤時間が読めないこともあるので、余裕を持った計画が大切です。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 46,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "kanazawa",
    title: "金沢市の保育料の決まり方と節約のコツ",
    description:
      "金沢市の認可保育園の保育料がどう決まるのか、所得との関係、きょうだい割引、無償化制度について解説します。",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料はどう決まる？</h2>
<p>金沢市の認可保育園・認定こども園の保育料は、<strong>世帯の市民税所得割額</strong>に応じて決定されます。前年度の住民税額がベースになるため、年収が同じでも控除の内容で保育料が変わります。</p>

<h3>保育料の決定要素</h3>
<table>
<tr><th>要素</th><th>内容</th></tr>
<tr><td>世帯の市民税所得割額</td><td>父母の合算（祖父母同居の場合は含まれることも）</td></tr>
<tr><td>子どもの年齢</td><td>3歳未満は高め、3歳以上は無償化対象</td></tr>
<tr><td>保育の必要量</td><td>標準時間（11h）か短時間（8h）か</td></tr>
</table>

<h2>幼児教育・保育の無償化</h2>
<p>2019年10月から、<strong>3〜5歳児</strong>の認可保育園・認定こども園の保育料は無償になっています。ただし以下は実費負担です。</p>
<table>
<tr><td>給食費（副食費）</td><td>月4,500円程度（園により異なる）</td></tr>
<tr><td>延長保育料</td><td>利用した場合のみ</td></tr>
<tr><td>教材費・行事費</td><td>園により異なる</td></tr>
</table>

<h2>きょうだい割引</h2>
<p>金沢市では、同一世帯から2人以上が保育施設等を利用している場合、<strong>第2子は半額</strong>、<strong>第3子以降は無料</strong>になります。</p>

<div class="point-box">
<p><strong>節約のコツ</strong></p>
<p>iDeCo（個人型確定拠出年金）やふるさと納税を活用して所得控除を増やすと、翌年度の市民税所得割額が下がり、保育料が安くなる可能性があります。</p>
</div>

<h2>保育料の確認方法</h2>
<p>金沢市の保育料の階層表は、入園申込時に配布されるパンフレットや金沢市公式サイトで確認できます。不明な点は保育幼稚園課に問い合わせましょう。</p>

<div class="info-box">
<p><strong>問い合わせ先</strong></p>
<p>金沢市 保育幼稚園課 TEL：076-220-2299</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 40,
  },
  {
    slug: "ochita-taishohou",
    citySlug: "kanazawa",
    title: "金沢市の保育園に落ちたときの対処法｜次にやるべきこと",
    description:
      "金沢市の認可保育園に不承諾になったとき、諦めずにできることをまとめました。二次募集・認可外・その他の選択肢を解説します。",
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾通知が届いたら</h2>
<p>1月中旬頃に届く結果通知で「不承諾」だった場合、すぐに次のアクションを起こしましょう。</p>

<h3>やることリスト</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>空き状況を確認する</strong>
<p>保育幼稚園課に連絡して、二次募集や空きのある園がないか確認します。希望園を変更・追加できる場合もあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>認可外保育施設や企業主導型保育施設は、認可園とは別枠で申込めます。空きがあればすぐに入れることも。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>途中入園に切り替える</strong>
<p>4月にこだわらず、5月以降の途中入園で空きを狙う方法もあります。毎月の申込締切は入園希望月の前月10日頃です。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>育休延長を検討する</strong>
<p>不承諾通知書があれば、育児休業を最長2歳まで延長できます。勤務先と相談しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント：翌年度の再申込</strong></p>
<p>金沢市では、前年度に不承諾となった児童があらためて入所申込をした場合、同点時の優先要素として考慮されます（利用調整基準表 同点時の取扱い⑤）。</p>
</div>

<h2>その他の選択肢</h2>
<h3>一時預かり事業</h3>
<p>金沢市内の認可保育園等で実施している一時預かりを利用する方法もあります。週3日程度の利用が可能な施設もあります。</p>

<h3>ファミリー・サポート・センター</h3>
<p>金沢市のファミサポに登録すれば、地域の協力会員に子どもを預けられます。保育園が見つかるまでのつなぎとして活用できます。</p>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>金沢市 保育幼稚園課 TEL：076-220-2299<br>金沢市ファミリー・サポート・センター TEL：076-243-3410</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 38,
  },
];

registerArticles(articles);
