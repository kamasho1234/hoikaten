import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "toyama",
    title: "富山市の保活スケジュール完全ガイド｜申込時期と流れを解説",
    description:
      "富山市の認可保育園・認定こども園の申込時期・選考の流れ・結果通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>富山市の4月入園の申込みは、例年<strong>10月頃</strong>に受付が行われます。早めにスケジュールを把握して動き出しましょう。</p>

<h3>4月入園の流れ</h3>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>9月頃</td><td>入所案内・申請書類の配布開始（各保育所・認定こども園・こども保育課・各行政サービスセンター）</td></tr>
<tr><td>10月頃</td><td>利用申込受付期間</td></tr>
<tr><td>1月〜2月頃</td><td>結果通知（郵送）</td></tr>
<tr><td>2月〜3月</td><td>内定した園での面談・健康診断</td></tr>
<tr><td>4月</td><td>入園</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>5月以降の途中入園の場合は、入園希望月の前月10日頃が申込締切です。こども保育課（076-443-2165）に確認しましょう。</p>
</div>

<h2>保活の理想的な進め方</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>「育さぽとやま」で園の一覧や申込方法を確認。富山市の保育施設等一覧表もダウンロードできます。</p>
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
<p>富山市 こども保育課 TEL：076-443-2165</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system",
    citySlug: "toyama",
    title: "富山市の保育園入園｜点数の仕組みと計算方法をやさしく解説",
    description:
      "富山市の保育所等入所利用調整基準をもとに、基礎点数と調整項目の仕組み・計算方法をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>富山市の点数制度のしくみ</h2>
<p>富山市では「<strong>基礎点数</strong>」と「<strong>調整（加算・減算）項目</strong>」で入園の優先順位が決まります。</p>

<h3>計算の流れ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>父母それぞれの基礎点数を出す</strong>
<p>就労・疾病・障害・介護・出産・就学・求職などの理由ごとに点数が付きます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>低い方を採用して比較する</strong>
<p>父母の基礎点数のうち、<strong>低い方</strong>が採用されます。点数の高い家庭が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>同点の場合は調整項目で判定</strong>
<p>基礎点数が同点の場合、調整（加算・減算）項目の合計で優先順位が決まります。</p>
</div>
</div>

<h3>基礎点数の例（居宅外労働の場合）</h3>
<table>
<tr><th>月の実働時間</th><th>基礎点数</th></tr>
<tr><td>月160時間以上</td><td>11点</td></tr>
<tr><td>月140〜160時間未満</td><td>10点</td></tr>
<tr><td>月120〜140時間未満</td><td>9点</td></tr>
<tr><td>月100〜120時間未満</td><td>8点</td></tr>
<tr><td>月80〜100時間未満</td><td>7点</td></tr>
<tr><td>月64〜80時間未満</td><td>6点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>富山市は「低い方を採用」する方式です。両親ともフルタイムで11点でも、基礎点数は11点。同点の場合は調整項目の合計で差がつきます。</p>
</div>

