import type { Article } from "./types";
import { registerArticles } from "./index";

const yokoteArticles: Article[] = [
  {
    slug: "yokote-guide",
    citySlug: "yokote",
    title: "横手市の保活ガイド　令和8年度入園の基本を理解しよう",
    description:
      "横手市の保育園入園に向けた基本的な流れ、スケジュール、必要な準備をまとめました。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>横手市の保育園入園の特徴</h2>
<p>横手市は秋田県内でも人口の多い都市で、複数の保育施設があります。入園選考はSum方式（父母合算方式）で行われ、保護者の就労状況を総合的に評価します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>横手市の選考では父母各最大100点の合計200点満点で優先順位が決まります。単純な平均ではなく合算となるため、両親がバランスの取れた就労をしている世帯が有利になりやすいです。</p>
</div>

<h3>年間スケジュール（4月入園の場合）</h3>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>6月</td><td>入園案内・申込書類の配布開始</td></tr>
<tr><td>7月〜8月</td><td>保育園見学・申込書作成</td></tr>
<tr><td>9月中旬</td><td>1次申込受付期限</td></tr>
<tr><td>12月〜1月</td><td>1次選考結果通知</td></tr>
<tr><td>2月</td><td>2次申込（欠員がある場合）</td></tr>
<tr><td>3月上旬</td><td>最終結果通知</td></tr>
</table>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>情報収集</strong><p>横手市役所から「保育施設入園案内」をもらい、利用調整基準を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>施設見学</strong><p>気になる園に見学予約を入れ、保育環境を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>書類準備</strong><p>就労証明書や必要書類を揃えます。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>申込</strong><p>期限までに必要書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.yokote.lg.jp/" target="_blank" rel="noopener">横手市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 68,
  },
  {
    slug: "yokote-scoring-system",
    citySlug: "yokote",
    title: "横手市の点数システム　最大200点の合算方式",
    description:
      "横手市の保育園入園選考で使われるSum方式の点数計算と、配点のバランスを理解しましょう。",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>横手市の選考方式</h2>
<p>横手市は父母各最大100点の<span class="highlight">合計200点満点のSum方式</span>で入園選考を行います。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 父の基礎指数 + 母の基礎指数（最大200点）</p>
<p>点数が高い順に優先的に入園できます。</p>
</div>

<h3>基礎指数の計算</h3>
<p>保護者1人あたりの基礎指数は最大100点です。就労日数・就労時間の組み合わせで細かく設定されています。</p>

<h4>居宅外就労（フルタイム）</h4>
<table>
<tr><th>就労条件</th><th>基礎指数</th></tr>
<tr><td>月20日以上or週5日以上かつ1日8h以上</td><td>100点</td></tr>
<tr><td>同条件で1日6-8h</td><td>90点</td></tr>
<tr><td>同条件で1日4-6h</td><td>80点</td></tr>
<tr><td>同条件で1日3-4h</td><td>70点</td></tr>
<tr><td>同条件で1日1-3h</td><td>40点</td></tr>
</table>

<h4>居宅外就労（パート）</h4>
<table>
<tr><th>就労条件</th><th>基礎指数</th></tr>
<tr><td>月16-20日or週3-5日かつ1日8h以上</td><td>90点</td></tr>
<tr><td>同条件で1日6-8h</td><td>80点</td></tr>
<tr><td>同条件で1日4-6h</td><td>70点</td></tr>
<tr><td>同条件で1日3-4h</td><td>40点</td></tr>
<tr><td>月12-16日かつ1日1-3h</td><td>30点</td></tr>
<tr><td>月48h以上その他</td><td>50点</td></tr>
<tr><td>月48h未満</td><td>20点</td></tr>
</table>

<h3>調整指数（加点・減点）</h3>
<p>世帯の状況や保護者個人の勤務状況に応じた調整があります。</p>
<ul>
<li><strong>時間外勤務（1h以上）</strong>：+10点</li>
<li><strong>通勤往復2h以上</strong>：+10点</li>
<li><strong>育休明け復帰</strong>：+50点</li>
</ul>`,
    publishedAt: "2026-06-26",
    popularity: 70,
  },
  {
    slug: "yokote-employment-score",
    citySlug: "yokote",
    title: "横手市の就労スコア　月60時間超で大きく加点される",
    description:
      "横手市の細かい就労時間設定と、フルタイム・パート・内職での点数差を詳しく解説します。",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>横手市の就労評価の細かさ</h2>
<p>横手市は就労日数と1日あたりの就労時間を組み合わせた、非常に細かい配点システムを採用しています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1日の就労時間が1時間でも違うと配点が変わることがあります。就労証明書は正確に記載してもらうことが重要です。</p>
</div>

<h3>居宅外就労の細かい配点</h3>
<h4>月20日以上の勤務</h4>
<ul>
<li>1日8h以上：100点</li>
<li>1日6-8h：90点</li>
<li>1日4-6h：80点</li>
<li>1日3-4h：70点</li>
<li>1日1-3h：40点</li>
</ul>

<h4>月16-20日の勤務</h4>
<ul>
<li>1日8h以上：90点</li>
<li>1日6-8h：80点</li>
<li>1日4-6h：70点</li>
<li>1日3-4h：40点</li>
</ul>

<h3>居宅内就労（内職・在宅勤務など）</h3>
<p>居宅内就労は、居宅外就労より10点低く設定されています。</p>
<table>
<tr><th>就労条件</th><th>居宅外</th><th>居宅内</th></tr>
<tr><td>月20日以上かつ1日8h以上</td><td>100点</td><td>90点</td></tr>
<tr><td>月20日以上かつ1日6-8h</td><td>90点</td><td>80点</td></tr>
<tr><td>月20日以上かつ1日4-6h</td><td>80点</td><td>70点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>自宅で仕事をしている場合、「居宅内就労」に分類される可能性があります。就労証明書の「勤務場所」欄を確認しましょう。</p>
</div>

<h3>その他の事由での基礎指数</h3>
<ul>
<li><strong>妊娠・出産</strong>：100点</li>
<li><strong>疾病（1月以上入院）</strong>：100点</li>
<li><strong>居宅療養（寝たきり状態）</strong>：100点</li>
<li><strong>疾病（その他入院外）</strong>：80点</li>
<li><strong>通院（週3以上かつ1月以上）</strong>：60点</li>
<li><strong>居宅療養（その他）</strong>：50点</li>
</ul>`,
    publishedAt: "2026-06-26",
    popularity: 72,
  },
  {
    slug: "yokote-adjustment-index",
    citySlug: "yokote",
    title: "横手市の調整指数　世帯単位と保護者単位の加点・減点",
    description:
      "横手市の複雑な調整指数体系。ひとり親加点・同居者減点・小規模卒園加点など、全パターンをまとめました。",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>横手市の調整指数の複雑さ</h2>
<p>横手市は<span class="highlight">世帯単位の調整と保護者単位の調整</span>の両方を行う、複雑な加点・減点システムを採用しています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>世帯単位の調整の中には+200点の虐待・DV経験者加点などもあり、基礎指数を大きく上回る加算が可能です。</p>
</div>

<h3>保護者単位の調整指数</h3>
<ul>
<li><strong>時間外勤務1h以上</strong>：+10点</li>
<li><strong>通勤往復2h以上</strong>：+10点</li>
</ul>

<h3>世帯単位の加点事由</h3>
<ul>
<li><strong>ひとり親世帯</strong>：+100点（大幅加点）</li>
<li><strong>生活保護受給</strong>：+50点</li>
<li><strong>社会的擁護対象児童</strong>：+100点</li>
<li><strong>子どもが障がいあり</strong>：+10〜50点</li>
<li><strong>兄弟同一希望園</strong>：+20点</li>
<li><strong>小規模保育卒園</strong>：+60点</li>
</ul>

<h3>世帯単位の減点事由</h3>
<ul>
<li><strong>60歳以上70歳未満の祖父母同居</strong>：-10点</li>
<li><strong>60歳未満の祖父母同居</strong>：-50点</li>
<li><strong>未就学きょうだイなのに申込なし</strong>：-50点</li>
</ul>

<h4>虐待・DV経験者への特別加点</h4>
<div class="highlight">
<p><strong>虐待や配偶者からのDV経験者には+200点の加点</strong>があります。これは基礎指数を上回る大幅な加算です。</p>
<p>このような状況にある場合は、市役所の福祉部門に相談することで、入園の優先度が大幅に上がります。</p>
</div>

<h3>育休関連の調整</h3>
<ul>
<li><strong>育休年長継続</strong>：80点</li>
<li><strong>その他の育休継続</strong>：50点</li>
</ul>

<h3>障がい者の基礎指数</h3>
<table>
<tr><th>障害等級・療育手帳等</th><th>基礎指数</th></tr>
<tr><td>身体1-2級・療育A・精神1-2級</td><td>100点</td></tr>
<tr><td>療育B・精神3級</td><td>80点</td></tr>
<tr><td>身体3級</td><td>60点</td></tr>
<tr><td>その他の困難な状況</td><td>40点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同居者に就労可能な祖父母がいる場合は大幅に減点される傾向があります。三世代同居の場合は、市役所に事前相談することが大切です。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 73,
  },
  {
    slug: "yokote-single-parent",
    citySlug: "yokote",
    title: "横手市でひとり親の優遇度は？　+100点の大幅加点",
    description:
      "横手市のひとり親世帯加点制度。両親世帯との点数差と、ひとり親支援制度もまとめました。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>横手市のひとり親加点</h2>
<p>横手市ではひとり親世帯に<span class="highlight">+100点の世帯単位加点</span>があります。これは非常に大きな加点で、入園の可能性を大幅に高めます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯+100点は、基礎指数が最大100点であることと同等の加算です。つまり、基礎指数が50点のひとり親世帯と100点の両親世帯がほぼ同等の選考順位になります。</p>
</div>

<h3>ひとり親と認定される要件</h3>
<ul>
<li>死別（配偶者の死亡証明）</li>
<li>離別（戸籍謄本・調停調書）</li>
<li>未婚で出産（戸籍謄本・出生届）</li>
<li>配偶者が生死不明（警察の捜索願等）</li>
<li>配偶者からの遺棄</li>
<li>DV被害で別居中</li>
</ul>

<h3>ひとり親の申込時のポイント</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>証明書類の準備</strong><p>戸籍謄本など、ひとり親であることを証明する書類を用意します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>自分の就労証明書を正確に</strong><p>ひとり親の場合、保護者1人の就労状況で基礎指数が決まるため、正確な記載が重要です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>養育費情報の確認</strong><p>市によっては、養育費の受取状況を聞かれる場合があります。事前に準備しておきましょう。</p></div>
</div>

<h3>ひとり親が活用できる制度</h3>
<ul>
<li><strong>保育料減免</strong>：世帯収入に応じた減免</li>
<li><strong>母子家庭等就業支援センター</strong>：就業相談・訓練</li>
<li><strong>母子福祉資金貸付</strong>：教育費などの借入</li>
<li><strong>医療費助成</strong>：子ども医療費の一部または全額助成</li>
<li><strong>児童扶養手当</strong>：月額15,000円程度（所得による）</li>
</ul>

<div class="info-box">
<p><strong>豆知識</strong></p>
<p>横手市はひとり親世帯への支援が充実しており、保育園入園だけでなく、その後の子育て支援も手厚い傾向があります。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 71,
  },
  {
    slug: "yokote-sibling-application",
    citySlug: "yokote",
    title: "横手市で兄弟一緒入園　+20点の加点と小規模卒園枠",
    description:
      "横手市の兄弟同時申込加点と、小規模保育施設卒園児の優遇措置について解説します。",
    category: "よくある質問",
    categoryColor: "rose",
    content: `<h2>兄弟姉妹の同時申込加点</h2>
<p>横手市では兄弟姉妹を同一希望園に申し込む場合、<strong>+20点の加点</strong>があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>20点の加点は、就労1日3-4時間程度の加点に相当する大きな加算です。兄弟の同時申込は優先度が上がります。</p>
</div>

<h3>兄弟同時申込での注意点</h3>
<ul>
<li>兄弟が<span class="highlight">同じ園を第一希望</span>としていることが必須</li>
<li>異なる園を希望する場合は加点の対象外</li>
<li>申込書に兄弟関係を明記する</li>
<li>戸籍謄本で兄弟関係を証明</li>
</ul>

<h3>別の園に希望を分ける場合</h3>
<p>第一希望を兄が園A、弟が園Bと分ける場合は、兄弟同時申込加点は受けられません。その代わり、各自の点数で個別に選考されます。この場合、入園できる可能性は下がる傾向があります。</p>

<h2>小規模保育施設卒園児の優遇</h2>
<p>小規模保育施設（定員6-19人）から、認可保育園への進級を希望する場合、<span class="highlight">+60点の加点</span>があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模卒園児への加点は非常に大きく、基礎指数50点程度では加点対象になりやすい傾向があります。</p>
</div>

<h3>小規模卒園児のメリット</h3>
<ul>
<li>既に横手市の保育施設に通園実績がある</li>
<li>保育園への進級がスムーズになりやすい</li>
<li>同じ法人傘下の園への進級なら優先度が高い</li>
</ul>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>小規模施設との連携確認</strong><p>現在通園している小規模施設から、連携園の情報をもらいます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>連携園を優先順位に</strong><p>申込時に、連携園を第一希望・第二希望に設定します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>小規模卒園の証明</strong><p>小規模施設の卒園証書を提出し、加点対象であることを証明します。</p></div>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 69,
  },
  {
    slug: "yokote-small-scale-graduate",
    citySlug: "yokote",
    title: "横手市の小規模保育卒園児枠　+60点で認可園への進級が有利",
    description:
      "小規模保育施設から認可保育園への進級をサポートする横手市の制度と、連携園の選び方をまとめました。",
    category: "よくある質問",
    categoryColor: "rose",
    content: `<h2>小規模卒園児への大幅加点</h2>
<p>横手市では小規模保育施設を卒園し、認可保育園への進級を希望する児童に対して、<span class="highlight">世帯単位で+60点の加点</span>を行います。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>60点の加点は基礎指数満点よりも大きく、小規模卒園児はほぼ確実に認可園へ進級できるといっても過言ではありません。</p>
</div>

<h3>小規模保育施設とは</h3>
<p>定員6人以上19人以下の少人数制保育施設です。横手市でも複数の小規模保育施設があります。</p>
<ul>
<li>少人数で濃密な関係を築ける</li>
<li>月齢別保育が充実</li>
<li>保護者との連携が密切</li>
<li>通常は3-5歳級までで園を卒園</li>
</ul>

<h3>連携園とは何か</h3>
<p>小規模保育施設と連携する認可保育園が「連携園」です。同じ法人傘下の場合や、近隣の園が連携園になることが多いです。</p>
<ul>
<li>小規模施設の卒園児が優先的に進級</li>
<li>担当者が連携園を訪問することも</li>
<li>進級のスムーズさが違う</li>
</ul>

<h3>小規模卒園児の進級先選択</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>連携園の確認</strong><p>現在通園している小規模施設に問い合わせて、どの園が連携園かを確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>複数の選択肢検討</strong><p>通常は複数の連携園があります。各園の特色を見学で比較します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>申込時の加点対象園</strong><p>連携園でない園に申し込む場合、60点加点は適用されないため注意が必要です。</p></div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>連携園でない園を第一希望にすると、60点加点が失われる可能性があります。進級先選択は慎重に判断しましょう。</p>
</div>

<h3>入園確定後のスムーズな移行</h3>
<ul>
<li>小規模施設から認可園への移行説明会</li>
<li>新しい園での慣らし期間（1〜2週間）</li>
<li>保護者会への参加で情報交換</li>
</ul>`,
    publishedAt: "2026-06-26",
    popularity: 70,
  },
  {
    slug: "yokote-documents",
    citySlug: "yokote",
    title: "横手市の申込書類完全リスト　漏れなく提出するために",
    description:
      "横手市の保育園申込に必要な全書類を、チェックリスト形式で整理しました。",
    category: "準備・書類",
    categoryColor: "amber",
    content: `<h2>横手市の申込書類体系</h2>
<p>横手市は複雑な点数システムを採用しているため、必要な書類も多岐にわたります。提出漏れがないよう注意が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類不備があると申込が受け付けられず、翌年度へ持ち越しとなる可能性があります。事前の確認が重要です。</p>
</div>

<h3>全員が提出する基本書類</h3>
<ul>
<li><strong>保育施設入園申込書</strong> - 市役所から配布される指定様式</li>
<li><strong>世帯全員の住民票謄本</strong> - 発行から3ヶ月以内</li>
<li><strong>保育を必要とする事由を証明する書類</strong>
  <ul>
  <li>就労証明書（勤務先の署名押印）</li>
  <li>自営業：営業許可証のコピー</li>
  <li>出産：母子手帳のコピー</li>
  <li>求職：特に書類不要</li>
  </ul>
</li>
</ul>

<h3>個別事由に応じた追加書類</h3>
<table>
<tr><th>事由</th><th>必要書類</th></tr>
<tr><td>ひとり親世帯</td><td>戸籍謄本（死別・離別・未婚出産の証明）</td></tr>
<tr><td>障がい者</td><td>障害者手帳のコピー（身体・精神・療育）</td></tr>
<tr><td>介護が必要</td><td>介護認定書・診断書等</td></tr>
<tr><td>疾病・通院</td><td>医師の診断書・通院記録</td></tr>
<tr><td>兄弟同時申込</td><td>兄弟全員の戸籍謄本</td></tr>
<tr><td>小規模卒園児</td><td>小規模施設の卒園証書</td></tr>
<tr><td>生活保護受給</td><td>生活保護受給証明書</td></tr>
</table>

<h3>就労証明書の書き方ポイント</h3>
<ul>
<li>勤務日数（月〇日）を明確に</li>
<li>1日の勤務時間（〇時間）を記載</li>
<li>時間外勤務の有無を記載</li>
<li>通勤時間（往復〇時間）を記載</li>
<li>勤務先の印鑑を押してもらう</li>
</ul>

<h3>書類提出のスケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>6月：案内・申込書入手</strong><p>市役所で申込案内と書類一式をもらいます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>7月：必要書類の確認</strong><p>自分の世帯に該当する書類をリストアップします。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>8月：書類作成・依頼</strong><p>勤務先に就労証明書を依頼、戸籍謄本を取得します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>9月中旬：提出</strong><p>期限までに全書類を提出します。</p></div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書は特定の様式が指定されている場合があります。様式の有無を勤務先に事前確認してください。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 72,
  },
  {
    slug: "yokote-facility-selection",
    citySlug: "yokote",
    title: "横手市の保育園選び　施設見学で確認すべき10のポイント",
    description:
      "横手市での保育園選択で失敗しないための見学チェックシートと、園の特色の見分け方をまとめました。",
    category: "施設選び",
    categoryColor: "purple",
    content: `<h2>横手市の保育施設の種類</h2>
<p>横手市には、認可保育園、認定こども園、小規模保育施設など複数の施設形態があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第一希望園だけでなく、複数の園を優先順位に入れることが合格の鍵です。</p>
</div>

<h3>園選びの基本的なポイント</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>立地・通園時間</strong><p>職場や自宅からの距離、通園路の安全性を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>保育時間</strong><p>通常保育時間（7:30-18:30など）と延長保育（何時まで）を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>給食体制</strong><p>自園調理か給食委託か、アレルギー対応体制を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>保育方針</strong><p>園の特色（自然保育・音楽教育など）をチェック。</p></div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content"><strong>衛生・安全</strong><p>園舎の清潔さ、防犯体制（セキュリティカメラ等）を確認。</p></div>
</div>

<h3>園見学の実施方法</h3>
<ul>
<li>事前に電話予約（急な訪問は避ける）</li>
<li>見学時間は15-30分程度</li>
<li>できれば子どもの活動中の様子を見学</li>
<li>他の利用者の表情・満足度を観察</li>
<li>掲示物で安全管理のレベルを確認</li>
</ul>

<h3>複数園の優先順位のつけ方</h3>
<p>横手市では第一希望が落ちても第二希望で入園できるシステムです。</p>
<ul>
<li>第一希望：自分たちの理想の園</li>
<li>第二希望：入園しやすい（待機児童が少ない）園</li>
<li>第三希望：緊急時の受け皿として必ず設定</li>
</ul>

<div class="info-box">
<p><strong>豆知識</strong></p>
<p>横手市では人口が中程度のため、都市部ほどの激しい倍率ではありません。複数園を希望すれば、ほぼ入園できる可能性があります。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 68,
  },
  {
    slug: "yokote-timing",
    citySlug: "yokote",
    title: "横手市の入園時期　4月入園と秋入園、それぞれの最適判断法",
    description:
      "横手市での入園時期選択。4月入園と秋入園のメリット・デメリット、育休満了との調整方法をまとめました。",
    category: "準備・書類",
    categoryColor: "amber",
    content: `<h2>横手市の入園時期選択の重要性</h2>
<p>横手市では通常4月入園ですが、欠員が出た場合は秋以降の随時入園も可能です。入園時期を戦略的に選ぶことは、家族計画と仕事復帰の両面で重要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休満了と入園時期が完全には一致しないことが多いため、事前に市役所に相談することが大切です。</p>
</div>

<h3>4月入園のメリット</h3>
<ul>
<li>新年度スタートで園の体制が整っている</li>
<li>新入園児が多いため、子どもが馴染みやすい</li>
<li>保育料が新年度基準で計算される</li>
<li>友達づくりの機会が多い</li>
</ul>

<h3>4月入園のデメリット</h3>
<ul>
<li>申込数が多く、倍率が高い</li>
<li>前年の秋に申込が必要</li>
<li>育休満了が3月or5月だと、時期がずれる</li>
<li>定員枠が限定される</li>
</ul>

<h2>秋以降の随時入園</h2>

<h3>メリット</h3>
<ul>
<li>4月時点で定員が埋まっていない園なら、入園しやすい</li>
<li>育休満了に合わせやすい</li>
<li>園の雰囲気を半年観察してから選べる</li>
<li>夏休み明けなど自然な切り目で入園できる</li>
</ul>

<h3>デメリット</h3>
<ul>
<li>園児同士の関係が出来上がっているため、馴染みづらい可能性</li>
<li>欠員が出るまで待つ必要があり、時期が不確定</li>
<li>年度途中入園で調整指数が下がる場合がある</li>
</ul>

<h3>育休満了タイミング別の最適判断</h3>
<table>
<tr><th>育休満了月</th><th>推奨入園時期</th><th>理由</th></tr>
<tr><td>2月or3月</td><td>4月入園</td><td>そのまま入園可能</td></tr>
<tr><td>5月〜8月</td><td>秋入園</td><td>4月に待機→秋入園</td></tr>
<tr><td>9月以降</td><td>翌年4月</td><td>秋入園か翌年4月</td></tr>
</table>

<h3>待機児童の状態を確認</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>6月の段階で確認</strong><p>市役所に問い合わせて、希望園の待機児童数を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>戦略的な希望順位設定</strong><p>待機児童が多い園は第二希望に、少ない園を第一希望にするなどの工夫が必要な場合もあります。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>秋の随時入園情報をキープ</strong><p>7月時点で、秋以降の欠員可能性を打診しておくのも戦略です。</p></div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長同意をしてしまうと、次年度の申込時に大幅な減点（最大-200点）を受けることもあります。育休延長の判断は慎重に。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 73,
  },
];

registerArticles(yokoteArticles);