<div class="info-box">
<p><strong>出典</strong></p>
<p>富山市保育所等入所利用調整に関する基準（令和3年2月12日施行）に基づいています。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 58,
  },
  {
    slug: "score-up-tips",
    citySlug: "toyama",
    title: "富山市の保育園入園｜加点のコツ・点数アップ戦略",
    description:
      "富山市の調整項目を活用して入園の可能性を高めるコツを解説。ひとり親加点やきょうだい加点など、知っておきたいポイントをまとめました。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>富山市の調整項目で加点されるケース</h2>
<p>基礎点数が同点の場合、調整（加算・減算）項目の合計点数で優先順位が決まります。主な加点項目を確認しましょう。</p>

<h3>主な調整項目一覧</h3>
<table>
<tr><th>項目</th><th>加算点</th></tr>
<tr><td>兄弟が別々の施設に入所中で同施設への転所希望</td><td>+5</td></tr>
<tr><td>保育士等として市内の保育施設に勤務</td><td>+4</td></tr>
<tr><td>兄弟（2・3号認定）が入所中の施設への入所希望</td><td>+4</td></tr>
<tr><td>育休明けで再入所希望</td><td>+4</td></tr>
<tr><td>兄弟（1号認定）が入所中の施設への入所希望</td><td>+3</td></tr>
<tr><td>ひとり親世帯</td><td>+2</td></tr>
<tr><td>生活保護世帯</td><td>+2</td></tr>
<tr><td>兄弟3人以上の新規同時申込み</td><td>+2</td></tr>
<tr><td>認定こども園で1号から2号へ区分変更</td><td>+1</td></tr>
<tr><td>多胎児の新規同時申込み</td><td>+1</td></tr>
</table>

<div class="point-box">
<p><strong>注意：減点もある</strong></p>
<p>転所申請で転居・転勤等やむを得ない理由がない場合は<strong>-2点</strong>の減点になります。ただし4月転所は減点対象外です。</p>
</div>

<h2>点数アップの現実的な戦略</h2>
<h3>1. 就労時間を増やす</h3>
<p>居宅外労働は月160時間以上で最高の11点。パートの場合は勤務時間の見直しを検討しましょう。</p>

<h3>2. きょうだい加点を活用する</h3>
<p>上のお子さんが通っている園を希望すれば+4点。兄弟が別施設の場合の転所希望は+5点とさらに大きいです。</p>

<h3>3. 保育士資格を活かす</h3>
<p>市内の保育施設で保育士・幼稚園教諭・看護師等として勤務していれば+4点の加算があります。</p>

<div class="info-box">
<p><strong>同点の場合は？</strong></p>
<p>調整項目でも同点の場合は、希望順位・保育を必要とする事由の発生日・出生順位・未就学児の数・経済状況の順に優先判定されます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 52,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "toyama",
    title: "富山市の認可保育園vs認可外、どっちがいい？違いを比較",
    description:
      "富山市で保活をするなら認可と認可外どちらを選ぶべき？費用・保育内容・入りやすさの違いをわかりやすく比較します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園選び",
    categoryColor: "purple",
    content: `<h2>認可保育園と認可外保育施設の違い</h2>
<p>富山市にも認可保育園・認定こども園のほかに、認可外保育施設があります。それぞれの特徴を比較してみましょう。</p>

<h3>主な違い</h3>
<table>
<tr><th>項目</th><th>認可保育園・認定こども園</th><th>認可外保育施設</th></tr>
<tr><td>設置基準</td><td>国の基準を満たす</td><td>都道府県に届出</td></tr>
<tr><td>保育料</td><td>世帯の所得に応じて決定</td><td>施設ごとに設定</td></tr>
<tr><td>申込先</td><td>富山市 こども保育課</td><td>各施設に直接</td></tr>
<tr><td>選考</td><td>利用調整（点数制）</td><td>先着順や施設の基準</td></tr>
<tr><td>3〜5歳の無償化</td><td>対象</td><td>月37,000円まで無償</td></tr>
</table>

<h2>富山市で認可外を選ぶメリット</h2>
<h3>入園しやすい</h3>
<p>認可保育園の選考に落ちた場合のセーフティネットとして活用できます。</p>

<h3>柔軟な保育時間</h3>
<p>夜間保育や休日保育など、認可園にはないサービスを提供する施設もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>富山市は比較的保育園に入りやすい地域ですが、人気園は競争率が高くなります。認可外も並行して検討しておくと安心です。</p>
</div>

<h2>どちらを選ぶべき？</h2>
<p>まずは認可保育園・認定こども園を第一目標にしつつ、認可外も並行して見学・申込みしておくのが安心です。富山市には企業主導型保育施設もあるので、選択肢を広げて検討しましょう。</p>

<div class="info-box">
<p><strong>確認先</strong></p>
<p>認可外保育施設の一覧は富山県のホームページで確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "toyama",
    title: "富山市の保育園見学チェックリスト｜見るべきポイント15選",
    description:
      "富山市で保育園見学に行く前に確認しておきたいチェックポイントを15項目にまとめました。質問リストとしても活用できます。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "園選び",
    categoryColor: "purple",
    content: `<h2>見学前の準備</h2>
<p>富山市の保育園見学は<strong>6月〜9月</strong>がベストシーズン。見学は電話で予約するのが基本です。</p>

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
<p>富山市は車社会なので、駐車場の広さや送迎のしやすさは特に重要なチェックポイントです。冬場の除雪状況も聞いておくと安心です。</p>
</div>

<div class="info-box">
<p><strong>園の一覧</strong></p>
<p>「育さぽとやま」で富山市内の保育所・認定こども園の一覧を確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 42,
  },
  {
    slug: "ikukyuu-hokatsu",
    citySlug: "toyama",
    title: "富山市で育休中に保活｜復帰前にやるべきことリスト",
    description:
      "富山市で育児休業中に保活を進めるためのスケジュールと、育休明けの加点制度について解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休中の保活スケジュール</h2>
<p>育休中のママ・パパにとって、職場復帰と保育園入園のタイミングを合わせることは最重要課題です。</p>

<h3>育休中にやることリスト</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>情報収集（復帰6ヶ月前〜）</strong>
<p>「育さぽとやま」で保育園一覧・空き状況を確認。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>園見学（復帰4〜5ヶ月前）</strong>
<p>候補の園を3〜5か所見学しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>申込書類の準備（復帰2〜3ヶ月前）</strong>
<p>就労証明書は勤務先に早めに依頼。復帰予定日を記載してもらいます。</p>
</div>
</div>

<h2>育休明けの加点制度</h2>
<p>富山市では、就労で施設利用していたが育児休暇取得のため退所した場合、育休明けに<strong>+4点</strong>の調整加算があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認定こども園で2号から1号に変更していた場合も同様に加算対象です。また、同時入所希望のお子さんも加算対象になります。</p>
</div>

<h2>育休延長になった場合</h2>
<p>入所不承諾に伴い育児休業を延長した場合、保育を必要とする事由の発生日は「変更前の就労復帰予定日」が適用されます。これにより、同点時の優先判定で有利になる場合があります。</p>

<div class="info-box">
<p><strong>問い合わせ先</strong></p>
<p>富山市 こども保育課 TEL：076-443-2165</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 48,
  },
  {
    slug: "small-nursery",
    citySlug: "toyama",
    title: "富山市の小規模保育・地域型保育とは？0〜2歳児の選択肢",
    description:
      "富山市の小規模保育事業・家庭的保育事業・事業所内保育事業の特徴や利用方法をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "園選び",
    categoryColor: "purple",
    content: `<h2>地域型保育事業とは？</h2>
<p>富山市では、0〜2歳児を対象とした「地域型保育事業」があります。認可保育園よりも小規模で、家庭的な雰囲気の中で保育が行われます。</p>

<h3>地域型保育事業の種類</h3>
<table>
<tr><th>種類</th><th>定員</th><th>特徴</th></tr>
<tr><td>小規模保育事業</td><td>6〜19人</td><td>少人数でアットホーム</td></tr>
<tr><td>家庭的保育事業</td><td>5人以下</td><td>保育者の自宅等で保育</td></tr>
<tr><td>事業所内保育事業</td><td>施設による</td><td>企業の従業員向け＋地域枠</td></tr>
</table>

<h2>メリットとデメリット</h2>
<h3>メリット</h3>
<p>少人数のため、一人ひとりに目が行き届きやすく、きめ細かい保育を受けられます。認可保育園より入りやすい場合もあります。</p>

<h3>デメリット</h3>
<p>3歳になったら別の園に移る必要があります（卒園後の連携施設がある場合もあります）。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>富山市では地域型保育事業も利用調整の対象です。認可保育園と同じ基礎点数・調整項目で選考されます。</p>
</div>

<div class="info-box">
<p><strong>確認先</strong></p>
<p>富山市 こども保育課 TEL：076-443-2165</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 38,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "toyama",
    title: "富山市で2人目の保活｜きょうだい加点と同時申込のコツ",
    description:
      "富山市で2人目のお子さんの保活を進めるときに活用できるきょうだい加点や同時申込の戦略を解説します。",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>きょうだいがいると有利になる？</h2>
<p>富山市では、きょうだいの在園状況に応じて調整項目で加点があります。2人目以降の保活では、この加点をうまく活用しましょう。</p>

<h3>きょうだい関連の加点一覧</h3>
<table>
<tr><th>状況</th><th>加算点</th></tr>
<tr><td>兄弟が別々の施設に1ヶ月以上入所中で、同じ施設への転所を希望</td><td>+5</td></tr>
<tr><td>兄弟（2・3号認定）が入所中の施設への入所希望</td><td>+4</td></tr>
<tr><td>兄弟（1号認定・幼稚園利用）が入所中の施設への入所希望</td><td>+3</td></tr>
<tr><td>兄弟3人以上の新規同時申込み</td><td>+2</td></tr>
<tr><td>多胎児（双子）の新規同時申込み</td><td>+1</td></tr>
</table>

<div class="point-box">
<p><strong>重複加算の制限に注意</strong></p>
<p>兄弟が別施設から同施設へ転所希望（+5）の場合、他のきょうだい加点との重複加算はできません。優先度の高い項目が適用されます。</p>
</div>

<h2>2人目保活の戦略</h2>
<h3>1. 上の子と同じ園を希望する</h3>
<p>最も確実な加点（+4〜5点）を得られます。送迎の負担軽減にもなります。</p>

<h3>2. 同時申込みを活用する</h3>
<p>兄弟3人以上なら+2点、双子なら+1点の加算があります。</p>

<h3>3. 新規入所は転所より優先</h3>
<p>富山市では、同点の場合は新規入所申込者が転所申込者より優先されます。</p>

<div class="info-box">
<p><strong>問い合わせ先</strong></p>
<p>富山市 こども保育課 TEL：076-443-2165</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 44,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "toyama",
    title: "富山市の保育料はいくら？世帯年収別の目安と無償化制度",
    description:
      "富山市の認可保育園・認定こども園の保育料の決まり方と、幼児教育・保育の無償化制度についてわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>富山市の認可保育園・認定こども園の保育料は、<strong>世帯の市民税所得割額</strong>と<strong>お子さんの年齢</strong>によって決まります。</p>

<h3>保育料のポイント</h3>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>算定基準</td><td>世帯の市民税所得割額</td></tr>
<tr><td>3〜5歳児</td><td>無償（幼児教育・保育の無償化）</td></tr>
<tr><td>0〜2歳児</td><td>所得に応じた保育料</td></tr>
<tr><td>第2子以降</td><td>軽減制度あり</td></tr>
</table>

<h2>幼児教育・保育の無償化</h2>
<p>2019年10月から、<strong>3〜5歳児クラス</strong>のすべての子どもの保育料が無償化されています。</p>

<h3>0〜2歳児の無償化対象</h3>
<p>住民税非課税世帯の0〜2歳児も保育料が無償です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>無償化の対象は「保育料」のみです。給食費（副食費）・延長保育料・通園バス代などは別途かかります。</p>
</div>

<h2>多子世帯の軽減</h2>
<p>富山市では、きょうだいが保育施設等を利用している場合、第2子は半額、第3子以降は無償となる軽減措置があります。</p>

<div class="info-box">
<p><strong>問い合わせ先</strong></p>
<p>富山市 こども保育課 TEL：076-443-2165</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ochita-taishohou",
    citySlug: "toyama",
    title: "富山市で保育園に落ちたら？不承諾後にやるべき5つのこと",
    description:
      "富山市の保育園選考で不承諾になったときの対処法を5つ紹介。二次募集・認可外・一時預かりなどの選択肢を解説します。",
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾通知が届いたら</h2>
<p>まずは落ち着いて、次のアクションを確認しましょう。富山市では複数の選択肢があります。</p>

<h2>やるべき5つのこと</h2>
<h3>1. 途中入園（5月以降）に申し込む</h3>
<p>富山市では毎月の途中入園が可能です。希望月の前月10日頃が締切なので、継続して申込みましょう。空きが出れば入園できます。</p>

<h3>2. 希望園を見直す</h3>
<p>人気園だけでなく、少し離れた園や新設園も候補に入れることで入園の可能性が広がります。</p>

<h3>3. 認可外保育施設を検討する</h3>
<p>富山市内の認可外保育施設に申し込む方法もあります。3〜5歳児は月37,000円まで無償化の対象です。</p>

<h3>4. 企業主導型保育施設を探す</h3>
<p>勤務先が提携している企業主導型保育施設があれば、利用できる場合があります。地域枠を設けている施設もあります。</p>

<h3>5. 育児休業の延長を検討する</h3>
<p>不承諾通知があれば、育児休業の延長が可能です。不承諾通知書は大切に保管しましょう。</p>

<div class="point-box">
<p><strong>ポイント：同点時の優先要素</strong></p>
<p>富山市では同点の場合、保育を必要とする事由の発生日が早い方が優先されます。育休延長の場合は「変更前の就労復帰予定日」が適用されるため、次回の選考で有利になることがあります。</p>
</div>

<h2>その他の選択肢</h2>
<h3>一時預かり事業</h3>
<p>富山市内の認可保育園等で実施している一時預かりを利用する方法もあります。</p>

<h3>ファミリー・サポート・センター</h3>
<p>富山市のファミサポに登録すれば、地域の協力会員に子どもを預けられます。保育園が見つかるまでのつなぎとして活用できます。</p>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>富山市 こども保育課 TEL：076-443-2165</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 36,
  },
];

registerArticles(articles);
